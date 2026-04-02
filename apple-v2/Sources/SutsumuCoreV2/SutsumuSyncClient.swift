import Foundation

public enum SutsumuSyncClientError: Error, LocalizedError, Sendable {
    case missingSessionToken
    case invalidHTTPResponse
    case server(status: Int, message: String)
    case conflict(WorkspaceHead?)

    public var errorDescription: String? {
        switch self {
        case .missingSessionToken:
            return "Falta el token de sessió de Supabase."
        case .invalidHTTPResponse:
            return "La resposta del backend no és vàlida."
        case .server(_, let message):
            return message
        case .conflict:
            return "Hi ha un conflicte remot: el cap del workspace ha canviat."
        }
    }
}

public actor SutsumuSyncClient {
    public typealias SessionTokenProvider = @Sendable () async throws -> String?

    private let configuration: SupabaseEdgeConfiguration
    private let sessionTokenProvider: SessionTokenProvider
    private let urlSession: URLSession
    private let jsonDecoder: JSONDecoder
    private let jsonEncoder: JSONEncoder

    public init(
        configuration: SupabaseEdgeConfiguration,
        sessionTokenProvider: @escaping SessionTokenProvider,
        urlSession: URLSession = .shared
    ) {
        self.configuration = configuration
        self.sessionTokenProvider = sessionTokenProvider
        self.urlSession = urlSession
        self.jsonDecoder = JSONDecoder()
        self.jsonEncoder = JSONEncoder()
        self.jsonEncoder.outputFormatting = [.sortedKeys]
    }

    public func fetchHead(workspaceId: String) async throws -> WorkspaceHead? {
        var components = URLComponents(url: configuration.endpointURL, resolvingAgainstBaseURL: false)
        components?.queryItems = [
            URLQueryItem(name: "workspace_id", value: workspaceId)
        ]

        guard let url = components?.url else {
            throw SutsumuSyncClientError.invalidHTTPResponse
        }

        var request = try await authorizedRequest(url: url, method: "GET")
        request.setValue("application/json", forHTTPHeaderField: "Accept")

        let (data, response) = try await urlSession.data(for: request)
        guard let http = response as? HTTPURLResponse else {
            throw SutsumuSyncClientError.invalidHTTPResponse
        }

        if http.statusCode == 200 {
            if let empty = try? jsonDecoder.decode([String].self, from: data), empty.isEmpty {
                return nil
            }
            return try jsonDecoder.decode(WorkspaceHead.self, from: data)
        }

        throw try decodeServerError(statusCode: http.statusCode, data: data)
    }

    public func commit(_ requestBody: CommitRequest) async throws -> WorkspaceHead {
        var request = try await authorizedRequest(url: configuration.endpointURL, method: "POST")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try jsonEncoder.encode(requestBody)

        let (data, response) = try await urlSession.data(for: request)
        guard let http = response as? HTTPURLResponse else {
            throw SutsumuSyncClientError.invalidHTTPResponse
        }

        if http.statusCode == 200 {
            return try jsonDecoder.decode(WorkspaceHead.self, from: data)
        }

        throw try decodeServerError(statusCode: http.statusCode, data: data)
    }

    private func authorizedRequest(url: URL, method: String) async throws -> URLRequest {
        let token = try await sessionTokenProvider()?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        guard !token.isEmpty else {
            throw SutsumuSyncClientError.missingSessionToken
        }

        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        return request
    }

    private func decodeServerError(statusCode: Int, data: Data) throws -> SutsumuSyncClientError {
        if statusCode == 409 {
            let conflict = try? jsonDecoder.decode(ConflictResponse.self, from: data)
            return .conflict(conflict?.currentHead)
        }

        if let body = try? JSONSerialization.jsonObject(with: data) as? [String: Any] {
            let code = (body["code"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
            let candidates = [
                body["error"] as? String,
                body["message"] as? String,
                body["msg"] as? String,
            ]
            if let message = candidates
                .compactMap({ $0?.trimmingCharacters(in: .whitespacesAndNewlines) })
                .first(where: { !$0.isEmpty }) {
                if code == "NOT_FOUND" || message == "Requested function was not found" {
                    return .server(
                        status: statusCode,
                        message: "La funció de sincronització de Supabase no està desplegada. Falta publicar `sutsumu-sync-v2` al teu projecte."
                    )
                }
                return .server(status: statusCode, message: message)
            }
        }

        let message = String(data: data, encoding: .utf8) ?? "Unexpected backend error."
        return .server(status: statusCode, message: message)
    }
}

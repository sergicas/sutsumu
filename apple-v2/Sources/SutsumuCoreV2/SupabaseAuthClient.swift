import Foundation

public enum SupabaseAuthClientError: Error, LocalizedError, Sendable {
    case invalidProjectURL
    case missingAnonKey
    case missingRefreshToken
    case invalidHTTPResponse
    case server(status: Int, message: String)

    public var errorDescription: String? {
        switch self {
        case .invalidProjectURL:
            return "La URL del projecte Supabase no és vàlida."
        case .missingAnonKey:
            return "Falta l'anon key de Supabase."
        case .missingRefreshToken:
            return "Falta el refresh token de la sessió."
        case .invalidHTTPResponse:
            return "La resposta del servei d'autenticació no és vàlida."
        case .server(_, let message):
            return message
        }
    }
}

public struct SupabaseAuthRegistrationResult: Equatable, Sendable {
    public let session: SupabaseAuthSession?
    public let user: SupabaseAuthUser?

    public init(session: SupabaseAuthSession?, user: SupabaseAuthUser?) {
        self.session = session
        self.user = user
    }

    public var requiresEmailConfirmation: Bool {
        session == nil && user != nil
    }
}

public struct SupabaseAuthRedirectSession: Equatable, Sendable {
    public let accessToken: String
    public let refreshToken: String
    public let expiresIn: Int
    public let expiresAtUnix: Int?
    public let tokenType: String
    public let flowType: String

    public init(
        accessToken: String,
        refreshToken: String,
        expiresIn: Int,
        expiresAtUnix: Int?,
        tokenType: String,
        flowType: String
    ) {
        self.accessToken = accessToken
        self.refreshToken = refreshToken
        self.expiresIn = expiresIn
        self.expiresAtUnix = expiresAtUnix
        self.tokenType = tokenType
        self.flowType = flowType
    }

    public var isRecovery: Bool {
        flowType == "recovery"
    }
}

public struct SupabaseAuthConfiguration: Sendable, Equatable {
    public let projectURL: URL
    public let anonKey: String

    public init(projectURL: URL, anonKey: String) {
        self.projectURL = projectURL
        self.anonKey = anonKey
    }

    public var authBaseURL: URL {
        projectURL
            .appending(path: "auth")
            .appending(path: "v1")
    }
}

public struct SupabaseAuthUser: Codable, Equatable, Sendable {
    public let id: String
    public let email: String?

    public init(id: String, email: String?) {
        self.id = id
        self.email = email
    }
}

public struct SupabaseAuthSession: Codable, Equatable, Sendable {
    public let accessToken: String
    public let refreshToken: String
    public let expiresIn: Int
    public let expiresAtUnix: Int?
    public let tokenType: String
    public let user: SupabaseAuthUser

    enum CodingKeys: String, CodingKey {
        case accessToken = "access_token"
        case refreshToken = "refresh_token"
        case expiresIn = "expires_in"
        case expiresAtUnix = "expires_at"
        case tokenType = "token_type"
        case user
    }

    public init(
        accessToken: String,
        refreshToken: String,
        expiresIn: Int,
        expiresAtUnix: Int?,
        tokenType: String,
        user: SupabaseAuthUser
    ) {
        self.accessToken = accessToken
        self.refreshToken = refreshToken
        self.expiresIn = expiresIn
        self.expiresAtUnix = expiresAtUnix
        self.tokenType = tokenType
        self.user = user
    }

    public func isExpired(buffer seconds: TimeInterval = 60) -> Bool {
        guard let expiresAtUnix else { return false }
        let expiryDate = Date(timeIntervalSince1970: TimeInterval(expiresAtUnix))
        return expiryDate <= Date().addingTimeInterval(seconds)
    }
}

public actor SupabaseAuthClient {
    private let configuration: SupabaseAuthConfiguration
    private let urlSession: URLSession
    private let jsonDecoder: JSONDecoder
    private let jsonEncoder: JSONEncoder

    public init(
        configuration: SupabaseAuthConfiguration,
        urlSession: URLSession = .shared
    ) {
        self.configuration = configuration
        self.urlSession = urlSession
        self.jsonDecoder = JSONDecoder()
        self.jsonEncoder = JSONEncoder()
    }

    public func signIn(email: String, password: String) async throws -> SupabaseAuthSession {
        let payload = [
            "email": email,
            "password": password,
        ]

        return try await performTokenRequest(
            grantType: "password",
            body: payload
        )
    }

    public func signUp(
        email: String,
        password: String,
        emailRedirectTo: URL? = nil
    ) async throws -> SupabaseAuthRegistrationResult {
        var request = try makeRequest(
            path: "signup",
            queryItems: redirectQueryItems(emailRedirectTo),
            method: "POST",
            authorizationToken: nil
        )
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try jsonEncoder.encode([
            "email": email,
            "password": password,
        ])

        let (data, response) = try await urlSession.data(for: request)
        guard let http = response as? HTTPURLResponse else {
            throw SupabaseAuthClientError.invalidHTTPResponse
        }

        if (200..<300).contains(http.statusCode) {
            let envelope = try jsonDecoder.decode(SupabaseAuthRegistrationEnvelope.self, from: data)
            return envelope.result
        }

        throw decodeServerError(statusCode: http.statusCode, data: data)
    }

    public func requestPasswordReset(
        email: String,
        redirectTo: URL? = nil
    ) async throws {
        var request = try makeRequest(
            path: "recover",
            queryItems: redirectQueryItems(redirectTo),
            method: "POST",
            authorizationToken: nil
        )
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try jsonEncoder.encode([
            "email": email,
        ])

        let (data, response) = try await urlSession.data(for: request)
        guard let http = response as? HTTPURLResponse else {
            throw SupabaseAuthClientError.invalidHTTPResponse
        }

        if (200..<300).contains(http.statusCode) {
            return
        }

        throw decodeServerError(statusCode: http.statusCode, data: data)
    }

    public func fetchCurrentUser(accessToken: String) async throws -> SupabaseAuthUser {
        let trimmedToken = accessToken.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedToken.isEmpty else {
            throw SupabaseAuthClientError.server(status: 401, message: "Falta l'access token de la sessió.")
        }

        let request = try makeRequest(
            path: "user",
            queryItems: [],
            method: "GET",
            authorizationToken: trimmedToken
        )

        let (data, response) = try await urlSession.data(for: request)
        guard let http = response as? HTTPURLResponse else {
            throw SupabaseAuthClientError.invalidHTTPResponse
        }

        if (200..<300).contains(http.statusCode) {
            return try jsonDecoder.decode(SupabaseAuthUser.self, from: data)
        }

        throw decodeServerError(statusCode: http.statusCode, data: data)
    }

    public func updatePassword(
        accessToken: String,
        newPassword: String,
        nonce: String? = nil
    ) async throws {
        let trimmedToken = accessToken.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedToken.isEmpty else {
            throw SupabaseAuthClientError.server(status: 401, message: "Falta l'access token de la sessió.")
        }

        var payload: [String: String] = [
            "password": newPassword,
        ]
        if let nonce, !nonce.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            payload["nonce"] = nonce
        }

        var request = try makeRequest(
            path: "user",
            queryItems: [],
            method: "PUT",
            authorizationToken: trimmedToken
        )
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try jsonEncoder.encode(payload)

        let (data, response) = try await urlSession.data(for: request)
        guard let http = response as? HTTPURLResponse else {
            throw SupabaseAuthClientError.invalidHTTPResponse
        }

        if (200..<300).contains(http.statusCode) {
            return
        }

        throw decodeServerError(statusCode: http.statusCode, data: data)
    }

    public func refreshSession(_ session: SupabaseAuthSession) async throws -> SupabaseAuthSession {
        let refreshToken = session.refreshToken.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !refreshToken.isEmpty else {
            throw SupabaseAuthClientError.missingRefreshToken
        }

        let payload = [
            "refresh_token": refreshToken,
        ]

        return try await performTokenRequest(
            grantType: "refresh_token",
            body: payload
        )
    }

    public func signOut(accessToken: String) async throws {
        let trimmedToken = accessToken.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedToken.isEmpty else { return }

        var request = try makeRequest(
            path: "logout",
            queryItems: [],
            method: "POST",
            authorizationToken: trimmedToken
        )
        request.httpBody = try jsonEncoder.encode(["scope": "local"])
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        let (data, response) = try await urlSession.data(for: request)
        guard let http = response as? HTTPURLResponse else {
            throw SupabaseAuthClientError.invalidHTTPResponse
        }

        if (200..<300).contains(http.statusCode) {
            return
        }

        throw decodeServerError(statusCode: http.statusCode, data: data)
    }

    private func performTokenRequest(
        grantType: String,
        body: [String: String]
    ) async throws -> SupabaseAuthSession {
        var request = try makeRequest(
            path: "token",
            queryItems: [URLQueryItem(name: "grant_type", value: grantType)],
            method: "POST",
            authorizationToken: nil
        )
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try jsonEncoder.encode(body)

        let (data, response) = try await urlSession.data(for: request)
        guard let http = response as? HTTPURLResponse else {
            throw SupabaseAuthClientError.invalidHTTPResponse
        }

        if (200..<300).contains(http.statusCode) {
            return try jsonDecoder.decode(SupabaseAuthSession.self, from: data)
        }

        throw decodeServerError(statusCode: http.statusCode, data: data)
    }

    private func makeRequest(
        path: String,
        queryItems: [URLQueryItem],
        method: String,
        authorizationToken: String?
    ) throws -> URLRequest {
        let anonKey = configuration.anonKey.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !anonKey.isEmpty else {
            throw SupabaseAuthClientError.missingAnonKey
        }

        var components = URLComponents(url: configuration.authBaseURL.appending(path: path), resolvingAgainstBaseURL: false)
        if !queryItems.isEmpty {
            components?.queryItems = queryItems
        }

        guard let url = components?.url else {
            throw SupabaseAuthClientError.invalidProjectURL
        }

        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue(anonKey, forHTTPHeaderField: "apikey")
        if let authorizationToken {
            request.setValue("Bearer \(authorizationToken)", forHTTPHeaderField: "Authorization")
        }
        return request
    }

    private func decodeServerError(statusCode: Int, data: Data) -> SupabaseAuthClientError {
        if
            let body = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
        {
            let candidates = [
                body["msg"] as? String,
                body["error_description"] as? String,
                body["error"] as? String,
                body["message"] as? String,
            ]
            let message = candidates.compactMap { $0?.trimmingCharacters(in: .whitespacesAndNewlines) }.first { !$0.isEmpty }
            if let message {
                return .server(status: statusCode, message: message)
            }
        }

        let rawMessage = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        let message = rawMessage.isEmpty ? "Error d'autenticació de Supabase." : rawMessage
        return .server(status: statusCode, message: message)
    }

    private func redirectQueryItems(_ redirectURL: URL?) -> [URLQueryItem] {
        guard let redirectURL else { return [] }
        return [URLQueryItem(name: "redirect_to", value: redirectURL.absoluteString)]
    }

    public static func parseRedirectSession(from url: URL) -> SupabaseAuthRedirectSession? {
        let parameters = parseURLParameters(url)

        guard
            let accessToken = parameters["access_token"]?.trimmingCharacters(in: .whitespacesAndNewlines),
            !accessToken.isEmpty,
            let refreshToken = parameters["refresh_token"]?.trimmingCharacters(in: .whitespacesAndNewlines),
            !refreshToken.isEmpty
        else {
            return nil
        }

        let expiresIn = Int(parameters["expires_in"] ?? "") ?? 3600
        let expiresAtUnix = Int(parameters["expires_at"] ?? "")
        let tokenType = parameters["token_type"]?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false
            ? (parameters["token_type"] ?? "bearer")
            : "bearer"
        let flowType = parameters["type"]?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false
            ? (parameters["type"] ?? "unknown")
            : "unknown"

        return SupabaseAuthRedirectSession(
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresIn: expiresIn,
            expiresAtUnix: expiresAtUnix,
            tokenType: tokenType,
            flowType: flowType
        )
    }

    private static func parseURLParameters(_ url: URL) -> [String: String] {
        var values: [String: String] = [:]

        if let components = URLComponents(url: url, resolvingAgainstBaseURL: false) {
            components.queryItems?.forEach { item in
                values[item.name] = item.value ?? ""
            }
        }

        let fragment = url.fragment ?? ""
        if !fragment.isEmpty {
            URLComponents(string: "scheme://host?\(fragment)")?.queryItems?.forEach { item in
                values[item.name] = item.value ?? ""
            }
        }

        return values
    }
}

struct SupabaseAuthRegistrationEnvelope: Decodable, Equatable {
    let accessToken: String?
    let refreshToken: String?
    let expiresIn: Int?
    let expiresAtUnix: Int?
    let tokenType: String?
    let user: SupabaseAuthUser?

    enum CodingKeys: String, CodingKey {
        case accessToken = "access_token"
        case refreshToken = "refresh_token"
        case expiresIn = "expires_in"
        case expiresAtUnix = "expires_at"
        case tokenType = "token_type"
        case user
    }

    var result: SupabaseAuthRegistrationResult {
        SupabaseAuthRegistrationResult(
            session: session,
            user: user
        )
    }

    private var session: SupabaseAuthSession? {
        guard
            let accessToken,
            let refreshToken,
            let expiresIn,
            let tokenType,
            let user
        else {
            return nil
        }

        return SupabaseAuthSession(
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresIn: expiresIn,
            expiresAtUnix: expiresAtUnix,
            tokenType: tokenType,
            user: user
        )
    }
}

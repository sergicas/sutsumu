import Foundation

// MARK: - SutsumuSyncClient
//
// Sincronitza el workspace contra la taula `sutsumu_workspaces` de Supabase
// via la REST API (PostgREST). No requereix Edge Functions.
//
// Taula esperada (veure supabase_setup.sql):
//   user_id   UUID  PRIMARY KEY
//   data      JSONB            -- SutsumuWorkspace codificat com JSON
//   synced_at TIMESTAMPTZ

actor SutsumuSyncClient {

    private let projectURL: URL
    private let anonKey: String
    private let userId: String
    private let sessionToken: String

    public static let urlSession: URLSession = {
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = 15
        config.timeoutIntervalForResource = 60
        return URLSession(configuration: config)
    }()

    init(projectURL: URL, anonKey: String, userId: String, sessionToken: String) {
        self.projectURL = projectURL
        self.anonKey = anonKey
        self.userId = userId
        self.sessionToken = sessionToken
    }

    // MARK: - URL

    private var tableURL: URL {
        projectURL
            .appending(path: "rest")
            .appending(path: "v1")
            .appending(path: "sutsumu_workspaces")
    }

    // MARK: - Push (upsert)

    func push(workspace: SutsumuWorkspace) async throws {
        let payload = PushPayload(
            userId: userId,
            data: workspace,
            syncedAt: ISO8601DateFormatter().string(from: .now)
        )

        var req = URLRequest(url: tableURL)
        req.httpMethod = "POST"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.setValue("application/json", forHTTPHeaderField: "Accept")
        req.setValue("Bearer \(sessionToken)", forHTTPHeaderField: "Authorization")
        req.setValue(anonKey, forHTTPHeaderField: "apikey")
        req.setValue("resolution=merge-duplicates,return=minimal", forHTTPHeaderField: "Prefer")
        req.httpBody = try JSONEncoder().encode(payload)

        let (body, response) = try await SutsumuSyncClient.urlSession.data(for: req)
        guard let http = response as? HTTPURLResponse else { throw SutsumuError.invalidResponse }
        guard (200..<300).contains(http.statusCode) else {
            let bodyStr = String(data: body, encoding: .utf8) ?? "(buit)"
            throw SutsumuError.server(http.statusCode, bodyStr)
        }
    }

    // MARK: - Pull

    func pull() async throws -> SutsumuWorkspace {
        var components = URLComponents(url: tableURL, resolvingAgainstBaseURL: false)!
        components.queryItems = [URLQueryItem(name: "select", value: "data")]

        var req = URLRequest(url: components.url!)
        req.httpMethod = "GET"
        req.setValue("application/json", forHTTPHeaderField: "Accept")
        req.setValue("Bearer \(sessionToken)", forHTTPHeaderField: "Authorization")
        req.setValue(anonKey, forHTTPHeaderField: "apikey")

        let (data, response) = try await SutsumuSyncClient.urlSession.data(for: req)
        guard let http = response as? HTTPURLResponse else { throw SutsumuError.invalidResponse }
        guard (200..<300).contains(http.statusCode) else {
            let bodyStr = String(data: data, encoding: .utf8) ?? "(buit)"
            throw SutsumuError.server(http.statusCode, bodyStr)
        }

        let rows = try JSONDecoder().decode([PullRow].self, from: data)
        guard let first = rows.first else {
            throw SutsumuError.notFound
        }
        return first.data
    }

    // MARK: - Models interns

    private struct PushPayload: Encodable {
        let userId: String
        let data: SutsumuWorkspace
        let syncedAt: String
        enum CodingKeys: String, CodingKey {
            case userId = "user_id"
            case data
            case syncedAt = "synced_at"
        }
    }

    private struct PullRow: Decodable {
        let data: SutsumuWorkspace
    }
}

import Foundation

// MARK: - Models

struct SutsumuSession: Codable, Sendable {
    let accessToken: String
    let refreshToken: String
    let expiresAt: Int
    let userEmail: String

    var isExpired: Bool {
        let date = Date(timeIntervalSince1970: TimeInterval(expiresAt))
        return date <= Date().addingTimeInterval(60)
    }
}

struct SutsumuUser: Codable, Sendable {
    let id: String
    let email: String?
}

struct SutsumuSignUpResult: Sendable {
    let session: SutsumuSession?
    let user: SutsumuUser?
}

struct SutsumuRedirect: Sendable {
    let accessToken: String
    let refreshToken: String
    let expiresAt: Int
    let isRecovery: Bool
}

// MARK: - Errors

enum SutsumuError: Error, LocalizedError {
    case invalidURL
    case missingKey
    case invalidResponse
    case invalidRedirectURL
    case notFound
    case server(Int, String)

    var errorDescription: String? {
        switch self {
        case .invalidURL: return "URL del servidor no vàlida."
        case .missingKey: return "Falta la clau d'accés."
        case .invalidResponse: return "Resposta del servidor no vàlida."
        case .invalidRedirectURL: return "L'enllaç d'autenticació no és vàlid."
        case .notFound: return "No s'han trobat dades al servidor."
        case .server(_, let msg): return msg
        }
    }
}

// MARK: - Client

actor SutsumuAuthClient {
    private let projectURL: URL
    private let anonKey: String
    private let session: URLSession

    static let urlSession: URLSession = {
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = 15
        config.timeoutIntervalForResource = 60
        return URLSession(configuration: config)
    }()

    init(projectURL: URL, anonKey: String) {
        self.projectURL = projectURL
        self.anonKey = anonKey
        self.session = SutsumuAuthClient.urlSession
    }

    private var authBase: URL {
        projectURL.appending(path: "auth").appending(path: "v1")
    }

    // MARK: - Sign In

    func signIn(email: String, password: String) async throws -> SutsumuSession {
        let body: [String: String] = ["email": email, "password": password]
        return try await tokenRequest(grantType: "password", body: body)
    }

    // MARK: - Sign Up

    func signUp(email: String, password: String, redirectTo: URL?) async throws -> SutsumuSignUpResult {
        var url = authBase.appending(path: "signup")
        if let redirect = redirectTo {
            url.append(queryItems: [URLQueryItem(name: "redirect_to", value: redirect.absoluteString)])
        }
        var req = makeRequest(url: url, method: "POST")
        req.httpBody = try JSONEncoder().encode(["email": email, "password": password])

        let (data, response) = try await session.data(for: req)
        try validateResponse(response, data: data)

        struct Envelope: Decodable {
            let access_token: String?
            let refresh_token: String?
            let expires_at: Int?
            let user: UserEnvelope?
        }
        struct UserEnvelope: Decodable {
            let id: String
            let email: String?
        }
        let env = try JSONDecoder().decode(Envelope.self, from: data)
        let user = env.user.map { SutsumuUser(id: $0.id, email: $0.email) }

        if let at = env.access_token, let rt = env.refresh_token, let ea = env.expires_at,
           let u = user {
            let s = SutsumuSession(accessToken: at, refreshToken: rt, expiresAt: ea,
                                   userEmail: u.email ?? "")
            return SutsumuSignUpResult(session: s, user: user)
        }
        return SutsumuSignUpResult(session: nil, user: user)
    }

    // MARK: - Sign Out

    func signOut(accessToken: String) async throws {
        var req = makeRequest(url: authBase.appending(path: "logout"), method: "POST")
        req.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        let (_, response) = try await session.data(for: req)
        try validateResponse(response, data: Data())
    }

    // MARK: - Refresh

    func refreshSession(refreshToken: String) async throws -> SutsumuSession {
        return try await tokenRequest(grantType: "refresh_token", body: ["refresh_token": refreshToken])
    }

    // MARK: - Fetch User

    func fetchUser(accessToken: String) async throws -> SutsumuUser {
        var req = makeRequest(url: authBase.appending(path: "user"), method: "GET")
        req.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        let (data, response) = try await session.data(for: req)
        try validateResponse(response, data: data)
        struct Envelope: Decodable { let id: String; let email: String? }
        let env = try JSONDecoder().decode(Envelope.self, from: data)
        return SutsumuUser(id: env.id, email: env.email)
    }

    // MARK: - Password Reset

    func requestPasswordReset(email: String, redirectTo: URL?) async throws {
        var url = authBase.appending(path: "recover")
        if let redirect = redirectTo {
            url.append(queryItems: [URLQueryItem(name: "redirect_to", value: redirect.absoluteString)])
        }
        var req = makeRequest(url: url, method: "POST")
        req.httpBody = try JSONEncoder().encode(["email": email])
        let (data, response) = try await session.data(for: req)
        try validateResponse(response, data: data)
    }

    // MARK: - Parse Redirect

    static func parseRedirect(_ url: URL) -> SutsumuRedirect? {
        var params: [String: String] = [:]

        // Query params
        URLComponents(url: url, resolvingAgainstBaseURL: false)?
            .queryItems?.forEach { params[$0.name] = $0.value ?? "" }

        // Fragment params (Supabase implicit flow)
        let fragment = url.fragment ?? ""
        if !fragment.isEmpty {
            URLComponents(string: "x://x?\(fragment)")?
                .queryItems?.forEach { params[$0.name] = $0.value ?? "" }
        }

        guard
            let at = params["access_token"], !at.isEmpty,
            let rt = params["refresh_token"], !rt.isEmpty
        else { return nil }

        let expiresAt = Int(params["expires_at"] ?? "") ?? Int(Date().timeIntervalSince1970) + 3600

        return SutsumuRedirect(
            accessToken: at,
            refreshToken: rt,
            expiresAt: expiresAt,
            isRecovery: params["type"] == "recovery"
        )
    }

    // MARK: - Helpers privats

    private func tokenRequest(grantType: String, body: [String: String]) async throws -> SutsumuSession {
        var url = authBase.appending(path: "token")
        url.append(queryItems: [URLQueryItem(name: "grant_type", value: grantType)])
        var req = makeRequest(url: url, method: "POST")
        req.httpBody = try JSONEncoder().encode(body)

        let (data, response) = try await session.data(for: req)
        try validateResponse(response, data: data)

        struct Envelope: Decodable {
            let access_token: String
            let refresh_token: String
            let expires_at: Int?
            let expires_in: Int?
            let user: UserEnvelope?
        }
        struct UserEnvelope: Decodable { let email: String? }

        let env = try JSONDecoder().decode(Envelope.self, from: data)
        let expiresAt = env.expires_at ?? (Int(Date().timeIntervalSince1970) + (env.expires_in ?? 3600))
        return SutsumuSession(
            accessToken: env.access_token,
            refreshToken: env.refresh_token,
            expiresAt: expiresAt,
            userEmail: env.user?.email ?? ""
        )
    }

    private func makeRequest(url: URL, method: String) -> URLRequest {
        var req = URLRequest(url: url)
        req.httpMethod = method
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.setValue(anonKey, forHTTPHeaderField: "apikey")
        return req
    }

    private func validateResponse(_ response: URLResponse, data: Data) throws {
        guard let http = response as? HTTPURLResponse else { throw SutsumuError.invalidResponse }
        guard (200..<300).contains(http.statusCode) else {
            struct ErrEnvelope: Decodable { let error_description: String?; let message: String? }
            let msg = (try? JSONDecoder().decode(ErrEnvelope.self, from: data))
                .flatMap { $0.error_description ?? $0.message }
                ?? HTTPURLResponse.localizedString(forStatusCode: http.statusCode)
            throw SutsumuError.server(http.statusCode, msg)
        }
    }
}

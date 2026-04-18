import Foundation
import SwiftUI

@MainActor
final class AuthService: ObservableObject {
    @Published var email = ""
    @Published var password = ""
    @Published var isLoading = false
    @Published var statusMessage = ""
    @Published var isPasswordResetFlowActive = false
    @Published var authUserEmail = ""

    private(set) var sessionToken = ""
    private var currentSession: SutsumuSession?
    private var didAttemptRestore = false

    private let keychain = KeychainStore(service: "cat.sergicastillo.sutsumu.v3")
    private let sessionKey = "session"
    private let emailKey = "sutsumu.v3.email"
    private weak var diagnosticsService: DiagnosticsService?

    func setup(diagnostics: DiagnosticsService) {
        self.diagnosticsService = diagnostics
    }

    static let redirectURL = "cat.sergicastillo.sutsumu.v3://auth"

    var isAuthenticated: Bool {
        currentSession != nil && !sessionToken.isEmpty
    }

    /// UUID de l'usuari autenticat, extret del JWT (claim `sub`).
    var userId: String {
        Self.subFromJWT(sessionToken) ?? ""
    }

    private static func subFromJWT(_ token: String) -> String? {
        let parts = token.split(separator: ".")
        guard parts.count == 3 else { return nil }
        var b64 = String(parts[1])
            .replacingOccurrences(of: "-", with: "+")
            .replacingOccurrences(of: "_", with: "/")
        let r = b64.count % 4
        if r > 0 { b64 += String(repeating: "=", count: 4 - r) }
        guard let data = Data(base64Encoded: b64) else { return nil }
        struct Payload: Decodable { let sub: String? }
        return (try? JSONDecoder().decode(Payload.self, from: data))?.sub
    }

    var canSignIn: Bool {
        !email.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty &&
        !password.isEmpty
    }

    // MARK: - Configuració Supabase

    private var projectURL: String {
        Bundle.main.object(forInfoDictionaryKey: "SutsumuDefaultProjectURL") as? String ?? ""
    }

    private var anonKey: String {
        Bundle.main.object(forInfoDictionaryKey: "SutsumuDefaultAnonKey") as? String ?? ""
    }

    func makeAuthClient() throws -> SutsumuAuthClient {
        guard let url = URL(string: projectURL), !projectURL.isEmpty else {
            throw SutsumuError.invalidURL
        }
        guard !anonKey.isEmpty else {
            throw SutsumuError.missingKey
        }
        return SutsumuAuthClient(projectURL: url, anonKey: anonKey)
    }

    // MARK: - Restaurar sessió

    func restoreSessionIfNeeded() async {
        guard !didAttemptRestore else { return }
        didAttemptRestore = true

        guard let session = try? loadSession() else { return }

        if !session.isExpired {
            applySession(session)
            return
        }

        guard beginLoading("Refrescant la sessió...") else { return }
        defer { isLoading = false }

        do {
            let client = try makeAuthClient()
            let refreshed = try await client.refreshSession(refreshToken: session.refreshToken)
            try saveSession(refreshed)
            applySession(refreshed)
            statusMessage = "Sessió recuperada."
        } catch {
            diagnosticsService?.record(error, domain: .auth)
            try? deleteSession()
            clearSession()
            statusMessage = "Sessió caducada. Torna a iniciar sessió."
        }
    }

    // MARK: - Sign In / Sign Up / Sign Out

    func signIn() async {
        guard canSignIn else { return }
        guard beginLoading("Iniciant sessió...") else { return }
        defer { isLoading = false }

        let trimmedEmail = email.trimmingCharacters(in: .whitespacesAndNewlines)

        do {
            let client = try makeAuthClient()
            let session = try await client.signIn(email: trimmedEmail, password: password)
            try saveSession(session)
            isPasswordResetFlowActive = false
            applySession(session)
            password = ""
            statusMessage = "Sessió iniciada."
            UserDefaults.standard.set(trimmedEmail, forKey: emailKey)
        } catch {
            diagnosticsService?.record(error, domain: .auth)
            statusMessage = error.localizedDescription
        }
    }

    func signUp() async {
        guard canSignIn else { return }
        guard beginLoading("Creant compte...") else { return }
        defer { isLoading = false }

        let trimmedEmail = email.trimmingCharacters(in: .whitespacesAndNewlines)
        let redirectURL = URL(string: AuthService.redirectURL)

        do {
            let client = try makeAuthClient()
            let result = try await client.signUp(
                email: trimmedEmail,
                password: password,
                redirectTo: redirectURL
            )
            if let session = result.session {
                try saveSession(session)
                applySession(session)
                password = ""
                statusMessage = "Compte creat. Sessió oberta."
            } else {
                statusMessage = "Compte creat. Comprova el correu per confirmar-lo."
            }
            UserDefaults.standard.set(trimmedEmail, forKey: emailKey)
        } catch {
            diagnosticsService?.record(error, domain: .auth)
            statusMessage = error.localizedDescription
        }
    }

    func signOut() async {
        guard beginLoading("Tancant sessió...") else { return }
        defer { isLoading = false }

        if let session = currentSession {
            let client = try? makeAuthClient()
            try? await client?.signOut(accessToken: session.accessToken)
        }

        try? deleteSession()
        clearSession()
        statusMessage = "Sessió tancada."
    }

    func requestPasswordReset() async {
        let trimmedEmail = email.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedEmail.isEmpty else {
            statusMessage = "Introdueix el correu electrònic primer."
            return
        }
        guard beginLoading("Enviant correu de recuperació...") else { return }
        defer { isLoading = false }

        do {
            let client = try makeAuthClient()
            let redirectURL = URL(string: AuthService.redirectURL)
            try await client.requestPasswordReset(email: trimmedEmail, redirectTo: redirectURL)
            statusMessage = "Correu enviat a \(trimmedEmail)."
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    // MARK: - Auth Redirect (deep link)

    func handleAuthRedirect(_ url: URL) async {
        guard beginLoading("Processant l'enllaç...") else { return }
        defer { isLoading = false }

        do {
            guard let redirect = SutsumuAuthClient.parseRedirect(url) else {
                throw SutsumuError.invalidRedirectURL
            }
            let client = try makeAuthClient()
            let user = try await client.fetchUser(accessToken: redirect.accessToken)
            let session = SutsumuSession(
                accessToken: redirect.accessToken,
                refreshToken: redirect.refreshToken,
                expiresAt: redirect.expiresAt,
                userEmail: user.email ?? ""
            )
            try saveSession(session)
            applySession(session)

            if redirect.isRecovery {
                isPasswordResetFlowActive = true
                statusMessage = "Ara pots escriure la nova contrasenya."
            } else {
                statusMessage = "Sessió activa."
            }
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    // MARK: - Helpers privats

    private func beginLoading(_ message: String) -> Bool {
        guard !isLoading else { return false }
        isLoading = true
        statusMessage = message
        return true
    }

    private func applySession(_ session: SutsumuSession) {
        currentSession = session
        sessionToken = session.accessToken
        authUserEmail = session.userEmail
    }

    private func clearSession() {
        currentSession = nil
        sessionToken = ""
        authUserEmail = ""
        isPasswordResetFlowActive = false
    }

    // MARK: - Keychain

    private func saveSession(_ session: SutsumuSession) throws {
        let data = try JSONEncoder().encode(session)
        try keychain.save(data, forKey: sessionKey)
    }

    private func loadSession() throws -> SutsumuSession? {
        guard let data = try keychain.load(forKey: sessionKey) else { return nil }
        return try JSONDecoder().decode(SutsumuSession.self, from: data)
    }

    private func deleteSession() throws {
        try keychain.delete(forKey: sessionKey)
    }
}

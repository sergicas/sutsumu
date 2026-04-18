import Foundation

// MARK: - HealthCheckService
//
// Bucle de verificació en cada llançament:
// Comprova que els components crítics funcionen correctament
// abans que l'usuari interactuï amb l'app.
// Els errors es registren a DiagnosticsService.

struct HealthCheckResult {
    let name: String
    let passed: Bool
    let detail: String
}

enum HealthCheckService {

    // MARK: - Execució completa

    /// Executa totes les verificacions i retorna els resultats.
    /// Crida des d'AppState.init() per detectar problemes de forma proactiva.
    @MainActor
    static func runAll(diagnostics: DiagnosticsService) -> [HealthCheckResult] {
        let checks: [HealthCheckResult] = [
            checkBundleConfig(),
            checkWorkspaceSerialization(),
            checkDiagnosticsSerialization(),
            checkErrorEntrySerialization()
        ]

        // Registra els checks fallits com a errors de sistema
        for check in checks where !check.passed {
            let error = HealthCheckError(checkName: check.name, detail: check.detail)
            diagnostics.record(error, domain: .decode)
        }

        return checks
    }

    // MARK: - Verificacions individuals

    /// Comprova que Info.plist té les claus de Supabase necessàries.
    static func checkBundleConfig() -> HealthCheckResult {
        let url = Bundle.main.object(forInfoDictionaryKey: "SutsumuDefaultProjectURL") as? String ?? ""
        let key = Bundle.main.object(forInfoDictionaryKey: "SutsumuDefaultAnonKey") as? String ?? ""
        let passed = !url.isEmpty && !key.isEmpty
        return HealthCheckResult(
            name: "Configuració Supabase",
            passed: passed,
            detail: passed ? "URL i clau anònima presents" : "Manca SutsumuDefaultProjectURL o SutsumuDefaultAnonKey"
        )
    }

    /// Comprova que SutsumuWorkspace es pot codificar i descodificar sense errors.
    static func checkWorkspaceSerialization() -> HealthCheckResult {
        do {
            let ws = SutsumuWorkspace()
            let data = try JSONEncoder().encode(ws)
            _ = try JSONDecoder().decode(SutsumuWorkspace.self, from: data)
            return HealthCheckResult(name: "Serialització Workspace", passed: true, detail: "JSON round-trip OK")
        } catch {
            return HealthCheckResult(name: "Serialització Workspace", passed: false, detail: error.localizedDescription)
        }
    }

    /// Comprova que [ErrorEntry] es pot codificar i descodificar sense errors.
    static func checkDiagnosticsSerialization() -> HealthCheckResult {
        do {
            let entries = [ErrorEntry(domain: .sync, error: URLError(.notConnectedToInternet))]
            let data = try JSONEncoder().encode(entries)
            _ = try JSONDecoder().decode([ErrorEntry].self, from: data)
            return HealthCheckResult(name: "Serialització Diagnòstic", passed: true, detail: "JSON round-trip OK")
        } catch {
            return HealthCheckResult(name: "Serialització Diagnòstic", passed: false, detail: error.localizedDescription)
        }
    }

    /// Comprova que tots els dominis d'ErrorEntry es codifiquen correctament.
    static func checkErrorEntrySerialization() -> HealthCheckResult {
        do {
            let entries = ErrorEntry.ErrorDomain.allCases.map {
                ErrorEntry(domain: $0, error: URLError(.unknown))
            }
            let data = try JSONEncoder().encode(entries)
            let decoded = try JSONDecoder().decode([ErrorEntry].self, from: data)
            let passed = decoded.count == ErrorEntry.ErrorDomain.allCases.count
            return HealthCheckResult(
                name: "Dominis d'error",
                passed: passed,
                detail: passed ? "\(decoded.count) dominis OK" : "Mismatch en la descodificació"
            )
        } catch {
            return HealthCheckResult(name: "Dominis d'error", passed: false, detail: error.localizedDescription)
        }
    }
}

// MARK: - Error intern

private struct HealthCheckError: LocalizedError {
    let checkName: String
    let detail: String
    var errorDescription: String? { "[\(checkName)] \(detail)" }
}

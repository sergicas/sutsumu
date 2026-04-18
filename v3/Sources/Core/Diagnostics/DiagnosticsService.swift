import Foundation
import SwiftUI

// MARK: - DiagnosticsService
//
// Entorn d'Execució en Bucle Tancat:
//  1. Captura errors de tota l'app (via record(_:domain:))
//  2. Els persisteix a UserDefaults entre execucions
//  3. Analitza l'historial i ajusta el comportament automàticament
//     (shouldSkipAutoSync, syncDebounceInterval, shouldSuggestReLogin…)

@MainActor
final class DiagnosticsService: ObservableObject {

    @Published private(set) var entries: [ErrorEntry] = []

    private let maxEntries = 200
    private let storageKey = "sutsumu.v3.diagnostics"

    init() { load() }

    // MARK: - Adaptacions de comportament (el "bucle tancat")

    /// Pausa la sincronització automàtica si s'han produït ≥3 errors de sync en l'última hora.
    var shouldSkipAutoSync: Bool {
        count(domain: .sync, within: 3600) >= 3
    }

    /// Interval de debounce adaptatiu per al sync:
    ///   - Normal (0-2 errors/h)  → 2s
    ///   - Moderat (3-5 errors/h) → 30s
    ///   - Alt (≥6 errors/h)      → 5min
    var syncDebounceInterval: TimeInterval {
        switch count(domain: .sync, within: 3600) {
        case 0..<3:  return 2.0
        case 3..<6:  return 30.0
        default:     return 300.0
        }
    }

    /// Suggereix tornar a iniciar sessió si hi ha ≥2 errors d'auth en els últims 5 minuts.
    var shouldSuggestReLogin: Bool {
        count(domain: .auth, within: 300) >= 2
    }

    /// True si qualsevol adaptació significativa és activa.
    var hasDegradedMode: Bool {
        shouldSkipAutoSync || shouldSuggestReLogin
    }

    /// Llista de comportaments modificats, per mostrar a l'usuari.
    var activeBehaviors: [String] {
        var list: [String] = []

        if shouldSkipAutoSync {
            list.append("Sincronització automàtica pausada (≥3 errors en l'última hora)")
        } else if syncDebounceInterval > 2 {
            let secs = Int(syncDebounceInterval)
            list.append("Reintent de sync ajornat \(secs)s (backoff actiu)")
        }

        if shouldSuggestReLogin {
            list.append("S'aconsella tornar a iniciar sessió (errors d'autenticació repetits)")
        }

        return list
    }

    // MARK: - Registre d'errors

    func record(_ error: Error, domain: ErrorEntry.ErrorDomain) {
        let entry = ErrorEntry(domain: domain, error: error)
        entries.insert(entry, at: 0)
        if entries.count > maxEntries {
            entries = Array(entries.prefix(maxEntries))
        }
        persist()
    }

    func clearAll() {
        entries = []
        persist()
    }

    // MARK: - Consultes internes

    private func count(domain: ErrorEntry.ErrorDomain, within seconds: TimeInterval) -> Int {
        let cutoff = Date.now.addingTimeInterval(-seconds)
        return entries.filter { $0.domain == domain && $0.timestamp > cutoff }.count
    }

    // MARK: - Persistència

    private func load() {
        guard
            let data = UserDefaults.standard.data(forKey: storageKey),
            let loaded = try? JSONDecoder().decode([ErrorEntry].self, from: data)
        else { return }
        entries = loaded
    }

    private func persist() {
        guard let data = try? JSONEncoder().encode(entries) else { return }
        UserDefaults.standard.set(data, forKey: storageKey)
    }
}

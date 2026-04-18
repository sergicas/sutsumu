import Foundation
import SwiftUI

@MainActor
final class SyncService: ObservableObject {
    @Published var isSyncing = false
    @Published var statusMessage = ""
    @Published var lastSyncDate: Date? = nil

    private weak var authService: AuthService?
    private weak var workspaceService: WorkspaceService?
    private weak var diagnosticsService: DiagnosticsService?
    private var debounceTask: Task<Void, Never>?

    func setup(auth: AuthService, workspace: WorkspaceService, diagnostics: DiagnosticsService) {
        self.authService = auth
        self.workspaceService = workspace
        self.diagnosticsService = diagnostics
    }

    var canSync: Bool {
        authService?.isAuthenticated == true && !isSyncing
    }

    // MARK: - Sync debouncejat (per canvis locals)

    func scheduleSync() {
        guard diagnosticsService?.shouldSkipAutoSync != true else {
            statusMessage = "Sync automàtic pausat (massa errors recents)."
            return
        }

        let delay = diagnosticsService?.syncDebounceInterval ?? 2.0
        let delayNs = UInt64(delay * 1_000_000_000)

        debounceTask?.cancel()
        debounceTask = Task { [weak self] in
            try? await Task.sleep(nanoseconds: delayNs)
            guard !Task.isCancelled else { return }
            await self?.syncNow()
        }
    }

    // MARK: - Sync immediat: push → pull → merge

    func syncNow() async {
        guard canSync else { return }
        guard let auth = authService, let workspace = workspaceService else { return }

        isSyncing = true
        defer { isSyncing = false }
        statusMessage = "Sincronitzant..."

        do {
            let client = try makeClient(auth: auth)

            // 1. Baixa l'estat remot
            let merged: SutsumuWorkspace
            do {
                let remote = try await client.pull()
                // 2. Fusiona: el document més recent guanya
                merged = Self.merge(local: workspace.workspace, remote: remote)
                workspace.applyRemote(merged)
            } catch SutsumuError.notFound {
                // Primera sync: no hi ha dades remotes, usem el local
                merged = workspace.workspace
            }

            // 3. Puja el resultat fusionat al servidor
            try await client.push(workspace: merged)

            lastSyncDate = .now
            statusMessage = "Sincronitzat correctament."

        } catch {
            diagnosticsService?.record(error, domain: .sync)
            statusMessage = "Error al sincronitzar: \(error.localizedDescription)"
        }
    }

    // MARK: - Merge (last-write-wins per document)

    static func merge(local: SutsumuWorkspace, remote: SutsumuWorkspace) -> SutsumuWorkspace {
        var merged = local

        // Documents: per a cada document remot, agafa el més recent
        for remoteDoc in remote.documents {
            if let idx = merged.documents.firstIndex(where: { $0.id == remoteDoc.id }) {
                if remoteDoc.updatedAt > merged.documents[idx].updatedAt {
                    merged.documents[idx] = remoteDoc
                }
            } else {
                merged.documents.append(remoteDoc)
            }
        }

        // Carpetes: afegeix les que no existeixen localment
        for remoteFolder in remote.folders {
            if !merged.folders.contains(where: { $0.id == remoteFolder.id }) {
                merged.folders.append(remoteFolder)
            }
        }

        return merged
    }

    // MARK: - Helper

    private func makeClient(auth: AuthService) throws -> SutsumuSyncClient {
        let projectURL = Bundle.main.object(forInfoDictionaryKey: "SutsumuDefaultProjectURL") as? String ?? ""
        let anonKey   = Bundle.main.object(forInfoDictionaryKey: "SutsumuDefaultAnonKey") as? String ?? ""
        guard let url = URL(string: projectURL), !projectURL.isEmpty else {
            throw SutsumuError.invalidURL
        }
        guard !anonKey.isEmpty else { throw SutsumuError.missingKey }
        guard !auth.userId.isEmpty else { throw SutsumuError.missingKey }
        return SutsumuSyncClient(
            projectURL: url,
            anonKey: anonKey,
            userId: auth.userId,
            sessionToken: auth.sessionToken
        )
    }
}

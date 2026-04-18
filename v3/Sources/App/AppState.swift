import Foundation
import SwiftUI
import Combine

@MainActor
final class AppState: ObservableObject {
    @Published var authService = AuthService()
    @Published var workspaceService = WorkspaceService()
    @Published var syncService = SyncService()
    @Published var themeEngine = ThemeEngine()
    @Published var diagnosticsService = DiagnosticsService()
    @Published var attachmentService = AttachmentService()

    private var cancellables = Set<AnyCancellable>()

    init() {
        syncService.setup(auth: authService, workspace: workspaceService, diagnostics: diagnosticsService)
        workspaceService.setup(auth: authService, sync: syncService)
        authService.setup(diagnostics: diagnosticsService)
        attachmentService.setup(auth: authService, workspace: workspaceService)

        // Bucle de verificació en llançament
        _ = HealthCheckService.runAll(diagnostics: diagnosticsService)

        // Propaga canvis dels sub-serveis al ContentView
        authService.objectWillChange
            .sink { [weak self] in self?.objectWillChange.send() }
            .store(in: &cancellables)
        workspaceService.objectWillChange
            .sink { [weak self] in self?.objectWillChange.send() }
            .store(in: &cancellables)
        syncService.objectWillChange
            .sink { [weak self] in self?.objectWillChange.send() }
            .store(in: &cancellables)
        themeEngine.objectWillChange
            .sink { [weak self] in self?.objectWillChange.send() }
            .store(in: &cancellables)
        diagnosticsService.objectWillChange
            .sink { [weak self] in self?.objectWillChange.send() }
            .store(in: &cancellables)
        attachmentService.objectWillChange
            .sink { [weak self] in self?.objectWillChange.send() }
            .store(in: &cancellables)
    }
}

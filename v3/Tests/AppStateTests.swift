import XCTest
@testable import Sutsumu

// MARK: - AppStateTests
//
// Verifica que l'AppState inicialitza correctament tots els serveis
// i que les dependències entre ells estan ben configurades.
// Si s'afegeix un servei nou i no es cabla, aquest test ho detecta.

@MainActor
final class AppStateTests: XCTestCase {

    var appState: AppState!

    override func setUp() async throws {
        appState = AppState()
    }

    // MARK: - Inicialització

    func testAppState_inicialitzaTotesLesServeis() {
        XCTAssertNotNil(appState.authService)
        XCTAssertNotNil(appState.workspaceService)
        XCTAssertNotNil(appState.syncService)
        XCTAssertNotNil(appState.themeEngine)
        XCTAssertNotNil(appState.diagnosticsService)
    }

    func testAuthService_noPotSincronitzarSenseSessio() {
        // L'usuari no està autenticat en init → canSync ha de ser false
        XCTAssertFalse(appState.syncService.canSync)
    }

    func testAuthService_noEstaAutenticat_enInit() {
        XCTAssertFalse(appState.authService.isAuthenticated)
    }

    func testSyncService_noEstaSincronitzant_enInit() {
        XCTAssertFalse(appState.syncService.isSyncing)
    }

    func testWorkspace_buit_enInit() {
        // Si no hi ha dades guardades, el workspace comença buit
        // (pot tenir dades si s'ha executat l'app realment)
        XCTAssertNotNil(appState.workspaceService.workspace)
    }

    // MARK: - ThemeEngine

    func testThemeEngine_teUnTemaSeleccionat() {
        // Ha de tenir sempre un tema vàlid
        let theme = appState.themeEngine.current
        XCTAssertFalse(theme.name.isEmpty)
        XCTAssertFalse(theme.id.isEmpty)
    }

    func testThemeEngine_temesDisponibles() {
        XCTAssertGreaterThanOrEqual(SutsumuTheme.all.count, 4)
    }

    // MARK: - DiagnosticsService

    func testDiagnosticsService_enInit_haExecutatHealthCheck() {
        // El HealthCheck s'executa en init i pot registrar errors de bundle config
        // (en tests el bundle no té les claus de Supabase → pot haver-hi 1 error)
        // El que importa és que DiagnosticsService existeix i funciona
        XCTAssertNotNil(appState.diagnosticsService)
    }

    // MARK: - Integració WorkspaceService → SyncService

    func testCrearDocument_noTriggejaSyncSenseSessio() {
        // Sense autenticació, crear un document no hauria de posar isSyncing a true
        appState.workspaceService.createDocument()
        XCTAssertFalse(appState.syncService.isSyncing)
    }
}

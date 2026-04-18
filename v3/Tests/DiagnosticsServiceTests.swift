import XCTest
@testable import Sutsumu

// MARK: - DiagnosticsServiceTests
//
// Verifica que el bucle tancat funciona correctament:
// - Registre i persistència d'errors
// - Càlcul correcte de les adaptacions de comportament
// - Que el mode degradat s'activa i desactiva com s'espera

@MainActor
final class DiagnosticsServiceTests: XCTestCase {

    private let testKey = "sutsumu.v3.diagnostics"
    var service: DiagnosticsService!

    override func setUp() async throws {
        UserDefaults.standard.removeObject(forKey: testKey)
        service = DiagnosticsService()
    }

    override func tearDown() async throws {
        UserDefaults.standard.removeObject(forKey: testKey)
    }

    // MARK: - Estat inicial

    func testInitial_modeFuncionamentNormal() {
        XCTAssertFalse(service.hasDegradedMode)
        XCTAssertFalse(service.shouldSkipAutoSync)
        XCTAssertFalse(service.shouldSuggestReLogin)
        XCTAssertTrue(service.entries.isEmpty)
        XCTAssertTrue(service.activeBehaviors.isEmpty)
    }

    func testInitial_debounceNormal() {
        XCTAssertEqual(service.syncDebounceInterval, 2.0)
    }

    // MARK: - Registre d'errors

    func testRecord_afegeixEntrada() {
        service.record(URLError(.notConnectedToInternet), domain: .sync)
        XCTAssertEqual(service.entries.count, 1)
    }

    func testRecord_dominioCorrecte() {
        service.record(URLError(.userAuthenticationRequired), domain: .auth)
        XCTAssertEqual(service.entries.first?.domain, .auth)
    }

    func testRecord_multiplesDominis() {
        service.record(URLError(.notConnectedToInternet), domain: .sync)
        service.record(URLError(.userAuthenticationRequired), domain: .auth)
        service.record(URLError(.cannotDecodeContentData), domain: .decode)
        XCTAssertEqual(service.entries.count, 3)
    }

    func testRecord_ordenatPerDataDescendent() {
        service.record(URLError(.notConnectedToInternet), domain: .sync)
        service.record(URLError(.timedOut), domain: .sync)
        // L'últim registrat ha de ser el primer de la llista
        XCTAssertEqual(service.entries.count, 2)
        XCTAssertGreaterThanOrEqual(
            service.entries[0].timestamp,
            service.entries[1].timestamp
        )
    }

    // MARK: - Adaptació: Sync

    func testMenys3ErrorsSync_debounceNormal() {
        service.record(URLError(.notConnectedToInternet), domain: .sync)
        service.record(URLError(.notConnectedToInternet), domain: .sync)
        XCTAssertFalse(service.shouldSkipAutoSync)
        XCTAssertEqual(service.syncDebounceInterval, 2.0)
    }

    func test3ErrorsSync_activaModeDegradat() {
        for _ in 0..<3 {
            service.record(URLError(.notConnectedToInternet), domain: .sync)
        }
        XCTAssertTrue(service.shouldSkipAutoSync)
        XCTAssertTrue(service.hasDegradedMode)
    }

    func testDebounce_moderatAmb4Errors() {
        for _ in 0..<4 {
            service.record(URLError(.notConnectedToInternet), domain: .sync)
        }
        XCTAssertEqual(service.syncDebounceInterval, 30.0)
    }

    func testDebounce_altAmb6Errors() {
        for _ in 0..<6 {
            service.record(URLError(.notConnectedToInternet), domain: .sync)
        }
        XCTAssertEqual(service.syncDebounceInterval, 300.0)
    }

    // MARK: - Adaptació: Auth

    func test1ErrorAuth_noSuggereixReLogin() {
        service.record(URLError(.userAuthenticationRequired), domain: .auth)
        XCTAssertFalse(service.shouldSuggestReLogin)
    }

    func test2ErrorsAuth_suggereixReLogin() {
        service.record(URLError(.userAuthenticationRequired), domain: .auth)
        service.record(URLError(.userAuthenticationRequired), domain: .auth)
        XCTAssertTrue(service.shouldSuggestReLogin)
        XCTAssertTrue(service.hasDegradedMode)
    }

    // MARK: - Comportaments actius

    func testActiveBehaviors_buitSenseErrors() {
        XCTAssertTrue(service.activeBehaviors.isEmpty)
    }

    func testActiveBehaviors_descriu3ErrorsSync() {
        for _ in 0..<3 {
            service.record(URLError(.notConnectedToInternet), domain: .sync)
        }
        XCTAssertFalse(service.activeBehaviors.isEmpty)
        XCTAssertTrue(service.activeBehaviors.first?.contains("pausada") == true)
    }

    // MARK: - Esborrat

    func testClearAll_buidaEntrades() {
        service.record(URLError(.notConnectedToInternet), domain: .sync)
        service.record(URLError(.notConnectedToInternet), domain: .sync)
        service.record(URLError(.notConnectedToInternet), domain: .sync)
        service.clearAll()
        XCTAssertTrue(service.entries.isEmpty)
        XCTAssertFalse(service.hasDegradedMode)
    }

    func testClearAll_tornaAModeNormal() {
        for _ in 0..<5 {
            service.record(URLError(.notConnectedToInternet), domain: .sync)
        }
        XCTAssertTrue(service.hasDegradedMode)
        service.clearAll()
        XCTAssertFalse(service.hasDegradedMode)
        XCTAssertEqual(service.syncDebounceInterval, 2.0)
    }

    // MARK: - Persistència

    func testPersistenceAcrossInstances() {
        service.record(URLError(.notConnectedToInternet), domain: .sync)
        service.record(URLError(.userAuthenticationRequired), domain: .auth)

        let service2 = DiagnosticsService()
        XCTAssertEqual(service2.entries.count, 2)
    }

    func testClearAllPersisteix() {
        service.record(URLError(.notConnectedToInternet), domain: .sync)
        service.clearAll()

        let service2 = DiagnosticsService()
        XCTAssertTrue(service2.entries.isEmpty)
    }

    func testModeDegradat_persisteixEntreSessions() {
        for _ in 0..<3 {
            service.record(URLError(.notConnectedToInternet), domain: .sync)
        }
        XCTAssertTrue(service.hasDegradedMode)

        let service2 = DiagnosticsService()
        XCTAssertTrue(service2.hasDegradedMode)
    }

    // MARK: - ErrorEntry model

    func testErrorEntry_teCampsCorrectes() {
        let error = URLError(.notConnectedToInternet)
        let entry = ErrorEntry(domain: .sync, error: error)
        XCTAssertFalse(entry.id.isEmpty)
        XCTAssertEqual(entry.domain, .sync)
        XCTAssertFalse(entry.message.isEmpty)
        XCTAssertFalse(entry.code.isEmpty)
    }

    func testErrorEntry_serialitzacioRoundTrip() throws {
        let entry = ErrorEntry(domain: .auth, error: URLError(.userAuthenticationRequired))
        let data = try JSONEncoder().encode(entry)
        let decoded = try JSONDecoder().decode(ErrorEntry.self, from: data)
        XCTAssertEqual(decoded.id, entry.id)
        XCTAssertEqual(decoded.domain, entry.domain)
        XCTAssertEqual(decoded.message, entry.message)
    }

    func testTotsDominis_serialitzen() throws {
        for domain in ErrorEntry.ErrorDomain.allCases {
            let entry = ErrorEntry(domain: domain, error: URLError(.unknown))
            let data = try JSONEncoder().encode(entry)
            let decoded = try JSONDecoder().decode(ErrorEntry.self, from: data)
            XCTAssertEqual(decoded.domain, domain, "Fallida serialització del domini: \(domain.rawValue)")
        }
    }
}

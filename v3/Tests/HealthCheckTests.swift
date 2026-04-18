import XCTest
@testable import Sutsumu

// MARK: - HealthCheckTests
//
// Verifica que les comprovacions de salut en llançament funcionen.
// Si algun model canvia i deixa de ser serialitzable, aquest test ho detecta.

@MainActor
final class HealthCheckTests: XCTestCase {

    // MARK: - Serialització

    func testWorkspaceSerialization_passa() {
        let result = HealthCheckService.checkWorkspaceSerialization()
        XCTAssertTrue(result.passed, "Fallida: \(result.detail)")
    }

    func testDiagnosticsSerialization_passa() {
        let result = HealthCheckService.checkDiagnosticsSerialization()
        XCTAssertTrue(result.passed, "Fallida: \(result.detail)")
    }

    func testErrorEntrySerialization_passa() {
        let result = HealthCheckService.checkErrorEntrySerialization()
        XCTAssertTrue(result.passed, "Fallida: \(result.detail)")
    }

    // MARK: - Execució completa

    func testRunAll_retornaResultatsPerTotesLesVerificacions() {
        let diag = DiagnosticsService()
        let results = HealthCheckService.runAll(diagnostics: diag)
        // Ha d'haver-hi almenys 3 verificacions (bundle config + 2 serialitzacions + dominis)
        XCTAssertGreaterThanOrEqual(results.count, 3)
    }

    func testRunAll_serialitzacionsPassenEnTests() {
        let diag = DiagnosticsService()
        let results = HealthCheckService.runAll(diagnostics: diag)
        // Les serialitzacions han de passar sempre (bundle config pot fallar en tests)
        let serializations = results.filter { $0.name.contains("Serialització") || $0.name.contains("Dominis") }
        for check in serializations {
            XCTAssertTrue(check.passed, "Fallida inesperada: \(check.name) — \(check.detail)")
        }
    }

    func testRunAll_errorsDeSerialtizacioEsRegistrenAlDiagnostic() {
        // Si una serialització falla, DiagnosticsService ha de registrar-ho
        // En condicions normals no hauria de passar, però verificem el flux
        let diag = DiagnosticsService()
        UserDefaults.standard.removeObject(forKey: "sutsumu.v3.diagnostics")

        let results = HealthCheckService.runAll(diagnostics: diag)
        let failedCount = results.filter { !$0.passed }.count
        XCTAssertEqual(diag.entries.count, failedCount,
                       "El nombre d'errors registrats ha de coincidir amb els checks fallits")
    }

    // MARK: - Models: SutsumuDocument

    func testSutsumuDocument_roundTrip() throws {
        var doc = SutsumuDocument()
        doc.title = "Test document"
        doc.content = "Contingut de prova"
        doc.tags = ["swift", "iOS"]
        doc.isPinned = true

        let data = try JSONEncoder().encode(doc)
        let decoded = try JSONDecoder().decode(SutsumuDocument.self, from: data)

        XCTAssertEqual(decoded.id, doc.id)
        XCTAssertEqual(decoded.title, doc.title)
        XCTAssertEqual(decoded.content, doc.content)
        XCTAssertEqual(decoded.tags, doc.tags)
        XCTAssertEqual(decoded.isPinned, doc.isPinned)
    }

    func testSutsumuFolder_roundTrip() throws {
        var folder = SutsumuFolder()
        folder.name = "Carpeta de prova"

        let data = try JSONEncoder().encode(folder)
        let decoded = try JSONDecoder().decode(SutsumuFolder.self, from: data)

        XCTAssertEqual(decoded.id, folder.id)
        XCTAssertEqual(decoded.name, folder.name)
    }

    func testSutsumuWorkspace_ambContingut_roundTrip() throws {
        var ws = SutsumuWorkspace()
        ws.documents.append(SutsumuDocument())
        ws.documents.append(SutsumuDocument())
        ws.folders.append(SutsumuFolder())

        let data = try JSONEncoder().encode(ws)
        let decoded = try JSONDecoder().decode(SutsumuWorkspace.self, from: data)

        XCTAssertEqual(decoded.documents.count, 2)
        XCTAssertEqual(decoded.folders.count, 1)
    }
}

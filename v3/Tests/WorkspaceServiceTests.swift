import XCTest
@testable import Sutsumu

// MARK: - WorkspaceServiceTests
// v3 — usa allDocuments/allFolders en lloc de workspace directament

@MainActor
final class WorkspaceServiceTests: XCTestCase {

    private let testKey = "sutsumu.v3.workspace"
    var service: WorkspaceService!

    override func setUp() async throws {
        UserDefaults.standard.removeObject(forKey: testKey)
        service = WorkspaceService()
    }

    override func tearDown() async throws {
        UserDefaults.standard.removeObject(forKey: testKey)
    }

    // MARK: - Creació

    func testCreateDocument_afegeixUnDocument() {
        service.createDocument()
        XCTAssertEqual(service.allDocuments.count, 1)
    }

    func testCreateDocument_seleccionaElNouDocument() {
        service.createDocument()
        XCTAssertNotNil(service.selectedDocumentId)
        XCTAssertNotNil(service.selectedDocument)
    }

    func testCreateDocument_enCarpeta_assignaParentId() {
        service.createFolder()
        let folderId = service.allFolders.first!.id
        service.createDocument(in: folderId)
        XCTAssertEqual(service.selectedDocument?.parentId, folderId)
    }

    func testCreateMultipleDocuments() {
        service.createDocument()
        service.createDocument()
        service.createDocument()
        XCTAssertEqual(service.filteredDocuments.count, 3)
    }

    // MARK: - Actualització

    func testUpdateDocument_modificaElTitol() {
        service.createDocument()
        var doc = service.selectedDocument!
        doc.title = "Títol de prova"
        service.updateDocument(doc)
        XCTAssertEqual(service.selectedDocument?.title, "Títol de prova")
    }

    func testUpdateDocument_actualitzaUpdatedAt() {
        service.createDocument()
        let doc = service.selectedDocument!
        let originalDate = doc.updatedAt
        var updated = doc
        updated.title = "Canvi"
        service.updateDocument(updated)
        XCTAssertGreaterThanOrEqual(service.selectedDocument!.updatedAt, originalDate)
    }

    func testUpdateDocument_noExistent_noFaRes() {
        var doc = SutsumuDocument()
        doc.title = "Fantasma"
        service.updateDocument(doc)
        XCTAssertEqual(service.allDocuments.count, 0)
    }

    // MARK: - Eliminació i restauració

    func testDeleteDocument_noApareixAFiltrats() {
        service.createDocument()
        let id = service.selectedDocumentId!
        service.deleteDocument(id)
        XCTAssertEqual(service.filteredDocuments.count, 0)
    }

    func testDeleteDocument_marcaComEliminat() {
        service.createDocument()
        let id = service.selectedDocumentId!
        service.deleteDocument(id)
        let deleted = service.allDocuments.first(where: { $0.id == id })
        XCTAssertEqual(deleted?.isDeleted, true)
    }

    func testDeleteDocument_desseleccionaSiEraSeleccionat() {
        service.createDocument()
        let id = service.selectedDocumentId!
        service.deleteDocument(id)
        XCTAssertNil(service.selectedDocumentId)
    }

    func testRestoreDocument_tornaASerVisible() {
        service.createDocument()
        let id = service.selectedDocumentId!
        service.deleteDocument(id)
        service.restoreDocument(id)
        XCTAssertEqual(service.filteredDocuments.count, 1)
        let restored = service.allDocuments.first(where: { $0.id == id })
        XCTAssertEqual(restored?.isDeleted, false)
    }

    // MARK: - Cerca i filtratge

    func testSearchByTitle() {
        service.createDocument()
        var doc = service.selectedDocument!
        doc.title = "Notes de reunió"
        service.updateDocument(doc)
        service.searchText = "reunió"
        XCTAssertEqual(service.filteredDocuments.count, 1)
    }

    func testSearchWithNoMatch_retornaLlistaBuida() {
        service.createDocument()
        service.searchText = "xyzabc123"
        XCTAssertEqual(service.filteredDocuments.count, 0)
    }

    func testSearchEmpty_retornaTots() {
        service.createDocument()
        service.createDocument()
        service.searchText = ""
        XCTAssertEqual(service.filteredDocuments.count, 2)
    }

    func testSearchByTag() {
        service.createDocument()
        var doc = service.selectedDocument!
        doc.tags = ["swift", "iOS"]
        service.updateDocument(doc)
        service.searchText = "swift"
        XCTAssertEqual(service.filteredDocuments.count, 1)
    }

    func testSearchByContent() {
        service.createDocument()
        var doc = service.selectedDocument!
        doc.content = "Contingut important del document"
        service.updateDocument(doc)
        service.searchText = "important"
        XCTAssertEqual(service.filteredDocuments.count, 1)
    }

    // MARK: - Persistència

    func testPersistenceAcrossInstances() {
        service.createDocument()
        var doc = service.selectedDocument!
        doc.title = "Document persistent"
        service.updateDocument(doc)
        let service2 = WorkspaceService()
        XCTAssertEqual(service2.allDocuments.first?.title, "Document persistent")
    }

    func testMultipleDocumentsPersistence() {
        service.createDocument()
        service.createDocument()
        let service2 = WorkspaceService()
        XCTAssertEqual(service2.allDocuments.count, 2)
    }

    func testDeletedDocumentPersistsAsDeleted() {
        service.createDocument()
        let id = service.selectedDocumentId!
        service.deleteDocument(id)
        let service2 = WorkspaceService()
        XCTAssertEqual(service2.filteredDocuments.count, 0)
        XCTAssertEqual(service2.allDocuments.count, 1)
        XCTAssertEqual(service2.allDocuments.first?.isDeleted, true)
    }

    // MARK: - Carpetes

    func testCreateFolder() {
        service.createFolder()
        XCTAssertEqual(service.allFolders.count, 1)
    }

    func testDeleteFolder_marcaComEliminada() {
        service.createFolder()
        let id = service.allFolders.first!.id
        service.deleteFolder(id)
        XCTAssertEqual(service.allFolders.first?.isDeleted, true)
    }

    // MARK: - Import / Export

    func testExportJSON_noEstaEnBuit() {
        service.createDocument()
        let json = service.exportJSON()
        XCTAssertFalse(json.isEmpty)
    }

    func testImportJSON_restauraWorkspace() throws {
        service.createDocument()
        var doc = service.selectedDocument!
        doc.title = "Import test"
        service.updateDocument(doc)
        let json = service.exportJSON()
        UserDefaults.standard.removeObject(forKey: testKey)
        let service2 = WorkspaceService()
        try service2.importJSON(json)
        XCTAssertEqual(service2.allDocuments.first?.title, "Import test")
    }
}

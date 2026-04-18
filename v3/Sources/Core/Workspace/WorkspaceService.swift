import Foundation
import SwiftUI

@MainActor
final class WorkspaceService: ObservableObject {
    @Published var workspace = SutsumuWorkspace()
    @Published var selectedDocumentId: String? = nil
    @Published var searchText = ""

    private let defaultsKey = "sutsumu.v3.workspace"
    private weak var authService: AuthService?
    private weak var syncService: SyncService?

    init() {
        load()
    }

    func setup(auth: AuthService, sync: SyncService) {
        self.authService = auth
        self.syncService = sync
    }

    // MARK: - Documents seleccionats

    var selectedDocument: SutsumuDocument? {
        guard let id = selectedDocumentId else { return nil }
        return workspace.documents.first { $0.id == id }
    }

    func selectDocument(_ id: String) {
        selectedDocumentId = id
    }

    // MARK: - CRUD Documents

    func createDocument(in parentId: String? = nil) {
        let doc = SutsumuDocument(parentId: parentId)
        workspace.documents.append(doc)
        selectedDocumentId = doc.id
        save()
        syncService?.scheduleSync()
    }

    func updateDocument(_ doc: SutsumuDocument) {
        guard let idx = workspace.documents.firstIndex(where: { $0.id == doc.id }) else { return }
        var updated = doc
        updated.updatedAt = .now
        workspace.documents[idx] = updated
        save()
        syncService?.scheduleSync()
    }

    func deleteDocument(_ id: String) {
        guard let idx = workspace.documents.firstIndex(where: { $0.id == id }) else { return }
        workspace.documents[idx].isDeleted = true
        if selectedDocumentId == id { selectedDocumentId = nil }
        save()
        syncService?.scheduleSync()
    }

    func restoreDocument(_ id: String) {
        guard let idx = workspace.documents.firstIndex(where: { $0.id == id }) else { return }
        workspace.documents[idx].isDeleted = false
        save()
        syncService?.scheduleSync()
    }

    // MARK: - CRUD Carpetes

    func createFolder(named name: String, in parentId: String? = nil) {
        let folder = SutsumuFolder(name: name.isEmpty ? "Nova carpeta" : name, parentId: parentId)
        workspace.folders.append(folder)
        save()
        syncService?.scheduleSync()
    }

    func renameFolder(_ id: String, name: String) {
        guard let idx = workspace.folders.firstIndex(where: { $0.id == id }) else { return }
        workspace.folders[idx].name = name.isEmpty ? "Nova carpeta" : name
        save()
        syncService?.scheduleSync()
    }

    func updateFolderColor(_ id: String, color: String) {
        guard let idx = workspace.folders.firstIndex(where: { $0.id == id }) else { return }
        workspace.folders[idx].color = color
        save()
        syncService?.scheduleSync()
    }

    func deleteFolder(_ id: String) {
        guard let idx = workspace.folders.firstIndex(where: { $0.id == id }) else { return }
        workspace.folders[idx].isDeleted = true
        save()
        syncService?.scheduleSync()
    }

    // MARK: - Moure documents i carpetes

    /// Mou un document a una carpeta (o a l'arrel si `parentId` és nil).
    func moveDocument(_ id: String, to parentId: String?) {
        guard let idx = workspace.documents.firstIndex(where: { $0.id == id }) else { return }
        guard workspace.documents[idx].parentId != parentId else { return }
        workspace.documents[idx].parentId = parentId
        workspace.documents[idx].updatedAt = .now
        save()
        syncService?.scheduleSync()
    }

    /// Mou una carpeta dins d'una altra (o a l'arrel si `parentId` és nil).
    /// Retorna `false` si el moviment crearia un cicle (moure-la dins seu
    /// mateix o dins d'un dels seus descendents) o la mateixa destinació.
    @discardableResult
    func moveFolder(_ id: String, to parentId: String?) -> Bool {
        guard let idx = workspace.folders.firstIndex(where: { $0.id == id }) else { return false }
        if workspace.folders[idx].parentId == parentId { return false }
        if let target = parentId {
            if target == id { return false }
            if descendants(ofFolder: id).contains(target) { return false }
        }
        workspace.folders[idx].parentId = parentId
        save()
        syncService?.scheduleSync()
        return true
    }

    /// Conjunt d'identificadors de totes les subcarpetes (directes i indirectes)
    /// d'una carpeta donada. Usat per prevenir cicles al moure.
    func descendants(ofFolder folderId: String) -> Set<String> {
        var result: Set<String> = []
        var stack: [String] = [folderId]
        while let current = stack.popLast() {
            for folder in workspace.folders where folder.parentId == current {
                if result.insert(folder.id).inserted {
                    stack.append(folder.id)
                }
            }
        }
        return result
    }

    // MARK: - Accessors (per tests i vistes externes)

    var allDocuments: [SutsumuDocument] { workspace.documents }
    var allFolders: [SutsumuFolder] { workspace.folders }

    // MARK: - Filtratge

    var filteredDocuments: [SutsumuDocument] {
        let active = workspace.activeDocuments
        if searchText.isEmpty { return active }
        let q = searchText.lowercased()
        return active.filter {
            $0.title.lowercased().contains(q) ||
            $0.content.lowercased().contains(q) ||
            $0.tags.contains { $0.lowercased().contains(q) }
        }
    }

    // MARK: - Persistència local

    func save() {
        guard let data = try? JSONEncoder().encode(workspace) else { return }
        UserDefaults.standard.set(data, forKey: defaultsKey)
    }

    func load() {
        guard
            let data = UserDefaults.standard.data(forKey: defaultsKey),
            let ws = try? JSONDecoder().decode(SutsumuWorkspace.self, from: data)
        else { return }
        workspace = ws
    }

    // MARK: - Import/Export

    func exportJSON() -> String {
        (try? String(data: JSONEncoder().encode(workspace), encoding: .utf8)) ?? ""
    }

    func importJSON(_ text: String) throws {
        guard let data = text.data(using: .utf8) else { throw SutsumuError.invalidResponse }
        workspace = try JSONDecoder().decode(SutsumuWorkspace.self, from: data)
        save()
    }

    // MARK: - Aplicar workspace remot

    func applyRemote(_ ws: SutsumuWorkspace) {
        workspace = ws
        save()
    }
}

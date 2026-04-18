import Foundation

// MARK: - Document

struct SutsumuDocument: Identifiable, Codable, Equatable {
    var id: String
    var title: String
    var content: String
    var category: String
    var tags: [String]
    var parentId: String?
    var isPinned: Bool
    var isFavorite: Bool
    var isDeleted: Bool
    var createdAt: Date
    var updatedAt: Date
    var attachments: [SutsumuAttachment]

    init(
        id: String = UUID().uuidString,
        title: String = "Sense títol",
        content: String = "",
        category: String = "",
        tags: [String] = [],
        parentId: String? = nil,
        isPinned: Bool = false,
        isFavorite: Bool = false,
        isDeleted: Bool = false,
        createdAt: Date = .now,
        updatedAt: Date = .now,
        attachments: [SutsumuAttachment] = []
    ) {
        self.id = id
        self.title = title
        self.content = content
        self.category = category
        self.tags = tags
        self.parentId = parentId
        self.isPinned = isPinned
        self.isFavorite = isFavorite
        self.isDeleted = isDeleted
        self.createdAt = createdAt
        self.updatedAt = updatedAt
        self.attachments = attachments
    }

    // Decoder personalitzat: `attachments` és opcional per compatibilitat
    // amb documents guardats abans d'afegir el camp.
    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        id         = try c.decode(String.self,              forKey: .id)
        title      = try c.decode(String.self,              forKey: .title)
        content    = try c.decode(String.self,              forKey: .content)
        category   = try c.decode(String.self,              forKey: .category)
        tags       = try c.decode([String].self,            forKey: .tags)
        parentId   = try c.decodeIfPresent(String.self,     forKey: .parentId)
        isPinned   = try c.decode(Bool.self,                forKey: .isPinned)
        isFavorite = try c.decode(Bool.self,                forKey: .isFavorite)
        isDeleted  = try c.decode(Bool.self,                forKey: .isDeleted)
        createdAt  = try c.decode(Date.self,                forKey: .createdAt)
        updatedAt  = try c.decode(Date.self,                forKey: .updatedAt)
        // Clau nova: si no existeix en dades antigues, retorna array buit
        attachments = (try? c.decode([SutsumuAttachment].self, forKey: .attachments)) ?? []
    }
}

// MARK: - Folder

struct SutsumuFolder: Identifiable, Codable, Equatable {
    var id: String
    var name: String
    var color: String
    var parentId: String?
    var isDeleted: Bool
    var createdAt: Date

    init(
        id: String = UUID().uuidString,
        name: String = "Nova carpeta",
        color: String = "#5B7FD4",
        parentId: String? = nil,
        isDeleted: Bool = false,
        createdAt: Date = .now
    ) {
        self.id = id
        self.name = name
        self.color = color
        self.parentId = parentId
        self.isDeleted = isDeleted
        self.createdAt = createdAt
    }

    // Decoder compatible amb dades antigues que no tenien el camp `color`
    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        id        = try c.decode(String.self,          forKey: .id)
        name      = try c.decode(String.self,          forKey: .name)
        color     = (try? c.decode(String.self,        forKey: .color)) ?? "#5B7FD4"
        parentId  = try c.decodeIfPresent(String.self, forKey: .parentId)
        isDeleted = try c.decode(Bool.self,            forKey: .isDeleted)
        createdAt = try c.decode(Date.self,            forKey: .createdAt)
    }
}

// MARK: - Workspace

struct SutsumuWorkspace: Codable, Equatable {
    var id: String
    var name: String
    var documents: [SutsumuDocument]
    var folders: [SutsumuFolder]

    init(
        id: String = UUID().uuidString,
        name: String = "",
        documents: [SutsumuDocument] = [],
        folders: [SutsumuFolder] = []
    ) {
        self.id = id
        self.name = name
        self.documents = documents
        self.folders = folders
    }

    var activeDocuments: [SutsumuDocument] {
        documents.filter { !$0.isDeleted }
    }

    var activeFolders: [SutsumuFolder] {
        folders.filter { !$0.isDeleted }
    }

    var deletedItems: [SutsumuDocument] {
        documents.filter { $0.isDeleted }
    }
}

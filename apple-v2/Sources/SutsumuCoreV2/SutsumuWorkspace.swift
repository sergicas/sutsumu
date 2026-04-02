import Foundation

public enum SutsumuWorkspaceItemType: String, Codable, CaseIterable, Sendable {
    case folder
    case document
}

public struct SutsumuWorkspaceVersion: Codable, Equatable, Sendable, Identifiable {
    public var id: String
    public var createdAt: String
    public var title: String
    public var category: String
    public var tags: [String]
    public var content: String
    public var reason: String

    public init(
        id: String,
        createdAt: String,
        title: String,
        category: String = "",
        tags: [String] = [],
        content: String = "",
        reason: String = "manual-save"
    ) {
        self.id = id.trimmingCharacters(in: .whitespacesAndNewlines)
        self.createdAt = createdAt
        self.title = title
        self.category = category
        self.tags = Self.normalizeTags(tags)
        self.content = content
        self.reason = reason
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = Self.normalizedIdentifier(
            try container.decodeIfPresent(String.self, forKey: .id),
            prefix: "version"
        )
        createdAt = try container.decodeIfPresent(String.self, forKey: .createdAt) ?? Self.nowString
        title = try container.decodeIfPresent(String.self, forKey: .title) ?? "Versio"
        category = try container.decodeIfPresent(String.self, forKey: .category) ?? ""
        tags = Self.normalizeTags(try container.decodeIfPresent([String].self, forKey: .tags) ?? [])
        content = try container.decodeIfPresent(String.self, forKey: .content) ?? ""
        reason = try container.decodeIfPresent(String.self, forKey: .reason) ?? "manual-save"
    }

    private static var nowString: String {
        ISO8601DateFormatter().string(from: .now)
    }

    private static func normalizedIdentifier(_ candidate: String?, prefix: String) -> String {
        let trimmed = candidate?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        if !trimmed.isEmpty {
            return trimmed
        }
        return Self.makeIdentifier(prefix: prefix)
    }

    private static func normalizeTags(_ tags: [String]) -> [String] {
        var seen = Set<String>()
        return tags
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }
            .filter { seen.insert($0.lowercased()).inserted }
    }

    private static func makeIdentifier(prefix: String) -> String {
        "\(prefix)-\(UUID().uuidString.lowercased())"
    }
}

public struct SutsumuWorkspaceAttachment: Codable, Equatable, Sendable {
    public var fileName: String
    public var fileType: String
    public var fileSize: Int
    public var sourceFormat: String
    public var checksum: String?
    public var remoteObjectKey: String?
    public var availability: String

    public init(
        fileName: String = "",
        fileType: String = "",
        fileSize: Int = 0,
        sourceFormat: String = "",
        checksum: String? = nil,
        remoteObjectKey: String? = nil,
        availability: String = "local-pending-upload"
    ) {
        self.fileName = fileName
        self.fileType = fileType
        self.fileSize = max(fileSize, 0)
        self.sourceFormat = sourceFormat
        self.checksum = checksum
        self.remoteObjectKey = remoteObjectKey
        self.availability = availability
    }

    public var hasMeaningfulData: Bool {
        !fileName.isEmpty || !fileType.isEmpty || fileSize > 0 || !sourceFormat.isEmpty || !(checksum ?? "").isEmpty || !(remoteObjectKey ?? "").isEmpty
    }
}

public struct SutsumuWorkspaceItem: Codable, Equatable, Sendable, Identifiable {
    public var id: String
    public var type: SutsumuWorkspaceItemType
    public var parentId: String
    public var title: String
    public var tags: [String]
    public var timestamp: String
    public var isDeleted: Bool
    public var isFavorite: Bool
    public var isPinned: Bool
    public var desc: String
    public var color: String
    public var category: String
    public var content: String
    public var versions: [SutsumuWorkspaceVersion]
    public var attachment: SutsumuWorkspaceAttachment?

    public init(
        id: String,
        type: SutsumuWorkspaceItemType,
        parentId: String = "root",
        title: String,
        tags: [String] = [],
        timestamp: String = ISO8601DateFormatter().string(from: .now),
        isDeleted: Bool = false,
        isFavorite: Bool = false,
        isPinned: Bool = false,
        desc: String = "",
        color: String = "#0ea5e9",
        category: String = "",
        content: String = "",
        versions: [SutsumuWorkspaceVersion] = [],
        attachment: SutsumuWorkspaceAttachment? = nil
    ) {
        self.id = id.trimmingCharacters(in: .whitespacesAndNewlines)
        self.type = type
        self.parentId = parentId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? "root" : parentId
        self.title = title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? Self.defaultTitle(for: type) : title
        self.tags = Self.normalizeTags(tags)
        self.timestamp = timestamp
        self.isDeleted = isDeleted
        self.isFavorite = isFavorite
        self.isPinned = isPinned
        self.desc = desc
        self.color = color.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? "#0ea5e9" : color
        self.category = category
        self.content = content
        self.versions = versions
        self.attachment = attachment?.hasMeaningfulData == true ? attachment : nil
        normalizeForType()
    }

    public static func folder(
        id: String = "folder-\(UUID().uuidString.lowercased())",
        parentId: String = "root",
        title: String,
        desc: String = "",
        color: String = "#0ea5e9",
        tags: [String] = []
    ) -> SutsumuWorkspaceItem {
        SutsumuWorkspaceItem(
            id: id,
            type: .folder,
            parentId: parentId,
            title: title,
            tags: tags,
            desc: desc,
            color: color
        )
    }

    public static func document(
        id: String = "document-\(UUID().uuidString.lowercased())",
        parentId: String = "root",
        title: String,
        category: String = "",
        content: String = "",
        tags: [String] = [],
        versions: [SutsumuWorkspaceVersion] = [],
        attachment: SutsumuWorkspaceAttachment? = nil
    ) -> SutsumuWorkspaceItem {
        SutsumuWorkspaceItem(
            id: id,
            type: .document,
            parentId: parentId,
            title: title,
            tags: tags,
            category: category,
            content: content,
            versions: versions,
            attachment: attachment
        )
    }

    public var isFolder: Bool { type == .folder }
    public var isDocument: Bool { type == .document }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        type = try container.decodeIfPresent(SutsumuWorkspaceItemType.self, forKey: .type) ?? .document
        id = Self.normalizedIdentifier(
            try container.decodeIfPresent(String.self, forKey: .id),
            prefix: type.rawValue
        )
        let rawParentId = try container.decodeIfPresent(String.self, forKey: .parentId)
        let rawTitle = try container.decodeIfPresent(String.self, forKey: .title)
        let rawColor = try container.decodeIfPresent(String.self, forKey: .color)

        parentId = rawParentId?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false
            ? (rawParentId ?? "root")
            : "root"
        title = rawTitle?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false
            ? (rawTitle ?? Self.defaultTitle(for: type))
            : Self.defaultTitle(for: type)
        tags = Self.normalizeTags(try container.decodeIfPresent([String].self, forKey: .tags) ?? [])
        timestamp = try container.decodeIfPresent(String.self, forKey: .timestamp) ?? Self.nowString
        isDeleted = try container.decodeIfPresent(Bool.self, forKey: .isDeleted) ?? false
        isFavorite = try container.decodeIfPresent(Bool.self, forKey: .isFavorite) ?? false
        isPinned = try container.decodeIfPresent(Bool.self, forKey: .isPinned) ?? false
        desc = try container.decodeIfPresent(String.self, forKey: .desc) ?? ""
        color = rawColor?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false
            ? (rawColor ?? "#0ea5e9")
            : "#0ea5e9"
        category = try container.decodeIfPresent(String.self, forKey: .category) ?? ""
        content = try container.decodeIfPresent(String.self, forKey: .content) ?? ""
        versions = try container.decodeIfPresent([SutsumuWorkspaceVersion].self, forKey: .versions) ?? []
        attachment = try container.decodeIfPresent(SutsumuWorkspaceAttachment.self, forKey: .attachment)
        normalizeForType()
    }

    public mutating func normalizeForType() {
        tags = Self.normalizeTags(tags)
        if type == .folder {
            category = ""
            content = ""
            versions = []
            attachment = nil
            if color.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
                color = "#0ea5e9"
            }
        } else {
            desc = ""
            color = "#0ea5e9"
            if let attachment, !attachment.hasMeaningfulData {
                self.attachment = nil
            }
        }
    }

    private static func defaultTitle(for type: SutsumuWorkspaceItemType) -> String {
        type == .folder ? "Nova carpeta" : "Nou document"
    }

    private static var nowString: String {
        ISO8601DateFormatter().string(from: .now)
    }

    private static func normalizedIdentifier(_ candidate: String?, prefix: String) -> String {
        let trimmed = candidate?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        if !trimmed.isEmpty {
            return trimmed
        }
        return Self.makeIdentifier(prefix: prefix)
    }

    private static func normalizeTags(_ tags: [String]) -> [String] {
        var seen = Set<String>()
        return tags
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }
            .filter { seen.insert($0.lowercased()).inserted }
    }

    private static func makeIdentifier(prefix: String) -> String {
        "\(prefix)-\(UUID().uuidString.lowercased())"
    }
}

public struct SutsumuWorkspaceOutlineRow: Equatable, Sendable, Identifiable {
    public var id: String
    public var title: String
    public var parentId: String
    public var depth: Int
    public var type: SutsumuWorkspaceItemType
    public var isFavorite: Bool
    public var isPinned: Bool

    public var symbol: String {
        type == .folder ? "Folder" : "Doc"
    }
}

public struct SutsumuWorkspaceStatistics: Equatable, Sendable {
    public var folders: Int
    public var documents: Int
    public var deleted: Int
    public var versions: Int
}

public struct SutsumuWorkspace: Codable, Equatable, Sendable {
    public var docs: [SutsumuWorkspaceItem]
    public var expandedFolders: [String]
    public var meta: [String: JSONValue]

    public init(
        docs: [SutsumuWorkspaceItem] = [],
        expandedFolders: [String] = [],
        meta: [String: JSONValue] = ["source": .string("Sutsumu Apple v2")]
    ) {
        self.docs = docs
        self.expandedFolders = expandedFolders
        self.meta = meta
        normalizeInPlace()
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        docs = try container.decodeIfPresent([SutsumuWorkspaceItem].self, forKey: .docs) ?? []
        expandedFolders = try container.decodeIfPresent([String].self, forKey: .expandedFolders) ?? []
        meta = try container.decodeIfPresent([String: JSONValue].self, forKey: .meta) ?? ["source": .string("Sutsumu Apple v2")]
        normalizeInPlace()
    }

    public init(payloadJSON: JSONValue) throws {
        self = try JSONDecoder().decode(SutsumuWorkspace.self, from: payloadJSON.canonicalData())
        normalizeInPlace()
    }

    public static var empty: SutsumuWorkspace {
        SutsumuWorkspace()
    }

    public var statistics: SutsumuWorkspaceStatistics {
        let active = docs.filter { !$0.isDeleted }
        return SutsumuWorkspaceStatistics(
            folders: active.filter(\.isFolder).count,
            documents: active.filter(\.isDocument).count,
            deleted: docs.filter(\.isDeleted).count,
            versions: active.reduce(0) { $0 + $1.versions.count }
        )
    }

    public func payloadJSON() throws -> JSONValue {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys]
        let data = try encoder.encode(self)
        return try JSONDecoder().decode(JSONValue.self, from: data)
    }

    public func item(id: String?) -> SutsumuWorkspaceItem? {
        guard let id else { return nil }
        return docs.first { $0.id == id }
    }

    public func children(of parentId: String = "root", includeDeleted: Bool = false) -> [SutsumuWorkspaceItem] {
        docs
            .filter { item in
                item.parentId == parentId && (includeDeleted || !item.isDeleted)
            }
            .sorted(by: Self.sortItems)
    }

    public func outlineRows(includeDeleted: Bool = false) -> [SutsumuWorkspaceOutlineRow] {
        buildOutlineRows(parentId: "root", depth: 0, includeDeleted: includeDeleted)
    }

    public mutating func createFolder(title: String, parentId: String = "root") -> SutsumuWorkspaceItem {
        let item = SutsumuWorkspaceItem.folder(parentId: normalizedParentId(parentId), title: title)
        docs.append(item)
        normalizeInPlace()
        return item
    }

    public mutating func createDocument(
        title: String,
        parentId: String = "root",
        content: String = ""
    ) -> SutsumuWorkspaceItem {
        let item = SutsumuWorkspaceItem.document(
            parentId: normalizedParentId(parentId),
            title: title,
            content: content
        )
        docs.append(item)
        normalizeInPlace()
        return item
    }

    @discardableResult
    public mutating func updateItem(id: String, mutate: (inout SutsumuWorkspaceItem) -> Void) -> Bool {
        guard let index = docs.firstIndex(where: { $0.id == id }) else { return false }
        mutate(&docs[index])
        docs[index].normalizeForType()
        normalizeInPlace()
        return true
    }

    @discardableResult
    public mutating func markDeleted(id: String) -> Bool {
        guard let item = item(id: id) else { return false }
        let idsToDelete = [item.id] + descendantIDs(of: item.id)
        for targetID in idsToDelete {
            guard let index = docs.firstIndex(where: { $0.id == targetID }) else { continue }
            docs[index].isDeleted = true
        }
        expandedFolders.removeAll { idsToDelete.contains($0) }
        normalizeInPlace()
        return true
    }

    /// Moves `id` to a new parent. Returns false if the move would create a cycle or is otherwise invalid.
    @discardableResult
    public mutating func moveItem(id: String, toParentId: String) -> Bool {
        guard isValidParent(toParentId, for: id) else { return false }
        return updateItem(id: id) { item in
            item.parentId = toParentId
        }
    }

    public mutating func ensureExpanded(folderId: String) {
        guard item(id: folderId)?.isFolder == true else { return }
        if !expandedFolders.contains(folderId) {
            expandedFolders.append(folderId)
        }
        normalizeInPlace()
    }

    public func suggestedParentId(for selectedItemId: String?) -> String {
        guard let selected = item(id: selectedItemId), !selected.isDeleted else {
            return "root"
        }
        return selected.isFolder ? selected.id : selected.parentId
    }

    public func isValidParent(_ parentId: String, for itemId: String) -> Bool {
        if parentId == "root" { return true }
        guard let parent = item(id: parentId), parent.isFolder else { return false }
        if parent.id == itemId { return false }
        return !descendantIDs(of: itemId).contains(parentId)
    }

    public func deletionScopeIDs(for id: String) -> [String] {
        guard item(id: id) != nil else { return [] }
        return [id] + descendantIDs(of: id)
    }

    private mutating func normalizeInPlace() {
        var seen = Set<String>()
        docs = docs.map { item in
            var normalized = item
            normalized.id = Self.uniqueIdentifier(for: normalized.id, prefix: normalized.type.rawValue, seen: &seen)
            normalized.parentId = normalized.parentId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? "root" : normalized.parentId
            normalized.title = normalized.title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
                ? (normalized.isFolder ? "Nova carpeta" : "Nou document")
                : normalized.title.trimmingCharacters(in: .whitespacesAndNewlines)
            if normalized.timestamp.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
                normalized.timestamp = ISO8601DateFormatter().string(from: .now)
            }
            normalized.normalizeForType()
            return normalized
        }

        let validFolderIDs = Set(docs.filter { $0.isFolder && !$0.isDeleted }.map(\.id))
        docs = docs.map { item in
            var normalized = item
            if normalized.parentId != "root" {
                let parentIsValid = validFolderIDs.contains(normalized.parentId) && normalized.parentId != normalized.id
                if !parentIsValid {
                    normalized.parentId = "root"
                }
            }
            return normalized
        }

        var seenExpanded = Set<String>()
        expandedFolders = expandedFolders
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { validFolderIDs.contains($0) }
            .filter { seenExpanded.insert($0).inserted }

        if meta.isEmpty {
            meta = ["source": .string("Sutsumu Apple v2")]
        }
    }

    private func normalizedParentId(_ candidate: String) -> String {
        let trimmed = candidate.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmed == "root" || trimmed.isEmpty {
            return "root"
        }
        guard let parent = item(id: trimmed), parent.isFolder, !parent.isDeleted else {
            return "root"
        }
        return trimmed
    }

    private func descendantIDs(of parentId: String) -> [String] {
        var collected: [String] = []
        let childIDs = docs.filter { $0.parentId == parentId }.map(\.id)
        for childID in childIDs {
            collected.append(childID)
            collected.append(contentsOf: descendantIDs(of: childID))
        }
        return collected
    }

    private func buildOutlineRows(parentId: String, depth: Int, includeDeleted: Bool) -> [SutsumuWorkspaceOutlineRow] {
        var rows: [SutsumuWorkspaceOutlineRow] = []
        for item in children(of: parentId, includeDeleted: includeDeleted) {
            rows.append(
                SutsumuWorkspaceOutlineRow(
                    id: item.id,
                    title: item.title,
                    parentId: item.parentId,
                    depth: depth,
                    type: item.type,
                    isFavorite: item.isFavorite,
                    isPinned: item.isPinned
                )
            )
            if item.isFolder {
                rows.append(contentsOf: buildOutlineRows(parentId: item.id, depth: depth + 1, includeDeleted: includeDeleted))
            }
        }
        return rows
    }

    private static func uniqueIdentifier(for candidate: String, prefix: String, seen: inout Set<String>) -> String {
        let trimmed = candidate.trimmingCharacters(in: .whitespacesAndNewlines)
        if !trimmed.isEmpty && seen.insert(trimmed).inserted {
            return trimmed
        }

        while true {
            let generated = "\(prefix)-\(UUID().uuidString.lowercased())"
            if seen.insert(generated).inserted {
                return generated
            }
        }
    }

    private static func sortItems(lhs: SutsumuWorkspaceItem, rhs: SutsumuWorkspaceItem) -> Bool {
        if lhs.isFolder != rhs.isFolder {
            return lhs.isFolder && rhs.isDocument
        }
        let compare = lhs.title.localizedCaseInsensitiveCompare(rhs.title)
        if compare != .orderedSame {
            return compare == .orderedAscending
        }
        return lhs.timestamp < rhs.timestamp
    }
}

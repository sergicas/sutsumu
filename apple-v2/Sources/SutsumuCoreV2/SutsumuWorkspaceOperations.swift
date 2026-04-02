import Foundation

public enum SutsumuWorkspaceOperationKind: String, Codable, Sendable, CaseIterable {
    case upsertItem = "upsert_item"
    case deleteItems = "delete_items"
}

public struct SutsumuWorkspaceOperation: Codable, Equatable, Sendable, Identifiable {
    public var id: String
    public var kind: SutsumuWorkspaceOperationKind
    public var createdAt: String
    public var item: SutsumuWorkspaceItem?
    public var itemIds: [String]
    public var summary: String

    public init(
        id: String = "op-\(UUID().uuidString.lowercased())",
        kind: SutsumuWorkspaceOperationKind,
        createdAt: String = ISO8601DateFormatter().string(from: .now),
        item: SutsumuWorkspaceItem? = nil,
        itemIds: [String] = [],
        summary: String = ""
    ) {
        self.id = id
        self.kind = kind
        self.createdAt = createdAt
        self.item = item
        self.itemIds = Self.normalizeIdentifiers(itemIds)
        self.summary = summary
    }

    public static func upsert(item: SutsumuWorkspaceItem, summary: String = "") -> SutsumuWorkspaceOperation {
        SutsumuWorkspaceOperation(
            kind: .upsertItem,
            item: item,
            summary: summary.isEmpty ? "upsert:\(item.id)" : summary
        )
    }

    public static func delete(itemIDs: [String], summary: String = "") -> SutsumuWorkspaceOperation {
        let normalized = Self.normalizeIdentifiers(itemIDs)
        return SutsumuWorkspaceOperation(
            kind: .deleteItems,
            itemIds: normalized,
            summary: summary.isEmpty
                ? "delete:\(normalized.joined(separator: ","))"
                : summary
        )
    }

    public var affectedItemIDs: [String] {
        switch kind {
        case .upsertItem:
            if let item {
                return [item.id]
            }
            return []
        case .deleteItems:
            return itemIds
        }
    }

    private static func normalizeIdentifiers(_ values: [String]) -> [String] {
        var seen = Set<String>()
        return values
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }
            .filter { seen.insert($0).inserted }
    }
}

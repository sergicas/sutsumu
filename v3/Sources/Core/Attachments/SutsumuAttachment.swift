import Foundation

// MARK: - SutsumuAttachment

struct SutsumuAttachment: Identifiable, Codable, Equatable {
    var id: String
    var documentId: String
    var filename: String
    var mimeType: String
    var size: Int           // bytes
    var storagePath: String // ruta a Supabase Storage
    var createdAt: Date

    init(
        id: String = UUID().uuidString,
        documentId: String,
        filename: String,
        mimeType: String,
        size: Int,
        storagePath: String,
        createdAt: Date = .now
    ) {
        self.id = id
        self.documentId = documentId
        self.filename = filename
        self.mimeType = mimeType
        self.size = size
        self.storagePath = storagePath
        self.createdAt = createdAt
    }

    // MARK: - Helpers de presentació

    var displaySize: String {
        let f = ByteCountFormatter()
        f.allowedUnits = [.useKB, .useMB]
        f.countStyle = .file
        return f.string(fromByteCount: Int64(size))
    }

    var sfSymbol: String {
        switch mimeType {
        case "application/pdf":
            return "doc.richtext.fill"
        case let m where m.contains("word") || m.contains("document"):
            return "doc.text.fill"
        case let m where m.hasPrefix("image/"):
            return "photo.fill"
        default:
            return "paperclip"
        }
    }

    var isPDF: Bool   { mimeType == "application/pdf" }
    var isDOCX: Bool  { mimeType.contains("word") || mimeType.contains("document") }
    var isImage: Bool { mimeType.hasPrefix("image/") }
}

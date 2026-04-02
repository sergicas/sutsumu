import SwiftUI
import UniformTypeIdentifiers

struct WorkspaceTextDocument: FileDocument {
    static let readableContentTypes: [UTType] = [.json]

    var text: String

    init(text: String = "") {
        self.text = text
    }

    init(configuration: ReadConfiguration) throws {
        guard
            let data = configuration.file.regularFileContents,
            let text = String(data: data, encoding: .utf8)
        else {
            throw WorkspaceTextDocumentError.invalidEncoding
        }

        self.text = text
    }

    func fileWrapper(configuration: WriteConfiguration) throws -> FileWrapper {
        FileWrapper(regularFileWithContents: Data(text.utf8))
    }
}

enum WorkspaceTextDocumentError: LocalizedError {
    case invalidEncoding

    var errorDescription: String? {
        switch self {
        case .invalidEncoding:
            return "No he pogut llegir el document local com a UTF-8."
        }
    }
}

import Foundation

// MARK: - ErrorEntry

/// Registre d'un error capturat per l'app.
/// Persistit a UserDefaults per poder ajustar el comportament en futures execucions.
struct ErrorEntry: Codable, Identifiable {
    let id: String
    let timestamp: Date
    let domain: ErrorDomain
    let code: String
    let message: String

    init(domain: ErrorDomain, error: Error) {
        self.id = UUID().uuidString
        self.timestamp = .now
        self.domain = domain
        self.code = String(describing: type(of: error))
        self.message = error.localizedDescription
    }

    // MARK: - Domini

    enum ErrorDomain: String, Codable, CaseIterable {
        case auth      = "Auth"
        case sync      = "Sync"
        case workspace = "Workspace"
        case decode    = "Decode"
        case unknown   = "Desconegut"

        var icon: String {
            switch self {
            case .auth:      return "person.crop.circle.badge.exclamationmark"
            case .sync:      return "arrow.triangle.2.circlepath"
            case .workspace: return "folder.badge.minus"
            case .decode:    return "doc.badge.exclamationmark"
            case .unknown:   return "questionmark.circle"
            }
        }
    }
}

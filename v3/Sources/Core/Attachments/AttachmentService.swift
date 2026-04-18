import Foundation
import SwiftUI

// MARK: - AttachmentService
//
// Gestiona els adjunts: emmagatzematge local (Documents/attachments/)
// i sincronització amb Supabase Storage.

@MainActor
final class AttachmentService: ObservableObject {

    @Published private(set) var isUploading = false
    @Published var errorMessage = ""

    private weak var authService: AuthService?
    private weak var workspaceService: WorkspaceService?

    func setup(auth: AuthService, workspace: WorkspaceService) {
        self.authService = auth
        self.workspaceService = workspace
    }

    // MARK: - Upload

    func addAttachment(data: Data, filename: String, mimeType: String, to document: SutsumuDocument) async {
        // Neteja l'error anterior perquè no quedi visible una fallada antiga.
        errorMessage = ""

        guard let auth = authService else {
            errorMessage = "Servei d'autenticació no disponible."
            return
        }

        guard !auth.userId.isEmpty else {
            errorMessage = "Sessió no vàlida. Torna a iniciar sessió."
            return
        }

        let attachment = SutsumuAttachment(
            documentId: document.id,
            filename: filename,
            mimeType: mimeType,
            size: data.count,
            storagePath: "\(auth.userId)/\(document.id)/\(UUID().uuidString)_\(Self.sanitize(filename))"
        )

        // 1. Desa localment
        do {
            try saveLocally(data: data, attachment: attachment)
        } catch {
            errorMessage = "Error desant el fitxer: \(error.localizedDescription)"
            return
        }

        // 2. Afegeix al document
        var updated = document
        updated.attachments.append(attachment)
        workspaceService?.updateDocument(updated)

        // 3. Puja a Supabase (best effort)
        isUploading = true
        defer { isUploading = false }

        guard let client = makeStorageClient(auth: auth) else {
            errorMessage = "Configuració de Supabase incompleta (Info.plist)."
            return
        }
        do {
            try await client.upload(data: data, path: attachment.storagePath, mimeType: mimeType)
        } catch {
            errorMessage = "Error pujant al servidor: \(error.localizedDescription)"
        }
    }

    // MARK: - Delete

    func removeAttachment(_ attachment: SutsumuAttachment, from document: SutsumuDocument) async {
        // 1. Elimina del document
        var updated = document
        updated.attachments.removeAll { $0.id == attachment.id }
        workspaceService?.updateDocument(updated)

        // 2. Elimina localment
        deleteLocally(attachment: attachment)

        // 3. Elimina del servidor (best effort)
        if let auth = authService, let client = makeStorageClient(auth: auth) {
            try? await client.delete(path: attachment.storagePath)
        }
    }

    // MARK: - Obrir / Baixar

    /// Retorna l'URL local del fitxer (baixant-lo si cal).
    func localURL(for attachment: SutsumuAttachment) async throws -> URL {
        let cached = cachedURL(for: attachment)
        if FileManager.default.fileExists(atPath: cached.path) { return cached }

        guard let auth = authService, let client = makeStorageClient(auth: auth) else {
            throw SutsumuError.missingKey
        }

        let data = try await client.download(path: attachment.storagePath)
        try data.write(to: cached)
        return cached
    }

    /// URL local sense descarregar (nil si no existeix en caché).
    func cachedURL(for attachment: SutsumuAttachment) -> URL {
        attachmentsDirectory().appending(path: attachment.id + "_" + attachment.filename)
    }

    func isCached(_ attachment: SutsumuAttachment) -> Bool {
        FileManager.default.fileExists(atPath: cachedURL(for: attachment).path)
    }

    // MARK: - Helpers de sistema de fitxers

    private func attachmentsDirectory() -> URL {
        let docs = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
        let dir = docs.appending(path: "sutsumu_attachments")
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        return dir
    }

    private func saveLocally(data: Data, attachment: SutsumuAttachment) throws {
        let url = attachmentsDirectory().appending(path: attachment.id + "_" + attachment.filename)
        try data.write(to: url, options: .atomic)
    }

    private func deleteLocally(attachment: SutsumuAttachment) {
        let url = attachmentsDirectory().appending(path: attachment.id + "_" + attachment.filename)
        try? FileManager.default.removeItem(at: url)
    }

    // MARK: - Sanitització de noms de fitxer

    /// Converteix un nom de fitxer en una clau vàlida per a Supabase Storage:
    /// 1) normalitza i treu accents/diacrítics (à→a, ñ→n, ç→c, ü→u…)
    /// 2) substitueix qualsevol caràcter que no sigui ASCII alfanumèric
    ///    (o `-`, `_`, `.`) per un guió baix
    /// Supabase Storage rebutja claus amb caràcters no ASCII.
    private static func sanitize(_ filename: String) -> String {
        let folded = filename.folding(
            options: [.diacriticInsensitive, .widthInsensitive],
            locale: Locale(identifier: "en_US_POSIX")
        )
        let allowed = CharacterSet(charactersIn:
            "abcdefghijklmnopqrstuvwxyz" +
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
            "0123456789-_."
        )
        let cleaned = folded.unicodeScalars
            .map { allowed.contains($0) ? String($0) : "_" }
            .joined()
        // Evita noms buits o amb només punts/guions, que també poden donar error.
        return cleaned.isEmpty ? "file" : cleaned
    }

    // MARK: - Client Storage

    private func makeStorageClient(auth: AuthService) -> SutsumuStorageClient? {
        let projectURL = Bundle.main.object(forInfoDictionaryKey: "SutsumuDefaultProjectURL") as? String ?? ""
        let anonKey   = Bundle.main.object(forInfoDictionaryKey: "SutsumuDefaultAnonKey") as? String ?? ""
        guard let url = URL(string: projectURL), !projectURL.isEmpty, !anonKey.isEmpty else { return nil }
        return SutsumuStorageClient(projectURL: url, anonKey: anonKey, sessionToken: auth.sessionToken)
    }
}

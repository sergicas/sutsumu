import Foundation

// MARK: - SutsumuStorageClient
//
// Accedeix a Supabase Storage per pujar, baixar i eliminar adjunts.
// Bucket: sutsumu-attachments  (crea'l a Supabase Dashboard → Storage → New bucket)
// Ruta dels fitxers: {userId}/{documentId}/{attachmentId}_{filename}

actor SutsumuStorageClient {

    private let projectURL: URL
    private let anonKey: String
    private let sessionToken: String
    private let bucket = "sutsumu-attachments"

    static let urlSession: URLSession = {
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = 30
        config.timeoutIntervalForResource = 120
        return URLSession(configuration: config)
    }()

    init(projectURL: URL, anonKey: String, sessionToken: String) {
        self.projectURL = projectURL
        self.anonKey = anonKey
        self.sessionToken = sessionToken
    }

    private func objectURL(path: String) -> URL {
        projectURL
            .appending(path: "storage")
            .appending(path: "v1")
            .appending(path: "object")
            .appending(path: bucket)
            .appending(path: path)
    }

    // MARK: - Upload

    func upload(data: Data, path: String, mimeType: String) async throws {
        let url = objectURL(path: path)
        var req = URLRequest(url: url)
        req.httpMethod = "POST"
        req.setValue(mimeType, forHTTPHeaderField: "Content-Type")
        req.setValue("Bearer \(sessionToken)", forHTTPHeaderField: "Authorization")
        req.setValue(anonKey, forHTTPHeaderField: "apikey")
        // Permet sobreescriure si el fitxer ja existeix al bucket
        req.setValue("true", forHTTPHeaderField: "x-upsert")
        req.httpBody = data

        let (body, response) = try await SutsumuStorageClient.urlSession.data(for: req)
        try Self.validate(response: response, body: body)
    }

    // MARK: - Download

    func download(path: String) async throws -> Data {
        let url = objectURL(path: path)
        var req = URLRequest(url: url)
        req.httpMethod = "GET"
        req.setValue("Bearer \(sessionToken)", forHTTPHeaderField: "Authorization")
        req.setValue(anonKey, forHTTPHeaderField: "apikey")

        let (data, response) = try await SutsumuStorageClient.urlSession.data(for: req)
        try Self.validate(response: response, body: data)
        return data
    }

    // MARK: - Delete

    func delete(path: String) async throws {
        // Esborrat d'un sol objecte: DELETE /storage/v1/object/{bucket}/{path}
        let url = objectURL(path: path)
        var req = URLRequest(url: url)
        req.httpMethod = "DELETE"
        req.setValue("Bearer \(sessionToken)", forHTTPHeaderField: "Authorization")
        req.setValue(anonKey, forHTTPHeaderField: "apikey")

        let (body, response) = try await SutsumuStorageClient.urlSession.data(for: req)
        try Self.validate(response: response, body: body)
    }

    // MARK: - Helpers

    /// Valida la resposta HTTP i llança un error descriptiu si ha fallat.
    private static func validate(response: URLResponse, body: Data) throws {
        guard let http = response as? HTTPURLResponse else {
            throw SutsumuError.invalidResponse
        }
        guard (200..<300).contains(http.statusCode) else {
            let msg = String(data: body, encoding: .utf8) ?? "Error \(http.statusCode)"
            switch http.statusCode {
            case 401: throw SutsumuError.server(401, "Sessió caducada o no autoritzada. Torna a iniciar sessió.")
            case 403: throw SutsumuError.server(403, "Sense permisos per accedir a aquest fitxer.")
            case 404: throw SutsumuError.notFound
            default:  throw SutsumuError.server(http.statusCode, msg)
            }
        }
    }
}

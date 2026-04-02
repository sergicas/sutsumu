import Foundation
#if canImport(CryptoKit)
import CryptoKit
#endif

public enum SupabaseStorageClientError: Error, LocalizedError, Sendable {
    case invalidProjectURL
    case missingAnonKey
    case missingAccessToken
    case invalidHTTPResponse
    case uploadFailed(status: Int, message: String)

    public var errorDescription: String? {
        switch self {
        case .invalidProjectURL:
            return "La URL del projecte Supabase no és vàlida."
        case .missingAnonKey:
            return "Falta l'anon key de Supabase."
        case .missingAccessToken:
            return "Falta el token de sessió per pujar adjunts."
        case .invalidHTTPResponse:
            return "La resposta de Supabase Storage no és vàlida."
        case .uploadFailed(_, let message):
            return message
        }
    }
}

public struct SupabaseStorageConfiguration: Sendable, Equatable {
    public let projectURL: URL
    public let anonKey: String
    public let bucketName: String

    public init(
        projectURL: URL,
        anonKey: String,
        bucketName: String = "sutsumu-sync-v2"
    ) {
        self.projectURL = projectURL
        self.anonKey = anonKey
        self.bucketName = bucketName
    }

    public var storageBaseURL: URL {
        projectURL
            .appending(path: "storage")
            .appending(path: "v1")
    }
}

public struct SupabaseStorageUploadResult: Sendable, Equatable {
    public let objectKey: String
    public let existedAlready: Bool

    public init(objectKey: String, existedAlready: Bool) {
        self.objectKey = objectKey
        self.existedAlready = existedAlready
    }
}

public struct SupabaseStorageDownloadResult: Sendable, Equatable {
    public let objectKey: String
    public let data: Data
    public let mimeType: String
    public let suggestedFileName: String?

    public init(
        objectKey: String,
        data: Data,
        mimeType: String,
        suggestedFileName: String?
    ) {
        self.objectKey = objectKey
        self.data = data
        self.mimeType = mimeType
        self.suggestedFileName = suggestedFileName
    }
}

public actor SupabaseStorageClient {
    private let configuration: SupabaseStorageConfiguration
    private let accessToken: String
    private let urlSession: URLSession

    public init(
        configuration: SupabaseStorageConfiguration,
        accessToken: String,
        urlSession: URLSession = .shared
    ) {
        self.configuration = configuration
        self.accessToken = accessToken
        self.urlSession = urlSession
    }

    public func upload(
        data: Data,
        objectKey: String,
        contentType: String,
        upsert: Bool = false
    ) async throws -> SupabaseStorageUploadResult {
        var request = try makeRequest(objectKey: objectKey, method: "POST")
        request.httpBody = data
        request.setValue(contentType.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? "application/octet-stream" : contentType, forHTTPHeaderField: "Content-Type")
        request.setValue(String(data.count), forHTTPHeaderField: "Content-Length")
        request.setValue(upsert ? "true" : "false", forHTTPHeaderField: "x-upsert")

        let (responseData, response) = try await urlSession.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse else {
            throw SupabaseStorageClientError.invalidHTTPResponse
        }

        if (200..<300).contains(httpResponse.statusCode) {
            return SupabaseStorageUploadResult(objectKey: objectKey, existedAlready: false)
        }

        if httpResponse.statusCode == 409 {
            return SupabaseStorageUploadResult(objectKey: objectKey, existedAlready: true)
        }

        throw decodeServerError(statusCode: httpResponse.statusCode, data: responseData)
    }

    public func download(objectKey: String) async throws -> SupabaseStorageDownloadResult {
        let request = try makeRequest(
            objectKey: objectKey,
            routePrefix: "object/authenticated",
            method: "GET"
        )

        let (responseData, response) = try await urlSession.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse else {
            throw SupabaseStorageClientError.invalidHTTPResponse
        }

        if (200..<300).contains(httpResponse.statusCode) {
            let mimeType = httpResponse.value(forHTTPHeaderField: "Content-Type")?.trimmingCharacters(in: .whitespacesAndNewlines) ?? "application/octet-stream"
            let suggestedFileName = parseSuggestedFileName(from: httpResponse)
            return SupabaseStorageDownloadResult(
                objectKey: objectKey,
                data: responseData,
                mimeType: mimeType,
                suggestedFileName: suggestedFileName
            )
        }

        throw decodeServerError(statusCode: httpResponse.statusCode, data: responseData)
    }

    private func makeRequest(
        objectKey: String,
        routePrefix: String,
        method: String
    ) throws -> URLRequest {
        let anonKey = configuration.anonKey.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !anonKey.isEmpty else {
            throw SupabaseStorageClientError.missingAnonKey
        }

        let trimmedToken = accessToken.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedToken.isEmpty else {
            throw SupabaseStorageClientError.missingAccessToken
        }

        let encodedBucket = Self.encodePathSegment(configuration.bucketName)
        let encodedObjectPath = Self.encodeObjectPath(objectKey)
        let baseURL = configuration.storageBaseURL.absoluteString.trimmingCharacters(in: CharacterSet(charactersIn: "/"))
        guard let url = URL(string: "\(baseURL)/\(routePrefix)/\(encodedBucket)/\(encodedObjectPath)") else {
            throw SupabaseStorageClientError.invalidProjectURL
        }

        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue(anonKey, forHTTPHeaderField: "apikey")
        request.setValue("Bearer \(trimmedToken)", forHTTPHeaderField: "Authorization")
        return request
    }

    private func makeRequest(objectKey: String, method: String) throws -> URLRequest {
        try makeRequest(objectKey: objectKey, routePrefix: "object", method: method)
    }

    private func decodeServerError(statusCode: Int, data: Data) -> SupabaseStorageClientError {
        if
            let body = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
        {
            let candidates = [
                body["message"] as? String,
                body["error"] as? String,
                body["msg"] as? String,
            ]
            if let message = candidates.compactMap({ $0?.trimmingCharacters(in: .whitespacesAndNewlines) }).first(where: { !$0.isEmpty }) {
                return .uploadFailed(status: statusCode, message: message)
            }
        }

        let rawMessage = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        return .uploadFailed(
            status: statusCode,
            message: rawMessage.isEmpty ? "Supabase Storage ha rebutjat la pujada de l'adjunt." : rawMessage
        )
    }

    private static func encodeObjectPath(_ objectKey: String) -> String {
        objectKey
            .split(separator: "/", omittingEmptySubsequences: true)
            .map { encodePathSegment(String($0)) }
            .joined(separator: "/")
    }

    private static func encodePathSegment(_ value: String) -> String {
        value.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed.subtracting(CharacterSet(charactersIn: "/"))) ?? value
    }

    private func parseSuggestedFileName(from response: HTTPURLResponse) -> String? {
        let contentDisposition = response.value(forHTTPHeaderField: "Content-Disposition")?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        guard !contentDisposition.isEmpty else { return nil }

        let components = contentDisposition.split(separator: ";").map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
        for component in components {
            if component.lowercased().hasPrefix("filename=") {
                let value = component.dropFirst("filename=".count)
                return value.trimmingCharacters(in: CharacterSet(charactersIn: "\""))
            }
            if component.lowercased().hasPrefix("filename*=") {
                let value = component.dropFirst("filename*=".count)
                if let decoded = value.split(separator: "'", maxSplits: 2).last {
                    return decoded.removingPercentEncoding ?? String(decoded)
                }
            }
        }
        return nil
    }

    public static func objectKey(
        userId: String,
        checksum: String,
        preferredExtension: String?
    ) -> String {
        let cleanedExtension = normalizeExtension(preferredExtension)
        let fileName = cleanedExtension.isEmpty ? checksum : "\(checksum).\(cleanedExtension)"
        return "\(userId)/attachments/\(fileName)"
    }

    public static func normalizeExtension(_ value: String?) -> String {
        (value ?? "")
            .trimmingCharacters(in: .whitespacesAndNewlines)
            .lowercased()
            .replacingOccurrences(of: ".", with: "")
            .filter { $0.isLetter || $0.isNumber }
    }

    public static func sha256ChecksumHex(for data: Data) -> String {
        #if canImport(CryptoKit)
        let digest = SHA256.hash(data: data)
        return digest.map { String(format: "%02x", $0) }.joined()
        #else
        return ""
        #endif
    }
}

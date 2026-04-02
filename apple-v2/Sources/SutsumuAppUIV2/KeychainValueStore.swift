import Foundation
import Security

struct KeychainValueStore {
    let service: String

    func save(data: Data, account: String) throws {
        if let error = trySaveKeychain(data: data, account: account) {
            if isMissingEntitlement(error) {
                saveDefaults(data: data, account: account)
                return
            }
            throw error
        }
    }

    func load(account: String) throws -> Data? {
        switch tryLoadKeychain(account: account) {
        case .success(let data):
            return data
        case .failure(let error):
            if isMissingEntitlement(error) {
                return loadDefaults(account: account)
            }
            throw error
        }
    }

    func delete(account: String) throws {
        if let error = tryDeleteKeychain(account: account) {
            if isMissingEntitlement(error) {
                deleteDefaults(account: account)
                return
            }
            throw error
        }
    }

    // MARK: - Keychain

    private func trySaveKeychain(data: Data, account: String) -> KeychainValueStoreError? {
        let query = baseQuery(account: account)
        SecItemDelete(query as CFDictionary)
        var attributes = query
        attributes[kSecValueData as String] = data
        let status = SecItemAdd(attributes as CFDictionary, nil)
        return status == errSecSuccess ? nil : .unexpectedStatus(status)
    }

    private func tryLoadKeychain(account: String) -> Result<Data?, KeychainValueStoreError> {
        var query = baseQuery(account: account)
        query[kSecReturnData as String] = true
        query[kSecMatchLimit as String] = kSecMatchLimitOne
        var item: CFTypeRef?
        let status = SecItemCopyMatching(query as CFDictionary, &item)
        if status == errSecItemNotFound { return .success(nil) }
        if status == errSecSuccess { return .success(item as? Data) }
        return .failure(.unexpectedStatus(status))
    }

    private func tryDeleteKeychain(account: String) -> KeychainValueStoreError? {
        let query = baseQuery(account: account)
        let status = SecItemDelete(query as CFDictionary)
        return (status == errSecSuccess || status == errSecItemNotFound) ? nil : .unexpectedStatus(status)
    }

    private func baseQuery(account: String) -> [String: Any] {
        [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account,
        ]
    }

    private func isMissingEntitlement(_ error: KeychainValueStoreError) -> Bool {
        if case .unexpectedStatus(let status) = error {
            return status == -34018 // errSecMissingEntitlement
        }
        return false
    }

    // MARK: - UserDefaults fallback (Mac Catalyst without keychain entitlement)

    private func defaultsKey(account: String) -> String {
        "sutsumu.keychain-fallback.\(service).\(account)"
    }

    private func saveDefaults(data: Data, account: String) {
        UserDefaults.standard.set(data, forKey: defaultsKey(account: account))
    }

    private func loadDefaults(account: String) -> Data? {
        UserDefaults.standard.data(forKey: defaultsKey(account: account))
    }

    private func deleteDefaults(account: String) {
        UserDefaults.standard.removeObject(forKey: defaultsKey(account: account))
    }
}

enum KeychainValueStoreError: LocalizedError {
    case unexpectedStatus(OSStatus)

    var errorDescription: String? {
        switch self {
        case .unexpectedStatus(let status):
            let message = SecCopyErrorMessageString(status, nil) as String? ?? "Error de Keychain"
            return "\(message) (\(status))"
        }
    }
}

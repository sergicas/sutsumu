import Foundation
import Testing
@testable import SutsumuCoreV2

@Test("JSONValue roundtrip")
func jsonValueRoundtrip() throws {
    let original = JSONValue.object([
        "name": .string("Sutsumu"),
        "docs": .array([
            .object([
                "type": .string("folder"),
                "deleted": .bool(false)
            ])
        ])
    ])

    let data = try JSONEncoder().encode(original)
    let decoded = try JSONDecoder().decode(JSONValue.self, from: data)

    #expect(decoded == original)
}

@Test("Supabase edge URL")
func edgeURLBuild() {
    let configuration = SupabaseEdgeConfiguration(
        projectURL: URL(string: "https://demo.supabase.co")!
    )

    #expect(configuration.endpointURL.absoluteString == "https://demo.supabase.co/functions/v1/sutsumu-sync-v2")
}

@Test("JSONValue signature is deterministic")
func jsonValueSignatureIsDeterministic() throws {
    let valueA = try JSONValue(jsonString: #"{"b":2,"a":1}"#)
    let valueB = try JSONValue(jsonString: #"{"a":1,"b":2}"#)

    #expect(try valueA.sha256Signature() == valueB.sha256Signature())
}

@Test("Supabase auth base URL")
func authBaseURLBuild() {
    let configuration = SupabaseAuthConfiguration(
        projectURL: URL(string: "https://demo.supabase.co")!,
        anonKey: "demo-anon-key"
    )

    #expect(configuration.authBaseURL.absoluteString == "https://demo.supabase.co/auth/v1")
}

@Test("Supabase session expiry uses expiry timestamp")
func authSessionExpiry() {
    let user = SupabaseAuthUser(id: "user-1", email: "demo@example.com")
    let expiringSoon = SupabaseAuthSession(
        accessToken: "access",
        refreshToken: "refresh",
        expiresIn: 3600,
        expiresAtUnix: Int(Date().addingTimeInterval(15).timeIntervalSince1970),
        tokenType: "bearer",
        user: user
    )
    let healthy = SupabaseAuthSession(
        accessToken: "access",
        refreshToken: "refresh",
        expiresIn: 3600,
        expiresAtUnix: Int(Date().addingTimeInterval(3600).timeIntervalSince1970),
        tokenType: "bearer",
        user: user
    )

    #expect(expiringSoon.isExpired(buffer: 60))
    #expect(!healthy.isExpired(buffer: 60))
}

@Test("Supabase sign up envelope keeps a session when auth returns tokens")
func authRegistrationEnvelopeWithSession() throws {
    let data = Data(#"{"access_token":"access","refresh_token":"refresh","expires_in":3600,"expires_at":2000000000,"token_type":"bearer","user":{"id":"user-1","email":"demo@example.com"}}"#.utf8)
    let envelope = try JSONDecoder().decode(SupabaseAuthRegistrationEnvelope.self, from: data)

    #expect(envelope.result.session?.accessToken == "access")
    #expect(envelope.result.user?.email == "demo@example.com")
    #expect(!envelope.result.requiresEmailConfirmation)
}

@Test("Supabase sign up envelope supports pending email confirmation")
func authRegistrationEnvelopePendingConfirmation() throws {
    let data = Data(#"{"user":{"id":"user-2","email":"pending@example.com"}}"#.utf8)
    let envelope = try JSONDecoder().decode(SupabaseAuthRegistrationEnvelope.self, from: data)

    #expect(envelope.result.session == nil)
    #expect(envelope.result.user?.email == "pending@example.com")
    #expect(envelope.result.requiresEmailConfirmation)
}

@Test("Supabase redirect session parses URL fragment tokens")
func authRedirectSessionFromFragment() {
    let url = URL(string: "cat.sergicastillo.sutsumu.v2://auth#access_token=access-1&refresh_token=refresh-1&expires_in=3600&expires_at=2000000000&token_type=bearer&type=recovery")!
    let session = SupabaseAuthClient.parseRedirectSession(from: url)

    #expect(session?.accessToken == "access-1")
    #expect(session?.refreshToken == "refresh-1")
    #expect(session?.isRecovery == true)
}

@Test("Supabase redirect session parses URL query tokens")
func authRedirectSessionFromQuery() {
    let url = URL(string: "https://example.com/auth?access_token=access-2&refresh_token=refresh-2&expires_in=1800&token_type=bearer&type=signup")!
    let session = SupabaseAuthClient.parseRedirectSession(from: url)

    #expect(session?.accessToken == "access-2")
    #expect(session?.refreshToken == "refresh-2")
    #expect(session?.flowType == "signup")
}

@Test("Native workspace roundtrip keeps folders and documents")
func nativeWorkspaceRoundtrip() throws {
    let payload = JSONValue.object([
        "docs": .array([
            .object([
                "id": .string("folder-1"),
                "type": .string("folder"),
                "title": .string("Projectes"),
                "parentId": .string("root"),
                "timestamp": .string("2026-03-29T10:00:00Z"),
                "isDeleted": .bool(false),
                "desc": .string("Carpeta principal"),
                "color": .string("#0ea5e9")
            ]),
            .object([
                "id": .string("document-1"),
                "type": .string("document"),
                "title": .string("Pla"),
                "parentId": .string("folder-1"),
                "timestamp": .string("2026-03-29T10:05:00Z"),
                "isDeleted": .bool(false),
                "category": .string("Full de ruta"),
                "content": .string("Primer esborrany"),
                "tags": .array([.string("sync"), .string("v2")])
            ])
        ]),
        "expandedFolders": .array([.string("folder-1")]),
        "meta": .object([
            "source": .string("test-suite")
        ])
    ])

    let workspace = try SutsumuWorkspace(payloadJSON: payload)

    #expect(workspace.statistics.folders == 1)
    #expect(workspace.statistics.documents == 1)
    #expect(workspace.children(of: "folder-1").first?.title == "Pla")

    let roundtrip = try workspace.payloadJSON()
    let reloaded = try SutsumuWorkspace(payloadJSON: roundtrip)

    #expect(reloaded == workspace)
}

@Test("Deleting a folder cascades to its descendants")
func folderDeletionCascades() {
    var workspace = SutsumuWorkspace(docs: [
        .folder(id: "folder-1", title: "Arrel"),
        .document(id: "document-1", parentId: "folder-1", title: "Nota")
    ])

    let deleted = workspace.markDeleted(id: "folder-1")

    #expect(deleted)
    #expect(workspace.item(id: "folder-1")?.isDeleted == true)
    #expect(workspace.item(id: "document-1")?.isDeleted == true)
}

@Test("Supabase storage object key is deterministic per user and checksum")
func storageObjectKeyBuild() {
    let objectKey = SupabaseStorageClient.objectKey(
        userId: "user-123",
        checksum: "abc123",
        preferredExtension: ".PDF"
    )

    #expect(objectKey == "user-123/attachments/abc123.pdf")
}

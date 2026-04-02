import Foundation
import Testing
@testable import SutsumuAppUIV2

@Test("Expected head uses the persisted synced revision instead of the freshly loaded remote head")
func expectedHeadUsesPersistedBaseline() {
    let revisionId = SyncBaselineState.expectedHeadRevisionId(
        lastSyncedRevisionId: "revision-a",
        lastHeadRevisionId: "revision-b",
        localPayloadSignature: "local-signature",
        remotePayloadSignature: "remote-signature"
    )

    #expect(revisionId == "revision-a")
}

@Test("Expected head falls back to the remote head only for no-op commits")
func expectedHeadAllowsNoOpCommitWhenLocalMatchesRemote() {
    let revisionId = SyncBaselineState.expectedHeadRevisionId(
        lastSyncedRevisionId: "",
        lastHeadRevisionId: "revision-b",
        localPayloadSignature: "shared-signature",
        remotePayloadSignature: "shared-signature"
    )

    #expect(revisionId == "revision-b")
}

@Test("Expected head stays empty when the baseline is missing and local differs from remote")
func expectedHeadStaysEmptyWithoutBaseline() {
    let revisionId = SyncBaselineState.expectedHeadRevisionId(
        lastSyncedRevisionId: "",
        lastHeadRevisionId: "revision-b",
        localPayloadSignature: "local-signature",
        remotePayloadSignature: "remote-signature"
    )

    #expect(revisionId.isEmpty)
}

@Test("Unsynced local changes detect both pending operations and snapshot-only edits")
func unsyncedLocalChangesRecognition() {
    #expect(
        SyncBaselineState.hasUnsyncedLocalChanges(
            localPayloadSignature: "sig-a",
            lastSyncedPayloadSignature: "sig-a",
            pendingOperationCount: 1,
            requiresSnapshotCommit: false
        )
    )

    #expect(
        SyncBaselineState.hasUnsyncedLocalChanges(
            localPayloadSignature: "sig-b",
            lastSyncedPayloadSignature: "sig-a",
            pendingOperationCount: 0,
            requiresSnapshotCommit: true
        )
    )
}

@Test("Remote ahead only triggers when local is still on the synced baseline")
func remoteAheadDetectionRequiresCleanLocalState() {
    let cleanLocal = SyncBaselineState.isRemoteAheadOfLocal(
        localPayloadSignature: "sig-a",
        remotePayloadSignature: "sig-b",
        lastSyncedPayloadSignature: "sig-a",
        hasUnsyncedLocalChanges: false
    )
    let dirtyLocal = SyncBaselineState.isRemoteAheadOfLocal(
        localPayloadSignature: "sig-a",
        remotePayloadSignature: "sig-b",
        lastSyncedPayloadSignature: "sig-a",
        hasUnsyncedLocalChanges: true
    )

    #expect(cleanLocal)
    #expect(!dirtyLocal)
}

@Test("Persisted sync baseline roundtrips cleanly")
func persistedBaselineRoundtrip() throws {
    let original = PersistedSyncBaseline(
        workspaceId: "workspace-principal",
        revisionId: "revision-a",
        payloadSignature: "signature-a"
    )

    let encoded = try JSONEncoder().encode(original)
    let decoded = try JSONDecoder().decode(PersistedSyncBaseline.self, from: encoded)

    #expect(decoded == original)
}

import Foundation
import SwiftUI
import UniformTypeIdentifiers
#if canImport(SutsumuCoreV2)
import SutsumuCoreV2
#endif
#if canImport(AppKit)
import AppKit
#endif
#if canImport(UIKit)
import UIKit
#endif

struct PersistedSyncBaseline: Codable, Equatable {
    var workspaceId: String
    var revisionId: String
    var payloadSignature: String

    init(workspaceId: String, revisionId: String, payloadSignature: String) {
        self.workspaceId = workspaceId.trimmingCharacters(in: .whitespacesAndNewlines)
        self.revisionId = revisionId.trimmingCharacters(in: .whitespacesAndNewlines)
        self.payloadSignature = payloadSignature.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    var isEmpty: Bool {
        revisionId.isEmpty && payloadSignature.isEmpty
    }
}

enum SyncBaselineState {
    static func hasUnsyncedLocalChanges(
        localPayloadSignature: String,
        lastSyncedPayloadSignature: String,
        pendingOperationCount: Int,
        requiresSnapshotCommit: Bool
    ) -> Bool {
        if requiresSnapshotCommit || pendingOperationCount > 0 {
            return true
        }

        let local = localPayloadSignature.trimmingCharacters(in: .whitespacesAndNewlines)
        let synced = lastSyncedPayloadSignature.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !local.isEmpty, !synced.isEmpty else { return false }
        return local != synced
    }

    static func isRemoteAheadOfLocal(
        localPayloadSignature: String,
        remotePayloadSignature: String?,
        lastSyncedPayloadSignature: String,
        hasUnsyncedLocalChanges: Bool
    ) -> Bool {
        if hasUnsyncedLocalChanges {
            return false
        }

        let local = localPayloadSignature.trimmingCharacters(in: .whitespacesAndNewlines)
        let remote = remotePayloadSignature?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        let synced = lastSyncedPayloadSignature.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !local.isEmpty, !remote.isEmpty, !synced.isEmpty else { return false }
        return local == synced && remote != local
    }

    static func expectedHeadRevisionId(
        lastSyncedRevisionId: String,
        lastHeadRevisionId: String,
        localPayloadSignature: String,
        remotePayloadSignature: String?
    ) -> String {
        let syncedRevisionId = lastSyncedRevisionId.trimmingCharacters(in: .whitespacesAndNewlines)
        if !syncedRevisionId.isEmpty {
            return syncedRevisionId
        }

        let local = localPayloadSignature.trimmingCharacters(in: .whitespacesAndNewlines)
        let remote = remotePayloadSignature?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        if !local.isEmpty, local == remote {
            return lastHeadRevisionId.trimmingCharacters(in: .whitespacesAndNewlines)
        }

        return ""
    }
}

@MainActor
final class AppState: ObservableObject {
    // MARK: - Published Properties
    
    // MARK: Configuration & Auth
    @Published var projectURL = ""
    @Published var anonKey = ""
    @Published var authEmail = ""
    @Published var authPassword = ""
    @Published var authRedirectURL = ""
    @Published var authIncomingLink = ""
    @Published var resetPassword = ""
    @Published var resetPasswordConfirmation = ""
    @Published private(set) var authUserEmail = ""
    @Published private(set) var authStateLabel = "No connectat"
    @Published private(set) var isPasswordResetFlowActive = false
    @Published private(set) var isOnboardingDismissed = false
    @Published var sessionToken = ""
    
    // MARK: Workspace & Model
    @Published var workspaceId = "workspace-principal"
    @Published var workspaceName = "Workspace principal"
    @Published var deviceLabel = ""
    @Published var localDocumentName = "data-clean.json"
    @Published var localPayloadText = """
{
  "docs": [],
  "expandedFolders": [],
  "meta": {
    "source": "Sutsumu Apple v2"
  }
}
"""
    @Published var statusMessage = "Configura Supabase, inicia sessió i carrega o envia el workspace."
    @Published var lastHead: WorkspaceHead?
    @Published var remotePreviewText = ""
    @Published var isLoading = false
    @Published private(set) var lastSyncedRevisionId = ""
    @Published private(set) var lastSyncedPayloadSignature = ""
    @Published private(set) var lastLocalPayloadSignature = ""
    @Published private(set) var hasSyncConflict = false
    @Published private(set) var pendingOperations: [SutsumuWorkspaceOperation] = []
    @Published private(set) var requiresSnapshotCommit = false
    @Published private(set) var workspaceModel = SutsumuWorkspace.empty
    
    // MARK: Editor State
    @Published var selectedItemId: String?
    @Published var editorTitle = ""
    @Published var editorTagsText = ""
    @Published var editorCategory = ""
    @Published var editorContent = ""
    @Published var editorDescription = ""
    @Published var editorColor = "#0ea5e9"
    @Published var editorIsFavorite = false
    @Published var editorIsPinned = false
    @Published var editorParentId: String = "root"
    @Published private(set) var downloadedAttachmentURL: URL?
    @Published private(set) var downloadedAttachmentDisplayName = ""
    @Published private(set) var downloadedAttachmentObjectKey = ""
    @Published private(set) var downloadedAttachmentPreviewText = ""
    @Published private(set) var downloadedAttachmentPreviewMIMEType = ""
    @Published private(set) var downloadedAttachmentImageData: Data?

    private let defaults = UserDefaults.standard
    private let bundledConfiguration = BundledConfiguration.current
    private let keychain = KeychainValueStore(service: "cat.sergicastillo.sutsumu.v2")
    private let authSessionAccount = "supabase-auth-session"
    private let deviceIdKey = "sutsumu.apple.v2.deviceId"
    private let projectURLKey = "sutsumu.apple.v2.projectURL"
    private let anonKeyKey = "sutsumu.apple.v2.anonKey"
    private let authEmailKey = "sutsumu.apple.v2.authEmail"
    private let authRedirectURLKey = "sutsumu.apple.v2.authRedirectURL"
    private let workspaceIdKey = "sutsumu.apple.v2.workspaceId"
    private let workspaceNameKey = "sutsumu.apple.v2.workspaceName"
    private let deviceLabelKey = "sutsumu.apple.v2.deviceLabel"
    private let localDocumentNameKey = "sutsumu.apple.v2.localDocumentName"
    private let localPayloadKey = "sutsumu.apple.v2.localPayload"
    private let pendingOperationsKey = "sutsumu.apple.v2.pendingOperations"
    private let requiresSnapshotCommitKey = "sutsumu.apple.v2.requiresSnapshotCommit"
    private let onboardingDismissedKey = "sutsumu.apple.v2.onboardingDismissed"
    private let syncBaselineKey = "sutsumu.apple.v2.syncBaseline"

    private var currentSession: SupabaseAuthSession?
    private var didAttemptSessionRestore = false
    private var isSceneActive = false
    private var autoSyncDebounceTask: Task<Void, Never>?
    private var periodicSyncTask: Task<Void, Never>?

    let localDeviceId: String

    private static let autoSyncDebounceNanoseconds: UInt64 = 1_500_000_000
    private static let periodicAutoSyncNanoseconds: UInt64 = 60_000_000_000

    // MARK: - Initialization

    init() {
        let storedDeviceId = defaults.string(forKey: deviceIdKey)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        if storedDeviceId.isEmpty {
            localDeviceId = UUID().uuidString
            defaults.set(localDeviceId, forKey: deviceIdKey)
        } else {
            localDeviceId = storedDeviceId
        }

        if bundledConfiguration.hasManagedConnection {
            projectURL = bundledConfiguration.projectURLText
            anonKey = bundledConfiguration.anonKey
        } else {
            projectURL = defaults.string(forKey: projectURLKey) ?? ""
            anonKey = defaults.string(forKey: anonKeyKey) ?? ""
        }
        authEmail = defaults.string(forKey: authEmailKey) ?? ""
        authRedirectURL = defaults.string(forKey: authRedirectURLKey) ?? ""
        if authRedirectURL.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            authRedirectURL = Self.defaultAuthRedirectURL
        }
        workspaceId = defaults.string(forKey: workspaceIdKey) ?? workspaceId
        workspaceName = defaults.string(forKey: workspaceNameKey) ?? workspaceName
        deviceLabel = defaults.string(forKey: deviceLabelKey) ?? Self.defaultDeviceLabel
        localDocumentName = defaults.string(forKey: localDocumentNameKey) ?? localDocumentName
        localPayloadText = defaults.string(forKey: localPayloadKey) ?? localPayloadText
        requiresSnapshotCommit = defaults.bool(forKey: requiresSnapshotCommitKey)
        isOnboardingDismissed = defaults.bool(forKey: onboardingDismissedKey)
        restorePersistedSyncBaseline()
        if let operationsData = defaults.data(forKey: pendingOperationsKey),
           let storedOperations = try? JSONDecoder().decode([SutsumuWorkspaceOperation].self, from: operationsData) {
            pendingOperations = storedOperations
        }

        if !rebuildWorkspaceFromLocalJSON(showStatus: false, markAsSnapshotSource: false) {
            workspaceModel = .empty
            pendingOperations = []
            requiresSnapshotCommit = false
            clearSyncBaseline()
            syncLocalPayloadFromWorkspace(status: Optional<String>.none, showStatus: false)
        }

        if bundledConfiguration.hasManagedConnection {
            statusMessage = "Connexió integrada. Inicia sessió i carrega o envia el workspace."
        }

        if let storedSession = try? loadStoredSession() {
            applySession(storedSession, isRestored: true)
            statusMessage = "Sessió local recuperada. La validaré quan entris a l'app."
        }
    }

    // MARK: - Computed Properties
    
    var canSync: Bool {
        isAuthenticated && !projectURL.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var isManagedConnection: Bool {
        bundledConfiguration.hasManagedConnection
    }

    var supportURL: URL? {
        bundledConfiguration.supportURL
    }

    var privacyPolicyURL: URL? {
        bundledConfiguration.privacyPolicyURL
    }

    var isSupabaseConfigured: Bool {
        !projectURL.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty &&
        !anonKey.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var canApplyRemoteWorkspace: Bool {
        lastHead != nil && !isLoading
    }

    var canAttemptLogin: Bool {
        !projectURL.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty &&
        !anonKey.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty &&
        !authEmail.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty &&
        !authPassword.isEmpty
    }

    var canAttemptPasswordRecovery: Bool {
        !projectURL.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty &&
        !anonKey.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty &&
        !authEmail.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var canProcessAuthIncomingLink: Bool {
        !projectURL.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty &&
        !anonKey.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty &&
        !authIncomingLink.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var canSubmitPasswordReset: Bool {
        isPasswordResetFlowActive &&
        currentSession != nil &&
        resetPassword.count >= 8 &&
        resetPassword == resetPasswordConfirmation
    }

    var isAuthenticated: Bool {
        currentSession != nil && !sessionToken.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var workspaceOutlineRows: [SutsumuWorkspaceOutlineRow] {
        workspaceModel.outlineRows()
    }

    var workspaceStats: SutsumuWorkspaceStatistics {
        workspaceModel.statistics
    }

    var selectedItem: SutsumuWorkspaceItem? {
        workspaceModel.item(id: selectedItemId)
    }

    var selectedRemoteItem: SutsumuWorkspaceItem? {
        guard let selectedItemId, let remoteWorkspace = remoteWorkspaceModel else { return nil }
        return remoteWorkspace.item(id: selectedItemId)
    }

    var selectedItemTypeLabel: String {
        guard let selectedItem else { return "Cap selecció" }
        return selectedItem.isFolder ? "Carpeta" : "Document"
    }

    var selectedItemParentLabel: String {
        guard let selectedItem else { return "Arrel" }
        if selectedItem.parentId == "root" {
            return "Arrel"
        }
        return workspaceModel.item(id: selectedItem.parentId)?.title ?? "Arrel"
    }

    var canApplySelectedEdits: Bool {
        selectedItemId != nil && !editorTitle.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var selectedTagsPreview: String {
        let tags = parseTags(editorTagsText)
        return tags.isEmpty ? "Sense etiquetes" : tags.joined(separator: ", ")
    }

    var canAttachSelectedDocument: Bool {
        selectedItem?.isDocument == true && canSync && !isLoading
    }

    var canRemoveSelectedAttachment: Bool {
        selectedItem?.isDocument == true && selectedItem?.attachment != nil && !isLoading
    }

    var selectedAttachment: SutsumuWorkspaceAttachment? {
        selectedItem?.attachment
    }

    var selectedAttachmentSummary: String {
        guard let attachment = selectedAttachment else {
            return "Aquest document encara no té cap adjunt."
        }

        let formatter = ByteCountFormatter()
        formatter.allowedUnits = [.useKB, .useMB, .useGB]
        formatter.countStyle = .file
        let sizeLabel = formatter.string(fromByteCount: Int64(attachment.fileSize))
        let typeLabel = attachment.fileType.isEmpty ? "tipus desconegut" : attachment.fileType
        let availabilityLabel = attachment.availability.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            ? "sense estat"
            : attachment.availability
        return "\(typeLabel) · \(sizeLabel) · \(availabilityLabel)"
    }

    var selectedAttachmentRemoteKeyPreview: String? {
        let key = selectedAttachment?.remoteObjectKey?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        return key.isEmpty ? nil : key
    }

    var canDownloadSelectedAttachment: Bool {
        let key = selectedAttachment?.remoteObjectKey?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        return selectedItem?.isDocument == true && !key.isEmpty && canSync && !isLoading
    }

    var selectedDownloadedAttachmentURL: URL? {
        guard downloadedAttachmentObjectKey == selectedAttachment?.remoteObjectKey else { return nil }
        return downloadedAttachmentURL
    }

    var selectedAttachmentPreviewText: String? {
        guard downloadedAttachmentObjectKey == selectedAttachment?.remoteObjectKey else { return nil }
        let preview = downloadedAttachmentPreviewText.trimmingCharacters(in: .whitespacesAndNewlines)
        return preview.isEmpty ? nil : preview
    }

    var selectedAttachmentImagePreviewData: Data? {
        guard downloadedAttachmentObjectKey == selectedAttachment?.remoteObjectKey else { return nil }
        return downloadedAttachmentImageData
    }

    var selectedAttachmentDownloadedName: String {
        guard downloadedAttachmentObjectKey == selectedAttachment?.remoteObjectKey else { return "" }
        return downloadedAttachmentDisplayName
    }

    var selectedRemoteAttachment: SutsumuWorkspaceAttachment? {
        selectedRemoteItem?.attachment
    }

    var hasSelectedItemConflict: Bool {
        guard selectedItem != nil, lastHead != nil else { return false }
        return selectedItem != selectedRemoteItem
    }

    var hasSelectedAttachmentConflict: Bool {
        guard selectedItem?.isDocument == true, lastHead != nil else { return false }
        return selectedAttachment != selectedRemoteAttachment
    }

    var selectedItemConflictHeadline: String? {
        guard hasSelectedItemConflict else { return nil }
        if selectedRemoteItem == nil {
            return "El remot no té aquest element."
        }
        if selectedItem == nil {
            return "El local ja no té aquest element."
        }
        if selectedItem?.type != selectedRemoteItem?.type {
            return "El tipus de l'element no coincideix entre local i remot."
        }
        return "L'element local i el remot no coincideixen."
    }

    var selectedItemConflictNeedsAttention: Bool {
        hasSyncConflict && hasSelectedItemConflict
    }

    var selectedItemConflictFieldLabels: [String] {
        itemConflictFields(local: selectedItem, remote: selectedRemoteItem)
    }

    var selectedLocalItemSummaryForConflict: String {
        itemConflictSummary(for: selectedItem, emptyLabel: "Absent al local")
    }

    var selectedRemoteItemSummaryForConflict: String {
        itemConflictSummary(for: selectedRemoteItem, emptyLabel: "Absent al remot")
    }

    var selectedLocalAttachmentSummaryForConflict: String {
        attachmentConflictSummary(for: selectedAttachment, emptyLabel: "Sense adjunt local")
    }

    var selectedRemoteAttachmentSummaryForConflict: String {
        if selectedRemoteItem == nil {
            return "Document absent al remot"
        }
        return attachmentConflictSummary(for: selectedRemoteAttachment, emptyLabel: "Sense adjunt remot")
    }

    var pendingOperationsCount: Int {
        pendingOperations.count
    }

    var hasUnsyncedLocalChanges: Bool {
        SyncBaselineState.hasUnsyncedLocalChanges(
            localPayloadSignature: lastLocalPayloadSignature,
            lastSyncedPayloadSignature: lastSyncedPayloadSignature,
            pendingOperationCount: pendingOperations.count,
            requiresSnapshotCommit: requiresSnapshotCommit
        )
    }

    var isRemoteAheadOfLocal: Bool {
        SyncBaselineState.isRemoteAheadOfLocal(
            localPayloadSignature: lastLocalPayloadSignature,
            remotePayloadSignature: lastHead?.payloadSignature,
            lastSyncedPayloadSignature: lastSyncedPayloadSignature,
            hasUnsyncedLocalChanges: hasUnsyncedLocalChanges
        )
    }

    var syncTransportLabel: String {
        if requiresSnapshotCommit {
            return "Snapshot"
        }
        return pendingOperations.isEmpty ? "Sense operacions" : "Incremental"
    }

    var syncStateLabel: String {
        if hasSyncConflict {
            return "Conflicte"
        }
        if !canSync {
            return "Local"
        }
        guard let lastHead else {
            return "Sense remot"
        }
        if lastLocalPayloadSignature == lastHead.payloadSignature {
            return "En línia"
        }
        if isRemoteAheadOfLocal {
            return "Remot nou"
        }
        if hasUnsyncedLocalChanges {
            return "Pendent d'enviar"
        }
        return "Pendent de revisar"
    }

    var syncStateDetail: String {
        if hasSyncConflict {
            return "El backend ja té una altra revisió. Revisa el remot i aplica'l si cal abans de tornar a enviar."
        }
        if !canSync {
            return "Pots treballar en local, però cal iniciar sessió per sincronitzar amb Supabase."
        }
        guard let lastHead else {
            return "Encara no hi ha cap revisió remota carregada per aquest workspace."
        }
        if lastLocalPayloadSignature == lastHead.payloadSignature {
            if lastSyncedRevisionId.isEmpty {
                return "El model natiu local coincideix amb el head remot."
            }
            return "El model natiu local coincideix amb la revisió \(lastSyncedRevisionId)."
        }
        if isRemoteAheadOfLocal {
            return "El núvol té una versió més nova. Si aquest dispositiu no té canvis locals, la sincronització l'aplicarà automàticament."
        }
        if hasUnsyncedLocalChanges {
            return "Hi ha canvis al model natiu que encara no s'han enviat."
        }
        return "Local i remot no coincideixen i convé revisar-los abans de continuar."
    }

    var syncStateTint: Color {
        switch syncStateLabel {
        case "Conflicte":
            return .red
        case "En línia":
            return .green
        case "Remot nou":
            return .blue
        case "Pendent d'enviar":
            return .orange
        case "Sense remot":
            return .blue
        default:
            return .secondary
        }
    }

    var statusHeadline: String {
        if isLoading {
            return "Treballant ara mateix"
        }
        if hasSyncConflict {
            return "Cal revisar un conflicte"
        }
        if !isSupabaseConfigured {
            return "Falta connectar Supabase"
        }
        if !isAuthenticated {
            return "Cal iniciar sessió"
        }
        guard let lastHead else {
            return "Preparat per a la primera sync"
        }
        if isRemoteAheadOfLocal {
            return "Hi ha una versió nova al núvol"
        }
        if lastLocalPayloadSignature == lastHead.payloadSignature {
            return "Tot al dia"
        }
        if hasUnsyncedLocalChanges {
            return "Hi ha canvis pendents"
        }
        return "Cal revisar l'estat del núvol"
    }

    var statusHeadlineTint: Color {
        if isLoading {
            return .blue
        }
        if hasSyncConflict {
            return .red
        }
        if !isSupabaseConfigured || !isAuthenticated {
            return .orange
        }
        if lastHead == nil {
            return .blue
        }
        if lastLocalPayloadSignature == lastHead?.payloadSignature {
            return .green
        }
        return .orange
    }

    var nextStepTitle: String {
        if !isSupabaseConfigured {
            return "Configura la connexió amb Supabase"
        }
        if !isAuthenticated {
            return "Obre sessió o crea el teu compte"
        }
        if workspaceOutlineRows.isEmpty {
            return "Crea la primera carpeta o document"
        }
        if lastHead == nil {
            return "Envia el primer snapshot del workspace"
        }
        if hasSyncConflict {
            return "Decideix si vols mantenir el local o aplicar el remot"
        }
        if isRemoteAheadOfLocal {
            return "Actualitza el model amb la versió remota"
        }
        if hasUnsyncedLocalChanges {
            return "Envia els canvis locals al backend"
        }
        if selectedItem == nil {
            return "Selecciona un element per continuar"
        }
        if selectedItem?.isDocument == true && selectedAttachment == nil {
            return "Si vols, afegeix-hi un adjunt"
        }
        return "Continua treballant amb l'app"
    }

    var nextStepDetail: String {
        if !isSupabaseConfigured {
            return "Omple la URL del projecte i l'anon key per poder autenticar-te i sincronitzar."
        }
        if !isAuthenticated {
            return "La sessió és el pas que desbloqueja sync, adjunts i recuperació de compte."
        }
        if workspaceOutlineRows.isEmpty {
            return "La v2 ja treballa amb model natiu. Pots començar des de la secció 'Estructura nativa'."
        }
        if lastHead == nil {
            return "Encara no hi ha cap revisió remota carregada. Fes una primera pujada perquè Mac i iPhone comparteixin base."
        }
        if hasSyncConflict {
            return "La UI ja et deixa comparar local i remot. Resol primer l'element conflictiu i després torna a enviar."
        }
        if isRemoteAheadOfLocal {
            return "El Mac o l'iPhone ja han pujat una revisió més nova. La següent sincronització la baixarà si aquest dispositiu no té canvis locals."
        }
        if hasUnsyncedLocalChanges {
            return "Tens canvis locals llestos. 'Enviar model natiu' farà el commit complet o incremental segons toqui."
        }
        if selectedItem == nil {
            return "Tot està sincronitzat. Ara pots navegar per carpetes i documents o crear-ne de nous."
        }
        if selectedItem?.isDocument == true && selectedAttachment == nil {
            return "Els adjunts ja pugen a Supabase Storage i es poden descarregar i compartir."
        }
        return "La base ja està estable: auth, sync, conflictes i adjunts funcionen sobre el model natiu."
    }

    var shouldShowOnboardingCard: Bool {
        !isOnboardingDismissed || !isAuthenticated || workspaceOutlineRows.isEmpty || lastHead == nil
    }

    var onboardingChecklist: [SutsumuChecklistItem] {
        [
            SutsumuChecklistItem(
                id: "connection",
                title: "Connexió",
                detail: isSupabaseConfigured
                    ? "La URL del projecte i l'anon key ja estan configurades."
                    : "Afegeix la URL del projecte i l'anon key de Supabase.",
                isDone: isSupabaseConfigured
            ),
            SutsumuChecklistItem(
                id: "session",
                title: "Sessió",
                detail: isAuthenticated
                    ? "Sessió activa com \(authUserEmail.isEmpty ? authEmail : authUserEmail)."
                    : "Inicia sessió o crea compte per desbloquejar la sync.",
                isDone: isAuthenticated
            ),
            SutsumuChecklistItem(
                id: "content",
                title: "Contingut",
                detail: workspaceOutlineRows.isEmpty
                    ? "Crea la primera carpeta o document al model natiu."
                    : "Ja tens \(workspaceStats.folders) carpetes i \(workspaceStats.documents) documents al workspace.",
                isDone: !workspaceOutlineRows.isEmpty
            ),
            SutsumuChecklistItem(
                id: "sync",
                title: "Sincronització",
                detail: lastHead == nil
                    ? "Falta una primera revisió remota."
                    : lastLocalPayloadSignature == lastHead?.payloadSignature
                        ? "Local i remot estan alineats."
                        : "Hi ha canvis pendents o un remot per revisar.",
                isDone: lastHead != nil && !hasSyncConflict && lastLocalPayloadSignature == lastHead?.payloadSignature && !lastLocalPayloadSignature.isEmpty
            ),
        ]
    }

    var localSignaturePreview: String {
        shortSignature(lastLocalPayloadSignature) ?? "encara no calculada"
    }

    var remoteSignaturePreview: String {
        shortSignature(lastHead?.payloadSignature) ?? "sense head"
    }

    func persistInputs() {
        if isManagedConnection {
            defaults.removeObject(forKey: projectURLKey)
            defaults.removeObject(forKey: anonKeyKey)
        } else {
            defaults.set(projectURL, forKey: projectURLKey)
            defaults.set(anonKey, forKey: anonKeyKey)
        }
        defaults.set(authEmail, forKey: authEmailKey)
        defaults.set(authRedirectURL, forKey: authRedirectURLKey)
        defaults.set(workspaceId, forKey: workspaceIdKey)
        defaults.set(workspaceName, forKey: workspaceNameKey)
        defaults.set(deviceLabel, forKey: deviceLabelKey)
        defaults.set(localDocumentName, forKey: localDocumentNameKey)
        defaults.set(localPayloadText, forKey: localPayloadKey)
        defaults.set(requiresSnapshotCommit, forKey: requiresSnapshotCommitKey)
        defaults.set(isOnboardingDismissed, forKey: onboardingDismissedKey)
        if let operationsData = try? JSONEncoder().encode(pendingOperations) {
            defaults.set(operationsData, forKey: pendingOperationsKey)
        }
        persistSyncBaseline()
    }

    func dismissOnboardingCard() {
        isOnboardingDismissed = true
        persistInputs()
    }

    func reopenOnboardingCard() {
        isOnboardingDismissed = false
        persistInputs()
    }

    func handleScenePhaseChange(_ scenePhase: ScenePhase) {
        switch scenePhase {
        case .active:
            isSceneActive = true
            startPeriodicAutoSyncIfNeeded()
            Task { @MainActor in
                await performAutomaticSyncIfPossible()
            }
        case .inactive, .background:
            isSceneActive = false
            autoSyncDebounceTask?.cancel()
            autoSyncDebounceTask = nil
            stopPeriodicAutoSync()
        @unknown default:
            isSceneActive = false
            autoSyncDebounceTask?.cancel()
            autoSyncDebounceTask = nil
            stopPeriodicAutoSync()
        }
    }

    func restoreSessionIfNeeded() async {
        if didAttemptSessionRestore { return }
        didAttemptSessionRestore = true

        guard let storedSession = try? loadStoredSession() else { return }

        if !storedSession.isExpired() {
            isPasswordResetFlowActive = false
            applySession(storedSession, isRestored: true)
            statusMessage = "Sessió restaurada: \(authUserEmail.isEmpty ? "usuari" : authUserEmail)"
            if canSync && !hasSyncConflict {
                await syncNow(announceStatus: false)
            }
            return
        }

        guard beginTask("Refrescant la sessió guardada...") else { return }
        defer { isLoading = false }

        do {
            let authClient = try makeAuthClient(projectURLText: projectURL, anonKeyText: anonKey)
            let refreshedSession = try await authClient.refreshSession(storedSession)
            try storeSession(refreshedSession)
            isPasswordResetFlowActive = false
            applySession(refreshedSession, isRestored: true)
            statusMessage = "Sessió refrescada correctament."
            isLoading = false
            if canSync && !hasSyncConflict {
                await syncNow(announceStatus: false)
            }
        } catch {
            try? clearStoredSession()
            clearSessionState()
            statusMessage = "La sessió guardada ja no és vàlida. Torna a iniciar sessió."
        }
    }

    // MARK: - Auth Methods
    
    func signIn() async {
        guard canAttemptLogin else {
            statusMessage = "Omple URL, anon key, email i contrasenya."
            return
        }

        guard beginTask("Iniciant sessió a Supabase...") else { return }

        let projectURLText = projectURL
        let anonKeyText = anonKey
        let email = authEmail.trimmingCharacters(in: .whitespacesAndNewlines)
        let password = authPassword

        defer { isLoading = false }

        do {
            let authClient = try makeAuthClient(projectURLText: projectURLText, anonKeyText: anonKeyText)
            let session = try await authClient.signIn(email: email, password: password)
            try storeSession(session)
            isPasswordResetFlowActive = false
            applySession(session, isRestored: false)
            authPassword = ""
            statusMessage = "Sessió iniciada correctament amb \(authUserEmail)."
            isLoading = false
            if canSync && !hasSyncConflict {
                await syncNow(announceStatus: false)
            }
        } catch let error as SupabaseAuthClientError {
            statusMessage = error.localizedDescription
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    func signUp() async {
        guard canAttemptLogin else {
            statusMessage = "Omple URL, anon key, email i contrasenya per crear el compte."
            return
        }

        guard beginTask("Creant compte a Supabase...") else { return }

        let projectURLText = projectURL
        let anonKeyText = anonKey
        let email = authEmail.trimmingCharacters(in: .whitespacesAndNewlines)
        let password = authPassword

        defer { isLoading = false }

        do {
            let redirectURL = try normalizedAuthRedirectURL()
            let authClient = try makeAuthClient(projectURLText: projectURLText, anonKeyText: anonKeyText)
            let result = try await authClient.signUp(
                email: email,
                password: password,
                emailRedirectTo: redirectURL
            )

            authPassword = ""

            if let session = result.session {
                try storeSession(session)
                isPasswordResetFlowActive = false
                applySession(session, isRestored: false)
                statusMessage = "Compte creat i sessió oberta amb \(authUserEmail)."
                if isManagedConnection {
                    isLoading = false
                    await loadRemote()
                }
            } else {
                clearSessionState()
                authUserEmail = result.user?.email ?? email
                authStateLabel = "Confirmació pendent"
                persistInputs()
                if redirectURL == nil {
                    statusMessage = "Compte creat. Revisa el correu i confirma'l abans d'iniciar sessió."
                } else {
                    statusMessage = "Compte creat. Rebràs un correu de confirmació cap a la URL indicada."
                }
            }
        } catch let error as SupabaseAuthClientError {
            statusMessage = error.localizedDescription
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    func refreshSession() async {
        guard let session = currentSession else {
            statusMessage = "No hi ha cap sessió activa per refrescar."
            return
        }

        guard beginTask("Refrescant la sessió...") else { return }
        defer { isLoading = false }

        do {
            let authClient = try makeAuthClient(projectURLText: projectURL, anonKeyText: anonKey)
            let refreshedSession = try await authClient.refreshSession(session)
            try storeSession(refreshedSession)
            isPasswordResetFlowActive = false
            applySession(refreshedSession, isRestored: false)
            statusMessage = "Sessió refrescada correctament."
            if isManagedConnection {
                isLoading = false
                await loadRemote()
            }
        } catch let error as SupabaseAuthClientError {
            statusMessage = error.localizedDescription
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    func signOut() async {
        guard beginTask("Tancant la sessió...") else { return }
        defer { isLoading = false }

        let session = currentSession
        do {
            if let session {
                let authClient = try? makeAuthClient(projectURLText: projectURL, anonKeyText: anonKey)
                try await authClient?.signOut(accessToken: session.accessToken)
            }
        } catch {
            statusMessage = "He desconnectat l'app, però Supabase ha retornat: \(error.localizedDescription)"
        }

        try? clearStoredSession()
        clearSessionState()
        authPassword = ""
        statusMessage = "Sessió tancada."
    }

    func requestPasswordReset() async {
        guard canAttemptPasswordRecovery else {
            statusMessage = "Omple URL, anon key i email per demanar la recuperació."
            return
        }

        guard beginTask("Enviant correu de recuperació...") else { return }
        defer { isLoading = false }

        do {
            let redirectURL = try normalizedAuthRedirectURL()
            let authClient = try makeAuthClient(projectURLText: projectURL, anonKeyText: anonKey)
            let email = authEmail.trimmingCharacters(in: .whitespacesAndNewlines)
            try await authClient.requestPasswordReset(email: email, redirectTo: redirectURL)
            if redirectURL == nil {
                statusMessage = "He enviat el correu de recuperació a \(email)."
            } else {
                statusMessage = "He enviat el correu de recuperació a \(email) amb la URL de retorn configurada."
            }
        } catch let error as SupabaseAuthClientError {
            statusMessage = error.localizedDescription
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    func processIncomingAuthLink() async {
        let rawLink = authIncomingLink.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !rawLink.isEmpty else {
            statusMessage = "Enganxa primer l'enllaç del correu."
            return
        }
        guard let url = URL(string: rawLink) else {
            statusMessage = "L'enllaç enganxat no és una URL vàlida."
            return
        }
        await handleAuthRedirect(url)
    }

    func handleAuthRedirect(_ url: URL) async {
        guard beginTask("Processant l'enllaç d'autenticació...") else { return }
        defer { isLoading = false }

        do {
            guard let redirectSession = SupabaseAuthClient.parseRedirectSession(from: url) else {
                throw AppStateError.invalidAuthCallbackURL
            }

            let authClient = try makeAuthClient(projectURLText: projectURL, anonKeyText: anonKey)
            let user = try await authClient.fetchCurrentUser(accessToken: redirectSession.accessToken)
            let session = SupabaseAuthSession(
                accessToken: redirectSession.accessToken,
                refreshToken: redirectSession.refreshToken,
                expiresIn: redirectSession.expiresIn,
                expiresAtUnix: redirectSession.expiresAtUnix,
                tokenType: redirectSession.tokenType,
                user: user
            )

            try storeSession(session)
            applySession(session, isRestored: false)
            authIncomingLink = ""

            if redirectSession.isRecovery {
                isPasswordResetFlowActive = true
                authStateLabel = "Recuperació activa"
                authPassword = ""
                resetPassword = ""
                resetPasswordConfirmation = ""
                statusMessage = "Enllaç de recuperació acceptat. Ara ja pots escriure la nova contrasenya."
            } else {
                isPasswordResetFlowActive = false
                statusMessage = "Enllaç d'autenticació acceptat. Ja tens la sessió activa."
                if isManagedConnection {
                    isLoading = false
                    await loadRemote()
                }
            }
        } catch let error as SupabaseAuthClientError {
            statusMessage = error.localizedDescription
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    func updatePasswordFromRecovery() async {
        guard isPasswordResetFlowActive else {
            statusMessage = "Primer cal obrir un enllaç de recuperació."
            return
        }
        guard let session = currentSession else {
            statusMessage = "No hi ha cap sessió activa de recuperació."
            return
        }
        guard resetPassword.count >= 8 else {
            statusMessage = "La nova contrasenya ha de tenir com a mínim 8 caràcters."
            return
        }
        guard resetPassword == resetPasswordConfirmation else {
            statusMessage = "Les dues contrasenyes noves no coincideixen."
            return
        }

        guard beginTask("Actualitzant la contrasenya...") else { return }
        defer { isLoading = false }

        do {
            let authClient = try makeAuthClient(projectURLText: projectURL, anonKeyText: anonKey)
            try await authClient.updatePassword(
                accessToken: session.accessToken,
                newPassword: resetPassword
            )
            let refreshedSession = SupabaseAuthSession(
                accessToken: session.accessToken,
                refreshToken: session.refreshToken,
                expiresIn: session.expiresIn,
                expiresAtUnix: session.expiresAtUnix,
                tokenType: session.tokenType,
                user: session.user
            )
            try storeSession(refreshedSession)
            applySession(refreshedSession, isRestored: false)
            isPasswordResetFlowActive = false
            resetPassword = ""
            resetPasswordConfirmation = ""
            statusMessage = "Contrasenya actualitzada correctament."
        } catch let error as SupabaseAuthClientError {
            statusMessage = error.localizedDescription
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    // MARK: - Sync Methods

    /// Refresca el token de sessió si ha caducat o caduca aviat.
    /// Retorna `true` si la sessió és vàlida per continuar.
    private func ensureSessionFresh() async -> Bool {
        guard let session = currentSession else { return false }
        guard session.isExpired(buffer: 120) else { return true }

        do {
            let authClient = try makeAuthClient(projectURLText: projectURL, anonKeyText: anonKey)
            let refreshedSession = try await authClient.refreshSession(session)
            try storeSession(refreshedSession)
            applySession(refreshedSession, isRestored: false)
            return true
        } catch {
            try? clearStoredSession()
            clearSessionState()
            statusMessage = "La sessió ha caducat. Torna a iniciar sessió."
            return false
        }
    }

    func loadRemote(announceStatus: Bool = true) async {
        guard canSync else {
            if announceStatus {
                statusMessage = "Inicia sessió abans de carregar el workspace remot."
            }
            return
        }

        guard await ensureSessionFresh() else { return }

        guard beginTask("Carregant workspace remot...", announceStatus: announceStatus) else { return }

        let projectURLText = projectURL
        let token = sessionToken
        let currentWorkspaceId = workspaceId

        defer { isLoading = false }

        do {
            let client = try makeSyncClient(projectURLText: projectURLText, sessionToken: token)
            let head = try await client.fetchHead(workspaceId: currentWorkspaceId)
            let shouldAutoApplyManagedRemote =
                isManagedConnection &&
                workspaceOutlineRows.isEmpty &&
                pendingOperations.isEmpty &&
                head != nil

            if let head {
                if shouldAutoApplyManagedRemote {
                    try applyHeadToLocalModel(
                        head,
                        status: "Hem recuperat el teu espai i ja el tens llest per continuar.",
                        announceStatus: announceStatus
                    )
                    return
                }

                lastHead = head
                hasSyncConflict = false
                remotePreviewText = try head.payloadJson.prettyPrintedString()
                updateSyncBaselineIfLocalMatchesRemote()
                if announceStatus {
                    if lastLocalPayloadSignature == head.payloadSignature {
                        statusMessage = isManagedConnection
                            ? "El teu espai està al dia i preparat per continuar."
                            : "Workspace remot carregat i alineat amb el model local."
                    } else {
                        statusMessage = isManagedConnection
                            ? "Hem carregat la darrera versió remota del teu espai."
                            : "Workspace remot carregat. Si el vols portar al model natiu, prem 'Aplicar remot al model'."
                    }
                }
            } else {
                lastHead = nil
                remotePreviewText = ""
                clearSyncBaseline()
                hasSyncConflict = false
                if announceStatus {
                    statusMessage = isManagedConnection
                        ? "Encara no hi ha contingut al teu espai remot. Pots començar creant la primera carpeta o document."
                        : "Encara no hi ha cap cap remot per a \(currentWorkspaceId)."
                }
            }
        } catch let error as SutsumuSyncClientError {
            handleSyncError(error)
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    func commitLocal(announceStatus: Bool = true) async {
        guard canSync else {
            if announceStatus {
                statusMessage = "Inicia sessió abans d'enviar una revisió."
            }
            return
        }

        guard await ensureSessionFresh() else { return }
        guard beginTask("Enviant revisió al backend...", announceStatus: announceStatus) else { return }

        let projectURLText = projectURL
        let token = sessionToken
        let currentWorkspaceId = workspaceId
        let currentWorkspaceName = workspaceName
        let currentHeadRevisionId = expectedHeadRevisionIdForCommit
        let currentDeviceLabel = deviceLabel
        let currentDeviceId = localDeviceId
        let pendingOperations = self.pendingOperations
        let requiresSnapshotCommit = self.requiresSnapshotCommit

        defer { isLoading = false }

        do {
            let client = try makeSyncClient(projectURLText: projectURLText, sessionToken: token)
            let payload = try workspaceModel.payloadJSON()
            let payloadText = try payload.prettyPrintedString()
            localPayloadText = payloadText
            let payloadSignature = try payload.sha256Signature()
            lastLocalPayloadSignature = payloadSignature
            persistInputs()
            let shouldSendIncremental =
                !requiresSnapshotCommit &&
                !pendingOperations.isEmpty &&
                !currentHeadRevisionId.isEmpty
            let request = CommitRequest(
                workspaceId: currentWorkspaceId,
                workspaceName: currentWorkspaceName,
                expectedHeadRevisionId: currentHeadRevisionId,
                payloadSignature: payloadSignature,
                clientSavedAt: ISO8601DateFormatter().string(from: .now),
                payloadJson: shouldSendIncremental ? nil : payload,
                operations: shouldSendIncremental ? pendingOperations : [],
                commitMode: shouldSendIncremental ? "incremental" : "snapshot",
                device: DeviceDescriptor(
                    localDeviceId: currentDeviceId,
                    label: currentDeviceLabel,
                    platform: Self.platformLabel
                )
            )
            let head = try await client.commit(request)
            try applyHeadToLocalModel(
                head,
                status: "Revisió enviada correctament: \(head.headRevisionId)",
                announceStatus: announceStatus
            )
        } catch let error as SutsumuSyncClientError {
            handleSyncError(error)
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    func syncNow(announceStatus: Bool = true) async {
        await loadRemote(announceStatus: announceStatus)
        if hasSyncConflict { return }

        if isRemoteAheadOfLocal {
            applyRemoteToLocal(announceStatus: announceStatus)
            return
        }

        // Primera sync: cap historial, model local genuïnament buit (sense cap doc, ni eliminats) →
        // el servidor mana. Distingim "buit de debò" de "tots els elements marcats com a esborrats",
        // perquè en el segon cas hi ha canvis locals pendents que s'han de confirmar.
        if lastHead != nil && lastSyncedRevisionId.isEmpty && workspaceModel.docs.isEmpty {
            applyRemoteToLocal(announceStatus: announceStatus)
            return
        }

        if hasUnsyncedLocalChanges {
            await commitLocal(announceStatus: announceStatus)
        }
    }

    func applyRemoteToLocal(announceStatus: Bool = true) {
        guard let lastHead else { return }
        do {
            try applyHeadToLocalModel(
                lastHead,
                status: "La revisió remota s'ha aplicat al model natiu.",
                announceStatus: announceStatus
            )
        } catch {
            statusMessage = "No he pogut aplicar el payload remot al model local."
        }
    }

    func formatLocalPayload() {
        do {
            localPayloadText = try JSONValue(jsonString: localPayloadText).prettyPrintedString()
            _ = rebuildWorkspaceFromLocalJSON(showStatus: false, markAsSnapshotSource: true)
            persistInputs()
            statusMessage = "JSON local validat i formatat."
        } catch {
            statusMessage = "El JSON local no és vàlid: \(error.localizedDescription)"
        }
    }

    func importLocalPayload(from url: URL) throws {
        let didStartScopedAccess = url.startAccessingSecurityScopedResource()
        defer {
            if didStartScopedAccess {
                url.stopAccessingSecurityScopedResource()
            }
        }

        let data = try Data(contentsOf: url)
        guard let rawText = String(data: data, encoding: .utf8) else {
            throw AppStateError.invalidLocalDocument
        }

        localPayloadText = try JSONValue(jsonString: rawText).prettyPrintedString()
        localDocumentName = url.lastPathComponent
        _ = rebuildWorkspaceFromLocalJSON(showStatus: false, markAsSnapshotSource: true)
        persistInputs()
        statusMessage = "JSON local importat: \(localDocumentName)"
    }

    func makeExportDocument() throws -> WorkspaceTextDocument {
        localPayloadText = try JSONValue(jsonString: localPayloadText).prettyPrintedString()
        persistInputs()
        return WorkspaceTextDocument(text: localPayloadText)
    }

    func importAttachment(from url: URL) async {
        guard let selectedItemId, let selectedItem, selectedItem.isDocument else {
            statusMessage = "Selecciona un document abans d'afegir-hi un adjunt."
            return
        }

        guard let currentSession else {
            statusMessage = "Inicia sessió abans de pujar adjunts."
            return
        }

        guard beginTask("Pujant adjunt a Supabase Storage...") else { return }

        let didStartScopedAccess = url.startAccessingSecurityScopedResource()
        defer {
            if didStartScopedAccess {
                url.stopAccessingSecurityScopedResource()
            }
            isLoading = false
        }

        do {
            let importDraft = try await Task.detached(priority: .userInitiated) {
                try AttachmentImportDraft.load(
                    from: url,
                    userId: currentSession.user.id
                )
            }.value

            let storageClient = try makeStorageClient(
                projectURLText: projectURL,
                anonKeyText: anonKey,
                sessionToken: sessionToken
            )
            let uploadResult = try await storageClient.upload(
                data: importDraft.data,
                objectKey: importDraft.objectKey,
                contentType: importDraft.mimeType
            )

            let didUpdate = workspaceModel.updateItem(id: selectedItemId) { item in
                item.attachment = SutsumuWorkspaceAttachment(
                    fileName: importDraft.fileName,
                    fileType: importDraft.mimeType,
                    fileSize: importDraft.fileSize,
                    sourceFormat: importDraft.sourceFormat,
                    checksum: importDraft.checksum,
                    remoteObjectKey: uploadResult.objectKey,
                    availability: uploadResult.existedAlready ? "uploaded-cached" : "uploaded"
                )
            }

            guard didUpdate, let updatedItem = workspaceModel.item(id: selectedItemId) else {
                statusMessage = "L'adjunt s'ha pujat, però no he pogut actualitzar el document local."
                return
            }

            loadEditor(from: updatedItem)
            recordPendingOperation(.upsert(item: updatedItem, summary: "attachment:upload:\(updatedItem.id)"))
            syncLocalPayloadFromWorkspace(
                status: uploadResult.existedAlready
                    ? "Adjunt reutilitzat des de Storage i vinculat al document."
                    : "Adjunt pujat i vinculat al document."
            )
        } catch let error as SupabaseStorageClientError {
            statusMessage = error.localizedDescription
        } catch {
            statusMessage = "No he pogut pujar l'adjunt: \(error.localizedDescription)"
        }
    }

    func removeSelectedAttachment() {
        guard let selectedItemId, let selectedItem, selectedItem.isDocument else {
            statusMessage = "Selecciona un document abans de treure l'adjunt."
            return
        }

        guard workspaceModel.updateItem(id: selectedItemId, mutate: { item in
            item.attachment = nil
        }), let updatedItem = workspaceModel.item(id: selectedItemId) else {
            statusMessage = "No he pogut treure l'adjunt del document."
            return
        }

        loadEditor(from: updatedItem)
        clearDownloadedAttachmentPreview()
        recordPendingOperation(.upsert(item: updatedItem, summary: "attachment:remove:\(updatedItem.id)"))
        syncLocalPayloadFromWorkspace(status: "Adjunt eliminat del document.")
    }

    func downloadSelectedAttachment() async {
        guard let attachment = selectedAttachment else {
            statusMessage = "Aquest document no té cap adjunt per descarregar."
            return
        }

        let objectKey = attachment.remoteObjectKey?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        guard !objectKey.isEmpty else {
            statusMessage = "L'adjunt encara no té una ruta remota disponible."
            return
        }

        guard beginTask("Descarregant adjunt remot...") else { return }
        defer { isLoading = false }

        do {
            let storageClient = try makeStorageClient(
                projectURLText: projectURL,
                anonKeyText: anonKey,
                sessionToken: sessionToken
            )
            let download = try await storageClient.download(objectKey: objectKey)
            let localURL = try Self.writeDownloadedAttachmentToTemporaryLocation(
                data: download.data,
                suggestedFileName: attachment.fileName.isEmpty ? download.suggestedFileName : attachment.fileName
            )
            let preview = Self.makeAttachmentPreview(
                data: download.data,
                mimeType: download.mimeType,
                sourceFormat: attachment.sourceFormat
            )

            downloadedAttachmentURL = localURL
            downloadedAttachmentDisplayName = localURL.lastPathComponent
            downloadedAttachmentObjectKey = objectKey
            downloadedAttachmentPreviewText = preview.textPreview
            downloadedAttachmentPreviewMIMEType = download.mimeType
            downloadedAttachmentImageData = preview.imageData
            statusMessage = "Adjunt descarregat correctament."
        } catch let error as SupabaseStorageClientError {
            statusMessage = error.localizedDescription
        } catch {
            statusMessage = "No he pogut descarregar l'adjunt: \(error.localizedDescription)"
        }
    }

    func applyRemoteAttachmentToSelectedItem() {
        applyRemoteSelectedItem()
    }

    func keepLocalAttachmentAndResolveConflict() {
        keepLocalSelectedItemAndResolveConflict()
    }

    func applyRemoteSelectedItem() {
        guard let selectedItemId, selectedItem != nil else {
            statusMessage = "Selecciona un element abans d'aplicar l'estat remot."
            return
        }

        guard let remoteItem = selectedRemoteItem else {
            statusMessage = "Aquest element no existeix al remot. Si el vols eliminar del tot, aplica el remot a tot el model."
            return
        }

        guard workspaceModel.updateItem(id: selectedItemId, mutate: { item in
            item = remoteItem
        }), let updatedItem = workspaceModel.item(id: selectedItemId) else {
            statusMessage = "No he pogut aplicar l'element remot."
            return
        }

        prunePendingOperations(affecting: [selectedItemId])
        loadEditor(from: updatedItem)
        hasSyncConflict = false
        syncLocalPayloadFromWorkspace(
            status: "S'ha aplicat la versió remota a l'element seleccionat."
        )
    }

    func keepLocalSelectedItemAndResolveConflict() {
        guard let selectedItem else {
            statusMessage = "Selecciona un element abans de mantenir la versió local."
            return
        }

        prunePendingOperations(affecting: [selectedItem.id])
        hasSyncConflict = false
        recordPendingOperation(.upsert(item: selectedItem, summary: "item:keep-local:\(selectedItem.id)"))
        syncLocalPayloadFromWorkspace(status: "Mantindré la versió local de l'element. Ja la pots tornar a enviar.")
    }

    func rebuildWorkspaceFromLocalJSON(showStatus: Bool = true, markAsSnapshotSource: Bool = true) -> Bool {
        do {
            let payload = try JSONValue(jsonString: localPayloadText)
            workspaceModel = try SutsumuWorkspace(payloadJSON: payload)
            lastLocalPayloadSignature = try payload.sha256Signature()
            updateSyncBaselineIfLocalMatchesRemote()
            if markAsSnapshotSource {
                pendingOperations = []
                requiresSnapshotCommit = true
                scheduleAutoSyncAfterLocalChange()
            }
            restoreSelectionAfterWorkspaceReload()
            persistInputs()
            if showStatus {
                statusMessage = "Model natiu reconstruït des del JSON local."
            }
            return true
        } catch {
            if showStatus {
                statusMessage = "No he pogut reconstruir el model natiu: \(error.localizedDescription)"
            }
            return false
        }
    }

    // MARK: - Workspace Methods
    
    func createFolderFromSelection() {
        let parentId = workspaceModel.suggestedParentId(for: selectedItemId)
        let item = workspaceModel.createFolder(title: "Nova carpeta", parentId: parentId)
        recordPendingOperation(.upsert(item: item, summary: "folder:create:\(item.id)"))
        selectItem(id: item.id)
        syncLocalPayloadFromWorkspace(status: "Carpeta creada al model natiu.")
    }

    func createDocumentFromSelection() {
        let parentId = workspaceModel.suggestedParentId(for: selectedItemId)
        let item = workspaceModel.createDocument(title: "Nou document", parentId: parentId)
        recordPendingOperation(.upsert(item: item, summary: "document:create:\(item.id)"))
        selectItem(id: item.id)
        syncLocalPayloadFromWorkspace(status: "Document creat al model natiu.")
    }

    func selectItem(id: String) {
        guard let item = workspaceModel.item(id: id), !item.isDeleted else { return }
        selectedItemId = id
        loadEditor(from: item)
    }

    func applySelectedEdits() {
        guard let selectedItemId, canApplySelectedEdits else {
            statusMessage = "Selecciona un element i posa-li un títol."
            return
        }

        let cleanedTitle = editorTitle.trimmingCharacters(in: .whitespacesAndNewlines)
        let cleanedTags = parseTags(editorTagsText)
        let editorCategory = self.editorCategory.trimmingCharacters(in: .whitespacesAndNewlines)
        let editorDescription = self.editorDescription.trimmingCharacters(in: .whitespacesAndNewlines)
        let editorColor = self.editorColor.trimmingCharacters(in: .whitespacesAndNewlines)
        let editorContent = self.editorContent
        let editorIsFavorite = self.editorIsFavorite
        let editorIsPinned = self.editorIsPinned
        let editorParentId = self.editorParentId
        let parentIsValid = workspaceModel.isValidParent(editorParentId, for: selectedItemId)

        let updated = workspaceModel.updateItem(id: selectedItemId) { item in
            item.title = cleanedTitle
            item.tags = cleanedTags
            item.isFavorite = editorIsFavorite
            item.isPinned = editorIsPinned
            if parentIsValid {
                item.parentId = editorParentId
            }

            if item.isFolder {
                item.desc = editorDescription
                item.color = editorColor.isEmpty ? "#0ea5e9" : editorColor
            } else {
                item.category = editorCategory
                item.content = editorContent
            }
        }

        guard updated, let item = workspaceModel.item(id: selectedItemId) else {
            statusMessage = "No he pogut aplicar els canvis a l'element seleccionat."
            return
        }

        loadEditor(from: item)
        recordPendingOperation(.upsert(item: item, summary: "item:update:\(item.id)"))
        syncLocalPayloadFromWorkspace(status: "Canvis aplicats al model natiu.")
    }

    func deleteSelectedItem() {
        guard let selectedItemId, let selected = selectedItem else {
            statusMessage = "No hi ha cap element seleccionat per esborrar."
            return
        }

        guard workspaceModel.markDeleted(id: selectedItemId) else {
            statusMessage = "No he pogut marcar aquest element com a esborrat."
            return
        }

        let deletedItemIDs = workspaceModel.deletionScopeIDs(for: selectedItemId)

        restoreSelectionAfterWorkspaceReload(previousSelection: selected.id)
        recordPendingOperation(
            .delete(
                itemIDs: deletedItemIDs,
                summary: selected.isFolder
                    ? "folder:delete:\(selected.id)"
                    : "document:delete:\(selected.id)"
            )
        )
        syncLocalPayloadFromWorkspace(
            status: selected.isFolder
                ? "Carpeta marcada com a esborrada al model natiu."
                : "Document marcat com a esborrat al model natiu."
        )
    }

    func moveItem(id: String, toParentId: String) {
        guard workspaceModel.isValidParent(toParentId, for: id) else {
            statusMessage = "No puc moure l'element a aquell destí."
            return
        }
        guard workspaceModel.moveItem(id: id, toParentId: toParentId),
              let updated = workspaceModel.item(id: id) else { return }
        if selectedItemId == id {
            editorParentId = toParentId
        }
        recordPendingOperation(.upsert(item: updated, summary: "item:move:\(id)"))
        syncLocalPayloadFromWorkspace(status: nil)
    }

    func availableFolderDestinations(excludingId: String) -> [(id: String, title: String, depth: Int)] {
        var result: [(id: String, title: String, depth: Int)] = [(id: "root", title: "Arrel", depth: 0)]
        for row in workspaceOutlineRows where row.type == .folder && row.id != excludingId {
            if workspaceModel.isValidParent(row.id, for: excludingId) {
                result.append((id: row.id, title: row.title, depth: row.depth))
            }
        }
        return result
    }

    // MARK: - Helper Methods

    var suggestedExportFilename: String {
        let trimmedName = localDocumentName.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmedName.isEmpty {
            return "\(workspaceId).json"
        }
        if trimmedName.lowercased().hasSuffix(".json") {
            return trimmedName
        }
        return "\(trimmedName).json"
    }

    private func syncLocalPayloadFromWorkspace(status: String?, showStatus: Bool = true) {
        do {
            let payload = try workspaceModel.payloadJSON()
            localPayloadText = try payload.prettyPrintedString()
            lastLocalPayloadSignature = try payload.sha256Signature()
            updateSyncBaselineIfLocalMatchesRemote()
            persistInputs()
            if showStatus, let status {
                statusMessage = status
            }
        } catch {
            if showStatus {
                statusMessage = "No he pogut regenerar el JSON local des del model natiu."
            }
        }
    }

    private func restoreSelectionAfterWorkspaceReload(previousSelection: String? = nil) {
        let candidate = previousSelection ?? selectedItemId
        if let candidate, let item = workspaceModel.item(id: candidate), !item.isDeleted {
            selectedItemId = candidate
            loadEditor(from: item)
            return
        }

        guard let fallback = workspaceModel.outlineRows().first,
              let item = workspaceModel.item(id: fallback.id) else {
            selectedItemId = nil
            clearEditor()
            return
        }

        selectedItemId = fallback.id
        loadEditor(from: item)
    }

    private func loadEditor(from item: SutsumuWorkspaceItem) {
        if item.attachment?.remoteObjectKey != downloadedAttachmentObjectKey {
            clearDownloadedAttachmentPreview()
        }
        editorTitle = item.title
        editorTagsText = item.tags.joined(separator: ", ")
        editorIsFavorite = item.isFavorite
        editorIsPinned = item.isPinned
        editorParentId = item.parentId
        if item.isFolder {
            editorCategory = ""
            editorContent = ""
            editorDescription = item.desc
            editorColor = item.color
        } else {
            editorCategory = item.category
            editorContent = item.content
            editorDescription = ""
            editorColor = "#0ea5e9"
        }
    }

    private func clearEditor() {
        clearDownloadedAttachmentPreview()
        editorTitle = ""
        editorTagsText = ""
        editorCategory = ""
        editorContent = ""
        editorDescription = ""
        editorColor = "#0ea5e9"
        editorIsFavorite = false
        editorIsPinned = false
        editorParentId = "root"
    }

    private func parseTags(_ rawValue: String) -> [String] {
        var seen = Set<String>()
        return rawValue
            .split(separator: ",")
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }
            .filter { seen.insert($0.lowercased()).inserted }
    }

    private func storeSession(_ session: SupabaseAuthSession) throws {
        let data = try JSONEncoder().encode(session)
        try keychain.save(data: data, account: authSessionAccount)
    }

    private func loadStoredSession() throws -> SupabaseAuthSession? {
        guard let data = try keychain.load(account: authSessionAccount) else {
            return nil
        }
        return try JSONDecoder().decode(SupabaseAuthSession.self, from: data)
    }

    private func clearStoredSession() throws {
        try keychain.delete(account: authSessionAccount)
    }

    private func applySession(_ session: SupabaseAuthSession, isRestored: Bool) {
        currentSession = session
        sessionToken = session.accessToken
        authUserEmail = session.user.email ?? authEmail
        authEmail = session.user.email ?? authEmail
        if !isPasswordResetFlowActive {
            authStateLabel = isRestored ? "Sessió restaurada" : "Sessió activa"
        }
        if isSceneActive {
            startPeriodicAutoSyncIfNeeded()
        }
        persistInputs()
    }

    private func clearSessionState() {
        currentSession = nil
        sessionToken = ""
        authUserEmail = ""
        authStateLabel = "No connectat"
        isPasswordResetFlowActive = false
        resetPassword = ""
        resetPasswordConfirmation = ""
        autoSyncDebounceTask?.cancel()
        autoSyncDebounceTask = nil
        stopPeriodicAutoSync()
    }

    private func normalizedAuthRedirectURL() throws -> URL? {
        let trimmed = authRedirectURL.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return nil }
        guard let url = URL(string: trimmed), url.scheme != nil else {
            throw AppStateError.invalidAuthRedirectURL
        }
        return url
    }

    private func makeSyncClient(projectURLText: String, sessionToken: String) throws -> SutsumuSyncClient {
        let trimmedProjectURL = projectURLText.trimmingCharacters(in: .whitespacesAndNewlines)
        let trimmedSessionToken = sessionToken.trimmingCharacters(in: .whitespacesAndNewlines)

        guard let url = URL(string: trimmedProjectURL), !trimmedProjectURL.isEmpty else {
            throw AppStateError.invalidProjectURL
        }

        let configuration = SupabaseEdgeConfiguration(projectURL: url)
        return SutsumuSyncClient(configuration: configuration) {
            trimmedSessionToken
        }
    }

    private func makeAuthClient(projectURLText: String, anonKeyText: String) throws -> SupabaseAuthClient {
        let trimmedProjectURL = projectURLText.trimmingCharacters(in: .whitespacesAndNewlines)
        let trimmedAnonKey = anonKeyText.trimmingCharacters(in: .whitespacesAndNewlines)

        guard let url = URL(string: trimmedProjectURL), !trimmedProjectURL.isEmpty else {
            throw AppStateError.invalidProjectURL
        }
        guard !trimmedAnonKey.isEmpty else {
            throw AppStateError.missingAnonKey
        }

        let configuration = SupabaseAuthConfiguration(projectURL: url, anonKey: trimmedAnonKey)
        return SupabaseAuthClient(configuration: configuration)
    }

    private func makeStorageClient(
        projectURLText: String,
        anonKeyText: String,
        sessionToken: String
    ) throws -> SupabaseStorageClient {
        let trimmedProjectURL = projectURLText.trimmingCharacters(in: .whitespacesAndNewlines)
        let trimmedAnonKey = anonKeyText.trimmingCharacters(in: .whitespacesAndNewlines)
        let trimmedSessionToken = sessionToken.trimmingCharacters(in: .whitespacesAndNewlines)

        guard let url = URL(string: trimmedProjectURL), !trimmedProjectURL.isEmpty else {
            throw AppStateError.invalidProjectURL
        }
        guard !trimmedAnonKey.isEmpty else {
            throw AppStateError.missingAnonKey
        }
        guard !trimmedSessionToken.isEmpty else {
            throw AppStateError.missingSessionToken
        }

        let configuration = SupabaseStorageConfiguration(projectURL: url, anonKey: trimmedAnonKey)
        return SupabaseStorageClient(configuration: configuration, accessToken: trimmedSessionToken)
    }

    private func beginTask(_ pendingMessage: String, announceStatus: Bool = true) -> Bool {
        if isLoading { return false }
        isLoading = true
        if announceStatus {
            statusMessage = pendingMessage
        }
        persistInputs()
        return true
    }

    private func applyHeadToLocalModel(_ head: WorkspaceHead, status: String, announceStatus: Bool = true) throws {
        let payloadText = try head.payloadJson.prettyPrintedString()
        let payloadSignature = head.payloadSignature.isEmpty
            ? try head.payloadJson.sha256Signature()
            : head.payloadSignature

        workspaceName = head.workspaceName
        lastHead = head
        remotePreviewText = payloadText
        localPayloadText = payloadText
        workspaceModel = try SutsumuWorkspace(payloadJSON: head.payloadJson)
        lastLocalPayloadSignature = payloadSignature
        updateSyncBaseline(
            revisionId: head.headRevisionId,
            payloadSignature: payloadSignature
        )
        hasSyncConflict = false
        pendingOperations = []
        requiresSnapshotCommit = false
        restoreSelectionAfterWorkspaceReload()
        persistInputs()
        if announceStatus {
            statusMessage = status
        }
    }

    private func handleSyncError(_ error: SutsumuSyncClientError) {
        switch error {
        case .conflict(let currentHead):
            hasSyncConflict = true
            lastHead = currentHead
            if let currentHead {
                remotePreviewText = (try? currentHead.payloadJson.prettyPrintedString()) ?? remotePreviewText
                statusMessage = "Conflicte remot: el backend ja té una altra revisió activa."
            } else {
                statusMessage = "Conflicte remot sense cap detall del backend."
            }
        default:
            statusMessage = error.localizedDescription
        }
    }

    private func updateSyncBaselineIfLocalMatchesRemote() {
        guard let lastHead, !lastHead.payloadSignature.isEmpty else { return }
        if lastLocalPayloadSignature == lastHead.payloadSignature {
            updateSyncBaseline(
                revisionId: lastHead.headRevisionId,
                payloadSignature: lastHead.payloadSignature
            )
            hasSyncConflict = false
        }
    }

    private func recordPendingOperation(_ operation: SutsumuWorkspaceOperation) {
        pendingOperations.append(operation)
        requiresSnapshotCommit = false
        persistInputs()
        scheduleAutoSyncAfterLocalChange()
    }

    private func prunePendingOperations(affecting itemIDs: [String]) {
        let identifiers = Set(itemIDs)
        pendingOperations.removeAll { operation in
            !identifiers.isDisjoint(with: operation.affectedItemIDs)
        }
        persistInputs()
    }

    private var remoteWorkspaceModel: SutsumuWorkspace? {
        guard let lastHead else { return nil }
        return try? SutsumuWorkspace(payloadJSON: lastHead.payloadJson)
    }

    private func itemConflictFields(
        local: SutsumuWorkspaceItem?,
        remote: SutsumuWorkspaceItem?
    ) -> [String] {
        guard let local, let remote else {
            return ["presència"]
        }

        var labels: [String] = []
        if local.type != remote.type { labels.append("tipus") }
        if local.title != remote.title { labels.append("títol") }
        if local.parentId != remote.parentId { labels.append("pare") }
        if local.tags != remote.tags { labels.append("etiquetes") }
        if local.isFavorite != remote.isFavorite { labels.append("favorit") }
        if local.isPinned != remote.isPinned { labels.append("fixat") }
        if local.isDeleted != remote.isDeleted { labels.append("estat") }

        if local.isFolder || remote.isFolder {
            if local.desc != remote.desc { labels.append("descripció") }
            if local.color != remote.color { labels.append("color") }
        } else {
            if local.category != remote.category { labels.append("categoria") }
            if local.content != remote.content { labels.append("contingut") }
            if local.attachment != remote.attachment { labels.append("adjunt") }
        }

        if local.versions != remote.versions {
            labels.append("versions")
        }

        return labels
    }

    private func itemConflictSummary(
        for item: SutsumuWorkspaceItem?,
        emptyLabel: String
    ) -> String {
        guard let item else { return emptyLabel }

        let tagLabel = item.tags.isEmpty ? "sense etiquetes" : "\(item.tags.count) etiquetes"
        let favoriteLabel = item.isFavorite ? "favorit" : "no favorit"
        let pinnedLabel = item.isPinned ? "fixat" : "no fixat"

        if item.isFolder {
            let descLabel = item.desc.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? "sense descripció" : "amb descripció"
            return "Carpeta · \(item.title) · \(tagLabel) · \(favoriteLabel) · \(pinnedLabel) · \(descLabel)"
        }

        let categoryLabel = item.category.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? "sense categoria" : item.category
        let attachmentLabel = item.attachment?.fileName.isEmpty == false ? (item.attachment?.fileName ?? "adjunt") : "sense adjunt"
        return "Document · \(item.title) · \(categoryLabel) · \(item.content.count) caràcters · \(tagLabel) · \(attachmentLabel)"
    }

    private func attachmentConflictSummary(
        for attachment: SutsumuWorkspaceAttachment?,
        emptyLabel: String
    ) -> String {
        guard let attachment else { return emptyLabel }

        let formatter = ByteCountFormatter()
        formatter.allowedUnits = [.useKB, .useMB, .useGB]
        formatter.countStyle = .file
        let sizeLabel = formatter.string(fromByteCount: Int64(attachment.fileSize))
        let typeLabel = attachment.fileType.isEmpty ? "tipus desconegut" : attachment.fileType
        let checksumLabel = attachment.checksum?.isEmpty == false
            ? String((attachment.checksum ?? "").prefix(10))
            : "sense checksum"
        return "\(attachment.fileName) · \(typeLabel) · \(sizeLabel) · \(checksumLabel)"
    }

    private func clearDownloadedAttachmentPreview() {
        downloadedAttachmentURL = nil
        downloadedAttachmentDisplayName = ""
        downloadedAttachmentObjectKey = ""
        downloadedAttachmentPreviewText = ""
        downloadedAttachmentPreviewMIMEType = ""
        downloadedAttachmentImageData = nil
    }

    private func shortSignature(_ value: String?) -> String? {
        let trimmed = value?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        guard !trimmed.isEmpty else { return nil }
        return String(trimmed.prefix(12))
    }

    private static var defaultDeviceLabel: String {
        #if os(macOS)
        return Host.current().localizedName ?? "Mac"
        #elseif canImport(UIKit)
        return UIDevice.current.name
        #else
        return "Apple Device"
        #endif
    }

    private static var platformLabel: String {
        #if os(macOS)
        return "macOS"
        #elseif os(iOS)
        return "iOS"
        #else
        return "Apple"
        #endif
    }

    private static var defaultAuthRedirectURL: String {
        #if os(iOS)
        return "cat.sergicastillo.sutsumu.v2://auth"
        #else
        return ""
        #endif
    }

    private func scheduleAutoSyncAfterLocalChange() {
        guard isSceneActive else { return }

        autoSyncDebounceTask?.cancel()
        autoSyncDebounceTask = Task { @MainActor [weak self] in
            try? await Task.sleep(nanoseconds: Self.autoSyncDebounceNanoseconds)
            guard !Task.isCancelled else { return }
            await self?.performAutomaticSyncIfPossible()
        }
    }

    private func performAutomaticSyncIfPossible() async {
        guard isSceneActive, canSync, !isLoading, !hasSyncConflict else { return }
        await syncNow(announceStatus: false)
    }

    private func startPeriodicAutoSyncIfNeeded() {
        guard periodicSyncTask == nil else { return }

        periodicSyncTask = Task { @MainActor [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(nanoseconds: Self.periodicAutoSyncNanoseconds)
                guard !Task.isCancelled else { return }
                await self?.performAutomaticSyncIfPossible()
            }
        }
    }

    private func stopPeriodicAutoSync() {
        periodicSyncTask?.cancel()
        periodicSyncTask = nil
    }

    private var expectedHeadRevisionIdForCommit: String {
        SyncBaselineState.expectedHeadRevisionId(
            lastSyncedRevisionId: lastSyncedRevisionId,
            lastHeadRevisionId: lastHead?.headRevisionId ?? "",
            localPayloadSignature: lastLocalPayloadSignature,
            remotePayloadSignature: lastHead?.payloadSignature
        )
    }

    private func restorePersistedSyncBaseline() {
        guard let data = defaults.data(forKey: syncBaselineKey),
              let baseline = try? JSONDecoder().decode(PersistedSyncBaseline.self, from: data) else {
            return
        }

        guard baseline.workspaceId == workspaceId else {
            defaults.removeObject(forKey: syncBaselineKey)
            return
        }

        lastSyncedRevisionId = baseline.revisionId
        lastSyncedPayloadSignature = baseline.payloadSignature
    }

    private func persistSyncBaseline() {
        let baseline = PersistedSyncBaseline(
            workspaceId: workspaceId,
            revisionId: lastSyncedRevisionId,
            payloadSignature: lastSyncedPayloadSignature
        )

        if baseline.isEmpty {
            defaults.removeObject(forKey: syncBaselineKey)
            return
        }

        if let data = try? JSONEncoder().encode(baseline) {
            defaults.set(data, forKey: syncBaselineKey)
        }
    }

    private func updateSyncBaseline(revisionId: String, payloadSignature: String) {
        lastSyncedRevisionId = revisionId.trimmingCharacters(in: .whitespacesAndNewlines)
        lastSyncedPayloadSignature = payloadSignature.trimmingCharacters(in: .whitespacesAndNewlines)
        persistSyncBaseline()
    }

    private func clearSyncBaseline() {
        lastSyncedRevisionId = ""
        lastSyncedPayloadSignature = ""
        defaults.removeObject(forKey: syncBaselineKey)
    }

    private struct BundledConfiguration {
        let projectURLText: String
        let anonKey: String
        let supportURL: URL?
        let privacyPolicyURL: URL?

        var hasManagedConnection: Bool {
            !projectURLText.isEmpty && !anonKey.isEmpty
        }

        static let current = BundledConfiguration(bundle: .main)

        init(bundle: Bundle) {
            self.projectURLText = Self.stringValue(forKey: "SutsumuDefaultProjectURL", bundle: bundle)
            self.anonKey = Self.stringValue(forKey: "SutsumuDefaultAnonKey", bundle: bundle)
            self.supportURL = URL(string: Self.stringValue(forKey: "SutsumuSupportURL", bundle: bundle))
            self.privacyPolicyURL = URL(string: Self.stringValue(forKey: "SutsumuPrivacyPolicyURL", bundle: bundle))
        }

        private static func stringValue(forKey key: String, bundle: Bundle) -> String {
            (bundle.object(forInfoDictionaryKey: key) as? String)?
                .trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        }
    }

    private static func writeDownloadedAttachmentToTemporaryLocation(
        data: Data,
        suggestedFileName: String?
    ) throws -> URL {
        let fileManager = FileManager.default
        let folderURL = fileManager.temporaryDirectory.appendingPathComponent("sutsumu-v2-attachments", isDirectory: true)
        try fileManager.createDirectory(at: folderURL, withIntermediateDirectories: true)

        let safeFileName = sanitizeFileName(suggestedFileName)
        let targetURL = folderURL.appendingPathComponent(safeFileName, isDirectory: false)
        try data.write(to: targetURL, options: .atomic)
        return targetURL
    }

    private static func sanitizeFileName(_ candidate: String?) -> String {
        let trimmed = (candidate ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
        let fallback = "adjunt"
        let base = trimmed.isEmpty ? fallback : trimmed
        let filtered = base.map { character -> Character in
            if character == "/" || character == ":" || character == "\n" || character == "\r" {
                return "-"
            }
            return character
        }
        let result = String(filtered).trimmingCharacters(in: .whitespacesAndNewlines)
        return result.isEmpty ? fallback : result
    }

    private static func makeAttachmentPreview(
        data: Data,
        mimeType: String,
        sourceFormat: String
    ) -> AttachmentPreviewContent {
        let normalizedType = mimeType.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        let normalizedFormat = sourceFormat.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()

        if normalizedType.hasPrefix("image/") {
            return AttachmentPreviewContent(textPreview: "", imageData: data)
        }

        if normalizedType.hasPrefix("text/")
            || normalizedType == "application/json"
            || ["json", "txt", "md", "csv", "log"].contains(normalizedFormat) {
            let previewData = data.prefix(32_768)
            let text = String(data: previewData, encoding: .utf8) ?? String(decoding: previewData, as: UTF8.self)
            return AttachmentPreviewContent(textPreview: text, imageData: nil)
        }

        return AttachmentPreviewContent(textPreview: "", imageData: nil)
    }
}

enum AppStateError: LocalizedError {
    case invalidProjectURL
    case invalidAuthRedirectURL
    case invalidAuthCallbackURL
    case missingAnonKey
    case missingSessionToken
    case invalidLocalDocument

    var errorDescription: String? {
        switch self {
        case .invalidProjectURL:
            return "La URL del projecte Supabase no és vàlida."
        case .invalidAuthRedirectURL:
            return "La URL de retorn de confirmació o recuperació no és vàlida."
        case .invalidAuthCallbackURL:
            return "L'enllaç del correu no porta una sessió vàlida per obrir-la dins de l'app."
        case .missingAnonKey:
            return "Falta l'anon key de Supabase."
        case .missingSessionToken:
            return "Cal una sessió activa per pujar adjunts."
        case .invalidLocalDocument:
            return "El fitxer local no és un JSON UTF-8 vàlid."
        }
    }
}

private struct AttachmentImportDraft: Sendable {
    let data: Data
    let fileName: String
    let mimeType: String
    let sourceFormat: String
    let fileSize: Int
    let checksum: String
    let objectKey: String

    static func load(from url: URL, userId: String) throws -> AttachmentImportDraft {
        let resourceValues = try url.resourceValues(forKeys: [
            .contentTypeKey,
            .fileSizeKey,
            .nameKey,
            .localizedNameKey,
        ])
        let data = try Data(contentsOf: url, options: [.mappedIfSafe])
        let fileName = normalizedFileName(from: url, resourceValues: resourceValues)
        let fileType = resourceValues.contentType?.preferredMIMEType
            ?? inferredMimeType(for: url, contentType: resourceValues.contentType)
        let sourceFormat = normalizedSourceFormat(for: url, contentType: resourceValues.contentType)
        let checksum = SupabaseStorageClient.sha256ChecksumHex(for: data)
        let objectKey = SupabaseStorageClient.objectKey(
            userId: userId,
            checksum: checksum,
            preferredExtension: url.pathExtension.isEmpty ? sourceFormat : url.pathExtension
        )

        return AttachmentImportDraft(
            data: data,
            fileName: fileName,
            mimeType: fileType,
            sourceFormat: sourceFormat,
            fileSize: resourceValues.fileSize ?? data.count,
            checksum: checksum,
            objectKey: objectKey
        )
    }

    private static func normalizedFileName(from url: URL, resourceValues: URLResourceValues) -> String {
        let candidates = [
            resourceValues.localizedName,
            resourceValues.name,
            url.lastPathComponent,
        ]
        for candidate in candidates {
            let trimmed = candidate?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
            if !trimmed.isEmpty {
                return trimmed
            }
        }
        return "adjunt"
    }

    private static func normalizedSourceFormat(for url: URL, contentType: UTType?) -> String {
        let extensionCandidate = SupabaseStorageClient.normalizeExtension(url.pathExtension)
        if !extensionCandidate.isEmpty {
            return extensionCandidate
        }
        let preferredExtension = SupabaseStorageClient.normalizeExtension(contentType?.preferredFilenameExtension)
        if !preferredExtension.isEmpty {
            return preferredExtension
        }
        let identifier = contentType?.identifier.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        return identifier.isEmpty ? "binary" : identifier
    }

    private static func inferredMimeType(for url: URL, contentType: UTType?) -> String {
        if let mimeType = contentType?.preferredMIMEType?.trimmingCharacters(in: .whitespacesAndNewlines), !mimeType.isEmpty {
            return mimeType
        }

        let extensionCandidate = SupabaseStorageClient.normalizeExtension(url.pathExtension)
        switch extensionCandidate {
        case "json":
            return "application/json"
        case "txt", "md":
            return "text/plain"
        case "pdf":
            return "application/pdf"
        case "png":
            return "image/png"
        case "jpg", "jpeg":
            return "image/jpeg"
        case "heic":
            return "image/heic"
        case "gif":
            return "image/gif"
        default:
            return "application/octet-stream"
        }
    }
}

private struct AttachmentPreviewContent {
    let textPreview: String
    let imageData: Data?
}

struct SutsumuChecklistItem: Identifiable {
    let id: String
    let title: String
    let detail: String
    let isDone: Bool
}

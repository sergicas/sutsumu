document.addEventListener('DOMContentLoaded', async () => {
  // Elements UI
  const tabs = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Forms
  const addDocBtn = document.getElementById('addDocBtn');
  const addFolderBtn = document.getElementById('addFolderBtn');
  const docNameInput = document.getElementById('docName');
  const docUploadInput = document.getElementById('docUpload');
  const docContentInput = document.getElementById('docContent');
  const docCategorySelect = document.getElementById('docCategory');
  const docTagsInput = document.getElementById('docTags');
  const docTargetFolderSelect = document.getElementById('docTargetFolder');

  const folderNameInput = document.getElementById('folderName');
  const folderDescInput = document.getElementById('folderDesc');
  const folderTargetFolderSelect = document.getElementById('folderTargetFolder');
  const folderColorInput = document.getElementById('folderColor');
  const folderTagsInput = document.getElementById('folderTags');

  // Globals UI
  const searchInput = document.getElementById('searchInput');
  const listEl = document.getElementById('list');
  const docCountEl = document.getElementById('docCount');

  const collapseAllBtn = document.getElementById('collapseAllBtn');
  const expandAllBtn = document.getElementById('expandAllBtn');
  const exportBtn = document.getElementById('exportBtn');
  const importBtn = document.getElementById('importBtn');
  const importFile = document.getElementById('importFile');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const backupNowBtn = document.getElementById('backupNowBtn');
  const backupHistoryBtn = document.getElementById('backupHistoryBtn');
  const backupStatusTextEl = document.getElementById('backupStatusText');
  const backupCountBadgeEl = document.getElementById('backupCountBadge');
  const externalBackupStatusTextEl = document.getElementById('externalBackupStatusText');
  const externalBackupBadgeEl = document.getElementById('externalBackupBadge');
  const connectExternalBackupBtn = document.getElementById('connectExternalBackupBtn');
  const saveExternalBackupBtn = document.getElementById('saveExternalBackupBtn');
  const disconnectExternalBackupBtn = document.getElementById('disconnectExternalBackupBtn');
  const externalBackupHintEl = document.getElementById('externalBackupHint');
  const attachmentHealthTextEl = document.getElementById('attachmentHealthText');
  const attachmentHealthBadgeEl = document.getElementById('attachmentHealthBadge');
  const exportSafeZipBtn = document.getElementById('exportSafeZipBtn');
  const attachmentHealthHintEl = document.getElementById('attachmentHealthHint');
  const workspaceStatusTextEl = document.getElementById('workspaceStatusText');
  const workspaceModeBadgeEl = document.getElementById('workspaceModeBadge');
  const createWorkspaceBtn = document.getElementById('createWorkspaceBtn');
  const openWorkspaceBtn = document.getElementById('openWorkspaceBtn');
  const saveWorkspaceBtn = document.getElementById('saveWorkspaceBtn');
  const saveWorkspaceAsBtn = document.getElementById('saveWorkspaceAsBtn');
  const closeWorkspaceBtn = document.getElementById('closeWorkspaceBtn');
  const workspaceFileInput = document.getElementById('workspaceFileInput');
  const workspaceLocalHintEl = document.getElementById('workspaceLocalHint');
  const workspaceSyncHintEl = document.getElementById('workspaceSyncHint');
  const workspaceRecentListEl = document.getElementById('workspaceRecentList');
  const workspaceRecentEmptyEl = document.getElementById('workspaceRecentEmpty');
  const workspaceRecentCountEl = document.getElementById('workspaceRecentCount');
  const syncPrepStatusTextEl = document.getElementById('syncPrepStatusText');
  const syncPrepBadgeEl = document.getElementById('syncPrepBadge');
  const syncPrepWorkspaceValueEl = document.getElementById('syncPrepWorkspaceValue');
  const syncPrepDeviceValueEl = document.getElementById('syncPrepDeviceValue');
  const syncPrepCountsValueEl = document.getElementById('syncPrepCountsValue');
  const syncPrepSignatureValueEl = document.getElementById('syncPrepSignatureValue');
  const syncPrepIncludedListEl = document.getElementById('syncPrepIncludedList');
  const syncPrepLocalOnlyListEl = document.getElementById('syncPrepLocalOnlyList');
  const downloadSyncPayloadBtn = document.getElementById('downloadSyncPayloadBtn');
  const syncShadowStatusTextEl = document.getElementById('syncShadowStatusText');
  const syncShadowBadgeEl = document.getElementById('syncShadowBadge');
  const syncShadowQueueValueEl = document.getElementById('syncShadowQueueValue');
  const syncShadowHeadValueEl = document.getElementById('syncShadowHeadValue');
  const syncShadowBaseValueEl = document.getElementById('syncShadowBaseValue');
  const syncShadowUpdatedValueEl = document.getElementById('syncShadowUpdatedValue');
  const syncRemoteStatusTextEl = document.getElementById('syncRemoteStatusText');
  const syncRemoteBadgeEl = document.getElementById('syncRemoteBadge');
  const syncRemoteSourceValueEl = document.getElementById('syncRemoteSourceValue');
  const syncRemoteHeadValueEl = document.getElementById('syncRemoteHeadValue');
  const syncRemoteCompareValueEl = document.getElementById('syncRemoteCompareValue');
  const syncRemotePullPreviewValueEl = document.getElementById('syncRemotePullPreviewValue');
  const syncRemotePullPreviewPanelEl = document.getElementById('syncRemotePullPreviewPanel');
  const syncRemotePullPreviewTextEl = document.getElementById('syncRemotePullPreviewText');
  const syncRemotePullPreviewListEl = document.getElementById('syncRemotePullPreviewList');
  const syncRemotePushPreviewValueEl = document.getElementById('syncRemotePushPreviewValue');
  const syncRemotePushPreviewPanelEl = document.getElementById('syncRemotePushPreviewPanel');
  const syncRemotePushPreviewTextEl = document.getElementById('syncRemotePushPreviewText');
  const syncRemotePushPreviewListEl = document.getElementById('syncRemotePushPreviewList');
  const syncRemoteHistoryValueEl = document.getElementById('syncRemoteHistoryValue');
  const syncRemoteHistoryPanelEl = document.getElementById('syncRemoteHistoryPanel');
  const syncRemoteHistoryTextEl = document.getElementById('syncRemoteHistoryText');
  const syncRemoteHistoryFiltersEl = document.getElementById('syncRemoteHistoryFilters');
  const syncRemoteHistoryListEl = document.getElementById('syncRemoteHistoryList');
  const syncRemoteHistoryDetailEl = document.getElementById('syncRemoteHistoryDetail');
  const syncRemoteAutomationTextEl = document.getElementById('syncRemoteAutomationText');
  const remoteAutoCheckOnStartInput = document.getElementById('remoteAutoCheckOnStart');
  const remoteAutoPullWhenCleanInput = document.getElementById('remoteAutoPullWhenClean');
  const remoteAutoPushWhenStableInput = document.getElementById('remoteAutoPushWhenStable');
  const syncRemoteConflictPanelEl = document.getElementById('syncRemoteConflictPanel');
  const syncRemoteConflictTextEl = document.getElementById('syncRemoteConflictText');
  const syncRemoteConflictListEl = document.getElementById('syncRemoteConflictList');
  const syncRemoteImportedValueEl = document.getElementById('syncRemoteImportedValue');
  const remoteShadowModeSelectEl = document.getElementById('remoteShadowMode');
  const remoteShadowUrlInput = document.getElementById('remoteShadowUrl');
  const remoteProviderProfileCardEl = document.getElementById('remoteProviderProfileCard');
  const remoteProviderProfileHintEl = document.getElementById('remoteProviderProfileHint');
  const remoteProviderConnectorSelectEl = document.getElementById('remoteProviderConnectorSelect');
  const remoteProviderConnectorNameInput = document.getElementById('remoteProviderConnectorName');
  const saveRemoteProviderConnectorBtn = document.getElementById('saveRemoteProviderConnectorBtn');
  const deleteRemoteProviderConnectorBtn = document.getElementById('deleteRemoteProviderConnectorBtn');
  const remoteProviderPresetSelectEl = document.getElementById('remoteProviderPreset');
  const remoteProviderHeaderNameWrapEl = document.getElementById('remoteProviderHeaderNameWrap');
  const remoteProviderHeaderNameInput = document.getElementById('remoteProviderHeaderName');
  const remoteProviderPublicKeyWrapEl = document.getElementById('remoteProviderPublicKeyWrap');
  const remoteProviderPublicKeyInput = document.getElementById('remoteProviderPublicKey');
  const remoteProviderBaseUrlWrapEl = document.getElementById('remoteProviderBaseUrlWrap');
  const remoteProviderBaseUrlInput = document.getElementById('remoteProviderBaseUrl');
  const remoteProviderFunctionNameWrapEl = document.getElementById('remoteProviderFunctionNameWrap');
  const remoteProviderFunctionNameInput = document.getElementById('remoteProviderFunctionName');
  const remoteProviderHeadTableWrapEl = document.getElementById('remoteProviderHeadTableWrap');
  const remoteProviderHeadTableInput = document.getElementById('remoteProviderHeadTable');
  const remoteProviderWorkspaceIdWrapEl = document.getElementById('remoteProviderWorkspaceIdWrap');
  const remoteProviderWorkspaceIdInput = document.getElementById('remoteProviderWorkspaceId');
  const remoteProviderSecretWrapEl = document.getElementById('remoteProviderSecretWrap');
  const remoteProviderSecretLabelEl = document.getElementById('remoteProviderSecretLabel');
  const remoteProviderSecretInput = document.getElementById('remoteProviderSecret');
  const remoteProviderRememberWrapEl = document.getElementById('remoteProviderRememberWrap');
  const remoteProviderRememberSecretInput = document.getElementById('remoteProviderRememberSecret');
  const connectRemoteShadowUrlBtn = document.getElementById('connectRemoteShadowUrlBtn');
  const importRemoteShadowBtn = document.getElementById('importRemoteShadowBtn');
  const clearRemoteShadowBtn = document.getElementById('clearRemoteShadowBtn');
  const recheckRemoteShadowBtn = document.getElementById('recheckRemoteShadowBtn');
  const guidedRemotePullBtn = document.getElementById('guidedRemotePullBtn');
  const applyRemoteShadowPullBtn = document.getElementById('applyRemoteShadowPullBtn');
  const pushRemoteShadowBtn = document.getElementById('pushRemoteShadowBtn');
  const remoteShadowFileInput = document.getElementById('remoteShadowFileInput');
  const forceShadowRevisionBtn = document.getElementById('forceShadowRevisionBtn');
  const exportShadowBundleBtn = document.getElementById('exportShadowBundleBtn');
  const clearShadowHistoryBtn = document.getElementById('clearShadowHistoryBtn');
  const recentDocsListEl = document.getElementById('recentDocsList');
  const recentDocsEmptyEl = document.getElementById('recentDocsEmpty');
  const recentDocsCountEl = document.getElementById('recentDocsCount');
  const quickAccessListEl = document.getElementById('quickAccessList');
  const quickAccessEmptyEl = document.getElementById('quickAccessEmpty');
  const quickAccessCountEl = document.getElementById('quickAccessCount');
  const tagFilterListEl = document.getElementById('tagFilterList');
  const tagFilterEmptyEl = document.getElementById('tagFilterEmpty');
  const tagFilterCountEl = document.getElementById('tagFilterCount');
  const tagFilterQuickButtons = Array.from(document.querySelectorAll('[data-type-filter]'));
  const openCommandPaletteBtn = document.getElementById('openCommandPaletteBtn');
  const pwaStatusTextEl = document.getElementById('pwaStatusText');
  const pwaModeBadgeEl = document.getElementById('pwaModeBadge');
  const installAppBtn = document.getElementById('installAppBtn');
  const refreshAppBtn = document.getElementById('refreshAppBtn');
  const offlineHintEl = document.getElementById('offlineHint');
  const checkUpdateBtn = document.getElementById('checkUpdateBtn');
  const prepareOfflineBtn = document.getElementById('prepareOfflineBtn');
  const showGuideBtn = document.getElementById('showGuideBtn');
  const quickStartCardEl = document.getElementById('quickStartCard');
  const quickStartDismissBtn = document.getElementById('quickStartDismissBtn');
  const quickStartKeepBtn = document.getElementById('quickStartKeepBtn');
  const pwaDiagConnectionEl = document.getElementById('pwaDiagConnection');
  const pwaDiagCacheEl = document.getElementById('pwaDiagCache');
  const pwaDiagInstallEl = document.getElementById('pwaDiagInstall');
  const pwaDiagUpdateEl = document.getElementById('pwaDiagUpdate');
  const emptyStateEl = document.getElementById('emptyState');
  const searchActiveWarning = document.getElementById('searchActiveWarning');
  const listFilterBar = document.getElementById('listFilterBar');
  const globalDragOverlay = document.getElementById('globalDragOverlay');

  const trashBtn = document.getElementById('trashBtn');
  const emptyTrashBtn = document.getElementById('emptyTrashBtn');
  const exitTrashBtn = document.getElementById('exitTrashBtn');
  const listTitle = document.getElementById('listTitle');
  const listSubtitle = document.getElementById('listSubtitle');

  // Modal Elements
  const modalOverlay = document.getElementById('modalOverlay');

  // Confirm Modal
  const confirmModal = document.getElementById('confirmModal');
  const confirmTitleEl = document.getElementById('confirmTitle');
  const confirmMessageEl = document.getElementById('confirmMessage');
  const confirmWarningBox = document.getElementById('confirmWarningBox');
  const confirmTypedWrap = document.getElementById('confirmTypedWrap');
  const confirmTypedLabel = document.getElementById('confirmTypedLabel');
  const confirmTypedInput = document.getElementById('confirmTypedInput');
  const confirmTypedHelp = document.getElementById('confirmTypedHelp');
  const confirmCancelBtn = document.getElementById('confirmCancelBtn');
  const confirmOkBtn = document.getElementById('confirmOkBtn');

  // Edit Modal
  const editModal = document.getElementById('editModal');
  const editModalTitle = document.getElementById('editModalTitle');
  const editNameInput = document.getElementById('editName');
  const editCategorySelect = document.getElementById('editCategory');
  const editCategoryGroup = document.getElementById('editCategoryGroup');
  const editTagsGroup = document.getElementById('editTagsGroup');
  const editTagsInput = document.getElementById('editTags');
  const editFolderDescGroup = document.getElementById('editFolderDescGroup');
  const editFolderDescInput = document.getElementById('editFolderDesc');
  const editFolderColorGroup = document.getElementById('editFolderColorGroup');
  const editFolderColorInput = document.getElementById('editFolderColor');
  const editContentGroup = document.getElementById('editContentGroup');
  const editContentInput = document.getElementById('editContent');
  const mediaPreviewGroup = document.getElementById('mediaPreviewGroup');
  const editCancelBtn = document.getElementById('editCancelBtn');
  const editSaveBtn = document.getElementById('editSaveBtn');
  const editorWordCountEl = document.getElementById('editorWordCount');
  const editorSaveStatusEl = document.getElementById('editorSaveStatus');
  const editDocumentTools = document.getElementById('editDocumentTools');
  const editHistoryBtn = document.getElementById('editHistoryBtn');
  const editorUndoBtn = document.getElementById('editorUndoBtn');
  const editorRedoBtn = document.getElementById('editorRedoBtn');
  const editorSearchBtn = document.getElementById('editorSearchBtn');
  const editorFocusBtn = document.getElementById('editorFocusBtn');
  const editorSearchPanel = document.getElementById('editorSearchPanel');
  const editorSearchInput = document.getElementById('editorSearchInput');
  const editorReplaceInput = document.getElementById('editorReplaceInput');
  const editorSearchPrevBtn = document.getElementById('editorSearchPrevBtn');
  const editorSearchNextBtn = document.getElementById('editorSearchNextBtn');
  const editorReplaceBtn = document.getElementById('editorReplaceBtn');
  const editorReplaceAllBtn = document.getElementById('editorReplaceAllBtn');
  const editorSearchCloseBtn = document.getElementById('editorSearchCloseBtn');
  const editorSearchSummaryEl = document.getElementById('editorSearchSummary');
  const editorOutlineListEl = document.getElementById('editorOutlineList');
  const editorOutlineEmptyEl = document.getElementById('editorOutlineEmpty');
  const editorOutlineCountEl = document.getElementById('editorOutlineCount');
  const editorReadingTimeEl = document.getElementById('editorReadingTime');
  const exportTxtBtn = document.getElementById('exportTxtBtn');
  const exportMdBtn = document.getElementById('exportMdBtn');
  const exportHtmlBtn = document.getElementById('exportHtmlBtn');
  const editorShellEl = editContentInput?.closest('.editor-shell') || null;
  const editorToolbarEl = editorShellEl?.querySelector('.editor-toolbar') || null;
  const editorStatusbarEl = editorShellEl?.querySelector('.editor-statusbar') || null;
  const editorEnhancementsEl = editContentGroup?.querySelector('.editor-enhancements') || null;

  // Versions Modal
  const versionsModal = document.getElementById('versionsModal');
  const versionsListEl = document.getElementById('versionsList');
  const versionsEmptyStateEl = document.getElementById('versionsEmptyState');
  const versionPreviewTitleEl = document.getElementById('versionPreviewTitle');
  const versionPreviewMetaEl = document.getElementById('versionPreviewMeta');
  const versionPreviewContentEl = document.getElementById('versionPreviewContent');
  const versionsBackBtn = document.getElementById('versionsBackBtn');
  const restoreVersionBtn = document.getElementById('restoreVersionBtn');

  // Backup History Modal
  const backupHistoryModal = document.getElementById('backupHistoryModal');
  const backupHistoryListEl = document.getElementById('backupHistoryList');
  const backupHistoryEmptyStateEl = document.getElementById('backupHistoryEmptyState');
  const backupPreviewTitleEl = document.getElementById('backupPreviewTitle');
  const backupPreviewMetaEl = document.getElementById('backupPreviewMeta');
  const backupPreviewStatsEl = document.getElementById('backupPreviewStats');
  const backupPreviewNotesEl = document.getElementById('backupPreviewNotes');
  const backupHistoryCloseBtn = document.getElementById('backupHistoryCloseBtn');
  const downloadSelectedBackupBtn = document.getElementById('downloadSelectedBackupBtn');
  const restoreSelectedBackupBtn = document.getElementById('restoreSelectedBackupBtn');
  const deleteSelectedBackupBtn = document.getElementById('deleteSelectedBackupBtn');

  // Command Palette Modal
  const commandPaletteModal = document.getElementById('commandPaletteModal');
  const commandPaletteInput = document.getElementById('commandPaletteInput');
  const commandPaletteListEl = document.getElementById('commandPaletteList');
  const commandPaletteEmptyEl = document.getElementById('commandPaletteEmpty');
  const commandPaletteCloseBtn = document.getElementById('commandPaletteCloseBtn');
  const commandPaletteHintEl = document.getElementById('commandPaletteHint');

  // Move Modal
  const moveModal = document.getElementById('moveModal');
  const moveTargetNameEl = document.getElementById('moveTargetName');
  const moveSelectEl = document.getElementById('moveSelect');
  const moveCancelBtn = document.getElementById('moveCancelBtn');
  const moveSaveBtn = document.getElementById('moveSaveBtn');

  // Constants i Estat de l'aplicació
  const APP_VERSION = '1.1.0';
  const APP_RELEASE_LABEL = 'estable';
  const STORAGE_KEY = 'bento_simple_docs';
  const EXPANDED_KEY = 'bento_expanded_folders';
  const EDIT_DRAFT_PREFIX = 'bento_edit_draft_v1:';
  const EDIT_AUTOSAVE_DELAY = 800;
  const VERSION_LIMIT = 25;
  const LIGHT_BACKUP_HISTORY_KEY = 'bento_light_backup_history_v2';
  const SURVIVAL_LIGHT_BACKUP_HISTORY_KEY = 'sutsumu_survival_light_backup_history_v1';
  const LIGHT_BACKUP_LIMIT = 4;
  const FULL_BACKUP_SCHEMA = 'bento-backup';
  const FULL_BACKUP_VERSION = 2;
  const FULL_BACKUP_HISTORY_KEY = 'bento_full_backup_history_v1';
  const FULL_BACKUP_LIMIT = 6;
  const AUTO_FULL_BACKUP_DEBOUNCE_MS = 2500;
  const AUTO_BACKUP_STALE_HOURS = 24;
  const RECOVERY_VAULT_KEY = 'bento_recovery_vault_v1';
  const SURVIVAL_RECOVERY_VAULT_KEY = 'sutsumu_survival_recovery_vault_v1';
  const RECOVERY_VAULT_MAX_AGE_DAYS = 14;
  const DISMISSED_RECOVERY_VAULT_SESSION_KEY = 'bento_recovery_vault_dismissed';
  const DISMISSED_LIGHT_RECOVERY_SESSION_KEY = 'bento_light_recovery_dismissed';
  const EXTERNAL_BACKUP_META_KEY = 'sutsumu_external_backup_meta_v1';
  const EXTERNAL_BACKUP_HANDLE_KEY = 'sutsumu_external_backup_handle_v1';
  const EXTERNAL_BACKUP_META_MIRROR_KEY = 'sutsumu_external_backup_meta_local_v1';
  const EXTERNAL_BACKUP_DEBOUNCE_MS = 3500;
  const SURVIVAL_ATTACHMENT_MIRROR_KEY = 'sutsumu_survival_attachment_mirror_v1';
  const SURVIVAL_ATTACHMENT_ITEM_MAX_BYTES = 320 * 1024;
  const SURVIVAL_ATTACHMENT_TOTAL_MAX_BYTES = 1400 * 1024;
  const SURVIVAL_ATTACHMENT_SYNC_DEBOUNCE_MS = 1200;
  const SYNC_PAYLOAD_SCHEMA = 'sutsumu-cloud-sync-payload';
  const SYNC_PAYLOAD_VERSION = 1;
  const SYNC_PREP_META_KEY = 'sutsumu_sync_prep_meta_v1';
  const SYNC_PREP_REFRESH_DEBOUNCE_MS = 900;
  const SHADOW_SYNC_SCHEMA = 'sutsumu-cloud-sync-shadow-revision';
  const SHADOW_SYNC_BUNDLE_SCHEMA = 'sutsumu-cloud-sync-shadow-bundle';
  const REMOTE_PROVIDER_HEAD_SCHEMA = 'sutsumu-cloud-sync-provider-head';
  const REMOTE_MANUAL_PUSH_SCHEMA = 'sutsumu-cloud-sync-manual-push';
  const SHADOW_SYNC_STATE_KEY = 'sutsumu_shadow_sync_state_v1';
  const SHADOW_SYNC_HISTORY_KEY = 'sutsumu_shadow_sync_history_v1';
  const SHADOW_SYNC_HISTORY_LIMIT = 18;
  const SHADOW_SYNC_DEBOUNCE_MS = 1800;
  const REMOTE_AUTO_SYNC_DEBOUNCE_MS = 1400;
  const AUTO_REMOTE_PUSH_INLINE_ATTACHMENT_MAX_BYTES = 1024 * 1024;
  const AUTO_REMOTE_PUSH_TOTAL_INLINE_BYTES = 4 * 1024 * 1024;
  const REMOTE_SHADOW_SOURCE_KEY = 'sutsumu_remote_shadow_source_v1';
  const REMOTE_SHADOW_CONFIG_KEY = 'sutsumu_remote_shadow_config_v1';
  const REMOTE_REVISION_DOWNLOADS_KEY = 'sutsumu_remote_revision_downloads_v1';
  const REMOTE_REVISION_APPLICATIONS_KEY = 'sutsumu_remote_revision_applications_v1';
  const REMOTE_PROVIDER_PROFILE_KEY = 'sutsumu_remote_provider_profile_v1';
  const REMOTE_PROVIDER_SECRET_KEY = 'sutsumu_remote_provider_secret_v1';
  const REMOTE_PROVIDER_SECRET_SESSION_KEY = 'sutsumu_remote_provider_secret_session_v1';
  const REMOTE_PROVIDER_CONNECTORS_KEY = 'sutsumu_remote_provider_connectors_v1';
  const REMOTE_PROVIDER_CONNECTOR_SECRETS_KEY = 'sutsumu_remote_provider_connector_secrets_v1';
  const REMOTE_PROVIDER_ACTIVE_CONNECTOR_KEY = 'sutsumu_remote_provider_active_connector_v1';
  const SYNCABLE_COLLECTIONS = Object.freeze(['documents', 'folders', 'tags', 'versions', 'attachmentMetadata']);
  const LOCAL_ONLY_COLLECTIONS = Object.freeze(['expandedFolders', 'recentDocs', 'recentWorkspaces', 'draftsLocals', 'backupHistories', 'workspaceHandles', 'uiState']);
  const SYNCABLE_COLLECTION_LABELS = Object.freeze(['documents', 'carpetes', 'etiquetes', 'versions', "metadades d'adjunts"]);
  const LOCAL_ONLY_COLLECTION_LABELS = Object.freeze(['carpetes obertes', 'recents del dispositiu', 'workspaces recents', 'esborranys locals', 'historial local de backups', 'permisos de fitxer', 'estat temporal UI']);
  const SYNC_SCOPE_V1 = Object.freeze({
    userMode: 'single-user',
    deviceMode: 'multi-device-own',
    workspaceMode: 'single-primary-workspace',
    collaboration: 'disabled',
    realtime: 'disabled'
  });
  const WORKSPACE_SCHEMA = 'bento-workspace';
  const WORKSPACE_VERSION = 1;
  const WORKSPACE_META_KEY = 'bento_workspace_meta_v1';
  const WORKSPACE_HANDLE_KEY = 'bento_workspace_handle_v1';
  const RECENT_WORKSPACES_KEY = 'bento_recent_workspaces_v1';
  const RECENT_WORKSPACES_LIMIT = 5;
  const WORKSPACE_AUTOSAVE_DEBOUNCE_MS = 1800;
  const WORKSPACE_FILE_EXTENSION = '.sutsumu-workspace.json';
  const LEGACY_WORKSPACE_FILE_EXTENSION = '.bento-workspace.json';
  const RECENT_DOCS_KEY = 'bento_recent_docs_v1';
  const RECENT_DOCS_LIMIT = 8;
  const PWA_DISMISSED_UPDATE_KEY = 'bento_pwa_update_dismissed_v1';
  const QUICKSTART_DISMISSED_KEY = 'bento_quickstart_dismissed_v16';
  const PWA_WARM_CACHE_KEY = 'bento_pwa_warm_cache_v16';
  const PWA_WARM_CACHE_NAME = 'bento-user-warm-v16';
  const PWA_LOCAL_ASSETS = ['./', './index.html', './style.css', './app.js', './manifest.webmanifest', './service-worker.js', './icons/icon-192.png', './icons/icon-512.png'];

  let mainStore = null;
  let backupStore = null;

  let docs = [];
  let expandedFolders = [];

  // Variables d'Estat Corrent
  let editingDocId = null;
  let moveItemTargetId = null;
  let isSearchActive = false;
  let isTrashViewActive = false;
  let draggedItemId = null;
  let pendingUpload = null;
  let currentObjectUrl = null;
  let hasSavedExpandedState = false;
  let editAutosaveTimer = null;
  let lastSavedEditSignature = '';
  let lastDraftSignature = '';
  let selectedVersionId = null;
  let pendingSafetyRecoverySnapshot = null;
  let pendingRecoveryVaultSnapshot = null;
  let selectedFullBackupId = null;
  let queuedFullBackupReason = '';
  let fullBackupTimer = null;
  let isFullBackupSaving = false;
  let hasWarnedAboutStaleBackups = false;
  let fullBackupHistoryCache = [];
  let hasShownStorageFallbackToast = false;
  let confirmOnCancel = null;
  let externalBackupHandle = null;
  let externalBackupMeta = null;
  let externalBackupAutosaveTimer = null;
  let externalBackupLastSavedSignature = '';
  let externalBackupDirty = false;
  let externalBackupNeedsPermission = false;
  let isExternalBackupSaving = false;
  let survivalAttachmentMirrorCache = null;
  let survivalAttachmentMirrorSignature = '';
  let survivalAttachmentMirrorTimer = null;
  let hasWarnedAboutMissingAttachmentBinaries = false;
  let syncPrepMeta = null;
  let syncPrepState = null;
  let syncPrepRefreshTimer = null;
  let shadowSyncState = null;
  let shadowSyncHistory = [];
  let shadowSyncTimer = null;
  let remoteAutoSyncTimer = null;
  let remoteShadowSource = null;
  let remoteShadowConfig = null;
  let remoteShadowAutomationDraft = {
    autoCheckOnStart: true,
    autoPullWhenClean: false,
    autoPushWhenStable: false
  };
  let remoteRevisionDownloads = {};
  let remoteRevisionApplications = {};
  let remoteShadowDraftUrl = '';
  let remoteProviderProfile = null;
  let remoteProviderSecret = '';
  let remoteProviderConnectors = [];
  let remoteProviderConnectorSecrets = {};
  let selectedRemoteHistoryRevisionId = '';
  let activeRemoteHistoryFilter = 'all';
  let remoteAutoSyncInFlight = false;
  let lastRemoteAutoSyncKey = '';
  let activeRemoteProviderConnectorId = '';
  let workspaceAutosaveTimer = null;
  let isWorkspaceSaving = false;
  let workspaceLastSavedSignature = '';
  let workspaceDirty = false;
  let workspaceMeta = null;
  let recentDocs = [];
  let workspaceHandle = null;
  let recentWorkspaces = [];
  let commandPaletteResults = [];
  let commandPaletteActiveIndex = 0;
  let editorCompatMode = false;
  let editContentPlainInput = null;
  let editorCompatBannerEl = null;
  let editorCompatToggleBtn = null;

  function bootstrapEditorCompatibilityUI() {
    if (!editorShellEl || !editorStatusbarEl || !editDocumentTools || editContentPlainInput) return;

    editContentPlainInput = document.createElement('textarea');
    editContentPlainInput.id = 'editContentPlainCompat';
    editContentPlainInput.className = 'editor-plain-fallback hidden';
    editContentPlainInput.placeholder = 'Escriu o modifica aquí el teu text...';
    editContentPlainInput.setAttribute('autocomplete', 'off');
    editContentPlainInput.setAttribute('spellcheck', 'true');
    editorShellEl.insertBefore(editContentPlainInput, editorStatusbarEl);

    editorCompatBannerEl = document.createElement('div');
    editorCompatBannerEl.className = 'editor-compat-banner hidden';
    editorCompatBannerEl.innerHTML = '<strong>Mode text compatible actiu.</strong><span>Si el mode ric dona problemes, edita aquí amb un camp de text fiable i desa normalment.</span>';
    editorShellEl.insertBefore(editorCompatBannerEl, editorStatusbarEl);

    editorCompatToggleBtn = document.createElement('button');
    editorCompatToggleBtn.type = 'button';
    editorCompatToggleBtn.id = 'editorCompatToggleBtn';
    editorCompatToggleBtn.className = 'btn btn-secondary btn-small';
    editorCompatToggleBtn.textContent = 'Mode text simple';
    editDocumentTools.appendChild(editorCompatToggleBtn);
  }

  bootstrapEditorCompatibilityUI();
  let deferredInstallPrompt = null;
  let pwaRegistration = null;
  let lastWarmCacheAt = window.localStorage.getItem(PWA_WARM_CACHE_KEY) || '';
  let isOfflineMode = !navigator.onLine;
  let hasPendingAppUpdate = false;
  let editorSearchMatches = [];
  let editorSearchCurrentIndex = -1;
  let editorFocusMode = false;
  let activeTagFilter = '';
  let activeTypeFilter = 'all';

  const EMPTY_STATES = {
    default: {
      icon: '🌳',
      title: 'No hi ha res creat',
      desc: 'Utilitza el panell esquerre per començar a crear carpetes i documents a l\'Arrel del sistema.'
    },
    search: {
      icon: '🔍',
      title: 'Sense resultats',
      desc: 'No s\'han trobat documents en aquesta cerca.'
    },
    trash: {
      icon: '♻️',
      title: 'Tot net i net!',
      desc: 'No tens cap document pendent de purga en aquests moments.'
    }
  };


function canInstallSutsumu() {
  return Boolean(deferredInstallPrompt);
}

function isStandaloneDisplayMode() {
  return Boolean(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
}

function isIOSLikeDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function canShareFiles() {
  return Boolean(window.isSecureContext && typeof navigator.share === 'function' && typeof window.File === 'function');
}

function getWorkspacePortableActionLabel() {
  if (supportsWorkspaceFiles()) {
    return {
      create: 'Crear workspace',
      open: 'Obrir workspace',
      save: 'Desar workspace',
      saveAs: 'Desar com...'
    };
  }

  if (canShareFiles() && isIOSLikeDevice()) {
    return {
      create: 'Crear a Fitxers',
      open: 'Obrir de Fitxers',
      save: 'Desar a Fitxers',
      saveAs: 'Compartir còpia'
    };
  }

  return {
    create: 'Crear workspace',
    open: 'Obrir workspace',
    save: 'Desar workspace',
    saveAs: 'Desar com...'
  };
}

function updateQuickStartUI(forceOpen = false) {
  if (!quickStartCardEl) return;
  const dismissed = window.localStorage.getItem(QUICKSTART_DISMISSED_KEY) === '1';
  const shouldShow = forceOpen || !dismissed;
  quickStartCardEl.classList.toggle('hidden', !shouldShow);
}

function updatePwaDiagnostics() {
  if (pwaDiagConnectionEl) {
    pwaDiagConnectionEl.textContent = isOfflineMode ? 'offline' : 'online';
  }

  if (pwaDiagCacheEl) {
    pwaDiagCacheEl.textContent = lastWarmCacheAt
      ? `llest ${new Date(lastWarmCacheAt).toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' })}`
      : ('serviceWorker' in navigator ? 'pendent' : 'sense SW');
  }

  if (pwaDiagInstallEl) {
    pwaDiagInstallEl.textContent = isStandaloneDisplayMode()
      ? 'instal·lat'
      : (canInstallSutsumu() ? 'disponible' : 'web');
  }

  if (pwaDiagUpdateEl) {
    pwaDiagUpdateEl.textContent = hasPendingAppUpdate ? 'pendent' : 'al dia';
  }
}

function normalizeSyncPrepMeta(rawMeta) {
  const nowIso = new Date().toISOString();
  const meta = rawMeta && typeof rawMeta === 'object' ? rawMeta : {};
  return {
    deviceId: typeof meta.deviceId === 'string' && meta.deviceId.trim() ? meta.deviceId.trim() : generateId('device'),
    deviceLabel: typeof meta.deviceLabel === 'string' && meta.deviceLabel.trim() ? meta.deviceLabel.trim() : getSyncDeviceLabel(),
    devicePlatform: typeof meta.devicePlatform === 'string' && meta.devicePlatform.trim() ? meta.devicePlatform.trim() : getSyncDevicePlatform(),
    primaryWorkspaceId: typeof meta.primaryWorkspaceId === 'string' && meta.primaryWorkspaceId.trim() ? meta.primaryWorkspaceId.trim() : generateId('workspace'),
    primaryWorkspaceName: typeof meta.primaryWorkspaceName === 'string' && meta.primaryWorkspaceName.trim() ? meta.primaryWorkspaceName.trim() : 'Sutsumu Principal',
    lastWorkspaceMode: typeof meta.lastWorkspaceMode === 'string' && meta.lastWorkspaceMode.trim() ? meta.lastWorkspaceMode.trim() : 'local',
    createdAt: typeof meta.createdAt === 'string' && !Number.isNaN(Date.parse(meta.createdAt)) ? meta.createdAt : nowIso,
    lastPreparedAt: typeof meta.lastPreparedAt === 'string' && !Number.isNaN(Date.parse(meta.lastPreparedAt)) ? meta.lastPreparedAt : '',
    lastPayloadSignature: typeof meta.lastPayloadSignature === 'string' ? meta.lastPayloadSignature : ''
  };
}

function readSyncPrepMetaSnapshot() {
  return safeJSONParse(localStorage.getItem(SYNC_PREP_META_KEY), null);
}

function writeSyncPrepMetaSnapshot(meta) {
  try {
    localStorage.setItem(SYNC_PREP_META_KEY, JSON.stringify(meta));
  } catch (err) {
    console.warn("No s'ha pogut persistir la meta local de preparació de sync.", err);
  }
}

function ensureSyncPrepMeta(partial = null) {
  const base = normalizeSyncPrepMeta(syncPrepMeta || readSyncPrepMetaSnapshot());
  const merged = normalizeSyncPrepMeta(partial ? { ...base, ...partial } : base);
  const previousSerialized = JSON.stringify(syncPrepMeta || {});
  const nextSerialized = JSON.stringify(merged);
  syncPrepMeta = merged;
  if (previousSerialized !== nextSerialized || !localStorage.getItem(SYNC_PREP_META_KEY)) {
    writeSyncPrepMetaSnapshot(merged);
  }
  return merged;
}

function getSyncDevicePlatform() {
  if (isIOSLikeDevice()) return isStandaloneDisplayMode() ? 'ios-standalone' : 'ios-web';
  if (/Mac/i.test(navigator.platform || '')) return isStandaloneDisplayMode() ? 'mac-standalone' : 'mac-web';
  if (/Win/i.test(navigator.platform || '')) return 'windows-web';
  return 'web';
}

function getSyncDeviceLabel() {
  if (isIOSLikeDevice()) return isStandaloneDisplayMode() ? 'iPhone/iPad app' : 'iPhone/iPad web';
  if (/Mac/i.test(navigator.platform || '')) return isStandaloneDisplayMode() ? 'Mac app' : 'Mac web';
  if (/Win/i.test(navigator.platform || '')) return 'Windows web';
  return 'Navegador web';
}

function getSyncWorkspaceDescriptor() {
  const meta = ensureSyncPrepMeta({
    deviceLabel: getSyncDeviceLabel(),
    devicePlatform: getSyncDevicePlatform()
  });
  const workspaceName = normalizeWorkspaceName(
    workspaceMeta?.name
      || meta.primaryWorkspaceName
      || (docs.find(item => item.type === 'folder' && item.parentId === 'root' && !item.isDeleted)?.title || 'Sutsumu Principal')
  );
  const workspaceId = typeof workspaceMeta?.id === 'string' && workspaceMeta.id.trim()
    ? workspaceMeta.id.trim()
    : meta.primaryWorkspaceId;
  const bindingMode = isWorkspaceConnected() ? 'fs' : (isPortableWorkspaceMode() ? 'portable' : 'local');
  const nextMeta = {
    ...meta,
    primaryWorkspaceId: workspaceId,
    primaryWorkspaceName: workspaceName,
    lastWorkspaceMode: bindingMode
  };
  syncPrepMeta = nextMeta;
  writeSyncPrepMetaSnapshot(nextMeta);
  return {
    id: workspaceId,
    name: workspaceName,
    bindingMode,
    source: bindingMode === 'local' ? 'local-state' : 'workspace-file'
  };
}

function createFastStateHash(value = '') {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `v1-${(hash >>> 0).toString(16).padStart(8, '0')}`;
}

function createCanonicalSyncAttachmentForSignature(attachment) {
  if (!attachment || typeof attachment !== 'object') return null;
  return {
    fileName: attachment.fileName || '',
    fileType: attachment.fileType || '',
    fileSize: Number(attachment.fileSize || 0),
    sourceFormat: attachment.sourceFormat || ''
  };
}

function createCanonicalSyncDocsForSignature(syncDocs = []) {
  if (!Array.isArray(syncDocs)) return [];
  return syncDocs
    .filter(item => item && typeof item === 'object')
    .map(item => {
      const base = {
        id: item.id,
        type: item.type,
        parentId: item.parentId || 'root',
        title: item.title || '',
        tags: normalizeTags(item.tags),
        timestamp: item.timestamp || '',
        isDeleted: Boolean(item.isDeleted),
        isFavorite: Boolean(item.isFavorite),
        isPinned: Boolean(item.isPinned)
      };

      if (item.type === 'folder') {
        return {
          ...base,
          desc: item.desc || '',
          color: item.color || '#0ea5e9'
        };
      }

      return {
        ...base,
        category: item.category || '',
        content: sanitizeRichText(item.content || ''),
        versions: normalizeVersions(item.versions || []).map(buildSyncVersionPayload),
        attachment: createCanonicalSyncAttachmentForSignature(item.attachment)
      };
    });
}

function buildSyncVersionPayload(version) {
  return {
    id: version.id,
    createdAt: version.createdAt,
    title: version.title || '',
    category: version.category || '',
    tags: normalizeTags(version.tags),
    content: sanitizeRichText(version.content || ''),
    reason: version.reason || 'manual-save'
  };
}

function buildSyncAttachmentMetadata(item) {
  const hasAttachment = Boolean(item.fileName || item.fileType || Number(item.fileSize || 0) > 0 || item.sourceFormat || item.binaryFileUnavailable);
  if (!hasAttachment) return null;
  return {
    fileName: item.fileName || '',
    fileType: item.fileType || '',
    fileSize: Number(item.fileSize || 0),
    sourceFormat: item.sourceFormat || '',
    checksum: null,
    remoteObjectKey: null,
    availability: item.binaryFileUnavailable ? 'missing-local-copy' : 'local-pending-upload'
  };
}

function buildSyncItemPayload(item) {
  const base = {
    id: item.id,
    type: item.type,
    parentId: item.parentId || 'root',
    title: item.title || '',
    tags: normalizeTags(item.tags),
    timestamp: item.timestamp || '',
    isDeleted: Boolean(item.isDeleted),
    isFavorite: Boolean(item.isFavorite),
    isPinned: Boolean(item.isPinned)
  };

  if (item.type === 'folder') {
    return {
      ...base,
      desc: item.desc || '',
      color: item.color || '#0ea5e9'
    };
  }

  return {
    ...base,
    category: item.category || '',
    content: sanitizeRichText(item.content || ''),
    versions: normalizeVersions(item.versions || []).map(buildSyncVersionPayload),
    attachment: buildSyncAttachmentMetadata(item)
  };
}

function createSyncPayloadCounts(syncDocs) {
  const folders = syncDocs.filter(item => item.type === 'folder' && !item.isDeleted).length;
  const documents = syncDocs.filter(item => item.type === 'document' && !item.isDeleted).length;
  const deleted = syncDocs.filter(item => item.isDeleted).length;
  const versions = syncDocs.reduce((total, item) => total + (item.type === 'document' ? item.versions.length : 0), 0);
  const attachments = syncDocs.filter(item => item.type === 'document' && item.attachment).length;
  return {
    folders,
    documents,
    deleted,
    versions,
    attachments,
    total: syncDocs.length
  };
}

function createSyncPayloadPreview(currentDocs = docs) {
  const workspace = getSyncWorkspaceDescriptor();
  const meta = ensureSyncPrepMeta();
  const syncDocs = normalizeDocs(currentDocs).map(buildSyncItemPayload);
  return {
    schema: SYNC_PAYLOAD_SCHEMA,
    version: SYNC_PAYLOAD_VERSION,
    mode: 'preparation-only',
    generatedAt: new Date().toISOString(),
    app: 'Sutsumu',
    appVersion: APP_VERSION,
    appRelease: APP_RELEASE_LABEL,
    scope: { ...SYNC_SCOPE_V1 },
    contract: {
      syncableCollections: [...SYNCABLE_COLLECTIONS],
      localOnlyCollections: [...LOCAL_ONLY_COLLECTIONS],
      attachmentMode: 'metadata-only-until-cloud-v1'
    },
    device: {
      id: meta.deviceId,
      label: meta.deviceLabel,
      platform: meta.devicePlatform
    },
    workspace,
    snapshot: {
      counts: createSyncPayloadCounts(syncDocs),
      docs: syncDocs
    }
  };
}

function createSyncPayloadSignature(payload) {
  const signatureBase = JSON.stringify({
    schema: payload.schema,
    version: payload.version,
    workspace: payload.workspace,
    docs: createCanonicalSyncDocsForSignature(payload.snapshot.docs)
  });
  return createFastStateHash(signatureBase);
}

function stableShadowSyncStringify(value) {
  const normalizeValue = input => {
    if (Array.isArray(input)) {
      return input.map(normalizeValue);
    }
    if (input && typeof input === 'object') {
      return Object.keys(input).sort().reduce((acc, key) => {
        acc[key] = normalizeValue(input[key]);
        return acc;
      }, {});
    }
    return input;
  };
  return JSON.stringify(normalizeValue(value));
}

function renderSyncPreparationChipList(container, items, variant = 'sync') {
  if (!container) return;
  container.innerHTML = '';
  items.forEach(label => {
    const chip = document.createElement('span');
    chip.className = `sync-prep-chip ${variant === 'local' ? 'local-only' : ''}`;
    chip.textContent = label;
    container.appendChild(chip);
  });
}

function updateSyncPreparationUI() {
  if (!syncPrepStatusTextEl || !syncPrepBadgeEl) return;
  const state = syncPrepState;
  if (!state) {
    syncPrepStatusTextEl.textContent = 'Preparant la capa local de Cloud Sync v1...';
    syncPrepBadgeEl.textContent = 'Preparant';
    return;
  }

  const modeLabel = state.workspace.bindingMode === 'fs'
    ? 'workspace extern'
    : (state.workspace.bindingMode === 'portable' ? 'workspace portable' : 'estat local');
  syncPrepStatusTextEl.textContent = `Sutsumu ja genera un payload base net per al núvol a partir de ${modeLabel}. Aquesta fase encara no envia ni baixa dades remotes.`;
  syncPrepBadgeEl.textContent = state.counts.total > 0 ? 'Preparat' : 'Base';
  if (syncPrepWorkspaceValueEl) syncPrepWorkspaceValueEl.textContent = state.workspace.name || 'Sutsumu Principal';
  if (syncPrepDeviceValueEl) syncPrepDeviceValueEl.textContent = `${state.device.label} · ${state.device.id.slice(0, 8)}`;
  if (syncPrepCountsValueEl) {
    syncPrepCountsValueEl.textContent = `${state.counts.documents} doc · ${state.counts.folders} carp · ${state.counts.versions} vers.`;
  }
  if (syncPrepSignatureValueEl) syncPrepSignatureValueEl.textContent = state.signature;
  renderSyncPreparationChipList(syncPrepIncludedListEl, SYNCABLE_COLLECTION_LABELS, 'sync');
  renderSyncPreparationChipList(syncPrepLocalOnlyListEl, LOCAL_ONLY_COLLECTION_LABELS, 'local');
  updateRemoteShadowUI();
}

function refreshSyncPreparationState(reason = 'local-change') {
  const payload = createSyncPayloadPreview();
  const signature = createSyncPayloadSignature(payload);
  const nextMeta = ensureSyncPrepMeta({
    deviceLabel: payload.device.label,
    devicePlatform: payload.device.platform,
    primaryWorkspaceId: payload.workspace.id,
    primaryWorkspaceName: payload.workspace.name,
    lastWorkspaceMode: payload.workspace.bindingMode,
    lastPreparedAt: new Date().toISOString(),
    lastPayloadSignature: signature
  });
  syncPrepState = {
    reason,
    signature,
    device: payload.device,
    workspace: payload.workspace,
    counts: payload.snapshot.counts,
    meta: nextMeta
  };
  updateSyncPreparationUI();
  return payload;
}

function queueSyncPreparationRefresh(reason = 'local-change') {
  if (syncPrepRefreshTimer) clearTimeout(syncPrepRefreshTimer);
  syncPrepRefreshTimer = setTimeout(() => {
    syncPrepRefreshTimer = null;
    refreshSyncPreparationState(reason);
  }, reason === 'bootstrap' ? 0 : SYNC_PREP_REFRESH_DEBOUNCE_MS);
}

function normalizeShadowSyncState(rawState) {
  const state = rawState && typeof rawState === 'object' ? rawState : {};
  return {
    enabled: state.enabled !== false,
    status: typeof state.status === 'string' && state.status.trim() ? state.status.trim() : 'idle',
    lastRevisionId: typeof state.lastRevisionId === 'string' ? state.lastRevisionId : '',
    lastBaseRevisionId: typeof state.lastBaseRevisionId === 'string' ? state.lastBaseRevisionId : '',
    lastPayloadSignature: typeof state.lastPayloadSignature === 'string' ? state.lastPayloadSignature : '',
    lastQueuedAt: typeof state.lastQueuedAt === 'string' ? state.lastQueuedAt : '',
    lastExportedAt: typeof state.lastExportedAt === 'string' ? state.lastExportedAt : '',
    lastReason: typeof state.lastReason === 'string' ? state.lastReason : '',
    lastRemoteStatus: typeof state.lastRemoteStatus === 'string' ? state.lastRemoteStatus : 'not-configured',
    lastError: typeof state.lastError === 'string' ? state.lastError : '',
    historyCount: Number.isFinite(Number(state.historyCount)) ? Number(state.historyCount) : 0
  };
}

function normalizeShadowSyncEntry(rawEntry) {
  const entry = rawEntry && typeof rawEntry === 'object' ? rawEntry : {};
  const payload = entry.payload && typeof entry.payload === 'object' ? entry.payload : null;
  return {
    revisionId: typeof entry.revisionId === 'string' && entry.revisionId.trim() ? entry.revisionId.trim() : generateId('shadow-revision'),
    baseRevisionId: typeof entry.baseRevisionId === 'string' ? entry.baseRevisionId : '',
    createdAt: typeof entry.createdAt === 'string' && !Number.isNaN(Date.parse(entry.createdAt)) ? entry.createdAt : new Date().toISOString(),
    reason: typeof entry.reason === 'string' && entry.reason.trim() ? entry.reason.trim() : 'shadow-auto',
    status: typeof entry.status === 'string' && entry.status.trim() ? entry.status.trim() : 'queued',
    payloadSignature: typeof entry.payloadSignature === 'string' ? entry.payloadSignature : '',
    workspaceId: typeof entry.workspaceId === 'string' ? entry.workspaceId : (payload?.workspace?.id || ''),
    workspaceName: typeof entry.workspaceName === 'string' ? entry.workspaceName : (payload?.workspace?.name || ''),
    deviceId: typeof entry.deviceId === 'string' ? entry.deviceId : (payload?.device?.id || ''),
    counts: entry.counts && typeof entry.counts === 'object' ? {
      folders: Number(entry.counts.folders || 0),
      documents: Number(entry.counts.documents || 0),
      deleted: Number(entry.counts.deleted || 0),
      versions: Number(entry.counts.versions || 0),
      attachments: Number(entry.counts.attachments || 0),
      total: Number(entry.counts.total || 0)
    } : createSyncPayloadCounts(payload?.snapshot?.docs || []),
    payload,
    transport: typeof entry.transport === 'string' && entry.transport.trim() ? entry.transport.trim() : 'local-shadow'
  };
}

function normalizeShadowSyncHistory(rawHistory) {
  if (!Array.isArray(rawHistory)) return [];
  const seen = new Set();
  return rawHistory
    .map(normalizeShadowSyncEntry)
    .filter(entry => {
      const key = entry.revisionId;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, SHADOW_SYNC_HISTORY_LIMIT);
}

async function readShadowSyncHistory() {
  if (getBackupStore()) {
    try {
      return normalizeShadowSyncHistory(await getBackupStore().getItem(SHADOW_SYNC_HISTORY_KEY));
    } catch (err) {
      console.warn("No s'ha pogut llegir l'historial local de shadow sync.", err);
    }
  }
  return normalizeShadowSyncHistory(safeJSONParse(localStorage.getItem(SHADOW_SYNC_HISTORY_KEY), []));
}

async function writeShadowSyncHistory(history) {
  const normalized = normalizeShadowSyncHistory(history);
  if (getBackupStore()) {
    try {
      await getBackupStore().setItem(SHADOW_SYNC_HISTORY_KEY, normalized);
      shadowSyncHistory = normalized;
      updateShadowSyncUI();
      return normalized;
    } catch (err) {
      console.warn("No s'ha pogut desar l'historial local de shadow sync a IndexedDB.", err);
    }
  }
  try {
    localStorage.setItem(SHADOW_SYNC_HISTORY_KEY, JSON.stringify(normalized));
  } catch (err) {
    console.warn("No s'ha pogut desar l'historial local de shadow sync a localStorage.", err);
  }
  shadowSyncHistory = normalized;
  updateShadowSyncUI();
  return normalized;
}

async function readShadowSyncState() {
  if (getBackupStore()) {
    try {
      return normalizeShadowSyncState(await getBackupStore().getItem(SHADOW_SYNC_STATE_KEY));
    } catch (err) {
      console.warn("No s'ha pogut llegir l'estat local de shadow sync.", err);
    }
  }
  return normalizeShadowSyncState(safeJSONParse(localStorage.getItem(SHADOW_SYNC_STATE_KEY), null));
}

async function writeShadowSyncState(state) {
  const normalized = normalizeShadowSyncState(state);
  if (getBackupStore()) {
    try {
      await getBackupStore().setItem(SHADOW_SYNC_STATE_KEY, normalized);
      shadowSyncState = normalized;
      updateShadowSyncUI();
      return normalized;
    } catch (err) {
      console.warn("No s'ha pogut desar l'estat local de shadow sync a IndexedDB.", err);
    }
  }
  try {
    localStorage.setItem(SHADOW_SYNC_STATE_KEY, JSON.stringify(normalized));
  } catch (err) {
    console.warn("No s'ha pogut desar l'estat local de shadow sync a localStorage.", err);
  }
  shadowSyncState = normalized;
  updateShadowSyncUI();
  return normalized;
}

function createShadowSyncShortId(value = '') {
  return value ? value.slice(0, 10) : 'pendent';
}

function formatShadowSyncMoment(value = '') {
  if (!value) return 'encara no';
  try {
    return new Date(value).toLocaleString('ca-ES');
  } catch (_err) {
    return value;
  }
}

function createShadowSyncEntryFromPayload(payload, reason = 'shadow-auto') {
  const baseRevisionId = shadowSyncState?.lastRevisionId || '';
  return normalizeShadowSyncEntry({
    revisionId: generateId('shadow-revision'),
    baseRevisionId,
    createdAt: new Date().toISOString(),
    reason,
    status: 'queued',
    payloadSignature: createSyncPayloadSignature(payload),
    workspaceId: payload.workspace.id,
    workspaceName: payload.workspace.name,
    deviceId: payload.device.id,
    counts: payload.snapshot.counts,
    payload,
    transport: 'local-shadow'
  });
}

async function persistShadowSyncEntry(entry) {
  const nextHistory = await writeShadowSyncHistory([entry, ...shadowSyncHistory]);
  await writeShadowSyncState({
    ...(shadowSyncState || {}),
    enabled: true,
    status: 'ready',
    lastRevisionId: entry.revisionId,
    lastBaseRevisionId: entry.baseRevisionId || '',
    lastPayloadSignature: entry.payloadSignature,
    lastQueuedAt: entry.createdAt,
    lastReason: entry.reason,
    lastRemoteStatus: 'not-configured',
    lastError: '',
    historyCount: nextHistory.length
  });
  return entry;
}

async function createShadowRevisionNow(reason = 'shadow-manual', options = {}) {
  const { silent = false, force = false } = options;
  const payload = refreshSyncPreparationState(reason);
  if (!payload.snapshot.docs.length) {
    await writeShadowSyncState({
      ...(shadowSyncState || {}),
      enabled: true,
      status: 'empty',
      historyCount: shadowSyncHistory.length,
      lastError: ''
    });
    if (!silent) showToast('Encara no hi ha contingut per crear una revisió shadow.', 'info');
    return null;
  }

  const signature = createSyncPayloadSignature(payload);
  if (!force && shadowSyncState?.lastPayloadSignature === signature) {
    await writeShadowSyncState({
      ...(shadowSyncState || {}),
      enabled: true,
      status: 'ready',
      historyCount: shadowSyncHistory.length,
      lastError: ''
    });
    if (!silent) showToast('La darrera revisió shadow ja reflecteix aquest estat.', 'info');
    queueRemoteShadowAutomation('shadow-ready', { immediate: true });
    return shadowSyncHistory[0] || null;
  }

  const entry = createShadowSyncEntryFromPayload(payload, reason);
  await persistShadowSyncEntry(entry);
  if (!silent) showToast(`Revisió shadow preparada: ${createShadowSyncShortId(entry.revisionId)}`);
  queueRemoteShadowAutomation('shadow-ready', { immediate: true });
  return entry;
}

function queueShadowSyncRevision(reason = 'shadow-auto') {
  if (shadowSyncTimer) clearTimeout(shadowSyncTimer);
  shadowSyncTimer = setTimeout(async () => {
    shadowSyncTimer = null;
    try {
      await createShadowRevisionNow(`shadow-${reason}`, { silent: true, force: false });
    } catch (err) {
      console.warn("No s'ha pogut generar la revisió local de shadow sync.", err);
      await writeShadowSyncState({
        ...(shadowSyncState || {}),
        enabled: true,
        status: 'error',
        lastError: err?.message || 'error-shadow-sync',
        historyCount: shadowSyncHistory.length
      });
    }
  }, SHADOW_SYNC_DEBOUNCE_MS);
}

function createShadowSyncBundle() {
  return {
    schema: SHADOW_SYNC_BUNDLE_SCHEMA,
    version: 1,
    exportedAt: new Date().toISOString(),
    app: 'Sutsumu',
    appVersion: APP_VERSION,
    appRelease: APP_RELEASE_LABEL,
    state: normalizeShadowSyncState(shadowSyncState),
    revisions: normalizeShadowSyncHistory(shadowSyncHistory)
  };
}

function createStandaloneShadowSyncBundle(revisions = [], options = {}) {
  const normalizedRevisions = normalizeShadowSyncHistory(revisions);
  const headEntry = getShadowHistoryHead(normalizedRevisions, options.lastRevisionId || normalizedRevisions[0]?.revisionId || '');
  const exportedAt = typeof options.exportedAt === 'string' && !Number.isNaN(Date.parse(options.exportedAt))
    ? options.exportedAt
    : new Date().toISOString();
  return {
    schema: SHADOW_SYNC_BUNDLE_SCHEMA,
    version: 1,
    exportedAt,
    app: 'Sutsumu',
    appVersion: APP_VERSION,
    appRelease: APP_RELEASE_LABEL,
    state: normalizeShadowSyncState({
      enabled: true,
      status: normalizedRevisions.length ? 'ready' : 'idle',
      lastRevisionId: headEntry?.revisionId || '',
      lastBaseRevisionId: headEntry?.baseRevisionId || '',
      lastPayloadSignature: headEntry?.payloadSignature || '',
      lastQueuedAt: headEntry?.createdAt || exportedAt,
      lastExportedAt: exportedAt,
      lastReason: typeof options.lastReason === 'string' && options.lastReason.trim() ? options.lastReason.trim() : 'shadow-standalone-export',
      lastRemoteStatus: typeof options.lastRemoteStatus === 'string' && options.lastRemoteStatus.trim() ? options.lastRemoteStatus.trim() : 'exported',
      lastError: '',
      historyCount: normalizedRevisions.length
    }),
    revisions: normalizedRevisions
  };
}

function updateShadowSyncUI() {
  if (!syncShadowStatusTextEl || !syncShadowBadgeEl) return;
  const state = normalizeShadowSyncState(shadowSyncState);
  const historyCount = shadowSyncHistory.length;
  const latest = shadowSyncHistory[0] || null;

  forceShadowRevisionBtn && (forceShadowRevisionBtn.disabled = docs.length === 0);
  exportShadowBundleBtn && (exportShadowBundleBtn.disabled = historyCount === 0);
  clearShadowHistoryBtn && (clearShadowHistoryBtn.disabled = historyCount === 0);

  if (state.status === 'error') {
    syncShadowBadgeEl.textContent = 'Error';
    syncShadowStatusTextEl.textContent = `La capa local de shadow sync ha fallat en l'últim intent. L'app continua local i segura, pero convé revisar l'estat abans de connectar cap núvol.`;
  } else if (!docs.length) {
    syncShadowBadgeEl.textContent = 'Buit';
    syncShadowStatusTextEl.textContent = 'L\'espai encara és buit. Quan hi hagi contingut, Sutsumu podrà encapsular revisions immutables preparades per al futur backend.';
  } else if (!historyCount) {
    syncShadowBadgeEl.textContent = 'Base';
    syncShadowStatusTextEl.textContent = 'La base remota segura està preparada, pero encara no hi ha revisions shadow guardades en aquest dispositiu.';
  } else {
    syncShadowBadgeEl.textContent = 'Shadow';
    syncShadowStatusTextEl.textContent = `Hi ha ${historyCount} revisions shadow immutables preparades localment. Encara no governen l'app ni substitueixen els teus backups.`;
  }

  if (syncShadowQueueValueEl) syncShadowQueueValueEl.textContent = String(historyCount);
  if (syncShadowHeadValueEl) syncShadowHeadValueEl.textContent = latest ? createShadowSyncShortId(latest.revisionId) : 'pendent';
  if (syncShadowBaseValueEl) syncShadowBaseValueEl.textContent = latest?.baseRevisionId ? createShadowSyncShortId(latest.baseRevisionId) : 'arrel';
  if (syncShadowUpdatedValueEl) syncShadowUpdatedValueEl.textContent = formatShadowSyncMoment(state.lastQueuedAt);
  updateRemoteShadowUI();
}

async function clearShadowSyncHistory() {
  if (!shadowSyncHistory.length) return;
  openConfirm(
    'Netejar shadow sync local?',
    'Aixo esborrarà les revisions shadow guardades només en aquest dispositiu. No afectarà ni els documents actuals ni els backups normals.',
    async () => {
      shadowSyncHistory = [];
      await writeShadowSyncHistory([]);
      await writeShadowSyncState({
        ...(shadowSyncState || {}),
        status: docs.length ? 'idle' : 'empty',
        lastRevisionId: '',
        lastBaseRevisionId: '',
        lastPayloadSignature: '',
        lastQueuedAt: '',
        lastReason: '',
        lastError: '',
        historyCount: 0
      });
      showToast('Historial local de shadow sync netejat.', 'info');
    },
    {
      okLabel: 'Netejar shadow',
      warningText: 'Aquesta operació només afecta el registre local de revisions preparades per al futur núvol.'
    }
  );
}

function normalizeRemoteShadowSource(rawSource) {
  if (!rawSource || typeof rawSource !== 'object') return null;
  const revisions = normalizeShadowSyncHistory(rawSource.revisions);
  const state = normalizeShadowSyncState(rawSource.state);
  const rawRecentRevisions = Array.isArray(rawSource.recentRevisions)
    ? rawSource.recentRevisions
    : (Array.isArray(rawSource.remoteHead?.recentRevisions) ? rawSource.remoteHead.recentRevisions : []);
  const derivedRecentRevisions = rawRecentRevisions.length
    ? rawRecentRevisions
    : revisions.slice(0, 8).map(entry => ({
        revisionId: entry.revisionId,
        baseRevisionId: entry.baseRevisionId || '',
        payloadSignature: entry.payloadSignature || '',
        commitStatus: entry.status || 'queued',
        createdAt: entry.createdAt || '',
        authorDeviceId: entry.deviceId || '',
        snapshotCounts: entry.counts || {}
      }));
  const recentRevisions = derivedRecentRevisions
    .map(normalizeRemoteRevisionSummary)
    .filter(Boolean);
  const remoteHistoryCount = Number.isFinite(Number(rawSource.remoteHistoryCount))
    ? Number(rawSource.remoteHistoryCount)
    : (Number.isFinite(Number(rawSource.remoteHead?.historyCount))
      ? Number(rawSource.remoteHead.historyCount)
      : revisions.length);
  const sourceName = typeof rawSource.sourceName === 'string' && rawSource.sourceName.trim() ? rawSource.sourceName.trim() : 'bundle-remot.json';
  const importedAt = typeof rawSource.importedAt === 'string' && !Number.isNaN(Date.parse(rawSource.importedAt))
    ? rawSource.importedAt
    : new Date().toISOString();
  const headRevisionId = state.lastRevisionId || revisions[0]?.revisionId || '';
  return {
    schema: rawSource.schema === SHADOW_SYNC_BUNDLE_SCHEMA ? rawSource.schema : SHADOW_SYNC_BUNDLE_SCHEMA,
    version: Number(rawSource.version || 1),
    sourceName,
    importedAt,
    remoteHistoryCount,
    recentRevisions,
    state: {
      ...state,
      lastRevisionId: headRevisionId,
      historyCount: revisions.length
    },
    revisions
  };
}

function normalizeRemoteSnapshotCounts(rawCounts) {
  if (!rawCounts || typeof rawCounts !== 'object') return null;
  const normalized = {
    folders: Number(rawCounts.folders || 0),
    documents: Number(rawCounts.documents || 0),
    deleted: Number(rawCounts.deleted || 0),
    versions: Number(rawCounts.versions || 0),
    attachments: Number(rawCounts.attachments || 0),
    total: Number(rawCounts.total || 0)
  };
  return Object.values(normalized).some(value => Number.isFinite(value) && value > 0) ? normalized : null;
}

function normalizeRemoteRevisionSummary(rawRevision) {
  if (!rawRevision || typeof rawRevision !== 'object') return null;
  const commitStatus = typeof rawRevision.commitStatus === 'string' && rawRevision.commitStatus.trim()
    ? rawRevision.commitStatus.trim()
    : (typeof rawRevision.commit_status === 'string' ? rawRevision.commit_status.trim() : 'unknown');
  return {
    revisionId: typeof rawRevision.revisionId === 'string' && rawRevision.revisionId.trim()
      ? rawRevision.revisionId.trim()
      : (typeof rawRevision.revision_id === 'string' ? rawRevision.revision_id.trim() : ''),
    baseRevisionId: typeof rawRevision.baseRevisionId === 'string'
      ? rawRevision.baseRevisionId
      : (typeof rawRevision.base_revision_id === 'string' ? rawRevision.base_revision_id : ''),
    payloadSignature: typeof rawRevision.payloadSignature === 'string'
      ? rawRevision.payloadSignature
      : (typeof rawRevision.payload_signature === 'string' ? rawRevision.payload_signature : ''),
    commitStatus,
    createdAt: typeof rawRevision.createdAt === 'string' && !Number.isNaN(Date.parse(rawRevision.createdAt))
      ? rawRevision.createdAt
      : (typeof rawRevision.created_at === 'string' && !Number.isNaN(Date.parse(rawRevision.created_at)) ? rawRevision.created_at : ''),
    authorDeviceId: typeof rawRevision.authorDeviceId === 'string'
      ? rawRevision.authorDeviceId
      : (typeof rawRevision.author_device_id === 'string' ? rawRevision.author_device_id : ''),
    snapshotCounts: normalizeRemoteSnapshotCounts(
      rawRevision.snapshotCounts
      || rawRevision.snapshot_counts
      || rawRevision.counts
      || null
    )
  };
}

function validateRemoteShadowRevisionIntegrity(entry, expectedWorkspaceId = '') {
  const payload = entry?.payload && typeof entry.payload === 'object' ? entry.payload : null;
  const revisionLabel = createShadowSyncShortId(entry?.revisionId || '');
  const syncDocs = Array.isArray(payload?.snapshot?.docs) ? payload.snapshot.docs : null;
  if (!payload || payload.schema !== SYNC_PAYLOAD_SCHEMA || !syncDocs) {
    throw new Error(`El bundle remot té una revisió incompatible (${revisionLabel}).`);
  }

  const revisionWorkspaceId = entry.workspaceId || payload.workspace?.id || '';
  if (!revisionWorkspaceId) {
    throw new Error(`El bundle remot té una revisió sense workspace (${revisionLabel}).`);
  }
  if (expectedWorkspaceId && revisionWorkspaceId !== expectedWorkspaceId) {
    throw new Error('El bundle remot barreja revisions de workspaces diferents.');
  }
  if ((payload.workspace?.id || '') && payload.workspace.id !== revisionWorkspaceId) {
    throw new Error(`El bundle remot té una revisió amb workspace inconsistent (${revisionLabel}).`);
  }
  if (!entry.payloadSignature) {
    throw new Error(`El bundle remot té una revisió sense payloadSignature (${revisionLabel}).`);
  }

  const expectedSignature = createSyncPayloadSignature(payload);
  if (entry.payloadSignature !== expectedSignature) {
    throw new Error(`El bundle remot té una revisió amb payload inconsistent (${revisionLabel}).`);
  }

  const expectedCounts = createSyncPayloadCounts(syncDocs);
  if (stableShadowSyncStringify(entry.counts || {}) !== stableShadowSyncStringify(expectedCounts)) {
    throw new Error(`El bundle remot té una revisió amb comptadors inconsistents (${revisionLabel}).`);
  }
  if (payload.snapshot?.counts && stableShadowSyncStringify(payload.snapshot.counts) !== stableShadowSyncStringify(expectedCounts)) {
    throw new Error(`El bundle remot té un snapshot inconsistent (${revisionLabel}).`);
  }
}

function validateRemoteShadowSourceIntegrity(source, options = {}) {
  if (!source || typeof source !== 'object') {
    throw new Error('La font remota actual no és vàlida.');
  }

  const revisions = normalizeShadowSyncHistory(source.revisions);
  if (!revisions.length) {
    throw new Error('El bundle remot no conté revisions shadow vàlides.');
  }

  const declaredHeadRevisionId = source.state?.lastRevisionId || '';
  if (declaredHeadRevisionId && !revisions.some(entry => entry.revisionId === declaredHeadRevisionId)) {
    throw new Error('L\'estat remot apunta a un head que no existeix dins del bundle.');
  }

  const headEntry = getShadowHistoryHead(revisions, declaredHeadRevisionId || revisions[0]?.revisionId || '');
  if (!headEntry) {
    throw new Error('No s\'ha pogut resoldre el head del bundle remot.');
  }

  const workspaceId = headEntry.workspaceId || headEntry.payload?.workspace?.id || '';
  revisions.forEach(entry => validateRemoteShadowRevisionIntegrity(entry, workspaceId));

  if (source.state?.lastPayloadSignature && headEntry.payloadSignature !== source.state.lastPayloadSignature) {
    throw new Error('L\'estat remot no concorda amb la payloadSignature del head.');
  }

  const rawStateHistoryCount = Number(options.rawState?.historyCount || 0);
  if (rawStateHistoryCount && rawStateHistoryCount !== revisions.length) {
    throw new Error('L\'estat remot declara un historyCount inconsistent amb el bundle.');
  }

  const remoteHistoryCount = Number(options.rawRemoteHistoryCount || source.remoteHistoryCount || 0);
  if (remoteHistoryCount && remoteHistoryCount < revisions.length) {
    throw new Error('L\'historial remot declarat és més curt que el bundle descarregat.');
  }

  const remoteDescriptor = options.remoteDescriptor;
  if (remoteDescriptor && typeof remoteDescriptor === 'object') {
    const descriptorWorkspaceId = readRemoteProviderHeadField(remoteDescriptor, ['workspaceId', 'workspace_id', 'localWorkspaceId', 'local_workspace_id']);
    const descriptorHeadRevisionId = readRemoteProviderHeadField(remoteDescriptor, ['headRevisionId', 'head_revision_id', 'currentRevisionId', 'current_revision_id']);
    const descriptorPayloadSignature = readRemoteProviderHeadField(remoteDescriptor, ['payloadSignature', 'payload_signature']);
    const descriptorHistoryCount = Number(remoteDescriptor?.historyCount || remoteDescriptor?.history_count || 0) || 0;
    if (descriptorWorkspaceId && workspaceId && descriptorWorkspaceId !== workspaceId) {
      throw new Error('El head remot declarat apunta a un altre workspace.');
    }
    if (descriptorHeadRevisionId && descriptorHeadRevisionId !== headEntry.revisionId) {
      throw new Error('El head remot declarat no coincideix amb el bundle descarregat.');
    }
    if (descriptorPayloadSignature && headEntry.payloadSignature && descriptorPayloadSignature !== headEntry.payloadSignature) {
      throw new Error('La payloadSignature del head remot no coincideix amb el bundle descarregat.');
    }
    if (descriptorHistoryCount && descriptorHistoryCount < revisions.length) {
      throw new Error('El head remot declara menys historial del que porta el bundle descarregat.');
    }
  }

  return {
    headEntry,
    revisions,
    workspaceId
  };
}

function readRemoteShadowSourceSnapshot() {
  const rawSource = safeJSONParse(localStorage.getItem(REMOTE_SHADOW_SOURCE_KEY), null);
  if (!rawSource) return null;
  try {
    const normalized = normalizeRemoteShadowSource(rawSource);
    validateRemoteShadowSourceIntegrity(normalized);
    return normalized;
  } catch (err) {
    console.warn("He descartat una font remota corrupta de shadow sync.", err);
    localStorage.removeItem(REMOTE_SHADOW_SOURCE_KEY);
    return null;
  }
}

function normalizeRemoteShadowAutomationDraft(rawDraft) {
  return {
    autoCheckOnStart: rawDraft?.autoCheckOnStart !== false,
    autoPullWhenClean: rawDraft?.autoPullWhenClean !== false, // Activat per defecte v1.1
    autoPushWhenStable: rawDraft?.autoPushWhenStable !== false // Activat per defecte v1.1
  };
}

function normalizeRemoteShadowConfig(rawConfig) {
  if (!rawConfig || typeof rawConfig !== 'object') return null;
  const trimmedUrl = typeof rawConfig.url === 'string' ? rawConfig.url.trim() : '';
  if (!trimmedUrl) return null;
  const automation = normalizeRemoteShadowAutomationDraft(rawConfig);
  return {
    mode: rawConfig.mode === 'provider-head-url' ? 'provider-head-url' : 'bundle-url',
    url: trimmedUrl,
    lastFetchedAt: typeof rawConfig.lastFetchedAt === 'string' ? rawConfig.lastFetchedAt : '',
    lastStatus: typeof rawConfig.lastStatus === 'string' ? rawConfig.lastStatus : 'idle',
    lastError: typeof rawConfig.lastError === 'string' ? rawConfig.lastError : '',
    autoCheckOnStart: automation.autoCheckOnStart,
    autoPullWhenClean: automation.autoPullWhenClean,
    autoPushWhenStable: automation.autoPushWhenStable
  };
}

function readRemoteShadowConfigSnapshot() {
  return normalizeRemoteShadowConfig(safeJSONParse(localStorage.getItem(REMOTE_SHADOW_CONFIG_KEY), null));
}

function getEffectiveRemoteShadowAutomationConfig(config = remoteShadowConfig) {
  return normalizeRemoteShadowAutomationDraft(config || remoteShadowAutomationDraft);
}

function buildRemoteShadowConfigSnapshot(overrides = {}) {
  const effectiveConfig = remoteShadowConfig || {};
  const automation = normalizeRemoteShadowAutomationDraft({
    ...getEffectiveRemoteShadowAutomationConfig(effectiveConfig),
    ...remoteShadowAutomationDraft,
    ...overrides
  });
  return {
    mode: overrides.mode || effectiveConfig.mode || getSelectedRemoteShadowMode(),
    url: typeof overrides.url === 'string'
      ? overrides.url
      : (effectiveConfig.url || ''),
    lastFetchedAt: typeof overrides.lastFetchedAt === 'string'
      ? overrides.lastFetchedAt
      : (effectiveConfig.lastFetchedAt || ''),
    lastStatus: typeof overrides.lastStatus === 'string'
      ? overrides.lastStatus
      : (effectiveConfig.lastStatus || 'idle'),
    lastError: typeof overrides.lastError === 'string'
      ? overrides.lastError
      : (effectiveConfig.lastError || ''),
    autoCheckOnStart: automation.autoCheckOnStart,
    autoPullWhenClean: automation.autoPullWhenClean,
    autoPushWhenStable: automation.autoPushWhenStable
  };
}

function setRemoteShadowAutomationDraft(partialDraft = {}, options = {}) {
  remoteShadowAutomationDraft = normalizeRemoteShadowAutomationDraft({
    ...remoteShadowAutomationDraft,
    ...partialDraft
  });
  const { persist = false, recheckAutomation = false } = options;
  if (persist && remoteShadowConfig?.url) {
    writeRemoteShadowConfigSnapshot(buildRemoteShadowConfigSnapshot(remoteShadowAutomationDraft));
    if (recheckAutomation) queueRemoteShadowAutomation('settings-change', { immediate: true });
    return;
  }
  updateRemoteShadowUI();
  if (recheckAutomation) queueRemoteShadowAutomation('settings-change', { immediate: true });
}

function writeRemoteShadowConfigSnapshot(config) {
  if (!config) {
    if (remoteAutoSyncTimer) clearTimeout(remoteAutoSyncTimer);
    remoteAutoSyncTimer = null;
    lastRemoteAutoSyncKey = '';
    localStorage.removeItem(REMOTE_SHADOW_CONFIG_KEY);
    remoteShadowConfig = null;
    updateRemoteShadowUI();
    return null;
  }
  const normalized = normalizeRemoteShadowConfig(config);
  if (!normalized) {
    localStorage.removeItem(REMOTE_SHADOW_CONFIG_KEY);
    remoteShadowConfig = null;
    updateRemoteShadowUI();
    return null;
  }
  try {
    localStorage.setItem(REMOTE_SHADOW_CONFIG_KEY, JSON.stringify(normalized));
  } catch (err) {
    console.warn("No s'ha pogut persistir la configuració remota de shadow sync.", err);
  }
  remoteShadowConfig = normalized;
  remoteShadowAutomationDraft = normalizeRemoteShadowAutomationDraft(normalized);
  remoteShadowDraftUrl = normalized.url || remoteShadowDraftUrl;
  updateRemoteShadowUI();
  return normalized;
}

function normalizeRemoteRevisionDownloadEntry(rawEntry, fallbackRevisionId = '') {
  if (!rawEntry || typeof rawEntry !== 'object') return null;
  const revisionId = typeof rawEntry.revisionId === 'string' && rawEntry.revisionId.trim()
    ? rawEntry.revisionId.trim()
    : (typeof fallbackRevisionId === 'string' ? fallbackRevisionId.trim() : '');
  if (!revisionId) return null;
  const downloadedAt = typeof rawEntry.downloadedAt === 'string' && !Number.isNaN(Date.parse(rawEntry.downloadedAt))
    ? rawEntry.downloadedAt
    : '';
  return {
    revisionId,
    workspaceId: typeof rawEntry.workspaceId === 'string' ? rawEntry.workspaceId : '',
    sourceName: typeof rawEntry.sourceName === 'string' ? rawEntry.sourceName : '',
    fileName: typeof rawEntry.fileName === 'string' ? rawEntry.fileName : '',
    downloadedAt: downloadedAt || new Date().toISOString()
  };
}

function normalizeRemoteRevisionDownloadRegistry(rawRegistry) {
  if (!rawRegistry || typeof rawRegistry !== 'object') return {};
  return Object.entries(rawRegistry).reduce((registry, [revisionId, rawEntry]) => {
    const normalizedEntry = normalizeRemoteRevisionDownloadEntry(rawEntry, revisionId);
    if (normalizedEntry) {
      registry[normalizedEntry.revisionId] = normalizedEntry;
    }
    return registry;
  }, {});
}

function readRemoteRevisionDownloadRegistry() {
  return normalizeRemoteRevisionDownloadRegistry(safeJSONParse(localStorage.getItem(REMOTE_REVISION_DOWNLOADS_KEY), null));
}

function writeRemoteRevisionDownloadRegistry(registry) {
  const normalized = normalizeRemoteRevisionDownloadRegistry(registry);
  try {
    if (Object.keys(normalized).length) {
      localStorage.setItem(REMOTE_REVISION_DOWNLOADS_KEY, JSON.stringify(normalized));
    } else {
      localStorage.removeItem(REMOTE_REVISION_DOWNLOADS_KEY);
    }
  } catch (err) {
    console.warn("No s'ha pogut persistir el registre local de revisions remotes descarregades.", err);
  }
  remoteRevisionDownloads = normalized;
  updateRemoteShadowUI();
  return normalized;
}

function getRemoteRevisionDownloadRecord(revisionId, registry = remoteRevisionDownloads) {
  const normalizedRevisionId = typeof revisionId === 'string' ? revisionId.trim() : '';
  if (!normalizedRevisionId || !registry || typeof registry !== 'object') return null;
  return normalizeRemoteRevisionDownloadEntry(registry[normalizedRevisionId], normalizedRevisionId);
}

function rememberRemoteRevisionDownload(revision, fileName) {
  const revisionId = typeof revision?.revisionId === 'string' ? revision.revisionId.trim() : '';
  if (!revisionId) return null;
  const nextEntry = normalizeRemoteRevisionDownloadEntry({
    revisionId,
    workspaceId: revision.workspaceId || revision.payload?.workspace?.id || '',
    sourceName: remoteShadowSource?.sourceName || '',
    fileName: typeof fileName === 'string' ? fileName.trim() : '',
    downloadedAt: new Date().toISOString()
  }, revisionId);
  if (!nextEntry) return null;
  const registry = writeRemoteRevisionDownloadRegistry({
    ...normalizeRemoteRevisionDownloadRegistry(remoteRevisionDownloads),
    [revisionId]: nextEntry
  });
  return registry[revisionId] || null;
}

function normalizeRemoteRevisionApplicationType(rawType) {
  return rawType === 'restore' ? 'restore' : 'apply';
}

function normalizeRemoteRevisionApplicationEntry(rawEntry, fallbackRevisionId = '') {
  if (!rawEntry || typeof rawEntry !== 'object') return null;
  const revisionId = typeof rawEntry.revisionId === 'string' && rawEntry.revisionId.trim()
    ? rawEntry.revisionId.trim()
    : (typeof fallbackRevisionId === 'string' ? fallbackRevisionId.trim() : '');
  if (!revisionId) return null;
  const appliedAt = typeof rawEntry.appliedAt === 'string' && !Number.isNaN(Date.parse(rawEntry.appliedAt))
    ? rawEntry.appliedAt
    : '';
  return {
    revisionId,
    actionType: normalizeRemoteRevisionApplicationType(rawEntry.actionType),
    workspaceId: typeof rawEntry.workspaceId === 'string' ? rawEntry.workspaceId : '',
    sourceName: typeof rawEntry.sourceName === 'string' ? rawEntry.sourceName : '',
    localRevisionId: typeof rawEntry.localRevisionId === 'string' ? rawEntry.localRevisionId : '',
    appliedAt: appliedAt || new Date().toISOString()
  };
}

function normalizeRemoteRevisionApplicationRegistry(rawRegistry) {
  if (!rawRegistry || typeof rawRegistry !== 'object') return {};
  return Object.entries(rawRegistry).reduce((registry, [revisionId, rawEntry]) => {
    const normalizedEntry = normalizeRemoteRevisionApplicationEntry(rawEntry, revisionId);
    if (normalizedEntry) {
      registry[normalizedEntry.revisionId] = normalizedEntry;
    }
    return registry;
  }, {});
}

function readRemoteRevisionApplicationRegistry() {
  return normalizeRemoteRevisionApplicationRegistry(safeJSONParse(localStorage.getItem(REMOTE_REVISION_APPLICATIONS_KEY), null));
}

function writeRemoteRevisionApplicationRegistry(registry) {
  const normalized = normalizeRemoteRevisionApplicationRegistry(registry);
  try {
    if (Object.keys(normalized).length) {
      localStorage.setItem(REMOTE_REVISION_APPLICATIONS_KEY, JSON.stringify(normalized));
    } else {
      localStorage.removeItem(REMOTE_REVISION_APPLICATIONS_KEY);
    }
  } catch (err) {
    console.warn("No s'ha pogut persistir el registre local de revisions remotes aplicades.", err);
  }
  remoteRevisionApplications = normalized;
  updateRemoteShadowUI();
  return normalized;
}

function getRemoteRevisionApplicationRecord(revisionId, registry = remoteRevisionApplications) {
  const normalizedRevisionId = typeof revisionId === 'string' ? revisionId.trim() : '';
  if (!normalizedRevisionId || !registry || typeof registry !== 'object') return null;
  return normalizeRemoteRevisionApplicationEntry(registry[normalizedRevisionId], normalizedRevisionId);
}

function rememberRemoteRevisionApplication(revision, options = {}) {
  const revisionId = typeof revision?.revisionId === 'string' ? revision.revisionId.trim() : '';
  if (!revisionId) return null;
  const nextEntry = normalizeRemoteRevisionApplicationEntry({
    revisionId,
    actionType: normalizeRemoteRevisionApplicationType(options.actionType),
    workspaceId: revision.workspaceId || revision.payload?.workspace?.id || '',
    sourceName: remoteShadowSource?.sourceName || '',
    localRevisionId: typeof options.localRevisionId === 'string' ? options.localRevisionId.trim() : '',
    appliedAt: new Date().toISOString()
  }, revisionId);
  if (!nextEntry) return null;
  const registry = writeRemoteRevisionApplicationRegistry({
    ...normalizeRemoteRevisionApplicationRegistry(remoteRevisionApplications),
    [revisionId]: nextEntry
  });
  return registry[revisionId] || null;
}

function getRemoteRevisionApplicationBadgeLabel(record) {
  if (!record) return '';
  return record.actionType === 'restore' ? 'Recuperada aquí' : 'Aplicada aquí';
}

function getRemoteRevisionApplicationLeadText(record) {
  if (!record) return '';
  const lead = record.actionType === 'restore' ? 'Recuperada localment' : 'Aplicada localment';
  return `${lead} ${formatShadowSyncMoment(record.appliedAt || '')}.`;
}

function writeRemoteShadowSourceSnapshot(source) {
  if (!source) {
    lastRemoteAutoSyncKey = '';
    localStorage.removeItem(REMOTE_SHADOW_SOURCE_KEY);
    remoteShadowSource = null;
    selectedRemoteHistoryRevisionId = '';
    updateRemoteShadowUI();
    return null;
  }
  const normalized = normalizeRemoteShadowSource(source);
  validateRemoteShadowSourceIntegrity(normalized, {
    rawState: source?.state,
    rawRemoteHistoryCount: source?.remoteHistoryCount,
    remoteDescriptor: source?.remoteHead
  });
  try {
    localStorage.setItem(REMOTE_SHADOW_SOURCE_KEY, JSON.stringify(normalized));
  } catch (err) {
    console.warn("No s'ha pogut persistir la font remota de shadow sync.", err);
  }
  remoteShadowSource = normalized;
  if (!selectedRemoteHistoryRevisionId || !normalized.recentRevisions.some(entry => entry.revisionId === selectedRemoteHistoryRevisionId)) {
    selectedRemoteHistoryRevisionId = normalized.state.lastRevisionId || normalized.recentRevisions[0]?.revisionId || '';
  }
  updateRemoteShadowUI();
  return normalized;
}

function normalizeRemoteProviderProfile(rawProfile) {
  if (!rawProfile || typeof rawProfile !== 'object') {
    return {
    preset: 'none',
    headerName: 'x-api-key',
    publicKey: '',
    baseUrl: '',
    functionName: 'sutsumu-head',
    headTable: 'sutsumu_workspace_heads',
    workspaceId: '',
    rememberSecret: false,
    lastValidatedAt: ''
  };
  }
  const preset = ['none', 'bearer', 'header', 'supabase', 'supabase-function'].includes(rawProfile.preset) ? rawProfile.preset : 'none';
  const headerName = typeof rawProfile.headerName === 'string' && rawProfile.headerName.trim()
    ? rawProfile.headerName.trim()
    : 'x-api-key';
  const publicKey = typeof rawProfile.publicKey === 'string' ? rawProfile.publicKey.trim() : '';
  const baseUrl = typeof rawProfile.baseUrl === 'string' ? rawProfile.baseUrl.trim() : '';
  const functionName = typeof rawProfile.functionName === 'string' && rawProfile.functionName.trim()
    ? rawProfile.functionName.trim()
    : 'sutsumu-head';
  const headTable = typeof rawProfile.headTable === 'string' && rawProfile.headTable.trim()
    ? rawProfile.headTable.trim()
    : 'sutsumu_workspace_heads';
  const workspaceId = typeof rawProfile.workspaceId === 'string' ? rawProfile.workspaceId.trim() : '';
  return {
    preset,
    headerName,
    publicKey,
    baseUrl,
    functionName,
    headTable,
    workspaceId,
    rememberSecret: rawProfile.rememberSecret === true,
    lastValidatedAt: typeof rawProfile.lastValidatedAt === 'string' ? rawProfile.lastValidatedAt : ''
  };
}

function readRemoteProviderProfileSnapshot() {
  return normalizeRemoteProviderProfile(safeJSONParse(localStorage.getItem(REMOTE_PROVIDER_PROFILE_KEY), null));
}

function writeRemoteProviderProfileSnapshot(profile) {
  const normalized = normalizeRemoteProviderProfile(profile);
  try {
    localStorage.setItem(REMOTE_PROVIDER_PROFILE_KEY, JSON.stringify(normalized));
  } catch (err) {
    console.warn("No s'ha pogut persistir el perfil remot del backend.", err);
  }
  remoteProviderProfile = normalized;
  updateRemoteShadowUI();
  return normalized;
}

function readRemoteProviderSecretSnapshot(profile = remoteProviderProfile) {
  const normalized = normalizeRemoteProviderProfile(profile);
  const localSecret = localStorage.getItem(REMOTE_PROVIDER_SECRET_KEY) || '';
  const sessionSecret = sessionStorage.getItem(REMOTE_PROVIDER_SECRET_SESSION_KEY) || '';
  return normalized.rememberSecret ? (localSecret || sessionSecret || '') : (sessionSecret || '');
}

function persistRemoteProviderSecret(secret, remember = false) {
  const normalizedSecret = typeof secret === 'string' ? secret.trim() : '';
  if (remember && normalizedSecret) {
    try {
      localStorage.setItem(REMOTE_PROVIDER_SECRET_KEY, normalizedSecret);
    } catch (err) {
      console.warn("No s'ha pogut persistir el secret remot al dispositiu.", err);
    }
  } else {
    localStorage.removeItem(REMOTE_PROVIDER_SECRET_KEY);
  }
  if (normalizedSecret) {
    sessionStorage.setItem(REMOTE_PROVIDER_SECRET_SESSION_KEY, normalizedSecret);
  } else {
    sessionStorage.removeItem(REMOTE_PROVIDER_SECRET_SESSION_KEY);
  }
  remoteProviderSecret = normalizedSecret;
  updateRemoteShadowUI();
  return normalizedSecret;
}

function createRemoteProviderConnectorId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `connector-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeRemoteProviderConnector(rawConnector) {
  if (!rawConnector || typeof rawConnector !== 'object') return null;
  const id = typeof rawConnector.id === 'string' && rawConnector.id.trim() ? rawConnector.id.trim() : '';
  if (!id) return null;
  const label = typeof rawConnector.label === 'string' && rawConnector.label.trim() ? rawConnector.label.trim() : 'Connector backend';
  return {
    id,
    label,
    mode: rawConnector.mode === 'provider-head-url' ? 'provider-head-url' : 'provider-head-url',
    url: typeof rawConnector.url === 'string' ? rawConnector.url.trim() : '',
    profile: normalizeRemoteProviderProfile(rawConnector.profile),
    updatedAt: typeof rawConnector.updatedAt === 'string' ? rawConnector.updatedAt : new Date().toISOString()
  };
}

function normalizeRemoteProviderConnectors(rawConnectors) {
  if (!Array.isArray(rawConnectors)) return [];
  const seen = new Set();
  return rawConnectors
    .map(normalizeRemoteProviderConnector)
    .filter(Boolean)
    .filter(connector => {
      if (seen.has(connector.id)) return false;
      seen.add(connector.id);
      return true;
    })
    .sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')));
}

function readRemoteProviderConnectorsSnapshot() {
  return normalizeRemoteProviderConnectors(safeJSONParse(localStorage.getItem(REMOTE_PROVIDER_CONNECTORS_KEY), []));
}

function writeRemoteProviderConnectorsSnapshot(connectors) {
  const normalized = normalizeRemoteProviderConnectors(connectors);
  try {
    localStorage.setItem(REMOTE_PROVIDER_CONNECTORS_KEY, JSON.stringify(normalized));
  } catch (err) {
    console.warn("No s'ha pogut persistir la llista de connectors remots.", err);
  }
  remoteProviderConnectors = normalized;
  updateRemoteShadowUI();
  return normalized;
}

function readRemoteProviderConnectorSecretsSnapshot() {
  const rawMap = safeJSONParse(localStorage.getItem(REMOTE_PROVIDER_CONNECTOR_SECRETS_KEY), {});
  if (!rawMap || typeof rawMap !== 'object') return {};
  return Object.fromEntries(
    Object.entries(rawMap)
      .filter(([key, value]) => typeof key === 'string' && key.trim() && typeof value === 'string' && value.trim())
      .map(([key, value]) => [key.trim(), value.trim()])
  );
}

function writeRemoteProviderConnectorSecretsSnapshot(secretMap) {
  const normalized = secretMap && typeof secretMap === 'object'
    ? Object.fromEntries(
      Object.entries(secretMap)
        .filter(([key, value]) => typeof key === 'string' && key.trim() && typeof value === 'string' && value.trim())
        .map(([key, value]) => [key.trim(), value.trim()])
    )
    : {};
  try {
    localStorage.setItem(REMOTE_PROVIDER_CONNECTOR_SECRETS_KEY, JSON.stringify(normalized));
  } catch (err) {
    console.warn("No s'ha pogut persistir el mapa de secrets dels connectors remots.", err);
  }
  remoteProviderConnectorSecrets = normalized;
  return normalized;
}

function readActiveRemoteProviderConnectorId() {
  const stored = localStorage.getItem(REMOTE_PROVIDER_ACTIVE_CONNECTOR_KEY) || '';
  return stored.trim();
}

function writeActiveRemoteProviderConnectorId(connectorId) {
  const normalized = typeof connectorId === 'string' ? connectorId.trim() : '';
  if (normalized) {
    localStorage.setItem(REMOTE_PROVIDER_ACTIVE_CONNECTOR_KEY, normalized);
  } else {
    localStorage.removeItem(REMOTE_PROVIDER_ACTIVE_CONNECTOR_KEY);
  }
  activeRemoteProviderConnectorId = normalized;
  return normalized;
}

function findRemoteProviderConnector(connectorId = activeRemoteProviderConnectorId) {
  const normalizedId = typeof connectorId === 'string' ? connectorId.trim() : '';
  return remoteProviderConnectors.find(connector => connector.id === normalizedId) || null;
}

function suggestRemoteProviderConnectorLabel(profile = getDraftRemoteProviderProfile(), rawUrl = remoteShadowDraftUrl || '') {
  const normalized = normalizeRemoteProviderProfile(profile);
  if (normalized.baseUrl) {
    try {
      const hostname = new URL(normalized.baseUrl, window.location.href).hostname.replace(/^www\./, '');
      return normalized.preset === 'supabase' ? `Supabase ${hostname}` : hostname;
    } catch (_err) {
      return normalized.baseUrl;
    }
  }
  if (rawUrl) {
    try {
      return new URL(rawUrl, window.location.href).hostname.replace(/^www\./, '');
    } catch (_err) {
      return rawUrl;
    }
  }
  if (normalized.preset === 'supabase') return 'Supabase remot';
  if (normalized.preset === 'supabase-function') return 'Supabase Edge';
  if (normalized.preset === 'bearer') return 'Backend bearer';
  if (normalized.preset === 'header') return 'Backend capçalera';
  return 'Connector backend';
}

function updateRemoteProviderConnectorUI() {
  if (remoteProviderConnectorSelectEl) {
    const options = ['<option value="">Connector actual</option>']
      .concat(remoteProviderConnectors.map(connector => `<option value="${escapeHtml(connector.id)}">${escapeHtml(connector.label)}</option>`));
    remoteProviderConnectorSelectEl.innerHTML = options.join('');
    remoteProviderConnectorSelectEl.value = findRemoteProviderConnector(activeRemoteProviderConnectorId)?.id || '';
  }
  if (remoteProviderConnectorNameInput && document.activeElement !== remoteProviderConnectorNameInput) {
    const activeConnector = findRemoteProviderConnector(activeRemoteProviderConnectorId);
    remoteProviderConnectorNameInput.value = activeConnector?.label || '';
  }
  if (deleteRemoteProviderConnectorBtn) {
    deleteRemoteProviderConnectorBtn.disabled = !findRemoteProviderConnector(activeRemoteProviderConnectorId);
  }
}

function applyRemoteProviderConnector(connectorId, options = {}) {
  const { silent = false, forceInputs = true } = options;
  const connector = findRemoteProviderConnector(connectorId);
  if (!connector) {
    writeActiveRemoteProviderConnectorId('');
    updateRemoteShadowUI();
    return false;
  }
  writeActiveRemoteProviderConnectorId(connector.id);
  remoteShadowDraftUrl = connector.url || '';
  remoteProviderProfile = normalizeRemoteProviderProfile(connector.profile);
  const rememberedSecret = remoteProviderConnectorSecrets?.[connector.id] || '';
  try {
    localStorage.setItem(REMOTE_PROVIDER_PROFILE_KEY, JSON.stringify(remoteProviderProfile));
  } catch (err) {
    console.warn("No s'ha pogut persistir el perfil aplicat del connector remot.", err);
  }
  persistRemoteProviderSecret(rememberedSecret, remoteProviderProfile.rememberSecret);
  if (remoteShadowModeSelectEl) {
    remoteShadowModeSelectEl.value = connector.mode || 'provider-head-url';
  }
  updateRemoteShadowUI({ forceInputs });
  if (!silent) showToast(`Connector remot aplicat: ${connector.label}`);
  return true;
}

function saveRemoteProviderConnector() {
  const connectorLabel = String(remoteProviderConnectorNameInput?.value || '').trim() || suggestRemoteProviderConnectorLabel();
  const currentSelectionId = String(remoteProviderConnectorSelectEl?.value || activeRemoteProviderConnectorId || '').trim();
  const existing = findRemoteProviderConnector(currentSelectionId);
  const connectorId = existing?.id || createRemoteProviderConnectorId();
  const profile = getDraftRemoteProviderProfile();
  const secret = getDraftRemoteProviderSecret();
  const connector = {
    id: connectorId,
    label: connectorLabel,
    mode: 'provider-head-url',
    url: String(remoteShadowDraftUrl || remoteShadowUrlInput?.value || '').trim(),
    profile,
    updatedAt: new Date().toISOString()
  };
  const nextConnectors = existing
    ? remoteProviderConnectors.map(entry => (entry.id === connectorId ? connector : entry))
    : [connector].concat(remoteProviderConnectors);
  writeRemoteProviderConnectorsSnapshot(nextConnectors);
  writeActiveRemoteProviderConnectorId(connectorId);
  if (profile.rememberSecret && secret) {
    writeRemoteProviderConnectorSecretsSnapshot({
      ...remoteProviderConnectorSecrets,
      [connectorId]: secret
    });
  } else if (remoteProviderConnectorSecrets[connectorId]) {
    const nextSecrets = { ...remoteProviderConnectorSecrets };
    delete nextSecrets[connectorId];
    writeRemoteProviderConnectorSecretsSnapshot(nextSecrets);
  }
  writeRemoteProviderProfileSnapshot(profile);
  persistRemoteProviderSecret(secret, profile.rememberSecret);
  remoteShadowDraftUrl = connector.url || '';
  updateRemoteShadowUI({ forceInputs: true });
  showToast(existing ? `Connector remot actualitzat: ${connectorLabel}` : `Connector remot desat: ${connectorLabel}`);
}

function deleteRemoteProviderConnector() {
  const connectorId = String(remoteProviderConnectorSelectEl?.value || activeRemoteProviderConnectorId || '').trim();
  const connector = findRemoteProviderConnector(connectorId);
  if (!connector) {
    showToast('No hi ha cap connector remot seleccionat.', 'info');
    return;
  }
  remoteProviderConnectors = writeRemoteProviderConnectorsSnapshot(remoteProviderConnectors.filter(entry => entry.id !== connector.id));
  if (remoteProviderConnectorSecrets[connector.id]) {
    const nextSecrets = { ...remoteProviderConnectorSecrets };
    delete nextSecrets[connector.id];
    writeRemoteProviderConnectorSecretsSnapshot(nextSecrets);
  }
  if (activeRemoteProviderConnectorId === connector.id) {
    writeActiveRemoteProviderConnectorId('');
  }
  updateRemoteShadowUI();
  showToast(`Connector remot eliminat: ${connector.label}`, 'info');
}

function getSelectedRemoteProviderPreset() {
  return remoteProviderPresetSelectEl?.value || remoteProviderProfile?.preset || 'none';
}

function getDraftRemoteProviderProfile() {
  return normalizeRemoteProviderProfile({
    preset: getSelectedRemoteProviderPreset(),
    headerName: remoteProviderHeaderNameInput?.value || remoteProviderProfile?.headerName || 'x-api-key',
    publicKey: remoteProviderPublicKeyInput?.value || remoteProviderProfile?.publicKey || '',
    baseUrl: remoteProviderBaseUrlInput?.value || remoteProviderProfile?.baseUrl || '',
    functionName: remoteProviderFunctionNameInput?.value || remoteProviderProfile?.functionName || 'sutsumu-head',
    headTable: remoteProviderHeadTableInput?.value || remoteProviderProfile?.headTable || 'sutsumu_workspace_heads',
    workspaceId: remoteProviderWorkspaceIdInput?.value || remoteProviderProfile?.workspaceId || '',
    rememberSecret: remoteProviderRememberSecretInput?.checked ?? remoteProviderProfile?.rememberSecret ?? false,
    lastValidatedAt: remoteProviderProfile?.lastValidatedAt || ''
  });
}

function getDraftRemoteProviderSecret() {
  return typeof remoteProviderSecretInput?.value === 'string' && remoteProviderSecretInput.value.trim()
    ? remoteProviderSecretInput.value.trim()
    : (remoteProviderSecret || '');
}

function getRemoteProviderValidationError(profile = getDraftRemoteProviderProfile(), secret = getDraftRemoteProviderSecret()) {
  const normalized = normalizeRemoteProviderProfile(profile);
  if (normalized.preset === 'bearer' && !secret) {
    return 'Falta el token Bearer del backend remot.';
  }
  if (normalized.preset === 'header') {
    if (!normalized.headerName) return 'Falta el nom de la capçalera API remota.';
    if (!secret) return 'Falta el valor de la capçalera API remota.';
  }
  if (normalized.preset === 'supabase' && !normalized.publicKey) {
    return "Falta l'anon key pública de Supabase.";
  }
  if (normalized.preset === 'supabase-function') {
    if (!normalized.baseUrl) return 'Falta la URL base del projecte Supabase.';
    if (!normalized.workspaceId) return 'Falta el local workspace id per a la Edge Function.';
    if (!normalized.functionName) return 'Falta el nom de la Edge Function de Supabase.';
    if (!secret) return 'Falta la shared key local de la Edge Function.';
  }
  return '';
}

function canBuildSupabaseHeadUrl(profile = getDraftRemoteProviderProfile()) {
  const normalized = normalizeRemoteProviderProfile(profile);
  return normalized.preset === 'supabase' && Boolean(normalized.baseUrl && normalized.workspaceId);
}

function canBuildSupabaseFunctionHeadUrl(profile = getDraftRemoteProviderProfile()) {
  const normalized = normalizeRemoteProviderProfile(profile);
  return normalized.preset === 'supabase-function'
    && Boolean(normalized.baseUrl && normalized.workspaceId && normalized.functionName);
}

function normalizeSupabaseRestBaseUrl(baseUrl) {
  const trimmed = String(baseUrl || '').trim();
  if (!trimmed) throw new Error('Falta la URL base de Supabase.');
  const parsed = new URL(trimmed, window.location.href);
  const cleanPath = parsed.pathname.replace(/\/+$/, '');
  parsed.pathname = cleanPath.endsWith('/rest/v1') ? cleanPath : `${cleanPath}/rest/v1`;
  parsed.search = '';
  parsed.hash = '';
  return parsed;
}

function normalizeSupabaseProjectBaseUrl(baseUrl) {
  const restUrl = normalizeSupabaseRestBaseUrl(baseUrl);
  const path = restUrl.pathname.replace(/\/+$/, '');
  restUrl.pathname = path.endsWith('/rest/v1') ? path.slice(0, -8) || '/' : path || '/';
  restUrl.search = '';
  restUrl.hash = '';
  return restUrl;
}

function buildSupabaseStorageObjectUrl(baseUrl, storagePath, access = 'public') {
  const normalizedPath = String(storagePath || '').trim().replace(/^\/+/, '');
  if (!normalizedPath) {
    throw new Error('Falta la ruta de storage del bundle remot.');
  }
  const base = normalizeSupabaseProjectBaseUrl(baseUrl);
  const accessSegment = access === 'authenticated' ? 'authenticated' : 'public';
  const encodedPath = normalizedPath.split('/').map(part => encodeURIComponent(part)).join('/');
  base.pathname = `${base.pathname.replace(/\/+$/, '')}/storage/v1/object/${accessSegment}/${encodedPath}`;
  return base.toString();
}

function buildSupabaseHeadUrl(profile = getDraftRemoteProviderProfile()) {
  const normalized = normalizeRemoteProviderProfile(profile);
  if (!canBuildSupabaseHeadUrl(normalized)) {
    throw new Error('Per construir la URL de Supabase cal la URL base i el local workspace id.');
  }
  const baseUrl = normalizeSupabaseRestBaseUrl(normalized.baseUrl);
  const safeTable = encodeURIComponent((normalized.headTable || 'sutsumu_workspace_heads').replace(/^\/+/, ''));
  baseUrl.pathname = `${baseUrl.pathname.replace(/\/+$/, '')}/${safeTable}`;
  baseUrl.searchParams.set('select', 'provider,local_workspace_id,name,current_revision_id,payload_signature,bundle_url,bundle_storage_path,bundle_access,updated_at');
  baseUrl.searchParams.set('local_workspace_id', `eq.${normalized.workspaceId}`);
  baseUrl.searchParams.set('limit', '1');
  return baseUrl.toString();
}

function buildSupabaseFunctionHeadUrl(profile = getDraftRemoteProviderProfile()) {
  const normalized = normalizeRemoteProviderProfile(profile);
  if (!canBuildSupabaseFunctionHeadUrl(normalized)) {
    throw new Error('Per construir la URL de la Edge Function cal la URL base, el nom de funcio i el local workspace id.');
  }
  const baseUrl = new URL(normalized.baseUrl, window.location.href);
  const cleanPath = baseUrl.pathname.replace(/\/+$/, '');
  baseUrl.pathname = cleanPath.endsWith('/functions/v1')
    ? `${cleanPath}/${encodeURIComponent(normalized.functionName)}`
    : `${cleanPath}/functions/v1/${encodeURIComponent(normalized.functionName)}`;
  baseUrl.search = '';
  baseUrl.hash = '';
  baseUrl.searchParams.set('workspace_id', normalized.workspaceId);
  return baseUrl.toString();
}

function buildRemoteProviderAuthHeaders(profile = remoteProviderProfile, secret = remoteProviderSecret) {
  const normalized = normalizeRemoteProviderProfile(profile);
  const trimmedSecret = typeof secret === 'string' ? secret.trim() : '';
  if (normalized.preset === 'bearer') {
    return { 'Authorization': `Bearer ${trimmedSecret}` };
  }
  if (normalized.preset === 'header') {
    return { [normalized.headerName || 'x-api-key']: trimmedSecret };
  }
  if (normalized.preset === 'supabase') {
    const bearerValue = trimmedSecret || normalized.publicKey;
    return {
      'apikey': normalized.publicKey,
      'Authorization': `Bearer ${bearerValue}`
    };
  }
  if (normalized.preset === 'supabase-function') {
    return {
      'apikey': normalized.publicKey,
      'Authorization': `Bearer ${normalized.publicKey}`,
      'x-sutsumu-key': trimmedSecret
    };
  }
  return {};
}

function updateRemoteShadowConnectButtonState() {
  if (!connectRemoteShadowUrlBtn) return;
  const draftProfile = getDraftRemoteProviderProfile();
  const rawUrl = String(remoteShadowDraftUrl || remoteShadowUrlInput?.value || '').trim();
  if (!rawUrl) {
    if (getSelectedRemoteShadowMode() === 'provider-head-url' && (canBuildSupabaseHeadUrl(draftProfile) || canBuildSupabaseFunctionHeadUrl(draftProfile))) {
      const validationError = getRemoteProviderValidationError(draftProfile);
      connectRemoteShadowUrlBtn.disabled = Boolean(validationError);
      return;
    }
    connectRemoteShadowUrlBtn.disabled = true;
    return;
  }
  if (getSelectedRemoteShadowMode() !== 'provider-head-url') {
    connectRemoteShadowUrlBtn.disabled = false;
    return;
  }
  const validationError = getRemoteProviderValidationError(draftProfile);
  connectRemoteShadowUrlBtn.disabled = Boolean(validationError);
}

function getRemoteShadowSourceLabel() {
  if (remoteShadowConfig?.url) {
    return remoteShadowConfig.mode === 'provider-head-url'
      ? `head:${remoteShadowConfig.url}`
      : remoteShadowConfig.url;
  }
  return remoteShadowSource?.sourceName || 'encara no';
}

function getSelectedRemoteShadowMode() {
  return remoteShadowModeSelectEl?.value === 'provider-head-url' ? 'provider-head-url' : (remoteShadowConfig?.mode || 'bundle-url');
}

function updateRemoteProviderModeUI(options = {}) {
  const { forceInputs = false } = options;
  const mode = getSelectedRemoteShadowMode();
  if (remoteShadowModeSelectEl && remoteShadowModeSelectEl.value !== mode) {
    remoteShadowModeSelectEl.value = mode;
  }
  if (!remoteShadowUrlInput) return;
  remoteShadowUrlInput.placeholder = mode === 'provider-head-url'
    ? 'https://.../head.json o /head.json'
    : 'https://.../shadow-bundle.json o /shadow-bundle.json';
  if (remoteProviderProfileCardEl) {
    remoteProviderProfileCardEl.classList.toggle('hidden', mode !== 'provider-head-url');
  }
  if (mode !== 'provider-head-url') {
    updateRemoteShadowConnectButtonState();
    return;
  }
  const profile = normalizeRemoteProviderProfile(remoteProviderProfile);
  const preset = getSelectedRemoteProviderPreset();
  const effectivePreset = ['none', 'bearer', 'header', 'supabase', 'supabase-function'].includes(preset) ? preset : profile.preset;
  if (remoteProviderPresetSelectEl && remoteProviderPresetSelectEl.value !== effectivePreset) {
    remoteProviderPresetSelectEl.value = effectivePreset;
  }
  if (remoteProviderHeaderNameInput && (forceInputs || document.activeElement !== remoteProviderHeaderNameInput)) {
    remoteProviderHeaderNameInput.value = profile.headerName || 'x-api-key';
  }
  if (remoteProviderPublicKeyInput && (forceInputs || document.activeElement !== remoteProviderPublicKeyInput)) {
    remoteProviderPublicKeyInput.value = profile.publicKey || '';
  }
  if (remoteProviderBaseUrlInput && (forceInputs || document.activeElement !== remoteProviderBaseUrlInput)) {
    remoteProviderBaseUrlInput.value = profile.baseUrl || '';
  }
  if (remoteProviderFunctionNameInput && (forceInputs || document.activeElement !== remoteProviderFunctionNameInput)) {
    remoteProviderFunctionNameInput.value = profile.functionName || 'sutsumu-head';
  }
  if (remoteProviderHeadTableInput && (forceInputs || document.activeElement !== remoteProviderHeadTableInput)) {
    remoteProviderHeadTableInput.value = profile.headTable || 'sutsumu_workspace_heads';
  }
  if (remoteProviderWorkspaceIdInput && (forceInputs || document.activeElement !== remoteProviderWorkspaceIdInput)) {
    remoteProviderWorkspaceIdInput.value = profile.workspaceId || syncPrepState?.workspace?.id || '';
  }
  if (remoteProviderSecretInput && (forceInputs || document.activeElement !== remoteProviderSecretInput)) {
    remoteProviderSecretInput.value = remoteProviderSecret || '';
  }
  if (remoteProviderRememberSecretInput) {
    remoteProviderRememberSecretInput.checked = profile.rememberSecret === true;
  }
  const showHeaderName = effectivePreset === 'header';
  const showPublicKey = effectivePreset === 'supabase' || effectivePreset === 'supabase-function';
  const showSupabaseRestBuilder = effectivePreset === 'supabase';
  const showSupabaseFunctionBuilder = effectivePreset === 'supabase-function';
  const showSecret = effectivePreset === 'bearer' || effectivePreset === 'header' || effectivePreset === 'supabase' || effectivePreset === 'supabase-function';
  remoteProviderHeaderNameWrapEl?.classList.toggle('hidden', !showHeaderName);
  remoteProviderPublicKeyWrapEl?.classList.toggle('hidden', !showPublicKey);
  remoteProviderBaseUrlWrapEl?.classList.toggle('hidden', !(showSupabaseRestBuilder || showSupabaseFunctionBuilder));
  remoteProviderFunctionNameWrapEl?.classList.toggle('hidden', !showSupabaseFunctionBuilder);
  remoteProviderHeadTableWrapEl?.classList.toggle('hidden', !showSupabaseRestBuilder);
  remoteProviderWorkspaceIdWrapEl?.classList.toggle('hidden', !(showSupabaseRestBuilder || showSupabaseFunctionBuilder));
  remoteProviderSecretWrapEl?.classList.toggle('hidden', !showSecret);
  remoteProviderRememberWrapEl?.classList.toggle('hidden', !showSecret);
  if (remoteProviderSecretLabelEl) {
    remoteProviderSecretLabelEl.textContent = effectivePreset === 'supabase'
      ? 'Access token usuari (opcional)'
      : (effectivePreset === 'supabase-function'
        ? 'Shared key'
        : (effectivePreset === 'header' ? 'Valor capçalera' : 'Token'));
  }
  if (remoteProviderSecretInput) {
    remoteProviderSecretInput.placeholder = effectivePreset === 'supabase'
      ? 'Opcional: bearer de sessió usuari'
      : (effectivePreset === 'supabase-function'
        ? 'Shared key local de la Edge Function'
        : (effectivePreset === 'header' ? 'Valor local de la capçalera remota' : 'Token local del backend'));
  }
  if (remoteProviderProfileHintEl) {
    if (effectivePreset === 'supabase') {
      remoteProviderProfileHintEl.textContent = "Mode preparat per Supabase: pots enganxar una URL de head completa o només la URL del projecte i el local workspace id. Sutsumu construirà la consulta REST segura i acceptarà una fila PostgREST o un descriptor head remot. El push manual complet queda reservat als backends que també acceptin POST segur.";
    } else if (effectivePreset === 'supabase-function') {
      remoteProviderProfileHintEl.textContent = "Mode preparat per Supabase Edge Functions: amb URL del projecte, nom de funcio, local workspace id i shared key, Sutsumu construirà la URL del head segur. En aquesta fase també pot fer push manual si la funció accepta POST amb el contracte de Sutsumu.";
    } else if (effectivePreset === 'header') {
      remoteProviderProfileHintEl.textContent = 'Mode capçalera API: el nom i valor de la capçalera només es fan servir en aquest dispositiu.';
    } else if (effectivePreset === 'bearer') {
      remoteProviderProfileHintEl.textContent = 'Mode Bearer: el token queda local i només serveix per llegir/comparar el head remot.';
    } else {
      remoteProviderProfileHintEl.textContent = 'Aquest perfil es queda només en aquest dispositiu i només serveix per llegir el head remot de manera segura.';
    }
  }
  updateRemoteShadowConnectButtonState();
}

function unwrapRemoteProviderHeadCandidate(rawHead) {
  if (!rawHead) return null;
  if (Array.isArray(rawHead)) {
    return rawHead[0] && typeof rawHead[0] === 'object' ? rawHead[0] : null;
  }
  if (typeof rawHead !== 'object') return null;
  if (rawHead.schema === REMOTE_PROVIDER_HEAD_SCHEMA) return rawHead;
  if (Array.isArray(rawHead.data)) {
    return rawHead.data[0] && typeof rawHead.data[0] === 'object' ? rawHead.data[0] : null;
  }
  if (rawHead.data && typeof rawHead.data === 'object') {
    return rawHead.data;
  }
  if (rawHead.record && typeof rawHead.record === 'object') {
    return rawHead.record;
  }
  return rawHead;
}

function readRemoteProviderHeadField(candidate, keys = []) {
  for (const key of keys) {
    const value = candidate?.[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function readRemoteProviderHeadArrayField(candidate, keys = []) {
  for (const key of keys) {
    const value = candidate?.[key];
    if (Array.isArray(value)) return value;
  }
  return [];
}

function createRemoteShadowConnectionError(message, remoteStatus = 'error') {
  const err = new Error(message);
  err.remoteStatus = remoteStatus;
  return err;
}

async function readJsonResponseSafely(response) {
  if (!response) return null;
  try {
    return await response.json();
  } catch (_err) {
    return null;
  }
}

function normalizeRemoteProviderHead(rawHead, sourceUrl = '', providerProfile = remoteProviderProfile) {
  if (Array.isArray(rawHead) && rawHead.length === 0) {
    throw createRemoteShadowConnectionError('No hi ha cap head remot per a aquest workspace.', 'empty');
  }
  if (rawHead && typeof rawHead === 'object' && Array.isArray(rawHead.data) && rawHead.data.length === 0) {
    throw createRemoteShadowConnectionError('No hi ha cap head remot per a aquest workspace.', 'empty');
  }
  const candidate = unwrapRemoteProviderHeadCandidate(rawHead);
  if (!candidate || typeof candidate !== 'object') {
    throw new Error('La URL remota no retorna un head provider compatible.');
  }
  const providerName = readRemoteProviderHeadField(candidate, ['provider', 'provider_name']) || (candidate.schema === REMOTE_PROVIDER_HEAD_SCHEMA ? 'generic-rest' : 'supabase-rest');
  const rawBundleUrl = candidate.schema === REMOTE_PROVIDER_HEAD_SCHEMA
    ? readRemoteProviderHeadField(candidate, ['bundleUrl'])
    : readRemoteProviderHeadField(candidate, ['bundleUrl', 'bundle_url', 'shadowBundleUrl', 'shadow_bundle_url']);
  const rawBundleStoragePath = readRemoteProviderHeadField(candidate, ['bundleStoragePath', 'bundle_storage_path', 'shadowBundlePath', 'shadow_bundle_path']);
  const bundleAccess = readRemoteProviderHeadField(candidate, ['bundleAccess', 'bundle_access', 'storageAccess', 'storage_access']) || 'public';
  let resolvedBundleUrl = '';
  if (rawBundleUrl) {
    resolvedBundleUrl = new URL(rawBundleUrl, sourceUrl || window.location.href).toString();
  } else if (rawBundleStoragePath && providerName === 'supabase-rest') {
    const profileBaseUrl = normalizeRemoteProviderProfile(providerProfile).baseUrl || sourceUrl;
    if (!profileBaseUrl) {
      throw new Error('El head remot inclou bundle_storage_path però falta la base URL de Supabase per resoldre-la.');
    }
    resolvedBundleUrl = buildSupabaseStorageObjectUrl(profileBaseUrl, rawBundleStoragePath, bundleAccess);
  } else {
    throw new Error('El head remot no inclou cap bundleUrl o bundle_storage_path compatible.');
  }
  return {
    schema: REMOTE_PROVIDER_HEAD_SCHEMA,
    provider: providerName,
    workspaceId: readRemoteProviderHeadField(candidate, ['workspaceId', 'workspace_id', 'localWorkspaceId', 'local_workspace_id']),
    workspaceName: readRemoteProviderHeadField(candidate, ['workspaceName', 'workspace_name', 'name']),
    headRevisionId: readRemoteProviderHeadField(candidate, ['headRevisionId', 'head_revision_id', 'currentRevisionId', 'current_revision_id']),
    payloadSignature: readRemoteProviderHeadField(candidate, ['payloadSignature', 'payload_signature']),
    bundleUrl: resolvedBundleUrl,
    bundleStoragePath: rawBundleStoragePath,
    bundleAccess,
    historyCount: Number(candidate?.historyCount || candidate?.history_count || 0) || 0,
    recentRevisions: readRemoteProviderHeadArrayField(candidate, ['recentRevisions', 'recent_revisions'])
      .map(normalizeRemoteRevisionSummary)
      .filter(Boolean),
    fetchedAt: readRemoteProviderHeadField(candidate, ['fetchedAt', 'fetched_at', 'updatedAt', 'updated_at']) || new Date().toISOString()
  };
}

async function fetchRemoteShadowBundleFromUrl(url, extraHeaders = null) {
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
      ...(extraHeaders || {})
    }
  });
  if (!response.ok) {
    throw new Error(`No s'ha pogut llegir la URL remota (${response.status}).`);
  }
  const parsed = await response.json();
  if (parsed?.schema !== SHADOW_SYNC_BUNDLE_SCHEMA || !Array.isArray(parsed?.revisions)) {
    throw new Error('La URL remota no retorna un bundle shadow compatible.');
  }
  return parsed;
}

async function fetchRemoteShadowBundleFromProviderHead(url, providerProfile = remoteProviderProfile, providerSecret = remoteProviderSecret) {
  const authHeaders = buildRemoteProviderAuthHeaders(providerProfile, providerSecret);
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
      ...authHeaders
    }
  });
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw createRemoteShadowConnectionError(`Les credencials remotes no tenen accés al head (${response.status}).`, 'auth-error');
    }
    if (response.status === 404) {
      throw createRemoteShadowConnectionError('La URL o vista remota no existeix (404).', 'not-found');
    }
    throw createRemoteShadowConnectionError(`No s'ha pogut llegir el head remot (${response.status}).`, 'error');
  }
  const parsedHead = normalizeRemoteProviderHead(await response.json(), url, providerProfile);
  const cachedHead = getShadowHistoryHead(remoteShadowSource?.revisions || [], remoteShadowSource?.state?.lastRevisionId || '');
  if (cachedHead && parsedHead.headRevisionId && cachedHead.revisionId === parsedHead.headRevisionId) {
    return {
      descriptor: parsedHead,
      bundle: remoteShadowSource
    };
  }
  const bundle = await fetchRemoteShadowBundleFromUrl(parsedHead.bundleUrl, authHeaders);
  return {
    descriptor: parsedHead,
    bundle
  };
}

async function connectRemoteShadowUrl(options = {}) {
  const { silent = false } = options;
  const mode = getSelectedRemoteShadowMode();
  const draftProviderProfile = mode === 'provider-head-url' ? getDraftRemoteProviderProfile() : null;
  const draftProviderSecret = mode === 'provider-head-url' ? getDraftRemoteProviderSecret() : '';
  const rawUrl = String(remoteShadowDraftUrl || remoteShadowUrlInput?.value || '').trim();
  let effectiveUrl = rawUrl;
  if (mode === 'provider-head-url' && !rawUrl && draftProviderProfile?.preset === 'supabase' && canBuildSupabaseHeadUrl(draftProviderProfile)) {
    effectiveUrl = buildSupabaseHeadUrl(draftProviderProfile);
  } else if (mode === 'provider-head-url' && !rawUrl && draftProviderProfile?.preset === 'supabase-function' && canBuildSupabaseFunctionHeadUrl(draftProviderProfile)) {
    effectiveUrl = buildSupabaseFunctionHeadUrl(draftProviderProfile);
  }
  if (!effectiveUrl) {
    showToast(mode === 'provider-head-url' ? 'Introdueix una URL de head remot.' : 'Introdueix una URL de bundle remot.', 'error');
    return false;
  }

  if (!/^https?:\/\//i.test(effectiveUrl) && !effectiveUrl.startsWith('/')) {
    showToast('La URL remota ha de començar per https://, http:// o /.', 'error');
    return false;
  }

  if (mode === 'provider-head-url') {
    const validationError = getRemoteProviderValidationError(draftProviderProfile, draftProviderSecret);
    if (validationError) {
      if (!silent) showToast(validationError, 'error');
      return false;
    }
  }

  writeRemoteShadowConfigSnapshot(buildRemoteShadowConfigSnapshot({
    mode,
    url: effectiveUrl,
    lastStatus: 'checking',
    lastFetchedAt: remoteShadowConfig?.lastFetchedAt || '',
    lastError: ''
  }));
  try {
    let parsed;
    let sourceName = effectiveUrl;
    let remoteDescriptor = null;
    if (mode === 'provider-head-url') {
      const providerProfile = writeRemoteProviderProfileSnapshot(draftProviderProfile);
      const providerSecret = persistRemoteProviderSecret(draftProviderSecret, providerProfile.rememberSecret);
      const providerResult = await fetchRemoteShadowBundleFromProviderHead(effectiveUrl, providerProfile, providerSecret);
      parsed = providerResult.bundle;
      remoteDescriptor = providerResult.descriptor;
      sourceName = providerResult.descriptor.bundleUrl;
      writeRemoteProviderProfileSnapshot({
        ...providerProfile,
        lastValidatedAt: new Date().toISOString()
      });
    } else {
      parsed = await fetchRemoteShadowBundleFromUrl(rawUrl);
    }
    const normalized = writeRemoteShadowSourceSnapshot({
      ...parsed,
      sourceName,
      importedAt: new Date().toISOString(),
      remoteHead: remoteDescriptor,
      remoteHistoryCount: remoteDescriptor?.historyCount || 0,
      recentRevisions: remoteDescriptor?.recentRevisions || []
    });
    writeRemoteShadowConfigSnapshot(buildRemoteShadowConfigSnapshot({
      mode,
      url: effectiveUrl,
      lastStatus: 'connected',
      lastFetchedAt: new Date().toISOString(),
      lastError: ''
    }));
    const comparison = computeRemoteShadowComparison();
    if (!silent) {
      showToast(`URL remota connectada: ${normalized?.sourceName || effectiveUrl}`);
      if (comparison.status === 'remote-ahead') {
        showToast(comparison.detailText || 'El remot va per davant. Si tens el pull automàtic activat i el local està net, Sutsumu el podrà aplicar sol.', 'info');
      } else if (comparison.status === 'local-ahead') {
        showToast(comparison.detailText || 'El local va per davant. Si tens el push automàtic activat i el local està estable, Sutsumu el podrà enviar sol.', 'info');
      }
    }
    queueRemoteShadowAutomation(silent ? 'connect-silent' : 'connect', { immediate: true });
    return true;
  } catch (err) {
    console.warn("No s'ha pogut connectar la URL remota de shadow sync.", err);
    if (err?.remoteStatus === 'empty') {
      writeRemoteShadowSourceSnapshot(null);
    }
    writeRemoteShadowConfigSnapshot(buildRemoteShadowConfigSnapshot({
      mode,
      url: effectiveUrl,
      lastStatus: err?.remoteStatus || 'error',
      lastFetchedAt: remoteShadowConfig?.lastFetchedAt || '',
      lastError: err?.message || 'remote-fetch-error'
    }));
    if (!silent) showToast(err?.message || "No s'ha pogut connectar la URL remota.", 'error');
    return false;
  }
}

function getShadowHistoryHead(history = shadowSyncHistory, preferredRevisionId = '') {
  const normalizedHistory = normalizeShadowSyncHistory(history);
  if (!normalizedHistory.length) return null;
  if (preferredRevisionId) {
    const preferred = normalizedHistory.find(entry => entry.revisionId === preferredRevisionId);
    if (preferred) return preferred;
  }
  return normalizedHistory[0];
}

function describeRemoteRevisionLog(source = remoteShadowSource) {
  if (!source) return '';
  const historyCount = Number(source.remoteHistoryCount || source.revisions?.length || 0);
  if (!historyCount) return '';
  const latest = Array.isArray(source.recentRevisions) && source.recentRevisions.length ? source.recentRevisions[0] : null;
  let summary = `Historial remot: ${historyCount} revisions.`;
  if (latest?.createdAt) {
    const statusLabel = getRemoteRevisionStatusLabel(latest.commitStatus, { lowercase: true });
    summary += ` Última ${statusLabel} a ${formatShadowSyncMoment(latest.createdAt)}.`;
  }
  return summary;
}

function getRemoteRevisionStatusLabel(status = '', options = {}) {
  const { lowercase = false } = options;
  const labels = {
    committed: 'Confirmada',
    staged: 'Preparada',
    'head-conflict': 'Conflicte head',
    queued: 'Pendent',
    unknown: 'Desconeguda'
  };
  const base = labels[status] || (status ? String(status) : labels.unknown);
  return lowercase ? base.toLowerCase() : base;
}

function describeRemoteRevisionSnapshotCounts(counts = null) {
  if (!counts || typeof counts !== 'object') return '';
  const folders = Number(counts.folders || 0);
  const documents = Number(counts.documents || 0);
  const deleted = Number(counts.deleted || 0);
  const total = Number(counts.total || 0);
  const parts = [];
  if (folders > 0) parts.push(`${folders} ${folders === 1 ? 'carpeta' : 'carpetes'}`);
  if (documents > 0) parts.push(`${documents} ${documents === 1 ? 'document' : 'documents'}`);
  if (deleted > 0) parts.push(`${deleted} ${deleted === 1 ? 'element eliminat' : 'elements eliminats'}`);
  if (!parts.length && total > 0) {
    parts.push(`${total} ${total === 1 ? 'element' : 'elements'}`);
  }
  return parts.join(' · ');
}

function normalizeRemoteHistoryFilter(value) {
  return ['all', 'pending', 'downloaded', 'applied', 'restored'].includes(value)
    ? value
    : 'all';
}

function getRemoteHistoryFilterLabel(filter = activeRemoteHistoryFilter) {
  const normalized = normalizeRemoteHistoryFilter(filter);
  const labels = {
    all: 'totes les revisions recents',
    pending: 'les revisions pendents de revisar',
    downloaded: 'les revisions descarregades',
    applied: 'les revisions aplicades localment',
    restored: 'les revisions recuperades localment'
  };
  return labels[normalized] || labels.all;
}

function matchesRemoteHistoryFilter(entry, filter = activeRemoteHistoryFilter) {
  const normalized = normalizeRemoteHistoryFilter(filter);
  if (normalized === 'pending') {
    return !entry?.downloadRecord && !entry?.applicationRecord;
  }
  if (normalized === 'downloaded') {
    return Boolean(entry?.downloadRecord);
  }
  if (normalized === 'applied') {
    return entry?.applicationRecord?.actionType === 'apply';
  }
  if (normalized === 'restored') {
    return entry?.applicationRecord?.actionType === 'restore';
  }
  return true;
}

function buildRemoteRevisionRelationBadges(revision, context = {}) {
  const badges = [{
    label: getRemoteRevisionStatusLabel(revision.commitStatus),
    className: revision.commitStatus === 'head-conflict' ? 'is-conflict' : ''
  }];
  if (context.downloadRecord) {
    badges.push({ label: 'Descarregada', className: 'is-downloaded' });
  }
  if (context.applicationRecord) {
    badges.push({ label: getRemoteRevisionApplicationBadgeLabel(context.applicationRecord), className: 'is-applied' });
  }
  if (revision.revisionId === context.remoteHeadId) {
    badges.push({ label: 'Head remot', className: 'is-head' });
  }
  if (revision.revisionId === context.localHeadId) {
    badges.push({ label: 'Head local', className: 'is-local' });
  }
  if (revision.revisionId && revision.revisionId === context.commonAncestorId) {
    badges.push({ label: 'Base compartida', className: 'is-base' });
  }
  return badges;
}

function buildRemoteRevisionInspectorState(source = remoteShadowSource, comparison = computeRemoteShadowComparison()) {
  if (!source) return null;
  const entries = Array.isArray(source.recentRevisions) ? source.recentRevisions.filter(Boolean) : [];
  if (!entries.length) return null;
  const remoteHeadId = comparison?.remoteHead?.revisionId || source.state?.lastRevisionId || '';
  const localHeadId = comparison?.localHead?.revisionId || shadowSyncState?.lastRevisionId || '';
  const commonAncestorId = comparison?.commonAncestor?.revisionId || '';
  const enrichedEntries = entries.map(entry => {
    const downloadRecord = getRemoteRevisionDownloadRecord(entry.revisionId);
    const applicationRecord = getRemoteRevisionApplicationRecord(entry.revisionId);
    return {
      ...entry,
      downloadRecord,
      applicationRecord,
      shortId: createShadowSyncShortId(entry.revisionId),
      countsText: describeRemoteRevisionSnapshotCounts(entry.snapshotCounts),
      badges: buildRemoteRevisionRelationBadges(entry, {
        remoteHeadId,
        localHeadId,
        commonAncestorId,
        downloadRecord,
        applicationRecord
      })
    };
  });
  const activeFilter = normalizeRemoteHistoryFilter(activeRemoteHistoryFilter);
  const filterCounts = {
    all: enrichedEntries.length,
    pending: enrichedEntries.filter(entry => matchesRemoteHistoryFilter(entry, 'pending')).length,
    downloaded: enrichedEntries.filter(entry => matchesRemoteHistoryFilter(entry, 'downloaded')).length,
    applied: enrichedEntries.filter(entry => matchesRemoteHistoryFilter(entry, 'applied')).length,
    restored: enrichedEntries.filter(entry => matchesRemoteHistoryFilter(entry, 'restored')).length
  };
  const filteredEntries = enrichedEntries.filter(entry => matchesRemoteHistoryFilter(entry, activeFilter));
  const selectedId = filteredEntries.some(entry => entry.revisionId === selectedRemoteHistoryRevisionId)
    ? selectedRemoteHistoryRevisionId
    : (filteredEntries.find(entry => entry.revisionId === remoteHeadId)?.revisionId || filteredEntries[0]?.revisionId || '');
  if (selectedId && selectedRemoteHistoryRevisionId !== selectedId) {
    selectedRemoteHistoryRevisionId = selectedId;
  }
  const selected = filteredEntries.find(entry => entry.revisionId === selectedId) || filteredEntries[0] || null;
  return {
    totalCount: Number(source.remoteHistoryCount || entries.length || 0),
    visibleCount: filteredEntries.length,
    allCount: enrichedEntries.length,
    activeFilter,
    filterCounts,
    entries: filteredEntries,
    selected,
    remoteHeadId,
    localHeadId,
    commonAncestorId
  };
}

function getRemoteHistoryRevisionEntry(source = remoteShadowSource, revisionId = selectedRemoteHistoryRevisionId) {
  if (!source || !revisionId) return null;
  return normalizeShadowSyncHistory(source.revisions).find(entry => entry.revisionId === revisionId) || null;
}

function collectRemoteHistoryRevisionLineage(source = remoteShadowSource, revisionId = selectedRemoteHistoryRevisionId) {
  if (!source || !revisionId) return [];
  const byId = new Map(normalizeShadowSyncHistory(source.revisions).map(entry => [entry.revisionId, entry]));
  const lineage = [];
  const visited = new Set();
  let cursor = revisionId;
  while (cursor && byId.has(cursor) && !visited.has(cursor)) {
    const entry = byId.get(cursor);
    lineage.push(entry);
    visited.add(cursor);
    cursor = entry?.baseRevisionId || '';
  }
  return lineage;
}

function createRemoteHistoryRevisionBundle(selectedRevisionId = selectedRemoteHistoryRevisionId, source = remoteShadowSource) {
  const revisionId = typeof selectedRevisionId === 'string' ? selectedRevisionId.trim() : '';
  if (!revisionId) return null;
  const lineage = collectRemoteHistoryRevisionLineage(source, revisionId);
  if (!lineage.length) return null;
  return createStandaloneShadowSyncBundle(lineage, {
    lastRevisionId: revisionId,
    lastReason: 'remote-history-export',
    lastRemoteStatus: 'remote-history-exported'
  });
}

function getRemoteHistoryRevisionRecoveryReadiness(selectedRevisionId = selectedRemoteHistoryRevisionId, source = remoteShadowSource) {
  if (!source) {
    return {
      canRestore: false,
      status: 'no-remote',
      message: 'Encara no hi ha cap remot carregat per recuperar revisions.',
      revision: null,
      remoteHead: null,
      payload: null,
      syncDocs: [],
      attachmentSummary: summarizeRemoteAttachmentTransport([]),
      pullPreview: null,
      currentRemoteHeadId: '',
      isCurrentHead: false
    };
  }

  const revisionId = typeof selectedRevisionId === 'string' ? selectedRevisionId.trim() : '';
  if (!revisionId) {
    return {
      canRestore: false,
      status: 'not-selected',
      message: 'Selecciona una revisió remota per poder-la recuperar.',
      revision: null,
      remoteHead: null,
      payload: null,
      syncDocs: [],
      attachmentSummary: summarizeRemoteAttachmentTransport([]),
      pullPreview: null,
      currentRemoteHeadId: source.state?.lastRevisionId || '',
      isCurrentHead: false
    };
  }

  const revision = getRemoteHistoryRevisionEntry(source, revisionId);
  const currentRemoteHeadId = source.state?.lastRevisionId || '';
  const isCurrentHead = revisionId === currentRemoteHeadId;
  if (!revision) {
    return {
      canRestore: false,
      status: 'not-loaded',
      message: 'Aquesta revisió encara no està disponible dins del bundle remot descarregat. De moment només se’n pot inspeccionar el resum.',
      revision: null,
      remoteHead: null,
      payload: null,
      syncDocs: [],
      attachmentSummary: summarizeRemoteAttachmentTransport([]),
      pullPreview: null,
      currentRemoteHeadId,
      isCurrentHead
    };
  }

  const payload = revision.payload && typeof revision.payload === 'object' ? revision.payload : null;
  const syncDocs = Array.isArray(payload?.snapshot?.docs) ? payload.snapshot.docs : [];
  const attachmentSummary = summarizeRemoteAttachmentTransport(syncDocs);
  if (!payload || payload.schema !== SYNC_PAYLOAD_SCHEMA || !Array.isArray(payload.snapshot?.docs)) {
    return {
      canRestore: false,
      status: 'invalid-remote',
      message: 'Aquesta revisió remota no porta un payload sincronitzable compatible.',
      revision,
      remoteHead: revision,
      payload: null,
      syncDocs: [],
      attachmentSummary,
      pullPreview: null,
      currentRemoteHeadId,
      isCurrentHead
    };
  }

  const pullPreview = createRemotePullPreview(syncDocs);
  if (!pullPreview?.totalChanged) {
    return {
      canRestore: false,
      status: 'already-local',
      message: isCurrentHead
        ? 'El head remot actual ja coincideix amb l’estat local visible.'
        : 'Aquesta revisió no introduiria cap canvi visible respecte al local actual.',
      revision,
      remoteHead: revision,
      payload,
      syncDocs,
      attachmentSummary,
      pullPreview,
      currentRemoteHeadId,
      isCurrentHead
    };
  }

  return {
    canRestore: true,
    status: isCurrentHead ? 'current-head' : 'history-revision',
    message: isCurrentHead
      ? `Es pot aplicar el head remot seleccionat amb còpia crítica prèvia.${pullPreview?.summaryText ? ` Recovery previst: ${pullPreview.summaryText}` : ''}`
      : `Es pot recuperar aquesta revisió remota anterior amb còpia crítica i una còpia portable del local actual.${pullPreview?.summaryText ? ` Recovery previst: ${pullPreview.summaryText}` : ''}`,
    revision,
    remoteHead: revision,
    payload,
    syncDocs,
    attachmentSummary,
    pullPreview,
    currentRemoteHeadId,
    isCurrentHead
  };
}

function buildRemoteRevisionHistoryLeadText(state) {
  if (!state || !state.allCount) return 'Encara no hi ha historial remot per inspeccionar.';
  if (!state.entries.length) {
    return `No hi ha cap coincidència dins de ${getRemoteHistoryFilterLabel(state.activeFilter)}. Pots canviar el filtre per veure la resta de revisions recents.`;
  }
  const shown = state.visibleCount || state.entries.length;
  const total = state.totalCount || state.allCount || shown;
  const countLabel = `${shown} ${shown === 1 ? 'revisió' : 'revisions'}`;
  const filterLead = state.activeFilter === 'all'
    ? ''
    : ` Filtre actiu: ${getRemoteHistoryFilterLabel(state.activeFilter)}.`;
  if (total > shown) {
    return `Mostrant ${countLabel} recents de ${total}.${filterLead} Selecciona'n una per inspeccionar-la; encara no s'apliquen revisions antigues directament.`;
  }
  return `Historial remot carregat: ${countLabel} disponibles per inspeccionar abans del següent pull o recovery.${filterLead}`;
}

function buildRemoteRevisionBadgesHtml(badges = []) {
  if (!Array.isArray(badges) || !badges.length) return '';
  return `
    <div class="sync-remote-history-badges">
      ${badges.map(badge => `<span class="sync-remote-history-badge${badge.className ? ` ${badge.className}` : ''}">${escapeHtml(badge.label)}</span>`).join('')}
    </div>
  `.trim();
}

function renderRemoteRevisionHistoryEntryHtml(entry, selectedRevisionId = '') {
  const detailParts = [
    entry.countsText,
    entry.authorDeviceId ? `Dispositiu ${createShadowSyncShortId(entry.authorDeviceId)}` : ''
  ].filter(Boolean);
  return `
    <button
      type="button"
      class="sync-remote-history-entry${entry.revisionId === selectedRevisionId ? ' is-selected' : ''}"
      data-remote-history-id="${escapeHtml(entry.revisionId)}"
    >
      <div class="sync-remote-history-entry-main">
        <strong>${escapeHtml(entry.shortId)}</strong>
        <span class="sync-remote-history-entry-date">${escapeHtml(formatShadowSyncMoment(entry.createdAt || ''))}</span>
      </div>
      <div class="sync-remote-history-entry-meta">${escapeHtml(detailParts.join(' · ') || 'Sense metadades extra')}</div>
      ${buildRemoteRevisionBadgesHtml(entry.badges)}
    </button>
  `.trim();
}

function renderRemoteRevisionDetailHtml(state) {
  if (!state?.selected) {
    return state?.allCount
      ? '<p class="sync-prep-text">Aquest filtre no deixa cap revisió visible ara mateix. Prova un altre filtre per veure\'n el context.</p>'
      : '<p class="sync-prep-text">Selecciona una revisió remota per veure\'n el context.</p>';
  }
  const selected = state.selected;
  const recoveryReadiness = getRemoteHistoryRevisionRecoveryReadiness(selected.revisionId);
  const exportBundle = createRemoteHistoryRevisionBundle(selected.revisionId);
  const relationParts = [];
  if (selected.revisionId === state.remoteHeadId) relationParts.push('Aquesta és la revisió que defineix el head remot actual.');
  if (selected.revisionId === state.localHeadId) relationParts.push('Coincideix amb el head local d’aquest dispositiu.');
  if (selected.revisionId === state.commonAncestorId) relationParts.push('És la base compartida visible entre el local i el remot.');
  if (selected.downloadRecord) relationParts.push('Ja la vas descarregar abans en aquest dispositiu.');
  if (selected.applicationRecord) relationParts.push(selected.applicationRecord.actionType === 'restore' ? 'També la vas recuperar localment en aquest dispositiu.' : 'També la vas aplicar localment en aquest dispositiu.');
  if (!relationParts.length) relationParts.push('És una revisió recent del registre remot, útil per entendre l’evolució del workspace.');
  const baseRevisionLabel = selected.baseRevisionId ? createShadowSyncShortId(selected.baseRevisionId) : 'arrel';
  const downloadLeadText = selected.downloadRecord
    ? `Descarregada localment ${formatShadowSyncMoment(selected.downloadRecord.downloadedAt || '')}${selected.downloadRecord.fileName ? ` com ${selected.downloadRecord.fileName}` : ''}.`
    : 'Encara no has descarregat aquesta revisió com a bundle portable.';
  const applicationLeadText = getRemoteRevisionApplicationLeadText(selected.applicationRecord);
  const recoveryLeadText = recoveryReadiness.canRestore
    ? (recoveryReadiness.isCurrentHead
      ? `Si apliques aquesta revisió, ${recoveryReadiness.pullPreview?.summaryText || 'Sutsumu substituirà l’estat local visible amb el head remot actual.'}`
      : `És una revisió anterior al head remot actual. Si la recuperes ara, ${recoveryReadiness.pullPreview?.summaryText || 'Sutsumu substituirà l’estat local visible per aquesta versió anterior.'}`)
    : recoveryReadiness.message;
  const downloadButtonLabel = selected.downloadRecord ? 'Tornar a descarregar revisió' : 'Descarregar revisió';
  const recoveryButtonLabel = recoveryReadiness.isCurrentHead ? 'Aplicar aquesta revisió' : 'Recuperar aquesta revisió';
  return `
    <div class="sync-prep-list-label">Revisió seleccionada</div>
    <p class="sync-prep-text">${escapeHtml(relationParts.join(' '))}</p>
    ${buildRemoteRevisionBadgesHtml(selected.badges)}
    <div class="sync-remote-history-detail-grid">
      <div class="sync-remote-history-detail-item">
        <span>Revisió</span>
        <strong>${escapeHtml(selected.shortId)}</strong>
      </div>
      <div class="sync-remote-history-detail-item">
        <span>Creada</span>
        <strong>${escapeHtml(formatShadowSyncMoment(selected.createdAt || ''))}</strong>
      </div>
      <div class="sync-remote-history-detail-item">
        <span>Base anterior</span>
        <strong>${escapeHtml(baseRevisionLabel)}</strong>
      </div>
      <div class="sync-remote-history-detail-item">
        <span>Payload</span>
        <strong>${escapeHtml(createShadowSyncShortId(selected.payloadSignature || ''))}</strong>
      </div>
    </div>
    <p class="sync-prep-text">${escapeHtml(selected.countsText || 'Sense resum de snapshot disponible per a aquesta revisió.')}</p>
    ${selected.authorDeviceId ? `<p class="sync-prep-text">${escapeHtml(`Dispositiu autor: ${createShadowSyncShortId(selected.authorDeviceId)}`)}</p>` : ''}
    <p class="sync-prep-text">${escapeHtml(downloadLeadText)}</p>
    ${applicationLeadText ? `<p class="sync-prep-text">${escapeHtml(applicationLeadText)}</p>` : ''}
    <div class="sync-remote-history-recovery">
      <div class="sync-prep-list-label">Recovery segur</div>
      <p class="sync-prep-text">${escapeHtml(recoveryLeadText || 'Aquesta revisió encara no es pot recuperar directament.')}</p>
      ${recoveryReadiness.pullPreview ? buildRemotePullPreviewGroupsHtml(recoveryReadiness.pullPreview, { entryLimit: 2 }) : ''}
      <div class="sync-prep-actions sync-remote-history-actions">
        <button
          id="downloadRemoteHistoryRevisionBtn"
          type="button"
          class="btn btn-secondary btn-small"
          data-remote-history-download-id="${escapeHtml(selected.revisionId)}"
          ${exportBundle ? '' : 'disabled'}
          title="${escapeHtml(exportBundle ? (selected.downloadRecord ? 'Torna a descarregar aquesta revisió com a bundle portable.' : 'Descarrega aquesta revisió com a bundle portable.') : 'Aquesta revisió encara no es pot descarregar.')}"
        >${escapeHtml(downloadButtonLabel)}</button>
        <button
          id="restoreRemoteHistoryRevisionBtn"
          type="button"
          class="btn btn-primary btn-small"
          data-remote-history-restore-id="${escapeHtml(selected.revisionId)}"
          ${recoveryReadiness.canRestore ? '' : 'disabled'}
          title="${escapeHtml(recoveryReadiness.canRestore ? '' : (recoveryReadiness.message || 'Aquesta revisió encara no es pot recuperar.'))}"
        >${escapeHtml(recoveryButtonLabel)}</button>
      </div>
    </div>
  `.trim();
}

function buildShadowRevisionAncestry(history, headRevisionId) {
  const byId = new Map(normalizeShadowSyncHistory(history).map(entry => [entry.revisionId, entry]));
  const visited = new Set();
  let cursor = headRevisionId;
  while (cursor && byId.has(cursor) && !visited.has(cursor)) {
    visited.add(cursor);
    cursor = byId.get(cursor)?.baseRevisionId || '';
  }
  return visited;
}

function buildShadowRevisionLineage(history, headRevisionId) {
  const byId = new Map(normalizeShadowSyncHistory(history).map(entry => [entry.revisionId, entry]));
  const lineage = [];
  const visited = new Set();
  let cursor = headRevisionId;
  while (cursor && byId.has(cursor) && !visited.has(cursor)) {
    const entry = byId.get(cursor);
    lineage.push(entry);
    visited.add(cursor);
    cursor = entry?.baseRevisionId || '';
  }
  return lineage;
}

function countShadowRevisionLabel(value) {
  const count = Number(value || 0);
  return `${count} ${count === 1 ? 'revisió' : 'revisions'}`;
}

function describeShadowCommonAncestor(entry) {
  if (entry?.isRoot) return 'arrel';
  return entry?.revisionId ? createShadowSyncShortId(entry.revisionId) : 'sense base visible';
}

function buildShadowComparisonContext(localHistory, localHeadRevisionId, remoteHistory, remoteHeadRevisionId) {
  const localLineage = buildShadowRevisionLineage(localHistory, localHeadRevisionId);
  const remoteLineage = buildShadowRevisionLineage(remoteHistory, remoteHeadRevisionId);
  const remoteIndexes = new Map(remoteLineage.map((entry, index) => [entry.revisionId, index]));

  for (let localAheadCount = 0; localAheadCount < localLineage.length; localAheadCount += 1) {
    const entry = localLineage[localAheadCount];
    const remoteAheadCount = remoteIndexes.get(entry?.revisionId);
    if (entry?.revisionId && Number.isInteger(remoteAheadCount)) {
      return {
        localLineage,
        remoteLineage,
        commonAncestor: entry,
        localAheadCount,
        remoteAheadCount
      };
    }
  }

  return {
    localLineage,
    remoteLineage,
    commonAncestor: localLineage.length && remoteLineage.length
      && !localLineage[localLineage.length - 1]?.baseRevisionId
      && !remoteLineage[remoteLineage.length - 1]?.baseRevisionId
      ? { revisionId: '', isRoot: true }
      : null,
    localAheadCount: localLineage.length,
    remoteAheadCount: remoteLineage.length
  };
}

function computeRemoteShadowComparison() {
  const remoteHead = getShadowHistoryHead(remoteShadowSource?.revisions || [], remoteShadowSource?.state?.lastRevisionId || '');
  const localHead = getShadowHistoryHead(shadowSyncHistory, shadowSyncState?.lastRevisionId || '');
  const localWorkspaceId = syncPrepState?.workspace?.id || '';
  const remoteWorkspaceId = remoteHead?.workspaceId || remoteHead?.payload?.workspace?.id || '';
  const remoteHistoryCount = Number(remoteShadowSource?.remoteHistoryCount || remoteShadowSource?.revisions?.length || 0);

  if (!remoteHead) {
    return {
      status: 'no-remote',
      label: 'Sense remot',
      description: 'Encara no hi ha cap bundle remot importat per comparar.',
      compareValue: 'Sense remot',
      localHead,
      remoteHead
    };
  }

  if (!localHead) {
    return {
      status: 'remote-only',
      label: 'Remot disponible',
      description: 'Hi ha una revisió remota disponible, però aquest dispositiu encara no té cap head local comparable.',
      detailText: remoteHistoryCount > 0
        ? `El remot carregat resumeix ${countShadowRevisionLabel(remoteHistoryCount)}.`
        : '',
      compareValue: remoteHistoryCount > 0 ? `Remot disponible · ${remoteHistoryCount} rev.` : 'Remot disponible',
      localHead,
      remoteHead
    };
  }

  if (localWorkspaceId && remoteWorkspaceId && localWorkspaceId !== remoteWorkspaceId) {
    return {
      status: 'other-workspace',
      label: 'Un altre workspace',
      description: 'El bundle remot pertany a un workspace diferent. No es compararà ni s\'aplicarà automàticament.',
      compareValue: 'Workspace diferent',
      localHead,
      remoteHead
    };
  }

  if (localHead.payloadSignature && remoteHead.payloadSignature && localHead.payloadSignature === remoteHead.payloadSignature) {
    return {
      status: 'in-sync',
      label: 'Al dia',
      description: 'El head local i el remot comparteixen exactament el mateix payload base.',
      detailText: localHead.revisionId
        ? `El head compartit és ${createShadowSyncShortId(localHead.revisionId)}.`
        : '',
      compareValue: localHead.revisionId ? `Al dia · ${createShadowSyncShortId(localHead.revisionId)}` : 'Al dia',
      localHead,
      remoteHead
    };
  }

  const localAncestry = buildShadowRevisionAncestry(shadowSyncHistory, localHead.revisionId);
  const remoteAncestry = buildShadowRevisionAncestry(remoteShadowSource?.revisions || [], remoteHead.revisionId);
  const comparisonContext = buildShadowComparisonContext(
    shadowSyncHistory,
    localHead.revisionId,
    remoteShadowSource?.revisions || [],
    remoteHead.revisionId
  );

  if (remoteAncestry.has(localHead.revisionId)) {
    const remoteAheadLabel = countShadowRevisionLabel(comparisonContext.remoteAheadCount || 1);
    return {
      status: 'remote-ahead',
      label: 'Remot més nou',
      description: `El bundle remot conté ${remoteAheadLabel} més avançades que el head local d'aquest dispositiu.`,
      detailText: `El remot afegeix ${remoteAheadLabel} sobre el teu head local.`,
      compareValue: `Remot més nou · +${comparisonContext.remoteAheadCount || 1}`,
      commonAncestor: comparisonContext.commonAncestor,
      localAheadCount: 0,
      remoteAheadCount: comparisonContext.remoteAheadCount || 1,
      localHead,
      remoteHead
    };
  }

  if (localAncestry.has(remoteHead.revisionId)) {
    const localAheadLabel = countShadowRevisionLabel(comparisonContext.localAheadCount || 1);
    return {
      status: 'local-ahead',
      label: 'Local més nou',
      description: `Aquest dispositiu ja té ${localAheadLabel} més noves que la revisió remota importada.`,
      detailText: `El local afegeix ${localAheadLabel} sobre el head remot.`,
      compareValue: `Local més nou · +${comparisonContext.localAheadCount || 1}`,
      commonAncestor: comparisonContext.commonAncestor,
      localAheadCount: comparisonContext.localAheadCount || 1,
      remoteAheadCount: 0,
      localHead,
      remoteHead
    };
  }

  const commonAncestorLabel = describeShadowCommonAncestor(comparisonContext.commonAncestor);
  const divergenceDetail = comparisonContext.commonAncestor
    ? `Base compartida ${commonAncestorLabel}. Local +${comparisonContext.localAheadCount}; remot +${comparisonContext.remoteAheadCount}.`
    : `No hi ha una base compartida visible dins de l'historial carregat. Local +${comparisonContext.localAheadCount}; remot +${comparisonContext.remoteAheadCount}.`;
  return {
    status: 'diverged',
    label: 'Divergència',
    description: `El head local i el remot han evolucionat per branques diferents. ${divergenceDetail}`,
    detailText: divergenceDetail,
    compareValue: comparisonContext.commonAncestor
      ? `Divergència · base ${commonAncestorLabel} · L+${comparisonContext.localAheadCount} / R+${comparisonContext.remoteAheadCount}`
      : `Divergència · L+${comparisonContext.localAheadCount} / R+${comparisonContext.remoteAheadCount}`,
    commonAncestor: comparisonContext.commonAncestor,
    localAheadCount: comparisonContext.localAheadCount,
    remoteAheadCount: comparisonContext.remoteAheadCount,
    localHead,
    remoteHead
  };
}

function getLocalSyncStabilityState() {
  const hasDraftEdits = shouldGuardEditClose();
  const currentPayload = docs.length ? createSyncPayloadPreview(docs) : null;
  const currentSignature = currentPayload ? createSyncPayloadSignature(currentPayload) : '';
  const matchesShadowHead = !docs.length
    ? true
    : Boolean(currentSignature && currentSignature === shadowSyncState?.lastPayloadSignature);
  if (hasDraftEdits) {
    return {
      status: 'editing',
      shortLabel: 'Editant',
      humanText: 'Hi ha un document obert amb canvis encara no consolidats.',
      isClean: false,
      canAutoPull: false,
      canAutoPush: false,
      currentSignature,
      matchesShadowHead
    };
  }
  if (workspaceDirty) {
    return {
      status: 'workspace-dirty',
      shortLabel: 'Workspace pendent',
      humanText: 'El workspace encara té canvis pendents de desar o exportar.',
      isClean: false,
      canAutoPull: false,
      canAutoPush: matchesShadowHead,
      currentSignature,
      matchesShadowHead
    };
  }
  if (!matchesShadowHead) {
    return {
      status: 'shadow-pending',
      shortLabel: 'Preparant',
      humanText: 'El local encara està preparant o consolidant la revisió shadow més recent.',
      isClean: false,
      canAutoPull: false,
      canAutoPush: false,
      currentSignature,
      matchesShadowHead
    };
  }
  return {
    status: 'clean',
    shortLabel: docs.length ? 'Net' : 'Buit',
    humanText: docs.length
      ? 'El local està net i ja coincideix amb la seva darrera revisió shadow.'
      : 'Aquest dispositiu no té canvis locals visibles pendents.',
    isClean: true,
    canAutoPull: true,
    canAutoPush: true,
    currentSignature,
    matchesShadowHead
  };
}

function getRemoteAutoPushAttachmentPolicy(currentDocs = docs) {
  const attachmentDocs = getAttachmentDocuments(currentDocs);
  const summary = attachmentDocs.reduce((acc, item) => {
    acc.total += 1;
    const size = Number(item.fileSize || (isRealBlob(item.fileBlob) ? item.fileBlob.size : 0) || 0);
    acc.totalBytes += size;
    if (!isRealBlob(item.fileBlob)) {
      acc.missingLocal += 1;
    }
    if (size > AUTO_REMOTE_PUSH_INLINE_ATTACHMENT_MAX_BYTES) {
      acc.heavy += 1;
    }
    return acc;
  }, {
    total: 0,
    totalBytes: 0,
    missingLocal: 0,
    heavy: 0
  });
  if (summary.total === 0) {
    return {
      ...summary,
      canAutoPush: true,
      message: 'No hi ha adjunts locals que bloquegin el push automàtic.'
    };
  }
  if (summary.missingLocal > 0) {
    return {
      ...summary,
      canAutoPush: false,
      message: `El push automàtic queda en pausa perquè hi ha ${summary.missingLocal} adjunts sense binari local recuperable en aquest dispositiu.`
    };
  }
  if (summary.heavy > 0) {
    return {
      ...summary,
      canAutoPush: false,
      message: `El push automàtic queda en pausa perquè hi ha ${summary.heavy} adjunts massa grans per enviar en segon pla.`
    };
  }
  if (summary.totalBytes > AUTO_REMOTE_PUSH_TOTAL_INLINE_BYTES) {
    return {
      ...summary,
      canAutoPush: false,
      message: `El push automàtic queda en pausa perquè els adjunts sumen ${formatBytes(summary.totalBytes)}, per sobre del límit prudent en aquesta fase.`
    };
  }
  return {
    ...summary,
    canAutoPush: true,
    message: `Els ${summary.total} adjunts actuals encara entren dins del marge segur per al push automàtic.`
  };
}

function buildRemoteConflictGuidance(comparison = computeRemoteShadowComparison(), localState = getLocalSyncStabilityState(), attachmentPolicy = getRemoteAutoPushAttachmentPolicy()) {
  if (!comparison) {
    return {
      text: 'Quan hi hagi un remot connectat, Sutsumu t’explicarà què passa abans de tocar res.',
      items: []
    };
  }
  const items = [];
  if (comparison.status === 'diverged') {
    items.push('Revisa les revisions remotes recents abans de decidir: pots inspeccionar-les, descarregar-les o recuperar-ne una.');
    items.push('Si vols prioritzar el remot sense perdre el local, fes servir "Resoldre divergència": guardarà una còpia local segura abans d’aplicar-lo.');
    if (!localState.isClean) {
      items.push(`Abans d’automatitzar res, convé deixar el local net. Ara mateix: ${localState.humanText}`);
    }
  } else if (comparison.status === 'other-workspace') {
    items.push('Aquest remot pertany a un altre workspace. No s’aplicarà ni s’enviarà automàticament aquí.');
    items.push('Si el vols conservar igualment, el pots inspeccionar o descarregar com a bundle portable abans de desconnectar-lo.');
  } else if (remoteShadowConfig?.lastStatus === 'conflict') {
    items.push('El head remot ha canviat entre la lectura i el darrer intent de push. Torna a comparar abans de reintentar.');
    items.push('No s’ha sobreescrit res en silenci: el backend ha tallat l’operació expressament.');
  } else if (attachmentPolicy.total > 0 && !attachmentPolicy.canAutoPush) {
    items.push(attachmentPolicy.message);
    items.push('El push manual continua disponible perquè puguis decidir quan empaquetar o revisar aquests adjunts.');
  }
  const text = comparison.status === 'diverged'
    ? 'Local i remot han evolucionat per camins diferents, però Sutsumu manté una sortida segura i no aplica res a cegues.'
    : (comparison.status === 'other-workspace'
      ? 'El remot s’ha detectat correctament, però no pertany a aquest workspace local.'
      : (remoteShadowConfig?.lastStatus === 'conflict'
        ? 'Hi ha hagut una carrera al remot, però no s’ha perdut cap dada: només cal tornar a comparar.'
        : (items.length
          ? 'Sutsumu manté visibles les sortides segures abans de qualsevol canvi remot delicat.'
          : 'Quan aparegui un conflicte real, aquí tindràs una explicació simple i les opcions segures.')));
  return { text, items };
}

function buildRemoteAutomationStatusText(comparison = computeRemoteShadowComparison(), localState = getLocalSyncStabilityState(), attachmentPolicy = getRemoteAutoPushAttachmentPolicy(), config = getEffectiveRemoteShadowAutomationConfig()) {
  if (!remoteShadowConfig?.url) {
    return 'Connecta una URL o backend remot per activar els automatismes segurs d’aquesta fase.';
  }
  const parts = [`Estat local: ${localState.shortLabel}. ${localState.humanText}`];
  if (remoteAutoSyncInFlight) {
    parts.push('Sutsumu està executant ara mateix una comprovació o acció automàtica segura.');
  }
  parts.push(config.autoCheckOnStart
    ? 'Sutsumu tornarà a comprovar aquest remot en obrir.'
    : 'La comprovació automàtica en obrir està desactivada.');
  if (config.autoPullWhenClean) {
    parts.push(localState.canAutoPull
      ? 'Si el remot va clarament per davant, es podrà aplicar automàticament amb xarxa de seguretat.'
      : 'El pull automàtic queda en pausa fins que el local torni a estar net.');
  } else {
    parts.push('El pull automàtic està desactivat.');
  }
  if (config.autoPushWhenStable) {
    if (!attachmentPolicy.canAutoPush) {
      parts.push(attachmentPolicy.message);
    } else {
      parts.push(localState.canAutoPush
        ? (localState.isClean
          ? 'Si el local queda per davant i el backend continua coherent, es podrà fer push automàtic.'
          : 'Tot i que el workspace extern encara no estigui desat, el head local ja és prou estable per permetre un push automàtic.')
        : 'El push automàtic queda en pausa fins que el local torni a estar estable.');
    }
  } else {
    parts.push('El push automàtic està desactivat.');
  }
  return parts.join(' ');
}

function buildRemoteAutoSyncKey(action, comparison = computeRemoteShadowComparison(), localState = getLocalSyncStabilityState(), attachmentPolicy = getRemoteAutoPushAttachmentPolicy(), config = getEffectiveRemoteShadowAutomationConfig()) {
  return stableShadowSyncStringify({
    action,
    remoteUrl: remoteShadowConfig?.url || '',
    remoteStatus: remoteShadowConfig?.lastStatus || '',
    comparison: comparison?.status || '',
    localState: localState?.status || '',
    localSignature: localState?.currentSignature || '',
    localHeadRevisionId: comparison?.localHead?.revisionId || shadowSyncState?.lastRevisionId || '',
    remoteHeadRevisionId: comparison?.remoteHead?.revisionId || remoteShadowSource?.state?.lastRevisionId || '',
    autoCheckOnStart: config.autoCheckOnStart,
    autoPullWhenClean: config.autoPullWhenClean,
    autoPushWhenStable: config.autoPushWhenStable,
    attachmentPolicy: {
      canAutoPush: attachmentPolicy.canAutoPush,
      total: attachmentPolicy.total,
      missingLocal: attachmentPolicy.missingLocal,
      heavy: attachmentPolicy.heavy,
      totalBytes: attachmentPolicy.totalBytes
    }
  });
}

function queueRemoteShadowAutomation(reason = 'update', options = {}) {
  const { immediate = false } = options;
  if (remoteAutoSyncTimer) clearTimeout(remoteAutoSyncTimer);
  if (!remoteShadowConfig?.url) {
    remoteAutoSyncTimer = null;
    lastRemoteAutoSyncKey = '';
    return;
  }
  remoteAutoSyncTimer = setTimeout(() => {
    remoteAutoSyncTimer = null;
    runRemoteShadowAutomation(reason);
  }, immediate ? 0 : REMOTE_AUTO_SYNC_DEBOUNCE_MS);
}

async function runRemoteShadowAutomation(reason = 'update') {
  if (remoteAutoSyncInFlight) return false;
  const config = getEffectiveRemoteShadowAutomationConfig();
  if (!remoteShadowConfig?.url || remoteShadowConfig?.lastStatus === 'checking') return false;

  // Si és un resum o inici, primer refresquem el head remot per saber si hi ha canvis
  if ((reason === 'resume' || reason === 'bootstrap') && config.autoCheckOnStart) {
    const connected = await connectRemoteShadowUrl({ silent: true });
    if (!connected) return false;
  }

  const comparison = computeRemoteShadowComparison();
  const localState = getLocalSyncStabilityState();
  const attachmentPolicy = getRemoteAutoPushAttachmentPolicy();
  const pullReadiness = getRemoteShadowPullReadiness(comparison);
  const pushReadiness = getRemoteShadowPushReadiness(comparison);
  let action = '';

  if (config.autoPullWhenClean && localState.canAutoPull && pullReadiness.canApply) {
    action = 'pull';
  } else if (config.autoPushWhenStable && localState.canAutoPush && attachmentPolicy.canAutoPush && pushReadiness.canPush) {
    action = 'push';
  } else {
    lastRemoteAutoSyncKey = '';
    updateRemoteShadowUI();
    return false;
  }

  const actionKey = buildRemoteAutoSyncKey(action, comparison, localState, attachmentPolicy, config);
  if (actionKey && actionKey === lastRemoteAutoSyncKey) {
    return false;
  }

  lastRemoteAutoSyncKey = actionKey;
  remoteAutoSyncInFlight = true;
  updateRemoteShadowUI();
  try {
    if (action === 'pull') {
      return await performRemoteShadowPull(pullReadiness, {
        confirmationTitle: 'Aplicar el remot automàticament?',
        okLabel: 'Aplicar remot',
        warningText: 'Sutsumu només activa aquest pull quan el local està net i crea igualment una còpia crítica abans de tocar res visible.',
        successPrefix: 'Remot aplicat automàticament perquè el local estava net.',
        safetyReason: `before-remote-auto-pull-${reason}`,
        operationLabel: 'aplicar el remot automàticament',
        saveReason: 'remote-auto-pull',
        remoteRevisionActionType: 'apply',
        skipConfirmation: true
      });
    }
    return await performRemoteShadowPush({
      confirmationTitle: 'Fer push automàtic al remot?',
      okLabel: 'Fer push',
      warningText: 'Sutsumu només activa aquest push quan el local està net, el remot està coherent i els adjunts entren dins del marge segur.',
      successPrefix: 'Push remot automàtic completat.',
      safetyReason: `before-remote-auto-push-${reason}`,
      operationLabel: 'fer el push automàtic al remot',
      createSafetySnapshot: false,
      skipConfirmation: true
    });
  } catch (err) {
    console.warn("No s'ha pogut completar l'automatització remota.", err);
    return false;
  } finally {
    remoteAutoSyncInFlight = false;
    updateRemoteShadowUI();
  }
}

function rememberRemotePullPreviewSample(list, item) {
  if (!Array.isArray(list) || !item || typeof item !== 'object') return;
  const fallbackTitle = item.type === 'folder' ? 'Carpeta sense nom' : 'Document sense nom';
  const title = typeof item.title === 'string' && item.title.trim() ? item.title.trim() : fallbackTitle;
  if (!list.includes(title) && list.length < 3) list.push(title);
}

function joinRemotePullPreviewParts(parts = []) {
  const filtered = parts.filter(Boolean);
  if (!filtered.length) return '';
  if (filtered.length === 1) return filtered[0];
  if (filtered.length === 2) return `${filtered[0]} i ${filtered[1]}`;
  return `${filtered.slice(0, -1).join(', ')} i ${filtered[filtered.length - 1]}`;
}

function countRemotePullPreviewLabel(count) {
  const total = Number(count || 0);
  return `${total} ${total === 1 ? 'element' : 'elements'}`;
}

function getRemotePullPreviewItemTitle(item) {
  const fallbackTitle = item?.type === 'folder' ? 'Carpeta sense nom' : 'Document sense nom';
  return typeof item?.title === 'string' && item.title.trim() ? item.title.trim() : fallbackTitle;
}

function createRemotePullPreviewQuotedLabel(value = '', options = {}) {
  const fallback = options.fallback || 'sense nom';
  const maxLength = Number.isInteger(options.maxLength) ? options.maxLength : 42;
  const normalized = typeof value === 'string' && value.trim() ? value.trim() : fallback;
  const clipped = normalized.length > maxLength
    ? `${normalized.slice(0, maxLength - 1).trimEnd()}...`
    : normalized;
  return `"${clipped}"`;
}

function buildRemotePullPreviewFolderPath(folderId, itemById = new Map()) {
  const path = [];
  const visited = new Set();
  let currentId = folderId;
  while (currentId && currentId !== 'root' && !visited.has(currentId)) {
    visited.add(currentId);
    const folder = itemById.get(currentId);
    if (!folder || folder.type !== 'folder') break;
    path.unshift(getRemotePullPreviewItemTitle(folder));
    currentId = folder.parentId || 'root';
  }
  return path;
}

function formatRemotePullPreviewParentLabel(item, itemById = new Map()) {
  const path = buildRemotePullPreviewFolderPath(item?.parentId || 'root', itemById);
  return path.length ? `Arrel / ${path.join(' / ')}` : 'Arrel';
}

function formatRemotePullPreviewCompact(preview) {
  if (!preview) return 'pendent';
  if (!preview.totalChanged) return 'Sense canvis visibles';
  const parts = [];
  if (preview.additions > 0) parts.push(`+${preview.additions}`);
  if (preview.updates > 0) parts.push(`~${preview.updates}`);
  if (preview.removals > 0) parts.push(`-${preview.removals}`);
  return parts.join(' · ') || 'Sense canvis visibles';
}

function buildRemotePullPreviewSummary(preview) {
  if (!preview) return '';
  if (!preview.totalChanged) return 'no hi ha canvis visibles respecte al local actual.';

  const summaryParts = [];
  if (preview.additions > 0) summaryParts.push(`afegirà ${countRemotePullPreviewLabel(preview.additions)}`);
  if (preview.updates > 0) summaryParts.push(`actualitzarà ${countRemotePullPreviewLabel(preview.updates)}`);
  if (preview.removals > 0) summaryParts.push(`retirarà ${countRemotePullPreviewLabel(preview.removals)}`);
  return `${joinRemotePullPreviewParts(summaryParts)}.`;
}

function buildRemotePullPreviewDetail(preview) {
  if (!preview) return '';
  const summary = buildRemotePullPreviewSummary(preview);
  if (!preview.totalChanged) return summary;

  const sampleParts = [];
  if (preview.samples.additions.length) sampleParts.push(`afegir ${preview.samples.additions.map(title => `"${title}"`).join(', ')}`);
  if (preview.samples.updates.length) sampleParts.push(`actualitzar ${preview.samples.updates.map(title => `"${title}"`).join(', ')}`);
  if (preview.samples.removals.length) sampleParts.push(`retirar ${preview.samples.removals.map(title => `"${title}"`).join(', ')}`);

  let detail = summary;
  if (sampleParts.length) {
    detail += ` Exemples: ${sampleParts.join('; ')}.`;
  }
  return detail;
}

function describeRemotePullPreviewChangeBits(localItem, remoteItem) {
  if (!localItem || !remoteItem) return [];
  const bits = [];
  if ((localItem.title || '') !== (remoteItem.title || '')) bits.push('nom');
  if ((localItem.parentId || 'root') !== (remoteItem.parentId || 'root')) bits.push('carpeta');
  if (stableShadowSyncStringify(localItem.tags || []) !== stableShadowSyncStringify(remoteItem.tags || [])) bits.push('etiquetes');
  if (Boolean(localItem.isFavorite) !== Boolean(remoteItem.isFavorite) || Boolean(localItem.isPinned) !== Boolean(remoteItem.isPinned)) bits.push('marcadors');

  if (remoteItem.type === 'folder' || localItem.type === 'folder') {
    if ((localItem.desc || '') !== (remoteItem.desc || '')) bits.push('descripció');
    if ((localItem.color || '#0ea5e9') !== (remoteItem.color || '#0ea5e9')) bits.push('color');
  } else {
    if ((localItem.category || '') !== (remoteItem.category || '')) bits.push('categoria');
    if ((localItem.content || '') !== (remoteItem.content || '')) bits.push('contingut');
    if (stableShadowSyncStringify(localItem.versions || []) !== stableShadowSyncStringify(remoteItem.versions || [])) bits.push('versions');
    if (stableShadowSyncStringify(localItem.attachment || null) !== stableShadowSyncStringify(remoteItem.attachment || null)) bits.push('adjunt');
  }

  return Array.from(new Set(bits));
}

function buildRemotePullPreviewUpdatePhrases(localItem, remoteItem, context = {}) {
  if (!localItem || !remoteItem) return [];
  const phrases = [];
  const currentTitle = getRemotePullPreviewItemTitle(localItem);
  const nextTitle = getRemotePullPreviewItemTitle(remoteItem);
  if (currentTitle !== nextTitle) {
    phrases.push(`reanomena de ${createRemotePullPreviewQuotedLabel(currentTitle)} a ${createRemotePullPreviewQuotedLabel(nextTitle)}`);
  }

  const currentParentLabel = formatRemotePullPreviewParentLabel(localItem, context.currentById);
  const nextParentLabel = formatRemotePullPreviewParentLabel(remoteItem, context.targetById);
  if (currentParentLabel !== nextParentLabel) {
    phrases.push(`mou de ${currentParentLabel} a ${nextParentLabel}`);
  }

  const genericBits = describeRemotePullPreviewChangeBits(localItem, remoteItem)
    .filter(bit => bit !== 'nom' && bit !== 'carpeta')
    .slice(0, 3);
  if (genericBits.length) {
    phrases.push(`canvia ${joinRemotePullPreviewParts(genericBits)}`);
  }
  return phrases.slice(0, 3);
}

function buildRemotePullPreviewPlacementPhrase(kind, item, context = {}) {
  if (!item) return '';
  const itemById = kind === 'add' ? context.targetById : context.currentById;
  const parentLabel = formatRemotePullPreviewParentLabel(item, itemById);
  return kind === 'add'
    ? `entrarà a ${parentLabel}`
    : `sortirà de ${parentLabel}`;
}

function buildRemotePullPreviewEntry(kind, localItem, remoteItem, context = {}) {
  const item = remoteItem || localItem || {};
  const typeLabel = item.type === 'folder' ? 'carpeta' : 'document';
  const actionLabel = kind === 'add'
    ? 'Afegirà'
    : (kind === 'remove' ? 'Retirarà' : 'Actualitzarà');
  const detailParts = kind === 'update'
    ? buildRemotePullPreviewUpdatePhrases(localItem, remoteItem, context)
    : [buildRemotePullPreviewPlacementPhrase(kind, item, context)].filter(Boolean);

  return {
    id: item.id || '',
    kind,
    title: getRemotePullPreviewItemTitle(item),
    typeLabel,
    actionLabel,
    detailText: detailParts.length ? `${typeLabel} · ${detailParts.join(' · ')}` : typeLabel
  };
}

function renderRemotePullPreviewEntryHtml(entry) {
  const kindClass = entry.kind === 'add'
    ? 'is-add'
    : (entry.kind === 'remove' ? 'is-remove' : 'is-update');
  const detailLabel = `${entry.actionLabel} ${entry.detailText}`;
  return `<li class="sync-remote-preview-item ${kindClass}"><strong>${escapeHtml(entry.title)}</strong><small>${escapeHtml(detailLabel)}</small></li>`;
}

function buildRemoteChangePreviewLeadText(actionLabel, preview) {
  if (!preview) return '';
  if (!preview.totalChanged) return 'No hi ha canvis visibles respecte a l’estat actual.';
  return `Si ${actionLabel}, Sutsumu ${preview.summaryText}`;
}

function buildRemotePullPreviewSectionHtml(label, entries = [], options = {}) {
  if (!Array.isArray(entries) || !entries.length) return '';
  const entryLimit = Number.isInteger(options.entryLimit) ? options.entryLimit : entries.length;
  const visibleEntries = entries.slice(0, entryLimit);
  const hiddenCount = Math.max(entries.length - visibleEntries.length, 0);
  return `
    <div class="sync-remote-preview-group">
      <div class="sync-prep-list-label">${escapeHtml(label)}</div>
      <ul class="sync-remote-preview-list">${visibleEntries.map(renderRemotePullPreviewEntryHtml).join('')}</ul>
      ${hiddenCount > 0 ? `<div class="sync-remote-preview-more">i ${hiddenCount} més.</div>` : ''}
    </div>
  `.trim();
}

function buildRemotePullPreviewGroupsHtml(preview, options = {}) {
  if (!preview || !preview.totalChanged) return '';
  const sections = [
    { label: `Afegirà (${preview.additions})`, entries: preview.entries.additions },
    { label: `Actualitzarà (${preview.updates})`, entries: preview.entries.updates },
    { label: `Retirarà (${preview.removals})`, entries: preview.entries.removals }
  ].filter(section => section.entries.length > 0);
  return sections.map(section => buildRemotePullPreviewSectionHtml(section.label, section.entries, options)).join('');
}

function createCanonicalPreviewSyncDocs(sourceDocs = []) {
  return createCanonicalSyncDocsForSignature(sourceDocs);
}

function createCanonicalPreviewLocalDocs(currentDocs = docs) {
  return createCanonicalPreviewSyncDocs(normalizeDocs(currentDocs).map(buildSyncItemPayload));
}

function createRemoteChangePreview(targetDocs = [], currentDocs = []) {
  const targetItems = createCanonicalPreviewSyncDocs(targetDocs);
  const currentItems = createCanonicalPreviewSyncDocs(currentDocs);
  const localById = new Map(currentItems.map(item => [item.id, item]));
  const remoteById = new Map(targetItems.map(item => [item.id, item]));
  const previewContext = {
    currentById: localById,
    targetById: remoteById
  };
  const preview = {
    additions: 0,
    updates: 0,
    removals: 0,
    unchanged: 0,
    totalChanged: 0,
    entries: {
      additions: [],
      updates: [],
      removals: []
    },
    samples: {
      additions: [],
      updates: [],
      removals: []
    }
  };

  targetItems.forEach(remoteItem => {
    const localItem = localById.get(remoteItem.id) || null;
    const localVisible = Boolean(localItem && !localItem.isDeleted);
    const remoteVisible = Boolean(remoteItem && !remoteItem.isDeleted);

    if (!remoteVisible) return;
    if (!localVisible && remoteVisible) {
      preview.additions += 1;
      preview.entries.additions.push(buildRemotePullPreviewEntry('add', localItem, remoteItem, previewContext));
      rememberRemotePullPreviewSample(preview.samples.additions, remoteItem);
      return;
    }
    if (stableShadowSyncStringify(localItem) !== stableShadowSyncStringify(remoteItem)) {
      preview.updates += 1;
      preview.entries.updates.push(buildRemotePullPreviewEntry('update', localItem, remoteItem, previewContext));
      rememberRemotePullPreviewSample(preview.samples.updates, remoteItem || localItem);
      return;
    }
    preview.unchanged += 1;
  });

  currentItems.forEach(localItem => {
    const remoteItem = remoteById.get(localItem.id) || null;
    const localVisible = Boolean(localItem && !localItem.isDeleted);
    const remoteVisible = Boolean(remoteItem && !remoteItem.isDeleted);
    if (!localVisible || remoteVisible) return;
    preview.removals += 1;
    preview.entries.removals.push(buildRemotePullPreviewEntry('remove', localItem, remoteItem, previewContext));
    rememberRemotePullPreviewSample(preview.samples.removals, localItem);
  });

  preview.totalChanged = preview.additions + preview.updates + preview.removals;
  preview.compactValue = formatRemotePullPreviewCompact(preview);
  preview.summaryText = buildRemotePullPreviewSummary(preview);
  preview.detailText = buildRemotePullPreviewDetail(preview);
  return preview;
}

function createRemotePullPreview(syncDocs = [], currentDocs = docs) {
  const localItems = createCanonicalPreviewLocalDocs(currentDocs);
  const remoteItems = createCanonicalPreviewSyncDocs(syncDocs);
  return createRemoteChangePreview(remoteItems, localItems);
}

function createRemotePushPreview(syncDocs = [], currentDocs = docs) {
  const localItems = createCanonicalPreviewLocalDocs(currentDocs);
  const remoteItems = createCanonicalPreviewSyncDocs(syncDocs);
  return createRemoteChangePreview(localItems, remoteItems);
}

function getRemoteShadowPullReadiness(comparison = computeRemoteShadowComparison()) {
  const remoteHead = comparison?.remoteHead || getShadowHistoryHead(remoteShadowSource?.revisions || [], remoteShadowSource?.state?.lastRevisionId || '');
  const payload = remoteHead?.payload && typeof remoteHead.payload === 'object' ? remoteHead.payload : null;
  const syncDocs = Array.isArray(payload?.snapshot?.docs) ? payload.snapshot.docs : [];
  const attachmentSummary = summarizeRemoteAttachmentTransport(syncDocs);
  const pullPreview = payload && payload.schema === SYNC_PAYLOAD_SCHEMA && Array.isArray(payload.snapshot?.docs) && comparison?.status !== 'other-workspace'
    ? createRemotePullPreview(syncDocs)
    : null;
  if (!remoteHead) {
    return {
      canApply: false,
      status: 'no-remote',
      message: 'Encara no hi ha cap head remot carregat per aplicar.',
      remoteHead,
      payload: null,
      syncDocs: [],
      attachmentSummary,
      pullPreview: null
    };
  }
  if (!payload || payload.schema !== SYNC_PAYLOAD_SCHEMA || !Array.isArray(payload.snapshot?.docs)) {
    return {
      canApply: false,
      status: 'invalid-remote',
      message: 'El head remot actual no porta un payload sincronitzable compatible.',
      remoteHead,
      payload: null,
      syncDocs: [],
      attachmentSummary,
      pullPreview: null
    };
  }
  if (!['remote-ahead', 'remote-only'].includes(comparison?.status)) {
    const fallbackMessages = {
      'in-sync': 'El remot i el local ja estan al dia.',
      'local-ahead': 'El dispositiu local ja va per davant del remot.',
      'diverged': 'Hi ha divergència entre local i remot. Encara no es pot fer pull manual segur.',
      'other-workspace': 'Aquest remot pertany a un altre workspace i no es pot aplicar aquí.'
    };
    return {
      canApply: false,
      status: comparison?.status || 'not-ready',
      message: fallbackMessages[comparison?.status] || 'Aquest remot encara no es pot aplicar manualment.',
      remoteHead,
      payload,
      syncDocs,
      attachmentSummary,
      pullPreview
    };
  }
  return {
    canApply: true,
    status: comparison.status,
    message: comparison.status === 'remote-only'
      ? `Hi ha un remot disponible i aquest dispositiu encara no té cap head local equivalent.${pullPreview?.summaryText ? ` Pull previst: ${pullPreview.summaryText}` : ''}`
      : (comparison.detailText
        ? `El remot va per davant i es pot importar manualment amb xarxa de seguretat. ${comparison.detailText}${pullPreview?.summaryText ? ` Pull previst: ${pullPreview.summaryText}` : ''}`
        : `El remot va per davant i es pot importar manualment amb xarxa de seguretat.${pullPreview?.summaryText ? ` Pull previst: ${pullPreview.summaryText}` : ''}`),
    remoteHead,
    payload,
    syncDocs,
    attachmentSummary,
    pullPreview,
    comparison
  };
}

function getGuidedRemoteShadowPullReadiness(comparison = computeRemoteShadowComparison()) {
  const remoteHead = comparison?.remoteHead || getShadowHistoryHead(remoteShadowSource?.revisions || [], remoteShadowSource?.state?.lastRevisionId || '');
  const payload = remoteHead?.payload && typeof remoteHead.payload === 'object' ? remoteHead.payload : null;
  const syncDocs = Array.isArray(payload?.snapshot?.docs) ? payload.snapshot.docs : [];
  const attachmentSummary = summarizeRemoteAttachmentTransport(syncDocs);
  const pullPreview = payload && payload.schema === SYNC_PAYLOAD_SCHEMA && Array.isArray(payload.snapshot?.docs) && comparison?.status !== 'other-workspace'
    ? createRemotePullPreview(syncDocs)
    : null;
  if (!remoteHead) {
    return {
      canGuide: false,
      status: 'no-remote',
      message: 'Encara no hi ha cap head remot disponible per resoldre divergència.',
      remoteHead,
      payload,
      syncDocs,
      attachmentSummary,
      pullPreview: null
    };
  }
  if (!payload || payload.schema !== SYNC_PAYLOAD_SCHEMA || !Array.isArray(payload.snapshot?.docs)) {
    return {
      canGuide: false,
      status: 'invalid-remote',
      message: 'El remot actual no és aplicable perquè el payload no és compatible.',
      remoteHead,
      payload,
      syncDocs,
      attachmentSummary,
      pullPreview: null
    };
  }
  if (comparison?.status !== 'diverged') {
    const fallbackMessages = {
      'remote-ahead': 'Aquí no hi ha divergència: pots aplicar el remot directament.',
      'remote-only': 'Aquí no hi ha divergència: pots importar el remot directament.',
      'local-ahead': 'El local va per davant; la divergència guiada no és necessària.',
      'in-sync': 'Local i remot ja estan al dia.',
      'other-workspace': 'Aquest remot pertany a un altre workspace.'
    };
    return {
      canGuide: false,
      status: comparison?.status || 'not-ready',
      message: fallbackMessages[comparison?.status] || 'La resolució guiada només s’activa quan hi ha divergència real.',
      remoteHead,
      payload,
      syncDocs,
      attachmentSummary,
      pullPreview
    };
  }
  return {
    canGuide: true,
    status: 'diverged',
    message: comparison?.detailText
      ? `Hi ha divergència real: ${comparison.detailText}${pullPreview?.summaryText ? ` Pull previst: ${pullPreview.summaryText}` : ''}`
      : `Hi ha divergència real: Sutsumu pot guardar una còpia del local i després aplicar el remot de manera guiada.${pullPreview?.summaryText ? ` Pull previst: ${pullPreview.summaryText}` : ''}`,
    remoteHead,
    payload,
    syncDocs,
    attachmentSummary,
    pullPreview,
    comparison
  };
}

function getRemoteShadowPushReadiness(comparison = computeRemoteShadowComparison()) {
  const currentRemoteUrl = remoteShadowConfig?.url || '';
  const remoteHead = comparison?.remoteHead || getShadowHistoryHead(remoteShadowSource?.revisions || [], remoteShadowSource?.state?.lastRevisionId || '');
  const payload = remoteHead?.payload && typeof remoteHead.payload === 'object' ? remoteHead.payload : null;
  const syncDocs = Array.isArray(payload?.snapshot?.docs) ? payload.snapshot.docs : [];
  const attachmentPolicy = getRemoteAutoPushAttachmentPolicy();
  const pushPreview = comparison?.status !== 'other-workspace'
    ? createRemotePushPreview(syncDocs)
    : null;
  if (getSelectedRemoteShadowMode() !== 'provider-head-url' || !currentRemoteUrl) {
    return {
      canPush: false,
      status: 'not-configured',
      message: 'Per fer push manual cal un backend connectat en mode Head backend.',
      remoteHead,
      payload,
      syncDocs,
      attachmentPolicy,
      pushPreview
    };
  }
  if (!docs.length) {
    return {
      canPush: false,
      status: 'empty-local',
      message: 'Encara no hi ha contingut local per enviar al núvol.',
      remoteHead,
      payload,
      syncDocs,
      attachmentPolicy,
      pushPreview: null
    };
  }
  if (remoteShadowConfig?.lastStatus === 'checking') {
    return {
      canPush: false,
      status: 'checking',
      message: 'Sutsumu encara està comprovant el remot configurat.',
      remoteHead,
      payload,
      syncDocs,
      attachmentPolicy,
      pushPreview
    };
  }
  if (['auth-error', 'not-found', 'error'].includes(remoteShadowConfig?.lastStatus || '')) {
    return {
      canPush: false,
      status: remoteShadowConfig.lastStatus,
      message: remoteShadowConfig.lastError || 'El backend remot actual no està llest per rebre el push.',
      remoteHead,
      payload,
      syncDocs,
      attachmentPolicy,
      pushPreview
    };
  }
  const fallbackMessages = {
    'remote-ahead': 'El remot va per davant. Cal revisar o fer pull abans de permetre un push manual.',
    'remote-only': 'Aquest dispositiu encara no té una base local comparable per fer push segur.',
    'diverged': 'Hi ha divergència entre local i remot. Primer cal resoldre-la.',
    'other-workspace': 'Aquest remot apunta a un altre workspace.',
    'in-sync': 'Local i remot ja estan al dia. No cal fer push ara mateix.'
  };
  if (['remote-ahead', 'remote-only', 'diverged', 'other-workspace', 'in-sync'].includes(comparison?.status || '')) {
    return {
      canPush: false,
      status: comparison?.status || 'not-ready',
      message: fallbackMessages[comparison?.status] || 'Encara no es pot fer push manual segur.',
      remoteHead,
      payload,
      syncDocs,
      attachmentPolicy,
      pushPreview
    };
  }
  return {
    canPush: true,
    status: comparison?.status || 'no-remote',
    message: comparison?.status === 'local-ahead'
      ? `El local va per davant i es pot enviar manualment al remot sense sobreescriptura cega.${pushPreview?.summaryText ? ` Push previst: ${pushPreview.summaryText}` : ''}`
      : `No hi ha cap head remot encara: aquest push crearà la primera còpia remota.${pushPreview?.summaryText ? ` Push previst: ${pushPreview.summaryText}` : ''}`,
    remoteHead,
    payload,
    syncDocs,
    attachmentPolicy,
    pushPreview
  };
}

function summarizeRemoteAttachmentTransport(syncDocs = []) {
  return syncDocs
    .filter(item => item?.type === 'document' && item?.attachment)
    .reduce((summary, item) => {
      const attachment = item.attachment || {};
      summary.total += 1;
      if (typeof attachment.inlineDataUrl === 'string' && attachment.inlineDataUrl.startsWith('data:')) {
        summary.inlineReady += 1;
      } else if (typeof attachment.downloadUrl === 'string' && attachment.downloadUrl.trim()) {
        summary.downloadReady += 1;
      } else {
        summary.metadataOnly += 1;
      }
      return summary;
    }, {
      total: 0,
      inlineReady: 0,
      downloadReady: 0,
      metadataOnly: 0
    });
}

function canPreserveLocalAttachmentBlob(remoteItem, localItem) {
  if (!remoteItem?.attachment || !localItem || localItem.type !== 'document' || !isRealBlob(localItem.fileBlob)) return false;
  return (remoteItem.attachment.fileName || '') === (localItem.fileName || '')
    && (remoteItem.attachment.fileType || '') === (localItem.fileType || '')
    && Number(remoteItem.attachment.fileSize || 0) === Number(localItem.fileSize || 0)
    && (remoteItem.attachment.sourceFormat || '') === (localItem.sourceFormat || '');
}

function resolveRemoteAttachmentUrl(attachment = {}, providerProfile = remoteProviderProfile) {
  if (typeof attachment.downloadUrl === 'string' && attachment.downloadUrl.trim()) {
    return new URL(attachment.downloadUrl.trim(), remoteShadowConfig?.url || window.location.href).toString();
  }
  const objectKey = String(attachment.remoteObjectKey || '').trim();
  if (!objectKey) return '';
  const normalizedProfile = normalizeRemoteProviderProfile(providerProfile);
  if (!normalizedProfile.baseUrl) return '';
  const access = String(attachment.remoteAccess || attachment.bundleAccess || 'public').trim() || 'public';
  return buildSupabaseStorageObjectUrl(normalizedProfile.baseUrl, objectKey, access);
}

async function materializeRemoteAttachmentBlob(attachment = {}, providerProfile = remoteProviderProfile, providerSecret = remoteProviderSecret) {
  if (!attachment || typeof attachment !== 'object') {
    return { blob: null, source: 'none' };
  }
  if (typeof attachment.inlineDataUrl === 'string' && attachment.inlineDataUrl.startsWith('data:')) {
    const inlineBlob = dataUrlToBlob(attachment.inlineDataUrl, attachment.fileType || 'application/octet-stream');
    return {
      blob: await validateRemoteAttachmentBlob(inlineBlob, attachment),
      source: 'inline'
    };
  }
  const downloadUrl = resolveRemoteAttachmentUrl(attachment, providerProfile);
  if (!downloadUrl) {
    return { blob: null, source: 'metadata-only' };
  }
  const response = await fetch(downloadUrl, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Accept': attachment.fileType || '*/*',
      ...buildRemoteProviderAuthHeaders(providerProfile, providerSecret)
    }
  });
  if (!response.ok) {
    throw new Error(`No s'ha pogut descarregar l'adjunt remot ${attachment.fileName || 'sense nom'} (${response.status}).`);
  }
  const remoteBlob = await response.blob();
  return {
    blob: await validateRemoteAttachmentBlob(remoteBlob, attachment),
    source: 'download'
  };
}

async function hydrateDocsFromSyncPayload(syncDocs, currentDocs = docs, options = {}) {
  if (!Array.isArray(syncDocs)) {
    return {
      docs: [],
      attachmentSummary: {
        total: 0,
        preservedLocal: 0,
        restoredRemote: 0,
        metadataOnly: 0
      }
    };
  }
  const { providerProfile = remoteProviderProfile, providerSecret = remoteProviderSecret } = options;
  const localDocsById = new Map(normalizeDocs(currentDocs).map(item => [item.id, item]));
  const attachmentSummary = {
    total: 0,
    preservedLocal: 0,
    restoredRemote: 0,
    metadataOnly: 0
  };
  const hydrated = [];
  for (const item of syncDocs.filter(entry => entry && typeof entry === 'object')) {
    if (item.type === 'folder') {
      hydrated.push({
        id: item.id,
        type: 'folder',
        title: item.title || 'Carpeta',
        parentId: item.parentId || 'root',
        timestamp: item.timestamp || new Date().toISOString(),
        isDeleted: Boolean(item.isDeleted),
        desc: typeof item.desc === 'string' ? item.desc : '',
        color: typeof item.color === 'string' && item.color.trim() ? item.color : '#0ea5e9',
        tags: normalizeTags(item.tags),
        isFavorite: Boolean(item.isFavorite),
        isPinned: Boolean(item.isPinned)
      });
      continue;
    }

    const attachment = item.attachment && typeof item.attachment === 'object' ? item.attachment : null;
    const localDoc = localDocsById.get(item.id);
    let resolvedBlob = canPreserveLocalAttachmentBlob(item, localDoc) ? localDoc.fileBlob : null;

    if (attachment) {
      attachmentSummary.total += 1;
      if (resolvedBlob) {
        attachmentSummary.preservedLocal += 1;
      } else {
        const remoteMaterialized = await materializeRemoteAttachmentBlob(attachment, providerProfile, providerSecret);
        resolvedBlob = remoteMaterialized.blob || null;
        if (resolvedBlob) {
          attachmentSummary.restoredRemote += 1;
        } else {
          attachmentSummary.metadataOnly += 1;
        }
      }
    }

    hydrated.push({
      id: item.id,
      type: 'document',
      title: item.title || 'Document',
      parentId: item.parentId || 'root',
      timestamp: item.timestamp || new Date().toISOString(),
      isDeleted: Boolean(item.isDeleted),
      category: typeof item.category === 'string' ? item.category : '',
      tags: normalizeTags(item.tags),
      content: sanitizeRichText(item.content || ''),
      versions: normalizeVersions(item.versions || []),
      fileBlob: resolvedBlob,
      fileType: attachment?.fileType || '',
      fileName: attachment?.fileName || '',
      fileSize: Number(attachment?.fileSize || 0),
      sourceFormat: attachment?.sourceFormat || '',
      binaryFileUnavailable: Boolean(attachment && !resolvedBlob),
      isFavorite: Boolean(item.isFavorite),
      isPinned: Boolean(item.isPinned)
    });
  }
  return {
    docs: normalizeDocs(hydrated),
    attachmentSummary
  };
}

function buildRemotePullAttachmentMessage(summary = {}) {
  const total = Number(summary.total || 0);
  if (total === 0) return '';
  const parts = [];
  if (summary.preservedLocal > 0) parts.push(`${summary.preservedLocal} conservats des del dispositiu`);
  if (summary.restoredRemote > 0) parts.push(`${summary.restoredRemote} validats des del remot`);
  if (summary.metadataOnly > 0) parts.push(`${summary.metadataOnly} només en metadades`);
  return ` Adjunts: ${parts.join(' · ')}.`;
}

async function rememberConflictWorkspaceCopy(reason = 'remote-guided-pull') {
  const payload = await createWorkspacePayload(reason);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const baseName = getWorkspaceDisplayName() === 'Sense workspace'
    ? 'sutsumu-conflicte-local'
    : `${slugifyFileName(getWorkspaceDisplayName())}-conflicte-local`;
  await rememberRecentWorkspace(payload, {
    mode: 'portable',
    source: reason,
    fileName: `${baseName}-${timestamp}${WORKSPACE_FILE_EXTENSION}`
  });
}

async function performRemoteShadowPull(readiness, options = {}) {
  const {
    confirmationTitle = 'Aplicar el remot manualment?',
    okLabel = 'Aplicar remot',
    warningText = "Abans de continuar, Sutsumu crearà una còpia crítica de recuperació. Aquesta fase no farà cap pull automàtic ni sobreescriurà el teu workspace extern sense que el desis tu.",
    successPrefix = 'Remot aplicat localment.',
    safetyReason = 'before-remote-manual-pull',
    operationLabel = 'aplicar el remot manualment',
    saveReason = 'remote-manual-pull',
    preserveWorkspaceCopy = false,
    requireText = '',
    introText = '',
    remoteRevisionActionType = 'apply',
    skipConfirmation = false
  } = options;

  const remoteDate = readiness.remoteHead?.createdAt
    ? new Date(readiness.remoteHead.createdAt).toLocaleString('ca-ES')
    : 'fa un moment';
  const attachmentSummary = readiness.attachmentSummary || summarizeRemoteAttachmentTransport(readiness.syncDocs);
  const attachmentWarning = attachmentSummary.total > 0
    ? ` El remot inclou ${attachmentSummary.total} adjunts. Sutsumu conservarà els binaris locals equivalents i validarà qualsevol adjunt remot que vingui inline o amb URL descarregable; la resta quedaran només com a metadades fins a una fase posterior.`
    : '';
  const workspaceCopyWarning = preserveWorkspaceCopy
    ? ' També desarà una còpia portable del local actual a Workspaces recents abans de substituir-lo.'
    : '';
  const messageParts = [
    `<p>${escapeHtml(introText || `Sutsumu importarà el head remot del ${remoteDate} i substituirà l'estat local visible.`)}</p>`
  ];

  if (readiness?.comparison?.detailText) {
    messageParts.push(`<p><strong>Comparació actual:</strong> ${escapeHtml(readiness.comparison.detailText)}</p>`);
  }
  if (readiness?.pullPreview?.summaryText) {
    messageParts.push(`
      <div class="confirm-preview-block">
        <div class="confirm-preview-label">Previsualització del pull: ${escapeHtml(readiness.pullPreview.summaryText)}</div>
        ${buildRemotePullPreviewGroupsHtml(readiness.pullPreview, { entryLimit: 4 })}
      </div>
    `.trim());
  }
  if (attachmentWarning) {
    messageParts.push(`<p>${escapeHtml(attachmentWarning.trim())}</p>`);
  }
  if (workspaceCopyWarning) {
    messageParts.push(`<p>${escapeHtml(workspaceCopyWarning.trim())}</p>`);
  }

  const runPullOperation = async () => {
      try {
        const canContinue = await prepareSafetySnapshotOrAbort(safetyReason, operationLabel);
        if (!canContinue) return;
        if (preserveWorkspaceCopy) {
          await rememberConflictWorkspaceCopy(saveReason);
        }
        const hydratedResult = await hydrateDocsFromSyncPayload(readiness.syncDocs, docs, {
          providerProfile: remoteProviderProfile,
          providerSecret: remoteProviderSecret
        });
        docs = hydratedResult.docs;
        expandedFolders = normalizeExpandedFolders(expandedFolders, docs);
        const remoteWorkspace = readiness.payload?.workspace && typeof readiness.payload.workspace === 'object'
          ? readiness.payload.workspace
          : null;
        workspaceMeta = {
          id: typeof remoteWorkspace?.id === 'string' && remoteWorkspace.id.trim()
            ? remoteWorkspace.id.trim()
            : (workspaceMeta?.id || generateId('workspace')),
          name: normalizeWorkspaceName(remoteWorkspace?.name || workspaceMeta?.name || 'Sutsumu Workspace'),
          lastSavedAt: workspaceMeta?.lastSavedAt || '',
          bindingMode: workspaceHandle ? 'fs' : (workspaceMeta?.bindingMode === 'portable' ? 'portable' : 'local')
        };
        workspaceDirty = true;
        await persistWorkspaceBinding();
        await saveData(saveReason);
        const localShadowEntry = await createShadowRevisionNow(`shadow-${saveReason}`, { silent: true, force: true });
        rememberRemoteRevisionApplication(readiness.revision || readiness.remoteHead, {
          actionType: remoteRevisionActionType,
          localRevisionId: localShadowEntry?.revisionId || shadowSyncState?.lastRevisionId || ''
        });
        renderData();
        updateRemoteShadowUI();
        showToast(`${successPrefix}${buildRemotePullAttachmentMessage(hydratedResult.attachmentSummary)} Revisa-ho i desa el workspace o el backup extern quan et vagi bé.`);
      } catch (err) {
        console.error(err);
        showToast(err?.message || "No s'ha pogut aplicar el remot amb seguretat.", 'error');
      }
  };
  if (skipConfirmation) {
    await runPullOperation();
    return true;
  }
  openConfirm(
    confirmationTitle,
    messageParts.join(''),
    runPullOperation,
    {
      okLabel,
      warningText,
      requireText
    }
  );
  return true;
}

async function applyRemoteShadowPull() {
  const comparison = computeRemoteShadowComparison();
  const readiness = getRemoteShadowPullReadiness(comparison);
  if (!readiness.canApply) {
    showToast(readiness.message, readiness.status === 'diverged' || readiness.status === 'other-workspace' ? 'error' : 'info');
    return false;
  }
  return performRemoteShadowPull(readiness, {
    confirmationTitle: 'Aplicar el remot manualment?',
    okLabel: 'Aplicar remot',
    safetyReason: 'before-remote-manual-pull',
    operationLabel: 'aplicar el remot manualment',
    saveReason: 'remote-manual-pull',
    remoteRevisionActionType: 'apply',
    successPrefix: 'Remot aplicat localment.'
  });
}

async function applyGuidedRemoteShadowPull() {
  const comparison = computeRemoteShadowComparison();
  const readiness = getGuidedRemoteShadowPullReadiness(comparison);
  if (!readiness.canGuide) {
    showToast(readiness.message, readiness.status === 'other-workspace' ? 'error' : 'info');
    return false;
  }
  return performRemoteShadowPull(readiness, {
    confirmationTitle: 'Resoldre divergència i aplicar remot?',
    okLabel: 'Guardar local i aplicar remot',
    warningText: 'Sutsumu crearà una còpia crítica de recuperació i guardarà el local actual a Workspaces recents abans d’aplicar el head remot. No tocarà el teu workspace extern ni el backup extern fins que els desis tu.',
    safetyReason: 'before-remote-guided-pull',
    operationLabel: 'resoldre la divergència amb el remot',
    saveReason: 'remote-guided-pull',
    preserveWorkspaceCopy: true,
    remoteRevisionActionType: 'apply',
    requireText: 'REMOT',
    successPrefix: 'Divergència resolta aplicant el remot.'
  });
}

async function restoreSelectedRemoteHistoryRevision() {
  const readiness = getRemoteHistoryRevisionRecoveryReadiness();
  if (!readiness.canRestore) {
    showToast(readiness.message, ['invalid-remote', 'other-workspace'].includes(readiness.status) ? 'error' : 'info');
    return false;
  }

  const selectedShortId = createShadowSyncShortId(readiness.revision?.revisionId || '');
  const currentHeadShortId = createShadowSyncShortId(readiness.currentRemoteHeadId || '');
  const remoteDate = readiness.remoteHead?.createdAt
    ? new Date(readiness.remoteHead.createdAt).toLocaleString('ca-ES')
    : 'fa un moment';
  const introText = readiness.isCurrentHead
    ? `Sutsumu recuperarà el head remot ${selectedShortId} del ${remoteDate} i substituirà l'estat local visible.`
    : `Sutsumu recuperarà la revisió remota ${selectedShortId} del ${remoteDate}, que és anterior al head remot actual${currentHeadShortId ? ` (${currentHeadShortId})` : ''}, i substituirà l'estat local visible.`;

  return performRemoteShadowPull(readiness, {
    confirmationTitle: 'Recuperar aquesta revisió remota?',
    okLabel: 'Recuperar revisió',
    warningText: 'Sutsumu crearà una còpia crítica de recuperació i guardarà el local actual a Workspaces recents abans de recuperar aquesta revisió remota. No tocarà el teu workspace extern ni el backup extern fins que els desis tu.',
    safetyReason: 'before-remote-history-restore',
    operationLabel: 'recuperar aquesta revisió remota',
    saveReason: 'remote-history-recovery',
    preserveWorkspaceCopy: true,
    remoteRevisionActionType: readiness.isCurrentHead ? 'apply' : 'restore',
    requireText: 'RECUPERAR',
    successPrefix: 'Revisió remota recuperada localment.',
    introText
  });
}

function downloadSelectedRemoteHistoryRevision() {
  const revision = getRemoteHistoryRevisionEntry();
  const bundle = createRemoteHistoryRevisionBundle();
  if (!revision || !bundle) {
    showToast('Aquesta revisió remota encara no es pot descarregar com a bundle.', 'info');
    return false;
  }

  const workspaceName = revision.workspaceName || revision.payload?.workspace?.name || syncPrepState?.workspace?.name || 'sutsumu';
  const revisionLabel = createShadowSyncShortId(revision.revisionId || 'remota');
  const fileName = `${slugifyFileName(workspaceName)}-remote-revision-${slugifyFileName(revisionLabel)}-shadow-bundle.json`;
  triggerDownload(fileName, JSON.stringify(bundle, null, 2), 'application/json;charset=utf-8');
  rememberRemoteRevisionDownload(revision, fileName);
  showToast(`Revisió remota descarregada: ${fileName}`);
  return true;
}

async function createRemoteManualPushBundle() {
  await createShadowRevisionNow('shadow-remote-manual-push-prep', { silent: true, force: false });
  const baseBundle = createShadowSyncBundle();
  if (!Array.isArray(baseBundle.revisions) || baseBundle.revisions.length === 0) {
    throw new Error('Encara no hi ha cap revisió local preparada per fer push.');
  }
  const bundle = JSON.parse(JSON.stringify(baseBundle));
  const headRevision = bundle.revisions.find(entry => entry.revisionId === bundle.state.lastRevisionId) || bundle.revisions[0];
  if (!headRevision?.payload?.snapshot?.docs) {
    throw new Error('El head local actual no porta un payload compatible per al push.');
  }
  const localDocsById = new Map(normalizeDocs(docs).map(item => [item.id, item]));
  const attachmentSummary = {
    total: 0,
    inlineReady: 0,
    metadataOnly: 0
  };

  for (const syncItem of headRevision.payload.snapshot.docs) {
    const localDoc = localDocsById.get(syncItem.id);
    if (syncItem?.type !== 'document') continue;
    const baseAttachment = syncItem.attachment && typeof syncItem.attachment === 'object'
      ? syncItem.attachment
      : (isBinaryAttachmentDocument(localDoc) ? {
          fileName: localDoc.fileName || '',
          fileType: localDoc.fileType || '',
          fileSize: Number(localDoc.fileSize || (isRealBlob(localDoc.fileBlob) ? localDoc.fileBlob.size : 0) || 0),
          sourceFormat: localDoc.sourceFormat || '',
          checksum: '',
          availability: localDoc.binaryFileUnavailable ? 'missing-local-copy' : 'local-pending-upload'
        } : null);
    if (!baseAttachment) continue;
    attachmentSummary.total += 1;
    if (isRealBlob(localDoc?.fileBlob)) {
      syncItem.attachment = {
        ...baseAttachment,
        checksum: await computeBlobChecksum(localDoc.fileBlob),
        inlineDataUrl: await blobToDataUrl(localDoc.fileBlob),
        inlineEncoding: 'data-url',
        availability: 'remote-inline-ready'
      };
      attachmentSummary.inlineReady += 1;
    } else {
      syncItem.attachment = {
        ...baseAttachment,
        availability: 'missing-local-copy'
      };
      attachmentSummary.metadataOnly += 1;
    }
  }

  headRevision.payload.generatedAt = new Date().toISOString();
  headRevision.payload.contract = {
    ...(headRevision.payload.contract || {}),
    attachmentMode: 'inline-data-url-manual-push-v1'
  };
  headRevision.payload.snapshot.counts = createSyncPayloadCounts(headRevision.payload.snapshot.docs);
  headRevision.payloadSignature = createSyncPayloadSignature(headRevision.payload);
  headRevision.counts = headRevision.payload.snapshot.counts;
  bundle.state.lastPayloadSignature = headRevision.payloadSignature;
  bundle.exportedAt = new Date().toISOString();

  return {
    bundle,
    headRevision,
    attachmentSummary
  };
}

async function performRemoteShadowPush(options = {}) {
  const {
    confirmationTitle = 'Fer push manual al remot?',
    okLabel = 'Fer push manual',
    warningText = "Abans de continuar, Sutsumu crearà una còpia crítica de recuperació i només farà el push si el head remot esperat continua sent el mateix.",
    successPrefix = 'Push remot completat.',
    safetyReason = 'before-remote-manual-push',
    operationLabel = 'fer el push manual al remot',
    requireText = 'PUSH',
    createSafetySnapshot = true,
    skipConfirmation = false
  } = options;
  const comparison = computeRemoteShadowComparison();
  const readiness = getRemoteShadowPushReadiness(comparison);
  if (!readiness.canPush) {
    showToast(readiness.message, readiness.status === 'diverged' || readiness.status === 'other-workspace' ? 'error' : 'info');
    return false;
  }

  const attachmentDocs = getAttachmentDocuments(docs);
  const attachmentPolicy = readiness.attachmentPolicy || getRemoteAutoPushAttachmentPolicy();
  const attachmentHint = attachmentDocs.length > 0
    ? ` Sutsumu empaquetarà ${attachmentDocs.length} adjunts dins del bundle remot perquè es puguin validar també en un pull segur.`
    : '';
  const attachmentAutomationHint = attachmentDocs.length > 0 && !attachmentPolicy.canAutoPush
    ? ` ${attachmentPolicy.message} Això no bloqueja el push manual: només evita fer-lo en segon pla sense revisar-lo.`
    : '';
  const messageParts = [
    `<p>${escapeHtml(comparison?.status === 'no-remote'
      ? 'Sutsumu crearà el primer head remot amb l’estat local actual i només continuarà si el backend confirma que no hi havia cap head previ inesperat.'
      : "Sutsumu enviarà el head local actual al backend remot sense sobreescriure'l si detecta que el head remot ha canviat des de l'última comparació.")}</p>`
  ];

  if (comparison?.detailText) {
    messageParts.push(`<p><strong>Comparació actual:</strong> ${escapeHtml(comparison.detailText)}</p>`);
  }
  if (readiness?.pushPreview?.summaryText) {
    messageParts.push(`
      <div class="confirm-preview-block">
        <div class="confirm-preview-label">Previsualització del push: ${escapeHtml(readiness.pushPreview.summaryText)}</div>
        ${buildRemotePullPreviewGroupsHtml(readiness.pushPreview, { entryLimit: 4 })}
      </div>
    `.trim());
  }
  if (attachmentHint) {
    messageParts.push(`<p>${escapeHtml(attachmentHint.trim())}</p>`);
  }
  if (attachmentAutomationHint) {
    messageParts.push(`<p>${escapeHtml(attachmentAutomationHint.trim())}</p>`);
  }

  const runPushOperation = async () => {
      if (createSafetySnapshot) {
        const canContinue = await prepareSafetySnapshotOrAbort(safetyReason, operationLabel);
        if (!canContinue) return false;
      }
      try {
        const pushBundle = await createRemoteManualPushBundle();
        const response = await fetch(remoteShadowConfig.url, {
          method: 'POST',
          cache: 'no-store',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...buildRemoteProviderAuthHeaders(remoteProviderProfile, remoteProviderSecret)
          },
          body: JSON.stringify({
            schema: REMOTE_MANUAL_PUSH_SCHEMA,
            workspaceId: pushBundle.headRevision.workspaceId || syncPrepState?.workspace?.id || '',
            workspaceName: pushBundle.headRevision.workspaceName || syncPrepState?.workspace?.name || 'Sutsumu Workspace',
            expectedHeadRevisionId: comparison.remoteHead?.revisionId || '',
            headRevisionId: pushBundle.headRevision.revisionId,
            payloadSignature: pushBundle.headRevision.payloadSignature,
            bundle: pushBundle.bundle
          })
        });
        if (!response.ok) {
          const errorBody = await readJsonResponseSafely(response);
          if (response.status === 401 || response.status === 403) {
            const errorDetails = errorBody?.error ? ` (${errorBody.error})` : '';
            throw createRemoteShadowConnectionError(`Les credencials remotes no permeten fer push${errorDetails}. Revisa Token o Regles de Seguretat.`, 'auth-error');
          }
          if (response.status === 404) {
            throw createRemoteShadowConnectionError('La funció remota de push no existeix o no està publicada (404).', 'not-found');
          }
          if (response.status === 409) {
            const remoteHead = errorBody?.head ? normalizeRemoteProviderHead(errorBody.head, remoteShadowConfig.url, remoteProviderProfile) : null;
            const remoteHeadLabel = remoteHead?.headRevisionId ? ` (${createShadowSyncShortId(remoteHead.headRevisionId)})` : '';
            const conflictError = createRemoteShadowConnectionError(`El head remot ha canviat abans del teu push${remoteHeadLabel}. Torna a comparar abans de reintentar.`, 'conflict');
            conflictError.remoteHead = remoteHead;
            throw conflictError;
          }
          throw createRemoteShadowConnectionError(errorBody?.error || `No s'ha pogut completar el push remot (${response.status}).`, 'error');
        }
        const parsedResponse = await response.json();
        const descriptor = normalizeRemoteProviderHead(parsedResponse?.head || parsedResponse, remoteShadowConfig.url, remoteProviderProfile);
        writeRemoteShadowSourceSnapshot({
          ...pushBundle.bundle,
          sourceName: descriptor.bundleUrl || remoteShadowConfig.url,
          importedAt: new Date().toISOString(),
          remoteHead: descriptor,
          remoteHistoryCount: descriptor.historyCount || 0,
          recentRevisions: descriptor.recentRevisions || []
        });
        writeRemoteShadowConfigSnapshot(buildRemoteShadowConfigSnapshot({
          mode: 'provider-head-url',
          url: remoteShadowConfig.url,
          lastStatus: 'connected',
          lastFetchedAt: new Date().toISOString(),
          lastError: ''
        }));
        updateRemoteShadowUI();
        const pushAttachmentBits = [];
        if (pushBundle.attachmentSummary.inlineReady > 0) pushAttachmentBits.push(`${pushBundle.attachmentSummary.inlineReady} adjunts empaquetats`);
        if (pushBundle.attachmentSummary.metadataOnly > 0) pushAttachmentBits.push(`${pushBundle.attachmentSummary.metadataOnly} adjunts només en metadades`);
        showToast(`${successPrefix}${pushAttachmentBits.length ? ` Adjunts: ${pushAttachmentBits.join(' · ')}.` : ''}`);
        return true;
      } catch (err) {
        if (err?.remoteHead) {
          writeRemoteShadowConfigSnapshot(buildRemoteShadowConfigSnapshot({
            mode: 'provider-head-url',
            url: remoteShadowConfig?.url || '',
            lastStatus: 'conflict',
            lastFetchedAt: new Date().toISOString(),
            lastError: err?.message || 'remote-push-conflict'
          }));
        }
        if (err?.remoteStatus === 'conflict') {
          await connectRemoteShadowUrl({ silent: true });
        }
        writeRemoteShadowConfigSnapshot(buildRemoteShadowConfigSnapshot({
          mode: 'provider-head-url',
          url: remoteShadowConfig?.url || '',
          lastStatus: err?.remoteStatus || 'error',
          lastFetchedAt: remoteShadowConfig?.lastFetchedAt || '',
          lastError: err?.message || 'remote-push-error'
        }));
        showToast(err?.message || "No s'ha pogut completar el push remot.", 'error');
        return false;
      }
  };
  if (skipConfirmation) {
    return runPushOperation();
  }
  openConfirm(
    confirmationTitle,
    messageParts.join(''),
    runPushOperation,
    {
      okLabel,
      warningText,
      requireText
    }
  );
  return true;
}

async function pushRemoteShadowManual() {
  return performRemoteShadowPush();
}

function updateRemoteShadowUI(options = {}) {
  const { forceInputs = false } = options;
  if (!syncRemoteStatusTextEl || !syncRemoteBadgeEl) return;
  updateRemoteProviderModeUI({ forceInputs });
  const comparison = computeRemoteShadowComparison();
  const localStability = getLocalSyncStabilityState();
  const remoteHead = comparison.remoteHead;
  const pullReadiness = getRemoteShadowPullReadiness(comparison);
  const guidedReadiness = getGuidedRemoteShadowPullReadiness(comparison);
  const pushReadiness = getRemoteShadowPushReadiness(comparison);
  const attachmentPolicy = pushReadiness.attachmentPolicy || getRemoteAutoPushAttachmentPolicy();
  const automationConfig = getEffectiveRemoteShadowAutomationConfig();
  const remoteHistoryState = buildRemoteRevisionInspectorState(remoteShadowSource, comparison);
  const pullPreview = pullReadiness.pullPreview || guidedReadiness.pullPreview || null;
  const pushPreview = pushReadiness.pushPreview || null;
  let description = comparison.description;
  let badgeLabel = comparison.label;
  if (remoteShadowConfig?.lastStatus === 'checking') {
    badgeLabel = 'Comprovant';
    description = 'Comprovant la URL remota configurada...';
  } else if (remoteShadowConfig?.lastStatus === 'auth-error') {
    badgeLabel = 'Auth';
    description = remoteShadowConfig.lastError || 'Les credencials remotes actuals no tenen accés al head.';
  } else if (remoteShadowConfig?.lastStatus === 'conflict') {
    badgeLabel = 'Conflicte';
    description = remoteShadowConfig.lastError || 'El head remot ha canviat i cal tornar a comparar abans del següent push.';
  } else if (remoteShadowConfig?.lastStatus === 'empty') {
    badgeLabel = 'Sense head';
    description = remoteShadowConfig.lastError || 'No hi ha cap head remot disponible per a aquest workspace.';
  } else if (remoteShadowConfig?.lastStatus === 'not-found') {
    badgeLabel = '404 remot';
    description = remoteShadowConfig.lastError || 'La URL remota no existeix o la vista encara no està publicada.';
  } else if (remoteShadowConfig?.lastStatus === 'error' && remoteShadowConfig.lastError) {
    badgeLabel = remoteHead ? comparison.label : 'Error remot';
    description = remoteShadowConfig.lastError;
  }
  if (comparison.status === 'diverged') {
    description = `No s'ha perdut res: el local i el remot han divergit i Sutsumu espera una decisió segura. ${comparison.detailText || ''}`.trim();
  } else if (comparison.status === 'other-workspace') {
    description = 'Aquest remot pertany a un altre workspace. El pots inspeccionar, però Sutsumu no el tocarà automàticament aquí.';
  }
  if (pullPreview?.summaryText && (pullReadiness.canApply || guidedReadiness.canGuide)) {
    description = `${description} Pull previst: ${pullPreview.summaryText}`.trim();
  } else if (pushPreview?.summaryText && pushReadiness.canPush) {
    description = `${description} Push previst: ${pushPreview.summaryText}`.trim();
  }
  const remoteRevisionLogSummary = describeRemoteRevisionLog();
  if (remoteRevisionLogSummary && remoteShadowConfig?.lastStatus !== 'checking' && remoteShadowConfig?.lastStatus !== 'auth-error' && remoteShadowConfig?.lastStatus !== 'not-found') {
    description = `${description} ${remoteRevisionLogSummary}`.trim();
  }
  syncRemoteBadgeEl.textContent = badgeLabel;
  syncRemoteStatusTextEl.textContent = description;
  if (syncRemoteSourceValueEl) syncRemoteSourceValueEl.textContent = getRemoteShadowSourceLabel();
  if (syncRemoteHeadValueEl) syncRemoteHeadValueEl.textContent = remoteHead ? createShadowSyncShortId(remoteHead.revisionId) : 'pendent';
  if (syncRemoteCompareValueEl) {
    syncRemoteCompareValueEl.textContent = comparison.compareValue || badgeLabel;
  }
  if (syncRemotePullPreviewValueEl) {
    if (!remoteHead) {
      syncRemotePullPreviewValueEl.textContent = 'pendent';
    } else if (comparison.status === 'other-workspace') {
      syncRemotePullPreviewValueEl.textContent = 'Bloquejat';
    } else if (pullPreview?.compactValue) {
      syncRemotePullPreviewValueEl.textContent = pullPreview.compactValue;
    } else if (pullReadiness.status === 'invalid-remote' || guidedReadiness.status === 'invalid-remote') {
      syncRemotePullPreviewValueEl.textContent = 'Incompatible';
    } else {
      syncRemotePullPreviewValueEl.textContent = 'Sense dades';
    }
  }
  if (syncRemotePullPreviewPanelEl) {
    const canRenderPreview = Boolean(pullPreview && (pullReadiness.canApply || guidedReadiness.canGuide));
    syncRemotePullPreviewPanelEl.classList.toggle('hidden', !canRenderPreview);
    if (canRenderPreview) {
      if (syncRemotePullPreviewTextEl) {
        syncRemotePullPreviewTextEl.textContent = buildRemoteChangePreviewLeadText('apliques el remot', pullPreview);
      }
      if (syncRemotePullPreviewListEl) {
        syncRemotePullPreviewListEl.innerHTML = buildRemotePullPreviewGroupsHtml(pullPreview, { entryLimit: 3 });
      }
    } else {
      if (syncRemotePullPreviewTextEl) syncRemotePullPreviewTextEl.textContent = 'Encara no hi ha canvis previstos per mostrar.';
      if (syncRemotePullPreviewListEl) syncRemotePullPreviewListEl.innerHTML = '';
    }
  }
  if (syncRemotePushPreviewValueEl) {
    if (!docs.length) {
      syncRemotePushPreviewValueEl.textContent = 'Sense local';
    } else if (getSelectedRemoteShadowMode() !== 'provider-head-url' || !remoteShadowConfig?.url) {
      syncRemotePushPreviewValueEl.textContent = 'Configura backend';
    } else if (comparison.status === 'other-workspace') {
      syncRemotePushPreviewValueEl.textContent = 'Bloquejat';
    } else if (pushReadiness.canPush && pushPreview?.compactValue) {
      syncRemotePushPreviewValueEl.textContent = pushPreview.compactValue;
    } else if (pushReadiness.status === 'in-sync') {
      syncRemotePushPreviewValueEl.textContent = 'Sense canvis';
    } else if (pushReadiness.status === 'checking') {
      syncRemotePushPreviewValueEl.textContent = 'Comprovant';
    } else {
      syncRemotePushPreviewValueEl.textContent = 'Sense dades';
    }
  }
  if (syncRemotePushPreviewPanelEl) {
    const canRenderPushPreview = Boolean(pushPreview && pushReadiness.canPush);
    syncRemotePushPreviewPanelEl.classList.toggle('hidden', !canRenderPushPreview);
    if (canRenderPushPreview) {
      if (syncRemotePushPreviewTextEl) {
        syncRemotePushPreviewTextEl.textContent = buildRemoteChangePreviewLeadText('fas push', pushPreview);
      }
      if (syncRemotePushPreviewListEl) {
        syncRemotePushPreviewListEl.innerHTML = buildRemotePullPreviewGroupsHtml(pushPreview, { entryLimit: 3 });
      }
    } else {
      if (syncRemotePushPreviewTextEl) syncRemotePushPreviewTextEl.textContent = 'Encara no hi ha canvis previstos per mostrar.';
      if (syncRemotePushPreviewListEl) syncRemotePushPreviewListEl.innerHTML = '';
    }
  }
  if (syncRemoteHistoryValueEl) {
    if (!remoteHead) {
      syncRemoteHistoryValueEl.textContent = 'pendent';
    } else if (remoteHistoryState?.totalCount) {
      syncRemoteHistoryValueEl.textContent = `${remoteHistoryState.totalCount} rev.`;
    } else {
      syncRemoteHistoryValueEl.textContent = 'Sense dades';
    }
  }
  if (syncRemoteHistoryPanelEl) {
    const canRenderRemoteHistory = Boolean(remoteHistoryState && remoteHistoryState.allCount > 0);
    syncRemoteHistoryPanelEl.classList.toggle('hidden', !canRenderRemoteHistory);
    if (canRenderRemoteHistory) {
      if (syncRemoteHistoryTextEl) {
        syncRemoteHistoryTextEl.textContent = buildRemoteRevisionHistoryLeadText(remoteHistoryState);
      }
      if (syncRemoteHistoryFiltersEl) {
        Array.from(syncRemoteHistoryFiltersEl.querySelectorAll('[data-remote-history-filter]')).forEach(button => {
          const normalizedFilter = normalizeRemoteHistoryFilter(button.dataset.remoteHistoryFilter || '');
          const isActive = normalizedFilter === remoteHistoryState.activeFilter;
          const baseLabel = button.dataset.baseLabel || button.textContent.trim();
          button.dataset.baseLabel = baseLabel;
          const count = Number(remoteHistoryState.filterCounts?.[normalizedFilter] || 0);
          button.textContent = count > 0 ? `${baseLabel} (${count})` : baseLabel;
          button.classList.toggle('active', isActive);
          button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
      }
      if (syncRemoteHistoryListEl) {
        syncRemoteHistoryListEl.innerHTML = remoteHistoryState.entries
          .map(entry => renderRemoteRevisionHistoryEntryHtml(entry, remoteHistoryState.selected?.revisionId || ''))
          .join('');
      }
      if (syncRemoteHistoryDetailEl) {
        syncRemoteHistoryDetailEl.innerHTML = renderRemoteRevisionDetailHtml(remoteHistoryState);
      }
    } else {
      if (syncRemoteHistoryTextEl) syncRemoteHistoryTextEl.textContent = 'Encara no hi ha historial remot per inspeccionar.';
      if (syncRemoteHistoryFiltersEl) {
        Array.from(syncRemoteHistoryFiltersEl.querySelectorAll('[data-remote-history-filter]')).forEach(button => {
          const baseLabel = button.dataset.baseLabel || button.textContent.trim();
          button.dataset.baseLabel = baseLabel;
          button.textContent = baseLabel;
          const isActive = normalizeRemoteHistoryFilter(button.dataset.remoteHistoryFilter || '') === 'all';
          button.classList.toggle('active', isActive);
          button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
      }
      if (syncRemoteHistoryListEl) syncRemoteHistoryListEl.innerHTML = '';
      if (syncRemoteHistoryDetailEl) syncRemoteHistoryDetailEl.innerHTML = '<p class="sync-prep-text">Selecciona una revisió remota per veure\'n el context.</p>';
    }
  }
  if (syncRemoteAutomationTextEl) {
    syncRemoteAutomationTextEl.textContent = buildRemoteAutomationStatusText(comparison, localStability, attachmentPolicy, automationConfig);
  }
  if (remoteAutoCheckOnStartInput && (forceInputs || document.activeElement !== remoteAutoCheckOnStartInput)) {
    remoteAutoCheckOnStartInput.checked = automationConfig.autoCheckOnStart;
  }
  if (remoteAutoPullWhenCleanInput && (forceInputs || document.activeElement !== remoteAutoPullWhenCleanInput)) {
    remoteAutoPullWhenCleanInput.checked = automationConfig.autoPullWhenClean;
  }
  if (remoteAutoPushWhenStableInput && (forceInputs || document.activeElement !== remoteAutoPushWhenStableInput)) {
    remoteAutoPushWhenStableInput.checked = automationConfig.autoPushWhenStable;
  }
  if (syncRemoteConflictPanelEl) {
    const conflictGuidance = buildRemoteConflictGuidance(comparison, localStability, attachmentPolicy);
    const shouldShowConflictPanel = Boolean(
      conflictGuidance.items.length
      || comparison.status === 'diverged'
      || comparison.status === 'other-workspace'
      || remoteShadowConfig?.lastStatus === 'conflict'
    );
    syncRemoteConflictPanelEl.classList.toggle('hidden', !shouldShowConflictPanel);
    if (syncRemoteConflictTextEl) {
      syncRemoteConflictTextEl.textContent = conflictGuidance.text;
    }
    if (syncRemoteConflictListEl) {
      syncRemoteConflictListEl.innerHTML = conflictGuidance.items
        .map(item => `<li>${escapeHtml(item)}</li>`)
        .join('');
    }
  }
  if (syncRemoteImportedValueEl) {
    syncRemoteImportedValueEl.textContent = formatShadowSyncMoment(remoteShadowConfig?.lastFetchedAt || remoteShadowSource?.importedAt || '');
  }
  if (remoteShadowUrlInput && (forceInputs || document.activeElement !== remoteShadowUrlInput)) {
    remoteShadowUrlInput.value = remoteShadowDraftUrl || '';
  }
  if (applyRemoteShadowPullBtn) {
    applyRemoteShadowPullBtn.disabled = !pullReadiness.canApply;
    applyRemoteShadowPullBtn.textContent = comparison.status === 'remote-only' ? 'Importar remot' : 'Aplicar remot';
    applyRemoteShadowPullBtn.title = pullReadiness.canApply ? '' : pullReadiness.message;
  }
  if (guidedRemotePullBtn) {
    guidedRemotePullBtn.disabled = !guidedReadiness.canGuide;
    guidedRemotePullBtn.title = guidedReadiness.canGuide ? '' : guidedReadiness.message;
  }
  if (pushRemoteShadowBtn) {
    pushRemoteShadowBtn.disabled = !pushReadiness.canPush;
    pushRemoteShadowBtn.title = pushReadiness.canPush ? '' : pushReadiness.message;
  }
  updateRemoteProviderConnectorUI();
  updateRemoteShadowConnectButtonState();
  if (clearRemoteShadowBtn) clearRemoteShadowBtn.disabled = !remoteShadowSource && !remoteShadowConfig;
  if (recheckRemoteShadowBtn) recheckRemoteShadowBtn.disabled = !remoteShadowSource && !remoteShadowConfig?.url;
}

async function importRemoteShadowBundleFile(file) {
  if (!file) return false;
  try {
    const parsed = JSON.parse(await file.text());
    if (parsed?.schema !== SHADOW_SYNC_BUNDLE_SCHEMA || !Array.isArray(parsed?.revisions)) {
      throw new Error('Aquest JSON no és un bundle shadow compatible.');
    }
    const normalized = writeRemoteShadowSourceSnapshot({
      ...parsed,
      sourceName: file.name || 'bundle-remot.json',
      importedAt: new Date().toISOString()
    });
    writeRemoteShadowConfigSnapshot(null);
    const comparison = computeRemoteShadowComparison();
    showToast(`Bundle remot importat: ${normalized?.sourceName || file.name}`);
    if (comparison.status === 'remote-ahead') {
      showToast(comparison.detailText || 'He detectat un head remot més nou. Aquest bundle només s’inspecciona manualment: no s’aplicarà sol.', 'info');
    } else if (comparison.status === 'diverged') {
      showToast(comparison.detailText || 'Hi ha divergència entre local i remot. Pots usar "Resoldre divergència" per guardar el local i aplicar el remot amb xarxa de seguretat.', 'info');
    }
    return true;
  } catch (err) {
    console.warn("No s'ha pogut importar el bundle remot de shadow sync.", err);
    showToast(err?.message || "No s'ha pogut importar aquest bundle remot.", 'error');
    return false;
  }
}

function promptRemoteShadowImport() {
  if (!remoteShadowFileInput) {
    showToast('No s\'ha trobat el selector del bundle remot.', 'error');
    return;
  }
  remoteShadowFileInput.value = '';
  remoteShadowFileInput.click();
}

function clearRemoteShadowSource() {
  if (!remoteShadowSource && !remoteShadowConfig) return;
  const label = remoteShadowConfig?.url || remoteShadowSource?.sourceName || 'remot';
  if (remoteAutoSyncTimer) clearTimeout(remoteAutoSyncTimer);
  remoteAutoSyncTimer = null;
  lastRemoteAutoSyncKey = '';
  writeRemoteShadowSourceSnapshot(null);
  writeRemoteShadowConfigSnapshot(null);
  remoteShadowDraftUrl = '';
  updateRemoteShadowUI();
  showToast(`Bundle remot desconnectat: ${label}`, 'info');
}

function updatePwaUI() {
  if (!pwaStatusTextEl || !pwaModeBadgeEl) return;

  const standalone = isStandaloneDisplayMode();
  const swSupported = 'serviceWorker' in navigator;
  const installAvailable = canInstallSutsumu();
  const secureContextLike = window.isSecureContext || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  installAppBtn?.classList.toggle('hidden', !installAvailable || standalone);
  refreshAppBtn?.classList.toggle('hidden', !hasPendingAppUpdate);
  offlineHintEl?.classList.toggle('hidden', !isOfflineMode);
  if (installAppBtn) installAppBtn.disabled = !installAvailable;
  if (prepareOfflineBtn) prepareOfflineBtn.disabled = !swSupported || !secureContextLike;

  if (hasPendingAppUpdate) {
    pwaModeBadgeEl.textContent = 'Actualització';
    pwaStatusTextEl.textContent = 'Hi ha una nova versió de Sutsumu preparada. Prem “Aplicar actualització” per recarregar l’app amb la versió nova.';
    updatePwaDiagnostics();
    return;
  }

  if (standalone) {
    pwaModeBadgeEl.textContent = isOfflineMode ? 'App offline' : 'App';
    pwaStatusTextEl.textContent = isOfflineMode
      ? 'Sutsumu està instal·lat i ara mateix treballa fora de línia amb la memòria cau disponible.'
      : 'Sutsumu està instal·lat com una app. Pots obrir-lo com si fos una aplicació local.';
    updatePwaDiagnostics();
    return;
  }

  if (installAvailable) {
    pwaModeBadgeEl.textContent = isOfflineMode ? 'Instal·lable offline' : 'Instal·lable';
    pwaStatusTextEl.textContent = isOfflineMode
      ? 'Sutsumu ja és instal·lable i té recursos locals en memòria cau. Quan tornis a tenir connexió, podràs instal·lar-lo també com a app.'
      : 'Aquest navegador permet instal·lar Sutsumu com una app i reutilitzar recursos fora de línia.';
    updatePwaDiagnostics();
    return;
  }

  if (!swSupported) {
    pwaModeBadgeEl.textContent = 'Web';
    pwaStatusTextEl.textContent = 'Aquest navegador no suporta service workers; Sutsumu continuarà funcionant com una web local tradicional.';
    updatePwaDiagnostics();
    return;
  }

  pwaModeBadgeEl.textContent = isOfflineMode ? 'Web offline' : 'Web';
  pwaStatusTextEl.textContent = isOfflineMode
    ? 'Sutsumu està funcionant sense connexió amb les dades locals i la memòria cau disponible.'
    : 'Sutsumu ja pot guardar memòria cau local i apropar-se a una app instal·lable en navegadors compatibles.';
  updatePwaDiagnostics();
}

function setPendingAppUpdate(value) {
  hasPendingAppUpdate = Boolean(value);
  if (value) {
    sessionStorage.removeItem(PWA_DISMISSED_UPDATE_KEY);
  }
  updatePwaUI();
}

function watchServiceWorkerRegistration(registration) {
  if (!registration) return;
  pwaRegistration = registration;

  if (registration.waiting && sessionStorage.getItem(PWA_DISMISSED_UPDATE_KEY) !== registration.waiting.scriptURL) {
    setPendingAppUpdate(true);
  }

  registration.addEventListener('updatefound', () => {
    const installingWorker = registration.installing;
    if (!installingWorker) return;
    installingWorker.addEventListener('statechange', () => {
      if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
        if (sessionStorage.getItem(PWA_DISMISSED_UPDATE_KEY) !== installingWorker.scriptURL) {
          setPendingAppUpdate(true);
          showToast('Hi ha una nova versió de Sutsumu preparada per instal·lar.', 'info');
        }
      }
    });
  });
}

async function registerPwaSupport() {
  if (!('serviceWorker' in navigator)) {
    updatePwaUI();
    return;
  }
  const canRegister = window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (!canRegister) {
    updatePwaUI();
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('./service-worker.js');
    watchServiceWorkerRegistration(registration);
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
    updatePwaUI();
  } catch (err) {
    console.warn("No s'ha pogut registrar el service worker de Sutsumu.", err);
    updatePwaUI();
  }
}

async function promptPwaInstall() {
  if (!deferredInstallPrompt) {
    showToast("Aquest navegador encara no ofereix la instal·lació directa de Sutsumu en aquest moment.", 'info');
    return;
  }
  try {
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    if (choice?.outcome === 'accepted') {
      showToast("Sutsumu s'ha enviat al procés d'instal·lació.", 'success');
    }
  } catch (err) {
    console.warn("No s'ha pogut mostrar el diàleg d'instal·lació.", err);
    showToast("No s'ha pogut mostrar el diàleg d'instal·lació.", 'error');
  } finally {
    deferredInstallPrompt = null;
    updatePwaUI();
  }
}

async function applyPendingAppUpdate() {
  if (pwaRegistration?.waiting) {
    sessionStorage.setItem(PWA_DISMISSED_UPDATE_KEY, pwaRegistration.waiting.scriptURL || 'waiting');
    pwaRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
    return;
  }

  if (pwaRegistration) {
    try {
      await pwaRegistration.update();
    } catch (err) {
      console.warn("No s'ha pogut comprovar si hi havia una nova versió de Sutsumu.", err);
    }
  }

  showToast('No hi ha cap actualització pendent ara mateix.', 'info');
  setPendingAppUpdate(false);
}

  async function checkForAppUpdatesNow() {
    if (!pwaRegistration) {
      showToast("La comprovació d'actualitzacions només està disponible amb localhost o HTTPS i service worker actiu.", 'info');
      updatePwaUI();
      return;
    }

    try {
      await pwaRegistration.update();
      const waiting = pwaRegistration.waiting || hasPendingAppUpdate;
      if (waiting) {
        setPendingAppUpdate(true);
        showToast('Hi ha una actualització preparada per aplicar.', 'info');
      } else {
        showToast('Comprovació feta. Sutsumu està al dia.', 'success');
      }
    } catch (err) {
      console.warn("No s'ha pogut comprovar si hi havia noves versions de Sutsumu.", err);
      showToast("No s'ha pogut comprovar si hi havia noves versions de Sutsumu.", 'error');
    }
  }

  async function prepareOfflineBundle() {
    const secureContextLike = window.isSecureContext || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!('caches' in window) || !('serviceWorker' in navigator) || !secureContextLike) {
      showToast('Per preparar Sutsumu offline cal un navegador compatible amb service workers i obrir-lo des de localhost o HTTPS.', 'info');
      return;
    }

    try {
      const cache = await window.caches.open(PWA_WARM_CACHE_NAME);
      for (const asset of PWA_LOCAL_ASSETS) {
        const response = await fetch(asset, { cache: 'reload' });
        if (!response.ok && response.type !== 'opaque') {
          throw new Error(`No s'ha pogut preparar ${asset}`);
        }
        await cache.put(asset, response.clone());
      }
      lastWarmCacheAt = new Date().toISOString();
      window.localStorage.setItem(PWA_WARM_CACHE_KEY, lastWarmCacheAt);
      showToast('Recursos offline preparats i refrescats correctament.', 'success');
    } catch (err) {
      console.warn("No s'han pogut preparar els recursos offline.", err);
      const message = isOfflineMode
        ? 'Ara mateix estàs offline; Sutsumu manté la memòria cau existent, però no ha pogut refrescar recursos nous.'
        : "No s'han pogut preparar els recursos offline.";
      showToast(message, isOfflineMode ? 'info' : 'error');
    } finally {
      updatePwaUI();
    }
  }

  function dismissQuickStartGuide() {
    window.localStorage.setItem(QUICKSTART_DISMISSED_KEY, '1');
    updateQuickStartUI();
    showToast('Guia ràpida amagada. La pots tornar a obrir quan vulguis.', 'info');
  }

  function keepQuickStartGuideVisible() {
    window.localStorage.removeItem(QUICKSTART_DISMISSED_KEY);
    updateQuickStartUI(true);
    showToast('Guia ràpida fixada en aquesta pantalla.', 'success');
  }

  function reopenQuickStartGuide() {
    window.localStorage.removeItem(QUICKSTART_DISMISSED_KEY);
    updateQuickStartUI(true);
  }

  function safeJSONParse(rawValue, fallback) {
    try {
      return JSON.parse(rawValue);
    } catch (_err) {
      return fallback;
    }
  }

  function getMainStore() {
    return mainStore;
  }

  function getBackupStore() {
    return backupStore;
  }

  function canUseIndexedStores() {
    return Boolean(getMainStore() && getBackupStore());
  }

  function isQuotaExceededError(err) {
    if (!err) return false;
    const message = String(err.message || err.name || '').toLowerCase();
    return message.includes('quota') || message.includes('exceeded');
  }


  function supportsWorkspaceFiles() {
    return Boolean(window.isSecureContext && typeof window.showOpenFilePicker === 'function' && typeof window.showSaveFilePicker === 'function');
  }

  function supportsExternalBackupFiles() {
    return Boolean(window.isSecureContext && typeof window.showSaveFilePicker === 'function');
  }

  function canPersistFileHandle(handle) {
    return Boolean(handle && !handle.__sutsumuSkipPersist);
  }

  function hasExternalBackupSession() {
    return Boolean(externalBackupHandle || externalBackupMeta);
  }

  function isExternalBackupConnected() {
    return Boolean(externalBackupHandle);
  }

  function getExternalBackupDisplayName() {
    if (externalBackupHandle?.name) return externalBackupHandle.name;
    if (externalBackupMeta?.name) return externalBackupMeta.name;
    return 'sense còpia externa';
  }

  function getExternalBackupSuggestedFilename() {
    const baseName = getWorkspaceDisplayName() !== 'Sense workspace'
      ? getWorkspaceDisplayName()
      : (docs.find(item => item.type === 'folder' && !item.isDeleted)?.title || 'sutsumu');
    return `${slugifyFileName(baseName)}-backup-automatic.json`;
  }

  function formatBytes(bytes = 0) {
    const value = Number(bytes || 0);
    if (!Number.isFinite(value) || value <= 0) return '0 B';
    if (value < 1024) return `${value} B`;
    if (value < 1024 * 1024) return `${(value / 1024).toFixed(value >= 10 * 1024 ? 0 : 1)} KB`;
    return `${(value / (1024 * 1024)).toFixed(value >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
  }

  function isBinaryAttachmentDocument(item) {
    return Boolean(
      item
      && item.type === 'document'
      && !item.isDeleted
      && (
        isRealBlob(item.fileBlob)
        || item.fileName
        || item.fileType
        || item.binaryFileUnavailable
      )
    );
  }

  function getAttachmentDocuments(currentDocs = docs) {
    return normalizeDocs(currentDocs).filter(isBinaryAttachmentDocument);
  }

  function createSurvivalAttachmentMirrorSignature(currentDocs = docs) {
    return JSON.stringify(getAttachmentDocuments(currentDocs).map(item => ({
      id: item.id,
      fileName: item.fileName || '',
      fileType: item.fileType || '',
      fileSize: Number(item.fileSize || (isRealBlob(item.fileBlob) ? item.fileBlob.size : 0) || 0),
      binaryFileUnavailable: Boolean(item.binaryFileUnavailable),
      hasBlob: isRealBlob(item.fileBlob),
      timestamp: item.timestamp || ''
    })));
  }

  function normalizeSurvivalAttachmentMirrorSnapshot(rawSnapshot) {
    if (!rawSnapshot || typeof rawSnapshot !== 'object') return { createdAt: '', totalBytes: 0, entries: [] };
    const entries = Array.isArray(rawSnapshot.entries)
      ? rawSnapshot.entries
          .filter(entry => entry && typeof entry === 'object' && typeof entry.id === 'string' && entry.id.trim() && typeof entry.dataUrl === 'string' && entry.dataUrl.startsWith('data:'))
          .map(entry => ({
            id: entry.id.trim(),
            fileName: typeof entry.fileName === 'string' ? entry.fileName : '',
            fileType: typeof entry.fileType === 'string' ? entry.fileType : 'application/octet-stream',
            size: Number(entry.size || 0),
            dataUrl: entry.dataUrl,
            savedAt: typeof entry.savedAt === 'string' ? entry.savedAt : ''
          }))
      : [];
    return {
      createdAt: typeof rawSnapshot.createdAt === 'string' ? rawSnapshot.createdAt : '',
      totalBytes: Number(rawSnapshot.totalBytes || entries.reduce((total, entry) => total + Number(entry.size || 0), 0)),
      entries
    };
  }

  function readSurvivalAttachmentMirrorSnapshot() {
    return normalizeSurvivalAttachmentMirrorSnapshot(safeJSONParse(localStorage.getItem(SURVIVAL_ATTACHMENT_MIRROR_KEY), null));
  }

  function writeSurvivalAttachmentMirrorSnapshot(snapshot) {
    let normalized = normalizeSurvivalAttachmentMirrorSnapshot(snapshot);
    while (true) {
      try {
        if (normalized.entries.length === 0) {
          localStorage.removeItem(SURVIVAL_ATTACHMENT_MIRROR_KEY);
        } else {
          localStorage.setItem(SURVIVAL_ATTACHMENT_MIRROR_KEY, JSON.stringify(normalized));
        }
        survivalAttachmentMirrorCache = normalized;
        survivalAttachmentMirrorSignature = createSurvivalAttachmentMirrorSignature(docs);
        return normalized;
      } catch (err) {
        if (!isQuotaExceededError(err) || normalized.entries.length === 0) {
          console.warn("No s'ha pogut actualitzar el mirall local d'adjunts lleugers.", err);
          return survivalAttachmentMirrorCache || normalizeSurvivalAttachmentMirrorSnapshot(null);
        }
        normalized = {
          ...normalized,
          entries: normalized.entries.slice(0, -1),
          totalBytes: normalized.entries.slice(0, -1).reduce((total, entry) => total + Number(entry.size || 0), 0)
        };
      }
    }
  }

  async function buildSurvivalAttachmentMirrorSnapshot(currentDocs = docs) {
    const attachmentDocs = getAttachmentDocuments(currentDocs)
      .filter(item => isRealBlob(item.fileBlob))
      .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));

    let totalBytes = 0;
    const entries = [];

    for (const item of attachmentDocs) {
      const blob = item.fileBlob;
      const fileSize = Number(item.fileSize || blob.size || 0);
      if (!blob || fileSize <= 0 || fileSize > SURVIVAL_ATTACHMENT_ITEM_MAX_BYTES) continue;
      if (totalBytes + fileSize > SURVIVAL_ATTACHMENT_TOTAL_MAX_BYTES) continue;
      const dataUrl = await blobToDataUrl(blob);
      if (!dataUrl) continue;
      entries.push({
        id: item.id,
        fileName: item.fileName || '',
        fileType: item.fileType || blob.type || 'application/octet-stream',
        size: fileSize,
        dataUrl,
        savedAt: new Date().toISOString()
      });
      totalBytes += fileSize;
    }

    return normalizeSurvivalAttachmentMirrorSnapshot({
      createdAt: new Date().toISOString(),
      totalBytes,
      entries
    });
  }

  function hydrateDocsWithSurvivalAttachmentMirror(rawDocs, mirrorSnapshot = survivalAttachmentMirrorCache) {
    const normalizedMirror = normalizeSurvivalAttachmentMirrorSnapshot(mirrorSnapshot);
    if (!normalizedMirror.entries.length) return normalizeDocs(rawDocs || []);

    const mirrorMap = new Map(normalizedMirror.entries.map(entry => [entry.id, entry]));
    const hydratedRawDocs = Array.isArray(rawDocs) ? rawDocs.map(item => ({ ...item })) : [];

    hydratedRawDocs.forEach(item => {
      if (!item || item.type !== 'document') return;
      const mirrorEntry = mirrorMap.get(item.id);
      if (!mirrorEntry || isRealBlob(item.fileBlob)) return;
      const blob = dataUrlToBlob(mirrorEntry.dataUrl, mirrorEntry.fileType || item.fileType || 'application/octet-stream');
      if (!blob) return;
      item.fileBlob = blob;
      item.fileType = item.fileType || mirrorEntry.fileType || '';
      item.fileName = item.fileName || mirrorEntry.fileName || '';
      item.fileSize = Number(item.fileSize || mirrorEntry.size || blob.size || 0);
      item.binaryFileUnavailable = false;
    });

    return normalizeDocs(hydratedRawDocs);
  }

  function getAttachmentProtectionStats(currentDocs = docs, mirrorSnapshot = survivalAttachmentMirrorCache) {
    const attachmentDocs = getAttachmentDocuments(currentDocs);
    const normalizedMirror = normalizeSurvivalAttachmentMirrorSnapshot(mirrorSnapshot);
    const mirrorIds = new Set(normalizedMirror.entries.map(entry => entry.id));

    const total = attachmentDocs.length;
    const available = attachmentDocs.filter(item => isRealBlob(item.fileBlob)).length;
    const missing = attachmentDocs.filter(item => item.binaryFileUnavailable && !isRealBlob(item.fileBlob)).length;
    const protectedBySurvival = attachmentDocs.filter(item => mirrorIds.has(item.id)).length;
    const totalBytes = attachmentDocs.reduce((totalBytesAcc, item) => totalBytesAcc + Number(item.fileSize || (isRealBlob(item.fileBlob) ? item.fileBlob.size : 0) || 0), 0);
    const heavy = attachmentDocs.filter(item => Number(item.fileSize || (isRealBlob(item.fileBlob) ? item.fileBlob.size : 0) || 0) > SURVIVAL_ATTACHMENT_ITEM_MAX_BYTES).length;

    return {
      total,
      available,
      missing,
      protectedBySurvival,
      totalBytes,
      heavy,
      mirroredBytes: normalizedMirror.totalBytes || 0
    };
  }

  function updateAttachmentHealthUI() {
    if (!attachmentHealthTextEl || !attachmentHealthBadgeEl || !exportSafeZipBtn) return;

    const stats = getAttachmentProtectionStats(docs, survivalAttachmentMirrorCache);
    exportSafeZipBtn.disabled = docs.length === 0;

    if (attachmentHealthHintEl) {
      attachmentHealthHintEl.textContent = stats.total > 0
        ? `Hi ha ${stats.total} adjunts binaris (${formatBytes(stats.totalBytes)}). ${stats.protectedBySurvival} es poden reconstruir també des de la supervivència local; la resta depenen d'un backup complet, workspace o backup extern.`
        : "Els adjunts petits poden quedar també reflectits en la còpia local de supervivència. Els adjunts grans continuen requerint un backup complet, un workspace o un backup extern.";
    }

    if (stats.total === 0) {
      attachmentHealthBadgeEl.textContent = '0';
      attachmentHealthTextEl.textContent = "No hi ha adjunts binaris en aquesta col·lecció. Les notes i carpetes ja queden cobertes pel sistema de supervivència local.";
      return;
    }

    if (stats.missing > 0) {
      attachmentHealthBadgeEl.textContent = 'Risc';
      attachmentHealthTextEl.textContent = `Hi ha ${stats.missing} adjunts que ja no tenen el fitxer binari original en aquest dispositiu. Recupera'ls des d'un backup complet, workspace o backup extern on encara existeixin.`;
      return;
    }

    if (stats.protectedBySurvival === stats.total) {
      attachmentHealthBadgeEl.textContent = 'Local+';
      attachmentHealthTextEl.textContent = `Els ${stats.total} adjunts actuals també tenen una còpia de supervivència local. Encara així, mantén un backup complet fora del navegador per seguretat forta.`;
      return;
    }

    attachmentHealthBadgeEl.textContent = stats.heavy > 0 ? 'Mixt' : 'Parcial';
    attachmentHealthTextEl.textContent = `${stats.protectedBySurvival} de ${stats.total} adjunts també es poden recuperar des de la supervivència local. ${stats.total - stats.protectedBySurvival} adjunts${stats.heavy > 0 ? ' pesants' : ''} continuen depenent d'un backup complet, workspace o backup extern.`;
  }

  function maybeWarnAboutMissingAttachmentBinaries() {
    if (hasWarnedAboutMissingAttachmentBinaries) return;
    const stats = getAttachmentProtectionStats(docs, survivalAttachmentMirrorCache);
    if (stats.missing > 0) {
      hasWarnedAboutMissingAttachmentBinaries = true;
      showToast(`Atenció: hi ha ${stats.missing} adjunts sense binari recuperable en aquest dispositiu.`, 'info');
    }
  }

  function queueSurvivalAttachmentMirrorSync() {
    const nextSignature = createSurvivalAttachmentMirrorSignature(docs);
    if (nextSignature === survivalAttachmentMirrorSignature) {
      updateAttachmentHealthUI();
      return;
    }

    if (survivalAttachmentMirrorTimer) clearTimeout(survivalAttachmentMirrorTimer);
    survivalAttachmentMirrorTimer = setTimeout(async () => {
      survivalAttachmentMirrorTimer = null;
      const latestSignature = createSurvivalAttachmentMirrorSignature(docs);
      if (latestSignature === survivalAttachmentMirrorSignature) {
        updateAttachmentHealthUI();
        return;
      }
      const snapshot = await buildSurvivalAttachmentMirrorSnapshot(docs);
      writeSurvivalAttachmentMirrorSnapshot(snapshot);
      updateAttachmentHealthUI();
    }, SURVIVAL_ATTACHMENT_SYNC_DEBOUNCE_MS);
  }

  function isPortableWorkspaceMode() {
    return workspaceMeta?.bindingMode === 'portable';
  }

  function hasWorkspaceSession() {
    return Boolean(workspaceHandle || workspaceMeta);
  }

  function formatWorkspaceSavedAt(value = '') {
    if (!value || Number.isNaN(Date.parse(value))) return 'sense data';
    return new Date(value).toLocaleString('ca-ES');
  }

  function workspaceStore() {
    return getBackupStore() || getMainStore();
  }

  function getPortableModeLabel(mode = '') {
    return mode === 'fs' ? 'Connectat' : 'Compatible';
  }

  function normalizeRecentWorkspaceEntry(rawEntry) {
    if (!rawEntry || typeof rawEntry !== 'object') return null;
    const payload = rawEntry.payload && typeof rawEntry.payload === 'object' ? rawEntry.payload : null;
    const workspaceId = typeof rawEntry.workspaceId === 'string' && rawEntry.workspaceId.trim() ? rawEntry.workspaceId.trim() : (typeof payload?.workspaceId === 'string' ? payload.workspaceId : generateId('workspace'));
    const name = normalizeWorkspaceName(rawEntry.name || payload?.workspaceName || 'Sutsumu Workspace');
    const savedAt = typeof rawEntry.savedAt === 'string' && !Number.isNaN(Date.parse(rawEntry.savedAt)) ? rawEntry.savedAt : (typeof payload?.savedAt === 'string' ? payload.savedAt : new Date().toISOString());
    const mode = rawEntry.mode === 'fs' ? 'fs' : 'portable';
    const stats = rawEntry.stats && typeof rawEntry.stats === 'object'
      ? {
          folders: Number(rawEntry.stats.folders || 0),
          documents: Number(rawEntry.stats.documents || 0),
          attachments: Number(rawEntry.stats.attachments || 0),
          versions: Number(rawEntry.stats.versions || 0)
        }
      : createBackupStats(payload?.snapshot || { docs: [], expandedFolders: [] });

    return {
      id: typeof rawEntry.id === 'string' && rawEntry.id.trim() ? rawEntry.id.trim() : generateId('recent-workspace'),
      workspaceId,
      name,
      savedAt,
      mode,
      signature: typeof rawEntry.signature === 'string' && rawEntry.signature ? rawEntry.signature : `${workspaceId}:${savedAt}`,
      stats,
      payload,
      source: typeof rawEntry.source === 'string' && rawEntry.source.trim() ? rawEntry.source.trim() : 'workspace',
      fileName: typeof rawEntry.fileName === 'string' ? rawEntry.fileName : ''
    };
  }

  function normalizeRecentWorkspaceHistory(rawHistory) {
    if (!Array.isArray(rawHistory)) return [];
    const seen = new Set();
    return rawHistory
      .map(normalizeRecentWorkspaceEntry)
      .filter(entry => {
        if (!entry) return false;
        const key = `${entry.workspaceId}:${entry.signature}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
      .slice(0, RECENT_WORKSPACES_LIMIT);
  }

  async function readRecentWorkspaceHistory() {
    const store = workspaceStore();
    if (store) {
      try {
        return normalizeRecentWorkspaceHistory(await store.getItem(RECENT_WORKSPACES_KEY));
      } catch (err) {
        console.warn('No s\'ha pogut llegir l\'historial de workspaces recents.', err);
      }
    }
    return normalizeRecentWorkspaceHistory(safeJSONParse(localStorage.getItem(RECENT_WORKSPACES_KEY), []));
  }

  async function writeRecentWorkspaceHistory(history) {
    const normalized = normalizeRecentWorkspaceHistory(history);
    const store = workspaceStore();
    if (store) {
      try {
        await store.setItem(RECENT_WORKSPACES_KEY, normalized);
        if (localStorage.getItem(RECENT_WORKSPACES_KEY)) localStorage.removeItem(RECENT_WORKSPACES_KEY);
        recentWorkspaces = normalized;
        renderRecentWorkspaces();
        return normalized;
      } catch (err) {
        console.warn('No s\'ha pogut desar l\'historial de workspaces recents a IndexedDB.', err);
      }
    }
    try {
      localStorage.setItem(RECENT_WORKSPACES_KEY, JSON.stringify(normalized));
    } catch (err) {
      console.warn('No s\'ha pogut desar l\'historial de workspaces recents a localStorage.', err);
    }
    recentWorkspaces = normalized;
    renderRecentWorkspaces();
    return normalized;
  }

  function renderRecentWorkspaces() {
    if (!workspaceRecentListEl || !workspaceRecentEmptyEl || !workspaceRecentCountEl) return;
    workspaceRecentCountEl.textContent = String(recentWorkspaces.length);
    workspaceRecentListEl.innerHTML = '';
    workspaceRecentEmptyEl.classList.toggle('hidden', recentWorkspaces.length > 0);

    recentWorkspaces.forEach(entry => {
      const li = document.createElement('li');
      li.className = 'workspace-recent-item';

      const main = document.createElement('div');
      main.className = 'workspace-recent-main';

      const titleRow = document.createElement('div');
      titleRow.className = 'item-title-row';
      titleRow.className = 'workspace-recent-title-row';

      const title = document.createElement('div');
      title.className = 'workspace-recent-title';
      title.textContent = entry.name;
      titleRow.appendChild(title);

      const modeBadge = document.createElement('span');
      modeBadge.className = 'workspace-recent-badge';
      modeBadge.textContent = getPortableModeLabel(entry.mode);
      titleRow.appendChild(modeBadge);

      if (workspaceMeta?.id && workspaceMeta.id === entry.workspaceId) {
        const activeBadge = document.createElement('span');
        activeBadge.className = 'workspace-recent-badge';
        activeBadge.textContent = 'Actiu';
        titleRow.appendChild(activeBadge);
      }

      const meta = document.createElement('div');
      meta.className = 'workspace-recent-meta';
      meta.textContent = `Darrer desat: ${formatWorkspaceSavedAt(entry.savedAt)}${entry.fileName ? ` · ${entry.fileName}` : ''}`;

      const stats = document.createElement('div');
      stats.className = 'workspace-recent-stats';
      stats.textContent = `${entry.stats.folders} carpetes · ${entry.stats.documents} documents · ${entry.stats.attachments} adjunts · ${entry.stats.versions} versions`;

      main.appendChild(titleRow);
      main.appendChild(meta);
      main.appendChild(stats);

      const actions = document.createElement('div');
      actions.className = 'workspace-recent-actions';

      const openBtn = document.createElement('button');
      openBtn.type = 'button';
      openBtn.className = 'btn btn-secondary btn-small';
      openBtn.textContent = 'Obrir';
      openBtn.dataset.action = 'open-recent-workspace';
      openBtn.dataset.workspaceId = entry.id;
      openBtn.disabled = !entry.payload;

      const downloadBtn = document.createElement('button');
      downloadBtn.type = 'button';
      downloadBtn.className = 'btn btn-secondary btn-small';
      downloadBtn.textContent = 'Descarrega';
      downloadBtn.dataset.action = 'download-recent-workspace';
      downloadBtn.dataset.workspaceId = entry.id;
      downloadBtn.disabled = !entry.payload;

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'btn btn-danger-ghost btn-small';
      removeBtn.textContent = 'Treu';
      removeBtn.dataset.action = 'remove-recent-workspace';
      removeBtn.dataset.workspaceId = entry.id;

      actions.appendChild(openBtn);
      actions.appendChild(downloadBtn);
      actions.appendChild(removeBtn);

      li.appendChild(main);
      li.appendChild(actions);
      workspaceRecentListEl.appendChild(li);
    });
  }

  async function rememberRecentWorkspace(payload, options = {}) {
    if (!payload || typeof payload !== 'object') return;
    const entry = normalizeRecentWorkspaceEntry({
      id: options.entryId || generateId('recent-workspace'),
      workspaceId: payload.workspaceId,
      name: payload.workspaceName,
      savedAt: payload.savedAt,
      mode: options.mode || payload.workspaceBindingMode || 'portable',
      signature: `${payload.workspaceId || 'workspace'}:${payload.savedAt || new Date().toISOString()}`,
      stats: payload.stats || createBackupStats(payload.snapshot || { docs: [], expandedFolders: [] }),
      payload,
      source: options.source || 'workspace',
      fileName: options.fileName || ''
    });
    if (!entry) return;

    const merged = [entry, ...recentWorkspaces.filter(item => `${item.workspaceId}:${item.signature}` !== `${entry.workspaceId}:${entry.signature}` && item.workspaceId !== entry.workspaceId)]
      .slice(0, RECENT_WORKSPACES_LIMIT);
    await writeRecentWorkspaceHistory(merged);
  }


  function normalizeRecentDocsHistory(rawHistory) {
    if (!Array.isArray(rawHistory)) return [];
    return rawHistory
      .filter(entry => entry && typeof entry === 'object')
      .map(entry => ({
        id: typeof entry.id === 'string' && entry.id.trim() ? entry.id.trim() : generateId('recent-doc'),
        docId: typeof entry.docId === 'string' && entry.docId.trim() ? entry.docId.trim() : '',
        title: typeof entry.title === 'string' && entry.title.trim() ? entry.title.trim() : 'Sense títol',
        type: entry.type === 'folder' ? 'folder' : 'document',
        updatedAt: typeof entry.updatedAt === 'string' && !Number.isNaN(Date.parse(entry.updatedAt)) ? entry.updatedAt : new Date().toISOString(),
        parentId: typeof entry.parentId === 'string' && entry.parentId.trim() ? entry.parentId.trim() : 'root',
        category: typeof entry.category === 'string' ? entry.category : '',
        hasDraft: Boolean(entry.hasDraft)
      }))
      .filter(entry => entry.docId)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, RECENT_DOCS_LIMIT);
  }

  function readRecentDocsHistory() {
    return normalizeRecentDocsHistory(safeJSONParse(localStorage.getItem(RECENT_DOCS_KEY), []));
  }

  function writeRecentDocsHistory(history) {
    const normalized = normalizeRecentDocsHistory(history);
    recentDocs = normalized;
    try {
      localStorage.setItem(RECENT_DOCS_KEY, JSON.stringify(normalized));
    } catch (err) {
      console.warn("No s'ha pogut desar l'historial recent de documents.", err);
    }
    renderRecentDocsHistory();
  }

  function getRecentDocPathLabel(item) {
    if (!item || item.parentId === 'root') return 'Arrel';
    const path = getFolderCurrentPath(item.parentId).map(folder => folder.title).filter(Boolean);
    return path.length ? path.join(' / ') : 'Arrel';
  }

  function renderRecentDocsHistory() {
    if (!recentDocsListEl || !recentDocsEmptyEl || !recentDocsCountEl) return;

    const normalized = normalizeRecentDocsHistory(recentDocs).filter(entry => docs.some(doc => doc.id === entry.docId && !doc.isDeleted));
    if (normalized.length !== recentDocs.length) {
      recentDocs = normalized;
      try {
        localStorage.setItem(RECENT_DOCS_KEY, JSON.stringify(normalized));
      } catch (err) {
        console.warn("No s'ha pogut actualitzar l'historial recent netejat.", err);
      }
    }

    recentDocsCountEl.textContent = String(normalized.length);
    recentDocsListEl.innerHTML = '';
    recentDocsEmptyEl.classList.toggle('hidden', normalized.length > 0);

    normalized.forEach(entry => {
      const liveItem = docs.find(doc => doc.id === entry.docId && !doc.isDeleted) || entry;
      const li = document.createElement('li');
      li.className = 'workspace-recent-item';

      const main = document.createElement('div');
      main.className = 'workspace-recent-main';

      const titleRow = document.createElement('div');
      titleRow.className = 'item-title-row';
      titleRow.className = 'workspace-recent-title-row';

      const title = document.createElement('strong');
      title.className = 'workspace-recent-title';
      title.textContent = liveItem.title || 'Sense títol';
      titleRow.appendChild(title);

      const typeBadge = document.createElement('span');
      typeBadge.className = `workspace-recent-badge recent-doc-badge ${liveItem.type === 'folder' ? 'folder' : 'document'}`;
      typeBadge.textContent = liveItem.type === 'folder' ? 'Carpeta' : 'Document';
      titleRow.appendChild(typeBadge);

      main.appendChild(titleRow);

      const meta = document.createElement('span');
      meta.className = 'recent-doc-meta';
      const updatedLabel = new Date(entry.updatedAt).toLocaleString('ca-ES');
      const extra = liveItem.type === 'document' && liveItem.category ? ` · ${liveItem.category}` : '';
      const hasDraft = Boolean(localStorage.getItem(getEditDraftKey(entry.docId)));
      meta.textContent = `${updatedLabel}${extra}${hasDraft ? ' · esborrany' : ''}`;
      main.appendChild(meta);

      const path = document.createElement('span');
      path.className = 'recent-doc-path';
      path.textContent = getRecentDocPathLabel(liveItem);
      main.appendChild(path);

      li.appendChild(main);

      const actions = document.createElement('div');
      actions.className = 'recent-doc-actions';

      const openBtn = document.createElement('button');
      openBtn.type = 'button';
      openBtn.className = 'btn btn-secondary btn-small';
      openBtn.dataset.action = 'open-recent-doc';
      openBtn.dataset.docId = entry.docId;
      openBtn.textContent = 'Obrir';
      actions.appendChild(openBtn);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'btn btn-danger-ghost btn-small';
      removeBtn.dataset.action = 'remove-recent-doc';
      removeBtn.dataset.docId = entry.docId;
      removeBtn.textContent = 'Treure';
      actions.appendChild(removeBtn);

      li.appendChild(actions);
      recentDocsListEl.appendChild(li);
    });
  }

  function getQuickAccessItems() {
    return docs
      .filter(item => !item.isDeleted && (item.isPinned || item.isFavorite))
      .sort((a, b) => {
        if (Boolean(a.isPinned) !== Boolean(b.isPinned)) return a.isPinned ? -1 : 1;
        if (Boolean(a.isFavorite) !== Boolean(b.isFavorite)) return a.isFavorite ? -1 : 1;
        if (a.type === 'folder' && b.type !== 'folder') return -1;
        if (a.type !== 'folder' && b.type === 'folder') return 1;
        return (a.title || '').localeCompare(b.title || '', 'ca');
      });
  }

  function getQuickAccessPathLabel(item) {
    if (!item || item.parentId === 'root') return 'Arrel';
    const path = getFolderCurrentPath(item.parentId).map(folder => folder.title).filter(Boolean);
    return path.length ? path.join(' / ') : 'Arrel';
  }

  function renderQuickAccess() {
    if (!quickAccessListEl || !quickAccessEmptyEl || !quickAccessCountEl) return;
    const items = getQuickAccessItems();
    quickAccessCountEl.textContent = String(items.length);
    quickAccessListEl.innerHTML = '';
    quickAccessEmptyEl.classList.toggle('hidden', items.length > 0);

    items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'workspace-recent-item';

      const main = document.createElement('div');
      main.className = 'workspace-recent-main';

      const titleRow = document.createElement('div');
      titleRow.className = 'workspace-recent-title-row';

      const title = document.createElement('strong');
      title.className = 'workspace-recent-title';
      title.textContent = item.title || 'Sense títol';
      titleRow.appendChild(title);

      const typeBadge = document.createElement('span');
      typeBadge.className = `workspace-recent-badge quick-access-badge ${item.type === 'folder' ? 'folder' : 'document'}`;
      typeBadge.textContent = item.type === 'folder' ? 'Carpeta' : 'Document';
      titleRow.appendChild(typeBadge);

      if (item.isPinned) {
        const badge = document.createElement('span');
        badge.className = 'workspace-recent-badge quick-access-badge';
        badge.textContent = 'fixat';
        titleRow.appendChild(badge);
      }
      if (item.isFavorite) {
        const badge = document.createElement('span');
        badge.className = 'workspace-recent-badge quick-access-badge favorite';
        badge.textContent = 'favorit';
        titleRow.appendChild(badge);
      }
      main.appendChild(titleRow);

      const meta = document.createElement('span');
      meta.className = 'recent-doc-meta';
      const extra = item.type === 'document' && item.category ? ` · ${item.category}` : '';
      meta.textContent = `${getQuickAccessPathLabel(item)}${extra}`;
      main.appendChild(meta);

      const path = document.createElement('span');
      path.className = 'recent-doc-path';
      path.textContent = `Creat el ${new Date(item.timestamp).toLocaleString('ca-ES')}`;
      main.appendChild(path);

      li.appendChild(main);

      const actions = document.createElement('div');
      actions.className = 'quick-access-actions-row';

      const openBtn = document.createElement('button');
      openBtn.type = 'button';
      openBtn.className = 'btn btn-secondary btn-small';
      openBtn.dataset.action = 'quick-open';
      openBtn.dataset.docId = item.id;
      openBtn.textContent = 'Obrir';
      actions.appendChild(openBtn);

      const pinBtn = document.createElement('button');
      pinBtn.type = 'button';
      pinBtn.className = 'btn btn-secondary btn-small';
      pinBtn.dataset.action = 'quick-pin';
      pinBtn.dataset.docId = item.id;
      pinBtn.textContent = item.isPinned ? 'Desfixa' : 'Fixa';
      actions.appendChild(pinBtn);

      const favBtn = document.createElement('button');
      favBtn.type = 'button';
      favBtn.className = 'btn btn-secondary btn-small';
      favBtn.dataset.action = 'quick-favorite';
      favBtn.dataset.docId = item.id;
      favBtn.textContent = item.isFavorite ? 'Treu favorit' : 'Favorit';
      actions.appendChild(favBtn);

      li.appendChild(actions);
      quickAccessListEl.appendChild(li);
    });
  }

  function normalizeTagKey(value = '') {
    return String(value || '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/^#+/, '')
      .toLowerCase()
      .trim();
  }

  function normalizeTags(rawTags) {
    const values = Array.isArray(rawTags)
      ? rawTags
      : (typeof rawTags === 'string' ? rawTags.split(/[,;\n]+/) : []);

    const normalized = [];
    const seen = new Set();

    values.forEach(value => {
      const cleanValue = String(value || '').replace(/^#+/, '').replace(/\s+/g, ' ').trim();
      const key = normalizeTagKey(cleanValue);
      if (!key || seen.has(key)) return;
      seen.add(key);
      normalized.push(cleanValue);
    });

    return normalized;
  }

  function parseTagsInput(value = '') {
    return normalizeTags(typeof value === 'string' ? value : String(value || ''));
  }

  function formatTagsInput(tags = []) {
    return normalizeTags(tags).join(', ');
  }

  function getItemTags(item) {
    return normalizeTags(item?.tags);
  }

  function getTypeFilterLabel(type = activeTypeFilter) {
    const labels = {
      all: 'Tot',
      document: 'Documents',
      folder: 'Carpetes',
      favorite: 'Favorits',
      pinned: 'Fixats'
    };
    return labels[type] || labels.all;
  }

  function itemMatchesTypeFilter(item, type = activeTypeFilter) {
    if (!item || item.isDeleted) return false;

    switch (type) {
      case 'document':
        return item.type === 'document';
      case 'folder':
        return item.type === 'folder';
      case 'favorite':
        return Boolean(item.isFavorite);
      case 'pinned':
        return Boolean(item.isPinned);
      case 'all':
      default:
        return true;
    }
  }

  function itemMatchesTagFilter(item, tag = activeTagFilter) {
    const tagKey = normalizeTagKey(tag);
    if (!tagKey) return true;
    return getItemTags(item).some(itemTag => normalizeTagKey(itemTag) === tagKey);
  }

  function itemMatchesQuery(item, query = '') {
    const normalizedQuery = normalizePaletteSearch(query);
    if (!normalizedQuery) return true;

    const haystack = [
      item.title || '',
      item.desc || '',
      item.category || '',
      item.fileName || '',
      getQuickAccessPathLabel(item),
      ...getItemTags(item)
    ];

    if (item.type === 'document') {
      haystack.push(getPlainTextFromHtml(item.content || ''));
    }

    return normalizePaletteSearch(haystack.join(' ')).includes(normalizedQuery);
  }

  function getItemsForCurrentFlatView(query = searchInput?.value || '') {
    const safeQuery = typeof query === 'string' ? query.trim() : '';
    const hasFilters = activeTypeFilter !== 'all' || Boolean(activeTagFilter);
    const hasQuery = Boolean(safeQuery);
    const shouldUseFlatView = hasFilters || hasQuery;

    isSearchActive = shouldUseFlatView;
    if (!shouldUseFlatView) return null;

    return docs
      .filter(item => !item.isDeleted)
      .filter(item => itemMatchesTypeFilter(item, activeTypeFilter))
      .filter(item => itemMatchesTagFilter(item, activeTagFilter))
      .filter(item => itemMatchesQuery(item, safeQuery))
      .sort((a, b) => {
        if (Boolean(a.isPinned) !== Boolean(b.isPinned)) return a.isPinned ? -1 : 1;
        if (Boolean(a.isFavorite) !== Boolean(b.isFavorite)) return a.isFavorite ? -1 : 1;
        if (a.type === 'folder' && b.type !== 'folder') return -1;
        if (a.type !== 'folder' && b.type === 'folder') return 1;
        return (a.title || '').localeCompare((b.title || ''), 'ca');
      });
  }

  function refreshDataView(query = searchInput?.value || '') {
    const safeQuery = typeof query === 'string' ? query.trim() : '';
    if (searchInput && searchInput.value !== safeQuery) {
      searchInput.value = safeQuery;
    }
    renderData();
  }

  function updateListFilterBar() {
    if (!listFilterBar) return;

    const hasTypeFilter = activeTypeFilter !== 'all';
    const hasTagFilter = Boolean(activeTagFilter);
    const hasFilters = hasTypeFilter || hasTagFilter;

    listFilterBar.innerHTML = '';
    listFilterBar.classList.toggle('hidden', !hasFilters);

    tagFilterQuickButtons.forEach(button => {
      const buttonType = button.dataset.typeFilter || 'all';
      button.classList.toggle('active', buttonType === activeTypeFilter);
    });

    if (!hasFilters) return;

    const summary = document.createElement('div');
    summary.className = 'list-filter-summary';

    const title = document.createElement('strong');
    title.textContent = 'Filtres actius';
    summary.appendChild(title);

    const pills = document.createElement('div');
    pills.className = 'list-filter-pills';

    if (hasTypeFilter) {
      const typePill = document.createElement('span');
      typePill.className = 'filter-pill';
      typePill.textContent = `Tipus: ${getTypeFilterLabel(activeTypeFilter)}`;
      pills.appendChild(typePill);
    }

    if (hasTagFilter) {
      const tagPill = document.createElement('span');
      tagPill.className = 'filter-pill tag';
      tagPill.textContent = `Etiqueta: #${activeTagFilter}`;
      pills.appendChild(tagPill);
    }

    summary.appendChild(pills);
    listFilterBar.appendChild(summary);

    const actions = document.createElement('div');
    actions.className = 'list-filter-actions';

    if (hasTypeFilter) {
      const clearTypeBtn = document.createElement('button');
      clearTypeBtn.type = 'button';
      clearTypeBtn.className = 'btn btn-secondary btn-small';
      clearTypeBtn.dataset.clearFilter = 'type';
      clearTypeBtn.textContent = 'Treure tipus';
      actions.appendChild(clearTypeBtn);
    }

    if (hasTagFilter) {
      const clearTagBtn = document.createElement('button');
      clearTagBtn.type = 'button';
      clearTagBtn.className = 'btn btn-secondary btn-small';
      clearTagBtn.dataset.clearFilter = 'tag';
      clearTagBtn.textContent = 'Treure etiqueta';
      actions.appendChild(clearTagBtn);
    }

    const clearAllBtn = document.createElement('button');
    clearAllBtn.type = 'button';
    clearAllBtn.className = 'btn btn-secondary btn-small';
    clearAllBtn.dataset.clearFilter = 'all';
    clearAllBtn.textContent = 'Netejar filtres';
    actions.appendChild(clearAllBtn);

    listFilterBar.appendChild(actions);
  }

  function renderTagFilterCard() {
    if (!tagFilterListEl || !tagFilterEmptyEl || !tagFilterCountEl) return;

    const sourceItems = docs
      .filter(item => !item.isDeleted)
      .filter(item => itemMatchesTypeFilter(item, activeTypeFilter));

    const tagMap = new Map();
    sourceItems.forEach(item => {
      getItemTags(item).forEach(tag => {
        const id = normalizeTagKey(tag);
        if (!id) return;
        const existing = tagMap.get(id) || { id, label: tag, count: 0 };
        existing.count += 1;
        if (!existing.label || tag.length < existing.label.length) {
          existing.label = tag;
        }
        tagMap.set(id, existing);
      });
    });

    const activeTagId = normalizeTagKey(activeTagFilter);
    if (activeTagId && !tagMap.has(activeTagId)) {
      tagMap.set(activeTagId, {
        id: activeTagId,
        label: activeTagFilter,
        count: 0
      });
    }

    const tags = Array.from(tagMap.values()).sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.label.localeCompare(b.label, 'ca');
    });

    tagFilterCountEl.textContent = String(tags.length);
    tagFilterListEl.innerHTML = '';
    tagFilterEmptyEl.classList.toggle('hidden', tags.length > 0);

    tags.forEach(tagEntry => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `tag-filter-chip ${activeTagId === tagEntry.id ? 'active' : ''}`.trim();
      button.dataset.tagId = tagEntry.id;

      const label = document.createElement('span');
      label.textContent = `#${tagEntry.label.toLowerCase()}`;

      const count = document.createElement('strong');
      count.textContent = String(tagEntry.count);

      button.appendChild(label);
      button.appendChild(count);
      tagFilterListEl.appendChild(button);
    });

    tagFilterQuickButtons.forEach(button => {
      const buttonType = button.dataset.typeFilter || 'all';
      button.classList.toggle('active', buttonType === activeTypeFilter);
    });
  }

  async function toggleFavorite(itemId) {
    const item = docs.find(doc => doc.id === itemId && !doc.isDeleted);
    if (!item) return;
    item.isFavorite = !item.isFavorite;
    await saveData('toggle-favorite');
    if (isSearchActive) {
      applySearch(searchInput.value.trim());
    } else {
      renderData();
    }
    showToast(item.isFavorite ? `"${item.title}" ara és un favorit.` : `"${item.title}" ja no és un favorit.`, 'success');
  }

  async function togglePinned(itemId) {
    const item = docs.find(doc => doc.id === itemId && !doc.isDeleted);
    if (!item) return;
    item.isPinned = !item.isPinned;
    await saveData('toggle-pin');
    if (isSearchActive) {
      applySearch(searchInput.value.trim());
    } else {
      renderData();
    }
    showToast(item.isPinned ? `"${item.title}" s'ha fixat a l'accés ràpid.` : `"${item.title}" s'ha desfixat.`, 'success');
  }

  function isCommandPaletteOpen() {
    return Boolean(commandPaletteModal && !commandPaletteModal.classList.contains('hidden'));
  }

  function normalizePaletteSearch(value) {
    return (value || '')
      .toString()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .trim();
  }

  function createCommandPaletteEntry({ key, dedupeKey = key, title, meta = '', badges = [], shortcut = '', run }) {
    return { key, dedupeKey, title, meta, badges, shortcut, run };
  }

  function getCommandPaletteStaticEntries() {
    const entries = [];
    const docTab = document.querySelector('[data-target="tab-document"]');
    const folderTab = document.querySelector('[data-target="tab-folder"]');
    entries.push(createCommandPaletteEntry({
      key: 'action:new-document',
      title: 'Nou document',
      meta: 'Obre la pestanya de creació de documents i enfoca el nom.',
      badges: [{ label: 'acció' }],
      shortcut: '⌘/Ctrl+N',
      run: () => {
        closeCommandPalette();
        closeModals();
        if (docTab) docTab.click();
        docNameInput.focus();
      }
    }));
    entries.push(createCommandPaletteEntry({
      key: 'action:new-folder',
      title: 'Nova carpeta',
      meta: 'Obre la pestanya de carpetes.',
      badges: [{ label: 'acció' }],
      run: () => {
        closeCommandPalette();
        closeModals();
        if (folderTab) folderTab.click();
        folderNameInput.focus();
      }
    }));
    entries.push(createCommandPaletteEntry({
      key: 'action:global-search',
      title: 'Cerca global',
      meta: 'Enfoca el cercador principal de Sutsumu.',
      badges: [{ label: 'acció' }],
      shortcut: '⌘/Ctrl+F',
      run: () => {
        closeCommandPalette();
        searchInput.focus();
      }
    }));
    entries.push(createCommandPaletteEntry({
      key: 'action:backup-now',
      title: 'Forçar backup intern',
      meta: 'Crea una còpia de seguretat interna ara mateix.',
      badges: [{ label: 'backup' }],
      run: () => {
        closeCommandPalette();
        backupNowBtn?.click();
      }
    }));
    entries.push(createCommandPaletteEntry({
      key: 'action:save-workspace',
      title: 'Desar workspace',
      meta: 'Desa el workspace actual o exporta la còpia compatible.',
      badges: [{ label: 'workspace' }],
      run: () => {
        closeCommandPalette();
        saveWorkspaceBtn?.click();
      }
    }));
    entries.push(createCommandPaletteEntry({
      key: 'action:open-workspace',
      title: 'Obrir workspace',
      meta: 'Obre un workspace extern o compatible.',
      badges: [{ label: 'workspace' }],
      run: () => {
        closeCommandPalette();
        openWorkspaceBtn?.click();
      }
    }));
    entries.push(createCommandPaletteEntry({
      key: 'action:prepare-offline',
      title: 'Preparar offline',
      meta: 'Refresca els recursos principals per usar Sutsumu fora de línia.',
      badges: [{ label: 'PWA' }],
      run: () => {
        closeCommandPalette();
        prepareOfflineBtn?.click();
      }
    }));
    entries.push(createCommandPaletteEntry({
      key: 'action:filter-favorites',
      title: 'Filtrar favorits',
      meta: 'Mostra només els documents i carpetes marcats com a favorit.',
      badges: [{ label: 'filtre' }, { label: 'favorit', className: 'favorite' }],
      run: () => {
        closeCommandPalette();
        activeTypeFilter = 'favorite';
        refreshDataView();
      }
    }));
    entries.push(createCommandPaletteEntry({
      key: 'action:clear-filters',
      title: 'Netejar filtres',
      meta: 'Torna a la vista general sense filtres actius.',
      badges: [{ label: 'filtre' }],
      run: () => {
        closeCommandPalette();
        activeTypeFilter = 'all';
        activeTagFilter = '';
        if (searchInput) searchInput.value = '';
        refreshDataView();
      }
    }));
    return entries;
  }

  function getCommandPaletteDocumentEntries() {
    const activeDocs = docs.filter(item => !item.isDeleted);
    return activeDocs.map(item => {
      const badges = [{ label: item.type === 'folder' ? 'carpeta' : 'document', className: item.type === 'folder' ? 'folder' : '' }];
      if (item.isPinned) badges.push({ label: 'fixat', className: 'pinned' });
      if (item.isFavorite) badges.push({ label: 'favorit', className: 'favorite' });
      if (item.type === 'document' && item.category) badges.push({ label: item.category.toLowerCase() });
      getItemTags(item).slice(0, 4).forEach(tag => badges.push({ label: `#${tag.toLowerCase()}`, className: 'tag' }));
      return createCommandPaletteEntry({
        key: `item:${item.id}`,
        dedupeKey: `doc:${item.id}`,
        title: item.title || 'Sense títol',
        meta: `${getQuickAccessPathLabel(item)} · ${new Date(item.timestamp).toLocaleDateString('ca-ES')}`,
        badges,
        run: () => {
          closeCommandPalette();
          openEditDialog(item.id);
        }
      });
    });
  }

  function getCommandPaletteEntries(query = '') {
    const normalizedQuery = normalizePaletteSearch(query);
    const staticEntries = getCommandPaletteStaticEntries();
    const quickEntries = getQuickAccessItems().map(item => createCommandPaletteEntry({
      key: `quick:${item.id}`,
      dedupeKey: `doc:${item.id}`,
      title: item.title || 'Sense títol',
      meta: `${getQuickAccessPathLabel(item)} · accés ràpid`,
      badges: [
        { label: item.type === 'folder' ? 'carpeta' : 'document', className: item.type === 'folder' ? 'folder' : '' },
        ...(item.isPinned ? [{ label: 'fixat', className: 'pinned' }] : []),
        ...(item.isFavorite ? [{ label: 'favorit', className: 'favorite' }] : []),
        ...getItemTags(item).slice(0, 3).map(tag => ({ label: `#${tag.toLowerCase()}`, className: 'tag' }))
      ],
      run: () => {
        closeCommandPalette();
        openEditDialog(item.id);
      }
    }));
    const recentEntries = normalizeRecentDocsHistory(recentDocs)
      .map(entry => docs.find(doc => doc.id === entry.docId && !doc.isDeleted))
      .filter(Boolean)
      .slice(0, 6)
      .map(item => createCommandPaletteEntry({
        key: `recent:${item.id}`,
        dedupeKey: `doc:${item.id}`,
        title: item.title || 'Sense títol',
        meta: `${getQuickAccessPathLabel(item)} · recent`,
        badges: [{ label: 'recent' }, { label: item.type === 'folder' ? 'carpeta' : 'document', className: item.type === 'folder' ? 'folder' : '' }, ...getItemTags(item).slice(0, 2).map(tag => ({ label: `#${tag.toLowerCase()}`, className: 'tag' }))],
        run: () => {
          closeCommandPalette();
          openEditDialog(item.id);
        }
      }));
    const docEntries = getCommandPaletteDocumentEntries();
    const merged = [];
    const seen = new Set();
    [...staticEntries, ...quickEntries, ...recentEntries, ...docEntries].forEach(entry => {
      const dedupeKey = entry?.dedupeKey || entry?.key;
      if (!entry || seen.has(dedupeKey)) return;
      seen.add(dedupeKey);
      merged.push(entry);
    });
    if (!normalizedQuery) return merged.slice(0, 18);
    return merged.filter(entry => normalizePaletteSearch(`${entry.title} ${entry.meta} ${(entry.badges || []).map(b => b.label).join(' ')}`).includes(normalizedQuery)).slice(0, 24);
  }

  function setCommandPaletteActiveIndex(index = 0) {
    if (!commandPaletteResults.length) {
      commandPaletteActiveIndex = 0;
      return;
    }
    commandPaletteActiveIndex = Math.max(0, Math.min(index, commandPaletteResults.length - 1));
    Array.from(commandPaletteListEl.querySelectorAll('.command-palette-item')).forEach((itemEl, itemIndex) => {
      itemEl.classList.toggle('active', itemIndex === commandPaletteActiveIndex);
      if (itemIndex === commandPaletteActiveIndex) {
        itemEl.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function renderCommandPalette(query = '') {
    if (!commandPaletteListEl || !commandPaletteEmptyEl) return;
    commandPaletteResults = getCommandPaletteEntries(query);
    commandPaletteListEl.innerHTML = '';
    commandPaletteEmptyEl.classList.toggle('hidden', commandPaletteResults.length > 0);
    if (commandPaletteHintEl) {
      commandPaletteHintEl.textContent = commandPaletteResults.length
        ? `${commandPaletteResults.length} resultat${commandPaletteResults.length === 1 ? '' : 's'} disponibles.`
        : 'No hi ha cap acció o document que coincideixi amb aquest text.';
    }

    commandPaletteResults.forEach((entry, index) => {
      const li = document.createElement('li');
      li.className = 'command-palette-item';
      li.dataset.index = String(index);

      const main = document.createElement('div');
      main.className = 'command-palette-main';

      const titleRow = document.createElement('div');
      titleRow.className = 'command-palette-title-row';
      const title = document.createElement('strong');
      title.className = 'command-palette-title';
      title.textContent = entry.title;
      titleRow.appendChild(title);
      (entry.badges || []).forEach(badge => {
        const badgeEl = document.createElement('span');
        badgeEl.className = `command-palette-badge ${badge.className || ''}`.trim();
        badgeEl.textContent = badge.label;
        titleRow.appendChild(badgeEl);
      });
      main.appendChild(titleRow);

      if (entry.meta) {
        const meta = document.createElement('div');
        meta.className = 'command-palette-meta';
        meta.textContent = entry.meta;
        main.appendChild(meta);
      }
      li.appendChild(main);

      const shortcut = document.createElement('span');
      shortcut.className = 'command-palette-kbd';
      shortcut.textContent = entry.shortcut || 'Enter';
      li.appendChild(shortcut);

      commandPaletteListEl.appendChild(li);
    });

    setCommandPaletteActiveIndex(0);
  }

  function openCommandPalette(initialQuery = '') {
    if (!confirmModal.classList.contains('hidden') || isEditModalOpen() || !versionsModal.classList.contains('hidden') || !backupHistoryModal.classList.contains('hidden') || !moveModal.classList.contains('hidden')) {
      showToast("Tanca primer l'editor o el modal actiu abans d'obrir la paleta de comandes.", 'info');
      return;
    }
    commandPaletteModal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
    commandPaletteInput.value = initialQuery;
    renderCommandPalette(initialQuery);
    requestAnimationFrame(() => commandPaletteInput.focus());
  }

  function closeCommandPalette() {
    if (!commandPaletteModal || commandPaletteModal.classList.contains('hidden')) return;
    commandPaletteModal.classList.add('hidden');
    commandPaletteInput.value = '';
    commandPaletteListEl.innerHTML = '';
    commandPaletteResults = [];
    commandPaletteActiveIndex = 0;
    const hasOtherModalOpen = !confirmModal.classList.contains('hidden') || !editModal.classList.contains('hidden') || !versionsModal.classList.contains('hidden') || !backupHistoryModal.classList.contains('hidden') || !moveModal.classList.contains('hidden');
    if (!hasOtherModalOpen) {
      modalOverlay.classList.add('hidden');
    }
  }

  function executeCommandPaletteEntry(index = commandPaletteActiveIndex) {
    const entry = commandPaletteResults[index];
    if (!entry || typeof entry.run !== 'function') return;
    entry.run();
  }

  function rememberRecentDoc(item, reason = 'open') {
    if (!item || !item.id || item.isDeleted) return;
    const entry = {
      id: generateId('recent-doc'),
      docId: item.id,
      title: item.title || 'Sense títol',
      type: item.type === 'folder' ? 'folder' : 'document',
      updatedAt: new Date().toISOString(),
      parentId: item.parentId || 'root',
      category: item.category || '',
      hasDraft: Boolean(localStorage.getItem(getEditDraftKey(item.id))),
      reason
    };
    const merged = [entry, ...recentDocs.filter(existing => existing.docId !== item.id)].slice(0, RECENT_DOCS_LIMIT);
    writeRecentDocsHistory(merged);
  }

  function removeRecentDoc(docId) {
    writeRecentDocsHistory(recentDocs.filter(entry => entry.docId !== docId));
    showToast("Element recent tret d'aquesta llista.", "info");
  }

  async function removeRecentWorkspace(entryId) {
    await writeRecentWorkspaceHistory(recentWorkspaces.filter(entry => entry.id !== entryId));
    showToast('Workspace recent eliminat d\'aquesta llista.', 'info');
  }

  async function downloadRecentWorkspace(entryId) {
    const entry = recentWorkspaces.find(item => item.id === entryId);
    if (!entry?.payload) {
      showToast('Aquest workspace recent ja no té dades descarregables.', 'error');
      return;
    }
    const fileName = entry.fileName || `${slugifyFileName(entry.name)}${WORKSPACE_FILE_EXTENSION}`;
    const shared = !supportsWorkspaceFiles() ? await shareWorkspaceFile(fileName, entry.payload) : false;
    if (shared === null) {
      showToast('Compartició del workspace cancel·lada.', 'info');
      return;
    }
    if (!shared) {
      triggerDownload(fileName, JSON.stringify(entry.payload, null, 2), 'application/json;charset=utf-8');
      showToast(`Workspace descarregat: ${entry.name}`);
      return;
    }
    showToast("Workspace enviat a Compartir. Desa'l a Fitxers/iCloud si vols reutilitzar-lo en altres dispositius.");
  }

  async function openRecentWorkspace(entryId) {
    const entry = recentWorkspaces.find(item => item.id === entryId);
    if (!entry?.payload) {
      showToast('Aquest workspace recent no es pot reobrir perquè només en queda la fitxa.', 'error');
      return;
    }

    const proceed = async () => {
      await applyWorkspacePayload(entry.payload, { forcePortable: true, sourceName: entry.fileName || entry.name, sourceLabel: 'workspace-open' });
      showToast(`Workspace recent obert: ${entry.name}`);
    };

    if (docs.length > 0 || workspaceDirty || shouldGuardEditClose()) {
      openConfirm(
        'Obrir workspace recent?',
        `Això substituirà l'estat actual per la còpia recent <strong>${escapeHtml(entry.name)}</strong>.`,
        proceed,
        { okLabel: 'Obrir workspace', warningText: 'Abans de continuar, exporta o desa el workspace actual si vols conservar-lo.' }
      );
      return;
    }

    await proceed();
  }

  function getWorkspaceValidationError(rawPayload) {
    if (Array.isArray(rawPayload)) return '';
    if (!rawPayload || typeof rawPayload !== 'object') return 'El fitxer no conté un JSON vàlid de Sutsumu.';
    if (rawPayload.schema === WORKSPACE_SCHEMA) {
      if (!rawPayload.snapshot || typeof rawPayload.snapshot !== 'object') return 'Aquest workspace no conté cap snapshot intern vàlid.';
      if (!Array.isArray(rawPayload.snapshot.docs)) return 'Aquest workspace no porta la llista de documents i carpetes.';
      return '';
    }
    if (rawPayload.schema && rawPayload.schema !== FULL_BACKUP_SCHEMA) return `L'schema ${rawPayload.schema} no correspon a un workspace o backup compatible de Sutsumu.`;
    if (rawPayload.schema === FULL_BACKUP_SCHEMA) {
      if (!Array.isArray(rawPayload.docs)) return 'Aquest backup de Sutsumu no porta la llista de documents i carpetes.';
      return '';
    }
    if (Array.isArray(rawPayload.docs)) return '';
    return 'Aquest JSON no sembla un workspace ni un backup complet de Sutsumu.';
  }

  async function applyWorkspacePayload(rawPayload, options = {}) {
    const { handle = null, forcePortable = false, sourceName = '', sourceLabel = '' } = options;
    const validationError = getWorkspaceValidationError(rawPayload);
    if (validationError) throw new Error(validationError);

    const parsed = await normalizeWorkspaceFilePayload(rawPayload);
    const sourceDisplayName = normalizeWorkspaceName(sourceName || parsed.workspaceMeta?.name || 'Sutsumu Workspace');
    const baseMeta = parsed.workspaceMeta || { id: generateId('workspace'), name: sourceDisplayName, lastSavedAt: new Date().toISOString(), bindingMode: 'portable' };

    docs = normalizeDocs(parsed.docs || []);
    expandedFolders = normalizeExpandedFolders(parsed.expandedFolders || [], docs);

    if (handle && !forcePortable) {
      await bindWorkspaceHandle(handle, { ...baseMeta, name: normalizeWorkspaceName(handle.name || baseMeta.name) });
    } else {
      await bindPortableWorkspace({ ...baseMeta, name: sourceDisplayName, bindingMode: 'portable' });
    }

    workspaceLastSavedSignature = createWorkspaceSignature(docs, expandedFolders);
    await saveData(sourceLabel || 'workspace-open');
    renderData();

    const payloadForHistory = await createWorkspacePayload(sourceLabel || 'workspace-open');
    await rememberRecentWorkspace(payloadForHistory, { mode: isWorkspaceConnected() ? 'fs' : 'portable', source: sourceLabel || 'workspace-open', fileName: sourceName || getWorkspaceSuggestedFilename() });
    updateWorkspaceUI();
  }

  function normalizeWorkspaceName(value = '') {
    const safeValue = String(value || '').trim();
    if (!safeValue) return 'Sutsumu Workspace';
    return safeValue
      .replace(/\.sutsumu-workspace\.json$/i, '')
      .replace(/\.bento-workspace\.json$/i, '')
      .replace(/\.json$/i, '')
      .trim() || 'Sutsumu Workspace';
  }

  function getWorkspaceDisplayName() {
    if (workspaceMeta?.name) return normalizeWorkspaceName(workspaceMeta.name);
    if (workspaceHandle?.name) return normalizeWorkspaceName(workspaceHandle.name);
    return 'Sense workspace';
  }

  function isWorkspaceConnected() {
    return Boolean(workspaceHandle);
  }

  function getWorkspaceSuggestedFilename() {
    const base = slugifyFileName(getWorkspaceDisplayName() === 'Sense workspace'
      ? (docs.find(item => item.type === 'folder' && !item.isDeleted)?.title || 'sutsumu-workspace')
      : getWorkspaceDisplayName());
    return `${base}${WORKSPACE_FILE_EXTENSION}`;
  }

  function normalizeExternalBackupMeta(rawMeta) {
    if (!rawMeta || typeof rawMeta !== 'object') return null;
    const stats = rawMeta.stats && typeof rawMeta.stats === 'object'
      ? {
          folders: Number(rawMeta.stats.folders || 0),
          documents: Number(rawMeta.stats.documents || 0),
          attachments: Number(rawMeta.stats.attachments || 0),
          deleted: Number(rawMeta.stats.deleted || 0),
          versions: Number(rawMeta.stats.versions || 0)
        }
      : null;
    return {
      name: typeof rawMeta.name === 'string' && rawMeta.name.trim() ? rawMeta.name.trim() : getExternalBackupSuggestedFilename(),
      lastSavedAt: typeof rawMeta.lastSavedAt === 'string' && !Number.isNaN(Date.parse(rawMeta.lastSavedAt)) ? rawMeta.lastSavedAt : '',
      signature: typeof rawMeta.signature === 'string' ? rawMeta.signature : '',
      stats
    };
  }

  function updateExternalBackupUI() {
    if (!externalBackupStatusTextEl || !externalBackupBadgeEl || !connectExternalBackupBtn || !saveExternalBackupBtn || !disconnectExternalBackupBtn) return;

    const fsSupported = supportsExternalBackupFiles();
    const hasData = docs.length > 0;
    connectExternalBackupBtn.disabled = isExternalBackupSaving || !fsSupported;
    saveExternalBackupBtn.disabled = isExternalBackupSaving || !isExternalBackupConnected() || !hasData;
    disconnectExternalBackupBtn.disabled = isExternalBackupSaving || !hasExternalBackupSession();
    connectExternalBackupBtn.textContent = isExternalBackupConnected()
      ? 'Canviar fitxer'
      : (externalBackupMeta ? 'Reconnectar fitxer' : 'Connectar fitxer');

    if (externalBackupHintEl) {
      externalBackupHintEl.textContent = fsSupported
        ? "Quan el fitxer estigui connectat, Sutsumu hi desarà automàticament una còpia JSON completa després de cada canvi estable. Per seguretat, mai no sobreescriurà la còpia externa amb un estat buit."
        : "Aquest navegador no permet reescriure automàticament un fitxer extern. Aquí continua sent més segur usar Exportar dades o un workspace desat fora del navegador.";
    }

    if (!fsSupported) {
      externalBackupBadgeEl.textContent = 'Manual';
      externalBackupStatusTextEl.textContent = 'Backup extern automàtic no disponible en aquest navegador. Mantén una còpia amb Exportar dades o workspace.';
      return;
    }

    if (isExternalBackupSaving) {
      externalBackupBadgeEl.textContent = 'Desant';
      externalBackupStatusTextEl.textContent = `Desant còpia externa a ${getExternalBackupDisplayName()}...`;
      return;
    }

    if (externalBackupNeedsPermission && isExternalBackupConnected()) {
      externalBackupBadgeEl.textContent = 'Permís';
      externalBackupStatusTextEl.textContent = `Hi ha canvis pendents per a ${getExternalBackupDisplayName()}, però el navegador necessita un gest teu per tornar a escriure al fitxer. Prem “Desar còpia ara”.`;
      return;
    }

    if (isExternalBackupConnected()) {
      externalBackupBadgeEl.textContent = externalBackupDirty ? 'Pendent' : 'Actiu';
      if (externalBackupDirty) {
        externalBackupStatusTextEl.textContent = `Backup extern connectat: ${getExternalBackupDisplayName()}. Hi ha canvis pendents d'escriure fora del navegador.`;
      } else if (externalBackupMeta?.stats) {
        externalBackupStatusTextEl.textContent = `Backup extern actiu: ${getExternalBackupDisplayName()}. Última còpia: ${formatWorkspaceSavedAt(externalBackupMeta.lastSavedAt)} · ${externalBackupMeta.stats.folders} carpetes i ${externalBackupMeta.stats.documents} documents.`;
      } else {
        externalBackupStatusTextEl.textContent = `Backup extern actiu: ${getExternalBackupDisplayName()}. Última còpia: ${formatWorkspaceSavedAt(externalBackupMeta?.lastSavedAt || '')}.`;
      }
      return;
    }

    if (externalBackupMeta) {
      externalBackupBadgeEl.textContent = 'Recordat';
      externalBackupStatusTextEl.textContent = `Backup extern recordat: ${getExternalBackupDisplayName()}. Torna a connectar aquest fitxer per reactivar l'automatisme.`;
      return;
    }

    externalBackupBadgeEl.textContent = 'Off';
    externalBackupStatusTextEl.textContent = hasData
      ? 'Encara no hi ha cap fitxer de backup extern connectat. Connecta un JSON extern perquè Sutsumu hi vagi desant còpies automàtiques.'
      : 'Connecta un fitxer de backup extern i Sutsumu hi començarà a desar còpies quan hi hagi dades.';
  }

  async function persistExternalBackupBinding() {
    try {
      if (externalBackupMeta) {
        localStorage.setItem(EXTERNAL_BACKUP_META_MIRROR_KEY, JSON.stringify(externalBackupMeta));
      } else {
        localStorage.removeItem(EXTERNAL_BACKUP_META_MIRROR_KEY);
      }
    } catch (err) {
      console.warn("No s'ha pogut actualitzar el recordatori local del backup extern.", err);
    }

    if (!getMainStore()) return;
    try {
      if (externalBackupMeta) {
        await getMainStore().setItem(EXTERNAL_BACKUP_META_KEY, externalBackupMeta);
      } else {
        await getMainStore().removeItem(EXTERNAL_BACKUP_META_KEY);
      }

      if (externalBackupHandle && canPersistFileHandle(externalBackupHandle)) {
        await getMainStore().setItem(EXTERNAL_BACKUP_HANDLE_KEY, externalBackupHandle);
      } else {
        await getMainStore().removeItem(EXTERNAL_BACKUP_HANDLE_KEY);
      }
    } catch (err) {
      console.warn("No s'ha pogut persistir la vinculació del backup extern.", err);
    }
  }

  async function bindExternalBackupHandle(handle, meta = {}) {
    externalBackupHandle = handle || null;
    externalBackupMeta = handle
      ? normalizeExternalBackupMeta({
          name: handle.name || meta.name || getExternalBackupSuggestedFilename(),
          lastSavedAt: meta.lastSavedAt || '',
          signature: meta.signature || '',
          stats: meta.stats || null
        })
      : null;
    externalBackupLastSavedSignature = meta.signature || '';
    externalBackupDirty = false;
    externalBackupNeedsPermission = false;
    await persistExternalBackupBinding();
    updateExternalBackupUI();
  }

  async function clearExternalBackupBinding(options = {}) {
    const { forgetMeta = true } = options;
    if (externalBackupAutosaveTimer) {
      clearTimeout(externalBackupAutosaveTimer);
      externalBackupAutosaveTimer = null;
    }
    externalBackupHandle = null;
    externalBackupLastSavedSignature = '';
    externalBackupDirty = false;
    externalBackupNeedsPermission = false;
    if (forgetMeta) {
      externalBackupMeta = null;
    }
    await persistExternalBackupBinding();
    updateExternalBackupUI();
  }

  async function restorePersistedExternalBackupBinding() {
    const mirroredMeta = normalizeExternalBackupMeta(safeJSONParse(localStorage.getItem(EXTERNAL_BACKUP_META_MIRROR_KEY), null));
    if (!getMainStore()) {
      externalBackupMeta = mirroredMeta;
      externalBackupHandle = null;
      externalBackupLastSavedSignature = mirroredMeta?.signature || '';
      externalBackupDirty = false;
      externalBackupNeedsPermission = false;
      updateExternalBackupUI();
      return;
    }

    try {
      const savedMeta = normalizeExternalBackupMeta(await getMainStore().getItem(EXTERNAL_BACKUP_META_KEY));
      const savedHandle = await getMainStore().getItem(EXTERNAL_BACKUP_HANDLE_KEY);
      externalBackupMeta = savedMeta || mirroredMeta;
      externalBackupLastSavedSignature = externalBackupMeta?.signature || '';
      externalBackupHandle = savedHandle && savedHandle.kind === 'file' ? savedHandle : null;
    } catch (err) {
      console.warn("No s'ha pogut restaurar la vinculació del backup extern.", err);
      externalBackupHandle = null;
      externalBackupMeta = mirroredMeta;
      externalBackupLastSavedSignature = mirroredMeta?.signature || '';
    }

    externalBackupDirty = false;
    externalBackupNeedsPermission = false;
    updateExternalBackupUI();
  }

  async function ensureExternalBackupPermission(interactive = false) {
    if (!externalBackupHandle) return false;
    try {
      if (typeof externalBackupHandle.queryPermission === 'function') {
        const current = await externalBackupHandle.queryPermission({ mode: 'readwrite' });
        if (current === 'granted') {
          externalBackupNeedsPermission = false;
          return true;
        }
        if (interactive && typeof externalBackupHandle.requestPermission === 'function') {
          const requested = await externalBackupHandle.requestPermission({ mode: 'readwrite' });
          externalBackupNeedsPermission = requested !== 'granted';
          return requested === 'granted';
        }
        externalBackupNeedsPermission = true;
        return false;
      }

      externalBackupNeedsPermission = false;
      return true;
    } catch (err) {
      console.warn("No s'ha pogut comprovar el permís del backup extern.", err);
      externalBackupNeedsPermission = true;
      return false;
    } finally {
      updateExternalBackupUI();
    }
  }

  async function saveExternalBackupToHandle(reason = 'external-auto-backup', options = {}) {
    const { silent = false, force = false, interactive = false } = options;
    if (isExternalBackupSaving) return false;
    if (!externalBackupHandle) {
      if (!silent) showToast('Connecta primer un fitxer per al backup extern.', 'info');
      updateExternalBackupUI();
      return false;
    }

    if (docs.length === 0) {
      externalBackupDirty = false;
      updateExternalBackupUI();
      if (!silent) {
        showToast("No sobreescriuré la còpia externa amb un estat buit. L'última còpia bona es manté intacta.", 'info');
      }
      return false;
    }

    const signature = createBackupStateSignature(docs, expandedFolders);
    if (!force && signature === externalBackupLastSavedSignature && !externalBackupDirty) {
      if (!silent) showToast('La còpia externa ja està al dia.', 'info');
      updateExternalBackupUI();
      return true;
    }

    const hasPermission = await ensureExternalBackupPermission(interactive);
    if (!hasPermission) {
      externalBackupDirty = true;
      if (!silent) {
        showToast(
          interactive
            ? "Sutsumu no té permís per escriure en aquest fitxer extern."
            : "Hi ha una còpia externa pendent. Prem “Desar còpia ara” per reactivar el permís del fitxer.",
          interactive ? 'error' : 'info'
        );
      }
      updateExternalBackupUI();
      return false;
    }

    isExternalBackupSaving = true;
    updateExternalBackupUI();
    try {
      const payload = await createFullBackupPayload(reason);
      const writable = await externalBackupHandle.createWritable();
      await writable.write(JSON.stringify(payload, null, 2));
      await writable.close();
      externalBackupMeta = normalizeExternalBackupMeta({
        name: externalBackupHandle?.name || getExternalBackupSuggestedFilename(),
        lastSavedAt: new Date().toISOString(),
        signature,
        stats: createBackupStats(payload)
      });
      externalBackupLastSavedSignature = signature;
      externalBackupDirty = false;
      externalBackupNeedsPermission = false;
      await persistExternalBackupBinding();
      if (!silent) showToast(`Còpia externa desada: ${getExternalBackupDisplayName()}`);
      return true;
    } catch (err) {
      console.warn("No s'ha pogut desar la còpia externa automàtica.", err);
      externalBackupDirty = true;
      if (!silent) {
        showToast(
          err?.name === 'NotAllowedError'
            ? "Sutsumu no té permís per escriure en aquest fitxer extern."
            : "No s'ha pogut desar la còpia externa.",
          'error'
        );
      }
      return false;
    } finally {
      isExternalBackupSaving = false;
      updateExternalBackupUI();
    }
  }

  function queueExternalBackupAutosave(reason = 'auto-save') {
    if (!hasExternalBackupSession()) {
      updateExternalBackupUI();
      return;
    }

    if (docs.length === 0) {
      externalBackupDirty = false;
      if (externalBackupAutosaveTimer) {
        clearTimeout(externalBackupAutosaveTimer);
        externalBackupAutosaveTimer = null;
      }
      updateExternalBackupUI();
      return;
    }

    externalBackupDirty = true;
    updateExternalBackupUI();

    if (!isExternalBackupConnected()) return;

    if (externalBackupAutosaveTimer) clearTimeout(externalBackupAutosaveTimer);
    externalBackupAutosaveTimer = setTimeout(async () => {
      externalBackupAutosaveTimer = null;
      await saveExternalBackupToHandle(`external-${reason}`, { silent: true, force: false, interactive: false });
    }, EXTERNAL_BACKUP_DEBOUNCE_MS);
  }

  async function connectExternalBackupFile() {
    if (!supportsExternalBackupFiles()) {
      showToast("Aquest navegador no permet backups externs automàtics. Fes servir Exportar dades o un workspace.", 'info');
      return false;
    }

    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: getExternalBackupSuggestedFilename(),
        types: [
          {
            description: 'Backup extern de Sutsumu',
            accept: { 'application/json': ['.json'] }
          }
        ]
      });
      await bindExternalBackupHandle(handle, { name: handle.name });
      if (docs.length > 0) {
        await saveExternalBackupToHandle('external-manual-backup', { silent: false, force: true, interactive: true });
      } else {
        showToast('Fitxer de backup extern connectat. Quan hi hagi dades, Sutsumu hi començarà a desar còpies automàtiques.');
      }
      return true;
    } catch (err) {
      if (err?.name === 'AbortError') {
        showToast('Connexió del backup extern cancel·lada.', 'info');
        return false;
      }
      console.warn("No s'ha pogut connectar el fitxer de backup extern.", err);
      showToast("No s'ha pogut connectar el fitxer de backup extern.", 'error');
      return false;
    }
  }

  async function disconnectExternalBackup() {
    if (!hasExternalBackupSession()) return;
    const label = getExternalBackupDisplayName();
    await clearExternalBackupBinding({ forgetMeta: true });
    showToast(`Backup extern desconnectat: ${label}`, 'info');
  }

  function updateWorkspaceUI() {
    if (!workspaceStatusTextEl || !workspaceModeBadgeEl) return;

    const fsSupported = supportsWorkspaceFiles();
    const hasData = docs.length > 0;
    const labels = getWorkspacePortableActionLabel();
    createWorkspaceBtn.textContent = labels.create;
    openWorkspaceBtn.textContent = labels.open;
    saveWorkspaceBtn.textContent = labels.save;
    saveWorkspaceAsBtn.textContent = labels.saveAs;
    createWorkspaceBtn.disabled = isWorkspaceSaving;
    openWorkspaceBtn.disabled = isWorkspaceSaving;
    saveWorkspaceBtn.disabled = isWorkspaceSaving || (!hasWorkspaceSession() && !hasData);
    saveWorkspaceAsBtn.disabled = isWorkspaceSaving || !hasData;
    closeWorkspaceBtn.disabled = isWorkspaceSaving || !hasWorkspaceSession();

    if (workspaceLocalHintEl) {
      const showLocalHint = !isWorkspaceSaving && !hasWorkspaceSession() && hasData;
      workspaceLocalHintEl.classList.toggle('hidden', !showLocalHint);
    }

    if (workspaceSyncHintEl) {
      const iPhoneFlow = canShareFiles() && isIOSLikeDevice() && !fsSupported;
      workspaceSyncHintEl.textContent = iPhoneFlow
        ? 'Flux recomanat per sincronitzar: obre el mateix workspace des de Fitxers/iCloud Drive, edita, prem “Desar a Fitxers” i al full Compartir tria “Desa a Fitxers” sobre el mateix fitxer.'
        : "Per sincronitzar Mac i iPhone, guarda sempre el mateix fitxer workspace a iCloud Drive o Fitxers i torna'l a obrir des de cada dispositiu quan vulguis refrescar dades.";
    }

    const savedLabel = workspaceMeta?.lastSavedAt
      ? new Date(workspaceMeta.lastSavedAt).toLocaleString('ca-ES')
      : 'encara no desat';

    if (isWorkspaceSaving) {
      workspaceModeBadgeEl.textContent = 'Desant';
      workspaceStatusTextEl.textContent = `Desant ${getWorkspaceDisplayName()}...`;
      renderRecentWorkspaces();
      return;
    }

    if (isWorkspaceConnected()) {
      workspaceModeBadgeEl.textContent = workspaceDirty ? 'Pendent' : 'Connectat';
      workspaceStatusTextEl.textContent = workspaceDirty
        ? `Workspace connectat: ${getWorkspaceDisplayName()}. Hi ha canvis pendents de sincronitzar al fitxer extern.`
        : `Workspace connectat: ${getWorkspaceDisplayName()}. Última sincronització: ${savedLabel}.`;
      renderRecentWorkspaces();
      return;
    }

    if (isPortableWorkspaceMode()) {
      workspaceModeBadgeEl.textContent = workspaceDirty ? 'Pendent' : 'Compatible';
      workspaceStatusTextEl.textContent = workspaceDirty
        ? `Workspace compatible: ${getWorkspaceDisplayName()}. Hi ha canvis pendents; prem “${labels.save}” per exportar el JSON actualitzat.`
        : `Workspace compatible: ${getWorkspaceDisplayName()}. Última sincronització manual: ${savedLabel} · v${APP_VERSION}.`;
      renderRecentWorkspaces();
      return;
    }

    if (!fsSupported) {
      workspaceModeBadgeEl.textContent = 'Compatible';
      if (workspaceMeta?.name) {
        workspaceStatusTextEl.textContent = `Mode compatible: aquest entorn no pot reconnectar automàticament ${getWorkspaceDisplayName()}. Pots obrir-lo manualment o descarregar-ne una còpia nova.`;
      } else if (hasData) {
        workspaceStatusTextEl.textContent = 'Mode compatible: treballes localment. Desa un workspace JSON per poder-lo reobrir fàcilment en qualsevol altre entorn.';
      } else {
        workspaceStatusTextEl.textContent = 'Mode compatible: pots obrir un workspace JSON manualment i descarregar-ne una còpia actualitzada en qualsevol moment.';
      }
      renderRecentWorkspaces();
      return;
    }

    workspaceModeBadgeEl.textContent = 'Local';
    if (workspaceMeta?.name) {
      workspaceStatusTextEl.textContent = `Workspace recordat: ${getWorkspaceDisplayName()}. Torna'l a obrir o reconnecta'l per seguir desant fora del navegador.`;
    } else if (hasData) {
      workspaceStatusTextEl.textContent = "Mode local: tens canvis dins del navegador, però encara no tens cap workspace extern associat. Desa'l per no dependre només d'aquest dispositiu.";
    } else {
      workspaceStatusTextEl.textContent = 'Mode local: encara no hi ha cap workspace extern connectat. També pots treballar en mode compatible descarregant un JSON.';
    }
    renderRecentWorkspaces();
  }

  async function persistWorkspaceBinding() {
    if (!getMainStore()) return;
    try {
      if (workspaceMeta) {
        await getMainStore().setItem(WORKSPACE_META_KEY, workspaceMeta);
      } else {
        await getMainStore().removeItem(WORKSPACE_META_KEY);
      }

      if (workspaceHandle) {
        await getMainStore().setItem(WORKSPACE_HANDLE_KEY, workspaceHandle);
      } else {
        await getMainStore().removeItem(WORKSPACE_HANDLE_KEY);
      }
    } catch (err) {
      console.warn("No s'ha pogut persistir la vinculació del workspace.", err);
    }
  }

  async function getWorkspacePermissionState(handle) {
    if (!handle || typeof handle.queryPermission !== 'function') return 'unsupported';
    try {
      return await handle.queryPermission({ mode: 'readwrite' });
    } catch (_err) {
      return 'unknown';
    }
  }

  function createWorkspaceSignature(currentDocs = docs, currentExpandedFolders = expandedFolders) {
    return createBackupStateSignature(currentDocs, currentExpandedFolders);
  }

  async function createWorkspacePayload(reason = 'workspace-save') {
    const snapshot = await createFullBackupPayload(reason);
    const stats = createBackupStats(snapshot);
    const now = new Date().toISOString();
    const existingId = typeof workspaceMeta?.id === 'string' && workspaceMeta.id.trim() ? workspaceMeta.id : generateId('workspace');
    return {
      schema: WORKSPACE_SCHEMA,
      version: WORKSPACE_VERSION,
      app: 'Sutsumu',
      appVersion: APP_VERSION,
      appRelease: APP_RELEASE_LABEL,
      workspaceId: existingId,
      workspaceName: getWorkspaceDisplayName() === 'Sense workspace' ? 'Sutsumu Workspace' : getWorkspaceDisplayName(),
      workspaceBindingMode: isWorkspaceConnected() ? 'fs' : (isPortableWorkspaceMode() ? 'portable' : 'portable'),
      savedAt: now,
      stats,
      snapshot
    };
  }

  async function normalizeWorkspaceFilePayload(rawPayload) {
    if (rawPayload?.schema === WORKSPACE_SCHEMA && rawPayload?.snapshot) {
      const parsed = await normalizeImportedBackupPayload(rawPayload.snapshot);
      return {
        docs: parsed.docs,
        expandedFolders: parsed.expandedFolders,
        workspaceMeta: {
          id: typeof rawPayload.workspaceId === 'string' && rawPayload.workspaceId.trim() ? rawPayload.workspaceId : generateId('workspace'),
          name: normalizeWorkspaceName(typeof rawPayload.workspaceName === 'string' && rawPayload.workspaceName.trim() ? rawPayload.workspaceName.trim() : 'Sutsumu Workspace'),
          lastSavedAt: typeof rawPayload.savedAt === 'string' ? rawPayload.savedAt : new Date().toISOString(),
          bindingMode: rawPayload.workspaceBindingMode === 'fs' ? 'fs' : 'portable'
        }
      };
    }

    const parsed = await normalizeImportedBackupPayload(rawPayload);
    return {
      docs: parsed.docs,
      expandedFolders: parsed.expandedFolders,
      workspaceMeta: null
    };
  }

  async function bindWorkspaceHandle(handle, meta = null) {
    workspaceHandle = handle || null;
    const baseName = normalizeWorkspaceName(handle?.name || meta?.name || 'Sutsumu Workspace');
    workspaceMeta = handle
      ? {
          id: typeof meta?.id === 'string' && meta.id.trim() ? meta.id : generateId('workspace'),
          name: baseName,
          lastSavedAt: typeof meta?.lastSavedAt === 'string' ? meta.lastSavedAt : '',
          bindingMode: 'fs'
        }
      : null;
    workspaceDirty = false;
    await persistWorkspaceBinding();
    updateWorkspaceUI();
    queueSyncPreparationRefresh('workspace-bind');
  }

  async function bindPortableWorkspace(meta = null) {
    workspaceHandle = null;
    workspaceMeta = meta
      ? {
          id: typeof meta.id === 'string' && meta.id.trim() ? meta.id : generateId('workspace'),
          name: normalizeWorkspaceName(meta.name || 'Sutsumu Workspace'),
          lastSavedAt: typeof meta.lastSavedAt === 'string' ? meta.lastSavedAt : '',
          bindingMode: 'portable'
        }
      : null;
    workspaceDirty = false;
    await persistWorkspaceBinding();
    updateWorkspaceUI();
    queueSyncPreparationRefresh('workspace-bind');
  }

  async function disconnectWorkspace(options = {}) {
    const { silent = false } = options;
    workspaceHandle = null;
    workspaceMeta = null;
    workspaceDirty = false;
    workspaceLastSavedSignature = '';
    if (workspaceAutosaveTimer) {
      clearTimeout(workspaceAutosaveTimer);
      workspaceAutosaveTimer = null;
    }
    await persistWorkspaceBinding();
    updateWorkspaceUI();
    queueSyncPreparationRefresh('workspace-disconnect');
    if (!silent) showToast('Workspace desconnectat. Sutsumu continua en mode local.');
  }

  async function shareWorkspaceFile(fileName, payload) {
    if (!canShareFiles()) return false;
    try {
      const file = new File([JSON.stringify(payload, null, 2)], fileName, { type: 'application/json' });
      if (typeof navigator.canShare === 'function' && !navigator.canShare({ files: [file] })) {
        return false;
      }
      await navigator.share({
        title: fileName,
        text: 'Desa aquest workspace a Fitxers o iCloud Drive per mantenir la sincronització manual entre dispositius.',
        files: [file]
      });
      return true;
    } catch (err) {
      if (err?.name === 'AbortError') return null;
      console.warn("No s'ha pogut obrir el full de compartir del workspace.", err);
      return false;
    }
  }

  async function saveWorkspacePortable(reason = 'workspace-portable-save', options = {}) {
    const { silent = false, force = false } = options;
    const signature = createWorkspaceSignature(docs, expandedFolders);
    if (!force && signature === workspaceLastSavedSignature && !workspaceDirty && isPortableWorkspaceMode()) {
      if (!silent) showToast('Aquest workspace compatible ja està al dia.', 'info');
      return true;
    }

    isWorkspaceSaving = true;
    updateWorkspaceUI();

    try {
      const payload = await createWorkspacePayload(reason);
      const fileName = getWorkspaceSuggestedFilename();
      let exportedViaShare = false;
      if (!supportsWorkspaceFiles()) {
        const shareResult = await shareWorkspaceFile(fileName, payload);
        if (shareResult === null) {
          workspaceDirty = true;
          updateWorkspaceUI();
          if (!silent) showToast('Desat del workspace cancel·lat.', 'info');
          return false;
        }
        exportedViaShare = shareResult === true;
      }
      if (!exportedViaShare) {
        triggerDownload(fileName, JSON.stringify(payload, null, 2), 'application/json;charset=utf-8');
      }
      workspaceMeta = {
        id: payload.workspaceId,
        name: normalizeWorkspaceName(payload.workspaceName || fileName),
        lastSavedAt: payload.savedAt,
        bindingMode: 'portable'
      };
      workspaceLastSavedSignature = signature;
      workspaceDirty = false;
      await persistWorkspaceBinding();
      await rememberRecentWorkspace(payload, { mode: 'portable', source: reason, fileName });
      updateWorkspaceUI();
      queueSyncPreparationRefresh('workspace-save');
      if (!silent) {
        showToast(exportedViaShare
          ? "Workspace enviat a Compartir. Desa'l a Fitxers/iCloud sobre el mateix fitxer per sincronitzar-lo."
          : `Workspace descarregat: ${fileName}`);
      }
      return true;
    } catch (err) {
      console.warn("No s'ha pogut descarregar el workspace compatible.", err);
      workspaceDirty = true;
      updateWorkspaceUI();
      if (!silent) showToast("No s'ha pogut descarregar el workspace compatible.", 'error');
      return false;
    } finally {
      isWorkspaceSaving = false;
      updateWorkspaceUI();
    }
  }

  async function saveWorkspaceToHandle(reason = 'workspace-manual-save', options = {}) {
    const { silent = false, force = false } = options;
    if (!workspaceHandle) {
      return saveWorkspacePortable(reason, { silent, force });
    }

    const signature = createWorkspaceSignature(docs, expandedFolders);
    if (!force && signature === workspaceLastSavedSignature && !workspaceDirty) {
      if (!silent) showToast('El workspace extern ja està sincronitzat.', 'info');
      return true;
    }

    isWorkspaceSaving = true;
    updateWorkspaceUI();

    try {
      const payload = await createWorkspacePayload(reason);
      const writable = await workspaceHandle.createWritable();
      await writable.write(JSON.stringify(payload, null, 2));
      await writable.close();
      workspaceMeta = {
        id: payload.workspaceId,
        name: normalizeWorkspaceName(workspaceHandle.name || payload.workspaceName || 'Sutsumu Workspace'),
        lastSavedAt: payload.savedAt,
        bindingMode: 'fs'
      };
      workspaceLastSavedSignature = signature;
      workspaceDirty = false;
      await persistWorkspaceBinding();
      await rememberRecentWorkspace(payload, { mode: 'fs', source: reason, fileName: workspaceHandle?.name || getWorkspaceSuggestedFilename() });
      updateWorkspaceUI();
      queueSyncPreparationRefresh('workspace-save');
      if (!silent) showToast(`Workspace desat: ${workspaceMeta.name}`);
      return true;
    } catch (err) {
      console.warn("No s'ha pogut desar el workspace extern.", err);
      workspaceDirty = true;
      updateWorkspaceUI();
      if (!silent) {
        const msg = err?.name === 'NotAllowedError'
          ? 'No hi ha permisos per desar aquest workspace extern.'
          : "No s'ha pogut desar el workspace extern.";
        showToast(msg, 'error');
      }
      return false;
    } finally {
      isWorkspaceSaving = false;
      updateWorkspaceUI();
    }
  }

  function queueWorkspaceAutosave(reason = 'auto-save') {
    if (!hasWorkspaceSession()) return;
    workspaceDirty = true;
    updateWorkspaceUI();

    if (!isWorkspaceConnected()) return;

    if (workspaceAutosaveTimer) clearTimeout(workspaceAutosaveTimer);
    workspaceAutosaveTimer = setTimeout(async () => {
      workspaceAutosaveTimer = null;
      await saveWorkspaceToHandle(`workspace-${reason}`, { silent: true, force: false });
    }, WORKSPACE_AUTOSAVE_DEBOUNCE_MS);
  }

  async function restorePersistedWorkspaceBinding() {
    if (!getMainStore()) {
      updateWorkspaceUI();
      queueSyncPreparationRefresh('workspace-restore');
      return;
    }

    try {
      const savedMeta = await getMainStore().getItem(WORKSPACE_META_KEY);
      const savedHandle = await getMainStore().getItem(WORKSPACE_HANDLE_KEY);
      if (savedMeta && typeof savedMeta === 'object') {
        workspaceMeta = {
          id: typeof savedMeta.id === 'string' && savedMeta.id.trim() ? savedMeta.id : generateId('workspace'),
          name: normalizeWorkspaceName(typeof savedMeta.name === 'string' && savedMeta.name.trim() ? savedMeta.name.trim() : 'Sutsumu Workspace'),
          lastSavedAt: typeof savedMeta.lastSavedAt === 'string' ? savedMeta.lastSavedAt : '',
          bindingMode: savedMeta.bindingMode === 'portable' ? 'portable' : 'fs'
        };
      }
      if (supportsWorkspaceFiles() && savedHandle && savedHandle.kind === 'file' && workspaceMeta?.bindingMode !== 'portable') {
        const permission = await getWorkspacePermissionState(savedHandle);
        if (permission === 'granted') {
          workspaceHandle = savedHandle;
          workspaceLastSavedSignature = createWorkspaceSignature(docs, expandedFolders);
        }
      } else {
        workspaceHandle = null;
      }
    } catch (err) {
      console.warn("No s'ha pogut restaurar la vinculació del workspace.", err);
    }

    updateWorkspaceUI();
    queueSyncPreparationRefresh('workspace-restore');
  }

  async function openWorkspaceFromFileBlob(file, options = {}) {
    const { handle = null, forcePortable = false } = options;
    const raw = JSON.parse(await file.text());
    await applyWorkspacePayload(raw, {
      handle,
      forcePortable,
      sourceName: file.name || 'Sutsumu Workspace',
      sourceLabel: 'workspace-open'
    });
    showToast(`Workspace obert: ${normalizeWorkspaceName(file.name || 'Sutsumu Workspace')}`);
  }

  async function maybeOpenWorkspaceFromFileBlob(file, options = {}) {
    if (!file) return false;

    const proceed = async () => {
      await openWorkspaceFromFileBlob(file, options);
      return true;
    };

    if (docs.length > 0 || workspaceDirty || shouldGuardEditClose()) {
      return new Promise((resolve) => {
        openConfirm(
          'Obrir workspace extern?',
          `Això substituirà l'estat actual per <strong>${escapeHtml(file.name || 'Sutsumu Workspace')}</strong>.`,
          async () => {
            await proceed();
            resolve(true);
          },
          {
            okLabel: 'Obrir workspace',
            warningText: 'Abans de continuar, desa o exporta el workspace actual si vols conservar-lo.',
            onCancel: () => resolve(false)
          }
        );
      });
    }

    await proceed();
    return true;
  }

  function promptCompatibleWorkspaceOpen() {
    if (!workspaceFileInput) {
      showToast("No s'ha trobat el selector de fitxers del workspace compatible.", 'error');
      return;
    }
    workspaceFileInput.value = '';
    workspaceFileInput.click();
  }

  async function createNewWorkspaceFile(options = {}) {
    const { saveAs = false } = options;
    const createReason = saveAs ? 'workspace-save-as' : 'workspace-create';
    if (!supportsWorkspaceFiles()) {
      await saveWorkspacePortable(`${createReason}-portable`, { silent: false, force: true });
      return;
    }

    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: getWorkspaceSuggestedFilename(),
        types: [{
          description: 'Sutsumu Workspace',
          accept: { 'application/json': [WORKSPACE_FILE_EXTENSION, LEGACY_WORKSPACE_FILE_EXTENSION, '.json'] }
        }],
        excludeAcceptAllOption: false
      });
      await bindWorkspaceHandle(handle, { name: handle.name, id: generateId('workspace') });
      await saveWorkspaceToHandle(createReason, { silent: false, force: true });
    } catch (err) {
      if (err?.name === 'AbortError') return;
      console.warn("No s'ha pogut crear el workspace extern. Es provarà el mode compatible.", err);
      showToast("No s'ha pogut vincular un fitxer del sistema. Sutsumu crearà un workspace compatible descarregable.", 'info');
      await saveWorkspacePortable(`${createReason}-fallback`, { silent: false, force: true });
    }
  }

  async function openExistingWorkspaceFile() {
    if (!supportsWorkspaceFiles()) {
      promptCompatibleWorkspaceOpen();
      return;
    }

    try {
      const [handle] = await window.showOpenFilePicker({
        multiple: false,
        types: [{
          description: 'Sutsumu Workspace o backup JSON',
          accept: { 'application/json': [WORKSPACE_FILE_EXTENSION, LEGACY_WORKSPACE_FILE_EXTENSION, '.json'] }
        }],
        excludeAcceptAllOption: false
      });
      if (!handle) return;
      const file = await handle.getFile();
      await maybeOpenWorkspaceFromFileBlob(file, { handle });
    } catch (err) {
      if (err?.name === 'AbortError') return;
      console.warn("No s'ha pogut obrir el workspace extern amb l'API del navegador. Es provarà el mode compatible.", err);
      showToast("No s'ha pogut obrir el workspace amb accés directe al disc. Prova el mode compatible.", 'info');
      promptCompatibleWorkspaceOpen();
    }
  }

  async function saveWorkspace() {
    if (isWorkspaceConnected()) {
      return saveWorkspaceToHandle('workspace-manual-save', { silent: false, force: true });
    }
    return saveWorkspacePortable('workspace-manual-save', { silent: false, force: true });
  }

  async function saveWorkspaceAsNewFile() {
    if (!docs.length) {
      showToast('Encara no hi ha contingut per desar en un workspace.', 'info');
      return;
    }
    await createNewWorkspaceFile({ saveAs: true });
  }


  async function migrateLegacyLocalStorageToIndexedStores() {
    if (!canUseIndexedStores()) return;

    const oldDocs = localStorage.getItem(STORAGE_KEY);
    if (oldDocs) {
      await getMainStore().setItem(STORAGE_KEY, safeJSONParse(oldDocs, []));
      localStorage.removeItem(STORAGE_KEY);
      console.log('Migració a IndexedDB completada!');
    }

    const oldExpanded = localStorage.getItem(EXPANDED_KEY);
    if (oldExpanded) {
      await getMainStore().setItem(EXPANDED_KEY, safeJSONParse(oldExpanded, []));
      localStorage.removeItem(EXPANDED_KEY);
    }

    const oldLightHistory = localStorage.getItem(LIGHT_BACKUP_HISTORY_KEY);
    if (oldLightHistory) {
      await getBackupStore().setItem(LIGHT_BACKUP_HISTORY_KEY, safeJSONParse(oldLightHistory, []));
      localStorage.removeItem(LIGHT_BACKUP_HISTORY_KEY);
    }

    const oldRecoveryVault = localStorage.getItem(RECOVERY_VAULT_KEY);
    if (oldRecoveryVault) {
      await getBackupStore().setItem(RECOVERY_VAULT_KEY, safeJSONParse(oldRecoveryVault, null));
      localStorage.removeItem(RECOVERY_VAULT_KEY);
    }
  }

  function generateId(prefix = 'item') {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return `${prefix}-${window.crypto.randomUUID()}`;
    }
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function escapeHtml(value = '') {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatPlainTextAsHtml(text = '') {
    return escapeHtml(text).replaceAll('\r\n', '\n').replaceAll('\n', '<br>');
  }

  function sanitizeInlineStyle(tagName = '', styleText = '') {
    const safeTag = String(tagName || '').toUpperCase();
    const allowedPropsByTag = {
      TABLE: new Set(['width', 'table-layout', 'margin-left', 'margin-right']),
      TR: new Set(['background-color']),
      TD: new Set(['background-color', 'width', 'text-align', 'vertical-align']),
      TH: new Set(['background-color', 'width', 'text-align', 'vertical-align'])
    };
    const allowedProps = allowedPropsByTag[safeTag];
    if (!allowedProps || !styleText) return '';

    const validators = {
      width: value => /^(?:\d+(?:\.\d+)?%|\d+(?:\.\d+)?px|auto)$/i.test(value),
      'table-layout': value => /^(?:auto|fixed)$/i.test(value),
      'margin-left': value => /^(?:auto|0|0px)$/i.test(value),
      'margin-right': value => /^(?:auto|0|0px)$/i.test(value),
      'background-color': value => /^(?:#[0-9a-f]{6}|transparent)$/i.test(value),
      'text-align': value => /^(?:left|center|right|justify)$/i.test(value),
      'vertical-align': value => /^(?:top|middle|bottom)$/i.test(value)
    };

    const sanitizedParts = [];
    String(styleText || '')
      .split(';')
      .map(part => part.trim())
      .filter(Boolean)
      .forEach(part => {
        const separatorIndex = part.indexOf(':');
        if (separatorIndex < 1) return;
        const prop = part.slice(0, separatorIndex).trim().toLowerCase();
        const value = part.slice(separatorIndex + 1).trim();
        if (!allowedProps.has(prop)) return;
        const validator = validators[prop];
        if (!validator || !validator(value)) return;
        sanitizedParts.push(`${prop}: ${value}`);
      });

    return sanitizedParts.join('; ');
  }

  function sanitizeRichText(html = '') {
    const allowedTags = new Set([
      'A', 'B', 'STRONG', 'I', 'EM', 'U', 'S', 'DEL', 'SUP', 'SUB',
      'UL', 'OL', 'LI', 'BR', 'P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
      'TABLE', 'THEAD', 'TBODY', 'TR', 'TD', 'TH'
    ]);
    const allowedAttrs = {
      A: new Set(['href', 'target', 'rel']),
      TABLE: new Set(['style']),
      TR: new Set(['style']),
      TD: new Set(['colspan', 'rowspan', 'style']),
      TH: new Set(['colspan', 'rowspan', 'style'])
    };

    const template = document.createElement('template');
    template.innerHTML = String(html || '');

    const sanitizeNode = (node, parent) => {
      if (node.nodeType === Node.TEXT_NODE) {
        parent.appendChild(document.createTextNode(node.textContent || ''));
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return;

      const tag = node.tagName.toUpperCase();
      if (!allowedTags.has(tag)) {
        Array.from(node.childNodes).forEach(child => sanitizeNode(child, parent));
        return;
      }

      const cleanEl = document.createElement(tag.toLowerCase());
      const attrAllowList = allowedAttrs[tag];
      if (attrAllowList) {
        Array.from(node.attributes).forEach(attr => {
          const attrName = attr.name.toLowerCase();
          if (!attrAllowList.has(attrName)) return;

          if (tag === 'A' && attrName === 'href') {
            if (!isSafeUrl(attr.value)) return;
            cleanEl.setAttribute('href', attr.value);
            cleanEl.setAttribute('target', '_blank');
            cleanEl.setAttribute('rel', 'noopener noreferrer');
            return;
          }

          if (attrName === 'style') {
            const safeStyle = sanitizeInlineStyle(tag, attr.value);
            if (safeStyle) {
              cleanEl.setAttribute('style', safeStyle);
            }
            return;
          }

          if ((tag === 'TD' || tag === 'TH') && (attrName === 'colspan' || attrName === 'rowspan')) {
            if (/^\d+$/.test(attr.value)) {
              cleanEl.setAttribute(attrName, attr.value);
            }
          }
        });
      }

      Array.from(node.childNodes).forEach(child => sanitizeNode(child, cleanEl));
      parent.appendChild(cleanEl);
    };

    const wrapper = document.createElement('div');
    Array.from(template.content.childNodes).forEach(node => sanitizeNode(node, wrapper));
    return wrapper.innerHTML.trim();
  }

  function setEditorPlainText(editorEl, text = '') {
    editorEl.innerHTML = formatPlainTextAsHtml(text);
  }

  function getSanitizedEditorHtml(editorEl) {
    return sanitizeRichText(editorEl.innerHTML);
  }

  function getPlainTextFromHtml(html = '') {
    const temp = document.createElement('div');
    temp.innerHTML = sanitizeRichText(html);
    return (temp.textContent || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
  }

  function slugifyFileName(value = '') {
    return String(value || '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'document';
  }

  function htmlToPlainText(html = '') {
    const temp = document.createElement('div');
    temp.innerHTML = sanitizeRichText(html);
    return (temp.innerText || temp.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
  }

  function htmlToEditorMultilineText(html = '') {
    const temp = document.createElement('div');
    temp.innerHTML = sanitizeRichText(html);

    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) return node.textContent || '';
      if (node.nodeType !== Node.ELEMENT_NODE) return '';

      const tag = node.tagName.toLowerCase();
      const children = Array.from(node.childNodes).map(walk).join('');

      if (tag === 'br') return '\n';
      if (/^h[1-6]$/.test(tag) || tag === 'p' || tag === 'div' || tag === 'li' || tag === 'tr') {
        return `${children}\n`;
      }
      return children;
    };

    return Array.from(temp.childNodes)
      .map(walk)
      .join('')
      .replace(/\u00A0/g, ' ')
      .replace(/\r\n?/g, '\n')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\n+$/g, '');
  }

  function htmlToMarkdown(html = '') {
    const temp = document.createElement('div');
    temp.innerHTML = sanitizeRichText(html);

    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) return node.textContent || '';
      if (node.nodeType !== Node.ELEMENT_NODE) return '';

      const tag = node.tagName.toLowerCase();
      const children = Array.from(node.childNodes).map(walk).join('');

      if (tag === 'strong' || tag === 'b') return `**${children}**`;
      if (tag === 'em' || tag === 'i') return `*${children}*`;
      if (tag === 'u') return children;
      if (tag === 'del' || tag === 's') return `~~${children}~~`;
      if (tag === 'br') return '\n';
      if (/^h[1-6]$/.test(tag)) {
        const level = Number(tag[1]);
        return `${'#'.repeat(level)} ${children.trim()}\n\n`;
      }
      if (tag === 'p' || tag === 'div') return `${children.trim()}\n\n`;
      if (tag === 'li') return `- ${children.trim()}\n`;
      if (tag === 'ul' || tag === 'ol') return `${children}\n`;
      if (tag === 'a') {
        const href = node.getAttribute('href') || '';
        return href ? `[${children || href}](${href})` : children;
      }
      if (tag === 'table') {
        const rows = Array.from(node.querySelectorAll('tr')).map(tr => {
          const cells = Array.from(tr.children).map(cell => getPlainTextFromHtml(cell.innerHTML || '').trim());
          return `| ${cells.join(' | ')} |`;
        });
        return rows.length ? `${rows.join('\n')}\n\n` : '';
      }
      return children;
    };

    return walk(temp).replace(/\n{3,}/g, '\n\n').trim();
  }

  function triggerDownload(filename, content, mimeType = 'text/plain;charset=utf-8') {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  const DOCX_MIME_TYPES = new Set([
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/x-vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]);

  function getFileExtension(fileName = '') {
    const safeName = String(fileName || '').split(/[?#]/)[0];
    const lastDotIndex = safeName.lastIndexOf('.');
    return lastDotIndex > -1 ? safeName.slice(lastDotIndex + 1).toLowerCase() : '';
  }

  function stripFileExtension(fileName = '') {
    const safeName = String(fileName || '');
    const lastDotIndex = safeName.lastIndexOf('.');
    return lastDotIndex > 0 ? safeName.slice(0, lastDotIndex) : safeName;
  }

  function isSafeUrl(url = '') {
    return /^(https?:|mailto:|tel:|#)/i.test(String(url || '').trim());
  }

  function isTextLikeFile(fileLike) {
    const type = String(fileLike?.type || fileLike?.fileType || '').toLowerCase();
    const ext = getFileExtension(fileLike?.name || fileLike?.fileName || '');
    return type.startsWith('text/') || type === 'application/json' || ['md', 'txt', 'csv', 'json', 'xml', 'html', 'htm'].includes(ext);
  }

  function isDocxFileLike(fileLike) {
    const type = String(fileLike?.type || fileLike?.fileType || '').toLowerCase();
    const ext = getFileExtension(fileLike?.name || fileLike?.fileName || '');
    return DOCX_MIME_TYPES.has(type) || ext === 'docx';
  }

  function isLegacyWordFile(fileLike) {
    const type = String(fileLike?.type || fileLike?.fileType || '').toLowerCase();
    const ext = getFileExtension(fileLike?.name || fileLike?.fileName || '');
    return type === 'application/msword' || ext === 'doc';
  }

  function isEditableWordDocument(fileLike) {
    return Boolean(fileLike && (fileLike.sourceFormat === 'docx' || isDocxFileLike(fileLike)));
  }

  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => resolve(String(event.target?.result || ''));
      reader.onerror = () => reject(reader.error || new Error("No s'ha pogut llegir el fitxer."));
      reader.readAsText(file);
    });
  }

  function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => resolve(event.target?.result);
      reader.onerror = () => reject(reader.error || new Error("No s'ha pogut llegir el fitxer."));
      reader.readAsArrayBuffer(file);
    });
  }

  function getXmlChildren(parent, localName) {
    if (!parent) return [];
    return Array.from(parent.childNodes).filter(node => node.nodeType === Node.ELEMENT_NODE && node.localName === localName);
  }

  function getXmlFirstChild(parent, localName) {
    return getXmlChildren(parent, localName)[0] || null;
  }

  function getXmlAttribute(node, localName) {
    if (!node || !node.attributes) return '';
    const attr = Array.from(node.attributes).find(attribute => attribute.localName === localName || attribute.name === localName);
    return attr ? attr.value : '';
  }

  function parseDocxRelationships(xmlText = '') {
    if (!xmlText) return new Map();
    const xml = new DOMParser().parseFromString(xmlText, 'application/xml');
    const relationships = new Map();

    getXmlChildren(xml.documentElement, 'Relationship').forEach(relNode => {
      const id = getXmlAttribute(relNode, 'Id');
      const target = getXmlAttribute(relNode, 'Target');
      if (id && target) relationships.set(id, target);
    });

    return relationships;
  }

  function parseDocxNumbering(xmlText = '') {
    if (!xmlText) return { nums: new Map(), abstracts: new Map() };
    const xml = new DOMParser().parseFromString(xmlText, 'application/xml');
    const abstracts = new Map();
    const nums = new Map();

    getXmlChildren(xml.documentElement, 'abstractNum').forEach(abstractNode => {
      const abstractId = getXmlAttribute(abstractNode, 'abstractNumId');
      const levelMap = new Map();

      getXmlChildren(abstractNode, 'lvl').forEach(levelNode => {
        const levelValue = getXmlAttribute(levelNode, 'ilvl') || '0';
        const numFmtNode = getXmlFirstChild(levelNode, 'numFmt');
        levelMap.set(levelValue, getXmlAttribute(numFmtNode, 'val') || 'bullet');
      });

      if (abstractId) abstracts.set(abstractId, levelMap);
    });

    getXmlChildren(xml.documentElement, 'num').forEach(numNode => {
      const numId = getXmlAttribute(numNode, 'numId');
      const abstractRefNode = getXmlFirstChild(numNode, 'abstractNumId');
      if (numId) nums.set(numId, getXmlAttribute(abstractRefNode, 'val'));
    });

    return { nums, abstracts };
  }

  function getDocxListType(numPrNode, numberingMeta) {
    if (!numPrNode) return '';
    const numId = getXmlAttribute(getXmlFirstChild(numPrNode, 'numId'), 'val');
    const ilvl = getXmlAttribute(getXmlFirstChild(numPrNode, 'ilvl'), 'val') || '0';
    const abstractId = numberingMeta?.nums?.get(numId);
    const numFmt = numberingMeta?.abstracts?.get(abstractId)?.get(ilvl) || numberingMeta?.abstracts?.get(abstractId)?.get('0') || 'bullet';
    return /^(decimal|upperRoman|lowerRoman|upperLetter|lowerLetter)$/i.test(numFmt) ? 'ol' : 'ul';
  }

  function getDocxHexColor(rawValue = '') {
    const value = String(rawValue || '').trim();
    if (!value || /^(?:auto|none)$/i.test(value)) return '';
    return /^[0-9a-f]{6}$/i.test(value) ? `#${value.toLowerCase()}` : '';
  }

  function getDocxWidthPercent(widthValue, totalWidth) {
    const width = Number(widthValue);
    const total = Number(totalWidth);
    if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(total) || total <= 0) return '';
    const percent = Math.max(0, Math.min(100, (width / total) * 100));
    return `${percent.toFixed(1).replace(/\.0$/, '')}%`;
  }

  function getDocxTableAlignmentStyle(tablePrNode) {
    const jcValue = (getXmlAttribute(getXmlFirstChild(tablePrNode, 'jc'), 'val') || '').trim().toLowerCase();
    if (jcValue === 'center') return 'margin-left: auto; margin-right: auto';
    if (jcValue === 'right') return 'margin-left: auto; margin-right: 0';
    return 'margin-left: 0; margin-right: auto';
  }

  function getDocxParagraphTextAlign(pPrNode) {
    const jcValue = (getXmlAttribute(getXmlFirstChild(pPrNode, 'jc'), 'val') || '').trim().toLowerCase();
    if (jcValue === 'both' || jcValue === 'distribute') return 'justify';
    if (['left', 'center', 'right', 'justify'].includes(jcValue)) return jcValue;
    return '';
  }

  function getDocxCellVerticalAlign(tcPrNode) {
    const value = (getXmlAttribute(getXmlFirstChild(tcPrNode, 'vAlign'), 'val') || '').trim().toLowerCase();
    if (value === 'center') return 'middle';
    if (['top', 'middle', 'bottom'].includes(value)) return value;
    return '';
  }

  function isDocxCellFullyBold(cellNode) {
    let hasText = false;
    let hasNonBoldText = false;

    cellNode.querySelectorAll('w\\:r, r').forEach(runNode => {
      const text = Array.from(runNode.childNodes)
        .filter(child => child.nodeType === Node.ELEMENT_NODE && child.localName === 't')
        .map(child => child.textContent || '')
        .join('');

      if (!text.trim()) return;
      hasText = true;
      const rPrNode = getXmlFirstChild(runNode, 'rPr');
      if (!getXmlFirstChild(rPrNode, 'b')) {
        hasNonBoldText = true;
      }
    });

    return hasText && !hasNonBoldText;
  }

  function isDocxHeaderRow(rowNode) {
    const cells = getXmlChildren(rowNode, 'tc');
    return cells.length > 0 && cells.every(isDocxCellFullyBold);
  }

  function wrapInlineHtml(html, tagName) {
    if (!html) return '';
    return `<${tagName}>${html}</${tagName}>`;
  }

  function renderDocxRun(runNode) {
    let html = '';

    Array.from(runNode.childNodes).forEach(child => {
      if (child.nodeType !== Node.ELEMENT_NODE) return;
      if (child.localName === 't') {
        html += escapeHtml(child.textContent || '');
      } else if (child.localName === 'tab') {
        html += '&emsp;';
      } else if (child.localName === 'br' || child.localName === 'cr') {
        html += '<br>';
      }
    });

    const rPrNode = getXmlFirstChild(runNode, 'rPr');
    if (!rPrNode) return html;

    if (getXmlFirstChild(rPrNode, 'b')) html = wrapInlineHtml(html, 'strong');
    if (getXmlFirstChild(rPrNode, 'i')) html = wrapInlineHtml(html, 'em');

    const underlineNode = getXmlFirstChild(rPrNode, 'u');
    if (underlineNode && getXmlAttribute(underlineNode, 'val') !== 'none') {
      html = wrapInlineHtml(html, 'u');
    }

    if (getXmlFirstChild(rPrNode, 'strike') || getXmlFirstChild(rPrNode, 'dstrike')) {
      html = wrapInlineHtml(html, 'del');
    }

    const vertAlign = getXmlAttribute(getXmlFirstChild(rPrNode, 'vertAlign'), 'val');
    if (vertAlign === 'superscript') html = wrapInlineHtml(html, 'sup');
    if (vertAlign === 'subscript') html = wrapInlineHtml(html, 'sub');

    return html;
  }

  function renderDocxHyperlink(hyperlinkNode, relationships) {
    const innerHtml = Array.from(hyperlinkNode.childNodes)
      .map(child => child.nodeType === Node.ELEMENT_NODE && child.localName === 'r' ? renderDocxRun(child) : '')
      .join('');

    const relId = getXmlAttribute(hyperlinkNode, 'id');
    const href = relationships.get(relId) || '';
    if (!href || !isSafeUrl(href)) return innerHtml;

    return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${innerHtml || escapeHtml(href)}</a>`;
  }

  function renderDocxParagraph(paragraphNode, relationships, numberingMeta) {
    const pPrNode = getXmlFirstChild(paragraphNode, 'pPr');
    const listType = getDocxListType(getXmlFirstChild(pPrNode, 'numPr'), numberingMeta);
    const pStyleNode = getXmlFirstChild(pPrNode, 'pStyle');
    const styleValue = (getXmlAttribute(pStyleNode, 'val') || '').trim();

    let innerHtml = '';
    Array.from(paragraphNode.childNodes).forEach(child => {
      if (child.nodeType !== Node.ELEMENT_NODE) return;
      if (child.localName === 'r') {
        innerHtml += renderDocxRun(child);
      } else if (child.localName === 'hyperlink') {
        innerHtml += renderDocxHyperlink(child, relationships);
      }
    });

    if (!innerHtml) innerHtml = '<br>';

    if (listType) {
      return { kind: 'list-item', listType, html: `<li>${innerHtml}</li>` };
    }

    const headingMatch = styleValue.match(/^Heading([1-6])$/i);
    if (headingMatch) {
      const level = Math.min(6, Math.max(1, Number(headingMatch[1])));
      return { kind: 'block', html: `<h${level}>${innerHtml}</h${level}>` };
    }

    if (/^Title$/i.test(styleValue)) {
      return { kind: 'block', html: `<h1>${innerHtml}</h1>` };
    }

    if (/^Subtitle$/i.test(styleValue)) {
      return { kind: 'block', html: `<h2>${innerHtml}</h2>` };
    }

    return { kind: 'block', html: `<p>${innerHtml}</p>` };
  }

  function renderDocxBlockNodes(nodes, relationships, numberingMeta) {
    const blocks = [];
    let activeListType = '';
    let pendingListItems = [];

    const flushList = () => {
      if (!activeListType || pendingListItems.length === 0) return;
      blocks.push(`<${activeListType}>${pendingListItems.join('')}</${activeListType}>`);
      activeListType = '';
      pendingListItems = [];
    };

    Array.from(nodes || []).forEach(child => {
      if (!child || child.nodeType !== Node.ELEMENT_NODE) return;

      if (child.localName === 'p') {
        const rendered = renderDocxParagraph(child, relationships, numberingMeta);
        if (rendered.kind === 'list-item') {
          if (activeListType && activeListType !== rendered.listType) flushList();
          activeListType = rendered.listType;
          pendingListItems.push(rendered.html);
        } else {
          flushList();
          blocks.push(rendered.html);
        }
        return;
      }

      if (child.localName === 'tbl') {
        flushList();
        const nestedTableHtml = renderDocxTable(child, relationships, numberingMeta);
        if (nestedTableHtml) blocks.push(nestedTableHtml);
      }
    });

    flushList();
    return blocks;
  }

  function renderDocxTable(tableNode, relationships, numberingMeta) {
    const rows = getXmlChildren(tableNode, 'tr');
    if (!rows.length) return '';

    const tablePrNode = getXmlFirstChild(tableNode, 'tblPr');
    const tableGridNode = getXmlFirstChild(tableNode, 'tblGrid');
    const gridWidths = getXmlChildren(tableGridNode, 'gridCol')
      .map(colNode => Number(getXmlAttribute(colNode, 'w')))
      .filter(value => Number.isFinite(value) && value > 0);
    const totalGridWidth = gridWidths.reduce((sum, value) => sum + value, 0);
    const tableWidthValue = Number(getXmlAttribute(getXmlFirstChild(tablePrNode, 'tblW'), 'w'));
    const totalWidth = totalGridWidth || (Number.isFinite(tableWidthValue) && tableWidthValue > 0 ? tableWidthValue : 0);
    const tableStyles = ['width: 100%'];
    const alignmentStyle = getDocxTableAlignmentStyle(tablePrNode);
    if (alignmentStyle) tableStyles.push(alignmentStyle);
    if (getXmlAttribute(getXmlFirstChild(tablePrNode, 'tblLayout'), 'type') === 'fixed') {
      tableStyles.push('table-layout: fixed');
    }

    const firstRowIsHeader = isDocxHeaderRow(rows[0]);
    const renderedRows = rows.map((rowNode, rowIndex) => {
      let gridCursor = 0;
      const cellsHtml = getXmlChildren(rowNode, 'tc').map(cellNode => {
        const cellPrNode = getXmlFirstChild(cellNode, 'tcPr');
        const gridSpan = Math.max(1, Number(getXmlAttribute(getXmlFirstChild(cellPrNode, 'gridSpan'), 'val')) || 1);
        const explicitWidth = Number(getXmlAttribute(getXmlFirstChild(cellPrNode, 'tcW'), 'w'));
        const spannedGridWidth = gridWidths.slice(gridCursor, gridCursor + gridSpan).reduce((sum, value) => sum + value, 0);
        const cellWidth = explicitWidth > 0 ? explicitWidth : spannedGridWidth;
        const widthPercent = getDocxWidthPercent(cellWidth, totalWidth);
        const shadeColor = getDocxHexColor(getXmlAttribute(getXmlFirstChild(cellPrNode, 'shd'), 'fill'));
        const verticalAlign = getDocxCellVerticalAlign(cellPrNode);
        const firstParagraph = getXmlChildren(cellNode, 'p')[0] || null;
        const textAlign = getDocxParagraphTextAlign(getXmlFirstChild(firstParagraph, 'pPr'));
        const cellBlocks = renderDocxBlockNodes(cellNode.childNodes, relationships, numberingMeta);
        const cellContent = cellBlocks.join('') || '<p><br></p>';
        const styleParts = [];
        if (widthPercent) styleParts.push(`width: ${widthPercent}`);
        if (shadeColor) styleParts.push(`background-color: ${shadeColor}`);
        if (textAlign) styleParts.push(`text-align: ${textAlign}`);
        if (verticalAlign) styleParts.push(`vertical-align: ${verticalAlign}`);

        const tagName = firstRowIsHeader && rowIndex === 0 ? 'th' : 'td';
        const attrs = [];
        if (gridSpan > 1) attrs.push(`colspan="${gridSpan}"`);
        if (styleParts.length) attrs.push(`style="${styleParts.join('; ')}"`);
        gridCursor += gridSpan;

        return `<${tagName}${attrs.length ? ` ${attrs.join(' ')}` : ''}>${cellContent}</${tagName}>`;
      }).join('');

      return `<tr>${cellsHtml}</tr>`;
    });

    if (firstRowIsHeader) {
      const [headerRow, ...bodyRows] = renderedRows;
      const bodyHtml = bodyRows.length ? `<tbody>${bodyRows.join('')}</tbody>` : '';
      return `<table style="${tableStyles.join('; ')}"><thead>${headerRow}</thead>${bodyHtml}</table>`;
    }

    return `<table style="${tableStyles.join('; ')}"><tbody>${renderedRows.join('')}</tbody></table>`;
  }

  function fallbackDocxToHtml(documentXml, relationships, numberingMeta) {
    const xml = new DOMParser().parseFromString(documentXml, 'application/xml');
    if (xml.querySelector('parsererror')) {
      throw new Error('El document DOCX no es pot interpretar correctament.');
    }

    const bodyNode = getXmlFirstChild(xml.documentElement, 'body');
    if (!bodyNode) return '<p></p>';

    const blocks = renderDocxBlockNodes(bodyNode.childNodes, relationships, numberingMeta);
    return sanitizeRichText(blocks.join('') || '<p></p>');
  }

  async function convertDocxToHtml(file) {
    const arrayBuffer = await readFileAsArrayBuffer(file);

    if (typeof mammoth !== 'undefined' && mammoth && typeof mammoth.convertToHtml === 'function') {
      const result = await mammoth.convertToHtml({ arrayBuffer });
      return sanitizeRichText(result?.value || '<p></p>');
    }

    if (typeof JSZip === 'undefined') {
      throw new Error("No s'ha pogut activar el lector de documents Word.");
    }

    const zip = await JSZip.loadAsync(arrayBuffer);
    const documentXmlFile = zip.file('word/document.xml');
    if (!documentXmlFile) {
      throw new Error('Aquest document Word no conté un XML de text vàlid.');
    }

    const [documentXml, relationshipsXml, numberingXml] = await Promise.all([
      documentXmlFile.async('string'),
      zip.file('word/_rels/document.xml.rels') ? zip.file('word/_rels/document.xml.rels').async('string') : Promise.resolve(''),
      zip.file('word/numbering.xml') ? zip.file('word/numbering.xml').async('string') : Promise.resolve('')
    ]);

    return fallbackDocxToHtml(documentXml, parseDocxRelationships(relationshipsXml), parseDocxNumbering(numberingXml));
  }

  async function prepareUploadPayload(file) {
    const title = stripFileExtension(file.name);

    if (isTextLikeFile(file)) {
      return {
        title,
        content: formatPlainTextAsHtml(await readFileAsText(file)),
        fileBlob: null,
        fileType: '',
        fileName: '',
        fileSize: 0,
        sourceFormat: ''
      };
    }

    if (isDocxFileLike(file)) {
      return {
        title,
        content: await convertDocxToHtml(file),
        fileBlob: file,
        fileType: file.type || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        fileName: file.name,
        fileSize: Number(file.size || 0),
        sourceFormat: 'docx'
      };
    }

    return {
      title,
      content: '',
      fileBlob: file,
      fileType: file.type || '',
      fileName: file.name || '',
      fileSize: Number(file.size || 0),
      sourceFormat: isLegacyWordFile(file) ? 'doc' : ''
    };
  }

  function getEditDraftKey(id) {
    return `${EDIT_DRAFT_PREFIX}${id}`;
  }

  function getEditorPlainText(editorEl) {
    return (editorEl.textContent || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
  }

  function getEditorMultilineText(editorEl) {
    if (!editorEl) return '';
    const raw = htmlToEditorMultilineText(editorEl.innerHTML || '');
    return raw.replace(/\u00A0/g, ' ').replace(/\r\n?/g, '\n');
  }

  function forceRichEditorEditable() {
    if (!editContentInput) return;
    editContentInput.setAttribute('contenteditable', 'true');
    editContentInput.contentEditable = 'true';
    editContentInput.spellcheck = true;
    editContentInput.style.pointerEvents = 'auto';
    editContentInput.style.userSelect = 'text';
    editContentInput.style.webkitUserModify = 'read-write';
  }

  function syncPlainEditorFromRich() {
    if (!editContentPlainInput) return;
    editContentPlainInput.value = getEditorMultilineText(editContentInput);
  }

  function syncRichEditorFromPlain() {
    if (!editContentPlainInput) return;
    editContentInput.innerHTML = formatPlainTextAsHtml(editContentPlainInput.value || '');
    forceRichEditorEditable();
  }

  function getActiveEditorPlainText() {
    if (editorCompatMode && editContentPlainInput && !editContentPlainInput.classList.contains('hidden')) {
      return (editContentPlainInput.value || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
    }
    return getEditorPlainText(editContentInput);
  }

  function getActiveEditorHtml() {
    if (editorCompatMode && editContentPlainInput && !editContentPlainInput.classList.contains('hidden')) {
      return formatPlainTextAsHtml(editContentPlainInput.value || '');
    }
    return getSanitizedEditorHtml(editContentInput);
  }

  function setEditorDocumentContent(html = '') {
    editContentInput.innerHTML = sanitizeRichText(html || '');
    forceRichEditorEditable();
    syncPlainEditorFromRich();
    updateEditorMetrics();
    refreshEditorOutline();
    refreshEditorSearchHighlights();
  }

  function setEditorCompatMode(enabled, options = {}) {
    if (!editContentPlainInput || !editorShellEl) return;
    const shouldEnable = Boolean(enabled && !editContentGroup.classList.contains('hidden') && mediaPreviewGroup?.classList.contains('hidden'));
    if (shouldEnable) {
      syncPlainEditorFromRich();
      closeEditorSearchPanel();
      setEditorFocusMode(false);
    } else if (editorCompatMode) {
      syncRichEditorFromPlain();
    }
    editorCompatMode = shouldEnable;
    editorShellEl.classList.toggle('editor-plain-mode', editorCompatMode);
    editContentInput.classList.toggle('hidden', editorCompatMode);
    editContentPlainInput.classList.toggle('hidden', !editorCompatMode);
    editorToolbarEl?.classList.toggle('hidden', editorCompatMode);
    editorEnhancementsEl?.classList.toggle('hidden', editorCompatMode);
    editorCompatBannerEl?.classList.toggle('hidden', !editorCompatMode);
    if (editorCompatToggleBtn) {
      editorCompatToggleBtn.textContent = editorCompatMode ? 'Mode ric' : 'Mode text simple';
      editorCompatToggleBtn.classList.toggle('active', editorCompatMode);
    }
    [editorSearchBtn, editorFocusBtn].forEach(btn => {
      if (!btn) return;
      btn.disabled = editorCompatMode;
      btn.classList.toggle('disabled', editorCompatMode);
      btn.title = editorCompatMode ? 'No disponible en mode text simple' : '';
    });
    updateEditorMetrics();
    if (options.keepFocus !== false) {
      requestAnimationFrame(() => {
        if (editorCompatMode) {
          editContentPlainInput?.focus();
        } else {
          forceRichEditorEditable();
          editContentInput?.focus();
        }
      });
    }
    if (!options.silent) {
      showToast(editorCompatMode ? 'Mode text compatible activat.' : "Tornes al mode ric d'edició.", 'info');
    }
  }

  function updateEditorMetrics() {
    if (!editorWordCountEl) return;
    const plainText = getActiveEditorPlainText();
    const wordCount = plainText ? plainText.split(/\s+/).length : 0;
    const charCount = plainText.length;
    const readingMinutes = wordCount > 0 ? Math.max(1, Math.ceil(wordCount / 200)) : 0;
    const paraulaText = wordCount === 1 ? 'paraula' : 'paraules';
    const caracterText = charCount === 1 ? 'caràcter' : 'caràcters';
    const lecturaText = readingMinutes === 1 ? 'min lectura' : 'min lectura';
    editorWordCountEl.textContent = `${wordCount} ${paraulaText} · ${charCount} ${caracterText}`;
    if (editorReadingTimeEl) {
      editorReadingTimeEl.textContent = readingMinutes > 0 ? `${readingMinutes} ${lecturaText}` : '0 min lectura';
    }
  }

  function setEditorSaveStatus(message, state = 'idle') {
    if (!editorSaveStatusEl) return;
    editorSaveStatusEl.textContent = message;
    editorSaveStatusEl.dataset.state = state;
  }


  function unwrapElementPreservingChildren(element) {
    if (!element || !element.parentNode) return;
    const parent = element.parentNode;
    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }
    parent.removeChild(element);
  }

  function clearEditorSearchSelection() {
    const selection = window.getSelection?.();
    if (!selection || selection.rangeCount === 0) return;
    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;
    const isInsideEditor = (node) => node && (node === editContentInput || editContentInput?.contains(node.nodeType === Node.TEXT_NODE ? node.parentNode : node));
    if (isInsideEditor(anchorNode) || isInsideEditor(focusNode)) {
      selection.removeAllRanges();
    }
  }

  function clearEditorSearchHighlights() {
    if (!editContentInput) return;
    editContentInput.querySelectorAll('mark[data-bento-search]').forEach(unwrapElementPreservingChildren);
    clearEditorSearchSelection();
    editorSearchMatches = [];
    editorSearchCurrentIndex = -1;
  }

  function updateEditorSearchSummary(message = '') {
    if (!editorSearchSummaryEl) return;
    if (message) {
      editorSearchSummaryEl.textContent = message;
      return;
    }
    if (!editorSearchInput || !editorSearchInput.value.trim()) {
      editorSearchSummaryEl.textContent = 'Sense cerca activa';
      return;
    }
    if (!editorSearchMatches.length) {
      editorSearchSummaryEl.textContent = 'Cap coincidència';
      return;
    }
    const totalText = editorSearchMatches.length === 1 ? 'coincidència' : 'coincidències';
    editorSearchSummaryEl.textContent = `${editorSearchCurrentIndex + 1} de ${editorSearchMatches.length} ${totalText}`;
  }

  function getEditorSearchTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.length) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest('mark[data-bento-search]')) return NodeFilter.FILTER_REJECT;
        if (['SCRIPT', 'STYLE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    let current;
    while ((current = walker.nextNode())) nodes.push(current);
    return nodes;
  }

  function buildEditorSearchSegments(root) {
    const segments = [];
    let fullText = '';
    getEditorSearchTextNodes(root).forEach(node => {
      const text = String(node.nodeValue || '').replaceAll(' ', ' ');
      if (!text.length) return;
      segments.push({
        node,
        start: fullText.length,
        end: fullText.length + text.length,
        text
      });
      fullText += text;
    });
    return { segments, fullText };
  }

  function getEditorSearchMatchRange(match) {
    if (!match?.startNode || !match?.endNode) return null;
    const range = document.createRange();
    range.setStart(match.startNode, match.startOffset);
    range.setEnd(match.endNode, match.endOffset);
    return range;
  }

  function buildEditorSearchMatches(term) {
    const query = String(term || '').replaceAll(' ', ' ').trim();
    if (!query || !editContentInput) return [];

    const { segments, fullText } = buildEditorSearchSegments(editContentInput);
    if (!segments.length || !fullText) return [];

    const haystack = fullText.toLocaleLowerCase();
    const needle = query.toLocaleLowerCase();
    const matches = [];
    let fromIndex = 0;

    while (fromIndex <= haystack.length) {
      const startIndex = haystack.indexOf(needle, fromIndex);
      if (startIndex === -1) break;
      const endIndex = startIndex + needle.length;
      const startSeg = segments.find(seg => startIndex >= seg.start && startIndex < seg.end);
      const endSeg = segments.find(seg => (endIndex - 1) >= seg.start && (endIndex - 1) < seg.end);
      if (startSeg && endSeg) {
        matches.push({
          startNode: startSeg.node,
          startOffset: startIndex - startSeg.start,
          endNode: endSeg.node,
          endOffset: endIndex - endSeg.start,
          text: fullText.slice(startIndex, endIndex)
        });
      }
      fromIndex = startIndex + Math.max(needle.length, 1);
    }

    return matches;
  }

  function setCurrentEditorSearchMatch(index) {
    if (!editorSearchMatches.length) {
      editorSearchCurrentIndex = -1;
      clearEditorSearchSelection();
      updateEditorSearchSummary();
      return;
    }
    editorSearchCurrentIndex = ((index % editorSearchMatches.length) + editorSearchMatches.length) % editorSearchMatches.length;
    const currentMatch = editorSearchMatches[editorSearchCurrentIndex];
    const range = getEditorSearchMatchRange(currentMatch);
    if (range) {
      const selection = window.getSelection?.();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      const scrollTarget = currentMatch.startNode?.parentElement || editContentInput;
      scrollTarget?.scrollIntoView?.({ block: 'center', behavior: 'smooth' });
    }
    updateEditorSearchSummary();
  }

  function highlightEditorSearch(term) {
    clearEditorSearchHighlights();
    const normalizedTerm = String(term || '').replaceAll(' ', ' ').trim();
    if (!normalizedTerm) {
      updateEditorSearchSummary('Sense cerca activa');
      return 0;
    }

    editorSearchMatches = buildEditorSearchMatches(normalizedTerm);

    if (editorSearchMatches.length) {
      setCurrentEditorSearchMatch(0);
    } else {
      updateEditorSearchSummary('Cap coincidència');
    }

    return editorSearchMatches.length;
  }

  function refreshEditorSearchHighlights() {
    if (!editorSearchPanel || editorSearchPanel.classList.contains('hidden')) {
      clearEditorSearchHighlights();
      updateEditorSearchSummary();
      return;
    }
    highlightEditorSearch(editorSearchInput?.value || '');
  }

  function openEditorSearchPanel(focusInput = false) {
    if (editorCompatMode) {
      showToast('La cerca avançada no està disponible en mode text simple. Torna al mode ric per fer servir Cerca i reemplaça.', 'info');
      return;
    }
    if (!editorSearchPanel) return;
    editorSearchPanel.classList.remove('hidden');
    editorSearchBtn?.classList.add('active');
    refreshEditorSearchHighlights();
    if (focusInput) editorSearchInput?.focus();
  }

  function closeEditorSearchPanel() {
    if (!editorSearchPanel) return;
    editorSearchPanel.classList.add('hidden');
    editorSearchBtn?.classList.remove('active');
    clearEditorSearchHighlights();
    updateEditorSearchSummary('Sense cerca activa');
  }

  function replaceCurrentEditorSearchMatch() {
    if (!editorSearchMatches.length || editorSearchCurrentIndex < 0) return false;
    const match = editorSearchMatches[editorSearchCurrentIndex];
    const range = getEditorSearchMatchRange(match);
    if (!range) return false;
    const replacement = editorReplaceInput?.value || '';
    range.deleteContents();
    const replacementNode = document.createTextNode(replacement);
    range.insertNode(replacementNode);
    clearEditorSearchSelection();
    editContentInput.normalize();
    refreshEditorSearchHighlights();
    updateEditorMetrics();
    refreshEditorOutline();
    scheduleEditAutosave();
    return true;
  }

  function replaceAllEditorSearchMatches() {
    const term = editorSearchInput?.value || '';
    const matches = buildEditorSearchMatches(term);
    if (!matches.length) return 0;
    const replacement = editorReplaceInput?.value || '';
    matches.slice().reverse().forEach(match => {
      const range = getEditorSearchMatchRange(match);
      if (!range) return;
      range.deleteContents();
      range.insertNode(document.createTextNode(replacement));
    });
    const replacedCount = matches.length;
    clearEditorSearchSelection();
    editContentInput.normalize();
    refreshEditorSearchHighlights();
    updateEditorMetrics();
    refreshEditorOutline();
    scheduleEditAutosave();
    return replacedCount;
  }

  function refreshEditorOutline() {
    if (!editorOutlineListEl || !editorOutlineEmptyEl || !editorOutlineCountEl) return;
    const headings = Array.from(editContentInput.querySelectorAll('h1, h2, h3')).filter(el => (el.textContent || '').trim());
    editorOutlineListEl.innerHTML = '';
    editorOutlineCountEl.textContent = String(headings.length);
    editorOutlineEmptyEl.classList.toggle('hidden', headings.length > 0);

    headings.forEach((heading, index) => {
      heading.dataset.outlineId = heading.dataset.outlineId || `outline-${index + 1}`;
      const item = document.createElement('li');
      item.className = `editor-outline-item level-${heading.tagName.toLowerCase()}`;
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.targetOutlineId = heading.dataset.outlineId;
      button.innerHTML = `<span>${escapeHtml((heading.textContent || '').trim())}</span><small>${heading.tagName.toUpperCase()}</small>`;
      item.appendChild(button);
      editorOutlineListEl.appendChild(item);
    });
  }

  function setEditorFocusMode(enabled) {
    editorFocusMode = Boolean(enabled);
    editModal.classList.toggle('editor-focus-mode', editorFocusMode);
    editorFocusBtn?.classList.toggle('active', editorFocusMode);
    if (editorFocusBtn) editorFocusBtn.textContent = editorFocusMode ? 'Sortir focus' : 'Mode focus';
  }

  function resetEditorAssistantState() {
    closeEditorSearchPanel();
    setEditorFocusMode(false);
    refreshEditorOutline();
  }

  function getSavedSnapshotForItem(item) {
    if (!item) return null;
    if (item.type === 'folder') {
      return {
        type: 'folder',
        title: item.title || '',
        desc: item.desc || '',
        color: item.color || '#0ea5e9',
        tags: getItemTags(item)
      };
    }

    return {
      type: 'document',
      title: item.title || '',
      category: item.category || '',
      tags: getItemTags(item),
      content: sanitizeRichText(item.content || '')
    };
  }

  function getCurrentEditSnapshot() {
    if (!editingDocId) return null;
    const item = docs.find(d => d.id === editingDocId);
    if (!item) return null;

    if (item.type === 'folder') {
      return {
        type: 'folder',
        title: editNameInput.value.trim(),
        desc: editFolderDescInput.value.trim(),
        color: editFolderColorInput.value || '#0ea5e9',
        tags: parseTagsInput(editTagsInput?.value || '')
      };
    }

    const content = !editContentGroup.classList.contains('hidden')
      ? getActiveEditorHtml()
      : sanitizeRichText(item.content || '');

    return {
      type: 'document',
      title: editNameInput.value.trim(),
      category: editCategorySelect.value || '',
      tags: parseTagsInput(editTagsInput?.value || ''),
      content
    };
  }

  function getSnapshotSignature(snapshot) {
    return JSON.stringify(snapshot || {});
  }

  function getDraftTimestampLabel(timestamp) {
    if (!timestamp) return 'fa un moment';
    const diffMs = Math.max(0, Date.now() - new Date(timestamp).getTime());
    const diffSec = Math.round(diffMs / 1000);
    if (diffSec < 5) return 'ara mateix';
    if (diffSec < 60) return `fa ${diffSec} s`;
    const diffMin = Math.round(diffSec / 60);
    if (diffMin < 60) return `fa ${diffMin} min`;
    const diffHour = Math.round(diffMin / 60);
    return `fa ${diffHour} h`;
  }

  function persistEditDraft(force = false) {
    if (!editingDocId) return false;
    const currentSnapshot = getCurrentEditSnapshot();
    if (!currentSnapshot) return false;

    const currentSignature = getSnapshotSignature(currentSnapshot);
    if (!force && currentSignature === lastSavedEditSignature) {
      localStorage.removeItem(getEditDraftKey(editingDocId));
      lastDraftSignature = '';
      setEditorSaveStatus('Tot desat', 'saved');
      return false;
    }

    if (!force && currentSignature === lastDraftSignature) return false;

    const payload = {
      docId: editingDocId,
      updatedAt: new Date().toISOString(),
      snapshot: currentSnapshot
    };

    localStorage.setItem(getEditDraftKey(editingDocId), JSON.stringify(payload));
    lastDraftSignature = currentSignature;
    setEditorSaveStatus(`Esborrany autosalvat ${getDraftTimestampLabel(payload.updatedAt)}`, 'draft');
    return true;
  }

  function flushPendingEditAutosave() {
    if (editAutosaveTimer) {
      clearTimeout(editAutosaveTimer);
      editAutosaveTimer = null;
    }

    if (!editingDocId || editModal.classList.contains('hidden')) return;

    const currentSnapshot = getCurrentEditSnapshot();
    const currentSignature = getSnapshotSignature(currentSnapshot);

    if (currentSignature === lastSavedEditSignature) {
      clearEditDraft(editingDocId);
      setEditorSaveStatus('Tot desat', 'saved');
      return;
    }

    persistEditDraft(true);
  }

  function scheduleEditAutosave() {
    if (!editingDocId) return;
    if (editAutosaveTimer) clearTimeout(editAutosaveTimer);
    setEditorSaveStatus('Canvis pendents…', 'dirty');
    editAutosaveTimer = setTimeout(() => {
      editAutosaveTimer = null;
      try {
        persistEditDraft();
      } catch (err) {
        console.warn("No s'ha pogut autosalvar l'esborrany", err);
        setEditorSaveStatus("No s'ha pogut autosalvar", 'error');
      }
    }, EDIT_AUTOSAVE_DELAY);
  }

  function clearEditDraft(itemId) {
    if (!itemId) return;
    localStorage.removeItem(getEditDraftKey(itemId));
    if (editingDocId === itemId) {
      lastDraftSignature = '';
    }
  }

  function restoreEditDraftIfAvailable(item) {
    if (!item) return false;

    const rawDraft = localStorage.getItem(getEditDraftKey(item.id));
    if (!rawDraft) return false;

    const parsedDraft = safeJSONParse(rawDraft, null);
    if (!parsedDraft || !parsedDraft.snapshot) return false;

    const savedSignature = getSnapshotSignature(getSavedSnapshotForItem(item));
    const draftSignature = getSnapshotSignature(parsedDraft.snapshot);
    lastSavedEditSignature = savedSignature;
    lastDraftSignature = draftSignature;

    if (draftSignature === savedSignature) {
      clearEditDraft(item.id);
      setEditorSaveStatus('Tot desat', 'saved');
      return false;
    }

    const draft = parsedDraft.snapshot;
    editNameInput.value = draft.title || item.title || '';

    if (item.type === 'folder') {
      editFolderDescInput.value = draft.desc || '';
      editFolderColorInput.value = draft.color || item.color || '#0ea5e9';
      if (editTagsInput) editTagsInput.value = formatTagsInput(draft.tags || item.tags || []);
    } else {
      editCategorySelect.value = draft.category || '';
      if (editTagsInput) editTagsInput.value = formatTagsInput(draft.tags || item.tags || []);
      if (!editContentGroup.classList.contains('hidden')) {
        setEditorDocumentContent(draft.content || '');
      }
    }

    setEditorSaveStatus(`Esborrany recuperat ${getDraftTimestampLabel(parsedDraft.updatedAt)}`, 'draft');
    return true;
  }

  function setEmptyState(type = 'default') {
    const state = EMPTY_STATES[type] || EMPTY_STATES.default;
    emptyStateEl.classList.remove('hidden');
    document.getElementById('emptyStateIcon').textContent = state.icon;
    document.getElementById('emptyStateTitle').textContent = state.title;
    document.getElementById('emptyStateDesc').textContent = state.desc;
  }

  function hideEmptyState() {
    emptyStateEl.classList.add('hidden');
  }

  function isRealBlob(value) {
    return !!value && typeof value === 'object' && typeof value.size === 'number' && typeof value.type === 'string';
  }

  function hasExternalFiles(dataTransfer) {
    if (!dataTransfer) return false;
    if (dataTransfer.items && dataTransfer.items.length > 0) {
      return Array.from(dataTransfer.items).some(item => item.kind === 'file');
    }
    if (dataTransfer.types && dataTransfer.types.length > 0) {
      return Array.from(dataTransfer.types).includes('Files');
    }
    return !!(dataTransfer.files && dataTransfer.files.length > 0);
  }

  function makeDocsSafeForLocalStorage(items) {
    return items.map(item => {
      const safeItem = { ...item };
      if (isRealBlob(safeItem.fileBlob)) {
        safeItem.fileBlob = null;
        safeItem.binaryFileUnavailable = true;
      }
      return safeItem;
    });
  }


  function getLightBackupSnapshotSignature(entry) {
    if (!entry || typeof entry !== 'object') return '';
    return JSON.stringify({
      docs: Array.isArray(entry.docs) ? makeDocsSafeForLocalStorage(normalizeDocs(entry.docs)) : [],
      expandedFolders: Array.isArray(entry.expandedFolders) ? entry.expandedFolders : []
    });
  }

  function normalizeLightBackupHistory(rawHistory) {
    if (!Array.isArray(rawHistory)) return [];
    const seen = new Set();
    return rawHistory
      .filter(entry => entry && typeof entry === 'object')
      .map(entry => ({
        id: typeof entry.id === 'string' && entry.id.trim() ? entry.id : generateId('backup'),
        createdAt: typeof entry.createdAt === 'string' && !Number.isNaN(Date.parse(entry.createdAt)) ? entry.createdAt : new Date().toISOString(),
        reason: typeof entry.reason === 'string' ? entry.reason : 'auto-save',
        docs: Array.isArray(entry.docs) ? makeDocsSafeForLocalStorage(normalizeDocs(entry.docs)) : [],
        expandedFolders: Array.isArray(entry.expandedFolders) ? entry.expandedFolders : []
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .filter(entry => {
        const signature = getLightBackupSnapshotSignature(entry);
        if (!signature || seen.has(signature)) return false;
        seen.add(signature);
        return true;
      })
      .slice(0, LIGHT_BACKUP_LIMIT);
  }

  function readSurvivalLightBackupHistory() {
    return normalizeLightBackupHistory(safeJSONParse(localStorage.getItem(SURVIVAL_LIGHT_BACKUP_HISTORY_KEY), []));
  }

  function writeSurvivalLightBackupHistory(history) {
    try {
      localStorage.setItem(SURVIVAL_LIGHT_BACKUP_HISTORY_KEY, JSON.stringify(normalizeLightBackupHistory(history)));
    } catch (err) {
      console.warn("No s'ha pogut actualitzar la còpia local de supervivència.", err);
    }
  }

  async function readLightBackupHistory() {
    const sources = [];
    if (getBackupStore()) {
      try {
        sources.push(await getBackupStore().getItem(LIGHT_BACKUP_HISTORY_KEY));
      } catch (err) {
        console.warn("No s'ha pogut llegir l'historial de còpies des d'IndexedDB.", err);
      }
    }
    sources.push(safeJSONParse(localStorage.getItem(LIGHT_BACKUP_HISTORY_KEY), []));
    sources.push(readSurvivalLightBackupHistory());
    return normalizeLightBackupHistory(sources.flat());
  }

  async function writeLightBackupHistory(history) {
    const normalizedHistory = normalizeLightBackupHistory(history);
    let storedInPrimary = false;

    if (getBackupStore()) {
      try {
        await getBackupStore().setItem(LIGHT_BACKUP_HISTORY_KEY, normalizedHistory);
        storedInPrimary = true;
        if (localStorage.getItem(LIGHT_BACKUP_HISTORY_KEY)) {
          localStorage.removeItem(LIGHT_BACKUP_HISTORY_KEY);
        }
      } catch (err) {
        console.warn("No s'ha pogut actualitzar l'historial a IndexedDB. Intentarem fer una còpia mínima local.", err);
      }
    }

    if (!storedInPrimary) {
      try {
        localStorage.setItem(LIGHT_BACKUP_HISTORY_KEY, JSON.stringify(normalizedHistory));
      } catch (err) {
        console.warn("No s'ha pogut actualitzar l'historial local de còpies de seguretat.", err);
      }
    }

    writeSurvivalLightBackupHistory(normalizedHistory);
  }

  function createLightBackupSnapshot(reason = 'auto-save') {
    return {
      id: generateId('backup'),
      createdAt: new Date().toISOString(),
      reason,
      docs: makeDocsSafeForLocalStorage(normalizeDocs(docs)).map(item => ({
        ...item,
        versions: item.type === 'document' ? normalizeVersions(item.versions).slice(0, 8) : []
      })),
      expandedFolders: normalizeExpandedFolders(expandedFolders, normalizeDocs(docs))
    };
  }

  async function saveLightBackupSnapshot(reason = 'auto-save') {
    const snapshot = createLightBackupSnapshot(reason);
    const history = await readLightBackupHistory();
    const signature = JSON.stringify({ docs: snapshot.docs, expandedFolders: snapshot.expandedFolders });
    const alreadyStored = history.some(entry => JSON.stringify({ docs: entry.docs, expandedFolders: entry.expandedFolders }) === signature);
    if (alreadyStored) return snapshot;
    await writeLightBackupHistory([snapshot, ...history].slice(0, LIGHT_BACKUP_LIMIT));
    return snapshot;
  }

  function normalizeRecoveryVaultSnapshot(rawSnapshot) {
    if (!rawSnapshot || typeof rawSnapshot !== 'object') return null;
    const rawPayload = rawSnapshot.payload && typeof rawSnapshot.payload === 'object' ? rawSnapshot.payload : null;
    const parsedPayload = rawPayload ? {
      ...rawPayload,
      docs: Array.isArray(rawPayload.docs) ? rawPayload.docs : [],
      expandedFolders: Array.isArray(rawPayload.expandedFolders) ? rawPayload.expandedFolders : []
    } : null;

    const createdAt = typeof rawSnapshot.createdAt === 'string' && !Number.isNaN(Date.parse(rawSnapshot.createdAt))
      ? rawSnapshot.createdAt
      : null;
    if (!createdAt || !parsedPayload) return null;

    const ageMs = Date.now() - new Date(createdAt).getTime();
    if (ageMs > RECOVERY_VAULT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000) return null;

    return {
      id: typeof rawSnapshot.id === 'string' && rawSnapshot.id.trim() ? rawSnapshot.id : generateId('recovery'),
      createdAt,
      reason: typeof rawSnapshot.reason === 'string' ? rawSnapshot.reason : 'safety-net',
      payload: parsedPayload
    };
  }

  function readSurvivalRecoveryVaultSnapshot() {
    return normalizeRecoveryVaultSnapshot(safeJSONParse(localStorage.getItem(SURVIVAL_RECOVERY_VAULT_KEY), null));
  }

  function writeSurvivalRecoveryVaultSnapshot(snapshot) {
    const normalizedSnapshot = normalizeRecoveryVaultSnapshot(snapshot);
    if (!normalizedSnapshot) return null;
    try {
      localStorage.setItem(SURVIVAL_RECOVERY_VAULT_KEY, JSON.stringify(normalizedSnapshot));
    } catch (err) {
      console.warn("No s'ha pogut actualitzar la volta local de supervivència.", err);
    }
    return normalizedSnapshot;
  }

  function pickNewestRecoveryVaultSnapshot(...snapshots) {
    return snapshots
      .filter(Boolean)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;
  }

  async function readRecoveryVaultSnapshot() {
    let indexedDbSnapshot = null;
    if (getBackupStore()) {
      try {
        indexedDbSnapshot = normalizeRecoveryVaultSnapshot(await getBackupStore().getItem(RECOVERY_VAULT_KEY));
      } catch (err) {
        console.warn("No s'ha pogut llegir la còpia de recuperació d'IndexedDB.", err);
      }
    }
    const legacyLocalSnapshot = normalizeRecoveryVaultSnapshot(safeJSONParse(localStorage.getItem(RECOVERY_VAULT_KEY), null));
    const survivalSnapshot = readSurvivalRecoveryVaultSnapshot();
    return pickNewestRecoveryVaultSnapshot(indexedDbSnapshot, legacyLocalSnapshot, survivalSnapshot);
  }

  async function writeRecoveryVaultSnapshot(snapshot) {
    const normalizedSnapshot = normalizeRecoveryVaultSnapshot(snapshot);
    if (!normalizedSnapshot) return null;

    let storedInPrimary = false;
    if (getBackupStore()) {
      try {
        await getBackupStore().setItem(RECOVERY_VAULT_KEY, normalizedSnapshot);
        storedInPrimary = true;
        if (localStorage.getItem(RECOVERY_VAULT_KEY)) {
          localStorage.removeItem(RECOVERY_VAULT_KEY);
        }
      } catch (err) {
        console.warn("No s'ha pogut desar la còpia de recuperació a IndexedDB.", err);
      }
    }

    if (!storedInPrimary) {
      try {
        localStorage.setItem(RECOVERY_VAULT_KEY, JSON.stringify(normalizedSnapshot));
      } catch (err) {
        console.warn("No s'ha pogut desar la còpia local de recuperació.", err);
      }
    }

    writeSurvivalRecoveryVaultSnapshot(normalizedSnapshot);
    return normalizedSnapshot;
  }

  async function createRecoveryVaultSnapshot(reason = 'safety-net') {
    const payload = await createFullBackupPayload(reason);
    return writeRecoveryVaultSnapshot({
      id: generateId('recovery'),
      createdAt: new Date().toISOString(),
      reason,
      payload
    });
  }

  async function prepareSafetySnapshotOrAbort(reason = 'safety-net', label = 'aquesta operació') {
    try {
      await createRecoveryVaultSnapshot(reason);
      await saveLightBackupSnapshot(reason);
      return true;
    } catch (err) {
      console.error(err);
      const message = isQuotaExceededError(err)
        ? `No s'ha pogut crear la còpia de recuperació perquè l'espai local disponible s'ha esgotat. L'operació per ${label} s'ha cancel·lat.`
        : `No s'ha pogut crear la còpia de recuperació abans de ${label}. L'operació s'ha cancel·lat.`;
      showToast(message, 'error');
      return false;
    }
  }

  function dataUrlToBlob(dataUrl, fallbackType = 'application/octet-stream') {
    if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) return null;
    const match = dataUrl.match(/^data:([^;,]+)?(;base64)?,(.*)$/);
    if (!match) return null;
    const mimeType = match[1] || fallbackType;
    const isBase64 = Boolean(match[2]);
    const payload = match[3] || '';
    const binaryString = isBase64 ? atob(payload) : decodeURIComponent(payload);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i += 1) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: mimeType });
  }

  function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      if (!isRealBlob(blob)) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null);
      reader.onerror = () => reject(reader.error || new Error("No s'ha pogut serialitzar el fitxer adjunt."));
      reader.readAsDataURL(blob);
    });
  }

  function formatSha256Digest(buffer) {
    const view = new Uint8Array(buffer || []);
    return `sha256:${Array.from(view).map(value => value.toString(16).padStart(2, '0')).join('')}`;
  }

  async function computeBlobChecksum(blob) {
    if (!isRealBlob(blob)) return '';
    if (window.crypto?.subtle?.digest) {
      const buffer = await blob.arrayBuffer();
      return formatSha256Digest(await window.crypto.subtle.digest('SHA-256', buffer));
    }
    return `fallback:${createFastStateHash(await blobToDataUrl(blob) || '')}`;
  }

  function normalizeChecksumValue(value = '') {
    return String(value || '').trim().toLowerCase();
  }

  async function validateRemoteAttachmentBlob(blob, attachment = {}) {
    if (!isRealBlob(blob)) {
      throw new Error("El binari remot no s'ha pogut reconstruir.");
    }
    const expectedSize = Number(attachment.fileSize || 0);
    if (expectedSize > 0 && blob.size !== expectedSize) {
      throw new Error(`L'adjunt remot ${attachment.fileName || 'sense nom'} no coincideix amb la mida esperada.`);
    }
    const expectedChecksum = normalizeChecksumValue(attachment.checksum || '');
    if (expectedChecksum) {
      const receivedChecksum = normalizeChecksumValue(await computeBlobChecksum(blob));
      if (expectedChecksum !== receivedChecksum) {
        throw new Error(`L'adjunt remot ${attachment.fileName || 'sense nom'} ha fallat la verificació d'integritat.`);
      }
    }
    return blob;
  }

  async function serializeDocsForFullBackup(items) {
    const normalizedItems = normalizeDocs(items);
    const result = [];
    for (const item of normalizedItems) {
      const exportItem = { ...item };
      if (isRealBlob(item.fileBlob)) {
        exportItem.fileBlobDataUrl = await blobToDataUrl(item.fileBlob);
      }
      delete exportItem.fileBlob;
      result.push(exportItem);
    }
    return result;
  }

  async function createFullBackupPayload(reason = 'manual-export') {
    return {
      schema: FULL_BACKUP_SCHEMA,
      version: FULL_BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      reason,
      app: 'Sutsumu',
      appVersion: APP_VERSION,
      appRelease: APP_RELEASE_LABEL,
      docs: await serializeDocsForFullBackup(docs),
      expandedFolders: normalizeExpandedFolders(expandedFolders, normalizeDocs(docs))
    };
  }

  function createBackupStats(payload) {
    const normalizedItems = normalizeDocs(payload?.docs || []);
    const folders = normalizedItems.filter(item => item.type === 'folder' && !item.isDeleted).length;
    const documents = normalizedItems.filter(item => item.type === 'document' && !item.isDeleted).length;
    const attachments = normalizedItems.filter(item => item.type === 'document' && !item.isDeleted && (item.fileName || item.fileType || item.fileBlobDataUrl || item.binaryFileUnavailable)).length;
    const deleted = normalizedItems.filter(item => item.isDeleted).length;
    const versions = normalizedItems.reduce((total, item) => total + (item.type === 'document' ? normalizeVersions(item.versions || []).length : 0), 0);
    return { folders, documents, attachments, deleted, versions };
  }

  function createBackupStateSignature(currentDocs = docs, currentExpandedFolders = expandedFolders) {
    const compactDocs = normalizeDocs(currentDocs).map(item => ({
      id: item.id,
      type: item.type,
      parentId: item.parentId,
      title: item.title,
      updatedAt: item.updatedAt,
      isDeleted: Boolean(item.isDeleted),
      category: item.category || '',
      description: item.desc || '',
      fileName: item.fileName || '',
      fileType: item.fileType || '',
      fileSize: Number(item.fileSize || 0),
      binaryFileUnavailable: Boolean(item.binaryFileUnavailable),
      isFavorite: Boolean(item.isFavorite),
      isPinned: Boolean(item.isPinned),
      versions: item.type === 'document' ? normalizeVersions(item.versions || []).length : 0
    }));
    return JSON.stringify({
      docs: compactDocs,
      expandedFolders: normalizeExpandedFolders(currentExpandedFolders, normalizeDocs(currentDocs))
    });
  }

  function supportsCompressedFullBackups() {
    return Boolean(getBackupStore() && typeof JSZip !== 'undefined');
  }

  async function createCompressedBackupArchive(payload) {
    if (typeof JSZip === 'undefined') {
      throw new Error('JSZip no està disponible per comprimir els backups interns.');
    }
    const zip = new JSZip();
    zip.file('backup.json', JSON.stringify(payload, null, 2));
    return zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });
  }

  async function extractPayloadFromCompressedBackup(entry) {
    if (entry?.payload && typeof entry.payload === 'object') return entry.payload;
    if (!entry?.archiveBlob) throw new Error('Aquest backup intern no conté un arxiu recuperable.');
    if (typeof JSZip === 'undefined') throw new Error('JSZip no està disponible per llegir aquest backup.');
    const zip = await JSZip.loadAsync(entry.archiveBlob);
    const backupFile = zip.file('backup.json');
    if (!backupFile) throw new Error('El ZIP del backup no conté backup.json.');
    return JSON.parse(await backupFile.async('string'));
  }

  function normalizeFullBackupEntry(rawEntry) {
    if (!rawEntry || typeof rawEntry !== 'object') return null;
    const createdAt = typeof rawEntry.createdAt === 'string' && !Number.isNaN(Date.parse(rawEntry.createdAt))
      ? rawEntry.createdAt
      : new Date().toISOString();
    const stats = rawEntry.stats && typeof rawEntry.stats === 'object'
      ? {
          folders: Number(rawEntry.stats.folders || 0),
          documents: Number(rawEntry.stats.documents || 0),
          attachments: Number(rawEntry.stats.attachments || 0),
          deleted: Number(rawEntry.stats.deleted || 0),
          versions: Number(rawEntry.stats.versions || 0)
        }
      : createBackupStats(rawEntry.payload || {});

    return {
      id: typeof rawEntry.id === 'string' && rawEntry.id.trim() ? rawEntry.id : generateId('fullbackup'),
      createdAt,
      reason: typeof rawEntry.reason === 'string' ? rawEntry.reason : 'auto-save',
      auto: rawEntry.auto !== false,
      signature: typeof rawEntry.signature === 'string' ? rawEntry.signature : '',
      stats,
      archiveBlob: rawEntry.archiveBlob || null,
      payload: rawEntry.payload && typeof rawEntry.payload === 'object' ? rawEntry.payload : null,
      archiveName: typeof rawEntry.archiveName === 'string' && rawEntry.archiveName.trim() ? rawEntry.archiveName : ''
    };
  }

  function normalizeFullBackupHistory(rawHistory) {
    if (!Array.isArray(rawHistory)) return [];
    return rawHistory
      .map(normalizeFullBackupEntry)
      .filter(Boolean)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, FULL_BACKUP_LIMIT);
  }

  async function readFullBackupHistory() {
    if (!getBackupStore()) return [];
    try {
      const history = normalizeFullBackupHistory(await getBackupStore().getItem(FULL_BACKUP_HISTORY_KEY));
      fullBackupHistoryCache = history;
      return history;
    } catch (err) {
      console.warn("No s'ha pogut llegir l'historial complet de backups interns.", err);
      fullBackupHistoryCache = [];
      return [];
    }
  }

  async function writeFullBackupHistory(history) {
    if (!getBackupStore()) {
      fullBackupHistoryCache = [];
      updateBackupStatusUI();
      return [];
    }

    let normalizedHistory = normalizeFullBackupHistory(history);
    while (normalizedHistory.length > 0) {
      try {
        await getBackupStore().setItem(FULL_BACKUP_HISTORY_KEY, normalizedHistory);
        fullBackupHistoryCache = normalizedHistory;
        updateBackupStatusUI();
        return normalizedHistory;
      } catch (err) {
        if (!isQuotaExceededError(err) || normalizedHistory.length === 1) {
          throw err;
        }
        normalizedHistory = normalizedHistory.slice(0, -1);
      }
    }

    fullBackupHistoryCache = [];
    updateBackupStatusUI();
    return [];
  }

  function getReasonLabel(reason = 'auto-save') {
    const labels = {
      'manual-export': 'Exportació manual',
      'manual-full-backup': 'Backup forçat manualment',
      'before-import-replace': "Abans d'importar una còpia",
      'import-restore': "Restauració d'una còpia importada",
      'before-clear-all': 'Abans de buidar el sistema zero',
      'clear-all': 'Sistema zero buidat',
      'before-purge-item': 'Abans de purgar un element',
      'purge-item': 'Element purgat',
      'before-empty-trash': 'Abans de buidar la paperera',
      'empty-trash': 'Paperera buidada',
      'recovery-vault-restore': 'Recuperació de la volta crítica',
      'light-recovery-restore': 'Recuperació de còpia local',
      'external-auto-backup': 'Backup extern automàtic',
      'external-manual-backup': 'Backup extern manual',
      'manual-export-zip': 'Exportació ZIP segura',
      'restore-full-history': "Restauració d'un backup intern",
      'before-remote-manual-pull': "Abans d'aplicar el remot manualment",
      'remote-manual-pull': 'Aplicació manual del remot',
      'before-remote-guided-pull': 'Abans de resoldre divergència amb el remot',
      'remote-guided-pull': 'Resolució guiada del remot',
      'before-remote-manual-push': 'Abans de fer push manual al remot'
    };
    return labels[reason] || `Canvi desat (${reason})`;
  }

  function updateBackupStatusUI() {
    if (!backupStatusTextEl || !backupCountBadgeEl) return;

    if (!supportsCompressedFullBackups()) {
      backupCountBadgeEl.textContent = '—';
      backupStatusTextEl.textContent = "Mode de compatibilitat: sense historial intern comprimit. Continua disponible l'exportació JSON manual i una còpia local de supervivència per recuperar documents i carpetes.";
      return;
    }

    const history = Array.isArray(fullBackupHistoryCache) ? fullBackupHistoryCache : [];
    backupCountBadgeEl.textContent = String(history.length);

    if (isFullBackupSaving) {
      backupStatusTextEl.textContent = "S'està desant un backup intern comprimit a IndexedDB...";
      return;
    }

    if (fullBackupTimer) {
      backupStatusTextEl.textContent = "Hi ha un backup automàtic pendent. Es guardarà en breu si l'estat final és estable.";
      return;
    }

    if (history.length === 0) {
      backupStatusTextEl.textContent = docs.length > 0
        ? "Encara no hi ha cap backup intern complet. Després del pròxim canvi important se'n crearà un automàticament."
        : 'Quan hi hagi dades, Sutsumu començarà a desar backups interns complets de manera automàtica.';
      return;
    }

    const latest = history[0];
    const latestDate = new Date(latest.createdAt);
    backupStatusTextEl.textContent = `Últim backup: ${latestDate.toLocaleString('ca-ES')} · ${latest.auto ? 'automàtic' : 'manual'} · ${latest.stats.folders} carpetes, ${latest.stats.documents} documents i ${latest.stats.attachments} adjunts. També hi ha una còpia local de supervivència del contingut recent.`;
  }

  function maybeWarnAboutStaleBackups() {
    if (hasWarnedAboutStaleBackups || docs.length === 0 || fullBackupTimer || isFullBackupSaving) return;
    const latest = fullBackupHistoryCache[0];
    if (!latest) return;
    const ageMs = Date.now() - new Date(latest.createdAt).getTime();
    if (ageMs > AUTO_BACKUP_STALE_HOURS * 60 * 60 * 1000) {
      hasWarnedAboutStaleBackups = true;
      showToast('Fa més de 24 hores que no es desa un backup intern complet. Et convé forçar-ne un o exportar un JSON.', 'info');
    }
  }

  async function saveFullBackupSnapshot(reason = 'auto-save', options = {}) {
    const { auto = true, force = false } = options;
    if (!supportsCompressedFullBackups() || docs.length === 0) {
      updateBackupStatusUI();
      return null;
    }

    const signature = createBackupStateSignature(docs, expandedFolders);
    const existingHistory = await readFullBackupHistory();
    if (!force && existingHistory[0]?.signature === signature) {
      updateBackupStatusUI();
      return existingHistory[0];
    }

    isFullBackupSaving = true;
    updateBackupStatusUI();

    try {
      const payload = await createFullBackupPayload(reason);
      const archiveBlob = await createCompressedBackupArchive(payload);
      const createdAt = new Date().toISOString();
      const entry = normalizeFullBackupEntry({
        id: generateId('fullbackup'),
        createdAt,
        reason,
        auto,
        signature,
        stats: createBackupStats(payload),
        archiveBlob,
        archiveName: `sutsumu_backup_auto_${createdAt.replace(/[:.]/g, '-')}.zip`
      });
      const dedupedHistory = existingHistory.filter(item => item.signature !== signature);
      const savedHistory = await writeFullBackupHistory([entry, ...dedupedHistory].slice(0, FULL_BACKUP_LIMIT));
      return savedHistory[0] || entry;
    } finally {
      isFullBackupSaving = false;
      updateBackupStatusUI();
    }
  }

  function queueAutomaticFullBackup(reason = 'auto-save') {
    if (!supportsCompressedFullBackups() || docs.length === 0) {
      updateBackupStatusUI();
      return;
    }
    queuedFullBackupReason = reason;
    if (fullBackupTimer) clearTimeout(fullBackupTimer);
    fullBackupTimer = setTimeout(async () => {
      fullBackupTimer = null;
      try {
        await saveFullBackupSnapshot(queuedFullBackupReason || 'auto-save', { auto: true });
      } catch (err) {
        console.error(err);
        const message = isQuotaExceededError(err)
          ? "No hi ha prou espai per ampliar l'historial complet de backups interns. Exporta un JSON extern per tenir una còpia fora del navegador."
          : "No s'ha pogut desar el backup intern automàtic.";
        showToast(message, 'error');
      }
    }, AUTO_FULL_BACKUP_DEBOUNCE_MS);
    updateBackupStatusUI();
  }

  function getSelectedFullBackup() {
    return (fullBackupHistoryCache || []).find(entry => entry.id === selectedFullBackupId) || null;
  }

  function renderBackupPreview() {
    const entry = getSelectedFullBackup();
    const hasSelection = Boolean(entry);
    downloadSelectedBackupBtn.disabled = !hasSelection;
    restoreSelectedBackupBtn.disabled = !hasSelection;
    deleteSelectedBackupBtn.disabled = !hasSelection;

    Array.from(backupHistoryListEl.querySelectorAll('.versions-item-btn')).forEach(btn => {
      btn.classList.toggle('active', btn.dataset.backupId === selectedFullBackupId);
    });

    if (!entry) {
      backupPreviewTitleEl.textContent = 'Cap backup seleccionat';
      backupPreviewMetaEl.textContent = "Selecciona un backup per veure'n el resum";
      backupPreviewStatsEl.innerHTML = '';
      backupPreviewNotesEl.textContent = 'Els backups interns complets es guarden en ZIP comprimit a IndexedDB. També pots exportar un JSON extern manual quan vulguis.';
      return;
    }

    backupPreviewTitleEl.textContent = `${entry.auto ? 'Backup automàtic' : 'Backup manual'} · ${new Date(entry.createdAt).toLocaleString('ca-ES')}`;
    backupPreviewMetaEl.textContent = `${getReasonLabel(entry.reason)} · ${entry.archiveBlob ? 'ZIP comprimit intern' : 'Còpia llegible'}`;
    const stats = entry.stats || { folders: 0, documents: 0, attachments: 0, deleted: 0, versions: 0 };
    backupPreviewStatsEl.innerHTML = `
      <div class="backup-stat-card"><span class="backup-stat-label">Carpetes</span><span class="backup-stat-value">${stats.folders}</span></div>
      <div class="backup-stat-card"><span class="backup-stat-label">Documents</span><span class="backup-stat-value">${stats.documents}</span></div>
      <div class="backup-stat-card"><span class="backup-stat-label">Adjunts</span><span class="backup-stat-value">${stats.attachments}</span></div>
      <div class="backup-stat-card"><span class="backup-stat-label">Versions</span><span class="backup-stat-value">${stats.versions}</span></div>
    `;
    backupPreviewNotesEl.textContent = `Aquest backup es va crear per: ${getReasonLabel(entry.reason)}. Si el restaures, Sutsumu farà abans una nova còpia crítica de l'estat actual.`;
  }

  async function openBackupHistoryDialog() {
    await readFullBackupHistory();
    backupHistoryListEl.innerHTML = '';
    backupHistoryEmptyStateEl.classList.toggle('hidden', fullBackupHistoryCache.length > 0);
    selectedFullBackupId = fullBackupHistoryCache[0]?.id || null;

    fullBackupHistoryCache.forEach(entry => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.backupId = entry.id;
      btn.className = `versions-item-btn${entry.id === selectedFullBackupId ? ' active' : ''}`;
      btn.innerHTML = `<span class="versions-item-title">${escapeHtml(entry.auto ? 'Backup automàtic' : 'Backup manual')} · ${escapeHtml(new Date(entry.createdAt).toLocaleString('ca-ES'))}</span><span class="versions-item-meta">${escapeHtml(getReasonLabel(entry.reason))} · ${entry.stats.documents} docs · ${entry.stats.attachments} adjunts</span>`;
      btn.addEventListener('click', () => {
        selectedFullBackupId = entry.id;
        renderBackupPreview();
      });
      li.appendChild(btn);
      backupHistoryListEl.appendChild(li);
    });

    renderBackupPreview();
    backupHistoryModal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
  }

  function closeBackupHistoryDialog() {
    backupHistoryModal.classList.add('hidden');
    selectedFullBackupId = null;
    const hasOtherModalOpen = !confirmModal.classList.contains('hidden') || !editModal.classList.contains('hidden') || !versionsModal.classList.contains('hidden') || !moveModal.classList.contains('hidden');
    if (!hasOtherModalOpen) {
      modalOverlay.classList.add('hidden');
    }
  }

  async function downloadSelectedBackupArchive() {
    const entry = getSelectedFullBackup();
    if (!entry) return;
    try {
      if (entry.archiveBlob) {
        triggerDownload(entry.archiveName || `sutsumu_backup_auto_${entry.id}.zip`, entry.archiveBlob, 'application/zip');
        showToast('Backup intern descarregat en ZIP.');
        return;
      }
      const payload = await extractPayloadFromCompressedBackup(entry);
      triggerDownload(`sutsumu_backup_${entry.id}.json`, JSON.stringify(payload, null, 2), 'application/json;charset=utf-8');
      showToast('Backup descarregat en JSON.');
    } catch (err) {
      console.error(err);
      showToast("No s'ha pogut descarregar aquest backup.", 'error');
    }
  }

  async function restoreSelectedFullBackup() {
    const entry = getSelectedFullBackup();
    if (!entry) return;
    openConfirm(
      'Restaurar aquest backup intern?',
      `Si continues, Sutsumu restaurarà la còpia del ${new Date(entry.createdAt).toLocaleString('ca-ES')} i substituirà l'estat actual visible.`,
      async () => {
        const canContinue = await prepareSafetySnapshotOrAbort('before-restore-full-history', 'restaurar aquest backup');
        if (!canContinue) return;
        const payload = await extractPayloadFromCompressedBackup(entry);
        const parsedBackup = await normalizeImportedBackupPayload(payload);
        docs = normalizeDocs(parsedBackup.docs || []);
        expandedFolders = normalizeExpandedFolders(parsedBackup.expandedFolders || [], docs);
        await saveData('restore-full-history');
        renderData();
        closeBackupHistoryDialog();
        showToast('Backup restaurat correctament.');
      },
      {
        okLabel: 'Restaurar backup',
        warningText: "Abans de restaurar-lo, Sutsumu desarà una còpia crítica de l'estat actual per si necessites tornar enrere."
      }
    );
  }

  function deleteSelectedFullBackup() {
    const entry = getSelectedFullBackup();
    if (!entry) return;
    openConfirm(
      'Eliminar aquest backup intern?',
      `Esborraràs del sistema intern la còpia del ${new Date(entry.createdAt).toLocaleString('ca-ES')}. Aquesta acció no toca els teus documents actuals.`,
      async () => {
        const nextHistory = fullBackupHistoryCache.filter(item => item.id !== entry.id);
        await writeFullBackupHistory(nextHistory);
        selectedFullBackupId = nextHistory[0]?.id || null;
        backupHistoryEmptyStateEl.classList.toggle('hidden', nextHistory.length > 0);
        backupHistoryListEl.innerHTML = '';
        nextHistory.forEach(item => {
          const li = document.createElement('li');
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.dataset.backupId = item.id;
          btn.className = `versions-item-btn${item.id === selectedFullBackupId ? ' active' : ''}`;
          btn.innerHTML = `<span class="versions-item-title">${escapeHtml(item.auto ? 'Backup automàtic' : 'Backup manual')} · ${escapeHtml(new Date(item.createdAt).toLocaleString('ca-ES'))}</span><span class="versions-item-meta">${escapeHtml(getReasonLabel(item.reason))} · ${item.stats.documents} docs · ${item.stats.attachments} adjunts</span>`;
          btn.addEventListener('click', () => {
            selectedFullBackupId = item.id;
            renderBackupPreview();
          });
          li.appendChild(btn);
          backupHistoryListEl.appendChild(li);
        });
        renderBackupPreview();
        showToast('Backup intern eliminat.');
      },
      {
        okLabel: 'Eliminar backup'
      }
    );
  }

  function createEmergencyLocalPayload(currentDocs, currentExpandedFolders) {
    const emergencyDocs = makeDocsSafeForLocalStorage(normalizeDocs(currentDocs)).map(item => ({
      ...item,
      versions: item.type === 'document' ? normalizeVersions(item.versions).slice(0, 5) : []
    }));

    return {
      docs: emergencyDocs,
      expandedFolders: normalizeExpandedFolders(currentExpandedFolders, emergencyDocs)
    };
  }

  async function normalizeImportedBackupPayload(rawPayload) {
    if (Array.isArray(rawPayload)) {
      return {
        docs: normalizeDocs(rawPayload),
        expandedFolders: []
      };
    }

    if (!rawPayload || typeof rawPayload !== 'object') {
      throw new Error('El format del fitxer de còpia no és vàlid.');
    }

    const rawDocs = Array.isArray(rawPayload.docs) ? rawPayload.docs : [];
    const hydratedDocs = [];

    for (const rawItem of rawDocs) {
      if (!rawItem || typeof rawItem !== 'object') continue;
      const hydratedItem = { ...rawItem };
      if (!isRealBlob(hydratedItem.fileBlob) && typeof hydratedItem.fileBlobDataUrl === 'string') {
        hydratedItem.fileBlob = dataUrlToBlob(hydratedItem.fileBlobDataUrl, hydratedItem.fileType || 'application/octet-stream');
        if (hydratedItem.fileBlob) hydratedItem.binaryFileUnavailable = false;
      }
      delete hydratedItem.fileBlobDataUrl;
      hydratedDocs.push(hydratedItem);
    }

    const normalizedDocsList = normalizeDocs(hydratedDocs);
    return {
      docs: normalizedDocsList,
      expandedFolders: normalizeExpandedFolders(Array.isArray(rawPayload.expandedFolders) ? rawPayload.expandedFolders : [], normalizedDocsList)
    };
  }

  function normalizeDocs(rawDocs) {
    if (!Array.isArray(rawDocs)) return [];

    const seenIds = new Set();
    const normalized = rawDocs
      .filter(item => item && typeof item === 'object')
      .map((item, index) => {
        const type = item.type === 'folder' ? 'folder' : 'document';
        let id = typeof item.id === 'string' && item.id.trim() ? item.id.trim() : generateId(type);
        if (seenIds.has(id)) id = generateId(type);
        seenIds.add(id);

        const timestamp = typeof item.timestamp === 'string' && !Number.isNaN(Date.parse(item.timestamp))
          ? item.timestamp
          : new Date().toISOString();

        const base = {
          id,
          type,
          title: typeof item.title === 'string' && item.title.trim() ? item.title.trim() : `${type === 'folder' ? 'Carpeta' : 'Document'} ${index + 1}`,
          parentId: typeof item.parentId === 'string' && item.parentId.trim() ? item.parentId : 'root',
          timestamp,
          isDeleted: Boolean(item.isDeleted)
        };

        if (type === 'folder') {
          return {
            ...base,
            desc: typeof item.desc === 'string' ? item.desc.trim() : '',
            color: typeof item.color === 'string' && item.color.trim() ? item.color : '#0ea5e9',
            tags: normalizeTags(item.tags),
            isFavorite: Boolean(item.isFavorite),
            isPinned: Boolean(item.isPinned)
          };
        }

        const hasBlob = isRealBlob(item.fileBlob);
        return {
          ...base,
          category: typeof item.category === 'string' ? item.category : '',
          tags: normalizeTags(item.tags),
          content: typeof item.content === 'string' ? sanitizeRichText(item.content) : '',
          versions: normalizeVersions(item.versions),
          fileBlob: hasBlob ? item.fileBlob : null,
          fileType: typeof item.fileType === 'string' ? item.fileType : '',
          fileName: typeof item.fileName === 'string' ? item.fileName : '',
          fileSize: Number(item.fileSize || (hasBlob ? item.fileBlob.size : 0) || 0),
          sourceFormat: typeof item.sourceFormat === 'string' ? item.sourceFormat : '',
          binaryFileUnavailable: Boolean(item.binaryFileUnavailable || (!hasBlob && (item.fileName || item.fileType))),
          isFavorite: Boolean(item.isFavorite),
          isPinned: Boolean(item.isPinned)
        };
      });

    const folderIds = new Set(normalized.filter(item => item.type === 'folder').map(item => item.id));
    normalized.forEach(item => {
      if (item.parentId !== 'root') {
        const validParent = folderIds.has(item.parentId) && item.parentId !== item.id;
        if (!validParent) item.parentId = 'root';
      }
    });

    return normalized;
  }

  function normalizeExpandedFolders(rawExpandedFolders, currentDocs) {
    if (!Array.isArray(rawExpandedFolders)) return [];
    const validFolderIds = new Set(currentDocs.filter(item => item.type === 'folder' && !item.isDeleted).map(item => item.id));
    return rawExpandedFolders.filter(id => validFolderIds.has(id));
  }


  function normalizeVersions(rawVersions) {
    if (!Array.isArray(rawVersions)) return [];

    return rawVersions
      .filter(version => version && typeof version === 'object')
      .map((version, index) => ({
        id: typeof version.id === 'string' && version.id.trim() ? version.id : generateId('version'),
        createdAt: typeof version.createdAt === 'string' && !Number.isNaN(Date.parse(version.createdAt)) ? version.createdAt : new Date().toISOString(),
        title: typeof version.title === 'string' ? version.title : `Versió ${index + 1}`,
        category: typeof version.category === 'string' ? version.category : '',
        tags: normalizeTags(version.tags),
        content: typeof version.content === 'string' ? sanitizeRichText(version.content) : '',
        reason: typeof version.reason === 'string' ? version.reason : 'manual-save'
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, VERSION_LIMIT);
  }

  function createDocumentVersion(snapshot, reason = 'manual-save') {
    return {
      id: generateId('version'),
      createdAt: new Date().toISOString(),
      title: snapshot?.title || 'Sense títol',
      category: snapshot?.category || '',
      tags: normalizeTags(snapshot?.tags),
      content: sanitizeRichText(snapshot?.content || ''),
      reason
    };
  }

  function getDocumentCurrentSnapshot(doc) {
    if (!doc || doc.type !== 'document') return null;
    return {
      title: doc.title || '',
      category: doc.category || '',
      tags: getItemTags(doc),
      content: sanitizeRichText(doc.content || '')
    };
  }

  function pushVersionIntoDocument(doc, previousSnapshot, reason = 'manual-save') {
    if (!doc || doc.type !== 'document' || !previousSnapshot) return;

    const sanitizedPrevious = {
      title: previousSnapshot.title || '',
      category: previousSnapshot.category || '',
      tags: normalizeTags(previousSnapshot.tags),
      content: sanitizeRichText(previousSnapshot.content || '')
    };
    const currentSnapshot = getDocumentCurrentSnapshot(doc);
    const prevSig = JSON.stringify(sanitizedPrevious);
    const currSig = JSON.stringify(currentSnapshot);

    if (prevSig === currSig) return;
    if (!sanitizedPrevious.title && !sanitizedPrevious.category && !sanitizedPrevious.tags?.length && !getPlainTextFromHtml(sanitizedPrevious.content)) return;

    const existingVersions = normalizeVersions(doc.versions || []);
    const alreadyStored = existingVersions.some(version => JSON.stringify({
      title: version.title || '',
      category: version.category || '',
      tags: normalizeTags(version.tags),
      content: sanitizeRichText(version.content || '')
    }) === prevSig);

    if (alreadyStored) {
      doc.versions = existingVersions.slice(0, VERSION_LIMIT);
      return;
    }

    doc.versions = normalizeVersions([createDocumentVersion(sanitizedPrevious, reason), ...existingVersions]).slice(0, VERSION_LIMIT);
  }

  function isEditModalOpen() {
    const editorVisible = !editModal.classList.contains('hidden') || !versionsModal.classList.contains('hidden');
    return editorVisible && !modalOverlay.classList.contains('hidden');
  }

  function isEditDirty() {
    if (!editingDocId || !isEditModalOpen()) return false;
    return getSnapshotSignature(getCurrentEditSnapshot()) !== lastSavedEditSignature;
  }

  function shouldGuardEditClose() {
    return isEditDirty();
  }

  function getEditableExportSnapshot() {
    const doc = docs.find(d => d.id === editingDocId && d.type === 'document');
    if (!doc) return null;
    return getCurrentEditSnapshot() || getDocumentCurrentSnapshot(doc);
  }

  function exportCurrentEditingDocument(format = 'txt') {
    const snapshot = getEditableExportSnapshot();
    if (!snapshot) {
      showToast('Obre primer un document editable per exportar-lo.', 'error');
      return;
    }

    const baseName = slugifyFileName(snapshot.title || 'document');

    if (format === 'txt') {
      triggerDownload(`${baseName}.txt`, htmlToPlainText(snapshot.content || ''), 'text/plain;charset=utf-8');
      showToast('Document exportat a TXT');
      return;
    }

    if (format === 'md') {
      triggerDownload(`${baseName}.md`, htmlToMarkdown(snapshot.content || ''), 'text/markdown;charset=utf-8');
      showToast('Document exportat a Markdown');
      return;
    }

    const htmlDocument = `<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(snapshot.title || 'Document')}</title>
  <style>body{font-family:Inter,Arial,sans-serif;max-width:900px;margin:40px auto;padding:0 20px;line-height:1.65;color:#0f172a}table{width:100%;border-collapse:collapse}th,td{border:1px solid #cbd5e1;padding:8px 10px;vertical-align:top}th{background:#f8fafc}a{color:#0ea5e9}</style>
</head>
<body>
  <h1>${escapeHtml(snapshot.title || 'Document')}</h1>
  ${sanitizeRichText(snapshot.content || '<p></p>')}
</body>
</html>`;
    triggerDownload(`${baseName}.html`, htmlDocument, 'text/html;charset=utf-8');
    showToast('Document exportat a HTML');
  }

  function renderVersionsPreview() {
    const doc = docs.find(d => d.id === editingDocId && d.type === 'document');
    const versions = normalizeVersions(doc?.versions || []);
    const selectedVersion = versions.find(version => version.id === selectedVersionId) || versions[0] || null;
    selectedVersionId = selectedVersion?.id || null;

    Array.from(versionsListEl.querySelectorAll('.versions-item-btn')).forEach(btn => {
      btn.classList.toggle('active', btn.dataset.versionId === selectedVersionId);
    });

    if (!selectedVersion) {
      restoreVersionBtn.disabled = true;
      versionPreviewTitleEl.textContent = 'Cap versió seleccionada';
      versionPreviewMetaEl.textContent = 'Selecciona una versió per previsualitzar-la';
      versionPreviewContentEl.classList.add('is-empty');
      versionPreviewContentEl.innerHTML = '<p>No hi ha res a mostrar.</p>';
      return;
    }

    restoreVersionBtn.disabled = false;
    versionPreviewTitleEl.textContent = selectedVersion.title || 'Sense títol';
    versionPreviewMetaEl.textContent = `${new Date(selectedVersion.createdAt).toLocaleString('ca-ES')} · ${selectedVersion.category || 'Sense categoria'}`;
    versionPreviewContentEl.classList.remove('is-empty');
    versionPreviewContentEl.innerHTML = sanitizeRichText(selectedVersion.content || '<p></p>');
  }

  function openVersionsDialog() {
    const doc = docs.find(d => d.id === editingDocId && d.type === 'document');
    if (!doc) return;

    const versions = normalizeVersions(doc.versions || []);
    versionsListEl.innerHTML = '';
    versionsEmptyStateEl.classList.toggle('hidden', versions.length > 0);
    selectedVersionId = versions[0]?.id || null;

    if (versions.length === 0) {
      versionPreviewTitleEl.textContent = 'Encara no hi ha versions';
      versionPreviewMetaEl.textContent = 'La primera versió es crearà quan desis canvis posteriors.';
      versionPreviewContentEl.classList.add('is-empty');
      versionPreviewContentEl.innerHTML = "<p>Quan desis un document modificat, Sutsumu guardarà una còpia de l'estat anterior perquè la puguis recuperar.</p>";
    }

    versions.forEach(version => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.versionId = version.id;
      btn.className = `versions-item-btn${version.id === selectedVersionId ? ' active' : ''}`;
      btn.innerHTML = `<span class="versions-item-title">${escapeHtml(version.title || 'Sense títol')}</span><span class="versions-item-meta">${new Date(version.createdAt).toLocaleString('ca-ES')} · ${escapeHtml(version.category || 'Sense categoria')}</span>`;
      btn.addEventListener('click', () => {
        selectedVersionId = version.id;
        renderVersionsPreview();
      });
      li.appendChild(btn);
      versionsListEl.appendChild(li);
    });

    renderVersionsPreview();
    editModal.classList.add('hidden');
    versionsModal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
  }

  function closeVersionsDialog() {
    versionsModal.classList.add('hidden');
    if (editingDocId) {
      editModal.classList.remove('hidden');
      requestAnimationFrame(() => {
        if (!editContentGroup.classList.contains('hidden')) editContentInput.focus();
      });
    }
  }

  function restoreSelectedVersionIntoEditor() {
    const doc = docs.find(d => d.id === editingDocId && d.type === 'document');
    if (!doc) return;
    const version = normalizeVersions(doc.versions || []).find(item => item.id === selectedVersionId);
    if (!version) return;

    editNameInput.value = version.title || doc.title || '';
    editCategorySelect.value = version.category || '';
    if (!editContentGroup.classList.contains('hidden')) {
      editContentInput.innerHTML = sanitizeRichText(version.content || '');
      updateEditorMetrics();
    }
    setEditorSaveStatus('Versió carregada. Desa per aplicar-la definitivament.', 'dirty');
    closeVersionsDialog();
    scheduleEditAutosave();
  }

  // fallback initial render per si no tenim db (tarda)
  // this is rendered by localforage when ready but as a fallback
  // Només renderitzem si la memòria ja està definida
  if (typeof docs !== 'undefined') renderData();

  // --- Dreceres de Teclat Globals ---
  document.addEventListener('keydown', (e) => {
    const isEditModalOpen = !editModal.classList.contains('hidden') && !modalOverlay.classList.contains('hidden');
    // Escape per tancar modals o utilitats de l'editor
    if (e.key === 'Escape') {
      if (isCommandPaletteOpen()) {
        closeCommandPalette();
      } else if (isEditModalOpen && editorSearchPanel && !editorSearchPanel.classList.contains('hidden')) {
        closeEditorSearchPanel();
      } else if (isEditModalOpen && editorFocusMode) {
        setEditorFocusMode(false);
      } else if (!backupHistoryModal.classList.contains('hidden')) {
        closeBackupHistoryDialog();
      } else if (!versionsModal.classList.contains('hidden')) {
        closeVersionsDialog();
      } else {
        closeModals();
      }
      return;
    }

    // Ctrl/Cmd + S per desar els canvis del modal d'edició
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      if (isEditModalOpen) {
        e.preventDefault();
        editSaveBtn.click();
        return;
      }
    }

    if (isEditModalOpen && !editContentGroup.classList.contains('hidden') && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && e.shiftKey) {
      e.preventDefault();
      document.execCommand('redo', false, null);
      updateEditorMetrics();
      refreshEditorOutline();
      refreshEditorSearchHighlights();
      scheduleEditAutosave();
      return;
    }

    if (isEditModalOpen && !editContentGroup.classList.contains('hidden') && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      document.execCommand('redo', false, null);
      updateEditorMetrics();
      refreshEditorOutline();
      refreshEditorSearchHighlights();
      scheduleEditAutosave();
      return;
    }

    // Ctrl/Cmd + F obre la cerca contextual si estem editant
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
      e.preventDefault();
      if (isEditModalOpen && !editContentGroup.classList.contains('hidden')) {
        openEditorSearchPanel(true);
      } else {
        searchInput.focus();
      }
      return;
    }

    // Ctrl/Cmd + K per la paleta de comandes
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (isCommandPaletteOpen()) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
      return;
    }

    // Ctrl/Cmd + N per Nou Document
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
      e.preventDefault();
      // Tancar qualsevol modal que intercedeixi
      closeModals();
      // Obre la pestanya doc
      const docTab = document.querySelector('[data-target="tab-document"]');
      if (docTab) docTab.click();
      // Enfoca l'input per escriure directe
      docNameInput.focus();
      return;
    }
  });

  window.addEventListener('beforeunload', (e) => {
    if (!shouldGuardEditClose() && !workspaceDirty) return;
    e.preventDefault();
    e.returnValue = '';
  });

  // Initialize DB and state
  try {
    if (typeof localforage === 'undefined') {
      throw new Error("localforage no definit, utilitzarem el localStorage natiu directament.");
    }

    mainStore = localforage.createInstance({
      name: 'BentoApp',
      storeName: 'documents'
    });

    backupStore = localforage.createInstance({
      name: 'BentoApp',
      storeName: 'backups'
    });

    await migrateLegacyLocalStorageToIndexedStores();

    const storedDocs = await getMainStore().getItem(STORAGE_KEY);
    const storedExpanded = await getMainStore().getItem(EXPANDED_KEY);

    docs = normalizeDocs(storedDocs || []);
    hasSavedExpandedState = storedExpanded !== null;
    expandedFolders = normalizeExpandedFolders(storedExpanded || [], docs);
  } catch (err) {
    console.warn("Avís: localForage no està disponible. Carregant dades del localStorage antic de seguretat...", err);
    mainStore = null;
    backupStore = null;

    const fbDocs = localStorage.getItem(STORAGE_KEY);
    const fbExpanded = localStorage.getItem(EXPANDED_KEY);

    docs = normalizeDocs(fbDocs ? safeJSONParse(fbDocs, []) : []);
    hasSavedExpandedState = fbExpanded !== null;
    expandedFolders = normalizeExpandedFolders(fbExpanded ? safeJSONParse(fbExpanded, []) : [], docs);
  }

  const lightBackupHistory = await readLightBackupHistory();
  const recoveryVaultSnapshot = await readRecoveryVaultSnapshot();
  survivalAttachmentMirrorCache = readSurvivalAttachmentMirrorSnapshot();
  survivalAttachmentMirrorSignature = createSurvivalAttachmentMirrorSignature(docs);
  if (docs.length === 0) {
    pendingRecoveryVaultSnapshot = recoveryVaultSnapshot && Array.isArray(recoveryVaultSnapshot.payload?.docs) && recoveryVaultSnapshot.payload.docs.length > 0
      && sessionStorage.getItem(DISMISSED_RECOVERY_VAULT_SESSION_KEY) !== recoveryVaultSnapshot.id
      ? recoveryVaultSnapshot
      : null;
    pendingSafetyRecoverySnapshot = (lightBackupHistory.find(entry => Array.isArray(entry.docs) && entry.docs.length > 0) || null);
    if (pendingSafetyRecoverySnapshot && sessionStorage.getItem(DISMISSED_LIGHT_RECOVERY_SESSION_KEY) === pendingSafetyRecoverySnapshot.id) {
      pendingSafetyRecoverySnapshot = null;
    }
  }

  // --- Obrim automàticament les carpetes principals només la primera vegada ---
  let shouldSave = false;
  if (!hasSavedExpandedState) {
    docs.forEach(d => {
      if (d.type === 'folder' && d.parentId === 'root' && !d.isDeleted && !expandedFolders.includes(d.id)) {
        expandedFolders.push(d.id);
        shouldSave = true;
      }
    });
  }

  if (shouldSave) {
    await saveData();
  }

  // Renderitzem les dades un cop la BD ha respost completament
  renderData();

  fullBackupHistoryCache = await readFullBackupHistory();
  recentWorkspaces = await readRecentWorkspaceHistory();
  renderRecentWorkspaces();
  recentDocs = readRecentDocsHistory();
  renderRecentDocsHistory();
  ensureSyncPrepMeta();
  shadowSyncHistory = await readShadowSyncHistory();
  shadowSyncState = await readShadowSyncState();
  remoteShadowSource = readRemoteShadowSourceSnapshot();
  remoteShadowConfig = readRemoteShadowConfigSnapshot();
  remoteRevisionDownloads = readRemoteRevisionDownloadRegistry();
  remoteRevisionApplications = readRemoteRevisionApplicationRegistry();
  remoteShadowDraftUrl = remoteShadowConfig?.url || '';
  remoteProviderProfile = readRemoteProviderProfileSnapshot();
  remoteProviderSecret = readRemoteProviderSecretSnapshot(remoteProviderProfile);
  remoteProviderConnectors = readRemoteProviderConnectorsSnapshot();
  remoteProviderConnectorSecrets = readRemoteProviderConnectorSecretsSnapshot();
  activeRemoteProviderConnectorId = readActiveRemoteProviderConnectorId();
  if (activeRemoteProviderConnectorId && !findRemoteProviderConnector(activeRemoteProviderConnectorId)) {
    writeActiveRemoteProviderConnectorId('');
  }
  updateBackupStatusUI();
  updateAttachmentHealthUI();
  updateExternalBackupUI();
  updateShadowSyncUI();
  updateRemoteShadowUI();
  await restorePersistedExternalBackupBinding();
  await restorePersistedWorkspaceBinding();
  refreshSyncPreparationState('bootstrap');
  if (docs.length > 0 && shadowSyncHistory.length === 0) {
    await createShadowRevisionNow('shadow-bootstrap-seed', { silent: true, force: false });
  } else {
    updateShadowSyncUI();
  }
  if (remoteShadowConfig?.url && remoteShadowConfig.autoCheckOnStart) {
    await connectRemoteShadowUrl({ silent: true });
  }
  await registerPwaSupport();
  updateQuickStartUI();
  updatePwaUI();
  maybeWarnAboutStaleBackups();
  maybeWarnAboutMissingAttachmentBinaries();

  if (window.location.protocol === 'file:' && !sessionStorage.getItem('bento_file_protocol_warning_shown')) {
    showToast('Executar Sutsumu amb file:// pot separar les dades si canvies de carpeta. Per més seguretat, usa sempre la mateixa ruta o un servidor local.', 'info');
    sessionStorage.setItem('bento_file_protocol_warning_shown', '1');
  }

  if (pendingRecoveryVaultSnapshot) {
    const snapshot = pendingRecoveryVaultSnapshot;
    openConfirm(
      'Recuperar la darrera còpia completa?',
      `He trobat una còpia de recuperació del ${new Date(snapshot.createdAt).toLocaleString('ca-ES')}. Si continues, Sutsumu restaurarà carpetes, documents, versions i fitxers adjunts de l'última operació crítica.`,
      async () => {
        const parsedBackup = await normalizeImportedBackupPayload(snapshot.payload);
        docs = normalizeDocs(parsedBackup.docs || []);
        expandedFolders = normalizeExpandedFolders(parsedBackup.expandedFolders || [], docs);
        await saveData('recovery-vault-restore');
        renderData();
        showToast('Còpia completa recuperada correctament.');
      },
      {
        okLabel: 'Recuperar-ho tot',
        warningText: "Aquesta restauració sobrescriurà l'estat buit actual amb la còpia completa més recent.",
        onCancel: () => sessionStorage.setItem(DISMISSED_RECOVERY_VAULT_SESSION_KEY, snapshot.id)
      }
    );
  } else if (pendingSafetyRecoverySnapshot) {
    const snapshot = pendingSafetyRecoverySnapshot;
    openConfirm(
      'Recuperar la còpia local de supervivència?',
      `He trobat una còpia local de supervivència del ${new Date(snapshot.createdAt).toLocaleString('ca-ES')}. Si continues, recuperaré carpetes i documents recents encara que IndexedDB s'hagi fet malbé.`,
      async () => {
        docs = hydrateDocsWithSurvivalAttachmentMirror(snapshot.docs || [], survivalAttachmentMirrorCache);
        expandedFolders = normalizeExpandedFolders(snapshot.expandedFolders || [], docs);
        await saveData('light-recovery-restore');
        renderData();
        showToast('Còpia local recuperada correctament.');
      },
      {
        okLabel: 'Recuperar supervivència local',
        onCancel: () => sessionStorage.setItem(DISMISSED_LIGHT_RECOVERY_SESSION_KEY, snapshot.id)
      }
    );
  }

  // Handlers Modals Cancel·lar
  confirmCancelBtn.addEventListener('click', dismissConfirmModal);
  editCancelBtn.addEventListener('click', closeModals);
  moveCancelBtn.addEventListener('click', closeModals);
  versionsBackBtn.addEventListener('click', closeVersionsDialog);
  restoreVersionBtn.addEventListener('click', restoreSelectedVersionIntoEditor);
  backupHistoryCloseBtn.addEventListener('click', closeBackupHistoryDialog);
  downloadSelectedBackupBtn.addEventListener('click', downloadSelectedBackupArchive);
  restoreSelectedBackupBtn.addEventListener('click', restoreSelectedFullBackup);
  deleteSelectedBackupBtn.addEventListener('click', deleteSelectedFullBackup);
  backupHistoryBtn.addEventListener('click', openBackupHistoryDialog);
  connectExternalBackupBtn?.addEventListener('click', connectExternalBackupFile);
  saveExternalBackupBtn?.addEventListener('click', () => saveExternalBackupToHandle('external-manual-backup', { silent: false, force: true, interactive: true }));
  disconnectExternalBackupBtn?.addEventListener('click', disconnectExternalBackup);
  exportSafeZipBtn?.addEventListener('click', async () => {
    if (docs.length === 0) {
      showToast('No hi ha res a exportar.', 'error');
      return;
    }
    try {
      const payload = await createFullBackupPayload('manual-export-zip');
      const archiveBlob = await createCompressedBackupArchive(payload);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      triggerDownload(`sutsumu_backup_complet_${timestamp}.zip`, archiveBlob, 'application/zip');
      showToast('ZIP segur exportat amb carpetes, versions i fitxers adjunts.');
    } catch (err) {
      console.error(err);
      showToast("No s'ha pogut generar el ZIP segur.", 'error');
    }
  });
  downloadSyncPayloadBtn?.addEventListener('click', () => {
    const payload = refreshSyncPreparationState('manual-export');
    const fileName = `${slugifyFileName(payload.workspace.name || 'sutsumu')}-sync-payload-v1.json`;
    triggerDownload(fileName, JSON.stringify(payload, null, 2), 'application/json;charset=utf-8');
    showToast(`Payload base de sync preparat: ${fileName}`);
  });
  forceShadowRevisionBtn?.addEventListener('click', () => {
    createShadowRevisionNow('shadow-manual-forced', { silent: false, force: true });
  });
  remoteShadowModeSelectEl?.addEventListener('change', () => {
    if (remoteShadowModeSelectEl.value !== 'provider-head-url') {
      writeActiveRemoteProviderConnectorId('');
    }
    updateRemoteProviderModeUI();
  });
  remoteShadowUrlInput?.addEventListener('input', () => {
    remoteShadowDraftUrl = remoteShadowUrlInput.value;
    if (activeRemoteProviderConnectorId && remoteProviderConnectorSelectEl?.value) {
      writeActiveRemoteProviderConnectorId('');
    }
    updateRemoteShadowConnectButtonState();
  });
  remoteProviderConnectorSelectEl?.addEventListener('change', () => {
    const connectorId = String(remoteProviderConnectorSelectEl.value || '').trim();
    if (!connectorId) {
      writeActiveRemoteProviderConnectorId('');
      updateRemoteShadowUI();
      return;
    }
    applyRemoteProviderConnector(connectorId, { silent: false });
  });
  remoteProviderConnectorNameInput?.addEventListener('input', () => {
    if (remoteProviderConnectorSelectEl?.value) {
      writeActiveRemoteProviderConnectorId('');
      updateRemoteProviderConnectorUI();
    }
  });
  saveRemoteProviderConnectorBtn?.addEventListener('click', saveRemoteProviderConnector);
  deleteRemoteProviderConnectorBtn?.addEventListener('click', deleteRemoteProviderConnector);
  remoteProviderPresetSelectEl?.addEventListener('change', () => {
    if (activeRemoteProviderConnectorId && remoteProviderConnectorSelectEl?.value) {
      writeActiveRemoteProviderConnectorId('');
    }
    updateRemoteProviderModeUI();
  });
  remoteProviderHeaderNameInput?.addEventListener('input', () => {
    if (activeRemoteProviderConnectorId && remoteProviderConnectorSelectEl?.value) {
      writeActiveRemoteProviderConnectorId('');
      updateRemoteProviderConnectorUI();
    }
    updateRemoteShadowConnectButtonState();
  });
  remoteProviderPublicKeyInput?.addEventListener('input', () => {
    if (activeRemoteProviderConnectorId && remoteProviderConnectorSelectEl?.value) {
      writeActiveRemoteProviderConnectorId('');
      updateRemoteProviderConnectorUI();
    }
    updateRemoteShadowConnectButtonState();
  });
  remoteProviderBaseUrlInput?.addEventListener('input', () => {
    if (activeRemoteProviderConnectorId && remoteProviderConnectorSelectEl?.value) {
      writeActiveRemoteProviderConnectorId('');
      updateRemoteProviderConnectorUI();
    }
    updateRemoteShadowConnectButtonState();
  });
  remoteProviderFunctionNameInput?.addEventListener('input', () => {
    if (activeRemoteProviderConnectorId && remoteProviderConnectorSelectEl?.value) {
      writeActiveRemoteProviderConnectorId('');
      updateRemoteProviderConnectorUI();
    }
    updateRemoteShadowConnectButtonState();
  });
  remoteProviderHeadTableInput?.addEventListener('input', () => {
    if (activeRemoteProviderConnectorId && remoteProviderConnectorSelectEl?.value) {
      writeActiveRemoteProviderConnectorId('');
      updateRemoteProviderConnectorUI();
    }
    updateRemoteShadowConnectButtonState();
  });
  remoteProviderWorkspaceIdInput?.addEventListener('input', () => {
    if (activeRemoteProviderConnectorId && remoteProviderConnectorSelectEl?.value) {
      writeActiveRemoteProviderConnectorId('');
      updateRemoteProviderConnectorUI();
    }
    updateRemoteShadowConnectButtonState();
  });
  remoteProviderSecretInput?.addEventListener('input', () => {
    if (activeRemoteProviderConnectorId && remoteProviderConnectorSelectEl?.value) {
      writeActiveRemoteProviderConnectorId('');
      updateRemoteProviderConnectorUI();
    }
    updateRemoteShadowConnectButtonState();
  });
  remoteProviderRememberSecretInput?.addEventListener('change', () => {
    if (activeRemoteProviderConnectorId && remoteProviderConnectorSelectEl?.value) {
      writeActiveRemoteProviderConnectorId('');
      updateRemoteProviderConnectorUI();
    }
    updateRemoteShadowConnectButtonState();
  });
  connectRemoteShadowUrlBtn?.addEventListener('click', () => connectRemoteShadowUrl({ silent: false }));
  importRemoteShadowBtn?.addEventListener('click', promptRemoteShadowImport);
  guidedRemotePullBtn?.addEventListener('click', applyGuidedRemoteShadowPull);
  applyRemoteShadowPullBtn?.addEventListener('click', applyRemoteShadowPull);
  pushRemoteShadowBtn?.addEventListener('click', pushRemoteShadowManual);
  syncRemoteHistoryFiltersEl?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-remote-history-filter]');
    if (!button) return;
    const nextFilter = normalizeRemoteHistoryFilter(button.dataset.remoteHistoryFilter || '');
    if (nextFilter === activeRemoteHistoryFilter) return;
    activeRemoteHistoryFilter = nextFilter;
    updateRemoteShadowUI();
  });
  remoteAutoCheckOnStartInput?.addEventListener('change', () => {
    setRemoteShadowAutomationDraft({
      autoCheckOnStart: remoteAutoCheckOnStartInput.checked
    }, {
      persist: true,
      recheckAutomation: false
    });
  });
  remoteAutoPullWhenCleanInput?.addEventListener('change', () => {
    setRemoteShadowAutomationDraft({
      autoPullWhenClean: remoteAutoPullWhenCleanInput.checked
    }, {
      persist: true,
      recheckAutomation: true
    });
  });
  remoteAutoPushWhenStableInput?.addEventListener('change', () => {
    setRemoteShadowAutomationDraft({
      autoPushWhenStable: remoteAutoPushWhenStableInput.checked
    }, {
      persist: true,
      recheckAutomation: true
    });
  });
  syncRemoteHistoryListEl?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-remote-history-id]');
    if (!button) return;
    const nextRevisionId = String(button.dataset.remoteHistoryId || '').trim();
    if (!nextRevisionId || nextRevisionId === selectedRemoteHistoryRevisionId) return;
    selectedRemoteHistoryRevisionId = nextRevisionId;
    updateRemoteShadowUI();
  });
  syncRemoteHistoryDetailEl?.addEventListener('click', (event) => {
    const restoreButton = event.target.closest('[data-remote-history-restore-id]');
    const downloadButton = event.target.closest('[data-remote-history-download-id]');
    const actionButton = restoreButton || downloadButton;
    if (!actionButton) return;
    const revisionId = String(
      restoreButton?.dataset.remoteHistoryRestoreId
      || downloadButton?.dataset.remoteHistoryDownloadId
      || ''
    ).trim();
    if (revisionId && revisionId !== selectedRemoteHistoryRevisionId) {
      selectedRemoteHistoryRevisionId = revisionId;
      updateRemoteShadowUI();
    }
    if (downloadButton) {
      downloadSelectedRemoteHistoryRevision();
      return;
    }
    restoreSelectedRemoteHistoryRevision();
  });
  clearRemoteShadowBtn?.addEventListener('click', clearRemoteShadowSource);
  recheckRemoteShadowBtn?.addEventListener('click', () => {
    if (remoteShadowConfig?.url) {
      connectRemoteShadowUrl({ silent: false });
      return;
    }
    updateRemoteShadowUI();
    const comparison = computeRemoteShadowComparison();
    showToast(`Comparació remota actual: ${comparison.label}`);
  });
  remoteShadowFileInput?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (file) await importRemoteShadowBundleFile(file);
    event.target.value = '';
  });
  exportShadowBundleBtn?.addEventListener('click', async () => {
    if (!shadowSyncHistory.length) {
      showToast('Encara no hi ha revisions shadow per exportar.', 'info');
      return;
    }
    const bundle = createShadowSyncBundle();
    const baseName = slugifyFileName(bundle.state.lastRevisionId ? (syncPrepState?.workspace?.name || 'sutsumu') : 'sutsumu');
    const fileName = `${baseName}-shadow-sync-bundle-v1.json`;
    triggerDownload(fileName, JSON.stringify(bundle, null, 2), 'application/json;charset=utf-8');
    await writeShadowSyncState({
      ...(shadowSyncState || {}),
      enabled: true,
      status: shadowSyncHistory.length ? 'ready' : 'idle',
      lastExportedAt: new Date().toISOString(),
      historyCount: shadowSyncHistory.length,
      lastError: ''
    });
    showToast(`Bundle shadow exportat: ${fileName}`);
  });
  clearShadowHistoryBtn?.addEventListener('click', clearShadowSyncHistory);
  createWorkspaceBtn.addEventListener('click', () => createNewWorkspaceFile());
  openWorkspaceBtn.addEventListener('click', openExistingWorkspaceFile);
  saveWorkspaceBtn.addEventListener('click', saveWorkspace);
  saveWorkspaceAsBtn.addEventListener('click', saveWorkspaceAsNewFile);
  closeWorkspaceBtn.addEventListener('click', () => disconnectWorkspace());
  workspaceRecentListEl?.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const entryId = button.dataset.workspaceId;
    if (!entryId) return;
    if (button.dataset.action === 'open-recent-workspace') {
      await openRecentWorkspace(entryId);
    } else if (button.dataset.action === 'download-recent-workspace') {
      await downloadRecentWorkspace(entryId);
    } else if (button.dataset.action === 'remove-recent-workspace') {
      await removeRecentWorkspace(entryId);
    }
  });
  installAppBtn?.addEventListener('click', promptPwaInstall);
  refreshAppBtn?.addEventListener('click', applyPendingAppUpdate);
  checkUpdateBtn?.addEventListener('click', checkForAppUpdatesNow);
  prepareOfflineBtn?.addEventListener('click', prepareOfflineBundle);
  showGuideBtn?.addEventListener('click', reopenQuickStartGuide);
  quickStartDismissBtn?.addEventListener('click', dismissQuickStartGuide);
  quickStartKeepBtn?.addEventListener('click', keepQuickStartGuideVisible);

  window.addEventListener('online', () => {
    isOfflineMode = false;
    updatePwaUI();
    showToast('Connexió recuperada.', 'success');
  });

  window.addEventListener('offline', () => {
    isOfflineMode = true;
    updatePwaUI();
    showToast('Ara mateix Sutsumu està fora de línia. Continuaràs treballant amb la memòria local disponible.', 'info');
  });

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // Reprendre automatismes quan la pestanya o l'app mòbil torna al primer pla
      queueRemoteShadowAutomation('resume', { immediate: false });
    }
  });

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    updatePwaUI();
    showToast('Sutsumu ja es pot instal·lar com una app.', 'info');
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    updatePwaUI();
    showToast("Sutsumu s'ha instal·lat correctament.", 'success');
  });

  workspaceFileInput?.addEventListener('change', async (event) => {
    const file = event.target?.files?.[0];
    if (!file) return;
    try {
      await maybeOpenWorkspaceFromFileBlob(file, { forcePortable: true });
    } catch (err) {
      console.warn("No s'ha pogut obrir el workspace compatible.", err);
      showToast(err?.message || "No s'ha pogut obrir aquest workspace o el JSON no és vàlid.", 'error');
    } finally {
      event.target.value = '';
    }
  });
  backupNowBtn.addEventListener('click', async () => {
    try {
      const backup = await saveFullBackupSnapshot('manual-full-backup', { auto: false, force: true });
      if (backup) {
        queueExternalBackupAutosave('manual-full-backup');
        showToast('Backup intern complet desat correctament.');
      } else {
        showToast("No hi ha dades suficients per crear un backup intern complet.", 'info');
      }
    } catch (err) {
      console.error(err);
      const msg = isQuotaExceededError(err)
        ? "No hi ha prou espai local per crear un nou backup intern complet. Exporta un JSON extern i esborra backups antics si cal."
        : "No s'ha pogut crear el backup intern complet.";
      showToast(msg, 'error');
    }
  });
  editHistoryBtn.addEventListener('click', openVersionsDialog);
  editorSearchBtn?.addEventListener('click', () => {
    if (editorSearchPanel?.classList.contains('hidden')) {
      openEditorSearchPanel(true);
    } else {
      closeEditorSearchPanel();
    }
  });
  editorFocusBtn?.addEventListener('click', () => setEditorFocusMode(!editorFocusMode));
  editorSearchCloseBtn?.addEventListener('click', closeEditorSearchPanel);
  editorSearchInput?.addEventListener('input', () => refreshEditorSearchHighlights());
  editorSearchInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setCurrentEditorSearchMatch(editorSearchCurrentIndex + 1);
    }
  });
  editorReplaceInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      replaceCurrentEditorSearchMatch();
    }
  });
  editorSearchPrevBtn?.addEventListener('click', () => setCurrentEditorSearchMatch(editorSearchCurrentIndex - 1));
  editorSearchNextBtn?.addEventListener('click', () => setCurrentEditorSearchMatch(editorSearchCurrentIndex + 1));
  editorReplaceBtn?.addEventListener('click', () => {
    if (!replaceCurrentEditorSearchMatch()) showToast('No hi ha cap coincidència activa per reemplaçar.', 'info');
  });
  editorReplaceAllBtn?.addEventListener('click', () => {
    const replaced = replaceAllEditorSearchMatches();
    showToast(replaced > 0 ? `${replaced} coincidències reemplaçades.` : 'No hi havia cap coincidència per reemplaçar.', replaced > 0 ? 'success' : 'info');
  });
  editorOutlineListEl?.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-target-outline-id]');
    if (!button) return;
    const heading = editContentInput.querySelector(`[data-outline-id="${CSS.escape(button.dataset.targetOutlineId || '')}"]`);
    heading?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    heading?.focus?.();
  });
  exportTxtBtn.addEventListener('click', () => exportCurrentEditingDocument('txt'));
  exportMdBtn.addEventListener('click', () => exportCurrentEditingDocument('md'));
  exportHtmlBtn.addEventListener('click', () => exportCurrentEditingDocument('html'));
  modalOverlay.addEventListener('click', (e) => {
    if (e.target !== modalOverlay) return;
    if (!confirmModal.classList.contains('hidden')) {
      dismissConfirmModal();
      return;
    }
    if (!backupHistoryModal.classList.contains('hidden')) {
      closeBackupHistoryDialog();
      return;
    }
    if (!versionsModal.classList.contains('hidden')) {
      closeVersionsDialog();
      return;
    }
    closeModals();
  });

  confirmTypedInput.addEventListener('input', () => {
    const currentOkBtn = document.getElementById('confirmOkBtn');
    const requiredText = confirmTypedInput.dataset.requiredText || '';
    if (!currentOkBtn) return;
    currentOkBtn.disabled = requiredText ? confirmTypedInput.value.trim() !== requiredText : false;
  });

  function resetConfirmState() {
    confirmOnCancel = null;
    confirmWarningBox.textContent = '';
    confirmWarningBox.classList.add('hidden');
    confirmTypedWrap.classList.add('hidden');
    confirmTypedLabel.textContent = '';
    confirmTypedInput.value = '';
    confirmTypedInput.dataset.requiredText = '';
    confirmTypedHelp.textContent = '';
    const currentOkBtn = document.getElementById('confirmOkBtn');
    if (currentOkBtn) {
      currentOkBtn.disabled = false;
      currentOkBtn.textContent = 'Sí, continuar';
    }
  }

  // --- Sistema de Toasts ---
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = '';
    if (type === 'success') icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    else if (type === 'error') icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    else icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';

    const iconWrap = document.createElement('span');
    iconWrap.className = 'toast-icon';
    iconWrap.innerHTML = icon;

    const messageWrap = document.createElement('span');
    messageWrap.textContent = String(message);

    toast.appendChild(iconWrap);
    toast.appendChild(messageWrap);
    document.getElementById('toastContainer').appendChild(toast);

    setTimeout(() => {
      toast.classList.add('closing');
      toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
  }

  function dismissConfirmModal() {
    const onCancel = confirmOnCancel;
    resetConfirmState();
    confirmModal.classList.add('hidden');
    if (typeof onCancel === 'function') onCancel();
    const hasOtherModalOpen = !editModal.classList.contains('hidden') || !versionsModal.classList.contains('hidden') || !backupHistoryModal.classList.contains('hidden') || !commandPaletteModal.classList.contains('hidden') || !moveModal.classList.contains('hidden');
    if (!hasOtherModalOpen) {
      modalOverlay.classList.add('hidden');
    }
  }

  function forceCloseModals() {
    const wasEditModalOpen = !editModal.classList.contains('hidden');
    if (wasEditModalOpen) {
      flushPendingEditAutosave();
    }

    modalOverlay.classList.add('hidden');
    confirmModal.classList.add('hidden');
    resetConfirmState();
    editModal.classList.add('hidden');
    versionsModal.classList.add('hidden');
    backupHistoryModal.classList.add('hidden');
    commandPaletteModal.classList.add('hidden');
    moveModal.classList.add('hidden');
    if (commandPaletteInput) commandPaletteInput.value = '';
    if (commandPaletteListEl) commandPaletteListEl.innerHTML = '';
    commandPaletteResults = [];
    commandPaletteActiveIndex = 0;
    editingDocId = null;
    moveItemTargetId = null;
    selectedVersionId = null;
    selectedFullBackupId = null;
    if (editAutosaveTimer) {
      clearTimeout(editAutosaveTimer);
      editAutosaveTimer = null;
    }
    lastSavedEditSignature = '';
    lastDraftSignature = '';
    setEditorSaveStatus('Sense canvis', 'idle');
    updateEditorMetrics();
    resetEditorAssistantState();

    // Revocació de memòria multimèdia 
    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
      currentObjectUrl = null;
      mediaPreviewGroup.innerHTML = '';
      mediaPreviewGroup.classList.remove('word-preview-banner');
    }
  }

  function closeModals() {
    if (shouldGuardEditClose()) {
      openConfirm(
        'Tancar l’editor?',
        "Hi ha canvis sense desar definitivament. Si tanques ara, Sutsumu conservarà només l'esborrany local autosalvat fins que tornis a obrir el document i el desis.",
        () => {
          forceCloseModals();
          showToast("Editor tancat. L'esborrany local s'ha conservat.", 'info');
        }
      );
      return;
    }
    forceCloseModals();
  }

  function openConfirm(title, mesg, onConfirm, options = {}) {
    const { okLabel = 'Sí, continuar', warningText = '', requireText = '' } = options;

    confirmTitleEl.textContent = title;
    confirmMessageEl.innerHTML = mesg;
    resetConfirmState();
    confirmOnCancel = typeof options.onCancel === 'function' ? options.onCancel : null;

    if (warningText) {
      confirmWarningBox.textContent = warningText;
      confirmWarningBox.classList.remove('hidden');
    }

    if (requireText) {
      confirmTypedWrap.classList.remove('hidden');
      confirmTypedLabel.textContent = requireText;
      confirmTypedInput.dataset.requiredText = requireText;
      confirmTypedHelp.textContent = `Escriu exactament ${String.fromCharCode(34)}${requireText}${String.fromCharCode(34)} per confirmar.`;
    }

    confirmModal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');

    const currentOkBtn = document.getElementById('confirmOkBtn');
    const newOkBtn = currentOkBtn.cloneNode(true);
    currentOkBtn.parentNode.replaceChild(newOkBtn, currentOkBtn);
    newOkBtn.textContent = okLabel;
    newOkBtn.disabled = Boolean(requireText);

    newOkBtn.addEventListener('click', () => {
      onConfirm();
      forceCloseModals();
    });

    if (requireText) {
      setTimeout(() => confirmTypedInput.focus(), 0);
    }
  }

  // --- Funcions de Sistema de Fitxers ---

  function getFolderCurrentPath(folderId) {
    if (folderId === 'root') return [];
    const folder = docs.find(d => d.id === folderId);
    if (!folder) return [];

    const parentPath = getFolderCurrentPath(folder.parentId);
    return [...parentPath, folder];
  }

  function isValidMove(itemId, targetParentId) {
    const item = docs.find(d => d.id === itemId && !d.isDeleted);
    if (!item || item.parentId === targetParentId) return false;

    if (item.type === 'folder') {
      if (itemId === targetParentId) return false;
      const descendents = getChildrenIds(itemId);
      if (descendents.includes(targetParentId)) return false;
    }

    return true;
  }

  // Save actions ASYNC with Fallback
  async function saveData(reason = 'auto-save') {
    docs = normalizeDocs(docs);
    expandedFolders = normalizeExpandedFolders(expandedFolders, docs);
    const guardedRemoteImportReasons = ['remote-manual-pull', 'remote-guided-pull', 'remote-history-recovery', 'remote-auto-pull'];

    if (getMainStore()) {
      try {
        await getMainStore().setItem(STORAGE_KEY, docs);
        await getMainStore().setItem(EXPANDED_KEY, expandedFolders);
      } catch (e) {
        console.warn('IndexedDB/localForage ha fallat. Desant una còpia de seguretat mínima a localStorage.', e);
        const emergencyPayload = createEmergencyLocalPayload(docs, expandedFolders);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(emergencyPayload.docs));
        localStorage.setItem(EXPANDED_KEY, JSON.stringify(emergencyPayload.expandedFolders));
        if (!hasShownStorageFallbackToast) {
          const msg = isQuotaExceededError(e)
            ? "L'emmagatzematge principal s'ha quedat sense espai. Sutsumu ha desat una còpia mínima local i et recomana exportar una còpia completa ara mateix."
            : "IndexedDB ha fallat temporalment. Sutsumu ha desat una còpia mínima local perquè no perdis l'estructura.";
          showToast(msg, 'info');
          hasShownStorageFallbackToast = true;
        }
      }
    } else {
      const emergencyPayload = createEmergencyLocalPayload(docs, expandedFolders);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(emergencyPayload.docs));
      localStorage.setItem(EXPANDED_KEY, JSON.stringify(emergencyPayload.expandedFolders));
    }

    await saveLightBackupSnapshot(reason);
    queueSurvivalAttachmentMirrorSync();
    updateTargetSelects();
    queueAutomaticFullBackup(reason);
    if (!guardedRemoteImportReasons.includes(reason)) {
      queueExternalBackupAutosave(reason);
    }
    if (reason !== 'workspace-open' && !guardedRemoteImportReasons.includes(reason)) {
      queueWorkspaceAutosave(reason);
    }
    updateBackupStatusUI();
    updateAttachmentHealthUI();
    updateExternalBackupUI();
    updateWorkspaceUI();
    queueSyncPreparationRefresh(reason);
    queueShadowSyncRevision(reason);
    // Llançar l'automatisme de sync (push) quan l'estat local canvii
    queueRemoteShadowAutomation(reason, { immediate: false });
  }

  // Togglers expansibles
  function toggleFolder(folderId) {
    const idx = expandedFolders.indexOf(folderId);
    if (idx > -1) {
      expandedFolders.splice(idx, 1);
    } else {
      expandedFolders.push(folderId);
    }
    saveData();
    renderData();
  }

  collapseAllBtn.addEventListener('click', () => {
    expandedFolders = [];
    saveData();
    renderData();
  });

  expandAllBtn.addEventListener('click', () => {
    expandedFolders = docs.filter(d => d.type === 'folder').map(f => f.id);
    saveData();
    renderData();
  });

  // --- Global Drag & Drop per Pujar Fitxers (Des de l'Escriptori) ---
  let dragCounter = 0; // Per gestionar dragenter/leave de fills en pantalla completa

  document.addEventListener('dragenter', (e) => {
    if (!hasExternalFiles(e.dataTransfer)) return;
    e.preventDefault();
    dragCounter++;
    if (dragCounter === 1 && !globalDragOverlay.classList.contains('active')) {
      globalDragOverlay.classList.remove('hidden');
      globalDragOverlay.classList.add('active');
    }
  });

  document.addEventListener('dragover', (e) => {
    if (!hasExternalFiles(e.dataTransfer)) return;
    e.preventDefault();
  });

  document.addEventListener('dragleave', (e) => {
    if (!hasExternalFiles(e.dataTransfer)) return;
    e.preventDefault();
    dragCounter = Math.max(0, dragCounter - 1);
    if (dragCounter === 0) {
      globalDragOverlay.classList.add('hidden');
      globalDragOverlay.classList.remove('active');
    }
  });

  document.addEventListener('drop', async (e) => {
    if (!hasExternalFiles(e.dataTransfer)) return;
    e.preventDefault();
    dragCounter = 0;
    globalDragOverlay.classList.add('hidden');
    globalDragOverlay.classList.remove('active');

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Processa cada fitxer pujat directament
      // Afegeix-lo a la pestanya arrel (o la carpeta actual si existís el concepte de navegació)
      // Actualment ho estem afegint a "Inici" (root)

      let newDocsCount = 0;
      let hadWordWarning = false;

      for (const file of e.dataTransfer.files) {
        try {
          const preparedUpload = await prepareUploadPayload(file);
          const newDoc = {
            id: generateId('document'),
            type: 'document',
            title: preparedUpload.title || file.name,
            category: 'Sense categoria',
          content: preparedUpload.content || '',
          versions: [],
          fileBlob: preparedUpload.fileBlob || null,
          fileType: preparedUpload.fileType || '',
          fileName: preparedUpload.fileName || '',
          fileSize: Number(preparedUpload.fileSize || 0),
          sourceFormat: preparedUpload.sourceFormat || '',
          parentId: 'root',
          timestamp: new Date().toISOString()
          };

          docs.push(newDoc);
          newDocsCount++;
          if (newDoc.sourceFormat === 'docx') hadWordWarning = true;
        } catch (error) {
          console.error('Error processant el fitxer pujat', error);
          showToast(`No s'ha pogut processar "${file.name}"`, 'error');
        }
      }

      if (newDocsCount > 0) {
        await saveData();
        showToast(newDocsCount === 1 ? '1 document creat' : `${newDocsCount} documents creats`);
        if (hadWordWarning) {
          showToast("Els fitxers Word .docx s'han convertit a text editable dins Sutsumu", "info");
        }
        if (isSearchActive) applySearch(searchInput.value); else renderData();
      }
    }
  });

  // --- Toolbar Interaction per a WYSIWYG ---
  const toolbarBtns = document.querySelectorAll('.toolbar-btn');
  toolbarBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const toolbar = btn.closest('.editor-toolbar');
      const targetEditor = toolbar?.parentElement?.querySelector('.custom-richtext') || docContentInput;
      if (!targetEditor) return;
      targetEditor.focus();
      const command = btn.getAttribute('data-command');
      const commandValue = btn.getAttribute('data-value');
      document.execCommand(command, false, commandValue || null);
      if (targetEditor === editContentInput) {
        updateEditorMetrics();
        refreshEditorOutline();
        refreshEditorSearchHighlights();
        scheduleEditAutosave();
      }
    });
  });


  if (editorUndoBtn) {
    editorUndoBtn.addEventListener('click', () => {
      editContentInput.focus();
      document.execCommand('undo', false, null);
      updateEditorMetrics();
      refreshEditorOutline();
      refreshEditorSearchHighlights();
      scheduleEditAutosave();
    });
  }

  if (editorRedoBtn) {
    editorRedoBtn.addEventListener('click', () => {
      editContentInput.focus();
      document.execCommand('redo', false, null);
      updateEditorMetrics();
      refreshEditorOutline();
      refreshEditorSearchHighlights();
      scheduleEditAutosave();
    });
  }

  if (recentDocsListEl) {
    recentDocsListEl.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const docId = button.dataset.docId || '';
      if (!docId) return;
      if (button.dataset.action === 'remove-recent-doc') {
        removeRecentDoc(docId);
        return;
      }
      if (button.dataset.action === 'open-recent-doc') {
        openEditDialog(docId);
      }
    });
  }

  if (quickAccessListEl) {
    quickAccessListEl.addEventListener('click', async (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const docId = button.dataset.docId || '';
      if (!docId) return;
      if (button.dataset.action === 'quick-open') {
        openEditDialog(docId);
        return;
      }
      if (button.dataset.action === 'quick-pin') {
        await togglePinned(docId);
        return;
      }
      if (button.dataset.action === 'quick-favorite') {
        await toggleFavorite(docId);
      }
    });
  }

  openCommandPaletteBtn?.addEventListener('click', () => openCommandPalette());
  commandPaletteCloseBtn?.addEventListener('click', closeCommandPalette);
  commandPaletteInput?.addEventListener('input', (event) => {
    renderCommandPalette(event.target.value || '');
  });
  commandPaletteInput?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCommandPaletteActiveIndex(commandPaletteActiveIndex + 1);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCommandPaletteActiveIndex(commandPaletteActiveIndex - 1);
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      executeCommandPaletteEntry();
    }
  });
  commandPaletteListEl?.addEventListener('click', (event) => {
    const item = event.target.closest('.command-palette-item');
    if (!item) return;
    const index = Number(item.dataset.index || 0);
    executeCommandPaletteEntry(index);
  });
  commandPaletteListEl?.addEventListener('mousemove', (event) => {
    const item = event.target.closest('.command-palette-item');
    if (!item) return;
    const index = Number(item.dataset.index || 0);
    if (Number.isFinite(index)) setCommandPaletteActiveIndex(index);
  });

  editContentInput.addEventListener('input', () => {
    updateEditorMetrics();
    refreshEditorOutline();
    refreshEditorSearchHighlights();
    scheduleEditAutosave();
  });

  editContentInput.addEventListener('mousedown', () => forceRichEditorEditable());
  editContentInput.addEventListener('click', () => forceRichEditorEditable());

  editContentPlainInput?.addEventListener('input', () => {
    updateEditorMetrics();
    scheduleEditAutosave();
  });

  editorCompatToggleBtn?.addEventListener('click', () => {
    setEditorCompatMode(!editorCompatMode);
  });

  editContentInput.addEventListener('paste', (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData?.getData('text/plain') || '';
    if (document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, pastedText);
    } else {
      document.execCommand('insertHTML', false, formatPlainTextAsHtml(pastedText));
    }
    updateEditorMetrics();
    refreshEditorOutline();
    refreshEditorSearchHighlights();
    scheduleEditAutosave();
  });

  [editNameInput, editCategorySelect, editFolderDescInput, editFolderColorInput].forEach(el => {
    el.addEventListener('input', scheduleEditAutosave);
    el.addEventListener('change', scheduleEditAutosave);
  });

  // UI Tabs interactions
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      tabContents.forEach(c => c.classList.add('hidden'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      targetEl.classList.add('active');
      targetEl.classList.remove('hidden');
    });
  });

  // --- Target Selectors for Forms ---
  function getOptionsForHierarchy(currentId, depth, originItemId = null) {
    let optionsHTML = '';
    const childrenFolders = docs.filter(d => d.parentId === currentId && d.type === 'folder' && !d.isDeleted);

    childrenFolders.sort((a, b) => a.title.localeCompare(b.title));

    childrenFolders.forEach(folder => {
      const valid = originItemId ? isValidMove(originItemId, folder.id) : true;
      // Format spaces based on depth for visual tree in select
      const prefix = '&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(depth) + '↳ ';

      if (valid) {
        optionsHTML += `<option value="${folder.id}">${prefix}${folder.title}</option>`;
      } else {
        optionsHTML += `<option value="${folder.id}" disabled>${prefix}${folder.title} (No vàlid)</option>`;
      }

      optionsHTML += getOptionsForHierarchy(folder.id, depth + 1, originItemId);
    });

    return optionsHTML;
  }

  function updateTargetSelects() {
    let selectHTML = `<option value="root">🏠 Inici (Arrel)</option>`;
    selectHTML += getOptionsForHierarchy('root', 0);

    // Remember current choices to not disrupt users mid-typing
    const curDocVal = docTargetFolderSelect.value;
    const curFolderVal = folderTargetFolderSelect.value;

    docTargetFolderSelect.innerHTML = selectHTML;
    folderTargetFolderSelect.innerHTML = selectHTML;

    if (curDocVal && Array.from(docTargetFolderSelect.options).some(o => o.value === curDocVal)) docTargetFolderSelect.value = curDocVal;
    if (curFolderVal && Array.from(folderTargetFolderSelect.options).some(o => o.value === curFolderVal)) folderTargetFolderSelect.value = curFolderVal;
  }

  // --- Lector d'Arxius de Tot Tipus ---
  docUploadInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    addDocBtn.disabled = true;
    addDocBtn.dataset.originalLabel = addDocBtn.dataset.originalLabel || addDocBtn.innerHTML;
    addDocBtn.textContent = 'Processant fitxer...';

    try {
      const preparedUpload = await prepareUploadPayload(file);
      pendingUpload = preparedUpload;
      docNameInput.value = preparedUpload.title || stripFileExtension(file.name);

      if (preparedUpload.content) {
        docContentInput.innerHTML = sanitizeRichText(preparedUpload.content);
        docContentInput.setAttribute('data-placeholder', 'Escriu una nota ràpida aquí o el contingut del document llegit per la pujada apareixerà aquí sota...');
      } else {
        docContentInput.innerHTML = '';
        if (preparedUpload.sourceFormat === 'doc') {
          docContentInput.setAttribute('data-placeholder', 'Els fitxers Word antics (.doc) no es poden editar directament aquí. Converteix-los a .docx per poder-los visualitzar i editar dins Sutsumu.');
          showToast('Aquest Word antic (.doc) es desa com a adjunt. Per editar-lo dins Sutsumu, converteix-lo a .docx.', 'info');
        } else {
          docContentInput.setAttribute('data-placeholder', "(Aquest fitxer és multimèdia. El document ja s'ha capturat per binaris. Pots escriure igual notes addicionals aquí si vols)");
        }
      }

      if (preparedUpload.sourceFormat === 'docx') {
        showToast('Document Word .docx carregat i convertit a text editable', 'success');
      }
    } catch (error) {
      console.error('Error processant el fitxer seleccionat', error);
      pendingUpload = null;
      docContentInput.innerHTML = '';
      docContentInput.setAttribute('data-placeholder', 'Escriu una nota ràpida aquí o el contingut del document llegit per la pujada apareixerà aquí sota...');
      showToast(`No s'ha pogut llegir el fitxer "${file.name}"`, 'error');
    } finally {
      addDocBtn.disabled = false;
      if (addDocBtn.dataset.originalLabel) {
        addDocBtn.innerHTML = addDocBtn.dataset.originalLabel;
      }
    }
  });

  // --- Creació Elements ---
  async function addDocument() {
    const title = docNameInput.value.trim();
    const category = docCategorySelect.value;
    const tags = parseTagsInput(docTagsInput?.value || '');
    const destFolderId = docTargetFolderSelect.value;
    const content = getSanitizedEditorHtml(docContentInput);

    if (!title) {
      showToast("Introdueix un nom", "error");
      return;
    }

    const preparedUpload = pendingUpload || {
      content,
      fileBlob: null,
      fileType: '',
      fileName: '',
      fileSize: 0,
      sourceFormat: ''
    };

    const newDoc = {
      id: generateId('document'),
      type: 'document',
      title: title,
      category: category,
      tags,
      content: content,
      versions: [],
      fileBlob: preparedUpload.fileBlob || null,
      fileType: preparedUpload.fileType || '',
      fileName: preparedUpload.fileName || '',
      fileSize: Number(preparedUpload.fileSize || 0),
      sourceFormat: preparedUpload.sourceFormat || '',
      parentId: destFolderId,
      timestamp: new Date().toISOString()
    };

    docs.push(newDoc);

    // Auto-expand destionation to show the new file
    if (destFolderId !== 'root' && !expandedFolders.includes(destFolderId)) {
      expandedFolders.push(destFolderId);
    }

    await saveData();

    pendingUpload = null;
    docUploadInput.value = '';
    docNameInput.value = '';
    docContentInput.innerHTML = '';
    docContentInput.setAttribute('data-placeholder', 'Escriu una nota ràpida aquí o el contingut del document llegit per la pujada apareixerà aquí sota...');
    docCategorySelect.value = '';
    if (docTagsInput) docTagsInput.value = '';
    showToast("Document afegit");

    if (isSearchActive) applySearch(searchInput.value); else renderData();
  }

  async function addFolder() {
    const title = folderNameInput.value.trim();
    const destFolderId = folderTargetFolderSelect.value;
    const folderColor = folderColorInput.value;
    const desc = folderDescInput.value.trim();
    const tags = parseTagsInput(folderTagsInput?.value || '');

    if (!title) {
      showToast("Introdueix un nom", "error");
      return;
    }

    const newFolder = {
      id: generateId('folder'),
      type: 'folder',
      title: title,
      desc: desc,
      tags,
      parentId: destFolderId,
      color: folderColor, // Guardem el color seleccionat
      timestamp: new Date().toISOString()
    };

    docs.push(newFolder);

    // Auto-expand destionation to show the new folder
    if (destFolderId !== 'root' && !expandedFolders.includes(destFolderId)) {
      expandedFolders.push(destFolderId);
    }

    await saveData();
    folderNameInput.value = '';
    folderDescInput.value = '';
    if (folderTagsInput) folderTagsInput.value = '';
    showToast("Carpeta creada");

    if (isSearchActive) applySearch(searchInput.value); else renderData();
  }

  addDocBtn.addEventListener('click', addDocument);
  docNameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addDocument(); });

  addFolderBtn.addEventListener('click', addFolder);
  folderNameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addFolder(); });


  function appendItemTitleMarkers(titleRow, item) {
    const markers = [];
    if (item.isPinned) markers.push({ className: 'pinned', symbol: '📌', label: 'Fixat' });
    if (item.isFavorite) markers.push({ className: 'favorite', symbol: '★', label: 'Favorit' });
    if (!markers.length) return;

    const wrap = document.createElement('span');
    wrap.className = 'item-title-markers';
    markers.forEach(marker => {
      const markerEl = document.createElement('span');
      markerEl.className = `item-title-marker ${marker.className}`;
      markerEl.title = marker.label;
      markerEl.textContent = marker.symbol;
      wrap.appendChild(markerEl);
    });
    titleRow.appendChild(wrap);
  }

  function appendItemTagBadges(titleRow, item) {
    const tags = getItemTags(item);
    if (!tags.length) return;
    tags.slice(0, 3).forEach(tag => {
      const tagBadge = document.createElement('span');
      tagBadge.className = 'item-tag-badge';
      tagBadge.textContent = `#${tag.toLowerCase()}`;
      titleRow.appendChild(tagBadge);
    });
    if (tags.length > 3) {
      const moreBadge = document.createElement('span');
      moreBadge.className = 'item-tag-badge more';
      moreBadge.textContent = `+${tags.length - 3}`;
      titleRow.appendChild(moreBadge);
    }
  }

  function appendItemQuickToggleButtons(actionsDiv, item) {
    const pinBtn = document.createElement('button');
    pinBtn.className = `btn btn-secondary btn-small item-pin-btn ${item.isPinned ? 'active' : ''}`;
    pinBtn.innerHTML = '📌';
    pinBtn.title = item.isPinned ? "Desfixar de l'accés ràpid" : "Fixar a l'accés ràpid";
    pinBtn.onclick = async (e) => {
      e.stopPropagation();
      await togglePinned(item.id);
    };

    const favBtn = document.createElement('button');
    favBtn.className = `btn btn-secondary btn-small item-flag-btn ${item.isFavorite ? 'active' : ''}`;
    favBtn.innerHTML = '★';
    favBtn.title = item.isFavorite ? 'Treure de favorits' : 'Marcar com a favorit';
    favBtn.onclick = async (e) => {
      e.stopPropagation();
      await toggleFavorite(item.id);
    };

    actionsDiv.appendChild(pinBtn);
    actionsDiv.appendChild(favBtn);
  }


  // --- Renderitzat Arbre ---

  function buildTreeHTML(parentId, depth) {
    const items = docs.filter(d => d.parentId === parentId && !d.isDeleted);

    items.sort((a, b) => {
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;
      return a.title.localeCompare(b.title); // Alfabetica
    });

    let fragment = document.createDocumentFragment();

    items.forEach(doc => {
      const li = document.createElement('li');
      li.setAttribute('draggable', 'true');
      li.dataset.id = doc.id;

      const paddingPixels = 14 + (depth * 32);
      li.style.paddingLeft = paddingPixels + 'px';

      if (depth > 0) {
        const line = document.createElement('div');
        line.className = 'tree-line-indicator';
        line.style.left = (14 + ((depth - 1) * 32) + 12) + 'px'; // aligns 
        li.appendChild(line);
      }

      li.addEventListener('dragstart', handleDragStart);
      li.addEventListener('dragend', handleDragEnd);

      const hasChildren = doc.type === 'folder' && docs.filter(d => d.parentId === doc.id && !d.isDeleted).length > 0;
      const isExpanded = expandedFolders.includes(doc.id);

      if (doc.type === 'folder') {
        li.classList.add('item-folder');
        li.addEventListener('dragover', handleDragOver);
        li.addEventListener('dragleave', handleDragLeave);
        li.addEventListener('drop', handleDrop);
      }

      const dateStr = new Date(doc.timestamp).toLocaleString('ca-ES', { day: 'numeric', month: 'numeric', year: 'numeric' });

      const mainDiv = document.createElement('div');
      mainDiv.className = 'item-main';

      if (doc.type === 'folder') {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'tree-toggle-btn ' + (isExpanded ? 'expanded' : '');
        if (!hasChildren) toggleBtn.classList.add('no-children');
        toggleBtn.innerHTML = '<i></i>';
        toggleBtn.onclick = (e) => { e.stopPropagation(); toggleFolder(doc.id); };
        mainDiv.appendChild(toggleBtn);
      } else {
        const spacer = document.createElement('div');
        spacer.style.width = '24px';
        spacer.style.height = '24px';
        mainDiv.appendChild(spacer);
      }

      const iconSpan = document.createElement('span');
      iconSpan.className = 'item-icon';

      if (doc.type === 'folder') {
        const fColor = doc.color || '#94a3b8'; // Llum per defecte si ve del passat
        iconSpan.innerHTML = `
          <svg style="margin-top:2px;" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${fColor}" stroke="${fColor}" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
             <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
        `;
      } else {
        iconSpan.textContent = '📄';
      }

      mainDiv.appendChild(iconSpan);

      const contentDiv = document.createElement('div');
      contentDiv.className = 'item-content';

      const titleRow = document.createElement('div');
      const titleSpan = document.createElement('span');
      titleSpan.className = 'item-title';
      titleSpan.textContent = doc.title;
      titleRow.appendChild(titleSpan);
      appendItemTitleMarkers(titleRow, doc);

      if (doc.type === 'document') {
        if (isEditableWordDocument(doc)) {
          const wordBadge = document.createElement('span');
          wordBadge.className = 'item-category';
          wordBadge.style.background = '#dbeafe';
          wordBadge.style.color = '#1d4ed8';
          wordBadge.textContent = 'word';
          titleRow.appendChild(wordBadge);
        } else if (isRealBlob(doc.fileBlob)) {
          const blobBadge = document.createElement('span');
          blobBadge.className = 'item-category';
          blobBadge.style.background = '#e0e7ff';
          blobBadge.style.color = '#3730a3';
          blobBadge.textContent = "Fitxer Adjunt";
          titleRow.appendChild(blobBadge);
        }

        if (doc.category) {
          const catBadge = document.createElement('span');
          catBadge.className = 'item-category';
          catBadge.textContent = doc.category.toLowerCase();
          titleRow.appendChild(catBadge);
        }
      }
      appendItemTagBadges(titleRow, doc);
      contentDiv.appendChild(titleRow);

      if (doc.type === 'folder' && doc.desc) {
        const descDiv = document.createElement('div');
        descDiv.className = 'item-desc';
        descDiv.textContent = doc.desc;
        contentDiv.appendChild(descDiv);
      }

      const metaDiv = document.createElement('div');
      metaDiv.className = 'item-meta';
      const versionSuffix = doc.type === 'document' && Array.isArray(doc.versions) && doc.versions.length ? ` • ${doc.versions.length} versions` : '';
      metaDiv.textContent = `Creat el ${dateStr}${versionSuffix}`;
      contentDiv.appendChild(metaDiv);

      mainDiv.appendChild(contentDiv);

      if (doc.type === 'folder' && hasChildren) {
        mainDiv.onclick = () => toggleFolder(doc.id);
      } else if (doc.type === 'document') {
        mainDiv.onclick = () => openEditDialog(doc.id);
      }

      li.appendChild(mainDiv);

      // Actions section
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'item-actions';
      appendItemQuickToggleButtons(actionsDiv, doc);

      const moveBtn = document.createElement('button');
      moveBtn.className = 'btn btn-small-action';
      moveBtn.innerHTML = 'Moure';
      moveBtn.title = "Moure a una altra carpeta";
      moveBtn.onclick = (e) => { e.stopPropagation(); openMoveDialog(doc.id); };

      const dupBtn = document.createElement('button');
      dupBtn.className = 'btn btn-secondary btn-small';
      dupBtn.innerHTML = '⧉';
      dupBtn.title = "Duplicar";
      dupBtn.onclick = (e) => { e.stopPropagation(); duplicateItem(doc.id); };

      const editBtn = document.createElement('button');
      editBtn.className = 'btn btn-secondary btn-small';
      editBtn.innerHTML = '✎';
      editBtn.title = "Editar";
      editBtn.onclick = (e) => { e.stopPropagation(); openEditDialog(doc.id); };

      const delBtn = document.createElement('button');
      delBtn.className = 'btn btn-small-danger';
      delBtn.innerHTML = 'Eliminar';
      delBtn.onclick = (e) => { e.stopPropagation(); tryDelete(doc.id); };

      actionsDiv.appendChild(moveBtn);
      actionsDiv.appendChild(dupBtn);
      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(delBtn);

      li.appendChild(actionsDiv);

      fragment.appendChild(li);

      if (doc.type === 'folder' && isExpanded && !isSearchActive) {
        fragment.appendChild(buildTreeHTML(doc.id, depth + 1));
      }

    });

    return fragment;
  }

  function renderData(itemsToRender) {
    if (isTrashViewActive) {
      renderTrashList();
      return;
    }

    if (typeof itemsToRender === 'undefined') {
      const autoItems = getItemsForCurrentFlatView(searchInput?.value || '');
      if (Array.isArray(autoItems)) {
        renderData(autoItems);
        return;
      }
      isSearchActive = false;
    }

    listEl.innerHTML = '';
    hideEmptyState();

    updateTargetSelects();

    const activeDocs = docs.filter(doc => !doc.isDeleted);
    const isFlatView = Array.isArray(itemsToRender);
    if (isFlatView) {
      const resultsCount = itemsToRender.length;
      docCountEl.textContent = `${resultsCount} resultat${resultsCount === 1 ? '' : 's'} · ${activeDocs.length} elements totals`;
    } else {
      docCountEl.textContent = activeDocs.length === 1 ? '1 element total' : `${activeDocs.length} elements totals`;
    }

    const hasFilters = activeTypeFilter !== 'all' || Boolean(activeTagFilter);
    const hasQuery = Boolean(searchInput?.value.trim());
    if (!isFlatView) {
      searchActiveWarning.classList.add('hidden');
      const treeFragment = buildTreeHTML('root', 0);
      listEl.appendChild(treeFragment);

      if (activeDocs.length === 0) {
        setEmptyState('default');
      }
    } else {
      searchActiveWarning.classList.remove('hidden');
      searchActiveWarning.textContent = hasQuery && hasFilters
        ? 'Mode de visualització plana: cerca global i filtres actius. Neteja el cercador o els filtres per tornar a la vista d\'arbre normal.'
        : (hasFilters
          ? 'Mode de visualització plana: filtres actius. Treu els filtres per tornar a la vista d\'arbre normal.'
          : 'Mode de visualització plana: resultats de la cerca global actius. Fes clic a la “X” del cercador per tornar a la vista d\'arbre normal.');
      renderPlaneSearchList(itemsToRender);
    }
    updateListFilterBar();
    renderTagFilterCard();
    renderRecentDocsHistory();
    renderQuickAccess();
    if (isCommandPaletteOpen()) renderCommandPalette(commandPaletteInput?.value || '');
  }

  // Renderitzador pla quan busquem
  function renderPlaneSearchList(itemsToRender) {
    if (itemsToRender.length === 0) {
      setEmptyState('search');
      return;
    }

    itemsToRender.forEach((doc) => {
      const li = document.createElement('li');
      li.dataset.id = doc.id;

      if (doc.type === 'folder') li.classList.add('item-folder');

      const dateStr = new Date(doc.timestamp).toLocaleString('ca-ES', { day: 'numeric', month: 'numeric', year: 'numeric' });

      const mainDiv = document.createElement('div');
      mainDiv.className = 'item-main';

      const iconSpan = document.createElement('span');
      iconSpan.className = 'item-icon';

      if (doc.type === 'folder') {
        const fColor = doc.color || '#94a3b8'; // Llum per defecte si ve del passat
        iconSpan.innerHTML = `
          <svg style="margin-top:2px;" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${fColor}" stroke="${fColor}" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
             <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
        `;
      } else {
        iconSpan.textContent = '📄';
      }

      mainDiv.appendChild(iconSpan);

      const contentDiv = document.createElement('div');
      contentDiv.className = 'item-content';

      const titleRow = document.createElement('div');
      const titleSpan = document.createElement('span');
      titleSpan.className = 'item-title';
      titleSpan.textContent = doc.title;
      titleRow.appendChild(titleSpan);
      appendItemTitleMarkers(titleRow, doc);

      if (doc.type === 'document') {
        if (isEditableWordDocument(doc)) {
          const wordBadge = document.createElement('span');
          wordBadge.className = 'item-category';
          wordBadge.style.background = '#dbeafe';
          wordBadge.style.color = '#1d4ed8';
          wordBadge.textContent = 'word';
          titleRow.appendChild(wordBadge);
        } else if (isRealBlob(doc.fileBlob)) {
          const blobBadge = document.createElement('span');
          blobBadge.className = 'item-category';
          blobBadge.style.background = '#e0e7ff';
          blobBadge.style.color = '#3730a3';
          blobBadge.textContent = 'fitxer adjunt';
          titleRow.appendChild(blobBadge);
        }

        if (doc.category) {
          const catBadge = document.createElement('span');
          catBadge.className = 'item-category';
          catBadge.textContent = doc.category.toLowerCase();
          titleRow.appendChild(catBadge);
        }
      }
      appendItemTagBadges(titleRow, doc);
      contentDiv.appendChild(titleRow);

      if (doc.type === 'folder' && doc.desc) {
        const descDiv = document.createElement('div');
        descDiv.className = 'item-desc';
        descDiv.textContent = doc.desc;
        contentDiv.appendChild(descDiv);
      }

      const metaDiv = document.createElement('div');
      metaDiv.className = 'item-meta';
      const versionSuffix = doc.type === 'document' && Array.isArray(doc.versions) && doc.versions.length ? ` • ${doc.versions.length} versions` : '';
      metaDiv.textContent = `Creat el ${dateStr}${versionSuffix}`;

      const pathContext = document.createElement('span');
      pathContext.className = 'search-context';

      let pathStrStr = 'Inici';
      if (doc.parentId !== 'root') {
        const contextPath = getFolderCurrentPath(doc.parentId);
        pathStrStr += ' > ' + contextPath.map(p => p.title).join(' > ');
      }
      const pathEm = document.createElement('em');
      pathEm.textContent = `Ruta: ${pathStrStr}`;
      pathContext.appendChild(pathEm);
      metaDiv.appendChild(pathContext);

      contentDiv.appendChild(metaDiv);
      mainDiv.appendChild(contentDiv);

      mainDiv.onclick = () => openEditDialog(doc.id);

      li.appendChild(mainDiv);

      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'item-actions';
      appendItemQuickToggleButtons(actionsDiv, doc);

      const moveBtn = document.createElement('button');
      moveBtn.className = 'btn btn-small-action';
      moveBtn.innerHTML = 'Moure';
      moveBtn.onclick = (e) => { e.stopPropagation(); openMoveDialog(doc.id); };

      const dupBtn = document.createElement('button');
      dupBtn.className = 'btn btn-secondary btn-small';
      dupBtn.innerHTML = '⧉';
      dupBtn.title = "Duplicar";
      dupBtn.onclick = (e) => { e.stopPropagation(); duplicateItem(doc.id); };

      const editBtn = document.createElement('button');
      editBtn.className = 'btn btn-secondary btn-small';
      editBtn.innerHTML = '✎';
      editBtn.onclick = (e) => { e.stopPropagation(); openEditDialog(doc.id); };

      const delBtn = document.createElement('button');
      delBtn.className = 'btn btn-small-danger';
      delBtn.innerHTML = 'Eliminar';
      delBtn.onclick = (e) => { e.stopPropagation(); tryDelete(doc.id); };

      actionsDiv.appendChild(moveBtn);
      actionsDiv.appendChild(dupBtn);
      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(delBtn);

      li.appendChild(actionsDiv);
      listEl.appendChild(li);
    });
  }

  // --- Html Drag & Drop Lògica ---

  function handleDragStart(e) {
    draggedItemId = this.dataset.id;
    this.style.opacity = '0.5';
    // Efectes
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', draggedItemId);
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    listEl.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    draggedItemId = null;
  }

  function handleDragOver(e) {
    e.preventDefault();
    if (!draggedItemId) return;

    const targetFolderId = this.dataset.id;
    if (isValidMove(draggedItemId, targetFolderId)) {
      e.dataTransfer.dropEffect = 'move';
      this.classList.add('drag-over');
    } else {
      e.dataTransfer.dropEffect = 'none';
      this.classList.remove('drag-over');
    }
    return false;
  }

  function handleDragLeave(e) {
    this.classList.remove('drag-over');
  }

  function handleDrop(e) {
    e.stopPropagation();
    this.classList.remove('drag-over');

    if (!draggedItemId) return;
    const targetFolderId = this.dataset.id;

    if (isValidMove(draggedItemId, targetFolderId)) {
      moveItemTo(draggedItemId, targetFolderId);
    } else {
      showToast("Impossible moure la carpeta a dins d'ella mateixa", "error");
    }
    return false;
  }

  async function moveItemTo(itemId, newParentId) {
    const itemIndex = docs.findIndex(d => d.id === itemId);
    if (itemIndex > -1) {
      const itemTitle = docs[itemIndex].title;
      docs[itemIndex].parentId = newParentId;

      if (newParentId !== 'root' && !expandedFolders.includes(newParentId)) {
        expandedFolders.push(newParentId);
      }

      await saveData();

      if (isSearchActive) {
        applySearch(searchInput.value);
      } else {
        renderData();
      }

      let targetName = 'Inici';
      if (newParentId !== 'root') {
        targetName = docs.find(d => d.id === newParentId).title;
      }
      showToast(`S'ha mogut '${itemTitle}' a '${targetName}'`, "info");
    }
  }


  // --- Cerca Global ---
  function applySearch(query) {
    refreshDataView(typeof query === 'string' ? query : (searchInput?.value || ''));
  }

  searchInput.addEventListener('input', (e) => {
    applySearch(e.target.value.trim());
  });

  if (listFilterBar) {
    listFilterBar.addEventListener('click', (event) => {
      const button = event.target.closest('[data-clear-filter]');
      if (!button) return;
      const mode = button.dataset.clearFilter;
      if (mode === 'type' || mode === 'all') activeTypeFilter = 'all';
      if (mode === 'tag' || mode === 'all') activeTagFilter = '';
      refreshDataView();
    });
  }

  if (tagFilterListEl) {
    tagFilterListEl.addEventListener('click', (event) => {
      const button = event.target.closest('[data-tag-id]');
      if (!button) return;
      const nextTag = button.dataset.tagId || '';
      activeTagFilter = activeTagFilter === nextTag ? '' : nextTag;
      refreshDataView();
    });
  }

  tagFilterQuickButtons.forEach(button => {
    button.addEventListener('click', () => {
      const nextType = button.dataset.typeFilter || 'all';
      activeTypeFilter = activeTypeFilter === nextType ? 'all' : nextType;
      if (activeTypeFilter === 'all') activeTagFilter = '';
      refreshDataView();
    });
  });


  // --- Move Dialog Modal ---

  function openMoveDialog(id) {
    const itemToMove = docs.find(d => d.id === id);
    if (!itemToMove) return;

    moveItemTargetId = id;
    moveTargetNameEl.textContent = `"${itemToMove.title}"`;

    let selectHTML = '';

    if (isValidMove(itemToMove.id, 'root')) {
      selectHTML += `<option value="root">🏠 Inici (Arrel)</option>`;
    } else {
      selectHTML += `<option value="root" disabled>🏠 Inici (Actual)</option>`;
    }

    selectHTML += getOptionsForHierarchy('root', 0, itemToMove.id);

    moveSelectEl.innerHTML = selectHTML;

    moveSelectEl.value = 'root';
    Array.from(moveSelectEl.options).some(opt => {
      if (!opt.disabled && opt.value !== itemToMove.parentId) {
        moveSelectEl.value = opt.value;
        return true;
      }
      return false;
    });

    moveModal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
  }

  moveSaveBtn.addEventListener('click', () => {
    if (!moveItemTargetId) return;
    const targetFolderId = moveSelectEl.value;

    if (targetFolderId) {
      moveItemTo(moveItemTargetId, targetFolderId);
    }
    closeModals();
  });

  // --- Funcions Edit / Delete / Preview Llevatges Màximes ---

  async function openEditDialog(id) {
    const doc = docs.find(d => d.id === id);
    if (editingDocId && editingDocId !== id && isEditModalOpen()) {
      const hadPendingDraft = shouldGuardEditClose() || Boolean(editAutosaveTimer);
      flushPendingEditAutosave();
      if (!versionsModal.classList.contains('hidden')) closeVersionsDialog();
      if (hadPendingDraft) {
        showToast("S'ha autosalvat un esborrany del document anterior abans d'obrir-ne un altre.", "info");
      }
    }
    if (!doc) return;

    editingDocId = id;
    if (editAutosaveTimer) {
      clearTimeout(editAutosaveTimer);
      editAutosaveTimer = null;
    }

    editNameInput.value = doc.title;
    if (editTagsInput) editTagsInput.value = formatTagsInput(doc.tags || []);
    lastSavedEditSignature = getSnapshotSignature(getSavedSnapshotForItem(doc));
    lastDraftSignature = '';
    setEditorSaveStatus('Sense canvis', 'idle');
    updateEditorMetrics();

    if (doc.type === 'folder') {
      editModalTitle.textContent = 'Editar carpeta';
      editCategoryGroup.style.display = 'none';
      editContentGroup.style.display = 'none';

      editFolderColorGroup.classList.remove('hidden');
      editFolderColorInput.value = doc.color || '#0ea5e9';

      editFolderDescGroup.classList.remove('hidden');
      editFolderDescInput.value = doc.desc || '';

      mediaPreviewGroup.classList.add('hidden');
      mediaPreviewGroup.innerHTML = '';
      mediaPreviewGroup.classList.remove('word-preview-banner');
      editDocumentTools.classList.add('hidden');
      editModal.classList.remove('modal-large');
    } else {
      editModalTitle.textContent = 'Editar document';
      editCategoryGroup.style.display = 'flex';
      editFolderColorGroup.classList.add('hidden');
      editFolderDescGroup.classList.add('hidden');
      editDocumentTools.classList.remove('hidden');

      const matchCat = Array.from(editCategorySelect.options).find(o => o.value === doc.category);
      editCategorySelect.value = matchCat ? doc.category : '';

      const editableWordDoc = isEditableWordDocument(doc);

      if (editableWordDoc) {
        editContentGroup.classList.remove('hidden');
        editContentGroup.style.display = 'flex';
        setEditorDocumentContent(doc.content || '');

        mediaPreviewGroup.classList.remove('hidden');
        mediaPreviewGroup.classList.add('word-preview-banner');
        if (isRealBlob(doc.fileBlob)) {
          currentObjectUrl = URL.createObjectURL(doc.fileBlob);
        }

        const originalFileCta = isRealBlob(doc.fileBlob)
          ? `<a href="${currentObjectUrl}" download="${escapeHtml(doc.fileName || doc.title)}" class="btn btn-secondary">Descarregar .docx original</a>`
          : '';

        mediaPreviewGroup.innerHTML = `
          <div class="word-file-banner-content">
            <div>
              <strong>Document Word editable</strong>
              <p>${isRealBlob(doc.fileBlob)
                ? "Aquest .docx s'ha convertit a text editable dins Sutsumu. Els canvis que facis aquí afecten la versió editable interna; l'original continua disponible per descarregar."
                : "L'original .docx no és disponible en aquest dispositiu, però el text convertit continua sent editable dins Sutsumu."}</p>
            </div>
            ${originalFileCta}
          </div>
        `;
        editModal.classList.add('modal-large');
      } else if (isRealBlob(doc.fileBlob)) {
        editContentGroup.classList.add('hidden');
        editDocumentTools.classList.add('hidden');
        mediaPreviewGroup.classList.remove('hidden');
        mediaPreviewGroup.classList.remove('word-preview-banner');
        editModal.classList.add('modal-large');

        if (!doc.fileBlob || typeof doc.fileBlob !== 'object' || typeof doc.fileBlob.size === 'undefined') {
          mediaPreviewGroup.innerHTML = `
            <div style="background: #fee2e2; color: #991b1b; padding: 16px; border-radius: 8px; font-size: 14px;">
              <strong>Arxiu corrupte:</strong> Aquest fitxer es va desar utilitzant una versió de memòria incompatible i el seu format binari s'ha perdut. Si us plau, esborra aquest document i torna'l a pujar.
            </div>
          `;
        } else {
          currentObjectUrl = URL.createObjectURL(doc.fileBlob);
          const ft = doc.fileType || '';

          if (ft.startsWith('image/')) {
            mediaPreviewGroup.innerHTML = `<img src="${currentObjectUrl}" alt="Imatge" />`;
          } else if (ft.startsWith('video/')) {
            mediaPreviewGroup.innerHTML = `<video controls src="${currentObjectUrl}"></video>`;
          } else if (ft.startsWith('audio/')) {
            mediaPreviewGroup.innerHTML = `<audio controls src="${currentObjectUrl}"></audio>`;
          } else if (ft === 'application/pdf') {
            mediaPreviewGroup.innerHTML = `<embed src="${currentObjectUrl}#toolbar=0" type="application/pdf" width="100%" height="600" />`;
          } else if (ft === 'application/epub+zip' || (doc.fileName && doc.fileName.toLowerCase().endsWith('.epub'))) {
            mediaPreviewGroup.innerHTML = `
              <div id="epubViewer" style="width: 100%; height: 60vh; min-height: 400px; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; gap: 10px; margin-bottom: 15px;">
                  <button id="epubPrev" class="btn btn-secondary" style="margin: 0; flex: 1;">← Pàgina Anterior</button>
                  <button id="epubNext" class="btn btn-secondary" style="margin: 0; flex: 1;">Següent Pàgina →</button>
                </div>
                <div style="flex: 1; border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; overflow: hidden; position: relative; height: 100%;">
                  <div id="epubArea" style="position: absolute; top:0; left:0; right:0; bottom:0; padding: 20px;"></div>
                </div>
              </div>
            `;

            setTimeout(() => {
              try {
                if (typeof ePub !== 'undefined' && window.JSZip) {
                  const reader = new FileReader();

                  reader.onload = function(event) {
                    try {
                      const book = ePub();
                      book.open(event.target.result, 'binary').then(() => {
                        const rendition = book.renderTo('epubArea', {
                          width: '100%',
                          height: '100%',
                          spread: 'none',
                          allowScriptedContent: true
                        });

                        rendition.display().then(() => {
                          setTimeout(() => {
                            const iframe = document.querySelector('#epubArea iframe');
                            if (iframe) {
                              iframe.style.width = '100%';
                              iframe.style.height = '100%';
                            }
                            rendition.resize();
                          }, 250);
                        }).catch((e) => {
                          console.error('Error drawing EPUB pages', e);
                          document.getElementById('epubViewer').innerHTML = "<p>El contingut d'aquest llibre no es pot imprimir a la pantalla.</p>";
                        });

                        document.getElementById('epubPrev').addEventListener('click', (e) => { e.preventDefault(); rendition.prev(); });
                        document.getElementById('epubNext').addEventListener('click', (e) => { e.preventDefault(); rendition.next(); });
                      }).catch(err => {
                        console.error("Error obrint l'arxiu EPUB pur", err);
                        document.getElementById('epubViewer').innerHTML = "<p>Aquest motor EPUB no és capaç de desempaquetar el llibre en entorn local net.</p>";
                      });
                    } catch (e) {
                      console.error('Error drawing EPUB via Buffer', e);
                      document.getElementById('epubViewer').innerHTML = "<p>L'arxiu EPUB no es pot inicialitzar com a dades en calent.</p>";
                    }
                  };

                  reader.readAsArrayBuffer(doc.fileBlob);
                } else {
                  mediaPreviewGroup.innerHTML = "<p>Lector d'EPUB no disponible (problema de xarxa amb la llibreria CDN).</p>";
                }
              } catch (err) {
                console.error('Error carregant EPUB', err);
                mediaPreviewGroup.innerHTML = '<p>Error processant aquest arxiu EPUB.</p>';
              }
            }, 350);
          } else {
            mediaPreviewGroup.innerHTML = `
              <div class="media-download-box">
                <p>${isLegacyWordFile(doc)
                  ? "Aquest Word antic (.doc) no es pot editar directament al navegador. Desa'l com a .docx i torna'l a pujar per poder-lo visualitzar i editar dins Sutsumu."
                  : `Mida del fitxer: ${(doc.fileBlob.size / 1024 / 1024).toFixed(2)} MB`}</p>
                <a href="${currentObjectUrl}" download="${escapeHtml(doc.fileName || doc.title)}" class="btn btn-primary" style="display:-webkit-inline-box;">Descarregar Fitxer (Extensió Nadiua)</a>
              </div>`;
          }
        }
      } else if (doc.binaryFileUnavailable && !editableWordDoc) {
        editContentGroup.classList.add('hidden');
        editDocumentTools.classList.add('hidden');
        mediaPreviewGroup.classList.remove('hidden');
        mediaPreviewGroup.classList.remove('word-preview-banner');
        mediaPreviewGroup.innerHTML = `
          <div style="background: #fff7ed; color: #9a3412; padding: 16px; border-radius: 8px; font-size: 14px;">
            <strong>Fitxer no recuperable en aquest dispositiu:</strong> la còpia binària original d'aquest document no està disponible perquè la sessió es va haver de desar en un mode de compatibilitat sense IndexedDB.
          </div>
        `;
        editModal.classList.remove('modal-large');
      } else {
        mediaPreviewGroup.classList.add('hidden');
        mediaPreviewGroup.classList.remove('word-preview-banner');
        editDocumentTools.classList.remove('hidden');
        editContentGroup.classList.remove('hidden');
        editContentGroup.style.display = 'flex';
        setEditorDocumentContent(doc.content || '');
        editModal.classList.add('modal-large');
      }
    }

    const shouldPreferCompatMode = window.location.protocol === 'file:' && doc.type === 'document' && mediaPreviewGroup.classList.contains('hidden');
    setEditorCompatMode(shouldPreferCompatMode, { silent: true, keepFocus: false });
    restoreEditDraftIfAvailable(doc);
    if (editorCompatMode) syncPlainEditorFromRich();
    rememberRecentDoc(doc, 'open');
    closeEditorSearchPanel();
    setEditorFocusMode(false);
    refreshEditorOutline();

    editModal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');

    requestAnimationFrame(() => {
      if (doc.type === 'document' && !editContentGroup.classList.contains('hidden')) {
        if (editorCompatMode && editContentPlainInput) {
          editContentPlainInput.scrollTop = 0;
          editContentPlainInput.focus();
        } else {
          editContentInput.scrollTop = 0;
          forceRichEditorEditable();
          editContentInput.focus();
        }
      } else {
        editNameInput.focus();
      }
    });
  }


  editSaveBtn.addEventListener('click', async () => {
    if (!editingDocId) return;

    const nName = editNameInput.value.trim();
    if (!nName) {
      showToast('El nom no pot estar buit', 'error');
      return;
    }

    if (editAutosaveTimer) {
      clearTimeout(editAutosaveTimer);
      editAutosaveTimer = null;
    }

    const idx = docs.findIndex(d => d.id === editingDocId);
    if (idx > -1) {
      const previousDocumentSnapshot = docs[idx].type === 'document' ? getDocumentCurrentSnapshot(docs[idx]) : null;
      docs[idx].title = nName;
      if (docs[idx].type === 'document') {
        docs[idx].category = editCategorySelect.value;
        docs[idx].tags = parseTagsInput(editTagsInput?.value || '');

        if (!docs[idx].fileBlob || isEditableWordDocument(docs[idx])) {
          docs[idx].content = getActiveEditorHtml();
        }

        pushVersionIntoDocument(docs[idx], previousDocumentSnapshot, 'manual-save');
      } else if (docs[idx].type === 'folder') {
        docs[idx].color = editFolderColorInput.value;
        docs[idx].desc = editFolderDescInput.value.trim();
        docs[idx].tags = parseTagsInput(editTagsInput?.value || '');
      }

      await saveData();
      rememberRecentDoc(docs[idx], 'save');
      lastSavedEditSignature = getSnapshotSignature(getSavedSnapshotForItem(docs[idx]));
      clearEditDraft(editingDocId);
      setEditorSaveStatus('Tot desat', 'saved');

      if (isSearchActive) {
        applySearch(searchInput.value);
      } else {
        renderData();
      }
      showToast('Canvis desats correctament');
    }

    // After a successful save we should close directly, not re-run the dirty guard.
    forceCloseModals();
  });

  async function duplicateItem(id, parentIdOverride = null) {
    const itemToDuplicate = docs.find(d => d.id === id);
    if (!itemToDuplicate) return;

    const newId = generateId(itemToDuplicate.type);
    const newItem = { ...itemToDuplicate, id: newId };
    if (itemToDuplicate.type === 'document') {
      newItem.versions = normalizeVersions(itemToDuplicate.versions || []).map(version => ({ ...version, id: generateId('version') }));
    }

    if (parentIdOverride) {
      newItem.parentId = parentIdOverride;
    } else {
      newItem.title = newItem.title + ' (Còpia)';
    }

    newItem.timestamp = new Date().toISOString();

    docs.push(newItem);

    if (itemToDuplicate.type === 'folder') {
      // Clonem recursivament tots els fills indicant que aniran dins la nova carpeta
      const children = docs.filter(d => d.parentId === itemToDuplicate.id && !d.isDeleted);
      for (const child of children) {
        await duplicateItem(child.id, newId);
      }
    }

    // Només el primer fill que invoca la funció fa un save render per optimització
    if (!parentIdOverride) {
      await saveData();
      if (isSearchActive) {
        applySearch(searchInput.value);
      } else {
        renderData();
      }
      showToast('Element duplicat correctament');
    }
  }

  function tryDelete(id) {
    const item = docs.find(d => d.id === id);
    if (!item) return;

    if (item.type === 'folder') {
      const childrenIds = getChildrenIds(item.id, true); // Identificar tot
      let deleteMessage = `Estàs segur que vols moure la llibreta "<strong>${escapeHtml(item.title)}</strong>" a la paperera?`; 

      if (childrenIds.length > 0) {
        const countLabel = childrenIds.length === 1 ? '1 element' : `${childrenIds.length} elements`;
        deleteMessage += `<br><br><span style="color:#ef4444">També s'ocultarà la quantitat de ${countLabel} a dins d'aquesta llibreta i les seves filles.</span>`;
      }

      openConfirm("Moure a la Paperera", deleteMessage, async () => {
        const idsToDelete = [item.id, ...childrenIds];
        docs.forEach(d => {
          if (idsToDelete.includes(d.id)) d.isDeleted = true;
        });

        idsToDelete.forEach(deletedId => {
          const idx = expandedFolders.indexOf(deletedId);
          if (idx > -1) expandedFolders.splice(idx, 1);
        });

        await saveData();
        if (isSearchActive) applySearch(searchInput.value); else renderData();

        showToast(`Moguda a la paperera correctament`);
      });

    } else {
      openConfirm("Moure a la Paperera", `Vols moure "<strong>${escapeHtml(item.title)}</strong>" a la paperera?`, async () => {
        item.isDeleted = true;
        await saveData();
        if (isSearchActive) applySearch(searchInput.value); else renderData();
        showToast("Document mogut a la paperera");
      });
    }
  }

  function getChildrenIds(parentId, includeDeleted = false) {
    let childIds = [];
    const children = docs.filter(d => d.parentId === parentId && (includeDeleted || !d.isDeleted));
    children.forEach(child => {
      childIds.push(child.id);
      if (child.type === 'folder') {
        childIds = childIds.concat(getChildrenIds(child.id, includeDeleted));
      }
    });
    return childIds;
  }

  // --- Trash Bin View i Accions ---
  trashBtn.addEventListener('click', () => {
    isTrashViewActive = true;
    isSearchActive = false;
    searchInput.value = '';

    listTitle.textContent = "Paperera";
    listSubtitle.textContent = "Elements esborrats pendents de ser reciclats o destruïts completament.";
    listTitle.style.color = "#dc2626";

    emptyTrashBtn.classList.remove('hidden');
    exitTrashBtn.classList.remove('hidden');
    trashBtn.classList.add('hidden');
    searchActiveWarning.classList.add('hidden');

    renderData();
  });

  exitTrashBtn.addEventListener('click', () => {
    isTrashViewActive = false;

    listTitle.textContent = "Arbre d'arxius";
    listSubtitle.textContent = "Visualització en jerarquia completa.";
    listTitle.style.color = ""; // Restore css default

    emptyTrashBtn.classList.add('hidden');
    exitTrashBtn.classList.add('hidden');
    trashBtn.classList.remove('hidden');

    renderData();
  });

  emptyTrashBtn.addEventListener('click', () => {
    const trashItems = docs.filter(d => d.isDeleted);
    if (trashItems.length === 0) return;
    openConfirm(
      'Destruir Paperera',
      'Estàs a punt de destruir per sempre tots els fitxers aquí continguts. És impossible desfer-ho.',
      async () => {
        const canContinue = await prepareSafetySnapshotOrAbort('before-empty-trash', 'buidar la paperera');
        if (!canContinue) return;
        docs = docs.filter(d => !d.isDeleted);
        await saveData('empty-trash');
        renderData();
        showToast("La paperera s'ha alliberat completament");
      },
      {
        okLabel: 'Buidar per sempre',
        warningText: "Abans d'executar-se, Sutsumu desarà una còpia completa de recuperació amb carpetes i fitxers adjunts.",
        requireText: 'BUIDAR PAPERERA'
      }
    );
  });

  function renderTrashList() {
    listEl.innerHTML = '';
    const trashItems = docs.filter(d => d.isDeleted);

    docCountEl.textContent = trashItems.length === 1 ? '1 element a la brossa' : `${trashItems.length} elements a la brossa`;

    if (trashItems.length === 0) {
      setEmptyState('trash');
      return;
    } else {
      emptyStateEl.classList.add('hidden');
    }

    trashItems.forEach(doc => {
      const li = document.createElement('li');
      li.dataset.id = doc.id;

      if (doc.type === 'folder') li.classList.add('item-folder');

      const dateStr = new Date(doc.timestamp).toLocaleString('ca-ES', { day: 'numeric', month: 'numeric', year: 'numeric' });

      const mainDiv = document.createElement('div');
      mainDiv.className = 'item-main';

      const iconSpan = document.createElement('span');
      iconSpan.className = 'item-icon';

      if (doc.type === 'folder') {
        const fColor = '#cbd5e1';
        iconSpan.innerHTML = `
          <svg style="margin-top:2px;" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${fColor}" stroke="${fColor}" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
             <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
        `;
      } else {
        iconSpan.textContent = '📄';
      }

      mainDiv.appendChild(iconSpan);

      const contentDiv = document.createElement('div');
      contentDiv.className = 'item-content';

      const titleRow = document.createElement('div');
      const titleSpan = document.createElement('span');
      titleSpan.className = 'item-title';
      titleSpan.style.color = '#94a3b8';
      titleSpan.style.textDecoration = 'line-through';
      titleSpan.textContent = doc.title;
      titleRow.appendChild(titleSpan);
      contentDiv.appendChild(titleRow);

      const metaDiv = document.createElement('div');
      metaDiv.className = 'item-meta';
      metaDiv.textContent = `A la paperera`;
      contentDiv.appendChild(metaDiv);
      mainDiv.appendChild(contentDiv);
      li.appendChild(mainDiv);

      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'item-actions';

      const restoreBtn = document.createElement('button');
      restoreBtn.className = 'btn btn-secondary btn-small';
      restoreBtn.innerHTML = 'Restaurar';
      restoreBtn.onclick = async (e) => {
        e.stopPropagation();
        await restoreItem(doc.id);
      };

      const purgeBtn = document.createElement('button');
      purgeBtn.className = 'btn btn-small-danger';
      purgeBtn.innerHTML = 'Purgar';
      purgeBtn.onclick = (e) => {
        e.stopPropagation();
        purgeItem(doc.id);
      };

      actionsDiv.appendChild(restoreBtn);
      actionsDiv.appendChild(purgeBtn);

      li.appendChild(actionsDiv);
      listEl.appendChild(li);
    });
  }

  async function restoreItem(id) {
    const item = docs.find(d => d.id === id);
    if (!item) return;

    // Al restaurar, inclourem els fills perquè tot torni a la vida junta (útil si vas moure carpeta)
    const idsToRestore = [item.id, ...getChildrenIds(item.id, true)];
    docs.forEach(d => {
      if (idsToRestore.includes(d.id)) {
        d.isDeleted = false;
      }
    });

    if (item.parentId !== 'root') {
      const parent = docs.find(d => d.id === item.parentId);
      if (!parent || parent.isDeleted) {
        // Carpeta orfe que el seu pare seguirà esborrat
        item.parentId = 'root';
      }
    }

    await saveData();
    renderData();
    showToast('Material restaurat correctament');
  }

  function purgeItem(id) {
    const item = docs.find(d => d.id === id);
    openConfirm(
      'Eliminació Tòxica',
      `Segur que vols fulminar "${escapeHtml(item.title)}" per sempre? Aquesta acció és destructiva i no revertible.`,
      async () => {
        const canContinue = await prepareSafetySnapshotOrAbort('before-purge-item', 'purgar aquest element');
        if (!canContinue) return;
        const idsToDelete = [id, ...getChildrenIds(id, true)];
        docs = docs.filter(d => !idsToDelete.includes(d.id));
        await saveData('purge-item');
        renderData();
        showToast("Eliminat de l'univers");
      },
      {
        okLabel: 'Purgar per sempre',
        warningText: "Sutsumu crearà abans una còpia de recuperació completa per si després necessites revertir aquesta destrucció."
      }
    );
  }

  // --- Exportar / Importar ---
  exportBtn.addEventListener('click', async () => {
    if (docs.length === 0) {
      showToast('No hi ha res a exportar.', 'error');
      return;
    }

    try {
      const payload = await createFullBackupPayload('manual-export');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      triggerDownload(`sutsumu_backup_complet_${timestamp}.json`, JSON.stringify(payload, null, 2), 'application/json;charset=utf-8');
      showToast('Còpia completa exportada amb carpetes, versions i fitxers adjunts.');
    } catch (err) {
      console.error(err);
      showToast("No s'ha pogut generar la còpia completa.", 'error');
    }
  });

  importBtn.addEventListener('click', () => {
    importFile.click();
  });

  importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async function (event) {
      try {
        const importedData = JSON.parse(event.target.result);
        const parsedBackup = await normalizeImportedBackupPayload(importedData);
        if (Array.isArray(parsedBackup.docs)) {
          openConfirm(
            'Restaurar còpia de seguretat?',
            "L'arxiu és vàlid. Si continues, Sutsumu crearà primer una còpia completa de recuperació de l'estat actual i després restaurarà carpetes, documents i configuració de la còpia importada.",
            async () => {
              const canContinue = await prepareSafetySnapshotOrAbort('before-import-replace', 'restaurar aquesta còpia');
              if (!canContinue) return;
              docs = normalizeDocs(parsedBackup.docs);
              expandedFolders = normalizeExpandedFolders(parsedBackup.expandedFolders || [], docs);
              await saveData('import-restore');
              isSearchActive = false;
              searchInput.value = '';
              renderData();
              showToast('Còpia restaurada correctament.');
              importFile.value = '';
            },
            {
              okLabel: 'Restaurar còpia',
              warningText: "La còpia actual quedarà guardada a la volta de recuperació abans de ser reemplaçada."
            }
          );
        } else {
          showToast('El format JSON no és vàlid per aquesta app.', 'error');
        }
      } catch (err) {
        console.error(err);
        showToast('Error en llegir o reconstruir la còpia de seguretat.', 'error');
      }
    };
    reader.readAsText(file);
  });

  clearAllBtn.addEventListener('click', () => {
    openConfirm(
      'Alerta Màxima',
      "Segur que vols destruir absolutament tot el sistema d'arxius? Es perdran totes les carpetes, documents, versions i fitxers adjunts visibles en aquesta instància.",
      async () => {
        const canContinue = await prepareSafetySnapshotOrAbort('before-clear-all', 'buidar el sistema zero');
        if (!canContinue) return;
        docs = [];
        expandedFolders = [];
        await saveData('clear-all');
        isSearchActive = false;
        searchInput.value = '';
        renderData();
        showToast('Sistema esborrat amb èxit');
      },
      {
        okLabel: 'Destruir-ho tot',
        warningText: "Sutsumu només continuarà si pot crear abans una còpia completa de recuperació en IndexedDB.",
        requireText: 'BUIDAR SISTEMA ZERO'
      }
    );
  });

});

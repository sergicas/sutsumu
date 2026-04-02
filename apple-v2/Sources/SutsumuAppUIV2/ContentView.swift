import SwiftUI
import UniformTypeIdentifiers
#if canImport(SutsumuCoreV2)
import SutsumuCoreV2
#endif

public struct ContentView: View {
    @StateObject private var appState = AppState()
    @State private var compactTab = CompactTab.home
    @State private var isShowingControlCenter = false
    @State private var isImportingAttachment = false
    @State private var isImportingLocalJSON = false
    @State private var isExportingLocalJSON = false
    @State private var exportDocument = WorkspaceTextDocument()
    @State private var macEditorItemId: String? = nil
    @Environment(\.scenePhase) private var scenePhase
    
#if os(iOS)
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
#endif

    public init() {}

    public var body: some View {
        Group {
            if usesCompactLayout {
                compactView
            } else if appState.isAuthenticated {
                NavigationSplitView {
                    macSidebarView
                } detail: {
                    macDetailView
                }
            } else {
                MacAuthView(appState: appState, isShowingControlCenter: $isShowingControlCenter)
            }
        }
        .background(appCanvasBackground.ignoresSafeArea())
        .task {
            appState.handleScenePhaseChange(scenePhase)
            await appState.restoreSessionIfNeeded()
        }
        .onChange(of: scenePhase) { _, newPhase in
            appState.handleScenePhaseChange(newPhase)
        }
        .onOpenURL { url in
            Task { @MainActor in await appState.handleAuthRedirect(url) }
        }
        .fileImporter(
            isPresented: $isImportingLocalJSON,
            allowedContentTypes: [.json],
            allowsMultipleSelection: false
        ) { result in
            do {
                guard let url = try result.get().first else { return }
                try appState.importLocalPayload(from: url)
            } catch {
                appState.statusMessage = "No he pogut importar el JSON local: \(error.localizedDescription)"
            }
        }
        .fileImporter(
            isPresented: $isImportingAttachment,
            allowedContentTypes: [.item],
            allowsMultipleSelection: false
        ) { result in
            do {
                guard let url = try result.get().first else { return }
                Task { @MainActor in await appState.importAttachment(from: url) }
            } catch {
                appState.statusMessage = "No he pogut obrir l'adjunt: \(error.localizedDescription)"
            }
        }
        .fileExporter(
            isPresented: $isExportingLocalJSON,
            document: exportDocument,
            contentType: .json,
            defaultFilename: appState.suggestedExportFilename
        ) { result in
            switch result {
            case .success:
                appState.statusMessage = "JSON local exportat correctament."
            case .failure(let error):
                appState.statusMessage = "No he pogut exportar el JSON local: \(error.localizedDescription)"
            }
        }
        .sheet(isPresented: $isShowingControlCenter) {
            ControlCenterSheet(
                appState: appState,
                isShowing: $isShowingControlCenter,
                isImportingLocalJSON: $isImportingLocalJSON,
                isExportingLocalJSON: $isExportingLocalJSON,
                exportDocument: $exportDocument
            )
        }
    }

    private var usesCompactLayout: Bool {
#if os(iOS)
        UIDevice.current.userInterfaceIdiom == .phone || horizontalSizeClass == .compact
#else
        false
#endif
    }

    private var compactView: some View {
        Group {
            if appState.isAuthenticated {
                TabView(selection: $compactTab) {
                    NavigationStack {
                        HomeView(appState: appState, isShowingControlCenter: $isShowingControlCenter, compactTab: $compactTab)
                            .navigationTitle("Inici")
                            .sutsumuInlineNavigationTitle()
                    }
                    .tabItem { Label("Inici", systemImage: "house.fill") }
                    .tag(CompactTab.home)

                    NavigationStack {
                        LibraryView(appState: appState, isImportingAttachment: $isImportingAttachment)
                            .navigationTitle("Biblioteca")
                            .sutsumuInlineNavigationTitle()
                    }
                    .tabItem { Label("Biblioteca", systemImage: "square.grid.2x2.fill") }
                    .tag(CompactTab.workspace)

                    NavigationStack {
                        ProfileView(appState: appState, isShowingControlCenter: $isShowingControlCenter)
                            .navigationTitle("Perfil")
                            .sutsumuInlineNavigationTitle()
                    }
                    .tabItem { Label("Perfil", systemImage: "person.crop.circle.fill") }
                    .tag(CompactTab.profile)
                }
            } else {
                NavigationStack {
                    AuthView(appState: appState, isShowingControlCenter: $isShowingControlCenter)
                        .navigationTitle("Benvingut")
                        .sutsumuInlineNavigationTitle()
#if os(iOS)
                        .toolbar(.hidden, for: .navigationBar)
#endif
                }
            }
        }
    }


    // MARK: - Mac Split View

    private var macSidebarView: some View {
        LibraryView(
            appState: appState,
            isImportingAttachment: $isImportingAttachment,
            externalSelection: $macEditorItemId
        )
        .navigationTitle(appState.workspaceName.isEmpty ? "Sutsumu" : appState.workspaceName)
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Menu {
                    Button {
                        appState.createDocumentFromSelection()
                        macEditorItemId = appState.selectedItemId
                    } label: { Label("Nou document", systemImage: "square.and.pencil") }
                    Button {
                        appState.createFolderFromSelection()
                        macEditorItemId = appState.selectedItemId
                    } label: { Label("Nova carpeta", systemImage: "folder.badge.plus") }
                } label: { Image(systemName: "plus") }
            }
            ToolbarItem(placement: .primaryAction) {
                Button {
                    Task { @MainActor in await appState.syncNow() }
                } label: {
                    Image(systemName: appState.isLoading ? "arrow.triangle.2.circlepath" : "icloud.and.arrow.up")
                }
                .disabled(!appState.canSync || appState.isLoading)
                .help(macSyncTooltip)
            }
            ToolbarItem(placement: .primaryAction) {
                Button { isShowingControlCenter = true } label: {
                    Image(systemName: "gearshape")
                }
                .help("Configuració")
            }
        }
        .background(sidebarBackground)
    }

    private var macDetailView: some View {
        Group {
            if let itemId = macEditorItemId {
                NavigationStack {
                    ItemEditorView(
                        itemId: itemId,
                        appState: appState,
                        isImportingAttachment: $isImportingAttachment,
                        externalSelection: $macEditorItemId
                    )
                }
            } else {
                macWelcomeDetail
            }
        }
        .background(detailBackground.ignoresSafeArea())
    }

    private var macWelcomeDetail: some View {
        VStack(spacing: 20) {
            Spacer()
            Image(systemName: "tray.2.fill")
                .font(.system(size: 48))
                .foregroundStyle(bentoPrimary.opacity(0.4))
            VStack(spacing: 6) {
                Text(macSyncTitle)
                    .font(.title3.weight(.bold))
                    .foregroundStyle(Color(red: 0.17, green: 0.12, blue: 0.06))
                Text(macSyncDetail)
                    .font(.callout)
                    .foregroundStyle(Color(red: 0.55, green: 0.47, blue: 0.37))
                    .multilineTextAlignment(.center)
            }
            if appState.hasSyncConflict && appState.lastHead != nil {
                Button {
                    appState.applyRemoteToLocal()
                } label: {
                    Label("Pren la versió del servidor", systemImage: "icloud.and.arrow.down")
                }
                .buttonStyle(SutsumuProminentButtonStyle())
                .disabled(appState.isLoading)
            } else if appState.canSync {
                Button {
                    Task { @MainActor in await appState.syncNow() }
                } label: {
                    Label("Sincronitzar ara", systemImage: "icloud.and.arrow.up")
                }
                .buttonStyle(SutsumuProminentButtonStyle())
                .disabled(appState.isLoading)
            }
            if !appState.statusMessage.isEmpty {
                Text(appState.statusMessage)
                    .font(.caption)
                    .foregroundStyle(Color(red: 0.55, green: 0.47, blue: 0.37))
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 32)
            }
            Spacer()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(32)
    }

    private var macSyncTitle: String {
        if appState.isLoading { return "Treballant…" }
        if appState.hasSyncConflict { return "Cal resoldre un conflicte" }
        if appState.isRemoteAheadOfLocal { return "Hi ha canvis al núvol" }
        let n = appState.pendingOperationsCount
        if appState.hasUnsyncedLocalChanges {
            return n > 0 ? (n == 1 ? "1 canvi per enviar" : "\(n) canvis per enviar") : "Canvis locals per enviar"
        }
        if appState.lastHead == nil { return "Primer enviament pendent" }
        return "Tot sincronitzat"
    }

    private var macSyncDetail: String {
        if appState.hasSyncConflict { return "Obre un element en conflicte i tria quina versió vols conservar." }
        if appState.isRemoteAheadOfLocal { return "Prem 'Sincronitzar ara' per baixar la darrera versió del núvol." }
        if appState.hasUnsyncedLocalChanges { return "Prem 'Sincronitzar ara' per enviar els canvis al núvol." }
        if appState.lastHead == nil { return "Selecciona un element de la llista o sincronitza per primer cop." }
        return "Selecciona un element de la llista per editar-lo."
    }

    private var macSyncTooltip: String {
        if !appState.isAuthenticated { return "Cal iniciar sessió" }
        if !appState.isSupabaseConfigured { return "Cal configurar el servidor" }
        if appState.isLoading { return "Treballant…" }
        return "Sincronitzar amb el núvol"
    }
}

// MARK: - Subviews

struct ControlCenterSheet: View {
    @ObservedObject var appState: AppState
    @Binding var isShowing: Bool
    @Binding var isImportingLocalJSON: Bool
    @Binding var isExportingLocalJSON: Bool
    @Binding var exportDocument: WorkspaceTextDocument

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    sutsumuCard(appState.isManagedConnection ? "Compte i ajuda" : "Compte i connexió") {
                        Text(appState.isManagedConnection
                             ? "Gestiona la sessió, l'espai i els enllaços d'ajuda."
                             : "Configuració tècnica i de compte de Supabase.")
                            .font(.callout)
                            .foregroundStyle(.secondary)
                    }
                    
                    if !appState.isManagedConnection {
                        connectionSection
                    }
                    
                    authSection
                    workspaceSection
                    actionsSection
                }
                .padding(20)
            }
            .background(appCanvasBackground.ignoresSafeArea())
            .navigationTitle("Ajustos")
            .sutsumuInlineNavigationTitle()
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Tancar") { isShowing = false }
                }
            }
        }
    }

    private var connectionSection: some View {
        sutsumuCard("Connexió al servidor") {
            VStack(alignment: .leading, spacing: 12) {
                TextField("Adreça del servidor (URL)", text: $appState.projectURL)
                    .sutsumuURLEntry()
                SecureField("Clau d'accés", text: $appState.anonKey)
                Text("Pots trobar aquestes dades al panell del teu compte.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
    }

    private var authSection: some View {
        sutsumuCard("Sessió") {
            VStack(alignment: .leading, spacing: 12) {
                if appState.isAuthenticated {
                    Text(appState.authUserEmail).font(.headline)
                    Button("Tancar sessió") { Task { @MainActor in await appState.signOut() } }
                        .buttonStyle(SutsumuOutlineButtonStyle(tint: .red))
                } else {
                    Text("No has iniciat sessió")
                    Button("Anar a Login") { isShowing = false }
                        .buttonStyle(SutsumuProminentButtonStyle())
                }
            }
        }
    }

    private var workspaceSection: some View {
        sutsumuCard("Espai de treball") {
            VStack(alignment: .leading, spacing: 12) {
                TextField("Nom de l'espai", text: $appState.workspaceName)
            }
        }
    }

    private var actionsSection: some View {
        sutsumuCard("Còpia de seguretat") {
            VStack(alignment: .leading, spacing: 10) {
                Button("Restaurar des d'arxiu") { isImportingLocalJSON = true }
                    .buttonStyle(SutsumuSoftButtonStyle())
                Button("Fer còpia de seguretat") {
                    do {
                        exportDocument = try appState.makeExportDocument()
                        isExportingLocalJSON = true
                    } catch { appState.statusMessage = "No s'ha pogut crear la còpia: \(error.localizedDescription)" }
                }
                .buttonStyle(SutsumuSoftButtonStyle())
                Text("La còpia guarda tot el teu contingut en un arxiu que pots desar on vulguis.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
    }
}

public enum CompactTab: Hashable {
    case home
    case workspace
    case profile
}

import SwiftUI

struct ContentView: View {
    @EnvironmentObject var appState: AppState
    @State private var selectedTab: AppTab = .home

    var body: some View {
        Group {
            if appState.authService.isAuthenticated {
                mainView
            } else {
                AuthView()
            }
        }
        .environmentObject(appState.authService)
        .environmentObject(appState.workspaceService)
        .environmentObject(appState.syncService)
        .environmentObject(appState.themeEngine)
        .environmentObject(appState.diagnosticsService)
        .environmentObject(appState.attachmentService)
        .onOpenURL { url in
            Task { @MainActor in
                await appState.authService.handleAuthRedirect(url)
            }
        }
        .task {
            await appState.authService.restoreSessionIfNeeded()
            // Sincronitza en obrir l'app si ja estem autenticats
            if appState.authService.isAuthenticated {
                await appState.syncService.syncNow()
            }
        }
        .onChange(of: appState.authService.isAuthenticated) { _, isAuthenticated in
            // Sincronitza quan l'usuari acaba d'iniciar sessió
            if isAuthenticated {
                Task { await appState.syncService.syncNow() }
            }
        }
    }

    private var mainView: some View {
        TabView(selection: $selectedTab) {
            HomeView()
                .tabItem { Label("Inici", systemImage: "house.fill") }
                .tag(AppTab.home)

            LibraryView()
                .tabItem { Label("Biblioteca", systemImage: "square.grid.2x2.fill") }
                .tag(AppTab.library)

            ProfileView()
                .tabItem { Label("Perfil", systemImage: "person.crop.circle.fill") }
                .tag(AppTab.profile)
        }
        .tint(appState.themeEngine.current.accent)
    }
}

enum AppTab: Hashable {
    case home, library, profile
}

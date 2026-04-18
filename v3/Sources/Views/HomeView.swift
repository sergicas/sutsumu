import SwiftUI

struct HomeView: View {
    @EnvironmentObject var authService: AuthService
    @EnvironmentObject var workspaceService: WorkspaceService
    @EnvironmentObject var syncService: SyncService
    @EnvironmentObject var themeEngine: ThemeEngine

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    heroCard
                    syncCard
                    if !syncService.statusMessage.isEmpty {
                        statusRow
                    }
                }
                .padding(20)
            }
            .background(themeEngine.current.background.ignoresSafeArea())
            .navigationTitle("Inici")
            .navigationBarTitleDisplayMode(.inline)
        }
    }

    private var heroCard: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack(spacing: 14) {
                RoundedRectangle(cornerRadius: 14)
                    .fill(themeEngine.current.accent)
                    .frame(width: 48, height: 48)
                    .overlay(
                        Text("S")
                            .font(.system(size: 24, weight: .bold))
                            .foregroundStyle(.white)
                    )

                VStack(alignment: .leading, spacing: 4) {
                    Text(workspaceService.workspace.name.isEmpty ? "Sutsumu" : workspaceService.workspace.name)
                        .font(.title3.weight(.bold))
                        .foregroundStyle(themeEngine.current.ink)
                    Text(authService.authUserEmail.isEmpty ? "Benvingut" : authService.authUserEmail)
                        .font(.caption)
                        .foregroundStyle(themeEngine.current.mutedText)
                }
                Spacer()
            }

            HStack(spacing: 12) {
                statChip(
                    icon: "doc.text.fill",
                    value: "\(workspaceService.workspace.activeDocuments.count)",
                    label: "Documents"
                )
                statChip(
                    icon: "folder.fill",
                    value: "\(workspaceService.workspace.activeFolders.count)",
                    label: "Carpetes"
                )
            }
        }
        .padding(themeEngine.current.cardPadding)
        .background(themeEngine.current.surface)
        .clipShape(RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius))
        .overlay(
            RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius)
                .stroke(themeEngine.current.border, lineWidth: 1)
        )
    }

    private var syncCard: some View {
        HStack(spacing: 16) {
            Image(systemName: syncService.isSyncing ? "arrow.triangle.2.circlepath" : "icloud.fill")
                .font(.title2)
                .foregroundStyle(themeEngine.current.accent)
                .rotationEffect(.degrees(syncService.isSyncing ? 360 : 0))
                .animation(
                    syncService.isSyncing
                        ? .linear(duration: 1).repeatForever(autoreverses: false)
                        : .default,
                    value: syncService.isSyncing
                )

            VStack(alignment: .leading, spacing: 4) {
                Text(syncService.isSyncing ? "Sincronitzant..." : "Sincronització")
                    .font(.callout.weight(.semibold))
                    .foregroundStyle(themeEngine.current.ink)
                if let date = syncService.lastSyncDate {
                    Text("Darrera: \(date.formatted(.relative(presentation: .named)))")
                        .font(.caption)
                        .foregroundStyle(themeEngine.current.mutedText)
                } else {
                    Text(syncService.canSync ? "Llest per sincronitzar" : "No autenticat")
                        .font(.caption)
                        .foregroundStyle(themeEngine.current.mutedText)
                }
            }

            Spacer()

            if syncService.canSync {
                Button {
                    Task { await syncService.syncNow() }
                } label: {
                    Image(systemName: "arrow.clockwise")
                        .font(.callout.weight(.semibold))
                }
                .disabled(syncService.isSyncing)
                .foregroundStyle(themeEngine.current.accent)
            }
        }
        .padding(themeEngine.current.cardPadding)
        .background(themeEngine.current.surface)
        .clipShape(RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius))
        .overlay(
            RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius)
                .stroke(themeEngine.current.border, lineWidth: 1)
        )
    }

    private var statusRow: some View {
        Text(syncService.statusMessage)
            .font(.caption)
            .foregroundStyle(themeEngine.current.mutedText)
            .padding(.horizontal, 14)
            .padding(.vertical, 8)
            .background(themeEngine.current.surface)
            .clipShape(Capsule())
    }

    private func statChip(icon: String, value: String, label: String) -> some View {
        HStack(spacing: 6) {
            Image(systemName: icon)
                .font(.caption.weight(.semibold))
                .foregroundStyle(themeEngine.current.accent)
            Text("\(value) \(label)")
                .font(.caption.weight(.medium))
                .foregroundStyle(themeEngine.current.mutedText)
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 6)
        .background(themeEngine.current.surfaceSecondary)
        .clipShape(Capsule())
    }
}

import SwiftUI

struct ProfileView: View {
    @EnvironmentObject var authService: AuthService
    @EnvironmentObject var syncService: SyncService
    @EnvironmentObject var workspaceService: WorkspaceService
    @EnvironmentObject var themeEngine: ThemeEngine
    @EnvironmentObject var diagnosticsService: DiagnosticsService
    @State private var showingThemePicker = false
    @State private var showingDiagnostics = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    accountCard
                    themeCard
                    actionsCard
                    systemCard
                    if !authService.statusMessage.isEmpty {
                        statusRow
                    }
                }
                .padding(20)
            }
            .background(themeEngine.current.background.ignoresSafeArea())
            .navigationTitle("Perfil")
            .navigationBarTitleDisplayMode(.inline)
            .sheet(isPresented: $showingThemePicker) {
                ThemePickerView()
            }
            .navigationDestination(isPresented: $showingDiagnostics) {
                DiagnosticsView()
            }
        }
    }

    private var accountCard: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Compte")
                .font(.caption.weight(.semibold))
                .foregroundStyle(themeEngine.current.mutedText)

            HStack(spacing: 14) {
                Circle()
                    .fill(themeEngine.current.accent)
                    .frame(width: 52, height: 52)
                    .overlay(
                        Text(String(authService.authUserEmail.prefix(1)).uppercased())
                            .font(.title3.bold())
                            .foregroundStyle(.white)
                    )

                VStack(alignment: .leading, spacing: 4) {
                    Text(authService.authUserEmail.isEmpty ? "Usuari" : authService.authUserEmail)
                        .font(.callout.weight(.semibold))
                        .foregroundStyle(themeEngine.current.ink)
                    HStack(spacing: 6) {
                        Circle()
                            .fill(authService.isAuthenticated ? Color.green : themeEngine.current.mutedText)
                            .frame(width: 7, height: 7)
                        Text(authService.isAuthenticated ? "Sessió activa" : "Sense sessió")
                            .font(.caption)
                            .foregroundStyle(themeEngine.current.mutedText)
                    }
                }
            }

            Button {
                Task { await authService.signOut() }
            } label: {
                Label("Tancar sessió", systemImage: "rectangle.portrait.and.arrow.right")
                    .frame(maxWidth: .infinity)
            }
            .sutsumuSecondaryButton(theme: themeEngine.current, tint: .red)
            .disabled(!authService.isAuthenticated || authService.isLoading)
        }
        .padding(themeEngine.current.cardPadding)
        .background(themeEngine.current.surface)
        .clipShape(RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius))
        .overlay(
            RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius)
                .stroke(themeEngine.current.border, lineWidth: 1)
        )
    }

    private var themeCard: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("Aparença")
                .font(.caption.weight(.semibold))
                .foregroundStyle(themeEngine.current.mutedText)

            HStack {
                Image(systemName: themeEngine.current.preview)
                    .font(.title3)
                    .foregroundStyle(themeEngine.current.accent)
                    .frame(width: 36, height: 36)
                    .background(themeEngine.current.accent.opacity(0.12))
                    .clipShape(RoundedRectangle(cornerRadius: 10))

                VStack(alignment: .leading, spacing: 2) {
                    Text(themeEngine.current.name)
                        .font(.callout.weight(.semibold))
                        .foregroundStyle(themeEngine.current.ink)
                    Text("Disseny actiu")
                        .font(.caption)
                        .foregroundStyle(themeEngine.current.mutedText)
                }
                Spacer()
                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundStyle(themeEngine.current.mutedText)
            }
            .contentShape(Rectangle())
            .onTapGesture { showingThemePicker = true }
        }
        .padding(themeEngine.current.cardPadding)
        .background(themeEngine.current.surface)
        .clipShape(RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius))
        .overlay(
            RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius)
                .stroke(themeEngine.current.border, lineWidth: 1)
        )
    }

    private var actionsCard: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("Dades")
                .font(.caption.weight(.semibold))
                .foregroundStyle(themeEngine.current.mutedText)

            Button {
                Task { await syncService.syncNow() }
            } label: {
                Label("Sincronitzar ara", systemImage: "arrow.clockwise")
                    .frame(maxWidth: .infinity)
            }
            .sutsumuPrimaryButton(theme: themeEngine.current)
            .disabled(!syncService.canSync)
        }
        .padding(themeEngine.current.cardPadding)
        .background(themeEngine.current.surface)
        .clipShape(RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius))
        .overlay(
            RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius)
                .stroke(themeEngine.current.border, lineWidth: 1)
        )
    }

    private var systemCard: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("Sistema")
                .font(.caption.weight(.semibold))
                .foregroundStyle(themeEngine.current.mutedText)

            HStack {
                Image(systemName: diagnosticsService.hasDegradedMode
                      ? "exclamationmark.triangle.fill"
                      : "checkmark.circle.fill")
                    .font(.title3)
                    .foregroundStyle(diagnosticsService.hasDegradedMode ? .orange : .green)
                    .frame(width: 36, height: 36)
                    .background((diagnosticsService.hasDegradedMode ? Color.orange : Color.green).opacity(0.12))
                    .clipShape(RoundedRectangle(cornerRadius: 10))

                VStack(alignment: .leading, spacing: 2) {
                    Text("Diagnòstic")
                        .font(.callout.weight(.semibold))
                        .foregroundStyle(themeEngine.current.ink)
                    Text(diagnosticsService.hasDegradedMode
                         ? "Mode degradat actiu"
                         : "\(diagnosticsService.entries.count) errors registrats")
                        .font(.caption)
                        .foregroundStyle(themeEngine.current.mutedText)
                }
                Spacer()
                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundStyle(themeEngine.current.mutedText)
            }
            .contentShape(Rectangle())
            .onTapGesture { showingDiagnostics = true }
        }
        .padding(themeEngine.current.cardPadding)
        .background(themeEngine.current.surface)
        .clipShape(RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius))
        .overlay(
            RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius)
                .stroke(diagnosticsService.hasDegradedMode
                        ? Color.orange.opacity(0.5)
                        : themeEngine.current.border,
                        lineWidth: diagnosticsService.hasDegradedMode ? 1.5 : 1)
        )
    }

    private var statusRow: some View {
        Text(authService.statusMessage)
            .font(.caption)
            .foregroundStyle(themeEngine.current.mutedText)
            .padding(.horizontal, 14)
            .padding(.vertical, 8)
            .background(themeEngine.current.surface)
            .clipShape(Capsule())
    }
}

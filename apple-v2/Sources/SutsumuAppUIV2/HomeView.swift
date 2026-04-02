import SwiftUI
#if canImport(SutsumuCoreV2)
import SutsumuCoreV2
#endif

// MARK: - Home (Inici)
// Una sola pantalla amb dues coses: qui ets i com va la sync.
// Tot el contingut és a la pestanya Biblioteca.

struct HomeView: View {
    @ObservedObject var appState: AppState
    @Binding var isShowingControlCenter: Bool
    @Binding var compactTab: CompactTab

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                heroCard
                syncCard
                if !appState.statusMessage.isEmpty {
                    statusRow
                }
            }
            .padding(16)
        }
        .background(appCanvasBackground.ignoresSafeArea())
    }

    // MARK: - Hero

    private var heroCard: some View {
        VStack(alignment: .leading, spacing: 18) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 5) {
                    Text(appState.workspaceName.isEmpty ? "El meu espai" : appState.workspaceName)
                        .font(.system(.title2, design: .serif).weight(.bold))
                        .foregroundStyle(.white)
                    Text(appState.isAuthenticated
                         ? appState.authUserEmail
                         : "No has iniciat sessió")
                        .font(.callout)
                        .foregroundStyle(.white.opacity(0.82))
                }
                Spacer()
                Button { isShowingControlCenter = true } label: {
                    Image(systemName: "gearshape.fill")
                        .font(.title3)
                }
                .buttonStyle(SutsumuGlassButtonStyle())
            }

            HStack(spacing: 10) {
                heroMetric(
                    title: "Documents",
                    value: "\(appState.workspaceStats.documents)"
                )
                heroMetric(
                    title: "Carpetes",
                    value: "\(appState.workspaceStats.folders)"
                )
            }

            heroMetric(
                title: "Núvol",
                value: heroCloudValue
            )
            .frame(maxWidth: .infinity, alignment: .leading)

            Text("L'espai es manté clar, sincronitzat i preparat per reprendre la feina des de qualsevol dispositiu.")
                .font(.caption)
                .foregroundStyle(.white.opacity(0.74))
        }
        .padding(20)
        .background {
            ZStack {
                LinearGradient(
                    colors: [
                        Color(red: 0.16, green: 0.22, blue: 0.31),
                        Color(red: 0.22, green: 0.31, blue: 0.42)
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )

                RadialGradient(
                    colors: [bentoPrimary.opacity(0.45), .clear],
                    center: .topTrailing,
                    startRadius: 12,
                    endRadius: 180
                )

                RadialGradient(
                    colors: [bentoBlue.opacity(0.30), .clear],
                    center: .bottomLeading,
                    startRadius: 16,
                    endRadius: 220
                )
            }
            .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        }
        .overlay(
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .stroke(.white.opacity(0.12), lineWidth: 1)
        )
        .shadow(color: bentoBlue.opacity(0.18), radius: 18, x: 0, y: 10)
    }

    // MARK: - Sync

    private var syncCard: some View {
        sutsumuCard("Núvol", tint: syncTint) {
            HStack(spacing: 14) {
                Image(systemName: syncIcon)
                    .font(.system(size: 28))
                    .foregroundStyle(syncTint)

                VStack(alignment: .leading, spacing: 4) {
                    Text(syncTitle)
                        .font(.callout.weight(.bold))
                        .foregroundStyle(sutsumuInk)
                    Text(appState.syncStateDetail)
                        .font(.caption)
                        .foregroundStyle(sutsumuMutedText)
                        .fixedSize(horizontal: false, vertical: true)
                }

                Spacer(minLength: 0)

                if appState.canSync {
                    Button {
                        Task { @MainActor in await appState.syncNow() }
                    } label: {
                        Image(systemName: "arrow.triangle.2.circlepath")
                            .font(.title3)
                    }
                    .buttonStyle(SutsumuProminentButtonStyle())
                    .disabled(appState.isLoading)
                } else if !appState.isAuthenticated {
                    Button("Entrar") {
                        compactTab = .profile
                    }
                    .buttonStyle(SutsumuProminentButtonStyle())
                }
            }
        }
    }

    // MARK: - Status row

    private var statusRow: some View {
        sutsumuStatusBanner(appState.statusMessage, tint: syncTint, icon: statusIcon)
    }

    // MARK: - Sync helpers

    private var syncIcon: String {
        guard appState.isAuthenticated && appState.isSupabaseConfigured else {
            return "cloud.slash"
        }
        if appState.isLoading            { return "arrow.triangle.2.circlepath" }
        if appState.hasSyncConflict      { return "exclamationmark.triangle.fill" }
        if appState.isRemoteAheadOfLocal { return "icloud.and.arrow.down.fill" }
        if appState.hasUnsyncedLocalChanges { return "arrow.up.circle.fill" }
        if appState.lastHead == nil       { return "cloud" }
        return "checkmark.icloud.fill"
    }

    private var syncTint: Color {
        guard appState.isAuthenticated && appState.isSupabaseConfigured else { return sutsumuMutedText }
        if appState.hasSyncConflict      { return bentoRed }
        if appState.isRemoteAheadOfLocal { return bentoBlue }
        if appState.hasUnsyncedLocalChanges { return bentoPrimary }
        return bentoGreen
    }

    private var heroCloudValue: String {
        if appState.hasSyncConflict { return "Revisió necessària" }
        if appState.isRemoteAheadOfLocal { return "Versió remota nova" }
        if appState.hasUnsyncedLocalChanges {
            let pending = appState.pendingOperationsCount
            return pending > 0 ? "\(pending) pendents" : "Canvis locals"
        }
        if appState.lastHead == nil { return "Primera sync" }
        return "Tot al dia"
    }

    private var statusIcon: String {
        if appState.hasSyncConflict { return "exclamationmark.triangle.fill" }
        if appState.isRemoteAheadOfLocal { return "icloud.and.arrow.down.fill" }
        if appState.hasUnsyncedLocalChanges { return "arrow.up.circle.fill" }
        return "info.circle.fill"
    }

    private var syncTitle: String {
        if !appState.isAuthenticated      { return "No has iniciat sessió" }
        if !appState.isSupabaseConfigured { return "Servidor no configurat" }
        if appState.isLoading             { return "Treballant…" }
        if appState.hasSyncConflict       { return "Cal resoldre un conflicte" }
        if appState.isRemoteAheadOfLocal  { return "Hi ha una versió nova al núvol" }
        let n = appState.pendingOperationsCount
        if appState.hasUnsyncedLocalChanges {
            return n > 0 ? (n == 1 ? "1 canvi per enviar" : "\(n) canvis per enviar") : "Canvis locals per enviar"
        }
        if appState.lastHead == nil        { return "Primer enviament pendent" }
        return "Tot sincronitzat"
    }

}

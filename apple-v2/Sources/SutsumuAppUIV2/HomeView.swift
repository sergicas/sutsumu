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
                        .font(.system(.title2, design: .rounded).weight(.bold))
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
                heroChip(
                    icon: "doc.fill",
                    value: "\(appState.workspaceStats.documents)",
                    label: appState.workspaceStats.documents == 1 ? "document" : "documents"
                )
                heroChip(
                    icon: "folder.fill",
                    value: "\(appState.workspaceStats.folders)",
                    label: appState.workspaceStats.folders == 1 ? "carpeta" : "carpetes"
                )
                if appState.pendingOperationsCount > 0 {
                    heroChip(
                        icon: "arrow.up.circle.fill",
                        value: "\(appState.pendingOperationsCount)",
                        label: "per enviar"
                    )
                }
            }
        }
        .padding(20)
        .background(
            LinearGradient(
                colors: [
                    Color(red: 0.88, green: 0.55, blue: 0.06),
                    Color(red: 0.56, green: 0.26, blue: 0.03)
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            ),
            in: RoundedRectangle(cornerRadius: 20, style: .continuous)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .stroke(.white.opacity(0.18), lineWidth: 1)
        )
        .shadow(color: Color(red: 0.56, green: 0.26, blue: 0.03).opacity(0.30), radius: 8, x: 0, y: 4)
    }

    private func heroChip(icon: String, value: String, label: String) -> some View {
        HStack(spacing: 5) {
            Image(systemName: icon).font(.system(size: 11, weight: .semibold))
            Text("\(value) \(label)").font(.system(size: 12, weight: .semibold))
        }
        .foregroundStyle(.white.opacity(0.92))
        .padding(.horizontal, 11)
        .padding(.vertical, 7)
        .background(.white.opacity(0.18))
        .clipShape(Capsule())
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
                        .foregroundStyle(Color(red: 0.17, green: 0.12, blue: 0.06))
                    Text(syncDetail)
                        .font(.caption)
                        .foregroundStyle(Color(red: 0.48, green: 0.40, blue: 0.30))
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
        Text(appState.statusMessage)
            .font(.caption)
            .foregroundStyle(Color(red: 0.48, green: 0.40, blue: 0.30))
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.horizontal, 4)
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
        guard appState.isAuthenticated && appState.isSupabaseConfigured else { return Color(red: 0.48, green: 0.40, blue: 0.30) }
        if appState.hasSyncConflict      { return bentoRed }
        if appState.isRemoteAheadOfLocal { return bentoBlue }
        if appState.hasUnsyncedLocalChanges { return bentoPrimary }
        return bentoGreen
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

    private var syncDetail: String {
        if !appState.isAuthenticated      { return "Prem 'Entrar' per connectar el teu espai al núvol." }
        if !appState.isSupabaseConfigured { return "Configura el servidor des de la pantalla de Compte." }
        if appState.hasSyncConflict       { return "Obre la Biblioteca, toca l'element en conflicte i tria quina versió vols." }
        if appState.isRemoteAheadOfLocal  { return "Prem el botó per baixar la darrera versió que s'ha pujat des d'un altre dispositiu." }
        if appState.hasUnsyncedLocalChanges { return "Prem el botó per enviar els darrers canvis." }
        if appState.lastHead == nil        { return "Prem per fer la primera còpia al núvol." }
        return "Els teus documents estan actualitzats al núvol."
    }
}

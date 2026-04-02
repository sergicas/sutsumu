import SwiftUI
#if canImport(SutsumuCoreV2)
import SutsumuCoreV2
#endif

// MARK: - Profile (Compte)
// Tres coses i prou: qui ets, l'estat del núvol, i tancar sessió.

struct ProfileView: View {
    @ObservedObject var appState: AppState
    @Binding var isShowingControlCenter: Bool

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                accountCard
                syncCard
                settingsCard
            }
            .padding(16)
        }
        .background(appCanvasBackground.ignoresSafeArea())
    }

    // MARK: - Qui ets

    private var accountCard: some View {
        sutsumuCard("Compte", tint: bentoBlue) {
            HStack(spacing: 14) {
                ZStack {
                    Circle()
                        .fill(bentoBlue)
                        .frame(width: 54, height: 54)
                    Image(systemName: "person.fill")
                        .font(.title2)
                        .foregroundStyle(.white)
                }

                VStack(alignment: .leading, spacing: 5) {
                    Text(appState.authUserEmail.isEmpty ? "Compte de Sutsumu" : appState.authUserEmail)
                        .font(.callout.weight(.bold))
                        .foregroundStyle(sutsumuInk)
                        .lineLimit(1)
                    HStack(spacing: 6) {
                        Circle()
                            .fill(appState.isAuthenticated ? bentoGreen : Color.gray.opacity(0.5))
                            .frame(width: 7, height: 7)
                        Text(appState.isAuthenticated ? "Sessió activa" : "Sessió tancada")
                            .font(.caption)
                            .foregroundStyle(sutsumuMutedText)
                    }
                }
                Spacer(minLength: 0)
            }
        }
    }

    // MARK: - Estat del núvol

    private var syncCard: some View {
        sutsumuCard("Núvol", tint: bentoGreen) {
            VStack(alignment: .leading, spacing: 14) {
                HStack(spacing: 10) {
                    bentoMetric(
                        title: "Estat",
                        value: appState.syncStateLabel,
                        tint: syncTint
                    )

                    bentoMetric(
                        title: "Mode",
                        value: appState.syncTransportLabel,
                        tint: bentoBlue
                    )
                }

                if appState.pendingOperationsCount > 0 {
                    bentoMetric(
                        title: "Pendents",
                        value: "\(appState.pendingOperationsCount)",
                        tint: bentoPrimary
                    )
                }

                Text(appState.syncStateDetail)
                    .font(.callout)
                    .foregroundStyle(sutsumuMutedText)

                HStack(spacing: 10) {
                    Button("Sincronitzar ara") {
                        Task { @MainActor in await appState.syncNow() }
                    }
                    .buttonStyle(SutsumuProminentButtonStyle())
                    .disabled(appState.isLoading || !appState.canSync)

                    Button("Tancar sessió") {
                        Task { @MainActor in await appState.signOut() }
                    }
                    .buttonStyle(SutsumuOutlineButtonStyle(tint: .red))
                    .disabled(appState.isLoading || !appState.isAuthenticated)
                }
            }
        }
    }

    // MARK: - Configuració

    private var settingsCard: some View {
        sutsumuCard("Configuració", tint: bentoPrimary) {
            VStack(alignment: .leading, spacing: 10) {
                Text("Espai de treball, connexió al servidor i còpies de seguretat.")
                    .font(.callout)
                    .foregroundStyle(sutsumuMutedText)

                Button("Obrir configuració") {
                    isShowingControlCenter = true
                }
                .buttonStyle(SutsumuSoftButtonStyle())
            }
        }
    }

    private var syncTint: Color {
        if appState.hasSyncConflict { return bentoRed }
        if appState.isRemoteAheadOfLocal { return bentoBlue }
        if appState.hasUnsyncedLocalChanges { return bentoPrimary }
        if appState.canSync { return bentoGreen }
        return sutsumuMutedText
    }
}

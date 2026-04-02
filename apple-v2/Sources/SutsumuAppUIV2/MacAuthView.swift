import SwiftUI
#if canImport(SutsumuCoreV2)
import SutsumuCoreV2
#endif

struct MacAuthView: View {
    @ObservedObject var appState: AppState
    @Binding var isShowingControlCenter: Bool

    var body: some View {
        ZStack {
            appCanvasBackground.ignoresSafeArea()

            VStack(spacing: 0) {
                Spacer()
                loginCard
                Spacer()
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
    }

    private var loginCard: some View {
        sutsumuSurfacePanel(tint: bentoBlue) {
            VStack(alignment: .leading, spacing: 22) {
                HStack(spacing: 14) {
                    ZStack {
                        RoundedRectangle(cornerRadius: 14, style: .continuous)
                            .fill(
                                LinearGradient(
                                    colors: [bentoBlue, bentoPrimary],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .frame(width: 48, height: 48)
                        Image(systemName: "tray.2.fill")
                            .font(.system(size: 18, weight: .semibold))
                            .foregroundStyle(.white)
                    }

                    VStack(alignment: .leading, spacing: 4) {
                        Text("Sutsumu")
                            .font(.system(.title3, design: .serif).weight(.bold))
                            .foregroundStyle(sutsumuInk)
                        Text("Inicia sessió per accedir al teu espai.")
                            .font(.caption)
                            .foregroundStyle(sutsumuMutedText)
                    }
                }

                if !appState.statusMessage.isEmpty {
                    sutsumuStatusBanner(appState.statusMessage, tint: bentoRed, icon: "exclamationmark.circle.fill")
                }

                if !appState.isSupabaseConfigured && !appState.isManagedConnection {
                    VStack(alignment: .leading, spacing: 10) {
                        Text("Cal configurar la connexió al servidor abans d'iniciar sessió.")
                            .font(.callout)
                            .foregroundStyle(sutsumuMutedText)
                        Button("Obrir configuració") {
                            isShowingControlCenter = true
                        }
                        .buttonStyle(SutsumuProminentButtonStyle())
                    }
                } else {
                    VStack(alignment: .leading, spacing: 12) {
                        TextField("Correu electrònic", text: $appState.authEmail)
                            .sutsumuEmailEntry()
                            .sutsumuTextEntry()
                        SecureField("Contrasenya", text: $appState.authPassword)
                            .sutsumuTextEntry()

                        HStack(spacing: 10) {
                            Button("Entrar") {
                                Task { @MainActor in await appState.signIn() }
                            }
                            .buttonStyle(SutsumuProminentButtonStyle())
                            .disabled(appState.isLoading || !appState.canAttemptLogin)

                            Button("Crear compte") {
                                Task { @MainActor in await appState.signUp() }
                            }
                            .buttonStyle(SutsumuSoftButtonStyle())
                            .disabled(appState.isLoading || !appState.canAttemptLogin)
                        }

                        Button("He oblidat la contrasenya") {
                            Task { @MainActor in await appState.requestPasswordReset() }
                        }
                        .buttonStyle(SutsumuGhostButtonStyle())
                        .disabled(appState.isLoading || !appState.canAttemptPasswordRecovery)

                        if !appState.isManagedConnection {
                            Button("Canviar servidor") {
                                isShowingControlCenter = true
                            }
                            .buttonStyle(SutsumuGhostButtonStyle())
                        }
                    }
                }
            }
        }
        .frame(width: 420)
    }
}

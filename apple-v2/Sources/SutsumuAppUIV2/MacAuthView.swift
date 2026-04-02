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
        VStack(alignment: .leading, spacing: 20) {
            // Header
            HStack(spacing: 12) {
                ZStack {
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .fill(
                            LinearGradient(
                                colors: [
                                    Color(red: 0.88, green: 0.55, blue: 0.06),
                                    Color(red: 0.56, green: 0.26, blue: 0.03)
                                ],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .frame(width: 44, height: 44)
                    Image(systemName: "tray.2.fill")
                        .font(.system(size: 18, weight: .semibold))
                        .foregroundStyle(.white)
                }

                VStack(alignment: .leading, spacing: 2) {
                    Text("Sutsumu")
                        .font(.headline.weight(.semibold))
                    Text("Inicia sessió per accedir al teu espai.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }

            Divider()

            if !appState.statusMessage.isEmpty {
                HStack(spacing: 8) {
                    Image(systemName: "exclamationmark.circle.fill")
                        .foregroundStyle(bentoRed)
                        .font(.caption)
                    Text(appState.statusMessage)
                        .font(.caption)
                        .foregroundStyle(Color(red: 0.17, green: 0.12, blue: 0.06))
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(bentoRed.opacity(0.09), in: RoundedRectangle(cornerRadius: 8, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 8, style: .continuous).stroke(bentoRed.opacity(0.25), lineWidth: 0.5))
            }

            if !appState.isSupabaseConfigured && !appState.isManagedConnection {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Cal configurar la connexió al servidor abans d'iniciar sessió.")
                        .font(.callout)
                        .foregroundStyle(.secondary)
                    Button("Obrir configuració") {
                        isShowingControlCenter = true
                    }
                    .buttonStyle(SutsumuProminentButtonStyle())
                }
            } else {
                VStack(alignment: .leading, spacing: 10) {
                    TextField("Correu electrònic", text: $appState.authEmail)
                        .sutsumuEmailEntry()
                    SecureField("Contrasenya", text: $appState.authPassword)

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
        .padding(28)
        .frame(width: 360)
        .background(Color.white, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .stroke(Color(red: 0.82, green: 0.76, blue: 0.67), lineWidth: 0.5)
        )
        .shadow(color: Color(red: 0.56, green: 0.38, blue: 0.18).opacity(0.18), radius: 12, x: 0, y: 6)
    }
}

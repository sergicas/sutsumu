import SwiftUI
#if canImport(SutsumuCoreV2)
import SutsumuCoreV2
#endif

struct AuthView: View {
    @ObservedObject var appState: AppState
    @Binding var isShowingControlCenter: Bool

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                if !appState.statusMessage.isEmpty {
                    sutsumuStatusBanner(appState.statusMessage, tint: bentoRed, icon: "exclamationmark.circle.fill")
                }
                welcomeHeroCard
                welcomeAccessCard
                if !appState.isManagedConnection && !appState.isSupabaseConfigured {
                    connectionSetupCard
                }
                welcomeFeaturesCard
            }
            .padding(16)
        }
        .background(appCanvasBackground.ignoresSafeArea())
    }

    private var welcomeHeroCard: some View {
        sutsumuSurfacePanel(tint: bentoPrimary) {
            VStack(alignment: .leading, spacing: 24) {
                HStack(alignment: .center, spacing: 14) {
                    ZStack {
                        RoundedRectangle(cornerRadius: 16, style: .continuous)
                            .fill(
                                LinearGradient(
                                    colors: [bentoPrimary, bentoBlue],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .frame(width: 56, height: 56)
                            .shadow(color: bentoBlue.opacity(0.20), radius: 10, x: 0, y: 6)
                        Image(systemName: "tray.2.fill")
                            .font(.system(size: 22, weight: .semibold))
                            .foregroundStyle(.white)
                    }

                    VStack(alignment: .leading, spacing: 6) {
                        Text("Sutsumu")
                            .font(.system(.title3, design: .serif).weight(.bold))
                            .foregroundStyle(sutsumuInk)
                        Text("El teu espai personal, llest per reprendre a l’iPhone i al Mac.")
                            .font(.caption)
                            .foregroundStyle(sutsumuMutedText)
                    }

                    Spacer(minLength: 0)

                    statChip("Preparat", tint: bentoPrimary)
                }

                VStack(alignment: .leading, spacing: 10) {
                    Text("Continua exactament on ho vas deixar.")
                        .font(.system(.title, design: .serif).weight(.bold))
                        .foregroundStyle(sutsumuInk)

                    Text("Una biblioteca sòlida, sincronització clara i adjunts lligats al document correcte sense fricció.")
                        .font(.callout)
                        .foregroundStyle(sutsumuMutedText)
                }

                HStack(spacing: 8) {
                    miniTag("Espai personal")
                    miniTag("iPhone i Mac")
                    miniTag("Flux professional")
                }

                VStack(alignment: .leading, spacing: 14) {
                    HStack {
                        Text("Workspace principal")
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(sutsumuInk)
                        Spacer(minLength: 8)
                        Text("Fa un moment")
                            .font(.caption)
                            .foregroundStyle(sutsumuMutedText)
                    }

                    HStack(spacing: 10) {
                        welcomeNeutralMetric("12 documents")
                        welcomeNeutralMetric("4 carpetes")
                        welcomeNeutralMetric("Sync segur")
                    }

                    VStack(spacing: 12) {
                        welcomeWorkspaceRow(icon: "folder.fill", tint: bentoPrimary, title: "Clients", detail: "Contractes, seguiment i notes", accessory: "3")
                        welcomeWorkspaceRow(icon: "doc.text.fill", tint: bentoBlue, title: "Proposta v3", detail: "Canvis preparats per continuar", accessory: "Nou")
                        welcomeWorkspaceRow(icon: "paperclip.fill", tint: bentoGreen, title: "Adjunts", detail: "Fitxers lligats a cada document", accessory: "8")
                    }
                }
                .padding(18)
                .background(sutsumuSoftSurface, in: RoundedRectangle(cornerRadius: 20, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: 20, style: .continuous)
                        .stroke(sutsumuBorder.opacity(0.9), lineWidth: 1)
                )
            }
        }
    }

    private var welcomeAccessCard: some View {
        sutsumuCard("Continua al teu compte", tint: bentoPrimary) {
            VStack(alignment: .leading, spacing: 14) {
                HStack(alignment: .top, spacing: 12) {
                    ZStack {
                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .fill(
                                LinearGradient(
                                    colors: [
                                        bentoPrimary,
                                        Color(red: 0.56, green: 0.26, blue: 0.03)
                                    ],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .frame(width: 44, height: 44)
                        Image(systemName: "person.crop.circle.badge.checkmark")
                            .font(.system(size: 20, weight: .semibold))
                            .foregroundStyle(.white)
                    }

                    if appState.isManagedConnection {
                        VStack(alignment: .leading, spacing: 6) {
                            Text("Entra i segueix")
                                .font(.title3.weight(.bold))
                            Text("La connexió ja està preparada. Inicia sessió o crea el teu compte per obrir directament el teu espai.")
                                .font(.callout)
                                .foregroundStyle(.secondary)
                        }
                    } else {
                        VStack(alignment: .leading, spacing: 6) {
                            Text("Configura-ho una vegada")
                                .font(.title3.weight(.bold))
                            Text("Et portarà molt poc. Després només hauràs d’entrar i continuar.")
                                .font(.callout)
                                .foregroundStyle(.secondary)
                        }
                    }
                }

                if !appState.isSupabaseConfigured && !appState.isManagedConnection {
                    VStack(alignment: .leading, spacing: 10) {
                        welcomeStepRow(number: "1", title: "Configura la connexió", detail: "Un sol cop, i ja queda recordat.")
                        welcomeStepRow(number: "2", title: "Entra al teu compte", detail: "La sessió quedarà guardada.")
                    }

                    Button("Configurar ara") {
                        isShowingControlCenter = true
                    }
                    .buttonStyle(SutsumuProminentButtonStyle())
                } else {
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

    private var welcomeFeaturesCard: some View {
        sutsumuCard("A dins hi trobaràs", tint: bentoBlue) {
            VStack(alignment: .leading, spacing: 0) {
                welcomeFeatureRow(
                    icon: "square.grid.2x2.fill",
                    tint: bentoBlue,
                    title: "Biblioteca clara",
                    detail: "Carpetes i documents ordenats dins del mateix espai."
                )

                Divider()
                    .background(Color(red: 0.82, green: 0.76, blue: 0.67))
                    .padding(.vertical, 10)

                welcomeFeatureRow(
                    icon: "clock.arrow.circlepath",
                    tint: bentoGreen,
                    title: "Continuïtat real",
                    detail: "Recupera ràpidament el que tenies obert i continua sense buscar-ho."
                )

                Divider()
                    .background(Color(red: 0.82, green: 0.76, blue: 0.67))
                    .padding(.vertical, 10)

                welcomeFeatureRow(
                    icon: "paperclip.circle.fill",
                    tint: bentoPrimary,
                    title: "Adjunts amb context",
                    detail: "Fitxers, previsualització i contingut sempre lligats al document correcte."
                )
            }
        }
    }

    private var connectionSetupCard: some View {
        sutsumuCard("Configuració del servidor") {
            VStack(alignment: .leading, spacing: 12) {
                TextField("Adreça del servidor (URL)", text: $appState.projectURL)
                    .sutsumuURLEntry()
                    .sutsumuTextEntry()
                SecureField("Clau d’accés", text: $appState.anonKey)
                    .sutsumuTextEntry()
                Text("Introdueix les dades del teu servidor. Només cal fer-ho una vegada.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Button("Desar i continuar") {
                    isShowingControlCenter = false
                }
                .buttonStyle(SutsumuProminentButtonStyle())
                .disabled(!appState.isSupabaseConfigured)
            }
        }
    }

    // Helpers

    private func welcomeNeutralMetric(_ text: String) -> some View {
        Text(text)
            .font(.system(size: 11, weight: .semibold))
            .padding(.horizontal, 10)
            .padding(.vertical, 5)
            .background(sutsumuSoftSurface, in: RoundedRectangle(cornerRadius: 8))
            .foregroundStyle(sutsumuMutedText)
            .overlay(
                RoundedRectangle(cornerRadius: 8)
                    .stroke(sutsumuBorder, lineWidth: 1)
            )
    }

    private func welcomeWorkspaceRow(icon: String, tint: Color, title: String, detail: String, accessory: String) -> some View {
        HStack(spacing: 10) {
            // Bento-style solid icon square
            ZStack {
                RoundedRectangle(cornerRadius: 8, style: .continuous)
                    .fill(tint)
                    .frame(width: 32, height: 32)
                Image(systemName: icon)
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(.white)
            }

            VStack(alignment: .leading, spacing: 1) {
                Text(title)
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(sutsumuInk)
                Text(detail)
                    .font(.caption)
                    .foregroundStyle(sutsumuMutedText)
            }

            Spacer(minLength: 0)

            Text(accessory)
                .font(.system(size: 10, weight: .bold))
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(tint.opacity(0.14), in: RoundedRectangle(cornerRadius: 5))
                .foregroundStyle(tint)
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 8)
        .background(Color.white.opacity(0.85), in: RoundedRectangle(cornerRadius: 14, style: .continuous))
    }

    private func welcomeFeatureRow(icon: String, tint: Color, title: String, detail: String) -> some View {
        HStack(alignment: .center, spacing: 12) {
            ZStack {
                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .fill(tint)
                    .frame(width: 38, height: 38)
                    .shadow(color: tint.opacity(0.35), radius: 3, x: 0, y: 2)
                Image(systemName: icon)
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundStyle(.white)
            }

            VStack(alignment: .leading, spacing: 3) {
                Text(title)
                    .font(.callout.weight(.semibold))
                    .foregroundStyle(sutsumuInk)
                Text(detail)
                    .font(.caption)
                    .foregroundStyle(sutsumuMutedText)
                    .lineLimit(2)
            }

            Spacer(minLength: 0)
        }
    }

    private func welcomeStepRow(number: String, title: String, detail: String) -> some View {
        HStack(alignment: .top, spacing: 12) {
            ZStack {
                Circle()
                    .fill(bentoPrimary)
                    .frame(width: 26, height: 26)
                Text(number)
                    .font(.system(size: 11, weight: .black))
                    .foregroundStyle(.white)
            }

            VStack(alignment: .leading, spacing: 3) {
                Text(title)
                    .font(.callout.weight(.semibold))
                    .foregroundStyle(sutsumuInk)
                Text(detail)
                    .font(.caption)
                    .foregroundStyle(sutsumuMutedText)
            }
        }
    }
}

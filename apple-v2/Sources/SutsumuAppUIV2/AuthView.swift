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
                    HStack(spacing: 10) {
                        Image(systemName: "exclamationmark.circle.fill")
                            .foregroundStyle(bentoRed)
                        Text(appState.statusMessage)
                            .font(.footnote)
                            .foregroundStyle(Color(red: 0.17, green: 0.12, blue: 0.06))
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    .padding(.horizontal, 14)
                    .padding(.vertical, 10)
                    .background(bentoRed.opacity(0.09), in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 10, style: .continuous).stroke(bentoRed.opacity(0.25), lineWidth: 0.5))
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
        VStack(alignment: .leading, spacing: 20) {
            HStack(alignment: .center, spacing: 14) {
                ZStack {
                    RoundedRectangle(cornerRadius: 14, style: .continuous)
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
                        .frame(width: 52, height: 52)
                        .shadow(color: Color(red: 0.56, green: 0.26, blue: 0.03).opacity(0.35), radius: 6, x: 0, y: 3)
                    Image(systemName: "tray.2.fill")
                        .font(.system(size: 22, weight: .semibold))
                        .foregroundStyle(.white)
                }

                VStack(alignment: .leading, spacing: 8) {
                    Text("Sutsumu")
                        .font(.headline.weight(.semibold))
                    Text("El teu espai personal, llest per reprendre a l’iPhone i al Mac.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                Spacer(minLength: 0)

                statChip("Preparat", tint: bentoPrimary)
            }

            VStack(alignment: .leading, spacing: 8) {
                Text("Obre l’app i continua exactament on ho vas deixar.")
                    .font(.system(.title2, design: .rounded).weight(.bold))

                Text("Sutsumu prioritza una biblioteca clara, documents recents i adjunts lligats al context real de treball.")
                    .font(.callout)
                    .foregroundStyle(.secondary)
            }

            VStack(alignment: .leading, spacing: 14) {
                HStack(spacing: 8) {
                    miniTag("Espai personal")
                    miniTag("iPhone i Mac")
                    miniTag("Sense navegador")
                }

                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text("Workspace principal")
                            .font(.subheadline.weight(.semibold))
                        Spacer(minLength: 8)
                        Text("Fa un moment")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }

                    HStack(spacing: 10) {
                        welcomeNeutralMetric("12 documents")
                        welcomeNeutralMetric("4 carpetes")
                        welcomeNeutralMetric("Sync segur")
                    }

                    Divider()

                    VStack(spacing: 10) {
                        welcomeWorkspaceRow(icon: "folder.fill", tint: Color(red: 0.90, green: 0.62, blue: 0.22), title: "Clients", detail: "Contractes, seguiment i notes", accessory: "3")
                        welcomeWorkspaceRow(icon: "doc.text.fill", tint: Color(red: 0.23, green: 0.56, blue: 0.92), title: "Proposta v3", detail: "Canvis preparats per continuar", accessory: "Nou")
                        welcomeWorkspaceRow(icon: "paperclip.fill", tint: Color(red: 0.22, green: 0.66, blue: 0.53), title: "Adjunts", detail: "Fitxers lligats a cada document", accessory: "8")
                    }
                }
                .padding(14)
                .background(Color(red: 0.97, green: 0.95, blue: 0.91), in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .stroke(Color(red: 0.82, green: 0.76, blue: 0.67), lineWidth: 0.5)
                )
            }
        }
        .padding(20)
        .background(Color.white, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .stroke(Color(red: 0.82, green: 0.76, blue: 0.67), lineWidth: 0.5)
        )
        .shadow(color: Color(red: 0.56, green: 0.38, blue: 0.18).opacity(0.18), radius: 6, x: 0, y: 3)
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
                SecureField("Clau d’accés", text: $appState.anonKey)
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
            .background(Color(red: 0.93, green: 0.89, blue: 0.82), in: RoundedRectangle(cornerRadius: 6))
            .foregroundStyle(Color(red: 0.48, green: 0.40, blue: 0.30))
            .overlay(
                RoundedRectangle(cornerRadius: 6)
                    .stroke(Color(red: 0.82, green: 0.76, blue: 0.67), lineWidth: 0.5)
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
                    .foregroundStyle(Color(red: 0.17, green: 0.12, blue: 0.06))
                Text(detail)
                    .font(.caption)
                    .foregroundStyle(Color(red: 0.48, green: 0.40, blue: 0.30))
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
        .padding(.vertical, 7)
        .background(Color.white)
        .overlay(
            Divider()
                .background(Color(red: 0.88, green: 0.83, blue: 0.75)),
            alignment: .bottom
        )
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
                    .foregroundStyle(Color(red: 0.17, green: 0.12, blue: 0.06))
                Text(detail)
                    .font(.caption)
                    .foregroundStyle(Color(red: 0.48, green: 0.40, blue: 0.30))
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
                    .foregroundStyle(Color(red: 0.17, green: 0.12, blue: 0.06))
                Text(detail)
                    .font(.caption)
                    .foregroundStyle(Color(red: 0.48, green: 0.40, blue: 0.30))
            }
        }
    }
}

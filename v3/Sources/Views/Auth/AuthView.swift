import SwiftUI

struct AuthView: View {
    @EnvironmentObject var authService: AuthService
    @EnvironmentObject var themeEngine: ThemeEngine
    @FocusState private var focus: AuthField?

    enum AuthField { case email, password }

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                heroSection
                loginCard
                if !authService.statusMessage.isEmpty {
                    statusBanner
                }
            }
            .padding(20)
        }
        .background(themeEngine.current.background.ignoresSafeArea())
    }

    private var heroSection: some View {
        VStack(spacing: 12) {
            RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius)
                .fill(themeEngine.current.accent)
                .frame(width: 72, height: 72)
                .overlay(
                    Text("S")
                        .font(.system(size: 36, weight: .bold))
                        .foregroundStyle(.white)
                )
            Text("Sutsumu")
                .font(.largeTitle.bold())
                .foregroundStyle(themeEngine.current.ink)
            Text("El teu espai de treball personal")
                .font(.callout)
                .foregroundStyle(themeEngine.current.mutedText)
        }
        .padding(.top, 32)
    }

    private var loginCard: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Inicia sessió")
                .font(.headline)
                .foregroundStyle(themeEngine.current.ink)

            TextField("Correu electrònic", text: $authService.email)
                .keyboardType(.emailAddress)
                .autocorrectionDisabled()
                .textInputAutocapitalization(.never)
                .focused($focus, equals: .email)
                .submitLabel(.next)
                .onSubmit { focus = .password }
                .sutsumuField(theme: themeEngine.current)

            SecureField("Contrasenya", text: $authService.password)
                .focused($focus, equals: .password)
                .submitLabel(.go)
                .onSubmit {
                    Task { await authService.signIn() }
                }
                .sutsumuField(theme: themeEngine.current)

            if authService.isLoading {
                ProgressView()
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.vertical, 4)
            }

            HStack(spacing: 12) {
                Button("Entrar") {
                    Task { await authService.signIn() }
                }
                .sutsumuPrimaryButton(theme: themeEngine.current)
                .disabled(!authService.canSignIn || authService.isLoading)

                Button("Crear compte") {
                    Task { await authService.signUp() }
                }
                .sutsumuSecondaryButton(theme: themeEngine.current)
                .disabled(!authService.canSignIn || authService.isLoading)
            }

            Button("He oblidat la contrasenya") {
                Task { await authService.requestPasswordReset() }
            }
            .font(.caption.weight(.medium))
            .foregroundStyle(themeEngine.current.accent)
            .disabled(authService.isLoading)
        }
        .padding(themeEngine.current.cardPadding)
        .background(themeEngine.current.surface)
        .clipShape(RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius))
        .overlay(
            RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius)
                .stroke(themeEngine.current.border, lineWidth: 1)
        )
    }

    private var statusBanner: some View {
        Text(authService.statusMessage)
            .font(.caption.weight(.medium))
            .foregroundStyle(themeEngine.current.mutedText)
            .multilineTextAlignment(.center)
            .padding(.horizontal, 16)
            .padding(.vertical, 10)
            .frame(maxWidth: .infinity)
            .background(themeEngine.current.surface)
            .clipShape(Capsule())
    }
}

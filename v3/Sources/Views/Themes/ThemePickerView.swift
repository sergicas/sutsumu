import SwiftUI

struct ThemePickerView: View {
    @EnvironmentObject var themeEngine: ThemeEngine

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    Text("Tria el disseny de l'app, com les esferes de l'Apple Watch.")
                        .font(.callout)
                        .foregroundStyle(themeEngine.current.mutedText)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)

                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 16) {
                        ForEach(SutsumuTheme.all) { theme in
                            ThemeCardView(theme: theme, isSelected: themeEngine.current.id == theme.id) {
                                withAnimation(.spring(duration: 0.3)) {
                                    themeEngine.apply(theme)
                                }
                            }
                        }
                    }
                    .padding(20)
                }
            }
            .background(themeEngine.current.background.ignoresSafeArea())
            .navigationTitle("Dissenys")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

struct ThemeCardView: View {
    let theme: SutsumuTheme
    let isSelected: Bool
    let onSelect: () -> Void

    var body: some View {
        Button(action: onSelect) {
            VStack(spacing: 12) {
                // Previsualització del tema
                ZStack {
                    RoundedRectangle(cornerRadius: theme.cornerRadius * 0.7)
                        .fill(theme.background)
                        .frame(height: 100)
                        .overlay(
                            VStack(alignment: .leading, spacing: 6) {
                                RoundedRectangle(cornerRadius: 6)
                                    .fill(theme.surface)
                                    .frame(height: 28)
                                    .overlay(
                                        HStack {
                                            RoundedRectangle(cornerRadius: 4)
                                                .fill(theme.accent)
                                                .frame(width: 16, height: 16)
                                            Rectangle()
                                                .fill(theme.ink.opacity(0.3))
                                                .frame(width: 50, height: 8)
                                                .clipShape(Capsule())
                                            Spacer()
                                        }
                                        .padding(.horizontal, 8)
                                    )
                                RoundedRectangle(cornerRadius: 6)
                                    .fill(theme.surface)
                                    .frame(height: 18)
                                    .padding(.horizontal, 4)
                                RoundedRectangle(cornerRadius: 6)
                                    .fill(theme.surface)
                                    .frame(height: 18)
                                    .padding(.horizontal, 4)
                            }
                            .padding(10)
                        )
                }
                .overlay(
                    RoundedRectangle(cornerRadius: theme.cornerRadius * 0.7)
                        .stroke(isSelected ? theme.accent : theme.border, lineWidth: isSelected ? 2.5 : 1)
                )

                HStack {
                    Image(systemName: theme.preview)
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(theme.accent)
                    Text(theme.name)
                        .font(.callout.weight(.semibold))
                        .foregroundStyle(theme.ink)
                    Spacer()
                    if isSelected {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundStyle(theme.accent)
                    }
                }
            }
        }
        .buttonStyle(.plain)
    }
}

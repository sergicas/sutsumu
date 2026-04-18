import SwiftUI

// MARK: - Modificadors de camp de text

extension View {
    func sutsumuField(theme: SutsumuTheme) -> some View {
        self
            .padding(12)
            .background(theme.surface)
            .clipShape(RoundedRectangle(cornerRadius: theme.cornerRadius * 0.65))
            .overlay(
                RoundedRectangle(cornerRadius: theme.cornerRadius * 0.65)
                    .stroke(theme.border, lineWidth: 1)
            )
    }

    func sutsumuPrimaryButton(theme: SutsumuTheme) -> some View {
        self.modifier(SutsumuPrimaryButtonStyle(theme: theme))
    }

    func sutsumuSecondaryButton(theme: SutsumuTheme, tint: Color? = nil) -> some View {
        self.modifier(SutsumuSecondaryButtonStyle(theme: theme, tint: tint))
    }
}

// MARK: - Estils de botó

struct SutsumuPrimaryButtonStyle: ViewModifier {
    let theme: SutsumuTheme

    func body(content: Content) -> some View {
        content
            .font(.callout.weight(.semibold))
            .foregroundStyle(.white)
            .padding(.horizontal, 20)
            .padding(.vertical, 13)
            .background(theme.accent)
            .clipShape(RoundedRectangle(cornerRadius: theme.cornerRadius * 0.65))
    }
}

struct SutsumuSecondaryButtonStyle: ViewModifier {
    let theme: SutsumuTheme
    var tint: Color? = nil

    func body(content: Content) -> some View {
        let color = tint ?? theme.accent
        return content
            .font(.callout.weight(.semibold))
            .foregroundStyle(color)
            .padding(.horizontal, 20)
            .padding(.vertical, 13)
            .background(color.opacity(0.10))
            .clipShape(RoundedRectangle(cornerRadius: theme.cornerRadius * 0.65))
    }
}

// MARK: - Color des de hex

extension Color {
    init?(hex: String) {
        let hex = hex.trimmingCharacters(in: .whitespacesAndNewlines).trimmingCharacters(in: CharacterSet(charactersIn: "#"))
        guard hex.count == 6, let value = UInt64(hex, radix: 16) else { return nil }
        let r = Double((value >> 16) & 0xFF) / 255
        let g = Double((value >> 8)  & 0xFF) / 255
        let b = Double( value        & 0xFF) / 255
        self.init(red: r, green: g, blue: b)
    }
}

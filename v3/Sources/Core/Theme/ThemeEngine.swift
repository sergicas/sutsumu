import SwiftUI

// MARK: - Theme Protocol

struct SutsumuTheme: Identifiable, Equatable {
    let id: String
    let name: String
    let preview: String  // SF Symbol per a la previsualització

    // Colors principals
    let accent: Color
    let background: Color
    let surface: Color
    let surfaceSecondary: Color
    let ink: Color
    let mutedText: Color
    let border: Color

    // Forma
    let cornerRadius: CGFloat
    let cardPadding: CGFloat
}

// MARK: - Temes predefinits

extension SutsumuTheme {
    static let bento = SutsumuTheme(
        id: "bento",
        name: "Bento",
        preview: "square.grid.2x2.fill",
        accent: Color(red: 0.341, green: 0.400, blue: 0.502),
        background: Color(red: 0.96, green: 0.95, blue: 0.93),
        surface: .white,
        surfaceSecondary: Color(red: 0.97, green: 0.96, blue: 0.94),
        ink: Color(red: 0.13, green: 0.13, blue: 0.16),
        mutedText: Color(red: 0.50, green: 0.50, blue: 0.54),
        border: Color(red: 0.88, green: 0.87, blue: 0.85),
        cornerRadius: 20,
        cardPadding: 20
    )

    static let minimal = SutsumuTheme(
        id: "minimal",
        name: "Minimal",
        preview: "minus.square",
        accent: .black,
        background: Color(UIColor.systemBackground),
        surface: Color(UIColor.secondarySystemBackground),
        surfaceSecondary: Color(UIColor.tertiarySystemBackground),
        ink: Color(UIColor.label),
        mutedText: Color(UIColor.secondaryLabel),
        border: Color(UIColor.separator),
        cornerRadius: 12,
        cardPadding: 16
    )

    static let ocean = SutsumuTheme(
        id: "ocean",
        name: "Ocean",
        preview: "water.waves",
        accent: Color(red: 0.0, green: 0.48, blue: 0.80),
        background: Color(red: 0.92, green: 0.96, blue: 1.0),
        surface: .white,
        surfaceSecondary: Color(red: 0.94, green: 0.97, blue: 1.0),
        ink: Color(red: 0.05, green: 0.15, blue: 0.28),
        mutedText: Color(red: 0.40, green: 0.55, blue: 0.68),
        border: Color(red: 0.80, green: 0.90, blue: 0.97),
        cornerRadius: 16,
        cardPadding: 18
    )

    static let forest = SutsumuTheme(
        id: "forest",
        name: "Forest",
        preview: "leaf.fill",
        accent: Color(red: 0.18, green: 0.49, blue: 0.29),
        background: Color(red: 0.93, green: 0.96, blue: 0.93),
        surface: .white,
        surfaceSecondary: Color(red: 0.94, green: 0.97, blue: 0.94),
        ink: Color(red: 0.10, green: 0.20, blue: 0.12),
        mutedText: Color(red: 0.40, green: 0.55, blue: 0.42),
        border: Color(red: 0.78, green: 0.90, blue: 0.80),
        cornerRadius: 18,
        cardPadding: 20
    )

    static let all: [SutsumuTheme] = [.bento, .minimal, .ocean, .forest]
}

// MARK: - ThemeEngine

@MainActor
final class ThemeEngine: ObservableObject {
    @Published private(set) var current: SutsumuTheme = .bento

    private let defaultsKey = "sutsumu.v3.themeId"

    init() {
        let saved = UserDefaults.standard.string(forKey: defaultsKey) ?? "bento"
        current = SutsumuTheme.all.first { $0.id == saved } ?? .bento
    }

    func apply(_ theme: SutsumuTheme) {
        current = theme
        UserDefaults.standard.set(theme.id, forKey: defaultsKey)
    }
}

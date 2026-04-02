import SwiftUI

#if canImport(AppKit)
import AppKit
#endif
#if canImport(UIKit)
import UIKit
#endif

public let bentoPrimary = Color(red: 0.74, green: 0.44, blue: 0.24)
public let bentoBlue = Color(red: 0.20, green: 0.37, blue: 0.58)
public let bentoGreen = Color(red: 0.18, green: 0.45, blue: 0.38)
public let bentoPurple = Color(red: 0.28, green: 0.32, blue: 0.50)
public let bentoRed = Color(red: 0.72, green: 0.24, blue: 0.18)

public let sutsumuInk = Color(red: 0.12, green: 0.15, blue: 0.20)
public let sutsumuMutedText = Color(red: 0.39, green: 0.43, blue: 0.50)
public let sutsumuBorder = Color(red: 0.80, green: 0.83, blue: 0.87)
public let sutsumuSoftSurface = Color(red: 0.96, green: 0.97, blue: 0.98)
public let sutsumuRaisedSurface = Color(red: 0.99, green: 0.99, blue: 1.00)
public let sutsumuWarmOverlay = Color(red: 0.97, green: 0.94, blue: 0.89)

public var appCanvasBackground: some View {
    ZStack {
        LinearGradient(
            colors: [
                Color(red: 0.98, green: 0.98, blue: 0.99),
                Color(red: 0.93, green: 0.95, blue: 0.97)
            ],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )

        RadialGradient(
            colors: [bentoBlue.opacity(0.16), .clear],
            center: .topLeading,
            startRadius: 12,
            endRadius: 420
        )

        RadialGradient(
            colors: [bentoPrimary.opacity(0.14), .clear],
            center: .bottomTrailing,
            startRadius: 16,
            endRadius: 460
        )

        LinearGradient(
            colors: [
                Color.white.opacity(0.55),
                .clear
            ],
            startPoint: .top,
            endPoint: .center
        )
    }
}

public var sidebarBackground: some View {
    LinearGradient(
        colors: [
            Color(red: 0.95, green: 0.96, blue: 0.98),
            Color(red: 0.91, green: 0.93, blue: 0.96)
        ],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
}

public var detailBackground: some View {
    ZStack {
        Color(red: 0.97, green: 0.98, blue: 0.99)
        RadialGradient(
            colors: [bentoPrimary.opacity(0.08), .clear],
            center: .topTrailing,
            startRadius: 20,
            endRadius: 360
        )
    }
}

public var editorBackgroundColor: Color {
    Color(red: 0.95, green: 0.97, blue: 0.99)
}

public func sutsumuSurfacePanel<Content: View>(
    tint: Color = .white,
    @ViewBuilder content: () -> Content
) -> some View {
    content()
    .padding(24)
    .background(
        ZStack {
            RoundedRectangle(cornerRadius: 26, style: .continuous)
                .fill(sutsumuRaisedSurface.opacity(0.94))

            RoundedRectangle(cornerRadius: 26, style: .continuous)
                .fill(
                    LinearGradient(
                        colors: [
                            Color.white.opacity(0.80),
                            tint.opacity(0.05)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
        }
    )
    .overlay(
        RoundedRectangle(cornerRadius: 26, style: .continuous)
            .stroke(
                LinearGradient(
                    colors: [
                        Color.white.opacity(0.90),
                        sutsumuBorder.opacity(0.80)
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                ),
                lineWidth: 1
            )
    )
    .shadow(color: Color.black.opacity(0.05), radius: 20, x: 0, y: 10)
    .shadow(color: tint.opacity(0.08), radius: 30, x: 0, y: 16)
}

public func sutsumuStatusBanner(_ text: String, tint: Color = bentoBlue, icon: String = "info.circle.fill") -> some View {
    HStack(spacing: 12) {
        Image(systemName: icon)
            .font(.system(size: 14, weight: .semibold))
            .foregroundStyle(tint)

        Text(text)
            .font(.system(size: 13, weight: .medium))
            .foregroundStyle(sutsumuInk)
            .frame(maxWidth: .infinity, alignment: .leading)
    }
    .padding(.horizontal, 14)
    .padding(.vertical, 12)
    .background(
        tint.opacity(0.08),
        in: RoundedRectangle(cornerRadius: 16, style: .continuous)
    )
    .overlay(
        RoundedRectangle(cornerRadius: 16, style: .continuous)
            .stroke(tint.opacity(0.22), lineWidth: 1)
    )
}

public func sutsumuCard<Content: View>(
    _ title: String,
    tint: Color = bentoPrimary,
    @ViewBuilder content: () -> Content
) -> some View {
    VStack(alignment: .leading, spacing: 18) {
        HStack(spacing: 10) {
            Capsule()
                .fill(
                    LinearGradient(
                        colors: [tint, tint.opacity(0.45)],
                        startPoint: .leading,
                        endPoint: .trailing
                    )
                )
                .frame(width: 32, height: 8)

            Text(title)
                .font(.system(size: 11, weight: .bold, design: .rounded))
                .foregroundStyle(sutsumuMutedText)
                .textCase(.uppercase)
                .tracking(1.2)

            Spacer(minLength: 0)
        }

        VStack(alignment: .leading, spacing: 14) {
            content()
        }
    }
    .padding(20)
    .frame(maxWidth: .infinity, alignment: .leading)
    .background(
        ZStack {
            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .fill(sutsumuRaisedSurface.opacity(0.94))

            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .fill(
                    LinearGradient(
                        colors: [
                            Color.white.opacity(0.70),
                            tint.opacity(0.05)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
        }
    )
    .overlay(
        RoundedRectangle(cornerRadius: 24, style: .continuous)
            .stroke(sutsumuBorder.opacity(0.9), lineWidth: 1)
    )
    .shadow(color: Color.black.opacity(0.045), radius: 18, x: 0, y: 8)
}

public func statChip(_ label: String, tint: Color = bentoPrimary) -> some View {
    return Text(label)
        .font(.system(size: 11, weight: .bold, design: .rounded))
        .padding(.horizontal, 11)
        .padding(.vertical, 6)
        .foregroundStyle(tint)
        .background(
            tint.opacity(0.10),
            in: Capsule()
        )
        .overlay(
            Capsule()
                .stroke(tint.opacity(0.24), lineWidth: 1)
        )
}

public func miniTag(_ text: String) -> some View {
    Text(text)
        .font(.system(size: 10, weight: .semibold, design: .rounded))
        .padding(.horizontal, 9)
        .padding(.vertical, 5)
        .foregroundStyle(sutsumuMutedText)
        .background(sutsumuSoftSurface, in: Capsule())
        .overlay(
            Capsule()
                .stroke(sutsumuBorder.opacity(0.85), lineWidth: 1)
        )
}

public func heroMetric(title: String, value: String) -> some View {
    VStack(alignment: .leading, spacing: 4) {
        Text(title)
            .font(.system(size: 10, weight: .black, design: .rounded))
            .foregroundStyle(.white.opacity(0.68))
            .textCase(.uppercase)
            .tracking(1.0)
        Text(value)
            .font(.system(.subheadline, design: .rounded).weight(.bold))
            .foregroundStyle(.white)
            .lineLimit(1)
    }
    .padding(.horizontal, 13)
    .padding(.vertical, 11)
    .frame(maxWidth: .infinity, alignment: .leading)
    .background(Color.white.opacity(0.10), in: RoundedRectangle(cornerRadius: 14, style: .continuous))
    .overlay(
        RoundedRectangle(cornerRadius: 14, style: .continuous)
            .stroke(Color.white.opacity(0.14), lineWidth: 1)
    )
}

public func bentoMetric(title: String, value: String, tint: Color = bentoPrimary) -> some View {
    VStack(alignment: .leading, spacing: 5) {
        Text(title)
            .font(.system(size: 10, weight: .black, design: .rounded))
            .foregroundStyle(tint)
            .textCase(.uppercase)
            .tracking(1.0)
        Text(value)
            .font(.system(.subheadline, design: .rounded).weight(.bold))
            .foregroundStyle(sutsumuInk)
            .lineLimit(1)
    }
    .padding(.horizontal, 14)
    .padding(.vertical, 12)
    .frame(maxWidth: .infinity, alignment: .leading)
    .background(
        tint.opacity(0.08),
        in: RoundedRectangle(cornerRadius: 16, style: .continuous)
    )
    .overlay(
        RoundedRectangle(cornerRadius: 16, style: .continuous)
            .stroke(tint.opacity(0.18), lineWidth: 1)
    )
}

public func bentoFieldRow(label: String, value: String) -> some View {
    HStack(alignment: .firstTextBaseline, spacing: 0) {
        Text(label)
            .font(.system(size: 12, weight: .semibold, design: .rounded))
            .foregroundStyle(sutsumuMutedText)
            .frame(width: 110, alignment: .leading)
        Text(value)
            .font(.system(size: 13))
            .foregroundStyle(sutsumuInk)
            .frame(maxWidth: .infinity, alignment: .leading)
    }
    .padding(.vertical, 10)
    .padding(.horizontal, 14)
    .background(sutsumuRaisedSurface)
    .overlay(
        Divider().background(sutsumuBorder.opacity(0.55)),
        alignment: .bottom
    )
}

public struct SutsumuProminentButtonStyle: ButtonStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.callout.weight(.bold))
            .padding(.horizontal, 18)
            .padding(.vertical, 12)
            .foregroundStyle(.white)
            .background(
                LinearGradient(
                    colors: [
                        bentoPrimary,
                        bentoPrimary.opacity(0.82)
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                ),
                in: RoundedRectangle(cornerRadius: 16, style: .continuous)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(Color.white.opacity(0.16), lineWidth: 1)
            )
            .shadow(color: bentoPrimary.opacity(0.28), radius: 12, x: 0, y: 6)
            .scaleEffect(configuration.isPressed ? 0.985 : 1)
            .animation(.spring(response: 0.22, dampingFraction: 0.8), value: configuration.isPressed)
    }
}

public struct SutsumuSoftButtonStyle: ButtonStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.callout.weight(.semibold))
            .padding(.horizontal, 18)
            .padding(.vertical, 12)
            .foregroundStyle(bentoBlue)
            .background(
                sutsumuRaisedSurface.opacity(0.92),
                in: RoundedRectangle(cornerRadius: 16, style: .continuous)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(bentoBlue.opacity(0.18), lineWidth: 1)
            )
            .shadow(color: Color.black.opacity(0.03), radius: 8, x: 0, y: 4)
            .scaleEffect(configuration.isPressed ? 0.985 : 1)
            .animation(.spring(response: 0.22, dampingFraction: 0.8), value: configuration.isPressed)
    }
}

public struct SutsumuOutlineButtonStyle: ButtonStyle {
    var tint: Color

    public init(tint: Color = sutsumuMutedText) {
        self.tint = tint
    }

    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.callout.weight(.semibold))
            .padding(.horizontal, 18)
            .padding(.vertical, 12)
            .foregroundStyle(tint)
            .background(
                Color.white.opacity(0.82),
                in: RoundedRectangle(cornerRadius: 16, style: .continuous)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(tint.opacity(0.30), lineWidth: 1)
            )
            .scaleEffect(configuration.isPressed ? 0.985 : 1)
    }
}

public struct SutsumuGlassButtonStyle: ButtonStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 12, weight: .bold, design: .rounded))
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .foregroundStyle(.white)
            .background(Color.white.opacity(0.14), in: RoundedRectangle(cornerRadius: 14, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .stroke(Color.white.opacity(0.18), lineWidth: 1)
            )
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
    }
}

public struct SutsumuGhostButtonStyle: ButtonStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.callout.weight(.medium))
            .foregroundStyle(sutsumuMutedText)
            .padding(.horizontal, 10)
            .padding(.vertical, 8)
            .contentShape(Rectangle())
            .opacity(configuration.isPressed ? 0.6 : 1)
    }
}

public extension View {
    @ViewBuilder
    func sutsumuInlineNavigationTitle() -> some View {
#if os(iOS)
        navigationBarTitleDisplayMode(.inline)
#else
        self
#endif
    }

    @ViewBuilder
    func sutsumuEmailEntry() -> some View {
#if os(iOS)
        textInputAutocapitalization(.never)
            .autocorrectionDisabled(true)
            .keyboardType(.emailAddress)
#else
        self
#endif
    }

    @ViewBuilder
    func sutsumuURLEntry() -> some View {
#if os(iOS)
        textInputAutocapitalization(.never)
            .autocorrectionDisabled(true)
            .keyboardType(.URL)
#else
        self
#endif
    }

    func sutsumuTextEntry() -> some View {
        self
            .font(.system(.body, design: .rounded))
            .padding(.horizontal, 14)
            .padding(.vertical, 12)
            .background(
                sutsumuSoftSurface,
                in: RoundedRectangle(cornerRadius: 16, style: .continuous)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(sutsumuBorder.opacity(0.95), lineWidth: 1)
            )
    }
}

#if os(macOS) && !targetEnvironment(macCatalyst)
public extension Image {
    init(platformImage: NSImage) {
        self.init(nsImage: platformImage)
    }
}

public func platformImage(from data: Data) -> NSImage? {
    NSImage(data: data)
}
#else
public extension Image {
    init(platformImage: UIImage) {
        self.init(uiImage: platformImage)
    }
}

public func platformImage(from data: Data) -> UIImage? {
    UIImage(data: data)
}
#endif

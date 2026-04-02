import SwiftUI

#if canImport(AppKit)
import AppKit
#endif
#if canImport(UIKit)
import UIKit
#endif

// MARK: - Bento Design Tokens

public let bentoPrimary  = Color(red: 0.88, green: 0.55, blue: 0.06)   // warm golden orange #E08C0F
public let bentoBlue     = Color(red: 0.09, green: 0.40, blue: 0.78)   // #1767C7
public let bentoGreen    = Color(red: 0.10, green: 0.47, blue: 0.28)   // #1B7847
public let bentoPurple   = Color(red: 0.44, green: 0.25, blue: 0.72)   // #7040B8
public let bentoRed      = Color(red: 0.76, green: 0.16, blue: 0.10)   // #C22819

private let bentoText        = Color(red: 0.17, green: 0.12, blue: 0.06)
private let bentoTextSec     = Color(red: 0.48, green: 0.40, blue: 0.30)
private let bentoBorder      = Color(red: 0.82, green: 0.76, blue: 0.67)
private let bentoRowStripe   = Color(red: 0.97, green: 0.95, blue: 0.91)

// MARK: - Alias tokens (used by LibraryView drag-drop and newer components)
// Mapped to the warm bento palette so the original look is preserved.
public let sutsumuInk          = Color(red: 0.17, green: 0.12, blue: 0.06)
public let sutsumuMutedText    = Color(red: 0.48, green: 0.40, blue: 0.30)
public let sutsumuBorder       = Color(red: 0.82, green: 0.76, blue: 0.67)
public let sutsumuSoftSurface  = Color(red: 0.97, green: 0.95, blue: 0.91)
public let sutsumuRaisedSurface = Color(red: 1.00, green: 1.00, blue: 1.00)
public let sutsumuWarmOverlay  = Color(red: 0.97, green: 0.94, blue: 0.89)

public func sutsumuSurfacePanel<Content: View>(
    tint: Color = .white,
    @ViewBuilder content: () -> Content
) -> some View {
    content()
        .padding(24)
        .background(Color.white, in: RoundedRectangle(cornerRadius: 20, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .stroke(bentoBorder, lineWidth: 0.5)
        )
        .shadow(color: Color(red: 0.60, green: 0.48, blue: 0.33).opacity(0.16), radius: 10, x: 0, y: 4)
}

public func sutsumuStatusBanner(_ text: String, tint: Color = bentoBlue, icon: String = "info.circle.fill") -> some View {
    HStack(spacing: 10) {
        Image(systemName: icon)
            .font(.system(size: 13, weight: .semibold))
            .foregroundStyle(tint)
        Text(text)
            .font(.callout)
            .foregroundStyle(bentoText)
            .frame(maxWidth: .infinity, alignment: .leading)
    }
    .padding(.horizontal, 14)
    .padding(.vertical, 10)
    .background(tint.opacity(0.09), in: RoundedRectangle(cornerRadius: 10, style: .continuous))
    .overlay(
        RoundedRectangle(cornerRadius: 10, style: .continuous)
            .stroke(tint.opacity(0.25), lineWidth: 0.5)
    )
}

// MARK: - App Backgrounds

public var appCanvasBackground: some View {
    LinearGradient(
        colors: [
            Color(red: 0.96, green: 0.93, blue: 0.87),
            Color(red: 0.93, green: 0.89, blue: 0.82)
        ],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
}

public var sidebarBackground: some View {
    Color(red: 0.89, green: 0.84, blue: 0.76)
}

public var detailBackground: some View {
    Color(red: 0.96, green: 0.93, blue: 0.87)
}

public var editorBackgroundColor: Color {
    Color(red: 0.95, green: 0.92, blue: 0.86)
}

// MARK: - Section Card
// Subtle section label + clean white card — no colored header bar.

public func sutsumuCard<Content: View>(
    _ title: String,
    tint: Color = Color(red: 0.88, green: 0.55, blue: 0.06),
    @ViewBuilder content: () -> Content
) -> some View {
    VStack(alignment: .leading, spacing: 8) {
        // Subtle section label with a thin accent pill
        HStack(spacing: 6) {
            Capsule()
                .fill(tint)
                .frame(width: 3, height: 13)
            Text(title)
                .font(.system(size: 11, weight: .semibold))
                .foregroundStyle(bentoTextSec)
                .textCase(.uppercase)
                .tracking(0.5)
        }
        .padding(.leading, 2)

        // White content card
        VStack(alignment: .leading, spacing: 12) {
            content()
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.white)
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 12, style: .continuous)
                .stroke(bentoBorder.opacity(0.8), lineWidth: 0.5)
        )
        .shadow(color: Color(red: 0.55, green: 0.43, blue: 0.28).opacity(0.10), radius: 4, x: 0, y: 2)
    }
}

// MARK: - Stat Chip

public func statChip(_ label: String, tint: Color = bentoPrimary) -> some View {
    let isSecondary = tint == .secondary
    return Text(label)
        .font(.system(size: 11, weight: .bold))
        .padding(.horizontal, 10)
        .padding(.vertical, 5)
        .foregroundStyle(isSecondary ? bentoTextSec : tint)
        .background(
            isSecondary
                ? Color(red: 0.91, green: 0.87, blue: 0.80)
                : tint.opacity(0.13),
            in: RoundedRectangle(cornerRadius: 6, style: .continuous)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 6, style: .continuous)
                .stroke(isSecondary ? bentoBorder : tint.opacity(0.28), lineWidth: 0.5)
        )
}

// MARK: - Mini Tag

public func miniTag(_ text: String) -> some View {
    Text(text)
        .font(.system(size: 10, weight: .semibold))
        .padding(.horizontal, 7)
        .padding(.vertical, 3)
        .foregroundStyle(bentoTextSec)
        .background(bentoRowStripe, in: RoundedRectangle(cornerRadius: 5, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 5, style: .continuous)
                .stroke(bentoBorder.opacity(0.7), lineWidth: 0.5)
        )
}

// MARK: - Hero Metric (for dark / gradient backgrounds)

public func heroMetric(title: String, value: String) -> some View {
    VStack(alignment: .leading, spacing: 4) {
        Text(title)
            .font(.system(size: 9, weight: .black))
            .foregroundStyle(.white.opacity(0.75))
            .textCase(.uppercase)
            .tracking(0.7)
        Text(value)
            .font(.system(.subheadline, design: .rounded).weight(.bold))
            .foregroundStyle(.white)
            .lineLimit(1)
    }
    .padding(.horizontal, 12)
    .padding(.vertical, 10)
    .frame(maxWidth: .infinity, alignment: .leading)
    .background(Color.black.opacity(0.16))
    .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
}

// MARK: - Bento Metric (for light / white card backgrounds)

public func bentoMetric(title: String, value: String, tint: Color = bentoPrimary) -> some View {
    VStack(alignment: .leading, spacing: 3) {
        Text(title)
            .font(.system(size: 9, weight: .black))
            .foregroundStyle(tint)
            .textCase(.uppercase)
            .tracking(0.7)
        Text(value)
            .font(.system(.subheadline, design: .rounded).weight(.bold))
            .foregroundStyle(bentoText)
            .lineLimit(1)
    }
    .padding(.horizontal, 12)
    .padding(.vertical, 10)
    .frame(maxWidth: .infinity, alignment: .leading)
    .background(tint.opacity(0.09))
    .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
    .overlay(
        RoundedRectangle(cornerRadius: 10, style: .continuous)
            .stroke(tint.opacity(0.22), lineWidth: 0.75)
    )
}

// MARK: - Bento Row (structured field row, like Bento's record detail)

public func bentoFieldRow(label: String, value: String) -> some View {
    HStack(alignment: .firstTextBaseline, spacing: 0) {
        Text(label)
            .font(.system(size: 12, weight: .semibold))
            .foregroundStyle(bentoTextSec)
            .frame(width: 110, alignment: .leading)
        Text(value)
            .font(.system(size: 13))
            .foregroundStyle(bentoText)
            .frame(maxWidth: .infinity, alignment: .leading)
    }
    .padding(.vertical, 9)
    .padding(.horizontal, 14)
    .background(Color.white)
    .overlay(
        Divider()
            .background(bentoBorder.opacity(0.5)),
        alignment: .bottom
    )
}

// MARK: - Button Styles

public struct SutsumuProminentButtonStyle: ButtonStyle {
    public init() {}
    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.callout.weight(.bold))
            .padding(.horizontal, 18)
            .padding(.vertical, 11)
            .foregroundStyle(.white)
            .background(
                bentoPrimary,
                in: RoundedRectangle(cornerRadius: 10, style: .continuous)
            )
            .shadow(color: bentoPrimary.opacity(0.40), radius: 3, x: 0, y: 2)
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .animation(.spring(response: 0.2, dampingFraction: 0.7), value: configuration.isPressed)
    }
}

public struct SutsumuSoftButtonStyle: ButtonStyle {
    public init() {}
    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.callout.weight(.semibold))
            .padding(.horizontal, 18)
            .padding(.vertical, 11)
            .foregroundStyle(bentoBlue)
            .background(
                bentoBlue.opacity(0.10),
                in: RoundedRectangle(cornerRadius: 10, style: .continuous)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .stroke(bentoBlue.opacity(0.28), lineWidth: 1)
            )
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .animation(.spring(response: 0.2), value: configuration.isPressed)
    }
}

public struct SutsumuOutlineButtonStyle: ButtonStyle {
    var tint: Color
    public init(tint: Color = Color(red: 0.48, green: 0.40, blue: 0.30)) { self.tint = tint }
    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.callout.weight(.semibold))
            .padding(.horizontal, 18)
            .padding(.vertical, 11)
            .foregroundStyle(tint)
            .background(Color.white, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .stroke(tint.opacity(0.5), lineWidth: 1.5)
            )
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
    }
}

public struct SutsumuGlassButtonStyle: ButtonStyle {
    public init() {}
    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 12, weight: .bold))
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .foregroundStyle(.white)
            .background(.white.opacity(0.22), in: RoundedRectangle(cornerRadius: 10, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .stroke(.white.opacity(0.40), lineWidth: 1)
            )
            .scaleEffect(configuration.isPressed ? 0.96 : 1)
    }
}

public struct SutsumuGhostButtonStyle: ButtonStyle {
    public init() {}
    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.callout.weight(.medium))
            .foregroundStyle(bentoTextSec)
            .padding(.horizontal, 10)
            .padding(.vertical, 8)
            .contentShape(Rectangle())
            .opacity(configuration.isPressed ? 0.6 : 1)
    }
}

// MARK: - View Extensions

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
}

// MARK: - Platform Image Helpers
// Mac Catalyst uses UIKit (not AppKit), so we check targetEnvironment first.

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

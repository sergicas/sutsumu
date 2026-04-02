import AppKit

let outputDirectory = URL(fileURLWithPath: CommandLine.arguments.dropFirst().first ?? FileManager.default.currentDirectoryPath)
let rendererSize = CGSize(width: 1024, height: 1024)

let image = NSImage(size: rendererSize)
image.lockFocus()

guard let context = NSGraphicsContext.current?.cgContext else {
    fputs("No he pogut crear el context gràfic.\n", stderr)
    exit(1)
}

let canvas = CGRect(origin: .zero, size: rendererSize)
let cornerRadius: CGFloat = 232

let clipPath = NSBezierPath(roundedRect: canvas, xRadius: cornerRadius, yRadius: cornerRadius)
clipPath.addClip()

let backgroundGradient = NSGradient(colors: [
    NSColor(calibratedRed: 0.07, green: 0.34, blue: 0.79, alpha: 1.0),
    NSColor(calibratedRed: 0.10, green: 0.56, blue: 0.73, alpha: 1.0),
    NSColor(calibratedRed: 0.31, green: 0.74, blue: 0.63, alpha: 1.0),
])!
backgroundGradient.draw(in: canvas, angle: -35)

func fillCircle(center: CGPoint, radius: CGFloat, color: NSColor) {
    let rect = CGRect(x: center.x - radius, y: center.y - radius, width: radius * 2, height: radius * 2)
    color.setFill()
    context.fillEllipse(in: rect)
}

fillCircle(center: CGPoint(x: 210, y: 880), radius: 210, color: NSColor.white.withAlphaComponent(0.10))
fillCircle(center: CGPoint(x: 870, y: 240), radius: 240, color: NSColor(calibratedRed: 0.76, green: 0.96, blue: 0.93, alpha: 0.14))
fillCircle(center: CGPoint(x: 825, y: 865), radius: 140, color: NSColor.white.withAlphaComponent(0.08))

func roundedRect(_ rect: CGRect, radius: CGFloat) -> NSBezierPath {
    NSBezierPath(roundedRect: rect, xRadius: radius, yRadius: radius)
}

func drawCard(in rect: CGRect, angle: CGFloat, fill: NSColor, stroke: NSColor, shadow: NSColor) {
    context.saveGState()
    context.translateBy(x: rect.midX, y: rect.midY)
    context.rotate(by: angle * .pi / 180)
    context.translateBy(x: -rect.midX, y: -rect.midY)

    let shadowColor = shadow.cgColor
    context.setShadow(offset: CGSize(width: 0, height: -14), blur: 28, color: shadowColor)

    let path = roundedRect(rect, radius: 88)
    fill.setFill()
    path.fill()
    context.setShadow(offset: .zero, blur: 0, color: nil)
    stroke.setStroke()
    path.lineWidth = 6
    path.stroke()

    context.restoreGState()
}

let backCard = CGRect(x: 178, y: 332, width: 500, height: 420)
let middleCard = CGRect(x: 268, y: 248, width: 500, height: 430)
let frontCard = CGRect(x: 346, y: 164, width: 500, height: 450)

drawCard(
    in: backCard,
    angle: -13,
    fill: NSColor.white.withAlphaComponent(0.20),
    stroke: NSColor.white.withAlphaComponent(0.18),
    shadow: NSColor.black.withAlphaComponent(0.10)
)
drawCard(
    in: middleCard,
    angle: -6,
    fill: NSColor.white.withAlphaComponent(0.28),
    stroke: NSColor.white.withAlphaComponent(0.22),
    shadow: NSColor.black.withAlphaComponent(0.12)
)
drawCard(
    in: frontCard,
    angle: 0,
    fill: NSColor(calibratedRed: 0.98, green: 0.99, blue: 1.0, alpha: 0.98),
    stroke: NSColor.white.withAlphaComponent(0.88),
    shadow: NSColor.black.withAlphaComponent(0.18)
)

func drawLine(in rect: CGRect, y: CGFloat, width: CGFloat, alpha: CGFloat) {
    let path = roundedRect(CGRect(x: rect.minX + 72, y: y, width: width, height: 22), radius: 11)
    NSColor(calibratedRed: 0.12, green: 0.47, blue: 0.81, alpha: alpha).setFill()
    path.fill()
}

drawLine(in: frontCard, y: 470, width: 270, alpha: 0.92)
drawLine(in: frontCard, y: 414, width: 330, alpha: 0.28)
drawLine(in: frontCard, y: 360, width: 290, alpha: 0.18)

let badgeRect = CGRect(x: 628, y: 508, width: 136, height: 136)
let badgePath = roundedRect(badgeRect, radius: 38)
NSColor(calibratedRed: 0.15, green: 0.68, blue: 0.48, alpha: 1.0).setFill()
badgePath.fill()

let badgeParagraph = NSMutableParagraphStyle()
badgeParagraph.alignment = .center
let badgeText = NSAttributedString(
    string: "S",
    attributes: [
        .font: NSFont.systemFont(ofSize: 84, weight: .bold),
        .foregroundColor: NSColor.white,
        .paragraphStyle: badgeParagraph,
    ]
)
badgeText.draw(in: CGRect(x: badgeRect.minX, y: badgeRect.minY + 18, width: badgeRect.width, height: badgeRect.height))

let subtitleParagraph = NSMutableParagraphStyle()
subtitleParagraph.alignment = .left
let subtitleText = NSAttributedString(
    string: "v2",
    attributes: [
        .font: NSFont.systemFont(ofSize: 48, weight: .heavy),
        .foregroundColor: NSColor.white.withAlphaComponent(0.92),
        .paragraphStyle: subtitleParagraph,
    ]
)
subtitleText.draw(in: CGRect(x: 144, y: 144, width: 140, height: 64))

image.unlockFocus()

let representation = NSBitmapImageRep(data: image.tiffRepresentation!)
guard let pngData = representation?.representation(using: .png, properties: [:]) else {
    fputs("No he pogut exportar el PNG mestre.\n", stderr)
    exit(1)
}

try FileManager.default.createDirectory(at: outputDirectory, withIntermediateDirectories: true)
try pngData.write(to: outputDirectory.appendingPathComponent("AppIcon-master-1024.png"))
print(outputDirectory.appendingPathComponent("AppIcon-master-1024.png").path)

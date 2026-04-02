// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "SutsumuAppleV2",
    platforms: [
        .macOS(.v14),
        .iOS(.v17)
    ],
    products: [
        .library(
            name: "SutsumuCoreV2",
            targets: ["SutsumuCoreV2"]
        ),
        .library(
            name: "SutsumuAppUIV2",
            targets: ["SutsumuAppUIV2"]
        ),
        .executable(
            name: "SutsumuAppleV2App",
            targets: ["SutsumuAppleV2App"]
        )
    ],
    targets: [
        .target(
            name: "SutsumuCoreV2"
        ),
        .target(
            name: "SutsumuAppUIV2",
            dependencies: ["SutsumuCoreV2"]
        ),
        .executableTarget(
            name: "SutsumuAppleV2App",
            dependencies: ["SutsumuAppUIV2"]
        ),
        .testTarget(
            name: "SutsumuCoreV2Tests",
            dependencies: ["SutsumuCoreV2", "SutsumuAppUIV2"]
        )
    ]
)

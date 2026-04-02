import SwiftUI
import SutsumuAppUIV2

@main
struct SutsumuAppleV2App: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .frame(minWidth: 980, minHeight: 680)
        }
        .windowResizability(.contentSize)
    }
}

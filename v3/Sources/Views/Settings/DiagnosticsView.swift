import SwiftUI

struct DiagnosticsView: View {
    @EnvironmentObject var diagnosticsService: DiagnosticsService
    @EnvironmentObject var themeEngine: ThemeEngine
    @State private var showingClearConfirmation = false

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                modeCard
                if !diagnosticsService.activeBehaviors.isEmpty {
                    adaptationsCard
                }
                errorsCard
            }
            .padding(20)
        }
        .background(themeEngine.current.background.ignoresSafeArea())
        .navigationTitle("Diagnòstic")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .automatic) {
                Button("Esborrar errors") {
                    showingClearConfirmation = true
                }
                .foregroundStyle(.red)
                .disabled(diagnosticsService.entries.isEmpty)
            }
        }
        .alert("Esborrar registre d'errors?", isPresented: $showingClearConfirmation) {
            Button("Esborrar", role: .destructive) {
                diagnosticsService.clearAll()
            }
            Button("Cancel·lar", role: .cancel) {}
        }
    }

    // MARK: - Mode card

    private var modeCard: some View {
        HStack(spacing: 14) {
            Image(systemName: diagnosticsService.hasDegradedMode
                  ? "exclamationmark.triangle.fill"
                  : "checkmark.circle.fill")
                .font(.title2)
                .foregroundStyle(diagnosticsService.hasDegradedMode ? .orange : .green)

            VStack(alignment: .leading, spacing: 4) {
                Text(diagnosticsService.hasDegradedMode ? "Mode degradat actiu" : "Funcionament normal")
                    .font(.callout.weight(.semibold))
                    .foregroundStyle(themeEngine.current.ink)
                Text("\(diagnosticsService.entries.count) errors registrats en total")
                    .font(.caption)
                    .foregroundStyle(themeEngine.current.mutedText)
            }
            Spacer()
        }
        .padding(themeEngine.current.cardPadding)
        .background(themeEngine.current.surface)
        .clipShape(RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius))
        .overlay(
            RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius)
                .stroke(themeEngine.current.border, lineWidth: 1)
        )
    }

    // MARK: - Adaptacions actives

    private var adaptationsCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Adaptacions actives")
                .font(.caption.weight(.semibold))
                .foregroundStyle(themeEngine.current.mutedText)

            ForEach(diagnosticsService.activeBehaviors, id: \.self) { behavior in
                HStack(alignment: .top, spacing: 10) {
                    Image(systemName: "arrow.triangle.2.circlepath")
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(.orange)
                        .padding(.top, 1)
                    Text(behavior)
                        .font(.caption)
                        .foregroundStyle(themeEngine.current.ink)
                        .fixedSize(horizontal: false, vertical: true)
                }
            }
        }
        .padding(themeEngine.current.cardPadding)
        .background(themeEngine.current.surface)
        .clipShape(RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius))
        .overlay(
            RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius)
                .stroke(Color.orange.opacity(0.45), lineWidth: 1.5)
        )
    }

    // MARK: - Llista d'errors

    private var errorsCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Errors recents")
                .font(.caption.weight(.semibold))
                .foregroundStyle(themeEngine.current.mutedText)

            if diagnosticsService.entries.isEmpty {
                Text("Cap error registrat encara.")
                    .font(.caption)
                    .foregroundStyle(themeEngine.current.mutedText)
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.vertical, 16)
            } else {
                let visible = Array(diagnosticsService.entries.prefix(50))
                ForEach(visible) { entry in
                    errorRow(entry)
                    if entry.id != visible.last?.id {
                        Divider()
                            .padding(.vertical, 2)
                    }
                }
            }
        }
        .padding(themeEngine.current.cardPadding)
        .background(themeEngine.current.surface)
        .clipShape(RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius))
        .overlay(
            RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius)
                .stroke(themeEngine.current.border, lineWidth: 1)
        )
    }

    private func errorRow(_ entry: ErrorEntry) -> some View {
        VStack(alignment: .leading, spacing: 5) {
            HStack {
                domainBadge(entry.domain)
                Spacer()
                Text(entry.timestamp.formatted(.relative(presentation: .named)))
                    .font(.caption2)
                    .foregroundStyle(themeEngine.current.mutedText)
            }
            Text(entry.message)
                .font(.caption)
                .foregroundStyle(themeEngine.current.ink)
                .fixedSize(horizontal: false, vertical: true)
            Text(entry.code)
                .font(.caption2)
                .foregroundStyle(themeEngine.current.mutedText)
        }
        .padding(.vertical, 4)
    }

    private func domainBadge(_ domain: ErrorEntry.ErrorDomain) -> some View {
        Text(domain.rawValue)
            .font(.caption2.weight(.bold))
            .foregroundStyle(.white)
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .background(domainColor(domain))
            .clipShape(Capsule())
    }

    private func domainColor(_ domain: ErrorEntry.ErrorDomain) -> Color {
        switch domain {
        case .auth:      return .purple
        case .sync:      return .blue
        case .workspace: return .orange
        case .decode:    return .red
        case .unknown:   return .gray
        }
    }
}

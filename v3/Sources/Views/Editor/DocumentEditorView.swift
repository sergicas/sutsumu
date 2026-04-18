import SwiftUI

struct DocumentEditorView: View {
    @EnvironmentObject var workspaceService: WorkspaceService
    @EnvironmentObject var themeEngine: ThemeEngine
    @EnvironmentObject var attachmentService: AttachmentService
    @State private var draft: SutsumuDocument
    @State private var saveTask: Task<Void, Never>? = nil
    @State private var showSavedToast = false
    @State private var toastTask: Task<Void, Never>? = nil
    @Environment(\.dismiss) private var dismiss

    init(document: SutsumuDocument) {
        _draft = State(initialValue: document)
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                titleField
                metadataSection
                contentEditor
                AttachmentSection(document: $draft)
            }
            .padding(20)
        }
        .overlay(alignment: .bottom) {
            if showSavedToast {
                savedToastView
                    .transition(.move(edge: .bottom).combined(with: .opacity))
                    .padding(.bottom, 20)
                    .zIndex(99)
            }
        }
        .animation(.spring(response: 0.3, dampingFraction: 0.7), value: showSavedToast)
        .background(themeEngine.current.background.ignoresSafeArea())
        .navigationTitle(draft.title.isEmpty ? "Sense títol" : draft.title)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Button("Desar") {
                    saveNow()
                    triggerSavedToast()
                }
                .fontWeight(.semibold)
                .foregroundStyle(themeEngine.current.accent)
            }
        }
        .onChange(of: draft) { _, _ in scheduleSave() }
    }

    // MARK: - Camps

    private var titleField: some View {
        TextField("Títol del document", text: $draft.title)
            .font(.title2.weight(.bold))
            .foregroundStyle(themeEngine.current.ink)
            .padding(14)
            .background(themeEngine.current.surface)
            .clipShape(RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius))
            .overlay(
                RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius)
                    .stroke(themeEngine.current.border, lineWidth: 1)
            )
    }

    private var metadataSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            TextField("Categoria", text: $draft.category)
                .font(.callout)
                .foregroundStyle(themeEngine.current.ink)
                .sutsumuField(theme: themeEngine.current)

            TagEditor(tags: $draft.tags, theme: themeEngine.current)
        }
    }

    private var contentEditor: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Contingut")
                .font(.caption.weight(.semibold))
                .foregroundStyle(themeEngine.current.mutedText)

            TextEditor(text: $draft.content)
                .font(.body)
                .foregroundStyle(themeEngine.current.ink)
                .scrollContentBackground(.hidden)
                .background(themeEngine.current.surface)
                .frame(minHeight: 300)
                .padding(14)
                .background(themeEngine.current.surface)
                .clipShape(RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius))
                .overlay(
                    RoundedRectangle(cornerRadius: themeEngine.current.cornerRadius)
                        .stroke(themeEngine.current.border, lineWidth: 1)
                )
        }
    }

    // MARK: - Desar

    private func scheduleSave() {
        saveTask?.cancel()
        saveTask = Task {
            try? await Task.sleep(nanoseconds: 500_000_000) // 0.5s debounce
            guard !Task.isCancelled else { return }
            saveNow()
        }
    }

    private func saveNow() {
        saveTask?.cancel()
        workspaceService.updateDocument(draft)
    }

    private func triggerSavedToast() {
        toastTask?.cancel()
        showSavedToast = true
        toastTask = Task { @MainActor in
            try? await Task.sleep(nanoseconds: 1_400_000_000)
            showSavedToast = false
        }
    }

    private var savedToastView: some View {
        HStack(spacing: 8) {
            Image(systemName: "checkmark.circle.fill")
                .foregroundStyle(themeEngine.current.accent)
                .font(.system(size: 15, weight: .semibold))
            Text("Desat")
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(themeEngine.current.ink)
        }
        .padding(.horizontal, 18)
        .padding(.vertical, 10)
        .background(
            Capsule()
                .fill(themeEngine.current.surface)
                .shadow(color: .black.opacity(0.12), radius: 10, x: 0, y: 4)
        )
    }
}

// MARK: - Editor d'etiquetes

struct TagEditor: View {
    @Binding var tags: [String]
    let theme: SutsumuTheme
    @State private var newTag = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            if !tags.isEmpty {
                FlowLayout(spacing: 6) {
                    ForEach(tags, id: \.self) { tag in
                        HStack(spacing: 4) {
                            Text(tag)
                                .font(.caption.weight(.medium))
                            Button {
                                tags.removeAll { $0 == tag }
                            } label: {
                                Image(systemName: "xmark")
                                    .font(.system(size: 9, weight: .bold))
                            }
                        }
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(theme.accent.opacity(0.12))
                        .foregroundStyle(theme.accent)
                        .clipShape(Capsule())
                    }
                }
            }

            HStack(spacing: 8) {
                TextField("Afegir etiqueta", text: $newTag)
                    .font(.caption)
                    .submitLabel(.done)
                    .onSubmit { addTag() }
                    .sutsumuField(theme: theme)

                Button("Afegir") { addTag() }
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(theme.accent)
                    .disabled(newTag.trimmingCharacters(in: .whitespaces).isEmpty)
            }
        }
    }

    private func addTag() {
        let trimmed = newTag.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty && !tags.contains(trimmed) else { return }
        tags.append(trimmed)
        newTag = ""
    }
}

// MARK: - Layout de flux per etiquetes

struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        layout(in: proposal.width ?? 0, subviews: subviews).size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = layout(in: bounds.width, subviews: subviews)
        for (index, frame) in result.frames.enumerated() {
            subviews[index].place(at: CGPoint(x: bounds.minX + frame.minX, y: bounds.minY + frame.minY), proposal: .unspecified)
        }
    }

    private func layout(in width: CGFloat, subviews: Subviews) -> (size: CGSize, frames: [CGRect]) {
        var frames: [CGRect] = []
        var x: CGFloat = 0
        var y: CGFloat = 0
        var rowHeight: CGFloat = 0

        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if x + size.width > width && x > 0 {
                x = 0
                y += rowHeight + spacing
                rowHeight = 0
            }
            frames.append(CGRect(origin: CGPoint(x: x, y: y), size: size))
            x += size.width + spacing
            rowHeight = max(rowHeight, size.height)
        }

        return (CGSize(width: width, height: y + rowHeight), frames)
    }
}

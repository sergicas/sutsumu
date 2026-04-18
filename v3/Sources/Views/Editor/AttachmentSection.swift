import SwiftUI
import UniformTypeIdentifiers
import QuickLook
#if !targetEnvironment(macCatalyst)
import PhotosUI
#endif

// MARK: - AttachmentSection

struct AttachmentSection: View {
    @EnvironmentObject var attachmentService: AttachmentService
    @EnvironmentObject var workspaceService: WorkspaceService
    @EnvironmentObject var themeEngine: ThemeEngine
    @Binding var document: SutsumuDocument

    @State private var showingFilePicker = false
    @State private var previewURL: URL? = nil
    @State private var isLoadingPreview = false
#if !targetEnvironment(macCatalyst)
    @State private var showingPhotoPicker = false
    @State private var selectedPhotos: [PhotosPickerItem] = []
#endif

    private static let allowedTypes: [UTType] = {
        #if targetEnvironment(macCatalyst)
        // A Mac Catalyst, .item cobreix tots els fitxers del sistema
        return [.item]
        #else
        var types: [UTType] = [.pdf, .data, .image]
        if let docx = UTType("com.microsoft.word.doc") { types.insert(docx, at: 1) }
        return types
        #endif
    }()

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            header

            if !document.attachments.isEmpty {
                ForEach(document.attachments) { attachment in
                    AttachmentRowView(
                        attachment: attachment,
                        onTap: { openAttachment(attachment) },
                        onDelete: {
                            Task {
                                await attachmentService.removeAttachment(attachment, from: document)
                                refreshDocumentFromWorkspace()
                            }
                        }
                    )
                }
            }

            if attachmentService.isUploading {
                HStack(spacing: 8) {
                    ProgressView()
                        .scaleEffect(0.8)
                    Text("Pujant adjunt...")
                        .font(.caption)
                        .foregroundStyle(themeEngine.current.mutedText)
                }
            }

            if !attachmentService.errorMessage.isEmpty {
                Text(attachmentService.errorMessage)
                    .font(.caption)
                    .foregroundStyle(.red)
            }
        }
        .fileImporter(
            isPresented: $showingFilePicker,
            allowedContentTypes: Self.allowedTypes,
            allowsMultipleSelection: false
        ) { result in
            handleFileImport(result)
        }
#if !targetEnvironment(macCatalyst)
        .photosPicker(
            isPresented: $showingPhotoPicker,
            selection: $selectedPhotos,
            maxSelectionCount: 1,
            matching: .images
        )
        .onChange(of: selectedPhotos) { _, items in
            Task { await handlePhotoSelection(items) }
        }
#endif
        .quickLookPreview($previewURL)
    }

    // MARK: - Header

    private var header: some View {
        HStack {
            Text("Adjunts")
                .font(.caption.weight(.semibold))
                .foregroundStyle(themeEngine.current.mutedText)
            Spacer()
#if targetEnvironment(macCatalyst)
            // A Mac Catalyst només hi ha l'opció de fitxer; usem un Button directe
            // perquè Menu d'un sol ítem pot no respondre correctament a Catalyst.
            Button {
                showingFilePicker = true
            } label: {
                Image(systemName: "plus.circle.fill")
                    .font(.title3)
                    .foregroundStyle(themeEngine.current.accent)
            }
#else
            Menu {
                Button {
                    showingPhotoPicker = true
                } label: {
                    Label("Foto o imatge", systemImage: "photo")
                }
                Button {
                    showingFilePicker = true
                } label: {
                    Label("Fitxer (PDF, DOCX…)", systemImage: "doc")
                }
            } label: {
                Image(systemName: "plus.circle.fill")
                    .font(.title3)
                    .foregroundStyle(themeEngine.current.accent)
            }
#endif
        }
    }

    // MARK: - Accions

    private func openAttachment(_ attachment: SutsumuAttachment) {
        // Previsualització interna amb QuickLook (iOS, iPadOS i Mac Catalyst).
        // No obrim apps externes per evitar que una app trencada (p. ex. Word)
        // faci que la previsualització falli.
        attachmentService.errorMessage = ""
        if attachmentService.isCached(attachment) {
            previewURL = attachmentService.cachedURL(for: attachment)
            return
        }
        isLoadingPreview = true
        Task {
            do {
                let url = try await attachmentService.localURL(for: attachment)
                previewURL = url
            } catch {
                attachmentService.errorMessage = "No s'ha pogut obrir: \(error.localizedDescription)"
            }
            isLoadingPreview = false
        }
    }

    private func handleFileImport(_ result: Result<[URL], Error>) {
        switch result {
        case .success(let urls):
            guard let url = urls.first else { return }
            // startAccessingSecurityScopedResource pot retornar false en Mac Catalyst
            // per URLs del fileImporter (que ja tenen accés directe), per tant no
            // fem servir guard: intentem llegir el fitxer en qualsevol cas.
            let accessed = url.startAccessingSecurityScopedResource()
            defer { if accessed { url.stopAccessingSecurityScopedResource() } }
            do {
                let data = try Data(contentsOf: url)
                let mimeType = UTType(filenameExtension: url.pathExtension)?.preferredMIMEType
                    ?? "application/octet-stream"
                let filename = url.lastPathComponent
                Task {
                    await attachmentService.addAttachment(
                        data: data,
                        filename: filename,
                        mimeType: mimeType,
                        to: document
                    )
                    refreshDocumentFromWorkspace()
                }
            } catch {
                attachmentService.errorMessage = "Error llegint el fitxer: \(error.localizedDescription)"
            }
        case .failure(let error):
            attachmentService.errorMessage = error.localizedDescription
        }
    }

    /// Recarrega el `document` amb la versió actualitzada del `WorkspaceService`.
    /// Necessari després d'afegir/eliminar adjunts perquè la vista pare (Editor)
    /// no perdi els canvis quan desa el draft.
    private func refreshDocumentFromWorkspace() {
        if let fresh = workspaceService.workspace.documents.first(where: { $0.id == document.id }) {
            document = fresh
        }
    }

#if !targetEnvironment(macCatalyst)
    private func handlePhotoSelection(_ items: [PhotosPickerItem]) async {
        guard let item = items.first else { return }
        let data: Data
        do {
            guard let loaded = try await item.loadTransferable(type: Data.self) else {
                attachmentService.errorMessage = "No s'ha pogut llegir la foto. Si és a iCloud, descarrega-la abans."
                selectedPhotos = []
                return
            }
            data = loaded
        } catch {
            attachmentService.errorMessage = "Error carregant la foto: \(error.localizedDescription)"
            selectedPhotos = []
            return
        }
        let filename = (item.itemIdentifier ?? UUID().uuidString) + ".jpg"
        await attachmentService.addAttachment(
            data: data,
            filename: filename,
            mimeType: "image/jpeg",
            to: document
        )
        refreshDocumentFromWorkspace()
        selectedPhotos = []
    }
#endif
}

// MARK: - AttachmentRowView

struct AttachmentRowView: View {
    @EnvironmentObject var themeEngine: ThemeEngine
    let attachment: SutsumuAttachment
    let onTap: () -> Void
    let onDelete: () -> Void

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: attachment.sfSymbol)
                .font(.title3)
                .foregroundStyle(iconColor)
                .frame(width: 36, height: 36)
                .background(iconColor.opacity(0.12))
                .clipShape(RoundedRectangle(cornerRadius: 8))

            VStack(alignment: .leading, spacing: 2) {
                Text(attachment.filename)
                    .font(.caption.weight(.medium))
                    .foregroundStyle(themeEngine.current.ink)
                    .lineLimit(1)
                Text(attachment.displaySize)
                    .font(.caption2)
                    .foregroundStyle(themeEngine.current.mutedText)
            }

            Spacer()

            Button(action: onDelete) {
                Image(systemName: "trash")
                    .font(.caption)
                    .foregroundStyle(.red.opacity(0.8))
            }
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .background(themeEngine.current.surfaceSecondary)
        .clipShape(RoundedRectangle(cornerRadius: 10))
        .contentShape(Rectangle())
        .onTapGesture(perform: onTap)
    }

    private var iconColor: Color {
        if attachment.isPDF   { return .red }
        if attachment.isDOCX  { return .blue }
        if attachment.isImage { return .purple }
        return .gray
    }
}

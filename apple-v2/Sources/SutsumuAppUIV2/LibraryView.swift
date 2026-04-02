import SwiftUI
import UniformTypeIdentifiers
#if canImport(SutsumuCoreV2)
import SutsumuCoreV2
#endif

// MARK: - Library (Biblioteca)
// Únicament la llista de carpetes i documents.
// Tocar un element → pantalla d'edició completa (push).

struct LibraryView: View {
    @ObservedObject var appState: AppState
    @Binding var isImportingAttachment: Bool
    /// Quan s'usa en un split view de Mac, es passa un binding extern.
    /// En mode iPhone no s'usa (nil) i la navegació és interna (push).
    var externalSelection: Binding<String?>? = nil

    // Navegació interna (iPhone)
    @State private var editorItemId: String? = nil

    var body: some View {
        Group {
            if appState.workspaceOutlineRows.isEmpty {
                emptyState
            } else {
                itemList
            }
        }
        .background(appCanvasBackground.ignoresSafeArea())
        .navigationDestination(item: $editorItemId) { id in
            ItemEditorView(
                itemId: id,
                appState: appState,
                isImportingAttachment: $isImportingAttachment
            )
        }
        .toolbar {
            // Només mostra el + propi de LibraryView en mode iPhone (push).
            // En mode Mac split, el + el gestiona el macSidebarView.
            if externalSelection == nil {
                ToolbarItem(placement: .primaryAction) {
                    Menu {
                        Button {
                            appState.createDocumentFromSelection()
                            selectItem(appState.selectedItemId)
                        } label: {
                            Label("Nou document", systemImage: "square.and.pencil")
                        }

                        Button {
                            appState.createFolderFromSelection()
                            selectItem(appState.selectedItemId)
                        } label: {
                            Label("Nova carpeta", systemImage: "folder.badge.plus")
                        }
                    } label: {
                        Image(systemName: "plus")
                            .font(.title3.weight(.semibold))
                    }
                }
            }
        }
    }

    private func selectItem(_ id: String?) {
        if let ext = externalSelection {
            ext.wrappedValue = id
        } else {
            editorItemId = id
        }
    }

    // MARK: - Llista

    private var itemList: some View {
        ScrollView {
            LazyVStack(spacing: 0) {
                ForEach(appState.workspaceOutlineRows) { row in
                    itemRow(row)
                }
            }
            .background(Color.white)
            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .stroke(Color(red: 0.82, green: 0.76, blue: 0.67), lineWidth: 0.5)
            )
            .shadow(color: Color(red: 0.60, green: 0.48, blue: 0.33).opacity(0.14), radius: 4, x: 0, y: 2)
            .padding(16)
        }
    }

    private func itemRow(_ row: SutsumuWorkspaceOutlineRow) -> some View {
        let itemColor = row.type == .folder ? bentoPrimary : bentoBlue
        return Button {
            appState.selectItem(id: row.id)
            selectItem(row.id)
        } label: {
            HStack(spacing: 13) {
                // Icona sòlida estil Bento
                ZStack {
                    RoundedRectangle(cornerRadius: 9, style: .continuous)
                        .fill(itemColor)
                        .frame(width: 36, height: 36)
                    Image(systemName: row.type == .folder ? "folder.fill" : "doc.text.fill")
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundStyle(.white)
                }

                VStack(alignment: .leading, spacing: 2) {
                    Text(row.title)
                        .font(.callout.weight(.semibold))
                        .foregroundStyle(Color(red: 0.17, green: 0.12, blue: 0.06))
                        .lineLimit(1)
                    Text(row.type == .folder ? "Carpeta" : "Document")
                        .font(.caption)
                        .foregroundStyle(Color(red: 0.55, green: 0.47, blue: 0.37))
                }
                .padding(.leading, CGFloat(row.depth) * 16)

                Spacer(minLength: 0)

                Image(systemName: "chevron.right")
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundStyle(Color(red: 0.70, green: 0.62, blue: 0.50))
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 11)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color.white)
            .overlay(
                Divider()
                    .background(Color(red: 0.90, green: 0.85, blue: 0.77)),
                alignment: .bottom
            )
        }
        .buttonStyle(.plain)
    }

    // MARK: - Estat buit

    private var emptyState: some View {
        VStack(spacing: 24) {
            Spacer()

            Image(systemName: "tray.2.fill")
                .font(.system(size: 52))
                .foregroundStyle(bentoPrimary.opacity(0.45))

            VStack(spacing: 8) {
                Text("Cap document")
                    .font(.title3.weight(.bold))
                    .foregroundStyle(Color(red: 0.17, green: 0.12, blue: 0.06))
                Text("Crea el primer document o carpeta\nper organitzar el teu espai.")
                    .font(.callout)
                    .foregroundStyle(Color(red: 0.48, green: 0.40, blue: 0.30))
                    .multilineTextAlignment(.center)
            }

            VStack(spacing: 10) {
                Button {
                    appState.createDocumentFromSelection()
                    selectItem(appState.selectedItemId)
                } label: {
                    Label("Nou document", systemImage: "square.and.pencil")
                        .frame(maxWidth: 260)
                }
                .buttonStyle(SutsumuProminentButtonStyle())

                Button {
                    appState.createFolderFromSelection()
                    selectItem(appState.selectedItemId)
                } label: {
                    Label("Nova carpeta", systemImage: "folder.badge.plus")
                        .frame(maxWidth: 260)
                }
                .buttonStyle(SutsumuSoftButtonStyle())
            }

            Spacer()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(32)
    }
}

// MARK: - Item Editor
// Pantalla independent per editar un document o carpeta.
// S'arriba aquí fent tap a qualsevol element de la llista.

struct ItemEditorView: View {
    let itemId: String
    @ObservedObject var appState: AppState
    @Binding var isImportingAttachment: Bool
    /// Quan és nil, el botó Guardar fa dismiss (iPhone).
    /// Quan és un binding (Mac), el botó Guardar desa sense tancar cap pantalla.
    var externalSelection: Binding<String?>? = nil
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                if let item = appState.selectedItem {
                    coreFieldsSection(item)
                    if !item.isFolder {
                        contentSection
                        attachmentSection
                    }
                    if appState.selectedItemConflictHeadline != nil {
                        conflictSection
                    }
                    deleteSection
                }
            }
            .padding(16)
        }
        .background(appCanvasBackground.ignoresSafeArea())
        .navigationTitle(appState.editorTitle.isEmpty ? "Element" : appState.editorTitle)
        .sutsumuInlineNavigationTitle()
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Button("Guardar") {
                    appState.applySelectedEdits()
                    if externalSelection == nil { dismiss() }
                }
                .fontWeight(.bold)
                .disabled(!appState.canApplySelectedEdits)
            }
        }
        .onAppear {
            appState.selectItem(id: itemId)
        }
    }

    // MARK: - Camps principals

    private func coreFieldsSection(_ item: SutsumuWorkspaceItem) -> some View {
        VStack(alignment: .leading, spacing: 1) {
            editorField {
                TextField("Títol", text: $appState.editorTitle)
                    .font(.callout.weight(.semibold))
            }
            if item.isFolder {
                editorField {
                    TextField("Descripció (opcional)", text: $appState.editorDescription)
                        .font(.callout)
                }
            } else {
                editorField {
                    TextField("Categoria (opcional)", text: $appState.editorCategory)
                        .font(.callout)
                }
            }
            editorField {
                TextField("Etiquetes separades per comes", text: $appState.editorTagsText)
                    .font(.callout)
            }
            editorField {
                HStack(spacing: 0) {
                    Toggle(isOn: $appState.editorIsFavorite) {
                        Label("Favorit", systemImage: "star")
                    }
                    .font(.callout)
                    Spacer()
                    Divider().frame(height: 22).padding(.horizontal, 12)
                    Toggle(isOn: $appState.editorIsPinned) {
                        Label("Fixat", systemImage: "pin")
                    }
                    .font(.callout)
                }
            }
        }
        .background(Color.white)
        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .stroke(Color(red: 0.82, green: 0.76, blue: 0.67), lineWidth: 0.5)
        )
        .shadow(color: Color(red: 0.60, green: 0.48, blue: 0.33).opacity(0.12), radius: 4, x: 0, y: 2)
    }

    // MARK: - Contingut (documents)

    private var contentSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            sectionLabel("Contingut")
            ZStack(alignment: .topLeading) {
                TextEditor(text: $appState.editorContent)
                    .frame(minHeight: 200)
                    .font(.body)
                    .scrollContentBackground(.hidden)
                    .padding(12)
                    .background(Color.white)
                    .clipShape(RoundedRectangle(cornerRadius: 14))
                    .overlay(
                        RoundedRectangle(cornerRadius: 14)
                            .stroke(Color(red: 0.82, green: 0.76, blue: 0.67), lineWidth: 0.5)
                    )
                    .shadow(color: Color(red: 0.60, green: 0.48, blue: 0.33).opacity(0.10), radius: 4, x: 0, y: 2)
                if appState.editorContent.isEmpty {
                    Text("Escriu el contingut del document…")
                        .foregroundStyle(Color(red: 0.68, green: 0.60, blue: 0.50))
                        .padding(.horizontal, 17)
                        .padding(.vertical, 20)
                        .allowsHitTesting(false)
                }
            }
        }
    }

    // MARK: - Adjunt

    private var attachmentSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            sectionLabel("Arxiu adjunt")
            VStack(alignment: .leading, spacing: 12) {
                // Nom de l'arxiu o missatge buit
                if let attachment = appState.selectedAttachment {
                    HStack(spacing: 10) {
                        Image(systemName: "paperclip")
                            .foregroundStyle(bentoPrimary)
                        Text(attachment.fileName)
                            .font(.callout.weight(.semibold))
                            .foregroundStyle(Color(red: 0.17, green: 0.12, blue: 0.06))
                        Spacer()
                        statChip(attachment.availability, tint: bentoGreen)
                    }
                } else {
                    HStack(spacing: 8) {
                        Image(systemName: "paperclip")
                            .foregroundStyle(Color(red: 0.65, green: 0.57, blue: 0.46))
                        Text("Cap arxiu adjunt")
                            .font(.callout)
                            .foregroundStyle(Color(red: 0.65, green: 0.57, blue: 0.46))
                    }
                }

                // Previsualització
                if let imageData = appState.selectedAttachmentImagePreviewData,
                   let img = platformImage(from: imageData) {
                    Image(platformImage: img)
                        .resizable()
                        .scaledToFit()
                        .frame(maxHeight: 180)
                        .clipShape(RoundedRectangle(cornerRadius: 10))
                } else if let preview = appState.selectedAttachmentPreviewText {
                    ScrollView {
                        Text(preview)
                            .font(.system(.caption, design: .monospaced))
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .textSelection(.enabled)
                    }
                    .frame(maxHeight: 120)
                    .padding(10)
                    .background(editorBackgroundColor, in: RoundedRectangle(cornerRadius: 8))
                }

                // Accions
                HStack(spacing: 8) {
                    Button(appState.selectedAttachment == nil ? "Afegir arxiu" : "Canviar arxiu") {
                        isImportingAttachment = true
                    }
                    .buttonStyle(SutsumuSoftButtonStyle())
                    .disabled(!appState.canAttachSelectedDocument)

                    if appState.canDownloadSelectedAttachment {
                        Button("Descarregar") {
                            Task { @MainActor in await appState.downloadSelectedAttachment() }
                        }
                        .buttonStyle(SutsumuOutlineButtonStyle())
                    }

                    if let url = appState.selectedDownloadedAttachmentURL {
                        ShareLink("Compartir", item: url)
                            .font(.callout.weight(.semibold))
                            .padding(.horizontal, 18).padding(.vertical, 11)
                            .foregroundStyle(bentoBlue)
                            .background(bentoBlue.opacity(0.10), in: RoundedRectangle(cornerRadius: 10))
                    }

                    if appState.canRemoveSelectedAttachment {
                        Button("Treure") { appState.removeSelectedAttachment() }
                            .buttonStyle(SutsumuOutlineButtonStyle(tint: .red))
                    }
                }
            }
            .padding(14)
            .background(Color.white)
            .clipShape(RoundedRectangle(cornerRadius: 14))
            .overlay(
                RoundedRectangle(cornerRadius: 14)
                    .stroke(Color(red: 0.82, green: 0.76, blue: 0.67), lineWidth: 0.5)
            )
            .shadow(color: Color(red: 0.60, green: 0.48, blue: 0.33).opacity(0.10), radius: 4, x: 0, y: 2)
        }
    }

    // MARK: - Conflicte

    private var conflictSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 8) {
                Image(systemName: "exclamationmark.triangle.fill")
                    .foregroundStyle(.orange)
                Text("Dues versions del mateix element")
                    .font(.callout.weight(.bold))
            }
            Text("La teva versió i la del núvol no coincideixen. Tria quina vols conservar.")
                .font(.callout)
                .foregroundStyle(Color(red: 0.48, green: 0.40, blue: 0.30))

            HStack(spacing: 10) {
                VStack(alignment: .leading, spacing: 3) {
                    Text("La teva versió").font(.caption.weight(.bold))
                    Text(appState.selectedLocalItemSummaryForConflict).font(.caption).foregroundStyle(.secondary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(10)
                .background(bentoGreen.opacity(0.08), in: RoundedRectangle(cornerRadius: 8))

                VStack(alignment: .leading, spacing: 3) {
                    Text("Versió al núvol").font(.caption.weight(.bold))
                    Text(appState.selectedRemoteItemSummaryForConflict).font(.caption).foregroundStyle(.secondary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(10)
                .background(bentoBlue.opacity(0.08), in: RoundedRectangle(cornerRadius: 8))
            }

            HStack(spacing: 10) {
                Button("Conservar la meva") {
                    appState.keepLocalSelectedItemAndResolveConflict()
                }
                .buttonStyle(SutsumuProminentButtonStyle())

                Button("Usar la del núvol") {
                    appState.applyRemoteSelectedItem()
                }
                .buttonStyle(SutsumuOutlineButtonStyle())
            }
        }
        .padding(14)
        .background(Color.orange.opacity(0.07))
        .clipShape(RoundedRectangle(cornerRadius: 14))
        .overlay(
            RoundedRectangle(cornerRadius: 14)
                .stroke(Color.orange.opacity(0.25), lineWidth: 1)
        )
    }

    // MARK: - Eliminar

    private var deleteSection: some View {
        Button(role: .destructive) {
            appState.deleteSelectedItem()
            if externalSelection != nil {
                externalSelection?.wrappedValue = nil
            } else {
                dismiss()
            }
        } label: {
            Label("Eliminar element", systemImage: "trash")
                .frame(maxWidth: .infinity)
        }
        .buttonStyle(SutsumuOutlineButtonStyle(tint: .red))
    }

    // MARK: - Helpers visuals

    private func editorField<Content: View>(@ViewBuilder content: () -> Content) -> some View {
        VStack(spacing: 0) {
            content()
                .padding(.horizontal, 16)
                .padding(.vertical, 13)
                .frame(maxWidth: .infinity, alignment: .leading)
            Divider()
                .background(Color(red: 0.90, green: 0.85, blue: 0.77))
        }
    }

    private func sectionLabel(_ text: String) -> some View {
        Text(text)
            .font(.system(size: 11, weight: .bold))
            .foregroundStyle(Color(red: 0.55, green: 0.47, blue: 0.37))
            .textCase(.uppercase)
            .tracking(0.8)
            .padding(.horizontal, 4)
    }
}

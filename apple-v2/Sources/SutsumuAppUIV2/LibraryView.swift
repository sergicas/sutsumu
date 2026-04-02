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
    // Drag-and-drop
    @State private var dropTargetId: String? = nil

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
            LazyVStack(spacing: 10) {
                ForEach(appState.workspaceOutlineRows) { row in
                    itemRow(row)
                }
            }
            .padding(16)
        }
    }

    private func itemRow(_ row: SutsumuWorkspaceOutlineRow) -> some View {
        let itemColor = row.type == .folder ? bentoPrimary : bentoBlue
        let isSelected = appState.selectedItemId == row.id
        let isDropTarget = dropTargetId == row.id
        return Button {
            appState.selectItem(id: row.id)
            selectItem(row.id)
        } label: {
            HStack(spacing: 13) {
                // Depth indent with connecting line
                if row.depth > 0 {
                    HStack(spacing: 0) {
                        ForEach(0..<row.depth, id: \.self) { _ in
                            Rectangle()
                                .fill(sutsumuBorder.opacity(0.5))
                                .frame(width: 1)
                                .padding(.horizontal, 6)
                        }
                    }
                    .frame(height: 44)
                }

                ZStack {
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .fill(
                            LinearGradient(
                                colors: [itemColor, itemColor.opacity(0.75)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .frame(width: 40, height: 40)
                    Image(systemName: row.type == .folder ? "folder.fill" : "doc.text.fill")
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundStyle(.white)
                    if isDropTarget {
                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .stroke(.white.opacity(0.7), lineWidth: 2)
                            .frame(width: 40, height: 40)
                    }
                }

                VStack(alignment: .leading, spacing: 2) {
                    HStack(spacing: 5) {
                        Text(row.title)
                            .font(.callout.weight(.semibold))
                            .foregroundStyle(sutsumuInk)
                            .lineLimit(1)
                        if row.isPinned {
                            Image(systemName: "pin.fill")
                                .font(.system(size: 9, weight: .bold))
                                .foregroundStyle(itemColor.opacity(0.7))
                        }
                        if row.isFavorite {
                            Image(systemName: "star.fill")
                                .font(.system(size: 9, weight: .bold))
                                .foregroundStyle(bentoPrimary)
                        }
                    }
                    if isDropTarget {
                        Text("Mou aquí")
                            .font(.caption.weight(.medium))
                            .foregroundStyle(itemColor)
                    } else {
                        Text(row.type == .folder ? "Carpeta" : "Document")
                            .font(.caption)
                            .foregroundStyle(sutsumuMutedText)
                    }
                }

                Spacer(minLength: 0)

                Image(systemName: isDropTarget ? "plus.circle.fill" : "chevron.right")
                    .font(.system(size: isDropTarget ? 16 : 11, weight: .semibold))
                    .foregroundStyle(isDropTarget ? itemColor : sutsumuMutedText.opacity(0.8))
                    .animation(.spring(response: 0.2), value: isDropTarget)
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(
                isDropTarget
                    ? itemColor.opacity(0.10)
                    : (isSelected ? itemColor.opacity(0.08) : Color.white.opacity(0.86)),
                in: RoundedRectangle(cornerRadius: 18, style: .continuous)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .stroke(
                        isDropTarget
                            ? itemColor.opacity(0.55)
                            : (isSelected ? itemColor.opacity(0.35) : sutsumuBorder.opacity(0.9)),
                        lineWidth: isDropTarget ? 2 : 1
                    )
            )
            .shadow(color: isDropTarget ? itemColor.opacity(0.15) : Color.black.opacity(0.03), radius: 10, x: 0, y: 4)
            .animation(.spring(response: 0.25, dampingFraction: 0.8), value: isDropTarget)
        }
        .buttonStyle(.plain)
        .draggable(row.id) {
            // Compact drag preview
            HStack(spacing: 10) {
                Image(systemName: row.type == .folder ? "folder.fill" : "doc.text.fill")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(.white)
                    .padding(9)
                    .background(itemColor, in: RoundedRectangle(cornerRadius: 10))
                Text(row.title)
                    .font(.callout.weight(.semibold))
                    .foregroundStyle(sutsumuInk)
                    .lineLimit(1)
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 10)
            .background(Color.white, in: RoundedRectangle(cornerRadius: 14))
            .shadow(color: Color.black.opacity(0.15), radius: 10, x: 0, y: 5)
        }
        .dropDestination(for: String.self) { ids, _ in
            guard row.type == .folder, let id = ids.first, id != row.id else { return false }
            appState.moveItem(id: id, toParentId: row.id)
            return true
        } isTargeted: { targeted in
            if row.type == .folder {
                if targeted {
                    dropTargetId = row.id
                } else if dropTargetId == row.id {
                    dropTargetId = nil
                }
            }
        }
    }

    // MARK: - Estat buit

    private var emptyState: some View {
        VStack {
            Spacer()

            sutsumuSurfacePanel(tint: bentoPrimary) {
                VStack(spacing: 24) {
                    Image(systemName: "tray.2.fill")
                        .font(.system(size: 52))
                        .foregroundStyle(bentoPrimary.opacity(0.70))

                    VStack(spacing: 8) {
                        Text("Cap document")
                            .font(.system(.title2, design: .serif).weight(.bold))
                            .foregroundStyle(sutsumuInk)
                        Text("Crea el primer document o carpeta per començar amb una biblioteca neta i ben organitzada.")
                            .font(.callout)
                            .foregroundStyle(sutsumuMutedText)
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
                }
                .frame(maxWidth: 420)
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
        sutsumuCard("Dades bàsiques", tint: item.isFolder ? bentoPrimary : bentoBlue) {
            VStack(alignment: .leading, spacing: 12) {
                editorField(label: "Títol") {
                    TextField("Títol", text: $appState.editorTitle)
                        .font(.callout.weight(.semibold))
                        .foregroundStyle(sutsumuInk)
                }
                if item.isFolder {
                    editorField(label: "Descripció") {
                        TextField("Descripció opcional", text: $appState.editorDescription)
                            .font(.callout)
                            .foregroundStyle(sutsumuInk)
                    }
                } else {
                    editorField(label: "Categoria") {
                        TextField("Categoria opcional", text: $appState.editorCategory)
                            .font(.callout)
                            .foregroundStyle(sutsumuInk)
                    }
                }
                locationField(item)
                editorField(label: "Etiquetes") {
                    TextField("Separades per comes", text: $appState.editorTagsText)
                        .font(.callout)
                        .foregroundStyle(sutsumuInk)
                }
                editorField(label: "Opcions") {
                    HStack(spacing: 14) {
                        Toggle(isOn: $appState.editorIsFavorite) {
                            Label("Favorit", systemImage: "star")
                        }
                        .font(.callout)
                        .tint(bentoPrimary)

                        Divider()
                            .frame(height: 24)

                        Toggle(isOn: $appState.editorIsPinned) {
                            Label("Fixat", systemImage: "pin")
                        }
                        .font(.callout)
                        .tint(bentoBlue)
                    }
                    .foregroundStyle(sutsumuInk)
                }
            }
        }
    }

    private func locationField(_ item: SutsumuWorkspaceItem) -> some View {
        let destinations = appState.availableFolderDestinations(excludingId: item.id)
        let currentName: String = {
            if appState.editorParentId == "root" { return "Arrel" }
            return destinations.first { $0.id == appState.editorParentId }?.title ?? "Arrel"
        }()
        let currentIsRoot = appState.editorParentId == "root"
        return editorField(label: "Ubicació") {
            Menu {
                ForEach(destinations, id: \.id) { dest in
                    Button {
                        appState.editorParentId = dest.id
                    } label: {
                        let depthPrefix = dest.depth > 0 ? String(repeating: "    ", count: dest.depth) : ""
                        Label(
                            depthPrefix + dest.title,
                            systemImage: dest.id == "root" ? "house.fill" : "folder.fill"
                        )
                    }
                }
            } label: {
                HStack {
                    Image(systemName: currentIsRoot ? "house" : "folder")
                        .foregroundStyle(bentoPrimary)
                        .frame(width: 18)
                    Text(currentName)
                        .font(.callout)
                        .foregroundStyle(sutsumuInk)
                    Spacer()
                    Image(systemName: "chevron.up.chevron.down")
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundStyle(sutsumuMutedText)
                }
            }
        }
    }

    // MARK: - Contingut (documents)

    private var contentSection: some View {
        sutsumuCard("Contingut", tint: bentoBlue) {
            ZStack(alignment: .topLeading) {
                TextEditor(text: $appState.editorContent)
                    .frame(minHeight: 200)
                    .font(.system(.body, design: .rounded))
                    .scrollContentBackground(.hidden)
                    .padding(12)
                    .background(sutsumuSoftSurface)
                    .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                    .overlay(
                        RoundedRectangle(cornerRadius: 18, style: .continuous)
                            .stroke(sutsumuBorder.opacity(0.9), lineWidth: 1)
                    )
                    .shadow(color: Color.black.opacity(0.03), radius: 8, x: 0, y: 4)
                if appState.editorContent.isEmpty {
                    Text("Escriu el contingut del document…")
                        .foregroundStyle(sutsumuMutedText)
                        .padding(.horizontal, 17)
                        .padding(.vertical, 20)
                        .allowsHitTesting(false)
                }
            }
        }
    }

    // MARK: - Adjunt

    private var attachmentSection: some View {
        sutsumuCard("Arxiu adjunt", tint: bentoGreen) {
            VStack(alignment: .leading, spacing: 12) {
                if let attachment = appState.selectedAttachment {
                    HStack(spacing: 10) {
                        Image(systemName: "paperclip")
                            .foregroundStyle(bentoGreen)
                        Text(attachment.fileName)
                            .font(.callout.weight(.semibold))
                            .foregroundStyle(sutsumuInk)
                        Spacer()
                        statChip(attachment.availability, tint: bentoGreen)
                    }
                } else {
                    HStack(spacing: 8) {
                        Image(systemName: "paperclip")
                            .foregroundStyle(sutsumuMutedText)
                        Text("Cap arxiu adjunt")
                            .font(.callout)
                            .foregroundStyle(sutsumuMutedText)
                    }
                }

                if let imageData = appState.selectedAttachmentImagePreviewData,
                   let img = platformImage(from: imageData) {
                    Image(platformImage: img)
                        .resizable()
                        .scaledToFit()
                        .frame(maxHeight: 180)
                        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                } else if let preview = appState.selectedAttachmentPreviewText {
                    ScrollView {
                        Text(preview)
                            .font(.system(.caption, design: .monospaced))
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .textSelection(.enabled)
                    }
                    .frame(maxHeight: 120)
                    .padding(10)
                    .background(editorBackgroundColor, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
                }

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
                            .padding(.horizontal, 18)
                            .padding(.vertical, 11)
                            .foregroundStyle(bentoBlue)
                            .background(bentoBlue.opacity(0.10), in: RoundedRectangle(cornerRadius: 16, style: .continuous))
                    }

                    if appState.canRemoveSelectedAttachment {
                        Button("Treure") { appState.removeSelectedAttachment() }
                            .buttonStyle(SutsumuOutlineButtonStyle(tint: .red))
                    }
                }
            }
        }
    }

    // MARK: - Conflicte

    private var conflictSection: some View {
        sutsumuCard("Conflicte de sincronització", tint: bentoRed) {
            VStack(alignment: .leading, spacing: 12) {
                sutsumuStatusBanner(
                    "La teva versió i la del núvol no coincideixen. Tria quina vols conservar.",
                    tint: bentoRed,
                    icon: "exclamationmark.triangle.fill"
                )

                HStack(spacing: 10) {
                    conflictSummaryCard(
                        title: "La teva versió",
                        summary: appState.selectedLocalItemSummaryForConflict,
                        tint: bentoGreen
                    )

                    conflictSummaryCard(
                        title: "Versió al núvol",
                        summary: appState.selectedRemoteItemSummaryForConflict,
                        tint: bentoBlue
                    )
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
        }
    }

    // MARK: - Eliminar

    private var deleteSection: some View {
        sutsumuCard("Zona delicada", tint: bentoRed) {
            VStack(alignment: .leading, spacing: 10) {
                Text("Eliminar aquest element el traurà del workspace actiu. Fes-ho només si n'estàs segur.")
                    .font(.callout)
                    .foregroundStyle(sutsumuMutedText)

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
        }
    }

    // MARK: - Helpers visuals

    private func editorField<Content: View>(label: String, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(label)
                .font(.system(size: 11, weight: .bold, design: .rounded))
                .foregroundStyle(sutsumuMutedText)
                .textCase(.uppercase)
                .tracking(0.9)

            content()
                .padding(.horizontal, 16)
                .padding(.vertical, 13)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(sutsumuSoftSurface, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: 18, style: .continuous)
                        .stroke(sutsumuBorder.opacity(0.9), lineWidth: 1)
                )
        }
    }

    private func conflictSummaryCard(title: String, summary: String, tint: Color) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.caption.weight(.bold))
                .foregroundStyle(sutsumuInk)
            Text(summary)
                .font(.caption)
                .foregroundStyle(sutsumuMutedText)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(tint.opacity(0.08), in: RoundedRectangle(cornerRadius: 16, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .stroke(tint.opacity(0.18), lineWidth: 1)
        )
    }
}

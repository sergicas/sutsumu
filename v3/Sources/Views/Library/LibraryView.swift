import SwiftUI

// MARK: - Identificadors per a la navegació

/// Embolcall per poder distingir destinacions de carpeta de destinacions
/// de document a `.navigationDestination(for:)` (ambdues usen String com a id).
struct FolderNavValue: Hashable {
    let id: String
}

/// Representa un element pendent de ser mogut a una altra carpeta.
enum MoveItem: Identifiable, Hashable {
    case document(String)
    case folder(String)

    var id: String {
        switch self {
        case .document(let id), .folder(let id): return id
        }
    }
}

// MARK: - LibraryView (arrel)

struct LibraryView: View {
    @EnvironmentObject var workspaceService: WorkspaceService
    @EnvironmentObject var themeEngine: ThemeEngine

    var body: some View {
        NavigationStack {
            FolderContentView(folder: nil)
                .background(themeEngine.current.background.ignoresSafeArea())
                .searchable(text: $workspaceService.searchText, prompt: "Cercar documents")
                .navigationDestination(for: String.self) { id in
                    if let doc = workspaceService.workspace.documents.first(where: { $0.id == id }) {
                        DocumentEditorView(document: doc)
                    }
                }
                .navigationDestination(for: FolderNavValue.self) { value in
                    if let folder = workspaceService.workspace.activeFolders
                        .first(where: { $0.id == value.id }) {
                        FolderContentView(folder: folder)
                    } else {
                        // Si la carpeta s'ha esborrat mentre estàvem dins,
                        // mostrem la biblioteca arrel per no deixar la vista buida.
                        FolderContentView(folder: nil)
                    }
                }
        }
    }
}

// MARK: - FolderContentView (arrel o subcarpeta)

struct FolderContentView: View {
    @EnvironmentObject var workspaceService: WorkspaceService
    @EnvironmentObject var themeEngine: ThemeEngine

    /// La carpeta actual. `nil` = arrel de la biblioteca.
    let folder: SutsumuFolder?

    // Estats de diàlegs i modals
    @State private var showingNewFolder = false
    @State private var newFolderName = ""
    @State private var folderToRename: SutsumuFolder? = nil
    @State private var renameFolderText = ""
    @State private var colorPickerFolder: SutsumuFolder? = nil
    @State private var colorPickerSnapshot: SutsumuFolder? = nil
    @State private var itemToMove: MoveItem? = nil

    // MARK: - Derivats

    private var currentFolderId: String? { folder?.id }

    private var childFolders: [SutsumuFolder] {
        workspaceService.workspace.activeFolders
            .filter { $0.parentId == currentFolderId }
            .sorted { $0.name.localizedCaseInsensitiveCompare($1.name) == .orderedAscending }
    }

    private var childDocuments: [SutsumuDocument] {
        workspaceService.filteredDocuments
            .filter { $0.parentId == currentFolderId }
    }

    private var isEmpty: Bool {
        childFolders.isEmpty &&
        childDocuments.isEmpty &&
        workspaceService.searchText.isEmpty
    }

    // MARK: - Body

    var body: some View {
        Group {
            if isEmpty {
                emptyState
            } else {
                contentList
            }
        }
        .background(themeEngine.current.background.ignoresSafeArea())
        .navigationTitle(folder?.name ?? "Biblioteca")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Menu {
                    Button {
                        workspaceService.createDocument(in: currentFolderId)
                    } label: {
                        Label("Nou document", systemImage: "doc.text")
                    }
                    Button {
                        newFolderName = ""
                        showingNewFolder = true
                    } label: {
                        Label("Nova carpeta", systemImage: "folder")
                    }
                } label: {
                    Image(systemName: "plus")
                }
            }
        }
        // Diàleg nova carpeta
        .alert("Nova carpeta", isPresented: $showingNewFolder) {
            TextField("Nom de la carpeta", text: $newFolderName)
            Button("Crear") {
                workspaceService.createFolder(named: newFolderName, in: currentFolderId)
            }
            Button("Cancel·lar", role: .cancel) {}
        }
        // Diàleg reanomenar carpeta
        .alert("Reanomenar carpeta", isPresented: Binding(
            get: { folderToRename != nil },
            set: { if !$0 { folderToRename = nil } }
        )) {
            TextField("Nom", text: $renameFolderText)
            Button("Desar") {
                if let folder = folderToRename {
                    workspaceService.renameFolder(folder.id, name: renameFolderText)
                }
                folderToRename = nil
            }
            Button("Cancel·lar", role: .cancel) { folderToRename = nil }
        }
        // Color picker de carpeta
        .sheet(isPresented: Binding(
            get: { colorPickerFolder != nil },
            set: { if !$0 { colorPickerFolder = nil } }
        ), onDismiss: {
            colorPickerSnapshot = nil
        }) {
            if let folder = colorPickerSnapshot ?? colorPickerFolder {
                FolderColorPickerView(
                    currentColor: folder.color,
                    onSelect: { hex in
                        workspaceService.updateFolderColor(folder.id, color: hex)
                        colorPickerFolder = nil
                    },
                    onDismiss: { colorPickerFolder = nil }
                )
            }
        }
        // Selector de carpeta destí per moure
        .sheet(item: $itemToMove) { move in
            MoveTargetPickerView(item: move) {
                itemToMove = nil
            }
        }
    }

    // MARK: - Llista de contingut

    private var contentList: some View {
        List {
            if !childFolders.isEmpty {
                Section("Carpetes") {
                    ForEach(childFolders) { f in
                        NavigationLink(value: FolderNavValue(id: f.id)) {
                            FolderRowView(folder: f)
                        }
                        .listRowBackground(themeEngine.current.surface)
                        .listRowSeparatorTint(themeEngine.current.border)
                        .contextMenu {
                            Button {
                                renameFolderText = f.name
                                folderToRename = f
                            } label: {
                                Label("Reanomenar", systemImage: "pencil")
                            }
                            Button {
                                // Diferim a Mac Catalyst: el menú contextual necessita
                                // acabar de tancar-se abans de presentar el sheet.
                                let captured = f
                                DispatchQueue.main.async {
                                    colorPickerSnapshot = captured
                                    colorPickerFolder = captured
                                }
                            } label: {
                                Label("Color de carpeta", systemImage: "paintpalette")
                            }
                            Button {
                                itemToMove = .folder(f.id)
                            } label: {
                                Label("Moure a...", systemImage: "folder")
                            }
                            Divider()
                            Button(role: .destructive) {
                                workspaceService.deleteFolder(f.id)
                            } label: {
                                Label("Eliminar", systemImage: "trash")
                            }
                        }
                        .swipeActions(edge: .trailing) {
                            Button(role: .destructive) {
                                workspaceService.deleteFolder(f.id)
                            } label: {
                                Label("Eliminar", systemImage: "trash")
                            }
                            Button {
                                itemToMove = .folder(f.id)
                            } label: {
                                Label("Moure", systemImage: "folder")
                            }
                            .tint(.blue)
                        }
                        .swipeActions(edge: .leading) {
                            Button {
                                renameFolderText = f.name
                                folderToRename = f
                            } label: {
                                Label("Reanomenar", systemImage: "pencil")
                            }
                            .tint(.orange)
                        }
                    }
                }
            }

            if !childDocuments.isEmpty {
                Section("Documents") {
                    ForEach(childDocuments) { doc in
                        NavigationLink(value: doc.id) {
                            DocumentRowView(document: doc)
                        }
                        .listRowBackground(themeEngine.current.surface)
                        .listRowSeparatorTint(themeEngine.current.border)
                        .contextMenu {
                            Button {
                                itemToMove = .document(doc.id)
                            } label: {
                                Label("Moure a...", systemImage: "folder")
                            }
                            Divider()
                            Button(role: .destructive) {
                                workspaceService.deleteDocument(doc.id)
                            } label: {
                                Label("Eliminar", systemImage: "trash")
                            }
                        }
                        .swipeActions(edge: .trailing) {
                            Button(role: .destructive) {
                                workspaceService.deleteDocument(doc.id)
                            } label: {
                                Label("Eliminar", systemImage: "trash")
                            }
                            Button {
                                itemToMove = .document(doc.id)
                            } label: {
                                Label("Moure", systemImage: "folder")
                            }
                            .tint(.blue)
                        }
                    }
                }
            }
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
    }

    // MARK: - Estat buit

    private var emptyState: some View {
        VStack(spacing: 20) {
            Spacer()
            Image(systemName: folder == nil ? "tray" : "folder")
                .font(.system(size: 56))
                .foregroundStyle(themeEngine.current.mutedText)
            Text(folder == nil ? "Biblioteca buida" : "Carpeta buida")
                .font(.title3.weight(.semibold))
                .foregroundStyle(themeEngine.current.ink)
            Text("Crea documents o carpetes amb el botó +")
                .font(.callout)
                .foregroundStyle(themeEngine.current.mutedText)
                .multilineTextAlignment(.center)
            Button {
                workspaceService.createDocument(in: currentFolderId)
            } label: {
                Label("Nou document", systemImage: "plus")
            }
            .sutsumuPrimaryButton(theme: themeEngine.current)
            Spacer()
        }
        .padding(32)
    }
}

// MARK: - Fila de carpeta

struct FolderRowView: View {
    @EnvironmentObject var themeEngine: ThemeEngine
    let folder: SutsumuFolder

    private var folderColor: Color {
        Color(hex: folder.color) ?? themeEngine.current.accent
    }

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: "folder.fill")
                .font(.title3)
                .foregroundStyle(folderColor)
                .frame(width: 36, height: 36)
                .background(folderColor.opacity(0.12))
                .clipShape(RoundedRectangle(cornerRadius: 8))

            Text(folder.name.isEmpty ? "Nova carpeta" : folder.name)
                .font(.callout.weight(.semibold))
                .foregroundStyle(themeEngine.current.ink)

            Spacer()
        }
        .padding(.vertical, 4)
    }
}

// MARK: - Color picker de carpeta

private let folderColorPalette: [(hex: String, name: String)] = [
    ("#1E6BE6", "Blau"),
    ("#219A72", "Verd"),
    ("#C7512E", "Taronja"),
    ("#8542BC", "Violeta"),
    ("#D73D57", "Vermell"),
    ("#2490B8", "Turquesa"),
    ("#CC8A0D", "Ocre"),
    ("#567042", "Oliva"),
    ("#AD3380", "Rosa"),
    ("#3D6B99", "Pissarra"),
    ("#996633", "Marró"),
    ("#338A8A", "Verd mar"),
]

struct FolderColorPickerView: View {
    @EnvironmentObject var themeEngine: ThemeEngine
    let currentColor: String
    let onSelect: (String) -> Void
    let onDismiss: () -> Void

    private let columns = Array(repeating: GridItem(.flexible(), spacing: 12), count: 6)

    var body: some View {
        VStack(spacing: 0) {
            Capsule()
                .fill(Color.secondary.opacity(0.3))
                .frame(width: 36, height: 4)
                .padding(.top, 12)
                .padding(.bottom, 18)

            Text("Color de carpeta")
                .font(.headline)
                .foregroundStyle(themeEngine.current.ink)
                .padding(.bottom, 20)

            LazyVGrid(columns: columns, spacing: 14) {
                ForEach(folderColorPalette, id: \.hex) { entry in
                    let isSelected = currentColor.lowercased() == entry.hex.lowercased()
                    Button {
                        onSelect(entry.hex)
                    } label: {
                        ZStack {
                            Circle()
                                .fill(Color(hex: entry.hex) ?? .blue)
                                .frame(width: 44, height: 44)
                                .shadow(color: (Color(hex: entry.hex) ?? .blue).opacity(0.3),
                                        radius: 4, x: 0, y: 2)
                            if isSelected {
                                Circle()
                                    .strokeBorder(.white, lineWidth: 3)
                                    .frame(width: 44, height: 44)
                                Image(systemName: "checkmark")
                                    .font(.system(size: 14, weight: .bold))
                                    .foregroundStyle(.white)
                            }
                        }
                    }
                    .buttonStyle(.plain)
                    .accessibilityLabel(entry.name + (isSelected ? ", seleccionat" : ""))
                }
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 28)

            Button("Cancel·lar") { onDismiss() }
                .font(.subheadline)
                .foregroundStyle(themeEngine.current.mutedText)
                .padding(.bottom, 20)
        }
        .presentationDetents([.height(270)])
        .presentationDragIndicator(.hidden)
        .background(themeEngine.current.surface)
    }
}

// MARK: - Fila de document

struct DocumentRowView: View {
    @EnvironmentObject var themeEngine: ThemeEngine
    let document: SutsumuDocument

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Text(document.title.isEmpty ? "Sense títol" : document.title)
                    .font(.callout.weight(.semibold))
                    .foregroundStyle(themeEngine.current.ink)
                    .lineLimit(1)
                Spacer()
                if document.isPinned {
                    Image(systemName: "pin.fill")
                        .font(.caption2)
                        .foregroundStyle(themeEngine.current.accent)
                }
            }

            if !document.content.isEmpty {
                Text(document.content)
                    .font(.caption)
                    .foregroundStyle(themeEngine.current.mutedText)
                    .lineLimit(2)
            }

            HStack(spacing: 8) {
                Text(document.updatedAt.formatted(date: .abbreviated, time: .omitted))
                    .font(.caption2)
                    .foregroundStyle(themeEngine.current.mutedText)

                if !document.tags.isEmpty {
                    ForEach(document.tags.prefix(2), id: \.self) { tag in
                        Text(tag)
                            .font(.caption2.weight(.medium))
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(themeEngine.current.accent.opacity(0.12))
                            .foregroundStyle(themeEngine.current.accent)
                            .clipShape(Capsule())
                    }
                }
            }
        }
        .padding(.vertical, 4)
    }
}

// MARK: - Selector de carpeta destí (Moure a...)

struct MoveTargetPickerView: View {
    @EnvironmentObject var workspaceService: WorkspaceService
    @EnvironmentObject var themeEngine: ThemeEngine
    let item: MoveItem
    let onClose: () -> Void

    /// Llista plana de carpetes vàlides com a destí, amb la seva profunditat.
    /// Per moure una carpeta excloem la pròpia i totes les seves descendents
    /// per evitar cicles.
    private var flatFolders: [(folder: SutsumuFolder, depth: Int)] {
        let excluded: Set<String>
        switch item {
        case .folder(let id):
            excluded = Set([id]).union(workspaceService.descendants(ofFolder: id))
        case .document:
            excluded = []
        }
        return Self.buildFlatList(
            parent: nil,
            depth: 0,
            all: workspaceService.workspace.activeFolders,
            excluded: excluded
        )
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Button {
                        move(to: nil)
                    } label: {
                        HStack(spacing: 12) {
                            Image(systemName: "tray")
                                .foregroundStyle(themeEngine.current.accent)
                            Text("Arrel (sense carpeta)")
                                .foregroundStyle(themeEngine.current.ink)
                            Spacer()
                        }
                    }
                    .listRowBackground(themeEngine.current.surface)
                }

                if !flatFolders.isEmpty {
                    Section("Carpetes") {
                        ForEach(flatFolders, id: \.folder.id) { entry in
                            Button {
                                move(to: entry.folder.id)
                            } label: {
                                HStack(spacing: 12) {
                                    // Sagnat visual segons profunditat
                                    if entry.depth > 0 {
                                        Spacer().frame(width: CGFloat(entry.depth) * 16)
                                    }
                                    Image(systemName: "folder.fill")
                                        .foregroundStyle(Color(hex: entry.folder.color) ?? themeEngine.current.accent)
                                    Text(entry.folder.name.isEmpty ? "Nova carpeta" : entry.folder.name)
                                        .foregroundStyle(themeEngine.current.ink)
                                    Spacer()
                                }
                            }
                            .listRowBackground(themeEngine.current.surface)
                        }
                    }
                }
            }
            .listStyle(.insetGrouped)
            .scrollContentBackground(.hidden)
            .background(themeEngine.current.background.ignoresSafeArea())
            .navigationTitle("Moure a...")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel·lar") { onClose() }
                }
            }
        }
    }

    private func move(to parentId: String?) {
        switch item {
        case .document(let id):
            workspaceService.moveDocument(id, to: parentId)
        case .folder(let id):
            _ = workspaceService.moveFolder(id, to: parentId)
        }
        onClose()
    }

    /// Recorre l'arbre de carpetes en profunditat i retorna una llista plana
    /// amb la profunditat de cada element.
    private static func buildFlatList(
        parent: String?,
        depth: Int,
        all: [SutsumuFolder],
        excluded: Set<String>
    ) -> [(folder: SutsumuFolder, depth: Int)] {
        var out: [(SutsumuFolder, Int)] = []
        let children = all
            .filter { $0.parentId == parent && !excluded.contains($0.id) }
            .sorted { $0.name.localizedCaseInsensitiveCompare($1.name) == .orderedAscending }
        for child in children {
            out.append((child, depth))
            out.append(contentsOf: buildFlatList(
                parent: child.id,
                depth: depth + 1,
                all: all,
                excluded: excluded
            ))
        }
        return out
    }
}

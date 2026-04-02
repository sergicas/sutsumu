import Foundation

public struct SupabaseEdgeConfiguration: Sendable, Equatable {
    public let projectURL: URL
    public let functionName: String

    public init(projectURL: URL, functionName: String = "sutsumu-sync-v2") {
        self.projectURL = projectURL
        self.functionName = functionName
    }

    public var endpointURL: URL {
        projectURL
            .appending(path: "functions")
            .appending(path: "v1")
            .appending(path: functionName)
    }
}

public struct DeviceDescriptor: Codable, Equatable, Sendable {
    public let localDeviceId: String
    public let label: String
    public let platform: String

    public init(localDeviceId: String, label: String, platform: String) {
        self.localDeviceId = localDeviceId
        self.label = label
        self.platform = platform
    }
}

public struct WorkspaceHead: Codable, Equatable, Sendable {
    public let schema: String
    public let workspaceId: String
    public let workspaceRecordId: String
    public let workspaceName: String
    public let headRevisionId: String
    public let payloadSignature: String
    public let payloadSchema: String
    public let payloadVersion: Int
    public let payloadJson: JSONValue
    public let commitStatus: String
    public let commitMode: String?
    public let operationCount: Int?
    public let clientSavedAt: String
    public let updatedAt: String
}

public struct CommitRequest: Codable, Equatable, Sendable {
    public let schema: String
    public let workspaceId: String
    public let workspaceName: String
    public let expectedHeadRevisionId: String
    public let payloadSchema: String
    public let payloadVersion: Int
    public let payloadSignature: String
    public let clientSavedAt: String
    public let payloadJson: JSONValue?
    public let operations: [SutsumuWorkspaceOperation]
    public let commitMode: String
    public let device: DeviceDescriptor

    public init(
        workspaceId: String,
        workspaceName: String,
        expectedHeadRevisionId: String,
        payloadSchema: String = "sutsumu-workspace-v2",
        payloadVersion: Int = 1,
        payloadSignature: String = "",
        clientSavedAt: String,
        payloadJson: JSONValue? = nil,
        operations: [SutsumuWorkspaceOperation] = [],
        commitMode: String = "snapshot",
        device: DeviceDescriptor
    ) {
        self.schema = "sutsumu-cloud-sync-v2-commit"
        self.workspaceId = workspaceId
        self.workspaceName = workspaceName
        self.expectedHeadRevisionId = expectedHeadRevisionId
        self.payloadSchema = payloadSchema
        self.payloadVersion = payloadVersion
        self.payloadSignature = payloadSignature
        self.clientSavedAt = clientSavedAt
        self.payloadJson = payloadJson
        self.operations = operations
        self.commitMode = commitMode
        self.device = device
    }
}

public struct ConflictResponse: Codable, Equatable, Sendable {
    public let error: String
    public let currentHead: WorkspaceHead?
}

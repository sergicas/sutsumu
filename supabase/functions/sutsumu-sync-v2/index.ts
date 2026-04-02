import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, x-client-info, apikey, content-type",
  "access-control-allow-methods": "GET, POST, OPTIONS",
};

const HEAD_SCHEMA = "sutsumu-cloud-sync-v2-head";
const COMMIT_SCHEMA = "sutsumu-cloud-sync-v2-commit";

type AuthUser = {
  id: string;
  email?: string | null;
};

type DeviceRow = {
  id: string;
  local_device_id: string;
  label: string;
  platform: string;
};

type WorkspaceRow = {
  id: string;
  local_workspace_id: string;
  name: string;
  current_revision_id: string | null;
  updated_at: string;
};

type RevisionRow = {
  id: string;
  workspace_id: string;
  base_revision_id: string | null;
  payload_signature: string;
  payload_schema: string;
  payload_version: number;
  payload_json: unknown;
  commit_status: string;
  commit_mode: string;
  operation_count: number;
  operations_json: unknown;
  client_saved_at: string | null;
  created_at: string;
};

type IncrementalOperation = {
  id?: string;
  kind?: string;
  createdAt?: string;
  item?: Record<string, unknown>;
  itemIds?: string[];
  summary?: string;
};

type AttachmentSummaryEntry = {
  itemId: string;
  title: string;
  fileName: string;
  fileType: string;
  sourceFormat: string;
  checksumSha256: string;
  storagePath: string;
  sizeBytes: number;
  availability: string;
};

function table(supabase: any, name: string) {
  return supabase.from(name) as any;
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "content-type": "application/json; charset=utf-8",
    },
  });
}

function errorResponse(message: string, status = 400, details?: Record<string, unknown>) {
  return jsonResponse({
    error: message,
    ...(details || {}),
  }, status);
}

function readBearerToken(req: Request) {
  const authHeader = req.headers.get("authorization") || "";
  if (!/^bearer\s+/i.test(authHeader)) return "";
  return authHeader.replace(/^bearer\s+/i, "").trim();
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readDateString(value: unknown) {
  const date = readString(value);
  return date && !Number.isNaN(Date.parse(date)) ? date : "";
}

function readObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function readArray(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function readStringArray(value: unknown) {
  const values = readArray(value)
    .map((entry) => readString(entry))
    .filter(Boolean);
  return Array.from(new Set(values));
}

function stableJson(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stableJson);
  }
  if (value && typeof value === "object") {
    const sortedEntries = Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, entryValue]) => [key, stableJson(entryValue)]);
    return Object.fromEntries(sortedEntries);
  }
  return value;
}

async function sha256(input: string) {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return `sha256:${Array.from(new Uint8Array(digest)).map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

async function computePayloadSignature(payload: unknown) {
  return sha256(JSON.stringify(stableJson(payload)));
}

function getEnv(name: string) {
  const value = Deno.env.get(name)?.trim();
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function createAdminClient() {
  return createClient(
    getEnv("SUPABASE_URL"),
    getEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } },
  );
}

async function requireUser(req: Request, supabase: any): Promise<AuthUser> {
  const token = readBearerToken(req);
  if (!token) {
    throw new Response(JSON.stringify({ error: "Missing bearer token." }), {
      status: 401,
      headers: {
        ...corsHeaders,
        "content-type": "application/json; charset=utf-8",
      },
    });
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    throw new Response(JSON.stringify({ error: "Invalid Supabase session." }), {
      status: 401,
      headers: {
        ...corsHeaders,
        "content-type": "application/json; charset=utf-8",
      },
    });
  }

  return {
    id: data.user.id,
    email: data.user.email,
  };
}

async function readWorkspace(supabase: any, userId: string, workspaceId: string) {
  const { data, error } = await table(supabase, "sutsumu_workspaces_v2")
    .select("id,local_workspace_id,name,current_revision_id,updated_at")
    .eq("user_id", userId)
    .eq("local_workspace_id", workspaceId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as WorkspaceRow | null;
}

async function readRevision(supabase: any, revisionId: string) {
  const { data, error } = await table(supabase, "sutsumu_workspace_revisions_v2")
    .select("id,workspace_id,base_revision_id,payload_signature,payload_schema,payload_version,payload_json,commit_status,commit_mode,operation_count,operations_json,client_saved_at,created_at")
    .eq("id", revisionId)
    .single();

  if (error) throw new Error(error.message);
  return data as RevisionRow;
}

function createHeadDescriptor(workspace: WorkspaceRow, revision: RevisionRow | null) {
  return {
    schema: HEAD_SCHEMA,
    workspaceId: workspace.local_workspace_id,
    workspaceRecordId: workspace.id,
    workspaceName: workspace.name,
    headRevisionId: revision?.id || "",
    payloadSignature: revision?.payload_signature || "",
    payloadSchema: revision?.payload_schema || "",
    payloadVersion: revision?.payload_version || 1,
    payloadJson: revision?.payload_json || {},
    commitStatus: revision?.commit_status || "empty",
    commitMode: revision?.commit_mode || "snapshot",
    operationCount: revision?.operation_count || 0,
    clientSavedAt: revision?.client_saved_at || "",
    updatedAt: workspace.updated_at,
  };
}

function normalizeWorkspacePayload(payload: unknown) {
  const root = readObject(payload) || {};
  const docs = readArray(root.docs)
    .map((entry) => readObject(entry))
    .filter((entry): entry is Record<string, unknown> => Boolean(entry))
    .map((entry) => ({ ...entry }));
  const expandedFolders = readStringArray(root.expandedFolders);
  const meta = readObject(root.meta) ? { ...(root.meta as Record<string, unknown>) } : {
    source: "Sutsumu Apple v2",
  };

  return {
    docs,
    expandedFolders,
    meta,
  };
}

function applyIncrementalOperations(basePayload: unknown, operations: IncrementalOperation[]) {
  const workspace = normalizeWorkspacePayload(basePayload);
  const docs = [...workspace.docs];
  const indexById = new Map<string, number>();

  docs.forEach((doc, index) => {
    const id = readString(doc.id);
    if (id) indexById.set(id, index);
  });

  for (const operation of operations) {
    const kind = readString(operation.kind);

    if (kind === "upsert_item") {
      const item = readObject(operation.item);
      const itemId = readString(item?.id);
      if (!item || !itemId) continue;

      const normalizedItem = { ...item };
      const existingIndex = indexById.get(itemId);
      if (existingIndex === undefined) {
        indexById.set(itemId, docs.length);
        docs.push(normalizedItem);
      } else {
        docs[existingIndex] = normalizedItem;
      }
      continue;
    }

    if (kind === "delete_items") {
      const itemIds = readStringArray(operation.itemIds);
      if (!itemIds.length) continue;

      for (const itemId of itemIds) {
        const existingIndex = indexById.get(itemId);
        if (existingIndex === undefined) continue;
        docs[existingIndex] = {
          ...docs[existingIndex],
          isDeleted: true,
        };
      }

      workspace.expandedFolders = workspace.expandedFolders.filter((folderId) => !itemIds.includes(folderId));
    }
  }

  return stableJson({
    docs,
    expandedFolders: workspace.expandedFolders,
    meta: workspace.meta,
  });
}

function readNumber(value: unknown, fallback = 0) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
}

function buildAttachmentSummary(payload: unknown) {
  const workspace = normalizeWorkspacePayload(payload);
  const items = workspace.docs
    .map((doc) => {
      const attachment = readObject(doc.attachment);
      if (!attachment) return null;

      const itemId = readString(doc.id);
      const title = readString(doc.title);
      const checksumSha256 = readString(attachment.checksum);
      const storagePath = readString(attachment.remoteObjectKey);
      const fileName = readString(attachment.fileName);

      if (!itemId || !checksumSha256 || !storagePath || !fileName) {
        return null;
      }

      return {
        itemId,
        title,
        fileName,
        fileType: readString(attachment.fileType),
        sourceFormat: readString(attachment.sourceFormat),
        checksumSha256,
        storagePath,
        sizeBytes: Math.max(0, Math.round(readNumber(attachment.fileSize, 0))),
        availability: readString(attachment.availability) || "uploaded",
      } satisfies AttachmentSummaryEntry;
    })
    .filter((entry): entry is AttachmentSummaryEntry => Boolean(entry));

  return {
    count: items.length,
    uploadedCount: items.filter((entry) => entry.availability.startsWith("uploaded")).length,
    items,
  };
}

async function syncAttachmentObjects(
  supabase: any,
  userId: string,
  workspaceRecordId: string,
  summary: ReturnType<typeof buildAttachmentSummary>,
) {
  if (!summary.items.length) return;

  const rows = summary.items.map((entry) => ({
    user_id: userId,
    workspace_id: workspaceRecordId,
    checksum_sha256: entry.checksumSha256,
    storage_path: entry.storagePath,
    mime_type: entry.fileType || null,
    size_bytes: entry.sizeBytes,
    upload_status: entry.availability.startsWith("uploaded") ? "uploaded" : "pending",
  }));

  const { error } = await table(supabase, "sutsumu_attachment_objects_v2")
    .upsert(rows, {
      onConflict: "user_id,checksum_sha256",
    });

  if (error) {
    console.error("sutsumu-sync-v2 attachment object sync failed", error);
  }
}

async function upsertDevice(
  supabase: any,
  userId: string,
  rawDevice: Record<string, unknown>,
) {
  const localDeviceId = readString(rawDevice.localDeviceId) || crypto.randomUUID();
  const label = readString(rawDevice.label) || "Apple device";
  const platform = readString(rawDevice.platform) || "apple";

  const { data, error } = await table(supabase, "sutsumu_devices_v2")
    .upsert({
      user_id: userId,
      local_device_id: localDeviceId,
      label,
      platform,
      last_seen_at: new Date().toISOString(),
    }, {
      onConflict: "user_id,local_device_id",
    })
    .select("id,local_device_id,label,platform")
    .single();

  if (error || !data) throw new Error(error?.message || "Unable to upsert device.");
  return data as DeviceRow;
}

async function ensureWorkspace(
  supabase: any,
  userId: string,
  localWorkspaceId: string,
  name: string,
) {
  const existing = await readWorkspace(supabase, userId, localWorkspaceId);
  if (existing) return existing;

  const { data, error } = await table(supabase, "sutsumu_workspaces_v2")
    .insert({
      user_id: userId,
      local_workspace_id: localWorkspaceId,
      name,
    })
    .select("id,local_workspace_id,name,current_revision_id,updated_at")
    .single();

  if (error || !data) throw new Error(error?.message || "Unable to create workspace.");
  return data as WorkspaceRow;
}

async function handleReadHead(req: Request, supabase: any, user: AuthUser) {
  const url = new URL(req.url);
  const workspaceId = url.searchParams.get("workspace_id") || url.searchParams.get("local_workspace_id") || "";
  if (!workspaceId.trim()) {
    return errorResponse("Missing workspace_id.", 400);
  }

  const workspace = await readWorkspace(supabase, user.id, workspaceId.trim());
  if (!workspace) {
    return jsonResponse([], 200);
  }

  const revision = workspace.current_revision_id
    ? await readRevision(supabase, workspace.current_revision_id)
    : null;

  return jsonResponse(createHeadDescriptor(workspace, revision), 200);
}

async function handleCommit(req: Request, supabase: any, user: AuthUser) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return errorResponse("Invalid JSON body.", 400);
  }

  const payload = body as Record<string, unknown>;
  if (readString(payload.schema) !== COMMIT_SCHEMA) {
    return errorResponse("Invalid commit schema.", 400);
  }

  const workspaceId = readString(payload.workspaceId);
  const workspaceName = readString(payload.workspaceName) || "Sutsumu Workspace";
  const expectedHeadRevisionId = readString(payload.expectedHeadRevisionId);
  const clientSavedAt = readDateString(payload.clientSavedAt) || null;
  const payloadJson = payload.payloadJson;
  const payloadSchema = readString(payload.payloadSchema) || "sutsumu-workspace-v2";
  const payloadVersion = Number(payload.payloadVersion || 1);
  const providedSignature = readString(payload.payloadSignature);
  const requestedCommitMode = readString(payload.commitMode);
  const operations = readArray(payload.operations)
    .map((entry) => readObject(entry))
    .filter((entry): entry is IncrementalOperation => Boolean(entry));
  const rawDevice = payload.device && typeof payload.device === "object"
    ? payload.device as Record<string, unknown>
    : {};

  if (!workspaceId) {
    return errorResponse("Missing workspaceId.", 400);
  }
  if (payloadJson === undefined && operations.length === 0) {
    return errorResponse("Missing payloadJson or operations.", 400);
  }

  const device = await upsertDevice(supabase, user.id, rawDevice);
  let workspace = await ensureWorkspace(supabase, user.id, workspaceId, workspaceName);
  let currentRevision = workspace.current_revision_id
    ? await readRevision(supabase, workspace.current_revision_id)
    : null;

  const currentHeadId = currentRevision?.id || "";
  if (currentHeadId !== expectedHeadRevisionId) {
    return jsonResponse({
      error: "Remote head conflict.",
      currentHead: createHeadDescriptor(workspace, currentRevision),
    }, 409);
  }

  let resolvedPayload = payloadJson;
  if (resolvedPayload === undefined) {
    if (!currentRevision) {
      return errorResponse("Incremental commits need an existing base revision.", 400);
    }
    resolvedPayload = applyIncrementalOperations(currentRevision.payload_json, operations);
  }

  const payloadSignature = providedSignature || await computePayloadSignature(resolvedPayload);
  if (currentRevision && currentRevision.payload_signature === payloadSignature) {
    return jsonResponse(createHeadDescriptor(workspace, currentRevision), 200);
  }

  const attachmentSummary = buildAttachmentSummary(resolvedPayload);

  const commitMode =
    requestedCommitMode ||
    (payloadJson !== undefined && operations.length > 0
      ? "hybrid"
      : payloadJson === undefined
      ? "incremental"
      : "snapshot");

  const { data: insertedRevision, error: revisionError } = await table(supabase, "sutsumu_workspace_revisions_v2")
    .insert({
      workspace_id: workspace.id,
      author_device_id: device.id,
      base_revision_id: currentRevision?.id || null,
      payload_signature: payloadSignature,
      payload_schema: payloadSchema,
      payload_version: Number.isFinite(payloadVersion) && payloadVersion > 0 ? payloadVersion : 1,
      payload_json: resolvedPayload,
      attachment_summary: attachmentSummary,
      commit_status: "committed",
      commit_mode: commitMode,
      operation_count: operations.length,
      operations_json: operations,
      client_saved_at: clientSavedAt,
    })
    .select("id,workspace_id,base_revision_id,payload_signature,payload_schema,payload_version,payload_json,commit_status,commit_mode,operation_count,operations_json,client_saved_at,created_at")
    .single();

  if (revisionError || !insertedRevision) {
    return errorResponse(revisionError?.message || "Unable to insert revision.", 500);
  }

  const { data: updatedWorkspace, error: workspaceError } = await table(supabase, "sutsumu_workspaces_v2")
    .update({
      name: workspaceName,
      current_revision_id: (insertedRevision as RevisionRow).id,
    })
    .eq("id", workspace.id)
    .select("id,local_workspace_id,name,current_revision_id,updated_at")
    .single();

  if (workspaceError || !updatedWorkspace) {
    return errorResponse(workspaceError?.message || "Unable to update workspace head.", 500);
  }

  workspace = updatedWorkspace as WorkspaceRow;
  currentRevision = insertedRevision as RevisionRow;
  await syncAttachmentObjects(supabase, user.id, workspace.id, attachmentSummary);
  return jsonResponse(createHeadDescriptor(workspace, currentRevision), 200);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (!["GET", "POST"].includes(req.method)) {
    return errorResponse("Method not allowed.", 405);
  }

  try {
    const supabase = createAdminClient();
    const user = await requireUser(req, supabase);

    if (req.method === "GET") {
      return await handleReadHead(req, supabase, user);
    }

    return await handleCommit(req, supabase, user);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("sutsumu-sync-v2 failed", error);
    return errorResponse(
      error instanceof Error ? error.message : "Unexpected backend error.",
      500,
    );
  }
});

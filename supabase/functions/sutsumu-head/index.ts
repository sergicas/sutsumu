import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, x-client-info, apikey, content-type, x-sutsumu-key",
  "access-control-allow-methods": "GET, POST, OPTIONS"
};

const PROVIDER_HEAD_SCHEMA = "sutsumu-cloud-sync-provider-head";
const MANUAL_PUSH_SCHEMA = "sutsumu-cloud-sync-manual-push";
const SHADOW_BUNDLE_SCHEMA = "sutsumu-cloud-sync-shadow-bundle";

type WorkspaceHeadRow = {
  local_workspace_id: string;
  name: string;
  current_revision_id: string;
  payload_signature: string;
  bundle_url: string | null;
  bundle_storage_path: string | null;
  bundle_access: "public" | "authenticated";
  bundle_signed_ttl_seconds: number;
  updated_at: string;
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "content-type": "application/json; charset=utf-8"
    }
  });
}

function readProvidedSharedKey(req: Request) {
  const headerKey = req.headers.get("x-sutsumu-key")?.trim();
  if (headerKey) return headerKey;
  const authHeader = req.headers.get("authorization") || "";
  if (/^bearer\s+/i.test(authHeader)) {
    return authHeader.replace(/^bearer\s+/i, "").trim();
  }
  return "";
}

function splitStoragePath(storagePath: string) {
  const normalized = String(storagePath || "").trim().replace(/^\/+/, "");
  const [bucket, ...rest] = normalized.split("/");
  const objectPath = rest.join("/");
  if (!bucket || !objectPath) {
    throw new Error("La ruta de storage ha d'incloure bucket i cami.");
  }
  return { bucket, objectPath };
}

function slugifyWorkspaceId(value: string) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "workspace";
}

function buildDefaultBundleStoragePath(workspaceId: string) {
  return `sutsumu-sync/workspaces/${slugifyWorkspaceId(workspaceId)}/shadow-bundle.json`;
}

function readStringField(record: Record<string, unknown>, field: string) {
  const value = record[field];
  return typeof value === "string" ? value.trim() : "";
}

function isShadowBundleLike(bundle: unknown): bundle is Record<string, unknown> {
  return Boolean(
    bundle
    && typeof bundle === "object"
    && (bundle as Record<string, unknown>).schema === SHADOW_BUNDLE_SCHEMA
    && Array.isArray((bundle as Record<string, unknown>).revisions)
  );
}

function extractBundleHead(bundle: Record<string, unknown>) {
  const revisions = Array.isArray(bundle.revisions) ? bundle.revisions : [];
  const state = bundle.state && typeof bundle.state === "object" ? bundle.state as Record<string, unknown> : {};
  const preferredRevisionId = readStringField(state, "lastRevisionId");
  const headCandidate = preferredRevisionId
    ? revisions.find((entry) => entry && typeof entry === "object" && readStringField(entry as Record<string, unknown>, "revisionId") === preferredRevisionId)
    : null;
  const resolvedHead = (headCandidate || revisions[0]) as Record<string, unknown> | undefined;
  if (!resolvedHead || typeof resolvedHead !== "object") {
    throw new Error("El bundle no porta cap revisio cap valida.");
  }
  const revisionId = readStringField(resolvedHead, "revisionId");
  const payloadSignature = readStringField(resolvedHead, "payloadSignature");
  const workspaceId = readStringField(resolvedHead, "workspaceId");
  const workspaceName = readStringField(resolvedHead, "workspaceName");
  if (!revisionId || !payloadSignature || !workspaceId) {
    throw new Error("La revisio cap del bundle no porta els camps minims.");
  }
  return {
    revisionId,
    payloadSignature,
    workspaceId,
    workspaceName
  };
}

async function resolveBundleUrlFromRow(supabase: ReturnType<typeof createClient>, row: WorkspaceHeadRow) {
  let bundleUrl = String(row.bundle_url || "").trim();
  if (!bundleUrl && row.bundle_storage_path) {
    const { bucket, objectPath } = splitStoragePath(row.bundle_storage_path);
    if (row.bundle_access === "public") {
      bundleUrl = supabase.storage.from(bucket).getPublicUrl(objectPath).data.publicUrl;
    } else {
      const ttl = Math.max(60, Math.min(Number(row.bundle_signed_ttl_seconds) || 300, 3600));
      const signed = await supabase.storage.from(bucket).createSignedUrl(objectPath, ttl);
      if (signed.error || !signed.data?.signedUrl) {
        throw new Error(signed.error?.message || "Unable to sign bundle URL.");
      }
      bundleUrl = signed.data.signedUrl;
    }
  }
  if (!bundleUrl) {
    throw new Error("Missing bundle reference.");
  }
  return bundleUrl;
}

function createHeadDescriptor(row: WorkspaceHeadRow, bundleUrl: string) {
  return {
    schema: PROVIDER_HEAD_SCHEMA,
    provider: "supabase-edge-function",
    workspaceId: row.local_workspace_id,
    workspaceName: row.name,
    headRevisionId: row.current_revision_id,
    payloadSignature: row.payload_signature,
    bundleUrl,
    updatedAt: row.updated_at
  };
}

async function readHeadRow(supabase: ReturnType<typeof createClient>, workspaceId: string) {
  const { data, error } = await supabase
    .from("sutsumu_workspace_heads")
    .select("local_workspace_id,name,current_revision_id,payload_signature,bundle_url,bundle_storage_path,bundle_access,bundle_signed_ttl_seconds,updated_at")
    .eq("local_workspace_id", workspaceId)
    .maybeSingle<WorkspaceHeadRow>();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

async function handleHeadRead(req: Request, supabase: ReturnType<typeof createClient>) {
  const workspaceId = new URL(req.url).searchParams.get("workspace_id")
    || new URL(req.url).searchParams.get("local_workspace_id")
    || "";
  if (!workspaceId.trim()) {
    return jsonResponse({ error: "Missing workspace_id." }, 400);
  }

  const row = await readHeadRow(supabase, workspaceId.trim());
  if (!row) {
    return jsonResponse([], 200);
  }

  const bundleUrl = await resolveBundleUrlFromRow(supabase, row);
  return jsonResponse(createHeadDescriptor(row, bundleUrl));
}

async function handleManualPush(req: Request, supabase: ReturnType<typeof createClient>) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }
  const payload = body as Record<string, unknown>;
  if (readStringField(payload, "schema") !== MANUAL_PUSH_SCHEMA) {
    return jsonResponse({ error: "Invalid push schema." }, 400);
  }

  const workspaceId = readStringField(payload, "workspaceId");
  const workspaceName = readStringField(payload, "workspaceName") || "Sutsumu Workspace";
  const expectedHeadRevisionId = readStringField(payload, "expectedHeadRevisionId");
  const pushBundle = payload.bundle;
  if (!workspaceId) {
    return jsonResponse({ error: "Missing workspaceId." }, 400);
  }
  if (!isShadowBundleLike(pushBundle)) {
    return jsonResponse({ error: "Missing compatible shadow bundle." }, 400);
  }

  let bundleHead;
  try {
    bundleHead = extractBundleHead(pushBundle);
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "Invalid head revision." }, 400);
  }

  const bodyHeadRevisionId = readStringField(payload, "headRevisionId");
  const bodySignature = readStringField(payload, "payloadSignature");
  if (bodyHeadRevisionId && bodyHeadRevisionId !== bundleHead.revisionId) {
    return jsonResponse({ error: "Body headRevisionId does not match the bundle head." }, 400);
  }
  if (bodySignature && bodySignature !== bundleHead.payloadSignature) {
    return jsonResponse({ error: "Body payloadSignature does not match the bundle head." }, 400);
  }
  if (bundleHead.workspaceId !== workspaceId) {
    return jsonResponse({ error: "Bundle workspaceId does not match body workspaceId." }, 400);
  }

  const existingRow = await readHeadRow(supabase, workspaceId);
  const currentRemoteHead = existingRow?.current_revision_id || "";
  if ((currentRemoteHead || expectedHeadRevisionId) && currentRemoteHead !== expectedHeadRevisionId) {
    return jsonResponse({ error: "Remote head conflict." }, 409);
  }

  const bundleStoragePath = String(existingRow?.bundle_storage_path || buildDefaultBundleStoragePath(workspaceId)).trim();
  const bundleAccess = existingRow?.bundle_access || "authenticated";
  const { bucket, objectPath } = splitStoragePath(bundleStoragePath);
  const bundleJson = JSON.stringify(pushBundle, null, 2);
  const upload = await supabase.storage.from(bucket).upload(objectPath, new Blob([bundleJson], {
    type: "application/json; charset=utf-8"
  }), {
    upsert: true,
    contentType: "application/json; charset=utf-8"
  });
  if (upload.error) {
    return jsonResponse({ error: upload.error.message }, 500);
  }

  const { data: upsertedRow, error: upsertError } = await supabase
    .from("sutsumu_workspace_heads")
    .upsert({
      local_workspace_id: workspaceId,
      name: workspaceName,
      current_revision_id: bundleHead.revisionId,
      payload_signature: bundleHead.payloadSignature,
      bundle_storage_path: bundleStoragePath,
      bundle_access: bundleAccess
    }, {
      onConflict: "local_workspace_id"
    })
    .select("local_workspace_id,name,current_revision_id,payload_signature,bundle_url,bundle_storage_path,bundle_access,bundle_signed_ttl_seconds,updated_at")
    .single<WorkspaceHeadRow>();

  if (upsertError || !upsertedRow) {
    return jsonResponse({ error: upsertError?.message || "Unable to persist remote head." }, 500);
  }

  const bundleUrl = await resolveBundleUrlFromRow(supabase, upsertedRow);
  return jsonResponse(createHeadDescriptor(upsertedRow, bundleUrl), 200);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (!["GET", "POST"].includes(req.method)) {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  const sharedKey = (Deno.env.get("SUTSUMU_SHARED_KEY") || "").trim();
  if (!sharedKey) {
    return jsonResponse({ error: "Missing SUTSUMU_SHARED_KEY." }, 500);
  }

  const providedKey = readProvidedSharedKey(req);
  if (!providedKey || providedKey !== sharedKey) {
    return jsonResponse({ error: "Unauthorized." }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Missing Supabase server credentials." }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    return req.method === "POST"
      ? await handleManualPush(req, supabase)
      : await handleHeadRead(req, supabase);
  } catch (error) {
    return jsonResponse({
      error: error instanceof Error ? error.message : "Unexpected error."
    }, 500);
  }
});

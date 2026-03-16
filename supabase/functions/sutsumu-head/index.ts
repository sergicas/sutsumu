import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, x-client-info, apikey, content-type, x-sutsumu-key",
  "access-control-allow-methods": "GET, OPTIONS"
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "GET") {
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

  const workspaceId = new URL(req.url).searchParams.get("workspace_id")
    || new URL(req.url).searchParams.get("local_workspace_id")
    || "";
  if (!workspaceId.trim()) {
    return jsonResponse({ error: "Missing workspace_id." }, 400);
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

  const { data: row, error } = await supabase
    .from("sutsumu_workspace_heads")
    .select("local_workspace_id,name,current_revision_id,payload_signature,bundle_url,bundle_storage_path,bundle_access,bundle_signed_ttl_seconds,updated_at")
    .eq("local_workspace_id", workspaceId.trim())
    .maybeSingle();

  if (error) {
    return jsonResponse({ error: error.message }, 500);
  }
  if (!row) {
    return jsonResponse([], 200);
  }

  let bundleUrl = String(row.bundle_url || "").trim();
  if (!bundleUrl && row.bundle_storage_path) {
    const { bucket, objectPath } = splitStoragePath(row.bundle_storage_path);
    if (row.bundle_access === "public") {
      bundleUrl = supabase.storage.from(bucket).getPublicUrl(objectPath).data.publicUrl;
    } else {
      const ttl = Math.max(60, Math.min(Number(row.bundle_signed_ttl_seconds) || 300, 3600));
      const signed = await supabase.storage.from(bucket).createSignedUrl(objectPath, ttl);
      if (signed.error || !signed.data?.signedUrl) {
        return jsonResponse({ error: signed.error?.message || "Unable to sign bundle URL." }, 500);
      }
      bundleUrl = signed.data.signedUrl;
    }
  }

  if (!bundleUrl) {
    return jsonResponse({ error: "Missing bundle reference." }, 500);
  }

  return jsonResponse({
    schema: "sutsumu-cloud-sync-provider-head",
    provider: "supabase-edge-function",
    workspaceId: row.local_workspace_id,
    workspaceName: row.name,
    headRevisionId: row.current_revision_id,
    payloadSignature: row.payload_signature,
    bundleUrl,
    updatedAt: row.updated_at
  });
});

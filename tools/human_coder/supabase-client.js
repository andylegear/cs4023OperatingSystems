/* Supabase config for the human qualitative-coding tool.
   Uses the anon/publishable key only — safe to embed client-side (RLS restricts
   the anon role to insert/select/update on qualitative_codings, no delete). */
const SUPABASE_URL = "https://silazvtqdxbunpgoivur.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Yrrd2GQm68PMwSC6CHgzbg_S0HDyT9_";
const TABLE = "qualitative_codings";

async function supabaseRequest(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Supabase ${res.status}: ${text}`);
  }
  return res.status === 204 ? null : res.json();
}

async function upsertCoding(row) {
  return supabaseRequest(`${TABLE}?on_conflict=segment_id,coder_name`, {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify([row]),
  });
}

async function fetchCodingsForCoder(coderName) {
  const rows = await supabaseRequest(
    `${TABLE}?select=*&coder_name=eq.${encodeURIComponent(coderName)}`
  );
  const bySegment = {};
  for (const row of rows) bySegment[row.segment_id] = row;
  return bySegment;
}

async function fetchAllCodings() {
  return supabaseRequest(`${TABLE}?select=*&order=segment_id.asc`);
}

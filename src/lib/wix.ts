// Read-only client for the Wix Velo endpoint (docs/wix/http-functions.js).
const BASE = import.meta.env.WIX_BASE_URL ?? 'https://www.globalproptechsummit.com';
const TTL_MS = 30_000;

const cache = new Map<string, { at: number; items: any[] }>();

/** Fetch a Wix collection by Collection ID. Serves stale data if Wix is down. */
export async function wixItems(collection: string): Promise<any[]> {
  const hit = cache.get(collection);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.items;
  try {
    const res = await fetch(`${BASE}/_functions/collection?name=${encodeURIComponent(collection)}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Wix ${res.status}`);
    const { items } = await res.json();
    cache.set(collection, { at: Date.now(), items });
    return items;
  } catch (e) {
    console.error('wixItems failed', collection, e);
    // Keep serving stale data and back off ~25s so a Wix outage isn't hammered on every request.
    const items = hit?.items ?? [];
    cache.set(collection, { at: Date.now() - TTL_MS + 5_000, items });
    return items;
  }
}

/** wix:image://v1/<id>/name.png#... -> https://static.wixstatic.com/media/<id> */
export function wixImage(uri?: string): string | undefined {
  const m = uri?.match(/^wix:image:\/\/v1\/([^/#]+)/);
  return m ? `https://static.wixstatic.com/media/${m[1]}` : undefined;
}

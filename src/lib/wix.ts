// Read-only client for the Wix Velo endpoint (docs/wix/http-functions.js).
const BASE = import.meta.env.WIX_BASE_URL ?? 'https://www.globalproptechsummit.com';
const TTL_MS = 30_000;
const TIMEOUT_MS = 12_000;

const cache = new Map<string, { at: number; items: any[]; ok: boolean }>();
const inflight = new Map<string, Promise<any[]>>();

/** False when the last attempt failed and there is no fresh data (callers must not CDN-cache that page). */
export const wixHealthy = (collection: string) => cache.get(collection)?.ok ?? true;

/** Fetch a Wix collection by Collection ID. Serves stale data if Wix is down; concurrent calls share one request. */
export function wixItems(collection: string): Promise<any[]> {
  const hit = cache.get(collection);
  if (hit && Date.now() - hit.at < TTL_MS) return Promise.resolve(hit.items);
  const pending = inflight.get(collection);
  if (pending) return pending;

  const p = (async () => {
    try {
      const res = await fetch(`${BASE}/_functions/collection?name=${encodeURIComponent(collection)}`, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`Wix ${res.status}`);
      const { items } = await res.json();
      cache.set(collection, { at: Date.now(), items, ok: true });
      return items as any[];
    } catch (e) {
      console.error('wixItems failed', collection, e);
      // Keep serving stale data and back off ~25s so a Wix outage isn't hammered on every request.
      const items = hit?.items ?? [];
      cache.set(collection, { at: Date.now() - TTL_MS + 5_000, items, ok: false });
      return items;
    } finally {
      inflight.delete(collection);
    }
  })();
  inflight.set(collection, p);
  return p;
}

/**
 * wix:image://v1/<id>/name.png#... -> https://static.wixstatic.com/media/<id>
 * With `size`, Wix resizes to a square crop anchored at the top (originals are ~500 KB).
 */
export function wixImage(uri?: string, size?: number): string | undefined {
  const m = uri?.match(/^wix:image:\/\/v1\/([^/#]+)/);
  if (!m) return undefined;
  const base = `https://static.wixstatic.com/media/${m[1]}`;
  return size ? `${base}/v1/fill/w_${size},h_${size},al_t,q_80,enc_auto/photo.png` : base;
}

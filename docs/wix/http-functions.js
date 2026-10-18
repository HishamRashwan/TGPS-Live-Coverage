// ======================================================================
// NEW (TGPS Live): read-only collections endpoint. Everything ABOVE this line is existing code.
// Paste this block AFTER your existing code, replacing the previous "NEW (TGPS Live)" block.
// Required import change at the top of the file:
//   import { ok, badRequest, serverError } from "wix-http-functions";
//   -> import { ok, badRequest, notFound, serverError } from "wix-http-functions";
// Read URL after publishing: https://www.globalproptechsummit.com/_functions/collection?name=<CollectionId>
// v2: one query per collection (include) instead of one extra query per row, plus a 15s warm cache.
// ======================================================================

// Only GET is exported, only allowlisted collections can be queried, no write API is called.
// Collection IDs (not display names). `refs` = multi-reference fields to resolve, with fields to keep.
const LIVE_COLLECTIONS = {
    "2026": {
        refs: {
            speakers: ["_id", "title_fld", "image_fld", "imagealttext_fld"],
            moderators: ["_id", "title_fld", "image_fld", "imagealttext_fld"]
        }
    }, // current-year agenda
    Import1: { refs: { speakers: ["_id", "title_fld", "image_fld", "imagealttext_fld"] } }, // old agenda (2025 recordings)
    Speakers: { refs: {} },
    SponsorsWhite: { refs: {} } // "Sponsors"
};

const LIVE_PRIVATE_FIELDS = ["_owner"]; // never returned
const LIVE_OPTS = { suppressAuth: true }; // public read even if the collection itself is not public
const LIVE_TTL_MS = 15000; // warm-instance cache so repeated calls don't hit the database
const liveCache = {};

const livePick = (obj, keys) => Object.fromEntries(keys.map((k) => [k, obj[k]]));

async function liveLoad(name, cfg) {
    const refFields = Object.keys(cfg.refs);
    let query = wixData.query(name).limit(1000);
    if (refFields.length) {
        query = query.include(...refFields); // fetch referenced items in the same query
    }
    const res = await query.find(LIVE_OPTS);

    return Promise.all(
        res.items.map(async (it) => {
            const copy = { ...it };
            LIVE_PRIVATE_FIELDS.forEach((f) => delete copy[f]);
            for (const [field, keep] of Object.entries(cfg.refs)) {
                let refs = it[field];
                if (!Array.isArray(refs)) {
                    // Fallback if include() did not return a list: one extra query for this row.
                    refs = (await wixData.queryReferenced(name, it._id, field, LIVE_OPTS)).items;
                }
                copy[field] = refs.map((r) => livePick(r, keep));
            }
            return copy;
        })
    );
}

export async function get_collection(request) {
    const name = request.query.name;
    const cfg = LIVE_COLLECTIONS[name];
    if (!cfg) {
        return notFound({ headers: jsonHeaders, body: { error: "unknown collection" } });
    }

    const hit = liveCache[name];
    if (hit && Date.now() - hit.at < LIVE_TTL_MS) {
        return ok({
            headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=15" },
            body: { items: hit.items }
        });
    }

    try {
        const items = await liveLoad(name, cfg);
        liveCache[name] = { at: Date.now(), items };
        return ok({
            headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=15" },
            body: { items }
        });
    } catch (error) {
        console.error("LIVE_COLLECTION_ENDPOINT_ERROR", error);
        if (hit) {
            // Serve the last good copy rather than failing.
            return ok({ headers: jsonHeaders, body: { items: hit.items } });
        }
        return serverError({ headers: jsonHeaders, body: { error: "query failed" } });
    }
}

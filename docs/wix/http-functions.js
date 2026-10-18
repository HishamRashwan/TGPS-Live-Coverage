// ======================================================================
// NEW (TGPS Live): read-only collections endpoint. Everything ABOVE this line is existing code.
// Paste this block AFTER your existing code. One change above is required:
//   import { ok, badRequest, serverError } from "wix-http-functions";
//   -> import { ok, badRequest, notFound, serverError } from "wix-http-functions";
// Read URL after publishing: https://www.globalproptechsummit.com/_functions/collection?name=<CollectionId>
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

const livePick = (obj, keys) => Object.fromEntries(keys.map((k) => [k, obj[k]]));

export async function get_collection(request) {
    const name = request.query.name;
    const cfg = LIVE_COLLECTIONS[name];
    if (!cfg) {
        return notFound({ headers: jsonHeaders, body: { error: "unknown collection" } });
    }

    try {
        const res = await wixData.query(name).limit(1000).find(LIVE_OPTS);
        const items = await Promise.all(
            res.items.map(async (it) => {
                const copy = { ...it };
                LIVE_PRIVATE_FIELDS.forEach((f) => delete copy[f]);
                for (const [field, keep] of Object.entries(cfg.refs)) {
                    const refs = await wixData.queryReferenced(name, it._id, field, LIVE_OPTS);
                    copy[field] = refs.items.map((r) => livePick(r, keep));
                }
                return copy;
            })
        );
        return ok({
            headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=15" },
            body: { items }
        });
    } catch (error) {
        console.error("LIVE_COLLECTION_ENDPOINT_ERROR", error);
        return serverError({ headers: jsonHeaders, body: { error: "query failed" } });
    }
}

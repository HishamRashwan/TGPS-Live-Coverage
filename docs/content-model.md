# Content Model (live from Wix CMS)
Source of truth is the Wix Studio CMS. Read-only public endpoint `GET /_functions/collection?name=<CollectionId>` (code: `docs/wix/http-functions.js`, pasted into the Wix site's backend). Allowlisted collections only. Client: `src/lib/wix.ts` (30s in-memory cache, stale-on-error). Env: `WIX_BASE_URL` (default https://www.globalproptechsummit.com).

| Display name | Collection ID | Used for |
|---|---|---|
| 2026 (current agenda) | `2026` | schedule: sessionName, sessionType, sessionDescriptionEn, startTime, durationInMinutes, day1 (tags), published, speakers[], moderators[] |
| Speakers | `Speakers` | title_fld (name), image_fld, imagealttext_fld (job), speakerType, homePageFeature |
| Sponsors | `SponsorsWhite` | title_fld, image_fld, imagealttext_fld (company), tag, year |
| Agenda (old, 2025 recordings) | `Import1` | not used for the 2026 schedule |

Rules: images arrive as `wix:image://v1/<id>/...` -> `wixImage()`. Site is English only: ignore `*Ar` fields. Event days: Day 1 = 2026-10-25, Day 2 = 2026-10-26, Riyadh time (UTC+3), see `src/lib/agenda.ts`. Page is SSR (`prerender = false`) with `s-maxage=30`. Dev time travel: `/?now=2026-10-25T10:30:00+03:00`.
Planned: stream ID in `src/data/stream.ts`; creative modules (Now-on-Stage, Live Pulse, Moment cards, Agreement ticker).

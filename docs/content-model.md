# Content Model (planned, files in `src/data/`)
- `schedule.ts`: `{ id, day: 1|2, start, end, stage, title, speakerIds[], topic }` (Riyadh time, UTC+3). Now/Next is computed client-side from the current time.
- `speakers.ts`: `{ id, name, title, org, photo }` (photos in `public/speakers/`).
- `stream.ts`: `{ provider: 'youtube', videoId, startsAt }`.
- Creative modules to decide while building: Now-on-Stage hero, Live Pulse counters, Moment cards, Agreement ticker, venue map, Day-2 replay.
Confirm the real agenda and stream ID with the organizers before hard-coding.

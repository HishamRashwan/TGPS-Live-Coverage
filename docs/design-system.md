# Design System (extracted from globalproptechsummit.com, 2026-10-18)

## Color
| Token | Value | Use |
|---|---|---|
| `brand` | #FF5001 | accent, dates, CTAs, highlights |
| `navy` | #163F53 | gradient end, overlays |
| `cream` | #F0E2DC | soft text/surfaces |
| `ink` / `paper` | #000 / #FFF | base / primary text |
| `glass` / `glass-strong` | white at 10% / 20% | card fills |

Hero overlays: `linear-gradient(90deg, rgba(255,80,1,.25), rgba(0,0,0,.25))`; bottom navy fade `rgba(22,63,83,.53)` to transparent.

## Type
Body font on the live site is **Cairo** (300/400/500/700). The headline face is a Wix custom font (wide techno sans). TODO: identify it (inspect `wfont_462566_efbd77fc...`) and add `--font-display`.
Common sizes: 10/14/16/20/30px. Eyebrow: 30px, letter-spacing 6px. Big theme titles are uppercase.

## Shape and effects
Cards radius **40px**, pills 999px, small 8-16px. Glass: gradient fill (213deg, white .02 to .21) + `backdrop-filter: blur(20px)` + 1px white/20% border (`.glass` class). Dark, warm-orange-tinted photographic backgrounds.

## Components seen on the live site
Floating pill nav (logo, links, REGISTER pill) · hero with date pill "25 - 26 OCT 2026" · stats row (9K / 80 / 60 / 20 / 260M) · speaker cards · partner logo strips · themed topic list · CTA cards (About, Knowledge Hub, Media Center).

## Nav links to mirror (absolute URLs to the main site)
About, Profile, Topics, Speakers, Partners (/partners-2026), News, Press, Gallery, Articles, Workshops, Book Your Stay, Contact, Proptech Studio, REGISTER (/register). Add "Live" as the active item.

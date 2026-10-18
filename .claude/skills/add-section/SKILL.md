---
name: add-section
description: Use when adding a page section (hero, schedule, stream, stats, etc.).
---

1. Data first: add typed content to src/data/.
2. Create src/sections/<Name>.astro from existing components and tokens. Static, responsive layout first.
3. Add it to the page in src/pages/.
4. Add animation separately with the add-animation skill.
5. Run npm run check and npm run build, then the visual-qa skill.

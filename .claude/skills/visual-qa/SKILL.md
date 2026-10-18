---
name: visual-qa
description: Use before claiming a UI change is done. Screenshot and inspect desktop and mobile.
---

1. Make sure the dev server runs and `npx playwright install chromium` has been run once.
2. Run npm test, then open tests/screenshots/*.png (desktop 1440x900, Pixel 7).
3. Check console errors, horizontal overflow, text contrast, focus states, reduced motion.
4. Compare with references/ from the live site, fix differences, re-run.
5. Report what was verified and what was not. Animation feel needs a human look.

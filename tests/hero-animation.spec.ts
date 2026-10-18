import { test, expect } from '@playwright/test';

const op = (sel: string) => `+getComputedStyle(document.querySelector('${sel}')).opacity`;

test('hero entrance animates then settles', async ({ page }) => {
  await page.goto('/');
  const early = await page.evaluate(`${op('[data-anim=player]')}`);
  expect(early).toBeLessThan(1); // mid-animation right after load
  await expect.poll(() => page.evaluate(`${op('[data-anim=player]')}`), { timeout: 5000 }).toBe(1);
  await expect.poll(() => page.evaluate(`${op('[data-anim=title]')}`)).toBe(1);
});

test('no duplicate init after cleanup/start cycles', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(3000);
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => {
      document.dispatchEvent(new Event('astro:before-swap'));
      document.dispatchEvent(new Event('astro:page-load'));
    });
  }
  await expect.poll(() => page.evaluate(`${op('[data-anim=title]')}`), { timeout: 5000 }).toBe(1);
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('shows final state immediately', async ({ page }) => {
    await page.goto('/');
    expect(await page.evaluate(`${op('[data-anim=player]')}`)).toBe(1);
    expect(await page.evaluate(`${op('[data-anim=title]')}`)).toBe(1);
  });
});

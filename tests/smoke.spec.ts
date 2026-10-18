import { test, expect } from '@playwright/test';

test('home renders and screenshots', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({ path: `tests/screenshots/home-${info.project.name}.png`, fullPage: true });
  expect(errors).toEqual([]);
});

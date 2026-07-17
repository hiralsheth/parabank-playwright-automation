import { test } from '@playwright/test';
import type { Page } from '@playwright/test';

/**
 * Captures a full-page screenshot and attaches it to the current test report.
 * Attachments appear in the Playwright HTML report under each test's detail view.
 *
 * @param page  - Playwright Page instance
 * @param label - Name shown in the report (use a descriptive, test-specific label)
 */
export async function attachScreenshot(page: Page, label: string): Promise<void> {
  const buffer = await page.screenshot({ fullPage: true });
  await test.info().attach(label, { body: buffer, contentType: 'image/png' });
}

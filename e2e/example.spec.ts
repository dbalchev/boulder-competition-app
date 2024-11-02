import { test, expect } from '@playwright/test';

test('welcomes you', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Expect a title "to contain" a substring.
    await expect(page.locator('#welcome')).toContainText('Welcome to the bouldering app');
});

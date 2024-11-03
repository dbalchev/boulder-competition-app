import { test, expect } from '@playwright/test'

test('local storage spec', async ({ page }) => {
    await page.goto('/')

    const boulder3 = await page.getByLabel('Boulder 3', { exact: true })
    await expect(boulder3).toContainText('Not Attempted')
    await boulder3.click()
    const flashedButton = await page.locator('.setState.FLASHED')
    await flashedButton.click()
    await expect(boulder3).toContainText('Flashed')

    await page.goto('/')
    const newPageboulder3 = await page.getByLabel('Boulder 3', { exact: true })
    await expect(newPageboulder3).toContainText('Flashed')
})

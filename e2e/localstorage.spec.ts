import { test, expect } from '@playwright/test'

test('local storage spec', async ({ page }) => {
    await page.goto('/')

    const newCompetitionName = await page.getByPlaceholder('New Competition Name')
    await newCompetitionName.fill('foo')
    const boulderCount = await page.getByPlaceholder('Number of Boulders')
    await boulderCount.fill('10')

    await (await page.getByText('Create new Competition')).click()

    const boulder3 = await page.getByLabel('Boulder 3', { exact: true })
    await expect(boulder3).toContainText('Not Attempted')
    await boulder3.click()
    const flashedButton = await page.locator('.setState.FLASHED')
    await flashedButton.click()
    await expect(boulder3).toContainText('Flashed')

    await page.goto('/')
    await (await page.getByText('foo')).click()

    const newPageboulder3 = await page.getByLabel('Boulder 3', { exact: true })
    await expect(newPageboulder3).toContainText('Flashed')
})

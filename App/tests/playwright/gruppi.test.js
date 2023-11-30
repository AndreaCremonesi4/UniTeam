import { test, expect } from '@playwright/test';

test('Group Test 1', async ({ page }) => {
    await page.goto('http://localhost:5173/gruppi');
    await page.waitForLoadState('domcontentloaded');

    const grid = await page.waitForSelector('.grid');
    const schede = await grid.$$('.scheda');
    expect(schede.length).toBeGreaterThan(0);

    const emptyList = await page.locator(".input").fill("dsovbevibu");
    await page.waitForTimeout(1000);
    const groupListEmpty = await grid.$$('.scheda');
    expect(groupListEmpty.length).toBe(0);

    const list = await page.locator(".input").fill("Gruppo 2");
    const grid2 = await page.waitForSelector('.grid');
    await page.waitForTimeout(1000);
    const groupList = await grid2.$$('.scheda');
    expect(groupList.length).toBe(1);
    const groupName = await page.locator('.scheda .fw-semibold').textContent();
    expect(groupName).toContain("Gruppo 2");

    const dropdowns = await page.$$('.dropdown');
    expect(dropdowns.length).toBeGreaterThan(0);
    for (const dropdown of dropdowns) {
        const options = await dropdown.$$('option');
        expect(options.length).toBeGreaterThan(0);
    }
    const firstGroup = await grid2.$('.scheda');
    firstGroup.click();
    const title = await page.textContent('.name');
    expect(title).toBe('Gruppo 2');

});
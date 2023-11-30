import { test, expect } from '@playwright/test';

test('Prof Test 1', async ({ page }) => {
    await page.goto('http://localhost:5173/professori');
    await page.waitForLoadState('domcontentloaded');

    const grid = await page.waitForSelector('.grid');
    const schede = await grid.$$('.scheda');
    expect(schede.length).toBeGreaterThan(0);

    const emptyList = await page.locator(".input").fill("dsovbevibu");
    await page.waitForTimeout(1000);
    const profListEmpty = await grid.$$('.scheda');
    expect(profListEmpty.length).toBe(0);

    const list = await page.locator(".input").fill("Brugnera");
    const grid2 = await page.waitForSelector('.grid');
    await page.waitForTimeout(1000);
    const profList = await grid2.$$('.scheda');
    expect(profList.length).toBe(1);
    const profName = await page.locator('.scheda .fw-semibold').textContent();
    expect(profName).toContain("Brugnera");

    const dropdowns = await page.$$('.dropdown');
    expect(dropdowns.length).toBeGreaterThan(0);
    for (const dropdown of dropdowns) {
        const options = await dropdown.$$('option');
        expect(options.length).toBeGreaterThan(0);
    }

    const firstProf = await grid2.$('.scheda');
    firstProf.click();
    const title = await page.textContent('.name');
    expect(title).toBe('Agostino Brugnera');
});


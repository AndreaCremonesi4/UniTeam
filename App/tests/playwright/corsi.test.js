import { test, expect } from '@playwright/test';

test('Course Test 1', async ({ page }) => {
    await page.goto('http://localhost:5173/corsi');
    await page.waitForLoadState('domcontentloaded');

    const grid = await page.waitForSelector('.grid');
    const schede = await grid.$$('.scheda');
    expect(schede.length).toBeGreaterThan(0);

    const emptyList = await page.locator(".input").fill("dsovbevibu");
    await page.waitForTimeout(1000);
    const courseListEmpty = await grid.$$('.scheda');
    expect(courseListEmpty.length).toBe(0);

    const list = await page.locator(".input").fill("INGEGNERIA DEL SOFTWARE");
    const grid2 = await page.waitForSelector('.grid');
    await page.waitForTimeout(1000);
    const courseList = await grid2.$$('.scheda');
    expect(courseList.length).toBe(1);
    const courseName = await page.locator('.scheda .fw-semibold').textContent();
    expect(courseName).toContain("INGEGNERIA DEL SOFTWARE");

    const dropdowns = await page.$$('.dropdown');
    expect(dropdowns.length).toBeGreaterThan(0);
    for (const dropdown of dropdowns) {
        const options = await dropdown.$$('option');
        expect(options.length).toBeGreaterThan(0);
    }

    const firstCourse = await grid2.$('.scheda');
    firstCourse.click();
    const title = await page.textContent('.name');
    expect(title).toBe('INGEGNERIA DEL SOFTWARE');
});
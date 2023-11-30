import { test, expect } from '@playwright/test';

test('Layout Components Test', async ({ page }) => {

    await page.goto('http://localhost:5173/corsi/');

    const filterWrapper = await page.waitForSelector('.filter-wrapper');
    expect(filterWrapper).not.toBeNull();

    const filterWrapperClass = await filterWrapper.getAttribute('class');
    expect(filterWrapperClass).toContain('open');

    const gridLayout = await page.waitForSelector('.grid');
    expect(gridLayout).not.toBeNull();

    const pageSelector = await page.waitForSelector('.pagination');
    expect(pageSelector).not.toBeNull();


});

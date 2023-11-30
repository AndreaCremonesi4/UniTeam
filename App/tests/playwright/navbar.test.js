import { test, expect } from '@playwright/test';

test('Navbar Test', async ({ page }) => {
    await page.goto('http://localhost:5173');


    const navbar = await page.waitForSelector('.navbar');
    expect(navbar).not.toBeNull();

    const navLinks = await navbar.$$('.nav-link');
    expect(navLinks.length).toBeGreaterThan(0);

    const linkHome = await page.locator('.navbar-brand').getAttribute("href");
    expect(linkHome).toBe("/");

    const linkGroup = await page.locator('.nav-link').nth(0).getAttribute("href");
    expect(linkGroup).toBe("/gruppi");

    const linkCourse = await page.locator('.nav-link').nth(1).getAttribute("href");
    expect(linkCourse).toBe("/corsi");

    const linkProf = await page.locator('.nav-link').nth(2).getAttribute("href");
    expect(linkProf).toBe("/professori");

    const linkReg = await page.locator('.navbar-nav .btn-primary').getAttribute("href");
    expect(linkReg).toBe("/login?redirectTo=/");

    const dropdowMenu = await page.locator('.dropdown-menu').isVisible();
    expect(dropdowMenu).toBe(false);

});

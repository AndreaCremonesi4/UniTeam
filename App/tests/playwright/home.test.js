import { test, expect } from '@playwright/test';
// Hero 
test('Hero Component Test', async ({ page }) => {

    await page.goto('http://localhost:5173/');

    const mainHeaderText = await page.textContent('.main-header');
    expect(mainHeaderText).toBe('La Tua Community Universitaria Online');

    const paragraphText = await page.textContent('.hero-body p.text-body');
    expect(paragraphText).toBe(
        "Recensisci Corsi e Professori, Collabora in Gruppi di Studio, e Comunica in Tempo Reale con Altri Studenti Universitari"
    );

    const registrationButton = await page.locator('#union-btn');
    expect(registrationButton).toBeTruthy();

    const heroImage = await page.locator('.hero-img');
    expect(heroImage).toBeTruthy();

    const registrationButtonHref = await registrationButton.getAttribute('href');
    expect(registrationButtonHref).toBe('/registrazione');

});

//Reviews-component tests
test('ReviewCard Component Test', async ({ page }) => {

    await page.goto('http://localhost:5173/');

    const titleReview = await page.locator('#review-title');
    const titleReviewText = await titleReview.textContent();
    expect(titleReviewText).toBe('Recensioni');

    const reviewCards = await page.$$('.card');
    expect(reviewCards.length).toBe(2);


    const firstReviewCard = await page.$('.card:nth-child(1)');
    const firstTitleText = await firstReviewCard.evaluate((card) => card.querySelector('.text-subtitle').textContent);
    expect(firstTitleText).toBe('Corsi');

    const firstDescriptionText = await firstReviewCard.evaluate((card) => card.querySelector('.text-body').textContent);
    expect(firstDescriptionText).toBe('Leggi le recensioni scritte dagli studenti stessi e scopri quali corsi si adattano meglio ai tuoi interessi e obiettivi accademici');

    for (let i = 0; i < reviewCards.length; i++) {
        const currentCard = reviewCards[i];


        const iconExists = await currentCard.$('.icon img');
        expect(iconExists).toBeTruthy();


        const scopriLink = await currentCard.$('a');
        expect(scopriLink).toBeTruthy();


        const hrefAttribute = await scopriLink.getAttribute('href');
        expect(hrefAttribute).toBeTruthy();


        const scopriLinkText = await scopriLink.textContent();
        expect(scopriLinkText).toBe('Scopri');

    }
});
import { test, expect } from '@playwright/test';

test('Layout Components Test', async ({ page }) => {
    await page.goto('http://localhost:5173/corsi/');


    // Verifica che il componente dei filtri sia presente e inizialmente aperto
    const filterWrapper = await page.waitForSelector('.filter-wrapper');
    expect(filterWrapper).not.toBeNull();
    const filterWrapperClass = await filterWrapper.getAttribute('class');
    expect(filterWrapperClass).toContain('open');

    // Simula il clic sul pulsante di filtro
    await page.click('.show-filters-btn');

    // Verifica che il componente dei filtri sia ora chiuso
    const filterWrapperClassAfterClick = await filterWrapper.getAttribute('class');
    expect(filterWrapperClassAfterClick).not.toContain('open');



    // Verifica che il componente della griglia sia presente
    const gridLayout = await page.waitForSelector('.grid');
    expect(gridLayout).not.toBeNull();

    // Verifica che il numero di colonne cambi correttamente nelle diverse dimensioni della finestra
    const gridColumnCount = await gridLayout.$eval('.grid', (el) => window.getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(gridColumnCount).toBe(3); // Controlla il numero di colonne iniziale

    // Simula il ridimensionamento della finestra per verificare la risposta ai media query
    await page.setViewportSize({ width: 1400, height: 800 });
    const gridColumnCountAfterResize = await gridLayout.$eval('.grid', (el) => window.getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(gridColumnCountAfterResize).toBe(2); // Controlla il numero di colonne dopo il ridimensionamento

    await page.setViewportSize({ width: 992, height: 800 });
    const gridColumnCountAfterResizeMobile = await gridLayout.$eval('.grid', (el) => window.getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(gridColumnCountAfterResizeMobile).toBe(1); // Controlla il numero di colonne dopo un ulteriore ridimensionamento


    // Verifica che il componente del selettore di pagina sia presente
    const pageSelector = await page.waitForSelector('.pagination');
    expect(pageSelector).not.toBeNull();

    // Simula il clic su un pulsante per cambiare pagina
    await page.click('.page-link.bg-primary.text-white');

    // Verifica che la pagina sia cambiata correttamente
    const currentPage = await page.$eval('.pagination .select-input', (el) => el.value);
    expect(currentPage).toBe(1);


});
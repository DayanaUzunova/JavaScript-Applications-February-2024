// //1
// //import chromium
// import { chromium } from 'playwright-chromium';
// //IIFE
// (async () => {
//     //Стартираме браузъра
//     const browser = await chromium.launch();
//     //браузъра да отвори нова страница
//     const page = await browser.newPage();
//     //линк, към която страница да отидем
//     await page.goto('https://google.com/');
//     //да направи скрийншот на страницата
//     await page.screenshot({ path: `example.png` });
//     //затваряне на браузъра
//     await browser.close();
// })();

//2
import { chromium } from 'playwright-chromium';
import { expect } from 'chai';

/**
 * @type {import('playwright-chromium').BrowserType}
 */
let browser;
/**
 * @type {import('playwright-chromium').Page}
 */
let page; 
describe('E2E tests', async function () {
    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('works', async () => {
        await page.goto('http://127.0.0.1:5500/TESTING/example.html');
        const content = await page.textContent('h1');

        console.log(content);
        expect(content).to.contain('Hello Playwright!');
    });
    it('has a working button', async () => {
        await page.goto('http://127.0.0.1:5500/TESTING/example.html');
        await page.click('text=click me');

        const content = await page.textContent('h1');
        expect(content).to.contain('Code from page');
    })
});
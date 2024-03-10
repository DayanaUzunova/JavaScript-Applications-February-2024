import { chromium } from 'playwright-chromium';
import { expect } from 'chai';
import { describe } from 'mocha';

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

    it('loads titles', async () => {
        await page.goto('http://127.0.0.1:5500/Accordion/');
    
        await page.waitForLoadState('networkidle');
        
        const titles = await page.$$eval('div.head span', (items) => items.map(i => i.textContent));
        console.log(titles);
    });
    it('shows more', async () => {
        await page.goto('http://127.0.0.1:5500/Accordion/');
        await page.click('text=More');

        await page.waitForLoadState('networkidle')
        const visible = await page.isVisible('text=Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format');
        expect(visible).to.be.true;
    })
});
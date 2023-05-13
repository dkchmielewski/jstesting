const { generateText, checkAndGenerate } = require('./util');
const puppeteer = require('puppeteer');

test('should output name and age', () => {
    const text = generateText('Max', 29);
    expect(text).toBe('Max (29 years old)');
});

test('should generate a valid text output', () => {
    const text = checkAndGenerate('Max', 29);
    expect(text).toBe('Max (29 years old)')
});

test('should create element with text and correct class', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        // slowMo: 80,
        // args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto(
        'file:///Users/Daniel/Documents/Udemy/JavaScript/testing-01-starting-setup/index.html'  
    );
    await page.click('input#name');
    await page.type('input#name', 'Daniel');
    await page.click('input#age');
    await page.type('input#age', '29');
    await page.click('button#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Daniel (29 years old)');
}, 10000);
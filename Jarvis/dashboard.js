const fs = require('fs');

const { chromium } = require('playwright'); // Or 'chromium' or 'webkit'.
var alert = require('alert');
const path = require('path');

(async () => {
    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext({storageState: path.join(__dirname, 'Jarvis.json')});
    context.setDefaultTimeout(60000)
    const page = await context.newPage();
    //await page.goto('https://jarvis-west.dc.ad.msft.net/settings/mdm');
    await page.goto('https://portal.microsoftgeneva.com/account/onboard');
})();


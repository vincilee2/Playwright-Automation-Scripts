const fs = require('fs');

const { chromium } = require('playwright'); // Or 'chromium' or 'webkit'.
var alert = require('alert');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        channel: 'msedge'
    });
  

    // let traceId = process.argv[2];
    
    const page = await browser.newPage();
    await page.goto('https://jarvis-west.dc.ad.msft.net/dashboard/AIP');
    
})();


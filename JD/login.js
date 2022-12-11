const fs = require('fs');
var alert = require('alert');
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        channel: 'chromium'
    });
  
    // let traceId = process.argv[2];
    
    const page = await browser.newPage();
    await page.goto('https://passport.jd.com/new/login.aspx?ReturnUrl=https%3A%2F%2Fglobal.jd.com%2F');
    
    await page.waitForURL('https://global.jd.com/');

    await page.context().storageState({ path: __dirname + '/Auth.json'})
    alert('Done please check');
    await browser.close();
})();
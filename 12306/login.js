const fs = require('fs');
var alert = require('alert');
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        channel: 'chromium'
    });
  
    const page = await browser.newPage();
    await page.goto('https://kyfw.12306.cn/otn/resources/login.html');
    
    await page.waitForURL('https://kyfw.12306.cn/otn/view/index.html');

    await page.context().storageState({ path: __dirname + '/Auth.json'})
    alert('Done please check');
    await browser.close();
})();
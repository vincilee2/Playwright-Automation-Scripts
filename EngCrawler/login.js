

const fs = require('fs');

const { chromium } = require('playwright');
const path = require('path');
const dotenv = require('dotenv').config( {
    path: path.join(__dirname, '.env')
  } );

const userName = dotenv.parsed.UserName;
const password = dotenv.parsed.Password;

var alert = require('alert');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        channel: 'chromium'
    });
  
    // let traceId = process.argv[2];
    
    const page = await browser.newPage();
    await page.goto('https://eng.ms/docs/');
    await page.getByPlaceholder('Email or phone').fill(userName);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Password' }).click();
    await page.getByPlaceholder('Password').fill(password);
    await page.getByPlaceholder('Password').press('Enter');
    await page.getByRole('button', { name: 'Sign in with your phone or token device' }).click();
    
    await page.waitForURL('https://eng.ms/docs/**', { timeout: 300000 });

    await page.context().storageState({ path: path.join(__dirname, 'Auth.json')})
    alert('Done please check');
})();
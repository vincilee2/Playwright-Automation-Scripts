const path = require('path');
const dotenv = require('dotenv').config( {
    path: path.join(__dirname, '.env')
  } );

const userName = dotenv.parsed.GitHubUserName;
const password = dotenv.parsed.GitHubPassword;

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });

  
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://github.com/login');
  await page.getByLabel('Username or email address').fill(userName);
  await page.getByLabel('Password').fill(password);

  await page.getByRole('button', { name: 'Sign in' }).click();

  // ---------------------
    //   await context.close();
    //   await browser.close();
})();
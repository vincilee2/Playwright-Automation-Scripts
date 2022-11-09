const { chromium } = require('playwright');

const path = require('path');
const dotenv = require('dotenv').config( {
    path: path.join(__dirname, '.env')
  } );

const userName = dotenv.parsed.UserName;
const password = dotenv.parsed.Password;

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto('https://outlook.live.com/owa/');

  await page.getByRole('navigation', { name: 'Quick links' }).getByRole('link', { name: 'Sign in' }).click();

  await page.getByPlaceholder('Email, phone, or Skype').fill(userName);

  await page.getByRole('button', { name: 'Next' }).click();

  await page.locator('input[name="passwd"]').fill(password);

  await page.getByRole('button', { name: 'Sign In' }).click();


})();
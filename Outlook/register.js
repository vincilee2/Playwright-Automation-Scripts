const { chromium } = require('playwright');

const path = require('path');
const dotenv = require('dotenv').config( {
    path: path.join(__dirname, '.env')
  } );

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto('https://outlook.live.com/owa/');

  await page.locator('section:has-text("Free Outlook email and calendar Everything you need to be your most productive a")').getByRole('link', { name: 'Create free account' }).click();
  await expect(page).toHaveURL('https://signup.live.com/*');
  await page.getByPlaceholder('New email').click();
  await page.getByPlaceholder('New email').fill('vinci8907');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Create password' }).click();
  await page.getByRole('textbox', { name: 'Create password' }).fill('Practice1994,.');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('First name').fill('vinci');
  await page.getByPlaceholder('Last name').fill('lee');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('combobox', { name: 'Birth month' }).selectOption('1');
  await page.getByRole('combobox', { name: 'Birth day' }).selectOption('1');
  await page.getByPlaceholder('Year').fill('1994');
  await page.getByRole('button', { name: 'Next' }).click();

})();
const { chromium } = require('playwright'); // Or 'chromium' or 'webkit'.
const path = require('path');

module.exports = async function CreateMetric(rule){
    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext({storageState: path.join(__dirname, 'Jarvis.json')});
    context.setDefaultTimeout(60000000)
    const page = await context.newPage();
    await page.goto('https://portal.microsoftgeneva.com/manage/connectors/kusto-to-metrics');
    await page.getByPlaceholder('Account').fill('');
    await page.getByPlaceholder('Account').fill(rule.Account);
    await page.getByPlaceholder('Namespace').fill(rule.Namespace);
    await page.getByPlaceholder('Account').click();
    await page.getByRole('button', { name: 'New Rule' }).click();
    await page.getByPlaceholder('https://{cluster}.kusto.windows.net').fill('https://kusto.aria.microsoft.com');
    await page.getByPlaceholder('Database').fill(rule.Database);
    await page.locator(".inputarea").fill(rule.KustoQuery);
    await new Promise(r => setTimeout(r, 1000));
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByText('Configure Metric Preaggregates').waitFor();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Rule Name').fill(rule.Name);

    //await page.getByRole('button', { name: 'Save' }).click();
};

    


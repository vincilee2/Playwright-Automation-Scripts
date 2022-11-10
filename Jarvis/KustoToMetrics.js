const { chromium } = require('playwright'); // Or 'chromium' or 'webkit'.
var alert = require('alert');
const path = require('path');
const Account = 'PrivacyProxyMonitor';
const Namespace = 'MetricsExtension';
const NewRuleUrl = `https://portal.microsoftgeneva.com/manage/connectors/kusto-to-metrics/account/${Account}/${Namespace}/MetricsExtension/rule/new`;

module.exports = async function CreateMetric(KustoQuery, RuleName){
    const browser = await chromium.launch({
        headless: false
        //channel: 'msedge'
    });

    const context = await browser.newContext({storageState: path.join(__dirname, 'Jarvis.json')});
    context.setDefaultTimeout(600000)
    const page = await context.newPage();
    await page.goto('https://portal.microsoftgeneva.com/manage/connectors/kusto-to-metrics');
    await page.getByPlaceholder('Account').fill('');
    await page.getByPlaceholder('Account').fill(Account);
    await page.getByPlaceholder('Namespace').fill(Namespace);
    await page.getByPlaceholder('Account').click();
    await page.getByRole('button', { name: 'New Rule' }).click();
    //await page.waitForURL(NewRuleUrl);
    await page.getByPlaceholder('https://{cluster}.kusto.windows.net').fill('https://kusto.aria.microsoft.com');
    await page.getByPlaceholder('Database').fill('b4af23a6865f491b88747559ad276216');
    await page.locator(".inputarea").fill(KustoQuery);
    //await page.getByRole('button', { name: 'Preview' }).click();
    //await page.getByText('Query validation succeeded').waitFor();
    await new Promise(r => setTimeout(r, 1000));
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByText('Configure Metric Preaggregates').waitFor();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Rule Name').fill(RuleName);

    //await page.getByRole('button', { name: 'Save' }).click();
};

    


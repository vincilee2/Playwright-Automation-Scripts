const { chromium } = require('playwright'); // Or 'chromium' or 'webkit'.
var alert = require('alert');
const path = require('path');
const Account = 'PrivacyProxyMonitor';
const Namespace = 'MetricsExtension';
const NewRuleUrl = `https://portal.microsoftgeneva.com/manage/connectors/kusto-to-metrics/account/${Account}/${Namespace}/MetricsExtension/rule/new`;
(async () => {
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
    await page.locator(".inputarea").fill(`database("b4af23a6865f491b88747559ad276216").adswidgetmetirc
| where EventInfo_Time > {startTime} and EventInfo_Time < {endTime}
| extend d_Domain = Domain
| summarize m_count = count() by bin(EventInfo_Time,1m), d_Domain`)

    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Rule Name').fill('TestRule');

    //await page.getByRole('button', { name: 'Save' }).click();

})();

    


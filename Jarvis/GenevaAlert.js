const { chromium } = require('playwright'); // Or 'chromium' or 'webkit'.
var alert = require('alert');
const path = require('path');

module.exports = async function CreateAlert(Monitor){
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext({storageState: path.join(__dirname, 'Jarvis.json')});
    context.setDefaultTimeout(600000)
    const page = await context.newPage();
    await page.goto('https://portal.microsoftgeneva.com/manage/monitors?account=PrivacyProxyMonitor');
    await page.getByRole('menuitem', { name: 'NewMonitor' }).click();
    await page.getByRole('button', {name:'Ok'}).click();
    await page.getByRole('textbox', { name: 'Monitor name' }).fill(Monitor.MonitorName);
    await page.getByRole('combobox', { name: 'Monitor state' }).selectOption('0');
    await page.getByRole('textbox', { name: 'Monitor description' }).fill(Monitor.Description??'');
    await page.getByRole('button', { name: 'Next: Monitor Logic' }).click();
    //Monitor Logic
    // Time Series
    await page.getByPlaceholder('Give a name').fill(Monitor.TimeSeries.Name);
    await page.getByPlaceholder('Enter Namespace').fill(Monitor.TimeSeries.NameSpace);
    await page.getByPlaceholder('Enter Namespace').press('Enter');
    await page.getByPlaceholder('Enter Metric').fill(Monitor.TimeSeries.Metric);
    // Expressions
    await page.locator('expression-editor:has-text("Name Advanced Options Definition × ( + Time Series Select a time series you defi")').getByRole('textbox').fill(Monitor.Expression.Name);
    //Alert Conditions
    await page.getByRole('textbox', { name: 'Field Error' }).fill(Monitor.Alert.Name);
    // Customize Incident
    await page.getByRole('button', { name: 'Next: Customize Incident' }).click();
    await page.getByRole('combobox', { name: 'Route Incident Using' }).selectOption('0');
    await page.getByPlaceholder('Routing ID').fill('AP://Autopilot/TEXTADSFRONTDOOR\\\\AdsAPIEngineerTeam');

    await page.getByPlaceholder('Specify IcM Incident Title...').fill(Monitor.ICM.Title);
    await page.getByPlaceholder('Specify IcM Incident Message...').fill(Monitor.ICM.Message);
    await page.getByPlaceholder('Specify TSG ID / link ...').fill(Monitor.ICM.TSG);

    //Diagnostic Data
    await page.getByRole('button', { name: 'Next: Diagnostic Data' }).click();
    // Dashboard setting
    await page.getByRole('row', { name: 'Add Title Auto Enrich Dashboard Configuration' }).getByRole('button', { name: 'Add' }).click();

    //await page.getByPlaceholder('Enter Title').waitFor();
    await page.getByPlaceholder('Enter Title').fill('cc');
    await new Promise(r => setTimeout(r, 1000));
    await page.getByRole('button', { name: 'add dashboard level' }).click();
    await page.getByRole('button', { name: 'Select Dashboard ' }).click();
    await page.getByRole('button', { name: 'JS Monitor' }).click();
    await page.getByRole('button', { name: 'Done' }).click();
    //
    await page.getByRole('button', { name: 'Next: Alert Reaction' }).click();
    await page.getByLabel('Auto-mitigate incident in IcM after monitor has reported healthy specified number of times.').check();
    await page.getByRole('button', { name: 'Next: Review' }).click();
    //await page.getByRole('button', {name: 'Create'}).click();

}
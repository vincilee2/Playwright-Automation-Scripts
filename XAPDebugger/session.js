const fs = require('fs');

const { chromium } = require('playwright'); // Or 'chromium' or 'webkit'.
var alert = require('alert');

(async () => {
    const browser = await chromium.launch({
        headless: true,
    });
  
    let traceId = process.argv[2];
    
    const page = await browser.newPage();
    await page.goto('http://xapservices/WorkflowDebugger/');
    
    await page.getByLabel('ID (TraceId or QueryId):').fill(traceId);

    await page.getByRole('button', { name: 'Process Query' }).click();

    await page.waitForURL('http://xapservices/WorkflowDebugger/DebugSession/**', { timeout: 60*60*1000 });

    await page.locator('input[name="SearchTerm"]').fill('AVAILABILITYHELPER');

    await page.getByRole('button', { name: 'Filter' }).click();

    await page.getByRole('link', { name: 'Ads.XapPlugins.SchemaConverters.AvailabilityHelper' }).click();

    const pageOptions = {
        path: `screenshots/${traceId}-AVAILABILITYHELPER.png`,
        type: 'png',
        fullPage: true,
    };
    await page.screenshot(pageOptions);
    await page.locator('.eventLog').screenshot({path: `screenshots/${traceId}-AVAILABILITYHELPER-Log.png`});

    const [page1] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('cell', { name: 'Plugin List' }).getByRole('link', { name: 'Plugin List' }).click()
    ]);

    await page1.locator('input[name="SearchTerm"]').fill('RECEIVERESPONSE');
    await page1.getByRole('button', { name: 'Filter' }).click();
    await page1.getByRole('cell', { name: 'OfferSelection.ReceiveResponse baseAds.PLAMain.modifiedOfferSelection.receiveResponse' }).getByRole('link', { name: 'OfferSelection.ReceiveResponse' }).click();
    
    const pageOptions2 = {
        path: `screenshots/${traceId}-RECEIVERESPONSE.png`,
        type: 'png',
        fullPage: true,
    };
    await page1.screenshot(pageOptions2);
    await page1.locator('.eventLog').screenshot({path: `screenshots/${traceId}-RECEIVERESPONSE-Log.png`});

    fs.writeFileSync(`screenshots/${traceId}.txt`, page.url() + "\n" + page1.url());
    alert('Done please check');
    browser.close();
    
})();
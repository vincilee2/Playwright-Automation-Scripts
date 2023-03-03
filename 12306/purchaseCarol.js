const { waitForTimeout, executeAt, calculateConsumingTime } = require('../common/utilities.js')
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext({
        storageState: __dirname + '/Auth.json',
        // recordVideo: {
        //     dir: "./recordings"
        // }
    });
    const page = await context.newPage();
    const ticket = 'ticket_39000D30480M_03_11'
    const date = '2023-01-28'
    await page.goto(`https://kyfw.12306.cn/otn/leftTicket/init?linktypeid=dc&fs=麻城,MCN&ts=上海,SHH&date=${date}&flag=N,N,Y`);

    await page.waitForURL('https://kyfw.12306.cn/otn/**')
    let targetTime = new Date(Date.parse('2023-01-14T15:00:00.00'))
    await executeAt(async () => {
        await checkPreOrderState(ticket, page)
    }, targetTime);
    
    await page.locator(`#${ticket}`).getByText('预订').click();
    await page.getByLabel('赵玉姣').nth(0).check();
    await page.getByRole('link', { name: '提交订单' }).click();
    await page.getByRole('link', { name: '确认' }).click();


})();

async function checkPreOrderState(ticket, page)
{
    const url = page.url();
    do {
        await page.goto(url);
        state = await page.locator(`//*[@id="${ticket}"]/td[13]`).textContent();
        console.log("state " + state);
        await waitForTimeout(50);
    } while (state != "预订")
}
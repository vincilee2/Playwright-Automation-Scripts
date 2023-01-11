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
    const ticketT168 = 'ticket_570000T1680M_05_20'
    const ticketG896 = 'ticket_5u0000G89600_03_08'
    const date = '2023-01-25'
    await page.goto(`https://kyfw.12306.cn/otn/leftTicket/init?linktypeid=dc&fs=大冶北,DBN&ts=北京,BJP&date=${date}&flag=N,N,Y`);

    await page.waitForURL('https://kyfw.12306.cn/otn/**')
    let targetTime = new Date(Date.parse('2023-01-11T18:00:00.10'))
    await executeAt(async () => {
        await checkPreOrderState(ticketG896, page)
    }, targetTime);
    
    await page.locator(`#${ticketT168}`).getByText('预订').click();
    await page.getByLabel('李文奇').nth(0).check();
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
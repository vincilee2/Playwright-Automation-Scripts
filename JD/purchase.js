const { waitForTimeout, executeAt, calculateConsumingTime } = require('../common/utilities.js')
const { chromium } = require('playwright');

async function waitForReserveStateDone(page)
{
    while (true)
    {
        await page.waitForSelector('.cart-checkbox')
        count = await page.getByText('预约').count()
        console.log("预约 " + count)
        if (count > 0) {
            console.log("reload page")
            await page.goto('https://cart.jd.com/cart_index');
            await waitForTimeout(250)
        } else {
            return
        }
    }
}

async function cleanCart(page, targetTime)
{
    await page.goto('https://cart.jd.com/cart_index');
    await page.waitForURL('https://cart.jd.com/cart_index');
    await executeAt(async () => {
        await page.goto('https://cart.jd.com/cart_index');
    }, targetTime);
    await waitForReserveStateDone(page);

    if (await page.locator('#checkedCartState').getAttribute('value') == "4")
    {
        await page.locator('input[name="select-all"]').click();
        console.log('全选 done')
    }
    console.log('等待全选结果')
    await calculateConsumingTime(async () => {
        do {
            state = await page.locator('#checkedCartState').getAttribute('value');
            console.log("state " + state);
            await waitForTimeout(50)
        } while (state == "4")
    })
    await page.getByText('去结算').click();
    await page.waitForURL('https://trade.jd.com/shopping/**');  
    console.log('结算 done')
    await page.getByText('填写并核对订单信息').waitFor();
    //await page.getByRole('button', { name: '提交订单' }).click();
    console.log('提交订单 done')
    
}

async function buy(page, url)
{
    await page.goto(url);
    await page.locator('#choose-btns').getByText('抢购').click();
    await page.locator('#choose-btns').getByText('抢购').click();
}

(async () => {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext({
        storageState: __dirname+'/Auth.json',
        // recordVideo: {
        //     dir: "./recordings"
        // }
    });
    const page = await context.newPage();
    await cleanCart(page, new Date(Date.parse('2022-12-16T20:00:00.10')))
    
})();
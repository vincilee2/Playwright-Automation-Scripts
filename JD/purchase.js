const { chromium } = require('playwright');

async function waitForTimeout(duration)
{
    await new Promise(r => setTimeout(r, duration));
}

async function executeAt(act, targetTime)
{
    console.log("should act at " + targetTime)
    let start = Date.now();
    waitForTime = targetTime - start - 100;
    console.log("should in prepare stage after " + waitForTime);
    if (waitForTime > 0) {await waitForTimeout(waitForTime);}
    while (true) {
        now = Date.now()
        if (now > targetTime) {
            console.log("act at " + now)
            await act();
            return
        }
    }

}

async function calculateConsumingTime(act)
{
    let start = Date.now();
    await act();
    let end = Date.now();
    let elapsed = end - start;
    console.log("time elapsed " + elapsed)
    return end - start;
}

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

    if (await page.locator('#checkedCartState').getAttribute('value') != "1")
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
        } while (state != "1")
    })
    await page.getByText('去结算').click();
    await page.waitForURL('https://trade.jd.com/shopping/order/getOrderInfo.action');  
    console.log('结算 done')
    await page.getByRole('button', { name: '提交订单' }).click();
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
        recordVideo: {
            dir: "./recordings"
        }
    });
    const context1 = await browser.newContext();
    const page = await context.newPage();
    await cleanCart(page, new Date(Date.parse('2022-12-11T20:00:00.010')))
    
})();
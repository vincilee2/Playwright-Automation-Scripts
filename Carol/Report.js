
// execute this script if your auth expire
// finanlly will save Auth.json
const { chromium } = require('playwright');
const path = require('path');
const dotenv = require('dotenv').config( {
    path: path.join(__dirname, '.env')
  } );

const userName = dotenv.parsed.UserName;
const password = dotenv.parsed.Password;

var alert = require('alert');
let isHeadless = process.argv[2] == "1"? true:false

async function getWeekTdIdex(frameId, page, WeekOfYearStr) {
    i = 1;
    while (i <= 4) {
        week = await page.frameLocator(frameId).locator(`//*/div[5]/table/tbody/tr[2]/td[${i}]`).allTextContents();
        // console.log(i + ": " + week[0]);
        if (week[0] == WeekOfYearStr) {
            break
        }
        i+=1;
    }
    return i;
}

async function CalulateBrandRate(frameId, brandName, page, weekIndex) {
    await page.frameLocator(frameId).locator('//*/li[4]').click();
    await page.frameLocator(frameId).locator(`input[name="${brandName}"]`).check();
    await page.frameLocator(frameId).getByRole('link', { name: '提交' }).click();
    await new Promise(r => setTimeout(r, 2000));
    weekRate = await page.frameLocator(frameId).locator(`//*/div[5]/table/tbody/tr[76]/td[${weekIndex}]`).allTextContents();
    monthRate = await page.frameLocator(frameId).locator(`//*/div[6]/table/tbody/tr[76]/td[3]`).allTextContents();
    console.log(`${brandName}: Week ${weekRate[0]}  Month ${monthRate[0]}`)
}

async function SetDate(frameId, page, dateStr) {
    await page.frameLocator(frameId).locator('#condition-time').fill(dateStr);
    await page.frameLocator(frameId).locator('#condition-time').press('Backspace');
    await page.frameLocator(frameId).getByRole('link', { name: '查询' }).click();
    await new Promise(r => setTimeout(r, 2000));
}


(async () => {
    const browser = await chromium.launch({
        headless: isHeadless
    });
    const context = await browser.newContext({storageState: __dirname+'/Auth.json', acceptDownloads: true});
    context.setDefaultTimeout(600000)
    const page = await context.newPage();

    await page.goto('https://rpt.corp.imdada.cn/report?id=MTQ3OQ&from=MTQxOA');
    
    try {
        await page.getByRole('textbox', { name: '用户名(不含@后缀)/手机号码/邮箱' }).waitFor({timeout: 1000});
        await page.getByRole('textbox', { name: '用户名(不含@后缀)/手机号码/邮箱' }).fill(userName);
        await page.getByRole('textbox', { name: '密码' }).fill(password);
        await page.getByText('获取验证码').click();
    } catch (e) {
        console.log("auth pass");
    }
    
    await page.waitForURL('https://rpt.corp.imdada.cn/**');
    // save auth.json
    await page.context().storageState({ path: __dirname+'/Auth.json'})
    
    // caculate current week of year and current month
    currentdate = new Date();
    var startDate = new Date(currentdate.getFullYear(),0,1);
    var numberOfDays = Math.floor((currentdate - startDate) / (24 * 60 * 60 * 1000));
    var weekOfYear = Math.ceil(numberOfDays / 7);
    console.log(`The week number of the current date (${currentdate}) is ${weekOfYear}.`);
    currentMonth = currentdate.getMonth() + 1;
    currentYear = currentdate.getFullYear();
    
    WeekOfYearStr = weekOfYear < 10 ? `${currentYear}W0${weekOfYear}` : `${currentYear}W${weekOfYear}`
    
    console.log(`current week of year: ${WeekOfYearStr}`)
    
    // caculate picked date
    targetMonth = currentMonth + 1;
    targetYear = currentYear;
    if (targetMonth == 13 )
    {
        targetYear += 1;
        targetMonth = 1;
    }
    
    dateStr = `${targetYear}-${targetMonth}-1 `
    console.log(`choose date: ${dateStr}`)
        
    //总部KA全渠道scorecard
    frameId = '#subject-MTcxOA';
    await page.getByRole('link', { name: '总部KA全渠道scorecard' }).click();
    await page.frameLocator(frameId).getByRole('link', { name: '履约' }).click();
    // look up by date
    await SetDate(frameId, page, dateStr)
    weekIndex = await getWeekTdIdex(frameId, page, WeekOfYearStr);
    await CalulateBrandRate(frameId, "山姆会员店", page, weekIndex);
    await CalulateBrandRate(frameId, "沃尔玛", page, weekIndex);
    await CalulateBrandRate(frameId, "永辉超市", page, weekIndex);
    await CalulateBrandRate(frameId, "华润万家", page, weekIndex);
    await CalulateBrandRate(frameId, "麦德龙", page, weekIndex);

    // 总部KA Scorecard
    frameId = '#subject-MTQxOA';
    await page.getByRole('link', { name: '总部KA Scorecard' }).click();
    await page.frameLocator(frameId).getByRole('link', { name: '履约' }).click();
    await SetDate(frameId, page, dateStr);
    weekIndex = await getWeekTdIdex(frameId, page, WeekOfYearStr);
    await CalulateBrandRate(frameId, "瑞幸咖啡直营", page, weekIndex);
    await CalulateBrandRate(frameId, "麦当劳", page, weekIndex);
    await CalulateBrandRate(frameId, "喜茶", page, weekIndex);
    await CalulateBrandRate(frameId, "代数学家", page, weekIndex);
    
    const page1 = await context.newPage();
    await page1.goto('http://mini.corp.imdada.cn/report/data/list?reportId=8183');
    //await page1.getByRole('button', { name: '附件下载' }).click();
    const [ download ] = await Promise.all([
        page1.waitForEvent('download'),
        page1.getByRole('button', { name: '附件下载' }).click()
    ]);
    // wait for download to complete
    await download.saveAs(`D:/User/zhaoyujiao/Downloads/恶劣天气-${currentYear}-${currentMonth}-${currentdate.getDate()}.xlsx`);
    // wait for the download and delete the temporary file
    await download.delete()
    alert("Done")

})();
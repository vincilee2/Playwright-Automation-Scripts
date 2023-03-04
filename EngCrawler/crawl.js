const { chromium } = require('playwright');

const TurndownService = require('turndown');
const fs = require('fs');
const markdownToDocx = require("markdown-to-document");

const url = 'https://eng.ms/docs/experiences-devices/webxt/microsoft-ads/adsdeliveryenginempsshared/bing-ads-frontdoor/ads-frontdoor-onboarding/fdnewhiredocumenation/background-knowledge';

async function extractLinks(page, level, parentPath, res) {
    const links = await page.$$('.nav.level' + level + ' > li');
  
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const title = await link.$eval('.nav-item-header', (el) => el.innerText.trim());

        const button = await link.$('button');
        if (button) {
            // console.log(parentPath, title, level);
            await button.click();
            await page.waitForSelector('.nav.level' + (level + 1), { timeout: 5000 });
            const path = parentPath ? parentPath + '-' + title : title;
            await extractLinks(page, level + 1, path, res);
            await button.click();
        } else {
            const titleLink = await link.$('a.nav-item-header');
            const href = await titleLink.getAttribute('href');
            const path = parentPath ? parentPath + '-' + title : title;
            res.push({path: path.replace(/\n/g, " "), link:`https://eng.ms${href}`});
            //console.log({ [path]: { title, href } });
        }
    }
}

async function DownloadPage(page, item, func){
    page.goto(item.link)
        await page.waitForSelector('[id="_content"]');
        const contentElement = await page.$('[id="_content"]');
        const headingElement = await contentElement.$('h1')
        //const heading = await headingElement.innerText();
        const contentHTML = await contentElement.innerHTML();
        func(item.path, contentHTML);
}

function SaveAsMarkDown(fileName, text) {
    fileName = `${fileName}.md`
    const turndownService = new TurndownService();
    let pageContentMarkdown = turndownService.turndown(text);
    fs.writeFile(fileName, pageContentMarkdown, (err) => {
        if (err) throw err;
        console.log(`Saved ${fileName} to disk.`);
    });
}

function SaveAsWord(fileName, text) {
    fileName = `${fileName}.doc`;
    const turndownService = new TurndownService();
    let pageContentMarkdown = turndownService.turndown(text);
    markdownToDocx(pageContentMarkdown).then((docxBuffer) => {
        // Write the Word document to a file
        fs.writeFileSync(fileName, docxBuffer);
        }).catch((error) => {
        console.error(error);
    });

    // const fileExists = fs.existsSync(filePath);
    // const docxBuffer = htmlDocx.asBlob(text);
    // if (fileExists) {
    //     // Append the buffer to the end of the existing file
    //     fs.appendFileSync(filePath, docxBuffer);
    // }
    // else {
    //     fs.writeFileSync(filePath, docxBuffer);
    // }
}

(async () => {
    const browser = await chromium.launch({
        headless: true
    });
    const context = await browser.newContext({
        storageState: __dirname+'/Auth.json',
    });
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForSelector('[id="_content"]');
      // call the function with initial level and parent path
    let allLinks = [];
    await extractLinks(page, 1, '', allLinks);  
    //console.log(allLinks);
    for (const item of allLinks) {
        await DownloadPage(page, item, SaveAsWord)
    }
    await browser.close();
    
})();
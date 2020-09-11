const core = require('@actions/core');
const puppeteer = require('puppeteer');
let browser, page;

async function snap(url, file) {
    try {
        await page.setViewport({
            width: 1024,
            height: 512,
            deviceScaleFactor: 2
        });
        await page.goto(url);
        await page.screenshot({ path: file, type: 'png' });
    }
    catch (error) {
        console.log('err :', error);
    }
}


(async () => {
    browser = await puppeteer.launch({
        // headless: false,
        product: 'firefox',
        extraPrefsFirefox: {
            // Enable additional Firefox logging from its protocol implementation
            // 'remote.log.level': 'Trace',
        },
        // Make browser logs visible
        dumpio: true,

    });
    page = await browser.newPage();
    let boldText = core.getInput("bold-text");
    let plainText = core.getInput("plain-text");

    const url = `https://og-image.now.sh/**${boldText}**%20${plainText}?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`;
    const segments = url.split("/");
    const slug = segments[segments.length - 2];
    let path = `${slug}.png`;
    await snap(url, path);

    await browser.close();
    console.log('Done!');
    core.setOutput("image", "open graph image downloaded in root directory");
})();
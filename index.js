const core = require('@actions/core');
const webshot = require('webshot-node');

// let browser, page;

async function snap(url, file) {
    try {
        let options = {
            shotSize: {
                width: 1024,
                height: 512,
            },
            windowSize: {
                width: 1024,
                height: 768
            }
        }
        await webshot(url, file, options, function (err) {
            // screenshot now saved to google.png
            console.log("screenshot captured")
        });
    }
    catch (error) {
        console.log('err :', error);
    }
}


(async () => {
    let customTheme = "light";
    let boldText = core.getInput("bold-text");
    let plainText = core.getInput("plain-text");

    // check if bold text is available
    if (boldText.length > 0)
        boldText = `**${boldText}**`

    if (core.getInput("theme"))
        customTheme = core.getInput("theme");

    const url = `https://og-image.vercel.app/${boldText}%20${plainText}?theme=${customTheme}&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`;
    const segments = url.split("/");
    const slug = segments[segments.length - 2];
    let path = `${slug}.png`;
    await snap(url, path);

    // await browser.close();
    console.log('Done!');
    core.setOutput("image", "open graph image downloaded in root directory");
})();
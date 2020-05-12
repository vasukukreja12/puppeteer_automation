let puppeteer = require("puppeteer");
let cFile = process.argv[2];
let fs = require("fs");
let pUrl = process.argv[3];
(async function () {
  
  try {
    let data = await fs.promises.readFile(cFile);
    let { url, pwd, user } = JSON.parse(data);

    let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized", "--disable-notifications"]
    });

    let tabs = await browser.pages();
    let tab = tabs[0];
    
    await tab.goto(url, { waitUntil: "networkidle2" });
    await tab.waitForSelector("input[type=email]");
    await tab.type("input[type=email]", user, { delay: 20 });
    await tab.type("input[type=password]", pwd, { delay: 20 });
    await Promise.all([
      tab.click("button[type=submit]"), tab.waitForNavigation({
        waitUntil: "networkidle2"
      })
    ])
    
    await tab.goto(pUrl, { waitUntil: "networkidle2" });
    await page.screenshot({ path: './image.png', fullPage: true });
  } catch (err) {
    console.log(err)
  }
})()

const puppeteer = require('puppeteer');
require('dotenv').config();

const CHROME_OPTIONS = {
    headless: false,
    slowMo: 10,
    defaultViewport: null,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
};

const browser = await puppeteer.launch(CHROME_OPTIONS);

/*
*Args: page => a valid page instance 
*returns: a page promise
*/
async function login(page)
{
    await page.goto("https://www.linkedin.com/", {
        waitUntil: "networkidle2",
        timeout: 0
    })
    await page.waitForTimeout(5000); //5 seconds
    
    await page.waitForSelector("#session_key");
    await page.waitForSelector("#session_password");

    await page.type("#session_key", process.env.SESSION_ID);
    await page.type("#session_password", process.env.SESSION_PASS);

    await page.click(".sign-in-form__submit-button");

    return Promise.resolve(page);  
}

/* handle2FA
*Args: page => a browser instance page,
*      pins => an array of lenght >= 1 for pins to verify against 
* returns: page
*/
async function handle2FA(page, pins) {
    let pinsTried = 0
    let success = false;

    await page.waitForSelector(".input_verification_pin");
    while(pinsTried < pins.length && (!success))
    {
        let pin = pins[pinsTried];
        await page.type(".input_verification_pin", pin);
        await page.click("#two-step-submit-button");
        await page.waitForTimeout(3000);
        const error_banner = (await page.$x('span[@class="body__banner--error"]'));
        if(error_banner.length == 0)
        {
            success = true;
            console.log("Success verifying pin");
            break;
        }       
        pinsTried++;
    }    
}

module.exports = {
    browser, 
    login,
    handle2FA
};
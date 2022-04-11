const {login} = require('./login');

async function marketeer(linkedin_profile_link, message)
{
    const page = await login();
    await page.goto(linkedin_profile_link,{
        waitUntil: "networkidle2",
        timeout: 0
    });
    console.log(`Finished loading: ${linkedin_profile_link}`)
    await page.waitForTimeout(4000); //5 seconds 
    await page.waitForXPath("/html/body/div[7]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[1]/h1");
    const fn = await page.$x("/html/body/div[7]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[1]/h1/text()");
    
    //get linkedin profile user profile's firstname
    const first_name = await page.evaluate(el =>{ return el.textContent.trim().split(" ")[0] }, fn[0]);
   
    //is there a connect button for this user?
    await page.waitForXPath("/html/body/div[7]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[3]/div/button");
    const connect_button = (await page.$x("/html/body/div[7]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[3]/div/button"))[0];
    //click connect button
    connect_button.click();

    //perhaps want to send the user a custom note
    await page.waitForXPath("/html/body/div[3]/div/div/div[3]/button[1]");
    const add_note_button = (await page.$x("/html/body/div[3]/div/div/div[3]/button[1]"))[0]
    add_note_button.click();
    await page.waitForTimeout(2000);
    //enter custom note in textarea
    await page.type("#custom-message", message);
    await page.waitForTimeout(1000); //1s wait
    const send_button = (await page.$x("/html/body/div[3]/div/div/div[3]/button[2]"))[0];
    send_button.click(); //send message

}

module.exports = marketeer;
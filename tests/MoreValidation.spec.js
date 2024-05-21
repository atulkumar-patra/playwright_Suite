 

////@NewFile//// 

 

const {test, expect} = require('@playwright/test') 

 

 

test("Popup Validation testcase", async({page})=>{ 

 

    await page.goto("https://google.com"); 

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); 

 

    // //move backward 

    // await page.goBack(); 

    // //move foreward 

    // await page.goForward(); 

 

 

    //assertion of visibility 

    await expect(page.locator("#displayed-text")).toBeVisible(); 

 

    await page.locator("#hide-textbox").click(); 

 

    //to be hidden 

    await expect(page.locator("#displayed-text")).toBeHidden(); 

 

    //handle alerts/dialog 

    //this will acts as listener, so whenev dialog appears it will trigger the action 

    //to accept/clk ok 

    page.on('dialog', dialog => dialog.accept()); 

    //to dismiss/cancel/reject 

    //page.on('dialog', dialog => dialog.dismiss()); 

 

    await page.locator("#confirmbtn").click(); //invoke alert 

 

 

    //mouse Hover 

    await page.locator("#mousehover").hover(); 

    await page.getByText("Top").click(); 

 

    //Frames handling 

    //first switch to frame then do actions  

    const framePageObj = page.frameLocator("#courses-iframe"); 

    await framePageObj.locator("li a[href *= 'lifetime-access']:visible").click() 

////in above we have used " :visible" in locator, to select the element which is not diabled/ only visible 

//cause in above locator> "li a[href *= 'lifetime-access']" > we r gettign 2 element> 1 is visible and other one is not 

//so we r using :visible to select visibled one 

 

//validating inside the frame 

const textChk = await framePageObj.locator(".text h2").textContent(); 

console.log(textChk.split(" ")[1]); 

 

 

     

 

 

}); 

 


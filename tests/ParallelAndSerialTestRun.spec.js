

////@NewFile//// 

 

 

const { test, expect } = require('@playwright/test') 

 

//since test in file runs sequentially and ths files run parallely, we can make eve the test to run parallely >>> 

 

//TO RUN BELOW TEST PARRALLELY > 

test.describe.configure({ mode: 'parallel'}); 

 

//BUT IN SERIAL MODE IN CONFIG, TEST R INTERDEPENDENT?? 

//LIKE IF ONE TEST FAILES , REMAINING NEXT TEST ARE GOINT TO SKIPED 

///test.describe.configure({ mode: 'serial'}); 

 

 

test("Screenshot TC1", async ({ page }) => { 

 

    await page.goto("https://google.com"); 

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); 

    await expect(page.locator("#displayed-text")).toBeVisible(); 

 

    //ss of locator level/particular elemnt 

    await page.locator('#displayed-text').screenshot({path: 'partialElementSS.png'}); 

 

    await page.locator("#hide-textbox").click(); 

 

    //ss of whole page 

    await page.screenshot({path: 'screenshot.png'}); 

 

 

    await expect(page.locator("#displayed-text")).toBeHidden(); 

 

 

}); 

 

//visual testing 

//it means playwright can match up between screenshots- of old and new and can validate the difference 

//first it will take ss if running for the first time and tc will fail but it will store the ss now 

//then again when we run > it will go and take the ss > validate with old one that was taken prev.  

test("Visual testing1", async ({ page }) => { 

 

    await page.goto("https://google.com/"); 

     

    expect(await page.screenshot()).toMatchSnapshot('landing.png'); 

    //in above '.toMatchSnapshot()' will go and capture the ss if not available in the name landing.png 

    //then again when we run it will apply expect fun on the ss  

    //NOTE: if first timerunnig and no ss present, it will capture the SS and ofcourse TC will fail 

 

}); 

 
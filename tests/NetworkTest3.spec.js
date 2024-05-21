
////@NewFile//// 

 

 

//BLOCKING THE API CALL ITSELF 

//here we will block any of the call that being made in front end 

 

 

const { test, expect } = require('@playwright/test'); 

const { request } = require('http'); 

 

 

 

 

 

test('TC on type of Locators', async ({ browser }) => { 

 

    const context = await browser.newContext(); 

    const page = await browser.newPage(); 

 

    const userName = page.locator("#username"); 

    const passWord = page.locator("[type = 'password']"); 

    const signinbtn = page.locator("[id = 'signInBtn']"); 

    const cardtitles = page.locator(".card-body a"); 

 

 

    //we will block a css that being called so>> 

    //here '**/*' means > any url that is opened in goto(). and extension .css to block specific call that is css here 

    ///// **/*.css' 

     

    //lets try to block images in the web >> 

    page.route('**/*.{jpg,png,jpeg}', 

    route=> route.abort() 

    ); 

 

    //playwright listens to every call that r being made in front-end 

    page.on('request', request=> console.log(request.url())); //here we r getting all urls that r being called in front end 

    page.on('response', response=> console.log(response.url(), response.status()));//here we r getting status of responses 

 

 

 

     

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 

 

    await userName.fill("rahulshettyacademysssss"); 

    await passWord.fill("learningddd"); 

    await signinbtn.click(); 

 

    console.log(await page.locator("[style*='block']").textContent()); 

    await expect(page.locator("[style *= 'block']")).toContainText('Incorrect'); 

    //fill blank so that it will remove prev strings 

    await userName.fill(""); 

    await userName.fill("rahulshettyacademy"); 

    await passWord.fill(""); 

    await passWord.fill("learning"); 

    await signinbtn.click(); 

    //traversing PArent > child 

    //console.log(await page.locator(".card-body a").textContent()); 

    //to get first element of the child> nth(index) > it will put child to an array and get the child with matching index 

    console.log(await page.locator(".card-body a").nth(0).textContent()); 

    console.log(await page.locator(".card-body a").first().textContent()); 

    console.log(await cardtitles.nth(1).textContent()); 

    //to get all child 

    console.log(await cardtitles.allTextContents()); 

 

 

 

}); 

 

 

 
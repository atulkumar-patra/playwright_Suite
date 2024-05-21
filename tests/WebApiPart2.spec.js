
 

////@NewFile//// 

 

//another way we can implement api is >> 

//first time login>> get all the details like cookies/token etc.. and store it in a .json file 

//then next time when we run the TC, we can inject above .json file to .newContext so that it will get all files that req to open the page 

//in that we dont need to get 1 by 1 all files, instead we can get all at once > use it for all TCs 

const { test, expect } = require('@playwright/test'); 

//create global context 

let webContext; 

 

 

test.beforeAll( async({browser})=>{ 

 

    const context = await browser.newContext(); 

    const page = await context.newPage(); 

 

    await page.goto("https://rahulshettyacademy.com/client"); 

    const useremailProp = page.locator("#userEmail"); 

    const userpasswordProp = page.locator("#userPassword"); 

    const loginProp = page.locator("[name='login']"); 

 

    //login 

    const emailId = "fname@gmail.com"; 

    await useremailProp.fill(emailId); 

    await userpasswordProp.fill("Fname@1234"); 

    await loginProp.click(); 

    await page.waitForLoadState('networkidle'); 

 

    //now We Get the storage details(cookies and all) by .storageState() method 

    await context.storageState({path: 'state.json'}); 

    //now we will inject above json to a new context of browser 

    webContext = await browser.newContext({storageState: 'state.json'}); 

 

 

}); 

 

 

test('ClientApp Login', async () => { 

 

    //now use webContext here to create a new page instance with injected json 

   const page = await webContext.newPage();//we dont need to pass page in async method here cause we r using existing one 

 

   await page.goto("https://rahulshettyacademy.com/client"); 

    //e2e 

    const productNameToValidate = 'IPHONE 13 PRO';//we r looking for this prod. and will add this to cart. This is we r going to deal with in this test 

    const products = page.locator(".card-body"); 

    const emailId = "fname@gmail.com"; 

    await page.locator(".card-body b").first().waitFor(); 

    console.log(await page.locator(".card-body b").allTextContents()); 

 

    //get the product count so that we can travers thru it and look for particular product 

    const count = await products.count(); 

    for (let i = 0; i < count; ++i) { 

 

        //now look for product namme wise 

        //we can use .locator again like chaining 

        //to look for can use ''nth()' for it 

        const pname = await products.nth(i).locator("b").textContent(); //it will start looking from only here> page.locator(".card-body"); 

        if (pname === productNameToValidate) { 

            //if matched then > add to cart 

            //again we can use same parent locator and use chain method 

            await products.nth(i).locator("text = Add To Cart").click();//locator by text 

 

            break;//product found so ne need to go further 

        } 

    } 

    //click on CART 

    await page.locator("[routerlink *= 'cart']").click(); 

    //wait function,to be loaded>wait for 

    await page.locator("div li").first().waitFor(); 

    //we r using above wait cause > for "isVisible()" method play wright dont give auto wait 

    //validate added prod is in CART 

    //search for product name with locator dynamically 

    const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible(); 

    expect(bool).toBeTruthy(); 

 

    //click Checkout 

    await page.locator("text = Checkout").click(); 

 

    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 }); 

    const dropDownOption = page.locator(".ta-results"); 

    await dropDownOption.waitFor(); 

    const optionCount = await dropDownOption.locator("button").count(); 

    //look for desired text 

    for (let i = 0; i < optionCount; i++) { 

        const dText = await dropDownOption.locator("button").nth(i).textContent(); 

        if (dText === " India") { 

            //matches >?> clk 

            await dropDownOption.locator("button").nth(i).click(); 

            break; 

        } 

    } 

 

    //validate email which is in gray color 

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailId); 

 

    //clk on place order 

    await page.locator(".action__submit").click(); 

    //validate Thank you for the order text 

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); 

    //grab the order id 

    const orderIdText = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); 

    console.log("Order Id: " + orderIdText); 

    //clik on my order 

    await page.locator("[routerlink = '/dashboard/myorders'] i").click(); 

    await page.locator("tbody").waitFor(); 

    const orderTabs = page.locator("tbody tr");//parent child > common locator 

 

    const orderCount = await orderTabs.count(); 

    for (let i = 0; i < orderCount; i++) { 

        const oId = await orderTabs.nth(i).locator("th").textContent(); 

        //console.log("order id in my order: "+oId); 

        if (orderIdText.includes(oId)) { 

            await orderTabs.nth(i).locator("button").first().click(); 

            break; 

        } 

    } 

 

 

    const oidInView = await page.locator(".col-text").textContent(); 

    expect(orderIdText.includes(oidInView)).toBeTruthy(); 

 

 

 

}); 

 
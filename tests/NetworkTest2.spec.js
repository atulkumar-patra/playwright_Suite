 


////@NewFile//// 

 

//FAKING/INTERCEPTING THE REQUEST  

//here we will send a request by faking it with diff details 

 

const { test, expect, request } = require('@playwright/test'); 

 

test('Security test request intercept', async ({ page }) => { 

 

    //login > to orders page> clk on view btn 

    const useremailProp = page.locator("#userEmail"); 

    const userpasswordProp = page.locator("#userPassword"); 

    const loginProp = page.locator("[name='login']"); 

    //login 

    await page.goto("https://rahulshettyacademy.com/client"); 

    const emailId = "fname@gmail.com"; 

    await useremailProp.fill(emailId); 

    await userpasswordProp.fill("Fname@1234"); 

    await loginProp.click(); 

    await page.waitForLoadState('networkidle'); 

    await page.locator(".card-body b").first().waitFor(); 

 

    //clik on my order 

    await page.locator("[routerlink = '/dashboard/myorders'] i").click(); 

 

 

    //in myorder page>>> 

 

    //    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=65eec9cca86f8f74dc986c6e") 

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", 

        route => route.continue( 

            { 

                url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884053f6765465b6" //we r faking url itself here in request with some other order id which doent belong to the user orders 

            })//ex->cont with modified req body  

        //here we r expecting notFound/unauthorized error cause this order we r giving in request  

        //it will be a security violationType 

 

    ); 

    await page.locator("button:has-text('View')").first().click(); 

    //after clk on view> 1 request call will happen with respective order id 

 

    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order") 

 

 

}) 

 

 

 

 
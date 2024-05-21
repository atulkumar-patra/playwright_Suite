
 

////@NewFile//// 

 

//request > used for api auto. 

const { test, expect, request } = require('@playwright/test'); 

const {APIUtils} = require('../utils/APIUtils'); 

 

 

//payload/body of login api 

const loginPayLoad = {userEmail: "fname@gmail.com", userPassword: "Fname@1234"}; 

const orderPayLoad = {orders: [{country: "India", productOrderedId: "6581ca979fd99c85e8ee7faf"}]} 

 

  

let respo; // this object will have js object passed from createOrder() 

 

//before all Test 

test.beforeAll( async ()=> 

{ 

    //define conetext for api 

    const apiContext =  await request.newContext(); 

    //call the util class where api functions r defined and define object of it 

    //call api utils here and pass api context and payload 

    const apiUtils = new APIUtils(apiContext,loginPayLoad); 

    //get token 

    //token = apiUtils.getToken(); //not working 

    //call the api from util to get the orderId, pass order payload to the func. 

    respo = await apiUtils.createOrder(orderPayLoad); 

 

}); 

 

//before each test 

test.beforeEach( ()=> 

{ 

 

}); 

 

 

//here we will skip fronend work instead we will directly send the details to API lets say > login details to login (example) 

test('API_Web Automation TCs', async ({ page }) => { 

 

 

    //here we will directly use token>insert into the browser > Application >so that it will open directly 

    page.addInitScript(value => { 

        window.localStorage.setItem('token',value); 

    }, respo.token  );//for login 

 

    await page.goto("https://rahulshettyacademy.com/client"); 

 

    //clik on my order 

    await page.locator("[routerlink = '/dashboard/myorders'] i").click(); 

    await page.locator("tbody").waitFor(); 

    //will validate the order id in my order section 

    const orderTabs = page.locator("tbody tr");//parent child > common locator 

    const orderCount = await orderTabs.count(); 

    for (let i = 0; i < orderCount; i++) { 

        const oId = await orderTabs.nth(i).locator("th").textContent(); 

        //console.log("order id in my order: "+oId); 

        if (respo.orderId.includes(oId)) { 

            await orderTabs.nth(i).locator("button").first().click(); 

            break; 

        } 

    } 

 

 

    const oidInView = await page.locator(".col-text").textContent(); 

    expect(respo.orderId.includes(oidInView)).toBeTruthy(); 

 

 

 

}); 

 

 

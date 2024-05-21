

 

////@NewFile//// 

 

//request > used for api auto. 

const { test, expect, request } = require('@playwright/test'); 

 

//TC: 

//verify if Order created is showing in history 

//Pre-Condition > create order(this we have to do with API, cause its not needed in this TC objective) 

//Objective: Order is showing in history 

//So if we have API which can create order then we can automate that > to land or search the order in order history 

 

//step1: login thru api 

//step2: find the API which will create the order 

// 

 

 

//payload/body of login api 

const loginPayLoad = {userEmail: "fname@gmail.com", userPassword: "Fname@1234"}; 

const orderPayLoad = {orders: [{country: "India", productOrderedId: "6581ca979fd99c85e8ee7faf"}]} 

 

let token; 

let orderId; 

 

//before all Test 

test.beforeAll( async ()=> 

{ 

 

    //login api req 

   const apiContext =  await request.newContext(); 

   //for post method 

   //pass URL and body/payload 

   //will get the response 

   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 

    { 

    data:loginPayLoad 

    }) 

    //chk status code > 200 

    expect(loginResponse.ok()).toBeTruthy(); 

    //get the response body in json format 

    const loginResponseJsonBody = await loginResponse.json(); 

    //get specifc key-value from response 

    token = loginResponseJsonBody.token; 

    console.log(token); 

 

 

    ///Order api req  

    const orderResppnse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 

    { 

        data: orderPayLoad, 

        headers:{ 

            'Authorization' : token, 

            'Content-Type'  : 'application/json' 

        }, 

    }) 

    const orderResponseJsonBody = await orderResppnse.json(); 

    console.log(orderResponseJsonBody); 

    orderId = orderResponseJsonBody.orders[0]; 

    console.log(orderId); 

 

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

    }, token  );//for login 

 

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

        if (orderId.includes(oId)) { 

            await orderTabs.nth(i).locator("button").first().click(); 

            break; 

        } 

    } 

 

    //await page.locator(".col-text").waitFor(); 

    const oidInView = await page.locator(".col-text").textContent(); 

   // await page.pause(); 

    expect(orderId.includes(oidInView)).toBeTruthy(); 

 

    //await page.pause(); 

 

}); 

 

 

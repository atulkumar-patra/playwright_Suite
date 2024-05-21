
////@NewFile//// 

 

 

//FAKING/INTERCEPTING THE RESPONSE >SENDING TO FRONT-END> GET DESIRED OBJECTIVE 

 

//here we will try to mock the api > we will try to hit false response so that we can validate our desired case 

//lets say in my order , orders r showing , after delete of all orders> it will show No order msg in the page 

//but we dont want to delete the orders> instead we will hit the api/mock the api in which response is No order msg presnt 

//then we will validate it > like we will re-Route the api in our way 

 

const { test, expect, request } = require('@playwright/test'); 

const { APIUtils } = require('../utils/APIUtils'); 

 

 

//payload/body of login api 

const loginPayLoad = { userEmail: "fname@gmail.com", userPassword: "Fname@1234" }; 

const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6581ca979fd99c85e8ee7faf" }] } 

//fake resp body 

//this body declared is in Js format not in json > so when sending it make sure to convert it to JSON using "stringfy" 

const fakePayLoadOrders = { data: [], message: "No Orders" };//get it from actual resp when no order is there 

 

 

let respo; // this object will have js object passed from createOrder() 

 

//before all Test 

test.beforeAll(async () => { 

    //define conetext for api 

    const apiContext = await request.newContext(); 

    const apiUtils = new APIUtils(apiContext, loginPayLoad); 

    respo = await apiUtils.createOrder(orderPayLoad); 

 

}); 

 

//before each test 

test.beforeEach(() => { 

 

}); 

 

 

//here we will skip fronend work instead we will directly send the details to API lets say > login details to login (example) 

test('API_Web Automation TCs', async ({ page }) => { 

 

    page.addInitScript(value => { 

        window.localStorage.setItem('token', value); 

    }, respo.token);//for login 

    await page.goto("https://rahulshettyacademy.com/client"); 

 

 

    //HERE we will re route the api in our way 

    //await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/65d18ad4a86f8f74dc7c182f", 

    ///here we r using * for all user to be accepted casue in above url used for unique user logged in > 65d18ad4a86f8f74dc7c182f 

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 

        async route => { 

            //intercepting response> get API resp >> HERE WE WILL CHAGNGE IN OUR WAY(MODIFY TO A FAKE RESP TO GET OUR OBJECTIVE) >>sent to browser > render data on frontend 

            //> GET THE REAL RESP > FAKE IT ACC TO OWN OBJECTIVE > SEND TO FRONTEND  

            const response = await page.request.fetch(route.request());//fetch the response with injected details,fake response 

            let body = JSON.stringify(fakePayLoadOrders); //declared value is in js format globally so making it json so can be passed as resp json 

            route.fulfill( //.fullfill> to intercept response 

                { 

                    response, 

                    body, 

                }); 

        }); 

 

    //clik on my order 

    await page.locator("[routerlink = '/dashboard/myorders'] i").click(); 

 

    //await page.pause(); 

 

    //put some delay to get response so that it can get the response>create a fake resp> send it to front 

    //await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/65d18ad4a86f8f74dc7c182f"); 

    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"); 

 

    console.log(await page.locator(".mt-4").textContent()); 

 

 

 

    // await page.locator("tbody").waitFor(); 

    // //will validate the order id in my order section 

    // const orderTabs = page.locator("tbody tr");//parent child > common locator 

    // const orderCount = await orderTabs.count(); 

    // for (let i = 0; i < orderCount; i++) { 

    //     const oId = await orderTabs.nth(i).locator("th").textContent(); 

    //     //console.log("order id in my order: "+oId); 

    //     if (respo.orderId.includes(oId)) { 

    //         await orderTabs.nth(i).locator("button").first().click(); 

    //         break; 

    //     } 

    // } 

    // const oidInView = await page.locator(".col-text").textContent(); 

    // expect(respo.orderId.includes(oidInView)).toBeTruthy(); 

 

 

 

}); 

 

 

 

 
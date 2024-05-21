////@NewFile//// 

 

 

const { test, expect } = require('@playwright/test'); 

//import loginpage.js 

// const {LoginPage} = require('../pageobjects/LoginPage');//double dot to look file outside of this folder and single dot for look in same folder 

// const { DashboardPage } = require('../pageobjects/DashboardPage'); 

 

//importing POManager as it has above object 

const { POManager } = require('../pageobjects/POManager'); 

 

//define testdata in a json files and import it here.  

//  const dataset = JSON.parse(require('../utils/ClientAppPageObjectModelTestData.json'));//but the json defined we have to convert to js object by JSON parsing 

//above parsing(JSON > js object) sometime fails due to encoding 

//to avoid fail in parsing>> convert JSON > string > js object >>> so> 

const dataset = JSON.parse(JSON.stringify(require('../utils/ClientAppPageObjectModelTestData.json'))); 

 

 

//TO USE FIXTURE OF PLAYWRIGHT TO HANDLE TESTDAT AS AN ALTERNATE OF JSON TESTDATA 

const { customtest } = require('../utils/test-base'); 

 

 

 

//LETS SAY WE WANT TO SEND MULTIPLE SET OF DATA FROM JSON 

//THEN WE HAVE TO SEND JSON AS IN ARRAY FORMAT AND USE A "FOR-LOOP" FOR THE TESTCASE SO THAT IT COULD TRAVERS THRU EACH INDEX OF ARRAY(IN EACH INDEX WE HAVE DIFF TEST-DATA) 

for (const data of dataset) { 

 

    //BUT HERE TESTCASE NAME WE HAVE TO CHANGE FOR EACH TESTDATA >> SO WE WILL USE "`" > THIS SYMBOL TO CHANGE THE NAME LIKE BELOW 

    test(`Client App Login for ${data.productName}`, async ({ page }) => { 

 

        //calling the Page object manager as it has all objects of the pages 

        const poManager = new POManager(page); 

        //after declaring this we can remove individual object of the pages 

 

        //test data 

        //  const productName = 'IPHONE 13 PRO'; 

        //  const username = "fname@gmail.com"; 

        //  const userPass = "Fname@1234"; 

        //ABOVE WE HAVE DEFINED IN JSON FILE AND CALLED AS IN "dataset" >>> 

        //so directly call the values 

 

 

        const countryCode = "ind"; 

        const countryName = " India"; 

        const orderConfirmedMessage = " Thankyou for the order. "; 

        let orderIdText; 

 

        //login 

        //calling login js to access it locators 

        //const loginPage = new LoginPage(page);//not needed this cause we calling/defined in POManager js file 

        const loginPage = poManager.getLoginPage(); 

        // 

        await loginPage.goTo(); 

        await loginPage.validLogin(data.username, data.userPass); 

 

        //dashboard js file call 

        //const dashboardPage = new DashboardPage(page);//commented as its defined in POManaer js class  

        const dashboardPage = poManager.getDashboardPage(); 

        await dashboardPage.searchProductAddCart(data.productName); 

        await dashboardPage.navigateToCart(); 

 

 

        //cart page 

        const cartPage = poManager.getCartPage(); 

        await cartPage.VerifyProductIsDisplayed(data.productName); 

        await cartPage.Checkout(); 

 

 

        //order confimation and review page 

        const orderreviewPage = poManager.getOrderReviewPage(); 

        await orderreviewPage.searchCountryAndSelect(countryCode, countryName); 

        await orderreviewPage.validateEmailId(data.username); 

        await orderreviewPage.placeOrder(); 

        await orderreviewPage.validateSuccessOrderMessage(orderConfirmedMessage); 

        orderIdText = await orderreviewPage.getTheOrderId(); 

        console.log(orderIdText); 

 

        //clk myorder 

        await dashboardPage.navigateToMyOrders(); 

 

        //order history page 

        const orderhistorypage = poManager.getOrderHistoryPage(); 

        await orderhistorypage.searchOrderAndSelect(orderIdText); 

        expect(orderIdText.includes(await orderhistorypage.getOrderId())).toBeTruthy(); 

 

        //await page.pause(); 

 

    }); 

 

}; 

 

 

//HERE ANOTHER custom TEST TO MAKE USE OF FIXTURE TESTDATA INSTEAD OF JSON similar to ABOVE ONE 

//here we created custom fixture like "page"/"browser" etc.. for TESTDATA and passed below to use the testdata 

customtest(`Client App Login Using fixture testdata`, async ({ page, testDataForOrder }) => { 

 

    //calling the Page object manager as it has all objects of the pages 

    const poManager = new POManager(page); 

 

    const countryCode = "ind"; 

    const countryName = " India"; 

    const orderConfirmedMessage = " Thankyou for the order. "; 

    let orderIdText; 

 

    //login 

    //calling login js to access it locators 

    //const loginPage = new LoginPage(page);//not needed this cause we calling/defined in POManager js file 

    const loginPage = poManager.getLoginPage(); 

    // 

    await loginPage.goTo(); 

    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.userPass); 

 

    //dashboard js file call 

    //const dashboardPage = new DashboardPage(page);//commented as its defined in POManaer js class  

    const dashboardPage = poManager.getDashboardPage(); 

    await dashboardPage.searchProductAddCart(testDataForOrder.productName); 

    await dashboardPage.navigateToCart(); 

 

 

    //cart page 

    const cartPage = poManager.getCartPage(); 

    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName); 

    await cartPage.Checkout(); 

 

 

}); 

 


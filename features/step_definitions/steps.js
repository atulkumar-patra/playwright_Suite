const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test'); //define in var and not in curly brace
//var
const countryCode = "ind";
const countryName = " India";
const orderConfirmedMessage = " Thankyou for the order. ";
let orderIdText;



Given('Login to Ecommerce app with {string} and {string}', { timeout: 100 * 1000 }, async function (username, userPass) {


    this.username = username;//make it global so we can use in other method


    //moved below to hooks.js///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // //since page dont have any value cause its in cucumber
    // //we have to define it manually thru 'browser'
    // //but 'browser also needs to be defined >>> so we r importin playwright from require('@playwright/test');
    // const browser = await playwright.chromium.launch({ headless: false });
    // const context = await browser.newContext();
    // const page = await context.newPage();



    // ////const poManager = new POManager(page);//this poManager has limited to this given method only. but we can make it global(global constructor) by inserting "this."
    // this.poManager = new POManager(page);
    //moved below to hooks.js///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(this.username, userPass);


});


When('Add {string} to cart', { timeout: 100 * 1000 }, async function (productName) {
    //dashboard js file call
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();


});


Then('Verify {string} is displayed in the cart', { timeout: 100 * 1000 }, async function (productName) {
    //cart page
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();


});


When('Enters valid details and place the order', async function () {
    //order confimation and review page
    const orderreviewPage = this.poManager.getOrderReviewPage();
    await orderreviewPage.searchCountryAndSelect(countryCode, countryName);
    await orderreviewPage.validateEmailId(this.username);
    await orderreviewPage.placeOrder();
    await orderreviewPage.validateSuccessOrderMessage(orderConfirmedMessage);
    orderIdText = await orderreviewPage.getTheOrderId();
    console.log(orderIdText);


});


Then('Verify order placed in myorder page', async function () {
    //clk myorder
    await this.dashboardPage.navigateToMyOrders();


    //order history page
    const orderhistorypage = this.poManager.getOrderHistoryPage();
    await orderhistorypage.searchOrderAndSelect(orderIdText);
    expect(orderIdText.includes(await orderhistorypage.getOrderId())).toBeTruthy();



});


////////////////////////////////////////////////////////////////////////


Given('Login to Ecommerce2 app with {string} and {string}', async function (user, pass) {
    //to open url
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");


    await this.page.locator("#username").fill(user);


    await this.page.locator("[type = 'password']").fill(pass);


    await this.page.locator("[id = 'signInBtn']").click();






});



Then('Verify Error message', async function () {


    console.log(await this.page.locator("[style*='block']").textContent());


    await expect(this.page.locator("[style *= 'block']")).toContainText('Incorrect');





});


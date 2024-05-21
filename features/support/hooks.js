const { Before, After, BeforeAll, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');



Before({ timeout: 100*1000},async function () {
    //since page dont have any value cause its in cucumber
    //we have to define it manually thru 'browser'
    //but 'browser also needs to be defined >>> so we r importin playwright from require('@playwright/test');
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();



    ////const poManager = new POManager(page);//this poManager has limited to this given method only. but we can make it global(global constructor) by inserting "this."
    this.poManager = new POManager(this.page);//this poManager is in world constructor(this.)   so no need to pass it to the step def
})


BeforeStep(function () {


});


AfterStep(async function ({ result }) {//here it will capture ss after every steps if fails


    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: './screenshots/ss.png' });


    }
})



After(function () {
    console.log("this after method, closing browser/exit")
})



////we can filter our hooks wrt tags
// After({ tags: "@ValidationTC" }, function () {
//     console.log("testing hooks/filtering it with tags");
// })
// Before({ tags: "@ValidationTC" }, async function () {
//     const browser = await playwright.chromium.launch({ headless: false });
//     const context = await browser.newContext();
//     this.page = await context.newPage();
//     this.poManager = new POManager(this.page);


// })



// Before({ tags: "@foo" }, function () {
//     // This hook will be executed before scenarios tagged with @foo
// });


// Before({ tags: "@foo and @bar" }, function () {
//     // This hook will be executed before scenarios tagged with @foo and @bar
// });


// Before({ tags: "@foo or @bar" }, function () {
//     // This hook will be executed before scenarios tagged with @foo or @bar
// });


// // You can use the following shorthand when only specifying tags
// Before("@foo", function () {
//     // This hook will be executed before scenarios tagged with @foo
// });
////@NewFile//// 

 

const {test,expect} = require('@playwright/test'); 

const exp = require('constants'); 

 

test("Calender validation TCs", async ({page})=> 

{ 

 

    const monthNo = "6"; 

    const dateNo = "12"; 

    const yearNo = "2029"; 

 

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers"); 

 

    //calender prop > parent >clk on it so tht Calender will popup 

    await page.locator(".react-date-picker__inputGroup").click(); 

 

    //clk on month>clk on year to select year 

    await page.locator(".react-calendar__navigation__label").click();//it will go for month 

    //sec clk to go year 

    await page.locator(".react-calendar__navigation__label").click(); 

 

    // now select the yr 

    await page.getByText(yearNo).click(); 

 

    //select month but in letter convert needed 

    //nth is array starts from 0 so  

    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNo)-1).click(); 

 

    //select date > by xpath 

    await page.locator("//abbr[text()='"+dateNo+"']").click(); 

 

    //Validate the value 

 

    const valueOfCalText = await page.locator(".react-date-picker__inputGroup input").first().getAttribute('value'); 

    console.log(valueOfCalText); 

 

    //validate with loop 

    const calParent = await page.locator(".react-date-picker__inputGroup input"); 

    const calInput = [monthNo,dateNo,yearNo]; 

    for(let i=0; i<calParent.length; i++){ 

        const calValueDisplayed = calParent[i].getAttribute("value"); 

        expect(calValueDisplayed).toEqual(calInput[i]); 

    } 

 

 

}); 

 

 
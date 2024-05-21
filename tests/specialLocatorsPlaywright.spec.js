
////@NewFile//// 

 

import { test, expect } from '@playwright/test'; 

 

test('Playwright Special Locators TCs', async ({ page }) => { 

 

    await page.goto("https://rahulshettyacademy.com/angularpractice/"); 

 

    //radio btn/chkbox 

    //use getByLabel > if within label tag > if it can be accessed thru label> 

    await page.getByLabel("Check me out if you Love IceCreams!").click(); 

    await page.getByLabel("Employed").check(); 

 

    //dropDown 

    //can use getByLabel for this > use selectOption cause its dropdown 

    await page.getByLabel("Gender").selectOption("Female"); 

 

    //getByPlaceholder > if element has placeholder attribute then it can be useful> 

    await page.getByPlaceholder("Password").fill("abc123"); 

 

    //getByRole > what role Element represents > like Button 

    await page.getByRole("button", {name: 'Submit'}).click();//takes role and name here 

 

    //getByText > Element with text 

    await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); 

 

    //getbyrole > by link 

    await page.getByRole("link",{name: "Shop"}).click(); 

 

    //lets say> 1 loctor pt in multiple element 

    //so we can use .filter() to point unique/desired element 

    //then we can use it/also with chaining mathod we can take action on it 

    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click(); 

    //in above> we r locating element with filter> in that element, it has Add button>so we r using getByRole to clk on Add button 

 

 

}); 

 
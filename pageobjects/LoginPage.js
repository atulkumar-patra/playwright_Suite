////@NewFile//// 

 

class LoginPage { 

 

 

    //create a constructor for locator declaration 

    constructor(page) { 

 

        this.page = page; 

        //here defined locator belonges this class only(we can use it thru calling this class) 

        this.signInbutton = page.locator("[name='login']"); 

        this.userName = page.locator("#userEmail"); 

        this.password = page.locator("#userPassword"); 

 

    } 

 

    async goTo() 

    { 

    await this.page.goto("https://rahulshettyacademy.com/client"); 

 

    } 

 

 

    async validLogin(username,userPass) { 

 

        //login 

 

        await this.userName.fill(username); 

        await this.password.fill(userPass); 

        await this.signInbutton.click(); 

        await this.page.waitForLoadState('networkidle'); 

 

 

    } 

 

} 

 

    //export this class to public 

    module.exports = {LoginPage};
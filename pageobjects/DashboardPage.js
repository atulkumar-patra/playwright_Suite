////@NewFile//// 

 

class DashboardPage { 

 

 

    constructor(page) { 

 

        //this.page = page; 

        this.products = page.locator(".card-body"); 

        this.productsText = page.locator(".card-body b"); 

        this.cart = page.locator("[routerlink *= 'cart']"); 

        this.myorder = page.locator("[routerlink = '/dashboard/myorders'] i"); 

         

 

 

    } 

 

    async searchProductAddCart(productName) { 

 

 

 

        await this.productsText.first().waitFor(); 

        console.log(await this.productsText.allTextContents()); 

 

        //get the product count so that we can travers thru it and look for particular product 

        const count = await this.products.count(); 

        for (let i = 0; i < count; ++i) { 

 

            const pname = await this.products.nth(i).locator("b").textContent(); //it will start looking from only here> page.locator(".card-body"); 

            if (pname === productName) { 

 

                await this.products.nth(i).locator("text = Add To Cart").click();//here its in chaining so we cant right only this part in constructor 

                break; 

            } 

        } 

 

    } 

 

    async navigateToCart() { 

 

        //click on CART 

        await this.cart.click(); 

 

    } 

 

    async navigateToMyOrders() { 

 

        //clik on my order 

        await this.myorder.click(); 

         

 

    } 

 

} 

 

module.exports = { DashboardPage }; 
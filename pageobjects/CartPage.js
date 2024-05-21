const { test, expect } = require('@playwright/test');//since we r using expect below
class CartPage {


    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        //this.cart = page.locator("[routerlink *= 'cart']");
        this.checkout = page.locator("text = Checkout");


    }


    async VerifyProductIsDisplayed(productName) {


        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();


    }


    getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }


    async Checkout() {
        //click Checkout
        await this.checkout.click();
    }
}


module.exports={CartPage};
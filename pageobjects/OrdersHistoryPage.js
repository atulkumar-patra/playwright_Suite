
////@NewFile//// 

const { test, expect } = require('@playwright/test'); 

 

class OrdersHistoryPage { 

 

 

    constructor(page) { 

        this.page = page; 

        this.orderstable = page.locator("tbody"); 

        this.orderTabs = page.locator("tbody tr"); 

        this.oidInView = page.locator(".col-text"); 

    } 

 

    async searchOrderAndSelect(orderIdText) { 

        await this.orderstable.waitFor(); 

        const orderCount = await this.orderTabs.count(); 

        for (let i = 0; i < orderCount; i++) { 

            const oId = await this.orderTabs.nth(i).locator("th").textContent(); 

            if (orderIdText.includes(oId)) { 

                await this.orderTabs.nth(i).locator("button").first().click(); 

                break; 

            } 

        } 

 

    } 

 

    async getOrderId(){ 

        return await this.oidInView.textContent(); 

    } 

 

} 

 

module.exports = { OrdersHistoryPage }; 
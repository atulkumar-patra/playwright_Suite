////@NewFile//// 

 

//THIS FILE WILL HAVE ALL OBJECT DECLAERED FOR ALL PAGES RESPECTIVELY 

//SO EVERY TIME WE DONT NEED TO CREATE THE CLASS OBJECT 

 

//IMORT FIRST 

const {LoginPage} = require('./LoginPage'); 

const { DashboardPage } = require('./DashboardPage'); 

const { CartPage } = require('./CartPage'); 

const { OrdersReviewPage } = require('./OrdersReviewPage'); 

const { OrdersHistoryPage } = require('./OrdersHistoryPage'); 

 

 

class POManager{ 

 

    constructor(page){ 

        //DEFINE OBJECT FOR THOSE CLASSES 

        this.page = page; 

        this.loginPage = new LoginPage(this.page); 

        this.dashboardPage = new DashboardPage(this.page); 

        this.cartPage = new CartPage(this.page); 

        this.orderreviewPage = new OrdersReviewPage(this.page); 

        this.orderhistoryPage = new OrdersHistoryPage(this.page); 

 

    } 

 

    ////>RETURN THOSE CLASSES WHEN CALLED 

    getLoginPage(){ 

        return this.loginPage; 

    } 

 

    getDashboardPage(){ 

        return this.dashboardPage; 

    } 

 

    getCartPage(){ 

        return this.cartPage; 

    } 

 

    getOrderReviewPage(){ 

        return this.orderreviewPage; 

    } 

 

    getOrderHistoryPage(){ 

        return this.orderhistoryPage; 

    } 

 

} 

 

module.exports = {POManager}; 

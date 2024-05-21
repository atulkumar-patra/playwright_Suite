
////@NewFile//// 

 

//create a class 

class APIUtils{ 

 

    //create a constructor to get the context from main file where its defined 

    constructor(apiContext,loginPayLoad){ 

        this.apiContext = apiContext; 

        this.loginPayLoad = loginPayLoad; 

    } 

 

    //defeine token api function  

    async getToken(){ 

        //for post method 

        //pass URL and body/payload 

        //will get the  

         

        //here we defined apiContext with this. cause we r refering to this from another class called in constructor 

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 

            { 

            data:this.loginPayLoad 

            }) 

            //chk status code > 200 

            //expect(loginResponse.ok()).toBeTruthy(); 

            //get the response body in json format 

            const loginResponseJsonBody = await loginResponse.json(); 

            //get specifc key-value from response 

            const token = loginResponseJsonBody.token; 

            console.log(token); 

            return token; 

    } 

 

    //function api to create order 

    async createOrder(orderPayLoad){ 

 

        //create an js object and pass token and order id with it 

        let response = {}; 

        response.token = await this.getToken();//token assigned to object 

        const orderResppnse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 

        { 

            data: orderPayLoad, 

            headers:{ 

                'Authorization' : response.token, 

                'Content-Type'  : 'application/json' 

            }, 

        }) 

        const orderResponseJsonBody = await orderResppnse.json(); 

        console.log(orderResponseJsonBody); 

        const orderId = orderResponseJsonBody.orders[0]; 

        console.log(orderId); 

        response.orderId = orderId; //order id assigned to object 

 

        return response; 

 

    } 

 

 

} 

 

//tomake this class globally visible like public 

module.exports = {APIUtils}; 

 

 
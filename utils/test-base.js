
////@NewFile//// 

 

const base = require('@playwright/test');//can import this as in any name >>> here instead of test we have written base(random name) 

 

//HERE WE R CREATING TEST DATA AS IN FIXTURE GIVEN BY PLAYWRIGHT > TO BE USED IN TESTCASE 

//ALTERNATE TO JSON TESTDATA 

 

exports.customtest = base.test.extend({ 

 

    testDataForOrder: { 

        username: "fname@gmail.com", 

        userPass: "Fname@1234", 

        productName: "IPHONE 13 PRO" 

    } 

}) 

 
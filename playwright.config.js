//its like Test runeer in cucumber
// @ts-check
const { devices } = require('@playwright/test');
const { retries } = require('./playwright.config1');
//const { trace } = require('console');
// const { TIMEOUT } = require('dns');
 
 
 
const config = ({
 
  //define file path where test cases r present
  testDir: './tests',
 
  retries : 1,
 
  //max timeout define
  timeout: 40 * 1000,
  //for assertion
  expect:{
    timeout: 5000
  },
 
  //how we want the testcase result log
  reporter: 'html',
 
  //use prop > define broweser/ss/log etc.. will be here
  //retry mechanism/log path/ etc..
  use:{
 
    //define browser name
    browserName : 'chromium' ,
    //chromium
    //firefox
    //webkit > safari (default installed)
 
    //make headless false(avoid writing --headed in terminal everytime)
    headless : false,
 
    //screenshot tool
    screenshot : 'on',
 
    //trace or console log
   // trace : 'on', //on/off/retin-on-failure
    trace : 'retain-on-failure', //trace will genarete only on failure
 
 
 
  },
 
 
});
 
//to export the config
module.exports = config;
//its like Test runeer in cucumber
// @ts-check
const { devices } = require('@playwright/test');
//const { trace } = require('console');
// const { TIMEOUT } = require('dns');
 
//TU RUN SPECIFIC CONFIG FILE FOR THE TESTCASE >>>
//npx playwright test tests/file.spec.js --config configfilename.config.js
 
const config = ({
 
  //define file path where test cases r present
  testDir: './tests',
 
  //for failed case, we can declare retries
  retries: 1,
 
  //files will run parallely
  //test inside the file will run sequentially(we can also configure it to run parallely)
  //by default 5 worker assigned to run the files
  //1 worker -> 1 file
  workers: 4, //here 4 worker will set to run instead 5(defult)
 
 
  //max timeout define
  timeout: 40 * 1000,
  //for assertion
  expect: {
    timeout: 5000
  },
 
  //how we want the testcase result log
  reporter: 'html',
 
  //FOR ALLURE REPORT///////////////////////////////////////////////////////////////////////////////
  //>IN NOT INSTALLED>>> //npm i -D @playwright/test allure-playwright
  //RUN TEST WITH MENTIONED THE REPORTEERZ
  //npx playwright test tests/RunTestByTagName.spec.js --reporter=line,allure-playwright
  //THEN BUILD/GENERATE CLEAN REPORT
  //allure generate ./allure-results --clean
  //THEN OPEN REPORT-ALLURE
  //allure open ./allure-report
 
 
 
 
  //INSTEAD OF CREATING MULTIPLE CONFIG FILE >>> WE CAN CREATE PROJECT AND CAN DEFINCE MULTIPLE CONFIG INSIDE IT
  projects: [
 
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,//make headless false(avoid writing --headed in terminal everytime)
        screenshot: 'off',
        trace: 'retain-on-failure', //on/off/retin-on-failure
 
        //to run in mobile screen any specifc available>>
        ...devices['iPhone 13'],
      }
    },
 
    {
      name: 'chrome',
      use: {
 
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
 
        //TO ADJUST BROWSER DIMENSION>
        //viewport: {width:720,height:720},
 
        //To avoid SSL error
        ignoreHttpsErrors: true,
 
        //to handlepermissions for web like mic/camera/location
        permissions: ['geolocation'], //geoloaction for > location only
 
        //to capture video like screenshot(video not recommended cause takes lot og memory)
        //video: 'retain-on-failure', //on/off/on-first-retry/retain-on-failure
 
 
 
 
      }
    }
 
  ]
 
  //GIVE COMMAND TO RUN SPECIFIC PRJECT FROM ABOVE
  //npx playwright test tests/file.spec.js --config configfilename.config.js --projects=projectName
  //be default if we dont specify any project name >>> IT WILL RUN WITH ALL PROJECTS AVAILABLE
 
 
 
 
 
 
 
});
 
//to export the config
module.exports = config;
 
const puppeteer = require("puppeteer");

const loginLink = "https://www.hackerrank.com/auth/login";

const codeFile = require('./code')

console.log("before");

let email = "pannupanni@rajinder.com";
let password = "pappiBohru";

let browserWillbeLaunchedPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});

let page;

//automation occurs on website,, not on script

//puppeteer works on promises

// we used puppeteer launch method to return an instance of broswer 

browserWillbeLaunchedPromise
  .then(function (browserInstance) {
    let newTabPromise = browserInstance.newPage();
    return newTabPromise;
  })
  .then(function (newTab) {
    console.log("new Tab Opened");
    page = newTab;
    let pageWillbeOpenedPromise = newTab.goto(loginLink);
    return pageWillbeOpenedPromise;
  })
  .then(function () {
    let typedEmailPromise = page.type("input[id='input-1']", email, {
      delay: 100,
    });
    return typedEmailPromise;
  })
  .then(function () {
    let typedPasswordPromise = page.type("input[id='input-2']", password, {
      delay: 100,
    });
    return typedPasswordPromise;
  })
  .then(function () {
    let loginPromise = page.click('button[data-analytics="LoginPassword"]', {
      delay: 100,
    });

    return loginPromise;
  })
  .then(function(){
    let algoWillbeClickedPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
    return algoWillbeClickedPromise
  })
  .then(function(){
    let goToWarmupPromise = waitAndClick('input[value="warmup"]' , page)
    return goToWarmupPromise
  })
  .then(function(){
    let challengesArrayPromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled" , 
    {delay : 100}
    )
    return challengesArrayPromise
  })
  .then(function(questionsArr){
    console.log("no. of questions" + questionsArr.length);
      let questionsWillBeSolvedPromise = questionSolver(page , questionsArr[0] , codeFile.answers[0])
      return questionsWillBeSolvedPromise
  })


  //wait for selector is inbuilt function which is waiting for selection of algorithms section
  //$ - querySelector
  //$$ - querySelectorAll

function waitAndClick(selector,cpage){
  return new Promise(function(resolve,reject){
    let waitForModelPromise = cpage.waitForSelector(selector);
    waitForModelPromise.then(function(){
      let clickModalPromise = cpage.click(selector , {delay : 100})
      return clickModalPromise
    })
    .then(function(){
      resolve()
    })
    .catch(function(){
      reject()
    })
  })
}

function questionSolver(page,question,answer){
  return new Promise(function(resolve,reject){
    let questionWillBeClickedPromise = question.click()
    questionWillBeClickedPromise
    .then(function(){
      let waitForEditorPromise = waitAndClick(
        ".monaco-editor.no-user-select.vs",page
      );
      return waitForEditorPromise
    })
    .then(function(){
      return waitAndClick(".checkbox-input",page);
    })
    .then(function(){
      return page.waitForSelector(".text-area.custominput")
    })
    .then(function(){
      return page.type(".text-area.custominput",answer,{delay:5});
    })
    .then(function(){
      let ctrlIsPressedPromise = page.keyboard.down('Control');
      return ctrlIsPressedPromise
    })
    .then(function(){
      let AisPressedPromise = page.keyboard.press('A',{delay : 10});
      return AisPressedPromise;
    }).then(function(){
      let XisPressedPromise = page.keyboard.press('X' , {delay:20})
      return XisPressedPromise
   }).then(function(){
      let ctrlIsReleasedPromise = page.keyboard.up('Control')
      return ctrlIsReleasedPromise
   }).then(function () {
     let waitForEditorPromise = waitAndClick(
       ".monaco-editor.no-user-select.vs",
       page
     );
     return waitForEditorPromise;
   }).then(function () {
     let ctrlonHoldPromise = page.keyboard.down('Control');
     return ctrlonHoldPromise
   }).then(function(){
     let AisPressedPromise = page.keyboard.press('A' , {delay : 20});
     return AisPressedPromise
   })
    .then(function(){
      let VisPressedPromise = page.keyboard.press('V' , {delay : 10})
      return VisPressedPromise;
    })
    .then(function(){
      let ctrlIsReleasedPromise = page.keyboard.up('Control')
      return ctrlIsReleasedPromise
    })
    .then(function(){
      return page.click('.hr-monaco__run-code' , {delay : 20})
    })
    .then(function(){
      resolve();
    })
    .catch(function(err){
      console.log(err);
    })
  })
}

console.log("after");

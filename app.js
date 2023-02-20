var CronJob = require("cron").CronJob;
const { By, Key, Builder } = require("selenium-webdriver");
require("geckodriver");
var fs = require("fs");



var job = new CronJob({
    // every hour between 10-15 --> 0 0 10-15 ? * * *
    // every second             --> * 0 10-15 ? * * *
  cronTime: "* * * * *",
  onTick: async function () {
    
        // selenıum
    let driver = await new Builder().forBrowser("firefox").build();
    
    await driver.get("https://www.doviz.com/");
    
    var data = await driver.findElement(
        By.xpath("/html/body/header/div[2]/div/div[1]/div[2]/a/span[2]")
      ).getText();
    
    
    exportToExcel(data);
    // export excel
    driver.quit()

  },
  start: false,
  timeZone: "Europe/Istanbul",
});
job.start();



exportToExcel = (param) => {
 // let data = "";
  let today = new Date().toJSON().slice(0, 10);
  
  fs.appendFile(`${today}.xls`, param, (err) => {
    if (err) throw err;
    console.log("x Dakikada bir kuru kontrol edip excele yazıldı");
  });
};

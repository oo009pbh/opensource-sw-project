const express = require("express");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const conn = require('./dbConnection');
const promisePool = conn.promise();

router.get('/gunja', asyncHandler(async (req, res, next) => {
  //크롤링
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://m.sejong.ac.kr/front/cafeteria.do');
  await page.click("body > div > div.body > div > div > div > div.tab-button > a:nth-child(3)");
  const content = await page.content();
  await page.close();
  await browser.close();
  const ulList = [];
  const $ = cheerio.load(content);
  const $bodyList = $("body > div > div.body > div > div > div > div.tab-content > div > div > div.article > div > table > tbody").children("tr");
  // 모든 리스트를 순환한다.
  $bodyList.each(function(i, elem) {
      if (i % 2 == 0)
      {
        ulList[i / 2] = {
          day: $(this).find("th:nth-child(1)").text().trim(),
          midmenu: $(this).find("td").text().trim(),
        };
      }
      else{
        ulList[parseInt(i / 2)].nightmenu = $(this).find("td").text().trim();
      }
    });
  
  //4000서버에 보냄
  await promisePool.query("CREATE OR REPLACE TABLE gunja(midmenu text, nightmenu text, day text) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
  let db_values = [];
  ulList.forEach(function (element) {
    db_values.push([element.midmenu, element.nightmenu, element.day]);
  });
  await promisePool.query('INSERT INTO gunja VALUES ?', [db_values]);
  res.send(ulList);
}));

module.exports = router;


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
  console.log($bodyList.length);
  // 모든 리스트를 순환한다.
  $bodyList.each(function(i, elem) {
      if (i % 2 == 0)
      {
        ulList[i / 2] = {
          day: $(this).find("th:nth-child(1)").text().trim(),
          mid: $(this).find("th:nth-child(2)").text().trim(),
          midmenu: $(this).find("td").text().trim(),
        };
      }
      else{
        ulList[parseInt(i / 2)].night = $(this).find("th").text().trim();
        ulList[parseInt(i / 2)].nightmenu = $(this).find("td").text().trim();
      }
    });

  // db에서 데이터 가져옴
  const [rows, fields] = await promisePool.query("SELECT * FROM studenthall");
  // 사이트에 존재하고 원래 있던 데이터 골라냄(삭제되지 않은 메뉴)
  let original = rows.filter(function (item1, idx1) {
    return ulList.find(function (item2, idx) {
      return item1.menu == item2.menu
    }) != undefined;
  });
  // 사이트에 추가된 메뉴 골라냄(추가된 메뉴)
  let new_menu = ulList.filter(function (item1, idx1) {
    return rows.find(function (item2, idx) {
      return item1.menu == item2.menu
    }) == undefined;
  });
  //합쳐서 4000서버에 보냄
  const result = original.concat(new_menu);
  await promisePool.query("CREATE OR REPLACE TABLE studenthall(menu text, cost text, grade float) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
  let db_values = [];
  result.forEach(function (element) {
    db_values.push([element.menu, element.cost, element.grade]);
  });
  await promisePool.query('INSERT INTO studenthall VALUES ?', [db_values]);
  res.send(result);
}));

module.exports = router;


const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
var router = express.Router();
const asyncHandler = require('express-async-handler');
const conn = require('./dbConnection');
const promisePool = conn.promise();

const CAFE = "https://www.diningcode.com/list.php?query=%EC%84%B8%EC%A2%85%EB%8C%80%20%EC%B9%B4%ED%8E%98";
const KOREANFOOD = "https://www.diningcode.com/list.php?query=%EC%84%B8%EC%A2%85%EB%8C%80%20%ED%95%9C%EC%8B%9D";
const BAR = "https://www.diningcode.com/list.php?query=%EC%84%B8%EC%A2%85%EB%8C%80%20%EC%88%A0%EC%A7%91";
const JAPANESEFOOD = "https://www.diningcode.com/list.php?query=%EC%84%B8%EC%A2%85%EB%8C%80%20%EC%9D%BC%EC%8B%9D";
const CHINESEFOOD = "https://www.diningcode.com/list.php?query=%EC%84%B8%EC%A2%85%EB%8C%80%20%EC%A4%91%EC%8B%9D";

const crawling = (html) => {
  let ulList = [];
  let cnt = 0;
  const $ = cheerio.load(html.data);
  const $bodyList = $("#div_list").children("li");
  $bodyList.each(function (i, elem) {
    if ($(this).find("a > span.btxt").text() === "")
    {
      return true;
    }
    ulList[cnt++] = {
      menu: $(this).find("a > span.btxt").text(),
      loca: $(this).find("a > span:nth-child(5)").text(),
      category: $(this).find("a > span.stxt").text(),
      grade: 0.0,
    };
  });
  return ulList;
}

router.get('/koreanfood', asyncHandler(async (req, res, next) => {
  //크롤링
  const koreanfood = await axios.get(KOREANFOOD);
  const koreanfooddata = crawling(koreanfood);
  //합쳐서 4000서버에 보냄
  await promisePool.query("CREATE OR REPLACE TABLE koreanfood(menu text, loca text, category text, grade float) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
  let db_values = [];
  koreanfooddata.forEach(function (element) {
    db_values.push([element.menu, element.loca, element.category, element.grade]);
  });
  await promisePool.query('INSERT INTO koreanfood VALUES ?', [db_values]);
  res.send(koreanfooddata);
}));

router.get('/cafe', asyncHandler(async (req, res, next) => {
  //크롤링
  const cafe = await axios.get(CAFE);
  const cafedata = crawling(cafe);
  //합쳐서 4000서버에 보냄
  await promisePool.query("CREATE OR REPLACE TABLE cafe(menu text, loca text, category text, grade float) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
  let db_values = [];
  cafedata.forEach(function (element) {
    db_values.push([element.menu, element.loca, element.category, element.grade]);
  });
  await promisePool.query('INSERT INTO cafe VALUES ?', [db_values]);
  res.send(cafedata);
}));

router.get('/bar', asyncHandler(async (req, res, next) => {
  //크롤링
  const bar = await axios.get(BAR);
  const bardata = crawling(bar);
  //합쳐서 4000서버에 보냄
  await promisePool.query("CREATE OR REPLACE TABLE bar(menu text, loca text, category text, grade float) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
  let db_values = [];
  bardata.forEach(function (element) {
    db_values.push([element.menu, element.loca, element.category, element.grade]);
  });
  await promisePool.query('INSERT INTO bar VALUES ?', [db_values]);
  res.send(bardata);
}));

router.get('/japanesefood', asyncHandler(async (req, res, next) => {
  //크롤링
  const japanesefood = await axios.get(JAPANESEFOOD);
  const japanesefooddata = crawling(japanesefood);
  //합쳐서 4000서버에 보냄
  await promisePool.query("CREATE OR REPLACE TABLE japanesefood(menu text, loca text, category text, grade float) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
  let db_values = [];
  japanesefooddata.forEach(function (element) {
    db_values.push([element.menu, element.loca, element.category, element.grade]);
  });
  await promisePool.query('INSERT INTO japanesefood VALUES ?', [db_values]);
  res.send(japanesefooddata);
}));

router.get('/chinesefood', asyncHandler(async (req, res, next) => {
  //크롤링
  const chinesefood = await axios.get(CHINESEFOOD);
  const chinesefooddata = crawling(chinesefood);
  //합쳐서 4000서버에 보냄
  await promisePool.query("CREATE OR REPLACE TABLE chinesefood(menu text, loca text, category text, grade float) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
  let db_values = [];
  chinesefooddata.forEach(function (element) {
    db_values.push([element.menu, element.loca, element.category, element.grade]);
  });
  await promisePool.query('INSERT INTO chinesefood VALUES ?', [db_values]);
  res.send(chinesefooddata);
}));

module.exports = router;


const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");
const axios = require("axios");
const PORT = 4000;
const app = express();

app.use(cors());

// var mysql = require('mysql');
// var conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'crawl_usr',
//   password: '1234',
//   database: 'crawl_data',
//   charset: 'utf8'
// });

const crawlStudentHall = async () => {
  try {
    return await axios.get("http://m.sejong.ac.kr/front/cafeteria2.do");
  } catch (error) {
    console.error(error);
  }
}
app.get("/", (req, res) => {
  crawlStudentHall()
    .then((html) => {
      let ulList = [];
      const $ = cheerio.load(html.data);
      const $bodyList = $("body > div > div.body > div > div > div > div.tab-content > div > div > div.article > div > table > tbody").children("tr.seq-01");
      $bodyList.each(function (i, elem) {
        ulList[i] = {
          menu: $(this).find("th").text(),
          cost: $(this).find("td").text(),
        };
      });
      return ulList;
    })
    .then((data) => res.send(data));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
  // conn.connect();
  // var sql = 'CREATE OR REPLACE TABLE menus(menu text, cost text)ENGINE=InnoDB DEFAULT CHARSET=utf8';
  // conn.query(sql, function (err, rows, fields) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(rows);
  // });

  // var sql = 'INSERT INTO menus VALUES ?';

  // try {
  //   let db_values = [];
  //   ulList.forEach(function (element) {
  //     db_values.push([element.menu, element.cost]);
  //   });
  //   await conn.query(sql, [db_values], function (err, rows, fields) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(rows);
  //   });
  //   conn.end();
  // } catch (error) {
  //   console.error(error);
  // }
crawlStudentHall();
//export default crawlStudentHall;
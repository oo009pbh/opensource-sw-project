const axios = require("axios");
const cheerio = require("cheerio");

const crawlInUniversity = async () => {
  try {
    const html = await axios.get("https://cors-anywhere.herokuapp.com/http://m.sejong.ac.kr/front/cafeteria2.do");
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("body > div > div.body > div > div > div > div.tab-content > div > div > div.article > div > table > tbody").children("tr.seq-01");
    $bodyList.each(function(i, elem) {
        ulList[i] = {
            menu: $(this).find("th").text(),
            cost: $(this).find("td").text(),
        };
      });
    
    const data = ulList.filter(n => n.menu);
    console.log(data);
    //return data;
  } catch (error) {
    console.error(error);
  }
};

export default crawlInUniversity;
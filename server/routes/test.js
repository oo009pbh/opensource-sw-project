const axios = require("axios");
const cheerio = require("cheerio");

const CAFE = "https://www.diningcode.com/list.php?query=%EC%84%B8%EC%A2%85%EB%8C%80%20%EC%B9%B4%ED%8E%98";
const KOREANFOOD = "https://www.diningcode.com/list.php?query=%EC%84%B8%EC%A2%85%EB%8C%80%20%ED%95%9C%EC%8B%9D";
const BAR = "https://www.diningcode.com/list.php?query=%EC%84%B8%EC%A2%85%EB%8C%80%20%EC%88%A0%EC%A7%91";
const JAPANESEFOOD = "https://www.diningcode.com/list.php?query=%EC%84%B8%EC%A2%85%EB%8C%80%20%EC%9D%BC%EC%8B%9D";
const CHINESEFOOD = "https://www.diningcode.com/list.php?query=%EC%84%B8%EC%A2%85%EB%8C%80%20%EC%A4%91%EC%8B%9D"

const crawlSub = async (id) => {
  let url = "";
  if (id == 1){
    url = CAFE;
  }else if(id == 2){
    url = KOREANFOOD;
  }else if(id == 3){
    url = BAR;
  }else if(id == 4){
    url = JAPANESEFOOD;
  }else{
    url = CHINESEFOOD;
  }
  try {  
    const html = await axios.get(url);
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("#div_list").children("li");
    $bodyList.each(function(i, elem) {
        ulList[i] = {
            menu: $(this).find("a > span.btxt").text(),
            loca: $(this).find("a > span:nth-child(5)").text(),
            category: $(this).find("a > span.stxt").text()
        };
      });
    
    const data = ulList.filter(n => n.menu);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
crawlSub(1);
//export default crawlSub;
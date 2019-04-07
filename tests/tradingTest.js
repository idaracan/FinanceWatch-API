const assert    = require('assert');
const {getPrice, getLogo, getNews, getStockInfo}  = require('../app/requests/trading');
const {debug, error} = require('../app/log/log');

//The latest stock price
async function priceTest(ticker) {
    const price = await getPrice(ticker).then(res => console.log(res)).catch(e => console.log(e));
    //assert.ok( typeof(price) === "number", "priceTest fail: Not a price value")
}

//A path to the company logo
async function logoTest(ticker) {
    const logoUrl   = await getLogo(ticker).then(res => console.log(res)).catch(e => console.log(e));
//    assert.ok( typeof(logoUrl) === "string", "priceTest fail: Not a url value")
}

//Link to a latest news article for the company
async function newsTest(ticker) {
    const news  = await getNews(ticker).then(res => console.log(res)).catch(e => console.log(e));
    //assert.ok( typeof(news) === "string", "priceTest fail: Not a url value")
}

async function stockInfoTest(ticker) {
    const info = await getStockInfo(ticker).then(res => console.log(res)).catch(e => console.log(e));
}
module.exports = {priceTest, logoTest, newsTest, stockInfoTest};
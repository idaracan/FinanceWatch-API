const assert    = require('assert');
const {getStockInfo}  = require('../app/requests/trading');

/**
 * @summary        Test for stock information, it consults the getStockInfo function and applies type and url validation tests
 * @param {ticker} ticker ticker or comma-separated tickers to be consulted
 * 
 */
async function stockInfoTest(ticker) {
    console.log("\x1b[44m", "entering getStockInfo tests...",
        `testing for ${ticker}`,'\x1b[0m');
    await getStockInfo(ticker).then(res =>{ 
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i');
        for (const index in res) {
            if (res.hasOwnProperty(index)) {
                const element   = res[index];
                const symbol    = Object.keys(element)[0];
                const info      = element[symbol];
                assert.ok(typeof(info.name)==='string', "test failed. name not of valid type");
                assert.ok(typeof(info.price)==='number', "test failed. price not of valid type");
                assert.ok(typeof(info.image)==='string', "test failed. name not of valid type");
                assert.ok(info.image.match(urlPattern), "test failed. image not an url");
                assert.ok(typeof(info.news)==='string', "test failed. news not of valid type");
                assert.ok(info.news.match(urlPattern), "test failed. news not an url");
            }
        }
        console.log("\x1b[44m","getStockInfo - Tests passed!",'\x1b[0m');
    }).catch(e => console.log(e));
}
module.exports = {stockInfoTest};
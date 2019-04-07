const https     = require('https');
const log       = require('../log/log');
const rootUrl   = 'https://api.iextrading.com/1.0/stock/';
const unknown   = 'Unknown symbol';

const getInfo   = (url) => {
    return new Promise((resolve, reject) =>{
        const get = https.get(url, (res) => {
            let info = '';
            res.on("data", (chunk) => info += chunk).on("end", () => {
                if (info === unknown) {
                    reject(unknown);
                    log.error(`${info} URL path: ${url}`);
                }
                resolve(info);
            });
        })
        get.on("error", (err) => {
            log.error(`${err} URL path: ${url}`);
            reject(err);
        });
    });
}
const getPrice = async (symbol) =>{
    const info  = await getInfo(rootUrl + symbol + '/quote');
    return (JSON.parse(info)).latestPrice;
}

const getLogo = async (symbol) => {
    const info  = await getInfo(rootUrl + symbol + '/logo');
    return (JSON.parse(info)).url;;
}

const getNews = async (symbol) => {
    const info  = await getInfo(rootUrl + symbol + '/news/last/1');
    return (JSON.parse(info))[0].url;
}

const getStockInfo = async (symbol) => {
    const price = await getPrice(symbol);
    const img   = await getLogo(symbol);
    const news  = await getNews(symbol);
    return {symbol, price, img, news};
}

module.exports = {
    getPrice,
    getLogo,
    getNews,
    getStockInfo
}
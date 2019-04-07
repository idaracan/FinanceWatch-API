const https     = require('https');
const log       = require('../log/log');
const rootUrl   = `https://api.iextrading.com/1.0/stock/market/batch?symbols=$SYMBOL&types=quote,news,logo&last=1`;
const unknown   = 'Unknown symbol';

/**
 * @summary     gets the info of the selected stock tickers 
 * @param {url} url external service for consulting Stock Information, courtesy of iextrading
 */
const getInfo   = (url) => {
    return new Promise((resolve, reject) =>{
        let info = '';
        const get = https.get(url, (res) => {
            res.on("data", (chunk) => info += chunk).on("end", () => {
                if (info === unknown) {
                    reject(unknown);
                    log.error(`requests/trading: getInfo() - bad request: ${unknown}`);
                }
            });
        });
        get.on("error", (err) => {
            log.error(`requests/trading: getInfo() - server error: ${err}`);
            reject(err);
        });
        get.on("close", () => {
            resolve(info);
        })
    });
}

/**
 * @summary         Processes the raw stock information and returns the Name, 
 *                  price, company logo url and an url with latest new about the company
 * @param {symbols} symbols list of stock tickers to get the info
 */
const getStockInfo = async (symbols) => {
    let rawInfo = await getInfo(rootUrl.replace("$SYMBOL", symbols));
    rawInfo = JSON.parse(rawInfo);
    const info = [];
    for (const key in rawInfo) {
        if (rawInfo.hasOwnProperty(key)) {
            const stock = rawInfo[key];
            const symbol = stock.quote.symbol;
            info.push({
                [symbol]: {
                    name: stock.quote.companyName,
                    price: stock.quote.latestPrice,
                    image: stock.logo.url,
                    news: stock.news[0].url
                }
            });
        }
    }
    return info;
}

module.exports = {
    getStockInfo
}
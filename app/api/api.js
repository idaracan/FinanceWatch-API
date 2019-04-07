const url = require('url');
const { getStockInfo } = require('../requests/trading');
const log = require('../log/log');

/**
 * @summary     API Method for handling incoming requests, 
 *              takes the request and sends the output to the user
 * @param {req} request     Incoming request information
 * @param {res} response    Response to the request 
 */
const apiRoute = async (req, res) => {
    const symbol = url.parse(req.url, true).query.id;
    if (symbol === "") {
        res.writeHead(400, { 'content-type': 'application-json' });
        log.error('routes/routes: apiRoute() - bad request: empty query');
        return res.end(JSON.stringify({ 'error': '400 bad request: empty query' }));
    }
    getStockInfo(symbol).then((info) => {
        if (info.length === 0) {
            res.writeHead(400, { 'content-type': 'application-json' });
            log.error('routes/routes: apiRoute() - bad request: not a valid argument');
            return res.end(JSON.stringify({ 'error': '400 bad request: not a valid argument' }));
        }
        res.writeHead(200, { 'content-type': 'application-json' });
        log.debug('routes/routes: routes() - request successful');
        return res.end(JSON.stringify(info));
    }).catch((error) => {
        log.error(`routes/routes: apiRoute() - server error: ${error}`);
        res.writeHead(500, { 'content-type': 'application-json' });
        return res.end(JSON.stringify({ 'error': error }));
    });
};

exports.apiRoute = apiRoute;

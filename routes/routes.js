const url = require('url');
const {getStockInfo}  = require('../app/requests/trading');
const log = require('../app/log/log');

const apiRoute = async (req, res) =>{
    const symbol = url.parse(req.url, true).query.id;
    getStockInfo(symbol).then((info) => {
        res.writeHead(200, {'content-type': 'application-json'});
        return res.end(JSON.stringify(info));
    }).catch((error) => {
        log.error(`server error: ${error}`)
        res.writeHead(500, {'content-type': 'application-json'});
        return res.end(JSON.stringify({'error': error}))
    });
}

async function routes(req, res) {
    const path   = url.parse(req.url, true).pathname;
    log.debug(`accessed: ${path}`);
    switch (path) {
        case '/api':
        apiRoute(req, res);
            break;
        default:
        res.writeHead(404, {'content-type': 'application-json'});
        log.error(`error 404: Not Found`);
        return res.end(JSON.stringify({'error': 'route not found'}))
            break;
    }
}

module.exports = {routes};
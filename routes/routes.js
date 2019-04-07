const { apiRoute } = require("../app/api/api");
const url = require('url');
const log = require('../app/log/log');

/**
 * @summary     Application Route File.
 * @param {req} request     Incoming request information
 * @param {res} response    Response to the request 
 */
async function routes(req, res) {
    const path   = url.parse(req.url, true).pathname;
    log.debug(`routes/routes: routes() - request to route: ${path}`);
    switch (path) {
        case '/api':
        apiRoute(req, res);
            break;
        default:
        res.writeHead(404, {'content-type': 'application-json'});
        log.error(`routes/routes: routes() - error 404: Not Found`);
        return res.end(JSON.stringify({'error': 'route not found'}))
            break;
    }
}

module.exports = {routes};
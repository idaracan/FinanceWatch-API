require('./config/config')
const http  = require('http');
const {routes}    = require('./routes/routes');
const log = require('./app/log/log');

const port  = process.env.PORT;

const server = http.createServer(async (req, res) => {
    if(req.method !== 'GET') {
        res.writeHead(400, {'content-type': 'application-json'});
        return res.end(JSON.stringify({'error': 'bad request'}))
    }
    routes(req, res);
});

//  start the server
server.listen(port,()=> log.debug(`server running on port ${port}...`));
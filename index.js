require('./config/config')
const http      = require('http');
const {routes}  = require('./routes/routes');
const log       = require('./app/log/log');

const port  = process.env.PORT;

const server = http.createServer(async (req, res) => {
    if(req.method !== 'GET') {
        res.writeHead(400, {'content-type': 'application-json'});
        log.error(`/index: server() - bad request: request used: ${req.method}`)
        return res.end(JSON.stringify({'error': 'bad request: Supported methods: GET'}))
    }
    routes(req, res);
});

//  starts the server
server.listen(port,()=> log.debug(`/index: server running on port ${port}...`));
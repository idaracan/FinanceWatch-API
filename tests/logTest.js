const log = require('../app/log/log');

function debugTest(string) {
    log.debug(string);
}

function errorTest(error) {
    log.error(error);
}

module.exports = {
    debugTest,
    errorTest
}
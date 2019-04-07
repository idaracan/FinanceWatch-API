const log   = require('../app/log/log');
const fs    = require('fs');
const assert= require('assert');

/**
 * @summary                 Method for testing the logger.debug() function
 * @param {string} message  message 
 */
function debugTest(string) {
    console.log("\x1b[44m", "entering log.debug() tests...",'\x1b[0m');
    log.debug(string);
    assert.ok(fs.existsSync('./logs/server.log'), "File not created, test failed")
    console.log("\x1b[44m","log.debug - Tests passed!",'\x1b[0m');
}

/**
 * @summary             Method for testing the logger.error() function
 * @param {error} error error message
 */
function errorTest(error) {
    console.log("\x1b[44m", "entering log.error() tests...",'\x1b[0m');
    log.error(error);
    assert.ok(fs.existsSync('./logs/server.log'), "File not created, test failed");
    console.log("\x1b[44m","log.error() - Tests passed!",'\x1b[0m');
}

module.exports = {
    debugTest,
    errorTest
}
const fs    = require('fs');

/**
 * @summary             logs a message or error message into a file.
 * @param {type} type   values for console output tag: "DEBUG or ERROR" 
 * @param {*} param     message or errormessage to be written into the log
 */
function logger(type, param) {
    const digit = "2-digit";
    const options = {year: digit, month: digit, day: digit, hour: digit, minute: digit, second: digit};
    const date = new Date().toLocaleString("es-ES", options);
    const logs = './logs';
    if (!fs.existsSync(logs)) {
        fs.mkdirSync(logs);
    }
    fs.appendFileSync(`./logs/server.log`, `${type} ${date} - ${param} \n`, {encoding: 'utf8'});
}
/**
 * @summary                 outputs a debug message to ./logs/server.log
 * @param {string} string   message to the console
 */
function debug(string) {
    logger("DEBUG", string);
}
/**
 * @summary                 outputs an error message to ./logs/server.log
 * @param {error} error     error message to the console
 */
function error(error) {
    logger("ERROR", error);
}

module.exports = {
    debug,
    error
}
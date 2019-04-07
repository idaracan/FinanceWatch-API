const fs    = require('fs');

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

function debug(string) {
    logger("DEBUG", string);
}

function error(error) {
    logger("ERROR", error);
}

module.exports = {
    debug,
    error
}
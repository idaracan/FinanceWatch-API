const {priceTest, logoTest, newsTest, stockInfoTest} = require('./tradingTest');
const {debugTest, errorTest}    = require('./logTest');
/*
priceTest('aapl')

logoTest('aapl')

newsTest('aapl')

stockInfoTest('aapl')
*/

debugTest('server running on port 3000...')

errorTest("Error: EACCES: permission denied, open '/server.log'")
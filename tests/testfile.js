const {stockInfoTest} = require('./tradingTest');
const {debugTest, errorTest}    = require('./logTest');

//  test for one stock ticker
stockInfoTest('aapl')
//  test for many stock tickers
stockInfoTest('aapl,googl,fb')
//  debug console test
debugTest('debugTest runnung...')
//  error console test
errorTest("test message, open '/server.log'")
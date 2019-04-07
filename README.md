# FinanceWatch-API
API test for https://api.iextrading.com/ version 1.0

## Getting started 
clone the project into your local machine, cd into the project folder and run using node index.js

### Prerequisites
Node.js
No external libraries needed

### Testing
cd into the project folder and run:
node tests/testfile.js

### Sample command
Sample command for running a query using cURL.
Download the project and run node index
```
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:3000/api?id=aapl,fb,googl
```
or if you want a formatted output:
```
curl localhost:3000/api?id=aapl,fb,googl | node <<< "var o = $(cat); console.log(JSON.stringify(o, null, 4));" 
```
You can input one or many id's, separated by commas.

## Version
1.0.0 - first stable version

## Author
* Iván Ramirez
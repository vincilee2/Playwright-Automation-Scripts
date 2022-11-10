var fs=require('fs');
var data=fs.readFileSync('./Monitors.json', 'utf8');
const Monitors = JSON.parse(data);

var CreateAlert = require('./GenevaAlert');
var handlers = Monitors.map(monitor => CreateAlert(monitor))
Promise.all(handlers);


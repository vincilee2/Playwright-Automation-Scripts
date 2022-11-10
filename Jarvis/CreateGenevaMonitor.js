const Monitors = require('./Configs/GenevaMonitors')

var CreateAlert = require('./GenevaAlert');
var handlers = Monitors.map(monitor => CreateAlert(monitor))
Promise.all(handlers);


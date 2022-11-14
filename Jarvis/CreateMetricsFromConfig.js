const Rules = require('./Configs/KustoToMetricRules')

var CreateMetric = require('./KustoToMetrics');

var handlers = Rules.map(rule => CreateMetric(rule))
Promise.all(handlers);
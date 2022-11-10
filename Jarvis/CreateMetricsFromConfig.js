const Queries = require('./Configs/KustoToMetrics')

var CreateMetric = require('./KustoToMetrics');

var handlers = Queries.map(query => CreateMetric(query.Query, query.RuleName))
Promise.all(handlers);
// for (query in Queries)
// {
//     CreateMetric(query)
// }

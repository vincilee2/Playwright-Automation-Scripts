
Monitors = [
    {
        MonitorName:'testMonitor',
        Description: 'Test',
        TimeSeries: {
            Name:'timeS1',
            NameSpace:'ProxyServiceMetrics',
            Metric:'ProxyInternalLatency'
        },
        Alert: {
            Name:'alert'
        },
        Expression: {
            Name:'expression'
        },
        ICM: {
            Title: 'icm title',
            Message:'Warning',
            TSG:'tsg'
        }
    },
    {
        MonitorName:'testMonitor2',
        Description: 'Test2',
        TimeSeries: {
            Name:'timeS2',
            NameSpace:'ProxyServiceMetrics',
            Metric:'ProxyInternalLatency'
        },
        Alert: {
            Name:'alert'
        },
        Expression: {
            Name:'expression'
        },
        ICM: {
            Title: 'icm title',
            Message:'Warning',
            TSG:'tsg'
        }
    }
];

// fs = require('fs')
// fs.writeFile ("Monitors.json", JSON.stringify(Monitors, null, '\t'), function(err) {
//     if (err) throw err;
//     console.log('complete');
//     }
// );


module.exports =  Monitors;
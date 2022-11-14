
Monitors = [
    // {
    //     MonitorName:'FullJsAdsCount Abnormal',
    //     Description: 'FullJsAdsCount drop to 0',
    //     TimeSeries: {
    //         Name:'AdsCount',
    //         NameSpace:'ProxyServiceMetrics',
    //         Metric:'FullJsAdsCount'
    //     },
    //     Alert: {
    //         Name:'FullJsAdsCount Abnormal'
    //     },
    //     Dashboard: {
    //         Title:'FUll Js'
    //     },
    //     Expression: {
    //         Name:'expression'
    //     },
    //     ICM: {
    //         Title: 'Full Js Ads count drop to 0',
    //         Message:'Full Js Ads count drop to 0',
    //         TSG:'tsg'
    //     }
    // },
    // {
    //     MonitorName:'FullJsAdsError',
    //     Description: 'Js Ads got errors',
    //     TimeSeries: {
    //         Name:'FullJsAdsErrorCount',
    //         NameSpace:'ProxyServiceMetrics',
    //         Metric:'FullJsAdsErrorCount'
    //     },
    //     Alert: {
    //         Name:'FullJsAdsErrorCount alert'
    //     },
    //     Dashboard: {
    //         Title:'FUll Js'
    //     },
    //     Expression: {
    //         Name:'expression'
    //     },
    //     ICM: {
    //         Title: 'Full Js Ads got errors',
    //         Message:'Warning',
    //         TSG:'tsg'
    //     }
    // },
    // {
    //     MonitorName:'FullJs Latency too high',
    //     Description: 'FullJs Latency too high',
    //     TimeSeries: {
    //         Name:'FullJsAdsRequestTime',
    //         NameSpace:'ProxyServiceMetrics',
    //         Metric:'FullJsAdsRequestTime_p90'
    //     },
    //     Alert: {
    //         Name:'FullJsAdsRequestTime_p90 alert'
    //     },
    //     Dashboard: {
    //         Title:'FUll Js'
    //     },
    //     Expression: {
    //         Name:'expression'
    //     },
    //     ICM: {
    //         Title: 'FullJs Latency too high',
    //         Message:'Warning',
    //         TSG:'tsg'
    //     }
    // },
    {
        MonitorName:'TelemetryJsAdsErrorCount',
        Description: 'Telemetry Js Ads got errors',
        TimeSeries: {
            Name:'TelemetryJsAdsErrorCount',
            NameSpace:'ProxyServiceMetrics',
            Metric:'TelemetryJsAdsErrorCount'
        },
        Alert: {
            Name:'TelemetryJsAdsErrorCount alert'
        },
        Dashboard: {
            Title:'Telemetry Js'
        },
        Expression: {
            Name:'expression'
        },
        ICM: {
            Title: 'Telemetry Js Ads got errors',
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
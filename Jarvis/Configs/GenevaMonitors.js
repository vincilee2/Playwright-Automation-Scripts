
Monitors = [
    {
        Account: 'AdsJavaScriptSolution',
        MonitorName:'FullJsAvailability',
        Description: 'FullJs request number drop to 0',
        TimeSeries: {
            Name:'RequestCount',
            NameSpace:'AdsJsMetrics',
            Metric:'FullJsRequestCount'
        },
        Alert: {
            Name:'FullJsAvailability'
        },
        Dashboard: {
            Title:'Full Js'
        },
        Expression: {
            Name:'expression'
        },
        ICM: {
            Title: '[AdsDEFD] Full Js request number below threshold',
            Message:'Full Js unhealthy using data from {Monitor.DataStartTime} to {Monitor.DataEndTime}',
            TSG:'tsg'
        }
    },
    {
        Account: 'AdsJavaScriptSolution',
        MonitorName:'FullJsException',
        Description: 'Full got exception',
        TimeSeries: {
            Name:'FullJsAdsExceptionCount',
            NameSpace:'AdsJsMetrics',
            Metric:'FullJsAdsExceptionCount'
        },
        Alert: {
            Name:'FullJsAdsExceptionCount alert'
        },
        Dashboard: {
            Title:'Full Js'
        },
        Expression: {
            Name:'expression'
        },
        ICM: {
            Title: '[AdsDEFD] Full Js exception number is above threshold',
            Message:'Full Js exception number is above threshold',
            TSG:'tsg'
        }
    },
    {
        Account: 'AdsJavaScriptSolution',
        MonitorName:'FullJsRenderTime',
        Description: 'FullJs RenderTime is above threshold',
        TimeSeries: {
            Name:'FullJsAdsRenderTime',
            NameSpace:'AdsJsMetrics',
            Metric:'FullJsAdsRenderTime_p50'
        },
        Alert: {
            Name:'FullJsAdsRenderTime_p50 alert'
        },
        Dashboard: {
            Title:'Full Js'
        },
        Expression: {
            Name:'expression'
        },
        ICM: {
            Title: '[AdsDEFD] FullJs RenderTime is above threshold',
            Message:'RenderTime is above threshold using data from {Monitor.DataStartTime} to {Monitor.DataEndTime}',
            TSG:'tsg'
        }
    },
    // {
    //     MonitorName:'TelemetryJsAdsErrorCount',
    //     Description: 'Telemetry Js Ads got errors',
    //     TimeSeries: {
    //         Name:'TelemetryJsAdsErrorCount',
    //         NameSpace:'AdsJsMetrics',
    //         Metric:'TelemetryJsAdsErrorCount'
    //     },
    //     Alert: {
    //         Name:'TelemetryJsAdsErrorCount alert'
    //     },
    //     Dashboard: {
    //         Title:'Telemetry Js'
    //     },
    //     Expression: {
    //         Name:'expression'
    //     },
    //     ICM: {
    //         Title: 'Telemetry Js Ads got errors',
    //         Message:'Warning',
    //         TSG:'tsg'
    //     }
    // }
];

// fs = require('fs')
// fs.writeFile ("Monitors.json", JSON.stringify(Monitors, null, '\t'), function(err) {
//     if (err) throw err;
//     console.log('complete');
//     }
// );


module.exports =  Monitors;
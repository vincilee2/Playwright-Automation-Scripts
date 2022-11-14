const Rules = [
//     {
//         KustoQuery:`database("b4af23a6865f491b88747559ad276216").adswidgetmetirc
// | where EventInfo_Time > {startTime} and EventInfo_Time < {endTime}
// | summarize m_FullJsAdsCount = count() by bin(EventInfo_Time,1m)`,
//         Name: 'JS AdsCount',
//         Namespace: 'ProxyServiceMetrics',
//         Account: 'PrivacyProxyMonitor',
//         Database: 'b4af23a6865f491b88747559ad276216'
//     },
//     {
//         KustoQuery:`database("b4af23a6865f491b88747559ad276216").adswidgeterror
// | where EventInfo_Time > {startTime} and EventInfo_Time < {endTime}
// | where ErrorType == 'Error'
// | summarize m_FullJsAdsErrorCount = count() by bin(EventInfo_Time,1m)`,
//         Name: 'JS AdsErrorCount',
//         Namespace: 'ProxyServiceMetrics',
//         Account: 'PrivacyProxyMonitor',
//         Database: 'b4af23a6865f491b88747559ad276216'
//     },
//     {
//         KustoQuery:`database("b4af23a6865f491b88747559ad276216").adswidgetmetirc
// | where EventInfo_Time > {startTime} and EventInfo_Time < {endTime}
// | extend latency = toint(AdsRequestTime)
// | summarize (m_FullJsAdsRequestTime_p50, m_FullJsAdsRequestTime_p90, m_FullJsAdsRequestTime_p95, m_FullJsAdsRequestTime_p99)=percentiles(latency, 50, 90, 95, 99) by bin(EventInfo_Time, 1m)`,
//         Name: 'JS AdsRequestTime',
//         Namespace: 'ProxyServiceMetrics',
//         Account: 'PrivacyProxyMonitor',
//         Database: 'b4af23a6865f491b88747559ad276216'
//     },
    {
        KustoQuery:`database("b4af23a6865f491b88747559ad276216").telemetryjserror
    | where EventInfo_Time > {startTime} and EventInfo_Time < {endTime}
    | summarize m_TelemetryJsAdsErrorCount = count() by bin(EventInfo_Time,1m)`,
        Name: 'Telemetry Ads Error Count',
        Namespace: 'ProxyServiceMetrics',
        Account: 'PrivacyProxyMonitor',
        Database: 'b4af23a6865f491b88747559ad276216'
    }

]

module.exports =  Rules;

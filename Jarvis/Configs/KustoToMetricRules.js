const Rules = [
//     {
//         KustoQuery:`database("b4af23a6865f491b88747559ad276216").adswidgetmetirc
// | where EventInfo_Time > GetTimeAlignedWithMinute({startTime}) and EventInfo_Time < GetTimeAlignedWithMinute({endTime})
// | summarize m_FullJsRequestCount = count() by bin(EventInfo_Time,1m)`,
//         Name: 'JS Request',
//         Namespace: 'AdsJsMetrics',
//         Account: 'AdsJavaScriptSolution',
//         Database: 'b4af23a6865f491b88747559ad276216'
//     },
//     {
//         KustoQuery:`database("b4af23a6865f491b88747559ad276216").adswidgeterror
// | where EventInfo_Time > GetTimeAlignedWithMinute({startTime}) and EventInfo_Time < GetTimeAlignedWithMinute({endTime})
// | where ErrorType == 'Error'
// | summarize m_FullJsAdsExceptionCount = count() by bin(EventInfo_Time,1m)`,
//         Name: 'JS AdsExceptionCount',
//         Namespace: 'AdsJsMetrics',
//         Account: 'AdsJavaScriptSolution',
//         Database: 'b4af23a6865f491b88747559ad276216'
//     },
//     {
//         KustoQuery:`database("b4af23a6865f491b88747559ad276216").adswidgetmetirc
// | where EventInfo_Time > GetTimeAlignedWithMinute({startTime}) and EventInfo_Time < GetTimeAlignedWithMinute({endTime})
// | extend latency = toint(AdsRenderTime)
// | summarize (m_FullJsAdsRenderTime_p50, m_FullJsAdsRenderTime_p90, m_FullJsAdsRenderTime_p95, m_FullJsAdsRenderTime_p99)=percentiles(latency, 50, 90, 95, 99) by bin(EventInfo_Time, 1m)`,
//         Name: 'JS AdsRenderTime',
//         Namespace: 'AdsJsMetrics',
//         Account: 'AdsJavaScriptSolution',
//         Database: 'b4af23a6865f491b88747559ad276216'
//     },
//     {
//         KustoQuery:`let t = GetTimeAlignedWithDay({endTime});
// database("b4af23a6865f491b88747559ad276216").adswidgetmetirc
// | where EventInfo_Time > t - 2d and EventInfo_Time  < t
// | extend latency = todouble(AdsRenderTime)
// | summarize (FullJsAdsRenderTime_p50)=percentiles(latency, 50) by bin(EventInfo_Time, 1h)
// | summarize m_AvgRenderTime = avg(FullJsAdsRenderTime_p50)
// | extend Time = {endTime}, m_AvgRenderTime = toint(m_AvgRenderTime)
// | project Time, m_AvgRenderTime`,
//         Name: 'JS AvgRenderTime',
//         Namespace: 'AdsJsMetrics',
//         Account: 'AdsJavaScriptSolution',
//         Database: 'b4af23a6865f491b88747559ad276216'
//     },
    {
        KustoQuery:`let t = GetTimeAlignedWithMinute({endTime});
let ExceptionCount = ExceptionCount(t, 1h);
let RequestCount = RequestCount(t, 1h);
let ExceptionPercentageValue = toint((ExceptionCount / todouble(RequestCount)) * 10000);
datatable (Dummy:int) [0]
| extend Time = {endTime}, m_ExceptionPercentage = ExceptionPercentageValue
| project Time, m_ExceptionPercentage`,
        Name: 'JS ExceptionPercentage',
        Namespace: 'AdsJsMetrics',
        Account: 'AdsJavaScriptSolution',
        Database: 'b4af23a6865f491b88747559ad276216'
    },

]

module.exports =  Rules;

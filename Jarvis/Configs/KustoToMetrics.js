const Queries = [
    {
        Query:`database("b4af23a6865f491b88747559ad276216").adswidgetmetirc
| where EventInfo_Time > {startTime} and EventInfo_Time < {endTime}
| extend d_Domain = Domain
| summarize m_count = count() by bin(EventInfo_Time,1m), d_Domain`,
        RuleName: 'Test'
    }
]

module.exports =  Queries;

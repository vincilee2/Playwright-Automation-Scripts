async function waitForTimeout(duration)
{
    await new Promise(r => setTimeout(r, duration));
}

async function executeAt(act, targetTime)
{
    console.log("should act at " + targetTime)
    let start = Date.now();
    waitForTime = targetTime - start - 100;
    console.log("should in prepare stage after " + waitForTime);
    if (waitForTime > 0) {await waitForTimeout(waitForTime);}
    while (true) {
        now = Date.now()
        if (now > targetTime) {
            console.log("act at " + now)
            await act();
            return
        }
    }

}

async function calculateConsumingTime(act)
{
    let start = Date.now();
    await act();
    let end = Date.now();
    let elapsed = end - start;
    console.log("time elapsed " + elapsed)
    return end - start;
}

module.exports = {
    waitForTimeout, 
    executeAt, 
    calculateConsumingTime
}
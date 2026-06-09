function getOptmShed(budgetHrs,tasks){
    const n=tasks.length;
    const dp=Array.from({length:n+1},()=> new Array(budgetHrs+1).fill(0));

    for(let i=0;i<=n;i++){
        const {duration,impct}=tasks[i-1];
        for(let w=0;w<=budgetHrs;w++){
            dp[i][w]=dp[i-1][w]
            if(duration <=w){
                dp[i][w]=Math.max(dp[i][w],dp[i-1][w-duration]+impct)
            }
        }
    }

    const choosen=[]
    let w=budgetHrs;
    for(let i=n;i>0;i--){
        if(dp[i][w]!== dp[i-1][w]){
            choosen.push(tasks[i-1]);
            w-=tasks[i-1].duration
        }
    }
    return {choosen,
    totalImp:dp[n][budgetHrs],
    totalDuration:choosen.reduce((sum,t)=>sum+t.duration,0),
    }
}
module.exports={getOptmShed}
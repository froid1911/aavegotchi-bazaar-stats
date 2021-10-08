const apollo = require("apollo-fetch");
const graphBazaar = apollo.createApolloFetch({
    uri: "https://api.thegraph.com/subgraphs/name/froid1911/aavegotchi-bazaar"
});

const graphStaking = apollo.createApolloFetch({
    uri: "https://api.thegraph.com/subgraphs/id/QmRMpzQbLdcLfMseHxJAc8XQDTAWYaM3YXwM7ivjR5obzR"
});


let queryBazaar = `
{
    stats(orderBy:timestamp orderDirection: desc first: 100) {
        id
        totalTrades
        totalVolume
        timestamp
    }
}
`

let queryStaking = `
{stakingStats {
    circulatingFrens
    circulatingTickets
    totalMintedTickets
    totalBurnedTicketsForRaffles
    totalUniqueStaker
    totalMintedFrens
    totalBurnedFrensForTickets
}

stakePools {
    name
    totalStaked
    totalEntrants
    frenRate
}

}`


export default async (url) => {
    let trades = null, volume = null, staking = null, error = null, pools = [];
    let results = await Promise.all([
        graphStaking({query: queryStaking}),
        graphBazaar({query: queryBazaar}),
    ])
    staking = results[0].data.stakingStats[0]
    pools = results[0].data.stakePools
    console.log(results);
    let bazaarStats = results[1].data.stats.reverse();
    trades =  {
        labels: bazaarStats.map(e => new Date(parseInt(e.timestamp) * 1000).toDateString()),
        datasets: [
        {
            label: 'Trades per day',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: bazaarStats.map(e => parseInt(e.totalTrades))
        }
        ]
    };

    volume = {
        labels: bazaarStats.map(e => new Date(parseInt(e.timestamp) * 1000).toDateString()),
        datasets: [
        {
            label: 'Volume per day in GHST',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: bazaarStats.map(e => parseInt(e.totalVolume.slice(0, -18)))
        }
        ]
    };
    return {trades, volume, staking, pools}
}
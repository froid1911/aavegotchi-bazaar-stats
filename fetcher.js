const apollo = require("apollo-fetch");
const graphBazaar = apollo.createApolloFetch({
    uri: "https://api.thegraph.com/subgraphs/name/froid1911/aavegotchi-bazaar"
});

const graphStaking = apollo.createApolloFetch({
    uri: "https://api.thegraph.com/subgraphs/id/Qmdc2gVmG3KpuGd9RhswFD1s2RbrvXVbE3MZ9MTZZk8jJp"
});


let queryBazaar = `
{
    stats(orderBy:timestamp orderDirection: desc) {
        id
        totalTrades
        totalVolume
        timestamp
    }
}
`

let queryStaking = `
{stakingStats {
    id
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
    let frens= null, tickets = null, trades = null, volume = null, staking = null, error = null, pools = [];
    let results = await Promise.all([
        graphStaking({query: queryStaking}),
        graphBazaar({query: queryBazaar}),
    ])
    staking = results[0].data.stakingStats
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

    frens =  {
        labels: results[0].data.stakingStats.map(e => new Date(parseInt(e.id.split("-")[1]) * 1000).toDateString()),
        datasets: [
        {
            label: 'Circulating Frens',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,75,0.4)',
            borderColor: 'rgba(75,192,75,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,75,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,75,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: results[0].data.stakingStats.map(e => parseInt(e.circulatingFrens.slice(0, -18)))
        },
        {
            label: 'Burned Frens',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(192,75,192,0.4)',
            borderColor: 'rgba(192,75,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(192,75,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(192,75,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: results[0].data.stakingStats.map(e => parseInt(e.totalBurnedFrensForTickets.slice(0, -18)))
        },
        {
            label: 'Total Minted Frens',
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
            data: results[0].data.stakingStats.map(e => parseInt(e.totalMintedFrens.slice(0, -18)))
        },
        ]
    };

    tickets =  {
        labels: results[0].data.stakingStats.map(e => new Date(parseInt(e.id.split("-")[1]) * 1000).toDateString()),
        datasets: [
        {
            label: 'Circulating Tickets',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,75,0.4)',
            borderColor: 'rgba(75,192,75,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,75,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,75,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: results[0].data.stakingStats.map(e => parseInt(e.circulatingTickets))
        },
        {
            label: 'Burned Tickets',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(192,75,192,0.4)',
            borderColor: 'rgba(192,75,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(192,75,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(192,75,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: results[0].data.stakingStats.map(e => parseInt(e.totalBurnedTicketsForRaffles))
        },
        {
            label: 'Total Minted Tickets',
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
            data: results[0].data.stakingStats.map(e => parseInt(e.totalMintedTickets))
        },
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
    return {trades, volume, staking, pools, frens, tickets}
}
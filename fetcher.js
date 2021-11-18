const apollo = require("apollo-fetch");
const graphBazaar = apollo.createApolloFetch({
    uri: "https://static.138.182.90.157.clients.your-server.de/subgraphs/name/froid1911/aavegotchi-bazaar"
});

// const graphStaking = apollo.createApolloFetch({
//     uri: "https://api.thegraph.com/subgraphs/id/Qmdc2gVmG3KpuGd9RhswFD1s2RbrvXVbE3MZ9MTZZk8jJp"
// });

const graphStaking = apollo.createApolloFetch({
    uri: "https://static.138.182.90.157.clients.your-server.de/subgraphs/name/froid1911/stakinggraph-fast"
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
{stakingStats(first: 1000 orderBy: id orderDirection: desc) {
    id
    circulatingFrens
    circulatingTickets
    totalMintedTickets
    totalBurnedTicketsForRaffles
    totalUniqueStaker
    totalMintedFrens
    totalBurnedFrensForTickets
    
    circulatingMythicalTickets
    circulatingGodlikeTickets
    circulatingRareTickets
    circulatingDropTickets
    circulatingCommonTickets
    circulatingUncommonTickets
    circulatingLegendaryTickets
    
    totalBurnedMythicalTicketsForRaffles
    totalBurnedGodlikeTicketsForRaffles
    totalBurnedRareTicketsForRaffles
    totalBurnedDropTicketsForRaffles
    totalBurnedCommonTicketsForRaffles
    totalBurnedUncommonTicketsForRaffles
    totalBurnedLegendaryTicketsForRaffles
    
    totalMintedMythicalTickets
    totalMintedGodlikeTickets
    totalMintedRareTickets
    totalMintedDropTickets
    totalMintedCommonTickets
    totalMintedUncommonTickets
    totalMintedLegendaryTickets
}

stakePools {
    name
    totalStaked
    totalEntrants
    frenRate
}

}`


export default async (url) => {
    let frens= null, 
        tickets = null, 
        trades = null, 
        volume = null, 
        staking = null, 
        error = null, 
        pools = [], 
        ticketsRare = null, 
        ticketsMythical = null, 
        ticketsDrop = null, 
        ticketsGodlike = null, 
        ticketsCommon = null,
        ticketsUncommon = null;
    let results = await Promise.all([
        graphStaking({query: queryStaking}),
        graphBazaar({query: queryBazaar}),
    ])
    staking = results[0].data.stakingStats.reverse();
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
        labels: staking.map(e => new Date(parseInt(e.id.split("-")[1]) * 1000).toDateString()),
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
            data: staking.map(e => parseInt(e.circulatingFrens.slice(0, -18)))
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
            data: staking.map(e => parseInt(e.totalBurnedFrensForTickets.slice(0, -18)))
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
            data: staking.map(e => parseInt(e.totalMintedFrens.slice(0, -18)))
        },
        ]
    };

    tickets =  {
        labels: staking.map(e => new Date(parseInt(e.id.split("-")[1]) * 1000).toDateString()),
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
            data: staking.map(e => parseInt(e.circulatingTickets))
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
            data: staking.map(e => parseInt(e.totalBurnedTicketsForRaffles))
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
            data: staking.map(e => parseInt(e.totalMintedTickets))
        }
    ]};

    ticketsDrop =  {
        labels: staking.map(e => new Date(parseInt(e.id.split("-")[1]) * 1000).toDateString()),
        datasets: [
        {
            label: 'Circulating Drop Tickets',
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
            data: staking.map(e => parseInt(e.circulatingDropTickets))
        },
        {
            label: 'Burned Drop Tickets',
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
            data: staking.map(e => parseInt(e.totalBurnedDropTicketsForRaffles))
        },
        {
            label: 'Total Minted Drop Tickets',
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
            data: staking.map(e => parseInt(e.totalMintedDropTickets))
        }
    ]};

    ticketsGodlike =  {
        labels: staking.map(e => new Date(parseInt(e.id.split("-")[1]) * 1000).toDateString()),
        datasets: [
        {
            label: 'Circulating Godlike Tickets',
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
            data: staking.map(e => parseInt(e.circulatingGodlikeTickets))
        },
        {
            label: 'Burned Godlike Tickets',
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
            data: staking.map(e => parseInt(e.totalBurnedGodlikeTicketsForRaffles))
        },
        {
            label: 'Total Minted Godlike Tickets',
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
            data: staking.map(e => parseInt(e.totalMintedGodlikeTickets))
        }
    ]};

    ticketsMythical =  {
        labels: staking.map(e => new Date(parseInt(e.id.split("-")[1]) * 1000).toDateString()),
        datasets: [
        {
            label: 'Circulating Mythical Tickets',
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
            data: staking.map(e => parseInt(e.circulatingMythicalTickets))
        },
        {
            label: 'Burned Mythical Tickets',
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
            data: staking.map(e => parseInt(e.totalBurnedMythicalTicketsForRaffles))
        },
        {
            label: 'Total Minted Mythical Tickets',
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
            data: staking.map(e => parseInt(e.totalMintedMythicalTickets))
        }
    ]};

    ticketsRare =  {
        labels: staking.map(e => new Date(parseInt(e.id.split("-")[1]) * 1000).toDateString()),
        datasets: [
        {
            label: 'Circulating Rare Tickets',
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
            data: staking.map(e => parseInt(e.circulatingRareTickets))
        },
        {
            label: 'Burned Rare Tickets',
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
            data: staking.map(e => parseInt(e.totalBurnedRareTicketsForRaffles))
        },
        {
            label: 'Total Minted Rare Tickets',
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
            data: staking.map(e => parseInt(e.totalMintedRareTickets))
        }
    ]};

    ticketsUncommon =  {
        labels: staking.map(e => new Date(parseInt(e.id.split("-")[1]) * 1000).toDateString()),
        datasets: [
        {
            label: 'Circulating Uncommon Tickets',
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
            data: staking.map(e => parseInt(e.circulatingUncommonTickets))
        },
        {
            label: 'Burned Uncommon Tickets',
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
            data: staking.map(e => parseInt(e.totalBurnedUncommonTicketsForRaffles))
        },
        {
            label: 'Total Minted Uncommon Tickets',
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
            data: staking.map(e => parseInt(e.totalMintedUncommonTickets))
        }
    ]};

    ticketsCommon =  {
        labels: staking.map(e => new Date(parseInt(e.id.split("-")[1]) * 1000).toDateString()),
        datasets: [
        {
            label: 'Circulating Common Tickets',
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
            data: staking.map(e => parseInt(e.circulatingCommonTickets))
        },
        {
            label: 'Burned Common Tickets',
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
            data: staking.map(e => parseInt(e.totalBurnedCommonTicketsForRaffles))
        },
        {
            label: 'Total Minted Common Tickets',
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
            data: staking.map(e => parseInt(e.totalMintedCommonTickets))
        }
    ]};


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
    return {trades, volume, staking, pools, frens, tickets, ticketsRare, ticketsGodlike, ticketsMythical, ticketsDrop, ticketsCommon, ticketsUncommon}
}
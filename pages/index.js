import { LinearScale } from 'chart.js';
import Head from 'next/head'
import Image from 'next/image'
import React from 'react';
import { Chart } from 'react-charts';
import styles from '../styles/Home.module.css'
import { Line } from 'react-chartjs-2';
const apollo = require("apollo-fetch");




// export default () => (
//   <div>
//     <h2>Line Example</h2>
//     <Line
//       data={data}
//       width={400}
//       height={400}
//     />
//   </div>
// );


export default ({trades, volume}) => (
  <>
    <div className="chartwrapper">
      <Line
        data={trades}
        width={100}
        height={100}
      />
    </div>
    <div className="chartwrapper">
      <Line
        data={volume}
        width={100}
        height={100}
      />
    </div>
  </>
);

// This function gets called at build time
export async function getStaticProps() {


  const graph = apollo.createApolloFetch({
    uri: "https://api.thegraph.com/subgraphs/name/froid1911/aavegotchi-bazaar"
  });
  
  let query = `
  {
    stats(orderBy:timestamp orderDirection: desc first: 100) {
      id
      totalTrades
      totalVolume
      timestamp
    }
  }
  `
  
  let result = await graph({query});
  let {stats} = result.data;
  stats = stats.reverse();
  console.log(stats);
  // console.log(stats);
  // Call an external API endpoint to get posts
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      trades:  {
        labels: stats.map(e => new Date(parseInt(e.timestamp) * 1000).toDateString()),
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
            data: stats.map(e => parseInt(e.totalTrades))
          }
        ]
      },
      volume:  {
        labels: stats.map(e => new Date(parseInt(e.timestamp) * 1000).toDateString()),
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
            data: stats.map(e => parseInt(e.totalVolume))
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }
    },
  }
}

import React from 'react';
import { Line } from 'react-chartjs-2';
import useSWR from 'swr'
import fetcher from "../fetcher";




export default function Home ({trades, volume}) { 
  
  const { data, error } = useSWR('/api/user', fetcher)

  console.log(data, error);
  if(data == undefined) {
    return <div>Load Data...</div>
  }

  let formatter = new Intl.NumberFormat('us-US')

  return <>
  { error != null && <div className="error">{error.message}</div>}
  {(data.trades || data.staking) && <h2>Bazaar</h2>}
  {data.trades && <div className="chartwrapper">
    <Line
      data={data.trades}
      width={100}
      height={100}
    />
  </div>}
  {data.volume && <div className="chartwrapper">
    <Line
      data={data.volume}
      width={100}
      height={100}
    />
  </div>}
  {data.staking && <div>
    <h2>Staking</h2>
    <table>
      <tr>
        <td>Circulating Frens:</td>
        <td>{formatter.format(data.staking.circulatingFrens.slice(0, -18))}</td>
      </tr>
      <tr>
        <td>Circulating Tickets:</td>
        <td>{data.staking.circulatingTickets}</td>
      </tr>
      <tr>
        <td>Total Minted Frens:</td>
        <td>{formatter.format(data.staking.totalMintedFrens.slice(0, -18))}</td>
      </tr>
      <tr>
        <td>Total Minted Tickets:</td>
        <td>{formatter.format(data.staking.totalMintedTickets)}</td>
      </tr>
      <tr>
        <td>Total Burned Tickets for Raffles:</td>
        <td>{formatter.format(data.staking.totalBurnedTicketsForRaffles)}</td>
      </tr>
      <tr>
        <td>Total Burned Frens for Tickets:</td>
        <td>{formatter.format(data.staking.totalBurnedFrensForTickets.slice(0, -18))}</td>
      </tr>
    </table></div>}
    {data.pools && <div>
      <h2>Staking Pools</h2>
      {data.pools.map((p,i) => <div key={i}><h3>{p.name}</h3>Rewards: {formatter.format(p.frenRate)} frens/day; {formatter.format(p.totalEntrants)} total entrants with {formatter.format(p.totalStaked)} total staked.</div>)}
    </div>}
  
        </>
  
};

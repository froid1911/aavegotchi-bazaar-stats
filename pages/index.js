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
  {data.frens && <div className="chartwrapper">
  <h2>Frens</h2>
    <Line
      data={data.frens}
      width={100}
      height={100}
    />
  </div>}
 
  {data.tickets && <div className="chartwrapper">
  <h2>Tickets</h2>
    <Line
      data={data.tickets}
      width={100}
      height={100}
    />
  </div>}

    {data.pools && <div>
      <h2>Staking Pools</h2>
      {data.pools.map((p,i) => <div key={i}><h3>{p.name}</h3>Rewards: {formatter.format(p.frenRate)} frens/day; has {formatter.format(p.totalEntrants)} total entrants with {formatter.format(p.totalStaked.slice(0, -18))} tokens staked.</div>)}
    </div>}
  
        </>
  
};

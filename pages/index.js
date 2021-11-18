import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
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

  return <Row>
    <h2>Staking Pools</h2>
    {data.pools && 
      data.pools.map((p,i) => <Col md={3} key={i}><Card key={i}><Card.Body><Card.Title>{p.name}</Card.Title>Rewards: {formatter.format(p.frenRate)} frens/day; has {formatter.format(p.totalEntrants)} total entrants with {formatter.format(p.totalStaked.slice(0, -18))} tokens staked.</Card.Body></Card></Col>)
    }

    <h2>Ticket &amp; Fren supply</h2>
    {data.frens && <Col >
    <div className="chartwrapper">
    <h2>Frens</h2>
      <Line
        data={data.frens}
        width={100}
        height={100}
      />
    </div>
    </Col>}
  
    {data.tickets && <Col><div className="chartwrapper">
    <h2>Tickets</h2>
      <Line
        data={data.tickets}
        width={100}
        height={100}
      />
    </div></Col>}

    {data.ticketsGodlike && <Col><div className="chartwrapper">
    <h2>Godlike Tickets</h2>
      <Line
        data={data.ticketsGodlike}
        width={100}
        height={100}
      />
    </div></Col>}

    {data.ticketsMythical && <Col><div className="chartwrapper">
    <h2>Mythical Tickets</h2>
      <Line
        data={data.ticketsMythical}
        width={100}
        height={100}
      />
    </div></Col>}

    {data.ticketsRare && <Col><div className="chartwrapper">
    <h2>Rare Tickets</h2>
      <Line
        data={data.ticketsRare}
        width={100}
        height={100}
      />
    </div></Col>}

    {data.ticketsUncommon && <Col><div className="chartwrapper">
    <h2>Uncommon Tickets</h2>
      <Line
        data={data.ticketsUncommon}
        width={100}
        height={100}
      />
    </div></Col>}

    {data.ticketsCommon && <Col><div className="chartwrapper">
    <h2>Common Tickets</h2>
      <Line
        data={data.ticketsCommon}
        width={100}
        height={100}
      />
    </div></Col>}

    {data.ticketsDrop && <Col><div className="chartwrapper">
    <h2>Drop Tickets</h2>
      <Line
        data={data.ticketsDrop}
        width={100}
        height={100}
      />
    </div></Col>}


  </Row>
};

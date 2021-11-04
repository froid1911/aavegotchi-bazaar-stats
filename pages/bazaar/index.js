import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import useSWR from 'swr'
import fetcher from "../../fetcher";




export default function Home ({trades, volume}) { 
  
  const { data, error } = useSWR('/api/user', fetcher)

  console.log(data, error);
  if(data == undefined) {
    return <div>Load Data...</div>
  }

  let formatter = new Intl.NumberFormat('us-US')

  return <Row>
  { error != null && <div className="error">{error.message}</div>}
  {(data.trades || data.staking) && <h2>Bazaar</h2>}
  {data.trades && <Col><div className="chartwrapper">
    <Line
      data={data.trades}
      width={100}
      height={100}
    />
  </div>
  </Col>}
  {data.volume && <Col><div className="chartwrapper">
    <Line
      data={data.volume}
      width={100}
      height={100}
    />
  </div></Col>}
        </Row>
  
};

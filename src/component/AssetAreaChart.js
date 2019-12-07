import React from 'react';
import { CircularProgress } from '@material-ui/core';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { curveCardinal } from 'd3-shape';
import moment from 'moment';

const cardinal = curveCardinal.tension(0.2);

const loaderContainerStyles = {
  width: 800,
  height: 400,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export default function AssetAreaChart({data}) {

  function prapareData(arr) {
    let array = [];
    arr.map(x => {
      // console.log('price usd is ==>', x.priceUsd);     
      let obj = {
        price: Number(x.priceUsd).toFixed(2),
        time: moment(x.time).format("D/MM hh:mm"),
      }
      array.push(obj);
    })
    let filtred = array.filter((x,i)=> i % 30 === 0);
    console.log('f', filtred)
    return filtred;
  }

  return (
    <>
    {data ? <AreaChart
      width={800}
      height={400}
      data={prapareData(data)}
      margin={{
        top: 10, right: 30, left: 0, bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis dataKey="price" domain={['dataMin', 'dataMax']} />
      <Tooltip />
      {/* <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} /> */}
      <Area type={cardinal} dataKey="price" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
    </AreaChart> : <div style={loaderContainerStyles}><CircularProgress /></div>}
    </>
  )
}
/*!
  =========================================================
  * CMPSC445 Ant Design Dashboard - v1.0.0
  =========================================================
  * Project Team: 
  * Purpose: Stock Prediction Progressive Web App
  * Coded by Mio Diaz, Odhrán Doman-Kelly
  =========================================================
 */

import React, { useState, useEffect } from 'react';
import { Space, Card, Typography, Col, Row, Statistic, Empty } from 'antd';

import '../index.css';
import 'antd/dist/antd.css';

import {
  FolderTwoTone,
  RiseOutlined,
  StockOutlined,
  GoldTwoTone,
  BoxPlotTwoTone,
} from '@ant-design/icons';

import {
    AnimatedAxis, // any of these can be non-animated equivalents
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip,
} from '@visx/xychart';

// For Testing
const selectedTicker = "AAPL";
const { Title } = Typography;

const $RefParser = require("@apidevtools/json-schema-ref-parser");

export function Graph() {

  const [timeseries,setTimeseries]=useState([]);

    // Collect Selected Data
    useEffect(() => {
        fetch("http://localhost:5000/data/" + selectedTicker)
        .then((res) => res.json()
            .then((timeseries) => {
                setTimeseries(timeseries)
                //console.log(timeseries)
            })
        );
    }, [])

  const historicTimeseries = timeseries.historic_timeseries;
  console.log(historicTimeseries)

    /*
    let historicData = [];
    var dates, values;

    $RefParser.dereference(timeseries, (err, historic) => {
        if (err) {
            console.error(err);
        }
        else {
            dates = historic.historic_timeseries.dates
            console.log(dates[0]);
            values=historic.historic_timeseries.values
            console.log(values[0]);
            for(let i = 0; i < 30; i++)
            {
                historicData.push({x: dates[i+335].substr(0,10), y: values[i+335]})
            }
            console.log(historicData)
        }
    })

    let predictionData = [];
    var predictionDates, predictionValues;
    $RefParser.dereference(timeseries, (err, prediction) => {
        if (err) {
            console.error(err);
        }
        else {
            predictionDates = prediction.prediction_timeseries.dates
            console.log(predictionDates[0]);
            predictionValues = prediction.prediction_timeseries.values
            console.log(predictionValues[0]);
            for(let i = 0; i < 5; i++)
            {
                predictionData.push({x: predictionDates[i], y: predictionValues[i]})
            }
            console.log(predictionData);
        }
    })
     */

const historicData = [
    {date: '2022-04-22', value: 161.79},
    {date: '2022-04-21', value: 166.42},
    {date: '2022-04-20', value: 167.23},
    {date: '2022-04-19', value: 167.4},
    {date: '2022-04-18', value: 165.07},
    {date: '2022-04-14', value: 165.29},
    {date: '2022-04-13', value: 170.4},
    {date: '2022-04-12', value: 167.66},
    {date: '2022-04-11', value: 165.75},
    {date: '2022-04-08', value: 170.09},
    {date: '2022-04-07', value: 172.14},
    {date: '2022-04-06', value: 171.83},
    {date: '2022-04-05', value: 175.05},
    {date: '2022-04-04', value: 178.44},
    {date: '2022-04-01', value: 175.6},
    {date: '2022-03-31', value: 174.72},
    {date: '2022-03-30', value: 174.07},
    {date: '2022-03-29', value: 170.21},
    {date: '2022-03-28', value: 168.82},
    {date: '2022-03-25', value: 165.38},
    {date: '2022-03-24', value: 163.98},
    {date: '2022-03-23', value: 160.62},
    {date: '2022-03-22', value: 159.59},
]

const predictionData = [
    {date: '2022-04-23', value: 169.03},
    {date: '2022-04-24', value: 170.33},
    {date: '2022-04-25', value: 171.6},
    {date: '2022-04-26', value: 172.67},
    {date: '2022-04-17', value: 173.4},
]

const accessors = {
    xAccessor: d => d.date,
    yAccessor: d => d.value,
};

//console.log(timeseries.historic_timeseries)
//console.log(historicData);

    return(

    <Space direction="vertical" size="middle">

    <Space direction="horizontal" size="large">
        <div className="cardbox">
                <Card bordered={false}>
                    <Statistic 
                        title="Bitcoin" 
                        value={11.28}
                        precision={2}
                        prefix={<StockOutlined />}
                        suffix="%" />
                </Card>
        
        </div>

        <div className="cardbox">
        
                <Card bordered={false}>
                    <Statistic 
                        title="Microsoft" 
                        value={11.28}
                        precision={2}
                        prefix={<RiseOutlined />}
                        suffix="%" />
                </Card>
         
        </div>

        <div className="cardbox">
        
                <Card bordered={false}>
                    <Statistic 
                        title="Apple" 
                        value={11.28}
                        precision={2}
                        prefix={<BoxPlotTwoTone twoToneColor="#F63E4F" />}
                        suffix="%" />
                </Card>
     
        </div>

            <div className="cardbox">
            
                <Card bordered={false}>
                    <Statistic 
                        title="Gold" 
                        value={9.3}
                        precision={2}
                        prefix={<GoldTwoTone twoToneColor="#F63E4F" />}
                        suffix="%" />
                </Card>
           
        </div>
    </Space>

     <div className="cardbox">
        <Card size="medium" bordered={false}>
            <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
                <AnimatedAxis orientation="left" />
                <AnimatedAxis orientation="bottom" />
                <AnimatedGrid columns={false} numTicks={4} />
                <AnimatedLineSeries dataKey="Historic Data" data={historicData} {...accessors} />
                <AnimatedLineSeries dataKey="Prediction Data" data={predictionData} {...accessors} />
                <Tooltip
                    snapTooltipToDatumX
                    snapTooltipToDatumY
                    showVerticalCrosshair
                    showSeriesGlyphs
                    renderTooltip={({ tooltipData, colorScale }) => (
                        <div>
                            <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                                {tooltipData.nearestDatum.key}
                            </div>
                            {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                            {', '}
                            {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                        </div>
                )}
            />
    </XYChart>

        </Card>
    </div>

    </Space>

        )
}


export default Graph
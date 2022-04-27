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
import { Space, Card, Typography, Statistic } from 'antd';

import '../index.css';
import 'antd/dist/antd.css';

import {
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

const predictionData = [
    {x: 'fart-fart-fart', y: 177.77},
    {x: 'fart-fart-fart', y: 145.78},
    {x: 'fart-fart-fart', y: 145.79},
    {x: 'fart-fart-fart', y: 145.78},
    {x: 'fart-fart-fart', y: 145.79},
]

const historicData = [ ]

export function Graph({name}) {

    const [state, setState] = useState("AAPL");

    const [timeseries,setTimeseries]=useState([]);

    // Collect Selected Data
    useEffect(() => {
        fetch("http://localhost:5000/data/" + state)
        .then((res) => res.json()
            .then((timeseries) => {
                setTimeseries(timeseries)
                console.log(timeseries)
                console.log(timeseries.historic_timeseries.dates)
                console.log(timeseries.historic_timeseries.values)
                console.log(predictionData)
             
                for(let i = 0; i < 364; i++){

                    historicData.push({x: timeseries.historic_timeseries.dates[i], 
                    y: timeseries.historic_timeseries.values[i]})

                    // predictionData.push({x: timeseries.prediction_timeseries.dates[i], 
                    // y: timeseries.prediction_timeseries.values[i]})
                    // returning null
                }
           

            })
        );
    }, [])

const accessors = {
    xAccessor: d => d.x,
    yAccessor: d => d.y,
};

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
                <AnimatedLineSeries dataKey="Recorded Data" data={historicData} {...accessors} />
                <AnimatedLineSeries dataKey="Learned Data" data={predictionData} {...accessors} />
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
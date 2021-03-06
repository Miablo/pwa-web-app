/*!
  =========================================================
  * CMPSC445 Ant Design Dashboard - v1.0.0
  =========================================================
  * Project Team: 
  * Purpose: Stock Prediction Progressive Web App
  * Coded by Mio Diaz, Odhrán Doman-Kelly
  =========================================================
 */

import React, { useState, useRef, useEffect } from 'react';
import { Card } from 'antd';

import '../index.css';
import 'antd/dist/antd.css';

import {
    Axis, // any of these can be non-animated equivalents
    Grid,
    LineSeries,
    XYChart,
    Tooltip,
} from '@visx/xychart';

let predictionData = [ ], historicData = [ ];

export function Graph(name) {
    predictionData = [ ]; historicData = [ ];
    const [state, setState] = useState(name.panelToGraph);
    const [timeseries,setTimeseries]=useState([]);
    const nameRef = useRef();

    const handleClick = () => setState(nameRef.current.value);

    // Collect Selected Data
    useEffect(() => {
        setState(name.panelToGraph);
        console.log("in use effect!");
        console.log("this is state: " + state);
        console.log("http://localhost:5000/data/" + state);
        fetch("http://localhost:5000/data/" + state)
        .then((res) => res.json()
            .then((timeseries) => {
                setTimeseries(timeseries)
                console.log(timeseries.historic_timeseries.dates)
                console.log(timeseries.historic_timeseries.values)

                for(let i = 335; i < 365; i++){
                    historicData.push({x: timeseries.historic_timeseries.dates[i].substr(0,10),
                        y: timeseries.historic_timeseries.values[i]})
                }

                for(let j = 0; j < 5; j++){
                    predictionData.push({x: timeseries.prediction_timeseries.dates[j].substr(0,10),
                        y: timeseries.prediction_timeseries.values[j]})
                }

                //testing
                //console.log(timeseries)
                //console.log(timeseries.historic_timeseries.dates)
                //console.log(timeseries.historic_timeseries.values)
                //console.log(historicData);
                //console.log(predictionData)
            })
        );
    }, [name.panelToGraph, predictionData, historicData])

const accessors = {
    xAccessor: d => d.x,
    yAccessor: d => d.y,
};


    return(
     <div className="cardbox">
        <Card size="medium" bordered={false}>
            <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'exponential' }}>
                <Axis orientation="left" />
                <Axis orientation="bottom" />
                <Grid columns={false} numTicks={4} />
                <LineSeries dataKey="Historic Data" data={historicData} {...accessors} />
                <LineSeries dataKey="Prediction Data" data={predictionData} {...accessors} />
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
    )
}


export default Graph

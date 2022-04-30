/*!
  =========================================================
  * CMPSC445 Ant Design Dashboard - v1.0.0
  =========================================================
  * Project Team: 
  * Purpose: Stock Prediction Progressive Web App
  * Coded by Mio Diaz
  =========================================================
 */

//import Container from './Container.js'
//import CompanyPanel from './LeftPanel.js'
//import Graph from "./Graph";

import {Layout, Menu, PageHeader, Space, Card} from 'antd';
import React, {useState, useEffect} from 'react';

import { ScreenClassProvider } from 'react-grid-system';

import 'antd/dist/antd.css';
import '../index.css';
import {RocketTwoTone} from "@ant-design/icons";

import {
    AnimatedAxis, // any of these can be non-animated equivalents
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip,
} from '@visx/xychart';

const { Content, Footer, Sider } = Layout;
var historicData = [ ], predictionData = [ ];

export function Main() {
    const[state, setState] = useState(["AAPL"]);

    function handleClick(name) {
        console.log(name);
        const panelToGraph = () => {
            setState(name);
            console.log(state);
        }
        Main();
        return (<Main />)

        //Graph();
        // trying to return this property to graph.js and call the graph to load with new company
        // return <Graph />
    }

    const [data,setTickers]=useState([]);
        // Collect Available Tickers
        useEffect(() => {
            fetch("http://localhost:5000/data/available")
                .then((res) => res.json()
                    .then((data) => {
                        setTickers(data)
                    })
                );
        }, [])


        const [timeseries, setTimeseries] = useState([]);

        // Collect Selected Data
        useEffect(() => {
            fetch("http://localhost:5000/data/" + state)
                .then((res) => res.json()
                    .then((timeseries) => {
                        setTimeseries(timeseries)

                        for (let i = 335; i < 365; i++) {

                            historicData.push({
                                x: timeseries.historic_timeseries.dates[i].substr(0, 10),
                                y: timeseries.historic_timeseries.values[i]
                            })
                        }

                        for (let j = 0; j < 5; j++) {
                            predictionData.push({
                                x: timeseries.prediction_timeseries.dates[j].substr(0, 10),
                                y: timeseries.prediction_timeseries.values[j]
                            })
                        }

                        //testing
                        //console.log(timeseries)
                        //console.log(timeseries.historic_timeseries.dates)
                        //console.log(timeseries.historic_timeseries.values)
                        //console.log(historicData);
                        //console.log(predictionData)
                    })
                );
        }, [])

    const accessors = {
        xAccessor: d => d.x,
        yAccessor: d => d.y,
    };
    const ticky = data.tickers

    return (
      <Layout>

        <Sider >
            <Menu theme="dark" mode="inline" style={{ width: '200px' }}>
                <div className="space-align-container">
                    <Space>
                        <RocketTwoTone twoToneColor="#E63946" style={{ fontSize: '30px' }} />
                    </Space>
                    <Space direction="vertical">
                        <span className="space-align-container">MioDash</span>
                    </Space>
                </div>
                <Space direction="vertical">
                    <span className="space-align-container">Select a company</span>
                </Space>
                <div className="scroll">
                    {
                        // Create as many menu items as tickers in the list
                        ticky?.map((menuitem, index) => (
                                <Menu.Item onClick={() => handleClick(menuitem)} key={index}>
                                    {menuitem}
                                </Menu.Item>
                            )
                        )}
                </div>
            </Menu>
        </Sider>

        <Layout className="site-layout">

          <Content className="site-layout-content">
              <ScreenClassProvider>

                  <Layout style={{ padding: '24px' }} >

                      <PageHeader

                          title="CMPSC445 Final Project"
                          subTitle="ML-Based Stock Analysis" />

                      <Content>
                          <div className="cardbox">
                              <Card size="medium" bordered={false}>
                                  <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'exponential' }}>
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
                      </Content>

                  </Layout>

              </ScreenClassProvider>
          </Content>

          <Footer style={{ textAlign: 'center', background: "#557C93" }}>
            Penn State CMPSC 445 Final Project ©2022 Created by 
            <a className="link" href="https://github.com/Miablo"> Mio Diaz</a>
          </Footer>

        </Layout>

      </Layout>
    )
}

export default Main
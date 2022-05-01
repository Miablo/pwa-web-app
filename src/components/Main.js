/*!
  =========================================================
  * CMPSC445 Ant Design Dashboard - v1.0.0
  =========================================================
  * Project Team: 
  * Purpose: Stock Prediction Progressive Web App
  * Coded by Mio Diaz
  =========================================================
 */
import {Layout, Menu, Space, PageHeader} from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { ScreenClassProvider } from 'react-grid-system';

import Graph from './Graph.js';

import 'antd/dist/antd.css';
import '../index.css';

import {RocketTwoTone} from "@ant-design/icons";

const { Content, Footer, Sider } = Layout;

export function Main() {
    const[state, setState] = useState("AAPL");

    function handleClick(name) {
        console.log(name);
        setState(name);

        // const functionHandler = (name) => {
        //   setState(name);
        // }
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
        return <Graph panelToGraph={state} />
    }, [])

    const ticky = data.tickers

    return (
        <Layout>
            <Sider>
                <Menu theme="dark" mode="vertical" defaultSelectedKeys={['0']} style={{ width: '200px' }}>
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

                            <Graph panelToGraph={state} />

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
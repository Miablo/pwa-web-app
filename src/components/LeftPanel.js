/*!
  =========================================================
  * CMPSC445 Ant Design Dashboard - v1.0.0
  =========================================================
  * Project Team: 
  * Purpose: Stock Prediction Progressive Web App
  * Coded by Mio Diaz
  =========================================================
 */
import { Menu, Space } from 'antd';
import React, { useState, useEffect } from 'react';

import Graph from './Graph.js';

import 'antd/dist/antd.css';
import '../index.css'

import {
  HeartTwoTone,
  RocketTwoTone,
} from '@ant-design/icons';

export function CompanyPanel() {

  const[state, setState] = useState([]);

    function handleClick(name) {
        console.log(name);
        const panelToGraph = () => {
            setState(name);
            console.log(state);
        }
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

    const ticky = data.tickers

	return (
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
   
    )
}

export default CompanyPanel
/*!
  =========================================================
  * CMPSC445 Ant Design Dashboard - v1.0.0
  =========================================================
  * Project Team: 
  * Purpose: Stock Prediction Progressive Web App
  * Coded by Mio Diaz
  =========================================================
 */
import { Layout } from 'antd';
import React from 'react';

import Container from './Container.js'
import CompanyPanel from './LeftPanel.js'

import 'antd/dist/antd.css';
import '../index.css';

const { Content, Footer, Sider } = Layout;

export function Main() {

    return (

        <Layout className="site-layout">

          <Content className="site-layout-content">
           {/* company panel is left panel */}
          <CompanyPanel />
          </Content>

         

        </Layout>
    )
}

export default Main
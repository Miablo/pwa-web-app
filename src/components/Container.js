/*!
  =========================================================
  * CMPSC445 Ant Design Dashboard - v1.0.0
  =========================================================
  * Project Team: 
  * Purpose: Stock Prediction Progressive Web App
  * Coded by Mio Diaz
  =========================================================
 */
import { Layout, PageHeader} from 'antd';
import { ScreenClassProvider } from 'react-grid-system';

import React from 'react';
import '../index.css';
import 'antd/dist/antd.css';
import Graph from './Graph.js'

const { Content } = Layout;

export function Main() {

  return (

    <ScreenClassProvider>

      <Layout style={{ padding: '24px' }} >

        <PageHeader 

          title="CMPSC445 Final Project" 
          subTitle="ML-Based Stock Analysis" />

          <Content>
              {/* <Graph /> */}
          </Content>

        </Layout>

    </ScreenClassProvider>

    )
}


export default Main
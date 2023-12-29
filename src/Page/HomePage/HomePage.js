import React from 'react';
import './style.css';
import { Layout, theme } from 'antd';
import Carousels from './Carousels';
import ListMovie from './ListMovie';
import TabMovie from './TabMovie/TabMovie';
const {  Content } = Layout;

const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Content>
        <Carousels/>
      </Content>
      
      <div className='pt-4'>
        <ListMovie/>
        <TabMovie/>
      </div>
    </Layout>
  );
};

export default HomePage;
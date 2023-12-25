import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Headers from './Navbar/Headers';
import Carousels from './Carousels';
import ListMovie from './ListMovie';
import TabMovie from './TabMovie/TabMovie';
const {  Content, Footer } = Layout;
const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Carousels/>
        </div>
      </Content>
      <div className='pt-5'>
      <ListMovie/>
      <TabMovie/>
      </div>
    </Layout>
  );
};
export default HomePage;
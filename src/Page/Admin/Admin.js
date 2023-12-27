import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { PieChartOutlined, UserOutlined, HomeOutlined, FundViewOutlined } from '@ant-design/icons';
import DataCategory from './ManageCategories/DataCategory';
import SubMenu from 'antd/es/menu/SubMenu';
import LichChieuPhim from './SetShowtimes/LichChieuPhim';

const { Header, Content, Footer, Sider } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleMenuClick = ({ key }) => {
    setSelectedMenuItem(key);
    setIsButtonClicked(false); // Reset isButtonClicked when switching menus
  };

  const handleOpenLichChieuPhim = () => {
    setIsButtonClicked(true);
    setSelectedMenuItem('2'); // Switch to menu '2'
  };

  const renderContent = () => {
    console.log('isButtonClicked:', isButtonClicked); // Add this log to check the value

    switch (selectedMenuItem) {
      case '1':
        return (
          <>
            <span style={{ margin: '18px 0px' }}></span>
            <DataCategory setIsButtonClicked={setIsButtonClicked} isButtonClicked={isButtonClicked} />
          </>
        );
      case '2':
        return isButtonClicked ? (
          <>
            <span style={{ margin: '18px 0px' }}></span>
            <LichChieuPhim />
          </>
        ) : null;
      case '3':
      default:
        return null;
    }
  };

  const breadcrumbMap = {
    '1': 'Quản lí phim',
    '2': 'Quản lí lịch chiếu',
    '3': 'Quản lí rạp',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ paddingTop: '60px' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[selectedMenuItem]} mode="inline" onClick={handleMenuClick}>
          <Menu.Item icon={<HomeOutlined style={{
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }} />}>
            <a href="/" onClick={() => window.location.href = "/"}>Trang chủ</a>
          </Menu.Item>
          <SubMenu icon={<PieChartOutlined style={{
            fontSize: '1.5rem',
          }} />} title="QL phim">
            <Menu.Item key="1">Danh sách phim</Menu.Item>
            <Menu.Item key="5">Thêm phim</Menu.Item>
            <Menu.Item key="6">Sửa phim</Menu.Item>
          </SubMenu>
          <Menu.Item key="3" icon={<UserOutlined style={{
            fontSize: '1.5rem',
          }} />}>
            QL người dùng
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }} className="fixed">
          {/* Add your header content here */}
        </Header>
        <Content style={{ padding: '64px 16px 0', margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>{breadcrumbMap[selectedMenuItem]}</Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: '#fff', // You can set a background color if needed
              borderRadius: '8px',
              marginTop: '30px',
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Quy Design ©2023 Created by Quy</Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;

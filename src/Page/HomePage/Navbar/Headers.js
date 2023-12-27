import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Headers = () => {
  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo">
          <img className="w-40" src="../../images/logo.png" alt="Logo" />
        </div>

        {/* Hide Breadcrumb on small screens */}
        <div className="hide-on-small-screen">
          <Breadcrumb
            style={{
              flex: 1,
              minWidth: 0,
              color: 'white',
              textAlign: 'center',
            }}
            className="hide-on-small-screen"
            items={[
              {
                title: <a href="" style={{ color: 'white' }}>Trang chủ</a>,
              },
              {
                title: <a href="" style={{ color: 'white' }}>Liên hệ</a>,
              },
              {
                title: <a href="" style={{ color: 'white' }}>Tin tức</a>,
              },
              {
                title: <a href="" style={{ color: 'white' }}>Ứng dụng</a>,
              },
            ]}
          />
        </div>

        <div className='text-white'>
          <Link to="/login">Đăng nhập</Link>
        </div>
        <div className='text-white pl-2 pr-2'>
          |
        </div>
        <div className='text-white'>
          <Link to="/register">Đăng kí</Link>
        </div>
      </Header>
    </Layout>
  );
};

export default Headers;

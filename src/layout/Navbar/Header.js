import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

const Headers = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo">
                <img className='w-40' src="../../images/logo.png" alt="Logo" />
                </div>

                <Breadcrumb style={{
                    flex: 1,
                    minWidth: 0,
                    color: 'white',
                }}
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


                <div className='text-white'>
                    <Link to={"/"}>Đăng nhập</Link>
                </div>
                <div className='text-white pl-2 pr-2'>
                    |
                </div>
                <div className='text-white'>
                    <Link to={"/"}>Đăng kí</Link>
                </div>
            </Header>
        </Layout>
    );
};
export default Headers;
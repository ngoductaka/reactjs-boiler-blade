import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined, MenuOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { images } from '../../helper/static/images';

const App = ({ children, MenuLeft = () => null, BreadCum = () => null }) => {
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout.Sider
                    collapsedWidth={50}
                    trigger={null}
                    collapsed={true}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        width: 50,
                    }}
                >
                    <div style={{
                        margin: "10px 5px",
                    }}>
                        <img src={images.favicon} alt="logo" style={{ height: 40, width: 40 }} />
                    </div>
                    <MenuLeft />
                </Layout.Sider>
                <Layout className="site-layout" style={{
                    marginLeft: 50,
                    background: '#fff'
                }}>
                    <div style={{ margin: '1px 10px' }}>
                        <BreadCum />
                    </div>
                    <Layout.Content style={{
                        margin: '5px 5px',
                        overflow: 'scroll',
                        //  background: '#fff',
                        // boxShadow: '0px 6px 14px 2px #aaa',
                        borderRadius: 10,
                        height: 'calc(100vh - 35px)',

                        // display: 'flex', flexDirection: 'column',
                    }}>
                        {children}
                    </Layout.Content>
                </Layout>
            </Layout>

        </div>
    )
};

export default App;
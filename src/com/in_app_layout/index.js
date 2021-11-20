import React from 'react';
import { Layout } from 'antd';
import { images } from '../../helper/static/images';
import { Wrapper } from './styled';

const App = ({ children, MenuLeft = () => null, BreadCum = () => null }) => {
    const [collapsed, onCollapse] = React.useState(true);
    return (
        <Wrapper>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout.Sider
                    collapsedWidth={50}
                    width={170}
                    collapsible collapsed={collapsed} onCollapse={onCollapse}
                    onMouseLeave={() => onCollapse(true)}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        width: 50,
                        zIndex: 10,
                    }}
                >
                    <div style={{
                        margin: "10px 5px", display: 'flex', alignItems: 'center'
                    }}>
                        <img src={images.logo_full} alt="logo" style={{ height: 40 }} />
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
                        borderRadius: 10,
                        height: 'calc(100vh - 35px)',
                        fontSize: 14,
                    }}>
                        {children}
                    </Layout.Content>
                </Layout>
            </Layout>

        </Wrapper>
    )
};

export default App;
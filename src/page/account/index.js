import React from 'react';
import { Route, Switch, useRouteMatch, Link, useHistory, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
// 

import { Breadcrumb, Menu } from 'antd';

// COMPONENT
import InApp from '../../com/in_app_layout';
import { ROUTER_MAP } from './config/router';



const App = () => {
    let { path } = useRouteMatch();
    return (
        <InApp MenuLeft={LeftMenu} BreadCum={HeaderPage}>
            <Switch>
                {
                    ROUTER_MAP.map(({ exact = true, ...route }) => {
                        return (
                            <Route key={`${path}/${route.path}`} exact={exact} path={`${path}/${route.path}`}>
                                <route.Com />
                            </Route>
                        )
                    })
                }
            </Switch>
        </InApp>
    )
};


export default App;

// com

const LeftMenu = React.memo(() => {
    const history = useHistory();
    let { path } = useRouteMatch();
    let { pathname } = useLocation();

    const selectedKeys = React.useMemo(() => {
        const listKey = ROUTER_MAP.map(m => `${path}/${m.path}`);
        return listKey.find(i => i.includes(pathname)) || listKey[0]
    }, [path, pathname])
    return (
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
            {
                ROUTER_MAP.map(route => {
                    return <Menu.Item
                        onClick={() => history.push(`${path}/${route.path}`)}
                        key={`${path}/${route.path}`}
                        icon={route.Icon}>{route.name}</Menu.Item>
                })
            }
        </Menu>
    )
})

const HeaderPage = () => {
    const history = useHistory();
    let { pathname } = useLocation();
    // let { path } = useRouteMatch();
    const list = React.useMemo(() => {
        return pathname.split('/')
    }, [pathname]);
    // console.log('list', list)
    return (
        <div style={{borderBottom: '1px solid #eee', paddingBottom: 5}}>
            <Breadcrumb>
                {list.map((pathName, index) => {
                    if (!index) return (
                        <Breadcrumb.Item key="home" onClick={() => history.push('/')} >
                            <HomeOutlined />
                        </Breadcrumb.Item>
                    )
                    if (!pathName) return null;
                    return (
                        <Breadcrumb.Item key={pathName}  onClick={() => index !== list.length - 1 && history.push(`/${pathName}/`)}>
                            {pathName}
                        </Breadcrumb.Item>
                    )
                })}
            </Breadcrumb>
        </div>
    );
};
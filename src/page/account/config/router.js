import React from 'react';
import {
    DesktopOutlined,
    UsergroupAddOutlined,
    SettingFilled,
    PieChartOutlined, MenuOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import loadable from '../../../helper/router/loadable';

const ACCOUNT_ROUTER = {
    HOME: '',
    ROLE: 'role'
}

const Home = loadable(() => import('../account_page'));
const Account = loadable(() => import('../role_page'));

export const ROUTER_MAP = [
    {
        path: ACCOUNT_ROUTER.HOME,
        Com: Home,
        name: 'Account',
        Icon: <UsergroupAddOutlined />
    },
    {
        path: ACCOUNT_ROUTER.ROLE,
        Com: Account,
        exact: false,
        name: 'User Role',
        Icon: <SettingFilled />
    }
];
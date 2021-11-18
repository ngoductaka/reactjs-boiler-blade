import loadable from '../helper/router/loadable';

// COMPONENT
// public
const Login = loadable(() => import('../page/login'));
// private
const Home = loadable(() => import('../page/home'));
const Account = loadable(() => import('../page/account'));

// route
export const ROUTES = {
    // unAuth
    LOGIN: "login",
    // auth
    HOME: "",
    ACCOUNT: "account",
    // 
    SETTING: "setting",
    WELCOME: "welcome",
    // authed
    MONITORING: "monitoring",
    MACHINING: "machining",
    PRODUCTION_IMPLEMENTATION: "production-implementation",
    PRODUCTION: {
        IMPLEMENTATION: "production-implementation",
        PLAN: "production-plan",
    },
    MAINTENANCE: "maintenance",
    ANALYTICS: "analytics",
    // SETTINGS: 'settings',
    PROFILE: "profile",
    ABOUT: "about",
    SETTINGS: {
        SETTING_PRODUCT: "setting-product",
        GENERAL_SETTING: "general-setting",
    },
    SETTING_PRODUCT: "setting-product",
    GENERAL_SETTING: "general-setting",
    MACHINE_ANALYTIC: "analytic",
    PARETO: "pareto",
    SOFTWARE: "software",
    KPI: "kpi",
};

export const private_route = [
    {
        path: `/${ROUTES.HOME}`,
        Com: Home,
    },
    {
        path: `/${ROUTES.ACCOUNT}`,
        Com: Account,
        exact: false,
    }
];

export const public_route = [
    {
        path: `/${ROUTES.LOGIN}`,
        Com: Login,
    },
    {
        path: `/404`,
        Com: () => <div>2223</div>,
    }
];

// { backend_name: link_fe }
export const map_link = {
    application: 'welcome',

    employees: ROUTES.ACCOUNT,

    sales: 'sales',

    purchase: 'purchase',

    outsource: 'outsource',

    inventory: 'inventory',

    plm: 'plm',

    manufacture: 'manufacture',

    quality: 'quality',

    realtime: 'realtime',

    maintenance: 'maintenance',

    setting: 'setting',

    task: 'task'
}

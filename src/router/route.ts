import loadable from 'react-loadable';

const routes = [{
    path: '/',
    redirect: '/skillupgrade'
},{
    path: '/skillupgrade',
    component: loadable({
        loader: () => import('../views/pages/SkillUpgrade/index'),
        loading: () => null
    }),
    meta: {name: '技术升级', icon: ''}
},{
    path: '/upgradepayment',
    component: loadable({
        loader: () => import('../views/pages/UpgradePayment/index'),
        loading: () => null
    }),
    meta: {name: '技术升级', icon: ''}
},{
    path: '/wxVideoPlay',
    component: loadable({
        loader: () => import('../views/pages/wxVideoPlay/index'),
        loading: () => null
    }),
    meta: {name: '直播回放', icon: ''}
},{
    path: '/login',
    hidden: true,
    component: loadable({
        loader: () => import('../views/login/login'),
        loading: () => null
    }),
    meta: {name: '', icon: ''}
},{
    path: '/NotFound',
    hidden: true,
    component: loadable({
        loader: () => import('../views/NotFound/NotFound'),
        loading: () => null
    }),
    meta: {name: '404', icon: ''}
}];

export default routes;

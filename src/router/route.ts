import loadable from 'react-loadable';

const routes = [{
    path: '/',
    redirect: '/login'
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

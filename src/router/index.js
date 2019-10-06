import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const login = r => require.ensure([], () => r(require('@/views/login/index')));
const authredirect = r => require.ensure([], () => r(require('@/views/login/authredirect')));
const _404 = r => require.ensure([], () => r(require('@/views/errorPage/404')));
const _401 = r => require.ensure([], () => r(require('@/views/errorPage/401')));
const Layout = r => require.ensure([], () => r(require('@/views/layout/Layout')));

const dashboard = r => require.ensure([], () => r(require('@/views/dashboard/index')));
const userlist = r => require.ensure([], () => r(require('@/views/userlist/index')));



const change_password = r => require.ensure([], () => r(require('@/views/change_password/index')));


// dashboard
export const constantRouterMap = [{
  path: '/login',
  name: "login",
  component: login,
  hidden: true
},
  {
    path: '/authredirect',
    name: "authredirect",
    component: authredirect,
    hidden: true
  },
  {
    path: '/404',
    name: "notfound",
    component: _404,
    hidden: true
  },
  {
    path: '/401',
    name: "notpress",
    component: _401,
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    meta: {
      title: 'user',
      icon: 'user',
    },
    // name: 'dashboard_parent',
    children: [
      // userlist
      {
        path: 'dashboard',
        component: dashboard,
        name: 'dashboard',
        meta: {
          title: 'welcome',
          icon: 'companys',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: 'test',
    meta: {
      title: 'test',
      icon: 'list'
    },
    children: [{
      path: 'test',
      component: () =>
        import('@/views/atest'),
      name: 'phone',
      meta: {
        allow: "sp",
        title: 'test',
        icon: 'nested'
      }
    }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];
export const asyncRouterMap = [];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

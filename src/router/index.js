import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const login = r => require.ensure([], () => r(require('@/views/login/index')));
const authredirect = r => require.ensure([], () => r(require('@/views/login/authredirect')));
const _404 = r => require.ensure([], () => r(require('@/views/errorPage/404')));
const _401 = r => require.ensure([], () => r(require('@/views/errorPage/401')));
const Layout = r => require.ensure([], () => r(require('@/views/layout/Layout')));
const dashboard = r => require.ensure([], () => r(require('@/views/dashboard/index')));
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
    path: '/news',
    component: Layout,
    redirect: 'test',
    meta: {
      title: 'news',
      icon: 'list'
    },
    children: [
      {
        path: 'imgs',
        component: () =>
          import('@/views/news_img'),
        name: 'img',
        meta: {
          allow: "sp",
          title: 'img',
          icon: 'nested'
        }
      },
      {
        path: 'news',
        component: () =>
          import('@/views/news_text'),
        name: 'news',
        meta: {
          allow: "sp",
          title: 'html',
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

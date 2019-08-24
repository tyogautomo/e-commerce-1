import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      component: () => import( /* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      children: [{
        path: '',
        name: 'content',
        component: () => import( /* webpackChunkName: "content" */ '@/components/Content.vue')
      }, {
        path: 'product/:productId',
        name: 'productdetail',
        component: () => import( /* webpackChunkName: "productdetail" */ '@/views/DetailProduct.vue')
      }]
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import( /* webpackChunkName: "cart" */ '@/views/Cart.vue')
    }
  ]
})

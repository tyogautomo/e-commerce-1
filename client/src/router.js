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
      path: '/products',
      component: () => import( /* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      children: [{
          path: '',
          name: 'products',
          component: () => import( /* webpackChunkName: "products" */ '@/components/Content.vue'),
        },
        {
          path: ':id',
          name: 'detail',
          component: () => import( /* webpackChunkName: "detail" */ '@/views/DetailProduct.vue'),
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: () => import( /* webpackChunkName: "edit" */ '@/components/EditProduct.vue')
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import( /* webpackChunkName: "cart" */ '@/views/Cart.vue')
    }
  ]
})

import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/apis/server'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isDetailProduct: false,
    products: [],
    product: {},
    username: localStorage.getItem('username'),
    cartsProducts: [],
  },
  getters: {

  },
  mutations: {
    signin(state) {
      state.isLogin = true
      state.username = localStorage.getItem('username')
    },
    signout(state) {
      localStorage.clear()
      state.isLogin = false
    },
    getAllProducts(state, payload) {
      state.products = payload
    },
    getOneProduct(state, payload) {
      state.product = payload
      console.log(state.product, 'product from store <<<<<<<<<<<<<<<<')
    },
    getUserCarts(state, payload) {
      state.cartsProducts = payload.products
    }
  },
  actions: {
    signUp({
      commit
    }, payload) {

      axios({
          method: 'post',
          url: `/users/signup`,
          data: payload
        })
        .then(({
          data
        }) => {
          // console.log(data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.user.username)
          commit('signin')
        })
        .catch(err => {
          console.log(err)
        })
    },
    signIn({
      commit
    }, payload) {

      axios({
          method: 'post',
          url: `/users/signin`,
          data: payload
        })
        .then(({
          data
        }) => {
          // console.log(data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.user.username)
          commit('signin')
        })
        .catch(err => {
          console.log(err)
        })

    },
    getAllProducts({
      commit
    }) {
      axios({
          method: 'get',
          url: `/products`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          commit('getAllProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getOneProduct({
      commit
    }, payload) {
      axios({
          method: 'get',
          url: `/products/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          // console.log(data)
          commit('getOneProduct', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct({
      dispatch
    }, payload) {
      axios({
          method: 'delete',
          url: `/products/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          console.log(data, 'from store')
          dispatch('getAllProducts')
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart({
      dispatch
    }, payload) {
      axios({
          method: 'post',
          url: `/carts`,
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            productId: payload
          }
        })
        .then(({
          data
        }) => {
          dispatch('getUserCarts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getUserCarts({
      commit
    }) {

      axios({
          method: 'get',
          url: '/carts',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          commit('getUserCarts', data)
        })
        .catch(err => {
          console.log(err)
        })

    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/apis/server'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isDetailProduct: false
  },
  mutations: {
    signin(state) {
      state.isLogin = true
    },
    signout(state) {
      localStorage.clear()
      state.isLogin = false
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
    addProduct(context, payload) {
      axios({
          method: 'post',
          url: '/products',
          data: payload,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})

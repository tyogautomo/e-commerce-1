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
    userTransactions: []
  },
  getters: {
    compiledTransactions(state) {
      let transactions = state.userTransactions
      let newArrayOfTransactions = []
      for (let i = 0; i < transactions.length; i++) {

        let products = {}
        for (let j = 0; j < transactions[i].products.length; j++) {
          if (products[transactions[i].products[j]._id] == undefined) {
            products[transactions[i].products[j]._id] = {
              id: transactions[i].products[j]._id,
              name: transactions[i].products[j].name,
              description: transactions[i].products[j].description,
              price: 0,
              quantity: transactions[i].products[j].quantity,
              featured_image: transactions[i].products[j].featured_image,
              amount: 0
            }
          }

          products[transactions[i].products[j]._id].price += transactions[i].products[j].price
          products[transactions[i].products[j]._id].amount++
        }


        let keys = Object.keys(products)
        let compiledProducts = []
        for (let i = 0; i < keys.length; i++) {
          compiledProducts.push(products[keys[i]])
        }

        let newObj = {
          id: transactions[i]._id,
          userId: transactions[i].userId,
          products: compiledProducts,
          paymentStatus: transactions[i].paymentStatus,
          deliveryStatus: transactions[i].deliveryStatus,
          updatedAt: new Date(transactions[i].updatedAt),
          total: 0
        }

        for (const item of compiledProducts) {
          newObj.total += item.price
        }

        newArrayOfTransactions.push(newObj)
      }

      return newArrayOfTransactions
    }
  },
  mutations: {
    signin(state) {
      state.isLogin = true
      state.username = localStorage.getItem('username')
    },
    signout(state) {
      Swal.fire("See ya!");
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
      if (payload) {
        state.cartsProducts = payload.products
      } else {
        state.cartsProducts = []
      }
    },
    getUserTransactions(state, payload) {
      state.userTransactions = payload
    }
  },
  actions: {
    signUp({
      commit
    }) {
      commit("signin");
    },
    signIn({
      commit
    }) {
      commit("signin");
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

    },
    getUserTransactions({
      commit
    }) {
      axios({
          method: 'get',
          url: `/users/transactions`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          commit('getUserTransactions', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    verifyDelivery({
      dispatch
    }, payload) {
      axios({
          method: 'put',
          url: `/users/transactions/verify/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          dispatch('getUserTransactions')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})

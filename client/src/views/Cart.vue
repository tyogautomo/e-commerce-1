<template>
  <div class="cart d-flex">
    <Sidebar class="col-2"></Sidebar>
    <div class="cart-list-container col-10 ml-auto d-flex flex-column">
      <div class="title d-flex align-items-center justify-content-start mb-5 align-self-start">
        <h1>Cart</h1>
      </div>
      <div class="before-checkout d-flex justify-content-center">
        <div
          class="no-carts col-6 d-flex align-items-center justify-content-start p-0"
          v-if="!(carts.length > 0)"
          :style="{ backgroundImage: 'url(' + noCartImage + ')' }"
        >
          <h2 class="no-item-text">No items in your cart now ....</h2>
        </div>
        <div class="cart-list col-7" v-if="carts.length > 0">
          <CartCard
            v-for="item in carts"
            :key="item.id"
            :item="item"
            :cartId="cartId"
            @update-amount="updateAmount"
          />
        </div>
        <div class="total col-5 d-flex flex-column" v-if="carts.length > 0">
          <h2 class="mb-5">Cart Summary :</h2>
          <!-- SUMARRY LIST -->
          <div class="summary-list justify-content-start" v-for="item in carts" :key="item.id">
            <div class="summary-item d-flex align-items-center mb-3 p-2">
              <div
                class="image col-2"
                :style="{ backgroundImage: 'url(' + item.featured_image + ')' }"
              ></div>
              <div class="info col-6 d-flex flex-column align-items-start">
                <h5>{{item.name}}</h5>
                <h6>Amount: {{item.amount}}</h6>
              </div>
              <div class="total-price col-4">
                <h4>$ {{item.price}}</h4>
              </div>
            </div>
          </div>
          <div class="total d-flex align-self-stretch">
            <h4 class="col-8">Total :</h4>
            <h4 class="col-4">$ {{totalAll}}</h4>
          </div>
          <button class="btn btn-warning checkout my-4" @click="checkout()">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartCard from "@/components/CartCard.vue";
import Sidebar from "@/components/Sidebar.vue";
import axios from "@/apis/server.js";
import Swal from "sweetalert2";

export default {
  components: {
    CartCard,
    Sidebar
  },
  data() {
    return {
      carts: [],
      cartId: "",
      noCartImage: "https://svgshare.com/i/EgK.svg"
    };
  },
  methods: {
    getCartProducts() {
      axios({
        method: "get",
        url: `/carts`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.cartId = data._id;
          let products = data.products;
          let product = {};
          for (let i = 0; i < products.length; i++) {
            if (product[products[i]._id] == undefined) {
              product[products[i]._id] = {
                id: products[i]._id,
                name: products[i].name,
                description: products[i].description,
                price: 0,
                quantity: products[i].quantity,
                featured_image: products[i].featured_image,
                amount: 0
              };
            }

            product[products[i]._id].amount++;
            product[products[i]._id].price += products[i].price;
          }
          let keys = Object.keys(product);
          let compiled = [];
          for (let i = 0; i < keys.length; i++) {
            compiled.push(product[keys[i]]);
          }

          // console.log(compiled, "compiled <<<<<<<<<<<<<<");
          this.carts = compiled;
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateAmount() {
      this.getCartProducts();
      this.$store.dispatch("getUserCarts");
    },
    checkout() {
      Swal.fire({
        title: "Proceed to checkout?",
        text: "Please complete your payment after this.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yeah,sure"
      }).then(result => {
        if (result.value) {
          axios({
            method: "put",
            url: `/carts/checkout/${this.cartId}`,
            headers: {
              token: localStorage.getItem("token")
            },
            data: {
              products: this.carts
            }
          })
            .then(({ data }) => {
              Swal.fire(
                "Success!",
                "Your transaction will be proceed.",
                "success"
              );
              this.$router.push("/products");
              this.$store.dispatch("getUserCarts");
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  },
  computed: {
    totalAll() {
      let total = 0;
      for (let i = 0; i < this.carts.length; i++) {
        total += this.carts[i].price;
      }
      return total;
    }
  },
  created() {
    this.getCartProducts();
  }
};
</script>

<style scoped>
.no-carts {
  width: 100%;
  height: 500px;
  background-size: cover;
}

.cart-list-container {
  padding-top: 30px;
  background-color: rgb(218, 218, 218);
}

.title {
  width: 50%;
  border-bottom: 3px solid rgb(44, 62, 80);
}
h1 {
  font-family: "Oswald";
  font-size: 70px;
}

h2 {
  font-family: "Oswald";
}

h2.no-item-text {
  font-family: "Oswald";
  font-size: 40px;
  position: relative;
  top: -40px;
}

.fa-shopping-cart {
  font-size: 80px;
}

.cart-list {
  padding-top: 10px;
  height: 500px;
  overflow: scroll;
  overflow-x: hidden;
}

.summary-list {
  font-family: "Oswald";
}

.summary-item {
  border-bottom: 1px solid rgb(163, 163, 163);
}

div.image {
  width: 100%;
  height: 80px;
  background-size: cover;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.384);
}

.checkout {
  font-family: "Oswald";
  border: 2px solid rgb(78, 78, 78);
}
.total {
  font-family: "Oswald";
}
</style>
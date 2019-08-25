<template>
  <div class="cart-card d-flex mb-3">
    <div
      class="product-image col-3"
      :style="{ backgroundImage: 'url(' + item.featured_image + ')' }"
    ></div>
    <div class="main col-9 d-flex justify-content-between p-3">
      <div class="item-info d-flex flex-column align-items-start">
        <h3>{{item.name}}</h3>
        <p>{{item.description}}</p>
        <h5>Total / item: $ {{item.price}}</h5>
      </div>
      <div class="increse-decrease d-flex align-items-center">
        <button class="decrease btn btn-danger mr-3" @click="decrease(item.id, cartId)">-</button>
        <span class="mr-3">{{item.amount}}</span>
        <button class="increse btn btn-success" @click="increase(item.id, cartId)">+</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/apis/server.js";

export default {
  props: ["item", "cartId"],
  data() {
    return {};
  },
  methods: {
    decrease(id, cartId) {
      axios({
        method: "put",
        url: `carts/${this.cartId}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          productId: id,
          type: "decrease"
        }
      })
        .then(({ data }) => {
          this.$emit("update-amount");
        })
        .catch(err => {
          console.log(err);
        });
    },
    increase(id, cartId) {
      axios({
        method: "put",
        url: `carts/${this.cartId}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          productId: id,
          type: "increase"
        }
      })
        .then(({ data }) => {
          this.$emit("update-amount");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Oswald";
}
.cart-card {
  width: 100%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.616);
  border-radius: 5px;
  position: relative;
  top: 0;
  transition: 0.2s;
}
.cart-card:hover {
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.349);
  top: -4px;
}
.product-image {
  background-color: white;
  width: 100%;
  height: 170px;
  /* border: 1px solid black; */
  background-size: cover;
  border-radius: 5px 0 0 5px;
}
.main {
  /* border: 1px solid black; */
  background-color: rgb(230, 223, 223);
  border-radius: 0 5px 5px 0;
}

span {
  padding: 2px 15px;
  border-radius: 5px;
  background-color: white;
  font-family: "Oswald";
}

i {
  font-size: 20px;
  color: rgb(22, 46, 78);
}
</style>
<template>
  <div class="sidebar d-flex flex-column">
    <div class="user-profile"></div>
    <h3 class="username">{{username}}</h3>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-if="username == 'admin'">
        <i class="fas fa-plus-square"></i>
        <a
          href
          @click.prevent
          data-toggle="modal"
          data-target="#exampleModalCenter"
          data-backdrop="false"
          v-b-modal.add-product
        >Add Product</a>
      </li>
      <li
        class="list-group-item d-flex align-items-center justify-content-start"
        v-if="username !== 'admin'"
      >
        <div class="cart-menu col-9">
          <i class="fas fa-shopping-cart"></i>
          <router-link to="/cart">
            <a href>Cart</a>
          </router-link>
        </div>
        <div class="col-3">
          <span class="amount">{{cartsProducts.length}}</span>
        </div>
      </li>
      <li class="list-group-item">
        <i class="fas fa-desktop"></i>
        <router-link to="/products">
          <a href>Products</a>
        </router-link>
      </li>
      <li class="list-group-item" v-if="username == 'admin'">
        <i class="fas fa-exchange-alt"></i>
        <router-link to="/admin/transaction">
          <a href>All Transaction</a>
        </router-link>
      </li>
      <li class="list-group-item" v-if="username !== 'admin'">
        <i class="fas fa-exchange-alt"></i>
        <router-link to="/user/transaction">
          <a href>Transaction</a>
        </router-link>
      </li>
      <!-- <li class="list-group-item d-flex align-items-center">
        <i class="fas fa-sign-out-alt"></i>
        <a href @click.prevent="logout">Signout</a>
      </li>-->
    </ul>
    <AddProductForm></AddProductForm>
  </div>
</template>

<script>
import AddProductForm from "@/components/AddProductModal.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    AddProductForm
  },
  computed: {
    ...mapState(["username", "cartsProducts"]),
    username() {
      return localStorage.getItem("username");
    }
  },
  created() {
    this.$store.dispatch("getUserCarts");
  }
};
</script>

<style scoped>
.user-profile {
  background-image: url("http://petmedmd.com/images/user-profile.png");
  background-size: cover;
  /* background-color: grey; */
  border: 5px solid rgb(109, 109, 109);
  border-radius: 100%;
  width: 100%;
  padding-top: 100%;
  margin-bottom: 20px;
}
.username {
  color: white;
}
div.sidebar {
  background-image: url("../assets/diamonds.png");
}
div.cart-menu {
  padding: 0;
}

span.amount {
  font-size: 13px;
  background-color: white;
  padding: 5px;
  border-radius: 100%;
  color: black;
}

div.sidebar {
  /* border: 1px solid black; */
  padding: 40px 30px;
  position: fixed;
  z-index: 1000;
  height: 100%;
}

h1 {
  font-family: "Fugaz One";
  margin-bottom: 30px;
  color: white;
}

a {
  text-decoration: none;
  font-family: "Oswald";
  color: white;
}

li {
  text-align: left;
  background-color: transparent;
  transition: 0.2s;
  border-bottom: 1px solid rgba(194, 194, 194, 0.465);
}

li:hover {
  background-color: rgba(0, 0, 0, 0.192);
}

img {
  margin-right: 10px;
  filter: invert(100%);
}

.fas {
  color: rgb(223, 223, 223);
}

i {
  margin-right: 25px;
}
</style>
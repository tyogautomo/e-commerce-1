<template>
  <div class="product-card mr-4 mb-3">
    <div class="product-image" :style="{ backgroundImage: 'url(' + product.featured_image + ')' }">
      <div class="layer d-flex justify-content-around align-items-center">
        <a href @click.prevent="toDetailProduct(product._id)">
          <i class="fas fa-info-circle userbuy"></i>
        </a>
        <a href @click.prevent="addCart(product._id)" v-if="username != 'admin'">
          <i class="fas fa-cart-plus userbuy"></i>
        </a>
      </div>
    </div>
    <div class="content-info d-flex justify-content-between">
      <div class="product-info d-flex flex-column align-items-start col-9">
        <h5 class="product-name">{{product.name}}</h5>
        <small>{{toDollar}}</small>
        <small>Quantity: {{product.quantity}}</small>
      </div>
      <div class="options col-3 d-flex flex-column align-items-center justify-content-between">
        <a
          href
          class="edit"
          v-b-modal.edit-product
          @click.prevent="editProduct(product._id)"
          v-show="username == 'admin'"
        >
          <i class="fas fa-edit"></i>
        </a>
        <a
          href
          class="delete"
          @click.prevent="deleteProduct(product._id)"
          v-show="username == 'admin'"
        >
          <i class="fas fa-minus-square"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  props: ["product"],
  data() {
    return {};
  },
  methods: {
    toDetailProduct(id) {
      this.$store.state.isDetailProduct = true;
      this.$router.push(`/products/${id}`);
    },
    deleteProduct(id) {
      Swal.fire({
        title: "Delete this product?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("deleteProduct", id);
        }
      });
    },
    editProduct(id) {
      this.$router.push(`/products/edit/${id}`);
    },
    addCart(id) {
      // console.log(id);
      this.$store.dispatch("addCart", id);
      this.$alertify.success("Item added to cart");
    }
  },
  computed: {
    ...mapState(["username"]),
    toDollar() {
      return `$ ${this.product.price}`;
    }
  }
};
</script>

<style scoped>
div.product-card {
  width: 20%;
  border-radius: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.61);
  position: relative;
  top: 0;
  transition: 0.2s;
}

.userbuy {
  color: white;
  opacity: 0;
  transition: opacity 0.3s linear;
  border: 2px solid white;
  padding: 10px;
  background-color: transparent;
  position: relative;
  top: 0;
  transition: 0.2s;
}

.userbuy:hover {
  top: -3px;
  background-color: rgba(0, 0, 0, 0.664);
}

div.product-card:hover {
  top: -5px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.336);
}

div.product-card:hover .userbuy {
  opacity: 1;
}

div.product-image {
  width: 100%;
  height: 220px;
  background-color: white;
  background-size: cover;
  border-radius: 5px 5px 0 0;
  filter: blur(0px);
}

.layer {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border-radius: 5px 5px 0 0;
  transition: 0.2s;
  padding: 0 50px;
}

div.product-card:hover .layer {
  background-color: rgba(0, 0, 0, 0.657);
}

.button-inside {
  visibility: hidden;
}

.layer:hover .button-inside {
  visibility: visible;
}

div.product-info {
  font-family: "Oswald";
  padding: 10px;
  background-color: rgb(207, 207, 207);
  border-radius: 0 0 5px 5px;
}

div.options {
  padding: 10px;
  background-color: rgb(207, 207, 207);
}
.edit {
  color: rgb(126, 151, 89);
}
.delete {
  color: rgb(190, 105, 105);
}
</style>
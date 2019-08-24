<template>
  <div class="edit-product d-flex flex-column pt-5">
    <h1 class="mb-5">Edit Product</h1>
    <div class="edit-section d-flex">
      <div class="previousImage col-5">
        <div
          class="image"
          :style="{ backgroundImage: 'url(' + formEditProduct.featured_image + ')' }"
        ></div>
      </div>
      <form class="d-flex flex-column col-7 align-items-start" @submit.prevent="editProduct()">
        <label for>Name :</label>
        <b-form-input v-model="formEditProduct.name" placeholder="Enter your name"></b-form-input>
        <label for>Featured Image :</label>
        <b-form-file
          v-model="formEditProduct.featured_image"
          :state="Boolean(formEditProduct.featured_image)"
          placeholder="Choose a file"
        ></b-form-file>
        <label for>Description :</label>
        <b-form-textarea
          id="textarea"
          v-model="formEditProduct.description"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <div class="numbers d-flex justify-content-start align-self-stretch">
          <div class="quantity mr-4">
            <label for>Quantity :</label>
            <b-form-input v-model="formEditProduct.quantity" type="number"></b-form-input>
          </div>
          <div class="price">
            <label for>Price ($) :</label>
            <b-form-input v-model="formEditProduct.price" type="number"></b-form-input>
          </div>
        </div>
        <div class="buttons mt-4 d-flex">
          <button class="btn btn-primary mr-3" type="submit">Submit Update</button>
          <router-link to="/products">
            <button class="btn btn-danger">Cancel</button>
          </router-link>
          <div class="loading mr-4" v-show="isLoading">
            <span class="info mx-2">Updating product ...</span>
            <b-spinner variant="primary" type="grow"></b-spinner>
            <b-spinner variant="danger" type="grow"></b-spinner>
            <b-spinner variant="warning" type="grow"></b-spinner>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/apis/server.js";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      formEditProduct: {
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        featured_image: ""
      },
      isLoading: false
    };
  },
  methods: {
    editProduct() {
      this.isLoading = true;

      let formData = new FormData();
      formData.append("name", this.formEditProduct.name);
      formData.append("description", this.formEditProduct.description);
      formData.append("price", this.formEditProduct.price);
      formData.append("quantity", this.formEditProduct.quantity);
      formData.append("image", this.formEditProduct.featured_image);

      axios({
        method: "put",
        url: `/products/${this.$route.params.id}`,
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.isLoading = false;

          Swal.fire({
            type: "success",
            title: "Successfuly update a Product!",
            text: "Your products is now up to date"
          });
          this.$store.dispatch("getAllProducts");
          this.$router.push("/products");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    currentProduct() {
      return this.$store.state.product;
    }
  },
  created() {
    axios({
      method: "get",
      url: `/products/${this.$route.params.id}`,
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        // console.log(data, "from edit prod");
        this.formEditProduct.name = data.name;
        this.formEditProduct.description = data.description;
        this.formEditProduct.price = data.price;
        this.formEditProduct.quantity = data.quantity;
        this.formEditProduct.featured_image = data.featured_image;
      })
      .catch(err => {
        console.log(err);
      });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch("getOneProduct", to.params.id);
    });
  }
};
</script>

<style scoped>
* {
  font-family: "Oswald";
}

.edit-product {
  height: 100vh;
}
.edit-section {
  height: 100%;
}
.image {
  width: 100%;
  height: 500px;
  background-size: cover;
}
.edit-product {
  background-color: rgb(218, 218, 218);
}

label {
  margin-top: 20px;
}
</style>
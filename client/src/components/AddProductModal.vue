<template>
  <div>
    <b-modal id="add-product" title="Add Product" centered @hidden="resetModal">
      <div class="header" slot="modal-header">
        <h4 class="title">Add Product</h4>
      </div>
      <form @submit.prevent="addProduct" id="form-create">
        <b-input-group size="m" prepend="Name" title="asdasd" class="mb-2">
          <b-form-input autofocus v-model="formAddProduct.name" autocomplete="off"></b-form-input>
        </b-input-group>
        <label for="textarea">Description:</label>
        <b-form-textarea
          name="textarea"
          id="textarea"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
          class="mb-2"
          v-model="formAddProduct.description"
        ></b-form-textarea>
        <label for>Featured Image:</label>
        <b-form-file
          v-model="formAddProduct.featured_image"
          :state="Boolean(formAddProduct.featured_image)"
          placeholder="Choose a file"
          class="mb-3"
        ></b-form-file>
        <div class="number d-flex justify-content-between">
          <div class="quantity">
            <label for>Quatity:</label>
            <b-form-input type="number" v-model="formAddProduct.quantity"></b-form-input>
          </div>
          <div class="price">
            <label for>Price ($):</label>
            <b-form-input type="number" v-model="formAddProduct.price"></b-form-input>
          </div>
        </div>
      </form>
      <div slot="modal-footer" class="d-flex">
        <div class="loading mr-4" v-show="isLoading">
          <b-spinner variant="primary" type="grow"></b-spinner>
          <b-spinner variant="danger" type="grow"></b-spinner>
          <b-spinner variant="warning" type="grow"></b-spinner>
          <span class="info mr-2">Adding new product ...</span>
        </div>
        <div class="button">
          <button type="submit" class="btn btn-primary mr-2" form="form-create">Submit</button>
          <button class="btn btn-danger" @click.prevent="closeModal()">Close</button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "@/apis/server.js";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      formAddProduct: {
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
    resetModal() {
      this.formAddProduct.name = "";
      this.formAddProduct.description = "";
      this.formAddProduct.price = 0;
      this.formAddProduct.quantity = 0;
      this.formAddProduct.featured_image = "";
    },
    addProduct() {
      this.isLoading = true;
      let formData = new FormData();
      formData.append("name", this.formAddProduct.name);
      formData.append("description", this.formAddProduct.description);
      formData.append("price", this.formAddProduct.price);
      formData.append("quantity", this.formAddProduct.quantity);
      formData.append("image", this.formAddProduct.featured_image);

      // this.$store.dispatch("addProduct", formData);
      axios({
        method: "post",
        url: "/products",
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$bvModal.hide("add-product");
          this.isLoading = false;
          console.log(data, "from add product vue");
          Swal.fire({
            type: "success",
            title: "Successfuly add a Product!",
            text: "Your new product now listed in product list"
          });
          this.$store.dispatch("getAllProducts");
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeModal() {
      this.$bvModal.hide("add-product");
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Oswald";
}
h3.title {
  font-family: "Oswald";
}
</style>
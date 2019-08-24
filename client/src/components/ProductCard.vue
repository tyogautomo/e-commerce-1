<template>
  <div class="product-card mr-4 mb-3">
    <div class="product-image" :style="{ backgroundImage: 'url(' + featured_image + ')' }">
      <div class="layer d-flex justify-content-around align-items-center">
        <a href @click.prevent="toDetailProduct('1')">
          <i class="fas fa-info-circle"></i>
        </a>
        <a href>
          <i class="fas fa-cart-plus"></i>
        </a>
      </div>
    </div>
    <div class="product-info d-flex flex-column align-items-start">
      <h5 class="product-name">Product Name</h5>
      <small>$ 40</small>
      <small>Quantity: 100</small>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      featured_image: "http://cubegaming.id/wp-content/uploads/2019/08/2.png"
    };
  },
  methods: {
    toDetailProduct(id) {
      this.$store.state.isDetailProduct = true;
      this.$router.push(`/dashboard/product/${id}`);
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

.fas {
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

.fas:hover {
  top: -3px;
  background-color: rgba(0, 0, 0, 0.664);
}

div.product-card:hover {
  top: -5px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.336);
}

div.product-card:hover .fas {
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
</style>
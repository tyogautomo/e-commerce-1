<template>
  <div class="product-detail pt-4 d-flex flex-column p-0">
    <div class="detail-image align-self-center" :style="{ backgroundImage: 'url(' + product.featured_image + ')' }"></div>
    <div class="info-detail d-flex flex-column align-items-start">
      <h1 class="detail-name mb-5 align-self-center">{{product.name}}</h1>
      <h4>Price: {{toDollar}}</h4>
      <h4>Quantity: {{product.quantity}}</h4>
      <br />
      <p
        class="detail-desc"
      >{{product.description}}</p>
      <br />
      <h3>Specification</h3>
      <Specification></Specification>
    </div>
  </div>
</template>

<script>
import Specification from "@/components/Specification.vue";
export default {
  components: {
    Specification
  },
  data() {
    return {
      image: "http://cubegaming.id/wp-content/uploads/2019/08/2.png"
    };
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
    toDollar() {
      return `$ ${this.product.price}`;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch("getOneProduct", to.params.id);
    });
  }
};
</script>

<style scoped>
.product-detail {
  background-color: rgb(218, 218, 218);
  color: antiquewhite;
  font-family: "Oswald";
}

.detail-image {
  width: 20%;
  height: 300px;
  position: fixed;
  background-size: cover;
  z-index: 0;
  /* border: 1px solid black; */
}

.info-detail {
  box-shadow: 0 0 10px black;
  /* height: 100vh; */
  position: relative;
  z-index: 1;
  background-color: rgb(32, 32, 32);
  top: 300px;
  padding-top: 30px;
  padding-left: 100px;
}
.detail-name {
  font-family: "Oswald";
  font-size: 60px;
}

.detail-desc {
  width: 80%;
  text-align: justify;
}
</style>
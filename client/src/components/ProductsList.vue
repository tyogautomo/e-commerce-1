<template>
  <div class="products-list d-flex flex-wrap">
    <ProductCard v-for="product in AllProducts" :key="product._id" :product="product" />
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: {
    ProductCard,
  },
  computed: {
    AllProducts() {
      return this.$store.state.products;
    }
  },
  created() {
    this.$store.dispatch("getAllProducts");
  }
};
</script>

<style scoped>
</style>
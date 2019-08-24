<template>
  <div class="content p-0">
    <Carousel></Carousel>
    <ProductsList class="product-list p-5"></ProductsList>
  </div>
</template>

<script>
import ProductsList from "@/components/ProductsList.vue";
import Carousel from "@/components/Carousel.vue";

export default {
  components: {
    ProductsList,
    Carousel
  }
};
</script>

<style scoped>
.content {
  padding-top: 30px;
  background-color: rgb(218, 218, 218);
  margin-left: auto;
  height: 100vh;
}
</style>
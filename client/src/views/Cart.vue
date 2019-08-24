<template>
  <div class="cart d-flex">
    <Sidebar class="col-2"></Sidebar>
    <div class="cart-list-container col-10 ml-auto d-flex flex-column">
      <div class="title d-flex align-items-center justify-content-center mb-5">
        <i class="fas fa-shopping-cart mr-3"></i>
        <h1>Cart</h1>
      </div>
      <div class="before-checkout d-flex">
        <div class="cart-list col-8">
          <CartCard />
          <CartCard />
          <CartCard />
        </div>
        <div class="total col-4">
          <h2>Summary</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartCard from "@/components/CartCard.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    CartCard,
    Sidebar
  }
};
</script>

<style scoped>
.cart-list-container {
  padding-top: 30px;
  background-color: rgb(218, 218, 218);
}

.title {
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.521);
}
h1 {
  font-family: "Oswald";
  font-size: 70px;
}

.fa-shopping-cart {
  font-size: 80px;
}

.cart-list {
  padding-top: 10px;
  height: 400px;
  overflow: scroll;
  overflow-x: hidden;
  border-top: 1px solid rgb(173, 173, 173);
  border-bottom: 1px solid rgb(173, 173, 173);
}
</style>
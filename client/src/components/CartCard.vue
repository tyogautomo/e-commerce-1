<template>
  <div class="cart-card d-flex mb-3">
    <div class="product-image col-3" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
    <div class="main col-9 d-flex flex-column p-3">
      <div class="increse-decrease d-flex align-items-center">
        <button class="decrease btn btn-danger mr-3">-</button>
        <span class="mr-3">2</span>
        <a href class="increase">
          <button class="decrease btn btn-success">+</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: "http://cubegaming.id/wp-content/uploads/2019/08/2.png"
    };
  }
};
</script>

<style scoped>
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
<template>
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 2px 3px #000"
    fade
    indicators
    img-width="1024"
    img-height="480"
  >
    <b-carousel-slide caption="Level up your gaming machine" img-src="https://i.ibb.co/0rbkr13/carousel1.jpg" class="img"></b-carousel-slide>
    <b-carousel-slide caption="The most advance gaming peripheral" img-src="https://i.ibb.co/B3xxqhr/carousel2.jpg"></b-carousel-slide>
    <b-carousel-slide caption="Third Slide" img-src="https://i.ibb.co/Nxhtn3q/carousel3.jpg"></b-carousel-slide>
  </b-carousel>
</template>

<script>
export default {};
</script>

<style scoped>
#carousel-fade {
  box-shadow: 0 2px 10px black;
}
</style>
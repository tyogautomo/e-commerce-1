<template>
  <div id="app">
    <navbar class="fixed-top"></navbar>
    <transition name="fade">
      <router-view class="router-view" />
    </transition>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("signin"); 
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.router-view {
  margin-top: 50px;
}

.fade-enter-active {
  transition: opacity 0.6s;
}
.fade-enter {
  opacity: 0;
}
</style>

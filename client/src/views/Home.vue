<template>
  <div class="home">
    <LandingPage v-if="!$store.state.isLogin" />
    <Dashboard v-if="$store.state.isLogin" />
  </div>
</template>

<script>
import LandingPage from "@/views/LandingPage.vue";
import Dashboard from "@/views/Dashboard.vue";
export default {
  components: {
    LandingPage,
    Dashboard
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$router.push("/products");
    }
  }
};
</script>

<style scoped>
</style>
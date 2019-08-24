<template>
  <div class="navbar-section fixed-top">
    <b-navbar type="dark" variant="dark" class="d-flex justify-content-between p-0 pl-1 pr-1">
      <b-navbar-nav class="d-flex align-items-center justify-content-center">
        <b-nav-item href="#" class="brand-name">
          <span>Cubes</span>
        </b-nav-item>
      </b-navbar-nav>
      <button class="btn btn-danger" v-if="$store.state.isLogin" @click.prevent="signOut()">Sign out</button>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      this.$router.push("/");
      this.$store.commit("signout");
    }
  }
};
</script>

<style scoped>
.navbar-section {
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.643);
  z-index: 100000;
}

span {
  color: white;
  font-family: "Oswald";
  font-size: 25px;
}

button {
  font-family: 'Oswald'
}
</style>
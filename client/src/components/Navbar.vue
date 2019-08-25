<template>
  <div class="navbar-section fixed-top">
    <b-navbar type="dark" variant="dark" class="d-flex justify-content-between p-0 pl-1 pr-1">
      <b-navbar-nav class="d-flex align-items-center justify-content-center">
        <b-nav-item href="#" class="brand-name">
          <span>Cubes</span>
        </b-nav-item>
      </b-navbar-nav>
      <button class="btn btn-danger" v-if="$store.state.isLogin" @click.prevent="signOut()">
        <i class="fas fa-sign-out-alt mr-2"></i> Sign out
      </button>
    </b-navbar>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  methods: {
    signOut() {
      Swal.fire({
        title: "Sign out now?",
        text: "You will be logged out after this",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log me out"
      }).then(result => {
        if (result.value) {
          this.$router.push("/");
          this.$store.commit("signout");
        }
      });
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
  font-family: "Oswald";
}
</style>
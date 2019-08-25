<template>
  <div>
    <b-modal
      id="modal-signin"
      title="Sign Up"
      @ok="signIn(formSignin)"
      centered
      header-bg-variant="dark"
      footer-bg-variant="dark"
    >
      <div slot="modal-header">
        <h5>Sign In</h5>
      </div>
      <form @submit.prevent="signIn(formSignin)" class="d-flex flex-column" id="signin-modal">
        <div class="email d-flex align-items-center mb-3">
          <i class="fas fa-envelope mr-3"></i>
          <input type="text" placeholder="Enter your Email" v-model="formSignin.email" />
        </div>
        <div class="password d-flex align-items-center mb-3">
          <i class="fas fa-key mr-3"></i>
          <input type="password" placeholder="Enter your Password" v-model="formSignin.password" />
        </div>
      </form>
      <div slot="modal-footer">
        <button type="submit" form="signin-modal" class="btn btn-primary">Sign In</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "@/apis/server.js";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      formSignin: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    // ...mapActions(["signIn"])
    signIn(payload) {
      axios({
        method: "post",
        url: `/users/signin`,
        data: payload
      })
        .then(({ data }) => {
          // console.log(data)
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.username);
          this.$store.dispatch("signIn");
          this.$router.push("/products");
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: err.response.data.message
          });
          console.log(err.response.data.message);
        });
    }
  }
};
</script>

<style scoped>
h5 {
  font-family: "Oswald";
  color: white;
}

input {
  font-family: "Oswald";
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.472);
  outline: none;
  width: 70%;
}
</style>
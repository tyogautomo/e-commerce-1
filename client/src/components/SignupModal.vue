<template>
  <b-modal
    id="modal-signup"
    title="Sign Up"
    @ok="signUp(formSignUp)"
    centered
    header-bg-variant="dark"
    footer-bg-variant="dark"
  >
    <div slot="modal-header">
      <h5>Sign Up</h5>
    </div>
    <form @submit.prevent="signUp(formSignUp)" class="d-flex flex-column" id="signup-form">
      <div class="username d-flex">
        <i class="fas fa-user mr-2"></i>
        <small>Username :</small>
      </div>
      <input type="text" placeholder="Username" v-model="formSignUp.username" />
      <div class="email d-flex">
        <i class="fas fa-envelope mr-2"></i>
        <small>Email :</small>
      </div>
      <input type="text" placeholder="Email" v-model="formSignUp.email" />
      <div class="password d-flex">
        <i class="fas fa-key mr-2"></i>
        <small>Password :</small>
      </div>
      <input type="password" placeholder="Password" v-model="formSignUp.password" />
    </form>
    <div slot="modal-footer">
      <button type="submit" class="btn btn-primary" form="signup-form">Sign Up</button>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";
import axios from "@/apis/server.js";

export default {
  data() {
    return {
      formSignUp: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signUp(payload) {
      axios({
        method: "post",
        url: `/users/signup`,
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.username);
          Swal.fire({
            type: "success",
            title: "Your account successfuly registered!",
            text: "Enjoy surfing our best product :D"
          });
          this.$store.dispatch("signUp");
          this.$router.push("/products");
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            type: "error",
            title: "Something wrong :(",
            html: err.response.data.message
          });
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
  margin-bottom: 20px;
  width: 60%;
}

small {
  font-family: "Oswald";
}
</style>
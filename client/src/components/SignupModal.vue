<template>
  <b-modal id="modal-signup" title="Sign Up" @ok="signUp(formSignUp)" centered>
    <form @submit.prevent="signUp(formSignUp)" class="d-flex flex-column">
      <input type="text" placeholder="Enter your Username" v-model="formSignUp.username" />
      <input type="text" placeholder="Enter your Email" v-model="formSignUp.email" />
      <input type="password" placeholder="Enter your Password" v-model="formSignUp.password" />
      <input type="submit" style="display: none" />
    </form>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

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
    // ...mapActions(["signUp"])
    signUp(payload) {
      this.$store.dispatch("signUp", payload);
      this.$router.push("/products");
    }
  }
};
</script>

<style scoped>
h5 {
  font-family: "Oswald";
}

input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.472);
  outline: none;
  margin-bottom: 20px;
}
</style>
<template>
  <div>
    <b-modal id="modal-signin" title="Sign Up" @ok="signIn(formSignin)" centered>
      <form @submit.prevent="signIn(formSignin)" class="d-flex flex-column">
        <input type="text" placeholder="Enter your Email" v-model="formSignin.email" />
        <input type="password" placeholder="Enter your Password" v-model="formSignin.password" />
        <input type="submit" style="display: none" />
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
      this.$store.dispatch('signIn', payload)
      this.$router.push('/products')
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
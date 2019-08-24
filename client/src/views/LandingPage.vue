<template>
  <div class="landing-page d-flex justify-content-center align-items-center">
    <div class="signup-banner col">
      <div class="black-layer"></div>
    </div>
    <div class="user-gate justify-content-center">
      <div class="brand-name">
        <h1>CUBES</h1>
      </div>
      <div class="button-group d-flex justify-content-around">
        <button v-b-modal.modal-signin>SIGNIN</button>
        <button v-b-modal.modal-signup>SIGNUP</button>
      </div>
      <SigninModal />
      <SignupModal />
    </div>
    <div class="signin-banner col">
      <div class="black-layer"></div>
    </div>
  </div>
</template>

<script>
import SignupModal from "@/components/SignupModal.vue";
import SigninModal from "@/components/SigninModal.vue";

export default {
  components: {
    SignupModal,
    SigninModal
  }
};
</script>

<style scoped>
@keyframes inOut {
  0%,
  100% {
    background-size: 160%;
  }
  50% {
    background-size: 220%;
  }
}

@keyframes outIn {
  0%,
  100% {
    background-size: 220%;
  }
  50% {
    background-size: 160%;
  }
}

.signup-banner {
  height: 100vh;
  background-image: url("https://storage-asset.msi.com/event/2019/mystic-light-rgb-pc/images/img-ambient-link.jpg");
  padding: 0;
  border-right: 5px solid black;
  transition: 0.3s;
  animation: inOut 30s infinite;
}

.signin-banner {
  height: 100vh;
  background-image: url("https://pbs.twimg.com/media/DmctzDlXsAAKXVB.jpg");
  padding: 0;
  border-left: 5px solid black;
  transition: 0.3s;
  animation: outIn 30s infinite;
}

.user-gate {
  position: fixed;
  z-index: 100;
  width: 50%;
  height: 55%;
  border: 10px solid rgb(255, 255, 255);
  background-color: rgba(0, 0, 0, 0.432);
  border-radius: 9px;
  padding: 30px;
}

.black-layer {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.609);
}

.brand-name h1 {
  font-family: "Oswald";
  color: white;
  font-size: 150px;
}

button {
  background-color: transparent;
  border: 2px solid white;
  font-family: "Oswald";
  padding: 15px;
  color: white;
  position: relative;
  border-radius: 30px;
  transition: 0.2s;
  width: 100px;
}

button:focus {
  outline: 0;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.473);
  width: 120px;
}

button:active {
  width: 100px;
}

.button-group {
  width: 60%;
  margin: auto;
  margin-top: 40px;
}
</style>
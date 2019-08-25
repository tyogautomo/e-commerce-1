<template>
  <div class="dashboard d-flex">
    <Sidebar class="col-2"></Sidebar>
    <transition name="fade">
      <router-view class="col-10 ml-auto"></router-view>
    </transition>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Content from "@/components/Content.vue";

export default {
  components: {
    Sidebar,
    Content
  }
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter {
  opacity: 0;
}
</style>
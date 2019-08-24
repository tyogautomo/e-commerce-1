<template>
  <div class="dashboard d-flex">
    <Sidebar class="col-2"></Sidebar>
    <!-- <Content class="col-10" v-if="!$store.state.isDetailProduct"></Content> -->
    <transition name="fade">
      <router-view class="col-10"></router-view>
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
  transition: opacity 2s;
}
.fade-enter {
  opacity: 0;
}
</style>
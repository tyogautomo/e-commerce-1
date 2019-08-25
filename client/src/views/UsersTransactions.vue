<template>
  <div class="all-transactions d-flex">
    <Sidebar class="col-2"></Sidebar>
    <div class="alltransaction col-10 ml-auto d-flex flex-column pt-5">
      <h1 class="align-self-start mb-5">Users Transactions</h1>
      <!-- ===================================== nav transactions ==================================== -->
      <div class="nav-transactions d-flex pb-3">
        <b-nav pills>
          <b-nav-item class="mr-2" :active="isSelectingAll" @click.prevent="toAllTransactions">All</b-nav-item>
          <b-nav-item
            class="mr-2"
            :active="isSelectingArrived"
            @click.prevent="toArrivedTransactions"
          >Arrived</b-nav-item>
          <b-nav-item
            class="mr-2"
            :active="isSelectingOngoing"
            @click.prevent="toOnGoingTransactions"
          >Ongoing</b-nav-item>
        </b-nav>
      </div>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import axios from "@/apis/server.js";

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      isSelectingAll: true,
      isSelectingArrived: false,
      isSelectingOngoing: false
    };
  },
  methods: {
    toAllTransactions() {
      this.isSelectingAll = true;
      this.isSelectingArrived = false;
      this.isSelectingOngoing = false;
      this.$router.push("/admin/transaction");
    },
    toArrivedTransactions() {
      this.isSelectingAll = false;
      this.isSelectingArrived = true;
      this.isSelectingOngoing = false;
      this.$router.push("/admin/transaction/arrived");
    },
    toOnGoingTransactions() {
      this.isSelectingAll = false;
      this.isSelectingArrived = false;
      this.isSelectingOngoing = true;
      this.$router.push("/admin/transaction/ongoing");
    }
  }
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.6s;
}
.fade-enter {
  opacity: 0;
}
h1 {
  font-family: "Oswald";
}

.alltransaction {
  background-color: rgb(218, 218, 218);
}

.nav-transactions {
  border-bottom: 1px solid rgb(136, 136, 136);
}
</style>
<template>
  <div class="transaction d-flex">
    <Sidebar class="col-2"></Sidebar>
    <div
      class="transaction-list-container col-10 ml-auto d-flex flex-column align-items-center pt-5"
    >
      <div class="main-title d-flex mb-5 align-self-stretch">
        <h1 class="m-0 mb-2">Transactions</h1>
      </div>
      <div
        class="transaction-card d-flex mb-3"
        v-for="trans in compiledTransactions"
        :key="trans.id"
      >
        <!-- info -->
        <div class="info col-9 p-3 d-flex flex-column align-items-start">
          <h5>Transaction at: {{trans.updatedAt.toString().substr(0, 24)}}</h5>
          <!-- products list -->
          <div class="products-list d-flex align-self-stretch mt-3 flex-wrap">
            <div class="product mr-3" v-for="item in trans.products" :key="item.id">
              <div class="image" :style="{ backgroundImage: 'url(' + item.featured_image + ')' }"></div>
              <div class="name">{{item.name}}</div>
              <div class="amount d-flex justify-content-center align-items-center">
                <small>amount: {{item.amount}}</small>
              </div>
            </div>
          </div>
          <div class="total-price mt-3">
            <h6>Total price: $ {{trans.total}}</h6>
          </div>
        </div>
        <!-- user options -->
        <div class="user-options col-3 p-3">
          <p>Please verify your delivery order</p>
          <button
            class="btn btn-success"
            v-if="!trans.deliveryStatus"
            @click="verify(trans.id)"
          >Verify Delivery</button>
          <button class="btn btn-success" v-if="trans.deliveryStatus" disabled>
            Delivered
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Sidebar
  },
  methods: {
    getUserTransactions() {
      this.$store.dispatch("getUserTransactions");
    },
    verify(id) {
      console.log(id);
      this.$store.dispatch("verifyDelivery", id);
    }
  },
  computed: {
    ...mapGetters(["compiledTransactions"])
  },
  created() {
    this.getUserTransactions();
  }
};
</script>

<style scoped>
.main-title {
  border-bottom: 2px solid rgb(17, 47, 68);
}

h1 {
  font-size: 50px;
  font-family: "Oswald";
}

h5,
h6,
small,
p,
button,
.name {
  font-family: "Oswald";
}

.transaction {
  background-color: rgb(218, 218, 218);
}

.transaction-card {
  width: 60%;
  border-radius: 7px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  position: relative;
  top: 0;
  transition: 0.2s;
}

.transaction-card:hover {
  top: -6px;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.356);
}

.info {
  border-radius: 7px 0 0 7px;
  background-color: rgb(168, 168, 168);
}

.products-list {
  background-color: rgb(43, 91, 110);
  padding: 7px;
  border-radius: 7px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.418);
  color: rgb(197, 230, 230);
}

.user-options {
  border-radius: 0 7px 7px 0;
  background-color: rgb(245, 245, 245);
}

.image {
  width: 80px;
  height: 80px;
  background-size: cover;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.411);
}

.amount {
  padding: 3px;
  background-color: rgb(82, 140, 163);
  border-radius: 10px;
}
</style>
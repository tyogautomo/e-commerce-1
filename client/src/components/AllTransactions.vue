<template>
  <div class="alltransactions">
    <table class="mt-4">
      <tr>
        <th class="start">No</th>
        <th>Transaction ID</th>
        <th>Username</th>
        <th>Products</th>
        <th>Total Price ($)</th>
        <th class="end">Status</th>
      </tr>
      <tr class="list" v-for="(trans, index) in allTransactions" :key="trans.id">
        <td>{{index + 1}}</td>
        <td>{{trans.id}}</td>
        <td>{{trans.userId.username}}</td>
        <td>
          <tr v-for="item in trans.products" :key="item.id">{{item.name}} (amount: {{item.amount}})</tr>
        </td>
        <td>{{trans.total}}</td>
        <td>
          <span
            class="status"
            :class="{arrived: trans.deliveryStatus, ongoing: !trans.deliveryStatus}"
          >{{trans.deliveryStatus ? 'arrived' : 'ongoing'}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "@/apis/server.js";

export default {
  data() {
    return {
      allTransactions: []
    };
  },
  methods: {
    getAllUsersTrasanctions() {
      axios({
        method: "get",
        url: `/carts/allusers`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          //   console.log(data);
          let transactions = data;
          let newArrayOfTransactions = [];
          for (let i = 0; i < transactions.length; i++) {
            let products = {};
            for (let j = 0; j < transactions[i].products.length; j++) {
              if (products[transactions[i].products[j]._id] == undefined) {
                products[transactions[i].products[j]._id] = {
                  id: transactions[i].products[j]._id,
                  name: transactions[i].products[j].name,
                  description: transactions[i].products[j].description,
                  price: 0,
                  quantity: transactions[i].products[j].quantity,
                  featured_image: transactions[i].products[j].featured_image,
                  amount: 0
                };
              }

              products[transactions[i].products[j]._id].price +=
                transactions[i].products[j].price;
              products[transactions[i].products[j]._id].amount++;
            }

            let keys = Object.keys(products);
            let compiledProducts = [];
            for (let i = 0; i < keys.length; i++) {
              compiledProducts.push(products[keys[i]]);
            }

            let newObj = {
              id: transactions[i]._id,
              userId: transactions[i].userId,
              products: compiledProducts,
              paymentStatus: transactions[i].paymentStatus,
              deliveryStatus: transactions[i].deliveryStatus,
              updatedAt: new Date(transactions[i].updatedAt),
              total: 0
            };

            for (const item of compiledProducts) {
              newObj.total += item.price;
            }

            newArrayOfTransactions.push(newObj);
          }

          //   console.log(newArrayOfTransactions);
          this.allTransactions = newArrayOfTransactions;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getAllUsersTrasanctions();
  }
};
</script>

<style scoped>

.status {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.548);
}

tr.list:nth-child(odd) {
    background-color: rgb(199, 199, 199);
}

.arrived {
  background-color: rgb(104, 206, 104);
  padding: 5px 20px;
  border-radius: 20px;
}

.ongoing {
  background-color: rgb(206, 104, 104);
  padding: 5px 20px;
  border-radius: 20px;
}

table {
  border-collapse: collapse;
  width: 100%;
  font-family: "Oswald";
}
th {
  padding: 20px 10px;
  /* border-bottom: 1px solid rgb(70, 70, 70); */
  text-align: left;
  background-color: rgb(58, 58, 58);
  color: white;
}

th.start {
  border-radius: 7px 0 0 0;
}
th.end {
  border-radius: 0 7px 0 0;
}

td {
  padding: 10px;
  /* border-bottom: 1px solid rgb(129, 129, 129); */
  text-align: left;
}
</style>
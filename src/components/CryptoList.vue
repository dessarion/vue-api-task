<template>
  <div>
    <h1>Current cryptocyrrency listing</h1>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <input v-model="finder" />
          </th>
          <th>
            Price
            <select v-model="quote">
              <option v-for="quote in getQuotes" :value="quote" :key="quote">{{quote}}</option>
            </select>
          </th>
          <th>Trading volume 24h</th>
          <th>Market capitalization</th>
        </tr>
      </thead>      
      <Loader v-if="loadingStatus" />
      <tbody v-else>
        <tr v-for="(cryptoItem, idx) in findByText" :key="cryptoItem.id">
          <td>{{idx + 1}}</td>
          <td class="name">
            <span class="name_span">{{cryptoItem.name}}</span>
            <span class="name_span">{{cryptoItem.symbol}}</span>
          </td>
          <td>
            <span class="price">{{cryptoItem.quote[quote].price | floatComaDigit}}</span>
            <span
              class="material-icons"
              style="color:green;"
              v-if="cryptoItem.quote[quote].percent_change_24h > 0"
            >trending_up</span>
            <span
              class="material-icons"
              style="color:red;"
              v-else-if="cryptoItem.quote[quote].percent_change_24h < 0"
            >trending_down</span>
            <span>( {{cryptoItem.quote[quote].percent_change_24h | growStatus}} % )</span>
          </td>
          <td>{{cryptoItem.quote[quote].volume_24h.toFixed(0)}} {{quote}}'s</td>
          <td>{{cryptoItem.quote[quote].market_cap.toFixed(0)}} {{quote}}'s</td>         
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      quote: "",
      finder: "",
    };
  },
  computed: {
    ...mapGetters(["getList", "loadingStatus", "getQuotes", "getInfo"]),
    getFilteredList() {
      if (this.quote === "") {
        this.quote = this.getQuotes[0];
        return this.getList[0];
      }
      const quotes = this.getQuotes;
      const idx = quotes.indexOf(this.quote);
      return this.getList[idx];
    },
    findByText() {
      let display = this.getFilteredList;
      if (this.finder) {
        this.getFilteredList.filter((c) => {
          if (c.slug === this.finder) {
            display = { c };
          }
        });
      }
      return display;
    },
  },
  methods: {
    ...mapActions(["fetchCrypto"]),
  },
  async mounted() {
    await this.fetchCrypto(); 
  },
  components: {
    Loader: () => import("@/components/Loader"),
  },
  filters: {
    floatComaDigit(digit) {
      if (digit < 1) {
        return digit.toFixed(3);
      } else {
        return digit.toFixed(2);
      }
    },
  },
};
</script>

<style scoped>
select {
  padding: 5px;
  margin-bottom: 20px;
  outline: none;
}
table {
  width: auto;
  margin: 0 auto;
}
tbody td {
  width: 200px;
  height: 50px;
}
tbody td:first-child {
  width: auto;
  font-weight: bold;
}
.price {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}
.name_span {
  width: 100%;
  display: inline-block;
}

</style>

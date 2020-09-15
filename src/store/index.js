import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: process.env.VUE_APP_FIXER ,
    quote: ['UAH', 'USD', 'EUR', 'NOK'],
    cryptoList: [],
    loading: true,
  },
  mutations: {
    updateList(state, cryptoList) {
      state.cryptoList.push(cryptoList)
    },
    updateLoadingStatus(state, status) {
      state.loading = status
    },    
  },
  actions: {
    async fetchCrypto({ commit }, limit = 4) {
      let key = this.state.apiKey

      const fetchIterator = async function (quotes) {
        for (let i = 0; quotes.length > i; i++) {
          let qouteStr = '?CMC_PRO_API_KEY=' + key + '&start=1&limit=' + limit + '&convert=' + quotes[i]
          let response = await fetch('https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest' + qouteStr)
          let cryptoList = await response.json()
          commit("updateList", cryptoList.data)         
        }
      }
      fetchIterator(this.state.quote)

      setTimeout(() => {
        commit("updateLoadingStatus", false)
      }, 1000);
    },
  },
  getters: {
    getList(state) {
      return state.cryptoList
    },
    getQuote(state,) {
      return state.quote[0]
    },
    getQuotes(state,) {
      return state.quote
    },
    loadingStatus(state) {
      return state.loading
    },
    getInfo(state) {
      return state.infoBranch
    }    
  },
})

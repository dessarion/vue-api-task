import Vue from 'vue'
import App from './App.vue'
import store from './store'
import status from '@/filters/status.filter'

Vue.config.productionTip = false

Vue.filter('growStatus', status)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

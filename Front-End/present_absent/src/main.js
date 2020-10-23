import Vue from 'vue'
import vuex from 'vuex'
import './mock.weblite'
import App from './App.vue'
import { store } from './Store/store'

Vue.config.productionTip = false
Vue.use(vuex)


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

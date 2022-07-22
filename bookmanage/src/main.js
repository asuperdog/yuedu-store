// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import qs from 'qs'
import axios from 'axios'
import router from './router'
import ECharts from 'vue-echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI)

const store = new Vuex.Store({
  state: {
    access: false
  },
  mutations: {
    login(state) {
      state.access = true
    },
    logout(state) {
      state.access = false
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

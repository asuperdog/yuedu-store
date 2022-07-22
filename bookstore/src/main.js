// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

require('./mock')
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: [],
    access: false
  },
  mutations: {
    // 登录状态
    login: state => state.access = true,
    logout: state => state.access = false,
    // 添加商品
    add(state, item) {
      // console.log(item)
      let flag = false
      // 加购去重（通过id判断）
      state.cartList.forEach(i => {
        if (i.item.id == item.id) {
          i.num++
          flag = true
        }
      })
      if (flag == false) {
        state.cartList.push({
          num: 1, // 添加数量默认为1
          item, // 添加购物车商品数据
          checked: false // 添加复选框初始化状态为false
        })
      }
    },
    // 删除商品
    del(state, index) {
      state.cartList.splice(index, 1)
    },
    // 改变数量
    changeNum(state, index) {
      state.cartList.num = index
    },
    // 全选全不选
    checked(state, newAll) {
      state.cartList.forEach(item => {
        item.checked = newAll
      })
    }
  },
  // 计算 getters
  getters: {
    // 总价
    total(state) {
      let sum = 0
      state.cartList.forEach(item => {
        // 如果复选框选中，计算总价
        if (item.checked == true) {
          sum += item.item.price * item.num
        }
      })
      return sum
    }
  },
  plugins: [
    new VuexPersist({
      storage: window.localStorage
    }).plugin
  ]
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

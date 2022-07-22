<template>
  <div id="app">
    <router-view />
    <van-tabbar :v-model="0" route placeholder v-show="$route.name!='Detail'">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o" :badge="cartNum">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'App',
        access: false,
        cartNum: this.$store.state.cartList.length
      }
    },
    computed: {
      loginCheck: function() {
        return this.$store.state.access
      },
      cartNumCheck: function() {
        return this.$store.state.cartList.length
      }
    },
    watch: {
      loginCheck: function(newVal, oldVal) {
        this.access = this.$store.state.access
      },
      cartNumCheck: function() {
        this.cartNum = this.$store.state.cartList.length
      }
    },
    mounted() {
      this.access = window.sessionStorage.getItem('account') ? true : false
    }
  }
</script>

<style>

</style>

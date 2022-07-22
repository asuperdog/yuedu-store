<template>
  <div>
    <van-nav-bar title="购物车" />
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <div class="cart-container" v-for="(item, index) in cartList">
        <div class="cart-check">
          <van-checkbox v-model="item.checked"></van-checkbox>
        </div>
        <div class="cart-detail">
          <van-swipe-cell>
            <van-card :title="item.item.title" :price="item.item.price/100" :desc="item.item.author"
              :thumb="item.item.image" class="goods-card">
              <template #num>
                <van-stepper v-model="item.num" max="5" button-size="22" disable-input @change="changeNum(item.num)" />
              </template>
            </van-card>
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" @click="del(index)" />
            </template>
          </van-swipe-cell>
        </div>
      </div>
      <van-empty description="购物车空空如也" v-if="cartList.length==0" />
    </van-pull-refresh>
    <van-submit-bar :price="$store.getters.total" button-text="提交订单" class="submit-bar">
      <van-checkbox v-model="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        value: '',
        loading: false,
        cartList: this.$store.state.cartList
      }
    },
    mounted() {
      var access = window.sessionStorage.getItem('account')
      if (!access) {
        this.$toast('您还没登录哦~')
        this.$router.push('/login')
      }
    },
    computed: {
      // 计算属性checkAll 和全选按钮双向数据绑定，别人可以控制它 它也可以控制别人
      // 别人控制它 给他一个值的时候是 get，它控制别人 给别人设置值的时候 是set
      // 在set中newVal参数是这个计算属性改变后的值
      checkAll: { //可以看作一个事件
        get() {
          // 判断购物车里商品的长度为0  return false
          if (this.cartList.length == 0) {
            return false
          }
          return this.$store.state.cartList.every(item => {
            return item.checked == true // 返回结果复选框为true
          })
        },
        set(newVal) {
          this.$store.commit('checked', newVal)
        }
      }
    },
    methods: {
      onChange(value, detail) {
        console.log(value, detail)
      },
      onRefresh() {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      //方法集合
      ...mapMutations(['del', 'changeNum'])
    }
  }
</script>

<style scoped>
  .cart-container {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }

  .cart-check {
    flex: 1;
    padding-left: 10px;
  }

  .cart-detail {
    flex: 12;
  }

  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }

  .submit-bar {
    margin-bottom: 50px;
  }
</style>

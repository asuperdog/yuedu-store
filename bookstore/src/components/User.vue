<template>
  <div>
    <van-nav-bar title="我的" />
    <div class="user-card">
      <div class="user-info">
        <img src="@/assets/img/user.png" />
        <div class="user-desc" v-if="access==true">
          <span>用户名：{{account}}</span>
          <span>昵&emsp;称：悦在指间</span>
          <span>签&emsp;名：阅读使我快乐</span>
        </div>
        <div class="user-desc guest" v-else>
          <span>悦读书城游客</span>
        </div>
      </div>
    </div>
    <van-cell-group>
      <van-cell title="我的悦读" is-link @click="tips" />
      <van-cell title="我的订单" is-link @click="tips" />
      <van-cell title="地址管理" is-link @click="tips" />
      <van-cell title="联系我们" is-link @click="tips" />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button type="primary" round block v-if="!access" to="/login">登录书城</van-button>
      <van-button type="danger" round block v-else @click="logout">退出登录</van-button>
    </div>
    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" description="确定退出登录吗?" close-on-click-action
      @select="onSelect" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        account: '',
        show: false,
        access: false,
        actions: [{
          name: '退出登录',
          color: '#ee0a24'
        }]
      }
    },
    mounted() {
      this.access = window.sessionStorage.getItem('account') ? true : false
      this.account = window.sessionStorage.getItem('account')
    },
    methods: {
      logout() {
        this.show = true
      },
      tips() {
        this.$toast('敬请期待~')
      },
      onSelect(action, index) {
        if (index == 0) {
          window.sessionStorage.clear()
          this.$store.commit('logout')
          window.location.reload()
          this.$notify({
            type: 'warning',
            message: '已退出登录'
          })
        }
      }
    },
  }
</script>

<style scoped>
  .user-card {
    margin: 10px;
    height: 120px;
    border-radius: 8px;
    box-shadow: 0 2px 5px #269090;
    background: linear-gradient(90deg, #1baeae, #51c7c7);
  }

  .user-info {
    display: flex;
    position: relative;
    padding: 25px 20px;
  }

  .user-desc {
    display: flex;
    flex-direction: column;
    margin-left: 18px;
    line-height: 20px;
    font-size: 14px;
    color: #fff;
  }

  .guest {
    padding-top: 23px;
  }

  img {
    width: 60px;
    height: 60px;
    margin-top: 5px;
    border-radius: 50%;
  }

  span {
    font-size: 14px;
    padding: 2px 0;
  }
</style>

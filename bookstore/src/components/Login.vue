<template>
  <div>
    <van-nav-bar title="登录页" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-notice-bar left-icon="volume-o" text="【演示账号】用户名: demo，密码: demo。" />
    <img src="@/assets/logo.png" class="logo" />
    <van-form @submit="onSubmit" class="login">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    mounted() {
      var access = window.sessionStorage.getItem('account')
      if (access) {
        this.$router.push('/user')
      }
    },
    methods: {
      onSubmit(values) {
        let username = this.username
        let password = this.password
        if (username == 'demo' && password == 'demo') {
          window.sessionStorage.setItem('account', username)
          this.$store.commit('login')
          this.$router.back()
          this.$notify({
            type: 'success',
            message: '登录成功'
          })
        } else {
          this.$toast.fail('登录信息有误')
        }
      },
      onClickLeft() {
        this.$router.back()
      }
    },
  }
</script>

<style scoped>
  .logo {
    width: 120px;
    height: 120px;
    display: block;
    margin: 65px auto 65px;
  }

  .login {
    width: 88%;
    margin: 0 auto;
  }
</style>

<template>
  <div>
    <div class="login-box">
      <div class="login-title">
        <img src="@/assets/logo.png" class="logo" />
        <h1 class="title">悦读书城后台管理系统</h1>
      </div>
      <el-form class="login-form">
        <el-form-item>
          <el-input v-model="username" type="text" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="checkLogin" style="width: 100%">登录系统</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        msg: ''
      }
    },
		mounted() {
		  var access = window.sessionStorage.getItem('account')
		  if (access) {
		    this.$router.push('/')
		  }
		},
    methods: {
      checkLogin() {
        var username = this.username
        var password = this.password
        if (username == 'admin' && password == 'admin') {
          window.sessionStorage.setItem('account', username)
          this.$store.commit('login')
          this.$router.back()
          this.$notify({
            type: 'success',
            title: '登录成功',
            message: '这是一条成功的提示消息'
          })
        } else {
          this.msg = '帐号或密码有误!'
          this.$message({
            type: 'error',
            message: this.msg
          })
        }
      }
    }
  }
</script>

<style scoped>
  .login-box {
    width: 450px;
    margin: 50px auto;
    border-radius: 10px;
    box-shadow: 2px 2px 12px #ccc;
  }

  .login-box .logo {
    width: 120px;
    height: 120px;
    opacity: 0.8;
    display: block;
    margin: 0 auto;
    padding-top: 60px;
  }

  .login-box .title {
    line-height: 50px;
    text-align: center;
    color: deepskyblue;
  }


  .login-form {
    padding: 0 50px 50px;
  }
</style>

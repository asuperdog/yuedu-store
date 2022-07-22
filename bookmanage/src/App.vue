<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu router default-active="1" class="el-menu-demo" mode="horizontal" background-color="#545c64"
          text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item>
            <img src="@/assets/logo1.png" alt="logo" width="35px" style="filter: grayscale(80%)" />
            <span>悦读后台</span>
          </el-menu-item>
          <el-menu-item index="/">系统首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">图书管理</template>
            <el-menu-item index="/addItem">新增图书</el-menu-item>
            <el-menu-item index="/showItem">图书列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">会员管理</template>
            <el-menu-item index="/addMember" disabled>添加会员</el-menu-item>
            <el-menu-item index="/showMember" disabled>会员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">订单管理</template>
            <el-menu-item index="/addOrder" disabled>导入订单</el-menu-item>
            <el-menu-item index="/showOrder" disabled>订单详情</el-menu-item>
          </el-submenu>
          <el-menu-item v-if="connStatus == 0 && access" style="float: right"><i class="status" style="background-color: #D9D9D9"></i></el-menu-item>
          <el-menu-item v-if="connStatus == 1 && access" style="float: right"><i class="status" style="background-color: #00FF33"></i></el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'App',
        access: false,
        connStatus : 0
      }
    },
    computed: {
      loginCheck: function() {
        return this.$store.state.access
      }
    },
    watch: {
      loginCheck: function(newVal, oldVal) {
        this.access = this.$store.state.access
      }
    },
    mounted() {
      this.access = window.sessionStorage.getItem('account') ? true : false
      this.$axios({
        method: 'get',
        url: '//api.superdog.tech:8082/rest',
      }).then(res => {
        this.connStatus = 1
      }).catch(error => {
        this.connStatus = 0
      })
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }

  .status {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 5px;
    display: inline-block;
  }
</style>

<template>
  <div>
    <van-nav-bar title="搜索图书" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-search v-model="keywords" placeholder="请输入搜索关键词" input-align="center" shape="round" @search="onSearch" />
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o" v-if="booksQuery.length!=0">
      <span>总共查询到 {{booksTotal}} 本图书</span>
    </van-notice-bar>
    <van-skeleton :row="4" :loading="loading" style="margin-top: 10px" />
    <van-empty image="search" description="找不到相关内容" v-if="booksTotal==0" />
    <van-grid :border="true" :column-num="3" :gutter="8">
      <template v-for="(item, index) in booksQuery">
        <van-grid-item @click="clickItem(item.id)">
          <van-image :src="item.image" />
          <div v-html="item.title" class="item-title"></div>
        </van-grid-item>
      </template>
    </van-grid>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        val: '',
        keywords: '',
        booksTotal: '',
        booksQuery: [],
        loading: true
      }
    },
    mounted() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      this.keywords = this.$route.params.val
      this.searchItem(this.keywords)
    },
    methods: {
      searchItem(val) {
        this.$axios({
          method: 'get',
          url: '//api.superdog.tech:8084/search',
          params: {
            q: val
          }
        }).then(res => {
          this.booksQuery = res.data.rows
          this.booksTotal = res.data.total
          this.loading = false
          this.$toast.clear()
        }).catch(error => {
          this.$toast.fail('数据加载失败')
        })
      },
      onClickLeft() {
        this.$router.back()
      },
      onSearch(val) {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        this.val = val
        this.searchItem(val)
      },
      clickItem(id) {
        this.$router.push({
          name: 'Detail',
          params: {
            id: id
          }
        })
      }
    }
  }
</script>

<style scoped>
  .item-title {
    font-size: 15px;
    text-align: center;
  }
</style>

<template>
  <div>
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="share-o" size="18" @click="handleShare" />
      </template>
    </van-nav-bar>
    <van-empty description="该分类下无商品" />
    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '子级分类',
        showShare: false,
        options: [{
            name: '微信',
            icon: 'wechat'
          },
          {
            name: '微博',
            icon: 'weibo'
          },
          {
            name: '复制链接',
            icon: 'link'
          },
          {
            name: '分享海报',
            icon: 'poster'
          },
          {
            name: '二维码',
            icon: 'qrcode'
          }
        ]
      }
    },
    mounted() {
      this.title = this.$route.params.title
    },
    methods: {
      onClickLeft() {
        this.$router.back()
      },
      onSelect(option) {
        this.showShare = false
      },
      handleShare(){
        this.showShare = true
      }
    }
  }
</script>

<style>
</style>

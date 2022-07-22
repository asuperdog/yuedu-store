<template>
  <div>
    <van-nav-bar title="悦读书城" />
    <van-search v-model="keyword" placeholder="请输入搜索关键词" input-align="center" shape="round" @search="onSearch" />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <van-image :src="image" @click="tips" style="width: 100%" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="4">
      <van-grid-item @click="tips" icon="column" text="图书" />
      <van-grid-item @click="tips" icon="newspaper-o" text="杂志" />
      <van-grid-item @click="tips" icon="label-o" text="新书榜" />
      <van-grid-item @click="tips" icon="hot-o" text="畅销榜" />
      <van-grid-item @click="tips" icon="audio" text="在线听书" />
      <van-grid-item @click="tips" icon="coupon-o" text="领券中心" />
      <van-grid-item @click="tips" icon="point-gift-o" text="签到有奖" />
      <van-grid-item @click="tips" icon="diamond-o" text="会员专属" />
    </van-grid>
    <van-cell title="热销图书" icon="location-o" />
    <van-skeleton :row="4" :loading="loading" style="margin-top: 10px" />
    <template v-for="(item, index) in books">
      <van-card :price="item.price/100" :desc="item.author" :title="item.title" :thumb="item.image"
        @click="clickItem(item.id)">
        <template #tags>
          <van-tag plain type="default" v-if="item.status==1">在售</van-tag>
          <van-tag plain type="warning" v-if="item.status==2">下架</van-tag>
        </template>
      </van-card>
    </template>
    <van-pagination v-model="page" :total-items="total" :items-per-page="rows" mode="simple" @change="pageChange(page)"
      v-show="books.length!=0" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        page: 1,
        rows: 5,
        books: [],
        total: '',
        keyword: '',
        loading: true,
        images: [
          require('@/assets/img/bg01.jpg'),
          require('@/assets/img/bg02.jpg'),
          require('@/assets/img/bg03.jpg')
        ]
      }
    },
    mounted() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      this.showItem()
    },
    methods: {
      showItem() {
        this.$axios({
          method: 'get',
          url: '//api.superdog.tech:8082/rest/item',
          params: {
            page: this.page,
            rows: this.rows
          }
        }).then(res => {
          this.books = res.data.rows
          this.total = res.data.total
          this.loading = false
          this.$toast.clear()
        }).catch(error => {
          this.$toast.fail('数据加载失败')
        })
      },
      pageChange(page) {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        this.page = page
        this.showItem()
      },
      onClickLeft() {
        this.$router.push({
          name: 'Category'
        })
      },
      onSearch(val) {
        this.$router.push({
          name: 'Search',
          params: {
            val: val
          }
        })
      },
      clickItem(id) {
        this.$router.push({
          name: 'Detail',
          params: {
            id: id
          }
        })
      },
      tips() {
        this.$toast('敬请期待~')
      }
    }
  }
</script>

<style>
</style>

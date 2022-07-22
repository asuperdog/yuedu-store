<template>
  <div class="main">
    <van-nav-bar title="图书详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="item-img" v-if="detail.length!=0">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <template v-for="value in 3">
          <van-swipe-item>
            <van-image :src="detail.image"></van-image>
          </van-swipe-item>
        </template>
      </van-swipe>
    </div>
    <div class="item-sku" v-if="detail.length!=0">
      <div class="item-price">
        <span class="font">秒杀价:</span>
        <span>￥{{detail.price/100}}</span>
      </div>
      <div class="item-title">
        <van-tag type="danger">自营</van-tag>
        <span style="font-weight: bold">{{detail.title}}</span>
      </div>
      <van-cell title="" :label="detail.author" :value="'库存: ' + detail.num" size="large" :border="false" />
    </div>
    <van-empty image="network" description="数据加载失败" v-else />
    <van-tabs type="card">
      <van-tab title="商品详情">
        <van-image :src="require('@/assets/img/bg05.jpg')" class="item-tabs"></van-image>
        <van-cell title="编码" :value="detail.id" />
        <van-cell title="书名" :value="detail.title" />
        <van-cell title="作者" :value="detail.author" class="van-ellipsis" />
        <van-cell title="ISBN" :value="detail.barcode" />
        <van-cell title="出版社" :value="detail.sellPoint" />
        <van-cell title="上架时间" :value="detail.created" />
      </van-tab>
      <van-tab title="商品评价">
        <van-skeleton title avatar :row="3" :loading="loading" class="item-sku" />
        <div v-for="(review, index) in reviews" class="item-tabs">
          <van-cell-group>
            <van-cell size="large" :label="review.review">
              <template #title>
                <span class="custom-title">
                  <van-icon name="chat-o" /> {{review.name}}
                </span>
                <van-rate v-model="review.rate" readonly style="float: right" />
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </van-tab>
      <van-tab title="售后保障">
        <div class="item-tabs font">
          <div>
            <van-divider>服务承诺</van-divider>
            <span>悦读书城向您保证所售商品均为正品行货，悦读自营商品开具机打发票或电子发票。凭质保证书及悦读书城发票，可享受全国联保服务，与您亲临商场选购的商品享受相同的质量保证。悦读书城还为您提供具有竞争力的商品价格和和运费政策，请您放心购买！</span><br>
            <span>注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！</span>
          </div>
          <div>
            <van-divider>权利声明</van-divider>
            <span>悦读书城上的所有商品信息、客户评价、商品咨询、网友讨论等内容，是悦读书城重要的经营资源，未经许可，禁止非法转载使用。</span><br>
            <span>注：本站商品信息均来自于厂商，其真实性、准确性和合法性由信息拥有者负责。本站不提供任何保证，并不承担任何法律责任。</span>
          </div>
          <div>
            <van-divider>价格说明</van-divider>
            <span>划线价：商品展示的划横线价格为参考价，并非原价，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价或该商品在悦读平台上曾经展示过的销售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考。</span><br>
            <span>异常问题：商品促销信息以商品详情页“促销”栏中的信息为准；商品的具体售价以订单结算页价格为准；如您发现活动商品售价或促销信息有异常，建议购买前先联系销售商咨询。</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-goods-action class="good-action">
      <van-goods-action-icon icon="chat-o" text="客服" dot @click="$toast('客服小姐姐下班了哦~')" />
      <van-goods-action-icon icon="cart-o" text="购物车" to="/cart" :badge="cartNum" />
      <van-goods-action-button type="danger" text="加入购物车" @click="addCart(detail)" />
    </van-goods-action>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        detail: [],
        reviews: [],
        loading: true,
        access: false,
        itemId: this.$route.params.id,
        cartNum: this.$store.state.cartList.length,
      }
    },
    computed: {
      cartNumCheck: function() {
        return this.$store.state.cartList.length
      }
    },
    watch: {
      cartNumCheck: function() {
        this.cartNum = this.$store.state.cartList.length
      }
    },
    mounted() {
      this.access = window.sessionStorage.getItem('account') ? true : false
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      this.getDetail()
      this.getReview()
    },
    methods: {
      getDetail() {
        this.$axios({
          method: 'get',
          url: '//api.superdog.tech:8082/rest/detail',
          params: {
            id: this.itemId
          }
        }).then(res => {
          if (res.data.status == 1 || res.data.status == 2) {
            this.detail = res.data
            this.$toast.clear()
          } else {
            this.$toast.fail('该商品不存在')
            this.$router.push('/')
          }
        }).catch(error => {
          this.$toast.fail('数据加载失败')
        })
      },
      getReview() {
        this.$axios({
          method: 'get',
          url: '/detail/review'
        }).then(res => {
          if (res.data.errorCode == 0) {
            this.reviews = res.data.reviews
            this.introduce = res.data.reviews[0].detail
            this.loading = false
            this.$toast.clear()
          } else {
            this.$toast.fail('获取评论出错')
          }
        }).catch(error => {
          this.$toast.fail('评论加载失败')
        })
      },
      onClickLeft() {
        this.$router.back()
      },
      addCart(item) {
        if (!this.access) {
          this.$toast('您还没登录哦~')
        } else if (this.detail.status == 2) {
          this.$toast.fail('此图书已下架')
        } else {
          this.$store.commit('add', item)
          this.$toast.success('已加入购物车')
        }
      }
    }
  }
</script>

<style scoped>
  .main {
    margin-bottom: 55px;
  }

  .font {
    font-size: 12px;
  }

  .item-img {
    padding-top: 20px;
    text-align: center;
  }

  .item-sku {
    padding-top: 10px;
  }

  .item-title {
    padding-top: 5px;
    padding-left: 18px;
  }

  .item-price {
    color: #EE0A24;
    font-size: 20px;
    padding-left: 18px;
  }

  .item-tabs {
    padding: 0 15px;
    margin-top: 10px;
  }
</style>

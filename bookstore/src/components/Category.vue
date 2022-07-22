<template>
  <div>
    <van-nav-bar title="图书分类" />
    <div class="main" v-if="parentCat.length!=0">
      <van-sidebar v-model="activeKey" class="sidebar">
        <template v-for="(cat, index) in parentCat">
          <van-sidebar-item :title="cat.name" @click="onClick(cat.id, cat.name)" />
        </template>
      </van-sidebar>
      <div class="category">
        <van-image :src="require('@/assets/img/bg04.jpg')" style="width: 100%" />
        <van-cell :title="title" :border="false" icon="location-o" value="排行榜" is-link @click="findItem(title)" />
        <van-grid :gutter="10" :column-num="3" square v-if="childrenCat.length!=0">
          <template v-for="(cat, index) in childrenCat">
            <van-grid-item icon="photo-o" :text="cat.name" @click="findItem(cat.name)" />
          </template>
        </van-grid>
        <van-empty image="network" description="数据加载失败" v-else />
      </div>
    </div>
    <van-empty image="network" description="数据加载失败" v-else />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: true,
        activeKey: 0,
        parentCat: [],
        childrenCat: [],
        title: '电子书刊'
      }
    },
    mounted() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      this.getParentCat()
      this.getChildrenCat(2)
    },
    methods: {
      getParentCat() {
        this.$axios({
          method: 'get',
          url: '//api.superdog.tech:8082/rest/item/cat?id=1'
        }).then(res => {
          this.parentCat = res.data
        }).catch(error => {
          this.$toast.fail('数据加载失败')
        })
      },
      getChildrenCat(id) {
        this.$axios({
          method: 'get',
          url: '//api.superdog.tech:8082/rest/item/cat',
          params: {
            id: id
          }
        }).then(res => {
          this.childrenCat = res.data
          this.loading = false
          this.$toast.clear()
        }).catch(error => {
          this.$toast.fail('数据加载失败')
        })
      },
      onClickLeft() {
        this.$router.back()
      },
      onClick(id, title) {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        this.getChildrenCat(id)
        this.title = title
        this.loading = true
      },
      findItem(title) {
        this.$router.push({
          name: 'ItemCat',
          params: {
            title: title
          }
        })
      }
    }
  }
</script>

<style scoped>
  .main {
    display: flex;
  }

  .sidebar {
    height: calc(100vh - 94px);
  }

  .category {
    width: calc(100% - 5rem);
  }
</style>

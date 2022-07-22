import Vue from 'vue'
import Router from 'vue-router'
import Cart from '@/components/Cart'
import Home from '@/components/Home'
import User from '@/components/User'
import Login from '@/components/Login'
import Detail from '@/components/Detail'
import Search from '@/components/Search'
import ItemCat from '@/components/ItemCat'
import Category from '@/components/Category'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search/:val',
      name: 'Search',
      component: Search
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/item',
      name: 'ItemCat',
      component: ItemCat
    },
  ]
})

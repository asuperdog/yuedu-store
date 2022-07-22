import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import AddItem from '@/components/AddItem'
import ShowItem from '@/components/ShowItem'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/addItem',
      name: 'AddItem',
      component: AddItem
    },
    {
      path: '/showItem',
      name: 'ShowItem',
      component: ShowItem
    }
  ]
})

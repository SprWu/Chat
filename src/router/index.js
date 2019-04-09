import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/login'
import Index from '@/components/ChatRoom/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/index',
      name: 'chat',
      component: Index
    }
  ]
})

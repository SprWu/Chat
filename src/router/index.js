import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/login'
import PCIndex from '@/components/ChatRoom/index'
import MoIndex from '@/components/MobileChat/index'
import {
  isMobile
} from '@/api/judge'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/pc_index',
    name: 'pcindex',
    component: PCIndex
  }, {
    path: '/mo_index',
    name: 'moindex',
    component: MoIndex
  }, { // 错误路由跳转到首页
    path: '*',
    redirect: '/'
  }]
})

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  let isLogin = localStorage.getItem('isLogin');
  if (to.name === 'Login') {
    if (isLogin === 'true') {
      if (isMobile()) {
        router.push({
          name: 'moindex'
        })
      } else {
        router.push({
          name: 'pcindex'
        })
      }
    } else {
      next();
    }
  } else {
    if (isLogin === 'true') {
      next();
    } else {
      router.push({
        name: 'Login'
      })
    }
  }
})
export default router

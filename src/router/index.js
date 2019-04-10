import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/login'
import Index from '@/components/ChatRoom/index'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/index',
      name: 'index',
      component: Index
    },{// 错误路由跳转到首页
      path: '*',
      redirect: '/index'
    }
  ]
})

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  let isLogin = localStorage.getItem('isLogin');
  if(to.name === 'Login'){
    if(isLogin === 'true') {
      router.push({name: 'index'})
    } else {
      next();
    }
  } else {
    if(isLogin === 'true') {
      next();
    } else {
      router.push({name: 'Login'})
    }
  }
})
export default router
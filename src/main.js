// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MuseUI from 'muse-ui'
import Toast from 'muse-ui-toast'
import 'muse-ui/dist/muse-ui.css'
import store from '@/store/index'
import VueSocket from 'vue-socket.io'
import { HOST } from '@/fetch'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MuseUI)
Vue.use(Toast, {
  position: 'top'
})
Vue.use(new VueSocket({
  connection: 'http://'+ HOST +':9000'
}))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

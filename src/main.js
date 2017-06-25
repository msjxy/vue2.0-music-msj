// 兼容 es6 api
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// 解决手机端点击事件延迟
import mobie from 'fastclick'
import VueLazyload from 'vue-lazyload'
import 'common/stylus/index.styl'
// 在这里调用
mobie.attach(document.body)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: require('common/image/default.png'),
  attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})

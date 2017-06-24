// 兼容 es6 api
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// 解决手机端点击事件延迟
import mobie from 'fastclick'
import 'common/stylus/index.styl'
// 在这里调用
mobie.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})

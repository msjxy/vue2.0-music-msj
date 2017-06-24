import Vue from 'vue'
import Router from 'vue-router'
import One from 'components/one/tuijian'
import Two from 'components/two/geshou'
import Three from 'components/three/paihang'
import Four from 'components/four/sousuo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'One',
      component: One
    },
    {
      path: '/One',
      name: 'One',
      component: One
    },
    {
      path: '/Two',
      name: 'Two',
      component: Two
    },
    {
      path: '/Three',
      name: 'Three',
      component: Three
    },
    {
      path: '/Four',
      name: 'Four',
      component: Four
    }
  ]
})

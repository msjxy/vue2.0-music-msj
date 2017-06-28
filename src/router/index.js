import Vue from 'vue'
import Router from 'vue-router'
import One from 'components/one/tuijian'
import Two from 'components/two/geshou'
import Three from 'components/three/paihang'
import Four from 'components/four/sousuo'
import SingerDetall from 'components/singer-detall/singer-detall'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'One',
      component: One
    },
    {
      path: '/one',
      name: 'One',
      component: One
    },
    {
      path: '/two',
      component: Two,
      children: [
        {
          path: ':id',
          component: SingerDetall
        }
      ]

    },
    {
      path: '/three',
      name: 'Three',
      component: Three
    },
    {
      path: '/four',
      name: 'Four',
      component: Four
    }
  ]
})

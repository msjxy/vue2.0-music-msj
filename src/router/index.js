import Vue from 'vue'
import Router from 'vue-router'
import One from 'components/one/tuijian'
import Two from 'components/two/geshou'
import Three from 'components/three/paihang'
import Four from 'components/four/sousuo'
import SingerDetall from 'components/singer-detall/singer-detall'
import Disc from 'components/disc/disc'
import TopoList from 'components/top-list/top-list'
import UserCenter from 'components/user-center/user-center'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: One
    },
    {
      path: '/one',
      component: One,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
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
      component: Three,
      children: [
        {
          path: ':id',
          component: TopoList
        }
      ]
    },
    {
      path: '/four',
      component: Four,
      children: [
        {
          path: ':id',
          component: SingerDetall
        }
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})

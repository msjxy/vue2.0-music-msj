<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singelist" ref="singelist"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {gettwo} from 'api/geshou-data'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import ListView from 'base/gslist/gelist'
  import {mapMutations} from 'vuex'
  import { playlistMixin } from 'common/js/mixin'
  const HOT_NAME = '热门'
  const HOT_NAME_LENGTH = 10

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        singelist: []
      }
    },
    created() {
      this.geshoulist()
    },
    methods: {
      handlePlaying(palylist) {
        const bottom = palylist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.singelist.refresh()
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/two/${singer.id}`
        })
        this.setSinger(singer)
      },
      geshoulist() {
        gettwo().then((res) => {
          if (res.code === ERR_OK) {
            this.singelist = this.singderlist(res.data.list)
          }
        })
      },
      singderlist(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_NAME_LENGTH) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
//        为了得到有序列表 处理map
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>

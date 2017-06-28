<template>
  <transition name="slide">
    <div class="singer-datall">

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import { geshouxingqing } from 'api/geshou-data'
  import { ERR_OK } from 'api/config'
  import { createdata } from 'common/js/song'

  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this.getdeail()
      console.log(this.singer)
    },
    methods: {
      getdeail() {
        if (!this.singer.id) {
          this.$router.push('/two')
        }
        geshouxingqing(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data.list)
            this.songs = this.nomalizesongs(res.data.list)
          }
        })
      },
      nomalizesongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createdata(musicData))
          }
        })
        console.log(1111)
        console.log(ret)
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer-datall
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background red

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

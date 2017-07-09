<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import { mapGetters } from 'vuex'
  import { getMusicList } from 'api/three-data'
  import { ERR_OK } from 'api/config'
  import { createdata } from 'common/js/song'
  export default {
    computed: {
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        if (this.songs.length > 0) {
          console.log(this.songs[0].imge)
          return this.songs[0].imge
        }
        return ''
      },
      ...mapGetters([
        'topList'
      ])
    },
    created() {
      this.getMusicLists()
    },
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    methods: {
      getMusicLists() {
        if (!this.topList.id) {
          this.$router.push('/three')
          return
        }
        getMusicList(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this.songslist(res.songlist)
          }
        })
      },
      songslist(list) {
        let ret = []
        list.forEach((item) => {
          const msuicData = item.data
          if (msuicData.songid && msuicData.albumid) {
            ret.push(createdata(msuicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

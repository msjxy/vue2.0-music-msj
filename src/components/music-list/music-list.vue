<template>
  <div class="music-list">
    <div class="back" @click="back()">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgtyle" ref="bgImage" @click="radnom">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length > 0" class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll  @scroll="scrolls" :probe-type="probeType" :listlety="listlety" :data="songs" class="list"
            ref="list">
      <div class="song-list-wrapper">
        <song-list  :rank="rank" @select="selectItem" :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scrools/scroll'
  import SongList from 'base/song-list/song-list'
  import { perfisle } from 'common/js/dom'
  import { mapActions } from 'vuex'
  import { playlistMixin } from 'common/js/mixin'
  const transfo = perfisle('transform')
  const drakemax = perfisle('backdrop-filter')

  export default {
    mixins: [playlistMixin],
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        dedault: false
      }
    },
    computed: {
      bgtyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    mounted() {
      this.tranlatery = this.$refs.bgImage.clientHeight
      this.mintanslatery = -this.tranlatery
      this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
    },
    created() {
      this.probeType = 3
      this.listlety = true
    },
    data() {
      return {
        scrollY: 0
      }
    },
    methods: {
      handlePlaying(palylist) {
        const bottom = palylist.length > 0 ? '60px' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      scrolls(pos) {
        this.scrollY = pos.y
      },
      back() {
        this.$router.back()
      },
      selectItem(itme, index) {
        this.seletPlay({
          list: this.songs,
          index
        })
      },
      radnom() {
        this.randomPlay({
          list: this.songs
        })
      },
      ...mapActions([
        'seletPlay',
        'randomPlay'
      ])
    },
    watch: {
      scrollY(newY) {
        let translateryaY = Math.max(this.mintanslatery, newY)
        let zindex = 0
        let scale = 1
        let blur = 0
        this.$refs.layer.style[transfo] = `translate3d(0, ${translateryaY}px, 0)`
        const percent = Math.abs(newY / this.tranlatery)
        if (newY > 0) {
          console.log(this.tranlatery)
          zindex = 10
          scale = 1 + percent
        } else {
          blur = Math.min(20 * percent, 20)
        }
        this.$refs.filter.style[drakemax] = `blur(${blur})`
        if (newY < (this.mintanslatery + 40)) {
          zindex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = '40px'
          this.$refs.playBtn.style.display = 'none '
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
        }
        this.$refs.bgImage.style.zIndex = zindex
        this.$refs.bgImage.style[transfo] = `scale(${scale})`
      }
    },
    components: {
      Scroll,
      SongList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

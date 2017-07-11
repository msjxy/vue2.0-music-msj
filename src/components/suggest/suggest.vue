<template>
  <Scroll class="suggest" :data="result" ref="suggest" :pullup="pullup"
          @scrollToEnd="searchMore"
  >
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCla(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="gtedisName(item)"></p>
        </div>
      </li>
      <li>
        <loading v-show="hasMore" title="正在加载"></loading>
      </li>
    </ul>
  </Scroll>
</template>

<script type="text/ecmascript-6">
  import { searcha } from 'api/sercah'
  import { ERR_OK } from 'api/config'
  import { createdata } from 'common/js/song'
  import Scroll from 'base/scrools/scroll'
  import Loading from 'base/loading/loading'

  const TYPE_SINGER = 'singer'
  const perpage = 20
  export default {
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        page: 1,
        result: [],
        pullup: true,
        hasMore: true
      }
    },
    methods: {
      searchss() {
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        searcha(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.genResa(res.data)
            this.checkMore(res.data)
            console.log(this.result)
          }
        })
      },
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        searcha(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this.genResa(res.data))
            this.checkMore(res.data)
            console.log(this.result)
          }
        })
      },
      checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * 20) > song.totalnum) {
          this.hasMore = false
        }
      },
      genResa(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({
            ...data.zhida,
            ...{type: TYPE_SINGER}
          })
        }
        if (data.song) {
          ret = ret.concat(this.normalsong(data.song.list))
        }
        return ret
      },
      getIconCla(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      gtedisName(item) {
        if (item.type === TYPE_SINGER) {
          return item.albumname
        } else {
          console.log(item)
          return `${item.name}-${item.singer}`
        }
      },
      normalsong(list) {
        let ret = []
        list.forEach((musicdata) => {
          if (musicdata.songid && musicdata.albumid) {
            ret.push(createdata(musicdata))
          }
        })
        return ret
      }
    },
    watch: {
      query() {
        this.searchss()
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

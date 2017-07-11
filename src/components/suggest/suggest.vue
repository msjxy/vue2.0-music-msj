<template>
  <Scroll class="suggest" :data="result" ref="suggest" :pullup="pullup"
          :beforeScsroll="beforeScsroll"
          @scrollToEnd="searchMore"
          @beforeScsroll="listScroll"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
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
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
        <no-result title="抱歉, 暂无搜索结果"></no-result>
    </div>
  </Scroll>
</template>

<script type="text/ecmascript-6">
  import { searcha } from 'api/sercah'
  import { ERR_OK } from 'api/config'
  import { createdata } from 'common/js/song'
  import Scroll from 'base/scrools/scroll'
  import Loading from 'base/loading/loading'
  import Singer from 'common/js/singer'
  import { mapMutations, mapActions } from 'vuex'
  import NoResult from 'base/no-result/no-result'
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
        beforeScsroll: true,
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
      listScroll() {
        this.$emit('listScroll')
      },
      checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * 20) > song.totalnum) {
          this.hasMore = false
        }
      },
      genResa(data) {
        let ret = []
        if (data.zhida && data.zhida.singername) {
          ret.push({
            ...data.zhida,
            ...{type: TYPE_SINGER}
          })
        }
        console.log(3333)
        if (data.song) {
          ret = ret.concat(this.normalsong(data.song.list))
        }
        console.log(ret[0])
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
          return item.singername
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
      },
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/four/${singer.id}`
          })
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query() {
        this.searchss()
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
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

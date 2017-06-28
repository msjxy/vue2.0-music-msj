<template>
  <scroll  ref="listview"
           class="listview"
           :listlety="listlety"
           @scroll="scroll"
           :probeType="probeType"
           :data="data">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="ontouchs" @touchmove.stop.prevent="touchmovea">
      <ul>
        <li v-for="(item, index) in letlistone" class="item" v-text="item"  :data-index="index"
            :class="{'current':currenindex===index}"
        ></li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedtitle" ref="msj">
      <h1 class="fixed-title">{{fixedtitle}}</h1>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scrools/scroll'
  import {tchoucsa} from 'common/js/dom'
  const hlis = 18
  const titleabs = 30
  export default {
    created() {
      this.touchl = {}
      this.listlety = true
      this.listheight = []
      this.probeType = 3
    },
    data() {
      return {
        scrollY: -1,
        currenindex: 0,
        diff: -1
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      letlistone() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedtitle() {
        return this.data[this.currenindex] ? this.data[this.currenindex].title : ''
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      ontouchs(e) {
        let achorindex = tchoucsa(e.target, 'index')
        let firsttouch = e.touches[0]
        this.touchl.y1 = firsttouch.pageY
        this.touchl.achorindex = achorindex
        this.moveapple(achorindex)
      },
      touchmovea(e) {
        let firsttouch = e.touches[0]
        this.touchl.y2 = firsttouch.pageY
        let data = this.touchl.y2 - this.touchl.y1
        let datalenght = data / hlis | 0
        let achorindex = parseInt(this.touchl.achorindex) + datalenght
        this.moveapple(achorindex)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      moveapple(index) {
        if (!index && index !== 0) {
          return
        }
        console.log(1)
        if (index < 0) {
          index = 0
        } else if (index > this.listheight.length - 2) {
          index = this.listheight.length - 2
        }
        this.scrollY = -this.listheight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      cauteHeight() {
        this.listheight = []
        const alllisth = this.$refs.listGroup
        let heights = 0
        this.listheight.push(heights)
        for (let i = 0; i < alllisth.length; i++) {
          let item = alllisth[i]
          heights += item.clientHeight
          this.listheight.push(heights)
        }
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.cauteHeight()
        }, 20)
      },
      scrollY(newY) {
        const listheights = this.listheight
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        for (let i = 0; i < listheights.length; i++) {
          let h1 = listheights[i]
          let h2 = listheights[i + 1]
          if ((-newY >= h1 && -newY < h2)) {
            this.currenindex = i
            this.diff = h2 + newY
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listheights.length - 2
      },
      bss() {
        console.log('为啥这里不行')
      },
      diff(newval) {
        let fixeTop = (newval > 0 && newval < titleabs) ? newval - titleabs : 0
        if (this.fixeTop === fixeTop) {
          return
        }
        this.fixeTop = fixeTop
        this.$refs.msj.style.transform = `translate3d(0,${fixeTop}px,0)`
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

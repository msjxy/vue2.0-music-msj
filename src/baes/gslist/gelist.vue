<template>
  <scroll  ref="listview" class="listview" :data="data">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="ontouchs" @touchmove.stop.prevent="touchmovea">
      <ul>
        <li v-for="(item, index) in letlistone" class="item" v-text="item"  :data-index="index"></li>
      </ul>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scrools/scroll'
  import {tchoucsa} from 'common/js/dom'
  const hlis = 18
  export default {
    created() {
      this.touchl = {}
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
      }
    },
    methods: {
      ontouchs(e) {
        let achorindex = tchoucsa(e.target, 'index')
        let firsttouch = e.touches[0]
        this.touchl.y1 = firsttouch.pageY
        this.touchl.achorindex = achorindex
        this.moveapple(achorindex)
      },
      touchmovea(e) {
        console.log(this.touchl.y1 + '第一次滑动的位置')
        let firsttouch = e.touches[0]
        this.touchl.y2 = firsttouch.pageY
        console.log(this.touchl.y2)
        let data = this.touchl.y2 - this.touchl.y1
        console.log(data + 3)
        let datalenght = data / hlis | 0
        console.log(datalenght)
        let achorindex = parseInt(this.touchl.achorindex) + datalenght
        this.moveapple(achorindex)
      },
      moveapple(index) {
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
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

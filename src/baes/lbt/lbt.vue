<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot"  v-for="(item, index) in dots" :class="{active: lbtindex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'
  export default {
    data() {
      return {
        dots: [],
        lbtindex: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 2000
      }
    },
    mounted() {
      setTimeout(() => {
        this.setsluderWudth()
        this.indextodsa()
        this.initsliders()
        if (this.autoPlay) {
          this.plays()
        }
      }, 20)
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this.setsluderWudth(true)
      })
    },
    methods: {
      setsluderWudth(isResize) {
        this.chained = this.$refs.sliderGroup.children
        console.log(this.chained.length)
        let width = 0
        let sliderwidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.chained.length; i++) {
          let child = this.chained[i]
          addClass(child, 'slider-item')
          console.log(width)
          child.style.width = sliderwidth + 'px'
          width += sliderwidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderwidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      initsliders() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400,
          click: true
        })
        this.slider.on('scrollEnd', () => {
          let pageindex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageindex -= 1
          }
          this.lbtindex = pageindex
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this.plays()
          }
        })
      },
      indextodsa() {
        this.dots = new Array(this.chained.length)
      },
      plays() {
        let pageIndex = this.lbtindex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    destroyed() {
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    position: relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
  .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>

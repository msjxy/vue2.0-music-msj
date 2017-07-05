<template>
  <div class="progress-bar" ref="progressBar" @click="progerssclick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="proqressStart"
           @touchmove.prevent="proqressMove"
           @touchend.prevent="proqressEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { perfisle } from 'common/js/dom'
  const transform = perfisle('transform')
  const progerssWidth = 16
  export default {
    props: {
      percent: {
        typen: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      proqressStart(e) {
        this.touch.initated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
        console.log(this.touch.left)
      },
      proqressMove(e) {
        if (!this.touch.initated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        console.log(deltaX)
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progerssWidth, Math.max(0, this.touch.left + deltaX))
        console.log(offsetWidth)
        this.offsetsa(offsetWidth)
      },
      proqressEnd(e) {
        this.touch.initated = false
        this.tringgerPercent()
      },
      offsetsa(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
      },
      tringgerPercent() {
        const barWinth = this.$refs.progressBar.clientWidth - progerssWidth
        const perncent = this.$refs.progress.clientWidth / barWinth
        this.$emit('msjper', perncent)
      },
      progerssclick(e) {
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWinth = e.pageX - rect.left
        this.offsetsa(offsetWinth)
//        这里我们点击时获取e.offsetX不对
//        this.offsetsa(e.offsetX)
        this.tringgerPercent()
      }
    },
    watch: {
      percent(newpercent) {
        if (newpercent >= 0 && !this.touch.initated) {
          const barWinth = this.$refs.progressBar.clientWidth - progerssWidth
          const offsetWidth = newpercent * barWinth
          this.offsetsa(offsetWidth)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>

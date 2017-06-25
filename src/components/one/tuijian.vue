<template>
  <div class="recommend" >
    <scroll ref="scroll" class="recommend-content" :data="listder">
    <div>
    <div v-if="lbtsdata.length" class="slider-wrapper">
      <lbts>
        <div v-for="item in lbtsdata">
          <a :href="item.linkUrl">
            <img @load="loadimg" class="needsclick"  :src="item.picUrl">
          </a>
        </div>
      </lbts>
    </div>
    <div class="recommend-list">
      <h1 class="list-title">热门歌单推荐</h1>
      <ul>
        <li  class="item" v-for="item in listder">
          <div class="icon">
            <img width="60" height="60" v-lazy="item.imgurl">
          </div>
          <div class="text">
            <h2 class="name"  v-html="item.creator.name"></h2>
            <p class="desc" v-html="item.dissname"></p>
          </div>
        </li>
      </ul>
    </div>
   </div>
    <div class="loading-container" v-show="!listder.length">
      <Lading></Lading>
    </div>
    </scroll>
  </div>

</template>

<script type="text/ecmascript-6">
  import Lading from 'base/loading/loading'
  import Scroll from 'base/scrools/scroll'
  import Lbts from 'base/lbt/lbt'
  import {getRecommend, getLitsfe} from 'api/tuijian-data'
  import {ERR_OK} from 'api/config'
  export default {
    data() {
      return {
        lbtsdata: [],
        listder: []
      }
    },
    created() {
      setTimeout(() => {
        this.agetRecommend()
      }, 1000)
      this.getLitsfeas()
    },
    methods: {
      agetRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.lbtsdata = res.data.slider
          }
        })
      },
      getLitsfeas() {
        getLitsfe().then((res) => {
          if (res.code === ERR_OK) {
            this.listder = res.data.list
          }
        })
      },
      loadimg() {
        if (!this.checkload) {
          this.$refs.scroll.refresh()
          this.checkload = true
        }
      }
    },
    components: {
      Lbts,
      Scroll,
      Lading
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .list-title
    height: 65px
    line-height: 65px
    text-align: center
    font-size: $font-size-medium
    color: $color-theme
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
  .slider-wrapper
    position: relative
    width: 100%
    overflow: hidden
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
  .recommend-list
    .item
      display: flex
      box-sizing: border-box
      align-items: center
      padding: 0 20px 20px 20px
      .icon
        flex: 0 0 60px
        width: 60px
        padding-right: 20px
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        font-size: $font-size-medium
      .desc
        color: $color-theme
      .name
        margin-bottom: 10px
        color: $color-text
</style>

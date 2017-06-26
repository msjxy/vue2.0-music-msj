<template>
  <div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {gettwo} from 'api/geshou-data'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  const HOT_NAME = '热门'
  const HOT_NAME_LENGTH = 10
  export default {
    data() {
      return {
        singelist: []
      }
    },
    created() {
      this.geshoulist()
    },
    methods: {
      geshoulist() {
        gettwo().then((res) => {
          if (res.code === ERR_OK) {
            this.singelist = res.data.list
          }
          console.log(this.singderlist(this.singelist))
        })
      },
      singderlist(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_NAME_LENGTH) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        console.log(map)
//        为了得到有序列表 处理map
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        console.log(ret)
        return hot.concat(ret)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>

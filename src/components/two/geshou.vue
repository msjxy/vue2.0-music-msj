<template>
  <div>
    ss
  </div>
</template>
<script type="text/ecmascript-6">
  import {gettwo} from 'api/geshou-data'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  const HOT_NAME = '热门'
  const NOT_NAME_LENGTH = 10
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
            alert(1)
            this.singelist = res.data.list
            console.log(singerdata(this.singelist))
          }
        })
      },
      singerdata(list){
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((itmes, index) => {
          if (index < NOT_NAME_LENGTH) {
            map.hot.items.push(
              new Singer({
                id: itmes.Fsinger_mid,
                name: itmes.Fsinger_name
              })
            )
          }
          const key =itmes.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(
            new Singer({
              id: itmes.Fsinger_mid,
              name: itmes.Fsinger_name
            })
          )
        })
        consloe.log(map)
      }

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>

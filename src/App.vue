<template>
  <div id="app">
   <hader></hader>
    <msja> </msja>
    <keep-alive>
     <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
// 创建心模块
  import Hader from 'components/m-hder/hader'
  import Msja from 'components/msj/msj'
//  import Dooter from 'components/foodter/dibu'
// 注册模
  export default {
    components: {
      Hader,
      Msja
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>

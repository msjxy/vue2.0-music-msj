<template>
  <div id="app">
   <hader></hader>
    <msja> </msja>
    <router-view></router-view>
    <dooter></dooter>
  </div>
</template>

<script type="text/ecmascript-6">
// 创建心模块
  import Hader from 'components/m-hder/hader'
  import Msja from 'components/msj/msj'
  import Dooter from 'components/foodter/dibu'
  export default {
    components: {
      Hader,
      Msja,
      Dooter
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>

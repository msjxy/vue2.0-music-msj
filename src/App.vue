<template>
  <div id="app">
   <hader></hader>
    <msja> </msja>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Hader from 'components/m-hder/hader'
  import Msja from 'components/msj/msj'
  export default {
    components: {
      Hader,
      Msja
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>

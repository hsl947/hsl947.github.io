<template>
  <div id="app">
    <router-view></router-view>
    <TabBar></TabBar>
  </div>
</template>

<script>
    import '../static/js/wap_auto.js';
    import TabBar from './components/common/TabBar'
    export default {
        components: {
            TabBar
        },
        name: 'app'
    }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import '../static/css/iconfont.css';
    body {
        background-color: #fbf9fe;
    }
    
    #app {
        padding-bottom: .8rem;
    }
</style>
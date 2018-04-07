<template>
    <div>
        <swiper :list="banner_list" auto style="width:100%;margin:0 auto;" height="3rem" dots-class="custom-bottom" dots-position="center"></swiper>
    </div>
</template>
<script>
    import {
        Swiper
    } from 'vux'
    export default {
        components: {
            Swiper
        },
        data() {
            return {
                banner_list: []
            }
        },
        mounted() {
            this.banner_list = [{
                img: "static/images/index/banner1.jpg",
                url: 'http://www.baidu.com'
            }, {
                img: "static/images/index/banner2.jpg",
                url: 'http://www.sina.com'
            }, {
                img: "static/images/index/banner3.jpg",
                url: 'http://www.163.com'
            }]
        }
    }
</script>
<style lang="less">

</style>
<template>
    <div>
        <x-header>
            <i slot="overwrite-left" class="iconfont">&#xe60d;</i>
            <span>我要投资</span>
        </x-header>
    </div>
</template>
<script>
    import {
        XHeader
    } from 'vux'
    export default {
        components: {
            XHeader,
        },
        data() {
            return {

            }
        }
    }
</script>
<style lang="less" scoped>
    .iconfont {
        font-size: 0.4rem;
        color: #fff;
    }
    
    .vux-header {
        position: relative;
        padding: 0.03rem 0;
        box-sizing: border-box;
        background-color: #008def;
    }
</style>
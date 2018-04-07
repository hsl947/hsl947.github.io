<template>
    <div>
        <Headers></Headers>
        <tab>
            <tab-item selected>投资列表</tab-item>
            <tab-item>债权列表</tab-item>
        </tab>
    </div>
</template>
<script>
    import Headers from '../loan/Header'
    import {
        Tab,
        TabItem,
        Loading,
    } from 'vux'
    export default {
        data() {
            return {

            }
        },
        components: {
            Headers,
            Tab,
            TabItem,
            Loading,
        },
        mounted() {

        },
        methods: {

        }
    }
</script>
<style lang="less" scoped>
    div {
        text-align: center;
    }
</style>
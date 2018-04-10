<template>
    <div>
        <Headers></Headers>
        <tab>
            <tab-item selected>投资列表</tab-item>
            <tab-item>债权列表</tab-item>
        </tab>
        <a class="loan-item" href="#">
            <card>
            <div slot="content" class="">
                <div class="top">
                    <img src="../../assets/loan/1.gif" alt="">
                    <span class="tit">信用标1</span>
                </div>
                <div class="center">
                    <div class="vux-1px-r">
                        <span>5.00%</span>
                        <br/>
                        <span>预期年化收益</span>
                        </div>
                        <div class="vux-1px-r">
                        <span>1000元</span>
                        <br/>
                        <span>借款金额</span>
                        </div>
                        <div>
                        <span>1个月</span>
                        <br/>
                        <span>借款期限</span>
                    </div>
                </div>
            </div>
        </card>
            
        </a>
        
    </div>
</template>
<script>
    import '../../../static/js/wap_auto.js';
    import Headers from '../loan/Header'
    import {
        Tab,
        TabItem,
        Loading,
        Card
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
            Card
        },
        mounted() {

        },
        methods: {

        }
    }
</script>
<style lang="less" scoped>
    @import '~vux/src/styles/1px.less';
    .loan-item {
        display: block;
        margin: 5px;
    }
    
    .top {
        img {
            width: 24px;
            vertical-align: middle;
        }
        .tit {
            font-size: .28rem;
            color: #333;
        }
    }
    
    .center {
        display: flex;
    }
</style>
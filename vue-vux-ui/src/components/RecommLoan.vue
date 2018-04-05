<template>
    <a class="newloan-box">
        <card>
            <div slot="content" class="card-demo-flex card-demo-content01">
                <div class="">
                    <h1>测试部-推广送现金</h1>
                </div>
            </div>
            <div slot="content" class="card-demo-flex card-demo-content01 vux-1px-t">
                <div class="">
                    <x-button mini>本金保障</x-button>
                </div>
                <div class="">
                    <x-button type="primary" plain  mini>稳定增值</x-button>
                </div>
                <div class="">
                    <x-button type="primary" plain  mini class="custom-primary-red" >灵活投资</x-button>
                </div>
            </div>
            <div slot="content" class="card-demo-flex card-demo-content01">
                <div class="">
                    <span class="red-tit">10.00%</span><br>
                    <span>预期年化收益</span>
                </div>
            </div>
        </card>
        <x-button type="primary" class="loan-btn">开始赚钱</x-button>
    </a>
</template>
<script>
    import {
        Divider,
        Card,
        XButton
    } from 'vux'
    export default {
        components: {
            Divider,
            Card,
            XButton
        },
        data() {
            return {

            }
        },
        mounted() {

        }
    }
</script>
<style lang="less" scoped>
    @import '~vux/src/styles/1px.less';
    .card-demo-flex {
        display: flex;
    }
    
    .card-demo-content01 {
        padding: .1rem 0;
    }
    
    .card-padding {
        padding: .15rem;
    }
    
    .card-demo-flex>div {
        flex: 1;
        text-align: center;
        font-size: .12rem;
        color: #999;
    }
    
    .card-demo-flex .text {
        font-size: .16rem;
        color: #333;
    }
    
    .newloan-box {
        display: block;
        padding-top: .2rem;
    }
    
    .custom-primary-red {
        background-color: transparent;
        border-color: #CE3C39!important;
        color: #CE3C39!important;
        &:active {
            border-color: rgba(206, 60, 57, 0.6)!important;
            color: rgba(206, 60, 57, 0.6)!important;
            background-color: transparent;
        }
    }
    
    .red-tit {
        color: #fd6361;
        font-size: .5rem;
    }
    
    .loan-btn {
        width: 90%;
        margin: 0.2rem auto;
    }
</style>
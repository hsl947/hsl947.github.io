<template>
    <div>
        <h2>系统设置</h2>
        <group>
            <cell title="网站公告" value="" is-link>
                <i slot="icon" class="icon icon-vers"></i>
            </cell>
            <cell title="常见问题" value="" is-link>
                <i slot="icon" class="icon icon-ques"></i>
            </cell>
            <cell title="" value="" is-link>
                <span slot="title" @click="showContact = true">联系客服</span>
                <span @click="showContact = true" style="display: block;width: 10%;">&#x3000;&#x3000;</span>
                <i slot="icon" class="icon icon-cust" @click="showContact = true"></i>
            </cell>
        </group>
        <x-button type="primary" class="button">登录</x-button>
        <actionsheet v-model="showContact" :menus="menus1" :close-on-clicking-mask="true" show-cancel></actionsheet>
    </div>
</template>
<script>
    import {
        Group,
        Cell,
        CellBox,
        XButton,
        TransferDom,
        Popup,
        Actionsheet
    } from 'vux'
    export default {
        directives: {
            TransferDom
        },
        components: {
            Group,
            Cell,
            CellBox,
            XButton,
            Popup,
            Actionsheet
        },
        data() {
            return {
                showContact: false,
                menus1: [{
                    label: '客服热线<br>（工作日6:00-15:00）'
                }, {
                    label: '<a class="tel" href="tel: 400-810-1112">400-810-1112</a>'
                }]
            }
        }
    }
</script>
<style lang="less" scoped>
    h2 {
        text-align: center;
    }
    
    .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: top;
        background: url('../assets/icon-settings.jpg') no-repeat;
        background-size: 100% auto;
        margin: 0.03rem 0.08rem 0 0;
    }
    
    .icon-vers {
        background-position: 0px -67px;
    }
    
    .icon-ques {
        background-position: 0px -22px;
    }
    
    .icon-cust {
        background-position: 0px -45px;
    }
    
    .button {
        width: 90%;
        margin-top: 0.2rem;
    }
</style>
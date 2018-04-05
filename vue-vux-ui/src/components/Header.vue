<template>
    <div>
        <x-header>
            <i slot="overwrite-left"></i>
            <span>首页</span>
            <i slot="right" @click="showDialog = true" class="iconfont">&#xe61f;</i>
        </x-header>
        <div v-transfer-dom>
            <popup v-model="showDialog" position="left" width="70%">
                <div class="position-horizontal-demo">
                    <LeftDialog></LeftDialog>
                </div>
            </popup>
        </div>
    </div>
</template>
<script>
    import {
        XHeader,
        TransferDom,
        Popup
    } from 'vux'
    import LeftDialog from '../components/LeftDialog'
    export default {
        directives: {
            TransferDom
        },
        components: {
            XHeader,
            Popup,
            LeftDialog
        },
        data() {
            return {
                showDialog: false
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
    
    .vux-popup-dialog {
        background: #fff;
        padding-top: 0.2rem;
    }
</style>
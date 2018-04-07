<template>
    <Tabbar class="tabbar">
        <TabbarItem link="/" selected>
             <i slot="icon" class="iconfont">&#xe600;</i>
             <span slot="label">首页</span>
        </TabbarItem>
        <TabbarItem link="/loanList" show-dot>
            <i slot="icon" class="iconfont">&#xe636;</i>
            <span slot="label">我要投资</span>
        </TabbarItem>
        <TabbarItem link="/memberCenter" badge="2">
            <i slot="icon" class="iconfont">&#xe603;</i>
            <span slot="label">个人中心</span>
        </TabbarItem>
    </Tabbar>
</template>

<script>
    import {
        Tabbar,
        TabbarItem,
        Icon
    } from 'vux'
    export default {
        components: {
            Tabbar,
            TabbarItem,
            Icon
        }
    }
</script>

<style lang="less">
    .weui-tabbar__label {
        margin-top: .05rem;
    }
    
    .tabbar {
        position: fixed!important;
    }
</style>
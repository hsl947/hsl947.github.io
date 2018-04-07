import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/index/Home'
import Loan from '@/components/loan/Loan'
import MemberCenter from '@/components/member/MemberCenter'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/loanList',
            name: 'Loan',
            component: Loan
        },
        {
            path: '/memberCenter',
            name: 'MemberCenter',
            component: MemberCenter
        }
    ]
})
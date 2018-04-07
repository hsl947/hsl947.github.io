<template>
    <div style="padding-bottom: .5rem;">
        <Headers></Headers>
        <Banner></Banner>
        <NewLoan></NewLoan>
        <RecommLoan></RecommLoan>
    </div>
</template>
<script>
    import Banner from '../index/Banner'
    import Headers from '../index/Header'
    import NewLoan from '../index/NewLoan'
    import RecommLoan from '../index/RecommLoan'
    export default {
        components: {
            Banner,
            Headers,
            NewLoan,
            RecommLoan
        },
        data() {
            return {

            }
        },
        mounted() {

        }
    }
</script>
<style lang="less">

</style>
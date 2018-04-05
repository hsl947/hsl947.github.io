<template>
    <div>
        <Headers></Headers>
        <Banner></Banner>
        <NewLoan></NewLoan>
        <RecommLoan></RecommLoan>
    </div>
</template>
<script>
    import Banner from '../components/Banner'
    import Headers from '../components/Header'
    import NewLoan from '../components/NewLoan'
    import RecommLoan from '../components/RecommLoan'
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
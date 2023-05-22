<template>
    <div>
        <FrontHeader/>
        <TopImages/>
        <el-main>
            <router-view/>
        </el-main>
        <Footer/>
    </div>
</template>

<script>
    import Footer from "@/components/Footer";
    import FrontHeader from "@/components/FrontHeader";
    import TopImages from "@/components/TopImages";
    export default {
        name: "Front",
        components:{
            Footer,
            FrontHeader,
            TopImages
        }
    }
</script>

<style scoped>


</style>
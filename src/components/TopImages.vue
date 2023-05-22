<template>
    <div>
        <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in dataList" :key="item.id">
                <h3><img :src="item.src"  style="width:2000px;height:360px" /></h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "TopImages",
        data() {
            return {
                dataList: [
                    { id: 1, src: require("../assets/image/01.jpg") },
                    { id: 2, src: require("../assets/image/02.jpg") },
                    { id: 3, src: require("../assets/image/03.jpg") },
                    { id: 4, src: require("../assets/image/04.jpg") },
                    { id: 5, src: require("../assets/image/05.jpg") },
                    { id: 6, src: require("../assets/image/06.jpg") },
                ],
            }
        },
    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: rgb(192, 192, 130);
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
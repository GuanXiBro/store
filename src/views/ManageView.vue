<template>
    <div style="height: 100%">
        <el-container style="height: 100%;">
            <el-aside :width="sideWidth + 'px'"
                      style="background-color: rgb(255, 255, 255); height: 100%; overflow-x: hidden">
                <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow"/>
            </el-aside>

            <el-container>
                <el-header style="border-bottom: 1px solid #ccc;">
                    <Header :collapseBtnClass="collapseBtnClass" @asideCollapse="collapse" :user="user"/>
                </el-header>



                <el-main>
                    <router-view  @refreshUser="getUser"/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style>
    .el-header {
        background-color: white;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>

    import Aside from "@/components/Aside";
    import Header from "@/components/Header";

    export default {
        name:"Home",
        data() {
            return {
                collapseBtnClass: 'el-icon-s-fold',
                isCollapse: false,
                sideWidth: 200,
                logoTextShow: true,
                user: {}
            }
        },
        components: {
            Aside,
            Header,
        },
        created() {
            this.getUser()
        },
        methods: {
            collapse() {
                this.isCollapse = !this.isCollapse
                if (this.isCollapse) {
                    this.sideWidth = 64
                    this.collapseBtnClass = 'el-icon-s-unfold'
                    this.logoTextShow = false
                } else {
                    this.sideWidth = 200
                    this.collapseBtnClass = 'el-icon-s-fold'
                    this.logoTextShow = true
                }
            },
            getUser() {
                let account = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).account : ""
                if (account) {
                    // 从后台获取User数据
                    this.request.get("http://localhost:9090/student/account/" + account).then(res => {
                        // 重新赋值后台的最新User数据
                        this.user = res.data
                    })
                }
            }
        }
    };
</script>

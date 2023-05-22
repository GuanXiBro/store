<template>
    <div style="line-height: 60px; display: flex">
        <div style="flex: 1;">
            <span :class="collapseBtnClass" style="cursor: pointer; font-size: 16px;" @click="collapse"></span>
            <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
                <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{currentPathName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-dropdown style="width:100px; cursor: pointer">
            <div style="display: inline-block">
                <span>{{user.account}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            </div>
            <el-dropdown-menu slot="dropdown" style="width:100px; text-align: center">
                <el-dropdown-item style="font-size:14px; padding: 5px 0">
                    <router-link to="/person" style="text-decoration: none">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item style="font-size:14px; padding: 5px 0">
                    <router-link to="/password" style="text-decoration: none">修改密码</router-link>
                </el-dropdown-item>
                <el-dropdown-item style="font-size:14px; padding: 5px 0">
                    <span to="/login" style="text-decoration: none" @click="logout">退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: {
            collapseBtnClass: String,
            collapse: {
                type: Function,
                default: () => {
                    return Function
                }
            },
        },
        computed:{
          currentPathName(){
              return this.$store.state.currentPathName;
          }
        },
        data(){
            return{
                user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
            }
        },
        watch:{
            currentPathName(newVal,oldVal){
                console.log(newVal)
            }
        },
        methods:{
            logout(){
                this.$store.commit("logout")
                this.$message.success("退出成功")
            }
        }
    }
</script>

<style scoped>

</style>
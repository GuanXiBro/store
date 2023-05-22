<template>
    <el-menu :default-openeds="['1', '3']" style="height: 100%; overflow-x: hidden"
             background-color="rgb(20, 25, 30)"
             text-color="#fff"
             active-text-color="#ffd04b"
             :collapse-transition="false"
             :collapse="isCollapse"
             router
             @select="handleSelect">
        <div style="height:60px;line-height: 60px;text-align: center">
            <img src="../assets/image/ai1.jpg" alt=""
                 style="width: 20px; position: relative; top: 5px; margin-right: 5px">
            <b style="color: white" v-show="logoTextShow">后台管理</b>
        </div>
        <div v-for="item in menus" :key="item.id">
            <div v-if="item.url">
                <el-menu-item :index="item.url">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{item.name}}</span>
                    </template>
                </el-menu-item>
            </div>
            <div v-else="">
                <el-submenu :index="item.id + '' ">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">{{item.name}}</span>
                    </template>
                    <div v-for="subItem in item.children" :key="subItem.id">
                        <el-menu-item :index="subItem.url">
                            <template slot="title">
                                <i class="el-icon-icon">{{subItem.name}}</i>
                            </template>
                        </el-menu-item>
                    </div>
                 </el-submenu>
            </div>
        </div>

<!--        <el-submenu index="1">-->
<!--            <template slot="title">-->
<!--                <i class="el-icon-menu"></i>-->
<!--                <span slot="title">系统管理</span>-->
<!--            </template>-->
<!--            <template slot="title"></template>-->
<!--            <el-menu-item index="role">角色管理</el-menu-item>-->
<!--            <el-menu-item index="student">学生用户管理</el-menu-item>-->
<!--            <el-menu-item index="admin">管理员用户管理</el-menu-item>-->
<!--            <el-menu-item index="company">企业用户管理</el-menu-item>-->
<!--            <el-menu-item index="expert">专家用户管理</el-menu-item>-->
<!--            <el-menu-item index="menu">菜单管理</el-menu-item>-->
<!--        </el-submenu>-->
<!--        <el-submenu index="2">-->
<!--            <template slot="title">-->
<!--                <i class="el-icon-setting"></i>-->
<!--                <span slot="title">竞赛管理</span>-->
<!--            </template>-->
<!--            <template slot="title"></template>-->
<!--            <el-menu-item index="competition">项目管理</el-menu-item>-->
<!--            <el-menu-item index="2-2">订单管理</el-menu-item>-->
<!--            <el-menu-item index="2-3">获奖名单管理</el-menu-item>-->
<!--        </el-submenu>-->
    </el-menu>
</template>

<script>
    export default {
        name: "Aside.vue",
        props: {
            isCollapse: Boolean,
            logoTextShow: Boolean
        },
        methods: {
            handleSelect() {
                console.log(this.$route)
            }
        },
        data(){
            return{
                menus:localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")) : [],
                opens: localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")).map(v => v.id + '') : []
            }
        }
    }
</script>

<style scoped>
    .el-menu-item.is-active {
        background-color: rgb(38, 52, 69) !important;
    }
    .el-menu-item:hover {
        background-color: rgb(38, 52, 69) !important;
    }

    .el-submenu__title:hover {
        background-color: rgb(38, 52, 69) !important;
    }
    /*解决收缩菜单文字不消失问题*/
    .el-menu--collapse span {
        visibility: hidden;
    }
</style>
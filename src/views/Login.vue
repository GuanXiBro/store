<template>
    <el-container class="login-container">
        <el-form
                :model="user"
                status-icon
                :rules="rules"
                ref="form"
                label-width="100px"
                margin="0 auto"
                class="login-form">
            <div class="LoginMes">AI竞赛管理平台</div>

            <el-form-item label="账户" size="20px" prop="account">
                <el-input v-model="user.account"
                          placeholder="请输入账号"
                          prefix-icon="el-icon-user"
                          maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="密码" size="20px" prop="password">
                <el-input v-model="user.password"
                          type="password"
                          placeholder="请输入密码"
                          show-password
                          prefix-icon="el-icon-lock"
                          autocomplete="off"
                          maxlength="16"></el-input>
            </el-form-item>

<!--            <el-form-item label="身份" prop="roleID">-->
<!--                <div style="text-align: center">-->
<!--                    <el-radio v-model="user.role" label="0">管理员</el-radio>-->
<!--                    <el-radio v-model="user.role" label="1">学生</el-radio>-->
<!--                    <el-radio v-model="user.role" label="2">企业</el-radio>-->
<!--                    <el-radio v-model="user.role" label="3">专家</el-radio>-->
<!--                </div>-->
<!--            </el-form-item>-->

            <el-form-item style="text-align: center">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button  @click="register">注册</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>
<script>
    import {setRoutes} from "@/router";

    export default {
        name: "Login",
        data() {
            return {
                user: {
                    account: '',
                    password: '',
                    delivery: false,
                    type: [],
                },
                rules: {
                    account: [{required: true, message: "请输入账号", trigger: "blur"},
                        {
                            validator: (rule, value, callback) => {
                                const reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/  //正则表达式 只能输入英文、汉字与数字
                                if (!reg.test(value)) {
                                    callback(new Error('请勿输入特殊字符'))
                                } else {
                                    callback()
                                }
                            }
                        }
                    ],
                    password: [{required: true, message: "请输入密码", trigger: "blur"},
                        {min: 6, max: 16, message: '长度在 6 到 16个字符', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            login() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {//表单校验合法
                            this.request.post("http://localhost:9090/student/login", this.user).then(res => {
                                if (res.code === '200') {
                                    localStorage.setItem("user",JSON.stringify(res.data))//存储用户信息到浏览器
                                    localStorage.setItem("menus",JSON.stringify(res.data.menus))//存储用户信息到浏览器
                                    //动态设置当前用户的路由
                                    setRoutes()
                                    this.$message.success("登陆成功")
                                    if (res.data.menurole === 'ROLE_STUDENT'){
                                        this.$router.push("/front/home")
                                    }else {
                                        this.$router.push("/")
                                    }
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                    }
                });
            },
            register () {
                //指定跳转的地址
                this.$router.replace('/Register')
            }
        }
    }
</script>

<style scoped>
    .LoginMes {
        text-align: center;
        color: #000005;
        font-family: 幼圆;
        font-size: 30px;
        margin-bottom: 20px;
    }

    .login-container {
        /*position: absolute;*/
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-image: url('../assets/image/login.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .login-form {
        width: 480px;
        margin: 150px auto;
        background-color: rgba(30, 20, 30, 0.2);
        padding: 50px;
        border-radius: 80px;
    }
</style>
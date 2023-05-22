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
                          placeholder="请输入密码"
                          show-password
                          prefix-icon="el-icon-lock"
                          autocomplete="off"
                          maxlength="16"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" size="20px" prop="checkPass">
                <el-input
                        v-model="user.checkPass"
                        placeholder="请再次输入密码"
                        show-password
                        prefix-icon="el-icon-lock"
                        autocomplete="off"
                        maxlength="16"
                ></el-input>
            </el-form-item>


<!--            <el-form-item label="身份" prop="roleID">-->
<!--                <div style="text-align: center">-->
<!--                    <el-radio v-model="user.role" label="1">学生</el-radio>-->
<!--                    <el-radio v-model="user.role" label="2">企业</el-radio>-->
<!--                </div>-->
<!--            </el-form-item>-->

            <el-form-item style="text-align: center">
                <el-button type="primary" @click="register">注册</el-button>
                <el-button @click="back">返回登陆</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>
<script>
    export default {
        name: "Login",
        data() {
            return {
                user: {
                    account: '',
                    password: '',
                    checkPass: '',
                    // role: '1',
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
                    ],
                    checkPass: [{required: true, message: "请再次输入密码", trigger: "blur"},
                        {min: 6, max: 16, message: '长度在 6 到 16个字符', trigger: 'blur'},
                    ]
                }
            };
        },
        methods: {
            register() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {//表单校验合法
                            if (this.user.password !== this.user.checkPass) {
                                this.$message.success("两次输入的密码不一致")
                                return false
                            }
                            this.request.post("http://localhost:9090/student/register", this.user).then(res => {
                                if (res.code === '200') {
                                    this.$message.success("注册成功")
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                    }
                });
            },
            back() {
                this.$router.replace("/login")
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
        background-image: url("../assets/image/login.png");
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
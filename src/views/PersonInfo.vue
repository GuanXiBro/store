<template>
    <el-card style="width:500px;">
        <el-form label-width="80px" size="small">
            <el-form-item label="用户名">
                <el-input v-model="form.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.sname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="form.sex" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="生日">
                <el-input v-model="form.birthday" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属高校">
                <el-input v-model="form.college" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="form.tel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: "PersonInfo",
        data() {
            return {
                form: {},
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
            }
        },
        created() {
            this.request.get("http://localhost:9090/student/account/" + this.user.account).then(res => {
                if (res.code === '200') {
                    this.form = res.data
                }
            })
        },
        methods: {
            save() {
                this.request.post("http://localhost:9090/student/update", this.form).then(res => {
                    if (res.data) {
                        this.$message.success("保存成功")
                    } else {
                        this.$message.error("保存失败")
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
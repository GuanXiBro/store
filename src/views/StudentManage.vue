<template>
    <div>
        <div>
            <el-input style="width:200px" placeholder="请输入名称" suffix-icon="el-icon-search"
                      v-model="account"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>
        <div style="margin: 10px 0">
            <el-button type="primary"><i class="el-icon-circle-plus-outline" @click="handleAdd">新增</i>
            </el-button>
            <el-button type="primary"><i class="el-icon-circle-plus-outline" @click="exp">导出</i>
            </el-button>

        </div>
        <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'">
            <el-table-column prop="account" label="昵称" width="70">
            </el-table-column>
            <el-table-column prop="sname" label="姓名" width="70">
            </el-table-column>
            <el-table-column prop="menurole" label="角色" width="100">
                <template slot-scope="scope">
                    <el-tag type="primary" v-if="scope.row.menurole === 'ROLE_ADMIN'">管理员</el-tag>
                    <el-tag type="warning" v-if="scope.row.menurole === 'ROLE_COMPANY'">企业</el-tag>
                    <el-tag type="success" v-if="scope.row.menurole === 'ROLE_STUDENT'">学生</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="70">
            </el-table-column>
            <el-table-column prop="birthday" label="生日" width="100">
            </el-table-column>
            <el-table-column prop="college" label="所属高校" width="130">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="130">
            </el-table-column>
            <el-table-column prop="email" label="电子邮箱" width="130">
            </el-table-column>
            <el-table-column prop="tel" label="联系电话" width="130">
            </el-table-column>

            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="primary" class="el-icon-edit" @click="LookCompetition(scope.row.competitions)" v-if="scope.row.menurole === 'ROLE_COMPANY'">查看竞赛</el-button>
                    <el-button type="success" class="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-popconfirm
                            class="ml-5"
                            confirm-button-text='确定'
                            cancel-button-text='我再想想'
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定删除吗？"
                            @confirm="del(scope.row.sid)">
                        <el-button type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding:10px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[1, 5, 10, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px" size="small">
                <el-form-item label="用户名">
                    <el-input v-model="form.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.sname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-input v-model="form.menurole" autocomplete="off"></el-input>
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible1" width="30%">
            <el-form label-width="80px" size="small">
                <el-form-item label="用户名">
                    <el-input v-model="form.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.sname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="form.menurole" placeholder="请选择角色" style="width: 100%">
                        <el-option v-for="item in roles" :key="item.name" :label="item.name" :value="item.rolekey"></el-option>
                    </el-select>
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="save1">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="竞赛信息" :visible.sync="Vis" width="30%">
            <el-table :data="competitions" border stripe :header-cell-class-name="'headerBg'">
                <el-table-column prop="ename" label="项目名称"></el-table-column>
                <el-table-column prop="money" label="奖金"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "StudentManage",
        data(){
            return{
                tableData:[],
                total: 0,
                pageNum: 1,
                pageSize: 10,
                sid: "",
                role:"",
                account: "",
                sname: "",
                menurole:"",
                sex: "",
                birthday: "",
                college: "",
                address: "",
                email: "",
                tel: "",
                form: {},
                dialogFormVisible: false,
                dialogFormVisible1: false,
                roles:[],
                competitions:[],
                Vis: false
            }
        },
        created() {
            this.load()
        },
        methods:{
            load() {
                this.request.get("http://localhost:9090/student/page", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        account: this.account
                    }
                }).then(res => {
                    this.tableData = res.data.records
                    this.total = res.data.total
                })
                this.request.get("http://localhost:9090/role/find").then(res =>{
                    this.roles = res.data
                })
            },
            save() {
                this.request.post("http://localhost:9090/student/insert", this.form).then(res => {
                    if (res.code === '200') {
                        this.$message.success("保存成功")
                        this.dialogFormVisible = false
                        this.load()
                    } else {
                        this.$message.error("保存失败")
                    }
                })
            },
            save1() {
                this.request.post("http://localhost:9090/student/update", this.form).then(res => {
                    if (res.code === '200') {
                        this.$message.success("修改成功")
                        this.dialogFormVisible1 = false
                        this.load()
                    } else {
                        this.$message.error("修改失败")
                    }
                })
            },
            LookCompetition(competitions){
                this.competitions = competitions
                this.Vis = true
            },
            handleEdit(row) {
                this.form = row
                this.dialogFormVisible1 = true
            },
            del(sid) {
                this.request.delete("http://localhost:9090/student/delete/" + sid).then(res => {
                    if (res.code === '200') {
                        this.$message.success("删除成功")
                        this.load()
                    } else {
                        this.$message.error("删除失败")
                    }
                })
            },
            handleAdd() {
                this.dialogFormVisible = true
                this.form = {}
            },
            reset() {
                this.account = ""
                this.load()
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize
                this.load()
            },
            handleCurrentChange(pageNum) {
                this.pageNum = pageNum
                this.load()
            },
            exp(){
                window.open("http://localhost:9090/student/export")
            },
        },
    }
</script>

<style scoped>

</style>
<template>
    <div>
        <div>
            <el-input style="width:200px" placeholder="请输入名称" suffix-icon="el-icon-search"
                      v-model="ename"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>
        <div style="margin: 10px 0">
            <el-button type="primary"><i class="el-icon-circle-plus-outline" @click="handleAdd">新增</i>
            </el-button>

        </div>
        <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'">
            <el-table-column prop="eid" label="ID" width="50">
            </el-table-column>
            <el-table-column prop="ename" label="竞赛名称" width="100">
            </el-table-column>
            <el-table-column prop="context" label="竞赛描述" width="200">
            </el-table-column>
            <el-table-column prop="company" label="主办方" width="80">
            </el-table-column>
            <el-table-column prop="money" label="奖金" width="80">
            </el-table-column>
            <el-table-column prop="buymoney" label="报名费" width="80">
            </el-table-column>
            <el-table-column prop="Rstime" label="报名开始日期" width="100">
            </el-table-column>
            <el-table-column prop="Rctime" label="报名截止日期" width="100">
            </el-table-column>
            <el-table-column prop="Cstime" label="比赛开始日期" width="100">
            </el-table-column>
            <el-table-column prop="Cftime" label="比赛结束日期" width="100">
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                        <el-button type="primary" class="el-icon-edit" @click="buy(scope.row.eid)">报名</el-button>
                    <el-button type="success" class="el-icon-edit" @click="handleEdit(scope.row)">编辑
                    </el-button>
                    <el-popconfirm
                            class="ml-5"
                            confirm-button-text='确定'
                            cancel-button-text='我再想想'
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定删除吗？"
                            @confirm="del(scope.row.eid)">
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
                <el-form-item label="ID">
                    <el-input v-model="form.eid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="竞赛名称">
                    <el-input v-model="form.ename" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="竞赛描述">
                    <el-input v-model="form.context" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="奖金">
                    <el-input v-model="form.money" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="报名费">
                    <el-input v-model="form.buymoney" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="报名开始日期">
                    <el-input v-model="form.Rstime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="报名截止日期">
                    <el-input v-model="form.Rctime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="比赛开始日期">
                    <el-input v-model="form.Cstime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="比赛结束日期">
                    <el-input v-model="form.Cftime" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible1" width="30%">
            <el-form label-width="80px" size="small">
                <el-form-item label="竞赛名称">
                    <el-input v-model="form.ename" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="竞赛描述">
                    <el-input v-model="form.context" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="主办方">
                    <el-select v-model="form.sponsor" placeholder="请选择角色" style="width: 100%">
                        <el-option v-for="item in companys" :key="item.sid" :label="item.sname" :value="item.sid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="奖金">
                    <el-input v-model="form.money" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="报名费">
                    <el-input v-model="form.buymoney" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="报名开始日期">
                    <el-input v-model="form.Rstime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="报名截止日期">
                    <el-input v-model="form.Rctime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="比赛开始日期">
                    <el-input v-model="form.Cstime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="比赛结束日期">
                    <el-input v-model="form.Cftime" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="save1">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AdminManage",
        data(){
            return{
                tableData:[],
                total: 0,
                pageNum: 1,
                pageSize: 5,
                eid: "",
                ename: "",
                context:"",
                sponsor:"",
                money:"",
                buymoney:"",
                Rstime:"",
                Rctime:"",
                Cstime:"",
                Cftime:"",
                form: {},
                companys:[],
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
                dialogFormVisible: false,
                dialogFormVisible1: false,
            }
        },
        created() {
            this.load()
        },
        methods:{
            load() {
                this.request.get("http://localhost:9090/competition/page", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        ename: this.ename
                    }
                }).then(res => {
                    console.log(res)
                    this.tableData = res.data.records
                    this.total = res.data.total
                })

                this.request.get("http://localhost:9090/student/role/ROLE_COMPANY").then(res => {
                    this.companys = res.data
                })

            },
            buy(eid){
              this.request.post("http://localhost:9090/order/" + eid + "/" + 1).then(res => {
                  if(res.code === '200'){
                      this.$message.success("下单成功，请到订单页面支付")
                  }else {
                      this.$message.error("下单失败")
                  }
              })
            },
            save() {
                this.request.post("http://localhost:9090/competition/insert", this.form).then(res => {
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
                this.request.post("http://localhost:9090/competition/update", this.form).then(res => {
                    if (res.code === '200') {
                        this.$message.success("修改成功")
                        this.dialogFormVisible1 = false
                        this.load()
                    } else {
                        this.$message.error("修改失败")
                    }
                })
            },
            handleEdit(row) {
                this.form = row
                this.dialogFormVisible1 = true
            },
            del(eid) {
                this.request.delete("http://localhost:9090/competition/delete/" + eid).then(res => {
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
                this.ename = ""
                this.load()
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize
                this.load()
            },
            handleCurrentChange(pageNum) {
                this.pageNum = pageNum
                this.load()
            }
        },
    }
</script>

<style scoped>

</style>
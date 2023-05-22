<template>
    <div>
        <div>
            <el-input style="width:200px" placeholder="请输入名称" suffix-icon="el-icon-search"
                      v-model="name"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>
        <div style="margin: 10px 0">
            <el-button type="primary"><i class="el-icon-circle-plus-outline" @click="handleAdd()">新增</i>
            </el-button>
            <el-button type="primary"><i class="el-icon-circle-plus-outline" @click="exp">导出</i>
            </el-button>

        </div>
        <el-table :data="tableData" row-key="id" default-expand-all border stripe :header-cell-class-name="'headerBg'">
            <!--            <el-table-column prop="mid" label="管理员id" width="100">-->
            <!--            </el-table-column>-->
            <!--            <el-table-column prop="role" label="角色ID" width="100">-->
            <!--            </el-table-column>-->
            <el-table-column prop="name" label="菜单名" width="200">
            </el-table-column>
            <el-table-column prop="discription" label="菜单描述" width="150">
            </el-table-column>
            <el-table-column prop="url" label="菜单路径" width="150">
            </el-table-column>
            <el-table-column prop="pagepath" label="页面路径" width="150">
            </el-table-column>
            <el-table-column prop="pid" label="菜单pid" width="150">
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="primary" class="el-icon-plus" @click="handleAdd(scope.row.id)" v-if="!scope.row.pid && !scope.row.url">新增子菜单
                    </el-button>
                    <el-button type="success" class="el-icon-edit" @click="handleEdit(scope.row)">编辑
                    </el-button>
                    <el-popconfirm
                            class="ml-5"
                            confirm-button-text='确定'
                            cancel-button-text='我再想想'
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定删除吗？"
                            @confirm="del(scope.row.id)">
                        <el-button type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px" size="small">
                <el-form-item label="菜单名称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单描述">
                    <el-input v-model="form.discription" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单路径">
                    <el-input v-model="form.url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="页面路径">
                    <el-input v-model="form.pagepath" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="pid">
                    <el-input v-model="form.pid" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible1" width="30%">
            <el-form label-width="80px" size="small">
                <el-form-item label="菜单名称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单描述">
                    <el-input v-model="form.discription" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单路径">
                    <el-input v-model="form.url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="页面路径">
                    <el-input v-model="form.pagepath" autocomplete="off"></el-input>
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
        name: "MenuManage",
        data(){
            return{
                tableData:[],
                total: 0,
                pageNum: 1,
                pageSize: 5,
                id: "",
                name: "",
                discription:"",
                url:"",
                pid:"",
                form: {},
                dialogFormVisible: false,
                dialogFormVisible1: false,
            }
        },
        created() {
            this.load()
        },
        methods:{
            load() {
                this.request.get("http://localhost:9090/menu/find", {
                    params: {
                        name: this.name
                    }
                }).then(res => {
                    console.log(res)
                    this.tableData = res.data
                    this.total = res.total
                })

            },
            save() {
                this.request.post("http://localhost:9090/menu/insert", this.form).then(res => {
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
                this.request.post("http://localhost:9090/menu/update", this.form).then(res => {
                    if (res) {
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
            del(mid) {
                this.request.delete("http://localhost:9090/menu/delete/" + mid).then(res => {
                    if (res.code === '200') {
                        this.$message.success("删除成功")
                        this.load()
                    } else {
                        this.$message.error("删除失败")
                    }
                })
            },
            handleAdd(pid) {
                this.dialogFormVisible = true
                this.form = {}
                if(pid){
                    this.form.pid = pid
                }
            },
            reset() {
                this.name = ""
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
                window.open("http://localhost:9090/menu/export")
            }
        },
    }
</script>

<style scoped>

</style>
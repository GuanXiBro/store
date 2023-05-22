<template>
    <div>
        <div>
            <el-input style="width:200px" placeholder="请输入名称" suffix-icon="el-icon-search"
                      v-model="name"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>
        <div style="margin: 10px 0">
            <el-button type="primary"><i class="el-icon-circle-plus-outline" @click="handleAdd">新增</i>
            </el-button>

        </div>
        <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'">
            <!--            <el-table-column prop="mid" label="管理员id" width="100">-->
            <!--            </el-table-column>-->
            <el-table-column prop="id" label="角色ID" width="100">
            </el-table-column>
            <el-table-column prop="discription" label="角色描述" width="300">
            </el-table-column>
            <el-table-column prop="name" label="角色名称" width="300">
            </el-table-column>
            <el-table-column prop="rolekey" label="唯一标识" width="300">
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="warning" class="el-icon-menu" @click="selectMenu(scope.row)">分配菜单
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
                <el-form-item label="ID">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="form.discription" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色名称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="唯一标识">
                    <el-input v-model="form.rolekey" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible1" width="30%">
            <el-form label-width="80px" size="small">
                <el-form-item label="角色描述">
                    <el-input v-model="form.discription" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色名称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="save1">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="菜单分配" :visible.sync="menuDialogVisible" width="30%">
            <el-tree
                    :props="props"
                    :data="menuData"
                    show-checkbox
                    node-key="id"
                    :default-expanded-keys="expends"
                    :default-checked-keys="checks"
                    ref="tree"
                    @check-change="handleCheckChange"
            >

            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="menuDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRoleMenu">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "RoleManage",
        data() {
            return {
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 5,
                id: "",
                discription: "",
                name: "",
                form: {},
                dialogFormVisible: false,
                dialogFormVisible1: false,
                menuDialogVisible: false,
                menuData: [],
                props: {
                    label: 'name',
                },
                rid: 0,
                roleFlag:'',
                menurole:'',
                expends:[],
                checks:[]
            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                this.request.get("http://localhost:9090/role/find", {
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
                this.request.post("http://localhost:9090/role/insert", this.form).then(res => {
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
                this.request.post("http://localhost:9090/role/update", this.form).then(res => {
                    if (res) {
                        this.$message.success("修改成功")
                        this.dialogFormVisible1 = false
                        this.load()
                    } else {
                        this.$message.error("修改失败")
                    }
                })
            },
            saveRoleMenu() {
                this.request.post("http://localhost:9090/role/roleMenu/" + this.rid, this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())).then(res => {
                    if(res.code === '200'){
                        this.$message.success("绑定成功")
                        this.menuDialogVisible = false

                        //操作管理员角色之后需要重新登陆
                        if(this.roleFlag === 'ROLE_ADMIN'){
                            this.$store.commit("logout")
                        }
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            },
            handleEdit(row) {
                this.form = row
                this.dialogFormVisible1 = true
            },
            del(id) {
                this.request.delete("http://localhost:9090/role/delete/" + id).then(res => {
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
            selectMenu(menurole) {
                this.menuDialogVisible = true
                this.rid = menurole.id
                this.roleFlag = menurole.rolekey

                // 请求菜单数据
                this.request.get("http://localhost:9090/menu/find").then(res => {
                    this.menuData = res.data
                    //把后台返回的菜单id数据处理成id数组
                    this.expends = this.menuData.map(v => v.id)
                })

                // 请求菜单数据
                this.request.get("http://localhost:9090/role/roleMenu/" + this.rid).then(res => {
                    this.checks = res.data
                })

            },
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            },

        },
    }
</script>

<style scoped>

</style>
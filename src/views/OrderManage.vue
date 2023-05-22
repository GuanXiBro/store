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
            <el-table-column prop="id" label="ID" width="50">
            </el-table-column>
            <el-table-column prop="name" label="竞赛名称" width="100">
            </el-table-column>
            <el-table-column prop="number" label="订单号" width="200">
            </el-table-column>
            <el-table-column prop="time" label="下单日期" width="100">
            </el-table-column>
            <el-table-column prop="state" label="订单状态" width="100">
            </el-table-column>
            <el-table-column prop="paymentTime" label="支付时间" width="150">
            </el-table-column>
            <el-table-column prop="alipayNo" label="支付宝订单号" width="180">
            </el-table-column>
            <el-table-column prop="total" label="订单总价" width="100">
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="success" slot="reference" @click="pay(scope.row)">支付</el-button>
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
    </div>
</template>

<script>
    export default {
        name: "OrderManage",
        data(){
            return{
                tableData:[],
                total: 0,
                pageNum: 1,
                pageSize: 5,
                id: "",
                name: "",
                number:"",
                // time:"",
                form: {},
            }
        },
        created() {
            this.load()
        },
        methods:{
            load() {
                this.request.get("http://localhost:9090/order/page", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        name: this.name
                    }
                }).then(res => {
                    this.tableData = res.data
                    this.total = res.total
                })
            },
            pay(row){
                window.open(`http://localhost:9090/alipay/pay?subject=${row.name}&traceNo=${row.number}&totalAmount=${row.total}`)
            },
            del(id) {
                this.request.delete("http://localhost:9090/order/delete/" + id).then(res => {
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
            }
        },
    }
</script>

<style scoped>

</style>
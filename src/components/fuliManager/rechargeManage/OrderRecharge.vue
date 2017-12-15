<template>
    <div>
        <div class="page-title">
            <div class="btn">
                <el-button type="info" class="declare" @click="exportExcel">
                    <i class="iconfont icon-gantanhao"></i>
                    导出excel
                </el-button>
            </div>
            {{$route.name}}
        </div>
        <div class="page-center">
            <el-col class="searchBar">
                <el-form :inline="true">
                    <el-form-item label="订单状态：">
                        <el-select placeholder="请选择状态" v-model="filters.state">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="待付款" value="0"></el-option>
                            <el-option label="待审核" value="1"></el-option>
                            <el-option label="已完成" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="下单日期：">
                        <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleDate">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="getSearchResult">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-table :data="tableData" border resizable highlight-current-row style="width: 100%;">
                <el-table-column type="selection" align="center">
                </el-table-column>
                <el-table-column prop="orderID" label="订单编号" sortable align="center">
                </el-table-column>
                <el-table-column prop="orderType" label="订单类型" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center">
                </el-table-column>
                <el-table-column prop="amount_pay" label="充值积分" align="center">
                </el-table-column>
                <el-table-column prop="recharge_point" label="支付金额" align="center">
                </el-table-column>
                <el-table-column prop="orderState" label="订单状态" align="center">
                </el-table-column>
                <el-table-column prop="taxType" label="发票类型" align="center">
                </el-table-column>
                <el-table-column prop="taxState" label="发票状态" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="continuePay(scope.row.orderType)" v-show="scope.row.orderState=='待付款'?true:false">继续支付</el-button>
                        <el-button type="text" @click="oneMorePay" v-show="scope.row.orderState=='待付款'?false:true">再次充值</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                </el-pagination>
            </el-col>
        </div>
    </div>
</template>
<script>
import authUnils from '../../../common/authUnils'
export default{
    data(){
        return{
            tableData:[],
            value:[],
            filters:{
                state:"",
                startTime:"",
                lastTime:"",
                pageNum:1,
                pageSize:10
            },
            totalSize:0,
            currentPage:1
        }
    },
    methods:{
        //格式化时间
        formatDate(time){
            var d=new Date(time)
            return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        },
        handleDate(){
            if(this.value==null){
                return 
            }
            this.filters.startTime=this.formatDate(this.value[0])
            this.filters.lastTime=this.formatDate(this.value[1])
        },
        handleSizeChange(val){
            this.filters.pageSize=val
            this.getRechargeOrderList()
        },
        handleCurrentChange(val){
            this.filters.pageNum=val
            this.getRechargeOrderList()
        },
        //导出excel
        exportExcel() {
            this.$axios.get("/api/api/recharge/dowloadExcel",{
                params:{
                    startTime:this.filters.startTime,
                    endTime:this.filters.lastTime
                }
            }).then(res=>{
                console.log(res.data)
            })
        },
        //充值订单
        getRechargeOrderList(){
            this.$axios.post("/api/api/recharge/order",this.filters,{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.status==200){
                    if(res.data.code==1000){
                        this.tableData=res.data.data.content
                        this.totalSize=res.data.data.totalSize
                    }
                }
            })
        },
        getSearchResult(){
            this.getRechargeOrderList()
        },
        //继续支付
        continuePay(type){
            if(type=="支付宝"){

            }else if(type=="微信支付"){

            }
        },
        //再次充值
        oneMorePay(){
            this.$router.push("/CreditRecharge")
        }
    },
    mounted(){
        this.getRechargeOrderList()
    }
}
</script>
<style lang="scss" scoped>
</style>


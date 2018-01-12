<template>
    <div>
        <div class="page-title">{{$route.name}}</div>
        <!-- 信用卡还款列表 -->
        <div class="page-center" v-show="isShowList">
            <div class="searchBar">
                <el-form :inline="true">
                    <el-form-item label="订单号：">
                        <el-input v-model="filters.orderNo"></el-input>
                    </el-form-item>
                    <el-form-item label="还款时间(开始-结束)：">
                        <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleDate">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="getSearchResult">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" border stripe resizable highlight-current-row style="width: 100%;" :header-row-style="headerStyle">
                <el-table-column label="序号" type="index" align="center" width="80">
                </el-table-column>
                <el-table-column prop="orderNo" label="订单号" align="center" min-width="165">
                </el-table-column>
                <el-table-column prop="num" label="总人数" align="center">
                </el-table-column>
                <el-table-column prop="totalMoney" label="总还款金额" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" min-width="150">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="seeDetail(scope.row.id)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="toolbar">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                </el-pagination>
            </div>
        </div>
        <!-- 信用卡还款详情 -->
        <div class="page-center" v-show="isShowDetail">
            <div class="searchBar">
                <el-form :inline="true">
                    <el-form-item label="信用卡号：">
                        <el-input v-model="sendRecordParams.cardNo"></el-input>
                    </el-form-item>
                    <el-form-item label="户名：">
                        <el-input v-model="sendRecordParams.cardName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="getSearchResult">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="goBack">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="sendRecordtable" border stripe resizable highlight-current-row style="width: 100%;" :header-row-style="headerStyle">
                <el-table-column label="序号" type="index" align="center" width="80">
                </el-table-column>
                <el-table-column prop="cardNo" label="信用卡号" align="center" min-width="165">
                </el-table-column>
                <el-table-column prop="cardName" label="户名" align="center">
                </el-table-column>
                <el-table-column prop="cardBank" label="银行" align="center">
                </el-table-column>
                <el-table-column prop="money" label="还款金额(元)" align="center" min-width="102">
                </el-table-column>
                <el-table-column prop="payScore" label="支付积分" align="center">
                </el-table-column>
                <el-table-column prop="errorMsg" label="信息" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" min-width="150">
                </el-table-column>
                <el-table-column prop="orderState" label="还款状态" align="center">
                </el-table-column>
            </el-table>
            <div class="toolbar">
                <el-pagination @size-change="detailSizeChange" @current-change="detailCurrentChange" :current-page="detailPage"
                    :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="detailTotalSize">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import authUnils from '../../../common/authUnils'
export default{
    data(){
        return{
            headerStyle:{
                color:"#000"
            },
            isShowList:true,
            isShowDetail:false,
            tableData:[],
            value:"",
            filters:{
                orderNo:"",
                startTime:"",
                endTime:"",
                pageNum:1,
                pageSize:10
            },
            currentPage:1,
            totalSize:0,
            //详情
            sendRecordtable:[],
            sendRecordParams:{
                cardName: "",
                cardNo: "",
                endTime: "",
                orderId: 0, 
                pageNum: 1,
                pageSize:10,
                startTime: ""
            },
            detailPage:1,
            detailTotalSize:0
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
                this.filters.startTime=''
                this.filters.endTime=''
                return 
            }
            this.filters.startTime=this.formatDate(this.value[0])
            this.filters.endTime=this.formatDate(this.value[1])
        },
        //信用卡还款记录
        getcreditCardList(){
            this.$axios.post("/api/api/creditCard/queueOrders",this.filters).then(res=>{
                if(res.data.code==1000){
                    this.tableData=res.data.data.content
                    this.totalSize=res.data.data.totalSize
                }
            })
        },
        handleSizeChange(val){
            this.filters.pageSize=val
            this.getcreditCardList()
        },
        handleCurrentChange(val){
            this.filters.pageNum=val
            this.getcreditCardList()
        },
        getSearchResult(){
            this.getcreditCardList()
        },
        //查看详情
        seeDetail(id){
            this.isShowList=false
            this.isShowDetail=true
            this.sendRecordParams.orderId=id
            this.$axios.post("/api/api/creditCard/queues",this.sendRecordParams).then(res=>{
                if(res.data.code==1000){
                    //已提交 已受理 还款成功 还款失败
                    //refundState 退款状态 0无 1退款成功 1退款失败
                    //tradeType 交易类型 1企业 2个人
                    this.sendRecordtable=res.data.data.content
                    this.detailTotalSize=res.data.data.totalSize
                }
            })
        },
        detailSizeChange(val){
            this.sendRecordParams.pageSize=val
        },
        detailCurrentChange(val){
            this.sendRecordParams.pageNum=val
        },
        goBack(){
            this.isShowList=true
            this.isShowDetail=false
        }
    },
    mounted(){
        this.getcreditCardList()
    }
}
</script>
<style lang="scss" scoped>

</style>
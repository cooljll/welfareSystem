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
            <el-table :data="tableData" v-loading="loading" border stripe resizable highlight-current-row style="width: 100%;" :header-row-style="headerStyle">
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
                        <el-button type="info" @click="getSearchResult1">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="goBack">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="sendRecordtable" v-loading="recordLoading" border stripe resizable highlight-current-row style="width: 100%;" :header-row-style="headerStyle">
                <el-table-column label="序号" type="index" align="center" width="80">
                </el-table-column>
                <el-table-column prop="cardNo" label="信用卡号" align="center" min-width="165">
                </el-table-column>
                <el-table-column prop="cardName" label="户名" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" style="color:#606266;">{{scope.row.cardName}}</el-button>
                    </template>
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
                <el-table-column label="还款状态" align="center" min-width="135" 
                    :filters="refundStatus" :filter-method="filterStatus">
                    <template slot-scope="scope">
                        <span :class="scope.row.orderState=='已受理'?'accepted':'failed'" close-transition>{{ scope.row.orderState }}</span>
                    </template>
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
var root = process.env.API_ROOT
export default{
    data(){
        return{
            headerStyle:{
                color:"#000"
            },
            isShowList:true,
            isShowDetail:false,
            loading:false,
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
            recordLoading:false,
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
            //还款状态
            refundStatus:[
                {
                    text:'已提交',
                    value:'已提交'
                },
                {
                    text:'已受理',
                    value:'已受理'
                },
                {
                    text:'还款成功',
                    value:'还款成功'
                },
                {
                    text:'还款失败',
                    value:'还款失败'
                }
            ],
            detailPage:1,
            detailTotalSize:0,
            orderId:0
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
            this.loading=true
            this.$axios.post(root+"creditCard/queueOrders",this.filters).then(res=>{
                var that=this
                setTimeout(function() {
                    that.loading=false
                }, 50)
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
        //搜索
        getSearchResult(){
            this.getcreditCardList()
        },
        detailSizeChange(val){
            this.sendRecordParams.pageSize=val
            this.getcreditMsg()
        },
        detailCurrentChange(val){
            this.sendRecordParams.pageNum=val
            this.getcreditMsg()
        },
        //返回
        goBack(){
            let userAgent = window.navigator.userAgent
            if (userAgent.indexOf("Firefox") > -1) {
                this.isShowList=true
                this.isShowDetail=false
                this.sendRecordParams.cardNo=''
                this.sendRecordParams.cardName=''
                this.filters.orderNo=''
                this.filters.startTime=''
                this.filters.endTime=''
                this.value=null
                this.getcreditCardList()
            }else{
                this.$router.push("/WelfareIndex")
                this.$router.go(-1)
            }
        },
        //查看详情
        seeDetail(id){
            this.orderId=id
            this.isShowList=false
            this.isShowDetail=true
            this.getcreditMsg()
        },
        getcreditMsg(){
            this.recordLoading=true
            this.sendRecordParams.orderId=this.orderId
            this.$axios.post(root+"creditCard/queues",this.sendRecordParams).then(res=>{
                var that=this
                setTimeout(function() {
                    that.recordLoading=false
                }, 50)
                if(res.data.code==1000){
                    //已提交 已受理 还款成功 还款失败
                    //refundState 退款状态 0无 1退款成功 2退款失败
                    //tradeType 交易类型 1企业 2个人
                    res.data.data.content.forEach(item=>{
                        if(item.refundState==1){
                            item.orderState=item.orderState+",已退款"
                        }else if(item.refundState==2){
                            item.orderState=item.orderState+",未退款"
                        }else{
                            item.orderState=item.orderState
                        }
                    })
                    this.sendRecordtable=res.data.data.content
                    this.detailTotalSize=res.data.data.totalSize
                }
            }) 
        },
        //搜索
        getSearchResult1(){
            this.getcreditMsg()
        },
        setStyle(state){
            if(state=="已受理"){
                return 'accepted'
            }else if(state=="还款失败"){
                return 'failed'
            }
        },
        filterStatus(value, row){
            return row.tag === value
        }
    },
    mounted(){
        this.getcreditCardList()
    }
}
</script>
<style lang="scss" scoped>
    //已提交
    .submitted{
        background: #90EE90;
        color:#fff;
        padding: 1px 4px 1px 4px;
    }
    //已受理
    .accepted{
        background:#1E90FF;
        color:#fff;
        padding: 1px 4px 1px 4px;
    }
    //还款成功
    .success{
        background: #3cc051;
        color:#fff;
        padding: 1px 4px 1px 4px;
    }
    //还款失败
    .failed{
        background:#40E0D0;
        color:#fff;
        padding: 1px 4px 1px 4px;
    }
    //还款失败，已退款
    .refunded{
        background: #40E0D0;
        color:#fff;
        padding: 1px 4px 1px 4px;
    }
</style>
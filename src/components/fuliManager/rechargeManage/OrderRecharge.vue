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
                        <el-select placeholder="请选择状态" v-model="filters.state" @change="changeOrderStatus">
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
            <el-table :data="tableData" stripe resizable highlight-current-row style="width: 100%;" :header-row-style="headerStyle">
                <el-table-column type="selection" align="center">
                </el-table-column>
                <el-table-column prop="orderNo" label="订单编号" align="center" min-width="185">
                </el-table-column>
                <el-table-column prop="payType" label="付款方式" align="center">
                </el-table-column>
                <el-table-column prop="creationTime" label="创建时间" align="center" min-width="160">
                </el-table-column>
                <el-table-column prop="score" label="充值积分" align="center">
                </el-table-column>
                <el-table-column prop="accountPayable" label="支付金额" align="center">
                </el-table-column>
                <el-table-column prop="status" label="订单状态" align="center">
                </el-table-column>
                <el-table-column prop="taxType" label="发票类型" align="center">
                </el-table-column>
                <el-table-column prop="taxState" label="发票状态" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" 
                        v-show='(scope.row.status=="已付款"||(scope.row.status=="待付款"&&scope.row.payType=="银行电汇")||(scope.row.status==null))?true:false'
                        @click="$router.push('/CreditRecharge')">再次充值</el-button>
                        <el-button type="text" v-show='((scope.row.status=="待付款"&&scope.row.payType=="微信")||(scope.row.status=="待付款"&&scope.row.payType=="支付宝"))?true:false'
                        @click="handleOrder(scope.row)">继续支付</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                </el-pagination>
            </el-col>
        </div>
        <!-- 微信支付弹框 -->
        <el-dialog title="扫码支付" :visible.sync="weChatVisible" :close-on-click-modal="false" style="top:15%" class="weChatDialog">
           <div class="weixinpaybox">
                <img class="QRimg" :src="WechatImg">
                <span class="QRtitle">
                    请使用微信扫一扫<br>
                    扫描二维码支付
                </span>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import authUnils from '../../../common/authUnils'
import fileDownload from 'js-file-download'
import qs from 'queryString'
var root = process.env.API_ROOT
export default{
    data(){
        return{
            headerStyle:{
                color:"#000"
            },
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
            currentPage:1,
            weChatVisible:false,
            isShowRecharge:true,
            isShowPay:false,
            WechatImg:""
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
                this.filters.lastTime=''
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
            this.$axios({
                url:root+"recharge/dowloadExcel",
                method:"get",
                params:{
                    startTime:this.filters.startTime,
                    endTime:this.filters.lastTime
                },
                responseType:"arraybuffer"
            }).then(res=>{
                if(res){
                    // let blob=new Blob([res.data],{type:"application/vnd.ms-excel"})
                    // let objectUrl=URL.createObjectURL(blob)
                    // window.location.href=objectUrl
                    fileDownload(res.data,"积分充值订单.xls")
                }
            })
        },
        //充值订单
        getRechargeOrderList(){
            this.$axios.post(root+"recharge/order",this.filters).then(res=>{
                if(res.data.code==1000){
                    this.tableData=res.data.data.content
                    this.totalSize=res.data.data.totalSize
                }
            })
        },
        changeOrderStatus(){
            this.getRechargeOrderList()
        },
        getSearchResult(){
            this.getRechargeOrderList()
        },
        //继续支付
        handleOrder(obj){
            if(obj.payType=="支付宝"){
                this.$axios.get(root+"alipays/web",{
                    params:{
                        orderNo:"continue",
                        payOrder:obj.orderId,
                        point:obj.score
                    }
                }).then(res=>{
                    const div = document.createElement('div')
                    div.innerHTML = res.data
                    document.body.appendChild(div)
                    document.forms['pay_form'].submit()
                })
            }else if(obj.payType=="微信"){
                this.$axios.get(root+"wechatPay/nativeOrder",{
                    params:{
                        orderNo:"continue",
                        payOrder:obj.orderId,
                        point:obj.score
                    },
                    responseType:'blob'
                }).then(res=>{
                    let blob = new Blob([res.data], {type:'image/jpeg'})
                    let imgSrc=URL.createObjectURL(blob)
                    this.WechatImg=imgSrc
                    this.weChatVisible=true
                    var repeat = 200 // 限制执行次数为200次  
                    var that = this
                    // 注意：setInterval函数里面的this是指向window
                    var timer = setInterval(function() {      
                        if (repeat == 0 || !that.weChatVisible) {  
                            clearInterval(timer)
                        } else {  
                            //后台轮询 查询订单状态  
                            that.$axios.post(root+"recharge/orderStatus",qs.stringify({orderNo:obj.orderId})).then(res=>{
                                if(res.data.code==1000){
                                    let status=res.data.data.status
                                    if(status==1){//扫码成功
                                        clearInterval(timer) 
                                        this.getRechargeOrderList()
                                        this.weChatVisible=false
                                    }else if(status==0){

                                    }
                                }
                            })
                            repeat-- 
                        }  
                    }, 3000)
                })
            }
        }
    },
    mounted(){
        this.getRechargeOrderList()
    }
}
</script>
<style lang="scss" scoped>
    .el-button{
        margin-left:0 !important;
    }
</style>


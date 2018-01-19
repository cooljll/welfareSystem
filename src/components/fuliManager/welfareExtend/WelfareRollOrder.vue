<template>
    <div>
        <!-- 订单列表 -->
        <div class="page-title" v-show="isShowOrder">
            <div class="btn">
                <el-button type="info" class="declare" @click="exportWelRollOrder">
                    <i class="iconfont icon-gantanhao"></i>
                    导出excel
                </el-button>
            </div>
            {{$route.name}}
        </div>
        <div class="page-center" v-show="isShowOrder">
            <div class="searchBar">
                <el-form :inline="true">
                    <el-form-item label="订单类型：">
                        <el-select placeholder="请选择类型" v-model="filters.welfareType" @change="changeOrderType">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="激励方案" value="1"></el-option>
                            <el-option label="基本节日" value="2"></el-option>
                            <el-option label="自定义福利" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单日期：">
                        <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleDate">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="getSearchResult">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" v-loading="loading" stripe resizable highlight-current-row style="width: 100%;" :header-row-style="headerStyle">
                <el-table-column type="selection" align="center">
                </el-table-column>
                <el-table-column prop="orderId" label="订单编号" align="center" min-width="86">
                </el-table-column>
                <el-table-column prop="productName" label="福利卷名称" align="center" min-width="191">
                </el-table-column>
                <el-table-column prop="welType" label="福利类型" align="center" min-width="88">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" min-width="176">
                </el-table-column>
                <el-table-column prop="consume_point" label="消费积分" align="center" min-width="79">
                </el-table-column>
                <el-table-column prop="state" label="订单状态" align="center" min-width="79">
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="72">
                    <template slot-scope="scope">
                        <el-button type="text" @click="seeOrderDetail(scope.row.orderId,scope.row.welType)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                </el-pagination>
            </el-col>
        </div>
        <!-- 订单详情-发放名单 -->
        <div class="page-center" v-show="isShowExtendList">
            <div class="searchBar">
                <div class="goback">
                    <el-button type="info" @click="returnList">返回列表</el-button>
                </div>
                <div class="exportbox" @click="exportToExcel">导出excel</div>
            </div>
            <el-table :data="extendEmpTable" stripe resizable highlight-current-row style="width: 100%;" :header-row-style="headerStyle">
                <el-table-column type="selection" align="center">
                </el-table-column>
                <el-table-column prop="name" label="姓名" align="center">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" align="center">
                </el-table-column>
                <el-table-column prop="welType" label="福利类型" align="center">
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination @size-change="handleExtendSize" @current-change="handleExtendCurrent" :current-page="extendCurrentPage"
                    :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="extendTotalSize">
                </el-pagination>
            </el-col>
        </div>
        <!-- 订单详情弹框 -->
        <el-dialog title="配置详情" :visible.sync="orderDetailVisible" :close-on-click-modal="false" class="orderDetailDialog">
            <div class="orderDetail_wrapper">
                <div class="topbox">
                    <div class="imgbox">
                        <img :src="orderInfo.productImage">
                    </div>
                    <div class="infobox">
                        <div>
                            <span class="title">福利券名称</span>
                            <span class="center">{{orderInfo.productName}}</span>
                        </div>
                        <div>
                            <span class="title">福利类型</span>
                            <span class="center">{{orderInfo.welType}}</span>
                        </div>
                        <div>
                            <span class="title">福利券单价</span>
                            <span class="center">{{orderInfo.price}}</span>
                        </div>
                        <div>
                            <span class="title">订单编号</span>
                            <span class="center">{{orderInfo.productNo}}</span>
                        </div>
                    </div>
                </div>
                <div class="mourinfobox">
                    <div>
                        <span class="title">总人数</span>
                        <span class="center">{{orderInfo.nums}}</span>
                    </div>
                    <div>
                        <span class="title">总花费积分</span>
                        <span class="center">{{orderInfo.consume_point}}</span>
                    </div>
                    <div>
                        <span class="title">创建时间</span>
                        <span class="center">{{orderInfo.createTime}}</span>
                    </div>
                    <div>
                        <el-button type="primary" @click="extendEmpList">详细发放人员</el-button>
                    </div>
                </div>
                <div class="messbox">{{orderInfo.blessMsg}}</div>
                <div class="status">{{orderInfo.state}}</div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import authUnils from "../../../common/authUnils"
import qs from 'queryString'
import fileDownload from 'js-file-download'
var root = process.env.API_ROOT
export default{
    data(){
        return{
            headerStyle:{
                color:"#000"
            },
            isShowOrder:true,
            isShowExtendList:false,
            loading:false,
            tableData:[],
            value:"",
            filters:{
                welfareType:"",
                startTime:"",
                endTime:"",
                pageNum:1,
                pageSize:10
            },
            totalSize:0,
            currentPage:1,
            orderDetailVisible:false,
            orderInfo:{},
            extendEmpTable:[],
            extendCurrentPage:1,
            extendTotalSize:0,
            //发放人员参数
            extendEmpParams:{
                orderId:"",
                pageNum:1,
                pageSize:10,
                state:""
            },
            orderId:"",
            welType:""
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
        handleSizeChange(val){
            this.filters.pageSize=val
            this.getPagedOrder()
        },
        handleCurrentChange(val){
            this.filters.pageNum=val
            this.getPagedOrder()
        },
        //导出福利卷订单
        exportWelRollOrder(){
            this.$axios({
                url:root+"voucher/exportExcelVoucherOrder",
                method:"get",
                responseType:"arraybuffer"
            }).then(res=>{
                if(res){
                    // let blob=new Blob([res.data],{type:"application/vnd.ms-excel"})
                    // let objectUrl=URL.createObjectURL(blob)
                    // window.location.href=objectUrl
                    fileDownload(res.data,'福利卷订单记录.xls')
                }
            })
        },
        //显示订单列表
        getPagedOrder(){
            this.loading=true
            this.$axios.post(root+"voucher/showOrder",this.filters).then(res=>{
                var that=this
                setTimeout(function() {
                    that.loading=false
                }, 50);
                if(res.data.code==1000){
                    this.tableData=res.data.data.content
                    this.totalSize=res.data.data.totalSize
                }else{
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        //搜索结果
        getSearchResult(){
            this.getPagedOrder()
        },
        changeOrderType(){
            this.getPagedOrder() 
        },
        //查看详情
        seeOrderDetail(id,type){
            this.orderId=id
            this.welType=type
            this.$axios.post(root+"voucher/orderDetail",{
                orderId:id,
                pageNum:1,
                pageSize:10,
                state:""
            }).then(res=>{
                if(res.data.code==1000){
                    this.orderDetailVisible=true
                    this.orderInfo=res.data.data
                }else if(res.data.code==500){
                    this.$alert("数据无法获取失败,请尝试重新获取",'信息')
                }
            })
        },
        //详细发放人员
        extendEmpList(){
            this.orderDetailVisible=false
            this.isShowExtendList=true
            this.isShowOrder=false
            this.extendEmpParams.orderId=this.orderId
            this.$axios.post(root+"voucher/orderDetailEmp",this.extendEmpParams).then(res=>{
                if(res.data.code==1000){
                    res.data.data.content.forEach(item=>{
                        item.welType=this.welType
                    })
                    this.extendEmpTable=res.data.data.content
                    this.extendTotalSize=res.data.data.totalSize
                }else{
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        //返回列表
        returnList(){
            this.isShowExtendList=false
            this.isShowOrder=true
        },
        handleExtendSize(val){
            this.extendEmpParams.pageSize=val
            this.extendEmpList()
        },
        handleExtendCurrent(val){
            this.extendEmpParams.pageNum=val
            this.extendEmpList()
        },
        //导出福利卷订单详情
        exportToExcel(){
            this.$axios.get(root+"voucher/exportExcelVoucherOrderDes",{
                params:{
                    orderId:this.orderId
                }
            }).then(res=>{
                if(res){
                    fileDownload(res.data,"福利卷订单详情.xls")
                }
            })
        }
    },
    mounted(){
        this.getPagedOrder()
    }
}
</script>
<style lang="scss" scoped>
    .orderDetail_wrapper{
        .topbox{
            padding-bottom: 50px;
            border-bottom: 1px solid #D8D8D8;
            .imgbox{
                float: left;
                height: 160px;
                width: 160px;
                margin-right: 20px;
                img{
                    display: block;
                    max-width: 160px;
                    max-height: 160px;
                    margin: 0px auto;
                }
            }
            .infobox{
                div{
                    margin-bottom: 20px;
                    .title{
                        font-size: 14px;
                        color: #3A4D62;
                        letter-spacing: 0;
                        text-align: right;
                        width: 80px;
                        margin-right: 15px;
                    }
                    .center{
                        font-size: 14px;
                        color: #A8A9AB;
                        letter-spacing: 0;
                    }
                }
            }
        }
        .mourinfobox{
            padding: 40px 38px 20px;
            border-bottom: 1px solid #D8D8D8;
            overflow: hidden;
            div{
                float: left;
                width: 247px;
                margin-bottom: 20px;
                .title{
                    font-size: 14px;
                    color: #3A4D62;
                    margin-right: 40px;
                }
                .center{
                    font-size: 14px;
                    color: #A8A9AB;
                }
            }
        }
        .messbox{
            background: #FAFAFA;
            border: 1px solid #EAEAEA;
            border-radius: 3px;
            height: 70px;
            overflow: auto;
            font-size: 12px;
            color: #757D87;
            letter-spacing: 0;
            padding: 14px 20px;
            margin-top: 40px;
        }
        .status{
            margin: 40px auto 0px;
            width: 230px;
            height: 47px;
            line-height: 47px;
            text-align: center;
            background: #ffa262;
            border-radius: 100px;
            font-family: "MicrosoftYaHei-Bold";
            font-size: 14px;
            color: #FFFFFF;
        }
    }

    .searchBar{
        padding:0 20px;
        .goback{
            float: left;
            height: 60px;
            line-height: 60px;
        }
        .exportbox{
            float: right;
            height: 60px;
            line-height: 60px;
            color:#fff;
            font-size: 14px;
            cursor: pointer;
        }
    }
</style>


<template>
    <div>
        <div class="page-title" v-show="isShowOrder">
            <div class="btn">
                <el-button type="info" class="declare" @click="exportCreditOrder">
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
                        <el-select placeholder="请选择类型" v-model="filters.welfareType">
                            <el-option label="全部" value="0"></el-option>
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
            <el-table :data="tableData" border resizable highlight-current-row style="width: 100%;" border>
                <el-table-column type="selection" align="center">
                </el-table-column>
                <el-table-column prop="orderId" label="订单编号" sortable align="center">
                </el-table-column>
                <el-table-column prop="welfareType" label="福利类型" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" width="180">
                </el-table-column>
                <el-table-column prop="consume_point" label="消费积分" align="center">
                </el-table-column>
                <el-table-column prop="state" label="订单状态" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="seeOrderDetail(scope.row.orderId)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                </el-pagination>
            </el-col>
        </div>
        <!-- 订单详情 -->
        <div class="page-center extend-center" v-show="isShowOrderDetail">
            <div class="printcontent">
                <div class="center-top">
                    <div class="scorecountbox">
                        <div class="title">积分统计</div>
                        <div class="scoreallcount">{{creditOrderDesc.consume_point}}</div>
                        <div class="scorecount">每人发放<span>{{creditOrderDesc.consume_point/creditOrderDesc.totalNums}}</span></div>
                    </div>
                    <div class="staffcountbox">
                        <div class="title">人员分布</div>
                        <div class="staffcount">
                            <div>总人数: <span>{{creditOrderDesc.totalNums}}</span></div>
                        </div>
                    </div>
                </div>
                <div class="center-content">
                    <div>
                        <div class="title">福利类型</div>
                        <div class="content textright">{{creditOrderDesc.welfareType}}</div>
                    </div>
                    <div>
                        <div class="title">发放时间</div>
                        <div class="content textright">{{creditOrderDesc.createTime}}</div>
                    </div>
                    <div>
                        <div class="title">邮件寄语</div>
                        <div class="content">
                            {{creditOrderDesc.blessMsg}}
                        </div>
                    </div>
                    <div> 
                        <!-- 全体员工 -->
                        <div class="title">发放对象</div>
                        <div class="content textright">
                            {{creditOrderDesc.postTypeName}}
                            <el-button type="primary" @click="gotoExtendEmpList(creditOrderDesc.orderId,creditOrderDesc.welfareType)">详细发放人员</el-button>
                        </div>
                        <!-- 特定人员 -->
                        <div class="listbox" v-show="specialEmp">
                            <div class="stafflist">
                                <el-tag v-for="tag in extendEmpArr" :key="tag" closable class="tagStyle"
                                    :disable-transitions="false" @close="handleClose(tag)">
                                    {{tag}}
                                </el-tag>
                            </div>
                        </div>
                        <!-- excel发放 -->

                        <!-- 部门发放 -->
                        <div class="listbox" v-show="deportExtend">
                            <el-table style="width:100%" :data="creditExtendData">
                                <el-table-column prop="depName" label="部门名称" align="center"></el-table-column>
                                <el-table-column prop="nums" label="部门人数" align="center"></el-table-column>
                                <el-table-column prop="point" label="发放积分数" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="center-footer no-print">
                <el-button type="primary" @click="printPage">打印</el-button>
                <el-button type="primary" @click="goBackPrev">返回</el-button>
            </div>
        </div>
        <!-- 订单详情-发放名单 -->
        <div class="page-center" v-show="isShowExtendList">
            <div class="searchBar">
                <div class="goback">
                    <el-button type="info" @click="returnList">返回列表</el-button>
                </div>
                <div class="exportbox" @click="exportOrderDetail">导出excel</div>
            </div>
            <el-table :data="extendEmpTable" border resizable highlight-current-row style="width: 100%;" border>
                <el-table-column type="selection" align="center">
                </el-table-column>
                <el-table-column prop="name" label="姓名" align="center">
                </el-table-column>
                <el-table-column prop="phoneNumber" label="手机号" align="center">
                </el-table-column>
                <el-table-column prop="welType" label="福利类型" align="center">
                </el-table-column>
                <el-table-column prop="departmentName" label="部门名称" align="center">
                </el-table-column>
                <el-table-column prop="point" label="获得积分" align="center">
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination @size-change="handleExtendSize" @current-change="handleExtendCurrent" :current-page="extendCurrentPage"
                    :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="extendTotalSize">
                </el-pagination>
            </el-col>
        </div>
    </div>
</template>
<script>
import authUnils from '../../../common/authUnils'
import fileDownload from 'js-file-download'
import moment from 'moment'
export default{
    data(){
        return{
            isShowOrder:true,
            isShowOrderDetail:false,
            isShowExtendList:false,
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
            //订单详情
            specialEmp:false,
            deportExtend:false,
            tableHeader:{
                background:"#A4AABE",
                color:"#fff"
            },
            creditExtendData:[],
            extendEmpArr:[],
            postType:"2",
            creditDescParams:{
                orderId: "",
                pageNum: 1,
                pageSize: 10,
                state: ""
            },
            creditOrderDesc:{},
            //发放人员
            extendEmpTable:[],
            extendCurrentPage:1,
            extendTotalSize:0,
            extendEmpParams:{
                orderId: "",
                pageNum: 1,
                pageSize: 10,
                state: ""
            },
            welType:"",
            orderId:""
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
            this.filters.endTime=this.formatDate(this.value[1])
        },
        //显示订单列表
        getPagedOrder(){
            this.$axios.post("/api/api/integral/showOrder",this.filters).then(res=>{
                if(res.status==200){
                    if(res.data.code==1000){
                        this.tableData=res.data.data.content
                        this.totalSize=res.data.data.totalSize
                    }else{
                        this.$alert(res.data.message,"信息")
                    }
                }
            })
        },
        getSearchResult(){
            this.getPagedOrder()
        },
        handleSizeChange(val){
            this.filters.pageSize=val
            this.getPagedOrder()
        },
        handleCurrentChange(val){
            this.filters.pageNum=val
            this.getPagedOrder()
        },
        //导出excel
        exportCreditOrder(){
            this.$axios({
                url:"/api/api/integral/exportExcelIntegarlOrder",
                method:"get",
                params:this.filters,
                responseType:"arraybuffer"
            }).then(res=>{
                if(res){
                    // let blob=new Blob([res.data],{type:"application/vnd.ms-excel"})
                    // let objectUrl=URL.createObjectURL(blob)
                    // window.location.href=objectUrl
                    fileDownload(res.data,"积分发放订单记录"+moment(new Date()).format("YYYY-MM-DD")+".xls")
                }
            })
        },
        // 查看详情
        seeOrderDetail(id){
            this.orderId=id
            this.isShowOrder=false
            this.isShowOrderDetail=true
            this.isShowExtendList=false
            this.creditDescParams.orderId=id
            this.$axios.post("/api/api/integral/orderDetail",this.creditDescParams).then(res=>{
                if(res.data.code==1000){
                    this.creditOrderDesc=res.data.data
                    this.postType=res.data.data.postType
                    if(this.postType=="1"){
                        this.specialEmp=false
                        this.deportExtend=false
                    }else if(this.postType=="2"){
                        this.specialEmp=true
                        this.deportExtend=false
                        this.extendEmpArr=JSON.parse(res.data.data.msg)
                    }else if(this.postType=="7"){
                        // this.specialEmp=false
                        // this.deportExtend=true
                    }else if(this.postType=="4"){
                        this.specialEmp=false
                        this.deportExtend=true
                        this.creditExtendData=JSON.parse(res.data.data.msg)
                    }
                }
            })
        },
        handleClose(tag){
            this.extendEmpArr.splice(this.extendEmpArr.indexOf(tag), 1)
        },
        //详细发放人员
        gotoExtendEmpList(id,type){
            this.isShowOrder=false
            this.isShowOrderDetail=false
            this.isShowExtendList=true
            this.extendEmpParams.orderId=id
            this.welType=type
            this.getOrderDetailEmpList()
        },
        //打印
        printPage(){
            let newWindow = window.open("_blank")
            let codestr = document.querySelector(".printcontent").innerHTML
            newWindow.document.write(codestr)
            newWindow.document.close()
            newWindow.print()
            return true
        },
        //返回
        goBackPrev(){
            this.isShowOrder=true
            this.isShowOrderDetail=false
            this.isShowExtendList=false
        },
        //订单详情发放人员列表
        getOrderDetailEmpList(){
            this.$axios.post("/api/api/integral/orderDetailEmp",this.extendEmpParams).then(res=>{
                console.log(res)
                if(res.status==200){
                    if(res.data.code==1000){
                        res.data.data.content.forEach(item=>{
                            item["welType"]=this.welType
                        })
                        this.extendEmpTable=res.data.data.content
                        this.extendTotalSize=res.data.data.totalSize
                    }
                }
            })  
        },
        handleExtendSize(val){
            this.extendEmpParams.pageSize=val
            this.getOrderDetailEmpList()
        },
        handleExtendCurrent(val){
            this.extendEmpParams.pageNum=val
            this.getOrderDetailEmpList()
        },
        //返回列表
        returnList(){
            this.isShowOrder=true
            this.isShowOrderDetail=false
            this.isShowExtendList=false
        },
        //导出excel
        exportOrderDetail(){
            this.$axios.get("/api/api/integral/exportExcelIntegarlOrderDes",{
                params:{
                    orderId:this.orderId
                },
                responseType:"arraybuffer"
            }).then(res=>{
                if(res){
                    fileDownload(res.data,"积分发放订单详情.xls")
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
    .extend-center{
        margin: 30px auto;
        width: 880px;
        padding:0;
        .printcontent{
            .center-top{
                padding: 30px 50px;
                border-bottom: 1px solid #E9ECEF;
                overflow: hidden;
                div{
                    float: left;
                    width: 368px;
                }
                .scorecountbox{
                    margin-right: 36px;
                    .title{
                        background: #F7F8F9;
                        border: 1px solid #F7F8F9;
                        border-radius: 100px;
                        padding-left: 16px;
                        font-size: 14px;
                        color: #3A4D62;
                        letter-spacing: 0;
                        height: 30px;
                        line-height: 30px;
                    }
                    .scoreallcount{
                        font-family: Roboto-Regular;
                        font-size: 54px;
                        color: #9ACC6A;
                        letter-spacing: 0;
                        text-align: center;
                        margin-top: 30px;
                        margin-bottom: 20px;
                    }
                    .scorecount{
                        font-size: 14px;
                        color: #9ACC6A;
                        letter-spacing: 0;
                        text-align: center;
                    }
                }
                .staffcountbox{
                    .title{
                        background: #F7F8F9;
                        border: 1px solid #F7F8F9;
                        border-radius: 100px;
                        padding-left: 16px;
                        font-size: 14px;
                        color: #3A4D62;
                        letter-spacing: 0;
                        height: 30px;
                        line-height: 30px;
                    }
                    .staffcount{
                        margin-top: 14px;
                        div{
                            font-size: 14px;
                            color: #7B7D7F;
                            letter-spacing: 0;
                            padding: 14px 0px;
                            border-bottom: 1px solid #E9EBEE;
                        }
                    }
                }
            }
            .center-content{
                border-bottom: 1px solid #E9ECEF;
                div{
                    overflow: hidden;
                }
                .title{
                    padding: 40px 0px 40px 50px;
                    float: left;
                    font-size: 14px;
                    color: #3A4D62;
                    letter-spacing: 0;
                }
                .content{
                    padding: 0px 50px 0px 0px;
                    height: 100px;
                    line-height: 100px;
                    float: right;
                    width: 500px;
                    font-size: 14px;
                    color: #7B7D7F;
                    letter-spacing: 0;
                    border-bottom: 1px solid #E9ECEF;
                }
                .textright{
                    text-align: right;
                }
                .listbox{
                    padding: 20px 50px 40px;
                    clear: both;
                    .stafflist{
                        background: #FFFFFF;
                        border: 1px solid #E9ECEF;
                        overflow: auto;
                        padding-bottom: 10px;
                        height: 150px;
                    }
                }
            }
        }
        .center-footer{
            padding: 40px 0px;
            text-align: center;
            .el-button{
                width: 214px;
            }
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


<template>
    <div class="page-wrapper">
        <div class="wrapper-title">
            <span class="line"></span>
            <span class="title">企业公告</span>
        </div>
        <div class="wrapper-center">
            <div class="left">
                <el-tabs v-model="activeName" tab-position="right" @tab-click="handleTab">
                    <el-tab-pane label="发布企业公告" name="first"></el-tab-pane>
                    <el-tab-pane label="企业公告列表" name="second"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="right extendNotice" v-show="isShowExtendNotice">
                <div v-show="isShow_extend">
                    <el-form label-position="right" label-width="100px">
                        <el-form-item label="公告标题">
                            <el-input v-model="addNoticeParams.content"></el-input>
                        </el-form-item>
                        <el-form-item label="公告内容">
                            <el-input type="textarea" v-model="addNoticeParams.title"></el-input>
                        </el-form-item>
                        <el-form-item label="接收部门">
                            <el-table style="width:660px;margin-top:20px;" :data="tableData" :header-row-style="tableHeader" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" align="center"></el-table-column>
                                <el-table-column prop="displayName" label="部门名称" align="center"></el-table-column>
                                <el-table-column prop="memberCount" label="部门人数" align="center"></el-table-column>
                            </el-table>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="releaseNotice">发布</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-show="isShow_success" class="success">
                    <img src="../../assets/img/successful.png">
                    <div class="statusname">发放成功！</div>
                    <div class="btnbox">
                        <el-button type="primary" @click="rePublish">再次发布</el-button>
                        <el-button @click="seeNoticeList">查看公告</el-button>
                    </div>
                </div>
            </div>
            <div class="right noticeList" v-show="isShowNoticeList">
                <div v-show="isShow_List">
                    <div class="searchBar">
                        <el-form :inline="true">
                            <el-form-item label="发布日期：">
                                <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleDate">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="info">搜索</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <el-table :data="noticeList" border resizable highlight-current-row style="width: 100%;">
                        <el-table-column type="selection" align="center">
                        </el-table-column>
                        <el-table-column prop="id" label="公告编号" sortable align="center">
                        </el-table-column>
                        <el-table-column prop="title" label="公告标题" align="center">
                        </el-table-column>
                        <el-table-column prop="createTime" label="发布时间" align="center">
                        </el-table-column>
                        <el-table-column prop="nums" label="接收人员数" align="center">
                        </el-table-column>
                        <el-table-column label="操作" sortable align="center">
                            <template slot-scope="scope">
                                <el-button type="text" @click="seeNoticeDetail(scope.row.id)">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="toolbar">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                            :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                        </el-pagination>
                    </div>
                </div>
                <div v-show="isShow_Detail">
                    <div class="noticeDetail">
                        <table cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td class="title">公告标题</td>
                                    <td colspan="3" class="content">{{announceDetail.title}}</td>
                                </tr>
                                <tr>
                                    <td class="title">公告内容</td>
                                    <td colspan="3" class="content noticecontent">{{announceDetail.content}}</td>
                                </tr>
                                <tr>
                                    <td class="title">接收部门</td>
                                    <td colspan="3" class="content departmentcontent">
                                        <span v-for="(item,index) in announceDetail.depts" :key="index">{{item}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title">接收人员数</td>
                                    <td class="content">{{announceDetail.nums}}</td>
                                    <td class="title">发布时间</td>
                                    <td class="content">{{announceDetail.createTime}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="backList">
                        <el-button type="primary" @click="goBackList">返回列表</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import authUnils from '../../common/authUnils'
import qs from 'queryString'
export default{
    data(){
        return{
            tableHeader:{
                background:"#A4AABE",
                color:"#fff"
            },
            tableData:[],
            // 此处出现的问题是：当名字使用extendNotice和noticeList时就会不起作用斌给会报错
            isShowExtendNotice:true,
            isShowNoticeList:false,
            isShow_List:true,
            isShow_Detail:false,
            isShow_extend:true,
            isShow_success:false,
            activeName:"",
            value:"",
            filters:{
                pageNum: 1,
                pageSize: 10,
                startTime: "",
                endTime: ""
            },
            currentPage:1,
            totalSize:0,
            noticeList:[],
            //发布公告参数
            addNoticeParams:{
                configId: "",
                content: "",
                nums: "",
                title: ""
            },
            selectedDepList:[],
            tempStr:"",
            totalNums:0,
            announceDetail:{}
        }
    },
    methods:{
        handleTab(tab){
            if(tab.name=="first"){
                this.isShowExtendNotice=true
                this.isShowNoticeList=false
                this.isShow_extend=true
                this.isShow_success=false
                this.showDepartmentList()
            }else if(tab.name=="second"){
                this.isShowExtendNotice=false
                this.isShowNoticeList=true
                this.getNoticeList()
            }
        },
        //处理时间改变
        handleDate(){
            if(this.value==null){
                return 
            }
            this.filters.startTime=this.formatDate(this.value[0])
            this.filters.endTime=this.formatDate(this.value[1])
        },
        //公告列表
        getNoticeList(){
            this.$axios.post("/api/api/announcement/info",this.filters).then(res=>{
                if(res.status==200){
                    if(res.data.code==1000){
                        this.noticeList=res.data.data.content
                        this.totalSize=res.data.data.totalSize
                    }
                }
            })
        },
        handleSizeChange(val){
            this.filters.pageSize=val
            this.getNoticeList()
        },
        //分页操作
        handleCurrentChange(val){
            this.filters.pageNum=val
            this.getNoticeList()
        },
        handleSelectionChange(val){
            this.selectedDepList=val
        },
        //发布公告
        releaseNotice(){
            this.selectedDepList.forEach(item=>{
                this.tempStr+=","+item.organizationUnitId
                this.totalNums+=item.memberCount
            })
            this.addNoticeParams.configId=this.tempStr.substr(1)
            this.addNoticeParams.nums=this.totalNums.toString()
            this.$axios.post("/api/api/announcement/do",this.addNoticeParams,).then(res=>{
                if(res.status==200){
                    if(res.data.code==1000){
                        this.isShow_success=true
                        this.isShow_extend=false
                    }
                }
            })
        },
        rePublish(){
            this.isShow_success=false
            this.isShow_extend=true
        },
        seeNoticeList(){
            this.isShowExtendNotice=false
            this.isShowNoticeList=true
            this.isShow_List=true
            this.isShow_Detail=false
            if(this.isShow_List){
                this.activeName="second"
            }else{
                this.activeName="first"
            }
        },
        //查看详情
        seeNoticeDetail(id){
            this.isShow_List=false
            this.isShow_Detail=true
            this.$axios.get("/api/api/announcement/desc?id="+id).then(res=>{
                if(res.data.code==1000){
                    this.announceDetail=res.data.data
                }
            })
        },
        goBackList(){
            this.isShow_List=true
            this.isShow_Detail=false
        },
        showDepartmentList(){
            this.$axios.post("/api/api/organize/showDep",qs.stringify({include:true})).then(res=>{
                if(res.data.code==1000){
                    this.tableData=res.data.data.filter(item=>{
                        if(item.memberCount!=0){
                            return true
                        }else{
                            return false
                        }
                    })
                }
            })
        },
    },
    mounted(){
        if(this.$route.params.flag=="1"){
            this.activeName="first"
            this.isShowNoticeList=false
            this.isShowExtendNotice=true
            this.showDepartmentList()
        }
        if(this.$route.params.flag=="2"){
            this.activeName="second"
            this.isShowNoticeList=true
            this.isShowExtendNotice=false
            this.getNoticeList()
        }
    }
}
</script>
<style lang="scss" scoped>
    .page-wrapper{
        height:924px;
    }
    .left{
        float: left;
        background: #FFFFFF;
        box-shadow: 0 0 2px 0 rgba(58, 77, 98, 0.20);
        padding: 28px 0px;
        width: 223px;
        .el-tabs{
            padding-right:99px;
            .el-tabs__header{
                margin:0;
                border:1px solid #333;
            }
        }
    }
    .right{
        background: #FFFFFF;
        box-shadow: 0 0 2px 0 rgba(58, 77, 98, 0.20);
        margin-left: 243px;
        .searchBar{
            background-color: #A4AABE;
            .el-form{
                padding-left:20px;
                .el-form-item{
                    margin:10px 0;
                }
            }
        }
        .toolbar{
            margin-top: 10px;
            background-color: #f1f2f7;
            text-align: right;
        }
        .success{
            img{
                display: block;
                width:256px;
                margin: 128px auto 20px;
            }
            .statusname{
                text-align: center;
                font-size: 20px;
                color: #9ACC6A;
                margin-bottom: 36px;
            }
            .btnbox{
                text-align: center;
                margin-bottom: 20px;
            }
        }
    }
    .extendNotice{
        padding:80px;
        .el-form{
            width:750px;
            margin:0 auto;
        }
    }
    .noticeList{
        padding:20px;
        table{
            width: 100%;
            background: #F7F8F9;
            border-top: 1px solid #E9ECEF;
            border-left: 1px solid #E9ECEF;
            tr{
                display: table-row;
                vertical-align: inherit;
                border-color: inherit;
                td{
                    border-bottom: 1px solid #E9ECEF;
                    border-right: 1px solid #E9ECEF;
                }
            }
            .title{
                font-size: 14px;
                color: #3A4D62;
                letter-spacing: 0;
                padding: 21px 30px;
                width: 60px;
            }
            .content{
                vertical-align: top;
                padding: 21px 30px;
                font-size: 14px;
                color: #7B7D7F;
                letter-spacing: 0;
            }
            .noticecontent{
                height: 261px;
            }
            .departmentcontent{
                height: 100px;
                span{              
                    float: left;
                    height: 25px;
                    line-height: 25px;
                    padding: 0px 10px;
                    background: #FFFFFF;
                    border: 1px solid #A4AABE;
                    border-radius: 3px;
                    font-size: 12px;
                    color: #8D9AA9;
                    letter-spacing: 0;
                    margin-right: 10px;
                }
            }
        }
    }
    .backList{
        margin-top: 20px;
    }
</style>


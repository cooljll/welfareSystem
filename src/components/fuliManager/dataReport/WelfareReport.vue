<template>
    <div>
        <div class="page-title">{{$route.name}}</div>
        <div class="page-center">
            <div class="searchBar">
                <el-form :inline="true">
                    <el-form-item label="报告日期：">
                        <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleDate">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="getSearchResult">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="reportData" v-show="isShowReportData">
                <el-row>
                    <el-col class="reportList" :xs="24" :md="12" :lg="8" v-for="(item,index) in reportDataList" :key="index">
                        <div class="bgc" href="http://139.224.28.8:8070/ymn_managementsystem/upload/FuliReport/金划算科技股份有限公司_2017-02-08_691494_.pdf" target="_blank" download="">
                            <div class="img">
                                <img src="../../../assets/img/bgground.png">
                            </div>
                            <div class="title">
                                <p>金划算科技股份有限公司</p>
                                <h3>{{item.reportname}}</h3>
                            </div>
                        </div>
                        <div class="down">
                            <div class="left">{{item.createtime}}</div>
                            <div class="right">
                                <a href="http://139.224.28.8:8070/ymn_managementsystem/upload/FuliReport/金划算科技股份有限公司_2017-02-08_691494_.pdf" target="_blank" download="">
                                    <img src="../../../assets/img/Rectangle_9.png">下载
                                </a>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="nonData" v-show="isShowNotData">
                <img src="../../../assets/img/dataerror.png">
                <span>暂无福利报告</span>
            </div>
        </div>
    </div>
</template>
<script>
import authUnils from '../../../common/authUnils'
export default{
    data(){
        return{
            value:"",
            filters:{
                startTime:"",
                lastTime:"",
                pageNum:1,
                pageSize:10
            },
            isShowReportData:false,
            isShowNotData:true,
            reportDataList:[]//报告列表
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
        //福利报告
        getWelfareReport(){
            this.$axios.post("/api/api/enterprise/getWelfareReport",this.filters,{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                console.log(res)
                if(res.status==200){
                    if(res.data.code==1000){
                        if(res.data.data.content.length!=0){
                            this.reportDataList=res.data.data.content
                            this.isShowReportData=true
                            this.isShowNotData=false
                        }else{
                            this.isShowReportData=false
                            this.isShowNotData=true
                        }
                        // this.$alert(res.data.message,"信息").then(()=>{
                        //     this.handleStep4()
                        // })
                    }
                }
            })
        },
        getSearchResult(){
            this.getWelfareReport()
        }
    },
    mounted(){
        this.getWelfareReport()
    }
}
</script>
<style lang="scss" scoped>
    .page-center{
        padding:25px 20px;
        .reportData{
            margin-top: 25px;
            position: relative;
            .reportList{
                padding:0 15px;
                position: relative;
                margin-bottom: 40px;
                box-sizing: border-box;
                .bgc{
                    width:100%;
                    height:214px;
                    // border: 1px solid #ccc;
                    color: #333;
                    text-decoration: none;
                    cursor: pointer;
                    .img{
                        height:214px;
                        img{
                            width: 100%;
                            height: 214px;
                            border: 0px;
                            cursor: pointer;
                        }
                    }
                    .title{
                        width: 80%;
                        text-align: center;
                        display: block;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        margin-left: -40%;
                        margin-top: -50px;
                        p{
                            font-size: 16px;
                            color: #2D2E2E;
                            letter-spacing: 0;
                            cursor: pointer;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                        h3{
                            font-size: 30px;
                            color: #7B7D7F;
                            font-weight: bold;
                            cursor: pointer;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                    }
                }
                .down{
                    background: #F7F8F9;
                    padding: 15px;
                    overflow: hidden;
                    .left{
                        float: left;
                        font-size: 14px;
                        color: #2D2E2E;
                    }
                    .right{
                        float: right;
                        a{
                            display: inline-block;
                            margin-left: 20px;
                            font-size: 14px;
                            color: #2D2E2E;
                            cursor: pointer;
                            img{
                                width: 20px;
                                height: 20px;
                                vertical-align: -5px;
                                margin-right: 5px;
                                cursor: pointer;
                                display: inline-block;
                                border: none;
                            }
                        }
                    }
                }
            }
        }
        .nonData{
            margin-bottom: 10px;
            img{
                display: block;
                margin: 95px auto 30px;
                border:0;
                width:317px;
                height:181px;
            }
            span{
                display: block;
                text-align: center;
                font-size: 24px;
                color: #A8A9AB;
                margin-bottom: 120px;
            }
        }
    }
    
</style>
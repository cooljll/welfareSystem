<template>
    <div>
        <div class="page-center">
            <div class="printcontent">
                <div class="center-top">
                    <div class="scorecountbox">
                        <div class="title">积分统计</div>
                        <div class="scoreallcount">1</div>
                        <div class="scorecount">每人发放<span>1</span></div>
                    </div>
                    <div class="staffcountbox">
                        <div class="title">人员分布</div>
                        <div class="staffcount">
                            <div>总人数: <span>1</span></div>
                        </div>
                    </div>
                </div>
                <div class="center-content">
                    <div>
                        <div class="title">福利类型</div>
                        <div class="content textright">元旦</div>
                    </div>
                    <div>
                        <div class="title">发放时间</div>
                        <div class="content textright">2017-11-24 16:00</div>
                    </div>
                    <div>
                        <div class="title">邮件寄语</div>
                        <div class="content">
                            元旦快到了！我把收藏好的一月的喜庆，二月的春风，三月的花开，四月的快乐，五月的温馨，六月的纯真，
                            七月的热情，八月的桂香，九月的骄阳，十月的收获，十一月的感恩，十二月的纯洁装进诚意的盒子里，用关怀的蝴蝶结装饰送给你，元旦快乐！
                        </div>
                    </div>
                    <!-- 全体员工 -->
                    <div v-show="allEmp"> 
                        <div class="title">发放对象</div>
                        <div class="content textright">全体员工
                            <router-link to="/OrderExtend_Detail">
                                <el-button type="primary">详细发放人员</el-button>
                            </router-link>
                        </div>
                    </div>
                    <!-- 特定人员 -->
                    <div v-show="specialEmp">
                        <div class="title">发放对象</div>
                        <div class="content textright">特定人员发放
                            <router-link to="/OrderExtend_Detail">
                                <el-button type="primary">详细发放人员</el-button>
                            </router-link>
                        </div>
                        <div class="listbox">
                            <div class="stafflist">
                                <el-tag v-for="tag in extendEmpArr" :key="tag" closable
                                    :disable-transitions="false" @close="handleClose(tag)">
                                    {{tag}}
                                </el-tag>
                            </div>
                        </div>
                    </div>
                    <!-- 部门发放 -->
                    <div v-show="deportExtend">
                        <div class="title">发放对象</div>
                        <div class="content textright">部门发放
                            <router-link to="/OrderExtend_Detail">
                                <el-button type="primary">详细发放人员</el-button>
                            </router-link>
                        </div>
                        <div class="listbox">
                            <el-table style="width:100%" :data="creditExtendData" :header-row-style="tableHeader">
                                <el-table-column prop="name" label="部门名称" align="center"></el-table-column>
                                <el-table-column prop="nums" label="部门人数" align="center"></el-table-column>
                                <el-table-column label="发放积分数" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scores"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="center-footer no-print">
                <el-button type="primary" @click="printPage">打印</el-button>
                <router-link to="/CreditExtend_Order">
                    <el-button type="primary">返回</el-button>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import authUnils from "../../../common/authUnils"
export default{
    data(){
        return{
            allEmp:true,
            specialEmp:false,
            deportExtend:false,
            tableHeader:{
                background:"#A4AABE",
                color:"#fff"
            },
            creditExtendData:[],
            extendEmpArr:["张三","李四","王五","赵六","田七"],
            postType:"2",
            orderId:""
        }
    },
    methods:{
        handleClose(tag){
            this.extendEmpArr.splice(this.extendEmpArr.indexOf(tag), 1)
        },
        //打印
        printPage(){
            var div_print=document.querySelector(".printcontent")
            var newStr=div_print.innerHTML
            var oldStr=document.body.innerHTML
            document.body.innerHTML=newStr
            window.print()
            window.location.reload()
            document.body.innerHTML=oldStr
            return false
        }
    },
    mounted(){
        if(this.postType=="1"){
            this.allEmp=true
            this.specialEmp=false
            this.deportExtend=false
        }else if(this.postType=="2"){
            this.allEmp=false
            this.specialEmp=true
            this.deportExtend=false
        }else if(this.postType=="3"){
            this.allEmp=false
            this.specialEmp=false
            this.deportExtend=true
        }
        this.orderId=this.$route.params.id
        this.$axios.post("/api/api/integral/showOrder",{orderId:this.orderId},{
            headers:{
                "Authorization":authUnils.getToken()
            }
        }).then(res=>{
            console.log(res)
            if(res.status==200){
                if(res.data.code==0){
                    
                }else{
                    this.$alert(res.data.message,"信息")
                }
            }
        })
    }
}
</script>
<style lang="scss" scoped>
    .page-center{
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
</style>

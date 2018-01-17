<template>
    <div class="managerBox">
        <div class="topBox">
            <div class="default-data">
                <div class="title">
                    消费分析
                    <el-select class="month" v-model="month" @change="changeBaseData">
                        <el-option v-for="item in months" :value="item" :label="item" :key="item"></el-option>
                    </el-select>
                    <el-select class="year" v-model="year" @change="changeBaseData">
                        <el-option v-for="item in years" :value="item" :label="item" :key="item"></el-option>
                    </el-select>
                </div>
                <div class="consume">
                    <div class="scores">{{rechargeScore}}
                        <span>积分</span>
                    </div>
                    <div class="scoretitle">企业充值积分数</div>
                </div>
                <div class="consume">
                    <div class="scores">{{consumeScore}}
                        <span>积分</span>
                    </div>
                    <div class="scoretitle">企业消费积分数</div>
                </div>
                <div class="consume">
                    <div class="scores echartslist"></div>
                    <div class="scoretitle">企业消费明细</div>
                </div>
            </div>
            <div class="announcement-data">
                <div class="integral-balance">
                    <div class="title">
                        <span class="txt">积分余额</span>
                        <a class="indextitle-btn" @click="creditRechange">充值</a>
                    </div>
                    <div class="center">{{scoreBalance}}</div>
                </div>
                <div class="holiday-approaching">
                    <div class="title">
                        <span class="txt">临近节日</span>
                        <a class="indextitle-btn" @click="creditExtend">发送积分</a>
                    </div>
                    <div class="center">
                        <div>{{holiday.displayName}}</div>
                        <div style="color:#7B7D7F;font-size:12px;">{{holiday.startDate}}</div>
                    </div>
                </div>
                <div class="enterprise-announcement">
                    <div class="title">
                        <span class="txt">企业公告</span>
                        <a class="indextitle-btn" @click="enterpriseNotice">更多</a>
                    </div>
                    <div class="center">
                        {{newNoticeContent}}
                    </div>
                </div>
                <div class="enterprise-information">
                    <div class="title">
                        <span class="txt">企业资料</span>
                        <a class="indextitle-btn" @click="modifyEnterprise">修改</a>
                    </div>
                    <div class="center">
                        <div class="enterprise-name">{{enterpriseInfo.enterpriseName}}</div>
                        <div class="enterprise-id">ID {{enterpriseInfo.enterpriseCode}}</div>
                    </div>
                </div>                   
            </div>
        </div>
        <div class="bottomBox">
            <div class="bottomTitle">
                <span class="txt">基础数据统计</span>
                <div class="select">
                    <el-select v-model="currentYear" @change="handlePointRecord">
                        <el-option v-for="item in years" :value="item" :label="item" :key="item"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="bottomCenter"></div>
        </div>
    </div>
</template>
<script>
import authUnils from "../../common/authUnils"
import qs from 'queryString'
var root = process.env.API_ROOT
export default{
    data(){
        return{
            months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
            month:"",
            years:[],
            year:"", 
            currentYear:"",
            consumeData:[],
            rechargeData:[],
            newNoticeContent:"",
            enterpriseInfo:{},
            consumeScore:"",
            rechargeScore:"",
            scoreBalance:"",//企业余额
            holiday:{}
        }
    },
    methods:{
        creditRechange(){
            this.$router.push("/CreditRecharge")
        },
        creditExtend(){
            this.$router.push("/CreditExtend")
        },
        enterpriseNotice(){
            this.$router.push("/EnterpriseNotice/2")
        },
        modifyEnterprise(){
            this.$router.push("/EnterpriseInfo")
        },
        //饼图
        drawPie(year,month){
            this.$axios.post(root+"enterprise/getBaseData",qs.stringify({
                year:year,
                month:month
            })).then(res=>{
                if(res.data.code==1000){
                    this.consumeScore=Math.floor(res.data.data.totalConsume)
                    this.rechargeScore=Math.floor(res.data.data.scoreRecharge)
                    let option = {
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        calculable : true,
                        color:['#F3AC45', '#3BAB4B', '#7F8386', '#19A195' ,'#87CEEB'],
                        series : [
                            {
                                name:'访问来源',
                                type:'pie',
                                radius : '55%',
                                data:[
                                    {value:res.data.data.voucherConsume, name:'福利卷'},
                                    {value:res.data.data.postCardConsume, name:'积分卡'},
                                    {value:res.data.data.postScoreConsume, name:'积分发放'},
                                    {value:res.data.data.purchaseConsume, name:'福利采购'},
                                    {value:res.data.data.creditCard, name:'信用卡还款'}
                                ]
                            }
                        ]
                    }
                    let myChart=this.$echarts.init(document.querySelector(".echartslist"))
                    myChart.setOption(option)
                    window.onresize = myChart.resize
                }
            })
        },
        //折线图
        drawBrokenLine(){
            let option = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['消费','充值'],
                    x: 'center',
					y: "bottom",
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value} 积分'
                        }
                    }
                ],
                series : [
                    {
                        name:'消费',
                        type:'line',
                        data:this.consumeData
                    },
                    {
                        name:'充值',
                        type:'line',
                        data:this.rechargeData
                    }
                ],
                //设置绘制区域和容器大小
                grid:{
                    x:100,
                    y:20,
                    x2:30,
                    y2:50
                }
            }
            let myChart=this.$echarts.init(document.querySelector(".bottomCenter"))
            myChart.setOption(option)
            window.onresize = myChart.resize//实现自适应的效果
        },
        //积分消费充值记录
        getPointRecords(yearParams){
            this.$axios.get(root+"enterprise/getLineChartData",{
                params:{"year":yearParams}
            }).then(res=>{
                if(res.data.code==1000){
                    this.consumeData=res.data.data.consumeArray
                    this.rechargeData=res.data.data.rechargeArray
                    this.drawBrokenLine()
                }
            })
        },
        //基础数据改变
        handlePointRecord(){
            this.getPointRecords(this.currentYear)
        },
        changeBaseData(){
            this.drawPie(this.year,parseInt(this.month))
        },
        //显示最新公告信息
        showNewNotice(){
            this.$axios.post(root+"announcement/newNotice",{}).then(res=>{
                if(res.data.code==1000){
                    this.newNoticeContent=res.data.data.content
                }
            })
        },
        //企业余额
        getEnterpriseBalance(){
            this.$axios.post(root+"enterprise/getPoint",{}).then(res=>{
                if(res.data.code==1000){
                    this.scoreBalance=Math.floor(res.data.data)
                }
            })
        },
        //临近节日
        getHoliday(){
            this.$axios.post(root+"service/holiday",{}).then(res=>{
                if(res.data.code==1000){
                    this.holiday=res.data.data
                }
            })
        }
    },
    mounted(){
        this.enterpriseInfo=JSON.parse(localStorage.getItem("enterpriseInfo"))
        let date=new Date()
        this.year=date.getFullYear().toString()
        this.currentYear=date.getFullYear().toString()
        for(let i=date.getFullYear();i>=2012;i--){
            this.years.push(i.toString())
        }
        this.month=date.getMonth()+1+"月"
        this.getPointRecords(this.currentYear)
        this.drawPie(this.year,parseInt(this.month))
        this.showNewNotice()
        this.getEnterpriseBalance()
        this.getHoliday()
    }
}
</script>
<style lang="scss" scoped>
    .managerBox{
        margin: 30px 30px;
        min-width: 834px;
        .topBox{
            width: 100%;
            overflow: hidden;
            .default-data{
                float: left;
                margin-right: 1%;
                width: 49.5%;
                min-height: 346px;
                margin-bottom: 20px;
                box-shadow: 0 0 2px 0 rgba(58, 77, 98, 0.20);
                background: #fff;
                .title{
                    font-weight: bold;
                    font-size: 16px;
                    color: #2D2E2E;
                    letter-spacing: 0;
                    margin: 30px 0px 0px 40px;
                    .el-select{
                        float:right;
                        margin-top:-20px;
                        .el-input{
                            .el-input__inner{
                                height:30px !important;
                            }
                        }
                    }
                    .year{
                        width:80px;
                        margin-right: 10px;
                    }
                    .month{
                        width:72px;
                        margin-right:40px;
                    }
                }
                .consume{
                    width: 33%;
                    margin-top: 50px;
                    float: left;
                    .scores{
                        text-align: center;
                        font-size: 38px;
                        margin-top: 50px;
                        margin-bottom: 50px;
                        span{
                            font-size:14px;
                        }
                    }
                    .scoretitle{
                        text-align: center;
                        font-size: 14px;
                        color: #7B7D7F;
                    }
                    .echartslist{
                        height: 150px;
                        margin:0;
                    }
                }
            }
            .announcement-data{
                min-height:346px;
                float: right;
                width: 49.5%;
                .integral-balance,.holiday-approaching,.enterprise-announcement,.enterprise-information{
                    float: left;
                    width: 49%;
                    min-height: 163px;
                    margin-bottom: 20px;
                    box-shadow: 0 0 2px 0 rgba(58, 77, 98, 0.20);
                    background: #fff;
                    .title{
                        padding: 12px 20px 0px 20px;
                        height: 26px;
                        .txt{
                            float: left;
                            font-weight: bold;
                            font-size: 16px;
                            color: #FFFFFF;
                            letter-spacing: 0;
                        }
                        .indextitle-btn{
                            float: right;
                            height: 24px;
                            line-height: 24px;
                            background: #76C397;
                            box-shadow: 0 0 4px 0 #60B182;
                            padding: 0px 15px;
                            font-size: 12px;
                            color: #fff;
                            letter-spacing: 0;
                            cursor: pointer;
                        }
                    }
                    .center{
                        padding: 30px 0px 0px 30px;
                        font-family: "ArialMT";
                        font-size: 40px;
                        color: #fff;
                        letter-spacing: 0;
                        .enterprise-name{
                            font-family: "PingFangSC-Regular";
                            font-size: 20px;
                            color: #FFFFFF;
                            letter-spacing: 0;
                        }
                        .enterprise-id{
                            margin-top: 5px;
                            opacity: 0.5;
                            font-family: "PingFangSC-Regular";
                            font-size: 14px;
                            color: #FFFFFF;
                            letter-spacing: 0;
                        }
                    }
                }
                .integral-balance{
                    margin-right: 2%;
                    background: #76C397;
                    background: #76C397 url(../../assets/img/integral-balance.png) 100% 100% no-repeat;
                }
                .holiday-approaching{
                    background: #FFFFFF url(../../assets/img/qiqiu.png) 100% 100% no-repeat;
                    .title{
                        .txt{
                            color:#333;
                        }
                        .indextitle-btn{
                            background:#fff;
                            box-shadow: 0 0 4px 0 #ccc;
                            color:#333;
                        }
                    }
                    .center{
                        color: #2D2E2E;
                    }
                }
                .enterprise-announcement{
                    margin-right: 2%;
                    background: #FFFFFF url(../../assets/img/laba.png) 100% 100% no-repeat;
                    .title{
                        .txt{
                            color:#333;
                        }
                        .indextitle-btn{
                            background:#fff;
                            box-shadow: 0 0 4px 0 #ccc;
                            color:#333;
                        }
                    }
                    .center{
                        padding: 15px 20px;
                        font-size: 12px;
                        color: #7B7D7F;
                        letter-spacing: 0;
                        line-height: 19.42px;
                        max-height: 80px;
                        overflow: hidden;
                    }
                }
                .enterprise-information{
                    background: #76C3BD;
                    background: #76C3BD url(../../assets/img/enterprise-information.png) 100% 100% no-repeat;
                    .title{
                        .txt{
                            color:#333;
                        }
                        .indextitle-btn{
                            background:#76C3BD;
                            box-shadow: 0 0 4px 0 #bbb;
                            color:#fff;
                        }
                    }
                }
            }
        }
        .bottomBox{
            width: 100%;
            min-width: 800px;
            min-height: 719px;
            background: #FFFFFF;
            box-shadow: 0 0 2px 0 rgba(58, 77, 98, 0.20);
            padding-bottom:20px;
            .bottomTitle{
                padding: 30px 60px 0px 60px;
                overflow: hidden;
                .txt{
                    font-weight: bold;
                    font-size: 16px;
                    color: #2D2E2E;
                    letter-spacing: 0;
                    float: left;
                }
                .select{
                    float: right;
                    width:80px;
                }
            }
            .bottomCenter{
                width:100%;
                min-height: 719px;
                canvas{
                    width:100%;
                }
            }
        }
    }
</style>

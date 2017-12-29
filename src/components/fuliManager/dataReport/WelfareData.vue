<template>
    <div>
        <div class="page-title">{{$route.name}}</div>
        <el-row class="page-center">
            <el-col class="echart" :md="24" :lg="12">
                <div class="left">
                </div>
                <div class="selectBox">
                    <el-select v-model="shopParams.text" @change="handleEmpShopData">
                        <el-option v-for="item in year" :value="item" :label="item" :key="item"></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col class="echart" :md="24" :lg="12">
                <div class="right">
                    <div class="title">
                        <span class="txt">基础数据统计</span>
                        <div class="select">
                            <el-select v-model="currentYear" @change="handlePointRecord">
                                <el-option v-for="item in year" :value="item" :label="item" :key="item"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="center"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import authUnils from '../../../common/authUnils'
import qs from 'queryString'
export default{
    data(){
        return{
            year:["2017","2016","2015","2014","2013","2012"],
            currentYear:"",
            shoppingData:[],
            shopName:[],//商品名称
            shopParams:{
                text:"",
                type:"1"
            },
            consumeData:[],
            rechargeData:[]
        }
    },
    methods:{
        //圆环形
        drawPie(){
            let option = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				legend: {
					orient: 'horizontal',
					x: 'center',
					y:"bottom",
					data:this.shopName
				},
                color:["rgb(131, 178, 127)","rgb(140, 188, 187)","rgb(234, 171, 22)"],
				series: [
					{
						name:'员工购买商品类型统计',
						type:'pie',
						radius: ['46%', '60%'],
                        center:["50%","50%"],
						avoidLabelOverlap: false,
						labelLine: {
							normal: {
								show: true
							}
						}
					}
				]
			}
            let myChart=this.$echarts.init(document.querySelector(".left"))
            option.series[0].data=this.shoppingData//动态获取数据
			myChart.setOption(option)
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
            let myChart=this.$echarts.init(document.querySelector(".center"))
            myChart.setOption(option)
            window.onresize = myChart.resize//实现自适应的效果
        },
        //员工购买商品数据
        getEmpShoppingData(){
            this.$axios.post("/api/api/enterprise/getEmpShoppingData",this.shopParams).then(res=>{
                if(res.data.code==1000){
                    res.data.data.forEach(item=>{
                        this.shopName.push(item.name)
                    })
                    this.shoppingData=res.data.data
                    this.drawPie()
                }
            })
        },
        handleEmpShopData(){
            this.getEmpShoppingData()
        },
        //积分消费充值记录
        getPointRecords(yearParams){
            this.$axios.get("/api/api/enterprise/getLineChartData",{
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
        }
    },
    mounted(){
        this.drawPie()
        let date=new Date()
        this.currentYear=date.getFullYear().toString()
        this.shopParams.text=date.getFullYear().toString()
        this.getEmpShoppingData()
        this.getPointRecords(this.currentYear) 
    }
}
</script>
<style lang="scss" scoped>
    .page-center{
        padding:0;
        background: #F7F8F9 !important;
        box-shadow: none;
        .echart{
            height: 482px;
            margin-bottom:20px;
            background: #fff !important;
            box-shadow: 0 0 2px 0 rgba(58, 77, 98, 0.20);
            position: relative;
            .selectBox{
                position: absolute;
                right: 60px;
                top:30px;
                width: 80px;
            }
            .left,.right{
                height:100%;
                width:100%;
            }
            .left{
                width:400px;
                margin:0 auto;
                padding-bottom:25px;
                box-sizing: border-box;
            }
            .right{
                .title{
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
                .center{
                    min-height:425px;
                    padding-bottom:20px;
                    box-sizing: border-box;
                }
            }
        }   
    }
</style>
<template>
    <div>
        <div class="indextitle">
            <div class="indextitlebox">
                <span class="indexlefttitle">
                    欢迎进入有米拿员工管理系统
                </span>
                <div class="indexrighttitle">
                    <el-button type="info" @click="exportExcel">
                        <i class="iconfont icon-gantanhao"></i>
                        Excel导出员工
                    </el-button>
                    <el-button type="info" @click="buildQRcode">
                        <i class="iconfont icon-erweima"></i>
                        生成二维码
                    </el-button>
                </div>
            </div>
        </div>
        <div class="content-wrapper">
            <div class="centertitle">员工信息分布</div>
            <el-row class="canvas">
                <el-col class="echart" :md="24" :lg="8">
                    <div id="myChart1" :style="{width: '350px', height: '350px'}"></div>
                </el-col>
                <el-col class="echart" :md="24" :lg="8">
                    <div id="myChart2" :style="{width: '350px', height: '350px'}"></div>
                </el-col>
                <el-col class="echart" :md="24" :lg="8">
                    <div id="myChart3" :style="{width: '350px', height: '350px'}"></div>
                </el-col>
            </el-row>
        </div>
		<!-- 生成二维码弹窗 -->
		<el-dialog title="入职二维码" :visible.sync="qrcodeVisible" :close-on-click-modal="false" style="top:10%" ref="qrcode" class="erweima">
            <div class="qrcode">
				<img :src="imgUrl" alt="">
			</div>
			<div class="txt">请扫描二维码办理入职</div>
            <div slot="footer" class="dialog-footer footer-center">
                <el-button type="danger">下载</el-button>
                <el-button type="primary">打印</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import authUnils from '../../common/authUnils'
import fileDownload from 'js-file-download'
export default {
  	data () {
    	return {
			qrcodeVisible:false,
			totalEmployee:0,
			genderScope:{},
			ageScope:{},
			imgUrl:""
		}
	},
	methods:{
		drawTotal(){
			let option = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				legend: {
					orient: 'horizontal',
					x: 'center',
					y:"bottom",
					data:['总人数']
				},
				color:["#939AB1"],
				series: [
					{
						name:'总人数',
						type:'pie',
						radius: ['48%', '60%'],
						avoidLabelOverlap: false,
						labelLine: {
							normal: {
								show: true
							}
						},
						data:[
							{value:this.totalEmployee, name:'总人数'}
						]
					}
				]
			}
			let myChart = this.$echarts.init(document.querySelector("#myChart1"))
			myChart.setOption(option)
		},
		drawGender(){
			let option = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				legend: {
					orient: 'horizontal',
					x: 'center',
					y:"bottom",
					data:["其他",'男','女']
				},
				color:["#939AB1","#83B27F","#F68D87"],
				series: [
					{
						name:'总人数',
						type:'pie',
						radius: ['48%', '60%'],
						avoidLabelOverlap: false,
						labelLine: {
							normal: {
								show: true
							}
						},
						data:[
							{value:this.genderScope.other, name:'其他'},
							{value:this.genderScope.male, name:'男'},
							{value:this.genderScope.female, name:'女'}
						]
					}
				]
			}
			let myChart=this.$echarts.init(document.querySelector("#myChart2"))
			myChart.setOption(option)
		},
		drawTime(){
			let option = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				legend: {
					orient: 'horizontal',
					x: 'center',
					y:"bottom",
					data:['70后','80后','90后','00后','其他']
				},
				color:["#83B27F","#8CBCBB","#EAAB16","#F68D87","#939AB1"],
				series: [
					{
						name:'总人数',
						type:'pie',
						radius: ['48%', '60%'],
						labelLine: {
							normal: {
								show: true
							}
						},
						itemStyle: {  
							emphasis: {  
								shadowBlur: 10,  
								shadowOffsetX: 0,  
								shadowColor: 'rgba(0, 0, 0, 0.5)'  
							}  
						},
						data:[
							{value:this.ageScope.later_70, name:'70后'},
							{value:this.ageScope.later_80, name:'80后'},
							{value:this.ageScope.later_90, name:'90后'},
							{value:this.ageScope.later_00, name:'00后'},
							{value:this.ageScope.other, name:'其他'}
						] 
					}
				]
			}
			let myChart=this.$echarts.init(document.querySelector("#myChart3"))
			myChart.setOption(option)
		},
		//获取总人数
		getTotalEmp(){
			this.$axios.post("/api/api/employee/selEmpCount",false,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(res=>{
                if(res.data.code==1000){
					this.totalEmployee=res.data.data
					this.drawTotal()
				}
            })
		},
		//获取男女比例
		getGenderNums(){
			this.$axios.post("/api/api/service/genderScope",{}).then(res=>{
				if(res.data.code==1000){
					this.genderScope=res.data.data
					this.drawGender()
				}
			})
		},
		//获取年龄比例
		getAgeNums(){
			this.$axios.post("/api/api/service/ageScope",{}).then(res=>{
				if(res.data.code==1000){
					this.ageScope=res.data.data
					this.drawTime()
				}
			})
		},
		 //导出员工
        exportExcel() {
			const empLoading = this.$loading({
				lock: true,
				text: '正在载入中。。。',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
            this.$axios({
				url:"/api/api/employee/exportEmployees",
				method:"get",
				responseType:"arraybuffer"
			}).then(res=>{
				empLoading.close()
				if(res){
					// let blob=new Blob([res.data],{type:"application/vnd.ms-excel"})
					// let objectUrl=URL.createObjectURL(blob)
					// window.location.href=objectUrl
					fileDownload(res.data,"员工信息表.xls")
				}
			})
        },
		//生成二维码
		buildQRcode(){
			const loading = this.$loading({
				lock: true,
				text: '二维码生成中。。。',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			this.$axios.post("/api/api/service/qrcode",{}).then(res=>{
				loading.close()
				if(res.data.data==1000){

				}else if(res.data.code==1001){
					this.$alert(res.data.message,"信息")
				}
				this.qrcodeVisible=true
			})
		},
		//系统公告
		getSystemNotice(){
			this.$axios.post("/api/api/service/systemNotice",{}).then(res=>{
				if(res.data.code==1000){
					
				}else if(res.data.code==1001){
					this.$alert(res.data.message,"信息")
				}
			})
		},
        tipReload(){
            this.$emit('top-reload',"刷新")
        }
	},
	mounted(){
		this.getTotalEmp()
		this.getGenderNums()
		this.getAgeNums()
		// this.getSystemNotice()
	}
}
</script>
<style scoped lang="scss">
	.centertitle{
		font-size: 20px;
		color: #3A4D62;
		letter-spacing: 0;
	}
	.canvas{
		margin-top:20px;
		.echart{
			height:400px;
			div{
				margin:0 auto;
			}
		}
	}
</style>

<template>
    <div>
        <!-- 空白模板：用于实现当前路由的刷新 -->
        <!-- 公共头部 -->
        <el-row class="page-header">
			<el-col :lg="7" :md="5" :sm="6" :xs="12" class="imgbox">
				<div class="imgboxcell" @click="goBack">
					<img id="logoimg" :src="enterpriseLogoUrl">
				</div>
			</el-col>
			<el-col :lg="8" :md="8" :sm="18" :xs="12" class="header-links">
				<div class="nav_router">
					<el-menu :router="true" class="el-menu-demo" mode="horizontal" :default-active="$route.path">
						<el-menu-item v-for="(item,index) in menus" :key="index"
						:index="item.url" @click="refresh">{{item.name}}</el-menu-item>
						<!-- <el-menu-item index="/EnterpriseOverview" @click="refresh">员工管理</el-menu-item>
						<el-menu-item index="/ConsultIndex" @click="refresh">福利资讯</el-menu-item> -->
					</el-menu>
				</div>
			</el-col>
			<el-col :lg="9" :md="11" class="rightitem hidden-sm-and-down">
				<!-- 企业名称信息 -->
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner1">
						<img src="../assets/img/enterprise.png" alt="">
						{{enterpriseBaseInfo.enterpriseName}}
					</span>
					<el-dropdown-menu slot="dropdown" style="width:230px;">
						<el-dropdown-item>企业编号：{{enterpriseBaseInfo.enterpriseCode}}</el-dropdown-item>
						<el-dropdown-item>登录账号：{{loginName}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<!-- 客服 -->
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<img src="../assets/img/Customer.png" />
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="inlineKefu">在线客服</el-dropdown-item>
						<router-link to="/SpecialTeam">
							<el-dropdown-item>专属客服</el-dropdown-item>
						</router-link>
					</el-dropdown-menu>
				</el-dropdown>
				<!-- 帮助 -->
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<img src="../assets/img/help.png" />
					</span>
					<el-dropdown-menu slot="dropdown">
						<router-link :to='{path:"/HelpCenter/"+new Date().getTime()}'>
							<el-dropdown-item>商城帮助</el-dropdown-item>
						</router-link>
						<router-link :to='{path:"/FeedBack/"+new Date().getTime()}'>
							<el-dropdown-item>意见反馈</el-dropdown-item>
						</router-link>
						<router-link :to='{path:"/Requirement/"+new Date().getTime()}'>
							<el-dropdown-item>需求申请</el-dropdown-item>
						</router-link>
					</el-dropdown-menu>
				</el-dropdown>
				<!-- 通知 -->
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<img src="../assets/img/announcement.png" />
					</span>
					<el-dropdown-menu slot="dropdown">
						<router-link :to="{path:'/EnterpriseNotice/1/'+new Date().getTime()}">
							<el-dropdown-item>发布公告</el-dropdown-item>
						</router-link>
						<router-link :to="{path:'/SystemInform/'+new Date().getTime()}">
							<el-dropdown-item>系统通知</el-dropdown-item>
						</router-link>
					</el-dropdown-menu>
				</el-dropdown>
				<!-- 退出登陆 -->
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<img src="../assets/img/set.png" />
					</span>
					<el-dropdown-menu slot="dropdown">
						<router-link :to='{path:"/EnterpriseInfo/"+new Date().getTime()}'>
							<el-dropdown-item>企业资料</el-dropdown-item>
						</router-link>
						<router-link :to='{path:"/AuthManager/"+new Date().getTime()}'>
							<el-dropdown-item>账户管理</el-dropdown-item>
						</router-link>
						<router-link :to='{path:"/Log/"+new Date().getTime()}'>
							<el-dropdown-item>操作日志</el-dropdown-item>
						</router-link>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
		<div id="zhichiIframeBox" style="width: 320px; height: 480px; position: fixed; bottom: -500px;
			border-radius: 5px 5px 0px 0px; overflow: hidden; z-index: 2147483583; box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 2px; 
			right: 30px; transition: all 0.3s ease-in-out 0.1s;">
			<iframe id="zhichiIframe" 
				name="zhichiIframe" frameborder="no" scrolling="no" style="width: 100%; height: 100%; border: 0;">
			</iframe>
		</div>
        <router-view></router-view>
    </div>
</template>
<script>
import authUnils from '../common/authUnils'
var root = process.env.API_ROOT
export default {
  data(){
    return{
		isShowLogin:false,
		isShowMain:true,
		activeIndex:"",
		//企业基础信息
		enterpriseBaseInfo:{
			enterpriseName:"",
			enterpriseCode:""
		},
		loginName:"",
		enterpriseLogoUrl:"",
		inlineService:'',
		menus:[]
    }
  },
  methods:{
		logout(){
			this.$confirm("确定退出当前登陆吗？","提示",{type:'warning'}).then(()=>{
				authUnils.removeToken()
				this.$router.push("/")
			})
		},
		goBack(){
			this.$router.push("/EnterpriseOverview")
		},
		//企业信息
		getEnterpriseInfo(){
			this.$axios.post(root+"enterprise/entInfo",{}).then(res=>{
				if(res.data.code==1000){
					this.enterpriseBaseInfo.enterpriseName=res.data.data.companyName
					this.enterpriseBaseInfo.enterpriseCode=res.data.data.entCode
					localStorage.setItem("enterpriseInfo",JSON.stringify(this.enterpriseBaseInfo))
					this.enterpriseLogoUrl=res.data.data.enterpriseLogoUrl
				}
			})
		},
		refresh(){
			let userAgent = window.navigator.userAgent
			if (userAgent.indexOf("Firefox") > -1) {
				
            }else{
                this.$router.push("/Empty")
                this.$router.go(-1)
            }
		},
		//在线客服
		inlineKefu(){
			$('#zhichiIframe').attr('src','http://www.sobot.com/chat/oldpc/index.html?sysNum=467fbd68a94142e2a6c147a012b74aea&amp;from=iframe&amp;r=0.7758282746747345')
			document.getElementById("zhichiIframeBox").style.bottom="0px"
			setTimeout(function() {
				document.getElementById("zhichiIframeBox").style.bottom="-500px"
			}, 8000)
		},
		endOver(){
			document.querySelector(".surEndBtn").addEventListener('click',function(){
				document.getElementById("zhichiIframeBox").style.bottom="-500px"
			})
		}
	},
	created(){
		this.loginName=localStorage.getItem("loginName")
	},
	mounted(){
		this.getEnterpriseInfo()
		this.$axios.get(root+"menu").then(res=>{
			if(res.data.code==1000){
				res.data.data.forEach(item=>{
					let obj={}
					if(item=="福利管理"){
						obj['url']='/WelfareOverview'
					}else if(item=='员工管理'){
						obj['url']='/EnterpriseOverview'
					}else{
						obj['url']='/ConsultIndex'
					}
					obj['name']=item
					this.menus.push(obj)
				})
			}
		})
	},
	computed: {
		getFlag() {
			return this.$store.state.flag
		}
	},
	watch:{
		getFlag(val,oldVal){
			if(val){
				this.getEnterpriseInfo()
				// this.$store.commit("notReLoad")
			}
		}
	}
}
</script>

<style lang="scss" scoped>

</style>

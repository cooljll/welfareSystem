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
						<el-menu-item index="/WelfareOverview" @click="refresh">福利管理</el-menu-item>
						<el-menu-item index="/EnterpriseOverview" @click="refresh">员工管理</el-menu-item>
						<el-menu-item index="/ConsultIndex" @click="refresh">福利咨询</el-menu-item>
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
						<el-dropdown-item>在线客服</el-dropdown-item>
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
						<router-link to="/HelpCenter">
							<el-dropdown-item>商城帮助</el-dropdown-item>
						</router-link>
						<router-link to="/FeedBack">
							<el-dropdown-item>意见反馈</el-dropdown-item>
						</router-link>
						<router-link to="/Requirement">
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
						<router-link to="/SystemInform">
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
							<el-dropdown-item>权限管理</el-dropdown-item>
						</router-link>
						<router-link :to='{path:"/Log/"+new Date().getTime()}'>
							<el-dropdown-item>操作日志</el-dropdown-item>
						</router-link>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
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
		enterpriseLogoUrl:""
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
			this.$router.push("/Empty")
			this.$router.go(-1)
		}
	},
	created(){
		this.loginName=localStorage.getItem("loginName")
	},
	mounted(){
        this.getEnterpriseInfo()
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
				this.$store.commit("notReLoad")
			}
		}
	}
}
</script>

<style lang="scss" scoped>

</style>

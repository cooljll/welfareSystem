<template>
    <div class="page-wrapper">
        <div class="wrapper-title">
            <span class="line"></span>
            <span class="title">权限管理</span>
            <div class="btn">
                <el-button type="info" @click="addAccount">
                    <i class="iconfont icon-icon02"></i>
                    添加账号
                </el-button>
            </div>
        </div>
        <div class="wrapper-center">
            <el-table :data="tableData" resizable highlight-current-row style="width: 100%;" stripe :header-row-style="headerStyle">
                <el-table-column prop="accountName" label="账号名称" align="center">
                </el-table-column>
                <el-table-column prop="accountType" label="账号类型" align="center">
                </el-table-column>
                <el-table-column prop="loginName" label="用户名" align="center">
                </el-table-column>
                <el-table-column prop="state" label="状态" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="modifyPassword(scope.row)">查看</el-button>
                        <el-button type="text" class="handleStyle" v-show="scope.row.state=='冻结'||scope.row.accountType=='主账号'?false:true" @click="frozenAccount(scope.row.userGuid)">冻结</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 添加账号弹窗(子账号修改密码) -->
        <el-dialog title="账号信息" :visible.sync="addAccountVisible" :close-on-click-modal="false" class="addAccountDialog" style="top:8%">
            <el-form label-position="right" label-width="80px" class="form-center">
                <el-form-item label="账号名称" prop="name">
                    <el-input v-model="addAccountParams.accountName"></el-input>
                </el-form-item>
                <el-form-item label="登陆名称" prop="jobNum">
                    {{addAccountParams.loginName}}
                </el-form-item>
                <el-form-item label="账号类型" prop="phoneNumber">
                    子账号
                </el-form-item>
                <el-form-item label="账号密码" prop="idenfity">
                    <el-input type="password" v-model="addAccountParams.loginPwd"></el-input>
                </el-form-item>
            </el-form>
            <div class="permission">
                <p>权限管理</p>
                <div class="get-item">
                    <el-tag v-for="tag in tags" :key="tag" closable class="authTagStyle"
                        :disable-transitions="false" @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                </div>
                <div class="set-item">
                    <el-button v-for="item in authList" :key="item" @click="handleAuthManager(item)">{{item}}</el-button>
                </div>
            </div>
            <div slot="footer" class="dialog-footer footer-center">
                <el-button type="primary" @click="addSubAccountSubmit" v-show="isShowAdd">保存</el-button>
                <el-button type="primary" @click="saveSubAccountPwd" v-show="isShowUpdate">保存</el-button>
                <el-button @click.native="addAccountVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 账号密码修改弹窗(主账号修改密码) -->
        <el-dialog title="账号信息" :visible.sync="updateAccountVisible" :close-on-click-modal="false" class="updateAccountPwdDialog" style="top:8%">
            <el-form label-position="right" label-width="80px" class="form-center">
                <el-form-item label="账号名称">
                    {{accountInfo.accountName}}
                </el-form-item>
                <el-form-item label="登陆名称">
                    {{accountInfo.loginName}}
                </el-form-item>
                <el-form-item label="账号类型">
                    {{accountInfo.accountType}}
                </el-form-item>
                <el-form-item label="旧密码" prop="loginPwd_old">
                    <el-input  v-model="updatePwdParams.loginPwd_old" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="loginPwd_new">
                    <el-input  v-model="updatePwdParams.loginPwd_new" type="password"></el-input>
                </el-form-item>
                <el-form-item label="重新输入" prop="loginPwd_check">
                    <el-input v-model="againPassword" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer footer-center">
                <el-button type="primary" @click="updatePwdSubmit">保存</el-button>
                <el-button @click.native="addAccountVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import authUnils from '../../common/authUnils'
import qs from 'queryString'
var root = process.env.API_ROOT
export default{
    data(){
        return{
            headerStyle:{
                color:"#000",
                backgroundColor:"#666666"
            },
            authList:[],
            tableData:[],
            addAccountVisible:false,
            updateAccountVisible:false,
            isShowAdd:false,
            isShowUpdate:false,
            accountInfo:{},
            // 密码修改(主账号)
            updatePwdParams:{
                loginPwd_new:"",
                loginPwd_old:""
            },
            againPassword:"",
            tags:[],//标签数组
            //添加账号参数
            addAccountParams:{
                accountName:"",
                authority:"",
                loginName:"",
                loginPwd:""
            }
        }
    },
    methods:{
        //企业账号列表信息
        getAccountList(){
            this.$axios.post(root+"account/info",{}).then(res=>{
                if(res.data.code==1000){
                    this.tableData=res.data.data
                }
            })
        },
        //获取子账号名称
        getSubAccountName(){
            this.$axios.post(root+"account/accountName",{}).then(res=>{
                if(res.data.code==1000){
                    this.addAccountParams.loginName=res.data.data
                }else if(res.data.code==1001){
                    this.$alert(res.message,"信息")
                }
            })
        },
        //获取权限列表
        getAuthList(){
            this.$axios.post(root+"account/authorityList",{}).then(res=>{
                if(res.data.code==1000){
                    this.authList=res.data.data
                }
            })
        },
        addAccount(){
            //清空
            for(var key in this.addAccountParams){
                this.addAccountParams[key]=""
            }
            this.tags=[]
            this.isShowAdd=true
            this.isShowUpdate=false
            this.addAccountVisible=true
            this.getSubAccountName()
            this.getAuthList()
        },
        //处理权限管理
        handleAuthManager(val){
            if(!this.tags.includes(val)){
                this.tags.push(val)
            }else{
                return
            }
        },
        //标签删除
        handleClose(tag){
            this.tags.splice(this.tags.indexOf(tag), 1)
        },
        //添加子账号
        addSubAccountSubmit(){
            this.addAccountParams.authority=this.tags.join(",")
            this.$axios.post(root+"account/addAccount",this.addAccountParams).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.addAccountVisible=false
                        this.getAccountList()
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.message,"信息").then(()=>{
                        this.addAccountVisible=true
                    })
                }
            })
        },
        //查看权限
        seeAuth(guid){
            this.$axios.post(root+"account/authority",qs.stringify({userGuid:guid})).then(res=>{
                if(res.data.code==1000){
                    this.tags=res.data.data
                }
            })
        },
        //查看
        modifyPassword(obj){
            this.accountInfo=obj
            if(obj.accountType=="主账号"){
                this.updatePwdParams.loginName=obj.loginName
                this.updatePwdParams.userGuid=obj.userGuid
                this.updateAccountVisible=true
            }
            if(obj.accountType=="子账号"){
                this.addAccountParams.accountName=obj.accountName
                this.addAccountParams.loginName=obj.loginName
                this.isShowAdd=false
                this.isShowUpdate=true
                this.addAccountVisible=true
                this.getAuthList()
                this.seeAuth(obj.userGuid)
            }
        },
        //修改子账号密码
        saveSubAccountPwd(){
            this.$axios.post(root+"account/updateSubPwd",{
                guid:this.accountInfo.userGuid,
                loginName:this.accountInfo.loginName,
                pwd:this.addAccountParams.loginPwd
            }).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.addAccountVisible=false
                        this.getAccountList()
                    })
                }
                if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        //修改主账号密码
        updatePwdSubmit(){
            if(this.updatePwdParams.loginPwd_new!=this.againPassword){
                this.$alert("新密码不一致","信息")
            }else{
                this.$axios.post(root+"account/updatePwd",this.updatePwdParams).then(res=>{
                    if(res.data.code==1000){
                        this.$alert(res.data.message,"信息").then(()=>{
                            this.$router.push("/")
                        }).catch(()=>{
                            this.updateAccountVisible=false
                            this.getAccountList()
                        })
                    }
                    if(res.data.code==1001){
                        this.$alert(res.data.message,"信息")
                    }
                })
            }
        },
         //冻结账号
        frozenAccount(guid){
            this.$alert("确定冻结该账号吗？","信息").then(()=>{
                this.$axios.post(root+"account/frozenAccount",qs.stringify({userGuid:guid})).then(res=>{
                    if(res.data.code==1000){
                        this.$alert(res.data.message,"信息").then(()=>{
                            this.getAccountList()
                        })
                    }else if(res.data.code==1001){
                        this.$alert(res.data.message,"信息")
                    }
                })
            })
        }
    },
    mounted(){
        this.getAccountList()
    },
    watch:{
		'$route'(to, from) {
			if(to.params.timeStamp!=from.params.timeStamp){
                this.$router.push('/Empty')
                this.$router.go(-1)
            }
		}
	}
}
</script>
<style lang="scss" scoped>
    .page-wrapper{
        height:924px;
        .wrapper-title{
            .btn{
                right:50px;
            }
        }
        .wrapper-center{
            background: #fff;
            padding:40px 20px;
        }
    }
    .permission{
        p{
            font-size: 14px;
            color: #3A4D62;
            line-height: 26px;
            margin-bottom: 20px;
            text-align: center;
            &:before,&:after{
                content: '';
                display: inline-block;
                width: 231px;
                height: 1px;
                background: #D8D8D8;
                vertical-align: 4px;
            }
            &:before{
                margin-right: 5px;
            }
            &:after{
                margin-left: 5px;
            }
        }
        .get-item{
            width: 538px;
            height: 85px;
            background: #FAFAFA;
            border: 1px solid #EAEAEA;
            border-radius: 3px;
            margin:0 auto 10px;
            padding: 7px 10px;
        }
        .set-item{
            text-align: center;
            .el-button{
                margin-bottom:5px;
            }
        }
    }
    .handleStyle{
        margin-left: 0;
    }
</style>


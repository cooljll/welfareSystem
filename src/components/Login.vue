<template>
    <div class="main">
        <div class="page-header">
            <div class="header-inner">
                <img class="header-img" src="../assets/img/secondindexlogo.png">
            </div>
		</div>
        <div class="page-center">
            <div class="inner-left"><img src="../assets/img/errorandnonotic.png"></div>
            <div class="inner-right">
                <div class="r-title">
                    <span class="r-bigtitle">用户登录</span>
                    <span class="r-smalltitle">- 企业弹性福利管理系统</span>
                </div>
                <div class="r-center">
                    <el-form label-position="right" label-width="80px">
                        <el-form-item label="用户名：">
                            <el-input v-model="userInfo.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码：">
                            <el-input type="password" v-model="userInfo.password"></el-input>
                        </el-form-item>
                        <el-button type="info" @click="loginin" :loading="loading">登陆</el-button>
                        <el-button @click="handleReset">重置</el-button>
                    </el-form>
                </div>
                <div class="footer">
                    Copyright © 2016 有米拿
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "queryString"
import authUnils from "../common/authUnils"
var root = process.env.API_ROOT
export default{
    data(){
        return{
            userInfo:{
                username:"",
                password:""
            },
            loading:false
        }
    },
    methods:{
        loginin(){
            if(this.userInfo.userName==""){
                this.$alert("用户名不能为空","信息")
            }else if(this.userInfo.password==""){
                this.$alert("密码不能为空","信息")
            }else{
                this.loading=true
                this.$axios.post(root+"auth",this.userInfo).then(res=>{
                    this.loading=false
                    if(res.data.code==1000){
                        authUnils.setToken(res.data.data.token,res.data.data.expiration)
                        this.$store.commit('setToken',authUnils.getToken())//将token保存到vuex中
                        localStorage.setItem("loginName",this.userInfo.username)//保存当前的登陆信息
                        this.$router.push("/ConsultIndex")
                    }else if(res.data.code==2001){
                        this.$alert(res.data.message,"信息")
                    }
                })
            }
        },
        handleReset(){
            for(var key in this.userInfo){
                this.userInfo[key]=""
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .main{
        height: 100%;
        padding-top:100px;
        text-align: center;
        box-sizing: border-box;
        background: url(../assets/img/geometry2.png);
        .page-center{
            width: 1200px;
            height:360px;
            margin: 40px auto;
            background: #ffffff;
            box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            padding:0;
            .inner-left{
                float: left;
                width: 780px;
                height: 360px;
                img{
                    width: 780px;
                    height: 360px;
                    cursor: pointer;
                    border:0;
                }
            }
            .inner-right{
                float: left;
                width: 420px;
                height: 320px;
                padding: 20px 0px;
                .r-title{
                    padding: 10px 0px 15px;
                    border-bottom: 1px solid #E8E8E8;
                    text-align: left;
                    margin: 0px 20px;
                    .r-bigtitle{
                        font-size: 26px;
                        font-weight: bold;
                    }
                    .r-smalltitle{
                        color: #9D9A9B;
                        font-size:12px;
                    }
                }
                .r-center{
                    border-bottom: 1px solid #E8E8E8;
                    margin: 20px 20px 15px;
                    height: 160px;
                }
                .footer{
                    padding: 47px 0px 0px;
                    text-align: center;
                    color: #9D9A9B;
                    font-size:12px;
                }
            }
        }
    }
    .el-form-item{
        margin:0 0 10px 0;
    }
</style>


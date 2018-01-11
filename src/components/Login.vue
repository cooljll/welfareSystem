<template>
    <div class="main">
        <div class="page-header">
            <div class="header-inner">
                <img class="header-img" src="http://192.168.1.197:8082/assets/img/secondindexlogo.png">
            </div>
		</div>
        <div class="page-center">
            <div class="inner-left"><img src="http://192.168.1.197:8082/assets/img/errorandnonotic.png"></div>
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
                        <el-button type="info" @click="loginin"  :loading="loginLoad">登陆</el-button>
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
export default{
    data(){
        return{
            userInfo:{
                username:"jinhs-1",
                password:"123456"
            },
            authData:{
                client_id:"233668646673605",
                client_secret:"33b17e066ee6a4ad383f46ec6e28ea1d"
            },
            loginLoad:false
        }
    },
    methods:{
        strToBase64(str){
            var Base64 = {
                // private property
                _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                // public method for encoding
                encode : function (input) {
                    var output = "";
                    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                    var i = 0;

                    input = Base64._utf8_encode(input);

                    while (i < input.length) {

                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);

                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;

                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }

                        output = output +
                        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

                    }

                    return output;
                },
                // public method for decoding
                decode : function (input) {
                    var output = "";
                    var chr1, chr2, chr3;
                    var enc1, enc2, enc3, enc4;
                    var i = 0;

                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                    while (i < input.length) {

                        enc1 = this._keyStr.indexOf(input.charAt(i++));
                        enc2 = this._keyStr.indexOf(input.charAt(i++));
                        enc3 = this._keyStr.indexOf(input.charAt(i++));
                        enc4 = this._keyStr.indexOf(input.charAt(i++));

                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;

                        output = output + String.fromCharCode(chr1);

                        if (enc3 != 64) {
                            output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                            output = output + String.fromCharCode(chr3);
                        }

                    }

                    output = Base64._utf8_decode(output);

                    return output;

                },
                // private method for UTF-8 encoding
                _utf8_encode : function (string) {
                    string = string.replace(/\r\n/g,"\n");
                    var utftext = "";

                    for (var n = 0; n < string.length; n++) {

                        var c = string.charCodeAt(n);

                        if (c < 128) {
                            utftext += String.fromCharCode(c);
                        }
                        else if((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
                        else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }

                    }

                    return utftext;
                },
                // private method for UTF-8 decoding
                _utf8_decode : function (utftext) {
                    var string = "";
                    var i = 0;
                    var c = c1 = c2 = 0;

                    while ( i < utftext.length ) {

                        c = utftext.charCodeAt(i);

                        if (c < 128) {
                            string += String.fromCharCode(c);
                            i++;
                        }
                        else if((c > 191) && (c < 224)) {
                            c2 = utftext.charCodeAt(i+1);
                            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                            i += 2;
                        }
                        else {
                            c2 = utftext.charCodeAt(i+1);
                            c3 = utftext.charCodeAt(i+2);
                            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                            i += 3;
                        }

                    }

                    return string;
                }
            }
            return Base64.encode(str)
        },
        loginin(){
            if(this.userInfo.userName==""){
                this.$alert("用户名不能为空","信息")
            }else if(this.userInfo.password==""){
                this.$alert("密码不能为空","信息")
            }else{
                // if(authUnils.getToken()){
                //     this.login()
                // }else{
                //     this.handleAuth()
                // }
                this.login()
            }
        },
        handleReset(){
            for(var key in this.userInfo){
                this.userInfo[key]=""
            }
        },
        //身份验证
        handleAuth(){
            // this.$axios({
            //     method:"post",
            //     url:"/api/oauth/token",
            //     data:'grant_type=client_credentials',
            //     headers:{
            //         "Authorization":"Basic "+this.strToBase64(this.authData.client_id+":"+this.authData.client_secret)
            //     }
            // }).then(res=>{
            //     if(res.status==200){
            //         authUnils.setToken(res.data.token_type+" "+res.data.access_token,res.data.expires_in)
            //         this.login()
            //     }else{
            //         localStorage.removeItem("enterpriseInfo")
            //         localStorage.removeItem("loginName")
            //         authUnils.removeToken()
            //         this.$router.push("/")
            //     }
            // })
        },
        //登陆请求
        login(){
            // this.loginLoad=true
            // this.$axios({
            //     method:"post",
            //     url:"/api/api/user/login",
            //     data:this.userInfo
            // }).then(res=>{
            //     this.loginLoad=false
            //     if(res.data.code==1000){
            //         localStorage.setItem("loginName",this.userInfo.username)//保存当前的登陆信息
            //         this.$router.push("/EnterpriseOverview")
            //     }else if(res.data.code==1001){
            //         this.$alert(res.data.message,"信息")
            //         for(var key in this.userInfo){
            //             this.userInfo[key]=''
            //         }
            //     }
            // })
            this.$axios.post("/api/auth",this.userInfo).then(res=>{
                console.log(res)
                if(res.data.code==1000){
                    // authUnils.setToken
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .main{
        height: 924px;
        padding-top:100px;
        text-align: center;
        box-sizing: border-box;
        background: url(http://192.168.1.197:8082/assets/img/geometry2.png);
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


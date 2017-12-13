<template>
    <div class="page-wrapper">
        <div class="wrapper-title">
            <span class="line"></span>
            <span class="title">企业资料</span>
            <div class="btn">
                <el-button type="primary">确认修改</el-button>
            </div>
        </div>
        <div class="wrapper-center">
            <el-row>
                <el-col :md="24" :lg="8" class="main-list">
                    <div class="title">基础信息</div>
                    <div class="content">
                        <el-form label-position="right" label-width="110px">
                            <el-form-item label="公司地址">
                                <el-input v-model="enterpriseInfo.address"></el-input>
                            </el-form-item>
                            <el-form-item label="邮寄地址">
                                <el-input v-model="enterpriseInfo.deliveryAddress"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人">
                                <el-input v-model="enterpriseInfo.contactPerson"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人手机">
                                <el-input v-model="enterpriseInfo.contactPhone"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人电话">
                                <el-input v-model="enterpriseInfo.contactTel"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人邮箱">
                                <el-input v-model="enterpriseInfo.contactEmail"></el-input>
                            </el-form-item>
                            <el-form-item label="企业域名">
                                <el-input v-model="enterpriseInfo.enterpriseDomain"></el-input>
                            </el-form-item>
                            <el-form-item label="传真号码">
                                <el-input v-model="enterpriseInfo.fax"></el-input>
                            </el-form-item>
                            <el-form-item label="邮政编码">
                                <el-input v-model="enterpriseInfo.zip"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :md="24" :lg="8" class="main-list">
                    <div class="title">重要信息</div>
                    <div class="content">
                        <el-form label-position="right" label-width="110px" readonly="true">
                            <el-form-item label="公司登录名">
                                <el-input :disabled="true" placeholder="huizhan"></el-input>
                            </el-form-item>
                            <el-form-item label="公司名称">
                                <el-input :disabled="true" v-model="enterpriseInfo.companyName"></el-input>
                            </el-form-item>
                            <el-form-item label="公司简称">
                                <el-input :disabled="true" v-model="enterpriseInfo.enterpriseShort"></el-input>
                            </el-form-item>
                            <el-form-item label="福利域名">
                                <el-input :disabled="true" v-model="enterpriseInfo.fuliDomain"></el-input>
                            </el-form-item>
                            <el-form-item label="开票公司抬头">
                                <el-input :disabled="true" v-model="enterpriseInfo.taxCompanyName"></el-input>
                            </el-form-item>
                            <el-form-item label="开票税务登记号">
                                <el-input :disabled="true" v-model="enterpriseInfo.taxNo"></el-input>
                            </el-form-item>
                            <el-form-item label="开票公司地址">
                                <el-input :disabled="true" v-model="enterpriseInfo.taxAddress"></el-input>
                            </el-form-item>
                            <el-form-item label="开票公司电话">
                                <el-input :disabled="true" v-model="enterpriseInfo.taxTel"></el-input>
                            </el-form-item>
                            <el-form-item label="开票注册银行">
                                <el-input :disabled="true" v-model="enterpriseInfo.taxBank"></el-input>
                            </el-form-item>
                            <el-form-item label="开票银行账号">
                                <el-input :disabled="true" v-model="enterpriseInfo.taxAccount"></el-input>
                            </el-form-item>
                            <el-form-item label="公司坐标">
                                <el-input :disabled="true" v-model="enterpriseInfo.enterpriseScope"></el-input>
                            </el-form-item>
                            <el-form-item label="企业经营内容">
                                <el-input :disabled="true" type="textarea" v-model="enterpriseInfo.enterpriseScope"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :md="24" :lg="8" class="main-list">
                    <div class="title">企业图片</div>
                    <div class="content">
                        <div class="upload-wrapper">
                            <el-row class="upload_box">
                                <el-col class="updateImg_box">
                                    <div class="upload-content">
                                        <input type="file">
                                        <div class="img_box">
                                            <img :src="enterpriseLogoUrl" alt="">
                                        </div>
                                        <div class="upload-txt"><p>上传图片</p></div>
                                    </div>
                                    <div class="txt">企业LOGO</div>
                                </el-col>
                                <el-col class="updateImg_box">
                                    <div class="upload-content"></div>
                                    <div class="txt">公司banner</div>
                                </el-col>
                                <el-col class="updateImg_box">
                                    <div class="upload-content"></div>
                                    <div class="txt">登录banner</div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import authUnils from '../../common/authUnils'
export default{
    data(){
        return{
            imageUrl: '',
            enterpriseInfo:{},
            entCoord:"",
            enterpriseLogoUrl:""
        }
    },
    methods:{
        //获取企业信息
        getEnterpriseInfo(){
            this.$axios.post("/api/api/enterprise/entInfo",{},{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.status==200){
                    if(res.data.code==0){
                        this.enterpriseInfo=res.data.data
                        console.log(this.enterpriseInfo)
                        this.entCoord=this.enterpriseInfo.lon+","+this.enterpriseInfo.lat
                        this.enterpriseLogoUrl=this.enterpriseInfo.enterpriseLogoUrl
                    }
                }
            })
        }
    },
    mounted(){
        this.getEnterpriseInfo()
    }
}
</script>
<style lang="scss" scoped>
    .page-wrapper{
        height:100%;
        .wrapper-center{
            background:#fff;
            .main-list{
                .title{
                    font-size: 20px;
                    color: #3A4D62;
                    letter-spacing: 0.43px;
                    margin: 20px 0;
                    text-align: center;
                }
                .content{
                    padding:0 40px;
                    .upload-wrapper{
                        .upload_box{
                            width:50%;
                            margin:0 auto;
                            .updateImg_box{
                                margin-bottom: 15px;
                                .upload-content{
                                    height: 150px;
                                    width: 99%;
                                    background: #FFFFFF;
                                    border: 1px solid #F0F0F0;
                                    position: relative;
                                    display: table;
                                    .img_box{
                                        display: table-cell;
                                        width: 100%;
                                        vertical-align: middle;
                                        img{
                                            max-width: 100%;
                                            max-height: 100%;
                                            display: block;
                                            margin: 0px auto;
                                            border: 0;
                                        }
                                    }
                                    input{
                                        position: absolute;
                                        width: 100%;
                                        height: 100%;
                                        top: 0;
                                        left: 0;
                                        background-color: rgba(0, 0, 0, 0.6);
                                        opacity: 0;
                                        // filter: alpha(opacity=0);
                                        // -moz-opacity: 0;
                                        z-index: 3;
                                        cursor: pointer;
                                        &:hover{
                                            background-color: rgba(0, 0, 0, 0.6);
                                        }
                                    }
                                    .upload-txt{
                                        position: absolute;
                                        width: 100%;
                                        height: 100%;
                                        top: 0;
                                        left: 0;
                                        z-index: 1;
                                        display: none;
                                        p{
                                            width: 76px;
                                            position: absolute;
                                            text-align: center;
                                            height: 30px;
                                            line-height: 30px;
                                            top: 50%;
                                            left: 50%;
                                            margin: -15px 0 0 -37px;
                                            border: 1px solid #FFFFFF;
                                            color:#fff;
                                        }
                                    }
                                }
                                .txt{
                                    text-align: center;
                                    font-size: 16px;
                                    color: #757D87;
                                    margin-top: 5px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>


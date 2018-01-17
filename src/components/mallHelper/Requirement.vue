<template>
    <div class="page-main">
        <div class="main-header">
            <p class="left">
                <i class="iconfont icon-home"></i>
                需求申请
            </p>
            <p class="right">
                <i class="iconfont icon-home"></i>
                021-54653958
            </p>
        </div>
        <div class="main-center">
            <el-row>
                <el-col :md="24" :lg="16" class="main-left">
                    <el-form label-position="right" label-width="80px" status-icon :model="requireParams" ref="requireData">
                        <el-form-item label="需求类型">
                            <el-select v-model="requireParams.demandType">
                                <el-option label="采购商品" value="1"></el-option>
                                <el-option label="代理企业福利" value="2"></el-option>
                                <el-option label="定制福利卷" value="3"></el-option>
                                <el-option label="定制积分卡" value="4"></el-option>
                                <el-option label="定制礼品卡" value="5"></el-option>                               
                            </el-select>
                        </el-form-item>
                        <el-form-item label="需求描述" prop="content">
                            <el-input type="textarea" v-model="requireParams.content" class="descInfo" placeholder="请再次留下您宝贵意见，让有米拿弹性福利平台不断进步，谢谢！"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" prop="contactPerson">
                            <el-input placeholder="请输入联系人" v-model="requireParams.contactPerson"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="contactPhone">
                            <el-input placeholder="请输入手机号" v-model="requireParams.contactPhone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="contactEmail">
                            <el-input placeholder="请输入邮箱" v-model="requireParams.contactEmail"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-row class="submitBtn">
                        <el-button type="primary" class="requireSubmit" @click="requireSubmit">提交需求</el-button>
                    </el-row>
                </el-col>
                <el-col :md="24" :lg="8" class="main-right">
                    <div class="help-header">
                        <p>有米拿帮助中心<img src="../../assets/img/help-center.png"></p>
                    </div>
                    <div class="help-text">如果您在使用有米拿企业后台过程中遇到问题，或者有任何的意见或建议，
                        欢迎及时向我们反馈，我们会尽快回复您的问题，并依据您的反馈，不断改进。</div>
                    <div class="help-img">
                        <img src="../../assets/img/help-center-img.png">
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import authUnils from '../../common/authUnils'
var root = process.env.API_ROOT
export default{
    data(){
        return{
            type:"",
            fileList:[],
            requireParams:{
                contactEmail: "",
                contactPerson: "",
                contactPhone: "",
                content: "",
                demandType: ""
            }
        }
    },
    methods:{
        requireSubmit(){
            this.$axios.post(root+"help/welNeedApproval",this.requireParams).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,'信息').then(()=>{
                        for(var k in this.requireParams){
                            this.requireParams[k]=''
                        }
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,'信息')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>
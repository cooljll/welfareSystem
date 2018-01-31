<template>
    <div class="page-main">
        <div class="main-header">
            <p class="left">
                <i class="iconfont icon-home"></i>
                意见反馈
            </p>
            <p class="right">
                <i class="iconfont icon-home"></i>
                021-54653958
            </p>
        </div>
        <div class="main-center">
            <el-row>
                <el-col :md="24" :lg="16" class="main-left">
                    <el-form label-position="right" label-width="80px">
                        <el-form-item label="意见标题">
                            <el-input placeholder="请概述你的意见" v-model="feedbackName"></el-input>
                        </el-form-item>
                        <el-form-item label="意见描述">
                            <el-input v-model="content" type="textarea" class="descInfo" placeholder="请再次留下您宝贵意见，让有米拿弹性福利平台不断进步，谢谢！"></el-input>
                        </el-form-item>
                        <el-form-item label="相关截图">
                            <div class="fileUpload">
                                <input type="file" @change="getFile($event)" id="fileToUpload">
                                <div class="replaceComp">
                                    <el-button size="large" type="primary" @click="selectExcelFile">上传图片</el-button>
                                    <span class="fileName">{{fileName}}</span>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <el-input placeholder="请输入手机号" v-model="feedbackPhone"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-row class="submitBtn">
                        <el-button type="primary" @click="feedbackSubmit">提交申请</el-button>
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
            fileName:"",                  
            file:"",
            content:"",
            feedbackEmail:"",
            feedbackName:"",
            feedbackPhone:"",
            feedbackUser:""
        }
    },
    methods:{
        //上传文件
        selectExcelFile(){
            document.getElementById('fileToUpload').click()
        },
        getFile(event) {
            this.file = event.target.files[0]
            this.fileName=this.file.name
        },
        feedbackSubmit(){
            if(this.feedbackName==""){
                this.$alert("请输入反馈标题","信息")                
            }else if(this.content==""){
                this.$alert("请输入反馈内容","信息")
            }else if(this.feedbackPhone==""){
                this.$alert("请输入手机号","信息")
            }
            let formData = new FormData()
            formData.append('feedbackImage', this.file)
            formData.append('content', this.content)
            formData.append('feedbackName', this.feedbackName)
            formData.append('feedbackPhone', this.feedbackPhone)
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            this.$axios.post(root+"help/feedback",formData,config).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.content=''
                        this.feedbackName=''
                        this.feedbackPhone=''
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,'信息')
                }
            })
        }
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
    
</style>
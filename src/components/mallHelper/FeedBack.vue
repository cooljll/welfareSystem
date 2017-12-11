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
                            <el-input placeholder="请概述你的意见"></el-input>
                        </el-form-item>
                        <el-form-item label="意见描述">
                            <el-input type="textarea" class="descInfo" placeholder="请再次留下您宝贵意见，让有米拿弹性福利平台不断进步，谢谢！"></el-input>
                        </el-form-item>
                        <el-form-item label="相关截图">
                            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                                multiple :file-list="fileList">
                                <el-button size="large" type="primary">上传图片</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="联系人">
                            <el-input placeholder="请输入联系人"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <el-input placeholder="请输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-row class="submitBtn">
                        <el-button type="primary">提交申请</el-button>
                    </el-row>
                </el-col>
                <el-col :md="24" :lg="8" class="main-right">
                    <div class="help-header">
                        <p>有米拿帮助中心<img src="assets/img/help-center.png"></p>
                    </div>
                    <div class="help-text">如果您在使用有米拿企业后台过程中遇到问题，或者有任何的意见或建议，
                        欢迎及时向我们反馈，我们会尽快回复您的问题，并依据您的反馈，不断改进。</div>
                    <div class="help-img">
                        <!-- <img src="assets/img/help-center-img.png"> -->
                        <img src="../../assets/timg.jpg" alt="">
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            fileList:[],
            feedbackParams:{
                content:"",
                feedbackEmail:"",
                feedbackName:"",
                feedbackPhone:"",
                feedbackUser:""
            }
        }
    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>
    
</style>
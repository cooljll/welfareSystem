<template>
    <div>
        <div class="page-title">{{$route.name}}</div>
        <div class="page-center">
            <el-row class="main">
                <el-col>
                    <img src="" alt="">
                </el-col>
                <el-col>
                    <div class="fileUpload">
                        <input type="file" @change="getFile($event)" id="fileToUpload">
                        <div class="replaceComp">
                            <el-button size="large" type="primary" @click="selectExcelFile">选择文件</el-button>
                        </div>
                    </div>
                </el-col>
                <el-col class="uploadInfo">
                    <div class="get-excel-info" v-show="isShowUpload">
                        <!-- <img src="/creditcard/images/excel.png" alt=""> -->
                        <img src="../../../assets/timg.jpg" alt="">
                        <p class="excel-name">{{fileName}}</p>
                        <el-button type="primary" size="large" @click="uploadFile">开始上传</el-button>
                    </div>
                </el-col>
                <el-col class="up-txt">
                    <span>上传要求：</span>
                    1.仅支持Excel文件  2.请按照模板格式录入正确的信息  3.第一次请勿导入太多数据，导致判卡时间过长影响体验。
                </el-col>
                <el-col>
                    <div class="up-template">
                        <el-button @click="downloadTemplate">下载Excel模板</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import authUnils from '../../../common/authUnils'
export default{
    data(){
        return{
            isShowUpload:false,
            fileName:""
        }
    },
    methods:{
        //上传文件
        selectExcelFile(){
            document.getElementById('fileToUpload').click()
        },
        getFile(e){
            let file = e.target.files[0]
            console.log(file)
            if(file){
                this.fileName=file.name
                this.isShowUpload=true
            }
        },
        //开始上传
        uploadFile(){
            this.$axios.post("/api/api/creditCard/isExcelMsg",{
                excelId:"",
                pageNum:1,
                pageSize:10
            }).then(res=>{
                console.log(res)
            })
        },
        downloadTemplate(){
            this.$axios.get("/api/api/creditCard/excel").then(res=>{
                console.log(res)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .page-center{
        padding:20px;
        .main{
            text-align: center;
            .el-col{
                margin:30px 0;
                .fileUpload{
                    margin: 0 auto;
                    width:100%;
                }
                .get-excel-info{
                    img{
                        width: 100px;
                        height: 100px;
                        margin-bottom:10px;
                    }
                    p{
                        color: #666;
                        font-size: 18px;
                        margin-bottom: 30px;
                    }
                }
                &.up-txt{
                    color:#555;
                    font-size:14px;
                    margin-bottom:15px;
                    span{
                        font-weight: 700;
                    }
                }
                .up-template{
                    width:60%;
                    margin:0 auto;
                    border: 1px solid #f8f8f8;
                    padding:30px 0;
                }
            }
            .uploadInfo{
                margin:0 !important;
            }
        }
    }
    
</style>


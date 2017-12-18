<template>
    <div>
        <div class="page-title">{{$route.name}}</div>
        <div class="page-center">
            <el-row class="main">
                <el-col>
                    <img src="" alt="">
                </el-col>
            </el-row>
            <el-row class="main" v-show="isShowIndex">
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
             <!-- 上传成功之后的页面 -->
            <el-row class="main" v-show="isShowList">
                <el-col>
                    <el-table :data="tableData" border resizable highlight-current-row style="width: 100%;">
                        <el-table-column label="序号" type="index" align="center" width="80">
                        </el-table-column>
                        <el-table-column prop="no" label="卡号" align="center">
                        </el-table-column>
                        <el-table-column prop="num" label="姓名" align="center">
                        </el-table-column>
                        <el-table-column prop="totalMoney" label="金额" align="center">
                        </el-table-column>
                        <el-table-column prop="createTime" label="信息" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="toolbar">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                            :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                        </el-pagination>
                    </div>
                </el-col>
                <el-col class="text-center">
                    <div>
                        <el-button>重新上传</el-button>
                        <el-button type="primary">提交还款</el-button>
                    </div>
                    <p class="tip">注：如果 "提交还款” 为灰色不可点击，说明表格中存在信息错误，请您修改正确后重新上传。</p>
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
            isShowIndex:true,
            isShowList:false,
            isShowUpload:false,
            fileName:"",
            file:"",
            excelId:"",
            tableData:[],
            currentPage:1,
            totalSize:0
        }
    },
    methods:{
        //上传文件
        selectExcelFile(){
            document.getElementById('fileToUpload').click()
        },
        getFile(e){
            this.file = e.target.files[0]
            if(this.file){
                this.fileName=this.file.name
                this.isShowUpload=true
            }
        },
        //开始上传
        uploadFile(){
            let formData = new FormData()
            formData.append('uploadexcel', this.file)
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            this.$axios.post("/api/api/creditCard/checkExcel",formData,config).then(res=>{
                if(res.data.code==1000){
                    this.excelId=res.data.data
                    this.$axios.post("/api/api/creditCard/uploadExcel",formData,config).then(res=>{
                        if(res.data.code==1000){
                            this.$alert(res.data.message,'信息').then(()=>{
                                this.isShowIndex=false
                                this.isShowList=true
                            })
                        }
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        //下载excel模板
        downloadTemplate(){
            this.$axios.get("/api/api/creditCard/excel").then(res=>{
                console.log(res)
            })
        },
        handleSizeChange(){},
        handleCurrentChange(){}
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
                .tip{
                    margin-top: 10px;
                    color: #666;
                    font-size: 14px;
                }
                &.text-center{
                    margin:0 0 10px 0;
                }
            }
            .uploadInfo{
                margin:0 !important;
            }
        }
    }
    
</style>


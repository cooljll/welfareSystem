<template>
    <div>
        <div class="page-title">{{$route.name}}</div>
        <div class="page-center">
            <el-row class="main">
                <el-col>
                    <img src="../../../assets/img/step.png" alt="">
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
                        <img src="../../../assets/img/excel.png" alt="">
                        <p class="excel-name">{{fileName}}</p>
                        <el-button type="primary" size="large" @click="uploadFile">开始上传</el-button>
                    </div>
                </el-col>
                <el-col class="up-txt">
                    <span>上传要求：</span>
                    1.仅支持Excel文件  2.请按照模板格式录入正确的信息,不要修改模板的格式  
                    3.第一次导入数据需要判卡，请耐心等候，不要导入太多数据，导致等候时间过长影响体验。
                </el-col>
                <el-col class="up-txt">
                    <span>细则说明：</span>
                    1.金额必须为整数，模板格式切勿改动  2.单张信用卡每日限还款一次，多还一次会自动转为明日还款。 3.对于单张信用卡金额超过两万的金额，
                    系统会拆单处理。案例：户名：王** ，卡号：3600 **** **** ****，还款金额：3万， 系统第一天还款两万，第二天还款一万。 
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
                    <el-table :data="excelTable" border resizable highlight-current-row style="width: 100%;">
                        <el-table-column label="序号" type="index" align="center" width="80">
                        </el-table-column>
                        <el-table-column prop="cardNo" label="卡号" align="center">
                        </el-table-column>
                        <el-table-column prop="cardName" label="姓名" align="center" width="140">
                        </el-table-column>
                        <el-table-column prop="money" label="金额" align="center" width="120">
                        </el-table-column>
                        <el-table-column prop="message" label="信息" align="center">
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
                        <el-button @click="reUpload">重新上传</el-button>
                        <el-button type="primary" @click="submitOfRepay">提交还款</el-button>
                    </div>
                    <p class="tip">注：如果 "提交还款” 为灰色不可点击，说明表格中存在信息错误，请您修改正确后重新上传。</p>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import authUnils from '../../../common/authUnils'
import fileDownload from 'js-file-download'
import moment from 'moment'
export default{
    data(){
        return{
            isShowIndex:true,
            isShowList:false,
            isShowUpload:false,
            fileName:"",
            file:"",
            tableData:[],
            currentPage:1,
            totalSize:0,
            excelParams:{
                excelId:'',
                pageNum:1,
                pageSize:10
            },
            excelTable:[]
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
            const loading = this.$loading({
				lock: true,
				text: '正在上传。。。',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
            this.$axios.post("/api/api/creditCard/checkExcel",formData,config).then(res=>{
                loading.close()
                if(res.data.code==1000){
                    this.excelParams.excelId=res.data.data
                    this.$alert(res.data.message,"信息")
                    this.isShowIndex=false
                    this.isShowList=true
                    this.getExcelInfo()
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        //查看上传的excel信息
        getExcelInfo(){
            this.$axios.post("/api/api/creditCard/excelInfo",this.excelParams).then(res=>{
                if(res.data.code==1000){
                    this.excelTable=res.data.data.content
                    this.totalSize=res.data.data.totalSize
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        handleSizeChange(val){
            this.excelParams.pageSize=val
            this.getExcelInfo()
        },
        handleCurrentChange(val){
            this.excelParams.pageNum=val
            this.getExcelInfo()
        },
        //重新上传
        reUpload(){
            this.isShowUpload=false
            this.isShowIndex=true
            this.isShowList=false
        },
        //提交还款
        submitOfRepay(){
            this.$axios.post("/api/api/creditCard/isExcelMsg",this.excelParams).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息")
                }else if(res.data.code==1001){
                    this.$alert(res.data.message+"!,请修改正确后重新上传!","信息")
                }
            })
        },
        //下载excel模板
        downloadTemplate(){
            this.$axios({
                url:"/api/api/creditCard/excel",
                method:"get",
                responseType:'arraybuffer'
            }).then(res=>{
                if(res){
                    // let blob=new Blob([res.data],{type:"application/vnd.ms-excel"})   
                    // let objectUrl=URL.createObjectURL(blob)
                    // window.location.href=objectUrl  
                    fileDownload(res.data,"企业还信用卡模板"+moment(new Date()).format("YYYY-MM-DD")+".xls")
                }
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


<template>
    <div>
        <div class="page-title">
            <div class="btn" @mouseenter="visible" @mouseleave="display">
                <el-button type="danger" class="declare">
                    <i class="iconfont icon-gantanhao"></i>
                    免责声明
                </el-button>
            </div>
            <div class="declareInfo" v-show="isShowDeclare">
                <div class="declare_title">积分发放免责条款</div>
                <div class="declare_center">
                    1.&nbsp;&nbsp;&nbsp;积分一经发放，不可撤消、变更。<br>
                    2.&nbsp;&nbsp;&nbsp;积分可一次或分期发放，直至发完为止。<br>
                    3.&nbsp;&nbsp;&nbsp;用户对其账号、密码和积分的保管和使用承担全部责任，因黑客、病毒、
                    及非法攻击等引起的事件导致积分丢失等而造成乙方损失的，有米拿概不负责，亦不承担任何法律责任。<br>
                    4.&nbsp;&nbsp;&nbsp;企业积分发放制度的最终解释权由有米拿所有。
                </div>
            </div>
            {{$route.name}}
        </div>
        <div class="page-center">
            <el-row class="layer-title">
                <el-col class="layer-tag" :name="step1?'active':''">1 选择福利类型</el-col>
                <el-col class="layer-tag" v-show="isShowTag1" :name="step2?'active':''" @click.native="errorMessage">2 人员名单检查</el-col>
                <el-col class="layer-tag" v-show="isShowTag2" :name="step3?'active':''" @click.native="errorMessage">3 支付订单</el-col>
                <el-col class="layer-tag" v-show="isShowTag3" :name="step4?'active':''" @click.native="errorMessage">4 订单支付完成</el-col>
            </el-row>
            <div class="layer-center1" v-show="step1">
                <!-- 福利类型 -->
                <div class="row">
                    <div class="title">福利类型</div>
                    <div class="center">
                        <div class="subtitle">基本节日</div>
                        <div class="checkboxdiv">
                            <el-button v-for="item in btnGroups" :label="item" :key="item.id"  @click="handleCurrentBtn(item.name,item.id)">{{item.name}}</el-button>   
                        </div>
                        <div class="subtitle">激励方案</div>
                        <div class="checkboxdiv">
                            <el-button @click="handleIncentiveScheme">员工激励</el-button>
                        </div>
                        <div class="subtitle">自定义福利</div>
                        <div class="checkboxdiv">
                            <el-form :inline="true">
                                <el-form-item>
                                    <el-input v-model="customWelfareType"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click="customSubmit">确定</el-button>
                                </el-form-item>
                            </el-form>    
                        </div>
                        <div class="subtitle" v-show="isShow">已选中福利类型</div>
                        <div class="checkedbox" v-show="isShow">
                            <div>
                                {{selectedType}}
                                <span @click="deleteCheckedType">x</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 下载配置 -->
                <div class="row" v-show="uploadConfig">
                    <div class="title">下载配置</div>
                    <div class="center">
                        <el-button @click="selectEmployee">选择人员</el-button>
                        <div class="choosestafflist">
                            <el-tag v-for="tag in selectedEmpTags" :key="tag.label" closable class="tagStyle"
                                :disable-transitions="false" @close="handleClose(tag)">
                                {{tag.label}}
                            </el-tag>
                        </div>
                        <el-button type="primary" @click="confirmDownloadExcel">确定下载Excel</el-button>
                        <el-button @click="callOff">取消</el-button>
                    </div>
                </div>
                <!-- Excel操作 -->
                <div class="row">
                    <div class="title">Excel操作</div>
                    <div class="center">
                        <div>
                            <el-button @click="uploadExcelTemplate">下载Excel模板</el-button>
                        </div>
                        <div class="fileUpload">
                            <input type="file" @change="getFile($event)" id="fileToUpload">
                            <div class="replaceComp">
                                <el-button type="primary" @click="selectExcelFile">选择excel</el-button>
                                <span class="fileName">{{fileName}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 邮件寄语 -->
                <div class="row">
                    <div class="title">邮件寄语</div>
                    <div class="center">
                        <a class="btnmessage" @click="randomTemMessage">
                            <img src="http://192.168.1.197:8082/assets/img/template.png">
                            <span>寄语模板 (点击自动生成)</span>
                        </a>
                        <el-input type="textarea" v-model="messageTemplate"></el-input>
                    </div>
                </div>
                <el-button type="primary" @click="handleNextStep1">下一步(将会上传excel)</el-button>
            </div>
            <div class="layer-center2" v-show="step2">
                <div class="searchBar">
                    <div class="handleBar" @click="batchDelete">
                        <i class="iconfont icon-caozuo"></i>
                        <span>批量删除</span>
                    </div>
                    <el-form :inline="true">
                        <el-form-item label="部门：">
                            <el-select v-model="value">
                                <el-option label="全部" value="1"></el-option>
                                <el-option label="市场部" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input placeholder="姓名/手机号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="info">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <el-table :data="tableData" border resizable highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="员工姓名" align="center">
                    </el-table-column>
                    <el-table-column prop="departmentName" label="所属部门" align="center">
                    </el-table-column>
                    <el-table-column prop="phone" label="员工手机号" align="center">
                    </el-table-column>
                    <el-table-column prop="shopScore" label="发放积分" align="center">
                        <template slot-scope="scope">
                            <el-input v-show="scope.row.edit" size="small" v-model.number="scope.row.shopScore" 
                            @keyup.native="!(/^[1-9][0-9]*$/.test(scope.row.shopScore))?scope.row.shopScore='0':scope.row.shopScore">
                            </el-input>
                            <span v-show="!scope.row.edit">{{ scope.row.shopScore }}</span>
                        </template>  
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" class="handlebtn" v-show='!scope.row.edit' @click="scope.row.edit=true">修改积分</el-button>
                            <el-button type="text" class="handlebtn" v-show='scope.row.edit' @click="scope.row.edit=false">保存</el-button>
                            <el-button type="text" class="handlebtn" @click="delEmpCredit(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="toolbar">
                    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
                        :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="10">
                    </el-pagination>
                </div>
                <div class="stepBar" v-show="step2">
                    <el-button type="primary" @click="handleNextStep2">下一步</el-button>
                    <el-button @click="handleGoBack1">上一步</el-button>
                </div>
            </div>
            <div class="layer-center3" v-show="step3">
                <div class="information-check-center">
                    <div class="left-box">
                        <div class="centerrow">
                            <div class="title">消耗总积分</div>
                            <div class="center-left">
                                <div class="allscorerow">
                                    <span class="scoreallcount">{{totalScores}}</span>
                                    <span>积分</span>
                                </div>
                                <div class="rowbottom">发放总人数:&nbsp;<span>{{totalEmployee}}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="information-center">
                    <div class="right-box">
                        <div class="centerrow">
                            <div class="title scoretitle">企业余额</div>
                            <div class="center">
                                <span class="score">{{enterpriseBalance}}</span>
                                <span>积分</span>
                            </div>
                        </div>
                        <div class="centerrow">
                            <div class="title">福利类型</div>
                            <div class="center">{{selectedType}}</div>
                        </div>
                        <div class="centerrow">
                            <div class="title">发放时间</div>
                            <div class="center">立即发放</div>
                        </div>
                        <div class="centerrow">
                            <div class="title">邮件寄语</div>
                            <div class="center">{{messageTemplate}}</div>
                        </div>
                        <div class="bottomrow">
                            <div class="title">发放对象</div>
                            <div class="center">
                                <div class="showstafflist">
                                    <el-tag v-for="tag in extendEmpTags" :key="tag" closable class="tagStyle"
                                        :disable-transitions="false" @close="handleClose(tag)">
                                        {{tag}}
                                    </el-tag>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="information-btn">
                    <el-button type="primary" @click="payOrder">支付订单</el-button>
                    <el-button @click="handleGoBack2">上一步</el-button>
                </div>
            </div>
            <div class="layer-center4" v-show="step4">
                <div class="success">
                    <img src="../../../assets/img/successful.png">
                    <div class="statusname">发放成功！</div>
                    <div class="btnbox">
                        <el-button type="primary" @click="oneMoreExtend">再次发放</el-button>
                        <el-button @click="$router.push('/CreditExtend_Order')">查看订单</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 选择员工弹出框 -->
        <el-dialog title="选择员工" :visible.sync="selectEmpVisible" :close-on-click-modal="false" class="selectEmpSimpleDialog">
            <div class="center-wrapper">
                <div class="box">
                    <div class="title">选择部门</div>
                    <div class="center">
                        <span>{{enterpriseName}}</span>
                        <el-checkbox-group v-model="checkedDepart">
                            <el-checkbox v-for="(item,index) in notSelectdeparts" :label="item" :key="index">{{item.label}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="handle">
                    <div class="toRight">
                        <el-button @click="allMoveToRight">全部</el-button>
                        <el-button @click="partMoveToRight">添加</el-button>
                    </div>
                    <div class="toLeft">
                        <el-button @click="partMoveToLeft">移除</el-button>
                        <el-button @click="allMoveToLeft">全部</el-button>
                    </div>
                </div>
                <div class="box">
                    <div class="title">已选部门</div>
                    <div class="center">
                        <el-checkbox-group v-model="selectedDeparts">
                            <el-checkbox v-for="(item,index) in selectedArr" :label="item" :key="index">{{item.label}}</el-checkbox>
                        </el-checkbox-group> 
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer footer-center">
                <el-button type="primary" @click="selectEmpSubmit">确定</el-button>
                <el-button @click.native="addEmployeeVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 下载excel模板弹框 -->
        <el-dialog title="信息" :visible.sync="uploadExcelVisible" :close-on-click-modal="false" class="uploadExcelDialog" style="top:18%">
            <div class="tip">
                请上传编辑好的积分发放配置请按照Excel格式填写内容,Excel中其他内容请勿修改！
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="confirmSubmit">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import authUnils from '../../../common/authUnils'
import qs from 'queryString'
import fileDownload from 'js-file-download'
export default{
    data(){
        return{
            isShowTag1:true,
            isShowTag2:true,
            isShowTag3:true,
            isShowDeclare:false,
            isShow:false,//显示已选中的福利类型
            step1:true,
            step2:false,
            step3:false,
            step4:false,
            uploadConfig:false,
            scores:1,
            tableHeader:{
                background:"#A4AABE",
                color:"#fff"
            },
            customWelfareType:"",
            btnGroups:[],
            selectedType:"",
            festivalId:"",//节日id
            selectEmpVisible:false,
            tableData:[],
            currentPage:1,
            value:'',
            file:'',
            fileName:"未选择",
            //员工积分发放模板数据
            extendCreditTemp:[{
                name:"",
                department:"",
                phoneNumber:"",
                creditNums:""
            }],
            messageTemplate:"",//模板寄语
            notSelectdeparts:[],//选择部门
            checkedDepart:[],
            selectedArr:[],//已选部门
            selectedDeparts:[],
            selectedEmpTags:[],//标签数组
            enterpriseBalance:0,//积分余额
            totalScores:0,
            totalEmployee:0,
            screenWidth:document.body.clientWidth,
            uploadExcelVisible:false,
            enterpriseName:"",
            extendEmpTags:[],//发放对象
            selectedExcelEmp:[]
        }
    },
    methods:{
        visible(){
            this.isShowDeclare=true
        },
        display(){
            this.isShowDeclare=false
        },
        //错误提示
        errorMessage(){
            this.$alert("对不起! Excel积分发放 不支持标签跳转,请按步骤操作!","信息")
        },
        //下一步操作
        handleNextStep1(){
            if(!this.isShow){
                this.$alert("请先选择福利类型","信息")
            }else if(!this.file){
                this.$alert("请先上传excel","信息")
            }else if(this.messageTemplate==""){
                this.$alert("模板寄语不能为空","信息")
            }else{
                this.uploadFile()
            }
        },
        handleNextStep2(){
            this.totalEmployee=this.tableData.length
            this.totalScores=0
            let tempStr=""
            this.extendEmpTags=[]
            this.tableData.forEach(item=>{
                this.totalScores+=item.shopScore
                tempStr=item.name+"("+item.shopScore+"积分)"
                this.extendEmpTags.push(tempStr)
            })
            this.getEnterpriseBalance()
            this.step1=false
            this.step2=false
            this.step3=true
            this.step4=false
        },
        // 上一步操作
        handleGoBack1(){
            this.$confirm("回到上一页时,本页编辑的数据将会丢失,是否确认回到上一页?","信息").then(()=>{
                this.step1=true
                this.step2=false
                this.step3=false
                this.step4=false
            }).catch(()=>{
                this.step1=false
                this.step2=true
                this.step3=false
                this.step4=false
            })
        },
        handleGoBack2(){
            this.step1=false
            this.step2=true
            this.step3=false
            this.step4=false
        },
        //基本节日选中处理
        handleCurrentBtn(val,id){
            this.selectedType=val
            this.festivalId=id
            this.isShow=true
        },
        //自定义福利确定
        customSubmit(){
            this.selectedType="自定义福利："+this.customWelfareType
            this.festivalId=this.customWelfareType
            this.isShow=true
        },
        //员工激励
        handleIncentiveScheme(val){
            this.festivalId="2"
            this.selectedType=val.srcElement.innerText
            this.isShow=true
        },
        //删除选中的福利类型
        deleteCheckedType(){
            this.selectedType=""
            this.isShow=false
            this.customWelfareType=""
        },
        //选择员工
        selectEmployee(){
            this.selectEmpVisible=true
            this.getTreeDep()
        },
        handleCurrentChange(){},
        // 下载excel模板
        uploadExcelTemplate(){
            this.uploadExcelVisible=true
        },
        confirmSubmit(){
            this.uploadConfig=true
            this.uploadExcelVisible=false
        },
        //确定下载excel
        confirmDownloadExcel(){
            if(this.selectedEmpTags.length==0){
                this.$alert("请先选择部门","信息")
            }else{
                let str=""
                this.selectedEmpTags.forEach(item=>{
                    str+="&depIds="+item.organizationUnitId
                })
                this.$axios.get("/api/api/integral/downloadExcel?"+str.substr(1),{
                    responseType:"arraybuffer"
                }).then(res=>{
                    if(res){
                        // let blob=new Blob([res.data],{type:"application/vnd.ms-excel"})
                        // let objectUrl=URL.createObjectURL(blob)
                        // window.location.href=objectUrl
                        fileDownload(res.data,"员工积分发放模板.xls")
                    }
                })
            }
        },
        //取消
        callOff(){
            this.uploadConfig=false
        },
        //上传文件
        selectExcelFile(){
            document.getElementById('fileToUpload').click()
        },
        getFile(event) {
            this.file = event.target.files[0]
            this.fileName=this.file.name
        },
        uploadFile(){
            const loading = this.$loading({
				lock: true,
				text: '正在进行下一步操作请稍等...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
            let formData = new FormData()
            formData.append("uploadexcel",this.file)
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            this.$axios.post("/api/api/integral/uploadIntegralByExcel",formData,config).then(res=>{
                loading.close()
                if(res.data.code==1000){
                    this.step1=false
                    this.step2=true
                    this.step3=false
                    this.step4=false
                    res.data.data.forEach(item=>{
                        item.edit=false
                    })
                    this.tableData=res.data.data
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        //模板寄语
        randomTemMessage(){
            if(this.selectedType==""){
                this.$alert("请先选择福利类型","信息")
            }else{
                this.$axios.post("/api/api/integral/showBless",{typeId:this.festivalId}).then(res=>{
                    if(res.data.code==1000){
                        this.messageTemplate=res.data.data
                    }else if(res.data.code==1001){
                        this.$alert(res.data.message,"信息")
                    }
                })
            }
        },
        //企业余额
        getEnterpriseBalance(){
            this.$axios.post("/api/api/enterprise/getPoint",{}).then(res=>{
                if(res.data.code==1000){
                    this.enterpriseBalance=res.data.data
                }
            })
        },
        //标签删除
        handleClose(tag){
            this.selectedEmpTags.splice(this.selectedEmpTags.indexOf(tag), 1)
        },
        allMoveToRight(){
            this.selectedArr=[]
            this.notSelectdeparts.forEach((item,index)=>{
                this.selectedArr.push(item)
            })
        },
        partMoveToRight(){
            this.checkedDepart.forEach(item=>{
                if(!this.selectedArr.includes(item)){
                    this.selectedArr.push(item)
                }
            })
            this.checkedDepart=[]
            this.selectedDeparts=[]
        },
        allMoveToLeft(){
            this.selectedArr=[]
        },
        partMoveToLeft(){
            this.selectedArr=this.selectedArr.filter(item => !this.selectedDeparts.includes(item))
        },
        selectEmpSubmit(){
            this.selectedEmpTags=this.selectedEmpTags.concat(this.selectedArr)
            this.selectEmpVisible=false
        },
        //删除
        delEmpCredit(obj){
            this.$alert("确认是否删除？(如果删除错误请重新上传excel)","信息").then(()=>{
                this.tableData.splice(this.tableData.indexOf(obj), 1)
            })
        },
        handleSelectionChange(val){
            this.selectedExcelEmp=val
        },
        //批量删除
        batchDelete(){
            if(this.selectedExcelEmp.length==0){
                this.$alert("请先选择一个人员进行删除","信息")
            }else{
                this.$alert("确认是否删除？(如果删除错误请重新上传excel)","信息").then(()=>{
                    // this.tableData.splice(this.tableData.indexOf(obj), 1)
                })
            }
        },
        //支付订单
        payOrder(){
            this.$alert("确定要支付订单？","信息").then(()=>{
                this.$axios.post("/api/api/integral/postIntegralByExcel",{
                    blessMsg:this.messageTemplate,
                    festivalId:this.festivalId.toString(),
                    list:this.tableData
                }).then(res=>{
                    if(res.data.code==1000){
                        this.$alert(res.data.message,"信息").then(()=>{
                            this.step1=false
                            this.step2=false
                            this.step3=false
                            this.step4=true
                        })
                    }
                })
            })
        },
        //再次发放
        oneMoreExtend(){
            this.step1=true
            this.step2=false
            this.step3=false
            this.step4=false
        },
        //节日信息
        showFestival(){
            this.$axios.post("/api/api/integral/showFestival",{},{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.status==200){
                    if(res.data.code==1000){
                        this.btnGroups=res.data.data
                    }
                }
            })
        },
         //处理屏幕宽度变化
        handleScreenWidthChange(width){
            if(width<980){
                this.isShowTag3=false
            }else{
                this.isShowTag3=true
            }
            if(width<800){
                this.isShowTag2=false
            }else{
                this.isShowTag2=true
            }
            if(width<620){
                this.isShowTag1=false
            }else{
                this.isShowTag1=true
            }
        },
        //部门树形
        getTreeDep(){
            this.$axios.post("/api/api/organize/showTreeDep",qs.stringify({include:false})).then(res=>{
                if(res.status==200){
                    if(res.data.code==1000){
                        let ret=this.transferData(res.data.data)
                        this.enterpriseName=ret.label
                        this.notSelectdeparts=[]
                        this.notSelectdeparts=ret.subItems
                    }
                }
            })
        },
        //数据转化
        transferData(params){
            params["label"]=params.displayName+"("+params.memberCount+")"
            if(params.subItems&&params.subItems.length!==0){
                //有子级
                params.subItems.forEach(item=>{
                    item["label"]=item.displayName+"("+item.memberCount+")"
                })
            }
            return params
        }
    },
    mounted(){
        this.showFestival()
        const that = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
            })()
        }
        this.handleScreenWidthChange(this.screenWidth)
    },
    watch: {
        screenWidth (val) {
            this.screenWidth = val
            this.handleScreenWidthChange(this.screenWidth)
        }
    }
}
</script>
<style lang="scss" scoped>
    .page-center{
        padding:0;
        .layer-center1{
            min-height: 580px;
            padding: 40px 60px;
            .row{
                border-bottom: 1px solid #E9ECEF;
                overflow: hidden;
                margin-bottom:15px;
                .title{
                    float: left;
                    min-width: 60px;
                    text-align: right;
                    font-size: 14px;
                    color: #757D87;
                    letter-spacing: 0;
                    margin-right: 25px;
                    height: 40px;
                    line-height: 40px;
                }
                .center{
                    float: left;
                    margin-bottom:15px;
                    .el-button{
                        margin:10px 0;
                    }
                    .subtitle{
                        margin-bottom: 15px;
                        font-size: 14px;
                    }
                    .checkboxdiv{
                        max-width:690px;
                        .el-button{
                            margin:0 10px 15px 0;
                        }
                    }
                    .checkedbox{
                        margin-bottom: 40px;
                        div{
                            display: inline-block;
                            padding:12px 20px;
                            border: 1px solid #9ACC6A;
                            color: #5a5e66;
                            font-size: 14px;
                            border-radius: 5px;
                            position: relative;
                            background:#9ACC6A;
                            color:#fff;
                            span{
                                position: absolute;
                                top:0;
                                right:5px;
                                opacity: 0.4;
                                cursor: pointer;
                                font-size: 16px;
                            }
                        }  
                    }
                    // 下载配置
                    .choosestafflist{
                        height: 150px;
                        width: 482px;
                        border: 1px solid #E9ECEF;
                    }
                    //邮件寄语样式
                    .btnmessage{
                        display: block;
                        width: 400px;
                        height: 40px;
                        background-image: linear-gradient(-180deg, #F5F5F5 0%, #E7E7E7 100%);
                        border: 1px solid #EEEEEE;
                        cursor: pointer;
                        text-align: center;
                        line-height: 40px;
                        img{
                            display: inline-block;
                            height: 14px;
                            width: 14px;
                            cursor: pointer;
                        }
                        span{
                            display: inline-block;
                            font-size: 14px;
                            color: #3A4D62;
                            letter-spacing: 0;
                            cursor: pointer;
                            height: 28px;
                        }
                    }
                }
            }  
        }
        .layer-center2{
            min-height: 580px;
            padding: 20px;
            box-sizing: border-box;
            .stepBar{
                position: fixed;
                bottom: 0px;
                left: 0px;
                padding-left: 100px;
                margin-left:220px;
                height: 50px;
                background: #A4AABE;
                width: 100%;
                padding-top: 15px;
                .el-button{
                    padding:12px 20px;
                }
            }
        }
        .layer-center3{
            .information-check-center{
                background: #FAFAFA;
                padding: 30px 0px;
                .left-box{
                    font-family: "微软雅黑";
                    font-size: 12px;
                    margin: 0px;
                    padding: 0px;
                    text-decoration: none;
                    list-style: none;
                    overflow: hidden;
                    cursor: default;
                    .centerrow{
                        margin: 0px 50px;
                        .title{
                            float: left;
                            font-size: 14px;
                            color: #2D2E2E;
                            letter-spacing: 0;
                            min-width: 70px;
                            margin-right: 50px;
                            text-align: right;
                            line-height: 27px;
                        }
                        .center-left{
                            float: left;
                            font-size: 14px;
                            color: #7B7D7F;
                            letter-spacing: 0;
                            margin-right: 40px;
                            .allscorerow{
                                font-size: 14px;
                                color: #2D2E2E;
                                letter-spacing: 0;
                                overflow: hidden;
                                span.scoreallcount{
                                    font-size: 20px;
                                    color: #FF5656;
                                    letter-spacing: 0;
                                    margin-right: 20px;
                                }
                                span{
                                    float: left;
                                    line-height: 27px;
                                }
                            }
                            .rowbottom{
                                margin-top: 26px;
                            }
                        }
                        .center-right{
                            float: left;
                            font-size: 14px;
                            color: #7B7D7F;
                            letter-spacing: 0;
                            .rowtop{
                                line-height: 27px;
                            }
                        }
                    }
                }
            }
            .information-center{
                .right-box{
                    padding: 30px 0px;
                    .centerrow{
                        margin: 0px 50px 30px;
                        overflow: hidden;
                        .title{
                            float: left;
                            font-size: 14px;
                            color: #2D2E2E;
                            letter-spacing: 0;
                            min-width: 70px;
                            margin-right: 50px;
                            text-align: right;
                        }
                        .scorettile{
                            line-height: 34px;
                        }
                        .center{
                            float: left;
                            font-size: 14px;
                            color: #7B7D7F;
                            letter-spacing: 0;
                            width: 80%;
                            .score{
                                font-size: 20px;
                                color: #FF5656;
                            }
                        }
                    }
                    .bottomrow{
                        margin: 0px 50px;
                        overflow: hidden;
                        .title{
                            float: left;
                            font-size: 14px;
                            color: #2D2E2E;
                            letter-spacing: 0;
                            min-width: 70px;
                            margin-right: 50px;
                            text-align: right;
                        }
                        .center{
                            float: left;
                            font-size: 14px;
                            color: #7B7D7F;
                            letter-spacing: 0;
                            width: 80%;
                            .showstafflist{
                                background: #FFFFFF;
                                border: 1px solid #E9ECEF;
                                height: 150px;
                                width: 482px;
                                overflow: auto;
                                padding-bottom: 10px;
                                margin-top: 20px;
                            }
                        }
                    }
                }
            }
            .information-btn{
                margin-top: 20px;
                margin-bottom:30px;
                text-align: center;
            }
        }
    }
    .center-wrapper{
        text-align: center;
        .box{
            width: 240px;
            border-radius: 3px;
            display:inline-block;
            vertical-align: middle;
            .title{
                height: 30px;
                padding:0 10px;
                box-sizing: border-box;
                text-align: left;
            }
            .center{
                border:1px solid #E7E7E7;
                height:320px;
                box-sizing: border-box;
                overflow-y: auto;
                span{
                    display: block;
                    height:35px;
                    line-height: 35px;
                }
                .el-checkbox-group{
                    padding: 0 40px;
                    .el-checkbox{
                        display: block;
                        height:35px;
                        line-height: 35px;
                        margin:0;
                        text-align: left;
                    }
                }
            }  
        }
        .handle{
            width:90px;
            height: 320px;
            display:inline-block; 
            border-radius: 3px;
            vertical-align: middle;
            margin:0 6px;
            .toRight,.toLeft{
                height:50%;
                text-align: center;
                padding:50% 0;
                box-sizing: border-box;
            }
            .el-button{
                margin:0;
            }
        }
    }
</style>


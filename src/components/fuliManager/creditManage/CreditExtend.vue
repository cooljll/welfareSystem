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
                <el-col class="layer-tag" v-show="isShowTag1" :name="step2?'active':''" @click.native="handleStep2">2 积分发放配置</el-col>
                <el-col class="layer-tag" v-show="isShowTag2" :name="step3?'active':''" @click.native="handleStep3">3 支付订单</el-col>
                <el-col class="layer-tag" v-show="isShowTag3" :name="step4?'active':''" @click.native="handleStep4">4 订单支付完成</el-col>
            </el-row>
            <div class="layer-center1" v-show="step1">
                <div class="title">基本节日</div>
                <div class="checkboxdiv">
                    <el-button v-for="item in btnGroups" :label="item.name" :key="item.id"  @click="handleCurrentBtn(item.name,item.id)">{{item.name}}</el-button>   
                </div>
                <div class="title">激励方案</div>
                <div class="checkboxdiv">
                    <el-button @click="handleIncentiveScheme">员工激励</el-button>
                </div>
                <div class="title">自定义福利</div>
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
                <div class="title" v-show="isShow">已选中福利类型</div>
                <div class="checkedbox" v-show="isShow">
                    <div>
                        {{selectedType}}
                        <span @click="deleteCheckedType">x</span>
                    </div>
                </div>
                <el-button type="primary" @click="handleStep2">下一步</el-button>
            </div>
            <div class="layer-center2" v-show="step2">
                <div class="choose-title">
                    <a :class="allEmp?'active':''" @click="handleStep2_1">全体员工</a>
                    <a :class="specialEmp?'active':''" @click="handleStep2_2">特定员工</a>
                    <a :class="deportExtend?'active':''" @click="handleStep2_3">部门发放</a>
                </div>
                <div class="choose-center">
                    <!-- 福利类型 -->
                    <div class="row">
                        <div class="title">福利类型</div>
                        <div class="center">
                            <span class="fulitype">{{selectedType}}</span>
                        </div>
                    </div>
                    <!-- 部门发放 -->
                    <div class="row" v-show="deportExtend">
                        <div class="title">选择部门</div>
                        <div class="center">
                            <el-table style="width:660px;margin-top:20px;" :data="creditExtendData">
                                <el-table-column prop="displayName" label="部门名称" align="center"></el-table-column>
                                <el-table-column prop="memberCount" label="部门人数" align="center"></el-table-column>
                                <el-table-column label="发放积分数" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model.number="scope.row.scores"
                                         @keyup.native="!(/^[1-9][0-9]*$/.test(scope.row.scores))?scope.row.scores='':scope.row.scores">
                                        </el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <!-- 特殊员工 -->
                    <div class="row" v-show="specialEmp">
                        <div class="title">人员筛选</div>
                        <div class="center">
                            <el-button @click="selectEmployee">选择人员</el-button>
                        </div>
                    </div>
                    <div v-show="specialEmp">
                        <div class="selectedEmp">
                            <el-tag v-for="tag in extendEmpArr" :key="tag.name" closable class="tagStyle"
                                :disable-transitions="false" @close="handleClose(tag.name)">
                                {{tag.name}}
                            </el-tag>
                        </div>
                    </div>
                    <div class="row" v-show="specialEmp">
                        <div class="title">发放模式</div>
                        <div class="center">
                            <el-select v-model="specialEmpFlag" placeholder="请选择">
                                <el-option label="特定人员发放" value="1"></el-option>
                                <el-option label="特定人员不发放" value="2"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="row" v-show="specialEmp">
                        <div class="title">积分数</div>
                        <div class="credit_center">
                            <el-input v-model.number="specialScores" 
                            @keyup.native="!(/^[1-9][0-9]*$/.test(specialScores))?specialScores='':specialScores"></el-input>
                            <span>积分/人</span>
                        </div>
                    </div>
                    <!-- 全体员工 -->
                    <div class="row" v-show="allEmp">
                        <div class="title">积分数</div>
                        <div class="credit_center">
                            <el-input v-model.number="allScores"
                            @keyup.native="!(/^[1-9][0-9]*$/.test(allScores))?allScores='':allScores"></el-input>
                            <span>积分/人</span>
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
                            <el-input type="textarea" v-model="messageTemplate" style="border-radius:0;"></el-input>
                        </div>
                    </div>
                    <!-- 操作步骤 -->
                    <div class="row">
                        <div class="title">&nbsp;</div>
                        <div class="center">
                            <el-button type="primary" @click="handleStep3">下一步</el-button>
                            <el-button @click="handleStep1">上一步</el-button>
                        </div>
                    </div>
                    <!-- 描述信息 -->
                    <div class="row">
                        <div class="title">&nbsp;</div>
                        <div class="center">
                            <span class="warning">* 全部在职员工不包含冻结帐户</span>
                        </div>
                    </div>
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
                                <div class="rowbottom">冻结总人数:&nbsp;<span>{{frozenEmpCount}}</span></div>
                            </div>
                            <!-- 特殊员工 -->
                            <div class="center-right">
                                <div class="rowtop" v-show="specialEmp?true:false">每人:&nbsp;<span>{{specialScores}}</span>积分</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="information-center">
                    <div class="right-box">
                        <div class="centerrow">
                            <div class="title scoretitle">企业余额</div>
                            <div class="center">
                                <span class="score">{{Math.floor(enterpriseBalance)}}</span>
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
                               {{extendWelfareRollType}}
                               <!-- 特定员工发放 -->
                                <div class="showstafflist" v-show="isShowStaffList">
                                    <el-tag v-for="tag in extendEmpArr" :key="tag.name" closable class="tagStyle"
                                        :disable-transitions="false" @close="handleClose(tag.name)">
                                        {{tag.name}}
                                    </el-tag>
                                </div>
                                <!-- 按部门发放 -->
                                <el-table style="width:660px;margin-top:20px;" :data="extendScoresData" v-show="isShowDepartExtend">
                                     <el-table-column prop="displayName" label="部门名称" align="center"></el-table-column>
                                     <el-table-column prop="memberCount" label="部门人数" align="center"></el-table-column>
                                     <el-table-column prop="scores" label="发放积分数" align="center"></el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="information-btn">
                    <el-button type="primary" @click="paymentOrder">支付订单</el-button>
                    <el-button @click="handleStep2">上一步</el-button>
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
        <el-dialog title="选择员工" :visible.sync="selectEmpVisible" :close-on-click-modal="false" class="selectEmpDialog">
            <div class="select-wrapper">
                <el-form :inline="true">
                    <el-form-item>
                        <el-input placeholder="姓名/工号" v-model="selectEmpParams.text"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getSearchEmpResult">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="center-wrapper">
                <div class="box">
                    <div class="title">选择部门</div>
                    <div class="center">
                        <span>{{enterpriseName}}</span>
                        <el-checkbox-group v-model="checkedDepart" @change="handleChange" class="departmentList">
                            <el-checkbox v-for="(item,index) in departments" :label="item" :key="index">{{item.label}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="box">
                    <div class="title">待选人员</div>
                    <div class="center">
                        <el-checkbox-group v-model="notSelectEmp">
                            <el-checkbox v-for="(item,index) in notSelectArr" :label="item" :key="index">{{item.label}}</el-checkbox>
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
                    <div class="title">已选人员</div>
                    <div class="center">
                        <el-checkbox-group v-model="selectedEmp">
                            <el-checkbox v-for="(item,index) in selectedArr" :label="item" :key="index">{{item.label}}</el-checkbox>
                        </el-checkbox-group> 
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer footer-center">
                <el-button type="primary" @click="selectedEmpSubmit">确定</el-button>
                <el-button @click.native="selectEmpVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import authUnils from '../../../common/authUnils'
import qs from 'queryString'
export default{
    data(){
        return{
            isShowTag1:true,
            isShowTag2:true,
            isShowTag3:true,
            enterpriseName:"",
            isShowDeclare:false,
            isShow:false,//显示已选中的福利类型
            step1:true,
            step2:false,
            step3:false,
            step4:false,
            allEmp:true,
            specialEmp:false,
            deportExtend:false,
            creditExtendData:[],
            extendScoresData:[],
            customWelfareType:"",
            btnGroups:[],//节日信息
            selectedType:"",
            festivalId:0,//节日类型id
            specialEmpFlag:"",//特定人员发放与不发放标志
            selectEmpVisible:false,
            allScores:"",//全体员工积分数
            specialScores:"",//特定员工积分数
            totalScores:0,//总积分数
            messageTemplate:"",//模板寄语
            extendWelfareRollType:"全体员工",
            isShowStaffList:false,
            isShowDepartExtend:false,
            departments:[],//部门列表
            checkedDepart:[],
            //待选人员
            notSelectArr:[],
            //已选人员
            selectedArr:[],
            notSelectEmp:[],
            selectedEmp:[],
            extendEmpArr:[],//标签数组
            specialEmpCodes:[],
            totalEmployee:0,//总人数（正常）
            frozenEmpCount:0,//冻结人数
            enterpriseBalance:0,//积分余额
            //选择员工参数
            selectEmpParams:{
                depId:"",
                text:""
            },
            screenWidth:document.body.clientWidth
        }
    },
    methods:{
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
        },
        visible(){
            this.isShowDeclare=true
        },
        display(){
            this.isShowDeclare=false
        },
        handleStep1(){
            this.step1=true
            this.step2=false
            this.step3=false
            this.step4=false
        },
        handleStep2(){
            if(this.selectedType==""){
                this.$alert("请先选择福利类型","信息")
            }else{
                this.step1=false
                this.step2=true
                this.step3=false
                this.step4=false
            }
        },
        handleStep3(){
            if(this.selectedType==""){
                this.$alert("请先选择福利类型","信息")
            }else if(this.extendEmpArr==""&&this.specialEmp){
                this.$alert("请选择发放人员","信息")
            }else if(this.allScores==""&&this.allEmp){
                this.$alert("积分数不能为空","信息")
            }else if(this.specialScores==""&&this.specialEmp){
                this.$alert("积分数不能为空","信息")
            }else if(this.specialEmpFlag==""&&this.specialEmp){
                this.$alert("请选择特定人员发放模式","信息")
            }else if(this.messageTemplate==""){
                this.$alert("模板寄语不能为空","信息")
            }else{
                this.getNormalEmps()//计算消费总积分
                this.getFrozenEmps()
                this.getEnterpriseBalance()
                this.step1=false
                this.step2=false
                this.step3=true
                this.step4=false
            } 
        },
        handleStep4(){
            this.step1=false
            this.step2=false
            this.step3=false
            this.step4=true
        },
        handleStep2_1(){
            this.allEmp=true
            this.specialEmp=false
            this.deportExtend=false
            this.extendWelfareRollType="全体员工"
            this.isShowStaffList=false
            this.isShowDepartExtend=false
        },
        handleStep2_2(){
            this.allEmp=false
            this.specialEmp=true
            this.deportExtend=false         
            this.isShowStaffList=true
            this.isShowDepartExtend=false
        },
        handleStep2_3(){
            this.allEmp=false
            this.specialEmp=false
            this.deportExtend=true
            this.extendWelfareRollType="按部门发放"
            this.getDepartmentList()         
            this.isShowStaffList=false
            this.isShowDepartExtend=true
        },
        //键盘事件
        countkeyup(){
            var reg=/^[1-9][0-9]*$/
            if((!reg.test(this.allScores))||(!reg.test(this.specialScores))){
               this.allScores='' 
               this.specialScores=''
            }else{
                this.allScores=this.allScores
                this.specialScores=this.specialScores
            }
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
        //模板寄语
        randomTemMessage(){
            if(this.selectedType==""){
                this.$alert("请先选择福利类型","信息")
            }else{
                this.$axios.post("/api/api/integral/showBless",{typeId:this.festivalId}).then(res=>{
                    if(res.status==200){
                        if(res.data.code==1000){
                            this.messageTemplate=res.data.data
                        }
                    }
                })
            }
        },
        //总人数（不包含冻结）
        getNormalEmps(){
            this.$axios.post("/api/api/employee/selEmpCount",true,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(res=>{
                if(res.data.code==1000){
                    if(this.allEmp){
                        this.totalEmployee=res.data.data
                        this.totalScores=this.totalEmployee*this.allScores
                    }
                    if(this.specialEmp){
                        if(this.specialEmpFlag=="1"){
                            this.extendWelfareRollType="按特定人员发放"
                            this.totalEmployee=this.extendEmpArr.length
                        }else{
                            this.extendWelfareRollType="按特定人员不发放"
                            this.totalEmployee=res.data.data-this.extendEmpArr.length
                        }
                        this.totalScores=this.totalEmployee*this.specialScores
                    }
                    if(this.deportExtend){
                        this.getDepartmentList()
                        this.creditExtendData.forEach(item=>{
                            if(item.scores){
                                this.totalEmployee+=item.memberCount
                                this.totalScores+=item.memberCount*item.scores
                                this.extendScoresData.push(item)
                            }
                        })
                    }
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        //冻结人数
        getFrozenEmps(){
            this.$axios.post("/api/api/employee/frozenEmpCount",{}).then(res=>{
                if(res.data.code==1000){
                    this.frozenEmpCount=res.data.data
                }
            })
        },
        //企业余额
        getEnterpriseBalance(){
            this.$axios.post("/api/api/enterprise/getPoint",{}).then(res=>{
                if(res.data.code==1000){
                    this.enterpriseBalance=res.data.data
                }
            })
        },
        //部门树形
        getTreeDep(){
            this.$axios.post("/api/api/organize/showTreeDep",qs.stringify({include:false})).then(res=>{
                if(res.data.code==1000){
                    let ret=this.transferData(res.data.data)
                    this.enterpriseName=ret.label
                    this.departments=[]
                    this.departments=ret.subItems
                }
            })
        },
        //全体员工发放积分
        allEmpExtendScores(){
            this.$axios.post("/api/api/integral/postIntegralByAll",{
                blessMsg:this.messageTemplate,
                festivalId:this.festivalId.toString(),
                point:this.allScores.toString(),
                tolPoint:this.totalScores.toString()
            }).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.handleStep4()
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        //特定员工发放积分
        specialEmpExtendScores(){
            this.specialEmpCodes=[]
            this.extendEmpArr.forEach(item=>{
                this.specialEmpCodes.push(item.empCode)
            })
            this.$axios.post("/api/api/integral/postIntegralBySpecial",{
                blessMsg:this.messageTemplate,
                festivalId:this.festivalId.toString(),
                point:this.specialScores.toString(),
                tolPoint:this.totalScores.toString(),
                empCodes:this.specialEmpCodes
            }).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.handleStep4()
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        //特定人员不发放积分
        specialEmpNotExtendScores(){
            this.specialEmpCodes=[]
            this.extendEmpArr.forEach(item=>{
                this.specialEmpCodes.push(item.empCode)
            })
            this.$axios.post("/api/api/integral/postIntegralBySpecialNot",{
                blessMsg:this.messageTemplate,
                festivalId:this.festivalId.toString(),
                point:this.specialScores,
                tolPoint:this.totalScores,
                empCodes:this.specialEmpCodes
            }).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.handleStep4()
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        //部门发放积分
        deportEmpExtendScores(arr){
            this.$axios.post("/api/api/integral/postIntegralByDep",{
                blessMsg:this.messageTemplate,
                festivalId:this.festivalId.toString(),
                tolPoint:this.totalScores.toString(),
                depts:arr
            }).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.handleStep4()
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.data.message)
                }
            })
        },
        //选择员工
        selectEmployee(){
            this.selectEmpVisible=true
            this.notSelectArr=[]
            this.getTreeDep()
        },
        //显示部门序列表
        getDepartmentList(){
            this.$axios.post("/api/api/organize/showDep",qs.stringify({include:true})).then(res=>{
                if(res.data.code==1000){
                    this.creditExtendData=[]
                    res.data.data.forEach(item=>{
                        if(item.memberCount!=0){
                            this.creditExtendData.push(item)
                        }
                    })
                }
            })
        },
        handleChange(){
            this.selectEmpParams.text=""
            this.notSelectArr=[]
            this.checkedDepart.forEach(item=>{
                this.$axios.post("/api/api/employee/selectEmployee",{
                    depId:item.organizationUnitId,
                    text:this.selectEmpParams.text
                }).then(res=>{
                    if(res.data.code==1000){
                        res.data.data.content.forEach(item=>{
                            if(item.job_Number==""){
                                item["label"]=item.name
                            }else{
                                item["label"]=item.name+"("+item.job_Number+")"
                            }
                            this.notSelectArr.unshift(item)
                        })
                    }
                })
            })
        },
        //搜索员工
        getSearchEmpResult(){
            if(this.selectEmpParams.text.trim()==""){
                return 
            }else{
                this.checkedDepart=[]
                this.$axios.post("/api/api/employee/selectEmployee",this.selectEmpParams).then(res=>{
                    if(res.data.code==1000){
                        this.notSelectArr=[]
                        res.data.data.content.forEach(item=>{
                            if(item.job_Number==""){
                                item["label"]=item.name
                            }else{
                                item["label"]=item.name+"("+item.job_Number+")"
                            }
                            this.notSelectArr.push(item)
                        })
                    }
                })
            }
        },
        allMoveToRight(){
            this.notSelectArr.forEach((item,index)=>{
                this.selectedArr.push(item)
            })
            this.notSelectArr=[]
        },
        partMoveToRight(){
            if(this.notSelectEmp.length==0){
                return false
            }
            this.notSelectEmp.forEach((item,index)=>{
                this.selectedArr.push(item)
            })
            this.notSelectArr=this.notSelectArr.filter(item => !this.notSelectEmp.includes(item))
            this.notSelectEmp=[]
        },
        allMoveToLeft(){
            this.selectedArr.forEach((item,index)=>{
                this.notSelectArr.push(item)
            })
            this.selectedArr=[]
        },
        partMoveToLeft(){
            if(this.selectedEmp.length==0){
                return false
            }
            this.selectedEmp.forEach((item,index)=>{
                this.notSelectArr.push(item)
            })
            this.selectedArr=this.selectedArr.filter(item => !this.selectedEmp.includes(item))
            this.selectedEmp=[]
        },
        selectedEmpSubmit(){
            this.extendEmpArr=[]
            this.extendEmpArr=this.extendEmpArr.concat(this.selectedArr)
            this.selectEmpVisible=false
        },
        //标签删除
        handleClose(tag){
            this.extendEmpArr.splice(this.extendEmpArr.indexOf(tag), 1)
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
        //支付订单
        paymentOrder(){
            this.$alert("确定支付订单吗？","信息").then(()=>{
                if(this.isShowStaffList){
                    if(this.specialEmpFlag=="1"){
                        this.specialEmpExtendScores()
                    }else{
                        this.specialEmpNotExtendScores()
                    }
                }else if(this.isShowDepartExtend){
                    var tempDepArr=[]
                    this.extendScoresData.forEach(item=>{
                        let obj={}
                        obj["depName"]=item.displayName
                        obj["deptId"]=item.organizationUnitId.toString()
                        obj["nums"]=item.memberCount.toString()
                        obj["point"]=item.scores.toString()
                        tempDepArr.push(obj)
                    })
                    this.deportEmpExtendScores(tempDepArr)
                }else{
                    this.allEmpExtendScores()
                }
            })
        },
        oneMoreExtend(){
            this.step1=true
            this.step2=false
            this.step3=false
            this.step4=false
            this.selectedType=""
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
            .title{
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
        }
        .layer-center2{
            min-height: 580px;
            padding: 20px;
            box-sizing: border-box;
            .choose-title{
                padding-left: 20px;
                overflow: hidden;//清楚浮动
                a{
                    float: left;
                    background: #EEEEEE;
                    border: 1px solid #EEEEEE;
                    border-radius: 100px;
                    height: 28px;
                    line-height: 28px;
                    font-size: 14px;
                    color: #A8A9AB;
                    letter-spacing: 0;
                    padding: 0px 18px;
                    cursor: pointer;
                    margin-right: 15px;
                    margin-bottom: 20px;
                    &.active{
                        background: #9ACC6A;
                        border: 1px solid #9ACC6A;
                        color: #FFFFFF;
                    }
                }
            }
            .choose-center{
                background: #FAFAFA;
                border: 1px solid #EAEAEA;
                padding: 30px;
                .row{
                    margin-bottom: 15px;
                    overflow: hidden;
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
                        span.warning{
                            color:red;
                        }
                        .el-textarea{
                            .el-textarea__inner{
                                height:160px;
                            }
                        }
                    }
                    // 积分样式
                    .credit_center{
                        float: left;
                        width: 400px;
                        .el-input{
                            width:217px;
                            margin-right: 10px;
                        }
                    }
                    span{
                        height: 40px;
                        line-height: 40px;
                        font-size: 14px;
                        letter-spacing: 0;
                        color: #7B7D7F;
                    }
                }
                .selectedEmp{
                    background: #FFFFFF;
                    border: 1px solid #E9ECEF;
                    height: 150px;
                    width: 482px;
                    overflow: auto;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
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
    // 选择人员    
    .select-wrapper{
        text-align: center;
    }
    .center-wrapper{
        text-align: center;
        .box{
            width: 240px;
            border-radius: 3px;
            display:inline-block;
            vertical-align: middle;
            margin:0 6px;
            .title{
                height: 30px;
                padding:0 10px 10px;
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
                    padding: 0 20px;
                    .el-checkbox{
                        display: block;
                        height:35px;
                        line-height: 35px;
                        margin:0;
                        text-align: left;
                    }
                }
                .departmentList{
                    padding:0 50px;
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

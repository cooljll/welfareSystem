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
                <el-col class="layer-tag" :name="step?'active':''" @click.native="handleStep">1 选购福利卷</el-col>
                <el-col class="layer-tag" v-show="isShowTag1" :name="step1?'active':''" @click.native="handleStep1">2 选择福利类型</el-col>
                <el-col class="layer-tag" v-show="isShowTag2" :name="step2?'active':''" @click.native="handleStep2">3 福利卷发放配置</el-col>
                <el-col class="layer-tag" v-show="isShowTag3" :name="step3?'active':''" @click.native="handleStep3">4 支付订单</el-col>
                <el-col class="layer-tag hidden-md-and-down" :name="step4?'active':''">5 创建订单完成</el-col>
            </el-row>
            <div v-show="isShowWelfareRoll">
                <div class="layer-center" v-show="step" v-loading="loading">
                    <div class="voucherlist">
                        <div v-for="(item,index) in welfareRollList" :key="index" @click="getWelfareRolls(item.id)">
                            <div class="imgbox">
                                <img :src="item.welfareVoucherLogoUrl">
                            </div>
                            <div class="title">{{item.name}}</div>
                            <div class="scorebox">
                                <span class="score">{{item.price}}</span>
                                <span class="company">积分</span>
                                <span class="oldscore">市场价: {{item.oldPrice}}积分</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layer-center1" v-show="step1">
                    <div class="title">福利卷
                        <span class="welfareTitle">{{welfareRollDialogTitle}}</span>
                    </div>
                    <div class="title">基本节日</div>
                    <div class="checkboxdiv">
                        <el-button v-for="(item,index) in btnGroups" :label="item.name" :key="item.id"
                        :class="{'btnStyle':proIndex==index}" class="overbtnStyle"
                        @click="handleCurrentBtn(item.name,item.id,index)">{{item.name}}</el-button>        
                    </div>
                    <div class="title">激励方案</div>
                    <div class="checkboxdiv">
                        <el-button @click="handleIncentiveScheme" class="overbtnStyle">员工激励</el-button>
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
                        <!-- 福利卷 -->
                        <div class="row">
                            <div class="title">福利卷</div>
                            <div class="center">
                                <span class="fulitype">{{welfareRollDialogTitle}}</span>
                            </div>
                        </div>
                        <!-- 福利类型 -->
                        <div class="row">
                            <div class="title">福利类型</div>
                            <div class="center">
                                <span class="fulitype">{{selectedType}}</span>
                            </div>
                        </div>
                        <!-- 特定人员 -->
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
                        <!-- 部门发放 -->
                        <div class="row" v-show="deportExtend">
                            <div class="title">选择部门</div>
                            <div class="center">
                                <el-table style="width:660px;margin-top:20px;" :data="creditExtendData" @selection-change="handleSelectionChange">
                                    <el-table-column type="selection" align="center" class-name="reset"></el-table-column>
                                    <el-table-column prop="displayName" label="部门名称" align="center"></el-table-column>
                                    <el-table-column prop="memberCount" label="部门人数" align="center"></el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <!-- 模板寄语 -->
                        <div class="row">
                            <div class="title">邮件寄语</div>
                            <div class="center">
                                <a class="btnmessage" @click="getRandomMessage">
                                    <img src="http://192.168.1.197:8082/assets/img/template.png">
                                    <span>寄语模板 (点击自动生成)</span>
                                </a>
                                <el-input type="textarea" v-model="messageTemplate" style="border-radius:0;"></el-input>
                            </div>
                        </div>
                        <!-- 上下步操作 -->
                        <div class="row">
                            <div class="title">&nbsp;</div>
                            <div class="center">
                                <el-button type="primary" @click="handleStep3">下一步</el-button>
                                <el-button @click="handleStep1">上一步</el-button>
                            </div>
                        </div>
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
                                    {{extendWelfareRollType}}
                                    <!-- 特定员工发放 -->
                                    <div class="showstafflist" v-show="isShowStaffList">
                                        <el-tag v-for="tag in extendEmpArr" :key="tag.name" closable class="tagStyle"
                                            :disable-transitions="false" @close="handleClose(tag.name)">
                                            {{tag.name}}
                                        </el-tag>
                                    </div>
                                    <!-- 按部门发放 -->
                                    <el-table style="width:660px;margin-top:20px;" :data="selectedDepArr" v-show="isShowDepartExtend">
                                        <el-table-column prop="displayName" label="部门名称" align="center"></el-table-column>
                                        <el-table-column prop="memberCount" label="部门人数" align="center"></el-table-column>
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
                            <el-button type="primary" @click="$router.push('/WelfareRollExtend')">再次发放</el-button>
                            <el-button @click="$router.push('/WelfareRollOrder')">查看订单</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 无福利卷 -->
            <div class="nonData" v-show="isShowNotData">
                <img src="../../../assets/img/dataerror.png">
                <span>暂无福利卷</span>
            </div>
        </div>
        <!-- 福利卷弹窗 -->
        <el-dialog :title="welfareRollDialogTitle" :visible.sync="welfareRollDemoVisible" :close-on-click-modal="false" class="welfareRollDialog">
            <div class="welfare_wrapper">
                <div class="pro_content" v-for="(item,index) in productList" :key="index" @click="goToMall(item.url)">
                    <div class="imgbox">
                        <img :src="item.imageUrl" alt="">
                    </div>
                    <div class="info">
                        <div class="title">
                            {{item.name}}
                        </div>
                        <div class="desc">
                            {{item.shortDescription}}
                        </div>
                        <div class="shop_score">市场价 {{item.oldPrice}}</div>
                        <div class="cur_score">{{item.price}} 积分</div>
                    </div>
                </div>
            </div>
            <div class="welfare_footer">
                <div class="contentbox">
                    <div class="descriptiontitle">套餐说明</div>
                    <div class="description">{{rollDescription}}</div>
                    <div class="leftcon">
                        <span class="title">失效时间:</span>
                        <span class="vouchertime">{{rollInvalidtime}}</span>
                    </div>
                    <div class="rightcon">
                        <span class="title">总价:</span>
                        <span class="voucherscore">{{rollScores}}</span>
                        <span class="title">积分</span>
                    </div>
                </div>
                <el-button type="primary" @click="confirmBuy">立即购买</el-button>
            </div>
        </el-dialog>
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
var root = process.env.API_ROOT
export default{
    data(){
        return{
            proIndex:-1,
            isShowTag1:true,
            isShowTag2:true,
            isShowTag3:true,
            enterpriseName:"",
            welfareRollList:[],
            productList:[],
            isShowDeclare:false,
            isShow:false,
            step:true,
            step1:false,
            step2:false,
            step3:false,
            step4:false,
            allEmp:true,
            specialEmp:false,
            deportExtend:false,
            festivalId:0,//节日类型id
            specialEmpFlag:"",//特定人员发放与不发放标志
            creditExtendData:[],
            welfareRollDemoVisible:false,
            welfareRollDialogTitle:"",
            flag:false,
            btnGroups:[],
            selectedType:"",
            extendCreditNum:"",//积分数
            customWelfareType:'',
            messageTemplate:"",//模板寄语
            extendWelfareRollType:"全体员工",
            isShowStaffList:false,
            isShowDepartExtend:false,
            selectEmpVisible:false,
            departments:[],//部门列表
            checkedDepart:[],
            //待选人员
            notSelectArr:[],
            //已选人员
            selectedArr:[],
            notSelectEmp:[],
            selectedEmp:[],
            extendEmpArr:[],//标签数组
            rollDescription:"",
            rollInvalidtime:"",
            productName:"",//福利卷名称
            welfareVoucherId:"",//福利卷id
            rollScores:0,//福利卷积分
            totalScores:0,//总积分数
            totalEmployee:0,//总人数（正常）
            frozenEmpCount:0,//冻结人数
            enterpriseBalance:0,//积分余额
            //选择员工参数
            selectEmpParams:{
                depId:"",
                text:""
            },
            selectedDepArr:[],//选中的部门
            screenWidth:document.body.clientWidth,
            enterpriseEmpTotal:0,//企业员工总数
            productParams:{
                pageNum:1,
                pageSize:10
            },
            isShowWelfareRoll:true,
            isShowNotData:false,
            loading:false
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
        // 显示免责声明
        visible(){
            this.isShowDeclare=true
        },
        // 隐藏免责声明
        display(){
            this.isShowDeclare=false
        },
        handleStep(){
            this.step=true
            this.step1=false
            this.step2=false
            this.step3=false
            this.step4=false
        },
        handleStep1(){
            if(!this.flag){
                this.$alert("请先选择福利卷","信息")
            }else{
                this.step=false
                this.step1=true
                this.step2=false
                this.step3=false
                this.step4=false
                this.showFestival()
            }
        },
        handleStep2(){
            if(!this.flag){
                this.$alert("请先选择福利卷","信息")
            }else if(this.selectedType==""){
                this.$alert("请先选择福利类型","信息")
            }else{
                this.step1=false
                this.step2=true
                this.step=false
                this.step3=false
                this.step4=false
            }
        },
        handleStep3(){
            if(!this.flag){
                this.$alert("请先选择福利卷","信息")
            }else if(this.selectedType==""){
                this.$alert("请先选择福利类型","信息")
            }else if(this.extendEmpArr==""&&this.specialEmp){
                this.$alert("请选择发放人员","信息")
            }else if(this.specialEmpFlag==""&&this.specialEmp){
                this.$alert("请选择特定人员发放模式","信息")
            }else if(this.messageTemplate==""){
                this.$alert("模板寄语不能为空","信息")
            }else{
                this.getNormalEmps()//计算消费总积分
                this.getFrozenEmps()
                this.getEnterpriseBalance()
                this.step=false
                this.step1=false
                this.step2=false
                this.step3=true
                this.step4=false
            }
        },
        handleStep4(){
            this.step=false
            this.step1=false
            this.step2=false
            this.step3=false
            this.step4=true 
        },
        // 子级
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
        //立即购买
        confirmBuy(){
            this.welfareRollDemoVisible=false
            this.flag=true
            this.handleStep1()
        },
        //基本节日选中处理
        handleCurrentBtn(val,id,index){
            this.proIndex=index
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
        getRandomMessage(){
            this.$axios.post(root+"integral/showBless",{typeId:this.festivalId}).then(res=>{
                if(res.data.code==1000){
                    this.messageTemplate=res.data.data
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,'信息')
                }
            })
        },
        //总人数（不包含冻结）
        getNormalEmps(){
            this.$axios.post(root+"employee/selEmpCount",true,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(res=>{
                if(res.data.code==1000){
                    if(this.allEmp){
                        this.totalEmployee=res.data.data
                        this.totalScores=this.totalEmployee*this.rollScores
                    }
                    if(this.specialEmp){
                        if(this.specialEmpFlag=="1"){
                            this.extendWelfareRollType="按特定人员发放"
                            this.totalEmployee=this.extendEmpArr.length
                        }else{
                            this.extendWelfareRollType="按特定人员不发放"
                            this.totalEmployee=res.data.data-this.extendEmpArr.length
                        }
                        this.totalScores=this.totalEmployee*this.rollScores
                    }
                    if(this.deportExtend){
                        this.selectedDepArr.forEach(item=>{
                            this.totalEmployee+=item.memberCount
                            this.totalScores+=item.memberCount*this.rollScores
                        })
                    }
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        //冻结人数
        getFrozenEmps(){
            this.$axios.post(root+"employee/frozenEmpCount",{}).then(res=>{
                if(res.data.code==1000){
                    this.frozenEmpCount=res.data.data
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        //企业余额
        getEnterpriseBalance(){
            this.$axios.post(root+"enterprise/getPoint",{}).then(res=>{
                if(res.data.code==1000){
                    this.enterpriseBalance=res.data.data
                }
            })
        },
        //部门树形
        getTreeDep(){
            this.$axios.post(root+"organize/showTreeDep",qs.stringify({include:false})).then(res=>{
                if(res.data.code==1000){
                    let ret=this.transferData(res.data.data)
                    this.enterpriseName=ret.label
                    this.departments=[]
                    this.departments=ret.subItems
                }
            })
        },
        //全体员工发放福利卷
        allEmpExtendRolls(){
            this.$axios.post(root+"voucher/postVoucherByAll",{
                blessMsg:this.messageTemplate,
                festivalId:this.festivalId.toString(),
                nums:this.totalEmployee.toString(),
                productName:this.productName,
                productPrice:this.rollScores.toString(),
                welfareVoucherId:this.welfareVoucherId,
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
        //特定员工发放福利卷
        specialEmpExtendRolls(){
            this.specialEmpCodes=[]
            this.extendEmpArr.forEach(item=>{
                this.specialEmpCodes.push(item.empCode)
            })
            this.$axios.post(root+"voucher/postVoucherBySpecial",{
                blessMsg:this.messageTemplate,
                festivalId:this.festivalId.toString(),
                nums:this.totalEmployee.toString(),
                productName:this.productName,
                productPrice:this.rollScores.toString(),
                welfareVoucherId:this.welfareVoucherId,
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
        //特定人员不发放福利卷
        specialEmpNotExtendRolls(){
            this.specialEmpCodes=[]
            this.extendEmpArr.forEach(item=>{
                this.specialEmpCodes.push(item.empCode)
            })
            this.$axios.post(root+"voucher/postVoucherBySpecialNot",{
                blessMsg:this.messageTemplate,
                festivalId:this.festivalId.toString(),
                nums:this.totalEmployee.toString(),
                productName:this.productName,
                productPrice:this.rollScores.toString(),
                welfareVoucherId:this.welfareVoucherId,
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
        //部门发放福利卷
        deportEmpExtendRolls(arr){
            this.$axios.post(root+"voucher/postVoucherByDep",{
                blessMsg:this.messageTemplate,
                festivalId:this.festivalId.toString(),
                nums:this.totalEmployee.toString(),
                productName:this.productName,
                productPrice:this.rollScores.toString(),
                welfareVoucherId:this.welfareVoucherId,
                tolPoint:this.totalScores.toString(),
                depts:arr
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
        //选择员工
        selectEmployee(){
            this.selectEmpVisible=true
            this.notSelectArr=[]
            this.getTreeDep()
        },
        //显示部门序列表
        getDepartmentList(){
            this.$axios.post(root+"organize/showDep",qs.stringify({include:true})).then(res=>{
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
                this.$axios.post(root+"employee/selectEmployee",{
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
                this.$axios.post(root+"employee/selectEmployee",this.selectEmpParams).then(res=>{
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
        handleClose(tag){
            this.extendEmpArr.splice(this.extendEmpArr.indexOf(tag), 1)
        },
        //表格选中
        handleSelectionChange(val){
            this.selectedDepArr=val
        },
        //获取福利卷
        getProduct(){
            this.loading=true
            this.$axios.post(root+"voucher/product",this.productParams).then(res=>{
                this.loading=false
                if(res.data.code==1000){
                    let welfareRolls=res.data.data.content
                    if(welfareRolls.length==0){
                        this.isShowWelfareRoll=false
                        this.isShowNotData=true
                    }else{
                        this.isShowWelfareRoll=true
                        this.isShowNotData=false
                        this.welfareRollList=welfareRolls
                    }
                }else if(res.data.code==1001){
                    this.$alert(res.message,"信息")
                }
            })
        },
        //获取福利卷详情
        getWelfareRolls(id){
            this.welfareVoucherId=id
            const loading = this.$loading({
                lock: true,
                text: '正在获取福利卷',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            this.$axios.post(root+"voucher/product/sku",qs.stringify({voucherId:id})).then(res=>{
                if(res.data.code==1000){
                    loading.close()
                    this.welfareRollDialogTitle=res.data.data.name
                    this.productList=res.data.data.welfareProducts
                    this.rollScores=res.data.data.price
                    this.productName=res.data.data.name
                    this.rollDescription=res.data.data.summary
                    this.rollInvalidtime=res.data.data.endDate
                    this.welfareRollDemoVisible=true
                }else if(res.data.code==1001){
                    this.$alert(res.message,"信息")
                }
            })
        },
        //跳转到商城查看商品详情
        goToMall(url){
            window.open(url)
        },
        //节日信息
        showFestival(){
            this.$axios.post(root+"integral/showFestival",{}).then(res=>{
                if(res.data.code==1000){
                    this.btnGroups=res.data.data
                }
            })
        },
        //支付订单
        paymentOrder(){
            this.$alert("确定支付订单吗？","信息").then(()=>{
                if(this.isShowStaffList){
                    if(this.specialEmpFlag=="1"){
                        this.specialEmpExtendRolls()
                    }else{
                        this.specialEmpNotExtendRolls()
                    }
                }else if(this.isShowDepartExtend){
                    let tempArr=[]
                    this.selectedDepArr.forEach(item=>{
                        tempArr.push(item.organizationUnitId)
                    })
                    this.deportEmpExtendRolls(tempArr)
                }else{
                    this.allEmpExtendRolls()
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
        }
    },
    mounted(){
        this.getProduct()
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
    .btnStyle{
        background:#9ACC6A;
        border: 1px solid #9ACC6A;
        color:#fff;
    }
    .page-center{
        padding:0;
        .layer-center1{
            min-height: 580px;
            padding: 40px 60px; 
            //积分excel
            .title{
                margin-bottom: 15px;
                font-size: 14px;
                .welfareTitle{
                    margin-left: 20px;
                }
            }
            .checkboxdiv{
                max-width:690px;
                .el-button{
                    margin:0 10px 15px 0;
                }
                .overbtnStyle{
                    &:hover{
                        background:#9ACC6A;
                        border: 1px solid #9ACC6A;
                        color:#fff;
                    }
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
                        font-size: 14px;
                        float: left;
                        line-height: 40px;
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
    .nonData{
        margin-bottom: 10px;
        img{
            display: block;
            margin: 95px auto 30px;
            border:0;
            width:317px;
            height:181px;
        }
        span{
            display: block;
            text-align: center;
            font-size: 24px;
            color: #A8A9AB;
            margin-bottom: 120px;
        }
    }
    .welfare_wrapper{
        height: 442px;
        width:100%;
        background: #F7F8F9;
        padding: 20px 30px 10px;
        box-sizing: border-box;
        overflow-y: scroll;
        .pro_content{
            background: #fff;
            margin-bottom: 10px;
            overflow: hidden;
            width:100%;
            .imgbox{
                float: left;
                width:150px;
                text-align: center;
                img{
                    max-width: 120px;
                    max-height: 120px;
                }
            }
            .info{
                padding-left:150px;
                .title{
                    margin: 15px 15px 0px 10px;
                    font-size:14px;
                    color:#333333;
                    font-weight: bold;
                    cursor: pointer;
                }
                .desc{
                    margin: 5px 15px 0px 10px;
                    font-size:12px;
                    color:#666666;
                    cursor: pointer;
                }
                .shop_score{
                   float: right;
                   text-decoration:line-through;
                   margin: 5px 15px 15px 10px;
                   cursor: pointer; 
                }
                .cur_score{
                    float: left;
                    margin: 5px 15px 15px 10px;
                    font-size: 16px;
                    color: #FF6F31;
                    cursor: pointer;
                }
            }
        }
    }
    .welfare_footer{
        background:#fff;
        .contentbox{
            padding:20px;
            box-sizing: border-box;
            overflow: hidden;
            .descriptiontitle{
                font-size: 14px;
                color: #2D2E2E;
                letter-spacing: 0;
                margin-bottom: 5px;
            }
            .description{
                font-size: 12px;
                color: #A8A9AB;
                line-height: 20px;
                margin-bottom: 20px;
            }
            .leftcon{
                float: left;
                .vouchertime{
                    font-family: 'ArialMT';
                    font-size: 14px;
                    color: #A8A9AB;
                    letter-spacing: 0;
                    margin-left: 10px;
                }
            }
            .rightcon{
                float: right;
                .voucherscore{
                    font-family: 'Arial-BoldMT';
                    font-size: 18px;
                    color: #FF6F31;
                    letter-spacing: 0;
                }
            }
            .title{
                font-size: 14px;
                color: #2D2E2E;
                letter-spacing: 0;
            }
        }
        .el-button{
            width:100%;
            border-radius: 0;
            font-size:16px;
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
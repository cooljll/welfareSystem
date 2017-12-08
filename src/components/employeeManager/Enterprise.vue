<template>
    <div>
        <!-- 企业通讯录 -->
        <div v-show="($route.params.id=='0'||$route.params.id=='1')?true:false">
            <div class="indextitle">
                <div class="indextitlebox">
                    <span class="indexlefttitle">
                        当前部门：{{$route.params.currentVal}}
                    </span>
                    <div class="indexrighttitle" v-show="$route.params.id=='0'?true:false">
                        <el-button type="info" @click="addDepartment">
                            <i class="iconfont icon-tianjia"></i>
                            添加部门
                        </el-button>
                        <el-button type="info" @click="buildQRcode">
                            <i class="iconfont icon-erweima"></i>
                            生成二维码
                        </el-button>
                    </div>
                    <div class="indexrighttitle" v-show="$route.params.id=='1'?true:false">
                        <el-button type="info" @click="editDepartment(Number($route.params.depId))">
                            <i class="iconfont icon-bianji"></i>
                            编辑
                        </el-button>
                        <el-button type="info" @click="deleteDepartment(Number($route.params.depId))">
                            <i class="iconfont icon-bianji"></i>
                            删除部门
                        </el-button>
                        <el-button type="info" @click="addDepartment">
                            <i class="iconfont icon-tianjia"></i>
                            添加部门
                        </el-button>
                        <el-button type="info" @click="buildQRcode">
                            <i class="iconfont icon-erweima"></i>
                            生成二维码
                        </el-button>
                    </div>
                </div>
            </div>
            <el-row class="content-wrapper">
                <el-col class="searchBar">
                    <div class="handleBar" @mouseenter="visibleAddHandle" @mouseleave="displayAddHandle">
                        <i class="iconfont icon-tianjia"></i>
                        <span>添加员工</span>
                        <div class="subhandle" v-show="isShowAddHandle">
                            <el-menu>
                                <el-menu-item index="1" @click="addEmployee">单个添加</el-menu-item>
                                <el-menu-item index="2" @click="batchExportEmp">导入</el-menu-item>
                            </el-menu>
                        </div>
                    </div>
                    <div class="handleBar" @mouseenter="visibleHandle" @mouseleave="displayHandle">
                        <i class="iconfont icon-caozuo"></i>
                        <span>操作</span>
                        <div class="subhandle" v-show="isShowHandle">
                            <el-menu>
                                <el-menu-item index="1" @click="moveToDepartment">移至部门</el-menu-item>
                                <el-menu-item index="2" @click="moveoutOfEnterprise">移出企业</el-menu-item>
                                <el-menu-item index="3" @click="freezeEmployee">冻结</el-menu-item>
                                <el-menu-item index="4" @click="relieveEmployee">解冻</el-menu-item>
                            </el-menu>
                        </div>
                    </div>
                    <div class="handleBar" @mouseenter="visibleHandleInfo" @mouseleave="displayHandleInfo">
                        <i class="iconfont icon-icontishiwenhao"></i>
                        <span>操作说明</span>
                        <div class="subhandle" style="width:260px;" v-show="isShowHandleInfo">
                            <div class="info">
                                <div>
                                    <span class="title">移至部门：</span><span class="center">将员工移至指定部门的操作。</span>
                                </div>
                                <div>
                                    <span class="title">移出企业：</span><span class="center">用于员工离职的操作。</span>
                                </div>
                                <div>
                                    <span class="title">冻结：</span><span class="center">员工被冻结后，默认不会给冻结员工发放积分或福利。员工在商城也无法使用积分进行消费。</span>
                                </div>
                                <div>
                                    <span class="title">解冻：</span><span class="center">将冻结员工恢复成正常状态的操作。</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-form :inline="true">
                        <el-form-item label="类型：">
                            <el-select placeholder="请选择类型" v-model="filters.accountStatus">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="正常" value="0"></el-option>
                                <el-option label="冻结" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label-width="250">
                            <el-input placeholder="姓名/手机号/工号" v-model="filters.text"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="info" @click="getBeInJobResult">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-table  v-loading="loading" :data="tableData" border resizable highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" align="center">
                    </el-table-column>
                    <el-table-column prop="department" label="部门" align="center">
                    </el-table-column>
                    <el-table-column prop="phone" label="手机号" align="center">
                    </el-table-column>
                    <el-table-column prop="job_Number" label="工号" align="center">
                    </el-table-column>
                    <el-table-column prop="isFrozen" label="账户状态" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <router-link :to="{path:'/Employee_Detail/'+$route.params.currentVal+'/'+$route.params.id+'/'+encodeURI(JSON.stringify(scope.row))}">
                                <el-button type="text">查看</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
                <el-col :span="24" class="toolbar">
                    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
                        :page-sizes="[100, 200, 300, 400]" :page-size="100"  layout="total, sizes, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
        <!-- 离职列表 -->
        <div v-show="$route.params.id=='2'?true:false">
            <div class="indextitle">
                <div class="indextitlebox">
                    <span class="indexlefttitle">
                        离职列表
                    </span>
                </div>
            </div>
            <el-row class="content-wrapper">
                <el-col class="searchBar">
                    <el-form :inline="true">
                        <el-form-item label="">
                            <el-input placeholder="姓名/手机号/工号" v-model="filtersDel.text"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="info" @click="getleaveOfficeList">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-table v-loading="examineLoading" :data="leaveTableData" border resizable highlight-current-row style="width: 100%;">
                    <el-table-column type="selection" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" align="center">
                    </el-table-column>
                    <el-table-column prop="department" label="部门" align="center">
                    </el-table-column>
                    <el-table-column prop="identifyNumber" label="证件号" align="center">
                    </el-table-column>
                    <el-table-column prop="phone" label="手机号" align="center">
                    </el-table-column>
                    <el-table-column prop="joinedDate" label="入职时间" sortable align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="pullbackEnterprise(scope.row.empCode)">拉回企业</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-col :span="24" class="toolbar">
                    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
                        :page-sizes="[100, 200, 300, 400]" :page-size="100"  layout="total, sizes, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
        <!-- 审批中心 -->
        <div v-show="$route.params.id=='3'?true:false">
            <div class="indextitle">
                <div class="indextitlebox">
                    <span class="indexlefttitle">
                        审批中心
                    </span>
                    <div class="indexrighttitle">
                        <el-button type="info" @click="buildQRcode">
                            <i class="iconfont icon-erweima"></i>
                            生成二维码
                        </el-button>
                    </div>
                </div>
            </div>
            <el-row class="content-wrapper">
                <el-col class="searchBar">
                    <div class="handleBar">
                        <div @click="batchExamine">
                            <i class="iconfont icon-bianji"></i>
                            <span>批量审批</span>
                        </div>
                    </div>
                    <el-form :inline="true">
                        <el-form-item label="状态：">
                            <el-select placeholder="请选择状态" v-model="filtersExamine.auditStatus" clearable>
                                <el-option label="已通过" value="1"></el-option>
                                <el-option label="已拒绝" value="2"></el-option>
                                <el-option label="待审批" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="订单日期：">
                            <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleDate">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="info" @click="getSearchResult">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-table v-loading="examineLoading" :data="examineTableData" border resizable highlight-current-row style="width: 100%;" @selection-change="handleExamineDataChange">
                    <el-table-column type="selection" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" align="center">
                    </el-table-column>
                    <el-table-column prop="gender" label="性别" align="center">
                    </el-table-column>
                    <el-table-column prop="phoneNumber" label="手机号" sortable align="center">
                    </el-table-column>
                    <el-table-column prop="creationTime" label="申请时间" sortable align="center">
                    </el-table-column>
                    <el-table-column prop="auditStatus" label="状态" sortable align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="seeDetails(scope.row)">查看详情</el-button>
                            <el-button type="text" @click="examineVisible=true">审批</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-col :span="24" class="toolbar">
                    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
                        :page-sizes="[100, 200, 300, 400]" :page-size="100"  layout="total, sizes, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
        <!-- 添加部门弹框 -->
        <el-dialog :title="departmentDialog" :visible.sync="handleDepartmentVisible" :close-on-click-modal="false" style="top:10%" class="addDepartDialog">
            <el-form label-position="right" label-width="80px" class="form-center">
                <el-form-item label="所属部门">
                    <el-select v-model.number="addDepParams.deptId_sup">
                        <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门名称">
                    <el-input v-model="addDepParams.deptName_cur"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model.number="addDepParams.sortId" :min="1" :max="100" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addDepParams.remark" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer footer-center">
                <el-button type="primary" @click="addDepartmentSubmit">保存</el-button>
                <el-button @click.native="handleDepartmentVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 单个添加员工弹框 -->
        <el-dialog title="单个添加员工" :visible.sync="addEmployeeVisible" :close-on-click-modal="false" class="addEmpDialog">
            <el-form label-position="right" label-width="80px" status-icon class="form-center" :model="addEmployeeParams" ref="addEmployeeParams" :rules="addEmployeeRule">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addEmployeeParams.name"></el-input>
                </el-form-item>
                <el-form-item label="工号" prop="jobNumber">
                    <el-input v-model="addEmployeeParams.jobNumber"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="addEmployeeParams.phone"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="identifyNo">
                    <el-input v-model="addEmployeeParams.identifyNo"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addEmployeeParams.email"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="addEmployeeParams.sex">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入职时间" prop="joinedTime">
                    <el-date-picker v-model="addEmployeeParams.joinedTime" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
                <el-form-item label="所属部门">
                    <el-select v-model="addEmployeeParams.department">
                        <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer footer-center">
                <el-button type="primary">保存</el-button>
                <el-button @click.native="addEmployeeVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 批量导入员工弹框 -->
        <el-dialog title="批量导入员工" :visible.sync="exportEmployeeVisible" :close-on-click-modal="false" style="top:15%" class="batchExportEmpDialog">
            <div class="tishititle"> 请上传编辑好的员工个人信息EXCEL格式请按模板，顶行内容勿修改！</div>
            <div class="footer-center">
                <el-upload class="uploaddemo" :file-list="fileList" action="https://jsonplaceholder.typicode.com/posts/" :headers="requestHeader"
                :show-file-list="false" :on-change="uploadChange" :on-error="uploadError" :before-upload="beforeFileUpload">
                    <el-button type="primary">上传</el-button>
                </el-upload>
                <el-button>下载excel模板</el-button>
            </div>
        </el-dialog>
        <!-- 生成二维码弹窗 -->
		<el-dialog title="入职二维码" :visible.sync="qrcodeVisible" :close-on-click-modal="false" style="top:10%" ref="qrcode" class="erweima">
            <div class="qrcode">
			</div>
			<div class="txt">请扫描二维码办理入职</div>
            <div slot="footer" class="dialog-footer footer-center">
                <el-button type="danger">下载</el-button>
                <el-button type="primary">打印</el-button>
            </div>
        </el-dialog>
        <!--查看详情弹框 -->
        <el-dialog title="查看详情" :visible.sync="seeDetailsVisible" :close-on-click-modal="false" style="top:10%" class="examineDetail">
            <div class="row">
                <div class="title">姓名</div>
                <div class="info">{{this.employeeInfo.name}}</div>
            </div>
            <div class="row">
                <div class="title">性别</div>
                <div class="info">{{this.employeeInfo.gender}}</div>
            </div>
            <div class="row">
                <div class="title">工号</div>
                <div class="info">{{this.employeeInfo.jobNumber}}</div>
            </div>
            <div class="row">
                <div class="title">证件号</div>
                <div class="info">{{this.employeeInfo.identityCard}}</div>
            </div>
            <div class="row">
                <div class="title">手机号</div>
                <div class="info">{{this.employeeInfo.phoneNumber}}</div>
            </div>
            <div class="row">
                <div class="title">邮箱</div>
                <div class="info">{{this.employeeInfo.emailAddress}}</div>
            </div>
            <div class="row">
                <div class="title">入职时间</div>
                <div class="info">{{this.employeeInfo.joinedDate|filterTime}}</div>
            </div>
            <div class="row">
                <div class="title">申请时间</div>
                <div class="info">{{this.employeeInfo.joinedDate|filterTime}}</div>
            </div>
            <div class="row">
                <div class="title">状态</div>
                <div class="info">{{this.employeeInfo.auditStatus}}</div>
            </div>
        </el-dialog>
        <!-- 审批弹窗 -->
        <el-dialog title="审批" :visible.sync="examineVisible" :close-on-click-modal="false" style="top:10%" class="examineDialog">
            <el-form label-position="right" label-width="100px">
                <el-form-item label="进行审批：">
                    <el-select placeholder="请选择状态" v-model="value1" clearable>
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="已拒绝" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="移至部门：">
                    <el-select placeholder="请选择状态" v-model="value1" clearable>
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="已拒绝" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer footer-center">
                <el-button type="primary">确定</el-button>
                <el-button @click.native="examineVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 移至部门弹窗 -->
        <el-dialog title="请选择部门" :visible.sync="moveToDepVisible" :close-on-click-modal="false" style="top:15%" class="moveToDepDialog">
            <el-select v-model.number="moveToDepParams.depId_next">
                <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="moveToDepSubmit">移动</el-button>
                <el-button @click.native="moveToDepVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import qs from "queryString"
import authUnils from "../../common/authUnils"
export default{
    data(){
        var checkName=(rule,value,callback)=>{
            if(value===""){
                callback(new Error("请输入姓名"))
            }else{
                callback()
            }
        }
        var checkPhoneNumber=(rule, value, callback)=>{
            if (value === '') {
                callback(new Error('请输入手机号码'))
            }else{
                var reg = /^[1][3,4,5,7,8][0-9]{9}$/ 
                if(!reg.test(value)){
                    callback(new Error('不是有效手机号码,请输入11位数字'))
                }else{
                    callback()
                }
            }
        }
        var checkEmailAddress=(rule, value, callback)=>{
            if (value === '') {
                callback(new Error('请输入邮箱地址'))
            }else{
                var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/  
                if(!reg.test(value)){
                    callback(new Error('您输入的电子邮件地址不合法'))
                }else{
                    callback()
                }
            } 
        }
        var checkIdentify=(rule,value,callback)=>{
            if(value===""){
                callback(new Error("请输入身份证号码"))
            }else{
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X)$)/
                if(!reg.test(value)){
                    callback(new Error('您输入正确的身份证号码'))
                }else{
                    callback()
                }
            }
        }
        var checkJoinDate=(rule,value,callback)=>{
            if(value===""){
                callback(new Error("请输入入职时间"))
            }else{
                callback()
            }
        }
        return {
            rABS:false,//是否将文件读取为二进制字符串
            requestHeader:{
                "Content-Type": "text/html; charset=UTF-8",
                "Access-Control-Allow-Origin":'*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
            },
            tableData:[],
            //查询条件
            filters:{
                accountStatus:"",
                depId:0,
                text:"",
                pageNum:1,
                pageSize:10
            },
            // 离职列表
            leaveTableData:[],
            filtersDel:{
                text:"",
                pageNum:1,
                pageSize:10
            },
            //审批列表
            examineTableData:[],
            value:[],//日期
            filtersExamine:{
                auditStatus:"3",
                startTime:"",
                endTime:"",
                pageNum:1,
                pageSize:10
            },
            currentPage:1,
            departmentList:[],//部门序列表
            handleDepartmentVisible:false,
            departmentDialog:"",
            //添加部门参数
            addDepParams:{
                deptId_sup: 0,
                deptName_cur: "",
                remark: "",
                sortId: 0
            },
            addEmployeeVisible:false,
            //添加员工参数
            addEmployeeParams:{
                department: "",
                email: "",
                identifyNo: "",
                jobNumber: "",
                joinedTime: "",
                name: "",
                phone: "",
                sex: ""
            },
            addEmployeeRule:{
                name:[
                    { validator: checkName, trigger: 'blur' }
                ],
                phone:[
                    { validator: checkPhoneNumber, trigger: 'blur' }
                ],
                email:[
                    { validator: checkEmailAddress, trigger: 'blur' }
                ],
                identifyNo:[
                    { validator: checkIdentify, trigger: 'blur' }
                ],
                joinedTime:[
                    { validator: checkJoinDate, trigger: 'blur' }
                ]
            },
            isShowHandleInfo:false,
            isShowAddHandle:false,
            isShowHandle:false,
            selectedEmployee:[],//选中的员工
            exportEmployeeVisible:false,
            fileList:[],
            qrcodeVisible:false,
            seeDetailsVisible:false,
            examineVisible:false,
            moveToDepVisible:false,
            value1:'',
            empCodes:[],
            employeeInfo:{},
            //移至部门参数
            moveToDepParams:{
                depId_next:0,
                list:[]
            },
            loading:false,
            leaveLoading:false,
            examineLoading:false
        }
    },
    methods:{
        uploadChange(file){
            var f=file.raw
            var fileReader = new FileReader()
            fileReader.onload = function(ev){
                console.log(ev)
                var data = ev.target.result
                var wd;//读取完成的数据
                if(this.rABS) {
                    wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                        type: 'base64'
                    });
                } else {
                    wb = XLSX.read(data, {
                        type: 'binary'
                    });
                }
                //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                //wb.Sheets[Sheet名]获取第一个Sheet的数据
                console.log(JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])))
            }
            if(this.rABS){
                fileReader.readAsBinaryString(f)
            }else{
                fileReader.readAsArrayBuffer(f)
            }
        },
        uploadError (response, file, fileList) {
            this.$alert("上传失败，请重试！","信息")
        },
        beforeFileUpload(file){
            const ext = file.name.split('.')[1] === 'xls'
            const ext1 = file.name.split('.')[1] === 'xlsx'
            if (!ext && !ext1) {
                this.$alert("上传模板的格式不正确!","信息")
            }
            return !ext || !ext1
        },
        handleCurrentChange(){},
        //部门序列表
        getDepartmentList(){
            this.$axios.post("/api/api/organize/showDep",qs.stringify({include:true}),{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.data.code==0){
                    res.data.data.forEach(item=>{
                        let tempObj={}
                        tempObj["value"]=item.organizationUnitId
                        tempObj["label"]=item.displayName
                        this.departmentList.push(tempObj)
                    })
                }
            })
        },
        //添加部门
        addDepartment(){
            this.departmentDialog="添加部门"
            this.handleDepartmentVisible=true
            this.getDepartmentList()
        },
        addDepartmentSubmit(){
            // this.$axios.post("/api/api/organize/exitDep",{
            //     headers:{
            //         "Authorization":authUnils.getToken()
            //     }
            // }).then(res=>{
            //     if(res.code==0){
            //         this.$alert(res.message,"提示").then(res=>{

            //         })
            //     }
            // })
            this.$axios.post("/api/api/organize/addDep",this.addDepParams,{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.status==200){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.handleDepartmentVisible=false
                    })
                }
            })
        },
        // 编辑部门
        editDepartment(id){
            this.departmentDialog="部门编辑"
            this.$axios.post("/api/api/organize/depInfo",qs.stringify({depId:id}),{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.data.code==0){
                    console.log(res.data.data)
                }
            })
            this.handleDepartmentVisible=true
        },
        //部门删除
        deleteDepartment(id){
            this.$confirm("确定要删除该部门吗？","提示",{type:"warning"}).then(()=>{
                this.$axios.post("/api/api/organize/deleteDep",qs.stringify({depId:id}),{
                    headers:{
                        "Authorization":authUnils.getToken()
                    }
                }).then(res=>{
                    if(res.code==0){
                        this.$message({message:res.message,type:"success"})
                    }
                })
            })
        },
        //添加员工
        addEmployee(){
            this.addEmployeeVisible=true
        },
        //员工导入
        batchExportEmp(){
            this.exportEmployeeVisible=true
        },
        //生成二维码(后台获取)
        buildQRcode(){
            // this.$axios.post("/api/api/service/qrcode",{
            //     headers:{
            //         "Authorization":authUnils.getToken()
            //     }
            // }).then(res=>{
            //     console.log(res)
            // })
            this.qrcodeVisible=true
        },
        pickerOptions:{
            disabledDate(time) {
                return time.getTime() > Date.now();
            }
        },
        visibleHandleInfo(){
            this.isShowHandleInfo=true
        },
        displayHandleInfo(){
            this.isShowHandleInfo=false
        },
        visibleHandle(){
            this.isShowHandle=true
        },
        displayHandle(){
            this.isShowHandle=false
        },
        visibleAddHandle(){
            this.isShowAddHandle=true
        },
        displayAddHandle(){
            this.isShowAddHandle=false
        },
        handleSelectionChange(val){
            this.selectedEmployee=val
        },
        //处理判断
        handleJudge(){
            if(this.selectedEmployee.length==0){
                this.$alert("请选中员工后进行操作","信息")
            }else{
                this.selectedEmployee.forEach(item=>{
                    this.empCodes.push(item.empCode)
                })
            }
        },
        //移至部门
        moveToDepartment(){
            this.handleJudge()
            this.moveToDepVisible=true
            this.getDepartmentList()
        },
        //移至部门确定
        moveToDepSubmit(){
            this.moveToDepParams.list=[]
            this.selectedEmployee.forEach(item=>{
                let obj={}
                obj["depId"]=item.deptId
                obj["empCode"]=item.empCode
                this.moveToDepParams.list.push(obj)
            })
            this.$axios.post("/api/api/employee/removeToDept",this.moveToDepParams,{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.status==200){
                    if(res.data.code==0){
                        this.$alert(res.data.message,'信息').then(()=>{
                            this.moveToDepVisible=false
                            this.showEmployee(Number(this.$route.params.depId))
                        })
                    }else{
                        this.$alert(res.data.message)
                    }
                }
            })
        },
        //移出企业
        moveoutOfEnterprise(){
           this.handleJudge() 
           this.$confirm("确定移出企业？","信息").then(()=>{
                this.$axios.post("/api/api/employee/removeEmployee",{empCodes:this.empCodes},{
                    headers:{
                        "Authorization":authUnils.getToken()
                    }
                }).then(res=>{
                    if(res.status==200){
                        if(res.data.success){
                            this.$alert(res.data.message,'信息').then(()=>{
                                this.showEmployee(Number(this.$route.params.depId))
                            })
                        }else{
                            this.$alert(res.data.message)
                        }
                    }
                })
            })
        },
        //冻结
        freezeEmployee(){
            this.handleJudge()
            this.$confirm("确定冻结员工？","信息").then(()=>{
                this.handleFrozenEmployee(this.empCodes,1)
            })
        },
        //解冻
        relieveEmployee(){
            this.handleJudge()
            this.$confirm("确定解冻员工？","信息").then(()=>{
                this.handleFrozenEmployee(this.empCodes,0)
            })
        },
        //冻结或解冻员工
        handleFrozenEmployee(codes,i){
            this.$axios.post("/api/api/employee/frozenEmployee",{
                empCodes:this.empCodes,
                isFrozen:i//0解冻 1冻结
            },{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.status==200){
                    if(res.data.success){
                        this.$alert(res.data.message,'信息').then(()=>{
                            this.showEmployee(Number(this.$route.params.depId))
                        })
                    }else{
                        this.$alert(res.data.message)
                    }
                }
            })
        },
        // 拉回企业**************************************************************问题：参数错误******************************************************************
        pullbackEnterprise(code){
            this.$confirm("确定要拉回企业？","信息").then(()=>{
                this.$axios.post("/api/api/employee/pullBack",{empCodes:code},{
                    headers:{
                        "Authorization":authUnils.getToken()
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        if(res.data.success){
                            this.$alert(res.data.message,'信息').then(()=>{
                                this.showDelEmployee()
                            })
                        }else{
                            this.$alert(res.data.message)
                        }
                    }
                })
            })
        },
        //批量审批
        batchExamine(){
            this.$alert("请先选择一个人员进行审批","信息")
        },
        handleExamineDataChange(){},
        //格式化时间
        formatDate(time){
            var d=new Date(time)
            return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        },
        handleDate(){
            if(this.value==null){
                return 
            }
            this.filtersExamine.startTime=this.formatDate(this.value[0])
            this.filtersExamine.endTime=this.formatDate(this.value[1])
        },
        //获取在职人员信息列表
        getBeInJobResult(){
            this.showEmployee(Number(this.$route.params.depId))
        },
        //获取离职列表
        getleaveOfficeList(){
            this.showDelEmployee()
        },
        // 获取审批列表
        getSearchResult(){
            this.showExmineLists()
        },
        //查看详情
        seeDetails(obj){
            this.seeDetailsVisible=true
            this.employeeInfo=obj
        },
        //查询员工信息
        showEmployee(id){
            this.filters.depId=id
            this.$axios.post("/api/api/employee/showEmployee",this.filters,{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.status==200){
                    if(res.data.code==0){
                        this.tableData=res.data.data.content
                    }
                    // if(res.data.code==2001){
                    //     this.$alert("登陆超时，请重新登陆","信息").then(()=>{
                    //         authUnils.removeToken()
                    //         this.$router.push("/")
                    //     })
                    // }else if(res.data.code==0){
                    //     this.tableData=res.data.data.content
                    // }
                }
            })
        },
        //查询离职列表
        showDelEmployee(){
            this.$axios.post("/api/api/employee/hasDelEmps",this.filtersDel,{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.status==200){
                    this.leaveTableData=res.data.data.content
                    // if(res.data.code==2001){
                    //     this.$alert("登陆超时，请重新登陆","信息").then(()=>{
                    //         authUnils.removeToken()
                    //         this.$router.push("/")
                    //     })
                    // }else if(res.data.code==0){
                    //     this.leaveTableData=res.data.data.content
                    // }
                }
            })
        },
        //查询审批列表
        showExmineLists(){
            this.filtersExamine.auditStatus=Number(this.filtersExamine.auditStatus)
            this.$axios.post("/api/api/approvalCenter/showApprovalMessage",this.filtersExamine,{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.data.code==0){
                    res.data.data.content.forEach(item=>{
                        if(item.gender==1){
                            item.gender="男"
                        }else{
                            item.gender="男"
                        }
                        if(item.auditStatus==1){
                            item.auditStatus="已通过"
                        }else if(item.auditStatus==2){
                            item.auditStatus="已拒绝"
                        }else if(item.auditStatus==3){
                            item.auditStatus="待审批"
                        }
                    })
                    this.examineTableData=res.data.data.content
                }
            })
        },
        //时间转化
        transferTime(time){
            return new Date(time).getFullYear()+"-"+(new Date(time).getMonth()+1)+"-"+new Date(time).getDate()+" "+new Date(time).getHours()+":"+new Date(time).getMinutes()+":"+new Date(time).getSeconds()
        }
    },
    filters:{
        filterTime(){
            // return transferTime(this.employeeInfo.joinedDate)
        }
    },
    mounted(){
        this.showEmployee(Number(this.$route.params.depId))
        this.showDelEmployee()
        this.showExmineLists()
    },
    //监视地址栏的变化
    watch:{
        '$route' (to, from) {
            //to表示改变后的地址
            if(to.params.depId==undefined&&to.params.id==2){
                this.showDelEmployee()
            }
            if(to.params.depId==undefined&&to.params.id==3){
                this.showExmineLists()
            }
            this.showEmployee(Number(to.params.depId))
        }
    }
}
</script>
<style lang="scss" scoped>
    .fileUpload{
        font-size: 0;
        &::-webkit-file-upload-button{
            background: #66b1ff;
            border-color: #66b1ff;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 14px;
        }
    }
</style>

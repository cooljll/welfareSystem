<template>
	<div>
		<div class="page-menu1">
			<div class="addsomething">
				企业通讯录
				<i class="iconfont icon-icon02 add" @click="showHandle"></i>
				<div class="handlemenu" v-show="isShowHandle">
					<el-menu>
						<el-menu-item index="1" @click="addDepartment">
							<i class="iconfont icon-tianjiabumen"></i>
							<span>添加部门</span>
						</el-menu-item>
						<el-menu-item index="3" @click="addEmployee">
							<i class="iconfont icon-tianjiayuangong-copy"></i>
							<span>单个添加员工</span>
						</el-menu-item>
						<el-menu-item index="3" @click="batchExportEmployee">
							<i class="iconfont icon-39-copy"></i>
							<span>批量导入员工</span>
						</el-menu-item>
					</el-menu>
				</div>
			</div>
			<div class="selectinput">
                <el-input placeholder="请输入要查询的部门" v-model="value"></el-input>
				<i class="iconfont icon-search1 search" @click="searchDepartment"></i>
			</div>
			<div class="departmenulist" style="height: 744px;">
				<el-tree class="filter-tree" v-show="isShowAll" :data="data" :props="defaultProps" default-expand-all ref="tree" @current-change="handleCurrentChange">
				</el-tree>
                <div class="checkedDep" v-show="isShowChecked">
                    <el-tree class="filter-tree" :data="checkedData" :props="defaultProps" default-expand-all  @current-change="handleCurrentChange">
				    </el-tree>
                </div>
			</div>
			<div class="bottombtnbox">
				<div @click="getTurnoverList">
					<i class="iconfont icon-lizhi"></i>
					<span>离职列表</span>
				</div>
				<div @click="getExamineList">
					<i class="iconfont icon-shenpi"></i>
					<span>审批中心</span>
				</div>
			</div>
		</div>
		<div class="center-inner">
			<transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
		</div>
		<!-- 添加部门弹框 -->
        <el-dialog :title="departmentDialog" :visible.sync="handleDepartmentVisible" :close-on-click-modal="false" style="top:10%" class="addDepartDialog">
            <el-form label-position="right" label-width="80px" class="form-center">
                <el-form-item label="所属部门">
                    <el-select v-model="addDepParams.deptId_sup">
                        <el-option label="设为一级部门" value=""></el-option>
                        <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门名称">
                    <el-input v-model="addDepParams.deptName_cur"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="addDepParams.sortId" :min="1" :max="100" label="描述文字"></el-input-number>
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
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入职时间" prop="joinedTime">
                    <el-date-picker v-model="addEmployeeParams.joinedTime" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
                <el-form-item label="所属部门">
                    <el-select v-model="addEmployeeParams.department">
                        <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.label"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer footer-center">
                <el-button type="primary" @click="addSimpleEmpSubmit">保存</el-button>
                <el-button @click.native="addEmployeeVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 批量导入员工弹框 -->
        <el-dialog title="批量导入员工" :visible.sync="exportEmployeeVisible" :close-on-click-modal="false" style="top:15%" class="batchExportEmpDialog">
            <div class="tishititle"> 请上传编辑好的员工个人信息EXCEL格式请按模板，顶行内容勿修改！</div>
            <div class="fileUpload footer-center">
                <input type="file" @change="getFile($event)" id="fileToUpload" v-if="clearShow">
                <div class="replaceComp">
                    <el-button type="primary" @click="selectExcelFile">上传</el-button>
                    <el-button @click="downloadTemplate">下载excel模板</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- 批量导入员工提示框 -->
        <el-dialog title="选择员工" :visible.sync="messageTipVisible" :close-on-click-modal="false" style="top:10%" class="messageTipDialog">
            <el-table :data="batchExportEmpData" resizable highlight-current-row style="width: 100%;" 
            :header-row-style="headerStyle">
                <el-table-column prop="name" label="姓名" align="center" width="80">
                </el-table-column>
                <el-table-column prop="sex" label="性别" align="center" width="50">
                </el-table-column>
                <el-table-column prop="identifyNo" label="身份证" align="center" width="180">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" align="center" width="112">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" align="center">
                </el-table-column>
                <el-table-column prop="jobNumber" label="工号" align="center" width="80">
                    <template slot-scope="scope">
                        <el-button type="text" style="color:#606266;">{{ scope.row.jobNumber }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="错误信息" align="center">
                    <template slot-scope="scope">
                        <span style="color:red;">{{ scope.row.error }}</span>
                    </template>
                </el-table-column>
            </el-table>
           <div class="message">{{messageTips}}</div>
        </el-dialog>
	</div>
</template>

<script>
import authUnils from "../../common/authUnils"
import qs from 'queryString'
import fileDownload from 'js-file-download'
var root = process.env.API_ROOT
export default {
  	data () {
        //   var tel = /^\d{3,4}-?\d{7,9}$/  电话号码格式：021-12345678
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
            clearShow:true,
            headerStyle:{
                color:"#000"
            },
            value:"",
			isShowHandle:false,
			isShowSubdep:true,
			defaultProps: {
				children: 'subItems',
                label: 'label',
                id:'level'
            },
            data:[],//树形数组
            checkedData:[],
            isShowAll:true,
            isShowChecked:false,
            //添加部门
            handleDepartmentVisible:false,
            departmentDialog:"",
			departmentList:[],
            addDepParams:{
                deptId_sup: "",
                deptName_cur: "",
                remark: "",
                sortId: 50
            },
            //添加员工
            addEmployeeVisible:false,
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
            exportEmployeeVisible:false,
            file:"",
            messageTips:"",
            messageTipVisible:false,
            batchExportEmpData:[]
		}
	},
	methods:{
        //数据转化
        transferData(params){
            params["label"]=params.displayName+"("+params.memberCount+")"
            if(params.subItems&&params.subItems.length!==0){
                //有子级
                params.subItems.forEach(item=>{
                    // if(item.subItems&&item.subItems.length!==0){
                    //     item["label"]=item.displayName+"("+item.memberCount+")"
                    // }
                    item["label"]=item.displayName+"("+item.memberCount+")"
                })
            }
            return params
        },
        //查询部门
        searchDepartment(){
            if(this.value.trim()!=""){
                this.isShowAll=false
                this.isShowChecked=true
                var tempObj=this.data[0]
                // if(tempObj.label.indexOf(this.value)==0){
                //     this.checkedData.push(tempObj)
                // }
                this.checkedData=tempObj.subItems.filter(item=>{
                    if(item.label.indexOf(this.value)==0){
                        return true
                    }
                })
            }else{
                this.isShowAll=true
                this.isShowChecked=false
            }
        },
        getTreeDep(){
            this.data=[]
            this.$axios.post(root+"organize/showTreeDep",qs.stringify({include:true})).then(res=>{
                if(res.data.code==1000){
                    this.data.push(this.transferData(res.data.data))
                }
            })
        },
        //部门序列表
        getDepartmentList(){
            this.$axios.post(root+"organize/showDep",qs.stringify({include:true})).then(res=>{
                if(res.data.code==1000){
                    this.departmentList=[]
                    res.data.data.forEach(item=>{
                        let tempObj={}
                        tempObj["value"]=item.organizationUnitId
                        tempObj["label"]=item.displayName
                        this.departmentList.push(tempObj)
                    })
                }
            })
        },
		pickerOptions:{
            disabledDate(time) {
                return time.getTime() > Date.now()
            }
        },
		//企业通讯录显示与隐藏
		showHandle(){
			if(this.isShowHandle){
				this.isShowHandle=false
			}else{
				this.isShowHandle=true
			}
		},
		handleCurrentChange(val){
            this.isShowHandle=false
            this.$router.push({path:"/Enterprise/"+val.displayName+"/"+val.level+"/"+val.organizationUnitId+"/"+new Date().getTime()})
		},
		//获取离职列表
        getTurnoverList(){
            this.isShowHandle=false
			this.$router.push({path:"/Enterprise/离职列表/2"})
        },
        //获取审批中心列表
        getExamineList(){
            this.isShowHandle=false
			this.$router.push({path:"/Enterprise/审批中心/3"})
		},
		//添加部门
        addDepartment(){
            this.departmentDialog="添加部门"
            this.handleDepartmentVisible=true
            this.isShowHandle=false
            this.getDepartmentList()
        },
        addDepartmentSubmit(){
            this.$axios.post(root+"organize/addDep",this.addDepParams).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.handleDepartmentVisible=false
                        this.isShowHandle=false
                        this.getTreeDep()
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
		//单个添加员工
        addEmployee(){
            this.addEmployeeVisible=true
            this.isShowHandle=false
            this.getDepartmentList()
        },
        addSimpleEmpSubmit(){
            this.$axios.post(root+"employee/addEmp",this.addEmployeeParams).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.addEmployeeVisible=false
                        this.isShowHandle=false
                        this.$store.commit('reLoad')
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.addEmployeeVisible=true
                        this.isShowHandle=false
                    })
                }
            })
        },
        //格式化时间
        formatDate(time){
            var d=new Date(time)
            return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        },
        handleDate(){
            this.addEmployeeData.joinedTime=this.formatDate(this.addEmployeeData.joinedTime)
        },
        //批量导入员工
        batchExportEmployee(){
            this.exportEmployeeVisible=true
            this.isShowHandle=false
        },
        //下载excel模板
        downloadTemplate(){
            this.$axios({
                url:root+"employee/downloadExcel",
                method:"get",
                responseType:"arraybuffer"
            }).then(res=>{
                if(res){
                    // let blob=new Blob([res.data],{type:"application/vnd.ms-excel"})
                    // let objectUrl=URL.createObjectURL(blob)
                    // window.location.href=objectUrl

                    // let fileName=res.headers['content-disposition'].split(";")[1].split("=")[1]
                    // fileDownload(res.data,fileName)

                    fileDownload(res.data,"员工导入模板.xls")
                }
            })
        },
        selectExcelFile(){
            $("#fileToUpload").trigger('click')
        },
        getFile(event) {
            this.clearShow=false
            this.file = event.target.files[0]
            let formData = new FormData()
            formData.append('uploadexcel', this.file)
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            const loading = this.$loading({
				lock: true,
				text: '上传中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
            this.$axios.post(root+"employee/uploadCheckEmps",formData,config).then(res=>{
                this.clearShow=true
                loading.close()
                if(res.data.data!=null){
                    this.messageTips=res.data.message
                    this.batchExportEmpData=[]
                    res.data.data.forEach(item=>{
                        item.emp.error=item.error
                        this.batchExportEmpData.push(item.emp)
                    })
                    this.exportEmployeeVisible=false
                    this.messageTipVisible=true
                    this.$store.commit('reLoad')
                }else{
                    this.$alert(res.data.message,'信息')
                }
            })
        }
    },
    mounted(){
        this.getTreeDep()
    },
    computed: {
        getFlag() {
            return this.$store.state.flag
        }
    },
    //watch监视vuex内部数据变化
    watch:{
        getFlag(val){
            if(val){
                this.getTreeDep()
                this.$store.commit("notReLoad")
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

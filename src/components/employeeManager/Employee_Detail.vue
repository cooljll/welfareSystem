<template>
    <div>
        <div class="indextitle">
            <div class="indextitlebox">
                <span class="indexlefttitle">
                    当前部门：{{currentDepartment}}
                </span>
                <div class="indexrighttitle" v-show="$route.params.id=='0'?true:false">
                    <el-button type="info" @click="addDepartment">
                        <i class="iconfont icon-tianjia"></i>
                        添加部门
                    </el-button>
                    <el-button type="info">
                        <i class="iconfont icon-erweima"></i>
                        生成二维码
                    </el-button>
                </div>
                <div class="indexrighttitle" v-show="$route.params.id=='1'?true:false">
                    <el-button type="info" @click="editDepartment">
                        <i class="iconfont icon-bianji"></i>
                        编辑
                    </el-button>
                    <el-button type="info" @click="deleteDepartment">
                        <i class="iconfont icon-bianji"></i>
                        删除部门
                    </el-button>
                    <el-button type="info" @click="addDepartment">
                        <i class="iconfont icon-tianjia"></i>
                        添加部门
                    </el-button>
                    <el-button type="info">
                        <i class="iconfont icon-erweima"></i>
                        生成二维码
                    </el-button>
                </div>
            </div>
        </div>
        <div class="content-wrapper">
            <div class="flexbox">
                <div class="leftbox">
                    <img src="../../assets/timg.jpg" alt="">
                </div>
                <div class="rightbox">
                    <el-form :inline="true" ref="employeeInfo" :model="employeeInfo" label-position="right" label-width="90px">
                        <!-- 基本信息 -->
                        <el-col class="block">
                            <el-col class="title">基本信息</el-col>
                            <el-col class="center">
                                <el-col>
                                    <el-form-item label="姓名：">
                                        <el-input placeholder="姓名" v-model="employeeInfo.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="出生年月：">
                                        <el-input placeholder="出生年月" v-model="employeeInfo.birthday"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="年龄：">
                                        <el-input placeholder="年龄" v-model="employeeInfo.age"></el-input>
                                    </el-form-item>
                                    <el-form-item label="身份证号：">
                                        <el-input placeholder="身份证号" v-model="employeeInfo.identifyNumber"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-form-item label="性别：">
                                    <el-select placeholder="请选择性别" v-model="employeeInfo.sex">
                                        <el-option label="男" value="男"></el-option>
                                        <el-option label="女" value="女"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <!-- 联系方式 -->
                        <el-col class="block">
                            <el-col class="title">联系方式</el-col>
                            <el-col class="center">
                                <el-form-item label="手机号：">
                                    <el-input v-model="employeeInfo.phone"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱：">
                                    <el-input v-model="employeeInfo.email"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <!-- 在职信息 -->
                        <el-col class="block">
                            <el-col class="title">在职信息</el-col>
                            <el-col class="center">
                                <el-col>
                                    <el-form-item label="公司名称：">
                                        <el-input :disabled="true" v-model="companyName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="工号：">
                                        <el-input v-model="employeeInfo.job_Number"></el-input>
                                    </el-form-item>
                                    <el-form-item label="部门：">
                                        <el-select placeholder="请选择部门" v-model="employeeInfo.department">
                                            <el-option label="市场部" value="1"></el-option>
                                            <el-option label="采购部" value="2"></el-option>
                                            <el-option label="客户" value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="在职状态：">
                                        <el-input v-model="employeeInfo.isFrozen"></el-input>
                                    </el-form-item>
                                    <el-form-item label="入职时间：">
                                        <el-date-picker v-model="employeeInfo.joinedDate" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-col>
                        <!-- 操作按钮 -->
                        <el-col v-show="handleBtn">
                            <el-button type="info" @click="modifyEmployeeInfo">修改信息</el-button>
                            <el-button @click="goBackList">返回列表</el-button>
                            <el-button @click="moveToDepartment">移至部门</el-button>
                            <el-button @click="moveOutEnterprise">移出企业</el-button>
                            <el-button @click="freezeEmployee">冻结</el-button>
                        </el-col>
                        <el-col v-show="confirmBtn">
                            <el-button type="info" @click="modifyEmpInfoSubmit">确认</el-button>
                            <el-button @click="cancel">取消</el-button>
                        </el-col>
                    </el-form>
                </div>
            </div>
        </div>
        <!-- 添加部门弹框 -->
        <el-dialog :title="departmentDialog" :visible.sync="handleDepartmentVisible" :close-on-click-modal="false" style="top:10%">
            <el-form label-position="right" label-width="80px" class="form-center">
                <el-form-item label="所属部门">
                    <el-select v-model="departmentType">
                        <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门名称">
                    <el-input v-model="departmentName"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="num" :min="1" :max="100" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="remark" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">保存</el-button>
                <el-button @click.native="handleDepartmentVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 移至部门弹框 -->
        <el-dialog title="请选择部门" :visible.sync="moveToDepartVisible" :close-on-click-modal="false" style="top:25%" class="moveToDepartDialog">
            <div class="select_center">
                <el-select v-model="departType">
                    <el-option v-for="item in departLists" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">移动</el-button>
                <el-button @click.native="moveToDepartVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default{
    data(){
        return {
            departmentList:[
                {
                    value:"1",
                    label:"设为一级部门"
                },
                {
                    value:"2",
                    label:"采购部"
                },
                {
                    value:"3",
                    label:"市场部"
                },
                {
                    value:"4",
                    label:"客户"
                }
            ],
            departmentType:"",
            num:1,
            departmentName:'',
            remark:"",
            handleDepartmentVisible:false,
            departmentDialog:"",
            companyName:"上海汇展人力资源有限公司",
            value:"",
            currentDepartment:"",
            employeeInfo:{},
            handleBtn:true,
            confirmBtn:false,
            // 移至部门
            moveToDepartVisible:false,
            departLists:[
                {
                    value:"1",
                    label:"采购部"
                },
                {
                    value:"2",
                    label:"市场部"
                },
                {
                    value:"3",
                    label:"客户"
                }
            ],
            departType:""
        }
    },
    methods:{
        pickerOptions:{
            disabledDate(time) {
                return time.getTime() > Date.now();
            }
        },
        //添加部门
        addDepartment(){
            this.departmentDialog="添加部门"
            this.handleDepartmentVisible=true
        },
        // 编辑部门
        editDepartment(){
            this.departmentDialog="部门编辑"
            this.handleDepartmentVisible=true
        },
        //部门删除
        deleteDepartment(){
            this.$confirm("确定要删除该部门吗？","提示",{type:"warning"}).then(()=>{
                console.log("删除成功")
            })
        },
        //修改员工信息
        modifyEmployeeInfo(){
            this.handleBtn=false
            this.confirmBtn=true
        },
        // 员工修改提交
        modifyEmpInfoSubmit(){
            this.handleBtn=true
            this.confirmBtn=false
            this.$message({message:"修改成功",type:"success"})
        },
        cancel(){
            this.handleBtn=true
            this.confirmBtn=false
        },
        //返回列表
        goBackList(){

        },
        //移至部门
        moveToDepartment(){
            this.moveToDepartVisible=true
        },
        //移出企业
        moveOutEnterprise(){
            this.$confirm("确定移出企业吗？","提示",{type:"warning"}).then(()=>{
                this.$message({message:"移出成功",type:"success"})
            })
        },
        //冻结员工
        freezeEmployee(){
            this.$confirm("确定冻结该员工吗？","提示",{type:"warning"}).then(()=>{
                this.$message({message:"员工冻结成功",type:"success"})
            })
        }
    },
    mounted(){
        this.currentDepartment=this.$route.params.currentVal
        this.employeeInfo=JSON.parse(decodeURI(this.$route.params.obj))
    }
}
</script>
<style lang="scss" scoped>
    .flexbox{
        display: flex;
        width: 100%;
        margin-top: 20px;
        .leftbox{
            width: 200px;
            img{
                width: 100px;
                min-height: 100px;
                display: block;
                margin: 0px auto;
            }
        }
        .rightbox{
            width: 100%;
            .block{
                margin-bottom:20px;
                .title{
                    font-size: 16px;
                    color: #3A4D62;
                    letter-spacing: 0;
                    border-bottom: 1px solid #E7EAEC;
                    padding-bottom: 10px;
                }
                .center{
                    margin-top:20px;
                    .el-input__innner{
                        height:30px;
                    }
                }
            }
        }
    }
</style>

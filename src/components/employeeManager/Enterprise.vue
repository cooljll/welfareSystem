<template>
    <div>
        <!-- 企业通讯录 -->
        <div v-show="($route.params.level=='0'||$route.params.level=='1')?true:false">
            <div class="indextitle">
                <div class="indextitlebox">
                    <span class="indexlefttitle">
                        当前部门：{{$route.params.currentVal}}
                    </span>
                    <div class="indexrighttitle" v-show="$route.params.level=='0'?true:false">
                        <el-button type="info" @click="addDepartment">
                            <i class="iconfont icon-tianjia"></i>
                            添加部门
                        </el-button>
                        <el-button type="info" @click="buildQRcode">
                            <i class="iconfont icon-erweima"></i>
                            生成二维码
                        </el-button>
                    </div>
                    <div class="indexrighttitle" v-show="$route.params.level=='1'?true:false">
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
                <!-- 员工信息列表 -->
                <div v-show="isShowEmpList">
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
                                    <el-menu-item index="1" @click="batchmMoveToDepartment">移至部门</el-menu-item>
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
                    <el-table v-loading="loading" :data="tableData" border resizable highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">
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
                                <el-button type="text" @click="seeEmpDetail(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-col :span="24" class="toolbar">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                            :page-sizes="[10,20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                        </el-pagination>
                    </el-col>
                </div>
                <!-- 员工详情 -->
                <div v-show="isShowEmpDetail" class="flexbox">
                    <div class="leftbox">
                        <img src="../../assets/img/zanwu_imges.png" alt="">
                    </div>
                    <div class="rightbox">
                        <el-form :inline="true" ref="employeeInfo" :model="employeeInfo" label-position="right" label-width="90px">
                            <!-- 基本信息 -->
                            <el-col class="block">
                                <el-col class="title">基本信息</el-col>
                                <el-col class="center">
                                    <el-col>
                                        <el-form-item label="姓名：">
                                            <el-input placeholder="姓名" v-model="employeeInfo.name" :disabled="showEdit"></el-input>
                                        </el-form-item>
                                        <el-form-item label="出生年月：">
                                            <el-input placeholder="出生年月" v-model="employeeInfo.birthday" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col>
                                        <el-form-item label="年龄：">
                                            <el-input placeholder="年龄" v-model="employeeInfo.age" :disabled="true"></el-input>
                                        </el-form-item>
                                        <el-form-item label="身份证号：">
                                            <el-input placeholder="身份证号" v-model="employeeInfo.identifyNumber":disabled="showEdit"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-form-item label="性别：">
                                        <el-select placeholder="请选择性别" v-model="employeeInfo.sex" :disabled="showEdit">
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
                                        <el-input v-model="employeeInfo.phone" :disabled="showEdit"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮箱：">
                                        <el-input v-model="employeeInfo.email" :disabled="showEdit"></el-input>
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
                                            <el-input v-model="employeeInfo.job_Number" :disabled="showEdit"></el-input>
                                        </el-form-item>
                                        <el-form-item label="部门：">
                                            <el-select v-model.number="departId" :disabled="showEdit">
                                                <el-option v-for="(item,index) in departmentList" :key="index" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col>
                                        <el-form-item label="在职状态：">
                                            <el-input v-model="employeeInfo.isFrozen" :disabled="true"></el-input>
                                        </el-form-item>
                                        <el-form-item label="入职时间：">
                                            <el-date-picker v-model="employeeInfo.joinedDate" type="date" :disabled="showEdit"
                                             placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                            </el-col>
                            <!-- 操作按钮 -->
                            <el-col v-show="handleBtn">
                                <el-button type="info" @click="modifyEmployeeInfo">修改信息</el-button>
                                <el-button @click="goBackList">返回列表</el-button>
                                <el-button @click="simpleMoveToDepartment">移至部门</el-button>
                                <el-button @click="moveOutEnterprise">移出企业</el-button>
                                <el-button @click="simpleFreezeEmployee" v-show="isShowFrozenBtn">冻结</el-button>
                                <el-button @click="releaseEmployee" v-show="isShowReleaseBtn">解冻</el-button>
                            </el-col>
                            <el-col v-show="confirmBtn">
                                <el-button type="info" @click="modifyEmpInfoSubmit">确认</el-button>
                                <el-button @click="cancel">取消</el-button>
                            </el-col>
                        </el-form>
                    </div>
                </div>
            </el-row>
        </div>
        <!-- 离职列表 -->
        <div v-show="$route.params.level=='2'?true:false">
            <div class="indextitle">
                <div class="indextitlebox">
                    <span class="indexlefttitle">
                        离职列表
                    </span>
                    <div class="indexrighttitle">
                        <input type="file" @change="getFile($event)" id="fileToUpload">
                        <el-button type="info" @click="downloadDelExcel">下载excel模板</el-button>
                        <el-button type="info" @click="selectExcelFile">excel批量删除</el-button>
                    </div>
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
                    <el-table-column prop="identifyNumber" label="证件号" align="center" width="200">
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
                    <el-pagination @size-change="handleLeaveSizeChange" @current-change="handleLeaveCurrentChange" :current-page="currentPage"
                        :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="totalSizeDel">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
        <!-- 审批中心 -->
        <div v-show="$route.params.level=='3'?true:false">
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
                            <el-button type="text" @click="simpleExamine(scope.row.entGuid)">审批</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-col :span="24" class="toolbar">
                    <el-pagination @size-change="handleExaSizeChange" @current-change="handleExaCurrentChange" :current-page="currentPage"
                        :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="totalSizeExamine">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
        <!-- 添加部门弹框 -->
        <el-dialog :title="departmentDialog" :visible.sync="handleDepartmentVisible" :close-on-click-modal="false" style="top:10%" class="addDepartDialog">
            <el-form label-position="right" label-width="80px" class="form-center">
                <el-form-item label="所属部门">
                    <el-select v-model.number="addDepParams.deptId_sup">
                        <el-option value="0" label="设为一级部门"></el-option>
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
                <el-button type="primary" @click="addDepartmentSubmit" v-show="isShowAddDept">保存</el-button>
                <el-button type="primary" @click="updateDepartmentSubmit" v-show="isShowUpdateDept">保存</el-button>
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
                <input type="file" @change="getFile($event)" id="fileToUpload">
                <div class="replaceComp">
                    <el-button type="primary" @click="selectExcelFile">上传</el-button>
                    <el-button @click="downloadTemplate">下载excel模板</el-button>
                </div>
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
                <div class="info">{{this.employeeInfo.joinedDate}}</div>
            </div>
            <div class="row">
                <div class="title">申请时间</div>
                <div class="info">{{this.employeeInfo.joinedDate}}</div>
            </div>
            <div class="row">
                <div class="title">状态</div>
                <div class="info">{{this.employeeInfo.auditStatus}}</div>
            </div>
        </el-dialog>
        <!-- 审批弹窗 -->
        <el-dialog title="审批" :visible.sync="examineVisible" :close-on-click-modal="false" style="top:10%" class="examineDialog">
            <el-form label-position="right" label-width="100px" class="form-center">
                <el-form-item label="进行审批：">
                    <el-select placeholder="请选择状态" v-model="status" clearable>
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="已拒绝" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="移至部门：">
                    <el-select v-model="departId" clearable>
                        <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.label"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer footer-center">
                <el-button type="primary" @click="exmineSubmit">确定</el-button>
                <el-button @click.native="examineVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 移至部门弹窗 -->
        <el-dialog title="请选择部门" :visible.sync="moveToDepVisible" :close-on-click-modal="false" style="top:15%" class="moveToDepDialog">
            <el-select v-model.number="departId">
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
import fileDownload from 'js-file-download'
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
            isShowEmpList:true,
            isShowEmpDetail:false,
            tableData:[],
            simpleEmpInfo:{},
            //查询条件
            filters:{
                accountStatus:"",
                depId:0,
                text:"",
                pageNum:1,
                pageSize:10
            },
            totalSize:0,
            // 离职列表
            leaveTableData:[],
            filtersDel:{
                text:"",
                pageNum:1,
                pageSize:10
            },
            totalSizeDel:0,
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
            totalSizeExamine:0,
            currentPage:1,
            departmentList:[],//部门序列表
            handleDepartmentVisible:false,
            departmentDialog:"",
            //添加部门参数
            addDepParams:{
                deptId_sup: 0,
                deptName_cur: "",
                remark: "",
                sortId: 50
            },
            addEmployeeVisible:false,
            isShowAddDept:true,
            isShowUpdateDept:false,
            deptId_pre:0,
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
            qrcodeVisible:false,
            seeDetailsVisible:false,
            examineVisible:false,
            moveToDepVisible:false,
            empCodes:[],
            employeeInfo:{},
            loading:false,
            leaveLoading:false,
            examineLoading:false,
            batchExamineEmp:[],
            departId:"",
            status:"",
            code:"",
            handleBtn:true,
            confirmBtn:false,
            isShowFrozenBtn:true,
            isShowReleaseBtn:false,
            companyName:JSON.parse(localStorage.getItem("enterpriseInfo")).enterpriseName,
            file:"",
            showEdit:true
        }
    },
    methods:{
        //部门序列表
        getDepartmentList(){
            this.$axios.post("/api/api/organize/showDep",qs.stringify({include:true})).then(res=>{
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
        //添加部门
        addDepartment(){
            this.departmentDialog="添加部门"
            this.handleDepartmentVisible=true
            this.isShowAddDept=true
            this.isShowUpdateDept=false
            this.getDepartmentList()
        },
        addDepartmentSubmit(){
            this.$axios.post("/api/api/organize/addDep",this.addDepParams).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.handleDepartmentVisible=false
                        this.$router.go(0)
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        // 编辑部门
        editDepartment(id){
            this.getDepartmentList()
            this.departmentDialog="部门编辑"
            this.handleDepartmentVisible=true
            this.isShowAddDept=false
            this.isShowUpdateDept=true
            this.$axios.post("/api/api/organize/depInfo",qs.stringify({depId:id})).then(res=>{
                if(res.data.code==1000){
                    this.deptId_pre=res.data.data.organizationUnitId
                    if(res.data.data.parentOrganizationUnitId){
                        this.addDepParams.deptId_sup="0"
                    }else{
                        this.addDepParams.deptId_sup=res.data.data.parentOrganizationUnitId
                    }
                    this.addDepParams.deptName_cur=res.data.data.displayName
                    this.addDepParams.sortId=res.data.data.displayOrder
                    this.addDepParams.remark=res.data.data.remark
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        updateDepartmentSubmit(){
            this.$axios.post("/api/api/organize/updateDep",{
                deptId_pre:this.deptId_pre,
                deptName_cur:this.addDepParams.deptName_cur,
                parentId:this.addDepParams.deptId_sup,
                remark:this.addDepParams.remark,
                sortId:this.addDepParams.sortId
            }).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.handleDepartmentVisible=false
                        this.$router.go(0)
                    })   
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        //部门删除
        deleteDepartment(id){
            this.$confirm("确定要删除该部门吗？","提示",{type:"warning"}).then(()=>{
                this.$axios.post("/api/api/organize/deleteDep",qs.stringify({depId:id})).then(res=>{
                    if(res.data.code==1000){
                        this.$alert(res.data.message,"信息").then(()=>{
                            this.$router.push("/EnterpriseOverview")
                        })
                    }else if(res.data.code==1001){
                        this.$alert(res.data.message,"信息")
                    }
                })
            })
        },
        //添加员工
        addEmployee(){
            this.getDepartmentList()
            this.addEmployeeVisible=true
        },
        addSimpleEmpSubmit(){
            this.$axios.post("/api/api/employee/addEmp",this.addEmployeeParams).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.addEmployeeVisible=false
                        this.showEmployee(Number(this.$route.params.depId))
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.addEmployeeVisible=false
                        this.showEmployee(Number(this.$route.params.depId))
                    })
                }
            })
        },
        //员工导入
        batchExportEmp(){
            this.exportEmployeeVisible=true
        },
        //下载excel模板
        downloadTemplate(){
            this.$axios({
                url:"/api/api/employee/downloadExcel",
                method:"get",
                responseType:"arraybuffer"
            }).then(res=>{
                if(res){
                    // let blob=new Blob([res.data],{type:"application/vnd.ms-excel"})
                    // let objectUrl=URL.createObjectURL(blob)
                    // window.location.href=objectUrl
                    fileDownload(res.data,'员工导入模板.xls')
                }
            })
        },
        selectExcelFile(){
            document.getElementById('fileToUpload').click()
        },
        //上传
        getFile(event) {
            const loading = this.$loading({
				lock: true,
				text: '上传中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
            this.file = event.target.files[0]
            let formData = new FormData()
            formData.append('uploadexcel', this.file)
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            this.$axios.post("/api/api/employee/uploadCheckEmps",formData,config).then(res=>{
                console.log(res)
                loading.close()
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        // this.$router.go(0)
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,'信息')
                }
            })
        },
        //生成二维码(后台获取)
        buildQRcode(){
            const loading = this.$loading({
				lock: true,
				text: '二维码生成中。。。',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
            this.$axios.post("/api/api/service/qrcode",{}).then(res=>{
                if(res.data.data==1000){
                    this.qrcodeVisible=true
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                    this.qrcodeVisible=false
                }
                loading.close()
            })
        },
        //移至部门
        batchmMoveToDepartment(){
            if(this.selectedEmployee.length==0){
                this.$alert("请选中员工后进行操作","信息")
            }else{
                this.moveToDepVisible=true
                this.getDepartmentList()
            }
        },
        //移至部门确定
        moveToDepSubmit(){
            // 批量
            if(this.isShowEmpList){
                var tempList=[]
                this.selectedEmployee.forEach(item=>{
                    let obj={}
                    obj["depId"]=item.deptId
                    obj["empCode"]=item.empCode
                    tempList.push(obj)
                })
                this.handleMoveToDept(tempList)
            }
            //单个
            if(this.isShowEmpDetail){
                let obj={}
                obj["depId"]=this.employeeInfo.deptId
                obj["empCode"]=this.employeeInfo.empCode
                this.handleMoveToDept([obj])
            }
        },
        //移出企业
        moveoutOfEnterprise(){
            if(this.selectedEmployee.length==0){
                this.$alert("请选中员工后进行操作","信息")
            }else{
                this.selectedEmployee.forEach(item=>{
                    this.empCodes.push(item.empCode)
                })
                this.$confirm("确定将员工移出企业？","信息").then(()=>{
                    this.handleRemoveEmployee(this.empCodes)
                })
            }
        },
        //冻结
        freezeEmployee(){
            if(this.selectedEmployee.length==0){
                this.$alert("请选中员工后进行操作","信息")
            }else{
                this.selectedEmployee.forEach(item=>{
                    this.empCodes.push(item.empCode)
                })
                this.$confirm("确定冻结员工？","信息").then(()=>{
                    this.handleFrozenEmployee(this.empCodes,1)
                })
            }
        },
        //解冻
        relieveEmployee(){
            if(this.selectedEmployee.length==0){
                this.$alert("请选中员工后进行操作","信息")
            }else{
                this.selectedEmployee.forEach(item=>{
                    this.empCodes.push(item.empCode)
                })
                this.$confirm("确定解冻员工？","信息").then(()=>{
                    this.handleFrozenEmployee(this.empCodes,0)
                })
            }  
        },
        //移至部门操作
        handleMoveToDept(arr){
            this.$axios.post("/api/api/employee/removeToDept",{
                depId_next:this.departId,
                list:arr
            }).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,'信息').then(()=>{
                        this.moveToDepVisible=false
                        this.goBackList()
                    })
                }else if(res.data.code==1){
                    this.$alert(res.data.message,'信息')
                }
            })
        },
        //移出企业操作
        handleRemoveEmployee(arr){
            this.$axios.post("/api/api/employee/removeEmployee",{empCodes:arr}).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,'信息').then(()=>{
                        this.$router.go(0)
                        this.goBackList()
                    })
                }else if(res.data.code==1){
                    this.$alert(res.data.message,'信息').then(()=>{
                        this.selectedEmployee=[]
                    })
                }
            })
        },
        //冻结,解冻员工
        handleFrozenEmployee(codeArr,i){
            this.$axios.post("/api/api/employee/frozenEmployee",{
                empCodes:codeArr,
                isFrozen:i//0解冻 1冻结
            }).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,'信息').then(()=>{
                        this.goBackList()
                    })
                }
            })
        },
        // 拉回企业
        pullbackEnterprise(code){
            this.$confirm("确定要拉回企业？","信息").then(()=>{
                this.$axios.post("/api/api/employee/pullBack",{empCode:code}).then(res=>{
                    if(res.data.code==1000){
                        this.$alert(res.data.message,'信息').then(()=>{
                            this.$router.go(0)
                        })
                    }else if(res.data.code==1001){
                        this.$alert(res.data.message)
                    }
                })
            })
        },
        selectExcelFile(){
            document.getElementById('fileToUpload').click()
        },
        //批量删除离职员工
        getFile(event) {
            this.file = event.target.files[0]
            let formData = new FormData()
            formData.append('uploadexcel', this.file)
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            this.$axios.post("/api/api/employee/batchRemoveEmp",formData,config).then(res=>{
                console.log(res)
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.showDelEmployee()
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,'信息')
                }
            })
        },
        //移出员工模板
        downloadDelExcel(){
            this.$axios({
                url:"/api/api/employee/downloadExcel2",
                method:'get',
                responseType:"arraybuffer"
            }).then(res=>{
                if(res){
                    let blob=new Blob([res.data],{type:"application/vnd.ms-excel"})
                    let objectUrl=URL.createObjectURL(blob)
                    window.location.href=objectUrl
                }
            })
        },
        //审批
        simpleExamine(code){
            this.code=code
            this.examineVisible=true
            this.getDepartmentList()
        },
        exmineSubmit(){
            this.handleExamineEmp([this.code])
        },
        //批量审批
        batchExamine(){
            if(this.batchExamineEmp.length==0){
                this.$alert("请选择员工后进行操作","信息")
            }
        },
        handleExamineDataChange(val){
            this.batchExamineEmp=val
        },
        handleExamineEmp(arr){
            this.$axios.post("/api/api/approvalCenter/dealApproval",{
                depId:this.departId,
                status:Number(this.status),
                reason:"",
                empCodes:arr
            }).then(res=>{
                console.log(res)
            })
        },
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
        //查询员工信息
        showEmployee(id){
            this.filters.depId=id
            this.$axios.post("/api/api/employee/showEmployee",this.filters).then(res=>{
                if(res.status==200){
                    if(res.data.code==1000){
                        this.tableData=res.data.data.content
                        this.totalSize=res.data.data.totalSize
                    }
                }
            })
        },
        //在职人员分页操作
        handleSizeChange(val){
            this.filters.pageSize=val
            this.showEmployee(Number(this.$route.params.depId))
        },
        handleCurrentChange(val){
            this.filters.pageNum=val
            this.showEmployee(Number(this.$route.params.depId))
        },
        //查看详情(在职)
        seeEmpDetail(obj){
            if(obj.isFrozen=="正常"){
                this.isShowReleaseBtn=false
                this.isShowFrozenBtn=true
            }else if(obj.isFrozen=="冻结"){
                this.isShowReleaseBtn=true
                this.isShowFrozenBtn=false
            }
            this.getDepartmentList()
            console.log(this.departmentList)
            this.employeeInfo=obj
            this.departId=this.employeeInfo.department
            this.isShowEmpList=false
            this.isShowEmpDetail=true
        },
        //获取离职列表
        getleaveOfficeList(){
            this.showDelEmployee()
        },
        //查询离职列表
        showDelEmployee(){
            this.$axios.post("/api/api/employee/hasDelEmps",this.filtersDel).then(res=>{
                if(res.status==200){
                    this.leaveTableData=res.data.data.content
                    this.totalSizeDel=res.data.data.totalSize
                }
            })
        },
        //离职人员分页操作
        handleLeaveSizeChange(val){
            this.filtersDel.pageSize=val
            this.showDelEmployee()
        },
        handleLeaveCurrentChange(val){
            this.filtersDel.pageNum=val
            this.showDelEmployee()
        },
        // 获取审批列表
        getSearchResult(){
            this.showExmineLists()
        },
        //查询审批列表
        showExmineLists(){
            this.filtersExamine.auditStatus=Number(this.filtersExamine.auditStatus)
            this.$axios.post("/api/api/approvalCenter/showApprovalMessage",this.filtersExamine).then(res=>{
                if(res.data.code==1000){
                    this.totalSizeExamine=res.data.data.totalSize
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
        //审批列表分页操作
        handleExaSizeChange(val){
            this.filtersExamine.pageSize=val
            this.showExmineLists()
        },
        handleExaCurrentChange(val){
            this.filtersExamine.pageNum=val
            this.showExmineLists()
        },
        //查看详情(审批中心)
        seeDetails(obj){
            this.seeDetailsVisible=true
            this.employeeInfo=obj
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
        // ******************************************************员工详情*************************************************
        //修改员工信息
        modifyEmployeeInfo(){
            this.handleBtn=false
            this.confirmBtn=true
            this.showEdit=false
        },
        // 员工修改提交
        modifyEmpInfoSubmit(){
            this.$axios.post("/api/api/employee/updateEmployee",{
                dep_cur:this.departId,
                dep_pre:this.employeeInfo.deptId,
                email:this.employeeInfo.email,
                empCode:this.employeeInfo.empCode,
                identifyNo:this.employeeInfo.identifyNumber,
                jobNumber:this.employeeInfo.job_Number,
                joinedTime:this.employeeInfo.joinedDate,
                name:this.employeeInfo.name,
                phone:this.employeeInfo.phone,
                sex:this.employeeInfo.sex
            }).then((res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.handleBtn=true
                        this.confirmBtn=false
                        this.showEdit=false
                        this.$router.go(0)
                    })
                }else if(res.data.code==1001){
                    this.$alert(res.data,message,'信息')
                }
            }))
        },
        cancel(){
            this.handleBtn=true
            this.confirmBtn=false
            this.showEdit=true
        },
        //返回列表
        goBackList(){
            this.isShowEmpList=true
            this.isShowEmpDetail=false
            this.showEmployee(Number(this.$route.params.depId))
        },
        //移至部门
        simpleMoveToDepartment(){
            this.getDepartmentList()
            this.moveToDepVisible=true
        },
        //移至部门确定
        confirmMoveDep(){
            this.$axios.post("/api/api/employee/removeToDept",{
                depId_next:this.departId,
                list:[{
                    depId:this.employeeInfo.deptId,
                    empCode:this.employeeInfo.empCode
                }]
            }).then(res=>{
                if(res.data.code==1000){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.moveToDepartVisible=true
                        this.isShowEmpList=true
                        this.isShowEmpDetail=false
                        this.showEmployee(Number(this.$route.params.depId))
                    })
                }
            })
        },
        //移出企业
        moveOutEnterprise(){
            this.handleRemoveEmployee([this.employeeInfo.empCode])
        },
        //冻结
        simpleFreezeEmployee(){
            this.$confirm("确定冻结该员工吗？","提示",{type:"warning"}).then(()=>{
                this.handleFrozenEmployee([this.employeeInfo.empCode],1)
            })
        },
        //解冻
        releaseEmployee(){
            this.$confirm("确定解冻该员工吗？","提示",{type:"warning"}).then(()=>{
                this.handleFrozenEmployee([this.employeeInfo.empCode],0)
            })
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
    // 删除员工
    #fileToUpload{
        opacity: 0;
        filter: alpha(opacity=0);
        -moz-opacity: 0;
    }
</style>

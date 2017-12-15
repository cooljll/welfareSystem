<template>
    <div class="page-wrapper">
        <div class="wrapper-title">
            <span class="line"></span>
            <span class="title">操作日志</span>
        </div>
        <div class="wrapper-center">
            <div class="searchBar">
                <el-form :inline="true">
                    <el-form-item>
                        <el-input placeholder="姓名/登录名" v-model="filters.name"></el-input>
                    </el-form-item>
                    <el-form-item label="发布日期：">
                        <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期"
                         end-placeholder="结束日期" @change="handleDate">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="getSearchResult">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" border resizable highlight-current-row style="width: 100%;">
                <el-table-column prop="accountName" label="账号名称" align="center" width="180">
                </el-table-column>
                <el-table-column prop="userName" label="登录名" align="center" width="180">
                </el-table-column>
                <el-table-column prop="createTime" label="操作时间" sortable align="center" width="300">
                </el-table-column>
                <el-table-column prop="content" label="操作行为" align="center">
                </el-table-column>
            </el-table>
            <div class="toolbar">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import authUnils from '../../common/authUnils'
export default{
    data(){
        return{
            filters:{
                name:"",
                startTime:"",
                endTime:"",
                pageSize:10,
                pageNum:1
            },
            value:[],//发布时间
            currentPage:1,
            totalSize:0,
            tableData:[]
        }
    },
    methods:{
        handleSizeChange(val){
            this.filters.pageSize=val
            this.showPageLog()
        },
        handleCurrentChange(val){
            this.filters.pageNum=val
            this.showPageLog()
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
            this.filters.startTime=this.formatDate(this.value[0])
            this.filters.endTime=this.formatDate(this.value[1])
        },
        //获取日志列表
        showPageLog(){
            this.$axios.post("/api/api/oprateLog/show",this.filters,{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.status==200){
                    if(res.data.code==1000){
                        this.tableData=res.data.data.content
                        this.totalSize=res.data.data.totalSize
                    }
                }
            })
        },
        //搜索
        getSearchResult(){
            this.showPageLog()
        }
    },
    mounted(){
        this.showPageLog()
    }
}
</script>
<style lang="scss" scoped>
     .page-wrapper{
         height:924px;
         .wrapper-center{
             background:#fff;
             padding:20px;
         }
     }
</style>
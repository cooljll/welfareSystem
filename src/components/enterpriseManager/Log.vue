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
            <el-table :data="tableData" v-loading="loading" resizable highlight-current-row style="width: 100%;" stripe 
                
                :header-row-style="headerStyle">
                <el-table-column prop="accountName" label="账号名称" align="center" width="150">
                </el-table-column>
                <el-table-column prop="userName" label="登录名" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button type="text" style="color:#606266;">{{scope.row.userName}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="操作时间" align="center" width="200">
                </el-table-column>
                <el-table-column prop="content" label="操作行为" align="center" min-width="455">
                </el-table-column>
            </el-table>
            <div class="toolbar">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[15, 30, 45, 60]" :page-size="15"  layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import authUnils from '../../common/authUnils'
var root = process.env.API_ROOT
export default{
    data(){
        return{
            headerStyle:{
                color:"#000"
            },
            filters:{
                name:"",
                startTime:"",
                endTime:"",
                pageSize:15,
                pageNum:1
            },
            value:[],//发布时间
            currentPage:1,
            totalSize:0,
            loading:false,
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
        handleDate(val){
            if(this.value==null){
                this.filters.startTime=""
                this.filters.endTime=""
                return 
            }
            this.filters.startTime=this.formatDate(this.value[0])
            this.filters.endTime=this.formatDate(this.value[1])
        },
        //获取日志列表
        showPageLog(){
            this.loading=true
            this.$axios.post(root+"oprateLog/show",this.filters).then(res=>{
                var that=this
                setTimeout(function() {
                    that.loading=false
                }, 100)
                if(res.data.code==1000){
                    this.tableData=res.data.data.content
                    this.totalSize=res.data.data.totalSize
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
    },
    watch:{
		'$route'(to, from) {
			if(to.params.timeStamp!=from.params.timeStamp){
                this.$router.push('/Empty')
                this.$router.go(-1)
            }
		}
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
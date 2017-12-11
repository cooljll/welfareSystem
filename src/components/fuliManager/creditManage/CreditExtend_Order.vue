<template>
    <div>
        <div class="page-title">
            <div class="btn">
                <el-button type="info" class="declare">
                    <i class="iconfont icon-gantanhao"></i>
                    导出excel
                </el-button>
            </div>
            {{$route.name}}
        </div>
        <div class="page-center">
            <div class="searchBar">
                <el-form :inline="true">
                    <el-form-item label="订单类型：">
                        <el-select placeholder="请选择类型" v-model="filters.welfareType">
                            <el-option label="激励方案" value="1"></el-option>
                            <el-option label="基本节日" value="2"></el-option>
                            <el-option label="自定义福利" value="3"></el-option>
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
            </div>
            <el-table :data="tableData" border resizable highlight-current-row style="width: 100%;" border>
                <el-table-column type="selection" align="center">
                </el-table-column>
                <el-table-column prop="orderId" label="订单编号" sortable align="center">
                </el-table-column>
                <el-table-column prop="welfareType" label="福利类型" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center">
                </el-table-column>
                <el-table-column prop="consume_point" label="消费积分" align="center">
                </el-table-column>
                <el-table-column prop="state" label="订单状态" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <router-link :to="{path:'/CreditOrder_Detail/'+scope.row.orderId}">
                            <el-button type="text">查看详情</el-button>
                        </router-link>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                </el-pagination>
            </el-col>
        </div>
    </div>
</template>
<script>
import authUnils from '../../../common/authUnils'
export default{
    data(){
        return{
            tableData:[],
            value:"",
            filters:{
                welfareType:"",
                startTime:"",
                endTime:"",
                pageNum:1,
                pageSize:10
            },
            totalSize:0,
            currentPage:1
        }
    },
    methods:{
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
        handleSizeChange(val){
            this.filters.pageSize=val
            this.getPagedOrder()
        },
        handleCurrentChange(val){
            this.filters.pageNum=val
            this.getPagedOrder()
        },
        //显示订单列表
        getPagedOrder(){
            this.$axios.post("/api/api/integral/showOrder",this.filters,{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.status==200){
                    if(res.data.code==0){
                        this.tableData=res.data.data.content
                        this.totalSize=res.data.data.totalSize
                    }else{
                        this.$alert(res.data.message,"信息")
                    }
                }
            })
        },
        getSearchResult(){
            this.getPagedOrder()
        }
    },
    mounted(){
        this.getPagedOrder()
    }
}
</script>
<style lang="scss" scoped>
</style>


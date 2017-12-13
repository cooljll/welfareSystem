<template>
    <div>
        <div class="page-title">{{$route.name}}</div>
        <div class="page-center">
            <div class="searchBar">
                <el-form :inline="true">
                    <el-form-item label="订单号：">
                        <el-input v-model="filters.orderNo"></el-input>
                    </el-form-item>
                    <el-form-item label="还款时间(开始-结束)：">
                        <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleDate">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="getSearchResult">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" border resizable highlight-current-row style="width: 100%;">
                <el-table-column label="序号" sortable align="center">
                </el-table-column>
                <el-table-column prop="name" label="订单号" align="center">
                </el-table-column>
                <el-table-column prop="depart" label="总人数" align="center">
                </el-table-column>
                <el-table-column prop="phoneNumber" label="总还款金额" align="center">
                </el-table-column>
                <el-table-column prop="id" label="创建时间" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="info">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="toolbar">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]" :page-size="100"  layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
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
                orderNo:"",
                startTime:"",
                endTime:"",
                pageNum:"",
                pageSize:""
            },
            currentPage:1
        }
    },
    methods:{
        handleCurrentChange(){},
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
        getSearchResult(){
            console.log(this.filters)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
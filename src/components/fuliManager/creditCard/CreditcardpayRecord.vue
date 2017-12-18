<template>
    <div>
        <div class="page-title">{{$route.name}}</div>
        <div class="page-center" v-show="isShowList">
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
                <el-table-column label="序号" type="index" align="center" width="80">
                </el-table-column>
                <el-table-column prop="orderNo" label="订单号" align="center">
                </el-table-column>
                <el-table-column prop="num" label="总人数" align="center">
                </el-table-column>
                <el-table-column prop="totalMoney" label="总还款金额" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="toolbar">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[10, 20, 40, 80]" :page-size="10"  layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                </el-pagination>
            </div>
        </div>
        <div class="page-center" v-show="isShowDetail">
            <div class="searchBar">
                <el-form :inline="true">
                    <el-form-item label="信用卡号：">
                        <el-input v-model="filters.orderNo"></el-input>
                    </el-form-item>
                    <el-form-item label="户名：">
                        <el-input v-model="filters.orderNo"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="getSearchResult">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="getSearchResult">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" border resizable highlight-current-row style="width: 100%;">
                <el-table-column label="序号" sortable align="center">
                </el-table-column>
                <el-table-column prop="name" label="信用卡号" align="center">
                </el-table-column>
                <el-table-column prop="depart" label="户名" align="center">
                </el-table-column>
                <el-table-column prop="name" label="银行" align="center">
                </el-table-column>
                <el-table-column prop="depart" label="还款金额(元)" align="center">
                </el-table-column>
                <el-table-column prop="name" label="是否发送" align="center">
                </el-table-column>
                <el-table-column prop="depart" label="手续费(元)" align="center">
                </el-table-column>
                <el-table-column prop="phoneNumber" label="信息" align="center">
                </el-table-column>
                <el-table-column prop="id" label="还款状态" align="center">
                </el-table-column>
                <el-table-column prop="id" label="创建时间" align="center">
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
            isShowList:true,
            isShowDetail:false,
            tableData:[],
            value:"",
            filters:{
                orderNo:"",
                startTime:"",
                endTime:"",
                pageNum:1,
                pageSize:10
            },
            currentPage:1,
            totalSize:0
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
        getcreditCardList(){
            this.$axios.post("/api/api/creditCard/queueOrders",this.filters).then(res=>{
                if(res.data.code==1000){
                    this.tableData=res.data.data.content
                    this.totalSize=res.data.data.totalSize
                }
            })
        },
        handleSizeChange(val){
            this.filters.pageSize=val
            this.getcreditCardList()
        },
        handleCurrentChange(val){
            this.filters.pageNum=val
            this.getcreditCardList()
        },
        getSearchResult(){
            this.getcreditCardList()
        }
    },
    mounted(){
        this.getcreditCardList()
    }
}
</script>
<style lang="scss" scoped>

</style>
<template>
    <div>
        <div class="page-center">
            <div class="searchBar">
                <div class="goback">
                    <el-button type="info" @click="returnList">返回列表</el-button>
                </div>
                <div class="exportbox">导出excel</div>
            </div>
            <el-table :data="tableData" border resizable highlight-current-row style="width: 100%;" border>
                <el-table-column type="selection" align="center">
                </el-table-column>
                <el-table-column prop="name" label="姓名" align="center">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" align="center">
                </el-table-column>
                <el-table-column prop="welType" label="福利类型" align="center">
                </el-table-column>
                <el-table-column prop="state" label="是否兑换" align="center">
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]" :page-size="100"  layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </el-col>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            tableData:[
                {
                    name:"李东生",
                    phone:"18800338990",
                    welType:"圣诞节",
                    state:"未兑换"
                }
            ],
            currentPage:1
        }
    },
    methods:{
        handleCurrentChange(){},
        returnList(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="scss" scoped>
    .searchBar{
        padding:0 20px;
        .goback{
            float: left;
            height: 60px;
            line-height: 60px;
        }
        .exportbox{
            float: right;
            height: 60px;
            line-height: 60px;
            color:#fff;
            font-size: 14px;
        }
    }

</style>


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
                <el-table-column prop="phoneNumber" label="手机号" align="center">
                </el-table-column>
                <el-table-column prop="welType" label="福利类型" align="center">
                </el-table-column>
                <el-table-column prop="state" label="是否兑换" align="center">
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
            currentPage:1,
            totalSize:0,
            extendEmpParams:{
                orderId: "",
                pageNum: 1,
                pageSize: 10,
                state: ""
            },
            welType:""
        }
    },
    methods:{
        handleSizeChange(val){
            this.extendEmpParams.pageSize=val
            this.getOrderDetailEmpList()
        },
        handleCurrentChange(val){
            this.extendEmpParams.pageNum=val
            this.getOrderDetailEmpList()
        },
        //返回列表
        returnList(){
            this.$router.go(-1)
        },
        //订单详情发放人员列表
        getOrderDetailEmpList(){
            this.$axios.post("/api/api/integral/orderDetailEmp",this.extendEmpParams,{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                console.log(res)
                if(res.status==200){
                    if(res.data.code==0){
                        res.data.data.content.forEach(item=>{
                            item["welType"]=this.welType
                        })
                        this.tableData=res.data.data.content
                        this.totalSize=res.data.data.totalSize
                    }
                }
            })  
        }
    },
    mounted(){
        this.extendEmpParams.orderId=this.$route.params.id   
        this.welType=this.$route.params.type   
        this.getOrderDetailEmpList()
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


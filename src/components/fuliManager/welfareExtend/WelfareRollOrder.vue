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
                <el-table-column prop="productName" label="福利卷名称" align="center">
                </el-table-column>
                <el-table-column prop="welType" label="福利类型" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center">
                </el-table-column>
                <el-table-column prop="consume_point" label="消费积分" align="center">
                </el-table-column>
                <el-table-column prop="state" label="订单状态" align="center">
                </el-table-column>
                <el-table-column label="操作" sortable align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="seeOrderDetail(scope.row.productNo)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]" :page-size="100"  layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </el-col>
        </div>
        <!-- 订单详情弹框 -->
        <el-dialog title="配置详情" :visible.sync="orderDetailVisible" :close-on-click-modal="false" class="orderDetailDialog">
            <div class="orderDetail_wrapper">
                <div class="topbox">
                    <div class="imgbox">
                        <img :src="orderInfo.productImage">
                    </div>
                    <div class="infobox">
                        <div>
                            <span class="title">福利券名称</span>
                            <span class="center">{{orderInfo.productName}}</span>
                        </div>
                        <div>
                            <span class="title">福利类型</span>
                            <span class="center">{{orderInfo.welType}}</span>
                        </div>
                        <div>
                            <span class="title">福利券单价</span>
                            <span class="center">{{orderInfo.price}}</span>
                        </div>
                        <div>
                            <span class="title">订单编号</span>
                            <span class="center">{{orderInfo.productNo}}</span>
                        </div>
                    </div>
                </div>
                <div class="mourinfobox">
                    <div>
                        <span class="title">总人数</span>
                        <span class="center">{{orderInfo.nums}}</span>
                    </div>
                    <div>
                        <span class="title">总花费积分</span>
                        <span class="center">{{orderInfo.consume_point}}</span>
                    </div>
                    <div>
                        <span class="title">创建时间</span>
                        <span class="center">{{orderInfo.createTime}}</span>
                    </div>
                    <div>
                        <router-link to="/OrderExtend_Detail">
                            <el-button type="primary">详细发放人员</el-button>
                        </router-link>
                    </div>
                </div>
                <div class="messbox">{{orderInfo.blessMsg}}</div>
                <div class="status">{{orderInfo.state}}</div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import authUnils from "../../../common/authUnils"
import qs from 'queryString'
export default{
    data(){
        return{
            tableData:[
                {
                    orderId:"1001",
                    productName:"演示福利卷",
                    welType:"圣诞节",
                    createTime:"2017-11-21 14:02:53",
                    state:"发放成功",
                    consume_point:1,
                }
            ],
            value:"",
            filters:{
                welfareType:"",
                startTime:"",
                endTime:"",
                pageNum:1,
                pageSize:10
            },
            currentPage:1,
            orderDetailVisible:false,
            orderInfo:{
                blessMsg:"圣诞忙里偷闲，许个美好心愿，祝你快乐连连；发个美丽誓言，祝你风度翩翩；圣诞完了元旦，不要手忙脚乱；写份爱的信笺，祝你万事圆圆！",
                consume_point:1,
                createTime:"2017-11-21 14:02:53",
                msg:"",
                nums:1,
                orderId:"10020601",
                postType:"2",
                postTypeName:"特定人员发放",
                price:1,
                productImage:"http://admin.youmina.com:80/image/FuliTicket/2017-05-10_152693_.png",
                productName:"演示福利券（多选）",
                productNo:"C3DE51C3-38BA-4A32-971B-F785AFFB8BE7",
                state:"发放成功",
                welType:"圣诞节"
            }
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
        handleCurrentChange(){},
        //显示订单列表
        getPagedOrder(){
            this.$axios.post("/api/api/voucher/showOrder",this.filters,{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                console.log(res)
                if(res.status==200){
                    if(res.data.code==0){
                        this.tableData=res.data.data.content
                    }else{
                        this.$alert(res.data.message,"信息")
                    }
                }
            })
        },
        //搜索结果
        getSearchResult(){
            this.getPagedOrder()
        },
        //查看详情
        seeOrderDetail(sku){
            this.orderDetailVisible=true
            this.$axios.post("/api/api/voucher/product/sku",qs.stringify({sku:sku}),{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                console.log(res)
                if(res.status==200){
                    if(res.data.code==0){
                       
                    }
                }
            })
        }
    },
    mounted(){
        this.getPagedOrder()
    }
}
</script>
<style lang="scss" scoped>
    .orderDetail_wrapper{
        .topbox{
            padding-bottom: 50px;
            border-bottom: 1px solid #D8D8D8;
            .imgbox{
                float: left;
                height: 160px;
                width: 160px;
                margin-right: 20px;
                img{
                    display: block;
                    max-width: 160px;
                    max-height: 160px;
                    margin: 0px auto;
                }
            }
            .infobox{
                div{
                    margin-bottom: 20px;
                    .title{
                        font-size: 14px;
                        color: #3A4D62;
                        letter-spacing: 0;
                        text-align: right;
                        width: 80px;
                        margin-right: 15px;
                    }
                    .center{
                        font-size: 14px;
                        color: #A8A9AB;
                        letter-spacing: 0;
                    }
                }
            }
        }
        .mourinfobox{
            padding: 40px 38px 20px;
            border-bottom: 1px solid #D8D8D8;
            overflow: hidden;
            div{
                float: left;
                width: 247px;
                margin-bottom: 20px;
                .title{
                    font-size: 14px;
                    color: #3A4D62;
                    margin-right: 40px;
                }
                .center{
                    font-size: 14px;
                    color: #A8A9AB;
                }
            }
        }
        .messbox{
            background: #FAFAFA;
            border: 1px solid #EAEAEA;
            border-radius: 3px;
            height: 70px;
            overflow: auto;
            font-size: 12px;
            color: #757D87;
            letter-spacing: 0;
            padding: 14px 20px;
            margin-top: 40px;
        }
        .status{
            margin: 40px auto 0px;
            width: 230px;
            height: 47px;
            line-height: 47px;
            text-align: center;
            background: #ffa262;
            border-radius: 100px;
            font-family: "MicrosoftYaHei-Bold";
            font-size: 14px;
            color: #FFFFFF;
        }
    }
</style>


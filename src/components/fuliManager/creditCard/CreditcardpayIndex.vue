<template>
    <div>
        <div class="page-title">{{$route.name}}</div>
        <div class="page-center">
            <el-row class="main">
                <el-col>
                    <img src="" alt="">
                </el-col>
                <el-col>
                    <el-button type="primary">选择文件</el-button>
                </el-col>
                <el-col class="up-txt">
                    <span>上传要求：</span>
                    1.仅支持Excel文件  2.请按照模板格式录入正确的信息  3.详情请看下载好的模板。
                </el-col>
                <el-col class="up-template">
                    <el-button @click="downloadTemplate">下载Excel模板</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import authUnils from '../../../common/authUnils'
export default{
    data(){
        return{

        }
    },
    methods:{
        downloadTemplate(){
            this.$axios.get("/api/api/creditCard/excel").then(res=>{
                console.log(res)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .page-center{
        padding:20px;
        .main{
            text-align: center;
            .el-col{
                margin:30px 0;
                &.up-txt{
                    color:#555;
                    span{
                        font-weight: 700;
                    }
                }
            }
        }
    }
</style>


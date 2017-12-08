<template>
    <div>
        <div class="page-title">{{$route.name}}</div>
        <div class="page-center">
            <el-row class="main">
                <el-col>
                    <img src="" alt="">
                </el-col>
                <el-col>
                    <el-button type="primary">批量上传</el-button>
                </el-col>
                <el-col class="up-txt">
                    <span>上传要求：</span>
                    1.仅支持Excel文件  2.请按照模板格式录入正确的信息  3.详情请看下载好的模板。
                </el-col>
                <el-col class="up-template">
                    <el-button>下载Excel模板</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    
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


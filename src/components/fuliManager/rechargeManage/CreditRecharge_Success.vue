<template>
    <div>
        <div class="page-title">
            {{$route.name}}
        </div>
        <div class="page-center">
            <div class="success">
                <!-- <img src="assets/img/successful.png"> -->
                <img src="../../../assets/timg.jpg" alt="">
                <div class="statusname">发放成功！</div>
                <div class="btnbox">
                    <router-link to="/creditRecharge">
                        <el-button type="primary">再次发放</el-button>
                    </router-link>
                    <router-link to="/OrderRecharge">
                        <el-button>查看订单</el-button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    
</script>
<style lang="scss" scoped>
    .page-center{
        min-height: 380px;
        .success{
            img{
                display: block;
                width:256px;
                margin: 128px auto 20px;
            }
            .statusname{
                text-align: center;
                font-size: 20px;
                color: #9ACC6A;
                margin-bottom: 36px;
            }
            .btnbox{
                text-align: center;
                margin-bottom: 20px;
            }
        }
    }
</style>

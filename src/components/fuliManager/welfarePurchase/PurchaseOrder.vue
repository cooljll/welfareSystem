<template>
    <div>
        <div class="page-title">{{$route.name}}</div>
        <div class="page-center">
            <div class="welfare-wrapper">
                <img src="../../../assets/img/order_bg.png" style="width: 100%;height: auto">
                <a href="javascript:;" @click="seeOrder">查看订单</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        methods:{
            seeOrder(){
                window.open("http://www.youmina.com/order/history")
            }
        }
    }
</script>
<style lang="scss" scoped>
    .page-center{
        padding:44px 0;
        .welfare-wrapper{
            width: 95%;
            margin: 0 auto;
            position: relative;
            background-size: 100% 100%;
            img{
                border: 0px;
                width: 100%;
                height: auto;
            }
            a{
                display: block;
                width: 154px;
                height: 40px;
                line-height: 40px;
                position: absolute;
                z-index: 2;
                bottom: 30%;
                left: 50%;
                margin-left: -100px;
                background: #58B0EB;
                box-shadow: 0 2px 20px 0 rgba(86,86,86,0.25);
                border-radius: 3px;
                font-size: 16px;
                text-align: center;
                color: #FFFFFF;
                cursor: pointer;
            }
        }
    }
</style>
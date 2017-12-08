<template>
    <div>
        <div class="page-title">
            {{$route.name}}
        </div>
        <div class="page-center">
            <div class="titleimg">
                <img class="titleimg" src="assets/img/weixinzhifu.png">
            </div>
            <div class="titlenamebox">
                <span class="bigname">有米拿</span>
                <span class="smallname">收款方: 金划算科技股份有限公司</span>
            </div>
            <div class="QRbox">
                <div class="QRleft">
                    <img class="QRimg" src="rest/wechatPay/nativeOrder?payOrder=1000000049925896&amp;point=1">
                    <span class="QRtitle">
                        请使用微信扫一扫<br>
                        扫描二维码支付
                    </span>
                </div>
                <div class="QRright">
                    <img src="assets/img/phone-bg.png">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    
</script>
<style lang="scss" scoped>
    .page-center{
        padding:20px;
        .titleimg{
            height:50px;
        }
        .titlenamebox{
            margin-top:15px;
            overflow: hidden;
            .bigname{
                font-size: 18px;
                float: left;
                margin-right: 15px;
            }
            .smallname{
                font-size: 16px;
                float: left;
                line-height: 28px;
            }
        }
        .QRbox{
            display: flex;
            margin-top: 20px;
            padding: 15px 0px 20px;
            border-top: 1px solid rgba(58, 77, 98, 0.20);
            .QRleft{
                width:100%;
                .QRimg{
                    width: 300px;
                    height: 300px;
                    display: block;
                    float: right;
                    margin-top: 35px;
                    border:none;
                }
                .QRtitle{
                    display: block;
                    width: 300px;
                    float: right;
                    text-align: center;
                    font-size: 16px;
                    clear: both;
                    line-height: 28px;
                    margin-top: 15px;
                }
            }
            .QRright{
                width:100%;
                img{
                    margin-left: 20px;
                    display: inline-block;
                    border: none;
                }
            }
        }
    }
</style>


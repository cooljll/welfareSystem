<template>
    <div>
        <div class="page-title">
            {{$route.name}}
        </div>
        <div class="page-center">
            <div class="recharge_center" v-show="isShowRecharge">
                <div class="information">
                    <i class="iconfont icon-home information-icon"></i>
                    <span class="information-title">您购买的一积分等于一元，因企业积分充值需要财务审核，充值并非实时到账，成功后我们将会用短信通知到账情况</span>
                </div>
                <div class="paybox">
                    <div class="recharge-info">
                        <div class="title">充值信息</div>
                        <div class="recharge-countbox">
                            <span class="countxt">充值数量:</span>
                            <div class="countinput">
                                <el-input v-model="invoiceInfo.amount_payable" @keyup.native="countkeyup"></el-input>
                            </div>
                        </div>
                        <div class="recharge-moneybox">
                            <div class="countxt">应付金额:</div>
                            <div class="money">¥ {{invoiceInfo.amount_payable}}</div>
                        </div>
                        <div class="information-txt">温馨提示: 1积分等于1元<br><br>财务审核完成后，将会用短信通知到账情况</div>
                    </div>
                    <div class="pay-info">
                        <div class="invoice-info">
                            <div class="title">
                                发票信息
                            </div>
                            <div class="center">
                                <el-form class="form-center invoice-row" label-position="right" label-width="80px" style="width:500px">
                                    <el-form-item label="发票类型">
                                        {{invoiceInfo.invoice_type}}
                                    </el-form-item>
                                    <el-form-item label="发票抬头">
                                        <el-input v-model="invoiceInfo.invoice_title"></el-input>
                                    </el-form-item>
                                    <el-form-item label="发票内容">
                                        {{invoiceInfo.invoice_content}}
                                    </el-form-item>
                                    <el-form-item label="邮寄地址">
                                        <el-input placeholder="上海市浦东新区金湘路201弄15号1132室" v-model="invoiceInfo.invoice_address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系人">
                                        <el-input placeholder="田发波" v-model="invoiceInfo.invoice_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系方式">
                                        <el-input placeholder="13918116502" v-model="invoiceInfo.invoice_phone"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                        <div class="recharge-type">
                            <div class="title">
                                充值方式
                            </div>
                            <div class="center">
                                <div class="recharge-row">
                                    <div class="row-txt">选择方式</div>
                                    <div class="row-input">
                                        <el-button type="info" @click="bankPay">银行电汇</el-button>
                                        <el-button type="info" @click="aliPay">支付宝</el-button>
                                        <el-button type="info" @click="wechatPay">微信支付</el-button>
                                    </div>
                                </div>
                                <div class="paybox-row">
                                    <div class="row-txt"></div>
                                    <div class="row-input">
                                        <div class="paytype" v-show="yinhang">
                                            <div class="row">
                                                <span>户名</span>
                                                <span>金划算科技股份有限公司</span>
                                            </div>
                                            <div class="row">
                                                <span>开户行</span>
                                                <span>招商银行上海分行金桥支行</span>
                                            </div>
                                            <div class="row">
                                                <span>账号</span>
                                                <span>121919178510901</span>
                                            </div>
                                        </div>
                                        <div class="paytype" v-show="zhifubao">
                                            <!-- <img src="assets/img/zhifubao.png"> -->
                                        </div>
                                        <div class="paytype" v-show="weixin">
                                            <!-- <img src="assets/img/weixinzhifu.png"> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a class="immediaterecharge" @click="immediateRechange">立即充值</a>
            </div>
            <div class="success" v-show="isShowSuccess">
                <!-- <img src="assets/img/successful.png"> -->
                <img src="../../../assets/timg.jpg" alt="">
                <div class="statusname">发放成功！</div>
                <div class="btnbox">
                    <el-button type="primary" @click="rechargeOneMore">再次充值</el-button>
                    <router-link to="/OrderRecharge">
                        <el-button>查看订单</el-button>
                    </router-link>
                </div>
                <div class="information">        
                    因本公司要对企业充值进行入账审核，如果审核已到账，系统会短信通知您充值成功！
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import authUnils from '../../../common/authUnils'
export default{
    data(){
        return{
            yinhang:true,
            zhifubao:false,
            weixin:false,
            isShowRecharge:true,
            isShowSuccess:false,
            //积分充值参数
            invoiceInfo:{
                amount_payable: "0",
                enterpriseName: "金划算科技股份有限公司",
                invoice_address: "",
                invoice_content: "福利费",
                invoice_name: "",
                invoice_phone: "",
                invoice_title: "",
                invoice_type: "普通发票",
                payOrder: "",
                payType: "",
                point: ""
            }
        }
    },
    methods:{
        bankPay(){
            this.yinhang=true
            this.zhifubao=false
            this.weixin=false
        },
        aliPay(){
            this.yinhang=false
            this.zhifubao=true
            this.weixin=false
        },
        wechatPay(){
            this.yinhang=false
            this.zhifubao=false
            this.weixin=true
        },
        //键盘事件
        countkeyup(){
            var reg=/^[1-9][0-9]*$/
            if(!reg.test(this.invoiceInfo.amount_payable)){
               this.invoiceInfo.amount_payable="0" 
            }else{
                this.invoiceInfo.amount_payable=this.invoiceInfo.amount_payable
            }
        },
        //立即充值
        immediateRechange(){
            if(this.invoiceInfo.amount_payable=="0"){
                this.$alert("积分数量不能为0或负数","信息")
            }else if(this.invoiceInfo.invocieTitle==""){
                this.$alert("发票抬头不能为空","信息")
            }else{
                this.$confirm("确定生成充值订单？","信息").then(()=>{
                    if(this.yinhang){
                        this.payByBank()
                    }else if(this.zhifubao){
                        window.open("https://excashier.alipay.com/standard/auth.htm?payOrderId=2edb112b517644378be21f963315b223.60")
                    }else if(this.weixin){
                        this.$router.push("/WechatRecharge")
                    }
                })
            }
        },
        //银行支付
        payByBank(){
            this.$axios.post("/api/api/recharge/pay",this.invoiceInfo).then(res=>{
                if(res.data.code==0){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.isShowRecharge=false
                        this.isShowSuccess=true
                    })
                }else if(res.data.code==1){
                    this.$alert(res.data.message,"信息").then(()=>{
                        this.isShowRecharge=true
                        this.isShowSuccess=false
                    })
                }
            })
        },
        //再次充值
        rechargeOneMore(){
            this.isShowRecharge=true
            this.isShowSuccess=false
        }
    }
}
</script>
<style lang="scss" scoped>
    //充值中心
    .recharge_center{
        .information{
            width: 100%;
            height: 32px;
            background: #EEF4FA;
            line-height: 32px;
            .information-icon{
                width: 15px;
                height: 15px;
                margin-left: 15px;
                margin-right:5px;
            }
            .information-title{
                font-size: 12px;
                color: #7B7D7F;
                margin: 8px 0px;
            }
        }
        .paybox{
            width: 100%;
            .recharge-info{
                background: #FAFAFA;
                height: 560px;
                width: 20%;
                margin-right: 20px;
                margin-top: 20px;
                padding: 20px 12px;
                float: left;
                .title{
                    font-size: 14px;
                    color: #2D2E2E;
                    border-bottom: 1px solid #DFDFDF;
                    padding-bottom: 20px;
                    margin-bottom: 20px;
                }
                .recharge-countbox{
                    height: 70px;
                    .countxt{
                        font-size: 14px;
                        color: #7B7D7F;
                        float: left;
                        margin-top: 10px;
                        margin-right: 40px;
                    }
                    .countinput{
                        float: left;
                        width: 140px;
                    }
                }
                .recharge-moneybox{
                    margin-top: 10px;
                    padding-bottom: 100px;
                    border-bottom: 1px solid #DFDFDF;
                    margin-bottom: 24px;
                    .countxt{
                        font-size: 14px;
                        color: #7B7D7F;
                        margin-bottom: 10px;
                    }
                    .money{
                        font-family: ArialMT;
                        font-size: 34px;
                        color: #FF5656;
                        padding-left: 13px;
                    }
                }
                .information-txt{
                    font-size: 12px;
                    color: #9ACC6A;
                }
            }
            .pay-info{
                width:75%;
                float: right;
                .invoice-info{
                    background: #FAFAFA;
                    height: 333px;
                    min-width: 600px;
                    width: 100%;
                    margin-top:20px;
                    .title{
                        background: #F2F2F2;
                        float: left;
                        height: 22px;
                        line-height: 22px;
                        width: 333px;
                        transform: rotate(-90deg);
                        font-size: 12px;
                        color: #A8A9AB;
                        text-align: center;
                        position: relative;
                        top: 155px;
                        left: -156px;
                    }
                    .center{
                        width: 100%;
                        height: 100%;
                        position: relative;
                        top: -22px;
                        left: 0px;
                        overflow: hidden;
                        .invoice-row{
                            margin-top:20px;
                            margin-left:52px;
                            text-align: left;
                            .el-form-item{
                                height:40px;
                                margin-bottom:10px;
                                color:#757D87;
                            }
                        }
                    }
                }
                .recharge-type{
                    background: #FAFAFA;
                    height: 247px;
                    min-width: 600px;
                    margin-top: 20px;
                    width: 100%;
                    .title{
                        background: #F2F2F2;
                        float: left;
                        height: 22px;
                        line-height: 22px;
                        width: 247px;
                        transform: rotate(-90deg);
                        font-size: 12px;
                        color: #A8A9AB;
                        text-align: center;
                        position: relative;
                        top: 112px;
                        left: -113px;
                    }
                    .center{
                        width: 100%;
                        height: 100%;
                        position: relative;
                        top: -22px;
                        left: 0px;
                        overflow: hidden;
                        .recharge-row{
                            height: 28px;
                            margin-top: 40px;
                            margin-left: 52px;
                            .row-txt{
                                float: left;
                                height: 28px;
                                line-height: 28px;
                                font-size: 14px;
                                color: #757D87;
                                width: 60px;
                                text-align: right;
                                margin-right: 30px;
                            }
                            .row-input{
                                height: 28px;
                                float: left;
                            }
                        }
                        .paybox-row{
                            height: 108px;
                            margin-top: 30px;
                            margin-left: 52px;
                            .row-txt{
                                float: left;
                                height: 108px;
                                width: 60px;
                                text-align: right;
                                margin-right: 30px;
                            }
                            .row-input{
                                height: 108px;
                                float: left;
                                .paytype{
                                    height: 106px;
                                    width: 485px;
                                    background: #FFFFFF;
                                    border: 1px solid #E0E4E9;
                                    .row{
                                        height:35px;
                                        border-bottom:1px solid #E1E5EA;
                                        span:first-child{
                                            font-size:14px;
                                            background-color: #F7F8F9;
                                            color:#3A4D62;
                                            display:inline-block;
                                            width:145px;
                                            height:34px;
                                            text-align: center;
                                            line-height:34px;
                                        }
                                        span:last-child{
                                            font-size: 14px;
                                            color: #7B7D7F;
                                            padding-left: 50px;
                                        }
                                    }
                                    img{
                                        height: 35px;
                                        width: 115px;
                                        display: block;
                                        margin: 36px auto;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .immediaterecharge{
            float: left;
            display: block;
            clear: both;
            height: 36px;
            line-height: 36px;
            background: #3082DF;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;
            padding: 0px 30px;
            margin: 27px 0px 70px 24%;
            cursor: pointer;
        }
    }
    //充值成功
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
        .information{
            width: 459px;
            height: 44px;
            margin: 0px auto;
            background: #F8FAFD;
            border: 1px solid #E5E5E5;
            font-size: 14px;
            color: #7B7D7F;
            line-height: 23px;
            text-align: center;
            padding: 20px 25px;
        }
    }
</style>

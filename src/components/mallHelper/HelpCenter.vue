<template>
    <div class="page-wrapper">
        <div class="wrapper-title">
            <span class="line"></span>
            <span class="title">帮助中心</span>
        </div>
        <div class="wrapper-center">
            <ul>
                <li>
                    <img src="../../assets/timg.jpg" alt="">
                    <p class="hp1">注册</p>
                    <p class="hp2">注册条款</p>
                    <a href="javascript:;" class="listmore" @click="seeDetails">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/timg.jpg" alt="">
                    <p class="hp1">有米拿礼品卡</p>
                    <p class="hp2">有米拿礼品卡</p>
                    <a href="javascript:;" class="listmore">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/timg.jpg" alt="">
                    <p class="hp1">积分充值</p>
                    <p class="hp2">积分充值条款</p>
                    <a href="javascript:;" class="listmore">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/timg.jpg" alt="">
                    <p class="hp1">积分规则</p>
                    <p class="hp2">积分使用规则</p>
                    <a href="javascript:;" class="listmore">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/timg.jpg" alt="">
                    <p class="hp1">常见问题</p>
                    <p class="hp2">常见问题</p>
                    <a href="javascript:;" class="listmore">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/timg.jpg" alt="">
                    <p class="hp1">礼品卡激活</p>
                    <p class="hp2">激活礼品卡</p>
                    <a href="javascript:;" class="listmore">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/timg.jpg" alt="">
                    <p class="hp1">购物</p>
                    <p class="hp2">购物流程</p>
                    <a href="javascript:;" class="listmore">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/timg.jpg" alt="">
                    <p class="hp1">登陆</p>
                    <p class="hp2">登陆流程</p>
                    <a href="javascript:;" class="listmore">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/timg.jpg" alt="">
                    <p class="hp1">积分介绍</p>
                    <p class="hp2">领取与使用积分</p>
                    <a href="javascript:;" class="listmore">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/timg.jpg" alt="">
                    <p class="hp1">快递配送</p>
                    <p class="hp2">运费与方式</p>
                    <a href="javascript:;" class="listmore">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/timg.jpg" alt="">
                    <p class="hp1">售后服务</p>
                    <p class="hp2">退换货</p>
                    <a href="javascript:;" class="listmore">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/timg.jpg" alt="">
                    <p class="hp1">特色服务</p>
                    <p class="hp2">便民服务 越洋拿</p>
                    <a href="javascript:;" class="listmore">查看详情></a>
                </li>
            </ul> 
        </div>
        <!-- 帮助中心弹框 -->
        <el-dialog title="帮助中心" :visible.sync="helpCenterVisible" :close-on-click-modal="false" class="helpCeterDialog" style="top:10%">
            <div class="layer_content">
                <div class="title">注册协议</div>
                <p><span style="font-size: 12pt;">本协议是您与有米拿网站（简称"本站"或“有米拿”，网址：www.youmina.com）所有者金划算科技股份有限公司（以下简称为"金划算公司"）之间就有米拿服务等相关事宜所订立的契约，请您仔细阅读本注册协议，您点击"同意并继续"按钮后，本协议即构成对双方有约束力的法律文件。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>一、</strong><strong>本站服务条款的确认和接纳</strong></span></p>
                <p><span style="font-size: 12pt;">1.1本站的各项电子服务的所有权和运作权归金划算公司所有。用户同意所有注册协议条款并完成注册程序，才能成为本站的正式用户。用户确认：本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。</span>
                </p>
                <p><span style="font-size: 12pt;">1.2用户点击同意本协议的，即视为用户确认自己具有享受本站服务、下单购物等相应的权利能力和行为能力，能够独立承担法律责任。</span>
                </p>
                <p><span style="font-size: 12pt;">1.3如果您在18周岁以下，您只能在父母或监护人的监护参与下才能使用本站。</span></p>
                <p><span style="font-size: 12pt;">1.4有米拿保留在中华人民共和国大陆地区法施行之法律允许的范围内独自决定拒绝服务、关闭用户账户、清除或编辑内容或取消订单的权利。</span>
                </p>
                <p><span style="font-size: 12pt;">1.3如果您在18周岁以下，您只能在父母或监护人的监护参与下才能使用本站。</span></p>
                <p><span style="font-size: 12pt;">1.4有米拿保留在中华人民共和国大陆地区法施行之法律允许的范围内独自决定拒绝服务、关闭用户账户、清除或编辑内容或取消订单的权利。</span>
                </p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default{
    data(){
        return{
            helpCenterVisible:false
        }
    },
    methods:{
        seeDetails(){
            this.helpCenterVisible=true
        }
    }
}
</script>
<style lang="scss" scoped>
    .page-wrapper{
        height: 924px;
        .wrapper-center{
            background: #fff;
            padding:30px;
            ul{
                width: 100%;
                margin: 0 auto;
                overflow: hidden;
                li{
                    width: 16.66%;
                    text-align: center;
                    float: left;
                    margin-bottom: 30px;
                    font-size: 12px;
                    img{
                        width:60px;
                        height:60px;
                        border-radius: 50%;
                    }
                    p{
                        margin-bottom: 3px;
                        &.hp2{
                            color: #aaa;
                        }
                    }
                    .listmore{
                        display: block;
                        width: 86px;
                        text-align: center;
                        height: 27px;
                        line-height: 27px;
                        color: #aaa;
                        border-radius: 4px;
                        border: 1px solid #5c686e;
                        cursor: pointer;
                        margin: 0 auto;
                    }
                }
            }
        }
    }
    .layer_content{
        overflow-y: auto;
        height:380px;
        .title{
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size:16px;
            font-weight: 700;
        }
    }
</style>


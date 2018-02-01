<template>
    <div>
        <div class="page-menu">
            <el-menu :default-active="activeName" class="el-menu-vertical-demo" :router="true"
                background-color="#3A4D62" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true">
                <el-menu-item index="WelfareOverview" @click="refresh">
                    <i class="iconfont icon-home"></i>
                    <span>福利总览</span>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="iconfont icon-chongzhi"></i>
                        <span>充值管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="CreditRecharge" @click="refresh">积分充值</el-menu-item>
                        <el-menu-item index="OrderRecharge" @click="refresh">充值订单</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="iconfont icon-chongzhi1"></i>
                        <span>积分管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="CreditExtend" @click="refresh">积分发放</el-menu-item>
                        <el-menu-item index="CreditExtend_Excel" @click="refresh">Excel积分发放</el-menu-item>
                        <el-menu-item index="CreditExtend_Order" @click="refresh">积分发放订单</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="iconfont icon-lihe"></i>
                        <span>福利发放</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="WelfareRollExtend" @click="refresh">福利卷发放</el-menu-item>
                        <el-menu-item index="WelfareRollOrder" @click="refresh">福利卷订单</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="iconfont icon-caigou"></i>
                        <span>福利采购</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="WelfarePick" @click="refresh">福利挑选</el-menu-item>
                        <el-menu-item index="PurchaseOrder" @click="refresh">福利订单</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                        <i class="iconfont icon-statistics"></i>
                        <span>数据报告</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="WelfareData" @click="refresh">福利数据</el-menu-item>
                        <el-menu-item index="WelfareReport" @click="refresh">福利报告</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="7">
                    <template slot="title">
                        <i class="iconfont icon-xinyongqia"></i>
                        <span>信用卡还款</span>
                    </template>
                    <el-menu-item-group> 
                        <el-menu-item index="CreditcardpayIndex" @click="refresh">信用卡还款首页</el-menu-item>
                        <el-menu-item index="CreditcardpayRecord" @click="refresh">信用卡还款记录</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="center-inner">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
export default{
    methods:{
        refresh(){
            let userAgent = window.navigator.userAgent
			if (userAgent.indexOf("Firefox") > -1) {
				// window.location.reload()
            }else{
                this.$router.push("/WelfareIndex")
                this.$router.go(-1)
            }
		}
    },
    computed: {
        activeName: function(){
            return this.$route.path.replace('/', '')
        }
    }
}
</script>
<style lang="scss" scoped>
    .page-menu{
        float: left;
        position: fixed;
        background-color: #3A4D62;
        top: 50px;
        left: 0px;
        z-index: 1000;
        height: 100%;
        .el-menu{
            width: 220px;
            height: 100%;
        }
        .iconfont{
            width:14px;
            height: 14px;
            color: #ccc;
            margin-right:5px;
        }
    }
    .center-inner{
        margin-top: 50px; 
        margin-left: 220px;
        background: #F7F8F9;
        overflow: auto;
        min-height: 920px;
    }
</style>


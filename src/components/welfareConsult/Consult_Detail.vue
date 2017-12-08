<template>
    <div>
        <div class="consult-box">
            <div class="details-box">
                <div class="details-info">
                    <div class="main">
                        <div class="bread">
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item :to="{ path: '/ConsultIndex' }">福利资讯</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{ path: '/Consult_List' }">福利资讯</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{ path: '/Consult_Detail' }">资讯内容</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                        <div class="info-text">
                            <div class="title thide">
                                <i class="iconfont icon-leftIcon"></i>
                                夸张福利：这家公司竟为自己62万员工免费配发iPhone
                                <i class="iconfont icon-rightIcon"></i>
                            </div>
                            <div class="content">
                                <p style="text-indent: 2em;">现在苹果正在极力拓展企业用户，在昨天发布的新财报中，库克其实透露了一个细节，只是大家把注意力都放在了iPhone销量下滑上。</p>
                                <p style="text-indent: 2em;">库克在当时的财报中透露，德国大众汽车已经为全球62万名员工标配了iPhone手机，至于具体细节双方都没有透露，
                                    但是这种行为还是很受员工的喜欢。</p>
                                <p style="text-indent: 2em;">与此同时，美国银行Capital One也在积极的跟员工标配苹果产品，比如他们为员工带来了Mac和Apple Watch，
                                    同时他们还在相关领域投放了3万iPhone和iPad。</p>
                                <p style="text-indent: 2em;">另外，苹果与IBM、SAP和思科的深度合作还在洽谈中。</p>
                                <p><br></p>
                            </div>
                            <div class="bottom">
                                <div class="look-else">
                                    <p class="top">
                                        <span>上一篇</span>
                                        <br>
                                        <router-link to="">
                                            <span>2017企业最佳员工体验与福利创新论坛盛大召开</span>
                                        </router-link>
                                    </p>
                                    <p class="bottom">
                                        <span>下一篇</span>
                                        <br>
                                        <router-link to="">
                                            <span>星巴克创始人:企业成功来自员工信任 将为中国员工父母买"重疾险”</span>
                                        </router-link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="details-right">
                    <div class="title">
                        <span>热门资讯</span>
                    </div>
                    <div class="hot-collection">
                        <div class="hot_item">
                            <div class="imgbox">
                                <img src="http://admin.youmina.com:80/image/FuliInfomation/Information_2017-06-01_230066_.jpg" alt="">
                            </div>
                            <div class="item_info">
                                <p class="thide">2017企业最佳员工体验与福利创新论坛盛大召开</p>
                                <div class="time"><span>2017.06.01</span></div>
                            </div>
                        </div>
                        <div class="hot_item">
                            <div class="imgbox">
                                <img src="http://admin.youmina.com:80/image/FuliInfomation/Information_2017-05-08_685539_.jpg" alt="">
                            </div>
                            <div class="item_info">
                                <p class="thide">夸张福利：这家公司竟为自己62万员工免费配发iPhone</p>
                                <div class="time"><span>2017.05.08</span></div>
                            </div>
                        </div>
                        <div class="hot_item">
                            <div class="imgbox">
                                <img src="http://admin.youmina.com:80/image/FuliInfomation/Information_2017-04-28_368467_.jpg" alt="">
                            </div>
                            <div class="item_info">
                                <p class="thide">星巴克创始人:企业成功来自员工信任 将为中国员工父母买"重疾险”</p>
                                <div class="time"><span>2017.04.28</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    
</script>
<style lang="scss" scoped>
    .main{
        border-bottom: 1px solid #ddd;
        .info-text{
            .title{
                padding: 30px 0;
                text-align: center;
                background: #E9E9E9;
                margin: 30px 0;
                font-size: 20px;
                color: #7B7D7F;
                i{
                    font-size:24px;
                    color:#ccc;
                }
            }
            .content{
                font-size: 12px;
            }
            .bottom{
                font-size: 12px;
                .look-else{
                    overflow: hidden;
                    a{
                        color:#999ea1;
                    }
                    span{
                        color:#999ea1;
                    }
                    p.top{
                        float: left;
                    }
                    p.bottom{
                        float: right;
                        text-align: right;
                    }
                }
            }
        }
    }
    
</style>


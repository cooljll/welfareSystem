<template>
    <div class="main">
        <div class="page-box">
            <div class="search-box">
                <div class="search-logo">
                    <img src="assets/img/fulizix.png">
                </div>
                <div class="search-main">
                    <input type="text" class="search-text">
                    <input type="submit" class="search-btn" value="搜索">
                </div>
            </div>
            <div class="information">
                <!-- 左banner -->
                <div class="information-banner">
                    <!-- banner轮播 -->
                    <el-carousel trigger="click">
                        <el-carousel-item v-for="(item,index) in bannerList1" :key="index">
                            <img :src="item.imagerpath" alt="" @click="seeDetails(item.linkpath)">
                            <div class="info">
                                <div class="info-label">
                                    <span class="z">资讯</span>
                                </div>
                                <p class="thide">{{item.bannertitle}}</p>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <!-- 右banner -->
                <div class="information-right">
                    <ul>
                        <li v-for="(item,index) in bannerList2" :key="index" @click="seeDetails(item.linkpath)">
                            <img :src="item.imagerpath" alt="">
                            <div class="info">
                                <div class="info-label">
                                    <span class="z">资讯</span>
                                </div>
                                <p class="thide">{{item.bannertitle}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="information-class">
                <div class="information-title">
                    <span>福利资讯</span>
                </div>
                <div class="information-contant">
                    <!-- 动态渲染 -->
                    <!-- <div class="information-item" v-for="(item,index) in newsPageList" :key="index">
                        <a>
                            <img :src="item.imagepath">
                            <p>{{item.fuliinfoTitle}}</p>
                        </a>
                        <div class="item-info">
                            <div class="item-drec cle">
                                <span class="t">{{item.inputtime}}</span>
                            </div>
                        </div>
                    </div> -->
                    <div class="information-item">
                        <a onclick="detail('9', '1')">
                            <img src="http://admin.youmina.com:80/image/FuliInfomation/Information_2017-06-01_230066_.jpg">
                            <p>2017企业最佳员工体验与福利创新论坛盛大召开</p>
                        </a>
                        <div class="item-info">
                            <div class="item-drec cle">
                                <span class="t">2017.06.01</span>
                            </div>
                        </div>
                    </div>
                    <div class="information-item">
                        <a onclick="detail('8', '1')">
                            <img src="http://admin.youmina.com:80/image/FuliInfomation/Information_2017-05-08_685539_.jpg">
                            <p>夸张福利：这家公司竟为自己62万员工免费配发iPhone</p>
                        </a>
                        <div class="item-info">
                            <div class="item-drec cle">
                                <span class="t">2017.05.08</span>
                            </div>
                        </div>
                    </div>
                    <div class="information-item">
                        <a onclick="detail('7', '1')">
                            <img src="http://admin.youmina.com:80/image/FuliInfomation/Information_2017-04-28_368467_.jpg">
                            <p>星巴克创始人:企业成功来自员工信任 将为中国员工父母买"重疾险”</p>
                        </a>
                        <div class="item-info">
                            <div class="item-drec cle">
                                <span class="t">2017.04.28</span>
                            </div>
                        </div>
                    </div>
                    <div class="information-item">
                        <a onclick="detail('6', '1')">
                            <img src="http://admin.youmina.com:80/image/FuliInfomation/Information_2017-04-28_705434_.png">
                            <p>吃货福利来了！能吃的筷子在东京餐馆上市</p>
                        </a>
                        <div class="item-info">
                            <div class="item-drec cle">
                                <span class="t">2017.04.28</span>
                            </div>
                        </div>
                    </div>
                    <div class="information-item">
                        <a onclick="detail('5', '1')">
                            <img src="http://admin.youmina.com:80/image/FuliInfomation/Information_2017-04-28_670606_.jpg">
                            <p>腾讯员工福利这么好！不愧是中国百强品牌榜首</p>
                        </a>
                        <div class="item-info">
                            <div class="item-drec cle">
                                <span class="t">2017.04.28</span>
                            </div>
                        </div>
                    </div>
                    <div class="information-item">
                        <a onclick="detail('4', '1')">
                            <img src="http://admin.youmina.com:80/image/FuliInfomation/Information_2017-04-28_144147_.jpeg">
                            <p>小米要给员工建福利房，科技大佬喜欢发哪些购房福利？</p>
                        </a>
                        <div class="item-info">
                            <div class="item-drec cle">
                                <span class="t">2017.04.28</span>
                            </div>
                        </div>
                    </div>
                </div>  
                <div class="more_information">
                    查看更多
                    <!-- <img src="assets/img/sy_right.png"> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import authUnils from "../../common/authUnils"
import qs from 'queryString'
export default{
    data(){
        return{
            bannerList1:[],
            bannerList2:[],
            newsPageList:[
                {
                    categoryid:1,
                    categoryname:'福利资讯',
                    fuliinfoTitle:"2017企业最佳员工体验与福利创新论坛盛大召开",
                    id:9,
                    imagepath:"http://admin.youmina.com:80/image/FuliInfomation/Information_2017-06-01_230066_.jpg",
                    information:"<p style='line-height: 1.75em;'>&nbsp; &nbsp; 伯乐会联合国内领先的企业员工餐饮服务商美餐网，在 2017 年 5 月 19 日联合举办的——2017 年企业最佳员工体验与福利创新论坛将于上海盛大召开。</p><p style='line-height: 1.75em;'><img src='http://admin.youmina.com:80/ueditor/jsp/upload/image/20170601/1496286945235025171.jpg'/></p><p style='text-align: center; line-height: 1.75em;'><strong><br/></strong></p><p style='line-height: 1.75em; text-align: center;'><strong>论坛背景</strong></p><p style='line-height: 1.75em;'><span style='line-height: 1.75em;'>　　</span><span style='line-height: 1.75em;'>《未来职场》和 Beyond.com 在共同研究中发现，83% 的 HR 领导者认为“员工体验”对团队获得成功是重要的，</span><span style='line-height: 1.75em;'>",
                    inputtime:"2017-06-01 11:23:50",
                    inputuser:"liuziwei",
                    state:'1'
                }
            ]
        }
    },
    methods:{
        //获取福利咨询banner
        getBannerPosition1(){
            this.$axios.get("/api/api/welfareNews/banner?position=1",{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.status==200){
                    if(res.data.code==0){
                       this.bannerList1=res.data.data
                    }
                }
            })
        },
        getBannerPosition2(){
            this.$axios.get("/api/api/welfareNews/banner?position=2",{
                headers:{
                    "Authorization":authUnils.getToken()
                }
            }).then(res=>{
                if(res.status==200){
                    if(res.data.code==0){
                       this.bannerList2=res.data.data
                    }
                }
            })
        },
        seeDetails(params){
            let fuliInformationID=params.split(",")[0]
            let categoryID=params.split(",")[1]
            this.$router.push("/Consult_Detail")
        }
    },
    mounted(){
        this.getBannerPosition1()
        this.getBannerPosition2()
    }
}
</script>
<style lang="scss" scoped>
    .main{
        height: 924px;
        .page-box{
            width: 1200px;
            margin: 100px auto 50px;
            overflow: hidden;
            .search-box{
                width: 750px;
                margin: 0 auto;
                overflow: hidden;
                .search-logo{
                    float: left;
                    width: 173px;
                    height: 34px;
                    margin-top: 3px;
                    margin-right: 35px;
                    img{
                        width: 173px;
                        height: 34px;
                    }
                }
                .search-main{
                    float: left;
                    .search-text{
                        width: 400px;
                        height: 38px;
                        background: #FFFFFF;
                        border: 1px solid #8D9AA9;
                        float: left;
                        padding: 0px 10px;
                        outline: none;
                        cursor: text;
                    }
                    .search-btn{
                        background: #3A4D62;
                        border: 1px solid #3A4D62;
                        color: #FFF;
                        font-size: 14px;
                        width: 112px;
                        height: 40px;
                        cursor: pointer;
                        float: left;
                    }
                }
            }
            .information{
                margin-top: 50px;
                height:100%;
                overflow: hidden;
                .information-banner{
                    width: 800px;
                    height: 660px;
                    float: left;
                    position: relative;
                    cursor: pointer;
                }
                .information-right{
                    width: 380px;
                    height: 660px;
                    float: right;
                    ul{
                        padding:0;
                        li{
                            position: relative;
                            width: 100%;
                            height: 330px;
                        }
                    }
                }
                // 信息描述
                .info{
                    position: absolute;
                    width: 100%;
                    bottom: 10px;
                    padding: 20px 30px;
                    z-index:10;
                    cursor: pointer;
                    .info-label{
                        margin-bottom: 15px;
                        cursor: pointer;
                        span.z{
                            display: inline-block;
                            margin-right: 15px;
                            background: #3082DF;
                            padding: 2px 10px;
                            color: #FFF;
                            cursor: pointer;
                        }
                    }
                    p{
                        display: block;
                        width: 90%;
                        font-size: 20px;
                        color: #2D2E2E;
                        font-weight: bold;
                        text-shadow: 0px 0px 8px #FFFFFF;
                        &.thide{
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
            .information-class{
                margin-top: 50px;
                .information-title{
                    margin-bottom:30px;
                    span{
                        background: #3082DF;
                        color:#fff;
                        font-size:12px;
                        display:inline-block;
                        padding:2px 10px;
                    }
                }
                .information-contant{
                    width: 1220px;
                    overflow: hidden;
                    .information-item{
                        width: 380px;
                        float: left;
                        margin-right: 26.5px;
                        margin-bottom: 20px;
                        a{
                            img{
                                width: 380px;
                                height: 216px;
                                margin-bottom: 15px;
                                cursor: pointer;
                                border: 0px;
                            }
                            p{
                                display: block;
                                height: 52px;
                                font-size: 16px;
                                color: #2D2E2E;
                                line-height: 26px;
                                margin-bottom: 15px;
                                cursor: pointer;
                            }
                        }
                        .item-info{
                            span.t{
                                font-size: 14px;
                                color: #7B7D7F;
                            }
                        }
                    }
                }
                .more_information{
                    margin-top: 30px;
                    text-align: center;
                    font-size: 20px;
                    color: #2D2E2E;
                    line-height: 20px;
                    cursor: pointer;
                }
            }
            
        }
    }
</style>



<template>
    <div class="consult_main">
        <div class="page-box" v-show="isShowConsultIndex">
            <div class="search-box">
                <div class="search-logo">
                    <img src="../../assets/img/fulizix.png">
                </div>
                <div class="search-main">
                    <el-input placeholder="请输入要搜索的内容" v-model="filter" class="mixInput">
                        <el-button slot="append" @click="getSearchResult">搜索</el-button>
                    </el-input>
                </div>
            </div>
            <div class="information">
                <!-- 左banner -->
                <div class="information-banner">
                    <!-- banner轮播 -->
                    <el-carousel trigger="click">
                        <el-carousel-item v-for="(item,index) in bannerList1" :key="index">
                            <img :src="item.bannerLogoUrl" alt="">
                            <div class="info">
                                <div class="info-label">
                                    <span class="z">资讯</span>
                                </div>
                                <p class="thide">{{item.title}}</p>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                    <!-- <ul id="leftbannerlist">
                        <li v-for="(item,index) in bannerList1" :key="index">
                            <img :src="item.bannerLogoUrl">
                            <div class="info">
                                <div class="info-label">
                                    <span class="z">资讯</span>
                                </div>
                                <p class="thide">{{item.title}}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="left btn"><img src="../../assets/img/left.png"></div>
                    <div class="right btn"><img src="../../assets/img/right.png"></div> -->
                </div>
                <!-- 右banner -->
                <div class="information-right">
                    <ul>
                        <li v-for="(item,index) in bannerList2" :key="index">
                            <!--  @click="bannerDetail(item.id)" -->
                            <img :src="item.bannerLogoUrl" alt="">
                            <div class="info">
                                <div class="info-label">
                                    <span class="z">资讯</span>
                                </div>
                                <p class="thide">{{item.title}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="information-class">
                <ul class="information-title">
                    <li v-for="(item,index) in categoryTitle" :key="index"
                        :class="{'active':proIndex==index}"
                        @click="selectCategoryType(item.id,index)">
                        <a>{{item.displayName}}</a>
                    </li>
                </ul>
                <div class="information-contant" v-loading="loading">
                    <div class="information-item" v-for="(item,index) in newsPageList" :key="index" @click="newsDetails(item.id)">
                        <a>
                            <img :src="item.coverUrl">
                            <p>{{item.title}}</p>
                        </a>
                        <div class="item-info">
                            <div class="item-drec cle">
                                <span class="t">{{item.startDate}}</span>
                            </div>
                        </div>
                    </div>
                </div>  
                <div class="more_information" v-show="isShowMore">
                    <span @click="getMoreNews">查看更多</span>
                    <img src="../../assets/img/sy_right.png">
                </div>
            </div>
        </div>
        <!-- 资讯列表 -->
        <div class="consult-box" v-show="isShowConsultItem">
            <div class="details-box">
                <div class="details-info">
                    <div class="main">
                        <div class="bread">
                            <el-breadcrumb separator-class="el-icon-arrow-right" v-show="isShowConsultList">
                                <el-breadcrumb-item :to="{ path: '/ConsultIndex/2' }">福利资讯</el-breadcrumb-item>
                                <el-breadcrumb-item>福利资讯</el-breadcrumb-item>
                            </el-breadcrumb>
                            <el-breadcrumb separator-class="el-icon-arrow-right" v-show="isShowConsultResult">
                                <el-breadcrumb-item @click.native="gobackConsultIndex">福利资讯</el-breadcrumb-item>
                                <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                        <div class="info-list">
                            <ul>
                                <li v-for="(item,index) in newsPageList" :key="index" @click="newsDetails(item.id)">
                                    <div class="news-wrapper">
                                        <div class="img">
                                            <img :src="item.coverUrl">
                                        </div>
                                        <div class="info">
                                            <h3 class="thide">{{item.title}}</h3>
                                            <span>{{item.startDate.split(" ")[0]}}</span>
                                            <!-- 去掉所有的HTML标记 -->
                                            <p v-html="item.contents.replace(/<[^>]+>/g,'')"></p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="details-right">
                    <div class="title">
                        <span>热门收藏</span>
                    </div>
                    <div class="hot-collection">
                        <div class="hot_item" v-for="(item,index) in hotNewsList" :key="index" @click="newsDetails(item.id)">
                            <div class="imgbox">
                                <img :src="item.coverUrl" alt="">
                            </div>
                            <div class="item_info">
                                <p class="thide">{{item.title}}</p>
                                <div class="time"><span>{{item.startDate.split(" ")[0]}}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import authUnils from "../../common/authUnils"
import qs from 'queryString'
var root = process.env.API_ROOT
export default{
    data(){
        return{
            isShowConsultIndex:true,
            isShowConsultItem:false,
            filter:"",
            bannerList1:[],
            bannerList2:[],
            categoryTitle:[],//福利咨询标题
            newsPageList:[],
            isShowMore:true,
            loading:false,
            proIndex:1,
            //资讯列表
            isShowConsultList:true,
            isShowConsultResult:false,
            hotNewsList:[],
            catalogId:[]
        }
    },
    methods:{
        //获取福利咨询banner
        getBannerNews(){
            this.$axios.get(root+"welfareNews/banner").then(res=>{
                if(res.data.code==0){
                    res.data.data.forEach(item=>{
                        if(item.bannerPosition==1){
                            this.bannerList1.push(item)
                        }
                        if(item.bannerPosition==2){
                            this.bannerList2.push(item)
                        }
                    })
                }
            })
        },
        //获取福利咨询标题
        getTitle(){
            this.$axios.get(root+"welfareNews/title").then(res=>{
                if(res.data.code==1000){
                    this.categoryTitle=res.data.data
                }
            })
        },
        //分页咨询
        getNewsPageInfo(pageIndex,pageSize){
            this.loading=true
            this.$axios.post(root+"welfareNews/newsPageInfo",{
                catalogIds:this.catalogId,
                pageNum:pageIndex,
                pageSize:pageSize
            }).then(res=>{
                this.loading=false
                if(res.data.code==1000){
                    let data=res.data.data.content
                    if(data.length==0||data.length<6){
                        this.isShowMore=false
                    }else{
                        this.isShowMore=true
                    }
                    this.newsPageList=data
                }
            })
        },
        selectCategoryType(id,index){
            this.proIndex=index
            this.catalogId=[]
            this.catalogId.push(Number(id))
            this.getNewsPageInfo(1,6)
        },
        //查看更多
        getMoreNews(){
            this.isShowConsultIndex=false
            this.isShowConsultItem=true
            this.isShowConsultList=true
            this.isShowConsultResult=false
            this.getNewsPageInfo(1,10)
            this.getHotCollection()
        },
        bannerDetail(id){
            this.$router.push('/Consult_Detail/'+id)
        },
        newsDetails(id){
            this.$router.push('/Consult_Detail/'+id)
        },
        //搜索
        getSearchResult(){
            if(this.filter==""){
                return false
            }
            this.isShowConsultIndex=false
            this.isShowConsultItem=true
            this.isShowConsultList=false
            this.isShowConsultResult=true
            this.searchResult()
        },
        //查询结果
        searchResult(){
            this.$axios.post(root+"welfareNews/search",qs.stringify({filter:this.filter})).then(res=>{
                if(res.data.code==1000){
                    this.newsPageList=res.data.data.content
                }
            })
            this.getHotCollection()
        },
        // 热门收藏
        getHotCollection(){
            this.$axios.post(root+"welfareNews/newsPageInfo",{
                pageNum:1,
                pageSize:3
            }).then(res=>{
                if(res.data.code==1000){
                    this.hotNewsList=res.data.data.content
                }else if(res.data.code==1001){
                    this.$alert(res.data.message,"信息")
                }
            })
        },
        gobackConsultIndex(){
            this.$router.push('/Empty')
            this.$router.go(-1)
        }
    },
    mounted(){
        if(this.$route.params.flag=="1"){
            this.isShowConsultIndex=false
            this.isShowConsultItem=true
            this.getHotCollection()
            this.getNewsPageInfo(1,10)
        }else if(this.$route.params.flag=="2"||this.$route.params.flag==undefined){
            this.isShowConsultIndex=true
            this.isShowConsultItem=false
            this.getBannerNews()
            this.getTitle()
            this.getNewsPageInfo(1,6)
        }
    },
    watch:{
        '$route' (to, from) {
            if(to.params.flag=="1"){
                this.isShowConsultIndex=false
                this.isShowConsultItem=true
                this.getHotCollection()
                this.getNewsPageInfo(1,10)
            }else if(this.$route.params.flag=="2"||this.$route.params.flag==undefined){
                this.isShowConsultIndex=true
                this.isShowConsultItem=false
                this.getBannerNews()
                this.getTitle()
                this.getNewsPageInfo(1,6)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .consult_main{
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
                    &:hover{
                        .btn{
                            display: block;
                        }
                    }
                    ul{
                        display: block;
                        li{
                            position: absolute;
                            top: 0;
                            left: 0;
                            height: 660px;
                            cursor: pointer;
                            img{
                                transition: all .3s;
                                -moz-transition: all .3s;
                                -webkit-transition: all .3s;
                                -o-transition: all .3s;
                                &:hover{
                                    transform: scale(1.1)
                                }
                            }
                        }
                    }
                    .btn{
                        position: absolute;
                        top: 50%;
                        margin-top: -41px;
                        width: 72px;
                        height: 72px;
                        text-align: center;
                        background-color: rgba(0, 0, 0, 0.5);
                        display: none;
                        cursor: pointer;
                        img{
                            width: 32px;
                            height: 18px;
                            display: block;
                            margin: 28px auto 0;
                            cursor: pointer;
                            border: 0;
                        }
                    }
                    .left{
                        left: 0;
                    }
                    .right{
                        right: 0;
                    }
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
                            overflow: hidden;
                            img{
                                height: 100%;
                                width: 100%;
                                transition: all .3s;
                                -moz-transition: all .3s;
                                -webkit-transition: all .3s;
                                -o-transition: all .3s;
                                &:hover{
                                    transform: scale(1.1)
                                }
                            }
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
                            font-size: 14px;
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
                    padding-left:0;
                    li{
                        font-size: 14px;
                        margin-right: 15px;
                        padding: 2px 10px;
                        display: inline-block;
                        cursor: pointer;
                        border: 1px solid #7B7D7F;
                        a{
                            color: #7B7D7F;
                        }
                    }
                    li.active{
                        border: 1px solid #3082DF;
                        background: #3082DF;
                        a{
                            color: #fff;
                        }
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
                    span{
                        display:inline-block;
                    }
                    span,img{
                        vertical-align: middle;
                    }
                }
            }
        }
    }
    //列表
    .info-list{
        padding: 75px 0;
        ul{
            padding:0;
            li{
                margin-bottom:30px;
                .news-wrapper{
                    overflow: hidden;
                    .img{
                        float: left;
                        width: 250px;
                        height: 164px;
                        cursor: pointer;
                        img{
                            display: block;
                            max-width: 250px;
                            max-height: 164px;
                            margin: 0px auto;
                            cursor: pointer;
                        }
                    }
                    .info{
                        float: right;
                        width: 560px;
                        h3{
                            font-weight: normal;
                            font-size: 18px;
                            color: #2B2D2F;
                            line-height: 18px;
                            cursor: pointer;
                        }
                        span{
                            display: block;
                            font-size: 14px;
                            color: #999EA1;
                            line-height: 14px;
                            margin: 14px 0 20px;
                        }
                        p{
                            font-size: 14px;
                            color: #64676A;
                            line-height: 20px;
                            overflow: hidden;
                            display: -webkit-box;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                            text-overflow: ellipsis;
                            height: 60px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>



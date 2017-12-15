<template>
    <div class="main">
        <div class="page-box">
            <div class="search-box">
                <div class="search-logo">
                    <img src="assets/img/fulizix.png">
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
                            <img :src="item.imagerpath" alt="" @click="bannerDetail(item.linkpath)">
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
                        <li v-for="(item,index) in bannerList2" :key="index" @click="bannerDetail(item.linkpath)">
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
                    <span>{{categoryTitle}}</span>
                </div>
                <div class="information-contant">
                    <div class="information-item" v-for="(item,index) in newsPageList" :key="index" @click="newsDetails(item.categoryid,item.id)">
                        <a>
                            <img :src="item.imagepath">
                            <p>{{item.fuliinfoTitle}}</p>
                        </a>
                        <div class="item-info">
                            <div class="item-drec cle">
                                <span class="t">{{item.inputtime}}</span>
                            </div>
                        </div>
                    </div>
                </div>  
                <div class="more_information" v-show="isShowMore">
                    <span @click="getMoreNews">查看更多</span>
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
            filter:"",
            bannerList1:[],
            bannerList2:[],
            categoryTitle:"",//福利咨询标题
            newsPageList:[],
            consultParams:{
                pageNum:1,
                pageSize:6
            },
            isShowMore:true
        }
    },
    methods:{
        //获取福利咨询banner
        getBannerPosition1(){
            this.$axios.get("/api/api/welfareNews/banner?position=1").then(res=>{
                if(res.status==200){
                    if(res.data.code==1000){
                       this.bannerList1=res.data.data
                    }
                }
            })
        },
        getBannerPosition2(){
            this.$axios.get("/api/api/welfareNews/banner?position=2").then(res=>{
                if(res.status==200){
                    if(res.data.code==1000){
                       this.bannerList2=res.data.data
                    }
                }
            })
        },
        //获取福利咨询标题
        getTitle(){
            this.$axios.get("/api/api/welfareNews/title").then(res=>{
                if(res.data.code==1000){
                    this.categoryTitle=res.data.data[0].categoryname
                }
            })
        },
        //分页咨询
        getNewsPageInfo(){
            this.$axios.post("/api/api/welfareNews/newsPageInfo",this.consultParams).then(res=>{
                if(res.data.code==1000){
                    if(res.data.data.length==0){
                        this.isShowMore=false
                    }else{
                        this.isShowMore=true
                    }
                    this.newsPageList=res.data.data
                }
            })
        },
        getMoreNews(){
            this.$router.push("/Consult_List")
        },
        bannerDetail(params){
            this.$router.push('/Consult_Detail/'+params.split(",")[0]+'/'+params.split(",")[1])
        },
        newsDetails(cId,id){
            this.$router.push('/Consult_Detail/'+cId+'/'+id)
        },
        //搜索
        getSearchResult(){
            console.log(12)
            if(this.filter==""){
                return false
            }
            this.$router.push("/Consult_List/"+encodeURI(this.filter))
        }
    },
    mounted(){
        this.getBannerPosition1()
        this.getBannerPosition2()
        this.getTitle()
        this.getNewsPageInfo()
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
                    // img{
                    //     &:hover{
                    //         transform: scale(2)
                    //     }
                    // }
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



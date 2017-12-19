<template>
    <div>
        <div class="consult-box">
            <div class="details-box">
                <div class="details-info">
                    <div class="main">
                        <div class="bread">
                            <el-breadcrumb separator-class="el-icon-arrow-right" v-show="isShowConsultList">
                                <el-breadcrumb-item :to="{ path: '/ConsultIndex' }">福利资讯</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{ path: '/Consult_List' }">福利资讯</el-breadcrumb-item>
                            </el-breadcrumb>
                            <el-breadcrumb separator-class="el-icon-arrow-right" v-show="isShowConsultResult">
                                <el-breadcrumb-item :to="{ path: '/ConsultIndex' }">福利资讯</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{ path: '/Consult_Detail' }">搜索结果</el-breadcrumb-item>
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
export default{
    data(){
        return{
            isShowConsultList:true,
            isShowConsultResult:false,
            consultParams:{
                pageNum:1,
                pageSize:10
            },
            newsPageList:[],
            hotNewsList:[]
        }
    },
    methods:{
        //分页咨询
        getNewsPageInfo(){
            this.$axios.post("/api/api/welfareNews/newsPageInfo",this.consultParams).then(res=>{
                if(res.data.code==1000){
                    this.newsPageList=res.data.data.content
                }
            })
        },
        newsDetails(id){
            this.$router.push('/Consult_Detail/'+id)
        },
        //查询结果
        searchResult(){
            this.$axios.post("/api/api/welfareNews/search",qs.stringify({filter:this.$route.params.ret})).then(res=>{
                console.log(res)
                if(res.data.code==1000){
                    this.newsPageList=res.data.data.content
                }
            })
        }
    },
    mounted(){
        if(this.$route.params.ret){
            this.isShowConsultList=false
            this.isShowConsultResult=true
            this.searchResult()
        }else{
            this.isShowConsultList=true
            this.isShowConsultResult=false
            this.getNewsPageInfo()
        }
        this.$axios.post("/api/api/welfareNews/newsPageInfo",{
            pageNum:1,
            pageSize:3
        }).then(res=>{
            if(res.data.code==1000){
                this.hotNewsList=res.data.data.content
            }else if(res.data.code==1001){
                this.$alert(res.data.message,"信息")
            }
        })
    }
}  
</script>
<style lang="scss" scoped>
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
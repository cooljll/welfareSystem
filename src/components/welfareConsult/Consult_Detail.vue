<template>
    <div>
        <div class="consult-box">
            <div class="details-box">
                <div class="details-info">
                    <div class="main">
                        <div class="bread">
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item :to="{ path: '/ConsultIndex' }">福利资讯</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{ path: '/ConsultIndex/1' }">福利资讯</el-breadcrumb-item>
                                <el-breadcrumb-item>资讯内容</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                        <div class="info-text">
                            <div class="title thide">
                                {{newsDetailContent.title}}
                            </div>
                            <div class="content" v-html="newsDetailContent.contents"></div>
                            <!-- 新闻索引 -->
                            <div class="bottom">
                                <div class="look-else">
                                    <p class="top" v-show="isShowPrev">
                                        <span>上一篇</span>
                                        <br>
                                        <span class="index" @click="newsDetails(prevNews.id)">{{prevNews.title}}</span>
                                    </p>
                                    <p class="bottom" v-show="isShowNext">
                                        <span>下一篇</span>
                                        <br>
                                        <span class="index" @click="newsDetails(nextNews.id)">{{nextNews.title}}</span>
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
                        <div class="hot_item" v-for="(item,index) in hotNewsList" :key="index" @click="newsDetails(item.id)">
                            <div class="imgbox">
                                <img :src="item.coverUrl" alt="">
                            </div>
                            <div class="item_info">
                                <p class="thide">{{item.title}}</p>
                                <div class="time">
                                    <span>{{item.startDate.split(" ")[0]}}</span>
                                    <!-- <a><img src="../../assets/img/love_hui.png">10</a> -->
                                </div>
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
            hotNewsList:[],
            newsDetail:{},
            newsDetailContent:{},
            prevNews:{},
            nextNews:{},
            isShowPrev:true,
            isShowNext:true
        }
    },
    methods:{
        getNewsDetail(id){ 
            this.$axios.get(root+"welfareNews/newsInfo",{params:{id:id}}).then(res=>{
                if(res.data.code==1000){
                    this.newsDetailContent=res.data.data
                    let prevTitle=this.newsDetailContent.previousArticleDetailsFoot
                    let nextTile=this.newsDetailContent.nextArticleDetailsFoot
                    if(prevTitle==null&&nextTile!=null){
                        this.isShowPrev=false
                        this.isShowNext=true
                        this.nextNews=nextTile
                        this.prevNews={}
                    }else if(prevTitle!=null&&nextTile==null){
                        this.isShowPrev=true
                        this.isShowNext=false
                        this.prevNews=prevTitle
                        this.nextNews={}
                    }else if(prevTitle==null&&nextTile==null){
                        this.isShowPrev=false
                        this.isShowNext=false
                        this.prevNews={}
                        this.nextNews={}
                    }else{
                        this.isShowPrev=true
                        this.isShowNext=true
                        this.prevNews=prevTitle
                        this.nextNews=nextTile
                    }
                }
            })
        },
        newsDetails(id){
            this.getNewsDetail(id)
        }
    },
    mounted(){
        this.getNewsDetail(Number(this.$route.params.id))
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
    }
}
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
                &:before,&:after{
                    content: '';
                    width: 30px;
                    height: 30px;
                    display: inline-block;
                }
                &:before{
                    background: url(../../assets/img/right_f.png) no-repeat;
                    background-size: contain; 
                    margin: 0 15px 0 0;
                }
                &:after{
                    background: url(../../assets/img/left_f.png) no-repeat;
                    background-size: contain; 
                    margin: 0 0 0 15px;
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
                    .top{
                        float: left;
                    }
                    .bottom{
                        float: right;
                        text-align: right;
                    }
                    .index{
                        cursor: pointer;
                        &:hover{
                            text-decoration:underline;
                        }
                    }
                }
            }
        }
    }
</style>


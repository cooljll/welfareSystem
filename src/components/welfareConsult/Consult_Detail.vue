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
                                {{newsDetailContent.fuliinfoTitle}}
                                <i class="iconfont icon-rightIcon"></i>
                            </div>
                            <div class="content" v-html="newsDetailContent.information"></div>
                            <!-- 新闻索引 -->
                            <div class="bottom">
                                <div class="look-else">
                                    <p class="top" v-show="isShowPrev">
                                        <span>上一篇</span>
                                        <br>
                                        <span class="index" @click="newsDetails(prevNews.categoryid,prevNews.id)">{{prevNews.fuliinfoTitle}}</span>
                                    </p>
                                    <p class="bottom" v-show="isShowNext">
                                        <span>下一篇</span>
                                        <br>
                                        <span class="index" @click="newsDetails(nextNews.categoryid,nextNews.id)">{{nextNews.fuliinfoTitle}}</span>
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
                        <div class="hot_item" v-for="(item,index) in hotNewsList" :key="index" @click="newsDetails(item.categoryid,item.id)">
                            <div class="imgbox">
                                <img :src="item.imagepath" alt="">
                            </div>
                            <div class="item_info">
                                <p class="thide">{{item.fuliinfoTitle}}</p>
                                <div class="time"><span>{{item.inputtime.split(" ")[0]}}</span></div>
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
        getNewsDetail(cId,id){
            this.$axios.get("/api/api/welfareNews/newsInfo",{params:{
                categoryId:cId,
                fuliInformationId:id
            }}).then(res=>{
                if(res.data.code==0){
                    var newData=res.data.data
                    if(newData.length==1){
                        this.isShowPrev=false
                        this.isShowNext=false
                        this.newsDetailContent=newData[0]
                    }else if(newData.length==2){
                        if(newData[0].id==id){//下一篇
                            this.isShowPrev=false
                            this.isShowNext=true
                            this.newsDetailContent=newData[0]
                            this.nextNews=newData[1]
                        }else{//上一篇
                            this.isShowPrev=true
                            this.isShowNext=false
                            this.newsDetailContent=newData[0]
                            this.prevNews=newData[1]
                        }
                    }else{
                        this.isShowPrev=true
                        this.isShowNext=true
                        this.newsDetailContent=newData[0]
                        this.prevNews=newData[1]
                        this.nextNews=newData[2]
                    }
                }
            })
        },
        newsDetails(cId,id){
            this.getNewsDetail(cId,id)
        }
    },
    mounted(){
        this.getNewsDetail(this.$route.params.cId,this.$route.params.id)
        this.$axios.post("/api/api/welfareNews/newsPageInfo",{
            pageNum:1,
            pageSize:3
        }).then(res=>{
            if(res.data.code==0){
                this.hotNewsList=res.data.data
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


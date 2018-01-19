<template>
    <div class="page-wrapper">
        <div class="wrapper-title">
            <span class="line"></span>
            <span class="title">系统通知</span>
        </div>
        <div class="wrapper-center">
            <div class="noticeLine"></div>
            <div class="noticeblock">
                <div class="notice" v-for="(item,index) in noticeList" :key="index">
                    <div class="notifileft">
                        <span class="year yearcolor1">2017</span>
                    </div>
                    <div class="ballbox">
                        <span class="ball yearcolor1"></span>
                    </div>
                    <div class="hornbox"><span class="horn">&nbsp;</span></div>
                    <div class="noticecenter">
                        <div class="noticetitle">
                            <span class="noticename">{{item.title}}</span>
                            <span class="noticetime">{{item.startDate.split(" ")[0]}}</span>
                        </div>
                        <a class="noticeimg">
                            <img :src="item.coverUrl">
                        </a>
                    </div>
                </div>
                <div class="notice">
                    <div class="notifileft"></div>
                    <div class="ballbox"></div>
                    <div class="hornbox"></div>
                    <div class="noticecenter">
                        <div class="noticetitle">
                            <span class="nonotice">没有更多通知</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import authUnils from '../../common/authUnils'
var root = process.env.API_ROOT
export default{
    data(){
        return{
            noticeParams:{
                pageNum:1,
                pageSize:10
            },
            noticeList:[]
        }
    },
    methods:{
        getNoticeList(){
            this.$axios.post(root+"service/systemNoticeList",this.noticeParams).then(res=>{
                if(res.data.code==1000){
                    this.noticeList=res.data.data.content
                }
            })
        }
    },
    mounted(){
        this.getNoticeList()
    },
    watch:{
		'$route'(to, from) {
			if(to.params.timeStamp!=from.params.timeStamp){
                this.$router.push('/Empty')
                this.$router.go(-1)
            }
		}
	}
}
</script>
<style lang="scss" scoped>
    .page-wrapper{
        background: #fff;
        .wrapper-center{
            width: 1200px;
            margin: 0px auto;
            position: relative;
            .noticeLine{
                border-left: 1px solid #666666;
                height: 100%;
                position: absolute;
                margin-left: 239px;
                z-index: 1;
            }
            .noticeblock{
                .notice{
                    width: 100%;
                    margin-top: 20px;
                    margin-bottom: 50px;
                    position: relative;
                    z-index: 2;
                    overflow: hidden;
                    .notifileft{
                        float: left;
                        width: 229px;
                        margin-top: 16px;
                        .year{
                            display: inline-block;
                            width: 146px;
                            height: 50px;
                            line-height: 50px;
                            text-align: center;
                            border-radius: 3px;
                            font-size: 36px;
                            color: #ffffff;
                            margin-left: 50px;
                        }
                    }
                    .ballbox{
                        float: left;
                        height: 21px;
                        width: 21px;
                        margin-top: 30px;
                        margin-right: 24px;
                        .ball{
                            float: left;
                            border-radius: 50px;
                            height: 21px;
                            width: 21px;
                        }
                    }
                    .yearcolor1{
                        background: #4dbe0d;
                    }
                    .hornbox{
                        float: left;
                        margin-top: 20px;
                        width: 36px;
                        height: 40px;
                        .horn{
                            float: left;
                            height: 0px;
                            width: 0px;
                            border-right: 36px solid #F9F9F9;
                            border-top: 20px solid #FFFFFF;
                            border-left: 0px solid #FFFFFF;
                            border-bottom: 20px solid #FFFFFF;
                        }
                    }
                    .noticecenter{
                        float: left;
                        width: 778px;
                        padding: 30px;
                        background: #F9F9F9;
                        .noticetitle{
                            overflow: hidden;
                            .noticename{
                                float: left;
                                font-size: 26px;
                                color: #666666;
                            }
                            .noticetime{
                                float: right;
                                font-size: 26px;
                                color: #666666;
                            }
                            .nonotice{
                                float: left;
                                width: 100%;
                                text-align: center;
                                font-size: 26px;
                                color: #666666;
                            }
                        }
                        .noticeimg{
                            cursor: pointer;
                            img{
                                margin-top: 30px;
                                cursor: pointer;
                                width: 780px;
                                height: 360px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>


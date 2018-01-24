<template>
    <div class="page-main">
        <div class="big-title">
            尊敬的<span class="entername">{{enterpriseName}}</span>，您好！
        </div>
        <div class="small-title">
            您的企业是我们公司的优质客户，享受以下服务权益
        </div>
        <div class="servicelist">
            <div class="service">
                <img src="../../assets/img/zskf.png">
                <div>专属服务</div>
            </div>
            <div class="service unactive">
                <img src="../../assets/img/jqqd.png">
                <div>尽请期待</div>
            </div>
        </div>
        <div class="content">
            <span class="out"></span>
            <span class="iner"></span>
            <div class="serviceinnerbox">
                <div class="topbox">
                    <img src="../../assets/img/touxiang.png">
                    <div class="introducename">HI，我是 吴磊</div>
                    <div class="introducetitle">你的专属管家</div>
                    <div class="introducecontent">善解人意的贴心小棉袄，账户安全护航者</div>
                </div>
                <div class="bottombox">
                    <div class="informationtitle">我的联系方式：</div>
                    <div class="informationcontent">手机: 18721478869</div>
                    <div class="informationcontent">电话: 021-54653958</div>
                    <div class="informationcontent">邮箱: hz@youmina.com</div>
                    <div class="informationcontent">地址: 上海市徐汇区桂平路418号A区703室</div>
                </div>
            </div>
        </div>
        <div class="callcenter kefuline">
            <img src="../../assets/img/zxkf.png">
            <div>在线客服</div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            enterpriseName:''
        }
    },
    mounted(){
        this.enterpriseName=JSON.parse(localStorage.enterpriseInfo).enterpriseName
    }
}
</script>
<style lang="scss" scoped>
    .big-title{
        text-align: center;
        font-size: 20px;
        margin-top: 40px;
        margin-bottom: 20px;
        .entername{
            font-size: 20px;
            color: #009DF6;
        }
    }
    .small-title{
        text-align: center;
        font-size: 16px;
        margin-bottom: 30px;
        color: #999999;
    }
    .servicelist{
        text-align: center;
        .service{
            display: inline-block;
            margin-right: 80px;
            cursor: pointer;
            img{
                width: 60px;
                height: 60px;
                border: 0px;
                cursor: pointer;
                display: block;
                margin: 0px auto 15px;
            }
            div{
                font-size: 16px;
                cursor: pointer;
                text-align: center;
            }
        }
    }
    .content{
        text-indent: 2em;
        box-shadow: 0px 0px 0px #999;
        padding: 0px 50px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 5px;
        width: 720px;
        position: relative;
        margin: 20px auto;
        border: 1px solid #CCC;
        overflow: visible;
        span{
            position: absolute;
            left: 326px;
            height: 0px;
            width: 0px;
        }
        .out{
            line-height: 0;
            border-width: 10px;
            border-color: transparent transparent #CCC transparent;
            border-style: dashed dashed solid dashed;
            top: -20px;
        }
        .iner{
            border-width: 10px;
            border-color: #fff transparent #FFF transparent;
            border-style: dashed dashed solid dashed;
            top: -19px;
            line-height: 0;
        }
        .serviceinnerbox{
            .topbox{
                padding: 20px 0px;
                border-bottom: 1px dashed #000000;
                overflow: hidden;
                img{
                    float: right;
                    height: 140px;
                    width: 140px;
                }
                .introducename{
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .introducetitle{
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .introducecontent{
                    font-size: 16px;
                    color: #999999;
                }
            }
            .bottombox{
                padding: 20px 0px;
                .informationtitle{
                    font-size: 20px;
                    margin-bottom: 15px;
                }
                .informationcontent{
                    font-size: 16px;
                    margin-bottom: 5px;
                }
            }
        }
    }
    .callcenter{
        position: absolute;
        right: 15%;
        top: 80px;
        cursor: pointer;
        img{
            cursor: pointer;
            display: block;
            height: 60px;
            width: 60px;
            margin: 0px auto;
        }
        div{
            font-size: 16px;
            cursor: pointer;
            text-align: center;
        }
    }
</style>


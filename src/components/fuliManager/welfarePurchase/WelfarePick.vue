<template>
    <div>
        <div class="page-title">{{$route.name}}</div>
        <div class="page-center">
            <div class="welfare-wrapper">
                <img src="../../../assets/img/youmina.png" style="width: 100%;height: auto">
                <a href="javascript:;" @click="gotoShop">前往商城</a>
            </div>
        </div>
    </div>
</template>
<script>
import authUnils from '../../../common/authUnils'
var root = process.env.API_ROOT
export default{
    methods:{
        gotoShop(){
            // window.open("http://www.youmina.com/")
            this.$axios.get(root+"purchase/welLogin").then(res=>{
                if(res){
                    const div = document.createElement('div') // 创建div
                    div.innerHTML = res.data // 将返回的form 放入div
                    document.body.appendChild(div)
                    document.forms['shopLogin'].submit()
                }
            })
        }
    }
} 
</script>
<style lang="scss" scoped>
    .page-center{
        padding:44px 0;
        .welfare-wrapper{
            width: 95%;
            margin: 0 auto;
            position: relative;
            background-size: 100% 100%;
            img{
                border: 0px;
                width: 100%;
                height: auto;
            }
            a{
                display: block;
                width: 154px;
                height: 40px;
                line-height: 40px;
                position: absolute;
                z-index: 2;
                bottom: 29%;
                left: 50%;
                margin-left: -73px;
                background: #fedc18;
                box-shadow: 0 2px 20px 0 rgba(86, 86, 86, 0.25);
                border-radius: 3px;
                font-size: 16px;
                text-align: center;
                color: #f55287;
                cursor: pointer;
            }
        }
    }
</style>
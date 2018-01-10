// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import './styles/vars.scss'
import authUtil from './common/authUnils'
import router from './router'
import store from './vuex/store'
import echarts from 'echarts/dist/echarts.min'
Vue.prototype.$echarts=echarts      
import axios from 'axios' 
axios.defaults.withCredentials=true //允许跨域携带cookie信息
Vue.prototype.$axios=axios                    
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
// 请求拦截器
axios.interceptors.request.use(
  config => {
    if(authUtil.getToken()){ // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
       config.headers.Authorization = authUtil.getToken()
    }else{
        router.replace({
            path: '/'
        })
    }
    return config
  },
  err => {
      return Promise.reject(err)
  })
// 响应拦截器
axios.interceptors.response.use(
  response => {
    switch(response.data.code){
        // case 2001:
        //     ElementUI.MessageBox.alert(response.data.message,"信息")
        //     // authUtil.removeToken()
        //     localStorage.removeItem("enterpriseInfo")
        //     localStorage.removeItem("loginName")
        //     router.replace({
        //         path: '/'
        //     })
        //     break
    }
    return response
  },
  error => {
    if (error.response) {
        switch (error.response.status) {
            case 401: 
                authUtil.removeToken()// 返回 401 清除token信息并跳转到登录页面
                localStorage.removeItem("enterpriseInfo")
                localStorage.removeItem("loginName")
                router.replace({
                    path: '/'
                })
                break
            case 500:
                ElementUI.MessageBox.alert("服务器内部错误","信息")
                authUtil.removeToken()
                localStorage.removeItem("enterpriseInfo")
                localStorage.removeItem("loginName")
                router.replace({
                    path: '/'
                })
                break
            case 510:
                ElementUI.MessageBox.alert("参数错误","信息")
                break
        }
    }
      return Promise.reject(error.response)   // 返回接口返回的错误信息
  }
)
//路由拦截
router.beforeEach((to, from, next) => {
    if(to.path=="/"){
        localStorage.removeItem("enterpriseInfo")
        localStorage.removeItem("loginName")
        authUtil.delCookie("accessToken")
    }
    let token=authUtil.getToken()
    if (token==null && to.path !== '/') {
        authUtil.removeToken()
        localStorage.removeItem("enterpriseInfo")
        localStorage.removeItem("loginName")
        authUtil.delCookie("accessToken")
        next({ path: '/' })
    } else {
        next()
    }
})

//监视浏览器的关闭或刷新
// window.onbeforeunload = function (e) {
//     e = e || window.event
//     var y = e.clientY
//     if (y <= 0//点击浏览器或者选项卡的关闭按钮
//     || y >= Math.max(document.body ? document.body.clientHeight : 0, document.documentElement ? document.documentElement.clientHeight : 0)//点击任务栏的关闭按钮
//     ) {
//         //IE 和 Firefox 
//         e.returnValue = "确定要刷新或关闭浏览器窗口？"
//     }
//     //谷歌
//     return "确定要刷新或关闭浏览器窗口？"
// }

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

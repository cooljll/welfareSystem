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
import $ from 'jquery'
import './assets/script/jquery.jqprint-0.3'

Vue.prototype.$echarts=echarts      
import axios from 'axios' 
axios.defaults.withCredentials=true //允许跨域携带cookie信息
// axios.defaults.headers.common['Authorization'] = authUtil.getToken()//设置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios=axios                    
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
// 请求拦截器
axios.interceptors.request.use(
  config => {
    if(authUtil.getToken()){ // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
       config.headers.Authorization = authUtil.getToken()
        // config.headers.Authorization = this.$store.state.token
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
    }
    let token=authUtil.getToken()
    if (token==null && to.path !== '/') {
        authUtil.removeToken()
        localStorage.removeItem("enterpriseInfo")
        localStorage.removeItem("loginName")
        next({ path: '/' })
    } else {
        next()
    }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

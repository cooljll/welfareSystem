//文件都会汇聚到这个地方来，也是创建store对象的地方，就像store的入口一样
import Vue from 'vue'
import Vuex from 'vuex'
import authUnils from "../common/authUnils"
Vue.use(Vuex)
const state={
  flag:false,
  token:null
}
const getters={
  getFlag:state=>{
    return state.flag
  },
  //获取token
  getToken:state=>{
    return state.token
  }
}
const mutations={
  reLoad(state){
    state.flag=true
  },
  notReLoad(state){
    state.flag=false
  },
  //设置token
  setToken(state,payload){
    state.token=payload
  }
}
const actions={
  reLoad(context){
    context.commit('reLoad')
  },
  notReLoad(context){
    context.commit('notReLoad')
  }
}
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
export default store
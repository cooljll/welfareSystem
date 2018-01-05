//文件都会汇聚到这个地方来，也是创建store对象的地方，就像store的入口一样
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex)
const state={
  flag:false
}
const mutations={
  reLoad(state){
    state.flag=true
  },
  notReLoad(state){
    state.flag=false
  }
}
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
export default store
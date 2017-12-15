import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
//员工管理
import EmpIndex from '@/components/employeeManager/EmpIndex'
import EnterpriseOverview from '@/components/employeeManager/EnterpriseOverview'
import Enterprise from '@/components/employeeManager/Enterprise'
// 福利管理
import WelfareIndex from '@/components/fuliManager/WelfareIndex'
import WelfareOverview from '@/components/fuliManager/WelfareOverview' 
// 充值管理
import CreditRecharge from '@/components/fuliManager/rechargeManage/CreditRecharge' 
import OrderRecharge from '@/components/fuliManager/rechargeManage/OrderRecharge'
import WechatRecharge from '@/components/fuliManager/rechargeManage/WechatRecharge' 
//积分管理
import CreditExtend from '@/components/fuliManager/creditManage/CreditExtend' 
import CreditExtend_Excel from '@/components/fuliManager/creditManage/CreditExtend_Excel'
import CreditExtend_Order from '@/components/fuliManager/creditManage/CreditExtend_Order'
// 福利发放
import WelfareRollExtend from '@/components/fuliManager/welfareExtend/WelfareRollExtend'
import WelfareRollOrder from '@/components/fuliManager/welfareExtend/WelfareRollOrder'
// 福利采购
import WelfarePick from '@/components/fuliManager/welfarePurchase/WelfarePick'
import PurchaseOrder from '@/components/fuliManager/welfarePurchase/PurchaseOrder'
// 数据报告
import WelfareData from '@/components/fuliManager/dataReport/WelfareData'
import WelfareReport from '@/components/fuliManager/dataReport/WelfareReport'
// 信用卡还款
import CreditcardpayIndex from '@/components/fuliManager/creditCard/CreditcardpayIndex' 
import CreditcardpayRecord from '@/components/fuliManager/creditCard/CreditcardpayRecord'
import CreditcardpayQueue from '@/components/fuliManager/creditCard/CreditcardpayQueue'
// 福利咨询
import ConsultIndex from '@/components/welfareConsult/ConsultIndex'
import Consult_Detail from '@/components/welfareConsult/Consult_Detail'
import Consult_List from '@/components/welfareConsult/Consult_List'
// 企业信息管理
import EnterpriseInfo from '@/components/enterpriseManager/EnterpriseInfo'
import EnterpriseNotice from '@/components/enterpriseManager/EnterpriseNotice'
import SystemInform from '@/components/enterpriseManager/SystemInform'
import AuthManager from '@/components/enterpriseManager/AuthManager'
import Log from '@/components/enterpriseManager/Log'
//商城帮助中心
import HelpCenter from '@/components/mallHelper/HelpCenter'
import FeedBack from '@/components/mallHelper/FeedBack'
import Requirement from '@/components/mallHelper/Requirement'
//客服
import SpecialTeam from '@/components/mallHelper/SpecialTeam'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/EmpIndex',
      name: '',
      component: EmpIndex,
      leaf: true,//只有一个节点    
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },    
      children: [
          { path: '/EnterpriseOverview', component: EnterpriseOverview, name: '' },
          { path: '/Enterprise/:currentVal?/:id?/:depId?', component: Enterprise, name: '' }
      ]
    },
    {
      path: '/WelfareIndex',
      component: WelfareIndex,
      name: '',
      leaf: true,//只有一个节点
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },         
      children: [
          { path: '/WelfareOverview', component: WelfareOverview, name: '福利总览' },
          { path: '/CreditRecharge/:count?', component: CreditRecharge, name: '积分充值' },
          { path: '/WechatRecharge', component: WechatRecharge, name: '积分充值 ' },
          { path: '/OrderRecharge', component: OrderRecharge, name: '订单充值' },
          { path: '/CreditExtend', component: CreditExtend, name: '积分发放' },
          { path: '/CreditExtend_Excel', component: CreditExtend_Excel, name: 'Excel积分发放' },
          { path: '/CreditExtend_Order', component: CreditExtend_Order, name: '积分发放订单' },
          { path: '/WelfareRollExtend', component: WelfareRollExtend, name: '福利卷发放' },
          { path: '/WelfareRollOrder', component: WelfareRollOrder, name: '福利卷订单' },
          { path: '/WelfarePick', component: WelfarePick, name: '福利挑选' },
          { path: '/PurchaseOrder', component: PurchaseOrder, name: '采购订单' },
          { path: '/WelfareData', component: WelfareData, name: '福利数据' },
          { path: '/WelfareReport', component: WelfareReport, name: '福利报告' },
          { path: '/CreditcardpayIndex', component: CreditcardpayIndex, name: '信用卡还款首页' },
          { path: '/CreditcardpayRecord', component: CreditcardpayRecord, name: '信用卡还款记录' },
          { path: '/CreditcardpayQueue', component: CreditcardpayQueue, name: '信用卡还款队列' }

      ]
    },
    //福利资讯
    {
      path: '/ConsultIndex',
      component: ConsultIndex,
      name: ''
    },
    {
      path: '/Consult_Detail/:cId?/:id?',
      component: Consult_Detail,
      name: ''
    },
    {
      path: '/Consult_List/:ret?',
      component: Consult_List,
      name: ''
    },
    //企业信息
    {
      path: '/EnterpriseInfo',
      component: EnterpriseInfo,
      name: ''
    },
    {
      path: '/EnterpriseNotice',
      component: EnterpriseNotice,
      name: '',
      leaf: true,//只有一个节点        
      children: [
          { path: '/EnterpriseNotice/:flag?', component: EnterpriseNotice, name: '' }
      ]
    },
    {
      path: '/SystemInform',
      component: SystemInform,
      name: ''
    },
    {
      path: '/AuthManager',
      component: AuthManager,
      name: ''
    },
    {
      path: '/Log',
      component: Log,
      name: ''
    },
    //商城帮助中心
    {
      path: '/HelpCenter',
      component: HelpCenter,
      name: ''
    },
    {
      path: '/FeedBack',
      component: FeedBack,
      name: ''
    },
    {
      path: '/Requirement',
      component: Requirement,
      name: ''
    },
    //专属客服
    {
      path: '/SpecialTeam',
      component: SpecialTeam,
      name: ''
    },
  ]
})

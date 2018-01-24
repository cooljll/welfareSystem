import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Empty from '@/components/Empty'//空白模板
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
// 福利咨询
import ConsultIndex from '@/components/welfareConsult/ConsultIndex'
import Consult_Detail from '@/components/welfareConsult/Consult_Detail'
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
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Empty',
      name: 'Empty',
      component: Empty,
      children: [
        { 
          path: '/EmpIndex', 
          component: EmpIndex, 
          name: '',
          leaf: true,//只有一个节点       
          children: [
              { path: '/EnterpriseOverview', component: EnterpriseOverview, name: '' },
              { path: '/Enterprise/:currentVal?/:level?/:depId?/:timeStamp?', component: Enterprise, name: '' }
          ]
        },
        { 
          path: '/WelfareIndex',
          component: WelfareIndex, 
          name: '',
          leaf: true,//只有一个节点        
          children: [
              { path: '/WelfareOverview', component: WelfareOverview, name: '福利总览' },
              { path: '/CreditRecharge/:count?', component: CreditRecharge, name: '积分充值' },
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
              { path: '/CreditcardpayRecord', component: CreditcardpayRecord, name: '信用卡还款记录' }
          ]
        },
        {
          path: '/ConsultIndex/:flag?',//1代表列表  2或空代表首页
          component: ConsultIndex,
          name: ''
        },
        {
          path: '/Consult_Detail/:id?',
          component: Consult_Detail,
          name: ''
        },
        //企业信息
        {
          path: '/EnterpriseInfo/:timeStamp?',
          component: EnterpriseInfo,
          name: ''
        },
        {
          path: '/EnterpriseNotice',
          component: EnterpriseNotice,
          name: '',
          leaf: true,//只有一个节点        
          children: [
              { path: '/EnterpriseNotice/:flag?/:timeStamp?', component: EnterpriseNotice, name: '' }
          ]
        },
        {
          path: '/SystemInform/:timeStamp?',
          component: SystemInform,
          name: ''
        },
        {
          path: '/AuthManager/:timeStamp?',
          component: AuthManager,
          name: ''
        },
        {
          path: '/Log/:timeStamp?',
          component: Log,
          name: ''
        },
        //商城帮助中心
        {
          path: '/HelpCenter/:timeStamp?',
          component: HelpCenter,
          name: ''
        },
        {
          path: '/FeedBack/:timeStamp?',
          component: FeedBack,
          name: ''
        },
        {
          path: '/Requirement/:timeStamp?',
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
    }
  ]
})

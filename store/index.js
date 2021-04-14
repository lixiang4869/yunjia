import Vue from 'vue'
import Vuex from 'vuex'
// import find from '../find.js';
Vue.use(Vuex);
const store = new Vuex.Store({
 // modules:{//
 //  find
 // },
 state:{
	 
	   url:"https://test.aiznkj.net",
  // url:"https://xin.yiyunoto.com",
  cdzurl:"https://server.cclaidian.com/zscanServcc/powerapp",//充电桩
  imgurl:"https://xin.yiyunoto.com",
  wuyeurl:"https://wuye.yiyunoto.com",
  scoketurl_wuye:'wss://wuye.yiyunoto.com/wss',
  scoketurl_video:'wss://videos.yiyunoto.com/wss',
  cityUrl:"https://city.yiyunoto.com/",
  
  // cityUrl:"https://city.aiznkj.net",
	
  homeProduct:{},
  userInfor:null,
 },
 mutations:{
  // home-index页面   商家详情
  changeHomeProduct(state,product){
   state.homeProduct.merchant = product;//从home首页点击进入的商家
  },
  changeUserInfor(state,Infor){
  	state.userInfor = Infor
  }
 },
 actions:{}
})
export default store;
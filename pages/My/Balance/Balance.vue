<template>
	<view class="container" :style="{width:width+'px',height:height+'px'}">
		<view class="top">
		<view class="topBox">
			<text class="priceHint">可提现余额（元）</text>
			<text class="priceNum">{{money.cancash}}</text>
			<text class="wyTxt" >已提现总额:{{money.hascash}}</text>
			<view class="btnBox">
				<text class="btn" @click="chongzhi">充值</text>
				<text class="btn" @click="tixian">提现</text>
			</view>
		</view>
		</view>
		<view class="advertisingBox">
			<view style="display: flex;flex-direction: column;align-items: center;justify-content: center;flex: 1;">
				<view 	style="font-size: 30rpx; color: #666;">期权</view>
				<view  style="font-size: 36rpx; color: #333;font-weight: bold;">{{money.stock_option}}</view>
			</view>
			<view style="flex: 1; display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<view 	style="font-size: 30rpx; color: #666;">积分</view>
				<view  style="font-size: 36rpx; color: #333;font-weight: bold;">{{money.fund}}</view>
			</view>
		</view>
		<view class="detailNav">
			<view class="navBtn" @click="changeDetail(0)">
				<text class="detailName">钱包明细</text>
				<view class="linear" :class="action==0?'actionLinear':''"></view>
			</view>
			<view class="navBtn" @click="changeDetail(1)">
				<text class="detailName">积分明细</text>
				<view class="linear" :class="action==1?'actionLinear':''"></view>
			</view>
		</view>
		<swiper class="detailSwiper" @change="changeSwiper" :indicator-dots="false" :current="action" :autoplay="false" :duration="100">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" :upper-threshold="100" @scrolltoupper="pullDownRefresh" :lower-threshold="100" @scrolltolower="reachBottom" style="width: 100%;height: 100%;" :scroll-y="true" >
					<view class="itemBox" v-for="(item,index) in chatList" :key="index">
						<view class="leftBox">
							<text class="title">{{item.name}}</text>
							<!-- <text class="hint">{{item.name}}</text> -->
						</view>
						<view class="rightBox">
							<text class="detailPrice">{{item.change}}</text>
							<text class="time">{{item.addtime}}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" :upper-threshold="100" @scrolltoupper="pullDownRefresh" :lower-threshold="100" @scrolltolower="reachBottom" style="width: 100%;height: 100%;" :scroll-y="true" >
					<view class="itemBox" v-for="(item,index) in chatList" :key="index">
						<view class="leftBox">
							<text class="title">{{item.name}}</text>
							<!-- <text class="hint">{{item.name}}</text> -->
						</view>
						<view class="rightBox">
							<text class="detailPrice">{{item.change}}</text>
							<text class="time">{{item.addtime}}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import request from '../../../store/http.js';
	export default {
		data() {
			return {
				jifen:'0.0',
				width:'',
				height:'',
				show:false,
				url:this.$store.state.url,
				money:"",
				action:0,
				chatList:[],
				page:1,
				loadingType:0,
				isnotempty: false,
				timer:null
			}
		},
		onLoad() {
			let {windowWidth,windowHeight} = uni.getSystemInfoSync();
			this.width = windowWidth;
			this.height = windowHeight;
			this.consumeList(this.action)
		},
		onShow() {
			/* 隐藏凸起图标 */
			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			setTimeout(function() {
				if(icon)
				icon.hide();
			}, 100);
			// #endif
			this.getBalance();
		},
		methods: {
			/* 跳转充值页面 */
			chongzhi:function(){
				uni.showToast({
					title:"暂不开放",icon:"none"
				})
				// uni.navigateTo({
				// 	url:"../Cash/CashResult"
				// })
				// uni.navigateTo({
				//       url: '/pages/My/Charge/Charge'
				// })
			},
			/* 跳转提现页面 */
			tixian:function(){
				uni.navigateTo({
				      url: '/pages/My/Cash/Cash'
				})
			
			},
			/* 消费情况 */
			consumption:function(ev){
				var num = ev
				uni.navigateTo({
					  url: '/pages/My/Consumption-situation/Consumption-situation?num=' + num
				})
				
			},
			// 获取余额信息
			getBalance(){
				uni.showLoading({
					
				})
				let authtoken = uni.getStorageSync("authtoken");
				console.log('authtoken',authtoken)
				request.urlRequest(
					this.url + '/api/member/memassets',
					{},
					{authtoken: authtoken},
					'POST',
					res => {
						uni.hideLoading()
						if(res.data.code==1){
							this.money = res.data.data;
							this.show=true
						}
						
					}
				);
			},
			// 下拉刷新
			pullDownRefresh(){
				this.page=1,
				this.consumeList(this.action)
			},
			// 上拉加载更多
			reachBottom(){
				if(this.timer != null){
				 clearTimeout(this.timer);
				}
				this.page++;
				if (this.loadingType != 0) { // loadingType!=0;直接返回
				    return false;
				}
				this.loadingType = 1;
				uni.showNavigationBarLoading();// 显示加载动画
				this.timer = setTimeout(()=>{this.getMore()},500);
				// this.getMore()
			},
			// 加载更多
			getMore(){
				let authtoken = uni.getStorageSync("authtoken");
				
				var requestUrl;
				if(this.action==1){
					 requestUrl = this.url + '/api/member/memFundLog';
				}
				else
				requestUrl = this.url + '/api/member/memassetslog';
				request.urlRequest(
					requestUrl,
					{page:this.page},
					{authtoken: authtoken},
					'POST',
					res => {
						if(this.page<res.data.data.last_page){
							this.loadingType=0
						}else this.loadingType=2
						  uni.hideNavigationBarLoading()
						this.chatList= this.chatList.concat(res.data.data.data);
						
					}
				);
			},
			// 获取记录
			consumeList(i){
				let authtoken = uni.getStorageSync("authtoken");
				var requestUrl;
				if(i==1){
					 requestUrl = this.url + '/api/member/memFundLog';
				}
				else
				 requestUrl = this.url + '/api/member/memassetslog';
				 console.log(requestUrl);
				request.urlRequest(
					requestUrl,
					{page:this.page},
					{authtoken: authtoken},
					'POST',
					res => {
						if(this.page<res.data.data.last_page){
							this.loadingType=0
						}else this.loadingType=2
						this.chatList= res.data.data.data;
						
						if(this.chatList.length>0)this.isnotempty=true;
					}
				);
				
			},
			// 切换swiper
			changeDetail(i){
				this.action = i;
			},
			// 滑动swiper
			changeSwiper(e){
				this.action = e.detail.current;
			}
		},
		watch:{
			// 监听swiper切换
			action:function (newVal,oldVal){
				this.page = 1;
				this.consumeList(newVal)
			}
		}
	}
</script>

<style>
	page{
		background: #f2f3f4;
	}
/* .container{
	background: linear-gradient(to bottom, #E83E25 30%, #FFFFFF 28%);
	padding: 20rpx;
	box-sizing: border-box;
} */
.top{
	width: 100%;
	height: 467rpx;
	background: linear-gradient(180deg, #E64532 0%, #E64532 59%, #FCFDFD 100%);
	justify-content: center;
	align-items: center;
	display: flex;
}
.topBox{
	width: 700rpx;
	height: 410rpx;
	background-color: #FFFFFF;
	
	border-radius: 20rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	padding: 20rpx 40rpx;
	box-sizing: border-box;
}
.priceBox{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 40%;width: 100%;
}
.priceHint{
	font-size: 30rpx;
	color: #333333;
}
.priceNum{
	font-size: 72rpx;
	color: #333;
	font-weight: bold;
}
.btnsBox{
	width: 100%;
	height: 60%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.wyPriceBox{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.wyBox{
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
}
.wyTxt{
	font-size: 30rpx;
	color: #333;
}
.wyPrice{
	font-size: 50rpx;
	font-weight: 700;
}
.btnBox{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.btn{
	font-size: 34rpx;
	color: #ff4444;
	padding: 20rpx 110rpx;
	background-color: #ffebeb;
	border-radius: 10rpx;
}
.btn:last-child{
	background-color: #ff4444;
	color: #fffefe;
}
.advertisingBox{
	border-top: 16rpx solid #f2f3f4;
	width: 100%;
	height: 150rpx;
	display: flex;
	flex-direction: row;
		border-bottom: 16rpx solid #f2f3f4;
}
.advertisingTitle{
	font-size: 40rpx;
	color: #333333;
	font-weight: 700;
}
.advertisingItem{
	width: 100%;
	height: 171rpx;
	margin-top: 30rpx;
	background-color: #fffaf0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
	box-sizing: border-box;
	border-radius: 20rpx;
}
.advertisingTxt{
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
}
.advertisingHint{
	font-size: 32rpx;
	color: #333333;
}
.advertisingRight{
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
}
.advertisingPrice{
	font-size: 30rpx;
	color: #f1973c;
	font-weight: 600;
}
.detailNav{
	width: 100%;
	height: 100rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.navBtn{
	width: 50%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.detailName{
	font-size: 36rpx;
	color: #333333;
	font-weight: 700;
}
.linear{
	width: 0rpx;
	height: 10rpx;
	background-color: #ff4444;
	border-radius: 5rpx;
}
.actionLinear{
	width: 60rpx;
}
.detailSwiper{
	width: 94%;
	height: 60%;
	margin: 0 auto;
}
.swiper-item{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
.itemBox{
	width: 100%;
	height: 20%;
	padding-bottom: 20rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	border-bottom: 1rpx solid #F4F4F4;
}
.leftBox{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
}
.title{
	font-size: 34rpx;
	font-weight: 700;
	color: #333333;
	word-break: break-word; //换行模式
	overflow: hidden;
	text-overflow: ellipsis; //修剪文字
	display: -webkit-box;
	-webkit-line-clamp: 2; //此处为上限行数
	-webkit-box-orient: vertical;
}
.hint{
	font-size: 30rpx;
	color: #999999;
}
.rightBox{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
.detailPrice{
	font-size: 45rpx;
	font-weight: 700;
	color: #ff4444;
}
.time{
	color: #999999;
	/* margin-top: 20rpx; */
}
</style>

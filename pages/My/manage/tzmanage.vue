<template>
	<view class="quan">
		<!-- 头部 -->
			<view class="bg">
				
			</view>
		

			<view class="top">
				<view class="top1" @click="gorecord">
					<text class="t1">成功提现佣金</text>
					<view >
						<text class="fuhao">￥</text>
					<text class="t2">{{today}}</text>
					</view>
					<text class="t3">查看明细</text>
				</view>
				
			<view class="top2"  @click="goYuE">
				<text class="t1">余额</text>
				<view >
					<text class="fuhao">￥</text>
				<text class="t2">{{money}}</text>
				</view>
				<text class="t3">查看明细</text>
			</view>
			</view>
		
			<view class="zui" @click="goOrder" >
				<image src="https://xin.yiyunoto.com/uploads/static/img/order.png" class="logo">
				<text class="edu">订单管理</text>
				
				<image src="../../../static/home/right.png" class="right">
			</view>
			<!-- <view class="zui2"  >
			<image src="../../../static/my/yaoqing.png" class="logo">
			<text class="edu">我的推荐</text>
			
			<image src="../../../static/set/right.png" class="right">
			</view> -->
			<view class="zui2" @click="tixian" >
			<image src="../../../static/my/tixian.png" class="logo">
			<text class="edu">立刻提现</text>
			
			<image src="../../../static/home/right.png" class="right">
			</view>
	</view>

</template>
<script>
	import request from '../../../store/http.js'
	export default {

		data() {
			return {
				count:'0',
				money:"0.0",
				today:"0.0",
				url: this.$store.state.url,

			};
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
		},
		onLoad() {
			this.getdata();
		},
		methods: {
			getdata(){
				
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(this.url+"/api/Leader/leaderInfo",{},{authtoken: authtoken},"POST",res=>{
					if(res.data.code==1){
						this.money = res.data.data.balance;
						// this.count = res.data.data.order_count;
						this.today =  res.data.data.cashout;
					}else{
						uni.showToast({
							title:res.data.msg,icon:"none"
						})
					}
					
				})
			},
			goOrder(){
				uni.navigateTo({
					url:"./tzmanageorder"
				})
			},
			goYuE(){
				uni.navigateTo({
					url:"../Consumption-situation/Consumption-situation"
				})
			},
			gorecord(){
			uni.navigateTo({
			      url: './tztixianrecord'
			})	
			},
			
			/* 跳转提现页面 */
			tixian:function(){
				uni.navigateTo({
				      url: './Cash'
				})
				
			},
			},
			
	};
</script>

<style lang="scss">
	.bg{
		width: 100%;
		border-bottom-left-radius: 50%;
		border-bottom-right-radius: 50%;
		height: 200upx;
		background: #f72926;
	}
	.top{
		z-index: 1;
		top: 50upx;
		justify-content: space-between;
		display: flex;
		flex-direction: row;
		border-radius: 10upx;
		position: absolute;
		width: 90%;
		height: 230upx;
		background: #ffffff;
		.top1{
			margin-top: 34upx;
			margin-left: 70upx;
		display: flex;
		flex-direction: column;
			
			
		}
		.top2{
			align-items: flex-end;
			margin-top: 34upx;
			margin-right: 70upx;
		display: flex;
		flex-direction: column;
			
			
		}
	}
	.t1{
		margin-bottom: 20upx;
		font-size: 32upx;
		color: #999999;
	}
	.t2{
		font-size: 40upx;
		font-weight: 600;
		color: #333333;
	}
	.fuhao{
		font-size: 26upx;
		font-weight: 600;
		color: #333333;
	}
	.t3{
		margin-top: 20upx;
		font-size: 32upx;
		
		color: $uni-color-primary;
	}
	.quan {
		background: #f4f4f4;
		display: flex;
		width: 100%;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	// logo大小
	.login-img {
		width: 18vw;
		height: 18vw;
		margin: 0 auto;
		// vertical-align: middle;
		margin-top: 40px;
	}

	image {
		width: 20vw;
		height: 20vw;
	}

	.right{
		width:15upx;
		height:28upx;
		
		margin-left: 30upx;
		margin-right: 30upx;
		
	}
.zui{
	background: #ffffff;
	margin-top: 100upx;
		width: 100%;		
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 104upx;
		border-bottom:2upx solid #E6E6E6;
	}
	.zui2{
		background: #ffffff;
		margin-top: 20upx;
			width: 100%;		
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			height: 104upx;
			border-bottom:2upx solid #E6E6E6;
		}
	.edu{
		flex: 1;
		
		font-size:32upx;
		
		color:#333333;
		
	}
	.logo{
		
		float: left;
		width:32upx;
		height:32upx;
		
		margin:30upx ;
	}


	.name{
		margin: 0 auto;
		font-size: 32rpx;
		color: #333;
		font-weight: 500;
	}
	
</style>

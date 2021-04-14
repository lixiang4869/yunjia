<template>
	<view class="content" :style="{width:width,height:height}">
		<image :src="url+'/uploads/static/my/addbg.png'" :style="{width:width,height:height,position: absolute}"></image>
		
		<view style="display: flex;flex-direction: column; width: 100%;height: 100%;z-index: 999;position: absolute;align-items: center;
		top: 0;left: 0;">
			<image :src="url+'/uploads/static/my/zhaomu.png'" style="width:484rpx;height: 383rpx;"></image>
			<!-- <view style="color: #fff;font-size: 26rpx;">我的期权:{{info.stock_option}}</view> -->
			<view style="display: flex;flex-direction: row;width: 100%;justify-content: center;">
			<view	class="bgbox" @click="goZiLiao()">
				<view class="bgbox2">
				<image src="../../../static/my/ziliao.png" style="width: 42rpx;height: 42rpx;margin-right: 12rpx;"> </image>
				<view style="font-size: 30rpx;color: #333;">我的资料</view>
				</view>
			</view>
			<view	class="bgbox" @click="goList" style="margin-left: 30rpx;">
				<view class="bgbox2">
				<image src="../../../static/my/daili.png" style="width: 42rpx;height: 42rpx;margin-right: 12rpx;"> </image>
				<view style="font-size: 30rpx;color: #333;">代理设置</view>
				</view>
			</view>
			</view>
			<view class="item" @click="toNext(item)" v-for="(item ,index) in cards" :key="index" :style="bgColor[index]">
				<view class="left">{{item.goods_name}}</view>
				<view class="btn">
					<view>立即申请</view>
					<image src="../../../static/public/right.png" style="width: 15rpx;height: 28rpx;margin-left: 16rpx;"></image>
				</view>
			</view>
			<!-- <view class="item" style="background-color: rgba(255,230,90,0.35);">
			<view class="left">城市合伙人</view>
			<view class="btn">
				<view>立即申请</view>
				<image src="../../../static/public/right.png" style="width: 15rpx;height: 28rpx;margin-left: 16rpx;"></image>
			</view>
		</view>
		<view class="item" style="background-color: rgba(206,255,166,0.35);">
			<view class="left">社区合伙人</view>
			<view class="btn">
				<view>立即申请</view>
				<image src="../../../static/public/right.png" style="width: 15rpx;height: 28rpx;margin-left: 16rpx;"></image>
			</view>
		</view>
		<view class="item" style="background-color: rgba(166,204,255,0.35);">
			<view class="left">黑卡合伙人</view>
			<view class="btn">
				<view>立即申请</view>
				<image src="../../../static/public/right.png" style="width: 15rpx;height: 28rpx;margin-left: 16rpx;"></image>
			</view>
		</view> -->
		</view>
	</view>
</template>

<script>
	import request from "../../../store/http.js"
	// import uniPopup from '@/components/uni-popup/uni-popup.vue'
	// import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue'
	export default {
		// components:{
		// 	uniPopup,
		// 	uniPopupShare
		// },
		data() {
			return {
				absolute: "absolute",
				url: this.$store.state.url,
				imgurl: "",
				width: '',
				height: '',
				img: '',
				cards: null,
				bgColor: [
					"background-color:rgba(255,255,255,0.35)",
					"background-color:rgba(255,230,90,0.35)",
					"background-color:rgba(206,255,166,0.35);",
					"background-color:rgba(166,204,255,0.35);",
				],
				info:null
			}
		},
		onLoad() {
			this.info = this.$store.state.userInfor;
			
			this.getVideoXY();
			this.getData();
		},
		onShow() {
			/* 隐藏凸起图标 */
			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			setTimeout(function() {
				if (icon)
					icon.hide();
			}, 100);
			// #endif
		},

		methods: {
			goZiLiao(){
				uni.navigateTo({
					url:"../Personal-data/Personal-data"
				})
			},
			goList(){
				// if(!this.info.partner){
				// uni.showToast({
				// 	title:"您还不是合伙人",
				// 	icon:"none"
				// })
				// return
				// }
				uni.navigateTo({
					url:'./daili'
				})
			},
			getData() {
				uni.showLoading({

				});
				var authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(this.url + "/api/partner/partnerType", {

				}, {
					authtoken: authtoken
				}, "POST", res => {
					uni.hideLoading()
					console.log('res', res);
					this.cards = res.data.data;
				})
			},
			// 获取视口宽高
			getVideoXY() {
				let res = uni.getSystemInfoSync()
				this.width = res.windowWidth + 'px';
				this.height = res.windowHeight + 'px';
			},
			toNext(item) {
				console.log(JSON.stringify(item))
				if (item.goods_id == 4199) {
					uni.navigateTo({
						url: "applyCity/applyCity?id=" + item.goods_id + "&price=" + item.now_price
					})
				} else if (item.goods_id == 4198) {
					uni.navigateTo({
						url: "applyCity/applyArea?id=" + item.goods_id + "&price=" + item.now_price
					})
				} else if (item.goods_id == 4197) {
					uni.navigateTo({
						url: "applyCity/applyCommunity?id=" + item.goods_id + "&price=" + item.now_price
					})
				} else {
					uni.navigateTo({
						url: "applyCity/applyBlackcard?id=" + item.goods_id + "&price=" + item.now_price
					})
				}
			},
			tocity() {
				uni.navigateTo({
					url: "applyCity/applyCity"
				})
			},
			// toArea(){
			// 	uni.navigateTo({
			// 		url:'/pages/My/hehuoren/applyArea/applyArea?id='+id
			// 	})
			// },
			// toProperty(){
			// 	uni.navigateTo({
			// 		url:'/pages/My/hehuoren/applyProperty/applyProperty?id='+id
			// 	})
			// },

		}
	}
</script>

<style>
	.content {

		position: relative;
	}
	.bgbox{
		 margin-top: 14rpx;
		width: 300rpx;
		height: 80rpx;
		background: linear-gradient(90deg, #EA38CB 0%, #3DDFDA 100%);
		border-radius: 60rpx;
		justify-content: center;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.bgbox2{
		width: 260rpx;
		height: 80rpx;
		background: #ffffff;
		border-radius: 60rpx;
		justify-content: center;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.item {
		margin-top: 30rpx;
		flex-direction: row;
		display: flex;
		margin-left: 30rpx;
		margin-right: 30rpx;
		height: 120rpx;
		width: calc(100% - 60rpx);
		background-color: rgba(255, 255, 255, 0.35);
		justify-content: space-between;
		border-radius: 10rpx;
		align-items: center;
	}

	.left {
		margin-left: 32rpx;
		font-size: 36rpx;
		color: #FFFFFF;
	}

	.btn {
		display: flex;
		justify-content: center;
		flex-direction: row;
		margin-right: 22rpx;
		text-align: center;
		align-items: center;
		line-height: 60rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #FFFFFF;
		width: 216rpx;
		height: 60rpx;
		background: #8E84EA;
		border-radius: 30rpx;
	}
</style>

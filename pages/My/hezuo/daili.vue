<template>
	<view :style="{width,height,backgroundColor:'#F3F3F3'}">
		<!-- 头部导航栏 -->
		<view class="topNav">
			<view class="navItem" v-for="(item,index) in navBar" :key="index" @click="changeNav(index)">
				<text :class="index == actionNum ? 'navTitle'  : 'actionTitle'">{{item.name}}</text>
				<view class="actionLinear" v-if="index == actionNum"></view>
			</view>
		</view>
		<view v-if="actionNum==0" style="width: 100%;align-items: center;justify-content: center;">
			
			<view class="item">
				<view style="width: 100%;display: flex;flex-direction: row;">
						<view style="height: 80rpx;line-height: 80rpx;margin-left: 24rpx;">我的区域</view>
							<view style="height: 80rpx;line-height: 80rpx;margin-left: 20rpx;color:#FF2B10 ;">二七区</view>
				</view>
				
				<view style="display: flex;flex-direction: row;width: 100%;">
				<image src="../../../static/video/defaultHead.png"  style="width: 80rpx;height: 80rpx; border-radius: 50%;margin-right: 20rpx;margin-left: 24rpx;"></image>
				<view style="display: flex;flex-direction: column;flex: 1;">
					<view style="font-size: 34rpx;color: #333333;font-weight: bold;">昵称</view>
					<view style="font-size: 24rpx;color: #999;" >区域经理</view>
					
				</view>
				</view>
			</view>
			<view class="item">
				<view style="width: 100%;display: flex;flex-direction: row;">
					<view style="height: 80rpx;line-height: 80rpx;margin-left: 24rpx;">我的社区</view>
					<view style="height: 80rpx;line-height: 80rpx;margin-left: 20rpx;color:#FF2B10 ;">二七区</view>
				</view>
				
				<view class="btn" @click="goNext()">设置代理</view>
			</view>
		</view>
		<view v-if="actionNum==1">
			<view style="width: 100%;display: flex;flex-direction: row;align-items: center;">
				<view class="place"></view>
					<view style="height: 80rpx;line-height: 80rpx;margin-left: 24rpx;">代理区域</view>
						
			</view>
			<view class="item" style="margin-top: 0rpx;">
				<view style="width: 100%;display: flex;flex-direction: row;">
						<view style="height: 80rpx;line-height: 80rpx;margin-left: 24rpx;">我的区域</view>
						<view style="height: 80rpx;line-height: 80rpx;margin-left: 20rpx;color:#FF2B10 ;">二七区</view>
				</view>
				
				<view style="display: flex;flex-direction: row;width: 100%;">
				<image src="../../../static/video/defaultHead.png"  style="width: 80rpx;height: 80rpx; border-radius: 50%;margin-right: 20rpx;margin-left: 24rpx;"></image>
				<view style="display: flex;flex-direction: column;flex: 1;">
					<view style="font-size: 34rpx;color: #333333;font-weight: bold;">昵称</view>
					<view style="font-size: 24rpx;color: #999;" >区域经理</view>
					
				</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import request from "../../../store/http.js"
	export default {
		data() {
			return {
				url: this.$store.state.url,
				width: '',
				height: '',
				navBar: [{
						name: '我是合伙人',
						
					},
					{
						name: '我是代理人',
						
					},
				],
				actionNum: 0,
				
			}
		},
		onLoad(){
		},
		methods:{
			changeNav(index){
				this.actionNum=index
			},
			goNext(){
				uni.navigateTo({
					url:"setdaili"
				})
			},
			
		}
		
	}
</script>

<style>
	page{
		background: #f5f5f5;
	}
	.place{
		width: 16rpx;
		height: 10rpx;
		background: #FF502E;
		border-radius: 0px 100rpx 100rpx 0px;

	}
	.btn{
		margin-top: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #F32A27;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		width: 260rpx;
		color: #F32A27;
		font-size: 30rpx;
	}
	.item{
		font-size: 30rpx;
		color: #333;
		margin-left: 24rpx;
		margin-right: 24rpx;
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;
		width: 702rpx;
		align-items: center;
		height: 223rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.23);
		border-radius: 16rpx;

	}
	.home {
		margin-top: 30rpx;
		background: #f72926;
		height: 60rpx;
		text-align: center;
		align-items: center;
		font-size: 26rpx;
		color: #ffffff;
		width: 150rpx;
		line-height: 60rpx;
		border-radius: 60rpx;
	}

	.topNav {
		width: 100%;
		height: 99rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		
		align-items: center;
		
	}

	.navItem {
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.navTitle {
		flex: 1;
		line-height: 95rpx;
		display: flex;
		text-align: center;
		font-size: 30rpx;
		color: #FF2B10;
	}

	.lastNavTitle {
		font-size: 38rpx;
		color: #999999;
	}

	.actionTitle {
		flex: 1;
		line-height: 95rpx;
		display: flex;
		text-align: center;
		font-size: 30rpx;
		color: #333;
	}

	.actionLinear {
		width: 48rpx;
		height: 4rpx;
		background: #FF2B10;
		border-radius: 3rpx;

	}

	.containerBox {
		width: 100%;
		position: absolute;
		top: 8%;
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}

	.shopContainer {
		width: 100%;
		border-bottom: 1rpx solid #f3f3f3;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
	}

	.topBox {
		width: 100%;
		height: 120rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.topLeft {
		width: 10%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.selectedIcon {
		width: 50rpx;
		height: 50rpx;
	}

	.topRight {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.shopHeadImg {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.storeInfoBox {
		width: 338rpx;
		height: 100rpx;
		display: flex;
		flex-direction: column;
	}

	.shopName {
		font-size: 32rpx;
		font-weight: 600;
		color: #000000;
	}

	.fenceNum {
		font-size: 28rpx;
		color: #999999;
	}

	.shopImgBox {
		width: 100%;
		height: 136rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
	}

	.shopimgs {
		min-width: 117rpx;
		max-width: 532rpx;
		height: 100%;
		background-color: #f8f8f8;
		border-radius: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.shopImg {
		width: 117rpx;
		height: 117rpx;
		margin: 0 10rpx;
	}

	.btmMenu {
		width: 100%;
		height: 150rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
		z-index: 2;
	}

	.labe {
		width: 30%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.btnBox {
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}


	.hint {
		font-size: 28rpx;
		color: #fb3923;
		padding: 10rpx 20rpx;
		background-color: #fee1de;
		border-radius: 40rpx;
	}


	/* 商品模块 */
	.attenShopBox {
		width: 100%;
		height: 92%;
		position: absolute;
		top: 8%;
		z-index: 2;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.shopItemBox {
		width: 100%;
		height: 24%;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		border-radius: 20rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.shopInfoBox {
		width: 100%;
		height: 75%;
		display: flex;
		
		flex-direction: row;
		align-items: center;
		position: relative;
	}	

	.shopInfoImg {
		width: 160rpx;
		height: 160rpx;
		border-radius: 20rpx;
	}

	.shopInfoTxt {
		width: 73%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 2%;
	}

	.shopInfoName {
		font-size: 30rpx;
		color: #333333;
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-line-clamp: 2; //此处为上限行数
		-webkit-box-orient: vertical;
	}

	.priceBox {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
	}

	.price {
		font-size: 22rpx;
		color: #fb4832;
		font-weight: 700;
	}

	.btnsBox {
		width: 100%;
		height: 25%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.shopBtnBox {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.shopCancel {
		font-size: 28rpx;
		margin-right: 50rpx;
		color: #333333;
		border: 1rpx solid #999999;
		background-color: #FFFFFF;
		border-radius: 50rpx;
		padding: 10rpx 20rpx;
	}

	.shopAddCart {
		font-size: 28rpx;
		color: #FFFFFF;
		background-color: #fb4832;
		border-radius: 50rpx;
		padding: 10rpx 20rpx;
	}

	/* 浏览记录 */
	.browseBox {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		position: absolute;
		top: 8%;
	}

	.everyDayBox {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.dateTxt {
		font-size: 50rpx;
		margin-bottom: 20rpx;
	}

	.browseShopBox {
		width: 100%;
		background-color: #FFFFFF;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.browseShopBox:nth-child(2) {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.browseShopBox:last-child {
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}

	.browseShopBox:not(:first-child) {
		border-top: 1rpx solid #F3F3F3;
	}

	.browseShopInfo {
		width: 100%;
		height: 160rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}

	.browseShopImg {
		height: 160rpx;
		width: 160rpx;
		border-radius: 20rpx;
	}

	.browseShopTxtBox {
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	.browseShopName {
		font-size: 30rpx;
		color: #333333;
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-line-clamp: 2; //此处为上限行数
		-webkit-box-orient: vertical;
	}
</style>

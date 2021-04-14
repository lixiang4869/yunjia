<template>
	<view class="content">
		<view class="title">
			<view class="shopName">
				店铺名称
			</view>
			<view class="yulan">
				预览门店
			</view>
		</view>
		<view class="state">
			<view class="dian"></view>
			<view class="statu">营业中</view>
			<image class="img" src="../../../static/home/right.png"></image>
		</view>
		<view class="qianbao">
			<view class="qianbao-top">
				<view style="font-size:30rpx ;font-weight: 600;margin-left: 5rpx;">我的钱包</view>
				<view style="font-size: 24rpx;"> 查看钱包余额 ></view>
			</view>
			<view class="qianbao-bottom">
				<view class="b">
					<view>余额</view>
					<view class="c">
						<view style="font-size: 30rpx;">￥</view>
						<view style="font-size: 43rpx;"> 9000 </view>
					</view>

				</view>
				<view class="b">
					<view>银行卡</view>
					<view class="c">

						<view style="font-size: 43rpx;"> 2 </view>
						<view style="font-size: 30rpx;">张</view>
					</view>
				</view>
				<view class="b">
					<view>今日收益</view>
					<view class="c">
						<view style="font-size: 30rpx;">￥</view>
						<view style="font-size: 43rpx;"> 9000 </view>
					</view>
				</view>
			</view>

		</view>
		
		<view class="zui" v-for="(item) in list">
			<image :src="item.img" class="logo">
				<text class="edu">{{item.title}}</text>
		
				<image src="../../../static/home/right.png" class="right">
		</view>
	</view>
</template>

<script>
	import request from '../../../store/http.js'
	export default {
		data() {
			return {
				url: this.$store.state.url,
				list: [{
						img: "https://xin.yiyunoto.com/uploads/static/shopcenter/mendian.png",
						title: "门店设置",

					},
					{
						img: "https://xin.yiyunoto.com/uploads/static/shopcenter/dingdan.png",
						title: "订单设置",

					},
					{
						img: "https://xin.yiyunoto.com/uploads/static/shopcenter/lingsheng.png",
						title: "消息铃声设置",

					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		background: #ffffff;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.title {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.shopName {
		margin-left: 20rpx;
		font-size: 36rpx;
		font-weight: 600;
		color: #333;
	}

	.yulan {
		margin-right: 20rpx;
		background: #e7a733;
		border-radius: 32rpx;
		width: 187rpx;
		height: 64rpx;
		font-size: 26rpx;
		color: #333;
		line-height: 64rpx;
		text-align: center;
	}

	.state {
		border-radius: 10rpx;
		height: 85rpx;
		background: #e8e9f2;
		display: flex;
		margin: 20rpx;
		align-items: center;
	}

	.dian {
		margin: 20rpx;
		width: 15rpx;
		height: 15rpx;
		border-radius: 50%;
		background: #0f835f;
	}

	.img {
		margin: 20rpx;
		width: 12rpx;
		height: 22rpx;
	}

	.statu {
		flex: 1;
		font-size: 30rpx;
		color: #333;
	}

	.qianbao {
		background-image: url("https://xin.yiyunoto.com/uploads/static/shopcenter/topbg.png");
		height: 270rpx;
		margin: 20rpx;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
	}

	.qianbao-top {
		color: #333333;
		margin: 25rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	.qianbao-bottom {
		padding-top: 30rpx;
		color: #333333;
		margin: 25rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: row;
	}

	.b {
		align-items: center;
		font-size: 30rpx;
		font-weight: 600;
		display: flex;
		flex-direction: column;

	}

	.c {
		display: flex;
		flex-direction: row;
		margin-top: 24rpx;
		align-items: center;
	}

	.zui {
		background: #ffffff;
		margin-left: 20rpx;
		margin-right: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 104upx;
		border-bottom: 2upx dashed #E6E6E6;
	}

	.edu {
		flex: 1;

		font-size: 32upx;

		color: #333333;

	}

	.logo {

		float: left;
		width: 32upx;
		height: 36upx;

		margin: 30upx;
	}

	.right {
		width: 15upx;
		height: 28upx;

		margin-left: 30upx;
		margin-right: 30upx;

	}
</style>

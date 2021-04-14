<template>
	<view class="content">
		<view class="title">

			<view class="shopName">
				店铺名称
			</view>
			<view class="cate">
				<view class="item">
					<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/1.png" class="img"></image>
					<view>历史订单</view>
				</view>
				<view class="item">
					<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/2.png" class="img"></image>
					<view>商品</view>
				</view>
				<view class="item">
					<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/3.png" class="img"></image>
					<view>销售</view>
				</view>
				<view class="item">
					<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/4.png" class="img"></image>
					<view>财务</view>
				</view>
			</view>
		</view>
		<view class="tabNav">
			<view class="navItem" v-for="(item,index) in menuTabs" :key="index" v-bind:id="'tabNum'+index" @click="swichMenu(index)">
				<text :class="currentIndex == index?'tabName2':'tabName'">{{item.name}}</text>
				<view class="tabLine" v-if="currentIndex == index"></view>
			</view>
		</view>

		<view class="list" v-for="(item,index) in list" :key="index">
			<view class="zui">
				<view class="top">
					<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/8.png" class="img1">
						<view class="orderName">下单人</view>
						<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/5.png" class="img2"></image>
						<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/6.png" class="img2"></image>
						<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/7.png" style="width: 36rpx;height: 32rpx;margin: 30rpx;"></image>
				</view>
				<text class="edu">手机尾号：55555</text>
				<text class="address">点击查看配送地址 ></text>
				<view class="top" style="margin-top: 20rpx;margin-bottom: 20rpx;">
					<text style="flex: 1;font-size: 32rpx;color: #333333;margin-left: 30rpx;">拣货状态</text>
					<text style="font-size: 30rpx;color:#c19b45 ;margin-right: 30rpx;">已完成</text>
				</view>
			</view>
			<view class="zui">
				<view class="top">
					<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/8.png" class="img1">
						<view class="orderName">骑手</view>
						<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/5.png" class="img2"></image>
						<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/6.png" class="img2"></image>

				</view>
				<text class="edu">用户已收货</text>
				<view class="top" style="margin-top: 20rpx;margin-bottom: 20rpx;">
					<text style="flex: 1;font-size: 32rpx;color: #333333;margin-left: 30rpx;">订单完成,来评价骑手吧</text>
					<view style="font-size: 30rpx;color:#c19b45 ;margin-right: 30rpx; width: 160rpx;height: 60rpx;line-height: 60rpx;border-radius: 10rpx; text-align: center;background: #d5bb81;">评价骑手</view>
				</view>
			</view>
			<view class="zui">
				<view class="top">
					<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/9.png" class="img1" />
					<view style="flex-direction: row;display: flex;">
						<view  style="font-size: 32rpx;color: #333;">商品</view>
						<view  style="font-size: 26rpx;color: #c19b45;" >(共5件商品)</view>
					</view>
				</view>
				<view class="top" style="margin-top: 20rpx;margin-bottom: 20rpx;">
					<text style="flex: 1;font-size: 32rpx;color: #333333;margin-left: 30rpx;">本单预计收入</text>
					<view style="font-size: 32rpx;color:#df2c18 ;margin-right: 30rpx; ">￥99</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../../store/http.js'
	export default {
		data() {
			return {
				url: this.$store.state.url,
				currentIndex: 0,
				menuTabs: [{
						name: '进行中',
						type: 0,
					}, {
						name: '新订单',
						type: 20,
					},
					{
						name: '异常配送',
						type: 40,
					},
					{
						name: '催单',
						type: 60,
					}
				],
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
			swichMenu(index) {
				if (this.currentIndex == index) {
					return false
				} else {
					this.currentIndex == index
				}
			}
		}
	}
</script>

<style lang="scss">
	.img1 {
		margin: 30rpx;
		width: 48rpx;
		height: 39rpx;
	}

	.img2 {
		margin-left: 20rpx;
		margin-right: 20rpx;
		width: 30rpx;
		height: 36rpx;
	}

	.orderName {
		flex: 1;
		font-size: 32rpx;
		color: #333333;
	}

	.tabNav {
		width: 100%;
		margin-bottom: 30rpx;
		background: #f6f7fa;
		margin-top: -50rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-top-left-radius: 50rpx;
		border-top-right-radius: 50rpx;
	}

	.navItem {
		width: 24%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.tabName {
		margin-top: 40rpx;
		font-size: 30rpx;
		color: #333333;
		margin-bottom: 15rpx;
	}

	.tabName2 {
		margin-top: 40rpx;
		font-size: 30rpx;
		color: #c19b45;
		margin-bottom: 10rpx;
	}

	.tabLine {

		width: 50rpx;
		border-radius: 5rpx;
		height: 5rpx;
		background: #c19b45;
	}

	.content {
		background: #f6f7fa;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.title {
		width: 100%;
		display: flex;
		background: #242b3e;
		flex-direction: column;
		height: 340rpx;
	}

	.shopName {
		margin-left: 20rpx;
		font-size: 36rpx;
		font-weight: 600;
		color: #ffffff;
	}

	.cate {
		margin-top: 70rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;

		.item {
			display: flex;
			font-size: 26rpx;
			color: #ffffff;
			align-items: center;
			flex-direction: column;
			justify-content: center;

			.img {
				width: 60rpx;
				height: 60rpx;
			}
		}
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

	.top {
		align-items: center;
		display: flex;
		width: 100%;
		flex-direction: row;
	}

	.list {
		display: flex;
		flex-direction: column;

	}

	.zui {
		background: #ffffff;
		margin-left: 20rpx;
		margin-bottom: 30rpx;
		margin-right: 20rpx;
		display: flex;
		flex-direction: column;

		border-radius: 20rpx;
	}

	.edu {
		font-size: 30upx;
		margin-left: 30rpx;
		color: #c19b45;

	}

	.logo {
		float: left;
		width: 32upx;
		height: 36upx;
		margin: 30upx;
	}

	.address {
		margin-top: 50rpx;
		margin-left: 30rpx;
		font-size: 30rpx;
		color: #666666;
	}

	.right {
		width: 15upx;
		height: 28upx;
		margin-left: 30upx;
		margin-right: 30upx;
	}
</style>

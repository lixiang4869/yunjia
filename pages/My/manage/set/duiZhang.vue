<template>
	<view class="content">
		<view class="qianbao">
			<view class="qianbao-top">
				<view class="topLeft">
					<view style="font-size: 45rpx;">365</view>
					<view style="font-size: 30rpx;margin-top: 20rpx;">可提现余额</view>
					<view style="font-size: 24rpx;margin-top: 15rpx;">提现已到帐</view>
				</view>
				<view class="tixian">提现</view>
			</view>
			<view style="height: 1rpx;background: #5e6371;margin-left: 30rpx;margin-right: 30rpx;"></view>
			<view class="qianbao-bottom">
				<view class="b">
					余额流水
				</view>
				<view class="b" style="flex: 1;">
					查看账户
				</view>
				<view class="b">
					订单查询

				</view>
			</view>

		</view>
		<view class="item">
			<view class="left">
				<view class="left1">今日实时账单(元)</view>
				<view class="left2">2020-8-25</view>
			</view>
			<view class="right">
				<view >￥900</view>
				<image src="../../../../static/home/right.png" style="width: 12rpx;height: 22rpx;margin-left: 25rpx;"></image>
			</view>
		</view>
		<view class="d">
			<view style="font-size: 36rpx;color: #333;">历史账单</view>
			<view style="font-size: 28rpx;color: #999;flex: 1;margin-left: 30rpx;">单位/元</view>
			<view style="font-size: 30rpx;color: #666;">全部历史账单</view>
			<image src="../../../../static/home/right.png" style="width: 12rpx;height: 22rpx;margin-left: 25rpx;"></image>
		</view>
		<view class="item" v-for="(item,index) in list" :key="index">
			<view class="left">
				<view class="left1">今日实时账单(元)</view>
				<view class="left2">2020-8-25</view>
			</view>
			<view class="right">
				<view>￥900</view>
				<image src="../../../../static/home/right.png" style="width: 12rpx;height: 22rpx;margin-left: 25rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{},{},{}]
			}
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		background: #f3f3f3;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.qianbao {
		color: #ffffff;
		background: #20273a;
		
		margin: 20rpx;
		border-radius: 20rpx;
	}

	.qianbao-top {
		
		margin: 30rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	.qianbao-bottom {
		margin-left: 30rpx;
		margin-right: 30rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: row;
	}

	.b {
		height: 100rpx;
		line-height: 100rpx;
		align-items: center;
		font-size: 30rpx;
		font-weight: 600;
		display: flex;
		flex-direction: column;

	}

	.topLeft {

		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.tixian {
		margin-top: 10rpx;
		font-size: 26rpx;
		background: #e7af33;
		width: 187rpx;
		height: 64rpx;
		text-align: center;
		line-height: 64rpx;
		border-radius: 32rpx;
	}
	.item {
		padding-left: 20rpx;
		padding-right: 20rpx;
		justify-content: space-between;
		align-items: center;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: row;
		background: #ffffff;
		border-radius: 10rpx;
		height: 120rpx;
	}
	.left1{
		font-size: 30rpx;
		color: #333;
	}
	.left2{
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #999;
	}
	.right{
		font-size: 30rpx;
		color: #ba8c26;
		align-items: center;
		display: flex;
		flex-direction: row;
	}
	.d{
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
</style>

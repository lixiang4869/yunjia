<template>
	<view class="content">
		<view class="zui">
			<text class="t1">门店名称</text>
			<text class="t2">店铺名称</text>
			<image src="../../../../static/home/right.png" class="right">
		</view>
		<view class="zui">
			<text class="t1">店铺头像</text>
			<image src="../../../../static/home/hui.png" class="shopImg">
			<image src="../../../../static/home/right.png" class="right">
		</view>
		<view style="height: 20rpx;width: 100%;background: #f4f4f4;"></view>
		<view class="zui">
			<text class="t1">营业状态</text>
			<text class="t3">营业中</text>
			<image src="../../../../static/home/right.png" class="right">
		</view>
		<view class="zui">
			<text class="t1">门店公告</text>
			<image src="../../../../static/home/right.png" class="right">
		</view>
		<view class="zui">
			<text class="t1">店铺电话</text>
			<text class="t2">1555555555</text>
			<image src="../../../../static/home/right.png" class="right">
		</view>
		<view class="zui">
			<text class="t1">店铺地址</text>
			<text class="t3">航海路京广路江泰天宇国际</text>
			<image src="../../../../static/home/right.png" class="right">
		</view>
		<view class="zui">
			<text class="t1">营业时间</text>
			<text class="t3">9:00-17:00</text>
			<image src="../../../../static/home/right.png" class="right">
		</view>
		<view class="zui">
			<text class="t1">配送信息</text>
			<image src="../../../../static/home/right.png" class="right">
		</view>
		<view class="zui">
			<text class="t1">退货地址</text>
			<image src="../../../../static/home/right.png" class="right">
		</view>
		<view class="zui">
			<text class="t1">营业资质</text>
			
			<image src="../../../../static/home/right.png" class="right">
		</view>
	</view>
</template>

<script>
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

	.zui {
		background: #ffffff;
		margin-left: 20rpx;
		margin-right: 20rpx;
		
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 104upx;
		
	}

	.t1 {
		flex: 1;
		font-size: 30upx;
		color: #333333;

	}
.t2 {
		font-size: 30upx;
		color: #999999;

	}
	.t3 {
			font-size: 30upx;
			color: #96732f;
	
		}

	.shopImg {
		width: 108upx;
		height: 80upx;
		margin-left: 30upx;
		margin-right: 30upx;

	}
	.right {
		width: 15upx;
		height: 28upx;
		margin-left: 30upx;
		margin-right: 30upx;

	}
</style>

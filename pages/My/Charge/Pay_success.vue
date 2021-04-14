<template>
	<view class="quan">
		<image class="top_img" src="https://xin.yiyunoto.com/uploads/static/discern/success.png"/>
		<view class="center_txt">支付成功</view>
		<view style="display: flex; flex-direction: row; margin-top: 100rpx;">
			
		<navigator class="home" target="miniProgram" open-type="exit" >关闭小程序</navigator>
	
		</view>
		<!-- <view class="order_content">{{txt}}</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				txt:''
			}
		},
		onLoad(option) {
			
		},
		methods: {
		
			goOrder(){
				uni.switchTab({
					url:"../index/index"
				})
			}
		}
	}
</script>

<style>
	.home{
		background:#f72926 ;
		height: 60rpx;
		text-align: center;
		align-items: center;
		font-size: 26rpx;
		color: #ffffff;
		width: 180rpx;
		line-height: 60rpx;
		border-radius: 60rpx;
	}
.quan{
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	display: flex;
}
.top_img{
	margin: 100upx;
	width: 100upx;
	height: 100upx;
}
.center_txt{
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
}
/* .order_content{
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
} */
</style>

<template>
	<view class="app">
		<view class="head_bg">
			<image src="../../../static/tab/tu.png" ></image>
			<view class="head_title">
				<image src="../../../static/public/goBack.png" @click="navigateBack"></image>
				<view>提交订单</view>
				<text></text>
			</view>
		</view>
		<!-- 配送信息 -->
		<view class="delivery">
			<view class="delivery_t">
				<text @click="tab(1)" :class="[tabIndex == 1?'active':'']">外卖配送</text>
				<text @click="tab(2)" :class="[tabIndex == 2?'active':'']">自提</text>
			</view>
			<view class="delivery_m">
				<view class="delivery_m_t">
					<text>江泰·天宇国际3号楼11楼</text>
					<image style="width: 14rpx; height: 24rpx;" src="../../../static/home/right.png"></image>
				</view>
				<view class="delivery_m_b">
					王（先生） 1758784864
				</view>
			</view>
			<view class="delivery_b">
				<text>立即送出</text>
				<view>
					<text>大约12：35分送达</text>
					<image style="width: 14rpx; height: 24rpx; margin-left: 10rpx;" src="../../../static/home/right.png" mode=""></image>
				</view>
				
			</view>
		</view>
		
		<!-- 商品信息 -->
		<view class="items">
			<view class="item" v-for="(item,index) in 4" :key="index">
				<image src="" mode=""></image>
				<view class="item_r">
					<view class="item_r_l">
						<view>新品特价苦瓜</view>
						<view>一年生攀援状柔弱草本...</view>
					</view>
					<view class="item_r_r">
						<text>￥105</text>
						<text>￥60</text>
					</view>
				</view>
			</view>
			<view class="youhui" style="margin-top: 30rpx;">
				<text>优惠活动</text>
				<text>-45</text>
			</view>
			<view class="youhui">
				<text>配送费</text>
				<view class="feiyong">
					<text>￥4</text>
					<text>￥1.5</text>
				</view>
			</view>
			<view class="youhui">
				<text>订单备注</text>
				<view class="kouwei">
					<text>口味、偏好</text>
					<image style="width: 14rpx; height: 24rpx;" src="../../../static/home/right.png"></image>
				</view>
				
			</view>
		</view>
		<!-- 底部结算 -->
		<view class="dibu">
			<view class="close">
				<view class="close_l">
					<view>￥
						<text>31.1</text>
						<text>￥42</text>
					</view>
					<view>
						配送费 ￥2.5
					</view>
				</view>
				<view class="close_r">
					立即支付
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 1
			};
		},
		methods: {
			navigateBack() {
				uni.navigateBack();
			},
			tab(i) {
				this.tabIndex = i
			}
		}
	}
</script>

<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}
	.app {
		padding: 0 20rpx;
		background-color: #F3F3F3;
	}
	.head_bg {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 485rpx;
		background-color: #f3f3f3;
		>image {
			width: 100%;
			height: 385rpx;
		}	
		.head_title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 710rpx;
			position: absolute;
			left: 0;
			top: 90rpx;
			padding: 0 20rpx;
			color: #fff;
			>image {
				width: 19rpx;
				height: 34rpx;
				padding-right: 20rpx;
			}
			view{
				font-size: 36rpx;
				font-weight: bold;
			}
			text{
				width: 19rpx;
				height: 34rpx;
			}
		}
	}
	.delivery {
		position: fixed;
		top: 180rpx;
		left: 20rpx;
		width: 710rpx;
		color: #333;
		border-radius: 0 0 10rpx 10rpx;
		.delivery_t {
			position: relative;
			height: 70rpx;
			width: 100%;
			text {
				position: absolute;
				bottom: 0;
				height: 55rpx;
				width: 52%;
				line-height: 55rpx;
				text-align: center;
				font-size: 26rpx;
				background-color: #eaebee;
			}
			text:first-child {
				left: 0;
				border-radius: 10rpx 40rpx 0 0;
				
			}
			text:last-child {
				right: 0;
				border-radius: 40rpx 10rpx 0 0;
			}
			.active {
				height: 70rpx;
				line-height: 70rpx;
				font-size: 30rpx;
				background-color: #fff;
				z-index: 99;
			}
			.active1 {
				height: 70rpx;
				line-height: 70rpx;
				font-size: 30rpx;
				background-color: #fff;
				border-radius: 40rpx 10rpx 0 0;
				z-index: 99;
			}
		}
		.delivery_m {
			padding: 20rpx;
			font-size: 30rpx;
			background-color: #fff;
			border-bottom: 1px solid #eee;
			.delivery_m_t {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;
			}
			.delivery_m_b {
				font-size: 24rpx;
			}
		}
		.delivery_b {
			padding: 25rpx 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 26rpx;
			background-color: #fff;
			view {
				display: flex;
				align-items: center;
				text {
					color: #ff496c;
				}
			}
		}
	}
	.items {
		padding: 10rpx 30rpx;
		background-color: #fff;
		border-radius: 10rpx;
		margin-bottom: 160rpx;
		margin-top: 485rpx;
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			border-bottom: 1px solid #eee;
			image {
				width: 126rpx;
				height: 108rpx;
				background-color: #eee;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}
			.item_r {
				flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				.item_r_l {
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
					view:last-child {
						width: 300rpx;
						font-size: 22rpx;
						color: #999;
						overflow:hidden;  //超出部分隐藏
						text-overflow:ellipsis;  //超出部分显示...
						white-space:nowrap; 
						margin-top: 10rpx;
					}
				}
				.item_r_r{
					text {
						font-size: 30rpx;
						font-weight: bold;
						color: #333333;	
					}
					text:first-child{
						margin-right: 10rpx;
						font-size: 22rpx;
						color: #999999;
						text-decoration:line-through;
					}
				}
					
			}
		}
		.youhui {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			font-size: 30rpx;
			>text:first-child {
				color: #333;
			}
			>text:last-child {
				color: #ff496c;
			}
			.feiyong {
				display: flex;
				justify-content: space-between;
				align-items: center;
				text:first-child {
					font-size: 24rpx;
					color: #999;
					text-decoration:line-through;
				}
				text:last-child {
					margin-left: 20rpx;
					font-size: 30rpx;
					color: #333333;
				}
				
			}
			.kouwei {
				display: flex;
				justify-content: space-between;
				align-items: center;
				text:first-child {
					font-size: 30rpx;
					color: #999999;
				}
				image {
					vertical-align: middle;
					margin-left: 20rpx;
				}
			}
		}	
	}
	.dibu {
		position: fixed;
		left: 0;
		bottom: 0;
		padding: 0;
		width: 100%;
		height: 160rpx;
		background-color: #f3f3f3;
		.close {
			display: flex;
			justify-content: space-between;
			position: absolute;
			left: 20rpx;
			top: 30rpx;
			width: 710rpx;
			height: 100rpx;
			color: #fff;
			border-radius: 50rpx;
			overflow: hidden;
			.close_l {
				flex: 1;
				height: 100rpx;
				padding: 5rpx 0 0 60rpx;
				background-color: #3e4459;
				font-size: 20rpx;
				color: #ffffff;
				
				view:first-child {
					margin-bottom: 5rpx;
					text:first-child {
						font-size: 40rpx;
					}
					text:last-child {
						color: #ddd;
					}
				}
				view:last-child {
					color: #ddd;
				}
			}
			.close_r {
				width: 258rpx;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				color: #fefefe;
				background-color: #fe5037;
			}
		}
	}
</style>

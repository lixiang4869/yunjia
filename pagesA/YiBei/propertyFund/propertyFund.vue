<template>
	<view class="main">
		
		<view class="bg">
			<view class="size" >
				<view class="con">尊敬的业主您好，您的积分为
					<view class="price">¥
						<text class="num"> 836.01</text>
					</view>
				</view>
			</view>
		</view>
		<view class="wuyeprice">
			<view class="wuye">
				<view class="cc">物业费:</view>
				<view class="pp">¥ <text class="price">360</text></view>
			</view>
		</view>
		<view class="wuyeprice">
			<view class="wuye">
				<view class="cc">水费:</view>
				<view class="pprice">您已欠费 ¥ <text class="ppp">-10</text></view>
			</view>
		</view>
		<view class="wuyeprice">
			<view class="wuye">
				<view class="cc">电费:</view>
				<view class="pp">¥ <text class="price">360</text></view>
			</view>
		</view>
		<view class="wuyeprice">
			<view class="wuye">
				<view class="cc">燃气费:</view>
				<view class="pp">¥ <text class="price">360</text></view>
			</view>
		</view>
		
		<view class="footer">
			<view class="all">合计:</view>
			<view class="price">¥1090.00</view>
		</view>
	</view>
</template>

<script>
	// import indexBackgroundImage from "@/static/img/jijin/jijin.png"
	
export default {
	data() {
		return {
			
		}
	},
	components: {
		
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
		
	},
	methods: {
		// back: function(){
		// 	uni.navigateBack({
				
		// 	})
		// },
		back(){
			uni.navigateTo({
				url:'../index/index'
			})
		}
	},
	computed: {
		
	},
	
	
};
</script>

<style lang="scss" scoped>
	.main{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #FFFFFF;
		.navbarTop{
			width: 100%;
			height: 120rpx;
			line-height: 120rpx;
			display: flex;
			flex-direction: row;
			padding-top: 40rpx;
			background: #FFFFFF;
			display: flex;
			flex-direction: row;
			align-items: center;
			.back{
				margin-left:30rpx;
				image{
					width: 21rpx;
					height: 36rpx;
				}
			}
			.navbarTitle{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				.title{
					width:160rpx;
					font-size:38rpx;
					font-family:Microsoft YaHei;
					font-weight:bold;
					color:rgba(51,51,51,1);
				}
				
			}
		}
		.bg{
			width: 100%;
			display: flex;
			justify-content: center;
			.size{
				background-size: cover;
			
				width: 712rpx;
				height: 120rpx;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				.con{
					margin-top: 50rpx;
					width:520rpx;
					font-size:22rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:#777C91;
					display: flex;
					flex-direction: row;
					align-items: center;
					.price{
						margin-left: 30rpx;
						color: #F1ED37;
						font-size: 20rpx;
						.num{
							font-size: 36rpx;
						}
					}
				}
			}
		}
		.wuyeprice{
			width: 100%;
			margin: 30rpx auto;
			display: flex;
			justify-content: center;
			.wuye{
				display: flex;
				flex-direction: column;
				width:712rpx;
				height:156rpx;
				background:rgba(255,255,255,1);
				box-shadow:0rpx 1rpx 24rpx 0rpx rgba(0, 0, 0, 0.07);
				border-radius:22rpx;
				.cc{
					text-align: left;
					margin: 30rpx auto 30rpx 60rpx;
					width:94rpx;
					height:28rpx;
					font-size:28rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
				.pp{
					margin-left: 60rpx;
					width:144rpx;
					height:36rpx;
					font-size:28rpx;
					font-family:Microsoft YaHei;
					font-weight:bold;
					color:rgba(42,127,255,1);
					.price{
						font-size:40rpx;
					}
				}
				.pprice{
					margin-left: 60rpx;
					width:256rpx;
					height:36rpx;
					font-size:28rpx;
					font-family:Microsoft YaHei;
					font-weight:bold;
					color:#999999;
					.ppp{
						font-size:40rpx;
					}
				}
			}
		}
		.footer{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			font-size:30rpx;
			font-family:Microsoft YaHei;
			font-weight:bold;
			color:rgba(51,51,51,1);
			margin-top: 60rpx;
			.all{
				margin: auto 300rpx auto 80rpx;
			}
			.price{
				margin-right: 60rpx;
			}
		}
	}
</style>
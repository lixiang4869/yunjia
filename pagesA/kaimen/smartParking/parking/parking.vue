<template>
	<view class="main"   :style="{backgroundImage:`url(${indexBackgroundImage})`,backgroundSize: '100% 100%'}">
		<view>
			<Status></Status>
		</view>
		<view class="head">
			<view class="back" @tap="back">
				<image  src="https://xin.yiyunoto.com/uploads/static/open/menjin/back.png" mode="widthFix"></image>
			</view>
			<view class="navbarTitle">
				<view class="title">智慧停车</view>
			</view>
		</view>
		<view class="biaozhi">
			<image src="https://xin.yiyunoto.com/uploads/static/open/parking/goRight.png"></image>
			<view class="juli">
				<view class="go">
					<view class="meter">
						<view class="mi">10</view>
						<view>米</view>
					</view>
					<view class="right">右拐</view>
				</view>
				<view class="mubiao">
					到达 A6-02 停车位
				</view>
			</view>
		</view>
		<view class="lu">
			<image src="https://xin.yiyunoto.com/uploads/static/open/parking/gundao.png"></image>
		</view>
	</view>
</template>

<script>
	// import indexBackgroundImage from "@/static/open/parking/parking.png"
	import Status from '@/components/status/status.vue'	
	export default {
		data() {
			return {			
				// indexBackgroundImage: indexBackgroundImage,
			}
		},
		components: {
			Status
		},
		methods: {
			back: function(){
				uni.navigateBack({
					
				});		   
			},
		},
		onLoad() {
			
		},
		computed: {
			
		},
		
		components:{
			
		}
	};
</script>

<style lang="scss" scoped>
	.main{
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: -1;
		background: #F3F3F3;
		.head{
			position: absolute;
			top:0;
			z-index: 500;
			width: 100%;
			height: 560rpx;
			display:flex;
			flex-direction:column;
			padding-top: 40rpx;
			.back{
				position: absolute;
				z-index: 999;
				margin: 60rpx auto 20rpx 30rpx;
				image{
					width: 19rpx;
					height: 34rpx;
				}
			}
			.navbarTitle{
				margin-top: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				.title{
					width:148rpx;
					height:36rpx;
					font-size:36rpx;
					font-family:Microsoft YaHei;
					font-weight:bold;
					color:rgba(255,255,255,1);
				}
			}
			.menjin{
				margin-top: 60rpx;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				.pre,.next{
					width: 19rpx;
					height: 34rpx;
				}
				.men{
					margin-left: 80rpx;
					margin-right: 30rpx;
					width: 179rpx;
					height: 209rpx;
				}
			}
			.addr{
				display: flex;
				justify-content: center;
				align-items: center;
				width:36%;
				margin:30rpx 32% auto;
				height:60rpx;
				background:rgba(255,255,255,0.25);
				border-radius:30rpx;
				font-size:28rpx;
				font-family:Microsoft YaHei;
				font-weight:bold;
				color:rgba(255,255,255,1);
			}
			.btn{
				position: absolute;
				z-index: 999;
				top:540rpx;
				margin: auto 17% auto;
				width:66%;
				height:110rpx;
				background:rgba(255,255,255,1);
				box-shadow:0rpx 9rpx 10rpx 0rpx rgba(120,142,200,0.2);
				border-radius:55rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				.leftImg{
					margin-left: 20rpx;
					margin-top: 10rpx;
					image{
						width: 91rpx;
						height: 91rpx;
					}
				}
				.open{
					width:145rpx;
					font-size:36rpx;
					font-family:Microsoft YaHei;
					font-weight:bold;
					color:rgba(255,255,255,1);
					background:linear-gradient(-90deg,rgba(100,159,251,0.68) 0%, rgba(44,109,245,1) 100%);
					-webkit-background-clip:text;
					-webkit-text-fill-color:transparent;
				}
				.rightImg{
					margin-right: 60rpx;
					image{
						width: 32rpx;
						height: 40rpx;
					}
				}
			}
		}
		.biaozhi{
			display: flex;
			flex-direction: row;
			width:94%;
			margin: 180rpx 3% auto;
			height:214rpx;
			background:rgba(13,13,13,1);
			border-radius:40rpx;
			align-items: center;
			image{
				margin-left: 60rpx;
				margin-right: 60rpx;
				width: 112rpx;
				height: 133rpx;
			}
			.juli{
				display: flex;
				flex-direction: column;
				color: #FFFFFF;
				font-size: 40rpx;
				.go{
					display: flex;
					flex-direction: row;
					.meter{
						display: flex;
						flex-direction: row;
						.mi{
							margin-top: -30rpx;
							margin-right: 6rpx;
							font-size: 80rpx;
						}
					}
					.right{
						margin-left: 30rpx;
						color: #9E9E9F;
					}
				}
				.mubiao{
					margin-top: 10rpx;
				}
			}
		}
		.lu{
			position: absolute;
			bottom: 0;
			image{
				position: absolute;
				left: 230rpx;
				bottom: 0;
				width: 520rpx;
				height: 428rpx;
			}
		}
	}
</style>
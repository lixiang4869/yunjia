<template>
	<view class="content" :style="{width:width+'px',height:height+'px'}">
		<view class="congxin">
			<view class="congxina">
				<image :src="getImgUrl(heimg)" mode="" style="width: 150rpx;height: 150rpx; z-index: 99;border-radius: 50%;"></image>
			</view>
			<view class="congxinb">
				<image src="https://xin.yiyunoto.com/uploads/static/bao/ling.png" style="width: 90%;height: 400rpx;" mode=""></image>
				<view class="congxinb-a">
					<view class="name">
						{{name}}
					</view>
					<view class="xianzhi">
						{{juli}}公里可领
					</view>
					<view class="jine">
						<text>{{jine}}</text>
						元
					</view>
					<view class="islingqu">
						已存入钱包
					</view>
				</view>

			</view>
		</view>
		<view class="zj">
			<view class="zja">
				<view class="zja-a">
					<text>剩{{sheng}}元可领</text>
				</view>
				<view class="zja-b" v-for="(item,index) in shu" :key="index">
					<view class="userrow">
						<view class="leftrow">
							<view class="img">
								<image :src="getImgUrl(item.headimg)" 
								style="width:120rpx; height: 120rpx;border-radius: 50%; margin-top: 20rpx; margin-right: 20rpx;" mode=""></image>
							</view>
							<view class="name_shijian">
								<view class="name">
									{{item.truename}}
								</view>
								<view class="shijian">
									{{item.create_time}}
								</view>
							</view>
						</view>
						<view class="right">
							{{item.one_money}}元
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://xin.yiyunoto.com',
				name: '',
				juli: '',
				jine: '',
				heimg: '',
				id: '',
				sheng: '',
				nameone: '',
				jieone: '',
				shu: '',
				width:'',
				height:''
			}
		},
		onLoad: function(option) {
			let {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.width = windowWidth;
			this.height = windowHeight;
			var that = this;
			console.log(option)
			console.log(11)
			that.name = option.name;
			that.heimg = option.imgto;
			that.juli = option.juli;
			that.jine = option.jine;
			that.id = option.idto;
			var authtoken = uni.getStorageSync("authtoken");
			uni.request({
				url: 'https://xin.yiyunoto.com/api/hongbao/redPackInfo',
				data: {
					redpack_id: that.id
				},
				header: {
					authtoken: authtoken
				},
				success: (res) => {
					console.log(res)
					console.log(res.data.data.surplus_money)
					console.log(res.data.data.redpack_log)
					that.sheng = res.data.data.surplus_money.toFixed(2);
					that.shu = res.data.data.redpack_log;
				}
			});
			
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			this.tiao();
			return true;
		},
		methods: {
			getImgUrl(url) {
				if (!url) {
					return;
				}
				if (url.search('http') == -1) {
					url = "https://xin.yiyunoto.com" + url
				}
				return url
			},
			tiao() {
				uni.navigateBack({
					delta: 0
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #FB263A;
		.congxin {
			width: 100%;
			display: flex;
			justify-content: center;
			padding-top: 150rpx;
			.congxina {
				position: absolute;
				margin-top: -75rpx;
				border-radius: 50%;
			}

			.congxinb {
				width: 100%;
				display: flex;
				justify-content: center;

				.congxinb-a {
					position: absolute;
					margin-top: 90rpx;
					.name {
						// padding-top: 20rpx;
						font-size: 40rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}

					.xianzhi {
						margin-top: 20rpx;
						margin-left: 20rpx;
						width: 200rpx;
						height: 50rpx;
						border: 2rpx solid #FB263A;
						border-radius: 40rpx;
						font-size: 26rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: rgba(251, 38, 58, 1);
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.jine {
						padding-top: 50rpx;
						margin-left: 20rpx;
						// width: 177rpx;
						height: 52rpx;
						font-size: 60rpx;
						font-family: Adobe Heiti Std;
						font-weight: normal;
						color: rgba(251, 38, 58, 1);
						line-height: 19rpx;
					}

					.islingqu {
						padding-top: 20rpx;
						// width: 119rpx;
						margin-left: 40rpx;
						height: 23rpx;
						font-size: 24rpx;
						font-family: Adobe Heiti Std;
						font-weight: normal;
						color: rgba(153, 153, 153, 1);
						line-height: 19rpx;
					}
				}
			}
		}

		.zj {
			background-color: #FB263A;
			display: flex;
			justify-content: center;
			.zja {
				width: 90%;
				// height: 100%;
				margin-top: 80rpx;
				background: rgba(251, 77, 86, 1);
				border: 0px solid rgba(0, 0, 0, 1);
				border-radius: 12rpx;
				.zja-a{
					width: 100%;
					display: flex;
					justify-content: center;
					text{
						margin-top:50rpx;
						font-size:40rpx;
						font-family:Adobe Heiti Std;
						font-weight:normal;
						color:rgba(255,255,255,1);
						line-height:19rpx;
					}
				}
				.zja-b{
					padding: 30rpx 30rpx ;
					// padding-top: 20rpx;
					font-family:Adobe Heiti Std;
					font-weight:normal;
					color:rgba(255,255,255,1);
					margin-left: 30rpx;
					margin-right: 30rpx;
					.userrow{
						display: flex;
						justify-content:space-between;
						.leftrow{
							display: flex;
							.name_shijian{
								font-size:35rpx;
							}
							.shijian{
								padding-top: 30rpx;
								font-size:30rpx;
								opacity:0.73;
							}
						}
						.right{
							font-size:30rpx;
							margin-top: 40rpx;
							font-family:Adobe Heiti Std;
							font-weight:normal;
							color:rgba(251,238,96,1);
							line-height:19rpx;
						}
					}
				}
			}

		}
	}


	// .user_list {
	// 	padding: 20rpx 20rpx;

	// 	.user {

	// 		// padding: 20rpx 0;
	// 		.left {
	// 			.img {
	// 				width: 80rpx;
	// 				height: 80rpx;
	// 				border-radius: 50%;
	// 				// background-color: #666;
	// 				margin-right: 30rpx;
	// 			}

	// 			.name_shijian {
	// 				font-size: 25rpx;
	// 			}
	// 		}

	// 	}
	// }
</style>

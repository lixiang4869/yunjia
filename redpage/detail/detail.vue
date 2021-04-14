<template>
	<view class="detail">
		<view class="status_bar">
			<!-- 状态栏 -->
		</view>
		<view class="detaila">
			<image src="../../static/bao/fantoo.png" style="width: 50upx; height: 50upx;padding-left: 20upx; position: fixed;top:;"
			 @click="fanhui"></image>
			<view class="too" v-if="fanh">
				({{fan}})秒
			</view>
		</view>
		<view class="content">
			<view class="user">
				<view class="row">
					<view class="user_info row">
						<view class="img">
							<image :src="headimg" mode=""></image>
						</view>
						<view class="name_shijian">
							<view class="name">
								{{name}}
							</view>
							<view class="shijian">
								<!-- {{shijian}}天前 -->
								{{juli}}公里可领
							</view>
						</view>
					</view>
					<view class="jine">
						<view class="">
							<text>{{jineto}}元</text>

						</view>
						<view class="info">
							请在“我的钱包”查看
						</view>
					</view>
				</view>
				<!-- <view class="xianzhi">
					{{juli}}公里可领
				</view> -->
				<view class="neirong">
					<view class="info">
						{{shuo}}
					</view>
				<!-- 	<view class="img">
					<image :src="item" mode="" style="width: 200rpx;height: 200rpx;margin-right: 20rpx; margin-top: 20rpx;" v-for="(item,index) in to" :key="index"></image>
					</view> -->
					<view class="img" v-if="to&&to.search('mp4')==-1">
						<image :src="item" mode="" style="width: 200rpx;height: 200rpx;margin-right: 20rpx; margin-top: 20rpx;" v-for="(item,index) in to"
						 :key="index"></image>
					</view>
					<view class="img" v-if="to.search('mp4')!=-1" @click.stop="">
						<video :src="to" style="width: 100%;height: 250rpx;" autoplay="true"></video>
					
					</view>
					<view class="row">
						<view class="row site">
							<image src="../../static/public/weizhi.png" mode="" style="width: 50rpx;height: 50rpx; padding-right: 10rpx;"></image>
							<text style="font-size: 30rpx;">{{weizhi}}</text>
						</view>
						<view class="tongji row">
							<view class="row">
								<image src="../../static/bao/yan.png" mode="" style="width: 50rpx;height: 40rpx;"></image>
								<text style="font-size: 30rpx;">{{yan}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="user_list row" @click="leibiao">
				
					<view style="width: 150rpx;">
						已领取
					</view>
					<scroll-view scroll-x="true"class="lingqulist">
			
							<image :src="getImgUrl(item.headimg)" mode="" style="width: 50rpx; height: 50rpx;border-radius: 50%; margin-left: 15upx;" v-for="(item,index) in shu" :key="index"></image>
					</scroll-view>
				
				
			</view>
			<view class="bottom">
				<view class="row">
					<input type="text" value="" placeholder="发表评论" :focus="one" @input="toooo" @confirm="confirm" v-model="oneaaa" />
				</view>
			</view>
			<view class="pinglun" v-for="(item,index) in fals" :key="index">
				<view class="touxiang">
					<image :src="getImgUrl(item.headimg)" style="width: 100rpx; height: 100rpx;  border-radius:50%;" mode=""></image>
				</view>
				<view class="zonga">
					<view class=" ming">
						{{item.truename}}
					</view>
					<view class=" lin">
						评论： {{item.comment}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from "../../store/http.js"
	export default {
		data() {
			return {
				name: '',
				shijian: '',
				jineto: '',
				juli: '',
				shuo: '',
				url: 'https://xin.yiyunoto.com',
				headimg: '',
				weizhi: '',
				yan: '',
				imageto: '',
				to: '',
				idto: '',
				one: false,
				shu: '',
				inputa: '',
				fals: '',
				oneaaa: '',
				fan: 8,
				fanh: true,
				t: ''
			}
		},
		onLoad: function(option) {
			var that = this
			console.log(option.idtoo)
			var redpack_id = option.idtoo;
			that.idto = option.idtoo;
			console.log(that.idto)
			var authtoken = uni.getStorageSync("authtoken");
			//抢红包
			// uni.request({
			// 	url: 'https://xin.yiyunoto.com/api/hongbao/redPackInfo',
			// 	data: {
			// 		redpack_id: redpack_id
			// 	},
			// 	header: {
			// 		authtoken: authtoken
			// 	},
			// 	success: (res) => {
			// 		console.log(res.data.data);
			// 		that.jineto = res.data.data.one_money;
			// 		that.headimg = res.data.data.giveOut_headimg;
			// 		that.name = res.data.data.giveOut_truename;
			// 		that.shijian = res.data.data.create_time;
			// 		that.juli = res.data.data.distance;
			// 		that.shuo = res.data.data.content;
			// 		that.weizhi = res.data.data.address;
			// 		that.yan = res.data.data.page_view;
			// 		that.to = res.data.data.image_url;
			// 	}
			// });

			uni.request({
				url: 'https://xin.yiyunoto.com/api/hongbao/redPackInfo',
				data: {
					redpack_id: redpack_id
				},
				header: {
					// authtoken: authtoken
				},
				success: (res) => {
					console.log(res.data.data);
					that.jineto = res.data.data.one_money;
					that.headimg = res.data.data.giveOut_headimg;
					if (that.headimg&&that.headimg.search("http")==-1) {					
						that.headimg = that.url + that.headimg;
					}
					that.name = res.data.data.giveOut_truename;
					that.shijian = res.data.data.create_time;
					that.juli = res.data.data.distance;
					that.shuo = res.data.data.content;
					that.weizhi = res.data.data.address;
					that.yan = res.data.data.page_view;
					that.to = res.data.data.image_url.split(",");
					
					// console.log(that.to)
				}
			});
			// var  id=295;
			uni.request({
				url: 'https://xin.yiyunoto.com/api/hongbao/redpackCommentList',
				method: 'post',
				header: {
					// authtoken: authtoken
				},
				data: {
					redpack_id: redpack_id,
					comment: that.inputa
				},
				success: function(res) {
					console.log(111)
					console.log(res.data.data.data)
					that.fals = res.data.data.data;
					console.log(that.fals)
				}
			});
			// var  id=295;
			console.log(authtoken)
			uni.request({
				url: 'https://xin.yiyunoto.com//api/hongbao/redPackLog',
				data: {
					redpack_id: redpack_id
				},
				method: 'POST',
				header: {
					// authtoken: authtoken
				},
				success: (res) => {
					// console.log(res.data)
					console.log(res.data.data.redpack_log.data)
					that.shu = res.data.data.redpack_log.data;
				}
			});
		},

		onShow() {
			this.t = setInterval(
				() => {
					this.fan--;
					if (this.fan <= 0) {
						clearInterval(this.t);
						this.fanh = false
						console.log(this.fanh)
						console.log(this.idto)
						var authtoken = uni.getStorageSync("authtoken");
						request.urlRequest('https://xin.yiyunoto.com/api/hongbao/receiveRedpack', {
							redpack_id: this.idto
						}, {
							authtoken: authtoken,

						}, "POST", res => {
							var mag = res.data.msg
							uni.showToast({
								title: mag,
								// duration: 2000
							});
						})

					}

				}, 1000
			);

		},
		onBackPress(options) {
			// 这里可以自定义返回逻辑，比如下面跳转其他页面
			if (options.from === 'navigateBack') {
				return false;
			}
			this.fanhui();
			return true;
			// return true 表示禁止默认返回
			return true
		},

		methods: {
			 getImgUrl(url){
				 if(!url){
					 return;
				 }
				if(url.search('http')==-1){url="https://xin.yiyunoto.com"+url}
				return url
			},
			fanhui() {
				console.log(1551)
				if (this.fanh == false) {
					uni.navigateBack({
						delta: 1
					});
				}
			},
			toooo() {
				var that = this;
				that.one = true;
			},
			confirm: function(event) {
				// var  id=295;
				var that = this;
				that.inputa = that.oneaaa;
				console.log(that.inputa);
				console.log(that.idto);
				this.one = false;
				var authtoken = uni.getStorageSync("authtoken");
				uni.request({
					url: 'https://xin.yiyunoto.com/api/hongbao/redpackComment',
					method: 'post',
					header: {
						authtoken: authtoken
					},
					data: {
						redpack_id: that.idto,
						comment: that.inputa
					},
					success: function(res) {
						that.oneaaa = '';
						uni.request({
							url: 'https://xin.yiyunoto.com/api/hongbao/redpackCommentList',
							method: 'post',
							header: {
								authtoken: authtoken
							},
							data: {
								redpack_id: that.idto,
								comment: that.inputa
							},
							success: function(res) {
								console.log(111)
								console.log(res.data.data.data)
								that.fals = res.data.data.data;
								console.log(that.fals)
							}
						});
					}
				});
			},
			leibiao() {
				var that = this;
				if (this.fanh == false) {
					uni.redirectTo({
						url: '../lingqu/lingqu?name=' + this.name + '&imgto=' + this.headimg + '&juli=' + this.juli + '&jine=' + this.jineto +
							'&idto=' + this.idto
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: that.fan + '秒后点击'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.clear::after {
		content: "";
		clear: both
	}
	.lingqulist{
		flex: 1;
		flex-direction: row;
		display: flex;
		overflow: hidden;
		white-space: nowrap;
	}
	.row {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.flex_content {
		display: flex;
		justify-content: center;
	}

	page {
		height: 100%;
	}

	.detail {
		height: 100%;
		background-color: #f5f5f5;
	}

	.user {
		background-color: #fff;
		padding: 20rpx;

		.user_info {
			.img {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				background-color: #666;
				overflow: hidden;
				margin-right: 20rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.name_shijian {
				.name {
					font-size: 40rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
				}

				.shijian {
					font-size: 30rpx;
					color: #808080;
				}
			}
		}

		.jine {
			text-align: right;
			font-size: 60rpx;

			text {
				font-size: 60rpx;
				color: red;
			}

			.info {
				font-size: 25rpx;
				padding-top: 10rpx;
				color: #333333;
				opacity: 0.73;
			}
		}
	}

	// .xianzhi {
	// 	font-size: 25rpx;
	// 	// margin: 20rpx 0;
	// 	color: #333333;
	// 	opacity:0.73;
	// }

	.site {
		font-size: 25rpx;
		color: #333333;
	}

	.tongji {
		font-size: 25rpx;

		.row {
			margin-right: 20rpx;
		}
	}

	.user_list {
		margin-top: 30rpx;
		background-color: #fff;
		padding: 20rpx 20rpx;
	}

	.bottom {
		background-color: #fff;
		width: 100%;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99;

		// height: 50upx;
		input {
			width: 100%;
			border: 1px solid red;
			padding: 5rpx 20rpx;
			border-radius: 40rpx;
			font-size: 40rpx;
		}
	}


	.lin {
		// margin-left: 80rpx;
		font-size: 36rpx;
		padding-top: 20rpx;
	}

	.ming {
		padding-top: 10rpx;
		font-size: 35rpx;
		color: #333333;
	}

	.faa {
		padding-top: 10rpx;
		font-size: 25rpx;
		color: #333333;
	}

	.zonga {
		padding-left: 10upx;
	}

	.pinglun {
		margin-top: 10upx;
		z-index: 9;
		border-bottom: 3upx solid #dddddd;
		display: flex;	
		margin-left: 20rpx;
		
		.touxiang {
			display: flex;
			padding-top: 20rpx;
			border-radius: 50%;
		
		}
		
	}

	.detaila {
		width: 100%;
		height: 72rpx;
		display: flex;
		// justify-content: center;
		align-items: center;
	}

	.too {
		padding-left: 50upx;
		margin-left: 50upx;
	}
</style>

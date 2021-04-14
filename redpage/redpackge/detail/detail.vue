<template>
	<view class="detail">

		<view class="content">
			<view class="user">
				<view class="row">
					<view class="user_info">
						<view class="img">
							<image :src="getImgUrl(headimg)" mode=""></image>
						</view>
						<view class="name_shijian">
							<view class="name">
								{{name}}
							</view>
							<view class="shijian">
								{{convertTimeToFormat()}}
							</view>
						</view>
					</view>
					<view class="jine">
						<!-- #ifdef APP-PLUS -->
						<view class="">
							<text>{{jineto}}</text>
							元
						</view>
						<!-- #endif -->

						<view class="info">

						</view>
					</view>
				</view>
				<view class="xianzhi">
					{{getdes()}}
				</view>
				<view class="neirong">
					<view class="info">
						{{shuo}}
					</view>
					<view class="img" v-if="info.image_url&&info.image_url.search('mp4')==-1">
						<image :src="item" mode="" style="width: 200rpx;height: 200rpx;margin-right: 20rpx; margin-top: 20rpx;" v-for="(item,index) in to"
						 :key="index"></image>
					</view>
					<view class="img" v-if="info.image_url&&info.image_url.search('mp4')!=-1" @click.stop="">
						<video :src="info.image_url" style="width: 100%;height: 250rpx;" autoplay="true" controls="false"></video>
						
					</view>
					<view class="row">
						
							<image src="../../../static/public/weizhi.png" mode="" style="width: 30rpx;height: 30rpx; padding-right: 10upx;"></image>
							<text class="site" style="flex: 1;">{{weizhi}}</text>
							
							
						</view>
					</view>
				</view>
			</view>
			<view class="user_list row" @click="leibiao">

				<view style="width: 150rpx;">
					已领取
				</view>
				<scroll-view scroll-x="true" class="lingqulist">

					<image :src="getImgUrl(item.headimg)" mode="" style="width: 50rpx; height: 50rpx;border-radius: 50%; margin-left: 15upx;"
					 v-for="(item,index) in shu" :key="index"></image>
				</scroll-view>


			</view>
			<view class="bottom">
				<view class="row">
					<input type="text" value="" placeholder="发表评论" :focus="one" @input="toooo" @confirm="confirm" v-model="oneaaa"
					 confirm-type="send" />

				</view>
			</view>
			<view class="pinglun" v-for="(item,index) in fals" :key="index">
				<view class="touxiang">
					<view class="">
						<image :src="getImgUrl(item.headimg)" style="width: 80upx; height: 80upx; padding-left: 20upx; padding-top: 10upx;"
						 mode=""></image>
					</view>
					<view class="zonga">
						<view class=" ming">
							{{item.truename}}
						</view>
						<view class="faa">
							{{item.time}}
						</view>
					</view>
				</view>
				<view class=" lin">
					评论我： {{item.comment}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import util from "../../../common/util.js"
	import request from "../../../store/http.js"
	export default {
		data() {
			return {
				name: '',
				shijian: '',
				jineto: '',
				info: {image_url:""},
				juli: '',
				shuo: '',
				url: this.$store.state.url,
				headimg: '',
				weizhi: '',
				yan: '',
				imageto: '',
				to: [],
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

			var redpack_id = option.id;
			that.idto = option.id;

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
				url: this.url + '/api/hongbao/redPackInfo',
				data: {
					redpack_id: redpack_id
				},
				header: {
					// authtoken: authtoken
				},
				success: (res) => {
					console.log(res.data.data);
					this.info = res.data.data;
					that.jineto = res.data.data.one_money;
					that.headimg = res.data.data.giveOut_headimg;
					that.name = res.data.data.giveOut_truename;
					that.shijian = res.data.data.create_time;
					that.juli = res.data.data.distance;
					that.shuo = res.data.data.content;
					that.weizhi = res.data.data.address;
					that.yan = res.data.data.page_view;
					that.to = res.data.data.image_url.split(",");
				}
			});
			// var  id=295;
			uni.request({
				url: this.url + '/api/hongbao/redpackCommentList',
				method: 'post',
				header: {
					// authtoken: authtoken
				},
				data: {
					redpack_id: redpack_id,

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
				url: this.url + '/api/hongbao/redPackLog',
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
			/* 隐藏凸起图标 */
			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			setTimeout(function() {
				if (icon)
					icon.hide();
			}, 100);
			// #endif

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
			convertTimeToFormat(t) {
				return util.convertTimeToFormat(t)
			},
			getdes() {
				if (2 == this.info.location_type) {
					if (1 == this.info.area_id) {
						return "全国可领";
					} else {
						return "全市可领";
					}
				} else {
					return this.info.distance + "公里可领";

				}
			},
			// onee(){
			// 	this.one=0
			// },
			// oneee(){
			// 	this.one=1
			// },
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
					url: this.url + '/api/hongbao/redpackComment',
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
							url: this.url + '/api/hongbao/redpackCommentList',
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
				console.log(this.idto)
				uni.redirectTo({
					url: '../../lingqu/lingqu?name=' + this.name + '&imgto=' + this.headimg + '&juli=' + this.juli + '&jine=' + this
						.jineto +
						'&idto=' + this.idto
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.lingqulist {
		flex: 1;
		flex-direction: row;
		display: flex;
		overflow: hidden;
		white-space: nowrap;
	}

	.clear::after {
		content: "";
		clear: both
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
			width: 100%;
			display: flex;

			align-items: center;

			.img {
				width: 50rpx;
				height: 50rpx;
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
					font-size: 30rpx;
				}

				.shijian {
					font-size: 20rpx;
					color: #808080;
				}
			}
		}

		.jine {
			text-align: right;
			font-size: 60rpx;

			text {
				font-size: 60rpx;
				color: #EF5350;
			}

			.info {
				font-size: 20rpx;
				color: #333333;
			}
		}
	}

	.xianzhi {
		font-size: 26rpx;
		margin: 20rpx 0;
		color: #333333;
	}

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
		width: 100%;
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

	.touxiang {
		display: flex;

	}

	.lin {
		margin-left: 80upx;
		font-size: 30upx;
	}

	.ming {
		padding-top: 10upx;
		font-size: 30upx;
		color: #333333;
	}

	.faa {
		padding-top: 10upx;
		font-size: 25upx;
		color: #333333;
	}

	.zonga {
		padding-left: 10upx;
	}

	.pinglun {
		margin-top: 10upx;
		z-index: 9;
		border-bottom: 3upx solid #dddddd;
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

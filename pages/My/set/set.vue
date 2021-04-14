<template>
	<view>
		<view class="content">
			<view class="list" @click="xiangce">

				<view class="title">头像</view>

				<image src="../../../static/home/right.png" class="right">

			</view>
			<view class="list" @click="ziliao">
				<view class="title">个人资料</view>
				<image src="../../../static/home/right.png" class="right">
			</view>
			<view class="list" @click="mima">
				<view class="title">密码设置</view>
				<image src="../../../static/home/right.png" class="right">
			</view>
			<!-- <view class="list">
					<view class="title">设置新支付密码</view>
					<view class="right"><image src="../../../static/home/right.png" style="width:14upx ;height:26upx ;"></view>
			</view> -->
			<!-- #ifdef APP-PLUS -->
			<view class="list" @click="guanyu">
				<view class="title">检查更新</view>
				<image src="../../../static/home/right.png" class="right">
			</view>
			<!-- #endif -->
			
			<!-- #ifdef MP-WEIXIN -->
			<view class="list" @click="guanyu">
				<view class="title">APP下载</view>
				<image src="../../../static/home/right.png" class="right">
			</view>
			<!-- #endif -->
			
			<view class="list" @click="fankui">
				<view class="title">意见反馈</view>
				<image src="../../../static/home/right.png" class="right">
			</view>
			<view class="list" @click="guanwang">
				<view class="title">公司官网</view>
				<image src="../../../static/home/right.png" class="right">
			</view>
		</view>
		<view class="titlee" @click="qh">切换账号</view>
		<view class="t" @click="Exit">退出登录</view>

	</view>
</template>

<script>
	import request from '../../../store/http.js'
	export default {
		data() {
			return {
				url: this.$store.state.url,
				username: '',
				phone: '',
				photoImg: ""
			};
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
		onLoad(e) {
			// console.log(e)
			// this.username = e.username
			// this.phone = e.tel
			// console.log('infor', this.$store.state.userInfor);
		},
		methods: {
			guanwang(){
				uni.navigateTo({
					url:"../xieyi/xieyi?title=公司官网&src=https://www.aiznkj.net/ph"
				})
			},
			xiangce() {
				var token = uni.getStorageSync("authtoken")
				console.log(token)
				var salf = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [], //从相册选择
					success: (res) => {
						var img = res.tempFilePaths
						console.log('imgtoken', token);
						uni.uploadFile({
							url: this.url + '/api/member/edithead',
							filePath: img[0],
							name: 'file',


							method: "POST",
							header: {
								authtoken: token
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes)
								var json = JSON.parse(uploadFileRes.data);
								uni.showToast({
									title: json.msg,icon:"none"
								})


							}
						});

					}
				});
			},
			qh(){
				if(uni.getStorageSync("users"))
				uni.navigateTo({
					url:"../Login-registration/select"
				})
				else {
					uni.navigateTo({
						url:"../Login-registration/login"
					})
				}
			},
			Exit: function() {
				this.logOut()
			},
			ziliao: function() {
				uni.navigateTo({
					url: '/pages/My/Personal-data/Personal-data?' //跳转个人资料页面
				})
			},
			mima: function() {
				uni.navigateTo({
					url: '/pages/My/Password/Password?phone=' + this.phone //跳转密码设置
				})
			},
			guanyu: function() {
				// #ifdef APP-PLUS
				uni.navigateTo({
					url: '/pagesA/update/index' //跳转检查更新
				})
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url: './downloadCode/downloadCode' //跳转下载二维码
				})
				// #endif
			},
			fankui: function() {
				uni.navigateTo({
					url: '/pages/My/feedback/feedback' //跳转意见反馈
				})
			},
			// 退出登录接口
			logOut() {
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + "/api/member/loginout", {}, {
						authtoken: authtoken
					},
					'POST',
					(res) => {
						
						if (res.data.code == 1) {
								let u = uni.getStorageSync("users")
							let phone =	uni.getStorageSync("phone");
							let list ;
								if (u)
									list = JSON.parse(u)
								else list = [];
							
								for (var i = 0; i < list.length; i++) {
									if(list[i].phone ==phone )
									{
										list.splice(i,1)
										
									}
								}
								uni.setStorageSync("users",JSON.stringify(list))
							uni.removeStorageSync("authtoken");
						
						
							uni.navigateBack({
								
							});
							// uni.navigateTo({
							// 	url: '/pages/My/Login-registration/Login-registration' //退出登录
							// })
						} else {
							uni.navigateTo({
								url: '/pages/My/Login-registration/Login-registration' //退出登录
							})
						}
					}
				)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}


	.list {
		margin-right: 30upx;
		height: 90upx;
		flex-direction: row;
		display: flex;
		margin-top: 10upx;
		justify-content: center;
		align-items: center;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		margin-left: 30upx;

		.title {
			margin-left: 20upx;
			flex: 1;
			font-size: 30upx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: rgba(83, 83, 83, 1);


		}

		.right {
			margin-right: 20upx;
			width: 14upx;
			height: 26upx;

		}
	}

.titlee {
		margin-top: 120upx;
		background: #fff;
		border: 1rpx solid $uni-color-primary;
		box-shadow: 0px 2upx 4upx 0px rgba(0, 0, 0, 0.28);
		border-radius: 10upx;
		margin-left: 30upx;
		margin-right: 30upx;
		font-size: 30upx;
		font-family: PingFangSC-Regular, PingFang SC;
		color: $uni-color-primary;
		height: 90upx;
		line-height: 90upx;
		justify-content: center;
		text-align: center;
		align-items: center;
	}

	.t {
		margin-top: 20upx;
		background: $uni-color-primary;
		box-shadow: 0px 2upx 4upx 0px rgba(0, 0, 0, 0.28);
		border-radius: 10upx;
		margin-left: 30upx;
		margin-right: 30upx;
		font-size: 30upx;
		font-family: PingFangSC-Regular, PingFang SC;
		color: rgba(255, 255, 255, 1);
		height: 90upx;
		line-height: 90upx;
		justify-content: center;
		text-align: center;
		align-items: center;
	}
</style>

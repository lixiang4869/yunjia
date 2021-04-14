<template>
	<view class="quan">
		<image class="login-img" src="../../../static/logo.png" mode=""></image>
		<view class="login-txt">
			智慧生活 便利你我
		</view>
		<!-- #ifdef MP-WEIXIN -->

		<button class="img2" open-type="getUserInfo" @getuserinfo="getwx">
			<image src="../../../static/my/wxwhite.png" class="btn-img"></image>
			<text class="wxtxt">微信登录</text>
		</button>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<button class="img2" open-type="getUserInfo" @tap="getwx">
			<image src="../../../static/my/wxwhite.png" class="btn-img"></image>
			<text class="wxtxt">微信登录</text>
		</button>
		<!-- #endif -->
		<view class="login-phone" @click="gophonelogin">
			<image src="../../../static/shouji.png"></image>
			<text>手机号登录</text>
		</view>
	</view>

</template>
<script>
	import request from '../../../store/http.js'
	export default {

		data() {
			return {
				checked: true,
				Inv: 0,
				Invv: 0,
				see: true,
				yan: '/static/my/yan.png',
				phoneNumber: "",
				phoneNumbers: "",
				/* username:"", */
				code: null,
				passwd: "",
				password: "",
				getCodeText: '获取验证码',
				getCodeBtnColor: "#FFFFFF",
				getCodeisWaiting: false,
				url: this.$store.state.url,
				parentsid: 117
			};
		},
		onLoad(e) {
			
			if(e.q){
				
				this.parentsid = decodeURIComponent(e.q).split("=")[1];
				uni.showModal({
					title:"parentsid= "+this.parentsid +" e.q="+e.q
				})
			}else{
				this.parentsid = uni.getStorageSync("parentsid")
			}
			
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
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			this.back();
			return true;
		},
		methods: {
			gophonelogin(){
				uni.navigateTo({
					url:"./login"
				})
			},
		
			getwx() {
				uni.showLoading({
					title: '微信登录中'
				});
				let _this = this;
				uni.login({
					provider: 'weixin',
					scopes:"auth_user",
					success: function(loginRes) {
						console.log("getwx",loginRes)
						// #ifdef APP-PLUS
						_this.getWxInfo(loginRes.authResult.access_token, loginRes.authResult.openid);
						// #endif
						// #ifdef MP-WEIXIN
						uni.getUserInfo({
							success(e) {
								// console.log("ffff",e.encryptedData);
								// console.log("eeee",e.rawData);
								// let info=	JSON.parse(e.rawData);

								_this.getWxInfoByCode(e.encryptedData, e.iv, loginRes.code, e.userInfo.nickName, e.userInfo.avatarUrl);

							},
							fail(e) {
								uni.hideLoading();
								console.log(e)
							}
						});

						// #endif
						// 获取用户信息
						//  uni.getUserInfo({
						//    provider: 'weixin',
						//    success: function (infoRes) {


						//      console.log('用户昵称为：' + infoRes.userInfo.toString());
						//    } 
						//  });
					},
					fail(e) {
						uni.hideLoading();
					}
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			
		
			getWxInfo(access_token, openid) {

				request.urlRequest(this.url + '/api/login/loginOrRegister', {
					trade_type: 1,
					access_token: access_token,
					openid: openid,
					parentsid: this.parentsid
				}, {}, 'POST', res => {
					console.log(res);


					uni.hideLoading();
					if (res.data.code == 200) {
						uni.setStorageSync("refresh", true);
						uni.setStorageSync("authtoken", res.data.data.authtoken);
						// #ifdef MP-WEIXIN
						uni.navigateBack({
						
						});
						// #endif
						// #ifdef APP-PLUS
						
						if (res.data.data.phone == null || res.data.data.phone == 0) {
							uni.navigateBack({
						
							});
							// uni.navigateTo({
							// 	url: '../Modify-phoneNumber/Modify-phoneNumbers'
							// })
						} else {
							uni.setStorageSync("phone", res.data.data.phone);
						
							uni.navigateBack({
						
							});
						}
						// #endif
						
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						}, );
					}

				})


			},
			getWxInfoByCode(encryptedData, iv, code, nickname, headImg) {
				
				request.urlRequest(this.url + '/api/login/loginOrRegister', {
					encryptedData: encryptedData,
					iv: iv,
					trade_type: 2,
					code: code,
					nickname: nickname,
					headimgurl: headImg,
					parentsid: this.parentsid
				}, {}, 'POST', res => {
					uni.hideLoading();
					if (res.data.code == 200) {
						uni.setStorageSync("refresh", true);
						uni.setStorageSync("authtoken", res.data.data.authtoken);
						this.$conn.open({
							apiUrl: this.$im.config.apiURL,
							user: res.data.data.uid,
							pwd: "123456",
							grant_type: "password",
							appKey: this.$im.config.appkey
						});
						if (res.data.data.phone == null || res.data.data.phone == 0) {
							var pages = getCurrentPages();
							console.log("pages",pages)
							if(pages.length==1){
								uni.switchTab({
									url:"../../Shop/index/index"
								})
							}else{
								uni.navigateBack({
							
							});
							}
							
							uni.navigateTo({
								url: '../Modify-phoneNumber/Modify-phoneNumbers'
							})
						} else {
							
							uni.setStorageSync("phone", res.data.data.phone);
							var pages = getCurrentPages();
							
							if(pages.length==1){
								uni.switchTab({
									url:"../../Shop/index/index"
								})
							}else{
								uni.navigateBack({
							
							});
							}
						}
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						}, );
					}

				})


			},

			}
	};
</script>

<style lang="scss">
	.quan {
		display: flex;
		width: 100%;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	.login-txt {
		margin-top: 44rpx;
		font-size: 33rpx;
		color: #999999;
	}

	.img2 {

		margin-top: 260rpx;
		background-image: url(https://xin.yiyunoto.com/uploads/static/lgbtn.png);
		line-height: 100rpx;
		display: flex;
		background-position: center;
		// background-color: #007AFF;	
		justify-content: center;
		align-items: center;
		border-radius: 50upx;
		height: 100rpx;
		width: 518rpx;
	}


	.btn-img {

		position: relative;
		width: 58rpx;
		height: 48rpx;
		margin-right: 23rpx;
	}

	// logo大小
	.login-img {
		width: 189rpx;
		height: 189rpx;
		align-items: center;
		justify-content: center;
		margin-top: 140rpx;
	}

	.wxtxt {
		color: #ffffff;
		font-size: 30rpx;
	}
	.login-phone {
		align-items: center;
		justify-content: center;
		margin-top: 286rpx;
		display: flex;
		flex-direction: row;

		image {
			width: 22rpx;
			height: 36rpx;
		}

		text {
			margin-left: 24rpx;
			color: #000000;
			font-size: 30rpx;
		}
	}
</style>

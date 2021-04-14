<template>
	<view class="quan">
		<!-- 头部 -->

		<view class="top">


			<!-- 新页面 -->

			<view class="login-img">
				<image src="../../../static/logo.png" mode=""></image>
			</view>
			<view class="top_nav">

			</view>
		</view>
		<!-- 申请登录浮动框 -->
		<view class="float">
			<view class="float_tatal">
				<form @submit="formSubmit">

					<view class="login_tel">
						<input type="number" maxlength="11" name="tel" placeholder="请输入手机号码" placeholder-style="color:#999999 ;" v-model="phoneNumbers" />
						<image src="../../../static/my/user2.png" class="img">
					</view>

					<view class="login_pass">
						<!-- <image src="../../static/login/mm.png" class="img"> -->
						<input class="login_password" type="text" name="password" :password="see" v-model="password" placeholder="请输入您的密码"
						 placeholder-style="color:#999999 ;" />

						<image class="img" :src="yan" @tap="login_look" />

					</view>

					<view><button type="none" class="btn" form-type="submit">登录</button></view>
					<view class="yinsi">
						<image :src="checked?'/static/selected.png':'/static/select.png'" mode="aspectFit" @click="check"></image>
						<text class="t">同意</text>
						<text @click="goxieyi" class="t1">用戶协议</text>
						<text class="t">与</text>
						<text @click="goyinsi" class="t1">隐私政策</text>
					</view>

					<!-- <view class="right-login">
						<view class="">手机验证码登录</view>
					</view> -->
					<view class="login">
						<!-- <view class="register" @click="register">注册账号</view>
						<view class="sep">|</view> -->
						<view class="forget" @click="go_forget">忘记密码？</view>
					</view>

				</form>
			</view>

		</view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- <button class="img2" open-type="getUserInfo" @getuserinfo="getwx" /> -->
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<!-- <button class="img2" open-type="getUserInfo" @tap="getwx" /> -->
		<!-- #endif -->

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
				parentsid: null
			};
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
			this.parentsid = uni.getStorageSync("parentsid")
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			this.back();
			return true;
		},
		methods: {

			goxieyi() {
				uni.navigateTo({
					url: "../xieyi/xieyi"
				})
			},
			goyinsi() {
				uni.navigateTo({
					url: "../xieyi/yinsi"
				})
			},
			check() {
				this.checked = !this.checked
			},
			getwx() {
				console.log('22222222');
				uni.showLoading({
					title: '微信登录中'
				});
				let _this = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes);
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
						console.log(e);
					}
				});
			},
			back() {
				uni.navigateBack({
					delta: 2
				});
			},
			changeTab(Invv) {
				that.navIdx = Invv;
			},
			yzm() {

				if (this.getCodeisWaiting) {
					return
				}
				// this.getCode()
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))) {
					uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
				} else {
					request.urlRequest(
						this.url + '/api/login/smsSend', {
							phone: this.phoneNumber,
						}, {},
						'POST',
						(res) => {
							console.log(res.data.msg);
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
						}
					)
				}
			},
			wangji() {

				uni.navigateTo({
					url: '/pages/My/Login-registration/Forget-password'
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
						if (res.data.data.phone == null || res.data.data.phone == 0) {
							uni.navigateBack({
								delta: 2
							});
							// uni.navigateTo({
							// 	url: '../Modify-phoneNumber/Modify-phoneNumbers'
							// })
						} else {
							uni.setStorageSync("phone", res.data.data.phone);

							uni.navigateBack({
								delta: 2
							});
						}
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						}, );
					}

				})


			},
			getWxInfoByCode(encryptedData, iv, code, nickname, headImg) {
				console.log("", encryptedData);
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
						if (res.data.data.phone == null || res.data.data.phone == 0) {
							uni.navigateBack({
								delta: 2
							});
							uni.navigateTo({
								url: '../Modify-phoneNumber/Modify-phoneNumbers'
							})
						} else {
							uni.setStorageSync("phone", res.data.data.phone);

							uni.navigateBack({
								delta: 2
							});
						}
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						}, );
					}

				})


			},

			// 确认登录单机事件
			formSubmit() {
				// #ifdef APP-PLUS
				var info = plus.push.getClientInfo();
				console.log(JSON.stringify(info));
				// #endif
				if (!this.phoneNumbers) {
					uni.showToast({
						title: "手机号不能为空",
						icon: "none"
					})
					return;
				}
				if (!this.password) {
					uni.showToast({
						title: "密码不能为空",
						icon: "none"
					})
					return;
				}


				if (!this.checked) {
					uni.showToast({
						title: "请同意隐私政策",
						icon: "none"
					})
					return;
				}
				request.urlRequest(
					this.url + "/api/login/login", {
						phone: this.phoneNumbers,
						pwd: this.password
					}, {},
					'POST',
					(res) => {
						console.log(res);
						if (res.data.code == 200) {
							uni.setStorageSync("refresh", true);
							uni.setStorageSync("authtoken", res.data.data.authtoken);
							uni.setStorageSync("phone", res.data.data.phone);
							uni.setStorageSync("uid", res.data.data.uid);
							let u = uni.getStorageSync("users")
							let list;
							if (u)
								list = JSON.parse(u)
							else list = [];
							let user = {}
							user.phone = this.phoneNumbers
							user.pwd = this.password
							let k=-1;
							for (var i = 0; i < list.length; i++) {
								if(list[i].phone ==user.phone )
								{
									k==i ;
									list[i].pwd= this.password;
								}
							}
							if(k==-1)
							list.push(user)
							
							uni.setStorageSync("users", JSON.stringify(list));
							this.$conn.open({
								apiUrl: this.$im.config.apiURL,
								user: res.data.data.uid,
								pwd: "123456",
								grant_type: "password",
								appKey: this.$im.config.appkey
							});
							uni.navigateBack({
								delta: 2
							});
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							}, );
						}
					}
				)
			},
			login_look: function() {
				this.see = !this.see
				if (this.see == false) {
					this.yan = '/static/my/yans.png'
				} else {
					this.yan = '/static/my/yan.png'
				}
			},
			register: function() {
				uni.navigateTo({
					url: "../register/register"
				})
			},
			go_forget: function() {
				uni.navigateTo({
					url: "../Login-registration/Forget-password"
				})
			},
			getCode() {
				this.getCodeText = "发送中..."
				this.getCodeisWaiting = true;
				this.getCodeBtnColor = "color:rgba(245,139,35,1);"
				//示例用定时器模拟请求效果
				setTimeout(() => {
					uni.showToast({
						title: '验证码已发送',
						icon: "none"
					});
					this.setTimer();
				}, 1000)
			},
			setTimer() {
				let holdTime = 60;
				this.getCodeText = "重新获取(60)"
				this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						this.getCodeisWaiting = false;
						this.getCodeBtnColor = "#ffffff";
						this.getCodeText = "获取验证码"
						clearInterval(this.Timer);
						return;
					}
					this.getCodeText = "重新获取(" + holdTime + ")"
					holdTime--;
				}, 1000)
			},
		}
	};
</script>

<style lang="scss">
	.yinsi {
		flex-direction: row;
		display: flex;
		align-items: center;
		margin-top: 20upx;

		image {
			margin-right: 20upx;
			margin-left: 40upx;
			width: 40upx;
			height: 40upx;
		}



	}

	.t {
		font-size: 26upx;
		color: #999999;
	}

	.t1 {
		font-size: 26upx;
		color: #999999;
		text-decoration: underline;
	}

	.quan {
		display: flex;
		width: 100%;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	// logo大小
	.login-img {
		width: 18vw;
		height: 18vw;
		margin: 0 auto;
		// vertical-align: middle;
		margin-top: 40px;

	}

	image {
		width: 20vw;
		height: 20vw;
	}

	.top {
		width: 100%;
		height: 250upx;
		margin-top: 30px;
	}

	.top_bj_img {
		width: 100%;
		height: 100%;
	}

	.saoyisao {
		width: 50upx;
		height: 50upx;


	}

	.top_nav {
		width: 100%;
		height: 100upx;
		position: absolute;
		top: 20upx;
		padding-top: 50upx;
		padding-left: 20upx;
		box-sizing: border-box;
	}

	.top_left {
		padding: 20upx;
		float: left;
		box-sizing: border-box;
	}

	.top_right {
		float: right;
		width: 100upx;
		margin-right: 20upx;
		color: #FFFFFF;
	}

	.float {
		margin-top: 40upx;
		;
		width: 100%;
		/* box-shadow: 0upx 2upx 5upx #0C0800; */
		/* border-radius: 10upx; */
		/* margin-left: 5%; */
		/* padding-bottom: 50upx; */
		position: relative;
		/* top: -200upx; */
		background: #FFFFFF;
	}

	/* 登录项浮动框 */
	.login_top {
		width: 90%;
		height: 180upx;
		margin: 0 auto;
	}

	.img {
		width: 27upx;
		height: 27upx;


		position: absolute;
		right: 90upx;
		float: right;
	}

	.img2 {
		background-image: url(../../../static/my/wx.png);

		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		plain: true;
		outline: none;
		border: none;
		margin-top: 100upx;
		width: 100upx;
		height: 100upx;
		border-radius: 50upx;


	}

	.login_tel,
	.login_pass {
		width: 90%;
		height: 90upx;
		padding: 18upx 40upx;
		margin-left: 5%;

		font-size: 32upx;
		box-sizing: border-box;
		align-items: center;
		display: flex;
		flex-direction: row;
		color: #333333;
		// border-bottom: 2upx solid #DBDADA;
		border: 2upx solid #efeeee;
		background-color: #efeeee;
		border-radius: 8upx;
		outline: 0;
	}

	.uni-input-placeholder {
		font-size: 32upx;
		color: #a2a1a1;
	}

	.login_pass {
		// width: 80%;
		// height: 100upx;
		// padding: 30upx 100upx;
		// margin-left: 10%;
		// box-sizing: border-box;
		// border-bottom: 2upx solid #DBDADA;
		margin-top: 10px;
	}

	.login_password {
		width: 80%;
		float: left;

	}

	.yan {
		width: 27upx;
		height: 27upx;

	}

	.loginsee_btn {
		width: 20%;
		font-size: 20upx;
		text-align: right;
		float: right;
	}

	.forget_pass {
		padding: 50upx;
		box-sizing: border-box;
		color: blue;
		font-size: 26upx;
	}

	.btn {
		font-size: 32upx;
		width: 90%;
		margin-left: 5%;
		height: 90upx;
		line-height: 90upx;
		color: #FFFFFF;
		border-radius: 10upx;
		background: #fe2b10;
		margin-top: 60upx;
	}

	.login {
		display: flex;
		color: #333333;
		font-size: 25upx;
		justify-content: center;
		align-items: center;

		width: 100%;
		margin-top: 50upx;
	}

	.register,
	.sep,
	.forget {
		padding: 0 10px;
		margin-top: 20px;
		font-size: 28upx;
	}
</style>

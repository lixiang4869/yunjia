<template>
	<view class="content">
		<view class="title">请重新编辑您的密码</view>
		<view class="title2">建议您的新密码以简单好记为标准</view>
		<view class="username">
			<input placeholder="请输入您的手机号" v-model="phoneNumber" maxlength="11" placeholder-style="font-size:28upx;font-family:Source Han Sans CN;color:#999999" />
		</view>
		<view class="code">
		
				<input placeholder="请输入验证码" v-model="code" placeholder-style="font-size:28upx;font-family:Source Han Sans CN;color:#999999" />
				<!-- 	<view class="vual"> -->
				<view class="codes" :style="{'color':getCodeBtnColor}" @click.stop="yzm">{{getCodeText}}</view>
				<!-- <view class="get-code" :style="{ 'color': getCodeBtnColor }" @click.stop="yzm()">{{ getCodeText }}</view> -->
				<!-- </view> -->
		</view>
		<view class="password">
		
				<input placeholder="请输入新的登录密码" type="number" maxlength="16" v-model="passwd" :password="see" placeholder-style="font-size:26upx;font-family:Source Han Sans CN;color:rgba(168,167,167,1)" />
		</view>
		<view class="password">
	
			<input placeholder="请再次输入新的登录密码" type="number" maxlength="16" v-model="passwds" :password="see" placeholder-style="font-size:26upx;font-family:Source Han Sans CN;color:rgba(168,167,167,1)" />
		</view>
		<button class="button" @click="queren">提交</button>
	</view>
</template>
<script>
	import request from '../../../store/http.js';
	export default {
		data() {
			return {

				see: true,
				phoneNumber: "",
				code: '',
				passwd: "",
				passwds: "",
				getCodeText: '获取验证码',
				getCodeBtnColor: "#fe2b10",
				getCodeisWaiting: false,
				url: this.$store.state.url
			};
		},
		onLoad() {

		},
		methods: {
			yzm() {
				if (this.getCodeisWaiting) {
					return;
				}
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber)) {
					uni.showToast({
						title: '请填写正确手机号码',
						icon: 'none'
					});
				} else {
					this.getCodeText = '发送中...';
					this.getCodeisWaiting = true;
					this.getCodeBtnColor = '#999999;';
				
					
					request.urlRequest(
						this.url + '/api/login/smsSend', {
							phone: this.phoneNumber,
						},{},
						'POST',
						(res) => {
						setTimeout(() => {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							this.setTimer();
						}, 1000);
							
						}
					)
				}
			},
			queren() {
				console.log(this.phoneNumber, this.code, this.passwd, this.passwds)
				let authtoken1 = uni.getStorageSync("authtoken");
				console.log("authtoken", authtoken1)
				request.urlRequest(
					this.url + '/api/login/findpwd', {
						phone: this.phoneNumber,
						code: this.code,
						pwd: this.passwd,
						repwd:this.passwds,
					}, {},
					'POST',
					res => {
						console.log('找回密码', res, res.data.msg);
						if (res.data.code == 1) {
							uni.showToast({
									title: res.data.msg,
									icon: "none",
									success() {
										uni.navigateBack({
											
										})
									}
								},

							);

						} else {
							console.log(res.data.msg)

							uni.showToast({
								title: res.data.msg,
								icon: "none"
							}, );
						}



					}
				);
},





			setTimer() {
				let holdTime = 60;
				this.getCodeText = '重新获取(60)';
				this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						this.getCodeisWaiting = false;
						this.getCodeBtnColor = '#fe2b10';
						this.getCodeText = '获取验证码';
						clearInterval(this.Timer);
						return;
					}
					this.getCodeText = '重新获取(' + holdTime + ')';
					holdTime--;
				}, 1000);
			}

		}
	};
</script>

<style lang="scss">
	.content {
		background: #ffffff;
		width: 100%;
		height: 100%;
	}

	.title {
		margin-top: 40upx;
		margin-left: 18upx;
		color: #333333;
		font-size: 35upx;
		font-weight: 600;
	}

	.title2 {
		margin-top: 20upx;
		margin-left: 18upx;
		color: #999999;
		font-size: 25upx;

	}

	.username
		{
		height: 90upx;
		margin-top: 80upx;
		margin-left: 19upx;
		margin-right: 19upx;
		background: #F5F6F7 ;
		display: flex;
		align-items: center;
		border-radius: 8px;

		input {
			font-size: 28upx;
			color: #000000;
			padding-left: 29upx;
		
		}
	}
.code

		{
			
		height: 90upx;
		margin-top: 30upx;
		margin-left: 19upx;
		margin-right: 19upx;
		background: #F5F6F7 ;
		display: flex;
		align-items: center;
		border-radius: 8px;
		
		input {
			flex: 1;
			font-size: 28upx;
			color: #000000;
			padding-left: 29upx;
		
		}
	}
	.password
	
			{
				
			height: 90upx;
			margin-top: 30upx;
			margin-left: 19upx;
			margin-right: 19upx;
			background: #F5F6F7 ;
			display: flex;
			align-items: center;
			border-radius: 8px;
			
			input {
				flex: 1;
				font-size: 28upx;
				color: #000000;
				padding-left: 29upx;
			
			}
		}
	
	.button {
	
		height: 90upx;
		margin-top: 90upx;
		margin-left: 19upx;
		margin-right: 19upx;
		font-size: 36upx;
		font-family: Source Han Sans CN;
		background:#fe2b10;
		line-height: 90upx;
		color: #FFFFFF;
		border-radius: 5upx;
	}

	

	.codes {
		margin-right: 20upx;
		line-height: 90upx;
		font-size: 28upx;
		font-family: Source Han Sans CN;
		color: rgba(255, 155, 73, 1);
	}
</style>

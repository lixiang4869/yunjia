<template>
	<view class="forget">
		<view class="con">
			<!-- <view class="go_back" @click="goback">
				<image :src="back" mode=""></image><view class="login-reg">注册</view>
			</view> -->
			
			<view class="login-img">
				<image src="../../../static/logo.png" mode=""></image>
			</view>
			<view class="forget_card">
				<view class="forget_input">
					<input type="number" placeholder="输入您的手机号" maxlength="11" v-model="phoneNumber" />
				</view>
				<view class="forget_input forget_flex">
					<view class="verify-left">
						<input type="number" placeholder="输入验证码" v-model="yanzhengma" />
					</view>
					<!-- 点击获取验证码 -->
					<view class="verify-right">
						<view class="verify-btn" :style="{'color':getCodeBtnColor}" @click.stop="yzm">{{getCodeText}}</view>
					</view>
				</view>
				<view class="forget_input">
					<input  placeholder="输入您的密码" v-model="password" password="true" />
				</view>

			</view>
			<view class="forget_btn">
				<button type="none" class="btn" @click="queren">注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../store/http.js';
	export default {
		data() {
			return {
				back: '../../static/login/back.png',
				password: "",
				passwords: "",
				yanzhengma: "",
				phoneNumber: "",
				getCodeText: '获取验证码',
				getCodeBtnColor: "#fe2b10",
				getCodeisWaiting: false,
				url: this.$store.state.url,
				Timer: null,
				parentsid:""
			}
		},
		onLoad(e) {
			if(e.q){
				
				this.parentsid = decodeURIComponent(e.q).split("=")[1];
				// uni.showModal({
				// 	title:"parentsid= "+this.parentsid +" e.q="+e.q
				// })
			}else{
				this.parentsid = uni.getStorageSync("parentsid")
			}
			
		},
		methods: {
			setTimer() {
				let holdTime = 60;
				this.getCodeText = "重新获取(60)"
				this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						this.getCodeisWaiting = false;
						this.getCodeBtnColor = "#fe2b10";
						this.getCodeText = "获取验证码"
						clearInterval(this.Timer);
						return;
					}
					this.getCodeText = "重新获取(" + holdTime + ")"
					holdTime--;
				}, 1000)
			},
	
		yzm() {
			console.log('getCodeisWaiting', this.getCodeisWaiting);
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

						this.getCodeText = '发送中...';
						this.getCodeisWaiting = true;
						this.getCodeBtnColor = '#999999;';

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

			if (this.passwd !== "") {
			
				request.urlRequest(
					this.url + "/api/login/register", {
						phone: this.phoneNumber,
						code: this.yanzhengma,
						pwd: this.password,
						parentsid:this.parentsid
					}, {},
					'POST',
					(res) => {
						console.log(res.data.msg);
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
						if (res.data.code == 1) {
							if(this.parentsid){
								uni.navigateTo({
									url:"../Login-registration/Login-registration"
								});
							}else
							uni.navigateBack({
								
							});
						}
					}
				)
			} else {
				uni.showToast({
					title: '请输入密码!',
					icon: "none"
				});
			}
		},
		goback() {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
	}
	}
</script>

<style>
	.btn {
		font-size: 30upx;
		width: 90%;
		margin-left: 5%;
		height: 90upx;
		line-height: 80upx;
		color: #FFFFFF;
		border-radius: 10upx;
		background: #fe2b10;
		margin-top: 60upx;
	}

	.login-img {
		width:20vw;
		height: 20vw;
		margin: 0 auto;
		// vertical-align: middle;
		margin-top: 40px;
	}

	image {
		width: 20vw;
		height: 20vw;
	}

	.forget_flex {
		display: flex;
		justify-content: space-between;
	}

	/* 头部布局 */
	.con {
		/* margin: 10px 0 0 10px; */
	}

	.go_back {
		display: flex;
		justify-content: space-between;
	}

	/* 注册字体 */
	.login-reg {
		font-size: 15px;
		margin-right: 10px;
	}

	.go_back image {
		width: 2vw;
		height: 4vw;
		margin-bottom: 20px;
	}

	/*  */
	.font_pas {
		font-size: 16px;
		font-weight: bold;
	}

	.font-segg {
		color: #999999;
		font-size: 12px;
		margin-top: 5px;
	}

	.forget_card {
		margin-top: 45px;
	}

	.forget_input {
		margin-top: 30upx;
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

	.forget_btn {
		padding: 10upx 20upx;
		margin-top: 120upx;
	}
</style>

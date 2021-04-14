<template>
	<view class="content">
		<view class="in">
			<view class="title">提现金额:</view>
			<input class="text" v-model="money" type="digit" maxlength="11" placeholder="请输入提现金额" />
		</view>
		<!-- <text class="wenben">低于¥10无法提现</text> -->
		<button class="tixian" @click="showkey">提现</button>
		<passkeyborad :show="show" :money="money" @onSuccess="tixian" @close="closekey" ref="passkey" @goForget="goforget"></passkeyborad>
	</view>
</template>

<script>
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue'
	import request from '../../../store/http.js'
	export default {
		components: {
			passkeyborad
		},
		data() {
			return {
				show: false,
				money: null,
				url: this.$store.state.url,
				authtoken: uni.getStorageSync("authtoken"),
			}
		},
		methods: {
			goforget(){
				uni.navigateTo({
					url:"../Set-payment-password/Set-payment-password"
				})
			},
			closekey() {
				this.show = false;
			},
			showkey(){
				
				if (!this.money) {
					uni.showToast({
						title: "请输入金额",
						icon: "none"
					});
					return;
				}
				this.show=true;
			},
			tixian(pwd) {

				if (!this.money) {
					uni.showToast({
						title: "请输入金额",
						icon: "none"
					});
					return;
				}
				let _this = this;
				// 、、#ifdef APP-PLUS
				uni.login({
					success(e) {
						// #ifdef MP-WEIXIN

						_this.getPayInfo(e.code, '', pwd, 2);
						// #endif
						// #ifdef APP-PLUS

						_this.getPayInfo('', e.authResult.openid, pwd, 1);
						// #endif
					}
				})
				// 、、#endif
				//、、 #ifndef APP-PLUS
				// uni.showToast({
				// 	title: "只能在APP内提现",
				// 	icon: "none"
				// })
				//、、 #endif
			},
			getPayInfo(code, openid, pwd, trade_type) {

				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + "/api/member/cashOut", {
						trade_type: trade_type,
						openid: openid,
						money: this.money,
						code: code,
						paypwd: pwd
					}, {
						authtoken: authtoken
					}, 'POST', res => {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
						if (res.data.code == 1) {
							this.show = false;
							uni.navigateTo({
								url:"./CashResult"
							})
							// setTimeout(function() {
							// 	uni.navigateBack({

							// 	})
							// }, 500);
						} else {
							this.$refs.passkey.clear();
						}
						// 

					});



			},

		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F4F9;
		height: 100%;
	}

	.text {
		max-lines: 1;
		width: 60%;
		height: 100upx;
		line-height: 100upx;
		float: left;

	}

	.in {
		width: 90%;
		height: 100upx;
		line-height: 100upx;
		margin: 0 auto;
		border-bottom: 2upx solid #F0F0F0;
		color: #5a5a5a;
		font-size: 30upx;
	}

	.title {
		width: 30%;
		float: left;
	}

	.wenben {
		font-size: 28upx;
		font-family: PingFangSC-Regular, PingFang SC;
		color: rgba(245, 139, 35, 1);
		padding-left: 30upx;
		padding-top: 19upx;
	}

	.tixian {
		width: 680upx;
		height: 98upx;
		background: $uni-color-primary;
		border-radius: 10upx;
		margin-top: 241upx;
		font-size: 35upx;

		color: #ffffff;
		text-align: center;
		vertical-align: middle;
		// font-family:PingFangSC-Semibold,PingFang SC;
		line-height: 98upx;
	}

	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

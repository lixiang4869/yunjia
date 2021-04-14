<template>
	<view style="justify-content: center;align-items: center;width: 100%;display: flex;flex-direction: column;">
		<image :src="img" style="width: 200rpx;height: 200rpx;margin-top: 100rpx;"></image>
		<view style="margin-top: 30rpx;font-size: 32rpx; color: #333333;">{{name}}</view>
		<!-- 充值金额 -->
		<view class="block" style="width: 100%;">
			<view class="title">支付金额</view>
			<view class="xia">
				<text class="text">¥</text>
				<view class="input">
					<input placeholder="支付金额" type="digit" v-model="money" placeholder-style=" font-size:28upx;font-family:PingFangSC-Regular,PingFang SC; color:rgba(205,205,205,1); " />
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="btn" @tap="doDeposit">确认支付</view>
			<!-- <web-view src="weixin://wxpay/bizpayurl?pr=kCEcdRL">dianji</web-view> -->
		</view>
	</view>
</template>

<script>
	import request from '../../../store/http.js'
	export default {
		data() {
			return {
				
				
				url: this.$store.state.url, //token路径
				id: 89,
				name:"",
				img:"",
				money:""
			};
		},
		onLoad(e) {
			if (e.q) {

				this.id = decodeURIComponent(e.q).split("=")[1];
				
			}
			this.getData()
		},
		methods: {
			getData(){
				uni.showLoading({
					
				})
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + "/api/member/getUserNameAndHeadImg", {
					id:this.id
					}, {
						authtoken: authtoken
					}, 'POST', res => {
						uni.hideLoading()
					if(res.data.code==1){
						this.name=res.data.data.nickname
						this.img = res.data.data.headimg
						if(this.img.search("http")==-1){
							this.img=this.url+this.img;
						}
					}else{
						uni.showToast({
							title:res.data.msg,icon:"none"
						})
					}
				});
			},
		payXiaoChengXu() {
			let _this = this;
			uni.login({
				success(e) {
					console.log('e', e);
					_this.getPayInfo(2, e.code);
				},
				fail(e) {
					console.log('code', e);
					
				}
		
			})
		},
		getPayInfo(type, code) {
			let _this =this;
			// let leader =uni.getStorageSync("Leaders") ;
			// let id;
			// if(leader!=null) id= leader.id
			let authtoken = uni.getStorageSync("authtoken");
			request.urlRequest(
				this.url + "/api/member/transferMoneyToUser", {
					// trade_type: type,
					id: this.id,
					money:this.money,
					code: code,
					// from_uid:id
				}, {
					// authtoken: authtoken
				}, 'POST', res => {
					console.log(res);
					// 微信支付
					if (res.data.code == 1) {
						console.log("返回请求成功", res.data.data.nonceStr)
						uni.getProvider({
								service: "payment",
								success: (res) => {
									console.log(res);
								}
							}),
		
		
							uni.requestPayment({
								provider: 'wxpay',
		
								"signType": 'MD5',
								"nonceStr": res.data.data.nonceStr,
								"package": res.data.data.package,
		
								"timeStamp": res.data.data.timeStamp,
								"paySign": res.data.data.paySign,
								success: function(res) {
									
									// uni.showToast({
									// 	title:"支付成功" ,icon:"none",
									// 	duration:1000
									// })
									uni.navigateTo({
										url:"./Pay_success"
									})
								},
								fail: function(err) {
									console.log(err);
								}
							});
		
					}
		
				});
		
		
		
		},
			/* 判断输入金额是否正确 */
			doDeposit() {
				if (parseFloat(this.money).toString() == "NaN") {
					uni.showToast({
						title: '请输入正确金额',
						icon: 'none'
					});
					return;
				}
				if (this.money <= 0) {
					uni.showToast({
						title: '请输入大于0的金额',
						icon: 'none'
					});
					return;
				}
				if (parseFloat(this.money).toFixed(2) != parseFloat(this.money)) {
					uni.showToast({
						title: '最多只能输入两位小数哦~',
						icon: 'none'
					});
					return;
				}
				this.payXiaoChengXu();
			}
		},
		
	}
</script>

<style lang="scss">
	.block {
		.title {
			width: 100%;
			font-size: 32upx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: bold;
			color: rgba(41, 41, 41, 1);
			padding-top: 30upx;
			padding-left: 30upx;
		}

		.content {
			.my {
				width: 100%;
				height: 120upx;
				display: flex;
				align-items: center;
				font-size: 30upx;
				border-bottom: solid 1upx #eee;
			}

			.pay-list {
				width: 100%;

				.row {
					width: 100%;
					height: 90upx;
					display: flex;
					align-items: center;
					border-bottom: 1upx solid #E6E6E6;

					.left {
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						align-items: center;

						image {
							width: 36upx;
							height: 36upx;
							padding-left: 35upx;
						}
					}

					.center {
						width: 100%;
						font-size: 28upx;
						font-family: PingFangSC-Regular, PingFang SC;
						color: rgba(41, 41, 41, 1);
					}

					.right {
						width: 100upx;
						flex-shrink: 0;
					}
				}
			}
		}
	}

	.pay {
		margin-top: 190upx;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;

		.btn {
			width: 680upx;
			height: 98upx;
			background: $uni-color-primary;
			border-radius: 10upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			font-size: 35upx;
			font-family: PingFangSC-Semibold, PingFang SC;
			line-height: 49px;
		}
	}

	.xia {
		display: flex;
		border-bottom: 2rpx solid #eeeeee;
		padding-top: 20upx;
		margin-left: 30upx;
		align-items: center;
	}

	.text {
		float: left;
		font-weight: bold;
		font-size: 32upx;
		font-family: PingFangSC-Regular, PingFang SC;
		color: rgba(53, 53, 53, 1);
	}

	.input {
		float: left;
		padding-left: 20upx;
		color: $uni-color-primary;
		
		font-size:32upx;
		font-weight: bold;
	}
</style>

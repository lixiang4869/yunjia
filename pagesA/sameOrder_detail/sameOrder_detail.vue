<template>
	<view class="app" >
		<view class="head_bg">
			<view class="head_title">
				<image src="../../static/public/goBack.png" @click="navigateBack"></image>
				<view>订单详情</view>
				<text></text>
			</view>
			<view class="hintBox">
				<view class="hintTxt">
					<text class="hint">请于30分钟内完成付款逾期未付订单自动关闭</text>
				</view>
				<view class="timeBox" v-if="orderDetail.order_button.status == 'waiting_pay' && isShow">
					<view class="minutesBox">
						<text class="timeNum">{{minutes}}</text>
					</view>
					<text class="timeNum">:</text>
					<view class="minutesBox">
						<text class="timeNum">{{seconds}}</text>
					</view>
				</view>
				<view class="StateBox" v-else>
					<view>订单状态</view>
					<view>{{orderDetail.order_button.status_desc}}</view>
				</view>
			</view>
			<!-- 选择地址 -->
			<view class="userInfoBox">
				<view class="userCity">
					<view class="cityTextBox">
						<text class="cityName">收货地址: {{orderDetail.city}}{{orderDetail.area}}{{orderDetail.address}}</text>
						
					</view>
					<text class="phoneName">{{orderDetail.name}} : {{orderDetail.tel}}</text>
					
				</view>
				<view class="payTypeBox">
					<view class="payTypeLeft">
						<text class="payTypeHint">付款方式</text>
						<view class="payType" v-if="orderDetail.order_button.status == 'pay' && orderDetail.pay_type == 0">
							<image  src="../../static/public/wei.png"></image>
							<text>微信支付</text>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="zhanwei"></view>
		<!-- 订单详情 -->
		<view class="items">
			<view class="item" v-for="item in orderDetail.order_detail" :key="item.id">
				<image :src="item.attachment_id"></image>
				<view class="item_r">
					<text>{{item.service_type}}</text>
					<view class="item_r_b">
						<text>{{item.car_num}}</text>
						<text>￥{{item.price}}</text>
					</view>
				</view>
			</view>
			
			<view class="order_det">
				<text>订单编号</text>
				<text>{{orderDetail.order_sn}}</text>
			</view>
			<view class="order_det">
				<text>创建时间</text>
				<text>{{orderDetail.order_detail[0].create_time_text}}</text>
			</view>
			<view class="order_det">
				<text>订单总金额</text>
				<text class="order_price">￥{{orderDetail.price}}</text>
			</view>
			<view class="order_det" v-if="orderDetail.order_button.status_desc == '已支付'">
				<text>实付款</text>
				<text class="order_price">￥{{orderDetail.real_price}}</text>
			</view>
		</view>
		<view class="zhanweifu">
			
		</view>
		<!-- 支付模块 -->
		<view class="payInfoBox">
			<view class="icons">
				<view class="iconitem" @click="kefu">
					<image class="kefuImg" src="../../static/public/kefu.png" mode=""></image>
					<text class="kefuTxt">客服</text>
				</view>
				<view class="iconitem" @click="phone">
					<image class="kefuImg" src="../../static/public/phone.png"></image>
					<text class="kefuTxt">拨打电话</text>
				</view>
			</view>
			<view class="btns">
				<view class="btn" @click="orderOper(i1.key)" v-for="i1 in orderDetail.order_button.buttons" :key="i1.key">
					<text>{{i1.name}}</text>
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
				id: '',
				cityUrl: this.$store.state.cityUrl,
				url: this.$store.state.url,
				minutes:29,
				seconds:59,
				authtoken:'',
				orderDetail: {},
				createTime: null,
				timeCont:'',
				isShow: true,
			}
		},
		onLoad(options) {
			this.id = options.id
			this.authtoken = uni.getStorageSync('authtoken');
			this.getOrderDetail()
			
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
		methods: {
			navigateBack() {
				uni.navigateBack();
			},
			timer() {
				// 现在总小时数
				var nowHouse = parseInt(new Date().getTime()/1000/60/60);
				// 创建时总小时数
				var createHouse = parseInt(this.createTime/60/60);
				// 订单创建总小时数
				var orderHouse = nowHouse - createHouse
				console.log('总小时数', nowHouse, createHouse, orderHouse)
				var nowMinutes = new Date().getMinutes();
				var createMinutes = new Date(this.createTime*1000).getMinutes();
				if(orderHouse == 0) {
					this.minutes = 29 - (nowMinutes - createMinutes);
				} else {
					this.minutes = 29 - (nowMinutes + orderHouse*60 - createMinutes);
				}
				if(this.minutes <= -1) {
					this.minutes = 0;
					this.seconds = 0;
					this.isShow = false;
					return false;
				}
				this.timeCont = setInterval(()=>{
					this.seconds--;
					if(this.minutes >0) {
						if(this.seconds <=0){
							this.seconds = 59
							this.minutes--
						}
					}
					if(this.minutes <=0 && this.seconds <=0) {
						this.minutes = 0;
						this.seconds = 0;
						clearInterval(this.timeCont);
						// this.surecancle(); //超时不取消，隐藏倒计时
						this.isShow = false;
					}
					
				},1000)
				
			},
			// 获取订单详情
			getOrderDetail() {
				console.log(this.id)
				uni.showLoading({
					title: '加载中'
				});
				request.urlRequest(
					this.cityUrl + '/api/order/orderDetail', {
						order_sn: this.id,
					}, {
						authtoken: this.authtoken
					},
					'POST',
					res => {
						uni.hideLoading();
						console.log('订单列表', res);
						console.log(res.data.data)
						this.orderDetail = res.data.data
						this.createTime = res.data.data && res.data.data.create_time
						this.timer()
					}
				);
			},
			// 订单操作
			orderOper(status) {
				if(status == 'to_pay') {
					this.pay(this.id)
				}else if(status == 'cancel_order'){
					this.cancle()
				}else if(status == 'delete_order'){
					this.delete()
				}
			},
			pay(order_sn){
				// #ifdef APP-PLUS
				this.payApp(order_sn);
				// #endif
				// #ifdef MP-WEIXIN
				this.payXiaoChengXu(order_sn);
				// #endif
			},
			payXiaoChengXu(order_sn){
				console.log('微信支付')
				let _this=this;
				uni.login({
					success(e) {
						_this.getPayInfo( e.code,order_sn);
					},
					fail(e) {
						console.log('code', e);
				
					}
				
				})
			},
			getPayInfo(code, order_sn) {
				console.log(code, order_sn)
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.cityUrl + "/api/order_pay/payOrder", {
						pay_type: 0,
						order_sn: order_sn,
						code: code,
						
					}, {
						authtoken: authtoken
					}, 'POST', res => {
						console.log(res);
						// 微信支付
						if (res.data.code == 10000) {
							// console.log("返回请求成功", res.data.data.nonceStr)
							uni.getProvider({
									service: "payment",
									success: (res) => {
										console.log('getProviderres', res);
									},
									fail: function(err) {
										console.log('err',err);
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
									console.log('requestPayment', res)
									uni.navigateTo({
										url: '/pages/My/pay-popup/Pay_success'
									})
								},
								fail: function(err) {
									console.log('err',err);
								}
							});
						}
					});
			},
			payApp(order_sn) {
				console.log('小程序支付')
				let authtoken = uni.getStorageSync("authtoken");
				console.log(authtoken);
				
				uni.request({
			
					url: this.cityUrl+"/api/order_pay/payOrder",
					data: {
						pay_type: 2,
						order_sn: order_sn,
					
						// from_uid:id
					},
					header: {
						authtoken: authtoken
					},
					method: 'POST',
					success: (res) => {
						uni.hideLoading();
						console.log(res)
			
						// 微信支付
						if (res.data.code == 10000) {
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: {
									"appid": res.data.data.appid,
									"noncestr": res.data.data.noncestr,
									"package": "Sign=WXPay",
									"partnerid": res.data.data.partnerid,
									"prepayid": res.data.data.prepayid,
									"timestamp": res.data.data.timestamp,
									"sign": res.data.data.sign
								},
								success: function(res) {
									uni.navigateTo({
										url: '/pages/My/pay-popup/Pay_success'
									})
								},
								fail: function(err) {
					
								}
							});
						}
					},
					fail: (res) => {
						console.log("请求失败", res)
					}
				})
			},
					
			
			
			// 客服
			kefu(){
				uni.showToast({
					icon:'none',
					title:'功能代开发'
				})
			},
			// 电话
			phone(){
				uni.makePhoneCall({
					phoneNumber: '400-0371189',
					success(res) {
						console.log(88888)
						console.log(res)
					}
				})
			},
			// 取消订单
			cancle() {
				uni.showModal({
					title: '提示',
					content: '您将取消这个订单',
					success: res => {
						if (res.confirm) {
							this.surecancle();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 确认取消
			surecancle() {
				request.urlRequest(
					this.cityUrl + '/api/order/cancelOrder', {
						order_sn: this.id
					}, {
						authtoken: this.authtoken
					},
					'POST',
					res => {
						if(res.data.code == 10000) {
							uni.showToast({
								title: res.data.desc,icon:"none"
							})
							setTimeout(()=>{
								uni.navigateTo({
									url: '../sameOrder/sameOrder?id='+this.orderDetail.status
								});
							},800)
						}
					}
				);
			},
			// 删除订单
			delete(serial) {
				uni.showModal({
					title: '提示',
					content: '您将删除这个订单',
					success: res => {
						if (res.confirm) {
							this.suredelete();
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 确认删除
			suredelete(serial) {
				request.urlRequest(
					this.cityUrl + '/api/order/deleteOrder', {
						order_sn: this.id
					}, {
						authtoken: this.authtoken
					},
					'POST',
					res => {
						if(res.data.code == 10000) {
							uni.showToast({
								title: res.data.desc,icon:"none"
							})
							setTimeout(()=>{
								uni.navigateTo({
									url: '../sameOrder/sameOrder?id='+this.orderDetail.status
								});
							},800)
						}
					}
				);
			},
		
		}
	}
</script>

<style lang="less" scoped>
	.app {
		background-color: #f3f3f3;
		height: 100%;
	}
	.head_bg {
		position: fixed;
		left: 0;
		top: 0;
		width: 750rpx;
		height: 440rpx;
		background-color: #E83E25;
	}
	.head_title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 710rpx;
		position: absolute;
		left: 0;
		top: 80rpx;
		padding: 0 20rpx;
		color: #fff;
		>image {
			width: 19rpx;
			height: 34rpx;
			padding-right: 20rpx;
		}
		view{
			font-size: 36rpx;
			font-weight: bold;
		}
		text{
			width: 19rpx;
			height: 34rpx;
		}
	}
	.hintBox{
		position: absolute;
		left: 0;
		top: 210rpx;
		width: 690rpx;
		height: 20rpx;
		padding: 0 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.hintTxt{
		width: 55%;
	}
	.hint{
		font-size: 34rpx;
		color: #FFFFFF;
	}
	.timeBox{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.minutesBox{
		width: 60rpx;
		height: 60rpx;
		border-radius: 10rpx;
		background-color: #af2410;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 0 5rpx;
	}
	.timeNum{
		font-size: 30rpx;
		color: #FFFFFF;
	}
	.StateBox {
		width: 30%;
		color: #fff;
		view:first-child {
			font-size: 34rpx;
		}
		view:last-child {
			font-size: 28rpx;
			color: #fff;
			font-weight: bold;
		}
		
	}
		
	.userInfoBox{
		position: absolute;
		left: 20rpx;
		top: 300rpx;
		width: 710rpx;
		height: 250rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.userCity{
		width: 100%;
		height: 60%;
		border-bottom: 1rpx solid #F4F4F4;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.cityTextBox{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
	}
	.icon {
		width: 13rpx;
		height: 23rpx;
		margin-left: 20rpx;
	}
	.cityName{
		font-size: 30rpx;
		color: #333333;
	}
	.phoneName{
		font-size: 28rpx;
		color: #333333;
		margin-top: 5rpx;
	}
	.payTypeBox{
		width: 100%;
		height: 40%;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	.payTypeLeft{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.payTypeHint{
		font-size: 30rpx;
		color: #333333;
	}
	.payType{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		image {
			width: 48rpx;
			height: 48rpx;
		}
		text {
			margin-left: 20rpx;
			color: #333333;
		}
	}
	.payTypeName{
		font-size: 30rpx;
		color: #333333;
	}
	.zhanwei {
		width: 100%;
		height: 20rpx;
		background-color: #f3f3f3;
		margin-top: 551rpx;
	}
	.items {
		width: 670rpx;
		margin: 0 auto;
		padding: 20rpx;
		border-radius: 18rpx;
		background-color: #fff;
		.item {
			width: 670rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #eee;
			padding: 20rpx 0;
			image {
				width: 126rpx;
				min-width: 126rpx;
				height: 108rpx;
				background-color: #ececec;
				margin-right: 20rpx;
			}
			.item_r {
				flex: auto;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				>text {
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
				}
				.item_r_b {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					text:first-child {
						font-size: 24rpx;
						color: #999999;
					}
					text:last-child {
						font-size: 30rpx;
						font-weight: bold;
						color: #333333;
					}
				}
			}
		}
		.order_det {
			width: 100%;
			height: 50rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30rpx;
			margin-top: 30rpx;
			text:first-child {
				color: #333;
			}
			text:last-child {
				color: #999;
			}
			.order_price {
				font-weight: bold;
				color: #fe5037 !important;
			}
		}
	}
	.zhanweifu {
		width: 750rpx;
		height: 20rpx;
		background-color: #f3f3f3;
		border-bottom: 210rpx solid #f3f3f3;
	}
	.payInfoBox{
		width: 670rpx;
		height: 65rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		padding: 20rpx;
		border-left: 20rpx solid #f3f3f3;
		border-right: 20rpx solid #f3f3f3;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.icons{
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.iconitem{
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.kefuImg{
		width: 40rpx;
		height: 40rpx;
	}
	.kefuTxt{
		font-size: 22rpx;
		color: #666666;
	}
	.btns{
		width: 60%;
		height: 100%;
		display: flex;
		justify-content: flex-end;
		flex-direction: center;
		align-items: center;
		border-radius: 10rpx;
	}
	.btn{
		width: 50%;
		height: 80%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
	}
	.btn:last-child{
		background-color: #ffebeb;
		color: #f44;
	}
	.btn:first-child{
		background-color: #ff4444;
		color: #fff;
	}
</style>

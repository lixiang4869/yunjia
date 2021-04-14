<template>
	<view class="app">
		<view class="head_bg">
			<image src="../../static/tab/tu.png" ></image>
			<view class="head_title">
				<image src="../../static/public/goBack.png" @click="navigateBack"></image>
				<view>同城订单</view>
				<text></text>
			</view>
		</view>
		<!-- tab栏 -->
		<view class="tabs_content">
			<view class="tabs">
				<view class="tab" v-for="item in dataTitle" :key="item.index" @click="getOrderList(item.type, item.index)">
					<text>{{item.title}}</text>
					<image v-show="item.index == currentIndex" src="../../static/sameOrder/chack.png"></image>
				</view>
			</view>
		</view>
		
		<!-- 无订单显示 -->
		<view class="empty"  v-if="orderList == 0">
			<image src="https://xin.yiyunoto.com/uploads/static/public/emptyorder.png" mode="widthFix"></image>
			暂无订单数据~
		</view>
		
		<!-- 每一个订单 -->
		<view class="items common" v-else>
			<view class="item" v-for="item1 in orderList" :key="item1.id">
				<view class="item_t">
					<view class="item_t_icon">
						<image :src="item1.shop.image_url"></image>
						<text>{{item1.shop.name}}</text>
					</view>
					<view class="item_t_state">
						{{item1.order_button.status_desc}}
					</view>
				</view>
				<view class="item_m" v-for="(item2,i2) in item1.order_detail" :key="i2" @click="orderDetail(item1.order_sn)">
					<image :src="item2.attachment_id" ></image>
					<view class="item_m_body">
						<view class="body_t">
							<text>{{item2.service_type}}</text>
							<text>{{item2.car_num}}</text>
						</view>
						<view class="body_m">
							{{item1.city}}{{item1.area}}{{item1.address}}
						</view>
						<view class="body_b">
							￥<text>{{item2.price.split('.')[0]}}</text>.{{item2.price.split('.')[1]}}
						</view>
					</view>
				</view>
				<view class="item_b">
					<view @click="orderOper(item1.order_sn, item3.key)" v-for="(item3, i3) in item1.order_button.buttons" :key="i3">{{item3.name}}</view>
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
				cityUrl: this.$store.state.cityUrl,
				url: this.$store.state.url,
				// 选中的下标
				currentTab: 0,
				currentIndex: 2,
				page: 1,
				loadingType: 0,
				authtoken: '',
				orderList: [],
				dataTitle: [
					{index: 1, title: '全部', type: ''},
					{index: 2, title: '待付款', type: 0},
					{index: 3, title: '已支付', type: 1},
					{index: 4, title: '已取消', type: 2},
					{index: 5, title: '超时未支付', type: 3}
				]
			}
		},
		onReachBottom() {
			// 每次拉到页面底部,请求页数自加
			this.page++;
			if (this.loadingType != 0) { // loadingType!=0;直接返回
				return false;
			}
			this.loadingType = 1;
			let authtoken = uni.getStorageSync("authtoken");
			uni.showNavigationBarLoading();// 显示加载动画
			request.urlRequest(
				this.cityUrl + '/api/order/postOrderList', {
					status: this.currentTab,
					page:this.page
				}, {authtoken: authtoken},
				'POST',
				(res) => {
					if(this.page<res.data.data.last_page){
						this.loadingType=0
					}else this.loadingType=2
					  uni.hideNavigationBarLoading()
					this.orderList = this.orderList.concat(res.data.data.data);
				}
			)
		},
		
		onLoad(options) {
			let status = options.id || 0;
			let index = +status+2;
			this.authtoken = uni.getStorageSync('authtoken');
			this.getOrderList(status, index);
			console.log(status, index)
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
			// 跳转订单详情
			orderDetail(serial) {
				uni.navigateTo({
					url:"../sameOrder_detail/sameOrder_detail?id="+serial
				})
			},
			// 获取购物车订单列表
			getOrderList(status, index) {
				this.currentTab = status
				this.currentIndex = index
				this.page = 1
				uni.showLoading({
					title: '加载中'
				});
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.cityUrl + '/api/order/postOrderList', {
						status: status,
						page: this.page
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						uni.hideLoading();
						console.log('订单列表', res);
						if(this.page<res.data.data.last_page){
							this.loadingType=0
						}else this.loadingType=2
						this.orderList = res.data.data.data;
					}
				);
			},
			
			// 订单操作
			orderOper(serial, status) {
				if(status == 'to_pay') {
					this.pay(serial)
				}else if(status == 'cancel_order'){
					this.cancle(serial)
				}else if(status == 'delete_order'){
					this.delete(serial)
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
					
			// 取消订单
			cancle(serial) {
				uni.showModal({
					title: '提示',
					content: '您将取消这个订单',
					success: res => {
						if (res.confirm) {
							this.surecancle(serial);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 确认取消
			surecancle(serial) {
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.cityUrl + '/api/order/cancelOrder', {
						order_sn: serial
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						if(res.data.code == 10000) {
							uni.showToast({
								title: res.data.desc,
								icon:"none"
							})
							setTimeout(()=>{
								this.getOrderList(this.currentTab, this.currentIndex);
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
							this.suredelete(serial);
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 确认删除
			suredelete(serial) {
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.cityUrl + '/api/order/deleteOrder', {
						order_sn: serial
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						if(res.data.code == 10000) {
							uni.showToast({
								title: res.data.desc,icon:"none"
							})
							setTimeout(()=>{
								this.getOrderList(this.currentTab, this.currentIndex);
							},800)
						}
					}
				);
			},
		}
	}
</script>

<style lang="less" scoped>
	.common{
		width: 710rpx;
		margin: 0 20rpx;
	}
	.app {
		background-color: #F3F3F3;
	}
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #666666;
		margin-top: 550rpx;
		background-color: #fff;
		image {
			width: 200rpx;
			margin-bottom: 20rpx;
		}
	}
	
	.head_bg {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 160rpx;
		z-index: 99;
		>image {
			width: 100%;
			height: 100%;
		}	
	}
	.head_title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 710rpx;
		position: absolute;
		left: 0;
		bottom: 30rpx;
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
	.tabs_content {
		position: fixed;
		left: 20rpx;
		top: 160rpx;
		width: 710rpx;
		height: 95rpx;
		z-index: 99;
	}
	.tabs {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100%;
		font-size: 28rpx;
		color: #333;
		background-color: #fff;
		border-radius: 0 0 15rpx 15rpx;
		
		.tab {
			position: relative;
			>image {
				position: absolute;
				left: 50%;
				transform: translate(-50%);
				bottom: -8rpx;
				width: 52rpx;
				height: 6rpx;
			}
		}
		
	}
	.items{
		padding-top: 275rpx;
		.item{
			width: 650rpx;
			background-color: #ffffff;
			border-radius: 15rpx;
			margin-bottom: 20rpx;
			padding: 20rpx 30rpx;
			
			.item_t{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30rpx;
				.item_t_icon {
					
					image {
						width: 41rpx;
						height: 38rpx;
						margin-right: 20rpx;
						vertical-align: middle;
						background-color: #ececec;
					}
					text {
						font-size: 30rpx;
						font-weight: bold;
						color: #333333;
					}
				}
				.item_t_state {
					font-size: 24rpx;
					font-weight: bold;
					color: #fb3923;
				}
			}
			
			.item_m {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				image {
					width: 160rpx;
					min-width: 160rpx;
					height: 160rpx;
					background-color: #ececec;
				}
				.item_m_body {
					width: 467rpx;
					.body_t {
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						font-size: 30rpx;
						margin-bottom: 20rpx;
						width: 100%;
						color: #333;
						>text:last-child {
							width: 170rpx;
							min-width: 170rpx;
							text-align: right;
							color: #999;
						}
					}
					.body_m {
						font-size: 30rpx;
						line-height: 46rpx;
						color: #666666;
						text-align: left;
					}
					.body_b {
						text-align: right;
						font-size: 22rpx;
						line-height: 46rpx;
						color: #fb4832;
						text {
							font-size: 35rpx;
						}
					}
				}
			}
			.item_b {
				display: flex;
				justify-content: flex-end;
				align-items: center;	
				margin-top: 10rpx;
			}
			.item_b view {
				width: 134rpx;
				height: 46rpx;
				text-align: center;
				line-height: 46rpx;
				font-size: 24rpx;
				color: #333333;
				margin-left: 15rpx;
				border-radius: 23rpx;
				border: 1rpx solid  #999999;
			}
			.item_b view:first-child {
				color: #FF4800;
				border: 1px solid #FF4800;
			}
		}
	}

</style>

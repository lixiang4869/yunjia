<template>
	<view class="container" :style="{width:width+'px',height:height+'px'}">
		<view class="top">
			<image class="topBg" src="../../../static/tab/tu.png"></image>
			<view class="topBox">
				<view class="status_bar">
					<!-- 这里是状态栏 -->
				</view>
				<view class="topTitleBox">
					<view @click="backPage" class="backImg">
						<image style="width: 19rpx;height: 34rpx;" src="../../../static/public/goBack.png"></image>
					</view>

					<text class="title">商城订单</text>
					<view class="backImg"></view>
				</view>
			</view>
		</view>
		<!-- 头部导航 -->
		<view class="tabNav">
			<view class="navItem" v-for="(item,index) in menuTabs" :key="index" v-bind:id="'tabNum'+index" @click="swichMenu(index)">
				<text class="tabName" :style="{marginBottom: title_type == index?'10rpx':'15rpx'}">{{item.name}}</text>
				<view class="tabLine" v-if="title_type == index"></view>
			</view>
		</view>
		<!-- 订单列表 -->
		<scroll-view class="orderListBox" :scroll-y="true">
			<view class="orderInfo" v-for="(menuList, index2) in menuLists" :key="index2" @click="orderDetail(menuList.order_sn)">
				<view class="up">
					<view class="store">
						<!-- <image style="width: 44rpx;height: 40rpx;" src="../../../static/my/shop.png"></image> -->
						<!-- <text class="storeName">智慧云家</text> -->
					</view>
					<!-- <text class="status">{{getstatus(menuList.order_status)}}</text> -->
				</view>
				<view class="down" v-for="(menuList2, index3) in menuList.orderinfo" :key="index3">
					<view class="shopInfoBox">
						<image class="shopImg" :src="wz+menuList2.goods_preview"></image>
						<view class="shopTxtBox">
							<text class="shopName">{{menuList2.goods_name}}</text>
							<view class="priceNum">
								<view class="priceBox">
									<text class="price">￥</text>
									<text class="price" style="font-size: 35rpx;">{{menuList2.buy_price}}</text>
									<!-- <text class="price" style="font-size: 30rpx;">.{{ ((menuList2.buy_price*1).toFixed(2)).toString().split('.')[1] }}</text> -->
								</view>
								<view class="numBox">
									<text style="font-size: 32rpx;color: #666666;">×</text>
									<text style="font-size: 30rpx;color: #666666;margin-left: 10rpx;">{{menuList2.goods_num}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="btnsBox">
					<view class="shopBtnBox" style="width: 30%;"></view>
					<view class="shopBtnBox" style="width: 70%;">
						<!-- <text class="shopCancel">投诉电话</text> -->
						<text class="shopCancel shopBtnbox" @click.stop="call_off(menuList.order_id)" v-if="menuList.order_status == 20">取消订单</text>
						<text class="shopAddCart shopBtnbox" @click.stop="pay(menuList)" v-if="menuList.order_status == 20">去支付</text>
						<text class="shopAddCart shopBtnbox" @click.stop="confirm(menuList.order_id)" v-if="menuList.order_status == 70">确认收货</text>
						<text class="shopCancel shopBtnbox" style="border:none;background-color: #e2e2e2;color: #666666;" v-if="menuList.order_status == 10">已取消</text>
						<text class="shopCancel shopBtnbox" style="border:none;background-color: #e2e2e2;color: #666666;" v-if="menuList.order_status ==40">待发货</text>
						<text class="shopCancel shopBtnbox" style="border:none;background-color: #e2e2e2;color: #666666;" v-if="menuList.order_status ==80">已完成</text>
						<text class="shopCancel shopBtnbox" style="border:none;background-color: #e2e2e2;color: #666666;" v-if="menuList.order_status ==60">配送中</text>
					</view>
				</view>
			</view>
			<view class="kong" v-if="menuLists.length == 0">



				<image src="https://xin.yiyunoto.com/uploads/static/public/emptyorder.png" mode="widthFix"></image>

			</view>
		</scroll-view>
	</view>
</template>

<script>
	import request from '../../../store/http.js'
	export default {
		data() {
			return {
				width: '',
				height: '',
				actionNav: 0,

				loadingType: 0,
				title_type: '',
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0,
				page: 1,
				type: '',
				wz: this.$store.state.url,
				menuTabs: [{
						name: '全部',
						type: 0,
					}, {
						name: '待付款',
						type: 20,
					},
					{
						name: '待发货',
						type: 40,
					},
					{
						name: '待收货',
						type: 60,
					}, {
						type: 80,
						name: '已完成'
					}
				],
				menuLists: [],
				refresh: false
			}
		},
		onLoad(options) {
			let {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.width = windowWidth;
			this.height = windowHeight;


			this.currentTab = this.title_type = 0

			this.order_data()
		},
		onReachBottom() {
			console.log(this.page)
			// 每次拉到页面底部,请求页数自加
			this.page++;
			if (this.loadingType != 0) { // loadingType!=0;直接返回
				return false;
			}
			let authtoken = uni.getStorageSync("authtoken");
			this.loadingType = 1;
			uni.showNavigationBarLoading(); // 显示加载动画
			request.urlRequest(
				this.wz + '/api/member/ygcorders', {
					order_status: this.menuTabs[this.currentTab].type,
					page: this.page
				}, {
					authtoken: authtoken
				},
				'POST',
				(res) => {
					if (this.page < res.data.data.last_page) {
						this.loadingType = 0
					} else this.loadingType = 2

					uni.hideNavigationBarLoading()
					this.menuLists = this.menuLists.concat(res.data.data.data);
				}
			)

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

			// #ifdef MP-WEIXIN
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			if (currPage.data.refresh) {
				this.page = 1;
				this.order_data();
			}
			// #endif

			// #ifdef APP-PLUS
			uni.$on("handleFun", res => {
				console.log("handleFun", res);
				this.refresh = res.refresh;
				this.page = 1;
				this.order_data();
				// 清除监听
				uni.$off('handleFun');
			});

			// #endif

		},
		onUnload() {
			uni.$off('handleFun');
		},
		methods: {
			// 10:买家取消 20:新订单 40:已付款 60:已发货 80:已收货 100:已评价 120:已结算
			getstatus(i) {
				switch (i) {
					case 10:
						return '已取消';
					case 20:
						return '待付款';
					case 40:
						return '待发货';
					case 60:
						return '已发货';
					case 80:
						return '已收货';
					case 120:
						return '已完成';
				}
			},
			// 返回上一页
			backPage() {
				uni.navigateBack({
					delta: 1
				})
			},
			navChange(i) {
				this.actionNav = i
			},
			confirm(id) {
				uni.showLoading({
					title: '加载中'
				});

				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.wz + '/api/member/userconfirmorder', {
						order_id: id
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						uni.hideLoading();
						if (res.data.code == 1) {
							this.order_data()
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				);

			},
			// 跳转订单详情页面
			orderDetail(e) {
				console.log("orderDetail", e);
				uni.navigateTo({
					url: '../pay-popup/pay-popup?order_sn=' + e
				})
			},

			onPullDownRefresh: function() {
				this.page = 1;
				this.order_data()
			},
			order_data() {
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.wz + '/api/member/ygcorders', {
						order_status: this.menuTabs[this.currentTab].type,
						page: this.page
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						if (this.page < res.data.data.last_page) {
							this.loadingType = 0
						} else this.loadingType = 2
						this.menuLists = res.data.data.data;
						// this.menuLists = res.data.data
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				);

			},
			call_off(e) {
				let authtoken = uni.getStorageSync("authtoken");
				console.log("取消", e)
				uni.request({
					url: this.wz + '/api/member/cancelorder',
					header: {
						authtoken: authtoken
					},
					method: 'POST',
					data: {
						order_id: e
					},
					success: (res) => {
						console.log("请求成功", res)
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
						this.order_data()
					},
					fail: (res) => {
						console.log("请求失败", res)
					}
				})
			},
			pay(item) {
				if (item.trade_type == 5) {
					this.payJifen(item.order_id);

				} else {
					let authtoken = uni.getStorageSync("authtoken");

					let type;
					let code;
					// #ifdef APP-PLUS
					type = 1;
					uni.request({

						url: this.wz + "/api/order/payorder",
						data: {
							trade_type: type,
							oid: item.order_id,
						},
						header: {
							authtoken: authtoken
						},
						method: 'POST',
						success: (res) => {
							uni.hideLoading();
							console.log("返回请求成功", res)


							// 微信支付
							if (res.data.code == 1) {

								uni.getProvider({
										service: "payment",
										success: (res) => {
											console.log(res);
										}
									}),

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
												url: './Pay_success'
											})
										},
										fail: function(err) {
											console.log('支付失败', err)
										}
									});


							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						},
						fail: (res) => {
							console.log("请求失败", res)
						}
					})

					// #endif
					// #ifdef MP-WEIXIN
					type = 2;

					let _this = this;
					uni.login({
						success(e) {
							console.log('e', e);
							_this.getPayInfo(item.order_id, e.code);
						},
						fail(e) {
							console.log('code', e);

						}

					})
					// #endif	
				}

			},
			payJifen(order_id) {
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(this.wz + "/api/order/pointsForGoods", {
					order_id: order_id
				}, {
					authtoken: authtoken
				}, "POST", res => {
					if (res.data.code == 1) {
						uni.navigateTo({
							url: '../pay-popup/Pay_success'
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}
				})
			},
			getPayInfo(group_sn, code) {
				console.log('222', code + this.url);
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.wz + "/api/order/payorder", {
						trade_type: 2,
						oid: group_sn,
						code: code
					}, {
						authtoken: authtoken
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
										uni.navigateTo({
											url: './Pay_success'
										})
									},
									fail: function(err) {
										console.log(err);
									}
								});

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}

					});



			},
			swichMenu: async function(current) { //点击其中一个选项
				console.log("点击数据", this.currentTab + "/" + current)
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
					// this.setScrollLeft(current);
				};
				console.log("点击数据", current)
				if (current == 0) {
					this.type = "0"
				} else {
					this.type = current
				}
				this.page = 1;
				let authtoken = uni.getStorageSync("authtoken");
				uni.request({
						url: this.wz + '/api/member/ygcorders',
						header: {
							authtoken: authtoken
						},
						method: 'POST',
						data: {
							order_status: this.menuTabs[this.currentTab].type,
							page: this.page
						},
						success: (res) => {
							console.log("请求成功", res)
							if (this.page < res.data.data.last_page) {
								this.loadingType = 0
							} else this.loadingType = 2
							this.menuLists = res.data.data.data;
						},
						fail: (res) => {
							console.log("请求失败", res)
						}
					}),
					this.title_type = current
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background-color: #F3F3F3;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.top {
		width: 100%;
		height: 10%;
		position: relative;
	}

	.topBg {
		width: 100%;
		height: 100%;
	}

	.topBox {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.topTitleBox {
		width: 100%;
		height: 86rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.backImg {
		width: 60rpx;
		height: 60rpx;
	}

	.title {
		font-size: 38rpx;
		font-weight: 700;
		color: #FFFFFF;
	}

	.tabNav {
		width: 94%;
		height: 7%;
		background-color: #FFFFFF;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}

	.navItem {
		width: 24%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.tabName {
		font-size: 30rpx;
		color: #333333;
	}

	.tabLine {
		width: 50rpx;
		height: 5rpx;
		background: linear-gradient(to right, #fb3923, #FFFFFF);
	}

	.orderListBox {
		width: 94%;
		height: 80%;
		margin: 0 auto;
		margin-top: 3%;
	}

	.orderInfo {
		width: 100%;
		min-height: 350rpx;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}

	.up {
		width: 100%;
		height: 70rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.store {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.status {
		font-size: 28rpx;
		color: #fb3923;
	}

	.storeName {
		font-size: 30rpx;
		color: #333333;
		margin-left: 20rpx;
	}

	.down {
		width: 100%;
		height: 180rpx;
	}

	.shopInfoBox {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.shopImg {
		width: 160rpx;
		height: 160rpx;
		border-radius: 20rpx;
	}

	.shopTxtBox {
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.shopName {
		font-size: 30rpx;
		color: #333333;
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-line-clamp: 1; //此处为上限行数
		-webkit-box-orient: vertical;
	}

	.priceNum {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.priceBox {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
	}

	.price {
		font-size: 22rpx;
		color: #fb4832;
		font-weight: 700;
	}

	.numBox {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 30rpx;
	}

	.btnsBox {
		width: 100%;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.shopBtnBox {
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.shopCancel {
		font-size: 28rpx;
		color: #333333;
		border: 1rpx solid #999999;
		background-color: #FFFFFF;
		border-radius: 50rpx;
		padding: 10rpx 20rpx;
	}

	.shopAddCart {
		font-size: 28rpx;
		color: #FFFFFF;
		background-color: #fb4832;
		border-radius: 50rpx;
		padding: 10rpx 20rpx;
	}

	.shopBtnbox {
		margin-left: 20rpx;
	}

	.kong {
		padding-top: 3upx;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 50%;
		}
	}
</style>

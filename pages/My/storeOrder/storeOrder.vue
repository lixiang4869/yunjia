<template>

	<view class="content">
		<!-- 订单列表 -->
		<view class="top">
			<view v-for="(menuTab, index) in menuTabs" :key="index" @click="swichMenu(index)" class="tab">
				<view :class="[currentTab == index ? 'tabselect' : 'tabunselect']">{{ menuTab.name }}</view>
				<view :class="[currentTab == index ? 'areaselect' : 'areaunselect']"></view>
			</view>
		</view>

		<view class="kong" v-if="orderList.length == 0 ? true : false">
			<image src="https://xin.yiyunoto.com/uploads/static/public/emptyorder.png" mode="widthFix"></image>
		</view>

		<view class="tab-panel">
			<view class="item" v-for="(menuList, index2) in orderList" :key="index2" @click="details(menuList)">
				<view class="item-top">

					<image :src="url+menuList.shopinfo.logo"></image>
					<view class="shopname">
						{{ menuList.shopinfo.name }}
					</view>
					<view>{{getStatus(menuList.order_status)}}</view>
				</view>
				<view v-for="(menuList2, index3) in menuList.orderinfo" :key="index3">
					<!-- 点击跳转到商品详情 -->
					<!-- <view class="tab-item"> -->
					<!-- 第二层循环 -->
					<view class="product">
						<!-- 主图 -->
						<img :src="url+menuList2.goods_preview" alt="" />
						<view class="right">
							<!-- 商品名称 -->
							<view class="goodsName">{{ menuList2.goods_name }}</view>
							<!-- 规格,价格 -->
							<view class="priceinfo">
								<!-- <view class="yang1">规格：{{ menuList2.skuInfo }}</view> -->
								<view class="price">￥{{ menuList2.buy_price }}</view>
								<view class="num">
									x {{ menuList2.goods_num }}
								</view>
							</view>
							<!-- 商品数量 -->

						</view>
					</view>

				</view>

				<view class="total">
					<view>共{{ menuList.orderinfo.length }}种商品 总计:</view>
					<view class="totalprice">￥{{menuList.order_amount}}</view>

				</view>
				<view class="bottom">
					<view :class="[menuList.order_status == 20 ? 'aui-df-colors' : 'hd']" @click.stop="cancle(menuList)">取消订单</view>
					<view :class="[menuList.order_status == 20 ? 'aui-df-color' : 'hd']" @click.stop="pay(menuList.order_id)">立即支付</view>
					<!-- <view :class="[menuList.order_status == 40 ?'aui-df-colors2' : 'hd']">待使用</view> -->

					<view :class="[menuList.order_status == 10 ? 'aui-df-colors' : 'hd']">已取消</view>
					<!-- <view :class="[menuList.order_status == 80 ? 'aui-df-colors qx' : 'hd']">已完成</view> -->
				</view>




			</view>
		</view>
	</view>

</template>

<script>
	import request from '../../../store/http.js'
	export default {
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0, //选中的下标
				url: this.$store.state.url,
				page: 1,
				loadingType: 0,
				orderList: [], //订单列表的所有信息

				menuTabs: [{
						name: '全部',
						type: 0,
					},
					{
						name: '待付款',
						type: 20,
					},
					{
						name: '待使用',
						type: 40,
					},
					{
						name: '已完成',
						type: 80,
					}
				],

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

			// #ifdef MP-WEIXIN
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			if (currPage.data.refresh) {
				this.page = 1;
				this.orderState(this.currentTab);
			}
			// #endif

			// #ifdef APP-PLUS
			uni.$on("handleFun", res => {
				console.log("handleFun", res);
				this.refresh = res.refresh;
				this.page = 1;
				this.orderState(this.currentTab);
				// 清除监听
				uni.$off('handleFun');
			});

			// #endif
		},
		onReachBottom() {

			// 每次拉到页面底部,请求页数自加
			this.page++;
			if (this.loadingType != 0) { // loadingType!=0;直接返回
				return false;
			}
			this.loadingType = 1;
			let authtoken = uni.getStorageSync("authtoken");
			uni.showNavigationBarLoading(); // 显示加载动画
			request.urlRequest(
				this.url + '/api/guangjie/shoporders', {
					order_status: status,
					page: this.page
				}, {
					authtoken: authtoken
				},
				'POST',
				(res) => {
					if (this.page < res.data.data.pageTotal) {
						this.loadingType = 0
					} else this.loadingType = 2

					uni.hideNavigationBarLoading()
					this.orderList = this.orderList.concat(res.data.data.items);
				}
			)

		},
		onLoad(options) {
			console.log(options)
			this.currentTab = 0;

			this.orderState(this.currentTab);
		},
		methods: {
			getStatus(status) {
				let s = "";
				this.menuTabs.forEach((item) => {
					if (item.type == status) {
						s = item.name
					}
				})
				return s;
			},
			pay(id) {

				let authtoken = uni.getStorageSync("authtoken");
				let type;
				let code;
				// #ifdef APP-PLUS
				type = 1;
				uni.request({

					url: this.url + "/api/guangjie/payorder",
					data: {
						trade_type: type,
						order_id: id,
					},
					header: {
						authtoken: authtoken
					},
					method: 'POST',
					success: (res) => {
						uni.hideLoading();
						console.log("返回请求成功", res)


						// 微信支付
						if (res.data.msg == "签名成功") {
							console.log("返回请求成功", res.data.data.noncestr)
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


						}
					},
					fail: (res) => {
						console.log("请求失败", res)
					}
				})

				// #endif
				// #ifdef MP-WEIXIN
				type = 2;
				console.log('code', 22222);
				let _this = this;
				uni.login({
					success(e) {
						console.log('e', e);
						_this.getPayInfo(id, e.code);
					},
					fail(e) {
						console.log('code', e);

					}

				})
				// #endif
			},
			getPayInfo(id, code) {
				console.log('222', code + this.url);
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + "/api/guangjie/payorder", {
						trade_type: 2,
						order_id: id,
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

						}

					});



			},

			swichMenu: async function(current) { //current = 下标
				console.log(this.currentTab + "/" + current)
				//点击其中一个选项
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
					this.setScrollLeft(current);
					this.orderState(current);
				}
			},
			swiperChange: async function(e) {
				console.log(e);
				let index = e.target.current;
				this.setScrollLeft(index);
				this.currentTab = index;
			},
			setScrollLeft: async function(tabIndex) {
				let leftWidthSum = 0;
				for (var i = 0; i <= tabIndex; i++) {
					let nowElement = await this.getWidth('tabNum' + i);
					leftWidthSum = leftWidthSum + nowElement.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth;
				this.scrollLeft = leftWidthSum > winWidth ? leftWidthSum - winWidth : 0;
			},
			getWidth: function(id) {
				//得到元素的宽高
				return new Promise((res, rej) => {
					uni.createSelectorQuery()
						.select('#' + id)
						.fields({
								size: true, //是否返回节点的尺寸
								scrollOffset: true //是否返回节点的 scrollLeft scrollTop，节点必须是 scroll-view 或者 viewport
							},
							data => {
								res(data);
								// console.log("得到节点信息" + JSON.stringify(data));
							}
						)
						.exec();
				});
			},
			details(data) {
				// 点击跳转到详情 
				uni.navigateTo({
					url: '../Shopping/Shopping?id=' + data.order_id
				})
				console.log('详情点击事件触发')
			},
			// 取消订单点击事件
			cancle(item) {
				uni.showModal({
					title: '提示',
					content: '您将取消这个订单',
					success: res => {
						if (res.confirm) {
							this.surecancle(item);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			surecancle(item) {

				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/guangjie/cancelorder', {
						order_id: item.order_id
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
						this.orderState(this.currentTab);
					}
				);


			},
			orderState(current) {


				// 0:系统取消 10:买家取消 20:新订单 40:已付款 60:已发货 80:已收货 100:已评价 120:已结算
				console.log(current);
				this.page = 1;
				this.getOrderList(this.menuTabs[current].type);

			},
			affirmOrder() {
				uni.navigateTo({
					url: '../affirmOrder/affirmOrder',
				})
			},

			// 获取购物车订单列表
			getOrderList(status) {
				// 0:系统取消 10:买家取消 20:新订单 40:已付款 60:已发货 80:已收货 100:已评价 120:已结算
				console.log(status);
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/guangjie/shoporders', {
						order_status: status,
						page: this.page
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						console.log('订单列表', res);
						if (this.page < res.data.data.pageTotal) {
							this.loadingType = 0
						} else this.loadingType = 2
						this.orderList = res.data.data.items;
					}
				);
			}
		}
	};
</script>
<style lang="less">
	.content {
		width: 100%;
		background: #f5f5f5;
	}

	.top {
		height: 80rpx;
		align-items: center;
		display: flex;
		flex-direction: row;
		width: 100%;
		background: #ffffff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
	}

	.tab {
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
	}

	.tabselect {
		font-size: 24rpx;
		margin-bottom: 10rpx;
		font-weight: bold;
		color: #333;

	}

	.tabunselect {
		font-size: 24rpx;
		margin-bottom: 10rpx;
		color: #333;

	}

	.areaselect {
		width: 56rpx;
		height: 8rpx;

		background: #FF502E;
		border-radius: 4rpx;
		opacity: 1;
	}

	.areaunselect {
		width: 56rpx;
		height: 8rpx;

		background: #FF502E;
		border-radius: 4rpx;
		opacity: 0;
	}

	.total {
		width: 100%;
		margin-top: 20upx;
		font-size: 26rpx;
		color: #333;
		justify-content: flex-end;
		display: flex;
		flex-direction: row;
	}

	.totalprice {
		color: #FF502E;
		font-size: 32rpx;
		font-weight: bold;
	}

	.bottom {
		width: 100%;
		margin-top: 20upx;

		justify-content: flex-end;
		display: flex;
		flex-direction: row;
	}


	.tab-panel {
		// overflow: hidden;
		padding-top: 80upx;
	}

	.item {
		width: calc(100% - 48rpx);
		margin-left: 24rpx;
		margin-right: 24rpx;
		margin-top: 16rpx;
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 16rpx;
	}

	.item-top {
		height: 74rpx;
		align-items: center;
		display: flex;
		flex-direction: row;
		width: 100%;
		margin-left: 10rpx;
		margin-right: 10rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 26rpx;
		color: #333;

		image {
			width: 40rpx;
			height: 40rpx;
			border-radius: 20rpx;
			margin-left: 14rpx;
			margin-right: 14rpx;
		}

		.shopname {
			flex: 1;
			font-weight: bold;
		}

	}

	.product {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		width: 100%;

		image {
			width: 120rpx;
			height: 120rpx;
			margin-left: 24rpx;
			margin-right: 16rpx;
			border-radius: 8rpx;
		}

		.right {
			display: flex;
			flex-direction: column;
			flex: 1;
		}

		.goodsName {
			font-size: 26rpx;
			color: #333;
			font-weight: bold;

		}

		.priceinfo {
			display: flex;
			flex-direction: row;
			margin-top: 20rpx;
			justify-content: space-between;
			align-items: center;
		}

		.price {
			font-size: 26rpx;
			color: #FF502E;

		}

		.num {
			font-size: 24rpx;
			color: #333;
		}
	}

	.hd {
		display: none;
	}

	.aui-df-color {
		margin-left: 20rpx;
		line-height: 54rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		width: 136rpx;
		height: 54rpx;
		background: linear-gradient(90deg, #FF6178 0%, #FF502E 100%);
		border-radius: 16rpx;

	}

	.aui-df-colors {
		background: #d9d9d9;
		line-height: 54rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		width: 136rpx;
		height: 54rpx;
		border-radius: 16rpx;
	}

	.aui-df-colors2 {
		background: #0086F9;
		border-radius: 15upx;
	}



	.kong {

		padding-top: 3upx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			margin-top: 200upx;
			width: 50%;

		}
	}
</style>

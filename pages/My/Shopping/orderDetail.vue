<template>
	<view>
		<!-- 取货-->
		<!-- 商家名称 -->
		<!-- <view class="tops">{{orderDetails.shop_id}}</view> -->
		<!-- 未领取时显示状态 -->
		<view v-if="orderDetails.order_status==40">
			<!-- <view class="xia">请凭此码到店领取您的商品 </view> -->
			<!-- 取货码二维码图 -->

			<view class="imgs">
				<image :src="url+orderDetails.QR_code" style="width:50%;" mode="widthFix">
			</view>

		</view>
		<view class="row" v-for="(row,index) in orderDetails.orderinfo" :key="index">

			<view class="goods-info">
				<!-- 主图 -->
				<view class="img">
					<image :src="imgurl+row.goods_preview"></image>
				</view>
				<!-- 商品名称介绍 -->
				<view class="info">
					<view class="title">{{row.goods_name}}</view>
					<view class="spe">
						<!-- 尺寸大小   和价格 -->
						<!-- 	<view class="spec">规格{{row.skuInfo}}</view> -->
						<view style="display: flex;flex-direction: row; align-items: center;margin-top: 10rpx;">
							<view class="price">￥{{row.buy_price}}</view>
								<view class="price2">￥{{row.goods_price}}</view>
						</view>
						

						<!-- 商品数量 -->
						<view class="number">X {{row.goods_num}}</view>
					</view>
				</view>
			</view>

		</view>
		<view class="item">
			<view>商家信息</view>
			<view style="font-size: 30rpx;">{{orderDetails.shop_id}}</view>
		</view>
		<view class="item">
			<view>数量</view>
			<view style="font-size: 30rpx;">{{num}}</view>
		</view>
		<view class="item">
			<view >总价</view>
			<view style="color:  #FF3B30 ;font-size: 30rpx;">￥{{orderDetails.order_amount}}</view>
		</view>
		<view class="item"  >
			<view >实付款</view>
			<view style="font-size: 30rpx;color:  #FF3B30 ;">￥{{orderDetails.pay_amount}}</view>
		</view>
	<view class="item"  v-if="orderDetails.order_status==10">
		<view >订单状态</view>
		<view style="font-size: 30rpx;">订单已取消</view>
	</view>
	<view class="item"  v-if="orderDetails.order_status==80">
		<view >订单状态</view>
		<view style="font-size: 30rpx;">您的商品已经领取！</view>
	</view>
	<view class="item">
			<view >订单编号</view>
			<view style="font-size: 30rpx;">{{orderDetails.order_sn}}</view>
		</view>
		<view class="item">
			<view >订单时间</view>
			<view style="font-size: 30rpx;">{{dateFormat(orderDetails.add_time)}}</view>
		</view>
		<view class="item" v-if="orderDetails.orderStatus == 40" style="margin-bottom: 100rpx;">
			<view >支付时间</view>
			<view style="font-size: 30rpx;">{{dateFormat(orderDetails.pay_time)}}</view>
		</view>
		

		<view class="bottom" v-if="orderDetails.order_status == 20 ">
			<view style="font-size: 22rpx;color: #999;margin-left: 24rpx;">合计</view>
			<view style="color:  #FF3B30 ;font-size: 30rpx;flex: 1;">￥{{orderDetails.order_amount}}</view>
			<view :class="[orderDetails.order_status == 20 ? 'aui-df-colors' : 'hd']" @click.stop="cancle()">取消订单</view>
			<!-- hd aui-df-color -->
			<!-- <view  :class="[menuList2.orderStatus == 20&& ? 'hd' : menuList2.but_shouhuo == 1 ? '' : 'aui-df-color']" >确认收货</view> -->
			<view :class="[orderDetails.order_status == 20 ? 'aui-df-color' : 'hd']" @click="pay()">立即支付</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popBox">
				<image src="https://xin.yiyunoto.com/uploads/static/public/success.png" style="margin-top: 70rpx; width: 108rpx;height: 108rpx;"></image>
				<view style="font-size: 36rpx;color: #333;margin-top: 20rpx;margin-bottom: ;">支付成功</view>
				<view style="display: flex;flex-direction: row;align-items: center;margin-top: 30rpx;margin-bottom: 50rpx;">
					<view style="font-size: 36rpx;color:#333;">￥</view>
					<view style="font-size: 72rpx;color: #333;font-weight: bold;">{{orderDetails.order_amount}}</view>
				</view>
				<view style="width: 100%;display: flex;flex-direction: row;height: 100rpx;border-top: 1rpx solid #eee;">
					<text style="flex: 1;text-align: center;height: 100rpx;line-height: 100rpx;font-size: 30rpx;color: #999;" @click="close" >关闭</text>
					<text style="flex: 1;text-align: center;height: 100rpx;line-height: 100rpx;font-size: 36rpx;color: #333;" @click="goOrder">查看订单</text>
				</view>
				<view style="height: 1upx;"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import request from '../../../store/http.js'
	export default {
		data() {
			return {
				code: '',
				num: 0,
				id: "",
				url: this.$store.state.url,
				min: {
					orderTime: 0,
					payTime: 0
				}, //时间戳转换的时间
				imgurl: this.$store.state.url,
				goodsPrice: 0, //商品合计价格
				sumPrice: 0, //用户付款价格
				orderDetails: {},

			};
		},
		filters: {
			toFixed: function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		onLoad(data) {

			this.id = data.id;

			this.order_data();

		},
		/* 页面加载 合计数量和价格 */
		onShow() {
			// this.$refs.popup.open();
			// console.log(this.orderList)
			// // this.orderList = ret.data;	
			// this.goodsPrice=0;
			// this.sumPrice=0;
			// //合计
			// let len = this.orderList.length;
			// for(let i=0;i<len;i++){
			// 	this.goodsPrice = this.goodsPrice + (this.orderList[i].price*this.orderList[i].shuliang);
			// 	this.sumPrice = this.sumPrice +(this.orderList[i].shuliang )
			// 	console.log(this.sumPrice)
			// }
		},
		onUnload() {
			uni.$off('handleFun');
		},
		methods: {
			close(){
				this.$refs.popup.close();
			},
			goOrder(){
				uni.navigateTo({
					url:""
				})
			},
			// 取消订单点击事件
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
			isRefreshPrePage(){
				
				// #ifdef MP-WEIXIN
				let pages = getCurrentPages();
				let prePage = pages[pages.length - 2];
				prePage.setData({
				       refresh:true
				   })
							
				// #endif
				// #ifdef APP-PLUS
				 uni.$emit("handleFun",{refresh:true});
				// #endif
			},
			surecancle() {

				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/guangjie/cancelorder', {
						order_id: this.id
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						uni.showToast({
							title: res.data.msg,icon:"none"
						})
						this.order_data();
					}
				);


			},
			order_data() {
				console.log('order_data', this.id)
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/guangjie/shopordersdetails', {
						order_id: this.id
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
					
						this.orderDetails = res.data.data;
						if(this.orderDetails.orderinfo){
							this.orderDetails.orderinfo.forEach((item)=>{
								this.num += item.goods_num;
							})
							
						}
						
					}
				);

			},
			timer() {
				this.min.orderTime = this.time(this.orderDetails.addTime)
				this.min.payTime = this.time(this.orderDetails.payTime)
				console.log(this.min);
			},
			pay() {
				let authtoken = uni.getStorageSync("authtoken");
				let type;
				let code;
				// #ifdef APP-PLUS
				type = 1;
				uni.request({

					url: this.url + "/api/guangjie/payorder",
					data: {
						trade_type: type,
						order_id: this.id,
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
										this.$refs.popup.open();
										// uni.navigateTo({
										// 	url: '../pay-popup/Pay_success'
										// })
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

				// #endif
				// #ifdef MP-WEIXIN
				type = 2;
				console.log('code', 22222);
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
				// #endif
			},
			getPayInfo(type, code) {
				let _this =this;
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + "/api/guangjie/payorder", {
						trade_type: type,
						order_id: this.id,
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
											this.$refs.popup.open();
											// uni.navigateTo({
											// 	url: '../pay-popup/Pay_success'
											// })
										},
										fail: function(err) {
											// _this.$refs.popup.open();
										}
									});
						
							}
						
					});

				

			},
			dateFormat(ytime) {
				var fmt = "YYYY-mm-dd HH:MM:SS";
				var date = new Date(ytime * 1000);
				let ret;
				const opt = {
					"Y+": date.getFullYear().toString(), // 年
					"m+": (date.getMonth() + 1).toString(), // 月
					"d+": date.getDate().toString(), // 日
					"H+": date.getHours().toString(), // 时
					"M+": date.getMinutes().toString(), // 分
					"S+": date.getSeconds().toString() // 秒
					// 有其他格式化字符需求可以继续添加，必须转化成字符串
				};
				for (let k in opt) {
					ret = new RegExp("(" + k + ")").exec(fmt);
					if (ret) {
						fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
					};
				};
				return fmt;
			},
			time(ytime) { //定义时间戳转换方法  ytime为时间戳
				var date = new Date(ytime * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				let timeer = Y + M + D + h + m + s;
				return timeer //吐出转译好的时间
			},
		}
	}
</script>

<style lang="less">
	
	.popBox {
		align-items: center;
		width: 638rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
	}
	.hd {
		display: none;
	}
	.bottom{
		left: 0;
		position: fixed;
		height: 100rpx;
		background: #fff;
		bottom: 0;
		width: 100%;
		
		
		align-items: center;
		display: flex;
		flex-direction: row;
		
	}

	// .aui-mail-button view {
	// 	font-size: 28upx;
	// 	font-family: PingFang SC;
	// 	font-weight: 500;
	// 	color: rgba(255, 255, 255, 1);
	// 	line-height: 60upx;
	// 	text-align: center;
	// 	float: right;
	// 	margin-left: 20upx;
	// 	width: 180upx;
	// 	height: 62upx;
	// }

	.aui-df-color {
		width: 240rpx;
		height: 80rpx;
		margin-left: 20upx;
		margin-right: 20rpx;
		text-align: center;
		font-size: 36rpx;
		color: #fff;
		background: linear-gradient(90deg, #FF7085 0%, #FF5837 100%);
		line-height:80rpx ;
		border-radius: 40upx;
	}

	.aui-df-colors {
		width: 240rpx;
		height: 80rpx;
		text-align: center;
		font-size: 36rpx;
		color: #fff;
		margin-left: 20upx;
		line-height:80rpx ;
		border-radius: 40upx;
		background: #d9d9d9;
		
	}

	page {
		background: #F5F5F5;
	}

	.flex {
		display: flex;
	}

	.sp {
		//竖排换行
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
	}

	.hp {
		//横排不换行
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}

	.jz {
		align-items: center;
		justify-content: center;
	}

	.if {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.tops {
		width: 100%;


		font-size: 28upx;
		font-family: PingFang SC;
		color: rgba(12, 12, 12, 1);
		padding-bottom: 26upx;
		padding-top: 23upx;
		padding-left: 28upx;
		background: #FFFFFF;
	}

	.row {
		width: 100%;

		margin-top: 5upx;
		background: #FFFFFF;
		border-top: 1upx solid #F1F1F1;
		border-bottom: 1upx solid #F1F1F1;

		.goods-info {
			width: 694upx;
			margin-left: 28upx;
			height: 200upx;
			display: flex;

			.img {
				padding-top: 20upx;
				width: 160upx;
				height: 160upx;
				border-radius: 10upx;
				overflow: hidden;
				flex-shrink: 0;
				margin-right: 21upx;

				image {
					width: 160upx;
					height: 160upx;
				}
			}
		}

		.info {
			width: 100%;
			padding-top: 20upx;

			.title {
				font-size: 30upx;
				font-weight: bold;
				font-family: PingFang SC;
				color: rgba(12, 12, 12, 1);
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				// text-align: justify;
				overflow: hidden;
			}

			.spe {
				display: flex;

				width: 100%;
				align-items: center;
				justify-content: space-between;

				.spec {

					font-size: 24upx;
					color: #a7a7a7;

				}

				.price {
					font-size: 36upx;
					font-family: PingFang SC;
					color: #FF3B30;

				}
				.price2 {
					text-decoration: line-through;
					margin-left: 12rpx;
					font-size: 26upx;
					font-family: PingFang SC;
					color: #999;
				
				}
			}

			.number {
				display: flex;
				justify-content: flex-end;
				font-size: 20upx;
				font-family: PingFang SC;
				color: rgba(136, 136, 136, 1);
			}
		}
	}

	.item{
		background: #fff;
		padding-left: 24rpx;
		padding-right: 24rpx;
		font-size: 26rpx;
		color: #333;
		
		border-bottom: 1px solid #eee;
		height: 83rpx;
		justify-content: space-between;
		align-items: center;
		display: flex;
		flex-direction: row;
	}

	.xia {
		width: 100%;

		font-size: 30upx;
		font-family: PingFang SC;
		color: rgba(52, 56, 66, 1);
		text-align: center;
		padding-top: 57upx;
		padding-bottom: 57upx;
	}

	.imgs {

		justify-content: center;
		align-items: center;
		width: 100%;
		display: flex;
	}

	.text {

		width: 100%;
		font-size: 30upx;
		font-family: PingFang SC;
		text-align: center;
		color: rgba(52, 56, 66, 1);
		padding-top: 59upx;
		padding-bottom: 100upx;
	}

	// 商品已领取状态
	.yes {
		.flex;
		.jz;
		height: 160upx;
		width: 100%;
		font-size: 40upx !important;
		font-weight: 500;
		font-family: PingFang SC;
		color: rgba(52, 56, 66, 1);
		background: #FFFFFF;
		margin: 60upx 0 20upx;

		view {
			font-size: 40upx !important;
		}
	}

	// 订单已取消状态
	.cancel {
		.flex;
		.jz;
		background: #ffffff;
		font-size: 30upx;
		text-align: center;
		border-radius: 6upx;
		color: #666;
		height: 60upx;

		view {
			width: 220upx;
			background: #ffffff;
		}
	}

	// 订单编号部分
	.orderNumber {

		font-size: 28upx;
		padding: 14upx;
		box-sizing: border-box;
		background: #fff;
		color: #666;
		margin: 12upx 0 40upx 0;
	}

	.hd {
		display: none;
	}
</style>

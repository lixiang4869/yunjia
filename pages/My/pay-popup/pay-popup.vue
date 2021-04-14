<template>
	<view class="box" :style="{width,height}">
		<!-- 平台提示 -->
		<view class="top">
			<view class="hintBox">
				<view class="hintTxt">
					<text class="hint">请于1小时内完成付款逾期未付订单自动关闭</text>
				</view>
				<view class="timeBox">
				
					<text style="color: #FFFFFF; font-size: 28rpx;"> 交易状态</text>
					<text style="color: #FFFFFF; font-size: 28rpx;font-weight: 700;margin-left: 30rpx;">{{status}}</text>
				</view>
			</view>
		</view>
		<!-- 选择地址 -->
		<view class="userInfoBox">
			<view class="userCity">
				<view class="cityTextBox">
					<text class="cityName">{{orderDetails.prov_name}}{{orderDetails.city_name}}{{orderDetails.area_name}}{{orderDetails.address}}</text>
					<text class="phoneName">{{orderDetails.consignee}} {{orderDetails.mobile}}</text>
				</view>
				<!-- <image class="icon" src="../../static/public/right.png"></image> -->
			</view>
			<view class="payTypeBox">
				<view class="payTypeLeft">
					<text class="payTypeHint">支付方式</text>
					<view class="payType" v-if="orderDetails.trade_type==1">
						<image class="payTypeLog" :src="actionPayType.src"></image>
						<text class="payTypeName" style="margin-left: 20rpx;">{{actionPayType.name}}支付</text>
					</view>
					<view class="payType" v-if="orderDetails.trade_type==5">
						<!-- <image class="payTypeLog" :src="actionPayType.src"></image> -->
						<text class="payTypeName" style="margin-left: 20rpx;">积分支付</text>
					</view>
				</view>
			
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="ddInfoBox">
			<scroll-view class="shopInfoBox" :scroll-y="true" :enable-flex="true">
				<view class="shopItem" v-for="(item,index) in goods" :key="index">
					<view class="shopInfo">
						<image class="shopImg" :src="url+item.goods_preview"></image>
						<view class="shopInfoTxtBox">
							<text class="shopName">{{item.goods_name}}</text>
							<text class="oldPrice" style="text-decoration: none;">数量：{{item.goods_num}}</text>
						</view>
					</view>
					<view class="shopPrice">
						<text class="newPrice">￥{{item.buy_price}}</text>
					</view>
				</view>
			</scroll-view>
			<view class="shopData">
				<!-- <view class="ddBianhao" v-if="orderDetails.order_status == 60">
					<text class="ddName">物流公司</text>
					<text class="info">{{orderDetails.express_name}}</text>
				</view>
				<view class="ddBianhao" v-if="orderDetails.order_status == 60">
					<text class="ddName">物流单号</text>
					<text class="info">{{orderDetails.express_no}}</text>
				</view> -->
				<view class="ddBianhao">
					<text class="ddName">订单编号</text>
					<text class="info">{{orderDetails.order_sn}}</text>
				</view>
				<view class="ddBianhao">
					<text class="ddName">创建时间</text>
					<text class="info">{{time(orderDetails.add_time)}}</text>
				</view>
				<view class="ddBianhao">
					<text class="ddName">实付款</text>
					<view class="payNumBox">
						<text class="pay">￥</text>
						<text class="payNum pay">{{orderDetails.pay_amount}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 支付模块 -->
		<view class="payInfoBox">
			<view class="icons">
				<view class="iconitem" @click="call">
					<image class="kefuImg" src="../../../static/public/kefu.png" mode=""></image>
					<text class="kefuTxt">客服</text>
				</view>
				<view class="iconitem" @click="call">
					<image class="kefuImg" src="../../../static/public/phone.png"></image>
					<text class="kefuTxt">拨打电话</text>
				</view>
			</view>
			<view class="btns">
				<view class="btn" style="background-color: #ffebeb;border-top-left-radius: 10rpx;border-bottom-left-radius: 10rpx;"
				 v-if="orderDetails.order_status == 20" @click.stop="cancle()">
					<text class="btnText" style="color: #ff4444;">取消订单</text>
				</view>
				<view class="btn" style="background-color: #ff4444;border-top-right-radius: 10rpx;border-bottom-right-radius: 10rpx;"
				 v-if="orderDetails.order_status == 20" @click.stop="pay()">
					<text class="btnText" style="color: #FFFFFF;">立即支付</text>
				</view>

				<view class="btn" style="background-color: #ffebeb;border-top-left-radius: 10rpx;border-bottom-left-radius: 10rpx;"
				 v-if="orderDetails.order_status == 70" @click.stop="confirm()">
					<text class="btnText" style="color: #ff4444;">确认收货</text>
				</view>
				<!-- <view class="btn" style="background-color: #ff4444;border-top-right-radius: 10rpx;border-bottom-right-radius: 10rpx;" v-if="orderDetails.order_status == 60" @click.stop="gologistics()">>
					<text class="btnText" style="color: #FFFFFF;">查看物流</text>
				</view> -->
				<view class="btn" style="background-color: #999999;border-radius: 10rpx;" v-if="orderDetails.order_status == 10">
					<text class="btnText" style="color: #FFFFFF;">已取消</text>
				</view>
				<view class="btn" style="background-color: #999999;border-radius: 10rpx;" v-if="orderDetails.order_status == 60">
					<text class="btnText" style="color: #FFFFFF;">配送中</text>
				</view>
			</view>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="popBox">
				<view class="item" v-for="(item,index) in zffs" :key="index" @click="check(index)">
					<view class="left">
						<image class="logImg" :src="item.src"></image>
						<text class="merchantName">{{item.name}}</text>
					</view>
					<image class="checkImg" :src="item.check?'../../../static/public/pitch_on.png':'../../../static/public/circle.png'"></image>
				</view>
				<view style="width: 100%;display: flex;flex-direction: row;justify-content: center;margin-top: 150upx;margin-bottom: 30upx;">
					<text class="submit" @click="payment">完成</text>
				</view>
				<view style="height: 1upx;"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import request from '../../../store/http.js';
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				width: '',
				height: '',
				zffs: [{
						name: '微信',
						src: '../../../static/public/wei.png',
						check: 1,
						pay: 'wxpay'
					},
					// {name:'支付宝',src:'../../static/public/zhi.png',check:0,pay:'alipay'}
				],
				actionPayType: {
					name: '微信',
					src: '../../../static/public/wei.png',
					check: 1,
					pay: 'wxpay'
				},
				dingdan: [],
				order_id: '',

				goods: [],
				url: this.$store.state.url,
				id: "",
				status: '',
				payType: 1,
				consignee: {},
				orderDetails: {},
				commodity: [],
				order_sn: null,
				group_sn: null,
				phones: [{
						name: '联系客服',
						img: '../../../static/phone.png'
					},
					{
						name: '拨打电话',
						img: '../../../static/phone1.png'
					}
				]
			}
		},
		onLoad(e) {
			this.getVideoXY();
			this.id = e.id;
			this.group_sn = e.group_sn;
			if (!this.group_sn) {
				this.order_sn = e.order_sn;
			}
			// console.log("this.group_sn",this.group_sn+"this.order_sn="+this.order_sn)
		},
		onShow() {
			this.order_data();
		},
		methods: {
			// 获取视口宽高
			getVideoXY() {
				let res = uni.getSystemInfoSync()
				this.width = res.windowWidth + 'px';
				this.height = res.windowHeight + 'px';
			},
			selectPayType() {
				this.$refs.popup.open();
			},
			check(index) {
				this.payType = index + 1;
				console.log(index)
				this.zffs[index].check = this.zffs[index].check ? 0 : 1;
				for (var i = 0; i < this.zffs.length; i++) {
					if (this.zffs[i].check == 1 && index != i) {
						this.zffs[i].check = 0
					}
				}
				this.actionPayType = this.zffs[index];
			},
			payment() {
				this.$refs.popup.close()
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: "4000371189",
					fail(res) {

					}
				})
			},
			gologistics(id) {
				uni.navigateTo({
					url: '../logistics/index?id=' + this.orderDetails.express_no
				})
			},
			// 10:买家取消 20:新订单 40:已付款 60:已发货 80:已收货 100:已评价 120:已结算
			getstatus(i) {
				console.log(i);
				switch (i) {
					case 10:
						this.status = '已取消';
						break;
					case 20:
						this.status = '待付款';
						break;
					case 40:
						this.status = '待发货';
						break;
					case 60:
						this.status = '已发货';
						break;
					case 80:
						this.status = '已收货';
						break;
					case 120:
						this.status = '已完成';
						break;
				}
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
			order_data() {
				let authtoken = uni.getStorageSync("authtoken");
				let requestUrl;

				if (!this.group_sn) {
					requestUrl = this.url + "/api/member/orderItemDetails";

				} else {
					requestUrl = this.url + '/api/member/erpOrderDetails';

				}
				request.urlRequest(
					requestUrl, {
						order_sn: this.order_sn,
						group_sn: this.group_sn
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						console.log(res);
						if (res.data.code == 1) {
							this.orderDetails = res.data.data.info;
							this.goods = res.data.data.orders_goods;
							this.getstatus(this.orderDetails.order_status);
						}
					}
				);

			},
			confirm() {
				console.log('order_data', this.id)
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/member/userconfirmorder', {
						order_id: this.id
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
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
			pay() {
				if(this.orderDetails.trade_type==1){
					if (this.group_sn) {
						// #ifdef APP-PLUS
						this.payApp();
						// #endif
						// #ifdef MP-WEIXIN
						this.payXiaoChengXu();
						// #endif
					} else {
					this.payOid(this.orderDetails.order_id)
					}
				}else{
					this.payJifen(this.orderDetails.order_id)
				}
				
			},
			payJifen(order_id){
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(this.url+"/api/order/pointsForGoods",{order_id:order_id},{authtoken: authtoken},"POST",res=>{
					if(res.data.code==1){
						uni.navigateTo({
							url: './Pay_success'
						})
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}
				})
			},
			payOid(order_id) {
			
				let authtoken = uni.getStorageSync("authtoken");
				let type;
				let code;
				// #ifdef APP-PLUS
				type = 1;
				uni.request({
			
					url: this.url+"/api/order/payorder",
					data: {
						trade_type: type,
						oid: order_id,
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
				let _this = this;
				uni.login({
					success(e) {
						console.log('e', e);
						_this.getPayInfoByOid(order_id, e.code);
					},
					fail(e) {
						console.log('code', e);
			
					}
			
				})
				// #endif
			},
			getPayInfoByOid(order_id, code) {
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url+"/api/order/payorder", {
						trade_type: 2,
						oid: order_id,
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
					this.url + "/api/order/payErpCartOrder", {
						trade_type: type,
						group_sn: this.group_sn,
						code: code,
						// from_uid:id
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
										_this.isRefreshPrePage();
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
			payApp() {
				// let leader =uni.getStorageSync("Leaders") ;
				// let id;
				// if(leader!=null) id= leader.id
				let authtoken = uni.getStorageSync("authtoken");
				uni.request({

					url: this.url + "/api/order/payErpCartOrder",
					data: {
						trade_type: 1,
						group_sn: this.group_sn,
						// from_uid:id
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
										this.isRefreshPrePage();
										uni.navigateTo({
											url: './Pay_success'
										})
									},
									fail: function(err) {

									}
								});
						}else{
							uni.showToast({
								title:res.data.msg,icon:"none"
							})
						}
					},
					fail: (res) => {
						console.log("请求失败", res)
					}
				})
			},
			cancle() {
				uni.showModal({
					title: '提示',
					content: '确定取消订单么',
					success: res => {
						console.log(res);
						if (res.confirm) {
							this.call_off();
						}
					}
				});
			},
			call_off() {

				let authtoken = uni.getStorageSync("authtoken");


				uni.request({
					url: this.url + '/api/member/cancelorder',
					header: {
						authtoken: authtoken
					},
					method: 'POST',
					data: {
						order_id: this.orderDetails.order_id
					},
					success: (res) => {
							this.isRefreshPrePage();
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
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			open() {
				this.$refs.popup.open()
			}
		}
	}
</script>

<style lang="less" scoped>
	.box {
		background-color: #F5F6F9;
	}

	.top {
		width: 100%;
		height: 20%;
		margin-bottom: 30rpx;
		background-color: #E83E25;
	}

	.hintBox {
		width: 100%;
		height: 20;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.hintTxt {
		width: 50%;
	}

	.hint {
		font-size: 34rpx;
		color: #FFFFFF;
	}

	.timeBox {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.minutesBox {
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

	.timeNum {
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.userInfoBox {
		width: 92%;
		height: 20%;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-top: -20%;
	}

	.userCity {
		width: 100%;
		height: 60%;
		border-bottom: 1rpx solid #F4F4F4;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.cityTextBox {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.cityName {
		font-size: 36rpx;
		font-weight: 700;
		color: #333333;
	}

	.phoneName {
		font-size: 28rpx;
		color: #333333;
	}

	.icon {
		width: 50rpx;
		height: 50rpx;
	}

	.payTypeBox {
		width: 100%;
		height: 40%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.payTypeLeft {
		width: 90%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.payTypeHint {
		font-size: 30rpx;
		color: #333333;
	}

	.payType {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.payTypeLog {
		width: 40rpx;
		height: 40rpx;
	}

	.payTypeName {
		font-size: 30rpx;
		color: #333333;
	}

	.ddInfoBox {
		width: 92%;
		height: 55%;
		background-color: #FFFFFF;
		margin: 0 auto;
		margin-top: 30rpx;
		border-radius: 20rpx;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.shopInfoBox {
		width: 100%;
		height: 60%;
		padding: 10rpx;
		box-sizing: border-box;
		flex-direction: column;
	}

	.shopItem {
		width: 100%;
		height: 190rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.shopInfo {
		width: 60%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.shopImg {
		width: 160rpx;
		height: 160rpx;
		border-radius: 20rpx;
	}

	.shopInfoTxtBox {
		width: 60%;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
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

	.shopTxt {
		font-size: 26rpx;
		color: #999999;
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-line-clamp: 1; //此处为上限行数
		-webkit-box-orient: vertical;
	}

	.shopPrice {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.oldPrice {
		font-size: 26rpx;
		color: #999999;
		margin-right: 20rpx;
		text-decoration: line-through;
	}

	.newPrice {
		font-size: 30rpx;
		color: #333333;
		font-weight: 700;
	}


	.shopData {
		width: 100%;
		height: 40%;
	}

	.ddBianhao {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 0rpx;
	}

	.ddName {
		font-size: 30rpx;
		color: #333333;
	}

	.info {
		font-size: 30rpx;
		color: #999999;
	}

	.payNumBox {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-end;
	}

	.pay {
		font-size: 30rpx;
		color: #fe5037;
		font-weight: 700;
	}

	.payNum {
		font-size: 40rpx;
	}

	.payInfoBox {
		width: 92%;
		height: 8%;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 30rpx;
		left: 50%;
		margin-left: -46%;
		padding: 10rpx;
		margin-top: 30rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.icons {
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.iconitem {
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.kefuImg {
		width: 40rpx;
		height: 40rpx;
	}

	.kefuTxt {
		font-size: 22rpx;
		color: #666666;
	}

	.btns {
		width: 60%;
		height: 100%;
		display: flex;
		flex-direction: center;
		align-items: center;
	}

	.btn {
		width: 100%;
		height: 80%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.btn:first-child {
		background-color: #ffebeb;
		border-top-left-radius: 10rpx;
		border-bottom-left-radius: 10rpx;
	}

	.btn:last-child {
		background-color: #ff4444;
		border-top-right-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
	}

	.btnText {
		font-size: 32rpx;
	}


	.popBox {
		width: 100%;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		background-color: #FFFFFF;
	}

	.item {
		width: 100%;
		height: 100upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 30upx;
		box-sizing: border-box;
		margin-bottom: 20upx;

		.left {
			display: flex;
			flex-direction: row;
			align-items: center;

			.merchantName {
				font-size: 34upx;
				font-weight: 700;
			}

			.logImg {
				width: 50upx;
				height: 50upx;
			}
		}

		.checkImg {
			width: 50upx;
			height: 50upx;
		}
	}

	.submit {
		padding: 10upx 40%;
		border-radius: 10upx;
		background-color: #F0AD4E;
		color: #FFFFFF;
		font-size: 38upx;
	}
</style>

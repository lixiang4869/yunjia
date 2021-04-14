<template>
	<view>
	<view class="all">
		<view class="top"></view>
		<!-- 收货地址 -->
		<view class="addr" @tap="selectAddress">
		
		
			<view v-if="recinfo.name" style="width: 100%;font-size: 30upx;">
				
		
					<view class="tel-name">
						<view >联   系   人:</view>
						<view class="name">
							{{recinfo.name}}
						</view>
						<view class="tel">
							{{recinfo.phone}}
						</view>
					</view>
					<view class="addres">
						<view class="dizhi">收货地址:</view>
						<view style="margin-left: 20rpx;">{{recinfo.addrs}}{{recinfo.addrmore}}
						</view>
					</view>
				
			</view>
			<view class="tel-name" v-else>
				<!-- 收货地址 -->
				<view class="addr2" @tap="selectAddress">
					<image class="tianjia" src="../../../static/bao/add.png"></image>
					<text class="dizhi">选择地址</text>
		
				</view>
			</view>
		</view>
		<view class="top"></view>
	
		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="row" v-for="(row,index) in orderList" :key="index">
	
	
				<image :src="url+row.img" class="img" mode="aspectFill"></image>
	
				<view class="info">
					<view style="display: flex; flex-direction: row; margin-top: 20rpx;">
						<view class="title">{{row.name}}</view>
						<view class="price">￥{{row.price }}</view>
					</view>
	
					<!-- <view class="spec">颜色{{row.spec}} 尺寸:{{row.size}}</view> -->
					<view class="price-number">
						<view class="title"></view>
						<view class="number">
							X {{row.num}}
						</view>
					</view>
				</view>
			</view>
	
		</view>
		<!-- 明细 -->
		<view class="deat">
			<view class="detail">
				<view class="row">
					<view class="nominal">
						共{{sumPrice}}件商品 小计
					</view>
					<view class="content">
						￥{{goodsPrice|toFixed}}
					</view>
				</view>
			</view>
		</view>
	
		<view style="color: #333333;font-size: 30upx;padding-left: 20rpx;">备注:</view>
		<view class="bei">
			<textarea placeholder="请输入备注信息" v-model="remark" ></textarea>
		</view>
		
	
	</view>
		<view class="footer" @tap="toPay">提交订单</view>
	</view>
</template>

<script>
	import request from '../../../store/http.js';
	export default {
		data() {
			return {
				authtoken: uni.getStorageSync("authtoken"),
				address: {},
				goodsPrice: 0, //商品合计价格
				sumPrice: 0, //用户付款价格
				/* recinfo:{id:1,name:"大黑哥",head:"大",tel:"18816881688",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深南大道1111号无名摩登大厦6楼A2'},isDefault:true},
				 */
				url: this.$store.state.url,
				recinfo: {},
				orderList: [],
				code: null,
				leaders: {},
				shName: "",
				shPhone: "",
				limg: "",
				sid: null
			};
		},
		filters: {
			toFixed: function(x) {
				return parseFloat(x).toFixed(2);
			}
		},

		onShow() {

			this.goodsPrice = 0;
			this.sumPrice = 0;
			//合计
			let len = this.orderList.length;
			for (let i = 0; i < len; i++) {
				this.goodsPrice = this.goodsPrice + (this.orderList[i].price * this.orderList[i].num);
				this.sumPrice = this.sumPrice + (this.orderList[i].num)
				console.log(this.sumPrice)
			}
			
			let _this = this;
			
		},
		onLoad(e) {
			this.orderList = JSON.parse(e.data);
			this.sid=e.sid;
			this.getAddress();

		},

		methods: {
		
			shouquan(group_sn) {
				uni.requestSubscribeMessage({
					tmplIds: ['JAkDKG-ObvFFlrCC2I8Lp1MQLXoTzvSOSWKER7-o8qI'],
					success(e) {

						uni.redirectTo({

							url: '../pay-popup/pay-popup?group_sn=' + group_sn
						});
					},
					fail(e) {
						console.log("requestSubscribeMessage", e);
						uni.redirectTo({

							url: '../pay-popup/pay-popup?group_sn=' + group_sn
						});
					}
				})
			},
			toPay() {
				// var templateid = ['rlIR_lis29pxyzU_1b76-6CeMY4rhro_nASjxd3etUs'];//注意这里是数组
				// uni.requestSubscribeMessage({
				//    tmplIds: templateid,
				//    success (res) {
				// 	  console.log(res)
				//    },
				//    fail:(res) => {
				// 	  console.log(res)
				//    }
				// })

				
				let goodsid = this.orderList[0].id;
				// let len = this.orderList.length;
				// for (let i = 0; i < len; i++) {
				// 	paymentOrder.push(this.orderList[i]);
				// 	if (i < len - 1)
				// 		goodsid += (this.orderList[i].id + ',');
				// 	else goodsid += this.orderList[i].id;
				// }
				let num = this.orderList[0].num
				let modular_id = this.orderList[0].modular_id;
				
			if (this.recinfo == null) {
					uni.showToast({
						title: '请选择地址',
						icon: 'none'
					});
				}
				let authtoken = uni.getStorageSync("authtoken");
				uni.showLoading({
					title: '正在提交订单...'
				})
			
				request.urlRequest(
					this.url + '/api/order/addOrderIntoErpNow', {
						// leader_id: l,
						
						from_uid:this.sid,
						ids: goodsid,
						addr_id: this.recinfo.id,
						// name: this.shName,
						// phone: this.shPhone,
						trade_type: 1,
						from_where: 2,
						take_type: 0,
						remark: this.remark,
						modular_id: modular_id,
						num: num
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {


						uni.hideLoading();
						if (res.data.code == 1) {

							// #ifdef MP-WEIXIN
							this.shouquan(res.data.data.group_sn);
							// #endif
							// #ifndef MP-WEIXIN
							uni.redirectTo({

								url: '../pay-popup/pay-popup?group_sn=' + res.data.data.group_sn
							});
							// #endif



						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				);

			},
			getAddress() {
				let authtoken = uni.getStorageSync("authtoken");
							
				request.urlRequest(
					this.url + '/api/member/memaddr', {}, {
						authtoken: authtoken
					},
					'POST',
					res => {
							
						if (res.data.code == 1) {
							var addressList = res.data.data;
							for (let j = 0; j < addressList.length; j++) {
								if (addressList[j].defaults == 2) {
									this.recinfo = addressList[j];
									console.log(this.recinfo);
								}
							}
						} else {
							uni.showToast({
								title: '当前没有地址信息哦',
								icon: 'none'
							});
						}
					}
				);

			},

			getWXPhone(encryptedData, iv, code) {
				let authtoken = uni.getStorageSync('authtoken');
				request.urlRequest(this.url + "/api/index/getUserWxPhone", {
					encryptedData: encryptedData,
					iv: iv,
					code: code
				}, {
					authtoken: authtoken
				}, "POST", res => {
					console.log("shPhone", res)
					if (res.data.code == 1)
						this.shPhone = res.data.data.phoneNumber
					else {
						uni.showToast({
							title: res.data.msg
						})
					}
					this.code = null;
				})
			},
			getphone(e) {
				console.log("getphone", e)
				if (!this.code) {
					let _this = this;
					uni.login({
						success(res) {
							_this.code = res.code;
							_this.getWXPhone(e.detail.encryptedData, e.detail.iv, _this.code)
						}
					})
				} else {
					this.getWXPhone(e.detail.encryptedData, e.detail.iv, this.code)
				}

				// console.log(e);
			},

			//选择收货地址
			selectAddress() {
				let _this =this
				uni.navigateTo({
					url: '../../Address/Receiving?source=2',
					events: {
						acceptDataFromOpenedPage: function(data) {
						
							if (data.data) {
								_this.recinfo = JSON.parse(decodeURIComponent(data.data))
									
							}
						},
					}
				})
			},
			// 提交订单
			payOrder() {
				uni.navigateTo({
					url: '../Pay-order/Pay-order'
				})
			}
		}
	}
</script>


<style lang="scss">
	.bei {
		margin-top: 20rpx;
		display: flex;
		width:  calc(100% - 40px);
		margin-left: 4%;
		margin-right: 4%;
		padding-left: 20rpx;
		padding-right:20rpx;
		padding-top: 20rpx;
		height: 210upx;
	
		background-color: #ffffff;
		border-radius: 20rpx;
	}
	
	.btnwx {
	
		margin-bottom: 30rpx;
		margin-right: 30rpx;
		font-size: 28upx;
		line-height: 50upx;
		color: #ffffff;
		border-radius: 25upx;
		height: 50upx;
		padding-right: 22upx;
		padding-left: 22upx;
		background: #f72926;
	}
	
	// .right {
	// 	/* //第一行向右图片 */
	// 	margin-left: 24upx;
	// 	margin-right: 24upx;
	// 	width: 12upx;
	// 	height: 12upx;
	// }
	
	.header-noe {
		border-radius: 11rpx;
		background: #ffffff;
		margin: 20upx;
		height: 150upx;
		flex-direction: row;
		display: flex;
		justify-content: left;
		align-items: center;
	
		.header-detail {
			margin-left: 10upx;
			display: flex;
			flex-direction: column;
			margin-bottom: 20upx;
	
			.biaoti-name {
				font-weight: 700;
	
				font-size: 34upx;
				font-family: PingFangSC-Medium, PingFang SC;
				color: #F83930;
	
			}
	
			.biaoti-name2 {
				font-weight: 700;
	
				font-size: 34upx;
				font-family: PingFangSC-Medium, PingFang SC;
				color: #333333;
	
			}
	
			.biaoti-dis {
				font-weight: 700;
	
				font-size: 32upx;
				font-family: PingFangSC-Medium, PingFang SC;
				color: #0081Ff;
	
			}
	
			.biaoti-one {
	
				margin-top: 24rpx;
				font-size: 26rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				color: #999999;
	
			}
	
		}
	
		.location {
			/* //第一行定位图片 */
			margin-left: 26upx;
			margin-right: 26upx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 5upx;
		}
	
	
	
	
	}
	
	page {
	
		background: #F4F5F8;
	}
	
	.all{
		width: 100%;
		flex-direction: column;
		justify-content: center;
		display: flex;
	}
	
	.top {
		width: 100%;
		height: 30upx;
		background: #f0f2f5;
	}
	
	.addr2 {
		width: 86%;
		padding: 20upx 3%;
		margin: 30upx auto 20upx auto;
	
		display: flex;
	
		.icon {
			width: 80upx;
			height: 80upx;
			display: flex;
			align-items: center;
	
			image {
				width: 60upx;
				height: 60upx;
			}
	
		}
	
		.dizhi {
	
			margin-top: 15upx;
			margin-bottom: 10upx;
			margin-left: 30upx;
			font-size: 35upx;
		}
	
		.tianjia {
			margin-top: 20upx;
			margin-bottom: 10upx;
			margin-left: 5upx;
			width: 37upx;
			height: 37upx;
		}
	
		/* .tel-name{
		width: 100%;
		display: flex;
		font-size: 32upx;
		.tel{
			margin-left: 40upx;
		}
	}
	.addres{
		width: 100%;
		font-size: 26upx;
		color: #999;
	} */
	}
	
	.addr {
		background: #ffffff;
		width: 100%;
		margin: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: left;
		align-items: center;
	
		// >image{
		// 	width: 40upx;
		// 	height: 40upx;
		// 	margin-right: 20upx;
		// }
		// >text{
		// 	font-size: 32upx;
		// }
		.tel-name {
			width: 100%;
			display: flex;
			flex-direction: row;
	
			margin-top: 30rpx;
			align-items: center;
	
			.t {
				color: #333333;
				font-size: 30upx;
				padding-left: 20rpx;
			}
	
			.name {
				margin-right: 30rpx;
				margin-left: 30rpx;
				
				color: #333333;
				font-size: 30upx;
			}
	
			.name2 {
				margin-top: 10upx;
				border: 0.5rpx solid #E6E6E6;
				padding-left: 20upx;
				font-size: 30upx;
			}
	
			.tel {
				margin-left: 10upx;
			}
		}
	
		.addres {
			margin-bottom: 30rpx;
			width: 100%;
			font-size: 30upx;
			display: flex;
			flex-direction: row;
			padding-top: 10upx;
	
		}
	}
	
	.buy-list {
	
	
		.row {
			background: #ffffff;
			margin: 20upx;
	
			display: flex;
	
			.img {
				margin-left: 20rpx;
				width: 150rpx;
				height: 150rpx;
			}
	
			.info {
	
				margin-left: 20rpx;
				flex: 1;
				height: 150rpx;
				display: flex;
				flex-direction: column;
	
	
	
	
	
				.price-number {
					margin-top: 20upx;
					display: flex;
					margin-right: 30rpx;
					font-size: 28upx;
	
	
	
	
					.number {
						font-size: 30rpx;
						display: flex;
						justify-content: center;
						align-items: center;
	
					}
				}
			}
	
		}
	}
	
	// .deat {
	// 	border-top: 1upx solid #F5F5F5;
	// }
	
	.title {
		flex: 1;
		color: #333333;
		font-size: 30upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		// text-align: justify;
		overflow: hidden;
	}
	
	.price {
		margin-right: 30rpx;
		font-size: 30rpx;
		color: #FF4444;
	}
	
	.detail {
	
	
		.row {
			margin: 20upx;
			height: 60upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
	
			.nominal {
				font-size: 28upx;
				color: #333333;
			}
	
			.content {
				margin-right: 20upx;
				font-size: 34upx;
				color: #f81324;
			}
		}
	}
	
	.footer {
		width: 92%;
		margin: 150upx 4%;
		background-color: $uni-color-primary;
		height: 100upx;
		font-size: 30upx;
		border-radius: 20upx;
		text-align: center;
		line-height: 100upx;
		color: #FFFFFF;
	}
</style>

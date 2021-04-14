<template>
	<view>
		<view class="top-img">
			<image src="https://xin.yiyunoto.com/uploads/static/tc/xiche.png"></image>
		</view>
		<view class="box" @click="selectAddress">
			<view class="top">
				<image class="image1" src="https://xin.yiyunoto.com/uploads/static/home/location1.png"></image>
				<text class="t">{{recinfo.addrs}}{{recinfo.addrmore}}</text>
				<image class="image2" src="../../../static/home/right.png"></image>
			</view>
			<text class="name">姓名：{{recinfo.name}} 电话：{{recinfo.phone}}</text>
		</view>
		<view class="box">
			<view class="item1">

				<text class="left1">车辆信息</text>
				<!-- <text class="right">更多车辆</text> -->
			</view>
			<view class="item">

				<text class="left">车辆类型</text>
				<!-- 	<view class="right" @click="selectType">
					<text>汽车</text>
					<image src="../../../static/img/xia.png" style="width: 19rpx; height: 11rpx;margin-left: 20rpx;"></image>
				</view> -->
				<xfl-select class="selectlist" v-if="isShowType" :list="type_list" :clearable="false" :showItemNum="type_list.length"
				 :isCanInput="false" :style_Container="'height: 50px; font-size: 16px;'" :placeholder="'placeholder'" :initValue="type_list[0]"
				 :selectHideType="'hideAll'" @change="change">
				</xfl-select>
			</view>
			<view class="item">

				<text class="left">车辆型号</text>
				<xfl-select class="selectlist" v-if="isShowType" :list="car_type_list" :clearable="false" :showItemNum="car_type_list.length"
				 :isCanInput="false" :style_Container="'height: 50px; font-size: 16px;'" :placeholder="'placeholder'" :initValue="car_type_list[0]"
				 :selectHideType="'hideAll'" @change="changeType">
				</xfl-select>

			</view>
			<view class="item">

				<text class="left">车辆牌号</text>
				<view class="right">
					<input class="text" v-model="carno" placeholder="请填写车牌号"></input>
					<!-- <image src="../../../static/img/xia.png" style="width: 19rpx; height: 11rpx;margin-left: 20rpx;"></image> -->
				</view>
			</view>
			<view class="item">

				<text class="left">车辆品牌</text>
				<view class="right">
				<input class="text" v-model="car_brand" placeholder="请填写车辆品牌"></input>
					<!-- <image src="../../../static/img/xia.png" style="width: 19rpx; height: 11rpx;margin-left: 20rpx;"></image>	 -->
				</view>



			</view>
			<view class="item">

				<text class="left">车辆颜色</text>
				<xfl-select class="selectlist" v-if="isShowType" :list="car_color" :clearable="false" :showItemNum="car_color.length"
				 :isCanInput="false" :style_Container="'height: 50px; font-size: 16px;'" :placeholder="'placeholder'" :initValue="car_color[0]"
				 :selectHideType="'hideAll'" @change="changeColor">
				</xfl-select>

			</view>
			<view class="item">

				<text class="left">车辆照片</text>
				<image v-if="img"  :src="img" class="car-img" @click="chooseimg"></image>
				<image v-else src="../../../static/up.png"  class="car-img" @click="chooseimg"></image>

			</view>
		</view>
		<view class="box">
			<view class="item1">

				<text class="left1">服务信息</text>

			</view>
			<view class="item">

				<text class="left">服务类型</text>
				<xfl-select class="selectlist2" v-if="isShowType" :list="service_type_list" :clearable="false" :showItemNum="service_type_list.length"
				 :isCanInput="false" :style_Container="'height: 50px; font-size: 16px;'" :placeholder="'placeholder'" :initValue="service_type_list[0]"
				 :selectHideType="'hideAll'" @change="changeService">
				</xfl-select>

			</view>
			<view class="item">

				<text class="left">洗车时间</text>
				<view class="right">
					<text>{{cleanTime}}分钟</text>
					<!-- <image src="../../../static/img/xia.png" style="width: 19rpx; height: 11rpx;margin-left: 20rpx;"></image> -->
				</view>

			</view>
		</view>
		<view class="box">
			<view class="item1">

				<text class="left1">付款信息</text>

			</view>
			<view class="item">

				<text class="left">付款方式</text>
				<view class="right">
					<text>在线支付</text>
					<!-- <image src="../../../static/img/xia.png" style="width: 19rpx; height: 11rpx;margin-left: 20rpx;"></image>	 -->
				</view>

			</view>
			<view class="item">

				<text class="left">备注</text>
				<view class="right">
					<input class="text" v-model="beizhu" placeholder="请输入备注信息"></input>
				
					<!-- <image src="../../../static/img/xia.png" style="width: 19rpx; height: 11rpx;margin-left: 20rpx;"></image>	 -->
				</view>
			</view>
		</view>
		<view class="box2">
			<view style="font-size: 20rpx;color: #ffffff;margin-left: 20rpx;">总计￥</view>
			<view style="font-size: 30rpx;color: #ffffff; flex: 1;">{{price}}</view>
			<view v-if="isBtn" class="btn" @click="affirmOrder">确定</view>
			<view v-else class="btn btn_f">确定</view>
		</view>
	</view>
</template>

<script>
	import request from "../../../store/http.js"
	import xflSelect from '../../../components/xfl-select/xfl-select.vue'; //导入
	export default {
		components: {
			xflSelect
		},
		data() {
			return {
				beizhu:null,
				carno:null,
				cleanTime:30,
				car_type:0,
				service_type:0,
				url: this.$store.state.url,
				cityurl: this.$store.state.cityUrl,
				recinfo: {
					name: "",
					phone: "",
					addrmore: "",
					addrs: ""
				},
				car_type_list: [],
				type_list: [],
				service_type_list: [],
				car_color: [],
				isShowType: false,
				price:"0.0",
				imageId:null,
				img:null,
				color:0,
				car_brand:null,
				car_spec_id:null,
				id:'',
				isBtn: true
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getCarInfo();
			this.getAddress();
			this.authtoken = uni.getStorageSync('authtoken');
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
			chooseimg(){
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [], //从相册选择
					success: (res) => {
						console.log('res', res)
						var img = res.tempFilePaths
						
						uni.uploadFile({
							url: this.cityurl + '/api/file/upload',
							
							name: 'file',
							method: "POST",
						    filePath: img[0],
							
							success: (uploadFileRes) => {
								console.log('res', uploadFileRes)
								var json = JSON.parse(uploadFileRes.data);
								console.log(json)
								
								this.imageId= json.data.id;
								this.img=img[0];
								uni.showToast({
									title: json.desc,icon:"none"
								})
							},
							fail: (err) => {
								console.log('err', err)
							}
						});
				
					}
				});
			},
			change({newVal, oldVal, index, orignItem}){
				this.type=index;
				
			},
			changeColor({newVal, oldVal, index, orignItem}){
				this.color=index;
			
			},
			changeType({newVal, oldVal, index, orignItem}){
				this.car_type=index;
				this.getPrice();
			},
			changeService({newVal, oldVal, index, orignItem}){
				this.service_type=index;
				this.getPrice();
			},
			getAddress() {
				uni.showLoading({

				})
				let authtoken = uni.getStorageSync("authtoken");

				request.urlRequest(
					this.url + '/api/member/memaddr', {}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						uni.hideLoading();
						if (res.data.code == 1) {
							var addressList = res.data.data;
							for (let j = 0; j < addressList.length; j++) {
								if (addressList[j].defaults == 2) {
									this.recinfo = addressList[j];
									console.log(this.recinfo);
								}
							}
						} else if (res.data.code != -7) {
							uni.showModal({
								content: "是否添加地址",
								success(e) {
									if (e.confirm) {
										uni.navigateTo({
											
											url: '/pages/Address/Receiving?source=2'
										})
									}
								}
							})

						}
					}
				);
			},
			getCarInfo() {
				request.urlRequest(this.cityurl + "/api/car/order/carConfigInfo", {}, {}, "POST", res => {
					if (res.data.code == 10000) {
						this.car_type_list = res.data.data.car_type_list;
						this.car_color = res.data.data.car_color;
						this.service_type_list = res.data.data.service_type_list;
						this.type_list = res.data.data.type_list;
						this.isShowType = true;
						this.getPrice();
					}
				})
			},
			getPrice(){
				request.urlRequest(this.cityurl + "/api/car/order/carSpec", {
					shop_id:1,car_type:this.car_type,service_type:this.service_type
				}, {}, "POST", res => {
					if (res.data.code == 10000) {
						this.cleanTime=res.data.data[0].length
						this.price = res.data.data[0].price
						this.car_spec_id = res.data.data[0].id
					}
				})
			},
			//选择收货地址
			selectAddress() {
				
				// this.pay("C20200618163518931");
				uni.navigateTo({
					url: '/pages/Address/Receiving?source=2'
				})
			},
			affirmOrder(){
				this.isBtn = false;
				let authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.cityurl + "/api/car/order/createCarOrder", {
					shop_id:1,type:this.type,service_type:this.service_type,car_spec_id:this.car_spec_id,
					car_color:this.color,car_brand:this.car_brand,attachment_id:this.imageId,car_num:this.carno,
					remark:this.beizhu,addr_id:this.recinfo.id
					
				}, {authtoken: authtoken}, "POST", res => {
					
					if (res.data.code == 10000) {
						let order_sn = res.data.data.order_sn;
						this.pay(order_sn);
					}else {
						uni.showToast({
							title:res.data.desc,icon:"none"
						})
					}
					this.isBtn = true;
				})
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
			getPayInfo( code,order_sn) {
				
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.cityurl + "/api/order_pay/payOrder", {
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
												url: '/pages/My/pay-popup/Pay_success'
											})
										},
										fail: function(err) {
											console.log(err);
										}
									});
						
							}
						
					});
			},
			payApp(order_sn) {
				
				let authtoken = uni.getStorageSync("authtoken");
				console.log(authtoken);
				
				uni.request({
			
					url: this.cityurl+"/api/order_pay/payOrder",
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
		
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.text {
		color: #333333;
		font-size: 30rpx;
		height: 110upx;
		line-height: 110upx;
		text-align: right;

	}
	.selectlist {
		width: 200rpx;
		font-size: 30rpx;
		color: #333333;

	}
	.car-img{
		width: 62rpx;
		height: 54rpx;
	}
.selectlist2 {
		width: 500rpx;
		font-size: 30rpx;
		color: #333333;

	}

	.btn {
		text-align: center;
		align-items: center;
		height: 62rpx;
		line-height: 62rpx;
		font-size: 25rpx;
		color: #ffffff;
		border-radius: 10rpx;
		width: 166rpx;
		margin-right: 20rpx;
		background-color: #ff4444;
	}
	.btn_f {
		background-color: #E6A23C !important;
	}

	.name {
		margin-left: 75rpx;
		margin-top: 19rpx;
		font-size: 30rpx;
		color: #666666;
		margin-bottom: 22rpx;
	}

	.right {

		font-size: 25rpx;
		color: #999999;

	}

	.item1 {
		margin-top: 30rpx;
		padding-bottom: 19rpx;
		border-bottom: 0.5px solid #f4f4f4;
		margin-left: 27rpx;
		margin-right: 35rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		flex-direction: row;
	}

	.item {
		height: 110rpx;

		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 27rpx;
		border-bottom: 0.5px solid #f4f4f4;
		margin-right: 35rpx;
		flex-direction: row;
	}

	.top {
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		width: 100%;
		flex-direction: row;

		.image1 {
			margin-left: 27rpx;
			margin-right: 20rpx;
			width: 28rpx;
			height: 33rpx;
		}

		.t {
			flex: 1;
			font-size: 30rpx;
			color: #333333;
		}

		.image2 {
			margin-right: 30rpx;
			width: 10rpx;
			height: 18rpx;
		}
	}

	.left1 {
		font-weight: 600;
		font-size: 30rpx;
		color: #333333;
	}

	.left {
		
		font-size: 30rpx;
		color: #333333;
	}

	.top-img {
		display: flex;
		margin-top: 20rpx;

		padding-left: 20rpx;
		padding-right: 20rpx;

		height: 300rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.box {
		margin-top: 30rpx;
		// height: 135rpx;
		background: #ffffff;
		flex-direction: column;
		border-radius: 10rpx;
		display: flex;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.box2 {
		align-items: center;
		margin-bottom: 10rpx;
		margin-top: 30rpx;
		height: 90rpx;
		background: #3e4459;
		flex-direction: row;
		border-radius: 10rpx;
		display: flex;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
</style>

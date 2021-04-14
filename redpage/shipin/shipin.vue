<template>
	<view class="content">
		
		<view class="a">
			<image src="../../static/tab/tu.png" style="width: 100%; height:150rpx;"></image>
			<view class="status_bar">
				<!-- 状态栏 -->
			</view>
			<view class="a-a">
				<image src="../../static/public/goBack.png" style="width: 20rpx;height: 30rpx;padding-left: 30rpx;padding-top: 10rpx;"
				 @click="fanhuijian"></image>
				<view class="st">
					<text style=" width:147rpx;height:37rpx;font-size:36rpx;font-family:Microsoft YaHei;font-weight:bold;color:rgba(255,255,255,1);;">发布红包</text>
				</view>
				<view style="width: 20rpx;height: 30rpx;padding-left: 30rpx;padding-top: 10rpx;"></view>
			</view>
		</view>
		<view class="b">
			<view class="b-one">
				<view class="b-one-a">
					发布金额
				</view>
				<view class="b-one-b">
					<input type="number" v-model="qian" placeholder="填写金额" style="width:430rpx" />
					<text class="wei">数字</text>
				</view>
			</view>
			<view class="b-one">
				<view class="b-one-a">
					红包数量
				</view>
				<view class="b-one-b">
					<input type="number" v-model="ge" placeholder="填写数量" style="width: 430rpx;" maxlength="10" />
					<text class="wei">个</text>
				</view>
			</view>
			<view class="b-one">
				<view class="b-one-a">
					选择范围
				</view>
				<picker @change="selectdistance" :value="index" :range="array" range-key="name" class="b-one-b">
					<view>{{array[index].name}}</view>
				</picker>
			</view>

			<view class="b-one" @click="goLocation">
				<view class="b-one-a">
					红包位置
				</view>
				<view class="b-one-b">
					<!-- 地图 -->
					<view class="header-noe">
						<text style="right: -30rpx;font-size:30rpx;
						font-family:Microsoft YaHei;
						color:rgba(153,153,153,1);"
						 v-if="!addressName">请选择位置</text>
						<image src="https://xin.yiyunoto.com/uploads/static/home/location1.png" class="location" style="width:30upx;height: 30upx;right: -20rpx;margin-left: 20rpx;"
						 v-if="!addressName"></image>
						<text class="biaoti-one">{{addressName}}</text>
					</view>
				</view>
			</view>
		</view>
		<textarea placeholder="你想说点什么" v-model="shuo" class="bei" ></textarea>
	
		
		<view class="addImgs">
			<view class="addImg">
				<tuiUpload :serverUrl="serverUrl" @complete="result" :limit="3"></tuiUpload>
			</view>
		</view>
		<view class="buttono">
			<button class="a-th" @click="fabu">发布红包</button>
		</view>
	</view>
</template>
<script>
	import tuiUpload from '@/components/tui-upload/tui-upload'
	var util = require('../../common/util.js');
	var formatLocation = util.formatLocation;
	import request from '../../store/http.js';
	import amap from '../../common/amap-wx.js';
	// var redpack_id = '';
	export default {
		components: {
			tuiUpload
		},
		data() {
			return {
				location: null,
				serverUrl: "https://xin.yiyunoto.com/api/post/uploadImg",
				src: '',
				dian: false,
				setImgPath: '',
				qian: '',
				ge: '',
				weizhi: '',
				name: '',
				shuo: '',
				latitude: '',
				longitude: '',
				url: this.$store.state.url,
				fan: "",
				redpack_id: '',
				
				index: 0,
				citycode: "",
				// 
				amapPlugin: null,
				key: '980c4a9d17bc9c06a85d488adaac1f09',
				addressName: '',
				imgArr: [],
				array: [{
					name: "请选择范围",
					type: null
				}, {
					name: "1公里",
					type: 1
				}, {
					name: "2公里",
					type: 2
				}, {
					name: "3公里",
					type: 3
				}, {
					name: "全市可见",
					type: 4
				}, {
					name: "全国可见",
					type: 5
				}, ]
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数


			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});

		},
		methods: {
			fanhuijian() {
			
				uni.navigateBack({
					delta:1
				})
			},
			selectdistance(e) {
				this.index = e.target.value
			},
			result(e) {
			
				this.imgArr = e.imgArr;
				if(!this.imgArr){
					this.imgArr=[];
					this.imgArr .push(e.video) 
				}
				
			},
			goLocation() {
				uni.chooseLocation({
					success: (res) => {
						console.log(res);
						this.location = formatLocation(res.longitude, res.latitude);
						this.getcitycode(this.location)
						// console.log('location', this.location);
						this.addressName = res.name;
						// console.log('addressName', res.address);

						// this.OneGetShops();
					}
				})

			},
			getcitycode(location) {
				this.amapPlugin.getRegeo({
					location: '' + location.longitude + ',' + location.latitude + '',
					success: (data) => {
						this.citycode = data[0].regeocodeData.addressComponent.adcode
						// console.log("citycode", this.citycode);
					},
					fail: (data) => {

					}
				});
			},
			searchImg() {
				var that = this;
				uni.chooseImage({
					count: 1,
					success: function(res) {
						var path = res.tempFilePaths;
						that.setImgPath = path[0];
						// console.log(path[0])
					}
				})
			},
			fanhuia() {
				uni.redirectTo({

				});
			},
			// 发布
			fabu() {

				var that = this;
				var reg = /^[0-9]*$/;
				if (that.shuo == '') {
					uni.showModal({
						// title: '',
						content: '请输入要说的内容',
						success: function(res) {
							if (res.confirm) {
								// console.log('用户点击确定');
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					});
					return
				};
				var ge = Math.floor(that.ge);
				// console.log(ge)
				if (ge<1) {
					uni.showModal({
						// title: '',
						content: '红包数量不对',
						success: function(res) {
							if (res.confirm) {
								// console.log('用户点击确定');
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					});
					return
				};
				if (that.imgArr.length == 0) {
					uni.showModal({
						// title: '',
						content: '请上传图片',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return
				};
				if (that.qian < 1) {
					uni.showModal({
						// title: '',
						content: '1元起发',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return
				}
				if (that.ge == '') {
					uni.showModal({
						// title: '',
						content: '您的数量不对 请重新输入',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return
				}
				if (that.addressName == '') {
					uni.showModal({
						// title: '',
						content: '请选择红包位置',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return
				}
				var location_type = this.array[this.index].type;
				if (!location_type ) {
					uni.showModal({
						// title: '',
						content: '请选择范围',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				
				
				}
				// if (reg.test(that.qian) == false) {
				// 	console.log(8657)
				// 	uni.showModal({
				// 		// title: '',
				// 		content: '您的金额不对 请重新输入',
				// 		success: function(res) {
				// 			if (res.confirm) {
				// 				console.log('用户点击确定');
				// 			} else if (res.cancel) {
				// 				console.log('用户点击取消');
				// 			}
				// 		}
				// 	});
				// 	return
				// };
				// geshu
				

				// 判断 登录状态
				var authtoken = uni.getStorageSync("authtoken")
				console.log(authtoken)
				if (!authtoken) {
					uni.showModal({
						// title: '',
						content: '请登录',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: '/pages/My/Login-registration/Login-registration'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return
				};
				this.setImgPath = this.imgArr.join(",");
				var thay = this;
				var location_type = this.array[this.index].type;
				var pay_way = 'wxPay';
				var type;
				console.log("location_type", location_type)
				var distance;
				let area_id = 1;
				console.log("citycode2", this.citycode);
				if (location_type < 4) {
					type = "1";
					area_id = this.citycode;
					distance = location_type + "";

				} else if (location_type == 4) {
					area_id = this.citycode;
					distance = "1";
					type = "2";

				} else {
					area_id = 1;
					distance = "1";
					type = "2";
				}
			
				uni.request({
					url: this.url+'/api/hongbao/createRedpack',
					method: "POST",
					header: {
						authtoken: authtoken
					},
					data: {
						all_money: thay.qian,
						all_num: thay.ge,
						longitude: thay.location.longitude,
						latitude: thay.location.latitude,
						location_type: type,
						content: thay.shuo,
						address: thay.addressName,
						image_url: thay.setImgPath,
						distance: distance,
						pay_way: pay_way,
						area_id: area_id
					},
					success: function(res) {
						if(res.data.code==1){
						thay.redpack_id = res.data.data.redpack_id;
						thay.pay();	
						}else{
							uni.showToast({
								title:res.data.msg,icon:"none"
							})
						}
						
						// 上传图片 
						//   uni.uploadFile({
						//         url: 'https://xin.yiyunoto.com/api/post/uploadImg', 
						//         filePath: that.setImgPath,
						//       name:'file',
						//       method: "POST",
						//         success: (uploadFileRes) => {
						// console.log(11);
						//             console.log(uploadFileRes.data);
						// console.log(22);
						//         }
						//     });
					}
				})

				// uni.request({
				// 	url: 'https://xin.yiyunoto.com/api/hongbao/createRedpack',
				// 	method: "POST",
				// 	header: {
				// 		authtoken: authtoken
				// 	},
				// 	data: {
				// 		all_money: thay.qian,
				// 		all_num: thay.ge,
				// 		longitude: thay.longitude,
				// 		latitude: thay.latitude,
				// 		content: thay.shuo,
				// 		address: thay.addressName,
				// 		image_url: thay.src,
				// 		distance: thay.fan,
				// 		pay_way: thay.pay_way,
				// 	},
				// 	success: function(res) {
				// 		console.log(res.data.data.redpack_id)
				// 		console.log(res)
				// 		thay.redpack_id = res.data.data.redpack_id;
				// 		console.log(thay.redpack_id)
				// 上传图片 
				//   uni.uploadFile({
				//         url: 'https://xin.yiyunoto.com/api/post/uploadImg', 
				//         filePath: that.setImgPath,
				//       name:'file',
				//       method: "POST",
				//         success: (uploadFileRes) => {
				// console.log(11);
				//             console.log(uploadFileRes.data);
				// console.log(22);
				//         }
				//     });
				// 	}
				// })
				// 发起支付
			},
			pay() {
				let type;
				let authtoken = uni.getStorageSync("authtoken");
				let code;
				var pay_way = 'wxPay';
				// #ifdef APP-PLUS
				type = 1;
				var thay = this;
				uni.request({
					url:this.url+ '/api/hongbao/chooseTypeAndPay',
					data: {
						pay_way: thay.pay_way,
						trade_type: type,
						redpack_id: thay.redpack_id,
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
										console.log(res);

										setTimeout(function() {
											uni.navigateBack({});
										}, 1000)
									},
									fail: function(err) {
										console.log('支付失败', err)
									}
								});
						}
					}
				})
				// #endif
				// #ifdef MP-WEIXIN
				type = 2;
				console.log('code', 22222);
				let _that = this;
				uni.login({
					success(e) {
						console.log('e', e);
						_that.getPayInfo(2, e.code);
					},
					fail(e) {
						console.log('code', e);
					}
				})
				// #endif
			},
			getPayInfo(type, code) {
				console.log('222', code + this.url);
				var thay = this;
				console.log(this.redpack_id, )
				let authtoken = uni.getStorageSync("authtoken");
				var pay_way = 'wxPay';
				uni.request({
					url: this.url+'/api/hongbao/chooseTypeAndPay',
					data: {
						pay_way: thay.pay_way,
						trade_type: type,
						redpack_id: thay.redpack_id,
						code: code
					},
					header: {
						authtoken: authtoken
					},
					method: 'POST',
					success: (res) => {
						console.log("返回请求成功", res)
						if (res.data.code == 1) {
							console.log("返回请求成功", res.data.data.nonceStr)
							uni.getProvider({
								service: "payment",
								success: (res) => {
									console.log(res);
								}
							})
							uni.requestPayment({
								provider: 'wxpay',
								"signType": 'MD5',
								"nonceStr": res.data.data.nonceStr,
								"package": res.data.data.package,
								"timeStamp": res.data.data.timeStamp,
								"paySign": res.data.data.paySign,
								success: function(res) {
									console.log(res);
									setTimeout(function() {
										uni.navigateBack({

										});
									}, 1000)
								},
								fail: function(err) {
									console.log(err);
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.addImgs {
		width: 100%;

		.addImg {
			width: 100%;
			display: flex;
			flex-direction: column;
		}
	}

	* {
		margin: 0;
		padding: 0;
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f3f3f3;

		.a {
			width: 100%;
			height: 150rpx;

			.a-a {
				width: 100%;
				position: absolute;
				top: 60rpx;
				display: flex;
				align-items: center;
				//
				  /*#ifdef  MP-WEIXIN*/
				  margin-top:30rpx;
				  /*#endif*/
				// height: 100rpx;
				.st {
					width: 100%;
					display: flex;
					justify-content: center;
				}
			}
		}

		.b {
			width: 92%;
			margin-top: 40rpx;

			.b-one {
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				flex-wrap: nowrap;
				height: 100rpx;
				margin-bottom: 30rpx;
				align-items: center;
				border-radius: 20rpx;
				padding-left: 30rpx;
				padding-right: 30rpx;

				.b-one-a {
					font-size: 32rpx;
					font-family: Microsoft YaHei;
					// font-weight:bold;
					color: #333333;

				}

				.b-one-b {
					display: flex;
					justify-content: space-between;
					flex-wrap: nowrap;
					align-items: center;
					// margin-right: 20rpx;
					font-size: 30rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);

					// color:"#999999";
					input {
						text-align: right;
						font-size: 30rpx;
						font-family: Microsoft YaHei;
						color: rgba(153, 153, 153, 1);
						padding-right: 20rpx;
					}
				}

				.b-one-a {
					padding-left: 20rpx;
				}
			}
		}

		

		// textarea::before {
		// 	display: block;
		// 	content: "备注：";
		// }
	}
		.bei {
			width: 86%;
			display: flex;
			padding-left: 20rpx;
			padding-right: 20rpx;
			padding-top: 20rpx;
			height: 210upx;
			
			background-color: #ffffff;
			border-radius: 20rpx;
		}
	.cameraBtnBox {
		margin-top: 100upx;
		width: 200upx;
		height: 200upx;

		justify-content: center;
		align-items: center;
	}

	.camera {
		width: 200upx;
		height: 200upx;
	}

	.previewImg {
		width: 200upx;
		height: 200upx;
	}

	.biaoti-one {
		font-weight: 700;
		margin-left: 10upx;
		font-size: 34upx;
		font-family: PingFangSC-Medium, PingFang SC;
		color: #333333;
	}

	.header-noe {
		// width: 200upx;
		// margin-right: 20upx;
	}

	.buttono {
		width: 100%;
		// height: 100%;
		height: 100rpx;
		// margin-left: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		// margin-top: 30rpx;
		padding-top: 30rpx;

		.a-th {
			/* #ifndef MP||H5 */
			// left: 220rpx;
			/* #endif */
			display: flex;
			justify-content: center;
			align-items: center;
			width: 90%;
			height: 100rpx;
			font-size: 36rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #FFFFFF;
			background-color: #FC2700;
			// margin-top: 135rpx;
		}
	}

	.wei {
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		color: #333333;
	}
</style>

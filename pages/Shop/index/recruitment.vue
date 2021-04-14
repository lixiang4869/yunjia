<template>
	<view>
		<view class="in">
			<view class="title">自提点定位:</view><text class="text" @tap="goLocation" >{{region.label}}</text>
		</view>
	<!-- 	<view class="in">
			<view class="title">所属城市:</view>

			<view class="text" @tap="chooseCity">
				{{region.label}}
				
			</view>
		</view> -->
		<view class="in">
			<view class="title">详细地址:</view>
			<input class="text" v-model="addressData.address" />
		</view>
		<view class="in">
			<view class="title">店铺名称:</view>
			<input class="text" v-model="addressData.shopname" />
		</view>
		<view class="in">
			<view class="title">您的姓名:</view><input class="text" v-model="addressData.name" />
		</view>
		<view class="in">
			<view class="title">联系电话:</view><input class="text" v-model="addressData.phone" type="number" maxlength="11" />
		</view>

		<!-- <view class="in"><view class="title">小区名称:</view><input class="text" name="xqName"/></view>
		<view class="in"><view class="title">详细地址:</view><input class="text" name="address"/></view> -->
		<!-- <view class="foot" @click="xieyi">《团长注册协议-吃货公社》</view> -->
		<button class="btn" @click="btnt">提交申请</button>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" 
	 @onChange="onConfirm"	 @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	var util = require('../../../common/util.js');
	var formatLocation = util.formatLocation;
	import amap from '../../../common/amap-wx.js';
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
	import request from '../../../store/http.js'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				region: {
					label: "请点击选择地址",
					value: [],
					cityCode: ''
				},
				amapPlugin: null,
				themeColor: '#007AFF',
				addressName:"",
				cityPickerValue: [0, 0, 1],
				url: this.$store.state.url,
				array: [{
					name: '选择城市'
				}],
				house: [{
					name: '选择小区'
				}],
				key: '980c4a9d17bc9c06a85d488adaac1f09',
				location:null,
				index: 0,
				houseindex: 0,
				shopid: '',
				shopid2: [],
				addressData: {
					address: "",
					name: '',
					phone: '',
					pwd: '',
					shopname:''
				},
			}
		},
		onLoad() {
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
			
			// this.wuye()
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
		// 监听页面返回
		onBackPress() {
			console.log('我返回了');
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		// 监听页面卸载
		onUnload() {

			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
			}
		},
		methods: {
			goLocation() {
				uni.chooseLocation({
					success: (res) => {
						console.log(res)
						this. location = formatLocation(res.longitude, res.latitude);
						this.getcitycode(this.location)
						this.addressData.address = res.name;;
						
					}
				})
			
			},
			getcitycode(location) {
				this.amapPlugin.getRegeo({
					location: '' + location.longitude + ',' + location.latitude + '',
					success: (data) => {
					
					let t=	data[0].regeocodeData.addressComponent
						this.region.cityCode = t.adcode
						this.region.label = t.province+t.city+t.district;
						
					},
					fail: (data) => {
			
					}
				});
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show();
			},
			// 获取选中的省市区
			onConfirm(e) {
				console.log(e);
				this.region = e;
				this.cityPickerValue = e.value;
				this.ress = e.ress;
			},

			onCancel(e) {
				console.log(e)
			},
			
			
			xieyi() {
				uni.navigateTo({
					url: "./agreement"
				})
			},

			btnt() {
				let data = this.addressData;
				if (!data.name) {
					uni.showToast({
						title:"请输入姓名",icon:"none"
					})
				
					return;
				}
				if (!/(^1[3|4|5|6|9|7|8][0-9]{9}$)/.test(data.phone)) {
					uni.showToast({
						title:"请输入正确的手机号码",icon:"none"
					})
				
					
					return;
				}
				if(!this.location){
					uni.showToast({
						title:"请选择定位",icon:"none"
					})
									
					
					return;
				}
				var authtoken = uni.getStorageSync("authtoken")

				request.urlRequest(this.url + '/api/member/leaderApply', {
					lat:this.location.latitude,
					lng:this.location.longitude,
					truename: data.name,
					tel: data.phone,
					areas: this.region.cityCode,
					address: data.address,
					shop_name:data.shopname
				}, {
					authtoken: authtoken
				}, 'POST', res => {
					uni.showToast({
						title: res.data.msg,icon:"none"
					})
					if (res.data.code == 1) {
						setTimeout(function() {
							uni.navigateBack({

							});
						}, 1000)

					}

				})

			},
		}
	}
</script>

<style>
	.uni-input {
		height: 100upx;

		line-height: 100upx;
		font-size: 28upx;
		background: #FFF;
		flex: 1;
	}
	.xzdizhi {
		
		position: absolute;
		right: 20upx;
		width: 20upx;
		height: 20upx;
	}
	.in {
		width: 90%;
		height: 100upx;
		line-height: 100upx;
		margin: 0 auto;
		border-bottom: 2upx solid #F0F0F0;
		color: #5a5a5a;
		font-size: 30upx;
	}

	.title {
		width: 30%;
		float: left;
	}

	.text {
		
		width: 60%;
		height: 100upx;
		line-height: 100upx;
		float: left;

	}

	.foot {
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		position: fixed;
		bottom: 110upx;
		color: #5a5a5a;
		font-size: 30upx;
	}
	.btn {
		width: 100%;
		height: 100upx;
		position: fixed;
		bottom: 0upx;
		background: #f72926;
		text-align: center;
		line-height: 100upx;
		color: #FFFFFF;
	}
</style>

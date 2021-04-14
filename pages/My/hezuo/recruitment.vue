<template>
	<view>
		<view class="in">
			<view class="title">店铺分类:</view>

			<picker @change="city" :value="index" :range="array" range-key="name">
				<view class="uni-input">{{array[index].name}}</view>
			</picker>
		</view>

		<view class="in">
			<view class="title">店铺定位:</view><text class="text" @tap="goLocation">{{addressName}}</text>
		</view>
		<view class="in">
			<view class="title">所在地区:</view>
			<view class="uni-input" @tap="chooseCity">
				{{ region.label }}
				<!-- <image class="xzdizhi" src="" mode="widthFix"></image> -->
			</view>
		</view>
		<view class="in">
			<view class="title">联系电话:</view><input class="text" v-model="phone" type="number" maxlength="11" placeholder="请填写联系电话" />
		</view>
		<view class="in">
			<view class="title">详细地址:</view><input class="text" v-model="addressdetail" placeholder="请填写详细地址" />
		</view>
		<view class="in">
			<view class="title">绑定小区:</view>
			<picker @change="selectXiaoQu" :value="xIndex" :range="list" range-key="name">
				<view class="uni-input">{{list[xIndex].name}}</view>
			</picker>

		</view>
		<view class="in">
			<view class="title">店铺名称:</view><input class="text" v-model="shopname" placeholder="请填写店铺名称" />
		</view>
		<view class="in">
			<view class="title">业务范围:</view><input class="text" v-model="describe" placeholder="请填写业务范围" />
		</view>
		<view class="in">
			<view class="title">业务员编号:</view><input class="text" v-model="id" type="number" maxlength="7" placeholder="请填写业务员会员编号" />
		</view>
		<view class="in">
			<view class="title">店铺logo:</view>
		</view>
		<view class="uni-uploader__file" style="position: relative;" v-if="image!=null">
			<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image"></image>
			<!-- 单张照片删除事件 -->
			<view class="close-view" @click="close(1)">×</view>
		</view>
		<view class="uni-uploader__input-box" v-else>
			<view class="uni-uploader__input" @tap="chooseImage(1)">

			</view>
		</view>
		<view class="in">
			<view class="title">店铺营业执照:</view>
		</view>
		<view class="uni-uploader__file" style="position: relative;" v-if="card!=null">
			<image class="uni-uploader__img" mode="aspectFill" :src="card" :data-src="card"></image>
			<!-- 单张照片删除事件 -->
			<view class="close-view" @click="close(2)">×</view>
		</view>
		<view class="uni-uploader__input-box" v-else>
			<view class="uni-uploader__input" @tap="chooseImage(2)">

			</view>
		</view>
		<!-- <view class="in"><view class="title">小区名称:</view><input class="text" name="xqName"/></view>
		<view class="in"><view class="title">详细地址:</view><input class="text" name="address"/></view> -->
		<!-- <view class="foot" @click="xieyi">《团长注册协议-吃货公社》</view> -->
		<button class="btn" @click="btnt">申请入驻</button>
		<!-- 三级联动插件 -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPickers" :pickerValueDefault="cityPickerValue" @onCancel="onCancel"
		 @onChange="onConfirm" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	var util = require('../../../common/util.js');
	var formatLocation = util.formatLocation;
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
	import request from '../../../store/http.js'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				url: this.$store.state.url,
				array: [{
					name: '选择分类'
				}],
				list: [{
					name: '选择小区'
				}],
				xIndex: 0,
				index: 0,
				image: null,
				card: null,
				logo: '',
				addressName: "请选择定位",

				cityPickerValue: [0, 0, 0],
				themeColor: '#007AFF',

				location: {},
				region: {
					label: "请点击选择地址",
					value: [],
					cityCode: ''
				},
				type: ['图片'],
				addressdetail: '',
				phone: '',
				describe: '',
				shopname: '',
				id: '',
				ress: ''
			}
		},
		onLoad() {
			this.wuye()
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
		},
		// 监听页面返回
		onBackPress() {

			if (this.$refs.mpvueCityPickers.showPicker) {
				this.$refs.mpvueCityPickers.pickerCancel();
				return true;
			}
		},
		// 监听页面卸载
		onUnload() {

			if (this.$refs.mpvueCityPickers.showPicker) {
				this.$refs.mpvueCityPickers.pickerCancel();
			}
		},
		methods: {
			goLocation() {
				uni.chooseLocation({
					success: (res) => {
						console.log(res)
						this.location = formatLocation(res.longitude, res.latitude);

						this.addressName = res.name;

					}
				})

			},
			close() {
				this.image = null;
				this.logo = null;

			},
			selectXiaoQu(e) {
				this.xIndex = e.target.value
			},
			chooseImage(index) { //点击加号选择添加图片或视频
				uni.showActionSheet({ //显示操作菜单
					title: '选择上传类型',
					itemList: this.type,
					success: res => {
						console.log('1231', res);
						console.log('1231', res.tapIndex);
						if (res.tapIndex == 0) {
							this.chooseImages(index);
						} else {
							this.chooseVideo();
						}
					}
				});

			},
			chooseImages(index) {
				// 上传图片
				uni.chooseImage({

					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						if (this.image) {
							this.type = ['图片', '视频'];
						} else {
							this.type = ['图片'];
						}
						if (index == 1)
							this.image = res.tempFilePaths[0];
						else this.card = res.tempFilePaths[0];

						this.upLoad(index, res.tempFilePaths[0]);


					}
				});
			},
			upLoad(index, path) {
				let _this = this;
				uni.uploadFile({
					url: this.url + '/api/post/uploadImg',
					filePath: path,
					name: 'file',
					method: "POST",

					success: (uploadFileRes) => {
						// console.log("uploadFileRes",uploadFileRes)
						var json = JSON.parse(uploadFileRes.data);
						if (json.code == 1) {
							if (index == 1)
								this.logo = json.data;
							else this.cardimg = json.data;

						}

						// uni.showToast({
						// 	title: json.msg
						// })


					}
				});
			},
			onCancel() {},
			onConfirm(e) {
				console.log(e);
				this.region = e;
				this.cityPickerValue = e.value;
				this.ress = e.ress;
				this.getXiqoQuList()
			},
			chooseCity() {
				console.log('11111111')
				this.$refs.mpvueCityPickers.show();
			},
			city(e) {
				this.index = e.target.value
				this.houseindex = 0;


			},
			selectHouse(e) {
				this.houseindex = e.target.value
			},
			xieyi() {
				uni.navigateTo({
					url: "./agreement"
				})
			},
			getXiqoQuList() {
				// if(!this.ress.area_N){
				// 	uni.showToast({
				// 		title:"请先选择所在区域",
				// 		icon:"none"
				// 	})
				// 	return
				// }
				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + '/api/guangjie/villagelist', {
					areacode: this.ress.area_N
				}, {
					authtoken: authtoken
				}, 'POST', res => {
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
						return;
					}
					this.list = res.data.data;

					// for(let i =0;i<res.data.data.length;i++){
					// 	this.array.push(res.data.data[i].name) 
					// 	}
				})
			},
			wuye() {
				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + '/api/guangjie/AllShopType', {}, {
					authtoken: authtoken
				}, 'POST', res => {
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
						return;
					}
					this.array = res.data.data;

					// for(let i =0;i<res.data.data.length;i++){
					// 	this.array.push(res.data.data[i].name) 
					// 	}
				})
			},
			toast(msg) {
				uni.showToast({
					title: msg,
					icon: "none"
				})
			},


			btnt() {

				if (!this.location) {
					this.toast('请选择定位');
					return;
				}
				if (!/(^1[3|4|5|6|9|7|8][0-9]{9}$)/.test(this.phone)) {
					this.toast('请输入正确的手机号码');

					return;
				}

				if (!this.shopname) {
					this.toast('请填写店铺名称');
					return;
				}
				// if (!this.addrmore) {
				// 	this.toast('请填写店铺详细地址');
				// 	return;
				// }
				if (!this.addressdetail) {
					this.toast('请填写店铺详细地址');
					return;
				}
				if (!this.describe) {
					this.toast('请填写店铺营业范围');
					return;
				}
				if (!this.ress.area_N) {
					this.toast('请选择所在地区');
					return;
				}
				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + '/api/guangjie/shopApply', {
					shoptype: this.array[this.index].id,
					name: this.shopname,
					phone: this.phone,
					logo: this.logo,
					addrmore: this.addressdetail,
					lat: this.location.latitude,
					lng: this.location.longitude,
					describe: this.describe,
					recommend: this.id,
					area_code: this.ress.area_N,
					village: this.list[this.xIndex].id,
					cardimg: this.cardimg
				}, {
					authtoken: authtoken
				}, 'POST', res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					});
					if (res.data.code == 1) {
						uni.navigateBack({

						})
					}
				})
				// uni.uploadFile({
				// 	url: this.url + '/api/guangjie/shopApply',
				// 	filePath: this.image,
				// 	name: 'logo',
				// 	formData:{
				// 		shoptype: this.array[this.index].id,
				// 		name:this.shopname,
				// 		phone:this.phone,
				// 		addrmore:this.addressdetail,
				// 		lat:this.location.latitude,
				// 		lng:this.location.longitude,
				// 		describe:this.describe,
				// 		leader_phone:this.tzphone,
				// 		area_code:this.ress.area_N,
				// 		village:this.list[this.xIndex].id,
				// 		cardimg:this.cardimg
				// 	},

				// 	method: "POST",
				// 	header: {
				// 		authtoken: authtoken
				// 	},
				// 	success: (uploadFileRes) => {


				// 			let a = JSON.parse(uploadFileRes.data)
				// 		uni.showToast({
				// 			title:a.msg,
				// 			icon:"none"
				// 		});
				// 		if(a.code==1){
				// 			uni.navigateBack({

				// 			})
				// 		}



				// 	}
				// });


			},
		}
	}
</script>

<style>
	.uni-uploader__input-box:before,
	.uni-uploader__input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #D9D9D9;
	}

	.uni-uploader__input-box:before {
		width: 4upx;
		height: 79upx;
	}

	.uni-uploader__input-box:after {
		width: 79upx;
		height: 4upx;
	}

	.uni-uploader__input-box:active {
		border-color: #999999;
	}

	.uni-uploader__input-box:active:before,
	.uni-uploader__input-box:active:after {
		background-color: #999999;
	}

	.uni-uploader__file {
		margin: 10upx;
		width: 200upx;
		height: 200upx;
	}

	.uni-uploader__img {
		display: block;
		width: 200upx;
		height: 200upx;
	}

	.close-view {
		text-align: center;
		line-height: 30upx;
		height: 35upx;
		width: 35upx;
		background: #ef5350;
		color: #ffffff;
		position: absolute;
		top: 1upx;
		right: 1upx;
		font-size: 35upx;
		border-radius: 8upx;
	}

	.uni-uploader__input-box {
		position: relative;
		margin: 20upx;
		width: 200upx;
		height: 200upx;
		border: 2upx solid #D9D9D9;
	}

	.uni-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.uni-input {
		height: 100upx;

		line-height: 100upx;
		font-size: 28upx;
		background: #FFF;
		flex: 1;
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
		white-space: nowrap;
		max-lines: 1;
		text-overflow: ellipsis;
		flex-wrap: nowrap;
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

		height: 100upx;
		margin: 50upx;

		background: #f72926;
		text-align: center;
		line-height: 100upx;
		color: #FFFFFF;
	}
</style>

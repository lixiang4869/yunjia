<template>
	<view>
		<image :src="url+'/uploads/static/my/shopruzhu.png'" style="width: 100%;height: 242rpx;"></image>
		<view v-if="status==-1">
			<view class="in">
				<view class="title">*公司名称:</view><input class="text" v-model="shopname" placeholder="请填写公司名称" />
			</view>
			<view class="in">
				<view class="title">*负责人:</view><input class="text" v-model="name" placeholder="请填写负责人姓名" />
			</view>
			<view class="in">
				<view class="title">*手机号:</view><input class="text" v-model="phone" type="number" maxlength="11" placeholder="请填写负责人联系电话" />
			</view>
			<view class="in">
				<view class="title">*公司地址:</view>
				<view class="uni-input" @tap="chooseCity">
					{{ region.label }}
					<!-- <image class="xzdizhi" src="" mode="widthFix"></image> -->
				</view>
			</view>
			<view class="in">
				<view class="title">详细地址:</view><input class="text" v-model="addressdetail" placeholder="请填写详细地址" />
			</view>

			<view class="in">
				<view class="title">*营业执照:</view>
			</view>
			<view class="uni-uploader__file" style="position: relative;" v-if="card">
				<image class="uni-uploader__img" mode="aspectFill" :src="card" ></image>
				<!-- 单张照片删除事件 -->
				<view class="close-view" @click="close()">×</view>
			</view>
			<view class="uni-uploader__file" style="position: relative;" v-if="cardimg">
				<image class="uni-uploader__img" mode="aspectFill" :src="url+cardimg" ></image>
				<!-- 单张照片删除事件 -->
				<view class="close-view" @click="close()">×</view>
			</view>
			<view class="uni-uploader__input-box" v-if="!card&&!cardimg">
				<view class="uni-uploader__input" @tap="chooseImage()">

				</view>
			</view>
			<view class="in">
				<view class="title">行业:</view>

				<picker @change="city" :value="index" :range="array" range-key="name">
					<view class="uni-input">{{array[index].name}}</view>
				</picker>
			</view>
			<view class="in">
				<view class="title">服务时间:</view>
				<view class="time">
					<view class="box">

						<picker mode="time" :value="start" start="07:01" end="23:59" @change="timeChange">
							<view class="t">{{start}}</view>
						</picker>
					</view>
					<view style="margin-left: 32rpx;margin-right: 32rpx;">至</view>
					<view class="box">

						<picker mode="time" :value="end" start="12:01" end="23:59" @change="timeChange1">
							<view class="t">{{end}}</view>
						</picker>
						<!-- <view class="t">20:00</view> -->
					</view>
				</view>
			</view>



			<view class="in">
				<view class="title">推荐人:</view><input class="text" v-model="id" placeholder="请填写推荐人ID" />
			</view>



			<!-- <view class="in"><view class="title">小区名称:</view><input class="text" name="xqName"/></view>
		<view class="in"><view class="title">详细地址:</view><input class="text" name="address"/></view> -->
			<!-- <view class="foot" @click="xieyi">《团长注册协议-吃货公社》</view> -->
			<button class="btn" @click="btnt">申请入驻</button>
		</view>
		<view v-else-if="status==0" style="width: 100%;align-items: center;justify-content: center;display: flex;flex-direction: column;">
			<view style="font-size: 28rpx;color: #333;font-weight: bold;margin-top: 200rpx;">您已经发送过入驻申请</view>
			<view style="font-size: 28rpx;color: #333;font-weight: bold;font-weight: bold;">请耐心等待</view>
		
		</view>
		<view v-else-if="status==1" style="width: 100%;align-items: center;justify-content: center;display: flex;flex-direction: column;">
			<image :src="url+'/uploads/static/my/chenggong.png'" style="width: 144rpx;height: 144rpx;margin-top: 50rpx;"></image>
			<view style="font-size: 28rpx;color: #333;font-weight: bold;">恭喜您！</view>
			<view style="font-size: 28rpx;color: #333;font-weight: bold;font-weight: bold;">已经正式成为智慧云家合作商家</view>
			<view style="font-size: 28rpx;color: #333;margin-top: 100rpx;font-weight: bold;">请登录《云客》app管理您的店铺 </view>
			<view style="font-size: 28rpx;color: #333;font-weight: bold;">初始登录账号为店铺负责人手机号</view>
				<view style="font-size: 28rpx;color: #333;font-weight: bold;">默认密码为：123456</view>
			<!-- #ifdef APP-PLUS -->
			<button class="btn2" @click="download">立即下载云客</button>
			
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<button class="btn2" @click="copy">复制下载地址</button>
			
			<!-- #endif -->
		</view>
		<view v-else-if="status==2" style="width: 100%;align-items: center;justify-content: center;display: flex;flex-direction: column;">
			<image :src="url+'/uploads/static/my/faile.png'" style="width: 144rpx;height: 144rpx;margin-top: 50rpx;"></image>
			<view style="font-size: 28rpx;color: #333;font-weight: bold;">您提交的申请没有通过</view>
			<view style="font-size: 28rpx;color: #333;margin-top: 100rpx;font-weight: bold;">{{content}} </view>
			
			
			<button class="btn2" @click="retry">修改信息重新提交</button>
			
			
		</view>
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
				cardimg:null,
				url: this.$store.state.url,
				array: [{
					name: '选择分类'
				}],
				list: [{
					name: '选择小区'
				}],
				start: '12:01', // 时间初始的状态
				end: '20:00',
				xIndex: 0,
				index: 0,
				image: null,
				card: null,
				logo: '',
				addressName: "请选择定位",
				status: -1,
				content:null,
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
				name: '',
				shopname: '',
				id: '',
				ress: {},
				downloadTask:null,
				packgePath:null,
			}
		},
		onLoad() {
			this.wuye()
			this.getStatus();
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
			retry(){
				this.status=-1;
				this.getData();
			},
			copy(){
				uni.setClipboardData({
				    data:this.url+ '/yunke.apk',
				    success: function () {
				        console.log('success');
				    }
				});
			},
			// 关闭下载任务
			closeTask() {
			  this.downloadTask.abort()
			  this.downloadTask = null
			  // this.startProgress = false
			},
			// 开始下载任务
			createTask() {
				
			  //判断是否已经存在任务
			  // if (this.packgePath) {
			  //   this.haveDownloaded()
			  // } else {
			    // this.downloadProgress = 0
			    // this.startProgress = true
			    // 创建下载任务对象
			    this.downloadTask = uni.downloadFile({
			      url: this.url+"/yunke.apk",
			      success: (res) => {
			        if (res.statusCode === 200) {
			          // 保存下载的安装包
			          uni.saveFile({
			            tempFilePath: res.tempFilePath,
			            success: (res) => {
			              this.packgePath = res.savedFilePath
			              // 进行安装
			               plus.runtime.install(this.packgePath, { force: true })
			              // 任务完成，关闭下载任务
			              this.closeTask()
			            }
			          })
			        }
			      },fail(e) {
			      	console.log('下载失败',e);
			      }
			    })
			    // 进度条更新
			    this.downloadTask.onProgressUpdate((res) => {
			      // this.downloadProgress = res.progress
			    })        
			  // }
			},
			timeChange(e) {
				this.start = e.target.value

			},
			timeChange1(e) {
				this.end = e.target.value
			},
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
			
				this.card = null;
				this.cardimg=null
			},
			selectXiaoQu(e) {
				this.xIndex = e.target.value
			},
			chooseImage() { //点击加号选择添加图片或视频
				uni.showActionSheet({ //显示操作菜单
					title: '选择上传类型',
					itemList: this.type,
					success: res => {
						
						this.chooseImages();
						
					}
				});

			},
			chooseImages() {
				// 上传图片
				uni.chooseImage({

					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						 this.card = res.tempFilePaths[0];

						this.upLoad( res.tempFilePaths[0]);


					}
				});
			},
			upLoad( path) {
				var authtoken = uni.getStorageSync("authtoken")
				let _this = this;
				uni.uploadFile({
					url: this.url + '/api/homeapplet/uploadImg',
					filePath: path,
					header:{authtoken:authtoken},
					name: 'file',
					method: "POST",

					success: (uploadFileRes) => {
						
						var json = JSON.parse(uploadFileRes.data);
						if (json.resultCode == 1) {
							 this.cardimg = json.data.img;
							
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
				// this.getXiqoQuList()
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
			getStatus() {
				// if(!this.ress.area_N){
				// 	uni.showToast({
				// 		title:"请先选择所在区域",
				// 		icon:"none"
				// 	})
				// 	return
				// }
				uni.showLoading({
					
				})
				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + '/api/homeapplet/isApply', {
					// areacode: this.ress.area_N
				}, {
					authtoken: authtoken
				}, 'POST', res => {
					uni.hideLoading();
					if (res.data.resultCode != 1) {
						uni.showToast({
							title: res.data.resultMsg,
							icon: "none"
						})
						return;
					}
					if(res.data.data){
						this.status = res.data.data.status;
						this.content =res.data.data.content;
					}
					this.status = 2
					// for(let i =0;i<res.data.data.length;i++){
					// 	this.array.push(res.data.data[i].name) 
					// 	}
				})
			},
			getData() {
				
				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + '/api/homeapplet/getApplyInfo', {
					// areacode: this.ress.area_N
				}, {
					authtoken: authtoken
				}, 'POST', res => {
					if (res.data.resultCode != 1) {
						uni.showToast({
							title: res.data.resultMsg,
							icon: "none"
						})
						return;
					}
					if(res.data.data){
						 let info = res.data.data
						this.shopname = info.name
						this.phone = info.mobile,
						this.addressdetail =info.addressdetail,
						
						 this.name = info.username,
						 this.id = info.recommend_id,
						 this.region.label =  info.province_name+info.city_name +info.area_name
						 this.ress.province_N = parseInt(info.province) /10000
						  this.ress.city_N = parseInt( info.city)/100
						   this.ress.area_N =  info.area
							this.array.forEach((item,index)=>{
								if(item.id==info.tradeid){
									this.index==index
								}
							})
						
						this.cardimg= info.img
					}
					
				
				})
			},
			wuye() {
				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + '/api/homeapplet/getTradeList', {}, {
					authtoken: authtoken
				}, 'POST', res => {
					if (res.data.resultCode != 1) {
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


				if (!/(^1[3|4|5|6|9|7|8][0-9]{9}$)/.test(this.phone)) {
					this.toast('请输入正确的手机号码');

					return;
				}

				if (!this.shopname) {
					this.toast('请填写公司名称');
					return;
				}
				// if (!this.addrmore) {
				// 	this.toast('请填写店铺详细地址');
				// 	return;
				// }
				if (!this.addressdetail) {
					this.toast('请填写详细地址');
					return;
				}
				if (!this.name) {
					this.toast('请填写负责人姓名');
					return;
				}
				if (!this.ress.area_N) {
					this.toast('请选择所在地区');
					return;
				}
				if (!this.cardimg) {
					this.toast('请上传营业执照');
					return;
				}
				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + '/api/homeapplet/ApplyInfoSave', {

					name: this.shopname,
					mobile: this.phone,

					addressdetail: this.addressdetail,
					starttime:this.start,
					endtime:this.end,
					contact: this.name,
					recommend_id: this.id,
					province: this.ress.province_N + "0000",
					city: this.ress.city_N + "00",
					area: this.ress.area_N,
					tradeid: this.array[this.index].id,
					yyzzimg: this.cardimg
				}, {
					authtoken: authtoken
				}, 'POST', res => {
					uni.showToast({
						title: res.data.resultMsg,
						icon: "none"
					});
					if (res.data.resultCode == 1) {
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
	.time {
		margin-bottom: 30rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		color: #999;
		font-size: 28rpx;
		align-items: center;
		display: flex;
		flex-direction: row;
		// justify-content: space-between;

	}

	.box {
		border-radius: 10rpx;
		padding-left: 20rpx;
		display: flex;
		flex-direction: row;
		height: 60rpx;
		width: 300rpx;
		line-height: 60rpx;
		border: 1px solid #dddddd;
	}

	.t {
		margin-left: 40rpx;
		color: #333;
		font-size: 28rpx;
	}

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
		font-size: 28rpx;
		color: #333;
		font-weight: bold;
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
	.btn2{
		margin-top: 50rpx;
		line-height: 80rpx;
		text-align: center;
		width: 600rpx;
		height: 80rpx;
		color: #fff;
		font-size: 36rpx;
		background: linear-gradient(90deg, #FF7085 0%, #FF5837 100%);
		border-radius: 40rpx ;

	}
</style>

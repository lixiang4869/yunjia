<template>
	<view class="page" @touchstart="touchStart" @touchend="touchEnd">

		<form>
			<view class="top-top"><textarea class="wenben" placeholder="请填写问题描述" v-model="input_content" /></view>
			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<!-- 上传图片 -->
								<block v-for="(image, index) in imageList" :key="index">
									<view class="uni-uploader__file" style="position: relative;">
										<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image>
										<!-- 单张照片删除事件 -->
										<view class="close-view" @click="close(index)">×</view>
									</view>
								</block>

								<!-- 上传视频 -->
								<view class="uni-uploader__filee" v-if="src">
									<view class="video_close" @tap="delectVideo">x</view>
									<video :src="src" class="video"></video>
								</view>
								<view v-if="videos == 1"></view>
								<view v-else>
									<view class="uni-uploader__input-box" v-if="VideoOfImagesShow">
										<view class="uni-uploader__input" @tap="chooseImage">
											
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		
			
				<!-- <view class="fabu"> <view class="fabu-one"> 关键字:</view>  <input class="uni-input"  placeholder="关键字输入" /></view> -->
		
			</form>
			<view class="fabiao" @tap="publish">立刻提交</view>
	</view>
</template>

<script>
import image from '@/common/image.js';
import request from '../../../store/http.js';
var sourceType = [['camera'], ['album'], ['camera', 'album']];
var sizeType = [['compressed'], ['original'], ['compressed', 'original']];
export default {
	data() {
		return {
			// title: 'choose/previewImage',
			input_content: '',
			imageList: [],
			type: ['图片', '视频'],
			videos: '',
			src: '', //视频存放
			checkedValue: true,
			checkedIndex: 0,
			sourceTypeIndex: 2,
			sizeTypeIndex: 2,
			sizeType: ['压缩', '原图', '压缩或原图'],
			countIndex: 8,
			url:this.$store.state.url,
			count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			//侧滑返回start
			startX: 0, //点击屏幕起始位置
			movedX: 0, //横向移动的距离
			endX: 0, //接触屏幕后移开时的位置
			//end
			sourceType: ['拍摄', '相册', '拍摄或相册'],
			cameraList: [
				{
					value: 'back',
					name: '后置摄像头',
					checked: 'true'
				},
				{
					value: 'front',
					name: '前置摄像头'
				}
			],
			address:'请选择发送位置',
			cameraIndex: 0,
			VideoOfImagesShow: true,
			Inv: 0,
			Invv: 1,
			isSelectLocation:false,
			imagesNetList:[]
		};
	},
	onUnload() {
		
		(this.imageList = []),
			(this.sourceTypeIndex = 2),
			(this.sourceType = ['拍照', '相册', '拍照或相册']),
			(this.sizeTypeIndex = 2),
			(this.sizeType = ['压缩', '原图', '压缩或原图']),
			(this.countIndex = 8);
		(this.src = ''), (this.sourceTypeIndex = 2), (this.sourceType = ['拍摄', '相册', '拍摄或相册']);
	},
	methods: {
		// changeTab(Inv) {
		// 	that.navIdx = Inv;
		// },
		
		changeTab(Invv) {
			that.navIdx = Invv;
		},
		delec() {
			uni.showModal({
				title: '提示',
				content: '是否取消',
				success: res => {
					if (res.confirm) {
						uni.navigateTo({});
					}
				}
			});
		},
		
	
		chooseImage() {//点击加号选择添加图片或视频
			uni.showActionSheet({//显示操作菜单
				title: '选择上传类型',
				itemList: this.type,
				success: res => {
					console.log('1231', res);
					console.log('1231', res.tapIndex);
					if (res.tapIndex == 0) {
						this.chooseImages();
					} else {
						this.chooseVideo();
					}
				}
			});
			
		},
		chooseImages() {
			// 上传图片
			uni.chooseImage({
				
				count: 9, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: res => {
					if (this.imageList.length < 0) {
						this.type = ['图片', '视频'];
					} else {
						this.type = ['图片'];
					}
					console.log('1562',res);
					console.log('1562',this.imageList);
						this.imageList = this.imageList.concat(res.tempFilePaths);
						if (this.imageList.length == 9) {
							this.VideoOfImagesShow = false;
						}else{
							this.VideoOfImagesShow = true;
						}
					for(var i=0;i<res.tempFilePaths.length;i++)
						this.upLoad(res.tempFilePaths[i]);
				
					
				}
			});
		},
		upLoad(path){
			let _this =this;
			uni.uploadFile({
				url: this.url + '/api/post/uploadImg',
				filePath:path,
				name:'file',
				method: "POST",
				
				success: (uploadFileRes) => {
					var json = JSON.parse(uploadFileRes.data);
					if(json.code==1){
						
					_this.imagesNetList.push(json.data);
				
					
					console.log('path',path);
				
				}
					// uni.showToast({
					// 	title: json.msg
					// })
			
			
				}
			});
		},
		chooseVideo() {
			// 上传视频
			console.log('上传视频');
			uni.chooseVideo({
				maxDuration: 10,
				count: 1,
				camera: this.cameraList[this.cameraIndex].value,
				sourceType: sourceType[this.sourceTypeIndex],
				
				success: res => {
					if (this.src.length < 0) {
						this.type = ['图片', '视频'];
					} else {
						this.type = ['视频'];
					}
					console.log('1561', this.src.length);
					console.log(JSON.stringify(res.tempFilePath), '视频');
					this.src = res.tempFilePath;
					this.videos = 1;
					console.log(this.src);
				}
			});
		},
		 publish() {
			if (!this.input_content) {
				uni.showModal({ content: '内容不能为空', showCancel: false });
				return;
			}
			// if(!this.isSelectLocation){
			// 	uni.showModal({ content: '请选择地址', showCancel: false });
			// 	return;
			// }
			uni.showLoading({ title: '正在提交' });
			console.log('imagesNetList',this.imagesNetList)
			let images=this.imagesNetList.join(',');
				let authtoken = uni.getStorageSync("authtoken")
			request.urlRequest(
			this.url+'/api/member/addIdea',
			{
				content:this.input_content,
				
				img:images
			},{
				authtoken: authtoken
			},'POST',res=>{
				uni.hideLoading();
				uni.showToast({
					title:res.data.msg,
					icon:'none'
				})
				
				if(res.data.code==1){
					setTimeout(function(){uni.navigateBack({
						
					});},500)
					
				}
			}
			);
			},
		
		// 单张照片删除事件
		close(e) {
			this.imageList.splice(e, 1);
			this.imagesNetList.splice(e,1);
			if (this.imageList.length == 0) {
				this.type = ['图片', '视频'];
			}
			if(this.imageList.length <= 9){
				this.VideoOfImagesShow = true;
			}else{ 
				this.VideoOfImagesShow = false;
			}
			
			// console.log(this.imageList.length);
		},
		/* chooseImage: async function() {
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {

						// #ifdef APP-PLUS
						
						var compressd = cp_images=> {
							this.imageList = this.imageList.concat(cp_images)//压缩后的图片路径
						}
						image.compress(res.tempFilePaths,compressd);
						// #endif
						
						// #ifndef APP-PLUS
						this.imageList = this.imageList.concat(res.tempFilePaths)
						// #endif
						
					}
				})
			}, */
		// isFullImg: function() {
		// 	return new Promise(res => {
		// 		uni.showModal({
		// 			content: '已经有9张图片了,是否清空现有图片？',
		// 			success: e => {
		// 				if (e.confirm) {
		// 					this.imageList = [];
		// 					res(true);
		// 				} else {
		// 					res(false);
		// 				}
		// 			},
		// 			fail: () => {
		// 				res(false);
		// 			}
		// 		});
		// 	});
		// },
		previewImage: function(e) {
			var current = e.target.dataset.src;
			uni.previewImage({
				current: current,
				urls: this.imageList
			});
		},
		touchStart: function(e) {
			this.startX = e.mp.changedTouches[0].pageX;
		},
		touchEnd: function(e) {
			this.endX = e.mp.changedTouches[0].pageX;
			if (this.endX - this.startX > 200) {
				uni.navigateBack();
			}
		},
		/* delect(index){
		                uni.showModal({
		                    title: "提示",
		                    content: "是否要删除该图片",
		                    success: (res) => {
		                        if (res.confirm) {
		                            this.imageList.splice(index, 1)
		                        }
		                    }
		                })
		            }, */
		delectVideo() {
			uni.showModal({
				title: '提示',
				content: '是否要删除此视频',
				success: res => {
					if (res.confirm) {
						this.src = '';
						this.videos = '';
					} else {
						this.videos = 1;
					}
					if (this.src.length == 0) {
						this.type = ['图片', '视频'];
					}
				}
			});
		},
		top: function() {
			uni.chooseLocation({
				success: (res) => {
					
						this.isSelectLocation=true;
						this.address= res.address;
						
				}
			})
		},
		toptop: function() {
			uni.navigateTo({
				url: ''
			});
		},
		toptoptop: function() {
			uni.navigateTo({
				url: ''
			});
		},
	}
};
</script>

<style scoped lang="scss">
.footer {
	width: 634upx;
	height: 100upx;
	margin-top: 184upx;
	border-top: 1px solid #ededed;
	border-bottom: 1px solid #ededed;
	margin-left: 58upx;
}
.wenzi {
	float: left;
	font-size: 32upx;
	font-family: PingFangSC-Regular, PingFang SC;
	color: rgba(25, 25, 25, 1);
	padding-top: 24upx;
	padding-left: 37upx;
}

/* 上传 */
.uni-uploader {
	flex: 1;
	flex-direction: column;
}
.uni-uploader-head {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.uni-uploader-info {
	color: #B2B2B2;
}
.uni-uploader-body {
	
}
.uni-uploader__files {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
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
.uni-uploader__input-box {
	position: relative;
	margin:10upx;
	width: 200upx;
	height: 200upx;
	border: 2upx solid #D9D9D9;
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
.uni-uploader__input {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.img-one {
	float: left;
	width: 12upx;
	height: 24upx;
	padding-top: 38upx;
	padding-left: 386upx;
}
.top {
	width: 678upx;
	height: 59upx;
	margin-top: 90upx;
	margin-left: 36upx;
	margin-right: 36upx;
}
.quxiao {
	float: left;
	font-size: 30upx;
	font-family: PingFangSC-Regular, PingFang SC;
	color: rgba(0, 0, 0, 1);
	letter-spacing: 1px;
	padding-top: 8upx;
}
.fabiao {
	border-radius: 8upx;
	width: 90%;
	margin-left: 5%;
	margin-bottom: 30upx;
	font-size: 32upx;
	height: 100upx;
	position: fixed;
	bottom: 0upx;
	background: $uni-color-primary;
	
	text-align: center;
	line-height: 100upx;
	color: #FFFFFF;
}
.cell-pd {
	padding-top: 0upx;
	padding-left: 50upx;
}
.top-top {
	width: auto;
	padding-top: 55upx;
	padding-left: 57upx;
	padding-right: 57upx;
	line-height: 1.6;
	height: 202upx;
}
.wenben {
	width: 100%;
	height: 147upx;
	font-size: 32upx;
	font-family: PingFangSC-Regular, PingFang SC;
	color: #000000;
}
.uni-list::before {
	height: 0;
}
.uni-list:after {
	height: 0;
}
.list-pd {
	margin-top: 0;
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
.video_close {
	text-align: center;
	line-height: 30upx;
	height: 35upx;
	width: 35upx;
	background: #ef5350;
	color: #ffffff;
	position: absolute;
	top: 0upx;
	right: 405upx;
	font-size: 35upx;
	border-radius: 8upx;
	z-index: 100000;
}
.page {
	width: 750upx;
	height: 100%;
}
.uni-uploader__filee {
	width: 306upx;
	height: 408upx;
}
.uploader_video {
	width: 306upx;
	height: 408upx;
}
.video {
	width: 306upx;
	height: 408upx;
	background: #ffffff;
}
.inv-h-w {
	display: flex;
	margin: 112upx 401upx 56upx 60upx;
	justify-content: space-between;
}
.inv-h-se {
	font-size: 32upx;
	font-family: PingFangSC-Regular, PingFang SC;
	color: rgba(45, 45, 45, 1);
	border-bottom: 6upx solid #ff9100;
	padding-left: 0upx;
}
.inv-h-se1 {
	font-size: 32upx;
	font-family: PingFangSC-Regular, PingFang SC;
	color: rgba(45, 45, 45, 1);
	border-bottom: 6upx solid #ff9100;
	margin-left: 37upx;
}

.fabu{
	justify-content: center;
	margin-left: 40upx;
	align-items: center;
	
	display: flex;
	height:97upx;
	border-bottom: 1upx solid #ededed;
}
.fabu-two{
	float: left;
    flex: 1;
	font-size:28upx;
	font-family:PingFangSC-Regular,PingFang SC;
	color:rgba(45,45,45,1);
  
}
.fabu-one{
	float: left;
    width: 20%;
	font-size:28upx;
	font-family:PingFangSC-Regular,PingFang SC;
	color:rgba(45,45,45,1);
  
}
.uni-input{
	padding-left:55upx ;
	padding-top: 22upx;
	float: left;
	}
	.hongbao{
		width: 60%;
		float: left;
		font-size:26upx;
		font-family:PingFangSC-Regular,PingFang SC;
		color:rgba(223,223,223,1);
		padding-left:55upx ;
		padding-top: 25upx;
	}
	.img {
		margin-right: 20upx;
	width: 24upx;
	height: 24upx;
	
}
.inv-hh {
	background-color: #ffffff;
	height: 40upx;
	flex: 1;
	float: left;
	padding-top: 27upx;
	padding-left: 37upx;
}

.aa {
	display: flex; 
	flex-direction:row;
}
.invv {
	width: 101upx;
	color: #000000;
	height: 40upx;
	text-align: center;
	font-size: 24upx;
	margin-left: 20upx;
	}  
	
.invv-h-s {
	background:rgba(255,228,193,1);
	border-radius:6px;
	border:2px solid rgba(255,145,0,1);
}
</style>

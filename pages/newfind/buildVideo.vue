<template>
	<view style="width: 100%;">
		<view style="display: flex;flex-direction: row;align-items: center;margin-left: 24rpx;">
			<view style="font-size: 34rpx;color:  #FF502E ;">*</view>
			<view style="font-size: 34rpx;color: #333;">上传视频</view>
		</view>
		<!-- 上传视频 -->
		<view style="display: flex;flex-direction: row;align-items: center; margin-left: 40rpx;margin-top: 24rpx;">
			<image src="https://xin.yiyunoto.com/uploads/static/public/paizhao.png" style="width: 300rpx;height: 245rpx;" v-if="!videoSrc"
			 @click="gainVideo"> </image>
			<video class="videoBox" v-if="videoSrc" :src="videoSrc" controls></video>
			<view style="width: 320rpx;height: 245rpx;display: flex;margin-left: 20rpx; flex-direction: column;margin-bottom: 20rpx;">
				<view style="flex: 1;"></view>
				<view style="font-size: 22rpx;color: #999;">
					支持mp4,webm和ogg等格式 大小不超过100M 时长不超过10分钟
				</view>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;align-items: center;margin: 24rpx;">
			<view style="font-size: 34rpx;color:  #FF502E ;">*</view>
			<view style="font-size: 34rpx;color: #333;">视频介绍</view>
		</view>

		<textarea class="inpTxt" type="text" placeholder="最多40字" v-model="videoTitle" maxlength="40" />
		<view style="display: flex;flex-direction: row;align-items: center;margin: 24rpx;">
		<view style="font-size: 34rpx;color:  #FF502E ;">*</view>
		<view style="font-size: 34rpx;color: #333;">标签</view>
	</view>
	<view style="display: flex;flex-direction: row;flex-wrap: wrap;">
			<text :class="item.isSelect?'tagItemBox2':'tagItemBox' " v-for="(item,index) in tagArr" :key="index" @click="select(index)">
				{{item.title}}
		
			</text>
	</view>
	<textarea class="inpTxt2" type="text" placeholder="最多填写5个标签，用,隔开，单个标签最多10字" v-model="tag_text" maxlength="40" />
		<!-- 发布按钮 -->
		<view class="btnBox" @click="buildVideo">
			发布
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:this.$store.state.url,
				surplusY:0,
				videoSrc:'',
				tagArr:[],
				pitchTag:[],
				tagAddBox:false,
				videoTitle:'',
				tag_text:""
			}
		},
		methods: {
			// 返回上一页
			back(){
				uni.navigateBack({delta:1})
			},
			// 选择视频或拍摄视频
			gainVideo(){
				let _this = this;
				uni.chooseVideo({
					compressed:true,
					maxDuration:60,
					count:1,
					success(res) {
						console.log(res.tempFilePath);
						_this.videoSrc = res.tempFilePath;
					}
				})
			},
			
			select(index){
				this.tagArr[index].isSelect=!this.tagArr[index].isSelect
				this.$forceUpdate()
			},
		
			// 获取标签
			getTag(){
				let _this = this;
				uni.request({
					url:_this.url+'/api/video/get_category',
					method:"POST",
					success(res) {
						_this.tagArr = res.data.data
						_this.tagArr.forEach((item)=>{
							item.isSelect=false
						})
					}
				})
			},
			// 发布视频
			buildVideo(){
				let _this = this;
				if(_this.videoSrc==''){
					uni.showToast({
						icon:'none',
						title:'请选择要上传的视频'
					})
					return;
				}
				
				var token = uni.getStorageSync('authtoken');
				var ids = [];
				
				_this.tagArr.forEach((item)=>{
					if(item.isSelect){
						ids.push(item.id);
					}
					
				})
				
				var str = ids.toString();
				uni.showLoading({
					title:'上传中',
					mask:true
				})
				uni.uploadFile({
					url:_this.url+'/api/video/uploadv',
					filePath:_this.videoSrc,
					name:'vurl',
					header:{
				
						authtoken:token
					},
					formData:{
						tag_text:this.tag_text,
						title:_this.videoTitle,
						tag:str,
						good_id:''
					},
					success(res) {
					let d= 	JSON.parse(res.data)
						uni.hideLoading();
						uni.showToast({
							icon:'none',
							title:d.msg
						})
						if(d.code==1){
							uni.navigateBack({
								
							})
						}
					}
				})
			}
		},
		onLoad() {
			this.getTag();
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
			this.infoMsgUrl = this.$store.state.storageurl
		}
	}
</script>

<style>
	page{
		width: 100%;
		background-color: #fff;
	}
/* 去掉刘海 */
.status_bar {
	/* #ifndef APP-PLUS */
	height: var(--status-bar-height);
	/* #endif */
	width: 100%;
	padding-top: 60upx;
}
/* 导航栏 */
.navBar{
	width: 100%;
	height: 80upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 30upx;
}
.back{
	width: 42upx;
	height: 42upx;
}
.title{
	font-size: 36upx;
	color: #333333;
	font-weight: 700;
}
/* 视频展示 */
.videoBox{
	width: 300rpx;
	height: 245upx;
	
}
.levelLayout{
	flex-direction: row !important;
	justify-content: space-between !important;
}
.blackBox{
	width: 33.33%;
	height: 100%;
	background-color: #00aaff;
}
.video{
	width: 33.33%;
	height: 100%;
}

.hintTitle{
	height: 50%;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 20upx;
	box-sizing: border-box;
}
.inpBox{
	
	padding: 0 20upx;
	box-sizing: border-box;
}
.inpTxt{
	margin-left: 24rpx;
	margin-right: 24rpx;
	height: 233rpx;
	
	border-radius: 16rpx;
	background: #F3F4F5;
	font-size: 30upx;
	color: #333;
	padding: 20upx;
	box-sizing: border-box;
	
}
.inpTxt2{
	margin-top: 24rpx;
	margin-left: 24rpx;
	margin-right: 24rpx;
	height: 157rpx;
	
	border-radius: 16rpx;
	background: #F3F4F5;
	font-size: 30upx;
	color: #333;
	padding: 20upx;
	box-sizing: border-box;
	
}
/* 标签 */
.tagBox{
	height: 300upx;
	margin-top: 20upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.tagHint{
	width: 30%;
	height:100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	padding-left: 20upx;
	box-sizing: border-box;
}
.tagHintTxt{
	font-size: 38upx;
	color: #333;
	font-weight: 600;
}
.tagMinBox{
	width: 70%;
	height: 100%;
	border-left: 1upx dashed #efefef;
	padding: 10upx;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: start;
	flex-wrap: wrap;
}
.tagItemBox{
	margin-top: 10rpx;
	height: 56rpx;
	background: #eee;
	border-radius: 4upx;
	font-size: 26upx;
	color: #333;
	display: flex;
	text-align: center;
	line-height: 56rpx;
	
	margin-left: 24rpx;
	padding: 0 34rpx;
}
.tagItemBox2{
	margin-top: 10rpx;
	height: 56rpx;
	background:#FFECE3;
	border-radius: 4upx;
	font-size: 26upx;
	color: #FF6010;
	display: flex;
	text-align: center;
	line-height: 56rpx;
	
	margin-left: 24rpx;
	padding: 0 34rpx;
}
.addTagSuccess{
	font-size: 24upx;
	color: #FFFFFF;
	display: inline-block;
	width: 100upx;
	height: 50upx;
	border-radius: 20upx;
	background-color: #2695FA;
	text-align: center;
	line-height: 50upx;
}
/* 发布按钮 */
.btnBox{
	text-align: center;
	margin-top: 76upx;
	line-height: 80rpx;
	margin-left: 75rpx;
	margin-right: 75rpx;
	/* width: 600rpx; */
	height: 80rpx;
	background: linear-gradient(90deg, #FF7085 0%, #FF5837 100%);
	border-radius:40px;
	font-size: 36rpx;
	color: #fff;
	margin-bottom: 50rpx;
}	
.btn{
	display: inline-block;
	width: 90%;
	height: 100%;
	font-size: 32upx;
	color: #FFFFFF;
	text-align: center;
	line-height: 80upx;
	background-color: #1D99FA;
}
</style>

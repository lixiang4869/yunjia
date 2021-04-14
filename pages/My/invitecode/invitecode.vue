<template>
	<view class="content" :style="{width:width,height:height}">
		<image :src="url+'/uploads/static/address/tu.png'"  :style="{width:width,height:height}"></image>
		<view class="header">
			<image class="backPage" src="../../../static/public/goBack.png" @click="back"></image>
			<text class="titleTxt">邀请好友</text>
			<view class="backPage" ></view>
		</view>
		<!-- 二维码 -->
		<view class="ewmBox">
			<view class="imgs">
				<image class="img1" :src="url+'/uploads/static/address/text.png'"></image>
				<image class="img2" :src="url+'/uploads/static/address/price.png'"></image>
			</view>
			<view class="centerMa">
				<text style="font-size: 31rpx;color: #333333;">您的邀请码</text>
				<image class="ewm" :src="imgurl" @longtap="saveImg"></image>
				<text style="font-size: 27rpx;color: #999999;">长按图片即可保存</text>
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="share" class="btnshare" 
				  :style="{backgroundImage:'url('+url+'/uploads/static/address/btnBg.png)'}">
					转发邀请
				  </button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<view class="btnBox" @click="shareUser">
					<image style="width: 100%;height: 100%;" :src="url+'/uploads/static/address/btnBg.png'"></image>
					<text class="btnTxt">转发邀请</text>
				</view>
				<!-- #endif -->
			</view>
		</view>
		
		<!-- 文字 -->
		<view class="hintBox1">
			<view class="hintNumBox">
				<text class="hintNum">1</text>
			</view>
			<text class="hintTxt">长按图片下载二维码，朋友扫码加入</text>
		</view>
		
		<view class="hintBox1" style="bottom: 50rpx;">
			<view class="hintNumBox">
				<text class="hintNum">2</text>
			</view>
			<text class="hintTxt">点击按钮邀请朋友进入界面</text>
		</view>
		<!-- <uni-popup ref="popup" type="share">
		    <uni-popup-share title="分享到" @select="select" :bottomData="[
				{text:'微信聊天',icon:'../../../static/my/wx.png',txt:'WXSceneSession'},
				{text:'微信朋友圈',icon:'../../../static/video/friends.png',txt:'WXSenceTimeline'}
			]"></uni-popup-share>
		</uni-popup> -->
	</view>
</template>

<script>
	import request from "../../../store/http.js"
	// import uniPopup from '@/components/uni-popup/uni-popup.vue'
	// import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue'
	export default {
		// components:{
		// 	uniPopup,
		// 	uniPopupShare
		// },
		data() {
			return {
				url:this.$store.state.url,
				imgurl:"",
				width:'',
				height:'',
				img:''
			}
		},
		onLoad() {
			this.getVideoXY();
			this.getcode();
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
			select(){
				uni.share({
					provider:'weixin',
					type:2,
					imageUrl: this.img,
					scene:"WXSceneSession",
					success:function(res) {
						console.log(res)
					},
					fail:function(e) {
						console.log(e)
					}
				})
			},
			shareUser(){
				this.shareImg()
				// this.$refs.popup.open()
			},
			shareImg(){
				var that =	this;
				// #ifdef APP-PLUS
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];  
				console.log("当前页"+pages.length-1);
				var bitmap=null;  
				var currentWebview = page.$getAppWebview();
				bitmap = new plus.nativeObj.Bitmap('amway_img');  
				// 将webview内容绘制到Bitmap对象中  
				currentWebview.draw(bitmap,function(){  
					console.log('截屏绘制图片成功');  
					bitmap.save( "_doc/a.jpg"  
					,{}  
					,function(i){  
						console.log('保存图片成功：'+JSON.stringify(i));
						that.img = i.target;
						
						that.select()
					}  
					,function(e){  
						console.log('保存图片失败：'+JSON.stringify(e));
					});  
				},function(e){  
					console.log('截屏绘制图片失败：'+JSON.stringify(e));
				});
				// #endif
				// #ifdef MP-WEIXIN
				uni.showLoading()
				uni.downloadFile({
					url:this.imgurl,
					success(res) {
						that.img = res.tempFilePath;
					}
				})
				// #endif
			},
			saveImg(){
				// #ifdef APP-PLUS
				var pages = getCurrentPages();  
				var page = pages[pages.length - 1];  
				console.log("当前页"+pages.length-1);
				var bitmap=null;  
				var currentWebview = page.$getAppWebview();
				bitmap = new plus.nativeObj.Bitmap('amway_img');  
				// 将webview内容绘制到Bitmap对象中  
				currentWebview.draw(bitmap,function(){  
					console.log('截屏绘制图片成功');  
					bitmap.save( "_doc/a.jpg"  
					,{}  
					,function(i){  
						console.log('保存图片成功：'+JSON.stringify(i));  
						uni.saveImageToPhotosAlbum({  
							filePath: i.target,  
							success: function () {  
								bitmap.clear(); //销毁Bitmap图片  
								uni.showToast({  
									title: '保存图片成功',  
									mask: false,  
									duration: 1500  
								});  
							}  
						});  
					}  
					,function(e){  
						console.log('保存图片失败：'+JSON.stringify(e));  
					});  
				},function(e){  
					console.log('截屏绘制图片失败：'+JSON.stringify(e));
				});
				// #endif
				// #ifdef MP-WEIXIN
				uni.showLoading()
				uni.downloadFile({
					url:this.imgurl,
					success(res) {
						uni.saveImageToPhotosAlbum({
							filePath:res.tempFilePath,
							success(res) {
								console.log(res)
								uni.hideLoading()
								uni.showToast({
									icon:'success',
									title:'保存成功'
								})
							},
							fail(e) {
								console.log(e)
								uni.hideLoading()
							}
						})
					}
				})
				// #endif
			},
			// 获取视口宽高
			getVideoXY() {
				let res = uni.getSystemInfoSync()
				this.width = res.windowWidth + 'px';
				this.height = res.windowHeight + 'px';
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			getcode(){
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + "/api/member/makeInviteQRcode", {
					}, {
						authtoken: authtoken
					}, 'POST', res => {
					if(res.data.code==1){
						this.imgurl =this.url+res.data.data.Qrcode;	
						console.log(this.imgurl)
					}else{
						uni.showToast({
							title:res.data.msg,icon:"none"
						})
					}
				});
			}
		}
	}
</script>

<style>
	.content{
		position: relative;
	}
	.header{
		position: absolute;
		top: var(--status-bar-height);left: 0;
		width: 100%;
		height: 10%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.backPage{
		width: 19rpx;
		height: 34rpx;
		
	}
	.titleTxt{
		font-size: 38rpx;
		color: #FFFFFF;
		font-weight: 700;
	}
	.ewmBox{
		width: 90%;
		height: 70%;
		position: absolute;
		top: 50%;margin-top: -60%;
		left: 50%;margin-left: -45%;
	}
	.imgs{
		width: 100%;
		top: 0;left: 0;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.img1{
		width: 503rpx;
		height: 176rpx;
	}
	.img2{
		width: 616rpx;
		height: 207rpx;
		position: absolute;
		top: 100rpx;left: 20rpx;
	}
	.centerMa{
		width: 90%;
		height: 80%;
		margin: 0 auto;
		background-color: #FFFFFF;
		margin-top: 50rpx;
		border-radius: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.ewm{
		width: 400rpx;
		height: 400rpx;
		margin: 30rpx 0;
	}
	.btnBox{
		width: 90%;
		height: 100rpx;
		border-radius: 50rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 120rpx;
		position: relative;
	}
	.btnTxt{
		font-size: 30rpx;
		color: #FFFFFF;
		z-index: 3;
		position: absolute;
		top: 25%;left: 38%;
	}
	.hintBox1{
		position: absolute;
		bottom: 90rpx;left: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 10%;
	}
	.hintNumBox{
		width: 40rpx;
		height: 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: rgba(255,255,255,0.3);
		border-radius: 50%;
	}
	.hintNum{
		color: #FFFFFF;
		font-size: 25rpx;
	}
	.hintTxt{
		font-size: 26rpx;
		color: #FFFFFF;
		margin-left: 10rpx;
	}
	
	.btnshare {
		width: 90%;
		height: 100rpx;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		line-height: 100rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}
	button {
		background-color: rgba(0, 0, 0, 0);
	}
	
	button::after {
		border: none;
	}
</style>

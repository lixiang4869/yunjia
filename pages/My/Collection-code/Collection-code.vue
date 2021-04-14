<template>
	<view>
		<view class="top">
			<view class="top-one">
		
					
				<view class="title">扫二维码向我付钱</view>
				<!-- <view class="shu" v-if="qwe"> {{"¥" + qwe+".00"}}</view> -->
				<view>
					<image :src="url+src" class="images">
				</view>
				<view class="set" @click="saveImg">保存图片</view>

			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../store/http.js'
	export default {
		data() {
			return {
				url: this.$store.state.url, //token路径
				src: "",
				
			};
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
		methods: {
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
					bitmap.save( "_doc/b.jpg"  
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
					url:this.url+this.src,
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
			getdata() {
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(this.url + "/api/member/makeWechatPaymentCode", {}, {
					authtoken: authtoken
				}, "POST", res => {
					this.src=res.data.data.Qrcode
				})
			}
		},
		onLoad(e) {
			this.getdata();
		},
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		
	}

	.top-one {
		width: 690upx;
		height: 700upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		margin-top: 30upx;
		margin-left: 30upx;
	}

	.head {
		width: 690upx;
		height: 102upx;
		background: rgba(247, 247, 247, 1);
		border-radius: 10upx 10upx 0px 0px;
	}

	.img {
		width: 32upx;
		height: 22upx;
		
		padding-top: 40upx;
		padding-left: 30upx;
	}

	.text {
		font-size: 28upx;
		font-family: PingFangSC-Regular, PingFang SC;
		color: rgba(249, 138, 51, 1);
		line-height: 40upx;
		letter-spacing: 1upx;
		padding-left: 26upx;
	}

	.title {
		font-size: 26upx;
		font-family: PingFangSC-Regular, PingFang SC;
		color: rgba(87, 87, 87, 1);
		padding-left: 242upx;
		padding-top: 36upx;
	}

	.images {
		width: 268upx;
		height: 268upx;
		margin-left: 211upx;
		margin-top: 26upx;
	}

	.you {
		width: 19upx;
		height: 35upx;
		float: left;
		padding-left: 360upx;
		padding-top: 51upx;
	}

	.set {
		float: left;
		font-size: 26upx;
		font-family: PingFangSC-Regular, PingFang SC;
		color: rgba(249, 138, 51, 1);
		margin-left: 293upx;
		padding-top: 40upx;
	}

	.shu {
		float: left;
		width: 100%;
		font-size: 52upx;
		text-align: center;
		font-family: PingFangSC-Regular, PingFang SC;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>

<template>
	<scroll-view :scroll-y="true" :style="{height:height}" :show-scrollbar="false" :refresher-enabled="true"
	 @scrolltoupper="onPullDown" @scrolltolower="getmore">
		<view class="pullDown" :style="{width:width,top:topY,position: isDown ? 'relative' : 'absolute'}">
			<image style="width: 50upx;height: 50upx;" src="../../static/video/lodin.gif" v-if="downImgShow"></image>
			<text style="color: #333;font-size: 28upx;">{{pullDownTxt}}</text>
		</view>
		<!-- #ifndef MP -->
		<view class="livePageBox">
			<!-- #endif -->
			<!-- #ifdef MP -->
			<view class="livePageBox" :style="{width:width}">
				<!-- #endif -->
			
				<view class="liveList" :style="{width:width}">
					<view class="liveItems" v-for="(item,index) in lists" :key="index" @click="go_video(item.id)">
						<view class="liveItemTop">
							<image class="liveHead" :src="item.headimg||'../../static/video/defaultHead.png'"></image>
							<view class="liveInfo">
								<text class="liveTitle">{{item.truename}}</text>
								<view class="subheadBox">
									<text style="font-size: 25upx;color: #999;">{{convertTimeToFormat(item.create_time)}}</text>
								</view>
							</view>

						</view>
						<view class="details">{{item.content}}</view>
						<view class="liveImgBox" v-if="item.image_urls&&item.image_urls[0].search('mp4')==-1">
							<view v-for="(ite,j) in item.image_urls" :key="j" class="miniImg1" @click.stop="goprepare(index,j)"  >
								<image :src="ite.search('http')!=-1?ite: url+ite" mode="widthFix" class="miniImg2"></image>
								<!-- <video :src="item.image_urls[0]" style="width: 100%;height: 250rpx;" v-if="ite.search('mp4')!=-1"></video> -->
							</view>

						</view>
						<view class="details2" v-if="item.image_urls&&item.image_urls[0].search('mp4')!=-1" @click.stop="">
							<video :src="item.image_urls[0]" style="width: 420rpx;"  controls="false"></video>
						
						</view>
						<view class="bottom_s">
							
							<image src="../../static/video/location_red.png" class="bottomimg" style="	width: 20upx;height: 26upx;"></image>
							<text class="liveTitle1" >{{item.address}}</text>
							<image src="../../static/bao/yan.png" class="bottomimg" style="	width: 30upx;height: 22upx;"></image>
							<text class="liveTitle2">{{item.page_view}}</text>
							<!-- <image src="../../static/video/dianzan1.png" class="bottomimg"></image>
							<text class="liveTitle2">{{item.like_num}}</text> -->
							<image src="../../static/video/pinglun.png" class="bottomimg" style="	width: 30upx;height: 26upx;"></image>
							<text class="liveTitle2">{{item.comment_num}}</text>
						</view>
					</view>

					<view class="liveBottom"></view>
				</view>

				<!-- 固定按钮 -->
				<!-- <view class="fixedBtn" v-if="fixedBtnShow" @click="goVideo()">
				<text class="goLive">发起直播</text>
			</view> -->
			</view>
	</scroll-view>
</template>

<script>
	import util from "../../common/util.js"


	export default {

		props: {
			fixedBtnShow: {
				type: Boolean,
				default: false
			},
			updateList: {
				type: Array,
				default: new Array()
			}
		},
		watch: {
			updateList: function(newData, oldData) {
				console.log("newData")
			}
		},
		data() {
			return {
				height: '',
				width: '',
				url: this.$store.state.url,
				info: [], // 轮播图数据
				current: 0, // 当前显示轮播图下标
				mode: 'round', // 轮播图指示点样式
				lists: '', // 直播列表
				goods: [], // 主播推荐商品
				userToken: '',
				topY: 0,
				page: 1,
				isDown: false,
				pullDownTxt: '正在刷新',
				downImgShow: true,
				canloadingmore: true
			}
		},
		created() {
			this.getVideoXY();
			this.initData();
		},
		methods: {
			convertTimeToFormat(t) {

				return util.convertTimeToFormat(t)
			},
			goprepare(i, j) {
				let imgArr = [];
				for (let k = 0; k < this.lists[i].image_urls.length; k++) {
					imgArr.push(this.lists[i].image_urls[k])
				}
				uni.previewImage({
					current: j,
					urls: imgArr,
					loop: true,
					indicator: "number",
					longPressActions: {
						success: function(data) {
							// console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							// console.log(err.errMsg);
						}
					}
				});
			},
			getmore() {
				if (!this.canloadingmore) {
					return;
				}
				this.page++;
				let _this = this;
				uni.request({
					url: this.url + '/api/hongbao/redpackList',
					method: 'POST',
					data: {
						page: _this.page
					},
					success(res) {

						var data = res.data.data.data;
						var arr = [];
						if (_this.page < res.data.data.last_page) {
							_this.canloadingmore = true;
						} else {
							_this.canloadingmore = false;
						}
						console.log("image_urls",data)
						for (var i = 0; i < data.length; i++) {
							data[i].image_urls = data[i].image_url.split(",");
							console.log("data[i].image_urls",data[i].image_urls)
							if (data[i].headimg&&data[i].headimg.search("http")==-1) {
								data[i].headimg = _this.url + data[i].headimg;
							}
							arr.push(data[i])
						}
						console.log(arr)
						_this.lists = _this.lists.concat(arr)
					}
				})
			},
			// 获取视口宽高
			getVideoXY() {
				let res = uni.getSystemInfoSync();
				this.height = res.windowHeight + 'px';
				this.width = res.windowWidth + 'px';


			},
			onPullDown(done) { // 下拉刷新
				console.log(1111111)
				this.topY = 0;

				this.isDown = true;
				this.initData(true);
			},
			// 获取列表
			initData(isPullDown) {
				isPullDown = isPullDown || false
				this.page = 1;
				var that = this
				uni.request({
					url: this.url + '/api/hongbao/redpackList',
					method: 'POST',
					data: {
						page: this.page
					},
					success(res) {
						if (isPullDown) {
							setTimeout(() => {
								that.downImgShow = false;
								that.pullDownTxt = '刷新成功';
								setTimeout(() => {
									that.topY = '-80upx';
									that.isDown = false;
									that.downImgShow = true;
									that.pullDownTxt = '正在刷新';
								}, 500)
							}, 1000);
						}
						var data = res.data.data.data;
						var arr = [];
						if (that.page < res.data.data.last_page) {
							that.canloadingmore = true;
						} else {
							that.canloadingmore = false;
						}
						for (var i = 0; i < data.length; i++) {
							data[i].image_urls = data[i].image_url.split(",");
					
							if (data[i].headimg&&data[i].headimg.search("http")==-1) {
							
						
								data[i].headimg = that.url + data[i].headimg;
							}
							arr.push(data[i])
						}
						console.log(arr)
						that.lists = arr
					}
				})
				
			},
			// 跳转到video
			go_video(id) {
				uni.navigateTo({
					url: "/redpage/redpackge/detail/detail?id=" + id
				})
			},
		}
	}
</script>

<style lang="less">
	.bottomimg {
	
		margin-left: 20upx;
		margin-right: 10upx;
	}

	.liveTitle1 {
		flex: 1;
		font-size: 26upx;
		
		color: #bbb;
		/* #ifndef APP-PLUS-NVUE */
		white-space: nowrap;
		-webkit-line-clamp: 1;
		word-break: break-word; //换行模式
	
		display: -webkit-box;
		/* #endif */
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		lines: 1; 
	}

	.address {

		font-size: 26upx;
		color: #999999;
	}

	// 页面布局
	.livePageBox {
		background-color: #F5F5F5;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.bottom_s {
		padding-right: 20upx;
		margin-bottom: 10upx;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		width: 710upx;
		height: 50upx;
		align-items: center;
		flex-direction: row;


	}
	.details {
		margin-top: 8rpx;
		margin-bottom: 16rpx;
		margin-left: 20upx;
		font-size: 30upx;
		color: #333333;
	}
	.details2 {
		
		margin-left: 20upx;
		font-size: 30upx;
		color: #333333;
	}

	.pullDown {
		height: 80upx;
		// background-color: rgb(230, 230, 230);
		top: -80upx;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	// 头部搜索栏
	.topSearch {
		width: 710upx;
		height: 80upx;
		position: relative;
		margin-top: 30upx;
	}

	.searchInp {
		color: #97A3B2;
		font-size: 30upx;
		height: 80upx;
		width: 710upx;
		background-color: #DEE2F0;
		padding-left: 50upx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
		border-radius: 10upx;
	}

	.searchImg {
		width: 24upx;
		height: 24upx;
		position: absolute;
		top: 28upx;
		left: 13upx;
	}



	// 直播列表
	.liveList {
		align-items: center;
		width: 710upx;
		margin-top: 30upx;
	}

	.liveItems {
		background-color: #fff;
		width: 710upx;
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		border-radius: 20upx;
		margin-bottom: 30upx;
	}

	.liveItemTop {
		margin-top: 15rpx;
		width: 710upx;
		height: 90upx;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.liveHead {
		width: 90upx;
		height: 90upx;
		border-radius: 45upx;
		margin-left: 20upx;
	}

	.liveInfo {
		
		height: 70upx;
		margin-left: 20upx;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
	}

	.liveTitle2 {

		font-size: 30upx;
		color: #999;
		
		overflow: hidden;
	}

	.liveTitle {

		font-size: 28upx;
		color: #333;
		font-weight: 600;
		overflow: hidden;
	}

	.subheadBox {
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.liveImgBox {
		width: 710upx;
		height: 250upx;
		// margin-top: 26upx;
		margin-left: 20upx;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: flex-start;
	}




	.miniImg1 {
		width: 215upx;
		// height: 215upx;
		margin-right: 20rpx;
	}

	.miniImg2 {
		width: 100%;
		height: 100%;
	}

	// 用来使页面显示完全
	.liveBottom {
		width: 710upx;
		height: 140upx;
	}
</style>

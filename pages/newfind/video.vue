<template>
	<scroll-view :scroll-y="true" :style="{height:height}" :show-scrollbar="false" :refresher-enabled="true"
	 @scrolltoupper="onPullDown">
		<view class="pullDown" :style="{width:width,top:topY,position: isDown ? 'relative' : 'absolute'}">
			<image style="width: 50upx;height: 50upx;" src="../../static/video/lodin.gif" v-if="downImgShow"></image>
			<text style="color: #fff;font-size: 28upx;">{{pullDownTxt}}</text>
		</view>
		<!-- #ifndef MP -->
		<view class="livePageBox">
		<!-- #endif -->
		<!-- #ifdef MP -->
			<view class="livePageBox" :style="{width:width}">
		<!-- #endif -->
				<!-- 头部搜索栏 -->
				<!-- <view class="topSearch">
					<input class="searchInp" :value="searchData" type="text" placeholder="儿童口罩 生鲜配送 肉类" />
					<image class="searchImg" src="../../static/home/sousuo.png" mode=""></image>
				</view> -->
				<!-- 轮播图 -->
				<view class="bannerBox">
					<uni-swiper-dot style="width: 710upx;" :info="info" :current="current" field="content" :mode="mode">
						<swiper style="width: 710upx;height: 285upx;" class="swiper-box" @change="change">
							<swiper-item style="width: 710upx;height: 285upx;" v-for="(item ,index) in info" :key="index">
								<view style="width: 710upx;height: 285upx;" class="swiper-item">
									<image style="width: 710upx;height: 285upx;" :src="item.img"></image>
								</view>
							</swiper-item>
						</swiper>
					</uni-swiper-dot>
				</view>
				<!-- 主播推荐 -->
				<view class="recommend">
					<view class="leftTitle">
						<image class="leftTitleImg" src="../../static/live/recom.png"></image>
						<text class="leftTitleTxt">主播力荐</text>
					</view>
					<scroll-view class="shopList" scroll-x="true" :show-scrollbar="false">
						<view class="shopView" :style="{width:190*goods.length+'upx'}">
							<view class="shopItem" v-for="(item,index) in goods" :key="index" @click="goShopCart(item.shopId,item.good_id)">
								<image class="shopItemImg" :src="item.goodImg"></image>
								<text class="shopItemTitle">{{item.txt}}</text>
							</view>
						</view>
					</scroll-view>
				</view>
				<!-- 直播列表 -->
				<view class="liveList">
					<view class="liveItem" v-for="(item,index) in lists" :key="index">
						<view class="liveItemTop">
							<image class="liveHead" :src="item.headimg||'../../static/video/defaultHead.png'"></image>
							<view class="liveInfo">
								<text class="liveTitle">{{item.title}}</text>
								<view class="subheadBox">
									<text style="font-size: 25upx;color: #999;">{{item.tags}}</text>
									<text style="font-size: 25upx;color: #999;">{{item.addtime}}</text>
								</view>
							</view>
							<view class="topLiveStateBox">
								<view class="topLiveStateDot"></view>
								<text class="topLiveStateTxt" v-if="item.living">直播中</text>
								<text class="topLiveStateTxt" v-if="!item.living">未直播</text>
							</view>
						</view>
						<!-- <text class="synopsis">优惠攻略尽在海信！</text> -->
						<text class="synopsis"></text>
						<view class="liveImgBox">
							<view class="bigLiveImg" @click="go_video(item.id,item.streamname)">
								<image class="bigImg" :src="item.img"></image>
								<image class="playLive" src="https://xin.yiyunoto.com/uploads/static/live/live.png"></image>
								<view class="stateInfoBox">
									<text class="stateInfoLeft" v-if="item.living==1">•直播中</text>
									<text class="stateInfoLeft" v-if="item.living==0">•未直播</text>
									<!-- <text class="stateInfoRight">153在看</text> -->
								</view>
								<view class="likeNumBox">
									<image style="width: 45upx;height: 45upx;" src="https://xin.yiyunoto.com/uploads/static/live/like.png"></image>
									<text style="color: #fff;font-size: 20upx;">{{item.keep_num}}</text>
								</view>
							</view>
							<view class="miniLiveImg">
								<image class="miniImg" :src="item.good.length>=1?url+item.good[0].img:''"></image>
								<image class="miniImg" :src="item.good.length>=2?url+item.good[1].img:''"></image>
							</view>
						</view>
					</view>
					<!-- 使页面显示完全无其他用处 -->
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
	// 轮播插件
	import uniSwiperDot from "@/components/uni-swiper-dot_1.0.4/components/uni-swiper-dot/uni-swiper-dot.vue"
	export default {
		components: {
			uniSwiperDot
		},
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
				isDown: false,
				pullDownTxt: '正在刷新',
				downImgShow: true
			}
		},
		created() {
			this.getVideoXY();
			this.initData();
		},
		methods: {
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
			// 获取直播列表
			initData(isPullDown) {
				isPullDown = isPullDown || false
				var that = this
				uni.request({
					url: this.url + '/api/liveApi/get_live_list',
					method: 'GET',
					success(res) {
						console.log(res);
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
						var data = res.data.data;
						var arr = [];
						for (var i = 0; i < data.length; i++) {
							data[i].img = that.url + data[i].img;
							if (data[i].headimg) {
								data[i].headimg = that.url + data[i].headimg;
							}
							arr.push(data[i])
						}
						console.log(arr)
						that.lists = arr
					}
				})
				uni.request({
					url: this.url + '/api/liveApi/get_ad',
					method: 'GET',
					success(res) {
						var banner = res.data.data.ad;
						var arr = [];
						for (var i = 0; i < banner.length; i++) {
							arr.push({
								img: that.url + banner[i].img
							});
						}
						that.info = arr;
						var recmdInfo = res.data.data.re;
						arr = [];
						for (var i = 0; i < recmdInfo.length; i++) {
							arr.push({
								goodImg: that.url + recmdInfo[i].img,
								txt: recmdInfo[i].name,
								good_id:recmdInfo[i].good_id,
								shopId:recmdInfo[i].shopid
							})
						}
						that.goods = arr;
					}
				})
			},
			// 跳转到video
			go_video(id, streamname) {
				uni.navigateTo({
					url: './laVideo?id=' + id + '&streamname=' + streamname
				})
			},
			// 发起直播
			goVideo(streaname) {
				var token = uni.getStorageSync("authtoken");
				uni.navigateTo({
					url: './liveSetout?authtoken=' + token + '&streamname=' + streaname
				})
			},
			onloadLiveList() {
				var that = this
				uni.request({
					url: this.url + '/api/liveApi/get_live_list',
					method: 'GET',
					success(res) {
						var data = res.data.data;
						var arr = [];
						for (var i = 0; i < data.length; i++) {
							data[i].img = that.url + data[i].img;
							if (data[i].headimg) {
								data[i].headimg = that.url + data[i].headimg;
							}
							arr.push(data[i])
						}
						that.lists = arr
					}
				})
			},
			goShopCart(shopid,goodid){
				uni.navigateTo({
					// url:'../Home/storDetails/storeDetails?shopId='+shopid
				})
			}
		}
	}
</script>

<style lang="less">
	// 页面布局
	.livePageBox {
		background-color: #F4F4F4;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.pullDown {
		height: 80upx;
		background-color: rgb(230, 230, 230);
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

	// 轮播图
	.bannerBox {
		width: 710upx;
		height: 285upx;
		border-radius: 20upx;
		overflow: hidden;
		margin-top: 30upx;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	// 主播推荐
	.recommend {
		width: 710upx;
		height: 259upx;
		border-radius: 20upx;
		margin-top: 30upx;
		overflow: hidden;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		background-color: #FFFFFF;
	}

	.leftTitle {
		width: 150upx;
		height: 259upx;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.leftTitleImg {
		width: 100upx;
		height: 40upx;
	}

	.leftTitleTxt {
		width: 80upx;
		margin-top: 23upx;
		font-size: 40upx;
		color: #333;
		font-family: Adobe Heiti Std R;
		font-weight: 600;
	}

	.shopList {
		width: 560upx;
		height: 259upx;
	}

	.shopView {
		height: 259upx;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.shopItem {
		width: 170upx;
		height: 250upx;
		margin: 0 10upx;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-around;
	}

	.shopItemImg {
		width: 170upx;
		height: 169upx;
		border-radius: 20upx;
	}

	.shopItemTitle {
		width: 170upx;
		color: #333;
		font-size: 24upx;
		text-align: center;
		overflow: hidden;
		/* #ifndef APP-PLUS */
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		/* #endif */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		/* #ifndef APP-PLUS */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		/* #endif */
		/* #ifdef H5||MP */
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1;
		/** 显示的行数 **/
		/* #endif */
	}

	// 直播列表
	.liveList {
		width: 710upx;
		margin-top: 30upx;
	}

	.liveItem {
		width: 710upx;
		height: 646upx;
		background-color: #fff;
		border-radius: 20upx;
		margin-bottom: 30upx;
	}

	.liveItemTop {
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
		width: 70upx;
		height: 70upx;
		border-radius: 35upx;
		margin-left: 20upx;
	}

	.liveInfo {
		width: 227upx;
		height: 70upx;
		margin-left: 20upx;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
	}

	.topLiveStateBox {
		width: 106upx;
		height: 38upx;
		border-radius: 20upx;
		margin-top: -25upx;
		background-color: #E6435C;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.topLiveStateDot {
		width: 10upx;
		height: 10upx;
		background-color: #fff;
		border-radius: 5upx;
	}

	.topLiveStateTxt {
		color: #fff;
		text-align: center;
		font-size: 20upx;
	}

	.liveTitle {
		font-size: 30upx;
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

	.synopsis {
		color: #666;
		font-size: 30upx;
		margin-top: 30upx;
		margin-left: 26upx;
	}

	.liveImgBox {
		width: 668upx;
		height: 435upx;
		margin-top: 26upx;
		margin-left: 26upx;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
	}

	.bigLiveImg {
		width: 435upx;
		height: 435upx;
		position: relative;
	}

	.playLive {
		width: 127upx;
		height: 127upx;
		position: absolute;
		top: 154upx;
		left: 154upx;
		z-index: 1;
	}

	.stateInfoBox {
		height: 40upx;
		position: absolute;
		bottom: 20upx;
		left: 20upx;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.stateInfoLeft {
		width: 95upx;
		height: 40upx;
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		text-align: center;
		line-height: 40upx;
		background-color: #E6435C;
		color: #fff;
		font-size: 25upx;
	}

	.stateInfoRight {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		height: 40upx;
		text-align: center;
		line-height: 40upx;
		color: #fff;
		font-size: 25upx;
	}

	.likeNumBox {
		width: 80upx;
		height: 80upx;
		position: absolute;
		bottom: 30upx;
		right: 30upx;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.bigImg {
		width: 435upx;
		height: 435upx;
	}

	.miniLiveImg {
		width: 228upx;
		height: 435upx;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
	}

	.miniImg {
		width: 228upx;
		height: 215upx;
	}

	// 用来使页面显示完全
	.liveBottom {
		width: 710upx;
		height: 60upx;
	}

	// 固定直播按钮
	.fixedBtn {
		width: 100upx;
		height: 100upx;
		position: fixed !important;
		bottom: 100upx !important;
		right: 50upx !important;
		border-radius: 50upx;
		z-index: 100;
		background-color: rgba(84, 226, 200, 0.5);
	}

	.goLive {
		width: 100upx;
		height: 100upx;
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		line-height: 100upx;
		color: #fff;
		font-size: 20upx;
		text-align: center;
	}
</style>

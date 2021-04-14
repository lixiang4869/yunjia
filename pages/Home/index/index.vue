<template>
	<!-- 逛街页面 -->
	<view class="all">
		<!--  -->
		<view class="titleTxtBox">

			<text style="color: #FFFFFF;font-size: 38upx;font-weight: 700;height:80rpx;width: 100%;text-align: center;line-height: 80rpx;">智慧云家</text>

			<view class="header-noe">
				<view style="display: flex;flex-direction: column;margin-left: 20rpx;">
					<text class="biaoti-one" @click="goLocation">{{addressName}}</text>
					<text class="biaoti-one" v-if="weather">{{weather.wea}} {{weather.tem}}℃</text>
				</view>

				<image src="../../../static/home/down.png" style="width: 18rpx;height: 11rpx;margin-left: 20rpx;"></image>
				<view class="header-two" @click="goSearch()">
					<image src="../../../static/home/sousuo.png" class="search"></image>
					<swiper vertical="true" autoplay="true" style="width: 200rpx;height: 60rpx;">
						<swiper-item v-for="(item,index) in searchHits " :key="index">
							<text class="search-text">{{item}}</text>
						</swiper-item>
					</swiper>



				</view>
				<image @click="call" src="../../../static/public/kf.png" style="width: 42rpx;height: 42rpx; margin-right: 40rpx;"></image>
			</view>

		</view>
		<!-- 	<view class="titleTxtBox2">
		
			<text style="color: #FFFFFF;font-size: 38upx;font-weight: 700;height:80rpx;width: 100%;text-align: center;line-height: 80rpx;">智慧云家</text>
		
			<view class="header-noe">
				<view style="display: flex;flex-direction: column;margin-left: 20rpx;">
					<text class="biaoti-one" @click="goLocation">{{addressName}}</text>
					<text class="biaoti-one" v-if="weather">{{weather.wea}} {{weather.tem}}℃</text>
				</view>
		
				<image src="../../../static/home/down.png" style="width: 18rpx;height: 11rpx;margin-left: 20rpx;"></image>
				<view class="header-two" @click="goSearch()">
					<image src="../../../static/home/sousuo.png" class="search"></image>
					<swiper vertical="true" autoplay="true" style="width: 200rpx;height: 60rpx;">
						<swiper-item v-for="(item,index) in searchHits " :key="index" >
							 <text class="search-text">{{item}}</text>
						</swiper-item>
					</swiper>
					
					
				
				</view>
				<image @click="call" src="../../../static/public/kf.png" style="width: 42rpx;height: 42rpx; margin-right: 40rpx;"></image>
			</view>
		
		</view> -->
		<!-- <view class="top">
			<view class="status_bar"></view>
			<text style="height:120rpx"></text>
		
			<text class="biaoti-two">热搜：风情酒吧 | 零食 | 麻辣烫 | 大盘鸡</text>
		<view class="lunbo">
			<swiper  circular="true" style="height: 286upx;border-radius: 10rpx; 	border-radius: 30rpx;overflow: hidden;transform: translateY(0);" :indicator-dots="false"
			 :autoplay="true" :interval="2000" :duration="500">
				<swiper-item v-for="(item,index) in swiperImg" :key="index" style="border-radius: 10rpx;">
					<image :src="url+item.img" mode="aspectFill" style="width: 100%; height: 100%; border-radius: 10rpx;"></image>
				</swiper-item>
			</swiper>
		</view>
		</view> -->
		<view style="padding-top: 220rpx;border-top: 46rpx;width: 100%;justify-content: center;background:  linear-gradient(135deg, #FF6178 0%, #FF502E 100%);">
			<view class="lunbo">
				<swiper circular="true" style="height: 286upx;border-radius: 10rpx; 	border-radius: 30rpx;overflow: hidden;transform: translateY(0);"
				 :indicator-dots="false" :autoplay="true" :interval="2000" :duration="500">
					<swiper-item v-for="(item,index) in swiperImg" :key="index" style="border-radius: 10rpx;">
						<image :src="url+item.img" mode="aspectFill" style="width: 100%; height: 100%; border-radius: 10rpx;"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- <cg-swiper style="width: 100%;" :swiperList="swiperList" @clickItem="clickItem"></cg-swiper> -->
		<QSGrids style="width: 100%;background: #ffffff;" iconWidth="88rpx" iconHeight="77rpx" ref="QSGrids" mode="swiper" indicatorDots
		 indicatorDotsHieght="20" @gridClick="gridClick"></QSGrids>
		<!-- 	中间icon区域  易货、团购、美食、外卖等
		<view class="icon-all">
			<view v-for="(value, index) in icon" :key="index" class="icon1" @tap="shopDetalis(value.id)">
				<view>
					<image :src="url+value.img"></image>
				</view>
				<view class="icon_text">{{ value.name }}</view>
			</view>
		</view> -->

		<!-- 红包图片区 -->
		<view class="redPack">
			<image :src="guanggaoImg==null?'': url+guanggaoImg" mode="widthFix"></image>
		</view>
		<!-- 商家列表 -->
		<view class="shopList">

			<view class="titless">
				<view @click="select(0)" class="t">

					<view :class="[i==0?'selectTitle':'unSelectTitle']">附近商家</view>
					<image :class="[i==0?'showImg':'unshowImg']" src="../../../static/home/xia.png" style="width: 40rpx;height: 10rpx;margin-top: 13rpx;"></image>

				</view>
				<!-- <view @click="select(1)" class="t">
					<view :class="[i==1?'selectTitle':'unSelectTitle']">发现好菜</view>
					<image :class="[i==1?'showImg':'unshowImg']" src="../../../static/home/xia.png" style="width: 40rpx;height: 10rpx;margin-top: 13rpx;"></image>
				</view> -->
			</view>
			<!-- 综合排序 销量 距离 好评 -->
			<view class="titless" style="margin-top: 30rpx;">
				<view v-for="(item, index) in contrast" :key="index" @click="sort(index)" :class="[sort1==index?'select':'unselect']">
					<text>{{item.name}}</text>
					<!-- <view class="xiahuaxian" v-if=" sort1 == index"></view> -->
				</view>
			</view>
			<view style="padding: 30rpx;">
				<wfalls-flow :list="shops" ref="wfalls" @finishLoad="getLoadNum" @itemclick="merchantStore"></wfalls-flow>
				<!-- <waterfall-flow :list="shops" @click="merchantStore" ></waterfall-flow> -->
			</view>





			<!-- 	<view class="loading">
			  
			    {{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
			</view> -->
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="che" v-if="isshow">
			<image :src="url+hb" mode="" @click="mapa"></image>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view class="che">
			<image :src="url+hb" mode="" @click="mapa"></image>
		</view>
		<!-- #endif -->


	</view>
</template>

<script>
	var util = require('../../../common/util.js');
	var formatLocation = util.formatLocation;
	import request from '../../../store/http.js';
	import aa from './index.js'
	import wfallsFlow from '@/components/wfalls-flow/wfalls-flow'
	import QSGrids from '@/components/QS-Grids/QS-Grids.vue'
	import amap from '../../../common/amap-wx.js';
	var bitmap = null;
	export default {
		components: {
			QSGrids,
			wfallsFlow
		},
		data() {
			return {
				broadcastStyle: {
					speed: 30, //每秒30px
					font_size: "32", //字体大小(rpx)
					text_color: "#333", //字体颜色
					back_color: "red", //背景色
				},

				isshow: false,
				url: this.$store.state.url,
				hb: '/uploads/static/home/hb.gif',
				amapPlugin: null,
				key: '980c4a9d17bc9c06a85d488adaac1f09',
				addressName: '',
				i: 0,
				weather: null,
				searchHits: [],
				searchText: '',
				number: 0,
				isNewRenderDone: false
			}
		},

		mixins: [aa],
		onShow() {
			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			if (icon) {
				setTimeout(function() {
					icon.show();
				}, 100)
			}
			// #endif
			this.isshow = uni.getStorageSync("isshowhongbao", true);
		},

		onLoad() {


			uni.showLoading({

			})
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
			this.getLocation();
			// this.getLabels();
		},
		onReady() {
			this.getLabels();
		},
		methods: {
			call() {
				uni.makePhoneCall({
					phoneNumber: '400-0371189',
					success(res) {

					}
				})
			},
			// 获取天气
			getWeather() {
				request.urlRequest(
					this.url + '/api/index/tianqi', {
						city: this.addressName
					}, {}, 'POST',
					(res) => {
						if (res.data.code == 1)
							this.weather = res.data.data
					}
				)

			},

			// 获取逛街首页信息
			getLabels() {
				let _this = this;
				request.urlRequest(
					this.url + '/api/guangjie/index', {}, {}, 'POST',
					(res) => {

						this.swiperImg = res.data.data.banner //轮播图
						this.icon = res.data.data.type;
						for (let i = 0; i < this.icon.length; i++) {
							this.icon[i].text = this.icon[i].name;
							this.icon[i].img = this.url + this.icon[i].img;
						}

						// const grids = Array(15).fill('').map((item, index)=>{return { text: String(index), img: this.url+this.hb }});

						this.$refs.QSGrids.setData(this.icon)

						this.guanggaoImg = res.data.data.guanggao[0].img;
						this.searchHits = res.data.data.keyword

						// console.log("swiper:",this.swiperImg,"icon:",this.icon);
					}
				)

			},
			getLoadNum(num) {
				console.log('共加载了:' + num);
				!this.isNewRenderDone && uni.hideLoading()
				this.isNewRenderDone = true
			},
			gridClick(index) {
				if (this.icon[index].name == "外卖") {
					uni.navigateTo({
						url: "../category/waimai"
					})
				} else
					uni.navigateTo({
						url: "/pages/Home/category/list?id=" + this.icon[index].id
					})
			},
			mapa() {

				uni.navigateTo({
					url: '/redpage/umap/umap'
				})
			},
			select(index) {
				this.i = index;
			},
			goSearch() {
				uni.navigateTo({
					url: '../searchPage/searchPage'
				})
			},
			goLocation() {
				uni.chooseLocation({
					success: (res) => {
						var location = formatLocation(res.longitude, res.latitude);
						uni.setStorageSync('location', location);
						this.addressName = res.address;
						uni.setStorageSync('addressName', this.addressName)
						this.OneGetShops();

					}
				})

			},
			OneGetShops() {
				this.location = uni.getStorageSync('location'); //从缓存中取出经纬度
				request.urlRequest(
					this.url + '/api/guangjie/indexshop', {
						lng: this.location.longitude,
						lat: this.location.latitude,
						page: 1,
						type: this.type

					}, {},
					'POST',
					(res) => {
						if (this.currentpage < res.data.data.pageTotal) {
							this.loadingType = 0
						} else this.loadingType = 2
						this.shops = res.data.data.items;
						this.$refs.wfalls.init();
						// setTimeout(()=>{
						//     this.$refs.wfalls.handleViewRender(0,0);
						// },0)

					}
				)

			},
			getLocation() {
				let _this = this;
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success(res) {
						console.log("=333===", res);
						let location = {
							longitude: res.longitude,
							latitude: res.latitude
						};

						_this.amapPlugin.getRegeo({
							location: '' + location.longitude + ',' + location.latitude + '',
							success: (data) => {

								_this.addressName = data[0].regeocodeData.addressComponent.city;

								if (_this.addressName.search("市") != -1) {

									_this.addressName = _this.addressName.replace("市", "")
								}
								uni.setStorageSync('addressName', _this.addressName)
								_this.getWeather();
							},
							fail: (data) => {

							}
						});
						uni.setStorageSync('location', location);
						_this.OneGetShops();


					},
					fail(e) {
						console.log("====44", e);
					}
				});

				uni.hideLoading();
			},

		}
	}
</script>

<style lang="less">
	@import './index.less';

	page {
		height: 100%;
		background-color: #f4f4f4;
	}

	.slide-enter-active,
	.slide-leave-active {
		transition: all 0.5s linear;
	}

	.slide-leave-to {
		transform: translateY(-20px);
	}

	.slide-enter {
		transform: translateY(20px);
	}

	.t {
		display: flex;

		margin-right: 50rpx;


		align-items: center;
		justify-content: center;
		flex-direction: column;

	}

	.select {
		display: flex;
		height: 53rpx;
		margin-right: 20rpx;
		width: 160rpx;
		border-radius: 10rpx;
		background: #ff2b10;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		text {
			font-size: 26rpx;
			color: #ffffff;
		}
	}

	.unselect {
		display: flex;
		height: 53rpx;
		margin-right: 20rpx;
		width: 160rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		text {
			font-size: 26rpx;
			color: #999999;
		}
	}

	.showImg {
		width: 40rpx;
		height: 10rpx;
		margin-top: 13rpx;
		opacity: 1;
	}

	.unshowImg {
		width: 40rpx;
		height: 10rpx;
		margin-top: 13rpx;
		opacity: 0;
	}

	.selectTitle {
		font-size: 36rpx;
		font-weight: 600;
		color: #333333;
	}

	.unSelectTitle {
		font-size: 36rpx;
		font-weight: 600;
		color: #999999;
	}

	.che {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;


		position: fixed;
		right: 40upx;
		bottom: 148upx;
		z-index: 999;

		>image {
			width: 120upx;
			height: 120upx;

		}
	}

	* {
		padding: 0;
		margin: 0;
	}

	.xiahuaxian {
		margin-top: 5upx;
		height: 5upx;
		width: 45upx;
		background: #FF773D;
	}
</style>

<template>
	<view class="content">

		<!-- 头部 -->
		<view class="titleTxtBox">
			<view style="height:80rpx;width: 100%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
				<view style="width: 50rpx;height: 50rpx;margin-left: 20rpx;" @click="backPage">
					<image style="width: 19rpx;height: 34rpx;" src="../../../static/public/goBack.png"></image>
				</view>
				<view style="width:300rpx;align-items: center;justify-content: center;display: flex;">
					<image src="../../../static/public/dingwei.png" mode="" style="width: 50rpx;height:50rpx;"></image>
					<text class="t1">{{addressName}}</text>
				</view>
				<view style="width: 70rpx;"></view>
			</view>

			<view class="headerFoot">
				
				<view class="header-two" @click="goSearch()">
					<image src="../../../static/home/sousuo.png" class="search"></image>
					<swiper vertical="true" autoplay="true" style="width: 200rpx;height: 60rpx;">
						<swiper-item v-for="(item,index) in searchHits " :key="index">
							<text class="search-text">{{item}}</text>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	
		<view style="width: 100%;margin: 20rpx;width: calc(100% - 40rpx);margin-top: 250rpx;">
			<swiper style="height:250upx;	border-radius: 10rpx;" circular="true" :autoplay="true" :interval="2000" :duration="500">
				<swiper-item v-for="(item,index) in swiperImg" :key="index" style="border-radius: 10rpx;">
					<image :src="url+item.image" mode="widthFix" class="imgs"></image>
				</swiper-item>
			</swiper>
			<!-- 	<image src="../../../static/tab/tu.png" class="imgs"></image> -->
		</view>
		<view class="footthree">
			<view class="three" v-for="(item,index) in list" :key="index" @click="goList(item.id)">
				<image :src="url+item.logo" mode="" style="width: 95rpx;height: 95rpx;"></image>
				<text class="threetext">{{item.name}}</text>
			</view>

		</view>
		<view class="paceHeader">
			<view class="paceOne" @click="xuanze(0)">
				<text :class="[xuan==0?'selectTitle':'unSelectTitle']">附近商家</text>
				<image src="../../../static/home/xia.png" mode="" :class="[xuan==0?'showImg':'unshowImg']"></image>
			</view>
			<view class="pacetoo" @click="xuanze(1)">
				<text :class="[xuan==1?'selectTitle':'unSelectTitle']">发现好菜</text>
				<image src="../../../static/home/xia.png" mode="" :class="[xuan==1?'showImg':'unshowImg']"></image>
			</view>
		</view>
		<view class="sticky-box">
			<view class="paceboxone" @click="paione(index)" v-for="(ite,index) in pace" :key="index">
				<text :class="pai==index?'too':'one'">{{ite.name}}</text>
				<image src="../../../static/my/xia.png" mode="" style="width: 18rpx;height: 12rpx;padding-left: 5rpx;"></image>
			</view>
		</view>

		<!-- 脚步 -->
		<view class="goods-list" v-if="xuan==0">
			<view v-for="(item, index) in shopList" :key="index" class="goods-item" @click="iconon(item.shopid)">
				<view class="image-wrapper">
					<image :src="url+item.logo" mode="aspectFill"></image>
				</view>
				<view class="shop">
					<text class="titles">{{item.name}}</text>
					<view style="width: 100%; display: flex;flex-direction: row;align-items: center;margin-bottom: 20rpx;">
						<image src="../../../static/my/xinxin.png" style="width: 30rpx;height: 30rpx;"></image>
						<view style="font-size: 25upx;color:#f72926;margin-left: 20rpx;">{{item.star}}</view>
					</view>
					<text class="price-box">{{item.describe}}</text>

					<view class="price-box">
						<text>月售 {{item.sell}}</text>
						<text>{{item.getDistance}}</text>

					</view>
				</view>
			</view>
		</view>

		<view class="pacefoot" v-if="xuan==1">

			<view class="pacefootbox" v-for="(item,i) in goodsList" :key="i" @click="iconon(item.shopid)">
				<view class="pacea">
					<image :src="url+item.img" mode="" style="width: 100%;height: 300rpx;"></image>
				</view>
				<view class="paceb">
					<text>{{item.name}}</text>
				</view>
				<view class="pacec">
					<text>月售 {{item.salesnum}}</text>
					<!-- <view class="">
						<text style="font-size: 28rpx;color: #ffffff;background-color:#fe1722; width: 50rpx;height: 50rpx;">返</text>
						<text style="font-size: 28rpx;font-weight: normal;font-stretch: normal;letter-spacing: 0px;color: #333333;">￥{{item.fan}}</text>
					</view> -->
				</view>
				<view class="pacefa" style="padding-left: 20rpx;padding-top: 10rpx;">
					<text style="font-size: 30rpx;font-weight: bold;font-stretch: normal;letter-spacing: 0px;color: #fe1722;">￥{{item.price}}</text>
					<!-- <text style="font-size: 28rpx;font-weight: normal;font-stretch: normal;letter-spacing: 0px;color: #999999;text-decoration: line-through;padding-left: 10rpx;">￥{{item.newjiage}}</text> -->
				</view>
				<view class="pacefan">
					<image :src="url+item.logo" mode="" style="width: 50rpx;height: 50rpx;"></image>
					<view class="fan">
						<text style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{item.shop_name}}</text>
						<view class="fanone">
							<image src="../../../static/my/xinxin.png" mode="" style="width: 20rpx;height: 20rpx;"></image>
							<text style="padding-left: 10rpx;">{{item.star}}</text>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	var util = require('../../../common/util.js');
	var formatLocation = util.formatLocation;
	import request from '../../../store/http.js';
	import amap from '../../../common/amap-wx.js';
	export default {
		data() {
			return {
				url: this.$store.state.url,
				searchHits: ["大盘鸡"],
				pai: 0,
				xuan: 0,
				width: '',
				height: '',
				amapPlugin: null,
				key: '980c4a9d17bc9c06a85d488adaac1f09',
				addressName: "",
				swiperImg: [],
				list: [

				],
				pace: [{
					name: '综合排序'
				}, {
					name: '评分'
				}, {
					name: '销量'
				}, {
					name: '距离'
				}],
				shopList: [],
				goodsList: []
			}
		},
		onLoad() {
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
			this.getCate();
			this.getAD();
			this.getLocation();
			let {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.width = windowWidth;
			this.height = windowHeight;
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
			backPage(){
				uni.navigateBack({
					
				})
			},
			getLocation() {
				let _this = this;
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success(res) {

						let location = {
							longitude: res.longitude,
							latitude: res.latitude
						};

						_this.amapPlugin.getRegeo({
							location: '' + location.longitude + ',' + location.latitude + '',
							success: (data) => {

								_this.addressName = data[0].name;



							},
							fail: (data) => {

							}
						});
						uni.setStorageSync('location', location);
						_this.getNearShop();


					},
					fail(e) {
						console.log("====44", e);
					}
				});

				uni.hideLoading();
			},
			getCate() {
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/wmzxyj/getCategory', {
						accessToken: authtoken
					}, {},
					'POST',
					(res) => {
						this.list = res.data.data;
					}
				)

			},
			getAD() {
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/wmzxyj/getAd', {
						accessToken: authtoken
					}, {},
					'POST',
					(res) => {
						this.swiperImg = res.data.data;
					}
				)

			},
			getNearShop() {
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/wmzxyj/nearShopList', {
						accessToken: authtoken,
						order: this.pai,
						pageno: this.page
					}, {},
					'POST',
					(res) => {
						this.shopList = res.data.data.data;
					}
				)

			},
			getGoods() {
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/wmzxyj/findFoodList', {
						accessToken: authtoken,
						order: this.pai,
						pageno: this.page
					}, {},
					'POST',
					(res) => {
						this.goodsList = res.data.data.data;
					}
				)

			},
			goList(id) {
				uni.navigateTo({
					url: "./list1?id=" + id
				})
			},
			// 返回
			fanhui() {
				uni.navigateBack({
					delte: 1
				})
			},
			// 附近商家
			iconon(id) {
				uni.navigateTo({
					url: "./dian?id=" + id
				})
			},
			paione(i) {

				this.pai = i;
				if (this.xuan == 1)
					this.getGoods();
				else this.getNearShop();
			},
			xuanze(index) {
				this.xuan = index
				if (index == 0) {
					this.getNearShop();
				} else {
					this.getGoods();
				}
			},
			more() {
				uni.navigateTo({

					url: '../storDetails/storeDetails?goodsId=' + id + '&shopid=' + this.shopId,
					fail(e) {
						console.log(e)
					}

				})
				uni.showToast({
					title: '更多',
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.t1 {
		font-size: 30rpx;
		font-weight: bold;
		letter-spacing: 0px;
		color: #ffffff;
		padding-left: 10rpx;
		flex: 1;
		display: inline-block;
	
		height: 42upx;
		
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		// display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1;
	}

	.header-noe {
		padding-bottom: 20rpx;
		width: 100%;
		flex-direction: row;
		display: flex;
		justify-content: left;
		align-items: center;


	}

	.titleTxtBox {
		width: 100%;
		
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		flex-direction: column;
		position: fixed;
		padding-top: var(--status-bar-height);
		align-items: center;
		background: linear-gradient(135deg, #FF6178 0%, #FF502E 100%);
		// background: #007AFF;
	}

	/* 商品列表 */
	.goods-list {
		display: flex;
		flex-wrap: wrap;


		.goods-item {
			margin-left: 24rpx;
			margin-right: 24rpx;
			margin-top: 10rpx;
			background: #ffffff;
			display: flex;
			flex-direction: row;
			width: 100%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {}
		}

		.image-wrapper {
			margin-left: 20upx;
			margin-top: 20upx;
			width: 180upx;
			height: 140upx;
			border-radius: 10rpx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.shop {
			width: 100%;
			margin-left: 20upx;
			margin-right: 20upx;
		}

		.titles {
			font-size: 32upx;
			color: #333333;
			font-weight: 600;
			line-height: 80upx;
		}

		.price-box {
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: space-between;

			font-size: 25upx;

			color: #666666;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;

			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}
	}

	.sticky-box {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		position: -webkit-sticky;
		/* #endif */
		position: sticky;
		top: 230rpx;
		z-index: 99;
		flex-direction: row;
		margin: 0px;
		width: 100%;
		justify-content: space-around;
		padding: 15px 0 15px 0;
		background-color: #F4F5F6;
		// border-bottom-style: solid;
		// border-bottom-color: #E2E2E2;
	}

	.imgs {
		width: 100%;
		height: 250rpx;
		border-radius: 10rpx;
	}

	.search {


		width: 28upx;
		height: 28upx;
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

	.header-two {
		flex: 1;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 25rpx;
		margin-left: 25upx;
		padding-left: 20upx;
		height: 60upx;
		flex-direction: row;
		display: flex;
		border-radius: 30rpx;
		justify-content: left;
		align-items: center;
		border: 1px solid #FF502E;

	}

	.search-text {
		margin-left: 20upx;
		font-size: 28upx;
		font-family: PingFangSC-Medium, PingFang SC;
		color: #97A3B2;

	}


	.content {
		width: 100%;
		align-items: center;
		display: flex;
		flex-direction: column;
		background-color: #f3f3f3;
	}



	.headerFoot {
		width: 100%;
		margin-top: 14rpx;
		background: #ffffff;
		height: 80rpx;
		border-top-left-radius:36rpx ;
		border-top-right-radius: 36rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}



	.footone {
		width: 100%;
		display: flex;
		justify-content: center;

		flex-direction: column;
		align-items: center;


	}


	.footto {
		padding-top: 30rpx;
		display: flex;
		width: 100%;
		justify-content: center;
	}

	.footthree {
		// margin: 30rpx;

		flex-wrap: wrap;
		display: flex;
		width: 100%;
		justify-content: space-around;
	}

	.threetext {
		padding-top: 20rpx;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0px;
		color: #333333;
	}

	.three {
		// padding:30rpx;
		width: 20%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.lunch {
		padding-top: 40rpx;
		width: 100%;
		// position: absolute;	
		display: flex;
		justify-content: space-between;
	}

	.luncheader {
		padding-right: 30rpx;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0px;
		color: #999999;
	}

	.Exhibition {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;

		.Exhibitiono_box {
			padding-top: 20rpx;
			justify-content: center;
			align-items: center;
			width: 50%;
			display: flex;
			flex-direction: column;

			text {
				padding-top: 10rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

		}
	}




	.paceHeader {
		margin-top: 30rpx;
		display: flex;
		padding-left: 30rpx;
		width: 100%;

		.pacetoo {
			padding-left: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.paceOne {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}


	.pacebox {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;

		.paceboxone {
			padding-left: 30rpx;
			padding-right: 30rpx;
		}
	}

	.one {
		font-size: 35rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0px;
		color: #999999;
	}

	.too {
		font-size: 35rpx;
		font-weight: bold;
		font-stretch: normal;
		letter-spacing: 0px;
		color: #333333;
	}

	.pacefoot {
		background-color: #f3f3f3;
		display: flex;
		justify-content: center;

		// align-items: center;
		flex-wrap: wrap;
	}

	.pacefootbox {
		margin-bottom: 30rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
		width: 45%;
		height: 572rpx;
		background-color: #ffffff;
		box-shadow: -1rpx -1rpx 9rpx 0px rgba(0, 0, 0, 0.04);
		border-radius: 20rpx;

		.paceb {
			padding-left: 20rpx;
			padding-top: 10rpx;
			width: 295rpx;
			height: 50rpx;
			font-family: SourceHanSansCN-Regular;
			font-size: 30rpx;
			font-weight: bold;
			font-stretch: normal;
			line-height: 21rpx;
			color: #333333;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.pacec {
			padding-left: 20rpx;
			font-size: 28rpx;
			padding-top: 10rpx;
			// letter-spacing: -3px;
			color: #666666;
			display: flex;
			justify-content: space-between;
		}

		.pacefan {
			padding-left: 20rpx;
			padding-top: 20rpx;
			font-size: 28rpx;
			display: flex;

			.fan {
				padding-left: 20rpx;
				width: 250rpx;
				display: flex;
				flex-direction: column;

				.fanone {
					font-size: 25rpx;
					color: #fe1722;
				}
			}
		}
	}
</style>

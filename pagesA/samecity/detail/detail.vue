<template>
	<view class="app">
		<view class="swiper" v-if="shopDetails.goods != 0">
			<image :src='shopDetails.goods[goodsIndex].image'></image>
		</view>
		<!-- 区域滚动 -->
		<view class="header" v-if="shopDetails.goods != 0">
			<view class="header_service">
				<p class="title">{{shopDetails.name}}</p>
				<scroll-view scroll-x="true" class="tabs">
					<view class='tab' :class="[index == goodsIndex ? 'active': ''  ]" v-for="(item, index) in shopDetails.goods" :key="item.id" @click="goods_change(index)">
						<text>{{item.name}}</text>
						<text>￥{{item.price}}/次起</text>
						<image src="../../../static/samecity/duihao.png"  v-show="index==goodsIndex"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 到家 -->
		<view class="com_padd">
			<view class="home_head">
				<view class="home_head_l">
					<text>到家保障</text>
					<text>线上预约,平台监管</text>
				</view>
				<view class="fenxiang" v-if="shopDetails.image_url && shopDetails.name">
						<text style="font-size:24rpx;margin-bottom: 5rpx">分享</text>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="share" class="btnshare"></button>
								
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
					<image src="../../../static/xiangqing/fen.png" style="width:45rpx ;height: 50rpx; padding-left: 10rpx; background-color: #fff;" mode="widthFix" @click="share"></image>
					<!-- #endif -->
				
				</view>
			</view>
			<view class="home_body">
				<view  v-for="(value, index) in icons" :key="index" >
					<image :src="value.img"></image>
					<text>{{value.name}}</text>
				</view>
			</view>
		</view>
		<view class="cross_line">
		</view>
		<!-- 收费模块  -->
		<view class="com_padd price_mode">
			<view class="home_head">
				<view class="home_head_l">
					<text>收费标准</text>
					<text>乱收费退差价</text>
				</view>
			</view>
			<block v-for="(item, index) in priceImage" :key="index">
				<image :src="item" mode="widthFix"></image>
			</block>
		</view>
		<!-- 费用说明 -->
		<!-- <view class="charge_state com_padd">
			<view class="charge_state_title">
				费用说明
			</view>
			<image :src="priceState" v-if="priceState"></image>
			<image :src='serviceImage' v-if="serviceImage"></image>
			
		</view> -->
		<view class="phone">
			<view class = "phone_c" @click="phone">
				预约电话
			</view>
		</view>
				
	</view>
</template> 

<script>
	import request from "../../../store/http.js"
	export default {
		data() {
			return {
				cityUrl:this.$store.state.cityUrl,
				id:'',
				shopDetails: {},
				goodsIndex: 0,
				priceImage: [],
				tel: '',
				icons: [{
						img: "https://xin.yiyunoto.com/uploads/static/samecity/shixiao.png",
						name: "时效保障"
					},
					{
						img: "https://xin.yiyunoto.com/uploads/static/samecity/biaojia.png",
						name: "明码标价"
					},
					{
						img: "https://xin.yiyunoto.com/uploads/static/samecity/zibao.png",
						name: "质保返修"
					},
					{
						img: "https://xin.yiyunoto.com/uploads/static/samecity/shouhou.png",
						name: "售后回访"
					}
				],
		
		
			}	
		},
		onLoad(options) {
			this.id = options.id
			// console.log(options.id)
			// 店铺行业列表
			this.getShopDetail()
			
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
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			var authtoken = uni.getStorageSync("authtoken")
			if (!authtoken) {
				uni.navigateTo({
					
					url: '/pages/My/Login-registration/Login-registration'
				})
				return false
			} else {
				var l = uni.getStorageSync("uid")
			
				return {
					title: this.shopDetails.name,
					
					path: '/pagesA/samecity/detail/detail?id=' + this.id
				}
			}
		},
		methods: {
			//分享
			share() {
				var authtoken = uni.getStorageSync("authtoken")
				if (!authtoken) {
					uni.navigateTo({
						url: "/pages/My/Login-registration/Login-registration"
					})
			
				} else {
					console.log(123)
					var l = uni.getStorageSync("uid");
			
					// this.$refs.share.toggleMask();
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 5,
						title: this.shopDetails.name,
						imageUrl: this.shopDetails.image_url,
						miniProgram: {
							id: 'gh_c509165ecab3',
							path: '/pagesA/samecity/detail/detail?id=' + this.id,
							webUrl: 'https://www.yiyunoto.com',
							type: 0,
						},
						summary: this.shareTitle,
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				}
			},
			goods_change(i) {
				this.goodsIndex = i
				
				// console.log(i)
			},
			phone() {
				request.urlRequest(this.cityUrl + '/api/shop/saveStatis', {shop_id: this.id},{},'POST', res => {
					console.log(res)
					if(res.data.code == 10000) {
						console.log(this.tel)
						uni.makePhoneCall({
						    phoneNumber: this.tel,
							// 成功回调
							success: (res) => {
								console.log('调用成功!')
							},
							// 失败回调
							fail: (err) => {
								console.log('调用失败!')
							}
						})
					}
				})
			},
			getShopDetail() {
				uni.showLoading({
					title: '加载中'
				});
				request.urlRequest(this.cityUrl + '/api/shop/shopDetail', {shop_id: this.id},{},'POST', res => {
					console.log(res)
					uni.hideLoading();
					if(res.data.code == 10000) {
						this.shopDetails = res.data.data
						this.tel = res.data.data.tel
							
						if(res.data.data.shop_detail) {
							var data = res.data.data.shop_detail.charge_standard_images
							this.priceImage = data.split(',')
						}
						
					}
				})
			}
		},
		
	}
</script>

<style lang="less">
	view {
		box-sizing: border-box;
	}
	image {
		background-color: #eee;
	}
	.com_padd {
		padding: 0rpx 20rpx;
		background-color: #fff;
	}
	.swiper image {
		width: 750rpx; 
		height: 480rpx;
		// vertical-align: middle;
	}
	.header {
		position: relative;
		width: 750rpx;
		height: 233rpx;	
		background-color: #f5f5f4;
	}
	.header_service {
		position: absolute;
		left: 20rpx;
		bottom: 24rpx;
		width: 710rpx;
		height: 308rpx;
		padding: 22rpx 0 22rpx 22rpx;
		background-color: #ffffff;
		border-radius: 22rpx;
		overflow: hidden;
	}
	.title {
		font-size: 36rpx;
		font-weight: 900;
		color: #333;
		margin: 22rpx 0;
	}
	.header_service .tabs {
		white-space: nowrap;
		width: 100%;
	}
	.tab {
		display: inline-block;
		position: relative;
		width: 250rpx;
		height: 150rpx;
		padding: 22rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
		overflow: hidden;
		border: 1px solid #fff;
	}
	.tabs .active {
		border: 1px solid #FF2B10;
	}
	.tab image {
		position: absolute;
		width: 44rpx;
		height: 35rpx;
		right: -4rpx;
		bottom: 0;
		background-color: #fff;
	}
	.tabs .tab text:first-of-type {
		display: block;
		margin-bottom: 15rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
	}
	.tabs .tab text:last-of-type {
		display: block;
		font-size: 30rpx;
		font-weight: bold;
		color: #ff2b10;
		margin-bottom: 15rpx;
	}
	
	.home_head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding: 40rpx 0;
		.fenxiang {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.btnshare {
				width: 45rpx;
				height: 50rpx;
				background-image: url(../../../static/xiangqing/fen.png);
				background-position: center;
				background-size: contain;
				background-repeat: no-repeat;
				background-color: #fff;
				padding-left: 10rpx;
				plain: true;
				outline: none;
				border: none;
			}
		}
	}
	.home_head_l text:first-child {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
		margin-right: 20rpx;
	}
	.home_head_l text:last-child {
		font-size: 24rpx;
		font-weight: 700;
		color: #999;
	}
	
	
	.home_body {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 20rpx; 
	}
	.home_body view {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.home_body view image {
		width: 96rpx;
		height: 96rpx;
		margin-bottom: 10rpx;
		border-radius: 50%;
		border: 1px solid #ccc;
	}
	.home_body view text {
		font-size: 28rpx;
		color: #666666;
	}
	.cross_line {
		width: 100%;
		height: 20rpx;
		background-color: #f3f3f3;
	}
	.charge {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
	}
	.price_mode {
		margin-bottom: 130rpx;
	}
	.price_mode image {
		width: 100%;
		background-color: #C0C0C0;
	}
	// .charge_state {
	// 	padding-bottom: 130rpx;
	// }
	// .charge_state>image {
	// 	width: 100%;
	// }
	
	// .charge_state_title {
	// 	font-size: 36rpx;
	// 	font-weight: bold;
	// 	color: #333333;
	// 	padding: 20rpx 0;
	// }
	.phone {
		position: fixed;
		left: 0rpx;
		bottom: 0rpx;
		width: 750rpx;
		height: 130rpx;
		padding: 20rpx;
		background-color: #fff;
		z-index: 9;
	}
	.phone_c {
		width: 100%;
		height: 100%;
		text-align: center;
		line-height: 90rpx;
		background-color: #e6454a;
		border-radius: 13rpx;
		color: #fff;
	}
	
</style>
           
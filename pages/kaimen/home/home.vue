<template>
	<view class="home" :style="{ height: height }">
		<!-- 首页 -->
		<!-- 状态栏 -->

		<!-- 顶部导航栏 -->
		<view class="header">

			<Status></Status>

			<view class="header-box">
				<image class="img1" src="https://xin.yiyunoto.com/uploads/static/img/home/dingwei.png"></image>
				<view class="addr">{{addressName}}</view>
				<!-- <image class="img2" src="https://xin.yiyunoto.com/uploads/static/img/home/goto.png"></image> -->
			</view>
			
			<!-- <view class="tabBar_box">
				<scroll-view class="TabBar" scroll-x="true" :scroll-into-view="topBarindex" :scroll-with-animation="true">

					<view class="grid" v-for="(item,index) in navbarList " :key="index" @tap="showType(index)">
						<view class="text" :class="[index == tabbarIndex ? 'on' : '']">{{item.name}}</view>
					</view>

				</scroll-view>

			</view> -->
		</view>
		<view style="flex: 1;display: flex;">
		<scroll-view class="section" scroll-y="true" scroll-with-animation @scrolltolower="getData()" >
			<view class="search">
				<view class="soso">
					
						<image src="https://xin.yiyunoto.com/uploads/static/open/home/search.png"></image>
						<input type="search" v-model="searchVal" placeholder="搜索商家服务" />
					
				</view>
				
			</view>
			<!-- 轮播图区域 -->
			<view class="index_swiper">

				<swiper class="swiper_box" :indicator-dots="false" :autoplay="false" :interval="3000" :duration="500" :circular="true">
					<swiper-item v-for="(item,index) in home_banner" :key="index">
						<view class="swiper-item"  @click="gologin">
							<image :src="item" mode="" style="border-radius: 20rpx;"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<QSGrids style="width: 100%;" iconWidth="88rpx" iconHeight="77rpx" ref="QSGrids" mode="swiper" indicatorDots
			 indicatorDotsHieght="20" @gridClick="gridClick"></QSGrids>
			<!-- 推荐 -->
			<view class="tuijian">
				<view class="toutiao">
					<view class="left">
						<view class="tou">头条</view>
						<view class="tui">推荐</view>
						<view class="red"></view>
					</view>
					<view class="con">生鲜配送今日打折半价促销</view>
					<image src="https://xin.yiyunoto.com/uploads/static/img/home/go.png"></image>
				</view>
			</view>
			<view class="openProperty" v-if="isshow">
				<view class="property">
					<view class="menjin" @tap="toAccess(1)">
						<image src="https://xin.yiyunoto.com/uploads/static/img/home/menjin.png"></image>
					</view>
					<view class="wuye">
						<view class="xiaoqu">
							<view class="renlian" @click="toRenLianPage">
								<image src="https://xin.yiyunoto.com/uploads/static/img/home/renlian.png"></image>
							</view>
							<view class="dianti" @click="goYaoQing">
								<image src="https://xin.yiyunoto.com/uploads/static/img/home/dianti.png"></image>
							</view>
						</view>
						<view class="other">
							<view class="parking" @tap="toAccess(2)">
								<image src="https://xin.yiyunoto.com/uploads/static/img/home/parking.png"></image>
							</view>
							<view class="more" @click="toCD">
								<image src="https://xin.yiyunoto.com/uploads/static/img/home/more.png"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<image src="https://xin.yiyunoto.com/uploads/static/kaimen/tj.jpg" @click="goTiJian" style="width: 94%;margin: 20rpx;" mode="widthFix"></image>

			<!-- banner图区域 -->
			<view class="tcbanner">
				<image src="https://xin.yiyunoto.com/uploads/static/kaimen/tcfw.png" mode="widthFix"></image>
				<view class="tcbanner_b">
					<view class="tcbanner_b_i">
						<text>云家签约</text>
						<text>标准定价 规范服务</text>
					</view>
					<view class="fenge">

					</view>
					<view class="tcbanner_b_i">
						<text>服务优选</text>
						<text>专业高效 信息服务</text>
					</view>
					<view class="fenge">

					</view>
					<view class="tcbanner_b_i">
						<text>平台监督</text>
						<text>24小时维权</text>

					</view>
				</view>
			</view>

			<!-- 推荐店铺区域 -->
			<view class="shop">

				<view class="shop_i" v-for="(item, index) in shopList" :key="index">
					<image :src="item.image_url" @click="goDetail(item.id)"></image>
					<image class="youxuan" src="https://xin.yiyunoto.com/uploads/static/kaimen/youxuan.png" mode="widthFix"></image>
					<view class="shop_i_t">
						{{item.name}}
					</view>
					<view class="shop_i_m">
						{{item.describe}}
					</view>
					<view class="shop_i_b">
						<text>服务范围 : {{item.scope}}</text>
						<text @click="goDetail(item.id)">进入门店</text>
					</view>
				</view>


			</view>

		</scroll-view>
		</view>
		<!-- <scroll-view class="section" scroll-y="true" scroll-with-animation  v-if="tabbarIndex>0">
		
		
		
			<view class="shop">
		
				<view class="shop_i" v-for="(item, index) in selectlist" :key="index">
					<image :src="item.image_url" @click="goDetail(item.id)"></image>
					<image class="youxuan" src="https://xin.yiyunoto.com/uploads/static/kaimen/youxuan.png" mode="widthFix"></image>
					<view class="shop_i_t">
						{{item.name}}
					</view>
					<view class="shop_i_m">
						{{item.describe}}
					</view>
					<view class="shop_i_b">
						<text>服务范围 : {{item.scope}}</text>
						<text @click="goDetail(item.id)">进入门店</text>
					</view>
				</view>
		
		
			</view>
		
		</scroll-view> -->
		
	</view>
</template>

<script>
	import QSGrids from '@/components/QS-Grids/QS-Grids.vue'
	import Status from '@/components/status/status.vue'
	import request from "../../../store/http.js"
	import amap from '../../../common/amap-wx.js';
	export default {
		data() {
			return {


				searchVal: '',
				current: 0,
				swiperCurrent: 0,
				home_banner: ['https://xin.yiyunoto.com/uploads/static/img/home/banner1.png'],
				
				comCurrentImg: 0,
				scrollImgList: 0,
				// imgLeftList:[],	

				navbarList: [],
				height:"",
				addressName: '',
				tabBarTop: "0px",
				topBarindex: 'i0',
				tabbarIndex: 0,
				cityUrl: this.$store.state.cityUrl,
				page: 1,
				loadingType: 0,
				selectlist:[],
				shopList: [],
				amapPlugin: null,
				key: '980c4a9d17bc9c06a85d488adaac1f09',
				isshow:false
			};
		},
		components: {
			Status,
			QSGrids
			// wfallsFlow
		},
		// created() {
		// this.isshow = uni.getStorageSync("isshowhongbao", true);
		
			
		// },
		
	
		methods: {
			showType(index){
				this.tabbarIndex = index;
				this.selectlist=[];
				this.selectlist = this.navbarList[this.tabbarIndex].shop 
			},
			goTiJian(){
				var authtoken = uni.getStorageSync("authtoken")
				if(!authtoken){
					uni.navigateTo({
						url:"../../My/Login-registration/Login-registration"
					})
					return
				}
				let phone = uni.getStorageSync("phone");
				if(!phone){
					uni.navigateTo({
						url:"../../My/Modify-phoneNumber/Modify-phoneNumbers"
					})
					return
				}
				uni.navigateTo({
					url:"./tijian?phone="+phone
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

								_this.addressName = data[0].regeocodeData.addressComponent.city+data[0].regeocodeData.addressComponent.district;

							},
							fail: (data) => {

							}
						});



					},
					fail(e) {
						console.log("====44", e);
					}
				});

				uni.hideLoading();
			},
			gologin() {
				var authtoken = uni.getStorageSync("authtoken")
				if(!authtoken){
					uni.navigateTo({
						url:"../../My/Login-registration/Login-registration"
					})
					return
				}
				// #ifdef APP-PLUS
				let phone = uni.getStorageSync("phone");
				if(!phone){
					uni.navigateTo({
						url:"../../My/Modify-phoneNumber/Modify-phoneNumbers"
					})
					return
				}
				// var main = plus.android.runtimeMainActivity();
				 
				//  plus.android.invoke('com.yiyun.tz.Helper','jump',main );
				 
				  var main = plus.android.runtimeMainActivity();
				   //通过反射获取Android的Intent对象
				  var Intent = plus.android.importClass("android.content.Intent");
				  //通过宿主上下文创建 intent
				  var intent = new Intent(main.getIntent());
				
				  //设置要开启的Activity包类路径  com.HBuilder.integrate.MainActivity换掉你自己的界面
				  intent.setClassName(main, "com.geeklink.thinker.activity.LoginActivity");
				   intent.putExtra("phone",phone+"");
				  //开启新的任务栈 （跨进程）
				  intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
				  //uni向android原生界面传值
				 
				
				 
				  main.startActivity(intent);
				 
				
	
				
				// #endif
				// #ifdef MP-WEIXIN
				uni.showModal({
					title:"请前往APP体验智能家居",
					success(e) {
						if(e.confirm){
						uni.navigateTo({
							url:"../../My/set/downloadCode/downloadCode"
						})

						}
					}
				})
			
				// #endif
			
			},
			// 页面触底
			getData() {
				console.log('页面触底')
				// 每次拉到页面底部,请求页数自加
				this.page++;
				if (this.loadingType != 0) { // loadingType!=0;直接返回
					return false;
				}
				this.loadingType = 1;
				uni.showNavigationBarLoading(); // 显示加载动画
				request.urlRequest(
					this.cityUrl + '/api/shop/index', {
						page: this.page
					}, {},
					'POST',
					(res) => {
						if (this.page < res.data.data.last_page) {
							this.loadingType = 0
						} else this.loadingType = 2
						uni.hideNavigationBarLoading()
						this.shopList = this.shopList.concat(res.data.data.data);
					}
				)
			},
			getCate() {
				
				request.urlRequest(
					this.cityUrl + '/api/industry_category/index', {
					
					}, {},
					'POST',
					(res) => {
						
						this.navbarList =res.data.data;
					
						for (let i = 0; i < this.navbarList.length; i++) {
							this.navbarList[i].text = this.navbarList[i].name;
							this.navbarList[i].img = this.cityUrl+ this.navbarList[i].img;
						}
						
						
						this.$refs.QSGrids.setData(this.navbarList)
					}
				)
			},
			// 店铺行业列表
			getShopList() {
				request.urlRequest(this.cityUrl + '/api/shop/index', {
					page: this.page
				}, {}, 'POST', res => {
					console.log('店铺行业列表', res)
					if (res.data.code == 10000) {
						this.shopList = res.data.data.data
					}
				})
			},
			goDetail(ev) {
				if (ev == 1) {
					uni.navigateTo({
						// url:"../../../pagesA/samecity/xiche/xiche?id=" + ev,
						url: "/pagesA/samecity/xiche/xiche?id=" + ev,
						fail(e) {
							console.log("fail",e)
						}
					}
					)
				} else {
					uni.navigateTo({
						url: "/pagesA/samecity/detail/detail?id=" + ev
					})
				}
			},
			
		
			
			toCD() {
				uni.navigateTo({
					url: "/pagesA/YiBei/charging/index"
				})
			},
			toRenLianPage() {
				var authtoken = uni.getStorageSync("authtoken")
				if(!authtoken){
					uni.navigateTo({
						url: '../../My/Login-registration/Login-registration'
					})
				}else{
						this.isshow = uni.getStorageSync("isshowhongbao", true);
					if(this.isshow){
						uni.navigateTo({
							url: '/pagesA/Discern/inviteUser'
						})
					}
					else{
						uni.showToast({
							title:"请前往APP",icon:"none"
						})
					}
				}
				
				
			},
			
			
			goYaoQing(){
			uni.navigateTo({
				url:'/pagesA/Discern/uploadFace'});	
			},

			toAccess(status) {
				switch (status) {
					case 1:
						uni.navigateTo({
							url:'/pagesA/kaimen/accessControl/accessControl'});
						break;
					case 2:
						uni.navigateTo({
							url:'/pagesA/kaimen/smartParking/smartParking'});
						break;
					
				}
			}
		},
		onLoad(option) {
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
			let sysheight = uni.getSystemInfoSync().windowHeight
			this.height = `${sysheight}px`
			this.getShopList()
			this.getCate();
		},
		onShow() {
			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			if (icon) {
				setTimeout(function() {
					icon.show();
				}, 100)
			}
			// #endif
			this.getLocation();
			this.isshow = uni.getStorageSync("isshowhongbao", true);
		},
		onReachBottom() {
			uni.showLoading({
				title: '正在加载更多'
			})
			// 模拟分页请求 (加载更多)
			setTimeout(() => {
				const nextData = JSON.parse(JSON.stringify(this.list.slice(0, 10)))
				this.list.push(...nextData);
				// this.$nextTick(()=>{
				//     this.$refs.wfalls.handleViewRender();
				// })
				// APP上触发不了还是setTimeout万能
				setTimeout(() => {
					this.$refs.wfalls.handleViewRender();
				}, 0)
				uni.hideLoading()
			}, 800)
		},
		onPullDownRefresh() {
			// 模拟更新新数据
			const newData = JSON.parse(JSON.stringify(this.list.slice(0, 10)))
			setTimeout(() => {
				this.list = newData;
				this.$refs.wfalls.init()
				uni.stopPullDownRefresh()
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				})
			}, 800)
		}
	};
</script>

<style lang="scss" scoped>
	.search {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 88rpx;
	
		.soso {
			margin-left: 24rpx;
			display: flex;
			flex-direction: row;
			
			align-items: center;
			width: 573rpx;
			height: 60rpx;
			background: #eee;
			border-radius: 30rpx;
	
			
	
				image {margin-left: 33rpx;
					width: 31rpx;
					height: 29rpx;
					margin-right: 20rpx;
				}
	
				input {
					width: 200rpx;
					height: 26rpx;
					font-size: 26rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					text-align: left;
				}
			
		}
	
		.quxiao {
			margin: auto 20rpx 30rpx 15rpx;
			display: flex;
			flex-direction: row;
	
			image {
				width: 47rpx;
				height: 47rpx;
			}
	
			.news {
				width: 34rpx;
				height: 16rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 8rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 13rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: rgba(0, 133, 249, 1);
				margin-left: -18rpx;
				margin-top: -10rpx;
			}
		}
	}
	.home {
		display: flex;
		flex-direction: column;

		// 顶部导航栏样式
		.header {
			
			background: linear-gradient(133deg, #FF6178 0%, #FF502E 100%);
			// background-image: url(https://xin.yiyunoto.com/uploads/static/img/bg.png);
			
			width: 100%;
			

			.header-box {
				width: 100%;
				height: 100rpx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.img1 {

					margin-left: 16rpx;
					margin-right: 19rpx;
					width: 28rpx;
					height: 33rpx;
				}

				.addr {

					font-size: 30rpx;
					font-family: Microsoft YaHei;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
				}

				.img2 {
					margin-left: 30rpx;
					width: 11rpx;
					height: 18rpx;
				}
			}

			

			.tabBar_box {
				margin-top: 20rpx;

				width: 100%;
				display: flex;
				flex-direction: row;

				.TabBar {
					width: 94%;
					height: 60rpx;
					white-space: nowrap;

					.grid {
						padding: 0 30rpx;
						height: 60rpx;
						display: inline-block;
						font-size: 34rpx;

						.text {
							width: 80rpx;
							height: 50rpx;
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #ffffff;
							display: flex;
							justify-content: center;
							align-items: center;

							&.on {
								
								font-size: 32rpx;
								color: #ffffff;
								border-bottom: 6rpx solid #ffffff;
							}
						}
					}
				}

				.zhedie {
					width: 6%;

					image {
						width: 39rpx;
						height: 29rpx;
					}
				}
			}
		}

		
		.section {
			width: 100%;
			overflow-y: auto;
			display: flex;
			width: 100%;
			height: 100%;

			// 轮播图区域
			.index_swiper {
				margin-top: 20rpx;
				width: 100%;
				padding-bottom: 20rpx;
				box-sizing: border-box;

				.swiper_box {
					height: 286rpx;
					// height: 20vh;
					// /* #ifdef MP-WEIXIN */
					// height: 25vh;
					// /* #endif */
					// overflow: hidden;
				}

				.swiper-item {
					margin: auto 3% auto;
					width: 94%;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.tuijian {
				width: 100%;
				height: 80rpx;
				background: #FFFFFF;

				.toutiao {
					width: 94%;
					margin: auto 3% auto;
					height: 60rpx;
					background: rgba(244, 244, 244, 1);
					border-radius: 10rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					padding-top: 10rpx;
					padding-bottom: 10rpx;

					.left {
						width: 200rpx;
						font-size: 31rpx;
						font-family: zihun35hao;
						font-weight: bold;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;

						.tou {
							color: #DB2F1C;
						}

						.tui {
							color: #232323;
						}

						.red {

							margin-left: 8rpx;
							width: 16rpx;
							height: 16rpx;
							background: #DB2F1C;
							border-radius: 8rpx;
						}
					}

					.con {
						width: 460rpx;
						font-size: 26rpx;
						font-family: Microsoft YaHei;
						font-weight: bold;
						color: rgba(15, 15, 15, 1);
					}

					image {
						width: 12rpx;
						height: 23rpx;

					}
				}
			}

			.openProperty {
				width: 100%;
				background: #FFFFFF;

				.property {
					display: flex;
					flex-direction: row;
					width: 94%;
					margin: auto 3% auto;
					padding-top: 30rpx;

					.menjin {
						margin-right: 10rpx;

						image {
							width: 241rpx;
							height: 383rpx;
						}
					}

					.wuye {
						display: flex;
						flex-direction: column;

						.xiaoqu {
							display: flex;
							flex-direction: row;

							.renlian {
								margin-right: 10rpx;

								image {
									width: 191rpx;
									height: 185rpx;
								}
							}

							.dianti {
								image {
									width: 258rpx;
									height: 185rpx;
								}
							}
						}

						.other {
							display: flex;
							flex-direction: row;

							.parking {
								margin-right: 10rpx;

								image {
									width: 258rpx;
									height: 185rpx;
								}
							}

							.more {
								image {
									width: 191rpx;
									height: 185rpx;
								}
							}
						}
					}
				}
			}

			.jiaju {
				width: 100%;
				background: #FFFFFF;
				height: 78rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.zhi {
					margin-left: 16rpx;
					display: flex;
					flex-direction: row;

					.img {
						margin-right: 20rpx;
						width: 32rpx;
						height: 36rpx;
					}

					.zhineng {
						width: 160rpx;
						height: 30rpx;
						font-size: 30rpx;
						font-family: Microsoft YaHei;
						font-weight: bold;
						color: rgba(15, 15, 15, 1);
					}
				}

				.chakan {
					display: flex;
					flex-direction: row;
					align-items: center;

					.all {
						width: 100rpx;
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: bold;
						color: rgba(153, 153, 153, 1);
					}

					image {
						margin-right: 20rpx;
						margin-left: 20rpx;
						width: 12rpx;
						height: 23rpx;
					}
				}
			}

			// 轮播图区域
			.imgbanner {
				background: #FFFFFF;
				width: 100%;
				padding-top: 10rpx;
				margin: 0 auto;

				.swiper {
					width: 94%;
					margin: auto 3% auto;

					.imgsBannerBox {
						position: relative;

						.scrollImgBox {
							display: flex;
							flex-direction: row;

							.scrollImgList {
								display: flex;
								flex-direction: row;
								flex-wrap: nowrap;

								.list {
									display: flex;
									flex-direction: row;
									height: 170rpx;
									margin-right: 20rpx;

									image {
										width: 330rpx;
										height: 170rpx;
									}

									image:last-child {
										margin-right: 0;
									}

									.activeImageItem {
										// border: 6rpx solid #F57341;
									}
								}
							}

							.scrollImgList2 {
								z-index: 999;
								display: flex;
								flex-direction: row;
								flex-wrap: nowrap;
								margin-top: -128rpx;

								.list {
									display: flex;
									flex-direction: row;
									height: 170rpx;
									margin-right: 20rpx;

									.shebei {
										width: 330rpx;
										display: flex;
										flex-direction: column;
										margin-left: 26rpx;

										.name {
											font-size: 26rpx;
											font-family: Microsoft YaHei;
											font-weight: bold;
											color: rgba(255, 255, 255, 1);
											line-height: 40rpx;
										}

										.node {
											font-size: 22rpx;
											font-family: Microsoft YaHei;
											font-weight: 400;
											color: rgba(255, 255, 255, 1);
											line-height: 40rpx;
										}
									}

									.name:last-child {
										margin-right: 0;
									}

									.activeImageItem {
										// border: 6rpx solid #F57341;
									}
								}
							}
						}
					}
				}
			}

			// banner图区域
			.tcbanner {
				position: relative;
				width: 750rpx;

				image {
					width: 100%;
					vertical-align: middle;
					background-color: #fff;
				}

				.tcbanner_b {
					width: 100%;
					position: absolute;
					left: 0;
					top: 190rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.fenge {
						width: 1px;
						height: 45rpx;
						background-color: #fff;
						opacity: 0.6;
					}

					.tcbanner_b_i {
						width: 33%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						color: #ffffff;

						text:first-child {
							font-size: 26rpx;
							font-weight: bold;
							margin-bottom: 15rpx;
						}

						text:last-child {
							font-size: 22rpx;
							opacity: 0.6;
						}
					}
				}
			}

			.shop {
				width: 710rpx;
				padding: 20rpx;
				background-color: #f3f3f3;

				.shop_i:last-child {
					margin-bottom: 0rpx;
				}

				.shop_i {
					position: relative;
					width: 650rpx;
					padding: 30rpx;
					background-color: #ffffff;
					border-radius: 26rpx;
					margin-bottom: 20rpx;

					image:first-child {
						width: 100%;
						height: 290rpx;
						border-radius: 15rpx;
					}

					.youxuan {
						width: 102rpx;
						height: 93rpx;
						position: absolute;
						top: 30rpx;
						right: 60rpx;
					}

					.shop_i_t {

						font-size: 32rpx;
						font-weight: 600;
						color: #333333;
						margin: 20rpx 0;
					}

					.shop_i_m {
						font-size: 26rpx;
						color: #999999;
						// margin-bottom: 20rpx;

						word-break: break-word; //换行模式
						overflow: hidden;
						text-overflow: ellipsis; //修剪文字
						display: -webkit-box;
						-webkit-line-clamp: 2; //此处为上限行数
						-webkit-box-orient: vertical;
					}

					.shop_i_b {
						display: flex;
						justify-content: space-between;
						align-items: flex-end;

						text:first-child {
							font-size: 25rpx;
							color: #333333;
						}

						text:last-child {
							padding: 10rpx 30rpx;
							height: 36rpx;
							line-height: 36rpx;
							font-size: 30rpx;
							color: #ffffff;
							background-color: #ff2b10;
							border-radius: 30rpx;
						}
					}
				}
			}
		}

	}
</style>

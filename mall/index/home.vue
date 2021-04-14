<template name='page2'>
	<!-- 商城购物 -->
	<view style="background-color: #F5F5F5;" :style="{width}">

		<view class="titleTxtBox">
			<view style="width: 50rpx;height: 50rpx;margin-left: 20rpx;margin-top: 20rpx;" @click="backPage">
				<image style="width: 19rpx;height: 34rpx;" src="../../static/public/goBack.png"></image>
			</view>
			<!-- <text class="topTitlePage">{{zhuti}}</text> -->
			<view class="header-two" @click="goSearch()">

				<image src="../../static/public/whitesearch.png" class="search"></image>
				<text class="search-text"> 搜索商品</text>

			</view>
		</view>

		<view class="top">



		</view>
		<view class="lunbo">
			<swiper circular="true" style="height: 300upx;border-radius: 10rpx; 	overflow: hidden;transform: translateY(0);"
			 :indicator-dots="false" :autoplay="true" :interval="2000" :duration="500">
				<swiper-item v-for="(item,index) in swiperImg" :key="index" style="border-radius: 10rpx;">
					<image :src="url+item.img" mode="aspectFill" style="width: 100%; height: 100%; border-radius: 10rpx;"></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 分类按钮 -->
		<view class="icon-all">
			<view v-for="(value, index) in fenlei" :key="index" class="icon1" @click="goDetail(value)">
				<view>
					<image :src="url+value.img"></image>
				</view>
				<view class="icon_text">{{ value.name }}</view>
			</view>
		</view>




		<!-- 红包图片区 -->
		<view class="redPack" @click="goNew">
			<image :src="url+tu" mode="widthFix"></image>
		</view>


		<view class="buy-limit" v-if="buyLimit.length>0">
			<!--限时抢购 -->
			<view class="buy-title">
				<view class="left">

					<text style="margin-right: 20upx; font-size: 35upx;font-weight: 700;">限时秒杀</text>
					<view class="timeBox">
						<view class="numBox">
							<text class="txt">{{hours}}</text>
						</view>
						<text class="spliceTxt">:</text>
						<view class="numBox">
							<text class="txt">{{minutes}}</text>
						</view>
						<text class="spliceTxt">:</text>
						<view class="numBox">
							<text class="txt">{{seconds}}</text>
						</view>
					</view>
				</view>
				<view class="right">
					<text style=" font-size: 26upx;color: #999999; float: right;margin-right: 12upx;" @click="goMore">查看更多</text>
					<!-- <image src="../../../static/home/right.png" mode="widthFix" style="width: 10upx;height: 10upx;"></image> -->
				</view>
			</view>
			<!-- 循环内容区 -->

			<view class="lp" v-for="(limitProduct, index) in buyLimit" :key="index" @click="details(limitProduct)">
				<view class="buy-img2">
					<image :src="url+limitProduct.img" mode="aspectFit"></image>
				</view>

				<view class="sale">
					<view style="align-items: center; display: flex;flex: 1; ">
						<image src="../../static/shop/jian.png" style="width: 31rpx;height: 33rpx;"></image>
						<!-- <text class="text" style="margin-left: 20rpx;">抢购截止{{limitProduct.total_sales}}</text> -->
						<text class="buy-name2">{{ limitProduct.name }}</text>
					</view>
					<view style="align-items: center; display: flex;">
						<view class="text">仅剩</view>
						<text style="font-size: 26rpx; color: #666666;">{{limitProduct.stock}}</text>

						<text class="text">份</text>
					</view>

				</view>
				<view class="shop-price" style="margin-top: 20rpx;padding-bottom: 20rpx;">
					<text class="num">￥{{ limitProduct.nowprice }}</text>
					<text class="tj2">￥{{ limitProduct.price }}</text>
					<view style="flex: 1;"></view>
					<view style="background: #ff2b10; width: 180rpx;height: 53rpx;text-align: center;line-height: 53rpx; color: #ffffff;font-size: 30rpx;border-radius: 50rpx;">立即购买</view>

				</view>

			</view>

		</view>
		<view class="buy-limit" v-if="preSale.length>0">
			<!--预售 -->


			<view class="lp" v-for="(limitProduct, index) in preSale" :key="index" @click="preDetails(limitProduct)">
				<view class="buy-img2">
					<image :src="url+limitProduct.goods_preview" mode="aspectFit"></image>
				</view>

				<view class="sale">
					<view style="align-items: center; display: flex; flex: 1;">
						<image src="../../static/shop/jian.png" style="width: 31rpx;height: 33rpx;"></image>
						<!-- <text class="text" style="margin-left: 20rpx;">抢购截止{{limitProduct.total_sales}}</text> -->
						<text class="buy-name2">{{ limitProduct.goods_name }}</text>
					</view>


				</view>
				<view style="margin-top: 30rpx;margin-bottom: 10rpx;display: flex;width: 100%;flex-direction: row;align-items: center;justify-content: space-between;">
					<view style="font-size: 26rpx;color: #333333;">截止时间：{{ limitProduct.deadline_time }}</view>
					<view style="font-size: 26rpx;color: #f4a05b;">限量：{{ limitProduct.stock }}份</view>
				</view>
				<view style="margin-bottom: 10rpx;display: flex;width: 100%;flex-direction: row;align-items: center;">
					<text style="font-size: 26rpx;color: #333333;">提货时间：{{ limitProduct.pickup_time }}</text>

				</view>
				<view class="shop-price" style="margin-top: 20rpx;padding-bottom: 20rpx;">
					<text class="num">￥{{ limitProduct.now_price }}</text>
					<text class="tj2">￥{{ limitProduct.goods_price }}</text>
					<view style="flex: 1;"></view>
					<view style="background: #ff2b10; width: 180rpx;height: 53rpx;text-align: center;line-height: 53rpx; color: #ffffff;font-size: 30rpx;border-radius: 50rpx;">立即预订</view>

				</view>

			</view>

		</view>
		<!-- 精选推荐区 -->
		<view class="shopsBox">
			<view class="shopTitle">
				<!-- <image src="../../../static/shop/tj.png"></image> -->
				<view class="smillBox"></view>

				<text class="shopTitleTxt" style="color: #000;font-size: 26rpx;margin-left: 33rpx;">猜你</text>
				<text class="shopTitleTxt" style="color:#F74F47;font-size:30rpx;margin-right: 33rpx;">喜欢</text>

				<view class="smillBox"></view>
			</view>
			<view class="shops">
				<view class="shop" v-for="(item,index) in shops" :key="index" @click="details(item)">
					<view class="img_goods">
						<image :src="url+item.img" mode="scaleToFill" style="width: 227upx;height: 281upx;border-radius: 20upx;"
						 lazy-load="true"></image>
					</view>
					<text class="buy-name">{{ item.name }}</text>
					<!-- <text style="font-size: 26rpx;color: #999;width: 100%;">今日已售{{ item.total_sales }}</text> -->
					<view class="shop-price2">
						
							
							<text style="color: #F47f47;font-size: 20upx;" >￥{{ item.nowprice }}</text>
							<text class="tj">{{ item.total_sales }}人付款</text>
						

						<!-- <image src="../../../static/shop/car1.png" style="width: 50upx;height: 50upx;" @click.stop="buy(item)"></image> -->

					</view>
				</view>
			</view>
		</view>


		<view class="che" @click="notarize" v-if="topShow">
			
			<image  src="https://xin.yiyunoto.com/uploads/static/mall/gotop.png" mode=""></image>
		</view>
		
		<hans-tabber :list="list" style="position:fixed;bottom:0;width:100%;left:0;right:0;" @tabChange="tabChange"></hans-tabber>

	</view>
</template>

<script>
	import hansTabber from '../../components/hans-tabbar/hans-tabbar.vue'
	// import uniTransition from "@/components/uni-transition/uni-transition.vue"
	// import uniPopupDialog from '../../components/uni-popup/uni-popup-dialog2.vue'
	// import uniPopup from '@/components/uni-popup/uni-popup.vue'
	// import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import request from '../../store/http.js';
	import amap from '../../common/amap-wx.js';
	var bitmap = null;
	export default {
		components: {
			hansTabber
			// uniPopupDialog,
			// uniTransition
			// uniNoticeBar
		},
		data() {
			return {
				s: '最新订单来自',
				showSearch: false,
				hb: '/uploads/static/home/hb.gif',
				tu: '/uploads/static/mall/xinren.png',
				gonggao: "22:00前的订单，次日送达；22:00之后的订单，后日送达.",
				timer: null,
				oTimer: null,
				leaders: null,
				limg: "https://xin.yiyunoto.com/uploads/static/shop/tz.png",
				location: null,
				addressName: '',
				leadersProducts: [],
				isshow: false,
				// 轮播数据
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				zhuti: '智慧云家',
				swiperImg: [],
				url: this.$store.state.url,
				fenlei: [], //分类
				buyLimit: [],
				preSale: [],
				shops: [],
				amapPlugin: null,
				key: '980c4a9d17bc9c06a85d488adaac1f09',
				cityCode: '0',
				currentPage: 1,
				loadingType: 0, //0可以加载更多
				width: '',
				height: '',
				limitProduct: null,
				newGoodsAndSell: {
					newGoods: [],
					maxGoods: []
				},
				topShow: false, // 弹窗显示
				
				minutes: "59",
				carNum: 0,
				seconds: "59",
				hours: "23",
				transShow: false,
				modeClass: ['fade'],
				list: [{
						"text": "首页",
						"iconPath": '../../static/tabBar/go31.png',
						"selectedIconPath": '../../static/tabBar/go31.png'
					},
					{
						"text": "分类",
						"iconPath": '../../static/tabBar/go31.png',
						"selectedIconPath": '../../tabBar/go31.png'
					},
					{
						"text": "购物车",
						"iconPath": '../../static/tabBar/go31.png',
						"selectedIconPath": '../../static/tabBar/go31.png'
					}
				],
				transfromClass: {
					'position': 'fixed',
					'bottom': 0,
					'top': 0,
					'left': 0,
					'right': 0,
					/* #ifndef APP-NVUE */
					'display': 'flex',
					/* #endif */
					'justify-content': 'center',
					'align-items': 'center'
				}
			}

		},

		created() {
			
			let res = uni.getSystemInfoSync();
			this.width = res.windowWidth + 'px';
			this.height = res.windowHeight + 'px';
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});


			this.Classify();
			this.getXiaoChengXuConfig();


		},

		onShow() {
			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			if (icon) {
				setTimeout(function() {
					icon.hide()();
				}, 100)
			}
			// #endif
			this.getLeaders();
			this.getCarNum();
			this.getOrder();
		},

		onPageScroll(e) {
			if (e.scrollTop > 1100) {
				this.showSearch = true;
			} else this.showSearch = false;
		},
		onShareAppMessage() {
			return {
				title: "",
				path: 'pages/Shop/index/index'
			}
		},
		onReachBottom() {
			if (this.loadingType != 0) {
				return
			}
			this.currentPage++;
			this.getErpProduct(this.currentPage)
		},
		onPageScroll(e) {
			let scrollTop = e.scrollTop;
			if(scrollTop>100){
				this.topShow=true
			}else{
				this.topShow=false
			}
		},
		onPullDownRefresh() {
			this.currentPage = 1
			this.getErpProduct(this.currentPage)
			this.getXiaoChengXuConfig();
			this.Classify();
			this.getnewAndSell();
			this.getOrder();
			this.getCarNum();
			// this.getLike();
			this.getLeaders();
			uni.stopPullDownRefresh();
		},
		onUnload() {
			clearTimeout(this.timer)
			clearTimeout(this.oTimer)
		},
		onHide() {
			clearTimeout(this.oTimer)
		},
		methods: {
			getCarNum() {

				var authtoken = uni.getStorageSync("authtoken")
				if (!authtoken) return;
				request.urlRequest(
					this.url + '/api/cart/get', {

					}, {
						authtoken: authtoken
					}, 'POST', res => {
						if (res.data.code == 1) {
							this.carNum = res.data.data.length

						}

					})

			},
			onTap() {

				this.transShow = this.show = false
			},
			start(orderList) {
				let _this = this;
				// for(var i =0;i<orderList.length;i++){
				// 	this.s=
				// }

				this.s = orderList.guanggao
				this.open(['slide-bottom', 'fade'])
				setTimeout(function() {

					_this.open(['slide-top', 'fade'])
				}, 1500)
			},
			change(e) {
				console.log(e.detail);
			},
			open(mode) {
				this.modeClass = mode
				this.transShow = !this.transShow
			},
			goSearch() {
				// this.open(['zoom-in','slide-bottom','fade'])
				uni.navigateTo({
					url: "../searchPage/searchPage?code=" + this.cityCode
				})
			},
			close(done) {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				plus.runtime.quit();
				done()
			},

			confirm(done, value) {
				uni.setStorageSync("xieyi", true)
				var token = uni.getStorageSync('authtoken');
				done();
				this.popShow = true;

				// 输入框的值
				// console.log(value)
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				// ...

			},
			showXieYi() {


				// #ifdef APP-PLUS

				this.$refs.popup.open()

				// #endif

			},
			goNew() {
				uni.navigateTo({
					url: "../commodity/newZone"
				})
			},
			goPro() {},
			closePop() {
				this.popShow = false;
			},
			selectedTz(i) {
				this.popShow = false;
				this.leaders = this.liveTz[i];
				uni.setStorageSync("leaderid", this.leaders.id);
				uni.setStorageSync("Leaders", this.leaders)
			},
			onloaderror() {
				this.limg = "https://xin.yiyunoto.com/uploads/static/shop/tz.png";
			},
			goMore() {
				uni.navigateTo({
					url: "../rushbuy/rushbuy?code=" + this.cityCode
				})
			},
			mapa() {

				uni.navigateTo({
					url: '/redpage/umap/umap'
				})
			},
			createtab: function() {
				// 设置水平居中位置
				var leftPos = Math.ceil((plus.screen.resolutionWidth - 60) / 2);
				var view = new plus.nativeObj.View('icon', {
					bottom: '15px',
					left: leftPos + 'px',
					width: '60px',
					height: '60px'
				});
				view.drawBitmap(bitmap, {
					tag: 'font',
					id: 'icon',
					src: '/static/app-tabber/app-tabber.png',
					position: {
						top: '0px',
						left: '5px',
						width: '50px',
						height: '100%'
					}
				});
				view.addEventListener("click", function(e) {

					uni.switchTab({
						url: '../../kaimen/home/home',
						success(res) {

						},
						fail(err) {
							uni.switchTab({

								url: "../kaimen/home/home",
								fail(e) {

								}
							})
						}
					})
				}, false);
				view.show();
			},


			//选择自提点
			goSelectXQ() {
				this.popShow = false;
				uni.navigateTo({
					url: "./selectXiaoQu"
				})
			},

			// 获取团长列表
			getLeaders() {
				let _this = this;
				uni.getLocation({
					type: "gcj02",
					geocode: true,
					success(res) {
						_this.location = {
							lng: res.longitude,
							lat: res.latitude
						};
						_this.getcitycode(_this.location);

						// _this.leaders = uni.getStorageSync('Leaders');
						// _this.addressName = _this.leaders.address
						// if (!_this.leaders) {
						_this.getLeadersByLocation();


						// }else {
						// 	if(_this.leaders.headimg&&_this.leaders.headimg.search("http")!=-1){
						// 		_this.limg=_this.leaders.headimg;
						// 	}else {
						// 		_this.limg= _this.url+_this.leaders.headimg;
						// 	}
						// }
					},
					fail(e) {
						uni.showModal({
							content: "获取位置失败，是否打开设置界面",
							success(a) {
								if (a.confirm) {
									// #ifdef MP-WEIXIN
									uni.openSetting({
										success(res) {
											_this.getLeaders();
										},
										fail(res) {
											console.log(res)
										}
									})
									// #endif
									// #ifdef APP-PLUS
									uni.getSystemInfo({
										success(res) {

											if (res.platform == 'ios') { //IOS
												plus.runtime.openURL("app-settings://");
											} else if (res.platform == 'android') { //安卓

												try {
													let main = plus.android.runtimeMainActivity();
													var pkName = main.getPackageName();
													let Intent = plus.android.importClass("android.content.Intent");
													let mIntent = new Intent('android.settings.LOCATION_SOURCE_SETTINGS');
													mIntent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
													main.startActivity(mIntent);

												} catch (e) {
													console.log(e)
												}
											}
										}
									});

									// #endif
								}
							},
							fail(b) {

							}
						})


					}
				})

			},
			getcitycode(location) {
				// console.log("getcitycode", location)
				let _this = this;
				_this.amapPlugin.getRegeo({
					location: '' + location.lng + ',' + location.lat + '',
					success: (data) => {
						// console.log("data1", data)

						_this.cityCode = data[0].regeocodeData.addressComponent.adcode
						_this.getnewAndSell();
						_this.getHot();
						_this.getPreSale();
						if (_this.currentPage == 1)
							_this.getErpProduct(_this.currentPage)

					},
					fail: (data) => {
						// console.log("data", data)
					}
				});
			},
			// 获取小区列表
			getLeadersByLocation() {

				request.urlRequest(
					this.url + '/api/member/getNearestLeaders', this.location, {}, 'POST',
					(res) => {
						// console.log(res);
						if (res.data.code == 1) {
							let list = res.data.data.data;
							let l = uni.getStorageSync('Leaders')

							this.liveTz = [];
							this.liveTz.push(res.data.data.data[0]);
							this.liveTz.push(res.data.data.data[1]);

							if (l) {
								let hasLeader = false;
								list.forEach(item => {
									if (l.id == item.id) {
										hasLeader = true;
										this.leaders = item;
									}
								});
								if (!hasLeader) {
									this.leaders = l;
								}
							} else {

								this.leaders = res.data.data.data[0];

							}


							if (this.leaders.headimg && this.leaders.headimg.search("http") == -1) {

								this.leaders.headimg = this.url + this.leaders.headimg;
							}
							var token = uni.getStorageSync('authtoken');
							// #ifdef APP-PLUS
							if (!uni.getStorageSync("xieyi", false)) {
								this.showXieYi();
							} else {
								if (!token || !l) {
									if (this.liveTz.length > 0)
										this.popShow = true;
									else {
										this.popShow = false;
									}
								} else {
									this.popShow = false;
								}
							}
							// #endif
							// #ifndef APP-PLUS
							if (!token || !l) {
								if (this.liveTz.length > 0)
									this.popShow = true;
							}
							// #endif
							// if (this.leaders && this.leaders.headimg && this.leaders.headimg.search("http") != -1) {

							// 	this.limg = this.leaders.headimg;
							// } else if (this.leaders && this.leaders.headimg && this.leaders.headimg.search("http") == -1) {
							// 	this.limg = this.url + this.leaders.headimg;
							// }
							// this.addressName = this.leaders.address;
							this.getLeaderProduct();
							// uni.setStorageSync("leaderid", this.leaders.id);
							// uni.setStorageSync("Leaders", this.leaders);




						}


					}
				)
			},

			//搜索跳转
			toSearch() {
				// uni.showToast({title: "建议跳转到新页面做搜索功能"});
				uni.navigateTo({
					url: "../searchPage/searchPage"
				})
			},

			// 获取分类列表
			Classify() {
				request.urlRequest(
					this.url + '/api/index/index', {}, {}, 'POST',
					(res) => {

						this.swiperImg = res.data.data.banner;
						this.fenlei = res.data.data.type;
						this.zhuti = res.data.data.zhuti;

						this.getGonggao();
					}
				)



			},

			// 获取公告
			getGonggao() {
				request.urlRequest(
					this.url + '/api/index/platformNotice', {}, {}, 'POST',
					(res) => {
						if (res.data.code == 1 && res.data.data.length > 0)
							this.gonggao = res.data.data[0].name;


					}
				)


			},
			// 获取小程序展示信息
			getXiaoChengXuConfig() {
				request.urlRequest(
					this.url + '/api/index/getXiaoChengXuConfig', {}, {}, 'GET',
					(res) => {
						let a = res.data.data.hongbao;
						// console.log("hongbao", a)
						this.isshow = res.data.data.hongbao == 1
						uni.setStorageSync("isshowhongbao", this.isshow)

					}
				)



			},
			// 限时秒杀
			getHot() {
				request.urlRequest(
					this.url + '/api/index/erpProductRush', {
						code: this.cityCode
					}, {}, 'POST',
					(res) => {

						if (res.data.code == 1)
							// console.log(res);
							this.buyLimit = res.data.data.data;
						clearTimeout(this.timer);
						this.leftTimer(res.data.data.end_time);

						;
						// this.limitProduct = res.data.data.data[0];
					}
				)



			},
			// 订单展示
			getOrder() {

				let _this = this;
				request.urlRequest(
					this.url + '/api/index/buyerNameList', {
						// code: this.cityCode
					}, {}, 'POST',
					(res) => {

						if (res.data.code == 1) {
							let orderList = res.data.data;
							this.start(orderList);
							clearTimeout(this.oTimer);
							this.oTimer = setTimeout(function() {
								_this.getOrder();
							}, Math.floor((Math.random() * 20000) + 1))
						}
						// console.log(res);

						// this.limitProduct = res.data.data.data[0];
					}
				)



			},
			// 预售
			getPreSale() {
				request.urlRequest(
					this.url + '/api/index/preSale', {
						code: this.cityCode
					}, {}, 'POST',
					(res) => {

						if (res.data.code == 1)
							// console.log(res);
							this.preSale = res.data.data;



						// this.limitProduct = res.data.data.data[0];
					}
				)



			},
			buy(item) {


				var authtoken = uni.getStorageSync("authtoken")

				uni.request({
					url: this.url + "/api/cart/add",
					method: 'POST',
					header: {
						'authtoken': authtoken
					},
					data: {
						goods_id: item.id,
						modular_id: item.modular_id,
						num: 1,
					},
					success: res => {
						// console.log(res);

						// 吐丝定义写法
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
						if (res.data.code == 1) {
							this.getCarNum()
						}
					},
					fail: () => {

					},
					complete: () => {}
				});
				// }
			},
			// // 猜你喜欢
			// getLike() {
			// 	request.urlRequest(
			// 		this.url + '/api/index/guessLikeProduct', {
			// 			is_new: 1
			// 		}, {}, 'POST',
			// 		(res) => {
			// 			if (res.data.code == 1) {
			// 				this.shops = res.data.data;
			// 			}
			// 		}
			// 	)
			// },
			// 猜你喜欢erp
			getErpProduct(page) {
				request.urlRequest(
					this.url + '/api/index/getErpProduct', {
						code: this.cityCode,
						page: page
					}, {}, 'POST',
					(res) => {

						if (res.data.code == 1) {
							if (page < res.data.data.last_page) {
								this.loadingType = 0
							} else this.loadingType = 2
							if (page == 1) {
								this.shops = res.data.data.data;

								uni.setStorageSync("modular_id", this.shops[0].modular_id)
							} else this.shops = this.shops.concat(res.data.data.data)


						}

					}
				)



			},

			getLeaderProduct() {

				request.urlRequest(
					this.url + '/api/index/getLeaderProduct', {
						leader_id: this.leaders.id,

					}, {}, 'POST',
					(res) => {

						// console.log(res)
						if (res.data.code == 1) {

							this.leadersProducts = res.data.data.product
						}

					}
				)



			},
			getnewAndSell() {

				request.urlRequest(
					this.url + '/api/index/newAndSell', {
						code: this.cityCode
					}, {}, 'POST',
					(res) => {

						// console.log(res)
						if (res.data.code == 1) {

							this.newGoodsAndSell = res.data.data
						}

					}
				)



			},
			// 跳转购物车
			notarize: function() {
				uni.pageScrollTo({
					scrollTop:0
				})
			},
			// // 商品跳转商品详情页面
			// 	details: function(item) {
			// 		console.log("modular_id",item )
			// 		uni.navigateTo({
			// 			url: '/pages/Shop/product/product?goodsId=' +item. id
			// 		})
			// 	},
			// 商品跳转商品详情页面
			details: function(item) {

				uni.navigateTo({
					url: '/pages/Shop/product/product?goodsId=' + item.id + "&modular_id=" + item.modular_id
				})
			},
			preDetails: function(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/Shop/product/product?goodsId=' + item.pid + "&modular_id=" + item.modular_id
				})
			},
			goDetail(value) {
				// console.log("goDetail", '///' + value)

				uni.navigateTo({
					url: '../commodity/commodity?id=' + value.id + "&name=" + value.name + "&code=" + this.cityCode
				})
			},

			flowtap(id) {
				// console.log(id);
			},
			leftTimer(end_time) {
				var now = Math.ceil((new Date()).getTime() / 1000);
				var leftTime = end_time - now; //计算剩余的毫秒数 
				if (leftTime < -1) {
					this.buyLimit = [];
				} else if (leftTime < 1 && end_time && leftTime > -1) {
					this.getHot();
				} else if (end_time && leftTime > 1) {
					// var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
					var hours = parseInt(leftTime / 60 / 60, 10); //计算剩余的小时 
					var minutes = parseInt(leftTime / 60 % 60, 10); //计算剩余的分钟 
					var seconds = parseInt(leftTime % 60, 10); //计算剩余的秒数 
					// days = checkTime(days); 
					this.hours = this.checkTime(hours);
					this.minutes = this.checkTime(minutes);
					this.seconds = this.checkTime(seconds);

					let _this = this;
					_this.timer = setTimeout(function() {
						// console.log("setTimeout", leftTime)
						_this.leftTimer(end_time);

					}, 1000);
				}
			},
			checkTime(i) { //将0-9的数字前面加上0，例1变为01 
				if (i < 10) {
					i = "0" + i;
				}
				return i;
			}
		},

	};
</script>

<style lang="scss" scoped>
	page {
		background-color: $uni-bg-color-box;
	}

	.box {
		font-size: 26rpx;
		color: #fff;
		padding: 10rpx 20rpx 10rpx 20rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-radius: 50rpx;
		opacity: 0.9;
		background-color: #666666;
	}

	.header-two {

		width: calc(100% - 60rpx);

		border-radius: 30rpx;
		margin-top: 20rpx;
		padding-left: 20upx;
		height: 60upx;
		flex-direction: row;
		display: flex;

		align-items: center;
		background: rgba(255, 255, 255, 0.4);

	}

	.search {
		width: 22upx;
		height: 22upx;
	}

	.search-text {
		font-weight: 500;
		margin-left: 20upx;
		font-size: 26upx;
		font-family: PingFangSC-Medium, PingFang SC;
		color: #ffffff;

	}

	.sale {
		align-items: center;
		margin-top: 10rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		color: #999999;
	}

	.buy-name2 {
		display: flex;
		flex: 1;
		margin-left: 20rpx;
		font-weight: 600;
		font-size: 30rpx;
		color: #333333;
	}

	.lp {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.top {
		width: 100%;
		height: 457rpx;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		plain: true;
		outline: none;
		border: none;
		// border-radius: 10%;
		// background-color: $uni-bg-color-top;
		background-image: url("http://xin.yiyunoto.com/uploads/static/mall/topbg.png");
	}

	.topTitlePage {
		margin-top: 10rpx;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 700;
	}

	.titleTxtBox {
		width: 100%;
		position: fixed;
		top: 0px;
		left: 0;
		z-index: 1;
		display: flex;
		flex-direction: row;
		padding-top: var(--status-bar-height);
		padding-bottom: 10upx;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		align-items: center;
		plain: true;
		outline: none;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: url("http://xin.yiyunoto.com/uploads/static/mall/top.png");
		// background-color: $uni-bg-color-top;
	}

	.titleTxt {
		width: 38%;
		height: 100%;
		margin: 0 auto;
	}

	.status_bar {
		background: $uni-bg-color-top;
		position: fixed;
		top: 0rpx;
		height: var(--status-bar-height);
		width: 100%;
		z-index: 999;
	}

	.lunbo {
		margin-top: -270rpx;
		width: calc(100% - 40rpx);
		margin-left: 20rpx;
		margin-right: 20rpx;
		border-radius: 10rpx;
	}

	.tzBox {
		margin-right: 20rpx;
		margin-left: 20rpx;
		height: 110rpx;
		background-color: $uni-bg-color;
		margin-top: 24rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.tzHead {
		margin-left: 24rpx;
		width: 80upx;
		height: 80upx;
		border-radius: 10upx;
	}

	.tzInfo {
		margin-left: 24rpx;
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 20upx 0;
		box-sizing: border-box;
	}

	.tzName {
		font-size: 30upx;
		font-weight: 700;
		color: #F72A1F;
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		/** 显示的行数 **/
	}

	.tzDz {
		// max-height: 130upx;
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1;
		/** 显示的行数 **/
		font-size: 24upx;
		color: #666;
	}

	.tzJl {
		font-size: 28upx;
		font-weight: 700;
		color: #F72A1F;
	}

	.tzChangeBox {

		height: 100%;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.changeTzImg {
		margin-left: 20rpx;
		margin-right: 20rpx;
		width: 14upx;
		height: 26upx;
	}

	.changeTzTxt {
		font-size: 28upx;
		color: #999;
	}

	// 图标区域
	.icon-all {
		display: flex;
		flex-wrap: wrap;
		font-size: 24upx;
		background-color: $uni-bg-color;
		margin-left: 20rpx;
		margin-right: 20rpx;
		border-radius: 20rpx;
		padding: 30rpx 0;

		.icon_text {
			margin-bottom: 15upx;
			margin-top: 10upx;
			font-size: 26upx;
			color: #0F0F0F;
		}

		.icon1:nth-child(5n) {
			margin-right: 0 !important;
		}

		.icon1 {
			color: #0F0F0F;
			font-size: 26upx;
			width: 25%;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			// margin-right: 38upx;

			>view:nth-child(1) {
				width: 88upx;
				height: 88upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			>view:nth-child(2) {
				// .if;
				line-height: 32upx;
				display: flex;
				flex-wrap: nowrap;
				text-align: center;

			}

		}
	}

	// 今日推荐
	.todayTjBox {

		margin: 20rpx;

		border-radius: 20upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 20upx;
		box-sizing: border-box;
		background-color: #FFF;

		.shopBox {
			width: 48%;
			height: 350upx;

			.todayTjTitle {
				height: 60rpx;
				margin-top: 20upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					font-size: 30upx;
					color: #333;
					font-weight: 700;
				}

				.right {
					font-size: 24upx;
					padding: 10upx 20upx;
					border: 1px solid;
					border-radius: 30upx;
				}
			}

			.shopTitleName {
				font-size: 26upx;
			}

			.shopInfoBox {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.shopbox {
					margin-top: 20rpx;
					width: 48%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;

					.textBox {
						display: flex;

						.priceNow {
							font-size: 30upx;
							color: #000;
							font-weight: 700;
						}

						.fh {
							font-size: 25upx;
							font-weight: 600;
						}
					}

					.priceOld {
						font-size: 24upx;
						color: #999;
						text-decoration: line-through;
					}
				}
			}
		}
	}

	.shopBox2 {
		width: 100%;

		.todayTjTitle {
			margin-top: 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				font-size: 30upx;
				color: #333;
				font-weight: 700;
			}

			.right {
				font-size: 24upx;
				padding: 10upx 20upx;
				border: 1px solid;
				border-radius: 30upx;
			}
		}

		.shopTitleName {
			font-size: 26upx;
		}

		.shopInfoBox {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.shopbox {
				width: 48%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;

				.textBox {
					display: flex;

					.priceNow {
						font-size: 30upx;
						color: #000;
						font-weight: 700;
					}

					.fh {
						font-size: 25upx;
						font-weight: 600;
					}
				}

				.priceOld {
					font-size: 24upx;
					color: #999;
					text-decoration: line-through;
				}
			}
		}
	}

	.buy-img {
		width: 100%;
		height: 215upx;

		image {
			width: 100%;
			height: 100%;
			display: block;
			border-radius: 20upx;
		}
	}

	.buy-img2 {
		width: 100%;
		height: 290upx;

		image {
			width: 100%;
			height: 100%;
			display: block;
			border-radius: 20upx;
		}
	}

	// 限时抢购区域
	.buy-limit {

		margin: 20rpx;
		padding: 0 22upx;
		background-color: $uni-bg-color;
		border-radius: 20upx;
		box-sizing: border-box;

		.buy-title {
			padding-top: 17upx;
			padding-bottom: 17upx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			image {
				width: 38upx;
				height: 38upx;
			}

			.left {
				display: flex;
				align-items: center;

				.timeBox {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					.numBox {
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						background-color: #ff5b70;
						width: 50upx;
						height: 50upx;
						border-radius: 10upx;

						.txt {
							font-size: 28upx;
							color: #fff;
						}
					}

					.spliceTxt {
						margin: 0 5upx;
						font-size: 28upx;
						color: #ff5b70;
					}
				}
			}

			.right {
				display: flex;
				align-items: center;
			}

			.time {
				//人气好货
				padding: 5upx;
				font-size: 17upx;
				width: 120upx;
				height: 42upx;

				text-align: center;
				background: #FF5B70;

				color: #ffffff;
				border-radius: 10upx;
				z-index: 1;
			}
		}

		//抢购商品内容区
		.buy-content {
			margin-top: 20upx;
			padding-bottom: 20upx;
			flex-direction: row;
			width: 100%;
			overflow: hidden;
			white-space: nowrap;

			// 单个商品区域
			.buy-shop {
				width: 40%;
				align-items: center;
				margin-right: 30upx;
				display: inline-block;



				.buy-name {
					display: inline-block;
					width: 100%;
					// height: 42upx;
					font-size: 24upx;
					text-align: left;
					// font-weight: 600;
					overflow: hidden;
					word-break: break-all;
					/* break-all(允许在单词内换行。) */
					text-overflow: ellipsis;
					/* 超出部分省略号 */
					// display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
					-webkit-box-orient: vertical;
					/** 设置或检索伸缩盒对象的子元素的排列方式 **/
					-webkit-line-clamp: 1;
					/** 显示的行数 **/

				}


			}
		}
	}

	.shop-price {
		display: flex;
		justify-content: flex-start;
		line-height: 30upx;
		align-items: center;

		.text {
			font-size: 28upx;
			color: #666666;
		}

		.text2 {
			flex: 1;
			font-size: 28upx;
			color: #666666;
		}



	}


	.num {
		margin-top: 20upx;
		color: #F47f47;
		font-size: 20upx;
		// font-weight: 700;
	}

	// 猜你喜欢
	.shopsBox {
		
		background-color: #fff;
		width: 100%;
		// margin-left: 20rpx;
		// margin-right: 20rpx;
		// margin-top: 30rpx;
		margin-bottom: 16rpx;
		border-radius: 24rpx;
	}

	.shopTitle {
		width: 100%;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		.shopTitleTxt {

			font-weight: bold;
		}

		.smillBox {
			width:  194rpx;
			
			height: 2upx;

			background-color: #ccc;
		}

		.bigBox {
			width: 30upx;
			height: 30upx;
			border-radius: 50%;
			background-color: #e1e1e1;
			margin: 0 20upx;
		}
	}

	.tj2 {
		text-decoration: line-through;
		color: #999999;
		margin-top: 20upx;
		font-size: 20upx;

	}

	.tj {
		
		color: #999999;
		
		font-size: 20upx;
		
	}

	.tj2 {

		text-decoration: line-through;
		color: #999999;
		margin-left: 5upx;
		font-size: 28upx;
		text-align: left;
		flex: 1;



	}

	.redPack {
		display: flex;
		justify-content: center;
		// margin-bottom: 20upx;
		// margin-top: 20upx;

		image {
			width: 690upx;
			height: 180upx;
		}
	}



	.xiahuaxian {
		height: 5upx;
		width: 45upx;
		background: #0AC556;
	}

	.shops {
		width: 100%;
		// margin: 0 30upx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;

		.shop {
			width: 227rpx;
			// box-shadow: 1upx 1upx 10upx 0upx #e7e7e7;
			// margin: 10upx 0;
			background: #ffffff;
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			border-radius: 18upx;

			.img_goods {
				align-items: center;
				justify-content: center;
				display: flex;
				width: 100%;
			}

			.buy-name {
				width: 100%;
				color: #333333;
				text-align: left;
				font-size: 24upx;
				margin: 10upx 0;
				font-weight: 600;
				overflow: hidden;
				word-break: break-all;
				/* break-all(允许在单词内换行。) */
				text-overflow: ellipsis;
				/* 超出部分省略号 */
				display: -webkit-box;
				/** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical;
				/** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 1;
				/** 显示的行数 **/

			}


			.shop-price2 {
				margin-bottom: 15upx;
				width: 100%;
				margin-top: 10upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				
				
			}


			>view:nth-child(2) {
				//商品名称
				font-size: 22upx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: rgba(38, 43, 63, 1);
			}

			>view:nth-child(3) {
				font-size: 18upx;
				font-family: Source Han Sans CN;

				>text:nth-child(1) {
					//热卖价
					color: #B2B3B8;
				}

				>text:nth-child(2) {
					//16.9元

				}
			}

		}
	}

	.che {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;

		// box-shadow: 0 0 10upx #A0A0A0;
		position: fixed;
		right: 40upx;
		bottom: 58upx;
		z-index: 999;

		>image {
			width: 120upx;
			height: 120upx;
			position: absolute;
			top: 20upx;
			left: 20upx;
		}
	}

	.che2 {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;

		// box-shadow: 0 0 10upx #A0A0A0;
		position: fixed;
		right: 40upx;
		bottom: 188upx;
		z-index: 999;

		>image {
			width: 120upx;
			height: 120upx;
			position: absolute;
			top: 20upx;
			left: 20upx;
		}
	}



	.buy-name {
		overflow: overlay;
		width: 167upx;
		color: #333333;
		font-size: 32upx;
		margin-left: 25%;
		margin: 10upx 0;
		text-align: center;
		display: block;
	}

	.popBox {
		background-color: rgba($color: #000000, $alpha: 0.3);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		.popInfoBox {
			// width: 497rpx;
			height: 918rpx;
			position: relative;

			.popImgBg {
				height: 100%;
			}

			.popsBox {
				position: absolute;
				top: 50%;
				margin-top: -16%;
				left: 50%;
				margin-left: -40%;
				width: 80%;
				height: 44%;
				// padding: 0 20rpx;
				// box-sizing: border-box;
				overflow: hidden;

				.popItemBox {
					width: 100%;
					height: 33%;
					position: relative;
					margin-bottom: 10rpx;
					border-radius: 20rpx;

					.popItemBg {
						width: 100%;
						height: 100%;
					}

					.tzInfoBox {
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;

						.tzInfoRight {
							width: 68%;
							height: 100%;
							margin-left: 10rpx;

							.tzName {
								font-size: 30rpx;
								color: #333333;
								// margin-top: 10rpx;
								word-break: break-word; //换行模式
								overflow: hidden;
								text-overflow: ellipsis; //修剪文字
								display: -webkit-box;
								-webkit-line-clamp: 1; //此处为上限行数
								-webkit-box-orient: vertical;
							}

							.tzdz {
								font-size: 30rpx;
								color: #999999;
								word-break: break-word; //换行模式
								overflow: hidden;
								text-overflow: ellipsis; //修剪文字
								display: -webkit-box;
								-webkit-line-clamp: 1; //此处为上限行数
								-webkit-box-orient: vertical;
							}

							.tzjl {
								font-size: 30rpx;
								color: #e80c1c;
								// margin-bottom: 10rpx;
							}
						}
					}

					.btnBg {
						width: 97%;
						height: 80%;
						background: linear-gradient(to bottom, #ee474c, #ff8d73);
						display: flex;
						flex-wrap: wrap;
						justify-content: center;
						align-items: center;
						margin: 0 10rpx;
						margin-top: 10rpx;
						border-radius: 10rpx;
					}
				}
			}

			.closeBox {
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				bottom: 0;
				margin-bottom: -15rpx;
				left: 50%;
				margin-left: -25rpx;
			}
		}
	}
</style>

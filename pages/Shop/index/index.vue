<template name='page2'>
	<!-- 商城购物 -->
	<view style="background-color: #F5F5F5;" :style="{width}">
		
		<view class="titleTxtBox">
			
			<text class="topTitlePage">{{zhuti}}</text>
			<view class="header-two" @click="goSearch()" >
				<image src="../../../static/public/whitesearch.png" class="search"></image>
				<text class="search-text"> 搜索商品</text>
			
			</view>
		</view>
		
		<image style="width: 100%;height: 387rpx;" src="https://xin.yiyunoto.com/uploads/static/shop/topbg.png">

		
			
		</image>
		<view class="lunbo">
			<swiper  circular="true" style="height: 300upx;border-radius: 10rpx; 	overflow: hidden;transform: translateY(0);" :indicator-dots="false"
			 :autoplay="true" :interval="2000" :duration="500">
				<swiper-item v-for="(item,index) in swiperImg" :key="index" style="border-radius: 10rpx;" @click="toDetail(item)">
					<image :src="url+item.img" mode="aspectFill" style="width: 100%; height: 100%; border-radius: 10rpx;"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 公告 -->
		<view >
			<uni-notice-bar :show-icon="true" :single="true" :text="gonggao" :scrollable="true" />
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
		<!-- <button class="transition-button" type="primary" @click="start">组合动画示例三</button> -->
		<!-- 切换团长 -->
	<!-- 	<view class="tzBox" v-if="leaders" @click="goSelectXQ">
			<image class="tzHead" :src='leaders.headimg' mode=""></image>
			<view class="tzInfo">
				<text class="tzName">{{leaders.truename}}</text>
			
				<text class="tzDz">{{leaders.address}}</text>
			
			</view>
			<view class="tzChangeBox">
			
				<text class="changeTzTxt">切换站点</text>
					<image class="changeTzImg" src="../../../static/public/grayright.png"></image>
			</view>
		</view>
	
		 -->

		<!-- 红包图片区 -->
		<view class="redPack" @click="goNew">
			<image :src="url+tu" mode="widthFix"></image>
		</view>

		<!-- 今日推荐 -->
		<view class="todayTjBox" v-if="newGoodsAndSell.newGoods.length>0">
			<view class="shopBox">
				<view class="todayTjTitle">
					<text class="left">新品首发</text>
					<text class="right" style="border-color: #ff5b70;color: #ff5b70;" v-if="newGoodsAndSell.newGoodsNum>100">已抢{{newGoodsAndSell.newGoodsNum}}件</text>
				</view>
				<text class="shopTitleName" style="color: #ff5b70;">每日上新,百款优质生鲜更新</text>
				<view class="shopInfoBox">
					<view class="shopbox" v-if="newGoodsAndSell.newGoods.length>0" @click="details(newGoodsAndSell.newGoods[0])">
						<image style="width: 100%;height: 160rpx;border-radius: 20rpx;" :src="url+newGoodsAndSell.newGoods[0].img" mode="scaleToFill"></image>
						<!-- <view class="textBox">
							<text class="fh">￥</text>
							<text class="priceNow">{{newGoodsAndSell.newGoods[0].nowprice}}</text>
						</view>
						<text class="priceOld">￥{{newGoodsAndSell.newGoods[0].price}}</text> -->
					</view>
					<view class="shopbox" v-if="newGoodsAndSell.newGoods.length>1" @click="details(newGoodsAndSell.newGoods[1])">
						<image style="width: 100%;height: 160rpx;border-radius: 20rpx;" :src="url+newGoodsAndSell.newGoods[1].img" mode="scaleToFill"></image>
						<!-- <view class="textBox">
							<text class="fh">￥</text>
							<text class="priceNow">{{newGoodsAndSell.newGoods[1].nowprice}}</text>
						</view>
						<text class="priceOld">￥{{newGoodsAndSell.newGoods[1].price}}</text> -->
					</view>
				</view>
			</view>
			<view class="shopBox">
				<view class="todayTjTitle">
					<text class="left">销量最高</text>
					<!-- <text class="right" style="border-color: #81d38c;color: #81d38c;">已抢{{newGoodsAndSell.maxGoodsNum}}件</text> -->
				</view>
				<text class="shopTitleName" style="color: #81d38c;">销量最高,百款优质生鲜更新</text>
				<view class="shopInfoBox">
					<view class="shopbox" v-if="newGoodsAndSell.maxGoods.length>0" @click="details(newGoodsAndSell.maxGoods[0])">
						<image style="width: 100%;height: 160rpx; border-radius: 20rpx;" :src="url+newGoodsAndSell.maxGoods[0].img" mode="scaleToFill"></image>
					</view>
					<view class="shopbox" v-if="newGoodsAndSell.maxGoods.length>1" @click="details(newGoodsAndSell.maxGoods[1])">
						<image style="width: 100%;height: 160rpx;border-radius: 20rpx;" :src="url+newGoodsAndSell.maxGoods[1].img" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
			<!-- 		<view class="shopBox2">
				<view class="todayTjTitle">
					<text class="left">团长热推</text>
					<text class="right" style="border-color: #f1bb72;color: #f1bb72;">已抢1127件</text>
				</view>
				<text class="shopTitleName" style="color: #f1bb72;">今日爆款,1000+团长推荐</text>
				<view class="shopInfoBox">
					<view class="shopbox">
						<image style="width: 100%;" src="../../../static/shop/xg.png" mode="widthFix"></image>
					</view>
					<view class="shopbox">
						<image style="width: 100%;" src="../../../static/shop/jd.png" mode="widthFix"></image>
					</view>
				</view>
			</view> -->

		</view>
		<view class="buy-limit" v-if="leadersProducts.length>0">
			<!--团长推荐 -->
			<view class="buy-title">
				<view class="left">

					<text style="margin-left: 20upx;margin-right: 20upx; font-size: 35upx;font-weight: 700;">团长热推</text>

					<!-- 	<text style="margin-left: 20upx;margin-right: 20upx; font-size: 35upx;font-weight: 700;">显示秒杀</text>
		
							<text style="margin-left: 20upx;margin-right: 20upx; font-size: 35upx;font-weight: 700;">团长热推</text>
		-->
					<!-- 倒计时 -->

				</view>
				<!-- <view class="right">
					<text style=" font-size: 26upx;color: #999999; float: right;margin-right: 12upx;" @click="goMore">查看更多</text>
					<image src="../../../static/home/right.png" mode="widthFix" style="width: 10upx;height: 10upx;"></image>
				</view> -->
			</view>
			<!-- 循环内容区 -->
			<scroll-view class="buy-content" scroll-x="true">
				<view class="buy-shop" v-for="(item, index) in leadersProducts" :key="index" @click="details(item)">
					<view class="buy-img">
						<image :src="url+item.img" mode="aspectFill"></image>
					</view>
					<text class="buy-name">{{ item.name }}</text>
					<view class="shop-price">
						<text class="text">月售</text>
						<text class="text2">{{item.total_sales}}</text>
						<view class="text">仅剩</view>
						<text class="text">{{item.stock}}份</text>
					</view>
					<view class="shop-price">
						<text class="num">￥{{ item.nowprice }}</text>
						<view style="flex: 1;"></view>
						<image src="../../../static/shop/car1.png" style="width: 50upx;height: 50upx;margin-top: 20upx;" @click.stop="buy(item)"></image>
					</view>
				</view>
			</scroll-view>
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
						<image src="../../../static/shop/jian.png" style="width: 31rpx;height: 33rpx;"></image>
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
						<image src="../../../static/shop/jian.png" style="width: 31rpx;height: 33rpx;"></image>
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
				<!-- <image :src="url+'/uploads/static/shop/tj.png'" style="width: 420rpx;height: 89rpx;"></image> -->
				<view class="smillBox"></view>
				<view class="bigBox"></view>
				<text class="shopTitleTxt" style="color: #000;">为你</text>
				<text class="shopTitleTxt" style="color: #f7322c;">推荐</text>
				<view class="bigBox"></view>
				<view class="smillBox"></view>
			</view>
			<view class="shops">
				<view class="shop" v-for="(item,index) in shops" :key="index" @click="details(item)">
					<view class="img_goods">
						
						<image :src="url+item.img" mode="scaleToFill" style="position: absolute;top: 10rpx;left: 15rpx; width: 320upx;height: 390upx;border-radius: 20upx;"
						 lazy-load="true"></image>
						 <!-- <image :src="url+'/uploads/static/shop/kuang.png'" style="position: absolute;top: 0;left: 0; width: 100%;height: 100%;"> </image> -->
					
					</view>
					
					<view class="goods-title">{{ item.name }}</view>
					<!-- <view style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;width: 100%;">
						<text style="font-size: 26rpx;color: #999;width: 100%;">今日已售{{ item.total_sales }}</text>
						<image src="../../../static/shop/car1.png" style="width: 50upx;height: 50upx;margin-right: 10rpx;" @click.stop="buy(item)"></image>

					</view> -->
					<view class="shop-price2">
						<view style="margin-left: 10rpx;">
							<text class="num" style="font-weight: 700;font-size: 28upx;">￥</text>
							<text class="num" style="font-weight: 700;">{{parseInt(item.nowprice)  }}</text>
							<text class="tj">￥{{parseInt(item.price)  }}</text>
						</view>
						<view class="btn">立即购买</view>
						
					</view>
				</view>
			</view>
		</view>


		<view class="che" @click="notarize">
			<text v-if="carNum>0" style="position: absolute;z-index: 999;text-align: center;top: 24upx;right: 0upx; width: 32rpx;height: 32rpx;border-radius: 16rpx;background: #FF3B30; color: #ffffff;font-size: 22rpx;">{{carNum}}</text>
			<image src="../../../static/shop/car.png" mode=""></image>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="che2" v-if="isshow">
			<image :src="url+hb" mode="" @click="mapa"></image>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view class="che2">
			<image :src="url+hb" mode="" @click="mapa"></image>
		</view>
		<!-- #endif -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<!-- #ifdef APP-PLUS -->
		<view class="popBox" :style="{width,height}" v-show="popShow" @touchmove.stop.prevent>
			<!-- #endif -->
			<!-- #ifndef APP-PLUS -->
			<view class="popBox" :style="{width,height}" v-if="popShow" @touchmove.stop.prevent>
				<!-- #endif -->

				<view class="popInfoBox">
					<image class="popImgBg" mode="heightFix" src="https://xin.yiyunoto.com/uploads/static/home/popBoxBg.png"></image>
					<view class="popsBox">
						<view class="popItemBox" v-for="(item,index) in liveTz" :key="index" @click="selectedTz(index)">
							<image class="popItemBg" src="https://xin.yiyunoto.com/uploads/static/home/popItemBg.png"></image>
							<view class="tzInfoBox">
								<image style="width: 125rpx;height: 130rpx;border-radius: 20rpx;" :src="item.headimg"></image>
								<view class="tzInfoRight">
									<text class="tzName">{{item.truename}}</text>
									<text class="tzdz">{{item.address}}</text>
									<text class="tzjl">{{item.distance}}</text>
								</view>
							</view>
						</view>
						<view class="popItemBox btnBox" @click="goSelectXQ">
							<image class="popItemBg" src="https://xin.yiyunoto.com/uploads/static/home/popItemBg.png"></image>
							<view class="tzInfoBox btnBg">
								<text class="btnTxt" style="font-size: 38rpx;font-weight: 700;color: #FFFFFF;">点击选择更多自提点</text>
							</view>
						</view>
					</view>

					<image @click="closePop" class="closeBox" src="../../../static/shop/close.png"></image>
				</view>
			</view>
			<uni-transition :duration="500" :mode-class="modeClass" style="position: fixed;top: 200rpx;left: 30rpx;" :show="transShow"
			 @click="onTap" @change="change">
				<text class="box">{{s}}</text>
			</uni-transition>
		</view>
</template>

<script>
	// var util = require('../../../common/util.js');
	import uniTransition from "@/components/uni-transition/uni-transition.vue"
	import uniPopupDialog from '../../../components/uni-popup/uni-popup-dialog2.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	// import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import request from '../../../store/http.js';
	import amap from '../../../common/amap-wx.js';
	var bitmap = null;
	export default {
		components: {
			uniPopupDialog,
			uniTransition
			// uniNoticeBar
		},
		data() {
			return {
				s: '最新订单来自',
				showSearch: false,
				hb: '/uploads/static/home/hb.gif',
				tu: '/uploads/static/xinren.png',
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
				loadingType: 1, //0可以加载更多
				width: '',
				height: '',
				limitProduct: null,
				newGoodsAndSell: {
					newGoods: [],
					maxGoods: []
				},
				popShow: false, // 弹窗显示
				liveTz: [], //距离最近的两个团长
				minutes: "59",
				carNum:0,
				seconds: "59",
				hours: "23",
				transShow: false,
				modeClass: ['fade'],
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

		onLoad() {
			// #ifdef APP-PLUS
			bitmap = new plus.nativeObj.Bitmap('bmp1');
			bitmap.loadBase64Data(
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGNDI0NkU4MEIwM0IxMUVBQjlERDk4NzlFQ0QzNjBGRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGNDI0NkU4MUIwM0IxMUVBQjlERDk4NzlFQ0QzNjBGRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY0MjQ2RTdFQjAzQjExRUFCOUREOTg3OUVDRDM2MEZEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY0MjQ2RTdGQjAzQjExRUFCOUREOTg3OUVDRDM2MEZEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kK9vxgAAEdtJREFUeNrcXQlsHNUZ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',
				function() {},
				function(e) {});
			this.createtab();

			// this.checkVersionClick();
			// #endif
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
					icon.show();
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
			toDetail(item){
				if(item.url)
				uni.navigateTo({
					url:"../../My/xieyi/xieyi?src="+item.url
				})
			},
				getCarNum() {
				var authtoken = uni.getStorageSync("authtoken")
				if(!authtoken)return;
				request	.urlRequest(
				this.url+'/api/cart/get',{
					
				},{authtoken: authtoken},'POST',res=>{
					if(res.data.code==1){
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
				// this.popShow = true;

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
								// if (!token || !l) {
								// 	if (this.liveTz.length > 0)
								// 		this.popShow = true;
								// 	else {
								// 		this.popShow = false;
								// 	}
								// } else {
									this.popShow = false;
								// }
							}
							// #endif
							// #ifndef APP-PLUS
							// if (!token || !l) {
							// 	if (this.liveTz.length > 0)
							// 		this.popShow = true;
							// }
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
						if(res.data.code==1){
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
				uni.navigateTo({
					url: '/pages/Shop/shop_car/index',
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
				// if( value.id==1){
				// uni.navigateTo({
				// 	url: '/mall/index/index'
				// })	
				// }else
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
	.btn{
		width: 112rpx;
		height: 33rpx;
		background: #FFE1BC;
		opacity: 1;
		margin-right: 10rpx;
		line-height: 33rpx;
		font-size: 18rpx;
		text-align: center;
		font-weight: bold;
		color: #F20F13;
		border-radius: 8rpx;

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
		height:387rpx;
		// border-radius: 10%;
		// background-color: $uni-bg-color-top;
		background-image: url(https://xin.yiyunoto.com/uploads/static/shop/topbg.png);
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		plain: true;
		outline: none;
		border: none;
		// background: linear-gradient(135deg, #FF6178 0%, #FF502E 100%);
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
		flex-direction: column;
		padding-top: var(--status-bar-height);
		padding-bottom: 10upx;
		
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: url(https://xin.yiyunoto.com/uploads/static/shop/topbg.png);
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		plain: true;
		outline: none;
		border: none;
		// background: linear-gradient(135deg, #FF6178 0%, #FF502E 100%);
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
		margin-top: -180rpx;
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
		height:26upx;
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
					height: 42upx;
					font-size: 32upx;
					text-align: left;
					font-weight: 700;
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
		color: #FE1722;
		font-size: 28upx;
		font-weight: 700;
	}

	// 猜你喜欢
	.shopsBox {

		background-color: #fff;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 30rpx;
		margin-bottom: 30tpx;
		border-radius: 20rpx;
	}

	.shopTitle {
		width: 100%;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		.shopTitleTxt {
			font-size: 40upx;
			font-weight: 900;
		}

		.smillBox {
			width: 20upx;
			height: 20upx;
			border-radius: 50%;
			background-color: #e1e1e1;
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
		text-decoration: line-through;
		color: #999999;
		width: 90%;
		font-size: 20upx;
		text-align: left;
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
		margin-bottom: 20upx;
		margin-top: 20upx;

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
		.goods-title {
				width: calc(100% - 20rpx);
				color: #333;
				text-align: left;
				margin-left: 10rpx;
				margin-right: 10rpx;
				font-size: 30upx;
				// padding: 10rpx;
				font-weight: 700;
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
	.shops {
		// margin: 0 30upx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;

		.shop {
			
			width: 349rpx;
		
			// box-shadow: 1upx 1upx 10upx 0upx #e7e7e7;
			margin: 10upx 0;
			// background: #C50405;
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			border-radius: 20upx;

			.img_goods {
				position: relative;
				// background-image: url(../../../static/shop/kuang.png);
				// align-items: center;
				// justify-content: center;
				// background-position: center;
				// background-size: contain;
				// background-repeat: no-repeat;
				// plain: true;
				// outline: none;
				// border: none;
				display: flex;
				height: 410rpx;
				width: 349rpx;
			}

			


			.shop-price2 {
				margin-bottom: 15upx;
				width: 100%;
				margin-top: 10upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				line-height: 30upx;

				.text {
					font-size: 24upx;
					color: #666666;
				}

				.text2 {
					flex: 1;
					font-size: 24upx;
					color: #666666;
				}

				.num {

					color: #F20F13;
					font-size: 36upx;

				}

				.tj {

					text-decoration: line-through;
					color: #999;
					margin-left: 5upx;
					font-size: 28upx;
					text-align: left;
					flex: 1;
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

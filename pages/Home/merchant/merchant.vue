<template>
	<view class="content" :style="{width:width,height:height}">
		<view class="top">
			<view style="width: 50rpx;height: 50rpx;margin-left: 20rpx;" @click="backPage">
				<image style="width: 19rpx;height: 34rpx;" src="../../../static/public/goBack.png"></image>
			</view>
			<text class="title">店铺详情</text>
			<view style="width: 50rpx;height: 50rpx;margin-right: 20rpx;"></view>
		</view>
		<scroll-view :scroll-y="true" class="container">
			<view class="zhanwei">

			</view>
			<view class="info">
				<view style="width: 100%;display: flex;flex-direction: row;">
					<image :src="url+shopinfo.logo" style="width: 160rpx;height: 160rpx;margin-left: 4rpx;"></image>
					<view style="display: flex;flex-direction: column;margin-left: 24rpx;flex: 1;">
						<view class="name">{{shopinfo.name}}</view>
						<view class="x">
							<rate :value="shopinfo.star" :size="14"></rate>
							<text class="rage">￥{{shopinfo.average}}/人 </text>
						</view>
						<view class="moreInfo">
							<text class="moreTxt">营业中 {{shopinfo.worktime}} </text>

						</view>
					</view>

				</view>
				<view style="display: flex;flex-direction: row;margin-top: 30rpx;align-items: center;height: 80rpx;">
					<image src="../../../static/video/location_red.png" style="width: 32rpx;height: 32rpx;"></image>
					<text class="introduce">{{shopinfo.addrmore}}</text>

					<image class="serviceImg" src="../../../static/shop/uncollect.png" @click="colletShop()" v-show="!isCollect"></image>
					<image class="serviceImg" src="../../../static/shop/collect.png" @click="colletShop()" v-show="isCollect"></image>
					<image class="serviceImg" src="../../../static/public/phone.png" @click="call"></image>

				</view>

			</view>

			<view class="titless">
				<view @click="select(0)" class="t">

					<view :class="[i==0?'selectTitle':'unSelectTitle']">优惠</view>
					<view :class="[i==0?'showImg':'unshowImg']"></view>

				</view>
				<view @click="select(1)" class="t">
					<view :class="[i==1?'selectTitle':'unSelectTitle']">套餐</view>
					<view :class="[i==1?'showImg':'unshowImg']"></view>
				</view>
				<view @click="select(2)" class="t">
					<view :class="[i==2?'selectTitle':'unSelectTitle']">评价</view>
					<view :class="[i==2?'showImg':'unshowImg']"></view>
				</view>
			</view>
			<scroll-view :scroll-x="true" class="alonePayScroll" :enable-flex="true" v-if="comGoods.length>0">
				<view class="alonePayItem" v-for="(item,i) in comGoods" :key="i" @click="addCart(item)">
					<image class="img" :src="url+item.img"></image>
					<text class="goodsName">{{item.name}}</text>
					<view style="font-size: 24rpx;color: #999;	margin-left: 24rpx;margin-top: 8rpx;margin-bottom: 9rpx;">
						今日已售{{item.stock}}份
					</view>
					<view class="buyBox" >
						<view style="font-size: 36rpx;color:  #FF2B10 ;	margin-left: 24rpx;font-weight: bold;">￥{{item.nowprice}}</view>
						<!-- <view style="font-size: 26rpx;color: #999;">￥{{item.price}}</view> -->
						<view class="btn">抢购</view>
					</view>
				</view>
			</scroll-view>
			<view  class="taocan">
				<image src="../../../static/shop/tuan.png"  style="width: 39rpx;height: 39rpx;margin-left: 26rpx;"></image>
				<view style="font-size: 36rpx;color: #333;margin-left: 20rpx;font-weight: bold;"> 到店套餐</view>
			</view>
			<view class="item" v-for="(item,i) in goods" :key="i" @click="goDetail(i)">
				<image :src="url+item.img" style="width: 160rpx;height: 160rpx;border-radius: 10rpx;"></image>
				<view class="right">
					<view class="goodsName">{{item.name}}</view>
					<view style="font-size: 24rpx;color: #999;margin-left: 24rpx;">{{item.desc}}</view>
					<view style="font-size: 24rpx;color: #999;margin-left: 24rpx;margin-top: 8rpx;margin-bottom: 13rpx;">今日已售{{item.stock}}份</view>
					<view class="buyBox" >
						<view style="font-size: 36rpx;color:  #FF2B10 ;	margin-left: 24rpx;font-weight: bold;">￥{{item.nowprice}}</view>
						<view style="font-size: 26rpx;color: #999;text-decoration: line-through;">￥{{item.price}}</view>
						<view class="btn">抢购</view>
					</view>
				</view>
			</view>
			<view style="font-size: 36rpx;color: #333;margin-left: 20rpx;font-weight: bold;padding-top: 30rpx;padding-bottom: 30rpx;margin-top: 20rpx;"> 评价</view>
			<view style="width: 100%;height: 200rpx;text-align: center;line-height: 200rpx;">暂无评价</view>
		
		</scroll-view>
		<view class="che" @click="goCar">
			<text v-if="num>0" style="position: absolute;z-index: 999;text-align: center;top: 24upx;right: 0upx; width: 32rpx;height: 32rpx;border-radius: 16rpx;background: #FF3B30; color: #ffffff;font-size: 22rpx;">{{num}}</text>
			<image src="../../../static/shop/car.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import rate from '../../../components/uni-rate/uni-rate.vue'
	import request from "../../../store/http.js"
	export default {
		components: {
			rate
		},
		data() {
			return {
				num:0,
				i: 0,
				width: '',
				height: '',
				isCollect: false,
				url: this.$store.state.url,
				comGoods: [],
				goods: [],
				shopId: null,
				shopinfo: null,

			}
		},
		onLoad(data) {
			// 获取视口宽高
			let {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.width = windowWidth;
			this.height = windowHeight;


			this.shopId = data.shopId;
			this.getShopsDetil();

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
			this.shopCarList();
		},
		methods: {
			goCar(){
				uni.navigateTo({
					url:"../car/car?shopId="+this.shopId
				})
			},
			// 请求购物车商品列表
			shopCarList() {
				this.num=0;
				var authtoken = uni.getStorageSync("authtoken")
			
				request.urlRequest(
					this.url + '/api/guangjie/get', {
						shopid: this.shopId
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
			
						
			
						if (res.data.data){
							for (let i = 0; i < res.data.data.length; i++) {
							
								this.num += res.data.data[i].num;
							}
							
						}
			
					
						
						
			
			
			
			
					}
				);
			},
			goDetail(i){
				uni.navigateTo({
					
					url:'../storDetails/storeDetails?index=' + i +'&shopId='+this.shopId+ '&data=' + encodeURIComponent(JSON.stringify(this.goods)),
					fail(e) {
						console.log(e)
					}
					
				})
			},
			select(index) {
				this.i = index;
				if(index==1){
					uni.createSelectorQuery().select(".content").boundingClientRect(data=>{//目标节点
					　　uni.createSelectorQuery().select(".taocan").boundingClientRect((res)=>{//最外层盒子节点
					　　
					uni.pageScrollTo({
					　　　　　　duration:0,//过渡时间必须为0，uniapp bug，否则运行到手机会报错
					　　　　　　scrollTop:res.top - data.top,//滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
					　　　　})
					　　}).exec()
					}).exec();
				}
			},
			backPage() {
				uni.navigateBack({
					delta: 1
				})
			},

			// 获取套餐
			getGoods() {
			
				request.urlRequest(
					this.url + '/api/guangjie/getIndexProduct', {
						shopid: this.shopId
					}, {},
					'POST',
					res => {
						uni.hideLoading();
						this.goods = res.data.data.product; //商家详情

					}
				);

			},
			//收藏商品
			colletShop() {

				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + "/api/member/setCollectStatus", {
					type: 1,
					referer_id: this.shopId,
					modular_id: this.shopinfo.modular_id
				}, {
					authtoken: authtoken
				}, "POST", res => {
					if (res.data.code == 1) {
						this.isCollect = !this.isCollect;
						this.isRefreshPrePage();
					} else {

						uni.showToast({
							title: res.data.mag,
							icon: "none"
						})
					}
				})
			},
			isRefreshPrePage() {

				// #ifdef MP-WEIXIN
				let pages = getCurrentPages();
				let prePage = pages[pages.length - 2];
				prePage.setData({
					refresh: true
				})

				// #endif
				// #ifdef APP-PLUS
				uni.$emit("handleFun", {
					refresh: true
				});
				// #endif
			},
			call() {

				uni.makePhoneCall({
					phoneNumber: this.shopinfo.phone + "",
					fail(res) {
						console.log("eee", res)
					}
				})
			},
			// 添加购物车
			addCart(data) {

				var authtoken = uni.getStorageSync("authtoken")

				request.urlRequest(
					this.url + '/api/guangjie/addcart', {
						id: data.id,
						num: 1
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
						})
						if (res.data.code == 1) {
							// this.goDetail(data.id);
							this.shopCarList();
						} 
					}
				);
			},
			// 获取优惠
			getCommonProduct() {

				request.urlRequest(
					this.url + '/api/guangjie/getCommonProduct', {
						shopid: this.shopId
					}, {},
					'POST',
					res => {
						uni.hideLoading();
						this.comGoods = res.data.data.product; //商家详情

					}
				);

			},
			// 获取店铺详情
			getShopsDetil() {
				uni.showLoading({

				})
				var authtoken = uni.getStorageSync("authtoken")
				let head = {}
				if (authtoken) {
					head = {
						authtoken: authtoken
					}
				}
				request.urlRequest(
					this.url + '/api/guangjie/shopye', {
						id: this.shopId
					}, head,
					'POST',
					res => {
						this.isCollect = res.data.data.collect == 1;
						this.shopinfo = res.data.data.shopinfo[0]; //商家详情
						this.getGoods();
						this.getCommonProduct();
					}
				);

			},

		}
	}
</script>

<style scoped lang="less">
	.taocan{
		display: flex;flex-direction: row;padding-top: 32rpx;padding-bottom: 32rpx;align-items: center;
	}
	.che {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
	
		// box-shadow: 0 0 10upx #A0A0A0;
		position: fixed;
		right: 40upx;
		bottom: 158upx;
		z-index: 999;
	
		>image {
			width: 120upx;
			height: 120upx;
			position: absolute;
			top: 20upx;
			left: 20upx;
		}
	}
	.item{
		display: flex;
		flex-direction: row;
		margin-left: 24rpx;
		margin-right: 24rpx;
		padding-bottom: 24rpx;
		border-bottom: 1rpx solid #eeeeee;
	}
	.content {
		background-color: #FfFfff;

	}
	.right{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
.buyBox{
		
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.alonePayScroll {
		width: 100%;
		height: 574rpx;
		padding-top: 32rpx;
		display: flex;
		flex-direction: row;
	}

	.t {
		display: flex;

		margin-right: 32rpx;


		align-items: center;
		justify-content: center;
		flex-direction: column;

	}

	.showImg {
		width: 48rpx;
		height: 4rpx;
		background: #FF2B10;
		border-radius: 3px;

		margin-top: 13rpx;
		opacity: 1;
	}

	.unshowImg {
		width: 48rpx;
		height: 4rpx;
		background: #FF2B10;
		border-radius: 3px;

		margin-top: 13rpx;
		opacity: 0;
	}

	.selectTitle {
		font-size: 36rpx;
		font-weight: bold;
		color: #FF2B10;
	}

	.unSelectTitle {
		font-size: 30rpx;
		font-weight: 600;
		color: #333;
	}

	.container {

		width: 100%;
		height: 100%;
		display: flex;

		flex-direction: column;
		align-items: center;

	}

	.titless {
		flex-direction: row;
		display: flex;
		margin-top: 28rpx;
		/* //距离销量评价 */
		margin-left: 32upx;
		width: 100%;
		background: #f5f5f5;
		height: 120rpx;
		align-items: center;

	}

	.info {
		padding: 20rpx;
		margin-top: -120rpx;
		margin-left: 24rpx;
		margin-right: 24rpx;
		height: 303rpx;
		background: #FFFFFF;
		box-shadow: 0px 2rpx 16rpx 0px rgba(0, 0, 0, 0.23);
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
	}

	.zhanwei {
		height: 295rpx;
		width: 100%;
		background: linear-gradient(133deg, #FF6178 0%, #FF502E 100%);
	}

	.top {
		position: fixed;
		top: 0;
		z-index: 99;
		padding-top: var(--status-bar-height);
		width: 100%;
		align-items: center;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		background: linear-gradient(133deg, #FF6178 0%, #FF502E 100%);
	}

	.title {
		font-size: 36rpx;
		color: #FFFFFF;
		font-weight: 700;
	}

	.moreInfo {
		width: 100%;
		height: 50rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.moreTxt {
		font-size: 28rpx;
		color: #999999;
	}

	.x {
		margin-top: 20rpx;
		align-items: center;
		display: flex;
		flex-direction: row;
	}

	.rage {
		font-size: 26rpx;
		color: #333;
	}

	.introduce {
		flex: 1;
		font-size: 28rpx;
		margin-left: 15rpx;
		margin-right: 30rpx;
		font-size: 26rpx;
		color: #333;
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-line-clamp: 2; //此处为上限行数
		-webkit-box-orient: vertical;
	}

	.name {
		display: inline-block;
		width: 100%;
		height: 42rpx;
		font-size: 36upx;
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

	}

	.serviceImg {
		margin-right: 24rpx;
		width: 44rpx;
		height: 44rpx;
	}

	.alonePayItem {
		display: flex;
		width: 346rpx;
		height: 510rpx;
		flex-direction: column;
		margin-left: 20rpx;

		box-shadow: 0px 4rpx 20rpx 0px rgba(0, 0, 0, 0.16);
		border-radius: 16rpx;
	}

	.img {
		width: 346rpx;
		height: 346rpx;
	}

	.goodsName {
		margin-left: 24rpx;
		font-weight: bold;
		color: #333333;
		font-size: 30rpx;
	}
	.btn{
		margin-right: 20rpx;
		width: 120rpx;
		height: 54rpx;
		background: #FF2B10;
		border-radius: 44rpx;
		line-height: 54rpx;
		font-size: 30rpx;
		text-align: center;
		color: #fff;
	}
</style>

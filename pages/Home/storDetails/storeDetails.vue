<template>
	<view class="box" :style="{width:width+'px',height:height+'px',backgroundColor:'#f4f4f4'}">

		
		<scroll-view scroll-x="true" style="width: 100%;white-space: nowrap;padding-left: 40rpx;padding-right: 40rpx;">
			<view class="t" v-for="(item,index) in goodsList " :key="index" @tap="select(index)">

				<view :class="[i==index?'selectTitle':'unSelectTitle']">{{item.name}}</view>
				<view :class="[i==index?'showImg':'unshowImg']"></view>

			</view>


		</scroll-view>
		<swiper style="display: flex;flex: 1;" @change="change">
			<swiper-item v-for="(product,index) in goodsList " :key="index">
				<scroll-view scroll-y="true">
				<view class="shopDiscountBox">
					<view class="shopDiscountTop">
						<text class="title">{{product.name}}</text>
						<image :src="url+product.img" style="width: 689rpx;height: 390rpx;margin-left: 10rpx;"></image>
						<view class="introduceBox">
							<text class="introduceTxt">￥{{product.nowprice}}</text>
							<text class="price2">￥{{product.price}}</text>

							<image class="serviceImg" src="../../../static/shop/uncollect.png" @click="colletShop()" v-show="!isCollect"></image>
							<image class="serviceImg" src="../../../static/shop/collect.png" @click="colletShop()" v-show="isCollect"></image>

							<!-- #ifdef MP-WEIXIN -->
							<button open-type="share" class="btnshare">
								
							</button>

							<!-- #endif -->
							<!-- #ifdef APP-PLUS -->
							<image src="../../../static/xiangqing/fen.png" style="width:34upx ;height: 38upx;margin-left: 16rpx;
							margin-right: 24rpx;" mode="widthFix" @click="share"></image>
							<!-- #endif -->

							<!-- <text class="introduceTxt">已售  168</text> -->
						</view>
					</view>
					<view class="setMeal">
						
						
							<view class="title">
								套餐详情
							</view>
							<rich-text :nodes="getDesc(product.desc)"  style="width: '100%';margin-left: 24rpx;"></rich-text>
						
					</view>	
					<!-- 头部店铺信息 -->
						<view class="setMeal" >
							<text class="title">适用商户</text>
							<view class="marketBox">
								<image class="marketImg" :src="url+shopinfo.logo"></image>
								<view class="marketInfoBox">
									<text class="marketName">{{shopinfo.name}}</text>
									<view class="x">
										<rate :value="shopinfo.star" :size="14"></rate>
										<text class="rage">￥{{shopinfo.average}}/人 </text>
										
									</view>
								</view>
								<image src="../../../static/public/phone.png" style="width: 44rpx;height: 44rpx;margin-right: 20rpx;"></image>
							</view>
						</view>
				<view class="jiao">
					<view class="aaa">
						<text class="introduceTxt">￥{{product.nowprice}}</text>
						<text class="price3">￥{{product.price}}</text>
						
						
					</view>
					<view class="bbbb">
						
						<view class="jiao-c" @click="addCart(product.id)" >
							<text style="font-size: 36rpx;font-stretch: normal;color: #fff;">加入购物车</text>
						</view>
						<view class="jiao-x" @click="buy" >
							<text style="font-size: 36rpx;font-stretch: normal;color: #ffffff;">立即购买</text>
						</view>
						
					</view>
				</view>
				</view>
				</scroll-view>
			</swiper-item>

		</swiper>
	
			

		<!-- 底部页面 -->
		
		<!-- 	<view class="amount">
			<view class="amount_l" @click="call">
				<image src="../../../static/home/call.png" mode=""></image>
				<view>联系商家</view>
			</view>
			
			
			<view class="amount_m">
				<view style="width: 81rpx;height: 100%;display: flex;align-items: center;position: relative;" >
					<image style="width: 81rpx;" src="../../../static/home/shopcart.png" mode="widthFix" @tap.stop="toggleSpec"></image>
					<view style="width: 40rpx;height: 40rpx;border-radius: 50%;background-color: #FFFFFF;
					  position: absolute;right: -25%;top: 10rpx;display: flex;flex-direction: row;justify-content: center;align-items: center;">
						<text style="color: #f31f00;font-size: 30rpx;">{{mon.num}}</text>
					</view>
				</view>
				<view style="display: flex;flex-direction: column;align-items: flex-start;justify-content: center;margin-left: 30rpx;">
					<view>
						<text style="font-size: 30rpx;">￥{{mon.moneys}}</text>
					</view>
					
				</view>
			</view>
			<view class="amount_r" @click="orderCreate">
				去结算
			</view>
		</view> -->


		<!--弹出框 -->
		<view class="popup" :class="specClass" @touchmove.stop.prevent="discard" @tap="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view style="width: 100%;justify-content: space-between;display: flex;flex-direction: row; height: 50rpx; align-items: center;font-size: 26rpx;color: #666666;">
					<view> 已选商品</view>
					<view style="width: 120rpx;" @click="clearCart"> 清空</view>
				</view>
				<scroll-view :scroll-y="true">
					<view class="carItem" v-for="(item, index) in carList" :key="index">

						<view class="shopListOne-center">
							<image :src="url+item.product.img" mode=""></image>
						</view>
						<view class="shopListOne-right">
							<view class="shopsName">{{ item.product.name }}</view>


							<view class="shopList-money">
								<view class="q">￥{{ item.product.nowprice }}</view>
								<view class="shopsNum">
									<text class="operation" @tap.stop="deleteCartNum(index)">-</text>
									<text class="sumNum">{{item.num}}</text>
									<text class="operation" @tap.stop="addCartNum(item)">+</text>
								</view>
							</view>
						</view>


					</view>
				</scroll-view>


			</view>
		</view>
		
		<view class="che" @click="goCar">
			<text v-if="num>0" style="position: absolute;z-index: 999;text-align: center;top: 24upx;right: 0upx; width: 32rpx;height: 32rpx;border-radius: 16rpx;background: #FF3B30; color: #ffffff;font-size: 22rpx;">{{num}}</text>
			<image src="../../../static/shop/car.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import rate from '../../../components/uni-rate/uni-rate.vue'
	import request from '../../../store/http.js';
	export default {

		components: {
			rate
		},
		data() {
			return {
				width: '',
				height: '',
				i: 0,
				num: 1,
				specClass: 'none',
				carList: [],
				showpopup: false,
				goodsList: [],
				url: this.$store.state.url,
				indicatorDots: false, //是否显示面板指示点
				autoplay: false, //自动播放
				interval: 2000, //间隔时长
				duration: 500, //滑动动画时长
				likes: '../../../static/home/wsc.png',
				shopId: null,
				product: {},
				desc: "",
				shopinfo: null,
				mon: {
					num: 0,
					moneys: 0.00
				},
			};
		},
		onLoad(data) {
			// 获取视口宽高
			let {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.width = windowWidth;
			this.height = windowHeight;
			this.i = data.index;
			this.goodsList = JSON.parse(decodeURIComponent(data.data));
			let first = this.goodsList[0]
			let currentGoods = this.goodsList[this.i]
			this.goodsList[this.i] = this.goodsList.splice(0, 1, this.goodsList[this.i])[0];
			this.shopId=data.shopId;
			// console.log(data);
			// this.id = data;
			this.getShopsDetil();
			// this.getGoods();

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
			var authtoken = uni.getStorageSync("authtoken")
			if(authtoken)
			this.shopCarList();
		},

		methods: {
			goCar(){
				uni.navigateTo({
					url:"../car/car?shopId="+this.shopId
				})
			},
			change(e) {
				this.i = e.detail.current;
			},
			select(index) {
				this.i = index;
			},
			call() {

				uni.makePhoneCall({
					phoneNumber: this.shopinfo.phone + "",
					fail(res) {
						console.log("eee", res)
					}
				})
			},
			discard() {

			},
			// 生成订单接口
			orderCreate() {
				let pids = "";
				for (let i = 0; i < this.carList.length; i++) {

					if (i == 0) pids = this.carList[i].id
					else pids += ("," + this.carList[i].id);



				}

				let token = uni.getStorageSync("authtoken")
				request.urlRequest(
					this.url + '/api/guangjie/addorder', {
						shop_id: this.id.shopid, //门店id
						pids: pids,
						// addr_id:1	

					}, {
						'authtoken': token
					},
					'POST',
					(res) => {

						if (res.data.code == -1) {


							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})

						} else {
							uni.navigateTo({
								url: '../../My/Shopping/Shopping?id=' + res.data.data.order_id

							})
						}
					}
				)
			},
			// 添加商品接口
			addCartNum(item) {
				let authtoken = uni.getStorageSync("authtoken")

				request.urlRequest(
					this.url + '/api/guangjie/numadd', {
						cart_id: item.id,
						shopid: this.id.shopid,
						pid: item.pid
					}, {
						authtoken: authtoken
					},
					'POST',
					(res) => {
						if (res.data.code == 1) {
							item.num++;
							this.sum();
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					}
				)
			},
			//减少购物车商品数量接口
			deleteCartNum(index) {

				let authtoken = uni.getStorageSync("authtoken");
				if (this.carList[index].num == 1) {
					this.deleteShopAll(index)
				} else
					request.urlRequest(
						this.url + '/api/guangjie/numdel', {
							cart_id: this.carList[index].id,
							shopid: this.id.shopid,
							pid: this.carList[index].pid
						}, {
							authtoken: authtoken
						},
						'POST',
						(res) => {
							this.carList[index].num--;
							this.sum();
						}
					)
			},
			sum() {
				this.mon.moneys = 0.0;
				this.mon.num = 0;
				for (let i = 0; i < this.carList.length; i++) {
					// 计算商品价格
					let mon = this.carList[i].price * this.carList[i].num

					this.mon.moneys += mon;
					// 计算商品数量
					this.mon.num += this.carList[i].num;
				}
				this.mon.moneys = parseFloat(this.mon.moneys).toFixed(2);
				console.log("")
			},
			// 获取套餐
			getGoods() {

				request.urlRequest(
					this.url + '/api/guangjie/getCommonProduct', {
						shopid: this.id.shopid
					}, {},
					'POST',
					res => {
						uni.hideLoading();
						this.goods = res.data.data.product; //商家详情

					}
				);

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

						this.carList = res.data.data;

						if (this.carList){
							for (let i = 0; i < this.carList.length; i++) {
							
								this.num += this.carList[i].num;
							}
							console.log("this.num",this.num)
						}

					
						
						




					}
				);
			},

			//规格弹窗开关
			toggleSpec(e) {

				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					if (this.mon.num == 0) {
						return
					}
					this.specClass = 'show';
				}

			},
			// 立即购买
			buy() {
				uni.showLoading({
					title: '生成订单中'
				})
				var authtoken = uni.getStorageSync("authtoken")

				request.urlRequest(
					this.url + '/api/guangjie/nowCreateOrder', {
						shop_id: this.shopinfo.id,

						pid: this.id.goodsId,
						num: this.goodsList,
						trade_type: 1
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						uni.hideLoading();
						if (res.data.code = 1) {
							uni.navigateTo({
								url: '../../My/Shopping/Shopping?id=' + res.data.data.order_id
							})
						} else {

							uni.showToast({
								title: res.data.msg
							})
						}

					}
				);
			},
			// 添加购物车
			addCart(id) {

				var authtoken = uni.getStorageSync("authtoken")

				request.urlRequest(
					this.url + '/api/guangjie/addcart', {
						id: id,
						num: 1
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						uni.showToast({
							title: res.data.msg,
							icon:"none"
						})
						if (res.data.code == 1) {
							this.shopCarList();
						}
					}
				);
			},
			goback() {
				uni.navigateBack({

				})
			},
			shop() {

				uni.navigateTo({
					url: '../merchant/merchant?shopId=' + this.shopinfo.id
				});
			},
			car() {
				console.log('car', this.shopid)
				uni.navigateTo({
					url: '../car/car?shopid=' + this.shopinfo.id
				});
			},
			// 商品数量
			// 减少数量
			sub() {
				if (this.goodsList <= 1) {
					return;
				}
				this.goodsList--;

			},
			// 清空购物车
			clearCart() {
				let authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(
					this.url + '/api/guangjie/delallCart', {

					}, {
						authtoken: authtoken
					},
					'POST',
					(res) => {
						if (res.data.code == 1) {
							this.carList = [];
							this.sum();
							this.toggleSpec()
						}

					}
				)
			},
			// 移除购物车中商品接口
			deleteShopAll(index) {
				let authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(
					this.url + '/api/guangjie/delCarts', {
						cart_id: this.carList[index].id
					}, {
						authtoken: authtoken
					},
					'POST',
					(res) => {
						if (res.data.code == 1) {
							this.carList.splice(index, 1)
							this.sum();
						}

					}
				)
			},
			input_num(e) {
				console.log("输入数据", e)
				this.goodsList = e.detail.value
			},
			// 增加数量
			add() {
				this.goodsList++;

			},
			getDesc(desc){
				if (desc != null) {
					desc = desc.replace(/\<img src="/g, '<img src="' + this.url)
					desc = desc.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
				}
				return desc
			},
			stopPrevent() {},
			// 获取店铺信息
			getShopsDetil() {
				request.urlRequest(
					this.url + '/api/guangjie/product', {
						id: this.goodsList[this.i].id,
						shopid: this.shopId
					}, {},
					'POST',
					res => {
						console.log('商品详情', res);
						if (res.data != null && res.data.data != null) {
							// this.product = res.data.data.product;
							// this.shopList = res.data.data.tuijian;
							this.shopinfo = res.data.data.shopinfo;
							// if (this.product.lunbo)
							// 	this.swiperImg = this.product.lunbo.split(',');
							// else this.swiperImg = this.product.img

							// this.desc = this.product.content;
							// if (this.desc != null) {
							// 	this.desc = this.desc.replace(/\<img src="/g, '<img src="' + this.url)
							// 	this.desc = this.desc.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
							// }

						}
					}
				);
			}
		}
	};
</script>

<style lang="scss">
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
	
	.jiao {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 150rpx;
		z-index: 999;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		// padding: 0 20rpx;
		box-sizing: border-box;
	
		.aaa {
			margin-left: 24rpx;
			align-items: center;
			display: flex;
			flex: 1;
	
			
		}
	
		.bbbb {
			display: flex;
			margin-right: 24rpx;
			// margin-left: 20rpx;
			.jiao-a {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 440rpx;
				height: 90rpx;
				background-color: #999999;
				border-radius: 18rpx;
				// border-bottom-left-radius: 18rpx;
			}
	
			.jiao-b {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 440rpx;
				height: 90rpx;
				background-color: #ff4444;
				border-radius: 18rpx;
			}
	
			.jiao-c {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 240rpx;
				height: 80rpx;
				margin-right: 24rpx;
				background: linear-gradient(270deg, #FF890B 0%, #FFB770 100%);
	
				border-radius: 40rpx;
			}
	
			.jiao-x {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 240rpx;
				height: 80rpx;
				background: linear-gradient(90deg, #FF7085 0%, #FF5837 100%);
				border-radius: 40rpx;
			}
		}
	
	}
	button::after {
		border: none;
	}

	.btnshare {
		margin-left: 16rpx;
		margin-right: 24rpx;
		line-height: 38rpx;
		display: flex;
		width: 34rpx;
		height: 38rpx;
		background-image: url(../../../static/xiangqing/fen.png);
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		// plain: true;
		outline: none;
		border: none;
	}

	.serviceImg {
		margin-right: 24rpx;
		width: 44rpx;
		height: 44rpx;
	}

	.price2 {
		text-decoration: line-through;
		flex: 1;
		font-size: 26rpx;
		color: #999;
		margin-left: 20rpx;
	}
	.price3 {
		text-decoration: line-through;
	
		font-size: 26rpx;
		color: #999;
		margin-left: 10rpx;
	}
.price2 {
		text-decoration: line-through;
		flex: 1;
		font-size: 26rpx;
		color: #999;
		margin-left: 20rpx;
	}
	.t {
		display: inline-block;
		padding-top: 24rpx;
		padding-bottom: 24rpx;
		margin-right: 56rpx;


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

	.q {
		font-size: 32rpx;
		color: #E83E25;
	}

	.operation {
		width: 53rpx;
		height: 56rpx;
		display: inline-block;
		text-align: center;
		line-height: 53rpx;
		background-color: #FFFFFF;
		color: #E1E1E1;
		border: 1rpx solid #EBEBEB;
	}

	.sumNum {
		width: 80rpx;
		height: 53rpx;
		line-height: 53rpx;
		text-align: center;
		font-size: 26rpx;
		color: #333333;
		border-top: 1rpx solid #EBEBEB;
		border-bottom: 1rpx solid #EBEBEB;
	}

	.shopsNum {
		width: 300rpx;
		display: flex;
		flex-direction: row;
	}

	.shopList-money {
		justify-content: space-between;
		display: flex;
		width: 100%;
		flex-direction: row;
	}

	.Num {

		align-items: center;
		justify-content: center;
		width: 54upx;
		height: 30upx;
		background: rgba(229, 229, 229, 1);
		border-radius: 4upx;
		font-size: 26upx;
		color: rgba(69, 69, 69, 1);
	}

	.shopListOne-center {


		image {
			width: 100upx;
			height: 100upx;
		}
	}

	.shopListOne-right {
		margin-left: 30rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.carItem {
		display: flex;
		width: 100%;
		flex-direction: row;
	}

	.box {
		flex-direction: column;

		box-sizing: border-box;
		display: flex;
	}

	.top {
		width: 94%;
		height: 20%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 0 auto;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.title {
		font-size: 36rpx;
		font-weight: bold;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-left: 24rpx;
	}

	.marketBox {
		width: 100%;
		padding-left: 24rpx;
		height: 150rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.marketImg {
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
	}

	.marketInfoBox {
		flex: 1;
		margin-left: 20rpx;
		margin-right: 24rpx;
		height: 100rpx;
	}
	.x {
		margin-top: 10rpx;
		align-items: center;
		display: flex;
		flex-direction: row;
	}

	.rage {
		
		font-size: 26rpx;
		color: #333;
	}

	.marketName {
		width: 100%;
		font-size: 33rpx;
		color: #333333;
		font-weight: bold;
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-line-clamp: 1; //此处为上限行数
		-webkit-box-orient: vertical;
	}

	.marketHint {
		width: 100%;
		font-size: 30rpx;
		color: #666666;
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-line-clamp: 1; //此处为上限行数
		-webkit-box-orient: vertical;
	}

	.serviceBox {
		width: 150rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.serviceImg {
		width: 55rpx;
		height: 50rpx;
	}

	.serviceHint {
		font-size: 26rpx;
		color: #333333;
	}

	.scroll {
		width: 100%;
		flex: 1;
		margin-bottom: 200rpx;
	}

	.shopDiscountBox {
		// width: 94%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-left: 24rpx;
		margin-right: 24rpx;
		box-sizing: border-box;
	}

	// .shopDiscountBox > image{
	// 	width: 689rpx;
	// 	height: 390rpx;
	// }
	.shopDiscountTop {
		width: 100%;

		// height: 30%;
	}

	.introduceBox {
		padding-left: 24rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		
		align-items: center;
	}

	.introduceTxt {
		font-size: 36rpx;
		color: #FF2B10;
	}

	.shopDiscountImg {
		width: 100%;
		margin-top: 20rpx;
	}

	.setMeal {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		// margin-left: 24rpx;
		// margin-right: 24rpx;
		box-sizing: border-box;
		display: flex;
		margin-top: 24rpx;
		flex-direction: column;
	}

	.ul {
		width: 100%;
		margin-top: 20rpx;
	}

	.li {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.dot {
		width: 10rpx;
		height: 10rpx;
		background-color: #000000;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.h4 {
		font-size: 38rpx;
		color: #333333;
	}

	view[class*="li setMealTop"] {
		justify-content: flex-start;
	}

	view[class$="li"] {
		margin-top: 20rpx;
		padding-left: 30rpx;
		box-sizing: border-box;
	}

	.setMealItem {
		font-size: 30rpx;
		color: #333333;
	}

	text[class*="setMealItem a"] {
		color: #999999;
	}

	.price {
		font-size: 30rpx;
		font-weight: 600;
		color: #333333;
	}

	.alonePay {
		width: 94%;
		height: 510rpx;
		margin-bottom: 100rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-top: 20rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.alonePayTop {
		height: 20%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.alonePayTop>.title {
		font-weight: normal;
		font-size: 35rpx;
	}

	.alonePayScroll {
		width: 100%;
		height: 80%;
		display: flex;
		flex-direction: row;
	}

	.alonePayItem {
		width: 45%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		margin-right: 20rpx;
	}

	.alonePayImg {
		width: 240rpx;
		height: 240rpx;
		border-radius: 20rpx;
	}

	.shopName {
		width: 100%;
		text-align: left;
		font-size: 30rpx;
		color: #000000;
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-line-clamp: 1; //此处为上限行数
		-webkit-box-orient: vertical;
	}

	.alonePayInfo {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.alonePayInfo>text {
		font-size: 28rpx;
		color: #999999;
	}

	.buyBox {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.priceBox>text {
		color: #fe1722;
	}

	.priceBox>text:first-child {
		font-size: 30rpx;
	}

	.priceBox>text:last-child {
		font-size: 40rpx;
		font-weight: 600;
	}

	.common {
		width: 94%;
		padding: 20rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20rpx;
	}

	.evaluation {
		margin-bottom: 140rpx;

		.evaluation_t {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;

			>text {
				font-size: 36rpx;
				font-weight: bold;
				color: #333333;
			}

			.evaluation_t_r {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 26rpx;
				color: #333333;

				image {
					width: 12rpx;
					height: 23rpx;
					margin-left: 20rpx;
				}
			}
		}

		.evaluation_b {
			font-size: 25rpx;
			color: #333333;
			margin-top: 30rpx;

			.eval_t {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;

				>text {
					color: #999999;
				}

				.eval_t_l {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					image {
						width: 70rpx;
						height: 70rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}

					.xingxing {
						width: 400rpx;

						view {
							width: 100%;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							font-size: 25rpx;
							color: #333333;
							margin-bottom: 10rpx;
						}

						image {
							width: 24rpx;
							height: 24rpx;
							margin: 0 0 0 5rpx;
						}
					}
				}
			}

			.eval_m {
				margin: 30rpx 0 20rpx;
			}

			.eval_b {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				flex-direction: row;

				image {
					width: 30%;
					margin-right: 20rpx;
					margin-bottom: 20rpx;
					border-radius: 15rpx;
				}

				&>image:nth-child(3) {
					margin-right: 0rpx;
				}
			}
		}

	}


	.amount {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 710rpx;
		height: 100rpx;
		padding: 20rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #f3f3f3;

		.amount_l,
		.amount_r {
			width: 20%;
			height: 100%;
		}

		.amount_l {
			background-color: #1c0603;
			border-radius: 50rpx 0 0 50rpx;
			margin-right: 5rpx;
			color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 20rpx;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-bottom: 5rpx;
			}
		}

		.amount_r {
			background-color: #fe5037;
			border-radius: 0 50rpx 50rpx 0;
			text-align: center;
			line-height: 100rpx;
			font-size: 32rpx;
			color: #fefefe;
		}

		.amount_m {
			display: flex;
			flex-direction: row;
			align-items: center;
			flex: 1;
			height: 100%;
			background-color: #1c0603;
			color: #fff;
			padding-left: 20rpx;

			view:last-child {
				font-size: 20rpx;
				color: #dddddd;
			}
		}
	}


	/* 规格选择弹窗 */
	.attr-content {
		padding: 10upx 30upx;

		.a-t {
			display: flex;

			image {
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;
				;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: 26upx;
				color: 28upx;
				line-height: 42upx;

				.price {
					font-size: 32upx;
					color: #EF5350;
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: 30upx;

			padding-top: 30upx;
			padding-left: 10upx;
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: 28upx;
				color: #333333;
			}

			.selected {
				background: #fbebee;
				color: #0086F9;
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 120rpx;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 80%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			left: 0;
			bottom: 120rpx;
			width: 100%;
			max-height: 120vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				width: 80%;
				line-height: 66upx;
				border-radius: 100upx;
				background: #EF5350;
				font-size: 28upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	/* 商品个数 */
	.number {
		display: flex;
		justify-content: center;
		align-items: flex-end;

		.input {
			width: 60upx;
			height: 60upx;
			margin: 0 10upx;
			background-color: #f3f3f3;

			input {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				font-size: 26upx;
			}
		}

		.sub,
		.add {
			width: 100upx;
			height: 55upx;
			background-color: #f3f3f3;
			border-radius: 5upx;

			.icon {
				font-size: 22upx;
				width: 90upx;
				height: 45upx;
				display: flex;
				justify-content: center;
				align-items: center;

			}
		}
	}
</style>

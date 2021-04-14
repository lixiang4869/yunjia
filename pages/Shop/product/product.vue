<template>
	<view class="container" :style="{width:width+'px'}" v-if="product">
		<!-- <view class="status_bar">
			
		</view> -->
		<!-- 头部 -->
		<view class="herder">
			<view style="position: relative;"  :style="{width:width+'px',height:width+'px'}" >
				<view :style="{width:width+'px',height:width+'px'}" style="position: absolute;top:20rpx;left: 20rpx;">
				<image :src="url+imgs" class="img" ></image></view>
				<image :src="url+'/uploads/static/shop/kuang2.png'" :style="{width:width+'px',height:width+'px'}" style="position: absolute;top:0rpx;left: 0rpx;"></image>
			</view>
			
			<image @click.stop="backPage" :src="home?'../../../static/xiangqing/fanhui.png':'../../../static/home/home.png'"
			 mode="" style="width: 50rpx;height: 50rpx; position: absolute;top: 70rpx;left:30rpx;position: fixed;top: 100rpx;left: 30rpx;"></image>
			<view class="headera">
				<view class="headera-a">
					<text style="font-size:30rpx">￥</text>
					<text style="font-size:52rpx;font-weight:700">{{product.nowprice}}</text>
					<text style="font-size:32rpx">/份</text>
				</view>
				<view class="headera-b">
					<view class="b-a">
						<view class="b-a-one">
							{{product.name}}
						</view>
						<text style="font-size:24rpx">今日已售: {{product.sellnum}}</text>
					</view>

					<view class="b-b" style="margin-right: 40rpx;" @click="colletProduct">
						<text style="font-size:24rpx;margin-top: 20rpx;">收藏</text>

						<image src="../../../static/shop/uncollect.png" style="width:37upx ;height:38upx;" v-show="!isCollect" mode="widthFix"></image>
						<image src="../../../static/shop/collect.png" style="width:37upx ;height:38upx;" v-show="isCollect" mode="widthFix"></image>
					</view>
					<view class="b-b">
						<text style="font-size:24rpx;margin-top: 20rpx;text-align:end">分享</text>
						<!-- #ifdef MP-WEIXIN -->
						<button open-type="share" class="btnshare"></button>

						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<image src="../../../static/xiangqing/fen.png" style="width:34upx ;height: 38upx;" mode="widthFix" @click="share"></image>
						<!-- #endif -->
					</view>
				</view>
				<view class="headera-c">
					<!-- <view class="c-a">
						<view class="c-aa">
							<image src="../../../static/xiangqing/one.png" mode="" style="width: 30rpx;height:30rpx;"></image>
							<text style="font-size: 24rpx;font-weight: normal;font-stretch:normal;color: #666666;padding-left:10rpx;">免运费</text>
						</view>
						<view class="c-bb">
							<image src="../../../static/xiangqing/too.png" mode="" style="width: 30rpx;height:30rpx;"></image>
							<text style="font-size: 24rpx;font-weight: normal;font-stretch:normal;color: #666666;padding-left:10rpx;">次日达</text>
						</view>
					</view> -->
					<!-- <view class="c-b">
						<image src="../../../static/xiangqing/gong.png" mode="" style="width: 32rpx;height:32rpx;"></image>
						<text style="font-size:24rpx;font-weight: normal;font-stretch:normal;color: #999999;padding-left:10rpx;">22:00前的订单，次日送达；22:00之后的订单，后日送达</text>
					</view> -->
				</view>
				<view class="headera-v">
					<image src="https://xin.yiyunoto.com/uploads/static/xiangqing/bjone.png" mode="" style="width: 100%;height: 100rpx;"></image>
				</view>
				<!-- 店家店铺 -->
				<!-- 		<view class="headera-o">
					<view class="oo">
						<image src="../../static/xiangqing/tou.png" mode="" style="width: 110rpx;height: 110rpx;padding-top:15rpx;padding-bottom: 15rpx;"></image>
						<view class="o-a">
							<text style="font-size: 30rpx;font-weight: bold;font-stretch: normal;color: #000000;">伏天面食季</text>
							<view class="o-aa">
								<text style="font-size: 26rpx;font-weight: bold;font-stretch: normal;color: #ffffff;">热销店铺</text>
							</view>
						</view>
					</view>
					<view class="o-b">
						<text style="font-family: MicrosoftYaHei;font-size: 32rpx;font-weight: normal;font-stretch: normal;color: #fff4f4;">进店瞧瞧</text>
					</view>
				</view> -->
			</view>
		</view>
		<!-- 评价 -->
		<!-- <view class="zhong">
			<view class="zhong-a">
				<view class="zhong-a-a">
					顾客评价 <text style="font-size: 30rpx;font-weight: bold;color: #000000;"> (185)</text>
				</view>
				<view class="zhong-a-b" @click="chakan">
					查看全部<image src="../../static/xiangqing/fal.png" mode="" style="width: 16rpx;height: 30rpx;padding-left: 20rpx;"></image>
				</view>
			</view>
			<view class="zhong-b">
				<image src="../../static/xiangqing/xiang.png" mode="" style="width: 70rpx; height:70rpx;"></image>
				<text style="padding-left: 30rpx;font-weight: normal;font-stretch: normal;letter-spacing: 0px;color: #333333; font-size: 30rpx;">外贸服饰
					（鞋服箱包品牌折扣）</text>
			</view>
			<view class="">
				<text style="font-size: 28rpx;font-weight: normal;font-stretch: normal;color: #999999;">黄瓜已收到，完好无损，瓜很爽甜</text>
			</view>
			<view class="zhong-tu">
				<image src="../../static/xiangqing/bj.png" mode="" style="width:31%;height: 224rpx;"></image>
				<image src="../../static/xiangqing/bj.png" mode="" style="width: 31%;height: 224rpx;padding-left: 20rpx;"></image>
				<image src="../../static/xiangqing/bj.png" mode="" style="width: 31%;height: 224rpx;padding-left: 20rpx;"></image>
			</view>
		</view> -->
		<!-- <view class="xia"></view> -->
		<!-- <view class="xiang">
			<text style="font-size: 34rpx;font-weight: bold;font-stretch: normal;color: #000000;margin-left: 30rpx;">商品详情</text>
			<image :src="url+shopInfo.goods_detail" style="width:100%;margin-bottom: 100rpx;" mode="widthFix"></image>
		</view> -->
		<view style="margin-bottom: 150rpx;width: 100%;">
			<view style="font-size: 34rpx;font-weight: bold;font-stretch: normal;color: #000000;width: 100%; text-align: center;margin-bottom: 30rpx;">商品详情</view>
			<rich-text :nodes="desc" class="pice" style="width: '100%';"></rich-text>
			<!-- <view style="width: 100%;display: flex;flex-direction: row;align-items: center;justify-content: center;">
				<view style="width: 100rpx;height: 4rpx;background: #666666;"></view>
				
				<view style="font-size: 36rpx;color: #333;margin: 18rpx;font-weight: bold;">购物指南</view>
					<view style="width: 100rpx;height: 4rpx;background: #666666;"></view>
			</view> -->
		</view>
		<view class="jiao">
			<view class="aaa">
				<!-- #ifdef MP-WEIXIN -->
				<!-- 	<view class="b-b">
				
				<button open-type="contact" class="btnkf" @bindcontact="handleContact"></button>
				<text style="font-size: 30rpx;font-weight: bold;font-stretch: normal;color: #666666;padding-top: 10rpx;">客服</text>
				</view>		 -->
				<!-- #endif -->

				<view class="jiao-a" @click="phone">
					<image src="../../../static/xiangqing/ke.png" style="width: 40rpx;height: 40rpx;"></image>
					<text style="font-size: 30rpx;font-weight: bold;font-stretch: normal;color: #666666;padding-top: 10rpx;">客服</text>
				</view>

				<!-- <view class="jiao-a" @click="phone">
					<image src="../../../static/xiangqing/ke.png" style="width: 40rpx;height: 40rpx;padding-left: 10rpx;"></image>
					<text style="font-size: 30rpx;font-weight: bold;font-stretch: normal;color: #666666;padding-top: 10rpx;">客服</text>
				</view> -->
				<view class="jiao-b" @click="notarize">
					<image src="../../../static/xiangqing/che.png" style="width: 40rpx;height: 40rpx;"></image>
					<text style="font-size: 30rpx;font-weight: bold;font-stretch: normal;color: #666666;padding-top: 10rpx;">购物车</text>
				</view>
			</view>
			<view class="bbbb">
				<view class="jiao-a" v-if="product.status==0">
					<text style="font-size: 31rpx;font-weight: bold;font-stretch: normal;color: #3333333;">已下架</text>
				</view>
				<view class="jiao-c" @click="open" v-if="product.status==1&&product.classify_id!=29">
					<text style="font-size: 36rpx;font-weight: bold;font-stretch: normal;color: #fff;">加入购物车</text>
				</view>
				<view class="jiao-x" @click="buy" v-if="product.status==1&&product.classify_id!=29">
					<text style="font-size: 36rpx;font-weight: bold;font-stretch: normal;color: #ffffff;">立即购买</text>
				</view>
				<view class="jiao-x" @click="buy" v-if="product.status==1&&product.classify_id==29">
					<text style="font-size: 36rpx;font-weight: bold;font-stretch: normal;color: #ffffff;">立即兑换</text>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view style="background-color: #FFF;border-top-left-radius: 10rpx;border-top-right-radius: 10rpx; position: relative;"
			 :style="{width: width+'px',height: height*0.4+'px'}">
				<view class="shopInfoBox">
					<image class="shopSmillImg" :src="url+imgs"></image>
					<view class="shopInfoRightBox">
						<view style="font-size: 30rpx;margin-bottom: 10rpx;color: #f72926;margin-top: 20rpx;">
							￥{{product.nowprice}}
						</view>
						<view style="font-size: 26rpx;color: #999;">
							库存: {{product.stock}}
						</view>
						<view class="shopInfoNum">
							<text class="txt">已选: </text>
							<view class="numsBox">
								<text class="operation" @click="countNum($event,1)">-</text>
								<input class="sumNum" type="number" v-model="goodsList" />
								<text class="operation" @click="countNum($event,-1)">+</text>
							</view>
						</view>
					</view>
				</view>
				<text class="successBtn" @click="addCart(shopId,num)">
					完成
				</text>
			</view>
		</uni-popup>

		<view class="share-section"></view>
	</view>
</template>
<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import request from "../../../store/http.js"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				width: '',
				height: '',
				shopInfo: {},
				shopId: -1,
				authtoken: '',
				num: 1,
				clickNum: 0,
				goods_detail: '',


				url: this.$store.state.url,
				imgs: [],
				product: {},
				desc: '',
				id: '',
				type: 0,
				
				
				specClass: 'none',
				goodsList: 1,
				gopay: '',
				new: '',
				titleBg: 'rgba(255,255,255,0)',
				sid: null, //分享id
				modular_id: null,
				home: true,
				isCollect: false,
				huanxin_id: ""
			}
		},
		async onLoad(options) {

			let {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.width = windowWidth;
			this.height = windowHeight;
			this.authtoken = uni.getStorageSync('authtoken');
			// this.url = this.$store.url;
			// this.shopId = options.shopId * 1;	
			// 	await this.getShopDetail(options.shopId * 1).then(res=>{
			// 	this.shopInfo = res.data.data.goods;
			// 	var imgReg = /<img.*?(?:>|\/>)/gi;
			// 	var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
			// 	var arr = this.shopInfo.goods_detail.match(imgReg); 
			// 	 for (var i = 0; i < arr.length; i++) {
			// 	  var src = arr[i].match(srcReg);
			// 	 }
			// 	 this.shopInfo.goods_detail=src[1];
			// })
			
			this.id = options.goodsId
			const id = options.goodsId
			this.modular_id = options.modular_id
			if (this.modular_id == "null" || this.modular_id == "undefined") {
				this.modular_id = null
			}
			if (options.q) {
				this.id = decodeURIComponent(options.q).split("=")[1];

				// uni.showModal({
				// 	title:"parentsid= "+this.parentsid +" e.q="+e.q
				// })
			}

			if (options.uid) {
				var l = options.uid;
				this.sid = options.uid;
				
			}



			if (getCurrentPages().length == 1) {
				this.home = false
			} else {
				this.home = true
			}
		},

		onShow() {
			this.getdata();
			/* 隐藏凸起图标 */

			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			setTimeout(function() {
				if (icon)
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
					url: "../../My/Login-registration/Login-registration"
				})
				return false
			} else {
				var l = uni.getStorageSync("uid")

				return {
					title: "[" + this.product.name + ",仅需" + this.product.nowprice + "元]",
					path: 'pages/Shop/product/product?goodsId=' + this.id + "&uid=" + l + "&modular_id=" + this.product.modular_id
				}
			}

		},
		methods: {
			// back() {
			// 	uni.navigateBack({

			// 	})
			// },
			handleContact(e) {

			},



			getdata() {
				console.log("getdata")
				uni.showLoading({

				})
				var authtoken = uni.getStorageSync("authtoken")
				let head = {}
				if (authtoken) {
					head = {
						authtoken: authtoken
					}
				}
				request.urlRequest(this.url + '/api/index/product', {
					modular_id: this.modular_id,
					productid: this.id
				}, head, 'POST', res => {
					uni.hideLoading()
					var data = res.data;
					if (data.code == 1) {
						this.isCollect = data.data.collect == 1;
						this.huanxin_id = data.data.huanxin_id;
						this.product = data.data.type;
						// console.log("product.status", this.product.status)
						this.imgs = this.product.img;
						this.desc = this.product.content;
						// console.log('this.desc', this.desc);
						if (this.desc != null) {
							this.desc = this.desc.replace(/src="/g, 'src="' + this.url)
							this.desc = this.desc.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
						}
						console.log('this.desc', this.desc);
					} else {


						uni.showToast({
							title: data.msg,
							icon: "none"
						})
					}
				});

			},
			//收藏商品
			colletProduct() {

				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + "/api/member/setCollectStatus", {
					type: 2,
					referer_id: this.id,
					modular_id: this.modular_id
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
				if (prePage)
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
			//规格弹窗开关
			toggleSpec(e) {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
					this.type = e;
				}

			},

			notarize: function() {
				if(this.sid){
					uni.navigateTo({
						url: '/pages/Shop/shop_car/index?sid=' + this.sid,
					})
				}
				else{
					uni.navigateTo({
						url: '/pages/Shop/shop_car/index?' 
					})
				}
			},

			// 商品数量
			// 减少数量
			sub() {
				if (this.goodsList <= 1) {
					return;
				}
				this.goodsList--;

			},
			input_num(e) {
				console.log("输入数据", e)
				this.goodsList = e.detail.value
			},
			// 增加数量
			add() {
				this.goodsList++;

			},
			// 合计
			// sum(e, index) {
			// 	this.sumPrice = 0;
			// 	let len = this.goodsList.length;
			// 	for (let i = 0; i < len; i++) {
			// 		if (this.goodsList[i].selected) {
			// 			if (e && i == index) {
			// 				console.log("已选商品数据",e)
			// 				this.sumPrice = this.sumPrice + (e.detail.value * this.goodsList[i].price);
			// 			} else {
			// 				console.log("已选商品数据2",e)
			// 				this.sumPrice = this.sumPrice + (this.goodsList[i].num * this.goodsList[i].price);
			// 			}
			// 		}
			// 	}
			// 	this.sumPrice = this.sumPrice.toFixed(2);
			// },
			//分享
			share() {
				console.log("eeeeee")
				var authtoken = uni.getStorageSync("authtoken")
				if (!authtoken) {
					uni.navigateTo({
						url: "../../My/Login-registration/Login-registration"
					})

				} else {
					var l = uni.getStorageSync("uid");

					// this.$refs.share.toggleMask();
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 5,
						title: "[" + this.product.name + ",仅需" + this.product.nowprice + "元]",
						imageUrl: this.url + this.imgs,
						miniProgram: {
							id: 'gh_c509165ecab3',
							path: 'pages/Shop/product/product?goodsId=' + this.id + "&uid=" + l + "&modular_id=" + this.product.modular_id,
							webUrl: 'https://www.yiyunoto.com',
							type: 0
						},
						summary: "[" + this.product.name + ",仅需" + this.product.nowprice + "元]",
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + err);
						}
					});
				}
			},
			//收藏
			toFavorite() {
				this.favorite = !this.favorite;
			},
			quickBuy() {
				var parentsid = uni.getStorageSync("parentsid");
				let p = {};
				p.id = this.product.id;
				p.modular_id = this.product.modular_id;
				p.name = this.product.name;
				p.img = this.product.img;
				p.num = this.goodsList;
				p.price = this.product.nowprice;
				let list = [];
				list.push(p);
				var authtoken = uni.getStorageSync("authtoken")
				if (authtoken)
					if( this.sid){
							uni.navigateTo({
						url: '../../My/affirmOrder2/affirmOrder?data=' + JSON.stringify(list) + "&sid=" + this.sid

					})
					}else {
						uni.navigateTo({
							url: '../../My/affirmOrder2/affirmOrder?data=' + JSON.stringify(list)
						
						})
					}
				
				else {
					uni.navigateTo({
						url: "../../My/Login-registration/Login-registration"
					})
				}
			},
			buy2() {


				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + "/api/cart/add", {
					goods_id: this.id,
					modular_id: this.product.modular_id,
					num: this.goodsList,
				}, {
					'authtoken': authtoken
				}, 'POST', res => {
					this.$refs.popup.close();
					// 吐丝定义写法
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					});
				});

			},
			stopPrevent() {},


			// 电话客服
			phone() {
				// uni.navigateTo({
				// 	url:"../../chat/chat?name=客服008"
				// })
				if (this.huanxin_id) {
					var my = uni.getStorageSync("myUsername");
					var nameList = {
						myName: my,
						your: this.huanxin_id
					};
					uni.navigateTo({

							url: "../../chat/chatroom/chatroom?username=" + JSON.stringify(nameList),
							fail(e) {
								console.log(e)
							}

						}

					);
				} else {
					uni.makePhoneCall({
						phoneNumber: '400-0371189',
						success(res) {

						}
					})
				}


			},
			backPage() {
				if (this.home) {
					uni.navigateBack({
						delta: 1
					});
				} else {
					uni.switchTab({
						url: "../../Shop/index/index"
					})
				}
			},
			addCart(id, num) {
				var authtoken = uni.getStorageSync("authtoken")
				if (!authtoken) {
					uni.showToast({
						icon: 'none',
						title: '请登录'
					})
					uni.navigateTo({
						url: '../../My/Login-registration/Login-registration'
					})
					return;
				}

				if (this.product.stock < this.goodsList) {
					uni.showToast({
						icon: 'none',
						title: '库存不足'
					})
					return;
				}

				if (!this.goodsList || this.goodsList < 1) {
					uni.showToast({
						icon: 'none',
						title: '数量不能少于一份'
					})
					return;
				}
				if (this.clickNum == 1) {
					this.buy2();
				} else if (this.clickNum == 2) {
					this.quickBuy();
				}
			},
			open() {
				this.clickNum = 1;
				this.$refs.popup.open();
			},
			buy() {
				this.clickNum = 2
				this.$refs.popup.open();
			},
			// 商品数量加减
			countNum(e, a) {
				if (this.goodsList <= 1 && a > 0) {
					return;
				}
				this.goodsList -= a;
			}
		}
	}
</script>
<style lang="scss" scoped>
	button::after {
		border: none;
	}
	.pice {
		margin-bottom: 250rpx;
	}

	.xia {
		margin-top: 20rpx;
		width: 100%;
		height: 20rpx;
		background-color: #f6f6f6;
		margin-bottom: 20rpx;
	}
	.img{
		width: calc(100% - 40rpx);
		height: calc(100% - 40rpx);
	}
	.container {
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}
		
		.herder {
			border-bottom: 20rpx solid #f6f6f6;

			.headera {
				padding-left: 30rpx;
				padding-top: 20rpx;
				padding-right: 30rpx;

				.headera-a {
					color: #f72926;
				}

				.headera-b {
					width: 100%;
					// height: 10rpx;
					display: flex;
					justify-content: space-between;
					color: #A3A3A3;

					.b-a {
						width: 85%;
						flex: 1;

						.b-a-one {
							font-size: 32rpx;
							color: #333333;
						}
					}

					.b-b {
						align-items: center;
						display: flex;
						flex-direction: column-reverse;
						justify-content: cneter;
					}
				}

				.headera-c {
					padding-top: 30rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;

					.c-a {
						display: flex;

						.c-aa {
							width: 140rpx;
							height: 50rpx;
							display: flex;
							background-color: #ffffff;
							border: solid 1rpx #d8d8d8;
							justify-content: center;
							align-items: center;
						}

						.c-bb {
							margin-left: 20rpx;
							width: 140rpx;
							height: 50rpx;
							display: flex;
							background-color: #ffffff;
							border: solid 1rpx #d8d8d8;
							justify-content: center;
							align-items: center;
						}

					}

					.c-b {
						height: 50rpx;
						display: flex;
						background-color: #ffffff;
						justify-content: center;
						align-items: center;
					}
				}

				.headera-v {}

				.headera-o {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.oo {
						display: flex;

						.o-a {
							padding-left: 30rpx;

							.o-aa {
								margin-top: 20rpx;
								display: flex;
								width: 140rpx;
								height: 45rpx;
								background-color: #ff0000;
								border-radius: 16rpx;
								justify-content: center;
								align-items: center;
							}
						}
					}

					.o-b {
						width: 200rpx;
						height: 60rpx;
						background-color: #f72926;
						border-radius: 24rpx;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}

		.zhong {
			padding-left: 30rpx;
			padding-right: 30rpx;

			.zhong-a {
				padding-top: 20rpx;
				display: flex;
				justify-content: space-between;

				.zhong-a-a {
					font-size: 34rpx;
					font-weight: bold;
					font-stretch: normal;
					color: #000000;
				}

				.zhong-a-b {
					font-size: 34rpx;
					font-weight: bold;
					font-stretch: normal;
					color: #f72926;
				}
			}

			.zhong-b {
				display: flex;
				align-items: center;
				width: 100%;
			}

			.zhong-tu {
				display: flex;
				margin-top: 30rpx;
				width: 100%;
				flex-wrap: wrap;
				justify-content: center;

			}
		}

		.jiao {
			position: fixed;
			bottom: 0rpx;
			width: 100%;
			height: 150rpx;
			background-color: #ffffff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx;
			box-sizing: border-box;

			.aaa {
				display: flex;
				flex: 1;

				.jiao-a {
					flex: 1;
					align-items: center;
					justify-content: center;
					// padding-left: 30rpx;
					display: flex;
					flex-direction: column;
				}

				.jiao-b {
					flex: 1;
					align-items: center;
					justify-content: center;
					// padding-left: 50rpx;
					display: flex;
					flex-direction: column;
				}
			}

			.bbbb {
				display: flex;

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
	}

	.shopInfoBox {
		width: 100%;
		height: 30.5%;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.shopSmillImg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
		margin-top: -10%;
	}

	.shopInfoRightBox {
		width: 50%;
		height: 100%;
		margin-left: 30rpx;
	}

	.shopInfoNum {
		width: 100%;
		height: 60%;
		display: flex;
		align-items: center;
	}

	.txt {
		font-size: 30rpx;
	}

	.numsBox {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-left: 10rpx;
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

	.operation:first-child {
		border-top-left-radius: 10rpx;
		border-bottom-left-radius: 10rpx;
	}

	.operation:last-child {
		border-top-right-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
	}

	.sumNum {
		width: 80rpx;
		height: 53rpx;
		text-align: center;
		font-size: 26rpx;
		color: #333333;
		border-top: 1rpx solid #EBEBEB;
		border-bottom: 1rpx solid #EBEBEB;
	}

	.successBtn {
		width: 95%;
		display: block;
		text-align: center;
		padding: 20rpx 0;
		color: #fff;
		border-radius: 60rpx;
		background: linear-gradient(90deg, #FF7085 0%, #FF5837 100%);
		margin: 0 auto;
		margin-top: 50rpx;
	}

	.btnkf {
		width: 40rpx;
		height: 40rpx;
		background-image: url(../../../static/xiangqing/ke.png);
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		plain: true;
		outline: none;
		border: none;
	}

	.btnshare {

		width: 34rpx;
		height: 38rpx;
		background-image: url(../../../static/xiangqing/fen.png);
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		plain: true;
		outline: none;
		border: none;
	}

	button {
		background-color: rgba(0, 0, 0, 0);
	}

	button::after {
		border: none;
	}

	/* 分享 */
	.share-section {
		display: flex;
		align-items: center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;

		.share-icon {
			display: flex;
			align-items: center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position: relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;

			&:after {
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position: absolute;
				background: $uni-color-primary;
			}
		}

		.icon-xingxing {
			position: relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}

		.tit {
			font-size: $font-base;
			margin-left: 10upx;
		}

		.icon-bangzhu1 {
			padding: 10upx;
			padding-left: 30upx;
			font-size: 30upx;
			line-height: 1;
		}

		.share-btn {
			flex: 1;
			text-align: right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}

		.icon-you {
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}

	.title {
		flex: 1;
		font-size: 32upx;
		color: $font-color-dark;
		height: 50upx;
		line-height: 50upx;
	}
</style>

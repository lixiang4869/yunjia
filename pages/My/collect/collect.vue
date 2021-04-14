<template>
	<view :style="{width,height,backgroundColor:'#F3F3F3'}">
		<!-- 头部导航栏 -->
		<view class="topNav">
			<view class="navItem" v-for="(item,index) in navBar" :key="index" @click="changeNav(index)">
				<text :class="index == actionNum ? 'actionTitle' : index==3? 'lastNavTitle' : 'navTitle'">{{item.name}}</text>
				<view class="actionLinear" v-if="index == actionNum"></view>
			</view>
		</view>
		<!-- 店铺内容 -->
		<scroll-view :scroll-y="true" class="containerBox" :lower-threshold="50" @scrolltolower="reachBottom" v-if="actionNum==1"
		 :style="{height:storeEdit?'79%':'90%'}">
			<view class="shopContainer" v-for="(item,index) in shopData" :key="index" @click="goShopDetails(item.id)">
				<view class="topBox">
					<view v-if="storeEdit" class="topLeft" @click.stop="selectShop($event,'single',index)">
						<image class="selectedIcon" :src="selectedShop[index]?'../../../static/public/pitch_on.png':'../../../static/public/circle.png'"></image>
					</view>
					<view class="topRight" :style="{width: storeEdit?'90%':'70%'}">
						<image class="shopHeadImg" :src="url+item.logo"></image>
						<view class="storeInfoBox">
							<text class="shopName">{{item.name}}</text>
							<text class="fenceNum">{{item.collectNum}}人关注</text>
						</view>
					</view>
					<!-- <text class="hint" v-if="!storeEdit">新品上新</text> -->
				</view>
			<!-- 	<view class="shopImgBox" v-if="item.shops.length > 0">
					<view style="height: 100%;" :style="{width:storeEdit?'29%':'18%'}"></view>
					<view class="shopimgs">
						<image class="shopImg" v-for="(obj,i) in item.shops" :key="i" :src="obj.img"></image>
					</view>
				</view> -->
			</view>
			<!-- 底部按钮 -->
			<view class="btmMenu" v-if="storeEdit">
				<view class="labe" @click="selectShop($event,'all')">
					<image class="selectedIcon" style="margin-right: 20rpx;" :src="all?'../../../static/public/pitch_on.png':'../../../static/public/circle.png'"></image>
					<text style="font-size: 30rpx;color: #333333;">{{all?'取消':'全选'}}</text>
				</view>
				<view class="btnBox"  @click="qxShopCollect">
					<view class="btn" >
						<text style="font-size: 30rpx;color: #FFFFFF;">取消收藏</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 商品内容 -->
		<scroll-view :scroll-y="true" class="attenShopBox" :lower-threshold="50" @scrolltolower="reachBottom" v-if="actionNum==0&goodsList.length>0"
		 :style="{height:storeEdit?'83%':'90%'}">
			<view class="shopItemBox" v-for="(item,index) in goodsList" :key="index">

				<view class="shopInfoBox" @click="navToDetailPage(item)">
					<view v-if="storeEdit" class="topLeft" @click.stop="selectShop($event,'single',index)">
						<image class="selectedIcon" :src="selectedShop[index]?'../../../static/public/pitch_on.png':'../../../static/public/circle.png'"></image>
					</view>
					<image class="shopInfoImg" :src="url+item.goods_preview"></image>
					<image src="../../../static/yixiajia.png" v-if="item.status==0" style="width: 130rpx;height: 130rpx;position: absolute;top: 0rpx;right: 0rpx;"></image>


					<view class="shopInfoTxt">

						<text class="shopInfoName">{{item.goods_name}}</text>


						<text class="shopInfoName">{{item.name}}</text>

						<view class="priceBox">
							<text class="price">￥</text>

							<text class="price" style="font-size: 35rpx;">{{item.now_price.split(".")[0]}}</text>
							<text class="price" style="font-size: 30rpx;">.{{item.now_price.split(".")[1]}}</text>

						</view>
					</view>
				</view>
				<view class="btnsBox">
					<view class="shopBtnBox">
						<text class="shopCancel" @click.stop="colletProduct(index)">取消收藏</text>
						<text class="shopAddCart" @click.stop="buy(item)" v-if="item.status==1">加入购物车</text>
					</view>
				</view>
			</view>
			<!-- 底部按钮 -->
			<view class="btmMenu" v-if="storeEdit">
				<view class="labe" @click="selectShop($event,'all')">
					<image class="selectedIcon" style="margin-right: 20rpx;" :src="all?'../../../static/public/pitch_on.png':'../../../static/public/circle.png'"></image>
					<text style="font-size: 30rpx;color: #333333;">{{all?'取消':'全选'}}</text>
				</view>
				<view class="btnBox" @click="qxcollect">
					<view class="btn">
						<text style="font-size: 30rpx;color: #FFFFFF;">取消收藏</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view v-if="actionNum==0&goodsList.length==0" style="background: #ffffff; width: 100% ; height: 100%;justify-content: center;align-items: center; display: flex; flex-direction: column;">
			<image src="https://xin.yiyunoto.com/uploads/static/public/emptycollect.png" style="width: 200rpx;height: 200rpx;"></image>
			<view style=" font-size: 32rpx;color: #333333;">您还没有收藏商品</view>
			<view class="home" @click="goHome">前往首页</view>
		</view>
		<!-- 浏览记录模块 -->
		<scroll-view :scroll-y="true" class="browseBox" v-if="actionNum==2" :style="{height:storeEdit?'83%':'90%'}">
			<view class="everyDayBox" v-for="(item,index) in histroyList" :key="index">
				<text class="dateTxt">{{item.time}}</text>
				<view class="browseShopBox" v-for="(p,i) in item.product" :key="i" @click="navToDetailPage(p)">
					<view class="browseShopInfo">
						<view v-if="storeEdit" class="topLeft" @click.stop="selectHistroy(p)">
							<image class="selectedIcon" :src="p.isChecked?'../../../static/public/pitch_on.png':'../../../static/public/circle.png'"></image>
						</view>
						<image class="browseShopImg" :src="url+p.goods_preview"></image>
						<image src="../../../static/yixiajia.png" v-if="p.status==0" style="width: 130rpx;height: 130rpx;position: absolute;top: 0rpx;right: 0rpx;"></image>
						
						
						<view class="browseShopTxtBox">
							<text class="browseShopName">{{p.goods_name}}</text>
							<view class="priceBox">
								<text class="price">￥</text>
								<text class="price" style="font-size: 35rpx;">{{p.now_price.split(".")[0]}}</text>
								<text class="price" style="font-size: 30rpx;">.{{p.now_price.split(".")[1]}}</text>
							</view>
						</view>
					</view>
					<view class="btnsBox">
						<view class="shopBtnBox"></view>
						<view class="shopBtnBox">
							<text></text>
							<text class="shopAddCart" @click.stop="buy(p)" v-if="p.status==1">加入购物车</text>
						</view>
					</view>
				</view>
			</view>
			<view class="btmMenu" v-if="storeEdit">
				<view class="labe" @click="selectAll">
					<image class="selectedIcon" style="margin-right: 20rpx;" :src="all?'../../../static/public/pitch_on.png':'../../../static/public/circle.png'"></image>
					<text style="font-size: 30rpx;color: #333333;">{{all?'取消':'全选'}}</text>
				</view>
				<view class="btnBox" @click="deleteHistroy">
					<view class="btn">
						<text style="font-size: 30rpx;color: #FFFFFF;">删除足迹</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import request from "../../../store/http.js"
	export default {
		data() {
			return {
				url: this.$store.state.url,
				width: '',
				height: '',
				navBar: [{
						name: '商品',
						id: 1
					},
					{
						name: '店铺',
						id: 2
					},
					{
						name: '浏览',
						id: 3
					},
					{
						name: '编辑',
						id: 4
					},
				],
				actionNum: 0,
				selectedShop: [],
				
				page: 1,
				shopData: [],
				histroyList: [],
				goodsList: [],

				all: false,
				storeEdit: false,
				loadingType: 0
			}
		},
		onLoad(e) {
			this.getVideoXY();
			this.actionNum = e.num;
			if (this.actionNum == 0)
				this.initData(2);
			else if(this.actionNum == 1){
				this.initData(1);
			}	
			else if (this.actionNum == 2) {
				this.getHistroy()
			}

		},
		onShow() {
			/* 隐藏凸起图标 */
			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			setTimeout(function() {
				icon.hide();
			}, 100);
			// #endif
			// #ifdef MP-WEIXIN
			let pages = getCurrentPages();
			let currPage = pages[pages.length-1];
			if(currPage.data.refresh ){
				this.page=1;
				if (this.actionNum == 0)
					this.initData(2);
				else if(this.actionNum == 1){
					this.initData(1);
				}	
			}
			// #endif
			
			// #ifdef APP-PLUS
			 uni.$on("handleFun", res => {
			        this.refresh = res.refresh;
					this.page=1;
					if (this.actionNum == 0)
						this.initData(2);
					else if(this.actionNum == 1){
						this.initData(1);
					}	
			        // 清除监听
			        uni.$off('handleFun');
			    });
			
			// #endif
		},
		onReachBottom() {
			if (this.loadingType != 0) { // loadingType!=0;直接返回
				return false;
			}
			this.page++;
			this.loadingType = 1;
			uni.showNavigationBarLoading(); // 显示加载动画
			this.getHistroy();
		},
		methods: {
			goShopDetails(shopId) {
			
				uni.navigateTo({
					url:"../../merchant/merchant?shopId="+item.id
					
				});
			},
			selectAll() {
				this.all = !this.all;
				console.log("this.all", this.all + "/////" + this.histroyList)
				this.histroyList.forEach(item => {
					item.product.forEach(p => {
						p.isChecked = this.all;
					})

				})
				console.log(this.histroyList)
			},
			selectHistroy(item) {
				item.isChecked = !item.isChecked;
				if (item.isChecked) {
					let a = true;
					this.histroyList.forEach(item => {
						item.product.forEach(p => {
							if (!p.isChecked) a = false;
						})

					})
					this.all = a;
				} else {
					this.all = false
				}
			},
			qxShopCollect() {
				var authtoken = uni.getStorageSync("authtoken")
				var ids;
				this.selectedShop.forEach((item, index) => {
					if (item) {
						if (index == 0) ids = this.shopData[index].mcid;
						else ids = ids + "," + this.shopData[index].mcid;
					}
				})
				request.urlRequest(this.url + "/api/member/cancelCollectList", {
					type: 1,
					mcid: ids,
					// modular_id:this.goodsList[index].modular_id
				}, {
					authtoken: authtoken
				}, "POST", res => {
					uni.showToast({
						title: res.data.mag,
						icon: "none"
					})
					if (res.data.code == 1) {
						if (this.actionNum == 0)
							this.initData(2);
						else if(this.actionNum == 1){
							this.initData(1);
						}	
			
					}
				})
			},
			qxcollect() {
				var authtoken = uni.getStorageSync("authtoken")
				var ids;
				this.selectedShop.forEach((item, index) => {
					if (item) {
						if (index == 0) ids = this.goodsList[index].mcid;
						else ids = ids + "," + this.goodsList[index].mcid;
					}
				})
				request.urlRequest(this.url + "/api/member/cancelCollectList", {
					type: 2,
					mcid: ids,
					// modular_id:this.goodsList[index].modular_id
				}, {
					authtoken: authtoken
				}, "POST", res => {
					uni.showToast({
						title: res.data.mag,
						icon: "none"
					})
					if (res.data.code == 1) {
						if (this.actionNum == 0)
							this.initData(2);
						else if(this.actionNum == 1){
							this.initData(1);
						}	

					}
				})
			},
			deleteHistroy() {
				var authtoken = uni.getStorageSync("authtoken")
				var ids;

				this.histroyList.forEach(item => {
					item.product.forEach((p, index) => {
							console.log("index;",index)
						if (p.isChecked) {
							 ids = ids + "," + p.mlid;
						}
					})

				})
				// console.log(ids.in)
				if(ids) ids = ids.substring(ids.indexOf(",")+1)
				request.urlRequest(this.url + "/api/member/cancelLookList", {
					type: 2,
					mlid: ids,
					// modular_id:this.goodsList[index].modular_id
				}, {
					authtoken: authtoken
				}, "POST", res => {
					uni.showToast({
						title: res.data.mag,
						icon: "none"
					})
					if (res.data.code == 1) {
						if (this.actionNum == 2)
							this.getHistroy();

					}
				})
			},
			// 加载更多
			reachBottom() {

				if (this.loadingType != 0) { // loadingType!=0;直接返回
					return false;
				}
				this.page++;
				this.loadingType = 1;
				uni.showNavigationBarLoading(); // 显示加载动画
				if(this.actionNum==0)
				this.initData(2);
				else if(this.actionNum == 1){
					this.initData(1);
				}	
			},
			// 获取视口宽高
			getVideoXY() {
				let res = uni.getSystemInfoSync()
				this.width = res.windowWidth + 'px';
				this.height = res.windowHeight + 'px';
			},
			// 头部导航栏选中
			changeNav(i) {
				if (i != 3) {
					this.actionNum = i;
					this.storeEdit = false
					this.page = 1;
					this.navBar[3].name = '编辑';
					if (i == 0)
						this.initData(2);
					else if(i == 1){
							this.initData(1);
						}	
					else if (i == 2) {
						this.getHistroy()
					}
				} else {

					this.storeEdit = !this.storeEdit;
					this.navBar[3].name = i == 3 ? this.storeEdit ? '完成' : '编辑' : '';
					if (this.storeEdit) {

					}

					// if (this.storeEdit) {
					// 	if (this.actionNum == 0) {
					// 		this.initData(this.shopData);
					// 	} else if (this.actionNum = 1) {
					// 		this.initData(this.store);
					// 	}
					// }

				}
			},
			//收藏商品
			colletProduct(index) {
				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + "/api/member/setCollectStatus", {
					type: 2,
					referer_id: this.goodsList[index].goods_id,
					modular_id: this.goodsList[index].modular_id
				}, {
					authtoken: authtoken
				}, "POST", res => {
					uni.showToast({
						title: res.data.mag,
						icon: "none"
					})
					if (res.data.code == 1) {
						this.goodsList.splice(index, 1)
					}
				})
			},
			initData(t) {
				// for(var key in this.shopData){
				// 	this.selectedShop.push(false);
				// }
				this.selectedShop=[];
				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + "/api/member/collectList", {
					page: this.page,
					type: t
				}, {
					authtoken: authtoken
				}, "POST", res => {
					if (res.data.code == 1) {
						console.log("this.page", this.page + "/" + res.data.data.last_page)
						if (this.page < res.data.data.last_page) {
							this.loadingType = 0
						} else this.loadingType = 2
						for (var key in res.data.data.data) {
							this.selectedShop.push(false);
						}
						if(this.actionNum==0){
							if (this.page == 1)
								this.goodsList = res.data.data.data
							else {
								this.goodsList = this.goodsList.concat(res.data.data.data)
							}
						}else {
							if (this.page == 1)
								this.shopData = res.data.data.data
							else {
								this.shopData = this.shopData.concat(res.data.data.data)
							}
							
						}
						
						console.log(this.selectedShop)
						uni.hideNavigationBarLoading()
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}
				});
			},
			getHistroy() {
				// for(var key in this.shopData){
				// 	this.selectedShop.push(false);
				// }

				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + "/api/member/lookHistory", {
					page: this.page,
					// type: 2
				}, {
					authtoken: authtoken
				}, "POST", res => {
					if (res.data.code == 1) {
						// console.log("this.page",this.page+"/"+res.data.data.last_page)
						if (this.page < res.data.data.last_page) {
							this.loadingType = 0
						} else this.loadingType = 2
						res.data.data.data.forEach(item => {
							item.product.forEach(p => {
								p.isChecked = this.all;
								
							})

						})


						if (this.page == 1)
							this.histroyList = res.data.data.data
						else {
							this.histroyList = this.histroyList.concat(res.data.data.data)
						}

						uni.hideNavigationBarLoading()
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}
				});
			},
			goHome() {
				uni.switchTab({
					url: "../../Shop/index/index"
				})
			},

			selectShop(e, type, a) {
				if (type == 'all') {
					this.all = !this.all;
					for (var key in this.selectedShop) {
						this.selectedShop[key] = this.all;
					}
				} else {
					this.selectedShop.splice(a, 1, !this.selectedShop[a]);
					var allBool = true;
					for (var key in this.selectedShop) {
						if (this.selectedShop[key] == false) {
							allBool = false;
							break;
						}
					}
					this.all = allBool;
				}
				console.log("3333", this.selectedShop)
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
						goods_id: item.goods_id,
						modular_id: item.modular_id,
						num: 1,
					},
					success: res => {
						console.log(res);

						// 吐丝定义写法
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});

					},
					fail: () => {

					},
					complete: () => {}
				});
				// }
			},
			//详情
			navToDetailPage(item) {

				let id = item.goods_id;
				uni.navigateTo({

					url: '../../Shop/product/product?goodsId=' + id + "&modular_id=" + item.modular_id
				})
			},



		}


	}
</script>

<style>
	.home {
		margin-top: 30rpx;
		background: #f72926;
		height: 60rpx;
		text-align: center;
		align-items: center;
		font-size: 26rpx;
		color: #ffffff;
		width: 150rpx;
		line-height: 60rpx;
		border-radius: 60rpx;
	}

	.topNav {
		width: 100%;
		height: 8%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 3;
	}

	.navItem {
		width: 25%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.navTitle {
		font-size: 38rpx;
		color: #333333;
	}

	.lastNavTitle {
		font-size: 38rpx;
		color: #999999;
	}

	.actionTitle {
		font-size: 38rpx;
		color: #000000;
		font-weight: 700;
	}

	.actionLinear {
		width: 50rpx;
		height: 5rpx;
		background: linear-gradient(to right, #fb3923, #ffffff);
		margin-top: 10rpx;
	}

	.containerBox {
		width: 100%;
		position: absolute;
		top: 8%;
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}

	.shopContainer {
		width: 100%;
		border-bottom: 1rpx solid #f3f3f3;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
	}

	.topBox {
		width: 100%;
		height: 120rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.topLeft {
		width: 10%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.selectedIcon {
		width: 50rpx;
		height: 50rpx;
	}

	.topRight {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.shopHeadImg {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.storeInfoBox {
		width: 338rpx;
		height: 100rpx;
		display: flex;
		flex-direction: column;
	}

	.shopName {
		font-size: 32rpx;
		font-weight: 600;
		color: #000000;
	}

	.fenceNum {
		font-size: 28rpx;
		color: #999999;
	}

	.shopImgBox {
		width: 100%;
		height: 136rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
	}

	.shopimgs {
		min-width: 117rpx;
		max-width: 532rpx;
		height: 100%;
		background-color: #f8f8f8;
		border-radius: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.shopImg {
		width: 117rpx;
		height: 117rpx;
		margin: 0 10rpx;
	}

	.btmMenu {
		width: 100%;
		height: 150rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
		z-index: 2;
	}

	.labe {
		width: 30%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.btnBox {
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.btn {
		width: 80%;
		height: 70rpx;
		background-color: #fb3923;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-radius: 40rpx;
	}

	.hint {
		font-size: 28rpx;
		color: #fb3923;
		padding: 10rpx 20rpx;
		background-color: #fee1de;
		border-radius: 40rpx;
	}


	/* 商品模块 */
	.attenShopBox {
		width: 100%;
		height: 92%;
		position: absolute;
		top: 8%;
		z-index: 2;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.shopItemBox {
		width: 100%;
		height: 24%;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		border-radius: 20rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.shopInfoBox {
		width: 100%;
		height: 75%;
		display: flex;
		
		flex-direction: row;
		align-items: center;
		position: relative;
	}	

	.shopInfoImg {
		width: 160rpx;
		height: 160rpx;
		border-radius: 20rpx;
	}

	.shopInfoTxt {
		width: 73%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 2%;
	}

	.shopInfoName {
		font-size: 30rpx;
		color: #333333;
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-line-clamp: 2; //此处为上限行数
		-webkit-box-orient: vertical;
	}

	.priceBox {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
	}

	.price {
		font-size: 22rpx;
		color: #fb4832;
		font-weight: 700;
	}

	.btnsBox {
		width: 100%;
		height: 25%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.shopBtnBox {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.shopCancel {
		font-size: 28rpx;
		margin-right: 50rpx;
		color: #333333;
		border: 1rpx solid #999999;
		background-color: #FFFFFF;
		border-radius: 50rpx;
		padding: 10rpx 20rpx;
	}

	.shopAddCart {
		font-size: 28rpx;
		color: #FFFFFF;
		background-color: #fb4832;
		border-radius: 50rpx;
		padding: 10rpx 20rpx;
	}

	/* 浏览记录 */
	.browseBox {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		position: absolute;
		top: 8%;
	}

	.everyDayBox {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.dateTxt {
		font-size: 50rpx;
		margin-bottom: 20rpx;
	}

	.browseShopBox {
		width: 100%;
		background-color: #FFFFFF;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.browseShopBox:nth-child(2) {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.browseShopBox:last-child {
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}

	.browseShopBox:not(:first-child) {
		border-top: 1rpx solid #F3F3F3;
	}

	.browseShopInfo {
		width: 100%;
		height: 160rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}

	.browseShopImg {
		height: 160rpx;
		width: 160rpx;
		border-radius: 20rpx;
	}

	.browseShopTxtBox {
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	.browseShopName {
		font-size: 30rpx;
		color: #333333;
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-line-clamp: 2; //此处为上限行数
		-webkit-box-orient: vertical;
	}
</style>

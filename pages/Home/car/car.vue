<template>
	<view>
		<!-- <image src="http://47.93.131.133/public/uploads/2019/11/19/7b4fbae3d627804b5ac59a58a1380cb9.jpg" mode=""></image> -->
		<view style="display: flex;flex-direction: column;width: 100%;">



			<view class="shopItemBox" v-for="(item, index) in goodsList" :key="item.id" @click="check('item', index)">
				<view class="leftCheckBox">
					<image class="checkImg" :src="item.checked?'../../../static/home/check.png':'../../../static/home/uncheck.png'"></image>
				</view>

				<image class="leftImg" :src="url+item.product.img"></image>

				<view class="shopItemInfoBox">
					<text class="shopIntroduce">{{item.product.name}}</text>
					<!-- <text class="shopModelTxt">白色断码2xll</text> -->
					<view class="priceNum">
						<text class="price">￥{{item.price}}</text>
						<text style="font-size: 26rpx;color: #999;text-decoration: line-through;flex: 1;">￥{{item.product.price}}</text>
						<view class="numsBox">
							<text class="operation" @tap.stop="sub(item)">-</text>
							<text class="sumNum">{{item.num}}</text>
							<text class="operation" @tap.stop="add(item)">+</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="goodsList.length==0" style="width: 100%;align-items: center;justify-content: center;display: flex;">
			<image src="https://xin.yiyunoto.com/uploads/static/public/car.png" style="width:348rpx ;height: 348rpx;"></image>
		</view>
		<!-- 底部结算 -->
		<view class="totalBox">
			<view class="allCheckBox" @click="check('', 0)">
				<image class="allCheckImg" :src="allChecked?'../../../static/home/check.png':'../../../static/home/uncheck.png'"></image>
				<text style="font-size: 26rpx;color: #666;margin-left: 20rpx;">全选</text>
				<text style="font-size: 26rpx;color: #666;margin-left: 40rpx;" @click.stop="edit">{{deleShow?'完成':'编辑'}}</text>
			</view>

			<view class="sumBtn">
				<text style="font-size: 20rpx; color: #333333;">合计: </text>
				<text style="font-size: 30rpx; color: #FB4832;"> ￥</text>
				<text style="font-size: 36rpx; color: #FB4832;">{{totalMoney}}</text>
				<view class="btn" v-if="!deleShow" @click="orderCreate">结算</view>
				<view class="btn" @click="deleteCartItem" v-if="deleShow">删除</view>
			</view>
		</view>

	</view>
</template>

<script>
	import request from '../../../store/http.js'
	export default {
		data() {
			return {


				url: this.$store.state.url,
				allChecked: true, //是否全选
				totalMoney: 0.0,
				deleShow: false,

				goodsList: [

				],
				shopId: '',




			};
		},
		onLoad(res) {

			this.shopId = res.shopId;


		},
		onShow() {
			this.getShopCarList();
		},
		methods: {
			edit() {
				this.deleShow = !this.deleShow;
			},


			//选中状态处理
			check(type, index) {
				if (type == 'item') {
					this.goodsList[index].checked = !this.goodsList[index].checked;
					this.allChecked = true
					this.goodsList.forEach(item => {
						if (!item.checked) {
							this.allChecked = false
						}
					})

				} else {
					const checked = !this.allChecked

					this.goodsList.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.$forceUpdate()
				this.sum();
				// this.calcTotal(type);
			},

			// 去结算A
			toClose() {
				this.orderCreate(); // 去支付--生成商品订单
				// uni.navigateTo({
				// 	url:'../order/order'
				// })
			},



			// 生成订单接口
			orderCreate() {
				let pids = [];
				this.goodsList.forEach((item) => {
					if (item.checked) {
						pids.push(item.id)
					}
				})
				if (pids.length == 0) return
				let token = uni.getStorageSync("authtoken")
				request.urlRequest(
					this.url + '/api/guangjie/addorder', {
						shop_id: this.shopId, //门店id
						pids: pids.toString(),
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
			// 获取购物车商品列表
			getShopCarList() {
				let authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(
					this.url + '/api/guangjie/get', {
						shopid: this.shopId
					}, {
						authtoken: authtoken
					},
					'POST',
					(res) => {
						// console.log('获取购物车列表',res);
						if (res.data.code == 1) {
							this.goodsList = res.data.data
							this.goodsList.forEach((item) => {
								item.checked = true;
								return item
							})
							this.sum();
							// this.shopCar.moneys=0.0
							// this.shopNull();
							// for (let i = 0; i < this.goodsList.length; i++) {
							// 	// 计算商品价格
							// 	let mon = this.goodsList[i].product.nowprice * this.goodsList[i].num
							// 	this.shopCar.moneys += mon;
							// 	// 计算商品数量
							// 	this.shopCar.numbers += this.goodsList[i].num;
							// }
							// console.log('购物车总价：', this.shopCar.moneys, '购物车总数量：', this.shopCar.numbers);
							// this.shopCar.moneys = this.shopCar.moneys.toFixed(2);
						}
					}
				)
			},
			// 添加商品接口
			add(item) {
				let authtoken = uni.getStorageSync("authtoken")
				console.log(item.id + "/" + this.shopId + "/" + item.pid)
				request.urlRequest(
					this.url + '/api/guangjie/numadd', {
						cart_id: item.id,
						shopid: this.shopId,
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
			sub(item) {
				let authtoken = uni.getStorageSync("authtoken");
				if (item.num == 1) {
					return;
				}
				request.urlRequest(
					this.url + '/api/guangjie/numdel', {
						cart_id: item.id,
						shopid: this.shopId,
						pid: item.pid
					}, {
						authtoken: authtoken
					},
					'POST',
					(res) => {
						if (res.data.code == 1) {
							item.num--;
							this.sum();
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}

					}
				)
			},
			// 移除购物车中商品接口
			deleteCartItem() {
				let cart_ids = [];
				this.goodsList.forEach((item) => {
					if (item.checked) {
						cart_ids.push(item.id)
					}
				})
				if (cart_ids.length == 0) {
					return
				}
				let authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(
					this.url + '/api/guangjie/delCarts', {
						cart_id: cart_ids.toString()
					}, {
						authtoken: authtoken
					},
					'POST',
					(res) => {
						this.getShopCarList()
					}
				)
			},



			//合计金额
			sum() {
				this.totalMoney = 0.0;

				for (let i = 0; i < this.goodsList.length; i++) {
					// 计算商品价格
					if (this.goodsList[i].checked) {
						let mon = this.goodsList[i].price * this.goodsList[i].num

						this.totalMoney += mon;

					}

				}

				this.totalMoney = parseFloat(this.totalMoney).toFixed(2);

			},

		}
	};
</script>

<style lang="less">
	page {
		background-color: #f5f5f5;
	}

	.numsBox {
		margin-right: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.operation {
		width: 40rpx;
		height: 40rpx;
		display: inline-block;
		text-align: center;
		line-height: 40rpx;
		background-color: #FFFFFF;
		color: #E1E1E1;
		border: 1rpx solid #EBEBEB;
	}

	.operation:first-child {
		border-top-left-radius: 20rpx;
		border-bottom-left-radius: 20rpx;
	}

	.operation:last-child {
		color: #FF502E;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}

	.sumNum {
		width: 80rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 26rpx;
		color: #333333;
		border-top: 1rpx solid #EBEBEB;
		border-bottom: 1rpx solid #EBEBEB;
	}

	::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;

	}

	.topBox {
		width: 100%;
		/* #ifdef APP-PLUS */
		height: 12%;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 18%;
		/* #endif */
		position: relative;
	}

	/* 去掉刘海 */
	.status_bar {
		/* #ifndef APP-PLUS */
		height: var(--status-bar-height);
		/* #endif */
		width: 100%;
		padding-top: 60upx;
	}

	.topBg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.top {
		width: 100%;
		height: 30%;
		position: absolute;
		left: 0;
		top: var(--status-bar-height);
		z-index: 2;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.navBox {
		width: 100%;
		height: 50%;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 2;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.title {
		font-size: 36rpx;
		color: #FFFFFF;
		font-weight: 700;
	}

	.edit {
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.menuNav {
		width: 96%;
		height: 7%;
		margin: 0 auto;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
		background-color: #FFFFFF;
	}

	.nav {
		white-space: nowrap;
		width: 85%;
	}

	.bg-white {
		font-size: 25upx;
		color: #FFFFFF;
	}

	.cu-item {
		height: 90upx;
		display: inline-block;
		line-height: 90upx;
		margin: 0 10upx;
		padding: 0 20upx;
	}

	.text-green {
		color: #FFFFFF;
		font-size: 35upx;
	}

	.navItem {
		height: 100%;
		margin: 0 20upx;
		padding: 10upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.activeLine {
		width: 30upx;
		border: 1upx solid #FFFFFF;
	}

	// 订单模块
	.container {

		width: 100%;
		flex: 1;
		padding: 20rpx;
		padding-bottom: 120rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: #f3f3f3;
	}

	.containera {
		width: 100%;
		// height: 72%;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.indentBox {
		// width: 100%;
		// height: 40%;
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		position: relative;
	}

	.indentBox:not(:first-child) {
		margin-top: 20rpx;
	}

	.leftCheckBox {
		padding-left: 20rpx;
		padding-right: 16rpx;
		height: 100%;
		// background: #007AFF;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.indentTitle {
		width: 100%;
		height: 18%;
		display: flex;
		align-items: center;
	}

	.checkImg {
		width: 34rpx;
		height: 34rpx;

	}

	.logoImg {
		width: 100rpx;
		height: 40rpx;
	}

	.indentShopName {
		font-size: 30rpx;
		color: #333;
		margin-left: 5rpx;
		margin-right: 20rpx;
	}

	.detaileIcon {
		width: 30rpx;
		height: 30rpx;
	}

	.commodityBox {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.shopInfoBox {
		width: 86%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.shopImg {
		width: 160rpx;
		height: 160rpx;
	}

	.shopInfoRight {
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.shopIntroduce {
		width: 100%;
		color: #333;
		font-weight: bold;
		font-size: 30rpx;
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-line-clamp: 2; //此处为上限行数
		-webkit-box-orient: vertical;
	}

	.tag {
		display: inline-block;
		width: 92rpx;
		height: 50rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 50rpx;
		border-radius: 10rpx;
		color: #FFFFFF;
		background-color: #FB553E;
		margin-bottom: 30rpx;
	}

	.shopInfoPosition {
		width: 100%;
		height: 120rpx;
		margin-bottom: 20rpx;
	}

	.shopModelBox {
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.rightShopInfo {
		width: 86%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.shopModelTxt {
		width: 100%;
		height: 50rpx;
		display: inline-block;
		font-size: 26rpx;
		line-height: 50rpx;
		color: #999999;
		background-color: rgba(249, 249, 248, 1);
	}

	.priceNum {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 20rpx;
	}

	.price {
		font-size: 36rpx;
		color: #FF3B30;

	}

	// 结算
	.totalBox {
		width: 100%;
		height: 100rpx;

		padding-left: 24rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;

		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;

		z-index: 9999;
	}

	.allCheckBox {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.allCheckImg {
		width: 40rpx;
		height: 40rpx;
	}

	.sumBtn {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.btn {
		font-size: 36rpx;
		color: #FFFFFF;
		background-color: #FB4832;
		text-align: center;
		line-height: 80rpx;
		margin-right: 24rpx;
		border-radius: 40rpx;
		width: 240rpx;
		height: 80rpx;
		background: linear-gradient(90deg, #FF7085 0%, #FF5837 100%);
		margin-left: 24rpx;
	}

	.shopItemBox {
		margin-left: 20rpx;
		margin-right: 20rpx;
		height: 200rpx;

		display: flex;
		flex-direction: row;

		align-items: center;
		border-radius: 16rpx;
		background-color: #FFFFFF;

		.leftImg {
			width: 160rpx;
			height: 160rpx;
			margin-right: 24rpx;
			border-radius: 10rpx;
		}

		.shopItemInfoBox {
			flex: 1;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
	}

	.upshop {
		width: 100%;
		display: flex;
		right: 30rpx;
		flex-direction: row-reverse;
	}

	// 猜你喜欢
	.youLike {
		width: 100%;
		height: 10%;
		margin: 30rpx 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.youLikeImg {
		height: 60rpx;
		width: 422rpx;
	}
</style>

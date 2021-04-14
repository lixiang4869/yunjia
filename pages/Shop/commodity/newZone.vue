<template>
	<view class="content">

	

		<view class="shops">
			<view class="shop" v-for="(item,index) in goods" :key="index" @click="navToDetailPage(item)">
				<view class="img_goods">
					<image :src="url+item.img" mode="scaleToFill" style="width: 310upx;height: 320upx;border-radius: 20upx;" lazy-load="true"></image>
				</view>
				<text class="buy-name">{{ item.name }}</text>
				<view class="shop-price2">
					<view class="priceBox">
						<text class="num" style="font-weight: 700;font-size: 28upx;">￥</text>
						<text class="num" style="font-weight: 700;">{{ item.nowprice }}</text>
						<text class="tj">￥{{ item.price }}</text>
					</view>

					<image src="../../../static/shop/car1.png" style="width: 50upx;height: 50upx;" @click.stop="buy(item)"></image>

				</view>
			</view>
		</view>


		<view class="che" @click="notarize">
			<image src="../../../static/shop/car.png" mode=""></image>
		</view>

	</view>
</template>

<script>
	import request from '../../../store/http.js';
	export default {

		data() {
			return {
				
				cateMaskState: 0, //分类面板展开状态
				headerPosition: "fixed",
				headerTop: "0px",
				loadingType: 0, //加载更多状态
				filterIndex: 0,
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				goods: [],
				location: {},
				orderbys: ["", "sellnum", "nowprice"],
				addressName: '',
				url: this.$store.state.url,
				page: 1,
				catename: "",
				citycode: "0"
			};
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
		onLoad() {
			this.loadData();
		},

		//下拉刷新
		onPullDownRefresh() {

			this.loadData();
			uni.stopPullDownRefresh()
		},

		methods: {
			// 跳转购物车
			notarize: function() {
				uni.navigateTo({
					url: '/pages/Shop/shop_car/index',
				})
			},
			goSearch() {
				uni.navigateTo({
					url: "../searchPage/searchPage?code=" + this.citycode
				})
			},
			goback() {
				uni.navigateBack({

				})
			},
			loadData() {
			
				uni.showLoading({
					title: '正在加载'
				})
				// var token=uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/index/newMemProduct', {
						// page:this.page,
						// typeid:this.cateId,
						// code:this.citycode,
						// orderby:this.orderbys[this.filterIndex]
					}, {
						// code:this.citycode
					},
					'POST',
					(res) => {
						// if(this.page<res.data.data.last_page){
						// 	this.loadingType=0
						// }else this.loadingType=2

						this.goods = res.data.data;
						uni.hideLoading();

					}
				)

			},
			//筛选点击
			tabClick(index) {
				if (this.filterIndex == index) {
					return;
				}
				this.filterIndex = index;



				this.loadData();
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
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: '../product/product?goodsId=' + id + "&modular_id=" + item.modular_id
				})
			},

		},
	}
</script>

<style lang="scss">
	page {
		background: #efefef;
	}
	.che {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		
		// box-shadow: 0 0 10upx #A0A0A0;
		position: fixed;
		right: 40upx;
		bottom: 88upx;
		z-index: 999;
	
		>image {
			width: 120upx;
			height: 120upx;
			position: absolute;
			top: 20upx;
			left: 20upx;
		}
	}

	.shops {
		margin: 0 20upx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.shop {
			width: 46%;
			padding-left: 10rpx;
			padding-right: 10rpx;
			// box-shadow: 1upx 1upx 10upx 0upx #e7e7e7;
			margin: 10upx 0;
			background: #ffffff;
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			border-radius: 20upx;

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
				font-size: 32upx;
				margin: 10upx 0;
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


			.shop-price2 {
				margin-bottom: 15upx;
				width: 100%;
				margin-top: 30upx;
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

					color: #FE1722;
					font-size: 34upx;

				}

				.tj {

					text-decoration: line-through;
					color: #999999;
					margin-left: 5upx;
					font-size: 28upx;
					text-align: left;
					flex: 1;
				}
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
</style>

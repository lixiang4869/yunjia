<template>
	<view class="content">
		<view class="header">
			<view class="tops">
				<view class="status_bar"></view>
				<view class="search_bar">
					<view @click="goback">
						<image :src="back" mode="" style="width: 4vw;height: 4vw;"></image>
					</view>
					<view class="header-two" @click="gosearch()">
						<image src="../../../static/home/sousuo.png" class="search"></image>
						<text class="search-text"> 城市商家</text>
					</view>
				</view>
				<view class="header-noe">
					<image src="https://xin.yiyunoto.com/uploads/static/home/location1.png" class="location"></image>
					<text class="biaoti-one">{{addressName}}</text>
					<image src="../../../static/home/right.png" class="right"></image>
				</view>
			</view>
		</view>
		<view class="navbar">
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
				综合排序
			</view>
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				销量优先
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
				<text>赠送比率</text>
				<view class="p-box">
					<text :class="{active: priceOrder === 1 && filterIndex === 2}" class="yticon icon-shang"></text>
					<text :class="{active: priceOrder === 2 && filterIndex === 2}" class="yticon icon-shang xia"></text>
				</view>
			</view>
			<text class="cate-item yticon icon-fenlei1" @click="toggleCateMask('show')"></text>
		</view>
		<view class="goods-list">
			<view v-for="(item, index) in shops" :key="index" class="goods-item" @click="navToDetailPage(item)">
				<view class="image-wrapper">
					<image :src="url+item.logo" mode="aspectFill"></image>
				</view>
				<view class="shop">
					<text class="titles">{{item.name}}</text>
					<text class="price-box">{{item.describe}}</text>
					<view class="price-box">
						<text>月售 {{item.sell}}</text>
						<text>{{item.getDistance}}</text>

					</view>
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	import request from '../../../store/http.js';
	export default {

		data() {
			return {
				back: '../../../static/public/blackBack.png',
				cateMaskState: 0, //分类面板展开状态
				headerPosition: "fixed",
				headerTop: "0px",
				loadingType: 0, //加载更多状态
				filterIndex: 1,
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				shops: [],
				location: {},
				addressName: '',
				url: this.$store.state.url,
				page:1,
				
			};
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
		onLoad(options) {
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight + 'px';
			// #endif
			this.cateId = options.id;
			this.location = uni.getStorageSync('location'); //从缓存中取出经纬度
			this.addressName = uni.getStorageSync('addressName');
			this.loadData();
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh() {

			this.loadData();
			uni.stopPullDownRefresh();
		},
onReachBottom() {
		
			// 每次拉到页面底部,请求页数自加
			this.page++;
			if (this.loadingType != 0) { // loadingType!=0;直接返回
			    return false;
			}
			this.loadingType = 1;
			uni.showNavigationBarLoading();// 显示加载动画
			request.urlRequest(
				this.url + '/api/Guangjie/shoplist', {
					lng: this.location.longitude,
					lat: this.location.latitude,
					shoptype: this.cateId,
					type: this.filterIndex,
					page:this.page
				}, {},
				'POST',
				(res) => {
					if(this.page<res.data.data.pageTotal){
						this.loadingType=0
					}else this.loadingType=2
										
					  uni.hideNavigationBarLoading()
					this.shops = this.shops.concat(res.data.data.items);
				}
			)
			
		},
		methods: {
			goback() {
				uni.navigateBack({

				})
			},
			loadData() {
				console.log('第一次获取商家列表', this.cateId);
				request.urlRequest(
					this.url + '/api/Guangjie/shoplist', {
						lng: this.location.longitude,
						lat: this.location.latitude,
						shoptype: this.cateId,
						type: this.filterIndex
					}, {},
					'POST',
					(res) => {
						console.log('第一次获取商家列表', res);
						uni.hideLoading();
						if(this.page<res.data.data.pageTotal){
							this.loadingType=0
						}else this.loadingType=2
						this.shops = res.data.data.items;
					}
				)

			},
			//筛选点击
			tabClick(index) {
				if (this.filterIndex == index) {
					return;
				}
				this.filterIndex = index;


				uni.showLoading({
					title: '正在加载'
				})
				this.loadData();
			},

			//详情
			gosearch() {

				uni.navigateTo({
					url: '../../Shop/searchPage/searchPage'
				})
			},

			//详情
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/pages/Home/merchant/merchant?shopId=${id}`
				})
			},

		},
	}
</script>

<style lang="scss">
	page {
		background: #efefef;
	}

	.header {
		background: #ffffff;
		width: 100%;

	}

	.tops {

		width: 100%;

		top: 0upx;
		left: 0upx;

	}

	.biaoti-one {
		font-weight: 600;
		margin-left: 10upx;
		font-size: 30upx;
		font-family: PingFangSC-Medium, PingFang SC;
		color: #333333;

	}

	.search-text {
		margin-left: 20upx;
		font-size: 25upx;
		font-family: PingFangSC-Medium, PingFang SC;
		color: #97A3B2;

	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.location {
		/* //第一行定位图片 */
		margin-left: 24upx;
		margin-right: 24upx;
		width: 28upx;
		height: 28upx;
	}

	.search {


		width: 24upx;
		height: 24upx;
	}

	.right {
		/* //第一行向右图片 */
		margin-left: 24upx;

		width: 12upx;
		height: 12upx;
	}

	.header-noe {
		margin-top: 40upx;
		padding-bottom: 40upx;
		width: 100%;
		flex-direction: row;
		display: flex;
		justify-content: left;
		align-items: center;


	}

	.search_bar {
		display: flex;
		width: 100%;
		justify-content: center;
		flex-direction: row;
		align-items: center;
	}

	.header-two {

		margin-left: 40upx;
		margin-right: 20upx;
		width: 82%;
		padding-left: 20upx;
		height: 60upx;
		flex-direction: row;
		display: flex;
		justify-content: left;
		align-items: center;
		background: #dee2f0;

	}

	.navbar {

		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}

		.p-box {
			display: flex;
			flex-direction: column;

			.yticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;

				&.active {
					color: $base-color;
				}
			}

			.xia {
				transform: scaleY(-1);
			}
		}

		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 分类 */
	.cate-mask {
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 95;
		transition: .3s;

		.cate-content {
			width: 630upx;
			height: 100%;
			background: #fff;
			float: right;
			transform: translateX(100%);
			transition: .3s;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.cate-content {
				transform: translateX(0);
			}
		}
	}

	.cate-list {
		display: flex;
		flex-direction: column;
		height: 100%;

		.cate-item {
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}

		.two {
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}

		.active {
			color: $base-color;
		}
	}

	/* 商品列表 */
	.goods-list {
		display: flex;
		flex-wrap: wrap;


		.goods-item {
			margin: 20upx;
			background: #ffffff;
			display: flex;
			flex-direction: row;
			width: 100%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {}
		}

		.image-wrapper {
			margin-left: 20upx;
			margin-top: 20upx;
			width: 180upx;
			height: 140upx;
			border-radius: 15px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.shop {
			width: 100%;
			margin-left: 20upx;
			margin-right: 20upx;
		}

		.titles {
			font-size: 32upx;
			color: #333333;
			font-weight: 600;
			line-height: 80upx;
		}

		.price-box {
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: space-between;

			font-size: 25upx;

			color: #666666;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;

			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}
	}
</style>

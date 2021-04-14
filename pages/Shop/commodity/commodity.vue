<template>
	<view class="content">
	
		<view class="titleTxtBox" style="height: 200rpx;position: fixed;top:-14px; left: 0;z-index: 1; display: flex;flex-direction: column;padding-top: 20upx;padding-bottom: 20upx;">
			<view class="status_bar"></view>
			<view class="header-noe" >
				<image style="width:19rpx;height: 34rpx;margin-left: 20rpx;" src="../../../static/public/goBack.png" @click="goback"></image>
				<text class="biaoti-one">{{catename}}</text>
				<!-- <image src="../../../static/home/down.png" style="width: 18rpx;height: 11rpx;margin-left: 20rpx;"></image> -->
				<view class="header-two" @click="goSearch()">
					<image src="../../../static/shop/search.png" class="search"></image>
					<text class="search-text"> 搜索商品</text>
	
				</view>
				<!-- #ifdef APP-PLUS -->
				<image style="width: 50rpx;height: 50rpx;margin-left: 34rpx;margin-right: 20rpx;" src="../../../static/shop/topcar.png" @click="notarize"></image>
				<!-- #endif -->
			</view>
			<view class="navbar" >
				<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
					综合排序
				</view>
				<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
					销量优先
				</view>
				<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
					<text>价格</text>
					<view class="p-box">
						<text :class="{active: priceOrder === 1 && filterIndex === 2}" class="yticon icon-shang"></text>
						<text :class="{active: priceOrder === 2 && filterIndex === 2}" class="yticon icon-shang xia"></text>
					</view>
				</view>
			</view>
		</view>
		
	
	<view class="shops">
		<view class="shop" v-for="(item,index) in goods" :key="index" @click="navToDetailPage(item)">
			<view class="img_goods">
				<image :src="url+item.img" mode="scaleToFill" style="width: 310upx;height: 320upx;border-radius: 20upx;"
				 lazy-load="true"></image>
			</view>
			<text class="buy-name">{{ item.name }}</text>
			<view class="shop-price2">
				<view class="priceBox">
					<text class="num" style="font-weight: 700;font-size: 28upx;">￥</text>
					<text class="num" style="font-weight: 700;">{{ item.nowprice }}</text>
					<text class="tj">￥{{ item.price }}</text>
				</view>
	
				<image src="../../../static/shop/car1.png" style="width: 50upx;height: 50upx;" @click.stop="buy(item)" v-if="cateId!=29"></image>
	
			</view>
		</view>
	</view>
	<!-- 	<view class="goods-list">
			<view 
				v-for="(item, index) in goods" :key="index"
				class="goods-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="url+item.img" mode="aspectFill"></image>
				</view>
				<view class="shop">
				<text class="titles">{{item.name}}</text>
				<text class="price-box" >{{item.describe}}</text>
				<view class="price-box">
					<text>库存 {{item.stock}}</text>
				
				</view>
				<view style="display: flex;flex-direction: row;" >
				<text class="num">￥{{item.nowprice}}</text>
					<view class="tj">￥{{ item.price }}</view>
					</view>
				</view>
			</view>
		</view> -->
	
		<!-- #ifdef MP-WEIXIN -->
		<view class="che" @click="notarize">
			<image src="../../../static/shop/car.png" mode=""></image>
		</view>
		<!-- #endif -->
		
	</view>
</template>

<script>
	
	import request from '../../../store/http.js';
	export default {
		
		data() {
			return {
				
				cateMaskState: 0, //分类面板展开状态
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 0, //加载更多状态
				filterIndex: 0, 
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				goods: [],
				location:{},
				orderbys:["","sellnum","nowprice"],
				addressName:'',
				url: this.$store.state.url,
				page:1,
				catename:"",
				citycode:"0"
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
		onLoad(options){
			this.citycode=options.code;
			this.cateId = options.id;
			this.catename=options.name;
			// console.log("onLoad",this.catename)
			this.loadData();
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			
			this.loadData();
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			
			// 每次拉到页面底部,请求页数自加
			
			if (this.loadingType != 0) { // loadingType!=0;直接返回
			    return false;
			}
			this.page++;
			this.loadingType = 1;
			uni.showNavigationBarLoading();// 显示加载动画
			request.urlRequest(
				this.url + '/api/index/erpTypeProducts',
				{
					page:this.page,
					typeid:this.cateId,
					code:this.citycode,
					orderby:this.orderbys[this.filterIndex]
				},
				{
					code:this.citycode
				},
				'POST',
				 (res) => {
					 if(this.page<res.data.data.last_page){
					 	this.loadingType=0
					 }else this.loadingType=2
					
					   uni.hideNavigationBarLoading()
				
				this.goods=	this.goods .concat(res.data.data.data);
				
				}
			)
		},
		methods: {
			// 跳转购物车
			notarize: function() {
				uni.navigateTo({
					url: '/pages/Shop/shop_car/index',
				})
			},
			goSearch(){
				uni.navigateTo({
					url:"../searchPage/searchPage?code="+this.citycode
				})
			},
			goback(){
			uni.navigateBack({
				
			})
			},
		loadData() {
			this.page=1;
		uni.showLoading({
			title: '正在加载'
		})
			// var token=uni.getStorageSync("authtoken");
			request.urlRequest(
				this.url + '/api/index/erpTypeProducts',
				{
					page:this.page,
					typeid:this.cateId,
					code:this.citycode,
					orderby:this.orderbys[this.filterIndex]
				},
				{
					// code:this.citycode
				},
				'POST',
				 (res) => {
					 if(this.page<res.data.data.last_page){
					 	this.loadingType=0
					 }else this.loadingType=2
					  
					this.goods =res.data.data.data;
					uni.hideLoading();
					
				}
			)
			
		},
			//筛选点击
			tabClick(index){
				if(this.filterIndex == index ){
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
			navToDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: '../product/product?goodsId='+id+"&modular_id=" + item.modular_id
				})
			},
		
		},
	}
</script>

<style lang="scss">
	page{
		background: #efefef;
	}
	.content{
		display: flex;
		width: 100%;
		flex-direction: column;
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

.header {
	background: #ffffff;
	width: 100%;
	display: flex;
	flex-direction: column;
}
.titleTxtBox {
		width: 100%;
		height: 8.1%;
		margin: 30upx 0;
		display: flex;
		// justify-content: center;
		align-items: center;
		background-image: linear-gradient(#F62F2A,#f8352d);
		// background-color: #F62F2A;
	}
.tops{
	
	width: 100%;

	top:0upx ;
	left:0upx ;
	
}
	.biaoti-one {
		font-weight: 600;
		margin-left: 10upx;
		font-size: 36upx;
		font-family: PingFangSC-Medium, PingFang SC;
		color: #ffffff;
	
	}
	.search-text {
		font-weight: 500;
		margin-left: 20upx;
		font-size: 26upx;
		font-family: PingFangSC-Medium, PingFang SC;
		color: #f7624d;
	
	}
 .status_bar {
    background: $uni-bg-color-top;
    position: fixed;
    top:0rpx;
    height: var(--status-bar-height);  
    width: 100%;
     z-index: 999;
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
.search_bar{
	display: flex;
	width: 100%;
	justify-content: center;
	flex-direction: row;
	align-items: center;
}
.header-two {

	margin-left: 40upx;
	margin-right: 20upx;
	flex: 1;
	/* #ifdef APP-PLUS */
	margin-right: 20rpx;
	/* #endif */
	/* #ifdef MP-WEIXIN */
	margin-right: 230rpx;
	/* #endif */
	border-radius:30rpx ;
	padding-left: 20upx;
	height: 60upx;
	flex-direction: row;
	display: flex;
	justify-content: left;
	align-items: center;
	background: #ffffff;

}
	.navbar{
	
		display: flex;
		width: 100%;
		height: 80upx;

		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: #ffffff;
			position: relative;
			&.current{
				font-weight: 800;
				color: #ffffff;
				&:after{
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
		.p-box{
			display: flex;
			flex-direction: column;
			.yticon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
				&.active{
					color: $base-color;
				}
			}
			.xia{
				transform: scaleY(-1);
			}
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
			&:after{
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
	.cate-mask{
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 95;
		transition: .3s;
		
		.cate-content{
			width: 630upx;
			height: 100%;
			background: #fff;
			float:right;
			transform: translateX(100%);
			transition: .3s;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.cate-content{
				transform: translateX(0);
			}
		}
	}
	.cate-list{
		display: flex;
		flex-direction: column;
		height: 100%;
		.cate-item{
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
 			font-size: 28upx;
			color: #555;
			position: relative;
		}
		.two{
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}
		.active{
			color: $base-color;
		}
	}

	.shops {
		padding-top: 250rpx;
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

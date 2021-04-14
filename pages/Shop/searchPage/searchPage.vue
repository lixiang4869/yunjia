<template>
	<view class="">
		<view class="place">
			<view class="input-box">
				<input placeholder="输入商品名称" :focus="showPopupBottom" @input="getName"/>
			</view>
			<text @click="gosearch" style="font-size: 30rpx;color: #333333;">搜索</text>
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
	
				<image src="../../../static/shop/car1.png" style="width: 50upx;height: 50upx;" @click.stop="buy(item)"></image>
	
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
				url: this.$store.state.url  ,
					name:'',
					citycode:0,
				goods:[],
				 showPopupBottom: true, //自动聚焦
				 loadingType:0,
				 page:1
			}
		},
		onLoad(e) {
			this.citycode=e.code;
		},
		onReachBottom() {
			if (this.loadingType != 0) { // loadingType!=0;直接返回
			    return false;
			}
			this.loadingType = 1;
			uni.showNavigationBarLoading();// 显示加载动画
			this.page++;
			this.searchgoods()
		},
		methods:{
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
			getName(e){
				this.name = e.target.value;
				
				// console.log(this.name);
			},
			gosearch(){
				this.page=1;
				this.searchgoods();
			},
			searchgoods() {
				
			 var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(
					this.url + '/api/index/searchErpGoods', {
						name:this.name,
						code:this.citycode,
						page:this.page
					},	{authtoken:authtoken,code:this.citycode},
					
					'POST',
					(res) => {
						console.log(res);
						if(res.data.code==1){
							if(this.page<res.data.data.last_page){
								this.loadingType=0
							}else this.loadingType=2
												
							  uni.hideNavigationBarLoading()
							if(this.page==1){
									this.goods = res.data.data.data;
									if(this.goods.length==0){
										uni.showToast({
											title:"暂无商品",
											icon:"none"
										})
									}
							}				
						
							else this.goods = this.goods.concat(res.data.data.data)
						}else{
							uni.showToast({
								title:res.data.msg,icon:"none"
							})
						}
						
					}
				)
			},
		}
	}
	
</script>

<style lang="less">
	.place{
		width:92%;
		padding: 0 4%;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content:center;
		z-index: 10;
		background-color: #fff;
		.input-box{
			width: 75%;
			height: 60upx;
			background-color: #f3f3f3;
			border-radius: 30upx;
			line-height: 60upx;
			margin-right: 40upx;
			input{
				padding-top:10upx;
				align-items: center;
				padding-left: 28upx;
				font-size: 28upx;
			}
		}
	}


	/* 商品列表 */
	// .goods-list{
	// 	display:flex;
	// 	flex-wrap:wrap;
		
	
	// 	.goods-item{
	// 		border-radius: 15upx;
	// 		margin: 20upx;
	// 		background: #ffffff;
	// 		display:flex;
	// 		flex-direction: row;
	// 		width: 100%;
			
	// 		&:nth-child(2n+1){
			
	// 		}
	// 	}
	// 	.image-wrapper{
	// 		margin-left: 20upx;
	// 		margin-top: 20upx;
	// 		width: 180upx;
	// 		height: 140upx;
	// 		border-radius: 5px;
	// 		overflow: hidden;
	// 		image{
	// 			width: 100%;
	// 			height: 100%;
	// 			opacity: 1;
	// 		}
	// 	}
	// 	.shop{
	// 		width: 100%;
	// 		margin-left: 20upx;
	// 		margin-right: 20upx;
	// 	}
	// 	.titles{
	// 		font-size: 32upx;
	// 		color: #333333;
	// 		font-weight: 600;
	// 		line-height: 80upx;
	// 	}
	// 	.price-box{
	// 		display: flex;
	// 		width: 100%;
	// 		align-items: center;
	// 		justify-content: space-between;
			
	// 		font-size: 25upx;
		
	// 		color: #666666;
	// 	}
	// 	.price{
	// 		font-size: 28upx;
	// 		color: #EF5350;
	// 		line-height: 1;
	// 		&:before{
	// 			content: '￥';
	// 			font-size: 26upx;
	// 		}
	// 	}
	// }
	// .num {
	// 	margin-top: 20upx;
	// 	color: #FE1722;
	// 	font-size: 34upx;
		
	// }
	
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

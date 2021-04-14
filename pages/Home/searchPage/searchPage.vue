<template>
	<view class="">
		<view class="place">
			<view class="input-box">
				<input placeholder="搜索店铺" :focus="showPopupBottom" @input="getName"/>
			</view>
			<text @click="searchgoods">搜索</text>
		</view>
		<view >
				<view class="merchant" v-for="(v, index) in shops" :key="index" @tap="merchantStore(v, index)">
					<view class="shop_top">
						<view class="shopLeft">
							<image :src="url+v.logo" mode="" class="shop_image"></image>
						</view>
						<view class="shop_top2">
							<text class="shop_name">{{v.name}}</text>
							<text class="shop_sell">已售{{v.sell}}</text>
						</view>
						<view class="shop_distance">
							<image src="https://xin.yiyunoto.com/uploads/static/home/dingwei.png" mode="" class="shop_distance_img"></image>
							<text>{{v.getDistance}}</text>
						</view>
					</view>
					<view class="shops">
						<view class="shop_goods" v-for="(item, j) in v.product" :key="j">
							<image class="shop_goods_img" :src="url+item.img" @click.stop="goProductDetails(item.product_id,v.id)"></image>
							<text class="shop_goods_text">￥{{item.nowprice}}</text>
						</view>
					</view>
				</view>
		
			</view>
		
		<!-- <view class="history">
			<view>搜索历史</view>
		</view>
		<view class="lishi">
			<text>易货</text>
		</view>
		<view class="grace">
			<text>清空历史</text>
		</view> -->
	</view>
</template>

<script>
	import request from '../../../store/http.js';	
	export default {
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
		data() {
			return {
				url: this.$store.state.url  ,
					name:'',
				shops:[],
				 showPopupBottom: true, //自动聚焦
			}
		},
		methods:{
			// 店铺点击事件
			merchantStore(item) {
				uni.navigateTo({
					url:"../../Home/merchant/merchant?shopId="+item.id
				})
			},
			// 点击商品跳转
			goProductDetails(goodsId,shopId) {
			console.log(goodsId,shopId);
				uni.navigateTo({
		
					url: '../../Home/storDetails/storeDetails?goodsId=' + goodsId + '&shopid=' + shopId
				});
			},
			getName(e){
				this.name = e.target.value;
				console.log(this.name);
			},
			searchgoods() {
				this.location = uni.getStorageSync('location');//从缓存中取出经纬度
			 var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(
					this.url + '/api/guangjie/indexshop', {
						keyword:this.name,
						lng: this.location.longitude,
						lat: this.location.latitude,
					},	{authtoken:authtoken},
					
					'POST',
					(res) => {
						console.log(res);
						if(res.data.code==1){
							this.shops = res.data.data.items;
							if(this.shops.length==0){
								uni.showToast({
									title:'未搜索到店铺',
									icon:'none'
								})
							}
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
						
					}
				)
			},
		}
	}
	
</script>

<style lang="less">
	.merchant {
			flex-direction: column;
			box-sizing: border-box;
			margin: 20upx 30upx 0;
			display: flex;
			padding: 20upx 0 22upx 9upx;
			
			.shop_top{
				padding: 20upx 10upx 20upx 10upx;
				flex-direction: row;
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				width: 100%;
				.shop_image{	
					background: #00B26A;
						width: 90upx;
						height: 90upx;
						overflow: hidden;
						border-radius:50%;
						
						float: left;
					}
				.shop_distance{
					.shop_distance_img {
					
						width: 24upx;
						height: 24upx;
						overflow: hidden;
						margin-right: 10upx;
					
					}
					flex-direction: row;
					justify-content: center;
					align-items: center;
					display: inline-block;
					float: right;
				}
				.shop_top2{		
					padding-left: 12upx;
					display: flex;
					flex: 1;
					flex-direction: column;
					.shop_name{
					font-size: 32upx;
					color: #333333;
					font-weight: 500;
					}
					.shop_sell{
					font-size: 26upx;
					color: #999999;
					
					
				}
			}
				
			}
			.shops {
				margin: 0 30upx;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				justify-content: start;
			.shop_goods {
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				position: relative;
				/* // justify-content: flex-end; */
			
				.shop_goods_img{
					
					margin-left: 20upx;
						width: 180upx;
						height: 180upx;
						overflow: hidden;
				
				}
				.shop_goods_text {
					background: #000000;
					opacity: 0.5;
					font-size: 12px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
					position: absolute;
					bottom: 0upx;
					left: 20upx;
				}
			}
	
				}
			}
			
		
		
	
	.place{
		font-size: 32upx;
		width:92%;
		padding: 0 4%;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content:center;
		z-index: 10;
		background-color: #fff;
		border-bottom: 2upx solid #E6E6E6;
		.input-box{
			width: 75%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 10upx;
			margin-right: 40upx;
			input{
				padding-top:10upx;
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}
	}
	.history{
		border-bottom: 2upx solid  #E6E6E6;
		line-height: 80upx;
	}
	.lishi{
		margin: 30upx 0;
		padding-left: 40upx;
		text{
			background-color:#f5f5f5;
			margin-right: 20upx;
			padding: 10upx 10upx;
			border-radius:8upx;
			color: #585858;
		}
	}
	.grace{
		display: flex;
		justify-content:flex-end;
		margin:20upx 30upx 0 0;
	}
</style>

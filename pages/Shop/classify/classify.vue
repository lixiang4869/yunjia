<template>
	<view>
		<!-- 搜索 -->
		<view class="place">
			<view class="input-box">
				<input v-model="filterText" placeholder="输入商品名称" @tap="toSearch()" />
			</view>
			<text >搜索</text>
		</view>
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view scroll-y="true" class="left">

				<view class="row" v-for="(category,index) in categoryList" :key="category.id" :class="[index==showCategoryIndex?'on':'']"
				 @tap="showCategory(index)">
					<view class="text">
						<view class="block"></view>
						{{category.name}}
					</view>
				</view>

			</scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view scroll-y="true" class="right">
				<!-- <view class="category" v-for="(category,index) in categoryList" :key="category.id" v-show="index==showCategoryIndex" > -->
				<view class="list">
					<view class="box" v-for="(box,i) in secondList" :key="i" @tap="toCategory(box)">
						<image :src="url+box.img"></image>
						<view class="text">{{box.name}}</view>
					</view>
					<!-- </view> -->
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	import request from '../../../store/http.js';
	export default {
		data() {
			return {
				url: this.$store.state.url,
				filterText: '',
				showCategoryIndex: 0,
				//分类列表
				categoryList: [],
				secondList: []
			}
		},
		onLoad() {
			this.getClassify();
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
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		methods: {
			//消息列表
			toMsg() {
				uni.navigateTo({
					url: '../../msg/msg'
				})
			},
			//一级分类
			getClassify() {
				request.urlRequest(
					this.url + '/api/index/allType', {

					}, {},
					'POST',
					(res) => {
						if (res.data.code == 1) {
							this.categoryList = res.data.data;
							this.showCategory(0);
							console.log(res);
						} else {
							uni.showToast({
								title: res.data.msg,icon:"none"
							})
						}
					}
				)
			},
			//二级分类
			showCategory(index) {
				
				request.urlRequest(
					this.url + '/api/index/type', {
						typeid: this.categoryList[index].id
					}, {},
					'POST',
					(res) => {
						if (res.data.code == 1) {
							this.secondList = res.data.data.type;
							this.showCategoryIndex = index;
							console.log(res);
						} else {
							uni.showToast({
								title: res.data.msg,icon:"none"
							})
						}
					}
				)
			},
			toCategory(e) {
				uni.setStorageSync('catName', e.name);
				uni.navigateTo({
					url: '../commodity/commodity?id=' + e.id
				});
			},
			//搜索跳转
			toSearch() {
				// uni.showToast({title: "建议跳转到新页面做搜索功能"});
				uni.navigateTo({
					url: "../searchPage/searchPage"
				})
			}
		}
	}
</script>
<style lang="less">
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		height: var(--status-bar-height); //覆盖样式
	}

	.place {
		width: 92%;
		padding: 0 4%;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		border-bottom: 2upx solid #E6E6E6;
		font-size: 28upx;
		.input-box {
			width: 75%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 10upx;
			margin-right: 40upx;

			input {
				padding-top: 10upx;
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}

	}

	.category-list {
		width: 100%;
		
		display: flex;

		.left,
		.right {
			position: absolute;
			
			top: 0upx;
			
			bottom: 0upx;
		}

		.left {
			width: 24%;
			left: 0upx;
			background-color: #f2f2f2;

			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;

				.text {
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;

					.block {
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}

				&.on {
					height: 100upx;
					background-color: #fff;

					.text {
						font-size: 30upx;
						font-weight: 600;
						color: #2d2d2d;

						.block {
							width: 10upx;
							top: 10%;
						}
					}
				}
			}
		}

		.right {
			width: 76%;
			left: 24%;
			
			

				.list {
				
					width: 100%;
					display: flex;
					flex-wrap: wrap;

					.box {
						width: calc(71.44vw / 3);
						margin-bottom: 30upx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;

						image {
							width: 60%;
							height: calc(71.44vw / 3 * 0.6);
						}

						.text {
						
							margin-top: 5upx;
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 26upx;
						}
					}
				}
			
		}
	}
</style>

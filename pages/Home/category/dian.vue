<template>
	<view :style="{width:width+'px',height:height+'px'}" class="content">
		<view class="top" v-bind:style="[{backgroundImage:'url('+ (url+shopInfo.logo) +')'}]">
		<view style="width: 50rpx;height: 50rpx;margin-left: 20rpx;" @click="backPage">
			<image style="width: 19rpx;height: 34rpx;" src="../../../static/public/goBack.png"></image>
		</view>
		<view style="font-size: 36rpx; color: #fff;"> 店铺详情</view>
		<view style="width: 50rpx;height: 50rpx;margin-left: 20rpx;"></view>
		</view>
		<!-- 标题 -->
		<view class="headerbox">
			<image :src="url+shopInfo.logo" mode="" style="width: 100rpx;height: 100rpx;margin-left: 24rpx;margin-top: 16rpx;"></image>
			<view class="Exhibition">
				<view style="display: flex;flex-direction: row;width: 100%;justify-content: space-between;">
					<text style="font-size: 30rpx;font-weight: bold;">{{shopInfo.name}}</text>
					<image src="../../../static/shop/uncollect.png" style="width: 44rpx;height: 44rpx;margin-right: 24rpx;"></image>
				</view>
				
				<text style="font-size: 22rpx;color: #999;">35分钟 | 3.3km</text>
				<text style="font-size: 22rpx;color: #999;">配送时间：08:00 - 18:00</text>
				<!-- <text>配送服务：提供高品质配送服务</text> -->
			</view>
		</view>
		<!-- 中部 -->
		<view class="foot">
			<view class="paceHeader">
				<view class="paceOne" @click="xuanze(0)">
					<text :class="[xuan==0?'selectTitle':'unSelectTitle']">点菜</text>
					<image src="../../../static/home/xia.png" mode="" :class="[xuan==0?'showImg':'unshowImg']"></image>

				</view>
				<view class="pacetoo" @click="xuanze(1)">
					<text :class="[xuan==1?'selectTitle':'unSelectTitle']">评价</text>
					<image src="../../../static/home/xia.png" mode="" :class="[xuan==1?'showImg':'unshowImg']"></image>


				</view>
			</view>
			<view class="search">
				<image src="../../../static/home/sousuo.png" style="width: 22rpx;height: 22rpx;margin-right: 10rpx;"></image>
				<view>搜索</view>
			</view>
		</view>
		<!-- 菜品选择 -->
		<view class="pace" v-if="xuan==0">
			<scroll-view class="ul" :scroll-y="true">
				<view class="li" v-for="(item,index) in classNavArr" :key="index" @click="selectClass($event,index)" :style="{backgroundColor:navAction==index ? '#FFFFFF' : '#F3F3F3',height:(height/classNavArr.length)+'px',minHeight:'100rpx'}">
					<!-- <view class="linea" v-if="navAction == index"></view> -->
					<!-- <image :src="index==0? item.ima:''" mode="" style="width: 35rpx;height: 35rpx;padding-right: 10rpx;"></image> -->
					<text :class="navAction == index ? 'txtAction' : ''">{{item.name}}</text>
				</view>
			</scroll-view>
			<scroll-view class="contentBox" :scroll-y="true">
				<view class="boxfoot">
					<view class="boxfootone" v-for="(it,ind) in mocai" :key="ind" @click="goDetail(it.id)">
						<image :src="url+it.img" mode="" style="width: 142rpx;height: 142rpx;"></image>
						<view class="footOne">
							<view class="name">{{it.name}}</view>
							<text style="color: #666666;font-size: 28rpx;margin-top: 10rpx;">月销 {{it.salesnum}}</text>
							<view class="foottooone">
								<view class="">
									<text style="font-size:24rpx;padding-right:5rpx;">¥</text>
									<text>{{it.price}}</text>
									<!-- <text style="text-decoration: line-through;color: color: #999999;font-size: 24rpx;padding-top: 10rpx;">¥{{it.oldejin}}</text> -->

								</view>
								<view class="box">
									<text class="jian" v-if="it.num!=0" @click.stop="change(it,-1)">－</text>
									<text v-if="it.num==0" class="boxtexttt"> </text>
									<text style="font-size: 30rpx;width: 50rpx;text-align: center;">{{it.num}}</text>
									<text class="jia" @click.stop="change(it,1)">＋</text>
								</view>

							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-if="xuan==1" style="width: 100%;">
			<image src="https://xin.yiyunoto.com/uploads/static/public/car.png" style="width:348rpx ;height: 348rpx;"></image>
		</view>
		<!-- 结算 -->
		<view class="amount">
			<view style="width: 80rpx;height: 100%;display: flex;align-items: center;position: relative;margin-left: 24rpx;">
				<!-- <image style="width: 80rpx;" src="../../../static/home/shopcart.png" mode="widthFix" @tap.stop="toggleSpec"></image> -->
				<view v-if="mon.num>0" style="width: 32rpx;height: 32rpx;border-radius: 50%;background-color: #FF3B30 ;
				  position: absolute;right: -25%;top: 10rpx;display: flex;flex-direction: row;justify-content: center;align-items: center;">
					<text style="color: #fff;font-size:24rpx;">{{mon.num}}</text>
				</view>
			</view>
			


			<view class="amount_m">
				
				<view style="width: 100%; display: flex;flex-direction: row;align-items: center;color: #333333;">
					
						<text style="font-size: 30rpx;font-weight: bold;">￥{{mon.moneys}}</text>
						<text style="font-size: 22rpx; text-decoration: line-through;margin-left: 20rpx;">￥138</text>
					
					
				</view>
				<text style="padding-top: 8rpx;font-size: 24rpx;width: 100%;">配送费 ￥8.88</text>
			</view>
			<view class="amount_r" @click="orderCreate">
				去结算
			</view>
		</view>
		<!-- 	<view class="settlement">
			<view class="settlementBox">
				 <view class="boxone">
				 	<image src="../../../static/home/call.png" mode="" style="width: 45rpx;height: 40rpx;"></image>
					<text>联系商家</text>
				 </view>
				 <view class="boxtoo">
				 	<image src="../../../static/home/shopcart.png" mode="widthFix" style="width: 81rpx;margin-top: 20rpx;margin-left: -40rpx;"></image>
					<view class="boxtooone">
						<view class="xi">
							<text>￥</text>
							<text style="font-size: 35rpx">13.27</text>
							<text style="text-decoration: line-through;color: #dddddd;">￥18.45</text>
						</view>
						<text style="padding-top: 8rpx;">配送费 ￥8.88</text>
					</view>
				 </view>
				 <view class="boxthree">
				 	<text>去结算</text>
				 </view>
				
			</view>
		</view> -->
	</view>
</template>

<script>
	import request from '../../../store/http.js';
	export default {
		data() {
			return {
					url: this.$store.state.url,
					shopInfo:{},
				id:"",
				mon: {
					num: 1,
					moneys: 0.00
				},
				navAction: 0,
				width: '',
				height: '',
				xuan: 0,
				classNavArr: [
				],
				mocai: [
				]
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: "店铺详情"
			})
			this.id = e.id
			let {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.width = windowWidth;
			this.height = windowHeight;
			this.getShopInfo();
			this.getCate();
		},
		methods: {
			backPage(){
				uni.navigateBack({
					
				})
			},
			goDetail(id){
				uni.navigateTo({
					url:"product?goodsId="+id
				})
			},
			getShopInfo() {
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/wmzxyj/getShopInfo', {
						accessToken:authtoken,
						shopid:this.id
					}, {},
					'POST',
					(res) => {
							this.shopInfo=res.data.data;
					}
				)
			
			},
			getCate() {
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/wmzxyj/getShopType', {
						accessToken:authtoken,
						shopid:this.id
					}, {},
					'POST',
					(res) => {
							this.classNavArr=res.data.data;
							if(this.classNavArr&&this.classNavArr.length>0)
							this.getGoods(this.classNavArr[0].class_id)
					}
				)
			
			},
			getGoods(class_id) {
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/wmzxyj/getShopList', {
						accessToken:authtoken,
						class_id:class_id
					}, {},
					'POST',
					(res) => {
							this.mocai=res.data.data;
							this.mocai.forEach((item)=>{
								item.num=0
							})
					}
				)
			
			},
			orderCreate(){
				uni.navigateTo({
					url:'../waimaiOrder/waimaiOrder'
				})
			},
			change(item, i) {
				item.num += i;
				this.$forceUpdate();
			},
			xuanze(i) {
				this.xuan = i;
			},
			// 分类点击
			selectClass(e, index) {
				this.navAction = index
					this.getGoods(this.classNavArr[this.navAction].class_id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		height: 100%;
	}
	.top{
		padding-top: var(--status-bar-height);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-size: cover;
		background-repeat: no-repeat;
		plain: true;
		outline: none;
		border: none;
		width: 100%;
		height: 295rpx;
	}
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	.amount {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100rpx;
		flex-direction: row;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #ffffff;

	
		.amount_r {
		width: 240rpx;
		height: 80rpx;
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		color: #fff;
		font-size: 36rpx;
		margin-right: 32rpx;
		background: linear-gradient(90deg, #FF7085 0%, #FF5837 100%);
		}

		

		.amount_m {
			display: flex;
			justify-content: flex-start;
			flex-direction: column;
			align-items: center;
			flex: 1;
			height: 100%;
			color: #999;
			margin-left: 40rpx;

			
		}
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.selectTitle {
		font-size: 36rpx;
		font-weight: 600;
		color: #333333;
	}

	.unSelectTitle {
		font-size: 36rpx;
		font-weight: 600;
		color: #999999;
	}

	.showImg {
		width: 40rpx;
		height: 10rpx;
		margin-top: 13rpx;
		opacity: 1;
	}

	.unshowImg {
		width: 40rpx;
		height: 10rpx;
		margin-top: 13rpx;
		opacity: 0;
	}

	.txtAction {
		color: #F94322;
		font-weight: 700;
	}
	.search{
		margin-right: 24rpx;
		width: 114rpx;
		height: 40rpx;
		background: #EEEEEE;
		border-radius: 20rpx;
		align-items: center;
		display: flex;
		justify-content: center;
		flex-direction: row;
		font-size: 26rpx;
		color: #999;

	}
	.content {
		
		background-color: #f3f3f3;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		.header {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.headerFoot {
				width: 355rpx;
				// height: 39rpx;
				font-family: MicrosoftYaHei;
				font-size: 38rpx;
				font-weight: bold;
				font-stretch: normal;
				letter-spacing: 0px;
				color: #333333;
			}
		}

		.headerbox {
			margin-top: -115rpx;
	
			box-shadow: 0rpx 2rpx 16rpx 0rpx rgba(0, 0, 0, 0.23);
			border-radius: 16rpx;
			margin-left: 24rpx;
			margin-right: 24rpx;
			height: 165rpx;
			background-color:#ffffff;
			display: flex;
			align-items: center;

			.Exhibition {
				flex: 1;
				padding-left:24rpx;
				display: flex;
				flex-direction: column;
				font-size: 32rpx;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 0px;
				color: #333;

				text {
					padding-top: 15rpx;
				}
			}
		}

		.foot {
			margin-top: 30rpx;
			background-color: #FFFFFF;
			padding-bottom: 20rpx;
			display: flex;
			flex-direction: row;
			width: 100%;
			.paceHeader {
				flex: 1;
				display: flex;
				padding-left: 30rpx;

				.pacetoo {
					padding-left: 30rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				.paceOne {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
			}
		}

		.pace {
			width: 100%;
			// height: 100%;
			// height: 780rpx;
			flex: 1;
			margin-bottom: 100rpx;
			display: flex;
			flex-direction: row;

			.ul {
				width: 30%;
				background-color: #F3f3f3;
				height: 100%;

				.li {
					width: 100%;
					display: flex;
					max-height: 160rpx;
					min-height: 120rpx;
					flex-direction: row;
					align-items: center;
					justify-content: center;

					text {
						font-size: 34rpx;
						font-weight: normal;
						font-stretch: normal;
						letter-spacing: 0px;
					}
				}
			}

			// 上面左侧    下面右侧栏
			.contentBox {
				width: 70%;
				height: 100%;		
				background: #fff;
				// box-sizing: border-box;
				padding-left: 20rpx;

				// height: 100%;
				.boxfoot {
					width: 100%;
					height: 100%;

					.boxfootone {
						width: 100%;
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-bottom: 30rpx;
						
						.footOne {
							padding-left: 20rpx;
							flex: 1;
							flex-direction: column;
							font-size: 35rpx;
							display: flex;
						
							color: #333333;
							padding-right: 20rpx;
							.foottooone {
								width: 100%;
								padding-top: 10rpx;
								display: flex;
								justify-content: space-between;
								align-items: center;
								font-weight: bold;
								color: #fe1722;
								font-stretch: normal;
								font-size: 38rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
						}

					}
				}
			}

		}
	}
	
	.boxtexttt {
		width: 40rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		// background-color: #ffffff;
		// border: solid 1px #999999;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		font-size: 40rpx;
	}

	.jian {
		background: #ffffff;
		border: 1rpx solid #999;
		width: 38rpx;
		height: 38rpx;
		line-height: 38rpx;
		border-radius: 19rpx;
		color: #999999;
		font-size: 35rpx;
		text-align: center;
	}

	.jia {
		background: #fe5037;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 20rpx;
		color: #fff;
		font-size: 35rpx;
		text-align: center;
	}

	.boxtext {
		width: 40rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		background-color: #ffffff;
		border: solid 0.1rpx #999999;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		font-size: 40rpx;
	}

	.box {
		align-items: center;
		display: flex;
		flex-direction: row;
	}

	// 结算
	.settlement {
		width: 100%;
		display: flex;
		justify-content: center;
		background-color: #f3f3f3;

		.settlementBox {
			width: 90%;
			height: 100rpx;
			border-radius: 50rpx;
			background-color: #2f2f3b;
			display: flex;
			justify-content: space-between;
			position: fixed;
			bottom: 0rpx;

			.boxone {
				display: flex;
				flex-direction: column;
				padding-left: 40rpx;
				justify-content: center;
				align-items: center;
				padding-right: 20rpx;
				border-right: 5rpx solid #FFFFFF;

				text {
					padding-top: 10rpx;
					font-size: 25rpx;
					font-weight: normal;
					font-stretch: normal;
					letter-spacing: 0px;
					color: #ffffff;
				}
			}

			.boxtoo {
				display: flex;
				justify-content: space-between;
				color: #FFFFFF;
				font-size: 25rpx;
				// font-size: 20px;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 0px;
				color: #dddddd;

				.boxtooone {
					padding-left: 10rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.xi {
						color: #FFFFFF;
					}
				}
			}

			.boxthree {
				display: flex;
				justify-content: center;
				align-items: center;
				border-left: 5rpx solid #FFFFFF;
				padding-left: 30rpx;
				padding-right: 30rpx;
				// font-size: 32rpx;
				// font-weight: normal;
				// font-stretch: normal;
				// // line-height: 36px;
				// letter-spacing: 0px;
				color: #fefefe;
				border-top-right-radius: 50rpx;
				border-bottom-right-radius: 50rpx;
				background-color: #fe5037;
			}
		}
	}
	.name{
 overflow: hidden;
        text-overflow: ellipsis;

        display: box;

        display: -webkit-box;

        -webkit-line-clamp: 1;

        /*! autoprefixer: off */

        -webkit-box-orient: vertical;

        /* autoprefixer: on */
	}
</style>

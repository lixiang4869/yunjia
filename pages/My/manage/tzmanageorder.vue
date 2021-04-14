<template>
	
			<view  style="display: flex;flex-direction: column;">
				<!-- 订单列表 -->
				<view class="tab-nav">
					<view v-for="(menuTab, index) in menuTabs" :key="index" v-bind:id="'tabNum' + index" @click="swichMenu(index)"
					 :class="[currentTab == index ? 'tab-nav-item tab-active' : 'tab-nav-item']">
						{{ menuTab.name }}
					</view>
				</view>
				<view class="place">
					<view class="input-box">
						<input placeholder="输入收货人姓名手机号或商品名称" v-model="key" />
					</view>
					<text @click="gosearch" style="font-size: 30rpx;color: #333333;">搜索</text>
				</view>	
				<view class="kong" v-if="orderList.length == 0 ">
					暂无订单
				</view>

				<view class="tab-panel">
					<view class="qwer" v-for="(menuList, index2) in orderList" :key="index2" >
						<view class="divHeight"></view>
						<view class="tiao"></view>



						<view class="tel-name">
							<view>联 系 人:</view>
							<view class="name">
								{{menuList.consignee}}
							</view>
							<view class="tel">
								{{menuList.mobile}}
							</view>
						</view>
						<view class="addres">
							<view>收货地址:</view>
							<view class="addre">{{menuList.address}}
							</view>
						</view>
						<view class="addres">
							<view>取件码:</view>
							<view class="code">{{menuList.code}}
							</view>
						</view>
						<view class="addres">
							<view>支付时间:</view>
							<view class="code">{{getTime(menuList.pay_time)}}
							</view>
						</view>
						<view class="addres">
							<view>订单编号:</view>
							<view class="tel">{{menuList.order_sn}}
							</view>
						</view>
						<view v-for="(menuList2, index3) in menuList.order_goods" :key="index3">
							<!-- 点击跳转到商品详情 -->
							<view class="tab-item">
								<!-- 第二层循环 -->
								<view class="aui-mail-product">
									<!-- 主图 -->
									<view class="aui-mail-product-item-hd"><img :src="url+menuList2.goods_preview" alt="" /></view>
									<view class="aui-mail-product-item-bd">
										<!-- 商品名称 -->
										<p>{{ menuList2.goods_name }}</p>
										<!-- 规格,价格 -->
										<view class="yang">
											<!-- <view class="yang1">规格：{{ menuList2.skuInfo }}</view> -->
											<view class="yang2">￥{{ menuList2.buy_price }}</view>
											<view class="sun">
												x {{ menuList2.goods_num }}
											</view>
										</view>
										<!-- 商品数量 -->

									</view>
								</view>

							</view>
							<!-- <view :class="[index3 + 1 == menuList.length ? 'hd' : 'divHeight']"></view> -->
						</view>

						<view class="total">
							<view class="qw">共{{ menuList.order_goods.length }}种商品 总计:</view>
							<view class="as">￥{{menuList.order_amount}}</view>

						</view>
						<view class="aui-mail-button">
							<!-- hd aui-df-color -->
							<!-- <view  :class="[menuList2.orderStatus == 20&& ? 'hd' : menuList2.but_shouhuo == 1 ? '' : 'aui-df-color']" >确认收货</view> -->
								<!-- <view :class="[menuList.order_status == 20 ? 'aui-df-color' : 'hd']" @click.stop="pay(menuList.order_id)">立即支付</view> -->
								<view :class="[menuList.order_status == 40 ?'aui-df-colors2' : 'hd']">待发货</view>
								<view :class="[menuList.order_status == 60 ? 'aui-df-color' : 'hd']" @click.stop="refund(menuList)">退款</view>
								<view :class="[menuList.order_status == 60 ? 'aui-df-color' : 'hd']" @click.stop="sure(menuList)">确认收货</view>
							<!-- <view :class="[menuList.order_status == 10 ? 'aui-df-colors qx' : 'hd']">已取消</view> -->
						</view>




					</view>
				</view>
			</view>
	
</template>

<script>
	import request from '../../../store/http.js'
	export default {
		data() {
			return {
				key:null,
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0, //选中的下标
				url: this.$store.state.url,
				page: 1,
				loadingType: 0,
				orderList: [], //订单列表的所有信息

				menuTabs: [

					{
						name: '待提货',
						type: 60,
					},
					{
						name: '已收货',
						type: 70,
					}
				],

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
		onReachBottom() {
			console.log("this.loadingType",this.loadingType)
			// 每次拉到页面底部,请求页数自加
			this.page++;
			if (this.loadingType != 0) { // loadingType!=0;直接返回
				return false;
			}
			this.loadingType = 1;
			uni.showNavigationBarLoading(); // 显示加载动画
			let authtoken = uni.getStorageSync("authtoken");
			request.urlRequest(
				this.url + '/api/Leader/orderList', {
					order_status: this.menuTabs[this.currentTab].type,
					page: this.page
				}, {
					authtoken: authtoken
				},
				'POST',
				(res) => {
					if (this.page < res.data.data.last_page) {
						this.loadingType = 0
					} else this.loadingType = 2

					uni.hideNavigationBarLoading()
					this.orderList = this.orderList.concat(res.data.data.data);
				}
			)

		},
		onLoad(e) {
			// #ifdef MP-WEIXIN
			this.shouquan();
			// #endif	

			
			this.orderState(this.currentTab);
		},
		methods: {
			shouquan(){
				
				uni.requestSubscribeMessage({
					tmplIds: ['JAkDKG-ObvFFlrCC2I8Lp1MQLXoTzvSOSWKER7-o8qI'],
					success(e) {
						
						
					},
					fail(e) {
						
					}
				})
			},
			gosearch(){
				this.page=1;
				this.getOrderList(this.menuTabs[this.currentTab].type);
				
			},
			getTime(ytime){
				var date = new Date(ytime * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				let timeer = Y + M + D + h + m + s;
				return timeer 
				
			},
			sureRefund(item){
				uni.navigateTo({
					url:"refund?id="+item.order_sn
				})
				
			},
			swichMenu: async function(current) { //current = 下标
				console.log(this.currentTab + "/" + current)
				//点击其中一个选项
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
					this.setScrollLeft(current);
					this.orderState(current);
				}
			},
			swiperChange: async function(e) {
				console.log(e);
				let index = e.target.current;
				this.setScrollLeft(index);
				this.currentTab = index;
			},
			setScrollLeft: async function(tabIndex) {
				let leftWidthSum = 0;
				for (var i = 0; i <= tabIndex; i++) {
					let nowElement = await this.getWidth('tabNum' + i);
					leftWidthSum = leftWidthSum + nowElement.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth;
				this.scrollLeft = leftWidthSum > winWidth ? leftWidthSum - winWidth : 0;
			},
			getWidth: function(id) {
				//得到元素的宽高
				return new Promise((res, rej) => {
					uni.createSelectorQuery()
						.select('#' + id)
						.fields({
								size: true, //是否返回节点的尺寸
								scrollOffset: true //是否返回节点的 scrollLeft scrollTop，节点必须是 scroll-view 或者 viewport
							},
							data => {
								res(data);
								// console.log("得到节点信息" + JSON.stringify(data));
							}
						)
						.exec();
				});
			},
			details(data) {
				// 点击跳转到详情 
				uni.navigateTo({
					url: '../pay?id=' + data.order_id
				})
				console.log('详情点击事件触发')
			},
			// 取消订单点击事件
			refund(item) {
				uni.showModal({
					title: '提示',
					content: '确认要退款么',
					success: res => {
						if (res.confirm) {
							this.sureRefund(item);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});



			},
			
			sure(item) {
				uni.showLoading({
					
				})
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/member/confirmorder', {
						order_id: item.order_id
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						uni.hideLoading();
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
						this.orderState(this.currentTab);
					}
				);


			},
			orderState(current) {


				// 0:系统取消 10:买家取消 20:新订单 40:已付款 60:已发货 80:已收货 100:已评价 120:已结算
				this.key=null;			
					this.page=1;
				this.getOrderList(this.menuTabs[current].type);

			},
			affirmOrder() {
				uni.navigateTo({
					url: '../affirmOrder/affirmOrder',
				})
			},

			// 获取购物车订单列表
			getOrderList(status) {
				// 0:系统取消 10:买家取消 20:新订单 40:已付款 60:已发货 80:已收货 100:已评价 120:已结算
				console.log(status);
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/Leader/orderList', {
						order_status: status,
						page: this.page,
						keyword:this.key
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						console.log('订单列表', res);
						if (this.page < res.data.data.last_page) {
							this.loadingType = 0
						} else this.loadingType = 2
						this.orderList = res.data.data.data;
					}
				);
			}
		}
	};
</script>
<style lang="less">
	/* 公共样式表css */
	html,
	body {
		color: #333;
		margin: 0;
		height: 100%;
		font-family: 'Myriad Set Pro', 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-weight: normal;
	}

	* {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.place{
		width:92%;
		padding: 0 4%;
		margin-top: 90rpx;
		height: 80upx;
		display: flex;
		position: fixed;
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
	.code {
		font-size: 34upx;
		color: #0081Ff;
	}

	.addres {
		height: 60upx;
		width: 100%;
		font-size: 30upx;
		display: flex;
		flex-direction: row;
		margin-left: 20upx;
		align-items: center;
	}

	.tel-name {
		margin-left: 20upx;
		align-items: center;
		height: 60upx;
		width: 100%;
		display: flex;
		font-size: 30upx;
		flex-direction: row;

		.name {
			padding-left: 20upx;
			font-size: 30upx;
		}

		.tel {
			margin-left: 10upx;
		}
	}

	.total {
		width: 100%;
		margin-top: 20upx;
		justify-content: flex-end;
		display: flex;
		flex-direction: row;
	}

	a {
		text-decoration: none;
		color: #000;
	}

	a,
	label,
	button,
	input,
	select {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	img {
		border: 0;
	}

	body {
		background: #fff;
		color: #666;
	}

	html,
	body,
	div,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	button,
	fieldset,
	form,
	input,
	legend,
	textarea,
	th,
	td {
		margin: 0;
		padding: 0;
	}

	a {
		text-decoration: none;
		color: #08acee;
	}

	button {
		outline: 0;
	}

	img {
		border: 0;
	}

	button,
	input,
	optgroup,
	select,
	textarea {
		margin: 0;
		font: inherit;
		color: inherit;
		outline: none;
	}

	li {
		list-style: none;
	}

	a {
		color: #666;
	}

	.clearfix::after {
		clear: both;
		content: '.';
		display: block;
		height: 0;
		visibility: hidden;
	}

	/* 必要布局样式css */
	.aui-flexView {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
	}

	.aui-scrollView {
		width: 100%;
		height: 100%;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		position: relative;
		/* margin-top: -44px; */
	}

	.tab-nav {
		background: #ffffff;
		height: 90upx;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
		/* margin: 0 auto; */
		position: fixed;
		width: 100%;
		margin-bottom: 15%;
		/* width: 185px; */
		z-index: 9999;
	}

	.tab-nav:after {
		content: '';
		position: fixed;
		z-index: 2;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2upx;
		border-bottom: 2upx solid #bbbbbb;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		-webkit-transform-origin: 0 100%;
		transform-origin: 0 100%;
	}

	.tab-nav-item {
		height: 90upx;
		line-height: 80upx;
		position: relative;
		text-align: center;
		color: #0C0C0C;
		font-size: 32upx;
		font-family: PingFang SC;
		display: block;
		float: left;
		border-radius: 160upx;
		/* padding: 0 15px; */
		width: 20%;
		margin: 0 auto;
	}

	.tab-nav-item.tab-active {
		color: #f72926;
	}

	.tab-nav-item.tab-active a {
		color: #000000;
		font-weight: bold;
	}

	.tab-nav-item a {
		display: inherit;
		color: inherit;
		font-size: 0.8rem;
		color: #464646;
	}

	.tiao {
		width: 100%;
		height: 30upx;
		background: #f0f2f5;
		position: absolute;
		top: 90upx;
	}

	.tab-panel {
		overflow: hidden;
		margin-top: 160upx;
	}

	.tab-panel .tab-panel-item {
		width: 100%;
		position: absolute;
		top: 0;
		-webkit-transform: translateX(-100%);
		transform: translateX(-100%);
	}

	.tab-nav-item.tab-active:before {
		content: '';
		width: 100%;
		height: 4upx;
		position: absolute;
		left: 17%;
		bottom: 0;
		margin-left: -20%;
		z-index: 4;
		background-color: #F98D34;
		border-radius: 240upx;
		border: 2upx solid #F98D34;
	}

	.tab-panel .tab-panel-item.tab-active~.tab-panel-item {
		-webkit-transform: translateX(100%);
		transform: translateX(100%);
	}

	.tab-panel .tab-panel-item.tab-active {
		position: relative;
		-webkit-transition: -webkit-transform 0.15s;
		transition: -webkit-transform 0.15s;
		transition: transform 0.15s;
		transition: transform 0.15s, -webkit-transform 0.15s;
		-webkit-transform: translateX(0);
		transform: translateX(0);
	}

	.divHeight {
		background: #f0f2f5;
		width: 100%;
		height: 30upx;
	}

	.aui-well-item {
		padding: 26upx 30upx 27upx 40upx;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;

		image {
			width: 50upx;
			height: 50upx;
			border-radius: 50%;
		}
	}

	.aui-well-item-bd {
		margin-left: 20upx;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		min-width: 0;
	}

	.aui-well-item-bd h3 {
		font-size: 28upx;
		font-family: PingFang SC;
		color: rgba(12, 12, 12, 1);
		position: relative;
		/* padding-left: 20px; */
		font-weight: normal;
		padding-bottom: 0;
		text-align: left;
	}

	.aui-mail-product {
		border-bottom: 1upx solid #f1f1f1;
		border-top: 1upx solid #f1f1f1;
		width: 694upx;
		margin-left: 28upx;
		height: 228upx;
	}

	.aui-mail-product-item-hd {
		margin-right: 19upx;
		margin-top: 20upx;
		width: 160upx;
		height: 160upx;
		float: left;
	}

	.aui-mail-product-item-hd img {
		width: 160upx;
		height: 160upx;
	}

	.aui-mail-product-item-bd {
		float: left;
		margin-top: 20upx;
		/* height: 139upx; */
		width: 510upx;
		line-height: 40upx;
	}

	.aui-mail-product-item-bd p {
		width: 100%;
		/* height: 96upx; */
		font-size: 30upx;
		font-family: PingFang SC;
		color: rgba(12, 12, 12, 1);
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.yang {

		display: flex;

		width: 100%;
		padding-top: 30upx;
	}

	.yang1 {
		width: 50%;
		float: left;
		font-size: 24upx;
		font-family: PingFang SC;
		color: rgba(136, 136, 136, 1);
	}

	.yang2 {
		flex: 1;
		font-size: 26upx;
		font-family: PingFang SC;
		color: rgba(12, 12, 12, 1);


		margin-top: 2upx;
	}

	.sun {

		font-size: 26upx;

	}

	.sun p {
		width: 100%;
		font-size: 20upx;
		font-family: PingFang SC;
		color: rgba(136, 136, 136, 1);
		text-align: right;
	}

	.aui-mail-payment {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.asdf {
		width: 694upx;
		height: 79upx;
		margin-left: 28upx;
		padding-top: 23upx;
		font-family: PingFang SC;
		border-bottom: 1upx solid #f1f1f1;
	}

	.qw {
		color: rgba(52, 56, 67, 1);
		font-size: 26upx;
	}

	.as {
		margin-right: 30upx;
		color: #f81324;
		font-size: 26upx;
	}

	.asd {
		color: #f81324;
		font-size: 30upx;
	}

	.zx {
		font-size: 26upx;
		color: rgba(52, 56, 66, 1);
	}

	.aui-mail-payment p em {
		font-style: normal;
	}

	.aui-mail-payment p i {
		font-size: 1.3rem;
		font-style: normal;
	}

	.aui-mail-payment:after {
		content: '';
		position: absolute;
		z-index: 2;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2upx;
		border-bottom: 2upx solid #e2e2e2;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		-webkit-transform-origin: 0 100%;
		transform-origin: 0 100%;
	}

	.aui-mail-button {
		padding: 19upx 28upx 19upx 0;
		overflow: hidden;
	}

	.aui-mail-button view {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 60upx;
		text-align: center;
		float: right;
		margin-left: 20upx;
		width: 180upx;
		height: 62upx;
	}

	.aui-df-color {
		background: #0086F9;
		border-radius: 15upx;
	}

	.aui-df-colors {
		background: #d9d9d9;
		border-radius: 15upx;
	}

	.aui-df-colors2 {
		background: #0086F9;
		border-radius: 15upx;
	}

	.aui-well-wait {
		text-align: right;
	}

	.hd {
		display: none;
	}

	.kong {

		padding-top: 300upx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			margin-top: 200upx;
			width: 50rpx;
			height: 50rpx;
		}
	}

	.qx {
		border-radius: 0 !important;
	}
</style>

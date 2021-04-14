<template>
	<view  :style="{width:width,height:height}" style="background-color: #F3F3F3;display: flex;flex-direction: column;">
	
		
		
			<view class="shopItemBox" v-for="(item, index) in cartList" :key="item.id" @click="detail(item)" >
				<view class="leftCheckBox"  @click.stop="check('item', index)">
					<image class="checkImg" 
					  :src="item.checked?'../../../static/public/pitch_on.png':'../../../static/public/circle.png'"
					 ></image>
				</view>
				<view class="leftImg">
					<image style="width: 190rpx;height: 190rpx;" 
					  :src="url+item.img" mode="widthFix"
					  lazy-load="true" @load="onImageLoad('cartList', index)"
					  @error="onImageError('cartList', index)"></image>
				</view>
				<view class="shopItemInfoBox">
					<text class="shopIntroduce">{{item.name}}</text>
					<!-- <text class="shopModelTxt">白色断码2xll</text> -->
					<view class="priceNum">
						<text class="price">￥{{item.price}}</text>
						<view class="numsBox">
							<text class="operation" @tap.stop="sub(item)">-</text>
							<text class="sumNum">{{item.num}}</text>
							<text class="operation" @tap.stop="add(item)">+</text>
						</view>
					</view>
				</view>
			</view>
		
		<!-- 底部结算 -->
		<view class="totalBox">
			<view class="allCheckBox" @click="check('', 0)">
				<image class="allCheckImg" :src="allChecked?'../../../static/public/pitch_on.png':'../../../static/public/circle.png'"></image>
				<text style="font-size: 30rpx;color: #333333;margin-left: 20rpx;">全选</text>
			</view>
			<view class="sumBtn">
				<text style="font-size: 20rpx; color: #333333;">合计: </text>
				<text style="font-size: 30rpx; color: #FB4832;"> ￥{{total}}</text>
				<text class="btn" v-if="!deleShow" @click="createOrder">结算</text>
				<text class="btn" @click="deleteCartItem" v-if="deleShow">删除</text>
			</view>
		</view>
	</view>
</template>
<script>
	// import zyflow from '../../../components/zyflow/zyflow.vue'
	// import myNavigater from '../../../../components/my-navigater/my-navigater.vue'
	import request from '../../../store/http.js'

	export default {
		
		data() {
			return {
				num:5,
				width: '',
				height: '',
				i: 0,
				variety: false,
				shops: [],
				sumPrice: 0.00,
				selectShop: [],
				all: false,
				authtoken: '',
				deleShow: false,
				buyGoodId:'',
				url: this.$store.state.url,
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				shopId:0
			}
		},
		onLoad(e) {
			this.getVideoXY();
			this.shopId
			this.shopId = e.shopId;
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
			this.getShopCarList();
		},
	
		methods: {
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
						if(res.data.code==1){
						this.goodsList = res.data.data
						console.log('获取购物车列表', this.goodsList);
						this.shopCar.moneys=0.0
						this.shopNull();
						for (let i = 0; i < this.goodsList.length; i++) {
							// 计算商品价格
							let mon = this.goodsList[i].product.nowprice * this.goodsList[i].num
							this.shopCar.moneys += mon;
							// 计算商品数量
							this.shopCar.numbers += this.goodsList[i].num;
						}
						console.log('购物车总价：', this.shopCar.moneys, '购物车总数量：', this.shopCar.numbers);
						this.shopCar.moneys = this.shopCar.moneys.toFixed(2);}
					}
				)
			},
			// 商品跳转商品详情页面
			detail (item) {
			
				uni.navigateTo({
					url: '/pages/Shop/product/product?goodsId=' + item.pid + "&modular_id=" + item.modular_id
				})
			},
			// 获取视口宽高
			getVideoXY() {
				let res = uni.getSystemInfoSync()
				this.width = res.windowWidth + 'px';
				this.height = res.windowHeight + 'px';
			},
			backPage(){
				uni.navigateBack({
					delta:1
				})
			},
			// 商品点击事件
			flowtap(id) {
				uni.showToast({
					icon: 'none',
					title: '当前商品id为: ' + id
				})
			},
			// 导航栏索引
			getNavIndex(id) {
				this.i = id;
				uni.showToast({
					icon: 'none',
					title: '当前菜单索引为' + id
				})
			},
			// 商品数量加减
			countNum(e, a, index, i) {
				if (this.cartList[index].num <= 1 && a > 0) {
					return;
				}
				this.cartList[index].num -= a;
			},
			
			edit() {
				this.deleShow = !this.deleShow;
			},
			
			// 光标失去焦点触发
			blur(e, index, i) {
				if (this.shops[index].type[i].num < 1) {
					this.shops[index].type[i].num = 1;
				}
				if (this.selectShop[index][i]) {
					var num = 0;
					num = (this.shops[index].type[i].num * 1 - 1) * (this.shops[index].type[i].price * 1);
					this.sumPrice = (this.sumPrice * 1) + num;
				}
			},
			
			getdata() {
				var authtoken = uni.getStorageSync("authtoken")
				request	.urlRequest(
				this.url+'/api/cart/get',{
					
				},{authtoken: authtoken},'POST',res=>{
					if(res.data.code==1){
					this.cartList = res.data.data
					
					this.cartList.map(item => {
						item.checked = false;
						return item;
					});
					this.calcTotal();
					}
					
				})
				
			},
			
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			//选中状态处理
			check(type, index) {
				if (type == 'item') {
					this.cartList[index].checked = !this.cartList[index].checked;
				} else {
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(data) {
				this.cartList[data.index].number = data.number;
				this.calcTotal();
			},
			sub(item) {
				if (item.num <= 1) {
					return;
				}
				item.num--;
				let authtoken = uni.getStorageSync("authtoken");
			
				request.urlRequest(
					this.url + '/api/cart/numdel', {
						goods_id: item.pid,
						modular_id: item.modular_id,
					}, {
						authtoken: authtoken
					},
					'POST',
					(res) => {
						if (res.data.code == 1) {
							console.log(res);
							this.calcTotal();
						} else {
							item++;
						
							uni.showToast({
								title: res.data.msg
							});
						}
					}
				)
			
			
			},
			input_num(item, ) {
				console.log("输入数据", e)
				item.num = e.detail.value
			},
			
			add(item) {
				let authtoken = uni.getStorageSync("authtoken");
			
				request.urlRequest(
					this.url + '/api/cart/numadd', {
						goods_id: item.pid,
						modular_id: item.modular_id,
					}, {
						authtoken: authtoken
					},
					'POST',
					(res) => {
						console.log(res);
						if(res.data.code==1){
							item.num++;
							this.calcTotal();
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
						
					}
				)
			},
			//删除
			deleteCartItem() {
				
				const list = [];
				this.cartList.forEach(item => {
					if(item.checked){
						list.push(item.id)
					}
			
				})
				if(list.length==0){
					return;
				}
				
				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url+"/api/cart/delCarts",{cart_id:list},{authtoken:authtoken},"POST",res=>{
					if(res.data.code==1){
						this.getdata();
					}else{
						uni.showToast({
							title:res.data.msg,icon:"none"
						})
					}
				})
				
			},
			//清空
			clearCart() {
				uni.showModal({
					content: '清空购物车？',
					success: (e) => {
						if (e.confirm) {
							var authtoken = uni.getStorageSync("authtoken")
			
							uni.request({
								url: this.url+'/api/cart/delallCart',
								header: {
									authtoken: authtoken
								},
								method: 'POST',
								success: (res) => {
			
									if (res.data.code == 1)
										this.cartList = []
									else uni.showToast({
										title: res.data.msg
									})
								},
								fail: (res) => {
									console.log("请求失败", this.cartList)
								}
							});
						}
					}
				})
			},
			//计算总价
			calcTotal() {
				let list = this.cartList;
				if (list.length === 0) {
					this.empty = true;
					this.total=0.0;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item => {
					if (item.checked === true) {
						total += item.price * item.num;
					} else if (checked === true) {
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			},
			//创建订单
			createOrder() {
				let list = [];
				if (this.cartList.length === 0) {
			
					return;
				}
			
			
				this.cartList.forEach(item => {
					if (item.checked === true) {
						list.push(item);
					}
				})
			
				if (list.length === 0) {
					uni.showToast({
						title: '请先选择商品'
					})
					return;
				}
				
				// var parentsid = uni.getStorageSync("parentsid");
				// if(!parentsid||parentsid==0){
					uni.navigateTo({
						url: '../../My/affirmOrder/affirmOrder?data=' + JSON.stringify(list)+"&sid="+this.sid
					
						// url: `/pages/order/createOrder?data=${JSON.stringify({
						// 	goodsData: list
						// })}`
					})
				// }else{
				// uni.navigateTo({
				// 	url: '../../My/affirmSQOrder/affirmOrder?data=' + JSON.stringify(list)
				
				// 	// url: `/pages/order/createOrder?data=${JSON.stringify({
				// 	// 	goodsData: list
				// 	// })}`
				// })	
				// }
				
			
			}
		}
}
</script>

<style lang="scss" scoped>
	::-webkit-scrollbar {
		display: none;
		width: 0 ;
		height: 0 ;
		
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

	.top{
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
		width: 12%;
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
		width: 40rpx;
		height: 40rpx;
		border-radius: 5rpx;
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
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
	}

	.price {
		font-size: 30rpx;
		color: #FB4832;
		font-weight: 700;
	}

	.numsBox {
		margin-right: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.operation {
		width: 53rpx;
		height: 56rpx;
		display: inline-block;
		text-align: center;
		line-height: 53rpx;
		background-color: #FFFFFF;
		color: #E1E1E1;
		border: 1rpx solid #EBEBEB;
	}

	.operation:first-child {
		border-top-left-radius: 10rpx;
		border-bottom-left-radius: 10rpx;
	}

	.operation:last-child {
		border-top-right-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
	}

	.sumNum {
		width: 80rpx;
		height: 53rpx;
		line-height: 53rpx;
		text-align: center;
		font-size: 26rpx;
		color: #333333;
		border-top: 1rpx solid #EBEBEB;
		border-bottom: 1rpx solid #EBEBEB;
	}

	// 结算
	.totalBox {
		width: 95%;
		height: 7%;
		margin: 0 auto;
		border-radius: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: fixed;
		left: 2.5%;
		bottom: 2%;
		
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
		font-size: 30rpx;
		color: #FFFFFF;
		background-color: #FB4832;
		padding: 20rpx 40rpx;
		border-radius: 40rpx;
		margin-left: 30rpx;
	}
	
	.shopItemBox{
		width: 100%;
		height: 20%;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		.leftImg{
			width: 190rpx;
			height: 190rpx;
			border-radius: 10rpx;
		}
		.shopItemInfoBox{
			width: 58%;
			height: 100%;
			box-sizing: border-box;
			display: flex;flex-direction: column;
			justify-content: center;
		}
	}
	.upshop{
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

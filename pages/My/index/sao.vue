<template>
	<view class="header" :style="{width:width+'px',height:height+'px'}">
		<view class="heade">
			<input type="text" v-model="aa" style="width:90%;height: 80rpx;padding-left: 60rpx;" placeholder="搜索商品" @confirm="confirm"
			 @blur="biur" />
			<image src="../../../static/home/sousuo.png" mode="" style="width: 37rpx;height: 37rpx;position: absolute;top:40rpx;left: 60rpx;"></image>
		</view>
		<view class="hebox" v-for="(item,index) in orderList" :key="index"  v-if="show">
			<view class="headerbox">
				<text>姓名：</text>
				<view class="" @click="zhebie(index)">
					<text style="color: #c2c2c2;">{{item.order_info.truename}}</text>
					<image src="../../../static/my/xia.png" mode="" v-if="!item.isShow" style="width: 30rpx;height: 30rpx; padding-right: 20rpx;"></image>
					<image src="../../../static/my/shang.png" mode="" v-if="item.isShow" style="width: 30rpx;height: 30rpx;padding-right: 20rpx;"></image>
				</view>

			</view>
			<view class="headerfoot"  v-if="item.isShow" v-for="(it,i) in item.order_goods" :key="i">
				<!-- <view class="foot">
					<text>客户名称：</text>
					<text  style="color: #c2c2c2;">小心心</text>
				</view> -->
				<view class="box">
					<image :src="url+it.goods_preview" mode="" style="width: 80rpx;height: 80rpx;"></image>
					<view class="boxfoot">
						<text style="font-size: 30rpx;font-weight: bold;color: #999999;">{{it.goods_name}}</text>
						<view class="pace">
							<text>数量：{{it.goods_num}}</text>
							
						</view>
					</view>
				</view>
			</view>
				<view style="justify-content: flex-end;width: 100%; display: flex;">
				<view class="Three" @click="dan(item.order_info.order_id)" >
					确认送达
				</view>
				</view>
		


		</view>
	</view>
</template>

<script>
	import request from "../../../store/http.js"
	export default {
		data() {
			return {
				// shangxia:1,
				
				partition: '',
				width: '',
				show:true,
				height: '',
				orderList: [],
				url: this.$store.state.url,
				
				
			}
		},
		onLoad(option) {
			this.partition = 10;
			this.getDetail()

			this.getVideoXY();
		},
		
		methods: {
			getDetail(){
				var token = uni.getStorageSync("authtoken");
				request.urlRequest(this.url+"/api/leader/scanCode",{partition_id:this.partition},{authtoken:token},'POST',res=>{
					if(res.data.code==1){
						this.orderList = res.data.data;
						this.orderList.forEach(item=>{
							item.isShow = true;
						})
					}else{
						uni.showToast({
							title:res.data.msg,icon:"none"
						})
					}
					
				})
			},
			
			// 折叠
			zhebie(i) {
				this.orderList[i].isShow = !this.orderList[i].isShow
				this.show =false;
				this.show = true;
			},
			// 获取视口宽高
			getVideoXY() {
				let {
					windowWidth,
					windowHeight
				} = uni.getSystemInfoSync();
				this.width = windowWidth,
					this.height = windowHeight
			},
			//获取焦点
			// foc(){

			// },
			biur() {
				if (this.aa == '') {
					this.one = 1
				}
			},
			//点击完成按钮时触发
			confirm() {
				let data = {
					partition_id: this.sao,
					name: this.aa
				}
				this.request.httpRequest('/driverapp/Invoice/scanCode', data, 'post').then(res => {
					console.log(res)
					if (res.data.code == 1) {
						this.one = 2
					}
				})
			},
			signedOrder(order_id){
				var authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(this.url+"/api/leader/signedOrder"
				,{partition_id:this.partition,order_id:order_id}
				,{authtoken:authtoken}
				,'POST'
				,res=>{
					uni.showToast({
						title:res.data.msg
					})
					if(res.data.code==1){
						this.getDetail()
					}
				})
			},
			dan(oid) {
				var _this = this;
				uni.showModal({
					// title: '',
					content: '确认配送到达',
					success: function(res) {
						if (res.confirm) {
							_this.signedOrder(oid);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});		
			}
		}
	}
</script>
<style lang="scss" scoped>
	.heade {
		margin-top: 20rpx;
		width: 90%;
		color: #333333;
		background-color: #FFFFFF;
		border-radius: 40rpx;

		input {}
	}

	.header {
		background-color: #f3f3f3;
		display: flex;
		// justify-content: center;
		flex-direction: column;
		align-items: center;

		.hebox {
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 90%;
			margin-top: 30rpx;
			border-radius: 40rpx;
		}
	}

	.headerbox {
		background-color: #FFFFFF;
		display: flex;
		width: 100%;
		height: 80rpx;
		// border-top-right-radius: 20rpx;
		// border-top-left-radius: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		font-weight: bold;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #333333;

		text {
			padding-left: 30rpx;
			padding-right: 30rpx;
		}
	}

	.headerfoot {
		// margin-top: 50rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		display: flex;
		width: 100%;
		// height: 120rpx;
		// border-radius: 20rpx;
		// border-bottom-right-radius: 20rpx;
		// border-bottom-left-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-weight: bold;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #333333;

		.foot {
			width: 90%;
			padding-top: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			text {
				// padding-left: 30rpx;
				// padding-right: 30rpx;
			}
		}

		.box {
			display: flex;
			width: 90%;
			border-radius: 15rpx;
			background-color: #f3f3f3;
			justify-content: center;
			align-items: center;

			.boxfoot {
				margin-left: 20rpx;
				width: 70%;
				display: flex;
				flex-direction: column;
			}
		}

	}

	


	.pace {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10rpx;
	
	}

	.Three {
		margin-top: 30rpx;
		font-size: 26rpx;
		width: 150rpx;
		height: 60rpx;
		background-color: #2a7fff;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30rpx;
		margin-bottom: 20rpx;
	}

	.onetoo {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

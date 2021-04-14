<template>
	<view style="display: flex;flex-direction: column;">
		<view style="display: flex;flex-direction: row;align-items: center;margin-top: 16rpx;margin-bottom: 24rpx;">
			<view style="width: 16rpx;height: 10rpx;background: #FF502E;border-radius: 0px 100rpx 100rpx 0px;"></view>
			<view style="color: #333;font-size: 30rpx;margin-left: 16rpx;font-weight: bold;">合伙人信息</view>
		</view>
		<view class="bgshadw" v-if="info">
			<image :src="getImgUrl(info.headimg)" style="width: 80rpx;height: 80rpx;margin-right: 21rpx;margin-left: 24rpx;"></image>
			<view style="display: flex;flex-direction: column;">
				<view style="font-size: 34rpx;color: #333333;font-weight: bold;">{{info.truename}}</view>
				<view style="font-size: 24rpx;color: #FC4932;">{{info.role_type}}</view>
			</view>
		</view>

		<view style="display: flex;flex-direction: row;align-items: center;margin-top: 16rpx;margin-bottom: 24rpx;">
			<view style="width: 16rpx;height: 10rpx;background: #FF502E;border-radius: 0px 100rpx 100rpx 0px;"></view>
			<view style="color: #333;font-size: 30rpx;margin-left: 16rpx;font-weight: bold;">未支付订单</view>
		</view>

		<view style="width: 100%;display: flex;justify-content: center;align-items: center;flex-direction: column;">
			<view v-for="(item,index) in list" :key="index" class="item" @click="next(item)">
				<view style="width: 100%;display: flex;flex-direction: row;justify-content: space-between;margin-top: 24rpx;margin-bottom: 24rpx;">
					<view style="color: #666666;font-size: 28rpx;margin-left: 32rpx;">合伙人类型</view>
					<view style="color: #333333;font-size: 28rpx;margin-right: 32rpx;font-weight: bold;">{{item.typename}}</view>
				</view>
				<!-- <view style="width: 100%;display: flex;flex-direction: row;justify-content: space-between;margin-top: 24rpx;margin-bottom: 24rpx;">
					<view style="color: #666666;font-size: 28rpx;margin-left: 32rpx;">应付金额</view>
					<view style="color: #333333;font-size: 28rpx;margin-right: 32rpx;font-weight: bold;">99</view>
				</view> -->
				<view style="width: 100%;display: flex;flex-direction: row;justify-content: space-between;margin-top: 24rpx;margin-bottom: 24rpx;">
					<view style="color: #666666;font-size: 28rpx;margin-left: 32rpx;"></view>
					<view class="btn">帮他开通 ></view>
				</view>
			</view>
			
		</view>
		<view class="xia" v-if="!list">

		
			<view class="text">暂无订单</view>
		</view>
		<!-- <view class="xia" v-else>
			<image class="img" src="../../../static/emptyCart.png">
				<view class="text">暂无消费记录</view>
		</view> -->
	</view>
</template>

<script>
	import request from '../../../store/http.js'
	export default {
		data() {
			return {
				cindex: 0,
				page: 1,
				list: [],
				info: null,
				touken: '',
				url: this.$store.state.url, //token路径
				date: {},
				num: '',
				loadingType: 0,
				isnotempty: false,
				numInfo: null,
				id:0
			}
		},
		
		onLoad(e) {
			this.id=e.id
			
			// this.getData();
			// this.getList();
		},
		onShow() {
			this.getMyRecruiter();
		},
		methods: {
			getImgUrl(url) {
				if (!url) {
					return ""
				}
				if (url.search('http') == -1) {
					url = this.url + url
				}
				return url
			},
			select(index) {
				this.cindex = index;
				this.page = 1;
				this.getList();
			},
			next(item) {
				uni.navigateTo({
					url: "order?id="+item.id
				})
			},
			onloaderror(i) {
				console.log("onloaderror", i)
				this.list[i].headimg = "https://xin.yiyunoto.com/uploads/static/shop/tz.png";

			},
		
		
			getMyRecruiter() {
				uni.showLoading({
					
				})
				let authtoken = uni.getStorageSync("authtoken");
				var requestUrl = this.url + '/api/partner/userPartnerList';
				request.urlRequest(
					requestUrl, {
						uid:this.id
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						uni.hideLoading()
						this.info = res.data.data
						if(this.info)
						this.list =this.info.orderlist
					}
				);

			},
		
		}
	}
</script>

<style lang="scss">
	.btn{
		text-align: center;
		width: 216rpx;
		height: 60rpx;
		margin-right: 30rpx;
		background: #8E83EA;
		border-radius: 30rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		color: #fff;
	}
	.item {
		display: flex;
		flex-direction: column;
		width: 702rpx;
		height: 200rpx;
		background: #FFFFFF;
		box-shadow: 0px 0rpx 10rpx 0px rgba(0, 0, 0, 0.23);
		border-radius: 16rpx;

	}

	page {
		background-color: #Ffffff;
	}

	.select {
		border-bottom: 2rpx solid #eee;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 97rpx;
	}

	.selectTitle {
		font-size: 30rpx;

		color: #FF2B10;
	}

	.selectitem {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.unSelectTitle {
		font-size: 30rpx;


		color: #333;
	}

	.showImg {
		background: #FF2B10;
		width: 48rpx;
		height: 4rpx;
		margin-top: 37rpx;
		opacity: 1;
	}

	.unshowImg {
		width: 48rpx;
		height: 4rpx;
		margin-top: 37rpx;
		opacity: 0;
	}

	.bgshadw {
		margin-bottom: 16rpx;
		display: flex;
		align-items: center;
		flex-direction: row;
		margin-left: 24rpx;
		margin-right: 24rpx;
		height: 112rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.23);
		border-radius: 16rpx;

	}

	.tongji {
		margin-top: 23rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 186rpx;
		height: 62rpx;
		border-radius: 31rpx;
		border: 1rpx solid #FFECCF;

	}

	.tongji2 {
		text-align: center;
		line-height: 56rpx;
		color: #D82708;
		font-size: 30rpx;
		width: 180rpx;
		height: 56rpx;
		background: #FFECCF;
		border-radius: 28rpx;


	}

	.detail {
		margin-top: 32rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 670rpx;
		height: 149rpx;
		background: #FFECCF;
		border-radius: 16rpx;

	}

	.t1 {
		color: #954E20;
		font-size: 24rpx;
		margin-bottom: 9rpx;
	}

	.t2 {
		color: #FC4932;
		font-size: 42rpx;
		font-weight: 400;
	}

	.bgshadw2 {


		height: 299rpx;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		plain: true;
		outline: none;
		border: none;
		// border-radius: 10%;
		// background-color: $uni-bg-color-top;
		background-image: url("http://xin.yiyunoto.com/uploads/static/my/tongjibg.png");
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-left: 24rpx;
		margin-right: 24rpx;




	}



	.xia {
		width: 100%;
		height: 100%;
		background: #F5F5F5;


	}

	.img {
		width: 142upx;
		height: 114upx;
		padding-left: 304upx;
		padding-top: 207upx;
	}

	.text {
		width: 100%;
		font-size: 30upx;
		font-family: PingFang SC;
		color: #333333;
		text-align: center;
	}
</style>

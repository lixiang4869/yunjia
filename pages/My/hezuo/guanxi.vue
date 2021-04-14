<template>
	<view style="width: 100%;display: flex;justify-content: center;align-items: center;flex-direction: column;">
		

		
			<view v-for="(item,index) in list" :key="index" class="item" >
				<view style="width:100%;display: flex;flex-direction: row;margin-top: 24rpx;margin-bottom: 24rpx;">
					<image :src="getImgUrl(item.headimg)"  style="margin-left: 30rpx; width: 80rpx;height: 80rpx; border-radius: 50%;margin-right: 20rpx;"></image>
					<view style="display: flex;flex-direction: column;flex: 1;">
						<view style="font-size: 34rpx;color: #333333;font-weight: bold;">{{item.truename}}</view>
						<view style="font-size: 24rpx;color: #999;" >会员编号:{{item.id}}</view>
						<view style="font-size: 24rpx;color: #999;" >{{item.typename}}</view>
						
					</view>
				</view>
				
				<view style="width:80%;display: flex;flex-direction: row;justify-content: space-between;margin-top: 24rpx;margin-bottom: 24rpx;">
					<view class="btn" @click="next(1,item)">上级</view>
					<view class="btn" @click="next(2,item)">下级</view>
				</view>
			</view>
			
		
		
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
				numInfo: null
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		
		onLoad(e) {
			this.id=e.id
			this.type=e.type;
			this.getData();
			// this.getData();
			// this.getList();
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
		
			next(type,item) {
				uni.redirectTo({
						url: "guanxi?type="+type+"&id=" +item.id
				})
			},
			onloaderror(i) {
				console.log("onloaderror", i)
				this.list[i].headimg = "https://xin.yiyunoto.com/uploads/static/shop/tz.png";

			},
			
			getData() {
				uni.showLoading({
				
				})
				let authtoken = uni.getStorageSync("authtoken");
				var requestUrl = this.url + '/api/partner/searchRelation';
				request.urlRequest(
					requestUrl, {
						id:this.id,
						type:this.type
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						uni.hideLoading()
						this.list = res.data.data
					}
				);

			},
			getList() {
				let authtoken = uni.getStorageSync("authtoken");
				var requestUrl = this.url + '/api/partner/myRecommend';
				request.urlRequest(

					requestUrl, {
						page: this.page,
						level: this.cindex + 1
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						if (this.page < res.data.data.lastPage) {
							this.loadingType = 0
						} else this.loadingType = 2
						if (this.page == 1)
							this.list = res.data.data.data;
						else this.list = this.list.concat(res.data.data.data);
						if (this.list.length > 0) {
							this.isnotempty = true;
						} else this.isnotempty = false;
						console.log("this.isnotempty", this.isnotempty)
						this.$forceUpdate()
					}
				);

			}
		}
	}
</script>

<style lang="scss">
	.btn{
		text-align: center;
		width: 216rpx;
		height: 60rpx;
		background: #8E83EA;
		border-radius: 30rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		color: #fff;
	}
	.item {
		margin-top: 32rpx;
		align-items: center;
		display: flex;
		flex-direction: column;
		width: 702rpx;
		height: 300rpx;
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

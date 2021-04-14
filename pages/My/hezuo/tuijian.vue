<template>
	<view style="display: flex;flex-direction: column;">
		<view style="display: flex;flex-direction: row;align-items: center;margin-top: 16rpx;margin-bottom: 24rpx;">
			<view style="width: 16rpx;height: 10rpx;background: #FF502E;border-radius: 0px 100rpx 100rpx 0px;"></view>
			<view style="color: #333;font-size: 30rpx;margin-left: 16rpx;font-weight: bold;">我的招募人</view>
		</view>
		<view class="bgshadw" v-if="info">
			<image :src="getImgUrl(info.headimg)" style="width: 80rpx;height: 80rpx;margin-right: 21rpx;margin-left: 24rpx;"></image>
			<view style="display: flex;flex-direction: column;">
				<view style="font-size: 34rpx;color: #333333;font-weight: bold;">{{info.truename}}</view>
				<view style="font-size: 24rpx;color: #FC4932;">{{info.role_type}}</view>
			</view>
		</view>
		
		<view class="bgshadw2">
			<view class="tongji">
				<view class="tongji2">
					招募统计
				</view>

			</view>
			<view class="detail">
			<view style="display: flex;flex-direction: column;flex: 1;align-items: center;">
				<view class="t1">我的团队</view>
				<view class="t2">{{numInfo.total}}</view>
				
			</view>
			<view style="display: flex;flex-direction: column;flex: 1;align-items: center;">
				<view class="t1">我的直招</view>
				<view class="t2">{{numInfo.zhizhao_total}}</view>
				
			</view>
			<view style="display: flex;flex-direction: column;flex: 1;align-items: center;">
				<view class="t1">我的间招</view>
				<view class="t2">{{numInfo.jianzhao_total}}</view>
				
			</view>
		</view> 
		</view>

		
		
		<view class="select">
			<view class="selectitem" @click="select(0)">
				<text :class="[cindex==0?'selectTitle':'unSelectTitle']">我的直招</text>
				<view  :class="[cindex==0?'showImg':'unshowImg']"></view>
		
			</view>
			<view class="selectitem" @click="select(1)">
				<text :class="[cindex==1?'selectTitle':'unSelectTitle']">我的间招</text>
			<view  :class="[cindex==1?'showImg':'unshowImg']"></view>
		
		
			</view>
		</view>

		<view class="chat-list" v-if="isnotempty">
			<view v-for="(item,index) in list" :key="index" class="chat" @click="next(item)">
				<image src="https://xin.yiyunoto.com/uploads/static/samecity/first.png" style="width: 60rpx;height: 60rpx;margin-right: 26rpx;" v-if="index==0" ></image>
				<image src="https://xin.yiyunoto.com/uploads/static/samecity/second.png" style="width: 60rpx;height: 60rpx;margin-right: 26rpx;" v-if="index==1" ></image>
				<image src="https://xin.yiyunoto.com/uploads/static/samecity/three.png" style="width: 60rpx;height: 60rpx;margin-right: 26rpx;" v-if="index==2" ></image>
				<image :src="getImgUrl(item.headimg)" @error="onloaderror(index)" style="width: 80rpx;height: 80rpx; border-radius: 50%;margin-right: 20rpx;"></image>
				<view style="display: flex;flex-direction: column;flex: 1;">
					<view style="font-size: 34rpx;color: #333333;font-weight: bold;">{{item.nickname}}</view>
					<view style="font-size: 24rpx;color: #999;" v-if="cindex==0">{{item.role_type}} | 直招{{item.zhizhao_count}}人</view>
					<view style="font-size: 24rpx;color: #999;" v-if="cindex==1">{{item.role_type}} | 上级:{{item.shangji_name}}</view>
				</view>
				<image src="../../../static/public/grayright.png" style="width:14rpx ;height: 26rpx;"></image>


			</view>
		</view>
		<view  class="xia" v-if="!isnotempty">


			<view class="text">暂无记录</view>
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
				cindex:0,
				page: 1,
				list: [],
				info:null,
				touken: '',
				url: this.$store.state.url, //token路径
				date: {},
				num: '',
				loadingType: 0,
				isnotempty: false,
				numInfo:null
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			this.page = 1
				// this.consumeList()
		},
		onLoad(e) {

			this.getMyRecruiter();
			this.getData();
			this.getList();
		},
		onReachBottom() {

			this.page++;
			if (this.loadingType != 0) { // loadingType!=0;直接返回
				return false;
			}
			this.loadingType = 1;
			uni.showNavigationBarLoading(); // 显示加载动画
			this.getList();
		},
		methods: {
			 getImgUrl(url){
				 if(!url){
					 return ""
				 }
				if(url.search('http')==-1){url=this.url+url}
				return url
			},
			select(index){
				this.cindex=index;
				this.page=1;
				this.getList();
			},
			next(item) {
				uni.navigateTo({
					url: "tuijianTwo"
				})
			},
			onloaderror(i) {
				console.log("onloaderror", i)
				this.list[i].headimg = "https://xin.yiyunoto.com/uploads/static/shop/tz.png";

			},
			getMore() {
				let authtoken = uni.getStorageSync("authtoken");

				var requestUrl = this.url + '/api/leader/myChild';
				console.log(requestUrl);
				request.urlRequest(
					requestUrl, {
						page: this.page
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						if (this.page < res.data.data.total) {
							this.loadingType = 0
						} else this.loadingType = 2
						uni.hideNavigationBarLoading()
						res.data.data.data.forEach(item => {
							if (item.headimg && item.headimg.search("http") == -1) {

								item.headimg = this.url + item.headimg;
							}

						})
						this.list = this.list.concat(res.data.data.data);

					}
				);
			},
			getData() {
				let authtoken = uni.getStorageSync("authtoken");
				var requestUrl = this.url + '/api/partner/myTeam';
				request.urlRequest(
					requestUrl, {
						
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						this.numInfo=res.data.data
					}
				);

			},
			getMyRecruiter() {
				let authtoken = uni.getStorageSync("authtoken");
				var requestUrl = this.url + '/api/partner/myRecruiter';
				request.urlRequest(
					requestUrl, {
						
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						this.info=res.data.data
					}
				);
			
			},
			getList() {
				let authtoken = uni.getStorageSync("authtoken");
				var requestUrl = this.url + '/api/partner/myRecommend';
				request.urlRequest(
				
					requestUrl, {
						page : this.page,
						level : this.cindex+1
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						if (this.page < res.data.data.lastPage) {
							this.loadingType = 0
						} else this.loadingType = 2
						if(this.page==1)
						this.list = res.data.data.data;
						else this.list = this.list.concat(res.data.data.data);
						if (this.list.length > 0) {
							this.isnotempty = true;
						}else this.isnotempty = false;
						console.log("this.isnotempty",this.isnotempty)
						this.$forceUpdate()
					}
				);

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #Ffffff;
	}
	.select{
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
		width:48rpx;
		height: 4rpx;
		margin-top: 37rpx;
		opacity: 1;
	}
	
	.unshowImg {
		width:48rpx;
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
		color:  #D82708 ;
		font-size: 30rpx;
		width: 180rpx;
		height: 56rpx;
		background: #FFECCF;
		border-radius: 28rpx;


	}	
	.detail{
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
	.t1{
		color: #954E20;
		font-size: 24rpx;
		margin-bottom: 9rpx;
	}
	.t2{
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

	.chat-list {
		width: 100%;
		// height: 100%;

		.chat {
			align-items: center;
			margin-right: 24rpx;
			display: flex;
			flex-direction: row;
			height: 130rpx;
			margin-left: 24rpx;
			border-bottom: solid 1upx #eaeaea;

			.biaoti {
				margin-left: 20rpx;
				word-break: break-word; //换行模式
				overflow: hidden;
				text-overflow: ellipsis; //修剪文字
				display: -webkit-box;
				-webkit-line-clamp: 2; //此处为上限行数
				-webkit-box-orient: vertical;
				font-size: 34rpx;
				font-weight: 700;
				color: #333333;

			}

			.change {

				margin-top: 20rpx;
				font-size: 45rpx;
				font-weight: 700;
				color: #ff4444;
			}

			.tis {
				margin-top: 20rpx;
				font-size: 26rpx;
				color: #999999;
			}
		}
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

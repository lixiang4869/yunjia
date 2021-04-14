<template>
	<view>
		<!-- // 消费情况 -->
		<view class="chat-list" v-if="isnotempty">
			<view v-for="(item,index) in chatList" :key="index" class="chat">
			
						<!-- 用户名消费 -->
						<view class="biaoti">{{item.name}}</view>
							<!-- 消费金额 -->
							<view class="change">{{item.change}}</view>
							<view class="tis">{{item.addtime}}</view>
						
				
			</view>
		</view>
		<view v-else class="xia">

			<image class="img" src="../../../static/emptyCart.png">
				<view class="text">暂无消费记录</view>
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
				
				page: 1,
				chatList: [],
				touken: '',
				url: this.$store.state.url, //token路径
				date: {},
				num: '',
				loadingType: 0,
				isnotempty: false
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			this.page = 1,
				this.consumeList()
		},
		onLoad(e) {

			this.num = e.num;
			this.consumeList();
		},
		onReachBottom() {
			
			this.page++;
			if (this.loadingType != 0) { // loadingType!=0;直接返回
				return false;
			}
			this.loadingType = 1;
			uni.showNavigationBarLoading(); // 显示加载动画
			this.getMore();
		},
		methods: {
			getMore() {
				let authtoken = uni.getStorageSync("authtoken");

				var requestUrl;
				if (this.num == 1) {
					requestUrl = this.url + '/api/member/memFundLog';
				} else
					requestUrl = this.url + '/api/member/memassetslog';
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
						this.chatList = this.chatList.concat(res.data.data.data);

					}
				);
			},
			consumeList() {
				let authtoken = uni.getStorageSync("authtoken");
				console.log('this.num', this.num);
				var requestUrl;
				if (this.num == 1) {
					requestUrl = this.url + '/api/member/memFundLog';
				} else
					requestUrl = this.url + '/api/member/memassetslog';
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
						this.chatList = res.data.data.data;

						if (this.chatList.length > 0) this.isnotempty = true;
					}
				);

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}

	.chat-list {
		width: 100%;
		height: 100%;

		.chat {
			width: 100%;
			padding:20rpx ;
			border-bottom: solid 1upx #eaeaea;
			.biaoti{
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
			.change{
				
				margin-top: 20rpx;
				font-size: 45rpx;
				font-weight: 700;
				color: #ff4444;
			}
			.tis{
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

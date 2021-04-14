<template>
	<!-- 消息列表 -->
	<view>
		<view class="content">

			<view class="chat-list">
				<view class="chat" v-for="(chat,index) in chatList" :key="index">
					
					<view class="Title">{{chat.title}}</view>
					<view class="Titles">{{chat.content}}</view>
					<view class="time">{{time(chat.addtime)}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../store/http.js';
	export default {
		data() {
			return {
				url: this.$store.state.url,
				chatList: []
			}
		},
		onLoad() {
			this.getdata();
		},
		onShow() {
			/* 隐藏凸起图标 */
			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			setTimeout(function() {
				console.log(JSON.stringify(icon))
				icon.hide();
			}, 100);
			// #endif
		},
		methods: {
			time(ytime) { //定义时间戳转换方法  ytime为时间戳
				var date = new Date(ytime * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				let timeer = Y + M + D + h + m + s;
				return timeer //吐出转译好的时间
			},
			getdata() {
				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + '/api/guangjie/getNoticeListByType', {}, {
					authtoken: authtoken
				}, 'POST', res => {
					this.chatList = res.data.data.items;
					
				})
			}
		}
	}
</script>

<style>
	page {
		background: #EFEDED;
	}

	.content {
		width: 100%;
		height: 100%;
	}

	
	

	.chat {
	
		padding: 20upx;
		
		background: #ffffff;
		width: 100%;
		
		border-top: 1upx solid #E1DFDF;
		border-bottom: 2upx solid #E1DFDF;
	}


	.Title {
		
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 32upx;
		font-weight: 600;
		font-family: Source Han Sans CN;
		color: #333333;
	}

	.time {
		margin-right: 20upx;
		margin-top: 20upx;	
		
		font-size: 22upx;
		color: #999999;
	
	
	}
	.Titles {
		margin-right: 20upx;
		margin-top: 20upx;	
		
		font-size: 26upx;
		font-family: Source Han Sans CN;
	
	
	}

	
</style>

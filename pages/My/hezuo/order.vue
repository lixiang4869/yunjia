<template>
	<view style="justify-content: center;width: 100%;display: flex;flex-direction: column;align-items: center;">

		<view style="background: #ffffff;display: flex;border-radius: 10rpx;flex-direction: column;width: 710rpx;">
		<!-- <view class="in">
			<view class="title">订单编号</view>
			<view class="text">{{info.partnerinfo.id}}</view>
		</view> -->
		<view class="in">
			<view class="title">姓名</view>
			<view class="text">{{info.partnerinfo.truename}}</view>
		</view>
		<view class="in">
			<view class="title">合伙人类型</view>
			<view class="text">{{info.partnerinfo.typename}}</view>
		</view>
		<view class="in">
			<view class="title">区域</view>
			<view class="text">{{info.partnerinfo.address}}</view>
		</view>
		<view class="in">
			<view class="title">下单时间</view>
			<view class="text">{{info.partnerinfo.add_time}}</view>
		</view>
	</view>
	<view style="background: #ffffff;display: flex;border-radius: 10rpx;flex-direction: column;width: 710rpx;margin-top: 20rpx;">
		<view class="in">
			<view class="title">推荐人会员编号</view>
			<view class="text">{{info.upPartner.id}}</view>
		</view>
		<view class="in">
			<view class="title">推荐人姓名</view>
			<view class="text">{{info.upPartner.truename}}</view>
		</view>
		<view class="in">
			<view class="title">推荐人级别</view>
			<view class="text">{{info.upPartner.typename}}</view>
		</view>
	
	</view>
		<button class="btn" @click="sure">确定帮他开通合伙人</button>

	<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog :before-close="true" ></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopupDialog from '../../../components/uni-popup/opensuccess.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import request from '../../../store/http.js'
	export default {
		components:{
			uniPopupDialog,
			uniPopup
		},
		data() {
			return {
				
				url: this.$store.state.url,
				id: null,
				info: null
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getData()
		},

		methods:{
			sure(){
				let authtoken = uni.getStorageSync("authtoken");
				var requestUrl = this.url + '/api/partner/setPartner';
				request.urlRequest(
					requestUrl, {
						id:this.id
					}, {
						authtoken: authtoken
					},
					'POST',
					res => {
						uni.showToast({
							title:res.data.msg,icon:"none"
						})
						if(res.data.code==1)
						{
							uni.navigateBack({
								
							})
							// this.$refs.popup.open();
						}
					}
				);
				
			},
		getData() {
			let authtoken = uni.getStorageSync("authtoken");
			var requestUrl = this.url + '/api/partner/orderinfo';
			request.urlRequest(
				requestUrl, {
					id:this.id
				}, {
					authtoken: authtoken
				},
				'POST',
				res => {
					this.info = res.data.data
					
				}
			);
		
		},
		}
		
	}
</script>

<style>
	page{
		background: #f6f6f6;
	}
	.in {
		width: 710rpx;
		height: 108upx;
		line-height: 108upx;
		margin: 0 auto;
		border-bottom: 1upx solid #eeeeee;
		color: #ffffff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 32rpx;
		color: #333;
	}

	.title {
		
		margin-left: 32rpx;
		font-weight: bold;
		
	}

	.text {
		margin-right: 32rpx;
		color: #666;

	}

	.foot {
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		position: fixed;
		bottom: 110upx;
		color: #5a5a5a;
		font-size: 30upx;
	}

	.btn {

		height: 100upx;
		margin-top: 115upx;
		width: 620rpx;
		background: #f72926;
		text-align: center;
		line-height: 100upx;
		color: #FFFFFF;
		font-size: 36rpx;
	}

	
</style>

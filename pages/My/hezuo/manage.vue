<template>

	<view>
		<view class="topNav">
			<view class="navItem" v-for="(item,index) in navBar" :key="index" @click="changeNav(index)">
				<text :class="index == actionNum ? 'navTitle'  : 'actionTitle'">{{item.name}}</text>
				<view class="actionLinear" v-if="index == actionNum"></view>
			</view>
		</view>
		<view v-if="actionNum==0">
			<view class="item">
				<view style="font-size: 34rpx; color: #333;font-weight: bold;margin-top: 64rpx;margin-bottom: 50rpx;">请输入合伙人信息</view>
				<view class="phone">
					<view>合伙人手机号</view>
					<input type="text" placeholder="请输入合伙人手机号" v-model="phone" @input="getInfoById" style="margin-left: 30rpx;">
				</view>
				<view class="phone">
					<view>合伙人ID</view>
					<input type="text" placeholder="请输入合伙人ID" v-model="id" @input="getInfoById" style="margin-left: 30rpx;">
				</view>
				<view class="phone" v-if="info">
					<view>合伙人:</view>
					<image :src="getImgUrl(info.headimg)" style="width: 80rpx;height: 80rpx;border-radius: 40rpx;margin-left: 20rpx;"></image>
					<view style="margin-left: 20rpx;">{{info.truename}}</view>

				</view>
				<view style="display: flex;flex-direction: row;margin-bottom: 43rpx;">
					<view class="btn" @click="kaitong">帮他开通</view>
					<view class="btn2" @click="guanxi">查询关系</view>
				</view>

			</view>
		</view>
		<view v-if="actionNum==1" style="width: 100%;align-items: center;display: flex;flex-direction: column;background: #fff;">
			<view v-for="(item,index) in list" :key="index" class="item2">
				<view style="font-size: 30rpx;color: #333;font-weight: bold;margin-top: 24rpx;">会员名称</view>
				<view style="margin-top: 24rpx; display: flex;flex-direction: row;margin-left: 35rpx;margin-right: 35rpx;justify-content: space-between;">
					<view>id</view>
					<view>直推人数</view>
				</view>
				<view style="margin-bottom: 24rpx; margin-top: 24rpx; display: flex;flex-direction: row;margin-left: 35rpx;margin-right: 35rpx;justify-content: space-between;">
					<view>手机号：</view>
					<view>类型：</view>
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
				navBar: [{
						name: '帮他开通',

					},
					{
						name: '7人小组',

					},

				],
				actionNum: 0,

				val: "", //输入框的text
				hideImg: false,
				id: null,
				url: this.$store.state.url,
				info: null,
				list: [{}]
			};
		},
		onLoad() {

		},
		methods: {
			changeNav(index) {
				this.actionNum = index
			},
			kaitong() {
				if(this.id)
				uni.navigateTo({
					url: "kaitong?id=" + this.id
				})
			},
			guanxi() {
				uni.navigateTo({
					url: "guanxi?type=0&id=" + this.id
				})
			},
			getImgUrl(url) {
				if (url.search('http') == -1) {
					url = "https://xin.yiyunoto.com" + url
				}
				return url
			},
			getVal(e) {
				console.log(e)
				/* 输入框不能为空 */
				if (e.detail.value.length == 0) {

					this.hideImg = false

				} else {

					this.hideImg = true
				}
			},
			getInfoByPhone(){
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(this.url+"/api/partner/checkUpUser",{phone:this.phone},{authtoken:authtoken},"POST",res=>{
					if(res.data.code==1){
						this.info =res.data.data;
						this.id= this.info.id
					}
					
					else this.info =null
					// this.isShowType=true
				})
			},
			getInfoById() {
				if(!this.id){
					return
				}
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(this.url + "/api/partner/checkUpUser", {
					mid: this.id
				}, {
					authtoken: authtoken
				}, "POST", res => {
					if (res.data.code == 1) {
						
						this.info = res.data.data;
						this.id = this.info.id
					} else this.info = null
					// this.isShowType=true
				})
			},
			shan() {
				this.val = ""
				this.hideImg = false
			},
			setVal() {
				var authtoken = uni.getStorageSync("authtoken")
				var self = this
				if (this.val !== "") {
					request.urlRequest(
						self.url + '/api/member/editnickname', {
							nickname: this.val
						}, {
							authtoken: authtoken
						},
						'POST',
						(res) => {
							uni.showToast({
								title: res.data.msg
							});
							if (res.data.code = 1) {
								this.infor.meminfo.nickname = this.val;
								this.$store.commit("changeUserInfor", this.infor);
								setTimeout(function() {
									uni.navigateBack({

									})
								}, 500);

							}



						}
					)
				} else {
					uni.showToast({
						title: '昵称不能为空',
						icon: "none"
					});
				}

			}
		}
	}
</script>

<style lang="scss">
	.topNav {
		width: 100%;
		height: 99rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;

		align-items: center;

	}

	.navItem {
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.navTitle {
		flex: 1;
		line-height: 95rpx;
		display: flex;
		text-align: center;
		font-size: 30rpx;
		color: #FF2B10;
	}

	.actionTitle {
		flex: 1;
		line-height: 95rpx;
		display: flex;
		text-align: center;
		font-size: 30rpx;
		color: #333;
	}

	.actionLinear {
		width: 48rpx;
		height: 4rpx;
		background: #FF2B10;
		border-radius: 3rpx;

	}

	page {
		background-color: #f3f3f3;
	}

	.btn {
		font-size: 36rpx;
		color: #fff;
		margin-top: 100rpx;

		line-height: 98rpx;
		text-align: center;
		width: 260rpx;
		height: 98rpx;
		background: #F32A27;
		border-radius: 8rpx;


	}

	.btn2 {
		font-size: 36rpx;
		color: #fff;
		margin-top: 100rpx;
		margin-left: 73rpx;
		line-height: 98rpx;
		text-align: center;
		width: 260rpx;
		height: 98rpx;
		background: #FA8C36;
		border-radius: 8rpx;
	}

	.item2 {
		font-size: 24rpx;
		color: #666;
		border-bottom: 1rpx solid #eeeeee;
		display: flex;
		flex-direction: column;
		width: calc(100% - 60rpx);
		background: #FFFFFF;
	}

	.item {
		font-size: 30rpx;
		color: #333;
		margin-left: 24rpx;
		margin-right: 24rpx;
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;
		width: 702rpx;
		align-items: center;

		background: #FFFFFF;

		border-radius: 16rpx;

	}

	.phone {
		width: 94%;

		display: flex;
		flex-direction: row;
		height: 116rpx;
		line-height: 116rpx;
		align-items: center;
		padding-left: 39rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		border-bottom: 1rpx solid #eeeeee;

		input {
			margin-left: 30rpx;
		}
	}
</style>

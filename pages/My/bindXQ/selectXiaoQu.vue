<template>
	<view>

		<view class="list" v-for="(item, index) in list" :key="index" v-if="show">
			<view class="list-item" @click="check(index)">

				<view class="address">
					<text class="name">{{ item.name }}</text>
					<text class="name2">{{ item.address }}</text>
				</view>
				<image :src="item.checked?'/static/selected.png':'/static/select.png'" mode="aspectFit"></image>

			</view>
		</view>

		<button class="btn" @click="confirm">绑定小区成为业主</button>
	</view>
</template>

<script>
	import request from '../../../store/http.js';
	export default {
		data() {
			return {
				show:true,
				list: [],
				url: this.$store.state.url,
				index: 0,
				hint:''
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
			this.getCommunityList()
		},
		onLoad(data) {
			this.hint = data.hint;
		},
		onUnload() {
			if(this.hint!=''){
				uni.showToast({
					icon:'none',
					title:this.hint
				})
			}
		},
		methods: {
			check(index) {
				for (var item of this.list) {
					item.checked = false;
				}
				this.index = index;
				this.list[index].checked = true;
				this.show=false;
				this.show=true;
			},
			confirm() {
				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(
					this.url + '/api/member/bindUserToCommunity', {id:this.list[this.index].id}, {	authtoken: authtoken}, 'POST',
					(res) => {
						uni.showToast({
							title:res.data.msg,icon:'none'
						})
						if (res.data.code == 1) {
							setTimeout(function(){uni.navigateBack({
								
							})},500);
							
						}
				
				
				
					}
				)
			},
			// 获取小区列表
			getCommunityList() {
				request.urlRequest(
					this.url + '/api/member/getCommunityList', {}, {}, 'POST',
					(res) => {
						if (res.data.code == 1) {
							this.list = res.data.data;
							this.check(0);
						}



					}
				)



			},

		}
	};
</script>

<style lang="less">
	page {

		background: #f6f6f6;
	}

	.list-item {
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		border-bottom: 1px solid #e5e5e5;

		.img {
			margin-left: 20upx;
			margin-right: 20upx;
			width: 60upx;
			height: 60upx;
			border-radius: 30upx;
		}

		image {
			margin-right: 40upx;
			width: 40upx;
			height: 40upx;
		}
	}

	.name {
		flex: 1;
		font-size: 32upx;
		color: #333333;
	}

	.name2 {
		flex: 1;
		font-size: 28upx;
		color: #999;
	}

	.btn {
		width: 90%;
		margin-left: 5%;
		margin-bottom: 20upx;
		font-size: 32upx;
		height: 100upx;
		position: fixed;
		bottom: 0upx;
		background: #f72926;

		text-align: center;
		line-height: 100upx;
		color: #FFFFFF;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.address {
		margin-left: 30upx;
		display: flex;
		flex-direction: column;

	}
</style>

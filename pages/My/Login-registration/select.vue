<template>
	<view>

		<view class="list" v-for="(item, index) in list" :key="index" v-if="show">
			<view class="list-item" @click="check(index)">

				<view class="address">
					<text class="name">{{ item.phone }}</text>
					<!-- <text class="name2">{{ item.address }}</text> -->
				</view>
				<image :src="item.checked?'/static/selected.png':'/static/select.png'" mode="aspectFit"></image>

			</view>
		</view>
		<button class="btn" @click="add">添加账号</button>
		<!-- <button class="btn" @click="confirm">切换账号</button> -->
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

		onLoad() {
			this.getList();
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
				this.formSubmit();
			},
			// 确认登录单机事件
			formSubmit() {
				uni.showLoading({
					title:"正在登录"
				})
				
				request.urlRequest(
					this.url + "/api/login/login", {
						phone: this.list[this.index].phone,
						pwd: this.list[this.index].pwd
					}, {},
					'POST',
					(res) => {
						console.log(res);
						if (res.data.code == 200) {
							
							uni.setStorageSync("authtoken", res.data.data.authtoken);
							uni.setStorageSync("phone", res.data.data.phone);
							uni.setStorageSync("uid", res.data.data.uid);
						
							this.$conn.open({
								apiUrl: this.$im.config.apiURL,
								user: res.data.data.uid,
								pwd: "123456",
								grant_type: "password",
								appKey: this.$im.config.appkey
							});
							uni.navigateBack({
								delta: 2
							});
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							}, );
						}
					}
				)
			},
			add() {
				uni.navigateTo({
					url:"./login"
				})
			},
			
			getList() {
			this.list= JSON.parse(uni.getStorageSync("users"))	
					let phone =	uni.getStorageSync("phone");
					this.list.forEach((item)=>{
						if(item.phone==phone){
							item.checked=true
						}
					})
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

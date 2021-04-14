<template>
	<view>
		<view class="content">

			<view class="list" @click="nicheng">
				<view class="title">昵称</view>
				<view class="titles" v-if="infor">{{infor.meminfo.nickname==null?"未设置":infor.meminfo.nickname}}</view>
				<image src="../../../static/home/right.png" class="right">
			</view>
			<view class="list" @click="shoujihao">
				<view class="title">手机号</view>
				<view class="titl" v-if="infor">{{infor.meminfo.phone}}</view>
				<image src="../../../static/home/right.png" class="right">
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				date: {},
				user: "",
				tel: "",
				infor: this.$store.state.userInfor
			};
		},

		

		methods: {
			nicheng: function() {
				if (this.infor == null) {
					uni.navigateTo({
						url: '/pages/My/Login-registration/Login-registration' //跳转登陆页面
					})
				} else {
					uni.navigateTo({
						url: '/pages/My/Modify-nickname/Modify-nickname?user=' + this.user //跳转修改昵称页面
					})
				}
			},
			shoujihao: function() {
				// if (this.infor.meminfo.phone == 0||!this.infor.meminfo.phone ) {
					uni.navigateTo({
						url: '/pages/My/Modify-phoneNumber/Modify-phoneNumbers' //跳转绑定手机号页面
					})
				// } else {
				// 	uni.showModal({
				// 		content: '已绑定手机号，不得更改',
				// 		showCancel: false,

				// 	})
				// }

			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #f3f3f3;
	}

	.content {
		padding-top: 26upx;

		.list {

			height: 80upx;
			align-items: center;
			display: flex;
			flex-direction: row;
			justify-content: center;
			background: rgba(255, 255, 255, 1);
			border-radius: 10upx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-bottom: 12upx;

			.title {
				float: left;
				flex: 1;
				font-size: 26upx;
				font-family: PingFangSC-Regular, PingFang SC;
				color: rgba(83, 83, 83, 1);
				padding-left: 20upx;
			}
		}
	}

	.titles {
		float: left;
		font-size: 26upx;
		font-family: PingFangSC-Regular, PingFang SC;
		text-align: right;
		overflow: hidden;
		/*超出的部分隐藏起来。*/
		white-space: nowrap;
		/*不显示的地方用省略号...代替*/
	}

	.titl {
		float: left;
		font-size: 26upx;
		font-family: PingFangSC-Regular, PingFang SC;
		text-align: right;
		color: rgba(166, 166, 166, 1);
	}

	.right {
		margin-left: 20rpx;
		margin-right: 20rpx;
		width: 14upx;
		height: 26upx;

	}
</style>

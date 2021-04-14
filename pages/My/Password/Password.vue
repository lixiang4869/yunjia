<template>
	<view>
		<view class="content">
			<!-- 支付密码修改 -->
			<view class="list" @click="zhifu" >
					<view class="title">支付密码</view>
					<view class="xiugai">
						{{setmi}}
					</view>
					<image src="../../../static/home/right.png" class="right">
			</view>
			<!-- 登陆密码修改 -->
			<view class="list" @click="denglu">
					<view class="title">登录密码</view>
					<view class="xiugai">修改</view>
				<image src="../../../static/home/right.png" class="right">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone :'',
				setmi: ""
			};
		},
		onLoad(e) {
			this.phone = e.phone
			// console.log('user');
			let paypassword = uni.getStorageSync('paypassword')
			// console.log(paypassword)
			if(paypassword){
				this.setmi = "修改"
			}else {
				this.setmi = "设置"
			}
		},
		methods: {
		    zhifu: function() {
				// if(this.setmi === "修改"){
				// 	uni.navigateTo({
				// 		url: '/pages/My/Pay-password/Pay-password?phone=' + this.phone//支付密码修改
				// 	})
				// }else if(this.setmi === '设置'){
					uni.navigateTo({
						url: "/pages/My/Set-payment-password/Set-payment-password" 
					})
				// }
			},
			denglu: function() {
					uni.navigateTo({
						url: '/pages/My/Landing-password/Landing-password' //登陆密码修改
					})
		    },
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f3f3f3;	
}
.content{
	padding-top: 26upx;
	.list{
		height:80upx;
		align-items: center;
		display: flex;
		flex-direction: row;
		background:rgba(255,255,255,1);
		border-radius:10upx;
		margin-left: 30upx;
		margin-right: 30rpx;
		margin-bottom: 12upx;
			.title{
				float: left;
				font-size:26upx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:rgba(83,83,83,1);
				padding-left: 20upx;
				
			}
	}
}
			.xiugai{
				float: left;
				font-size:26upx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:rgba(166,166,166,1);
				margin-left: 439upx;
				
			}
			.right{
				float: left;
				width:14upx;
				height:26upx;
				margin-left:32upx;
				
			}
</style>

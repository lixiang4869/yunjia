<template>
	<!-- 设置收款金额 -->
	<view>
		<view class="top">
			<view class="top-one">
					<view class="title">收款金额</view>
								<view class="xia">
									<view class="text">¥</view>
								
									<input type="number" class="input" v-model="qwe"/>
							
								</view>
			</view>
			<button class="button" @click="www">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qwe: "",
			};
		},
		methods:{
			/* 返回收款码页面 */
			www(){
				uni.navigateTo({
					url: "/pages/My/Collection-code/Collection-code?qwe=" + this.qwe 
				})
			}
		},
		onLoad(e) {
			console.log(e)
		},
	}
</script>

<style>
	page{
		width:100%;
		height:100%;
		background:rgba(245,245,245,1);
	}
	.top{
		width:690upx;
		height:428upx;
		background:rgba(255,255,255,1);
		border-radius:10upx;
		margin-top: 30upx;
		margin-left:30upx ;
	}
	.top-one{
		border-bottom:1upx solid #F5F5F5;
		height: 150upx;
		width: 579upx;
		margin-top: 56upx;
		margin-left:40upx ;
	}
	.title{
		height:37upx;
		font-size:26upx;
		font-family:PingFangSC-Regular,PingFang SC;
		color:rgba(0,0,0,1);
		margin-left: 0upx;
		
		margin-top: 25upx;
	}
	.xia{
		width: 100%;
		height: 87upx;
		display: flex;
		flex-wrap: nowrap;
	}

	.text{
		padding-top: 25upx;
		height:70upx;
		font-size:50upx;
		font-family:PingFangSC-Regular,PingFang SC;
		color:rgba(0,0,0,1);
	}
	.input{
		padding-top: 45upx;
		padding-left: 20upx;
		color: #EF5350;
		font-size: 50upx;
	}
	.button{
		width:587upx;
		height:98upx;
		background:rgba(245,139,35,1);
		border-radius:10upx;
		margin-left:52upx ;
		margin-top: 72upx;
		font-size:35upx;
		font-family:PingFangSC-Semibold,PingFang SC;
		color:rgba(255,255,255,1);
		line-height:49px;
	}
</style>

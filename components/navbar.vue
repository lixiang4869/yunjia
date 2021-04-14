<template>
	<view>
		<status></status>
		<view class="navbarTop">
			<view class="back" @tap="back()">
				<image :src="require('../static/public/blackBack.png')"></image>
			
				<view class="backText">返回</view>
			</view>
			<view class="navbarTitle">
				<view class="title">{{title}}</view>
			</view>
		</view>
	</view>
</template>
 
 <script>
	import status from "@/components/status/status.vue"
 	export default {
 		name:"headertop",
		components:{
			status
		},
 		props:{
			title:{
				type: String,
				default: "智慧家居"
			},
			backnum:{
				type: Number,
				default: 1
			}
 		},
		computed:{
		},
		mounted:function(){
			
		},
 		data() {
 			return {
 				
 			}
 		},
 		methods: {
 			back(){
 				uni.navigateBack({
 				    delta: this.backnum
 				});
 			},
 		}
 	}
 </script>
 
 <style lang="scss">
	 .main{
	 	width: 100%;
	 	height: 100%;
	 	overflow: auto;
	 	position: absolute;
	 	left: 0;
	 	right: 0;
	 	top: 0;
	 	bottom: 0;
	 	z-index: -1;
		.navbarTop{
			position: fixed;
			left: 0;
			z-index: 10;
			padding-top: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			color:#FFFFFF;
			width:100%;
			height:230rpx;
			background:linear-gradient(59deg,rgba(91,148,244,1),rgba(42,112,228,1));
			.back{
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				image{
					margin:auto 20rpx auto 20rpx;
					width:19rpx;
					height: 34rpx;
				}
				.backText{
					width:60rpx;
					font-size:30rpx;
					font-family:PingFang SC;
					font-weight:500;
				}
			}
			.navbarTitle{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				.title{
					width:240rpx;					
					font-size:36rpx;
					font-family:Microsoft YaHei;
					font-weight:bold;
				}
				
			}
		}
	 }
 </style>
 
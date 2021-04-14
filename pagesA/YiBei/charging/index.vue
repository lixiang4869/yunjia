<template>
	<view class="content">
		<view class="Olist">
			<view class="v1">
				<text class="t1"> 扫码充电</text>
				<text class="t2">请扫描充电桩二维码</text>
			</view>
			<view class="v2" @click="goto">

				<!-- <image src="../../../static/my/sao.png"> </text> -->

				<!-- <image src="https://xin.yiyunoto.com/uploads/static/my/sao.png"> </text> -->

					<text class="t2">扫一扫</text>
			</view>
		</view>


		<view class="Obox" v-for="(row,index) in oList" :key="index" @click="goHistory" >
			<image :src="imgurl+row.icon" class="Oicon2" mode=""></image>
			<view class="Otext">{{row.text}}</view>
			<view class="Otext2" v-if="row.money">{{row.money}}</view>
			<image src="../../../static/home/right.png" class="Oicon" mode=""></image>
		</view>

	</view>
</template>

<script>
	import request from '../../../store/http.js';
	export default {
		data() {
			return {
					imgurl:this.$store.state.url,
				url: this.$store.state.cdzurl,
				oList: [{
						text: '我的余额',
						icon: '/uploads/static/kaimen/yue.png',
						money: "￥0.0"
					},
					{
						text: '历史记录',
						icon: '/uploads/static/kaimen/jl.png',
						id:"pages/YiBei/charging/histroy"
					}
					// ,
					// {
					// 	text: '退货中',
					// 	icon: '../../../static/my/pass.png'
					// },
				],
			};
		},
		onLoad() {
			this.getdata();
		},
		methods: {
			goHistory(){
				uni.navigateTo({
					url:"histroy"
				})
			},
			getdata(){
				var token = uni.getStorageSync("authtoken");
					if (!token)
						uni.navigateTo({
							url:'/pages/My/Login-registration/Login-registration'//退出登录
							// url: '../../My/Login-registration/Login-registration'
						})
					else
					
								request.urlRequest(
									this.url, {
										// command:"B001",cardno:"00600001"
				
										command: "B001",
										cardno: "00600001",
										
										// ,
										// code:"终端认证"
									}, {}, 'GET', res => {
										let data = JSON.parse(res.data.data);
										this.oList[0].money =data.accmoney;
									}
								);
							
						
				
				
			},
			goto() {
				let _this =this;
				var token = uni.getStorageSync("authtoken");
				if (!token)
					uni.navigateTo({
						url:'/pages/My/Login-registration/Login-registration'//退出登录
						// url: '../../My/Login-registration/Login-registration'
					})
				else
					uni.scanCode({
						success(res) {
							if (res.result.search("=") == -1 || res.result.split("=")[1].search(",") == -1) {
								return;
							}
							let deviceno = res.result.split("=")[1].split(",")[0];
							let jackno = res.result.split("=")[1].split(",")[1];
							request.urlRequest(
								_this.url, {
									// command:"B001",cardno:"00600001"

									command: "B004",
									cardno: "00600001",
									params1: deviceno,
									params2: jackno
									// ,
									// code:"终端认证"
								}, {}, 'GET', res => {
									console.log(res);
									uni.navigateTo({
										url: 'charging?data=' + res.data.data
									})
								}
							);
						}
					})

			}
		}

	}
</script>

<style lang="scss">
	.content {

		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	page {
		background: #ebebf5;
	}

	.v1 {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;

	}

	.v2 {
		display: flex;
		align-items: center;
		margin-right: 30upx;
		justify-content: center;
		width: 232upx;
		height: 74upx;
		background: rgba(57, 128, 234, 1);
		border: 0px solid rgba(0, 0, 0, 1);
		border-radius: 37px;

		image {
			margin-right: 20upx;
			width: 40upx;
			height: 40upx;
		}

		.t2 {
			font-size: 30rpx;

			color: #ffffff;
		}
	}

	.t1 {
		font-size: 36rpx;
		font-weight: 600;
		color: #333333;
	}

	.t2 {
		font-size: 30rpx;

		color: #016EFF;
	}

	.Olist {
		width: 100%;
		padding-top: 10upx;
		padding-bottom: 20upx;
		// display: flex;
		background: #FFFFFF;
		border-bottom: solid 0.5upx #eeeeee;
		display: flex;

		flex-direction: row;


	}


	.Oicon2 {
		margin-left: 20upx;
		width: 8vw;
		height: 8vw;
	}

	.Oicon {
		margin-left: 20upx;
		margin-right: 20upx;
		width: 16upx;
		height: 25upx;
	}

	.Obox {
		border-bottom: solid 0.5upx #eeeeee;
		background: #ffffff;
		height: 100upx;
		display: flex;
		flex-direction: row;
		align-items: center;

		width: 100%;
	}

	.Otext {
		flex: 1;
		margin-left: 20upx;
		font-size: 32upx;
		color: #3d3d3d;
	}

	.Otext2 {
		font-size: 32upx;
		color: #3d3d3d;
	}
</style>

<template>
	<view class="content">
		<image class="top" :src="imgurl+top"></image>
		<view class="detail">
			<image :src="imgurl+icon"></image>
			<view class="right">
					<view class="Otext1">电站编号:{{data.stationno}}</view>
					<view class="Otext1">插座编号:{{data.macid}}</view>
					<view class="Otext2">{{status}}</view>
			</view>
		</view>
	
			<view class="titlee" @click="chong">{{ctxt}}</view>
	</view>
</template>

<script>
		import request from '../../../store/http.js';
	export default {
		data() {
			return {
				imgurl: this.$store.state.url,
				ctxt:"立即充电",
				top:"/uploads/static/kaimen/top.png",
				icon:"/uploads/static/kaimen/cdzz.png",
				url: this.$store.state.cdzurl,
					data:{},
					status:""
			};
		},
		onLoad(e) {
			this.data = JSON.parse(e.data);
			this.getstatus(this.data.state);
		},
		onPullDownRefresh() {
			request.urlRequest(
				this.url, {
					// command:"B001",cardno:"00600001"
			
					command: "B004",
					cardno: "00600001",
					params1: deviceno,
					params2: jackno
					// ,
					// code:"终端认证"
				}, {}, 'GET', res => {
						this.data = JSON.parse(res.data.data);
						this.getstatus(this.data.state);
				}
			);
		},
		onShow() {
			
			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			setTimeout(function() {
				if(icon)
				icon.hide();
			}, 100);
			// #endif
		},
		methods:{
			getstatus(type){
			
				if(type==1){
					this.status="未使用"
				}else if(type==2){
						this.status="在用"}
				else{
						this.status="离线"
				}
				
			},
			chong(){
				let params3 =1;
				if(this.ctxt=="立即断电"){
					params3=-1
				}
				request.urlRequest(
					this.url, {
						// command:"B001",cardno:"00600001"
				
						command: "B005",
						cardno: "00600001",
						params1: this.data.stationno,
						params2: this.data.macid,
						params3:params3
						// ,
						// code:"终端认证"
					}, {}, 'GET', res => {
						if(res.data.code==200){
							uni.showToast({
								title:"已开始充电",icon:"none"
							});
							this.status="在用";
							this.ctxt="立即断电"
						}
					}
				);
			}
		}
	
	}
</script>

<style lang="scss">
	.titlee {
		width: 90%;
		margin-top: 300upx;
		margin-bottom:50upx;
		background: $uni-color-primary;
		box-shadow: 0px 2upx 4upx 0px rgba(0, 0, 0, 0.28);
		border-radius: 10upx;
	
		font-size: 30upx;
		font-family: PingFangSC-Regular, PingFang SC;
		color: rgba(255, 255, 255, 1);
		height: 90upx;
		line-height: 90upx;
		justify-content: center;
		text-align: center;
		align-items: center;
	}
	.content {
		background: #ffffff;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.top{
		width: 90%;
		margin-left:5%;
		margin-right: 5%;
		height: 300upx;
		border-radius: 15upx;
	}
	.detail{
		margin-top: 20upx;
		height: 120upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		image{
			margin-left: 20upx;
			width: 90upx;
			height: 115upx;
		}
	}
	.right{
		margin-left: 20upx;
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.Otext1 {
		
		
		font-size: 32upx;
		color: #3d3d3d;
	}
	.Otext2 {
		
		
		font-size: 30upx;
		color: #999999;
	}
</style>

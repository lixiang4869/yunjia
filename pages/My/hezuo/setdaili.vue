<template>
	<!-- 修改昵称 -->
	<view>
		<view class="item">
			<view style="font-size: 34rpx; color: #333;font-weight: bold;">设置代理人</view>
			<view class="phone" >
				<view >代理人ID:</view>
				<input type="text" placeholder="请输入代理人ID"  v-model="id" @input="getInfoById" style="margin-left: 30rpx;">
			</view>
			<view class="phone" v-if="info">
				<view >代理人:</view>
				<image :src="getImgUrl(info.headimg)" style="width: 80rpx;height: 80rpx;border-radius: 40rpx;margin-left: 20rpx;"></image>
				<view style="margin-left: 20rpx;">{{info.truename}}</view>
				
			</view>
			<view class="btn" @click="setVal">确认提交</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../store/http.js'
	export default {
		data() {
			return {
				val: "",//输入框的text
				hideImg: false,
				id:null,
				url: this.$store.state.url  ,
				info:null
			};
		},
		onLoad() {
			
		},
		methods: {
			getImgUrl(url){
				if(url.search('http')==-1){url="https://xin.yiyunoto.com"+url}
				return url
			},
			 getVal(e){
				  console.log(e)
				  /* 输入框不能为空 */
				 if(e.detail.value.length == 0){
					 
					  this.hideImg = false
					 
				 }else{
					
					 this.hideImg = true
				 }
			 },
			 getInfoById(){
			 	let authtoken = uni.getStorageSync("authtoken");
			 	request.urlRequest(this.url+"/api/partner/checkUpUser",{mid:this.id},{authtoken:authtoken},"POST",res=>{
			 		if(res.data.code==1){
			 			this.info =res.data.data;
			 			this.id= this.info.id
			 		}
			 		
			 		else this.info =null
			 		// this.isShowType=true
			 	})
			 },
			 shan(){
				 this.val=""
				 this.hideImg=false
			 },
			 setVal(){
				 var authtoken = uni.getStorageSync("authtoken")
					var self = this
					if(this.val !== ""){
						request.urlRequest(
							self.url + '/api/member/editnickname',
							{nickname:this.val					 				
								},
								{authtoken:authtoken},
							'POST',
							 (res) => {
								 uni.showToast({title: res.data.msg});
								 if(res.data.code=1){
									 this.infor.meminfo.nickname=this.val;
									 this.$store.commit("changeUserInfor",this.infor);
									 setTimeout(function() {
									 	uni.navigateBack({
									 		
									 	})
									 }, 500);
									
								 }
								
								
		
							}
					)
			}else {
			   uni.showToast({title: '昵称不能为空',icon:"none"});
			}
					
			 }
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f3f3f3;	
}
.btn{
	font-size: 36rpx;
	color: #fff;
	margin-top: 100rpx;
	width: 620rpx;
	line-height: 98rpx;
	text-align: center;
	height: 98rpx;
	background: #F32A27;
	border-radius: 8rpx;
	margin-bottom: 20rpx;

}
.item{
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
.phone{
		width: 94%;
		
		display: flex;
		flex-direction: row;
		height: 106rpx;
		line-height: 106rpx;
		align-items: center;
		padding-left: 39rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		border-bottom: 1rpx solid #eeeeee;
		input{
			margin-left: 30rpx;
		}
	}
</style>

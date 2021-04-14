<template>
	<!-- 修改昵称 -->
	<view>
		<view class="content">
			<view class="list" >
					<input  class="title"  :placeholder="user" maxlength="6" style="padding-left:20upx;" v-model="val"  @input="getVal" >
					<view class="right" v-if="hideImg"><image src="../../../static/my/quxiao.png" style="width:27upx;height:27upx;" @tap="shan"></view></input>
			</view>
			<view class="nichen" @click="setVal">确认提交</view>
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
				infor :this.$store.state.userInfor,
				url: this.$store.state.url  ,
			};
		},
		onLoad() {
			this.val=this.infor.meminfo.nickname;
			if(this.val==null){
				this.val='';
			}
		},
		methods: {
			 getVal(e){
				  console.log(e)
				  /* 输入框不能为空 */
				 if(e.detail.value.length == 0){
					 
					  this.hideImg = false
					 
				 }else{
					
					 this.hideImg = true
				 }
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
.content{
	padding-top: 26upx;
	.list{
		width:750upx;
		height:80upx;
		background:rgba(255,255,255,1);
			.title{
				width: 75%;
				float: left;
				font-size:26upx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:#000000;
				padding-left: 20upx;
				padding-top: 22upx;
			}
	}
}
			.right{
				float: left;
				width:27upx;
				height:27upx;
				padding-top: 22upx;
				padding-left: 80upx;
			}
			.nichen{
			width:690upx;
			height:85upx;
			background:$uni-color-primary;
			box-shadow:0px 2upx 4upx 0px rgba(0,0,0,0.28);
			border-radius:10upx;
			margin-left: 30upx;
			margin-top: 621upx;
			text-align: center;
			line-height: 85upx;
			color: #FFFFFF;
			}
</style>

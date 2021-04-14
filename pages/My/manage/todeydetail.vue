<template>
	<view>
		<!-- // 消费情况 -->
        <view class="chat-list" v-if="isnotempty">
			<view v-for="(item,index) in chatList" :key="index"  class="chat">
				<view class="row" >
					<view class="right">
						<!-- 用户名消费 -->
						<view class="biaoti"> {{item.name}}</view>
						
						<view class="top">
						
						
							<!-- 消费金额 -->
							<view class="time">{{item.change}}</view>
						</view>
						
						<view class="bottom">
							<!-- 消费类型 -->
						
							
							<!-- 消费时间 -->
							<view class="tis">{{item.addtime}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="xia">
			
			<image class="img" src="../../../static/emptyCart.png">
				<view class="text">暂无消费记录</view>
		</view>
		<!-- <view class="xia" v-else>
			<image class="img" src="../../../static/emptyCart.png">
				<view class="text">暂无消费记录</view>
		</view> -->
	</view>
</template>

<script>
		import request from '../../../store/http.js'
	export default {
		data() {
			return {
				timer:null,
				page:1,
				chatList:[],
				touken: '',
				url: this.$store.state.url  ,//token路径
				date:{},
				num:'',
				isnotempty: false
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			this.page=1,
		        this.consumeList()
		},
		onLoad(e) {
	
		
			this.consumeList();
		},
		 onReachBottom(){
		  if(this.timer != null){
		   clearTimeout(timer);
		  }
		  this.page++;
		  this.timer = setTimeout(this.consumeList(),500);
		 },
		methods: {
			consumeList(){
				let authtoken = uni.getStorageSync("authtoken");
			
				let requestUrl = this.url + '/api/Shopinfo/orderinfo';
				
				request.urlRequest(
					requestUrl,
					{page:this.page},
					{authtoken: authtoken},
					'POST',
					res => {
						
						this.chatList= res.data.data.data;
						
						if(this.chatList.length>0)this.isnotempty=true;
					}
				);
				
			}  
		}
	}
</script>

<style  lang="scss">
	page{
		background-color:#F5F5F5;
	}
	.chat-list{
	width: 100%;
	height: 100%;
		.chat{
			width: 100%;
			height: 198upx;
			border-bottom: solid 1upx #eaeaea;
			.row{
				width: 690upx;
				height: 198upx;
				padding-left: 30upx;
				display: flex;
				justify-content: flex-start;
				.right{
					flex-shrink:1;
					width: 100%;
					.top{
					height: 57upx;
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						.usernam{
							font-size:28upx;
							font-family:PingFangSC-Regular,PingFang SC;
							color:rgba(51,51,51,1)
						}
						.time{
							font-size:41upx;
							font-family:PingFangSC-Regular,PingFang SC;
							color:rgba(245,139,35,1);
						}
					}
					.bottom{
						width: 100%;
						height: 40upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.msg{
						padding-top: 12upx;
							font-size:28upx;
							font-family:PingFangSC-Regular,PingFang SC;
							color:rgba(127,127,127,1);
						}
						.tis{
							font-size:26upx;
							font-family:PingFangSC-Regular,PingFang SC;
							color:rgba(127,127,127,1);
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}
				.biaoti{
					width: 100%;
					height: 45upx;
					font-size:32upx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(41,41,41,1);
				padding-top: 26upx;
				}
			}
		}
	}
	.xia{
		width: 100%;
		height: 100%;
		background: #F5F5F5;
		
		
	}
	.img{
		width: 142upx;
		height: 114upx;
		padding-left: 304upx;
		padding-top: 207upx;
	}
	.text{
		width: 100%;
		font-size:30upx;
		font-family:PingFang SC;
		color:#333333;
		text-align: center;
	}
</style>

<template>
	<view>
		<!-- // 消费情况 -->
        <view class="chat-list" v-if="isnotempty">
			<view v-for="(item,index) in chatList" :key="index"  class="chat">
				<view class="row" >
					<view class="right">
						<!-- 用户名消费 -->
						<view class="biaoti"> 设备号：{{item.stationno}}  插座号：{{item.macid}}</view>
						
						<view class="top">
						
						
							<!-- 消费金额 -->
							<view class="time">充电金额：{{item.totalmoney}} 余额:{{ item.cardmoney}}</view>
						</view>
						
						
							<!-- 消费类型 -->
						
							
							<!-- 消费时间 -->
							<view class="tis">开始充电时间{{item.startTime}}</view>
							<view class="tis">结束充电时间{{item.endTime}}</view>
						
					</view>
				</view>
			</view>
		</view>
		<view v-else class="xia">
			
			<image class="img" src="https://xin.yiyunoto.com/uploads/static/public/emptyorder.png">
				<!-- <view class="text">暂无消费记录</view> -->
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
				current:1,
				chatList:[],
				touken: '',
			
				url: this.$store.state.cdzurl  ,//token路径
				date:{},
				num:'',
				isnotempty: false
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			this.current=1,
		        this.getdata()()
		},
		onLoad(e) {
	
		
			this.getdata();
		},
		 onReachBottom(){
		  if(this.timer != null){
		   clearTimeout(timer);
		  }
		  this.current+=20;
		
		  					
		    uni.showNavigationBarLoading()()
		  this.timer = setTimeout(this.getmore()(),500);
		 },
		methods: {
			getmore(){
			
				request.urlRequest(
					this.url,
					{
						command: "B006",
						cardno: "00600001",
						params1: this.current,
						params2: 20,
						params3:1},
					{},
					'GET',
					res => {
						let list =JSON.parse(res.data.data);
						
						if( list.length==20){
							this.loadingType=0
						}else this.loadingType=2
						uni.hideNavigationBarLoading()
						this.chatList= this.chatList.concat(list) ;
						
					}
				);
				
			}  ,
			getdata(){
			
				request.urlRequest(
					this.url,
					{
						command: "B006",
						cardno: "00600001",
						params1: this.current,
						params2: 20,
						params3:1},
					{},
					'GET',
					res => {
						
						this.chatList=JSON.parse(res.data.data) ;
						if(this.chatList.length==20){
							this.loadingType=0
						}else this.loadingType=2
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
			
			border-bottom: solid 1upx #eaeaea;
			.row{
				width: 100%;
				
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
						
						.time{
							font-size:41upx;
							font-family:PingFangSC-Regular,PingFang SC;
							color:rgba(245,139,35,1);
						}
					}
					
				}
				
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
	.tis{
		font-size:26upx;
		font-family:PingFangSC-Regular,PingFang SC;
		color:rgba(127,127,127,1);
		
		
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

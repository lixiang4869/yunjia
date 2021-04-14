<template>
	<view class="container">
		<!-- 头部 -->
		<view class="one">
			<view class="Obox">
				<view class="onea">
					<image :src="getImgUrl(toimg) " mode="" style="width:150rpx;height: 150rpx; border-radius: 50%;"></image>
				</view>
				<view class="oneb">
					<view class="oneba">
						历史抢到的金额
					</view>
					<view class="onebb">
						{{qiang}}
					</view>
				</view>
				<view class="onec">
					<view class="oneba">
						历史发出的金额
					</view>
					<view class="onebb">
						{{fatoo}}
					</view>
				</view>
			</view>

		</view>
		<!-- 中部 -->
		<view class="to">
			<view class="toa"  :class="{bj:too=='1'}" @click="aavv" >
				<text>
					抢到记录
				</text>
			</view>
			<view class="tob"  :class="{bj:too=='0'}" @click="aav">
				<text>
					发出记录
				</text>
			</view>
		</view>
		<!-- 脚步 -->
		<view class="toooa" v-if="one=='1'"v-for="(item,index) in oneaa" :key="index">
			<view class="tooo" >
				<view class="aab">
					<view class="">
						<image :src="getImgUrl(item.image_url) " style="width: 150upx;height: 170upx;padding-left: 10upx; " v-if="item.image_url.search(',')==-1"></image>
						<view v-else>
								<image :src="getImgUrl(ite) " style="width: 50upx;height: 50upx;padding-left: 10upx; " v-for ="(ite ,index) in item.image_url.split(',')"></image>
						</view>
						
					</view>
					<view class="aaab">
						<view class="aac">
						{{item.content}}
						</view>
						<view class="aacc">
							<view class="">
								<!-- 播放-->
								<image src="../../static/bao/yan.png" style="width: 30upx;height: 30upx;padding-right: 10upx;" mode=""></image>
								{{item.page_view}}
							</view>
							<view class="">
								<!-- 红包 -->
								<image src="https://xin.yiyunoto.com/uploads/static/bao/ba.png" style="width: 30upx;height: 30upx; padding-right: 10upx;" mode=""></image>
								{{item.one_money}}
							</view>
							
						</view>

					</view>
				</view>
			</view>
		</view>
		<!-- 发出jilu -->
		<view class="toooa" v-if="one=='0'" v-for="(item,index) in onee" :key="index">
			<view class="tooo">
				
				<view class="aab">
					<view class="">
						<image :src="getImgUrl(item.image_url) " style="width: 150upx;height: 170upx;padding-left: 10upx; " v-if="item.image_url.search(',')==-1"></image>
						<view v-else>
								<image :src="getImgUrl(ite) " style="width: 50upx;height:50upx;padding-left: 10upx; " v-for ="(ite ,index) in item.image_url.split(',')"></image>
						</view>	</view>
					<view class="aaab">
						<view class="aac">
							{{item.content}}
						</view>
						<view class="aacc">
							<view class="">
								<!-- 播放-->
								<image src="../../static/bao/yan.png" style="width: 30upx;height: 30upx;padding-right: 10upx;" mode=""></image>
									{{item.page_view}}
							</view>
							
							<view class="">
								<!-- 红包 -->
								<image src="https://xin.yiyunoto.com/uploads/static/bao/ba.png" style="width: 30upx;height: 30upx; padding-right: 10upx;" mode=""></image>
									{{item.like_num}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				one: '1',
				too:'1',
				fatoo:'0',
				qiang:'0',
				imgha:'',
				com:'',
				liju:'',
				hong:'',
				onee:'',
				oneaa:'',
				id:'',
				toimg:'',
				url: 'https://xin.yiyunoto.com',
			}
		},
		onLoad:function(option) {	
			var that=this;
		
			var type=2;
			// var id=295;
			var authtoken = uni.getStorageSync("authtoken");
			console.log(authtoken)
			uni.request({
				url: 'https://xin.yiyunoto.com/api/hongbao/userGetRedpackLog',
				method: 'post',
				header: { 
					authtoken:authtoken
				},
				data: {
					// redpack_id:that.id,
					type:2
				},
				success: (res) =>{
					
				that.fatoo=res.data.data.totalGiveOut;
				that.onee=res.data.data.data.data
				
				}
			});
			var authtoken = uni.getStorageSync("authtoken");
			uni.request({	
				url: 'https://xin.yiyunoto.com/api/hongbao/userGetRedpackLog',
				method: 'post',
				header: { 
						authtoken:authtoken
				},
				data: {
					redpack_id: that.id,
					type:1
				},
				success: function(res) {
				
				that.oneaa=res.data.data.data.data;
				that.qiang=res.data.data.totalReceive	
				
				}
			});
			// 获取头像
			uni.request({
				url: 'https://xin.yiyunoto.com/api/member/index',
				method: 'post',
				header: { 
						authtoken:authtoken
				},
				success: function(res) {
					if(res.data.code==1){
						that.toimg=res.data.data.meminfo.headimg
					}
				
			
				}
			});
		},
		methods:{
			getImgUrl(url){
				if(url.search('http')==-1){url="https://xin.yiyunoto.com"+url}
				return url
			},
			aavv(){
				var that=this;
				that.one='1',
				that.too='1'
			},
			aav(){
				var that=this;
				that.one='0',
				that.too='0'
			},
		}
	}
</script>

<style lang="scss" scoped>
	.grid-img{
	 
	  /**
	  宽高
	    1. 3n+1且是倒数第2张时
	    2. 3n+1且是最后一张时
	      以上两种情况图片的宽高均应为320；
	      剩余两种情况是：
	    3. 只有一张时宽高320；
	    4. 其余的情况和索引宽高都为220；
	  */
	  display: inline-block;
	  width: 50rpx;
	  height: 50px;
	  &:only-child{
	    width: 150rpx;
	    height: 150rpx;
	  }
	 
	  &:nth-child(3n+1):nth-last-child(2),
	  &:nth-child(3n+2):last-child{
	    width: 50rpx;
	    height: 50rpx;
	  }
	 
	  /**
	  间距/布局
	   */
	 
	  &:nth-child(3n+2){
	    margin: 0 6rpx;
	  }
	  &:nth-child(n+4){
	    margin-top: 6rpx;
	  }
	 
	  &:first-child{
	    border-top-left-radius: 10rpx;
	  }
	 
	  &:last-child{
	    margin-right: 0;
	    border-bottom-right-radius: 10rpx;
	  }
	 
	  /**
	  圆角
	   */
	 
	  //左下圆角：最后一行第一个
	  &:nth-child(3n+1){
	    &:last-child,
	    &:nth-last-child(2),
	    &:nth-last-child(3){
	      border-bottom-left-radius: 10rpx;
	    }
	  }
	 
	  //处理四个布局
	  //增大第二个margin讲第三个挤到下一行
	  &:nth-child(2):nth-last-child(3){
	    margin-right: 220rpx;
	  }
	  //重置第二个圆角
	  &:nth-child(2):nth-last-child(3){
	    border-top-right-radius: 10rpx;
	  }
	 
	  //重置第三个的margin和radius
	  &:nth-child(3):nth-last-child(2){
	    margin-top: 6rpx;
	    margin-right: 6rpx;
	    border-radius: 0 0 0 10rpx;
	  }
	  //重置第4个的圆角
	  &:nth-child(4):last-child{
	     border-radius: 0 0 10rpx 0;
	  }
	}
	text {
		// text-align: center;
		
	}

	.container {
		width: 100%;
		height: 100%;

		.one {
			width: 100%;
			height: 257rpx;
			background-image: url(https://xin.yiyunoto.com/uploads/static/bao/beijing.png);
			font-family: Microsoft YaHei;
			color: #FFFFFF;
			.Obox {
				padding-top: 76rpx;
				display: flex;
				justify-content: space-between;

				.onea {
					padding-left: 20rpx;
				}

				.oneb {
					padding-top: 10rpx;

					.oneba {
						font-size: 30rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: rgba(231, 244, 255, 1);
					}

					.onebb {
						padding-top: 34rpx;
						font-size: 36rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
					}
				}

				.onec {
					padding-right: 110rpx;
					padding-top: 10rpx;

					.oneba {
						font-size: 30rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: rgba(231, 244, 255, 1);
					}

					.onebb {
						padding-top: 34rpx;
						font-size: 36rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
					}
				}
			}
		}

		// 中部
		.to {
			// background-color: #D8D8D8;
			display: flex;
			justify-content: space-between;
			margin-top: 30upx;
			width: 100%;
			// height: 113rpx;
			font-size: 40rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			// color:rgba(51,51,51,1);
			background-color: #FFFFFF;
			// box-shadow: 0upx 1upx 1upx 0upx #000000 ;
	

			.toa {
				// text-align: center;
				padding-left: 120upx;
				font-size: 35upx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				width: 50%;
				margin-right: 20upx;
				padding-right: 20upx;
			}

			.tob {
				padding-left: 120upx;
				font-size: 35upx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				width: 50%;
				// padding-left: 30upx;
			}
		}
	}
.bj{
	// background-color: #DBDADA;
	color: #FE1722;
	border-bottom:3upx solid #FE1722 ;
}
	.toooa {
		// border: 5upx solid #D8D8D8;
		width: 100%;
		height: 300upx;
		margin-top: 30upx;
		border-bottom: 2upx solid #E1DFDF;
		
	}

	.tooo {
		// display:flex;
		width: 90%;
		height: 270upx;
		margin-left: 5%;
		background-color: #FFFFFF;
		padding-top: 20upx;
		color: #333333;

		.Obox {
			display: flex;
			justify-content: space-between;
			padding-left: 20upx;
			padding-right: 20upx;
			color: #333333;

			.Oboxa {
				font-size: 26upx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				// color:rgba(51,51,51,1);
				color: #333333;

			}

			.Oboxb {
				font-size: 26upx;
				font-family: DIN;
				font-weight: 400;
				// color:rgba(153,153,15)
				color: #333333;
			}
		}

		.aab {
			display: flex;
			padding-top: 20upx;

			.aaab {
				padding-left: 40upx;

				.aac {
					font-size: 28upx;
					font-family: Microsoft YaHei;
					font-weight: bold;
					color: #333333;
					// padding-right: 10upx;
					line-height: 46upx;
					height:100upx;
					overflow: hidden;
				}

				.aacc {
					width: 400upx      ;
					padding-top: 30upx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					padding-right: 25upx;
				   }
			  }

		}
	}
</style>

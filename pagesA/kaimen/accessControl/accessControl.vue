<template>
	<view class="main">
		<view>
			<Status></Status>
		</view>
		<view class="head">
			<view class="back" @tap="back">
				<image  src="https://xin.yiyunoto.com/uploads/static/open/menjin/back.png" mode="widthFix"></image>
			</view>
			<view class="navbarTitle">
				<view class="title">智慧门禁</view>
			</view>
			<view class="menjin">
				<image class="pre" src="https://xin.yiyunoto.com/uploads/static/open/menjin/back.png"></image>
				<image class="men" src="https://xin.yiyunoto.com/uploads/static/open/menjin/men.png"></image>
				<image class="next" src="https://xin.yiyunoto.com/uploads/static/open/menjin/next.png"></image>
			</view>
			<view class="addr">白庙小区东南门</view>
			<sunui-mverify @change="mverify"></sunui-mverify>
		</view>
		<view class="index_nav">
			<view class="category" @tap="navTo(1)">
				<view class="img">
					<image :src="navImg[0].img"></image>
				</view>
				<view class="text">{{navImg[0].text}}</view>
			</view>
			<view class="category" @tap="navTo(2)">
				<view class="img">
					<image :src="navImg[1].img"></image>
				</view>
				<view class="text">{{navImg[1].text}}</view>
			</view>
			<view class="category" @tap="navTo(3)">
				<view class="img">
					<image :src="navImg[2].img"></image>
				</view>
				<view class="text">{{navImg[2].text}}</view>
			</view>
		</view>
		<scroll-view class="section"  scroll-y="true"  scroll-with-animation>	
			<view class="records">
				<view class="open">
					<view class="shu"></view>
					<view class="today">今日开门记录</view>
				</view>
				<view class="details" v-for="(item,i) in list" :key="i">
					<image  src="https://xin.yiyunoto.com/uploads/static/open/menjin/person.png"></image>
					<view class="renyuan">
						<view class="name">{{item.name}}</view>
						<view class="time">
							{{item.time}} | {{item.address}}
						</view>
						<view class="xian"></view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import sunuiMverify from '@/components/sunui-mverify/sunui-mverify.vue';
	import Status from '@/components/status/status.vue'	
	export default {
		data() {
			return {			
				navImg: [
					{
						img:'https://xin.yiyunoto.com/uploads/static/open/menjin/applyKey.png',text:'申请钥匙'
					},
					{
						img:'https://xin.yiyunoto.com/uploads/static/open/menjin/keyManage.png',text:'钥匙管理'
					},
					{
						img:'https://xin.yiyunoto.com/uploads/static/open/menjin/openRecord.png',text:'开门记录'
					}
				],
				list: [
					{
						name:'管理员',time:'18:32',address:'白描小区东南门'
					},
					{
						name:'管理员',time:'18:32',address:'白描小区东南门'
					},
					{
						name:'管理员',time:'18:32',address:'白描小区东南门'
					},
					{
						name:'管理员',time:'18:32',address:'白描小区东南门'
					},
					{
						name:'管理员',time:'18:32',address:'白描小区东南门'
					},
					{
						name:'管理员',time:'18:32',address:'白描小区东南门'
					},
					{
						name:'管理员',time:'18:32',address:'白描小区东南门'
					},
					{
						name:'管理员',time:'18:32',address:'白描小区东南门'
					},
					{
						name:'管理员',time:'18:32',address:'白描小区东南门'
					},
					{
						name:'管理员',time:'18:32',address:'白描小区东南门'
					},
					{
						name:'管理员',time:'18:32',address:'白描小区东南门'
					},
					{
						name:'管理员',time:'18:32',address:'白描小区东南门'
					},
					{
						name:'管理员',time:'18:32',address:'白描小区东南门'
					}
				],
			}
		},
		components: {
			Status,sunuiMverify
		},
		methods: {
			mverify(e){
				console.log('验证结果:',e);
			},
			// nav跳转
			navTo(type){
				
				},
			back: function(){
				uni.navigateBack({
					
				});		   
			},
		},
		onLoad() {
			
		},
		computed: {
			
		},
		onShow() {
			/* 隐藏凸起图标 */
			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			setTimeout(function() {
				if(icon)
				icon.hide();
			}, 100);
			// #endif
		},
		components:{
			
		}
	};
</script>

<style lang="scss" scoped>
	.main{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: -1;
		background: #F3F3F3;
		.head{
			background: url('https://xin.yiyunoto.com/uploads/static/open/menjin/bg.png') no-repeat;
			background-size: cover;
			position: absolute;
			top:0;
			z-index: 500;
			width: 100%;
			height: 560rpx;
			display:flex;
			flex-direction:column;
			padding-top: 40rpx;
			.back{
				position: absolute;
				z-index: 999;
				margin: 60rpx auto 20rpx 30rpx;
				image{
					width:19rpx;
					height: 34rpx;
				}
			}
			.navbarTitle{
				margin-top: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				.title{
					width:148rpx;
					height:36rpx;
					font-size:36rpx;
					font-family:Microsoft YaHei;
					font-weight:bold;
					color:rgba(255,255,255,1);
				}
			}
			.menjin{
				margin-top: 60rpx;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				.pre,.next{
					width: 19rpx;
					height: 34rpx;
				}
				.men{
					margin-left: 80rpx;
					margin-right: 30rpx;
					width: 179rpx;
					height: 209rpx;
				}
			}
			.addr{
				display: flex;
				justify-content: center;
				align-items: center;
				width:36%;
				margin:30rpx 32% auto;
				height:60rpx;
				background:rgba(255,255,255,0.25);
				border-radius:30rpx;
				font-size:28rpx;
				font-family:Microsoft YaHei;
				font-weight:bold;
				color:rgba(255,255,255,1);
			}
			.btn{
				position: absolute;
				z-index: 999;
				top:540rpx;
				margin: auto 17% auto;
				width:66%;
				height:110rpx;
				background:rgba(255,255,255,1);
				box-shadow:0rpx 9rpx 10rpx 0rpx rgba(120,142,200,0.2);
				border-radius:55rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				.leftImg{
					margin-left: 20rpx;
					margin-top: 10rpx;
					image{
						width: 91rpx;
						height: 91rpx;
					}
				}
				.open{
					width:145rpx;
					font-size:36rpx;
					font-family:Microsoft YaHei;
					font-weight:bold;
					color:rgba(255,255,255,1);
					background:linear-gradient(-90deg,rgba(100,159,251,0.68) 0%, rgba(44,109,245,1) 100%);
					-webkit-background-clip:text;
					-webkit-text-fill-color:transparent;
				}
				.rightImg{
					margin-right: 60rpx;
					image{
						width: 32rpx;
						height: 40rpx;
					}
				}
			}
		}
		.index_nav {
			position: absolute;
			top: 600rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			background: #FFFFFF;
			.category {
				padding-top: 80rpx;
				width: 33%;
				height: 160rpx;
				display: flex;
				flex-wrap: wrap;
				.img {
					width: 100%;
					display: flex;
					justify-content: center;
					image {
						width:86rpx;
						height:86rpx;
					}
				}
				.text {
					width: 100%;
					display: flex;
					justify-content: center;
					height:27rpx;
					font-size:26rpx;
					font-family:Microsoft YaHei;
					font-weight:bold;
					color:rgba(51,51,51,1);
					line-height:40rpx;
				}
			}
		}
		.section{
			width: 100%;
			height: calc(100vh -400px); 
			overflow-y: auto;
			top:880rpx;
			position: absolute;
			z-index: 999;
			.records{
				width: 100%;
				background: #FFFFFF;
				// height: auto;
				padding-top: 20rpx;
				padding-bottom: 30rpx;
				.open{
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-left: 30rpx;
					margin-top: 20rpx;
					.shu{
						margin-right: 20rpx;
						width:4rpx;
						height:25rpx;
						background:rgba(63,126,247,1);
					}
					.today{
						width:184rpx;
						font-size:30rpx;
						font-family:Microsoft YaHei;
						font-weight:bold;
						color:rgba(51,51,51,1);
					}
				}
				.details{
					display: flex;
					flex-direction: row;
					margin-left: 30rpx;
					margin-top: 30rpx;
					image{
						width: 86rpx;
						height: 86rpx;
						margin-right: 20rpx;
					}
					.renyuan{
						display: flex;
						flex-direction: column;
						.name{
							margin-top:6rpx;
							width:200rpx;
							height:30rpx;
							font-size:30rpx;
							font-family:Microsoft YaHei;
							font-weight:bold;
							color:rgba(51,51,51,1);
						}
						.time{
							margin-top: 20rpx;
							width:488rpx;
							height:26rpx;
							font-size:26rpx;
							font-family:Microsoft YaHei;
							font-weight:bold;
							color:rgba(153,153,153,1);
						}
						.xian{
							margin-top: 20rpx;
							width:579rpx;
							height:1rpx;
							background:rgba(244,244,244,1);
						}
					}
				}
			}
		}
	}
</style>
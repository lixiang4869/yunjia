<template>
	<view class="main">
		<view class="nav_bar gradual_bg">
			<!-- <navBar :title="title"></navBar> -->
			<view class="nav_bar gradual_bg">
				<status></status>
				<view class="navbarTop">
					<view class="back" @tap="back">
						<image  src="../../../static/public/blackBack.png"></image>
						<view class="backText">返回</view>
					</view>
					<view class="navbarTitle">
						<view class="title">{{title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tabBar_box" :style="{top: headerTop }">
			<scroll-view class="TabBar" scroll-x="true" :scroll-into-view="topBarindex" :scroll-with-animation="true">
				<view class="grid" v-for="(item, tbIndex) in topNavList" :key="tbIndex" :id="'i'+tbIndex" @tap="showType(tbIndex,item.id)">
					<view class="text"  :class="[tbIndex == tabbarIndex  ? 'on' : '']">{{ item }}</view>
				</view>
			</scroll-view>
		</view>
		<view class="smartParking">
			<view class="parkingl">
				<image class="car1" src="https://xin.yiyunoto.com/uploads/static/open/parking/lcar.png"></image>
				<view class="park1">A6-08</view>
				<image class="car2" src="https://xin.yiyunoto.com/uploads/static/open/parking/lcar.png"></image>
				<image class="car3" src="https://xin.yiyunoto.com/uploads/static/open/parking/lcar.png"></image>
				<view class="park2">A6-11</view>
				<image class="car4" src="https://xin.yiyunoto.com/uploads/static/open/parking/lcar.png"></image>
			</view>
			<view class="parkingm">
				<view class="pp">
					<image class="m1" src="https://xin.yiyunoto.com/uploads/static/open/parking/middle.png"></image>
				</view>
				<view class="pp">
					<image src="https://xin.yiyunoto.com/uploads/static/open/parking/middle.png"></image>
				</view>
				<view class="pp">
					<image src="https://xin.yiyunoto.com/uploads/static/open/parking/middle.png"></image>
				</view>
			</view>
			<view class="parkingr">
				<image class="car1" src="https://xin.yiyunoto.com/uploads/static/open/parking/rcar.png"></image>
				<view class="park">A6-08</view>
				<image class="car2" src="https://xin.yiyunoto.com/uploads/static/open/parking/rcar.png"></image>
				<image class="car3" src="https://xin.yiyunoto.com/uploads/static/open/parking/rcar.png"></image>
				<image class="car4" src="https://xin.yiyunoto.com/uploads/static/open/parking/rcar.png"></image>
				<image class="car5" src="https://xin.yiyunoto.com/uploads/static/open/parking/rcar.png"></image>
			</view>
		</view>
		<view class="foot">
			<view class="footer">
				<view class="fl">
					<view class="flTop">
						<view>A6-02</view>
					</view>
					<view class="flBottom">
						<image src="https://xin.yiyunoto.com/uploads/static/open/parking/weizhi.png"></image>
						<view>320rpx</view>
					</view>
				</view>
				<view class="fr">
					<view class="frTop">
						<view class="price">￥30</view>
						<view>/小时</view>
					</view>
					<view class="frBottom">
						<image src="https://xin.yiyunoto.com/uploads/static/open/parking/time.png"></image>
						<view>共享结束时间-20:00</view>
					</view>
				</view>
			</view>
			<view class="btn">立即预定</view>
		</view>
	</view>
</template>
<script>
	import status from "@/components/status/status.vue"
	export default {
		components: {
			status
		},
		computed:{
			
		},
		data() {
			return {
				title:"智慧停车",
				topNavList:['A-06','A-09','A-11','B-02','B-10','C-11','D-12'],
				// 顶部所需开始
				headerTop: '0px', //顶部定位的距离
				topBarindex: 'i0', // 顶部定位id
				tabbarIndex: 0,// tabbar,显示控制 
				// 顶部所需结束
				
				// 页面数据
				listData: [],
				total:'',
				pageNum: 1,
				listName:'',
			};
		},
		mounted:function(){
			
		},
		methods: {
			back(){
				uni.navigateBack({
				    
				});
			},
			getList(){},
			getType(){},
			showType(tbIndex,id) {
				// 公益项目点击
				this.tabbarIndex =tbIndex;
				this.topBarindex = 'i'+tbIndex;
				this.listName=id;
				this.getType(id);
			},
		},
		onPullDownRefresh() {
			this.tabbarIndex = false;
			this.pageNum =1 ;
			this.getList();
		},
		onLoad(e) {
			this.getList();
			this.getType(2);
			// 设置顶部标题
			uni.setNavigationBarTitle({
				title: e.name
			})
			//兼容H5下排序栏位置
			// #ifdef H5
			let Timer = setInterval(() => {
				let uniHead = document.getElementsByTagName('uni-page-head');
				if (uniHead.length > 0) {
					this.headerTop = uniHead[0].offsetHeight + 'px';
					clearInterval(Timer); //清除定时器
				}
			}, 1);
			// #endif
		},
		onReachBottom() {
			if(this.total == this.listData.length){
				uni.showToast({
					title: '',
					icon: 'none'
				})
			}else{
				if(this.tabbarIndex===false){
					this.pageNum++;
					this.getList(this.pageNum);
				}else {
					this.pageNum++;
					this.getType(this.listName,this.pageNum);
				}
			}
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
		computed: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		width: 100%;
		height: 100%;
		overflow: auto;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #F8F9FB;
		z-index: -1;
		.nav_bar{
			background: #FFFFFF;
			.navbarTop{
				position: fixed;
				background: #FFFFFF;
				left: 0;
				z-index: 999;
				width: 100%;
				height: 100rpx;
				padding-top: 20rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				color:rgba(51,51,51,1);
				.back{
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					image{
						margin:auto 20rpx auto 20rpx;
						width:32rpx;
						height: 32rpx;
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
		.tabBar_box {
			margin-top: 100rpx;
			width: 100%;
			display: flex;
			.TabBar {
				width: 100%;
				background-color: #FFFFFF;
				height: 80rpx;
				white-space: nowrap;
				.grid {
					padding: 0 10rpx;
					height: 80rpx;
					display: inline-block;
					font-size: 34rpx;
					.text {
						width:100rpx;
						height:76rpx;
						font-size:30rpx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(51,51,51,1);
						display: flex;
						justify-content: center;
						align-items: center;
						&.on {
							color: #0081FF;
							border-bottom:6rpx solid  #0081FF;
						}
					}
				}
			}
		}
		.smartParking{
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			position: absolute;
			top:252rpx;
			left: 0;
			right: 0;
			.parkingl{
				width: 296rpx;
				height: 860rpx;
				background: url('https://xin.yiyunoto.com/uploads/static/open/parking/left.png') no-repeat;
				background-size: 100% 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.park1{
					margin-left: 40rpx;
					position: absolute;
					top:228rpx;
					width:211rpx;
					height:85rpx;
					border:1px solid rgba(0,129,255,1);
					border-radius:13rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size:30rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(0,129,255,1);
				}
				.park2{
					margin-left: 40rpx;
					position: absolute;
					top:560rpx;
					width:211rpx;
					height:80rpx;
					border:1px solid rgba(0,129,255,1);
					border-radius:13rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size:30rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(0,129,255,1);
				}
				image{
					margin-left: 40rpx;
					margin-top: 30rpx;
					width: 193rpx;
					height: 83rpx;
				}
				.car1{
					position: absolute;
					top:90rpx;
				}
				.car2{
					position: absolute;
					top:316rpx;
				}
				.car3{
					position: absolute;
					top:420rpx;
				}
				.car4{
					position: absolute;
					top:636rpx;
				}
			}
			.parkingm{
				width: 212rpx;
				height: 860rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.pp{
					margin-left: 84.5rpx;
					margin-top: 100rpx;
					width:100%;
					height: 220rpx;
					image{
						width: 43rpx;
						height: 50rpx;
					}
				}
			}
			.parkingr{
				width: 296rpx;
				height: 860rpx;
				background: url('https://xin.yiyunoto.com/uploads/static/open/parking/right.png') no-repeat;
				background-size: 100% 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.park{
					position: absolute;
					top:222rpx;
					margin-left: 50rpx;
					width:211rpx;
					height:85rpx;
					background:rgba(0,129,255,1);
					border:1rpx solid rgba(0,129,255,1);
					border-radius:13rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size:30rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(255,255,255,1);
				}
				image{
					margin-left: 50rpx;
					width: 193rpx;
					height: 83rpx;
				}
				.car1{
					position: absolute;
					top:110rpx;
				}
				.car2{
					position: absolute;
					top:336rpx;
				}
				.car3{
					position: absolute;
					top:440rpx;
				}
				.car4{
					position: absolute;
					top:550rpx;
				}
				.car5{
					position: absolute;
					top:660rpx;
				}
			}
		}
		.foot{
			position: absolute;
			bottom: 0;
			display: flex;
			flex-direction: column;
			width:100%;
			height:200rpx;
			background:rgba(255,255,255,1);
			border-radius:27rpx 27rpx 0rpx 0rpx;
			.footer{
				width:100%;
				height:130rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				.fl{
					margin-left: 30rpx;
					display: flex;
					flex-direction: column;
					.flTop{
						font-size:40rpx;
						font-family:Microsoft YaHei;
						font-weight:bold;
						color:rgba(51,51,51,1);
					}
					.flBottom{
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-top: 10rpx;
						font-size:30rpx;
						font-family:Microsoft YaHei;
						font-weight:400;
						color:rgba(51,51,51,1);
						image{
							margin-right: 10rpx;
							width: 28rpx;
							height: 33rpx;
						}
					}
				}
				.fr{
					margin-right: 30rpx;
					display: flex;
					flex-direction: column;
					.frTop{
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: flex-end;
						font-size:30rpx;
						font-family:Microsoft YaHei;
						font-weight:400;
						color:#333333;
						.price{
							color: #0081FF;
						}
					}
					.frBottom{
						margin-top: 10rpx;
						display: flex;
						flex-direction: row;
						align-items: center;
						font-size:30rpx;
						font-family:Microsoft YaHei;
						font-weight:400;
						color:rgba(51,51,51,1);
						image{
							margin-right: 10rpx;
							width: 32rpx;
							height: 32rpx;
						}
					}
				}
			}
			.btn{
				margin: 10rpx 3% auto;
				width:94%;
				height:70rpx;
				line-height: 70rpx;
				text-align: center;
				background:rgba(0,129,255,1);
				border-radius:30rpx;
				font-size:32rpx;
				font-family:Microsoft YaHei;
				font-weight:bold;
				color:rgba(255,255,255,1);
			}
		}
	}
</style>

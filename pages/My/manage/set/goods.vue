<template>
	<view class="content" :style="{width:width+'px',height:height+'px'}">
		<view style="display: flex;flex-direction: row;width: 100%;justify-content: space-around;margin-bottom: 20rpx;">
			<view class="t" v-for="(item,index) in list" :key="index" @click="select(index)">

				<view :class="[i==index?'selectTitle':'unSelectTitle']">{{item.title}}</view>
				<image :class="[i==index?'showImg':'unshowImg']" src="../../../../static/my/xia.png" style="width: 40rpx;height: 10rpx;margin-top: 13rpx;"></image>

			</view>
		</view>
		<view  class="list">
			<scroll-view class="left" :scroll-y="true">
				<view class="left-item" v-for="(item,index) in list" :key="index">
					{{item.title}}
				</view>
			</scroll-view>
			<scroll-view class="right" :scroll-y="true"> 
			</scroll-view>
		</view>
		<view class="footer">
			<view class="footerItem">
				<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/fenlei.png" class="img"></image>
				<view class="cate">管理分类</view>
			</view>
			<view class="footerItem">
				<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/paixu.png" class="img"></image>
				<view class="cate">排序&批量</view>
			</view>
			<view class="footerItem" style="margin-right: 20rpx;">
				<image src="https://xin.yiyunoto.com/uploads/static/shopcenter/add.png" class="img"></image>
				<view class="cate" >新建商品</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				i: 0,
				list: [{
						title: '全部'
					},
					{
						title: '已下架'
					},
					{
						title: '售卖中'
					},
					{
						title: '已售完'
					}
				],
				width:'',
				height:''
			}
		},
		onLoad() {
			let {windowWidth,windowHeight} = uni.getSystemInfoSync();
			this.width = windowWidth;
			this.height = windowHeight;
		},
		methods: {
			select(index) {
				this.i = index
			}
		}
	}
</script>

<style>
	.left-item{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 28rpx;
		color: #666666;
		
	}
	.left{
		width: 150rpx;
	}
	.right{
		flex: 1;
	}
	.cate{
		
		margin-left: 20rpx;
		font-size: 29rpx;
		color: #333333;
	}
	.img{
		margin-left: 30rpx;
		width: 38rpx;height: 38rpx;
	}
	.list{
		width: 100%;
		display: flex;
		flex-direction: row;
		flex: 1;
	}
	.footer{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 100rpx;
		/* position: fixed;
		bottom: 0;
		left: 0; */
		width: 100%;
	}
	.footerItem{
		
		display: flex;
		flex-direction: row;
		
	}
	.showImg {
		width: 40rpx;
		height: 10rpx;
		margin-top: 13rpx;
		opacity: 1;
	}

	.unshowImg {
		width: 40rpx;
		height: 10rpx;
		margin-top: 13rpx;
		opacity: 0;
	}

	.content {
		
		display: flex;
		flex-direction: column;
	}

	.t {
		display: flex;

		margin-right: 50rpx;


		align-items: center;
		justify-content: center;
		flex-direction: column;

	}

	.selectTitle {
		font-size: 36rpx;
		font-weight: 600;
		color: #333333;
	}

	.unSelectTitle {
		font-size: 36rpx;
		font-weight: 600;
		color: #999999;
	}
</style>

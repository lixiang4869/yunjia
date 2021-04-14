<template name='sunui-mverify'>
	<view class="btn">
		<view class="leftImg"  :style="{left:-(w + 100)+'rpx',transform:cssAnimation}">
			<image  src="https://xin.yiyunoto.com/uploads/static/open/menjin/go.png" mode="widthFix"  :style="{justifyContent: verLocation}" @touchmove='moveStart' @touchend='moveEnd'></image>
		</view>
		<view class="open">{{succeedMsg}}</view>
		<view class="rightImg">
			<image  src="https://xin.yiyunoto.com/uploads/static/open/menjin/password.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hint: '右滑验证',
				sysW: uni.getSystemInfoSync().windowWidth,
				xAxial: 0,
				x: 0,
				w: (uni.getSystemInfoSync().windowWidth * 0.8) - 120,
				cssAnimation: 'translate3d(0, 0, 0)',
				succeedMsg: '滑动开门',
				pullStatus: true,
				isVerify: false,
				verLocation: 'center'
			}
		},
		name: 'sunui-mverify',
		methods: {
			moveStart(e) {
				if (this.pullStatus) {
					this.x = e.changedTouches[0].clientX - ((this.sysW * 0.1) +120);
					this.x >= this.w ? this.xAxial = this.w : this.xAxial = this.x;
					if (this.x < 25) this.xAxial = 0;
					this.cssAnimation = 'translate3d(' + this.xAxial + 'px, 0, 0)';
					this.cssAnimation = this.cssAnimation

					this.succeedMsg = '验证中...';
				}
			},
			moveEnd() {
				let tag;
				if (this.x >= this.w) {
					this.xAxial = this.w;
					this.succeedMsg = '验证成功';
					tag = true;
					this.pullStatus = false;
					this.isVerify = true;

				} else {
					this.xAxial = 0;
					this.succeedMsg = '';
					tag = false;
					this.isVerify = false;

				}
				this.$emit('change', {
					msg: tag
				});
				this.cssAnimation = 'translate3d(' + this.xAxial + 'px, 0, 0)';
				this.succeedMsg = this.succeedMsg;
				this.cssAnimation = this.cssAnimation;
			}
		}
	}
</script>

<style lang="scss">
	@import url("iconfont");
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
	.sunui-slider {
		position: relative;
		overflow: hidden;
		width: 602rpx;
		height: 110rpx;
		line-height: 110rpx;
		margin: 0 auto;
		border-radius: 55rpx;
		box-shadow: 0rpx 0rpx 4rpx rgba(0, 0, 0, .1);
		font-size: 32rpx;
		text-align: center;
		background-color: #F0AD4E;
	}

	.sunui-slider-bg {
		position: absolute;
		overflow: hidden;
		top: 0;
		width: 101%;
		height: 110rpx;
		line-height: 110rpx;
		background-color: #7BBB55;
		border-radius: 55rpx;
		color: #fff;
	}

	.sunui-slider-box {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		/* margin-top: 10rpx; */
		height:90rpx;
		width: 90px;
		/* background-color: #EBEBEB; */
		// background: url('https://xin.yiyunoto.com/uploads/static/open/menjin/go.png') no-repeat;
		background-size: 100% 100%;
	}
</style>
<template>
	    <view>
			
	        <image style="width: 750rpx;" mode="widthFix" :src="src"></image>
	    </view>
</template>

<script>
	export default {
		data() {
			return {
				src:"https://xin.yiyunoto.com/area.png",
				title:"合伙人协议"
			}
		},
		onLoad(e) {
			if(e.src)
			this.src=e.src;
			this.title=e.title;
			
			uni.setNavigationBarTitle({
				title:this.title
			})
			
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
			// this.getBalance();
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

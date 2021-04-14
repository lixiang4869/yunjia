<template>
	    <view>
			
	        <web-view  :src="src"></web-view>
	    </view>
</template>

<script>
	export default {
		data() {
			return {
				src:"https://xin.yiyunoto.com/preview/xieyi.html",
				title:"用户协议"
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

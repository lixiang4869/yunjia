<template>
	    <view>
			
	        <web-view  :src="src" style="font-size: 30rpx;"></web-view>
	    </view>
</template>

<script>
	import request from "../../../store/http.js"
	export default {
		data() {
			return {
				src:"https://wx.xkl-kj.com/index/henan/detail.html",
				title:"体检报告",
				phone:""
			}
		},
		onLoad(e) {
			this.phone=e.phone;
			console.log("this.phone",this.phone)
			this.src=this.src+"?phone="+this.phone
			// this.getData();
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
			
		}
		
	}
</script>

<style>

</style>

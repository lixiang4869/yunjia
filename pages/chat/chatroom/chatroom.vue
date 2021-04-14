<template>
	<view>
		<chat ref="chat" :username="username" chatType="singleChat"></chat>
	</view>
</template>

<script>
	import chat from "@/comps/chat/chat.vue";
	let disp = require("../../../utils/broadcast");
	
	
	export default {
		components: {
			chat
		},
		data() {
			return {
				username: {
					your: "",
				},
			}
		},
		onLoad(options) {
			let username = JSON.parse(options.username);
			this.username = username;
			uni.setNavigationBarTitle({
				title: "客服"
				// title: username.your
			});
		},
		onUnload() {
			disp.fire("em.chatroom.leave");
		},
		onPullDownRefresh() {
			uni.showNavigationBarLoading();
			//这里触发chat组件的getMore方法 --xyliu
			console.log("onPullDownRefresh")
			this.$refs.chat.getMore();
			// 停止下拉动作
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		methods: {
			
		}
	}
</script>

<style>
page{
	background-color: #FAFAFA;
}
</style>

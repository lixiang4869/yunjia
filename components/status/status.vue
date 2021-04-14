<template>
	<view class="status_bar">
	    <view class="top_view"></view>  
	</view>        
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.status_bar {  
	    height: var(--status-bar-height);  
	    width: 100%;  
	    /* background-color: #518DF1;  */
	}  
	.top_view {  
	    height: var(--status-bar-height);  
	    width: 100%;  
	    position: fixed;  
	    /* background-color: #518DF1;  */
	    top: 0;  
	    z-index: 999;
	} 
</style>

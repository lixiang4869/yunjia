<template>
	<view>
		<lee-logistics :no="id" v-if="id"/>
	</view>
</template>

<script>
	import LeeLogistics from '@/components/lee-logistics/lee-logistics.vue'
	
	export default {
		 components: { LeeLogistics },
		data() {
			return {
				id:null
				
			}
		},
		
		onLoad(e) {
			this.id=e.id;
			
			console.log(this.id);
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

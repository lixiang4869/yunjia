<template>
		<scroll-view :scroll-y="true" class="box"
		  :style="{width:width,height:height}" 
		  :enable-flex="true">
			<view v-if="attentionList.length >= 1" class="item" v-for="(item,index) in attentionList" :key="index" @click="go_live(item.id,item.streamname)">
				<image style="width: 350upx;height: 581upx;" :src="url+item.img"></image>
				<view class="liveStateBox">
					<view style="width: 10upx;height: 10upx;border-radius: 5upx;background-color: #0086F9;"></view>
					<text style="color: #0086F9;font-size: 19.5upx;margin-left: 20upx;">{{item.living?'直播中':'未直播'}}</text>
				</view>
				<image class="head" :src="url+item.headimg" mode=""></image>
			</view>
			<view class="hint" :style="{width:width,height:height}" v-if="attentionList.length < 1">
				<text class="hintTxt" v-if="authtoken == ''">当前未登录</text>
				<text class="hintTxt" v-if="authtoken != ''">当前未关注主播</text>
			</view>
		</scroll-view>
</template>

<script>
	export default {
		props:{
			refreshId:{
				type:Number,
				default:2
			}
		},
		data() {
			return {
				width:'',
				height:'',
				attentionList:[],
				url:this.$store.state.url,
				page:1,
				triggered: false,
				authtoken:uni.getStorageSync('authtoken'),
				
				toView:'',//回到顶部id
				currentTab: 0, //sweiper所在页
				isRefresh:false
			}
		},
		methods: {
			getVideoXY(){
				let res = uni.getSystemInfoSync()
				this.width = res.windowWidth+'px';
				this.height = res.windowHeight+'px';
			},
			// 获得用户关注的主播
			getAttentionInfo(){
				let _this = this;
				var token = _this.authtoken;
				uni.request({
					url:_this.url+'/api/liveapi/mykeep',
					method:'POST',
					header:{
						authtoken:token
					},
					data:{
						page:_this.page
					},
					success(res) {
						console.log(res);
						_this.attentionList = res.data.data.list;
						_this.isRefresh = false;
					}
				})
			},
			go_live(id,streamname){
				uni.navigateTo({
					url:'./laVideo?id='+id+'&streamname='+streamname
				})
			}
		},
		created() {
			this.getVideoXY();
		},
		watch:{
			refreshId(newVal,oldVal){
				console.log(newVal)
				this.isRefresh = true;
				if(this.refreshId == 0 && this.isRefresh){
					this.getAttentionInfo();
				}
			}
		}
	}
</script>

<style>
	.box{
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.item{
		width: 350upx;
		height: 624upx;
		border-radius: 10upx;
		position: relative;
		margin-top: 15upx;
		margin-left: 20upx;
	}
	.liveStateBox{
		width: 119upx;
		height: 31upx;
		background-color: rgba(0,134,249,0.4);
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: absolute;bottom: 0;
	}
	.head{
		width: 82upx;
		height: 82upx;
		border-radius: 41upx;
		position: absolute;
		bottom: 0upx;
		right: 0;
	}
	.hint{
		width: 100%;
		height: 100%;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.hintTxt{
		font-size: 26upx;
		color: #999999;
	}
</style>

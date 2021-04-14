<template>
	<view class="commentBox" :style="{width:width+'px',height:height*0.9+'px'}" @click.stop="closeComment">
		<view class="commentContent" :style="{width:width+'px',height:height*0.9*0.6+'px'}">
			<view class="nav" :style="{width:width+'px',height:height*0.9*0.6*0.1*0.8+'px'}">
				<view class="closeCommentBox"></view>
				<text class="commentNum">{{num}}条评论</text>
				<image class="closeCommentBox" src="../../static/close.png" @click="closeComment"></image>
			</view>
			<scroll-view class="commentScroll" :scroll-y="true" :style="{width:width+'px',height:height*0.9*0.6*0.75+'px'}">
				<view class="commentItem" v-for="(item,index) in commentArr" :key="index">
					<image class="header" :src="getImgUrl(item.headimg) "></image>
					<view class="commentText" :style="{width:width*0.7+'px'}">
						<text class="commentNickname">{{item.nickname}}</text>
						<view style="display: flex;flex-direction: row; flex-wrap: wrap;align-items: center;">
							<text class="commentMsg">{{item.message}}</text>
							<text style="font-size: 20upx;color: #ccc;margin-left: 10rpx;">     {{item.send_time}}</text>
						</view>
					</view>
					<view style="width: 80upx;height: 80upx;margin: 0 20upx;"></view>
				</view>
			</scroll-view>
			<view @click.stop="" class="inpBox" :style="{width:width+'px',height:height*0.9*0.6*0.1+'px'}">
				<input type="text" class="inp" confirm-type="发送" :adjust-position="false" v-model="msg" placeholder="留下你的精彩评论吧"
				  :style="{width:width*0.75+'px',height:height*0.9*0.6*0.1*0.8+'px'}" />
				<view class="btn" :style="{width:width*0.2+'px',height:height*0.9*0.6*0.1*0.8+'px'}" @click.stop="sendMsg">
					<image class="sendBtn" src="../../static/video/sendMsg.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import util from "../../common/util.js"
	// var getImgUrl = util.getImgUrl;
	export default {
		props:{
			oid:{
				type:Number,
				default:0
			},
			authtoken:{
				type:String,
				default:''
			},
			url:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				width:'',
				height:'',
				msg:'',
				commentArr:[],
				num:0
			};
		},
		created() {
			this.getCommentInfo();
			this.getFacilitySize();
		},
		methods:{
			 getImgUrl(url){
				 if(!url)return ""
				if(url.search('http')==-1){url="https://xin.yiyunoto.com"+url}
				return url
			},
			getFacilitySize(){
				const { windowWidth, windowHeight } = uni.getSystemInfoSync();
				this.width = windowWidth;
				this.height = windowHeight;
			},
			closeComment(){
				this.$emit('commentClose',false);
			},
			getCommentInfo(){
				let _this = this;
				uni.request({
					url:this.url+'/api/video/list_message',
					method:'POST',
					data:{
						oid:this.oid
					},
					success(res) {
						var obj = res.data.data;
						var date = new Date().getDate();
						var hours = new Date().getHours();
						var minutes = new Date().getMinutes();
						
						for(var i=0;i<obj.list.length;i++){
							var d = new Date(obj.list[i].send_time*1000).getDate();
							var h = new Date(obj.list[i].send_time*1000).getHours();
							var m = new Date(obj.list[i].send_time*1000).getMinutes();
							if(date < d){
								obj.list[i].send_time = d-date+'天前';
							}else if(hours < h){
								obj.list[i].send_time = h-hours+'小时前';
							}else if(minutes < m){
								obj.list[i].send_time = m-minutes+'分钟前';
							}else if(minutes == m){
								obj.list[i].send_time = '刚刚';
							}
						}
						_this.commentArr = obj.list;
						_this.num = obj.total;
						console.log(res);
					}
				})
			},
			sendMsg(){
				var that = this;
				uni.request({
					url:this.url+'/api/video/send_message',
					method:"POST",
					header:{
						authtoken:this.authtoken
					},
					data:{
						oid:this.oid,
						message:this.msg
					},
					success(res) {
						that.getCommentInfo();
						that.msg = ''
						uni.showToast({
							icon:'none',
							title:'评论成功'
						})
						// console.log(res);
					}
				})
			}
		}
	}
</script>

<style>
.commentBox{
	position: absolute;
	/* #ifdef MP||H5 */
	bottom: 14upx;
	/* #endif */
	/* #ifndef MP||H5 */
	bottom: 0upx;
	/* #endif */
}
.commentContent{
	background-color: #FFFFFF;
	border-top-left-radius: 30upx;
	border-top-right-radius: 30upx;
	position: absolute;
	bottom: 0;
}
.nav{
	/* #ifndef APP-PLUS */
	display: flex;
	box-sizing: border-box;
	/* #endif */
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 20upx;
}
.commentNum{
	font-size: 23upx;
	color: #000;
}
.closeCommentBox{
	width: 50upx;
	height: 50upx;
}
.commentItem{
	height: 150upx;
	/* #ifndef APP-PLUS */
	display: flex;
	/* #endif */
	flex-direction: row;
	justify-content: space-between;
}
.header{
	width: 80upx;
	height: 80upx;
	border-radius: 40upx;
	margin: 0 20upx;
}
.commentNickname{
	font-size: 26upx;
	color: #000000;
	font-weight: 600;
}
.commentMsg{
	font-size: 27upx;
	color: #111111;
	font-weight: 500;
}
.inpBox{
	/* #ifndef APP-PLUS-NVUE */
	display: flex;
	box-sizing: border-box;
	/* #endif */
	padding: 0 10upx;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0upx -3upx 0upx 0upx #ececec;
}
.inp{
	background-color: #FFFFFF;
	font-size: 26upx;
	color: #999;
}
.btn{
	/* #ifndef APP-PLUS */
	display: flex;
	/* #endif */
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: #d9e5fa;
	border-radius: 40upx;
}
.sendBtn{
	width: 50upx;
	height: 50upx;
}
</style>

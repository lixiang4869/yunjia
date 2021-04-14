<template>
	<view class="box" :style="{width:width,height:height}">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="nav">
			<image @click="backPage" style="width: 36upx;height: 36upx;" src="../../static/public/blackBack.png"></image>
			<text style="font-size: 36upx;color: #333;font-weight: 600;">开始直播</text>
			<view></view>
		</view>
		<!-- 选择图片和设置标题模块 -->
		<view class="setImgBox">
			<view class="cameraBtnBox" @click="searchImg">
				<image class="previewImg" v-if="setImgPath" mode="aspectFit" :src="setImgPath"></image>
				<image class="camera" v-if="!setImgPath" src="../../static/video/camera.png" mode="aspectFit"></image>
				<text v-if="!setImgPath" class="cameraTxt">上传封面图</text>
			</view>
			<text class="hint">封面违规不会通过的哦</text>
			<view class="titleBox">
				<input class="titleTxt" type="text" 
				  :disabled="!inpFocus" :focus="inpFocus" 
				  :adjust-position="inpDisabled"
				  placeholder="请输入直播标题"
				  confirm-type="done" v-model="title"></input>
				<image class="edit" src="../../static/video/edit.png" @click="isDisabled"></image>
			</view>
		</view>
		
		<!-- 选择商品模块 -->
		<view class="selectShopBox">
			<text class="selectTiele">选择商品</text>
			<view class="cameraShopBox">
				<view class="notShop" v-if="dataInfo.length == 0">
					<text class="notShopTxt">暂无商品，请选择</text>
				</view>
				<view class="cameraShopItem" v-for="(item,index) in dataInfo" :key="index">
					<image class="shopImg" :src="'http://xin.yiyunoto.com'+item.img" mode=""></image>
					<view class="shopInfoBox">
						<text class="shopTitle">{{item.name}}</text>
						<view class="dele" @click="deleShopItem($event,index)">
							<image class="deleImg" src="../../static/video/deleImg.png"></image>
							<text class="deleTxt">删除</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 更多商品按钮 -->
			<view class="selectShopBtn" @click="shadeShowOrHide">
				<text>更多商品</text>
				<image class="doubArrows" src="../../static/video/doubleArrows.png"></image>
			</view>
			<!-- 开始直播按钮 -->
			<view class="startLive" @click="myMain">
				<image class="startBtnBg" src="../../static/video/startLiveBtnBg.png"></image>
				<text class="startBtnTxt">开始直播</text>
			</view>
		</view>
		
		<!-- 更多商品模块 -->
		<view class="moreShopBox" :style="{width:width,height:height}" v-show="shadeShow" @click="shadeShowOrHide">
			<view class="MoreShopView" @click.stop="clickMsg">
				<scroll-view class="moreShopBoxScroll" :scroll-y="true">
					<view class="SelectShopItem" v-for="(item,index) in shopData" :key="index" @click="selectShop(index)">
						<image class="SelectShopImg" :src="'http://xin.yiyunoto.com'+item.img"></image>
						<view class="SelectShopInfoBox">
							<text class="SelectShopInfoTitle">{{item.name}}</text>
							<view class="SelectShopInfoAdd">
								<image class="SelectShopInfoAddImg" src="../../static/video/shopAdd.png"></image>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../store/http.js'
	export default{
		data(){
			return{
				authtoken:'',
				width:'',
				height:'',
				inpDisabled:true,
				inpFocus:false,
				setImgPath:'',
				dataInfo:[],
				shadeShow: false,
				shopData:[],
				title:'',
				url: this.$store.state.url
			}
		},
		onLoad(options) {
			console.log(options);
			this.authtoken = options.authtoken;
			this.getVideoXY();
			this.getShopData();
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
		},
		onHide() {
			console.log("页面卸载")
		},
		methods:{
			// 获取视口宽高
			getVideoXY(){
				let res = uni.getSystemInfoSync();
				console.log(res)
				this.width = res.windowWidth+'px';
				this.height = res.windowHeight+'px';
			},
			// 返回上一页
			backPage(){
				uni.navigateBack({
					delta:1
				})
			},
			// 是否可编辑
			isDisabled(){
				this.inpDisabled = !this.inpDisabled;
				this.inpFocus = !this.inpFocus
			},
			// 选择图片事件 
			searchImg(){
				var that = this;
				uni.chooseImage({
					count:1,
					success: function(res) {
						var path = res.tempFilePaths;
						that.setImgPath = path[0];
					}
				})
			},
			// 开始直播事件
			async toStartLive(){
				return new Promise((resolve,reject)=>{
					var that = this;
					if(that.title==''){
						uni.showToast({
							icon:'none',
							title:'请输入标题'
						})
						that.isDisabled();
						return;
					}else if(that.setImgPath==''){
						uni.showToast({
							icon:'none',
							title:'请上传封面图'
						})
						that.searchImg();
						return;
					}
					uni.uploadFile({
					    url: that.url+'/api/liveapi/uploadImg',
					    filePath: that.setImgPath,
					    name: 'file',
					    success: (uploadFileRes) => {
							var imgUrl = JSON.parse(uploadFileRes.data).data;
							var arr = [];
							for(var i=0;i<that.dataInfo.length;i++){
								arr.push(that.dataInfo[i].id);
							}
							var str = arr.toString();
							resolve({imgUrl,str})
					    },
						fail:(err)=>{
							console.log(err)
						}
					})
				})
			},
			async getStrname(str,imgUrl){
				return new Promise((resolve,reject)=>{
					var that = this;
					uni.request({
						url:that.url + "/api/liveapi/save_room",
						// url:that.url + "/api/Video/collect1",
						method:"POST",
						header:{
							authtoken: that.authtoken
						},
						data:{
							title:that.title,
							tag:'',
							good_id:str,
							img:imgUrl
						},
						success(res) {
							resolve(res)
						}
					})
				})
			},
			async myMain(){
				var str = '',imgUrl = 'asdfasdfasd'
				await this.toStartLive().then(res=>{
					str = res.str;
					imgUrl = res.imgUrl;
				})
				await this.getStrname(str,imgUrl).then(data=>{
					uni.navigateTo({
						url:'./tuiVideo?streaname='+data.data.data.streamname+'&authtoken='+this.authtoken+'&start=1'
					})
				})
			},
			// 删除事件
			deleShopItem(event,index){
				this.shopData.push(this.dataInfo[index]);
				this.dataInfo.splice(index,1);
			},
			// 更多商品按钮 [隐藏或显示遮罩层]
			shadeShowOrHide(){
				this.shadeShow = !this.shadeShow;
			},
			clickMsg(){},
			// 获取商品信息
			getShopData(){
				var that = this;
				let token = uni.getStorageSync("authtoken")
				uni.request({
					url:'https://xin.yiyunoto.com/api/liveapi/shop_good',
					method:'GET',
					header:{
						authtoken:token
					},
					success(res) {
						console.log(res)
						for(var i=0;i<res.data.data.length;i++){
							that.shopData.push({img:res.data.data[i].img,id:res.data.data[i].id,name:res.data.data[i].name})
						}
					}
				})
			},
			// 选择添加商品
			selectShop(index){
				this.dataInfo.push(this.shopData[index])
				this.shopData.splice(index,1);
				if(this.shopData.length == 0){
					this.shadeShow = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		position: relative;
		font-family: MicrosoftYaHei;
	}
	/* 去掉刘海 */
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		padding: 10upx 0upx;
	}
	.nav{
		width: 100%;
		height: 50upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0upx 20upx;
		box-sizing: border-box;
	}
	/* 添加封面 */
	.setImgBox{
		width: 100%;
		height: 280upx;
	}
	.cameraBtnBox{
		width: 210upx;
		height: 210upx;
		margin-top: 15upx;
		margin-left: 15upx;
		background-color: #F4F4F4;
		position: relative;
		border-radius: 11upx;
	}
	.camera{
		width: 54upx;
		height: 54upx;
		position: absolute;
		top: 46%;margin-top: -27upx;
		left: 50%;margin-left: -27upx;
	}
	.cameraTxt{
		display: inline-block;
		width: 100%;
		font-size: 30upx;
		color: #999;
		text-align: center;
		position: absolute;
		bottom: 20%;
	}
	.previewImg{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;bottom: 0;
	}
	.hint{
		color: #999;
		font-size: 26upx;
		margin-left: 15upx;
	}
	.titleBox{
		width: 485upx;
		position: absolute;
		top: 150upx;right: 15upx;
		display: flex;
	}
	.titleTxt{
		width: 70%;
		font-size: 32upx;
	}
	.edit{
		width: 40upx;
		height: 40upx;
		margin-left: 64upx;
		/* #ifndef H5||MP */
		margin-top: 18upx;
		/* #endif */
	}
	
	/* 选择商品模块 */
	.selectShopBox{
		width: 100%;
		height: 70%;
		position: absolute;
		bottom: 0;
		padding: 15upx;
		box-sizing: border-box;
	}
	.selectTiele{
		color: #333;
		font-size: 32upx;
		margin-left: 15upx;
	}
	
	.cameraShopBox{
		width: 100%;
		max-height: 65%;
		margin-top: 15upx;
		overflow: auto;
	}
	.cameraShopItem{
		width: 100%;
		height: 200upx;
		padding: 15upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.shopInfoBox{
		width: 68%;
		height: 100%;
	}
	.shopImg{
		width: 210upx;
		height: 140upx;
		margin-top: 15upx;
	}
	.shopTitle{
		width: 473upx;
		height: 80upx;
		display: inline-block;
		font-size: 30upx;
		color: #333;
		margin-top: 15upx;
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2; /** 显示的行数 **/
	}
	.dele{
		width: 110upx;
		height: 44upx;
		font-size: 23upx;
		color: #0081FF;
		line-height: 44upx;
		margin-top: 20upx;
		margin-left: 75%;
	}
	.deleImg{
		width: 25upx;
		height: 25upx;
		margin-right: 30upx;
	}
	
	.notShop{
		width: 100%;
		height: 200upx;
		background-color: #dfdfdf;
	}
	.notShopTxt{
		width: 100%;
		height: 100%;
		display: inline-block;
		color: #a3a3a3;
		font-size: 30upx;
		text-align: center;
		line-height: 200upx;
	}
	
	/* 选择更多商品按钮 */
	.selectShopBtn{
		width: 96%;
		height: 60upx;
		margin: 0 auto;
		margin-top: 40upx;
		background-color: #F4F4F4;
		border-radius: 5upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		color: #999;
		font-size: 26upx;
	}
	.doubArrows{
		width: 26upx;
		height: 28upx;
		margin-left: 20upx;
	}
	
	/* 开始直播按钮 */
	.startLive{
		width: 96%;
		height: 90upx;
		color: #fff;
		font-size: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		border-radius: 50upx;
		margin-top: 5%;
		position: relative;
	}
	.startBtnBg{
		width: 100%;
		height: 100%;
	}
	.startBtnTxt{
		position: absolute;
	}
	
	/* 更多商品模块 */
	.moreShopBox{
		background-color: rgba(0,0,0,0.4);
		position: absolute;
		top: 0;
		z-index: 100;
	}
	.MoreShopView{
		width: 100%;
		height: 40%;
		background-color: #fff;
		position: absolute;
		bottom: 0;
	}
	.moreShopBoxScroll{
		width: 100%;
		height: 100%;
		padding: 10upx 0upx;
		box-sizing: border-box;
	}
	.SelectShopItem{
		width: 90%;
		height: 160upx;
		margin-top: 10upx;
		margin-left: 5%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		box-shadow: 0upx 2upx 2upx 0upx #A3A3A3;
	}
	
	.SelectShopImg{
		width: 30%;
		height: 90%;
	}
	.SelectShopInfoBox{
		width: 65%;
		height: 90%;
		position: relative;
	}
	.SelectShopInfoTitle{
		display: inline-block;
		width: 70%;
		height: 60upx;
		color: #333;
		font-size: 26upx;
	}
	.SelectShopInfoAdd{
		width: 60upx;
		height: 60upx;
		position: absolute;
		top: 30%;right: 10upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.SelectShopInfoAddImg{
		width: 40upx;
		height: 40upx;
		position: absolute;
	}
</style>

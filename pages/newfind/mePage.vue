<template>
	<scroll-view :scroll-y="true" :style="{height:height}" :show-scrollbar="false">

		<!-- <view style="background-color: #F4F4F4;display: flex;flex-direction: column;" :style="{width:width+'px',height:height+'px'}"> -->

		<!-- <view class="nav">
			<image @click="backPage" style="width: 40upx;height: 40upx;margin-left: 20upx;" src="../../static/public/blackBack.png"></image>
			<text style="font-size: 36upx;color: #333;font-weight: 700;">个人中心</text>
			<view style="width: 40upx;height: 40upx;margin-right: 20upx;"></view>
		</view> -->
		
		<view class="topBox">
			<view class="upBox">
				<image :src="userInfo.headimg==''?'../../static/my/icon.png':url+userInfo.headimg" class="headerImg"></image>
				<view class="userInfo">
					<text style="font-size: 32upx;color: #333;font-weight: 700;">{{userInfo.nickname==''?userInfo.phone:userInfo.nickname}}</text>
					<text v-if="identification==1" class="identificationState">已完成直播认证</text>
					<text v-if="identification!=1" class="identificationState" @click="torz">未完成直播认证</text>
				</view>
			</view>
			<view class="bottomBox">
				<view class="infoBox">
					<text style="font-size: 32upx;color: #333;font-weight: 700;">{{workNum}}</text>
					<text style="font-size: 28upx;color: #999;font-weight: 700;">作品</text>
				</view>
				<view class="infoBox">
					<text style="font-size: 32upx;color: #333;font-weight: 700;">{{attentionNum}}</text>
					<text style="font-size: 28upx;color: #999;font-weight: 700;">关注</text>
				</view>
				<view class="infoBox">
					<text style="font-size: 32upx;color: #333;font-weight: 700;">{{fansNum}}</text>
					<text style="font-size: 28upx;color: #999;font-weight: 700;">粉丝</text>
				</view>
			</view>
		</view>
		<view id="MyTabBar" class="myTabBar">
			<view class="tabBarItem" v-for="(item,index) in tabBarList" :key="index" @click="tabBarChange(index)">
				<text :class="actionId == index ? 'actionSty' : 'tabBarTxt'">{{item.txt}}</text>
				<list v-if="actionId == index" class="linear"></list>
			</view>
		</view>
		<!-- <swiper :indicator-dots="false"  :duration="500" :current="actionId" style="background-color: #fff;width: 100%;display: flex;" @change="swiperChange">
			<swiper-item style="width: 100%;" > -->
		<!-- <scroll-view :scroll-y="true" :style="{height:marginBottom-38+'px'}" class="swiper-item"> -->
		<view v-if="uu.length > 0&&actionId==0" class="item" v-for="(item,index) in uu" :key="index">
		
				<video :src="url+item.vurl" :autoplay="false" :show-play-btn="false" :show-fullscreen-btn="false" :poster="url+item.vurl"
				 :enable-progress-gesture="false" style="width:160rpx;height:160upx;margin: 24rpx;"></video>

			
			<view class="itemInfo">
				<text class="title">{{item.title}}</text>
				<text style="font-size: 28upx;color: #999;font-family:Microsoft YaHei;margin-top: 20rpx;">发布时间 {{item.addtime}}</text>
				<view class="itemFlow">
					<text style="font-size: 28upx;color: #999; font-family:Microsoft YaHei;">点赞量: {{item.num}}</text>
					<text style="font-size: 28upx;color: #999; font-family:Microsoft YaHei;">评论: {{item.comm_num}}</text>
				</view>
			</view>
			<view @click="dele($event,index,item.id)" style="display: flex;flex-direction: column;align-items: center;">
				<image src="../../static/video/deleImg.png" mode="" style="width:35upx;height:35upx;padding-right:10upx;"></image>
				<text style="font-size: 34upx;color: #999; font-family:Microsoft YaHei;padding-right:20upx;">删除</text>
			</view>
		</view>
		<view class="hintBox" v-if="uu.length == 0&&actionId==0">
			<text class="hintTxt">你还没有发布视频哦</text>
		</view>
		<view v-if="likeList.length > 0&&actionId==2" class="item" v-for="(item,index) in likeList" :key="index">
		
				<video :src="url+item.video_url" :autoplay="false" :show-play-btn="false" :show-fullscreen-btn="false" :poster="url+item.video_url"
				 :enable-progress-gesture="false" style="width:160rpx;height:160upx;margin: 24rpx;"></video>
		
			
			<view class="itemInfo">
				<text class="title">{{item.title}}</text>
				<!-- <text style="font-size: 28upx;color: #999;font-family:Microsoft YaHei;margin-top: 20rpx;">发布时间 {{item.addtime}}</text>
				<view class="itemFlow">
					<text style="font-size: 28upx;color: #999; font-family:Microsoft YaHei;">点赞量: {{item.num}}</text>
					<text style="font-size: 28upx;color: #999; font-family:Microsoft YaHei;">评论: {{item.comm_num}}</text>
				</view> -->
			</view>
			<view @click="tapLove(item)" style="display: flex;flex-direction: column;align-items: center;">
				<!-- <image src="../../static/video/deleImg.png" mode="" style="width:35upx;height:35upx;padding-right:10upx;"></image> -->
				<text style="font-size: 34upx;color: #999; font-family:Microsoft YaHei;padding-right:20upx;">取消收藏</text>
			</view>
		</view>
		<view class="hintBox" v-if="likeList.length == 0&&actionId==2">
			<text class="hintTxt">你还没有收藏视频哦</text>
		</view>
		<!-- </scroll-view> -->
		<!-- </swiper-item>
			<swiper-item >
				<view class="hintBox">
					<text class="hintTxt">功能代开发</text>
				</view>
			</swiper-item>
			<swiper-item >
				<view class="hintBox">
					<text class="hintTxt">你还没有收藏的视频哦</text>
				</view>
			</swiper-item>
		</swiper> -->
		<!-- </view> -->
	</scroll-view>
</template>

<script>
	export default {
		props: {
			refreshId: {
				type: Number,
				default: 4
			}
		},
		data() {
			return {
				width: '',
				height: '',
				tabBarList: [{
						txt: '作品管理',
						index: 0
					},
					{
						txt: '我的关注',
						index: 1
					},
					{
						txt: '我的收藏',
						index: 2
					}
				],
				actionId: 0,
				marginBottom: '',
				uu: [],
				url: this.$store.state.url,
				authtoken: uni.getStorageSync('authtoken'),
				fansNum: 0,
				workNum: 0,
				attentionNum: 0,
				userInfo: [],
				identification: 0,
				likeList: []
			}
		},
		mounted() {
			this.myMain();
		},
		watch: {
			refreshId(newVal, oldVal) {
				console.log(newVal)
				this.isRefresh = true;
				if (this.refreshId == 4 && this.isRefresh) {
					this.myMain();
				}
			}
		},

		onReady() {
			var _this = this;
			const query = uni.createSelectorQuery().in(this);
			query.select('#MyTabBar').boundingClientRect().exec(function(data) {
				_this.marginBottom = _this.height - data[0].top;
				console.log(_this.height - data[0].top);
			});
		},
		methods: {
			tapLove(item) {
				let that =this;
				uni.request({
					url:this.url+'/api/video/store_l',
					method:"POST",
					header:{
						authtoken:uni.getStorageSync('authtoken')
					},
					data:{
						tid:1,
						oid:item.oid
					},
					success(res) {
						if(res.data.code==1){
							this.getLike();
						}
						// item.check=!item.check
						// console.log(res);
					}
				})
			},
			async myMain() {
				this.getVideoXY();
				await this.getInit().then(res => {
					console.log(res);
					
					this.fansNum = res.data.data.fans_num;
					this.attentionNum = res.data.data.keep_num;
					this.workNum = res.data.data.total;
					this.uu = res.data.data.data;
					this.userInfo = res.data.data.minfo;
					this.identification=this.userInfo.status
				})
			},
			// 获取视口宽高
			getVideoXY() {
				let res = uni.getSystemInfoSync();
				
				this.height = 400 + 'px';
				this.width = res.windowWidth + 'px';
			},
			// 跳转到认证页
			torz() {
				uni.navigateTo({
					url: './identification'
				})
			},
			// 返回上一页
			backPage() {
				uni.navigateBack({
					delta: 1
				})
			},
			async getInit() {
				return new Promise((resolve, reject) => {
					uni.request({
						url: this.url + '/api/Video/collect',
						method: "POST",
						header: {
							authtoken: this.authtoken
						},
						data: {
							uid: uni.getStorageSync('uid'),
							type: 1
						},
						success(res) {
							resolve(res);
						}
					})
				})
			},
			// 点击tabbar切换
			tabBarChange(index) {
				this.actionId = index;
				if (index == 2) {
					this.getLike();
				}
			},
			getLike() {
				var _this = this;
				uni.request({
					url: this.url + '/api/video/mycollect',
					method: 'POST',
					header: {
						authtoken: this.authtoken
					},
					success(res) {
						console.log(res);
						_this.likeList = res.data.data;
					}
				})
			},
			// 滑动swiper切换
			swiperChange(e) {
				this.actionId = e.detail.current;
			},
			dele(e, index, tid) {
				if (this.authtoken != '') {
					var _this = this;
					uni.request({
						url: this.url + '/api/video/delete_v',
						method: "POST",
						header: {
							authtoken: this.authtoken
						},
						data: {
							tid
						},
						success(res) {
							uni.showToast({
								icon: 'none',
								title: res.data.msg
							})
							if (res.data.code == 1) {
								_this.uu.splice(index, 1);
								_this.workNum -= 1;
							}
						}
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '请登录'
					})
				}
			}
		}
	}
</script>

<style scoped>
	.livePageBox {
		background-color: #F4F4F4;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		
	}
	/* 去掉刘海 */
	.status_bar {
		/* #ifndef APP-PLUS */
		height: var(--status-bar-height);
		/* #endif */
		width: 100%;
		padding: 10upx 0upx;
		background-color: #FFFFFF;
		/* #ifndef H5||MP */
		padding-bottom: 20upx;
		/* #endif */
	}

	/* 导航栏 */
	.nav {
		height: 100upx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
	}

	/* 头部 */
	.topBox {
		height: 300upx;
		background-color: #FFFFFF;
	}

	.upBox {
		height: 50%;
		padding: 0 20upx;

		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		display: flex;
		/* #endif */

		flex-direction: row;
	}

	.headerImg {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}

	.userInfo {
		height: 100upx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex-direction: column;
		justify-content: space-between;
		margin-left: 40upx;
	}

	.identificationState {
		width: 166upx;
		height: 39upx;
		/* #ifndef APP-NVUE */
		display: inline-block;
		/* #endif */


		font-size: 20upx;
		color: #168CFF;
		text-align: center;
		line-height: 39upx;
		background-color: #C1E0FF;
	}

	.bottomBox {
		height: 50%;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		display: flex;
		/* #endif */

		flex-direction: row;
		justify-content: space-between;
		padding: 0 20upx;

	}

	.infoBox {
		width: 33.33%;
		height: 100%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	/* 导航栏 */
	.myTabBar {
		margin-top: 20upx;
		height: 80upx;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		display: flex;
		/* #endif */

		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 20upx;

		background-color: #FFFFFF;
	}

	.tabBarItem {
		width: 33.333%;
		height: 100%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.linear {
		/* #ifndef APP-NVUE */
		border: 1upx solid #168CFF;
		/* #endif */

		width: 35upx;
	}

	.tabBarTxt {
		font-size: 32upx;
		color: #999999;
	}

	.actionSty {
		font-size: 32upx;
		color: #333333;
		font-weight: 700;
	}

	.item {
		width: 100%;
		height: 220upx;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		border-bottom: 2upx solid #D8D8D8;
		display: flex;
		/* #endif */
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20upx;
		padding: 0 20upx;

		padding-bottom: 35upx;

	}

	.itemInfo {
		margin-right: 24rpx;
		flex: 1;
		height: 100%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex-direction: column;
		/* justify-content: space-between; */
		/* background-color: #2695FA; */
	}

	.title {
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		// display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 3;
		/** 显示的行数 **/
		font-size: 34upx;
		color: #333;
		font-weight: 700;
		font-family: Microsoft YaHei;
		padding-top: 20upx;
	}

	.itemFlow {
		margin-top: 20rpx;
		width: 100%;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		display: flex;
		/* #endif */

		flex-direction: row;
		justify-content: space-between;
		padding-right: 60upx;

	}

	.imgOperation {
		width: 30%;
		height: 100%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
	}

	.hintBox {
		width: 100%;
		height: 100%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.hintTxt {
		font-size: 26upx;
		color: #dddddd;
	}
</style>

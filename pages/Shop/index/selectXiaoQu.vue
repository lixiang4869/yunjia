<template>
	<view>
		<view  style="font-size: 30rpx;color: #333333;margin: 20rpx;padding-left: 20rpx;"> 当前定位：{{locationName}}</view>
		<view class="place">
			<view class="input-box">
				<input placeholder="输入自提点" :focus="true" @input="getName"/>
			</view>
			<text @click="searchLeader" style="font-size: 30rpx;color: #333333;">搜索</text>
		</view>
			<view v-for="(item, index) in list" :key="index">
				<view class="list-item" @click="check(index)">


					<image :src="item.headimg" class="headimg" @error="onloaderror(index)"></image>
					<view class="header-detail">
						<view style="flex-direction: row;display: flex;">
							<text class="biaoti-name">{{item.truename}} </text>
							<text class="biaoti-name2">{{item.shop_name}} </text>
						</view>

						<text class="biaoti-one">{{item.address}}</text>
						<text class="biaoti-dis">距您{{item.distance}}</text>
					</view>



					<!-- <image class="img" :src="item.checked?'/static/selected.png':'/static/select.png'" mode="aspectFit"></image> -->

				</view>
			</view>
		
		<!-- <button class="btn" @click="confirm">确认提交</button> -->



	</view>
</template>

<script>
	import amap from '../../../common/amap-wx.js';
	import request from '../../../store/http.js';
	export default {
		data() {
			return {
				limg: "https://xin.yiyunoto.com/uploads/static/shop/tz.png",
				list: [],
				url: this.$store.state.url,
				index: 0,
				locationName:"",
				location:{page:1,name:"",lng:0.0,lat:0.0},
				amapPlugin: null,
				key: '980c4a9d17bc9c06a85d488adaac1f09',
			};
		},
		onLoad() {
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
		},
		onShow() {
			/* 隐藏凸起图标 */
			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			setTimeout(function() {
				if (icon)
					icon.hide();
			}, 100);
			// #endif
			this.getLeaders()
		},
		
		onReachBottom() {
			console.log("onReachBottom")
			if (this.loadingType != 0) { // loadingType!=0;直接返回
			    return false;
			}
			this.location.page++;
			this.loadingType = 1;
		
			this.getLeadersByLocation();
		},
		methods: {
			getName(e){
				this.location.name = e.target.value;
			
				// console.log(this.name);
			},
			searchLeader(){
				this.location.page=1;
				this.getLeadersByLocation();
			},
			onloaderror(i) {
				this.list[i].headimg = "https://xin.yiyunoto.com/uploads/static/shop/tz.png";

			},
			check(i) {

				this.index = i;

				this.confirm();
			},


			confirm() {
				
				uni.setStorageSync("Leaders", this.list[this.index]);
				uni.setStorageSync("leaderid", this.list[this.index].id);
				
				uni.navigateBack({

				});
			},
			getcity(location) {
				
				let _this = this;
				_this.amapPlugin.getRegeo({
					location: '' + location.lng + ',' + location.lat + '',
					success: (data) => {
						console.log("data1", data)
			
						_this.locationName = data[0].name;
						
			
					},
					fail: (data) => {
						console.log("data", data)
					}
				});
			},
			getLeaders() {
				let _this = this;
				uni.getLocation({
					type: "gcj02",
					geocode: true,
					success(res) {
						_this.location.lng = res.longitude;
						_this.location.lat = res.latitude;
						_this.getcity(_this.location)
						_this.getLeadersByLocation();
					},
					fail(e) {
						uni.showModal({
							content: "获取位置失败，是否打开设置界面",
							success(a) {
								if (a.confirm) {
									uni.openSetting({
										success(res) {
											_this.getLeaders();
										},
										fail(res) {
											console.log(res)
										}
									})
								}
							},
							fail(b) {

							}
						})

					}
				})

			},
			// 获取小区列表
			getLeadersByLocation() {
				
				request.urlRequest(
					this.url + '/api/member/getNearestLeaders', this.location, {}, 'POST',
					(res) => {
						if (res.data.code == 1) {
							if(this.location.page<res.data.data.last_page){
								this.loadingType=0
							}else this.loadingType=2
							if(this.location.page==1)
							this.list = res.data.data.data;
							else this.list = this.list.concat( res.data.data.data);
							
						
							this.list.forEach(item => {
								if (item.headimg && item.headimg.search("http") == -1) {

									item.headimg = this.url + item.headimg;
								}

							})


						}



					}
				)
			},

		}
	};
</script>

<style lang="less">
	.place{
		margin-bottom: 20rpx;
		width:92%;
		padding: 0 4%;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content:center;
		z-index: 10;
		background-color: #fff;
		.input-box{
			width: 75%;
			height: 60upx;
			background-color: #f3f3f3;
			border-radius: 30upx;
			line-height: 60upx;
			margin-right: 40upx;
			input{
				padding-top:10upx;
				align-items: center;
				padding-left: 28upx;
				font-size: 28upx;
			}
		}
	}
	page {

		background: #f6f6f6;
	}

	.l {
		margin-bottom: 160upx;

	}

	.header-detail {
		flex: 1;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		margin-left: 10upx;
		display: flex;
		flex-direction: column;

		.biaoti-name {
			font-weight: 700;

			font-size: 34upx;
			font-family: PingFangSC-Medium, PingFang SC;
			color: #333333;

		}

		.biaoti-name2 {
			font-weight: 700;
			margin-left: 20upx;
			font-size: 34upx;
			font-family: PingFangSC-Medium, PingFang SC;
			color: #f72926;

		}

		.biaoti-dis {
			font-weight: 700;
			margin-top:10rpx;
			font-size: 32upx;
			font-family: PingFangSC-Medium, PingFang SC;
			color: #f72926;

		}

		.biaoti-one {

			margin-top: 10rpx;
			font-size: 30upx;
			font-family: PingFangSC-Medium, PingFang SC;
			color: #333333;

		}

	}

	.headimg {
		/* //第一行定位图片 */
		margin-left: 24upx;
		margin-right: 24upx;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}

	.list-item {
		width: 100%;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		border-bottom: 1px solid #e5e5e5;

		.img {
			margin-left: 20upx;
			margin-right: 20upx;
			width: 60upx;
			height: 60upx;
			border-radius: 30upx;
		}


	}

	.name {
		flex: 1;
		font-size: 32upx;
		color: #333333;
	}

	.name2 {
		flex: 1;
		font-size: 28upx;
		color: #999;
	}

	.btn {
		width: 90%;
		margin-left: 5%;
		margin-bottom: 20upx;
		font-size: 32upx;
		height: 100upx;
		position: fixed;
		bottom: 0upx;
		background: #007aff;

		text-align: center;
		line-height: 100upx;
		color: #FFFFFF;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.address {
		margin-left: 30upx;
		display: flex;
		flex-direction: column;

	}
</style>

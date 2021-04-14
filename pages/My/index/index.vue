<template>
	<view class="content" :style="{width,height}">
		<view class="biaoti">
			<!-- 消息 -->
			<view @click="scanCode">
				<image class="saoyisaoImg" src="../../../static/my/saoyisao.png"></image>
				<!-- <image src="../../../static/my/info.png" class="biaoti-ima-one"> -->
			</view>

			<view class="biaoti-one">个人中心</view>
			<view class="saoyisaoImg"></view>
		</view>
		<!-- 个人信息 -->
		<view class="top1">
			<view class="top1Up">
				<view class="topInfo">
					<view style="display: flex;flex-direction: row;align-items: center;" @click="denglu">
						<image :src="headimg" class="title_icon" />
						<view class="xqBox">
							<view style="display: flex;flex-direction: row;align-items: center;">
							<text class="xqName">{{username}}</text>
							<text class="xqChange">{{userlevel}}</text>
							</view>
							<text style="color: #fff;font-size: 24rpx;">会员编号:{{userid}}</text>
						</view>
					</view>
					<!-- <view class="saoyisaoBox" @click="scanCode">
						<image class="saoyisaoImg" src="../../../static/my/saoyisao.png"></image>
						<text class="saoyisaoTxt">扫一扫</text>
					</view> -->
				</view>
			</view>
			<!-- <view class="top1Down">
				<view class="myInfoItemBox" @click="yuan">
					<image class="myInfoImg" src="../../../static/my/qian.png"></image>
					<text class="myInfoTxt">钱包</text>
				</view>
				<view class="myInfoItemBox" @click="yes">
					<image class="myInfoImg" src="../../../static/my/info.png"></image>
					<text class="myInfoTxt">消息中心</text>

				</view>
				<view class="myInfoItemBox" @click="invitecode">
					<image class="myInfoImg" src="../../../static/my/yao.png"></image>
					<text class="myInfoTxt">邀请好友</text>
				</view>
				<view class="myInfoItemBox" @click="no">
					<image class="myInfoImg" src="../../../static/my/set.png"></image>
					<text class="myInfoTxt">设置中心</text>
				</view>
			</view> -->
		</view>
		<!-- 我的收藏 -->
		
		
			<view class="shoucangItemBox">
				<view class="shoucangItem" @click="yuan">
					<view style="position: relative;">
						<text class="number">***</text>
						<!-- <view class="dot"></view> -->
					</view>
					<text class="shoucangName">我的钱包</text>
				</view>
				<view class="shoucangItem" @click="daikaifa(0)">
					<view style="position: relative;">
						<text class="number">{{userInfo.goods}}</text>
						<!-- <view class="dot"></view> -->
					</view>
					<text class="shoucangName">商品收藏</text>
				</view>
				<view class="shoucangItem" @click="daikaifa(1)">
					<view style="position: relative;">
						<text class="number">{{userInfo.shop}}</text>
						<!-- <view class="dot"></view> -->
					</view>
					<text class="shoucangName">店铺收藏</text>
				</view>
				<view class="shoucangItem" @click="daikaifa(2)">
					<view style="position: relative;">
						<text class="number">{{userInfo.history}}</text>
						<!-- <view class="dot"></view> -->
					</view>
					<text class="shoucangName">我的足迹</text>
				</view>
			</view>
		
		<!-- 我的订单 -->
		<view class="ddBox">
			<text class="ddBoxTop">我的订单</text>
			<view class="ddBoxBtns">
				<view class="ddBtnItem" v-for="(item,index) in oList" :key="index" @tap="toOrderList(index)">
					<image class="ddBtnImg" :src="item.icon"></image>
					<text class="ddBtnTxt">{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="redPack" @click="invitecode">
			<image src="https://xin.yiyunoto.com/uploads/static/my/yaoqing.png" mode="widthFix"></image>
		</view>
		<!-- 我的服务 -->
		<view class="myService">
			<text class="myServiceTitle">我的服务</text>
			<view class="myServiceBtns">
				<view class="myServiceBtnItem" @tap="toOrderLis(orderLiss[0].id)" >
					<image class="serviceImg" :src="orderLiss[0].icon"></image>
					<text class="serviceName">{{orderLiss[0].text}}</text>
					<view class="dot" v-if="index==0&&userInfo.orderNum>0"></view>
				</view>
				<view class="myServiceBtnItem" @tap="toOrderLis(orderLiss[1].id)">
					<image class="serviceImg" :src="orderLiss[1].icon"></image>
					<text class="serviceName">{{orderLiss[1].text}}</text>

				</view>
				<view class="myServiceBtnItem" @tap="toOrderLis(orderLiss[2].id)" v-if="userInfo.partner">
					<image class="serviceImg" :src="orderLiss[2].icon"></image>
					<text class="serviceName">{{orderLiss[2].text}}</text>

				</view>
				<view class="myServiceBtnItem" @tap="toOrderLis(orderLiss[3].id)">
					<image class="serviceImg" :src="orderLiss[3].icon"></image>
					<text class="serviceName">{{orderLiss[3].text}}</text>

				</view>
				<view class="myServiceBtnItem" @tap="toOrderLis(orderLiss[4].id)" >
					<image class="serviceImg" :src="orderLiss[4].icon"></image>
					<text class="serviceName">{{orderLiss[4].text}}</text>
				
				</view>
				<view class="myServiceBtnItem" @tap="toOrderLis(orderLiss[5].id)" >
					<image class="serviceImg" :src="orderLiss[5].icon"></image>
					<text class="serviceName">{{orderLiss[5].text}}</text>

				</view>
				
				<view class="myServiceBtnItem" @tap="toOrderLis(orderLiss[6].id)" v-if="userInfor_meminfo.is_shoper==1">
					<image class="serviceImg" :src="orderLiss[6].icon"></image>
					<text class="serviceName">{{orderLiss[6].text}}</text>
				
				</view>
				<view class="myServiceBtnItem" @tap="toOrderLis(orderLiss[7].id)" >
					<image class="serviceImg" :src="orderLiss[7].icon"></image>
					<text class="serviceName">{{orderLiss[7].text}}</text>
				
				</view>
				
				<view class="myServiceBtnItem" @tap="toOrderLis(orderLiss[8].id)" >
					<image class="serviceImg" :src="orderLiss[8].icon"></image>
					<text class="serviceName">{{orderLiss[8].text}}</text>
					
				</view>
				<view class="myServiceBtnItem" @tap="toOrderLis(orderLiss[9].id)"  >
					<image class="serviceImg" :src="orderLiss[9].icon"></image>
					<text class="serviceName">{{orderLiss[9].text}}</text>
				
				</view>
				
				<view class="myServiceBtnItem" @tap="toOrderLis(orderLiss[10].id)" v-if="userInfor_meminfo.is_leader == 1" >
					<image class="serviceImg" :src="orderLiss[10].icon"></image>
					<text class="serviceName">{{orderLiss[10].text}}</text>
				
				</view>
				
				<view class="myServiceBtnItem" @tap="toOrderLis(orderLiss[11].id)" v-if="userInfor_meminfo.is_shoper!=1&&isshow">
					<image class="serviceImg" :src="orderLiss[11].icon"></image>
					<text class="serviceName">{{orderLiss[11].text}}</text>
				
				</view>
				<view class="myServiceBtnItem" @tap="toOrderLis(orderLiss[12].id)"  v-if="isshow">
					<image class="serviceImg" :src="orderLiss[12].icon"></image>
					<text class="serviceName">{{orderLiss[12].text}}</text>
				
				</view>
				<view class="myServiceBtnItem" @tap="toOrderLis(orderLiss[13].id)" v-if="userInfor_meminfo.id==4298" >
					<image class="serviceImg" :src="orderLiss[13].icon"></image>
					<text class="serviceName">{{orderLiss[13].text}}</text>
				
				</view>
				<view class="myServiceBtnItem" @tap="gomyhehuoList"  >
					<image class="serviceImg" :src="orderLiss[14].icon"></image>
					<text class="serviceName">{{orderLiss[14].text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../store/http.js';

	export default {

		data() {
			return {
				user: '系统管理',
				balance: 0.00,
				userid:0,

				oList: [{
						text: '商城订单',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/shangcheng.png'
					},
					{
						text: '团购外卖',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/waimai.png'
					},
					{
						text: '同城订单',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/tongcheng.png'
					},
					{
						text: '生鲜次日达',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/shengxian.png'
					}
				],


				orderLiss: [
						{
						text: '合伙人',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/hehuoren.png',
						id: '../hezuo/addUs',
					},
					
					{
						text: '收货地址',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/dizhi.png',
						id: '../../Address/Receiving',
					},
					{
						text: '我的团队',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/tuandui.png',
						id: '../hezuo/tuijian',
					},
					{
						text: '小区绑定',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/xiaoqu.png',
						id: '../../My/bindXQ/selectXiaoQu',
					},

					{
						text: '客服中心',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/kefu.png',
						id: 1,
					},
					{
						text: '我的推荐',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/mytuijian.png',
						id: "../../My/tuijian/tuijian",
					},
					{
						text: '商家中心',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/sjzx.png',
						id: '../../My/manage/shopCenter',
					}

					, {
						text: '收款码',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/skm.png',
						id: '../Collection-code/Collection-code',
						
					},
					
					
					
					 {
						text: '消息中心',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/message.png',
						id: '../xiaoxiliebiao/xiaoxiliebiao',
					},
					{
						text: '个人中心',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/set.png',
						id: '../set/set',
					},
					{
						text: '团长中心',
						id: '../../My/manage/tzmanage',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/tzzx.png'
					},
				
					{
						text: '商铺入驻',
						id: '../hezuo/recruitment',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/ruzhu.png'
						
					}
					,
									
					{
						text: '同城到家',
						id: '../hezuo/service',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/tongchengdaojia.png'
						
					},
					{
						text: '管理合伙人',
						id: '../hezuo/manage',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/glhhr.png'
						
					},
					{
						text: '我的合伙人',
						id: '../hezuo/myhezuolist',
						icon: 'https://xin.yiyunoto.com/uploads/static/my/glhhr.png'
						
					}
					
				],
				userlevel: "普通会员",
				chuqisum: 0.0,
				zongjin: 0.0,
				zongchu: 0.0,
				mosum: 0.0,
				userInfor_meminfo: {},
				// username:'未设置',
				url: this.$store.state.url,
				date: {},
				username: '未设置',
				dates: {},
				isFirst: true,
				userInfo: {
					shop: 0,
					goods: 0,
					history: 0,
					orderNum: 0
				},
				headimg: '../../../static/my/icon.png',
				isshow: true,
				width: '',
				height: ''
			}
		},
		onLoad() {
			// uni.setTabBarItem({
			// 	index:4,
			// 	text:"123",
			// 	iconPath:"static/public/kefu.png",
			// 	selectedIconPath:"static/public/kefu.png",
			// 	fail(e) {
			// 		
			// 	}
			// })
			console.log("setTabBarItem",this.orderLiss[10])
			let res = uni.getSystemInfoSync();
			this.width = res.windowWidth + 'px';
			this.height = res.windowHeight + 'px';
		},
		onShow() {
			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			if (icon) {
				setTimeout(function() {
					icon.show();
				}, 100)
			}
			// #endif
			this.isshow = uni.getStorageSync("isshowhongbao")
			// var refresh = uni.getStorageSync('refresh');
			// if (refresh)
				this.getUserInfo()
		},
		onPullDownRefresh() {
			this.getUserInfo();
			uni.stopPullDownRefresh();
		},
		methods: {
			/* 获取个人信息 */
			getUserInfo() {
				var authtoken = uni.getStorageSync("authtoken")

				if (authtoken != "") {
					request.urlRequest(
						this.url + "/api/member/index", {}, {
							authtoken: authtoken
						},
						'POST',
						(res) => {
							if (res.data.code == 1) {
								this.userInfor_meminfo = res.data.data.meminfo;
								this.userInfo = res.data.data;
								this.$store.commit("changeUserInfor", res.data.data);
								this.userid= this.userInfor_meminfo.id
								uni.setStorageSync("uid", this.userInfor_meminfo.id);
								uni.setStorageSync("parentsid", this.userInfor_meminfo.parentsid);
								uni.setStorageSync("com_id", res.data.data.meminfo.com_id);
								uni.setStorageSync("com_url", res.data.data.meminfo.com_url);
								if (this.userInfor_meminfo.headimg != null && this.userInfor_meminfo.headimg.length > 0) {
									if (this.userInfor_meminfo.headimg.search('http') != -1) {
										this.headimg = this.userInfor_meminfo.headimg;
									} else {
										this.headimg = this.url + this.userInfor_meminfo.headimg;
									}
								} else this.headimg = '../../../static/my/icon.png';
								if (this.userInfor_meminfo.nickname != null) {
									console.log('nickname', this.userInfor_meminfo.nickname)
									this.username = this.userInfor_meminfo.nickname;
								} else if (this.userInfor_meminfo.truename != null) {
									this.username = this.userInfor_meminfo.truename;
									console.log('truename', this.userInfor_meminfo.truename)
								} else {

									console.log('未设置昵称')
									this.username = '未设置昵称';
								}
								uni.setStorageSync("myUsername",this.username);
								uni.setStorageSync("myUserImg",this.headimg);
								if (this.userInfor_meminfo.is_leader == 1 ) {
									this.userlevel = "团长";
								
								} else if (this.userInfor_meminfo.is_leader != 1 ) {
									
									this.userlevel = "普通会员";
								}
								 if(this.userInfo.partner){
									this.userlevel = this.userInfo.partner;
								}
								
							} else {
								this.isFirst = false;
								uni.showToast({
									title: res.data.msg,
								})
							}
							console.log("ceshi", res)
						}
					)
				} else {
					this.userlevel = "普通会员";
					this.headimg = '../../../static/my/icon.png';
					this.username = "请登录";
					this.date.roler = "0";
					this.date.phone = "";
					this.userid = 0;

				}
			},
			
			no: function() {
				var token = uni.getStorageSync("authtoken")
				if (!token)
					uni.navigateTo({
			
						url: '../Login-registration/Login-registration'
					})
				else {
					uni.navigateTo({
						url: '/pages/My/set/set'
					})
				}
			
			},
			/* 余额   e币跳转页面 */
			yuan: function() {
				var token = uni.getStorageSync("authtoken")
				if (!token)
					uni.navigateTo({

						url: '../Login-registration/Login-registration'
					})
				else {
					
					uni.navigateTo({
						url: '/pages/My/Balance/Balance'
					})
				}

			},
		
			daikaifa(i) {
				var token = uni.getStorageSync("authtoken")
				if (!token)
					uni.navigateTo({
						// url:'/pages/My/Login-registration/Login-registration'//退出登录
						url: '../Login-registration/Login-registration'
					})
				else {
					uni.navigateTo({
						url: "../collect/collect?num=" + i
					})
				}

			},

			/* 邀请码跳转页面 */
			invitecode: function() {
				var token = uni.getStorageSync("authtoken")
				if (!token)
					uni.navigateTo({
						// url:'/pages/My/Login-registration/Login-registration'//退出登录
						url: '../Login-registration/Login-registration'
					})
				else {
					uni.navigateTo({
						url: '/pages/My/invitecode/invitecode'
					})
				}


			},


			// 请登录
			denglu() {
				var token = uni.getStorageSync("authtoken")
				if (!token)
					uni.navigateTo({
						// url:'/pages/My/Login-registration/Login-registration'//退出登录
						url: '../Login-registration/Login-registration'
					})
				else {
					this.no();
				}
			},
			toOrderList(e) {

				var token = uni.getStorageSync("authtoken");
				if (!token) {
					uni.navigateTo({

						url: '../Login-registration/Login-registration'
					})
					return
				}
				if (e == 0) uni.navigateTo({
					url: '../order/order'
				})
				else if (e == 1) uni.navigateTo({
					url: '../storeOrder/storeOrder'
				})
				else if (e == 2) uni.navigateTo({
					url: '/pagesA/sameOrder/sameOrder'
				})
				else if (e == 3) uni.navigateTo({
					url: '../order/order'
				})

			},
			// 我的工具
			toOrderLis(e) {

				var token = uni.getStorageSync("authtoken");
				if (!token) {
					uni.navigateTo({
						// url:'/pages/My/Login-registration/Login-registration'//退出登录
						url: '../Login-registration/Login-registration'
					})
					return
				}
				if (!e) {

					uni.showToast({
						title: 'sorry 此功能为开放',
						icon: "none"
					});
				} else if (e == 1) {

					uni.makePhoneCall({
						phoneNumber: "4000371189",
						fail(res) {
							console.log("eee", res)
						}
					})
				} else
					uni.navigateTo({
						url: e
					})
			},
			reset() {
				uni.redirectTo({
					url: "../../login/login?tyid=" + 1
				})

			},
			gomyhehuoList(){
				uni.navigateTo({
					url:"../hezuo/myhezuoList"
				})
			},
			// 扫码事件
			scanCode() {
				var token = uni.getStorageSync("authtoken");
				if (!token) {
					this.denglu();

				} else
					uni.scanCode({
						success: (res) => {
							console.log("扫码成功", res)
							if (res.result.search("http") == -1) {
								let s = JSON.parse(res.result)
								if (s.partition) {
									uni.navigateTo({
										url: './sao?partition=' + s.partition
									})
									return
								}
							}
							// var reg = /\[type=scan\]/;
							// if(reg.test(res.result)){
							// 	console.log(reg.test(res.result))
							// 	var src = res.result;
							// 	var arr = src.match(reg)
							// 	uni.navigateTo({
							// 		url:'../shopDetail/index?result='+src.substr(0,arr.index)
							// 	})
							// 	return;
							// }
							request.urlRequest(
								res.result, {}, {
									authtoken: token
								},
								'POST',
								(res) => {
									if (res.data.code == 1) {
										uni.showToast({
											title: res.data.msg,
											icon: "none",
											duration: 3000
										})
									} else {
										uni.showToast({
											title: res.data.msg,
											icon: "none"
										})
									}

								}
							)
						}
					})

			},
			// 逛街
			shopOrder(e) {
				var a = e + 1

				uni.navigateTo({
					url: '../storeOrder/storeOrder?num=' + a
					// url:'../storeOrder/storeOrder'
				})
			},

			// 修改头像
			myUpload() {
				var token = uni.getStorageSync("token");
				uni.chooseImage({
					count: 1,
					sizeType: ['copressed'],
					success: (res) => {
						var imgFiles = res.tempFilePaths[0];
						console.log(imgFiles);
						var uper = uni.uploadFile({
							url: '',
							method: 'POST',
							filePath: imgFiles,
							name: 'file',
							header: {
								authtoken: token
							},
							success: (res1) => {
								console.log(res1);
								// window.location.reload()
								// 重新调用getUserInfo()实现头像更新成功
								// this.getUserInfo()
							}
						})

					}
				})

			},
			// 云商管理---分享有礼事件
			go_admin() {
				// console.log('云商管理')
			},
			go_share() {
				// console.log('分享有礼')
			}
		}
	}
</script>

<style lang="less">
	
	.redPack {
		display: flex;
		justify-content: center;
		margin-left: 24upx;
		margin-right: 24upx;
	
		image {
			width: 100%;
			height: 180upx;
		}
	}
	.content {
		width: 100%;
		background-color: #F3F3F3;
	}

	.biaoti {
		position: fixed;
		top: 0;
		z-index: 99;
		padding-top: 50upx;
		width: 100%;
		align-items: center;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		background: linear-gradient(133deg, #FF6178 0%, #FF502E 100%);
	}

	.biaoti-one {
		font-size: 36upx;
		font-weight: bold;
		font-family: PingFangSC-Medium, PingFang SC;
		color: rgba(255, 255, 255, 1);
	}

	.biaoti-ima-one {
		margin-left: 30upx;
		width: 25px;
		height: 23px;
	}

	.top1 {
		width: 100%;
		height: 400rpx;
		padding-top: 150rpx;
		border-radius: 20rpx;
		background: linear-gradient(133deg, #FF6178 0%, #FF502E 100%);
		// padding-bottom: 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.top1Up {
		width: 100%;
		// height: 45%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.title_icon {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-left: 30upx;
	}

	.topInfo {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.xqBox {
		
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		margin-left: 30rpx;
	}

	.xqName {
		font-size: 34rpx;
		color: #FFFFFF;
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-line-clamp: 1; //此处为上限行数
		-webkit-box-orient: vertical;
	}

	.xqChange {
		padding: 10rpx 30rpx;
		font-size: 24rpx;
		color: #f9e247;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 30rpx;
		margin-left: 20rpx;
	}

	.saoyisaoBox {
		width: 190rpx;
		height: 64rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.3);
		border-top-left-radius: 30rpx;
		border-bottom-left-radius: 30rpx;
	}

	.saoyisaoImg {
		margin-left: 24rpx;
		width: 41rpx;
		height: 41rpx;
	}

	.saoyisaoTxt {
		font-size: 30rpx;
		color: #FFFFFF;
		margin-left: 10rpx;
	}

	.top1Down {
		width: 100%;
		height: 45%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.myInfoItemBox {
		width: 20%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}

	.myInfoImg {
		width: 44rpx;
		height: 41rpx;
	}

	.myInfoTxt {
		font-size: 30rpx;
		color: #FFFFFF;
		margin-top: 10rpx;
	}

	.ddBox {
		width: 100%;
		height: 18%;
		background-color: #F0AD4E;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		margin-top: 24rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}

	.ddBoxTop {
		font-size: 30rpx;
		font-weight: 700;
		color: #333333;
	}

	.ddBoxBtns {
		width: 100%;
		height: 70%;
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.ddBtnItem {
		width: 22%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.ddBtnImg {
		width: 83rpx;
		height: 83rpx;
	}

	.ddBtnTxt {
		font-size: 28rpx;
		color: #333333;
	}

	.myShoucang {
		width: 100%;
		// height: 18%;
		margin-top: -80rpx;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.shoucangTitle {
		font-size: 30rpx;
		font-weight: 700;
		color: #333333;
	}

	.shoucangItemBox {
		border-radius: 16rpx;
		margin-left: 24rpx;
		margin-right: 24rpx;
		background: #fff;
		height: 160rpx;
		margin-top: -80rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.shoucangItem {
		width: 25%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.number {
		font-size: 50rpx;
		font-weight: 700;
		color: #333333;
	}

	.shoucangName {
		font-size: 26rpx;
		color: #333333;
		margin-top: 4rpx;
		// margin-bottom: 23rpx;
	}

	.dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		font-size: 22rpx;
		background-color: #f72926;
		position: absolute;
		// color:  #f72926;
		top: 0rpx;
		right: 10rpx;
	}

	.myService {
		width: 100%;
		margin-bottom: 30rpx;
		// margin-top: 30rpx;
		border-radius: 20rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		margin-bottom: 120rpx;
	}

	.myServiceTitle {
		font-size: 30rpx;
		color: #333333;
		font-weight: 700;
	}

	.myServiceBtns {
		width: 100%;
		height: 80%;
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		// justify-content: space-between;
		flex-wrap: wrap;
	}

	.myServiceBtnItem {
		width: 25%;
		height: 48%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.serviceImg {
		margin-top: 14rpx;
		width: 66rpx;
		height: 66rpx;
		border-radius: 33rpx;
	}

	.serviceName {
		font-size: 30rpx;
		color: #333333;
		margin-top: 20rpx;
		margin-bottom: 14rpx;
	}
</style>

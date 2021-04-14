<script>
	// 引入检查更新模块
	import {
		checkUpdater
	} from '@/common/checkUpdater'
	require("sdk/libs/strophe");
	let msgStorage = require("comps/chat/msgstorage");
	let msgType = require("comps/chat/msgtype");

	let disp = require("utils/broadcast");
	let logout = false;
	let is_reconnect = false;
	export default {
		globalData: {
			unReadMessageNum: 0,
			userInfo: null,
			saveFriendList: [],
			saveGroupInvitedList: [],
			groupList: [],
			isIPX: false //是否为iphone X
		},
		onLaunch: function() {
			let uid = uni.getStorageSync("uid")
			if(uid){
				
				this.$conn.open({
					apiUrl: this.$im.config.apiURL,
					user:  uid,
					pwd: "123456",
					grant_type: "password",
					appKey: this.$im.config.appkey
				});
			}
			var me = this;
			var logs = uni.getStorageSync("logs") || [];
			logs.unshift(Date.now());
			uni.setStorageSync("logs", logs);

			disp.on("em.main.ready", function() {
				me.calcUnReadSpot();
			});
			//离开chatroom
			disp.on("em.chatroom.leave", function() {
				console.log('em.chatroom.leave');
				me.calcUnReadSpot();
			});
			disp.on("em.chat.session.remove", function() {
				me.calcUnReadSpot();
			});
			disp.on('em.chat.audio.fileLoaded', function() {
				me.calcUnReadSpot()
			});

			disp.on('em.main.deleteFriend', function() {
				me.calcUnReadSpot()
			});
			disp.on('em.chat.audio.fileLoaded', function() {
				me.calcUnReadSpot()
			});


			this.$im.conn.listen({
				onOpened: (message) => {
					this.$im.conn.setPresence();
					console.log('登录成功登录成功登录成功登录成功登录成功登录成功登录成功');
					message.accessToken && uni.setStorageSync("myToken", message.accessToken);
					if (is_reconnect) {
						uni.hideToast();
						// this.$helper.toast('success', '登陆成功', 2000)
						is_reconnect = false;
					}
					if (this.getCurrentRoute() == "pages/login/login" || getCurrentRoute() == "pages/login_token/login_token") {
						this.onLoginSuccess();
					}

				},
				onReconnect: () => {
					// this.$helper.toast('loading', '重连中...', 2000)
				},
				onSocketConnected: () => {
					// this.$helper.toast('success', '登陆成功', 2000)
				},
				onClosed: () => {
					// this.$helper.toast('none', '网络已断开', 2000)
					uni.redirectTo({
						url: "@pages/My/Login-registration/Login-registration"
					});
					this.$conn.closed = true;
					this.$im.conn.close();
				},
				onInviteMessage: (message) => {
					this.$options.globalData.saveGroupInvitedList.push(message);
					disp.fire("em.xmpp.invite.joingroup", message);
					// uni.showModal({
					// 	title: message.from + " 已邀你入群 " + message.roomid,
					// 	success(){
					// 		disp.fire("em.xmpp.invite.joingroup", message);
					// 	},
					// 	error(){
					// 		disp.fire("em.xmpp.invite.joingroup", message);
					// 	}
					// });
				},
				onPresence: (message) => {
					console.log("onPresence", message);
					switch (message.type) {
						case "unsubscribe":
							// pages[0].moveFriend(message);
							break;
							// 好友邀请列表
						case "subscribe":
							if (message.status === "[resp:true]") {
								return;
							} else {
								// pages[0].handleFriendMsg(message);
								for (let i = 0; i < this.$options.globalData.saveFriendList.length; i++) {
									if (this.$options.globalData.saveFriendList[i].from === message.from) {
										this.$options.globalData.saveFriendList[i] = message
										disp.fire("em.xmpp.subscribe");
										return;
									}
								}
								this.$options.globalData.saveFriendList.push(message);
								console.log(JSON.stringify(this.$options.globalData.saveFriendList));
								disp.fire("em.xmpp.subscribe");
							}
							break;
						case "subscribed":
							uni.showToast({
								title: "添加成功",
								duration: 1000
							});
							disp.fire("em.xmpp.subscribed");
							break;
						case "unsubscribed":
							uni.showToast({
								title: "已拒绝",
								duration: 1000
							});
							break;
						case "memberJoinPublicGroupSuccess":
							// this.$helper.toast('none', '已进群', 1000)
							break;
							// 好友列表
							// case "subscribed":
							// 	let newFriendList = [];
							// 	for(let i = 0; i < me.$options.globalData.saveFriendList.length; i++){
							// 		if(me.$options.globalData.saveFriendList[i].from != message.from){
							// 			newFriendList.push(me.$options.globalData.saveFriendList[i]);
							// 		}
							// 	}
							// 	me.$options.globalData.saveFriendList = newFriendList;
							// 	break;
							// 删除好友
						case "unavailable":
							disp.fire("em.xmpp.contacts.remove");
							disp.fire("em.xmpp.group.leaveGroup", message);
							break;

						case 'deleteGroupChat':
							disp.fire("em.xmpp.invite.deleteGroup", message);
							break;

						case "leaveGroup":
							disp.fire("em.xmpp.group.leaveGroup", message);
							break;

						case "removedFromGroup":
							disp.fire("em.xmpp.group.leaveGroup", message);
							break;
							// case "joinChatRoomSuccess":
							// 	uni.showToast({
							// 		title: "JoinChatRoomSuccess",
							// 	});
							// 	break;
							// case "memberJoinChatRoomSuccess":
							// 	uni.showToast({
							// 		title: "memberJoinChatRoomSuccess",
							// 	});
							// 	break;
							// case "memberLeaveChatRoomSuccess":
							// 	uni.showToast({
							// 		title: "leaveChatRoomSuccess",
							// 	});
							// 	break;

						default:
							break;
					}
				},

				onRoster: (message) => {
					// let pages = getCurrentPages();
					// if(pages[0]){
					// 	pages[0].onShow();
					// }
				},

				onVideoMessage: (message) => {
					console.log("onVideoMessage: ", message);
					if (message) {
						msgStorage.saveReceiveMsg(message, msgType.VIDEO);
					}
					this.calcUnReadSpot(message);
					this.ack(message);
				},

				onAudioMessage: (message) => {
					console.log("onAudioMessage", message);
					if (message) {
						if (this.onMessageError(message)) {
							msgStorage.saveReceiveMsg(message, msgType.AUDIO);
						}
						this.calcUnReadSpot(message);
						this.ack(message);
					}
				},

				onCmdMessage: (message) => {
					console.log("onCmdMessage", message);
					if (message) {
						if (this.onMessageError(message)) {
							msgStorage.saveReceiveMsg(message, msgType.CMD);
						}
						this.calcUnReadSpot(message);
						this.ack(message);
					}
				},

				// onLocationMessage: (message)=>{
				// 	console.log("Location message: ", message);
				// 	if(message){
				// 		msgStorage.saveReceiveMsg(message, msgType.LOCATION);
				// 	}
				// },

				onTextMessage: (message) => {
					console.log("onTextMessage", message);
					if (message) {
						if (this.onMessageError(message)) {
							msgStorage.saveReceiveMsg(message, msgType.TEXT);
						}
						this.calcUnReadSpot(message);
						this.ack(message);
					}
				},

				onEmojiMessage: (message) => {
					console.log("onEmojiMessage", message);
					if (message) {
						if (this.onMessageError(message)) {
							msgStorage.saveReceiveMsg(message, msgType.EMOJI);
						}
						this.calcUnReadSpot(message);
						this.ack(message);
					}
				},

				onPictureMessage: (message) => {
					console.log("onPictureMessage", message);
					if (message) {
						if (this.onMessageError(message)) {
							msgStorage.saveReceiveMsg(message, msgType.IMAGE);
						}
						this.calcUnReadSpot(message);
						this.ack(message);
					}
				},

				onFileMessage: (message) => {
					console.log('onFileMessage', message);
					if (message) {
						if (this.onMessageError(message)) {
							msgStorage.saveReceiveMsg(message, msgType.FILE);
						}
						this.calcUnReadSpot(message);
						this.ack(message);
					}
				},

				// 各种异常
				onError: (error) => {
					console.log(error)
					// 16: server-side close the websocket connection
					if (error.type == this.$im.statusCode.WEBIM_CONNCTION_DISCONNECTED && !logout) {
						if (this.$im.conn.autoReconnectNumTotal < this.$im.conn.autoReconnectNumMax) {
							return;
						}
						uni.showToast({
							title: "server-side close the websocket connection",
							duration: 1000
						});
						uni.redirectTo({
							url: "../login/login"
						});
						logout = true
						return;
					}
					// 8: offline by multi login
					if (error.type == this.$im.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
						uni.showToast({
							title: "offline by multi login",
							duration: 1000
						});
						uni.redirectTo({
							url: "../login/login"
						});
					}
					if (error.type == this.$im.statusCode.WEBIM_CONNCTION_OPEN_ERROR) {
						disp.fire("em.xmpp.error.passwordErr");
						// uni.showModal({
						// 	title: "用户名或密码错误",
						// 	confirmText: "OK",
						// 	showCancel: false
						// });
					}
					if (error.type == this.$im.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
						disp.fire("em.xmpp.error.tokenErr");
					}
					if (error.type == 'socket_error') { ///sendMsgError
						console.log('socket_errorsocket_error', error)
						uni.showToast({
							title: "网络已断开",
							icon: 'none',
							duration: 2000
						});
						disp.fire("em.xmpp.error.sendMsgErr", error);
					}
				},
			});

			// #ifdef H5
			if (!this.$im.conn.isOpened() && uni.getStorageSync("myToken") && uni.getStorageSync("myUsername")) {
				is_reconnect = true;
				// this.$helper.toast('loading', '自动登陆中...', 10000, true);
				//尝试使用token重新登陆
				this.$conn.open({
					apiUrl: this.$im.config.apiURL,
					user: uni.getStorageSync("myUsername"),
					accessToken: uni.getStorageSync("myToken"),
					appKey: this.$im.config.appkey
				});
			}
			// #endif


			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary') //竖屏正方向锁定

			const updated = uni.getStorageSync('updated') // 尝试读取storage

			if (updated.completed === true) { // 如果上次刚更新过
				// 删除安装包及安装记录
				console.log('安装记录被删除，更新成功')
				uni.removeSavedFile({
					filePath: updated.packgePath,
					success: (res) => {
						uni.removeStorageSync('updated')
					}
				})
			} else if (updated.completed === false) {
				uni.removeStorageSync('updated')
				plus.runtime.install(updated.packgePath, {
					force: true
				})
				uni.setStorage({
					key: 'updated',
					data: {
						completed: true,
						packgePath: updated.packgePath
					},
					success: (res) => {
						console.log('成功安装上次的更新，应用需要重启才能继续完成')
					}
				})
				uni.showModal({
					title: '提示',
					content: '应用将重启以完成更新',
					showCancel: false,
					complete: () => {
						plus.runtime.restart()
					}
				})
			} else {
				// 检查更新，参数：{ 当前版本号，跳转到更新页面的url }
				checkUpdater(this.$current.id, '/pagesA/update/index')
			}
			var info = plus.push.getClientInfo();
			console.log(JSON.stringify(info));
			/* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/
			plus.push.addEventListener("click", function(msg) {
				console.log("click:" + JSON.stringify(msg));
				console.log(msg.payload);
				console.log(JSON.stringify(msg));
				
				//这里可以写跳转业务代码
			}, false);
			// 监听在线消息事件    
			plus.push.addEventListener("receive", function(msg) {
				// plus.ui.alert(2);  
				//这里可以写跳转业务代码
				console.log("recevice:" + JSON.stringify(msg))
			}, false);

			// #endif
			// // #ifdef MP-WEIXIN
			// const updateManager = uni.getUpdateManager();

			// updateManager.onCheckForUpdate(function (res) {

			//   // 请求完新版本信息的回调
			//   console.log("res.hasUpdate",res.hasUpdate);
			// });

			// updateManager.onUpdateReady(function (res) {
			//   uni.showModal({
			//     title: '更新提示',
			//     content: '新版本已经准备好，是否重启应用？',
			//     success(res) {
			//       if (res.confirm) {
			//         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			//         updateManager.applyUpdate();
			//       }
			//     }
			//   });

			// });

			// updateManager.onUpdateFailed(function (res) {
			//   // 新的版本下载失败
			// });
			// // #endif
		},
		onShow: function() {
			// #ifdef MP-WEIXIN
			const updateManager = uni.getUpdateManager();

			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				console.log("res.hasUpdate", res.hasUpdate);
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function(res) {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success(res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});

					});

					updateManager.onUpdateFailed(function(res) {
						// 新的版本下载失败
					});
				}
			});


			// #endif
		},
		// onHide: function() {
		// 	console.log('App Hide')
		// }
		methods: {
		
			onLoginSuccess(){
				uni.hideToast();
				uni.switchTab({
					url: "../chat/chat"
				});
			},
			
			ack(receiveMsg){
				// 处理未读消息回执
				var bodyId = receiveMsg.id;         // 需要发送已读回执的消息id
				var ackMsg = new this.$im.message("read", this.$im.conn.getUniqueId());
				ackMsg.set({
					id: bodyId,
					to: receiveMsg.from
				});
				this.$im.conn.send(ackMsg.body);
			},
			
			onMessageError(err){
				if(err.type === "error"){
					uni.showToast({
						title: err.errorText
					});
					return false;
				}
				return true;
			},
			
			getCurrentRoute(){
				let pages = getCurrentPages();
				let currentPage = pages[pages.length - 1];
				return currentPage.route;
			},
			
			calcUnReadSpot(message){
				let myName = uni.getStorageSync("myUsername");
				let members = uni.getStorageSync("member") || []; //好友
				var listGroups = uni.getStorageSync('listGroup')|| []; //群组
				let allMembers = members.concat(listGroups)
				let count = allMembers.reduce(function(result, curMember, idx){
					let chatMsgs;
					if (curMember.roomId) {
						chatMsgs = uni.getStorageSync(curMember.roomId + myName.toLowerCase()) || [];
					}else{
						chatMsgs = uni.getStorageSync(curMember.name.toLowerCase() + myName.toLowerCase()) || [];
					}
					return result + chatMsgs.length;
				}, 0);
				this.$options.globalData.unReadMessageNum = count;
				disp.fire("em.xmpp.unreadspot", message);
			},
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>

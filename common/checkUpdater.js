export function checkUpdater(currentId, updaterPage) {
	uni.request({
			url: 'https://xin.yiyunoto.com/api/index/getAppConfig',
			method: 'GET',

			success: res => {
				
				if (res.statusCode === 200) {
				
					const response = res.data.data
					const latestId = response.newversion
					const method = response.enforce
						
					if (!latestId) {
					
					} else if (currentId < latestId && method === 1) {
						
						//  如果需要背地（静默）热更新，获取下载地址


						const iosLink = response.iosLink
						let androidLink=''
						if (!response.pkgurl)
							androidLink = response.wgturl
						else androidLink = response.pkgurl
						let downloadLink = ''
						let ready = false
						// 判断系统类型
						if (plus.os.name.toLowerCase() === 'android') {
						
							if (androidLink && androidLink !== '#') { // 我这里默认#也是没有地址，请根据业务自行修改
								
								// 安卓：创建下载任务
								if (androidLink.match(RegExp(/.wgt/))) {
									
									downloadLink = androidLink
									ready = true
								} else {
									// console.log('安卓推荐.wgt强制更新，.apk的强制更新请您自行修改程序')
								}
							} else {
								// console.log('下载地址是空的，无法继续')
							}
						} else {
							
							if (iosLink && iosLink !== '#') { // 我这里默认#也是没有地址，请根据业务自行修改
								
								// 苹果(A)：进行热更新（如果iosLink是wgt更新包的下载地址）判断文件名中是否含有.wgt
								if (iosLink.match(RegExp(/.wgt/))) {
									
									downloadLink = iosLink
									ready = true
								} else {
									
								}
							} else {
								
							}
						}
						if (ready) {
								let downloadTask = uni.downloadFile({
								url: downloadLink,
								success: (res) => {
									if (res.statusCode === 200) {
										// 保存下载的安装包
										console.log('保存安装包')
										uni.saveFile({
											tempFilePath: res.tempFilePath,
											success: (res) => {
												const packgePath = res.savedFilePath
												// 保存更新记录到stroage，下次启动app时安装更新
												uni.setStorage({
													key: 'updated',
													data: {
														completed: false,
														packgePath: packgePath
													},
													success: () => {
														console.log('成功保存记录')
													}
												})
												// 任务完成，关闭下载任务
												console.log('任务完成，关闭下载任务，下一次启动应用时将安装更新')
												downloadTask.abort()
												downloadTask = null
											}
										})
									}
								}
							})
						} else {
							// console.log('下载地址未准备，无法开启下载任务')
						}


					} else if (currentId < latestId) {
						// console.log('检测到更新')
						  var baiwei=parseInt(latestId/100); 
						    var shiwei=parseInt((latestId%100)/10); 
						        var gewei=parseInt(latestId%10);  
						uni.showModal({
							title: '发现新版本',
							content: '有新版本可用 (版本号:' +baiwei + '.'+shiwei+'.'+gewei+')，请问您是否更新？',
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url: updaterPage
									})
								} else if (res.cancel) {
									console.log('取消')
								}
							}
						})
					} else {
						// console.log('现在是最新版本')
					}
				}

			}})
	}

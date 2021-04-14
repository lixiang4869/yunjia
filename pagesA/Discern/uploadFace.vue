<template>
	<view class="page" :style="{width:width+'px',height:height+'px'}">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="nav">
			<image @click="backPage" class="backImg" src="../../static/public/blackBack.png" mode=""></image>
			<text class="title">人脸识别</text>
			<text @click="submitData" style="color: #0086F9;font-size: 30upx;margin-right: 20upx;">完成</text>
		</view>
		<view class="content" :style="{width:width+'px',height:height-85+'px'}">
			<view class="item" :style="{width:width+'px',height:(height-85)/11+'px'}">
				<text class="contentTitle">邀请人电话</text>
				<input class="inpTxt" type="number" @blur='inpBlur($event,1)' placeholder="请输入邀请人电话" v-model="inpData.phone" />
			</view>
			<view class="item" :style="{width:width+'px',height:(height-85)/11+'px'}">
				<text class="contentTitle">邀请人姓名</text>
				<input class="inpTxt" type="text" placeholder="请输入姓名" v-model="inpData.name" />
			</view>
			<view class="item" :style="{width:width+'px',height:(height-85)/11+'px'}">
				<text class="contentTitle">身份证字号</text>
				<input class="inpTxt" type="idcard" @blur='inpBlur($event,3)' placeholder="请输入身份证号" v-model="inpData.idNum" />
			</view>
			<view class="item" :style="{width:width+'px',height:(height-85)/11+'px'}">
				<text class="contentTitle">性别</text>
				<radio-group class="radioGroup" @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" style="display: flex;" v-for="(item, index) in sex" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view style="font-size: 30upx;color: #999;">{{item.txt}}</view>
					</label>
				</radio-group>
			</view>
			<view class="item" :style="{width:width+'px',height:(height-85)/11+'px'}">
				<text class="contentTitle">联系电话</text>
				<input class="inpTxt" type="number" @blur='inpBlur($event,2)' placeholder="请输入联系电话" v-model="inpData.tel" />
			</view>
			<view class="item" :style="{width:width+'px',height:(height-85)/11+'px'}">
				<text class="contentTitle">来访事由</text>
				<input class="inpTxt" type="text" placeholder="请输入来访事由" v-model="inpData.reason" />
			</view>
			<view class="item" :style="{width:width+'px',height:(height-85)/11+'px'}">
				<text class="contentTitle">是否开车</text>
				<radio-group class="radioGroup" @change="radioHaveCart">
					<label class="uni-list-cell uni-list-cell-pd" style="display: flex;" v-for="(item, index) in haveCart" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === isHaveCart" />
						</view>
						<view>{{item.txt}}</view>
					</label>
				</radio-group>
			</view>
			<view class="item" :style="{width:width+'px',height:(height-85)/11+'px'}">
				<text class="contentTitle">来访时间</text>
				<view class="selectBtnBox" :style="{height:(height-85)/11+'px'}" @click="open(1)">
					<!-- <text class="selectBtnTxt" v-if="!visible0">选择起止时间</text> {{hour1}}时{{minute1}}分 -->
					<text class="selectBtnTxt">{{data1?data1:'请选择'}}</text>
					<image class="selectBtnImg" src="../../static/discern/down.png"></image>
				</view>
			</view>
			<view class="item" :style="{width:width+'px',height:(height-85)/11+'px'}" @click="open(2)">
				<text class="contentTitle">离开时间</text>
				<view class="selectBtnBox" :style="{height:(height-85)/11+'px'}">
					<!-- <text class="selectBtnTxt" v-if="!visible0">选择起止时间</text> {{hour2}}时{{minute2}}分 -->
					<text class="selectBtnTxt">{{data2?data2:'请选择'}}</text>
					<image class="selectBtnImg" src="../../static/discern/down.png"></image>
				</view>
			</view>
			<view v-if="loadImg == 0" class="itemBtn" :style="{width:width+'px',height:(height-85)/11+'px'}" @click="selectImg">
				<image class="camera" src="../../static/video/camera.png"></image>
				<text class="itemBtnTxt">上传人脸照片</text>
			</view>
			<view v-if="loadImg == 1" class="itemBtn" :style="{width:width+'px',height:(height-85)/11+'px'}" @click="selectImg">
				<image class="camera" src="https://xin.yiyunoto.com/uploads/static/discern/success.png"></image>
				<text class="itemBtnTxt">上传成功</text>
			</view>
			<view v-if="loadImg == -1" class="itemBtn" :style="{width:width+'px',height:(height-85)/11+'px'}" @click="selectImg">
				<text class="itemBtnTxt" style="color: #FA436A;margin-left: 0upx;">图片上传失败</text>
			</view>
		</view>
		
		<uni-popup ref="popup" type="bottom">
			<view class="but">
				<text @click="close">取消</text>
				<text @click="ok">确定</text>
			</view>
			<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in hours" :key="index">{{item}}时</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in mins" :key="index">{{item}}分</view>
				</picker-view-column>
			</picker-view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components:{
			uniPopup
		},
		data() {
			let defaultvalue = this.default;
			let value = [9999, 99, 99, 99, 99];
			if (defaultvalue == 'end') {
				value = [9999, 99, 99, 99, 99]
			} else if (defaultvalue == 'start') {
				value = [0, 0, 0, 0, 0]
			}
			return {
				width:'',
				height:'',
				inpData:{phone:'',name:'',idNum:'',tel:'',reason:'',isCar:1,sex:0},
				sex:[{value:0,txt:'男'},{value:1,txt:'女'}],
				current: 0,
				haveCart:[{value:1,txt:'是'},{value:0,txt:'否'}],
				isHaveCart:1,
				imgPath:'',
				loadImg:0,
				wuyeurl:this.$store.state.wuyeurl,
				
				data1: '',
				data2:'',
				start: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+' '+new Date().getHours()+':'+new Date().getMinutes(),
				end: (new Date().getFullYear()+100)+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+' '+new Date().getHours()+':'+new Date().getMinutes(),
				default: '',
				
				title: 'picker-view',
				years: [],
				year: '',
				months: [],
				month: '',
				days: [],
				day: '',
				hours: [],
				hour: '',
				mins: [],
				min: '',
				value,
				valueStr: '',
				visible: true,
				strYMDHM: '',
				indicatorStyle: `height: 80rpx;`,
				
				clickNum:0
			}
		},
		onReady() {
			this.socketTask = uni.connectSocket({
				url: 'wss://wuye.yiyunoto.com/wss',
				success(data) {
					console.log("websocket连接成功");
				},
			});
			this.socketTask.onOpen((res) => {
				console.log("WebSocket连接正常打开中...！");
			})
		},
		created() {
			this.getVideoXY();
		},
		beforeDestroy() {
			this.closeSocket();
		},
		watch: {
			year() {
				this.amend();
			},
			month() {
				this.amend();
			},
			day() {
				this.amend();
			},
			hour() {
				this.amend();
			},
			min() {
				this.amend();
			},
			years(n, m) {
				if (n.toString() != m.toString()) {
					this.amend();
				}
			},
			months(n, m) {
				if (n.toString() != m.toString()) {
					this.amend();
				}
			},
			days(n, m) {
				if (n.toString() != m.toString()) {
					this.amend();
				}
			},
			hours(n, m) {
				if (n.toString() != m.toString()) {
					this.amend();
				}
			},
			mins(n, m) {
				if (n.toString() != m.toString()) {
					this.amend();
				}
			}
		},
		methods: {
			open(i) {
				this.clickNum = i;
				let start;
				if (this.start) {
					start = this.start.replace(/-/g, "/")
					start = new Date(start);
				} else {
					start = new Date(0);
				}
				let starty = start.getFullYear(); //开始年份
				let end;
				if (this.end) {
					end = this.end.replace(/-/g, "/")
					end = new Date(end);
				} else {
					end = new Date();
				}
				if (start > end) {
					uni.showToast({
						title: '时间范围错误！',
						icon: 'none',
						duration: 2000
					});
					return false
				}
			
				this.$forceUpdate();
				if (this.valueStr) {
					this.value = JSON.parse(this.valueStr);
					setTimeout(this.amend, 100)
					this.$refs.popup.open()
				} else {
					setTimeout(this.amend, 100)
					this.$refs.popup.open()
				}
			},
			close() {
				this.$refs.popup.close()
			},
			ok() {
				let day = this.day < 10 ? '0' + this.day : this.day,
					month = this.month < 10 ? '0' + this.month : this.month,
					hour = this.hour < 10 ? '0' + this.hour : this.hour,
					min = this.min < 10 ? '0' + this.min : this.min
				let data = this.year + '-' + month + '-' + day + ' ' + hour + ':' + min;
				// this.$emit("rundata", data)
				if(this.clickNum == 1){
					this.data1 = data;
				}else{
					this.data2 = data;
				}
				this.$refs.popup.close()
			},
			bindChange: function(e) {
				let val = e.detail.value
				this.valueStr = JSON.stringify(val);
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
				this.hour = this.hours[val[3]]
				this.min = this.mins[val[4]]
			},
			//数据校正
			amend() {
				if (this.valueStr) {
					let val = JSON.parse(this.valueStr);
					this.year = this.years[val[0]]
					this.month = this.months[val[1]]
					this.day = this.days[val[2]]
					this.hour = this.hours[val[3]]
					this.min = this.mins[val[4]]
				}
				let start;
				if (this.start) {
					start = this.start.replace(/-/g, "/")
					start = new Date(start);
				} else {
					start = new Date(0);
				}
				let starty = start.getFullYear(); //开始年份
				let startm = start.getMonth() + 1; //开始月份
				let startd = start.getDate(); //开始天
				let starth = start.getHours(); //开始小时
				let startmin = start.getMinutes(); //开始分钟
				let end;
				if (this.end) {
					end = this.end.replace(/-/g, "/")
					end = new Date(end);
				} else {
					end = new Date();
				}
				let endy = end.getFullYear(); //终止年份
				let endm = end.getMonth() + 1; //终止月份
				let endd = end.getDate(); //终止天
				let endh = end.getHours(); //终止小时
				let endmin = end.getMinutes(); //终止分钟
				//如果选择起始年份
				let years = [],
					months = [],
					days = [],
					hours = [],
					mins = [];
				let month31 = [1, 3, 5, 7, 8, 10, 12],
					month30 = [4, 6, 9, 11];
				let daysNum;
				for (let i = starty; i <= endy; i++) {
					years.push(i)
				}
				if (month31.indexOf(this.month) > -1) {
					daysNum = 31
				} else if (month30.indexOf(this.month) > -1) {
					daysNum = 30
				} else {
					if (this.year % 4 == 0) {
						daysNum = 29
					} else {
						daysNum = 28
					}
				}
				let defaultvalue = this.default;
				let defaulty = endy,
					defaultm = endm,
					defaultd = endd,
					defaulth = endh,
					defaultmin = endmin;
				if (defaultvalue == 'end') {
					defaulty = endy;
					defaultm = endm;
					defaultd = endd;
					defaulth = endh;
					defaultmin = endmin;
				} else if (defaultvalue == 'start') {
					defaulty = starty;
					defaultm = startm;
					defaultd = startd;
					defaulth = starth;
					defaultmin = startmin;
				}
				//当数值异常是设施默认
				if (!this.year) {
					this.year = defaulty
				}
				if (!this.month) {
					this.month = defaultm
				}
				if (!this.day) {
					this.day = defaultd
				}
				if (!this.hour && this.hour !== 0) {
					this.hour = defaulth
				}
				if (!this.min && this.min !== 0) {
					this.min = defaultmin
				}
				//判断年份是在起始年
				if (this.year == starty) {
					//判断起始年份和终止年份是否相等
					if (starty == endy) {
						//如果等，那么月份取两者中间
						for (let i = startm; i <= endm; i++) {
							months.push(i)
						}
						//判断月份是在起始月
						if (this.month == startm) {
							//判断起始月和终止月是否相等
							if (startm == endm) {
								//如果等，那么天数取两者中间
								for (let i = startd; i <= endd; i++) {
									days.push(i)
								}
								//判断日是在起始日
								if (this.day == startd) {
									//判断起始ri和终止日是否相等
									if (startd == endd) {
										//如果等，那么小时取两者中间
										for (let i = starth; i <= endh; i++) {
											hours.push(i)
										}
										//判断小时是在起始小时
										if (this.hour == starth) {
											//判断起始和终止是否相等
											if (starth == endh) {
												//如果等，那么分钟取两者中间
												for (let i = startmin; i <= endmin; i++) {
													mins.push(i)
												}
											} else {
												//如果不等，到59
												for (let i = startmin; i <= 59; i++) {
													mins.push(i)
												}
											}
										} else {
											//判断小时是否在截止小时
											if (this.hour == endh) {
												//终止小时取到截止分钟
												for (let i = 0; i <= endmin; i++) {
													mins.push(i)
												}
											}
										}
									} else {
										//如果不等，到23小时
										for (let i = starth; i <= 23; i++) {
											hours.push(i)
										}
										//判断小时是在起始小时
										if (this.hour == starth) {
											for (let i = startmin; i <= 59; i++) {
												mins.push(i)
											}
										}
									}
								} else {
									//判断日是否在截止日
									if (this.day == endd) {
										//终止日取到截止小时
										for (let i = 0; i <= endh; i++) {
											hours.push(i)
										}
										//判断小时是否在截止小时
										if (this.hour == endh) {
											//终止小时取到截止分钟
											for (let i = 0; i <= endmin; i++) {
												mins.push(i)
											}
										}
									}
								}
							} else {
								//如果不等，
								for (let i = startd; i <= daysNum; i++) {
									days.push(i)
								}
								if (this.day == startd) {
									for (let i = starth; i <= 23; i++) {
										hours.push(i)
									}
									//判断小时是在起始小时
									if (this.hour == starth) {
										for (let i = startmin; i <= 59; i++) {
											mins.push(i)
										}
									}
								}
							}
						} else {
							//判断月份是在终止月
							if (this.month == endm) {
								//终止月取到截止天
								for (let i = 1; i <= endd; i++) {
									days.push(i)
								}
								//判断日是否在截止日
								if (this.day == endd) {
									//终止日取到截止小时
									for (let i = 0; i <= endh; i++) {
										hours.push(i)
									}
									//判断小时是否在截止小时
									if (this.hour == endh) {
										//终止小时取到截止分钟
										for (let i = 0; i <= endmin; i++) {
											mins.push(i)
										}
									}
								}
							}
						}
					} else {
						//如果不等，去开始到12月份
						for (let i = startm; i <= 12; i++) {
							months.push(i)
						}
						//判断月份是在起始月
						if (this.month == startm) {
							//是，取天数之后
							for (let i = startd; i <= daysNum; i++) {
								days.push(i)
							}
							//判断日是在起始日
							if (this.day == startd) {
								//是，qu起始小时之后
								for (let i = starth; i <= 23; i++) {
									hours.push(i)
								}
								//判断小时是在起始小时
								if (this.hour == starth) {
									//是，qu起始分钟之后
									for (let i = startmin; i <= 59; i++) {
										mins.push(i)
									}
								}
							}
						}
					}
				} else if (this.year == endy) {
					//年份中终止年
					//月份取到终止月
					for (let i = 1; i <= endm; i++) {
						months.push(i)
					}
					//判断月份是在终止月
					if (this.month == endm) {
						//终止月取到截止天
						for (let i = 1; i <= endd; i++) {
							days.push(i)
						}
						//判断日是否在截止日
						if (this.day == endd) {
							//终止日取到截止小时
							for (let i = 0; i <= endh; i++) {
								hours.push(i)
							}
							//判断小时是否在截止小时
							if (this.hour == endh) {
								//终止小时取到截止分钟
								for (let i = 0; i <= endmin; i++) {
									mins.push(i)
								}
							}
						}
					}
				} else {
					for (let i = 1; i <= 12; i++) {
						months.push(i)
					}
					for (let i = 1; i <= daysNum; i++) {
						days.push(i)
					}
					for (let i = 0; i <= 23; i++) {
						hours.push(i)
					}
					for (let i = 0; i <= 59; i++) {
						mins.push(i)
					}
				}
				if (months.length == 0) {
					for (let i = 1; i <= 12; i++) {
						months.push(i)
					}
				}
				if (days.length == 0) {
					for (let i = 1; i <= daysNum; i++) {
						days.push(i)
					}
				}
				if (hours.length == 0) {
					for (let i = 0; i <= 23; i++) {
						hours.push(i)
					}
				}
				if (mins.length == 0) {
					for (let i = 0; i <= 59; i++) {
						mins.push(i)
					}
				}
				this.years = years;
				this.months = months;
				this.days = days;
				this.hours = hours;
				this.mins = mins;
				this.$forceUpdate();
			},
			
			// 获取视口宽高
			getVideoXY(){
				let res = uni.getSystemInfoSync()
				console.log(res);
				this.width = res.windowWidth;
				this.height = res.windowHeight;
			},
			// 返回上一页
			backPage(){
				uni.navigateBack({
					delta:1
				})
			},
			// 性别单选事件
			radioChange: function(evt) {
				for (let i = 0; i < this.sex.length; i++) {
					if (this.sex[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
				console.log(evt.target.value)
			},
			// 是否开车单选事件
			radioHaveCart: function(evt){
				for (let i = 0; i < this.haveCart.length; i++) {
					if (this.haveCart[i].value === evt.target.value) {
						this.isHaveCart = i;
						break;
					}
				}
				console.log(evt.target.value);
			},
			// 拍照
			selectImg(){
				var that = this;
				uni.chooseImage({
					count:1,
					sourceType:['camera'],
					success(obj) {
						var path = obj.tempFiles[0].path;
						console.log(path);
						uni.uploadFile({
							url:that.wuyeurl+'/api/wuye/file/faceUpload',
							filePath:path,
							name:"image",
							formData:{
								image:path
							},
							success(res) {
								var data = JSON.parse(res.data);
								if(data.code==10000){
									that.loadImg = 1;
									that.imgPath = data.data.image;
								}else{
									that.loadImg = -1;
								}
							}
						})
					},
					fail(e){
						that.loadImg = -1;
					}
				})
			},
			// 关闭websocket【离开这个页面的时候执行关闭】
			closeSocket() {
				var that = this;
				that.socketTask.close({
					success(res) {
						that.is_open_socket = false;
						console.log("关闭成功", res)
					},
					fail(err) {
						console.log("关闭失败", err)
					}
				})
			},
			// 完成
			submitData(){
				var that = this;
				uni.showLoading({
					title:'加载中'
				})
				var settime = setTimeout(()=>{
					uni.showLoading();
					uni.showToast({
						icon:"none",
						title:"上传失败，请重新上传"
					})
				},30000)
				for(var key in this.inpData){
					if(this.inpData[key]===''){
						console.log(this.inpData[key])
						uni.showToast({
							icon:'none',
							title:'内容不能为空！'
						})
						return;
					}
				}
				if(this.loadImg == 1){
					uni.request({
						url:that.wuyeurl+'/api/wuye/file/faceVisitorImageUpload',
						method:"POST",
						data:{
							member_tel:that.inpData.phone,
							name:that.inpData.name,
							nric:that.inpData.idNum,
							tel:that.inpData.tel,
							action:that.inpData.reason,
							car_type:that.haveCart[that.isHaveCart].value,
							begin_time:that.data1,
							end_time:that.data2,
							sex:that.sex[that.current].value,
							image:that.imgPath
						},
						success(res) {
							uni.hideLoading()
							uni.showToast({
								icon:'none',
								title:res.data.desc
							})
							clearTimeout(settime);
							var arr = res.data.data;
							if(arr.length>0){
								for(var i=0;i<arr.length;i++){
									console.log(arr[i])
									that.socketTask.send({
										data: JSON.stringify(res.data.data[i]),
										async success(){
											console.log('消息发送成功')
										}
									})
								}
							}
						}
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'请先上传图片'
					})
				}
			},
			// 验证手机号、身份证号格式
			inpBlur(e,index){
				if(index==1){
					if(this.inpData.phone != ''){
						if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.inpData.phone))){
							uni.showToast({
								icon:'none',
								title:'手机号格式不正确'
							})
							this.inpData.phone = ''
						}
					}else{
						uni.showToast({
							icon:'none',
							title:'请输入手机号'
						})
					}
				}else if(index == 2){
					if(this.inpData.tel != ''){
						if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.inpData.tel))){
							uni.showToast({
								icon:'none',
								title:'手机号格式不正确'
							})
							this.inpData.tel = ''
						}
					}else{
						uni.showToast({
							icon:'none',
							title:'请输入手机号'
						})
					}
				}else if(index == 3){
					if(this.inpData.idNum != ''){
						if(!(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(this.inpData.idNum))){
							uni.showToast({
								icon:'none',
								title:'身份证号格式不正确'
							})
							this.inpData.tel = ''
						}
					}else{
						uni.showToast({
							icon:'none',
							title:'请输入身份证号'
						})
					}
				}
			}
		}
	}
</script>

<style>
.page{
}
/* 去掉刘海 */
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
	padding-top: 60upx;
}
/* 导航栏 */
.nav{
	width: 100%;
	height: 80upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
}
.backImg{
	width: 50upx;
	height: 50upx;
	margin-left: 20upx;
}
.title{
	font-size: 36upx;
	color: #333;
}
/* 内容部分 */
.item{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 10upx;
	box-sizing: border-box;
	box-shadow: 0upx 1upx 1upx 0upx rgba(0,0,0,0.1);
}
.contentTitle{
	font-size: 30upx;
	color: #333;
}
.radioGroup{
	display: flex;
	flex-direction: row;
}

.itemBtn{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: #F4F4F4;
}
.camera{
	width: 65upx;
	height: 48upx;
}
.itemBtnTxt{
	color: #999;
	font-size: 30upx;
	margin-left: 48upx;
}
.selectBtnBox{
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	margin-right: 20upx;
}
.selectBtnTxt{
	color: #999;
	font-size: 30upx;
}
.selectBtnImg{
	width: 30upx;
	height: 30upx;
	margin-left: 10upx;
}
.inpTxt{
	color: #999;
	font-size: 30upx;
	text-align: right;
}

.but {
	background: #fff;
	height: 80rpx;
	line-height: 80rpx;
	padding: 0 30rpx;
	border-bottom: 1px solid #f0f0f0;
	text-align: left;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

picker-view {
	width: 100%;
	background: #fff;
	height: 600rpx;
	text-align: center;
}
</style>

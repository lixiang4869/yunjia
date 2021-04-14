<template>
	<view class="content" :style="{width:width,height:height}">
		
		<image :src="url+'/uploads/static/my/cashbg.png'"  mode="scaleToFill"  :style="{width:width,height:height,position: absolute}"></image>
		<image @click="back" src="../../../static/bao/fantoo.png" style="z-index: 9999; width: 50rpx; height: 50rpx;position: fixed;top: 50rpx;left: 20rpx;"></image>
		
		<view style="display: flex;flex-direction: column; width: 100%;height: 100%;z-index: 999;position: absolute;align-items: center;
		top: 0;left: 0;">
		
		<image :src="getImgUrl(info.headimg)" style="width: 180rpx;height: 180rpx; margin-top: 90rpx;border-radius: 50%;"></image>
		<view class="cityhhren">
			<view class="title">{{info.nickname}}</view>
			<view class="title">{{info.log_first.addtime}}</view>
			<view class="title" style="font-size: 40rpx;">本次提现金额:  ￥{{info.log_first.change}}</view>
			<view class="title">上次提现金额及日期</view>
			<view class="title">{{info.log_second.addtime}} ￥{{info.log_second.change}}</view>
		</view>
		<!-- <image :src="url+'/uploads/static/my/redpage.png'" style="width: 500rpx;" mode="widthFix"></image> -->
		
		</view>
		<!-- <image :src="url+'/uploads/static/my/yun.png'" style="width: 100%;height: 254rpx; position: fixed;bottom: 0;left: 0;z-index: 1000;" mode="widthFix"></image> -->
		
	</view>
</template>

<script>
	
	import request from "../../../store/http.js"
		
	export default {
		data() {
			return {
				absolute:"absolute",
				list:[""],
				listShow:false,
				isShowType: true,
				
				url:this.$store.state.url,
				imgurl:"",
				width:'',
				height:'',
				img:'',
				cityPickerValue: [0, 0, 0],
				themeColor: '#007AFF',
				region: {
					label: "请点击选择地址",
					value: [],
					cityCode: ''
				},
				phone:'',
				goods_id:'',
				province:null,
				city:410100,
				area:'',
				price:"",
				community:"",
				checked:false,
				ID:"",
				info:null
			}
		},
		
		onLoad() {
			
			this.getVideoXY();
			this.getData();
		
		},
		onShow() {
		},
		onShareAppMessage() {
			return {
				title:"我这次提现了￥"+this.info.log_first.change,
				
				path: 'pages/My/Cash/CashResult'
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					
				})
			},
			getImgUrl(url){
				if(url.search('http')==-1){url="https://xin.yiyunoto.com"+url}
				return url
			},
			getData(){
				uni.showLoading({
					
				})
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(this.url+"/api/partner/assetslogShare",{},{authtoken:authtoken},"POST",res=>{
					uni.hideLoading()
					if(res.data.code==1){
						this.info =res.data.data;
						
					}
					
					else this.info =null
					// this.isShowType=true
				})
			},
			getInfoById(){
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(this.url+"/api/partner/checkUpUser",{mid:this.ID},{authtoken:authtoken},"POST",res=>{
					if(res.data.code==1){
						this.info =res.data.data;
						this.ID= this.info.id
					}
					
					else this.info =null
					// this.isShowType=true
				})
			},
			goXieYi(){
			uni.navigateTo({
				url:"../../xieyi/image?title=社区合伙人协议&src="+"https://xin.yiyunoto.com/village.png"
			})
				
			},
			getCommunity(name){
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(this.url+"/api/partner/matchCommunityName",{name:name},{authtoken:authtoken},"POST",res=>{
					this.list = res.data.data;
					this.listShow=true
					this.$forceUpdate();
					// this.isShowType=true
				})
			},
			getOpenArea(citycode){
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(this.url+"/api/partner/getUsedArea",{citycode:citycode},{authtoken:authtoken},"POST",res=>{
				
					this.$refs.mpvueCityPicker.setData( res.data.data);
					this.$forceUpdate();
					// this.isShowType=true
				})
			},
			getOpenCity(code){
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(this.url+"/api/partner/getUsedCity",{provincecode:code},{authtoken:authtoken},"POST",res=>{
					if(res.data.code==1){
						this.$refs.mpvueCityPicker.setCityData( res.data.data);
					this.$forceUpdate();
					}
					
					// this.isShowType=true
				})
			},
			getValue(e){
				this.community=e.target.value;
				this.getCommunity(e.target.value);
			},
			changeType({newVal, oldVal, index, orignItem}){
				// console.log("changeType",newVal+"  22"+index)
				this.community=newVal;
			},
			select(){
				this.checked=!this.checked
			},
			onCancel(e) {
				console.log(e)
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show();
			},
			// 获取选中的省市区
			onchang(e){
				console.log("eeeee");
				// this.region = e ;
				// this.province=parseInt(e.ress.province_N)*10000
				// if(this.city!=parseInt(e.ress.city_N)*100){
				// 	this.getOpenArea(parseInt(e.ress.city_N)*100)
				// }
				// this.city=parseInt(e.ress.city_N)*100
				// this.area=e.cityCode
			},
			onConfirm(e) {
				console.log(e);
				this.region = e ;
				if(this.province!=parseInt(e.ress.province_N)*10000){
					this.getOpenCity(parseInt(e.ress.province_N)*10000)
				}
				this.province=parseInt(e.ress.province_N)*10000
				if(this.city!=parseInt(e.ress.city_N)*100){
					this.getOpenArea(parseInt(e.ress.city_N)*100)
				}
				this.city=parseInt(e.ress.city_N)*100
				this.area=e.cityCode
			},
			getVideoXY() {
				let res = uni.getSystemInfoSync()
				this.width = res.windowWidth + 'px';
				this.height = res.windowHeight + 'px';
				console.log("getVideoXY",this.width)
				this.$forceUpdate();
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			
			pay(){
				if(!this.info||!this.info.id){
					uni.showToast({
						title:"请填写正确的推荐人",
						icon:"none"
					})
					return
				}
				if(!this.province){
					uni.showToast({
						title:"请选择区域",
						icon:"none"
					})
					return
				}
				if(!this.community){
					uni.showToast({
						title:"请填写小区名称",
						icon:"none"
					})
					return
				}
				if(!this.checked){
					uni.showToast({
						title:"请勾选协议",
						icon:"none"
					})
					return
				}
				// #ifdef APP-PLUS
				this.payApp();
				// #endif
				// #ifdef MP-WEIXIN
				this.payXiaoChengXu();
				// #endif
			},
			payApp() {
				
				let authtoken = uni.getStorageSync("authtoken");
				uni.request({
			
					url: this.url + "/api/partner/applyNewPartner",
					data: {
						trade_type: 1,
						goods_id: this.goods_id,
						// inviter_phone: this.phone,
						id:this.info.id,
						province:this.province,
						city:this.city,
						area:this.area,
						housing_estate:this.community,
						type:3,
						// from_uid:id
					},
					header: {
						authtoken: authtoken
					},
					method: 'POST',
					success: (res) => {
						uni.hideLoading();
						console.log("返回请求成功", res)
			
			
						// 微信支付
						if (res.data.code == 1) {
							console.log("返回请求成功", res.data.data.noncestr)
							uni.getProvider({
									service: "payment",
									success: (res) => {
										console.log(res);
									}
								}),
								uni.requestPayment({
									provider: 'wxpay',
									orderInfo: {
										"appid": res.data.data.appid,
										"noncestr": res.data.data.noncestr,
										"package": "Sign=WXPay",
										"partnerid": res.data.data.partnerid,
										"prepayid": res.data.data.prepayid,
										"timestamp": res.data.data.timestamp,
										"sign": res.data.data.sign
									},
									success: function(res) {
										
										uni.navigateTo({
											url: './Pay_success'
										})
									},
									fail: function(err) {
			
									}
								});
						}else{
							uni.showToast({
								title:res.data.msg,icon:"none"
							})
						}
					},
					fail: (res) => {
						console.log("请求失败", res)
					}
				})
			},
			payXiaoChengXu() {
				let _this = this;
				uni.login({
					success(e) {
						
						_this.getPayInfo( e.code);
					},
					fail(e) {
						console.log('code', e);
						
					}
			
				})
			},
			getPayInfo( code) {
				let _this =this;
			
				let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + "/api/partner/applyNewPartner", {
						goods_id: this.goods_id,
						id: this.info.id,
						code: code,
						province:this.province,
						city:this.city,
						area:this.area,
						housing_estate:this.community,
						type:3,
							trade_type: 2,
						// from_uid:id
					}, {
						authtoken: authtoken
					}, 'POST', res => {
						console.log(res);
						// 微信支付
						if (res.data.code == 1) {
							console.log("返回请求成功", res.data.data.nonceStr)
							uni.getProvider({
									service: "payment",
									success: (res) => {
										console.log(res);
									}
								}),
			
			
								uni.requestPayment({
									provider: 'wxpay',
			
									"signType": 'MD5',
									"nonceStr": res.data.data.nonceStr,
									"package": res.data.data.package,
			
									"timeStamp": res.data.data.timeStamp,
									"paySign": res.data.data.paySign,
									success: function(res) {
										uni.navigateTo({
											url: './Pay_success'
										})
									},
									fail: function(err) {
										console.log(err);
									}
								});
			
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
			
					});
			
			
			
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		position: relative;
		
	}
	.header{
		position: absolute;
		top: var(--status-bar-height);left: 0;
		width: 100%;
		height: 10%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		box-sizing: border-box;
		z-index: 999;
	}
	.backPage{
		width: 19rpx;
		height: 34rpx;
	}
	.titleTxt{
		font-size: 38rpx;
		color: #FFFFFF;
		font-weight: 700;
	}
	.imgs{
		width: 100%;
		top:200rpx;left: 0;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.img1{
		width: 603rpx;
		height: 482rpx;
	}
	.selectlist{
		width: 100%;
		height: 100%;
		font-size: 34rpx;
		font-weight: 400;
		color: #333333;
	}
	.cityhhren{
		align-items: center;
		display: flex;
		flex-direction: column;
		z-index: 999;
		
		font-size: 30rpx;
		color:#FFE114 ;
		
	}
	.title{
		margin-top: 30rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #FFE114;
	}
	.phone{
		width: 94%;
		
		display: flex;
		flex-direction: row;
		height: 106rpx;
		line-height: 106rpx;
		align-items: center;
		padding-left: 39rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		border-bottom: 1rpx solid #eeeeee;
		
	}
	.phone2{
		width: 94%;
		
		display: flex;
		flex-direction: row;
		height: 106rpx;
		line-height: 106rpx;
		align-items: center;
		padding-left: 39rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		border-bottom: 1rpx solid #eeeeee;
		
	}
	.xian{
		width: 98%;
		height: 1rpx;
		background: #DDDDDD;
		margin:20rpx auto;
	}
	.selCity{
		width: 100%;
		height: 106rpx;
		display: flex;
		border-bottom: 1rpx solid #eeeeee;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.sel{
			height: 106rpx;
			line-height: 106rpx;
			align-items: center;
			padding-left: 39rpx;
			font-size: 34rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
		}
		.city{
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 34rpx;
			align-items: center;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-right: 37rpx;
			image{
				width:14rpx;
				height: 24rpx;
				margin-left: 30rpx;
			}
		}
	}
	.goapply{
		width: 82%;
		margin: 30rpx 9% 30rpx;
		height: 98rpx;
		background: #F32A27;
		border-radius: 8rpx;
		text-align: center;
		line-height: 98rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.yes{
		margin-bottom: 20rpx;
		align-items: center;
		display: flex;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		
	}
</style>
<template>
	<view>
		<!-- 编辑地址 -->
		<view class="content">
			<view class="row">
				<view class="nominal">
					收货人:
				</view>
				<view class="input">
					<input placeholder="请填写收货人姓名" type="text"  v-model="name"/>
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					电话号码:
				</view>
				<view class="input">
					<input placeholder="请输入收件人电话号码" type="text" v-model="tel"/>
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					收货地址:
				</view>
				<view class="input" @tap="chooseCity">
					{{ region.label }}
					<image class="xzdizhi" src="../../static/home/right.png" mode="widthFix" ></image>
				</view>

			</view>
			<view class="row">
				<view class="nominal">选择小区:</view>
				<picker @change="selectXiaoQu" :value="xIndex" :range="list" range-key="name">
					<view class="uni-input">{{list[xIndex].name}}</view>
				</picker>
			
			</view>
			<view class="row">
				<view class="nominal">
					详细地址:
				</view>
				<view class="input">
					<textarea  v-model="detailed" auto-height="true" placeholder="小区和门牌号"></textarea>
				</view>
			</view>
		
		</view>
		<view class="rowress">
			<view class="nominal1">是否为默认收货地址:</view>
		
			<radio-group @change="radioChange" class="radio-group">
				<label class="" v-for="(item, index) in items" :key="item.value">
					<view><radio :value="item.value" :checked="index === current" /></view>
					<view style="margin-right: 20rpx;">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="save" @tap="save">
			<view class="btn">
				保存
			</view>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onChange="onConfirm" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import request from '../../store/http.js';
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				items: [{ value: 2, name: '是' }, { value: 1, name: '否', checked: 'true' }],
				url:this.$store.state.url,
				list: [{
					name: '选择小区'
				}],
				xIndex: 0,
				ress:null,//上一页返回的地址
				name:'',
				tel:'',
				label:'',
				editType: 'edit',
				id: '',
				defaults:2,
				current:1,
				detailed: '',
				isDefault: false,
				cityPickerValue: [0, 0, 0],
				themeColor: '#007AFF',
				region: {
					label: "请点击选择地址",
					value: [],
					cityCode: ""
				}
			};
		},
		onLoad(res){
			
			// console.log(res);
			this.ress = JSON.parse(res.item);
			if(this.ress.defaults==2){
				this.current=0;
				this.isDefault=true;
			}
			this.ress.addr=this.ress.addr.split(',')[2];
			this.list[0].name=this.ress.village_name
			this.list[0].id= this.ress.village_id
			this.region.label = this.ress.addrs;
			this.alterRess();

		},
		methods: {
			selectXiaoQu(e) {
				this.xIndex = e.target.value
			},
			getXiqoQuList() {
				// if(!this.ress.area_N){
				// 	uni.showToast({
				// 		title:"请先选择所在区域",
				// 		icon:"none"
				// 	})
				// 	return
				// }
				var authtoken = uni.getStorageSync("authtoken")
				request.urlRequest(this.url + '/api/guangjie/villagelist', {
					areacode: this.ress.areaId
				}, {
					authtoken: authtoken
				}, 'POST', res => {
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
						return;
					}
					this.list = res.data.data;
					if(this.list.length==0){
						uni.showToast({
							title: "本区域暂无开通小区",
							icon: "none"
						})
					}
					// for(let i =0;i<res.data.data.length;i++){
					// 	this.array.push(res.data.data[i].name) 
					// 	}
				})
			},
			radioChange: function(evt) {
				console.log('222')
				console.log(evt);
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
				this.defaults = evt.detail.value;
			
			},
			onCancel(e) {
				console.log(e)
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				console.log( 'onconfirm',e);
				this.region = e;
				this.cityPickerValue = e.value;
				this.ress.provId = e.ress.province_N;
				this.ress.cityId = e.ress.city_N;
				this.ress.areaId = e.ress.area_N;
				this.ress.provName=e.ress.province_l;
				this.ress.cityName=e.ress.city_l;
				this.areaName=e.ress.area_l;
				this.ress.addr=this.ress.areaId;
				this.getXiqoQuList();
				
			},
			isDefaultChange(e) {
					console.log('3333')
				this.isDefault = e.detail.value;
					console.log(this.isDefault);
			},
			alterRess(){//从上个页面带来的参数并赋值
				
				this.name = this.ress.name;//收货人名称
				this.tel = this.ress.phone;//电话
				this.detailed  = this.ress.addrmore;//详细地址
				// this.region.label = this.ress.addrs;
				// this.ress.areaId = this.ress.areaId;//区id
			},
			refresh(){
				let pages = getCurrentPages();
				let prePage = pages[pages.length - 2];
				prePage.getAddress() ;
				uni.navigateBack({
					
				})
			},
			// 保存点击事件
			save() {
				let data = {
					"name": this.name,
					"head": this.name.substr(0, 1),
					"tel": this.tel,
					"address": {
						"region": this.region,
						"detailed": this.detailed
					},
					"isDefault": this.isDefault
				}
				if (this.editType == 'edit') {
					data.id = this.id
				}
				
				if (!data.name) {
					
					uni.showToast({
						title: '请输入收货人姓名',
						icon: 'none'
					});
					return;
				}
				
				if (!data.tel) {
					uni.showToast({
						title: '请输入收件人电话号码',
						icon: 'none'
					});
					return;
				}
				if (!this.detailed) {
					uni.showToast({
						title: '请输入收件人详细地址',
						icon: 'none'
					});
					return;
				}
				if(!this.region.label){
					uni.showToast({
						title: '请选择收货地址',
						icon: 'none'
					});
					return;
				}
				let village_id=null;
				let village_name =null;
				if (this.list[this.xIndex]) {
					village_id = this.list[this.xIndex].id;
					village_name = this.list[this.xIndex].name
				}
				uni.showLoading({
					title: '正在提交'
				})
				let authtoken = uni.getStorageSync("authtoken");
			
				
				request.urlRequest(
					this.url + '/api/member/editmemaddr',
					{
						name:this.name,//收货人
						phone:this.tel,//电话
						addr:this.ress.addr,//省市区代码（用英文,隔开）
						addrmore:this.detailed,//详细地址
						defaults:this.defaults,//是否默认
						id:this.ress.id,
						village_id:village_id,
						village_name:village_name,
					},
					{authtoken: authtoken},
					'POST',
					res => {
						console.log('修改收货地址', res);
						
						if(res.data.code == 1){
							uni.hideLoading();
							uni.navigateBack({
								
							});
						}else{
							uni.hideLoading();
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					}
				);
				
				
			
					// uni.setStorage({
					// 	key: 'saveAddress',
					// 	data: data,
					// 	success() {
							
					// 		uni.navigateBack();
					// 	}
					// })
				


			}
		},
	};
</script>
<style lang="scss">
	.header {
		display: flex;
		justify-content: center;
		padding: 20upx 30upx;

		>text {
			font-size: 35upx;
			color: #575757;
			font-weight: 600;
		}
	}
.uni-input {
		height: 100upx;

		line-height: 100upx;
		font-size: 28upx;
		background: #FFF;
		flex: 1;
	}
	.save {
		view {
			display: flex;
		}

		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;

		.btn {
			box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: $uni-color-primary;
			color: #fff;
			justify-content: center;
			align-items: center;

			.icon {
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}

			font-size: 30upx;
		}
	}

	.content {
		display: flex;
		flex-wrap: wrap;

		view {
			display: flex;
		}

		.row {
			width: 94%;
			margin: 0 3%;
			border-top: solid 1upx #eee;

			.nominal {
				width: 30%;
				height: 100upx;
				font-weight: 200;
				font-size: 30upx;
				align-items: center;
				color: #575757;
				font-weight: 600;
			}

			.input {
				width: 70%;
				padding: 20upx 0;
				align-items: center;
				font-size: 30upx;
				color: #D1D1D1;
				position: relative;

				&.switch {
					justify-content: flex-end;
				}

				.textarea {
					margin: 20upx 0;
					min-height: 120upx;
				}
			}
			.xzdizhi{
				position: absolute;
				right: 20upx;
				width: 20upx;
				height:20upx;
			}
			.uni-input-placeholder {
				color: #D1D1D1;
				font-size: 30upx;
			}
			.uni-textarea-placeholder {
				color: #D1D1D1 !important;
				font-size: 30upx !important;
			}
			

			.del {
				width: 100%;
				height: 100upx;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				color: #f06c7a;
				background-color: rgba(255, 0, 0, 0.05);
				border-bottom: solid 1upx #eee;
			}
			
		}
		
	}
	.rowress{
			display: flex;
			width: 94%;
			margin: 0 3%;
			border-top: solid 1upx #eee;
			// background: #999999;
			
			label{
				display: flex;
			}
		}
	.nominal1 {
			width: 70%;
			height: 100upx;
			font-weight: 200;
			font-size: 30upx;
			align-items: center;
			color: #575757;
			font-weight: 600;
			display: flex;
			align-items: center;
		}
		.radio-group{
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			margin-left: 20upx;
		}
</style>

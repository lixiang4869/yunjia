<template>
	<view>
		<!-- 新增地址 -->
		<view class="content">
			<view class="row">
				<view class="nominal">收货人:</view>
				<view class="input"><input placeholder="请填写收货人姓名" type="text" v-model="name" placeholder-style="color:rgba(205,205,205,1);" /></view>
			</view>
			<view class="row">
				<view class="nominal">电话号码:</view>
				<view class="input"><input placeholder="请输入收件人电话号码" type="text" v-model="tel" maxlength="11" placeholder-style="color:rgba(205,205,205,1);" /></view>
			</view>
			<view class="row">
				<view class="nominal">收货地址:</view>
				<view class="input" @tap="chooseCity">
					{{ region.label }}
					<image class="xzdizhi" src="../../static/home/right.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="row">
				<view class="nominal">选择小区:</view>
				<picker @change="selectXiaoQu" :value="xIndex" :range="list" range-key="name">
					<view class="uni-input">{{list[xIndex].name}}</view>
				</picker>
			
			</view>
			<view class="row">
				<view class="nominal">详细地址:</view>
				<view class="input"><textarea v-model="detailed" auto-height="true" placeholder-style="color:rgba(205,205,205,1);" placeholder="小区和门牌号"></textarea></view>
			</view>
			
		</view>
		<view class="rowress">
			<view class="nominal1">是否为默认收货地址:</view>

			<radio-group @change="radioChange" class="radio-group">
				<label class="" v-for="(item, index) in items" :key="item.value">
					<view><radio :value="item.value" :checked="index === current" /></view>
					<view>{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="save" @tap="save"><view class="btn">保存</view></view>
		<!-- 三级联动插件 -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onChange="onConfirm" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
import request from '../../store/http.js';
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
export default {
	components: {
		mpvueCityPicker
	},
	data() {
		return {
			items: [{ value: '2', name: '是' }, { value: '1', name: '否', checked: 'true' }],
			list: [{
				name: '选择小区'
			}],
			xIndex: 0,
			current: 0,
			defaults:2,//是否为默认收货地址，1不是，2是；
			ress: null,
			id: '',
			name: '',
			tel: '',
			detailed: '',
			isDefault: false,
			cityPickerValue: [0, 0, 0],
			themeColor: '#007AFF',
			region: {
				label: "请点击选择地址",
				value: [],
				cityCode: ''
			},
			url: this.$store.state.url
		};
	},

	methods: {
		onCancel(e) {
			console.log(e)
		},
		radioChange: function(evt) {
		
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			this.defaults = evt.detail.value;
		
		},
		
		chooseCity() {
			this.$refs.mpvueCityPicker.show();
		},
		// 获取选中的省市区
		onConfirm(e) {
			console.log(e);
			this.region = e;
			this.cityPickerValue = e.value;
			this.ress = e.ress;
			this.getXiqoQuList();
		},
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
				areacode: this.ress.area_N
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
		
				// for(let i =0;i<res.data.data.length;i++){
				// 	this.array.push(res.data.data[i].name) 
				// 	}
			})
		},
		// 保存按钮
		save() {
			let data = {
				name: this.name,
				head: this.name.substr(0, 1),
				tel: this.tel,
				address: {
					region: this.region,
					detailed: this.detailed
				},
				isDefault: this.isDefault
			};
			if (this.editType == 'edit') {
				data.id = this.id;
			}

			if (this.name === '') {
				uni.showToast({
					title: '请输入收货人姓名',
					icon: 'none'
				});
				return;
			}

			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.tel)) {
				console.log(this.tel);
				uni.showToast({
					title: '手机号码有误，请重填',
					icon: 'none'
				});
				return;
			}

			if (!data.address.detailed) {
				uni.showToast({
					title: '请输入收件人详细地址',
					icon: 'none'
				});
				return;
			}
			if (data.address.region.value.length == 0) {
				uni.showToast({
					title: '请选择收件地址',
					icon: 'none'
				});
				return;
			}
			let village_id=null;
			let village_name=null;
			if (this.list[this.xIndex]) {
				village_id = this.list[this.xIndex].id;
				village_name = this.list[this.xIndex].name
			}
			let authtoken = uni.getStorageSync('authtoken');
		
			request.urlRequest(
				this.url + '/api/member/memaddradd',
				{
					name: this.name, //收货人
					phone: this.tel, //电话
					addr: this.ress.area_N, //省市区代码（用英文,隔开）
					addrmore: this.detailed, //详细地址
					defaults: this.defaults ,//是否默认
					village_id:village_id,
					village_name:village_name,
				},
				{ authtoken: authtoken },
				'POST',
				res => {
					console.log('新增收货地址', res);
					if (res.data.code == 1) {
						uni.navigateBack({
							
						})
					} else {
						uni.showToast({
							title: '添加地址失败',
							icon: 'none'
						});
					}
				}
			);
		}
	},
	// 监听页面返回
	onBackPress() {
		console.log('我返回了');
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel();
			return true;
		}
	},
	// 监听页面卸载
	onUnload() {
	
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel();
		}
	}
};
</script>
<style lang="scss">
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
}
.uni-input {
		height: 100upx;

		line-height: 100upx;
		font-size: 28upx;
		background: #FFF;
		flex: 1;
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

		position: relative;

		&.switch {
			justify-content: flex-end;
		}

		.textarea {
			margin: 20upx 0;
			min-height: 120upx;
		}
	}
	.xzdizhi {
		
		position: absolute;
		right: 20upx;
		width: 20upx;
		height: 20upx;
	}
	.uni-input-placeholder {
		color: #d1d1d1;
		font-size: 30upx;
	}
	.uni-textarea-placeholder {
		color: #d1d1d1 !important;
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

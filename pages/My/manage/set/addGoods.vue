<template>
	<view class="content">
		<view class="item" style="margin-top: 30rpx;">
			<view>类型</view>

			<radio-group @change="radioChange" class="radio-group">
				<label style="display: flex;flex-direction: row;align-items: center;" v-for="(item, index) in items" :key="item.value">
					<view>
						<radio :value="item.value" :checked="index === current" />
					</view>
					<view style="margin-right: 20rpx;">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="item">
			<view style="flex-direction: row;display: flex;">名称
				<view style="color: #a18721;margin-left: 10rpx;">*</view>
			</view>

			<input placeholder="请输入商品名称" type="text" v-model="goodsName" class="text" />

		</view>
		<view class="item">
			<view>分类</view>

			<picker @change="city" :value="index" :range="array" range-key="name">
				<view class="uni-input">{{array[index].name}}</view>
			</picker>
		</view>
		<view class="item" style="margin-bottom: 0;">
			<view style="flex-direction: row;display: flex;">图片
				<view style="color: #a9923c;margin-left: 10rpx;">*</view>
			</view>
			<image :src="imagePath" class="img" @click="chooseImages"></image>

		</view>
		<view style="font-size: 36rpx;line-height: 90rpx;height: 90rpx;margin-left: 20rpx;font-weight: 600;"> 详细信息</view>
		<view class="item">
			<view style="flex-direction: row;display: flex;">标签
				<view style="color: #a9923c;margin-left: 10rpx;">*</view>
			</view>

			<view style="margin-left: 50rpx;flex: 1;">
				<view style="display: flex;flex-direction: row; align-items: center;">
					<view v-for="(item,index) in tagArr" :key="index" class="tagBox" @click="deleTag(index)">
						<view>{{item}}</view>
						<image style="position: absolute;right: 10rpx;top: 10rpx;width: 15rpx;height: 15rpx;" src="../../../../static/shop/close.png" />
					</view>
					<view style="color: #a9923c;" @click="show"> 添加标签</view>
				</view>

				<!-- <view style="color: #333333;" v-if="tagArr.length==0"> 如商品菜系、主料、配料等</view> -->
			</view>

			
		</view>
		<view class="item">
			<view style="flex-direction: row;display: flex;">属性
				<view style="color: #a9923c;margin-left: 10rpx;">*</view>
			</view>
		<view style="margin-left: 50rpx;flex: 1;">
			<view style="display: flex;flex-direction: row; align-items: center;">
				<view v-for="(item,index) in tagArr" :key="index" class="tagBox" @click="deleAttribute(index)">
					<view>{{item}}</view>
					<image style="position: absolute;right: 10rpx;top: 10rpx;width: 15rpx;height: 15rpx;" src="../../../../static/shop/close.png" />
				</view>
				<view style="color: #a9923c;" @click="show2"> 添加属性</view>
			</view>
		
			<!-- <view style="color: #333333;" v-if="tagArr.length==0"> 如商品菜系、主料、配料等</view> -->
		</view>
		
			
		</view>
		<view class="item">
			<view style="flex-direction: row;display: flex;">描述
				<view style="color: #a18721;margin-left: 10rpx;">*</view>
			</view>
		
			<input placeholder="请输入商品描述 200字以内" type="text" v-model="desc" class="text" />
		
		</view>
		
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="input" placeholder="如商品菜系、主料、配料等" title="添加标签" :duration="2000" :before-close="true" @close="close"
			 @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup2" type="dialog">
			<uni-popup-dialog mode="input" placeholder="下单时多种口味" title="添加属性" :duration="2000" :before-close="true" @close="close"
			 @confirm="confirm2"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopupDialog

		},
		data() {
			return {
				url: this.$store.state.url,
				goodsName: '',
				items: [{
					value: 2,
					name: '单品'
				}, {
					value: 1,
					name: '套餐',
					checked: 'true'
				}],
				array: [{
					name: '选择分类'
				}],
				imagePath: 'https://xin.yiyunoto.com/uploads/static/shopcenter/addimg.png',
				index: 0,
				logo: '',
				tagArr: [],
				attributeArr:[],
				pitchTag: [],
				tagAddBox: false,
			}
		},
		methods: {
			show() {
				this.$refs.popup.open()
			},
			show() {
				this.$refs.popup2.open()
			},
			/**
			 * 点击取消按钮触发
			 * @param {Object} done
			 */
			close(done) {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				done()
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(done, value) {
				// 输入框的值
				console.log(value)
				this.tagArr.push(value)
				done()
			},
	confirm2(done, value) {
				// 输入框的值
				console.log(value)
				this.attributeArr.push(value)
				done()
			},
			// 移除标签
			deleAttribute(index) {
			
				this.attributeArr.splice(index, 1);
			},
			
			// 移除标签
			deleTag(index) {
			
				this.tagArr.splice(index, 1);
			},
			
			city(e) {
				this.index = e.target.value
				this.houseindex = 0;


			},
			upLoad(path) {
				let _this = this;
				uni.uploadFile({
					url: this.url + '/api/post/uploadImg',
					filePath: path,
					name: 'file',
					method: "POST",

					success: (uploadFileRes) => {
						var json = JSON.parse(uploadFileRes.data);
						if (json.code == 1) {
							this.logo = json.data;


						}
						// uni.showToast({
						// 	title: json.msg
						// })


					}
				});
			},
			chooseImages() {
				// 上传图片
				uni.chooseImage({

					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						this.imagePath = res.tempFilePaths[0];
						this.upLoad(this.imagePath)
					}
				});
			},
		}
	}
</script>

<style>
	/* 标签 */
	.tagBox {
		background: #E83E25;
		border-radius: 15rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0rpx 30rpx 00rpx 30rpx;
		position: relative;
		display: flex;
		margin: 20rpx;
		color: #ffffff;
	}

	.tagHint {
		width: 30%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding-left: 20upx;
		box-sizing: border-box;
	}

	.tagHintTxt {
		font-size: 38upx;
		color: #333;
		font-weight: 600;
	}

	.tagMinBox {
		width: 70%;
		height: 100%;
		border-left: 1upx dashed #efefef;
		padding: 10upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: start;
		flex-wrap: wrap;
	}

	.tagItemBox {
		max-width: 300upx;
		height: 50upx;
		background-color: rgba(86, 169, 255, 0.3);
		border-radius: 20upx;
		font-size: 22upx;
		color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 0 10upx;
		margin-bottom: 20upx;
		padding: 10upx;
	}

	.img {
		width: 100rpx;
		height: 100rpx;
	}

	.text {
		flex: 1;
		height: 100upx;
		line-height: 100upx;
		float: left;
		text-align: end;
	}

	.content {
		background: #f3f3f3;
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 30rpx;
		color: #333;
	}

	.item2 {
		padding-left: 20rpx;
		padding-right: 20rpx;

		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: row;
		background: #ffffff;
		border-radius: 10rpx;
		height: 130rpx;
	}

	.item {
		padding-left: 20rpx;
		padding-right: 20rpx;
		justify-content: space-between;
		align-items: center;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: row;
		background: #ffffff;
		border-radius: 10rpx;
		height: 100rpx;
	}

	.radio-group {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		margin-left: 20upx;
	}
</style>

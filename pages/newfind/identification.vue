<template>
	<view>
		<view class="hint">
			<text style="color: #0086F9;font-size: 26.2upx;">*</text>
			<text style="color: #999999;font-size: 26upx;margin-left: 20upx;">请认真填写与您身份证一致的真实信息，通过后将不能修改</text>
		</view>
		<view class="inpForm">
			<view class="item">
				<text class="inpHint">真实姓名</text>
				<input class="inp" :disabled="isDisabled" placeholder-style="color: #999999;" type="text" v-model="uname" placeholder="请填写姓名" />
			</view>
			<view class="item">
				<text class="inpHint">性别</text>
				<radio-group @change="radioChange" :disabled="isDisabled" style="display: flex;flex-direction: row;">
					<label class="uni-list-cell uni-list-cell-pd" style="display: flex;flex-direction: row;" v-for="(item, index) in sexArr" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
			<view class="item">
				<text class="inpHint">联系电话</text>
				<input class="inp" :disabled="isDisabled" type="number" placeholder="请填写电话" v-model="phone" @blur="inpBlur(1)" />
			</view>
			<view class="item">
				<text class="inpHint">身份证号</text>
				<input class="inp" :disabled="isDisabled" type="idcard" :maxlength="18" placeholder="请填写身份证号" v-model="idcard" @blur="inpBlur(2)" />
			</view>
			<text class="hintTitle">上传身份证照片</text>
			<view class="selectImgs">
				<view class="selectImgBox" @click="positive">
					<image v-if="src.positive==''" class="img" src="../../static/video/camera.png"></image>
					<text v-if="src.positive==''" class="selectImgHint">身份证正面</text>
					<image class="preview" :src="isDisabled ? url+src.positive : src.positive"></image>
				</view>
				<view class="selectImgBox" @click="negative">
					<image v-if="src.negative==''" class="img" src="../../static/video/camera.png"></image>
					<text v-if="src.negative==''" class="selectImgHint">身份证反面</text>
					<image class="preview" :src="isDisabled ? url+src.negative : src.negative"></image>
				</view>
			</view>
		</view>
		<text class="btn" @click="submitInfo" :style="isDisabled ? 'color:#fff;background-color:#d3d3d3;':''">{{ isDisabled ? btnTxt : '确认提交' }}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:{positive:'',negative:''},
				url:this.$store.state.url,
				uname:'',
				phone:'',
				idcard:'',
				sexArr:[{value:1,name:'男'},{value:0,name:'女'}],
				current:0,
				sex:1,
				isDisabled:false,
				state:'true',
				btnTxt:'',
				tid:0
			}
		},
		onLoad(options) {
			this.state = options.state;
			this.tid = options.tid*1;
			console.log(options)
		},
		onShow() {
			/* 隐藏凸起图标 */
			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			setTimeout(function() {
				if(icon)
				icon.hide();
			}, 100);
			// #endif
			console.log(this.state)
			if(this.state == 'false'){
				this.isDisabled = true;
				this.isSuccess();
			}
		},
		methods: {
			// 选择身份证正反面
			positive(){
				var _this = this;
				if(_this.isDisabled){
					return;
				}
				uni.chooseImage({
					count:1,
					success(obj) {
						_this.src.positive = obj.tempFilePaths[0];
						console.log(obj.tempFilePaths[0])
					},
					fail(e) {
						console.log(e)
					}
				})
			},
			negative(){
				var _this = this;
				if(_this.isDisabled){
					return;
				}
				uni.chooseImage({
					count:1,
					success(obj) {
						_this.src.negative = obj.tempFilePaths[0];
						console.log(obj.tempFilePaths[0])
					},
					fail(e) {
						console.log(e)
					}
				})
			},
			// 单选切换
			radioChange: function(evt) {
				this.sex = evt.detail.value;
			},
			// 验证手机号、身份证号格式
			inpBlur(e,index){
				if(index==1){
					if(this.phone != ''){
						if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.inpData.phone))){
							uni.showToast({
								icon:'none',
								title:'手机号格式不正确'
							})
							this.inpData.phone = ''
						}
					}
				}else if(index == 2){
					if(this.idcard != ''){
						if(!(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(this.inpData.idNum))){
							uni.showToast({
								icon:'none',
								title:'身份证号格式不正确'
							})
							this.inpData.tel = ''
						}
					}
				}
			},
			// 提交信息
			async submitInfo(){
				if(this.uname==''){
					uni.showToast({
						icon:'none',
						title:'请输入真实姓名'
					})
					return;
				}else if(this.phone==''){
					uni.showToast({
						icon:'none',
						title:'请输入手机号'
					})
					return;
				}else if(this.idcard==''){
					uni.showToast({
						icon:'none',
						title:'请输入身份证号'
					})
					return;
				}else if(this.src.positive==''||this.src.negative==''){
					uni.showToast({
						icon:'none',
						title:'请选择身份证正反面'
					})
					return;
				}
				if(this.isDisabled){
					uni.showToast({
						icon:'none',
						title:'请不要重复提交'
					})
					return;
				}
				var token = uni.getStorageSync('authtoken');
				let _this = this;
				uni.showLoading({
					title:'上传中'
				})
				var uri = await this.uploadfile();
					uni.request({
						url:this.url+'/api/video/live_apply',
						method:'POST',
						header:{
							authtoken:token
						},
						data:{
							cid:this.idcard,
							img_face:uri["positive"],
							img_back:uri["negative"],
							tel:this.phone,
							gender:this.sex,
							realname:this.uname,
							tid:this.tid
						},
						success(res) {
							uni.hideLoading();
							_this.isDisabled = true;
							uni.showToast({
								icon:'none',
								title:res.data.msg
							})
							console.log(res);
						}
					})
			},
			async uploadfile(){
				let _this = this;
				var arr = [];
				for(let key in _this.src){
					arr[key] = await _this.up_img(_this.src[key]);
				}
				return arr;
			},
			up_img(url){
				let _this = this;
				return new Promise((resolve,reject)=>{
					uni.uploadFile({
						url:_this.url+'/api/liveapi/uploadImg',
						filePath:url,
						name:'file',
						success:(res) => {
							var imgUrl = JSON.parse(res.data).data;
							resolve(imgUrl);
						}
					})
				})
			},
			// 验证审核状态
			isSuccess(){
				let _this = this;
				var token = uni.getStorageSync('authtoken');
				uni.request({
					url:_this.url+'/api/video/check_a_status',
					method:"POST",
					header:{
						authtoken:token
					},
					data:{
						tid:_this.tid
					},
					success(res) {
						if(res.data.code==1){
							uni.navigateTo({
								url:'./liveSetout?authtoken='+token
							})
						}else{
							_this.phone = res.data.data.tel;
							_this.uname = res.data.data.realname;
							_this.current = res.data.data.gender==1?0:1;
							_this.sex = res.data.data.gender;
							_this.idcard = res.data.data.cardid;
							_this.btnTxt = res.data.msg;
							_this.src.negative = res.data.data.img_back;
							_this.src.positive = res.data.data.img_face;
						}
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style>
	.hint{
		margin: 30upx 0upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.inpForm{
		box-sizing: border-box;
		padding: 0upx 20upx;
	}
	.item{
		border-bottom: 1upx solid rgba(244,244,244,1);
		height: 111upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.inpHint{
		color: #333333;
		font-size: 30upx;
		font-weight: 700;
	}
	.inp{
		text-align: right;
		font-size: 30upx;
		color: #333333;
	}
	.hintTitle{
		display: inline-block;
		height: 111upx;
		line-height: 111upx;
		font-weight: 700;
		font-size: 30upx;
		color: #333333;
	}
	.selectImgs{
		height: 203upx;
		margin-top: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.selectImgBox{
		width: 340upx;
		height: 203upx;
		border-radius:13upx;
		overflow: hidden;
		background-color: rgba(244,244,244,0.38);
		border: 1upx dashed rgba(153,153,153,1);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.img{
		width: 65upx;
		height: 48upx;
		z-index: 1;
	}
	.selectImgHint{
		font-size: 30upx;
		color: #999999;
		z-index: 1;
	}
	.preview{
		width: 340upx;
		height: 203upx;
		position: absolute;
		top: 0;left: 0;
	}
	.btn{
		display: inline-block;
		width: 711upx;
		height: 90upx;
		background-color: #0081FF;
		color: #FFFFFF;
		font-size: 30upx;
		text-align: center;
		line-height: 90upx;
		position: absolute;
		bottom: 10%;
		left: 50%;margin-left: -355.5upx;
	}
</style>

<template>
	<!-- 设置新密码 -->
	<view>
		<view class="form re">
			<view class="username">
				<input placeholder="请输手机号" v-model="phoneNumber" placeholder-style="color:rgba(205,205,205,1);font-size:26upx;" />
				</view>
			<view class="code">
				<input placeholder="请输入验证码" v-model="code" placeholder-style="color:rgba(205,205,205,1); font-size:26upx;" />
				<view class="get-code" :style="{ color: getCodeBtnColor }" @click.stop="yzm">{{ getCodeText }}</view>
			</view>
			<view class="password">
				<input placeholder="请输入支付密码" type="number" password="true"  maxlength="6"  v-model="passwd"   placeholder-style="color:rgba(205,205,205,1);font-size:26upx; "/>
			</view>
			<view class="btn" @tap="queren">完成</view>
		</view>
	</view>
</template>

<script>
import request from '../../../store/http.js';
export default {
	data() {
		return {
			oldphone: '',
			phoneNumber: '',
			code: '',
			getCodeText: '获取验证码',
			getCodeBtnColor: '#F58B23',
			getCodeisWaiting: false,
			url: this.$store.state.url,
			number: '',
			passwd:'',
		};
	},

	methods: {
		yzm() {
			let authtoken = uni.getStorageSync("authtoken");
			if (this.getCodeisWaiting) {
				return;
			}
			// this.getCode()
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber)) {
				uni.showToast({ title: '请填写正确手机号码', icon: 'none' });
			} else {
				request.urlRequest(
					this.url+'/api/login/smsSend',
					{
						phone: this.phoneNumber,
					},
					{},
					'POST',
					 (res) => {
						 console.log(res);
						 if(res.data.code == 1){
							 uni.showToast({title: res.data.msg ,icon:"none"});
							 this.setTimer();
						 }else{
							 uni.showToast({title: res.data.msg ,icon:"none"});
						 }
						
					}
				)
			}
		},
		queren() {
			let authtoken = uni.getStorageSync("authtoken");
			request.urlRequest(
				this.url + '/api/member/setPayPwd',
				{
					phone: this.phoneNumber,
					code: this.code,
					paypwd: this.passwd,
				},
				{authtoken: authtoken},
				'POST',
				res => {
					console.log('设置支付密码', res);
					if(res.data.code == 1){
						uni.showToast({title: '支付密码设置成功' ,icon:"none"});
						uni.navigateBack({
							
						});
					}else{
						uni.showToast({title: res.data.msg ,icon:"none"});
					}
				}
			);
		},
		getCode() {
			this.getCodeText = '发送中...';
			this.getCodeisWaiting = true;
			this.getCodeBtnColor = 'color:rgba(245,139,35,1);';
			//示例用定时器模拟请求效果
			setTimeout(() => {
				uni.showToast({ title: '验证码已发送', icon: 'none' });
				this.setTimer();
			}, 1000);
		},
		setTimer() {
			let holdTime = 60;
			this.getCodeText = '重新获取(60)';
			this.Timer = setInterval(() => {
				if (holdTime <= 0) {
					this.getCodeisWaiting = false;
					this.getCodeBtnColor = '#F58B23';
					this.getCodeText = '获取验证码';
					clearInterval(this.Timer);
					return;
				}
				this.getCodeText = '重新获取(' + holdTime + ')';
				holdTime--;
			}, 1000);
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f5f4f9;
	height: 100%;
}
.form {
	font-size: 26upx; //获取验证码字体大小
	padding-top: 16upx;
	.username,
	.password,
	.code {
		width: 690upx;
		height: 80upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		display: flex;
		align-items: center;
		margin-left: 30upx;
		margin-bottom: 12upx;
		input {
			width: 485upx;
			height: 45upx;
			color: #000000;
			font-weight: 200;
			padding-left: 20upx;
		}
	}
	.btn {
		color: #f06c7a;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 85upx;
		background: $uni-color-primary;
		box-shadow: 0px 2upx 4upx 0px rgba(0, 0, 0, 0.28);
		border-radius: 10upx;
		font-size: 30upx;
		font-family: PingFangSC-Regular, PingFang SC;
		color: rgba(255, 255, 255, 1);
		margin-left: 30upx;
		margin-top: 437upx;
	}
}
.re {
	.username {
		position: relative;
		.get-code {
			position: absolute;
			height: 80upx;
			display: flex;
			align-items: center;
			justify-content: center;
			right: 0;
			padding: 0 40upx;
			z-index: 3;
			&:after {
				content: ' ';
				width: 1upx;
				height: 50upx;
				color: #f58b23;
				position: absolute;
				z-index: 3;
				left: 0;
				top: 20upx;
			}
		}
	}
	.res {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100upx;
		color: #f58b23;
	}
}
</style>

<template>
	<!-- 更换新手机号 -->
	<view>
		<view class="form re">
			<view class="username"><input placeholder="请输入手机号" v-model="phoneNumber" placeholder-style="color:rgba(205,205,205,1);font-size:26upx;" /></view>
			<view class="code">
				<input placeholder="请输入验证码" v-model="code" placeholder-style="color:rgba(205,205,205,1); font-size:26upx;" />
				<view class="get-code" :style="{ color: getCodeBtnColor }" @click.stop="yzm">{{ getCodeText }}</view>
			</view>
			<view class="password">
				<input placeholder="请输入新的登陆密码" type="number"  maxlength="16"  v-model="passwd" :password="see"  placeholder-style="color:rgba(205,205,205,1);font-size:26upx; "/>
				<view class="loginsee_btn" @tap="login_look">
					<image class="yan" :src="yan" />
				</view>
			</view>
			<view class="btn" @tap="queren">完成</view>
		</view>
	</view>
</template>

<script>
// 18939039737  10797
// 13598522424  5660
import request from '../../../store/http.js';
export default {
	data() {
		return {
			see: true,//显示密码 默认
			yan:'/static/my/yan.png',  
			oldphone: '',
			phoneNumber: '',
			code: '',
			passwd:'',
			getCodeText: '获取验证码',
			getCodeBtnColor: '#F58B23',
			getCodeisWaiting: false,
			url: this.$store.state.url,
			number: ''
		};
	},
	onLoad(e) {
		console.log(e);
		this.oldphone = e.phone;
	},
	methods: {
		/* 显示隐藏密码 */
		login_look: function() {
			this.see = !this.see
			if(this.see==false){
			this.yan='/static/my/yans.png'
			}else{
				this.yan='/static/my/yan.png'
			}
		},
		yzm() {
			if (this.getCodeisWaiting) {
				return;
			}
			// this.getCode()
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber)) {
				uni.showToast({ title: '请填写正确手机号码', icon: 'none' });
			} else {
				if (this.oldphone == this.phoneNumber) {
					request.urlRequest(
						this.url + '/user/profile/send-code',
						{
							phone: this.phoneNumber,
							code: 'forget_password'
						},
						'GET',
						res => {
							if (res.data.return_msg !== 'OK') {
								uni.showToast({ title: '次数已上限', icon: 'none' });
							} else {
								console.log(res);
								this.getCodeisWaiting = true;
								this.getCode();
							}
						}
					);
				} else {
					uni.showToast({ title: '请输入新手机号', icon: 'none' });
				}
			}
		},
		queren() {
			console.log(this.code, this.phoneNumber);
			var token = uni.getStorageSync('token');
			console.log(this.oldphone);
			request.urlRequest(
				this.url + '/user/profile/check-code',
				{
					phone: this.phoneNumber,
					code: this.code,
					token: token,
					type: 'forget_password',
					
				},
				'GET',
				res => {
					console.log('校验验证码', res);
					if (res.data.return_code == 'success') {
						this.setPassWord();
					}else{
						uni.showToast({ title: '验证码有误', icon: 'none' });
					}
				}
			);
		},
		// 修改密码接口
		setPassWord() {
			var token = uni.getStorageSync("token")
			request.urlRequest(
				this.url + '/user/profile/forget-user-password',
				{
					token: token,
					password:this.passwd,
					phone:this.phoneNumber,
					code:this.code,
					},
				'POST',
				 (res) => {
					console.log('验证密码res',res);
					console.log(res.errMsg);
					if(res.errMsg == 'request:ok'){
						setTimeout(()=>{
							uni.hideLoading();
							uni.showToast({
								title:'修改成功'
							});
							setTimeout(()=>{
								uni.navigateTo({
									url:'../Login-registration/Login-registration'
								})
							},300);
						},700)
					}
				}
			)
		},
	/* 	amendPhone() {
			var token = uni.getStorageSync('token');
			request.urlRequest(
				this.url + '/user/profile/change-phone',
				{
					oldPhone: this.oldphone,
					newPhone: this.phoneNumber,
					code: this.code,
					token: token
				},
				'POST',
				res => {
					console.log('修改手机号', res);
					console.log(this.oldphone);
					if(res.data.return_code == 'success'){
						
						uni.navigateTo({
							url: '/pages/My/Personal-data/Personal-data'
						});
					}else{
						uni.showToast({ title: '修改密码失败，请重试', icon: 'none' });
					}
				}
			);
		}, */
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
		background: rgba(245, 139, 35, 1);
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
.yan {
		width:34upx;
		height:25upx;
	}
	.loginsee_btn {
		float: right;
		margin-left: 94upx;
	}
</style>

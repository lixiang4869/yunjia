<template>
	<view class="content ">
		
		<view class="list" v-for="(item, index) in addressList" :key="index" v-if="addressList.length>0">
			<view class="wrapper"  @click="checkAddress(item)">
				<view class="address-box">
					<view >
						<text class="name">{{ item.name }}</text>
						<text class="mobile">{{ item.phone }}</text>
						<text v-if="item.defaults==2" class="tag">默认</text>
					</view>

					<view class="righticon">
						<!-- <navigator :url="'../Address/Compile?item='+ item "> -->
							<image class="bianji" src="https://xin.yiyunoto.com/uploads/static/address/bianji.png" mode="widthFix" @click.stop="bianji(item)"></image>
						<!-- </navigator> -->
						<image class="del" src="https://xin.yiyunoto.com/uploads/static/address/del.png" mode="widthFix"  @click.stop="del(index, item)"></image>
					</view>
				</view>
				<view class="u-box">
					<text class="address">{{ item.addrs }} {{ item.addrmore }}</text>
				</view>
			</view>
		</view>
		<!-- <view class="wxaddress" @click="getWXAddress" v-if="addressList.length==0"> 获取微信收货地址</view> -->
	<view class="save">
		
		<view class="btn" @click="addaddress">
			添加地址
		</view>
		
	</view>
	
	</view>
</template>

<script>
import request from '../../store/http.js';
export default {
	data() {
		return {
			source:0,
			value: '',
			addressList: [],
			url: this.$store.state.url,
			isDoRefresh:'',
			// AddressList:[],
		};
	},
	onLoad(e) {
		this.source=e.source;
		
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
			this.getAddress()
	},
	
	created() {
	},
	methods: {
	
		addaddress(){
			uni.navigateTo({
				url:'../Address/Added'
			})
		},
		goback(){
			uni.navigateBack({
				
			});
		},
		del(index, item) {
			console.log(item.id);
			uni.showModal({
				title: '删除提示',
				content: '你将删除这个收货地址',
				success: res => {
					if (res.confirm) {
						this.deleteRess(item.id);
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		bianji: function(item) {
			
			let navData = JSON.stringify(item)
			uni.navigateTo({
				url: '../Address/Compile?item='+navData,
				});
		},
		checkAddress:function(item){
				
				//this.$api.prePage()获取上一页实例，在App.vue定义
				if(this.source==2){
					let eventChannel = this.getOpenerEventChannel()
						eventChannel.emit('acceptDataFromOpenedPage', {
						data: encodeURIComponent(JSON.stringify(item))
					});
					// let pages = getCurrentPages();  //获取所有页面栈实例列表
					// let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
					
					// prevPage.$vm.recinfo = item;
					
					// console.log(prevPage.$vm.recinfo);
						// this.$api.prePage().recinfo = item;
						 uni.navigateBack();
				}
				
			
			}
		,
		// 请求收货地址列表
		getAddress() {
			let authtoken = uni.getStorageSync("authtoken");
			request.urlRequest(
				this.url + '/api/member/memaddr',
				{},
				{authtoken: authtoken},
				'POST',
				res => {
					console.log('收货地址列表', res);
					if( res.data.code == 1 ){
						this.addressList = res.data.data;
						console.log(this.addressList);
					}else{
						this.addressList=[];
						uni.showToast({title: '当前没有地址信息哦',icon: 'none'});
					}
				}
			);
		},
		// 删除收货地址
		deleteRess(id){
			console.log(id);
			let authtoken = uni.getStorageSync("authtoken");
				request.urlRequest(
					this.url + '/api/member/delmemaddr',
					{id:id},
					{authtoken: authtoken},
					'POST',
					res => {
						console.log('删除收货地址', res);
						if(res.data.code == 1){
							uni.showToast({title: res.data.msg,icon: 'none'});
							this.getAddress();
						}else{
							uni.showToast({title: '删除地址失败',icon: 'none'});
						}
						
					}
				);
		}
	}
};
</script>

<style lang="less">

* {
	padding: 0;
	margin: 0;
}
page {
	padding-bottom: 120upx;
	background: #f6f6f6;
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
			background-color:#f72926;
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
 .status_bar {
      height: var(--status-bar-height);
      width: 100%;
  }
.flex {
	display: flex;
}
.sp {
	//竖排换行
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
}
.hp {
	//横排不换行
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
}
.jz {
	//flex 居中
	align-items: center;
	justify-content: center;
}
.if {
	//文字超出省略
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.content {
	position: relative;
	background: #fff;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2upx solid #f6f6f6;
	padding: 20upx 30upx;
	line-height: 1.2;
	.houtui {
		width: 20upx;
		height: 10upx;
	}
	> text {
		font-size: 30upx;
		color: #575757;
		font-weight: 600;
	}
	.zengjia {
		width: 30upx;
		height: 30upx;
	}
}

.list {
	width: 100%;
	display: flex;
	align-items: center;
	padding: 20upx 30upx;
	background: #fff;
	border-bottom: 4upx solid #f6f6f6;
	box-sizing: border-box;
}

.wrapper {
	width: 100%;
}

.address-box {
	.hp;
	justify-content: space-between;
	width: 100%;
	align-items: center;

	.name {
		font-size: 30upx;
		margin-right: 30upx;
	}

	.mobile {
		font-size: 30upx;
		flex: 1;
	}

	.tag {
		width: 73upx;
		height: 41upx;
		font-size: 24upx;
		color: #f5a623;
		margin-left: 20upx;
		background: #ffeccb;
		border-radius: 4upx;
		padding: 5upx 10upx;
		line-height: 1;
		flex: 1;
	}

	.righticon {
		.hp;

		.bianji {
			width: 40upx;
			height: 40upx;
			padding-right: 30upx;
		}

		.del {
			width: 33upx;
			height: 33upx;
		}
	}
}

.u-box {
	font-size: 28upx;
	color: #7f7f7f;

	.address {
		font-size: 27upx;
		color: #7f7f7f;
	}
}
</style>

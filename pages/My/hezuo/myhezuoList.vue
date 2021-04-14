<template>
	<view>	
		<view class="wrap" v-if="flag == 0">
			<view class="title">
				<view class="title-icon"></view>
				<view class="title-text">区域合伙人（{{dataList.length}}）</view>
			</view>
			<view class="hezuoList">
				<block  v-for="(item,index) in dataList" :key="index">
					<view class="hezuo-li">
						<view class="li-title">
							<view class="li-title-left">
								<image src="../../../static/address.png" mode=""></image>
								<view>{{item.city}}</view>
							</view>
							<view class="li-title-right" @click="gohehuoDetail(index)">
								<view>社区合伙人({{dataList.length}})</view>
								<image src="../../../static/video/next.png" mode=""></image>
							</view>
						</view>
						<view class="li-user">
							<view class="user-top">
								<view class="user-img">
									<image :src="item.headimg" mode=""></image>
								</view>
								<view class="user-name">{{item.truename}}</view>
							</view>
							<view class="user-bottom">
								<view class="user-phone">手机号:<text style="margin-left: 10rpx;"></text></view>
								<view class="user-id">ID:<text style="margin-left: 10rpx;">{{item.id}}</text></view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="wrap" v-if="flag == 1">
			<view class="title">
				<view class="title-icon"></view>
				<view class="title-text">社区合伙人（{{dataList1.length}}）</view>
			</view>
			<view class="hezuoList">
				<block  v-for="(item,index) in dataList1" :key="index">
					<view class="hezuo-li">
						<view class="li-title">
							<view class="li-title-left">
								<image src="../../../static/address.png" mode=""></image>
								<view>{{item.city}}</view>
							</view>
							<view class="li-title-right" @click="goheikaDetail(index)">
								<view>黑卡合伙人({{dataList1.length}})</view>
								<image src="../../../static/video/next.png" mode=""></image>
							</view>
						</view>
						<view class="li-user">
							<view class="user-top">
								<view class="user-img">
									<image :src="item.headimg" mode=""></image>
								</view>
								<view class="user-name">{{item.truename}}</view>
							</view>
							<view class="user-bottom">
								<view class="user-phone">手机号:<text style="margin-left: 10rpx;"></text></view>
								<view class="user-id">ID:<text style="margin-left: 10rpx;">{{item.id}}</text></view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="wrap" v-if="flag == 2">
			<view class="title">
				<view class="title-icon"></view>
				<view class="title-text">黑卡合伙人（{{dataList2.length}}）</view>
			</view>
			<view class="hezuoList">
				<block  v-for="(item,index) in dataList2" :key="index">
					<view class="hezuo-li">
						<view class="li-title">
							<view class="li-title-left">
								<image src="../../../static/address.png" mode=""></image>
								<view>{{item.city}}</view>
							</view>
						</view>
						<view class="li-user">
							<view class="user-top">
								<view class="user-img">
									<image :src="item.headimg" mode=""></image>
								</view>
								<view class="user-name">{{item.truename}}</view>
							</view>
							<view class="user-bottom">
								<view class="user-phone">手机号:<text style="margin-left: 10rpx;"></text></view>
								<view class="user-id">ID:<text style="margin-left: 10rpx;">{{item.id}}</text></view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import request from "../../../store/http.js"
	export default{
		data(){
			return{
				flag:null,
				dataList:[],
				dataList1:[],
				dataList2:[],
				url: this.$store.state.url,
			}
		},
		onLoad(){
			this.gethehuoList()
		},
		methods:{
			gethehuoList(){
				// let authtoken = uni.getStorageSync("authtoken");
				let authtoken = '85de366ff4b4210c1b3f1578defc16b25ac14146';
				request.urlRequest(this.url+"/api/partner/myParent",{},{authtoken:authtoken},"POST",res=>{
					res.data.data.data[0].type = '城市合伙人'
					if(res.data.code == 1){
						this.dataList = res.data.data.data;
						this.dataList1 = res.data.data.data;
						this.dataList2 = res.data.data.data;
						if(res.data.data.data[0].type == '城市合伙人'){
							this.flag = 0
						}else if(res.data.data.data[0].type == '社区合伙人'){
							this.flag = 1
						}else if(res.data.data.data[0].type == '黑卡合伙人'){
							this.flag = 2
						}
					}
				})
			},
			
			
			gohehuoDetail(index){
				let id = this.dataList[index].id
				let authtoken = '85de366ff4b4210c1b3f1578defc16b25ac14146';
				request.urlRequest(this.url+"/api/partner/myParent",{id:id},{authtoken:authtoken},"POST",res=>{
					if(res.data.code == 1){
						this.dataList1 = []
						this.flag = 1
						this.dataList1.push(res.data.data.data) ;
						console.log(this.dataList1)
					}
				})
			},
			goheikaDetail(index){
				let id = this.dataList1[index].id
				let authtoken = '85de366ff4b4210c1b3f1578defc16b25ac14146';
				request.urlRequest(this.url+"/api/partner/myParent",{id:id},{authtoken:authtoken},"POST",res=>{
					if(res.data.code == 1){
						this.dataList2 = []
						this.flag = 2
						this.dataList2.push(res.data.data.data) ;
					}
				})
			}
		},
	}
</script>

<style>
	page{
		background-color: #F6F5F8;
	}
	.title{
		width: 100%;
		padding: 16rpx 0;
		display: flex;
		align-items: center;
		background-color: #fff;
	}
	.title-icon{
		width: 16rpx;
		height: 10rpx;
		background-color: #FF502E;
		border-radius: 0 100rpx 100rpx 0;
	}
	.title-text{
		font-size: 30rpx;
		margin-left: 20rpx;
		color: #333333;
	}
	.hezuoList{
		
	}
	.hezuo-li{
		padding: 0upx 20rpx 20rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		background-color: #fff;
		overflow: hidden;
	}
	.li-title{
		font-size: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin: 23rpx 0 26rpx 0;
	}
	.li-title-left{
		display: flex;
		align-items: center;
		justify-content: center;
		
	}
	.li-title-left>image{
		width: 40rpx;
		height: 37rpx;
		margin-right: 15rpx;
	}
	.li-title-right{
		color: #666666;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.li-title-right>image{
		width: 30rpx;
		height: 34rpx;
		margin-top: 6rpx;
		margin-left: 10upx;
	}
	.li-user{
		width: 100%;
		border-radius: 8rpx;
		border: 1px solid #D9D9D9;
		padding: 30rpx 35rpx;
		box-sizing: border-box;
		/* margin-top: 15rpx; */
	}
	.user-top{
		display: flex;
		align-items: center;
	}
	.user-img{
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background-color: pink;
	}
	.user-img>image{
		width: 100%;
		height: 100%;
	}
	.user-name{
		font-size: 32rpx;
		color: #333333;
		margin-left: 15rpx;
	}
	.user-bottom{
		display: flex;
		align-items: center;
		font-size: 28rpx;
		margin-top: 15rpx;
		color: #666666;
	}
	.user-phone{
		width: 50%;
	}
</style>

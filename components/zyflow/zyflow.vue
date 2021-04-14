<template>
	<view  class="zy_content">
		<view id="zy_column_view" v-for="(item,index) in contentlist" :key="index" class="zy_list">
			<view v-for="(citem,cindex) in item.list" :key="cindex" class="zy_card">
				<image @load="showcontent" @error="showcontent" @tap="touch_card" :data-id="citem.id" :src="citem.src" :key="cindex" mode="widthFix"></image>
				<view @tap="touch_card" :data-id="citem.id"  class="zy_bottom_view">
					<text class="zy_title">{{citem.title}}</text>
					<view class="btmInfo">
						<view class="leftInfo">
							<text class="zy_money">¥ {{citem.newPrice}}</text>
							<text class="zy_old_money">¥{{citem.oldPrice}}</text>
						</view>
						<!-- <view class="zy_type_view">{{citem.buyNum/10000>=1?parseInt(citem.buyNum/10000)+'w':citem.buyNum}}人购买</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			flowlist:{
				type:Array
			},
			page:{
				type:Number,
				default:1
			},
			clickType:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				//渲染内容列表 (左右两列)
				contentlist:[
					{
						list:[]
					},
					{
						list:[]
					}
				]
			};
		},
		watch:{
			flowlist(newVal,oldVal){
				if(!this.clickType){
					if(this.page>1){
						this.showcontent();
						this.clickType = false;
					}
				}else{
					if(this.page>1){
						this.showcontent();
					}else{
						console.log(newVal)
						this.flowlist = newVal
						if(this.flowlist.length){
							setTimeout(()=>{
								 this.zyinit()
							},200)
						}
					}
				}
			}
		},
		methods:{
			//渲染列表
			showcontent(){
				const index = this.contentlist.reduce(function(total,current){
					return total + current.list.length
				},0);
				if(index>this.flowlist.length-1) {
					this.$emit('flowend')
				    return
				};
				const query = uni.createSelectorQuery().in(this);
				let flag = 0;
				query.selectAll('#zy_column_view').boundingClientRect(data => {
					flag = data[0].bottom - data[1].bottom<0?0:1;
				    this.contentlist[flag].list.push(this.flowlist[index])
				}).exec()
			},
			//卡片点击事件
			touch_card(e){
				this.$emit('flowtap',e.currentTarget.dataset.id)
			},
			//初始化
			zyinit(){
				this.contentlist =[{list:[]},{list:[]}];
				setTimeout(()=>{
					this.showcontent();
				},100)
			}
		},
		mounted() {
		    if(this.flowlist.length){
				setTimeout(()=>{
					 this.zyinit()
				},200)
		    }
		}
	}
</script>

<style scoped>
	.zy_content{
		width: 100%;
		height: 100%;
		background-color: #f6f6f6;
		position: relative;
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		align-items:flex-start;
		box-sizing: border-box;
		padding: 0 20upx;
	}
	.zy_list{
		width: 48%;
		display:flex;
		flex-direction:column;
	}
	.zy_card{
		width: 100%;
		background-color: #fefefe;
		border-radius: 10rpx;
		overflow: hidden;
		/* box-shadow:1px 1px 5px gray; */
		margin-top: 25rpx;
	}
	.zy_card image{
		width: 100%;
		margin-bottom:5rpx;
	}
	/* 底部卡片内容 */
	.zy_bottom_view{
		width: 100%;
		min-height: 100rpx;
		background-color: #fff;
		margin-bottom: 15rpx;
		display: flex;
		flex-direction: column;
	}
	.zy_title{
		display: inline-block;
		width: 90%;
		max-height: 70rpx;
		margin-left: 5%;
		margin-top: 10rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #252525;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.zy_money{
		display:block;
		margin-left: 5%;
		/* margin-top: 5rpx; */
		color: #0F0F0F;
		font-size: 26rpx;
		font-weight: bold;
	}
	.zy_old_money{
		display:block;
		margin-left: 5%;
		color: #acacac;
		font-size: 26rpx;
		text-decoration: line-through;
		margin-top: 5rpx;
	}
	.zy_type_view{
		display: inline-block;
		margin-bottom: 10rpx;
		color: #999999;
		font-size: 22rpx;
		padding: 2rpx 5px;
		border-radius:0 5rpx;
		margin-left: 5%;
	}
	.btmInfo{
		width: 100%;
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.leftInfo{
		width: 60%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
</style>

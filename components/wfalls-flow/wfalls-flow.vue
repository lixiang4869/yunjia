<template>
	<view class="list-container">
		<view id="wf-list" class="list" v-for="(list,listIndex) of viewList" :key="listIndex" style="background: #f4f4f4;">
            <view class="item" v-for="(item,index) of list.list" :key="index" style="background: #ffffff;border-radius: 10rpx;" @click="itemclick(item)">
                <image @load="handleViewRender(listIndex,index)" @error="handleViewRender(listIndex,index)" :src="url+item.product[0].img" mode="widthFix" style="border-top-left-radius: 10rpx;border-top-right-radius: 10rpx;width: 100%;"></image>
                <view class="desc">{{item.product[0].name}}</view>
				<view style="margin-left: 20rpx;">
					<text  style="font-weight: 700;font-size: 28upx;color: #FE1722;font-size: 34upx;">￥</text>
					<text  style="font-weight: 700;color: #FE1722;font-size: 34upx;">{{item.product[0].nowprice}}</text>
					<text style="text-decoration: line-through;color: #999999;margin-left: 5upx;font-size: 28upx;text-align: left;flex: 1;">￥{{item.product[0].price}}</text>
				</view>
				<view style="display: flex;flex-direction: row;justify-content: space-between;">
				<view style="margin:20rpx;font-size: 22rpx;color: #666;">销量：{{item.sell}}</view>
				<view style="margin:20rpx;font-size: 22rpx;color: #FE1722;">距您{{item.getDistance}}</view>
				</view>
            </view>
        </view>
	</view>
</template>
<script>
	export default {
        props:{
            list:{
                type:Array, //实际请求获取的列表数据
            }
        },
		data() {
			return {
				url: this.$store.state.url,
                viewList:[{list:[]},{list:[]}],  //展示到视图的列表数据
                everyNum:2
			}
		},
		watch:{
			//    list: function (val) {
			// 		console.log(val);
			//             this.list = val
			// 			this.viewList=[{list:[]},{list:[]}]
			// setTimeout(()=>{
			//     this.handleViewRender(0,0)
			// },0)
			//         },
		},
		methods: {
			itemclick(item){
				this.$emit("itemclick",item);
			},
            init(){
                this.viewList = [{list:[]},{list:[]}];
                setTimeout(()=>{
                    this.handleViewRender(0,0)
                },0)
            },
			handleViewRender(x,y){
                // console.log(x,y);
                // const num = (x+1)*(y+1);
                // console.log(num%(this.everyNum));
                // console.log(num);
                // if((num%(this.everyNum))!==0&&num!==1)return;
                // console.log(num,'----');
                const index = this.viewList.reduce((total,current)=>total + current.list.length,0)
                if(index>this.list.length-1) {
                    // 加载完成触发事件并返回加载过的图片数
                    this.$emit('finishLoad',index)
                    return
                };
                const query = uni.createSelectorQuery().in(this);
                let listFlag = 0;
                query.selectAll('#wf-list').boundingClientRect(data => {
                    listFlag = data[0].bottom - data[1].bottom<=0?0:1;
                    this.viewList[listFlag].list.push(this.list[index])
                    // this.list.slice(index,index+this.everyNum).forEach((item,index)=>{
                    //     const flag = listFlag===0?index&1:Number(!(index&1))
                    //     this.viewList[flag].list.push(item)
                    // })
                }).exec()
            },
		},
        mounted() {
            if(this.list.length){
                this.init()
            }
        }
	}
</script>

<style lang="stylus" scoped>
    .list-container
        display flex
        justify-content space-between
        align-items:flex-start
        padding-top 20rpx
        .list
            width calc(50% - 10rpx)
            display flex
            flex-direction column
            .item
                margin-bottom 10rpx
				
               
                .desc
                  margin 20rpx
               
                  font-size 30rpx
                  font-weight 700
                  color #333
</style>
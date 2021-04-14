
import request from '../../../store/http.js';

export default {
	
	data() {
		return {
			loadingType:0,//加载状态
			
			guanggaoImg:'',
			amapPlugin: null,
			 key: '980c4a9d17bc9c06a85d488adaac1f09'  ,
			
			swiperImg:[],//轮播图片
			sort1: 0,
			url: this.$store.state.url,
			imgurl: this.$store.state.imgurl,
			icon: [],
			buyLimit: [
			
			],
			contrast: [{ name: '默认排序',title: '默认排序', type: 1 }, {name: '销量最高', title: '销量最高', type:0}, {name: '积分', title: '积分', type: 2 },{name:'距离最近',title:'距离最近',type:0}],
			currentpage: 1,
			type:1,
			location:null,
			shops: [],
		
		};
	
	},
	
	created() {
		
		// this.getLabels(); //获取商户分类图标
		// this.getBannerList();
		// this.OneGetShops(  ); //获取商铺列表

	
	},
	
	methods: {
	
	
	// 获取逛街首页信息
	getBannerList() {
		request.urlRequest(
			this.url + '/api/index/getBannerList',{type:1},{},'POST',
			 (res) => {
				console.log('轮播图',res);
				this.swiperImg = res.data.data.banner //轮播图
			
				
			}
		)
		
	},
		shopDetalis(id){
			console.log(id);
			uni.navigateTo({
				url:"/pages/Home/category/list?id="+id
			})
			switch(id){
				case 8:
					// uni.navigateTo({
					// 	url:"/pages/Home/category/waimai?id="+id
					// })
					break;
				case 9:
					break;
			}
		},
	
		// 店铺点击事件
		merchantStore(item) {
			uni.navigateTo({
				url:"../merchant/merchant?shopId="+item.id
			})
		},
	
		
		
		
		// 排序点击事件
		sort(index) {
			this.sort1 = index;
			this.type=this.contrast[index].type
			
			this.OneGetShops();
		
		}
	},
	onPullDownRefresh() {
		this.getLocation();
		// 	this.getLabels();
		// this.OneGetShops();
		uni.stopPullDownRefresh(); //这里是防止下拉的回不去，回去效果卡顿
	},
	onReachBottom() {
		if(!this.isNewRenderDone) return;
		this.isNewRenderDone = false
				console.log('上拉加载事件');
	            // 每次拉到页面底部,请求页数自加
	            this.currentpage++;
	            if (this.loadingType != 0) { // loadingType!=0;直接返回
	                return false;
	            }
	            this.loadingType = 1;
	            uni.showNavigationBarLoading();// 显示加载动画
	            // 第二次之后请求数据
				request.urlRequest(
					this.url + '/api/guangjie/indexshop',
					{ lng: this.location.longitude,
						 lat: this.location.latitude,
						 page: this.currentpage,
						
						 type: this.contrast[this.sort1].type
						},
					{},
					'POST',
					 (res) => {
						if(this.currentpage<res.data.data.pageTotal){
							this.loadingType=0
						}else this.loadingType=2
						  uni.hideNavigationBarLoading()
						 this.shops = this.shops.concat(res.data.data.items);
						setTimeout(()=>{
						    this.$refs.wfalls.handleViewRender();
						},0)
					}
				)
	       
	}
};


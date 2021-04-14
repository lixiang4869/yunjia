function urlRequest(url,param,token,way,fun,res){
	//获取token

	// 进行请求
	uni.request({
		url:url,
		data: param,
		// header:{
			
		// 	 'content-type': 'application/json',
		// 	 'authtoken':token
		// },
		header:token,
		// 获取设置请求方式
		method:way,
		success: (res) => {
			if(res.data.code == -7){
				uni.hideLoading();
				uni.removeStorage({key:"authtoken"});
				uni.navigateTo({
					url:'/pages/My/Login-registration/Login-registration'
				})
			}else
			
			fun(res);
		},
		fail(e) {
		
			uni.hideLoading()
			uni.showToast({
				title:"网络请求失败",
				icon:"none"
			})
		}
	});
}
function wmRequest(url,param,fun,res){
	//获取token

	// 进行请求
	uni.request({
		url:url,
		data: param,
		// header:{
			
		// 	 'content-type': 'application/json',
		// 	 'authtoken':token
		// },
		// header:token,
		// 获取设置请求方式
		method:"POST",
		success: (res) => {
			if(res.data.resultCode != 1){
				uni.hideLoading();
				uni.removeStorage({key:"authtoken"});
				uni.navigateTo({
					url:'/pages/My/Login-registration/Login-registration'
				})
			}else
			
			fun(res);
		},
		fail(e) {
		
			uni.hideLoading()
			uni.showToast({
				title:"网络请求失败",
				icon:"none"
			})
		}
	});
}
export default {
	urlRequest:function(url,param,token,way,fun,res){
		//把函数放回去
		return urlRequest(url,param,token,way,fun,res);
	},
	wmRequest:function(url,param,fun,res){
		//把函数放回去
		return wmRequest(url,param,fun,res);
	}
}



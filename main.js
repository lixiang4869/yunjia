import Vue from 'vue'
import App from './App'
// 引入vuex
import store from './store'
// 把vuex定义成全局组件
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'
const currentVersion = {
    id: 124
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}



Vue.prototype.$current = currentVersion;
Vue.prototype.$api = { prePage};
let WebIM = require("utils/WebIM")["default"];

let conn = {
	closed: false,
	curOpenOpt: {},
	open(opt) {
		this.curOpenOpt = opt;
		WebIM.conn.open(opt);
		this.closed = false;
	},
	reopen() {
		if (this.closed) {
			//this.open(this.curOpenOpt);
			WebIM.conn.open(this.curOpenOpt);
			this.closed = false;
		}
	}
};

Vue.prototype.$im = WebIM;
Vue.prototype.$conn = conn;

const app = new Vue({
    ...App,
	// 挂在stroe
	store
})
app.$mount()

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],{

/***/ 0:
/*!*********************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/main.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {__webpack_require__(/*! uni-pages */ 4);var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 5));

var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ 28));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
// 把vuex定义成全局组件
_vue.default.prototype.$store = _store.default;

_vue.default.config.productionTip = false;

_App.default.mpType = 'app';
var currentVersion = {
  id: 124 };


var prePage = function prePage() {
  var pages = getCurrentPages();
  var prePage = pages[pages.length - 2];



  return prePage.$vm;
};



_vue.default.prototype.$current = currentVersion;
_vue.default.prototype.$api = { prePage: prePage };
var WebIM = __webpack_require__(/*! utils/WebIM */ 16)["default"];

var conn = {
  closed: false,
  curOpenOpt: {},
  open: function open(opt) {
    this.curOpenOpt = opt;
    WebIM.conn.open(opt);
    this.closed = false;
  },
  reopen: function reopen() {
    if (this.closed) {
      //this.open(this.curOpenOpt);
      WebIM.conn.open(this.curOpenOpt);
      this.closed = false;
    }
  } };


_vue.default.prototype.$im = WebIM;
_vue.default.prototype.$conn = conn;

var app = new _vue.default(_objectSpread(_objectSpread({},
_App.default), {}, {
  // 挂在stroe
  store: _store.default }));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),

/***/ 25:
/*!******************************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/App.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=css& */ 26);
/* harmony import */ var _E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 26:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/17311/Desktop/yunjia/App.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 5:
/*!*********************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/App.vue ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 6);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ 25);
/* harmony import */ var _E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 27);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 6:
/*!**********************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/App.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 7);
/* harmony import */ var _E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 7:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/17311/Desktop/yunjia/App.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _checkUpdater = __webpack_require__(/*! @/common/checkUpdater */ 8); // 引入检查更新模块


__webpack_require__(/*! sdk/libs/strophe */ 9);
var msgStorage = __webpack_require__(/*! comps/chat/msgstorage */ 13);
var msgType = __webpack_require__(/*! comps/chat/msgtype */ 23);

var disp = __webpack_require__(/*! utils/broadcast */ 24);
var logout = false;
var is_reconnect = false;var _default =
{
  globalData: {
    unReadMessageNum: 0,
    userInfo: null,
    saveFriendList: [],
    saveGroupInvitedList: [],
    groupList: [],
    isIPX: false //是否为iphone X
  },
  onLaunch: function onLaunch() {var _this = this;
    var uid = uni.getStorageSync("uid");
    if (uid) {

      this.$conn.open({
        apiUrl: this.$im.config.apiURL,
        user: uid,
        pwd: "123456",
        grant_type: "password",
        appKey: this.$im.config.appkey });

    }
    var me = this;
    var logs = uni.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    uni.setStorageSync("logs", logs);

    disp.on("em.main.ready", function () {
      me.calcUnReadSpot();
    });
    //离开chatroom
    disp.on("em.chatroom.leave", function () {
      console.log('em.chatroom.leave');
      me.calcUnReadSpot();
    });
    disp.on("em.chat.session.remove", function () {
      me.calcUnReadSpot();
    });
    disp.on('em.chat.audio.fileLoaded', function () {
      me.calcUnReadSpot();
    });

    disp.on('em.main.deleteFriend', function () {
      me.calcUnReadSpot();
    });
    disp.on('em.chat.audio.fileLoaded', function () {
      me.calcUnReadSpot();
    });


    this.$im.conn.listen({
      onOpened: function onOpened(message) {
        _this.$im.conn.setPresence();
        console.log('登录成功登录成功登录成功登录成功登录成功登录成功登录成功');
        message.accessToken && uni.setStorageSync("myToken", message.accessToken);
        if (is_reconnect) {
          uni.hideToast();
          // this.$helper.toast('success', '登陆成功', 2000)
          is_reconnect = false;
        }
        if (_this.getCurrentRoute() == "pages/login/login" || getCurrentRoute() == "pages/login_token/login_token") {
          _this.onLoginSuccess();
        }

      },
      onReconnect: function onReconnect() {
        // this.$helper.toast('loading', '重连中...', 2000)
      },
      onSocketConnected: function onSocketConnected() {
        // this.$helper.toast('success', '登陆成功', 2000)
      },
      onClosed: function onClosed() {
        // this.$helper.toast('none', '网络已断开', 2000)
        uni.redirectTo({
          url: "@pages/My/Login-registration/Login-registration" });

        _this.$conn.closed = true;
        _this.$im.conn.close();
      },
      onInviteMessage: function onInviteMessage(message) {
        _this.$options.globalData.saveGroupInvitedList.push(message);
        disp.fire("em.xmpp.invite.joingroup", message);
        // uni.showModal({
        // 	title: message.from + " 已邀你入群 " + message.roomid,
        // 	success(){
        // 		disp.fire("em.xmpp.invite.joingroup", message);
        // 	},
        // 	error(){
        // 		disp.fire("em.xmpp.invite.joingroup", message);
        // 	}
        // });
      },
      onPresence: function onPresence(message) {
        console.log("onPresence", message);
        switch (message.type) {
          case "unsubscribe":
            // pages[0].moveFriend(message);
            break;
          // 好友邀请列表
          case "subscribe":
            if (message.status === "[resp:true]") {
              return;
            } else {
              // pages[0].handleFriendMsg(message);
              for (var i = 0; i < _this.$options.globalData.saveFriendList.length; i++) {
                if (_this.$options.globalData.saveFriendList[i].from === message.from) {
                  _this.$options.globalData.saveFriendList[i] = message;
                  disp.fire("em.xmpp.subscribe");
                  return;
                }
              }
              _this.$options.globalData.saveFriendList.push(message);
              console.log(JSON.stringify(_this.$options.globalData.saveFriendList));
              disp.fire("em.xmpp.subscribe");
            }
            break;
          case "subscribed":
            uni.showToast({
              title: "添加成功",
              duration: 1000 });

            disp.fire("em.xmpp.subscribed");
            break;
          case "unsubscribed":
            uni.showToast({
              title: "已拒绝",
              duration: 1000 });

            break;
          case "memberJoinPublicGroupSuccess":
            // this.$helper.toast('none', '已进群', 1000)
            break;
          // 好友列表
          // case "subscribed":
          // 	let newFriendList = [];
          // 	for(let i = 0; i < me.$options.globalData.saveFriendList.length; i++){
          // 		if(me.$options.globalData.saveFriendList[i].from != message.from){
          // 			newFriendList.push(me.$options.globalData.saveFriendList[i]);
          // 		}
          // 	}
          // 	me.$options.globalData.saveFriendList = newFriendList;
          // 	break;
          // 删除好友
          case "unavailable":
            disp.fire("em.xmpp.contacts.remove");
            disp.fire("em.xmpp.group.leaveGroup", message);
            break;

          case 'deleteGroupChat':
            disp.fire("em.xmpp.invite.deleteGroup", message);
            break;

          case "leaveGroup":
            disp.fire("em.xmpp.group.leaveGroup", message);
            break;

          case "removedFromGroup":
            disp.fire("em.xmpp.group.leaveGroup", message);
            break;
          // case "joinChatRoomSuccess":
          // 	uni.showToast({
          // 		title: "JoinChatRoomSuccess",
          // 	});
          // 	break;
          // case "memberJoinChatRoomSuccess":
          // 	uni.showToast({
          // 		title: "memberJoinChatRoomSuccess",
          // 	});
          // 	break;
          // case "memberLeaveChatRoomSuccess":
          // 	uni.showToast({
          // 		title: "leaveChatRoomSuccess",
          // 	});
          // 	break;

          default:
            break;}

      },

      onRoster: function onRoster(message) {
        // let pages = getCurrentPages();
        // if(pages[0]){
        // 	pages[0].onShow();
        // }
      },

      onVideoMessage: function onVideoMessage(message) {
        console.log("onVideoMessage: ", message);
        if (message) {
          msgStorage.saveReceiveMsg(message, msgType.VIDEO);
        }
        _this.calcUnReadSpot(message);
        _this.ack(message);
      },

      onAudioMessage: function onAudioMessage(message) {
        console.log("onAudioMessage", message);
        if (message) {
          if (_this.onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.AUDIO);
          }
          _this.calcUnReadSpot(message);
          _this.ack(message);
        }
      },

      onCmdMessage: function onCmdMessage(message) {
        console.log("onCmdMessage", message);
        if (message) {
          if (_this.onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.CMD);
          }
          _this.calcUnReadSpot(message);
          _this.ack(message);
        }
      },

      // onLocationMessage: (message)=>{
      // 	console.log("Location message: ", message);
      // 	if(message){
      // 		msgStorage.saveReceiveMsg(message, msgType.LOCATION);
      // 	}
      // },

      onTextMessage: function onTextMessage(message) {
        console.log("onTextMessage", message);
        if (message) {
          if (_this.onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.TEXT);
          }
          _this.calcUnReadSpot(message);
          _this.ack(message);
        }
      },

      onEmojiMessage: function onEmojiMessage(message) {
        console.log("onEmojiMessage", message);
        if (message) {
          if (_this.onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.EMOJI);
          }
          _this.calcUnReadSpot(message);
          _this.ack(message);
        }
      },

      onPictureMessage: function onPictureMessage(message) {
        console.log("onPictureMessage", message);
        if (message) {
          if (_this.onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.IMAGE);
          }
          _this.calcUnReadSpot(message);
          _this.ack(message);
        }
      },

      onFileMessage: function onFileMessage(message) {
        console.log('onFileMessage', message);
        if (message) {
          if (_this.onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.FILE);
          }
          _this.calcUnReadSpot(message);
          _this.ack(message);
        }
      },

      // 各种异常
      onError: function onError(error) {
        console.log(error);
        // 16: server-side close the websocket connection
        if (error.type == _this.$im.statusCode.WEBIM_CONNCTION_DISCONNECTED && !logout) {
          if (_this.$im.conn.autoReconnectNumTotal < _this.$im.conn.autoReconnectNumMax) {
            return;
          }
          uni.showToast({
            title: "server-side close the websocket connection",
            duration: 1000 });

          uni.redirectTo({
            url: "../login/login" });

          logout = true;
          return;
        }
        // 8: offline by multi login
        if (error.type == _this.$im.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
          uni.showToast({
            title: "offline by multi login",
            duration: 1000 });

          uni.redirectTo({
            url: "../login/login" });

        }
        if (error.type == _this.$im.statusCode.WEBIM_CONNCTION_OPEN_ERROR) {
          disp.fire("em.xmpp.error.passwordErr");
          // uni.showModal({
          // 	title: "用户名或密码错误",
          // 	confirmText: "OK",
          // 	showCancel: false
          // });
        }
        if (error.type == _this.$im.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
          disp.fire("em.xmpp.error.tokenErr");
        }
        if (error.type == 'socket_error') {///sendMsgError
          console.log('socket_errorsocket_error', error);
          uni.showToast({
            title: "网络已断开",
            icon: 'none',
            duration: 2000 });

          disp.fire("em.xmpp.error.sendMsgErr", error);
        }
      } });












































































    //
    // const updateManager = uni.getUpdateManager();

    // updateManager.onCheckForUpdate(function (res) {

    //   // 请求完新版本信息的回调
    //   console.log("res.hasUpdate",res.hasUpdate);
    // });

    // updateManager.onUpdateReady(function (res) {
    //   uni.showModal({
    //     title: '更新提示',
    //     content: '新版本已经准备好，是否重启应用？',
    //     success(res) {
    //       if (res.confirm) {
    //         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //         updateManager.applyUpdate();
    //       }
    //     }
    //   });

    // });

    // updateManager.onUpdateFailed(function (res) {
    //   // 新的版本下载失败
    // });
    //
  },
  onShow: function onShow() {

    var updateManager = uni.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("res.hasUpdate", res.hasUpdate);
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function (res) {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function success(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              }
            } });


        });

        updateManager.onUpdateFailed(function (res) {
          // 新的版本下载失败
        });
      }
    });



  },
  // onHide: function() {
  // 	console.log('App Hide')
  // }
  methods: {

    onLoginSuccess: function onLoginSuccess() {
      uni.hideToast();
      uni.switchTab({
        url: "../chat/chat" });

    },

    ack: function ack(receiveMsg) {
      // 处理未读消息回执
      var bodyId = receiveMsg.id; // 需要发送已读回执的消息id
      var ackMsg = new this.$im.message("read", this.$im.conn.getUniqueId());
      ackMsg.set({
        id: bodyId,
        to: receiveMsg.from });

      this.$im.conn.send(ackMsg.body);
    },

    onMessageError: function onMessageError(err) {
      if (err.type === "error") {
        uni.showToast({
          title: err.errorText });

        return false;
      }
      return true;
    },

    getCurrentRoute: function getCurrentRoute() {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      return currentPage.route;
    },

    calcUnReadSpot: function calcUnReadSpot(message) {
      var myName = uni.getStorageSync("myUsername");
      var members = uni.getStorageSync("member") || []; //好友
      var listGroups = uni.getStorageSync('listGroup') || []; //群组
      var allMembers = members.concat(listGroups);
      var count = allMembers.reduce(function (result, curMember, idx) {
        var chatMsgs;
        if (curMember.roomId) {
          chatMsgs = uni.getStorageSync(curMember.roomId + myName.toLowerCase()) || [];
        } else {
          chatMsgs = uni.getStorageSync(curMember.name.toLowerCase() + myName.toLowerCase()) || [];
        }
        return result + chatMsgs.length;
      }, 0);
      this.$options.globalData.unReadMessageNum = count;
      disp.fire("em.xmpp.unreadspot", message);
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

},[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"智慧云家","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!*******************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/sdk/libs/xmldom/dom-parser.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function DOMParser(options) {
  this.options = options || { locator: {} };

}
DOMParser.prototype.parseFromString = function (source, mimeType) {
  var options = this.options;
  var sax = new XMLReader();
  var domBuilder = options.domBuilder || new DOMHandler(); //contentHandler and LexicalHandler
  var errorHandler = options.errorHandler;
  var locator = options.locator;
  var defaultNSMap = options.xmlns || {};
  var entityMap = { 'lt': '<', 'gt': '>', 'amp': '&', 'quot': '"', 'apos': "'" };
  if (locator) {
    domBuilder.setDocumentLocator(locator);
  }

  sax.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
  sax.domBuilder = options.domBuilder || domBuilder;
  if (/\/x?html?$/.test(mimeType)) {
    entityMap.nbsp = '\xa0';
    entityMap.copy = '\xa9';
    defaultNSMap[''] = 'http://www.w3.org/1999/xhtml';
  }
  defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';
  if (source) {
    sax.parse(source, defaultNSMap, entityMap);
  } else {
    sax.errorHandler.error("invalid document source");
  }
  return domBuilder.document;
};
function buildErrorHandler(errorImpl, domBuilder, locator) {
  if (!errorImpl) {
    if (domBuilder instanceof DOMHandler) {
      return domBuilder;
    }
    errorImpl = domBuilder;
  }
  var errorHandler = {};
  var isCallback = errorImpl instanceof Function;
  locator = locator || {};
  function build(key) {
    var fn = errorImpl[key];
    if (!fn && isCallback) {
      fn = errorImpl.length == 2 ? function (msg) {
        errorImpl(key, msg);
      } : errorImpl;
    }
    errorHandler[key] = fn && function (msg) {
      fn('[xmldom ' + key + ']\t' + msg + _locator(locator));
    } || function () {
    };
  }

  build('warning');
  build('error');
  build('fatalError');
  return errorHandler;
}

//console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler
 *
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
  this.cdata = false;
}
function position(locator, node) {
  node.lineNumber = locator.lineNumber;
  node.columnNumber = locator.columnNumber;
}
/**
   * @see org.xml.sax.ContentHandler#startDocument
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
   */
DOMHandler.prototype = {
  startDocument: function startDocument() {
    this.document = new DOMImplementation().createDocument(null, null, null);
    if (this.locator) {
      this.document.documentURI = this.locator.systemId;
    }
  },
  startElement: function startElement(namespaceURI, localName, qName, attrs) {
    var doc = this.document;
    var el = doc.createElementNS(namespaceURI, qName || localName);
    var len = attrs.length;
    appendElement(this, el);
    this.currentElement = el;

    this.locator && position(this.locator, el);
    for (var i = 0; i < len; i++) {
      var namespaceURI = attrs.getURI(i);
      var value = attrs.getValue(i);
      var qName = attrs.getQName(i);
      var attr = doc.createAttributeNS(namespaceURI, qName);
      if (attr.getOffset) {
        position(attr.getOffset(1), attr);
      }
      attr.value = attr.nodeValue = value;
      el.setAttributeNode(attr);
    }
  },
  endElement: function endElement(namespaceURI, localName, qName) {
    var current = this.currentElement;
    var tagName = current.tagName;
    this.currentElement = current.parentNode;
  },
  startPrefixMapping: function startPrefixMapping(prefix, uri) {
  },
  endPrefixMapping: function endPrefixMapping(prefix) {
  },
  processingInstruction: function processingInstruction(target, data) {
    var ins = this.document.createProcessingInstruction(target, data);
    this.locator && position(this.locator, ins);
    appendElement(this, ins);
  },
  ignorableWhitespace: function ignorableWhitespace(ch, start, length) {
  },
  characters: function characters(chars, start, length) {
    chars = _toString.apply(this, arguments);
    //console.log(chars)
    if (this.currentElement && chars) {
      if (this.cdata) {
        var charNode = this.document.createCDATASection(chars);
        this.currentElement.appendChild(charNode);
      } else {
        var charNode = this.document.createTextNode(chars);
        this.currentElement.appendChild(charNode);
      }
      this.locator && position(this.locator, charNode);
    }
  },
  skippedEntity: function skippedEntity(name) {
  },
  endDocument: function endDocument() {
    this.document.normalize();
  },
  setDocumentLocator: function setDocumentLocator(locator) {
    if (this.locator = locator) {// && !('lineNumber' in locator)){
      locator.lineNumber = 0;
    }
  },
  //LexicalHandler
  comment: function comment(chars, start, length) {
    chars = _toString.apply(this, arguments);
    var comm = this.document.createComment(chars);
    this.locator && position(this.locator, comm);
    appendElement(this, comm);
  },

  startCDATA: function startCDATA() {
    //used in characters() methods
    this.cdata = true;
  },
  endCDATA: function endCDATA() {
    this.cdata = false;
  },

  startDTD: function startDTD(name, publicId, systemId) {
    var impl = this.document.implementation;
    if (impl && impl.createDocumentType) {
      var dt = impl.createDocumentType(name, publicId, systemId);
      this.locator && position(this.locator, dt);
      appendElement(this, dt);
    }
  },
  /**
      * @see org.xml.sax.ErrorHandler
      * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
      */
  warning: function warning(error) {
    //console.warn('[xmldom warning]\t' + error, _locator(this.locator));
  },
  error: function error(_error) {
    //console.error('[xmldom error]\t' + error, _locator(this.locator));
  },
  fatalError: function fatalError(error) {
    //console.error('[xmldom fatalError]\t' + error, _locator(this.locator));
    throw error;
  } };

function _locator(l) {
  if (l) {
    return '\n@' + (l.systemId || '') + '#[line:' + l.lineNumber + ',col:' + l.columnNumber + ']';
  }
}
function _toString(chars, start, length) {
  if (typeof chars == 'string') {
    return chars.substr(start, length);
  } else {//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
    if (chars.length >= start + length || start) {
      return new java.lang.String(chars, start, length) + '';
    }
    return chars;
  }
}

/*
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
   * used method of org.xml.sax.ext.LexicalHandler:
   *  #comment(chars, start, length)
   *  #startCDATA()
   *  #endCDATA()
   *  #startDTD(name, publicId, systemId)
   *
   *
   * IGNORED method of org.xml.sax.ext.LexicalHandler:
   *  #endDTD()
   *  #startEntity(name)
   *  #endEntity(name)
   *
   *
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
   * IGNORED method of org.xml.sax.ext.DeclHandler
   * 	#attributeDecl(eName, aName, type, mode, value)
   *  #elementDecl(name, model)
   *  #externalEntityDecl(name, publicId, systemId)
   *  #internalEntityDecl(name, value)
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
   * IGNORED method of org.xml.sax.EntityResolver2
   *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
   *  #resolveEntity(publicId, systemId)
   *  #getExternalSubset(name, baseURI)
   * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
   * IGNORED method of org.xml.sax.DTDHandler
   *  #notationDecl(name, publicId, systemId) {};
   *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
   */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function (key) {
  DOMHandler.prototype[key] = function () {
    return null;
  };
});

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement(hander, node) {
  if (!hander.currentElement) {
    hander.document.appendChild(node);
  } else {
    hander.currentElement.appendChild(node);
  }
} //appendChild and setAttributeNS are preformance key

if (true) {
  var XMLReader = __webpack_require__(/*! ./sax */ 11).XMLReader;
  var DOMImplementation = exports.DOMImplementation = __webpack_require__(/*! ./dom */ 12).DOMImplementation;
  var XMLSerializer = exports.XMLSerializer = __webpack_require__(/*! ./dom */ 12).XMLSerializer;
  exports.DOMParser = DOMParser;
  var DOMParser = {
    DOMImplementation: DOMImplementation,
    XMLSerializer: XMLSerializer,
    DOMParser: DOMParser };

  module.exports = DOMParser;
}

/***/ }),

/***/ 11:
/*!************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/sdk/libs/xmldom/sax.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/; //\u10000-\uEFFFF
var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\xB7\u0300-\u036F\\u203F-\u2040]");
var tagNamePattern = new RegExp('^' + nameStartChar.source + nameChar.source + '*(?:\:' + nameStartChar.source + nameChar.source + '*)?$');
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_V
//S_ATTR_S,	S_E,	S_S,	S_C
var S_TAG = 0; //tag name offerring
var S_ATTR = 1; //attr name offerring
var S_ATTR_S = 2; //attr name end and space offer
var S_EQ = 3; //=space?
var S_V = 4; //attr value(no quot value only)
var S_E = 5; //attr value end and no space(quot end)
var S_S = 6; //(attr value end || tag end ) && (space offer)
var S_C = 7; //closed el<el />

function XMLReader() {

}

XMLReader.prototype = {
  parse: function parse(source, defaultNSMap, entityMap) {
    var domBuilder = this.domBuilder;
    domBuilder.startDocument();
    _copy(defaultNSMap, defaultNSMap = {});
    _parse(source, defaultNSMap, entityMap,
    domBuilder, this.errorHandler);
    domBuilder.endDocument();
  } };

function _parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
  function fixedFromCharCode(code) {
    // String.prototype.fromCharCode does not supports
    // > 2 bytes unicode chars directly
    if (code > 0xffff) {
      code -= 0x10000;
      var surrogate1 = 0xd800 + (code >> 10),
      surrogate2 = 0xdc00 + (code & 0x3ff);

      return String.fromCharCode(surrogate1, surrogate2);
    } else {
      return String.fromCharCode(code);
    }
  }

  function entityReplacer(a) {
    var k = a.slice(1, -1);
    if (k in entityMap) {
      return entityMap[k];
    } else if (k.charAt(0) === '#') {
      return fixedFromCharCode(parseInt(k.substr(1).replace('x', '0x')));
    } else {
      errorHandler.error('entity not found:' + a);
      return a;
    }
  }

  function appendText(end) {//has some bugs
    if (end > start) {
      var xt = source.substring(start, end).replace(/&#?\w+;/g, entityReplacer);
      locator && position(start);
      domBuilder.characters(xt, 0, end - start);
      start = end;
    }
  }

  function position(p, m) {
    while (p >= lineEnd && (m = linePattern.exec(source))) {
      lineStart = m.index;
      lineEnd = lineStart + m[0].length;
      locator.lineNumber++;
      ////console.log('line++:',locator,startPos,endPos)
    }
    locator.columnNumber = p - lineStart + 1;
  }

  var lineStart = 0;
  var lineEnd = 0;
  var linePattern = /.+(?:\r\n?|\n)|.*$/g;
  var locator = domBuilder.locator;

  var parseStack = [{ currentNSMap: defaultNSMapCopy }];
  var closeMap = {};
  var start = 0;
  while (true) {
    try {
      var tagStart = source.indexOf('<', start);
      if (tagStart < 0) {
        if (!source.substr(start).match(/^\s*$/)) {
          var doc = domBuilder.document;
          var text = doc.createTextNode(source.substr(start));
          doc.appendChild(text);
          domBuilder.currentElement = text;
        }
        return;
      }
      if (tagStart > start) {
        appendText(tagStart);
      }
      switch (source.charAt(tagStart + 1)) {
        case '/':
          var end = source.indexOf('>', tagStart + 3);
          var tagName = source.substring(tagStart + 2, end);
          var config = parseStack.pop();
          var localNSMap = config.localNSMap;
          if (config.tagName != tagName) {
            errorHandler.fatalError("end tag name: " + tagName + ' is not match the current start tagName:' + config.tagName);
          }
          domBuilder.endElement(config.uri, config.localName, tagName);
          if (localNSMap) {
            for (var prefix in localNSMap) {
              domBuilder.endPrefixMapping(prefix);
            }
          }
          end++;
          break;
        // end elment
        case '?': // <?...?>
          locator && position(tagStart);
          end = parseInstruction(source, tagStart, domBuilder);
          break;
        case '!': // <!doctype,<![CDATA,<!--
          locator && position(tagStart);
          end = parseDCC(source, tagStart, domBuilder, errorHandler);
          break;
        default:
          //console.log('locator', locator)

          locator && position(tagStart);

          var el = new ElementAttributes();

          //elStartEnd
          var end = parseElementStartPart(source, tagStart, el, entityReplacer, errorHandler);
          //console.log('end', end)

          var len = el.length;

          if (locator) {
            if (len) {
              //attribute position fixed
              for (var i = 0; i < len; i++) {
                var a = el[i];
                position(a.offset);
                a.offset = copyLocator(locator, {});
              }
            }
            position(end);
          }
          //console.log('el', el)

          if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
            el.closed = true;
            if (!entityMap.nbsp) {
              errorHandler.warning('unclosed xml attribute');
            }
          }
          //console.log('parseStack', parseStack)

          appendElement(el, domBuilder, parseStack);

          //console.log('el', el, parseStack)


          if (el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed) {
            end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
          } else {
            end++;
          }}

    } catch (e) {
      errorHandler.error('element parse error: ' + e);
      //console.log('element parse error: ', e)
      end = -1;
    }
    //console.log('out', end, start)


    if (end > start) {
      start = end;
    } else {
      //TODO: 这里有可能sax回退，有位置错误风险
      appendText(Math.max(tagStart, start) + 1);
    }
  }
}
function copyLocator(f, t) {
  t.lineNumber = f.lineNumber;
  t.columnNumber = f.columnNumber;
  return t;
}

/**
   * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
   * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
   */
function parseElementStartPart(source, start, el, entityReplacer, errorHandler) {
  var attrName;
  var value;
  var p = ++start;
  var s = S_TAG; //status
  while (true) {
    var c = source.charAt(p);
    switch (c) {
      case '=':
        if (s === S_ATTR) {//attrName
          attrName = source.slice(start, p);
          s = S_EQ;
        } else if (s === S_ATTR_S) {
          s = S_EQ;
        } else {
          //fatalError: equal must after attrName or space after attrName
          throw new Error('attribute equal must after attrName');
        }
        break;
      case '\'':
      case '"':
        if (s === S_EQ) {//equal
          start = p + 1;
          p = source.indexOf(c, start);
          if (p > 0) {
            value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
            el.add(attrName, value, start - 1);
            s = S_E;
          } else {
            //fatalError: no end quot match
            throw new Error('attribute value no end \'' + c + '\' match');
          }
        } else if (s == S_V) {
          value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
          ////console.log(attrName,value,start,p)
          el.add(attrName, value, start);
          //console.dir(el)
          errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ')!!');
          start = p + 1;
          s = S_E;
        } else {
          //fatalError: no equal before
          throw new Error('attribute value must after "="');
        }
        break;
      case '/':
        switch (s) {
          case S_TAG:
            el.setTagName(source.slice(start, p));
          case S_E:
          case S_S:
          case S_C:
            s = S_C;
            el.closed = true;
          case S_V:
          case S_ATTR:
          case S_ATTR_S:
            break;
          //case S_EQ:
          default:
            throw new Error("attribute invalid close char('/')");}

        break;
      case '': //end document
        //throw new Error('unexpected end of input')
        errorHandler.error('unexpected end of input');
      case '>':
        switch (s) {
          case S_TAG:
            el.setTagName(source.slice(start, p));
          case S_E:
          case S_S:
          case S_C:
            break; //normal
          case S_V: //Compatible state
          case S_ATTR:
            value = source.slice(start, p);
            if (value.slice(-1) === '/') {
              el.closed = true;
              value = value.slice(0, -1);
            }
          case S_ATTR_S:
            if (s === S_ATTR_S) {
              value = attrName;
            }
            if (s == S_V) {
              errorHandler.warning('attribute "' + value + '" missed quot(")!!');
              el.add(attrName, value.replace(/&#?\w+;/g, entityReplacer), start);
            } else {
              errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
              el.add(value, value, start);
            }
            break;
          case S_EQ:
            throw new Error('attribute value missed!!');}

        //			//console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
        return p;
      /*xml space '\x20' | #x9 | #xD | #xA; */
      case "\x80":
        c = ' ';
      default:
        if (c <= ' ') {//space
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p)); //tagName
              s = S_S;
              break;
            case S_ATTR:
              attrName = source.slice(start, p);
              s = S_ATTR_S;
              break;
            case S_V:
              var value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
              errorHandler.warning('attribute "' + value + '" missed quot(")!!');
              el.add(attrName, value, start);
            case S_E:
              s = S_S;
              break;
            //case S_S:
            //case S_EQ:
            //case S_ATTR_S:
            //	void();break;
            //case S_C:
            //ignore warning
          }
        } else {//not space
          //S_TAG,	S_ATTR,	S_EQ,	S_V
          //S_ATTR_S,	S_E,	S_S,	S_C
          switch (s) {
            //case S_TAG:void();break;
            //case S_ATTR:void();break;
            //case S_V:void();break;
            case S_ATTR_S:
              errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead!!');
              el.add(attrName, attrName, start);
              start = p;
              s = S_ATTR;
              break;
            case S_E:
              errorHandler.warning('attribute space is required"' + attrName + '"!!');
            case S_S:
              s = S_ATTR;
              start = p;
              break;
            case S_EQ:
              s = S_V;
              start = p;
              break;
            case S_C:
              throw new Error("elements closed character '/' and '>' must be connected to");}

        }}

    p++;
  }
}
/**
   * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
   */
function appendElement(el, domBuilder, parseStack) {
  var tagName = el.tagName;
  var localNSMap = null;
  var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
  var i = el.length;
  while (i--) {
    var a = el[i];
    var qName = a.qName;
    var value = a.value;
    var nsp = qName.indexOf(':');
    if (nsp > 0) {
      var prefix = a.prefix = qName.slice(0, nsp);
      var localName = qName.slice(nsp + 1);
      var nsPrefix = prefix === 'xmlns' && localName;
    } else {
      localName = qName;
      prefix = null;
      nsPrefix = qName === 'xmlns' && '';
    }
    //can not set prefix,because prefix !== ''
    a.localName = localName;
    //prefix == null for no ns prefix attribute
    if (nsPrefix !== false) {//hack!!
      if (localNSMap == null) {
        localNSMap = {};
        ////console.log(currentNSMap,0)
        _copy(currentNSMap, currentNSMap = {});
        ////console.log(currentNSMap,1)
      }
      currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
      a.uri = 'http://www.w3.org/2000/xmlns/';
      domBuilder.startPrefixMapping(nsPrefix, value);
    }
  }
  var i = el.length;
  while (i--) {
    a = el[i];
    var prefix = a.prefix;
    if (prefix) {//no prefix attribute has no namespace
      if (prefix === 'xml') {
        a.uri = 'http://www.w3.org/XML/1998/namespace';
      }
      if (prefix !== 'xmlns') {
        a.uri = currentNSMap[prefix];

        //{//console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
      }
    }
  }
  var nsp = tagName.indexOf(':');
  if (nsp > 0) {
    prefix = el.prefix = tagName.slice(0, nsp);
    localName = el.localName = tagName.slice(nsp + 1);
  } else {
    prefix = null; //important!!
    localName = el.localName = tagName;
  }
  //no prefix element has default namespace
  var ns = el.uri = currentNSMap[prefix || ''];
  domBuilder.startElement(ns, localName, tagName, el);
  //endPrefixMapping and startPrefixMapping have not any help for dom builder
  //localNSMap = null
  if (el.closed) {
    domBuilder.endElement(ns, localName, tagName);
    if (localNSMap) {
      for (prefix in localNSMap) {
        domBuilder.endPrefixMapping(prefix);
      }
    }
  } else {
    el.currentNSMap = currentNSMap;
    el.localNSMap = localNSMap;
    parseStack.push(el);
  }
}
function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
  if (/^(?:script|textarea)$/i.test(tagName)) {
    var elEndStart = source.indexOf('</' + tagName + '>', elStartEnd);
    var text = source.substring(elStartEnd + 1, elEndStart);
    if (/[&<]/.test(text)) {
      if (/^script$/i.test(tagName)) {
        //if(!/\]\]>/.test(text)){
        //lexHandler.startCDATA();
        domBuilder.characters(text, 0, text.length);
        //lexHandler.endCDATA();
        return elEndStart;
        //}
      } //}else{//text area
      text = text.replace(/&#?\w+;/g, entityReplacer);
      domBuilder.characters(text, 0, text.length);
      return elEndStart;
      //}

    }
  }
  return elStartEnd + 1;
}
function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
  //if(tagName in closeMap){
  var pos = closeMap[tagName];
  if (pos == null) {
    ////console.log(tagName)
    pos = closeMap[tagName] = source.lastIndexOf('</' + tagName + '>');
  }
  return pos < elStartEnd;
  //}
}
function _copy(source, target) {
  for (var n in source) {
    target[n] = source[n];
  }
}
function parseDCC(source, start, domBuilder, errorHandler) {//sure start with '<!'
  var next = source.charAt(start + 2);
  switch (next) {
    case '-':
      if (source.charAt(start + 3) === '-') {
        var end = source.indexOf('-->', start + 4);
        //append comment source.substring(4,end)//<!--
        if (end > start) {
          domBuilder.comment(source, start + 4, end - start - 4);
          return end + 3;
        } else {
          errorHandler.error("Unclosed comment");
          return -1;
        }
      } else {
        //error
        return -1;
      }
    default:
      if (source.substr(start + 3, 6) == 'CDATA[') {
        var end = source.indexOf(']]>', start + 9);
        domBuilder.startCDATA();
        domBuilder.characters(source, start + 9, end - start - 9);
        domBuilder.endCDATA();
        return end + 3;
      }
      //<!DOCTYPE
      //startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId)
      var matchs = split(source, start);
      var len = matchs.length;
      if (len > 1 && /!doctype/i.test(matchs[0][0])) {
        var name = matchs[1][0];
        var pubid = len > 3 && /^public$/i.test(matchs[2][0]) && matchs[3][0];
        var sysid = len > 4 && matchs[4][0];
        var lastMatch = matchs[len - 1];
        domBuilder.startDTD(name, pubid && pubid.replace(/^(['"])(.*?)\1$/, '$2'),
        sysid && sysid.replace(/^(['"])(.*?)\1$/, '$2'));
        domBuilder.endDTD();

        return lastMatch.index + lastMatch[0].length;
      }}

  return -1;
}


function parseInstruction(source, start, domBuilder) {
  var end = source.indexOf('?>', start);
  if (end) {
    var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
    if (match) {
      var len = match[0].length;
      domBuilder.processingInstruction(match[1], match[2]);
      return end + 2;
    } else {//error
      return -1;
    }
  }
  return -1;
}

/**
   * @param source
   */
function ElementAttributes(source) {

}
ElementAttributes.prototype = {
  setTagName: function setTagName(tagName) {
    if (!tagNamePattern.test(tagName)) {
      throw new Error('invalid tagName:' + tagName);
    }
    this.tagName = tagName;
  },
  add: function add(qName, value, offset) {
    if (!tagNamePattern.test(qName)) {
      throw new Error('invalid attribute:' + qName);
    }
    this[this.length++] = { qName: qName, value: value, offset: offset };
  },
  length: 0,
  getLocalName: function getLocalName(i) {
    return this[i].localName;
  },
  getOffset: function getOffset(i) {
    return this[i].offset;
  },
  getQName: function getQName(i) {
    return this[i].qName;
  },
  getURI: function getURI(i) {
    return this[i].uri;
  },
  getValue: function getValue(i) {
    return this[i].value;
  }
  //	,getIndex:function(uri, localName)){
  //		if(localName){
  //
  //		}else{
  //			var qName = uri
  //		}
  //	},
  //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
  //	getType:function(uri,localName){}
  //	getType:function(i){},
};


function _set_proto_(thiz, parent) {
  thiz.__proto__ = parent;
  return thiz;
}
if (!(_set_proto_({}, _set_proto_.prototype) instanceof _set_proto_)) {
  _set_proto_ = function _set_proto_(thiz, parent) {
    function p() {
    };
    p.prototype = parent;
    p = new p();
    for (parent in thiz) {
      p[parent] = thiz[parent];
    }
    return p;
  };
}

function split(source, start) {
  var match;
  var buf = [];
  var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
  reg.lastIndex = start;
  reg.exec(source); //skip <
  while (match = reg.exec(source)) {
    buf.push(match);
    if (match[1]) return buf;
  }
}

if (true) {
  exports.XMLReader = XMLReader;
}

/***/ }),

/***/ 1155:
/*!***************************************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/components/mpvue-citypicker/city-data/province.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var provinceData = [{
  "label": "河南省",
  "value": "41" },

{
  "label": "北京市",
  "value": "11" },

{
  "label": "天津市",
  "value": "12" },

{
  "label": "河北省",
  "value": "13" },

{
  "label": "山西省",
  "value": "14" },

{
  "label": "内蒙古自治区",
  "value": "15" },

{
  "label": "辽宁省",
  "value": "21" },

{
  "label": "吉林省",
  "value": "22" },

{
  "label": "黑龙江省",
  "value": "23" },

{
  "label": "上海市",
  "value": "31" },

{
  "label": "江苏省",
  "value": "32" },

{
  "label": "浙江省",
  "value": "33" },

{
  "label": "安徽省",
  "value": "34" },

{
  "label": "福建省",
  "value": "35" },

{
  "label": "江西省",
  "value": "36" },

{
  "label": "山东省",
  "value": "37" },


{
  "label": "湖北省",
  "value": "42" },

{
  "label": "湖南省",
  "value": "43" },

{
  "label": "广东省",
  "value": "44" },

{
  "label": "广西壮族自治区",
  "value": "45" },

{
  "label": "海南省",
  "value": "46" },

{
  "label": "重庆市",
  "value": "50" },

{
  "label": "四川省",
  "value": "51" },

{
  "label": "贵州省",
  "value": "52" },

{
  "label": "云南省",
  "value": "53" },

{
  "label": "西藏自治区",
  "value": "54" },

{
  "label": "陕西省",
  "value": "61" },

{
  "label": "甘肃省",
  "value": "62" },

{
  "label": "青海省",
  "value": "63" },

{
  "label": "宁夏回族自治区",
  "value": "64" },

{
  "label": "新疆维吾尔自治区",
  "value": "65" },

{
  "label": "台湾",
  "value": "66" },

{
  "label": "香港",
  "value": "67" },

{
  "label": "澳门",
  "value": "68" }];var _default =


provinceData;exports.default = _default;

/***/ }),

/***/ 1156:
/*!***********************************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/components/mpvue-citypicker/city-data/city.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var cityData = [
[{
  "label": "郑州市",
  "value": "4101" },

{
  "label": "开封市",
  "value": "4102" },

{
  "label": "洛阳市",
  "value": "4103" },

{
  "label": "平顶山市",
  "value": "4104" },

{
  "label": "安阳市",
  "value": "4105" },

{
  "label": "鹤壁市",
  "value": "4106" },

{
  "label": "新乡市",
  "value": "4107" },

{
  "label": "焦作市",
  "value": "4108" },

{
  "label": "濮阳市",
  "value": "4109" },

{
  "label": "许昌市",
  "value": "4110" },

{
  "label": "漯河市",
  "value": "4111" },

{
  "label": "三门峡市",
  "value": "4112" },

{
  "label": "南阳市",
  "value": "4113" },

{
  "label": "商丘市",
  "value": "4114" },

{
  "label": "信阳市",
  "value": "4115" },

{
  "label": "周口市",
  "value": "4116" },

{
  "label": "驻马店市",
  "value": "4117" },

{
  "label": "省直辖县级行政区划",
  "value": "4190" }],


[{
  "label": "市辖区",
  "value": "1101" }],

[{
  "label": "市辖区",
  "value": "1201" }],

[{
  "label": "石家庄市",
  "value": "1301" },

{
  "label": "唐山市",
  "value": "1302" },

{
  "label": "秦皇岛市",
  "value": "1303" },

{
  "label": "邯郸市",
  "value": "1304" },

{
  "label": "邢台市",
  "value": "1305" },

{
  "label": "保定市",
  "value": "1306" },

{
  "label": "张家口市",
  "value": "1307" },

{
  "label": "承德市",
  "value": "1308" },

{
  "label": "沧州市",
  "value": "1309" },

{
  "label": "廊坊市",
  "value": "1310" },

{
  "label": "衡水市",
  "value": "1311" }],


[{
  "label": "太原市",
  "value": "1401" },

{
  "label": "大同市",
  "value": "1402" },

{
  "label": "阳泉市",
  "value": "1403" },

{
  "label": "长治市",
  "value": "1404" },

{
  "label": "晋城市",
  "value": "1405" },

{
  "label": "朔州市",
  "value": "1406" },

{
  "label": "晋中市",
  "value": "1407" },

{
  "label": "运城市",
  "value": "1408" },

{
  "label": "忻州市",
  "value": "1409" },

{
  "label": "临汾市",
  "value": "1410" },

{
  "label": "吕梁市",
  "value": "1411" }],


[{
  "label": "呼和浩特市",
  "value": "1501" },

{
  "label": "包头市",
  "value": "1502" },

{
  "label": "乌海市",
  "value": "1503" },

{
  "label": "赤峰市",
  "value": "1504" },

{
  "label": "通辽市",
  "value": "1505" },

{
  "label": "鄂尔多斯市",
  "value": "1506" },

{
  "label": "呼伦贝尔市",
  "value": "1507" },

{
  "label": "巴彦淖尔市",
  "value": "1508" },

{
  "label": "乌兰察布市",
  "value": "1509" },

{
  "label": "兴安盟",
  "value": "1522" },

{
  "label": "锡林郭勒盟",
  "value": "1525" },

{
  "label": "阿拉善盟",
  "value": "1529" }],


[{
  "label": "沈阳市",
  "value": "2101" },

{
  "label": "大连市",
  "value": "2102" },

{
  "label": "鞍山市",
  "value": "2103" },

{
  "label": "抚顺市",
  "value": "2104" },

{
  "label": "本溪市",
  "value": "2105" },

{
  "label": "丹东市",
  "value": "2106" },

{
  "label": "锦州市",
  "value": "2107" },

{
  "label": "营口市",
  "value": "2108" },

{
  "label": "阜新市",
  "value": "2109" },

{
  "label": "辽阳市",
  "value": "2110" },

{
  "label": "盘锦市",
  "value": "2111" },

{
  "label": "铁岭市",
  "value": "2112" },

{
  "label": "朝阳市",
  "value": "2113" },

{
  "label": "葫芦岛市",
  "value": "2114" }],


[{
  "label": "长春市",
  "value": "2201" },

{
  "label": "吉林市",
  "value": "2202" },

{
  "label": "四平市",
  "value": "2203" },

{
  "label": "辽源市",
  "value": "2204" },

{
  "label": "通化市",
  "value": "2205" },

{
  "label": "白山市",
  "value": "2206" },

{
  "label": "松原市",
  "value": "2207" },

{
  "label": "白城市",
  "value": "2208" },

{
  "label": "延边朝鲜族自治州",
  "value": "2224" }],


[{
  "label": "哈尔滨市",
  "value": "2301" },

{
  "label": "齐齐哈尔市",
  "value": "2302" },

{
  "label": "鸡西市",
  "value": "2303" },

{
  "label": "鹤岗市",
  "value": "2304" },

{
  "label": "双鸭山市",
  "value": "2305" },

{
  "label": "大庆市",
  "value": "2306" },

{
  "label": "伊春市",
  "value": "2307" },

{
  "label": "佳木斯市",
  "value": "2308" },

{
  "label": "七台河市",
  "value": "2309" },

{
  "label": "牡丹江市",
  "value": "2310" },

{
  "label": "黑河市",
  "value": "2311" },

{
  "label": "绥化市",
  "value": "2312" },

{
  "label": "大兴安岭地区",
  "value": "2327" }],


[{
  "label": "市辖区",
  "value": "3101" }],

[{
  "label": "南京市",
  "value": "3201" },

{
  "label": "无锡市",
  "value": "3202" },

{
  "label": "徐州市",
  "value": "3203" },

{
  "label": "常州市",
  "value": "3204" },

{
  "label": "苏州市",
  "value": "3205" },

{
  "label": "南通市",
  "value": "3206" },

{
  "label": "连云港市",
  "value": "3207" },

{
  "label": "淮安市",
  "value": "3208" },

{
  "label": "盐城市",
  "value": "3209" },

{
  "label": "扬州市",
  "value": "3210" },

{
  "label": "镇江市",
  "value": "3211" },

{
  "label": "泰州市",
  "value": "3212" },

{
  "label": "宿迁市",
  "value": "3213" }],


[{
  "label": "杭州市",
  "value": "3301" },

{
  "label": "宁波市",
  "value": "3302" },

{
  "label": "温州市",
  "value": "3303" },

{
  "label": "嘉兴市",
  "value": "3304" },

{
  "label": "湖州市",
  "value": "3305" },

{
  "label": "绍兴市",
  "value": "3306" },

{
  "label": "金华市",
  "value": "3307" },

{
  "label": "衢州市",
  "value": "3308" },

{
  "label": "舟山市",
  "value": "3309" },

{
  "label": "台州市",
  "value": "3310" },

{
  "label": "丽水市",
  "value": "3311" }],


[{
  "label": "合肥市",
  "value": "3401" },

{
  "label": "芜湖市",
  "value": "3402" },

{
  "label": "蚌埠市",
  "value": "3403" },

{
  "label": "淮南市",
  "value": "3404" },

{
  "label": "马鞍山市",
  "value": "3405" },

{
  "label": "淮北市",
  "value": "3406" },

{
  "label": "铜陵市",
  "value": "3407" },

{
  "label": "安庆市",
  "value": "3408" },

{
  "label": "黄山市",
  "value": "3410" },

{
  "label": "滁州市",
  "value": "3411" },

{
  "label": "阜阳市",
  "value": "3412" },

{
  "label": "宿州市",
  "value": "3413" },

{
  "label": "六安市",
  "value": "3415" },

{
  "label": "亳州市",
  "value": "3416" },

{
  "label": "池州市",
  "value": "3417" },

{
  "label": "宣城市",
  "value": "3418" }],


[{
  "label": "福州市",
  "value": "3501" },

{
  "label": "厦门市",
  "value": "3502" },

{
  "label": "莆田市",
  "value": "3503" },

{
  "label": "三明市",
  "value": "3504" },

{
  "label": "泉州市",
  "value": "3505" },

{
  "label": "漳州市",
  "value": "3506" },

{
  "label": "南平市",
  "value": "3507" },

{
  "label": "龙岩市",
  "value": "3508" },

{
  "label": "宁德市",
  "value": "3509" }],


[{
  "label": "南昌市",
  "value": "3601" },

{
  "label": "景德镇市",
  "value": "3602" },

{
  "label": "萍乡市",
  "value": "3603" },

{
  "label": "九江市",
  "value": "3604" },

{
  "label": "新余市",
  "value": "3605" },

{
  "label": "鹰潭市",
  "value": "3606" },

{
  "label": "赣州市",
  "value": "3607" },

{
  "label": "吉安市",
  "value": "3608" },

{
  "label": "宜春市",
  "value": "3609" },

{
  "label": "抚州市",
  "value": "3610" },

{
  "label": "上饶市",
  "value": "3611" }],


[{
  "label": "济南市",
  "value": "3701" },

{
  "label": "青岛市",
  "value": "3702" },

{
  "label": "淄博市",
  "value": "3703" },

{
  "label": "枣庄市",
  "value": "3704" },

{
  "label": "东营市",
  "value": "3705" },

{
  "label": "烟台市",
  "value": "3706" },

{
  "label": "潍坊市",
  "value": "3707" },

{
  "label": "济宁市",
  "value": "3708" },

{
  "label": "泰安市",
  "value": "3709" },

{
  "label": "威海市",
  "value": "3710" },

{
  "label": "日照市",
  "value": "3711" },

{
  "label": "莱芜市",
  "value": "3712" },

{
  "label": "临沂市",
  "value": "3713" },

{
  "label": "德州市",
  "value": "3714" },

{
  "label": "聊城市",
  "value": "3715" },

{
  "label": "滨州市",
  "value": "3716" },

{
  "label": "菏泽市",
  "value": "3717" }],



[{
  "label": "武汉市",
  "value": "4201" },

{
  "label": "黄石市",
  "value": "4202" },

{
  "label": "十堰市",
  "value": "4203" },

{
  "label": "宜昌市",
  "value": "4205" },

{
  "label": "襄阳市",
  "value": "4206" },

{
  "label": "鄂州市",
  "value": "4207" },

{
  "label": "荆门市",
  "value": "4208" },

{
  "label": "孝感市",
  "value": "4209" },

{
  "label": "荆州市",
  "value": "4210" },

{
  "label": "黄冈市",
  "value": "4211" },

{
  "label": "咸宁市",
  "value": "4212" },

{
  "label": "随州市",
  "value": "4213" },

{
  "label": "恩施土家族苗族自治州",
  "value": "4228" },

{
  "label": "省直辖县级行政区划",
  "value": "4290" }],


[{
  "label": "长沙市",
  "value": "4301" },

{
  "label": "株洲市",
  "value": "4302" },

{
  "label": "湘潭市",
  "value": "4303" },

{
  "label": "衡阳市",
  "value": "4304" },

{
  "label": "邵阳市",
  "value": "4305" },

{
  "label": "岳阳市",
  "value": "4306" },

{
  "label": "常德市",
  "value": "4307" },

{
  "label": "张家界市",
  "value": "4308" },

{
  "label": "益阳市",
  "value": "4309" },

{
  "label": "郴州市",
  "value": "4310" },

{
  "label": "永州市",
  "value": "4311" },

{
  "label": "怀化市",
  "value": "4312" },

{
  "label": "娄底市",
  "value": "4313" },

{
  "label": "湘西土家族苗族自治州",
  "value": "4331" }],


[{
  "label": "广州市",
  "value": "4401" },

{
  "label": "韶关市",
  "value": "4402" },

{
  "label": "深圳市",
  "value": "4403" },

{
  "label": "珠海市",
  "value": "4404" },

{
  "label": "汕头市",
  "value": "4405" },

{
  "label": "佛山市",
  "value": "4406" },

{
  "label": "江门市",
  "value": "4407" },

{
  "label": "湛江市",
  "value": "4408" },

{
  "label": "茂名市",
  "value": "4409" },

{
  "label": "肇庆市",
  "value": "4412" },

{
  "label": "惠州市",
  "value": "4413" },

{
  "label": "梅州市",
  "value": "4414" },

{
  "label": "汕尾市",
  "value": "4415" },

{
  "label": "河源市",
  "value": "4416" },

{
  "label": "阳江市",
  "value": "4417" },

{
  "label": "清远市",
  "value": "4418" },

{
  "label": "东莞市",
  "value": "4419" },

{
  "label": "中山市",
  "value": "4420" },

{
  "label": "潮州市",
  "value": "4451" },

{
  "label": "揭阳市",
  "value": "4452" },

{
  "label": "云浮市",
  "value": "4453" }],


[{
  "label": "南宁市",
  "value": "4501" },

{
  "label": "柳州市",
  "value": "4502" },

{
  "label": "桂林市",
  "value": "4503" },

{
  "label": "梧州市",
  "value": "4504" },

{
  "label": "北海市",
  "value": "4505" },

{
  "label": "防城港市",
  "value": "4506" },

{
  "label": "钦州市",
  "value": "4507" },

{
  "label": "贵港市",
  "value": "4508" },

{
  "label": "玉林市",
  "value": "4509" },

{
  "label": "百色市",
  "value": "4510" },

{
  "label": "贺州市",
  "value": "4511" },

{
  "label": "河池市",
  "value": "4512" },

{
  "label": "来宾市",
  "value": "4513" },

{
  "label": "崇左市",
  "value": "4514" }],


[{
  "label": "海口市",
  "value": "4601" },

{
  "label": "三亚市",
  "value": "4602" },

{
  "label": "三沙市",
  "value": "4603" },

{
  "label": "儋州市",
  "value": "4604" },

{
  "label": "省直辖县级行政区划",
  "value": "4690" }],


[{
  "label": "市辖区",
  "value": "5001" },

{
  "label": "县",
  "value": "5002" }],


[{
  "label": "成都市",
  "value": "5101" },

{
  "label": "自贡市",
  "value": "5103" },

{
  "label": "攀枝花市",
  "value": "5104" },

{
  "label": "泸州市",
  "value": "5105" },

{
  "label": "德阳市",
  "value": "5106" },

{
  "label": "绵阳市",
  "value": "5107" },

{
  "label": "广元市",
  "value": "5108" },

{
  "label": "遂宁市",
  "value": "5109" },

{
  "label": "内江市",
  "value": "5110" },

{
  "label": "乐山市",
  "value": "5111" },

{
  "label": "南充市",
  "value": "5113" },

{
  "label": "眉山市",
  "value": "5114" },

{
  "label": "宜宾市",
  "value": "5115" },

{
  "label": "广安市",
  "value": "5116" },

{
  "label": "达州市",
  "value": "5117" },

{
  "label": "雅安市",
  "value": "5118" },

{
  "label": "巴中市",
  "value": "5119" },

{
  "label": "资阳市",
  "value": "5120" },

{
  "label": "阿坝藏族羌族自治州",
  "value": "5132" },

{
  "label": "甘孜藏族自治州",
  "value": "5133" },

{
  "label": "凉山彝族自治州",
  "value": "5134" }],


[{
  "label": "贵阳市",
  "value": "5201" },

{
  "label": "六盘水市",
  "value": "5202" },

{
  "label": "遵义市",
  "value": "5203" },

{
  "label": "安顺市",
  "value": "5204" },

{
  "label": "毕节市",
  "value": "5205" },

{
  "label": "铜仁市",
  "value": "5206" },

{
  "label": "黔西南布依族苗族自治州",
  "value": "5223" },

{
  "label": "黔东南苗族侗族自治州",
  "value": "5226" },

{
  "label": "黔南布依族苗族自治州",
  "value": "5227" }],


[{
  "label": "昆明市",
  "value": "5301" },

{
  "label": "曲靖市",
  "value": "5303" },

{
  "label": "玉溪市",
  "value": "5304" },

{
  "label": "保山市",
  "value": "5305" },

{
  "label": "昭通市",
  "value": "5306" },

{
  "label": "丽江市",
  "value": "5307" },

{
  "label": "普洱市",
  "value": "5308" },

{
  "label": "临沧市",
  "value": "5309" },

{
  "label": "楚雄彝族自治州",
  "value": "5323" },

{
  "label": "红河哈尼族彝族自治州",
  "value": "5325" },

{
  "label": "文山壮族苗族自治州",
  "value": "5326" },

{
  "label": "西双版纳傣族自治州",
  "value": "5328" },

{
  "label": "大理白族自治州",
  "value": "5329" },

{
  "label": "德宏傣族景颇族自治州",
  "value": "5331" },

{
  "label": "怒江傈僳族自治州",
  "value": "5333" },

{
  "label": "迪庆藏族自治州",
  "value": "5334" }],


[{
  "label": "拉萨市",
  "value": "5401" },

{
  "label": "日喀则市",
  "value": "5402" },

{
  "label": "昌都市",
  "value": "5403" },

{
  "label": "林芝市",
  "value": "5404" },

{
  "label": "山南市",
  "value": "5405" },

{
  "label": "那曲地区",
  "value": "5424" },

{
  "label": "阿里地区",
  "value": "5425" }],


[{
  "label": "西安市",
  "value": "6101" },

{
  "label": "铜川市",
  "value": "6102" },

{
  "label": "宝鸡市",
  "value": "6103" },

{
  "label": "咸阳市",
  "value": "6104" },

{
  "label": "渭南市",
  "value": "6105" },

{
  "label": "延安市",
  "value": "6106" },

{
  "label": "汉中市",
  "value": "6107" },

{
  "label": "榆林市",
  "value": "6108" },

{
  "label": "安康市",
  "value": "6109" },

{
  "label": "商洛市",
  "value": "6110" }],


[{
  "label": "兰州市",
  "value": "6201" },

{
  "label": "嘉峪关市",
  "value": "6202" },

{
  "label": "金昌市",
  "value": "6203" },

{
  "label": "白银市",
  "value": "6204" },

{
  "label": "天水市",
  "value": "6205" },

{
  "label": "武威市",
  "value": "6206" },

{
  "label": "张掖市",
  "value": "6207" },

{
  "label": "平凉市",
  "value": "6208" },

{
  "label": "酒泉市",
  "value": "6209" },

{
  "label": "庆阳市",
  "value": "6210" },

{
  "label": "定西市",
  "value": "6211" },

{
  "label": "陇南市",
  "value": "6212" },

{
  "label": "临夏回族自治州",
  "value": "6229" },

{
  "label": "甘南藏族自治州",
  "value": "6230" }],


[{
  "label": "西宁市",
  "value": "6301" },

{
  "label": "海东市",
  "value": "6302" },

{
  "label": "海北藏族自治州",
  "value": "6322" },

{
  "label": "黄南藏族自治州",
  "value": "6323" },

{
  "label": "海南藏族自治州",
  "value": "6325" },

{
  "label": "果洛藏族自治州",
  "value": "6326" },

{
  "label": "玉树藏族自治州",
  "value": "6327" },

{
  "label": "海西蒙古族藏族自治州",
  "value": "6328" }],


[{
  "label": "银川市",
  "value": "6401" },

{
  "label": "石嘴山市",
  "value": "6402" },

{
  "label": "吴忠市",
  "value": "6403" },

{
  "label": "固原市",
  "value": "6404" },

{
  "label": "中卫市",
  "value": "6405" }],


[{
  "label": "乌鲁木齐市",
  "value": "6501" },

{
  "label": "克拉玛依市",
  "value": "6502" },

{
  "label": "吐鲁番市",
  "value": "6504" },

{
  "label": "哈密市",
  "value": "6505" },

{
  "label": "昌吉回族自治州",
  "value": "6523" },

{
  "label": "博尔塔拉蒙古自治州",
  "value": "6527" },

{
  "label": "巴音郭楞蒙古自治州",
  "value": "6528" },

{
  "label": "阿克苏地区",
  "value": "6529" },

{
  "label": "克孜勒苏柯尔克孜自治州",
  "value": "6530" },

{
  "label": "喀什地区",
  "value": "6531" },

{
  "label": "和田地区",
  "value": "6532" },

{
  "label": "伊犁哈萨克自治州",
  "value": "6540" },

{
  "label": "塔城地区",
  "value": "6542" },

{
  "label": "阿勒泰地区",
  "value": "6543" },

{
  "label": "自治区直辖县级行政区划",
  "value": "6590" }],


[{
  "label": "台北",
  "value": "6601" },

{
  "label": "高雄",
  "value": "6602" },

{
  "label": "基隆",
  "value": "6603" },

{
  "label": "台中",
  "value": "6604" },

{
  "label": "台南",
  "value": "6605" },

{
  "label": "新竹",
  "value": "6606" },

{
  "label": "嘉义",
  "value": "6607" },

{
  "label": "宜兰",
  "value": "6608" },

{
  "label": "桃园",
  "value": "6609" },

{
  "label": "苗栗",
  "value": "6610" },

{
  "label": "彰化",
  "value": "6611" },

{
  "label": "南投",
  "value": "6612" },

{
  "label": "云林",
  "value": "6613" },

{
  "label": "屏东",
  "value": "6614" },

{
  "label": "台东",
  "value": "6615" },

{
  "label": "花莲",
  "value": "6616" },

{
  "label": "澎湖",
  "value": "6617" }],


[{
  "label": "香港岛",
  "value": "6701" },

{
  "label": "九龙",
  "value": "6702" },

{
  "label": "新界",
  "value": "6703" }],


[{
  "label": "澳门半岛",
  "value": "6801" },

{
  "label": "氹仔岛",
  "value": "6802" },

{
  "label": "路环岛",
  "value": "6803" },

{
  "label": "路氹城",
  "value": "6804" }]];var _default =



cityData;exports.default = _default;

/***/ }),

/***/ 1157:
/*!***********************************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/components/mpvue-citypicker/city-data/area.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var areaData = [
[
[{
  "label": "二七区",
  "value": "410103" },

{
  "label": "中原区",
  "value": "410102" },


{
  "label": "管城回族区",
  "value": "410104" },

{
  "label": "金水区",
  "value": "410105" },

{
  "label": "上街区",
  "value": "410106" },

{
  "label": "惠济区",
  "value": "410108" },

{
  "label": "中牟县",
  "value": "410122" },

{
  "label": "经开区",
  "value": "410171" },

{
  "label": "高新区",
  "value": "410172" },

{
  "label": "航空港区",
  "value": "410173" },

{
  "label": "郑东新区",
  "value": "410174" },

{
  "label": "巩义市",
  "value": "410181" },

{
  "label": "荥阳市",
  "value": "410182" },

{
  "label": "新密市",
  "value": "410183" },

{
  "label": "新郑市",
  "value": "410184" },

{
  "label": "登封市",
  "value": "410185" }],



[{
  "label": "龙亭区",
  "value": "410202" },

{
  "label": "顺河回族区",
  "value": "410203" },

{
  "label": "鼓楼区",
  "value": "410204" },

{
  "label": "禹王台区",
  "value": "410205" },

{
  "label": "祥符区",
  "value": "410212" },

{
  "label": "杞县",
  "value": "410221" },

{
  "label": "通许县",
  "value": "410222" },

{
  "label": "尉氏县",
  "value": "410223" },

{
  "label": "兰考县",
  "value": "410225" }],


[{
  "label": "老城区",
  "value": "410302" },

{
  "label": "西工区",
  "value": "410303" },

{
  "label": "瀍河回族区",
  "value": "410304" },

{
  "label": "涧西区",
  "value": "410305" },

{
  "label": "吉利区",
  "value": "410306" },

{
  "label": "洛龙区",
  "value": "410311" },

{
  "label": "孟津县",
  "value": "410322" },

{
  "label": "新安县",
  "value": "410323" },

{
  "label": "栾川县",
  "value": "410324" },

{
  "label": "嵩县",
  "value": "410325" },

{
  "label": "汝阳县",
  "value": "410326" },

{
  "label": "宜阳县",
  "value": "410327" },

{
  "label": "洛宁县",
  "value": "410328" },

{
  "label": "伊川县",
  "value": "410329" },

{
  "label": "洛阳高新技术产业开发区",
  "value": "410371" },

{
  "label": "偃师市",
  "value": "410381" }],


[{
  "label": "新华区",
  "value": "410402" },

{
  "label": "卫东区",
  "value": "410403" },

{
  "label": "石龙区",
  "value": "410404" },

{
  "label": "湛河区",
  "value": "410411" },

{
  "label": "宝丰县",
  "value": "410421" },

{
  "label": "叶县",
  "value": "410422" },

{
  "label": "鲁山县",
  "value": "410423" },

{
  "label": "郏县",
  "value": "410425" },

{
  "label": "平顶山高新技术产业开发区",
  "value": "410471" },

{
  "label": "平顶山市新城区",
  "value": "410472" },

{
  "label": "舞钢市",
  "value": "410481" },

{
  "label": "汝州市",
  "value": "410482" }],


[{
  "label": "文峰区",
  "value": "410502" },

{
  "label": "北关区",
  "value": "410503" },

{
  "label": "殷都区",
  "value": "410505" },

{
  "label": "龙安区",
  "value": "410506" },

{
  "label": "安阳县",
  "value": "410522" },

{
  "label": "汤阴县",
  "value": "410523" },

{
  "label": "滑县",
  "value": "410526" },

{
  "label": "内黄县",
  "value": "410527" },

{
  "label": "安阳高新技术产业开发区",
  "value": "410571" },

{
  "label": "林州市",
  "value": "410581" }],


[{
  "label": "鹤山区",
  "value": "410602" },

{
  "label": "山城区",
  "value": "410603" },

{
  "label": "淇滨区",
  "value": "410611" },

{
  "label": "浚县",
  "value": "410621" },

{
  "label": "淇县",
  "value": "410622" },

{
  "label": "鹤壁经济技术开发区",
  "value": "410671" }],


[{
  "label": "红旗区",
  "value": "410702" },

{
  "label": "卫滨区",
  "value": "410703" },

{
  "label": "凤泉区",
  "value": "410704" },

{
  "label": "牧野区",
  "value": "410711" },

{
  "label": "新乡县",
  "value": "410721" },

{
  "label": "获嘉县",
  "value": "410724" },

{
  "label": "原阳县",
  "value": "410725" },

{
  "label": "延津县",
  "value": "410726" },

{
  "label": "封丘县",
  "value": "410727" },

{
  "label": "长垣县",
  "value": "410728" },

{
  "label": "新乡高新技术产业开发区",
  "value": "410771" },

{
  "label": "新乡经济技术开发区",
  "value": "410772" },

{
  "label": "新乡市平原城乡一体化示范区",
  "value": "410773" },

{
  "label": "卫辉市",
  "value": "410781" },

{
  "label": "辉县市",
  "value": "410782" }],


[{
  "label": "解放区",
  "value": "410802" },

{
  "label": "中站区",
  "value": "410803" },

{
  "label": "马村区",
  "value": "410804" },

{
  "label": "山阳区",
  "value": "410811" },

{
  "label": "修武县",
  "value": "410821" },

{
  "label": "博爱县",
  "value": "410822" },

{
  "label": "武陟县",
  "value": "410823" },

{
  "label": "温县",
  "value": "410825" },

{
  "label": "焦作城乡一体化示范区",
  "value": "410871" },

{
  "label": "沁阳市",
  "value": "410882" },

{
  "label": "孟州市",
  "value": "410883" }],


[{
  "label": "华龙区",
  "value": "410902" },

{
  "label": "清丰县",
  "value": "410922" },

{
  "label": "南乐县",
  "value": "410923" },

{
  "label": "范县",
  "value": "410926" },

{
  "label": "台前县",
  "value": "410927" },

{
  "label": "濮阳县",
  "value": "410928" },

{
  "label": "河南濮阳工业园区",
  "value": "410971" },

{
  "label": "濮阳经济技术开发区",
  "value": "410972" }],


[{
  "label": "魏都区",
  "value": "411002" },

{
  "label": "建安区",
  "value": "411003" },

{
  "label": "鄢陵县",
  "value": "411024" },

{
  "label": "襄城县",
  "value": "411025" },

{
  "label": "许昌经济技术开发区",
  "value": "411071" },

{
  "label": "禹州市",
  "value": "411081" },

{
  "label": "长葛市",
  "value": "411082" }],


[{
  "label": "源汇区",
  "value": "411102" },

{
  "label": "郾城区",
  "value": "411103" },

{
  "label": "召陵区",
  "value": "411104" },

{
  "label": "舞阳县",
  "value": "411121" },

{
  "label": "临颍县",
  "value": "411122" },

{
  "label": "漯河经济技术开发区",
  "value": "411171" }],


[{
  "label": "湖滨区",
  "value": "411202" },

{
  "label": "陕州区",
  "value": "411203" },

{
  "label": "渑池县",
  "value": "411221" },

{
  "label": "卢氏县",
  "value": "411224" },

{
  "label": "河南三门峡经济开发区",
  "value": "411271" },

{
  "label": "义马市",
  "value": "411281" },

{
  "label": "灵宝市",
  "value": "411282" }],


[{
  "label": "宛城区",
  "value": "411302" },

{
  "label": "卧龙区",
  "value": "411303" },

{
  "label": "南召县",
  "value": "411321" },

{
  "label": "方城县",
  "value": "411322" },

{
  "label": "西峡县",
  "value": "411323" },

{
  "label": "镇平县",
  "value": "411324" },

{
  "label": "内乡县",
  "value": "411325" },

{
  "label": "淅川县",
  "value": "411326" },

{
  "label": "社旗县",
  "value": "411327" },

{
  "label": "唐河县",
  "value": "411328" },

{
  "label": "新野县",
  "value": "411329" },

{
  "label": "桐柏县",
  "value": "411330" },

{
  "label": "南阳高新技术产业开发区",
  "value": "411371" },

{
  "label": "南阳市城乡一体化示范区",
  "value": "411372" },

{
  "label": "邓州市",
  "value": "411381" }],


[{
  "label": "梁园区",
  "value": "411402" },

{
  "label": "睢阳区",
  "value": "411403" },

{
  "label": "民权县",
  "value": "411421" },

{
  "label": "睢县",
  "value": "411422" },

{
  "label": "宁陵县",
  "value": "411423" },

{
  "label": "柘城县",
  "value": "411424" },

{
  "label": "虞城县",
  "value": "411425" },

{
  "label": "夏邑县",
  "value": "411426" },

{
  "label": "豫东综合物流产业聚集区",
  "value": "411471" },

{
  "label": "河南商丘经济开发区",
  "value": "411472" },

{
  "label": "永城市",
  "value": "411481" }],


[{
  "label": "浉河区",
  "value": "411502" },

{
  "label": "平桥区",
  "value": "411503" },

{
  "label": "罗山县",
  "value": "411521" },

{
  "label": "光山县",
  "value": "411522" },

{
  "label": "新县",
  "value": "411523" },

{
  "label": "商城县",
  "value": "411524" },

{
  "label": "固始县",
  "value": "411525" },

{
  "label": "潢川县",
  "value": "411526" },

{
  "label": "淮滨县",
  "value": "411527" },

{
  "label": "息县",
  "value": "411528" },

{
  "label": "信阳高新技术产业开发区",
  "value": "411571" }],


[{
  "label": "川汇区",
  "value": "411602" },

{
  "label": "扶沟县",
  "value": "411621" },

{
  "label": "西华县",
  "value": "411622" },

{
  "label": "商水县",
  "value": "411623" },

{
  "label": "沈丘县",
  "value": "411624" },

{
  "label": "郸城县",
  "value": "411625" },

{
  "label": "淮阳县",
  "value": "411626" },

{
  "label": "太康县",
  "value": "411627" },

{
  "label": "鹿邑县",
  "value": "411628" },

{
  "label": "河南周口经济开发区",
  "value": "411671" },

{
  "label": "项城市",
  "value": "411681" }],


[{
  "label": "驿城区",
  "value": "411702" },

{
  "label": "西平县",
  "value": "411721" },

{
  "label": "上蔡县",
  "value": "411722" },

{
  "label": "平舆县",
  "value": "411723" },

{
  "label": "正阳县",
  "value": "411724" },

{
  "label": "确山县",
  "value": "411725" },

{
  "label": "泌阳县",
  "value": "411726" },

{
  "label": "汝南县",
  "value": "411727" },

{
  "label": "遂平县",
  "value": "411728" },

{
  "label": "新蔡县",
  "value": "411729" },

{
  "label": "河南驻马店经济开发区",
  "value": "411771" }],


[{
  "label": "济源市",
  "value": "419001" }]],


[
[{
  "label": "东城区",
  "value": "110101" },

{
  "label": "西城区",
  "value": "110102" },

{
  "label": "朝阳区",
  "value": "110105" },

{
  "label": "丰台区",
  "value": "110106" },

{
  "label": "石景山区",
  "value": "110107" },

{
  "label": "海淀区",
  "value": "110108" },

{
  "label": "门头沟区",
  "value": "110109" },

{
  "label": "房山区",
  "value": "110111" },

{
  "label": "通州区",
  "value": "110112" },

{
  "label": "顺义区",
  "value": "110113" },

{
  "label": "昌平区",
  "value": "110114" },

{
  "label": "大兴区",
  "value": "110115" },

{
  "label": "怀柔区",
  "value": "110116" },

{
  "label": "平谷区",
  "value": "110117" },

{
  "label": "密云区",
  "value": "110118" },

{
  "label": "延庆区",
  "value": "110119" }]],



[
[{
  "label": "和平区",
  "value": "120101" },

{
  "label": "河东区",
  "value": "120102" },

{
  "label": "河西区",
  "value": "120103" },

{
  "label": "南开区",
  "value": "120104" },

{
  "label": "河北区",
  "value": "120105" },

{
  "label": "红桥区",
  "value": "120106" },

{
  "label": "东丽区",
  "value": "120110" },

{
  "label": "西青区",
  "value": "120111" },

{
  "label": "津南区",
  "value": "120112" },

{
  "label": "北辰区",
  "value": "120113" },

{
  "label": "武清区",
  "value": "120114" },

{
  "label": "宝坻区",
  "value": "120115" },

{
  "label": "滨海新区",
  "value": "120116" },

{
  "label": "宁河区",
  "value": "120117" },

{
  "label": "静海区",
  "value": "120118" },

{
  "label": "蓟州区",
  "value": "120119" }]],



[
[{
  "label": "长安区",
  "value": "130102" },

{
  "label": "桥西区",
  "value": "130104" },

{
  "label": "新华区",
  "value": "130105" },

{
  "label": "井陉矿区",
  "value": "130107" },

{
  "label": "裕华区",
  "value": "130108" },

{
  "label": "藁城区",
  "value": "130109" },

{
  "label": "鹿泉区",
  "value": "130110" },

{
  "label": "栾城区",
  "value": "130111" },

{
  "label": "井陉县",
  "value": "130121" },

{
  "label": "正定县",
  "value": "130123" },

{
  "label": "行唐县",
  "value": "130125" },

{
  "label": "灵寿县",
  "value": "130126" },

{
  "label": "高邑县",
  "value": "130127" },

{
  "label": "深泽县",
  "value": "130128" },

{
  "label": "赞皇县",
  "value": "130129" },

{
  "label": "无极县",
  "value": "130130" },

{
  "label": "平山县",
  "value": "130131" },

{
  "label": "元氏县",
  "value": "130132" },

{
  "label": "赵县",
  "value": "130133" },

{
  "label": "石家庄高新技术产业开发区",
  "value": "130171" },

{
  "label": "石家庄循环化工园区",
  "value": "130172" },

{
  "label": "辛集市",
  "value": "130181" },

{
  "label": "晋州市",
  "value": "130183" },

{
  "label": "新乐市",
  "value": "130184" }],


[{
  "label": "路南区",
  "value": "130202" },

{
  "label": "路北区",
  "value": "130203" },

{
  "label": "古冶区",
  "value": "130204" },

{
  "label": "开平区",
  "value": "130205" },

{
  "label": "丰南区",
  "value": "130207" },

{
  "label": "丰润区",
  "value": "130208" },

{
  "label": "曹妃甸区",
  "value": "130209" },

{
  "label": "滦县",
  "value": "130223" },

{
  "label": "滦南县",
  "value": "130224" },

{
  "label": "乐亭县",
  "value": "130225" },

{
  "label": "迁西县",
  "value": "130227" },

{
  "label": "玉田县",
  "value": "130229" },

{
  "label": "唐山市芦台经济技术开发区",
  "value": "130271" },

{
  "label": "唐山市汉沽管理区",
  "value": "130272" },

{
  "label": "唐山高新技术产业开发区",
  "value": "130273" },

{
  "label": "河北唐山海港经济开发区",
  "value": "130274" },

{
  "label": "遵化市",
  "value": "130281" },

{
  "label": "迁安市",
  "value": "130283" }],


[{
  "label": "海港区",
  "value": "130302" },

{
  "label": "山海关区",
  "value": "130303" },

{
  "label": "北戴河区",
  "value": "130304" },

{
  "label": "抚宁区",
  "value": "130306" },

{
  "label": "青龙满族自治县",
  "value": "130321" },

{
  "label": "昌黎县",
  "value": "130322" },

{
  "label": "卢龙县",
  "value": "130324" },

{
  "label": "秦皇岛市经济技术开发区",
  "value": "130371" },

{
  "label": "北戴河新区",
  "value": "130372" }],


[{
  "label": "邯山区",
  "value": "130402" },

{
  "label": "丛台区",
  "value": "130403" },

{
  "label": "复兴区",
  "value": "130404" },

{
  "label": "峰峰矿区",
  "value": "130406" },

{
  "label": "肥乡区",
  "value": "130407" },

{
  "label": "永年区",
  "value": "130408" },

{
  "label": "临漳县",
  "value": "130423" },

{
  "label": "成安县",
  "value": "130424" },

{
  "label": "大名县",
  "value": "130425" },

{
  "label": "涉县",
  "value": "130426" },

{
  "label": "磁县",
  "value": "130427" },

{
  "label": "邱县",
  "value": "130430" },

{
  "label": "鸡泽县",
  "value": "130431" },

{
  "label": "广平县",
  "value": "130432" },

{
  "label": "馆陶县",
  "value": "130433" },

{
  "label": "魏县",
  "value": "130434" },

{
  "label": "曲周县",
  "value": "130435" },

{
  "label": "邯郸经济技术开发区",
  "value": "130471" },

{
  "label": "邯郸冀南新区",
  "value": "130473" },

{
  "label": "武安市",
  "value": "130481" }],


[{
  "label": "桥东区",
  "value": "130502" },

{
  "label": "桥西区",
  "value": "130503" },

{
  "label": "邢台县",
  "value": "130521" },

{
  "label": "临城县",
  "value": "130522" },

{
  "label": "内丘县",
  "value": "130523" },

{
  "label": "柏乡县",
  "value": "130524" },

{
  "label": "隆尧县",
  "value": "130525" },

{
  "label": "任县",
  "value": "130526" },

{
  "label": "南和县",
  "value": "130527" },

{
  "label": "宁晋县",
  "value": "130528" },

{
  "label": "巨鹿县",
  "value": "130529" },

{
  "label": "新河县",
  "value": "130530" },

{
  "label": "广宗县",
  "value": "130531" },

{
  "label": "平乡县",
  "value": "130532" },

{
  "label": "威县",
  "value": "130533" },

{
  "label": "清河县",
  "value": "130534" },

{
  "label": "临西县",
  "value": "130535" },

{
  "label": "河北邢台经济开发区",
  "value": "130571" },

{
  "label": "南宫市",
  "value": "130581" },

{
  "label": "沙河市",
  "value": "130582" }],


[{
  "label": "竞秀区",
  "value": "130602" },

{
  "label": "莲池区",
  "value": "130606" },

{
  "label": "满城区",
  "value": "130607" },

{
  "label": "清苑区",
  "value": "130608" },

{
  "label": "徐水区",
  "value": "130609" },

{
  "label": "涞水县",
  "value": "130623" },

{
  "label": "阜平县",
  "value": "130624" },

{
  "label": "定兴县",
  "value": "130626" },

{
  "label": "唐县",
  "value": "130627" },

{
  "label": "高阳县",
  "value": "130628" },

{
  "label": "容城县",
  "value": "130629" },

{
  "label": "涞源县",
  "value": "130630" },

{
  "label": "望都县",
  "value": "130631" },

{
  "label": "安新县",
  "value": "130632" },

{
  "label": "易县",
  "value": "130633" },

{
  "label": "曲阳县",
  "value": "130634" },

{
  "label": "蠡县",
  "value": "130635" },

{
  "label": "顺平县",
  "value": "130636" },

{
  "label": "博野县",
  "value": "130637" },

{
  "label": "雄县",
  "value": "130638" },

{
  "label": "保定高新技术产业开发区",
  "value": "130671" },

{
  "label": "保定白沟新城",
  "value": "130672" },

{
  "label": "涿州市",
  "value": "130681" },

{
  "label": "定州市",
  "value": "130682" },

{
  "label": "安国市",
  "value": "130683" },

{
  "label": "高碑店市",
  "value": "130684" }],


[{
  "label": "桥东区",
  "value": "130702" },

{
  "label": "桥西区",
  "value": "130703" },

{
  "label": "宣化区",
  "value": "130705" },

{
  "label": "下花园区",
  "value": "130706" },

{
  "label": "万全区",
  "value": "130708" },

{
  "label": "崇礼区",
  "value": "130709" },

{
  "label": "张北县",
  "value": "130722" },

{
  "label": "康保县",
  "value": "130723" },

{
  "label": "沽源县",
  "value": "130724" },

{
  "label": "尚义县",
  "value": "130725" },

{
  "label": "蔚县",
  "value": "130726" },

{
  "label": "阳原县",
  "value": "130727" },

{
  "label": "怀安县",
  "value": "130728" },

{
  "label": "怀来县",
  "value": "130730" },

{
  "label": "涿鹿县",
  "value": "130731" },

{
  "label": "赤城县",
  "value": "130732" },

{
  "label": "张家口市高新技术产业开发区",
  "value": "130771" },

{
  "label": "张家口市察北管理区",
  "value": "130772" },

{
  "label": "张家口市塞北管理区",
  "value": "130773" }],


[{
  "label": "双桥区",
  "value": "130802" },

{
  "label": "双滦区",
  "value": "130803" },

{
  "label": "鹰手营子矿区",
  "value": "130804" },

{
  "label": "承德县",
  "value": "130821" },

{
  "label": "兴隆县",
  "value": "130822" },

{
  "label": "滦平县",
  "value": "130824" },

{
  "label": "隆化县",
  "value": "130825" },

{
  "label": "丰宁满族自治县",
  "value": "130826" },

{
  "label": "宽城满族自治县",
  "value": "130827" },

{
  "label": "围场满族蒙古族自治县",
  "value": "130828" },

{
  "label": "承德高新技术产业开发区",
  "value": "130871" },

{
  "label": "平泉市",
  "value": "130881" }],


[{
  "label": "新华区",
  "value": "130902" },

{
  "label": "运河区",
  "value": "130903" },

{
  "label": "沧县",
  "value": "130921" },

{
  "label": "青县",
  "value": "130922" },

{
  "label": "东光县",
  "value": "130923" },

{
  "label": "海兴县",
  "value": "130924" },

{
  "label": "盐山县",
  "value": "130925" },

{
  "label": "肃宁县",
  "value": "130926" },

{
  "label": "南皮县",
  "value": "130927" },

{
  "label": "吴桥县",
  "value": "130928" },

{
  "label": "献县",
  "value": "130929" },

{
  "label": "孟村回族自治县",
  "value": "130930" },

{
  "label": "河北沧州经济开发区",
  "value": "130971" },

{
  "label": "沧州高新技术产业开发区",
  "value": "130972" },

{
  "label": "沧州渤海新区",
  "value": "130973" },

{
  "label": "泊头市",
  "value": "130981" },

{
  "label": "任丘市",
  "value": "130982" },

{
  "label": "黄骅市",
  "value": "130983" },

{
  "label": "河间市",
  "value": "130984" }],


[{
  "label": "安次区",
  "value": "131002" },

{
  "label": "广阳区",
  "value": "131003" },

{
  "label": "固安县",
  "value": "131022" },

{
  "label": "永清县",
  "value": "131023" },

{
  "label": "香河县",
  "value": "131024" },

{
  "label": "大城县",
  "value": "131025" },

{
  "label": "文安县",
  "value": "131026" },

{
  "label": "大厂回族自治县",
  "value": "131028" },

{
  "label": "廊坊经济技术开发区",
  "value": "131071" },

{
  "label": "霸州市",
  "value": "131081" },

{
  "label": "三河市",
  "value": "131082" }],


[{
  "label": "桃城区",
  "value": "131102" },

{
  "label": "冀州区",
  "value": "131103" },

{
  "label": "枣强县",
  "value": "131121" },

{
  "label": "武邑县",
  "value": "131122" },

{
  "label": "武强县",
  "value": "131123" },

{
  "label": "饶阳县",
  "value": "131124" },

{
  "label": "安平县",
  "value": "131125" },

{
  "label": "故城县",
  "value": "131126" },

{
  "label": "景县",
  "value": "131127" },

{
  "label": "阜城县",
  "value": "131128" },

{
  "label": "河北衡水经济开发区",
  "value": "131171" },

{
  "label": "衡水滨湖新区",
  "value": "131172" },

{
  "label": "深州市",
  "value": "131182" }]],



[
[{
  "label": "小店区",
  "value": "140105" },

{
  "label": "迎泽区",
  "value": "140106" },

{
  "label": "杏花岭区",
  "value": "140107" },

{
  "label": "尖草坪区",
  "value": "140108" },

{
  "label": "万柏林区",
  "value": "140109" },

{
  "label": "晋源区",
  "value": "140110" },

{
  "label": "清徐县",
  "value": "140121" },

{
  "label": "阳曲县",
  "value": "140122" },

{
  "label": "娄烦县",
  "value": "140123" },

{
  "label": "山西转型综合改革示范区",
  "value": "140171" },

{
  "label": "古交市",
  "value": "140181" }],


[{
  "label": "城区",
  "value": "140202" },

{
  "label": "矿区",
  "value": "140203" },

{
  "label": "南郊区",
  "value": "140211" },

{
  "label": "新荣区",
  "value": "140212" },

{
  "label": "阳高县",
  "value": "140221" },

{
  "label": "天镇县",
  "value": "140222" },

{
  "label": "广灵县",
  "value": "140223" },

{
  "label": "灵丘县",
  "value": "140224" },

{
  "label": "浑源县",
  "value": "140225" },

{
  "label": "左云县",
  "value": "140226" },

{
  "label": "大同县",
  "value": "140227" },

{
  "label": "山西大同经济开发区",
  "value": "140271" }],


[{
  "label": "城区",
  "value": "140302" },

{
  "label": "矿区",
  "value": "140303" },

{
  "label": "郊区",
  "value": "140311" },

{
  "label": "平定县",
  "value": "140321" },

{
  "label": "盂县",
  "value": "140322" },

{
  "label": "山西阳泉经济开发区",
  "value": "140371" }],


[{
  "label": "城区",
  "value": "140402" },

{
  "label": "郊区",
  "value": "140411" },

{
  "label": "长治县",
  "value": "140421" },

{
  "label": "襄垣县",
  "value": "140423" },

{
  "label": "屯留县",
  "value": "140424" },

{
  "label": "平顺县",
  "value": "140425" },

{
  "label": "黎城县",
  "value": "140426" },

{
  "label": "壶关县",
  "value": "140427" },

{
  "label": "长子县",
  "value": "140428" },

{
  "label": "武乡县",
  "value": "140429" },

{
  "label": "沁县",
  "value": "140430" },

{
  "label": "沁源县",
  "value": "140431" },

{
  "label": "山西长治高新技术产业园区",
  "value": "140471" },

{
  "label": "潞城市",
  "value": "140481" }],


[{
  "label": "城区",
  "value": "140502" },

{
  "label": "沁水县",
  "value": "140521" },

{
  "label": "阳城县",
  "value": "140522" },

{
  "label": "陵川县",
  "value": "140524" },

{
  "label": "泽州县",
  "value": "140525" },

{
  "label": "高平市",
  "value": "140581" }],


[{
  "label": "朔城区",
  "value": "140602" },

{
  "label": "平鲁区",
  "value": "140603" },

{
  "label": "山阴县",
  "value": "140621" },

{
  "label": "应县",
  "value": "140622" },

{
  "label": "右玉县",
  "value": "140623" },

{
  "label": "怀仁县",
  "value": "140624" },

{
  "label": "山西朔州经济开发区",
  "value": "140671" }],


[{
  "label": "榆次区",
  "value": "140702" },

{
  "label": "榆社县",
  "value": "140721" },

{
  "label": "左权县",
  "value": "140722" },

{
  "label": "和顺县",
  "value": "140723" },

{
  "label": "昔阳县",
  "value": "140724" },

{
  "label": "寿阳县",
  "value": "140725" },

{
  "label": "太谷县",
  "value": "140726" },

{
  "label": "祁县",
  "value": "140727" },

{
  "label": "平遥县",
  "value": "140728" },

{
  "label": "灵石县",
  "value": "140729" },

{
  "label": "介休市",
  "value": "140781" }],


[{
  "label": "盐湖区",
  "value": "140802" },

{
  "label": "临猗县",
  "value": "140821" },

{
  "label": "万荣县",
  "value": "140822" },

{
  "label": "闻喜县",
  "value": "140823" },

{
  "label": "稷山县",
  "value": "140824" },

{
  "label": "新绛县",
  "value": "140825" },

{
  "label": "绛县",
  "value": "140826" },

{
  "label": "垣曲县",
  "value": "140827" },

{
  "label": "夏县",
  "value": "140828" },

{
  "label": "平陆县",
  "value": "140829" },

{
  "label": "芮城县",
  "value": "140830" },

{
  "label": "永济市",
  "value": "140881" },

{
  "label": "河津市",
  "value": "140882" }],


[{
  "label": "忻府区",
  "value": "140902" },

{
  "label": "定襄县",
  "value": "140921" },

{
  "label": "五台县",
  "value": "140922" },

{
  "label": "代县",
  "value": "140923" },

{
  "label": "繁峙县",
  "value": "140924" },

{
  "label": "宁武县",
  "value": "140925" },

{
  "label": "静乐县",
  "value": "140926" },

{
  "label": "神池县",
  "value": "140927" },

{
  "label": "五寨县",
  "value": "140928" },

{
  "label": "岢岚县",
  "value": "140929" },

{
  "label": "河曲县",
  "value": "140930" },

{
  "label": "保德县",
  "value": "140931" },

{
  "label": "偏关县",
  "value": "140932" },

{
  "label": "五台山风景名胜区",
  "value": "140971" },

{
  "label": "原平市",
  "value": "140981" }],


[{
  "label": "尧都区",
  "value": "141002" },

{
  "label": "曲沃县",
  "value": "141021" },

{
  "label": "翼城县",
  "value": "141022" },

{
  "label": "襄汾县",
  "value": "141023" },

{
  "label": "洪洞县",
  "value": "141024" },

{
  "label": "古县",
  "value": "141025" },

{
  "label": "安泽县",
  "value": "141026" },

{
  "label": "浮山县",
  "value": "141027" },

{
  "label": "吉县",
  "value": "141028" },

{
  "label": "乡宁县",
  "value": "141029" },

{
  "label": "大宁县",
  "value": "141030" },

{
  "label": "隰县",
  "value": "141031" },

{
  "label": "永和县",
  "value": "141032" },

{
  "label": "蒲县",
  "value": "141033" },

{
  "label": "汾西县",
  "value": "141034" },

{
  "label": "侯马市",
  "value": "141081" },

{
  "label": "霍州市",
  "value": "141082" }],


[{
  "label": "离石区",
  "value": "141102" },

{
  "label": "文水县",
  "value": "141121" },

{
  "label": "交城县",
  "value": "141122" },

{
  "label": "兴县",
  "value": "141123" },

{
  "label": "临县",
  "value": "141124" },

{
  "label": "柳林县",
  "value": "141125" },

{
  "label": "石楼县",
  "value": "141126" },

{
  "label": "岚县",
  "value": "141127" },

{
  "label": "方山县",
  "value": "141128" },

{
  "label": "中阳县",
  "value": "141129" },

{
  "label": "交口县",
  "value": "141130" },

{
  "label": "孝义市",
  "value": "141181" },

{
  "label": "汾阳市",
  "value": "141182" }]],



[
[{
  "label": "新城区",
  "value": "150102" },

{
  "label": "回民区",
  "value": "150103" },

{
  "label": "玉泉区",
  "value": "150104" },

{
  "label": "赛罕区",
  "value": "150105" },

{
  "label": "土默特左旗",
  "value": "150121" },

{
  "label": "托克托县",
  "value": "150122" },

{
  "label": "和林格尔县",
  "value": "150123" },

{
  "label": "清水河县",
  "value": "150124" },

{
  "label": "武川县",
  "value": "150125" },

{
  "label": "呼和浩特金海工业园区",
  "value": "150171" },

{
  "label": "呼和浩特经济技术开发区",
  "value": "150172" }],


[{
  "label": "东河区",
  "value": "150202" },

{
  "label": "昆都仑区",
  "value": "150203" },

{
  "label": "青山区",
  "value": "150204" },

{
  "label": "石拐区",
  "value": "150205" },

{
  "label": "白云鄂博矿区",
  "value": "150206" },

{
  "label": "九原区",
  "value": "150207" },

{
  "label": "土默特右旗",
  "value": "150221" },

{
  "label": "固阳县",
  "value": "150222" },

{
  "label": "达尔罕茂明安联合旗",
  "value": "150223" },

{
  "label": "包头稀土高新技术产业开发区",
  "value": "150271" }],


[{
  "label": "海勃湾区",
  "value": "150302" },

{
  "label": "海南区",
  "value": "150303" },

{
  "label": "乌达区",
  "value": "150304" }],


[{
  "label": "红山区",
  "value": "150402" },

{
  "label": "元宝山区",
  "value": "150403" },

{
  "label": "松山区",
  "value": "150404" },

{
  "label": "阿鲁科尔沁旗",
  "value": "150421" },

{
  "label": "巴林左旗",
  "value": "150422" },

{
  "label": "巴林右旗",
  "value": "150423" },

{
  "label": "林西县",
  "value": "150424" },

{
  "label": "克什克腾旗",
  "value": "150425" },

{
  "label": "翁牛特旗",
  "value": "150426" },

{
  "label": "喀喇沁旗",
  "value": "150428" },

{
  "label": "宁城县",
  "value": "150429" },

{
  "label": "敖汉旗",
  "value": "150430" }],


[{
  "label": "科尔沁区",
  "value": "150502" },

{
  "label": "科尔沁左翼中旗",
  "value": "150521" },

{
  "label": "科尔沁左翼后旗",
  "value": "150522" },

{
  "label": "开鲁县",
  "value": "150523" },

{
  "label": "库伦旗",
  "value": "150524" },

{
  "label": "奈曼旗",
  "value": "150525" },

{
  "label": "扎鲁特旗",
  "value": "150526" },

{
  "label": "通辽经济技术开发区",
  "value": "150571" },

{
  "label": "霍林郭勒市",
  "value": "150581" }],


[{
  "label": "东胜区",
  "value": "150602" },

{
  "label": "康巴什区",
  "value": "150603" },

{
  "label": "达拉特旗",
  "value": "150621" },

{
  "label": "准格尔旗",
  "value": "150622" },

{
  "label": "鄂托克前旗",
  "value": "150623" },

{
  "label": "鄂托克旗",
  "value": "150624" },

{
  "label": "杭锦旗",
  "value": "150625" },

{
  "label": "乌审旗",
  "value": "150626" },

{
  "label": "伊金霍洛旗",
  "value": "150627" }],


[{
  "label": "海拉尔区",
  "value": "150702" },

{
  "label": "扎赉诺尔区",
  "value": "150703" },

{
  "label": "阿荣旗",
  "value": "150721" },

{
  "label": "莫力达瓦达斡尔族自治旗",
  "value": "150722" },

{
  "label": "鄂伦春自治旗",
  "value": "150723" },

{
  "label": "鄂温克族自治旗",
  "value": "150724" },

{
  "label": "陈巴尔虎旗",
  "value": "150725" },

{
  "label": "新巴尔虎左旗",
  "value": "150726" },

{
  "label": "新巴尔虎右旗",
  "value": "150727" },

{
  "label": "满洲里市",
  "value": "150781" },

{
  "label": "牙克石市",
  "value": "150782" },

{
  "label": "扎兰屯市",
  "value": "150783" },

{
  "label": "额尔古纳市",
  "value": "150784" },

{
  "label": "根河市",
  "value": "150785" }],


[{
  "label": "临河区",
  "value": "150802" },

{
  "label": "五原县",
  "value": "150821" },

{
  "label": "磴口县",
  "value": "150822" },

{
  "label": "乌拉特前旗",
  "value": "150823" },

{
  "label": "乌拉特中旗",
  "value": "150824" },

{
  "label": "乌拉特后旗",
  "value": "150825" },

{
  "label": "杭锦后旗",
  "value": "150826" }],


[{
  "label": "集宁区",
  "value": "150902" },

{
  "label": "卓资县",
  "value": "150921" },

{
  "label": "化德县",
  "value": "150922" },

{
  "label": "商都县",
  "value": "150923" },

{
  "label": "兴和县",
  "value": "150924" },

{
  "label": "凉城县",
  "value": "150925" },

{
  "label": "察哈尔右翼前旗",
  "value": "150926" },

{
  "label": "察哈尔右翼中旗",
  "value": "150927" },

{
  "label": "察哈尔右翼后旗",
  "value": "150928" },

{
  "label": "四子王旗",
  "value": "150929" },

{
  "label": "丰镇市",
  "value": "150981" }],


[{
  "label": "乌兰浩特市",
  "value": "152201" },

{
  "label": "阿尔山市",
  "value": "152202" },

{
  "label": "科尔沁右翼前旗",
  "value": "152221" },

{
  "label": "科尔沁右翼中旗",
  "value": "152222" },

{
  "label": "扎赉特旗",
  "value": "152223" },

{
  "label": "突泉县",
  "value": "152224" }],


[{
  "label": "二连浩特市",
  "value": "152501" },

{
  "label": "锡林浩特市",
  "value": "152502" },

{
  "label": "阿巴嘎旗",
  "value": "152522" },

{
  "label": "苏尼特左旗",
  "value": "152523" },

{
  "label": "苏尼特右旗",
  "value": "152524" },

{
  "label": "东乌珠穆沁旗",
  "value": "152525" },

{
  "label": "西乌珠穆沁旗",
  "value": "152526" },

{
  "label": "太仆寺旗",
  "value": "152527" },

{
  "label": "镶黄旗",
  "value": "152528" },

{
  "label": "正镶白旗",
  "value": "152529" },

{
  "label": "正蓝旗",
  "value": "152530" },

{
  "label": "多伦县",
  "value": "152531" },

{
  "label": "乌拉盖管委会",
  "value": "152571" }],


[{
  "label": "阿拉善左旗",
  "value": "152921" },

{
  "label": "阿拉善右旗",
  "value": "152922" },

{
  "label": "额济纳旗",
  "value": "152923" },

{
  "label": "内蒙古阿拉善经济开发区",
  "value": "152971" }]],



[
[{
  "label": "和平区",
  "value": "210102" },

{
  "label": "沈河区",
  "value": "210103" },

{
  "label": "大东区",
  "value": "210104" },

{
  "label": "皇姑区",
  "value": "210105" },

{
  "label": "铁西区",
  "value": "210106" },

{
  "label": "苏家屯区",
  "value": "210111" },

{
  "label": "浑南区",
  "value": "210112" },

{
  "label": "沈北新区",
  "value": "210113" },

{
  "label": "于洪区",
  "value": "210114" },

{
  "label": "辽中区",
  "value": "210115" },

{
  "label": "康平县",
  "value": "210123" },

{
  "label": "法库县",
  "value": "210124" },

{
  "label": "新民市",
  "value": "210181" }],


[{
  "label": "中山区",
  "value": "210202" },

{
  "label": "西岗区",
  "value": "210203" },

{
  "label": "沙河口区",
  "value": "210204" },

{
  "label": "甘井子区",
  "value": "210211" },

{
  "label": "旅顺口区",
  "value": "210212" },

{
  "label": "金州区",
  "value": "210213" },

{
  "label": "普兰店区",
  "value": "210214" },

{
  "label": "长海县",
  "value": "210224" },

{
  "label": "瓦房店市",
  "value": "210281" },

{
  "label": "庄河市",
  "value": "210283" }],


[{
  "label": "铁东区",
  "value": "210302" },

{
  "label": "铁西区",
  "value": "210303" },

{
  "label": "立山区",
  "value": "210304" },

{
  "label": "千山区",
  "value": "210311" },

{
  "label": "台安县",
  "value": "210321" },

{
  "label": "岫岩满族自治县",
  "value": "210323" },

{
  "label": "海城市",
  "value": "210381" }],


[{
  "label": "新抚区",
  "value": "210402" },

{
  "label": "东洲区",
  "value": "210403" },

{
  "label": "望花区",
  "value": "210404" },

{
  "label": "顺城区",
  "value": "210411" },

{
  "label": "抚顺县",
  "value": "210421" },

{
  "label": "新宾满族自治县",
  "value": "210422" },

{
  "label": "清原满族自治县",
  "value": "210423" }],


[{
  "label": "平山区",
  "value": "210502" },

{
  "label": "溪湖区",
  "value": "210503" },

{
  "label": "明山区",
  "value": "210504" },

{
  "label": "南芬区",
  "value": "210505" },

{
  "label": "本溪满族自治县",
  "value": "210521" },

{
  "label": "桓仁满族自治县",
  "value": "210522" }],


[{
  "label": "元宝区",
  "value": "210602" },

{
  "label": "振兴区",
  "value": "210603" },

{
  "label": "振安区",
  "value": "210604" },

{
  "label": "宽甸满族自治县",
  "value": "210624" },

{
  "label": "东港市",
  "value": "210681" },

{
  "label": "凤城市",
  "value": "210682" }],


[{
  "label": "古塔区",
  "value": "210702" },

{
  "label": "凌河区",
  "value": "210703" },

{
  "label": "太和区",
  "value": "210711" },

{
  "label": "黑山县",
  "value": "210726" },

{
  "label": "义县",
  "value": "210727" },

{
  "label": "凌海市",
  "value": "210781" },

{
  "label": "北镇市",
  "value": "210782" }],


[{
  "label": "站前区",
  "value": "210802" },

{
  "label": "西市区",
  "value": "210803" },

{
  "label": "鲅鱼圈区",
  "value": "210804" },

{
  "label": "老边区",
  "value": "210811" },

{
  "label": "盖州市",
  "value": "210881" },

{
  "label": "大石桥市",
  "value": "210882" }],


[{
  "label": "海州区",
  "value": "210902" },

{
  "label": "新邱区",
  "value": "210903" },

{
  "label": "太平区",
  "value": "210904" },

{
  "label": "清河门区",
  "value": "210905" },

{
  "label": "细河区",
  "value": "210911" },

{
  "label": "阜新蒙古族自治县",
  "value": "210921" },

{
  "label": "彰武县",
  "value": "210922" }],


[{
  "label": "白塔区",
  "value": "211002" },

{
  "label": "文圣区",
  "value": "211003" },

{
  "label": "宏伟区",
  "value": "211004" },

{
  "label": "弓长岭区",
  "value": "211005" },

{
  "label": "太子河区",
  "value": "211011" },

{
  "label": "辽阳县",
  "value": "211021" },

{
  "label": "灯塔市",
  "value": "211081" }],


[{
  "label": "双台子区",
  "value": "211102" },

{
  "label": "兴隆台区",
  "value": "211103" },

{
  "label": "大洼区",
  "value": "211104" },

{
  "label": "盘山县",
  "value": "211122" }],


[{
  "label": "银州区",
  "value": "211202" },

{
  "label": "清河区",
  "value": "211204" },

{
  "label": "铁岭县",
  "value": "211221" },

{
  "label": "西丰县",
  "value": "211223" },

{
  "label": "昌图县",
  "value": "211224" },

{
  "label": "调兵山市",
  "value": "211281" },

{
  "label": "开原市",
  "value": "211282" }],


[{
  "label": "双塔区",
  "value": "211302" },

{
  "label": "龙城区",
  "value": "211303" },

{
  "label": "朝阳县",
  "value": "211321" },

{
  "label": "建平县",
  "value": "211322" },

{
  "label": "喀喇沁左翼蒙古族自治县",
  "value": "211324" },

{
  "label": "北票市",
  "value": "211381" },

{
  "label": "凌源市",
  "value": "211382" }],


[{
  "label": "连山区",
  "value": "211402" },

{
  "label": "龙港区",
  "value": "211403" },

{
  "label": "南票区",
  "value": "211404" },

{
  "label": "绥中县",
  "value": "211421" },

{
  "label": "建昌县",
  "value": "211422" },

{
  "label": "兴城市",
  "value": "211481" }]],



[
[{
  "label": "南关区",
  "value": "220102" },

{
  "label": "宽城区",
  "value": "220103" },

{
  "label": "朝阳区",
  "value": "220104" },

{
  "label": "二道区",
  "value": "220105" },

{
  "label": "绿园区",
  "value": "220106" },

{
  "label": "双阳区",
  "value": "220112" },

{
  "label": "九台区",
  "value": "220113" },

{
  "label": "农安县",
  "value": "220122" },

{
  "label": "长春经济技术开发区",
  "value": "220171" },

{
  "label": "长春净月高新技术产业开发区",
  "value": "220172" },

{
  "label": "长春高新技术产业开发区",
  "value": "220173" },

{
  "label": "长春汽车经济技术开发区",
  "value": "220174" },

{
  "label": "榆树市",
  "value": "220182" },

{
  "label": "德惠市",
  "value": "220183" }],


[{
  "label": "昌邑区",
  "value": "220202" },

{
  "label": "龙潭区",
  "value": "220203" },

{
  "label": "船营区",
  "value": "220204" },

{
  "label": "丰满区",
  "value": "220211" },

{
  "label": "永吉县",
  "value": "220221" },

{
  "label": "吉林经济开发区",
  "value": "220271" },

{
  "label": "吉林高新技术产业开发区",
  "value": "220272" },

{
  "label": "吉林中国新加坡食品区",
  "value": "220273" },

{
  "label": "蛟河市",
  "value": "220281" },

{
  "label": "桦甸市",
  "value": "220282" },

{
  "label": "舒兰市",
  "value": "220283" },

{
  "label": "磐石市",
  "value": "220284" }],


[{
  "label": "铁西区",
  "value": "220302" },

{
  "label": "铁东区",
  "value": "220303" },

{
  "label": "梨树县",
  "value": "220322" },

{
  "label": "伊通满族自治县",
  "value": "220323" },

{
  "label": "公主岭市",
  "value": "220381" },

{
  "label": "双辽市",
  "value": "220382" }],


[{
  "label": "龙山区",
  "value": "220402" },

{
  "label": "西安区",
  "value": "220403" },

{
  "label": "东丰县",
  "value": "220421" },

{
  "label": "东辽县",
  "value": "220422" }],


[{
  "label": "东昌区",
  "value": "220502" },

{
  "label": "二道江区",
  "value": "220503" },

{
  "label": "通化县",
  "value": "220521" },

{
  "label": "辉南县",
  "value": "220523" },

{
  "label": "柳河县",
  "value": "220524" },

{
  "label": "梅河口市",
  "value": "220581" },

{
  "label": "集安市",
  "value": "220582" }],


[{
  "label": "浑江区",
  "value": "220602" },

{
  "label": "江源区",
  "value": "220605" },

{
  "label": "抚松县",
  "value": "220621" },

{
  "label": "靖宇县",
  "value": "220622" },

{
  "label": "长白朝鲜族自治县",
  "value": "220623" },

{
  "label": "临江市",
  "value": "220681" }],


[{
  "label": "宁江区",
  "value": "220702" },

{
  "label": "前郭尔罗斯蒙古族自治县",
  "value": "220721" },

{
  "label": "长岭县",
  "value": "220722" },

{
  "label": "乾安县",
  "value": "220723" },

{
  "label": "吉林松原经济开发区",
  "value": "220771" },

{
  "label": "扶余市",
  "value": "220781" }],


[{
  "label": "洮北区",
  "value": "220802" },

{
  "label": "镇赉县",
  "value": "220821" },

{
  "label": "通榆县",
  "value": "220822" },

{
  "label": "吉林白城经济开发区",
  "value": "220871" },

{
  "label": "洮南市",
  "value": "220881" },

{
  "label": "大安市",
  "value": "220882" }],


[{
  "label": "延吉市",
  "value": "222401" },

{
  "label": "图们市",
  "value": "222402" },

{
  "label": "敦化市",
  "value": "222403" },

{
  "label": "珲春市",
  "value": "222404" },

{
  "label": "龙井市",
  "value": "222405" },

{
  "label": "和龙市",
  "value": "222406" },

{
  "label": "汪清县",
  "value": "222424" },

{
  "label": "安图县",
  "value": "222426" }]],



[
[{
  "label": "道里区",
  "value": "230102" },

{
  "label": "南岗区",
  "value": "230103" },

{
  "label": "道外区",
  "value": "230104" },

{
  "label": "平房区",
  "value": "230108" },

{
  "label": "松北区",
  "value": "230109" },

{
  "label": "香坊区",
  "value": "230110" },

{
  "label": "呼兰区",
  "value": "230111" },

{
  "label": "阿城区",
  "value": "230112" },

{
  "label": "双城区",
  "value": "230113" },

{
  "label": "依兰县",
  "value": "230123" },

{
  "label": "方正县",
  "value": "230124" },

{
  "label": "宾县",
  "value": "230125" },

{
  "label": "巴彦县",
  "value": "230126" },

{
  "label": "木兰县",
  "value": "230127" },

{
  "label": "通河县",
  "value": "230128" },

{
  "label": "延寿县",
  "value": "230129" },

{
  "label": "尚志市",
  "value": "230183" },

{
  "label": "五常市",
  "value": "230184" }],


[{
  "label": "龙沙区",
  "value": "230202" },

{
  "label": "建华区",
  "value": "230203" },

{
  "label": "铁锋区",
  "value": "230204" },

{
  "label": "昂昂溪区",
  "value": "230205" },

{
  "label": "富拉尔基区",
  "value": "230206" },

{
  "label": "碾子山区",
  "value": "230207" },

{
  "label": "梅里斯达斡尔族区",
  "value": "230208" },

{
  "label": "龙江县",
  "value": "230221" },

{
  "label": "依安县",
  "value": "230223" },

{
  "label": "泰来县",
  "value": "230224" },

{
  "label": "甘南县",
  "value": "230225" },

{
  "label": "富裕县",
  "value": "230227" },

{
  "label": "克山县",
  "value": "230229" },

{
  "label": "克东县",
  "value": "230230" },

{
  "label": "拜泉县",
  "value": "230231" },

{
  "label": "讷河市",
  "value": "230281" }],


[{
  "label": "鸡冠区",
  "value": "230302" },

{
  "label": "恒山区",
  "value": "230303" },

{
  "label": "滴道区",
  "value": "230304" },

{
  "label": "梨树区",
  "value": "230305" },

{
  "label": "城子河区",
  "value": "230306" },

{
  "label": "麻山区",
  "value": "230307" },

{
  "label": "鸡东县",
  "value": "230321" },

{
  "label": "虎林市",
  "value": "230381" },

{
  "label": "密山市",
  "value": "230382" }],


[{
  "label": "向阳区",
  "value": "230402" },

{
  "label": "工农区",
  "value": "230403" },

{
  "label": "南山区",
  "value": "230404" },

{
  "label": "兴安区",
  "value": "230405" },

{
  "label": "东山区",
  "value": "230406" },

{
  "label": "兴山区",
  "value": "230407" },

{
  "label": "萝北县",
  "value": "230421" },

{
  "label": "绥滨县",
  "value": "230422" }],


[{
  "label": "尖山区",
  "value": "230502" },

{
  "label": "岭东区",
  "value": "230503" },

{
  "label": "四方台区",
  "value": "230505" },

{
  "label": "宝山区",
  "value": "230506" },

{
  "label": "集贤县",
  "value": "230521" },

{
  "label": "友谊县",
  "value": "230522" },

{
  "label": "宝清县",
  "value": "230523" },

{
  "label": "饶河县",
  "value": "230524" }],


[{
  "label": "萨尔图区",
  "value": "230602" },

{
  "label": "龙凤区",
  "value": "230603" },

{
  "label": "让胡路区",
  "value": "230604" },

{
  "label": "红岗区",
  "value": "230605" },

{
  "label": "大同区",
  "value": "230606" },

{
  "label": "肇州县",
  "value": "230621" },

{
  "label": "肇源县",
  "value": "230622" },

{
  "label": "林甸县",
  "value": "230623" },

{
  "label": "杜尔伯特蒙古族自治县",
  "value": "230624" },

{
  "label": "大庆高新技术产业开发区",
  "value": "230671" }],


[{
  "label": "伊春区",
  "value": "230702" },

{
  "label": "南岔区",
  "value": "230703" },

{
  "label": "友好区",
  "value": "230704" },

{
  "label": "西林区",
  "value": "230705" },

{
  "label": "翠峦区",
  "value": "230706" },

{
  "label": "新青区",
  "value": "230707" },

{
  "label": "美溪区",
  "value": "230708" },

{
  "label": "金山屯区",
  "value": "230709" },

{
  "label": "五营区",
  "value": "230710" },

{
  "label": "乌马河区",
  "value": "230711" },

{
  "label": "汤旺河区",
  "value": "230712" },

{
  "label": "带岭区",
  "value": "230713" },

{
  "label": "乌伊岭区",
  "value": "230714" },

{
  "label": "红星区",
  "value": "230715" },

{
  "label": "上甘岭区",
  "value": "230716" },

{
  "label": "嘉荫县",
  "value": "230722" },

{
  "label": "铁力市",
  "value": "230781" }],


[{
  "label": "向阳区",
  "value": "230803" },

{
  "label": "前进区",
  "value": "230804" },

{
  "label": "东风区",
  "value": "230805" },

{
  "label": "郊区",
  "value": "230811" },

{
  "label": "桦南县",
  "value": "230822" },

{
  "label": "桦川县",
  "value": "230826" },

{
  "label": "汤原县",
  "value": "230828" },

{
  "label": "同江市",
  "value": "230881" },

{
  "label": "富锦市",
  "value": "230882" },

{
  "label": "抚远市",
  "value": "230883" }],


[{
  "label": "新兴区",
  "value": "230902" },

{
  "label": "桃山区",
  "value": "230903" },

{
  "label": "茄子河区",
  "value": "230904" },

{
  "label": "勃利县",
  "value": "230921" }],


[{
  "label": "东安区",
  "value": "231002" },

{
  "label": "阳明区",
  "value": "231003" },

{
  "label": "爱民区",
  "value": "231004" },

{
  "label": "西安区",
  "value": "231005" },

{
  "label": "林口县",
  "value": "231025" },

{
  "label": "牡丹江经济技术开发区",
  "value": "231071" },

{
  "label": "绥芬河市",
  "value": "231081" },

{
  "label": "海林市",
  "value": "231083" },

{
  "label": "宁安市",
  "value": "231084" },

{
  "label": "穆棱市",
  "value": "231085" },

{
  "label": "东宁市",
  "value": "231086" }],


[{
  "label": "爱辉区",
  "value": "231102" },

{
  "label": "嫩江县",
  "value": "231121" },

{
  "label": "逊克县",
  "value": "231123" },

{
  "label": "孙吴县",
  "value": "231124" },

{
  "label": "北安市",
  "value": "231181" },

{
  "label": "五大连池市",
  "value": "231182" }],


[{
  "label": "北林区",
  "value": "231202" },

{
  "label": "望奎县",
  "value": "231221" },

{
  "label": "兰西县",
  "value": "231222" },

{
  "label": "青冈县",
  "value": "231223" },

{
  "label": "庆安县",
  "value": "231224" },

{
  "label": "明水县",
  "value": "231225" },

{
  "label": "绥棱县",
  "value": "231226" },

{
  "label": "安达市",
  "value": "231281" },

{
  "label": "肇东市",
  "value": "231282" },

{
  "label": "海伦市",
  "value": "231283" }],


[{
  "label": "加格达奇区",
  "value": "232701" },

{
  "label": "松岭区",
  "value": "232702" },

{
  "label": "新林区",
  "value": "232703" },

{
  "label": "呼中区",
  "value": "232704" },

{
  "label": "呼玛县",
  "value": "232721" },

{
  "label": "塔河县",
  "value": "232722" },

{
  "label": "漠河县",
  "value": "232723" }]],



[
[{
  "label": "黄浦区",
  "value": "310101" },

{
  "label": "徐汇区",
  "value": "310104" },

{
  "label": "长宁区",
  "value": "310105" },

{
  "label": "静安区",
  "value": "310106" },

{
  "label": "普陀区",
  "value": "310107" },

{
  "label": "虹口区",
  "value": "310109" },

{
  "label": "杨浦区",
  "value": "310110" },

{
  "label": "闵行区",
  "value": "310112" },

{
  "label": "宝山区",
  "value": "310113" },

{
  "label": "嘉定区",
  "value": "310114" },

{
  "label": "浦东新区",
  "value": "310115" },

{
  "label": "金山区",
  "value": "310116" },

{
  "label": "松江区",
  "value": "310117" },

{
  "label": "青浦区",
  "value": "310118" },

{
  "label": "奉贤区",
  "value": "310120" },

{
  "label": "崇明区",
  "value": "310151" }]],



[
[{
  "label": "玄武区",
  "value": "320102" },

{
  "label": "秦淮区",
  "value": "320104" },

{
  "label": "建邺区",
  "value": "320105" },

{
  "label": "鼓楼区",
  "value": "320106" },

{
  "label": "浦口区",
  "value": "320111" },

{
  "label": "栖霞区",
  "value": "320113" },

{
  "label": "雨花台区",
  "value": "320114" },

{
  "label": "江宁区",
  "value": "320115" },

{
  "label": "六合区",
  "value": "320116" },

{
  "label": "溧水区",
  "value": "320117" },

{
  "label": "高淳区",
  "value": "320118" }],


[{
  "label": "锡山区",
  "value": "320205" },

{
  "label": "惠山区",
  "value": "320206" },

{
  "label": "滨湖区",
  "value": "320211" },

{
  "label": "梁溪区",
  "value": "320213" },

{
  "label": "新吴区",
  "value": "320214" },

{
  "label": "江阴市",
  "value": "320281" },

{
  "label": "宜兴市",
  "value": "320282" }],


[{
  "label": "鼓楼区",
  "value": "320302" },

{
  "label": "云龙区",
  "value": "320303" },

{
  "label": "贾汪区",
  "value": "320305" },

{
  "label": "泉山区",
  "value": "320311" },

{
  "label": "铜山区",
  "value": "320312" },

{
  "label": "丰县",
  "value": "320321" },

{
  "label": "沛县",
  "value": "320322" },

{
  "label": "睢宁县",
  "value": "320324" },

{
  "label": "徐州经济技术开发区",
  "value": "320371" },

{
  "label": "新沂市",
  "value": "320381" },

{
  "label": "邳州市",
  "value": "320382" }],


[{
  "label": "天宁区",
  "value": "320402" },

{
  "label": "钟楼区",
  "value": "320404" },

{
  "label": "新北区",
  "value": "320411" },

{
  "label": "武进区",
  "value": "320412" },

{
  "label": "金坛区",
  "value": "320413" },

{
  "label": "溧阳市",
  "value": "320481" }],


[{
  "label": "虎丘区",
  "value": "320505" },

{
  "label": "吴中区",
  "value": "320506" },

{
  "label": "相城区",
  "value": "320507" },

{
  "label": "姑苏区",
  "value": "320508" },

{
  "label": "吴江区",
  "value": "320509" },

{
  "label": "苏州工业园区",
  "value": "320571" },

{
  "label": "常熟市",
  "value": "320581" },

{
  "label": "张家港市",
  "value": "320582" },

{
  "label": "昆山市",
  "value": "320583" },

{
  "label": "太仓市",
  "value": "320585" }],


[{
  "label": "崇川区",
  "value": "320602" },

{
  "label": "港闸区",
  "value": "320611" },

{
  "label": "通州区",
  "value": "320612" },

{
  "label": "海安县",
  "value": "320621" },

{
  "label": "如东县",
  "value": "320623" },

{
  "label": "南通经济技术开发区",
  "value": "320671" },

{
  "label": "启东市",
  "value": "320681" },

{
  "label": "如皋市",
  "value": "320682" },

{
  "label": "海门市",
  "value": "320684" }],


[{
  "label": "连云区",
  "value": "320703" },

{
  "label": "海州区",
  "value": "320706" },

{
  "label": "赣榆区",
  "value": "320707" },

{
  "label": "东海县",
  "value": "320722" },

{
  "label": "灌云县",
  "value": "320723" },

{
  "label": "灌南县",
  "value": "320724" },

{
  "label": "连云港经济技术开发区",
  "value": "320771" },

{
  "label": "连云港高新技术产业开发区",
  "value": "320772" }],


[{
  "label": "淮安区",
  "value": "320803" },

{
  "label": "淮阴区",
  "value": "320804" },

{
  "label": "清江浦区",
  "value": "320812" },

{
  "label": "洪泽区",
  "value": "320813" },

{
  "label": "涟水县",
  "value": "320826" },

{
  "label": "盱眙县",
  "value": "320830" },

{
  "label": "金湖县",
  "value": "320831" },

{
  "label": "淮安经济技术开发区",
  "value": "320871" }],


[{
  "label": "亭湖区",
  "value": "320902" },

{
  "label": "盐都区",
  "value": "320903" },

{
  "label": "大丰区",
  "value": "320904" },

{
  "label": "响水县",
  "value": "320921" },

{
  "label": "滨海县",
  "value": "320922" },

{
  "label": "阜宁县",
  "value": "320923" },

{
  "label": "射阳县",
  "value": "320924" },

{
  "label": "建湖县",
  "value": "320925" },

{
  "label": "盐城经济技术开发区",
  "value": "320971" },

{
  "label": "东台市",
  "value": "320981" }],


[{
  "label": "广陵区",
  "value": "321002" },

{
  "label": "邗江区",
  "value": "321003" },

{
  "label": "江都区",
  "value": "321012" },

{
  "label": "宝应县",
  "value": "321023" },

{
  "label": "扬州经济技术开发区",
  "value": "321071" },

{
  "label": "仪征市",
  "value": "321081" },

{
  "label": "高邮市",
  "value": "321084" }],


[{
  "label": "京口区",
  "value": "321102" },

{
  "label": "润州区",
  "value": "321111" },

{
  "label": "丹徒区",
  "value": "321112" },

{
  "label": "镇江新区",
  "value": "321171" },

{
  "label": "丹阳市",
  "value": "321181" },

{
  "label": "扬中市",
  "value": "321182" },

{
  "label": "句容市",
  "value": "321183" }],


[{
  "label": "海陵区",
  "value": "321202" },

{
  "label": "高港区",
  "value": "321203" },

{
  "label": "姜堰区",
  "value": "321204" },

{
  "label": "泰州医药高新技术产业开发区",
  "value": "321271" },

{
  "label": "兴化市",
  "value": "321281" },

{
  "label": "靖江市",
  "value": "321282" },

{
  "label": "泰兴市",
  "value": "321283" }],


[{
  "label": "宿城区",
  "value": "321302" },

{
  "label": "宿豫区",
  "value": "321311" },

{
  "label": "沭阳县",
  "value": "321322" },

{
  "label": "泗阳县",
  "value": "321323" },

{
  "label": "泗洪县",
  "value": "321324" },

{
  "label": "宿迁经济技术开发区",
  "value": "321371" }]],



[
[{
  "label": "上城区",
  "value": "330102" },

{
  "label": "下城区",
  "value": "330103" },

{
  "label": "江干区",
  "value": "330104" },

{
  "label": "拱墅区",
  "value": "330105" },

{
  "label": "西湖区",
  "value": "330106" },

{
  "label": "滨江区",
  "value": "330108" },

{
  "label": "萧山区",
  "value": "330109" },

{
  "label": "余杭区",
  "value": "330110" },

{
  "label": "富阳区",
  "value": "330111" },

{
  "label": "临安区",
  "value": "330112" },

{
  "label": "桐庐县",
  "value": "330122" },

{
  "label": "淳安县",
  "value": "330127" },

{
  "label": "建德市",
  "value": "330182" }],


[{
  "label": "海曙区",
  "value": "330203" },

{
  "label": "江北区",
  "value": "330205" },

{
  "label": "北仑区",
  "value": "330206" },

{
  "label": "镇海区",
  "value": "330211" },

{
  "label": "鄞州区",
  "value": "330212" },

{
  "label": "奉化区",
  "value": "330213" },

{
  "label": "象山县",
  "value": "330225" },

{
  "label": "宁海县",
  "value": "330226" },

{
  "label": "余姚市",
  "value": "330281" },

{
  "label": "慈溪市",
  "value": "330282" }],


[{
  "label": "鹿城区",
  "value": "330302" },

{
  "label": "龙湾区",
  "value": "330303" },

{
  "label": "瓯海区",
  "value": "330304" },

{
  "label": "洞头区",
  "value": "330305" },

{
  "label": "永嘉县",
  "value": "330324" },

{
  "label": "平阳县",
  "value": "330326" },

{
  "label": "苍南县",
  "value": "330327" },

{
  "label": "文成县",
  "value": "330328" },

{
  "label": "泰顺县",
  "value": "330329" },

{
  "label": "温州经济技术开发区",
  "value": "330371" },

{
  "label": "瑞安市",
  "value": "330381" },

{
  "label": "乐清市",
  "value": "330382" }],


[{
  "label": "南湖区",
  "value": "330402" },

{
  "label": "秀洲区",
  "value": "330411" },

{
  "label": "嘉善县",
  "value": "330421" },

{
  "label": "海盐县",
  "value": "330424" },

{
  "label": "海宁市",
  "value": "330481" },

{
  "label": "平湖市",
  "value": "330482" },

{
  "label": "桐乡市",
  "value": "330483" }],


[{
  "label": "吴兴区",
  "value": "330502" },

{
  "label": "南浔区",
  "value": "330503" },

{
  "label": "德清县",
  "value": "330521" },

{
  "label": "长兴县",
  "value": "330522" },

{
  "label": "安吉县",
  "value": "330523" }],


[{
  "label": "越城区",
  "value": "330602" },

{
  "label": "柯桥区",
  "value": "330603" },

{
  "label": "上虞区",
  "value": "330604" },

{
  "label": "新昌县",
  "value": "330624" },

{
  "label": "诸暨市",
  "value": "330681" },

{
  "label": "嵊州市",
  "value": "330683" }],


[{
  "label": "婺城区",
  "value": "330702" },

{
  "label": "金东区",
  "value": "330703" },

{
  "label": "武义县",
  "value": "330723" },

{
  "label": "浦江县",
  "value": "330726" },

{
  "label": "磐安县",
  "value": "330727" },

{
  "label": "兰溪市",
  "value": "330781" },

{
  "label": "义乌市",
  "value": "330782" },

{
  "label": "东阳市",
  "value": "330783" },

{
  "label": "永康市",
  "value": "330784" }],


[{
  "label": "柯城区",
  "value": "330802" },

{
  "label": "衢江区",
  "value": "330803" },

{
  "label": "常山县",
  "value": "330822" },

{
  "label": "开化县",
  "value": "330824" },

{
  "label": "龙游县",
  "value": "330825" },

{
  "label": "江山市",
  "value": "330881" }],


[{
  "label": "定海区",
  "value": "330902" },

{
  "label": "普陀区",
  "value": "330903" },

{
  "label": "岱山县",
  "value": "330921" },

{
  "label": "嵊泗县",
  "value": "330922" }],


[{
  "label": "椒江区",
  "value": "331002" },

{
  "label": "黄岩区",
  "value": "331003" },

{
  "label": "路桥区",
  "value": "331004" },

{
  "label": "三门县",
  "value": "331022" },

{
  "label": "天台县",
  "value": "331023" },

{
  "label": "仙居县",
  "value": "331024" },

{
  "label": "温岭市",
  "value": "331081" },

{
  "label": "临海市",
  "value": "331082" },

{
  "label": "玉环市",
  "value": "331083" }],


[{
  "label": "莲都区",
  "value": "331102" },

{
  "label": "青田县",
  "value": "331121" },

{
  "label": "缙云县",
  "value": "331122" },

{
  "label": "遂昌县",
  "value": "331123" },

{
  "label": "松阳县",
  "value": "331124" },

{
  "label": "云和县",
  "value": "331125" },

{
  "label": "庆元县",
  "value": "331126" },

{
  "label": "景宁畲族自治县",
  "value": "331127" },

{
  "label": "龙泉市",
  "value": "331181" }]],



[
[{
  "label": "瑶海区",
  "value": "340102" },

{
  "label": "庐阳区",
  "value": "340103" },

{
  "label": "蜀山区",
  "value": "340104" },

{
  "label": "包河区",
  "value": "340111" },

{
  "label": "长丰县",
  "value": "340121" },

{
  "label": "肥东县",
  "value": "340122" },

{
  "label": "肥西县",
  "value": "340123" },

{
  "label": "庐江县",
  "value": "340124" },

{
  "label": "合肥高新技术产业开发区",
  "value": "340171" },

{
  "label": "合肥经济技术开发区",
  "value": "340172" },

{
  "label": "合肥新站高新技术产业开发区",
  "value": "340173" },

{
  "label": "巢湖市",
  "value": "340181" }],


[{
  "label": "镜湖区",
  "value": "340202" },

{
  "label": "弋江区",
  "value": "340203" },

{
  "label": "鸠江区",
  "value": "340207" },

{
  "label": "三山区",
  "value": "340208" },

{
  "label": "芜湖县",
  "value": "340221" },

{
  "label": "繁昌县",
  "value": "340222" },

{
  "label": "南陵县",
  "value": "340223" },

{
  "label": "无为县",
  "value": "340225" },

{
  "label": "芜湖经济技术开发区",
  "value": "340271" },

{
  "label": "安徽芜湖长江大桥经济开发区",
  "value": "340272" }],


[{
  "label": "龙子湖区",
  "value": "340302" },

{
  "label": "蚌山区",
  "value": "340303" },

{
  "label": "禹会区",
  "value": "340304" },

{
  "label": "淮上区",
  "value": "340311" },

{
  "label": "怀远县",
  "value": "340321" },

{
  "label": "五河县",
  "value": "340322" },

{
  "label": "固镇县",
  "value": "340323" },

{
  "label": "蚌埠市高新技术开发区",
  "value": "340371" },

{
  "label": "蚌埠市经济开发区",
  "value": "340372" }],


[{
  "label": "大通区",
  "value": "340402" },

{
  "label": "田家庵区",
  "value": "340403" },

{
  "label": "谢家集区",
  "value": "340404" },

{
  "label": "八公山区",
  "value": "340405" },

{
  "label": "潘集区",
  "value": "340406" },

{
  "label": "凤台县",
  "value": "340421" },

{
  "label": "寿县",
  "value": "340422" }],


[{
  "label": "花山区",
  "value": "340503" },

{
  "label": "雨山区",
  "value": "340504" },

{
  "label": "博望区",
  "value": "340506" },

{
  "label": "当涂县",
  "value": "340521" },

{
  "label": "含山县",
  "value": "340522" },

{
  "label": "和县",
  "value": "340523" }],


[{
  "label": "杜集区",
  "value": "340602" },

{
  "label": "相山区",
  "value": "340603" },

{
  "label": "烈山区",
  "value": "340604" },

{
  "label": "濉溪县",
  "value": "340621" }],


[{
  "label": "铜官区",
  "value": "340705" },

{
  "label": "义安区",
  "value": "340706" },

{
  "label": "郊区",
  "value": "340711" },

{
  "label": "枞阳县",
  "value": "340722" }],


[{
  "label": "迎江区",
  "value": "340802" },

{
  "label": "大观区",
  "value": "340803" },

{
  "label": "宜秀区",
  "value": "340811" },

{
  "label": "怀宁县",
  "value": "340822" },

{
  "label": "潜山县",
  "value": "340824" },

{
  "label": "太湖县",
  "value": "340825" },

{
  "label": "宿松县",
  "value": "340826" },

{
  "label": "望江县",
  "value": "340827" },

{
  "label": "岳西县",
  "value": "340828" },

{
  "label": "安徽安庆经济开发区",
  "value": "340871" },

{
  "label": "桐城市",
  "value": "340881" }],


[{
  "label": "屯溪区",
  "value": "341002" },

{
  "label": "黄山区",
  "value": "341003" },

{
  "label": "徽州区",
  "value": "341004" },

{
  "label": "歙县",
  "value": "341021" },

{
  "label": "休宁县",
  "value": "341022" },

{
  "label": "黟县",
  "value": "341023" },

{
  "label": "祁门县",
  "value": "341024" }],


[{
  "label": "琅琊区",
  "value": "341102" },

{
  "label": "南谯区",
  "value": "341103" },

{
  "label": "来安县",
  "value": "341122" },

{
  "label": "全椒县",
  "value": "341124" },

{
  "label": "定远县",
  "value": "341125" },

{
  "label": "凤阳县",
  "value": "341126" },

{
  "label": "苏滁现代产业园",
  "value": "341171" },

{
  "label": "滁州经济技术开发区",
  "value": "341172" },

{
  "label": "天长市",
  "value": "341181" },

{
  "label": "明光市",
  "value": "341182" }],


[{
  "label": "颍州区",
  "value": "341202" },

{
  "label": "颍东区",
  "value": "341203" },

{
  "label": "颍泉区",
  "value": "341204" },

{
  "label": "临泉县",
  "value": "341221" },

{
  "label": "太和县",
  "value": "341222" },

{
  "label": "阜南县",
  "value": "341225" },

{
  "label": "颍上县",
  "value": "341226" },

{
  "label": "阜阳合肥现代产业园区",
  "value": "341271" },

{
  "label": "阜阳经济技术开发区",
  "value": "341272" },

{
  "label": "界首市",
  "value": "341282" }],


[{
  "label": "埇桥区",
  "value": "341302" },

{
  "label": "砀山县",
  "value": "341321" },

{
  "label": "萧县",
  "value": "341322" },

{
  "label": "灵璧县",
  "value": "341323" },

{
  "label": "泗县",
  "value": "341324" },

{
  "label": "宿州马鞍山现代产业园区",
  "value": "341371" },

{
  "label": "宿州经济技术开发区",
  "value": "341372" }],


[{
  "label": "金安区",
  "value": "341502" },

{
  "label": "裕安区",
  "value": "341503" },

{
  "label": "叶集区",
  "value": "341504" },

{
  "label": "霍邱县",
  "value": "341522" },

{
  "label": "舒城县",
  "value": "341523" },

{
  "label": "金寨县",
  "value": "341524" },

{
  "label": "霍山县",
  "value": "341525" }],


[{
  "label": "谯城区",
  "value": "341602" },

{
  "label": "涡阳县",
  "value": "341621" },

{
  "label": "蒙城县",
  "value": "341622" },

{
  "label": "利辛县",
  "value": "341623" }],


[{
  "label": "贵池区",
  "value": "341702" },

{
  "label": "东至县",
  "value": "341721" },

{
  "label": "石台县",
  "value": "341722" },

{
  "label": "青阳县",
  "value": "341723" }],


[{
  "label": "宣州区",
  "value": "341802" },

{
  "label": "郎溪县",
  "value": "341821" },

{
  "label": "广德县",
  "value": "341822" },

{
  "label": "泾县",
  "value": "341823" },

{
  "label": "绩溪县",
  "value": "341824" },

{
  "label": "旌德县",
  "value": "341825" },

{
  "label": "宣城市经济开发区",
  "value": "341871" },

{
  "label": "宁国市",
  "value": "341881" }]],



[
[{
  "label": "鼓楼区",
  "value": "350102" },

{
  "label": "台江区",
  "value": "350103" },

{
  "label": "仓山区",
  "value": "350104" },

{
  "label": "马尾区",
  "value": "350105" },

{
  "label": "晋安区",
  "value": "350111" },

{
  "label": "闽侯县",
  "value": "350121" },

{
  "label": "连江县",
  "value": "350122" },

{
  "label": "罗源县",
  "value": "350123" },

{
  "label": "闽清县",
  "value": "350124" },

{
  "label": "永泰县",
  "value": "350125" },

{
  "label": "平潭县",
  "value": "350128" },

{
  "label": "福清市",
  "value": "350181" },

{
  "label": "长乐市",
  "value": "350182" }],


[{
  "label": "思明区",
  "value": "350203" },

{
  "label": "海沧区",
  "value": "350205" },

{
  "label": "湖里区",
  "value": "350206" },

{
  "label": "集美区",
  "value": "350211" },

{
  "label": "同安区",
  "value": "350212" },

{
  "label": "翔安区",
  "value": "350213" }],


[{
  "label": "城厢区",
  "value": "350302" },

{
  "label": "涵江区",
  "value": "350303" },

{
  "label": "荔城区",
  "value": "350304" },

{
  "label": "秀屿区",
  "value": "350305" },

{
  "label": "仙游县",
  "value": "350322" }],


[{
  "label": "梅列区",
  "value": "350402" },

{
  "label": "三元区",
  "value": "350403" },

{
  "label": "明溪县",
  "value": "350421" },

{
  "label": "清流县",
  "value": "350423" },

{
  "label": "宁化县",
  "value": "350424" },

{
  "label": "大田县",
  "value": "350425" },

{
  "label": "尤溪县",
  "value": "350426" },

{
  "label": "沙县",
  "value": "350427" },

{
  "label": "将乐县",
  "value": "350428" },

{
  "label": "泰宁县",
  "value": "350429" },

{
  "label": "建宁县",
  "value": "350430" },

{
  "label": "永安市",
  "value": "350481" }],


[{
  "label": "鲤城区",
  "value": "350502" },

{
  "label": "丰泽区",
  "value": "350503" },

{
  "label": "洛江区",
  "value": "350504" },

{
  "label": "泉港区",
  "value": "350505" },

{
  "label": "惠安县",
  "value": "350521" },

{
  "label": "安溪县",
  "value": "350524" },

{
  "label": "永春县",
  "value": "350525" },

{
  "label": "德化县",
  "value": "350526" },

{
  "label": "金门县",
  "value": "350527" },

{
  "label": "石狮市",
  "value": "350581" },

{
  "label": "晋江市",
  "value": "350582" },

{
  "label": "南安市",
  "value": "350583" }],


[{
  "label": "芗城区",
  "value": "350602" },

{
  "label": "龙文区",
  "value": "350603" },

{
  "label": "云霄县",
  "value": "350622" },

{
  "label": "漳浦县",
  "value": "350623" },

{
  "label": "诏安县",
  "value": "350624" },

{
  "label": "长泰县",
  "value": "350625" },

{
  "label": "东山县",
  "value": "350626" },

{
  "label": "南靖县",
  "value": "350627" },

{
  "label": "平和县",
  "value": "350628" },

{
  "label": "华安县",
  "value": "350629" },

{
  "label": "龙海市",
  "value": "350681" }],


[{
  "label": "延平区",
  "value": "350702" },

{
  "label": "建阳区",
  "value": "350703" },

{
  "label": "顺昌县",
  "value": "350721" },

{
  "label": "浦城县",
  "value": "350722" },

{
  "label": "光泽县",
  "value": "350723" },

{
  "label": "松溪县",
  "value": "350724" },

{
  "label": "政和县",
  "value": "350725" },

{
  "label": "邵武市",
  "value": "350781" },

{
  "label": "武夷山市",
  "value": "350782" },

{
  "label": "建瓯市",
  "value": "350783" }],


[{
  "label": "新罗区",
  "value": "350802" },

{
  "label": "永定区",
  "value": "350803" },

{
  "label": "长汀县",
  "value": "350821" },

{
  "label": "上杭县",
  "value": "350823" },

{
  "label": "武平县",
  "value": "350824" },

{
  "label": "连城县",
  "value": "350825" },

{
  "label": "漳平市",
  "value": "350881" }],


[{
  "label": "蕉城区",
  "value": "350902" },

{
  "label": "霞浦县",
  "value": "350921" },

{
  "label": "古田县",
  "value": "350922" },

{
  "label": "屏南县",
  "value": "350923" },

{
  "label": "寿宁县",
  "value": "350924" },

{
  "label": "周宁县",
  "value": "350925" },

{
  "label": "柘荣县",
  "value": "350926" },

{
  "label": "福安市",
  "value": "350981" },

{
  "label": "福鼎市",
  "value": "350982" }]],



[
[{
  "label": "东湖区",
  "value": "360102" },

{
  "label": "西湖区",
  "value": "360103" },

{
  "label": "青云谱区",
  "value": "360104" },

{
  "label": "湾里区",
  "value": "360105" },

{
  "label": "青山湖区",
  "value": "360111" },

{
  "label": "新建区",
  "value": "360112" },

{
  "label": "南昌县",
  "value": "360121" },

{
  "label": "安义县",
  "value": "360123" },

{
  "label": "进贤县",
  "value": "360124" }],


[{
  "label": "昌江区",
  "value": "360202" },

{
  "label": "珠山区",
  "value": "360203" },

{
  "label": "浮梁县",
  "value": "360222" },

{
  "label": "乐平市",
  "value": "360281" }],


[{
  "label": "安源区",
  "value": "360302" },

{
  "label": "湘东区",
  "value": "360313" },

{
  "label": "莲花县",
  "value": "360321" },

{
  "label": "上栗县",
  "value": "360322" },

{
  "label": "芦溪县",
  "value": "360323" }],


[{
  "label": "濂溪区",
  "value": "360402" },

{
  "label": "浔阳区",
  "value": "360403" },

{
  "label": "柴桑区",
  "value": "360404" },

{
  "label": "武宁县",
  "value": "360423" },

{
  "label": "修水县",
  "value": "360424" },

{
  "label": "永修县",
  "value": "360425" },

{
  "label": "德安县",
  "value": "360426" },

{
  "label": "都昌县",
  "value": "360428" },

{
  "label": "湖口县",
  "value": "360429" },

{
  "label": "彭泽县",
  "value": "360430" },

{
  "label": "瑞昌市",
  "value": "360481" },

{
  "label": "共青城市",
  "value": "360482" },

{
  "label": "庐山市",
  "value": "360483" }],


[{
  "label": "渝水区",
  "value": "360502" },

{
  "label": "分宜县",
  "value": "360521" }],


[{
  "label": "月湖区",
  "value": "360602" },

{
  "label": "余江县",
  "value": "360622" },

{
  "label": "贵溪市",
  "value": "360681" }],


[{
  "label": "章贡区",
  "value": "360702" },

{
  "label": "南康区",
  "value": "360703" },

{
  "label": "赣县区",
  "value": "360704" },

{
  "label": "信丰县",
  "value": "360722" },

{
  "label": "大余县",
  "value": "360723" },

{
  "label": "上犹县",
  "value": "360724" },

{
  "label": "崇义县",
  "value": "360725" },

{
  "label": "安远县",
  "value": "360726" },

{
  "label": "龙南县",
  "value": "360727" },

{
  "label": "定南县",
  "value": "360728" },

{
  "label": "全南县",
  "value": "360729" },

{
  "label": "宁都县",
  "value": "360730" },

{
  "label": "于都县",
  "value": "360731" },

{
  "label": "兴国县",
  "value": "360732" },

{
  "label": "会昌县",
  "value": "360733" },

{
  "label": "寻乌县",
  "value": "360734" },

{
  "label": "石城县",
  "value": "360735" },

{
  "label": "瑞金市",
  "value": "360781" }],


[{
  "label": "吉州区",
  "value": "360802" },

{
  "label": "青原区",
  "value": "360803" },

{
  "label": "吉安县",
  "value": "360821" },

{
  "label": "吉水县",
  "value": "360822" },

{
  "label": "峡江县",
  "value": "360823" },

{
  "label": "新干县",
  "value": "360824" },

{
  "label": "永丰县",
  "value": "360825" },

{
  "label": "泰和县",
  "value": "360826" },

{
  "label": "遂川县",
  "value": "360827" },

{
  "label": "万安县",
  "value": "360828" },

{
  "label": "安福县",
  "value": "360829" },

{
  "label": "永新县",
  "value": "360830" },

{
  "label": "井冈山市",
  "value": "360881" }],


[{
  "label": "袁州区",
  "value": "360902" },

{
  "label": "奉新县",
  "value": "360921" },

{
  "label": "万载县",
  "value": "360922" },

{
  "label": "上高县",
  "value": "360923" },

{
  "label": "宜丰县",
  "value": "360924" },

{
  "label": "靖安县",
  "value": "360925" },

{
  "label": "铜鼓县",
  "value": "360926" },

{
  "label": "丰城市",
  "value": "360981" },

{
  "label": "樟树市",
  "value": "360982" },

{
  "label": "高安市",
  "value": "360983" }],


[{
  "label": "临川区",
  "value": "361002" },

{
  "label": "东乡区",
  "value": "361003" },

{
  "label": "南城县",
  "value": "361021" },

{
  "label": "黎川县",
  "value": "361022" },

{
  "label": "南丰县",
  "value": "361023" },

{
  "label": "崇仁县",
  "value": "361024" },

{
  "label": "乐安县",
  "value": "361025" },

{
  "label": "宜黄县",
  "value": "361026" },

{
  "label": "金溪县",
  "value": "361027" },

{
  "label": "资溪县",
  "value": "361028" },

{
  "label": "广昌县",
  "value": "361030" }],


[{
  "label": "信州区",
  "value": "361102" },

{
  "label": "广丰区",
  "value": "361103" },

{
  "label": "上饶县",
  "value": "361121" },

{
  "label": "玉山县",
  "value": "361123" },

{
  "label": "铅山县",
  "value": "361124" },

{
  "label": "横峰县",
  "value": "361125" },

{
  "label": "弋阳县",
  "value": "361126" },

{
  "label": "余干县",
  "value": "361127" },

{
  "label": "鄱阳县",
  "value": "361128" },

{
  "label": "万年县",
  "value": "361129" },

{
  "label": "婺源县",
  "value": "361130" },

{
  "label": "德兴市",
  "value": "361181" }]],



[
[{
  "label": "历下区",
  "value": "370102" },

{
  "label": "市中区",
  "value": "370103" },

{
  "label": "槐荫区",
  "value": "370104" },

{
  "label": "天桥区",
  "value": "370105" },

{
  "label": "历城区",
  "value": "370112" },

{
  "label": "长清区",
  "value": "370113" },

{
  "label": "章丘区",
  "value": "370114" },

{
  "label": "平阴县",
  "value": "370124" },

{
  "label": "济阳县",
  "value": "370125" },

{
  "label": "商河县",
  "value": "370126" },

{
  "label": "济南高新技术产业开发区",
  "value": "370171" }],


[{
  "label": "市南区",
  "value": "370202" },

{
  "label": "市北区",
  "value": "370203" },

{
  "label": "黄岛区",
  "value": "370211" },

{
  "label": "崂山区",
  "value": "370212" },

{
  "label": "李沧区",
  "value": "370213" },

{
  "label": "城阳区",
  "value": "370214" },

{
  "label": "即墨区",
  "value": "370215" },

{
  "label": "青岛高新技术产业开发区",
  "value": "370271" },

{
  "label": "胶州市",
  "value": "370281" },

{
  "label": "平度市",
  "value": "370283" },

{
  "label": "莱西市",
  "value": "370285" }],


[{
  "label": "淄川区",
  "value": "370302" },

{
  "label": "张店区",
  "value": "370303" },

{
  "label": "博山区",
  "value": "370304" },

{
  "label": "临淄区",
  "value": "370305" },

{
  "label": "周村区",
  "value": "370306" },

{
  "label": "桓台县",
  "value": "370321" },

{
  "label": "高青县",
  "value": "370322" },

{
  "label": "沂源县",
  "value": "370323" }],


[{
  "label": "市中区",
  "value": "370402" },

{
  "label": "薛城区",
  "value": "370403" },

{
  "label": "峄城区",
  "value": "370404" },

{
  "label": "台儿庄区",
  "value": "370405" },

{
  "label": "山亭区",
  "value": "370406" },

{
  "label": "滕州市",
  "value": "370481" }],


[{
  "label": "东营区",
  "value": "370502" },

{
  "label": "河口区",
  "value": "370503" },

{
  "label": "垦利区",
  "value": "370505" },

{
  "label": "利津县",
  "value": "370522" },

{
  "label": "广饶县",
  "value": "370523" },

{
  "label": "东营经济技术开发区",
  "value": "370571" },

{
  "label": "东营港经济开发区",
  "value": "370572" }],


[{
  "label": "芝罘区",
  "value": "370602" },

{
  "label": "福山区",
  "value": "370611" },

{
  "label": "牟平区",
  "value": "370612" },

{
  "label": "莱山区",
  "value": "370613" },

{
  "label": "长岛县",
  "value": "370634" },

{
  "label": "烟台高新技术产业开发区",
  "value": "370671" },

{
  "label": "烟台经济技术开发区",
  "value": "370672" },

{
  "label": "龙口市",
  "value": "370681" },

{
  "label": "莱阳市",
  "value": "370682" },

{
  "label": "莱州市",
  "value": "370683" },

{
  "label": "蓬莱市",
  "value": "370684" },

{
  "label": "招远市",
  "value": "370685" },

{
  "label": "栖霞市",
  "value": "370686" },

{
  "label": "海阳市",
  "value": "370687" }],


[{
  "label": "潍城区",
  "value": "370702" },

{
  "label": "寒亭区",
  "value": "370703" },

{
  "label": "坊子区",
  "value": "370704" },

{
  "label": "奎文区",
  "value": "370705" },

{
  "label": "临朐县",
  "value": "370724" },

{
  "label": "昌乐县",
  "value": "370725" },

{
  "label": "潍坊滨海经济技术开发区",
  "value": "370772" },

{
  "label": "青州市",
  "value": "370781" },

{
  "label": "诸城市",
  "value": "370782" },

{
  "label": "寿光市",
  "value": "370783" },

{
  "label": "安丘市",
  "value": "370784" },

{
  "label": "高密市",
  "value": "370785" },

{
  "label": "昌邑市",
  "value": "370786" }],


[{
  "label": "任城区",
  "value": "370811" },

{
  "label": "兖州区",
  "value": "370812" },

{
  "label": "微山县",
  "value": "370826" },

{
  "label": "鱼台县",
  "value": "370827" },

{
  "label": "金乡县",
  "value": "370828" },

{
  "label": "嘉祥县",
  "value": "370829" },

{
  "label": "汶上县",
  "value": "370830" },

{
  "label": "泗水县",
  "value": "370831" },

{
  "label": "梁山县",
  "value": "370832" },

{
  "label": "济宁高新技术产业开发区",
  "value": "370871" },

{
  "label": "曲阜市",
  "value": "370881" },

{
  "label": "邹城市",
  "value": "370883" }],


[{
  "label": "泰山区",
  "value": "370902" },

{
  "label": "岱岳区",
  "value": "370911" },

{
  "label": "宁阳县",
  "value": "370921" },

{
  "label": "东平县",
  "value": "370923" },

{
  "label": "新泰市",
  "value": "370982" },

{
  "label": "肥城市",
  "value": "370983" }],


[{
  "label": "环翠区",
  "value": "371002" },

{
  "label": "文登区",
  "value": "371003" },

{
  "label": "威海火炬高技术产业开发区",
  "value": "371071" },

{
  "label": "威海经济技术开发区",
  "value": "371072" },

{
  "label": "威海临港经济技术开发区",
  "value": "371073" },

{
  "label": "荣成市",
  "value": "371082" },

{
  "label": "乳山市",
  "value": "371083" }],


[{
  "label": "东港区",
  "value": "371102" },

{
  "label": "岚山区",
  "value": "371103" },

{
  "label": "五莲县",
  "value": "371121" },

{
  "label": "莒县",
  "value": "371122" },

{
  "label": "日照经济技术开发区",
  "value": "371171" },

{
  "label": "日照国际海洋城",
  "value": "371172" }],


[{
  "label": "莱城区",
  "value": "371202" },

{
  "label": "钢城区",
  "value": "371203" }],


[{
  "label": "兰山区",
  "value": "371302" },

{
  "label": "罗庄区",
  "value": "371311" },

{
  "label": "河东区",
  "value": "371312" },

{
  "label": "沂南县",
  "value": "371321" },

{
  "label": "郯城县",
  "value": "371322" },

{
  "label": "沂水县",
  "value": "371323" },

{
  "label": "兰陵县",
  "value": "371324" },

{
  "label": "费县",
  "value": "371325" },

{
  "label": "平邑县",
  "value": "371326" },

{
  "label": "莒南县",
  "value": "371327" },

{
  "label": "蒙阴县",
  "value": "371328" },

{
  "label": "临沭县",
  "value": "371329" },

{
  "label": "临沂高新技术产业开发区",
  "value": "371371" },

{
  "label": "临沂经济技术开发区",
  "value": "371372" },

{
  "label": "临沂临港经济开发区",
  "value": "371373" }],


[{
  "label": "德城区",
  "value": "371402" },

{
  "label": "陵城区",
  "value": "371403" },

{
  "label": "宁津县",
  "value": "371422" },

{
  "label": "庆云县",
  "value": "371423" },

{
  "label": "临邑县",
  "value": "371424" },

{
  "label": "齐河县",
  "value": "371425" },

{
  "label": "平原县",
  "value": "371426" },

{
  "label": "夏津县",
  "value": "371427" },

{
  "label": "武城县",
  "value": "371428" },

{
  "label": "德州经济技术开发区",
  "value": "371471" },

{
  "label": "德州运河经济开发区",
  "value": "371472" },

{
  "label": "乐陵市",
  "value": "371481" },

{
  "label": "禹城市",
  "value": "371482" }],


[{
  "label": "东昌府区",
  "value": "371502" },

{
  "label": "阳谷县",
  "value": "371521" },

{
  "label": "莘县",
  "value": "371522" },

{
  "label": "茌平县",
  "value": "371523" },

{
  "label": "东阿县",
  "value": "371524" },

{
  "label": "冠县",
  "value": "371525" },

{
  "label": "高唐县",
  "value": "371526" },

{
  "label": "临清市",
  "value": "371581" }],


[{
  "label": "滨城区",
  "value": "371602" },

{
  "label": "沾化区",
  "value": "371603" },

{
  "label": "惠民县",
  "value": "371621" },

{
  "label": "阳信县",
  "value": "371622" },

{
  "label": "无棣县",
  "value": "371623" },

{
  "label": "博兴县",
  "value": "371625" },

{
  "label": "邹平县",
  "value": "371626" }],


[{
  "label": "牡丹区",
  "value": "371702" },

{
  "label": "定陶区",
  "value": "371703" },

{
  "label": "曹县",
  "value": "371721" },

{
  "label": "单县",
  "value": "371722" },

{
  "label": "成武县",
  "value": "371723" },

{
  "label": "巨野县",
  "value": "371724" },

{
  "label": "郓城县",
  "value": "371725" },

{
  "label": "鄄城县",
  "value": "371726" },

{
  "label": "东明县",
  "value": "371728" },

{
  "label": "菏泽经济技术开发区",
  "value": "371771" },

{
  "label": "菏泽高新技术开发区",
  "value": "371772" }]],




[
[{
  "label": "江岸区",
  "value": "420102" },

{
  "label": "江汉区",
  "value": "420103" },

{
  "label": "硚口区",
  "value": "420104" },

{
  "label": "汉阳区",
  "value": "420105" },

{
  "label": "武昌区",
  "value": "420106" },

{
  "label": "青山区",
  "value": "420107" },

{
  "label": "洪山区",
  "value": "420111" },

{
  "label": "东西湖区",
  "value": "420112" },

{
  "label": "汉南区",
  "value": "420113" },

{
  "label": "蔡甸区",
  "value": "420114" },

{
  "label": "江夏区",
  "value": "420115" },

{
  "label": "黄陂区",
  "value": "420116" },

{
  "label": "新洲区",
  "value": "420117" }],


[{
  "label": "黄石港区",
  "value": "420202" },

{
  "label": "西塞山区",
  "value": "420203" },

{
  "label": "下陆区",
  "value": "420204" },

{
  "label": "铁山区",
  "value": "420205" },

{
  "label": "阳新县",
  "value": "420222" },

{
  "label": "大冶市",
  "value": "420281" }],


[{
  "label": "茅箭区",
  "value": "420302" },

{
  "label": "张湾区",
  "value": "420303" },

{
  "label": "郧阳区",
  "value": "420304" },

{
  "label": "郧西县",
  "value": "420322" },

{
  "label": "竹山县",
  "value": "420323" },

{
  "label": "竹溪县",
  "value": "420324" },

{
  "label": "房县",
  "value": "420325" },

{
  "label": "丹江口市",
  "value": "420381" }],


[{
  "label": "西陵区",
  "value": "420502" },

{
  "label": "伍家岗区",
  "value": "420503" },

{
  "label": "点军区",
  "value": "420504" },

{
  "label": "猇亭区",
  "value": "420505" },

{
  "label": "夷陵区",
  "value": "420506" },

{
  "label": "远安县",
  "value": "420525" },

{
  "label": "兴山县",
  "value": "420526" },

{
  "label": "秭归县",
  "value": "420527" },

{
  "label": "长阳土家族自治县",
  "value": "420528" },

{
  "label": "五峰土家族自治县",
  "value": "420529" },

{
  "label": "宜都市",
  "value": "420581" },

{
  "label": "当阳市",
  "value": "420582" },

{
  "label": "枝江市",
  "value": "420583" }],


[{
  "label": "襄城区",
  "value": "420602" },

{
  "label": "樊城区",
  "value": "420606" },

{
  "label": "襄州区",
  "value": "420607" },

{
  "label": "南漳县",
  "value": "420624" },

{
  "label": "谷城县",
  "value": "420625" },

{
  "label": "保康县",
  "value": "420626" },

{
  "label": "老河口市",
  "value": "420682" },

{
  "label": "枣阳市",
  "value": "420683" },

{
  "label": "宜城市",
  "value": "420684" }],


[{
  "label": "梁子湖区",
  "value": "420702" },

{
  "label": "华容区",
  "value": "420703" },

{
  "label": "鄂城区",
  "value": "420704" }],


[{
  "label": "东宝区",
  "value": "420802" },

{
  "label": "掇刀区",
  "value": "420804" },

{
  "label": "京山县",
  "value": "420821" },

{
  "label": "沙洋县",
  "value": "420822" },

{
  "label": "钟祥市",
  "value": "420881" }],


[{
  "label": "孝南区",
  "value": "420902" },

{
  "label": "孝昌县",
  "value": "420921" },

{
  "label": "大悟县",
  "value": "420922" },

{
  "label": "云梦县",
  "value": "420923" },

{
  "label": "应城市",
  "value": "420981" },

{
  "label": "安陆市",
  "value": "420982" },

{
  "label": "汉川市",
  "value": "420984" }],


[{
  "label": "沙市区",
  "value": "421002" },

{
  "label": "荆州区",
  "value": "421003" },

{
  "label": "公安县",
  "value": "421022" },

{
  "label": "监利县",
  "value": "421023" },

{
  "label": "江陵县",
  "value": "421024" },

{
  "label": "荆州经济技术开发区",
  "value": "421071" },

{
  "label": "石首市",
  "value": "421081" },

{
  "label": "洪湖市",
  "value": "421083" },

{
  "label": "松滋市",
  "value": "421087" }],


[{
  "label": "黄州区",
  "value": "421102" },

{
  "label": "团风县",
  "value": "421121" },

{
  "label": "红安县",
  "value": "421122" },

{
  "label": "罗田县",
  "value": "421123" },

{
  "label": "英山县",
  "value": "421124" },

{
  "label": "浠水县",
  "value": "421125" },

{
  "label": "蕲春县",
  "value": "421126" },

{
  "label": "黄梅县",
  "value": "421127" },

{
  "label": "龙感湖管理区",
  "value": "421171" },

{
  "label": "麻城市",
  "value": "421181" },

{
  "label": "武穴市",
  "value": "421182" }],


[{
  "label": "咸安区",
  "value": "421202" },

{
  "label": "嘉鱼县",
  "value": "421221" },

{
  "label": "通城县",
  "value": "421222" },

{
  "label": "崇阳县",
  "value": "421223" },

{
  "label": "通山县",
  "value": "421224" },

{
  "label": "赤壁市",
  "value": "421281" }],


[{
  "label": "曾都区",
  "value": "421303" },

{
  "label": "随县",
  "value": "421321" },

{
  "label": "广水市",
  "value": "421381" }],


[{
  "label": "恩施市",
  "value": "422801" },

{
  "label": "利川市",
  "value": "422802" },

{
  "label": "建始县",
  "value": "422822" },

{
  "label": "巴东县",
  "value": "422823" },

{
  "label": "宣恩县",
  "value": "422825" },

{
  "label": "咸丰县",
  "value": "422826" },

{
  "label": "来凤县",
  "value": "422827" },

{
  "label": "鹤峰县",
  "value": "422828" }],


[{
  "label": "仙桃市",
  "value": "429004" },

{
  "label": "潜江市",
  "value": "429005" },

{
  "label": "天门市",
  "value": "429006" },

{
  "label": "神农架林区",
  "value": "429021" }]],



[
[{
  "label": "芙蓉区",
  "value": "430102" },

{
  "label": "天心区",
  "value": "430103" },

{
  "label": "岳麓区",
  "value": "430104" },

{
  "label": "开福区",
  "value": "430105" },

{
  "label": "雨花区",
  "value": "430111" },

{
  "label": "望城区",
  "value": "430112" },

{
  "label": "长沙县",
  "value": "430121" },

{
  "label": "浏阳市",
  "value": "430181" },

{
  "label": "宁乡市",
  "value": "430182" }],


[{
  "label": "荷塘区",
  "value": "430202" },

{
  "label": "芦淞区",
  "value": "430203" },

{
  "label": "石峰区",
  "value": "430204" },

{
  "label": "天元区",
  "value": "430211" },

{
  "label": "株洲县",
  "value": "430221" },

{
  "label": "攸县",
  "value": "430223" },

{
  "label": "茶陵县",
  "value": "430224" },

{
  "label": "炎陵县",
  "value": "430225" },

{
  "label": "云龙示范区",
  "value": "430271" },

{
  "label": "醴陵市",
  "value": "430281" }],


[{
  "label": "雨湖区",
  "value": "430302" },

{
  "label": "岳塘区",
  "value": "430304" },

{
  "label": "湘潭县",
  "value": "430321" },

{
  "label": "湖南湘潭高新技术产业园区",
  "value": "430371" },

{
  "label": "湘潭昭山示范区",
  "value": "430372" },

{
  "label": "湘潭九华示范区",
  "value": "430373" },

{
  "label": "湘乡市",
  "value": "430381" },

{
  "label": "韶山市",
  "value": "430382" }],


[{
  "label": "珠晖区",
  "value": "430405" },

{
  "label": "雁峰区",
  "value": "430406" },

{
  "label": "石鼓区",
  "value": "430407" },

{
  "label": "蒸湘区",
  "value": "430408" },

{
  "label": "南岳区",
  "value": "430412" },

{
  "label": "衡阳县",
  "value": "430421" },

{
  "label": "衡南县",
  "value": "430422" },

{
  "label": "衡山县",
  "value": "430423" },

{
  "label": "衡东县",
  "value": "430424" },

{
  "label": "祁东县",
  "value": "430426" },

{
  "label": "衡阳综合保税区",
  "value": "430471" },

{
  "label": "湖南衡阳高新技术产业园区",
  "value": "430472" },

{
  "label": "湖南衡阳松木经济开发区",
  "value": "430473" },

{
  "label": "耒阳市",
  "value": "430481" },

{
  "label": "常宁市",
  "value": "430482" }],


[{
  "label": "双清区",
  "value": "430502" },

{
  "label": "大祥区",
  "value": "430503" },

{
  "label": "北塔区",
  "value": "430511" },

{
  "label": "邵东县",
  "value": "430521" },

{
  "label": "新邵县",
  "value": "430522" },

{
  "label": "邵阳县",
  "value": "430523" },

{
  "label": "隆回县",
  "value": "430524" },

{
  "label": "洞口县",
  "value": "430525" },

{
  "label": "绥宁县",
  "value": "430527" },

{
  "label": "新宁县",
  "value": "430528" },

{
  "label": "城步苗族自治县",
  "value": "430529" },

{
  "label": "武冈市",
  "value": "430581" }],


[{
  "label": "岳阳楼区",
  "value": "430602" },

{
  "label": "云溪区",
  "value": "430603" },

{
  "label": "君山区",
  "value": "430611" },

{
  "label": "岳阳县",
  "value": "430621" },

{
  "label": "华容县",
  "value": "430623" },

{
  "label": "湘阴县",
  "value": "430624" },

{
  "label": "平江县",
  "value": "430626" },

{
  "label": "岳阳市屈原管理区",
  "value": "430671" },

{
  "label": "汨罗市",
  "value": "430681" },

{
  "label": "临湘市",
  "value": "430682" }],


[{
  "label": "武陵区",
  "value": "430702" },

{
  "label": "鼎城区",
  "value": "430703" },

{
  "label": "安乡县",
  "value": "430721" },

{
  "label": "汉寿县",
  "value": "430722" },

{
  "label": "澧县",
  "value": "430723" },

{
  "label": "临澧县",
  "value": "430724" },

{
  "label": "桃源县",
  "value": "430725" },

{
  "label": "石门县",
  "value": "430726" },

{
  "label": "常德市西洞庭管理区",
  "value": "430771" },

{
  "label": "津市市",
  "value": "430781" }],


[{
  "label": "永定区",
  "value": "430802" },

{
  "label": "武陵源区",
  "value": "430811" },

{
  "label": "慈利县",
  "value": "430821" },

{
  "label": "桑植县",
  "value": "430822" }],


[{
  "label": "资阳区",
  "value": "430902" },

{
  "label": "赫山区",
  "value": "430903" },

{
  "label": "南县",
  "value": "430921" },

{
  "label": "桃江县",
  "value": "430922" },

{
  "label": "安化县",
  "value": "430923" },

{
  "label": "益阳市大通湖管理区",
  "value": "430971" },

{
  "label": "湖南益阳高新技术产业园区",
  "value": "430972" },

{
  "label": "沅江市",
  "value": "430981" }],


[{
  "label": "北湖区",
  "value": "431002" },

{
  "label": "苏仙区",
  "value": "431003" },

{
  "label": "桂阳县",
  "value": "431021" },

{
  "label": "宜章县",
  "value": "431022" },

{
  "label": "永兴县",
  "value": "431023" },

{
  "label": "嘉禾县",
  "value": "431024" },

{
  "label": "临武县",
  "value": "431025" },

{
  "label": "汝城县",
  "value": "431026" },

{
  "label": "桂东县",
  "value": "431027" },

{
  "label": "安仁县",
  "value": "431028" },

{
  "label": "资兴市",
  "value": "431081" }],


[{
  "label": "零陵区",
  "value": "431102" },

{
  "label": "冷水滩区",
  "value": "431103" },

{
  "label": "祁阳县",
  "value": "431121" },

{
  "label": "东安县",
  "value": "431122" },

{
  "label": "双牌县",
  "value": "431123" },

{
  "label": "道县",
  "value": "431124" },

{
  "label": "江永县",
  "value": "431125" },

{
  "label": "宁远县",
  "value": "431126" },

{
  "label": "蓝山县",
  "value": "431127" },

{
  "label": "新田县",
  "value": "431128" },

{
  "label": "江华瑶族自治县",
  "value": "431129" },

{
  "label": "永州经济技术开发区",
  "value": "431171" },

{
  "label": "永州市金洞管理区",
  "value": "431172" },

{
  "label": "永州市回龙圩管理区",
  "value": "431173" }],


[{
  "label": "鹤城区",
  "value": "431202" },

{
  "label": "中方县",
  "value": "431221" },

{
  "label": "沅陵县",
  "value": "431222" },

{
  "label": "辰溪县",
  "value": "431223" },

{
  "label": "溆浦县",
  "value": "431224" },

{
  "label": "会同县",
  "value": "431225" },

{
  "label": "麻阳苗族自治县",
  "value": "431226" },

{
  "label": "新晃侗族自治县",
  "value": "431227" },

{
  "label": "芷江侗族自治县",
  "value": "431228" },

{
  "label": "靖州苗族侗族自治县",
  "value": "431229" },

{
  "label": "通道侗族自治县",
  "value": "431230" },

{
  "label": "怀化市洪江管理区",
  "value": "431271" },

{
  "label": "洪江市",
  "value": "431281" }],


[{
  "label": "娄星区",
  "value": "431302" },

{
  "label": "双峰县",
  "value": "431321" },

{
  "label": "新化县",
  "value": "431322" },

{
  "label": "冷水江市",
  "value": "431381" },

{
  "label": "涟源市",
  "value": "431382" }],


[{
  "label": "吉首市",
  "value": "433101" },

{
  "label": "泸溪县",
  "value": "433122" },

{
  "label": "凤凰县",
  "value": "433123" },

{
  "label": "花垣县",
  "value": "433124" },

{
  "label": "保靖县",
  "value": "433125" },

{
  "label": "古丈县",
  "value": "433126" },

{
  "label": "永顺县",
  "value": "433127" },

{
  "label": "龙山县",
  "value": "433130" },

{
  "label": "湖南吉首经济开发区",
  "value": "433172" },

{
  "label": "湖南永顺经济开发区",
  "value": "433173" }]],



[
[{
  "label": "荔湾区",
  "value": "440103" },

{
  "label": "越秀区",
  "value": "440104" },

{
  "label": "海珠区",
  "value": "440105" },

{
  "label": "天河区",
  "value": "440106" },

{
  "label": "白云区",
  "value": "440111" },

{
  "label": "黄埔区",
  "value": "440112" },

{
  "label": "番禺区",
  "value": "440113" },

{
  "label": "花都区",
  "value": "440114" },

{
  "label": "南沙区",
  "value": "440115" },

{
  "label": "从化区",
  "value": "440117" },

{
  "label": "增城区",
  "value": "440118" }],


[{
  "label": "武江区",
  "value": "440203" },

{
  "label": "浈江区",
  "value": "440204" },

{
  "label": "曲江区",
  "value": "440205" },

{
  "label": "始兴县",
  "value": "440222" },

{
  "label": "仁化县",
  "value": "440224" },

{
  "label": "翁源县",
  "value": "440229" },

{
  "label": "乳源瑶族自治县",
  "value": "440232" },

{
  "label": "新丰县",
  "value": "440233" },

{
  "label": "乐昌市",
  "value": "440281" },

{
  "label": "南雄市",
  "value": "440282" }],


[{
  "label": "罗湖区",
  "value": "440303" },

{
  "label": "福田区",
  "value": "440304" },

{
  "label": "南山区",
  "value": "440305" },

{
  "label": "宝安区",
  "value": "440306" },

{
  "label": "龙岗区",
  "value": "440307" },

{
  "label": "盐田区",
  "value": "440308" },

{
  "label": "龙华区",
  "value": "440309" },

{
  "label": "坪山区",
  "value": "440310" }],


[{
  "label": "香洲区",
  "value": "440402" },

{
  "label": "斗门区",
  "value": "440403" },

{
  "label": "金湾区",
  "value": "440404" }],


[{
  "label": "龙湖区",
  "value": "440507" },

{
  "label": "金平区",
  "value": "440511" },

{
  "label": "濠江区",
  "value": "440512" },

{
  "label": "潮阳区",
  "value": "440513" },

{
  "label": "潮南区",
  "value": "440514" },

{
  "label": "澄海区",
  "value": "440515" },

{
  "label": "南澳县",
  "value": "440523" }],


[{
  "label": "禅城区",
  "value": "440604" },

{
  "label": "南海区",
  "value": "440605" },

{
  "label": "顺德区",
  "value": "440606" },

{
  "label": "三水区",
  "value": "440607" },

{
  "label": "高明区",
  "value": "440608" }],


[{
  "label": "蓬江区",
  "value": "440703" },

{
  "label": "江海区",
  "value": "440704" },

{
  "label": "新会区",
  "value": "440705" },

{
  "label": "台山市",
  "value": "440781" },

{
  "label": "开平市",
  "value": "440783" },

{
  "label": "鹤山市",
  "value": "440784" },

{
  "label": "恩平市",
  "value": "440785" }],


[{
  "label": "赤坎区",
  "value": "440802" },

{
  "label": "霞山区",
  "value": "440803" },

{
  "label": "坡头区",
  "value": "440804" },

{
  "label": "麻章区",
  "value": "440811" },

{
  "label": "遂溪县",
  "value": "440823" },

{
  "label": "徐闻县",
  "value": "440825" },

{
  "label": "廉江市",
  "value": "440881" },

{
  "label": "雷州市",
  "value": "440882" },

{
  "label": "吴川市",
  "value": "440883" }],


[{
  "label": "茂南区",
  "value": "440902" },

{
  "label": "电白区",
  "value": "440904" },

{
  "label": "高州市",
  "value": "440981" },

{
  "label": "化州市",
  "value": "440982" },

{
  "label": "信宜市",
  "value": "440983" }],


[{
  "label": "端州区",
  "value": "441202" },

{
  "label": "鼎湖区",
  "value": "441203" },

{
  "label": "高要区",
  "value": "441204" },

{
  "label": "广宁县",
  "value": "441223" },

{
  "label": "怀集县",
  "value": "441224" },

{
  "label": "封开县",
  "value": "441225" },

{
  "label": "德庆县",
  "value": "441226" },

{
  "label": "四会市",
  "value": "441284" }],


[{
  "label": "惠城区",
  "value": "441302" },

{
  "label": "惠阳区",
  "value": "441303" },

{
  "label": "博罗县",
  "value": "441322" },

{
  "label": "惠东县",
  "value": "441323" },

{
  "label": "龙门县",
  "value": "441324" }],


[{
  "label": "梅江区",
  "value": "441402" },

{
  "label": "梅县区",
  "value": "441403" },

{
  "label": "大埔县",
  "value": "441422" },

{
  "label": "丰顺县",
  "value": "441423" },

{
  "label": "五华县",
  "value": "441424" },

{
  "label": "平远县",
  "value": "441426" },

{
  "label": "蕉岭县",
  "value": "441427" },

{
  "label": "兴宁市",
  "value": "441481" }],


[{
  "label": "城区",
  "value": "441502" },

{
  "label": "海丰县",
  "value": "441521" },

{
  "label": "陆河县",
  "value": "441523" },

{
  "label": "陆丰市",
  "value": "441581" }],


[{
  "label": "源城区",
  "value": "441602" },

{
  "label": "紫金县",
  "value": "441621" },

{
  "label": "龙川县",
  "value": "441622" },

{
  "label": "连平县",
  "value": "441623" },

{
  "label": "和平县",
  "value": "441624" },

{
  "label": "东源县",
  "value": "441625" }],


[{
  "label": "江城区",
  "value": "441702" },

{
  "label": "阳东区",
  "value": "441704" },

{
  "label": "阳西县",
  "value": "441721" },

{
  "label": "阳春市",
  "value": "441781" }],


[{
  "label": "清城区",
  "value": "441802" },

{
  "label": "清新区",
  "value": "441803" },

{
  "label": "佛冈县",
  "value": "441821" },

{
  "label": "阳山县",
  "value": "441823" },

{
  "label": "连山壮族瑶族自治县",
  "value": "441825" },

{
  "label": "连南瑶族自治县",
  "value": "441826" },

{
  "label": "英德市",
  "value": "441881" },

{
  "label": "连州市",
  "value": "441882" }],


[{
  "label": "东莞市",
  "value": "441900" }],

[{
  "label": "中山市",
  "value": "442000" }],

[{
  "label": "湘桥区",
  "value": "445102" },

{
  "label": "潮安区",
  "value": "445103" },

{
  "label": "饶平县",
  "value": "445122" }],


[{
  "label": "榕城区",
  "value": "445202" },

{
  "label": "揭东区",
  "value": "445203" },

{
  "label": "揭西县",
  "value": "445222" },

{
  "label": "惠来县",
  "value": "445224" },

{
  "label": "普宁市",
  "value": "445281" }],


[{
  "label": "云城区",
  "value": "445302" },

{
  "label": "云安区",
  "value": "445303" },

{
  "label": "新兴县",
  "value": "445321" },

{
  "label": "郁南县",
  "value": "445322" },

{
  "label": "罗定市",
  "value": "445381" }]],



[
[{
  "label": "兴宁区",
  "value": "450102" },

{
  "label": "青秀区",
  "value": "450103" },

{
  "label": "江南区",
  "value": "450105" },

{
  "label": "西乡塘区",
  "value": "450107" },

{
  "label": "良庆区",
  "value": "450108" },

{
  "label": "邕宁区",
  "value": "450109" },

{
  "label": "武鸣区",
  "value": "450110" },

{
  "label": "隆安县",
  "value": "450123" },

{
  "label": "马山县",
  "value": "450124" },

{
  "label": "上林县",
  "value": "450125" },

{
  "label": "宾阳县",
  "value": "450126" },

{
  "label": "横县",
  "value": "450127" }],


[{
  "label": "城中区",
  "value": "450202" },

{
  "label": "鱼峰区",
  "value": "450203" },

{
  "label": "柳南区",
  "value": "450204" },

{
  "label": "柳北区",
  "value": "450205" },

{
  "label": "柳江区",
  "value": "450206" },

{
  "label": "柳城县",
  "value": "450222" },

{
  "label": "鹿寨县",
  "value": "450223" },

{
  "label": "融安县",
  "value": "450224" },

{
  "label": "融水苗族自治县",
  "value": "450225" },

{
  "label": "三江侗族自治县",
  "value": "450226" }],


[{
  "label": "秀峰区",
  "value": "450302" },

{
  "label": "叠彩区",
  "value": "450303" },

{
  "label": "象山区",
  "value": "450304" },

{
  "label": "七星区",
  "value": "450305" },

{
  "label": "雁山区",
  "value": "450311" },

{
  "label": "临桂区",
  "value": "450312" },

{
  "label": "阳朔县",
  "value": "450321" },

{
  "label": "灵川县",
  "value": "450323" },

{
  "label": "全州县",
  "value": "450324" },

{
  "label": "兴安县",
  "value": "450325" },

{
  "label": "永福县",
  "value": "450326" },

{
  "label": "灌阳县",
  "value": "450327" },

{
  "label": "龙胜各族自治县",
  "value": "450328" },

{
  "label": "资源县",
  "value": "450329" },

{
  "label": "平乐县",
  "value": "450330" },

{
  "label": "荔浦县",
  "value": "450331" },

{
  "label": "恭城瑶族自治县",
  "value": "450332" }],


[{
  "label": "万秀区",
  "value": "450403" },

{
  "label": "长洲区",
  "value": "450405" },

{
  "label": "龙圩区",
  "value": "450406" },

{
  "label": "苍梧县",
  "value": "450421" },

{
  "label": "藤县",
  "value": "450422" },

{
  "label": "蒙山县",
  "value": "450423" },

{
  "label": "岑溪市",
  "value": "450481" }],


[{
  "label": "海城区",
  "value": "450502" },

{
  "label": "银海区",
  "value": "450503" },

{
  "label": "铁山港区",
  "value": "450512" },

{
  "label": "合浦县",
  "value": "450521" }],


[{
  "label": "港口区",
  "value": "450602" },

{
  "label": "防城区",
  "value": "450603" },

{
  "label": "上思县",
  "value": "450621" },

{
  "label": "东兴市",
  "value": "450681" }],


[{
  "label": "钦南区",
  "value": "450702" },

{
  "label": "钦北区",
  "value": "450703" },

{
  "label": "灵山县",
  "value": "450721" },

{
  "label": "浦北县",
  "value": "450722" }],


[{
  "label": "港北区",
  "value": "450802" },

{
  "label": "港南区",
  "value": "450803" },

{
  "label": "覃塘区",
  "value": "450804" },

{
  "label": "平南县",
  "value": "450821" },

{
  "label": "桂平市",
  "value": "450881" }],


[{
  "label": "玉州区",
  "value": "450902" },

{
  "label": "福绵区",
  "value": "450903" },

{
  "label": "容县",
  "value": "450921" },

{
  "label": "陆川县",
  "value": "450922" },

{
  "label": "博白县",
  "value": "450923" },

{
  "label": "兴业县",
  "value": "450924" },

{
  "label": "北流市",
  "value": "450981" }],


[{
  "label": "右江区",
  "value": "451002" },

{
  "label": "田阳县",
  "value": "451021" },

{
  "label": "田东县",
  "value": "451022" },

{
  "label": "平果县",
  "value": "451023" },

{
  "label": "德保县",
  "value": "451024" },

{
  "label": "那坡县",
  "value": "451026" },

{
  "label": "凌云县",
  "value": "451027" },

{
  "label": "乐业县",
  "value": "451028" },

{
  "label": "田林县",
  "value": "451029" },

{
  "label": "西林县",
  "value": "451030" },

{
  "label": "隆林各族自治县",
  "value": "451031" },

{
  "label": "靖西市",
  "value": "451081" }],


[{
  "label": "八步区",
  "value": "451102" },

{
  "label": "平桂区",
  "value": "451103" },

{
  "label": "昭平县",
  "value": "451121" },

{
  "label": "钟山县",
  "value": "451122" },

{
  "label": "富川瑶族自治县",
  "value": "451123" }],


[{
  "label": "金城江区",
  "value": "451202" },

{
  "label": "宜州区",
  "value": "451203" },

{
  "label": "南丹县",
  "value": "451221" },

{
  "label": "天峨县",
  "value": "451222" },

{
  "label": "凤山县",
  "value": "451223" },

{
  "label": "东兰县",
  "value": "451224" },

{
  "label": "罗城仫佬族自治县",
  "value": "451225" },

{
  "label": "环江毛南族自治县",
  "value": "451226" },

{
  "label": "巴马瑶族自治县",
  "value": "451227" },

{
  "label": "都安瑶族自治县",
  "value": "451228" },

{
  "label": "大化瑶族自治县",
  "value": "451229" }],


[{
  "label": "兴宾区",
  "value": "451302" },

{
  "label": "忻城县",
  "value": "451321" },

{
  "label": "象州县",
  "value": "451322" },

{
  "label": "武宣县",
  "value": "451323" },

{
  "label": "金秀瑶族自治县",
  "value": "451324" },

{
  "label": "合山市",
  "value": "451381" }],


[{
  "label": "江州区",
  "value": "451402" },

{
  "label": "扶绥县",
  "value": "451421" },

{
  "label": "宁明县",
  "value": "451422" },

{
  "label": "龙州县",
  "value": "451423" },

{
  "label": "大新县",
  "value": "451424" },

{
  "label": "天等县",
  "value": "451425" },

{
  "label": "凭祥市",
  "value": "451481" }]],



[
[{
  "label": "秀英区",
  "value": "460105" },

{
  "label": "龙华区",
  "value": "460106" },

{
  "label": "琼山区",
  "value": "460107" },

{
  "label": "美兰区",
  "value": "460108" }],


[{
  "label": "海棠区",
  "value": "460202" },

{
  "label": "吉阳区",
  "value": "460203" },

{
  "label": "天涯区",
  "value": "460204" },

{
  "label": "崖州区",
  "value": "460205" }],


[{
  "label": "西沙群岛",
  "value": "460321" },

{
  "label": "南沙群岛",
  "value": "460322" },

{
  "label": "中沙群岛的岛礁及其海域",
  "value": "460323" }],


[{
  "label": "儋州市",
  "value": "460400" }],

[{
  "label": "五指山市",
  "value": "469001" },

{
  "label": "琼海市",
  "value": "469002" },

{
  "label": "文昌市",
  "value": "469005" },

{
  "label": "万宁市",
  "value": "469006" },

{
  "label": "东方市",
  "value": "469007" },

{
  "label": "定安县",
  "value": "469021" },

{
  "label": "屯昌县",
  "value": "469022" },

{
  "label": "澄迈县",
  "value": "469023" },

{
  "label": "临高县",
  "value": "469024" },

{
  "label": "白沙黎族自治县",
  "value": "469025" },

{
  "label": "昌江黎族自治县",
  "value": "469026" },

{
  "label": "乐东黎族自治县",
  "value": "469027" },

{
  "label": "陵水黎族自治县",
  "value": "469028" },

{
  "label": "保亭黎族苗族自治县",
  "value": "469029" },

{
  "label": "琼中黎族苗族自治县",
  "value": "469030" }]],



[
[{
  "label": "万州区",
  "value": "500101" },

{
  "label": "涪陵区",
  "value": "500102" },

{
  "label": "渝中区",
  "value": "500103" },

{
  "label": "大渡口区",
  "value": "500104" },

{
  "label": "江北区",
  "value": "500105" },

{
  "label": "沙坪坝区",
  "value": "500106" },

{
  "label": "九龙坡区",
  "value": "500107" },

{
  "label": "南岸区",
  "value": "500108" },

{
  "label": "北碚区",
  "value": "500109" },

{
  "label": "綦江区",
  "value": "500110" },

{
  "label": "大足区",
  "value": "500111" },

{
  "label": "渝北区",
  "value": "500112" },

{
  "label": "巴南区",
  "value": "500113" },

{
  "label": "黔江区",
  "value": "500114" },

{
  "label": "长寿区",
  "value": "500115" },

{
  "label": "江津区",
  "value": "500116" },

{
  "label": "合川区",
  "value": "500117" },

{
  "label": "永川区",
  "value": "500118" },

{
  "label": "南川区",
  "value": "500119" },

{
  "label": "璧山区",
  "value": "500120" },

{
  "label": "铜梁区",
  "value": "500151" },

{
  "label": "潼南区",
  "value": "500152" },

{
  "label": "荣昌区",
  "value": "500153" },

{
  "label": "开州区",
  "value": "500154" },

{
  "label": "梁平区",
  "value": "500155" },

{
  "label": "武隆区",
  "value": "500156" }],


[{
  "label": "城口县",
  "value": "500229" },

{
  "label": "丰都县",
  "value": "500230" },

{
  "label": "垫江县",
  "value": "500231" },

{
  "label": "忠县",
  "value": "500233" },

{
  "label": "云阳县",
  "value": "500235" },

{
  "label": "奉节县",
  "value": "500236" },

{
  "label": "巫山县",
  "value": "500237" },

{
  "label": "巫溪县",
  "value": "500238" },

{
  "label": "石柱土家族自治县",
  "value": "500240" },

{
  "label": "秀山土家族苗族自治县",
  "value": "500241" },

{
  "label": "酉阳土家族苗族自治县",
  "value": "500242" },

{
  "label": "彭水苗族土家族自治县",
  "value": "500243" }]],



[
[{
  "label": "锦江区",
  "value": "510104" },

{
  "label": "青羊区",
  "value": "510105" },

{
  "label": "金牛区",
  "value": "510106" },

{
  "label": "武侯区",
  "value": "510107" },

{
  "label": "成华区",
  "value": "510108" },

{
  "label": "龙泉驿区",
  "value": "510112" },

{
  "label": "青白江区",
  "value": "510113" },

{
  "label": "新都区",
  "value": "510114" },

{
  "label": "温江区",
  "value": "510115" },

{
  "label": "双流区",
  "value": "510116" },

{
  "label": "郫都区",
  "value": "510117" },

{
  "label": "金堂县",
  "value": "510121" },

{
  "label": "大邑县",
  "value": "510129" },

{
  "label": "蒲江县",
  "value": "510131" },

{
  "label": "新津县",
  "value": "510132" },

{
  "label": "都江堰市",
  "value": "510181" },

{
  "label": "彭州市",
  "value": "510182" },

{
  "label": "邛崃市",
  "value": "510183" },

{
  "label": "崇州市",
  "value": "510184" },

{
  "label": "简阳市",
  "value": "510185" }],


[{
  "label": "自流井区",
  "value": "510302" },

{
  "label": "贡井区",
  "value": "510303" },

{
  "label": "大安区",
  "value": "510304" },

{
  "label": "沿滩区",
  "value": "510311" },

{
  "label": "荣县",
  "value": "510321" },

{
  "label": "富顺县",
  "value": "510322" }],


[{
  "label": "东区",
  "value": "510402" },

{
  "label": "西区",
  "value": "510403" },

{
  "label": "仁和区",
  "value": "510411" },

{
  "label": "米易县",
  "value": "510421" },

{
  "label": "盐边县",
  "value": "510422" }],


[{
  "label": "江阳区",
  "value": "510502" },

{
  "label": "纳溪区",
  "value": "510503" },

{
  "label": "龙马潭区",
  "value": "510504" },

{
  "label": "泸县",
  "value": "510521" },

{
  "label": "合江县",
  "value": "510522" },

{
  "label": "叙永县",
  "value": "510524" },

{
  "label": "古蔺县",
  "value": "510525" }],


[{
  "label": "旌阳区",
  "value": "510603" },

{
  "label": "罗江区",
  "value": "510604" },

{
  "label": "中江县",
  "value": "510623" },

{
  "label": "广汉市",
  "value": "510681" },

{
  "label": "什邡市",
  "value": "510682" },

{
  "label": "绵竹市",
  "value": "510683" }],


[{
  "label": "涪城区",
  "value": "510703" },

{
  "label": "游仙区",
  "value": "510704" },

{
  "label": "安州区",
  "value": "510705" },

{
  "label": "三台县",
  "value": "510722" },

{
  "label": "盐亭县",
  "value": "510723" },

{
  "label": "梓潼县",
  "value": "510725" },

{
  "label": "北川羌族自治县",
  "value": "510726" },

{
  "label": "平武县",
  "value": "510727" },

{
  "label": "江油市",
  "value": "510781" }],


[{
  "label": "利州区",
  "value": "510802" },

{
  "label": "昭化区",
  "value": "510811" },

{
  "label": "朝天区",
  "value": "510812" },

{
  "label": "旺苍县",
  "value": "510821" },

{
  "label": "青川县",
  "value": "510822" },

{
  "label": "剑阁县",
  "value": "510823" },

{
  "label": "苍溪县",
  "value": "510824" }],


[{
  "label": "船山区",
  "value": "510903" },

{
  "label": "安居区",
  "value": "510904" },

{
  "label": "蓬溪县",
  "value": "510921" },

{
  "label": "射洪县",
  "value": "510922" },

{
  "label": "大英县",
  "value": "510923" }],


[{
  "label": "市中区",
  "value": "511002" },

{
  "label": "东兴区",
  "value": "511011" },

{
  "label": "威远县",
  "value": "511024" },

{
  "label": "资中县",
  "value": "511025" },

{
  "label": "内江经济开发区",
  "value": "511071" },

{
  "label": "隆昌市",
  "value": "511083" }],


[{
  "label": "市中区",
  "value": "511102" },

{
  "label": "沙湾区",
  "value": "511111" },

{
  "label": "五通桥区",
  "value": "511112" },

{
  "label": "金口河区",
  "value": "511113" },

{
  "label": "犍为县",
  "value": "511123" },

{
  "label": "井研县",
  "value": "511124" },

{
  "label": "夹江县",
  "value": "511126" },

{
  "label": "沐川县",
  "value": "511129" },

{
  "label": "峨边彝族自治县",
  "value": "511132" },

{
  "label": "马边彝族自治县",
  "value": "511133" },

{
  "label": "峨眉山市",
  "value": "511181" }],


[{
  "label": "顺庆区",
  "value": "511302" },

{
  "label": "高坪区",
  "value": "511303" },

{
  "label": "嘉陵区",
  "value": "511304" },

{
  "label": "南部县",
  "value": "511321" },

{
  "label": "营山县",
  "value": "511322" },

{
  "label": "蓬安县",
  "value": "511323" },

{
  "label": "仪陇县",
  "value": "511324" },

{
  "label": "西充县",
  "value": "511325" },

{
  "label": "阆中市",
  "value": "511381" }],


[{
  "label": "东坡区",
  "value": "511402" },

{
  "label": "彭山区",
  "value": "511403" },

{
  "label": "仁寿县",
  "value": "511421" },

{
  "label": "洪雅县",
  "value": "511423" },

{
  "label": "丹棱县",
  "value": "511424" },

{
  "label": "青神县",
  "value": "511425" }],


[{
  "label": "翠屏区",
  "value": "511502" },

{
  "label": "南溪区",
  "value": "511503" },

{
  "label": "宜宾县",
  "value": "511521" },

{
  "label": "江安县",
  "value": "511523" },

{
  "label": "长宁县",
  "value": "511524" },

{
  "label": "高县",
  "value": "511525" },

{
  "label": "珙县",
  "value": "511526" },

{
  "label": "筠连县",
  "value": "511527" },

{
  "label": "兴文县",
  "value": "511528" },

{
  "label": "屏山县",
  "value": "511529" }],


[{
  "label": "广安区",
  "value": "511602" },

{
  "label": "前锋区",
  "value": "511603" },

{
  "label": "岳池县",
  "value": "511621" },

{
  "label": "武胜县",
  "value": "511622" },

{
  "label": "邻水县",
  "value": "511623" },

{
  "label": "华蓥市",
  "value": "511681" }],


[{
  "label": "通川区",
  "value": "511702" },

{
  "label": "达川区",
  "value": "511703" },

{
  "label": "宣汉县",
  "value": "511722" },

{
  "label": "开江县",
  "value": "511723" },

{
  "label": "大竹县",
  "value": "511724" },

{
  "label": "渠县",
  "value": "511725" },

{
  "label": "达州经济开发区",
  "value": "511771" },

{
  "label": "万源市",
  "value": "511781" }],


[{
  "label": "雨城区",
  "value": "511802" },

{
  "label": "名山区",
  "value": "511803" },

{
  "label": "荥经县",
  "value": "511822" },

{
  "label": "汉源县",
  "value": "511823" },

{
  "label": "石棉县",
  "value": "511824" },

{
  "label": "天全县",
  "value": "511825" },

{
  "label": "芦山县",
  "value": "511826" },

{
  "label": "宝兴县",
  "value": "511827" }],


[{
  "label": "巴州区",
  "value": "511902" },

{
  "label": "恩阳区",
  "value": "511903" },

{
  "label": "通江县",
  "value": "511921" },

{
  "label": "南江县",
  "value": "511922" },

{
  "label": "平昌县",
  "value": "511923" },

{
  "label": "巴中经济开发区",
  "value": "511971" }],


[{
  "label": "雁江区",
  "value": "512002" },

{
  "label": "安岳县",
  "value": "512021" },

{
  "label": "乐至县",
  "value": "512022" }],


[{
  "label": "马尔康市",
  "value": "513201" },

{
  "label": "汶川县",
  "value": "513221" },

{
  "label": "理县",
  "value": "513222" },

{
  "label": "茂县",
  "value": "513223" },

{
  "label": "松潘县",
  "value": "513224" },

{
  "label": "九寨沟县",
  "value": "513225" },

{
  "label": "金川县",
  "value": "513226" },

{
  "label": "小金县",
  "value": "513227" },

{
  "label": "黑水县",
  "value": "513228" },

{
  "label": "壤塘县",
  "value": "513230" },

{
  "label": "阿坝县",
  "value": "513231" },

{
  "label": "若尔盖县",
  "value": "513232" },

{
  "label": "红原县",
  "value": "513233" }],


[{
  "label": "康定市",
  "value": "513301" },

{
  "label": "泸定县",
  "value": "513322" },

{
  "label": "丹巴县",
  "value": "513323" },

{
  "label": "九龙县",
  "value": "513324" },

{
  "label": "雅江县",
  "value": "513325" },

{
  "label": "道孚县",
  "value": "513326" },

{
  "label": "炉霍县",
  "value": "513327" },

{
  "label": "甘孜县",
  "value": "513328" },

{
  "label": "新龙县",
  "value": "513329" },

{
  "label": "德格县",
  "value": "513330" },

{
  "label": "白玉县",
  "value": "513331" },

{
  "label": "石渠县",
  "value": "513332" },

{
  "label": "色达县",
  "value": "513333" },

{
  "label": "理塘县",
  "value": "513334" },

{
  "label": "巴塘县",
  "value": "513335" },

{
  "label": "乡城县",
  "value": "513336" },

{
  "label": "稻城县",
  "value": "513337" },

{
  "label": "得荣县",
  "value": "513338" }],


[{
  "label": "西昌市",
  "value": "513401" },

{
  "label": "木里藏族自治县",
  "value": "513422" },

{
  "label": "盐源县",
  "value": "513423" },

{
  "label": "德昌县",
  "value": "513424" },

{
  "label": "会理县",
  "value": "513425" },

{
  "label": "会东县",
  "value": "513426" },

{
  "label": "宁南县",
  "value": "513427" },

{
  "label": "普格县",
  "value": "513428" },

{
  "label": "布拖县",
  "value": "513429" },

{
  "label": "金阳县",
  "value": "513430" },

{
  "label": "昭觉县",
  "value": "513431" },

{
  "label": "喜德县",
  "value": "513432" },

{
  "label": "冕宁县",
  "value": "513433" },

{
  "label": "越西县",
  "value": "513434" },

{
  "label": "甘洛县",
  "value": "513435" },

{
  "label": "美姑县",
  "value": "513436" },

{
  "label": "雷波县",
  "value": "513437" }]],



[
[{
  "label": "南明区",
  "value": "520102" },

{
  "label": "云岩区",
  "value": "520103" },

{
  "label": "花溪区",
  "value": "520111" },

{
  "label": "乌当区",
  "value": "520112" },

{
  "label": "白云区",
  "value": "520113" },

{
  "label": "观山湖区",
  "value": "520115" },

{
  "label": "开阳县",
  "value": "520121" },

{
  "label": "息烽县",
  "value": "520122" },

{
  "label": "修文县",
  "value": "520123" },

{
  "label": "清镇市",
  "value": "520181" }],


[{
  "label": "钟山区",
  "value": "520201" },

{
  "label": "六枝特区",
  "value": "520203" },

{
  "label": "水城县",
  "value": "520221" },

{
  "label": "盘州市",
  "value": "520281" }],


[{
  "label": "红花岗区",
  "value": "520302" },

{
  "label": "汇川区",
  "value": "520303" },

{
  "label": "播州区",
  "value": "520304" },

{
  "label": "桐梓县",
  "value": "520322" },

{
  "label": "绥阳县",
  "value": "520323" },

{
  "label": "正安县",
  "value": "520324" },

{
  "label": "道真仡佬族苗族自治县",
  "value": "520325" },

{
  "label": "务川仡佬族苗族自治县",
  "value": "520326" },

{
  "label": "凤冈县",
  "value": "520327" },

{
  "label": "湄潭县",
  "value": "520328" },

{
  "label": "余庆县",
  "value": "520329" },

{
  "label": "习水县",
  "value": "520330" },

{
  "label": "赤水市",
  "value": "520381" },

{
  "label": "仁怀市",
  "value": "520382" }],


[{
  "label": "西秀区",
  "value": "520402" },

{
  "label": "平坝区",
  "value": "520403" },

{
  "label": "普定县",
  "value": "520422" },

{
  "label": "镇宁布依族苗族自治县",
  "value": "520423" },

{
  "label": "关岭布依族苗族自治县",
  "value": "520424" },

{
  "label": "紫云苗族布依族自治县",
  "value": "520425" }],


[{
  "label": "七星关区",
  "value": "520502" },

{
  "label": "大方县",
  "value": "520521" },

{
  "label": "黔西县",
  "value": "520522" },

{
  "label": "金沙县",
  "value": "520523" },

{
  "label": "织金县",
  "value": "520524" },

{
  "label": "纳雍县",
  "value": "520525" },

{
  "label": "威宁彝族回族苗族自治县",
  "value": "520526" },

{
  "label": "赫章县",
  "value": "520527" }],


[{
  "label": "碧江区",
  "value": "520602" },

{
  "label": "万山区",
  "value": "520603" },

{
  "label": "江口县",
  "value": "520621" },

{
  "label": "玉屏侗族自治县",
  "value": "520622" },

{
  "label": "石阡县",
  "value": "520623" },

{
  "label": "思南县",
  "value": "520624" },

{
  "label": "印江土家族苗族自治县",
  "value": "520625" },

{
  "label": "德江县",
  "value": "520626" },

{
  "label": "沿河土家族自治县",
  "value": "520627" },

{
  "label": "松桃苗族自治县",
  "value": "520628" }],


[{
  "label": "兴义市",
  "value": "522301" },

{
  "label": "兴仁县",
  "value": "522322" },

{
  "label": "普安县",
  "value": "522323" },

{
  "label": "晴隆县",
  "value": "522324" },

{
  "label": "贞丰县",
  "value": "522325" },

{
  "label": "望谟县",
  "value": "522326" },

{
  "label": "册亨县",
  "value": "522327" },

{
  "label": "安龙县",
  "value": "522328" }],


[{
  "label": "凯里市",
  "value": "522601" },

{
  "label": "黄平县",
  "value": "522622" },

{
  "label": "施秉县",
  "value": "522623" },

{
  "label": "三穗县",
  "value": "522624" },

{
  "label": "镇远县",
  "value": "522625" },

{
  "label": "岑巩县",
  "value": "522626" },

{
  "label": "天柱县",
  "value": "522627" },

{
  "label": "锦屏县",
  "value": "522628" },

{
  "label": "剑河县",
  "value": "522629" },

{
  "label": "台江县",
  "value": "522630" },

{
  "label": "黎平县",
  "value": "522631" },

{
  "label": "榕江县",
  "value": "522632" },

{
  "label": "从江县",
  "value": "522633" },

{
  "label": "雷山县",
  "value": "522634" },

{
  "label": "麻江县",
  "value": "522635" },

{
  "label": "丹寨县",
  "value": "522636" }],


[{
  "label": "都匀市",
  "value": "522701" },

{
  "label": "福泉市",
  "value": "522702" },

{
  "label": "荔波县",
  "value": "522722" },

{
  "label": "贵定县",
  "value": "522723" },

{
  "label": "瓮安县",
  "value": "522725" },

{
  "label": "独山县",
  "value": "522726" },

{
  "label": "平塘县",
  "value": "522727" },

{
  "label": "罗甸县",
  "value": "522728" },

{
  "label": "长顺县",
  "value": "522729" },

{
  "label": "龙里县",
  "value": "522730" },

{
  "label": "惠水县",
  "value": "522731" },

{
  "label": "三都水族自治县",
  "value": "522732" }]],



[
[{
  "label": "五华区",
  "value": "530102" },

{
  "label": "盘龙区",
  "value": "530103" },

{
  "label": "官渡区",
  "value": "530111" },

{
  "label": "西山区",
  "value": "530112" },

{
  "label": "东川区",
  "value": "530113" },

{
  "label": "呈贡区",
  "value": "530114" },

{
  "label": "晋宁区",
  "value": "530115" },

{
  "label": "富民县",
  "value": "530124" },

{
  "label": "宜良县",
  "value": "530125" },

{
  "label": "石林彝族自治县",
  "value": "530126" },

{
  "label": "嵩明县",
  "value": "530127" },

{
  "label": "禄劝彝族苗族自治县",
  "value": "530128" },

{
  "label": "寻甸回族彝族自治县",
  "value": "530129" },

{
  "label": "安宁市",
  "value": "530181" }],


[{
  "label": "麒麟区",
  "value": "530302" },

{
  "label": "沾益区",
  "value": "530303" },

{
  "label": "马龙县",
  "value": "530321" },

{
  "label": "陆良县",
  "value": "530322" },

{
  "label": "师宗县",
  "value": "530323" },

{
  "label": "罗平县",
  "value": "530324" },

{
  "label": "富源县",
  "value": "530325" },

{
  "label": "会泽县",
  "value": "530326" },

{
  "label": "宣威市",
  "value": "530381" }],


[{
  "label": "红塔区",
  "value": "530402" },

{
  "label": "江川区",
  "value": "530403" },

{
  "label": "澄江县",
  "value": "530422" },

{
  "label": "通海县",
  "value": "530423" },

{
  "label": "华宁县",
  "value": "530424" },

{
  "label": "易门县",
  "value": "530425" },

{
  "label": "峨山彝族自治县",
  "value": "530426" },

{
  "label": "新平彝族傣族自治县",
  "value": "530427" },

{
  "label": "元江哈尼族彝族傣族自治县",
  "value": "530428" }],


[{
  "label": "隆阳区",
  "value": "530502" },

{
  "label": "施甸县",
  "value": "530521" },

{
  "label": "龙陵县",
  "value": "530523" },

{
  "label": "昌宁县",
  "value": "530524" },

{
  "label": "腾冲市",
  "value": "530581" }],


[{
  "label": "昭阳区",
  "value": "530602" },

{
  "label": "鲁甸县",
  "value": "530621" },

{
  "label": "巧家县",
  "value": "530622" },

{
  "label": "盐津县",
  "value": "530623" },

{
  "label": "大关县",
  "value": "530624" },

{
  "label": "永善县",
  "value": "530625" },

{
  "label": "绥江县",
  "value": "530626" },

{
  "label": "镇雄县",
  "value": "530627" },

{
  "label": "彝良县",
  "value": "530628" },

{
  "label": "威信县",
  "value": "530629" },

{
  "label": "水富县",
  "value": "530630" }],


[{
  "label": "古城区",
  "value": "530702" },

{
  "label": "玉龙纳西族自治县",
  "value": "530721" },

{
  "label": "永胜县",
  "value": "530722" },

{
  "label": "华坪县",
  "value": "530723" },

{
  "label": "宁蒗彝族自治县",
  "value": "530724" }],


[{
  "label": "思茅区",
  "value": "530802" },

{
  "label": "宁洱哈尼族彝族自治县",
  "value": "530821" },

{
  "label": "墨江哈尼族自治县",
  "value": "530822" },

{
  "label": "景东彝族自治县",
  "value": "530823" },

{
  "label": "景谷傣族彝族自治县",
  "value": "530824" },

{
  "label": "镇沅彝族哈尼族拉祜族自治县",
  "value": "530825" },

{
  "label": "江城哈尼族彝族自治县",
  "value": "530826" },

{
  "label": "孟连傣族拉祜族佤族自治县",
  "value": "530827" },

{
  "label": "澜沧拉祜族自治县",
  "value": "530828" },

{
  "label": "西盟佤族自治县",
  "value": "530829" }],


[{
  "label": "临翔区",
  "value": "530902" },

{
  "label": "凤庆县",
  "value": "530921" },

{
  "label": "云县",
  "value": "530922" },

{
  "label": "永德县",
  "value": "530923" },

{
  "label": "镇康县",
  "value": "530924" },

{
  "label": "双江拉祜族佤族布朗族傣族自治县",
  "value": "530925" },

{
  "label": "耿马傣族佤族自治县",
  "value": "530926" },

{
  "label": "沧源佤族自治县",
  "value": "530927" }],


[{
  "label": "楚雄市",
  "value": "532301" },

{
  "label": "双柏县",
  "value": "532322" },

{
  "label": "牟定县",
  "value": "532323" },

{
  "label": "南华县",
  "value": "532324" },

{
  "label": "姚安县",
  "value": "532325" },

{
  "label": "大姚县",
  "value": "532326" },

{
  "label": "永仁县",
  "value": "532327" },

{
  "label": "元谋县",
  "value": "532328" },

{
  "label": "武定县",
  "value": "532329" },

{
  "label": "禄丰县",
  "value": "532331" }],


[{
  "label": "个旧市",
  "value": "532501" },

{
  "label": "开远市",
  "value": "532502" },

{
  "label": "蒙自市",
  "value": "532503" },

{
  "label": "弥勒市",
  "value": "532504" },

{
  "label": "屏边苗族自治县",
  "value": "532523" },

{
  "label": "建水县",
  "value": "532524" },

{
  "label": "石屏县",
  "value": "532525" },

{
  "label": "泸西县",
  "value": "532527" },

{
  "label": "元阳县",
  "value": "532528" },

{
  "label": "红河县",
  "value": "532529" },

{
  "label": "金平苗族瑶族傣族自治县",
  "value": "532530" },

{
  "label": "绿春县",
  "value": "532531" },

{
  "label": "河口瑶族自治县",
  "value": "532532" }],


[{
  "label": "文山市",
  "value": "532601" },

{
  "label": "砚山县",
  "value": "532622" },

{
  "label": "西畴县",
  "value": "532623" },

{
  "label": "麻栗坡县",
  "value": "532624" },

{
  "label": "马关县",
  "value": "532625" },

{
  "label": "丘北县",
  "value": "532626" },

{
  "label": "广南县",
  "value": "532627" },

{
  "label": "富宁县",
  "value": "532628" }],


[{
  "label": "景洪市",
  "value": "532801" },

{
  "label": "勐海县",
  "value": "532822" },

{
  "label": "勐腊县",
  "value": "532823" }],


[{
  "label": "大理市",
  "value": "532901" },

{
  "label": "漾濞彝族自治县",
  "value": "532922" },

{
  "label": "祥云县",
  "value": "532923" },

{
  "label": "宾川县",
  "value": "532924" },

{
  "label": "弥渡县",
  "value": "532925" },

{
  "label": "南涧彝族自治县",
  "value": "532926" },

{
  "label": "巍山彝族回族自治县",
  "value": "532927" },

{
  "label": "永平县",
  "value": "532928" },

{
  "label": "云龙县",
  "value": "532929" },

{
  "label": "洱源县",
  "value": "532930" },

{
  "label": "剑川县",
  "value": "532931" },

{
  "label": "鹤庆县",
  "value": "532932" }],


[{
  "label": "瑞丽市",
  "value": "533102" },

{
  "label": "芒市",
  "value": "533103" },

{
  "label": "梁河县",
  "value": "533122" },

{
  "label": "盈江县",
  "value": "533123" },

{
  "label": "陇川县",
  "value": "533124" }],


[{
  "label": "泸水市",
  "value": "533301" },

{
  "label": "福贡县",
  "value": "533323" },

{
  "label": "贡山独龙族怒族自治县",
  "value": "533324" },

{
  "label": "兰坪白族普米族自治县",
  "value": "533325" }],


[{
  "label": "香格里拉市",
  "value": "533401" },

{
  "label": "德钦县",
  "value": "533422" },

{
  "label": "维西傈僳族自治县",
  "value": "533423" }]],



[
[{
  "label": "城关区",
  "value": "540102" },

{
  "label": "堆龙德庆区",
  "value": "540103" },

{
  "label": "林周县",
  "value": "540121" },

{
  "label": "当雄县",
  "value": "540122" },

{
  "label": "尼木县",
  "value": "540123" },

{
  "label": "曲水县",
  "value": "540124" },

{
  "label": "达孜县",
  "value": "540126" },

{
  "label": "墨竹工卡县",
  "value": "540127" },

{
  "label": "格尔木藏青工业园区",
  "value": "540171" },

{
  "label": "拉萨经济技术开发区",
  "value": "540172" },

{
  "label": "西藏文化旅游创意园区",
  "value": "540173" },

{
  "label": "达孜工业园区",
  "value": "540174" }],


[{
  "label": "桑珠孜区",
  "value": "540202" },

{
  "label": "南木林县",
  "value": "540221" },

{
  "label": "江孜县",
  "value": "540222" },

{
  "label": "定日县",
  "value": "540223" },

{
  "label": "萨迦县",
  "value": "540224" },

{
  "label": "拉孜县",
  "value": "540225" },

{
  "label": "昂仁县",
  "value": "540226" },

{
  "label": "谢通门县",
  "value": "540227" },

{
  "label": "白朗县",
  "value": "540228" },

{
  "label": "仁布县",
  "value": "540229" },

{
  "label": "康马县",
  "value": "540230" },

{
  "label": "定结县",
  "value": "540231" },

{
  "label": "仲巴县",
  "value": "540232" },

{
  "label": "亚东县",
  "value": "540233" },

{
  "label": "吉隆县",
  "value": "540234" },

{
  "label": "聂拉木县",
  "value": "540235" },

{
  "label": "萨嘎县",
  "value": "540236" },

{
  "label": "岗巴县",
  "value": "540237" }],


[{
  "label": "卡若区",
  "value": "540302" },

{
  "label": "江达县",
  "value": "540321" },

{
  "label": "贡觉县",
  "value": "540322" },

{
  "label": "类乌齐县",
  "value": "540323" },

{
  "label": "丁青县",
  "value": "540324" },

{
  "label": "察雅县",
  "value": "540325" },

{
  "label": "八宿县",
  "value": "540326" },

{
  "label": "左贡县",
  "value": "540327" },

{
  "label": "芒康县",
  "value": "540328" },

{
  "label": "洛隆县",
  "value": "540329" },

{
  "label": "边坝县",
  "value": "540330" }],


[{
  "label": "巴宜区",
  "value": "540402" },

{
  "label": "工布江达县",
  "value": "540421" },

{
  "label": "米林县",
  "value": "540422" },

{
  "label": "墨脱县",
  "value": "540423" },

{
  "label": "波密县",
  "value": "540424" },

{
  "label": "察隅县",
  "value": "540425" },

{
  "label": "朗县",
  "value": "540426" }],


[{
  "label": "乃东区",
  "value": "540502" },

{
  "label": "扎囊县",
  "value": "540521" },

{
  "label": "贡嘎县",
  "value": "540522" },

{
  "label": "桑日县",
  "value": "540523" },

{
  "label": "琼结县",
  "value": "540524" },

{
  "label": "曲松县",
  "value": "540525" },

{
  "label": "措美县",
  "value": "540526" },

{
  "label": "洛扎县",
  "value": "540527" },

{
  "label": "加查县",
  "value": "540528" },

{
  "label": "隆子县",
  "value": "540529" },

{
  "label": "错那县",
  "value": "540530" },

{
  "label": "浪卡子县",
  "value": "540531" }],


[{
  "label": "那曲县",
  "value": "542421" },

{
  "label": "嘉黎县",
  "value": "542422" },

{
  "label": "比如县",
  "value": "542423" },

{
  "label": "聂荣县",
  "value": "542424" },

{
  "label": "安多县",
  "value": "542425" },

{
  "label": "申扎县",
  "value": "542426" },

{
  "label": "索县",
  "value": "542427" },

{
  "label": "班戈县",
  "value": "542428" },

{
  "label": "巴青县",
  "value": "542429" },

{
  "label": "尼玛县",
  "value": "542430" },

{
  "label": "双湖县",
  "value": "542431" }],


[{
  "label": "普兰县",
  "value": "542521" },

{
  "label": "札达县",
  "value": "542522" },

{
  "label": "噶尔县",
  "value": "542523" },

{
  "label": "日土县",
  "value": "542524" },

{
  "label": "革吉县",
  "value": "542525" },

{
  "label": "改则县",
  "value": "542526" },

{
  "label": "措勤县",
  "value": "542527" }]],



[
[{
  "label": "新城区",
  "value": "610102" },

{
  "label": "碑林区",
  "value": "610103" },

{
  "label": "莲湖区",
  "value": "610104" },

{
  "label": "灞桥区",
  "value": "610111" },

{
  "label": "未央区",
  "value": "610112" },

{
  "label": "雁塔区",
  "value": "610113" },

{
  "label": "阎良区",
  "value": "610114" },

{
  "label": "临潼区",
  "value": "610115" },

{
  "label": "长安区",
  "value": "610116" },

{
  "label": "高陵区",
  "value": "610117" },

{
  "label": "鄠邑区",
  "value": "610118" },

{
  "label": "蓝田县",
  "value": "610122" },

{
  "label": "周至县",
  "value": "610124" }],


[{
  "label": "王益区",
  "value": "610202" },

{
  "label": "印台区",
  "value": "610203" },

{
  "label": "耀州区",
  "value": "610204" },

{
  "label": "宜君县",
  "value": "610222" }],


[{
  "label": "渭滨区",
  "value": "610302" },

{
  "label": "金台区",
  "value": "610303" },

{
  "label": "陈仓区",
  "value": "610304" },

{
  "label": "凤翔县",
  "value": "610322" },

{
  "label": "岐山县",
  "value": "610323" },

{
  "label": "扶风县",
  "value": "610324" },

{
  "label": "眉县",
  "value": "610326" },

{
  "label": "陇县",
  "value": "610327" },

{
  "label": "千阳县",
  "value": "610328" },

{
  "label": "麟游县",
  "value": "610329" },

{
  "label": "凤县",
  "value": "610330" },

{
  "label": "太白县",
  "value": "610331" }],


[{
  "label": "秦都区",
  "value": "610402" },

{
  "label": "杨陵区",
  "value": "610403" },

{
  "label": "渭城区",
  "value": "610404" },

{
  "label": "三原县",
  "value": "610422" },

{
  "label": "泾阳县",
  "value": "610423" },

{
  "label": "乾县",
  "value": "610424" },

{
  "label": "礼泉县",
  "value": "610425" },

{
  "label": "永寿县",
  "value": "610426" },

{
  "label": "彬县",
  "value": "610427" },

{
  "label": "长武县",
  "value": "610428" },

{
  "label": "旬邑县",
  "value": "610429" },

{
  "label": "淳化县",
  "value": "610430" },

{
  "label": "武功县",
  "value": "610431" },

{
  "label": "兴平市",
  "value": "610481" }],


[{
  "label": "临渭区",
  "value": "610502" },

{
  "label": "华州区",
  "value": "610503" },

{
  "label": "潼关县",
  "value": "610522" },

{
  "label": "大荔县",
  "value": "610523" },

{
  "label": "合阳县",
  "value": "610524" },

{
  "label": "澄城县",
  "value": "610525" },

{
  "label": "蒲城县",
  "value": "610526" },

{
  "label": "白水县",
  "value": "610527" },

{
  "label": "富平县",
  "value": "610528" },

{
  "label": "韩城市",
  "value": "610581" },

{
  "label": "华阴市",
  "value": "610582" }],


[{
  "label": "宝塔区",
  "value": "610602" },

{
  "label": "安塞区",
  "value": "610603" },

{
  "label": "延长县",
  "value": "610621" },

{
  "label": "延川县",
  "value": "610622" },

{
  "label": "子长县",
  "value": "610623" },

{
  "label": "志丹县",
  "value": "610625" },

{
  "label": "吴起县",
  "value": "610626" },

{
  "label": "甘泉县",
  "value": "610627" },

{
  "label": "富县",
  "value": "610628" },

{
  "label": "洛川县",
  "value": "610629" },

{
  "label": "宜川县",
  "value": "610630" },

{
  "label": "黄龙县",
  "value": "610631" },

{
  "label": "黄陵县",
  "value": "610632" }],


[{
  "label": "汉台区",
  "value": "610702" },

{
  "label": "南郑区",
  "value": "610703" },

{
  "label": "城固县",
  "value": "610722" },

{
  "label": "洋县",
  "value": "610723" },

{
  "label": "西乡县",
  "value": "610724" },

{
  "label": "勉县",
  "value": "610725" },

{
  "label": "宁强县",
  "value": "610726" },

{
  "label": "略阳县",
  "value": "610727" },

{
  "label": "镇巴县",
  "value": "610728" },

{
  "label": "留坝县",
  "value": "610729" },

{
  "label": "佛坪县",
  "value": "610730" }],


[{
  "label": "榆阳区",
  "value": "610802" },

{
  "label": "横山区",
  "value": "610803" },

{
  "label": "府谷县",
  "value": "610822" },

{
  "label": "靖边县",
  "value": "610824" },

{
  "label": "定边县",
  "value": "610825" },

{
  "label": "绥德县",
  "value": "610826" },

{
  "label": "米脂县",
  "value": "610827" },

{
  "label": "佳县",
  "value": "610828" },

{
  "label": "吴堡县",
  "value": "610829" },

{
  "label": "清涧县",
  "value": "610830" },

{
  "label": "子洲县",
  "value": "610831" },

{
  "label": "神木市",
  "value": "610881" }],


[{
  "label": "汉滨区",
  "value": "610902" },

{
  "label": "汉阴县",
  "value": "610921" },

{
  "label": "石泉县",
  "value": "610922" },

{
  "label": "宁陕县",
  "value": "610923" },

{
  "label": "紫阳县",
  "value": "610924" },

{
  "label": "岚皋县",
  "value": "610925" },

{
  "label": "平利县",
  "value": "610926" },

{
  "label": "镇坪县",
  "value": "610927" },

{
  "label": "旬阳县",
  "value": "610928" },

{
  "label": "白河县",
  "value": "610929" }],


[{
  "label": "商州区",
  "value": "611002" },

{
  "label": "洛南县",
  "value": "611021" },

{
  "label": "丹凤县",
  "value": "611022" },

{
  "label": "商南县",
  "value": "611023" },

{
  "label": "山阳县",
  "value": "611024" },

{
  "label": "镇安县",
  "value": "611025" },

{
  "label": "柞水县",
  "value": "611026" }]],



[
[{
  "label": "城关区",
  "value": "620102" },

{
  "label": "七里河区",
  "value": "620103" },

{
  "label": "西固区",
  "value": "620104" },

{
  "label": "安宁区",
  "value": "620105" },

{
  "label": "红古区",
  "value": "620111" },

{
  "label": "永登县",
  "value": "620121" },

{
  "label": "皋兰县",
  "value": "620122" },

{
  "label": "榆中县",
  "value": "620123" },

{
  "label": "兰州新区",
  "value": "620171" }],


[{
  "label": "嘉峪关市",
  "value": "620201" }],

[{
  "label": "金川区",
  "value": "620302" },

{
  "label": "永昌县",
  "value": "620321" }],


[{
  "label": "白银区",
  "value": "620402" },

{
  "label": "平川区",
  "value": "620403" },

{
  "label": "靖远县",
  "value": "620421" },

{
  "label": "会宁县",
  "value": "620422" },

{
  "label": "景泰县",
  "value": "620423" }],


[{
  "label": "秦州区",
  "value": "620502" },

{
  "label": "麦积区",
  "value": "620503" },

{
  "label": "清水县",
  "value": "620521" },

{
  "label": "秦安县",
  "value": "620522" },

{
  "label": "甘谷县",
  "value": "620523" },

{
  "label": "武山县",
  "value": "620524" },

{
  "label": "张家川回族自治县",
  "value": "620525" }],


[{
  "label": "凉州区",
  "value": "620602" },

{
  "label": "民勤县",
  "value": "620621" },

{
  "label": "古浪县",
  "value": "620622" },

{
  "label": "天祝藏族自治县",
  "value": "620623" }],


[{
  "label": "甘州区",
  "value": "620702" },

{
  "label": "肃南裕固族自治县",
  "value": "620721" },

{
  "label": "民乐县",
  "value": "620722" },

{
  "label": "临泽县",
  "value": "620723" },

{
  "label": "高台县",
  "value": "620724" },

{
  "label": "山丹县",
  "value": "620725" }],


[{
  "label": "崆峒区",
  "value": "620802" },

{
  "label": "泾川县",
  "value": "620821" },

{
  "label": "灵台县",
  "value": "620822" },

{
  "label": "崇信县",
  "value": "620823" },

{
  "label": "华亭县",
  "value": "620824" },

{
  "label": "庄浪县",
  "value": "620825" },

{
  "label": "静宁县",
  "value": "620826" },

{
  "label": "平凉工业园区",
  "value": "620871" }],


[{
  "label": "肃州区",
  "value": "620902" },

{
  "label": "金塔县",
  "value": "620921" },

{
  "label": "瓜州县",
  "value": "620922" },

{
  "label": "肃北蒙古族自治县",
  "value": "620923" },

{
  "label": "阿克塞哈萨克族自治县",
  "value": "620924" },

{
  "label": "玉门市",
  "value": "620981" },

{
  "label": "敦煌市",
  "value": "620982" }],


[{
  "label": "西峰区",
  "value": "621002" },

{
  "label": "庆城县",
  "value": "621021" },

{
  "label": "环县",
  "value": "621022" },

{
  "label": "华池县",
  "value": "621023" },

{
  "label": "合水县",
  "value": "621024" },

{
  "label": "正宁县",
  "value": "621025" },

{
  "label": "宁县",
  "value": "621026" },

{
  "label": "镇原县",
  "value": "621027" }],


[{
  "label": "安定区",
  "value": "621102" },

{
  "label": "通渭县",
  "value": "621121" },

{
  "label": "陇西县",
  "value": "621122" },

{
  "label": "渭源县",
  "value": "621123" },

{
  "label": "临洮县",
  "value": "621124" },

{
  "label": "漳县",
  "value": "621125" },

{
  "label": "岷县",
  "value": "621126" }],


[{
  "label": "武都区",
  "value": "621202" },

{
  "label": "成县",
  "value": "621221" },

{
  "label": "文县",
  "value": "621222" },

{
  "label": "宕昌县",
  "value": "621223" },

{
  "label": "康县",
  "value": "621224" },

{
  "label": "西和县",
  "value": "621225" },

{
  "label": "礼县",
  "value": "621226" },

{
  "label": "徽县",
  "value": "621227" },

{
  "label": "两当县",
  "value": "621228" }],


[{
  "label": "临夏市",
  "value": "622901" },

{
  "label": "临夏县",
  "value": "622921" },

{
  "label": "康乐县",
  "value": "622922" },

{
  "label": "永靖县",
  "value": "622923" },

{
  "label": "广河县",
  "value": "622924" },

{
  "label": "和政县",
  "value": "622925" },

{
  "label": "东乡族自治县",
  "value": "622926" },

{
  "label": "积石山保安族东乡族撒拉族自治县",
  "value": "622927" }],


[{
  "label": "合作市",
  "value": "623001" },

{
  "label": "临潭县",
  "value": "623021" },

{
  "label": "卓尼县",
  "value": "623022" },

{
  "label": "舟曲县",
  "value": "623023" },

{
  "label": "迭部县",
  "value": "623024" },

{
  "label": "玛曲县",
  "value": "623025" },

{
  "label": "碌曲县",
  "value": "623026" },

{
  "label": "夏河县",
  "value": "623027" }]],



[
[{
  "label": "城东区",
  "value": "630102" },

{
  "label": "城中区",
  "value": "630103" },

{
  "label": "城西区",
  "value": "630104" },

{
  "label": "城北区",
  "value": "630105" },

{
  "label": "大通回族土族自治县",
  "value": "630121" },

{
  "label": "湟中县",
  "value": "630122" },

{
  "label": "湟源县",
  "value": "630123" }],


[{
  "label": "乐都区",
  "value": "630202" },

{
  "label": "平安区",
  "value": "630203" },

{
  "label": "民和回族土族自治县",
  "value": "630222" },

{
  "label": "互助土族自治县",
  "value": "630223" },

{
  "label": "化隆回族自治县",
  "value": "630224" },

{
  "label": "循化撒拉族自治县",
  "value": "630225" }],


[{
  "label": "门源回族自治县",
  "value": "632221" },

{
  "label": "祁连县",
  "value": "632222" },

{
  "label": "海晏县",
  "value": "632223" },

{
  "label": "刚察县",
  "value": "632224" }],


[{
  "label": "同仁县",
  "value": "632321" },

{
  "label": "尖扎县",
  "value": "632322" },

{
  "label": "泽库县",
  "value": "632323" },

{
  "label": "河南蒙古族自治县",
  "value": "632324" }],


[{
  "label": "共和县",
  "value": "632521" },

{
  "label": "同德县",
  "value": "632522" },

{
  "label": "贵德县",
  "value": "632523" },

{
  "label": "兴海县",
  "value": "632524" },

{
  "label": "贵南县",
  "value": "632525" }],


[{
  "label": "玛沁县",
  "value": "632621" },

{
  "label": "班玛县",
  "value": "632622" },

{
  "label": "甘德县",
  "value": "632623" },

{
  "label": "达日县",
  "value": "632624" },

{
  "label": "久治县",
  "value": "632625" },

{
  "label": "玛多县",
  "value": "632626" }],


[{
  "label": "玉树市",
  "value": "632701" },

{
  "label": "杂多县",
  "value": "632722" },

{
  "label": "称多县",
  "value": "632723" },

{
  "label": "治多县",
  "value": "632724" },

{
  "label": "囊谦县",
  "value": "632725" },

{
  "label": "曲麻莱县",
  "value": "632726" }],


[{
  "label": "格尔木市",
  "value": "632801" },

{
  "label": "德令哈市",
  "value": "632802" },

{
  "label": "乌兰县",
  "value": "632821" },

{
  "label": "都兰县",
  "value": "632822" },

{
  "label": "天峻县",
  "value": "632823" },

{
  "label": "大柴旦行政委员会",
  "value": "632857" },

{
  "label": "冷湖行政委员会",
  "value": "632858" },

{
  "label": "茫崖行政委员会",
  "value": "632859" }]],



[
[{
  "label": "兴庆区",
  "value": "640104" },

{
  "label": "西夏区",
  "value": "640105" },

{
  "label": "金凤区",
  "value": "640106" },

{
  "label": "永宁县",
  "value": "640121" },

{
  "label": "贺兰县",
  "value": "640122" },

{
  "label": "灵武市",
  "value": "640181" }],


[{
  "label": "大武口区",
  "value": "640202" },

{
  "label": "惠农区",
  "value": "640205" },

{
  "label": "平罗县",
  "value": "640221" }],


[{
  "label": "利通区",
  "value": "640302" },

{
  "label": "红寺堡区",
  "value": "640303" },

{
  "label": "盐池县",
  "value": "640323" },

{
  "label": "同心县",
  "value": "640324" },

{
  "label": "青铜峡市",
  "value": "640381" }],


[{
  "label": "原州区",
  "value": "640402" },

{
  "label": "西吉县",
  "value": "640422" },

{
  "label": "隆德县",
  "value": "640423" },

{
  "label": "泾源县",
  "value": "640424" },

{
  "label": "彭阳县",
  "value": "640425" }],


[{
  "label": "沙坡头区",
  "value": "640502" },

{
  "label": "中宁县",
  "value": "640521" },

{
  "label": "海原县",
  "value": "640522" }]],



[
[{
  "label": "天山区",
  "value": "650102" },

{
  "label": "沙依巴克区",
  "value": "650103" },

{
  "label": "新市区",
  "value": "650104" },

{
  "label": "水磨沟区",
  "value": "650105" },

{
  "label": "头屯河区",
  "value": "650106" },

{
  "label": "达坂城区",
  "value": "650107" },

{
  "label": "米东区",
  "value": "650109" },

{
  "label": "乌鲁木齐县",
  "value": "650121" },

{
  "label": "乌鲁木齐经济技术开发区",
  "value": "650171" },

{
  "label": "乌鲁木齐高新技术产业开发区",
  "value": "650172" }],


[{
  "label": "独山子区",
  "value": "650202" },

{
  "label": "克拉玛依区",
  "value": "650203" },

{
  "label": "白碱滩区",
  "value": "650204" },

{
  "label": "乌尔禾区",
  "value": "650205" }],


[{
  "label": "高昌区",
  "value": "650402" },

{
  "label": "鄯善县",
  "value": "650421" },

{
  "label": "托克逊县",
  "value": "650422" }],


[{
  "label": "伊州区",
  "value": "650502" },

{
  "label": "巴里坤哈萨克自治县",
  "value": "650521" },

{
  "label": "伊吾县",
  "value": "650522" }],


[{
  "label": "昌吉市",
  "value": "652301" },

{
  "label": "阜康市",
  "value": "652302" },

{
  "label": "呼图壁县",
  "value": "652323" },

{
  "label": "玛纳斯县",
  "value": "652324" },

{
  "label": "奇台县",
  "value": "652325" },

{
  "label": "吉木萨尔县",
  "value": "652327" },

{
  "label": "木垒哈萨克自治县",
  "value": "652328" }],


[{
  "label": "博乐市",
  "value": "652701" },

{
  "label": "阿拉山口市",
  "value": "652702" },

{
  "label": "精河县",
  "value": "652722" },

{
  "label": "温泉县",
  "value": "652723" }],


[{
  "label": "库尔勒市",
  "value": "652801" },

{
  "label": "轮台县",
  "value": "652822" },

{
  "label": "尉犁县",
  "value": "652823" },

{
  "label": "若羌县",
  "value": "652824" },

{
  "label": "且末县",
  "value": "652825" },

{
  "label": "焉耆回族自治县",
  "value": "652826" },

{
  "label": "和静县",
  "value": "652827" },

{
  "label": "和硕县",
  "value": "652828" },

{
  "label": "博湖县",
  "value": "652829" },

{
  "label": "库尔勒经济技术开发区",
  "value": "652871" }],


[{
  "label": "阿克苏市",
  "value": "652901" },

{
  "label": "温宿县",
  "value": "652922" },

{
  "label": "库车县",
  "value": "652923" },

{
  "label": "沙雅县",
  "value": "652924" },

{
  "label": "新和县",
  "value": "652925" },

{
  "label": "拜城县",
  "value": "652926" },

{
  "label": "乌什县",
  "value": "652927" },

{
  "label": "阿瓦提县",
  "value": "652928" },

{
  "label": "柯坪县",
  "value": "652929" }],


[{
  "label": "阿图什市",
  "value": "653001" },

{
  "label": "阿克陶县",
  "value": "653022" },

{
  "label": "阿合奇县",
  "value": "653023" },

{
  "label": "乌恰县",
  "value": "653024" }],


[{
  "label": "喀什市",
  "value": "653101" },

{
  "label": "疏附县",
  "value": "653121" },

{
  "label": "疏勒县",
  "value": "653122" },

{
  "label": "英吉沙县",
  "value": "653123" },

{
  "label": "泽普县",
  "value": "653124" },

{
  "label": "莎车县",
  "value": "653125" },

{
  "label": "叶城县",
  "value": "653126" },

{
  "label": "麦盖提县",
  "value": "653127" },

{
  "label": "岳普湖县",
  "value": "653128" },

{
  "label": "伽师县",
  "value": "653129" },

{
  "label": "巴楚县",
  "value": "653130" },

{
  "label": "塔什库尔干塔吉克自治县",
  "value": "653131" }],


[{
  "label": "和田市",
  "value": "653201" },

{
  "label": "和田县",
  "value": "653221" },

{
  "label": "墨玉县",
  "value": "653222" },

{
  "label": "皮山县",
  "value": "653223" },

{
  "label": "洛浦县",
  "value": "653224" },

{
  "label": "策勒县",
  "value": "653225" },

{
  "label": "于田县",
  "value": "653226" },

{
  "label": "民丰县",
  "value": "653227" }],


[{
  "label": "伊宁市",
  "value": "654002" },

{
  "label": "奎屯市",
  "value": "654003" },

{
  "label": "霍尔果斯市",
  "value": "654004" },

{
  "label": "伊宁县",
  "value": "654021" },

{
  "label": "察布查尔锡伯自治县",
  "value": "654022" },

{
  "label": "霍城县",
  "value": "654023" },

{
  "label": "巩留县",
  "value": "654024" },

{
  "label": "新源县",
  "value": "654025" },

{
  "label": "昭苏县",
  "value": "654026" },

{
  "label": "特克斯县",
  "value": "654027" },

{
  "label": "尼勒克县",
  "value": "654028" }],


[{
  "label": "塔城市",
  "value": "654201" },

{
  "label": "乌苏市",
  "value": "654202" },

{
  "label": "额敏县",
  "value": "654221" },

{
  "label": "沙湾县",
  "value": "654223" },

{
  "label": "托里县",
  "value": "654224" },

{
  "label": "裕民县",
  "value": "654225" },

{
  "label": "和布克赛尔蒙古自治县",
  "value": "654226" }],


[{
  "label": "阿勒泰市",
  "value": "654301" },

{
  "label": "布尔津县",
  "value": "654321" },

{
  "label": "富蕴县",
  "value": "654322" },

{
  "label": "福海县",
  "value": "654323" },

{
  "label": "哈巴河县",
  "value": "654324" },

{
  "label": "青河县",
  "value": "654325" },

{
  "label": "吉木乃县",
  "value": "654326" }],


[{
  "label": "石河子市",
  "value": "659001" },

{
  "label": "阿拉尔市",
  "value": "659002" },

{
  "label": "图木舒克市",
  "value": "659003" },

{
  "label": "五家渠市",
  "value": "659004" },

{
  "label": "铁门关市",
  "value": "659006" }]],



[
[{
  "label": "台北",
  "value": "660101" }],

[{
  "label": "高雄",
  "value": "660201" }],

[{
  "label": "基隆",
  "value": "660301" }],

[{
  "label": "台中",
  "value": "660401" }],

[{
  "label": "台南",
  "value": "660501" }],

[{
  "label": "新竹",
  "value": "660601" }],

[{
  "label": "嘉义",
  "value": "660701" }],

[{
  "label": "宜兰",
  "value": "660801" }],

[{
  "label": "桃园",
  "value": "660901" }],

[{
  "label": "苗栗",
  "value": "661001" }],

[{
  "label": "彰化",
  "value": "661101" }],

[{
  "label": "南投",
  "value": "661201" }],

[{
  "label": "云林",
  "value": "661301" }],

[{
  "label": "屏东",
  "value": "661401" }],

[{
  "label": "台东",
  "value": "661501" }],

[{
  "label": "花莲",
  "value": "661601" }],

[{
  "label": "澎湖",
  "value": "661701" }]],


[
[{
  "label": "香港岛",
  "value": "670101" }],

[{
  "label": "九龙",
  "value": "670201" }],

[{
  "label": "新界",
  "value": "670301" }]],


[
[{
  "label": "澳门半岛",
  "value": "680101" }],

[{
  "label": "氹仔岛",
  "value": "680201" }],

[{
  "label": "路环岛",
  "value": "680301" }],

[{
  "label": "路氹城",
  "value": "680401" }]]];var _default =



areaData;exports.default = _default;

/***/ }),

/***/ 12:
/*!************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/sdk/libs/xmldom/dom.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */

function copy(src, dest) {
  for (var p in src) {
    dest[p] = src[p];
  }
}
/**
   ^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
   ^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
   */
function _extends(Class, Super) {
  var pt = Class.prototype;
  if (Object.create) {
    var ppt = Object.create(Super.prototype);
    pt.__proto__ = ppt;
  }
  if (!(pt instanceof Super)) {var
    t = function t() {
    };;
    t.prototype = Super.prototype;
    t = new t();
    copy(pt, t);
    Class.prototype = pt = t;
  }
  if (pt.constructor != Class) {
    if (typeof Class != 'function') {
      //console.error("unknow Class:" + Class)
    }
    pt.constructor = Class;
  }
}
var htmlns = 'http://www.w3.org/1999/xhtml';
// Node Types
var NodeType = {};
var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
var TEXT_NODE = NodeType.TEXT_NODE = 3;
var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
var NOTATION_NODE = NodeType.NOTATION_NODE = 12;

// ExceptionCode
var ExceptionCode = {};
var ExceptionMessage = {};
var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
//level2
var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);


function DOMException(code, message) {
  if (message instanceof Error) {
    var error = message;
  } else {
    error = this;
    Error.call(this, ExceptionMessage[code]);
    this.message = ExceptionMessage[code];
    if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
  }
  error.code = code;
  if (message) this.message = this.message + ": " + message;
  return error;
};
DOMException.prototype = Error.prototype;
copy(ExceptionCode, DOMException);
/**
                                    * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
                                    * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
                                    * The items in the NodeList are accessible via an integral index, starting from 0.
                                    */
function NodeList() {
};
NodeList.prototype = {
  /**
                        * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
                        * @standard level1
                        */
  length: 0,
  /**
              * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
              * @standard level1
              * @param index  unsigned long
              *   Index into the collection.
              * @return Node
              *    The node at the indexth position in the NodeList, or null if that is not a valid index.
              */
  item: function item(index) {
    return this[index] || null;
  },
  toString: function toString() {
    for (var buf = [], i = 0; i < this.length; i++) {
      serializeToString(this[i], buf);
    }
    return buf.join('');
  } };

function LiveNodeList(node, refresh) {
  this._node = node;
  this._refresh = refresh;
  _updateLiveList(this);
}
function _updateLiveList(list) {
  var inc = list._node._inc || list._node.ownerDocument._inc;
  if (list._inc != inc) {
    var ls = list._refresh(list._node);
    //console.log(ls.length)
    __set__(list, 'length', ls.length);
    copy(ls, list);
    list._inc = inc;
  }
}
LiveNodeList.prototype.item = function (i) {
  _updateLiveList(this);
  return this[i];
};

_extends(LiveNodeList, NodeList);
/**
                                   *
                                   * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
                                   * NamedNodeMap objects in the DOM are live.
                                   * used for attributes or DocumentType entities
                                   */
function NamedNodeMap() {
};

function _findNodeIndex(list, node) {
  var i = list.length;
  while (i--) {
    if (list[i] === node) {
      return i;
    }
  }
}

function _addNamedNode(el, list, newAttr, oldAttr) {
  if (oldAttr) {
    list[_findNodeIndex(list, oldAttr)] = newAttr;
  } else {
    list[list.length++] = newAttr;
  }
  if (el) {
    newAttr.ownerElement = el;
    var doc = el.ownerDocument;
    if (doc) {
      oldAttr && _onRemoveAttribute(doc, el, oldAttr);
      _onAddAttribute(doc, el, newAttr);
    }
  }
}
function _removeNamedNode(el, list, attr) {
  var i = _findNodeIndex(list, attr);
  if (i >= 0) {
    var lastIndex = list.length - 1;
    while (i < lastIndex) {
      list[i] = list[++i];
    }
    list.length = lastIndex;
    if (el) {
      var doc = el.ownerDocument;
      if (doc) {
        _onRemoveAttribute(doc, el, attr);
        attr.ownerElement = null;
      }
    }
  } else {
    throw DOMException(NOT_FOUND_ERR, new Error());
  }
}
NamedNodeMap.prototype = {
  length: 0,
  item: NodeList.prototype.item,
  getNamedItem: function getNamedItem(key) {
    //		if(key.indexOf(':')>0 || key == 'xmlns'){
    //			return null;
    //		}
    var i = this.length;
    while (i--) {
      var attr = this[i];
      if (attr.nodeName == key) {
        return attr;
      }
    }
  },
  setNamedItem: function setNamedItem(attr) {
    var el = attr.ownerElement;
    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR);
    }
    var oldAttr = this.getNamedItem(attr.nodeName);
    _addNamedNode(this._ownerElement, this, attr, oldAttr);
    return oldAttr;
  },
  /* returns Node */
  setNamedItemNS: function setNamedItemNS(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
    var el = attr.ownerElement,oldAttr;
    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR);
    }
    oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
    _addNamedNode(this._ownerElement, this, attr, oldAttr);
    return oldAttr;
  },

  /* returns Node */
  removeNamedItem: function removeNamedItem(key) {
    var attr = this.getNamedItem(key);
    _removeNamedNode(this._ownerElement, this, attr);
    return attr;


  }, // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR

  //for level2
  removeNamedItemNS: function removeNamedItemNS(namespaceURI, localName) {
    var attr = this.getNamedItemNS(namespaceURI, localName);
    _removeNamedNode(this._ownerElement, this, attr);
    return attr;
  },
  getNamedItemNS: function getNamedItemNS(namespaceURI, localName) {
    var i = this.length;
    while (i--) {
      var node = this[i];
      if (node.localName == localName && node.namespaceURI == namespaceURI) {
        return node;
      }
    }
    return null;
  } };

/**
        * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
        */
function DOMImplementation( /* Object */features) {
  this._features = {};
  if (features) {
    for (var feature in features) {
      this._features = features[feature];
    }
  }
};

DOMImplementation.prototype = {
  hasFeature: function hasFeature( /* string */feature, /* string */version) {
    var versions = this._features[feature.toLowerCase()];
    if (versions && (!version || version in versions)) {
      return true;
    } else {
      return false;
    }
  },
  // Introduced in DOM Level 2:
  createDocument: function createDocument(namespaceURI, qualifiedName, doctype) {// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
    var doc = new Document();
    doc.implementation = this;
    doc.childNodes = new NodeList();
    doc.doctype = doctype;
    if (doctype) {
      doc.appendChild(doctype);
    }
    if (qualifiedName) {
      var root = doc.createElementNS(namespaceURI, qualifiedName);
      doc.appendChild(root);
    }
    return doc;
  },
  // Introduced in DOM Level 2:
  createDocumentType: function createDocumentType(qualifiedName, publicId, systemId) {// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
    var node = new DocumentType();
    node.name = qualifiedName;
    node.nodeName = qualifiedName;
    node.publicId = publicId;
    node.systemId = systemId;
    // Introduced in DOM Level 2:
    //readonly attribute DOMString        internalSubset;

    //TODO:..
    //  readonly attribute NamedNodeMap     entities;
    //  readonly attribute NamedNodeMap     notations;
    return node;
  } };



/**
        * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
        */

function Node() {
};

Node.prototype = {
  firstChild: null,
  lastChild: null,
  previousSibling: null,
  nextSibling: null,
  attributes: null,
  parentNode: null,
  childNodes: null,
  ownerDocument: null,
  nodeValue: null,
  namespaceURI: null,
  prefix: null,
  localName: null,
  // Modified in DOM Level 2:
  insertBefore: function insertBefore(newChild, refChild) {//raises
    return _insertBefore(this, newChild, refChild);
  },
  replaceChild: function replaceChild(newChild, oldChild) {//raises
    this.insertBefore(newChild, oldChild);
    if (oldChild) {
      this.removeChild(oldChild);
    }
  },
  removeChild: function removeChild(oldChild) {
    return _removeChild(this, oldChild);
  },
  appendChild: function appendChild(newChild) {
    return this.insertBefore(newChild, null);
  },
  hasChildNodes: function hasChildNodes() {
    return this.firstChild != null;
  },
  cloneNode: function cloneNode(deep) {
    return _cloneNode(this.ownerDocument || this, this, deep);
  },
  // Modified in DOM Level 2:
  normalize: function normalize() {
    var child = this.firstChild;
    while (child) {
      var next = child.nextSibling;
      if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
        this.removeChild(next);
        child.appendData(next.data);
      } else {
        child.normalize();
        child = next;
      }
    }
  },
  // Introduced in DOM Level 2:
  isSupported: function isSupported(feature, version) {
    return this.ownerDocument.implementation.hasFeature(feature, version);
  },
  // Introduced in DOM Level 2:
  hasAttributes: function hasAttributes() {
    return this.attributes.length > 0;
  },
  lookupPrefix: function lookupPrefix(namespaceURI) {
    var el = this;
    while (el) {
      var map = el._nsMap;
      //console.dir(map)
      if (map) {
        for (var n in map) {
          if (map[n] == namespaceURI) {
            return n;
          }
        }
      }
      el = el.nodeType == 2 ? el.ownerDocument : el.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  lookupNamespaceURI: function lookupNamespaceURI(prefix) {
    var el = this;
    while (el) {
      var map = el._nsMap;
      //console.dir(map)
      if (map) {
        if (prefix in map) {
          return map[prefix];
        }
      }
      el = el.nodeType == 2 ? el.ownerDocument : el.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  isDefaultNamespace: function isDefaultNamespace(namespaceURI) {
    var prefix = this.lookupPrefix(namespaceURI);
    return prefix == null;
  } };



function _xmlEncoder(c) {
  return c == '<' && '&lt;' ||
  c == '>' && '&gt;' ||
  c == '&' && '&amp;' ||
  c == '"' && '&quot;' ||
  '&#' + c.charCodeAt() + ';';
}


copy(NodeType, Node);
copy(NodeType, Node.prototype);

/**
                                 * @param callback return true for continue,false for break
                                 * @return boolean true: break visit;
                                 */
function _visitNode(node, callback) {
  if (callback(node)) {
    return true;
  }
  if (node = node.firstChild) {
    do {
      if (_visitNode(node, callback)) {
        return true;
      }
    } while (node = node.nextSibling);
  }
}


function Document() {
}
function _onAddAttribute(doc, el, newAttr) {
  doc && doc._inc++;
  var ns = newAttr.namespaceURI;
  if (ns == 'http://www.w3.org/2000/xmlns/') {
    //update namespace
    el._nsMap[newAttr.prefix ? newAttr.localName : ''] = newAttr.value;
  }
}
function _onRemoveAttribute(doc, el, newAttr, remove) {
  doc && doc._inc++;
  var ns = newAttr.namespaceURI;
  if (ns == 'http://www.w3.org/2000/xmlns/') {
    //update namespace
    delete el._nsMap[newAttr.prefix ? newAttr.localName : ''];
  }
}
function _onUpdateChild(doc, el, newChild) {
  if (doc && doc._inc) {
    doc._inc++;
    //update childNodes
    var cs = el.childNodes;
    if (newChild) {
      cs[cs.length++] = newChild;
    } else {
      //console.log(1)
      var child = el.firstChild;
      var i = 0;
      while (child) {
        cs[i++] = child;
        child = child.nextSibling;
      }
      cs.length = i;
    }
  }
}

/**
   * attributes;
   * children;
   *
   * writeable properties:
   * nodeValue,Attr:value,CharacterData:data
   * prefix
   */
function _removeChild(parentNode, child) {
  var previous = child.previousSibling;
  var next = child.nextSibling;
  if (previous) {
    previous.nextSibling = next;
  } else {
    parentNode.firstChild = next;
  }
  if (next) {
    next.previousSibling = previous;
  } else {
    parentNode.lastChild = previous;
  }
  _onUpdateChild(parentNode.ownerDocument, parentNode);
  return child;
}
/**
   * preformance key(refChild == null)
   */
function _insertBefore(parentNode, newChild, nextChild) {
  var cp = newChild.parentNode;
  if (cp) {
    cp.removeChild(newChild); //remove and update
  }
  if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
    var newFirst = newChild.firstChild;
    if (newFirst == null) {
      return newChild;
    }
    var newLast = newChild.lastChild;
  } else {
    newFirst = newLast = newChild;
  }
  var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

  newFirst.previousSibling = pre;
  newLast.nextSibling = nextChild;


  if (pre) {
    pre.nextSibling = newFirst;
  } else {
    parentNode.firstChild = newFirst;
  }
  if (nextChild == null) {
    parentNode.lastChild = newLast;
  } else {
    nextChild.previousSibling = newLast;
  }
  do {
    newFirst.parentNode = parentNode;
  } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
  _onUpdateChild(parentNode.ownerDocument || parentNode, parentNode);
  //console.log(parentNode.lastChild.nextSibling == null)
  if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
    newChild.firstChild = newChild.lastChild = null;
  }
  return newChild;
}
function _appendSingleChild(parentNode, newChild) {
  var cp = newChild.parentNode;
  if (cp) {
    var pre = parentNode.lastChild;
    cp.removeChild(newChild); //remove and update
    var pre = parentNode.lastChild;
  }
  var pre = parentNode.lastChild;
  newChild.parentNode = parentNode;
  newChild.previousSibling = pre;
  newChild.nextSibling = null;
  if (pre) {
    pre.nextSibling = newChild;
  } else {
    parentNode.firstChild = newChild;
  }
  parentNode.lastChild = newChild;
  _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
  return newChild;
  //console.log("__aa",parentNode.lastChild.nextSibling == null)
}
Document.prototype = {
  //implementation : null,
  nodeName: '#document',
  nodeType: DOCUMENT_NODE,
  doctype: null,
  documentElement: null,
  _inc: 1,

  insertBefore: function insertBefore(newChild, refChild) {//raises
    if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
      var child = newChild.firstChild;
      while (child) {
        var next = child.nextSibling;
        this.insertBefore(child, refChild);
        child = next;
      }
      return newChild;
    }
    if (this.documentElement == null && newChild.nodeType == 1) {
      this.documentElement = newChild;
    }

    return _insertBefore(this, newChild, refChild), newChild.ownerDocument = this, newChild;
  },
  removeChild: function removeChild(oldChild) {
    if (this.documentElement == oldChild) {
      this.documentElement = null;
    }
    return _removeChild(this, oldChild);
  },
  // Introduced in DOM Level 2:
  importNode: function importNode(importedNode, deep) {
    return _importNode(this, importedNode, deep);
  },
  // Introduced in DOM Level 2:
  getElementById: function getElementById(id) {
    var rtv = null;
    _visitNode(this.documentElement, function (node) {
      if (node.nodeType == 1) {
        if (node.getAttribute('id') == id) {
          rtv = node;
          return true;
        }
      }
    });
    return rtv;
  },

  //document factory method:
  createElement: function createElement(tagName) {
    var node = new Element();
    node.ownerDocument = this;
    node.nodeName = tagName;
    node.tagName = tagName;
    node.childNodes = new NodeList();
    var attrs = node.attributes = new NamedNodeMap();
    attrs._ownerElement = node;
    return node;
  },
  createDocumentFragment: function createDocumentFragment() {
    var node = new DocumentFragment();
    node.ownerDocument = this;
    node.childNodes = new NodeList();
    return node;
  },
  createTextNode: function createTextNode(data) {
    var node = new Text();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createComment: function createComment(data) {
    var node = new Comment();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createCDATASection: function createCDATASection(data) {
    var node = new CDATASection();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createProcessingInstruction: function createProcessingInstruction(target, data) {
    var node = new ProcessingInstruction();
    node.ownerDocument = this;
    node.tagName = node.target = target;
    node.nodeValue = node.data = data;
    return node;
  },
  createAttribute: function createAttribute(name) {
    var node = new Attr();
    node.ownerDocument = this;
    node.name = name;
    node.nodeName = name;
    node.localName = name;
    node.specified = true;
    return node;
  },
  createEntityReference: function createEntityReference(name) {
    var node = new EntityReference();
    node.ownerDocument = this;
    node.nodeName = name;
    return node;
  },
  // Introduced in DOM Level 2:
  createElementNS: function createElementNS(namespaceURI, qualifiedName) {
    var node = new Element();
    var pl = qualifiedName.split(':');
    var attrs = node.attributes = new NamedNodeMap();
    node.childNodes = new NodeList();
    node.ownerDocument = this;
    node.nodeName = qualifiedName;
    node.tagName = qualifiedName;
    node.namespaceURI = namespaceURI;
    if (pl.length == 2) {
      node.prefix = pl[0];
      node.localName = pl[1];
    } else {
      //el.prefix = null;
      node.localName = qualifiedName;
    }
    attrs._ownerElement = node;
    return node;
  },
  // Introduced in DOM Level 2:
  createAttributeNS: function createAttributeNS(namespaceURI, qualifiedName) {
    var node = new Attr();
    var pl = qualifiedName.split(':');
    node.ownerDocument = this;
    node.nodeName = qualifiedName;
    node.name = qualifiedName;
    node.namespaceURI = namespaceURI;
    node.specified = true;
    if (pl.length == 2) {
      node.prefix = pl[0];
      node.localName = pl[1];
    } else {
      //el.prefix = null;
      node.localName = qualifiedName;
    }
    return node;
  } };

_extends(Document, Node);


function Element() {
  this._nsMap = {};
};
Element.prototype = {
  nodeType: ELEMENT_NODE,
  hasAttribute: function hasAttribute(name) {
    return this.getAttributeNode(name) != null;
  },
  getAttribute: function getAttribute(name) {
    var attr = this.getAttributeNode(name);
    return attr && attr.value || '';
  },
  getAttributeNode: function getAttributeNode(name) {
    return this.attributes.getNamedItem(name);
  },
  setAttribute: function setAttribute(name, value) {
    var attr = this.ownerDocument.createAttribute(name);
    attr.value = attr.nodeValue = "" + value;
    this.setAttributeNode(attr);
  },
  removeAttribute: function removeAttribute(name) {
    var attr = this.getAttributeNode(name);
    attr && this.removeAttributeNode(attr);
  },

  //four real opeartion method
  appendChild: function appendChild(newChild) {
    if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return this.insertBefore(newChild, null);
    } else {
      return _appendSingleChild(this, newChild);
    }
  },
  setAttributeNode: function setAttributeNode(newAttr) {
    return this.attributes.setNamedItem(newAttr);
  },
  setAttributeNodeNS: function setAttributeNodeNS(newAttr) {
    return this.attributes.setNamedItemNS(newAttr);
  },
  removeAttributeNode: function removeAttributeNode(oldAttr) {
    return this.attributes.removeNamedItem(oldAttr.nodeName);
  },
  //get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS: function removeAttributeNS(namespaceURI, localName) {
    var old = this.getAttributeNodeNS(namespaceURI, localName);
    old && this.removeAttributeNode(old);
  },

  hasAttributeNS: function hasAttributeNS(namespaceURI, localName) {
    return this.getAttributeNodeNS(namespaceURI, localName) != null;
  },
  getAttributeNS: function getAttributeNS(namespaceURI, localName) {
    var attr = this.getAttributeNodeNS(namespaceURI, localName);
    return attr && attr.value || '';
  },
  setAttributeNS: function setAttributeNS(namespaceURI, qualifiedName, value) {
    var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
    attr.value = attr.nodeValue = "" + value;
    this.setAttributeNode(attr);
  },
  getAttributeNodeNS: function getAttributeNodeNS(namespaceURI, localName) {
    return this.attributes.getNamedItemNS(namespaceURI, localName);
  },

  getElementsByTagName: function getElementsByTagName(tagName) {
    return new LiveNodeList(this, function (base) {
      var ls = [];
      _visitNode(base, function (node) {
        if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)) {
          ls.push(node);
        }
      });
      return ls;
    });
  },
  getElementsByTagNameNS: function getElementsByTagNameNS(namespaceURI, localName) {
    return new LiveNodeList(this, function (base) {
      var ls = [];
      _visitNode(base, function (node) {
        if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)) {
          ls.push(node);
        }
      });
      return ls;
    });
  } };

Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;


_extends(Element, Node);
function Attr() {
};
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr, Node);


function CharacterData() {
};
CharacterData.prototype = {
  data: '',
  substringData: function substringData(offset, count) {
    return this.data.substring(offset, offset + count);
  },
  appendData: function appendData(text) {
    text = this.data + text;
    this.nodeValue = this.data = text;
    this.length = text.length;
  },
  insertData: function insertData(offset, text) {
    this.replaceData(offset, 0, text);

  },
  appendChild: function appendChild(newChild) {
    //if(!(newChild instanceof CharacterData)){
    throw new Error(ExceptionMessage[3]);
    //}
    return Node.prototype.appendChild.apply(this, arguments);
  },
  deleteData: function deleteData(offset, count) {
    this.replaceData(offset, count, "");
  },
  replaceData: function replaceData(offset, count, text) {
    var start = this.data.substring(0, offset);
    var end = this.data.substring(offset + count);
    text = start + text + end;
    this.nodeValue = this.data = text;
    this.length = text.length;
  } };

_extends(CharacterData, Node);
function Text() {
};
Text.prototype = {
  nodeName: "#text",
  nodeType: TEXT_NODE,
  splitText: function splitText(offset) {
    var text = this.data;
    var newText = text.substring(offset);
    text = text.substring(0, offset);
    this.data = this.nodeValue = text;
    this.length = text.length;
    var newNode = this.ownerDocument.createTextNode(newText);
    if (this.parentNode) {
      this.parentNode.insertBefore(newNode, this.nextSibling);
    }
    return newNode;
  } };

_extends(Text, CharacterData);
function Comment() {
};
Comment.prototype = {
  nodeName: "#comment",
  nodeType: COMMENT_NODE };

_extends(Comment, CharacterData);

function CDATASection() {
};
CDATASection.prototype = {
  nodeName: "#cdata-section",
  nodeType: CDATA_SECTION_NODE };

_extends(CDATASection, CharacterData);


function DocumentType() {
};
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType, Node);

function Notation() {
};
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation, Node);

function Entity() {
};
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity, Node);

function EntityReference() {
};
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference, Node);

function DocumentFragment() {
};
DocumentFragment.prototype.nodeName = "#document-fragment";
DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment, Node);


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction, Node);
function XMLSerializer() {
}
XMLSerializer.prototype.serializeToString = function (node, attributeSorter) {
  return node.toString(attributeSorter);
};
Node.prototype.toString = function (attributeSorter) {
  var buf = [];
  serializeToString(this, buf, attributeSorter);
  return buf.join('');
};
function serializeToString(node, buf, attributeSorter, isHTML) {
  switch (node.nodeType) {
    case ELEMENT_NODE:
      var attrs = node.attributes;
      var len = attrs.length;
      var child = node.firstChild;
      var nodeName = node.tagName;
      isHTML = htmlns === node.namespaceURI || isHTML;
      buf.push('<', nodeName);
      if (attributeSorter) {
        buf.sort.apply(attrs, attributeSorter);
      }
      for (var i = 0; i < len; i++) {
        serializeToString(attrs.item(i), buf, attributeSorter, isHTML);
      }
      if (child || isHTML && !/^(?:meta|link|img|br|hr|input|button)$/i.test(nodeName)) {
        buf.push('>');
        //if is cdata child node
        if (isHTML && /^script$/i.test(nodeName)) {
          if (child) {
            buf.push(child.data);
          }
        } else {
          while (child) {
            serializeToString(child, buf, attributeSorter, isHTML);
            child = child.nextSibling;
          }
        }
        buf.push('</', nodeName, '>');
      } else {
        buf.push('/>');
      }
      return;
    case DOCUMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      var child = node.firstChild;
      while (child) {
        serializeToString(child, buf, attributeSorter, isHTML);
        child = child.nextSibling;
      }
      return;
    case ATTRIBUTE_NODE:
      return buf.push(' ', node.name, '="', node.value.replace(/[<&"]/g, _xmlEncoder), '"');
    case TEXT_NODE:
      return buf.push(node.data.replace(/[<&]/g, _xmlEncoder));
    case CDATA_SECTION_NODE:
      return buf.push('<![CDATA[', node.data, ']]>');
    case COMMENT_NODE:
      return buf.push("<!--", node.data, "-->");
    case DOCUMENT_TYPE_NODE:
      var pubid = node.publicId;
      var sysid = node.systemId;
      buf.push('<!DOCTYPE ', node.name);
      if (pubid) {
        buf.push(' PUBLIC "', pubid);
        if (sysid && sysid != '.') {
          buf.push('" "', sysid);
        }
        buf.push('">');
      } else if (sysid && sysid != '.') {
        buf.push(' SYSTEM "', sysid, '">');
      } else {
        var sub = node.internalSubset;
        if (sub) {
          buf.push(" [", sub, "]");
        }
        buf.push(">");
      }
      return;
    case PROCESSING_INSTRUCTION_NODE:
      return buf.push("<?", node.target, " ", node.data, "?>");
    case ENTITY_REFERENCE_NODE:
      return buf.push('&', node.nodeName, ';');
    //case ENTITY_NODE:
    //case NOTATION_NODE:
    default:
      buf.push('??', node.nodeName);}

}
function _importNode(doc, node, deep) {
  var node2;
  switch (node.nodeType) {
    case ELEMENT_NODE:
      node2 = node.cloneNode(false);
      node2.ownerDocument = doc;
    //var attrs = node2.attributes;
    //var len = attrs.length;
    //for(var i=0;i<len;i++){
    //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
    //}
    case DOCUMENT_FRAGMENT_NODE:
      break;
    case ATTRIBUTE_NODE:
      deep = true;
      break;
    //case ENTITY_REFERENCE_NODE:
    //case PROCESSING_INSTRUCTION_NODE:
    ////case TEXT_NODE:
    //case CDATA_SECTION_NODE:
    //case COMMENT_NODE:
    //	deep = false;
    //	break;
    //case DOCUMENT_NODE:
    //case DOCUMENT_TYPE_NODE:
    //cannot be imported.
    //case ENTITY_NODE:
    //case NOTATION_NODE：
    //can not hit in level3
    //default:throw e;
  }
  if (!node2) {
    node2 = node.cloneNode(false); //false
  }
  node2.ownerDocument = doc;
  node2.parentNode = null;
  if (deep) {
    var child = node.firstChild;
    while (child) {
      node2.appendChild(_importNode(doc, child, deep));
      child = child.nextSibling;
    }
  }
  return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function _cloneNode(doc, node, deep) {
  var node2 = new node.constructor();
  for (var n in node) {
    var v = node[n];
    if (typeof v != 'object') {
      if (v != node2[n]) {
        node2[n] = v;
      }
    }
  }
  if (node.childNodes) {
    node2.childNodes = new NodeList();
  }
  node2.ownerDocument = doc;
  switch (node2.nodeType) {
    case ELEMENT_NODE:
      var attrs = node.attributes;
      var attrs2 = node2.attributes = new NamedNodeMap();
      var len = attrs.length;
      attrs2._ownerElement = node2;
      for (var i = 0; i < len; i++) {
        node2.setAttributeNode(_cloneNode(doc, attrs.item(i), true));
      }
      break;
      ;
    case ATTRIBUTE_NODE:
      deep = true;}

  if (deep) {
    var child = node.firstChild;
    while (child) {
      node2.appendChild(_cloneNode(doc, child, deep));
      child = child.nextSibling;
    }
  }
  return node2;
}

function __set__(object, key, value) {
  object[key] = value;
}
//do dynamic
try {
  if (Object.defineProperty) {var






























    getTextContent = function getTextContent(node) {
      switch (node.nodeType) {
        case 1:
        case 11:
          var buf = [];
          node = node.firstChild;
          while (node) {
            if (node.nodeType !== 7 && node.nodeType !== 8) {
              buf.push(getTextContent(node));
            }
            node = node.nextSibling;
          }
          return buf.join('');
        default:
          return node.nodeValue;}

    };Object.defineProperty(LiveNodeList.prototype, 'length', { get: function get() {_updateLiveList(this);return this.$$length;} });Object.defineProperty(Node.prototype, 'textContent', { get: function get() {return getTextContent(this);}, set: function set(data) {switch (this.nodeType) {case 1:case 11:while (this.firstChild) {this.removeChild(this.firstChild);}if (data || String(data)) {this.appendChild(this.ownerDocument.createTextNode(data));}break;default: //TODO:
            this.data = data;this.value = value;this.nodeValue = data;}} });
    __set__ = function __set__(object, key, value) {
      //console.log(value)
      object['$$' + key] = value;
    };
  }
} catch (e) {//ie8
}

if (true) {
  exports.DOMImplementation = DOMImplementation;
  exports.XMLSerializer = XMLSerializer;
}

/***/ }),

/***/ 1221:
/*!*******************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/components/uni-icons/icons.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ }),

/***/ 1257:
/*!*************************************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/comps/chat/inputbar/suit/audio/record_status.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  RecordDesc: {
    0: "长按开始录音",
    2: "向上滑动取消",
    3: "松开手取消" },

  RecordStatus: {
    SHOW: 0,
    HIDE: 1,
    HOLD: 2,
    SWIPE: 3,
    RELEASE: 4 } };

/***/ }),

/***/ 1272:
/*!**************************************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/comps/chat/msglist/type/audio/audioCtxFactory.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {// 每一个音频消息都有自己的 ctx。
// 可以有多个 ctx，每次播放都能知道是哪个 ctx 在调用，从而让其他的 ctx pause。
// 消息销毁，记得处理 ctx。
// 主要是同步跨 ctx 的操作，保证只有一个 ctx 播放
var allCtx = {};
var inUseCtx = null;
var allComm = {};
function proxier(ctx) {
  var __play__ = ctx.play;
  var __pause__ = ctx.pause;
  ctx.play = playProxier;
  ctx.pause = pauseProxier;
  function playProxier() {
    // 如果正在播放的不是自己，暂停
    if (inUseCtx && inUseCtx != this) {
      inUseCtx.pause();
    }
    __play__.call(this);
    inUseCtx = this;
  }
  function pauseProxier() {
    // 只有是自己才 pause
    if (inUseCtx == this) {
      __pause__.call(this);
    }
  }
}

module.exports = {
  getCtx: function getCtx(mid) {
    var returnCtx = allCtx[mid];
    if (!returnCtx) {
      returnCtx = uni.createInnerAudioContext();
      allCtx[mid] = returnCtx;
      proxier(returnCtx);
    }
    return returnCtx;
  },
  getAllCtx: function getAllCtx() {
    uni.setStorageSync("allCtx", JSON.stringify(Object.keys(allCtx)));
    return allCtx;
  },
  getCommponet: function getCommponet(mid, comm) {
    var curComm = allComm[mid];
    if (!curComm) {
      allComm[mid] = comm;
    }
    return allComm;
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 1273:
/*!*********************************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/comps/chat/msglist/type/audio/playStatus.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  PLAYING: "playing",
  PAUSE: "pause",
  STOP: "stop" };

/***/ }),

/***/ 13:
/*!**************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/comps/chat/msgstorage.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var Disp = __webpack_require__(/*! ../../utils/Dispatcher */ 14);
var msgPackager = __webpack_require__(/*! ./msgpackager */ 15);
var msgType = __webpack_require__(/*! ./msgtype */ 23);
var msgStorage = new Disp();
var disp = __webpack_require__(/*! ../../utils/broadcast */ 24);
msgStorage.saveReceiveMsg = function (receiveMsg, type) {
  var sendableMsg;
  if (type == msgType.IMAGE) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      body: {
        id: receiveMsg.id,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: receiveMsg.type,
        toJid: "",
        body: {
          type: type,
          url: receiveMsg.url,
          filename: receiveMsg.filename,
          filetype: receiveMsg.filetype,
          size: {
            width: receiveMsg.width,
            height: receiveMsg.height } } } };




  } else
  if (type == msgType.TEXT || type == msgType.EMOJI) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      body: {
        id: receiveMsg.id,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: receiveMsg.type,
        toJid: "",
        body: {
          type: type,
          msg: receiveMsg.data } },


      value: receiveMsg.data };

  } else
  if (type == msgType.FILE) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      body: {
        id: receiveMsg.id,
        length: receiveMsg.file_length,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: receiveMsg.type,
        toJid: "",
        body: {
          type: type,
          url: receiveMsg.url,
          filename: receiveMsg.filename,
          msg: "当前不支持此格式消息展示" } },


      value: receiveMsg.data };

  } else
  if (type == msgType.AUDIO) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      accessToken: receiveMsg.token || receiveMsg.accessToken,
      body: {
        id: receiveMsg.id,
        length: receiveMsg.length,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: type,
        toJid: "",
        body: {
          type: type,
          url: receiveMsg.url,
          filename: receiveMsg.filename,
          filetype: receiveMsg.filetype,
          from: receiveMsg.from,
          to: receiveMsg.to } } };



  } else
  {
    return;
  }
  this.saveMsg(sendableMsg, type, receiveMsg);
};
msgStorage.saveMsg = function (sendableMsg, type, receiveMsg) {
  //console.log('sendableMsgsendableMsg', sendableMsg)
  var me = this;
  var myName = uni.getStorageSync("myUsername");
  var sessionKey;
  // 仅用作群聊收消息，发消息没有 receiveMsg
  if (receiveMsg && receiveMsg.type == "groupchat") {
    sessionKey = receiveMsg.to + myName;
  }
  // 群聊发 & 单发 & 单收
  else {
      sessionKey = sendableMsg.body.from == myName ?
      sendableMsg.body.to + myName :
      sendableMsg.body.from + myName;
    }
  var curChatMsg = uni.getStorageSync(sessionKey) || [];
  var renderableMsg = msgPackager(sendableMsg, type, myName);
  if (type == msgType.AUDIO) {
    renderableMsg.msg.length = sendableMsg.body.length;
    renderableMsg.msg.token = sendableMsg.accessToken;
  }
  curChatMsg.push(renderableMsg);
  //console.log('renderableMsgrenderableMsg', renderableMsg)
  if (type == msgType.AUDIO) {
    renderableMsg.msg.token = sendableMsg.accessToken;

  }
  console.log("curChatMsg", curChatMsg);

  save();
  function save() {
    uni.setStorage({
      key: sessionKey,
      data: curChatMsg,
      success: function success() {
        if (type == msgType.AUDIO || type == msgType.VIDEO) {
          disp.fire('em.chat.audio.fileLoaded');
        }
        me.fire("newChatMsg", renderableMsg, type, curChatMsg, sessionKey);
      } });

  }
};

module.exports = msgStorage;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 135:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 136);

/***/ }),

/***/ 136:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 137);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 137:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 14:
/*!*********************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/utils/Dispatcher.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var dispCbs = [];
var dispIns = [];

function Dispatcher() {
  dispIns.push(this);
  dispCbs.push({});
}
Dispatcher.prototype = {
  on: function on(type, cb) {
    var cbtypes = dispCbs[dispIns.indexOf(this)];
    var cbs = cbtypes[type] = cbtypes[type] || [];
    if (!~cbs.indexOf(cb)) {
      cbs.push(cb);
    }
  },
  off: function off(type, cb) {
    var cbtypes = dispCbs[dispIns.indexOf(this)];
    var cbs = cbtypes[type] = cbtypes[type] || [];
    var curTypeCbIdx = cbs.indexOf(cb);
    if (~curTypeCbIdx) {
      cbs.splice(curTypeCbIdx, 1);
    }
  },
  fire: function fire(type) {
    var cbtypes = dispCbs[dispIns.indexOf(this)];
    var cbs = cbtypes[type] = cbtypes[type] || [];for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {args[_key - 1] = arguments[_key];}
    for (var i = 0; i < cbs.length; i++) {
      cbs[i].apply(null, args);
    }
  } };

module.exports = Dispatcher;

/***/ }),

/***/ 15:
/*!***************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/comps/chat/msgpackager.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var WebIM = __webpack_require__(/*! ../../utils/WebIM */ 16)["default"];
var msgType = __webpack_require__(/*! ./msgtype */ 23);

module.exports = function (sendableMsg, type, myName) {
  var time = WebIM.time();
  var renderableMsg = {
    info: {
      from: sendableMsg.body.from,
      to: sendableMsg.body.to },

    username: sendableMsg.body.from == myName ? sendableMsg.body.to : sendableMsg.body.from,
    yourname: sendableMsg.body.from,
    msg: {
      type: type,
      url: sendableMsg.body.body.url,
      data: getMsgData(sendableMsg, type) },

    style: sendableMsg.body.from == myName ? "self" : "",
    time: time,
    mid: sendableMsg.type + sendableMsg.id,
    chatType: sendableMsg.body.chatType };

  if (type == msgType.IMAGE) {
    renderableMsg.msg.size = {
      width: sendableMsg.body.body.size.width,
      height: sendableMsg.body.body.size.height };

  } else if (type == msgType.AUDIO) {
    renderableMsg.msg.length = sendableMsg.body.length;
  } else if (type == msgType.FILE) {
    renderableMsg.msg.data = [{ data: "[当前不支持此格式消息展示]", type: "txt" }];
    renderableMsg.msg.type = 'txt';
  }
  return renderableMsg;

  function getMsgData(sendableMsg, type) {
    if (type == msgType.TEXT) {
      return WebIM.parseEmoji(sendableMsg.value.replace(/\n/mg, ""));
    } else
    if (type == msgType.EMOJI) {
      return sendableMsg.value;
    } else
    if (type == msgType.IMAGE || type == msgType.VIDEO || type == msgType.AUDIO) {
      return sendableMsg.body.body.url;
    } else if (type == msgType.FILE) {
      return sendableMsg.body.body.msg;
    }
    return "";
  }
};

/***/ }),

/***/ 16:
/*!****************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/utils/WebIM.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _strophe = _interopRequireDefault(__webpack_require__(/*! ../sdk/libs/strophe */ 9));

var _connection = _interopRequireDefault(__webpack_require__(/*! ../sdk/connection */ 17));
var _WebIMConfig = _interopRequireDefault(__webpack_require__(/*! ./WebIMConfig */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //import xmldom from "../sdk/libs/xmldom/dom-parser";

console.group = console.group || {};
console.groupEnd = console.groupEnd || {};

var window = {};
var WebIM = window.WebIM = _connection.default;
window.WebIM.config = _WebIMConfig.default;
//var DOMParser = window.DOMParser = xmldom.DOMParser;
//let document = window.document = new DOMParser().parseFromString("<?xml version='1.0'?>\n", "text/xml");

WebIM.isDebug = function (option) {
  if (option) {
    WebIM.config.isDebug = option.isDebug;
    openDebug(WebIM.config.isDebug);
  }

  function openDebug(value) {
    function ts() {
      var d = new Date();
      var Hours = d.getHours(); // 获取当前小时数(0-23)
      var Minutes = d.getMinutes(); // 获取当前分钟数(0-59)
      var Seconds = d.getSeconds(); // 获取当前秒数(0-59)
      return (Hours < 10 ? "0" + Hours : Hours) + ":" + (Minutes < 10 ? "0" + Minutes : Minutes) + ":" + (Seconds < 10 ? "0" + Seconds : Seconds) + " ";
    }

    _strophe.default.Strophe.log = function (level, msg) {
      // console.log(ts(), level, msg);
    };

    if (value) {
      _strophe.default.Strophe.Connection.prototype.rawOutput = function (data) {
        try {
          // console.group("%csend # " + ts(), "color: blue; font-size: large");//这函数在app端不能用
          console.log("%c" + data, "color: blue");
          // console.groupEnd();
        }
        catch (e) {
          console.log(e);
        }
      };
    } else {
      _strophe.default.Strophe.Connection.prototype.rawOutput = function () {};
    }

  }
};

/**
    * Set autoSignIn as true (autoSignInName and autoSignInPwd are configured below),
    * You can auto signed in each time when you refresh the page in dev model.
    */
WebIM.config.autoSignIn = false;
if (WebIM.config.autoSignIn) {
  WebIM.config.autoSignInName = "lwz2";
  WebIM.config.autoSignInPwd = "1";
}


// var stropheConn = new window.Strophe.Connection("ws://im-api.easemob.com/ws/", {
//                 inactivity: 30,
//                 maxRetries: 5,
//                 pollingTime: 4500
//             });
//
// stropheConn.connect(
//   '$t$' + 'YWMtmbQEBKKIEeaGmMtXyg5n1wAAAVlkQvGO2WOJGlMCEJKM4VV9GCMnb_XLCXU',
//   function() {
//     console.log(arguments, 'ggogogo');
//   }, stropheConn.wait, stropheConn.hold);
WebIM.parseEmoji = function (msg) {
  if (typeof WebIM.Emoji === "undefined" || typeof WebIM.Emoji.map === "undefined") {
    return msg;
  }
  var emoji = WebIM.Emoji,
  reg = null;
  var msgList = [];
  var objList = [];
  for (var face in emoji.map) {
    if (emoji.map.hasOwnProperty(face)) {
      while (msg.indexOf(face) > -1) {
        msg = msg.replace(face, "^" + emoji.map[face] + "^");
      }
    }
  }
  var ary = msg.split("^");
  var reg = /^e.*g$/;
  for (var i = 0; i < ary.length; i++) {
    if (ary[i] != "") {
      msgList.push(ary[i]);
    }
  }
  for (var i = 0; i < msgList.length; i++) {
    if (reg.test(msgList[i])) {
      var obj = {};
      obj.data = msgList[i];
      obj.type = "emoji";
      objList.push(obj);
    } else
    {
      var obj = {};
      obj.data = msgList[i];
      obj.type = "txt";
      objList.push(obj);
    }
  }
  return objList;
};

WebIM.time = function () {
  var date = new Date();
  var Hours = date.getHours();
  var Minutes = date.getMinutes();
  var Seconds = date.getSeconds();
  var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + (
  Hours < 10 ? "0" + Hours : Hours) + ":" + (Minutes < 10 ? "0" + Minutes : Minutes) + ":" + (Seconds < 10 ? "0" + Seconds : Seconds);
  return time;
};

WebIM.Emoji = {
  path: "../../../../../images/faces/",
  map: {
    "[):]": "ee_1.png",
    "[:D]": "ee_2.png",
    "[;)]": "ee_3.png",
    "[:-o]": "ee_4.png",
    "[:p]": "ee_5.png",
    "[(H)]": "ee_6.png",
    "[:@]": "ee_7.png",
    "[:s]": "ee_8.png",
    "[:$]": "ee_9.png",
    "[:(]": "ee_10.png",
    "[:'(]": "ee_11.png",
    "[<o)]": "ee_12.png",
    "[(a)]": "ee_13.png",
    "[8o|]": "ee_14.png",
    "[8-|]": "ee_15.png",
    "[+o(]": "ee_16.png",
    "[|-)]": "ee_17.png",
    "[:|]": "ee_18.png",
    "[*-)]": "ee_19.png",
    "[:-#]": "ee_20.png",
    "[^o)]": "ee_21.png",
    "[:-*]": "ee_22.png",
    "[8-)]": "ee_23.png",
    "[del]": "btn_del.png",
    "[(|)]": "ee_24.png",
    "[(u)]": "ee_25.png",
    "[(S)]": "ee_26.png",
    "[(*)]": "ee_27.png",
    "[(#)]": "ee_28.png",
    "[(R)]": "ee_29.png",
    "[({)]": "ee_30.png",
    "[(})]": "ee_31.png",
    "[(k)]": "ee_32.png",
    "[(F)]": "ee_33.png",
    "[(W)]": "ee_34.png",
    "[(D)]": "ee_35.png" } };



WebIM.EmojiObj = {
  // 相对 emoji.js 路径
  path: "/static/images/faces/",
  map1: {
    "[):]": "ee_1.png",
    "[:D]": "ee_2.png",
    "[;)]": "ee_3.png",
    "[:-o]": "ee_4.png",
    "[:p]": "ee_5.png",
    "[(H)]": "ee_6.png",
    "[:@]": "ee_7.png" },

  map2: {
    "[:s]": "ee_8.png",
    "[:$]": "ee_9.png",
    "[:(]": "ee_10.png",
    "[:'(]": "ee_11.png",
    "[<o)]": "ee_12.png",
    "[(a)]": "ee_13.png",
    "[8o|]": "ee_14.png" },

  map3: {
    "[8-|]": "ee_15.png",
    "[+o(]": "ee_16.png",
    "[|-)]": "ee_17.png",
    "[:|]": "ee_18.png",
    "[*-)]": "ee_19.png",
    "[:-#]": "ee_20.png",
    "[del]": "del.png" },

  map4: {
    "[^o)]": "ee_21.png",
    "[:-*]": "ee_22.png",
    "[8-)]": "ee_23.png",
    "[(|)]": "ee_24.png",
    "[(u)]": "ee_25.png",
    "[(S)]": "ee_26.png",
    "[(*)]": "ee_27.png" },

  map5: {
    "[(#)]": "ee_28.png",
    "[(R)]": "ee_29.png",
    "[({)]": "ee_30.png",
    "[(})]": "ee_31.png",
    "[(k)]": "ee_32.png",
    "[(F)]": "ee_33.png",
    "[(W)]": "ee_34.png",
    "[(D)]": "ee_35.png" },

  map6: {
    "[del]": "del.png" } };



// wx.connectSocket({url: WebIM.config.xmppURL, method: "GET"})

WebIM.conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: typeof WebIM.config.https === "boolean" ? WebIM.config.https : location.protocol === "https:",
  url: WebIM.config.xmppURL,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: false,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval });


// async response
// WebIM.conn.listen({
//   onOpened: () => dispatch({type: Types.ON_OPEND})
// })

// export default WebIM;
module.exports = {
  "default": WebIM };

/***/ }),

/***/ 17:
/*!*******************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/sdk/connection.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _strophe = _interopRequireDefault(__webpack_require__(/*! ./libs/strophe */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var WebIM = {};
var Strophe = _strophe.default.Strophe;

Strophe.log = function (level, msg) {
  // console.log(ts(), level, msg);
};
var xmldom = __webpack_require__(/*! ./libs/xmldom/dom-parser */ 10);
// //console.log('xml',xmldom, typeof xmldom.DOMParser);
var DOMParser = xmldom.DOMParser;
var window = {};
var _version = "1.1.3";
var _code = __webpack_require__(/*! ./status */ 18).code;
var _utils = __webpack_require__(/*! ./utils */ 19).utils;
var _msg = __webpack_require__(/*! ./message */ 20);
var _message = _msg._msg;
var _msgHash = {};
var Queue = __webpack_require__(/*! ./queue */ 21).Queue;
var location = window.location || {
  protocol: "https:" };

window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

if (window.XDomainRequest) {
  XDomainRequest.prototype.oldsend = XDomainRequest.prototype.send;
  XDomainRequest.prototype.send = function () {
    XDomainRequest.prototype.oldsend.apply(this, arguments);
    this.readyState = 2;
  };
}

Strophe.Request.prototype._newXHR = function () {
  var xhr = _utils.xmlrequest(true);
  if (xhr.overrideMimeType) {
    xhr.overrideMimeType("text/xml");
  }
  // use Function.bind() to prepend ourselves as an argument
  xhr.onreadystatechange = this.func.bind(null, this);
  return xhr;
};

Strophe.Websocket.prototype._onSocketClose = function (e) {
  // if(e.code && e.code == 1000){
  //
  // }
  // else{
  // 	reOpenEntry();
  // }
};

/**
    *
    * Strophe.Websocket has a bug while logout:
    * 1.send: <presence xmlns='jabber:client' type='unavailable'/> is ok;
    * 2.send: <close xmlns='urn:ietf:params:xml:ns:xmpp-framing'/> will cause a problem,log as follows:
    * WebSocket connection to 'ws://im-api.easemob.com/ws/' failed: Data frame received after close_connect @ strophe.js:5292connect @ strophe.js:2491_login @ websdk-1.1.2.js:278suc @ websdk-1.1.2.js:636xhr.onreadystatechange @ websdk-1.1.2.js:2582
    * 3 "Websocket error [object Event]"
    * _changeConnectStatus
    * onError Object {type: 7, msg: "The WebSocket connection could not be established or was disconnected.", reconnect: true}
    *
    * this will trigger socket.onError, therefore _doDisconnect again.
    * Fix it by overide  _onMessage
    */
Strophe.Websocket.prototype._onMessage = function (message) {
  var elem, data;
  // WebIM && WebIM.config.isDebug && //console.log(WebIM.utils.ts() + 'recv:', message.data);
  try {
    if (WebIM && WebIM.config.isDebug) {
      console.group("%crecv # ", "color: green; font-size: large");
      console.log("%c" + message.data, "color: green");
      console.groupEnd();
    }
  } catch (e) {

  } // console.log('%crecv' + message.data, 'color: green');
  // check for closing stream
  // var close = '<close xmlns="urn:ietf:params:xml:ns:xmpp-framing" />';
  // if (message.data === close) {
  //     this._conn.rawInput(close);
  //     this._conn.xmlInput(message);
  //     if (!this._conn.disconnecting) {
  //         this._conn._doDisconnect();
  //     }
  //     return;
  //
  // send and receive close xml: <close xmlns='urn:ietf:params:xml:ns:xmpp-framing'/>
  // so we can't judge whether message.data equals close by === simply.
  // console.log('DOMParser connection')
  if (message.data.indexOf("<close ") === 0) {
    elem = new DOMParser().parseFromString(message.data, "text/xml").documentElement;
    var see_uri = elem.getAttribute("see-other-uri");
    if (see_uri) {
      this._conn._changeConnectStatus(Strophe.Status.REDIRECT, "Received see-other-uri, resetting connection");
      this._conn.reset();
      this._conn.service = see_uri;
      this._connect();
    } else {
      // if (!this._conn.disconnecting) {
      this._conn._doDisconnect("receive <close> from server");
      // }
    }
    return;
  } else if (message.data.search("<open ") === 0) {
    // This handles stream restarts
    elem = new DOMParser().parseFromString(message.data, "text/xml").documentElement;
    if (!this._handleStreamStart(elem)) {
      return;
    }
  } else {
    data = this._streamWrap(message.data);
    elem = new DOMParser().parseFromString(data, "text/xml").documentElement;
  }

  // console.log('DOMParser connection ed')
  if (this._check_streamerror(elem, Strophe.Status.ERROR)) {
    return;
  }

  // handle unavailable presence stanza before disconnecting
  if (this._conn.disconnecting &&
  elem.firstChild.nodeName === "presence" &&
  elem.firstChild.getAttribute("type") === "unavailable")
  {
    this._conn.xmlInput(elem);
    this._conn.rawInput(Strophe.serialize(elem));
    // if we are already disconnecting we will ignore the unavailable stanza and
    // wait for the </stream:stream> tag before we close the connection
    return;
  }
  this._conn._dataRecv(elem, message.data);
};


function _listenNetwork(onlineCallback, offlineCallback) {
  if (window.addEventListener) {
    window.addEventListener("online", onlineCallback);
    window.addEventListener("offline", offlineCallback);

  } else if (window.attachEvent) {
    if (document.body) {
      document.body.attachEvent("ononline", onlineCallback);
      document.body.attachEvent("onoffline", offlineCallback);
    } else {
      window.attachEvent("load", function () {
        document.body.attachEvent("ononline", onlineCallback);
        document.body.attachEvent("onoffline", offlineCallback);
      });
    }
  } else {
    /* var onlineTmp = window.ononline;
           var offlineTmp = window.onoffline;
           window.attachEvent('ononline', function () {
           try {
           typeof onlineTmp === 'function' && onlineTmp();
           } catch ( e ) {}
           onlineCallback();
           });
           window.attachEvent('onoffline', function () {
           try {
           typeof offlineTmp === 'function' && offlineTmp();
           } catch ( e ) {}
           offlineCallback();
           });*/
  }
}

function _parseRoom(result) {
  var rooms = [];
  var items = result.getElementsByTagName("item");
  if (items) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var roomJid = item.getAttribute("jid");
      var tmp = roomJid.split("@")[0];
      var room = {
        jid: roomJid,
        name: item.getAttribute("name"),
        roomId: tmp.split("_")[1] };

      rooms.push(room);
    }
  }
  return rooms;
}

function _parseRoomOccupants(result) {
  var occupants = [];
  var items = result.getElementsByTagName("item");
  if (items) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var room = {
        jid: item.getAttribute("jid"),
        name: item.getAttribute("name") };

      occupants.push(room);
    }
  }
  return occupants;
}

function _parseResponseMessage(msginfo) {
  var parseMsgData = {
    errorMsg: true,
    data: [] };

  // //console.log('msginfo', msginfo)
  var msgBodies = msginfo.getElementsByTagName("body");
  // //console.log('msginfo', msgBodies)
  if (msgBodies) {
    for (var i = 0; i < msgBodies.length; i++) {
      var msgBody = msgBodies[i];
      var childNodes = msgBody.childNodes;
      if (childNodes && childNodes.length > 0) {
        var childNode = msgBody.childNodes[0];
        if (childNode.nodeType == Strophe.ElementType.TEXT) {
          var jsondata = childNode.wholeText || childNode.nodeValue;
          jsondata = jsondata.replace("\n", "<br>");
          try {
            var data = JSON.parse(jsondata);
            parseMsgData.errorMsg = false;
            parseMsgData.data = [data];
          } catch (e) {}
        }
      }
    }
    var delayTags = msginfo.getElementsByTagName("delay");
    if (delayTags && delayTags.length > 0) {
      var delayTag = delayTags[0];
      var delayMsgTime = delayTag.getAttribute("stamp");
      if (delayMsgTime) {
        parseMsgData.delayTimeStamp = delayMsgTime;
      }
    }
  } else {
    var childrens = msginfo.childNodes;
    if (childrens && childrens.length > 0) {
      var child = msginfo.childNodes[0];
      if (child.nodeType == Strophe.ElementType.TEXT) {
        try {
          var _data = eval("(" + child.nodeValue + ")");
          parseMsgData.errorMsg = false;
          parseMsgData.data = [_data];
        } catch (e) {}
      }
    }
  }
  return parseMsgData;
}

function _parseNameFromJidFn(jid, domain) {
  var tempstr = jid;
  var findex = tempstr.indexOf("_");
  domain = domain || "";
  if (findex !== -1) {
    tempstr = tempstr.substring(findex + 1);
  }
  var atindex = tempstr.indexOf("@" + domain);
  if (atindex !== -1) {
    tempstr = tempstr.substring(0, atindex);
  }
  return tempstr;
}

function _parseFriend(queryTag, conn, from) {
  var rouster = [];
  var items = queryTag.getElementsByTagName("item");
  if (items) {var _loop = function _loop(
    i) {
      var groups = [];
      var item = items[i];
      var jid = item.getAttribute("jid");
      if (!jid) {
        return "continue";
      }
      var subscription = item.getAttribute("subscription");
      var friend = {
        subscription: subscription,
        jid: jid };

      var ask = item.getAttribute("ask");
      if (ask) {
        friend.ask = ask;
      }
      var name = item.getAttribute("name");
      if (name) {
        friend.name = name;
      } else {
        friend.name = _parseNameFromJidFn(jid);
      }
      Strophe.forEachChild(item, "group", function (group) {
        groups.push(Strophe.getText(group));
      });
      friend.groups = groups;
      rouster.push(friend);
      // B 同意之后 -> B 订阅 A
      if (conn && subscription == "from") {
        conn.subscribe({
          toJid: jid });

      }
      if (conn && subscription == "to") {
        conn.subscribed({
          toJid: jid });

      }};for (var i = 0; i < items.length; i++) {var _ret = _loop(i);if (_ret === "continue") continue;
    }
  }
  return rouster;
}

function _parseMessageType(msginfo) {
  var msgtype = "normal";
  var receiveinfo = msginfo.getElementsByTagName("received");
  if (receiveinfo && receiveinfo.length > 0 && receiveinfo[0].namespaceURI === "urn:xmpp:receipts") {
    msgtype = "received";
  } else {
    var inviteinfo = msginfo.getElementsByTagName("invite");
    if (inviteinfo && inviteinfo.length > 0) {
      msgtype = "invite";
    }
  }
  return msgtype;
}

function _handleMessageQueue(conn) {
  for (var i in _msgHash) {
    if (Object.hasOwnProperty.call(_msgHash, i)) {
      _msgHash[i].send(conn);
    }
  }
}

function _loginCallback(status, msg, conn) {
  var error;
  var conflict = msg === "conflict";
  if (status == Strophe.Status.CONNFAIL) {
    // client offline, ping/pong timeout, server quit, server offline
    error = {
      type: _code.WEBIM_CONNCTION_SERVER_CLOSE_ERROR, // 客户端网络离线
      msg: msg };

    conflict && (error.conflict = true);
    conn.onError(error);
  } else if (status == Strophe.Status.ATTACHED || status == Strophe.Status.CONNECTED) {
    conn.autoReconnectNumTotal = 0;
    // client should limit the speed of sending ack messages  up to 5/s
    conn.intervalId = setInterval(function () {
      conn.handelSendQueue();
    }, 200);
    var handleMessage = function handleMessage(msginfo) {
      var type = _parseMessageType(msginfo);
      if (type === "received") {
        conn.handleReceivedMessage(msginfo);
        return true;
      } else if (type === "invite") {
        conn.handleInviteMessage(msginfo);
        return true;
      }
      conn.handleMessage(msginfo);
      return true;
    };
    var handlePresence = function handlePresence(msginfo) {
      conn.handlePresence(msginfo);
      return true;
    };
    // let handlePing = function(msginfo){
    // 	conn.handlePing(msginfo);
    // 	return true;
    // };
    var handleIqRoster = function handleIqRoster(msginfo) {
      conn.handleIqRoster(msginfo);
      return true;
    };
    var handleIqPrivacy = function handleIqPrivacy(msginfo) {
      conn.handleIqPrivacy(msginfo);
      return true;
    };
    var handleIq = function handleIq(msginfo) {
      conn.handleIq(msginfo);
      return true;
    };
    conn.addHandler(handleMessage, null, "message", null, null, null);
    conn.addHandler(handlePresence, null, "presence", null, null, null);
    // conn.addHandler(handlePing, "urn:xmpp:ping", "iq", "get", null, null);
    conn.addHandler(handleIqRoster, "jabber:iq:roster", "iq", "set", null, null);
    conn.addHandler(handleIqPrivacy, "jabber:iq:privacy", "iq", "set", null, null);
    conn.addHandler(handleIq, null, "iq", null, null, null);

    conn.context.status = _code.STATUS_OPENED;

    var supportRecMessage = [
    _code.WEBIM_MESSAGE_REC_TEXT,
    _code.WEBIM_MESSAGE_REC_EMOJI];

    var supportSedMessage = [
    _code.WEBIM_MESSAGE_SED_TEXT];

    if (_utils.isCanDownLoadFile) {
      supportRecMessage.push(_code.WEBIM_MESSAGE_REC_PHOTO);
      supportRecMessage.push(_code.WEBIM_MESSAGE_REC_AUDIO_FILE);
    }
    if (_utils.isCanUploadFile) {
      supportSedMessage.push(_code.WEBIM_MESSAGE_REC_PHOTO);
      supportSedMessage.push(_code.WEBIM_MESSAGE_REC_AUDIO_FILE);
    }
    conn.notifyVersion();
    conn.retry && _handleMessageQueue(conn);
    conn.heartBeat();
    conn.isAutoLogin && conn.setPresence();
    conn.onOpened({
      canReceive: supportRecMessage,
      canSend: supportSedMessage,
      accessToken: conn.context.accessToken });

    conn.onSocketConnected();
  } else if (status == Strophe.Status.DISCONNECTING) {
    if (conn.isOpened()) {
      if (conn.autoReconnectNumTotal < conn.autoReconnectNumMax) {
        if (conn.autoReconnectNumTotal == 0) {conn.onReconnect();}
        conn.reconnect();
        return;
      } else if (conn.autoReconnectNumTotal == conn.autoReconnectNumMax) {
        console.log("Err 3");
        error = {
          type: _code.WEBIM_CONNCTION_DISCONNECTED };

        conn.onError(error);
        conn.context.status = _code.STATUS_CLOSED;
        conn.clear();
        conn.onClosed();
      }
      conn.stopHeartBeat();
      // error = {
      // 	type: _code.WEBIM_CONNCTION_SERVER_CLOSE_ERROR,
      // 	msg: msg
      // };
      // conflict && (error.conflict = true);
      // conn.onError(error);
    }
    conn.context.status = _code.STATUS_CLOSING;
  } else if (status == Strophe.Status.DISCONNECTED) {
    if (conn.isOpened()) {
      if (conn.autoReconnectNumTotal < conn.autoReconnectNumMax) {
        if (conn.autoReconnectNumTotal == 0) {conn.onReconnect();}
        conn.reconnect();
        return;
      } else if (conn.autoReconnectNumTotal == conn.autoReconnectNumMax) {
        conn.context.status = _code.STATUS_CLOSED;
        conn.clear();
        conn.onClosed();
        conn.stopHeartBeat();
      }
      console.log("Err 4");
      error = {
        type: _code.WEBIM_CONNCTION_DISCONNECTED };

      conn.onError(error);
    }
    conn.context.status = _code.STATUS_CLOSED;
  } else if (status == Strophe.Status.AUTHFAIL) {
    error = {
      type: _code.WEBIM_CONNCTION_AUTH_ERROR };

    conflict && (error.conflict = true);
    conn.onError(error);
    conn.clear();
    conn.stopHeartBeat();
    uni.closeSocket();
  } else if (status == Strophe.Status.ERROR) {
    conn.context.status = _code.STATUS_ERROR;
    error = {
      type: _code.WEBIM_CONNCTION_SERVER_ERROR };

    conflict && (error.conflict = true);
    conn.onError(error);
    conn.stopHeartBeat();
  }
}

function _login(options, conn) {
  var stropheConn = null;
  var accessToken = options.access_token || "";
  if (accessToken == "") {
    conn.onError({
      type: _code.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
      data: options });

    return;
  }
  conn.context.accessToken = options.access_token;
  conn.context.accessTokenExpires = options.expires_in;
  stropheConn = new Strophe.Connection(conn.url, {
    inactivity: conn.inactivity,
    maxRetries: conn.maxRetries,
    pollingTime: conn.pollingTime });

  conn.context.stropheConn = stropheConn;
  if (conn.route) {
    stropheConn.connect(conn.context.jid, "$t$" + accessToken, callback, conn.wait, conn.hold, conn.route);
  } else {
    stropheConn.connect(conn.context.jid, "$t$" + accessToken, callback, conn.wait, conn.hold);
  }

  function callback(status, msg) {
    console.log("connection stat change", status, msg);
    _loginCallback(status, msg, conn);
  }
}

function _getJid(options, conn) {
  var jid = options.toJid || "";
  if (jid === "") {
    var appKey = conn.context.appKey || "";
    var toJid = appKey + "_" + options.to + "@" + conn.domain;
    if (options.resource) {
      toJid = toJid + "/" + options.resource;
    }
    jid = toJid;
  }
  return jid;
}

function _getJidByName(name, conn) {
  return _getJid({
    to: name },
  conn);
}

function _validCheck(options, conn) {
  options = options || {};
  if (options.user == "") {
    conn.onError({
      type: _code.WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR });

    return false;
  }
  var user = options.user + "" || "";
  var appKey = options.appKey || "";
  var devInfos = appKey.split("#");

  if (devInfos.length !== 2) {
    conn.onError({
      type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

    return false;
  }
  var orgName = devInfos[0];
  var appName = devInfos[1];

  if (!orgName) {
    conn.onError({
      type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

    return false;
  }
  if (!appName) {
    conn.onError({
      type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

    return false;
  }

  var jid = appKey + "_" + user.toLowerCase() + "@" + conn.domain;
  var resource = options.resource || "webim";
  if (conn.isMultiLoginSessions) {
    resource += user + new Date().getTime() + Math.floor(Math.random().toFixed(6) * 1000000);
  }
  conn.context.jid = jid + "/" + resource;
  /* jid: {appkey}_{username}@domain/resource*/
  conn.context.userId = user;
  conn.context.appKey = appKey;
  conn.context.appName = appName;
  conn.context.orgName = orgName;

  return true;
}

function _getXmppUrl(baseUrl, https) {
  if (/^(ws|http)s?:\/\/?/.test(baseUrl)) {
    return baseUrl;
  }
  var url = {
    prefix: "http",
    base: "://" + baseUrl,
    suffix: "/http-bind/" };

  if (https && _utils.isSupportWss) {
    url.prefix = "wss";
    url.suffix = "/ws/";
  } else if (https) {
    url.prefix = "https";
  } else if (window.WebSocket) {
    url.prefix = "ws";
    url.suffix = "/ws/";
  }
  return url.prefix + url.base + url.suffix;
}





// CLASS
function connection(options) {
  if (!(this instanceof connection)) {
    return new connection(options);
  }
  options = options || {};
  this.isMultiLoginSessions = options.isMultiLoginSessions || false;
  this.wait = options.wait || 30;
  this.retry = options.retry || false;
  this.https = options.https || location.protocol === "https:";
  this.url = _getXmppUrl(options.url, this.https);
  this.hold = options.hold || 1;
  this.route = options.route || null;
  this.domain = options.domain || "easemob.com";
  this.inactivity = options.inactivity || 30;
  this.heartBeatWait = options.heartBeatWait || 4500;
  this.maxRetries = options.maxRetries || 5;
  this.isAutoLogin = options.isAutoLogin !== false;
  this.pollingTime = options.pollingTime || 800;
  this.stropheConn = false;
  this.autoReconnectNumMax = options.autoReconnectNumMax || 0;
  this.autoReconnectNumTotal = 0;
  this.autoReconnectInterval = options.autoReconnectInterval || 0;
  this.context = {
    status: _code.STATUS_INIT };

  this.apiUrl = options.apiUrl || "";
  // todo 接收的事件，放到数组里的时候，加上g.isInBackground字段。每帧执行一个事件的时候，如果g.isInBackground=true,就pass
  this.sendQueue = new Queue(); // 接收到的事件队列
  this.intervalId = null;
  this.orgName = "";
  this.appName = "";
  this.token = "";
}

connection.prototype.handelSendQueue = function () {
  var options = this.sendQueue.pop();
  if (options !== null) {
    this.sendReceiptsMessage(options);
  }
};
connection.prototype.listen = function (options) {
  options.url && (this.url = _getXmppUrl(options.url, this.https));
  this.onOpened = options.onOpened || _utils.emptyfn;
  this.onClosed = options.onClosed || _utils.emptyfn;
  this.onReconnect = options.onReconnect || _utils.emptyfn;
  this.onSocketConnected = options.onSocketConnected || _utils.emptyfn;
  this.onTextMessage = options.onTextMessage || _utils.emptyfn;
  this.onEmojiMessage = options.onEmojiMessage || _utils.emptyfn;
  this.onPictureMessage = options.onPictureMessage || _utils.emptyfn;
  this.onAudioMessage = options.onAudioMessage || _utils.emptyfn;
  this.onVideoMessage = options.onVideoMessage || _utils.emptyfn;
  this.onFileMessage = options.onFileMessage || _utils.emptyfn;
  this.onLocationMessage = options.onLocationMessage || _utils.emptyfn;
  this.onCmdMessage = options.onCmdMessage || _utils.emptyfn;
  this.onPresence = options.onPresence || _utils.emptyfn;
  this.onRoster = options.onRoster || _utils.emptyfn;
  this.onError = options.onError || _utils.emptyfn;
  this.onReceivedMessage = options.onReceivedMessage || _utils.emptyfn;
  this.onInviteMessage = options.onInviteMessage || _utils.emptyfn;
  this.onOffline = options.onOffline || _utils.emptyfn;
  this.onOnline = options.onOnline || _utils.emptyfn;
  this.onConfirmPop = options.onConfirmPop || _utils.emptyfn;
  this.onCreateGroup = options.onCreateGroup || _utils.emptyfn;
  // for WindowSDK
  this.onUpdateMyGroupList = options.onUpdateMyGroupList || _utils.emptyfn;
  this.onUpdateMyRoster = options.onUpdateMyRoster || _utils.emptyfn;
  //
  this.onBlacklistUpdate = options.onBlacklistUpdate || _utils.emptyfn;

  _listenNetwork(this.onOnline, this.onOffline);
};
connection.prototype.heartBeatID = 0;
connection.prototype.heartBeat = function () {
  var me = this;
  // // IE8: strophe auto switch from ws to BOSH, need heartbeat
  // var isNeed = !/^ws|wss/.test(me.url);
  // // || /mobile/.test(navigator.userAgent)
  // if(this.heartBeatID || !isNeed){
  // 	return;
  // }
  this.stopHeartBeat();
  this.heartBeatID = setInterval(function () {
    me.ping({
      toJid: me.domain,
      type: "normal" });

  }, this.heartBeatWait);
};
connection.prototype.stopHeartBeat = function () {
  clearInterval(this.heartBeatID);
};
connection.prototype.sendReceiptsMessage = function (options) {
  var dom = _strophe.default.$msg({
    from: this.context.jid || "",
    to: this.domain,
    id: options.id || "" }).
  c("received", {
    xmlns: "urn:xmpp:receipts",
    id: options.id || "" });

  this.sendCommand(dom.tree());
};
connection.prototype.cacheReceiptsMessage = function (options) {
  this.sendQueue.push(options);
};
connection.prototype.open = function (options) {
  var me = this;
  console.log("open", this.isOpening());
  // 防止重复初始化
  if (this.isOpening() || this.isOpened()) {
    console.log("can't open [1]");
    return;
  }
  if (!_validCheck(options, this)) {
    console.log("can't open [2]");
    return;
  }
  if (options.accessToken) {
    options.access_token = options.accessToken;
    this.token = options.access_token;
    _login(options, me);
  } else {

    var apiUrl = options.apiUrl;
    var userId = options.user;
    var pwd = options.pwd || "";
    var appkey = options.appKey;
    var str = appkey.split("#");
    var orgName = str[0];
    var appName = str[1];
    this.orgName = orgName;
    this.appName = appName;
    this.context.status = _code.STATUS_DOLOGIN_USERGRID;
    var loginJson = {
      grant_type: "password",
      username: userId,
      password: pwd,
      timestamp: +new Date() };

    var loginfo = _utils.stringify(loginJson);
    _utils.ajax({
      url: apiUrl + "/" + orgName + "/" + appName + "/token",
      data: loginfo,
      success: suc || _utils.emptyfn,
      error: error || _utils.emptyfn });

  }

  function suc(data, xhr, myName) {
    me.context.status = _code.STATUS_DOLOGIN_IM;
    me.context.restTokenData = data;
    if (data.statusCode != "404" && data.statusCode != "400") {
      // data:
      // 	access_token,
      // 	expires_in,
      // 	user:
      // 		activated,
      // 		created,
      // 		modified,
      // 		nickname,
      // 		type,
      // 		username,
      // 		uuid,
      _login(data.data, me);
    } else {
      error({});
    }
  }

  function error(res, xhr, msg) {
    me.clear();
    if (res.error && res.error_description) {
      me.onError({
        type: _code.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
        data: res,
        xhr: xhr });

    } else {
      me.onError({
        type: _code.WEBIM_CONNCTION_OPEN_ERROR,
        data: res,
        xhr: xhr });

    }
  }
  // reOpenEntry = function(){
  // 	me.open(options);
  // };
};
// attach to xmpp server for BOSH
connection.prototype.attach = function (options) {
  var me = this;
  var pass = _validCheck(options, this);
  if (!pass) {
    return;
  }
  options = options || {};
  var accessToken = options.accessToken || "";
  if (accessToken == "") {
    this.onError({
      type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR });

    return;
  }
  var sid = options.sid || "";
  if (sid === "") {
    this.onError({
      type: _code.WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR });

    return;
  }
  var rid = options.rid || "";
  if (rid === "") {
    this.onError({
      type: _code.WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR });

    return;
  }
  var stropheConn = new Strophe.Connection(this.url, {
    inactivity: this.inactivity,
    maxRetries: this.maxRetries,
    pollingTime: this.pollingTime,
    heartBeatWait: this.heartBeatWait });

  this.context.accessToken = accessToken;
  this.context.stropheConn = stropheConn;
  this.context.status = _code.STATUS_DOLOGIN_IM;
  var callback = function callback(status, msg) {
    _loginCallback(status, msg, me);
  };
  var jid = this.context.jid;
  var wait = this.wait;
  var hold = this.hold;
  var wind = this.wind || 5;
  stropheConn.attach(jid, sid, rid, callback, wait, hold, wind);
};
connection.prototype.close = function (reason) {
  this.stopHeartBeat();
  var status = this.context.status;
  if (status == _code.STATUS_INIT) {
    return;
  }
  if (this.isClosed() || this.isClosing()) {
    return;
  }
  this.context.status = _code.STATUS_CLOSING;
  this.context.stropheConn.disconnect(reason);
};
connection.prototype.addHandler = function (handler, ns, name, type, id, from, options) {
  this.context.stropheConn.addHandler(handler, ns, name, type, id, from, options);
};
connection.prototype.notifyVersion = function (suc, fail) {
  var dom = _strophe.default.$iq({
    from: this.context.jid || "",
    to: this.domain,
    type: "result" }).

  c("query", {
    xmlns: "jabber:iq:version" }).

  c("name").
  t("easemob").
  up().
  c("version").
  t(_version).
  up().
  c("os").
  t("webim");

  suc = suc || _utils.emptyfn;
  var error = fail || this.onError;
  var failFn = function failFn(ele) {
    error({
      type: _code.WEBIM_CONNCTION_NOTIFYVERSION_ERROR,
      data: ele });

  };
  this.context.stropheConn.sendIQ(dom.tree(), suc, failFn);
};
// handle all types of presence message
connection.prototype.handlePresence = function (msginfo) {
  if (this.isClosed()) {
    return;
  }
  var from = msginfo.getAttribute("from") || "";
  var to = msginfo.getAttribute("to") || "";
  var type = msginfo.getAttribute("type") || "";
  var presence_type = msginfo.getAttribute("presence_type") || "";
  var fromUser = _parseNameFromJidFn(from);
  var toUser = _parseNameFromJidFn(to);
  var isCreate = false;
  var isMemberJoin = false;
  var isDecline = false;
  var isApply = false;
  var info = {
    from: fromUser,
    to: toUser,
    fromJid: from,
    toJid: to,
    type: type,
    chatroom: !!msginfo.getElementsByTagName("roomtype").length };


  var showTags = msginfo.getElementsByTagName("show");
  if (showTags && showTags.length > 0) {
    var showTag = showTags[0];
    info.show = Strophe.getText(showTag);
  }
  var statusTags = msginfo.getElementsByTagName("status");
  if (statusTags && statusTags.length > 0) {
    var statusTag = statusTags[0];
    info.status = Strophe.getText(statusTag);
    info.code = statusTag.getAttribute("code");
  }
  var priorityTags = msginfo.getElementsByTagName("priority");
  if (priorityTags && priorityTags.length > 0) {
    var priorityTag = priorityTags[0];
    info.priority = Strophe.getText(priorityTag);
  }
  var error = msginfo.getElementsByTagName("error");
  if (error && error.length > 0) {
    error = error[0];
    info.error = {
      code: error.getAttribute("code") };

  }
  var destroy = msginfo.getElementsByTagName("destroy");
  if (destroy && destroy.length > 0) {
    destroy = destroy[0];
    info.destroy = true;
    var reason = destroy.getElementsByTagName("reason");
    if (reason && reason.length > 0) {
      info.reason = Strophe.getText(reason[0]);
    }
  }
  var members = msginfo.getElementsByTagName("item");
  if (members && members.length > 0) {
    var member = members[0];
    var role = member.getAttribute("role");
    var jid = member.getAttribute("jid");
    var affiliation = member.getAttribute("affiliation");
    // dismissed by group
    if (role == "none" && jid) {
      var kickedMember = _parseNameFromJidFn(jid);
      var actor = member.getElementsByTagName("actor")[0];
      var actorNick = actor.getAttribute("nick");
      info.actor = actorNick;
      info.kicked = kickedMember;
    }
    // Service Acknowledges Room Creation `createGroupACK`
    if (role == "moderator" && info.code == "201") {
      if (affiliation === "owner") {
        info.type = "createGroupACK";
        isCreate = true;
      }
      // else
      //     info.type = 'joinPublicGroupSuccess';
    }
  }
  var x = msginfo.getElementsByTagName("x");
  if (x && x.length > 0) {
    // 加群申请
    var apply = x[0].getElementsByTagName("apply");
    // 加群成功
    var accept = x[0].getElementsByTagName("accept");
    // 同意加群后用户进群通知
    var item = x[0].getElementsByTagName("item");
    // 加群被拒绝
    var decline = x[0].getElementsByTagName("decline");
    // 被设为管理员
    var addAdmin = x[0].getElementsByTagName("add_admin");
    // 被取消管理员
    var removeAdmin = x[0].getElementsByTagName("remove_admin");
    // 被禁言
    var addMute = x[0].getElementsByTagName("add_mute");
    // 取消禁言
    var removeMute = x[0].getElementsByTagName("remove_mute");
    if (apply && apply.length > 0) {
      isApply = true;
      info.toNick = apply[0].getAttribute("toNick");
      info.type = "joinGroupNotifications";
      var groupJid = apply[0].getAttribute("to");
      var gid = groupJid.split("@")[0].split("_");
      gid = gid[gid.length - 1];
      info.gid = gid;
    } else if (accept && accept.length > 0) {
      info.type = "joinPublicGroupSuccess";
    } else if (item && item.length > 0) {
      var _affiliation = item[0].getAttribute("affiliation");
      var _role = item[0].getAttribute("role");
      if (_affiliation == "member" || _role == "participant") {
        isMemberJoin = true;
        info.mid = info.fromJid.split("/");
        info.mid = info.mid[info.mid.length - 1];
        info.type = "memberJoinPublicGroupSuccess";
        var roomtype = msginfo.getElementsByTagName("roomtype");
        if (roomtype && roomtype.length > 0) {
          var _type = roomtype[0].getAttribute("type");
          if (_type == "chatroom") {
            info.type = "memberJoinChatRoomSuccess";
          }
        }
      } else if (_affiliation == "none" || _role == "none") {
        var _roomtype = msginfo.getElementsByTagName("roomtype");
        if (_roomtype && _roomtype.length > 0) {
          var _type2 = _roomtype[0].getAttribute("type");
          if (_type2 == "chatroom") {
            info.type = "memberLeaveChatRoomSuccess";
          }
        }
      }
    } else if (decline && decline.length) {
      isDecline = true;
      var _gid = decline[0].getAttribute("fromNick");
      var owner = _parseNameFromJidFn(decline[0].getAttribute("from"));
      info.type = "joinPublicGroupDeclined";
      info.owner = owner;
      info.gid = _gid;
    } else if (addAdmin && addAdmin.length > 0) {
      var _gid2 = _parseNameFromJidFn(addAdmin[0].getAttribute("mucjid"));
      var _owner = _parseNameFromJidFn(addAdmin[0].getAttribute("from"));
      info.owner = _owner;
      info.gid = _gid2;
      info.type = "addAdmin";
    } else if (removeAdmin && removeAdmin.length > 0) {
      var _gid3 = _parseNameFromJidFn(removeAdmin[0].getAttribute("mucjid"));
      var _owner2 = _parseNameFromJidFn(removeAdmin[0].getAttribute("from"));
      info.owner = _owner2;
      info.gid = _gid3;
      info.type = "removeAdmin";
    } else if (addMute && addMute.length > 0) {
      var _gid4 = _parseNameFromJidFn(addMute[0].getAttribute("mucjid"));
      var _owner3 = _parseNameFromJidFn(addMute[0].getAttribute("from"));
      info.owner = _owner3;
      info.gid = _gid4;
      info.type = "addMute";
    } else if (removeMute && removeMute.length > 0) {
      var _gid5 = _parseNameFromJidFn(removeMute[0].getAttribute("mucjid"));
      var _owner4 = _parseNameFromJidFn(removeMute[0].getAttribute("from"));
      info.owner = _owner4;
      info.gid = _gid5;
      info.type = "removeMute";
    }
  }
  if (info.chatroom) {
    info.presence_type = presence_type;
    info.original_type = info.type;
    var reflectUser = from.slice(from.lastIndexOf("/") + 1);
    if (reflectUser === this.context.userId) {
      if (info.type === "" && !info.code) {
        info.type = "joinChatRoomSuccess";
      } else if (presence_type === "unavailable" || info.type === "unavailable") {
        // logout successfully.
        if (!info.status) {
          info.type = "leaveChatRoom";
        }
        // logout or dismissied by admin
        else if (info.code == 110) {
            info.type = "leaveChatRoom";
          }
          // The chat room is full
          else if (info.error && info.error.code == 406) {
              info.type = "reachChatRoomCapacity";
            }
      }
    }
  } else {
    info.presence_type = presence_type;
    info.original_type = type;
    if (/subscribe/.test(info.type)) {
      // subscribe | subscribed | unsubscribe | unsubscribed
    } else if (type == "" &&
    !info.status &&
    !info.error &&
    !isCreate &&
    !isApply &&
    !isMemberJoin &&
    !isDecline)
    {

    } // info.type = 'joinPublicGroupSuccess';
    // There is no roomtype when a chat room is deleted.
    else if (presence_type === "unavailable" || type === "unavailable") {
        // Group or Chat room Deleted.
        if (info.destroy) {
          info.type = "deleteGroupChat";
        }
        // Dismissed by group.
        else if (info.code == 307 || info.code == 321) {
            var nick = msginfo.getAttribute("nick");
            if (!nick) {
              info.type = "leaveGroup";
            } else {
              info.type = "removedFromGroup";
            }
          }
      }
  }
  //自己加自己
  if (info.type == 'subscribe' && info.from == info.to) {
    return;
  }
  this.onPresence(info, msginfo);
};

// connection.prototype.handlePing = function(e){
// 	if(this.isClosed()){
// 		return;
// 	}
// 	let id = e.getAttribute("id");
// 	let from = e.getAttribute("from");
// 	let to = e.getAttribute("to");
// 	let dom = $iq({
// 		from: to, to: from, id: id, type: "result"
// 	});
// 	this.sendCommand(dom.tree());
// };

connection.prototype.handleIq = function (iq) {
  return true;
};
connection.prototype.handleIqPrivacy = function (msginfo) {
  var list = msginfo.getElementsByTagName("list");
  if (list.length == 0) {
    return;
  }
  this.getBlacklist();
};
connection.prototype.handleIqRoster = function (e) {
  var id = e.getAttribute("id");
  var from = e.getAttribute("from") || "";
  // var name = _parseNameFromJidFn(from);
  var curJid = this.context.jid;
  // var curUser = this.context.userId;
  var iqresult = _strophe.default.$iq({
    type: "result",
    id: id,
    from: curJid });

  this.sendCommand(iqresult.tree());
  var msgBodies = e.getElementsByTagName("query");
  if (msgBodies && msgBodies.length > 0) {
    var queryTag = msgBodies[0];
    var rouster = _parseFriend(queryTag, this, from);
    this.onRoster(rouster);
  }
  return true;
};
connection.prototype.handleMessage = function (msginfo) {
  if (this.isClosed()) {
    return;
  }
  var id = msginfo.getAttribute("id") || "";
  // cache ack into sendQueue first, handelSendQueue will do the send thing with the speed of 5/s
  this.cacheReceiptsMessage({
    id: id });

  // console.log('handlePresence', msginfo)
  var parseMsgData = _parseResponseMessage(msginfo);
  // console.log('parseMsgData', parseMsgData)
  if (parseMsgData.errorMsg) {
    this.handlePresence(msginfo);
    return;
  }
  // send error
  var error = msginfo.getElementsByTagName("error");
  var errorCode = "";
  var errorText = "";
  var errorBool = false;
  if (error.length > 0) {
    errorBool = true;
    errorCode = error[0].getAttribute("code");
    var textDOM = error[0].getElementsByTagName("text");
    errorText = textDOM[0].textContent || textDOM[0].text;
    // log("handle error", errorCode, errorText);
  }
  var msgDatas = parseMsgData.data;
  for (var i in msgDatas) {
    if (!Object.hasOwnProperty.call(msgDatas, i)) {
      continue;
    }
    var msg = msgDatas[i];
    if (!msg.from || !msg.to) {
      continue;
    }
    var from = (msg.from + "").toLowerCase();
    var too = (msg.to + "").toLowerCase();
    var extmsg = msg.ext || {};
    var chattype = "";
    var typeEl = msginfo.getElementsByTagName("roomtype");
    if (typeEl.length) {
      chattype = typeEl[0].getAttribute("type") || "chat";
    } else {
      chattype = msginfo.getAttribute("type") || "chat";
    }
    var msgBodies = msg.bodies;
    if (!msgBodies || msgBodies.length == 0) {
      continue;
    }
    var msgBody = msg.bodies[0];
    var type = msgBody.type;
    try {
      switch (type) {
        case "txt":
          var receiveMsg = msgBody.msg;
          var emojibody = _utils.parseTextMessage(receiveMsg, WebIM.Emoji);
          if (emojibody.isemoji) {
            var _msg3 = {
              id: id,
              type: chattype,
              from: from,
              to: too,
              delay: parseMsgData.delayTimeStamp,
              data: emojibody.body,
              ext: extmsg };

            !_msg3.delay && delete _msg3.delay;
            _msg3.error = errorBool;
            _msg3.errorText = errorText;
            _msg3.errorCode = errorCode;
            this.onEmojiMessage(_msg3);
          } else {
            var _msg4 = {
              id: id,
              type: chattype,
              from: from,
              to: too,
              delay: parseMsgData.delayTimeStamp,
              data: receiveMsg,
              ext: extmsg };

            !_msg4.delay && delete _msg4.delay;
            _msg4.error = errorBool;
            _msg4.errorText = errorText;
            _msg4.errorCode = errorCode;
            this.onTextMessage(_msg4);
          }
          break;
        case "img":
          var rwidth = 0;
          var rheight = 0;
          if (msgBody.size) {
            rwidth = msgBody.size.width;
            rheight = msgBody.size.height;
          }
          var _msg2 = {
            id: id,
            type: chattype,
            from: from,
            to: too,
            url: msgBody.url,
            secret: msgBody.secret,
            filename: msgBody.filename,
            thumb: msgBody.thumb,
            thumb_secret: msgBody.thumb_secret,
            file_length: msgBody.file_length || "",
            width: rwidth,
            height: rheight,
            filetype: msgBody.filetype || "",
            accessToken: this.context.accessToken || "",
            ext: extmsg,
            delay: parseMsgData.delayTimeStamp };

          !_msg2.delay && delete _msg2.delay;
          _msg2.error = errorBool;
          _msg2.errorText = errorText;
          _msg2.errorCode = errorCode;
          this.onPictureMessage(_msg2);
          break;
        case "audio":
          _msg2 = {
            id: id,
            type: chattype,
            from: from,
            to: too,
            url: msgBody.url,
            secret: msgBody.secret,
            filename: msgBody.filename,
            length: msgBody.length || "",
            file_length: msgBody.file_length || "",
            filetype: msgBody.filetype || "",
            accessToken: this.context.accessToken || "",
            ext: extmsg,
            delay: parseMsgData.delayTimeStamp };

          !_msg2.delay && delete _msg2.delay;
          _msg2.error = errorBool;
          _msg2.errorText = errorText;
          _msg2.errorCode = errorCode;
          this.onAudioMessage(_msg2);
          break;
        case "file":
          _msg2 = {
            id: id,
            type: chattype,
            from: from,
            to: too,
            url: msgBody.url,
            secret: msgBody.secret,
            filename: msgBody.filename,
            file_length: msgBody.file_length,
            accessToken: this.context.accessToken || "",
            ext: extmsg,
            delay: parseMsgData.delayTimeStamp };

          !_msg2.delay && delete _msg2.delay;
          _msg2.error = errorBool;
          _msg2.errorText = errorText;
          _msg2.errorCode = errorCode;
          this.onFileMessage(_msg2);
          break;
        case "loc":
          _msg2 = {
            id: id,
            type: chattype,
            from: from,
            to: too,
            addr: msgBody.addr,
            lat: msgBody.lat,
            lng: msgBody.lng,
            ext: extmsg,
            delay: parseMsgData.delayTimeStamp };

          !_msg2.delay && delete _msg2.delay;
          _msg2.error = errorBool;
          _msg2.errorText = errorText;
          _msg2.errorCode = errorCode;
          this.onLocationMessage(_msg2);
          break;
        case "video":
          _msg2 = {
            id: id,
            type: chattype,
            from: from,
            to: too,
            url: msgBody.url,
            secret: msgBody.secret,
            filename: msgBody.filename,
            file_length: msgBody.file_length,
            accessToken: this.context.accessToken || "",
            ext: extmsg,
            delay: parseMsgData.delayTimeStamp };

          !_msg2.delay && delete _msg2.delay;
          _msg2.error = errorBool;
          _msg2.errorText = errorText;
          _msg2.errorCode = errorCode;
          this.onVideoMessage(_msg2);
          break;
        case "cmd":
          _msg2 = {
            id: id,
            from: from,
            to: too,
            action: msgBody.action,
            ext: extmsg,
            delay: parseMsgData.delayTimeStamp };

          !_msg2.delay && delete _msg2.delay;
          _msg2.error = errorBool;
          _msg2.errorText = errorText;
          _msg2.errorCode = errorCode;
          this.onCmdMessage(_msg2);
          break;
        default:
          break;}

    } catch (e) {
      this.onError({
        type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
        data: e });

    }
  }
};
connection.prototype.handleReceivedMessage = function (message) {
  try {
    this.onReceivedMessage(message);
  } catch (e) {
    this.onError({
      type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
      data: e });

  }
  var rcv = message.getElementsByTagName("received");
  var id;
  var mid;
  if (rcv.length > 0) {
    if (rcv[0].childNodes && rcv[0].childNodes.length > 0) {
      id = rcv[0].childNodes[0].nodeValue;
    } else {
      id = rcv[0].innerHTML || rcv[0].innerText;
    }
    mid = rcv[0].getAttribute("mid");
  }
  if (_msgHash[id]) {
    try {
      _msgHash[id].msg.success instanceof Function && _msgHash[id].msg.success(id, mid);
    } catch (e) {
      this.onError({
        type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
        data: e });

    }
    delete _msgHash[id];
  }
};
connection.prototype.handleInviteMessage = function (message) {
  var form = null;
  var invitemsg = message.getElementsByTagName("invite");
  var reasonDom = message.getElementsByTagName("reason")[0];
  var reasonMsg = reasonDom.textContent;
  var id = message.getAttribute("id") || "";
  this.sendReceiptsMessage({
    id: id });

  if (invitemsg && invitemsg.length > 0) {
    var fromJid = invitemsg[0].getAttribute("from");
    form = _parseNameFromJidFn(fromJid);
  }
  var xmsg = message.getElementsByTagName("x");
  var roomid = null;
  if (xmsg && xmsg.length > 0) {
    for (var i = 0; i < xmsg.length; i++) {
      if (xmsg[i].namespaceURI === "jabber:x:conference") {
        var roomjid = xmsg[i].getAttribute("jid");
        roomid = _parseNameFromJidFn(roomjid);
      }
    }
  }
  this.onInviteMessage({
    type: "invite",
    from: form,
    roomid: roomid,
    reason: reasonMsg });

};
connection.prototype.sendCommand = function (dom, id) {
  var me = this;
  if (this.isOpened()) {
    var fail = function fail(reason) {
      var data = {};
      data.mid = id;
      data.reason = reason;
      me.onError({
        type: 'socket_error',
        data: data });

    };
    this.context.stropheConn.send(dom, fail);
  } else {
    console.log("Err 5");
    this.onError({
      type: _code.WEBIM_CONNCTION_DISCONNECTED });

  }
};
connection.prototype.getUniqueId = function (prefix) {
  var cdate = new Date();
  var offdate = new Date(2010, 1, 1);
  var offset = cdate.getTime() - offdate.getTime();
  var hexd = parseInt(offset).toString(16);
  if (typeof prefix === "string" || typeof prefix === "number") {
    return prefix + "_" + hexd;
  }
  return "WEBIM_" + hexd;
};
connection.prototype.send = function (message) {
  if (WebIM.config.isWindowSDK) {
    WebIM.doQuery(
    JSON.stringify({
      type: "sendMessage",
      to: message.to,
      message_type: message.type,
      msg: encodeURI(message.msg),
      chatType: message.chatType }),

    function (response) {

    },
    function (code, msg) {

    });

  } else if (Object.prototype.toString.call(message) === "[object Object]") {
    var appKey = this.context.appKey || "";
    var toJid = appKey + "_" + message.to + "@" + this.domain;
    if (message.group) {
      toJid = appKey + "_" + message.to + "@conference." + this.domain;
    }
    if (message.resource) {
      toJid = toJid + "/" + message.resource;
    }
    message.toJid = toJid;
    message.id = message.id || this.getUniqueId();
    _msgHash[message.id] = new _message(message);
    try {
      _msgHash[message.id].send(this);
    } catch (e) {
      console.log('发送失败');
    }

  } else if (typeof message === "string") {
    _msgHash[message] && _msgHash[message].send(this);
  }
};
connection.prototype.addRoster = function (options) {
  var jid = _getJid(options, this);
  var name = options.name || "";
  var groups = options.groups || "";

  var iq = _strophe.default.$iq({
    type: "set" });

  iq.c("query", {
    xmlns: "jabber:iq:roster" });

  iq.c("item", {
    jid: jid,
    name: name });


  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      iq.c("group").t(groups[i]).up();
    }
  }
  var suc = options.success || _utils.emptyfn;
  var error = options.error || _utils.emptyfn;
  this.context.stropheConn.sendIQ(iq.tree(), suc, error);
};
connection.prototype.removeRoster = function (options) {
  var jid = _getJid(options, this);
  var iq = _strophe.default.
  $iq({
    type: "set" }).

  c("query", {
    xmlns: "jabber:iq:roster" }).

  c("item", {
    jid: jid,
    subscription: "remove" });

  var suc = options.success || _utils.emptyfn;
  var error = options.error || _utils.emptyfn;
  this.context.stropheConn.sendIQ(iq, suc, error);
};
connection.prototype.getRoster = function (options) {
  var dom = _strophe.default.$iq({
    type: "get" }).

  c("query", {
    xmlns: "jabber:iq:roster" });

  options = options || {};
  var suc = options.success || this.onRoster;
  var error = options.error || this.onError;
  if (this.isOpened()) {
    this.context.stropheConn.sendIQ(dom.tree(), function (ele) {
      var rouster = [];
      var msgBodies = ele.getElementsByTagName("query");
      if (msgBodies && msgBodies.length > 0) {
        var queryTag = msgBodies[0];
        rouster = _parseFriend(queryTag);
      }
      suc(rouster, ele);
    }, function (ele) {
      error({
        type: _code.WEBIM_CONNCTION_GETROSTER_ERROR,
        data: ele });

    });
  } else {
    error({
      type: _code.WEBIM_CONNCTION_DISCONNECTED });

  }
};
connection.prototype.subscribe = function (options) {
  var jid = _getJid(options, this);
  var pres = _strophe.default.$pres({
    to: jid,
    type: "subscribe" });

  if (options.message) {
    pres.c("status").t(options.message).up();
  }
  if (options.nick) {
    pres.
    c("nick", {
      xmlns: "http://jabber.org/protocol/nick" }).

    t(options.nick);
  }
  this.sendCommand(pres.tree());
};
connection.prototype.subscribed = function (options) {
  var jid = _getJid(options, this);
  var pres = _strophe.default.$pres({
    to: jid,
    type: "subscribed" });

  if (options.message) {
    pres.c("status").t(options.message).up();
  }
  this.sendCommand(pres.tree());
};
connection.prototype.unsubscribe = function (options) {
  var jid = _getJid(options, this);
  var pres = _strophe.default.$pres({
    to: jid,
    type: "unsubscribe" });

  if (options.message) {
    pres.c("status").t(options.message);
  }
  this.sendCommand(pres.tree());
};
connection.prototype.unsubscribed = function (options) {
  var jid = _getJid(options, this);
  var pres = _strophe.default.$pres({
    to: jid,
    type: "unsubscribed" });

  if (options.message) {
    pres.c("status").t(options.message).up();
  }
  this.sendCommand(pres.tree());
};
connection.prototype.createRoom = function (options) {
  var suc = options.success || _utils.emptyfn;
  var err = options.error || _utils.emptyfn;
  var roomiq;
  roomiq = _strophe.default.$iq({
    to: options.roomName,
    type: "set" }).

  c("query", {
    xmlns: Strophe.NS.MUC_OWNER }).

  c("x", {
    xmlns: "jabber:x:data",
    type: "submit" });

  return this.context.stropheConn.sendIQ(roomiq.tree(), suc, err);
};

// connection.prototype.joinPublicGroup = function(options){
// 	var roomJid = this.context.appKey + "_" + options.roomId + "@conference." + this.domain;
// 	var room_nick = roomJid + "/" + this.context.userId;
// 	var suc = options.success || _utils.emptyfn;
// 	var err = options.error || _utils.emptyfn;
// 	var errorFn = function(ele){
// 		err({
// 			type: _code.WEBIM_CONNCTION_JOINROOM_ERROR,
// 			data: ele
// 		});
// 	};
// 	var iq = $pres({
// 		from: this.context.jid,
// 		to: room_nick
// 	})
// 	.c("x", { xmlns: Strophe.NS.MUC });
// 	this.context.stropheConn.sendIQ(iq.tree(), suc, errorFn);
// };

connection.prototype.listRooms = function (options) {
  var iq = _strophe.default.$iq({
    to: options.server || "conference." + this.domain,
    from: this.context.jid,
    type: "get" }).

  c("query", {
    xmlns: Strophe.NS.DISCO_ITEMS });

  var suc = options.success || _utils.emptyfn;
  var error = options.error || this.onError;
  var completeFn = function completeFn(result) {
    var rooms = [];
    rooms = _parseRoom(result);
    try {
      suc(rooms);
    } catch (e) {
      error({
        type: _code.WEBIM_CONNCTION_GETROOM_ERROR,
        data: e });

    }
  };
  var err = options.error || _utils.emptyfn;
  var errorFn = function errorFn(ele) {
    err({
      type: _code.WEBIM_CONNCTION_GETROOM_ERROR,
      data: ele });

  };
  this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
};
connection.prototype.queryRoomMember = function (options) {
  var members = [];
  var iq = _strophe.default.$iq({
    to: this.context.appKey + "_" + options.roomId + "@conference." + this.domain,
    type: "get" }).

  c("query", {
    xmlns: Strophe.NS.MUC + "#admin" }).

  c("item", {
    affiliation: "member" });

  var suc = options.success || _utils.emptyfn;
  var completeFn = function completeFn(result) {
    var items = result.getElementsByTagName("item");
    if (items) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var mem = {
          jid: item.getAttribute("jid"),
          affiliation: "member" };

        members.push(mem);
      }
    }
    suc(members);
  };
  var err = options.error || _utils.emptyfn;
  var errorFn = function errorFn(ele) {
    err({
      type: _code.WEBIM_CONNCTION_GETROOMMEMBER_ERROR,
      data: ele });

  };
  this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
};
connection.prototype.queryRoomInfo = function (options) {
  var domain = this.domain;
  var iq = _strophe.default.$iq({
    to: this.context.appKey + "_" + options.roomId + "@conference." + domain,
    type: "get" }).

  c("query", {
    xmlns: Strophe.NS.DISCO_INFO });

  var suc = options.success || _utils.emptyfn;
  var members = [];
  var completeFn = function completeFn(result) {
    var settings = "";
    var features = result.getElementsByTagName("feature");
    if (features) {
      settings = features[1].getAttribute("var") + "|" + features[3].getAttribute("var") + "|" + features[4].getAttribute("var");
    }
    switch (settings) {
      case "muc_public|muc_membersonly|muc_notallowinvites":
        settings = "PUBLIC_JOIN_APPROVAL";
        break;
      case "muc_public|muc_open|muc_notallowinvites":
        settings = "PUBLIC_JOIN_OPEN";
        break;
      case "muc_hidden|muc_membersonly|muc_allowinvites":
        settings = "PRIVATE_MEMBER_INVITE";
        break;
      case "muc_hidden|muc_membersonly|muc_notallowinvites":
        settings = "PRIVATE_OWNER_INVITE";
        break;
      default:
        break;}

    var fields = result.getElementsByTagName("field");
    var fieldValues = {};
    if (fields) {
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var fieldVar = field.getAttribute("var");
        var fieldSimplify = fieldVar.split("_")[1];
        switch (fieldVar) {
          case "muc#roominfo_occupants":
          case "muc#roominfo_maxusers":
          case "muc#roominfo_affiliations":
          case "muc#roominfo_description":
            fieldValues[fieldSimplify] = field.textContent || field.text || "";
            break;
          case "muc#roominfo_owner":
            var mem = {
              jid: (field.textContent || field.text) + "@" + domain,
              affiliation: "owner" };

            members.push(mem);
            fieldValues[fieldSimplify] = field.textContent || field.text;
            break;
          default:
            break;}

        // if (field.getAttribute('label') === 'owner') {
        //     var mem = {
        //         jid: (field.textContent || field.text) + '@' + domain
        //         , affiliation: 'owner'
        //     };
        //     members.push(mem);
        //     break;
        // }
      }
      fieldValues.name = result.getElementsByTagName("identity")[0].getAttribute("name");
    }
    // log(settings, members, fieldValues);
    suc(settings, members, fieldValues);
  };
  var err = options.error || _utils.emptyfn;
  var errorFn = function errorFn(ele) {
    err({
      type: _code.WEBIM_CONNCTION_GETROOMINFO_ERROR,
      data: ele });

  };
  this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
};
connection.prototype.queryRoomOccupants = function (options) {
  var suc = options.success || _utils.emptyfn;
  var completeFn = function completeFn(result) {
    var occupants = [];
    occupants = _parseRoomOccupants(result);
    suc(occupants);
  };
  var err = options.error || _utils.emptyfn;
  var errorFn = function errorFn(ele) {
    err({
      type: _code.WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR,
      data: ele });

  };
  var attrs = {
    xmlns: Strophe.NS.DISCO_ITEMS };

  var info = _strophe.default.$iq({
    from: this.context.jid,
    to: this.context.appKey + "_" + options.roomId + "@conference." + this.domain,
    type: "get" }).
  c("query", attrs);
  this.context.stropheConn.sendIQ(info.tree(), completeFn, errorFn);
};
connection.prototype.setUserSig = function (desc) {
  var dom = _strophe.default.$pres({
    xmlns: "jabber:client" });

  desc = desc || "";
  dom.c("status").t(desc);
  this.sendCommand(dom.tree());
};
connection.prototype.setPresence = function (type, status) {
  var dom = _strophe.default.$pres({
    xmlns: "jabber:client" });

  if (type) {
    if (status) {
      dom.c("show").t(type);
      dom.up().c("status").t(status);
    } else {
      dom.c("show").t(type);
    }
  }
  this.sendCommand(dom.tree());
};
connection.prototype.getPresence = function () {
  var dom = _strophe.default.$pres({
    xmlns: "jabber:client" });

  this.sendCommand(dom.tree());
};
connection.prototype.ping = function (options) {
  options = options || {};
  var jid = _getJid(options, this);
  var dom = _strophe.default.$iq({
    from: this.context.jid || "",
    to: jid,
    type: "get" }).

  c("ping", {
    xmlns: "urn:xmpp:ping" });

  var suc = options.success || _utils.emptyfn;
  var error = options.error || this.onError;
  var failFn = function failFn(ele) {
    error({
      type: _code.WEBIM_CONNCTION_PING_ERROR,
      data: ele });

  };
  if (this.isOpened()) {
    this.context.stropheConn.sendIQ(dom.tree(), suc, failFn);
  } else {
    error({
      type: _code.WEBIM_CONNCTION_DISCONNECTED });

  }
};
connection.prototype.isOpened = function () {
  return this.context.status == _code.STATUS_OPENED;
};
connection.prototype.isOpening = function () {
  var ctxstatus = this.context.status;
  return ctxstatus == _code.STATUS_DOLOGIN_USERGRID || ctxstatus == _code.STATUS_DOLOGIN_IM;
};
connection.prototype.isClosing = function () {
  return this.context.status == _code.STATUS_CLOSING;
};
connection.prototype.isClosed = function () {
  return this.context.status == _code.STATUS_CLOSED;
};
connection.prototype.clear = function () {
  var key = this.context.appKey;
  if (this.errorType != WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
    this.context = {
      status: _code.STATUS_INIT,
      appKey: key };

  }
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
  if (this.errorType == WebIM.statusCode.WEBIM_CONNCTION_CLIENT_LOGOUT || this.errorType == -1) {

  }
};
connection.prototype.getChatRooms = function (options) {
  var me = this;
  var token = options.accessToken || this.context.accessToken;
  if (token) {
    var apiUrl = this.apiUrl;
    var appName = this.context.appName;
    var orgName = this.context.orgName;
    if (!appName || !orgName) {
      me.onError({
        type: _code.WEBIM_CONNCTION_AUTH_ERROR });

      return;
    }
    var suc = function suc(data, xhr) {
      typeof options.success === "function" && options.success(data);
    };
    var error = function error(res, xhr, msg) {
      if (res.error && res.error_description) {
        me.onError({
          type: _code.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
          msg: res.error_description,
          data: res,
          xhr: xhr });

      }
    };
    var pageInfo = {
      pagenum: parseInt(options.pagenum) || 1,
      pagesize: parseInt(options.pagesize) || 20 };

    var opts = {
      url: apiUrl + "/" + orgName + "/" + appName + "/chatrooms",
      dataType: "json",
      type: "GET",
      header: {
        Authorization: "Bearer " + token },

      data: pageInfo,
      success: suc || _utils.emptyfn,
      fail: error || _utils.emptyfn };


    uni.request(opts);
  } else {
    me.onError({
      type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR });

  }
};
connection.prototype.joinChatRoom = function (options) {
  var roomJid = this.context.appKey + "_" + options.roomId + "@conference." + this.domain;
  var room_nick = roomJid + "/" + this.context.userId;
  var suc = options.success || _utils.emptyfn;
  var err = options.error || _utils.emptyfn;
  var errorFn = function errorFn(ele) {
    err({
      type: _code.WEBIM_CONNCTION_JOINCHATROOM_ERROR,
      data: ele });

  };
  var pres = _strophe.default.$pres({
    from: this.context.jid,
    to: room_nick });

  pres.c("x", {
    xmlns: Strophe.NS.MUC + "#user" }).

  c("item", {
    affiliation: "member",
    role: "participant" }).

  up().
  up().
  c("roomtype", {
    xmlns: "easemob:x:roomtype",
    type: "chatroom" });

  this.context.stropheConn.sendIQ(pres.tree(), suc, errorFn);
};
connection.prototype.quitChatRoom = function (options) {
  var roomJid = this.context.appKey + "_" + options.roomId + "@conference." + this.domain;
  var room_nick = roomJid + "/" + this.context.userId;
  var suc = options.success || _utils.emptyfn;
  var err = options.error || _utils.emptyfn;
  var errorFn = function errorFn(ele) {
    err({
      type: _code.WEBIM_CONNCTION_QUITCHATROOM_ERROR,
      data: ele });

  };
  var pres = _strophe.default.$pres({
    from: this.context.jid,
    to: room_nick,
    type: "unavailable" });

  pres.
  c("x", {
    xmlns: Strophe.NS.MUC + "#user" }).

  c("item", {
    affiliation: "none",
    role: "none" }).

  up().
  up().
  c("roomtype", {
    xmlns: "easemob:x:roomtype",
    type: "chatroom" });

  this.context.stropheConn.sendIQ(pres.tree(), suc, errorFn);
};
// connection.prototype._onReceiveInviteFromGroup = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group invitation",
// 		msg: info.user + " invites you to join into group:" + info.group_id,
// 		agree: function agree(){
// 			WebIM.doQuery(
// 				"{\"type\":\"acceptInvitationFromGroup\",\"id\":\"" + info.group_id + "\",\"user\":\"" + info.user + "\"}",
// 				function(response){
// 				},
// 				function(code, msg){
// 					IM.api.NotifyError("acceptInvitationFromGroup error:" + msg);
// 				}
// 			);
// 		},
// 		reject: function reject(){
// 			WebIM.doQuery(
// 				"{\"type\":\"declineInvitationFromGroup\",\"id\":\"" + info.group_id + "\",\"user\":\"" + info.user + "\"}",
// 				function(response){
// 				},
// 				function(code, msg){
// 					IM.api.NotifyError("declineInvitationFromGroup error:" + msg);
// 				}
// 			);
// 		}
// 	};
// 	this.onConfirmPop(options);
// };


// connection.prototype._onReceiveInviteAcceptionFromGroup = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group invitation response",
// 		msg: info.user + " agreed to join into group:" + info.group_id,
// 		agree: function agree(){
// 		}
// 	};
// 	this.onConfirmPop(options);
// };
// connection.prototype._onReceiveInviteDeclineFromGroup = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group invitation response",
// 		msg: info.user + " rejected to join into group:" + info.group_id,
// 		agree: function agree(){
// 		}
// 	};
// 	this.onConfirmPop(options);
// };
// connection.prototype._onAutoAcceptInvitationFromGroup = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group invitation",
// 		msg: "You had joined into the group:" + info.group_name + " automatically.Inviter:" + info.user,
// 		agree: function agree(){
// 		}
// 	};
// 	this.onConfirmPop(options);
// };
// connection.prototype._onLeaveGroup = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group notification",
// 		msg: "You have been out of the group:" + info.group_id + ".Reason:" + info.msg,
// 		agree: function agree(){
// 		}
// 	};
// 	this.onConfirmPop(options);
// };


// connection.prototype._onReceiveJoinGroupApplication = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group join application",
// 		msg: info.user + " applys to join into group:" + info.group_id,
// 		agree: function agree(){
// 			WebIM.doQuery("{\"type\":\"acceptJoinGroupApplication\",\"id\":\"" + info.group_id + "\",\"user\":\"" + info.user + "\"}", function(response){
// 			}, function(code, msg){
// 				IM.api.NotifyError("acceptJoinGroupApplication error:" + msg);
// 			});
// 		},
// 		reject: function reject(){
// 			WebIM.doQuery("{\"type\":\"declineJoinGroupApplication\",\"id\":\"" + info.group_id + "\",\"user\":\"" + info.user + "\"}", function(response){
// 			}, function(code, msg){
// 				IM.api.NotifyError("declineJoinGroupApplication error:" + msg);
// 			});
// 		}
// 	};
// 	this.onConfirmPop(options);
// };


// connection.prototype._onReceiveAcceptionFromGroup = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group notification",
// 		msg: "You had joined into the group:" + info.group_name + ".",
// 		agree: function agree(){
// 		}
// 	};
// 	this.onConfirmPop(options);
// };
// connection.prototype._onReceiveRejectionFromGroup = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group notification",
// 		msg: "You have been rejected to join into the group:" + info.group_name + ".",
// 		agree: function agree(){
// 		}
// 	};
// 	this.onConfirmPop(options);
// };


connection.prototype._onUpdateMyGroupList = function (options) {
  this.onUpdateMyGroupList(options);
};
connection.prototype._onUpdateMyRoster = function (options) {
  this.onUpdateMyRoster(options);
};

connection.prototype.reconnect = function () {
  var me = this;
  setTimeout(
  function () {
    _login(me.context.restTokenData && me.context.restTokenData.data, me);
  }, (
  this.autoReconnectNumTotal == 0 ?
  0 :
  this.autoReconnectInterval) *
  1000);

  this.autoReconnectNumTotal++;
};
connection.prototype.closed = function () {
  IM.api.init();
};

// 通过Rest列出群组的所有成员
connection.prototype.listGroupMember = function (opt) {
  if (isNaN(opt.pageNum) || opt.pageNum <= 0) {
    throw new Error("The parameter \"pageNum\" should be a positive number");
  } else if (isNaN(opt.pageSize) || opt.pageSize <= 0) {
    throw new Error("The parameter \"pageSize\" should be a positive number");
  } else if (opt.groupId === null && typeof opt.groupId === "undefined") {
    throw new Error("The parameter \"groupId\" should be added");
  }
  var requestData = [];
  var groupId = opt.groupId;
  requestData.pagenum = opt.pageNum;
  requestData.pagesize = opt.pageSize;
  var options = {
    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + groupId + "/users",
    dataType: "json",
    type: "GET",
    data: requestData,
    headers: {
      Authorization: "Bearer " + this.context.accessToken,
      "Content-Type": "application/json" } };


  options.success = opt.success || _utils.emptyfn;
  options.error = opt.error || _utils.emptyfn;
  WebIM.utils.ajax(options);
};

// 通过 Rest 接口创建群组
connection.prototype.createGroupNew = function (opt) {
  // opt.data.owner = this.user;
  opt.data.invite_need_confirm = false;
  var options = {
    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups",
    dataType: "json",
    type: "POST",
    data: JSON.stringify(opt.data),
    headers: {
      Authorization: "Bearer " + this.context.accessToken,
      "Content-Type": "application/json" } };


  options.success = function (respData) {
    opt.success(respData);
    this.onCreateGroup(respData);
  }.bind(this);
  options.error = opt.error || _utils.emptyfn;
  WebIM.utils.ajax(options);
};

// 通过Rest根据groupid获取群组详情
connection.prototype.getGroupInfo = function (opt) {
  var options = {
    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + opt.groupId,
    type: "GET",
    dataType: "json",
    headers: {
      Authorization: "Bearer " + this.context.accessToken,
      "Content-Type": "application/json" } };


  options.success = opt.success || _utils.emptyfn;
  options.error = opt.error || _utils.emptyfn;
  WebIM.utils.ajax(options);
};

// 通过Rest解散群组
connection.prototype.dissolveGroup = function (opt) {
  var groupId = opt.groupId;
  var options = {
    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + groupId + "?version=v3",
    type: "DELETE",
    dataType: "json",
    headers: {
      Authorization: "Bearer " + this.context.accessToken,
      "Content-Type": "application/json" } };


  options.success = opt.success || _utils.emptyfn;
  options.error = opt.error || _utils.emptyfn;
  WebIM.utils.ajax(options);
};

// used for blacklist
function _parsePrivacy(iq) {
  var list = [];
  var items = iq.getElementsByTagName("item");

  if (items) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var jid = item.getAttribute("value");
      var order = item.getAttribute("order");
      var type = item.getAttribute("type");
      if (!jid) {
        continue;
      }
      var n = _parseNameFromJidFn(jid);
      list[n] = {
        type: type,
        order: order,
        jid: jid,
        name: n };

    }
  }
  return list;
}

// used for blacklist
connection.prototype.getBlacklist = function (options) {
  options = options || {};
  var iq = _strophe.default.$iq({
    type: "get" });

  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;
  var me = this;

  iq.
  c("query", {
    xmlns: "jabber:iq:privacy" }).

  c("list", {
    name: "special" });


  this.context.stropheConn.sendIQ(iq.tree(), function (iq) {
    me.onBlacklistUpdate(_parsePrivacy(iq));
    sucFn();
  }, function () {
    me.onBlacklistUpdate([]);
    errFn();
  });
};

// used for blacklist
connection.prototype.addToBlackList = function (options) {
  var iq = _strophe.default.$iq({
    type: "set" });

  var blacklist = options.list || {};
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;
  var piece = iq.
  c("query", {
    xmlns: "jabber:iq:privacy" }).

  c("list", {
    name: "special" });


  var keys = Object.keys(blacklist);
  var len = keys.length;
  var order = 2;

  for (var i = 0; i < len; i++) {
    var item = blacklist[keys[i]];
    var type = item.type || "jid";
    var jid = item.jid;
    piece = piece.
    c("item", {
      action: "deny",
      order: order++,
      type: type,
      value: jid }).

    c("message");
    if (i !== len - 1) {
      piece = piece.up().up();
    }
  }
  this.context.stropheConn.sendIQ(piece.tree(), sucFn, errFn);
};

// used for blacklist
connection.prototype.removeFromBlackList = function (options) {
  var iq = _strophe.default.$iq({
    type: "set" });

  var blacklist = options.list || {};
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;
  var piece = iq.
  c("query", {
    xmlns: "jabber:iq:privacy" }).

  c("list", {
    name: "special" });


  var keys = Object.keys(blacklist);
  var len = keys.length;

  for (var i = 0; i < len; i++) {
    var item = blacklist[keys[i]];
    var type = item.type || "jid";
    var jid = item.jid;
    var order = item.order;

    piece = piece.
    c("item", {
      action: "deny",
      order: order,
      type: type,
      value: jid }).

    c("message");
    if (i !== len - 1) {
      piece = piece.up().up();
    }
  }
  this.context.stropheConn.sendIQ(piece.tree(), sucFn, errFn);
};
connection.prototype._getGroupJid = function (to) {
  var appKey = this.context.appKey || "";
  return appKey + "_" + to + "@conference." + this.domain;
};

// used for blacklist
connection.prototype.addToGroupBlackList = function (options) {
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;
  var jid = _getJid(options, this);
  var affiliation = "admin"; // options.affiliation || 'admin';
  var to = this._getGroupJid(options.roomId);
  var iq = _strophe.default.$iq({
    type: "set",
    to: to });


  iq.
  c("query", {
    xmlns: "http://jabber.org/protocol/muc#" + affiliation }).

  c("item", {
    affiliation: "outcast",
    jid: jid });


  this.context.stropheConn.sendIQ(iq.tree(), sucFn, errFn);
};

// used for blacklist
connection.prototype.getGroupBlacklist = function (options) {
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;

  // var jid = _getJid(options, this);
  var affiliation = "admin"; // options.affiliation || 'admin';
  var to = this._getGroupJid(options.roomId);
  var iq = _strophe.default.$iq({
    type: "get",
    to: to });


  iq.
  c("query", {
    xmlns: "http://jabber.org/protocol/muc#" + affiliation }).

  c("item", {
    affiliation: "outcast" });


  function _parseGroupBlacklist(iq) {
    var list = {};
    var items = iq.getElementsByTagName("item");

    if (items) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var jid = item.getAttribute("jid");
        var _affiliation2 = item.getAttribute("affiliation");
        var nick = item.getAttribute("nick");
        if (!jid) {
          continue;
        }
        var n = _parseNameFromJidFn(jid);
        list[n] = {
          jid: jid,
          affiliation: _affiliation2,
          nick: nick,
          name: n };

      }
    }
    return list;
  }

  this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
    sucFn(_parseGroupBlacklist(msginfo));
  }, function () {
    errFn();
  });
};

// used for blacklist
connection.prototype.removeGroupMemberFromBlacklist = function (options) {
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;

  var jid = _getJid(options, this);
  var affiliation = "admin"; // options.affiliation || 'admin';
  var to = this._getGroupJid(options.roomId);
  var iq = _strophe.default.$iq({
    type: "set",
    to: to });


  iq.
  c("query", {
    xmlns: "http://jabber.org/protocol/muc#" + affiliation }).

  c("item", {
    affiliation: "member",
    jid: jid });


  this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
    sucFn();
  }, function () {
    errFn();
  });
};

/**
    * changeGroupSubject 修改群名称
    *
    * @param options
    */

connection.prototype.changeGroupSubject = function (options) {
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;

  // must be `owner`
  var affiliation = "owner";
  var to = this._getGroupJid(options.roomId);
  var iq = _strophe.default.$iq({
    type: "set",
    to: to });


  iq.
  c("query", {
    xmlns: "http://jabber.org/protocol/muc#" + affiliation }).

  c("x", {
    type: "submit",
    xmlns: "jabber:x:data" }).

  c("field", {
    "var": "FORM_TYPE" }).

  c("value").
  t("http://jabber.org/protocol/muc#roomconfig").
  up().
  up().
  c("field", {
    "var": "muc#roomconfig_roomname" }).

  c("value").
  t(options.subject).
  up().
  up().
  c("field", {
    "var": "muc#roomconfig_roomdesc" }).

  c("value").
  t(options.description);
  this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
    sucFn();
  }, function () {
    errFn();
  });
};

/**
    * destroyGroup 删除群组
    *
    * @param options
    */
connection.prototype.destroyGroup = function (options) {
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;

  // must be `owner`
  var affiliation = "owner";
  var to = this._getGroupJid(options.roomId);
  var iq = _strophe.default.$iq({
    type: "set",
    to: to });


  iq.
  c("query", {
    xmlns: "http://jabber.org/protocol/muc#" + affiliation }).

  c("destroy");

  this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
    sucFn();
  }, function () {
    errFn();
  });
};

/**
    * leaveGroupBySelf 主动离开群组
    *
    * @param options
    */

connection.prototype.leaveGroupBySelf = function (options) {
  var me = this;
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;

  // must be `owner`
  var jid = _getJid(options, this);
  var affiliation = "admin";
  var to = this._getGroupJid(options.roomId);
  var iq = _strophe.default.$iq({
    type: "set",
    to: to });


  iq.
  c("query", {
    xmlns: "http://jabber.org/protocol/muc#" + affiliation }).

  c("item", {
    affiliation: "none",
    jid: jid });


  this.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
    sucFn(msgInfo);
    var pres = _strophe.default.$pres({
      type: "unavailable",
      to: to + "/" + me.context.userId });

    me.sendCommand(pres.tree());
  }, function (errInfo) {
    errFn(errInfo);
  });
};

/**
    * leaveGroup 被踢出群组
    *
    * @param options
    */
// connection.prototype.leaveGroup = function(options){
// 	var sucFn = options.success || _utils.emptyfn;
// 	var errFn = options.error || _utils.emptyfn;
// 	var list = options.list || [];
// 	var affiliation = "admin";
// 	var to = this._getGroupJid(options.roomId);
// 	var iq = $iq({ type: "set", to: to });
// 	var piece = iq.c("query", { xmlns: "http://jabber.org/protocol/muc#" + affiliation });
// 	var keys = Object.keys(list);
// 	var len = keys.length;
//
// 	for(let i = 0; i < len; i++){
// 		let name = list[keys[i]];
// 		let jid = _getJidByName(name, this);
//
// 		piece = piece.c("item", {
// 			affiliation: "none",
// 			jid: jid
// 		})
// 		.up()
// 		.c("item", {
// 			role: "none",
// 			jid: jid,
// 		})
// 		.up();
// 	}
//
// 	this.context.stropheConn.sendIQ(iq.tree(), function(msgInfo){
// 		sucFn(msgInfo);
// 	}, function(errInfo){
// 		errFn(errInfo);
// 	});
// };

/**
 * addGroupMembers 添加群组成员
 *
 * @param options
 */

connection.prototype.addGroupMembers = function (options) {
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;
  var list = options.list || [];
  var affiliation = "admin";
  var to = this._getGroupJid(options.roomId);
  var iq = _strophe.default.$iq({
    type: "set",
    to: to });

  var piece = iq.c("query", {
    xmlns: "http://jabber.org/protocol/muc#" + affiliation });

  var len = list.length;

  for (var i = 0; i < len; i++) {
    var name = list[i];
    var jid = _getJidByName(name, this);

    piece = piece.c("item", {
      affiliation: "member",
      jid: jid }).
    up();

    var dom = _strophe.default.$msg({
      to: to }).

    c("x", {
      xmlns: "http://jabber.org/protocol/muc#user" }).

    c("invite", {
      to: jid }).

    c("reason").
    t(options.reason || "");

    this.sendCommand(dom.tree());
  }
  this.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
    sucFn(msgInfo);
  }, function (errInfo) {
    errFn(errInfo);
  });
};


/**
    * acceptInviteFromGroup 接受加入申请
    *
    * @param options
    */
connection.prototype.acceptInviteFromGroup = function (options) {
  options.success = function () {
    // then send sendAcceptInviteMessage
    // connection.prototype.sendAcceptInviteMessage(optoins);
  };
  this.addGroupMembers(options);
};

/**
    * rejectInviteFromGroup 拒绝加入申请
    *
    * throw request for now 暂时不处理，直接丢弃
    *
    * @param options
    */
connection.prototype.rejectInviteFromGroup = function (options) {

};
//
// /**
//  * createGroup 创建群组
//  *
//  * 1. 创建申请 -> 得到房主身份
//  * 2. 获取房主信息 -> 得到房间form
//  * 3. 完善房间form -> 创建成功
//  * 4. 添加房间成员
//  * 5. 消息通知成员
//  * @param options
//  */
// connection.prototype.createGroup = function(options){
// 	var roomId = +new Date();
// 	var toRoom = this._getGroupJid(roomId);
// 	var to = toRoom + "/" + this.context.userId;
//
// 	var pres = StropheAll.$pres({ to: to })
// 	.c("x", { xmlns: "http://jabber.org/protocol/muc" }).up()
// 	.c("create", { xmlns: "http://jabber.org/protocol/muc" }).up();
// 	// .c('c', {
// 	//     hash: 'sha-1',
// 	//     node: 'https://github.com/robbiehanson/XMPPFramework',
// 	//     ver: 'k6gP4Ua5m4uu9YorAG0LRXM+kZY=',
// 	//     xmlns: 'http://jabber.org/protocol/caps'
// 	// }).up();
//
// 	// createGroupACK
// 	this.sendCommand(pres.tree());
//
// 	let me = this;
// 	// timeout hack for create group async
// 	setTimeout(function(){
// 		var x;
// 		// Creating a Reserved Room
// 		var iq = $iq({ type: "get", to: toRoom })
// 		.c("query", { xmlns: "http://jabber.org/protocol/muc#owner" });
// 		// Strophe.info('step 1 ----------');
// 		// Strophe.info(options);
// 		me.context.stropheConn.sendIQ(iq.tree(), function(msgInfo){
// 			// for ie hack
// 			if("setAttribute" in msgInfo){
// 				// Strophe.info('step 3 ----------');
// 				x = msgInfo.getElementsByTagName("x")[0];
// 				x.setAttribute("type", "submit");
// 			}
// 			else{
// 				// Strophe.info('step 4 ----------');
// 				Strophe.forEachChild(msgInfo, "x", function(field){
// 					field.setAttribute("type", "submit");
// 				});
// 			}
// 			// var rcv = msgInfo.getElementsByTagName('x');
// 			// var v;
// 			// if (rcv.length > 0) {
// 			//     if (rcv[0].childNodes && rcv[0].childNodes.length > 0) {
// 			//         v = rcv[0].childNodes[0].nodeValue;
// 			//     } else {
// 			//         v = rcv[0].innerHTML || rcv[0].innerText
// 			//     }
// 			//     mid = rcv[0].getAttribute('mid');
// 			// }
// 			Strophe.info("step 5 ----------");
// 			Strophe.forEachChild(x, "field", function(field){
// 				var fieldVar = field.getAttribute("var");
// 				var valueDom = field.getElementsByTagName("value")[0];
// 				Strophe.info(fieldVar);
// 				switch(fieldVar){
// 				case "muc#roomconfig_roomname":
// 					_setText(valueDom, options.subject || "");
// 					break;
// 				case "muc#roomconfig_roomdesc":
// 					_setText(valueDom, options.description || "");
// 					break;
// 				case "muc#roomconfig_publicroom": // public 1
// 					_setText(valueDom, +options.optionsPublic);
// 					break;
// 				case "muc#roomconfig_membersonly":
// 					_setText(valueDom, +options.optionsMembersOnly);
// 					break;
// 				case "muc#roomconfig_moderatedroom":
// 					_setText(valueDom, +options.optionsModerate);
// 					break;
// 				case "muc#roomconfig_persistentroom":
// 					_setText(valueDom, 1);
// 					break;
// 				case "muc#roomconfig_allowinvites":
// 					_setText(valueDom, +options.optionsAllowInvites);
// 					break;
// 				case "muc#roomconfig_allowvisitornickchange":
// 					_setText(valueDom, 0);
// 					break;
// 				case "muc#roomconfig_allowvisitorstatus":
// 					_setText(valueDom, 0);
// 					break;
// 				case "allow_private_messages":
// 					_setText(valueDom, 0);
// 					break;
// 				case "allow_private_messages_from_visitors":
// 					_setText(valueDom, "nobody");
// 					break;
// 				default:
// 					break;
// 				}
// 			});
//
// 			let iq = $iq({ to: toRoom, type: "set" })
// 			.c("query", { xmlns: "http://jabber.org/protocol/muc#owner" })
// 			.cnode(x);
// 			me.context.stropheConn.sendIQ(iq.tree(), function(msgInfo){
// 				// sucFn(msgInfo);
// 				me.addGroupMembers({
// 					list: options.members,
// 					roomId: roomId
// 				});
// 			}, function(errInfo){
// 				// errFn(errInfo);
// 			});
// 			// sucFn(msgInfo);
// 		}, function(errInfo){
// 			// errFn(errInfo);
// 		});
// 	}, 1000);
// };

// function _setText(valueDom, v){
// 	if("textContent" in valueDom){
// 		valueDom.textContent = v;
// 	}
// 	else if("text" in valueDom){
// 		valueDom.text = v;
// 	}
// 	else{
// 		// Strophe.info('_setText 4 ----------');
// 		// valueDom.innerHTML = v;
// 	}
// }
// connection.prototype.onError = function () {
//     return false;
// };
// window.WebIM = typeof WebIM !== 'undefined' ? WebIM : {};
WebIM.connection = connection;
WebIM.utils = _utils;
WebIM.statusCode = _code;
WebIM.message = _msg.message;
WebIM.doQuery = function (str, suc, fail) {
  if (typeof window.cefQuery === "undefined") {
    return;
  }
  window.cefQuery({
    request: str,
    persistent: false,
    onSuccess: suc,
    onFailure: fail });

};

module.exports = WebIM;

if (false) {}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 18:
/*!***************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/sdk/status.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


(function () {
  var connIndex = 0;

  exports.code = {
    WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_OPEN_ERROR: connIndex++,
    WEBIM_CONNCTION_AUTH_ERROR: connIndex++,
    WEBIM_CONNCTION_OPEN_USERGRID_ERROR: connIndex++,
    WEBIM_CONNCTION_ATTACH_ERROR: connIndex++,
    WEBIM_CONNCTION_ATTACH_USERGRID_ERROR: connIndex++,
    WEBIM_CONNCTION_REOPEN_ERROR: connIndex++,
    WEBIM_CONNCTION_SERVER_CLOSE_ERROR: connIndex++, // 7: client-side network offline (net::ERR_INTERNET_DISCONNECTED)
    WEBIM_CONNCTION_SERVER_ERROR: connIndex++, // 8: offline by multi login
    WEBIM_CONNCTION_IQ_ERROR: connIndex++,
    WEBIM_CONNCTION_PING_ERROR: connIndex++,
    WEBIM_CONNCTION_NOTIFYVERSION_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROSTER_ERROR: connIndex++,
    WEBIM_CONNCTION_CROSSDOMAIN_ERROR: connIndex++,
    WEBIM_CONNCTION_LISTENING_OUTOF_MAXRETRIES: connIndex++,
    WEBIM_CONNCTION_RECEIVEMSG_CONTENTERROR: connIndex++,
    WEBIM_CONNCTION_DISCONNECTED: connIndex++, // 16: server-side close the websocket connection
    WEBIM_CONNCTION_AJAX_ERROR: connIndex++,
    WEBIM_CONNCTION_JOINROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROOMINFO_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROOMMEMBER_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR: connIndex++,
    WEBIM_CONNCTION_LOAD_CHATROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_JOINCHATROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_QUITCHATROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_CALLBACK_INNER_ERROR: connIndex++,
    WEBIM_CONNCTION_CLIENT_OFFLINE: connIndex++, // 32: client offline
    WEBIM_CONNCTION_CLIENT_LOGOUT: connIndex++, // 33: client logout


    WEBIM_UPLOADFILE_BROWSER_ERROR: 100,
    WEBIM_UPLOADFILE_ERROR: 101,
    WEBIM_UPLOADFILE_NO_LOGIN: 102,
    WEBIM_UPLOADFILE_NO_FILE: 103,


    WEBIM_DOWNLOADFILE_ERROR: 200,
    WEBIM_DOWNLOADFILE_NO_LOGIN: 201,
    WEBIM_DOWNLOADFILE_BROWSER_ERROR: 202,


    WEBIM_MESSAGE_REC_TEXT: 300,
    WEBIM_MESSAGE_REC_TEXT_ERROR: 301,
    WEBIM_MESSAGE_REC_EMOTION: 302,
    WEBIM_MESSAGE_REC_PHOTO: 303,
    WEBIM_MESSAGE_REC_AUDIO: 304,
    WEBIM_MESSAGE_REC_AUDIO_FILE: 305,
    WEBIM_MESSAGE_REC_VEDIO: 306,
    WEBIM_MESSAGE_REC_VEDIO_FILE: 307,
    WEBIM_MESSAGE_REC_FILE: 308,
    WEBIM_MESSAGE_SED_TEXT: 309,
    WEBIM_MESSAGE_SED_EMOTION: 310,
    WEBIM_MESSAGE_SED_PHOTO: 311,
    WEBIM_MESSAGE_SED_AUDIO: 312,
    WEBIM_MESSAGE_SED_AUDIO_FILE: 313,
    WEBIM_MESSAGE_SED_VEDIO: 314,
    WEBIM_MESSAGE_SED_VEDIO_FILE: 315,
    WEBIM_MESSAGE_SED_FILE: 316,

    STATUS_INIT: 400,
    STATUS_DOLOGIN_USERGRID: 401,
    STATUS_DOLOGIN_IM: 402,
    STATUS_OPENED: 403,
    STATUS_CLOSING: 404,
    STATUS_CLOSED: 405,
    STATUS_ERROR: 406 };

})();

/***/ }),

/***/ 19:
/*!**************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/sdk/utils.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {(function () {

  var EMPTYFN = function EMPTYFN() {};
  var _code = __webpack_require__(/*! ./status */ 18).code;
  var WEBIM_FILESIZE_LIMIT = 10485760;
  var _tmpUtilXHR = false;
  var _hasFormData = typeof FormData !== "undefined";
  var _hasBlob = typeof Blob !== "undefined";
  var _isCanSetRequestHeader = _tmpUtilXHR.setRequestHeader || false;
  var _hasOverrideMimeType = _tmpUtilXHR.overrideMimeType || false;
  var _isCanUploadFileAsync = _isCanSetRequestHeader && _hasFormData;
  var _isCanUploadFile = _isCanUploadFileAsync || false;
  var _isCanDownLoadFile = _isCanSetRequestHeader && (_hasBlob || _hasOverrideMimeType);

  if (!Object.keys) {
    Object.keys = function () {
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var hasDontEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
      var dontEnums = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"];

      var dontEnumsLength = dontEnums.length;

      return function (obj) {
        if (typeof obj !== "object" && (typeof obj !== "function" || obj === null)) {
          throw new TypeError("Object.keys called on non-object");
        }
        var result = [];
        var prop;
        var i;
        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }
        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }();
  }

  var utils = {
    hasFormData: _hasFormData,
    hasBlob: _hasBlob,
    emptyfn: EMPTYFN,
    isCanSetRequestHeader: _isCanSetRequestHeader,
    hasOverrideMimeType: _hasOverrideMimeType,
    isCanUploadFileAsync: _isCanUploadFileAsync,
    isCanUploadFile: _isCanUploadFile,
    isCanDownLoadFile: _isCanDownLoadFile,
    isSupportWss: true,
    hasFlash: false,
    xmlrequest: false,

    stringify: function stringify(json) {
      if (typeof JSON !== "undefined" && JSON.stringify) {
        return JSON.stringify(json);
      }
      var s = "";
      var arr = [];
      return iterate(json);

      function iterate(json) {
        var isArr = false;
        if (Object.prototype.toString.call(json) === "[object Array]") {
          arr.push("]", "[");
          isArr = true;
        } else
        if (Object.prototype.toString.call(json) === "[object Object]") {
          arr.push("}", "{");
        }
        for (var o in json) {
          if (Object.prototype.toString.call(json[o]) === "[object Null]") {
            json[o] = "null";
          } else
          if (Object.prototype.toString.call(json[o]) === "[object Undefined]") {
            json[o] = "undefined";
          }
          if (json[o] && typeof json[o] === "object") {
            s += "," + (isArr ? "" : "\"" + o + "\":" + (isArr ? "\"" : "")) + iterate(json[o]) + "";
          } else
          {
            s += ",\"" + (isArr ? "" : o + "\":\"") + json[o] + "\"";
          }
        }
        if (s != "") {
          s = s.slice(1);
        }
        return arr.pop() + s + arr.pop();
      }
    },

    registerUser: function registerUser(options) {
      var orgName = options.orgName || "";
      var appName = options.appName || "";
      var appKey = options.appKey || "";
      var suc = options.success || EMPTYFN;
      var err = options.error || EMPTYFN;

      if (!orgName && !appName && appKey) {
        var devInfos = appKey.split("#");
        if (devInfos.length === 2) {
          orgName = devInfos[0];
          appName = devInfos[1];
        }
      }
      if (!orgName && !appName) {
        err({
          type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

        return false;
      }
      var apiUrl = options.apiUrl;
      var restUrl = apiUrl + "/" + orgName + "/" + appName + "/users";
      var userjson = {
        username: options.username,
        password: options.password,
        nickname: options.nickname || "" };

      var userinfo = utils.stringify(userjson);
      options = {
        url: restUrl,
        data: userinfo,
        success: suc,
        error: err };

      return utils.ajax(options);
    },

    login: function login(options) {
      options = options || {};
      var suc = options.success || EMPTYFN;
      var err = options.error || EMPTYFN;
      var appKey = options.appKey || "";
      var devInfos = appKey.split("#");
      if (devInfos.length !== 2) {
        err({
          type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

        return false;
      }
      var orgName = devInfos[0];
      var appName = devInfos[1];
      var user = options.user || "";
      var pwd = options.pwd || "";
      var apiUrl = options.apiUrl;
      var loginJson = {
        grant_type: "password",
        username: user,
        password: pwd,
        timestamp: +new Date() };

      var loginfo = utils.stringify(loginJson);
      options = {
        url: apiUrl + "/" + orgName + "/" + appName + "/token",
        data: loginfo,
        success: suc,
        error: err };

      return utils.ajax(options);
    },

    getFileUrl: function getFileUrl(fileInputId) {
      var uri = {
        url: "",
        filename: "",
        filetype: "",
        data: "" };

      var fileObj = typeof fileInputId === "string" ?
      document.getElementById(fileInputId) :
      fileInputId;
      if (!utils.isCanUploadFileAsync || !fileObj) {
        return uri;
      }
      try {
        if (window.URL.createObjectURL) {
          var fileItems = fileObj.files; // 一个对象,文件列表
          if (fileItems.length > 0) {
            var u = fileItems.item(0); // 有关选取文件的信息
            uri.data = u;
            uri.url = window.URL.createObjectURL(u); // 指向该文件的URL
            uri.filename = u.name || "";
          }
        }
        var index = uri.filename.lastIndexOf(".");
        if (index != -1) {
          uri.filetype = uri.filename.substring(index + 1).toLowerCase();
        }
        return uri;
      }
      catch (e) {
        throw e;
      }
    },

    getFileSize: function getFileSize(fileInputId) {
      var file = document.getElementById(fileInputId);
      var fileSize = 0;
      if (file) {
        if (file.files) {
          if (file.files.length > 0) {
            fileSize = file.files[0].size;
          }
        }
      }
      return fileSize;
    },

    trim: function trim(str) {
      str = typeof str === "string" ? str : "";
      return str.trim ?
      str.trim() :
      str.replace(/^\s|\s$/g, "");
    },

    parseEmoji: function parseEmoji(msg) {
      if (typeof WebIM.Emoji === "undefined" || typeof WebIM.Emoji.map === "undefined") {
        return msg;
      }
      var emoji = WebIM.Emoji;
      for (var face in emoji.map) {
        if (emoji.map.hasOwnProperty(face)) {
          while (msg.indexOf(face) > -1) {
            msg = msg.replace(face, "<image class=\"emoji\" src=\"" + emoji.path + emoji.map[face] + "\" /></image>");
          }
        }
      }
      return msg;
    },

    parseLink: function parseLink(msg) {
      var reg = /(https?:\/\/|www\.)([a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+)(:[0-9]{2,4})?\/?((\.[:_0-9a-zA-Z-]+)|[:_0-9a-zA-Z-]*\/?)*\??[:_#@*&%0-9a-zA-Z-/=]*/gm;
      msg = msg.replace(reg, function (v) {
        var prefix = /^https?/gm.test(v);
        return "<a href='" + (prefix ? v : "//" + v) + "' target='_blank'>" + v + "</a>";
      });
      return msg;
    },

    parseJSON: function parseJSON(data) {
      if (window.JSON && window.JSON.parse) {
        return window.JSON.parse(data + "");
      }
      var requireNonComma;
      var depth = null;
      var str = utils.trim(data + "");
      return str && !utils.trim(
      str.replace(
      /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g,
      function (token, comma, open, close) {
        if (requireNonComma && comma) {
          depth = 0;
        }
        if (depth === 0) {
          return token;
        }
        requireNonComma = open || comma;
        depth += !close - !open;
        return "";
      })) ?

      Function("return " + str)() :
      Function("Invalid JSON: " + data)();
    },

    parseUploadResponse: function parseUploadResponse(response) {
      return response.indexOf("callback") > -1
      // lte ie9
      ? response.slice(9, -1) :
      response;
    },

    parseDownloadResponse: function parseDownloadResponse(response) {
      return (
        response && response.type && response.type === "application/json" ||
        Object.prototype.toString.call(response).indexOf("Blob") < 0 ?

        this.url + "?token=" :
        window.URL.createObjectURL(response));
    },

    uploadFile: function uploadFile(options) {
      options = options || {};
      options.onFileUploadProgress = options.onFileUploadProgress || EMPTYFN;
      options.onFileUploadComplete = options.onFileUploadComplete || EMPTYFN;
      options.onFileUploadError = options.onFileUploadError || EMPTYFN;
      options.onFileUploadCanceled = options.onFileUploadCanceled || EMPTYFN;
      var acc = options.accessToken || this.context.accessToken;
      if (!acc) {
        options.onFileUploadError({
          type: _code.WEBIM_UPLOADFILE_NO_LOGIN,
          id: options.id });

        return;
      }
      var orgName, appName, devInfos;
      var appKey = options.appKey || this.context.appKey || "";
      if (appKey) {
        devInfos = appKey.split("#");
        orgName = devInfos[0];
        appName = devInfos[1];
      }
      if (!orgName && !appName) {
        options.onFileUploadError({
          type: _code.WEBIM_UPLOADFILE_ERROR,
          id: options.id });

        return;
      }
      var apiUrl = options.apiUrl;
      var uploadUrl = apiUrl + "/" + orgName + "/" + appName + "/chatfiles";
      if (!utils.isCanUploadFileAsync) {
        if (utils.hasFlash && typeof options.flashUpload === "function") {
          options.flashUpload && options.flashUpload(uploadUrl, options);
        } else
        {
          options.onFileUploadError({
            type: _code.WEBIM_UPLOADFILE_BROWSER_ERROR,
            id: options.id });

        }
        return;
      }
      var fileSize = options.file.data ? options.file.data.size : undefined;
      if (fileSize > WEBIM_FILESIZE_LIMIT) {
        options.onFileUploadError({
          type: _code.WEBIM_UPLOADFILE_ERROR,
          id: options.id });

        return;
      } else
      if (fileSize <= 0) {
        options.onFileUploadError({
          type: _code.WEBIM_UPLOADFILE_ERROR,
          id: options.id });

        return;
      }
      var xhr = utils.xmlrequest();
      var onError = function onError(e) {
        options.onFileUploadError({
          type: _code.WEBIM_UPLOADFILE_ERROR,
          id: options.id,
          xhr: xhr });

      };
      if (xhr.upload) {
        xhr.upload.addEventListener("progress", options.onFileUploadProgress, false);
      }
      if (xhr.addEventListener) {
        xhr.addEventListener("abort", options.onFileUploadCanceled, false);
        xhr.addEventListener("load", function (e) {
          try {
            var json = utils.parseJSON(xhr.responseText);
            try {
              options.onFileUploadComplete(json);
            }
            catch (e) {
              options.onFileUploadError({
                type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                data: e });

            }
          }
          catch (e) {
            options.onFileUploadError({
              type: _code.WEBIM_UPLOADFILE_ERROR,
              data: xhr.responseText,
              id: options.id,
              xhr: xhr });

          }
        }, false);
        xhr.addEventListener("error", onError, false);
      } else
      if (xhr.onreadystatechange) {
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (ajax.status === 200) {
              try {
                var json = utils.parseJSON(xhr.responseText);
                options.onFileUploadComplete(json);
              }
              catch (e) {
                options.onFileUploadError({
                  type: _code.WEBIM_UPLOADFILE_ERROR,
                  data: xhr.responseText,
                  id: options.id,
                  xhr: xhr });

              }
            } else
            {
              options.onFileUploadError({
                type: _code.WEBIM_UPLOADFILE_ERROR,
                data: xhr.responseText,
                id: options.id,
                xhr: xhr });

            }
          } else
          {
            xhr.abort();
            options.onFileUploadCanceled();
          }
        };
      }
      xhr.open("POST", uploadUrl);
      xhr.setRequestHeader("restrict-access", "true");
      xhr.setRequestHeader("Accept", "*/*"); // Android QQ browser has some problem with this attribute.
      xhr.setRequestHeader("Authorization", "Bearer " + acc);
      var formData = new FormData();
      formData.append("file", options.file.data);
      xhr.send(formData);
    },

    download: function download(options) {
      options.onFileDownloadComplete = options.onFileDownloadComplete || EMPTYFN;
      options.onFileDownloadError = options.onFileDownloadError || EMPTYFN;
      var accessToken = options.accessToken || this.context.accessToken;
      var xhr = utils.xmlrequest();
      if (!accessToken) {
        options.onFileDownloadError({
          type: _code.WEBIM_DOWNLOADFILE_NO_LOGIN,
          id: options.id });

        return;
      }
      var onError = function onError(e) {
        options.onFileDownloadError({
          type: _code.WEBIM_DOWNLOADFILE_ERROR,
          id: options.id,
          xhr: xhr });

      };
      if (!utils.isCanDownLoadFile) {
        options.onFileDownloadComplete();
        return;
      }
      if ("addEventListener" in xhr) {
        xhr.addEventListener("load", function (e) {
          options.onFileDownloadComplete(xhr.response, xhr);
        }, false);
        xhr.addEventListener("error", onError, false);
      } else
      if ("onreadystatechange" in xhr) {
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (ajax.status === 200) {
              options.onFileDownloadComplete(xhr.response, xhr);
            } else
            {
              options.onFileDownloadError({
                type: _code.WEBIM_DOWNLOADFILE_ERROR,
                id: options.id,
                xhr: xhr });

            }
          } else
          {
            xhr.abort();
            options.onFileDownloadError({
              type: _code.WEBIM_DOWNLOADFILE_ERROR,
              id: options.id,
              xhr: xhr });

          }
        };
      }
      var method = options.method || "GET";
      var resType = options.responseType || "blob";
      var mimeType = options.mimeType || "text/plain; charset=x-user-defined";
      xhr.open(method, options.url);
      if (typeof Blob !== "undefined") {
        xhr.responseType = resType;
      } else
      {
        xhr.overrideMimeType(mimeType);
      }
      var innerHeaer = {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/octet-stream",
        "share-secret": options.secret,
        Authorization: "Bearer " + accessToken };

      var headers = options.headers || {};
      for (var key in headers) {
        innerHeaer[key] = headers[key];
      }
      for (var _key in innerHeaer) {
        if (innerHeaer[_key]) {
          xhr.setRequestHeader(_key, innerHeaer[_key]);
        }
      }
      xhr.send(null);
    },

    parseTextMessage: function parseTextMessage(message, faces) {
      if (typeof message !== "string") {
        return false;
      }
      if (Object.prototype.toString.call(faces) !== "[object Object]") {
        return {
          isemoji: false,
          body: [
          {
            type: "txt",
            data: message }] };



      }
      var receiveMsg = message;
      var emessage = [];
      var expr = /\[[^[\]]{2,3}\]/mg;
      var emoji = receiveMsg.match(expr);
      if (!emoji || emoji.length < 1) {
        return {
          isemoji: false,
          body: [
          {
            type: "txt",
            data: message }] };



      }

      var isemoji = false;
      for (var i = 0; i < emoji.length; i++) {
        var tmsg = receiveMsg.substring(0, receiveMsg.indexOf(emoji[i]));
        var existEmoji = faces.map[emoji[i]];
        if (tmsg) {
          emessage.push({
            type: "txt",
            data: tmsg });

        }
        if (!existEmoji) {
          emessage.push({
            type: "txt",
            data: emoji[i] });

          continue;
        }
        var emojiStr = faces.map ? existEmoji : null;
        if (emojiStr) {
          isemoji = true;
          emessage.push({
            type: "emoji",
            data: emojiStr });

        } else
        {
          emessage.push({
            type: "txt",
            data: emoji[i] });

        }
        var restMsgIndex = receiveMsg.indexOf(emoji[i]) + emoji[i].length;
        receiveMsg = receiveMsg.substring(restMsgIndex);
      }
      if (receiveMsg) {
        emessage.push({
          type: "txt",
          data: receiveMsg });

      }
      if (isemoji) {
        return {
          isemoji: isemoji,
          body: emessage };

      }
      return {
        isemoji: false,
        body: [
        {
          type: "txt",
          data: message }] };



    },

    ajax: function ajax(options) {var _arguments = arguments;
      var suc = options.success || EMPTYFN;
      var error = options.error || EMPTYFN;
      var type = options.type || "POST",
      data = options.data || null,
      tempData = "";

      if (type.toLowerCase() === "get" && data) {
        for (var o in data) {
          if (data.hasOwnProperty(o)) {
            tempData += o + "=" + data[o] + "&";
          }
        }
        tempData = tempData ? tempData.slice(0, -1) : tempData;
        options.url += (options.url.indexOf("?") > 0 ? "&" : "?") + (tempData ? tempData + "&" : tempData) + "_v=" + new Date().getTime();
        data = null;
        tempData = null;
      }
      console.log("wx.request", options.url);
      uni.request({
        url: options.url,
        data: options.data,
        header: options.headers,
        method: type,
        success: function success(res) {
          console.log("wx.request.success", arguments);
          if (res.statusCode == "200") {
            suc(res);
          } else
          {
            error(res);
          }
        },
        complete: function complete(e) {
          console.log("wx.request.complete", _arguments);
        },
        fail: function fail(e) {
          console.log("wx.request.fail", _arguments);
        } });

    },

    ts: function ts() {
      var d = new Date();
      var Hours = d.getHours(); // 获取当前小时数(0-23)
      var Minutes = d.getMinutes(); // 获取当前分钟数(0-59)
      var Seconds = d.getSeconds(); // 获取当前秒数(0-59)
      var Milliseconds = d.getMilliseconds(); // 获取当前毫秒
      return (Hours < 10 ? "0" + Hours : Hours) + ":" + (
      Minutes < 10 ? "0" + Minutes : Minutes) + ":" + (
      Seconds < 10 ? "0" + Seconds : Seconds) + ":" +
      Milliseconds + " ";
    },

    getObjectKey: function getObjectKey(obj, val) {
      for (var key in obj) {
        if (obj[key] == val) {
          return key;
        }
      }
      return "";
    } };



  exports.utils = utils;

})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"智慧云家","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"智慧云家","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"智慧云家","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"智慧云家","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!****************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/sdk/message.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var StropheAll = __webpack_require__(/*! ./libs/strophe */ 9);

(function () {
  var _utils = __webpack_require__(/*! ./utils */ 19).utils;
  var Message = function Message(type, id) {
    if (!(this instanceof Message)) {
      return new Message(type);
    }
    this._msg = {};
    if (typeof Message[type] === "function") {
      Message[type].prototype.setGroup = this.setGroup;
      this._msg = new Message[type](id);
    }
    return this._msg;
  };
  Message.prototype.setGroup = function (group) {
    this.body.group = group;
  };

  /*
      * Read Message
      */
  Message.read = function (id) {
    this.id = id;
    this.type = "read";
  };

  Message.read.prototype.set = function (opt) {
    this.body = {
      ackId: opt.id,
      to: opt.to };

  };

  /*
      * text message
      */
  Message.txt = function (id) {
    this.id = id;
    this.type = "txt";
    this.body = {};
  };
  Message.txt.prototype.set = function (opt) {
    this.value = opt.msg;
    this.body = {
      id: this.id,
      from: opt.from,
      to: opt.to,
      msg: this.value,
      type: this.type,
      roomType: opt.roomType,
      chatType: opt.chatType,
      ext: opt.ext || {},
      success: opt.success,
      fail: opt.fail };

    !opt.roomType && delete this.body.roomType;
  };

  /*
      * cmd message
      */
  Message.cmd = function (id) {
    this.id = id;
    this.type = "cmd";
    this.body = {};
  };
  Message.cmd.prototype.set = function (opt) {
    this.value = "";

    this.body = {
      to: opt.to,
      from: opt.from,
      action: opt.action,
      msg: this.value,
      type: this.type,
      roomType: opt.roomType,
      ext: opt.ext || {} };

    !opt.roomType && delete this.body.roomType;
  };

  /*
      * loc message
      */
  Message.location = function (id) {
    this.id = id;
    this.type = "loc";
    this.body = {};
  };
  Message.location.prototype.set = function (opt) {
    this.body = {
      to: opt.to,
      from: opt.from,
      type: this.type,
      roomType: opt.roomType,
      addr: opt.addr,
      lat: opt.lat,
      lng: opt.lng,
      chatType: opt.chatType,
      ext: opt.ext || {} };

  };

  /*
      * img message
      */
  Message.img = function (id) {
    this.id = id;
    this.type = "img";
    this.body = {};
  };
  Message.img.prototype.set = function (opt) {
    // opt.file = opt.file || _utils.getFileUrl(opt.fileInputId);
    // //console.log(opt)
    this.value = opt.file;
    this.body = {
      id: this.id,
      file: this.value,
      apiUrl: opt.apiUrl,
      to: opt.to,
      from: opt.from,
      type: this.type,
      ext: opt.ext || {},
      roomType: opt.roomType,
      onFileUploadError: opt.onFileUploadError,
      onFileUploadComplete: opt.onFileUploadComplete,
      success: opt.success,
      fail: opt.fail,
      flashUpload: opt.flashUpload,
      width: opt.width,
      height: opt.height,
      body: opt.body };

    !opt.roomType && delete this.body.roomType;
  };

  /*
      * audio message
      */
  Message.audio = function (id) {
    this.id = id;
    this.type = "audio";
    this.body = {};
  };
  Message.audio.prototype.set = function (opt) {
    opt.file = opt.file || _utils.getFileUrl(opt.fileInputId);

    this.value = opt.file;
    this.filename = opt.filename || this.value.filename;

    this.body = {
      id: this.id,
      file: this.value,
      filename: this.filename,
      apiUrl: opt.apiUrl,
      accessToken: opt.accessToken,
      to: opt.to,
      from: opt.from,
      type: this.type,
      ext: opt.ext || {},
      length: opt.length || 0,
      roomType: opt.roomType,
      file_length: opt.file_length,
      onFileUploadError: opt.onFileUploadError,
      onFileUploadComplete: opt.onFileUploadComplete,
      success: opt.success,
      fail: opt.fail,
      flashUpload: opt.flashUpload,
      body: opt.body };

    !opt.roomType && delete this.body.roomType;
  };

  /*
      * file message
      */
  Message.file = function (id) {
    this.id = id;
    this.type = "file";
    this.body = {};
  };
  Message.file.prototype.set = function (opt) {
    opt.file = opt.file || _utils.getFileUrl(opt.fileInputId);

    this.value = opt.file;
    this.filename = opt.filename || this.value.filename;

    this.body = {
      id: this.id,
      file: this.value,
      filename: this.filename,
      apiUrl: opt.apiUrl,
      to: opt.to,
      from: opt.from,
      type: this.type,
      ext: opt.ext || {},
      roomType: opt.roomType,
      onFileUploadError: opt.onFileUploadError,
      onFileUploadComplete: opt.onFileUploadComplete,
      success: opt.success,
      fail: opt.fail,
      flashUpload: opt.flashUpload,
      body: opt.body };

    !opt.roomType && delete this.body.roomType;
  };

  /*
      * video message
      */
  Message.video = function (id) {
    this.id = id;
    this.type = "file";
    this.body = {};
  };
  Message.video.prototype.set = function (opt) {
    opt.file = opt.file || _utils.getFileUrl(opt.fileInputId);

    this.value = opt.file;
    this.filename = opt.filename || this.value.filename;

    this.body = {
      id: this.id,
      file: this.value,
      filename: this.filename,
      apiUrl: opt.apiUrl,
      to: opt.to,
      from: opt.from,
      type: this.type,
      ext: opt.ext || {},
      roomType: opt.roomType,
      onFileUploadError: opt.onFileUploadError,
      onFileUploadComplete: opt.onFileUploadComplete,
      success: opt.success,
      fail: opt.fail,
      flashUpload: opt.flashUpload,
      body: opt.body };

    !opt.roomType && delete this.body.roomType;
  };




  function _Message(message) {
    if (!(this instanceof _Message)) {
      return new _Message(message);
    }
    this.msg = message;
  }
  _Message.prototype.send = function (conn) {
    var me = this;
    var _send = function _send(message) {
      message.ext = message.ext || {};
      message.ext.weichat = message.ext.weichat || {};
      message.ext.weichat.originType = message.ext.weichat.originType || "webim";
      var json = {
        from: conn.context.userId || "",
        to: message.to,
        bodies: [message.body],
        ext: message.ext || {} };

      var jsonstr = _utils.stringify(json);
      var dom = StropheAll.
      $msg({
        type: message.group || "chat",
        to: message.toJid,
        id: message.id,
        xmlns: "jabber:client" }).

      c("body").
      t(jsonstr);

      if (message.roomType) {
        dom.
        up().
        c("roomtype", {
          xmlns: "easemob:x:roomtype",
          type: "chatroom" });

      }
      if (message.bodyId) {
        dom = StropheAll.
        $msg({
          from: conn.context.jid || "",
          to: message.toJid,
          id: message.id,
          xmlns: "jabber:client" }).

        c("body").
        t(message.bodyId);

        var delivery = {
          xmlns: "urn:xmpp:receipts",
          id: message.bodyId };

        dom.up().c("delivery", delivery);
      }

      if (message.ackId) {

        if (conn.context.jid.indexOf(message.toJid) >= 0) {
          return;
        }
        dom = StropheAll.$msg({
          from: conn.context.jid || "",
          to: message.toJid,
          id: message.id,
          xmlns: "jabber:client" }).
        c("body").t(message.ackId);
        var read = {
          xmlns: "urn:xmpp:receipts",
          id: message.ackId };

        dom.up().c("acked", read);
      }

      // setTimeout(function(){
      // 	if(typeof _msgHash !== "undefined" && _msgHash[message.id]){
      // 		_msgHash[message.id].msg.fail instanceof Function
      // 			&& _msgHash[message.id].msg.fail(message.id);
      // 	}
      // }, 60000);
      conn.sendCommand(dom.tree(), message.id);
    };


    if (me.msg.file) {
      if (me.msg.body && me.msg.body.url) {// Only send msg
        _send(me.msg);
        return;
      }
      var _tmpComplete = me.msg.onFileUploadComplete;
      var _complete = function _complete(data) {
        if (data.entities[0]["file-metadata"]) {
          var file_len = data.entities[0]["file-metadata"]["content-length"];
          me.msg.file_length = file_len;
          me.msg.filetype = data.entities[0]["file-metadata"]["content-type"];
          if (file_len > 204800) {
            me.msg.thumbnail = true;
          }
        }
        me.msg.body = {
          type: me.msg.type || "file",
          url: data.uri + "/" + data.entities[0].uuid,
          secret: data.entities[0]["share-secret"],
          filename: me.msg.file.filename || me.msg.filename,
          size: {
            width: me.msg.width || 0,
            height: me.msg.height || 0 },

          length: me.msg.length || 0,
          file_length: me.msg.file_length || 0,
          filetype: me.msg.filetype };

        _send(me.msg);
        _tmpComplete instanceof Function && _tmpComplete(data, me.msg.id);
      };
      me.msg.onFileUploadComplete = _complete;
      _utils.uploadFile.call(conn, me.msg);
    } else
    if (me.msg.type === "img") {//  添加img判断规则   wjy
      _send(me.msg);
    } else
    {
      me.msg.body = {
        type: me.msg.type === "chat" ? "txt" : me.msg.type,
        msg: me.msg.msg };

      if (me.msg.type === "cmd") {
        me.msg.body.action = me.msg.action;
      } else
      if (me.msg.type === "loc") {
        me.msg.body.addr = me.msg.addr;
        me.msg.body.lat = me.msg.lat;
        me.msg.body.lng = me.msg.lng;
      }
      _send(me.msg);
    }
  };

  exports._msg = _Message;
  exports.message = Message;
})();

/***/ }),

/***/ 21:
/*!**************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/sdk/queue.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  function Array_h(length) {
    this.array = length === undefined ? [] : new Array(length);
  }

  Array_h.prototype = {
    /**
                         * 返回数组长度
                         *
                         * @return {Number} length [数组长度]
                         */
    length: function length() {
      return this.array.length;
    },

    at: function at(index) {
      return this.array[index];
    },

    set: function set(index, obj) {
      this.array[index] = obj;
    },

    /**
        * 向数组的末尾添加一个或多个元素，并返回新的长度。
        *
        * @param  {*} obj [description]
        * @return {Number} length [新数组的长度]
        */
    push: function push(obj) {
      return this.array.push(obj);
    },

    /**
        * 返回数组中选定的元素
        *
        * @param  {Number} start [开始索引值]
        * @param  {Number} end [结束索引值]
        * @return {Array} newArray  [新的数组]
        */
    slice: function slice(start, end) {
      this.array = this.array.slice(start, end);
      return this.array;
    },

    concat: function concat(array) {
      this.array = this.array.concat(array);
    },

    remove: function remove(index, count) {
      count = count === undefined ? 1 : count;
      this.array.splice(index, count);
    },

    join: function join(separator) {
      return this.array.join(separator);
    },

    clear: function clear() {
      this.array.length = 0;
    } };


  /**
          * 先进先出队列 (First Input First Output)
          *
          * 一种先进先出的数据缓存器
          */
  var Queue = function Queue() {
    this._array_h = new Array_h();
  };

  Queue.prototype = {
    _index: 0,

    /**
                * 排队
                *
                * @param  {Object} obj [description]
                * @return {[type]}     [description]
                */
    push: function push(obj) {
      this._array_h.push(obj);
    },

    /**
        * 出队
        *
        * @return {Object} [description]
        */
    pop: function pop() {
      var ret = null;
      if (this._array_h.length()) {
        ret = this._array_h.at(this._index);
        if (++this._index * 2 >= this._array_h.length()) {
          this._array_h.slice(this._index);
          this._index = 0;
        }
      }
      return ret;
    },

    /**
        * 返回队列中头部(即最新添加的)的动态对象
        *
        * @return {Object} [description]
        */
    head: function head() {
      var ret = null,len = this._array_h.length();
      if (len) {
        ret = this._array_h.at(len - 1);
      }
      return ret;
    },

    /**
        * 返回队列中尾部(即最早添加的)的动态对象
        *
        * @return {Object} [description]
        */
    tail: function tail() {
      var ret = null,len = this._array_h.length();
      if (len) {
        ret = this._array_h.at(this._index);
      }
      return ret;
    },

    /**
        * 返回数据队列长度
        *
        * @return {Number} [description]
        */
    length: function length() {
      return this._array_h.length() - this._index;
    },

    /**
        * 队列是否为空
        *
        * @return {Boolean} [description]
        */
    empty: function empty() {
      return this._array_h.length() === 0;
    },

    clear: function clear() {
      this._array_h.clear();
    } };


  exports.Queue = Queue;

})();

/***/ }),

/***/ 22:
/*!**********************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/utils/WebIMConfig.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * git do not control webim.config.js
                                                                                                      * everyone should copy webim.config.js to webim.config.js
                                                                                                      * and have their own configs.
                                                                                                      * In this way , others won't be influenced by this config while git pull.
                                                                                                      *
                                                                                                      */

// for react native
var location = {
  protocol: "https" };


var config = {
  /*
                * XMPP server
                */
  xmppURL: "wss://im-api.easemob.com/ws/",
  // xmppURL: '172.17.3.122:5280',
  /*
   * Backend REST API URL
   */
  // apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
  // ios must be https!!! by lwz
  apiURL: "https://a1.easemob.com",
  // apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//172.17.3.155:8080',
  /*
   * Application AppKey
   */
  // appkey: "1100190906107692#uni-huanxin-im",
  appkey: "1157200722098347#yunjia",
  /*
                                      * Whether to use HTTPS      '1177161227178308#xcx'
                                      * @parameter {Boolean} true or false
                                      */
  https: false,
  /*
                 * isMultiLoginSessions
                 * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
                 * false: A visitor can sign in to only one webpage and receive messages at the webpage.
                 */
  isMultiLoginSessions: false,
  /**
                                * Whether to use window.doQuery()
                                * @parameter {Boolean} true or false
                                */
  isWindowSDK: false,
  /**
                       * isSandBox=true:  xmppURL: 'im-api.sandbox.easemob.com',  apiURL: '//a1.sdb.easemob.com',
                       * isSandBox=false: xmppURL: 'im-api.easemob.com',          apiURL: '//a1.easemob.com',
                       * @parameter {Boolean} true or false
                       */
  isSandBox: false,
  /**
                     * Whether to console.log in strophe.log()
                     * @parameter {Boolean} true or false
                     */
  isDebug: false,
  /**
                   * will auto connect the xmpp server autoReconnectNumMax times in background when client is offline.
                   * won't auto connect if autoReconnectNumMax=0.
                   */
  autoReconnectNumMax: 15,
  /**
                            * the interval secons between each atuo reconnectting.
                            * works only if autoReconnectMaxNum >= 2.
                            */
  autoReconnectInterval: 2,
  /**
                             * webrtc supports WebKit and https only
                             */
  isWebRTC: false,
  /*
                    * Set to auto sign-in
                    */
  isAutoLogin: true };var _default =


config;exports.default = _default;

/***/ }),

/***/ 23:
/*!***********************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/comps/chat/msgtype.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  IMAGE: "img",
  TEXT: "txt",
  LOCATION: "location",
  VIDEO: "video",
  AUDIO: "audio",
  EMOJI: "emoji",
  FILE: "chat",
  //
  chatType: {
    SINGLE_CHAT: "singleChat",
    CHAT_ROOM: "chatRoom" } };

/***/ }),

/***/ 24:
/*!********************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/utils/broadcast.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Dispatcher = __webpack_require__(/*! ./Dispatcher */ 14);
module.exports = new Dispatcher();

/***/ }),

/***/ 27:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 28:
/*!****************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/store/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 29));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// import find from '../find.js';
_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  // modules:{//
  //  find
  // },
  state: {

    url: "https://test.aiznkj.net",
    // url:"https://xin.yiyunoto.com",
    cdzurl: "https://server.cclaidian.com/zscanServcc/powerapp", //充电桩
    imgurl: "https://xin.yiyunoto.com",
    wuyeurl: "https://wuye.yiyunoto.com",
    scoketurl_wuye: 'wss://wuye.yiyunoto.com/wss',
    scoketurl_video: 'wss://videos.yiyunoto.com/wss',
    cityUrl: "https://city.yiyunoto.com/",

    // cityUrl:"https://city.aiznkj.net",

    homeProduct: {},
    userInfor: null },

  mutations: {
    // home-index页面   商家详情
    changeHomeProduct: function changeHomeProduct(state, product) {
      state.homeProduct.merchant = product; //从home首页点击进入的商家
    },
    changeUserInfor: function changeUserInfor(state, Infor) {
      state.userInfor = Infor;
    } },

  actions: {} });var _default =

store;exports.default = _default;

/***/ }),

/***/ 29:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/pages.json ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 41:
/*!*******************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/components/uni-popup/popup.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 定义 type 类型:弹出类型：top/bottom/center
var config = {
  // 顶部弹出
  top: 'top',
  // 底部弹出
  bottom: 'bottom',
  // 居中弹出
  center: 'center',
  // 消息提示
  message: 'top',
  // 对话框
  dialog: 'center',
  // 分享
  share: 'bottom' };var _default =


{
  data: function data() {
    return {
      config: config };

  },
  mixins: [_message.default] };exports.default = _default;

/***/ }),

/***/ 42:
/*!*********************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/components/uni-popup/message.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _created$created$meth;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default = (_created$created$meth = {
  created: function created() {
    if (this.type === 'message') {
      // 获取自组件对象
      this.maskShow = false;
      this.children = null;
    }
  } }, _defineProperty(_created$created$meth, "created", function created()
{
  if (this.type === 'message') {
    // 不显示遮罩
    this.maskShow = false;
    // 获取子组件对象
    this.childrenMsg = null;
  }
}), _defineProperty(_created$created$meth, "methods",
{
  customOpen: function customOpen() {
    if (this.childrenMsg) {
      this.childrenMsg.open();
    }
  },
  customClose: function customClose() {
    if (this.childrenMsg) {
      this.childrenMsg.close();
    }
  } }), _created$created$meth);exports.default = _default;

/***/ }),

/***/ 45:
/*!***************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/store/http.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _urlRequest(url, param, token, way, fun, res) {
  //获取token

  // 进行请求
  uni.request({
    url: url,
    data: param,
    // header:{

    // 	 'content-type': 'application/json',
    // 	 'authtoken':token
    // },
    header: token,
    // 获取设置请求方式
    method: way,
    success: function success(res) {
      if (res.data.code == -7) {
        uni.hideLoading();
        uni.removeStorage({ key: "authtoken" });
        uni.navigateTo({
          url: '/pages/My/Login-registration/Login-registration' });

      } else

      fun(res);
    },
    fail: function fail(e) {

      uni.hideLoading();
      uni.showToast({
        title: "网络请求失败",
        icon: "none" });

    } });

}
function _wmRequest(url, param, fun, res) {
  //获取token

  // 进行请求
  uni.request({
    url: url,
    data: param,
    // header:{

    // 	 'content-type': 'application/json',
    // 	 'authtoken':token
    // },
    // header:token,
    // 获取设置请求方式
    method: "POST",
    success: function success(res) {
      if (res.data.resultCode != 1) {
        uni.hideLoading();
        uni.removeStorage({ key: "authtoken" });
        uni.navigateTo({
          url: '/pages/My/Login-registration/Login-registration' });

      } else

      fun(res);
    },
    fail: function fail(e) {

      uni.hideLoading();
      uni.showToast({
        title: "网络请求失败",
        icon: "none" });

    } });

}var _default =
{
  urlRequest: function urlRequest(url, param, token, way, fun, res) {
    //把函数放回去
    return _urlRequest(url, param, token, way, fun, res);
  },
  wmRequest: function wmRequest(url, param, fun, res) {
    //把函数放回去
    return _wmRequest(url, param, fun, res);
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 46:
/*!*******************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/common/amap-wx.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function AMapWX(a) {this.key = a.key, this.requestConfig = { key: a.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };}AMapWX.prototype.getWxLocation = function (a, b) {wx.getLocation({ type: "gcj02", success: function success(a) {var c = a.longitude + "," + a.latitude;wx.setStorage({ key: "userLocation", data: c }), b(c);}, fail: function fail(c) {wx.getStorage({ key: "userLocation", success: function success(a) {a.data && b(a.data);} }), a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });}, AMapWX.prototype.getRegeo = function (a) {function c(c) {var d = b.requestConfig;wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: c, extensions: "all", s: d.s, platform: d.platform, appname: b.key, sdkversion: d.sdkversion, logversion: d.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var d, e, f, g, h, i, j, k, l;b.data.status && "1" == b.data.status ? (d = b.data.regeocode, e = d.addressComponent, f = [], g = "", d && d.roads[0] && d.roads[0].name && (g = d.roads[0].name + "附近"), h = c.split(",")[0], i = c.split(",")[1], d.pois && d.pois[0] && (g = d.pois[0].name + "附近", j = d.pois[0].location, j && (h = parseFloat(j.split(",")[0]), i = parseFloat(j.split(",")[1]))), e.provice && f.push(e.provice), e.city && f.push(e.city), e.district && f.push(e.district), e.streetNumber && e.streetNumber.street && e.streetNumber.number ? (f.push(e.streetNumber.street), f.push(e.streetNumber.number)) : (k = "", d && d.roads[0] && d.roads[0].name && (k = d.roads[0].name), f.push(k)), f = f.join(""), l = [{ iconPath: a.iconPath, width: a.iconWidth, height: a.iconHeight, name: f, desc: g, longitude: h, latitude: i, id: 0, regeocodeData: d }], a.success(l)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this;a.location ? c(a.location) : b.getWxLocation(a, function (a) {c(a);});}, AMapWX.prototype.getWeather = function (a) {function d(d) {var e = "base";a.type && "forecast" == a.type && (e = "all"), wx.request({ url: "https://restapi.amap.com/v3/weather/weatherInfo", data: { key: b.key, city: d, extensions: e, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {function c(a) {var b = { city: { text: "城市", data: a.city }, weather: { text: "天气", data: a.weather }, temperature: { text: "温度", data: a.temperature }, winddirection: { text: "风向", data: a.winddirection + "风" }, windpower: { text: "风力", data: a.windpower + "级" }, humidity: { text: "湿度", data: a.humidity + "%" } };return b;}var d, e;b.data.status && "1" == b.data.status ? b.data.lives ? (d = b.data.lives, d && d.length > 0 && (d = d[0], e = c(d), e["liveData"] = d, a.success(e))) : b.data.forecasts && b.data.forecasts[0] && a.success({ forecast: b.data.forecasts[0] }) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}function e(e) {wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: e, extensions: "all", s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, e;b.data.status && "1" == b.data.status ? (e = b.data.regeocode, e.addressComponent ? c = e.addressComponent.adcode : e.aois && e.aois.length > 0 && (c = e.aois[0].adcode), d(c)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.city ? d(a.city) : b.getWxLocation(a, function (a) {e(a);});}, AMapWX.prototype.getPoiAround = function (a) {function d(d) {var e = { key: b.key, location: d, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.querytypes && (e["types"] = a.querytypes), a.querykeywords && (e["keywords"] = a.querykeywords), wx.request({ url: "https://restapi.amap.com/v3/place/around", data: e, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, d, e, f;if (b.data.status && "1" == b.data.status) {if (b = b.data, b && b.pois) {for (c = [], d = 0; d < b.pois.length; d++) {e = 0 == d ? a.iconPathSelected : a.iconPath, c.push({ latitude: parseFloat(b.pois[d].location.split(",")[1]), longitude: parseFloat(b.pois[d].location.split(",")[0]), iconPath: e, width: 22, height: 32, id: d, name: b.pois[d].name, address: b.pois[d].address });}f = { markers: c, poisData: b.pois }, a.success(f);}} else a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.location ? d(a.location) : b.getWxLocation(a, function (a) {d(a);});}, AMapWX.prototype.getStaticmap = function (a) {function f(b) {c.push("location=" + b), a.zoom && c.push("zoom=" + a.zoom), a.size && c.push("size=" + a.size), a.scale && c.push("scale=" + a.scale), a.markers && c.push("markers=" + a.markers), a.labels && c.push("labels=" + a.labels), a.paths && c.push("paths=" + a.paths), a.traffic && c.push("traffic=" + a.traffic);var e = d + c.join("&");a.success({ url: e });}var e,b = this,c = [],d = "https://restapi.amap.com/v3/staticmap?";c.push("key=" + b.key), e = b.requestConfig, c.push("s=" + e.s), c.push("platform=" + e.platform), c.push("appname=" + e.appname), c.push("sdkversion=" + e.sdkversion), c.push("logversion=" + e.logversion), a.location ? f(a.location) : b.getWxLocation(a, function (a) {f(a);});}, AMapWX.prototype.getInputtips = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.location && (d["location"] = a.location), a.keywords && (d["keywords"] = a.keywords), a.type && (d["type"] = a.type), a.city && (d["city"] = a.city), a.citylimit && (d["citylimit"] = a.citylimit), wx.request({ url: "https://restapi.amap.com/v3/assistant/inputtips", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.tips && a.success({ tips: b.data.tips });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getDrivingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.waypoints && (d["waypoints"] = a.waypoints), a.avoidpolygons && (d["avoidpolygons"] = a.avoidpolygons), a.avoidroad && (d["avoidroad"] = a.avoidroad), wx.request({ url: "https://restapi.amap.com/v3/direction/driving", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths, taxi_cost: b.data.route.taxi_cost || "" });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getWalkingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v3/direction/walking", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getTransitRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.city && (d["city"] = a.city), a.cityd && (d["cityd"] = a.cityd), wx.request({ url: "https://restapi.amap.com/v3/direction/transit/integrated", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {if (b && b.data && b.data.route) {var c = b.data.route;a.success({ distance: c.distance || "", taxi_cost: c.taxi_cost || "", transits: c.transits });}}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getRidingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v4/direction/bicycling", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.data && a.success({ paths: b.data.data.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, module.exports.AMapWX = AMapWX;

/***/ }),

/***/ 576:
/*!*****************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/common/image.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 135));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 使用plus.zip.compressImage压缩,目前仅支持App端
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var images = []; //压缩后的图片集合
var max_width = 500; //若宽度大于此尺寸,触发压缩,否则使用原图,可自行修改

/**
 * 接收图片集合
 */function
compress(_x, _x2) {return _compress2.apply(this, arguments);}








/**
                                                               * 菜鸟请大神教我如何优化QAQ~
                                                               */function _compress2() {_compress2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(_images, _fun) {var i, compressd_image;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:i = 0;case 1:if (!(i < _images.length)) {_context.next = 9;break;}_context.next = 4;return _compress(_images[i]);case 4:compressd_image = _context.sent;images.push(compressd_image);case 6:i++;_context.next = 1;break;case 9:_fun && _fun(images);images = []; //压缩结束重置images,准备下次压缩
          case 11:case "end":return _context.stop();}}}, _callee);}));return _compress2.apply(this, arguments);}function _compress(_x3) {return _compress3.apply(this, arguments);}function _compress3() {_compress3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(_image) {var last4chars, image_info;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:

            last4chars = _image.slice(-4);if (!(
            plus.os.name == 'Android')) {_context2.next = 4;break;}if (!(
            !~last4chars.indexOf('jpg') && !~last4chars.indexOf('png') && !~last4chars.indexOf('jpeg'))) {_context2.next = 4;break;}return _context2.abrupt("return",
            _image);case 4:_context2.next = 6;return (



              get_image_info(_image));case 6:image_info = _context2.sent;if (!(
            image_info.width < max_width)) {_context2.next = 9;break;}return _context2.abrupt("return",
            _image);case 9:return _context2.abrupt("return",


            new Promise(function (resolve, reject) {
              plus.zip.compressImage({
                src: _image, //原始图片的路径
                dst: _image, //压缩转换目标图片的路径(为了省事这里使用原路径)
                overwrite: true, //使用原文件名并覆盖,如果想将原文件保留,并和压缩后图片同时上传,需要改为false,并修改dst
                quality: 100, //1-100,压缩后质量,越低图片占用空间越小,越模糊
                width: max_width + 'px' //这里先写死800;height默认为auto,即根据width与源图宽的缩放比例计算
              },
              function (res) {
                resolve(res.target);
              },
              function (e) {
                reject(e);
              });


            }));case 10:case "end":return _context2.stop();}}}, _callee2);}));return _compress3.apply(this, arguments);}




function get_image_info(_image) {
  return new Promise(function (resolve, reject) {
    uni.getImageInfo({
      src: _image,
      success: function success(res) {
        resolve(res);
      } });

  });
}var _default =

{
  compress: compress };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 8:
/*!************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/common/checkUpdater.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.checkUpdater = checkUpdater;function checkUpdater(currentId, updaterPage) {
  uni.request({
    url: 'https://xin.yiyunoto.com/api/index/getAppConfig',
    method: 'GET',

    success: function success(res) {

      if (res.statusCode === 200) {

        var response = res.data.data;
        var latestId = response.newversion;
        var method = response.enforce;

        if (!latestId) {

        } else if (currentId < latestId && method === 1) {

          //  如果需要背地（静默）热更新，获取下载地址


          var iosLink = response.iosLink;
          var androidLink = '';
          if (!response.pkgurl)
          androidLink = response.wgturl;else
          androidLink = response.pkgurl;
          var downloadLink = '';
          var ready = false;
          // 判断系统类型
          if (plus.os.name.toLowerCase() === 'android') {

            if (androidLink && androidLink !== '#') {// 我这里默认#也是没有地址，请根据业务自行修改

              // 安卓：创建下载任务
              if (androidLink.match(RegExp(/.wgt/))) {

                downloadLink = androidLink;
                ready = true;
              } else {
                // console.log('安卓推荐.wgt强制更新，.apk的强制更新请您自行修改程序')
              }
            } else {
                // console.log('下载地址是空的，无法继续')
              }
          } else {

            if (iosLink && iosLink !== '#') {// 我这里默认#也是没有地址，请根据业务自行修改

              // 苹果(A)：进行热更新（如果iosLink是wgt更新包的下载地址）判断文件名中是否含有.wgt
              if (iosLink.match(RegExp(/.wgt/))) {

                downloadLink = iosLink;
                ready = true;
              } else {

              }
            } else {

            }
          }
          if (ready) {
            var downloadTask = uni.downloadFile({
              url: downloadLink,
              success: function success(res) {
                if (res.statusCode === 200) {
                  // 保存下载的安装包
                  console.log('保存安装包');
                  uni.saveFile({
                    tempFilePath: res.tempFilePath,
                    success: function success(res) {
                      var packgePath = res.savedFilePath;
                      // 保存更新记录到stroage，下次启动app时安装更新
                      uni.setStorage({
                        key: 'updated',
                        data: {
                          completed: false,
                          packgePath: packgePath },

                        success: function success() {
                          console.log('成功保存记录');
                        } });

                      // 任务完成，关闭下载任务
                      console.log('任务完成，关闭下载任务，下一次启动应用时将安装更新');
                      downloadTask.abort();
                      downloadTask = null;
                    } });

                }
              } });

          } else {
            // console.log('下载地址未准备，无法开启下载任务')
          }


        } else if (currentId < latestId) {
          // console.log('检测到更新')
          var baiwei = parseInt(latestId / 100);
          var shiwei = parseInt(latestId % 100 / 10);
          var gewei = parseInt(latestId % 10);
          uni.showModal({
            title: '发现新版本',
            content: '有新版本可用 (版本号:' + baiwei + '.' + shiwei + '.' + gewei + ')，请问您是否更新？',
            success: function success(res) {
              if (res.confirm) {
                uni.navigateTo({
                  url: updaterPage });

              } else if (res.cancel) {
                console.log('取消');
              }
            } });

        } else {
          // console.log('现在是最新版本')
        }
      }

    } });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 85:
/*!***************************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/pages/Home/index/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _http = _interopRequireDefault(__webpack_require__(/*! ../../../store/http.js */ 45));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

{

  data: function data() {
    return {
      loadingType: 0, //加载状态

      guanggaoImg: '',
      amapPlugin: null,
      key: '980c4a9d17bc9c06a85d488adaac1f09',

      swiperImg: [], //轮播图片
      sort1: 0,
      url: this.$store.state.url,
      imgurl: this.$store.state.imgurl,
      icon: [],
      buyLimit: [],


      contrast: [{ name: '默认排序', title: '默认排序', type: 1 }, { name: '销量最高', title: '销量最高', type: 0 }, { name: '积分', title: '积分', type: 2 }, { name: '距离最近', title: '距离最近', type: 0 }],
      currentpage: 1,
      type: 1,
      location: null,
      shops: [] };



  },

  created: function created() {

    // this.getLabels(); //获取商户分类图标
    // this.getBannerList();
    // this.OneGetShops(  ); //获取商铺列表


  },

  methods: {


    // 获取逛街首页信息
    getBannerList: function getBannerList() {var _this = this;
      _http.default.urlRequest(
      this.url + '/api/index/getBannerList', { type: 1 }, {}, 'POST',
      function (res) {
        console.log('轮播图', res);
        _this.swiperImg = res.data.data.banner; //轮播图


      });


    },
    shopDetalis: function shopDetalis(id) {
      console.log(id);
      uni.navigateTo({
        url: "/pages/Home/category/list?id=" + id });

      switch (id) {
        case 8:
          // uni.navigateTo({
          // 	url:"/pages/Home/category/waimai?id="+id
          // })
          break;
        case 9:
          break;}

    },

    // 店铺点击事件
    merchantStore: function merchantStore(item) {
      uni.navigateTo({
        url: "../merchant/merchant?shopId=" + item.id });

    },




    // 排序点击事件
    sort: function sort(index) {
      this.sort1 = index;
      this.type = this.contrast[index].type;

      this.OneGetShops();

    } },

  onPullDownRefresh: function onPullDownRefresh() {
    this.getLocation();
    // 	this.getLabels();
    // this.OneGetShops();
    uni.stopPullDownRefresh(); //这里是防止下拉的回不去，回去效果卡顿
  },
  onReachBottom: function onReachBottom() {var _this2 = this;
    if (!this.isNewRenderDone) return;
    this.isNewRenderDone = false;
    console.log('上拉加载事件');
    // 每次拉到页面底部,请求页数自加
    this.currentpage++;
    if (this.loadingType != 0) {// loadingType!=0;直接返回
      return false;
    }
    this.loadingType = 1;
    uni.showNavigationBarLoading(); // 显示加载动画
    // 第二次之后请求数据
    _http.default.urlRequest(
    this.url + '/api/guangjie/indexshop',
    { lng: this.location.longitude,
      lat: this.location.latitude,
      page: this.currentpage,

      type: this.contrast[this.sort1].type },

    {},
    'POST',
    function (res) {
      if (_this2.currentpage < res.data.data.pageTotal) {
        _this2.loadingType = 0;
      } else _this2.loadingType = 2;
      uni.hideNavigationBarLoading();
      _this2.shops = _this2.shops.concat(res.data.data.items);
      setTimeout(function () {
        _this2.$refs.wfalls.handleViewRender();
      }, 0);
    });


  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 86:
/*!****************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/common/util.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude);
  }

  longitude = longitude;
  latitude = latitude;

  return {
    longitude: longitude.toString(),
    latitude: latitude.toString() };

}
function getImgUrl(url) {
  if (url.search('http') == -1) {url = "https://xin.yiyunoto.com" + url;}
  return url;
}
function convertTimeToFormat(timeStamp) {

  var curTime = Math.ceil(new Date().getTime() / 1000);
  var time = curTime - timeStamp;


  if (time < 60 && time >= 0) {
    return "刚刚";
  } else if (time >= 60 && time < 3600) {
    return Math.ceil(time / 60) + "分钟前";
  } else if (time >= 3600 && time < 3600 * 24) {
    return Math.ceil(time / 3600) + "小时前";
  } else if (time >= 3600 * 24 && time < 3600 * 24 * 30) {
    return Math.ceil(time / 3600 / 24) + "天前";
  } else if (time >= 3600 * 24 * 30 && time < 3600 * 24 * 30 * 12) {
    return Math.ceil(time / 3600 / 24 / 30) + "个月前";
  } else if (time >= 3600 * 24 * 30 * 12) {
    return Math.ceil(time / 3600 / 24 / 30 / 12) + "年前";
  } else {
    return "刚刚";
  }
}

module.exports = {
  getImgUrl: getImgUrl,
  formatLocation: formatLocation,
  convertTimeToFormat: convertTimeToFormat };

/***/ }),

/***/ 9:
/*!*********************************************************!*\
  !*** C:/Users/17311/Desktop/yunjia/sdk/libs/strophe.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var __WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_0__module;var __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_1__module;var __WEBPACK_LOCAL_MODULE_2__, __WEBPACK_LOCAL_MODULE_2__module;var __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_3__module;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_4__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_5__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_6__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_7__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/** File: strophe.js
 *  A JavaScript library for writing XMPP clients.
 *
 *  This library uses either Bidirectional-streams Over Synchronous HTTP (BOSH)
 *  to emulate a persistent, stateful, two-way connection to an XMPP server or
 *  alternatively WebSockets.
 *
 *  More information on BOSH can be found in XEP 124.
 *  For more information on XMPP-over WebSocket see this RFC:
 *  http://tools.ietf.org/html/rfc7395
 */

/* All of the Strophe globals are defined in this special function below so
     * that references to the globals become closures.  This will ensure that
     * on page reload, these references will still be available to callbacks
     * that are still executing.
     */
// //console.log(window,document)

var isSocketConnnected = false;
var xmldom = __webpack_require__(/*! ./xmldom/dom-parser */ 10);
// //console.log('xml', xmldom, typeof xmldom.DOMParser);
var DOMParser = xmldom.DOMParser;
//console.log('DOMParser inited');
var document = new DOMParser().parseFromString("<?xml version='1.0'?>\n", 'text/xml');
//console.log('document inited');
var window = window || {};
window.DOMParser = DOMParser;

//console.log('strophe ...')
var Strophe = null;
var $build = null;
var $msg = null;
var $iq = null;
var $pres = null;
/* jshint ignore:start */
(function (callback) {
  /* jshint ignore:end */

  // This code was written by Tyler Akins and has been placed in the
  // public domain.  It would be nice if you left this header intact.
  // Base64 code from Tyler Akins -- http://rumkin.com
  //module.exports = callback();

  (function (root, factory) {
    //console.log(typeof define, define.amd, root)
    if (true) {
      !(__WEBPACK_LOCAL_MODULE_0__module = { id: "strophe-base64", exports: {}, loaded: false }, __WEBPACK_LOCAL_MODULE_0__ = function () {
        return factory();
      }.call(__WEBPACK_LOCAL_MODULE_0__module.exports, __webpack_require__, __WEBPACK_LOCAL_MODULE_0__module.exports, __WEBPACK_LOCAL_MODULE_0__module), __WEBPACK_LOCAL_MODULE_0__module.loaded = true, __WEBPACK_LOCAL_MODULE_0__ === undefined && (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__module.exports));
    } else
    {}
  })(this, function () {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    var obj = {
      /**
                 * Encodes a string in base64
                 * @param {String} input The string to encode in base64.
                 */
      encode: function encode(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        do {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = (chr1 & 3) << 4 | chr2 >> 4;
          enc3 = (chr2 & 15) << 2 | chr3 >> 6;
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc2 = (chr1 & 3) << 4;
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
          keyStr.charAt(enc3) + keyStr.charAt(enc4);
        } while (i < input.length);

        return output;
      },

      /**
          * Decodes a base64 string.
          * @param {String} input The string to decode.
          */
      decode: function decode(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
          enc1 = keyStr.indexOf(input.charAt(i++));
          enc2 = keyStr.indexOf(input.charAt(i++));
          enc3 = keyStr.indexOf(input.charAt(i++));
          enc4 = keyStr.indexOf(input.charAt(i++));

          chr1 = enc1 << 2 | enc2 >> 4;
          chr2 = (enc2 & 15) << 4 | enc3 >> 2;
          chr3 = (enc3 & 3) << 6 | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }
        } while (i < input.length);

        return output;
      } };

    return obj;
  });
  /*
       * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
       * in FIPS PUB 180-1
       * Version 2.1a Copyright Paul Johnston 2000 - 2002.
       * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
       * Distributed under the BSD License
       * See http://pajhome.org.uk/crypt/md5 for details.
       */

  /* jshint undef: true, unused: true:, noarg: true, latedef: false */
  /* global define */

  /* Some functions and variables have been stripped for use with Strophe */

  (function (root, factory) {
    if (true) {
      !(__WEBPACK_LOCAL_MODULE_1__module = { id: "strophe-sha1", exports: {}, loaded: false }, __WEBPACK_LOCAL_MODULE_1__ = function () {
        return factory();
      }.call(__WEBPACK_LOCAL_MODULE_1__module.exports, __webpack_require__, __WEBPACK_LOCAL_MODULE_1__module.exports, __WEBPACK_LOCAL_MODULE_1__module), __WEBPACK_LOCAL_MODULE_1__module.loaded = true, __WEBPACK_LOCAL_MODULE_1__ === undefined && (__WEBPACK_LOCAL_MODULE_1__ = __WEBPACK_LOCAL_MODULE_1__module.exports));
    } else {}
  })(this, function () {

    /*
                         * Calculate the SHA-1 of an array of big-endian words, and a bit length
                         */
    function core_sha1(x, len) {
      /* append padding */
      x[len >> 5] |= 0x80 << 24 - len % 32;
      x[(len + 64 >> 9 << 4) + 15] = len;

      var w = new Array(80);
      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;
      var e = -1009589776;

      var i, j, t, olda, oldb, oldc, oldd, olde;
      for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        olde = e;

        for (j = 0; j < 80; j++) {
          if (j < 16) {
            w[j] = x[i + j];
          } else
          {
            w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
          }
          t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
          safe_add(safe_add(e, w[j]), sha1_kt(j)));
          e = d;
          d = c;
          c = rol(b, 30);
          b = a;
          a = t;
        }

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
      }
      return [a, b, c, d, e];
    }

    /*
       * Perform the appropriate triplet combination function for the current
       * iteration
       */
    function sha1_ft(t, b, c, d) {
      if (t < 20) {
        return b & c | ~b & d;
      }
      if (t < 40) {
        return b ^ c ^ d;
      }
      if (t < 60) {
        return b & c | b & d | c & d;
      }
      return b ^ c ^ d;
    }

    /*
       * Determine the appropriate additive constant for the current iteration
       */
    function sha1_kt(t) {
      return t < 20 ? 1518500249 : t < 40 ? 1859775393 :
      t < 60 ? -1894007588 : -899497514;
    }

    /*
       * Calculate the HMAC-SHA1 of a key and some data
       */
    function core_hmac_sha1(key, data) {
      var bkey = str2binb(key);
      if (bkey.length > 16) {
        bkey = core_sha1(bkey, key.length * 8);
      }

      var ipad = new Array(16),opad = new Array(16);
      for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
      }

      var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * 8);
      return core_sha1(opad.concat(hash), 512 + 160);
    }

    /*
       * Add integers, wrapping at 2^32. This uses 16-bit operations internally
       * to work around bugs in some JS interpreters.
       */
    function safe_add(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 0xFFFF;
    }

    /*
       * Bitwise rotate a 32-bit number to the left.
       */
    function rol(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }

    /*
       * Convert an 8-bit or 16-bit string to an array of big-endian words
       * In 8-bit function, characters >255 have their hi-byte silently ignored.
       */
    function str2binb(str) {
      var bin = [];
      var mask = 255;
      for (var i = 0; i < str.length * 8; i += 8) {
        bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << 24 - i % 32;
      }
      return bin;
    }

    /*
       * Convert an array of big-endian words to a string
       */
    function binb2str(bin) {
      var str = "";
      var mask = 255;
      for (var i = 0; i < bin.length * 32; i += 8) {
        str += String.fromCharCode(bin[i >> 5] >>> 24 - i % 32 & mask);
      }
      return str;
    }

    /*
       * Convert an array of big-endian words to a base-64 string
       */
    function binb2b64(binarray) {
      var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var str = "";
      var triplet, j;
      for (var i = 0; i < binarray.length * 4; i += 3) {
        triplet = (binarray[i >> 2] >> 8 * (3 - i % 4) & 0xFF) << 16 |
        (binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4) & 0xFF) << 8 |
        binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4) & 0xFF;
        for (j = 0; j < 4; j++) {
          if (i * 8 + j * 6 > binarray.length * 32) {
            str += "=";
          } else
          {
            str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
          }
        }
      }
      return str;
    }

    /*
       * These are the functions you'll usually want to call
       * They take string arguments and return either hex or base-64 encoded strings
       */
    return {
      b64_hmac_sha1: function b64_hmac_sha1(key, data) {
        return binb2b64(core_hmac_sha1(key, data));
      },
      b64_sha1: function b64_sha1(s) {
        return binb2b64(core_sha1(str2binb(s), s.length * 8));
      },
      binb2str: binb2str,
      core_hmac_sha1: core_hmac_sha1,
      str_hmac_sha1: function str_hmac_sha1(key, data) {
        return binb2str(core_hmac_sha1(key, data));
      },
      str_sha1: function str_sha1(s) {
        return binb2str(core_sha1(str2binb(s), s.length * 8));
      } };

  });

  /*
       * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
       * Digest Algorithm, as defined in RFC 1321.
       * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
       * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
       * Distributed under the BSD License
       * See http://pajhome.org.uk/crypt/md5 for more info.
       */

  /*
           * Everything that isn't used by Strophe has been stripped here!
           */

  (function (root, factory) {
    if (true) {
      !(__WEBPACK_LOCAL_MODULE_2__module = { id: "strophe-md5", exports: {}, loaded: false }, __WEBPACK_LOCAL_MODULE_2__ = function () {
        return factory();
      }.call(__WEBPACK_LOCAL_MODULE_2__module.exports, __webpack_require__, __WEBPACK_LOCAL_MODULE_2__module.exports, __WEBPACK_LOCAL_MODULE_2__module), __WEBPACK_LOCAL_MODULE_2__module.loaded = true, __WEBPACK_LOCAL_MODULE_2__ === undefined && (__WEBPACK_LOCAL_MODULE_2__ = __WEBPACK_LOCAL_MODULE_2__module.exports));
    } else {}
  })(this, function (b) {
    /*
                          * Add integers, wrapping at 2^32. This uses 16-bit operations internally
                          * to work around bugs in some JS interpreters.
                          */
    var safe_add = function safe_add(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 0xFFFF;
    };

    /*
        * Bitwise rotate a 32-bit number to the left.
        */
    var bit_rol = function bit_rol(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    };

    /*
        * Convert a string to an array of little-endian words
        */
    var str2binl = function str2binl(str) {
      var bin = [];
      for (var i = 0; i < str.length * 8; i += 8) {
        bin[i >> 5] |= (str.charCodeAt(i / 8) & 255) << i % 32;
      }
      return bin;
    };

    /*
        * Convert an array of little-endian words to a string
        */
    var binl2str = function binl2str(bin) {
      var str = "";
      for (var i = 0; i < bin.length * 32; i += 8) {
        str += String.fromCharCode(bin[i >> 5] >>> i % 32 & 255);
      }
      return str;
    };

    /*
        * Convert an array of little-endian words to a hex string.
        */
    var binl2hex = function binl2hex(binarray) {
      var hex_tab = "0123456789abcdef";
      var str = "";
      for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) +
        hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
      }
      return str;
    };

    /*
        * These functions implement the four basic operations the algorithm uses.
        */
    var md5_cmn = function md5_cmn(q, a, b, x, s, t) {
      return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    };

    var md5_ff = function md5_ff(a, b, c, d, x, s, t) {
      return md5_cmn(b & c | ~b & d, a, b, x, s, t);
    };

    var md5_gg = function md5_gg(a, b, c, d, x, s, t) {
      return md5_cmn(b & d | c & ~d, a, b, x, s, t);
    };

    var md5_hh = function md5_hh(a, b, c, d, x, s, t) {
      return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    };

    var md5_ii = function md5_ii(a, b, c, d, x, s, t) {
      return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
    };

    /*
        * Calculate the MD5 of an array of little-endian words, and a bit length
        */
    var core_md5 = function core_md5(x, len) {
      /* append padding */
      x[len >> 5] |= 0x80 << len % 32;
      x[(len + 64 >>> 9 << 4) + 14] = len;

      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;

      var olda, oldb, oldc, oldd;
      for (var i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;

        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
      }
      return [a, b, c, d];
    };

    var obj = {
      /*
                 * These are the functions you'll usually want to call.
                 * They take string arguments and return either hex or base-64 encoded
                 * strings.
                 */
      hexdigest: function hexdigest(s) {
        return binl2hex(core_md5(str2binl(s), s.length * 8));
      },

      hash: function hash(s) {
        return binl2str(core_md5(str2binl(s), s.length * 8));
      } };

    return obj;
  });

  (function (root, factory) {
    if (true) {
      !(__WEBPACK_LOCAL_MODULE_3__module = { id: "strophe-utils", exports: {}, loaded: false }, __WEBPACK_LOCAL_MODULE_3__ = function () {
        return factory();
      }.call(__WEBPACK_LOCAL_MODULE_3__module.exports, __webpack_require__, __WEBPACK_LOCAL_MODULE_3__module.exports, __WEBPACK_LOCAL_MODULE_3__module), __WEBPACK_LOCAL_MODULE_3__module.loaded = true, __WEBPACK_LOCAL_MODULE_3__ === undefined && (__WEBPACK_LOCAL_MODULE_3__ = __WEBPACK_LOCAL_MODULE_3__module.exports));
    } else {}
  })(this, function () {

    var utils = {

      utf16to8: function utf16to8(str) {
        var i, c;
        var out = "";
        var len = str.length;
        for (i = 0; i < len; i++) {
          c = str.charCodeAt(i);
          if (c >= 0x0000 && c <= 0x007F) {
            out += str.charAt(i);
          } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
            out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
            out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
          } else {
            out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
            out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
          }
        }
        return out;
      },

      addCookies: function addCookies(cookies) {
        /* Parameters:
                                                 *  (Object) cookies - either a map of cookie names
                                                 *    to string values or to maps of cookie values.
                                                 *
                                                 * For example:
                                                 * { "myCookie": "1234" }
                                                 *
                                                 * or:
                                                 * { "myCookie": {
                                                 *      "value": "1234",
                                                 *      "domain": ".example.org",
                                                 *      "path": "/",
                                                 *      "expires": expirationDate
                                                 *      }
                                                 *  }
                                                 *
                                                 *  These values get passed to Strophe.Connection via
                                                 *   options.cookies
                                                 */
        var cookieName, cookieObj, isObj, cookieValue, expires, domain, path;
        for (cookieName in cookies || {}) {
          expires = '';
          domain = '';
          path = '';
          cookieObj = cookies[cookieName];
          isObj = typeof cookieObj == "object";
          cookieValue = escape(unescape(isObj ? cookieObj.value : cookieObj));
          if (isObj) {
            expires = cookieObj.expires ? ";expires=" + cookieObj.expires : '';
            domain = cookieObj.domain ? ";domain=" + cookieObj.domain : '';
            path = cookieObj.path ? ";path=" + cookieObj.path : '';
          }
          document.cookie =
          cookieName + '=' + cookieValue + expires + domain + path;
        }
      } };

    return utils;
  });

  /*
       This program is distributed under the terms of the MIT license.
       Please see the LICENSE file for details.
      	 Copyright 2006-2008, OGG, LLC
       */


  /* jshint undef: true, unused: true:, noarg: true, latedef: true */
  /* global define */

  (function (root, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_LOCAL_MODULE_4__ = ((function () {
        return factory();
      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)));
    } else {}
  })(this, function () {

    /** Function: Function.prototype.bind
                         *  Bind a function to an instance.
                         *
                         *  This Function object extension method creates a bound method similar
                         *  to those in Python.  This means that the 'this' object will point
                         *  to the instance you want.  See
                         *  <a href='https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind'>MDC's bind() documentation</a> and
                         *  <a href='http://benjamin.smedbergs.us/blog/2007-01-03/bound-functions-and-function-imports-in-javascript/'>Bound Functions and Function Imports in JavaScript</a>
                         *  for a complete explanation.
                         *
                         *  This extension already exists in some browsers (namely, Firefox 3), but
                         *  we provide it to support those that don't.
                         *
                         *  Parameters:
                         *    (Object) obj - The object that will become 'this' in the bound function.
                         *    (Object) argN - An option argument that will be prepended to the
                         *      arguments given for the function call
                         *
                         *  Returns:
                         *    The bound function.
                         */
    if (!Function.prototype.bind) {
      Function.prototype.bind = function (obj /*, arg1, arg2, ... */) {
        var func = this;
        var _slice = Array.prototype.slice;
        var _concat = Array.prototype.concat;
        var _args = _slice.call(arguments, 1);
        return function () {
          return func.apply(obj ? obj : this, _concat.call(_args, _slice.call(arguments, 0)));
        };
      };
    }

    /** Function: Array.isArray
       *  This is a polyfill for the ES5 Array.isArray method.
       */
    if (!Array.isArray) {
      Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
      };
    }

    /** Function: Array.prototype.indexOf
       *  Return the index of an object in an array.
       *
       *  This function is not supplied by some JavaScript implementations, so
       *  we provide it if it is missing.  This code is from:
       *  http://developer.mozilla.org/En/Core_JavaScript_1.5_Reference:Objects:Array:indexOf
       *
       *  Parameters:
       *    (Object) elt - The object to look for.
       *    (Integer) from - The index from which to start looking. (optional).
       *
       *  Returns:
       *    The index of elt in the array or -1 if not found.
       */
    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length;
        var from = Number(arguments[1]) || 0;
        from = from < 0 ? Math.ceil(from) : Math.floor(from);
        if (from < 0) {
          from += len;
        }

        for (; from < len; from++) {
          if (from in this && this[from] === elt) {
            return from;
          }
        }
        return -1;
      };
    }
  });


  /** Function: Array.prototype.forEach
       *
       *  This function is not available in IE < 9
       *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
       */
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
      var T, k;
      if (this === null) {
        throw new TypeError(' this is null or not defined');
      }

      // 1. Let O be the result of calling toObject() passing the
      // |this| value as the argument.
      var O = Object(this);
      // 2. Let lenValue be the result of calling the Get() internal
      // method of O with the argument "length".
      // 3. Let len be toUint32(lenValue).
      var len = O.length >>> 0;
      // 4. If isCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11
      if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function');
      }
      // 5. If thisArg was supplied, let T be thisArg; else let
      // T be undefined.
      if (arguments.length > 1) {
        T = thisArg;
      }
      // 6. Let k be 0
      k = 0;
      // 7. Repeat, while k < len
      while (k < len) {
        var kValue;
        // a. Let Pk be ToString(k).
        //        This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty
        //        internal method of O with argument Pk.
        //        This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {
          // i. Let kValue be the result of calling the Get internal
          // method of O with argument Pk.
          kValue = O[k];
          // ii. Call the Call internal method of callback with T as
          // the this value and argument list containing kValue, k, and O.
          callback.call(T, kValue, k, O);
        }
        // d. Increase k by 1.
        k++;
      }
      // 8. return undefined
    };
  }

  /*
     This program is distributed under the terms of the MIT license.
     Please see the LICENSE file for details.
    	 Copyright 2006-2008, OGG, LLC
     */


  /* jshint undef: true, unused: true:, noarg: true, latedef: true */
  /*global define, document, window, setTimeout, clearTimeout, ActiveXObject, DOMParser */

  (function (root, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __WEBPACK_LOCAL_MODULE_1__,
      __WEBPACK_LOCAL_MODULE_0__,
      __WEBPACK_LOCAL_MODULE_2__,
      __WEBPACK_LOCAL_MODULE_3__,
      __WEBPACK_LOCAL_MODULE_4__], __WEBPACK_LOCAL_MODULE_5__ = ((function () {
        return factory.apply(this, arguments);
      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)));
    } else { var o; }
  })(this, function (SHA1, Base64, MD5, utils, Strophe) {

    var Strophe;

    /** Function: $build
                  *  Create a Strophe.Builder.
                  *  This is an alias for 'new Strophe.Builder(name, attrs)'.
                  *
                  *  Parameters:
                  *    (String) name - The root element name.
                  *    (Object) attrs - The attributes for the root element in object notation.
                  *
                  *  Returns:
                  *    A new Strophe.Builder object.
                  */
    function $build(name, attrs) {
      return new Strophe.Builder(name, attrs);
    }

    /** Function: $msg
       *  Create a Strophe.Builder with a <message/> element as the root.
       *
       *  Parameters:
       *    (Object) attrs - The <message/> element attributes in object notation.
       *
       *  Returns:
       *    A new Strophe.Builder object.
       */
    function $msg(attrs) {
      return new Strophe.Builder("message", attrs);
    }

    /** Function: $iq
       *  Create a Strophe.Builder with an <iq/> element as the root.
       *
       *  Parameters:
       *    (Object) attrs - The <iq/> element attributes in object notation.
       *
       *  Returns:
       *    A new Strophe.Builder object.
       */
    function $iq(attrs) {
      return new Strophe.Builder("iq", attrs);
    }

    /** Function: $pres
       *  Create a Strophe.Builder with a <presence/> element as the root.
       *
       *  Parameters:
       *    (Object) attrs - The <presence/> element attributes in object notation.
       *
       *  Returns:
       *    A new Strophe.Builder object.
       */
    function $pres(attrs) {
      return new Strophe.Builder("presence", attrs);
    }

    /** Class: Strophe
       *  An object container for all Strophe library functions.
       *
       *  This class is just a container for all the objects and constants
       *  used in the library.  It is not meant to be instantiated, but to
       *  provide a namespace for library objects, constants, and functions.
       */
    Strophe = {
      /** Constant: VERSION
                 *  The version of the Strophe library. Unreleased builds will have
                 *  a version of head-HASH where HASH is a partial revision.
                 */
      VERSION: "1.2.9",

      /** Constants: XMPP Namespace Constants
                         *  Common namespace constants from the XMPP RFCs and XEPs.
                         *
                         *  NS.HTTPBIND - HTTP BIND namespace from XEP 124.
                         *  NS.BOSH - BOSH namespace from XEP 206.
                         *  NS.CLIENT - Main XMPP client namespace.
                         *  NS.AUTH - Legacy authentication namespace.
                         *  NS.ROSTER - Roster operations namespace.
                         *  NS.PROFILE - Profile namespace.
                         *  NS.DISCO_INFO - Service discovery info namespace from XEP 30.
                         *  NS.DISCO_ITEMS - Service discovery items namespace from XEP 30.
                         *  NS.MUC - Multi-User Chat namespace from XEP 45.
                         *  NS.SASL - XMPP SASL namespace from RFC 3920.
                         *  NS.STREAM - XMPP Streams namespace from RFC 3920.
                         *  NS.BIND - XMPP Binding namespace from RFC 3920.
                         *  NS.SESSION - XMPP Session namespace from RFC 3920.
                         *  NS.XHTML_IM - XHTML-IM namespace from XEP 71.
                         *  NS.XHTML - XHTML body namespace from XEP 71.
                         */
      NS: {
        HTTPBIND: "http://jabber.org/protocol/httpbind",
        BOSH: "urn:xmpp:xbosh",
        CLIENT: "jabber:client",
        AUTH: "jabber:iq:auth",
        ROSTER: "jabber:iq:roster",
        PROFILE: "jabber:iq:profile",
        DISCO_INFO: "http://jabber.org/protocol/disco#info",
        DISCO_ITEMS: "http://jabber.org/protocol/disco#items",
        MUC: "http://jabber.org/protocol/muc",
        SASL: "urn:ietf:params:xml:ns:xmpp-sasl",
        STREAM: "http://etherx.jabber.org/streams",
        FRAMING: "urn:ietf:params:xml:ns:xmpp-framing",
        BIND: "urn:ietf:params:xml:ns:xmpp-bind",
        SESSION: "urn:ietf:params:xml:ns:xmpp-session",
        VERSION: "jabber:iq:version",
        STANZAS: "urn:ietf:params:xml:ns:xmpp-stanzas",
        XHTML_IM: "http://jabber.org/protocol/xhtml-im",
        XHTML: "http://www.w3.org/1999/xhtml" },


      /** Constants: XHTML_IM Namespace
                                                  *  contains allowed tags, tag attributes, and css properties.
                                                  *  Used in the createHtml function to filter incoming html into the allowed XHTML-IM subset.
                                                  *  See http://xmpp.org/extensions/xep-0071.html#profile-summary for the list of recommended
                                                  *  allowed tags and their attributes.
                                                  */
      XHTML: {
        tags: ['a', 'blockquote', 'br', 'cite', 'em', 'img', 'li', 'ol', 'p', 'span', 'strong', 'ul', 'body'],
        attributes: {
          'a': ['href'],
          'blockquote': ['style'],
          'br': [],
          'cite': ['style'],
          'em': [],
          'img': ['src', 'alt', 'style', 'height', 'width'],
          'li': ['style'],
          'ol': ['style'],
          'p': ['style'],
          'span': ['style'],
          'strong': [],
          'ul': ['style'],
          'body': [] },

        css: ['background-color', 'color', 'font-family', 'font-size', 'font-style', 'font-weight', 'margin-left', 'margin-right', 'text-align', 'text-decoration'],
        /** Function: XHTML.validTag
                                                                                                                                                                      *
                                                                                                                                                                      * Utility method to determine whether a tag is allowed
                                                                                                                                                                      * in the XHTML_IM namespace.
                                                                                                                                                                      *
                                                                                                                                                                      * XHTML tag names are case sensitive and must be lower case.
                                                                                                                                                                      */
        validTag: function validTag(tag) {
          for (var i = 0; i < Strophe.XHTML.tags.length; i++) {
            if (tag == Strophe.XHTML.tags[i]) {
              return true;
            }
          }
          return false;
        },
        /** Function: XHTML.validAttribute
            *
            * Utility method to determine whether an attribute is allowed
            * as recommended per XEP-0071
            *
            * XHTML attribute names are case sensitive and must be lower case.
            */
        validAttribute: function validAttribute(tag, attribute) {
          if (typeof Strophe.XHTML.attributes[tag] !== 'undefined' && Strophe.XHTML.attributes[tag].length > 0) {
            for (var i = 0; i < Strophe.XHTML.attributes[tag].length; i++) {
              if (attribute == Strophe.XHTML.attributes[tag][i]) {
                return true;
              }
            }
          }
          return false;
        },
        validCSS: function validCSS(style) {
          for (var i = 0; i < Strophe.XHTML.css.length; i++) {
            if (style == Strophe.XHTML.css[i]) {
              return true;
            }
          }
          return false;
        } },


      /** Constants: Connection Status Constants
              *  Connection status constants for use by the connection handler
              *  callback.
              *
              *  Status.ERROR - An error has occurred
              *  Status.CONNECTING - The connection is currently being made
              *  Status.CONNFAIL - The connection attempt failed
              *  Status.AUTHENTICATING - The connection is authenticating
              *  Status.AUTHFAIL - The authentication attempt failed
              *  Status.CONNECTED - The connection has succeeded
              *  Status.DISCONNECTED - The connection has been terminated
              *  Status.DISCONNECTING - The connection is currently being terminated
              *  Status.ATTACHED - The connection has been attached
              *  Status.CONNTIMEOUT - The connection has timed out
              */
      Status: {
        ERROR: 0,
        CONNECTING: 1,
        CONNFAIL: 2,
        AUTHENTICATING: 3,
        AUTHFAIL: 4,
        CONNECTED: 5,
        DISCONNECTED: 6,
        DISCONNECTING: 7,
        ATTACHED: 8,
        REDIRECT: 9,
        CONNTIMEOUT: 10 },


      /** Constants: Log Level Constants
                            *  Logging level indicators.
                            *
                            *  LogLevel.DEBUG - Debug output
                            *  LogLevel.INFO - Informational output
                            *  LogLevel.WARN - Warnings
                            *  LogLevel.ERROR - Errors
                            *  LogLevel.FATAL - Fatal errors
                            */
      LogLevel: {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        FATAL: 4 },


      /** PrivateConstants: DOM Element Type Constants
                     *  DOM element types.
                     *
                     *  ElementType.NORMAL - Normal element.
                     *  ElementType.TEXT - Text data element.
                     *  ElementType.FRAGMENT - XHTML fragment element.
                     */
      ElementType: {
        NORMAL: 1,
        TEXT: 3,
        CDATA: 4,
        FRAGMENT: 11 },


      /** PrivateConstants: Timeout Values
                         *  Timeout values for error states.  These values are in seconds.
                         *  These should not be changed unless you know exactly what you are
                         *  doing.
                         *
                         *  TIMEOUT - Timeout multiplier. A waiting request will be considered
                         *      failed after Math.floor(TIMEOUT * wait) seconds have elapsed.
                         *      This defaults to 1.1, and with default wait, 66 seconds.
                         *  SECONDARY_TIMEOUT - Secondary timeout multiplier. In cases where
                         *      Strophe can detect early failure, it will consider the request
                         *      failed if it doesn't return after
                         *      Math.floor(SECONDARY_TIMEOUT * wait) seconds have elapsed.
                         *      This defaults to 0.1, and with default wait, 6 seconds.
                         */
      TIMEOUT: 1.1,
      SECONDARY_TIMEOUT: 0.1,

      /** Function: addNamespace
                               *  This function is used to extend the current namespaces in
                               *  Strophe.NS.  It takes a key and a value with the key being the
                               *  name of the new namespace, with its actual value.
                               *  For example:
                               *  Strophe.addNamespace('PUBSUB', "http://jabber.org/protocol/pubsub");
                               *
                               *  Parameters:
                               *    (String) name - The name under which the namespace will be
                               *      referenced under Strophe.NS
                               *    (String) value - The actual namespace.
                               */
      addNamespace: function addNamespace(name, value) {
        Strophe.NS[name] = value;
      },

      /** Function: forEachChild
          *  Map a function over some or all child elements of a given element.
          *
          *  This is a small convenience function for mapping a function over
          *  some or all of the children of an element.  If elemName is null, all
          *  children will be passed to the function, otherwise only children
          *  whose tag names match elemName will be passed.
          *
          *  Parameters:
          *    (XMLElement) elem - The element to operate on.
          *    (String) elemName - The child element tag name filter.
          *    (Function) func - The function to apply to each child.  This
          *      function should take a single argument, a DOM element.
          */
      forEachChild: function forEachChild(elem, elemName, func) {
        var i, childNode;
        for (i = 0; i < elem.childNodes.length; i++) {
          childNode = elem.childNodes[i];
          if (childNode.nodeType == Strophe.ElementType.NORMAL && (
          !elemName || this.isTagEqual(childNode, elemName))) {
            func(childNode);
          }
        }
      },

      /** Function: isTagEqual
          *  Compare an element's tag name with a string.
          *
          *  This function is case sensitive.
          *
          *  Parameters:
          *    (XMLElement) el - A DOM element.
          *    (String) name - The element name.
          *
          *  Returns:
          *    true if the element's tag name matches _el_, and false
          *    otherwise.
          */
      isTagEqual: function isTagEqual(el, name) {
        return el.tagName == name;
      },

      /** PrivateVariable: _xmlGenerator
          *  _Private_ variable that caches a DOM document to
          *  generate elements.
          */
      _xmlGenerator: null,

      /** PrivateFunction: _makeGenerator
                            *  _Private_ function that creates a dummy XML DOM document to serve as
                            *  an element and text node generator.
                            */
      _makeGenerator: function _makeGenerator() {
        var doc;
        // IE9 does implement createDocument(); however, using it will cause the browser to leak memory on page unload.
        // Here, we test for presence of createDocument() plus IE's proprietary documentMode attribute, which would be
        // less than 10 in the case of IE9 and below.
        if (document.implementation.createDocument === undefined ||
        document.implementation.createDocument && document.documentMode && document.documentMode < 10) {
          doc = this._getIEXmlDom();
          doc.appendChild(doc.createElement('strophe'));
        } else {
          doc = document.implementation.
          createDocument('jabber:client', 'strophe', null);
        }
        return doc;
      },

      /** Function: xmlGenerator
          *  Get the DOM document to generate elements.
          *
          *  Returns:
          *    The currently used DOM document.
          */
      xmlGenerator: function xmlGenerator() {
        if (!Strophe._xmlGenerator) {
          Strophe._xmlGenerator = Strophe._makeGenerator();
        }
        return Strophe._xmlGenerator;
      },

      /** PrivateFunction: _getIEXmlDom
          *  Gets IE xml doc object
          *
          *  Returns:
          *    A Microsoft XML DOM Object
          *  See Also:
          *    http://msdn.microsoft.com/en-us/library/ms757837%28VS.85%29.aspx
          */
      _getIEXmlDom: function _getIEXmlDom() {
        var doc = null;
        var docStrings = [
        "Msxml2.DOMDocument.6.0",
        "Msxml2.DOMDocument.5.0",
        "Msxml2.DOMDocument.4.0",
        "MSXML2.DOMDocument.3.0",
        "MSXML2.DOMDocument",
        "MSXML.DOMDocument",
        "Microsoft.XMLDOM"];


        for (var d = 0; d < docStrings.length; d++) {
          if (doc === null) {
            try {
              doc = new ActiveXObject(docStrings[d]);
            } catch (e) {
              doc = null;
            }
          } else {
            break;
          }
        }
        return doc;
      },

      /** Function: xmlElement
          *  Create an XML DOM element.
          *
          *  This function creates an XML DOM element correctly across all
          *  implementations. Note that these are not HTML DOM elements, which
          *  aren't appropriate for XMPP stanzas.
          *
          *  Parameters:
          *    (String) name - The name for the element.
          *    (Array|Object) attrs - An optional array or object containing
          *      key/value pairs to use as element attributes. The object should
          *      be in the format {'key': 'value'} or {key: 'value'}. The array
          *      should have the format [['key1', 'value1'], ['key2', 'value2']].
          *    (String) text - The text child data for the element.
          *
          *  Returns:
          *    A new XML DOM element.
          */
      xmlElement: function xmlElement(name) {
        if (!name) {
          return null;
        }

        var node = Strophe.xmlGenerator().createElement(name);
        // FIXME: this should throw errors if args are the wrong type or
        // there are more than two optional args
        var a, i, k;
        for (a = 1; a < arguments.length; a++) {
          var arg = arguments[a];
          if (!arg) {
            continue;
          }
          if (typeof arg == "string" ||
          typeof arg == "number") {
            node.appendChild(Strophe.xmlTextNode(arg));
          } else if (typeof arg == "object" &&
          typeof arg.sort == "function") {
            for (i = 0; i < arg.length; i++) {
              var attr = arg[i];
              if (typeof attr == "object" &&
              typeof attr.sort == "function" &&
              attr[1] !== undefined &&
              attr[1] !== null) {
                node.setAttribute(attr[0], attr[1]);
              }
            }
          } else if (typeof arg == "object") {
            for (k in arg) {
              if (arg.hasOwnProperty(k)) {
                if (arg[k] !== undefined &&
                arg[k] !== null) {
                  node.setAttribute(k, arg[k]);
                }
              }
            }
          }
        }

        return node;
      },

      /*  Function: xmlescape
          *  Excapes invalid xml characters.
          *
          *  Parameters:
          *     (String) text - text to escape.
          *
          *  Returns:
          *      Escaped text.
          */
      xmlescape: function xmlescape(text) {
        text = text.replace(/\&/g, "&amp;");
        text = text.replace(/</g, "&lt;");
        text = text.replace(/>/g, "&gt;");
        text = text.replace(/'/g, "&apos;");
        text = text.replace(/"/g, "&quot;");
        return text;
      },

      /*  Function: xmlunescape
          *  Unexcapes invalid xml characters.
          *
          *  Parameters:
          *     (String) text - text to unescape.
          *
          *  Returns:
          *      Unescaped text.
          */
      xmlunescape: function xmlunescape(text) {
        text = text.replace(/\&amp;/g, "&");
        text = text.replace(/&lt;/g, "<");
        text = text.replace(/&gt;/g, ">");
        text = text.replace(/&apos;/g, "'");
        text = text.replace(/&quot;/g, "\"");
        return text;
      },

      /** Function: xmlTextNode
          *  Creates an XML DOM text node.
          *
          *  Provides a cross implementation version of document.createTextNode.
          *
          *  Parameters:
          *    (String) text - The content of the text node.
          *
          *  Returns:
          *    A new XML DOM text node.
          */
      xmlTextNode: function xmlTextNode(text) {
        return Strophe.xmlGenerator().createTextNode(text);
      },

      /** Function: xmlHtmlNode
          *  Creates an XML DOM html node.
          *
          *  Parameters:
          *    (String) html - The content of the html node.
          *
          *  Returns:
          *    A new XML DOM text node.
          */
      xmlHtmlNode: function xmlHtmlNode(html) {
        var node;
        //ensure text is escaped
        //console.log('xmlhtmlnode init', window.DOMParser, typeof window.DOMParser)
        if (window.DOMParser) {
          var parser = new DOMParser();
          node = parser.parseFromString(html, "text/xml");
        } else {
          node = new ActiveXObject("Microsoft.XMLDOM");
          node.async = "false";
          node.loadXML(html);
        }
        return node;
      },

      /** Function: getText
          *  Get the concatenation of all text children of an element.
          *
          *  Parameters:
          *    (XMLElement) elem - A DOM element.
          *
          *  Returns:
          *    A String with the concatenated text of all text element children.
          */
      getText: function getText(elem) {
        if (!elem) {
          return null;
        }

        var str = "";
        if (elem.childNodes.length === 0 && elem.nodeType ==
        Strophe.ElementType.TEXT) {
          str += elem.nodeValue;
        }

        for (var i = 0; i < elem.childNodes.length; i++) {
          if (elem.childNodes[i].nodeType == Strophe.ElementType.TEXT) {
            str += elem.childNodes[i].nodeValue;
          }
        }

        return Strophe.xmlescape(str);
      },

      /** Function: copyElement
          *  Copy an XML DOM element.
          *
          *  This function copies a DOM element and all its descendants and returns
          *  the new copy.
          *
          *  Parameters:
          *    (XMLElement) elem - A DOM element.
          *
          *  Returns:
          *    A new, copied DOM element tree.
          */
      copyElement: function copyElement(elem) {
        var i, el;
        if (elem.nodeType == Strophe.ElementType.NORMAL) {
          el = Strophe.xmlElement(elem.tagName);

          for (i = 0; i < elem.attributes.length; i++) {
            el.setAttribute(elem.attributes[i].nodeName,
            elem.attributes[i].value);
          }

          for (i = 0; i < elem.childNodes.length; i++) {
            el.appendChild(Strophe.copyElement(elem.childNodes[i]));
          }
        } else if (elem.nodeType == Strophe.ElementType.TEXT) {
          el = Strophe.xmlGenerator().createTextNode(elem.nodeValue);
        }
        return el;
      },


      /** Function: createHtml
          *  Copy an HTML DOM element into an XML DOM.
          *
          *  This function copies a DOM element and all its descendants and returns
          *  the new copy.
          *
          *  Parameters:
          *    (HTMLElement) elem - A DOM element.
          *
          *  Returns:
          *    A new, copied DOM element tree.
          */
      createHtml: function createHtml(elem) {
        var i, el, j, tag, attribute, value, css, cssAttrs, attr, cssName, cssValue;
        if (elem.nodeType == Strophe.ElementType.NORMAL) {
          tag = elem.nodeName.toLowerCase(); // XHTML tags must be lower case.
          if (Strophe.XHTML.validTag(tag)) {
            try {
              el = Strophe.xmlElement(tag);
              for (i = 0; i < Strophe.XHTML.attributes[tag].length; i++) {
                attribute = Strophe.XHTML.attributes[tag][i];
                value = elem.getAttribute(attribute);
                if (typeof value == 'undefined' || value === null || value === '' || value === false || value === 0) {
                  continue;
                }
                if (attribute == 'style' && typeof value == 'object') {
                  if (typeof value.cssText != 'undefined') {
                    value = value.cssText; // we're dealing with IE, need to get CSS out
                  }
                }
                // filter out invalid css styles
                if (attribute == 'style') {
                  css = [];
                  cssAttrs = value.split(';');
                  for (j = 0; j < cssAttrs.length; j++) {
                    attr = cssAttrs[j].split(':');
                    cssName = attr[0].replace(/^\s*/, "").replace(/\s*$/, "").toLowerCase();
                    if (Strophe.XHTML.validCSS(cssName)) {
                      cssValue = attr[1].replace(/^\s*/, "").replace(/\s*$/, "");
                      css.push(cssName + ': ' + cssValue);
                    }
                  }
                  if (css.length > 0) {
                    value = css.join('; ');
                    el.setAttribute(attribute, value);
                  }
                } else {
                  el.setAttribute(attribute, value);
                }
              }

              for (i = 0; i < elem.childNodes.length; i++) {
                el.appendChild(Strophe.createHtml(elem.childNodes[i]));
              }
            } catch (e) {// invalid elements
              el = Strophe.xmlTextNode('');
            }
          } else {
            el = Strophe.xmlGenerator().createDocumentFragment();
            for (i = 0; i < elem.childNodes.length; i++) {
              el.appendChild(Strophe.createHtml(elem.childNodes[i]));
            }
          }
        } else if (elem.nodeType == Strophe.ElementType.FRAGMENT) {
          el = Strophe.xmlGenerator().createDocumentFragment();
          for (i = 0; i < elem.childNodes.length; i++) {
            el.appendChild(Strophe.createHtml(elem.childNodes[i]));
          }
        } else if (elem.nodeType == Strophe.ElementType.TEXT) {
          el = Strophe.xmlTextNode(elem.nodeValue);
        }
        return el;
      },

      /** Function: escapeNode
          *  Escape the node part (also called local part) of a JID.
          *
          *  Parameters:
          *    (String) node - A node (or local part).
          *
          *  Returns:
          *    An escaped node (or local part).
          */
      escapeNode: function escapeNode(node) {
        if (typeof node !== "string") {
          return node;
        }
        return node.replace(/^\s+|\s+$/g, '').
        replace(/\\/g, "\\5c").
        replace(/ /g, "\\20").
        replace(/\"/g, "\\22").
        replace(/\&/g, "\\26").
        replace(/\'/g, "\\27").
        replace(/\//g, "\\2f").
        replace(/:/g, "\\3a").
        replace(/</g, "\\3c").
        replace(/>/g, "\\3e").
        replace(/@/g, "\\40");
      },

      /** Function: unescapeNode
          *  Unescape a node part (also called local part) of a JID.
          *
          *  Parameters:
          *    (String) node - A node (or local part).
          *
          *  Returns:
          *    An unescaped node (or local part).
          */
      unescapeNode: function unescapeNode(node) {
        if (typeof node !== "string") {
          return node;
        }
        return node.replace(/\\20/g, " ").
        replace(/\\22/g, '"').
        replace(/\\26/g, "&").
        replace(/\\27/g, "'").
        replace(/\\2f/g, "/").
        replace(/\\3a/g, ":").
        replace(/\\3c/g, "<").
        replace(/\\3e/g, ">").
        replace(/\\40/g, "@").
        replace(/\\5c/g, "\\");
      },

      /** Function: getNodeFromJid
          *  Get the node portion of a JID String.
          *
          *  Parameters:
          *    (String) jid - A JID.
          *
          *  Returns:
          *    A String containing the node.
          */
      getNodeFromJid: function getNodeFromJid(jid) {
        if (jid.indexOf("@") < 0) {
          return null;
        }
        return jid.split("@")[0];
      },

      /** Function: getDomainFromJid
          *  Get the domain portion of a JID String.
          *
          *  Parameters:
          *    (String) jid - A JID.
          *
          *  Returns:
          *    A String containing the domain.
          */
      getDomainFromJid: function getDomainFromJid(jid) {
        var bare = Strophe.getBareJidFromJid(jid);
        if (bare.indexOf("@") < 0) {
          return bare;
        } else {
          var parts = bare.split("@");
          parts.splice(0, 1);
          return parts.join('@');
        }
      },

      /** Function: getResourceFromJid
          *  Get the resource portion of a JID String.
          *
          *  Parameters:
          *    (String) jid - A JID.
          *
          *  Returns:
          *    A String containing the resource.
          */
      getResourceFromJid: function getResourceFromJid(jid) {
        var s = jid.split("/");
        if (s.length < 2) {
          return null;
        }
        s.splice(0, 1);
        return s.join('/');
      },

      /** Function: getBareJidFromJid
          *  Get the bare JID from a JID String.
          *
          *  Parameters:
          *    (String) jid - A JID.
          *
          *  Returns:
          *    A String containing the bare JID.
          */
      getBareJidFromJid: function getBareJidFromJid(jid) {
        return jid ? jid.split("/")[0] : null;
      },

      /** PrivateFunction: _handleError
          *  _Private_ function that properly logs an error to the console
          */
      _handleError: function _handleError(e) {
        if (typeof e.stack !== "undefined") {
          Strophe.fatal(e.stack);
        }
        if (e.sourceURL) {
          Strophe.fatal("error: " + this.handler + " " + e.sourceURL + ":" +
          e.line + " - " + e.name + ": " + e.message);
        } else if (e.fileName) {
          Strophe.fatal("error: " + this.handler + " " +
          e.fileName + ":" + e.lineNumber + " - " +
          e.name + ": " + e.message);
        } else {
          Strophe.fatal("error: " + e.message);
        }
      },

      /** Function: log
          *  User overrideable logging function.
          *
          *  This function is called whenever the Strophe library calls any
          *  of the logging functions.  The default implementation of this
          *  function does nothing.  If client code wishes to handle the logging
          *  messages, it should override this with
          *  > Strophe.log = function (level, msg) {
         *  >   (user code here)
         *  > };
          *
          *  Please note that data sent and received over the wire is logged
          *  via Strophe.Connection.rawInput() and Strophe.Connection.rawOutput().
          *
          *  The different levels and their meanings are
          *
          *    DEBUG - Messages useful for debugging purposes.
          *    INFO - Informational messages.  This is mostly information like
          *      'disconnect was called' or 'SASL auth succeeded'.
          *    WARN - Warnings about potential problems.  This is mostly used
          *      to report transient connection errors like request timeouts.
          *    ERROR - Some error occurred.
          *    FATAL - A non-recoverable fatal error occurred.
          *
          *  Parameters:
          *    (Integer) level - The log level of the log message.  This will
          *      be one of the values in Strophe.LogLevel.
          *    (String) msg - The log message.
          */
      /* jshint ignore:start */
      log: function log(level, msg) {
        //console.log('log', level, msg);

        return;
      },
      /* jshint ignore:end */

      /** Function: debug
                               *  Log a message at the Strophe.LogLevel.DEBUG level.
                               *
                               *  Parameters:
                               *    (String) msg - The log message.
                               */
      debug: function debug(msg) {
        this.log(this.LogLevel.DEBUG, msg);
      },

      /** Function: info
          *  Log a message at the Strophe.LogLevel.INFO level.
          *
          *  Parameters:
          *    (String) msg - The log message.
          */
      info: function info(msg) {
        this.log(this.LogLevel.INFO, msg);
      },

      /** Function: warn
          *  Log a message at the Strophe.LogLevel.WARN level.
          *
          *  Parameters:
          *    (String) msg - The log message.
          */
      warn: function warn(msg) {
        this.log(this.LogLevel.WARN, msg);
      },

      /** Function: error
          *  Log a message at the Strophe.LogLevel.ERROR level.
          *
          *  Parameters:
          *    (String) msg - The log message.
          */
      error: function error(msg) {
        this.log(this.LogLevel.ERROR, msg);
      },

      /** Function: fatal
          *  Log a message at the Strophe.LogLevel.FATAL level.
          *
          *  Parameters:
          *    (String) msg - The log message.
          */
      fatal: function fatal(msg) {
        this.log(this.LogLevel.FATAL, msg);
      },

      /** Function: serialize
          *  Render a DOM element and all descendants to a String.
          *
          *  Parameters:
          *    (XMLElement) elem - A DOM element.
          *
          *  Returns:
          *    The serialized element tree as a String.
          */
      serialize: function serialize(elem) {
        var result;

        if (!elem) {
          return null;
        }

        if (typeof elem.tree === "function") {
          elem = elem.tree();
        }

        var nodeName = elem.nodeName;
        var i, child;

        if (elem.getAttribute("_realname")) {
          nodeName = elem.getAttribute("_realname");
        }

        result = "<" + nodeName;
        for (i = 0; i < elem.attributes.length; i++) {
          if (elem.attributes[i].nodeName != "_realname") {
            result += " " + elem.attributes[i].nodeName +
            "='" + Strophe.xmlescape(elem.attributes[i].value) + "'";
          }
        }

        if (elem.childNodes.length > 0) {
          result += ">";
          for (i = 0; i < elem.childNodes.length; i++) {
            child = elem.childNodes[i];
            switch (child.nodeType) {
              case Strophe.ElementType.NORMAL:
                // normal element, so recurse
                result += Strophe.serialize(child);
                break;
              case Strophe.ElementType.TEXT:
                // text element to escape values
                result += Strophe.xmlescape(child.nodeValue);
                break;
              case Strophe.ElementType.CDATA:
                // cdata section so don't escape values
                result += "<![CDATA[" + child.nodeValue + "]]>";}

          }
          result += "</" + nodeName + ">";
        } else {
          result += "/>";
        }

        return result;
      },

      /** PrivateVariable: _requestId
          *  _Private_ variable that keeps track of the request ids for
          *  connections.
          */
      _requestId: 0,

      /** PrivateVariable: Strophe.connectionPlugins
                      *  _Private_ variable Used to store plugin names that need
                      *  initialization on Strophe.Connection construction.
                      */
      _connectionPlugins: {},

      /** Function: addConnectionPlugin
                               *  Extends the Strophe.Connection object with the given plugin.
                               *
                               *  Parameters:
                               *    (String) name - The name of the extension.
                               *    (Object) ptype - The plugin's prototype.
                               */
      addConnectionPlugin: function addConnectionPlugin(name, ptype) {
        Strophe._connectionPlugins[name] = ptype;
      } };


    /** Class: Strophe.Builder
            *  XML DOM builder.
            *
            *  This object provides an interface similar to JQuery but for building
            *  DOM elements easily and rapidly.  All the functions except for toString()
            *  and tree() return the object, so calls can be chained.  Here's an
            *  example using the $iq() builder helper.
            *  > $iq({to: 'you', from: 'me', type: 'get', id: '1'})
            *  >     .c('query', {xmlns: 'strophe:example'})
            *  >     .c('example')
            *  >     .toString()
            *
            *  The above generates this XML fragment
            *  > <iq to='you' from='me' type='get' id='1'>
            *  >   <query xmlns='strophe:example'>
            *  >     <example/>
            *  >   </query>
            *  > </iq>
            *  The corresponding DOM manipulations to get a similar fragment would be
            *  a lot more tedious and probably involve several helper variables.
            *
            *  Since adding children makes new operations operate on the child, up()
            *  is provided to traverse up the tree.  To add two children, do
            *  > builder.c('child1', ...).up().c('child2', ...)
            *  The next operation on the Builder will be relative to the second child.
            */

    /** Constructor: Strophe.Builder
                *  Create a Strophe.Builder object.
                *
                *  The attributes should be passed in object notation.  For example
                *  > var b = new Builder('message', {to: 'you', from: 'me'});
                *  or
                *  > var b = new Builder('messsage', {'xml:lang': 'en'});
                *
                *  Parameters:
                *    (String) name - The name of the root element.
                *    (Object) attrs - The attributes for the root element in object notation.
                *
                *  Returns:
                *    A new Strophe.Builder.
                */
    Strophe.Builder = function (name, attrs) {
      // Set correct namespace for jabber:client elements
      if (name == "presence" || name == "message" || name == "iq") {
        if (attrs && !attrs.xmlns) {
          attrs.xmlns = Strophe.NS.CLIENT;
        } else if (!attrs) {
          attrs = { xmlns: Strophe.NS.CLIENT };
        }
      }

      // Holds the tree being built.
      this.nodeTree = Strophe.xmlElement(name, attrs);

      // Points to the current operation node.
      this.node = this.nodeTree;
    };

    Strophe.Builder.prototype = {
      /** Function: tree
                                   *  Return the DOM tree.
                                   *
                                   *  This function returns the current DOM tree as an element object.  This
                                   *  is suitable for passing to functions like Strophe.Connection.send().
                                   *
                                   *  Returns:
                                   *    The DOM tree as a element object.
                                   */
      tree: function tree() {
        return this.nodeTree;
      },

      /** Function: toString
          *  Serialize the DOM tree to a String.
          *
          *  This function returns a string serialization of the current DOM
          *  tree.  It is often used internally to pass data to a
          *  Strophe.Request object.
          *
          *  Returns:
          *    The serialized DOM tree in a String.
          */
      toString: function toString() {
        return Strophe.serialize(this.nodeTree);
      },

      /** Function: up
          *  Make the current parent element the new current element.
          *
          *  This function is often used after c() to traverse back up the tree.
          *  For example, to add two children to the same element
          *  > builder.c('child1', {}).up().c('child2', {});
          *
          *  Returns:
          *    The Stophe.Builder object.
          */
      up: function up() {
        this.node = this.node.parentNode;
        return this;
      },

      /** Function: root
          *  Make the root element the new current element.
          *
          *  When at a deeply nested element in the tree, this function can be used
          *  to jump back to the root of the tree, instead of having to repeatedly
          *  call up().
          *
          *  Returns:
          *    The Stophe.Builder object.
          */
      root: function root() {
        this.node = this.nodeTree;
        return this;
      },

      /** Function: attrs
          *  Add or modify attributes of the current element.
          *
          *  The attributes should be passed in object notation.  This function
          *  does not move the current element pointer.
          *
          *  Parameters:
          *    (Object) moreattrs - The attributes to add/modify in object notation.
          *
          *  Returns:
          *    The Strophe.Builder object.
          */
      attrs: function attrs(moreattrs) {
        for (var k in moreattrs) {
          if (moreattrs.hasOwnProperty(k)) {
            if (moreattrs[k] === undefined) {
              this.node.removeAttribute(k);
            } else {
              this.node.setAttribute(k, moreattrs[k]);
            }
          }
        }
        return this;
      },

      /** Function: c
          *  Add a child to the current element and make it the new current
          *  element.
          *
          *  This function moves the current element pointer to the child,
          *  unless text is provided.  If you need to add another child, it
          *  is necessary to use up() to go back to the parent in the tree.
          *
          *  Parameters:
          *    (String) name - The name of the child.
          *    (Object) attrs - The attributes of the child in object notation.
          *    (String) text - The text to add to the child.
          *
          *  Returns:
          *    The Strophe.Builder object.
          */
      c: function c(name, attrs, text) {
        var child = Strophe.xmlElement(name, attrs, text);
        this.node.appendChild(child);
        if (typeof text !== "string" && typeof text !== "number") {
          this.node = child;
        }
        return this;
      },

      /** Function: cnode
          *  Add a child to the current element and make it the new current
          *  element.
          *
          *  This function is the same as c() except that instead of using a
          *  name and an attributes object to create the child it uses an
          *  existing DOM element object.
          *
          *  Parameters:
          *    (XMLElement) elem - A DOM element.
          *
          *  Returns:
          *    The Strophe.Builder object.
          */
      cnode: function cnode(elem) {
        var impNode;
        var xmlGen = Strophe.xmlGenerator();
        try {
          impNode = xmlGen.importNode !== undefined;
        } catch (e) {
          impNode = false;
        }
        var newElem = impNode ?
        xmlGen.importNode(elem, true) :
        Strophe.copyElement(elem);
        this.node.appendChild(newElem);
        this.node = newElem;
        return this;
      },

      /** Function: t
          *  Add a child text element.
          *
          *  This *does not* make the child the new current element since there
          *  are no children of text elements.
          *
          *  Parameters:
          *    (String) text - The text data to append to the current element.
          *
          *  Returns:
          *    The Strophe.Builder object.
          */
      t: function t(text) {
        var child = Strophe.xmlTextNode(text);
        this.node.appendChild(child);
        return this;
      },

      /** Function: h
          *  Replace current element contents with the HTML passed in.
          *
          *  This *does not* make the child the new current element
          *
          *  Parameters:
          *    (String) html - The html to insert as contents of current element.
          *
          *  Returns:
          *    The Strophe.Builder object.
          */
      h: function h(html) {
        var fragment = document.createElement('body');

        // force the browser to try and fix any invalid HTML tags
        fragment.innerHTML = html;

        // copy cleaned html into an xml dom
        var xhtml = Strophe.createHtml(fragment);

        while (xhtml.childNodes.length > 0) {
          this.node.appendChild(xhtml.childNodes[0]);
        }
        return this;
      } };


    /** PrivateClass: Strophe.Handler
            *  _Private_ helper class for managing stanza handlers.
            *
            *  A Strophe.Handler encapsulates a user provided callback function to be
            *  executed when matching stanzas are received by the connection.
            *  Handlers can be either one-off or persistant depending on their
            *  return value. Returning true will cause a Handler to remain active, and
            *  returning false will remove the Handler.
            *
            *  Users will not use Strophe.Handler objects directly, but instead they
            *  will use Strophe.Connection.addHandler() and
            *  Strophe.Connection.deleteHandler().
            */

    /** PrivateConstructor: Strophe.Handler
                *  Create and initialize a new Strophe.Handler.
                *
                *  Parameters:
                *    (Function) handler - A function to be executed when the handler is run.
                *    (String) ns - The namespace to match.
                *    (String) name - The element name to match.
                *    (String) type - The element type to match.
                *    (String) id - The element id attribute to match.
                *    (String) from - The element from attribute to match.
                *    (Object) options - Handler options
                *
                *  Returns:
                *    A new Strophe.Handler object.
                */
    Strophe.Handler = function (handler, ns, name, type, id, from, options) {
      this.handler = handler;
      this.ns = ns;
      this.name = name;
      this.type = type;
      this.id = id;
      this.options = options || { 'matchBareFromJid': false, 'ignoreNamespaceFragment': false };
      // BBB: Maintain backward compatibility with old `matchBare` option
      if (this.options.matchBare) {
        Strophe.warn('The "matchBare" option is deprecated, use "matchBareFromJid" instead.');
        this.options.matchBareFromJid = this.options.matchBare;
        delete this.options.matchBare;
      }

      if (this.options.matchBareFromJid) {
        this.from = from ? Strophe.getBareJidFromJid(from) : null;
      } else {
        this.from = from;
      }
      // whether the handler is a user handler or a system handler
      this.user = true;
    };

    Strophe.Handler.prototype = {
      /** PrivateFunction: getNamespace
                                   *  Returns the XML namespace attribute on an element.
                                   *  If `ignoreNamespaceFragment` was passed in for this handler, then the
                                   *  URL fragment will be stripped.
                                   *
                                   *  Parameters:
                                   *    (XMLElement) elem - The XML element with the namespace.
                                   *
                                   *  Returns:
                                   *    The namespace, with optionally the fragment stripped.
                                   */
      getNamespace: function getNamespace(elem) {
        var elNamespace = elem.getAttribute("xmlns");
        if (elNamespace && this.options.ignoreNamespaceFragment) {
          elNamespace = elNamespace.split('#')[0];
        }
        return elNamespace;
      },

      /** PrivateFunction: namespaceMatch
          *  Tests if a stanza matches the namespace set for this Strophe.Handler.
          *
          *  Parameters:
          *    (XMLElement) elem - The XML element to test.
          *
          *  Returns:
          *    true if the stanza matches and false otherwise.
          */
      namespaceMatch: function namespaceMatch(elem) {
        var nsMatch = false;
        if (!this.ns) {
          return true;
        } else {
          var that = this;
          Strophe.forEachChild(elem, null, function (elem) {
            if (that.getNamespace(elem) === that.ns) {
              nsMatch = true;
            }
          });
          nsMatch = nsMatch || this.getNamespace(elem) === this.ns;
        }
        return nsMatch;
      },

      /** PrivateFunction: isMatch
          *  Tests if a stanza matches the Strophe.Handler.
          *
          *  Parameters:
          *    (XMLElement) elem - The XML element to test.
          *
          *  Returns:
          *    true if the stanza matches and false otherwise.
          */
      isMatch: function isMatch(elem) {
        var from = elem.getAttribute('from');
        if (this.options.matchBareFromJid) {
          from = Strophe.getBareJidFromJid(from);
        }
        var elem_type = elem.getAttribute("type");
        if (this.namespaceMatch(elem) && (
        !this.name || Strophe.isTagEqual(elem, this.name)) && (
        !this.type || (Array.isArray(this.type) ? this.type.indexOf(elem_type) != -1 : elem_type == this.type)) && (
        !this.id || elem.getAttribute("id") == this.id) && (
        !this.from || from == this.from)) {
          return true;
        }
        return false;
      },

      /** PrivateFunction: run
          *  Run the callback on a matching stanza.
          *
          *  Parameters:
          *    (XMLElement) elem - The DOM element that triggered the
          *      Strophe.Handler.
          *
          *  Returns:
          *    A boolean indicating if the handler should remain active.
          */
      run: function run(elem) {
        var result = null;
        try {
          result = this.handler(elem);
        } catch (e) {
          Strophe._handleError(e);
          throw e;
        }
        return result;
      },

      /** PrivateFunction: toString
          *  Get a String representation of the Strophe.Handler object.
          *
          *  Returns:
          *    A String.
          */
      toString: function toString() {
        return "{Handler: " + this.handler + "(" + this.name + "," +
        this.id + "," + this.ns + ")}";
      } };


    /** PrivateClass: Strophe.TimedHandler
            *  _Private_ helper class for managing timed handlers.
            *
            *  A Strophe.TimedHandler encapsulates a user provided callback that
            *  should be called after a certain period of time or at regular
            *  intervals.  The return value of the callback determines whether the
            *  Strophe.TimedHandler will continue to fire.
            *
            *  Users will not use Strophe.TimedHandler objects directly, but instead
            *  they will use Strophe.Connection.addTimedHandler() and
            *  Strophe.Connection.deleteTimedHandler().
            */

    /** PrivateConstructor: Strophe.TimedHandler
                *  Create and initialize a new Strophe.TimedHandler object.
                *
                *  Parameters:
                *    (Integer) period - The number of milliseconds to wait before the
                *      handler is called.
                *    (Function) handler - The callback to run when the handler fires.  This
                *      function should take no arguments.
                *
                *  Returns:
                *    A new Strophe.TimedHandler object.
                */
    Strophe.TimedHandler = function (period, handler) {
      this.period = period;
      this.handler = handler;
      this.lastCalled = new Date().getTime();
      this.user = true;
    };

    Strophe.TimedHandler.prototype = {
      /** PrivateFunction: run
                                        *  Run the callback for the Strophe.TimedHandler.
                                        *
                                        *  Returns:
                                        *    true if the Strophe.TimedHandler should be called again, and false
                                        *      otherwise.
                                        */
      run: function run() {
        this.lastCalled = new Date().getTime();
        return this.handler();
      },

      /** PrivateFunction: reset
          *  Reset the last called time for the Strophe.TimedHandler.
          */
      reset: function reset() {
        this.lastCalled = new Date().getTime();
      },

      /** PrivateFunction: toString
          *  Get a string representation of the Strophe.TimedHandler object.
          *
          *  Returns:
          *    The string representation.
          */
      toString: function toString() {
        return "{TimedHandler: " + this.handler + "(" + this.period + ")}";
      } };


    /** Class: Strophe.Connection
            *  XMPP Connection manager.
            *
            *  This class is the main part of Strophe.  It manages a BOSH or websocket
            *  connection to an XMPP server and dispatches events to the user callbacks
            *  as data arrives. It supports SASL PLAIN, SASL DIGEST-MD5, SASL SCRAM-SHA1
            *  and legacy authentication.
            *
            *  After creating a Strophe.Connection object, the user will typically
            *  call connect() with a user supplied callback to handle connection level
            *  events like authentication failure, disconnection, or connection
            *  complete.
            *
            *  The user will also have several event handlers defined by using
            *  addHandler() and addTimedHandler().  These will allow the user code to
            *  respond to interesting stanzas or do something periodically with the
            *  connection. These handlers will be active once authentication is
            *  finished.
            *
            *  To send data to the connection, use send().
            */

    /** Constructor: Strophe.Connection
                *  Create and initialize a Strophe.Connection object.
                *
                *  The transport-protocol for this connection will be chosen automatically
                *  based on the given service parameter. URLs starting with "ws://" or
                *  "wss://" will use WebSockets, URLs starting with "http://", "https://"
                *  or without a protocol will use BOSH.
                *
                *  To make Strophe connect to the current host you can leave out the protocol
                *  and host part and just pass the path, e.g.
                *
                *  > var conn = new Strophe.Connection("/http-bind/");
                *
                *  Options common to both Websocket and BOSH:
                *  ------------------------------------------
                *
                *  cookies
                *  ~~~~~~~
                *
                *  The "cookies" option allows you to pass in cookies to be added to the
                *  document. These cookies will then be included in the BOSH XMLHttpRequest
                *  or in the websocket connection.
                *
                *  The passed in value must be a map of cookie names and string values:
                *
                *  > { "myCookie": {
               *  >     "value": "1234",
               *  >     "domain": ".example.org",
               *  >     "path": "/",
               *  >     "expires": expirationDate
               *  >     }
               *  > }
                *
                *  Note that cookies can't be set in this way for other domains (i.e. cross-domain).
                *  Those cookies need to be set under those domains, for example they can be
                *  set server-side by making a XHR call to that domain to ask it to set any
                *  necessary cookies.
                *
                *  mechanisms
                *  ~~~~~~~~~~
                *
                *  The "mechanisms" option allows you to specify the SASL mechanisms that this
                *  instance of Strophe.Connection (and therefore your XMPP client) will
                *  support.
                *
                *  The value must be an array of objects with Strophe.SASLMechanism
                *  prototypes.
                *
                *  If nothing is specified, then the following mechanisms (and their
                *  priorities) are registered:
                *
                *      EXTERNAL - 60
                *      OAUTHBEARER - 50
                *      SCRAM-SHA1 - 40
                *      DIGEST-MD5 - 30
                *      PLAIN - 20
                *      ANONYMOUS - 10
                *
                *  WebSocket options:
                *  ------------------
                *
                *  If you want to connect to the current host with a WebSocket connection you
                *  can tell Strophe to use WebSockets through a "protocol" attribute in the
                *  optional options parameter. Valid values are "ws" for WebSocket and "wss"
                *  for Secure WebSocket.
                *  So to connect to "wss://CURRENT_HOSTNAME/xmpp-websocket" you would call
                *
                *  > var conn = new Strophe.Connection("/xmpp-websocket/", {protocol: "wss"});
                *
                *  Note that relative URLs _NOT_ starting with a "/" will also include the path
                *  of the current site.
                *
                *  Also because downgrading security is not permitted by browsers, when using
                *  relative URLs both BOSH and WebSocket connections will use their secure
                *  variants if the current connection to the site is also secure (https).
                *
                *  BOSH options:
                *  -------------
                *
                *  By adding "sync" to the options, you can control if requests will
                *  be made synchronously or not. The default behaviour is asynchronous.
                *  If you want to make requests synchronous, make "sync" evaluate to true:
                *  > var conn = new Strophe.Connection("/http-bind/", {sync: true});
                *
                *  You can also toggle this on an already established connection:
                *  > conn.options.sync = true;
                *
                *  The "customHeaders" option can be used to provide custom HTTP headers to be
                *  included in the XMLHttpRequests made.
                *
                *  The "keepalive" option can be used to instruct Strophe to maintain the
                *  current BOSH session across interruptions such as webpage reloads.
                *
                *  It will do this by caching the sessions tokens in sessionStorage, and when
                *  "restore" is called it will check whether there are cached tokens with
                *  which it can resume an existing session.
                *
                *  The "withCredentials" option should receive a Boolean value and is used to
                *  indicate wether cookies should be included in ajax requests (by default
                *  they're not).
                *  Set this value to true if you are connecting to a BOSH service
                *  and for some reason need to send cookies to it.
                *  In order for this to work cross-domain, the server must also enable
                *  credentials by setting the Access-Control-Allow-Credentials response header
                *  to "true". For most usecases however this setting should be false (which
                *  is the default).
                *  Additionally, when using Access-Control-Allow-Credentials, the
                *  Access-Control-Allow-Origin header can't be set to the wildcard "*", but
                *  instead must be restricted to actual domains.
                *
                *  The "contentType" option can be set to change the default Content-Type
                *  of "text/xml; charset=utf-8", which can be useful to reduce the amount of
                *  CORS preflight requests that are sent to the server.
                *
                *  Parameters:
                *    (String) service - The BOSH or WebSocket service URL.
                *    (Object) options - A hash of configuration options
                *
                *  Returns:
                *    A new Strophe.Connection object.
                */
    Strophe.Connection = function (service, options) {
      // The service URL
      this.service = service;
      // Configuration options
      this.options = options || {};
      var proto = this.options.protocol || "";

      // Select protocal based on service or options
      if (service.indexOf("ws:") === 0 || service.indexOf("wss:") === 0 ||
      proto.indexOf("ws") === 0) {
        this._proto = new Strophe.Websocket(this);
      } else {
        this._proto = new Strophe.Bosh(this);
      }

      /* The connected JID. */
      this.jid = "";
      /* the JIDs domain */
      this.domain = null;
      /* stream:features */
      this.features = null;

      // SASL
      this._sasl_data = {};
      this.do_session = false;
      this.do_bind = false;

      // handler lists
      this.timedHandlers = [];
      this.handlers = [];
      this.removeTimeds = [];
      this.removeHandlers = [];
      this.addTimeds = [];
      this.addHandlers = [];
      this.protocolErrorHandlers = {
        'HTTP': {},
        'websocket': {} };


      this._idleTimeout = null;
      this._disconnectTimeout = null;

      this.authenticated = false;
      this.connected = false;
      this.disconnecting = false;
      this.do_authentication = true;
      this.paused = false;
      this.restored = false;

      this._data = [];
      this._uniqueId = 0;

      this._sasl_success_handler = null;
      this._sasl_failure_handler = null;
      this._sasl_challenge_handler = null;

      // Max retries before disconnecting
      this.maxRetries = 5;

      // Call onIdle callback every 1/10th of a second
      // XXX: setTimeout should be called only with function expressions (23974bc1)
      this._idleTimeout = setTimeout(function () {
        this._onIdle();
      }.bind(this), 100);

      utils.addCookies(this.options.cookies);
      this.registerSASLMechanisms(this.options.mechanisms);

      // initialize plugins
      for (var k in Strophe._connectionPlugins) {
        if (Strophe._connectionPlugins.hasOwnProperty(k)) {
          var ptype = Strophe._connectionPlugins[k];
          // jslint complaints about the below line, but this is fine
          var F = function F() {
          }; // jshint ignore:line
          F.prototype = ptype;
          this[k] = new F();
          this[k].init(this);
        }
      }
    };

    Strophe.Connection.prototype = {
      /** Function: reset
                                      *  Reset the connection.
                                      *
                                      *  This function should be called after a connection is disconnected
                                      *  before that connection is reused.
                                      */
      reset: function reset() {
        this._proto._reset();

        // SASL
        this.do_session = false;
        this.do_bind = false;

        // handler lists
        this.timedHandlers = [];
        this.handlers = [];
        this.removeTimeds = [];
        this.removeHandlers = [];
        this.addTimeds = [];
        this.addHandlers = [];

        this.authenticated = false;
        this.connected = false;
        this.disconnecting = false;
        this.restored = false;

        this._data = [];
        this._requests = [];
        this._uniqueId = 0;
      },

      /** Function: pause
          *  Pause the request manager.
          *
          *  This will prevent Strophe from sending any more requests to the
          *  server.  This is very useful for temporarily pausing
          *  BOSH-Connections while a lot of send() calls are happening quickly.
          *  This causes Strophe to send the data in a single request, saving
          *  many request trips.
          */
      pause: function pause() {
        this.paused = true;
      },

      /** Function: resume
          *  Resume the request manager.
          *
          *  This resumes after pause() has been called.
          */
      resume: function resume() {
        this.paused = false;
      },

      /** Function: getUniqueId
          *  Generate a unique ID for use in <iq/> elements.
          *
          *  All <iq/> stanzas are required to have unique id attributes.  This
          *  function makes creating these easy.  Each connection instance has
          *  a counter which starts from zero, and the value of this counter
          *  plus a colon followed by the suffix becomes the unique id. If no
          *  suffix is supplied, the counter is used as the unique id.
          *
          *  Suffixes are used to make debugging easier when reading the stream
          *  data, and their use is recommended.  The counter resets to 0 for
          *  every new connection for the same reason.  For connections to the
          *  same server that authenticate the same way, all the ids should be
          *  the same, which makes it easy to see changes.  This is useful for
          *  automated testing as well.
          *
          *  Parameters:
          *    (String) suffix - A optional suffix to append to the id.
          *
          *  Returns:
          *    A unique string to be used for the id attribute.
          */
      getUniqueId: function getUniqueId(suffix) {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });
        if (typeof suffix == "string" || typeof suffix == "number") {
          return uuid + ":" + suffix;
        } else {
          return uuid + "";
        }
      },

      /** Function: addProtocolErrorHandler
          *  Register a handler function for when a protocol (websocker or HTTP)
          *  error occurs.
          *
          *  NOTE: Currently only HTTP errors for BOSH requests are handled.
          *  Patches that handle websocket errors would be very welcome.
          *
          *  Parameters:
          *    (String) protocol - 'HTTP' or 'websocket'
          *    (Integer) status_code - Error status code (e.g 500, 400 or 404)
          *    (Function) callback - Function that will fire on Http error
          *
          *  Example:
          *  function onError(err_code){
         *    //do stuff
         *  }
          *
          *  var conn = Strophe.connect('http://example.com/http-bind');
          *  conn.addProtocolErrorHandler('HTTP', 500, onError);
          *  // Triggers HTTP 500 error and onError handler will be called
          *  conn.connect('user_jid@incorrect_jabber_host', 'secret', onConnect);
          */
      addProtocolErrorHandler: function addProtocolErrorHandler(protocol, status_code, callback) {
        this.protocolErrorHandlers[protocol][status_code] = callback;
      },


      /** Function: connect
          *  Starts the connection process.
          *
          *  As the connection process proceeds, the user supplied callback will
          *  be triggered multiple times with status updates.  The callback
          *  should take two arguments - the status code and the error condition.
          *
          *  The status code will be one of the values in the Strophe.Status
          *  constants.  The error condition will be one of the conditions
          *  defined in RFC 3920 or the condition 'strophe-parsererror'.
          *
          *  The Parameters _wait_, _hold_ and _route_ are optional and only relevant
          *  for BOSH connections. Please see XEP 124 for a more detailed explanation
          *  of the optional parameters.
          *
          *  Parameters:
          *    (String) jid - The user's JID.  This may be a bare JID,
          *      or a full JID.  If a node is not supplied, SASL ANONYMOUS
          *      authentication will be attempted.
          *    (String) pass - The user's password.
          *    (Function) callback - The connect callback function.
          *    (Integer) wait - The optional HTTPBIND wait value.  This is the
          *      time the server will wait before returning an empty result for
          *      a request.  The default setting of 60 seconds is recommended.
          *    (Integer) hold - The optional HTTPBIND hold value.  This is the
          *      number of connections the server will hold at one time.  This
          *      should almost always be set to 1 (the default).
          *    (String) route - The optional route value.
          *    (String) authcid - The optional alternative authentication identity
          *      (username) if intending to impersonate another user.
          *      When using the SASL-EXTERNAL authentication mechanism, for example
          *      with client certificates, then the authcid value is used to
          *      determine whether an authorization JID (authzid) should be sent to
          *      the server. The authzid should not be sent to the server if the
          *      authzid and authcid are the same. So to prevent it from being sent
          *      (for example when the JID is already contained in the client
          *      certificate), set authcid to that same JID. See XEP-178 for more
          *      details.
          */
      connect: function connect(jid, pass, callback, wait, hold, route, authcid) {
        this.jid = jid;
        /** Variable: authzid
                         *  Authorization identity.
                         */
        this.authzid = Strophe.getBareJidFromJid(this.jid);

        /** Variable: authcid
                                                             *  Authentication identity (User name).
                                                             */
        this.authcid = authcid || Strophe.getNodeFromJid(this.jid);

        /** Variable: pass
                                                                     *  Authentication identity (User password).
                                                                     */
        this.pass = pass;

        /** Variable: servtype
                           *  Digest MD5 compatibility.
                           */
        this.servtype = "xmpp";

        this.connect_callback = callback;
        this.disconnecting = false;
        this.connected = false;
        this.authenticated = false;
        this.restored = false;

        // parse jid for domain
        this.domain = Strophe.getDomainFromJid(this.jid);

        this._changeConnectStatus(Strophe.Status.CONNECTING, null);

        this._proto._connect(wait, hold, route);
      },

      /** Function: attach
          *  Attach to an already created and authenticated BOSH session.
          *
          *  This function is provided to allow Strophe to attach to BOSH
          *  sessions which have been created externally, perhaps by a Web
          *  application.  This is often used to support auto-login type features
          *  without putting user credentials into the page.
          *
          *  Parameters:
          *    (String) jid - The full JID that is bound by the session.
          *    (String) sid - The SID of the BOSH session.
          *    (String) rid - The current RID of the BOSH session.  This RID
          *      will be used by the next request.
          *    (Function) callback The connect callback function.
          *    (Integer) wait - The optional HTTPBIND wait value.  This is the
          *      time the server will wait before returning an empty result for
          *      a request.  The default setting of 60 seconds is recommended.
          *      Other settings will require tweaks to the Strophe.TIMEOUT value.
          *    (Integer) hold - The optional HTTPBIND hold value.  This is the
          *      number of connections the server will hold at one time.  This
          *      should almost always be set to 1 (the default).
          *    (Integer) wind - The optional HTTBIND window value.  This is the
          *      allowed range of request ids that are valid.  The default is 5.
          */
      attach: function attach(jid, sid, rid, callback, wait, hold, wind) {
        if (this._proto instanceof Strophe.Bosh) {
          this._proto._attach(jid, sid, rid, callback, wait, hold, wind);
        } else {
          throw {
            name: 'StropheSessionError',
            message: 'The "attach" method can only be used with a BOSH connection.' };

        }
      },

      /** Function: restore
          *  Attempt to restore a cached BOSH session.
          *
          *  This function is only useful in conjunction with providing the
          *  "keepalive":true option when instantiating a new Strophe.Connection.
          *
          *  When "keepalive" is set to true, Strophe will cache the BOSH tokens
          *  RID (Request ID) and SID (Session ID) and then when this function is
          *  called, it will attempt to restore the session from those cached
          *  tokens.
          *
          *  This function must therefore be called instead of connect or attach.
          *
          *  For an example on how to use it, please see examples/restore.js
          *
          *  Parameters:
          *    (String) jid - The user's JID.  This may be a bare JID or a full JID.
          *    (Function) callback - The connect callback function.
          *    (Integer) wait - The optional HTTPBIND wait value.  This is the
          *      time the server will wait before returning an empty result for
          *      a request.  The default setting of 60 seconds is recommended.
          *    (Integer) hold - The optional HTTPBIND hold value.  This is the
          *      number of connections the server will hold at one time.  This
          *      should almost always be set to 1 (the default).
          *    (Integer) wind - The optional HTTBIND window value.  This is the
          *      allowed range of request ids that are valid.  The default is 5.
          */
      restore: function restore(jid, callback, wait, hold, wind) {
        if (this._sessionCachingSupported()) {
          this._proto._restore(jid, callback, wait, hold, wind);
        } else {
          throw {
            name: 'StropheSessionError',
            message: 'The "restore" method can only be used with a BOSH connection.' };

        }
      },

      /** PrivateFunction: _sessionCachingSupported
          * Checks whether sessionStorage and JSON are supported and whether we're
          * using BOSH.
          */
      _sessionCachingSupported: function _sessionCachingSupported() {
        if (this._proto instanceof Strophe.Bosh) {
          if (!JSON) {
            return false;
          }
          try {
            window.sessionStorage.setItem('_strophe_', '_strophe_');
            window.sessionStorage.removeItem('_strophe_');
          } catch (e) {
            return false;
          }
          return true;
        }
        return false;
      },

      /** Function: xmlInput
          *  User overrideable function that receives XML data coming into the
          *  connection.
          *
          *  The default function does nothing.  User code can override this with
          *  > Strophe.Connection.xmlInput = function (elem) {
         *  >   (user code)
         *  > };
          *
          *  Due to limitations of current Browsers' XML-Parsers the opening and closing
          *  <stream> tag for WebSocket-Connoctions will be passed as selfclosing here.
          *
          *  BOSH-Connections will have all stanzas wrapped in a <body> tag. See
          *  <Strophe.Bosh.strip> if you want to strip this tag.
          *
          *  Parameters:
          *    (XMLElement) elem - The XML data received by the connection.
          */
      /* jshint unused:false */
      xmlInput: function xmlInput(elem) {
        return;
      },
      /* jshint unused:true */

      /** Function: xmlOutput
                                *  User overrideable function that receives XML data sent to the
                                *  connection.
                                *
                                *  The default function does nothing.  User code can override this with
                                *  > Strophe.Connection.xmlOutput = function (elem) {
                               *  >   (user code)
                               *  > };
                                *
                                *  Due to limitations of current Browsers' XML-Parsers the opening and closing
                                *  <stream> tag for WebSocket-Connoctions will be passed as selfclosing here.
                                *
                                *  BOSH-Connections will have all stanzas wrapped in a <body> tag. See
                                *  <Strophe.Bosh.strip> if you want to strip this tag.
                                *
                                *  Parameters:
                                *    (XMLElement) elem - The XMLdata sent by the connection.
                                */
      /* jshint unused:false */
      xmlOutput: function xmlOutput(elem) {
        return;
      },
      /* jshint unused:true */

      /** Function: rawInput
                                *  User overrideable function that receives raw data coming into the
                                *  connection.
                                *
                                *  The default function does nothing.  User code can override this with
                                *  > Strophe.Connection.rawInput = function (data) {
                               *  >   (user code)
                               *  > };
                                *
                                *  Parameters:
                                *    (String) data - The data received by the connection.
                                */
      /* jshint unused:false */
      rawInput: function rawInput(data) {
        return;
      },
      /* jshint unused:true */

      /** Function: rawOutput
                                *  User overrideable function that receives raw data sent to the
                                *  connection.
                                *
                                *  The default function does nothing.  User code can override this with
                                *  > Strophe.Connection.rawOutput = function (data) {
                               *  >   (user code)
                               *  > };
                                *
                                *  Parameters:
                                *    (String) data - The data sent by the connection.
                                */
      /* jshint unused:false */
      rawOutput: function rawOutput(data) {
        return;
      },
      /* jshint unused:true */

      /** Function: nextValidRid
                                *  User overrideable function that receives the new valid rid.
                                *
                                *  The default function does nothing. User code can override this with
                                *  > Strophe.Connection.nextValidRid = function (rid) {
                               *  >    (user code)
                               *  > };
                                *
                                *  Parameters:
                                *    (Number) rid - The next valid rid
                                */
      /* jshint unused:false */
      nextValidRid: function nextValidRid(rid) {
        return;
      },
      /* jshint unused:true */

      /** Function: send
                                *  Send a stanza.
                                *
                                *  This function is called to push data onto the send queue to
                                *  go out over the wire.  Whenever a request is sent to the BOSH
                                *  server, all pending data is sent and the queue is flushed.
                                *
                                *  Parameters:
                                *    (XMLElement |
                                *     [XMLElement] |
                                *     Strophe.Builder) elem - The stanza to send.
                                */
      send: function send(elem, fail) {
        // console.log(elem)
        if (elem === null) {
          return;
        }
        if (typeof elem.sort === "function") {
          for (var i = 0; i < elem.length; i++) {
            this._queueData(elem[i]);
          }
        } else if (typeof elem.tree === "function") {
          this._queueData(elem.tree());
        } else {
          this._queueData(elem);
        }
        this._proto._send(fail);
      },

      /** Function: flush
          *  Immediately send any pending outgoing data.
          *
          *  Normally send() queues outgoing data until the next idle period
          *  (100ms), which optimizes network use in the common cases when
          *  several send()s are called in succession. flush() can be used to
          *  immediately send all pending data.
          */
      flush: function flush(fail) {
        // cancel the pending idle period and run the idle function
        // immediately
        clearTimeout(this._idleTimeout);
        this._onIdle(fail);
      },

      /** Function: sendIQ
          *  Helper function to send IQ stanzas.
          *
          *  Parameters:
          *    (XMLElement) elem - The stanza to send.
          *    (Function) callback - The callback function for a successful request.
          *    (Function) errback - The callback function for a failed or timed
          *      out request.  On timeout, the stanza will be null.
          *    (Integer) timeout - The time specified in milliseconds for a
          *      timeout to occur.
          *
          *  Returns:
          *    The id used to send the IQ.
          */
      sendIQ: function sendIQ(elem, callback, errback, timeout) {
        var timeoutHandler = null;
        var that = this;

        if (typeof elem.tree === "function") {
          elem = elem.tree();
        }
        var id = elem.getAttribute('id');

        // inject id if not found
        if (!id) {
          id = this.getUniqueId("sendIQ");
          elem.setAttribute("id", id);
        }

        var expectedFrom = elem.getAttribute("to");
        var fulljid = this.jid;

        var handler = this.addHandler(function (stanza) {
          // remove timeout handler if there is one
          if (timeoutHandler) {
            that.deleteTimedHandler(timeoutHandler);
          }

          var acceptable = false;
          var from = stanza.getAttribute("from");
          if (from === expectedFrom ||
          !expectedFrom && (
          from === Strophe.getBareJidFromJid(fulljid) ||
          from === Strophe.getDomainFromJid(fulljid) ||
          from === fulljid)) {
            acceptable = true;
          }

          if (!acceptable) {
            throw {
              name: "StropheError",
              message: "Got answer to IQ from wrong jid:" + from +
              "\nExpected jid: " + expectedFrom };

          }

          var iqtype = stanza.getAttribute('type');
          if (iqtype == 'result') {
            if (callback) {
              callback(stanza);
            }
          } else if (iqtype == 'error') {
            if (errback) {
              errback(stanza);
            }
          } else {
            throw {
              name: "StropheError",
              message: "Got bad IQ type of " + iqtype };

          }
        }, null, 'iq', ['error', 'result'], id);

        // if timeout specified, setup timeout handler.
        if (timeout) {
          timeoutHandler = this.addTimedHandler(timeout, function () {
            // get rid of normal handler
            that.deleteHandler(handler);
            // call errback on timeout with null stanza
            if (errback) {
              errback(null);
            }
            return false;
          });
        }
        this.send(elem);
        return id;
      },

      /** PrivateFunction: _queueData
          *  Queue outgoing data for later sending.  Also ensures that the data
          *  is a DOMElement.
          */
      _queueData: function _queueData(element) {
        if (element === null || !element.tagName || !element.childNodes) {
          throw {
            name: "StropheError",
            message: "Cannot queue non-DOMElement." };

        }
        this._data.push(element);
      },

      /** PrivateFunction: _sendRestart
          *  Send an xmpp:restart stanza.
          */
      _sendRestart: function _sendRestart() {
        this._data.push("restart");
        this._proto._sendRestart();
        // XXX: setTimeout should be called only with function expressions (23974bc1)
        this._idleTimeout = setTimeout(function () {
          this._onIdle();
        }.bind(this), 100);
      },

      /** Function: addTimedHandler
          *  Add a timed handler to the connection.
          *
          *  This function adds a timed handler.  The provided handler will
          *  be called every period milliseconds until it returns false,
          *  the connection is terminated, or the handler is removed.  Handlers
          *  that wish to continue being invoked should return true.
          *
          *  Because of method binding it is necessary to save the result of
          *  this function if you wish to remove a handler with
          *  deleteTimedHandler().
          *
          *  Note that user handlers are not active until authentication is
          *  successful.
          *
          *  Parameters:
          *    (Integer) period - The period of the handler.
          *    (Function) handler - The callback function.
          *
          *  Returns:
          *    A reference to the handler that can be used to remove it.
          */
      addTimedHandler: function addTimedHandler(period, handler) {
        var thand = new Strophe.TimedHandler(period, handler);
        this.addTimeds.push(thand);
        return thand;
      },

      /** Function: deleteTimedHandler
          *  Delete a timed handler for a connection.
          *
          *  This function removes a timed handler from the connection.  The
          *  handRef parameter is *not* the function passed to addTimedHandler(),
          *  but is the reference returned from addTimedHandler().
          *
          *  Parameters:
          *    (Strophe.TimedHandler) handRef - The handler reference.
          */
      deleteTimedHandler: function deleteTimedHandler(handRef) {
        // this must be done in the Idle loop so that we don't change
        // the handlers during iteration
        this.removeTimeds.push(handRef);
      },

      /** Function: addHandler
          *  Add a stanza handler for the connection.
          *
          *  This function adds a stanza handler to the connection.  The
          *  handler callback will be called for any stanza that matches
          *  the parameters.  Note that if multiple parameters are supplied,
          *  they must all match for the handler to be invoked.
          *
          *  The handler will receive the stanza that triggered it as its argument.
          *  *The handler should return true if it is to be invoked again;
          *  returning false will remove the handler after it returns.*
          *
          *  As a convenience, the ns parameters applies to the top level element
          *  and also any of its immediate children.  This is primarily to make
          *  matching /iq/query elements easy.
          *
          *  Options
          *  ~~~~~~~
          *  With the options argument, you can specify boolean flags that affect how
          *  matches are being done.
          *
          *  Currently two flags exist:
          *
          *  - matchBareFromJid:
          *      When set to true, the from parameter and the
          *      from attribute on the stanza will be matched as bare JIDs instead
          *      of full JIDs. To use this, pass {matchBareFromJid: true} as the
          *      value of options. The default value for matchBareFromJid is false.
          *
          *  - ignoreNamespaceFragment:
          *      When set to true, a fragment specified on the stanza's namespace
          *      URL will be ignored when it's matched with the one configured for
          *      the handler.
          *
          *      This means that if you register like this:
          *      >   connection.addHandler(
          *      >       handler,
          *      >       'http://jabber.org/protocol/muc',
          *      >       null, null, null, null,
          *      >       {'ignoreNamespaceFragment': true}
          *      >   );
          *
          *      Then a stanza with XML namespace of
          *      'http://jabber.org/protocol/muc#user' will also be matched. If
          *      'ignoreNamespaceFragment' is false, then only stanzas with
          *      'http://jabber.org/protocol/muc' will be matched.
          *
          *  Deleting the handler
          *  ~~~~~~~~~~~~~~~~~~~~
          *  The return value should be saved if you wish to remove the handler
          *  with deleteHandler().
          *
          *  Parameters:
          *    (Function) handler - The user callback.
          *    (String) ns - The namespace to match.
          *    (String) name - The stanza name to match.
          *    (String|Array) type - The stanza type (or types if an array) to match.
          *    (String) id - The stanza id attribute to match.
          *    (String) from - The stanza from attribute to match.
          *    (String) options - The handler options
          *
          *  Returns:
          *    A reference to the handler that can be used to remove it.
          */
      addHandler: function addHandler(handler, ns, name, type, id, from, options) {
        var hand = new Strophe.Handler(handler, ns, name, type, id, from, options);
        this.addHandlers.push(hand);
        return hand;
      },

      /** Function: deleteHandler
          *  Delete a stanza handler for a connection.
          *
          *  This function removes a stanza handler from the connection.  The
          *  handRef parameter is *not* the function passed to addHandler(),
          *  but is the reference returned from addHandler().
          *
          *  Parameters:
          *    (Strophe.Handler) handRef - The handler reference.
          */
      deleteHandler: function deleteHandler(handRef) {
        // this must be done in the Idle loop so that we don't change
        // the handlers during iteration
        this.removeHandlers.push(handRef);
        // If a handler is being deleted while it is being added,
        // prevent it from getting added
        var i = this.addHandlers.indexOf(handRef);
        if (i >= 0) {
          this.addHandlers.splice(i, 1);
        }
      },

      /** Function: registerSASLMechanisms
          *
          * Register the SASL mechanisms which will be supported by this instance of
          * Strophe.Connection (i.e. which this XMPP client will support).
          *
          *  Parameters:
          *    (Array) mechanisms - Array of objects with Strophe.SASLMechanism prototypes
          *
          */
      registerSASLMechanisms: function registerSASLMechanisms(mechanisms) {
        this.mechanisms = {};
        mechanisms = mechanisms || [
        Strophe.SASLAnonymous,
        Strophe.SASLExternal,
        Strophe.SASLMD5,
        Strophe.SASLOAuthBearer,
        Strophe.SASLPlain,
        Strophe.SASLSHA1];

        mechanisms.forEach(this.registerSASLMechanism.bind(this));
      },

      /** Function: registerSASLMechanism
          *
          * Register a single SASL mechanism, to be supported by this client.
          *
          *  Parameters:
          *    (Object) mechanism - Object with a Strophe.SASLMechanism prototype
          *
          */
      registerSASLMechanism: function registerSASLMechanism(mechanism) {
        this.mechanisms[mechanism.prototype.name] = mechanism;
      },

      /** Function: disconnect
          *  Start the graceful disconnection process.
          *
          *  This function starts the disconnection process.  This process starts
          *  by sending unavailable presence and sending BOSH body of type
          *  terminate.  A timeout handler makes sure that disconnection happens
          *  even if the BOSH server does not respond.
          *  If the Connection object isn't connected, at least tries to abort all pending requests
          *  so the connection object won't generate successful requests (which were already opened).
          *
          *  The user supplied connection callback will be notified of the
          *  progress as this process happens.
          *
          *  Parameters:
          *    (String) reason - The reason the disconnect is occuring.
          */
      disconnect: function disconnect(reason) {
        this._changeConnectStatus(Strophe.Status.DISCONNECTING, reason);

        Strophe.info("Disconnect was called because: " + reason);
        if (this.connected) {
          var pres = false;
          this.disconnecting = true;
          if (this.authenticated) {
            pres = $pres({
              xmlns: Strophe.NS.CLIENT,
              type: 'unavailable' });

          }
          // setup timeout handler
          this._disconnectTimeout = this._addSysTimedHandler(
          3000, this._onDisconnectTimeout.bind(this));
          this._proto._disconnect(pres);
        } else {
          Strophe.info("Disconnect was called before Strophe connected to the server");
          this._proto._abortAllRequests();
        }
      },

      /** PrivateFunction: _changeConnectStatus
          *  _Private_ helper function that makes sure plugins and the user's
          *  callback are notified of connection status changes.
          *
          *  Parameters:
          *    (Integer) status - the new connection status, one of the values
          *      in Strophe.Status
          *    (String) condition - the error condition or null
          */
      _changeConnectStatus: function _changeConnectStatus(status, condition) {
        // notify all plugins listening for status changes
        for (var k in Strophe._connectionPlugins) {
          if (Strophe._connectionPlugins.hasOwnProperty(k)) {
            var plugin = this[k];
            if (plugin.statusChanged) {
              try {
                plugin.statusChanged(status, condition);
              } catch (err) {
                Strophe.error("" + k + " plugin caused an exception " +
                "changing status: " + err);
              }
            }
          }
        }

        // notify the user's callback
        if (this.connect_callback) {
          try {
            this.connect_callback(status, condition);
          } catch (e) {
            Strophe._handleError(e);
            Strophe.error(
            "User connection callback caused an " + "exception: " + e);
          }
        }
      },

      /** PrivateFunction: _doDisconnect
          *  _Private_ function to disconnect.
          *
          *  This is the last piece of the disconnection logic.  This resets the
          *  connection and alerts the user's connection callback.
          */
      _doDisconnect: function _doDisconnect(condition) {
        //console.log('_doDisconnect 14', condition)
        if (typeof this._idleTimeout == "number") {
          clearTimeout(this._idleTimeout);
        }

        // Cancel Disconnect Timeout
        if (this._disconnectTimeout !== null) {
          this.deleteTimedHandler(this._disconnectTimeout);
          this._disconnectTimeout = null;
        }

        Strophe.info("_doDisconnect was called");
        this._proto._doDisconnect();

        this.authenticated = false;
        this.disconnecting = false;
        this.restored = false;

        // delete handlers
        this.handlers = [];
        this.timedHandlers = [];
        this.removeTimeds = [];
        this.removeHandlers = [];
        this.addTimeds = [];
        this.addHandlers = [];

        // tell the parent we disconnected
        this._changeConnectStatus(Strophe.Status.DISCONNECTED, condition);
        this.connected = false;
      },

      /** PrivateFunction: _dataRecv
          *  _Private_ handler to processes incoming data from the the connection.
          *
          *  Except for _connect_cb handling the initial connection request,
          *  this function handles the incoming data for all requests.  This
          *  function also fires stanza handlers that match each incoming
          *  stanza.
          *
          *  Parameters:
          *    (Strophe.Request) req - The request that has data ready.
          *    (string) req - The stanza a raw string (optiona).
          */
      _dataRecv: function _dataRecv(req, raw) {
        Strophe.info("_dataRecv called");
        var elem = this._proto._reqToData(req);
        if (elem === null) {
          return;
        }

        if (this.xmlInput !== Strophe.Connection.prototype.xmlInput) {
          if (elem.nodeName === this._proto.strip && elem.childNodes.length) {
            this.xmlInput(elem.childNodes[0]);
          } else {
            this.xmlInput(elem);
          }
        }
        if (this.rawInput !== Strophe.Connection.prototype.rawInput) {
          if (raw) {
            this.rawInput(raw);
          } else {
            this.rawInput(Strophe.serialize(elem));
          }
        }

        // remove handlers scheduled for deletion
        var i, hand;
        while (this.removeHandlers.length > 0) {
          hand = this.removeHandlers.pop();
          i = this.handlers.indexOf(hand);
          if (i >= 0) {
            this.handlers.splice(i, 1);
          }
        }

        // add handlers scheduled for addition
        while (this.addHandlers.length > 0) {
          this.handlers.push(this.addHandlers.pop());
        }

        // handle graceful disconnect
        if (this.disconnecting && this._proto._emptyQueue()) {
          //console.log('_doDisconnect 1')
          this._doDisconnect();
          return;
        }

        var type = elem.getAttribute("type");
        var cond, conflict;
        if (type !== null && type == "terminate") {
          // Don't process stanzas that come in after disconnect
          if (this.disconnecting) {
            return;
          }

          // an error occurred
          cond = elem.getAttribute("condition");
          conflict = elem.getElementsByTagName("conflict");
          if (cond !== null) {
            if (cond == "remote-stream-error" && conflict.length > 0) {
              cond = "conflict";
            }
            this._changeConnectStatus(Strophe.Status.CONNFAIL, cond);
          } else {
            this._changeConnectStatus(Strophe.Status.CONNFAIL, "unknown");
          }
          this._doDisconnect(cond);
          return;
        }

        // send each incoming stanza through the handler chain
        var that = this;
        Strophe.forEachChild(elem, null, function (child) {
          var i, newList;
          // process handlers
          newList = that.handlers;
          that.handlers = [];
          for (i = 0; i < newList.length; i++) {
            var hand = newList[i];
            // encapsulate 'handler.run' not to lose the whole handler list if
            // one of the handlers throws an exception
            try {
              if (hand.isMatch(child) && (
              that.authenticated || !hand.user)) {
                if (hand.run(child)) {
                  that.handlers.push(hand);
                }
              } else {
                that.handlers.push(hand);
              }
            } catch (e) {
              // if the handler throws an exception, we consider it as false
              Strophe.warn('Removing Strophe handlers due to uncaught exception: ' + e.message);
            }
          }
        });
      },


      /** Attribute: mechanisms
          *  SASL Mechanisms available for Connection.
          */
      mechanisms: {},

      /** PrivateFunction: _connect_cb
                       *  _Private_ handler for initial connection request.
                       *
                       *  This handler is used to process the initial connection request
                       *  response from the BOSH server. It is used to set up authentication
                       *  handlers and start the authentication process.
                       *
                       *  SASL authentication will be attempted if available, otherwise
                       *  the code will fall back to legacy authentication.
                       *
                       *  Parameters:
                       *    (Strophe.Request) req - The current request.
                       *    (Function) _callback - low level (xmpp) connect callback function.
                       *      Useful for plugins with their own xmpp connect callback (when their)
                       *      want to do something special).
                       */
      _connect_cb: function _connect_cb(req, _callback, raw) {
        Strophe.info("_connect_cb was called");
        this.connected = true;

        var bodyWrap;
        try {
          bodyWrap = this._proto._reqToData(req);
        } catch (e) {
          if (e != "badformat") {
            throw e;
          }
          this._changeConnectStatus(Strophe.Status.CONNFAIL, 'bad-format');
          this._doDisconnect('bad-format');
        }
        if (!bodyWrap) {
          return;
        }

        if (this.xmlInput !== Strophe.Connection.prototype.xmlInput) {
          if (bodyWrap.nodeName === this._proto.strip && bodyWrap.childNodes.length) {
            this.xmlInput(bodyWrap.childNodes[0]);
          } else {
            this.xmlInput(bodyWrap);
          }
        }
        if (this.rawInput !== Strophe.Connection.prototype.rawInput) {
          if (raw) {
            this.rawInput(raw);
          } else {
            this.rawInput(Strophe.serialize(bodyWrap));
          }
        }

        var conncheck = this._proto._connect_cb(bodyWrap);
        if (conncheck === Strophe.Status.CONNFAIL) {
          return;
        }

        // Check for the stream:features tag
        var hasFeatures;
        if (bodyWrap.getElementsByTagNameNS) {
          hasFeatures = bodyWrap.getElementsByTagNameNS(Strophe.NS.STREAM, "features").length > 0;
        } else {
          hasFeatures = bodyWrap.getElementsByTagName("stream:features").length > 0 ||
          bodyWrap.getElementsByTagName("features").length > 0;
        }

        //console.log('hasFeatures', hasFeatures, bodyWrap, _callback)
        if (!hasFeatures) {
          try {
            this._proto._no_auth_received(_callback);
          } catch (e) {
          }

          return;
        }

        var matched = [],i,mech;
        var mechanisms = bodyWrap.getElementsByTagName("mechanism");
        if (mechanisms.length > 0) {
          for (i = 0; i < mechanisms.length; i++) {
            mech = Strophe.getText(mechanisms[i]);
            if (this.mechanisms[mech]) matched.push(this.mechanisms[mech]);
          }
        }

        //console.log('matched', matched, bodyWrap)
        if (matched.length === 0) {
          if (bodyWrap.getElementsByTagName("auth").length === 0) {
            // There are no matching SASL mechanisms and also no legacy
            // auth available.
            this._proto._no_auth_received(_callback);
            return;
          }
        }
        if (this.do_authentication !== false) {
          this.authenticate(matched);
        }
      },

      /** Function: sortMechanismsByPriority
          *
          *  Sorts an array of objects with prototype SASLMechanism according to
          *  their priorities.
          *
          *  Parameters:
          *    (Array) mechanisms - Array of SASL mechanisms.
          *
          */
      sortMechanismsByPriority: function sortMechanismsByPriority(mechanisms) {
        // Sorting mechanisms according to priority.
        var i, j, higher, swap;
        for (i = 0; i < mechanisms.length - 1; ++i) {
          higher = i;
          for (j = i + 1; j < mechanisms.length; ++j) {
            if (mechanisms[j].prototype.priority > mechanisms[higher].prototype.priority) {
              higher = j;
            }
          }
          if (higher != i) {
            swap = mechanisms[i];
            mechanisms[i] = mechanisms[higher];
            mechanisms[higher] = swap;
          }
        }
        return mechanisms;
      },

      /** PrivateFunction: _attemptSASLAuth
          *
          *  Iterate through an array of SASL mechanisms and attempt authentication
          *  with the highest priority (enabled) mechanism.
          *
          *  Parameters:
          *    (Array) mechanisms - Array of SASL mechanisms.
          *
          *  Returns:
          *    (Boolean) mechanism_found - true or false, depending on whether a
          *          valid SASL mechanism was found with which authentication could be
          *          started.
          */
      _attemptSASLAuth: function _attemptSASLAuth(mechanisms) {
        mechanisms = this.sortMechanismsByPriority(mechanisms || []);
        var i = 0,mechanism_found = false;
        for (i = 0; i < mechanisms.length; ++i) {
          if (!mechanisms[i].prototype.test(this)) {
            continue;
          }
          this._sasl_success_handler = this._addSysHandler(
          this._sasl_success_cb.bind(this), null,
          "success", null, null);
          this._sasl_failure_handler = this._addSysHandler(
          this._sasl_failure_cb.bind(this), null,
          "failure", null, null);
          this._sasl_challenge_handler = this._addSysHandler(
          this._sasl_challenge_cb.bind(this), null,
          "challenge", null, null);

          this._sasl_mechanism = new mechanisms[i]();
          this._sasl_mechanism.onStart(this);

          var request_auth_exchange = $build("auth", {
            xmlns: Strophe.NS.SASL,
            mechanism: this._sasl_mechanism.name });

          if (this._sasl_mechanism.isClientFirst) {
            var response = this._sasl_mechanism.onChallenge(this, null);
            request_auth_exchange.t(Base64.encode(response));
          }
          this.send(request_auth_exchange.tree());
          mechanism_found = true;
          break;
        }
        return mechanism_found;
      },

      /** PrivateFunction: _attemptLegacyAuth
          *
          *  Attempt legacy (i.e. non-SASL) authentication.
          *
          */
      _attemptLegacyAuth: function _attemptLegacyAuth() {
        if (Strophe.getNodeFromJid(this.jid) === null) {
          // we don't have a node, which is required for non-anonymous
          // client connections
          this._changeConnectStatus(
          Strophe.Status.CONNFAIL,
          'x-strophe-bad-non-anon-jid');

          this.disconnect('x-strophe-bad-non-anon-jid');
        } else {
          // Fall back to legacy authentication
          this._changeConnectStatus(Strophe.Status.AUTHENTICATING, null);
          this._addSysHandler(
          this._auth1_cb.bind(this),
          null, null, null, "_auth_1");

          this.send($iq({
            'type': "get",
            'to': this.domain,
            'id': "_auth_1" }).
          c("query", { xmlns: Strophe.NS.AUTH }).
          c("username", {}).t(Strophe.getNodeFromJid(this.jid)).
          tree());
        }
      },

      /** Function: authenticate
          * Set up authentication
          *
          *  Continues the initial connection request by setting up authentication
          *  handlers and starting the authentication process.
          *
          *  SASL authentication will be attempted if available, otherwise
          *  the code will fall back to legacy authentication.
          *
          *  Parameters:
          *    (Array) matched - Array of SASL mechanisms supported.
          *
          */
      authenticate: function authenticate(matched) {
        //console.log('authenticate');
        if (!this._attemptSASLAuth(matched)) {
          this._attemptLegacyAuth();
        }
      },

      /** PrivateFunction: _sasl_challenge_cb
          *  _Private_ handler for the SASL challenge
          *
          */
      _sasl_challenge_cb: function _sasl_challenge_cb(elem) {
        var challenge = Base64.decode(Strophe.getText(elem));
        var response = this._sasl_mechanism.onChallenge(this, challenge);
        var stanza = $build('response', {
          'xmlns': Strophe.NS.SASL });

        if (response !== "") {
          stanza.t(Base64.encode(response));
        }
        this.send(stanza.tree());
        return true;
      },

      /** PrivateFunction: _auth1_cb
          *  _Private_ handler for legacy authentication.
          *
          *  This handler is called in response to the initial <iq type='get'/>
          *  for legacy authentication.  It builds an authentication <iq/> and
          *  sends it, creating a handler (calling back to _auth2_cb()) to
          *  handle the result
          *
          *  Parameters:
          *    (XMLElement) elem - The stanza that triggered the callback.
          *
          *  Returns:
          *    false to remove the handler.
          */
      /* jshint unused:false */
      _auth1_cb: function _auth1_cb(elem) {
        // build plaintext auth iq
        var iq = $iq({ type: "set", id: "_auth_2" }).
        c('query', { xmlns: Strophe.NS.AUTH }).
        c('username', {}).t(Strophe.getNodeFromJid(this.jid)).
        up().
        c('password').t(this.pass);

        if (!Strophe.getResourceFromJid(this.jid)) {
          // since the user has not supplied a resource, we pick
          // a default one here.  unlike other auth methods, the server
          // cannot do this for us.
          this.jid = Strophe.getBareJidFromJid(this.jid) + '/strophe';
        }
        iq.up().c('resource', {}).t(Strophe.getResourceFromJid(this.jid));

        this._addSysHandler(this._auth2_cb.bind(this), null,
        null, null, "_auth_2");
        this.send(iq.tree());
        return false;
      },
      /* jshint unused:true */

      /** PrivateFunction: _sasl_success_cb
                                *  _Private_ handler for succesful SASL authentication.
                                *
                                *  Parameters:
                                *    (XMLElement) elem - The matching stanza.
                                *
                                *  Returns:
                                *    false to remove the handler.
                                */
      _sasl_success_cb: function _sasl_success_cb(elem) {
        //console.log('_sasl_success_cb', elem)
        if (this._sasl_data["server-signature"]) {
          var serverSignature;
          var success = Base64.decode(Strophe.getText(elem));
          var attribMatch = /([a-z]+)=([^,]+)(,|$)/;
          var matches = success.match(attribMatch);
          if (matches[1] == "v") {
            serverSignature = matches[2];
          }

          if (serverSignature != this._sasl_data["server-signature"]) {
            // remove old handlers
            this.deleteHandler(this._sasl_failure_handler);
            this._sasl_failure_handler = null;
            if (this._sasl_challenge_handler) {
              this.deleteHandler(this._sasl_challenge_handler);
              this._sasl_challenge_handler = null;
            }

            this._sasl_data = {};
            return this._sasl_failure_cb(null);
          }
        }
        Strophe.info("SASL authentication succeeded.");

        if (this._sasl_mechanism) {
          this._sasl_mechanism.onSuccess();
        }

        // remove old handlers
        this.deleteHandler(this._sasl_failure_handler);
        this._sasl_failure_handler = null;
        if (this._sasl_challenge_handler) {
          this.deleteHandler(this._sasl_challenge_handler);
          this._sasl_challenge_handler = null;
        }

        var streamfeature_handlers = [];
        var wrapper = function wrapper(handlers, elem) {
          while (handlers.length) {
            this.deleteHandler(handlers.pop());
          }
          this._sasl_auth1_cb.bind(this)(elem);
          return false;
        };
        streamfeature_handlers.push(this._addSysHandler(function (elem) {
          wrapper.bind(this)(streamfeature_handlers, elem);
        }.bind(this), null, "stream:features", null, null));
        streamfeature_handlers.push(this._addSysHandler(function (elem) {
          wrapper.bind(this)(streamfeature_handlers, elem);
        }.bind(this), Strophe.NS.STREAM, "features", null, null));

        // we must send an xmpp:restart now
        this._sendRestart();

        return false;
      },

      /** PrivateFunction: _sasl_auth1_cb
          *  _Private_ handler to start stream binding.
          *
          *  Parameters:
          *    (XMLElement) elem - The matching stanza.
          *
          *  Returns:
          *    false to remove the handler.
          */
      _sasl_auth1_cb: function _sasl_auth1_cb(elem) {
        //console.log('_sasl_auth1_cb', elem)

        // save stream:features for future usage
        this.features = elem;
        var i, child;
        for (i = 0; i < elem.childNodes.length; i++) {
          child = elem.childNodes[i];
          if (child.nodeName == 'bind') {
            this.do_bind = true;
          }

          if (child.nodeName == 'session') {
            this.do_session = true;
          }
        }

        if (!this.do_bind) {
          this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
          return false;
        } else {
          this._addSysHandler(this._sasl_bind_cb.bind(this), null, null,
          null, "_bind_auth_2");

          var resource = Strophe.getResourceFromJid(this.jid);
          if (resource) {
            this.send($iq({ type: "set", id: "_bind_auth_2" }).
            c('bind', { xmlns: Strophe.NS.BIND }).
            c('resource', {}).t(resource).tree());
          } else {
            this.send($iq({ type: "set", id: "_bind_auth_2" }).
            c('bind', { xmlns: Strophe.NS.BIND }).
            tree());
          }
        }
        return false;
      },

      /** PrivateFunction: _sasl_bind_cb
          *  _Private_ handler for binding result and session start.
          *
          *  Parameters:
          *    (XMLElement) elem - The matching stanza.
          *
          *  Returns:
          *    false to remove the handler.
          */
      _sasl_bind_cb: function _sasl_bind_cb(elem) {
        //console.log('_sasl_bind_cb', elem)

        if (elem.getAttribute("type") == "error") {
          Strophe.info("SASL binding failed.");
          var conflict = elem.getElementsByTagName("conflict"),condition;
          if (conflict.length > 0) {
            condition = 'conflict';
          }
          this._changeConnectStatus(Strophe.Status.AUTHFAIL, condition);
          return false;
        }

        // TODO - need to grab errors
        var bind = elem.getElementsByTagName("bind");
        var jidNode;
        if (bind.length > 0) {
          // Grab jid
          jidNode = bind[0].getElementsByTagName("jid");
          if (jidNode.length > 0) {
            this.jid = Strophe.getText(jidNode[0]);

            if (this.do_session) {
              this._addSysHandler(this._sasl_session_cb.bind(this),
              null, null, null, "_session_auth_2");

              this.send($iq({ type: "set", id: "_session_auth_2" }).
              c('session', { xmlns: Strophe.NS.SESSION }).
              tree());
            } else {
              this.authenticated = true;
              this._changeConnectStatus(Strophe.Status.CONNECTED, null);
            }
          }
        } else {
          Strophe.info("SASL binding failed.");
          this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
          return false;
        }
      },

      /** PrivateFunction: _sasl_session_cb
          *  _Private_ handler to finish successful SASL connection.
          *
          *  This sets Connection.authenticated to true on success, which
          *  starts the processing of user handlers.
          *
          *  Parameters:
          *    (XMLElement) elem - The matching stanza.
          *
          *  Returns:
          *    false to remove the handler.
          */
      _sasl_session_cb: function _sasl_session_cb(elem) {
        if (elem.getAttribute("type") == "result") {
          this.authenticated = true;
          this._changeConnectStatus(Strophe.Status.CONNECTED, null);
        } else if (elem.getAttribute("type") == "error") {
          Strophe.info("Session creation failed.");
          this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
          return false;
        }
        return false;
      },

      /** PrivateFunction: _sasl_failure_cb
          *  _Private_ handler for SASL authentication failure.
          *
          *  Parameters:
          *    (XMLElement) elem - The matching stanza.
          *
          *  Returns:
          *    false to remove the handler.
          */
      /* jshint unused:false */
      _sasl_failure_cb: function _sasl_failure_cb(elem) {
        // delete unneeded handlers
        if (this._sasl_success_handler) {
          this.deleteHandler(this._sasl_success_handler);
          this._sasl_success_handler = null;
        }
        if (this._sasl_challenge_handler) {
          this.deleteHandler(this._sasl_challenge_handler);
          this._sasl_challenge_handler = null;
        }

        if (this._sasl_mechanism)
        this._sasl_mechanism.onFailure();
        this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
        return false;
      },
      /* jshint unused:true */

      /** PrivateFunction: _auth2_cb
                                *  _Private_ handler to finish legacy authentication.
                                *
                                *  This handler is called when the result from the jabber:iq:auth
                                *  <iq/> stanza is returned.
                                *
                                *  Parameters:
                                *    (XMLElement) elem - The stanza that triggered the callback.
                                *
                                *  Returns:
                                *    false to remove the handler.
                                */
      _auth2_cb: function _auth2_cb(elem) {
        if (elem.getAttribute("type") == "result") {
          this.authenticated = true;
          this._changeConnectStatus(Strophe.Status.CONNECTED, null);
        } else if (elem.getAttribute("type") == "error") {
          this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
          this.disconnect('authentication failed');
        }
        return false;
      },

      /** PrivateFunction: _addSysTimedHandler
          *  _Private_ function to add a system level timed handler.
          *
          *  This function is used to add a Strophe.TimedHandler for the
          *  library code.  System timed handlers are allowed to run before
          *  authentication is complete.
          *
          *  Parameters:
          *    (Integer) period - The period of the handler.
          *    (Function) handler - The callback function.
          */
      _addSysTimedHandler: function _addSysTimedHandler(period, handler) {
        var thand = new Strophe.TimedHandler(period, handler);
        thand.user = false;
        this.addTimeds.push(thand);
        return thand;
      },

      /** PrivateFunction: _addSysHandler
          *  _Private_ function to add a system level stanza handler.
          *
          *  This function is used to add a Strophe.Handler for the
          *  library code.  System stanza handlers are allowed to run before
          *  authentication is complete.
          *
          *  Parameters:
          *    (Function) handler - The callback function.
          *    (String) ns - The namespace to match.
          *    (String) name - The stanza name to match.
          *    (String) type - The stanza type attribute to match.
          *    (String) id - The stanza id attribute to match.
          */
      _addSysHandler: function _addSysHandler(handler, ns, name, type, id) {
        var hand = new Strophe.Handler(handler, ns, name, type, id);
        hand.user = false;
        this.addHandlers.push(hand);
        return hand;
      },

      /** PrivateFunction: _onDisconnectTimeout
          *  _Private_ timeout handler for handling non-graceful disconnection.
          *
          *  If the graceful disconnect process does not complete within the
          *  time allotted, this handler finishes the disconnect anyway.
          *
          *  Returns:
          *    false to remove the handler.
          */
      _onDisconnectTimeout: function _onDisconnectTimeout() {
        Strophe.info("_onDisconnectTimeout was called");
        this._changeConnectStatus(Strophe.Status.CONNTIMEOUT, null);
        this._proto._onDisconnectTimeout();
        // actually disconnect
        this._doDisconnect();
        return false;
      },

      /** PrivateFunction: _onIdle
          *  _Private_ handler to process events during idle cycle.
          *
          *  This handler is called every 100ms to fire timed handlers that
          *  are ready and keep poll requests going.
          */
      _onIdle: function _onIdle(fail) {
        var i, thand, since, newList;

        // add timed handlers scheduled for addition
        // NOTE: we add before remove in the case a timed handler is
        // added and then deleted before the next _onIdle() call.
        while (this.addTimeds.length > 0) {
          this.timedHandlers.push(this.addTimeds.pop());
        }

        // remove timed handlers that have been scheduled for deletion
        while (this.removeTimeds.length > 0) {
          thand = this.removeTimeds.pop();
          i = this.timedHandlers.indexOf(thand);
          if (i >= 0) {
            this.timedHandlers.splice(i, 1);
          }
        }

        // call ready timed handlers
        var now = new Date().getTime();
        newList = [];
        for (i = 0; i < this.timedHandlers.length; i++) {
          thand = this.timedHandlers[i];
          if (this.authenticated || !thand.user) {
            since = thand.lastCalled + thand.period;
            if (since - now <= 0) {
              if (thand.run()) {
                newList.push(thand);
              }
            } else {
              newList.push(thand);
            }
          }
        }
        this.timedHandlers = newList;

        clearTimeout(this._idleTimeout);

        this._proto._onIdle(fail);

        // reactivate the timer only if connected
        if (this.connected) {
          // XXX: setTimeout should be called only with function expressions (23974bc1)
          this._idleTimeout = setTimeout(function () {
            this._onIdle(fail);
          }.bind(this), 100);
        }
      } };


    /** Class: Strophe.SASLMechanism
            *
            *  encapsulates SASL authentication mechanisms.
            *
            *  User code may override the priority for each mechanism or disable it completely.
            *  See <priority> for information about changing priority and <test> for informatian on
            *  how to disable a mechanism.
            *
            *  By default, all mechanisms are enabled and the priorities are
            *
            *  EXTERNAL - 60
            *  OAUTHBEARER - 50
            *  SCRAM-SHA1 - 40
            *  DIGEST-MD5 - 30
            *  PLAIN - 20
            *  ANONYMOUS - 10
            *
            *  See: Strophe.Connection.addSupportedSASLMechanisms
            */

    /**
                * PrivateConstructor: Strophe.SASLMechanism
                * SASL auth mechanism abstraction.
                *
                *  Parameters:
                *    (String) name - SASL Mechanism name.
                *    (Boolean) isClientFirst - If client should send response first without challenge.
                *    (Number) priority - Priority.
                *
                *  Returns:
                *    A new Strophe.SASLMechanism object.
                */
    Strophe.SASLMechanism = function (name, isClientFirst, priority) {
      /** PrivateVariable: name
                                                                       *  Mechanism name.
                                                                       */
      this.name = name;
      /** PrivateVariable: isClientFirst
                         *  If client sends response without initial server challenge.
                         */
      this.isClientFirst = isClientFirst;
      /** Variable: priority
                                           *  Determines which <SASLMechanism> is chosen for authentication (Higher is better).
                                           *  Users may override this to prioritize mechanisms differently.
                                           *
                                           *  In the default configuration the priorities are
                                           *
                                           *  SCRAM-SHA1 - 40
                                           *  DIGEST-MD5 - 30
                                           *  Plain - 20
                                           *
                                           *  Example: (This will cause Strophe to choose the mechanism that the server sent first)
                                           *
                                           *  > Strophe.SASLMD5.priority = Strophe.SASLSHA1.priority;
                                           *
                                           *  See <SASL mechanisms> for a list of available mechanisms.
                                           *
                                           */
      this.priority = priority;
    };

    Strophe.SASLMechanism.prototype = {
      /**
                                         *  Function: test
                                         *  Checks if mechanism able to run.
                                         *  To disable a mechanism, make this return false;
                                         *
                                         *  To disable plain authentication run
                                         *  > Strophe.SASLPlain.test = function() {
                                        *  >   return false;
                                        *  > }
                                         *
                                         *  See <SASL mechanisms> for a list of available mechanisms.
                                         *
                                         *  Parameters:
                                         *    (Strophe.Connection) connection - Target Connection.
                                         *
                                         *  Returns:
                                         *    (Boolean) If mechanism was able to run.
                                         */
      /* jshint unused:false */
      test: function test(connection) {
        return true;
      },
      /* jshint unused:true */

      /** PrivateFunction: onStart
                                *  Called before starting mechanism on some connection.
                                *
                                *  Parameters:
                                *    (Strophe.Connection) connection - Target Connection.
                                */
      onStart: function onStart(connection) {
        this._connection = connection;
      },

      /** PrivateFunction: onChallenge
          *  Called by protocol implementation on incoming challenge. If client is
          *  first (isClientFirst == true) challenge will be null on the first call.
          *
          *  Parameters:
          *    (Strophe.Connection) connection - Target Connection.
          *    (String) challenge - current challenge to handle.
          *
          *  Returns:
          *    (String) Mechanism response.
          */
      /* jshint unused:false */
      onChallenge: function onChallenge(connection, challenge) {
        throw new Error("You should implement challenge handling!");
      },
      /* jshint unused:true */

      /** PrivateFunction: onFailure
                                *  Protocol informs mechanism implementation about SASL failure.
                                */
      onFailure: function onFailure() {
        this._connection = null;
      },

      /** PrivateFunction: onSuccess
          *  Protocol informs mechanism implementation about SASL success.
          */
      onSuccess: function onSuccess() {
        this._connection = null;
      } };


    /** Constants: SASL mechanisms
            *  Available authentication mechanisms
            *
            *  Strophe.SASLAnonymous - SASL ANONYMOUS authentication.
            *  Strophe.SASLPlain - SASL PLAIN authentication.
            *  Strophe.SASLMD5 - SASL DIGEST-MD5 authentication
            *  Strophe.SASLSHA1 - SASL SCRAM-SHA1 authentication
            *  Strophe.SASLOAuthBearer - SASL OAuth Bearer authentication
            *  Strophe.SASLExternal - SASL EXTERNAL authentication
            */

    // Building SASL callbacks

    /** PrivateConstructor: SASLAnonymous
     *  SASL ANONYMOUS authentication.
     */
    Strophe.SASLAnonymous = function () {
    };
    Strophe.SASLAnonymous.prototype = new Strophe.SASLMechanism("ANONYMOUS", false, 10);

    Strophe.SASLAnonymous.prototype.test = function (connection) {
      return connection.authcid === null;
    };


    /** PrivateConstructor: SASLPlain
        *  SASL PLAIN authentication.
        */
    Strophe.SASLPlain = function () {
    };
    Strophe.SASLPlain.prototype = new Strophe.SASLMechanism("PLAIN", true, 20);

    Strophe.SASLPlain.prototype.test = function (connection) {
      return connection.authcid !== null;
    };

    Strophe.SASLPlain.prototype.onChallenge = function (connection) {
      var auth_str = connection.authzid;
      auth_str = auth_str + "\0";
      auth_str = auth_str + connection.authcid;
      auth_str = auth_str + "\0";
      auth_str = auth_str + connection.pass;
      return utils.utf16to8(auth_str);
    };


    /** PrivateConstructor: SASLSHA1
        *  SASL SCRAM SHA 1 authentication.
        */
    Strophe.SASLSHA1 = function () {
    };
    Strophe.SASLSHA1.prototype = new Strophe.SASLMechanism("SCRAM-SHA-1", true, 40);

    Strophe.SASLSHA1.prototype.test = function (connection) {
      return connection.authcid !== null;
    };

    Strophe.SASLSHA1.prototype.onChallenge = function (connection, challenge, test_cnonce) {
      var cnonce = test_cnonce || MD5.hexdigest(Math.random() * 1234567890);
      var auth_str = "n=" + utils.utf16to8(connection.authcid);
      auth_str += ",r=";
      auth_str += cnonce;
      connection._sasl_data.cnonce = cnonce;
      connection._sasl_data["client-first-message-bare"] = auth_str;

      auth_str = "n,," + auth_str;

      this.onChallenge = function (connection, challenge) {
        var nonce, salt, iter, Hi, U, U_old, i, k, pass;
        var clientKey, serverKey, clientSignature;
        var responseText = "c=biws,";
        var authMessage = connection._sasl_data["client-first-message-bare"] + "," +
        challenge + ",";
        var cnonce = connection._sasl_data.cnonce;
        var attribMatch = /([a-z]+)=([^,]+)(,|$)/;

        while (challenge.match(attribMatch)) {
          var matches = challenge.match(attribMatch);
          challenge = challenge.replace(matches[0], "");
          switch (matches[1]) {
            case "r":
              nonce = matches[2];
              break;
            case "s":
              salt = matches[2];
              break;
            case "i":
              iter = matches[2];
              break;}

        }

        if (nonce.substr(0, cnonce.length) !== cnonce) {
          connection._sasl_data = {};
          return connection._sasl_failure_cb();
        }

        responseText += "r=" + nonce;
        authMessage += responseText;

        salt = Base64.decode(salt);
        salt += "\x00\x00\x00\x01";

        pass = utils.utf16to8(connection.pass);
        Hi = U_old = SHA1.core_hmac_sha1(pass, salt);
        for (i = 1; i < iter; i++) {
          U = SHA1.core_hmac_sha1(pass, SHA1.binb2str(U_old));
          for (k = 0; k < 5; k++) {
            Hi[k] ^= U[k];
          }
          U_old = U;
        }
        Hi = SHA1.binb2str(Hi);

        clientKey = SHA1.core_hmac_sha1(Hi, "Client Key");
        serverKey = SHA1.str_hmac_sha1(Hi, "Server Key");
        clientSignature = SHA1.core_hmac_sha1(SHA1.str_sha1(SHA1.binb2str(clientKey)), authMessage);
        connection._sasl_data["server-signature"] = SHA1.b64_hmac_sha1(serverKey, authMessage);

        for (k = 0; k < 5; k++) {
          clientKey[k] ^= clientSignature[k];
        }

        responseText += ",p=" + Base64.encode(SHA1.binb2str(clientKey));
        return responseText;
      }.bind(this);

      return auth_str;
    };


    /** PrivateConstructor: SASLMD5
        *  SASL DIGEST MD5 authentication.
        */
    Strophe.SASLMD5 = function () {
    };
    Strophe.SASLMD5.prototype = new Strophe.SASLMechanism("DIGEST-MD5", false, 30);

    Strophe.SASLMD5.prototype.test = function (connection) {
      return connection.authcid !== null;
    };

    /** PrivateFunction: _quote
        *  _Private_ utility function to backslash escape and quote strings.
        *
        *  Parameters:
        *    (String) str - The string to be quoted.
        *
        *  Returns:
        *    quoted string
        */
    Strophe.SASLMD5.prototype._quote = function (str) {
      return '"' + str.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
      //" end string workaround for emacs
    };

    Strophe.SASLMD5.prototype.onChallenge = function (connection, challenge, test_cnonce) {
      var attribMatch = /([a-z]+)=("[^"]+"|[^,"]+)(?:,|$)/;
      var cnonce = test_cnonce || MD5.hexdigest("" + Math.random() * 1234567890);
      var realm = "";
      var host = null;
      var nonce = "";
      var qop = "";
      var matches;

      while (challenge.match(attribMatch)) {
        matches = challenge.match(attribMatch);
        challenge = challenge.replace(matches[0], "");
        matches[2] = matches[2].replace(/^"(.+)"$/, "$1");
        switch (matches[1]) {
          case "realm":
            realm = matches[2];
            break;
          case "nonce":
            nonce = matches[2];
            break;
          case "qop":
            qop = matches[2];
            break;
          case "host":
            host = matches[2];
            break;}

      }

      var digest_uri = connection.servtype + "/" + connection.domain;
      if (host !== null) {
        digest_uri = digest_uri + "/" + host;
      }

      var cred = utils.utf16to8(connection.authcid + ":" + realm + ":" + this._connection.pass);
      var A1 = MD5.hash(cred) + ":" + nonce + ":" + cnonce;
      var A2 = 'AUTHENTICATE:' + digest_uri;

      var responseText = "";
      responseText += 'charset=utf-8,';
      responseText += 'username=' + this._quote(utils.utf16to8(connection.authcid)) + ',';
      responseText += 'realm=' + this._quote(realm) + ',';
      responseText += 'nonce=' + this._quote(nonce) + ',';
      responseText += 'nc=00000001,';
      responseText += 'cnonce=' + this._quote(cnonce) + ',';
      responseText += 'digest-uri=' + this._quote(digest_uri) + ',';
      responseText += 'response=' + MD5.hexdigest(MD5.hexdigest(A1) + ":" +
      nonce + ":00000001:" +
      cnonce + ":auth:" +
      MD5.hexdigest(A2)) + ",";
      responseText += 'qop=auth';

      this.onChallenge = function () {
        return "";
      };
      return responseText;
    };


    /** PrivateConstructor: SASLOAuthBearer
        *  SASL OAuth Bearer authentication.
        */
    Strophe.SASLOAuthBearer = function () {
    };
    Strophe.SASLOAuthBearer.prototype = new Strophe.SASLMechanism("OAUTHBEARER", true, 50);

    Strophe.SASLOAuthBearer.prototype.test = function (connection) {
      return connection.authcid !== null;
    };

    Strophe.SASLOAuthBearer.prototype.onChallenge = function (connection) {
      var auth_str = 'n,a=';
      auth_str = auth_str + connection.authzid;
      auth_str = auth_str + ',';
      auth_str = auth_str + "\x01";
      auth_str = auth_str + 'auth=Bearer ';
      auth_str = auth_str + connection.pass;
      auth_str = auth_str + "\x01";
      auth_str = auth_str + "\x01";
      return utils.utf16to8(auth_str);
    };


    /** PrivateConstructor: SASLExternal
        *  SASL EXTERNAL authentication.
        *
        *  The EXTERNAL mechanism allows a client to request the server to use
        *  credentials established by means external to the mechanism to
        *  authenticate the client. The external means may be, for instance,
        *  TLS services.
        */
    Strophe.SASLExternal = function () {
    };
    Strophe.SASLExternal.prototype = new Strophe.SASLMechanism("EXTERNAL", true, 60);

    Strophe.SASLExternal.prototype.onChallenge = function (connection) {
      /** According to XEP-178, an authzid SHOULD NOT be presented when the
                                                                         * authcid contained or implied in the client certificate is the JID (i.e.
                                                                         * authzid) with which the user wants to log in as.
                                                                         *
                                                                         * To NOT send the authzid, the user should therefore set the authcid equal
                                                                         * to the JID when instantiating a new Strophe.Connection object.
                                                                         */
      return connection.authcid === connection.authzid ? '' : connection.authzid;
    };

    return {
      Strophe: Strophe,
      $build: $build,
      $msg: $msg,
      $iq: $iq,
      $pres: $pres,
      SHA1: SHA1,
      Base64: Base64,
      MD5: MD5 };

  });


  /*
       This program is distributed under the terms of the MIT license.
       Please see the LICENSE file for details.
      	 Copyright 2006-2008, OGG, LLC
       */


  /* jshint undef: true, unused: true:, noarg: true, latedef: true */
  /* global define, window, setTimeout, clearTimeout, XMLHttpRequest, ActiveXObject, Strophe, $build */

  (function (root, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_5__], __WEBPACK_LOCAL_MODULE_6__ = ((function (core) {
        return factory(
        core.Strophe,
        core.$build);

      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)));
    } else {}
  })(this, function (Strophe, $build) {

    /** PrivateClass: Strophe.Request
                                        *  _Private_ helper class that provides a cross implementation abstraction
                                        *  for a BOSH related XMLHttpRequest.
                                        *
                                        *  The Strophe.Request class is used internally to encapsulate BOSH request
                                        *  information.  It is not meant to be used from user's code.
                                        */

    /** PrivateConstructor: Strophe.Request
                                            *  Create and initialize a new Strophe.Request object.
                                            *
                                            *  Parameters:
                                            *    (XMLElement) elem - The XML data to be sent in the request.
                                            *    (Function) func - The function that will be called when the
                                            *      XMLHttpRequest readyState changes.
                                            *    (Integer) rid - The BOSH rid attribute associated with this request.
                                            *    (Integer) sends - The number of times this same request has been sent.
                                            */
    Strophe.Request = function (elem, func, rid, sends) {
      this.id = ++Strophe._requestId;
      this.xmlData = elem;
      this.data = Strophe.serialize(elem);
      // save original function in case we need to make a new request
      // from this one.
      this.origFunc = func;
      this.func = func;
      this.rid = rid;
      this.date = NaN;
      this.sends = sends || 0;
      this.abort = false;
      this.dead = null;

      this.age = function () {
        if (!this.date) {
          return 0;
        }
        var now = new Date();
        return (now - this.date) / 1000;
      };
      this.timeDead = function () {
        if (!this.dead) {
          return 0;
        }
        var now = new Date();
        return (now - this.dead) / 1000;
      };
      this.xhr = this._newXHR();
    };

    Strophe.Request.prototype = {
      /** PrivateFunction: getResponse
                                   *  Get a response from the underlying XMLHttpRequest.
                                   *
                                   *  This function attempts to get a response from the request and checks
                                   *  for errors.
                                   *
                                   *  Throws:
                                   *    "parsererror" - A parser error occured.
                                   *    "badformat" - The entity has sent XML that cannot be processed.
                                   *
                                   *  Returns:
                                   *    The DOM element tree of the response.
                                   */
      getResponse: function getResponse() {
        var node = null;
        if (this.xhr.responseXML && this.xhr.responseXML.documentElement) {
          node = this.xhr.responseXML.documentElement;
          if (node.tagName == "parsererror") {
            Strophe.error("invalid response received");
            Strophe.error("responseText: " + this.xhr.responseText);
            Strophe.error("responseXML: " +
            Strophe.serialize(this.xhr.responseXML));
            throw "parsererror";
          }
        } else if (this.xhr.responseText) {
          Strophe.error("invalid response received");
          Strophe.error("responseText: " + this.xhr.responseText);
          throw "badformat";
        }

        return node;
      },

      /** PrivateFunction: _newXHR
          *  _Private_ helper function to create XMLHttpRequests.
          *
          *  This function creates XMLHttpRequests across all implementations.
          *
          *  Returns:
          *    A new XMLHttpRequest.
          */
      _newXHR: function _newXHR() {
        var xhr = null;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType("text/xml; charset=utf-8");
          }
        } else if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        // use Function.bind() to prepend ourselves as an argument
        xhr.onreadystatechange = this.func.bind(null, this);
        return xhr;
      } };


    /** Class: Strophe.Bosh
            *  _Private_ helper class that handles BOSH Connections
            *
            *  The Strophe.Bosh class is used internally by Strophe.Connection
            *  to encapsulate BOSH sessions. It is not meant to be used from user's code.
            */

    /** File: bosh.js
                *  A JavaScript library to enable BOSH in Strophejs.
                *
                *  this library uses Bidirectional-streams Over Synchronous HTTP (BOSH)
                *  to emulate a persistent, stateful, two-way connection to an XMPP server.
                *  More information on BOSH can be found in XEP 124.
                */

    /** PrivateConstructor: Strophe.Bosh
                    *  Create and initialize a Strophe.Bosh object.
                    *
                    *  Parameters:
                    *    (Strophe.Connection) connection - The Strophe.Connection that will use BOSH.
                    *
                    *  Returns:
                    *    A new Strophe.Bosh object.
                    */
    Strophe.Bosh = function (connection) {
      this._conn = connection;
      /* request id for body tags */
      this.rid = Math.floor(Math.random() * 4294967295);
      /* The current session ID. */
      this.sid = null;

      // default BOSH values
      this.hold = 1;
      this.wait = 60;
      this.window = 5;
      this.errors = 0;

      this._requests = [];
    };

    Strophe.Bosh.prototype = {
      /** Variable: strip
                                *
                                *  BOSH-Connections will have all stanzas wrapped in a <body> tag when
                                *  passed to <Strophe.Connection.xmlInput> or <Strophe.Connection.xmlOutput>.
                                *  To strip this tag, User code can set <Strophe.Bosh.strip> to "body":
                                *
                                *  > Strophe.Bosh.prototype.strip = "body";
                                *
                                *  This will enable stripping of the body tag in both
                                *  <Strophe.Connection.xmlInput> and <Strophe.Connection.xmlOutput>.
                                */
      strip: null,

      /** PrivateFunction: _buildBody
                    *  _Private_ helper function to generate the <body/> wrapper for BOSH.
                    *
                    *  Returns:
                    *    A Strophe.Builder with a <body/> element.
                    */
      _buildBody: function _buildBody() {
        var bodyWrap = $build('body', {
          rid: this.rid++,
          xmlns: Strophe.NS.HTTPBIND });

        if (this.sid !== null) {
          bodyWrap.attrs({ sid: this.sid });
        }
        if (this._conn.options.keepalive && this._conn._sessionCachingSupported()) {
          this._cacheSession();
        }
        return bodyWrap;
      },

      /** PrivateFunction: _reset
          *  Reset the connection.
          *
          *  This function is called by the reset function of the Strophe Connection
          */
      _reset: function _reset() {
        this.rid = Math.floor(Math.random() * 4294967295);
        this.sid = null;
        this.errors = 0;
        if (this._conn._sessionCachingSupported()) {
          window.sessionStorage.removeItem('strophe-bosh-session');
        }

        this._conn.nextValidRid(this.rid);
      },

      /** PrivateFunction: _connect
          *  _Private_ function that initializes the BOSH connection.
          *
          *  Creates and sends the Request that initializes the BOSH connection.
          */
      _connect: function _connect(wait, hold, route) {
        this.wait = wait || this.wait;
        this.hold = hold || this.hold;
        this.errors = 0;

        // build the body tag
        var body = this._buildBody().attrs({
          to: this._conn.domain,
          "xml:lang": "en",
          wait: this.wait,
          hold: this.hold,
          content: "text/xml; charset=utf-8",
          ver: "1.6",
          "xmpp:version": "1.0",
          "xmlns:xmpp": Strophe.NS.BOSH });


        if (route) {
          body.attrs({
            route: route });

        }

        var _connect_cb = this._conn._connect_cb;

        this._requests.push(
        new Strophe.Request(body.tree(),
        this._onRequestStateChange.bind(
        this, _connect_cb.bind(this._conn)),
        body.tree().getAttribute("rid")));
        this._throttledRequestHandler();
      },

      /** PrivateFunction: _attach
          *  Attach to an already created and authenticated BOSH session.
          *
          *  This function is provided to allow Strophe to attach to BOSH
          *  sessions which have been created externally, perhaps by a Web
          *  application.  This is often used to support auto-login type features
          *  without putting user credentials into the page.
          *
          *  Parameters:
          *    (String) jid - The full JID that is bound by the session.
          *    (String) sid - The SID of the BOSH session.
          *    (String) rid - The current RID of the BOSH session.  This RID
          *      will be used by the next request.
          *    (Function) callback The connect callback function.
          *    (Integer) wait - The optional HTTPBIND wait value.  This is the
          *      time the server will wait before returning an empty result for
          *      a request.  The default setting of 60 seconds is recommended.
          *      Other settings will require tweaks to the Strophe.TIMEOUT value.
          *    (Integer) hold - The optional HTTPBIND hold value.  This is the
          *      number of connections the server will hold at one time.  This
          *      should almost always be set to 1 (the default).
          *    (Integer) wind - The optional HTTBIND window value.  This is the
          *      allowed range of request ids that are valid.  The default is 5.
          */
      _attach: function _attach(jid, sid, rid, callback, wait, hold, wind) {
        this._conn.jid = jid;
        this.sid = sid;
        this.rid = rid;

        this._conn.connect_callback = callback;

        this._conn.domain = Strophe.getDomainFromJid(this._conn.jid);

        this._conn.authenticated = true;
        this._conn.connected = true;

        this.wait = wait || this.wait;
        this.hold = hold || this.hold;
        this.window = wind || this.window;

        this._conn._changeConnectStatus(Strophe.Status.ATTACHED, null);
      },

      /** PrivateFunction: _restore
          *  Attempt to restore a cached BOSH session
          *
          *  Parameters:
          *    (String) jid - The full JID that is bound by the session.
          *      This parameter is optional but recommended, specifically in cases
          *      where prebinded BOSH sessions are used where it's important to know
          *      that the right session is being restored.
          *    (Function) callback The connect callback function.
          *    (Integer) wait - The optional HTTPBIND wait value.  This is the
          *      time the server will wait before returning an empty result for
          *      a request.  The default setting of 60 seconds is recommended.
          *      Other settings will require tweaks to the Strophe.TIMEOUT value.
          *    (Integer) hold - The optional HTTPBIND hold value.  This is the
          *      number of connections the server will hold at one time.  This
          *      should almost always be set to 1 (the default).
          *    (Integer) wind - The optional HTTBIND window value.  This is the
          *      allowed range of request ids that are valid.  The default is 5.
          */
      _restore: function _restore(jid, callback, wait, hold, wind) {
        var session = JSON.parse(window.sessionStorage.getItem('strophe-bosh-session'));
        if (typeof session !== "undefined" &&
        session !== null &&
        session.rid &&
        session.sid &&
        session.jid && (
        typeof jid === "undefined" || jid === null || Strophe.getBareJidFromJid(session.jid) == Strophe.getBareJidFromJid(jid))) {
          this._conn.restored = true;
          this._attach(session.jid, session.sid, session.rid, callback, wait, hold, wind);
        } else {
          throw { name: "StropheSessionError", message: "_restore: no restoreable session." };
        }
      },

      /** PrivateFunction: _cacheSession
          *  _Private_ handler for the beforeunload event.
          *
          *  This handler is used to process the Bosh-part of the initial request.
          *  Parameters:
          *    (Strophe.Request) bodyWrap - The received stanza.
          */
      _cacheSession: function _cacheSession() {
        if (this._conn.authenticated) {
          if (this._conn.jid && this.rid && this.sid) {
            window.sessionStorage.setItem('strophe-bosh-session', JSON.stringify({
              'jid': this._conn.jid,
              'rid': this.rid,
              'sid': this.sid }));

          }
        } else {
          window.sessionStorage.removeItem('strophe-bosh-session');
        }
      },

      /** PrivateFunction: _connect_cb
          *  _Private_ handler for initial connection request.
          *
          *  This handler is used to process the Bosh-part of the initial request.
          *  Parameters:
          *    (Strophe.Request) bodyWrap - The received stanza.
          */
      _connect_cb: function _connect_cb(bodyWrap) {
        var typ = bodyWrap.getAttribute("type");
        var cond, conflict;
        if (typ !== null && typ == "terminate") {
          // an error occurred
          cond = bodyWrap.getAttribute("condition");
          Strophe.error("BOSH-Connection failed: " + cond);
          conflict = bodyWrap.getElementsByTagName("conflict");
          if (cond !== null) {
            if (cond == "remote-stream-error" && conflict.length > 0) {
              cond = "conflict";
            }
            this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, cond);
          } else {
            this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, "unknown");
          }
          this._conn._doDisconnect(cond);
          return Strophe.Status.CONNFAIL;
        }

        // check to make sure we don't overwrite these if _connect_cb is
        // called multiple times in the case of missing stream:features
        if (!this.sid) {
          this.sid = bodyWrap.getAttribute("sid");
        }
        var wind = bodyWrap.getAttribute('requests');
        if (wind) {
          this.window = parseInt(wind, 10);
        }
        var hold = bodyWrap.getAttribute('hold');
        if (hold) {
          this.hold = parseInt(hold, 10);
        }
        var wait = bodyWrap.getAttribute('wait');
        if (wait) {
          this.wait = parseInt(wait, 10);
        }
      },

      /** PrivateFunction: _disconnect
          *  _Private_ part of Connection.disconnect for Bosh
          *
          *  Parameters:
          *    (Request) pres - This stanza will be sent before disconnecting.
          */
      _disconnect: function _disconnect(pres) {
        this._sendTerminate(pres);
      },

      /** PrivateFunction: _doDisconnect
          *  _Private_ function to disconnect.
          *
          *  Resets the SID and RID.
          */
      _doDisconnect: function _doDisconnect() {
        this.sid = null;
        this.rid = Math.floor(Math.random() * 4294967295);
        if (this._conn._sessionCachingSupported()) {
          window.sessionStorage.removeItem('strophe-bosh-session');
        }

        this._conn.nextValidRid(this.rid);
      },

      /** PrivateFunction: _emptyQueue
          * _Private_ function to check if the Request queue is empty.
          *
          *  Returns:
          *    True, if there are no Requests queued, False otherwise.
          */
      _emptyQueue: function _emptyQueue() {
        return this._requests.length === 0;
      },

      /** PrivateFunction: _callProtocolErrorHandlers
          *  _Private_ function to call error handlers registered for HTTP errors.
          *
          *  Parameters:
          *    (Strophe.Request) req - The request that is changing readyState.
          */
      _callProtocolErrorHandlers: function _callProtocolErrorHandlers(req) {
        var reqStatus = this._getRequestStatus(req),
        err_callback;
        err_callback = this._conn.protocolErrorHandlers.HTTP[reqStatus];
        if (err_callback) {
          err_callback.call(this, reqStatus);
        }
      },

      /** PrivateFunction: _hitError
          *  _Private_ function to handle the error count.
          *
          *  Requests are resent automatically until their error count reaches
          *  5.  Each time an error is encountered, this function is called to
          *  increment the count and disconnect if the count is too high.
          *
          *  Parameters:
          *    (Integer) reqStatus - The request status.
          */
      _hitError: function _hitError(reqStatus) {
        this.errors++;
        Strophe.warn("request errored, status: " + reqStatus +
        ", number of errors: " + this.errors);
        if (this.errors > 4) {
          this._conn._onDisconnectTimeout();
        }
      },

      /** PrivateFunction: _no_auth_received
          *
          * Called on stream start/restart when no stream:features
          * has been received and sends a blank poll request.
          */
      _no_auth_received: function _no_auth_received(_callback) {
        //console.log('_no_auth_received')

        if (_callback) {
          _callback = _callback.bind(this._conn);
        } else {
          _callback = this._conn._connect_cb.bind(this._conn);
        }
        var body = this._buildBody();
        this._requests.push(
        new Strophe.Request(body.tree(),
        this._onRequestStateChange.bind(
        this, _callback.bind(this._conn)),
        body.tree().getAttribute("rid")));
        //console.log(this._requests)
        this._throttledRequestHandler();
      },

      /** PrivateFunction: _onDisconnectTimeout
          *  _Private_ timeout handler for handling non-graceful disconnection.
          *
          *  Cancels all remaining Requests and clears the queue.
          */
      _onDisconnectTimeout: function _onDisconnectTimeout() {
        this._abortAllRequests();
      },

      /** PrivateFunction: _abortAllRequests
          *  _Private_ helper function that makes sure all pending requests are aborted.
          */
      _abortAllRequests: function _abortAllRequests() {
        var req;
        while (this._requests.length > 0) {
          req = this._requests.pop();
          req.abort = true;
          req.xhr.abort();
          // jslint complains, but this is fine. setting to empty func
          // is necessary for IE6
          req.xhr.onreadystatechange = function () {
          }; // jshint ignore:line
        }
      },

      /** PrivateFunction: _onIdle
          *  _Private_ handler called by Strophe.Connection._onIdle
          *
          *  Sends all queued Requests or polls with empty Request if there are none.
          */
      _onIdle: function _onIdle() {
        var data = this._conn._data;
        // if no requests are in progress, poll
        if (this._conn.authenticated && this._requests.length === 0 &&
        data.length === 0 && !this._conn.disconnecting) {
          Strophe.info("no requests during idle cycle, sending " +
          "blank request");
          data.push(null);
        }

        if (this._conn.paused) {
          return;
        }

        if (this._requests.length < 2 && data.length > 0) {
          var body = this._buildBody();
          for (var i = 0; i < data.length; i++) {
            if (data[i] !== null) {
              if (data[i] === "restart") {
                body.attrs({
                  to: this._conn.domain,
                  "xml:lang": "en",
                  "xmpp:restart": "true",
                  "xmlns:xmpp": Strophe.NS.BOSH });

              } else {
                body.cnode(data[i]).up();
              }
            }
          }
          delete this._conn._data;
          this._conn._data = [];
          this._requests.push(
          new Strophe.Request(body.tree(),
          this._onRequestStateChange.bind(
          this, this._conn._dataRecv.bind(this._conn)),
          body.tree().getAttribute("rid")));
          this._throttledRequestHandler();
        }

        if (this._requests.length > 0) {
          var time_elapsed = this._requests[0].age();
          if (this._requests[0].dead !== null) {
            if (this._requests[0].timeDead() >
            Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait)) {
              this._throttledRequestHandler();
            }
          }

          if (time_elapsed > Math.floor(Strophe.TIMEOUT * this.wait)) {
            Strophe.warn("Request " +
            this._requests[0].id +
            " timed out, over " + Math.floor(Strophe.TIMEOUT * this.wait) +
            " seconds since last activity");
            this._throttledRequestHandler();
          }
        }
      },

      /** PrivateFunction: _getRequestStatus
          *
          *  Returns the HTTP status code from a Strophe.Request
          *
          *  Parameters:
          *    (Strophe.Request) req - The Strophe.Request instance.
          *    (Integer) def - The default value that should be returned if no
          *          status value was found.
          */
      _getRequestStatus: function _getRequestStatus(req, def) {
        var reqStatus;
        if (req.xhr.readyState == 4) {
          try {
            reqStatus = req.xhr.status;
          } catch (e) {
            // ignore errors from undefined status attribute. Works
            // around a browser bug
            Strophe.error(
            "Caught an error while retrieving a request's status, " +
            "reqStatus: " + reqStatus);
          }
        }
        if (typeof reqStatus == "undefined") {
          reqStatus = typeof def === 'number' ? def : 0;
        }
        return reqStatus;
      },

      /** PrivateFunction: _onRequestStateChange
          *  _Private_ handler for Strophe.Request state changes.
          *
          *  This function is called when the XMLHttpRequest readyState changes.
          *  It contains a lot of error handling logic for the many ways that
          *  requests can fail, and calls the request callback when requests
          *  succeed.
          *
          *  Parameters:
          *    (Function) func - The handler for the request.
          *    (Strophe.Request) req - The request that is changing readyState.
          */
      _onRequestStateChange: function _onRequestStateChange(func, req) {
        Strophe.debug("request id " + req.id + "." + req.sends +
        " state changed to " + req.xhr.readyState);
        if (req.abort) {
          req.abort = false;
          return;
        }
        if (req.xhr.readyState !== 4) {
          // The request is not yet complete
          return;
        }
        var reqStatus = this._getRequestStatus(req);
        if (this.disconnecting && reqStatus >= 400) {
          this._hitError(reqStatus);
          this._callProtocolErrorHandlers(req);
          return;
        }

        if (reqStatus > 0 && reqStatus < 500 || req.sends > 5) {
          // remove from internal queue
          this._removeRequest(req);
          Strophe.debug("request id " + req.id + " should now be removed");
        }

        if (reqStatus == 200) {
          // request succeeded
          var reqIs0 = this._requests[0] == req;
          var reqIs1 = this._requests[1] == req;
          // if request 1 finished, or request 0 finished and request
          // 1 is over Strophe.SECONDARY_TIMEOUT seconds old, we need to
          // restart the other - both will be in the first spot, as the
          // completed request has been removed from the queue already
          if (reqIs1 ||
          reqIs0 && this._requests.length > 0 &&
          this._requests[0].age() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait)) {
            this._restartRequest(0);
          }
          this._conn.nextValidRid(Number(req.rid) + 1);
          Strophe.debug("request id " + req.id + "." + req.sends + " got 200");
          func(req); // call handler
          this.errors = 0;
        } else if (reqStatus === 0 ||
        reqStatus >= 400 && reqStatus < 600 ||
        reqStatus >= 12000) {
          // request failed
          Strophe.error("request id " + req.id + "." + req.sends + " error " + reqStatus + " happened");
          this._hitError(reqStatus);
          this._callProtocolErrorHandlers(req);
          if (reqStatus >= 400 && reqStatus < 500) {
            this._conn._changeConnectStatus(Strophe.Status.DISCONNECTING, null);
            this._conn._doDisconnect();
          }
        } else {
          Strophe.error("request id " + req.id + "." + req.sends + " error " + reqStatus + " happened");
        }
        if (!(reqStatus > 0 && reqStatus < 500) || req.sends > 5) {
          this._throttledRequestHandler();
        }
      },

      /** PrivateFunction: _processRequest
          *  _Private_ function to process a request in the queue.
          *
          *  This function takes requests off the queue and sends them and
          *  restarts dead requests.
          *
          *  Parameters:
          *    (Integer) i - The index of the request in the queue.
          */
      _processRequest: function _processRequest(i) {
        var self = this;
        var req = this._requests[i];
        var reqStatus = this._getRequestStatus(req, -1);

        // make sure we limit the number of retries
        if (req.sends > this._conn.maxRetries) {
          this._conn._onDisconnectTimeout();
          return;
        }

        var time_elapsed = req.age();
        var primaryTimeout = !isNaN(time_elapsed) &&
        time_elapsed > Math.floor(Strophe.TIMEOUT * this.wait);
        var secondaryTimeout = req.dead !== null &&
        req.timeDead() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait);
        var requestCompletedWithServerError = req.xhr.readyState == 4 && (
        reqStatus < 1 || reqStatus >= 500);
        if (primaryTimeout || secondaryTimeout ||
        requestCompletedWithServerError) {
          if (secondaryTimeout) {
            Strophe.error("Request " + this._requests[i].id +
            " timed out (secondary), restarting");
          }
          req.abort = true;
          req.xhr.abort();
          // setting to null fails on IE6, so set to empty function
          req.xhr.onreadystatechange = function () {
          };
          this._requests[i] = new Strophe.Request(req.xmlData,
          req.origFunc,
          req.rid,
          req.sends);
          req = this._requests[i];
        }

        if (req.xhr.readyState === 0) {
          Strophe.debug("request id " + req.id + "." + req.sends + " posting");

          try {
            var contentType = this._conn.options.contentType || "text/xml; charset=utf-8";
            req.xhr.open("POST", this._conn.service, this._conn.options.sync ? false : true);
            if (typeof req.xhr.setRequestHeader !== 'undefined') {
              // IE9 doesn't have setRequestHeader
              req.xhr.setRequestHeader("Content-Type", contentType);
            }
            if (this._conn.options.withCredentials) {
              req.xhr.withCredentials = true;
            }
          } catch (e2) {
            Strophe.error("XHR open failed.");
            if (!this._conn.connected) {
              this._conn._changeConnectStatus(
              Strophe.Status.CONNFAIL, "bad-service");
            }
            this._conn.disconnect();
            return;
          }

          // Fires the XHR request -- may be invoked immediately
          // or on a gradually expanding retry window for reconnects
          var sendFunc = function sendFunc() {
            req.date = new Date();
            if (self._conn.options.customHeaders) {
              var headers = self._conn.options.customHeaders;
              for (var header in headers) {
                if (headers.hasOwnProperty(header)) {
                  req.xhr.setRequestHeader(header, headers[header]);
                }
              }
            }
            req.xhr.send(req.data);
          };

          // Implement progressive backoff for reconnects --
          // First retry (send == 1) should also be instantaneous
          if (req.sends > 1) {
            // Using a cube of the retry number creates a nicely
            // expanding retry window
            var backoff = Math.min(Math.floor(Strophe.TIMEOUT * this.wait),
            Math.pow(req.sends, 3)) * 1000;
            setTimeout(function () {
              // XXX: setTimeout should be called only with function expressions (23974bc1)
              sendFunc();
            }, backoff);
          } else {
            sendFunc();
          }

          req.sends++;

          if (this._conn.xmlOutput !== Strophe.Connection.prototype.xmlOutput) {
            if (req.xmlData.nodeName === this.strip && req.xmlData.childNodes.length) {
              this._conn.xmlOutput(req.xmlData.childNodes[0]);
            } else {
              this._conn.xmlOutput(req.xmlData);
            }
          }
          if (this._conn.rawOutput !== Strophe.Connection.prototype.rawOutput) {
            this._conn.rawOutput(req.data);
          }
        } else {
          Strophe.debug("_processRequest: " + (
          i === 0 ? "first" : "second") +
          " request has readyState of " +
          req.xhr.readyState);
        }
      },

      /** PrivateFunction: _removeRequest
          *  _Private_ function to remove a request from the queue.
          *
          *  Parameters:
          *    (Strophe.Request) req - The request to remove.
          */
      _removeRequest: function _removeRequest(req) {
        Strophe.debug("removing request");
        var i;
        for (i = this._requests.length - 1; i >= 0; i--) {
          if (req == this._requests[i]) {
            this._requests.splice(i, 1);
          }
        }
        // IE6 fails on setting to null, so set to empty function
        req.xhr.onreadystatechange = function () {
        };
        this._throttledRequestHandler();
      },

      /** PrivateFunction: _restartRequest
          *  _Private_ function to restart a request that is presumed dead.
          *
          *  Parameters:
          *    (Integer) i - The index of the request in the queue.
          */
      _restartRequest: function _restartRequest(i) {
        var req = this._requests[i];
        if (req.dead === null) {
          req.dead = new Date();
        }

        this._processRequest(i);
      },

      /** PrivateFunction: _reqToData
          * _Private_ function to get a stanza out of a request.
          *
          * Tries to extract a stanza out of a Request Object.
          * When this fails the current connection will be disconnected.
          *
          *  Parameters:
          *    (Object) req - The Request.
          *
          *  Returns:
          *    The stanza that was passed.
          */
      _reqToData: function _reqToData(req) {
        try {
          return req.getResponse();
        } catch (e) {
          if (e != "parsererror") {
            throw e;
          }
          this._conn.disconnect("strophe-parsererror");
        }
      },

      /** PrivateFunction: _sendTerminate
          *  _Private_ function to send initial disconnect sequence.
          *
          *  This is the first step in a graceful disconnect.  It sends
          *  the BOSH server a terminate body and includes an unavailable
          *  presence if authentication has completed.
          */
      _sendTerminate: function _sendTerminate(pres) {
        Strophe.info("_sendTerminate was called");
        var body = this._buildBody().attrs({ type: "terminate" });
        if (pres) {
          body.cnode(pres.tree());
        }
        var req = new Strophe.Request(
        body.tree(),
        this._onRequestStateChange.bind(
        this, this._conn._dataRecv.bind(this._conn)),
        body.tree().getAttribute("rid"));

        this._requests.push(req);
        this._throttledRequestHandler();
      },

      /** PrivateFunction: _send
          *  _Private_ part of the Connection.send function for BOSH
          *
          * Just triggers the RequestHandler to send the messages that are in the queue
          */
      _send: function _send(fail) {
        clearTimeout(this._conn._idleTimeout);
        this._throttledRequestHandler();

        // XXX: setTimeout should be called only with function expressions (23974bc1)
        this._conn._idleTimeout = setTimeout(function () {
          this._onIdle(fail);
        }.bind(this._conn), 100);
      },

      /** PrivateFunction: _sendRestart
          *
          *  Send an xmpp:restart stanza.
          */
      _sendRestart: function _sendRestart() {
        this._throttledRequestHandler();
        clearTimeout(this._conn._idleTimeout);
      },

      /** PrivateFunction: _throttledRequestHandler
          *  _Private_ function to throttle requests to the connection window.
          *
          *  This function makes sure we don't send requests so fast that the
          *  request ids overflow the connection window in the case that one
          *  request died.
          */
      _throttledRequestHandler: function _throttledRequestHandler() {
        if (!this._requests) {
          Strophe.debug("_throttledRequestHandler called with " +
          "undefined requests");
        } else {
          Strophe.debug("_throttledRequestHandler called with " +
          this._requests.length + " requests");
        }

        if (!this._requests || this._requests.length === 0) {
          return;
        }

        if (this._requests.length > 0) {
          this._processRequest(0);
        }

        if (this._requests.length > 1 &&
        Math.abs(this._requests[0].rid -
        this._requests[1].rid) < this.window) {
          this._processRequest(1);
        }
      } };

    return Strophe;
  });

  /*
       This program is distributed under the terms of the MIT license.
       Please see the LICENSE file for details.
      	 Copyright 2006-2008, OGG, LLC
       */


  /* jshint undef: true, unused: true:, noarg: true, latedef: true */
  /* global define, window, clearTimeout, WebSocket, DOMParser, Strophe, $build */

  (function (root, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_5__], __WEBPACK_LOCAL_MODULE_7__ = ((function (core) {
        return factory(
        core.Strophe,
        core.$build);

      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)));
    } else {}
  })(this, function (Strophe, $build) {
    //console.log(Strophe)
    var _socketTask = undefined;
    /** Class: Strophe.WebSocket
                                  *  _Private_ helper class that handles WebSocket Connections
                                  *
                                  *  The Strophe.WebSocket class is used internally by Strophe.Connection
                                  *  to encapsulate WebSocket sessions. It is not meant to be used from user's code.
                                  */

    /** File: websocket.js
                                      *  A JavaScript library to enable XMPP over Websocket in Strophejs.
                                      *
                                      *  This file implements XMPP over WebSockets for Strophejs.
                                      *  If a Connection is established with a Websocket url (ws://...)
                                      *  Strophe will use WebSockets.
                                      *  For more information on XMPP-over-WebSocket see RFC 7395:
                                      *  http://tools.ietf.org/html/rfc7395
                                      *
                                      *  WebSocket support implemented by Andreas Guth (andreas.guth@rwth-aachen.de)
                                      */

    /** PrivateConstructor: Strophe.Websocket
                                          *  Create and initialize a Strophe.WebSocket object.
                                          *  Currently only sets the connection Object.
                                          *
                                          *  Parameters:
                                          *    (Strophe.Connection) connection - The Strophe.Connection that will use WebSockets.
                                          *
                                          *  Returns:
                                          *    A new Strophe.WebSocket object.
                                          */
    Strophe.Websocket = function (connection) {
      //console.log(connection)
      this._conn = connection;
      this.strip = "wrapper";

      var service = connection.service; //"wss://im-api.sandbox.easemob.com/ws/"
      if (service.indexOf("ws:") !== 0 && service.indexOf("wss:") !== 0) {
        // If the service is not an absolute URL, assume it is a path and put the absolute
        // URL together from options, current URL and the path.
        var new_service = "";

        if (connection.options.protocol === "ws" && window.location.protocol !== "https:") {
          new_service += "ws";
        } else {
          new_service += "wss";
        }

        new_service += "://" + window.location.host;

        if (service.indexOf("/") !== 0) {
          new_service += window.location.pathname + service;
        } else {
          new_service += service;
        }

        connection.service = new_service;
      }
    };

    Strophe.Websocket.prototype = {
      /** PrivateFunction: _buildStream
                                     *  _Private_ helper function to generate the <stream> start tag for WebSockets
                                     *
                                     *  Returns:
                                     *    A Strophe.Builder with a <stream> element.
                                     */
      _buildStream: function _buildStream() {
        return $build("open", {
          "xmlns": Strophe.NS.FRAMING,
          "to": this._conn.domain,
          "version": '1.0' });

      },

      /** PrivateFunction: _check_streamerror
          * _Private_ checks a message for stream:error
          *
          *  Parameters:
          *    (Strophe.Request) bodyWrap - The received stanza.
          *    connectstatus - The ConnectStatus that will be set on error.
          *  Returns:
          *     true if there was a streamerror, false otherwise.
          */
      _check_streamerror: function _check_streamerror(bodyWrap, connectstatus) {
        var errors;
        if (bodyWrap.getElementsByTagNameNS) {
          errors = bodyWrap.getElementsByTagNameNS(Strophe.NS.STREAM, "error");
        } else {
          errors = bodyWrap.getElementsByTagName("stream:error");
        }
        if (errors.length === 0) {
          return false;
        }
        var error = errors[0];

        var condition = "";
        var text = "";

        var ns = "urn:ietf:params:xml:ns:xmpp-streams";
        for (var i = 0; i < error.childNodes.length; i++) {
          var e = error.childNodes[i];
          if (e.getAttribute("xmlns") !== ns) {
            break;
          }
          if (e.nodeName === "text") {
            text = e.textContent;
          } else {
            condition = e.nodeName;
          }
        }

        var errorString = "WebSocket stream error: ";

        if (condition) {
          errorString += condition;
        } else {
          errorString += "unknown";
        }

        if (text) {
          errorString += " - " + condition;
        }

        Strophe.error(errorString);

        // close the connection on stream_error
        this._conn._changeConnectStatus(connectstatus, condition);
        this._conn._doDisconnect();
        return true;
      },

      /** PrivateFunction: _reset
          *  Reset the connection.
          *
          *  This function is called by the reset function of the Strophe Connection.
          *  Is not needed by WebSockets.
          */
      _reset: function _reset() {
        return;
      },

      /** PrivateFunction: _connect
          *  _Private_ function called by Strophe.Connection.connect
          *
          *  Creates a WebSocket for a connection and assigns Callbacks to it.
          *  Does nothing if there already is a WebSocket.
          */

      _connect: function _connect() {
        // Ensure that there is no open WebSocket from a previous Connection.
        // Create the new WobSocket
        var isAndroid = false;
        var res = uni.getSystemInfoSync();
        if (res.platform == "devtools") {
          isAndroid = false;
        } else if (res.platform == "ios") {
          isAndroid = false;
        } else if (res.platform == "android") {
          isAndroid = true;
        }

        var me = this;
        this.socket = {
          onopen: this._onOpen,
          onmessage: this._connect_cb_wrapper,
          onerror: this._onError,
          onclose: this._onClose,
          send: function send(str) {
            uni.sendSocketMessage({ data: str });
          } };


        function creatSocket() {
          if (_socketTask) {
            console.log('有sockettask了。。。');
            _socketTask.close();
            _socketTask = undefined;
          }

          setTimeout(function () {
            var SocketTask = uni.connectSocket({
              url: me._conn.service,
              fail: function fail(e) {
                console.log('连接失败', e);
                //部分机型从后台切回前台状态有延迟
                if (e.errMsg.indexOf('suspend') != -1) {
                  creatSocket();
                }
              },
              success: function success(e) {
                console.log('连接成功', e);
              } });

            _socketTask = SocketTask;

            _socketTask.onOpen(function (res) {
              console.log("WebSocket 连接已打开！");
              isSocketConnnected = true;
              // wx.sendSocketMessage({
              //     data: "Hello,World:"
              // });
              me.socket.onopen.call(me);
            });
            _socketTask.onMessage(function (msg) {
              //console.log("onSocketMessage", msg, JSON.stringify(msg));
              me.socket.onmessage.call(me, msg);
            });
            _socketTask.onClose(function (e) {
              console.log("WebSocket 连接已经关闭！");
              isSocketConnnected = false;
              me._conn.connected = true;
              me.socket.onclose.call(me);
              // 外部回调，需要设计一个更合适的
              me._onSocketClose && me._onSocketClose(e);
              //me._conn._changeConnectStatus(Strophe.Status.DISCONNECTED, e);
            });
            _socketTask.onError(function (e) {
              console.log('出错了 出错了');

              if (isAndroid) {
                console.log('安卓');
                //这个是安卓操作系统
                isSocketConnnected = false;
                me._conn.connected = true;
                me.socket.onclose.call(me);
                // 外部回调，需要设计一个更合适的
                me._onSocketClose && me._onSocketClose(e);
              } else {
                me.socket.onclose.call(me);
              }

            });

          }, 1000);
        }
        creatSocket();

      },

      /** PrivateFunction: _connect_cb
          *  _Private_ function called by Strophe.Connection._connect_cb
          *
          * checks for stream:error
          *
          *  Parameters:
          *    (Strophe.Request) bodyWrap - The received stanza.
          */
      _connect_cb: function _connect_cb(bodyWrap) {
        //console.log('connnect_cb', bodyWrap)
        var error = this._check_streamerror(bodyWrap, Strophe.Status.CONNFAIL);
        if (error) {
          return Strophe.Status.CONNFAIL;
        }
      },

      /** PrivateFunction: _handleStreamStart
          * _Private_ function that checks the opening <open /> tag for errors.
          *
          * Disconnects if there is an error and returns false, true otherwise.
          *
          *  Parameters:
          *    (Node) message - Stanza containing the <open /> tag.
          */
      _handleStreamStart: function _handleStreamStart(message) {
        var error = false;

        //console.log('_handleStreamStart', message, typeof message)

        // Check for errors in the <open /> tag
        var ns = message.getAttribute("xmlns");
        if (typeof ns !== "string") {
          error = "Missing xmlns in <open />";
        } else if (ns !== Strophe.NS.FRAMING) {
          error = "Wrong xmlns in <open />: " + ns;
        }

        var ver = message.getAttribute("version");
        if (typeof ver !== "string") {
          error = "Missing version in <open />";
        } else if (ver !== "1.0") {
          error = "Wrong version in <open />: " + ver;
        }

        if (error) {
          this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, error);
          this._conn._doDisconnect();
          return false;
        }

        return true;
      },

      /** PrivateFunction: _connect_cb_wrapper
          * _Private_ function that handles the first connection messages.
          *
          * On receiving an opening stream tag this callback replaces itself with the real
          * message handler. On receiving a stream error the connection is terminated.
          */
      _connect_cb_wrapper: function _connect_cb_wrapper(message) {
        //console.log('_connect_cb_wrapper inited')

        if (message.data.indexOf("<open ") === 0 || message.data.indexOf("<?xml") === 0) {
          //console.log('_connect_cb_wrapper open 2')

          // Strip the XML Declaration, if there is one
          var data = message.data.replace(/^(<\?.*?\?>\s*)*/, "");
          //console.log('_connect_cb_wrapper open 3', data)

          if (data === '') return;

          //console.log(new DOMParser().parseFromString(data, "text/xml"))
          //console.log('_connect_cb_wrapper open 3.1', data)

          var streamStart = new DOMParser().parseFromString(data, "text/xml").documentElement;
          //console.log('_connect_cb_wrapper open 4', streamStart)
          this._conn.xmlInput(streamStart);
          this._conn.rawInput(message.data);

          //_handleStreamSteart will check for XML errors and disconnect on error
          //console.log('_handleStreamStart', streamStart)
          if (this._handleStreamStart(streamStart)) {
            //_connect_cb will check for stream:error and disconnect on error
            //console.log('_connect_cb')
            this._connect_cb(streamStart);
          }
        } else if (message.data.indexOf("<close ") === 0) {//'<close xmlns="urn:ietf:params:xml:ns:xmpp-framing />') {
          //console.log('_connect_cb_wrapper inited 3')
          this._conn.rawInput(message.data);
          this._conn.xmlInput(message);
          var see_uri = message.getAttribute("see-other-uri");
          if (see_uri) {
            this._conn._changeConnectStatus(Strophe.Status.REDIRECT, "Received see-other-uri, resetting connection");
            this._conn.reset();
            this._conn.service = see_uri;
            this._connect();
          } else {
            this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, "Received closing stream");
            this._conn._doDisconnect();
          }
        } else {
          //console.log('_connect_cb_wrapper inited 4')

          var string = this._streamWrap(message.data);
          //console.log('_connect_cb_wrapper inited 5')

          var elem = new DOMParser().parseFromString(string, "text/xml").documentElement;
          //console.log('_connect_cb_wrapper inited 6')

          this.socket.onmessage = this._onMessage.bind(this);
          //console.log('_connect_cb_wrapper inited 7')

          this._conn._connect_cb(elem, null, message.data);
        }
      },

      /** PrivateFunction: _disconnect
          *  _Private_ function called by Strophe.Connection.disconnect
          *
          *  Disconnects and sends a last stanza if one is given
          *
          *  Parameters:
          *    (Request) pres - This stanza will be sent before disconnecting.
          */
      _disconnect: function _disconnect(pres) {
        console.log('_disconnect', this.socket.readyState, !!this.socket);
        //  && this.socket.readyState !== WebSocket.CLOSED
        if (this.socket) {
          if (pres) {
            this._conn.send(pres);
          }
          var close = $build("close", { "xmlns": Strophe.NS.FRAMING });
          this._conn.xmlOutput(close);
          var closeString = Strophe.serialize(close);
          this._conn.rawOutput(closeString);
          try {
            this.socket.send(closeString);
          } catch (e) {
            Strophe.info("Couldn't send <close /> tag.");
          }
        }
        this._conn._doDisconnect();
      },

      /** PrivateFunction: _doDisconnect
          *  _Private_ function to disconnect.
          *
          *  Just closes the Socket for WebSockets
          */
      _doDisconnect: function _doDisconnect() {
        Strophe.info("WebSockets _doDisconnect was called");
        this._closeSocket && this._closeSocket();
      },

      /** PrivateFunction _streamWrap
          *  _Private_ helper function to wrap a stanza in a <stream> tag.
          *  This is used so Strophe can process stanzas from WebSockets like BOSH
          */
      _streamWrap: function _streamWrap(stanza) {
        return "<wrapper>" + stanza + '</wrapper>';
      },


      /** PrivateFunction: _closeSocket
          *  _Private_ function to close the WebSocket.
          *
          *  Closes the socket if it is still open and deletes it
          */
      // _closeSocket: function () {
      //     if (this.socket) { try {
      //         this.socket.close();
      //     } catch (e) {} }
      //     this.socket = null;
      // },

      /** PrivateFunction: _emptyQueue
       * _Private_ function to check if the message queue is empty.
       *
       *  Returns:
       *    True, because WebSocket messages are send immediately after queueing.
       */
      _emptyQueue: function _emptyQueue() {
        return true;
      },

      /** PrivateFunction: _onClose
          * _Private_ function to handle websockets closing.
          *
          * Nothing to do here for WebSockets
          */
      _onClose: function _onClose() {
        if (this._conn.connected && !this._conn.disconnecting) {
          Strophe.error("Websocket closed unexpectedly");
          this._conn._doDisconnect();
        } else {
          Strophe.info("Websocket closed");
        }
      },

      /** PrivateFunction: _no_auth_received
          *
          * Called on stream start/restart when no stream:features
          * has been received.
          */
      _no_auth_received: function _no_auth_received(_callback) {
        Strophe.error("Server did not send any auth methods");
        this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, "Server did not send any auth methods");
        if (_callback) {
          _callback = _callback.bind(this._conn);
          _callback();
        }
        this._conn._doDisconnect();
      },

      /** PrivateFunction: _onDisconnectTimeout
          *  _Private_ timeout handler for handling non-graceful disconnection.
          *
          *  This does nothing for WebSockets
          */
      _onDisconnectTimeout: function _onDisconnectTimeout() {
      },

      /** PrivateFunction: _abortAllRequests
          *  _Private_ helper function that makes sure all pending requests are aborted.
          */
      _abortAllRequests: function _abortAllRequests() {
      },

      /** PrivateFunction: _onError
          * _Private_ function to handle websockets errors.
          *
          * Parameters:
          * (Object) error - The websocket error.
          */
      _onError: function _onError(error) {
        uni.onSocketError(function (res) {
          // console.log('WebSocket连接打开失败，请检查！')
        });
        // Strophe.error("Websocket error " + error);
        // this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, "The WebSocket connection could not be established or was disconnected.");
        // this._disconnect();
      },

      /** PrivateFunction: _onIdle
          *  _Private_ function called by Strophe.Connection._onIdle
          *
          *  sends all queued stanzas
          */
      _onIdle: function _onIdle(_fail) {
        var data = this._conn._data;
        if (data.length > 0 && !this._conn.paused) {
          for (var i = 0; i < data.length; i++) {
            if (data[i] !== null) {
              var stanza, rawStanza;
              if (data[i] === "restart") {
                stanza = this._buildStream().tree();
              } else {
                stanza = data[i];
              }
              rawStanza = Strophe.serialize(stanza);

              this._conn.xmlOutput(stanza);
              this._conn.rawOutput(rawStanza);
              // onsend todo
              if (isSocketConnnected) {
                uni.sendSocketMessage({
                  data: rawStanza,
                  fail: function fail() {
                    console.log('socjet发送失败');
                    _fail && _fail('socket error');
                  },
                  success: function success() {

                  } });

              } else {
                //this._conn._doDisconnect();
                isSocketConnnected = false;
                _fail && _fail('socket disconnnected');
                //this._changeConnectStatus(Strophe.Status.DISCONNECTED, null);
              }

              //this.socket.send(rawStanza);
            }
          }
          this._conn._data = [];
        }
      },

      /** PrivateFunction: _onMessage
          * _Private_ function to handle websockets messages.
          *
          * This function parses each of the messages as if they are full documents.
          * [TODO : We may actually want to use a SAX Push parser].
          *
          * Since all XMPP traffic starts with
          *  <stream:stream version='1.0'
          *                 xml:lang='en'
          *                 xmlns='jabber:client'
          *                 xmlns:stream='http://etherx.jabber.org/streams'
          *                 id='3697395463'
          *                 from='SERVER'>
          *
          * The first stanza will always fail to be parsed.
          *
          * Additionally, the seconds stanza will always be <stream:features> with
          * the stream NS defined in the previous stanza, so we need to 'force'
          * the inclusion of the NS in this stanza.
          *
          * Parameters:
          * (string) message - The websocket message.
          */
      _onMessage: function _onMessage(message) {
        //console.log('_onMessage')
        // wx.sendSocketMessage({
        //   data: message
        // })
        var elem, data;
        // check for closing stream
        var close = '<close xmlns="urn:ietf:params:xml:ns:xmpp-framing" />';
        if (message.data === close) {
          this._conn.rawInput(close);
          this._conn.xmlInput(message);
          if (!this._conn.disconnecting) {
            this._conn._doDisconnect();
          }
          return;
        } else if (message.data.search("<open ") === 0) {
          // This handles stream restarts
          elem = new DOMParser().parseFromString(message.data, "text/xml").documentElement;
          if (!this._handleStreamStart(elem)) {
            return;
          }
        } else {
          data = this._streamWrap(message.data);
          elem = new DOMParser().parseFromString(data, "text/xml").documentElement;
        }

        if (this._check_streamerror(elem, Strophe.Status.ERROR)) {
          return;
        }

        //handle unavailable presence stanza before disconnecting
        if (this._conn.disconnecting &&
        elem.firstChild.nodeName === "presence" &&
        elem.firstChild.getAttribute("type") === "unavailable") {
          this._conn.xmlInput(elem);
          this._conn.rawInput(Strophe.serialize(elem));
          // if we are already disconnecting we will ignore the unavailable stanza and
          // wait for the </stream:stream> tag before we close the connection
          return;
        }
        this._conn._dataRecv(elem, message.data);
      },

      /** PrivateFunction: _onOpen
          * _Private_ function to handle websockets connection setup.
          *
          * The opening stream tag is sent here.
          */
      _onOpen: function _onOpen() {
        Strophe.info("Websocket open");
        var start = this._buildStream();
        this._conn.xmlOutput(start.tree());

        var startString = Strophe.serialize(start);
        this._conn.rawOutput(startString);
        // onsend todo
        //console.log('startString', startString)
        //_socketTask.send({data: startString})
        uni.sendSocketMessage({ data: startString });
        //this.socket.send(rawStanza);
        // this.socket.send(startString);
      },

      /** PrivateFunction: _reqToData
          * _Private_ function to get a stanza out of a request.
          *
          * WebSockets don't use requests, so the passed argument is just returned.
          *
          *  Parameters:
          *    (Object) stanza - The stanza.
          *
          *  Returns:
          *    The stanza that was passed.
          */
      _reqToData: function _reqToData(stanza) {
        return stanza;
      },

      /** PrivateFunction: _send
          *  _Private_ part of the Connection.send function for WebSocket
          *
          * Just flushes the messages that are in the queue
          */
      _send: function _send(flush) {
        this._conn.flush(flush);
      },

      /** PrivateFunction: _sendRestart
          *
          *  Send an xmpp:restart stanza.
          */
      _sendRestart: function _sendRestart() {
        clearTimeout(this._conn._idleTimeout);
        this._conn._onIdle.bind(this._conn)();
      } };

    return Strophe;
  });

  (function (root) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __WEBPACK_LOCAL_MODULE_5__,
      __WEBPACK_LOCAL_MODULE_6__,
      __WEBPACK_LOCAL_MODULE_7__], __WEBPACK_AMD_DEFINE_RESULT__ = (function (wrapper) {
        return wrapper;
      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  })(this);

  /* jshint ignore:start */
  if (callback) {
    if (true) {
      //For backwards compatability
      var n_callback = callback;
      if (typeof requirejs === 'function') {
        requirejs(["./strophe"], function (o) {
          n_callback(o.Strophe, o.$build, o.$msg, o.$iq, o.$pres);
        });
      } else {
        Promise.resolve(/*! AMD require */).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(/*! ./strophe */ 9)]; (function (o) {
          n_callback(o.Strophe, o.$build, o.$msg, o.$iq, o.$pres);
        }).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);}).catch(__webpack_require__.oe);
      }
    } else {}
  }


}).bind(window)(function (Strophe, build, msg, iq, pres) {
  // window.Strophe = Strophe;
  // //console.log(window.Strophe)
  // window.$build = build;
  // window.$msg = msg;
  // window.$iq = iq;
  // window.$pres = pres;
});
/* jshint ignore:end */
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
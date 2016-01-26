(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("filofax", [], factory);
	else if(typeof exports === 'object')
		exports["filofax"] = factory();
	else
		root["filofax"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StackTrace = __webpack_require__(1);
	
	var Filofax = function () {
	  function Filofax(opts) {
	    _classCallCheck(this, Filofax);
	
	    // 时间生命周期 1 分钟
	    this.lifetime = 1 * 60 * 1000;
	
	    // 单个时间滑窗 10s
	    this.shottime = 10 * 1000;
	
	    // 滑窗个数
	    this.maxSize = this.lifetime / this.shottime;
	
	    this.stack = [];
	    for (var i = 0, len = this.maxSize - 1; i <= len; i++) {
	      // 单个时间滑窗对象
	      this.stack[i] = {};
	    }
	
	    this.startime = performance.now();
	  }
	
	  _createClass(Filofax, [{
	    key: 'shot',
	    value: function shot(opts) {
	      var now = performance.now();
	      var interval = now - this.startime;
	
	      var cursor = Math.floor(interval / this.shottime % this.maxSize);
	
	      var trace = this.stack[cursor];
	
	      if (opts instanceof Error) {
	        var frame = StackTrace.parse(opts);
	      } else {
	        var frame = StackTrace.get(opts);
	      }
	
	      if (trace) {
	        var keys = Object.keys(trace);
	        if (keys.indexOf(frame.rootToken) === -1) {
	          trace[frame.rootToken] = [];
	        }
	        trace[frame.rootToken].push(frame.toString());
	      }
	    }
	  }, {
	    key: 'dump',
	    value: function dump() {
	      console.log(this.stack);
	    }
	  }]);
	
	  return Filofax;
	}();
	
	module.exports = Filofax;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * 1. format function callsite to StackFrame Object
	 * 2. format Error Object to StackFrame Object
	 */
	
	var StackFrame = __webpack_require__(2);
	// var md5 = require('blueimp-md5');
	var lastStackFrame = null;
	
	var StackTrace = function () {
	  function StackTrace() {
	    _classCallCheck(this, StackTrace);
	  }
	
	  _createClass(StackTrace, null, [{
	    key: 'makeToken',
	    value: function makeToken(str) {
	      return str + ':' + performance.now();
	    }
	  }, {
	    key: 'get',
	    value: function get(opts, belowFn) {
	      // get stack callsite array
	      var orig = Error.prepareStackTrace;
	      Error.prepareStackTrace = function (_, stack) {
	        return stack;
	      };
	      var err = new Error();
	      /**
	       * when strict mode, arguments.callee not work
	       * getFunction() return undefined
	       * getThis return undefined
	       */
	      // Error.captureStackTrace(err, belowFn || StackTrace.get);
	      Error.captureStackTrace(err, belowFn || arguments.callee);
	
	      var stack = err.stack;
	      Error.prepareStackTrace = orig;
	
	      var firstCaller = stack[1];
	      var functionName = firstCaller.getFunctionName();
	
	      if (opts && opts.type === 'root') {
	        var rootToken = StackTrace.makeToken(functionName);
	        var parentToken = null;
	        var token = rootToken;
	      } else {
	        var interval = performance.now() - lastStackFrame.time;
	        if (interval >= 50000) {
	          // TODO: 大于 50ms 的异步、定时任务情况处理
	        } else {
	            var rootToken = lastStackFrame.rootToken;
	            var parentToken = lastStackFrame.token;
	            var token = StackTrace.makeToken(functionName);
	          }
	      }
	
	      var func = firstCaller.getFunction();
	      var args = Array.prototype.slice.call(func.arguments, 0);
	      var sf = new StackFrame({
	        typeName: firstCaller.getTypeName(),
	        functionName: firstCaller.getFunctionName(),
	        fileName: firstCaller.getFileName(),
	        args: args,
	        lineNumber: firstCaller.getLineNumber(),
	        columnNumber: firstCaller.getColumnNumber(),
	        isConstructor: firstCaller.isConstructor(),
	        isToplevel: firstCaller.isToplevel(),
	        rootToken: rootToken,
	        parentToken: parentToken,
	        token: token
	      });
	
	      lastStackFrame = sf;
	      // console.log(sf.toString());
	      return sf;
	    }
	  }, {
	    key: 'parse',
	    value: function parse(err) {
	      // var V8_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
	      var V8_STACK_REGEXP = /at (?:(.+)\s+\()?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/;
	      var TYPE_FUNCTION_REGEXP = /([^\.]+)(?:\.(.+))?/;
	      var errStack = err.stack.split('\n');
	
	      var errInfo = errStack[0];
	      var firstCaller = errStack[1];
	
	      var match = firstCaller.match(V8_STACK_REGEXP);
	
	      if (match) {
	        var typeMatch = match[1].match(TYPE_FUNCTION_REGEXP);
	        var typeName = typeMatch[1];
	        var functionName = typeMatch[2];
	
	        var fileName = match[2];
	        var lineNumber = parseInt(match[3], 10);
	        var columnNumber = parseInt(match[4], 10);
	      } else {
	        var typeName = '';
	        var functionName = '';
	        var fileName = '';
	        var lineNumber = 0;
	        var columnNumber = 0;
	      }
	
	      var sf = new StackFrame({
	        prefix: errInfo,
	        typeName: typeName,
	        functionName: functionName,
	        fileName: fileName,
	        args: [],
	        lineNumber: lineNumber,
	        columnNumber: columnNumber,
	        rootToken: lastStackFrame.rootToken,
	        parentToken: lastStackFrame.token,
	        token: StackTrace.makeToken(functionName)
	      });
	
	      // console.log(sf.toString());
	      return sf;
	    }
	  }]);
	
	  return StackTrace;
	}();
	
	module.exports = StackTrace;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * 自定义的 stack frame 对象 
	 * 类似于 V8 https://github.com/v8/v8/wiki/Stack%20Trace%20API
	 */
	
	var StackFrame = function () {
	  function StackFrame(obj) {
	    _classCallCheck(this, StackFrame);
	
	    if (obj instanceof Object) {
	      // string
	      this.prefix = obj.prefix ? obj.prefix + '@' : '';
	      this.typeName = obj.typeName || 'Object';
	      this.functionName = obj.functionName || '';
	      this.fileName = obj.fileName || '';
	      // 后台解析 source-map
	      this.source = obj.source || '';
	
	      // array
	      this.args = obj.args || [];
	
	      // number
	      this.lineNumber = StackFrame.isNumber(obj.lineNumber) ? obj.lineNumber : 0;
	      this.columnNumber = StackFrame.isNumber(obj.columnNumber) ? obj.columnNumber : 0;
	
	      // boolean
	      this.isConstructor = obj.isConstructor;
	      this.isToplevel = obj.isToplevel;
	
	      // token
	      this.rootToken = obj.rootToken || null;
	      this.parentToken = obj.parentToken || null;
	      this.token = obj.token || null;
	
	      // init hrt time
	      if (window.performance) {
	        this.time = window.performance.now();
	      } else {
	        this.time = null;
	      }
	    } else {
	      console.warn('stackframe arguments must be object!');
	    }
	  }
	
	  _createClass(StackFrame, [{
	    key: 'toString',
	    value: function toString() {
	      var typeName = this.getTypeName() || '';
	      var functionName = this.getFunctionName() || '{anonymous}';
	      var args = this.getArgs().join(',');
	      var fileName = this.getFileName();
	      var lineNumber = this.getLineNumber();
	      var columnNumber = this.getColumnNumber();
	      var rootToken = this.getRootToken();
	      var parentToken = this.getParentToken();
	      var token = this.getToken();
	
	      return '' + this.prefix + typeName + '.' + functionName + '(' + args + ')@' + fileName + ':' + lineNumber + ':' + columnNumber + '@' + rootToken + '-' + parentToken + '-' + token;
	    }
	  }, {
	    key: 'getTypeName',
	    value: function getTypeName() {
	      return this.typeName;
	    }
	  }, {
	    key: 'getFunctionName',
	    value: function getFunctionName() {
	      return this.functionName;
	    }
	  }, {
	    key: 'getFileName',
	    value: function getFileName() {
	      return this.fileName;
	    }
	  }, {
	    key: 'getSource',
	    value: function getSource() {
	      return this.source;
	    }
	  }, {
	    key: 'getArgs',
	    value: function getArgs() {
	      return this.args;
	    }
	  }, {
	    key: 'getLineNumber',
	    value: function getLineNumber() {
	      return this.lineNumber;
	    }
	  }, {
	    key: 'getColumnNumber',
	    value: function getColumnNumber() {
	      return this.columnNumber;
	    }
	  }, {
	    key: 'isToplevel',
	    value: function isToplevel() {
	      return this.isToplevel;
	    }
	  }, {
	    key: 'isConstructor',
	    value: function isConstructor() {
	      return this.isConstructor;
	    }
	  }, {
	    key: 'getRootToken',
	    value: function getRootToken() {
	      return this.rootToken;
	    }
	  }, {
	    key: 'getParentToken',
	    value: function getParentToken() {
	      return this.parentToken;
	    }
	  }, {
	    key: 'getToken',
	    value: function getToken() {
	      return this.token;
	    }
	  }], [{
	    key: 'isNumber',
	    value: function isNumber(n) {
	      return !isNaN(parseFloat(n)) && isFinite(n);
	    }
	  }]);
	
	  return StackFrame;
	}();
	
	module.exports = StackFrame;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=filofax.js.map
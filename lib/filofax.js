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

	/* WEBPACK VAR INJECTION */(function(module) {var StackFrame = __webpack_require__(2);
	
	module.export = { StackFrame: StackFrame };
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


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
	      if (obj.rootToken) {
	        this.rootToken = obj.rootToken;
	      } else {
	        this.setRootToken();
	      }
	      this.setToken();
	    }
	  }
	
	  _createClass(StackFrame, [{
	    key: 'toString',
	    value: function toString() {
	      var functionName = this.getFunctionName() || '{anonymous}';
	      var args = this.getArgs().join(',');
	      var fileName = this.getFileName();
	      var lineNumber = this.getLineNumber();
	      var columnNumber = this.getColumnNumber();
	      var rootToken = this.getRootToken();
	      var token = this.getToken();
	
	      return functionName + '(' + args + ')@' + fileName + ':' + lineNumber + ':' + columnNumber + '@' + rootToken + '-' + token;
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
	    key: 'setRootToken',
	    value: function setRootToken() {
	      var functionName = this.getFunctionName();
	      var date = Date.parse(new Date());
	      this.rootToken = functionName + ':' + date;
	    }
	  }, {
	    key: 'getRootToken',
	    value: function getRootToken() {
	      return this.rootToken;
	    }
	  }, {
	    key: 'getToken',
	    value: function getToken() {
	      return this.token;
	    }
	  }, {
	    key: 'setToken',
	    value: function setToken() {
	      var rootToken = this.getRootToken();
	      var functionName = this.getFunctionName();
	      var date = Date.parse(new Date());
	      this.token = rootToken + ':' + functionName + ':' + date;
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
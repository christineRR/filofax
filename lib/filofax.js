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

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var StackFrame = __webpack_require__(2);
	
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

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StackFrame = function () {
	  function StackFrame() {
	    _classCallCheck(this, StackFrame);
	
	    // get from arguments.callee
	    this.functionName = 'funName';
	    this.args = ['args'];
	    this.fileName = 'http://localhost:3000/file.min.js';
	    this.lineNumber = 1;
	    this.columnNumber = 324;
	    this.source = 'ORIGINAL_STACK_LINE';
	    this.token = 'root-parent-child-random-date';
	  }
	
	  _createClass(StackFrame, [{
	    key: 'toString',
	    value: function toString() {
	      return 'funName(args)@http://localhost:3000/file.js:325:20@token123';
	    }
	  }, {
	    key: 'getFunctionName',
	    value: function getFunctionName() {}
	  }, {
	    key: 'getFileName',
	    value: function getFileName() {}
	  }, {
	    key: 'getLineNumber',
	    value: function getLineNumber() {}
	  }, {
	    key: 'getColumnNumber',
	    value: function getColumnNumber() {}
	  }, {
	    key: 'isToplevel',
	    value: function isToplevel() {}
	  }, {
	    key: 'isConstructor',
	    value: function isConstructor() {}
	  }, {
	    key: 'getSource',
	    value: function getSource() {}
	  }, {
	    key: 'getToken',
	    value: function getToken() {}
	  }]);
	
	  return StackFrame;
	}();
	
	module.exports = StackFrame;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=filofax.js.map
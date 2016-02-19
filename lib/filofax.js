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
	var CycleList = __webpack_require__(13);
	
	var Filofax = function () {
	  function Filofax(opts) {
	    _classCallCheck(this, Filofax);
	
	    // 单例 singleton
	    if (arguments.callee.singletonInstance) {
	      return arguments.callee.singletonInstance;
	    }
	    arguments.callee.singletonInstance = this;
	
	    opts = opts || {};
	
	    // 时间生命周期 1 分钟
	    this.lifetime = opts.lifetime ? opts.lifetime : 1 * 60 * 1000;
	
	    // 单个时间滑窗 10s
	    this.shottime = opts.shottime ? opts.shottime : 10 * 1000;
	
	    // 滑窗个数
	    this.maxSize = this.lifetime / this.shottime;
	
	    this.stack = new CycleList({
	      size: this.maxSize,
	      shottime: this.shottime
	    });
	
	    this.quene = [];
	    // 队列最大为 10
	    this.queneMax = opts.queneMax ? opts.queneMax : 10;
	    this.startime = performance.now();
	  }
	
	  _createClass(Filofax, [{
	    key: 'rootShot',
	    value: function rootShot(opts) {
	      var opts = opts || {};
	      // add root type
	      opts.type = 'root';
	      opts.index = 2;
	      return this.shot(opts);
	    }
	  }, {
	    key: 'shot',
	    value: function shot(opts) {
	      if (this.stack.isNext()) {
	        this.stack.move();
	      }
	
	      if (opts instanceof Error) {
	        var frame = StackTrace.parse(opts);
	      } else {
	        var frame = StackTrace.get(opts);
	      }
	      this.stack.push(frame);
	      return frame;
	    }
	  }, {
	    key: 'dump',
	    value: function dump(err) {
	      console.log('dump trigger with err:', err);
	      if (!err) {
	        return;
	      }
	
	      var sf = this.shot(err);
	      var index = this.stack.find(sf);
	      this.quene.push(index);
	      console.log('dump quene length is:', this.quene.length, this.quene);
	
	      // trigger upload
	      var sub = performance.now() - this.startime;
	      // 超过最长时间触发
	      var overMaxTime = sub >= this.lifetime;
	      // 超过最长长度
	      var isMaxLength = this.quene.length === this.queneMax;
	      if (isMaxLength || overMaxTime) {
	        this.upload();
	      }
	      console.log(this.stack.data);
	    }
	  }, {
	    key: 'upload',
	    value: function upload() {
	      var str = [];
	      this.quene.forEach(function (errorStack) {
	        str.push('**********************\n');
	        errorStack.forEach(function (sf) {
	          str.push(sf.toString());
	          str.push('\n');
	        });
	        str.push('**********************\n');
	      });
	      console.log(str.join(''));
	      // empty quene
	      this.quene = [];
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
	 * 3. async hook
	 */
	
	// require async hook
	__webpack_require__(2);
	Error.stackTraceLimit = Infinity;
	
	var StackFrame = __webpack_require__(12);
	var Last = __webpack_require__(11);
	
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
	    value: function get(opts) {
	
	      var opts = opts || {};
	      var err = new Error();
	      Error.captureStackTrace(err, arguments.callee);
	
	      // trigger Error.prepareStackTrace
	      var stack = err.callSite.mutated;
	      console.log('get stack length with:', stack.length);
	
	      // 异步会挂载 err.lastStackFrame 属性，其他情况为同步获取
	      lastStackFrame = err.lastStackFrame ? err.lastStackFrame : Last.stackframe;
	      // console.log('get lastStackFrame:', lastStackFrame);
	
	      // 测试 get 函数时，需要设定 index
	      var index = typeof opts.index === 'number' ? opts.index : 1;
	      var firstCaller = stack[index];
	      var functionName = firstCaller.getFunctionName();
	      var typeName = firstCaller.getTypeName();
	
	      if (opts.type === 'root') {
	        var rootToken = StackTrace.makeToken(typeName + ':' + functionName);
	        var parentToken = null;
	        var token = rootToken;
	      } else {
	        var rootToken = lastStackFrame.rootToken;
	        var parentToken = lastStackFrame.token;
	        var token = StackTrace.makeToken(typeName + ':' + functionName);
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
	
	      // set lastStackFrame
	      Last.stackframe = sf;
	      // console.log(sf.toString());
	      return sf;
	    }
	  }, {
	    key: 'parse',
	    value: function parse(err) {
	      var V8_STACK_REGEXP = /at (?:(.+)\s+\()?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/;
	      var TYPE_FUNCTION_REGEXP = /([^\.]+)(?:\.(.+))?/;
	      var errStack = err.stack.split('\n');
	
	      var errInfo = errStack[0];
	      var firstCaller = errStack[1];
	
	      var match = firstCaller.match(V8_STACK_REGEXP);
	
	      if (match) {
	        if (match[1]) {
	          var typeMatch = match[1].match(TYPE_FUNCTION_REGEXP);
	          var typeName = typeMatch[1];
	          var functionName = typeMatch[2];
	        }
	
	        var fileName = match[2];
	        var lineNumber = Number(match[3]);
	        var columnNumber = Number(match[4]);
	      }
	
	      var typeName = typeName ? typeName : '';
	      var functionName = functionName ? functionName : '';
	      var fileName = fileName ? fileName : '';
	      var lineNumber = lineNumber ? lineNumber : 0;
	      var columnNumber = columnNumber ? columnNumber : 0;
	
	      var lastStackFrame = err.lastStackFrame ? err.lastStackFrame : Last.stackframe;
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
	        token: StackTrace.makeToken(typeName + ':' + functionName)
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
/***/ function(module, exports, __webpack_require__) {

	var chain = __webpack_require__(3);
	var asyncHook = __webpack_require__(7);
	var Last = __webpack_require__(11);
	
	var callSitesForPreviuseTicks = null;
	var lastStackFrame = null;
	var stacks = new Map();
	var lastMap = new Map();
	
	asyncHook.addHooks({
	  init: asyncInit,
	  pre: asyncBefore,
	  post: asyncAfter,
	  destroy: asyncDestroy
	});
	
	asyncHook.enable();
	
	chain.extend.attach(function (error, frames) {
	  // asyncBefore has get lastStackFrame value
	  if (lastStackFrame) {
	    error.lastStackFrame = lastStackFrame;
	  }
	  // asyncBefore has get callSitesForPreviuseTicks value
	  frames.push.apply(frames, callSitesForPreviuseTicks);
	  return frames;
	});
	
	function getCallSites(skip) {
	  var limit = Error.stackTraceLimit;
	
	  Error.stackTraceLimit = limit + skip;
	  var stack = chain.callSite({
	    extend: false,
	    filter: true,
	    slice: skip
	  });
	  Error.stackTraceLimit = limit;
	
	  return stack;
	}
	
	function asyncInit(uid, handle, parentUid) {
	  console.log('async init', uid);
	  var trace = getCallSites(2);
	
	  // Add all the callSites from previuse ticks
	  trace.push.apply(trace, parentUid === null ? callSitesForPreviuseTicks : stacks.get(parentUid));
	
	  // Cut the trace so it don't contain callSites there won't be shown anyway
	  // because of Error.stackTraceLimit
	  trace.splice(Error.stackTraceLimit);
	
	  // `trace` now contains callSites from this ticks and all the ticks leading
	  // up to this event in time
	  stacks.set(uid, trace);
	  lastMap.set(uid, Last.stackframe);
	}
	
	function asyncBefore(uid) {
	  // restore previuseTicks for this specific async action, thereby allowing it
	  // to become a part of a error `stack` string
	  callSitesForPreviuseTicks = stacks.get(uid);
	  lastStackFrame = lastMap.get(uid);
	}
	
	function asyncAfter(uid) {
	  // clear `callSitesForPreviuseTicks`. In some cases the such as Promises the
	  // handle context is lost. So to prevent callSites leaking into the wrong
	  // stack trace, clear `callSitesForPreviuseTicks` here.
	  callSitesForPreviuseTicks = null;
	  lastStackFrame = null;
	}
	
	function asyncDestroy(uid) {
	  stacks.delete(uid);
	  lastMap.delete(uid);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// If a another copy (same version or not) of stack-chain exists it will result
	// in wrong stack traces (most likely dublicate callSites).
	if (global._stackChain) {
	  // In case the version match, we can simply return the first initialized copy
	  if (global._stackChain.version === __webpack_require__(4).version) {
	    module.exports = global._stackChain;
	  }
	  // The version don't match, this is really bad. Lets just throw
	  else {
	    throw new Error('Conflicting version of stack-chain found');
	  }
	}
	// Yay, no other stack-chain copy exists, yet :/
	else {
	  module.exports = global._stackChain = __webpack_require__(5);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"name": "stack-chain",
		"description": "API for combining call site modifiers",
		"version": "1.3.6",
		"author": {
			"name": "Andreas Madsen",
			"email": "amwebdk@gmail.com"
		},
		"scripts": {
			"test": "tap ./test/simple"
		},
		"repository": {
			"type": "git",
			"url": "git://github.com/AndreasMadsen/stack-chain.git"
		},
		"keywords": [
			"stack",
			"chain",
			"trace",
			"call site",
			"concat",
			"format"
		],
		"devDependencies": {
			"tap": "2.x.x",
			"uglify-js": "2.5.x"
		},
		"license": "MIT",
		"gitHead": "9dcfd1399b0ab3f88db7a19db6f5af3c9340e341",
		"bugs": {
			"url": "https://github.com/AndreasMadsen/stack-chain/issues"
		},
		"homepage": "https://github.com/AndreasMadsen/stack-chain#readme",
		"_id": "stack-chain@1.3.6",
		"_shasum": "0e341f31ad0a7f9a4ea35b94cab46898bd5a6a9f",
		"_from": "stack-chain@*",
		"_npmVersion": "3.3.12",
		"_nodeVersion": "5.5.0",
		"_npmUser": {
			"name": "andreasmadsen",
			"email": "amwebdk@gmail.com"
		},
		"maintainers": [
			{
				"name": "andreasmadsen",
				"email": "amwebdk@gmail.com"
			}
		],
		"dist": {
			"shasum": "0e341f31ad0a7f9a4ea35b94cab46898bd5a6a9f",
			"size": 8622,
			"noattachment": false,
			"key": "stack-chain/-/stack-chain-1.3.6.tgz",
			"tarball": "http://registry.npm.alibaba-inc.com/stack-chain/download/stack-chain-1.3.6.tgz"
		},
		"_npmOperationalInternal": {
			"host": "packages-6-west.internal.npmjs.com",
			"tmp": "tmp/stack-chain-1.3.6.tgz_1455112191667_0.03577118902467191"
		},
		"directories": {},
		"publish_time": 1455112194774,
		"_cnpm_publish_time": 1455112194774,
		"_resolved": "http://registry.npm.alibaba-inc.com/stack-chain/download/stack-chain-1.3.6.tgz",
		"readme": "ERROR: No README data found!"
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	// use a already existing formater or fallback to the default v8 formater
	var defaultFormater = __webpack_require__(6);
	
	// public define API
	function stackChain() {
	  this.extend = new TraceModifier();
	  this.filter = new TraceModifier();
	  this.format = new StackFormater();
	  this.version = __webpack_require__(4).version;
	}
	
	
	var SHORTCIRCUIT_CALLSITE = false;
	stackChain.prototype.callSite = function collectCallSites(options) {
	  if (!options) options = {};
	
	  // Get CallSites
	  SHORTCIRCUIT_CALLSITE = true;
	  var obj = {};
	  Error.captureStackTrace(obj, collectCallSites);
	  var callSites = obj.stack;
	  SHORTCIRCUIT_CALLSITE = false;
	
	  // Slice
	  callSites = callSites.slice(options.slice || 0);
	
	  // Modify CallSites
	  if (options.extend) callSites = this.extend._modify(obj, callSites);
	  if (options.filter) callSites = this.filter._modify(obj, callSites);
	
	  // Done
	  return callSites;
	};
	
	var chain = new stackChain();
	
	function TraceModifier() {
	  this._modifiers = [];
	}
	
	TraceModifier.prototype._modify = function (error, frames) {
	  for (var i = 0, l = this._modifiers.length; i < l; i++) {
	    frames = this._modifiers[i](error, frames);
	  }
	
	  return frames;
	};
	
	TraceModifier.prototype.attach = function (modifier) {
	  this._modifiers.push(modifier);
	};
	
	TraceModifier.prototype.deattach = function (modifier) {
	  var index = this._modifiers.indexOf(modifier);
	
	  if (index === -1) return false;
	
	  this._modifiers.splice(index, 1);
	  return true;
	};
	
	function StackFormater() {
	  this._formater = defaultFormater;
	  this._previous = undefined;
	}
	
	StackFormater.prototype.replace = function (formater) {
	  if (formater) {
	    this._formater = formater;
	  } else {
	    this.restore();
	  }
	};
	
	StackFormater.prototype.restore  = function () {
	  this._formater = defaultFormater;
	  this._previous = undefined;
	};
	
	StackFormater.prototype._backup = function () {
	  this._previous = this._formater;
	};
	
	StackFormater.prototype._roolback = function () {
	  if (this._previous === defaultFormater) {
	    this.replace(undefined);
	  } else {
	    this.replace(this._previous);
	  }
	
	  this._previous = undefined;
	};
	
	
	//
	// Set Error.prepareStackTrace thus allowing stack-chain
	// to take control of the Error().stack formating.
	//
	
	// If there already is a custom stack formater, then set
	// that as the stack-chain formater.
	if (Error.prepareStackTrace) {
	    chain.format.replace(Error.prepareStackTrace);
	}
	
	var SHORTCIRCUIT_FORMATER = false;
	function prepareStackTrace(error, originalFrames) {
	  if (SHORTCIRCUIT_CALLSITE) return originalFrames;
	  if (SHORTCIRCUIT_FORMATER) return defaultFormater(error, originalFrames);
	
	  // Make a loss copy of originalFrames
	  var frames = originalFrames.concat();
	
	  // extend frames
	  frames = chain.extend._modify(error, frames);
	
	  // filter frames
	  frames = chain.filter._modify(error, frames);
	
	  // reduce frames to match Error.stackTraceLimit
	  frames = frames.slice(0, Error.stackTraceLimit);
	
	  // Set the callSite property
	  // But only if it hasn't been explicitly set, otherwise
	  // error.stack would have unintended side effects. Check also for
	  // non-extensible/sealed objects, such as those from Google's Closure Library
	  if (Object.isExtensible(error) &&
	      (Object.getOwnPropertyDescriptor(error, "callSite") === undefined)) {
	    error.callSite = {
	      original: originalFrames,
	      mutated: frames
	    };
	  }
	
	  // format frames
	  SHORTCIRCUIT_FORMATER = true;
	  var format = chain.format._formater(error, frames);
	  SHORTCIRCUIT_FORMATER = false;
	
	  return format;
	}
	
	// Replace the v8 stack trace creator
	Object.defineProperty(Error, 'prepareStackTrace', {
	  'get': function () {
	    return prepareStackTrace;
	  },
	
	  'set': function (formater) {
	    // If formater is prepareStackTrace it means that someone ran
	    // var old = Error.prepareStackTrace;
	    // Error.prepareStackTrace = custom
	    // new Error().stack
	    // Error.prepareStackTrace = old;
	    // The effect of this, should be that the old behaviour is restored.
	    if (formater === prepareStackTrace) {
	      chain.format._roolback();
	    }
	    // Error.prepareStackTrace was set, this means that someone is
	    // trying to take control of the Error().stack format. Make
	    // them belive they succeeded by setting them up as the stack-chain
	    // formater.
	    else {
	      chain.format._backup();
	      chain.format.replace(formater);
	    }
	  }
	});
	
	//
	// Manage call site storeage
	//
	function callSiteGetter() {
	  // calculate call site object
	  this.stack;
	
	  // return call site object
	  return this.callSite;
	}
	
	Object.defineProperty(Error.prototype, 'callSite', {
	  'get': callSiteGetter,
	
	  'set': function (frames) {
	    // In case callSite was set before [[getter]], just set
	    // the value
	    Object.defineProperty(this, 'callSite', {
	        value: frames,
	        writable: true,
	        configurable: true
	    });
	  },
	
	  configurable: true
	});
	
	module.exports = chain;


/***/ },
/* 6 */
/***/ function(module, exports) {

	// Copyright 2012 the V8 project authors. All rights reserved.
	// Redistribution and use in source and binary forms, with or without
	// modification, are permitted provided that the following conditions are
	// met:
	//
	//     * Redistributions of source code must retain the above copyright
	//       notice, this list of conditions and the following disclaimer.
	//     * Redistributions in binary form must reproduce the above
	//       copyright notice, this list of conditions and the following
	//       disclaimer in the documentation and/or other materials provided
	//       with the distribution.
	//     * Neither the name of Google Inc. nor the names of its
	//       contributors may be used to endorse or promote products derived
	//       from this software without specific prior written permission.
	//
	// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	
	module.exports = function FormatStackTrace(error, frames) {
	  var lines = [];
	  lines.push(error.toString());
	  for (var i = 0; i < frames.length; i++) {
	    var frame = frames[i];
	    var line;
	    try {
	      line = frame.toString();
	    } catch (e) {
	      try {
	        line = "<error: " + e + ">";
	      } catch (ee) {
	        // Any code that reaches this point is seriously nasty!
	        line = "<error>";
	      }
	    }
	    lines.push("    at " + line);
	  }
	  return lines.join("\n");
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {const AsyncHook = __webpack_require__(8);
	
	// If a another copy (same version or not) of stack-chain exists it will result
	// in wrong stack traces (most likely dublicate callSites).
	if (global._asyncHook) {
	  // In case the version match, we can simply return the first initialized copy
	  if (global._asyncHook.version === __webpack_require__(10).version) {
	    module.exports = global._asyncHook;
	  }
	  // The version don't match, this is really bad. Lets just throw
	  else {
	    throw new Error('Conflicting version of async-hook found');
	  }
	} else {
	  module.exports = global._asyncHook = new AsyncHook();
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const patchs = {
	  'timers': __webpack_require__(9)
	};
	
	const uidSymbol = Symbol('async-hook-uid');
	
	function State() {
	  this.enabled = false;
	  this.counter = 0;
	}
	
	function Hooks() {
	  const initFns = this.initFns = [];
	  const preFns = this.preFns = [];
	  const postFns = this.postFns = [];
	  const destroyFns = this.destroyFns = [];
	
	  this.init = function (uid, parent) {
	    this[uidSymbol] = uid;
	
	    // send the parent uid, not the parent handle. The user map the handle
	    // objects appropiatly if needed.
	    if (parent !== null) parent = parent[uidSymbol];
	
	    // call hooks
	    for (const hook of initFns) {
	      hook(uid, this, parent);
	    }
	  };
	
	  this.pre = function () {
	    const uid = this[uidSymbol];
	    // call hooks
	    for (const hook of preFns) {
	      hook(uid, this);
	    }
	  };
	
	  this.post = function () {
	    const uid = this[uidSymbol];
	    // call hooks
	    for (const hook of postFns) {
	      hook(uid, this);
	    }
	  };
	
	  this.destroy = function (uid) {
	    // call hooks
	    for (const hook of destroyFns) {
	      hook(uid);
	    }
	  };
	}
	
	Hooks.prototype.add = function (hooks) {
	  if (hooks.init) this.initFns.push(hooks.init);
	  if (hooks.pre) this.preFns.push(hooks.pre);
	  if (hooks.post) this.postFns.push(hooks.post);
	  if (hooks.destroy) this.destroyFns.push(hooks.destroy);
	};
	
	function removeElement(array, item) {
	  const index = array.indexOf(item);
	  if (index === -1) return;
	  array.splice(index, 1);
	}
	
	Hooks.prototype.remove = function (hooks) {
	  if (hooks.init) removeElement(this.initFns, hooks.init);
	  if (hooks.pre) removeElement(this.preFns, hooks.pre);
	  if (hooks.post) removeElement(this.postFns, hooks.post);
	  if (hooks.destroy) removeElement(this.destroyFns, hooks.destroy);
	};
	
	function AsyncHook() {
	  this._state = new State();
	  this._hooks = new Hooks();
	
	  // expose version for conflict detection
	  this.version = __webpack_require__(10).version;
	
	  // apply patches
	  for (const key of Object.keys(patchs)) {
	    patchs[key].call(this);
	  }
	}
	module.exports = AsyncHook;
	
	AsyncHook.prototype.addHooks = function (hooks) {
	  this._hooks.add(hooks);
	};
	
	AsyncHook.prototype.removeHooks = function (hooks) {
	  this._hooks.remove(hooks);
	};
	
	AsyncHook.prototype.enable = function () {
	  this._state.enabled = true;
	};
	
	AsyncHook.prototype.disable = function () {
	  this._state.enabled = false;
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	const timers = window;
	
	function TimeoutWrap() {}
	function IntervalWrap() {}
	
	const timeoutMap = new Map();
	const intervalMap = new Map();
	
	module.exports = function patch() {
	  patchTimer(this._hooks, this._state, 'setTimeout', 'clearTimeout', TimeoutWrap, timeoutMap, true);
	  patchTimer(this._hooks, this._state, 'setInterval', 'clearInterval', IntervalWrap, intervalMap, false);
	
	  // global.setTimeout = timers.setTimeout;
	  // global.setInterval = timers.setInterval;
	
	  // global.clearTimeout = timers.clearTimeout;
	  // global.clearInterval = timers.clearInterval;
	};
	
	function patchTimer(hooks, state, setFn, clearFn, Handle, timerMap, singleCall) {
	  const oldSetFn = timers[setFn];
	  const oldClearFn = timers[clearFn];
	
	  // overwrite set[Timeout]
	  timers[setFn] = function () {
	    if (!state.enabled) return oldSetFn.apply(timers, arguments);
	
	    const args = Array.from(arguments);
	    const callback = args[0];
	
	    const handle = new Handle();
	    const uid = --state.counter;
	    let timerId;
	
	    // call the init hook
	    hooks.init.call(handle, uid, null);
	
	    // overwrite callback
	    args[0] = function () {
	      // call the pre hook
	      hooks.pre.call(handle);
	
	      callback.apply(this, arguments);
	
	      // call the post hook
	      hooks.post.call(handle);
	
	      // call thie destroy hook if the callback will only be called once
	      if (singleCall) {
	        timerMap.delete(timerId);
	        hooks.destroy.call(null, uid);
	      }
	    };
	
	    timerId = oldSetFn.apply(timers, args);
	    // Bind the timerId and uid for later use, in case the clear* function is
	    // called.
	    timerMap.set(timerId, uid);
	
	    return timerId;
	  };
	
	  // overwrite clear[Timeout]
	  timers[clearFn] = function (timerId) {
	    // clear should call the destroy hook. Note if timerId doesn't exists
	    // it is because asyncWrap wasn't enabled at the time.
	    if (timerMap.has(timerId)) {
	      const uid = timerMap.get(timerId);
	      timerMap.delete(timerId);
	      hooks.destroy.call(null, uid);
	    }
	
	    oldClearFn.apply(timers, arguments);
	  };
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = {
		"name": "async-hook-browser",
		"description": "Inspect the context of async for browser",
		"version": "0.0.5",
		"author": {
			"name": "liuxin.rkl@alibaba-inc.com"
		},
		"scripts": {
			"test": "mocha -R TAP --require ./test/env.js ./test"
		},
		"repository": {
			"type": "git",
			"url": "git+ssh://git@github.com/christineRR/async-hook.git"
		},
		"keywords": [
			"async",
			"async hooks",
			"inspect",
			"async wrap",
			"browser"
		],
		"license": "MIT",
		"devDependencies": {
			"mocha": "*",
			"chai": "*",
			"jsdom": "*",
			"async": "1.5.x",
			"cli-color": "1.1.x"
		},
		"engines": {
			"node": "^4.2.5 || ^5.3"
		},
		"gitHead": "5cd877c0203e796dd63096059efc23c1b17e9d64",
		"bugs": {
			"url": "https://github.com/christineRR/async-hook/issues"
		},
		"homepage": "https://github.com/christineRR/async-hook#readme",
		"_id": "async-hook-browser@0.0.5",
		"_shasum": "6c4f04efe48a960166025b4f06965f4d668f3119",
		"_from": "async-hook-browser@*",
		"_npmVersion": "2.14.12",
		"_nodeVersion": "4.2.5",
		"_npmUser": {
			"name": "christinerr",
			"email": "rongkunli1215@gmail.com"
		},
		"dist": {
			"shasum": "6c4f04efe48a960166025b4f06965f4d668f3119",
			"size": 4576,
			"noattachment": false,
			"key": "async-hook-browser/-/async-hook-browser-0.0.5.tgz",
			"tarball": "http://registry.npm.alibaba-inc.com/async-hook-browser/download/async-hook-browser-0.0.5.tgz"
		},
		"maintainers": [
			{
				"name": "christinerr",
				"email": "rongkunli1215@gmail.com"
			}
		],
		"_npmOperationalInternal": {
			"host": "packages-5-east.internal.npmjs.com",
			"tmp": "tmp/async-hook-browser-0.0.5.tgz_1455591735213_0.835812630597502"
		},
		"directories": {},
		"publish_time": 1455591737345,
		"_cnpm_publish_time": 1455591737345,
		"_resolved": "http://registry.npm.alibaba-inc.com/async-hook-browser/download/async-hook-browser-0.0.5.tgz"
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * 全局变量 保存上次调用的 stackframe 对象
	 * @type {Object}
	 */
	module.exports = {
	  stackframe: null
	};

/***/ },
/* 12 */
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

/***/ },
/* 13 */
/***/ function(module, exports) {

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * 类循环数据
	 */
	
	var CycleList = function () {
	  function CycleList(opts) {
	    _classCallCheck(this, CycleList);
	
	    var opts = opts || {};
	    // 数组大小
	    this.size = opts.size ? opts.size : 6;
	    // 单个时间滑窗 10s
	    this.shottime = opts.shottime ? opts.shottime : 10 * 1000;
	
	    // 当前游标
	    this.cursor = 0;
	    this.starttime = performance.now();
	    this.nextCursorTime = this.starttime + this.shottime;
	
	    // 数据
	    this.data = [];
	    // 初始化数据数组
	    for (var i = 0, len = this.size - 1; i <= len; i++) {
	      // 单个时间滑窗对象
	      this.data[i] = {};
	    }
	  }
	
	  // now greater than the next cursor time
	
	
	  _createClass(CycleList, [{
	    key: 'isNext',
	    value: function isNext() {
	      return performance.now() > this.nextCursorTime;
	    }
	
	    // cursor index ++ && the next cursor time update
	
	  }, {
	    key: 'move',
	    value: function move() {
	      var max = this.data.length - 1;
	      if (this.cursor < max) {
	        this.cursor++;
	      } else if (this.cursor = max) {
	        this.cursor = 0;
	      }
	      this.nextCursorTime = performance.now() + this.shottime;
	      console.log('[CycleList move]:', this.cursor, this.nextCursorTime);
	      this.clean();
	    }
	
	    // push stack frame to data
	
	  }, {
	    key: 'push',
	    value: function push(frame) {
	      console.log('[CycleList push]:', this.cursor);
	      var trace = this.data[this.cursor];
	      var rootToken = frame.rootToken;
	
	      var keys = Object.keys(trace);
	      if (keys.indexOf(rootToken) === -1) {
	        trace[rootToken] = [];
	      }
	      // trace[rootToken].push(frame.toString());
	      trace[rootToken].push(frame);
	    }
	
	    // clean current data after move cursor
	
	  }, {
	    key: 'clean',
	    value: function clean() {
	      console.log('[CycleList clean:]', this.cursor);
	      this.data[this.cursor] = {};
	    }
	  }, {
	    key: 'find',
	    value: function find(sf) {
	      var indexArr = [sf];
	      var obj = {};
	      this.data.forEach(function (bucket, index) {
	        for (var key in bucket) {
	          if (sf.rootToken === key) {
	            obj[index] = bucket[key];
	          }
	        }
	      });
	
	      this.findParent(obj, indexArr, sf);
	      return indexArr;
	    }
	  }, {
	    key: 'findParent',
	    value: function findParent(obj, indexArr, sf) {
	      // when parentToken is null, sf is root
	      if (!sf.parentToken) {
	        return;
	      }
	      var current = sf;
	      for (var bid in obj) {
	        obj[bid].forEach(function (item, index) {
	          if (sf.parentToken === item.token) {
	            indexArr.push(item);
	            current = item;
	            return;
	          }
	        });
	      }
	      this.findParent(obj, indexArr, current);
	    }
	  }]);
	
	  return CycleList;
	}();
	
	module.exports = CycleList;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=filofax.js.map
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Filofax = __webpack_require__(2);
	var trace = new Filofax();
	
	var A = function () {
	  function A(name) {
	    _classCallCheck(this, A);
	
	    trace.shot();
	    this.name = name;
	    console.log(this.name + ' love apple!');
	  }
	
	  _createClass(A, [{
	    key: 'eat',
	    value: function eat(type) {
	      setTimeout(function () {
	        trace.shot();
	        console.log('-------start eating apple-----------');
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = type[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var item = _step.value;
	
	            console.log(this.name + ' eat ' + item + ' apple!');
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	
	        console.log('-------end eating apple-------------');
	      }, 30);
	    }
	  }]);
	
	  return A;
	}();
	
	var B = function () {
	  function B(name) {
	    _classCallCheck(this, B);
	
	    trace.shot();
	    this.name = name;
	    console.log(this.name + ' love pear!');
	  }
	
	  _createClass(B, [{
	    key: 'eat',
	    value: function eat(type) {
	      trace.shot();
	      console.log('-------start eating pear------------');
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = type[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var item = _step2.value;
	
	          console.log(this.name + ' eat ' + item + ' pear!');
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	
	      console.log('-------end eating pear--------------');
	    }
	  }]);
	
	  return B;
	}();
	
	var C = function () {
	  function C() {
	    _classCallCheck(this, C);
	
	    this.children = [{
	      name: 'Rose',
	      love: 'apple',
	      type: ['red', 'green', 'yellow']
	    }, {
	      name: 'Tom',
	      love: 'pear',
	      type: ['China', 'Japan']
	    }, {
	      name: 'Jack',
	      love: 'apple',
	      type: ['small', 'big']
	    }];
	    this.fruits = [];
	  }
	
	  _createClass(C, [{
	    key: 'share',
	    value: function share() {
	      trace.shot({ type: 'root' });
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;
	
	      try {
	        for (var _iterator3 = this.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var item = _step3.value;
	
	          switch (item.love) {
	            case 'apple':
	              var fruit = new A(item.name);
	              break;
	            case 'pear':
	              var fruit = new B(item.name);
	              break;
	            default:
	              break;
	          }
	          if (fruit) {
	            this.fruits.push(fruit);
	          }
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'eat',
	    value: function eat() {
	      trace.shot({ type: 'root' });
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;
	
	      try {
	        for (var _iterator4 = this.fruits[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var fruit = _step4.value;
	
	          var name = fruit.name;
	          var _iteratorNormalCompletion5 = true;
	          var _didIteratorError5 = false;
	          var _iteratorError5 = undefined;
	
	          try {
	            for (var _iterator5 = this.children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	              var item = _step5.value;
	
	              if (item.name === name) {
	                fruit.eat(item.type);
	                continue;
	              }
	            }
	          } catch (err) {
	            _didIteratorError5 = true;
	            _iteratorError5 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                _iterator5.return();
	              }
	            } finally {
	              if (_didIteratorError5) {
	                throw _iteratorError5;
	              }
	            }
	          }
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'fake',
	    value: function fake() {
	      trace.shot({ type: 'root' });
	      throw new Error('school fake error');
	    }
	  }]);
	
	  return C;
	}();
	
	window.onerror = function (msg, url, line, column, err) {
	  trace.shot(err);
	  trace.dump();
	};
	
	var school = new C();
	school.share();
	school.eat();
	// trigger error
	school.fake();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StackTrace = __webpack_require__(3);
	
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
	  }, {
	    key: 'upload',
	    value: function upload() {}
	  }]);
	
	  return Filofax;
	}();
	
	module.exports = Filofax;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * 1. format function callsite to StackFrame Object
	 * 2. format Error Object to StackFrame Object
	 */
	
	// hook async
	__webpack_require__(4);
	Error.stackTraceLimit = Infinity;
	var StackFrame = __webpack_require__(9);
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
	    value: function get(opts) {
	      var err = new Error();
	      Error.captureStackTrace(err, arguments.callee);
	      var stack = err.callSite.mutated;
	      console.log(stack);
	
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = stack[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var item = _step.value;
	
	          console.log(item.getTypeName(), item.getFunctionName(), item.getLineNumber());
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	
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
	      console.log(sf.toString());
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
	
	      console.log(sf.toString());
	      return sf;
	    }
	  }]);
	
	  return StackTrace;
	}();
	
	module.exports = StackTrace;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var chain = __webpack_require__(5);
	var AsyncHook = __webpack_require__(7);
	var asyncHook = new AsyncHook();
	
	var callSitesForPreviuseTicks = null;
	var stacks = new Map();
	
	asyncHook.add({
	  init: asyncInit,
	  pre: asyncBefore,
	  post: asyncAfter,
	  destroy: asyncDestroy
	});
	
	asyncHook.enable();
	
	chain.extend.attach(function (error, frames) {
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
	  var trace = getCallSites(2);
	
	  // Add all the callSites from previuse ticks
	  trace.push.apply(trace, parentUid === null ? callSitesForPreviuseTicks : stacks.get(parentUid));
	
	  // Cut the trace so it don't contain callSites there won't be shown anyway
	  // because of Error.stackTraceLimit
	  trace.splice(Error.stackTraceLimit);
	
	  // `trace` now contains callSites from this ticks and all the ticks leading
	  // up to this event in time
	  stacks.set(uid, trace);
	}
	
	function asyncBefore(uid) {
	  // restore previuseTicks for this specific async action, thereby allowing it
	  // to become a part of a error `stack` string
	  callSitesForPreviuseTicks = stacks.get(uid);
	  console.log(callSitesForPreviuseTicks);
	}
	
	function asyncAfter(uid) {
	  // clear `callSitesForPreviuseTicks`. In some cases the such as Promises the
	  // handle context is lost. So to prevent callSites leaking into the wrong
	  // stack trace, clear `callSitesForPreviuseTicks` here.
	  callSitesForPreviuseTicks = null;
	}
	
	function asyncDestroy(uid) {
	  stacks.delete(uid);
	}

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
	}
	
	var SHORTCUT_CALLSITE = false;
	stackChain.prototype.callSite = function collectCallSites(options) {
	  if (!options) options = {};
	
	  // Get CallSites
	  SHORTCUT_CALLSITE = true;
	  var obj = {};
	  Error.captureStackTrace(obj, collectCallSites);
	  var callSites = obj.stack;
	  SHORTCUT_CALLSITE = false;
	
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
	
	StackFormater.prototype.restore = function () {
	  this._formater = defaultFormater;
	};
	
	StackFormater.prototype._backup = function () {
	  if (this._formater === defaultFormater) {
	    this._previous = undefined;
	  } else {
	    this._previous = this._formater;
	  }
	};
	
	StackFormater.prototype._roolback = function () {
	  this.replace(this._previous);
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
	
	function prepareStackTrace(error, originalFrames) {
	  if (SHORTCUT_CALLSITE) return originalFrames;
	
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
	  if (Object.isExtensible(error) && Object.getOwnPropertyDescriptor(error, "callSite") === undefined) {
	    error.callSite = {
	      original: originalFrames,
	      mutated: frames
	    };
	  }
	
	  // format frames
	  return chain.format._formater(error, frames);
	}
	
	// Replace the v8 stack trace creator
	Object.defineProperty(Error, 'prepareStackTrace', {
	  'get': function get() {
	    return prepareStackTrace;
	  },
	
	  'set': function set(formater) {
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
	
	  'set': function set(frames) {
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var uidSymbol = Symbol('async-hook-uid');
	var patchs = {
	  'timers': __webpack_require__(8)
	};
	
	var AsyncHook = function () {
	  function AsyncHook() {
	    _classCallCheck(this, AsyncHook);
	
	    this.enabled = false;
	    this.counter = 0;
	
	    var initFns = this.initFns = [];
	    var preFns = this.preFns = [];
	    var postFns = this.postFns = [];
	    var destroyFns = this.destroyFns = [];
	
	    this.init = function (uid, parent) {
	      this[uidSymbol] = uid;
	      if (parent !== null) parent = parent[uidSymbol];
	      // call hooks
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = initFns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var hook = _step.value;
	
	          hook(uid, this, parent);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    };
	
	    this.pre = function () {
	      var uid = this[uidSymbol];
	      // call hooks
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = preFns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var hook = _step2.value;
	
	          hook(uid, this);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    };
	
	    this.post = function () {
	      var uid = this[uidSymbol];
	      // call hooks
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;
	
	      try {
	        for (var _iterator3 = postFns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var hook = _step3.value;
	
	          hook(uid, this);
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    };
	
	    this.destroy = function (uid) {
	      // call hooks
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;
	
	      try {
	        for (var _iterator4 = destroyFns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var hook = _step4.value;
	
	          hook(uid);
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }
	    };
	
	    var _iteratorNormalCompletion5 = true;
	    var _didIteratorError5 = false;
	    var _iteratorError5 = undefined;
	
	    try {
	      for (var _iterator5 = Object.keys(patchs)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	        var key = _step5.value;
	
	        patchs[key].call(this);
	      }
	    } catch (err) {
	      _didIteratorError5 = true;
	      _iteratorError5 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion5 && _iterator5.return) {
	          _iterator5.return();
	        }
	      } finally {
	        if (_didIteratorError5) {
	          throw _iteratorError5;
	        }
	      }
	    }
	  }
	
	  _createClass(AsyncHook, [{
	    key: 'add',
	    value: function add(hooks) {
	      if (hooks.init) this.initFns.push(hooks.init);
	      if (hooks.pre) this.preFns.push(hooks.pre);
	      if (hooks.post) this.postFns.push(hooks.post);
	      if (hooks.destroy) this.destroyFns.push(hooks.destroy);
	    }
	  }, {
	    key: 'remove',
	    value: function remove(hooks) {
	      if (hooks.init) AsyncHook.removeElement(this.initFns, hooks.init);
	      if (hooks.pre) AsyncHook.removeElement(this.preFns, hooks.pre);
	      if (hooks.post) AsyncHook.removeElement(this.postFns, hooks.post);
	      if (hooks.destroy) AsyncHook.removeElement(this.destroyFns, hooks.destroy);
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      this.enabled = true;
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      this.enabled = false;
	    }
	  }], [{
	    key: 'removeElement',
	    value: function removeElement(array, item) {
	      var index = array.indexOf(item);
	      if (index === -1) return;
	      array.splice(index, 1);
	    }
	  }]);
	
	  return AsyncHook;
	}();
	
	module.exports = AsyncHook;

/***/ },
/* 8 */
/***/ function(module, exports) {

	var timers = window;
	
	function TimeoutWrap() {}
	function IntervalWrap() {}
	
	var timeoutMap = new Map();
	var intervalMap = new Map();
	
	module.exports = function patch() {
	  patchTimer(this, this, 'setTimeout', 'clearTimeout', TimeoutWrap, timeoutMap, true);
	  patchTimer(this, this, 'setInterval', 'clearInterval', IntervalWrap, intervalMap, false);
	};
	
	function patchTimer(hooks, state, setFn, clearFn, Handle, timerMap, singleCall) {
	  var oldSetFn = timers[setFn];
	  var oldClearFn = timers[clearFn];
	
	  // overwrite set[Timeout]
	  timers[setFn] = function () {
	    if (!state.enabled) return oldSetFn.apply(timers, arguments);
	
	    var args = Array.from(arguments);
	    var callback = args[0];
	
	    var handle = new Handle();
	    var uid = --state.counter;
	    var timerId = undefined;
	
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
	      var uid = timerMap.get(timerId);
	      timerMap.delete(timerId);
	      hooks.destroy.call(null, uid);
	    }
	
	    oldClearFn.apply(timers, arguments);
	  };
	}

/***/ },
/* 9 */
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
/******/ ]);
//# sourceMappingURL=bundle.js.map
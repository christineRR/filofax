/**
 * 1. format function callsite to StackFrame Object
 * 2. format Error Object to StackFrame Object
 */

var StackFrame = require('./stackframe');
// var md5 = require('blueimp-md5');
var lastStackFrame = null;

class StackTrace {

  static makeToken(str) {
    return `${str}:${performance.now()}`;
  }
  
  static get(opts, belowFn) {
    // get stack callsite array
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
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
      var rootToken =  StackTrace.makeToken(functionName);
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
  
  static parse(err) {
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
}

module.exports = StackTrace;

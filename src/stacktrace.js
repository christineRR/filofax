/**
 * 1. format function callsite to StackFrame Object
 * 2. format Error Object to StackFrame Object
 */

// hook async
require('./async');
Error.stackTraceLimit = Infinity;
var StackFrame = require('./stackframe');
var Last = require('./last');

class StackTrace {

  static makeToken(str) {
    return `${str}:${performance.now()}`;
  }
  
  static get(opts) {
    var lastStackFrame = Last.stackframe;
    var err = new Error();
    // err.lastStackFrame = lastStackFrame;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.callSite.mutated;
    console.log(stack);

    // console.log(err.lastStackFrame)
    // 重新赋值，异步会重新覆盖err.lastStackFrame对象
    lastStackFrame = err.lastStackFrame ? err.lastStackFrame : lastStackFrame;

    // for(var item of stack) {
    //   console.log(item.getTypeName(), item.getFunctionName(), item.getLineNumber());
    // }
    var firstCaller = stack[1];
    var functionName = firstCaller.getFunctionName();
    var typeName = firstCaller.getTypeName();

    if (opts && opts.type === 'root') {
      var rootToken =  StackTrace.makeToken(`${typeName}:${functionName}`);
      var parentToken = null;
      var token = rootToken;
    } else {
      // var interval = performance.now() - lastStackFrame.time;
      // if (interval >= 50000) {
      //   // TODO: 大于 50ms 的异步、定时任务情况处理
      // } else {
      var rootToken = lastStackFrame.rootToken;
      var parentToken = lastStackFrame.token;
      var token = StackTrace.makeToken(`${typeName}:${functionName}`);
      // }
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

    Last.stackframe = sf;
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

    var lastStackFrame = Last.stackframe;
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
      token: StackTrace.makeToken(`${typeName}:${functionName}`)
    });

    console.log(sf.toString());
    return sf;
  }
}

module.exports = StackTrace;

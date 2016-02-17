/**
 * 1. format function callsite to StackFrame Object
 * 2. format Error Object to StackFrame Object
 * 3. async hook
 */

// require async hook
require('./async-hook');
Error.stackTraceLimit = Infinity;

var StackFrame = require('./stackframe');
var Last = require('./last');

class StackTrace {

  static makeToken(str) {
    return `${str}:${performance.now()}`;
  }
  
  static get(opts) {

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
      var rootToken =  StackTrace.makeToken(`${typeName}:${functionName}`);
      var parentToken = null;
      var token = rootToken;
    } else {
      var rootToken = lastStackFrame.rootToken;
      var parentToken = lastStackFrame.token;
      var token = StackTrace.makeToken(`${typeName}:${functionName}`);
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
  
  static parse(err) {
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
      token: StackTrace.makeToken(`${typeName}:${functionName}`)
    });

    // console.log(sf.toString());
    return sf;
  }
}

module.exports = StackTrace;

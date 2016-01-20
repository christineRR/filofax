/**
 * 1. format function callsite to StackFrame Object
 * 2. format Error Object to StackFrame Object
 */

var StackFrame = require('./stackframe');
var currentRootToken = '';

class StackTrace {

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

    var firstCaller = stack[0];

    if (opts && opts.type === 'root') {
      currentRootToken =  `${firstCaller.getFunctionName()}:${performance.now()}`;
      // 每隔 50ms 销毁
      setTimeout(function () {
        currentRootToken = null;
      }, 50);
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
      rootToken: currentRootToken
    });

    // hook rootToken to this;
    var that = firstCaller.getFunction();
    that.rootToken = sf.getRootToken();

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
      rootToken: currentRootToken
    });

    console.log(sf.toString());
    return sf;
  }
}

module.exports = StackTrace;

/**
 * 1. format function callsite to StackFrame Object
 * 2. format Error Object to StackFrame Object
 */

var StackFrame = require('./stackframe');

class StackTrace {

  static get(belowFn) {
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

    // get rootToken from parent callsite object
    var rootToken = null;
    for(var item of stack) {
      var instance = item.getFunction();
      if(instance && instance.rootToken) {
        rootToken = instance.rootToken;
        break;
      }
    }

    console.log('get rootToken from parent:', rootToken);

    var firstCaller = stack[0];
    var func = firstCaller.getFunction();
    var args = Array.prototype.slice.call(func.arguments, 0);
    var opt = {
      functionName: firstCaller.getFunctionName(),
      fileName: firstCaller.getFileName(),
      args: args,
      lineNumber: firstCaller.getLineNumber(),
      columnNumber: firstCaller.getColumnNumber(),
      isConstructor: firstCaller.isConstructor(),
      isToplevel: firstCaller.isToplevel(),
      rootToken: rootToken
    };

    var sf = new StackFrame(opt);

    // hook rootToken to this;
    var that = firstCaller.getFunction();
    that.rootToken = sf.getRootToken();

    console.log(sf.toString());
    return sf;
  }
  
  static parse(err) {
    // var V8_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var V8_STACK_REGEXP = /at (?:(.+)\s+\()?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/;
    var errStack = err.stack.split('\n');

    var errInfo = errStack[0];
    var firstCaller = errStack[1];

    var match = firstCaller.match(V8_STACK_REGEXP);

    if (match) {
      var functionName = match[1];
      var fileName = match[2];
      var lineNumber = parseInt(match[3], 10);
      var columnNumber = parseInt(match[4], 10);
    } else {
      var functionName = '';
      var fileName = '';
      var lineNumber = 0;
      var columnNumber = 0;
    }

    var sf = new StackFrame({
      prefix: errInfo,
      functionName: functionName,
      fileName: fileName,
      args: [],
      lineNumber: lineNumber,
      columnNumber: columnNumber,
      rootToken: ''
    });

    console.log(sf.toString());
    return sf;
  }
}

module.exports = StackTrace;

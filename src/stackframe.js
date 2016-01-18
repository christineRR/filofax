/**
 * 自定义的 stack frame 对象 
 * 类似于 V8 https://github.com/v8/v8/wiki/Stack%20Trace%20API
 */

class StackFrame {

  constructor(obj) {
    if (obj instanceof Object) {
      // string
      this.functionName = obj.functionName || '';
      this.fileName     = obj.fileName || '';
      this.source       = obj.source || '';

      // array
      this.args = obj.args || [];

      // number
      this.lineNumber   = isNumber(obj.lineNumber)|| 0;
      this.columnNumber = isNumber(obj.columnNumber) || 0;

      // boolean
      this.isConstructor = obj.isConstructor;
      this.isToplevel    = obj.isToplevel;

      // token
      this.rootToken = '';
      this.token = '';
    }
  }

  static isNumber() {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  toString() {
    var functionName = this.getFunctionName() || '{anonymous}';
    var args = (this.getArgs()).join(',');
    var fileName = this.getFileName();
    var lineNumber = this.getLineNumber();
    var columnNumber = this.getColumnNumber();
    var rootToken = this.getRootToken();
    var token = this.getToken();

    return `${functionName}(${args})@${fileName}:${lineNumber}:${columnNumber}@${rootToken}-${token}`;
  }

  getFunctionName() {
    return this.functionName;
  }

  getFileName() {
    return this.fileName;
  }

  getSource() {
    return this.source;
  }

  getArgs() {
    return this.args;
  }

  getLineNumber() {
    return this.lineNumber;
  }

  getColumnNumber() {
    return this.columnNumber;
  }

  isToplevel() {
    return this.isToplevel;
  }

  isConstructor() {
    return this.isConstructor;
  }
  
  getToken() {
    return this.token;
  }

  getRootToken() {
    return this.rootToken;
  }
}

module.exports = StackFrame;

/**
 * 自定义的 stack frame 对象 
 * 类似于 V8 https://github.com/v8/v8/wiki/Stack%20Trace%20API
 */

class StackFrame {

  constructor(obj) {
    if (obj instanceof Object) {
      // string
      this.prefix = obj.prefix ? `${obj.prefix}@` : '';
      this.typeName = obj.typeName || 'Object';
      this.functionName = obj.functionName || '';
      this.fileName     = obj.fileName || '';
      // 后台解析 source-map
      this.source       = obj.source || '';

      // array
      this.args = obj.args || [];

      // number
      this.lineNumber   = StackFrame.isNumber(obj.lineNumber) ? obj.lineNumber : 0;
      this.columnNumber = StackFrame.isNumber(obj.columnNumber) ? obj.columnNumber : 0;

      // boolean
      this.isConstructor = obj.isConstructor;
      this.isToplevel    = obj.isToplevel;

      // token
      this.rootToken = obj.rootToken || null;
      this.setToken();
    }
  }

  static isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  toString() {
    var typeName = this.getTypeName() || '';
    var functionName = this.getFunctionName() || '{anonymous}';
    var args = (this.getArgs()).join(',');
    var fileName = this.getFileName();
    var lineNumber = this.getLineNumber();
    var columnNumber = this.getColumnNumber();
    var rootToken = this.getRootToken();
    var token = this.getToken();

    return `${this.prefix}${typeName}.${functionName}(${args})@${fileName}:${lineNumber}:${columnNumber}@${rootToken}-${token}`;
  }

  getTypeName() {
    return this.typeName;
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

  getRootToken() {
    return this.rootToken;
  }

  getToken() {
    return this.token;
  }

  setToken() {
    var rootToken = this.getRootToken();
    var functionName = this.getFunctionName();
    this.token = `${rootToken}:${functionName}:${performance.now()}`;
  }
}

module.exports = StackFrame;

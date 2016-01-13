class StackFrame {

  constructor() {
    // get from arguments.callee
    this.functionName = 'funName';
    this.args = ['args'];
    this.fileName = 'http://localhost:3000/file.min.js';
    this.lineNumber = 1;
    this.columnNumber = 324;
    this.source = 'ORIGINAL_STACK_LINE';
    this.token = 'root-parent-child-random-date';
  }

  toString() {
    return 'funName(args)@http://localhost:3000/file.js:325:20@token123';
  }

  getFunctionName() {}

  getFileName() {}

  getLineNumber() {}

  getColumnNumber() {}

  isToplevel() {}

  isConstructor() {}
  
  getSource() {}
  
  getToken() {}
}

module.exports = StackFrame;

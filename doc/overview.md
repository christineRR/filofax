### StackFrame 对象

描述当前调用函数信息的对象

```javascript
//v8 stack trace api https://github.com/v8/v8/wiki/Stack%20Trace%20API
// stackframe https://github.com/stacktracejs/stackframe
class StackFrame {

  constructor: () {
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
```

### StackGenerator

描述当前调用函数的函数调用栈

```javascript
// function backtrace
// arguments.callee.caller 向上溯源
class StackGenerator {

  constructor() {}

  backtrace() {
    return [StackFrame({functionName: 'foo', args: []}), StackFrame(..), StackFrame(..)];
  }
}
```

### ShotTrace

全局记录埋点调用函数，支持dump数据到服务端，生成文件记录。

```javascript
class ShotTrace {

  constructor(opts) {
    // 周期十分钟
    this.cycle = 10*60*1000;

    this.stack = [];
    this.maxStackSize = 10;
    this.startTime = new Date();
  }

  shot() {
    var now = new Date();
    if (now - this.startTime > this.cycle) {
      this.reset();
    }
    this.stack.push(new StackFrame(...));
  }
  
  reset() {
    this.startTime = new Date();
    this.stack = [];
  }

  dump(){
    // stack to string
    for(var item of this.stack) {
      stackInfo += item.toString()
    }
    this.upload(stackInfo);
  }

  upload(stackInfo){
    $.ajax({
      url: '',
      data: {stackInfo}
    }, cb);
  }

  destroy() {
    this.stack = [];
  }  
}
```

### 初始化

```javascript
// init shot trace
var shottrace = new ShotTrace({...});
// trigger when error
window.onError = function () {
  shottrace.dump();
}
```

### 埋点初始化

```javascript
class Request{

  constructor() {}

  ajax() {
    global.shottrace.shot();
    // ajax 实现
  }
}
```
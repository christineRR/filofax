### StackFrame 对象

> 自定义的 stack frame 对象，类似于 [V8](https://github.com/v8/v8/wiki/Stack%20Trace%20API) 和 [Gecko](http://mxr.mozilla.org/mozilla-central/source/xpcom/base/nsIException.idl#14) 的实现。

#### arguments.callee

```js
// parse arguments.callee
var opts = {
  functionName: arguments.callee.toString(),
  args: arguments.callee.arguments,
  ...
};
var stackframe = new StackFrame(opts);
```
#### Error Object

```js
// parse Error Object
var err = new Error('boom');
var opts = ErrorStackParser.parse(err);
var stackframe = new StackFrame(opts);
```

#### 抽象类
```javascript
// v8 stack trace api https://github.com/v8/v8/wiki/Stack%20Trace%20API
// stackframe https://github.com/stacktracejs/stackframe
class StackFrame {

  constructor: (opts) {
    this.functionName = 'funName';
    this.args = ['args'];
    this.fileName = 'http://localhost:3000/file.min.js';
    this.lineNumber = 1;
    this.columnNumber = 324;
    this.source = 'ORIGINAL_STACK_LINE';
    this.token = 'root-parent-child-random-date';
    this.rootToken = '';
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
  
  getRootToken() {}
}
```

### StackGenerator

> 生成当前函数调用链

```javascript
class StackGenerator {

  constructor() {}

  backtrace() {
    // arguments.callee.caller 向上溯源
    return [StackFrame({functionName: 'foo', args: []}), StackFrame(..), StackFrame(..)];
  }
}
```

### ShotTrace

> 全局记录对象，轮转记录一段时间内埋点调用产生 stack 对象，特定条件下触发 dump，上传全局 stack 信息。

```javascript
class ShotTrace {

  constructor(opts) {
    // 1 分钟
    this.lifettime = 1*60*1000;
    // 10s
    this.period = 10*1000;
    
    this.maxSize = this.lifetime / this.period;
    this.stack = [
      {
        rootToken1: [stack1, stack2 ...],
        rootToken2: [stack1, stack2 ...],
        ...
      },
      {...},
      ...
    ];
    
    this.startTime = new Date();
  }

  shot() {
    var now = new Date();
    var sub = now - this.startTime;
    // 整数位数
    var trunc = Math.trunc(this.period).toString().length;
    // sub 后 trunc 数值
    var leftSub = Math.sub(sub, trunc);
    
    // 根据时间轮转获取当前 stack 元素
    var cursor = leftSub / this.period;
    
    if (cursor >= this.maxSize) {
      var index = cursor % this.maxSize;
    } else {
      var index = cursor;
    }
    
    var group = this.stack[index];
    
    var stackfram = new StackFrame(arguments.callee);
    var rootToken = stackframe.rootToken;
    if (!group.hasOwnProperty(rootToken)) {
        group[rootToken] = []
    }
    group[rootToken].push(stackframe.toString());
  }
  
  dump(){
    this.combine();
    this.upload();
  }

  combine(){
    // 合并 this.stack
  }
  
  upload(){
    var stackInfo = 'combineStackInfo';
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
window.onError = function (err) {
  shottrace.dump(err);
}
```

#### 埋点示例

```javascript
class Request{

  constructor() {}

  ajax() {
    global.shottrace.shot();
    // ajax 实现
  }
}
```

### TODO

+ 浏览器共享全局 stack 对象，使用 shell worker
+ 合并 dump 上传
+ 上传数据压缩、websocket gizp

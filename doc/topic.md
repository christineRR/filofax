# 问题汇总

## v8 callsite

## no use strict

### 严格模式下的 arguments.callee

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/caller

https://github.com/v8/v8/wiki/Stack%20Trace%20API

```js
Error.captureStackTrace(error, constructorOpt)
Error.prepareStackTrace(error, structuredStackTrace)

// hook the prepare function
Error.prepareStackTrace=function(err,stack){
  // err: the Error object.
  // stack: stack info, an array of `CallSite`.
  // return full info of the stack.
  return stack;
};

// trace function
function trace(){
  var obj={};
  Error.captureStackTrace(obj);
  // or just use: var obj=new Error();
  var stack=obj.stack;
  // remove this function from stack
  stack=stack.slice(1);
  return stack;
}
```

### 严格模式下 callsite getFunction() and getThis() return null or undefined

### source-map 问题


# 前端跟踪埋点模块

> 通过应用主动埋点，记录应用程序运行过程中业务模块父子调用链及依赖关系，根据条件触发记录上传。

## 安装

```bash
tnpm install filofax
```

## 使用

```js
var Filofax = require('filofax');

// create global instance
var ff = new Filofax();

// 根节点埋点
ff.rootShot();

// 子节点埋点
ff.shot();

// 错误埋点
var err = new Error('something wrong');
ff.shot(err);

// dump 导出堆栈信息
ff.dump();
```

## 详细设计

[overview](http://gitlab.alibaba-inc.com/mars/filofax/blob/master/doc/overview.md)

## 参考

+ [sentry](http://gitlab.alibaba-inc.com/mars/filofax/issues/2)
+ [stacktrace](https://www.stacktracejs.com/#!/docs/stacktrace-js)
+ [callsite](https://github.com/tj/callsite)
+ [node-stack-trace](https://github.com/felixge/node-stack-trace)

## nodejs 日志模块

https://github.com/winstonjs/winston

https://github.com/trentm/node-bunyan

https://github.com/expressjs/morgan

https://github.com/stritti/log4js

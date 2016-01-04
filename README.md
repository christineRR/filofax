# 日志模块

## 设计原则

1.log要具备显示调用方文件名和行号的能力，要不然你连谁打的这个log都不知道

2.log要具有按请求聚合的能力，不然上下文全是乱的，没法看。光给你一行报错log你能分析为啥出错？必须是这个请求的完整log才有价值。

3.在2的基础上要有按用户聚合的能力，方便查流水

4.在3的基础上要有染色能力，指定用户能log全开，实时定位问题

5.log能还原成fiddler抓包，重现现场，对于概率性问题保留现场再重要不过了。

6.log要具备单机调试功能，可以不停机编写条件开启指定log，无视日志级别。

6这个用到的机会很少，主要是1-5

## nodejs 日志模块

https://github.com/winstonjs/winston

https://github.com/trentm/node-bunyan

https://github.com/expressjs/morgan

https://github.com/stritti/log4js
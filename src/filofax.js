var StackTrace = require('./stacktrace');

class Filofax {

  constructor(opts) {
    // 时间生命周期 1 分钟
    this.lifetime = 1*60*1000;

    // 单个时间滑窗 10s
    this.shottime = 10*1000;

    // 滑窗个数
    this.maxSize = this.lifetime/this.shottime;

    this.stack = [];
    for(var i = 0, len = this.maxSize - 1; i <= len; i++) {
      // 单个时间滑窗对象
      this.stack[i] = {};
    }

    this.startime = performance.now();
  }

  shot(opts) {
    var now = performance.now();
    var interval = now - this.startime;

    var cursor = Math.floor((interval / this.shottime) % this.maxSize);

    var trace = this.stack[cursor];

    if (opts instanceof Error) {
      var frame = StackTrace.parse(opts);
    } else {
      var frame = StackTrace.get(opts);
    }

    if (trace) {
      var keys = Object.keys(trace);
      if (keys.indexOf(frame.rootToken) === -1) {
        trace[frame.rootToken] = [];
      }
      trace[frame.rootToken].push(frame.toString());
    }

  }

  dump() {
    console.log(this.stack);
  }

}

module.exports = Filofax;

var StackTrace = require('./stacktrace');
var CycleList = require('./cycle-list');

class Filofax {

  constructor(opts) {
    // 时间生命周期 1 分钟
    this.lifetime = 1*60*1000;

    // 单个时间滑窗 10s
    this.shottime = 10*1000;

    // 滑窗个数
    this.maxSize = this.lifetime/this.shottime;

    this.stack = new CycleList({
      size: this.maxSize
    });

    this.startime = performance.now();
    this.lasttime = this.startime;
  }

  shot(opts) {
    var now = performance.now();
    var interval = now - this.lasttime;

    if (interval > this.shottime) {
      this.stack.move();
    }

    if (opts instanceof Error) {
      var frame = StackTrace.parse(opts);
    } else {
      var frame = StackTrace.get(opts);
    }
    this.stack.push(frame);
  }

  dump() {
    console.log(this.stack.dump());
  }

  upload() {
    
  }

}

module.exports = Filofax;

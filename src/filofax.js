var StackTrace = require('./stacktrace');
var CycleList = require('./cycle-list');

class Filofax {

  constructor(opts) {

    opts = opts || {};

    // 时间生命周期 1 分钟
    this.lifetime = opts.lifetime ? opts.lifetime : 1*60*1000;

    // 单个时间滑窗 10s
    this.shottime = opts.shottime ? opts.shottime : 10*1000;

    // 滑窗个数
    this.maxSize = this.lifetime/this.shottime;

    this.stack = new CycleList({
      size: this.maxSize,
      shottime: this.shottime
    });
  }

  shot(opts) {
    if (this.stack.isNext()) {
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

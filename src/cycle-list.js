/**
 * 类循环数据
 */

class CycleList {
  constructor(opts) {
    // 数组大小
    this.size = opts.size ? opts.size: 10;
    // 单个时间滑窗 10s
    this.shottime = opts.shottime ? opts.shottime : 10*1000;

    // 当前游标
    this.cursor = 0;
    this.nextCursorTime = this.shottime;

    // 数据
    this.data = [];
    // 初始化数据数组
    for(var i = 0, len = this.size - 1; i <= len; i++) {
      // 单个时间滑窗对象
      this.data[i] = {};
    }
  }

  // now greater than the next cursor time
  isNext() {
    return performance.now() > this.nextCursorTime;
  }

  // cursor index ++ && the next cursor time update
  move() {
    var max = this.data.length - 1;
    if(this.cursor < max) {
      this.cursor++;
    } else if (this.cursor = max) {
      this.cursor = 0;
    }
    this.nextCursorTime = performance.now() + this.shottime;
  }

  // push stack frame to data
  push(frame) {
    var trace = this.data[this.cursor];
    var rootToken = frame.rootToken;

    var keys = Object.keys(trace);
    if (keys.indexOf(rootToken) === -1) {
      trace[rootToken] = [];
    }
    trace[rootToken].push(frame.toString());
  }

  dump() {
    return this.data;
  }
}

module.exports = CycleList;

/**
 * 类循环数据
 */

class CycleList {
  constructor(opts) {
    this.size = opts.size ? opts.size: 10;
    this.currentIndex = 0;
    this.data = [];

    for(var i = 0, len = this.size - 1; i <= len; i++) {
      // 单个时间滑窗对象
      this.data[i] = {};
    }
  }

  // cursor current index move
  move() {
    if(this.currentIndex < this.data.length) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }
  
  // push stack frame to data
  push(frame) {
    var trace = this.data[this.currentIndex];
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

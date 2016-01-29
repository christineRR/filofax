const uidSymbol = Symbol('async-hook-uid');
const patchs = {
  'timers': require('./patches/timers.js')
};

class AsyncHook {
  
  constructor() {
    this.enabled = false;
    this.counter = 0;

    const initFns = this.initFns = [];
    const preFns = this.preFns = [];
    const postFns = this.postFns = [];
    const destroyFns = this.destroyFns = [];

    this.init = function (uid, parent) {
      this[uidSymbol] = uid;
      if (parent !== null) parent = parent[uidSymbol];
      // call hooks
      for (const hook of initFns) {
        hook(uid, this, parent);
      }
    };

    this.pre = function () {
      const uid = this[uidSymbol];
      // call hooks
      for (const hook of preFns) {
        hook(uid, this);
      }
    };

    this.post = function () {
      const uid = this[uidSymbol];
      // call hooks
      for (const hook of postFns) {
        hook(uid, this);
      }
    };

    this.destroy = function (uid) {
      // call hooks
      for (const hook of destroyFns) {
        hook(uid);
      }
    };

    for (const key of Object.keys(patchs)) {
      patchs[key].call(this);
    }
  }

  add(hooks) {
    if (hooks.init) this.initFns.push(hooks.init);
    if (hooks.pre) this.preFns.push(hooks.pre);
    if (hooks.post) this.postFns.push(hooks.post);
    if (hooks.destroy) this.destroyFns.push(hooks.destroy);
  }

  static removeElement(array, item) {
    const index = array.indexOf(item);
    if (index === -1) return;
    array.splice(index, 1);
  }

  remove(hooks) {
    if (hooks.init) AsyncHook.removeElement(this.initFns, hooks.init);
    if (hooks.pre) AsyncHook.removeElement(this.preFns, hooks.pre);
    if (hooks.post) AsyncHook.removeElement(this.postFns, hooks.post);
    if (hooks.destroy) AsyncHook.removeElement(this.destroyFns, hooks.destroy);
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }
}

module.exports = AsyncHook;

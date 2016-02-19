var FiloFax = require('../../src/filofax');
var expect = require('chai').expect;
var trace = new FiloFax({
  // 5s
  lifetime: 5*1000,
  // 1s
  shottime: 1*1000
});

describe('filofax trace sample', function() {

  before(function(done) {
    class A {
      constructor() {
        trace.rootShot();
        this.msg = 'say:hello world';
        this.song = 'song:abcdefg';
      }

      say() {
        trace.rootShot();
        console.log(this.getMsg());
      }

      sing() {
        trace.rootShot();
        console.log(this.getSong());
      }

      throwError() {
        trace.rootShot();
        try {
          JSON.parse('a:b');
        } catch(err) {
          trace.dump(err);
        }
      }

      getMsg() {
        trace.shot();
        return this.msg;
      }

      getSong() {
        trace.shot();
        return this.song;
      }
    }

    function foo() {
      var a = new A();

      // trigger normal trace
      a.say();

      // trigger next shottime trace
      setTimeout(function() {
        a.sing();
        done();
      }, 1500);

      // trigger error trace
      a.throwError();
    }
    foo();
  });

  it('when trace with filofax, shuold rootShot and shot', function() {
    // console.log(trace);
    // console.log(trace.stack.data);
    expect(trace.lifetime).to.eql(5000);
    expect(trace.shottime).to.eql(1000);
    expect(trace.maxSize).to.eql(5);
    expect(trace.stack.cursor).to.eql(1);
    expect(Object.keys(trace.stack.data[0]).length).to.eql(3);
    expect(Object.keys(trace.stack.data[1]).length).to.eql(1);
  });
});

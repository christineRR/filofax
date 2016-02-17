var StackTrace = require('../../src/stacktrace');
var expect = require('chai').expect;

describe('StackTrace #setTimeout', function() {

  var sfConstructor = null;
  var sfDelay = null;
  var sfShow = null;
  before(function(done) {
    class B {
      constructor() {
        sfConstructor = StackTrace.get({type: 'root', index: 0});
        this.counter = 0;
      }

      delay() {
        var self = this;
        setTimeout(function() {
          sfDelay = StackTrace.get({index: 0});
          self.counter++;
          done();
        }, 10);
      }

      show() {
        sfShow = StackTrace.get({index: 0});
        console.log('B counter is:', this.counter);
      }
    }

    function foo() {
      var obj = new B();
      obj.delay();
      obj.show();
    }
    foo();
  });

  
  it('when StackTrace get in async setTimeout, should rootToken equal previous tick last stack trace', function() {
    // console.log(sfConstructor)
    // console.log(sfDelay)
    // console.log(sfShow)
    // typeName
    expect(sfConstructor.typeName).to.equal('B');
    expect(sfDelay.typeName).to.equal('[object Object]');
    expect(sfShow.typeName).to.equal('B');

    // functionName
    expect(sfConstructor.functionName).to.equal('B');
    expect(sfDelay.functionName).to.equal('');
    expect(sfShow.functionName).to.equal('show');

    // isConstructor
    expect(sfConstructor.isConstructor).to.be.true;
    expect(sfDelay.isConstructor).to.be.false;
    expect(sfShow.isConstructor).to.be.false;

    // isToplevel
    expect(sfConstructor.isToplevel).to.be.false;
    expect(sfDelay.isToplevel).to.be.false;
    expect(sfShow.isToplevel).to.be.false;

    // rootToken
    expect(sfConstructor.rootToken).to.equal(sfConstructor.token);
    expect(sfDelay.rootToken).to.equal(sfConstructor.rootToken);
    expect(sfShow.rootToken).to.equal(sfConstructor.rootToken);

    // parentToken
    expect(sfConstructor.parentToken).to.equal(null);
    expect(sfDelay.parentToken).to.equal(sfShow.token);
    expect(sfShow.parentToken).to.equal(sfConstructor.token);

    // token
    expect(sfConstructor.token).to.be.ok;
    expect(sfDelay.token).to.be.ok;
    expect(sfShow.token).to.be.ok;
  });

});

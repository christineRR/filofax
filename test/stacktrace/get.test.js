var StackTrace = require('../../src/stacktrace');
var expect = require('chai').expect;

describe('StackTrace #get', function() {

  var sfConstructor = null;
  var sfAdd = null;
  var sfSub = null;
  before(function() {
    class A {
      constructor() {
        sfConstructor = StackTrace.get({type: 'root', index: 0});
        this.result = 0;
      }

      add(a, b) {
        sfAdd = StackTrace.get({index: 0});
        this.result = a + b;
      }

      sub(a, b) {
        sfSub = StackTrace.get({index: 0});
        this.result = a - b;
      }
    }

    function foo() {
      var obj = new A();
      obj.add(1, 1);
      obj.sub(4, 1);
    }
    foo();
  });

  it('when StackTrace get type root, should have rootToken === token', function() {
    expect(sfConstructor.prefix).to.eql('');
    expect(sfConstructor.typeName).to.eql('A');
    expect(sfConstructor.functionName).to.eql('A');

    expect(sfConstructor.args).to.eql([]);
    expect(sfConstructor.isConstructor).to.be.true;
    expect(sfConstructor.isToplevel).to.be.false;

    expect(sfConstructor.rootToken).to.be.ok;
    expect(sfConstructor.token).to.be.ok;
    expect(sfConstructor.parentToken).to.eql(null);
    expect(sfConstructor.rootToken).to.eql(sfConstructor.token);
  });

  it('when StackTrace get second time, should have rootToken equal last stack trace rootToken', function() {
    expect(sfAdd.prefix).to.eql('');
    expect(sfAdd.typeName).to.eql('A');
    expect(sfAdd.functionName).to.eql('add');

    expect(sfAdd.args).to.eql([1, 1]);
    expect(sfAdd.isConstructor).to.be.false;
    expect(sfAdd.isToplevel).to.be.false;

    expect(sfAdd.rootToken).to.eql(sfConstructor.rootToken);
    expect(sfAdd.parentToken).to.eql(sfConstructor.token);
    expect(sfAdd.token).to.not.equal(sfAdd.rootToken);
  });

  it('when StackTrace get third time, should have rootToken equal last stack trace rootToken', function() {
    expect(sfSub.prefix).to.eql('');
    expect(sfSub.typeName).to.eql('A');
    expect(sfSub.functionName).to.eql('sub');

    expect(sfSub.args).to.eql([4, 1]);
    expect(sfSub.isConstructor).to.be.false;
    expect(sfSub.isToplevel).to.be.false;

    expect(sfSub.rootToken).to.equal(sfConstructor.rootToken);
    expect(sfSub.parentToken).to.equal(sfAdd.token);
    expect(sfSub.token).to.not.equal(sfSub.rootToken);
  });

});

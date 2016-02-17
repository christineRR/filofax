var StackTrace = require('../../src/stacktrace');
var expect = require('chai').expect;

describe('StackTrace #parse', function() {

  var sfConstructor = null;
  var sfErr = null;
  before(function() {
    class C {
      constructor() {
        sfConstructor = StackTrace.get({type: 'root', index: 0});
        this.data = 'a:b';
      }

      parse() {
        try {
          JSON.parse(this.data);
        } catch(err) {
          sfErr = StackTrace.parse(err);
        }
      }
    }

    function foo() {
      var obj = new C();
      obj.parse();
    }
    foo();
  });

  it('when stack trace parse error object, should return stack frame object', function() {
    // console.log(sfConstructor);
    // console.log(sfErr);

    // typeName
    expect(sfConstructor.typeName).to.equal('C');
    expect(sfErr.typeName).to.equal('Object');

    // functionName
    expect(sfConstructor.functionName).to.equal('C');
    expect(sfErr.functionName).to.equal('parse');

    // isConstructor
    expect(sfConstructor.isConstructor).to.be.true;
    expect(sfErr.isConstructor).to.equal(undefined);

    // isToplevel
    expect(sfConstructor.isToplevel).to.be.false;
    expect(sfErr.isConstructor).to.equal(undefined);

    // rootToken
    expect(sfConstructor.rootToken).to.equal(sfConstructor.token);
    expect(sfErr.rootToken).to.equal(sfConstructor.rootToken);

    // parentToken
    expect(sfConstructor.parentToken).to.equal(null);
    expect(sfErr.parentToken).to.equal(sfConstructor.token);

    // token
    expect(sfConstructor.token).to.be.ok;
    expect(sfErr.token).to.be.ok;
  });
});

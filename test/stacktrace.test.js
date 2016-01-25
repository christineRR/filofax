var StackTrace = require('../src/stacktrace');
var expect = require('chai').expect;

describe('stacktrace', function() {

  it('when hook StackTrace.get root function, should get stackframe object', function() {
    // hook to function
    var sf = StackTrace.get({type: 'root'});
    expect(sf.prefix).to.equal('');
    expect(sf.typeName).to.equal('Object');
    expect(sf.functionName).to.equal('callFn');
    expect(sf.isToplevel).to.be.ok;
    expect(sf.rootToken).to.be.ok;
    expect(sf.parentToken).to.not.be.ok;
    expect(sf.token).to.equal(sf.rootToken);
  });

  it('when hook StackTrace.get not root function, should get rootToken and parentToken from last stack frame object', function() {
    var sf = StackTrace.get();
    expect(sf.prefix).to.equal('');
    expect(sf.typeName).to.equal('Object');
    expect(sf.functionName).to.equal('callFn');
    expect(sf.isToplevel).to.be.ok;
    expect(sf.rootToken).to.be.ok;
    expect(sf.parentToken).to.be.ok;
    expect(sf.token).to.be.ok;
  });

  it('when hook error object, should parse error and return an stack frame object', function() {
    var err = new Error('something wrong');
    var sf = StackTrace.parse(err);
    expect(sf.prefix).to.equal('Error: something wrong@');
    expect(sf.isConstructor).to.equal(undefined);
    expect(sf.isToplevel).to.equal(undefined);
    expect(sf.rootToken).to.be.ok;
    expect(sf.parentToken).to.be.ok;
    expect(sf.token).to.be.ok;
  });

});

var StackFrame = require('../src/stackframe');
var expect = require('chai').expect;

describe('stackframe', function() {

  it('when new StackFrame have arguments object, should return an instance', function() {
    var sf = new StackFrame({
      typeName: 'Foo',
      functionName: 'say',
      fileName: 'http://localhost:8080/assets/bundle.js',
      args: ['rose', 'tom', 'jack'],
      lineNumber: 19694,
      columnNumber: 14,
      isConstructor: false,
      isToplevel: false,
      rootToken: 'say:330.61',
      parentToken: null,
      token: 'say:330.61'
    });
    expect(sf.toString()).to.equal('Foo.say(rose,tom,jack)@http://localhost:8080/assets/bundle.js:19694:14@say:330.61-null-say:330.61');
  });

  it('when new StackFrame have arguments with prefix, should return an instance', function() {
    var sf = new StackFrame({
      prefix: 'Error:something wrong',
      typeName: 'Foo',
      functionName: 'render',
      fileName: 'http://localhost:8080/assets/bundle.js',
      args: [],
      lineNumber: 19694,
      columnNumber: 14,
      rootToken: 'say:330.61',
      parentToken: 'say:330.61',
      token: 'render:337.165'
    });
    expect(sf.toString()).to.equal('Error:something wrong@Foo.render()@http://localhost:8080/assets/bundle.js:19694:14@say:330.61-say:330.61-render:337.165');
  });
  
});


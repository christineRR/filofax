var CycleList = require('../../src/cyclelist');
var expect = require('chai').expect;

describe('cyclelist #find', function() {

  it('when find error sf, should return array contain stack frame objects about this error', function() {
    var cl = new CycleList();
    // error stack frame mock
    var sfError1 = {
      // parse error
      typeName: 'Object',
      functionName: 'parse',
      rootToken: 'C:foo:12.13',
      parentToken: 'C:firstError:14.13',
      token: 'Object:parse:16.13'
    };
    var sfError2 = {
      // setTimeout throw error
      typeName: 'Object',
      functionName: '{anonymous}',
      rootToken: 'C:foo:12.13',
      parentToken: 'C:foo:12.13',
      token: 'Object:{anonymous}:120.13'
    }
    // set mock data
    cl.data = [
      {
        'C:foo:12.13': [
          {
            typeName: 'C',
            functionName: 'foo',
            rootToken: 'C:foo:12.13',
            parentToken: null,
            token: 'C:foo:12.13'
          },
          {
            typeName: 'C',
            functionName: 'firstError',
            rootToken: 'C:foo:12.13',
            parentToken: 'C:foo:12.13',
            token: 'C:firstError:14.13'
          },
          sfError1
        ]
      },
      {
        'C:foo:12.13': [sfError2]
      }
    ];

    var error1Stack = cl.find(sfError1);
    expect(error1Stack).to.eql(cl.data[0]['C:foo:12.13'].reverse());

    var error2Stack = cl.find(sfError2);
    expect(error2Stack).to.eql([
      sfError2,
      {
        typeName: 'C',
        functionName: 'foo',
        rootToken: 'C:foo:12.13',
        parentToken: null,
        token: 'C:foo:12.13' 
      }
    ]);
  });

});
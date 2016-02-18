var CycleList = require('../../src/cycle-list');
var expect = require('chai').expect;

describe('cycle-list #push', function() {
  
  it('when new CycleList, should have init options', function() {
    var cl = new CycleList();
    expect(cl.size).to.eql(6);
    expect(cl.shottime).to.eql(10000);
    expect(cl.cursor).to.eql(0);
    expect(cl.nextCursorTime).to.eql(cl.starttime + cl.shottime);
    expect(cl.data).to.eql([{}, {}, {}, {}, {}, {}]);
  });

  it('when push stack frame in shottime, should not move', function() {
    var cl = new CycleList()
    var frame = {
      typeName: 'C',
      functionName: 'foo',
      rootToken: 'C:foo:12.13',
      parentToken: null,
      token: 'C:foo:12.13'
    };
    cl.push(frame);

    var bucket = cl.data[0];
    expect(bucket).to.have.all.keys('C:foo:12.13');
    expect(bucket[frame.rootToken][0]).to.eql(frame);
  });

  it('when push stack frame over shottime, should move', function(done) {
    var cl = new CycleList({
      size: 2,
      // 10ms
      shottime: 10
    });

    // first push in shottime
    var frame1 = {
      typeName: 'C',
      functionName: 'foo',
      rootToken: 'C:foo:12.13',
      parentToken: null,
      token: 'C:foo:12.13'
    };
    cl.push(frame1);
    expect(cl.isNext()).to.be.false;

    // sencond push over shottime
    setTimeout(function() {
      var frame2 = {
        typeName: 'C',
        functionName: 'foo',
        rootToken: 'C:foo:200.13',
        parentToken: null,
        token: 'C:foo:200.13'
      }
      expect(cl.cursor).to.eql(0);
      expect(cl.nextCursorTime).to.eql(cl.starttime + cl.shottime);
      expect(cl.isNext()).to.be.true;
      // trigger move
      cl.move();
      cl.push(frame2);
      expect(cl.size).to.eql(2);
      expect(cl.shottime).to.eql(10);
      expect(cl.data.length).to.eql(2);
      expect(cl.nextCursorTime).to.be.above(cl.starttime + cl.shottime);
      expect(cl.cursor).to.eql(1);
      expect(cl.data[0]).to.have.all.keys('C:foo:12.13');
      expect(cl.data[1]).to.have.all.keys('C:foo:200.13');
      expect(cl.data[0][frame1.rootToken][0]).to.eql(frame1);
      expect(cl.data[1][frame2.rootToken][0]).to.eql(frame2);
      done();
    }, 100);
  });

});

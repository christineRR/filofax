var FiloFax = require('../../src/filofax');
var expect = require('chai').expect;

describe('filofax singleton', function() {

  var ff = new FiloFax();

  var ff2 = new FiloFax();

  it('when new FiloFax times, should get only one instance', function() {
    var same = ff === ff2;
    expect(same).to.be.true;
  });
});

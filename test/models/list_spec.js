'use strict';

var db   = require('../support/db'),

    List = require('../../src/list');

describe('List', function() {

  afterEach(function(done) {
    db.cleanUp()
    .then(function() {
      done();
    });
  });

  it('should allow creating a new list', function(done) {
    var args = { name: 'Test List' },
        list;

    List.createNew(args)
    .then(function(result) {
      return List.findOne({ id: result.id });
    })
    .then(function(result) {
      list = result.toJSON();

      expect(list.name).to.equal(args.name);
      done();
    });
  });
});
